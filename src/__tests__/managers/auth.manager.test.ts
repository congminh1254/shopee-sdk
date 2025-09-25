import { jest } from "@jest/globals";
import { AuthManager } from "../../managers/auth.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AccessToken } from "../../schemas/access-token.js";
import { ShopeeFetch } from "../../fetch.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("AuthManager", () => {
  let authManager: AuthManager;
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

    authManager = new AuthManager(mockConfig);
  });

  describe("getAccessToken", () => {
    it("should get access token with authorization code", async () => {
      const mockResponse: AccessToken = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getAccessToken("test_code");

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/token/get",
        {
          method: "POST",
          body: {
            code: "test_code",
            partner_id: 12345,
          },
        }
      );

      expect(result).toEqual({
        ...mockResponse,
        expired_at: expect.any(Number),
        shop_id: undefined,
      });
      
      // Check that expired_at is calculated correctly (within 1 second tolerance)
      const expectedExpiredAt = Date.now() + 3600 * 1000 - 60 * 1000;
      expect(Math.abs(result.expired_at! - expectedExpiredAt)).toBeLessThan(1000);
    });

    it("should get access token with shop_id and main_account_id", async () => {
      const mockResponse: AccessToken = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getAccessToken("test_code", 123456, 789012);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/token/get",
        {
          method: "POST",
          body: {
            code: "test_code",
            partner_id: 12345,
            shop_id: 123456,
            main_account_id: 789012,
          },
        }
      );

      expect(result.shop_id).toBe(123456);
    });

    it("should handle response without expire_in", async () => {
      const mockResponse: AccessToken = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expire_in: 0,
        expired_at: 1234567890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getAccessToken("test_code");

      expect(result.expired_at).toBe(1234567890);
    });
  });

  describe("getAccessTokenByResendCode", () => {
    it("should get access token using resend code", async () => {
      const mockResponse: AccessToken = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getAccessTokenByResendCode("resend_code");

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/public/get_token_by_resend_code",
        {
          method: "POST",
          body: {
            resend_code: "resend_code",
          },
        }
      );

      expect(result).toEqual({
        ...mockResponse,
        expired_at: expect.any(Number),
      });
    });
  });

  describe("getRefreshToken", () => {
    it("should refresh access token", async () => {
      const mockResponse: AccessToken = {
        access_token: "new_access_token",
        refresh_token: "new_refresh_token",
        expire_in: 3600,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getRefreshToken("old_refresh_token");

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/access_token/get",
        {
          method: "POST",
          body: {
            refresh_token: "old_refresh_token",
            partner_id: 12345,
          },
        }
      );

      expect(result).toEqual({
        ...mockResponse,
        expired_at: expect.any(Number),
      });
    });

    it("should refresh access token with shop_id and main_account_id", async () => {
      const mockResponse: AccessToken = {
        access_token: "new_access_token",
        refresh_token: "new_refresh_token",
        expire_in: 3600,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await authManager.getRefreshToken("old_refresh_token", 123456, 789012);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/auth/access_token/get",
        {
          method: "POST",
          body: {
            refresh_token: "old_refresh_token",
            partner_id: 12345,
            shop_id: 123456,
            merchant_id: 789012,
          },
        }
      );

      expect(result.shop_id).toBe(123456);
    });
  });
});