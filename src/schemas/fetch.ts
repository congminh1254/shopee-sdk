export type FetchOptions = Omit<RequestInit, "body"> & {
  params?: Record<
    string,
    string | number | boolean | undefined | null | (string | number | boolean)[]
  >;
  body?: unknown;
  auth?: boolean;
};

export interface FetchResponse<T> {
  result: T;
  response: T;
  request_id: string;
  error: string;
  message: string;
}
