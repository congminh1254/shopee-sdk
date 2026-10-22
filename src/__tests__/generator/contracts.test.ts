import { describe, it, expect } from "@jest/globals";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { parseSchemaFile, mapType } from "../../generator/schema-parser.js";
import { parsePrimitive } from "../../generator/test-generator.js";
import { resolveEnumNames } from "../../generator/enum-resolver.js";
import { FileWriter } from "../../generator/file-writer.js";
import { AstBuilder } from "../../generator/ast-builder.js";

function temporary(run: (directory: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "generator-contract-"));
  try {
    run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
function schema(dir: string, name: string, data: unknown) {
  const file = path.join(dir, `v2.demo.${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data));
  return parseSchemaFile(file);
}
describe("generator type and metadata contracts", () => {
  it.each([
    ["string", "string"],
    ["int32", "number"],
    ["uint64", "Integer"],
    ["int64[]", "Integer[]"],
    ["bool[]", "boolean[]"],
    ["timestamp", "Date"],
    ["file", "BinaryFile"],
    ["object", "unknown"],
    ["string []", "string[]"],
  ])("maps %s explicitly to %s", (input, output) => expect(mapType(input)).toBe(output));
  it("keeps large integer samples exact instead of rounding generated fixtures", () => {
    expect(parsePrimitive("9223372036854775807", "Integer")).toBe("9223372036854775807");
    expect(parsePrimitive("42", "Integer")).toBe(42);
  });
  it("preserves integer samples while reading schema JSON", () =>
    temporary((dir) => {
      const file = path.join(dir, "v2.demo.integer.json");
      fs.writeFileSync(
        file,
        '{"method":2,"params":{"request_params":[{"name":"id","type":"uint64","sample":9223372036854775807}]}}'
      );
      expect(parseSchemaFile(file).requestParams[0].sample).toBe("9223372036854775807");
    }));
  it.each(["banana", "constructor", "__proto__"])(
    "rejects unknown field type %s with the source filename",
    (type) =>
      temporary((dir) => {
        expect(() =>
          schema(dir, "broken", {
            method: 2,
            params: { request_params: [{ name: "id", type }] },
          })
        ).toThrow("Invalid schema v2.demo.broken.json");
      })
  );
  it.each([
    ["partner", [], "Public"],
    ["shop", ["access_token", "shop_id"], "Shop"],
    ["merchant", ["access_token", "merchant_id"], "Merchant"],
    ["user", ["access_token"], "User"],
    ["token", ["access_token"], "Principal"],
  ])("derives %s authentication independently of module name", (mode, names, apiType) =>
    temporary((dir) => {
      const value = schema(dir, "read", {
        method: 2,
        api_type: apiType,
        common_params: (names as string[]).map((name) => ({ name })),
      });
      expect(value.authMode).toBe(mode);
      expect(value.auth).toBe(mode !== "partner");
    })
  );
  it("accepts enum arrays and supported file/integer types while rejecting scalar arrays, missing required requests and invented response envelopes", () =>
    temporary((dir) => {
      const value = schema(dir, "read", {
        method: 2,
        params: {
          request_params: [
            {
              name: "status_list",
              type: "string[]",
              required: true,
              description: "Available values: OPEN, CLOSED",
            },
            { name: "attachment", type: "file" },
            { name: "id", type: "uint64" },
          ],
          response_params: [
            { name: "name", type: "string" },
            { name: "id", type: "uint64" },
          ],
        },
      });
      resolveEnumNames([value]);
      new FileWriter(new AstBuilder()).writeSchemaFile(path.join(dir, "demo.ts"), [value]);
      fs.copyFileSync(path.resolve("src/schemas/fetch.ts"), path.join(dir, "fetch.ts"));
      const test = path.join(dir, "consumer.ts");
      fs.writeFileSync(
        test,
        `import type {ReadRequest,ReadResponse} from './demo.js';
const valid: ReadRequest = {status_list:['OPEN'],id:'9223372036854775807',attachment:Buffer.from('file')};
// @ts-expect-error enum array is not scalar
const scalar: ReadRequest = {status_list:'OPEN'};
// @ts-expect-error a string enum array rejects numbers
const numeric: ReadRequest = {status_list:[1]};
// @ts-expect-error required status_list
const missing: ReadRequest = {};
// @ts-expect-error files are buffers or blobs, not filenames
const badFile: ReadRequest = {status_list:['OPEN'],attachment:'file.png'};
declare const response: ReadResponse;
const id: number | string | undefined = response.id;
// @ts-expect-error flat response does not have a response wrapper
response.response;
`
      );
      const program = ts.createProgram([test], {
        noEmit: true,
        strict: true,
        skipLibCheck: true,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        typeRoots: [path.resolve("node_modules/@types")],
        types: ["node"],
      });
      expect(
        ts
          .getPreEmitDiagnostics(program)
          .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"))
      ).toEqual([]);
    }));
});
