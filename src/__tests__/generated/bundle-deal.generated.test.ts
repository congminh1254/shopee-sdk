import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { BundleDealManager } from "../../managers/bundle-deal.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("BundleDealManager (Generated Tests)", () => {
  let manager: BundleDealManager;
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
    manager = new BundleDealManager(mockConfig);
  });

  describe("addBundleDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        rule_type: 1,
        discount_value: 11,
        fix_price: 11,
        discount_percentage: 33,
        min_amount: 1,
        start_time: 1600000000,
        end_time: 1610000000,
        name: "bundle name",
        purchase_limit: 3,
        additional_tiers: [
          {
            min_amount: 100,
            fix_price: 100,
            discount_value: 20,
            discount_percentage: 20,
          },
        ],
      };
      const exampleResponse = {
        bundle_deal_id: 11111,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addBundleDeal(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/add_bundle_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addBundleDealItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 1234522,
        item_list: [
          {
            item_id: 1234221,
            status: 1,
          },
        ],
      };
      const exampleResponse = {
        failed_list: [
          {
            item_id: 1234221,
            fail_error: "bundle.bundle_deal_no_shipping_channel",
            fail_message: "This product does not set shipping channel.",
          },
        ],
        success_list: ["test_string"],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addBundleDealItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/add_bundle_deal_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteBundleDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 11111,
      };
      const exampleResponse = {
        bundle_deal_id: 11111,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteBundleDeal(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/delete_bundle_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteBundleDealItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 11111,
        item_list: [
          {
            item_id: 1234,
          },
        ],
      };
      const exampleResponse = {
        failed_list: [
          {
            item_id: 1234,
            fail_error: "bundle.bundle_deal_item_not_exist",
            fail_message: "Please update item of bundel deal",
          },
        ],
        success_list: ["test_string"],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteBundleDealItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/delete_bundle_deal_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endBundleDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 11111,
      };
      const exampleResponse = {
        bundle_deal_id: 11111,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endBundleDeal(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/end_bundle_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBundleDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 113891,
      };
      const exampleResponse = {
        bundle_deal_id: 113891,
        name: "Bundle Deal Test",
        start_time: 1655654412,
        end_time: 1658246412,
        bundle_deal_rule: {
          rule_type: 1,
          discount_value: 11,
          fix_price: 11,
          discount_percentage: 33,
          min_amount: 2,
          additional_tiers: {
            min_amount: 2,
            fix_price: 11,
            discount_value: 11,
            discount_percentage: 33,
          },
        },
        purchase_limit: 6,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBundleDeal(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBundleDealItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 113891,
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 13567304112,
            status: 1,
          },
        ],
        total_count: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBundleDealItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal_item",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBundleDealList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 100,
        time_status: 2,
        page_no: 1,
      };
      const exampleResponse = {
        bundle_deal_list: [
          {
            bundle_deal_id: 1111432,
            name: "Bundle Deal Test",
            start_time: 1655654412,
            end_time: 1658246412,
            bundle_deal_rule: {
              rule_type: 1,
              discount_value: 11,
              fix_price: 11,
              discount_percentage: 33,
              min_amount: 123,
              additional_tiers: [
                {
                  min_amount: 123,
                  fix_price: 11,
                  discount_value: 11,
                  discount_percentage: 33,
                },
              ],
            },
            purchase_limit: 6,
          },
        ],
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBundleDealList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateBundleDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        rule_type: 1,
        discount_value: 11,
        fix_price: 11,
        discount_percentage: 33,
        min_amount: 123,
        start_time: 1655654412,
        end_time: 1658246412,
        name: "bundle name",
        purchase_limit: 3,
        bundle_deal_id: 6833,
        additional_tiers: {
          min_amount: 100,
          fix_price: 100,
          discount_value: 20,
          discount_percentage: 20,
        },
      };
      const exampleResponse = {
        bundle_deal_id: 6833,
        name: "bundle name",
        start_time: 1655654412,
        end_time: 1658246412,
        bundle_deal_rule: {
          rule_type: 1,
          discount_value: 11,
          fix_price: 11,
          discount_percentage: 33,
          min_amount: 123,
          additional_tiers: [
            {
              min_amount: 123,
              fix_price: 11,
              discount_value: 11,
              discount_percentage: 33,
            },
          ],
        },
        purchase_limit: 3,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateBundleDeal(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/update_bundle_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateBundleDealItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        bundle_deal_id: 11111324,
        item_list: [
          {
            item_id: 12341213,
            status: 1,
          },
        ],
      };
      const exampleResponse = {
        failed_list: [
          {
            item_id: 12341213,
            fail_error: "bundle.bundle_deal_no_shipping_channel",
            fail_message: "This product does not set shipping channel.",
          },
        ],
        success_list: ["test_string"],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateBundleDealItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/update_bundle_deal_item",
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
