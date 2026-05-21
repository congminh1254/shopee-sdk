import { jest } from "@jest/globals";
import { PublicManager } from "../../managers/public.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetShopsByPartnerResponse,
  GetMerchantsByPartnerResponse,
  GetShopeeIpRangeResponse,
} from "../../schemas/public.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("PublicManager", () => {
  let publicManager: PublicManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    publicManager = new PublicManager(mockConfig);
  });

  describe("getShopsByPartner", () => {
    it("should get shops by partner without additional parameters", async () => {
      const mockResponse: GetShopsByPartnerResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          authed_shop_list: [
            {
              shop_id: 123456,
              region: "SG",
              sip_affi_shops: [],
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
            {
              shop_id: 789012,
              region: "SG",
              sip_affi_shops: [],
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getShopsByPartner();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_shops_by_partner", {
        method: "GET",
        params: {
          partner_id: 12345,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get shops by partner with page_size parameter", async () => {
      const mockResponse: GetShopsByPartnerResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          authed_shop_list: [
            {
              shop_id: 123456,
              region: "SG",
              sip_affi_shops: [],
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
          ],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getShopsByPartner({ page_size: 1 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_shops_by_partner", {
        method: "GET",
        params: {
          partner_id: 12345,
          page_size: 1,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get shops by partner with page_no parameter", async () => {
      const mockResponse: GetShopsByPartnerResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          authed_shop_list: [],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getShopsByPartner({ page_no: 2 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_shops_by_partner", {
        method: "GET",
        params: {
          partner_id: 12345,
          page_no: 2,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMerchantsByPartner", () => {
    it("should get merchants by partner without additional parameters", async () => {
      const mockResponse: GetMerchantsByPartnerResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          authed_merchant_list: [
            {
              merchant_id: 111111,
              region: "CN",
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
            {
              merchant_id: 222222,
              region: "CN",
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getMerchantsByPartner();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_merchants_by_partner", {
        method: "GET",
        params: {
          partner_id: 12345,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get merchants by partner with page_size parameter", async () => {
      const mockResponse: GetMerchantsByPartnerResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          authed_merchant_list: [
            {
              merchant_id: 111111,
              region: "CN",
              auth_time: 1640995200,
              expire_time: 1672531200,
            },
          ],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getMerchantsByPartner({ page_size: 1 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_merchants_by_partner", {
        method: "GET",
        params: {
          partner_id: 12345,
          page_size: 1,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShopeeIpRange", () => {
    it("should get Shopee IP ranges", async () => {
      const mockResponse: GetShopeeIpRangeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          ip_list: ["203.0.113.0/24", "198.51.100.0/24", "192.0.2.0/24"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getShopeeIpRange();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_shopee_ip_ranges", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle empty IP ranges response", async () => {
      const mockResponse: GetShopeeIpRangeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          ip_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await publicManager.getShopeeIpRange();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/public/get_shopee_ip_ranges", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.ip_list).toHaveLength(0);
    });
  });
});

