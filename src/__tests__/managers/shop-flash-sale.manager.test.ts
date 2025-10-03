import { jest } from "@jest/globals";
import { ShopFlashSaleManager } from "../../managers/shop-flash-sale.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetTimeSlotIdResponse,
  CreateShopFlashSaleResponse,
  GetShopFlashSaleResponse,
  GetShopFlashSaleListResponse,
  UpdateShopFlashSaleResponse,
  DeleteShopFlashSaleResponse,
  AddShopFlashSaleItemsResponse,
  GetShopFlashSaleItemsResponse,
  UpdateShopFlashSaleItemsResponse,
  DeleteShopFlashSaleItemsResponse,
  GetItemCriteriaResponse,
  ShopFlashSaleStatus,
  ShopFlashSaleType,
  ShopFlashSaleItemStatus,
} from "../../schemas/shop-flash-sale.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ShopFlashSaleManager", () => {
  let shopFlashSaleManager: ShopFlashSaleManager;
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

    shopFlashSaleManager = new ShopFlashSaleManager(mockConfig);
  });

  describe("getTimeSlotId", () => {
    it("should get available time slot IDs", async () => {
      const mockResponse: GetTimeSlotIdResponse = {
        request_id: "714ef30d3afbbc83c14386b6e9644341",
        error: "",
        message: "",
        response: [
          {
            end_time: 1723654799,
            start_time: 1723651200,
            timeslot_id: 236767490043904,
          },
          {
            end_time: 1723741199,
            start_time: 1723737600,
            timeslot_id: 238023522603008,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.getTimeSlotId({
        start_time: 1721978628,
        end_time: 1727335428,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_time_slot_id",
        {
          method: "GET",
          auth: true,
          params: {
            start_time: 1721978628,
            end_time: 1727335428,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response).toHaveLength(2);
    });
  });

  describe("createShopFlashSale", () => {
    it("should create a new shop flash sale", async () => {
      const mockResponse: CreateShopFlashSaleResponse = {
        request_id: "c3bc89a8034304e76215d1493ff6c441",
        error: "",
        message: "",
        response: {
          flash_sale_id: 802078102721101,
          status: ShopFlashSaleStatus.ENABLED,
          timeslot_id: 236767490043904,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.createShopFlashSale({
        timeslot_id: 236767490043904,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/create_shop_flash_sale",
        {
          method: "POST",
          auth: true,
          body: {
            timeslot_id: 236767490043904,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.flash_sale_id).toBe(802078102721101);
    });
  });

  describe("getShopFlashSale", () => {
    it("should get shop flash sale details", async () => {
      const mockResponse: GetShopFlashSaleResponse = {
        request_id: "4f0c979980b49d02f352fdc81dace741",
        error: "",
        message: "",
        response: {
          enabled_item_count: 0,
          end_time: 1725040799,
          flash_sale_id: 802063533822541,
          item_count: 0,
          start_time: 1725033600,
          status: ShopFlashSaleStatus.SYSTEM_REJECTED,
          timeslot_id: 237859372232704,
          type: ShopFlashSaleType.UPCOMING,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.getShopFlashSale({
        flash_sale_id: 802063533822541,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale",
        {
          method: "GET",
          auth: true,
          params: {
            flash_sale_id: 802063533822541,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.flash_sale_id).toBe(802063533822541);
    });
  });

  describe("getShopFlashSaleList", () => {
    it("should get shop flash sale list", async () => {
      const mockResponse: GetShopFlashSaleListResponse = {
        request_id: "ea1b97881ec32a4917c31ef67e334841",
        error: "",
        message: "",
        response: {
          total_count: 107,
        },
        flash_sale_list: [
          {
            click_count: 0,
            enabled_item_count: 0,
            end_time: 1725040799,
            flash_sale_id: 802063533822541,
            item_count: 0,
            remindme_count: 0,
            start_time: 1725033600,
            status: ShopFlashSaleStatus.SYSTEM_REJECTED,
            timeslot_id: 237859372232704,
            type: ShopFlashSaleType.UPCOMING,
          },
          {
            click_count: 0,
            enabled_item_count: 0,
            end_time: 1725040799,
            flash_sale_id: 802063460422221,
            item_count: 0,
            remindme_count: 0,
            start_time: 1725033600,
            status: ShopFlashSaleStatus.ENABLED,
            timeslot_id: 237859372232704,
            type: ShopFlashSaleType.UPCOMING,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.getShopFlashSaleList({
        type: 1,
        offset: 0,
        limit: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale_list",
        {
          method: "GET",
          auth: true,
          params: {
            type: 1,
            offset: 0,
            limit: 10,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.total_count).toBe(107);
      expect(result.flash_sale_list).toHaveLength(2);
    });
  });

  describe("updateShopFlashSale", () => {
    it("should update shop flash sale status", async () => {
      const mockResponse: UpdateShopFlashSaleResponse = {
        request_id: "f9faf3080ea7ce95014f3aaab700e141",
        error: "",
        message: "",
        response: {
          flash_sale_id: 802053471670861,
          status: ShopFlashSaleStatus.DISABLED,
          timeslot_id: 236758518403072,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.updateShopFlashSale({
        flash_sale_id: 802053471670861,
        status: 2,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/update_shop_flash_sale",
        {
          method: "POST",
          auth: true,
          body: {
            flash_sale_id: 802053471670861,
            status: 2,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe(ShopFlashSaleStatus.DISABLED);
    });
  });

  describe("deleteShopFlashSale", () => {
    it("should delete shop flash sale", async () => {
      const mockResponse: DeleteShopFlashSaleResponse = {
        request_id: "60693a3da7b2c1ec1ffe4259af485941",
        error: "",
        message: "",
        response: {
          flash_sale_id: 802053515727437,
          status: ShopFlashSaleStatus.DELETED,
          timeslot_id: 236758518403072,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.deleteShopFlashSale({
        flash_sale_id: 802053515727437,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/delete_shop_flash_sale",
        {
          method: "POST",
          auth: true,
          body: {
            flash_sale_id: 802053515727437,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe(ShopFlashSaleStatus.DELETED);
    });
  });

  describe("addShopFlashSaleItems", () => {
    it("should add items to shop flash sale", async () => {
      const mockResponse: AddShopFlashSaleItemsResponse = {
        request_id: "ac629787de7ed827a9f81f736ee15641",
        error: "",
        message: "",
        response: {
          failed_items: [
            {
              err_code: 1400101726,
              err_msg: "This item cannot be added as there is insufficient stock.",
              item_id: 3744623870,
              model_id: 5414485720,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.addShopFlashSaleItems({
        flash_sale_id: 802063533822541,
        items: [
          {
            item_id: 3744623870,
            purchase_limit: 5,
            models: [
              {
                model_id: 5414485720,
                input_promo_price: 69.3,
                stock: 100,
              },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/add_shop_flash_sale_items",
        {
          method: "POST",
          auth: true,
          body: {
            flash_sale_id: 802063533822541,
            items: [
              {
                item_id: 3744623870,
                purchase_limit: 5,
                models: [
                  {
                    model_id: 5414485720,
                    input_promo_price: 69.3,
                    stock: 100,
                  },
                ],
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_items).toHaveLength(1);
    });
  });

  describe("getShopFlashSaleItems", () => {
    it("should get shop flash sale items", async () => {
      const mockResponse: GetShopFlashSaleItemsResponse = {
        request_id: "688cd3b6725f12caadbe1e8e804c5041",
        error: "",
        message: "",
        response: {
          item_info: [
            {
              image: "08b3fc410c8eaa7e3f52b06b486a8658",
              item_id: 3744623870,
              item_name: "platform sale product - 1723605523",
              status: 1,
            },
          ],
          models: [
            {
              campaign_stock: 2,
              input_promotion_price: 69.3,
              item_id: 3744623870,
              model_id: 5414485721,
              model_name: "Yellow",
              original_price: 77,
              promotion_price_with_tax: 75.54,
              purchase_limit: 0,
              reject_reason: "",
              status: ShopFlashSaleItemStatus.ENABLED,
              stock: 909,
            },
          ],
          total_count: 2,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.getShopFlashSaleItems({
        flash_sale_id: 802063533822541,
        offset: 0,
        limit: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_shop_flash_sale_items",
        {
          method: "GET",
          auth: true,
          params: {
            flash_sale_id: 802063533822541,
            offset: 0,
            limit: 50,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.total_count).toBe(2);
      expect(result.response.models).toHaveLength(1);
    });
  });

  describe("updateShopFlashSaleItems", () => {
    it("should update shop flash sale items", async () => {
      const mockResponse: UpdateShopFlashSaleItemsResponse = {
        request_id: "00f747c0ed91a2504a4e4d96e70ecf41",
        error: "",
        message: "",
        response: {
          failed_items: [
            {
              err_code: 1400101718,
              err_msg:
                "This item cannot be added as it does not meet the criteria required. Please check the Product Criteria.",
              item_id: 3744624265,
              model_id: 438069051,
              unqualified_conditions: [
                {
                  unqualified_code: 10009,
                  unqualified_msg: "Not meet the Promotion Price criteria",
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.updateShopFlashSaleItems({
        flash_sale_id: 802063533822541,
        items: [
          {
            item_id: 3744624265,
            purchase_limit: 10,
            models: [
              {
                model_id: 438069051,
                status: 1,
                input_promo_price: 1802.7,
                stock: 1234,
              },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/update_shop_flash_sale_items",
        {
          method: "POST",
          auth: true,
          body: {
            flash_sale_id: 802063533822541,
            items: [
              {
                item_id: 3744624265,
                purchase_limit: 10,
                models: [
                  {
                    model_id: 438069051,
                    status: 1,
                    input_promo_price: 1802.7,
                    stock: 1234,
                  },
                ],
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_items).toHaveLength(1);
    });
  });

  describe("deleteShopFlashSaleItems", () => {
    it("should delete items from shop flash sale", async () => {
      const mockResponse: DeleteShopFlashSaleItemsResponse = {
        request_id: "7a4a04778a8a10b5a5a2111c6cc32541",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.deleteShopFlashSaleItems({
        flash_sale_id: 802063533822541,
        item_ids: [3744623870, 3744624265],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/delete_shop_flash_sale_items",
        {
          method: "POST",
          auth: true,
          body: {
            flash_sale_id: 802063533822541,
            item_ids: [3744623870, 3744624265],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemCriteria", () => {
    it("should get item criteria for shop flash sale", async () => {
      const mockResponse: GetItemCriteriaResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          criteria: [
            {
              criteria_id: 1,
              min_product_rating: 4.5,
              min_likes: 100,
              must_not_pre_order: true,
              min_order_total: 50,
              max_days_to_ship: 7,
              min_repetition_day: 30,
              min_promo_stock: 1,
              max_promo_stock: 1000,
              min_discount: 10,
              max_discount: 90,
              min_discount_price: 1000000,
              max_discount_price: 100000000,
              need_lowest_price: true,
            },
          ],
          pair_ids: [
            {
              criteria_id: 1,
              category_list: [
                {
                  category_id: 0,
                  name: "All Categories",
                  parent_id: 0,
                },
              ],
            },
          ],
          overlap_block_category_ids: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopFlashSaleManager.getItemCriteria({});

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_flash_sale/get_item_criteria",
        {
          method: "GET",
          auth: true,
          params: {},
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.criteria).toHaveLength(1);
      expect(result.response.pair_ids).toHaveLength(1);
    });
  });
});
