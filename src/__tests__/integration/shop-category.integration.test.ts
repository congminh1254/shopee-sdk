import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)(
  "ShopeeSDK ShopCategoryManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    it("should successfully run the full shop category collection lifecycle", async () => {
      // 1. Add a new custom shop collection category
      const categoryName = "Sandbox Collection " + Date.now();
      const addResponse = await sdk.shopCategory.addShopCategory({
        name: categoryName,
        sort_weight: 10,
      });

      expect(addResponse).toBeDefined();
      expect(addResponse.error || "").toBe("");
      expect(addResponse.response?.shop_category_id).toBeDefined();

      const testCategoryId = addResponse.response.shop_category_id;

      try {
        // 2. Retrieve collections and verify presence
        const listResponse = await sdk.shopCategory.getShopCategoryList({
          page_size: 100,
          page_no: 1,
        });

        expect(listResponse).toBeDefined();
        expect(listResponse.error || "").toBe("");
        expect(Array.isArray(listResponse.response?.shop_categorys)).toBe(true);

        const createdCat = listResponse.response.shop_categorys.find(
          (cat) => cat.shop_category_id === testCategoryId
        );
        expect(createdCat).toBeDefined();
        expect(createdCat?.name).toBe(categoryName);

        // 3. Update the category name
        const updatedName = "Sandbox Collection U " + Date.now();
        const updateResponse = await sdk.shopCategory.updateShopCategory({
          shop_category_id: testCategoryId,
          name: updatedName,
        });

        expect(updateResponse).toBeDefined();
        expect(updateResponse.error || "").toBe("");
        expect(updateResponse.response?.shop_category_id).toBe(testCategoryId);
      } finally {
        // 4. Delete the custom shop collection category immediately
        const deleteResponse = await sdk.shopCategory.deleteShopCategory({
          shop_category_id: testCategoryId,
        });

        expect(deleteResponse).toBeDefined();
        expect(deleteResponse.error || "").toBe("");
        expect(deleteResponse.response?.shop_category_id).toBe(testCategoryId);
      }
    });
  }
);
