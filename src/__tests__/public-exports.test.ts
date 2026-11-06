import { describe, it, expect } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";
import * as sdkEntry from "../sdk.js";
import * as managers from "../managers/index.js";
import * as schemas from "../schemas/index.js";

describe("public entry points", () => {
  it("exports errors, regions and storages from the main entry", () => {
    expect(sdkEntry.ShopeeSDK).toBeDefined();
    expect(sdkEntry.default).toBe(sdkEntry.ShopeeSDK);
    expect(new sdkEntry.ShopeeApiError(400, {})).toBeInstanceOf(Error);
    expect(new sdkEntry.ShopeeSdkError("x")).toBeInstanceOf(Error);
    expect(sdkEntry.ShopeeRegion.GLOBAL).toBe("GLOBAL");
    expect(sdkEntry.SHOPEE_BASE_URLS[sdkEntry.ShopeeRegion.GLOBAL]).toContain("https://");
    expect(sdkEntry.InMemoryTokenStorage).toBeDefined();
    expect(sdkEntry.CustomTokenStorage).toBeDefined();
    expect(new sdkEntry.ShopeeNetworkError("x")).toBeInstanceOf(sdkEntry.ShopeeSdkError);
    expect(new sdkEntry.ShopeeTimeoutError(1)).toBeInstanceOf(sdkEntry.ShopeeNetworkError);
    expect(
      new sdkEntry.ShopeeHttpError("x", { status: 502, contentType: "", body: "" })
    ).toBeInstanceOf(sdkEntry.ShopeeSdkError);
    expect(typeof sdkEntry.paginate).toBe("function");
    expect(typeof sdkEntry.nextByCursor).toBe("function");
  });

  it("re-exports every manager from managers/index", async () => {
    const dir = path.join(process.cwd(), "src/managers");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".manager.ts"));
    const exported = new Set(Object.keys(managers));
    const missing: string[] = [];
    for (const file of files) {
      const mod = await import(`../managers/${file.replace(/\.ts$/, ".js")}`);
      for (const name of Object.keys(mod)) {
        if (name.endsWith("Manager") && !exported.has(name)) missing.push(name);
      }
    }
    expect(files.length).toBeGreaterThan(30);
    expect(missing).toEqual([]);
  });

  it("exposes overlapping schema modules as namespaces", () => {
    expect(schemas.Discount).toBeDefined();
    expect(schemas.Logistics).toBeDefined();
    expect(schemas.Payment).toBeDefined();
  });
});
