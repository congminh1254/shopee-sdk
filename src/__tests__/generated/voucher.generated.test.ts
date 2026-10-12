import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { VoucherManager } from "../../managers/voucher.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("VoucherManager (Generated Tests)", () => {
  let manager: VoucherManager;
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
    manager = new VoucherManager(mockConfig);
  });

  describe("addVoucher", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        voucher_name: "testamount",
        voucher_code: "test",
        start_time: 1624719600,
        end_time: 1624978800,
        voucher_type: 1,
        reward_type: 1,
        usage_quantity: 20000,
        min_basket_price: 12.01,
        discount_amount: 1.55,
        percentage: 22,
        max_price: 12,
        display_channel_list: [1],
        item_id_list: [1223223, 1223213],
        display_start_time: 162078900,
      };
      const exampleResponse = {
        voucher_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addVoucher(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: exampleRequest,
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteVoucher", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        voucher_id: 1104340665,
      };
      const exampleResponse = {
        voucher_id: 1104340665,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteVoucher(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/delete_voucher", {
        method: "POST",
        auth: true,
        body: exampleRequest,
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endVoucher", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        voucher_id: 1104340665,
      };
      const exampleResponse = {
        voucher_id: 1104340665,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endVoucher(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/end_voucher", {
        method: "POST",
        auth: true,
        body: exampleRequest,
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVoucher", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        voucher_id: 123,
      };
      const exampleResponse = {
        voucher_id: 123,
        voucher_code: "MKTSRWE",
        voucher_name: "test",
        voucher_type: 1,
        reward_type: 1,
        usage_quantity: 1,
        current_usage: 0,
        start_time: 1622198847,
        end_time: 1622807247,
        is_admin: false,
        voucher_purpose: 0,
        display_channel_list: [1, 2],
        min_basket_price: 10.1,
        percentage: 22,
        max_price: 11.1,
        discount_amount: 11,
        cmt_voucher_status: 1,
        item_id_list: [123422, 122311],
        display_start_time: 162078900,
        target_voucher: 123,
        usecase: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVoucher(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher", {
        method: "GET",
        auth: true,
        params: exampleRequest,
        timestampPaths: ["response.start_time", "response.end_time", "response.display_start_time"],
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVoucherList", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 100,
        status: "upcoming",
      };
      const exampleResponse = {
        more: true,
        voucher_list: [
          {
            voucher_id: 395841407827968,
            voucher_code: "TESTTEST1",
            voucher_name: "test voucher",
            voucher_type: 1,
            reward_type: 1,
            usage_quantity: 11,
            current_usage: 0,
            start_time: 1656647700,
            end_time: 1659243300,
            is_admin: false,
            voucher_purpose: 0,
            discount_amount: 60,
            percentage: 10,
            cmt_voucher_status: 1,
            display_start_time: 1638342000,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVoucherList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher_list", {
        method: "GET",
        auth: true,
        params: exampleRequest,
        timestampPaths: [
          "response.voucher_list.start_time",
          "response.voucher_list.end_time",
          "response.voucher_list.display_start_time",
        ],
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateVoucher", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        voucher_id: 123,
        voucher_name: "test",
        start_time: 1624327200,
        end_time: 1632448798,
        usage_quantity: 11,
        min_basket_price: 1,
        discount_amount: 1,
        percentage: 11,
        max_price: 1,
        display_channel_list: [3, 4],
        item_id_list: [121331, 12332323],
        display_start_time: 162078900,
      };
      const exampleResponse = {
        voucher_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateVoucher(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/voucher/update_voucher", {
        method: "POST",
        auth: true,
        body: exampleRequest,
      });

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
