import { jest } from "@jest/globals";
import { BundleDealManager } from "../../managers/bundle-deal.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddBundleDealResponse,
  AddBundleDealItemResponse,
  DeleteBundleDealResponse,
  DeleteBundleDealItemResponse,
  EndBundleDealResponse,
  GetBundleDealResponse,
  GetBundleDealItemResponse,
  GetBundleDealListResponse,
  UpdateBundleDealResponse,
  UpdateBundleDealItemResponse,
  BundleDealRuleType,
  BundleDealTimeStatus,
} from "../../schemas/bundle-deal.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("BundleDealManager", () => {
  let bundleDealManager: BundleDealManager;
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

    bundleDealManager = new BundleDealManager(mockConfig);
  });

  describe("addBundleDeal", () => {
    it("should create a new bundle deal with fix price", async () => {
      const mockResponse: AddBundleDealResponse = {
        request_id: "b41cb9d4eff03a708347d69abcd4c63d",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 11111,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.addBundleDeal({
        rule_type: BundleDealRuleType.FIX_PRICE,
        fix_price: 11.0,
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
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/bundle_deal/add_bundle_deal", {
        method: "POST",
        auth: true,
        body: {
          rule_type: BundleDealRuleType.FIX_PRICE,
          fix_price: 11.0,
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
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should create a new bundle deal with discount percentage", async () => {
      const mockResponse: AddBundleDealResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 22222,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.addBundleDeal({
        rule_type: BundleDealRuleType.DISCOUNT_PERCENTAGE,
        discount_percentage: 33,
        min_amount: 2,
        start_time: 1600000000,
        end_time: 1610000000,
        name: "Percentage Bundle",
        purchase_limit: 5,
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("addBundleDealItem", () => {
    it("should add items to a bundle deal", async () => {
      const mockResponse: AddBundleDealItemResponse = {
        request_id: "fdsfsdafdasfbgvfdgergd",
        error: "",
        message: "",
        response: {
          failed_list: [],
          success_list: [1111, 2222, 3333],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.addBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 3333 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/add_bundle_deal_item",
        {
          method: "POST",
          auth: true,
          body: {
            bundle_deal_id: 11111,
            item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 3333 }],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it("should handle errors when adding items", async () => {
      const mockResponse: AddBundleDealItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          failed_list: [
            {
              item_id: 1234,
              fail_error: "bundle.bundle_deal_no_shipping_channel",
              fail_message: "This product does not set shipping channel.",
            },
          ],
          success_list: [1111, 2222],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.addBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 1234 }],
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_list).toHaveLength(1);
      expect(result.response.success_list).toHaveLength(2);
    });
  });

  describe("deleteBundleDeal", () => {
    it("should delete a bundle deal", async () => {
      const mockResponse: DeleteBundleDealResponse = {
        request_id: "fdsfsdafdasfbgvfdgergd",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 11111,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.deleteBundleDeal({
        bundle_deal_id: 11111,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/bundle_deal/delete_bundle_deal", {
        method: "POST",
        auth: true,
        body: {
          bundle_deal_id: 11111,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteBundleDealItem", () => {
    it("should delete items from a bundle deal", async () => {
      const mockResponse: DeleteBundleDealItemResponse = {
        request_id: "fed23116ae34ca00d67f2c7bf57c2d22",
        error: "",
        message: "",
        response: {
          failed_list: [],
          success_list: [1111, 2222, 3333],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.deleteBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 3333 }],
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle errors when deleting items", async () => {
      const mockResponse: DeleteBundleDealItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          failed_list: [
            {
              item_id: 1234,
              fail_error: "bundle.bundle_deal_item_not_exist",
              fail_message: "Please update item of bundel deal",
            },
          ],
          success_list: [1111, 2222],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.deleteBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 1234 }],
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_list).toHaveLength(1);
    });
  });

  describe("endBundleDeal", () => {
    it("should end a bundle deal", async () => {
      const mockResponse: EndBundleDealResponse = {
        request_id: "401185ecbb1f8dc1fabf4f96bbaa0884",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 11111,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.endBundleDeal({
        bundle_deal_id: 11111,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/bundle_deal/end_bundle_deal", {
        method: "POST",
        auth: true,
        body: {
          bundle_deal_id: 11111,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBundleDeal", () => {
    it("should get bundle deal details", async () => {
      const mockResponse: GetBundleDealResponse = {
        request_id: "d929c6ca9b4dbff5ed8fb33bb45c30a8",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 113891,
          name: "Bundle Deal Test",
          start_time: 1655654412,
          end_time: 1658246412,
          bundle_deal_rule: {
            rule_type: BundleDealRuleType.FIX_PRICE,
            discount_value: 11,
            fix_price: 11,
            discount_percentage: 33,
            min_amount: 2,
            additional_tiers: [
              {
                min_amount: 3,
                fix_price: 10,
                discount_value: 12,
                discount_percentage: 35,
              },
            ],
          },
          purchase_limit: 6,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.getBundleDeal({
        bundle_deal_id: 113891,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/bundle_deal/get_bundle_deal", {
        method: "POST",
        auth: true,
        body: {
          bundle_deal_id: 113891,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.bundle_deal_id).toBe(113891);
      expect(result.response.name).toBe("Bundle Deal Test");
    });
  });

  describe("getBundleDealItem", () => {
    it("should get bundle deal items", async () => {
      const mockResponse: GetBundleDealItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [1111, 2222, 3333, 4444],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.getBundleDealItem({
        bundle_deal_id: 11111,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal_item",
        {
          method: "POST",
          auth: true,
          body: {
            bundle_deal_id: 11111,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(4);
    });
  });

  describe("getBundleDealList", () => {
    it("should get bundle deal list with default params", async () => {
      const mockResponse: GetBundleDealListResponse = {
        request_id: "d929c6ca9b4dbff5ed8fb33bb45c30a8",
        error: "",
        message: "",
        response: {
          bundle_deal_list: [
            {
              bundle_deal_id: 1111432,
              name: "Bundle Deal Test",
              start_time: 1655654412,
              end_time: 1658246412,
              bundle_deal_rule: {
                rule_type: BundleDealRuleType.FIX_PRICE,
                discount_value: 11,
                fix_price: 11,
                discount_percentage: 33,
                min_amount: 123,
                additional_tiers: [
                  {
                    min_amount: 200,
                    fix_price: 10,
                  },
                ],
              },
              purchase_limit: 6,
            },
          ],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.getBundleDealList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal_list",
        {
          method: "POST",
          auth: true,
          body: {},
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.bundle_deal_list).toHaveLength(1);
      expect(result.response.more).toBe(true);
    });

    it("should get bundle deal list with filters", async () => {
      const mockResponse: GetBundleDealListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          bundle_deal_list: [],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.getBundleDealList({
        page_size: 100,
        time_status: BundleDealTimeStatus.UPCOMING,
        page_no: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/bundle_deal/get_bundle_deal_list",
        {
          method: "POST",
          auth: true,
          body: {
            page_size: 100,
            time_status: BundleDealTimeStatus.UPCOMING,
            page_no: 1,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateBundleDeal", () => {
    it("should update a bundle deal", async () => {
      const mockResponse: UpdateBundleDealResponse = {
        request_id: "2cda1f9c9b44449aedbc11dwer3ced242",
        error: "",
        message: "",
        response: {
          bundle_deal_id: 6833,
          name: "bundle name updated",
          start_time: 1655654412,
          end_time: 1658246412,
          bundle_deal_rule: {
            rule_type: BundleDealRuleType.FIX_PRICE,
            discount_value: 11.0,
            fix_price: 11.0,
            discount_percentage: 33,
            min_amount: 123,
          },
          purchase_limit: 3,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.updateBundleDeal({
        bundle_deal_id: 6833,
        name: "bundle name updated",
        end_time: 1658246412,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/bundle_deal/update_bundle_deal", {
        method: "POST",
        auth: true,
        body: {
          bundle_deal_id: 6833,
          name: "bundle name updated",
          end_time: 1658246412,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateBundleDealItem", () => {
    it("should update items in a bundle deal", async () => {
      const mockResponse: UpdateBundleDealItemResponse = {
        request_id: "f4e022015c4ef214bc291257a2156958",
        error: "",
        message: "",
        response: {
          failed_list: [],
          success_list: [1111, 2222, 3333],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.updateBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 3333 }],
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle errors when updating items", async () => {
      const mockResponse: UpdateBundleDealItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          failed_list: [
            {
              item_id: 12341213,
              fail_error: "bundle.bundle_deal_no_shipping_channel",
              fail_message: "This product does not set shipping channel.",
            },
          ],
          success_list: [1111, 2222],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await bundleDealManager.updateBundleDealItem({
        bundle_deal_id: 11111,
        item_list: [{ item_id: 1111 }, { item_id: 2222 }, { item_id: 12341213 }],
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_list).toHaveLength(1);
      expect(result.response.success_list).toHaveLength(2);
    });
  });
});
