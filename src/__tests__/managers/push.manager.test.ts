import { jest } from "@jest/globals";
import { PushManager } from "../../managers/push.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  SetAppPushConfigResponse,
  GetAppPushConfigResponse,
  GetLostPushMessageResponse,
  ConfirmConsumedLostPushMessageResponse,
} from "../../schemas/push.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("PushManager", () => {
  let pushManager: PushManager;
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

    pushManager = new PushManager(mockConfig);
  });

  describe("setAppPushConfig", () => {
    it("should set app push configuration", async () => {
      const mockResponse: SetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.setAppPushConfig({
        callback_url: "https://myapp.example.com/webhook/shopee",
        push_config: {
          order_status: 15,
          order_tracking_no: 1,
          shop_update: 7,
          banned_item: 3,
          item_promotion: 31,
          reserved_stock_change: 1,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/set_app_push_config", {
        method: "POST",
        body: {
          callback_url: "https://myapp.example.com/webhook/shopee",
          push_config: {
            order_status: 15,
            order_tracking_no: 1,
            shop_update: 7,
            banned_item: 3,
            item_promotion: 31,
            reserved_stock_change: 1,
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should set push configuration with blocking enabled", async () => {
      const mockResponse: SetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.setAppPushConfig({
        callback_url: "https://secure.example.com/webhook",
        push_config: {
          order_status: 1,
          shop_update: 1,
        },
        blocking: true,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/set_app_push_config", {
        method: "POST",
        body: {
          callback_url: "https://secure.example.com/webhook",
          push_config: {
            order_status: 1,
            shop_update: 1,
          },
          blocking: true,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAppPushConfig", () => {
    it("should get current push configuration", async () => {
      const mockResponse: GetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          callback_url: "https://myapp.example.com/webhook/shopee",
          push_config: {
            order_status: 15,
            order_tracking_no: 1,
            shop_update: 7,
            banned_item: 3,
            item_promotion: 31,
            reserved_stock_change: 1,
          },
          blocking: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getAppPushConfig();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_app_push_config", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.callback_url).toBe("https://myapp.example.com/webhook/shopee");
      expect(result.response.push_config.order_status).toBe(15);
      expect(result.response.blocking).toBe(false);
    });

    it("should handle empty push configuration", async () => {
      const mockResponse: GetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          callback_url: "",
          push_config: {},
          blocking: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getAppPushConfig();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_app_push_config", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.callback_url).toBe("");
      expect(Object.keys(result.response.push_config)).toHaveLength(0);
    });
  });

  describe("getLostPushMessage", () => {
    it("should get lost push messages", async () => {
      const mockResponse: GetLostPushMessageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          has_next_page: false,
          last_message_id: 12345,
          message_list: [
            {
              message_id: 12343,
              shop_id: 67890,
              code: 1,
              timestamp: 1640995200,
              data: '{"order_sn":"220101000000001","order_status":"READY_TO_SHIP"}',
            },
            {
              message_id: 12344,
              shop_id: 67890,
              code: 3,
              timestamp: 1640995300,
              data: '{"item_id":111111,"status":"BANNED"}',
            },
            {
              message_id: 12345,
              shop_id: 67890,
              code: 7,
              timestamp: 1640995400,
              data: '{"shop_id":67890,"status":"NORMAL"}',
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getLostPushMessage();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_lost_push_message", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.message_list).toHaveLength(3);
      expect(result.response.has_next_page).toBe(false);
      expect(result.response.last_message_id).toBe(12345);
    });

    it("should handle empty lost push messages", async () => {
      const mockResponse: GetLostPushMessageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          has_next_page: false,
          last_message_id: 0,
          message_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getLostPushMessage();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_lost_push_message", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.message_list).toHaveLength(0);
      expect(result.response.last_message_id).toBe(0);
    });

    it("should handle paginated lost push messages", async () => {
      const mockResponse: GetLostPushMessageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          has_next_page: true,
          last_message_id: 12400,
          message_list: Array.from({ length: 100 }, (_, i) => ({
            message_id: 12301 + i,
            shop_id: 67890,
            code: 1,
            timestamp: 1640995200 + i * 60,
            data: `{"order_sn":"22010100000${String(i + 1).padStart(4, "0")}","order_status":"READY_TO_SHIP"}`,
          })),
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getLostPushMessage();

      expect(result.response.message_list).toHaveLength(100);
      expect(result.response.has_next_page).toBe(true);
      expect(result.response.last_message_id).toBe(12400);
    });
  });

  describe("confirmConsumedLostPushMessage", () => {
    it("should confirm consumed lost push messages", async () => {
      const mockResponse: ConfirmConsumedLostPushMessageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.confirmConsumedLostPushMessage({
        last_message_id: 12345,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/confirm_consumed_lost_push_message",
        {
          method: "POST",
          body: {
            last_message_id: 12345,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it("should confirm consumption with specific message ID", async () => {
      const mockResponse: ConfirmConsumedLostPushMessageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.confirmConsumedLostPushMessage({
        last_message_id: 98765,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/confirm_consumed_lost_push_message",
        {
          method: "POST",
          body: {
            last_message_id: 98765,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });
});
