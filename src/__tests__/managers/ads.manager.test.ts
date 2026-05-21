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
  CreateGmsProductCampaignResponse,
  CreateManualProductAdsResponse,
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
const mockFetch = jest.fn() as any;
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
      region: ShopeeRegion.GLOBAL,
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
        response: [
          {
            hour: 10,
            date: "01-01-2021",
            impression: 1000,
            clicks: 50,
            ctr: 0.05,
            direct_order: 5,
            broad_order: 10,
            direct_conversions: 5,
            broad_conversions: 10,
            direct_item_sold: 5,
            broad_item_sold: 10,
            direct_gmv: 250.0,
            broad_gmv: 500.0,
            expense: 25.5,
            cost_per_conversion: 5.1,
            direct_roas: 9.8,
            broad_roas: 19.6,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getAllCpcAdsHourlyPerformance({
        performance_date: "01-01-2021",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_all_cpc_ads_hourly_performance",
        {
          method: "GET",
          auth: true,
          params: {
            performance_date: "01-01-2021",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response).toHaveLength(1);
      expect(result.response[0].impression).toBe(1000);
    });
  });

  describe("getAllCpcAdsDailyPerformance", () => {
    it("should get daily performance data successfully", async () => {
      const mockResponse: GetAllCpcAdsDailyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: [
          {
            date: "2021-01-01",
            impression: 24000,
            clicks: 1200,
            ctr: 0.05,
            direct_order: 120,
            broad_order: 240,
            direct_conversions: 120,
            broad_conversions: 240,
            direct_item_sold: 120,
            broad_item_sold: 240,
            direct_gmv: 6000.0,
            broad_gmv: 12000.0,
            expense: 600.0,
            cost_per_conversion: 5.0,
            direct_roas: 10.0,
            broad_roas: 20.0,
          },
        ],
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
      expect(result.response[0].impression).toBe(24000);
    });
  });

  describe("getProductCampaignDailyPerformance", () => {
    it("should get product campaign daily performance successfully", async () => {
      const mockResponse: GetProductCampaignDailyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: [
          {
            shop_id: 12345,
            region: "SG",
            campaign_list: [
              {
                campaign_id: 1001,
                ad_type: "manual",
                campaign_placement: "search",
                ad_name: "Test Ad",
                metrics_list: [
                  {
                    date: "01-01-2021",
                    impression: 5000,
                    clicks: 250,
                    ctr: 5.0,
                    expense: 125.0,
                    broad_gmv: 1250.0,
                    broad_order: 25,
                    broad_order_amount: 25,
                    broad_roi: 10.0,
                    broad_cir: 10.0,
                    cr: 10.0,
                    cpc: 0.5,
                    direct_order: 25,
                    direct_order_amount: 25,
                    direct_gmv: 1250.0,
                    direct_roi: 10.0,
                    direct_cir: 10.0,
                    direct_cr: 10.0,
                    cpdc: 5.0,
                  },
                ],
              },
            ],
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductCampaignDailyPerformance({
        start_date: "2021-01-01",
        end_date: "2021-01-31",
        campaign_id_list: "1001",
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
            campaign_id_list: "1001",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response[0].campaign_list[0].campaign_id).toBe(1001);
    });
  });

  describe("getProductCampaignHourlyPerformance", () => {
    it("should get product campaign hourly performance successfully", async () => {
      const mockResponse: GetProductCampaignHourlyPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: [
          {
            shop_id: 12345,
            region: "SG",
            campaign_list: [
              {
                campaign_id: 1001,
                ad_type: "manual",
                campaign_placement: "search",
                ad_name: "Test Ad",
                metrics_list: [
                  {
                    hour: 15,
                    date: "01-01-2021",
                    impression: 200,
                    clicks: 10,
                    ctr: 5.0,
                    expense: 5.0,
                    broad_gmv: 50.0,
                    broad_order: 1,
                    broad_order_amount: 1,
                    broad_roi: 10.0,
                    broad_cir: 10.0,
                    cr: 10.0,
                    cpc: 0.5,
                    direct_order: 1,
                    direct_order_amount: 1,
                    direct_gmv: 50.0,
                    direct_roi: 10.0,
                    direct_cir: 10.0,
                    direct_cr: 10.0,
                    cpdc: 5.0,
                  },
                ],
              },
            ],
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductCampaignHourlyPerformance({
        performance_date: "2021-01-01",
        campaign_id_list: "1001",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_campaign_hourly_performance",
        {
          method: "GET",
          auth: true,
          params: {
            performance_date: "2021-01-01",
            campaign_id_list: "1001",
          },
        }
      );

      expect(result.response[0].campaign_list[0].metrics_list[0].hour).toBe(15);
    });
  });

  describe("getProductLevelCampaignIdList", () => {
    it("should get product level campaign ID list successfully", async () => {
      const mockResponse: GetProductLevelCampaignIdListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 12345,
          region: "SG",
          has_next_page: false,
          campaign_list: [
            { ad_type: "manual", campaign_id: 1001 },
            { ad_type: "manual", campaign_id: 1002 },
            { ad_type: "manual", campaign_id: 1003 },
          ],
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
      expect(result.response.campaign_list).toHaveLength(3);
      expect(result.response.campaign_list[0].campaign_id).toBe(1001);
    });
  });

  describe("getProductLevelCampaignSettingInfo", () => {
    it("should get product level campaign setting info successfully", async () => {
      const mockResponse: GetProductLevelCampaignSettingInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 12345,
          region: "SG",
          campaign_list: [
            {
              campaign_id: 1001,
              common_info: {
                ad_type: "manual",
                ad_name: "Summer Sale",
                campaign_status: "ongoing",
                bidding_method: "manual",
                campaign_placement: "search",
                campaign_budget: 100.0,
                campaign_duration: {
                  start_time: 1609459200,
                  end_time: 0,
                },
                item_id_list: [12345],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductLevelCampaignSettingInfo({
        info_type_list: "1",
        campaign_id_list: "1001",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_level_campaign_setting_info",
        {
          method: "GET",
          auth: true,
          params: {
            info_type_list: "1",
            campaign_id_list: "1001",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_list[0].common_info?.ad_name).toBe("Summer Sale");
    });
  });

  describe("getProductRecommendedRoiTarget", () => {
    it("should get product recommended ROI target successfully", async () => {
      const mockResponse: GetProductRecommendedRoiTargetResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          lower_bound: {
            value: 3.5,
            percentile: 80,
          },
          exact: {
            value: 5.9,
            percentile: 50,
          },
          upper_bound: {
            value: 8.0,
            percentile: 20,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await adsManager.getProductRecommendedRoiTarget({
        item_id: 123456,
        reference_id: "test-ref-id",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_recommended_roi_target",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
            reference_id: "test-ref-id",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.exact.value).toBe(5.9);
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
        reference_id: "test-ref-gms-123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ads/edit_gms_product_campaign", {
        method: "POST",
        auth: true,
        body: {
          campaign_id: 111222,
          edit_action: "budget",
          daily_budget: 300.0,
          reference_id: "test-ref-gms-123",
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
