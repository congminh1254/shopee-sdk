export type AuthMode = "partner" | "shop" | "merchant" | "user" | "token";

export type FetchOptions = Omit<RequestInit, "body"> & {
  params?: any;
  body?: unknown;
  auth?: boolean;
  authMode?: AuthMode;
  timestampPaths?: string[];
};

export interface ResponseMetadata {
  request_id: string;
  error?: string;
  message?: string;
}

export interface FetchResponse<T> extends ResponseMetadata {
  result?: T;
  response: T;
  request_id: string;
  error?: string;
  message?: string;
  [key: string]: any;
}

/** Safe integers are numbers; larger integer tokens are exact decimal strings. */
export type Integer = number | string;
export type BinaryFile = Buffer | Blob;

export type BinaryFiles = BinaryFile | readonly BinaryFile[];
