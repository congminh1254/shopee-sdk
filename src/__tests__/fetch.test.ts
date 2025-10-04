import { jest } from "@jest/globals";
import { ShopeeConfig, ShopeeSDK } from "../sdk.js";
import { ShopeeRegion } from "../schemas/region.js";
import { AccessToken } from "../schemas/access-token.js";
import { ShopeeSdkError } from "../errors.js";

// Mock fetch function
const mockFetch = jest.fn();

// Mock the entire fetch module before importing ShopeeFetch
jest.unstable_mockModule("node-fetch", () => ({
  default: mockFetch,
  Headers: class MockHeaders extends Map {
    get(name: string) {
      return super.get(name.toLowerCase());
    }
    set(name: string, value: string) {
      return super.set(name.toLowerCase(), value);
    }
  },
}));

// Import ShopeeFetch after mocking
const { ShopeeFetch } = await import("../fetch.js");

describe("ShopeeFetch", () => {
  let mockConfig: ShopeeConfig;
  let mockSdk: ShopeeSDK;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSdk = {
      getAuthToken: jest.fn(),
      refreshToken: jest.fn(),
    } as Partial<ShopeeSDK> as ShopeeSDK;

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
      sdk: mockSdk,
    };
  });

  describe("fetch method", () => {
    it("should make successful GET request without auth", async () => {
      const mockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: { data: "test data" },
      };

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint");

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it("should make successful POST request with body", async () => {
      const mockResponse = { success: true };
      const requestBody = { key: "value" };

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        method: "POST",
        body: requestBody,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe("POST");
      expect(options.body).toBe(JSON.stringify(requestBody));
      expect(result).toEqual(mockResponse);
    });

    it("should make authenticated request with valid token", async () => {
      const mockToken: AccessToken = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        expired_at: Date.now() + 3600000,
        shop_id: 67890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      const mockResponse = { data: "authenticated data" };

      (mockSdk.getAuthToken as jest.MockedFunction<typeof mockSdk.getAuthToken>).mockResolvedValue(
        mockToken
      );

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        auth: true,
      });

      expect(mockSdk.getAuthToken).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain("access_token=test_access_token");
      expect(url).toContain("shop_id=67890");
      expect(result).toEqual(mockResponse);
    });

    it("should refresh token when expired and retry request", async () => {
      const expiredToken: AccessToken = {
        access_token: "expired_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        expired_at: Date.now() - 1000, // Expired
        shop_id: 67890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      const newToken: AccessToken = {
        access_token: "new_access_token",
        refresh_token: "new_refresh_token",
        expire_in: 3600,
        expired_at: Date.now() + 3600000,
        shop_id: 67890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      const mockResponse = { data: "authenticated data" };

      (mockSdk.getAuthToken as jest.MockedFunction<typeof mockSdk.getAuthToken>).mockResolvedValue(
        expiredToken
      );
      (mockSdk.refreshToken as jest.MockedFunction<typeof mockSdk.refreshToken>).mockResolvedValue(
        newToken
      );

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        auth: true,
      });

      expect(mockSdk.getAuthToken).toHaveBeenCalledTimes(1);
      expect(mockSdk.refreshToken).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it("should throw error when no access token found", async () => {
      (mockSdk.getAuthToken as jest.MockedFunction<typeof mockSdk.getAuthToken>).mockResolvedValue(
        null
      );

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true })).rejects.toThrow(
        ShopeeSdkError
      );
      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true })).rejects.toThrow(
        "No access token found"
      );
    });

    it("should handle invalid access token error and retry after refresh", async () => {
      const invalidTokenResponse = {
        error: "invalid_acceess_token",
        message: "Invalid access token",
        request_id: "test-request-id",
      };

      const successResponse = { data: "success after refresh" };

      const mockToken: AccessToken = {
        access_token: "old_token",
        refresh_token: "refresh_token",
        expire_in: 3600,
        expired_at: Date.now() + 3600000,
        shop_id: 67890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      (mockSdk.getAuthToken as jest.MockedFunction<typeof mockSdk.getAuthToken>).mockResolvedValue(
        mockToken
      );
      (mockSdk.refreshToken as jest.MockedFunction<typeof mockSdk.refreshToken>).mockResolvedValue(
        mockToken
      );

      // First call returns invalid token error, second call succeeds
      mockFetch
        .mockResolvedValueOnce({
          status: 401,
          headers: new Map([["content-type", "application/json"]]),
          json: jest.fn().mockResolvedValue(invalidTokenResponse),
        })
        .mockResolvedValueOnce({
          status: 200,
          headers: new Map([["content-type", "application/json"]]),
          json: jest.fn().mockResolvedValue(successResponse),
        });

      const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        auth: true,
      });

      expect(mockSdk.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual(successResponse);
    });

    it("should include custom headers in request", async () => {
      const mockResponse = { data: "test" };
      const customHeaders = {
        "X-Custom-Header": "custom-value",
      };

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        headers: customHeaders,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers.get("X-Custom-Header")).toBe("custom-value");
    });

    it("should include query parameters in URL", async () => {
      const mockResponse = { data: "test" };
      const params = {
        param1: "value1",
        param2: 123,
        param3: ["array1", "array2"],
      };

      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
        params,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain("param1=value1");
      expect(url).toContain("param2=123");
      expect(url).toContain("param3=array1");
      expect(url).toContain("param3=array2");
    });

    it("should handle invalid access token error when refresh fails", async () => {
      const invalidTokenResponse = {
        error: "invalid_acceess_token",
        message: "Invalid access token",
        request_id: "test-request-id",
      };

      const mockToken: AccessToken = {
        access_token: "old_token",
        refresh_token: "refresh_token",
        expire_in: 3600,
        expired_at: Date.now() + 3600000,
        shop_id: 67890,
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      (mockSdk.getAuthToken as jest.MockedFunction<typeof mockSdk.getAuthToken>).mockResolvedValue(
        mockToken
      );
      (mockSdk.refreshToken as jest.MockedFunction<typeof mockSdk.refreshToken>).mockRejectedValue(
        new Error("Refresh failed")
      );

      mockFetch.mockResolvedValueOnce({
        status: 401,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(invalidTokenResponse),
      });

      await expect(
        ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true })
      ).rejects.toThrow("API Error: 401");
    });

    it("should throw ShopeeApiError when API returns error", async () => {
      const errorResponse = {
        error: "error_code",
        message: "Error message",
        request_id: "test-request-id",
      };

      mockFetch.mockResolvedValueOnce({
        status: 400,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn().mockResolvedValue(errorResponse),
      });

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
        "API Error: 400"
      );
    });

    it("should throw error for unknown response type", async () => {
      const headers = new Map([["content-type", "text/html"]]);
      mockFetch.mockResolvedValueOnce({
        status: 200,
        headers: {
          get: (name: string) => headers.get(name.toLowerCase()),
        },
        text: jest.fn().mockResolvedValue("<html>Not JSON</html>"),
        json: jest.fn(),
      });

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
        "Unknown response type"
      );
    });

    it("should handle network errors", async () => {
      const networkError = new Error("Network failed");
      networkError.name = "FetchError";

      mockFetch.mockRejectedValueOnce(networkError);

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
        "Network error: Network failed"
      );
    });

    it("should handle unexpected errors", async () => {
      const unexpectedError = new Error("Unexpected error");

      mockFetch.mockRejectedValueOnce(unexpectedError);

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
        "Unexpected error: Unexpected error"
      );
    });

    it("should handle unknown non-Error exceptions", async () => {
      mockFetch.mockRejectedValueOnce("string error");

      await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
        "Unknown error occurred"
      );
    });
  });
});
