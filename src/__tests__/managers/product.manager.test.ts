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
});
