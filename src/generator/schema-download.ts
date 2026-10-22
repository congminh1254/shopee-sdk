import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { publishOutputs } from "./pipeline.js";
import { normalizeSchemaName } from "./types.js";
import { validateSchema } from "./schema-validation.js";
import { parseResponseJson } from "../utils/response-json.js";

/** Decode documentation fields without rounding integer samples. */
export function unescapeSchema(value: unknown): unknown {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^[{[]/.test(trimmed)) {
      try {
        return unescapeSchema(parseResponseJson(trimmed));
      } catch {
        return value;
      }
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(unescapeSchema);
  if (value !== null && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, unescapeSchema(item)])
    );
  return value;
}

/** Publish only a complete, validated catalog. Failed downloads preserve all current schemas. */
export async function refreshSchemaCatalog(
  repoRoot: string,
  endpoints: { name: string; type: number }[],
  detail: (name: string) => Promise<unknown>
): Promise<number> {
  const selected = endpoints.filter((endpoint) => endpoint.type === 1);
  if (!selected.length) throw new Error("No endpoint documents found; refusing an empty catalog");
  const names = selected.map((endpoint) => normalizeSchemaName(endpoint.name));
  if (new Set(names).size !== names.length)
    throw new Error("Colliding normalized schema filenames");
  if (names.some((name) => !/^v2\.[a-z0-9_-]+\.[\p{L}\p{N}_-]+$/u.test(name)))
    throw new Error("Invalid endpoint documentation name");
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), "shopee-catalog-"));
  try {
    fs.mkdirSync(path.join(stage, "schemas"));
    for (const [index, endpoint] of selected.entries()) {
      const schema = unescapeSchema(await detail(endpoint.name));
      validateSchema(schema);
      if (
        !schema.api_name ||
        normalizeSchemaName(schema.api_name) !== names[index] ||
        !schema.path ||
        !Array.isArray(schema.params?.request_params) ||
        !Array.isArray(schema.params?.response_params)
      )
        throw new Error(`Incomplete or mismatched documentation for ${endpoint.name}`);
      fs.writeFileSync(
        path.join(stage, "schemas", `${names[index]}.json`),
        JSON.stringify(schema, null, 2)
      );
    }
    const outputs = names.map((name) => `schemas/${name}.json`);
    const directory = path.join(repoRoot, "schemas");
    fs.mkdirSync(directory, { recursive: true });
    const stale = fs
      .readdirSync(directory)
      .filter((name) => name.endsWith(".json"))
      .map((name) => `schemas/${name}`)
      .filter((name) => !outputs.includes(name));
    publishOutputs(repoRoot, stage, outputs, stale);
    return outputs.length;
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
}
