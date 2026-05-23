import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { FollowPrizeStatus, FollowPrizeRewardType } from "../../schemas/follow-prize.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)(
  "ShopeeSDK FollowPrizeManager Sandbox Integration Tests",
  () => {
    let sdk: ShopeeSDK;

    beforeAll(async () => {
      sdk = await initSdk();
    });

    it("should successfully run the full follow prize lifecycle", async () => {
      // Pre-test cleanup: delete/end any existing upcoming/ongoing campaigns to prevent campaign_overlap
      try {
        const activeList = await sdk.followPrize.getFollowPrizeList({
          status: FollowPrizeStatus.ALL,
          page_no: 1,
          page_size: 100,
        });
        if (activeList.response?.follow_prize_list) {
          for (const item of activeList.response.follow_prize_list) {
            if (item.campaign_status === "upcoming") {
              await sdk.followPrize.deleteFollowPrize({ campaign_id: item.campaign_id });
            } else if (item.campaign_status === "ongoing") {
              await sdk.followPrize.endFollowPrize({ campaign_id: item.campaign_id });
            }
          }
        }
      } catch (cleanupErr) {
        // eslint-disable-next-line no-console
        console.warn("Follow Prize pre-test cleanup warning (ignoring):", cleanupErr);
      }

      // 1. Create an upcoming follow prize campaign starting in 2 days and ending in 5 days (must be at least 1 day duration)
      const startTime = Math.floor(Date.now() / 1000) + 86400 * 2; // In 2 days
      const endTime = startTime + 86400 * 3; // Lasts 3 days
      const campaignName = "Prize " + Date.now().toString().slice(-6); // Limit length to 20 chars max

      const addResponse = await sdk.followPrize.addFollowPrize({
        follow_prize_name: campaignName,
        start_time: startTime,
        end_time: endTime,
        usage_quantity: 100,
        min_spend: 5000,
        reward_type: FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT,
        discount_amount: 1000,
      });

      expect(addResponse).toBeDefined();
      expect(addResponse.error || "").toBe("");
      const testCampaignId =
        (addResponse.response as any)?.campaign_id || (addResponse.response as any)?.campagin_id;
      expect(testCampaignId).toBeDefined();

      try {
        // 2. Retrieve the details of the created campaign
        const getResponse = await sdk.followPrize.getFollowPrizeDetail({
          campaign_id: testCampaignId,
        });

        expect(getResponse).toBeDefined();
        expect(getResponse.error || "").toBe("");
        expect(getResponse.response?.campaign_id).toBe(testCampaignId);
        expect(getResponse.response?.follow_prize_name).toBe(campaignName);

        // 3. Update the upcoming follow prize name
        const updatedName = "Prize U " + Date.now().toString().slice(-6);
        const updateResponse = await sdk.followPrize.updateFollowPrize({
          campaign_id: testCampaignId,
          follow_prize_name: updatedName,
        });

        expect(updateResponse).toBeDefined();
        expect(updateResponse.error || "").toBe("");

        // Re-verify the name update
        const getUpdatedResponse = await sdk.followPrize.getFollowPrizeDetail({
          campaign_id: testCampaignId,
        });
        expect(getUpdatedResponse.response?.follow_prize_name).toBe(updatedName);
      } finally {
        // 4. Clean up by deleting the upcoming follow prize campaign
        const deleteResponse = await sdk.followPrize.deleteFollowPrize({
          campaign_id: testCampaignId,
        });

        expect(deleteResponse).toBeDefined();
        expect(deleteResponse.error || "").toBe("");
      }
    }, 60000);

    it("should successfully list shop follow prizes", async () => {
      const listResponse = await sdk.followPrize.getFollowPrizeList({
        status: FollowPrizeStatus.ALL,
        page_no: 1,
        page_size: 10,
      });

      expect(listResponse).toBeDefined();
      expect(listResponse.error || "").toBe("");
      if (listResponse.response?.follow_prize_list) {
        expect(Array.isArray(listResponse.response.follow_prize_list)).toBe(true);
      }
    }, 60000);
  }
);
