import { jest } from "@jest/globals";
import { DiscountManager } from "../../managers/discount.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddDiscountResponse,
  AddDiscountItemResponse,
  DeleteDiscountResponse,
  DeleteDiscountItemResponse,
  EndDiscountResponse,
  GetDiscountResponse,
  GetDiscountListResponse,
  UpdateDiscountResponse,
  UpdateDiscountItemResponse,
  DiscountStatus,
} from "../../schemas/discount.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("DiscountManager", () => {
  let discountManager: DiscountManager;
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

    discountManager = new DiscountManager(mockConfig);
  });

  describe("addDiscount", () => {
    it("should add a new discount", async () => {
      const mockResponse: AddDiscountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 665123666665499,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.addDiscount({
        discount_name: "test-create",
        start_time: 1624864213,
        end_time: 1625382613,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/add_discount",
        {
          method: "POST",
          auth: true,
          body: {
            discount_name: "test-create",
            start_time: 1624864213,
            end_time: 1625382613,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("addDiscountItem", () => {
    it("should add items to a discount", async () => {
      const mockResponse: AddDiscountItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 665123666665499,
          count: 2,
          error_list: [],
          warning: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.addDiscountItem({
        discount_id: 665123666665499,
        item_list: [
          {
            item_id: 800238393,
            purchase_limit: 2,
            model_list: [
              {
                model_id: 10004228693,
                model_promotion_price: 960,
              },
            ],
          },
          {
            item_id: 100862614,
            purchase_limit: 2,
            model_list: [
              {
                model_id: 10000153738,
                model_promotion_price: 460,
              },
            ],
          },
        ],
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle errors when adding items", async () => {
      const mockResponse: AddDiscountItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 665123666665499,
          count: 1,
          error_list: [
            {
              item_id: 800238393,
              model_id: 10004228693,
              fail_message: "Item not found",
              fail_error: "discount.item_not_found",
            },
          ],
          warning: "Some items failed to add",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.addDiscountItem({
        discount_id: 665123666665499,
        item_list: [
          {
            item_id: 800238393,
            purchase_limit: 2,
            model_list: [
              {
                model_id: 10004228693,
                model_promotion_price: 960,
              },
            ],
          },
        ],
      });

      expect(result.response.error_list).toHaveLength(1);
      expect(result.response.count).toBe(1);
    });
  });

  describe("deleteDiscount", () => {
    it("should delete a discount", async () => {
      const mockResponse: DeleteDiscountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 665123666665499,
          modify_time: 1610434295,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.deleteDiscount({
        discount_id: 665123666665499,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/delete_discount",
        {
          method: "POST",
          auth: true,
          body: {
            discount_id: 665123666665499,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteDiscountItem", () => {
    it("should delete an item from a discount", async () => {
      const mockResponse: DeleteDiscountItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 665123666665499,
          error_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.deleteDiscountItem({
        discount_id: 665123666665499,
        item_id: 100862614,
        model_id: 10000153738,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/delete_discount_item",
        {
          method: "POST",
          auth: true,
          body: {
            discount_id: 665123666665499,
            item_id: 100862614,
            model_id: 10000153738,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("endDiscount", () => {
    it("should end a discount", async () => {
      const mockResponse: EndDiscountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 66512366666549900,
          modify_time: 1656408546,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.endDiscount({
        discount_id: 66512366666549900,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/end_discount",
        {
          method: "POST",
          auth: true,
          body: {
            discount_id: 66512366666549900,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getDiscount", () => {
    it("should get discount details", async () => {
      const mockResponse: GetDiscountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "ongoing",
          discount_name: "test-upload-keep",
          item_list: [
            {
              item_id: 2800140208,
              item_name: "hahahahahah",
              normal_stock: 10,
              item_promotion_stock: 12,
              item_original_price: 11.1,
              item_promotion_price: 1.92,
              item_inflated_price_of_original_price: 12.1,
              item_inflated_price_of_promotion_price: 12.0,
              item_local_price: 9.99,
              item_local_promotion_price: 1.72,
              model_list: [
                {
                  model_id: 1755762,
                  model_name: "hahahahah",
                  model_normal_stock: 2,
                  model_promotion_stock: 10,
                  model_original_price: 1.9,
                  model_promotion_price: 1.86,
                  model_inflated_price_of_original_price: 2.2,
                  model_inflated_price_of_promotion_price: 2.1,
                  model_local_price: 1.71,
                  model_local_promotion_price: 1.67,
                },
              ],
              purchase_limit: 1,
            },
          ],
          start_time: 1604408400,
          discount_id: 1000029882,
          end_time: 1605276000,
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.getDiscount({
        discount_id: 1000029882,
        page_no: 1,
        page_size: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/get_discount",
        {
          method: "GET",
          auth: true,
          params: {
            discount_id: 1000029882,
            page_no: 1,
            page_size: 50,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(1);
      expect(result.response.item_list[0].model_list).toHaveLength(1);
    });
  });

  describe("getDiscountList", () => {
    it("should get a list of discounts", async () => {
      const mockResponse: GetDiscountListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_list: [
            {
              status: "ongoing",
              discount_name: "testqwert001",
              start_time: 1644910200,
              discount_id: 1000021581,
              source: 0,
              end_time: 1645864200,
            },
            {
              status: "ongoing",
              discount_name: "testqwerty002",
              start_time: 1644910200,
              discount_id: 1000021582,
              source: 0,
              end_time: 1646037000,
            },
            {
              status: "ongoing",
              discount_name: "testasdfgxcvyt003",
              start_time: 1644909420,
              discount_id: 1000021583,
              source: 0,
              end_time: 1645173000,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.getDiscountList({
        discount_status: DiscountStatus.ONGOING,
        page_no: 1,
        page_size: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/get_discount_list",
        {
          method: "GET",
          auth: true,
          params: {
            discount_status: "ongoing",
            page_no: 1,
            page_size: 100,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.discount_list).toHaveLength(3);
    });

    it("should get all discounts", async () => {
      const mockResponse: GetDiscountListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_list: [
            {
              status: "ongoing",
              discount_name: "testqwert001",
              start_time: 1644910200,
              discount_id: 1000021581,
              end_time: 1645864200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.getDiscountList({
        discount_status: DiscountStatus.ALL,
      });

      expect(result.response.discount_list).toHaveLength(1);
    });
  });

  describe("updateDiscount", () => {
    it("should update a discount", async () => {
      const mockResponse: UpdateDiscountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 661460179119131,
          modify_time: 1656408546,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.updateDiscount({
        discount_id: 661460179119131,
        start_time: 1656403800,
        end_time: 1656494739,
        discount_name: "The discount 111",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/update_discount",
        {
          method: "POST",
          auth: true,
          body: {
            discount_id: 661460179119131,
            start_time: 1656403800,
            end_time: 1656494739,
            discount_name: "The discount 111",
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateDiscountItem", () => {
    it("should update items in a discount", async () => {
      const mockResponse: UpdateDiscountItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          discount_id: 1000029745,
          count: 1,
          error_list: [
            {
              item_id: 1776783,
              model_id: 1776782,
              fail_message: "time error",
              fail_error: "discount.error_time",
            },
          ],
        },
        warning: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await discountManager.updateDiscountItem({
        discount_id: 1000029745,
        item_list: [
          {
            item_id: 1776783,
            purchase_limit: 2,
            model_list: [
              {
                model_id: 0,
                model_promotion_price: 96,
              },
            ],
          },
          {
            item_id: 1778783,
            purchase_limit: 2,
            item_promotion_price: 11,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/update_discount_item",
        {
          method: "POST",
          auth: true,
          body: {
            discount_id: 1000029745,
            item_list: [
              {
                item_id: 1776783,
                purchase_limit: 2,
                model_list: [
                  {
                    model_id: 0,
                    model_promotion_price: 96,
                  },
                ],
              },
              {
                item_id: 1778783,
                purchase_limit: 2,
                item_promotion_price: 11,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.error_list).toHaveLength(1);
    });
  });
});
