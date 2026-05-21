import { jest, describe, beforeEach, it, expect } from "@jest/globals";
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
const mockFetch = jest.fn() as any;
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
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    pushManager = new PushManager(mockConfig);
  });

  describe("setAppPushConfig", () => {
    it("should set app push configuration", async () => {
      const mockResponse: SetAppPushConfigResponse = {
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
        error: "",
        message: "",
        response: {
          result: "success",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.setAppPushConfig({
        callback_url: "https://open.shopee.com/",
        set_push_config_on: [1, 2, 3, 4, 5, 8, 9, 10],
        set_push_config_off: [6, 7, 11, 12, 13],
        blocked_shop_id_list: [10010, 20020, 30030],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/set_app_push_config", {
        method: "POST",
        body: {
          callback_url: "https://open.shopee.com/",
          set_push_config_on: [1, 2, 3, 4, 5, 8, 9, 10],
          set_push_config_off: [6, 7, 11, 12, 13],
          blocked_shop_id_list: [10010, 20020, 30030],
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should set push configuration with only callback_url", async () => {
      const mockResponse: SetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result: "success",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.setAppPushConfig({
        callback_url: "https://secure.example.com/webhook",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/set_app_push_config", {
        method: "POST",
        body: {
          callback_url: "https://secure.example.com/webhook",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAppPushConfig", () => {
    it("should get current push configuration", async () => {
      const mockResponse: GetAppPushConfigResponse = {
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
        error: "",
        message: "",
        response: {
          callback_url: "https://open.shopee.com/",
          live_push_status: "Normal",
          blocked_shop_id: [10010, 20020, 30030],
          push_config_on_list: [1, 2, 3],
          push_config_off_list: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getAppPushConfig();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_app_push_config", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.callback_url).toBe("https://open.shopee.com/");
      expect(result.response.live_push_status).toBe("Normal");
      expect(result.response.blocked_shop_id).toContain(20020);
      expect(result.response.push_config_on_list).toContain(3);
    });

    it("should handle empty push configuration", async () => {
      const mockResponse: GetAppPushConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          callback_url: "",
          live_push_status: "Suspended",
          blocked_shop_id: [],
          push_config_on_list: [],
          push_config_off_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getAppPushConfig();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_app_push_config", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.callback_url).toBe("");
      expect(result.response.push_config_on_list).toHaveLength(0);
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
          push_message_list: [
            {
              shop_id: 67890,
              code: 1,
              timestamp: 1640995200,
              data: '{"order_sn":"220101000000001","order_status":"READY_TO_SHIP"}',
            },
            {
              shop_id: 67890,
              code: 3,
              timestamp: 1640995300,
              data: '{"item_id":111111,"status":"BANNED"}',
            },
            {
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
      expect(result.response.push_message_list).toHaveLength(3);
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
          push_message_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getLostPushMessage();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/push/get_lost_push_message", {
        method: "GET",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.push_message_list).toHaveLength(0);
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
          push_message_list: Array.from({ length: 100 }, (_, i) => ({
            shop_id: 67890,
            code: 1,
            timestamp: 1640995200 + i * 60,
            data: `{"order_sn":"22010100000${String(i + 1).padStart(4, "0")}","order_status":"READY_TO_SHIP"}`,
          })),
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await pushManager.getLostPushMessage();

      expect(result.response.push_message_list).toHaveLength(100);
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
