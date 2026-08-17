import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AdsManager } from "../../managers/ads.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("AdsManager (Generated Tests)", () => {
  let manager: AdsManager;
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
    manager = new AdsManager(mockConfig);
  });

  describe("checkCreateGmsProductCampaignEligibility", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        is_eligible: false,
        reason: "exclusive_with_other_campaign",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.checkCreateGmsProductCampaignEligibility(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/check_create_gms_product_campaign_eligibility",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createGmsProductCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "30-11-2025",
        end_date: "30-11-2025",
        daily_budget: 100.12,
        reference_id: "086a16bf-49e9-4103-b7fe-c0125beb9278",
        roas_target: 10.1,
      };
      const exampleResponse = {
        campaign_id: 12343253,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createGmsProductCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/create_gms_product_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createManualProductAds", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        reference_id: "asdf-1234-qwerty",
        budget: 10.5,
        start_date: "11-11-2023",
        end_date: "test_string",
        bidding_method: "auto",
        item_id: 111222,
        roas_target: 1.2,
        selected_keywords: [
          {
            keyword: "apple",
            match_type: "exact",
            bid_price_per_click: 11.2,
          },
        ],
        discovery_ads_locations: [
          {
            location: "daily_discover",
            bid_price: 10.5,
          },
        ],
        enhanced_cpc: true,
        smart_creative_setting: "default",
      };
      const exampleResponse = [
        {
          campaign_id: 123,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createManualProductAds(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/create_manual_product_ads",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editGmsItemProductCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 325325235,
        edit_action: "add",
        item_id_list: [124312, 123412, 124124],
      };
      const exampleResponse = {
        campaign_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editGmsItemProductCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_gms_item_product_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editGmsProductCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 12412421,
        edit_action: "change_budget",
        daily_budget: 100.12,
        start_date: "11-11-2025",
        end_date: "11-11-2025",
        roas_target: 123,
        reference_id: "086a16bf-49e9-4103-b7fe-c0125beb9278",
      };
      const exampleResponse = {
        campaign_id: 12412412,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editGmsProductCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_gms_product_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editManualProductAdKeywords", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        reference_id: "asdf-1234-qwerty",
        campaign_id: 112233,
        selected_keywords: [
          {
            edit_action: "add",
            keyword: "apple",
            match_type: "exact",
            bid_price_per_click: 11.2,
          },
        ],
      };
      const exampleResponse = [
        {
          campaign_id: 123,
          failed_edits: [
            {
              keyword: "keyword",
              error: "test_string",
              message: "test_string",
            },
          ],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editManualProductAdKeywords(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_manual_product_ad_keywords",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editManualProductAds", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        reference_id: "asdf-1234-qwerty",
        campaign_id: 112234,
        edit_action: "start",
        budget: 10.5,
        start_date: "11-11-2023",
        end_date: "test_string",
        roas_target: 1.2,
        discovery_ads_locations: [
          {
            location: "daily_discover",
            status: "active",
            bid_price: 10.5,
          },
        ],
        enhanced_cpc: true,
        smart_creative_setting: "default",
      };
      const exampleResponse = [
        {
          campaign_id: 123,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editManualProductAds(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/edit_manual_product_ads",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAdsFacilShopRate", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        rate: 123,
        update_at: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAdsFacilShopRate(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_ads_facil_shop_rate",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAllCpcAdsDailyPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "17-03-2021",
        end_date: "18-03-2021",
      };
      const exampleResponse = [
        {
          date: "17-03-2021",
          impression: 123456,
          clicks: 123456,
          ctr: 1.23,
          direct_order: 123456,
          broad_order: 123456,
          direct_conversions: 1.23,
          broad_conversions: 1.23,
          direct_item_sold: 123,
          broad_item_sold: 123,
          direct_gmv: 1.23,
          broad_gmv: 1.23,
          expense: 1.23,
          cost_per_conversion: 1.23,
          direct_roas: 1.23,
          broad_roas: 1.23,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAllCpcAdsDailyPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_all_cpc_ads_daily_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAllCpcAdsHourlyPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        performance_date: "17-03-2021",
      };
      const exampleResponse = [
        {
          hour: 13,
          date: "17-03-2021",
          impression: 123456,
          clicks: 123456,
          ctr: 1.23,
          direct_order: 123456,
          broad_order: 123456,
          direct_conversions: 1.23,
          broad_conversions: 1.23,
          direct_item_sold: 123,
          broad_item_sold: 123,
          direct_gmv: 1.23,
          broad_gmv: 1.23,
          expense: 1.23,
          cost_per_conversion: 1.23,
          direct_roas: 1.23,
          broad_roas: 1.23,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAllCpcAdsHourlyPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_all_cpc_ads_hourly_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCreateProductAdBudgetSuggestion", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        reference_id: "asdf-1234-qwerty",
        product_selection: "auto",
        campaign_placement: "all",
        bidding_method: "manual",
        enhanced_cpc: "true",
        discovery_ads_location_names: "daily_discover,you_may_also_like",
        roas_target: 1.2,
        item_id: 112233,
      };
      const exampleResponse = {
        budget: {
          recommended_budget: 20.5,
          min_budget: 15.2,
          max_budget: 30.1,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCreateProductAdBudgetSuggestion(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_create_product_ad_budget_suggestion",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGmsCampaignPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 13251251,
        start_date: "11-11-2025",
        end_date: "11-11-2025",
      };
      const exampleResponse = {
        campaign_id: 12412421,
        report: {
          broad_cir: 100.12,
          broad_gmv: 100.12,
          broad_order: 123,
          broad_order_amount: 123,
          broad_roi: 123.12,
          clicks: 123,
          expense: 123.12,
          cpc: 123.12,
          cpdc: 123.12,
          cr: 123.12,
          direct_cr: 123.12,
          direct_cir: 123.12,
          direct_order: 123,
          direct_order_amount: 123,
          direct_roi: 123.12,
          impression: 123.12,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGmsCampaignPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_gms_campaign_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGmsItemPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 123531513,
        start_date: "11-11-2025",
        end_date: "11-11-2025",
        offset: 50,
        limit: 50,
      };
      const exampleResponse = {
        campaign_id: 123,
        result_list: [
          {
            item_id: 12421412,
            report: {
              broad_cir: 123.12,
              broad_gmv: 123.12,
              broad_order: 123,
              broad_order_amount: 123,
              broad_roi: 123.12,
              clicks: 123,
              expense: 123.12,
              cpc: 123.12,
              cpdc: 123.12,
              cr: 123.12,
              direct_cr: 123.12,
              direct_cir: 123.12,
              direct_order: 123,
              direct_order_amount: 123,
              direct_roi: 123.12,
              impression: 123,
            },
          },
        ],
        total: 123,
        has_next_page: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGmsItemPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_gms_item_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductCampaignDailyPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "17-03-2021",
        end_date: "19-03-2021",
        campaign_id_list: ["11111", "22222"],
      };
      const exampleResponse = [
        {
          shop_id: 123,
          region: "SG",
          campaign_list: [
            {
              campaign_id: 12121,
              ad_type: "auto",
              campaign_placement: "search",
              ad_name: "name",
              metrics_list: [
                {
                  date: "12-12-2023",
                  impression: 111,
                  clicks: 222,
                  ctr: 12.23,
                  expense: 11.22,
                  broad_gmv: 1.2,
                  broad_order: 100,
                  broad_order_amount: 200,
                  broad_roi: 2.3,
                  broad_cir: 3.4,
                  cr: 4.5,
                  cpc: 5.6,
                  direct_order: 999,
                  direct_order_amount: 1111,
                  direct_gmv: 12.23,
                  direct_roi: 23.34,
                  direct_cir: 34.45,
                  direct_cr: 45.56,
                  cpdc: 56.67,
                },
              ],
            },
          ],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductCampaignDailyPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_campaign_daily_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductCampaignHourlyPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        performance_date: "17-07-2024",
        campaign_id_list: ["11111", "22222"],
      };
      const exampleResponse = [
        {
          shop_id: 123,
          region: "SG",
          campaign_list: [
            {
              campaign_id: 12121,
              ad_type: "auto",
              campaign_placement: "search",
              ad_name: "name",
              metrics_list: [
                {
                  hour: 14,
                  date: "12-12-2023",
                  impression: 111,
                  clicks: 222,
                  ctr: 12.23,
                  expense: 11.22,
                  broad_gmv: 1.2,
                  broad_order: 100,
                  broad_order_amount: 200,
                  broad_roi: 2.3,
                  broad_cir: 3.4,
                  cr: 4.5,
                  cpc: 5.6,
                  direct_order: 999,
                  direct_order_amount: 1111,
                  direct_gmv: 12.23,
                  direct_roi: 23.34,
                  direct_cir: 34.45,
                  direct_cr: 45.56,
                  cpdc: 56.67,
                },
              ],
            },
          ],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductCampaignHourlyPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_campaign_hourly_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductLevelCampaignIdList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        ad_type: "all",
        offset: 0,
        limit: 5000,
      };
      const exampleResponse = {
        shop_id: 121212,
        region: "SG",
        has_next_page: true,
        campaign_list: [
          {
            ad_type: "auto",
            campaign_id: 111111,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductLevelCampaignIdList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_level_campaign_id_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductLevelCampaignSettingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        info_type_list: ["1", "2", "3", "4"],
        campaign_id_list: ["11111", "22222", "33333"],
      };
      const exampleResponse = {
        shop_id: 121212,
        region: "SG",
        campaign_list: [
          {
            campaign_id: 11111,
            common_info: {
              ad_type: "auto",
              ad_name: "name",
              campaign_status: "ongoing",
              bidding_method: "auto",
              campaign_placement: "all",
              campaign_budget: 12.5,
              campaign_duration: {
                start_time: 1234567890,
                end_time: 0,
              },
              item_id_list: [123],
            },
            manual_bidding_info: {
              enhanced_cpc: true,
              selected_keywords: [
                {
                  keyword: "keyword",
                  status: "deleted",
                  match_type: "exact",
                  bid_price_per_click: 10.5,
                },
              ],
              discovery_ads_locations: [
                {
                  location: "daily_discover",
                  status: "active",
                  bid_price: 11.5,
                },
              ],
            },
            auto_bidding_info: {
              roas_target: 6.5,
            },
            auto_product_ads_info: [
              {
                product_name: "name1",
                status: "learning",
                item_id: 123,
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductLevelCampaignSettingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_level_campaign_setting_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductRecommendedRoiTarget", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        reference_id: "asdf-1234-qwerty",
        item_id: 112233,
      };
      const exampleResponse = {
        lower_bound: {
          value: 3.5,
          percentile: 80,
        },
        exact: {
          value: 5.9,
          percentile: 50,
        },
        upper_bound: {
          value: 10.8,
          percentile: 20,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductRecommendedRoiTarget(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_product_recommended_roi_target",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecommendedItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = [
        {
          item_id: 1234,
          item_status_list: ["blocked"],
          sku_tag_list: ["best selling"],
          ongoing_ad_type_list: ["search ads", "discovery ads"],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getRecommendedItemList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_recommended_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecommendedKeywordList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1111,
        input_keyword: "keyword",
      };
      const exampleResponse = {
        item_id: 1111,
        input_keyword: "keyword",
        suggested_keywords: [
          {
            keyword: "keyword",
            quality_score: 8,
            search_volume: 1234,
            suggested_bid: 12.34,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getRecommendedKeywordList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_recommended_keyword_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopToggleInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        data_timestamp: 1689052069,
        auto_top_up: true,
        campaign_surge: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopToggleInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_shop_toggle_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTotalBalance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        data_timestamp: 1689052069,
        total_balance: 123.55,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTotalBalance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/get_total_balance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("listGmsUserDeletedItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 100,
        limit: 100,
      };
      const exampleResponse = {
        campaign_id: 12412412,
        item_id_list: [112321324, 122323241, 2232142],
        total: 200,
        has_next_page: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.listGmsUserDeletedItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ads/list_gms_user_deleted_item",
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
