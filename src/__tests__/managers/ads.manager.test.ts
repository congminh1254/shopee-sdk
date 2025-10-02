import { jest } from "@jest/globals";
import { AdsManager } from "../../managers/ads.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetTotalBalanceResponse,
  GetShopToggleInfoResponse,
  GetRecommendedKeywordListResponse,
  GetRecommendedItemListResponse,
  GetAllCpcAdsHourlyPerformanceResponse,
  GetAllCpcAdsDailyPerformanceResponse,
  GetProductCampaignDailyPerformanceResponse,
  GetProductCampaignHourlyPerformanceResponse,
  GetProductLevelCampaignIdListResponse,
  GetProductLevelCampaignSettingInfoResponse,
  GetProductRecommendedRoiTargetResponse,
} from "../../schemas/ads.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("AdsManager", () => {
  let adsManager: AdsManager;
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

    adsManager = new AdsManager(mockConfig);
  });

  describe("getTotalBalance", () => {
    it("should get total balance successfully", async () => {
      const mockResponse: GetTotalBalanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          data_timestamp: 1609459200,
          total_balance: 1000.50,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getTotalBalance();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_total_balance", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.total_balance).toBe(1000.50);
    });

    it("should handle warning in response", async () => {
      const mockResponse: GetTotalBalanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          data_timestamp: 1609459200,
          total_balance: 500,
        },
        warning: "Some data may be delayed",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getTotalBalance();

      expect(result.warning).toBe("Some data may be delayed");
    });
  });

  describe("getShopToggleInfo", () => {
    it("should get shop toggle info successfully", async () => {
      const mockResponse: GetShopToggleInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          data_timestamp: 1609459200,
          auto_top_up: true,
          campaign_surge: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getShopToggleInfo();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_shop_toggle_info", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.auto_top_up).toBe(true);
      expect(result.response.campaign_surge).toBe(false);
    });
  });

  describe("getRecommendedKeywordList", () => {
    it("should get recommended keyword list successfully", async () => {
      const mockResponse: GetRecommendedKeywordListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          suggested_keywords: [
            {
              keyword: "phone case",
              quality_score: 8.5,
              search_volume: 10000,
              suggested_bid: 0.25,
            },
            {
              keyword: "iphone case",
              quality_score: 9.0,
              search_volume: 15000,
              suggested_bid: 0.30,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getRecommendedKeywordList({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_recommended_keyword_list",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.suggested_keywords).toHaveLength(2);
      expect(result.response.suggested_keywords[0].keyword).toBe("phone case");
    });

    it("should handle optional input_keyword parameter", async () => {
      const mockResponse: GetRecommendedKeywordListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          input_keyword: "phone",
          suggested_keywords: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getRecommendedKeywordList({
        item_id: 123456,
        input_keyword: "phone",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_recommended_keyword_list",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
            input_keyword: "phone",
          },
        }
      );

      expect(result.response.input_keyword).toBe("phone");
    });
  });

  describe("getRecommendedItemList", () => {
    it("should get recommended item list successfully", async () => {
      const mockResponse: GetRecommendedItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: [
          {
            item_id: 123456,
            item_status_list: ["active"],
            sku_tag_list: ["best_selling"],
            ongoing_ad_type_list: ["search_ads"],
          },
          {
            item_id: 789012,
            item_status_list: ["active"],
            sku_tag_list: ["best_roi"],
            ongoing_ad_type_list: [],
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getRecommendedItemList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_recommended_item_list",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result.error).toBe("");
      expect(result.response).toHaveLength(2);
      expect(result.response[0].sku_tag_list).toContain("best_selling");
    });
  });

  describe("getAllCpcAdsHourlyPerformance", () => {
    it("should get hourly performance data successfully", async () => {
      const mockResponse: GetAllCpcAdsHourlyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          timestamp: 1609459200,
          total_data: [
            {
              date: "2021-01-01",
              hour: 10,
              impression: 1000,
              click: 50,
              expense: 25.50,
              conversion: 5,
              gmv: 250.00,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getAllCpcAdsHourlyPerformance({
        start_date: "2021-01-01",
        end_date: "2021-01-01",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_all_cpc_ads_hourly_performance",
        {
          method: "GET",
          auth: true,
          params: {
            start_date: "2021-01-01",
            end_date: "2021-01-01",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.total_data).toHaveLength(1);
      expect(result.response.total_data[0].impression).toBe(1000);
    });
  });

  describe("getAllCpcAdsDailyPerformance", () => {
    it("should get daily performance data successfully", async () => {
      const mockResponse: GetAllCpcAdsDailyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          timestamp: 1609459200,
          total_data: [
            {
              date: "2021-01-01",
              impression: 24000,
              click: 1200,
              expense: 600.00,
              conversion: 120,
              gmv: 6000.00,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getAllCpcAdsDailyPerformance({
        start_date: "2021-01-01",
        end_date: "2021-01-31",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_all_cpc_ads_daily_performance",
        {
          method: "GET",
          auth: true,
          params: {
            start_date: "2021-01-01",
            end_date: "2021-01-31",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.total_data[0].impression).toBe(24000);
    });
  });

  describe("getProductCampaignDailyPerformance", () => {
    it("should get product campaign daily performance successfully", async () => {
      const mockResponse: GetProductCampaignDailyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          timestamp: 1609459200,
          campaign_data: [
            {
              campaign_id: 1001,
              date: "2021-01-01",
              impression: 5000,
              click: 250,
              expense: 125.00,
              conversion: 25,
              gmv: 1250.00,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductCampaignDailyPerformance({
        start_date: "2021-01-01",
        end_date: "2021-01-31",
        campaign_id_list: [1001],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_campaign_daily_performance",
        {
          method: "GET",
          auth: true,
          params: {
            start_date: "2021-01-01",
            end_date: "2021-01-31",
            campaign_id_list: [1001],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_data[0].campaign_id).toBe(1001);
    });
  });

  describe("getProductCampaignHourlyPerformance", () => {
    it("should get product campaign hourly performance successfully", async () => {
      const mockResponse: GetProductCampaignHourlyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          timestamp: 1609459200,
          campaign_data: [
            {
              campaign_id: 1001,
              date: "2021-01-01",
              hour: 15,
              impression: 200,
              click: 10,
              expense: 5.00,
              conversion: 1,
              gmv: 50.00,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductCampaignHourlyPerformance({
        start_date: "2021-01-01",
        end_date: "2021-01-01",
        campaign_id_list: [1001],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_campaign_hourly_performance",
        {
          method: "GET",
          auth: true,
          params: {
            start_date: "2021-01-01",
            end_date: "2021-01-01",
            campaign_id_list: [1001],
          },
        }
      );

      expect(result.response.campaign_data[0].hour).toBe(15);
    });
  });

  describe("getProductLevelCampaignIdList", () => {
    it("should get product level campaign ID list successfully", async () => {
      const mockResponse: GetProductLevelCampaignIdListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id_list: [1001, 1002, 1003],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductLevelCampaignIdList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_level_campaign_id_list",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_id_list).toHaveLength(3);
      expect(result.response.campaign_id_list).toContain(1001);
    });
  });

  describe("getProductLevelCampaignSettingInfo", () => {
    it("should get product level campaign setting info successfully", async () => {
      const mockResponse: GetProductLevelCampaignSettingInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_list: [
            {
              campaign_id: 1001,
              campaign_name: "Summer Sale",
              campaign_status: "ongoing",
              daily_budget: 100.00,
              total_budget: 3000.00,
              placement_list: ["search", "discovery"],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductLevelCampaignSettingInfo({
        campaign_id_list: [1001],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_level_campaign_setting_info",
        {
          method: "GET",
          auth: true,
          params: {
            campaign_id_list: [1001],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_list[0].campaign_name).toBe("Summer Sale");
    });
  });

  describe("getProductRecommendedRoiTarget", () => {
    it("should get product recommended ROI target successfully", async () => {
      const mockResponse: GetProductRecommendedRoiTargetResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          recommended_roi_target: 3.5,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductRecommendedRoiTarget({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_recommended_roi_target",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.recommended_roi_target).toBe(3.5);
    });
  });
});
