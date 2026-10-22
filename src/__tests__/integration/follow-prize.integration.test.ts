import { pollRead, testName, withCleanup } from "../utils/sandbox-fixtures.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { FollowPrizeStatus, FollowPrizeRewardType } from "../utils/legacy-enums.js";

const { runTests, initSdk } = setupIntegrationTest();
const { runTests: runMutations } = setupIntegrationTest({ mutates: true });

(runTests ? describe : describe.skip)(
  "ShopeeSDK FollowPrizeManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    (runMutations ? it : it.skip)(
      "should successfully run the full follow prize lifecycle",
      async () => {
        // 1. Create an upcoming follow prize campaign starting in 2 days and ending in 5 days (must be at least 1 day duration)
        const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
        const endTime = startTime + 86400 * 3; // Lasts 3 days
        const campaignName = testName("Prize"); // Limit length to 20 chars max

        const addResponse = await sdk.followPrize.addFollowPrize({
          follow_prize_name: campaignName,
          start_time: startTime,
          end_time: endTime,
          usage_quantity: 100,
          min_spend: 5000,
          reward_type: FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT,
          discount_amount: 1000,
        });

        const responseData = addResponse.response as
          { campaign_id?: number; campagin_id?: number } | undefined;
        const testCampaignId = (responseData?.campaign_id ?? responseData?.campagin_id)!;
        expect(testCampaignId).toBeDefined();

        await withCleanup(
          testCampaignId,
          async () => {
            expect(addResponse).toBeDefined();
            expect(addResponse.error || "").toBe("");

            const getResponse = await pollRead(
              () => sdk.followPrize.getFollowPrizeDetail({ campaign_id: testCampaignId }),
              (value) => value.response?.campaign_id === testCampaignId
            );
            expect(getResponse).toBeDefined();
            expect(getResponse.error || "").toBe("");
            expect(getResponse.response?.campaign_id).toBe(testCampaignId);
            expect(getResponse.response?.follow_prize_name).toBe(campaignName);
            const updatedName = "Prize U " + Date.now().toString().slice(-6);
            const updateResponse = await sdk.followPrize.updateFollowPrize({
              campaign_id: testCampaignId,
              follow_prize_name: updatedName,
            });
            expect(updateResponse).toBeDefined();
            expect(updateResponse.error || "").toBe("");
            const getUpdatedResponse = await pollRead(
              () => sdk.followPrize.getFollowPrizeDetail({ campaign_id: testCampaignId }),
              (value) => value.response?.follow_prize_name === updatedName
            );
            expect(getUpdatedResponse.response?.follow_prize_name).toBe(updatedName);
          },
          async () => {
            const deleteResponse = await sdk.followPrize.deleteFollowPrize({
              campaign_id: testCampaignId,
            });
            expect(deleteResponse).toBeDefined();
            expect(deleteResponse.error || "").toBe("");
          }
        );
      },
      60000
    );

    it("should successfully list shop follow prizes", async () => {
      const listResponse = await sdk.followPrize.getFollowPrizeList({
        status: FollowPrizeStatus.ALL,
        page_no: 1,
        page_size: 10,
      });

      expect(listResponse).toBeDefined();
      expect(listResponse.error || "").toBe("");
      {
        expect(Array.isArray(listResponse.response.follow_prize_list)).toBe(true);
      }
    }, 60000);
  }
);
