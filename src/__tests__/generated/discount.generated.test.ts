import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { DiscountManager } from "../../managers/discount.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("DiscountManager (Generated Tests)", () => {
  let manager: DiscountManager;
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
    manager = new DiscountManager(mockConfig);
  });

  describe("addDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_name: "test-create",
        start_time: "1624864213",
        end_time: "1625382613",
      };
      const exampleResponse = {
        discount_id: 665123666665499,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/add_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addDiscountItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 665123666665499,
        item_list: [
          {
            item_id: 1776783,
            item_promotion_price: 11,
            item_promotion_stock: 22,
            model_list: [
              {
                model_id: 1776782,
                model_promotion_price: 11,
                model_promotion_stock: 22,
              },
            ],
            purchase_limit: 2,
          },
        ],
      };
      const exampleResponse = {
        discount_id: 665123666665499,
        count: 1,
        error_list: [
          {
            item_id: 1776783,
            model_id: 1776782,
            fail_message: "time error",
            fail_error: "discount.error_time",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addDiscountItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/add_discount_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 665123666665499,
      };
      const exampleResponse = {
        discount_id: 665123666665499,
        modify_time: "1610434295",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/delete_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteDiscountItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 665123666665499,
        item_id: 1776783,
        model_id: 1467683,
      };
      const exampleResponse = {
        discount_id: 665123666665499,
        error_list: [
          {
            item_id: 1776783,
            model_id: 1467683,
            fail_message: "time error",
            fail_error: "discount.error_time",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteDiscountItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/delete_discount_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteSipDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "TW",
      };
      const exampleResponse = {
        region: "TW",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteSipDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/delete_sip_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 66512366666549900,
      };
      const exampleResponse = {
        discount_id: 66512366666549900,
        modify_time: "1656408546",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/end_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 1000029882,
        page_no: 1,
        page_size: 50,
      };
      const exampleResponse = {
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
            item_inflated_price_of_promotion_price: 12,
            item_local_price: 9.99,
            item_local_promotion_price: 1.72,
            item_local_price_inflated: 123,
            item_local_promotion_price_inflated: 123,
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
                model_local_price_inflated: 123,
                model_local_promotion_price_inflated: 123,
              },
            ],
            purchase_limit: 1,
          },
        ],
        start_time: "1604408400",
        discount_id: 1000029882,
        end_time: "1605276000",
        more: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/get_discount",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getDiscountList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_status: "ongoing",
        page_no: 1,
        page_size: 100,
        update_time_from: "1643860467",
        update_time_to: "1646020467",
      };
      const exampleResponse = {
        discount_list: [
          {
            status: "ongoing",
            discount_name: "testqwert001",
            start_time: "1644910200",
            end_time: "1645864200",
            discount_id: 665270257590299,
            source: 0,
          },
        ],
        more: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getDiscountList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/get_discount_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSipDiscounts", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "SG",
      };
      const exampleResponse = {
        discount_list: [
          {
            region: "SG",
            status: "ongoing",
            sip_discount_rate: 10,
            start_time: "1741235212",
            end_time: "1756787212",
            create_time: "1741233412",
            update_time: "1741233412",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSipDiscounts(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/get_sip_discounts",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setSipDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "TH",
        sip_discount_rate: 15,
      };
      const exampleResponse = {
        region: "TH",
        status: "upcoming",
        sip_discount_rate: 15,
        start_time: "1741688426",
        end_time: "1757240426",
        create_time: "1741686627",
        update_time: "1741686627",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setSipDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/set_sip_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateDiscount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 661460179119131,
        discount_name: "The discount 111",
        end_time: 1656494739,
        start_time: 1656403800,
      };
      const exampleResponse = {
        discount_id: 661460179119131,
        modify_time: "1656408546",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateDiscount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/update_discount",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateDiscountItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        discount_id: 1000029745,
        item_list: [
          {
            item_id: 1776783,
            item_promotion_price: 96,
            model_list: [
              {
                model_id: 1776782,
                model_promotion_price: 96,
              },
            ],
            purchase_limit: 1,
          },
        ],
      };
      const exampleResponse = {
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
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateDiscountItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/discount/update_discount_item",
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
