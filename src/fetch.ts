import nodeFetch, {
  File as NodeFetchFile,
  FormData as NodeFetchFormData,
  Headers as NodeFetchHeaders,
} from "node-fetch";
import { ShopeeConfig } from "./sdk.js";
import { FetchOptions } from "./schemas/fetch.js";
import { ShopeeApiError, ShopeeSdkError } from "./errors.js";
import { generateSignature } from "./utils/signature.js";
import { SDK_VERSION } from "./version.js";

const isMock = typeof (nodeFetch as any).mock === "object";

const fetchFn = isMock ? nodeFetch : globalThis.fetch || nodeFetch;
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

function hasBinaryValue(value: unknown): boolean {
  return Array.isArray(value) ? value.some(hasBinaryValue) : isBinaryLike(value);
}

function isFormDataBody(body: unknown): boolean {
  return body instanceof FormDataClass;
}

function appendFormValue(formData: any, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => appendFormValue(formData, key, item));
    return;
  }

  if (Buffer.isBuffer(value)) {
    let ext = "bin";
    if (value.length >= 4) {
      const hex = value.toString("hex", 0, 4).toLowerCase();
      if (hex.startsWith("89504e47")) {
        ext = "png";
      } else if (hex.startsWith("ffd8ff")) {
        ext = "jpg";
      } else if (hex.startsWith("47494638")) {
        ext = "gif";
      }
    }
    let mime = "application/octet-stream";
    if (ext === "png") {
      mime = "image/png";
    } else if (ext === "jpg") {
      mime = "image/jpeg";
    } else if (ext === "gif") {
      mime = "image/gif";
    }
    const file = new FileClass([new Uint8Array(value)], `${key}.${ext}`, { type: mime });
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

export class ShopeeFetch {
  public static async fetch<T>(
    config: ShopeeConfig,
    path: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const serializedParams = serializeDates(options.params || {}) as Record<string, any>;
    const serializedBody = serializeDates(options.body);
    const { method = "GET" } = options;
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
    const allParams = {
      partner_id: config.partner_id,
      timestamp,
      ...serializedParams,
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

    const { body: requestBody, isMultipart } = serializeRequestBody(serializedBody);

    // Prepare headers
    const headers = new HeadersClass() as any;
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
    const requestOptions: any = {
      method,
      headers: headers as unknown as HeadersInit,
      body: requestBody,
    };
    if (config.agent) {
      requestOptions.agent = config.agent;
    }

    try {
      const response: any = await fetchFn(url.toString(), requestOptions);
      const responseType =
        response.headers.get("Content-Type") || response.headers.get("content-type") || "";

      if (
        responseType.includes("application/pdf") ||
        responseType.includes("application/octet-stream")
      ) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer) as unknown as T;
      }

      const isJson = !responseType || !!responseType.toLowerCase().includes("json");

      const responseData: unknown = isJson ? await response.json() : await response.text();

      if (isJson) {
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

        if (options.timestampPaths && options.timestampPaths.length > 0) {
          deserializeTimestamps(jsonData, options.timestampPaths);
        }

        const data = jsonData as T;
        return data;
      }
      throw new ShopeeSdkError(`Unknown response type: ${responseType}\n${responseData}`);
    } catch (error: any) {
      if (error instanceof ShopeeApiError || error instanceof ShopeeSdkError) {
        throw error;
      }
      if (error && typeof error === "object") {
        const message = error.message || String(error);
        const name = error.name || "";
        if (name === "FetchError" || name === "TypeError") {
          throw new ShopeeSdkError(`Network error: ${message}`);
        }
        throw new ShopeeSdkError(`Unexpected error: ${message}`);
      }
      throw new ShopeeSdkError(`Unknown error occurred: ${error}`);
    }
  }
}
