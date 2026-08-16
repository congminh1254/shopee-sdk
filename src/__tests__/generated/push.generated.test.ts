import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { PushManager } from "../../managers/push.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("PushManager (Generated Tests)", () => {
  let manager: PushManager;
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
    manager = new PushManager(mockConfig);
  });

  describe("confirmConsumedLostPushMessage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        last_message_id: 176610,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "668ea92da2a19f7d2e72bf98bd530c41",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.confirmConsumedLostPushMessage(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/confirm_consumed_lost_push_message",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAppPushConfig", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        callback_url: "https://open.shopee.com/",
        live_push_status: "suspended",
        suspended_time: "1577416181",
        blocked_shop_id: [10010, 20020, 30030],
        push_config_on_list: [1, 2, 3],
        push_config_off_list: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAppPushConfig(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/get_app_push_config",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getLostPushMessage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        push_message_list: [
          {
            shop_id: 727720655,
            code: 3,
            timestamp: "1660123127",
            data: "[object Object]",
          },
        ],
        has_next_page: false,
        last_message_id: 176610,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getLostPushMessage(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/get_lost_push_message",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setAppPushConfig", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        callback_url: "https://open.shopee.com/",
        set_push_config_on: [1, 2, 3, 4, 5, 8, 9, 10],
        set_push_config_off: [6, 7, 11, 12, 13],
        blocked_shop_id_list: [10010, 20020, 30030],
      };
      const exampleResponse = {
        result: "success",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setAppPushConfig(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/push/set_app_push_config",
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
