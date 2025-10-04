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
  CheckCreateGmsProductCampaignEligibilityResponse,
  CreateAutoProductAdsResponse,
  CreateGmsProductCampaignResponse,
  CreateManualProductAdsResponse,
  EditAutoProductAdsResponse,
  EditGmsItemProductCampaignResponse,
  EditGmsProductCampaignResponse,
  EditManualProductAdKeywordsResponse,
  EditManualProductAdsResponse,
  GetAdsFacilShopRateResponse,
  GetCreateProductAdBudgetSuggestionResponse,
  GetGmsCampaignPerformanceResponse,
  GetGmsItemPerformanceResponse,
  ListGmsUserDeletedItemResponse,
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
          total_balance: 1000.5,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getTotalBalance();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_total_balance", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.total_balance).toBe(1000.5);
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
              suggested_bid: 0.3,
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

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_recommended_item_list", {
        method: "GET",
        auth: true,
      });

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
              expense: 25.5,
              conversion: 5,
              gmv: 250.0,
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
              expense: 600.0,
              conversion: 120,
              gmv: 6000.0,
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
              expense: 125.0,
              conversion: 25,
              gmv: 1250.0,
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
              expense: 5.0,
              conversion: 1,
              gmv: 50.0,
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
              daily_budget: 100.0,
              total_budget: 3000.0,
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

  describe("checkCreateGmsProductCampaignEligibility", () => {
    it("should check eligibility successfully when eligible", async () => {
      const mockResponse: CheckCreateGmsProductCampaignEligibilityResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          is_eligible: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.checkCreateGmsProductCampaignEligibility();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/check_create_gms_product_campaign_eligibility",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result.error).toBe("");
      expect(result.response.is_eligible).toBe(true);
    });

    it("should check eligibility with reason when not eligible", async () => {
      const mockResponse: CheckCreateGmsProductCampaignEligibilityResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          is_eligible: false,
          reason: "active_campaign",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.checkCreateGmsProductCampaignEligibility();

      expect(result.response.is_eligible).toBe(false);
      expect(result.response.reason).toBe("active_campaign");
    });
  });

  describe("createAutoProductAds", () => {
    it("should create auto product ads successfully", async () => {
      const mockResponse: CreateAutoProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 987654,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.createAutoProductAds({
        reference_id: "ref-12345",
        budget: 100.5,
        start_date: "01-01-2024",
        end_date: "31-01-2024",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/create_auto_product_ads", {
        method: "POST",
        auth: true,
        body: {
          reference_id: "ref-12345",
          budget: 100.5,
          start_date: "01-01-2024",
          end_date: "31-01-2024",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(987654);
    });

    it("should create auto product ads with unlimited duration", async () => {
      const mockResponse: CreateAutoProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 987655,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.createAutoProductAds({
        reference_id: "ref-12346",
        budget: 50.0,
        start_date: "01-01-2024",
      });

      expect(result.response.campaign_id).toBe(987655);
    });
  });

  describe("createGmsProductCampaign", () => {
    it("should create GMS product campaign successfully", async () => {
      const mockResponse: CreateGmsProductCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.createGmsProductCampaign({
        start_date: "01-01-2024",
        end_date: "31-01-2024",
        daily_budget: 200.0,
        reference_id: "gms-ref-001",
        roas_target: 5.5,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/create_gms_product_campaign", {
        method: "POST",
        auth: true,
        body: {
          start_date: "01-01-2024",
          end_date: "31-01-2024",
          daily_budget: 200.0,
          reference_id: "gms-ref-001",
          roas_target: 5.5,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(111222);
    });
  });

  describe("createManualProductAds", () => {
    it("should create manual product ads with auto bidding", async () => {
      const mockResponse: CreateManualProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 333444,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.createManualProductAds({
        reference_id: "manual-ref-001",
        budget: 150.0,
        start_date: "01-01-2024",
        bidding_method: "auto",
        item_id: 123456,
        roas_target: 3.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/create_manual_product_ads", {
        method: "POST",
        auth: true,
        body: {
          reference_id: "manual-ref-001",
          budget: 150.0,
          start_date: "01-01-2024",
          bidding_method: "auto",
          item_id: 123456,
          roas_target: 3.0,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(333444);
    });

    it("should create manual product ads with manual bidding and keywords", async () => {
      const mockResponse: CreateManualProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 333445,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.createManualProductAds({
        reference_id: "manual-ref-002",
        budget: 100.0,
        start_date: "01-01-2024",
        bidding_method: "manual",
        item_id: 789012,
        selected_keywords: [
          {
            keyword: "phone case",
            match_type: "exact",
            bid_price_per_click: 0.5,
          },
        ],
        enhanced_cpc: true,
      });

      expect(result.response.campaign_id).toBe(333445);
    });
  });

  describe("editAutoProductAds", () => {
    it("should edit auto product ads successfully", async () => {
      const mockResponse: EditAutoProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 987654,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editAutoProductAds({
        reference_id: "edit-ref-001",
        campaign_id: 987654,
        edit_action: "budget",
        budget: 200.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/edit_auto_product_ads", {
        method: "POST",
        auth: true,
        body: {
          reference_id: "edit-ref-001",
          campaign_id: 987654,
          edit_action: "budget",
          budget: 200.0,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(987654);
    });
  });

  describe("editGmsItemProductCampaign", () => {
    it("should add items to GMS campaign successfully", async () => {
      const mockResponse: EditGmsItemProductCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editGmsItemProductCampaign({
        campaign_id: 111222,
        edit_action: "add",
        item_id_list: [123456, 789012],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_gms_item_product_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 111222,
            edit_action: "add",
            item_id_list: [123456, 789012],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(111222);
    });

    it("should remove items from GMS campaign successfully", async () => {
      const mockResponse: EditGmsItemProductCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editGmsItemProductCampaign({
        campaign_id: 111222,
        edit_action: "remove",
        item_id_list: [789012],
      });

      expect(result.response.campaign_id).toBe(111222);
    });
  });

  describe("editGmsProductCampaign", () => {
    it("should edit GMS product campaign successfully", async () => {
      const mockResponse: EditGmsProductCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editGmsProductCampaign({
        campaign_id: 111222,
        edit_action: "budget",
        daily_budget: 300.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/edit_gms_product_campaign", {
        method: "POST",
        auth: true,
        body: {
          campaign_id: 111222,
          edit_action: "budget",
          daily_budget: 300.0,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(111222);
    });
  });

  describe("editManualProductAdKeywords", () => {
    it("should add keywords to manual product ads successfully", async () => {
      const mockResponse: EditManualProductAdKeywordsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 333444,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editManualProductAdKeywords({
        reference_id: "keyword-ref-001",
        campaign_id: 333444,
        edit_action: "add",
        selected_keywords: [
          {
            keyword: "wireless earbuds",
            match_type: "broad",
            bid_price_per_click: 0.75,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_manual_product_ad_keywords",
        {
          method: "POST",
          auth: true,
          body: {
            reference_id: "keyword-ref-001",
            campaign_id: 333444,
            edit_action: "add",
            selected_keywords: [
              {
                keyword: "wireless earbuds",
                match_type: "broad",
                bid_price_per_click: 0.75,
              },
            ],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(333444);
    });
  });

  describe("editManualProductAds", () => {
    it("should edit manual product ads successfully", async () => {
      const mockResponse: EditManualProductAdsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 333444,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.editManualProductAds({
        reference_id: "edit-manual-ref-001",
        campaign_id: 333444,
        edit_action: "budget",
        budget: 250.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/edit_manual_product_ads", {
        method: "POST",
        auth: true,
        body: {
          reference_id: "edit-manual-ref-001",
          campaign_id: 333444,
          edit_action: "budget",
          budget: 250.0,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(333444);
    });
  });

  describe("getAdsFacilShopRate", () => {
    it("should get ads facil shop rate successfully", async () => {
      const mockResponse: GetAdsFacilShopRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_rate: 0.05,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getAdsFacilShopRate();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_ads_facil_shop_rate", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.shop_rate).toBe(0.05);
    });
  });

  describe("getCreateProductAdBudgetSuggestion", () => {
    it("should get budget suggestion for auto product ads", async () => {
      const mockResponse: GetCreateProductAdBudgetSuggestionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          budget: {
            min_budget: 50.0,
            max_budget: 500.0,
            recommended_budget: 150.0,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getCreateProductAdBudgetSuggestion({
        reference_id: "budget-ref-001",
        product_selection: "auto",
        campaign_placement: "all",
        bidding_method: "auto",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_create_product_ad_budget_suggestion",
        {
          method: "GET",
          auth: true,
          params: {
            reference_id: "budget-ref-001",
            product_selection: "auto",
            campaign_placement: "all",
            bidding_method: "auto",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.budget.recommended_budget).toBe(150.0);
    });

    it("should get budget suggestion for manual product ads", async () => {
      const mockResponse: GetCreateProductAdBudgetSuggestionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          budget: {
            min_budget: 30.0,
            max_budget: 300.0,
            recommended_budget: 100.0,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getCreateProductAdBudgetSuggestion({
        reference_id: "budget-ref-002",
        product_selection: "manual",
        campaign_placement: "search",
        bidding_method: "manual",
        item_id: 123456,
        enhanced_cpc: "true",
      });

      expect(result.response.budget.min_budget).toBe(30.0);
    });
  });

  describe("getGmsCampaignPerformance", () => {
    it("should get GMS campaign performance successfully", async () => {
      const mockResponse: GetGmsCampaignPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
          report: {
            impression: 10000,
            clicks: 500,
            ctr: 5.0,
            expense: 250.0,
            gmv: 2500.0,
            roas: 10.0,
            orders: 100,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getGmsCampaignPerformance({
        campaign_id: 111222,
        start_date: "01-01-2024",
        end_date: "31-01-2024",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_gms_campaign_performance",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 111222,
            start_date: "01-01-2024",
            end_date: "31-01-2024",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(111222);
      expect(result.response.report.roas).toBe(10.0);
    });
  });

  describe("getGmsItemPerformance", () => {
    it("should get GMS item performance successfully", async () => {
      const mockResponse: GetGmsItemPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
          result_list: [
            {
              item_id: 123456,
              impression: 5000,
              clicks: 250,
              ctr: 5.0,
              expense: 125.0,
              gmv: 1250.0,
              roas: 10.0,
              orders: 50,
            },
            {
              item_id: 789012,
              impression: 5000,
              clicks: 250,
              ctr: 5.0,
              expense: 125.0,
              gmv: 1250.0,
              roas: 10.0,
              orders: 50,
            },
          ],
          total: 2,
          has_next_page: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getGmsItemPerformance({
        campaign_id: 111222,
        start_date: "01-01-2024",
        end_date: "31-01-2024",
        offset: 0,
        limit: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/get_gms_item_performance", {
        method: "POST",
        auth: true,
        body: {
          campaign_id: 111222,
          start_date: "01-01-2024",
          end_date: "31-01-2024",
          offset: 0,
          limit: 50,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.result_list).toHaveLength(2);
      expect(result.response.total).toBe(2);
      expect(result.response.has_next_page).toBe(false);
    });
  });

  describe("listGmsUserDeletedItem", () => {
    it("should list GMS user deleted items successfully", async () => {
      const mockResponse: ListGmsUserDeletedItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
          item_id_list: [123456, 789012],
          total: 2,
          has_next_page: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.listGmsUserDeletedItem({
        offset: 0,
        limit: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/list_gms_user_deleted_item", {
        method: "POST",
        auth: true,
        body: {
          offset: 0,
          limit: 50,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.item_id_list).toHaveLength(2);
      expect(result.response.total).toBe(2);
    });

    it("should list GMS user deleted items without parameters", async () => {
      const mockResponse: ListGmsUserDeletedItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 111222,
          item_id_list: [],
          total: 0,
          has_next_page: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.listGmsUserDeletedItem();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/list_gms_user_deleted_item", {
        method: "POST",
        auth: true,
        body: {},
      });

      expect(result.error).toBe("");
      expect(result.response.item_id_list).toHaveLength(0);
    });
  });
});
