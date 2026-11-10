import nodeFetch, {
  File as NodeFetchFile,
  FormData as NodeFetchFormData,
  Headers as NodeFetchHeaders,
} from "node-fetch";
import { ShopeeConfig } from "./sdk.js";
import {
  FetchOptions,
  RetryOptions,
  RequestHookContext,
  ShopeeHooks,
  UploadFile,
} from "./schemas/fetch.js";
import {
  ShopeeApiError,
  ShopeeHttpError,
  ShopeeNetworkError,
  ShopeeSdkError,
  ShopeeTimeoutError,
} from "./errors.js";
import { generateSignature } from "./utils/signature.js";
import { SDK_VERSION } from "./version.js";

const isMock = typeof (nodeFetch as any).mock === "object";

/** Token field each Shopee API type signs with and sends as its identity parameter. */
const AUTH_IDENTITY_KEYS = {
  shop: "shop_id",
  user: "user_id",
  merchant: "merchant_id",
  principal: "principal_id",
} as const;

const nativeFetchFn = isMock ? nodeFetch : globalThis.fetch || nodeFetch;

/**
 * Node's built-in fetch (undici) silently ignores an `http.Agent`, so requests
 * that need a custom agent are routed through node-fetch, which honours it.
 */
function selectFetch(config: ShopeeConfig): (url: string, init?: any) => Promise<any> {
  return (config.agent ? nodeFetch : nativeFetchFn) as (url: string, init?: any) => Promise<any>;
}
const FormDataClass = isMock ? NodeFetchFormData : globalThis.FormData || NodeFetchFormData;
const FileClass = isMock ? NodeFetchFile : globalThis.File || NodeFetchFile;
const HeadersClass = isMock ? NodeFetchHeaders : globalThis.Headers || NodeFetchHeaders;

function isBlobLike(value: unknown): value is Blob {
  return (
    value instanceof Blob ||
    (typeof value === "object" &&
      value !== null &&
      ["Blob", "File"].includes(value.constructor?.name ?? ""))
  );
}

function isBinaryLike(value: unknown): boolean {
  return Buffer.isBuffer(value) || isBlobLike(value);
}

function isUploadData(value: unknown): value is Buffer | Uint8Array | Blob {
  return value instanceof Uint8Array || isBlobLike(value);
}

function isUploadFile(value: unknown): value is UploadFile {
  if (typeof value !== "object" || value === null || isUploadData(value)) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  const keys = Object.keys(candidate);
  return (
    isUploadData(candidate.data) &&
    keys.every((key) => key === "data" || key === "filename" || key === "contentType") &&
    (candidate.filename === undefined || typeof candidate.filename === "string") &&
    (candidate.contentType === undefined || typeof candidate.contentType === "string")
  );
}

function hasBinaryValue(value: unknown): boolean {
  return Array.isArray(value)
    ? value.some(hasBinaryValue)
    : isBinaryLike(value) || isUploadFile(value);
}

function isFormDataBody(body: unknown): boolean {
  return body instanceof FormDataClass;
}

/** File signatures used to name uploads that are passed as bare Buffers. */
function detectFileType(bytes: Uint8Array): { ext: string; mime: string } {
  const hex = Buffer.from(bytes.subarray(0, 12)).toString("hex").toLowerCase();
  const ascii = Buffer.from(bytes.subarray(0, 12)).toString("latin1");
  if (hex.startsWith("89504e47")) return { ext: "png", mime: "image/png" };
  if (hex.startsWith("ffd8ff")) return { ext: "jpg", mime: "image/jpeg" };
  if (hex.startsWith("47494638")) return { ext: "gif", mime: "image/gif" };
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") {
    return { ext: "webp", mime: "image/webp" };
  }
  if (ascii.startsWith("%PDF")) return { ext: "pdf", mime: "application/pdf" };
  if (ascii.slice(4, 8) === "ftyp") {
    return ascii.slice(8, 10) === "qt"
      ? { ext: "mov", mime: "video/quicktime" }
      : { ext: "mp4", mime: "video/mp4" };
  }
  return { ext: "bin", mime: "application/octet-stream" };
}

function appendFormValue(formData: any, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => appendFormValue(formData, key, item));
    return;
  }

  if (isUploadFile(value)) {
    const { data, filename, contentType } = value;
    if (isBlobLike(data)) {
      const name = filename ?? ("name" in data && typeof data.name === "string" ? data.name : key);
      const type = contentType ?? data.type;
      const blob = contentType && contentType !== data.type ? data.slice(0, data.size, type) : data;
      formData.append(key, new FileClass([blob], name, { type }));
      return;
    }
    const bytes = new Uint8Array(data);
    const detected = detectFileType(bytes);
    const file = new FileClass([bytes], filename ?? `${key}.${detected.ext}`, {
      type: contentType ?? detected.mime,
    });
    formData.append(key, file);
    return;
  }

  if (Buffer.isBuffer(value)) {
    const bytes = new Uint8Array(value);
    const { ext, mime } = detectFileType(bytes);
    const file = new FileClass([bytes], `${key}.${ext}`, { type: mime });
    formData.append(key, file);
    return;
  }

  if (isBlobLike(value)) {
    const filename =
      "name" in value && typeof value.name === "string" ? (value.name as string) : undefined;

    if (filename) {
      formData.append(key, value, filename);
      return;
    }

    formData.append(key, value);
    return;
  }

  if (typeof value === "object") {
    formData.append(key, JSON.stringify(value));
    return;
  }

  formData.append(key, String(value));
}

function serializeRequestBody(body: unknown): {
  body: any;
  isMultipart: boolean;
} {
  if (body === undefined) {
    return { body: undefined, isMultipart: false };
  }

  if (isFormDataBody(body)) {
    return { body, isMultipart: true };
  }

  if (typeof body === "object" && body !== null && !Array.isArray(body)) {
    const bodyEntries = Object.entries(body as Record<string, unknown>);

    if (bodyEntries.some(([, value]) => hasBinaryValue(value))) {
      const formData = new FormDataClass();
      bodyEntries.forEach(([key, value]) => appendFormValue(formData, key, value));
      return { body: formData, isMultipart: true };
    }
  }

  return { body: JSON.stringify(body), isMultipart: false };
}

function serializeDates(value: unknown): unknown {
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000);
  }
  if (isBinaryLike(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(serializeDates);
  }
  if (typeof value === "object" && value !== null) {
    if (isFormDataBody(value)) {
      return value;
    }
    // Check if prototype of object is null or direct Object
    const proto = Object.getPrototypeOf(value);
    if (proto !== null && proto !== Object.prototype) {
      return value;
    }
    const serialized: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      serialized[key] = serializeDates(val);
    }
    return serialized;
  }
  return value;
}

function convertPathToDate(obj: any, pathParts: string[], index: number = 0): void {
  if (!obj || typeof obj !== "object") {
    return;
  }

  const part = pathParts[index];
  const isLast = index === pathParts.length - 1;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      convertPathToDate(item, pathParts, index);
    }
    return;
  }

  if (!(part in obj)) {
    return;
  }

  if (isLast) {
    const val = obj[part];
    if (typeof val === "number" && val > 0) {
      obj[part] = new Date(val * 1000);
    } else if (Array.isArray(val)) {
      obj[part] = val.map((v) => (typeof v === "number" && v > 0 ? new Date(v * 1000) : v));
    }
  } else {
    const nextObj = obj[part];
    if (Array.isArray(nextObj)) {
      for (const item of nextObj) {
        convertPathToDate(item, pathParts, index + 1);
      }
    } else {
      convertPathToDate(nextObj, pathParts, index + 1);
    }
  }
}

function deserializeTimestamps(data: any, paths: string[]): void {
  for (const path of paths) {
    const parts = path.split(".");
    convertPathToDate(data, parts);
  }
}

const DEFAULT_RETRY: Required<RetryOptions> = {
  retries: 2,
  min_delay_ms: 500,
  max_delay_ms: 10_000,
  error_codes: ["error_rate_limit", "error_system_busy"],
  http_statuses: [429, 502, 503, 504],
  retry_non_idempotent: false,
};

/** Shopee rejects these before processing, so they are safe to retry for any method. */
const NOT_PROCESSED_ERROR_CODES = new Set(["error_rate_limit"]);
const NOT_PROCESSED_HTTP_STATUSES = new Set([429]);

function resolveRetry(
  configRetry: RetryOptions | undefined,
  callRetry: RetryOptions | false | undefined
): Required<RetryOptions> | null {
  if (callRetry === false) return null;
  const selected = callRetry ?? configRetry;
  if (!selected) return null;
  return { ...DEFAULT_RETRY, ...selected };
}

interface AttemptState {
  url: string;
  startedAt: number;
  retryAfterMs?: number;
}

function redactUrl(url: URL): string {
  const copy = new URL(url.toString());
  for (const key of ["access_token", "sign"]) {
    if (copy.searchParams.has(key)) copy.searchParams.set(key, "***");
  }
  return copy.toString();
}

function callHook<C>(hook: ((context: C) => void | Promise<void>) | undefined, context: C): void {
  if (!hook) return;
  try {
    const result = hook(context);
    if (result && typeof (result as Promise<void>).catch === "function") {
      (result as Promise<void>).catch(() => undefined);
    }
  } catch {
    // Hooks are for observability only and must never break a request.
  }
}

function getHeader(headers: any, name: string): string | null {
  if (!headers || typeof headers.get !== "function") return null;
  return headers.get(name) ?? headers.get(name.toLowerCase()) ?? null;
}

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

function isRetryable(error: unknown, policy: Required<RetryOptions>, method: string): boolean {
  const idempotent = method === "GET" || policy.retry_non_idempotent;
  if (error instanceof ShopeeApiError) {
    const code = error.error;
    const notProcessed =
      (code !== undefined && NOT_PROCESSED_ERROR_CODES.has(code)) ||
      NOT_PROCESSED_HTTP_STATUSES.has(error.status);
    const matches =
      (code !== undefined && policy.error_codes.includes(code)) ||
      policy.http_statuses.includes(error.status);
    return matches && (notProcessed || idempotent);
  }
  if (error instanceof ShopeeHttpError) {
    return (
      policy.http_statuses.includes(error.status) &&
      (NOT_PROCESSED_HTTP_STATUSES.has(error.status) || idempotent)
    );
  }
  if (error instanceof ShopeeNetworkError) {
    return idempotent;
  }
  return false;
}

function backoffDelay(policy: Required<RetryOptions>, retry: number, retryAfterMs?: number) {
  if (retryAfterMs !== undefined) {
    return Math.min(retryAfterMs, policy.max_delay_ms);
  }
  const ceiling = Math.min(policy.max_delay_ms, policy.min_delay_ms * 2 ** (retry - 1));
  // Full jitter keeps many clients from retrying in lockstep.
  return Math.round(ceiling / 2 + (Math.random() * ceiling) / 2);
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function toSdkError(error: unknown): Error {
  if (error && typeof error === "object") {
    const message = (error as Error).message || String(error);
    const name = (error as Error).name || "";
    if (name === "FetchError" || name === "TypeError") {
      return new ShopeeNetworkError(`Network error: ${message}`, { cause: error });
    }
    return new ShopeeSdkError(`Unexpected error: ${message}`, { cause: error });
  }
  return new ShopeeSdkError(`Unknown error occurred: ${error}`, { cause: error });
}

export class ShopeeFetch {
  public static async fetch<T>(
    config: ShopeeConfig,
    path: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const method = (options.method ?? "GET").toUpperCase();
    const policy = resolveRetry(config.retry, options.request?.retry);
    const signal = options.request?.signal ?? options.signal ?? undefined;
    const hooks: ShopeeHooks = config.hooks ?? {};

    for (let attempt = 1; ; attempt++) {
      if (signal?.aborted) {
        throw signal.reason;
      }
      const state: AttemptState = { url: path, startedAt: Date.now() };
      try {
        return await this.fetchOnce<T>(config, path, options, attempt, state, signal);
      } catch (error) {
        const willRetry =
          policy !== null &&
          attempt <= policy.retries &&
          !signal?.aborted &&
          isRetryable(error, policy, method);
        const context: RequestHookContext = { method, path, url: state.url, attempt };
        callHook(hooks.onError, {
          ...context,
          error,
          duration_ms: Date.now() - state.startedAt,
          will_retry: willRetry,
        });
        if (!willRetry) {
          throw error;
        }
        await sleep(backoffDelay(policy, attempt, state.retryAfterMs), signal);
      }
    }
  }

  private static async fetchOnce<T>(
    config: ShopeeConfig,
    path: string,
    options: FetchOptions,
    attempt: number,
    state: AttemptState,
    signal: AbortSignal | undefined
  ): Promise<T> {
    const serializedParams = serializeDates(options.params || {}) as Record<string, any>;
    const serializedBody = serializeDates(options.body);
    const method = options.method ?? "GET";
    const hooks: ShopeeHooks = config.hooks ?? {};
    const url = new URL(`${config.base_url}${path}`);
    // Add required parameters
    const timestamp = Math.floor(Date.now() / 1000);
    let signature = generateSignature(config.partner_key, [
      config.partner_id.toString(),
      url.pathname,
      timestamp.toString(),
    ]);

    // Add query parameters
    Object.keys(serializedParams).forEach((key) =>
      serializedParams[key] === undefined ? delete serializedParams[key] : {}
    );
    const allParams: Record<string, unknown> = {
      ...serializedParams,
      partner_id: config.partner_id,
      timestamp,
    };

    let authParams = {};
    let usedAccessToken: string | undefined;

    if (options.auth) {
      let token = await config.sdk?.getAuthToken();
      if (token?.expired_at && token.expired_at < Date.now()) {
        token = await config.sdk?.refreshToken();
      }
      if (!token) {
        throw new ShopeeSdkError("No access token found");
      }
      const identityKey = AUTH_IDENTITY_KEYS[options.auth === true ? "shop" : options.auth];
      const identity = token[identityKey];
      if (typeof identity !== "number" || !Number.isSafeInteger(identity) || identity < 0) {
        throw new ShopeeSdkError(`No valid ${identityKey} found on access token`);
      }
      // User endpoints must not inherit a shop identity from caller parameters.
      if (options.auth === "user") delete allParams.shop_id;
      usedAccessToken = token.access_token;
      authParams = {
        access_token: token.access_token,
        [identityKey]: identity,
      };
      signature = generateSignature(config.partner_key, [
        config.partner_id.toString(),
        url.pathname,
        timestamp.toString(),
        token.access_token,
        identity.toString(),
      ]);
    }
    Object.entries({ ...allParams, ...authParams, sign: signature }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          url.searchParams.append(key, String(item));
        });
      } else {
        url.searchParams.append(key, String(value));
      }
    });

    const { body: requestBody, isMultipart } = serializeRequestBody(serializedBody);

    // Prepare headers
    const headers = new HeadersClass() as any;
    if (!isMultipart) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("User-Agent", `congminh1254/shopee-sdk/v${SDK_VERSION}`);
    for (const extra of [options.headers, options.request?.headers]) {
      if (extra) {
        Object.entries(extra).forEach(([key, value]) => {
          headers.set(key, value as string);
        });
      }
    }

    // Prepare fetch options
    const requestOptions: any = {
      method,
      headers: headers as unknown as HeadersInit,
      body: requestBody,
    };
    if (config.agent) {
      requestOptions.agent = config.agent;
    }

    const timeoutMs = options.request?.timeout_ms ?? config.timeout_ms;
    const controller = timeoutMs || signal ? new AbortController() : undefined;
    let timedOut = false;
    const timer =
      controller && timeoutMs && timeoutMs > 0
        ? setTimeout(() => {
            timedOut = true;
            controller.abort();
          }, timeoutMs)
        : undefined;
    const onAbort = () => controller?.abort(signal?.reason);
    if (controller) {
      signal?.addEventListener("abort", onAbort, { once: true });
      requestOptions.signal = controller.signal;
    }

    state.url = redactUrl(url);
    state.startedAt = Date.now();
    const context: RequestHookContext = { method, path, url: state.url, attempt };
    callHook(hooks.onRequest, context);

    try {
      const response: any = await selectFetch(config)(url.toString(), requestOptions);
      const responseType =
        response.headers.get("Content-Type") || response.headers.get("content-type") || "";
      state.retryAfterMs = parseRetryAfter(getHeader(response.headers, "Retry-After"));
      const reportResponse = (requestId?: string) =>
        callHook(hooks.onResponse, {
          ...context,
          status: response.status,
          duration_ms: Date.now() - state.startedAt,
          request_id: requestId,
        });

      if (
        responseType.includes("application/pdf") ||
        responseType.includes("application/octet-stream")
      ) {
        const arrayBuffer = await response.arrayBuffer();
        reportResponse();
        return Buffer.from(arrayBuffer) as unknown as T;
      }

      const isJson = !responseType || !!responseType.toLowerCase().includes("json");

      const responseData: unknown = isJson ? await response.json() : await response.text();
      reportResponse(
        isJson && responseData && typeof responseData === "object"
          ? ((responseData as Record<string, unknown>).request_id as string | undefined)
          : undefined
      );

      if (isJson) {
        // Type guard for JSON response with error field
        const jsonData = responseData as Record<string, unknown>;
        if (jsonData && jsonData.error) {
          // Handle invalid access token error
          const isAuthError =
            jsonData.error === "invalid_access_token" ||
            jsonData.error === "invalid_acceess_token" ||
            jsonData.error === "error_auth";

          if (isAuthError && options.auth) {
            try {
              if ((options as any)._retryCount) {
                throw new ShopeeApiError(response.status, jsonData);
              }
              const newOptions = { ...options, _retryCount: 1 };
              // Another request may already have refreshed the token; refresh tokens
              // are single-use, so only refresh when the stored token is the one we sent.
              const latest = await config.sdk?.getAuthToken();
              if (!latest || latest.access_token === usedAccessToken) {
                await config.sdk?.refreshToken();
              }
              // Retry the request with the new token
              return await this.fetchOnce<T>(config, path, newOptions, attempt, state, signal);
            } catch (err) {
              if (err instanceof ShopeeApiError) {
                throw err;
              }
              // If refresh fails, throw the original error
              throw new ShopeeApiError(response.status, jsonData, { cause: err });
            }
          }
          throw new ShopeeApiError(response.status, jsonData);
        }

        if (options.timestampPaths && options.timestampPaths.length > 0) {
          deserializeTimestamps(jsonData, options.timestampPaths);
        }

        const data = jsonData as T;
        return data;
      }
      throw new ShopeeHttpError(`Unknown response type: ${responseType}\n${responseData}`, {
        status: response.status,
        contentType: responseType,
        body: String(responseData),
      });
    } catch (error: any) {
      if (error instanceof ShopeeApiError || error instanceof ShopeeSdkError) {
        throw error;
      }
      if (timedOut && timeoutMs) {
        throw new ShopeeTimeoutError(timeoutMs, { cause: error });
      }
      if (signal?.aborted) {
        throw signal.reason ?? error;
      }
      throw toSdkError(error);
    } finally {
      if (timer) clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    }
  }
}
