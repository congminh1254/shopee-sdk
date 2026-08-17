export type FetchOptions = Omit<RequestInit, "body"> & {
  params?: any;
  body?: unknown;
  auth?: boolean;
  timestampPaths?: string[];
};

export interface FetchResponse<T> {
  result?: T;
  response: T;
  request_id: string;
  error: string;
  message: string;
  [key: string]: any;
}
