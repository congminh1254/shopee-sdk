import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { PublicManager } from "../../managers/public.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("PublicManager (Generated Tests)", () => {
  let manager: PublicManager;
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
    manager = new PublicManager(mockConfig);
  });

  describe("getAccessToken", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        code: "5a5477794a55537954697169514f4653",
        partner_id: 1001141,
        shop_id: 123,
        main_account_id: 123,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        request_id: "test_string",
        shop_id_list: [123],
        merchant_id_list: [123],
        supplier_id_list: [123],
        user_id_list: [123],
        principal_id_list: [123],
        access_token: "test_string",
        refresh_token: "test_string",
        expire_in: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAccessToken(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/token/get",
        expect.objectContaining({
          method: "POST",
          auth: false,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMerchantsByPartner", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 1,
        page_no: 1,
      };
      const exampleResponse = {
        authed_merchant_list: [
          {
            region: "SG",
            merchant_id: 1,
            auth_time: 123,
            expire_time: 12312,
          },
        ],
        request_id: "asdasq",
        more: false,
        error: "test_string",
        message: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMerchantsByPartner(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/public/get_merchants_by_partner",
        expect.objectContaining({
          method: "GET",
          auth: false,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopeeIpRanges", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        request_id: "a3a4277823b1019960cc92cfd972c506",
        error: "test_string",
        message: "test_string",
        ip_list: ["1.1.1.1", "24", "2.2.2.212", "24"],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopeeIpRanges(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/public/get_shopee_ip_ranges",
        expect.objectContaining({
          method: "GET",
          auth: false,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopsByPartner", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 1,
        page_no: 1,
      };
      const exampleResponse = {
        authed_shop_list: [
          {
            region: "SG",
            shop_id: 123,
            auth_time: 1610533441,
            expire_time: 1642069441,
            sip_affi_shop_list: [
              {
                region: "SG",
                affi_shop_id: 261377,
              },
            ],
          },
        ],
        request_id: "0b8f39a76e6ada92247b416c768363ee",
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopsByPartner(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/public/get_shops_by_partner",
        expect.objectContaining({
          method: "GET",
          auth: false,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTokenByResendCode", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        resend_code: "resend5a4d6e6a7a745a767276586f53476849",
      };
      const exampleResponse = {
        request_id: "a3a4277823b1019960cc92cfd972c506",
        error: "common.error_auth",
        message: "Invalid access_token.",
        shop_id_list: [1],
        merchant_id_list: [1],
        refresh_token: "abcd",
        access_token: "abcd",
        expire_in: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTokenByResendCode(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/public/get_token_by_resend_code",
        expect.objectContaining({
          method: "POST",
          auth: false,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("refreshAccessToken", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        refresh_token: "4c7259534969484e71734d695a6e6d55",
        partner_id: 2001887,
        shop_id: 322300222,
        merchant_id: 123,
        supplier_id: 123,
        user_id: 123,
        principal_id: 123,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        request_id: "test_string",
        partner_id: 123,
        principal_id: 123,
        shop_id: 123,
        merchant_id: 123,
        supplier_id: 123,
        user_id: 123,
        access_token: "test_string",
        refresh_token: "test_string",
        expire_in: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.refreshAccessToken(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/access_token/get",
        expect.objectContaining({
          method: "POST",
          auth: false,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
