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
        voucher_type: "SHOP_VOUCHER",
        reward_type: "PERCENTAGE_DISCOUNT",
        percentage: 20,
        min_basket_price: 50.0,
        start_time: 1640995200,
        end_time: 1641081600,
        display_start_time: 1640908800,
        display_end_time: 1641081600,
        usage_quantity: 100,
        limit_per_user: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_code: "SAVE20",
          voucher_name: "20% Off Flash Sale",
          voucher_type: "SHOP_VOUCHER",
          reward_type: "PERCENTAGE_DISCOUNT",
          percentage: 20,
          min_basket_price: 50.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          display_end_time: 1641081600,
          usage_quantity: 100,
          limit_per_user: 1,
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
        voucher_type: "SHOP_VOUCHER",
        reward_type: "FIXED_DISCOUNT",
        discount_amount: 10.0,
        min_basket_price: 30.0,
        start_time: 1640995200,
        end_time: 1641081600,
        display_start_time: 1640908800,
        display_end_time: 1641081600,
        usage_quantity: 50,
        limit_per_user: 2,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/add_voucher", {
        method: "POST",
        auth: true,
        body: {
          voucher_code: "SAVE10SGD",
          voucher_name: "$10 Off Your Order",
          voucher_type: "SHOP_VOUCHER",
          reward_type: "FIXED_DISCOUNT",
          discount_amount: 10.0,
          min_basket_price: 30.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          display_end_time: 1641081600,
          usage_quantity: 50,
          limit_per_user: 2,
        },
      });

      expect(result).toEqual(mockResponse);
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
          voucher_type: "SHOP_VOUCHER",
          reward_type: "PERCENTAGE_DISCOUNT",
          percentage: 20,
          discount_amount: 0,
          min_basket_price: 50.0,
          start_time: 1640995200,
          end_time: 1641081600,
          display_start_time: 1640908800,
          display_end_time: 1641081600,
          usage_quantity: 100,
          current_usage_quantity: 25,
          limit_per_user: 1,
          budget: 0,
          current_budget_usage: 0,
          status: "ONGOING",
          create_time: 1640908800,
          update_time: 1640995200,
          display_channel_list: ["SHOP_HOMEPAGE"],
          item_id_list: [],
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
      expect(result.response.current_usage_quantity).toBe(25);
      expect(result.response.status).toBe("ONGOING");
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
              voucher_type: "SHOP_VOUCHER",
              reward_type: "PERCENTAGE_DISCOUNT",
              percentage: 20,
              discount_amount: 0,
              min_basket_price: 50.0,
              start_time: 1640995200,
              end_time: 1641081600,
              display_start_time: 1640908800,
              display_end_time: 1641081600,
              usage_quantity: 100,
              current_usage_quantity: 25,
              limit_per_user: 1,
              budget: 0,
              current_budget_usage: 0,
              status: "ONGOING",
              create_time: 1640908800,
              update_time: 1640995200,
              display_channel_list: ["SHOP_HOMEPAGE"],
              item_id_list: [],
            },
            {
              voucher_id: 87654321,
              voucher_code: "SAVE10SGD",
              voucher_name: "$10 Off Your Order",
              voucher_type: "SHOP_VOUCHER",
              reward_type: "FIXED_DISCOUNT",
              percentage: 0,
              discount_amount: 10.0,
              min_basket_price: 30.0,
              start_time: 1641168000,
              end_time: 1641254400,
              display_start_time: 1641081600,
              display_end_time: 1641254400,
              usage_quantity: 50,
              current_usage_quantity: 0,
              limit_per_user: 2,
              budget: 0,
              current_budget_usage: 0,
              status: "UPCOMING",
              create_time: 1641081600,
              update_time: 1641081600,
              display_channel_list: ["SHOP_HOMEPAGE"],
              item_id_list: [],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucherList({
        status: "ALL",
        page_no: 1,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher_list", {
        method: "GET",
        auth: true,
        params: {
          status: "ALL",
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
              voucher_type: "SHOP_VOUCHER",
              reward_type: "PERCENTAGE_DISCOUNT",
              percentage: 20,
              discount_amount: 0,
              min_basket_price: 50.0,
              start_time: 1640995200,
              end_time: 1641081600,
              display_start_time: 1640908800,
              display_end_time: 1641081600,
              usage_quantity: 100,
              current_usage_quantity: 25,
              limit_per_user: 1,
              budget: 0,
              current_budget_usage: 0,
              status: "ONGOING",
              create_time: 1640908800,
              update_time: 1640995200,
              display_channel_list: ["SHOP_HOMEPAGE"],
              item_id_list: [],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await voucherManager.getVoucherList({
        status: "ONGOING",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/voucher/get_voucher_list", {
        method: "GET",
        auth: true,
        params: {
          status: "ONGOING",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.voucher_list).toHaveLength(1);
      expect(result.response.voucher_list[0].status).toBe("ONGOING");
    });
  });
});
