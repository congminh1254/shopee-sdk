export class ShopeeSdkError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ShopeeSdkError";
  }
}

function readString(data: unknown, key: string): string | undefined {
  if (data && typeof data === "object" && key in data) {
    const value = (data as Record<string, unknown>)[key];
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
}

/** The Shopee API answered with a JSON error payload (`error` field set). */
export class ShopeeApiError extends Error {
  public readonly status: number;
  public readonly data: unknown;
  /** Shopee error code from the response, e.g. `error_param` or `error_rate_limit`. */
  public readonly error?: string;
  /** Human readable message returned by Shopee. */
  public readonly apiMessage?: string;
  /** Shopee request id, useful when contacting Shopee support. */
  public readonly requestId?: string;

  constructor(status: number, data: unknown, options?: { cause?: unknown }) {
    super(`API Error: ${status} - ${JSON.stringify(data)}`, options);
    this.name = "ShopeeApiError";
    this.status = status;
    this.data = data;
    this.error = readString(data, "error");
    this.apiMessage = readString(data, "message");
    this.requestId = readString(data, "request_id");
  }
}

/** The request could not be completed (DNS, connection reset, TLS, ...). */
export class ShopeeNetworkError extends ShopeeSdkError {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ShopeeNetworkError";
  }
}

/** The request exceeded the configured `timeout_ms`. */
export class ShopeeTimeoutError extends ShopeeNetworkError {
  public readonly timeoutMs: number;

  constructor(timeoutMs: number, options?: { cause?: unknown }) {
    super(`Request timed out after ${timeoutMs}ms`, options);
    this.name = "ShopeeTimeoutError";
    this.timeoutMs = timeoutMs;
  }
}

/** The server answered with a response the SDK cannot interpret (e.g. an HTML 502 page). */
export class ShopeeHttpError extends ShopeeSdkError {
  public readonly status: number;
  public readonly contentType: string;
  public readonly body: string;

  constructor(
    message: string,
    details: { status: number; contentType: string; body: string },
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = "ShopeeHttpError";
    this.status = details.status;
    this.contentType = details.contentType;
    this.body = details.body;
  }
}
