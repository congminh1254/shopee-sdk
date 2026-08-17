import { jest, describe, beforeEach, it, expect } from "@jest/globals";
import { ShopeeConfig, ShopeeSDK } from "../sdk.js";
import { ShopeeRegion } from "../schemas/region.js";
import { AccessToken } from "../schemas/access-token.js";
import { ShopeeApiError } from "../errors.js";

// Mock fetch function
const mockFetch = jest.fn() as unknown as jest.Mock<(url: string, options?: any) => Promise<any>>;

// Mock the node-fetch module
jest.unstable_mockModule("node-fetch", () => ({
  default: mockFetch,
  Blob: globalThis.Blob,
  File: globalThis.File,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
}));

const { ShopeeFetch } = await import("../fetch.js");

describe("ShopeeFetch Security and Retry Constraints", () => {
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
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
      sdk: mockSdk,
    };
  });

  it("should attempt auto-refresh on 'invalid_access_token' and retry", async () => {
    const activeToken: AccessToken = {
      access_token: "active_token",
      refresh_token: "ref_token",
      expire_in: 3600,
      request_id: "req_id",
      error: "",
      message: "",
      expired_at: Date.now() + 3600000,
      shop_id: 67890,
    };
    (mockSdk.getAuthToken as any).mockResolvedValue(activeToken);

    // First response is invalid token error, second response is success
    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() =>
          Promise.resolve({ error: "invalid_access_token", message: "token error" })
        ),
      })
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() => Promise.resolve({ success: true })),
      });

    const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true });

    expect(mockSdk.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ success: true });
  });

  it("should attempt auto-refresh on schema typo 'invalid_acceess_token' and retry", async () => {
    const activeToken: AccessToken = {
      access_token: "active_token",
      refresh_token: "ref_token",
      expire_in: 3600,
      request_id: "req_id",
      error: "",
      message: "",
      expired_at: Date.now() + 3600000,
      shop_id: 67890,
    };
    (mockSdk.getAuthToken as any).mockResolvedValue(activeToken);

    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() =>
          Promise.resolve({ error: "invalid_acceess_token", message: "token typo error" })
        ),
      })
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() => Promise.resolve({ success: true })),
      });

    const result = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true });

    expect(mockSdk.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ success: true });
  });

  it("should throw ShopeeApiError and stop if retry still returns token error (prevents infinite loop)", async () => {
    const activeToken: AccessToken = {
      access_token: "active_token",
      refresh_token: "ref_token",
      expire_in: 3600,
      request_id: "req_id",
      error: "",
      message: "",
      expired_at: Date.now() + 3600000,
      shop_id: 67890,
    };
    (mockSdk.getAuthToken as any).mockResolvedValue(activeToken);

    // Return token error both times
    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() =>
          Promise.resolve({ error: "invalid_access_token", message: "token error" })
        ),
      })
      .mockResolvedValueOnce({
        status: 200,
        headers: new Map([["content-type", "application/json"]]),
        json: jest.fn(() =>
          Promise.resolve({ error: "invalid_access_token", message: "still invalid token" })
        ),
      });

    await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint", { auth: true })).rejects.toThrow(
      ShopeeApiError
    );

    expect(mockSdk.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledTimes(2); // exactly twice, not infinite
  });

  it("should prevent system query params (partner_id, timestamp) from being overwritten by user params", async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });

    await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
      params: {
        partner_id: 999999, // user input attempts to overwrite
        custom_param: "value",
      },
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [calledUrl] = mockFetch.mock.calls[0];
    const url = new URL(calledUrl);

    // System partner_id (from config) must win
    expect(url.searchParams.get("partner_id")).toBe("12345");
    expect(url.searchParams.get("custom_param")).toBe("value");
  });
});
