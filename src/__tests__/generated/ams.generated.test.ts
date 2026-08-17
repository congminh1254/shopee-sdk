import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AmsManager } from "../../managers/ams.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("AmsManager (Generated Tests)", () => {
  let manager: AmsManager;
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
    manager = new AmsManager(mockConfig);
  });

  describe("addAllProductsToOpenCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        commission_rate: 1.1,
        period_start_time: 1735660800,
        period_end_time: 1735660800,
      };
      const exampleResponse = {
        task_type: "batch_add_open_campaigns",
        task_id: "abcd-abcd-abcd",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addAllProductsToOpenCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/add_all_products_to_open_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchAddProductsToOpenCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [123],
        commission_rate: 1.1,
        period_start_time: 1735660800,
        period_end_time: 1735660800,
      };
      const exampleResponse = {
        failed_list: [
          {
            item_id: 123,
            fail_error: "invalid_param",
            fail_message: "The commission rate is invalid, please check again.",
          },
        ],
        success_list: [123],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchAddProductsToOpenCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_add_products_to_open_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchEditProductsOpenCampaignSetting", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_ids: [123],
        commission_rate: 1.1,
        period_start_time: 1735660800,
        period_end_time: 1735660800,
      };
      const exampleResponse = {
        failed_list: [
          {
            campaign_id: 123,
            fail_error: "invalid_param",
            fail_message: "The commission rate is invalid, please check again.",
          },
        ],
        success_list: [123],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchEditProductsOpenCampaignSetting(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_edit_products_open_campaign_setting",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchGetProductsSuggestedRate", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: ["1", "12", "123"],
      };
      const exampleResponse = {
        rates: [
          {
            item_id: 123,
            min_rate: 1.1,
            max_rate: 1.2,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchGetProductsSuggestedRate(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_get_products_suggested_rate",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchRemoveProductsOpenCampaignSetting", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_ids: [123],
      };
      const exampleResponse = {
        failed_list: [
          {
            campaign_id: 123,
            fail_error: "invalid_param",
            fail_message: "The campaign id is invalid, please check again.",
          },
        ],
        success_list: [123],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchRemoveProductsOpenCampaignSetting(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_remove_products_open_campaign_setting",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createNewTargetedCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_name: "CAMPAIGN_NAME",
        period_start_time: 1735660800,
        period_end_time: 32503651199,
        is_set_budget: true,
        budget: 500000,
        seller_message: "Hello, pleasant cooperation.",
        item_list: [
          {
            item_id: 101,
            rate: 1.1,
          },
        ],
        affiliate_list: [
          {
            affiliate_id: 11301234567,
          },
        ],
      };
      const exampleResponse = {
        campaign_id: 101,
        fail_item_list: [
          {
            item_id: 101,
            fail_error: "test_error",
            fail_message: "test_message",
          },
        ],
        fail_affiliate_list: [
          {
            affiliate_id: 11301234567,
            fail_error: "test_error",
            fail_message: "test_message",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createNewTargetedCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/create_new_targeted_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editAffiliateListOfTargetedCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 101,
        edit_type: "add",
        affiliate_list: [
          {
            affiliate_id: 11301234567,
          },
        ],
      };
      const exampleResponse = {
        fail_affiliate_list: [
          {
            affiliate_id: 11301234567,
            fail_error: "error_param",
            fail_message: "Invalid affiliate_id",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editAffiliateListOfTargetedCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_affiliate_list_of_targeted_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editAllProductsOpenCampaignSetting", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        commission_rate: 1.1,
        period_start_time: 1735660800,
        period_end_time: 1735660800,
      };
      const exampleResponse = {
        task_type: "batch_update_open_campaigns",
        task_id: "abcd-abcd-abcd",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editAllProductsOpenCampaignSetting(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_all_products_open_campaign_setting",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editProductListOfTargetedCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 101,
        edit_type: "add",
        item_list: [
          {
            item_id: 101,
            rate: 1.1,
          },
        ],
      };
      const exampleResponse = {
        fail_item_list: [
          {
            item_id: 101,
            fail_error: "error_param",
            fail_message: "Invalid commission rate",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editProductListOfTargetedCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_product_list_of_targeted_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAffiliatePerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        page_no: 1,
        page_size: 20,
        order_type: "ConfirmedOrder",
        channel: "AllChannel",
        affiliate_id: 16142330000,
      };
      const exampleResponse = {
        list: [
          {
            affiliate_id: 11146330000,
            affiliate_name: "id0807.9",
            affiliate_username: "interspaceindonesia",
            sales: "47190",
            items_sold: 365,
            orders: 269,
            clicks: 3372,
            est_commission: "947253",
            roi: "46.8",
            total_buyers: 589,
            new_buyers: 260,
          },
        ],
        total_count: 589,
        has_more: true,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAffiliatePerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_affiliate_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAutoAddNewProductToggleStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        is_open: true,
        commission_rate: 1.11,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAutoAddNewProductToggleStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_auto_add_new_product_toggle_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCampaignKeyMetricsPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
      };
      const exampleResponse = {
        open_campaign_key_metircs: {
          affiliates: 34,
          items_sold: 44,
          sales: "3233454",
          est_commission: "5675675",
        },
        targeted_campaign_key_metircs: {
          affiliates: 34,
          items_sold: 56,
          sales: "6767",
          est_commission: "46775",
        },
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCampaignKeyMetricsPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_campaign_key_metrics_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getContentPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        page_no: 1,
        page_size: 20,
        order_type: "ConfirmedOrder",
        channel: "ShopeeVideo",
        affiliate_id: 11146330000,
        item_id: 14016184405,
      };
      const exampleResponse = {
        list: [
          {
            content_id: "2056471137109586",
            content_title: "Have been buying from this brand since 2 years ago and still loving it",
            post_time: 1753376400,
            affiliate_name: "id0807.9",
            affiliate_username: "interspaceindonesia",
            products: 11,
            views: 114812,
            likes: 93,
            comments: 45,
            sales: "78445100",
            orders: 78952,
            items_sold: 27,
            channel: "ShopeeVideo",
          },
        ],
        total_count: 789,
        has_more: true,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getContentPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_content_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getConversionReport", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 20,
        order_sn: "YSWVY8D7OU",
        affiliate_id: 11346460002,
        item_id: 3903624400,
        item_name: "item1",
        l1_category_id: 104136,
        l2_category_id: 241360,
        l3_category_id: 404136,
        order_status: "Unpaid",
        verified_status: "Unverified",
        buyer_status: "New",
        attr_campaign_id: 18017,
        campaign_partner: "auto.1",
        seller_campaign_type: "TargetCampaign",
        deduction_status: "PendingDeduction",
        deduction_method: "OrderEscrow",
        place_order_time_start: 1753459200,
        place_order_time_end: 1756051199,
        order_completed_time_start: 1753459200,
        order_completed_time_end: 1756051199,
        conversion_completed_time_start: 1753459200,
        conversion_completed_time_end: 1756051199,
        ams_deduction_time_start: 1753459200,
        ams_deduction_time_end: 1756051199,
      };
      const exampleResponse = {
        list: [
          {
            order_sn: "YSWVY8D7OU",
            order_status: "Pending",
            verified_status: "Unverified",
            place_order_time: "2025/8/10 15:36:22",
            order_completed_time: "2025/8/10 13:10:00",
            conversion_completed_time: "2025/8/9 17:38:54",
            affiliate_id: 11393990003,
            affiliate_name: "Yoyi popup",
            affiliate_username: "yiyi.test.0206.19",
            linked_mcn: "auto.id.108",
            order_brand_commission: "2999.7",
            channel: "Telegram",
            order_type: "Direct Order",
            buyer_status: "Existing",
            items: [
              {
                item_id: 3903624400,
                item_name: "item1",
                model_id: 1232348722,
                l1_category_id: 104136,
                l2_category_id: 204136,
                l3_category_id: 404136,
                promotion_id: "36262963_0_0",
                price: 9090,
                qty: 1,
                seller_campaign_type: "Seller Open Campaign",
                attr_campaign_id: 1130273167000412,
                purchase_value: 9099,
                refund_amount: "50",
                item_brand_commission: "899.91",
                item_brand_commission_rate_to_affiliate: "10%",
                item_brand_commission_to_affiliate: "899.91",
                item_brand_commission_rate_to_mcn: "33%",
                item_brand_commission_to_mcn: "2999.7",
                seller_service_fee_rate: "14%",
                seller_service_fee: "125.98",
              },
            ],
            campaign_partner: "testid.mcn.0",
          },
        ],
        total_count: 345,
        has_more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getConversionReport(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_conversion_report",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getManagedAffiliateList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 20,
      };
      const exampleResponse = {
        total_count: 1000,
        affiliate_list: [
          {
            affiliate_id: 12345678,
            affiliate_name: "affiliate a",
            user_name: "ss",
            portrait_url: "test_string",
            popular_social_media: {
              platform: "meta",
              follower_count: 1000,
            },
            social_medias: [
              {
                platform: "shopee live",
                follower_count: 1000,
                social_media_user_name: "aads",
              },
            ],
            total_click: 10000,
            order_range: [200, 400],
            gmv_range: [1000000000000, 5000000000000],
            is_orange_tick_kol: true,
            is_good_fulfillment: true,
            promote_category_ids: [100013, 100644, 100010],
            top_popular_contents: [
              {
                platform: "shopee live",
                comment_count: 100,
                like_count: 300,
                view_count: 1000,
                cover_url: "test_string",
                media_url: "test_string",
              },
            ],
            top_selling_products: [
              {
                item_id: 12345678,
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

      const result = await manager.getManagedAffiliateList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_managed_affiliate_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOpenCampaignAddedProduct", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 20,
        cursor: "1234,5678",
        sort_by: "commission_rate",
        search_type: "ITEM_NAME",
        search_content: "test",
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 123,
            item_name: "test",
            campaign_id: 123,
            campaign_status: "Ongoing",
            commission_rate: 1.11,
            period_start_time: 1735660800,
            period_end_time: 1735660800,
            pending_terminated_time: 1735660800,
            commission_protection_list: [
              {
                commission_rate: 1.21,
                protection_period_end_time: 1735660800,
              },
            ],
            max_commission_rate_current_day: 1.21,
          },
        ],
        total_count: 1000,
        cursor: "1234,5678",
        has_more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOpenCampaignAddedProduct(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_added_product",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOpenCampaignBatchTaskResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        task_id: "abcd-abcd-abcd",
      };
      const exampleResponse = {
        status: "Doing",
        progress_rate: 80,
        fail_reason: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOpenCampaignBatchTaskResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_batch_task_result",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOpenCampaignNotAddedProduct", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 20,
        cursor: "1234,5678",
        sort_by: "-sales",
        search_type: "ITEM_NAME",
        search_content: "test",
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 123,
            item_name: "test",
            sales: 123,
            display_price: "29.12",
            stock: 19999,
            is_in_blacklist: false,
            with_open_campaign: true,
          },
        ],
        total_count: 100,
        cursor: "1234,5678",
        has_more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOpenCampaignNotAddedProduct(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_not_added_product",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOpenCampaignPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        page_no: 1,
        page_size: 20,
        item_id: 123,
      };
      const exampleResponse = {
        list: [
          {
            item_id: 22256739793,
            item_name: "SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule 100ml",
            affiliates: 15,
            sales: "87255952",
            item_sold: 4587,
            est_commission: "5881",
          },
        ],
        total_count: 987,
        has_more: true,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOpenCampaignPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOptimizationSuggestionProduct", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 20,
        rcmd_reason_filter: "product_opportunities",
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 123,
            item_name: "test",
            rcmd_reason: ["severe_shortage", "high_popularity"],
            campaign_id: 123,
            commission_rate: 1.1,
            period_start_time: 1735660800,
            period_end_time: 1735660800,
            affiliate_count: 123,
            item_sold: 123,
            campaign_status: "Ongoing",
            l2_category_order_count: 123,
            suggest_min_rate: 1.1,
            suggest_max_rate: 1.2,
            prefill_rate: 1.1,
            prefill_subsidy_rate: 1.2,
            display_price: "1.23",
            has_subsidy_data: true,
          },
        ],
        total: 1000,
        has_more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOptimizationSuggestionProduct(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_optimization_suggestion_product",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPerformanceDataUpdateTime", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        marker_type: "AmsMarker",
      };
      const exampleResponse = {
        last_report_date: "2025-08-19",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPerformanceDataUpdateTime(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_performance_data_update_time",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        page_no: 1,
        page_size: 20,
        order_type: "ConfirmedOrder",
        channel: "AllChannel",
        item_id: 123,
      };
      const exampleResponse = {
        list: [
          {
            item_id: 14016184405,
            item_name: "SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule 100ml",
            sales: "150000",
            items_sold: 4895,
            orders: 575,
            clicks: 78542,
            est_commission: "5898",
            roi: "18.8",
            total_buyers: 589,
            new_buyers: 260,
          },
        ],
        total_count: 589,
        has_more: false,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_product_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecommendedAffiliateList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 50,
      };
      const exampleResponse = {
        total_count: 200,
        affiliate_list: [
          {
            affiliate_id: 12345678,
            affiliate_name: "affiliate a",
            user_name: "ss",
            portrait_url: "test_string",
            popular_social_media: {
              platform: "meta",
              follower_count: 123,
            },
            social_medias: [
              {
                platform: "shopee live",
                follower_count: 1000,
                social_media_user_name: "dafffd",
              },
            ],
            total_click: 12000,
            order_range: [200, 400],
            gmv_range: [1000000000000, 5000000000000],
            is_orange_tick_kol: true,
            is_good_fulfillment: true,
            promote_category_ids: [100013, 100644, 100010],
            top_popular_contents: [
              {
                platform: "shopee live",
                comment_count: 100,
                like_count: 300,
                view_count: 1000,
                cover_url: "https://123456",
                media_url: "test_string",
              },
            ],
            top_selling_products: [
              {
                item_id: 12345678,
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

      const result = await manager.getRecommendedAffiliateList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_recommended_affiliate_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        order_type: "ConfirmedOrder",
        channel: "AllChannel",
      };
      const exampleResponse = {
        sales: "15000",
        gross_item_sold: 9684221,
        orders: 68,
        clicks: 1564852,
        est_commission: "2000",
        roi: "18.8",
        total_buyers: 894,
        new_buyers: 260,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_shop_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopSuggestedRate", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        min_rate: 1.1,
        max_rate: 1.2,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopSuggestedRate(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_shop_suggested_rate",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTargetedCampaignAddableProductList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 20,
        cursor: "abcd",
        sort_by: "-sales",
        search_type: "ITEM_ID",
        search_content: "101,102",
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 101,
            item_name: "item a",
            sales: 1554,
            display_price: "95250",
            stock: 20,
            is_in_blacklist: false,
          },
        ],
        total_count: 20,
        cursor: "abcd",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTargetedCampaignAddableProductList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_addable_product_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTargetedCampaignList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 20,
        page_no: 1,
        campaign_id_list: ["101", "102", "103"],
        campaign_name: "campaign a",
        campaign_status: "Upcoming",
        period_start_time: 1735660800,
        period_end_time: 32503651199,
        item_id: 101,
        item_name: "product a",
      };
      const exampleResponse = {
        total_count: 30,
        campaign_list: [
          {
            campaign_id: 101,
            campaign_name: "campaign a",
            campaign_status: "Ongoing",
            campaign_source: "Seller",
            period_start_time: 1735660800,
            period_end_time: 32503651199,
            last_editor: "example@example.com",
            last_edit_time: 1735660800,
            affiliate_count: 20,
            item_count: 20,
            min_rate: 10,
            max_rate: 25,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTargetedCampaignList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTargetedCampaignPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Last30d",
        start_date: "20250801",
        end_date: "20250831",
        page_no: 1,
        page_size: 20,
        campaign_id: 123,
      };
      const exampleResponse = {
        list: [
          {
            campaign_id: 25109087,
            affiliates: 199,
            sales: "4851",
            item_sold: 6,
            est_commission: "56",
            campaign_name: "sysy",
          },
        ],
        total_count: 589,
        has_more: true,
        fetched_date_range: "20250801-20250831",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTargetedCampaignPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTargetedCampaignSettings", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 101,
      };
      const exampleResponse = {
        campaign_name: "campaign name",
        commission_status: "Ongoing",
        period_start_time: 1735660800,
        period_end_time: 32503651199,
        is_set_budget: true,
        budget: 10000,
        budget_cost: 500.5,
        seller_message: "Hello, pleasant cooperation.",
        pending_terminated_time: 1735660800,
        affiliate_list: [
          {
            affiliate_id: 11301234567,
          },
        ],
        item_list: [
          {
            item_id: 101,
            item_name: "item a",
            rate: 1.1,
            max_commission_rate_current_day: 1.1,
            commission_protection_list: [
              {
                commission_rate: 1.1,
                protection_period_end_time: 1735660800,
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

      const result = await manager.getTargetedCampaignSettings(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_settings",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getValidationList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        validation_list: [
          {
            validation_id: "363636002508",
            payment_method: 1,
            validation_month: 202508,
            campaign_source: "ShopeeManaged",
            online_bill: {
              total_amount: 300,
              bill_status: 2,
              deducted_amount: 300,
              ams_credit_deducted_amount: 200,
              pending_amount: 0,
            },
            offline_bills: [
              {
                order_place_month: 202507,
                total_amount: 420.5,
                commission_amount: 200,
                commission_amount_after_tax: 220,
                ams_credit_deducted_amount: 200.5,
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

      const result = await manager.getValidationList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_validation_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getValidationReport", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 20,
        validation_id: "602516439202502",
        validation_month: 202502,
        campaign_source: "ShopeeManaged",
        order_sn: "CWTUQ80EF9",
        l1_category_id: 104136,
        l2_category_id: 241360,
        l3_category_id: 404136,
        item_id: 3702824955,
        item_name: "item1",
        verified_status: "Valid",
        attr_campaign_id: 18071,
        place_order_time_start: 1753459200,
        place_order_time_end: 1756051199,
      };
      const exampleResponse = {
        list: [
          {
            order_sn: "YSWVY8D7OU",
            order_status: "Pending",
            verified_status: "Unverified",
            place_order_time: "2025/8/10 15:36:22",
            order_completed_time: "2025/8/10 13:10:00",
            conversion_completed_time: "2025/8/9 17:38:54",
            affiliate_name: "Yoyi popup",
            affiliate_username: "yiyi.test.0206.19",
            linked_mcn: "auto.id.108",
            campaign_partner: "testid.mcn.0",
            order_type: "Direct Order",
            order_brand_commission: "2999.7",
            channel: "Shopeevideo",
            affiliate_id: 11393990003,
            buyer_status: "Existing",
            items: [
              {
                item_id: 3903624400,
                item_name: "item1",
                model_id: 1232348722,
                l1_category_id: 104136,
                l2_category_id: 204136,
                l3_category_id: 404136,
                promotion_id: "36262963_0_0",
                price: 90,
                qty: 1,
                seller_campaign_type: "Seller Open Campaign",
                attr_campaign_id: 1130273167000412,
                purchase_value: 9099,
                refund_amount: "50",
                item_brand_commission: "899.91",
                item_brand_commission_rate_to_affiliate: "10%",
                item_brand_commission_to_affiliate: "899.98",
                item_brand_commission_rate_to_mcn: "33%",
                item_brand_commission_to_mcn: "233.8",
                seller_service_fee_rate: "14%",
                seller_service_fee: "125.98",
              },
            ],
          },
        ],
        total_count: 345,
        has_more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getValidationReport(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_validation_report",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("queryAffiliateList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        query_type: 1,
        affiliate_id_list: ["1", "2", "3"],
        name: "ddd",
      };
      const exampleResponse = {
        total_count: 200,
        affiliate_list: [
          {
            affiliate_id: 12345678,
            affiliate_name: "affiliate a",
            user_name: "ss",
            portrait_url: "test_string",
            popular_social_media: [
              {
                platform: "meta",
                follower_count: 123,
              },
            ],
            social_medias: [
              {
                platform: "shopee live",
                follower_count: 1000,
                social_media_user_name: "dafffd",
              },
            ],
            total_click: 10000,
            order_range: [200, 400],
            gmv_range: [100000000, 500000000],
            is_orange_tick_kol: true,
            is_good_fulfillment: true,
            promote_category_ids: [100013, 100644, 100010],
            top_popular_contents: [
              {
                platform: "shopee live",
                comment_count: 100,
                like_count: 300,
                view_count: 1000,
                cover_url: "https://123456",
                media_url: "test_string",
              },
            ],
            top_selling_products: [
              {
                item_id: 12345678,
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

      const result = await manager.queryAffiliateList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/query_affiliate_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("removeAllProductsOpenCampaignSetting", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        task_type: "batch_remove_open_campaigns",
        task_id: "abcd-abcd-abcd",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.removeAllProductsOpenCampaignSetting(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/remove_all_products_open_campaign_setting",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("terminateTargetedCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 101,
      };
      const exampleResponse = {
        error: "error_param",
        message: "Invalid campaign_id",
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.terminateTargetedCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/terminate_targeted_campaign",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateAutoAddNewProductSetting", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        open: true,
        commission_rate: 1.1,
      };
      const exampleResponse = {
        error: "error_business",
        message:
          "Please agree to the AMS T&C in Seller Center - Affiliate Marketing Solutions first before using Open API.",
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateAutoAddNewProductSetting(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/update_auto_add_new_product_setting",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateBasicInfoOfTargetedCampaign", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        campaign_id: 101,
        campaign_name: "campaign a",
        period_start_time: 1735660800,
        period_end_time: 32503651199,
        is_set_budget: true,
        budget: 10000,
      };
      const exampleResponse = {
        error: "error_business",
        message:
          "Please agree to the AMS T&C in Seller Center - Affiliate Marketing Solutions first before using Open API.",
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateBasicInfoOfTargetedCampaign(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/update_basic_info_of_targeted_campaign",
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
