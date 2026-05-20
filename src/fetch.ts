import fetch, { Blob, FormData, RequestInit, Response, Headers, HeadersInit } from "node-fetch";
import { ShopeeConfig } from "./sdk.js";
import { FetchOptions } from "./schemas/fetch.js";
import { ShopeeApiError, ShopeeSdkError } from "./errors.js";
import { generateSignature } from "./utils/signature.js";
import { SDK_VERSION } from "./version.js";

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

function hasBinaryValue(value: unknown): boolean {
  return Array.isArray(value) ? value.some(hasBinaryValue) : isBinaryLike(value);
}

function isFormDataBody(body: unknown): body is FormData {
  return body instanceof FormData;
}

function appendFormValue(formData: FormData, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => appendFormValue(formData, key, item));
    return;
  }

  if (Buffer.isBuffer(value)) {
    formData.append(key, new Blob([value]), `${key}.bin`);
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
  body: RequestInit["body"];
  isMultipart: boolean;
} {
  if (body === undefined) {
    return { body: undefined, isMultipart: false };
  }

  if (isFormDataBody(body)) {
    return { body: body as RequestInit["body"], isMultipart: true };
  }

  if (typeof body === "object" && body !== null && !Array.isArray(body)) {
    const bodyEntries = Object.entries(body as Record<string, unknown>);

    if (bodyEntries.some(([, value]) => hasBinaryValue(value))) {
      const formData = new FormData();
      bodyEntries.forEach(([key, value]) => appendFormValue(formData, key, value));
      return { body: formData as RequestInit["body"], isMultipart: true };
    }
  }

  return { body: body !== undefined ? JSON.stringify(body) : undefined, isMultipart: false };
}

export class ShopeeFetch {
  public static async fetch<T>(
    config: ShopeeConfig,
    path: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", params = {}, body } = options;
    const url = new URL(`${config.base_url}${path}`);
    // Add required parameters
    const timestamp = Math.floor(Date.now() / 1000);
    let signature = generateSignature(config.partner_key, [
      config.partner_id.toString(),
      url.pathname,
      timestamp.toString(),
    ]);

    // Add query parameters
    Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
    const allParams = {
      partner_id: config.partner_id,
      timestamp,
      ...params,
    };

    let authParams = {};

    if (options.auth) {
      let token = await config.sdk?.getAuthToken();
      if (token?.expired_at && token.expired_at < Date.now()) {
        token = await config.sdk?.refreshToken();
      }
      if (!token) {
        throw new ShopeeSdkError("No access token found");
      }
      authParams = {
        access_token: token?.access_token,
        shop_id: token?.shop_id,
      };
      signature = generateSignature(config.partner_key, [
        config.partner_id.toString(),
        url.pathname,
        timestamp.toString(),
        token?.access_token,
        token?.shop_id!.toString(),
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

    const { body: requestBody, isMultipart } = serializeRequestBody(body);

    // Prepare headers
    const headers = new Headers();
    if (!isMultipart) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("User-Agent", `congminh1254/shopee-sdk/v${SDK_VERSION}`);
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, value as string);
      });
    }

    // Prepare fetch options
    const requestOptions: RequestInit = {
      method,
      headers: headers as unknown as HeadersInit,
      body: requestBody,
      agent: config.agent,
    };

    try {
      const response: Response = await fetch(url.toString(), requestOptions);
      const responseType = response.headers.get("Content-Type");

      if (
        responseType?.includes("application/pdf") ||
        responseType?.includes("application/octet-stream")
      ) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer) as unknown as T;
      }

      const responseData: unknown =
        responseType?.indexOf("application/json") !== -1
          ? await response.json()
          : await response.text();

      if (responseType?.indexOf("application/json") !== -1) {
        // Type guard for JSON response with error field
        const jsonData = responseData as Record<string, unknown>;
        if (jsonData.error) {
          // Handle invalid access token error
          if (jsonData.error === "invalid_acceess_token" && options.auth) {
            try {
              // Attempt to refresh the access token
              await config.sdk?.refreshToken();
              // Retry the request with the new token
              return this.fetch(config, path, options);
            } catch {
              // If refresh fails, throw the original error
              throw new ShopeeApiError(response.status, jsonData);
            }
          }
          throw new ShopeeApiError(response.status, jsonData);
        }

        const data = responseData as T;
        return data;
      }
      throw new ShopeeSdkError(`Unknown response type: ${responseType}\n${responseData}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Re-throw our custom errors as-is
        if (error instanceof ShopeeApiError || error instanceof ShopeeSdkError) {
          throw error;
        }
        if (error.name === "FetchError") {
          // Network error
          throw new ShopeeSdkError(`Network error: ${error.message}`);
        }
        // Other errors
        throw new ShopeeSdkError(`Unexpected error: ${error.message}`);
      }
      throw new ShopeeSdkError("Unknown error occurred");
    }
  }
}
