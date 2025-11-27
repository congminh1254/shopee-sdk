// List of endpoints: https://open.shopee.com/opservice/api/v1/doc/module/?version=2
// Detail of each endpoint: https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=[api_name]
// Should fetch list and save all of schema to schemas folder, with json format


import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const BASE_URL = "https://open.shopee.com/opservice/api/v1/doc/module/?version=2";
const DETAIL_URL = "https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=";

// Clear all of .json files in schemas folder
async function clearExistingSchemas() {
  const schemasFolder = path.join(process.cwd(), "schemas");
  if (!fs.existsSync(schemasFolder)) {
    fs.mkdirSync(schemasFolder, { recursive: true });
    return;
  }
  const files = fs.readdirSync(schemasFolder);
  files.forEach((file) => {
    if (file.endsWith(".json")) {
      fs.unlinkSync(path.join(schemasFolder, file));
    }
  });
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

// Fetch detail of each endpoint
async function fetchEndpointDetail(name: string) {
  const response = await fetch(`${DETAIL_URL}${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch endpoint detail for ${name}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Save schema to schemas folder
async function saveSchema(name: string, schema: any) {
  const schemasFolder = path.join(process.cwd(), "schemas");
  fs.writeFileSync(path.join(schemasFolder, `${name}.json`), JSON.stringify(schema, null, 2));
}

// Main function
async function main() {
  try {
    console.log('Clearing existing schemas...');
    clearExistingSchemas();
    
    console.log('Fetching endpoints list...');
    const endpoints = await fetchEndpoints();
    console.log(`Found ${endpoints.length} endpoints`);
    
    let savedCount = 0;
    for (const endpoint of endpoints) {
      if (endpoint.type !== 1) continue;
      try {
        console.log(`Fetching schema for: ${endpoint.name}`);
        const schema = await fetchEndpointDetail(endpoint.name);
        await saveSchema(endpoint.name, schema);
        savedCount++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error(`Error fetching schema for ${endpoint.name}:`, errorMessage);
        if (errorStack) {
          console.error('Stack trace:', errorStack);
        }
        // Continue with other endpoints even if one fails
      }
    }
    
    console.log(`Successfully saved ${savedCount} schemas`);
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
