export type FetchOptions = Omit<RequestInit, "body"> & {
  params?: any;
  body?: unknown;
  /** true preserves shop authentication; "user" signs with the selected user_id. */
  auth?: boolean | "user";
  timestampPaths?: string[];
  /** Per-call options supplied by the caller of a manager method. */
  request?: RequestOptions;
};

export interface FetchResponse<T> {
  result?: T;
  response: T;
  request_id: string;
  error: string;
  message: string;
  [key: string]: any;
}

/** Options accepted as the optional last argument of every manager method. */
export interface RequestOptions {
  /** Abort the request. Rejects with the signal's reason. */
  signal?: AbortSignal;
  /** Overrides the SDK-level `timeout_ms` for this call; 0 disables the timeout. */
  timeout_ms?: number;
  /** Overrides the SDK-level retry policy for this call; `false` disables retries. */
  retry?: RetryOptions | false;
  /** Extra HTTP headers for this call. */
  headers?: Record<string, string>;
}

/**
 * Automatic retry policy. Retries are opt-in: nothing is retried unless `retry` is set
 * on the SDK config or on a call.
 *
 * Rate-limit responses (HTTP 429, `error_rate_limit`) are retried for every method because
 * Shopee rejected them before processing. Other failures (network errors, timeouts, 5xx,
 * `error_system_busy`) are retried only for GET requests unless `retry_non_idempotent` is true,
 * because a POST may already have been applied.
 */
export interface RetryOptions {
  /** Retries after the first attempt. Default 2. */
  retries?: number;
  /** Base delay for exponential backoff with jitter. Default 500ms. */
  min_delay_ms?: number;
  /** Upper bound for a single delay, including `Retry-After`. Default 10000ms. */
  max_delay_ms?: number;
  /** Shopee error codes to retry. Default `["error_rate_limit", "error_system_busy"]`. */
  error_codes?: string[];
  /** HTTP statuses to retry. Default `[429, 502, 503, 504]`. */
  http_statuses?: number[];
  /** Also retry POST requests on failures that may have been processed. Default false. */
  retry_non_idempotent?: boolean;
}

export interface RequestHookContext {
  method: string;
  /** API path, e.g. `/order/get_order_list`. */
  path: string;
  /** Full URL with `access_token` and `sign` redacted. */
  url: string;
  /** 1 for the first attempt, incremented on each retry. */
  attempt: number;
}

export interface ResponseHookContext extends RequestHookContext {
  status: number;
  duration_ms: number;
  request_id?: string;
}

export interface ErrorHookContext extends RequestHookContext {
  error: unknown;
  duration_ms: number;
  /** True when the SDK will retry this request. */
  will_retry: boolean;
}

/**
 * Observability hooks. They are called synchronously; errors thrown (or promises rejected)
 * by a hook are ignored so they never affect the request.
 */
export interface ShopeeHooks {
  onRequest?: (context: RequestHookContext) => void | Promise<void>;
  onResponse?: (context: ResponseHookContext) => void | Promise<void>;
  onError?: (context: ErrorHookContext) => void | Promise<void>;
}

/**
 * A file for multipart upload fields when a bare Buffer is not enough, for example to set
 * the filename or content type of a video or PDF.
 */
export interface UploadFile {
  data: Buffer | Uint8Array | Blob;
  filename?: string;
  contentType?: string;
}
