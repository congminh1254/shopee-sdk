import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { BundleDealTimeStatus, BundleDealRuleType } from "../../schemas/bundle-deal.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)(
  "ShopeeSDK BundleDealManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    it("should successfully run the full bundle deal lifecycle", async () => {
      // 1. Create an upcoming bundle deal starting in 2 days and ending in 3 days
      const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
      const endTime = startTime + 86400; // Lasts 1 day
      const dealName = "Deal " + Date.now().toString().slice(-6); // Limit length to 25 chars max

      const addResponse = await sdk.bundleDeal.addBundleDeal({
        name: dealName,
        start_time: startTime,
        end_time: endTime,
        rule_type: BundleDealRuleType.DISCOUNT_PERCENTAGE,
        min_amount: 2,
        discount_percentage: 10,
        purchase_limit: 5,
      });

      expect(addResponse).toBeDefined();
      expect(addResponse.error || "").toBe("");
      expect(addResponse.response?.bundle_deal_id).toBeDefined();

      const testDealId = addResponse.response.bundle_deal_id;

      try {
        // 2. Retrieve the details of the created bundle deal
        const getResponse = await sdk.bundleDeal.getBundleDeal({
          bundle_deal_id: testDealId,
        });

        expect(getResponse).toBeDefined();
        expect(getResponse.error || "").toBe("");
        expect(getResponse.response?.bundle_deal_id).toBe(testDealId);
        expect(getResponse.response?.name).toBe(dealName);

        // 3. Update the bundle deal name
        const updatedName = "Deal U " + Date.now().toString().slice(-6);
        const updateResponse = await sdk.bundleDeal.updateBundleDeal({
          bundle_deal_id: testDealId,
          name: updatedName,
        });

        expect(updateResponse).toBeDefined();
        expect(updateResponse.error || "").toBe("");
        expect(updateResponse.response?.bundle_deal_id).toBe(testDealId);

        // Re-verify name update
        const getUpdatedResponse = await sdk.bundleDeal.getBundleDeal({
          bundle_deal_id: testDealId,
        });
        expect(getUpdatedResponse.response?.name).toBe(updatedName);
      } finally {
        // 4. Clean up by deleting the upcoming bundle deal activity
        const deleteResponse = await sdk.bundleDeal.deleteBundleDeal({
          bundle_deal_id: testDealId,
        });

        expect(deleteResponse).toBeDefined();
        expect(deleteResponse.error || "").toBe("");
        expect(deleteResponse.response?.bundle_deal_id).toBe(testDealId);
      }
    }, 60000);

    it("should successfully list shop bundle deals", async () => {
      const listResponse = await sdk.bundleDeal.getBundleDealList({
        time_status: BundleDealTimeStatus.ALL,
        page_no: 1,
        page_size: 10,
      });

      expect(listResponse).toBeDefined();
      expect(listResponse.error || "").toBe("");
      if (listResponse.response?.bundle_deal_list) {
        expect(Array.isArray(listResponse.response.bundle_deal_list)).toBe(true);
      }
    }, 60000);
  }
);
