export type FetchOptions = Omit<RequestInit, "body"> & {
  params?: any;
  body?: unknown;
  /** true preserves shop authentication; "user" signs with the selected user_id. */
  auth?: boolean | "user";
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
