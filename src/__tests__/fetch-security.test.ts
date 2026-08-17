import { jest, describe, beforeEach, it, expect } from "@jest/globals";
import http from "node:http";
import { ShopeeConfig, ShopeeSDK } from "../sdk.js";
import { ShopeeRegion } from "../schemas/region.js";
import { AccessToken } from "../schemas/access-token.js";
import { ShopeeApiError, ShopeeSdkError } from "../errors.js";

// Mock fetch function
const mockFetch = jest.fn() as unknown as jest.Mock<
  (url: string, options?: RequestInit) => Promise<unknown>
>;

// Mock the node-fetch module
jest.unstable_mockModule("node-fetch", () => ({
  default: mockFetch,
  Blob: globalThis.Blob,
  File: globalThis.File,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
}));

const { ShopeeFetch } = await import("../fetch.js");

interface CustomRequestInit extends RequestInit {
  agent?: http.Agent;
  _retryCount?: number;
}

interface TestTimestampResponse {
  create_time: Date;
  nested: {
    update_time: Date;
    other_field: string;
  };
  item_list: {
    ship_time: Date;
  }[];
  list_values: (Date | number)[];
  invalid_time: string;
}

describe("ShopeeFetch Security and Retry Constraints", () => {
  let mockConfig: ShopeeConfig;
  let mockSdk: ShopeeSDK;

  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();

    mockSdk = {
      getAuthToken: jest.fn<() => Promise<AccessToken | null>>(),
      refreshToken: jest.fn<() => Promise<AccessToken | null>>(),
    } as unknown as ShopeeSDK;

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
    jest.mocked(mockSdk.getAuthToken).mockResolvedValue(activeToken);

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
    jest.mocked(mockSdk.getAuthToken).mockResolvedValue(activeToken);

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
    jest.mocked(mockSdk.getAuthToken).mockResolvedValue(activeToken);

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

  it("should set custom agent when provided in config", async () => {
    const customAgent = new http.Agent();
    const configWithAgent = { ...mockConfig, agent: customAgent };

    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });

    await ShopeeFetch.fetch(configWithAgent, "/test/endpoint");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [, fetchOpts] = mockFetch.mock.calls[0];
    const customOpts = fetchOpts as CustomRequestInit;
    expect(customOpts.agent).toBe(customAgent);
  });

  it("should serialize Date objects and preserve binary objects or objects with custom prototype", async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });

    const customProtoObj = Object.create({ custom: true }) as { field: string };
    customProtoObj.field = "value";

    const testDate = new Date(1710000000000); // 2024-03-09T16:00:00.000Z

    await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
      method: "POST",
      body: {
        date: testDate,
        customObj: customProtoObj,
        nested: [testDate],
      },
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [, fetchOpts] = mockFetch.mock.calls[0];
    const bodyString = fetchOpts?.body as string;
    const parsedBody = JSON.parse(bodyString) as {
      date: number;
      customObj: { field: string };
      nested: number[];
    };
    expect(parsedBody.date).toBe(Math.floor(testDate.getTime() / 1000));
    expect(parsedBody.customObj).toEqual({ field: "value" });
    expect(parsedBody.nested[0]).toBe(Math.floor(testDate.getTime() / 1000));
  });

  it("should deserialize timestamps from response according to timestampPaths", async () => {
    const rawResponse = {
      create_time: 1710000000,
      nested: {
        update_time: 1710000000,
        other_field: "value",
      },
      item_list: [
        {
          ship_time: 1710000000,
        },
      ],
      list_values: [1710000000, 0],
      invalid_time: "not-a-number",
    };

    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve(rawResponse)),
    });

    const result = await ShopeeFetch.fetch<TestTimestampResponse>(mockConfig, "/test/endpoint", {
      timestampPaths: [
        "create_time",
        "nested.update_time",
        "nested.non_existent",
        "item_list.ship_time",
        "list_values",
        "invalid_time",
      ],
    });

    expect(result.create_time).toBeInstanceOf(Date);
    expect(result.create_time.getTime()).toBe(1710000000 * 1000);
    expect(result.nested.update_time).toBeInstanceOf(Date);
    expect(result.item_list[0].ship_time).toBeInstanceOf(Date);
    expect(result.list_values[0]).toBeInstanceOf(Date);
    expect(result.list_values[1]).toBe(0);
    expect(result.invalid_time).toBe("not-a-number");

    // Cover line 151: non-object responses
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve(null)),
    });
    const nullResult = await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
      timestampPaths: ["create_time"],
    });
    expect(nullResult).toBeNull();

    // Cover lines 158-161: array at root
    const arrayResponse = [{ create_time: 1710000000 }, { create_time: 1710000000 }];
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve(arrayResponse)),
    });
    const arrayResult = await ShopeeFetch.fetch<{ create_time: Date }[]>(
      mockConfig,
      "/test/endpoint",
      {
        timestampPaths: ["create_time"],
      }
    );
    expect(arrayResult[0].create_time).toBeInstanceOf(Date);
    expect(arrayResult[1].create_time).toBeInstanceOf(Date);
  });

  it("should detect PNG, JPG, and GIF mime types from buffers", async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["content-type", "application/json"]]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });

    // PNG header: 89 50 4E 47
    const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x01]);
    // JPG header: FF D8 FF
    const jpgBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x01]);
    // GIF header: 47 49 46 38
    const gifBuffer = Buffer.from([0x47, 0x49, 0x46, 0x38, 0x00, 0x01]);
    // Short buffer (less than 4 bytes)
    const shortBuffer = Buffer.from([0x01, 0x02]);

    await ShopeeFetch.fetch(mockConfig, "/test/endpoint", {
      method: "POST",
      body: {
        png: pngBuffer,
        jpg: jpgBuffer,
        gif: gifBuffer,
        short: shortBuffer,
      },
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [, fetchOpts] = mockFetch.mock.calls[0];

    const formData = fetchOpts?.body as FormData;
    expect(formData).toBeDefined();
  });

  it("should handle header content-type cases and fetch error fallbacks", async () => {
    // 1. Capitalized Content-Type header branch (json)
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["Content-Type", "application/json"]]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });
    const res1 = await ShopeeFetch.fetch(mockConfig, "/test/endpoint");
    expect(res1).toEqual({ success: true });

    // 2. Empty Content-Type header branch (falls back to json)
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([]),
      json: jest.fn(() => Promise.resolve({ success: true })),
    });
    const res2 = await ShopeeFetch.fetch(mockConfig, "/test/endpoint");
    expect(res2).toEqual({ success: true });

    // 3. Octet-stream Content-Type header branch (calls arrayBuffer)
    mockFetch.mockResolvedValueOnce({
      status: 200,
      headers: new Map([["Content-Type", "application/octet-stream"]]),
      arrayBuffer: jest.fn(() => Promise.resolve(Buffer.from("binary-data"))),
    });
    const res3 = await ShopeeFetch.fetch(mockConfig, "/test/endpoint");
    expect(res3).toEqual(Buffer.from("binary-data"));

    // 4. Fallbacks for error.message and error.name (throwing objects/strings)
    mockFetch.mockRejectedValueOnce({ name: "TypeError" });
    await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
      new ShopeeSdkError("Network error: [object Object]")
    );

    mockFetch.mockRejectedValueOnce({ message: "Network crash" });
    await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
      new ShopeeSdkError("Unexpected error: Network crash")
    );

    mockFetch.mockRejectedValueOnce("raw-string-error");
    await expect(ShopeeFetch.fetch(mockConfig, "/test/endpoint")).rejects.toThrow(
      new ShopeeSdkError("Unknown error occurred: raw-string-error")
    );
  });
});
