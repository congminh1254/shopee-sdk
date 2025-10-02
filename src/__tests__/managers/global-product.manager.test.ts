import { jest } from "@jest/globals";
import { GlobalProductManager } from "../../managers/global-product.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetGlobalCategoryResponse,
  GetGlobalItemListResponse,
  GetGlobalItemInfoResponse,
  GetGlobalModelListResponse,
  AddGlobalItemResponse,
  UpdateGlobalItemResponse,
  DeleteGlobalItemResponse,
  AddGlobalModelResponse,
  UpdateGlobalModelResponse,
  DeleteGlobalModelResponse,
  InitGlobalTierVariationResponse,
  UpdateGlobalTierVariationResponse,
  UpdateGlobalStockResponse,
  UpdateGlobalPriceResponse,
  GetGlobalAttributeTreeResponse,
  GetGlobalBrandListResponse,
  GlobalCategoryRecommendResponse,
  GetGlobalItemLimitResponse,
  GetPublishableShopResponse,
  GetShopPublishableStatusResponse,
  CreatePublishTaskResponse,
  GetPublishTaskResultResponse,
  GetPublishedListResponse,
  GetGlobalItemIdResponse,
  GetGlobalRecommendAttributeResponse,
  SearchGlobalAttributeValueListResponse,
  GetGlobalVariationsResponse,
  SetSyncFieldResponse,
  GetLocalAdjustmentRateResponse,
  UpdateLocalAdjustmentRateResponse,
  GetGlobalSizeChartListResponse,
  GetGlobalSizeChartDetailResponse,
  UpdateSizeChartResponse,
  SupportSizeChartResponse,
} from "../../schemas/global-product.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
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
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    globalProductManager = new GlobalProductManager(mockConfig);
  });

  describe("getCategory", () => {
    it("should get global category list successfully", async () => {
      const mockResponse: GetGlobalCategoryResponse = {
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
      expect(result.response.category_list[0].category_id).toBe(100182);
      expect(result.response.category_list[0].has_children).toBe(true);
    });

    it("should get category list without language parameter", async () => {
      const mockResponse: GetGlobalCategoryResponse = {
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
                  current_price: 29.99,
                },
              ],
              stock_info: [
                {
                  stock_type: 1,
                  current_stock: 100,
                  normal_stock: 100,
                  reserved_stock: 0,
                },
              ],
              attribute_list: [],
              item_status: "NORMAL",
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
      expect(result.response.global_item_list[0].global_item_id).toBe(123456);
      expect(result.response.global_item_list[0].global_item_name).toBe("Test Product");
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
      const mockResponse: InitGlobalTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_list: [
            {
              global_model_id: 789,
              tier_index: [0, 0],
            },
            {
              global_model_id: 790,
              tier_index: [0, 1],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.initTierVariation({
        global_item_id: 123456,
        tier_variation: [
          {
            name: "Color",
            option_list: [{ option: "Red" }, { option: "Blue" }],
          },
        ],
        model_list: [
          {
            tier_index: [0],
            model_sku: "SKU-RED",
          },
          {
            tier_index: [1],
            model_sku: "SKU-BLUE",
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
      expect(result.response.model_list).toHaveLength(2);
    });
  });

  describe("updateStock", () => {
    it("should update global item stock successfully", async () => {
      const mockResponse: UpdateGlobalStockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              shop_id: 67890,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateStock({
        global_item_id: 123456,
        stock_list: [
          {
            shop_id: 67890,
            normal_stock: 100,
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
              shop_id: 67890,
              normal_stock: 100,
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.result_list[0].success).toBe(true);
    });
  });

  describe("updatePrice", () => {
    it("should update global item price successfully", async () => {
      const mockResponse: UpdateGlobalPriceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              shop_id: 67890,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updatePrice({
        global_item_id: 123456,
        price_list: [
          {
            shop_id: 67890,
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
              shop_id: 67890,
              original_price: 29.99,
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.result_list[0].success).toBe(true);
    });
  });

  describe("getAttributeTree", () => {
    it("should get attribute tree successfully", async () => {
      const mockResponse: GetGlobalAttributeTreeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          attribute_list: [
            {
              attribute_id: 1000,
              original_attribute_name: "Material",
              display_attribute_name: "材质",
              is_mandatory: true,
              attribute_type: "SELECT",
              attribute_value_list: [],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getAttributeTree({
        category_id: 100182,
        language: "en",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_attribute_tree",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100182,
            language: "en",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.attribute_list).toHaveLength(1);
    });
  });

  describe("getBrandList", () => {
    it("should get brand list successfully", async () => {
      const mockResponse: GetGlobalBrandListResponse = {
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
          total_count: 1,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getBrandList({
        category_id: 100182,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_brand_list", {
        method: "GET",
        auth: true,
        params: {
          category_id: 100182,
          page_size: 20,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.brand_list).toHaveLength(1);
      expect(result.response.brand_list[0].brand_id).toBe(5001);
    });
  });

  describe("categoryRecommend", () => {
    it("should get category recommendations successfully", async () => {
      const mockResponse: GlobalCategoryRecommendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_id_list: [100182, 100183, 100184],
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
          method: "POST",
          auth: true,
          body: {
            global_item_name: "iPhone Case",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.category_id_list).toHaveLength(3);
    });
  });

  describe("createPublishTask", () => {
    it("should create publish task successfully", async () => {
      const mockResponse: CreatePublishTaskResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          publish_task_id: "task_123",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.createPublishTask({
        global_item_id: 123456,
        shop_list: [{ shop_id: 67890 }, { shop_id: 67891 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/create_publish_task",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            shop_list: [{ shop_id: 67890 }, { shop_id: 67891 }],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.publish_task_id).toBe("task_123");
    });
  });

  describe("getPublishTaskResult", () => {
    it("should get publish task result successfully", async () => {
      const mockResponse: GetPublishTaskResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "SUCCESS",
          result_list: [
            {
              shop_id: 67890,
              item_id: 999,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getPublishTaskResult({
        publish_task_id: "task_123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_publish_task_result",
        {
          method: "GET",
          auth: true,
          params: {
            publish_task_id: "task_123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.status).toBe("SUCCESS");
      expect(result.response.result_list[0].success).toBe(true);
    });
  });

  describe("getGlobalItemId", () => {
    it("should get global item ID successfully", async () => {
      const mockResponse: GetGlobalItemIdResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          global_item_id: 123456,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getGlobalItemId({
        shop_id: 67890,
        item_id: 999,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_id",
        {
          method: "GET",
          auth: true,
          params: {
            shop_id: 67890,
            item_id: 999,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.global_item_id).toBe(123456);
    });
  });

  describe("setSyncField", () => {
    it("should set sync field successfully", async () => {
      const mockResponse: SetSyncFieldResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              shop_id: 67890,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.setSyncField({
        global_item_id: 123456,
        shop_list: [
          {
            shop_id: 67890,
            sync_field_list: ["name", "price", "stock"],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/set_sync_field", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          shop_list: [
            {
              shop_id: 67890,
              sync_field_list: ["name", "price", "stock"],
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.result_list[0].success).toBe(true);
    });
  });

  describe("supportSizeChart", () => {
    it("should check size chart support successfully", async () => {
      const mockResponse: SupportSizeChartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          support: true,
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
      expect(result.response.support).toBe(true);
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
              price_info: [
                {
                  currency: "USD",
                  original_price: 29.99,
                  current_price: 29.99,
                },
              ],
              stock_info: [
                {
                  stock_type: 1,
                  current_stock: 50,
                  normal_stock: 50,
                  reserved_stock: 0,
                },
              ],
              create_time: 1608967817,
              update_time: 1608967817,
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
          model_list: [
            {
              global_model_id: 789,
              tier_index: [0, 1],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.addGlobalModel({
        global_item_id: 123456,
        model_list: [
          {
            tier_index: [0, 1],
            model_sku: "SKU-001",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/add_global_model", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          model_list: [
            {
              tier_index: [0, 1],
              model_sku: "SKU-001",
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.model_list).toHaveLength(1);
    });
  });

  describe("updateGlobalModel", () => {
    it("should update global models successfully", async () => {
      const mockResponse: UpdateGlobalModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_list: [
            {
              global_model_id: 789,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateGlobalModel({
        global_item_id: 123456,
        model_list: [
          {
            global_model_id: 789,
            model_sku: "SKU-002",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/update_global_model", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          model_list: [
            {
              global_model_id: 789,
              model_sku: "SKU-002",
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.model_list[0].global_model_id).toBe(789);
    });
  });

  describe("deleteGlobalModel", () => {
    it("should delete global models successfully", async () => {
      const mockResponse: DeleteGlobalModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_list: [
            {
              global_model_id: 789,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.deleteGlobalModel({
        global_item_id: 123456,
        global_model_id_list: [789],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/delete_global_model", {
        method: "POST",
        auth: true,
        body: {
          global_item_id: 123456,
          global_model_id_list: [789],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.model_list[0].success).toBe(true);
    });
  });

  describe("updateTierVariation", () => {
    it("should update tier variation successfully", async () => {
      const mockResponse: UpdateGlobalTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateTierVariation({
        global_item_id: 123456,
        tier_variation: [
          {
            name: "Size",
            option_list: [
              { option: "S" },
              { option: "M" },
              { option: "L" },
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
          body: expect.objectContaining({
            global_item_id: 123456,
          }),
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
          limit_info: {
            max_image_count: 9,
            max_video_count: 1,
            max_name_length: 120,
            max_description_length: 3000,
            support_video: true,
            support_size_chart: true,
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
      expect(result.response.limit_info.max_image_count).toBe(9);
    });
  });

  describe("getPublishableShop", () => {
    it("should get publishable shop list successfully", async () => {
      const mockResponse: GetPublishableShopResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_list: [
            {
              shop_id: 67890,
              shop_name: "Test Shop",
              region: "SG",
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
      expect(result.response.shop_list).toHaveLength(1);
    });
  });

  describe("getShopPublishableStatus", () => {
    it("should get shop publishable status successfully", async () => {
      const mockResponse: GetShopPublishableStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_list: [
            {
              shop_id: 67890,
              publishable: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getShopPublishableStatus({
        global_item_id: 123456,
        shop_id_list: [67890],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_shop_publishable_status",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
            shop_id_list: [67890],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.shop_list[0].publishable).toBe(true);
    });
  });

  describe("getPublishedList", () => {
    it("should get published list successfully", async () => {
      const mockResponse: GetPublishedListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_list: [
            {
              shop_id: 67890,
              item_id: 999,
              shop_name: "Test Shop",
              region: "SG",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getPublishedList({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_published_list", {
        method: "GET",
        auth: true,
        params: {
          global_item_id: 123456,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.shop_list).toHaveLength(1);
    });
  });

  describe("getRecommendAttribute", () => {
    it("should get recommended attributes successfully", async () => {
      const mockResponse: GetGlobalRecommendAttributeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          attribute_list: [
            {
              attribute_id: 1000,
              original_attribute_name: "Material",
              display_attribute_name: "Material",
              is_mandatory: true,
              attribute_type: "SELECT",
              attribute_value_list: [],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getRecommendAttribute({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_recommend_attribute",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
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
          attribute_value_list: [
            {
              value_id: 1001,
              original_value_name: "Cotton",
              display_value_name: "Cotton",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.searchGlobalAttributeValueList({
        category_id: 100182,
        attribute_id: 1000,
        keyword: "cotton",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/search_global_attribute_value_list",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100182,
            attribute_id: 1000,
            keyword: "cotton",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.attribute_value_list).toHaveLength(1);
    });
  });

  describe("getVariations", () => {
    it("should get variations successfully", async () => {
      const mockResponse: GetGlobalVariationsResponse = {
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
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getVariations({
        global_item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_variations", {
        method: "GET",
        auth: true,
        params: {
          global_item_id: 123456,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.tier_variation).toHaveLength(1);
    });
  });

  describe("getLocalAdjustmentRate", () => {
    it("should get local adjustment rate successfully", async () => {
      const mockResponse: GetLocalAdjustmentRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          adjustment_rate_list: [
            {
              shop_id: 67890,
              adjustment_rate: 10.5,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getLocalAdjustmentRate({
        global_item_id: 123456,
        shop_id_list: [67890],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_local_adjustment_rate",
        {
          method: "GET",
          auth: true,
          params: {
            global_item_id: 123456,
            shop_id_list: [67890],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.adjustment_rate_list).toHaveLength(1);
    });
  });

  describe("updateLocalAdjustmentRate", () => {
    it("should update local adjustment rate successfully", async () => {
      const mockResponse: UpdateLocalAdjustmentRateResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              shop_id: 67890,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateLocalAdjustmentRate({
        global_item_id: 123456,
        adjustment_rate_list: [
          {
            shop_id: 67890,
            adjustment_rate: 10.5,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_local_adjustment_rate",
        {
          method: "POST",
          auth: true,
          body: {
            global_item_id: 123456,
            adjustment_rate_list: [
              {
                shop_id: 67890,
                adjustment_rate: 10.5,
              },
            ],
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.result_list[0].success).toBe(true);
    });
  });

  describe("getSizeChartList", () => {
    it("should get size chart list successfully", async () => {
      const mockResponse: GetGlobalSizeChartListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          size_chart_list: [
            {
              size_chart_id: "chart123",
              size_chart_name: "Standard Size Chart",
              size_chart_table: {
                header: ["Size", "Chest"],
                rows: [["S", "90cm"]],
              },
            },
          ],
          has_next_page: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getSizeChartList({
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/get_size_chart_list", {
        method: "GET",
        auth: true,
        params: {
          page_size: 20,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.size_chart_list).toHaveLength(1);
    });
  });

  describe("getSizeChartDetail", () => {
    it("should get size chart detail successfully", async () => {
      const mockResponse: GetGlobalSizeChartDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          size_chart: {
            size_chart_id: "chart123",
            size_chart_name: "Standard Size Chart",
            size_chart_table: {
              header: ["Size", "Chest", "Length"],
              rows: [
                ["S", "90cm", "60cm"],
                ["M", "95cm", "65cm"],
              ],
            },
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.getSizeChartDetail({
        size_chart_id: "chart123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_size_chart_detail",
        {
          method: "GET",
          auth: true,
          params: {
            size_chart_id: "chart123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.size_chart.size_chart_id).toBe("chart123");
    });
  });

  describe("updateSizeChart", () => {
    it("should update size chart successfully", async () => {
      const mockResponse: UpdateSizeChartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await globalProductManager.updateSizeChart({
        size_chart_id: "chart123",
        size_chart_name: "Updated Size Chart",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/global_product/update_size_chart", {
        method: "POST",
        auth: true,
        body: {
          size_chart_id: "chart123",
          size_chart_name: "Updated Size Chart",
        },
      });

      expect(result.error).toBe("");
    });
  });
});
