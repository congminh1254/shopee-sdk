import { jest } from "@jest/globals";
import { ProductManager } from "../../managers/product.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetCommentResponse,
  ReplyCommentResponse,
  GetItemListResponse,
  GetItemBaseInfoResponse,
  GetModelListResponse,
  UpdatePriceResponse,
  UpdateStockResponse,
  DeleteItemResponse,
  UnlistItemResponse,
  GetProductCategoryResponse,
  AddItemResponse,
  UpdateItemResponse,
  AddModelResponse,
  UpdateModelResponse,
  DeleteModelResponse,
  InitTierVariationResponse,
  UpdateTierVariationResponse,
  SearchItemResponse,
  GetItemExtraInfoResponse,
  GetAttributeTreeResponse,
  GetBrandListResponse,
  RegisterBrandResponse,
  CategoryRecommendResponse,
  GetItemLimitResponse,
  GetItemPromotionResponse,
  BoostItemResponse,
  GetBoostedListResponse,
  GetVariationsResponse,
  GetRecommendAttributeResponse,
  SearchAttributeValueListResponse,
} from "../../schemas/product.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ProductManager", () => {
  let productManager: ProductManager;
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

    productManager = new ProductManager(mockConfig);
  });

  describe("getComment", () => {
    it("should get product comments with required parameters", async () => {
      const mockResponse: GetCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_comment_list: [
            {
              order_sn: "ORDER123",
              comment_id: 123,
              comment: "Great product!",
              buyer_username: "user123",
              item_id: 789,
              model_id: 0,
              model_id_list: [1001],
              rating_star: 5,
              editable: "EDITABLE",
              hidden: false,
              create_time: 1234567890,
              media: {
                image_url_list: [],
                video_url_list: [],
              },
            },
          ],
          more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getComment({
        item_id: 789,
        comment_id: 123,
        cursor: "",
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_comment", {
        method: "GET",
        auth: true,
        params: {
          item_id: 789,
          comment_id: 123,
          cursor: "",
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get comments with minimal required parameters", async () => {
      const mockResponse: GetCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_comment_list: [],
          more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getComment({
        cursor: "",
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_comment", {
        method: "GET",
        auth: true,
        params: {
          cursor: "",
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("replyComment", () => {
    it("should reply to a product comment", async () => {
      const mockResponse: ReplyCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          comment_id: 123,
          reply: "Thank you for your feedback!",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.replyComment({
        comment_id: 123,
        reply: "Thank you for your feedback!",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/reply_comment", {
        method: "POST",
        auth: true,
        body: {
          comment_id: 123,
          reply: "Thank you for your feedback!",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemList", () => {
    it("should get item list with pagination", async () => {
      const mockResponse: GetItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item: [
            {
              item_id: 123456,
              item_status: "NORMAL",
              update_time: 1234567890,
            },
            {
              item_id: 789012,
              item_status: "BANNED",
              update_time: 1234567891,
            },
          ],
          total_count: 2,
          has_next_page: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemList({
        offset: 0,
        page_size: 50,
        update_time_from: 1234567800,
        update_time_to: 1234567900,
        item_status: "NORMAL",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_item_list", {
        method: "GET",
        auth: true,
        params: {
          offset: 0,
          page_size: 50,
          update_time_from: 1234567800,
          update_time_to: 1234567900,
          item_status: "NORMAL",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get item list with minimal parameters", async () => {
      const mockResponse: GetItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item: [],
          total_count: 0,
          has_next_page: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemList({
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_item_list", {
        method: "GET",
        auth: true,
        params: {
          offset: 0,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemBaseInfo", () => {
    it("should get item base info for multiple items", async () => {
      const mockResponse: GetItemBaseInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              item_id: 123456,
              category_id: 100001,
              item_name: "Test Product 1",
              item_sku: "SKU-001",
              create_time: 1234567890,
              update_time: 1234567891,
              item_status: "NORMAL",
              has_model: false,
              condition: "NEW",
              size_chart: "",
              item_dangerous: 0,
            },
            {
              item_id: 789012,
              category_id: 100002,
              item_name: "Test Product 2",
              item_sku: "SKU-002",
              create_time: 1234567892,
              update_time: 1234567893,
              item_status: "NORMAL",
              has_model: true,
              condition: "USED",
              size_chart: "size_chart_url",
              item_dangerous: 0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemBaseInfo({
        item_id_list: [123456, 789012],
        need_tax_info: false,
        need_complaint_policy: true,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_item_base_info", {
        method: "GET",
        auth: true,
        params: {
          item_id_list: "123456,789012",
          need_tax_info: false,
          need_complaint_policy: true,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get item base info for single item", async () => {
      const mockResponse: GetItemBaseInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              item_id: 123456,
              category_id: 100001,
              item_name: "Single Product",
              item_sku: "SKU-SINGLE",
              create_time: 1234567890,
              update_time: 1234567891,
              item_status: "NORMAL",
              has_model: false,
              condition: "NEW",
              size_chart: "",
              item_dangerous: 0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemBaseInfo({
        item_id_list: [123456],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_item_base_info", {
        method: "GET",
        auth: true,
        params: {
          item_id_list: "123456",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getModelList", () => {
    it("should get model list for an item", async () => {
      const mockResponse: GetModelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tier_variation: [
            {
              name: "Color",
              option_list: [
                { option: "Red", image: { image_id: "img1" } },
                { option: "Blue", image: { image_id: "img2" } },
              ],
            },
            {
              name: "Size",
              option_list: [{ option: "S" }, { option: "M" }, { option: "L" }],
            },
          ],
          model: [
            {
              model_id: 1001,
              tier_index: [0, 0],
              normal_stock: 100,
              reserved_stock: 5,
              price: 29.99,
              model_sku: "SKU-RED-S",
              gtin_code: "123456789012",
            },
            {
              model_id: 1002,
              tier_index: [0, 1],
              normal_stock: 150,
              reserved_stock: 10,
              price: 29.99,
              model_sku: "SKU-RED-M",
              gtin_code: "123456789013",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getModelList({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_model_list", {
        method: "GET",
        auth: true,
        params: {
          item_id: 123456,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updatePrice", () => {
    it("should update product price successfully", async () => {
      const mockResponse: UpdatePriceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              model_id: 0,
              original_price: 99.99,
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updatePrice({
        item_id: 123456,
        price_list: [
          {
            model_id: 0,
            original_price: 99.99,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/update_price", {
        method: "POST",
        auth: true,
        body: {
          item_id: 123456,
          price_list: [
            {
              model_id: 0,
              original_price: 99.99,
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should update multiple model prices", async () => {
      const mockResponse: UpdatePriceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              model_id: 1001,
              original_price: 49.99,
            },
            {
              model_id: 1002,
              original_price: 59.99,
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updatePrice({
        item_id: 123456,
        price_list: [
          {
            model_id: 1001,
            original_price: 49.99,
          },
          {
            model_id: 1002,
            original_price: 59.99,
          },
        ],
      });

      expect(result.response.success_list).toHaveLength(2);
      expect(result).toEqual(mockResponse);
    });

    it("should handle price update failures", async () => {
      const mockResponse: UpdatePriceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [],
          failure_list: [
            {
              model_id: 1001,
              failed_reason: "Price too low",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updatePrice({
        item_id: 123456,
        price_list: [
          {
            model_id: 1001,
            original_price: 0.01,
          },
        ],
      });

      expect(result.response.failure_list).toHaveLength(1);
      expect(result.response.failure_list?.[0].failed_reason).toBe("Price too low");
    });
  });

  describe("updateStock", () => {
    it("should update product stock successfully", async () => {
      const mockResponse: UpdateStockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              model_id: 0,
              seller_stock: [
                {
                  stock: 100,
                },
              ],
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateStock({
        item_id: 123456,
        stock_list: [
          {
            model_id: 0,
            seller_stock: [
              {
                stock: 100,
              },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/update_stock", {
        method: "POST",
        auth: true,
        body: {
          item_id: 123456,
          stock_list: [
            {
              model_id: 0,
              seller_stock: [
                {
                  stock: 100,
                },
              ],
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should update stock with location_id", async () => {
      const mockResponse: UpdateStockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              model_id: 1001,
              seller_stock: [
                {
                  location_id: "LOC-001",
                  stock: 50,
                },
              ],
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateStock({
        item_id: 123456,
        stock_list: [
          {
            model_id: 1001,
            seller_stock: [
              {
                location_id: "LOC-001",
                stock: 50,
              },
            ],
          },
        ],
      });

      expect(result.response.success_list?.[0].seller_stock[0].location_id).toBe("LOC-001");
    });

    it("should handle stock update failures", async () => {
      const mockResponse: UpdateStockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [],
          failure_list: [
            {
              model_id: 1001,
              failed_reason: "Insufficient stock",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateStock({
        item_id: 123456,
        stock_list: [
          {
            model_id: 1001,
            seller_stock: [
              {
                stock: -10,
              },
            ],
          },
        ],
      });

      expect(result.response.failure_list).toHaveLength(1);
    });
  });

  describe("deleteItem", () => {
    it("should delete a product item successfully", async () => {
      const mockResponse: DeleteItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        warning: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.deleteItem({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/delete_item", {
        method: "POST",
        auth: true,
        body: {
          item_id: 123456,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.error).toBe("");
    });

    it("should handle delete item error", async () => {
      const mockResponse: DeleteItemResponse = {
        request_id: "test-request-id",
        error: "error_item_not_found",
        message: "Item_id is not found.",
        warning: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.deleteItem({
        item_id: 999999,
      });

      expect(result.error).toBe("error_item_not_found");
      expect(result.message).toBe("Item_id is not found.");
    });
  });

  describe("unlistItem", () => {
    it("should unlist items successfully", async () => {
      const mockResponse: UnlistItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result: [
            {
              item_id: 123456,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.unlistItem({
        item_list: [
          {
            item_id: 123456,
            unlist: true,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/unlist_item", {
        method: "POST",
        auth: true,
        body: {
          item_list: [
            {
              item_id: 123456,
              unlist: true,
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.result?.[0].success).toBe(true);
    });

    it("should list items (unlist=false)", async () => {
      const mockResponse: UnlistItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result: [
            {
              item_id: 123456,
              success: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.unlistItem({
        item_list: [
          {
            item_id: 123456,
            unlist: false,
          },
        ],
      });

      expect(result.response.result?.[0].success).toBe(true);
    });

    it("should handle multiple items with mixed results", async () => {
      const mockResponse: UnlistItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result: [
            {
              item_id: 123456,
              success: true,
            },
            {
              item_id: 789012,
              success: false,
              failed_reason: "Item not found",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.unlistItem({
        item_list: [
          {
            item_id: 123456,
            unlist: true,
          },
          {
            item_id: 789012,
            unlist: true,
          },
        ],
      });

      expect(result.response.result).toHaveLength(2);
      expect(result.response.result?.[0].success).toBe(true);
      expect(result.response.result?.[1].success).toBe(false);
    });
  });

  describe("getCategory", () => {
    it("should get category list with default language", async () => {
      const mockResponse: GetProductCategoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_list: [
            {
              category_id: 100001,
              parent_category_id: 0,
              category_name: "Electronics",
              has_children: true,
            },
            {
              category_id: 100002,
              parent_category_id: 100001,
              category_name: "Mobile Phones",
              has_children: false,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getCategory();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_category", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.category_list).toHaveLength(2);
    });

    it("should get category list with specific language", async () => {
      const mockResponse: GetProductCategoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_list: [
            {
              category_id: 100001,
              parent_category_id: 0,
              category_name: "电子产品",
              has_children: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getCategory({
        language: "zh-hans",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_category", {
        method: "GET",
        auth: true,
        params: {
          language: "zh-hans",
        },
      });

      expect(result.response.category_list[0].category_name).toBe("电子产品");
    });

    it("should handle empty category list", async () => {
      const mockResponse: GetProductCategoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getCategory();

      expect(result.response.category_list).toEqual([]);
    });
  });

  describe("addItem", () => {
    it("should add a new item successfully", async () => {
      const mockResponse: AddItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          warning: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.addItem({
        original_price: 99.99,
        description: "Test product description",
        item_name: "Test Product",
        category_id: 100001,
        image: {
          image_id_list: ["img123"],
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/add_item",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            original_price: 99.99,
            description: "Test product description",
            item_name: "Test Product",
            category_id: 100001,
          }),
        }
      );

      expect(result.response.item_id).toBe(123456);
    });
  });

  describe("updateItem", () => {
    it("should update an item successfully", async () => {
      const mockResponse: UpdateItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          warning: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateItem({
        item_id: 123456,
        item_name: "Updated Product Name",
        original_price: 149.99,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_item",
        {
          method: "POST",
          auth: true,
          body: {
            item_id: 123456,
            item_name: "Updated Product Name",
            original_price: 149.99,
          },
        }
      );

      expect(result.response.item_id).toBe(123456);
    });
  });

  describe("addModel", () => {
    it("should add models to an item", async () => {
      const mockResponse: AddModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_id_list: [1001, 1002],
          warning: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.addModel({
        item_id: 123456,
        model_list: [
          {
            tier_index: [0, 0],
            original_price: 99.99,
            normal_stock: 100,
          },
          {
            tier_index: [0, 1],
            original_price: 109.99,
            normal_stock: 50,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/add_model",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            item_id: 123456,
          }),
        }
      );

      expect(result.response.model_id_list).toHaveLength(2);
    });
  });

  describe("updateModel", () => {
    it("should update models successfully", async () => {
      const mockResponse: UpdateModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_id_list: [1001],
          warning: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateModel({
        item_id: 123456,
        model_list: [
          {
            model_id: 1001,
            original_price: 119.99,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_model",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            item_id: 123456,
          }),
        }
      );

      expect(result.response.model_id_list).toContain(1001);
    });
  });

  describe("deleteModel", () => {
    it("should delete models successfully", async () => {
      const mockResponse: DeleteModelResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.deleteModel({
        item_id: 123456,
        model_id_list: [1001, 1002],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/delete_model",
        {
          method: "POST",
          auth: true,
          body: {
            item_id: 123456,
            model_id_list: [1001, 1002],
          },
        }
      );

      expect(result.response.success).toBe(true);
    });
  });

  describe("initTierVariation", () => {
    it("should initialize tier variations", async () => {
      const mockResponse: InitTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          model_id_list: [2001, 2002],
          warning: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.initTierVariation({
        item_id: 123456,
        tier_variation: [
          {
            name: "Color",
            option_list: [{ option: "Red" }, { option: "Blue" }],
          },
        ],
        model: [
          {
            tier_index: [0],
            original_price: 99.99,
            normal_stock: 50,
          },
          {
            tier_index: [1],
            original_price: 99.99,
            normal_stock: 50,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/init_tier_variation",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            item_id: 123456,
          }),
        }
      );

      expect(result.response.model_id_list).toHaveLength(2);
    });
  });

  describe("updateTierVariation", () => {
    it("should update tier variations", async () => {
      const mockResponse: UpdateTierVariationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        warning: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.updateTierVariation({
        item_id: 123456,
        tier_variation: [
          {
            name: "Size",
            option_list: [{ option: "S" }, { option: "M" }, { option: "L" }],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_tier_variation",
        {
          method: "POST",
          auth: true,
          body: expect.objectContaining({
            item_id: 123456,
          }),
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("searchItem", () => {
    it("should search items successfully", async () => {
      const mockResponse: SearchItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item: [
            {
              item_id: 123456,
              item_status: "NORMAL",
              update_time: 1234567890,
            },
          ],
          total_count: 1,
          has_next_page: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.searchItem({
        item_name: "Test Product",
        offset: 0,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/search_item",
        {
          method: "GET",
          auth: true,
          params: {
            item_name: "Test Product",
            offset: 0,
            page_size: 20,
          },
        }
      );

      expect(result.response.item).toHaveLength(1);
    });
  });

  describe("getItemExtraInfo", () => {
    it("should get item extra info successfully", async () => {
      const mockResponse: GetItemExtraInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              item_id: 123456,
              sale_info: {
                sale: 100,
                sale_7d: 50,
                sale_30d: 200,
              },
              view: 1000,
              liked_count: 50,
              cmt_count: 20,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemExtraInfo({
        item_id_list: [123456, 789012],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_extra_info",
        {
          method: "GET",
          auth: true,
          params: {
            item_id_list: "123456,789012",
          },
        }
      );

      expect(result.response.item_list[0].sale_info.sale).toBe(100);
    });
  });

  describe("getAttributeTree", () => {
    it("should get attribute tree for a category", async () => {
      const mockResponse: GetAttributeTreeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          attribute_list: [
            {
              attribute_id: 1001,
              original_attribute_name: "Brand",
              is_mandatory: true,
              input_type: "DROP_DOWN",
              attribute_value_list: [
                {
                  value_id: 2001,
                  original_value_name: "Nike",
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getAttributeTree({
        category_id: 100001,
        language: "en",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_attribute_tree",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
            language: "en",
          },
        }
      );

      expect(result.response.attribute_list).toHaveLength(1);
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
              brand_id: 1,
              original_brand_name: "Nike",
              display_brand_name: "Nike",
            },
            {
              brand_id: 2,
              original_brand_name: "Adidas",
              display_brand_name: "Adidas",
            },
          ],
          has_next_page: false,
          next_offset: 0,
          is_mandatory: true,
          input_type: "DROP_DOWN",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getBrandList({
        category_id: 100001,
        offset: 0,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_brand_list",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
            offset: 0,
            page_size: 20,
          },
        }
      );

      expect(result.response.brand_list).toHaveLength(2);
    });
  });

  describe("registerBrand", () => {
    it("should register a new brand", async () => {
      const mockResponse: RegisterBrandResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          brand_id: 12345,
          original_brand_name: "NewBrand",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.registerBrand({
        category_id: 100001,
        original_brand_name: "NewBrand",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/register_brand",
        {
          method: "POST",
          auth: true,
          body: {
            category_id: 100001,
            original_brand_name: "NewBrand",
          },
        }
      );

      expect(result.response.brand_id).toBe(12345);
    });
  });

  describe("categoryRecommend", () => {
    it("should get category recommendations", async () => {
      const mockResponse: CategoryRecommendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          category_id_list: [100001, 100002, 100003],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.categoryRecommend({
        item_name: "Running Shoes",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/category_recommend",
        {
          method: "POST",
          auth: true,
          body: {
            item_name: "Running Shoes",
          },
        }
      );

      expect(result.response.category_id_list).toHaveLength(3);
    });
  });

  describe("getItemLimit", () => {
    it("should get item limits for a category", async () => {
      const mockResponse: GetItemLimitResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_limit: {
            max_image_count: 9,
            max_video_count: 1,
            max_product_title_length: 120,
            max_description_length: 3000,
            max_extended_description_length: 25000,
            is_video_required: false,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemLimit({
        category_id: 100001,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_limit",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
          },
        }
      );

      expect(result.response.item_limit.max_image_count).toBe(9);
    });
  });

  describe("getItemPromotion", () => {
    it("should get item promotion information", async () => {
      const mockResponse: GetItemPromotionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_promotion_list: [
            {
              item_id: 123456,
              promotion_list: [
                {
                  promotion_id: 9001,
                  promotion_type: 1,
                  start_time: 1609459200,
                  end_time: 1612137600,
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getItemPromotion({
        item_id_list: [123456],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_promotion",
        {
          method: "GET",
          auth: true,
          params: {
            item_id_list: "123456",
          },
        }
      );

      expect(result.response.item_promotion_list[0].promotion_list).toHaveLength(1);
    });
  });

  describe("boostItem", () => {
    it("should boost items successfully", async () => {
      const mockResponse: BoostItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          failed_item_id_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.boostItem({
        item_id_list: [123456, 789012],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/boost_item",
        {
          method: "POST",
          auth: true,
          body: {
            item_id_list: [123456, 789012],
          },
        }
      );

      expect(result.response.failed_item_id_list).toEqual([]);
    });
  });

  describe("getBoostedList", () => {
    it("should get list of boosted items", async () => {
      const mockResponse: GetBoostedListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              item_id: 123456,
              boost_end_time: 1640995200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getBoostedList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_boosted_list",
        {
          method: "GET",
          auth: true,
          params: {},
        }
      );

      expect(result.response.item_list).toHaveLength(1);
    });
  });

  describe("getVariations", () => {
    it("should get variations for an item", async () => {
      const mockResponse: GetVariationsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tier_variation: [
            {
              name: "Color",
              option_list: [
                { option: "Red" },
                { option: "Blue" },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getVariations({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_variations",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
          },
        }
      );

      expect(result.response.tier_variation).toHaveLength(1);
    });
  });

  describe("getRecommendAttribute", () => {
    it("should get recommended attributes", async () => {
      const mockResponse: GetRecommendAttributeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          recommended_attribute_list: [
            {
              attribute_id: 1001,
              recommended_value_list: [
                {
                  value_id: 2001,
                  original_value_name: "Cotton",
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getRecommendAttribute({
        category_id: 100001,
        item_name: "T-Shirt",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_recommend_attribute",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
            item_name: "T-Shirt",
          },
        }
      );

      expect(result.response.recommended_attribute_list).toHaveLength(1);
    });
  });

  describe("searchAttributeValueList", () => {
    it("should search attribute values", async () => {
      const mockResponse: SearchAttributeValueListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          attribute_value_list: [
            {
              value_id: 2001,
              original_value_name: "Cotton",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.searchAttributeValueList({
        category_id: 100001,
        attribute_id: 1001,
        search_value: "Cotton",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/search_attribute_value_list",
        {
          method: "GET",
          auth: true,
          params: {
            category_id: 100001,
            attribute_id: 1001,
            search_value: "Cotton",
          },
        }
      );

      expect(result.response.attribute_value_list).toHaveLength(1);
    });
  });
});
