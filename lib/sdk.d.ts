import { ProductManager } from "./managers/product.manager.js";
import { OrderManager } from "./managers/order.manager.js";
import { AuthManager } from "./managers/auth.manager.js";
import { ShopeeRegion } from "./schemas/region.js";
import { TokenStorage } from "./storage/token-storage.interface.js";
import { AccessToken } from "./schemas/access-token.js";
import { PublicManager } from "./managers/public.manager.js";
import { PushManager } from "./managers/push.manager.js";
import { PaymentManager } from "./managers/payment.manager.js";
import { LogisticsManager } from "./managers/logistics.manager.js";
import { VoucherManager } from "./managers/voucher.manager.js";
import { AdsManager } from "./managers/ads.manager.js";
import { AccountHealthManager } from "./managers/account-health.manager.js";
import { Agent } from "node:http";
export interface ShopeeConfig {
    partner_id: number;
    partner_key: string;
    region?: ShopeeRegion;
    base_url?: string;
    sdk?: ShopeeSDK;
    shop_id?: number;
    agent?: Agent;
}
export declare class ShopeeSDK {
    private config;
    private tokenStorage;
    readonly ads: AdsManager;
    readonly product: ProductManager;
    readonly order: OrderManager;
    readonly auth: AuthManager;
    readonly public: PublicManager;
    readonly push: PushManager;
    readonly payment: PaymentManager;
    readonly logistics: LogisticsManager;
    readonly voucher: VoucherManager;
    readonly accountHealth: AccountHealthManager;
    constructor(config: ShopeeConfig, tokenStorage?: TokenStorage);
    getConfig(): ShopeeConfig;
    setRegion(region: ShopeeRegion): void;
    setBaseUrl(baseUrl: string): void;
    setFetchAgent(fetchAgent: Agent): void;
    getAuthorizationUrl(redirect_uri: string): string;
    authenticateWithCode(code: string, shopId?: number, mainAccountId?: number): Promise<AccessToken | null>;
    getAuthToken(): Promise<AccessToken | null>;
    refreshToken(shop_id?: number, merchant_id?: number): Promise<AccessToken | null>;
}
export default ShopeeSDK;
