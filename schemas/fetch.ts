// List of endpoints: https://open.shopee.com/opservice/api/v1/doc/module/?version=2
// Detail of each endpoint: https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=[api_name]
// Should fetch list and save all of schema to schemas folder, with json format


import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { normalizeSchemaName } from "../src/generator/types.js";

const BASE_URL = "https://open.shopee.com/opservice/api/v1/doc/module/?version=2";
const DETAIL_URL = "https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=";

const SCHEMAS_FOLDER = path.join(process.cwd(), "schemas");
const DETAIL_ATTEMPTS = 3;
/**
 * Refuse to apply a fetch that would drop more than this share of the existing schemas: a
 * partial endpoint list from Shopee must not silently delete large parts of the SDK.
 * Override with ALLOW_SCHEMA_SHRINK=1 when a large removal is intended.
 */
const MAX_REMOVED_RATIO = 0.05;

function listExistingSchemas(): string[] {
  if (!fs.existsSync(SCHEMAS_FOLDER)) return [];
  return fs.readdirSync(SCHEMAS_FOLDER).filter((file) => file.endsWith(".json"));
}

// Fetch list of endpoints
async function fetchEndpoints() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch endpoints: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  if (!data.modules) {
    throw new Error('Invalid response format: missing modules');
  }
  const modules = data.modules;
  const endpoints = modules.map((module: any) => module.items).flat();
  return endpoints;
}

async function fetchEndpointDetailWithRetry(name: string) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetchEndpointDetail(name);
    } catch (error) {
      if (attempt >= DETAIL_ATTEMPTS) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
    }
  }
}

// Fetch detail of each endpoint
async function fetchEndpointDetail(name: string) {
  const response = await fetch(`${DETAIL_URL}${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch endpoint detail for ${name}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Recursively unescape any string fields that contain valid JSON
function unescapeJsonFields(obj: any): any {
  if (typeof obj === 'string') {
    const trimmed = obj.trim();
    if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && trimmed.length >= 2) {
      try {
        return unescapeJsonFields(JSON.parse(obj));
      } catch {
        // Not valid JSON, return as-is
      }
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(unescapeJsonFields);
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      result[key] = unescapeJsonFields(obj[key]);
    }
    return result;
  }
  return obj;
}

// Main function
async function main() {
  try {
    // Nothing on disk is touched until every schema has been fetched, so a failed or
    // partial run never removes endpoints from the SDK.
    console.log('Fetching endpoints list...');
    const endpoints = await fetchEndpoints();
    console.log(`Found ${endpoints.length} endpoints`);

    const fetched = new Map<string, string>();
    const failures: string[] = [];
    for (const endpoint of endpoints) {
      if (endpoint.type !== 1) continue;
      try {
        console.log(`Fetching schema for: ${endpoint.name}`);
        const schema = await fetchEndpointDetailWithRetry(endpoint.name);
        const file = `${normalizeSchemaName(endpoint.name)}.json`;
        fetched.set(file, JSON.stringify(unescapeJsonFields(schema), null, 2));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error fetching schema for ${endpoint.name}:`, errorMessage);
        failures.push(endpoint.name);
      }
    }

    if (failures.length > 0) {
      throw new Error(
        `Failed to fetch ${failures.length} schema(s) after ${DETAIL_ATTEMPTS} attempts: ${failures.join(", ")}. Existing schemas were left unchanged.`
      );
    }
    if (fetched.size === 0) {
      throw new Error('Shopee returned no endpoints. Existing schemas were left unchanged.');
    }

    const existing = listExistingSchemas();
    const removed = existing.filter((file) => !fetched.has(file)).sort();
    const added = [...fetched.keys()].filter((file) => !existing.includes(file)).sort();
    if (
      existing.length > 0 &&
      removed.length / existing.length > MAX_REMOVED_RATIO &&
      process.env.ALLOW_SCHEMA_SHRINK !== '1'
    ) {
      throw new Error(
        `Refusing to remove ${removed.length} of ${existing.length} schemas (${removed.join(", ")}). Set ALLOW_SCHEMA_SHRINK=1 if this is intended.`
      );
    }

    fs.mkdirSync(SCHEMAS_FOLDER, { recursive: true });
    for (const file of removed) {
      fs.unlinkSync(path.join(SCHEMAS_FOLDER, file));
    }
    for (const [file, content] of fetched) {
      fs.writeFileSync(path.join(SCHEMAS_FOLDER, file), content);
    }

    console.log(`Successfully saved ${fetched.size} schemas`);
    console.log(`Added endpoints (${added.length}): ${added.join(", ") || "none"}`);
    console.log(`Removed endpoints (${removed.length}): ${removed.join(", ") || "none"}`);
    process.exit(0);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error in main function:', errorMessage);
    if (errorStack) {
      console.error('Stack trace:', errorStack);
    }
    if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

main().catch((error) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  console.error('Unhandled error in main():', errorMessage);
  if (errorStack) {
    console.error('Stack trace:', errorStack);
  }
  process.exit(1);
});
