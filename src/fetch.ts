// Use native fetch in browsers, node-fetch in Node.js
import nodeFetch from "node-fetch";
import { ShopeeConfig } from "./sdk.js";
import { FetchOptions } from "./schemas/fetch.js";
import { ShopeeApiError, ShopeeSdkError } from "./errors.js";
import { generateSignature } from "./utils/signature.js";
import { SDK_VERSION } from "./version.js";

// In browsers, use native fetch. In Node.js, always use node-fetch for consistency
const fetchImpl = (
  typeof window !== "undefined" && typeof fetch !== "undefined" ? fetch : nodeFetch
) as typeof fetch;

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

    // Prepare headers
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
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
      body: body ? JSON.stringify(body) : undefined,
    };

    // Add agent only in Node.js environment (not available in browsers)
    // We need to cast to unknown first because agent is not part of standard RequestInit
    if (typeof window === "undefined" && config.agent) {
      (requestOptions as unknown as { agent: typeof config.agent }).agent = config.agent;
    }

    try {
      const response: Response = await fetchImpl(url.toString(), requestOptions);
      const responseType = response.headers.get("Content-Type");
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
            } catch (refreshError) {
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
      // Re-throw our custom errors as-is
      if (error instanceof ShopeeApiError || error instanceof ShopeeSdkError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "FetchError" || error.name === "TypeError") {
          // Network error (FetchError from node-fetch, TypeError from native fetch)
          throw new ShopeeSdkError(`Network error: ${error.message}`);
        }
        // Other errors
        throw new ShopeeSdkError(`Unexpected error: ${error.message}`);
      }

      throw new ShopeeSdkError("Unknown error occurred");
    }
  }
}
