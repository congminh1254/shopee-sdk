import { jest } from "@jest/globals";
import { AmsManager } from "../../managers/ams.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddAllProductsToOpenCampaignResponse,
  BatchAddProductsToOpenCampaignResponse,
  BatchEditProductsOpenCampaignSettingResponse,
  BatchGetProductsSuggestedRateResponse,
  BatchRemoveProductsOpenCampaignSettingResponse,
  CreateNewTargetedCampaignResponse,
  EditAffiliateListOfTargetedCampaignResponse,
  EditAllProductsOpenCampaignSettingResponse,
  EditProductListOfTargetedCampaignResponse,
  GetAffiliatePerformanceResponse,
  GetAutoAddNewProductToggleStatusResponse,
  GetCampaignKeyMetricsPerformanceResponse,
  GetContentPerformanceResponse,
  GetConversionReportResponse,
  GetManagedAffiliateListResponse,
  GetOpenCampaignAddedProductResponse,
  GetOpenCampaignBatchTaskResultResponse,
  GetOpenCampaignNotAddedProductResponse,
  GetOpenCampaignPerformanceResponse,
  GetOptimizationSuggestionProductResponse,
  GetPerformanceDataUpdateTimeResponse,
  GetProductPerformanceResponse,
  GetRecommendedAffiliateListResponse,
  AmsGetShopPerformanceResponse,
  GetShopSuggestedRateResponse,
  GetTargetedCampaignAddableProductListResponse,
  GetTargetedCampaignListResponse,
  GetTargetedCampaignPerformanceResponse,
  GetTargetedCampaignSettingsResponse,
  GetValidationListResponse,
  GetValidationReportResponse,
  QueryAffiliateListResponse,
  RemoveAllProductsOpenCampaignSettingResponse,
  TerminateTargetedCampaignResponse,
  UpdateAutoAddNewProductSettingResponse,
  UpdateBasicInfoOfTargetedCampaignResponse,
} from "../../schemas/ams.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("AmsManager", () => {
  let amsManager: AmsManager;
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

    amsManager = new AmsManager(mockConfig);
  });

  // Open Campaign APIs
  describe("addAllProductsToOpenCampaign", () => {
    it("should add all products to open campaign successfully", async () => {
      const mockResponse: AddAllProductsToOpenCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_123456",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.addAllProductsToOpenCampaign({
        commission_rate: 5.5,
        period_start_time: 1609459200,
        period_end_time: 32503651199,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/add_all_products_to_open_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            commission_rate: 5.5,
            period_start_time: 1609459200,
            period_end_time: 32503651199,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.task_id).toBe("task_123456");
    });
  });

  describe("batchAddProductsToOpenCampaign", () => {
    it("should batch add products to open campaign successfully", async () => {
      const mockResponse: BatchAddProductsToOpenCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_789012",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.batchAddProductsToOpenCampaign({
        item_id_list: [101, 102, 103],
        commission_rate: 3.0,
        period_start_time: 1609459200,
        period_end_time: 1640995200,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_add_products_to_open_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            item_id_list: [101, 102, 103],
            commission_rate: 3.0,
            period_start_time: 1609459200,
            period_end_time: 1640995200,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.task_id).toBe("task_789012");
    });
  });

  describe("batchEditProductsOpenCampaignSetting", () => {
    it("should batch edit products open campaign setting successfully", async () => {
      const mockResponse: BatchEditProductsOpenCampaignSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_edit_123",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.batchEditProductsOpenCampaignSetting({
        campaign_ids: [1001, 1002],
        commission_rate: 4.5,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_edit_products_open_campaign_setting",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_ids: [1001, 1002],
            commission_rate: 4.5,
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("batchGetProductsSuggestedRate", () => {
    it("should get suggested rates for products successfully", async () => {
      const mockResponse: BatchGetProductsSuggestedRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            { item_id: 101, suggested_rate: 5.0 },
            { item_id: 102, suggested_rate: 6.5 },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.batchGetProductsSuggestedRate({
        item_id_list: "101,102",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_get_products_suggested_rate",
        {
          method: "GET",
          auth: true,
          params: { item_id_list: "101,102" },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.item_list).toHaveLength(2);
    });
  });

  describe("batchRemoveProductsOpenCampaignSetting", () => {
    it("should batch remove products from open campaign successfully", async () => {
      const mockResponse: BatchRemoveProductsOpenCampaignSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_remove_456",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.batchRemoveProductsOpenCampaignSetting({
        campaign_ids: [1001, 1002],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/batch_remove_products_open_campaign_setting",
        {
          method: "POST",
          auth: true,
          body: { campaign_ids: [1001, 1002] },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("editAllProductsOpenCampaignSetting", () => {
    it("should edit all products open campaign setting successfully", async () => {
      const mockResponse: EditAllProductsOpenCampaignSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_edit_all_789",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.editAllProductsOpenCampaignSetting({
        commission_rate: 7.0,
        period_end_time: 1672531199,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_all_products_open_campaign_setting",
        {
          method: "POST",
          auth: true,
          body: {
            commission_rate: 7.0,
            period_end_time: 1672531199,
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getOpenCampaignAddedProduct", () => {
    it("should get open campaign added products successfully", async () => {
      const mockResponse: GetOpenCampaignAddedProductResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 2,
          next_cursor: "cursor_abc",
          has_more: true,
          item_list: [
            {
              item_id: 101,
              campaign_id: 1001,
              commission_rate: 5.0,
              period_start_time: 1609459200,
              period_end_time: 32503651199,
            },
            {
              item_id: 102,
              campaign_id: 1002,
              commission_rate: 6.0,
              period_start_time: 1609459200,
              period_end_time: 32503651199,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getOpenCampaignAddedProduct({
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_added_product",
        {
          method: "GET",
          auth: true,
          params: { page_size: 20 },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.item_list).toHaveLength(2);
      expect(result.response.has_more).toBe(true);
    });
  });

  describe("getOpenCampaignBatchTaskResult", () => {
    it("should get batch task result successfully", async () => {
      const mockResponse: GetOpenCampaignBatchTaskResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "completed",
          success_count: 10,
          fail_count: 2,
          fail_item_id_list: [103, 104],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getOpenCampaignBatchTaskResult({
        task_id: "task_123456",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_batch_task_result",
        {
          method: "GET",
          auth: true,
          params: { task_id: "task_123456" },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.status).toBe("completed");
    });
  });

  describe("getOpenCampaignNotAddedProduct", () => {
    it("should get not added products successfully", async () => {
      const mockResponse: GetOpenCampaignNotAddedProductResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 5,
          next_cursor: "",
          has_more: false,
          item_list: [{ item_id: 201, item_name: "Product A", suggested_rate: 4.5 }],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getOpenCampaignNotAddedProduct({
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_not_added_product",
        {
          method: "GET",
          auth: true,
          params: { page_size: 10 },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getOpenCampaignPerformance", () => {
    it("should get open campaign performance successfully", async () => {
      const mockResponse: GetOpenCampaignPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              item_id: 101,
              sales: "1500.00",
              orders: 30,
              est_commission: "75.00",
              clicks: 500,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getOpenCampaignPerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_open_campaign_performance",
        {
          method: "GET",
          auth: true,
          params: {
            period_type: "Last30d",
            start_date: "20250101",
            end_date: "20250131",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("removeAllProductsOpenCampaignSetting", () => {
    it("should remove all products from open campaign successfully", async () => {
      const mockResponse: RemoveAllProductsOpenCampaignSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          task_id: "task_remove_all",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.removeAllProductsOpenCampaignSetting();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/remove_all_products_open_campaign_setting",
        {
          method: "POST",
          auth: true,
          body: {},
        }
      );

      expect(result.error).toBe("");
    });
  });

  // Targeted Campaign APIs
  describe("createNewTargetedCampaign", () => {
    it("should create a new targeted campaign successfully", async () => {
      const mockResponse: CreateNewTargetedCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
          fail_item_list: [],
          fail_affiliate_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.createNewTargetedCampaign({
        campaign_name: "Summer Sale Campaign",
        period_start_time: 1609459200,
        period_end_time: 32503651199,
        is_set_budget: true,
        budget: 500000,
        seller_message: "Hello, pleasant cooperation.",
        item_list: [{ item_id: 101, rate: 5.5 }],
        affiliate_list: [{ affiliate_id: 11301234567 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/create_new_targeted_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_name: "Summer Sale Campaign",
            period_start_time: 1609459200,
            period_end_time: 32503651199,
            is_set_budget: true,
            budget: 500000,
            seller_message: "Hello, pleasant cooperation.",
            item_list: [{ item_id: 101, rate: 5.5 }],
            affiliate_list: [{ affiliate_id: 11301234567 }],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_id).toBe(12345);
    });
  });

  describe("editAffiliateListOfTargetedCampaign", () => {
    it("should edit affiliate list of targeted campaign successfully", async () => {
      const mockResponse: EditAffiliateListOfTargetedCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
          fail_affiliate_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.editAffiliateListOfTargetedCampaign({
        campaign_id: 12345,
        edit_type: "add",
        affiliate_list: [{ affiliate_id: 11301234568 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_affiliate_list_of_targeted_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 12345,
            edit_type: "add",
            affiliate_list: [{ affiliate_id: 11301234568 }],
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("editProductListOfTargetedCampaign", () => {
    it("should edit product list of targeted campaign successfully", async () => {
      const mockResponse: EditProductListOfTargetedCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
          fail_item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.editProductListOfTargetedCampaign({
        campaign_id: 12345,
        edit_type: "add",
        item_list: [{ item_id: 102, rate: 6.0 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/edit_product_list_of_targeted_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 12345,
            edit_type: "add",
            item_list: [{ item_id: 102, rate: 6.0 }],
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getTargetedCampaignAddableProductList", () => {
    it("should get addable product list successfully", async () => {
      const mockResponse: GetTargetedCampaignAddableProductListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 10,
          next_cursor: "cursor_xyz",
          has_more: true,
          item_list: [{ item_id: 301, item_name: "Product X", suggested_rate: 5.0 }],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getTargetedCampaignAddableProductList({
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_addable_product_list",
        {
          method: "GET",
          auth: true,
          params: { page_size: 20 },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getTargetedCampaignList", () => {
    it("should get targeted campaign list successfully", async () => {
      const mockResponse: GetTargetedCampaignListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 2,
          has_more: false,
          campaign_list: [
            {
              campaign_id: 12345,
              campaign_name: "Summer Sale",
              campaign_status: "active",
              period_start_time: 1609459200,
              period_end_time: 32503651199,
              is_set_budget: true,
              budget: 500000,
              create_time: 1609459200,
              update_time: 1609459200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getTargetedCampaignList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_targeted_campaign_list", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
      expect(result.response.campaign_list).toHaveLength(1);
    });
  });

  describe("getTargetedCampaignPerformance", () => {
    it("should get targeted campaign performance successfully", async () => {
      const mockResponse: GetTargetedCampaignPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              campaign_id: 12345,
              sales: "5000.00",
              orders: 100,
              est_commission: "250.00",
              clicks: 2000,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getTargetedCampaignPerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_performance",
        {
          method: "GET",
          auth: true,
          params: {
            period_type: "Last30d",
            start_date: "20250101",
            end_date: "20250131",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getTargetedCampaignSettings", () => {
    it("should get targeted campaign settings successfully", async () => {
      const mockResponse: GetTargetedCampaignSettingsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
          campaign_name: "Summer Sale",
          campaign_status: "active",
          period_start_time: 1609459200,
          period_end_time: 32503651199,
          is_set_budget: true,
          budget: 500000,
          seller_message: "Hello!",
          item_list: [{ item_id: 101, rate: 5.5 }],
          affiliate_list: [{ affiliate_id: 11301234567 }],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getTargetedCampaignSettings({
        campaign_id: 12345,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_targeted_campaign_settings",
        {
          method: "GET",
          auth: true,
          params: { campaign_id: 12345 },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.campaign_name).toBe("Summer Sale");
    });
  });

  describe("terminateTargetedCampaign", () => {
    it("should terminate targeted campaign successfully", async () => {
      const mockResponse: TerminateTargetedCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.terminateTargetedCampaign({
        campaign_id: 12345,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/terminate_targeted_campaign", {
        method: "POST",
        auth: true,
        body: { campaign_id: 12345 },
      });

      expect(result.error).toBe("");
    });
  });

  describe("updateBasicInfoOfTargetedCampaign", () => {
    it("should update basic info of targeted campaign successfully", async () => {
      const mockResponse: UpdateBasicInfoOfTargetedCampaignResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          campaign_id: 12345,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.updateBasicInfoOfTargetedCampaign({
        campaign_id: 12345,
        campaign_name: "Updated Campaign Name",
        budget: 600000,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/update_basic_info_of_targeted_campaign",
        {
          method: "POST",
          auth: true,
          body: {
            campaign_id: 12345,
            campaign_name: "Updated Campaign Name",
            budget: 600000,
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  // Performance & Analytics APIs
  describe("getAffiliatePerformance", () => {
    it("should get affiliate performance successfully", async () => {
      const mockResponse: GetAffiliatePerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              affiliate_id: 11301234567,
              affiliate_name: "Top Affiliate",
              sales: "10000.00",
              orders: 200,
              est_commission: "500.00",
              clicks: 5000,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getAffiliatePerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_affiliate_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Last30d",
          start_date: "20250101",
          end_date: "20250131",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getAutoAddNewProductToggleStatus", () => {
    it("should get auto add new product toggle status successfully", async () => {
      const mockResponse: GetAutoAddNewProductToggleStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          open: true,
          commission_rate: 5.0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getAutoAddNewProductToggleStatus();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_auto_add_new_product_toggle_status",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result.error).toBe("");
      expect(result.response.open).toBe(true);
    });
  });

  describe("getCampaignKeyMetricsPerformance", () => {
    it("should get campaign key metrics performance successfully", async () => {
      const mockResponse: GetCampaignKeyMetricsPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          sales: "50000.00",
          orders: 1000,
          est_commission: "2500.00",
          clicks: 20000,
          roi: "20.0",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getCampaignKeyMetricsPerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_campaign_key_metrics_performance",
        {
          method: "GET",
          auth: true,
          params: {
            period_type: "Last30d",
            start_date: "20250101",
            end_date: "20250131",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getContentPerformance", () => {
    it("should get content performance successfully", async () => {
      const mockResponse: GetContentPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              content_id: 12345,
              content_type: "video",
              sales: "3000.00",
              orders: 50,
              est_commission: "150.00",
              clicks: 1000,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getContentPerformance({
        period_type: "Last7d",
        start_date: "20250120",
        end_date: "20250127",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_content_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Last7d",
          start_date: "20250120",
          end_date: "20250127",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getConversionReport", () => {
    it("should get conversion report successfully", async () => {
      const mockResponse: GetConversionReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              order_sn: "ORDER123456",
              item_id: 101,
              affiliate_id: 11301234567,
              commission: "25.00",
              order_time: 1609459200,
              order_status: "completed",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getConversionReport();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_conversion_report", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
    });
  });

  describe("getManagedAffiliateList", () => {
    it("should get managed affiliate list successfully", async () => {
      const mockResponse: GetManagedAffiliateListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 2,
          affiliate_list: [
            { affiliate_id: 11301234567, affiliate_name: "Affiliate A", status: "active" },
            { affiliate_id: 11301234568, affiliate_name: "Affiliate B", status: "active" },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getManagedAffiliateList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_managed_affiliate_list", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
    });
  });

  describe("getOptimizationSuggestionProduct", () => {
    it("should get optimization suggestion products successfully", async () => {
      const mockResponse: GetOptimizationSuggestionProductResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          item_list: [
            {
              item_id: 101,
              item_name: "Product A",
              current_rate: 3.0,
              suggested_rate: 5.0,
              rcmd_reason: "high_conversion",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getOptimizationSuggestionProduct();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_optimization_suggestion_product",
        {
          method: "GET",
          auth: true,
          params: {},
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getPerformanceDataUpdateTime", () => {
    it("should get performance data update time successfully", async () => {
      const mockResponse: GetPerformanceDataUpdateTimeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          latest_data_date: "20250126",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getPerformanceDataUpdateTime({
        marker_type: "AmsMarker",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_performance_data_update_time",
        {
          method: "GET",
          auth: true,
          params: { marker_type: "AmsMarker" },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getProductPerformance", () => {
    it("should get product performance successfully", async () => {
      const mockResponse: GetProductPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              item_id: 101,
              item_name: "Product A",
              sales: "8000.00",
              orders: 150,
              est_commission: "400.00",
              clicks: 3000,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getProductPerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_product_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Last30d",
          start_date: "20250101",
          end_date: "20250131",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getRecommendedAffiliateList", () => {
    it("should get recommended affiliate list successfully", async () => {
      const mockResponse: GetRecommendedAffiliateListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          affiliate_list: [
            {
              affiliate_id: 11301234569,
              affiliate_name: "Recommended Affiliate",
              rcmd_reason: "high_performance",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getRecommendedAffiliateList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/get_recommended_affiliate_list",
        {
          method: "GET",
          auth: true,
          params: {},
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getShopPerformance", () => {
    it("should get shop performance successfully", async () => {
      const mockResponse: AmsGetShopPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          sales: "15000.00",
          gross_item_sold: 9684221,
          orders: 68,
          clicks: 1564852,
          est_commission: "2000.00",
          roi: "18.8",
          total_buyers: 894,
          new_buyers: 260,
          fetched_date_range: "20250101-20250131",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getShopPerformance({
        period_type: "Last30d",
        start_date: "20250101",
        end_date: "20250131",
        order_type: "ConfirmedOrder",
        channel: "AllChannel",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_shop_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Last30d",
          start_date: "20250101",
          end_date: "20250131",
          order_type: "ConfirmedOrder",
          channel: "AllChannel",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getShopSuggestedRate", () => {
    it("should get shop suggested rate successfully", async () => {
      const mockResponse: GetShopSuggestedRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          suggested_rate: 5.0,
          min_rate: 1.0,
          max_rate: 10.0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getShopSuggestedRate();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_shop_suggested_rate", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.suggested_rate).toBe(5.0);
    });
  });

  // Validation APIs
  describe("getValidationList", () => {
    it("should get validation list successfully", async () => {
      const mockResponse: GetValidationListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          validation_list: [
            { validation_id: 1, validation_month: "202501", status: "completed" },
            { validation_id: 2, validation_month: "202502", status: "pending" },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getValidationList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_validation_list", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
    });
  });

  describe("getValidationReport", () => {
    it("should get validation report successfully", async () => {
      const mockResponse: GetValidationReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 1,
          data_list: [
            {
              order_sn: "ORDER123456",
              item_id: 101,
              affiliate_id: 11301234567,
              validated_commission: "25.00",
              validation_status: "approved",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.getValidationReport();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/get_validation_report", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
    });
  });

  // Query APIs
  describe("queryAffiliateList", () => {
    it("should query affiliate list by ID successfully", async () => {
      const mockResponse: QueryAffiliateListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          affiliate_list: [
            {
              affiliate_id: 11301234567,
              affiliate_name: "Affiliate A",
              avatar_url: "https://example.com/avatar.jpg",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.queryAffiliateList({
        query_type: "id",
        affiliate_id_list: "11301234567",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/query_affiliate_list", {
        method: "GET",
        auth: true,
        params: {
          query_type: "id",
          affiliate_id_list: "11301234567",
        },
      });

      expect(result.error).toBe("");
    });

    it("should query affiliate list by name successfully", async () => {
      const mockResponse: QueryAffiliateListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          affiliate_list: [
            {
              affiliate_id: 11301234567,
              affiliate_name: "Affiliate A",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.queryAffiliateList({
        query_type: "name",
        name: "Affiliate",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/ams/query_affiliate_list", {
        method: "GET",
        auth: true,
        params: {
          query_type: "name",
          name: "Affiliate",
        },
      });

      expect(result.error).toBe("");
    });
  });

  // Settings APIs
  describe("updateAutoAddNewProductSetting", () => {
    it("should update auto add new product setting successfully", async () => {
      const mockResponse: UpdateAutoAddNewProductSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.updateAutoAddNewProductSetting({
        open: true,
        commission_rate: 5.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/update_auto_add_new_product_setting",
        {
          method: "POST",
          auth: true,
          body: {
            open: true,
            commission_rate: 5.0,
          },
        }
      );

      expect(result.error).toBe("");
    });

    it("should disable auto add new product setting successfully", async () => {
      const mockResponse: UpdateAutoAddNewProductSettingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await amsManager.updateAutoAddNewProductSetting({
        open: false,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/ams/update_auto_add_new_product_setting",
        {
          method: "POST",
          auth: true,
          body: {
            open: false,
          },
        }
      );

      expect(result.error).toBe("");
    });
  });
});
