import { describe, it, expect } from "@jest/globals";
import ts from "typescript";
import { AstBuilder } from "../../generator/ast-builder.js";
import { NormalizedParam } from "../../generator/types.js";

function printAstNode(node: ts.Node): string {
  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    "",
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

describe("AstBuilder", () => {
  describe("buildRequestInterface", () => {
    it("should build an empty type alias for empty request params", () => {
      const builder = new AstBuilder();
      const node = builder.buildRequestInterface("get_item_list", [], "Get list of items");
      const code = printAstNode(node);
      expect(code).toContain("export type GetItemListRequest = Record<string, never>;");
    });

    it("should build an interface with fields for non-empty request params", () => {
      const builder = new AstBuilder();
      const params: NormalizedParam[] = [
        {
          name: "item_id",
          type: "number",
          description: "Unique item identifier",
          optional: false,
        },
        {
          name: "item_name",
          type: "string",
          description: "Name of item",
          optional: true,
        },
      ];
      const node = builder.buildRequestInterface("add_item", params, "Add a product item");
      const code = printAstNode(node);
      expect(code).toContain("export interface AddItemRequest");
      expect(code).toContain("item_id: number;");
      expect(code).toContain("item_name?: string;");
      expect(code).toContain("[key: string]: any;");
    });
  });

  describe("buildManagerMethod", () => {
    it("should build a GET manager method with auth: true", () => {
      const builder = new AstBuilder();
      const node = builder.buildManagerMethod(
        "get_item_list",
        "GET",
        "/product/get_item_list",
        true,
        [],
        "Get item list description"
      );
      const code = printAstNode(node);
      expect(code).toContain(
        "getItemList(params?: GetItemListRequest): Promise<GetItemListResponse>"
      );
      expect(code).toContain(
        'ShopeeFetch.fetch<GetItemListResponse>(this.config, "/product/get_item_list"'
      );
      expect(code).toContain('method: "GET",');
      expect(code).toContain("auth: true,");
      expect(code).toContain("params: params");
    });

    it("should build a POST manager method with auth: false", () => {
      const builder = new AstBuilder();
      const node = builder.buildManagerMethod(
        "get_access_token",
        "POST",
        "/public/get_access_token",
        false,
        [],
        "Fetch access token"
      );
      const code = printAstNode(node);
      expect(code).toContain(
        "getAccessToken(params?: GetAccessTokenRequest): Promise<GetAccessTokenResponse>"
      );
      expect(code).toContain(
        'ShopeeFetch.fetch<GetAccessTokenResponse>(this.config, "/public/get_access_token"'
      );
      expect(code).toContain('method: "POST",');
      expect(code).toContain("body: params");
    });
  });
});
