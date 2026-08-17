import { jest } from "@jest/globals";
import { GlobalProductManager } from "../../managers/global-product.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetCategoryResponse,
  GetGlobalItemListResponse,
  GetGlobalItemInfoResponse,
  GetGlobalModelListResponse,
  AddGlobalItemResponse,
  UpdateGlobalItemResponse,
  DeleteGlobalItemResponse,
  AddGlobalModelResponse,
  UpdateGlobalModelResponse,
  DeleteGlobalModelResponse,
  InitTierVariationResponse,
  UpdateTierVariationResponse,
  UpdateStockResponse,
  UpdatePriceResponse,
  GetAttributeTreeResponse,
  GetBrandListResponse,
  CategoryRecommendResponse,
  GetGlobalItemLimitResponse,
  GetPublishableShopResponse,
  GetShopPublishableStatusResponse,
  CreatePublishTaskResponse,
  GetPublishTaskResultResponse,
  GetPublishedListResponse,
  GetGlobalItemIdResponse,
  GetRecommendAttributeResponse,
  SearchGlobalAttributeValueListResponse,
  GetVariationsResponse,
  SetSyncFieldResponse,
  GetLocalAdjustmentRateResponse,
  UpdateLocalAdjustmentRateResponse,
  GetSizeChartListResponse,
  GetSizeChartDetailResponse,
  UpdateSizeChartResponse,
  SupportSizeChartResponse,
} from "../../schemas/global-product.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("GlobalProductManager", () => {
  let globalProductManager: GlobalProductManager;
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

    globalProductManager = new GlobalProductManager(mockConfig);
  });

  describe("getCategory", () => {
    it("should get global category list successfully", async () => {
      const mockResponse: GetCategoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_list: [
            {
              category_id: 100182,
              parent_category_id: 100180,
              original_category_name: "Mobile & Accessories",
              display_category_name: "手机及配件",
              has_children: true,
            },
            {
              category_id: 100183,
              parent_category_id: 100180,
              original_category_name: "Cameras",
              display_category_name: "相机",
              has_children: false,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getCategory({ language: "zh-hans" });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_category", {
        method: "GET",
        auth: true,
        params: { language: "zh-hans" },
      });

      expect(result.error).toBe("");
      expect(result.response.category_list).toHaveLength(2);
      expect(result.response.category_list![0].category_id).toBe(100182);
      expect(result.response.category_list![0].has_children).toBe(true);
    });

    it("should get category list without language parameter", async () => {
      const mockResponse: GetCategoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getCategory();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_category", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
    });
  });

  describe("getGlobalItemList", () => {
    it("should get global item list successfully", async () => {
      const mockResponse: GetGlobalItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_list: [
            {
              global_item_id: 2300146833,
              update_time: 1608967817,
            },
            {
              global_item_id: 2300146834,
              update_time: 1608967818,
            },
          ],
          total_count: 826,
          has_next_page: true,
          offset: "AAAAFA==",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalItemList({
        page_size: 10,
        update_time_from: 1611311600,
        update_time_to: 1611311631,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 10,
            update_time_from: 1611311600,
            update_time_to: 1611311631,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_item_list).toHaveLength(2);
      expect(result.response.total_count).toBe(826);
      expect(result.response.has_next_page).toBe(true);
    });
  });

  describe("getGlobalItemInfo", () => {
    it("should get global item info successfully", async () => {
      const mockResponse: GetGlobalItemInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_list: [
            {
              global_item_id: 123456,
              category_id: 100182,
              global_item_name: "Test Product",
              description: "Test Description",
              image: {
                image_url_list: ["https://example.com/image1.jpg"],
                image_id_list: ["image123"],
              },
              price_info: [
                {
                  currency: "USD",
                  original_price: 29.99,
                },
              ],
              stock_info: [
                {
                  stock_type: 1,
                  normal_stock: 100,
                  reserved_stock: 0,
                },
              ],
              attribute_list: [],
              global_item_status: "NORMAL",
              has_model: false,
              create_time: 1608967817,
              update_time: 1608967817,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalItemInfo({
        global_item_id_list: [123456],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_info",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id_list: [123456],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_item_list).toHaveLength(1);
      expect(result.response.global_item_list![0].global_item_id).toBe(123456);
      expect(result.response.global_item_list![0].global_item_name).toBe("Test Product");
    });
  });

  describe("addGlobalItem", () => {
    it("should add a global item successfully", async () => {
      const mockResponse: AddGlobalItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_id: 123456,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.addGlobalItem({
        category_id: 100182,
        global_item_name: "New Product",
        description: "Product description",
        weight: 1.5,
        image: {
          image_id_list: ["image123"],
        },
        original_price: 99.99,
        pre_order: { days_to_ship: 7 },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/add_global_item", {
        method: "POST",
        auth: true,
        body: {
          category_id: 100182,
          global_item_name: "New Product",
          description: "Product description",
          weight: 1.5,
          image: {
            image_id_list: ["image123"],
          },
          original_price: 99.99,
          pre_order: { days_to_ship: 7 },
        },
      });

      expect(result.error).toBe("");
      expect(result.response.global_item_id).toBe(123456);
    });
  });

  describe("updateGlobalItem", () => {
    it("should update a global item successfully", async () => {
      const mockResponse: UpdateGlobalItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_id: 123456,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateGlobalItem({
        global_item_id: 123456,
        global_item_name: "Updated Product",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_global_item",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            global_item_name: "Updated Product",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_item_id).toBe(123456);
    });
  });

  describe("deleteGlobalItem", () => {
    it("should delete a global item successfully", async () => {
      const mockResponse: DeleteGlobalItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.deleteGlobalItem({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/delete_global_item",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("initTierVariation", () => {
    it("should initialize tier variation successfully", async () => {
      const mockResponse: InitTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.initTierVariation({
        global_item_id: 123456,
        standardise_tier_variation: [
          {
            variation_id: 1,
            variation_name: "Color",
            variation_option_list: [
              { variation_option_id: 11, variation_option_name: "Red" },
              { variation_option_id: 12, variation_option_name: "Blue" },
            ],
          },
        ],
        global_model: [
          {
            tier_index: 0,
            global_model_sku: "SKU-RED",
            original_price: 99.99,
          },
          {
            tier_index: 1,
            global_model_sku: "SKU-BLUE",
            original_price: 99.99,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/init_tier_variation",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            global_item_id: 123456,
          }),
        }
      );

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("updateStock", () => {
    it("should update global item stock successfully", async () => {
      const mockResponse: UpdateStockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateStock({
        global_item_id: 123456,
        stock_list: [
          {
            global_model_id: 789,
            seller_stock: [
              {
                stock: 100,
              },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/update_stock", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          stock_list: [
            {
              global_model_id: 789,
              seller_stock: [
                {
                  stock: 100,
                },
              ],
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("updatePrice", () => {
    it("should update global item price successfully", async () => {
      const mockResponse: UpdatePriceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updatePrice({
        global_item_id: 123456,
        price_list: [
          {
            global_model_id: 789,
            original_price: 29.99,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/update_price", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          price_list: [
            {
              global_model_id: 789,
              original_price: 29.99,
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("getAttributeTree", () => {
    it("should get attribute tree successfully", async () => {
      const mockResponse: GetAttributeTreeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              category_id: 100182,
              attribute_tree: [
                {
                  attribute_id: 1000,
                  name: "Material",
                  mandatory: true,
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getAttributeTree({
        category_id_list: [100182],
        language: "en",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_attribute_tree",
        {
          method: "GET",
          auth: true,
          params: {
            category_id_list: "100182",
            language: "en",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(1);
    });
  });

  describe("getBrandList", () => {
    it("should get brand list successfully", async () => {
      const mockResponse: GetBrandListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          brand_list: [
            {
              brand_id: 5001,
              original_brand_name: "Apple",
              display_brand_name: "Apple",
            },
          ],
          has_next_page: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getBrandList({
        category_id: 100182,
        page_size: 20,
        offset: 0,
        status: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_brand_list", {
        method: "GET",
        auth: true,
        params: {
          category_id: 100182,
          page_size: 20,
          offset: 0,
          status: 1,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.brand_list).toHaveLength(1);
      expect(result.response.brand_list![0].brand_id).toBe(5001);
    });
  });

  describe("categoryRecommend", () => {
    it("should get category recommendations successfully", async () => {
      const mockResponse: CategoryRecommendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_id: [100182, 100183, 100184],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.categoryRecommend({
        global_item_name: "iPhone Case",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/category_recommend",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_name: "iPhone Case",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.category_id).toHaveLength(3);
    });
  });

  describe("createPublishTask", () => {
    it("should create publish task successfully", async () => {
      const mockResponse: CreatePublishTaskResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          publish_task_id: 123,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.createPublishTask({
        global_item_id: 123456,
        shop_id: 67890,
        shop_region: "SG",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/create_publish_task",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            shop_id: 67890,
            shop_region: "SG",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.publish_task_id).toBe(123);
    });
  });

  describe("getPublishTaskResult", () => {
    it("should get publish task result successfully", async () => {
      const mockResponse: GetPublishTaskResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          publish_status: "SUCCESS",
          success: {
            shop_id: "67890",
            item_id: "999",
            region: "SG",
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getPublishTaskResult({
        publish_task_id: 123,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_publish_task_result",
        {
          method: "GET",
          auth: true,
          params: {
            publish_task_id: 123,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.publish_status).toBe("SUCCESS");
      expect(result.response.success?.item_id).toBe("999");
    });
  });

  describe("getGlobalItemId", () => {
    it("should get global item ID successfully", async () => {
      const mockResponse: GetGlobalItemIdResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id_map: [
            {
              item_id: 999,
              global_item_id: 123456,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalItemId({
        shop_id: 67890,
        item_id_list: [999],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_id",
        {
          method: "GET",
          auth: true,
          params: {
            shop_id: 67890,
            item_id_list: "999",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.item_id_map![0].global_item_id).toBe(123456);
    });
  });

  describe("setSyncField", () => {
    it("should set sync field successfully", async () => {
      const mockResponse: SetSyncFieldResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.setSyncField({
        shop_sync_list: [
          {
            shop_id: 67890,
            shop_region: "SG",
            name_and_description: true,
            media_information: true,
            tier_variation_name_and_option: true,
            price: true,
            days_to_ship: true,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/set_sync_field", {
        method: "POST",
        auth: true,
        body: {
          shop_sync_list: [
            {
              shop_id: 67890,
              shop_region: "SG",
              name_and_description: true,
              media_information: true,
              tier_variation_name_and_option: true,
              price: true,
              days_to_ship: true,
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("supportSizeChart", () => {
    it("should check size chart support successfully", async () => {
      const mockResponse: SupportSizeChartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          support_size_chart: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.supportSizeChart({
        category_id: 100182,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/support_size_chart",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100182,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.support_size_chart).toBe(true);
    });
  });

  describe("getGlobalModelList", () => {
    it("should get global model list successfully", async () => {
      const mockResponse: GetGlobalModelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tier_variation: [
            {
              name: "Color",
              option_list: [
                {
                  option: "Red",
                },
                {
                  option: "Blue",
                },
              ],
            },
          ],
          global_model: [
            {
              global_model_id: 789,
              tier_index: [0],
              price_info: {
                original_price: 29.99,
              },
              stock_info: [
                {
                  stock_type: 1,
                  current_stock: 50,
                  normal_stock: 50,
                  reserved_stock: 0,
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalModelList({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_model_list",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.tier_variation).toHaveLength(1);
      expect(result.response.global_model).toHaveLength(1);
    });
  });

  describe("addGlobalModel", () => {
    it("should add global models successfully", async () => {
      const mockResponse: AddGlobalModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.addGlobalModel({
        global_item_id: 123456,
        global_model: [
          {
            tier_index: [0, 1],
            global_model_sku: "SKU-001",
            original_price: 99.99,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/add_global_model", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          global_model: [
            {
              tier_index: [0, 1],
              global_model_sku: "SKU-001",
              original_price: 99.99,
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("updateGlobalModel", () => {
    it("should update global models successfully", async () => {
      const mockResponse: UpdateGlobalModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateGlobalModel({
        global_item_id: 123456,
        global_model: [
          {
            global_model_id: 789,
            global_model_sku: "SKU-002",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_global_model",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            global_model: [
              {
                global_model_id: 789,
                global_model_sku: "SKU-002",
              },
            ],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("deleteGlobalModel", () => {
    it("should delete global models successfully", async () => {
      const mockResponse: DeleteGlobalModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_model_id: 789,
          failures: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.deleteGlobalModel({
        global_item_id: 123456,
        global_model_id: 789,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/delete_global_model",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            global_model_id: 789,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_model_id).toBe(789);
    });
  });

  describe("updateTierVariation", () => {
    it("should update tier variation successfully", async () => {
      const mockResponse: UpdateTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateTierVariation({
        global_item_id: 123456,
        standardise_tier_variation: [
          {
            variation_id: 1,
            variation_name: "Size",
            variation_option_list: [
              { variation_option_id: 11, variation_option_name: "S" },
              { variation_option_id: 12, variation_option_name: "M" },
              { variation_option_id: 13, variation_option_name: "L" },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_tier_variation",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            standardise_tier_variation: [
              {
                variation_id: 1,
                variation_name: "Size",
                variation_option_list: [
                  { variation_option_id: 11, variation_option_name: "S" },
                  { variation_option_id: 12, variation_option_name: "M" },
                  { variation_option_id: 13, variation_option_name: "L" },
                ],
              },
            ],
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getGlobalItemLimit", () => {
    it("should get global item limit successfully", async () => {
      const mockResponse: GetGlobalItemLimitResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_image_count_limit: {
            max_limit: 9,
          },
          global_item_name_length_limit: {
            max_limit: 120,
          },
          global_item_description_length_limit: {
            max_limit: 3000,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalItemLimit({
        category_id: 100182,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_limit",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100182,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_item_image_count_limit?.max_limit).toBe(9);
    });
  });

  describe("getPublishableShop", () => {
    it("should get publishable shop list successfully", async () => {
      const mockResponse: GetPublishableShopResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          publishable_shop: [
            {
              shop_id: 67890,
              shop_region: "SG",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getPublishableShop({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_publishable_shop",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.publishable_shop).toHaveLength(1);
    });
  });

  describe("getShopPublishableStatus", () => {
    it("should get shop publishable status successfully", async () => {
      const mockResponse: GetShopPublishableStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_publishable_status_list: [
            {
              shop_id: 67890,
              shop_publishable_status: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getShopPublishableStatus({
        global_item_id: 123456,
        offset: 0,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_shop_publishable_status",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
            offset: 0,
            page_size: 20,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.shop_publishable_status_list?.[0].shop_publishable_status).toBe(true);
    });
  });

  describe("getPublishedList", () => {
    it("should get published list successfully", async () => {
      const mockResponse: GetPublishedListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          published_item: [
            {
              shop_id: 67890,
              item_id: 999,
              shop_region: "SG",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getPublishedList({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_published_list",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.published_item).toHaveLength(1);
    });
  });

  describe("getRecommendAttribute", () => {
    it("should get recommended attributes successfully", async () => {
      const mockResponse: GetRecommendAttributeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          attribute_list: [
            {
              attribute_id: 1000,
              attribute_value_list: [],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getRecommendAttribute({
        global_item_name: "T-Shirt",
        category_id: 100001,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_recommend_attribute",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_name: "T-Shirt",
            category_id: 100001,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.attribute_list).toHaveLength(1);
    });
  });

  describe("searchGlobalAttributeValueList", () => {
    it("should search global attribute value list successfully", async () => {
      const mockResponse: SearchGlobalAttributeValueListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          value_list: [
            {
              value_id: 1001,
              value_name: "Cotton",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.searchGlobalAttributeValueList({
        attribute_id: 1000,
        value_name: "cotton",
        cursor: 0,
        limit: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/search_global_attribute_value_list",
        {
          method: "POST",
          auth: true,
          body: {
            attribute_id: 1000,
            value_name: "cotton",
            cursor: 0,
            limit: 20,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.value_list).toHaveLength(1);
    });
  });

  describe("getVariations", () => {
    it("should get variations successfully", async () => {
      const mockResponse: GetVariationsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          standardise_variation_list: [
            {
              variation_id: 1001,
              variation_name: "Color",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getVariations({
        category_id: 100001,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_variations", {
        method: "GET",
        auth: true,
        params: {
          category_id: 100001,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.standardise_variation_list).toHaveLength(1);
    });
  });

  describe("getLocalAdjustmentRate", () => {
    it("should get local adjustment rate successfully", async () => {
      const mockResponse: GetLocalAdjustmentRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          local_adjustment_rate: 10.5,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getLocalAdjustmentRate({
        shop_id: 67890,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_local_adjustment_rate",
        {
          method: "GET",
          auth: true,
          params: {
            shop_id: 67890,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.local_adjustment_rate).toBe(10.5);
    });
  });

  describe("updateLocalAdjustmentRate", () => {
    it("should update local adjustment rate successfully", async () => {
      const mockResponse: UpdateLocalAdjustmentRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateLocalAdjustmentRate({
        shop_id: 67890,
        adjustment_rate: 10.5,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_local_adjustment_rate",
        {
          method: "POST",
          auth: true,
          body: {
            shop_id: 67890,
            adjustment_rate: 10.5,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.warning).toBe("");
    });
  });

  describe("getSizeChartList", () => {
    it("should get size chart list successfully", async () => {
      const mockResponse: GetSizeChartListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          size_chart_list: [
            {
              size_chart_id: 123,
            },
          ],
          total_count: 1,
          next_cursor: "1",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getSizeChartList({
        category_id: 100001,
        page_size: 20,
        cursor: "0",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_size_chart_list",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
            page_size: 20,
            cursor: "0",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.size_chart_list).toHaveLength(1);
    });
  });

  describe("getSizeChartDetail", () => {
    it("should get size chart detail successfully", async () => {
      const mockResponse: GetSizeChartDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          size_chart_id: 123,
          size_chart_name: "Standard Size Chart",
          size_chart_table: {
            column_list: [
              {
                measurement: {
                  display_name: "Chest",
                },
                measurement_value_list: [
                  {
                    value: 90,
                  },
                ],
              },
            ],
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getSizeChartDetail({
        size_chart_id: 123,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_size_chart_detail",
        {
          method: "GET",
          auth: true,
          params: {
            size_chart_id: 123,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.size_chart_id).toBe(123);
    });
  });

  describe("updateSizeChart", () => {
    it("should update size chart successfully", async () => {
      const mockResponse: UpdateSizeChartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateSizeChart({
        global_item_id: 123456,
        size_chart: "chart_image_id",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_size_chart",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            size_chart: "chart_image_id",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });
});
