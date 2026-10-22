// Shopee documentation list and detail endpoints. Refresh the catalog only after every detail succeeds.
import fetch from "node-fetch";
import { parseResponseJson } from "../src/utils/response-json.js";
import { refreshSchemaCatalog } from "../src/generator/schema-download.js";

const BASE_URL = "https://open.shopee.com/opservice/api/v1/doc/module/?version=2";
const DETAIL_URL = "https://open.shopee.com/opservice/api/v1/doc/api/?version=2&api_name=";
async function json(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Documentation fetch failed: ${response.status}`);
  return parseResponseJson(await response.text());
}
async function main() {
  const data = (await json(BASE_URL)) as {
    modules?: { items: { name: string; type: number }[] }[];
  };
  if (!Array.isArray(data.modules)) throw new Error("Invalid endpoint list: missing modules");
  const count = await refreshSchemaCatalog(
    process.cwd(),
    data.modules.flatMap((module) => module.items),
    (name) => json(DETAIL_URL + encodeURIComponent(name))
  );
  console.log(`Saved ${count} schemas from a complete catalog.`);
}
main().catch((error) => {
  console.error("Schema refresh failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
