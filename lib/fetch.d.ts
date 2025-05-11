import { ShopeeConfig } from "./sdk.js";
import { FetchOptions } from "./schemas/fetch.js";
export declare class ShopeeFetch {
    static fetch<T>(config: ShopeeConfig, path: string, options?: FetchOptions): Promise<T>;
}
