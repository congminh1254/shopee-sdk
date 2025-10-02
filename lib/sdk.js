import { ProductManager } from "./managers/product.manager.js";
import { OrderManager } from "./managers/order.manager.js";
import { AuthManager } from "./managers/auth.manager.js";
import { ShopeeRegion, SHOPEE_BASE_URLS } from "./schemas/region.js";
import { CustomTokenStorage } from "./storage/custom-token-storage.js";
import { ShopeeSdkError } from "./errors.js";
import { PublicManager } from "./managers/public.manager.js";
import { PushManager } from "./managers/push.manager.js";
import { generateSignature } from "./utils/signature.js";
import { PaymentManager } from "./managers/payment.manager.js";
import { LogisticsManager } from "./managers/logistics.manager.js";
import { VoucherManager } from "./managers/voucher.manager.js";
import { AdsManager } from "./managers/ads.manager.js";
import { AccountHealthManager } from "./managers/account-health.manager.js";
import { ShopManager } from "./managers/shop.manager.js";
export class ShopeeSDK {
    constructor(config, tokenStorage) {
        this.config = {
            region: ShopeeRegion.GLOBAL,
            ...config,
            base_url: config.base_url ||
                (config.region ? SHOPEE_BASE_URLS[config.region] : SHOPEE_BASE_URLS[ShopeeRegion.GLOBAL]),
            sdk: this,
        };
        // Initialize token storage
        this.tokenStorage = tokenStorage || new CustomTokenStorage(config.shop_id);
        // Initialize managers
        this.ads = new AdsManager(this.config);
        this.product = new ProductManager(this.config);
        this.order = new OrderManager(this.config);
        this.auth = new AuthManager(this.config);
        this.public = new PublicManager(this.config);
        this.push = new PushManager(this.config);
        this.payment = new PaymentManager(this.config);
        this.logistics = new LogisticsManager(this.config);
        this.voucher = new VoucherManager(this.config);
        this.accountHealth = new AccountHealthManager(this.config);
        this.shop = new ShopManager(this.config);
    }
    getConfig() {
        return this.config;
    }
    setRegion(region) {
        this.config.region = region;
        this.config.base_url = SHOPEE_BASE_URLS[region];
    }
    setBaseUrl(baseUrl) {
        this.config.base_url = baseUrl;
        this.config.region = undefined;
    }
    setFetchAgent(fetchAgent) {
        this.config.agent = fetchAgent;
    }
    getAuthorizationUrl(redirect_uri) {
        const timestamp = Math.floor(Date.now() / 1000);
        return `${this.config.base_url}/shop/auth_partner?partner_id=${this.config.partner_id}&timestamp=${timestamp}&redirect=${redirect_uri}&sign=${generateSignature(this.config.partner_key, [this.config.partner_id.toString(), "/api/v2/shop/auth_partner", timestamp.toString()])}`;
    }
    async authenticateWithCode(code, shopId, mainAccountId) {
        const token = await this.auth.getAccessToken(code, shopId, mainAccountId);
        await this.tokenStorage.store(token);
        return token;
    }
    async getAuthToken() {
        return this.tokenStorage.get();
    }
    async refreshToken(shop_id, merchant_id) {
        const old_token = await this.tokenStorage.get();
        if (!old_token) {
            throw new ShopeeSdkError("No token found to refresh");
        }
        const token = await this.auth.getRefreshToken(old_token.refresh_token, shop_id ?? old_token.shop_id, merchant_id);
        if (!token) {
            return null;
        }
        await this.tokenStorage.store(token);
        return token;
    }
}
export default ShopeeSDK;
//# sourceMappingURL=sdk.js.map