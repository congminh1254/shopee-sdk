import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { FollowPrizeManager } from "../../managers/follow-prize.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("FollowPrizeManager (Generated Tests)", () => {
  let manager: FollowPrizeManager;
  let mockConfig: ShopeeConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };
    manager = new FollowPrizeManager(mockConfig);
  });

  describe("addFollowPrize", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        follow_prize_name: "shop_follow_prize_one",
        start_time: 1621844677,
        end_time: 1621944677,
        usage_quantity: 2000,
        min_spend: 200,
        reward_type: 1,
        discount_amount: 50,
        percentage: 2,
        max_price: 300,
      };
      const exampleResponse = {
        campagin_id: 2365452,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addFollowPrize(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/add_follow_prize",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteFollowPrize", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 24255,
      };
      const exampleResponse = {
        campagin_id: 24255,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteFollowPrize(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/delete_follow_prize",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endFollowPrize", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 123344,
      };
      const exampleResponse = {
        campaign_id: 123344,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endFollowPrize(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/end_follow_prize",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getFollowPrizeDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 1551,
      };
      const exampleResponse = {
        campaign_status: "ongoing",
        campaign_id: 1551,
        usage_quantity: 100,
        start_time: 1655891400,
        end_time: 1656581220,
        min_spend: 100,
        reward_type: 3,
        follow_prize_name: "follow prize01",
        discount_amount: 50,
        percentage: 1,
        max_price: 20,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getFollowPrizeDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/get_follow_prize_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getFollowPrizeList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 100,
        status: "upcoming",
      };
      const exampleResponse = {
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
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getFollowPrizeList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/get_follow_prize_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateFollowPrize", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        follow_prize_name: "shop_follow_prize",
        campaign_id: 123344,
        start_time: 1655341211,
        end_time: 1657760411,
        usage_quantity: 2000,
        min_spend: 123,
      };
      const exampleResponse = {
        campagin_id: 123344,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateFollowPrize(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/follow_prize/update_follow_prize",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
