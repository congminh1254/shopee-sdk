import { jest } from "@jest/globals";
import { FollowPrizeManager } from "../../managers/follow-prize.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddFollowPrizeResponse,
  DeleteFollowPrizeResponse,
  EndFollowPrizeResponse,
  GetFollowPrizeDetailResponse,
  GetFollowPrizeListResponse,
  UpdateFollowPrizeResponse,
  FollowPrizeStatus,
  FollowPrizeRewardType,
} from "../../schemas/follow-prize.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("FollowPrizeManager", () => {
  let followPrizeManager: FollowPrizeManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    followPrizeManager = new FollowPrizeManager(mockConfig);
  });

  describe("addFollowPrize", () => {
    it("should add a new follow prize with fix amount discount", async () => {
      const mockResponse: AddFollowPrizeResponse = {
        request_id: "70ef2c3c6e461cd4258f9962409634d5",
        error: "",
        message: "",
        response: {
          campagin_id: 2365452,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.addFollowPrize({
        follow_prize_name: "shop_follow_prize_one",
        start_time: 1621844677,
        end_time: 1621944677,
        usage_quantity: 2000,
        min_spend: 200,
        reward_type: FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT,
        discount_amount: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/follow_prize/add_follow_prize", {
        method: "POST",
        auth: true,
        body: {
          follow_prize_name: "shop_follow_prize_one",
          start_time: 1621844677,
          end_time: 1621944677,
          usage_quantity: 2000,
          min_spend: 200,
          reward_type: FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT,
          discount_amount: 50,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.campagin_id).toBe(2365452);
    });

    it("should add a new follow prize with percentage discount", async () => {
      const mockResponse: AddFollowPrizeResponse = {
        request_id: "70ef2c3c6e461cd4258f9962409634d5",
        error: "",
        message: "",
        response: {
          campagin_id: 2365453,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.addFollowPrize({
        follow_prize_name: "shop_follow_prize_two",
        start_time: 1621844677,
        end_time: 1621944677,
        usage_quantity: 1000,
        min_spend: 100,
        reward_type: FollowPrizeRewardType.DISCOUNT_BY_PERCENTAGE,
        percentage: 10,
        max_price: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/follow_prize/add_follow_prize", {
        method: "POST",
        auth: true,
        body: {
          follow_prize_name: "shop_follow_prize_two",
          start_time: 1621844677,
          end_time: 1621944677,
          usage_quantity: 1000,
          min_spend: 100,
          reward_type: FollowPrizeRewardType.DISCOUNT_BY_PERCENTAGE,
          percentage: 10,
          max_price: 50,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should add a new follow prize with coin cash back", async () => {
      const mockResponse: AddFollowPrizeResponse = {
        request_id: "70ef2c3c6e461cd4258f9962409634d5",
        error: "",
        message: "",
        response: {
          campagin_id: 2365454,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.addFollowPrize({
        follow_prize_name: "shop_follow_prize_three",
        start_time: 1621844677,
        end_time: 1621944677,
        usage_quantity: 500,
        min_spend: 150,
        reward_type: FollowPrizeRewardType.COIN_CASH_BACK,
        percentage: 5,
        max_price: 20,
      });

      expect(result.response.campagin_id).toBe(2365454);
    });
  });

  describe("deleteFollowPrize", () => {
    it("should delete a follow prize", async () => {
      const mockResponse: DeleteFollowPrizeResponse = {
        request_id: "513b227757f23c09d0b28c8c472f7478",
        error: "",
        message: "",
        response: {
          campagin_id: 24255,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.deleteFollowPrize({
        campaign_id: 24255,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/delete_follow_prize",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 24255,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.campagin_id).toBe(24255);
    });
  });

  describe("endFollowPrize", () => {
    it("should end a follow prize", async () => {
      const mockResponse: EndFollowPrizeResponse = {
        request_id: "27c3b0bfd1a00cea8f0b24c33a474f5a",
        error: "",
        message: "",
        response: {
          campaign_id: 324343,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.endFollowPrize({
        campaign_id: 123344,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/follow_prize/end_follow_prize", {
        method: "POST",
        auth: true,
        body: {
          campaign_id: 123344,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.campaign_id).toBe(324343);
    });
  });

  describe("getFollowPrizeDetail", () => {
    it("should get follow prize detail with fix amount discount", async () => {
      const mockResponse: GetFollowPrizeDetailResponse = {
        request_id: "4f0cdb3819658dfb1809a7c39bb785d1",
        error: "",
        message: "",
        response: {
          campaign_status: "ongoing",
          campaign_id: 1551,
          usage_quantity: 100,
          start_time: 1655891400,
          end_time: 1656581220,
          min_spend: 100,
          reward_type: FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT,
          follow_prize_name: "follow prize01",
          discount_amount: 50,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.getFollowPrizeDetail({
        campaign_id: 1551,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/get_follow_prize_detail",
        {
          method: "GET",
          auth: true,
          params: {
            campaign_id: 1551,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.campaign_id).toBe(1551);
      expect(result.response.campaign_status).toBe("ongoing");
      expect(result.response.reward_type).toBe(FollowPrizeRewardType.DISCOUNT_FIX_AMOUNT);
      expect(result.response.discount_amount).toBe(50);
    });

    it("should get follow prize detail with coin cash back", async () => {
      const mockResponse: GetFollowPrizeDetailResponse = {
        request_id: "4f0cdb3819658dfb1809a7c39bb785d1",
        error: "",
        message: "",
        response: {
          campaign_status: "ongoing",
          campaign_id: 1551,
          usage_quantity: 100,
          start_time: 1655891400,
          end_time: 1656581220,
          min_spend: 100,
          reward_type: FollowPrizeRewardType.COIN_CASH_BACK,
          follow_prize_name: "follow prize01",
          percentage: 1,
          max_price: 20,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.getFollowPrizeDetail({
        campaign_id: 1551,
      });

      expect(result.response.reward_type).toBe(FollowPrizeRewardType.COIN_CASH_BACK);
      expect(result.response.percentage).toBe(1);
      expect(result.response.max_price).toBe(20);
    });
  });

  describe("getFollowPrizeList", () => {
    it("should get list of upcoming follow prizes", async () => {
      const mockResponse: GetFollowPrizeListResponse = {
        request_id: "57a48cf80bec43c7891909bd9acaedb6",
        error: "",
        message: "",
        response: {
          more: false,
          follow_prize_list: [
            {
              campaign_id: 27,
              campaign_status: "upcoming",
              follow_prize_name: "shop_follow_prize3",
              start_time: 1655341211,
              end_time: 1657760411,
              usage_quantity: 2000,
              claimed: 0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.getFollowPrizeList({
        status: FollowPrizeStatus.UPCOMING,
        page_no: 1,
        page_size: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/get_follow_prize_list",
        {
          method: "GET",
          auth: true,
          params: {
            status: FollowPrizeStatus.UPCOMING,
            page_no: 1,
            page_size: 100,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.more).toBe(false);
      expect(result.response.follow_prize_list).toHaveLength(1);
      expect(result.response.follow_prize_list[0].campaign_status).toBe("upcoming");
      expect(result.response.follow_prize_list[0].claimed).toBe(0);
    });

    it("should get list of all follow prizes with pagination", async () => {
      const mockResponse: GetFollowPrizeListResponse = {
        request_id: "57a48cf80bec43c7891909bd9acaedb6",
        error: "",
        message: "",
        response: {
          more: true,
          follow_prize_list: [
            {
              campaign_id: 27,
              campaign_status: "upcoming",
              follow_prize_name: "shop_follow_prize3",
              start_time: 1655341211,
              end_time: 1657760411,
              usage_quantity: 2000,
              claimed: 0,
            },
            {
              campaign_id: 28,
              campaign_status: "ongoing",
              follow_prize_name: "shop_follow_prize4",
              start_time: 1655341211,
              end_time: 1657760411,
              usage_quantity: 1500,
              claimed: 200,
            },
            {
              campaign_id: 29,
              campaign_status: "expired",
              follow_prize_name: "shop_follow_prize5",
              start_time: 1655341211,
              end_time: 1657760411,
              usage_quantity: 1000,
              claimed: 950,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.getFollowPrizeList({
        status: FollowPrizeStatus.ALL,
        page_no: 1,
        page_size: 20,
      });

      expect(result.response.more).toBe(true);
      expect(result.response.follow_prize_list).toHaveLength(3);
      expect(result.response.follow_prize_list[1].claimed).toBe(200);
    });

    it("should get list of ongoing follow prizes", async () => {
      const mockResponse: GetFollowPrizeListResponse = {
        request_id: "57a48cf80bec43c7891909bd9acaedb6",
        error: "",
        message: "",
        response: {
          more: false,
          follow_prize_list: [
            {
              campaign_id: 28,
              campaign_status: "ongoing",
              follow_prize_name: "shop_follow_prize4",
              start_time: 1655341211,
              end_time: 1657760411,
              usage_quantity: 1500,
              claimed: 200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.getFollowPrizeList({
        status: FollowPrizeStatus.ONGOING,
      });

      expect(result.response.follow_prize_list[0].campaign_status).toBe("ongoing");
    });
  });

  describe("updateFollowPrize", () => {
    it("should update a follow prize", async () => {
      const mockResponse: UpdateFollowPrizeResponse = {
        request_id: "bf3197ba056a884119dd8aea3d89dcb5",
        error: "",
        message: "",
        response: {
          campagin_id: 123344,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.updateFollowPrize({
        campaign_id: 3434334,
        follow_prize_name: "shop_follow_prize_one",
        start_time: 1621844677,
        end_time: 1621944677,
        usage_quantity: 2000,
        min_spend: 200,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/update_follow_prize",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 3434334,
            follow_prize_name: "shop_follow_prize_one",
            start_time: 1621844677,
            end_time: 1621944677,
            usage_quantity: 2000,
            min_spend: 200,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.campagin_id).toBe(123344);
    });

    it("should update only specific fields of a follow prize", async () => {
      const mockResponse: UpdateFollowPrizeResponse = {
        request_id: "bf3197ba056a884119dd8aea3d89dcb5",
        error: "",
        message: "",
        response: {
          campagin_id: 123344,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await followPrizeManager.updateFollowPrize({
        campaign_id: 3434334,
        usage_quantity: 3000,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/update_follow_prize",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 3434334,
            usage_quantity: 3000,
          },
        }
      );

      expect(result.response.campagin_id).toBe(123344);
    });
  });
});
