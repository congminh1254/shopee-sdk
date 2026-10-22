import { pollRead, testName, withCleanup } from "../utils/sandbox-fixtures.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { BundleDealTimeStatus, BundleDealRuleType } from "../utils/legacy-enums.js";

const { runTests, initSdk } = setupIntegrationTest();
const { runTests: runMutations } = setupIntegrationTest({ mutates: true });

(runTests ? describe : describe.skip)(
  "ShopeeSDK BundleDealManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    (runMutations ? it : it.skip)(
      "should successfully run the full bundle deal lifecycle",
      async () => {
        // 1. Create an upcoming bundle deal starting in 2 days and ending in 3 days
        const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
        const endTime = startTime + 86400; // Lasts 1 day
        const dealName = testName("Deal"); // Limit length to 25 chars max

        const addResponse = await sdk.bundleDeal.addBundleDeal({
          name: dealName,
          start_time: startTime,
          end_time: endTime,
          rule_type: BundleDealRuleType.DISCOUNT_PERCENTAGE,
          min_amount: 2,
          discount_percentage: 10,
          purchase_limit: 5,
        } as any);

        const testDealId = addResponse.response.bundle_deal_id!;

        await withCleanup(
          testDealId,
          async () => {
            expect(addResponse).toBeDefined();
            expect(addResponse.error || "").toBe("");
            expect(addResponse.response?.bundle_deal_id).toBeDefined();

            const getResponse = await sdk.bundleDeal.getBundleDeal({
              bundle_deal_id: testDealId,
            });
            expect(getResponse).toBeDefined();
            expect(getResponse.error || "").toBe("");
            expect(getResponse.response?.bundle_deal_id).toBe(testDealId);
            expect(getResponse.response?.name).toBe(dealName);
            const updatedName = "Deal U " + Date.now().toString().slice(-6);
            const updateResponse = await sdk.bundleDeal.updateBundleDeal({
              bundle_deal_id: testDealId,
              name: updatedName,
            });
            expect(updateResponse).toBeDefined();
            expect(updateResponse.error || "").toBe("");
            expect(updateResponse.response?.bundle_deal_id).toBe(testDealId);
            const getUpdatedResponse = await pollRead(
              () => sdk.bundleDeal.getBundleDeal({ bundle_deal_id: testDealId }),
              (value) => value.response?.name === updatedName
            );
            expect(getUpdatedResponse.response?.name).toBe(updatedName);
          },
          async () => {
            const deleteResponse = await sdk.bundleDeal.deleteBundleDeal({
              bundle_deal_id: testDealId,
            });
            expect(deleteResponse).toBeDefined();
            expect(deleteResponse.error || "").toBe("");
            expect(deleteResponse.response?.bundle_deal_id).toBe(testDealId);
          }
        );
      },
      60000
    );

    it("should successfully list shop bundle deals", async () => {
      const listResponse = await sdk.bundleDeal.getBundleDealList({
        time_status: BundleDealTimeStatus.ALL,
        page_no: 1,
        page_size: 10,
      });

      expect(listResponse).toBeDefined();
      expect(listResponse.error || "").toBe("");
      {
        expect(Array.isArray(listResponse.response.bundle_deal_list)).toBe(true);
      }
    }, 60000);
  }
);
