import { ProductManager } from './managers/product.manager.js';
import { OrderManager } from './managers/order.manager.js';
import { AuthManager } from './managers/auth.manager.js';
import { ShopeeRegion } from './schemas/region.js';
import { TokenStorage } from './storage/token-storage.interface.js';
import { AccessToken } from './schemas/access-token.js';
import { PublicManager } from './managers/public.manager.js';
import { PushManager } from './managers/push.manager.js';
export interface ShopeeConfig {
    partner_id: number;
    partner_key: string;
    region?: ShopeeRegion;
    base_url?: string;
    sdk?: ShopeeSDK;
    shop_id?: number;
}
export declare class ShopeeSDK {
    private config;
    private tokenStorage;
    readonly product: ProductManager;
    readonly order: OrderManager;
    readonly auth: AuthManager;
    readonly public: PublicManager;
    readonly push: PushManager;
    constructor(config: ShopeeConfig, tokenStorage?: TokenStorage);
    getConfig(): ShopeeConfig;
    setRegion(region: ShopeeRegion): void;
    setBaseUrl(baseUrl: string): void;
    getAuthorizationUrl(redirect_uri: string): string;
    authenticateWithCode(code: string, shopId?: number, mainAccountId?: number): Promise<AccessToken | null>;
    getAuthToken(): Promise<AccessToken | null>;
    refreshToken(shop_id?: number, merchant_id?: number): Promise<AccessToken | null>;
}
export default ShopeeSDK;
