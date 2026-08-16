import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopCategoryManager } from "../../managers/shop-category.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("ShopCategoryManager (Generated Tests)", () => {
  let manager: ShopCategoryManager;
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
    manager = new ShopCategoryManager(mockConfig);
  });

  describe("addItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_category_id: 29333,
        item_list: [100908152, 100908153, 100908154, 100908155],
      };
      const exampleResponse = {
        invalid_item_id_list: [
          {
            item_id: 100908152,
            fail_error: "error_param",
            fail_message: "Syntax error. Please check the format of your Request Parameter.",
          },
        ],
        shop_category_id: 7075387,
        current_count: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/add_item_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addShopCategory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        name: "OA_V2_1",
        sort_weight: 21,
      };
      const exampleResponse = {
        shop_category_id: 29333,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addShopCategory(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/add_shop_category",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_category_id: 29333,
        item_list: [100908152, 100908153],
      };
      const exampleResponse = {
        shop_category_id: 29333,
        invalid_item_id: [123],
        current_count: 0,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/delete_item_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteShopCategory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_category_id: 9209570,
      };
      const exampleResponse = {
        shop_category_id: 9209570,
        msg: "Delete shop category success",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteShopCategory(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/delete_shop_category",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_category_id: 231232,
        page_size: 20,
        page_no: 4,
      };
      const exampleResponse = {
        item_list: [100908154, 100908155],
        total_count: 2,
        more: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/get_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopCategoryList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 100,
        page_no: 1,
      };
      const exampleResponse = {
        shop_categorys: [
          {
            shop_category_id: 6980782,
            status: 1,
            name: "Dream_test",
            sort_weight: 33,
          },
        ],
        total_count: 45,
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopCategoryList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/get_shop_category_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateShopCategory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_category_id: 29333,
        name: "OA_V2_11",
        sort_weight: 21,
        status: "NORMAL",
      };
      const exampleResponse = {
        shop_category_id: 29333,
        name: "OA_V2_11",
        sort_weight: 21,
        status: "NORMAL",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateShopCategory(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/update_shop_category",
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
