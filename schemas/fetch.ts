// List of endpoints: https://open.shopee.com/opservice/api/v1/doc/module/?version=2
// Detail of each endpoint: https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=[api_name]
// Should fetch list and save all of schema to schemas folder, with json format


import axios from "axios";
import fs from "fs";
import path from "path";

const BASE_URL = "https://open.shopee.com/opservice/api/v1/doc/module/?version=2";
const DETAIL_URL = "https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=";

// Clear all of .json files in schemas folder
async function clearExistingSchemas() {
  const schemasFolder = path.join(process.cwd(), "schemas");
  const files = fs.readdirSync(schemasFolder);
  files.forEach((file) => {
    if (file.endsWith(".json")) {
      fs.unlinkSync(path.join(schemasFolder, file));
    }
  });
}

// Fetch list of endpoints
async function fetchEndpoints() {
  const response = await axios.get(BASE_URL);
  const modules = response.data.modules;
  const endpoints = modules.map((module: any) => module.items).flat();
  return endpoints;
}

// Fetch detail of each endpoint
async function fetchEndpointDetail(name: string) {
  const response = await axios.get(`${DETAIL_URL}${name}`);
  return response.data;
}

// Save schema to schemas folder
async function saveSchema(name: string, schema: any) {
  const schemasFolder = path.join(process.cwd(), "schemas");
  fs.writeFileSync(path.join(schemasFolder, `${name}.json`), JSON.stringify(schema, null, 2));
}

// Main function
async function main() {
  clearExistingSchemas();
  const endpoints = await fetchEndpoints();
  for (const endpoint of endpoints) {
    if (endpoint.type !== 1) continue;
    const schema = await fetchEndpointDetail(endpoint.name);
    await saveSchema(endpoint.name, schema);
  }
}

main();
