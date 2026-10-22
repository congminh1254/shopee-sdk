import { withCleanup, pollRead } from "../utils/sandbox-fixtures.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";

const { runTests, initSdk } = setupIntegrationTest();
const { runTests: runMutations } = setupIntegrationTest({ mutates: true });

(runTests ? describe : describe.skip)(
  "ShopeeSDK ShopCategoryManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    (runMutations ? it : it.skip)(
      "should successfully run the full shop category collection lifecycle",
      async () => {
        // 1. Add a new custom shop collection category
        const categoryName = "Sandbox Collection " + Date.now();
        const addResponse = await sdk.shopCategory.addShopCategory({
          name: categoryName,
          sort_weight: 10,
        });

        const testCategoryId = addResponse.response.shop_category_id!;

        await withCleanup(
          testCategoryId,
          async () => {
            expect(addResponse).toBeDefined();
            expect(addResponse.error || "").toBe("");
            expect(addResponse.response?.shop_category_id).toBeDefined();

            const listResponse = await sdk.shopCategory.getShopCategoryList({
              page_size: 100,
              page_no: 1,
            });
            expect(listResponse).toBeDefined();
            expect(listResponse.error || "").toBe("");
            expect(Array.isArray(listResponse.response?.shop_categorys)).toBe(true);
            const createdCat = listResponse.response.shop_categorys!.find(
              (cat) => cat.shop_category_id === testCategoryId
            );
            expect(createdCat).toBeDefined();
            expect(createdCat?.name).toBe(categoryName);
            const updatedName = "Sandbox Collection U " + Date.now();
            const updateResponse = await sdk.shopCategory.updateShopCategory({
              shop_category_id: testCategoryId,
              name: updatedName,
            });
            expect(updateResponse).toBeDefined();
            expect(updateResponse.error || "").toBe("");
            expect(updateResponse.response?.shop_category_id).toBe(testCategoryId);
            const updated = await pollRead(
              () => sdk.shopCategory.getShopCategoryList({ page_no: 1, page_size: 100 }),
              (value) =>
                value.response?.shop_categorys?.some(
                  (category) =>
                    category.shop_category_id === testCategoryId && category.name === updatedName
                ) === true
            );
            expect(
              updated.response.shop_categorys?.find(
                (category) => category.shop_category_id === testCategoryId
              )?.name
            ).toBe(updatedName);
          },
          async () => {
            const deleteResponse = await sdk.shopCategory.deleteShopCategory({
              shop_category_id: testCategoryId,
            });
            expect(deleteResponse).toBeDefined();
            expect(deleteResponse.error || "").toBe("");
            expect(deleteResponse.response?.shop_category_id).toBe(testCategoryId);
            const absent = await pollRead(
              () => sdk.shopCategory.getShopCategoryList({ page_no: 1, page_size: 100 }),
              (value) =>
                Array.isArray(value.response?.shop_categorys) &&
                !value.response.shop_categorys.some(
                  (category) => category.shop_category_id === testCategoryId
                )
            );
            expect(
              absent.response.shop_categorys?.some(
                (category) => category.shop_category_id === testCategoryId
              )
            ).toBe(false);
          }
        );
      }
    );
  }
);
