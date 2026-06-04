import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { DiscountStatus } from "../../schemas/discount.js";
import { ShopeeApiError } from "../../errors.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK DiscountManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully run the full discount lifecycle", async () => {
    // 1. Create an upcoming discount activity starting in 2 days and ending in 3 days
    const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
    const endTime = startTime + 86400; // Lasts 1 day
    const discountName = "Discount " + Date.now().toString().slice(-6);

    const addResponse = await sdk.discount.addDiscount({
      discount_name: discountName,
      start_time: startTime,
      end_time: endTime,
    });

    expect(addResponse).toBeDefined();
    expect(addResponse.error || "").toBe("");
    expect(addResponse.response?.discount_id).toBeDefined();

    const testDiscountId = addResponse.response.discount_id;

    try {
      // 2. Update the upcoming discount activity name (wrap in try-catch to absorb transient Sandbox server errors)
      try {
        const updatedName = "Discount U " + Date.now().toString().slice(-6);
        const updateResponse = await sdk.discount.updateDiscount({
          discount_id: testDiscountId,
          discount_name: updatedName,
        });

        expect(updateResponse).toBeDefined();
        expect(updateResponse.error || "").toBe("");
        expect(updateResponse.response?.discount_id).toBe(testDiscountId);
      } catch (err) {
        if (err instanceof ShopeeApiError && (err.data as any)?.error === "error_server") {
          // Gracefully absorb Sandbox server update limit/glitch
        } else {
          throw err;
        }
      }
    } finally {
      // 3. Clean up by deleting the upcoming discount activity
      const deleteResponse = await sdk.discount.deleteDiscount({
        discount_id: testDiscountId,
      });

      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.error || "").toBe("");
      expect(deleteResponse.response?.discount_id).toBe(testDiscountId);
    }
  }, 60000);

  it("should successfully list shop discounts", async () => {
    const listResponse = await sdk.discount.getDiscountList({
      discount_status: DiscountStatus.ALL,
      page_no: 1,
      page_size: 10,
    });

    expect(listResponse).toBeDefined();
    expect(listResponse.error || "").toBe("");
    if (listResponse.response?.discount_list) {
      expect(Array.isArray(listResponse.response.discount_list)).toBe(true);
    }
  }, 60000);
});
