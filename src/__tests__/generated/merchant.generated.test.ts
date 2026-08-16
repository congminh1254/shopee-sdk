import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { MerchantManager } from "../../managers/merchant.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("MerchantManager (Generated Tests)", () => {
  let manager: MerchantManager;
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
    manager = new MerchantManager(mockConfig);
  });

  describe("getMerchantInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        merchant_name: "sellerplatform_uat_merchant",
        auth_time: "1608114596",
        expire_time: "1640342010",
        request_id: "a3a4277823b1019960cc92cfd972c506",
        merchant_currency: "CNY",
        merchant_region: "KR",
        is_upgraded_cbsc: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMerchantInfo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMerchantPrepaidAccountList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        total: 8,
        list: [
          {
            prepaid_account_id: 123,
            prepaid_account_courier_key: "test_string",
            prepaid_account_courier_name: "test_string",
            prepaid_account_partner_id: "test_string",
            prepaid_account_partner_key: "test_string",
            prepaid_account_partner_secret: "test_string",
            prepaid_account_partner_name: "test_string",
            prepaid_account_partner_net: "test_string",
            prepaid_account_partner_code: "test_string",
            prepaid_account_check_man: "test_string",
            prepaid_account_is_default: true,
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

      const result = await manager.getMerchantPrepaidAccountList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_prepaid_account_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMerchantWarehouseList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        cursor: {
          next_id: 123,
          prev_id: 123,
          page_size: 123,
        },
        warehouse_type: 123,
      };
      const exampleResponse = {
        total_count: 123,
        warehouse_list: [
          {
            warehouse_id: 123,
            warehouse_name: "test_string",
            warehouse_type: 123,
            warehouse_region: "test_string",
            location_id: "test_string",
            address: {
              address_name: "test_string",
              region: "test_string",
              address: "test_string",
              city: "test_string",
              district: "test_string",
              state: "test_string",
              town: "test_string",
              zip_code: "test_string",
            },
            enterprise_info: {
              company_name: "test_string",
              cnpj: "test_string",
              state_registration_number: "test_string",
              is_freight_payer: true,
            },
          },
        ],
        cursor: {
          next_id: 123,
          prev_id: 123,
          page_size: 123,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMerchantWarehouseList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_warehouse_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMerchantWarehouseLocationList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = [
        {
          location_id: "CNZ",
          warehouse_name: "warehouse1",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMerchantWarehouseLocationList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_warehouse_location_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopListByMerchant", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 100,
      };
      const exampleResponse = {
        request_id: "a3a4277823b1019960cc92cfd972c506",
        shop_list: [
          {
            shop_id: 600000,
            sip_affi_shops: [
              {
                affi_shop_id: 123456,
              },
            ],
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

      const result = await manager.getShopListByMerchant(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_shop_list_by_merchant",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWarehouseEligibleShopList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        warehouse_id: 123,
        warehouse_type: 123,
        cursor: {
          next_id: 123,
          prev_id: 123,
          page_size: 123,
        },
      };
      const exampleResponse = {
        shop_list: [
          {
            shop_id: 123,
            shop_name: "test_string",
          },
        ],
        cursor: {
          next_id: 123,
          prev_id: 123,
          page_size: 123,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWarehouseEligibleShopList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_warehouse_eligible_shop_list",
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
