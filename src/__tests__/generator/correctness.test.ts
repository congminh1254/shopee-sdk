import { describe, it, expect, jest } from "@jest/globals";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { execFileSync, spawnSync } from "node:child_process";
import { parseSchemaFile, parseAllSchemas } from "../../generator/schema-parser.js";
import { resolveEnumNames } from "../../generator/enum-resolver.js";
import { FileWriter } from "../../generator/file-writer.js";
import { AstBuilder } from "../../generator/ast-builder.js";
import { updateSdkRegistration } from "../../generator/sdk-updater.js";
import { NormalizedParam, EndpointSpec } from "../../generator/types.js";
import { generateRepository, publishOutputs, validateStage } from "../../generator/pipeline.js";

function temporary<T>(run: (dir: string) => T): T {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "generator-test-"));
  try {
    return run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
const field = (name: string, type = "string", children?: NormalizedParam[]): NormalizedParam => ({
  name,
  type,
  children,
  description: "",
  optional: false,
});
function spec(requestParams: NormalizedParam[], responseParams: NormalizedParam[]): EndpointSpec {
  return {
    apiName: "v2.demo.get_item",
    moduleName: "demo",
    endpointName: "get_item",
    method: "GET",
    path: "/demo/get_item",
    auth: true,
    description: "",
    requestParams,
    responseParams,
    enums: [],
    timestampPaths: [],
  };
}
function fixture(dir: string): void {
  fs.mkdirSync(path.join(dir, "schemas"), { recursive: true });
  fs.mkdirSync(path.join(dir, "src/managers"), { recursive: true });
  fs.mkdirSync(path.join(dir, "src/schemas"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "schemas/v2.demo.get_item.json"),
    JSON.stringify({
      method: 2,
      params: {
        request_params: [{ name: "id", type: "int", required: true }],
        response_params: [
          { name: "response", type: "object", children: [{ name: "value", type: "string" }] },
        ],
      },
    })
  );
  fs.writeFileSync(
    path.join(dir, "src/sdk.ts"),
    "export interface ShopeeConfig { [key: string]: unknown }\nexport class ShopeeSDK { config: ShopeeConfig = {}; constructor() {} }"
  );
  fs.writeFileSync(
    path.join(dir, "src/managers/base.manager.ts"),
    "import { ShopeeConfig } from '../sdk.js'; export class BaseManager { constructor(protected config: ShopeeConfig) {} }"
  );
  fs.writeFileSync(
    path.join(dir, "src/schemas/fetch.ts"),
    "export interface FetchResponse<T> { response: T; request_id: string; error: string; message: string }"
  );
  fs.writeFileSync(
    path.join(dir, "src/fetch.ts"),
    "export class ShopeeFetch { static async fetch<T>(_config: unknown, _path: string, _options: unknown): Promise<T> { throw new Error('fixture'); } }"
  );
  fs.writeFileSync(
    path.join(dir, "src/schemas/region.ts"),
    'export enum ShopeeRegion { GLOBAL = "GLOBAL" }'
  );
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ type: "module", version: "1.0.0" })
  );
  fs.writeFileSync(
    path.join(dir, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "es2022",
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
        skipLibCheck: true,
        types: ["node", "jest"],
        isolatedModules: true,
      },
      include: ["src/**/*.ts"],
    })
  );
  fs.writeFileSync(path.join(dir, "eslint.config.js"), "export default [{ rules: {} }];");
  fs.symlinkSync(path.resolve("node_modules"), path.join(dir, "node_modules"), "dir");
}

describe("generator correctness", () => {
  it("keeps deeply different request/response shapes and does not mutate inputs", () =>
    temporary((dir) => {
      const input = spec(
        [field("item", "object", [field("details", "object", [field("value", "string")])])],
        [
          field("response", "object", [
            field("item", "object", [field("details", "object", [field("value", "number")])]),
          ]),
        ]
      );
      const original = structuredClone(input);
      const file = path.join(dir, "demo.ts");
      new FileWriter(new AstBuilder()).writeSchemaFile(file, [input]);
      const text = fs.readFileSync(file, "utf8");
      expect(text).toContain("value: string");
      expect(text).toContain("value: number");
      const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
      const names = source.statements
        .filter(ts.isInterfaceDeclaration)
        .map((node) => node.name.text);
      expect(new Set(names).size).toBe(names.length);
      expect(input).toEqual(original);
    }));

  it("quotes unusual field names and escapes JSDoc terminators", () =>
    temporary((dir) => {
      const input = spec(
        [{ ...field("item-id"), description: "Text */ that must stay in a comment" }],
        []
      );
      const file = path.join(dir, "demo.ts");
      new FileWriter(new AstBuilder()).writeSchemaFile(file, [input]);
      const text = fs.readFileSync(file, "utf8");
      expect(text).toContain('"item-id": string');
      expect(text).toContain("Text * / that must stay in a comment");
    }));

  it("rejects duplicate endpoint names instead of dropping conflicting declarations", () =>
    temporary((dir) => {
      expect(() =>
        new FileWriter(new AstBuilder()).writeSchemaFile(path.join(dir, "demo.ts"), [
          spec([field("id")], []),
          spec([field("id", "number")], []),
        ])
      ).toThrow("Conflicting generated declaration");
    }));

  it("distinguishes more than two nested shapes sharing a preferred name", () => {
    const builder = new AstBuilder();
    const names = ["string", "number", "boolean"].map(
      (type) =>
        builder.buildNestedInterfaces(
          [field("item", "object", [field("value", type)])],
          "get_item",
          true,
          "GetItemRequest"
        )[0].name.text
    );
    expect(new Set(names).size).toBe(3);
  });

  it("scopes conflicting enum definitions by endpoint and request/response path", () =>
    temporary((dir) => {
      const file = path.join(dir, "v2.demo.get_item.json");
      fs.writeFileSync(
        file,
        JSON.stringify({
          method: 2,
          params: {
            request_params: [
              { name: "status", type: "string", description: "Available values: NEW, OLD" },
            ],
            response_params: [
              { name: "status", type: "string", description: "Available values: OPEN, CLOSED" },
            ],
          },
        })
      );
      const input = parseSchemaFile(file)!;
      resolveEnumNames([input]);
      expect(input.requestParams[0].type).toBe("GetItemRequestStatus");
      expect(input.responseParams[0].type).toBe("GetItemResponseStatus");
      new FileWriter(new AstBuilder()).writeSchemaFile(path.join(dir, "output.ts"), [input]);
      const text = fs.readFileSync(path.join(dir, "output.ts"), "utf8");
      expect(text).toContain('NEW = "NEW"');
      expect(text).toContain('OPEN = "OPEN"');
    }));

  it("shares identical enum definitions regardless of descriptions", () =>
    temporary((dir) => {
      const file = path.join(dir, "v2.demo.get_item.json");
      const status = { name: "status", type: "string", description: "Available values: NEW, OLD" };
      fs.writeFileSync(
        file,
        JSON.stringify({
          method: 2,
          params: { request_params: [status], response_params: [status] },
        })
      );
      const input = parseSchemaFile(file)!;
      resolveEnumNames([input]);
      expect(input.enums.map((value) => value.name)).toEqual(["Status", "Status"]);
    }));

  it.each([
    { method: 3 },
    { method: 2, params: { request_params: {} } },
    { method: 1, params: { response_params: [{ name: 5 }] } },
    { method: 2, path: "https://example.com" },
    { method: 2, define: { content: 123 } },
    { method: 2, params: { request_params: [{}] } },
  ])("rejects unsupported schema input %j with filename context", (schema) =>
    temporary((dir) => {
      const file = path.join(dir, "v2.demo.get_item.json");
      fs.writeFileSync(file, JSON.stringify(schema));
      expect(() => parseSchemaFile(file)).toThrow("Invalid schema v2.demo.get_item.json");
    })
  );

  it("reports malformed JSON and unexpected filenames", () =>
    temporary((dir) => {
      fs.writeFileSync(path.join(dir, "v2.demo.get_item.json"), "{");
      expect(() => parseAllSchemas(dir)).toThrow("Invalid schema v2.demo.get_item.json");
      fs.unlinkSync(path.join(dir, "v2.demo.get_item.json"));
      fs.writeFileSync(path.join(dir, "unexpected.json"), "{}");
      expect(() => parseAllSchemas(dir)).toThrow("Unsupported schema filename");
    }));

  it("only collects response timestamp paths", () =>
    temporary((dir) => {
      const file = path.join(dir, "v2.demo.get_item.json");
      fs.writeFileSync(
        file,
        JSON.stringify({
          method: 2,
          params: {
            request_params: [{ name: "since", type: "timestamp" }],
            response_params: [{ name: "created_at", type: "timestamp" }],
          },
        })
      );
      expect(parseSchemaFile(file)!.timestampPaths).toEqual(["created_at"]);
    }));

  it.each(["import", "property", "assignment"])(
    "completes partial registration with existing %s without duplicates",
    (part) =>
      temporary((dir) => {
        const file = path.join(dir, "sdk.ts");
        fs.writeFileSync(
          file,
          `${part === "import" ? 'import { DemoManager } from "./managers/demo.manager.js";' : ""} export class ShopeeSDK { config: any; ${part === "property" ? "demo: DemoManager;" : ""} constructor() { ${part === "assignment" ? "this.demo = new DemoManager(this.config);" : ""} } }`
        );
        updateSdkRegistration(file, ["demo", "demo"]);
        const first = fs.readFileSync(file, "utf8");
        updateSdkRegistration(file, ["demo", "demo"]);
        expect(fs.readFileSync(file, "utf8")).toBe(first);
        expect(first.match(/import \{ DemoManager \}/g)).toHaveLength(1);
        expect(first.match(/demo: DemoManager/g)).toHaveLength(1);
        expect(first.match(/this\.demo = new DemoManager/g)).toHaveLength(1);
      })
  );

  it("requires a request object when fields are required", () => {
    const builder = new AstBuilder();
    const source = ts.createSourceFile("x.ts", "", ts.ScriptTarget.Latest);
    const print = (params: NormalizedParam[]) =>
      ts
        .createPrinter()
        .printNode(
          ts.EmitHint.Unspecified,
          builder.buildManagerMethod("get_item", "GET", "/demo/get_item", true, [], "", params),
          source
        );
    expect(print([field("id")])).toContain("params: GetItemRequest");
    expect(print([{ ...field("id"), optional: true }])).toContain("params?: GetItemRequest");
    expect(print([])).toContain("params?: GetItemRequest");
  });

  it("leaves existing outputs untouched when staged validation fails", () =>
    temporary((dir) => {
      fixture(dir);
      const sdk = fs.readFileSync(path.join(dir, "src/sdk.ts"), "utf8");
      fs.mkdirSync(path.join(dir, "src/__tests__/generated"), { recursive: true });
      const stale = path.join(dir, "src/__tests__/generated/stale.generated.test.ts");
      fs.writeFileSync(stale, "keep me");
      expect(() =>
        generateRepository(dir, () => {
          throw new Error("validation failed");
        })
      ).toThrow("validation failed");
      expect(fs.readFileSync(path.join(dir, "src/sdk.ts"), "utf8")).toBe(sdk);
      expect(fs.readFileSync(stale, "utf8")).toBe("keep me");
      expect(fs.existsSync(path.join(dir, "src/managers/demo.manager.ts"))).toBe(false);
    }));

  it("rolls back files if publishing a validated batch fails", () =>
    temporary((dir) => {
      const stage = path.join(dir, "stage");
      fs.mkdirSync(stage);
      fs.writeFileSync(path.join(dir, "first.ts"), "original");
      fs.writeFileSync(path.join(stage, "first.ts"), "replacement");
      expect(() => publishOutputs(dir, stage, ["first.ts", "missing.ts"], [])).toThrow();
      expect(fs.readFileSync(path.join(dir, "first.ts"), "utf8")).toBe("original");
      expect(fs.existsSync(path.join(dir, "missing.ts"))).toBe(false);
    }));

  it("uses built-in assertions that reject wrong auth, timestamps and missing fields", () => {
    const mock = jest.fn();
    mock({ auth: false, timestampPaths: [], body: {} });
    expect(() =>
      expect(mock).toHaveBeenCalledWith({ auth: true, timestampPaths: [], body: {} })
    ).toThrow();
    expect(() =>
      expect(mock).toHaveBeenCalledWith({
        auth: false,
        timestampPaths: ["response.time"],
        body: {},
      })
    ).toThrow();
    expect(() =>
      expect(mock).toHaveBeenNthCalledWith(1, { auth: false, timestampPaths: [], body: { id: 1 } })
    ).toThrow();
  });

  it.each(["format", "lint", "type-check"])(
    "leaves checkout outputs unchanged after a real %s failure",
    (failure) =>
      temporary((dir) => {
        fixture(dir);
        const sdk = fs.readFileSync(path.join(dir, "src/sdk.ts"), "utf8");
        if (failure === "format") {
          fs.writeFileSync(
            path.join(dir, ".prettierrc"),
            JSON.stringify({ parser: "not-a-real-parser" })
          );
        } else if (failure === "lint") {
          fs.writeFileSync(
            path.join(dir, "eslint.config.js"),
            `import parser from '@typescript-eslint/parser'; export default [{ files: ['**/*.ts'], languageOptions: { parser }, rules: { 'no-restricted-syntax': ['error', 'ClassDeclaration'] } }];`
          );
        } else {
          fs.writeFileSync(
            path.join(dir, "src/broken.ts"),
            'export const value: number = "wrong";'
          );
        }
        expect(() => generateRepository(dir)).toThrow("Command failed");
        expect(fs.readFileSync(path.join(dir, "src/sdk.ts"), "utf8")).toBe(sdk);
        expect(fs.existsSync(path.join(dir, "src/schemas/demo.ts"))).toBe(false);
      }),
    60000
  );

  it("returns nonzero from the CLI for invalid schemas without reporting success", () =>
    temporary((dir) => {
      fixture(dir);
      fs.writeFileSync(path.join(dir, "schemas/v2.demo.get_item.json"), "{");
      const result = spawnSync(
        process.execPath,
        [path.resolve("node_modules/tsx/dist/cli.mjs"), path.resolve("src/generator/index.ts")],
        { cwd: dir, encoding: "utf8" }
      );
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("Invalid schema v2.demo.get_item.json");
      expect(result.stdout).not.toContain("Generation completed successfully");
    }));

  it(
    "generates, formats, lints and type-checks an isolated fixture repeatably",
    () =>
      temporary((dir) => {
        fixture(dir);
        generateRepository(dir, validateStage);
        const files = [
          "src/sdk.ts",
          "src/managers/demo.manager.ts",
          "src/schemas/demo.ts",
          "src/__tests__/generated/demo.generated.test.ts",
        ];
        const before = files.map((file) => fs.readFileSync(path.join(dir, file), "utf8"));
        generateRepository(dir, validateStage);
        expect(files.map((file) => fs.readFileSync(path.join(dir, file), "utf8"))).toEqual(before);
        const resultFile = path.join(dir, "jest-results.json");
        execFileSync(
          process.execPath,
          [
            path.join(dir, "node_modules/jest/bin/jest.js"),
            "--runInBand",
            "--json",
            `--outputFile=${resultFile}`,
            "--config",
            JSON.stringify({
              rootDir: dir,
              testEnvironment: "node",
              testMatch: ["**/*.generated.test.ts"],
              extensionsToTreatAsEsm: [".ts"],
              moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
              transform: { "^.+\\.tsx?$": ["ts-jest", { useESM: true }] },
            }),
          ],
          {
            cwd: dir,
            env: { ...process.env, NODE_OPTIONS: "--experimental-vm-modules" },
            stdio: "pipe",
          }
        );
        const results = JSON.parse(fs.readFileSync(resultFile, "utf8"));
        expect(results.success).toBe(true);
        expect(results.numPassedTests).toBe(1);
      }),
    60000
  );
});
