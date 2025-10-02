import { jest } from "@jest/globals";
import { ShopManager } from "../../managers/shop.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetProfileResponse,
  GetShopInfoResponse,
  UpdateProfileResponse,
  GetWarehouseDetailResponse,
  GetShopNotificationResponse,
  GetAuthorisedResellerBrandResponse,
} from "../../schemas/shop.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ShopManager", () => {
  let shopManager: ShopManager;
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

    shopManager = new ShopManager(mockConfig);
  });

  describe("getProfile", () => {
    it("should get shop profile successfully", async () => {
      const mockResponse: GetProfileResponse = {
        request_id: "142b43ff8d9b7799a4fbcca440104167",
        error: "",
        message: "",
        response: {
          shop_logo: "https://cf.shopee.sg/file/4d4f2e34c6d27cd3838a49a575f251bf",
          description: "Welcome to our shop. All cheap prices while good quality",
          shop_name: "OpenAPI Shop",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getProfile();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_profile", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
      expect(result.response.shop_name).toBe("OpenAPI Shop");
      expect(result.response.shop_logo).toBe(
        "https://cf.shopee.sg/file/4d4f2e34c6d27cd3838a49a575f251bf"
      );
      expect(result.response.description).toBe(
        "Welcome to our shop. All cheap prices while good quality"
      );
    });

    it("should get shop profile with invoice_issuer for BR seller", async () => {
      const mockResponse: GetProfileResponse = {
        request_id: "142b43ff8d9b7799a4fbcca440104167",
        error: "",
        message: "",
        response: {
          shop_logo: "https://cf.shopee.sg/file/4d4f2e34c6d27cd3838a49a575f251bf",
          description: "Welcome to our shop",
          shop_name: "BR Shop",
          invoice_issuer: "Other",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getProfile();

      expect(result.response.invoice_issuer).toBe("Other");
    });

    it("should handle error when getting profile", async () => {
      const mockResponse: GetProfileResponse = {
        request_id: "9f0f9c5a9004a54e92a132ef6e96cd82",
        error: "error_auth",
        message: "Invalid partner_id or shopid.",
        response: {
          shop_logo: "",
          description: "",
          shop_name: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getProfile();

      expect(result.error).toBe("error_auth");
      expect(result.message).toBe("Invalid partner_id or shopid.");
    });
  });

  describe("getShopInfo", () => {
    it("should get shop info successfully", async () => {
      const mockResponse: GetShopInfoResponse = {
        request_id: "e3e3e7f3314a5c09fbf56b4649990b01",
        error: "",
        message: "",
        shop_name: "mysipuat",
        region: "MY",
        status: "NORMAL",
        shop_fulfillment_flag: "Others",
        is_cb: false,
        is_upgraded_cbsc: false,
        merchant_id: undefined,
        is_sip: true,
        sip_affi_shops: [],
        is_main_shop: true,
        is_direct_shop: false,
        linked_direct_shop_list: [
          {
            direct_shop_id: 223009454,
            direct_shop_region: "SG",
          },
        ],
        linked_main_shop_id: 0,
        auth_time: 1741944925,
        expire_time: 1773503999,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopInfo();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_shop_info", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
      expect(result.shop_name).toBe("mysipuat");
      expect(result.region).toBe("MY");
      expect(result.status).toBe("NORMAL");
      expect(result.is_cb).toBe(false);
      expect(result.is_sip).toBe(true);
      expect(result.is_main_shop).toBe(true);
      expect(result.linked_direct_shop_list).toHaveLength(1);
      expect(result.linked_direct_shop_list?.[0].direct_shop_id).toBe(223009454);
    });

    it("should get shop info with merchant_id", async () => {
      const mockResponse: GetShopInfoResponse = {
        request_id: "e3e3e7f3314a5c09fbf56b4649990b01",
        error: "",
        message: "",
        shop_name: "Test Shop",
        region: "SG",
        status: "NORMAL",
        is_cb: true,
        is_sip: false,
        auth_time: 1610533441,
        expire_time: 1642069441,
        merchant_id: 1000000400,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopInfo();

      expect(result.merchant_id).toBe(1000000400);
    });

    it("should handle error when getting shop info", async () => {
      const mockResponse: GetShopInfoResponse = {
        request_id: "11d5faea741d928705bfa903a21e166c",
        error: "error_auth",
        message: "Invalid partner_id or shopid.",
        shop_name: "",
        region: "",
        status: "",
        is_cb: false,
        is_sip: false,
        auth_time: 0,
        expire_time: 0,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopInfo();

      expect(result.error).toBe("error_auth");
      expect(result.message).toBe("Invalid partner_id or shopid.");
    });
  });

  describe("updateProfile", () => {
    it("should update shop profile successfully", async () => {
      const mockResponse: UpdateProfileResponse = {
        request_id: "241cce8492e455f0babeadc939e4b3cb",
        error: "",
        message: "",
        response: {
          shop_logo: "https://cf.shopee.sg/file/8424390be4677b0b3c37ce6499ce261a",
          description: "Updated description",
          shop_name: "Updated Shop Name",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.updateProfile({
        shop_name: "Updated Shop Name",
        description: "Updated description",
        shop_logo: "https://cf.shopee.sg/file/8424390be4677b0b3c37ce6499ce261a",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/update_profile", {
        method: "POST",
        auth: true,
        body: {
          shop_name: "Updated Shop Name",
          description: "Updated description",
          shop_logo: "https://cf.shopee.sg/file/8424390be4677b0b3c37ce6499ce261a",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.shop_name).toBe("Updated Shop Name");
      expect(result.response.description).toBe("Updated description");
    });

    it("should update only shop name", async () => {
      const mockResponse: UpdateProfileResponse = {
        request_id: "241cce8492e455f0babeadc939e4b3cb",
        error: "",
        message: "",
        response: {
          shop_name: "New Shop Name",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.updateProfile({
        shop_name: "New Shop Name",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/update_profile", {
        method: "POST",
        auth: true,
        body: {
          shop_name: "New Shop Name",
        },
      });

      expect(result.response.shop_name).toBe("New Shop Name");
    });

    it("should handle error when description exceeds limit", async () => {
      const mockResponse: UpdateProfileResponse = {
        request_id: "f2d21d835777ec4c464c5075812cd94e",
        error: "shop.data_data_check",
        message:
          "Failed to change Shop Description for characters exceeds 500 characters. Please correct and try it again.",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.updateProfile({
        description: "a".repeat(501),
      });

      expect(result.error).toBe("shop.data_data_check");
      expect(result.message).toContain("exceeds 500 characters");
    });
  });

  describe("getWarehouseDetail", () => {
    it("should get warehouse detail successfully", async () => {
      const mockResponse: GetWarehouseDetailResponse = {
        request_id: "16488d76e337c606s5504f26",
        error: "",
        message: "",
        response: [
          {
            warehouse_id: 6,
            warehouse_name: "warehouse1",
            warehouse_type: 1,
            location_id: "IDZ",
            address_id: 118454205,
            region: "ID",
            state: "ACEH",
            city: "KAB. ACEH UTARA",
            district: "Mato Grosso",
            town: "Av Maria H A dos Santos",
            address: "Parque Sagrada Família",
            zipcode: "24379",
            state_code: "12345",
            holiday_mode_state: 0,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getWarehouseDetail({ warehouse_type: 1 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_warehouse_detail", {
        method: "GET",
        auth: true,
        params: { warehouse_type: 1 },
      });

      expect(result.error).toBe("");
      expect(result.response).toHaveLength(1);
      expect(result.response[0].warehouse_id).toBe(6);
      expect(result.response[0].warehouse_name).toBe("warehouse1");
      expect(result.response[0].warehouse_type).toBe(1);
      expect(result.response[0].location_id).toBe("IDZ");
      expect(result.response[0].address_id).toBe(118454205);
    });

    it("should get return warehouse detail", async () => {
      const mockResponse: GetWarehouseDetailResponse = {
        request_id: "16488d76e337c606s5504f26",
        error: "",
        message: "",
        response: [
          {
            warehouse_id: 7,
            warehouse_name: "return_warehouse",
            warehouse_type: 2,
            location_id: "IDZ",
            address_id: 118454206,
            region: "ID",
            state: "JAKARTA",
            city: "JAKARTA PUSAT",
            district: "District",
            town: "Town",
            address: "Return Address",
            zipcode: "12345",
            state_code: "54321",
            holiday_mode_state: 0,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getWarehouseDetail({ warehouse_type: 2 });

      expect(result.response[0].warehouse_type).toBe(2);
      expect(result.response[0].warehouse_name).toBe("return_warehouse");
    });

    it("should handle error when warehouse not found", async () => {
      const mockResponse: GetWarehouseDetailResponse = {
        request_id: "16488a76f483ed60655sc0426",
        error: "warehouse.error_can_not_find_warehouse",
        message: "This error will show if there is no legal warehouse address for given shop id",
        response: [],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getWarehouseDetail();

      expect(result.error).toBe("warehouse.error_can_not_find_warehouse");
    });
  });

  describe("getShopNotification", () => {
    it("should get shop notification successfully", async () => {
      const mockResponse: GetShopNotificationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        cursor: 12345,
        data: {
          create_time: 1634567890,
          content: "Test notification content",
          title: "Test Notification",
          url: "https://seller.shopee.sg/notifications",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopNotification({
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_shop_notification", {
        method: "GET",
        auth: true,
        params: {
          page_size: 10,
        },
      });

      expect(result.error).toBe("");
      expect(result.cursor).toBe(12345);
      expect(result.data.title).toBe("Test Notification");
      expect(result.data.content).toBe("Test notification content");
      expect(result.data.create_time).toBe(1634567890);
      expect(result.data.url).toBe("https://seller.shopee.sg/notifications");
    });

    it("should get shop notification with cursor", async () => {
      const mockResponse: GetShopNotificationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        cursor: 12346,
        data: {
          create_time: 1634567891,
          content: "Next notification",
          title: "Next Title",
          url: "https://seller.shopee.sg/notifications",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopNotification({
        cursor: 12345,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_shop_notification", {
        method: "GET",
        auth: true,
        params: {
          cursor: 12345,
          page_size: 10,
        },
      });

      expect(result.cursor).toBe(12346);
    });

    it("should get shop notification without params", async () => {
      const mockResponse: GetShopNotificationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        cursor: 0,
        data: {
          create_time: 0,
          content: "-",
          title: "-",
          url: "-",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getShopNotification();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop/get_shop_notification", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
    });
  });

  describe("getAuthorisedResellerBrand", () => {
    it("should get authorised reseller brand successfully", async () => {
      const mockResponse: GetAuthorisedResellerBrandResponse = {
        request_id: "b8b833d5a7284dfd80f3fe8b108a1a15",
        error: "",
        message: "",
        response: {
          is_authorised_reseller: true,
          total_count: 2,
          more: false,
          authorised_brand_list: [
            {
              brand_id: 1,
              brand_name: "test brand 1",
            },
            {
              brand_id: 2,
              brand_name: "test brand 2",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getAuthorisedResellerBrand({
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop/get_authorised_reseller_brand",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 10,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.is_authorised_reseller).toBe(true);
      expect(result.response.total_count).toBe(2);
      expect(result.response.more).toBe(false);
      expect(result.response.authorised_brand_list).toHaveLength(2);
      expect(result.response.authorised_brand_list[0].brand_id).toBe(1);
      expect(result.response.authorised_brand_list[0].brand_name).toBe("test brand 1");
    });

    it("should handle pagination with more pages", async () => {
      const mockResponse: GetAuthorisedResellerBrandResponse = {
        request_id: "b8b833d5a7284dfd80f3fe8b108a1a15",
        error: "",
        message: "",
        response: {
          is_authorised_reseller: true,
          total_count: 50,
          more: true,
          authorised_brand_list: Array.from({ length: 30 }, (_, i) => ({
            brand_id: i + 1,
            brand_name: `brand ${i + 1}`,
          })),
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getAuthorisedResellerBrand({
        page_no: 1,
        page_size: 30,
      });

      expect(result.response.more).toBe(true);
      expect(result.response.total_count).toBe(50);
      expect(result.response.authorised_brand_list).toHaveLength(30);
    });

    it("should handle non-authorised reseller", async () => {
      const mockResponse: GetAuthorisedResellerBrandResponse = {
        request_id: "b8b833d5a7284dfd80f3fe8b108a1a15",
        error: "",
        message: "",
        response: {
          is_authorised_reseller: false,
          total_count: 0,
          more: false,
          authorised_brand_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopManager.getAuthorisedResellerBrand({
        page_no: 1,
        page_size: 10,
      });

      expect(result.response.is_authorised_reseller).toBe(false);
      expect(result.response.total_count).toBe(0);
      expect(result.response.authorised_brand_list).toHaveLength(0);
    });
  });
});
