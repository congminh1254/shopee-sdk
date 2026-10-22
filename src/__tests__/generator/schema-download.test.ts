import { describe, it, expect } from "@jest/globals";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { refreshSchemaCatalog, unescapeSchema } from "../../generator/schema-download.js";
function document(name = "v2.demo.first") {
  return {
    api_name: name,
    path: "/api/v2/demo/first",
    method: 2,
    params: { request_params: [], response_params: [] },
  };
}
async function temporary(run: (dir: string) => Promise<void>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-test-"));
  fs.mkdirSync(path.join(dir, "schemas"));
  try {
    await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
describe("atomic documentation refresh", () => {
  it("preserves the entire old catalog on partial downloads and invalid responses", () =>
    temporary(async (dir) => {
      const old = path.join(dir, "schemas/v2.demo.old.json");
      fs.writeFileSync(old, "original");
      const list = [
        { name: "v2.demo.first", type: 1 },
        { name: "v2.demo.second", type: 1 },
      ];
      await expect(
        refreshSchemaCatalog(dir, list, async (name) => {
          if (name.endsWith("second")) throw new Error("offline");
          return document(name);
        })
      ).rejects.toThrow("offline");
      expect(fs.readFileSync(old, "utf8")).toBe("original");
      expect(fs.readdirSync(path.join(dir, "schemas"))).toEqual(["v2.demo.old.json"]);
      await expect(refreshSchemaCatalog(dir, list, async () => ({ method: 99 }))).rejects.toThrow(
        "method"
      );
      expect(fs.readFileSync(old, "utf8")).toBe("original");
    }));
  it("rejects incomplete documents and details returned for the wrong endpoint", () =>
    temporary(async (dir) => {
      fs.writeFileSync(path.join(dir, "schemas/v2.demo.old.json"), "original");
      const list = [{ name: "v2.demo.first", type: 1 }];
      for (const value of [{ method: 2 }, document("v2.demo.other")]) {
        await expect(refreshSchemaCatalog(dir, list, async () => value)).rejects.toThrow(
          "documentation"
        );
        expect(fs.readdirSync(path.join(dir, "schemas"))).toEqual(["v2.demo.old.json"]);
      }
    }));
  it("replaces a complete catalog atomically and preserves helper source", () =>
    temporary(async (dir) => {
      fs.writeFileSync(path.join(dir, "schemas/v2.demo.old.json"), "old");
      fs.writeFileSync(path.join(dir, "schemas/fetch.ts"), "helper");
      const list = [{ name: "v2.demo.first（only for BR now）", type: 1 }];
      expect(await refreshSchemaCatalog(dir, list, async () => document())).toBe(1);
      const first = fs.readFileSync(path.join(dir, "schemas/v2.demo.first.json"), "utf8");
      await refreshSchemaCatalog(dir, list, async () => document());
      expect(fs.readFileSync(path.join(dir, "schemas/v2.demo.first.json"), "utf8")).toBe(first);
      expect(fs.readFileSync(path.join(dir, "schemas/fetch.ts"), "utf8")).toBe("helper");
      expect(fs.existsSync(path.join(dir, "schemas/v2.demo.old.json"))).toBe(false);
    }));
  it("rejects empty catalogs, traversal paths and colliding normalized names", () =>
    temporary(async (dir) => {
      await expect(refreshSchemaCatalog(dir, [], async () => document())).rejects.toThrow("empty");
      await expect(
        refreshSchemaCatalog(dir, [{ name: "../../escape", type: 1 }], async () => document())
      ).rejects.toThrow("name");
      await expect(
        refreshSchemaCatalog(
          dir,
          [
            { name: "v2.demo.first(note)", type: 1 },
            { name: "v2.demo.first", type: 1 },
          ],
          async () => document()
        )
      ).rejects.toThrow("Colliding");
    }));
  it("preserves embedded large integer samples while decoding documentation fields", () =>
    expect(unescapeSchema('{"sample":9223372036854775807}')).toEqual({
      sample: "9223372036854775807",
    }));
});
