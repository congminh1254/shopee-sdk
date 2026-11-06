import { jest, describe, beforeEach, it, expect } from "@jest/globals";
import { ShopeeConfig, ShopeeSDK } from "../sdk.js";
import { AccessToken } from "../schemas/access-token.js";
import {
  ShopeeApiError,
  ShopeeHttpError,
  ShopeeNetworkError,
  ShopeeSdkError,
  ShopeeTimeoutError,
} from "../errors.js";

const mockFetch = jest.fn<(url: string, init?: any) => Promise<any>>();

jest.unstable_mockModule("node-fetch", () => ({
  default: mockFetch,
  Blob: globalThis.Blob,
  File: globalThis.File,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
}));

const { ShopeeFetch } = await import("../fetch.js");

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  const map = new Map(Object.entries({ "content-type": "application/json", ...headers }));
  return { status, headers: map, json: async () => body };
}

function html(status: number) {
  return {
    status,
    headers: new Map([["content-type", "text/html"]]),
    text: async () => "<html>Bad Gateway</html>",
  };
}

function networkError() {
  return Object.assign(new Error("socket hang up"), { name: "FetchError" });
}

function hangUntilAborted(_url: string, init?: any): Promise<any> {
  return new Promise((_resolve, reject) => {
    init.signal.addEventListener("abort", () =>
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }))
    );
  });
}

const token: AccessToken = {
  access_token: "secret_access",
  refresh_token: "refresh",
  expire_in: 3600,
  expired_at: Date.now() + 3_600_000,
  shop_id: 42,
  request_id: "r",
  error: "",
  message: "",
};

let config: ShopeeConfig;

beforeEach(() => {
  mockFetch.mockReset();
  config = {
    partner_id: 1,
    partner_key: "key",
    base_url: "https://example.invalid/api/v2",
    sdk: {
      getAuthToken: jest.fn(async () => token),
      refreshToken: jest.fn(async () => token),
    } as unknown as ShopeeSDK,
  };
});

describe("structured errors", () => {
  it("exposes Shopee error fields on ShopeeApiError", async () => {
    mockFetch.mockResolvedValueOnce(
      json({ error: "error_param", message: "bad item_id", request_id: "req-1" }, 400)
    );
    const error = (await ShopeeFetch.fetch(config, "/x").catch((e) => e)) as ShopeeApiError;
    expect(error).toBeInstanceOf(ShopeeApiError);
    expect(error.status).toBe(400);
    expect(error.error).toBe("error_param");
    expect(error.apiMessage).toBe("bad item_id");
    expect(error.requestId).toBe("req-1");
  });

  it("raises ShopeeHttpError, still a ShopeeSdkError, for non-JSON responses", async () => {
    mockFetch.mockResolvedValueOnce(html(502));
    const error = (await ShopeeFetch.fetch(config, "/x").catch((e) => e)) as ShopeeHttpError;
    expect(error).toBeInstanceOf(ShopeeHttpError);
    expect(error).toBeInstanceOf(ShopeeSdkError);
    expect(error.status).toBe(502);
    expect(error.body).toContain("Bad Gateway");
    expect(error.message).toContain("Unknown response type: text/html");
  });

  it("raises ShopeeNetworkError with the original cause", async () => {
    const cause = networkError();
    mockFetch.mockRejectedValueOnce(cause);
    const error = (await ShopeeFetch.fetch(config, "/x").catch((e) => e)) as ShopeeNetworkError;
    expect(error).toBeInstanceOf(ShopeeNetworkError);
    expect(error).toBeInstanceOf(ShopeeSdkError);
    expect(error.message).toBe("Network error: socket hang up");
    expect(error.cause).toBe(cause);
  });
});

describe("timeouts and cancellation", () => {
  it("does not attach a signal when neither timeout nor signal is used", async () => {
    mockFetch.mockResolvedValueOnce(json({ ok: true }));
    await ShopeeFetch.fetch(config, "/x");
    expect(mockFetch.mock.calls[0][1].signal).toBeUndefined();
  });

  it("rejects with ShopeeTimeoutError after timeout_ms", async () => {
    mockFetch.mockImplementationOnce(hangUntilAborted);
    const error = await ShopeeFetch.fetch({ ...config, timeout_ms: 20 }, "/x").catch((e) => e);
    expect(error).toBeInstanceOf(ShopeeTimeoutError);
    expect(error).toBeInstanceOf(ShopeeNetworkError);
    expect((error as ShopeeTimeoutError).timeoutMs).toBe(20);
  });

  it("lets a call override or disable the SDK timeout", async () => {
    mockFetch.mockImplementationOnce(hangUntilAborted);
    const error = await ShopeeFetch.fetch({ ...config, timeout_ms: 10_000 }, "/x", {
      request: { timeout_ms: 20 },
    }).catch((e) => e);
    expect(error).toBeInstanceOf(ShopeeTimeoutError);

    mockFetch.mockResolvedValueOnce(json({ ok: true }));
    await ShopeeFetch.fetch({ ...config, timeout_ms: 10_000 }, "/x", {
      request: { timeout_ms: 0 },
    });
    expect(mockFetch.mock.calls[1][1].signal).toBeUndefined();
  });

  it("rejects with the abort reason when the caller aborts", async () => {
    mockFetch.mockImplementationOnce(hangUntilAborted);
    const controller = new AbortController();
    const reason = new Error("user cancelled");
    const pending = ShopeeFetch.fetch(config, "/x", { request: { signal: controller.signal } });
    controller.abort(reason);
    await expect(pending).rejects.toBe(reason);
  });

  it("does not send a request when the signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort(new Error("already"));
    await expect(
      ShopeeFetch.fetch(config, "/x", { request: { signal: controller.signal } })
    ).rejects.toThrow("already");
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("retry policy", () => {
  const fast = { min_delay_ms: 1, max_delay_ms: 5 };

  it("never retries without a retry policy", async () => {
    mockFetch.mockResolvedValueOnce(json({ error: "error_rate_limit", message: "" }, 429));
    await expect(ShopeeFetch.fetch(config, "/x")).rejects.toBeInstanceOf(ShopeeApiError);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("retries rate-limited POST requests because Shopee did not process them", async () => {
    mockFetch
      .mockResolvedValueOnce(json({ error: "error_rate_limit", message: "" }, 429))
      .mockResolvedValueOnce(json({ response: { ok: true } }));
    const result = await ShopeeFetch.fetch({ ...config, retry: fast }, "/x", { method: "POST" });
    expect(result).toEqual({ response: { ok: true } });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("does not retry POST network errors unless retry_non_idempotent is set", async () => {
    mockFetch.mockRejectedValue(networkError());
    await expect(
      ShopeeFetch.fetch({ ...config, retry: fast }, "/x", { method: "POST" })
    ).rejects.toBeInstanceOf(ShopeeNetworkError);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    mockFetch.mockReset();
    mockFetch
      .mockRejectedValueOnce(networkError())
      .mockResolvedValueOnce(json({ response: { ok: true } }));
    await ShopeeFetch.fetch({ ...config, retry: { ...fast, retry_non_idempotent: true } }, "/x", {
      method: "POST",
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("retries GET requests on 5xx and network errors up to `retries` times", async () => {
    mockFetch
      .mockResolvedValueOnce(html(503))
      .mockRejectedValueOnce(networkError())
      .mockResolvedValueOnce(json({ response: { ok: true } }));
    await ShopeeFetch.fetch({ ...config, retry: { ...fast, retries: 2 } }, "/x");
    expect(mockFetch).toHaveBeenCalledTimes(3);

    mockFetch.mockReset();
    mockFetch.mockResolvedValue(html(503));
    await expect(
      ShopeeFetch.fetch({ ...config, retry: { ...fast, retries: 2 } }, "/x")
    ).rejects.toBeInstanceOf(ShopeeHttpError);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it("does not retry client errors such as error_param", async () => {
    mockFetch.mockResolvedValue(json({ error: "error_param", message: "" }, 400));
    await expect(ShopeeFetch.fetch({ ...config, retry: fast }, "/x")).rejects.toBeInstanceOf(
      ShopeeApiError
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("lets a call disable retries with retry: false", async () => {
    mockFetch.mockResolvedValue(html(503));
    await expect(
      ShopeeFetch.fetch({ ...config, retry: fast }, "/x", { request: { retry: false } })
    ).rejects.toBeInstanceOf(ShopeeHttpError);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("honours Retry-After, capped by max_delay_ms", async () => {
    mockFetch
      .mockResolvedValueOnce(json({ error: "error_rate_limit" }, 429, { "retry-after": "60" }))
      .mockResolvedValueOnce(json({ response: {} }));
    const started = Date.now();
    await ShopeeFetch.fetch({ ...config, retry: { min_delay_ms: 1, max_delay_ms: 30 } }, "/x");
    const elapsed = Date.now() - started;
    expect(elapsed).toBeGreaterThanOrEqual(25);
    expect(elapsed).toBeLessThan(1000);
  });

  it("re-signs each retry with the current token", async () => {
    mockFetch
      .mockResolvedValueOnce(json({ error: "error_system_busy" }, 200))
      .mockResolvedValueOnce(json({ response: {} }));
    await ShopeeFetch.fetch({ ...config, retry: fast }, "/x", { auth: true });
    expect(config.sdk!.getAuthToken).toHaveBeenCalledTimes(2);
  });
});

describe("hooks", () => {
  it("reports requests, responses and errors with secrets redacted", async () => {
    const events: Array<[string, any]> = [];
    const hooks = {
      onRequest: (c: any) => void events.push(["request", c]),
      onResponse: (c: any) => void events.push(["response", c]),
      onError: (c: any) => void events.push(["error", c]),
    };
    mockFetch
      .mockResolvedValueOnce(json({ error: "error_rate_limit", request_id: "a" }, 429))
      .mockResolvedValueOnce(json({ response: {}, request_id: "b" }));

    await ShopeeFetch.fetch(
      { ...config, hooks, retry: { min_delay_ms: 1, max_delay_ms: 2 } },
      "/order/get_order_list",
      { auth: true }
    );

    expect(events.map(([kind, c]) => `${kind}:${c.attempt}`)).toEqual([
      "request:1",
      "response:1",
      "error:1",
      "request:2",
      "response:2",
    ]);
    const [, firstRequest] = events[0];
    expect(firstRequest.method).toBe("GET");
    expect(firstRequest.path).toBe("/order/get_order_list");
    expect(firstRequest.url).not.toContain("secret_access");
    expect(new URL(firstRequest.url).searchParams.get("access_token")).toBe("***");
    expect(new URL(firstRequest.url).searchParams.get("sign")).toBe("***");
    expect(events[1][1]).toMatchObject({ status: 429, request_id: "a" });
    expect(events[2][1].will_retry).toBe(true);
    expect(events[2][1].error).toBeInstanceOf(ShopeeApiError);
    expect(events[4][1]).toMatchObject({ status: 200, request_id: "b" });
  });

  it("ignores hooks that throw or reject", async () => {
    mockFetch.mockResolvedValueOnce(json({ response: { ok: 1 } }));
    const hooks = {
      onRequest: () => {
        throw new Error("hook failed");
      },
      onResponse: async () => {
        throw new Error("async hook failed");
      },
    };
    await expect(ShopeeFetch.fetch({ ...config, hooks }, "/x")).resolves.toEqual({
      response: { ok: 1 },
    });
  });
});

describe("uploads", () => {
  async function uploadedFile(value: unknown): Promise<File> {
    mockFetch.mockResolvedValueOnce(json({ response: {} }));
    await ShopeeFetch.fetch(config, "/media/upload", { method: "POST", body: { file: value } });
    const body = mockFetch.mock.calls.at(-1)![1].body as FormData;
    return body.get("file") as File;
  }

  it.each([
    ["webp", Buffer.from("RIFF0000WEBPVP8 "), "file.webp", "image/webp"],
    ["pdf", Buffer.from("%PDF-1.7 rest"), "file.pdf", "application/pdf"],
    ["mp4", Buffer.from("\0\0\0\x18ftypisom0000"), "file.mp4", "video/mp4"],
    ["mov", Buffer.from("\0\0\0\x14ftypqt  0000"), "file.mov", "video/quicktime"],
    ["unknown", Buffer.from("plain bytes"), "file.bin", "application/octet-stream"],
  ])("names %s buffers from their signature", async (_kind, data, name, type) => {
    const file = await uploadedFile(data);
    expect(file.name).toBe(name);
    expect(file.type).toBe(type);
  });

  it("uses filename and contentType from an UploadFile", async () => {
    const file = await uploadedFile({
      data: Buffer.from("csv,data"),
      filename: "polygon.kml",
      contentType: "application/vnd.google-earth.kml+xml",
    });
    expect(file.name).toBe("polygon.kml");
    expect(file.type).toBe("application/vnd.google-earth.kml+xml");
    expect(await file.text()).toBe("csv,data");
  });

  it("accepts Uint8Array and Blob data in an UploadFile", async () => {
    const fromBytes = await uploadedFile({ data: new Uint8Array([0x25, 0x50, 0x44, 0x46]) });
    expect(fromBytes.name).toBe("file.pdf");
    const fromBlob = await uploadedFile({
      data: new Blob(["hello"], { type: "text/plain" }),
      filename: "a.txt",
    });
    expect(fromBlob.name).toBe("a.txt");
    expect(fromBlob.type).toBe("text/plain");
  });

  it("keeps plain objects with a data field as JSON", async () => {
    mockFetch.mockResolvedValueOnce(json({ response: {} }));
    await ShopeeFetch.fetch(config, "/x", { method: "POST", body: { meta: { data: "text" } } });
    expect(mockFetch.mock.calls[0][1].body).toBe(JSON.stringify({ meta: { data: "text" } }));
  });
});
