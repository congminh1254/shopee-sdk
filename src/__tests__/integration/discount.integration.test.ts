import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { DiscountStatus } from "../../schemas/discount.js";
import { pollRead, withCleanup } from "../utils/sandbox-fixtures.js";

const { runTests, initSdk } = setupIntegrationTest();
const { runTests: runMutations } = setupIntegrationTest({ mutates: true });

(runTests ? describe : describe.skip)("ShopeeSDK DiscountManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  (runMutations ? it : it.skip)(
    "should successfully run the full discount lifecycle",
    async () => {
      // 1. Create an upcoming discount activity starting in 2 days and ending in 3 days
      const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
      const endTime = startTime + 86400; // Lasts 1 day
      const discountName = "Discount " + Date.now().toString().slice(-6);

      const addResponse = await sdk.discount.addDiscount({
        discount_name: discountName,
        start_time: startTime,
        end_time: endTime,
      });

      const testDiscountId = addResponse.response.discount_id!;

      await withCleanup(
        testDiscountId,
        async () => {
          expect(addResponse).toBeDefined();
          expect(addResponse.error || "").toBe("");
          expect(addResponse.response?.discount_id).toBeDefined();

          const updatedName = "Discount U " + Date.now().toString().slice(-6);
          const updateResponse = await sdk.discount.updateDiscount({
            discount_id: testDiscountId,
            discount_name: updatedName,
          });
          expect(updateResponse.error || "").toBe("");
          const verified = await pollRead(
            () =>
              sdk.discount.getDiscount({ discount_id: testDiscountId, page_no: 1, page_size: 10 }),
            (value) => value.response?.discount_name === updatedName
          );
          expect(verified.response.discount_name).toBe(updatedName);
        },
        async () => {
          const deleteResponse = await sdk.discount.deleteDiscount({
            discount_id: testDiscountId,
          });
          expect(deleteResponse).toBeDefined();
          expect(deleteResponse.error || "").toBe("");
          expect(deleteResponse.response?.discount_id).toBe(testDiscountId);
        }
      );
    },
    60000
  );

  it("should successfully list shop discounts", async () => {
    const listResponse = await sdk.discount.getDiscountList({
      discount_status: DiscountStatus.ALL,
      page_no: 1,
      page_size: 10,
    });

    expect(listResponse).toBeDefined();
    expect(listResponse.error || "").toBe("");
    {
      expect(Array.isArray(listResponse.response.discount_list)).toBe(true);
    }
  }, 60000);
});
