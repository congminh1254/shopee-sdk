import fetch, { Headers } from 'node-fetch';
import { ShopeeApiError, ShopeeSdkError } from './errors.js';
import { generateSignature } from './utils/signature.js';
export class ShopeeFetch {
    static async fetch(config, path, options = {}) {
        const { method = 'GET', params = {}, body, ...restOptions } = options;
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
            const token = await config.sdk?.getAuthToken();
            if (!token) {
                throw new ShopeeSdkError('No access token found');
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
                token?.shop_id.toString(),
            ]);
        }
        Object.entries({ ...allParams, ...authParams, sign: signature }).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
        // Prepare headers
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        if (options.headers) {
            Object.entries(options.headers).forEach(([key, value]) => {
                headers.set(key, value);
            });
        }
        // Prepare fetch options
        const requestOptions = {
            method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        };
        try {
            const response = await fetch(url.toString(), requestOptions);
            const responseType = response.headers.get('Content-Type');
            const responseData = responseType?.indexOf('application/json') !== -1
                ? await response.json()
                : await response.text();
            if (responseType?.indexOf('application/json') !== -1) {
                if (responseData.error) {
                    // Handle invalid access token error
                    if (responseData.error === 'invalid_acceess_token' && options.auth) {
                        try {
                            // Attempt to refresh the access token
                            await config.sdk?.refreshToken();
                            // Retry the request with the new token
                            return this.fetch(config, path, options);
                        }
                        catch (refreshError) {
                            // If refresh fails, throw the original error
                            throw new ShopeeApiError(response.status, responseData);
                        }
                    }
                    throw new ShopeeApiError(response.status, responseData);
                }
                const data = responseData;
                return data;
            }
            throw new ShopeeSdkError(`Unknown response type: ${responseType}\n${responseData}`);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.name === 'FetchError') {
                    // Network error
                    throw new ShopeeSdkError(`Network error: ${error.message}`);
                }
                // Other errors
                throw new ShopeeSdkError(`Unexpected error: ${error.message}`);
            }
            throw new ShopeeSdkError('Unknown error occurred');
        }
    }
}
//# sourceMappingURL=fetch.js.map