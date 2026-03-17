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
});
