import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { auditRepositorySpecs } from "../../utils/spec-audit.js";

function createTempRepo(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "shopee-spec-audit-"));
}

function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

describe("auditRepositorySpecs", () => {
  const tempRepos: string[] = [];

  afterEach(() => {
    tempRepos.forEach((repoPath) => fs.rmSync(repoPath, { recursive: true, force: true }));
    tempRepos.length = 0;
  });

  it("detects missing endpoints and request/response field gaps", () => {
    const repoRoot = createTempRepo();
    tempRepos.push(repoRoot);

    writeFile(
      path.join(repoRoot, "schemas", "v2.product.get_item.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "item_id" }, { name: "page_size" }],
          response: [
            {
              name: "response",
              children: [{ name: "item_list" }, { name: "has_next_page" }],
            },
          ],
        },
      })
    );

    writeFile(
      path.join(repoRoot, "src", "managers", "product.manager.ts"),
      `export class ProductManager {
        async getComment() {
          return ShopeeFetch.fetch<GetCommentResponse>(this.config, "/product/get_comment", {
            auth: true,
            method: "GET",
          });
        }
      }`
    );

    writeFile(
      path.join(repoRoot, "src", "schemas", "product.ts"),
      `export type GetItemParams = { item_id: number };
      export interface GetItemResponse { response: { item_list: string[] } }`
    );

    const report = auditRepositorySpecs(repoRoot);

    expect(report.missingEndpoints).toContain("product.get_item");
    expect(report.missingRequestFields).toEqual([
      { endpoint: "product.get_item", fields: ["page_size"] },
    ]);
    expect(report.missingResponseFields).toEqual([
      { endpoint: "product.get_item", fields: ["has_next_page"] },
    ]);
  });

  it("detects method mismatches", () => {
    const repoRoot = createTempRepo();
    tempRepos.push(repoRoot);

    writeFile(
      path.join(repoRoot, "schemas", "v2.product.add_item.json"),
      JSON.stringify({
        method: 1,
        params: {
          request_params: [],
          response: [{ name: "response", children: [] }],
        },
      })
    );

    writeFile(
      path.join(repoRoot, "src", "managers", "product.manager.ts"),
      `export class ProductManager {
        async addItem() {
          return ShopeeFetch.fetch<AddItemResponse>(this.config, "/product/add_item", {
            auth: true,
            method: "GET",
          });
        }
      }`
    );

    writeFile(
      path.join(repoRoot, "src", "schemas", "product.ts"),
      "export type AddItemParams = {};"
    );

    const report = auditRepositorySpecs(repoRoot);

    expect(report.methodMismatches).toEqual([
      {
        endpoint: "product.add_item",
        expectedMethod: "POST",
        actualMethod: "GET",
      },
    ]);
  });

  it("requires exact request field names from spec", () => {
    const repoRoot = createTempRepo();
    tempRepos.push(repoRoot);

    writeFile(
      path.join(repoRoot, "schemas", "v2.video.get_metric_trend.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "period_type" }],
          response: [{ name: "response", children: [] }],
        },
      })
    );

    writeFile(
      path.join(repoRoot, "schemas", "v2.discount.get_discount_list.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "update_time_from" }, { name: "update_time_to" }],
          response: [{ name: "response", children: [] }],
        },
      })
    );

    writeFile(
      path.join(repoRoot, "src", "managers", "video.manager.ts"),
      `export class VideoManager {
        async getMetricTrend() {
          return ShopeeFetch.fetch<GetMetricTrendResponse>(this.config, "/video/get_metric_trend", {
            auth: true,
            method: "GET",
          });
        }
      }`
    );

    writeFile(
      path.join(repoRoot, "src", "managers", "discount.manager.ts"),
      `export class DiscountManager {
        async getDiscountList() {
          return ShopeeFetch.fetch<GetDiscountListResponse>(this.config, "/discount/get_discount_list", {
            auth: true,
            method: "GET",
          });
        }
      }`
    );

    writeFile(
      path.join(repoRoot, "src", "schemas", "video.ts"),
      `export interface GetMetricTrendParams { periodType: string }`
    );

    writeFile(
      path.join(repoRoot, "src", "schemas", "discount.ts"),
      `export interface GetDiscountListParams {
        [key: string]: string | number | boolean | undefined;
      }`
    );

    const report = auditRepositorySpecs(repoRoot);

    expect(report.missingRequestFields).toEqual([
      { endpoint: "discount.get_discount_list", fields: ["update_time_from", "update_time_to"] },
      { endpoint: "video.get_metric_trend", fields: ["period_type"] },
    ]);
  });

  it("handles fallback endpoint parsing, invalid filenames, GET mismatches and sorting paths", () => {
    const repoRoot = createTempRepo();
    tempRepos.push(repoRoot);

    writeFile(path.join(repoRoot, "schemas", "v2.invalid-schema-file.json"), "{}");

    writeFile(
      path.join(repoRoot, "schemas", "v2.alpha.get_a.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "first_field" }, { name: "second_field" }],
          response: [{ name: "response", children: [{ name: "zeta", children: [null] }] }],
        },
      })
    );
    writeFile(
      path.join(repoRoot, "schemas", "v2.beta.get_b.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "third_field" }],
          response: [{ name: "response", children: [{ name: "alpha" }] }],
        },
      })
    );
    writeFile(
      path.join(repoRoot, "schemas", "v2.noschema.get_c.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [{ name: "ignored_field" }],
          response: [{ name: "response", children: [] }],
        },
      })
    );
    writeFile(
      path.join(repoRoot, "schemas", "v2.gamma.get_d.json"),
      JSON.stringify({
        method: 2,
        params: {
          request_params: [],
          response: [{ name: "response", children: [] }],
        },
      })
    );

    writeFile(
      path.join(repoRoot, "src", "managers", "mix.manager.ts"),
      `export class MixManager {
        endpointPath = "/alpha/get_a";
        async getB() {
          return ShopeeFetch.fetch<GetBResponse>(this.config, "/beta/get_b", {
            auth: true,
            method: "POST",
          });
        }
        async getC() {
          return ShopeeFetch.fetch<GetCResponse>(this.config, "/noschema/get_c", {
            auth: true,
            method: "GET",
          });
        }
        async getD() {
          return ShopeeFetch.fetch<GetDResponse>(this.config, "/gamma/get_d", {
            auth: true,
            method: "POST",
          });
        }
      }`
    );

    writeFile(path.join(repoRoot, "src", "schemas", "alpha.ts"), "export type AlphaSchema = {};");
    writeFile(path.join(repoRoot, "src", "schemas", "beta.ts"), "export type BetaSchema = {};");

    const report = auditRepositorySpecs(repoRoot);

    expect(report.methodMismatches).toEqual([
      {
        endpoint: "beta.get_b",
        expectedMethod: "GET",
        actualMethod: "POST",
      },
      {
        endpoint: "gamma.get_d",
        expectedMethod: "GET",
        actualMethod: "POST",
      },
    ]);
    expect(report.missingRequestFields.map((item) => item.endpoint)).toEqual([
      "alpha.get_a",
      "beta.get_b",
    ]);
    expect(report.missingResponseFields.map((item) => item.endpoint)).toEqual([
      "alpha.get_a",
      "beta.get_b",
    ]);
  });
});
