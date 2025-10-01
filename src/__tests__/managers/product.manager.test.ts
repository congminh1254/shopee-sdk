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
          comment_list: [
            {
              comment_id: 123,
              comment: "Great product!",
              author_username: "user123",
              create_time: 1234567890,
              rating_star: 5,
              item_rating_id: 456,
            },
          ],
          has_more: false,
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

    it("should get comments with minimal parameters", async () => {
      const mockResponse: GetCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          comment_list: [],
          has_more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await productManager.getComment({ item_id: 789 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/product/get_comment", {
        method: "GET",
        auth: true,
        params: { item_id: 789 },
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
});
