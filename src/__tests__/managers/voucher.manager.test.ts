import { jest } from "@jest/globals";
import { VoucherManager } from "../../managers/voucher.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddVoucherResponse,
  DeleteVoucherResponse,
  EndVoucherResponse,
  UpdateVoucherResponse,
  GetVoucherResponse,
  GetVoucherListResponse,
  VoucherStatus,
} from "../../schemas/voucher.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("VoucherManager", () => {
  let voucherManager: VoucherManager;
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

    voucherManager = new VoucherManager(mockConfig);
  });

  describe("addVoucher", () => {
    it("should add a new voucher", async () => {
      const mockResponse: AddVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.addVoucher({
        voucher_code: "SAVE20",
        voucher_name: "20% Off Flash Sale",
        voucher_type: 1,
        reward_type: 2,
        percentage: 20,
        min_basket_price: 50.0,
        start_time: 1640995200,
        end_time: 1641081600,
        display_start_time: 1640908800,
        usage_quantity: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_code: "SAVE20",
          voucher_name: "20% Off Flash Sale",
          voucher_type: 1,
          reward_type: 2,
          percentage: 20,
          min_basket_price: 50.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          usage_quantity: 100,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_id).toBe(12345678);
    });

    it("should add a fixed discount voucher", async () => {
      const mockResponse: AddVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 87654321,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.addVoucher({
        voucher_code: "SAVE10SGD",
        voucher_name: "$10 Off Your Order",
        voucher_type: 1,
        reward_type: 1,
        discount_amount: 10.0,
        min_basket_price: 30.0,
        start_time: 1640995200,
        end_time: 1641081600,
        display_start_time: 1640908800,
        usage_quantity: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_code: "SAVE10SGD",
          voucher_name: "$10 Off Your Order",
          voucher_type: 1,
          reward_type: 1,
          discount_amount: 10.0,
          min_basket_price: 30.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          usage_quantity: 50,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should add a product voucher with item list", async () => {
      const mockResponse: AddVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 11223344,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.addVoucher({
        voucher_code: "PROD15",
        voucher_name: "15% Off Selected Products",
        voucher_type: 2,
        reward_type: 2,
        percentage: 15,
        max_price: 50.0,
        min_basket_price: 0,
        start_time: 1640995200,
        end_time: 1641081600,
        usage_quantity: 200,
        item_id_list: [123456, 789012],
        display_channel_list: [1, 3],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_code: "PROD15",
          voucher_name: "15% Off Selected Products",
          voucher_type: 2,
          reward_type: 2,
          percentage: 15,
          max_price: 50.0,
          min_basket_price: 0,
          start_time: 1640995200,
          end_time: 1641081600,
          usage_quantity: 200,
          item_id_list: [123456, 789012],
          display_channel_list: [1, 3],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_id).toBe(11223344);
    });
  });

  describe("deleteVoucher", () => {
    it("should delete a voucher", async () => {
      const mockResponse: DeleteVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.deleteVoucher({
        voucher_id: 12345678,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/delete_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_id: 12345678,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("endVoucher", () => {
    it("should end an active voucher", async () => {
      const mockResponse: EndVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.endVoucher({
        voucher_id: 12345678,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/end_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_id: 12345678,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateVoucher", () => {
    it("should update a voucher", async () => {
      const mockResponse: UpdateVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.updateVoucher({
        voucher_id: 12345678,
        voucher_name: "Updated 20% Off Flash Sale",
        usage_quantity: 150,
        end_time: 1641168000,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/update_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_id: 12345678,
          voucher_name: "Updated 20% Off Flash Sale",
          usage_quantity: 150,
          end_time: 1641168000,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should update voucher display channels and item list", async () => {
      const mockResponse: UpdateVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.updateVoucher({
        voucher_id: 12345678,
        display_channel_list: [1, 3, 4],
        item_id_list: [123456, 789012, 345678],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/update_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_id: 12345678,
          display_channel_list: [1, 3, 4],
          item_id_list: [123456, 789012, 345678],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVoucher", () => {
    it("should get voucher details", async () => {
      const mockResponse: GetVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 12345678,
          voucher_code: "SAVE20",
          voucher_name: "20% Off Flash Sale",
          voucher_type: 1,
          reward_type: 2,
          percentage: 20,
          min_basket_price: 50.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          display_channel_list: [1],
          usage_quantity: 100,
          current_usage: 25,
          is_admin: false,
          voucher_purpose: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucher({
        voucher_id: 12345678,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher", {
        method: "GET",
        auth: true,
        params: {
          voucher_id: 12345678,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.current_usage).toBe(25);
      expect(result.response.voucher_type).toBe(1);
    });

    it("should get product voucher with item list", async () => {
      const mockResponse: GetVoucherResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          voucher_id: 87654321,
          voucher_code: "PROD15",
          voucher_name: "15% Off Selected Products",
          voucher_type: 2,
          reward_type: 2,
          percentage: 15,
          max_price: 50.0,
          min_basket_price: 0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_channel_list: [1, 3],
          usage_quantity: 200,
          current_usage: 45,
          is_admin: false,
          voucher_purpose: 0,
          item_id_list: [123456, 789012],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucher({
        voucher_id: 87654321,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher", {
        method: "GET",
        auth: true,
        params: {
          voucher_id: 87654321,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_type).toBe(2);
      expect(result.response.item_id_list).toEqual([123456, 789012]);
    });
  });

  describe("getVoucherList", () => {
    it("should get voucher list with status filter", async () => {
      const mockResponse: GetVoucherListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          voucher_list: [
            {
              voucher_id: 12345678,
              voucher_code: "SAVE20",
              voucher_name: "20% Off Flash Sale",
              voucher_type: 1,
              reward_type: 2,
              percentage: 20,
              min_basket_price: 50.0,
              start_time: 1640995200,
              end_time: 1641081600,
              display_start_time: 1640908800,
              usage_quantity: 100,
              current_usage: 25,
              is_admin: false,
              voucher_purpose: 0,
            },
            {
              voucher_id: 87654321,
              voucher_code: "SAVE10SGD",
              voucher_name: "$10 Off Your Order",
              voucher_type: 1,
              reward_type: 1,
              discount_amount: 10.0,
              min_basket_price: 30.0,
              start_time: 1641168000,
              end_time: 1641254400,
              display_start_time: 1641081600,
              usage_quantity: 50,
              current_usage: 0,
              is_admin: false,
              voucher_purpose: 0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucherList({
        status: VoucherStatus.ALL,
        page_no: 1,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher_list", {
        method: "GET",
        auth: true,
        params: {
          status: "all",
          page_no: 1,
          page_size: 20,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_list).toHaveLength(2);
      expect(result.response.more).toBe(false);
    });

    it("should get ongoing vouchers only", async () => {
      const mockResponse: GetVoucherListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          voucher_list: [
            {
              voucher_id: 12345678,
              voucher_code: "SAVE20",
              voucher_name: "20% Off Flash Sale",
              voucher_type: 1,
              reward_type: 2,
              percentage: 20,
              min_basket_price: 50.0,
              start_time: 1640995200,
              end_time: 1641081600,
              display_start_time: 1640908800,
              usage_quantity: 100,
              current_usage: 25,
              is_admin: false,
              voucher_purpose: 0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucherList({
        status: VoucherStatus.ONGOING,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher_list", {
        method: "GET",
        auth: true,
        params: {
          status: "ongoing",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_list).toHaveLength(1);
      expect(result.response.voucher_list[0].voucher_type).toBe(1);
    });
  });
});
