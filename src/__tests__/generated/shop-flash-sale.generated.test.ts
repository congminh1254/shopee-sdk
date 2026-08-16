import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopFlashSaleManager } from "../../managers/shop-flash-sale.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("ShopFlashSaleManager (Generated Tests)", () => {
  let manager: ShopFlashSaleManager;
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
    manager = new ShopFlashSaleManager(mockConfig);
  });

  describe("addShopFlashSaleItems", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
        items: [
          {
            item_id: 123,
            purchase_limit: 123,
            models: [
              {
                model_id: 123,
                input_promo_price: 123,
                stock: 123,
              },
            ],
            item_input_promo_price: 123,
            item_stock: 123,
          },
        ],
      };
      const exampleResponse = {
        failed_items: [
          {
            item_id: 123,
            model_id: 123,
            err_code: 123,
            err_msg: "test_string",
            unqualified_conditions: [
              {
                unqualified_code: 123,
                unqualified_msg: "test_string",
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

      const result = await manager.addShopFlashSaleItems(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/add_shop_flash_sale_items",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createShopFlashSale", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        timeslot_id: 123,
      };
      const exampleResponse = {
        timeslot_id: 123,
        flash_sale_id: 123,
        status: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createShopFlashSale(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/create_shop_flash_sale",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteShopFlashSale", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
      };
      const exampleResponse = {
        timeslot_id: 123,
        flash_sale_id: 123,
        status: 0,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteShopFlashSale(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/delete_shop_flash_sale",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteShopFlashSaleItems", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
        item_ids: [123],
      };
      const exampleResponse = {
        failed_items: [
          {
            item_id: 123,
            model_id: 123,
            err_code: 123,
            err_msg: "test_string",
            unqualified_conditions: [
              {
                unqualified_code: 123,
                unqualified_msg: "test_string",
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

      const result = await manager.deleteShopFlashSaleItems(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/delete_shop_flash_sale_items",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemCriteria", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        criteria: [
          {
            criteria_id: 123,
            min_product_rating: 123,
            min_likes: 123,
            must_not_pre_order: true,
            min_order_total: 123,
            max_days_to_ship: 123,
            min_repetition_day: 123,
            min_promo_stock: 1,
            max_promo_stock: 10,
            min_discount: 10,
            max_discount: 100,
            min_discount_price: 10000000,
            max_discount_price: 100000000,
            need_lowest_price: true,
          },
        ],
        pair_ids: [
          {
            criteria_id: 123,
            category_list: [
              {
                category_id: 123,
                name: "test_string",
                parent_id: 123,
              },
            ],
          },
        ],
        overlap_block_category_ids: [123],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemCriteria(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_item_criteria",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopFlashSale", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
      };
      const exampleResponse = {
        timeslot_id: 123,
        flash_sale_id: 123,
        status: 1,
        start_time: "1721978628",
        end_time: "1727335428",
        enabled_item_count: 10,
        item_count: 20,
        type: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopFlashSale(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopFlashSaleItems", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
        offset: 123,
        limit: 123,
      };
      const exampleResponse = {
        total_count: 123,
        models: [
          {
            item_id: 123,
            model_id: 123,
            model_name: "test_string",
            status: 123,
            original_price: 123,
            input_promotion_price: 123,
            promotion_price_with_tax: 123,
            purchase_limit: 123,
            campaign_stock: 123,
            stock: 123,
            reject_reason: "test_string",
            unqualified_conditions: {
              unqualified_code: 123,
              unqualified_msg: "test_string",
            },
          },
        ],
        item_info: [
          {
            item_id: 123,
            item_name: "test_string",
            status: 123,
            image: "test_string",
            item_status: 123,
            original_price: 123,
            input_promotion_price: 123,
            promotion_price_with_tax: 123,
            purchase_limit: 123,
            campaign_stock: 123,
            stock: 123,
            reject_reason: "test_string",
            unqualified_conditions: {
              unqualified_code: 123,
              unqualified_msg: "test_string",
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopFlashSaleItems(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale_items",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopFlashSaleList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        type: 1,
        start_time: "1721978628",
        end_time: "1727335428",
        offset: 0,
        limit: 10,
      };
      const exampleResponse = {
        total_count: 10,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopFlashSaleList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTimeSlotId", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_time: "1721978628",
        end_time: "1727335428",
      };
      const exampleResponse = [
        {
          timeslot_id: 123,
          start_time: "1721978628",
          end_time: "1727335428",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTimeSlotId(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_time_slot_id",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateShopFlashSale", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
        status: 1,
      };
      const exampleResponse = {
        timeslot_id: 123,
        flash_sale_id: 123,
        status: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateShopFlashSale(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/update_shop_flash_sale",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateShopFlashSaleItems", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        flash_sale_id: 123,
        items: [
          {
            item_id: 123,
            purchase_limit: 123,
            models: [
              {
                model_id: 123,
                status: 123,
                input_promo_price: 123,
                stock: 123,
              },
            ],
            item_status: 123,
            item_input_promo_price: 123,
            item_stock: 123,
          },
        ],
      };
      const exampleResponse = {
        failed_items: [
          {
            item_id: 123,
            model_id: 123,
            err_code: 123,
            err_msg: "test_string",
            unqualified_conditions: [
              {
                unqualified_code: 123,
                unqualified_msg: "test_string",
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

      const result = await manager.updateShopFlashSaleItems(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/update_shop_flash_sale_items",
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
