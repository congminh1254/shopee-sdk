import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopManager } from "../../managers/shop.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("ShopManager (Generated Tests)", () => {
  let manager: ShopManager;
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
    manager = new ShopManager(mockConfig);
  });

  describe("getAuthorisedResellerBrand", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        is_authorised_reseller: true,
        total_count: 12,
        more: true,
        authorised_brand_list: [
          {
            brand_id: 1,
            brand_name: "test brand",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAuthorisedResellerBrand(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_authorised_reseller_brand",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBrShopOnboardingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        tax_id_type: "test_string",
        tax_id: "test_string",
        cpf_id: "test_string",
        cnpj_id: "test_string",
        name: "test_string",
        legal_entity_name: "test_string",
        birthday: 123,
        birthday_str: "test_string",
        state_registration: "test_string",
        billing_address: {
          state: "test_string",
          city: "test_string",
          address: "test_string",
          zipcode: "test_string",
          neighborhood: "test_string",
        },
        onboarding_status: 123,
        submission_time: 123,
        nationality: "test_string",
        cnae_main: "test_string",
        cnae_secondary: "test_string",
        mei_check: "test_string",
        onboarding_passed: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBrShopOnboardingInfo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_br_shop_onboarding_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProfile", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        shop_logo: "https://cf.shopee.sg/file/4d4f2e34c6d27cd3838a49a575f251bf",
        description: "Welcome to our shop. All checp prices while good quality",
        shop_name: "OpenAPI Shop",
        invoice_issuer: "Other",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProfile(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_profile",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopHolidayMode", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        holiday_mode_on: true,
        holiday_mode_mtime: "1763435974",
        holiday_mode_type: 1,
        holiday_mode_start_time: "1770883200",
        holiday_mode_end_time: "1773305999",
        holiday_mode_description: '"Spring Festival"',
        debug_msg: '""',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopHolidayMode(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_shop_holiday_mode",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        shop_name: "openapi_pshop_1",
        region: "TW",
        status: "NORMAL",
        sip_affi_shops: [
          {
            affi_shop_id: 123,
            region: "test_string",
          },
        ],
        is_cb: true,
        request_id: "0b8f39a76e6ada92247b416c768363ee",
        auth_time: "1610533441",
        expire_time: "1642069441",
        is_sip: true,
        is_upgraded_cbsc: true,
        merchant_id: 1000000400,
        shop_fulfillment_flag: "PFF - 3PF Shop",
        is_main_shop: true,
        is_direct_shop: false,
        linked_main_shop_id: 0,
        linked_direct_shop_list: [
          {
            direct_shop_id: 223009454,
            direct_shop_region: "SG",
          },
        ],
        is_one_awb: "true",
        is_mart_shop: false,
        is_outlet_shop: false,
        mart_shop_id: 1234567890,
        outlet_shop_info_list: [
          {
            outlet_shop_id: 1234567890,
          },
        ],
        mart_outlet_structure_type: "warehouse_mart_shop",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopInfo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_shop_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopNotification", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        cursor: 1,
        page_size: 1,
      };
      const exampleResponse = {
        cursor: 123,
        data: {
          create_time: 123,
          content: "test_string",
          title: "test_string",
          url: "test_string",
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopNotification(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_shop_notification",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWarehouseDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        warehouse_type: 1,
      };
      const exampleResponse = [
        {
          warehouse_id: 6,
          warehouse_name: "warehouse1",
          warehouse_type: 1,
          location_id: "IDZ",
          address_id: 118454205,
          region: "ID",
          state: "ACEH",
          city: "KAB. ACEH UTARA",
          address: "Parque Sagrada Família",
          zipcode: "24379",
          district: "Mato Grosso",
          town: "Av Maria H A dos Santos",
          state_code: "12345",
          holiday_mode_state: 0,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWarehouseDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_warehouse_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setShopHolidayMode", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        holiday_mode_on: true,
        holiday_mode_type: 1,
        holiday_mode_start_time: "1770883200",
        holiday_mode_end_time: "1773305999",
        holiday_mode_description: '"Spring Festival"',
      };
      const exampleResponse = {
        debug_msg: '""',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setShopHolidayMode(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/set_shop_holiday_mode",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateProfile", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_name: "Shopee 24h Offical Shop",
        shop_logo: "https://cf.shopee.sg/file/8424390be4677b0b3c37ce6499ce261a",
        description: "Welcome to our shop. All checp prices while good quality",
      };
      const exampleResponse = {
        shop_logo: "https://cf.shopee.sg/file/4d4f2e34c6d27cd3838a49a575f251bf",
        description: "不错的shop，物美价廉",
        shop_name: "OpenAPIChange",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateProfile(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/update_profile",
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
