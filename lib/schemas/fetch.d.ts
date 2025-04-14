import { RequestInit } from 'node-fetch';
export type FetchOptions = Omit<RequestInit, 'body'> & {
    params?: Record<string, string | number | boolean | undefined | null>;
    body?: Record<string, string | number | boolean | undefined | null>;
    auth?: boolean;
};
export interface FetchResponse<T> {
    result: T;
    response: T;
    request_id: string;
    error: string;
    message: string;
}
