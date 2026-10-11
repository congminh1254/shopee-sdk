import { describe, it, expect, jest } from "@jest/globals";
import path from "node:path";
import { normalizeSchemaName, toCamelCase } from "../../generator/types.js";
import { parseAllSchemas } from "../../generator/schema-parser.js";
import { BuyboxManager } from "../../managers/buybox.manager.js";
import { ShopeeFetch } from "../../fetch.js";
import type { GetBuyboxModelPerformanceonlyforbrnowRequest } from "../../schemas/buybox.js";

describe("Buybox endpoint names", () => {
  it.each(["(only for BR now)", "（only for BR now）", ""])(
    "strips documentation annotations %s from filenames",
    (annotation) => {
      expect(normalizeSchemaName(` v2.buybox.get_buybox_model_performance${annotation} `)).toBe(
        "v2.buybox.get_buybox_model_performance"
      );
    }
  );

  it("keeps canonical names, regional documentation, and legacy methods for every Buybox endpoint", async () => {
    const specs = parseAllSchemas(path.resolve("schemas")).get("buybox")!;
    expect(specs).toHaveLength(5);
    const manager = new BuyboxManager({ partner_id: 123, partner_key: "test" });
    const fetch = jest.spyOn(ShopeeFetch, "fetch").mockResolvedValue({ request_id: "test" });
    try {
      for (const spec of specs) {
        expect(spec.endpointName).toMatch(/^[a-z_]+$/);
        expect(spec.description).toContain("Only available in Brazil (BR).");
        const canonical = toCamelCase(spec.endpointName) as keyof BuyboxManager;
        const legacy = toCamelCase(spec.legacyEndpointName!) as keyof BuyboxManager;
        const params: GetBuyboxModelPerformanceonlyforbrnowRequest = { model_id_list: [1] };
        const call = (name: keyof BuyboxManager) =>
          (manager[name] as (params: unknown) => Promise<unknown>).call(manager, params);
        await call(canonical);
        const canonicalCall = fetch.mock.calls.at(-1);
        await call(legacy);
        expect(fetch.mock.calls.at(-1)).toEqual(canonicalCall);
        expect(canonicalCall?.[1]).toBe(spec.path);
      }
    } finally {
      fetch.mockRestore();
    }
  });
});
