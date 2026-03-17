import fs from "node:fs";
import path from "node:path";

export type EndpointMethod = "GET" | "POST";

export interface EndpointMethodMismatch {
  endpoint: string;
  expectedMethod: EndpointMethod;
  actualMethod: EndpointMethod;
}

export interface EndpointFieldGap {
  endpoint: string;
  fields: string[];
}

export interface SpecAuditReport {
  totalSpecs: number;
  totalSdkEndpoints: number;
  missingEndpoints: string[];
  methodMismatches: EndpointMethodMismatch[];
  missingRequestFields: EndpointFieldGap[];
  missingResponseFields: EndpointFieldGap[];
}

interface SpecSchema {
  method?: number;
  params?: {
    request_params?: Array<{ name?: string }>;
    response?: Array<{ name?: string; children?: SpecFieldNode[] }>;
  };
}

interface SpecFieldNode {
  name?: string;
  children?: SpecFieldNode[];
}

interface SdkEndpointDefinition {
  endpoint: string;
  method: EndpointMethod;
}

const FALLBACK_ENDPOINT_PATH_REGEX = /["`]\/([a-z0-9-]+)\/([a-z0-9_]+)["`]/g;
const FETCH_BLOCK_REGEX =
  /ShopeeFetch\.fetch<[^>]+>\s*\(\s*this\.config\s*,\s*["`]\/([a-z0-9-]+)\/([a-z0-9_]+)["`]\s*,\s*\{([\s\S]*?)\}\s*\)/g;
const METHOD_POST_REGEX = /method\s*:\s*["']POST["']/;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectFieldNames(nodes: SpecFieldNode[] = []): Set<string> {
  const fields = new Set<string>();
  const stack = [...nodes];

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) {
      continue;
    }

    if (node.name) {
      fields.add(node.name);
    }

    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    }
  }

  return fields;
}

function parseSdkEndpoints(managerSource: string): SdkEndpointDefinition[] {
  const endpoints = new Map<string, EndpointMethod>();

  for (const match of managerSource.matchAll(FETCH_BLOCK_REGEX)) {
    const endpoint = `${match[1]}.${match[2]}`;
    const options = match[3] ?? "";
    const method = METHOD_POST_REGEX.test(options) ? "POST" : "GET";
    endpoints.set(endpoint, method);
  }

  for (const match of managerSource.matchAll(FALLBACK_ENDPOINT_PATH_REGEX)) {
    const endpoint = `${match[1]}.${match[2]}`;
    if (!endpoints.has(endpoint)) {
      endpoints.set(endpoint, "GET");
    }
  }

  return [...endpoints.entries()].map(([endpoint, method]) => ({ endpoint, method }));
}

export function auditRepositorySpecs(repoRoot: string): SpecAuditReport {
  const schemasDir = path.join(repoRoot, "schemas");
  const managersDir = path.join(repoRoot, "src", "managers");
  const sdkSchemasDir = path.join(repoRoot, "src", "schemas");

  const schemaFiles = fs
    .readdirSync(schemasDir)
    .filter((file) => file.startsWith("v2.") && file.endsWith(".json"));

  const managerFiles = fs.readdirSync(managersDir).filter((file) => file.endsWith(".manager.ts"));

  const sdkEndpoints = new Map<string, EndpointMethod>();
  for (const managerFile of managerFiles) {
    const managerSource = fs.readFileSync(path.join(managersDir, managerFile), "utf-8");
    for (const endpointDef of parseSdkEndpoints(managerSource)) {
      sdkEndpoints.set(endpointDef.endpoint, endpointDef.method);
    }
  }

  const missingEndpoints: string[] = [];
  const methodMismatches: EndpointMethodMismatch[] = [];
  const missingRequestFields: EndpointFieldGap[] = [];
  const missingResponseFields: EndpointFieldGap[] = [];
  const regexCache = new Map<string, RegExp>();

  const hasFieldName = (schemaSource: string, fieldName: string): boolean => {
    let fieldRegex = regexCache.get(fieldName);
    if (!fieldRegex) {
      fieldRegex = new RegExp(`\\b${escapeRegExp(fieldName)}\\b`, "m");
      regexCache.set(fieldName, fieldRegex);
    }

    return fieldRegex.test(schemaSource);
  };

  for (const schemaFile of schemaFiles) {
    const match = /^v2\.([a-z0-9-]+)\.([a-z0-9_]+)\.json$/.exec(schemaFile);
    if (!match) {
      continue;
    }

    const moduleName = match[1];
    const endpointName = match[2];
    const endpointKey = `${moduleName}.${endpointName}`;

    const rawSchema = fs.readFileSync(path.join(schemasDir, schemaFile), "utf-8");
    const schema = JSON.parse(rawSchema) as SpecSchema;
    const sdkMethod = sdkEndpoints.get(endpointKey);
    if (!sdkMethod) {
      missingEndpoints.push(endpointKey);
    } else if (schema.method === 1 && sdkMethod !== "POST") {
      methodMismatches.push({
        endpoint: endpointKey,
        expectedMethod: "POST",
        actualMethod: sdkMethod,
      });
    } else if (schema.method === 2 && sdkMethod !== "GET") {
      methodMismatches.push({
        endpoint: endpointKey,
        expectedMethod: "GET",
        actualMethod: sdkMethod,
      });
    }

    const sdkSchemaPath = path.join(sdkSchemasDir, `${moduleName}.ts`);
    if (!fs.existsSync(sdkSchemaPath)) {
      continue;
    }

    const sdkSchemaSource = fs.readFileSync(sdkSchemaPath, "utf-8");
    const requestFields = new Set(
      (schema.params?.request_params ?? []).map((item) => item.name).filter(Boolean) as string[]
    );
    const responseRoot = (schema.params?.response ?? []).find((item) => item.name === "response");
    const responseFields = collectFieldNames(responseRoot?.children ?? []);

    const missingReq = [...requestFields].filter((fieldName) => !hasFieldName(sdkSchemaSource, fieldName));
    if (missingReq.length > 0) {
      missingRequestFields.push({ endpoint: endpointKey, fields: missingReq });
    }

    const missingRes = [...responseFields].filter((fieldName) => !hasFieldName(sdkSchemaSource, fieldName));
    if (missingRes.length > 0) {
      missingResponseFields.push({ endpoint: endpointKey, fields: missingRes });
    }
  }

  return {
    totalSpecs: schemaFiles.length,
    totalSdkEndpoints: sdkEndpoints.size,
    missingEndpoints: missingEndpoints.sort(),
    methodMismatches: methodMismatches.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    missingRequestFields: missingRequestFields.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    missingResponseFields: missingResponseFields.sort((a, b) =>
      a.endpoint.localeCompare(b.endpoint)
    ),
  };
}
