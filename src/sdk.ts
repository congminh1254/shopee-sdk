import { ProductManager } from './managers/product.manager.js';
import { OrderManager } from './managers/order.manager.js';
import { AuthManager } from './managers/auth.manager.js';
import { ShopeeRegion, SHOPEE_BASE_URLS } from './schemas/region.js';
import { FetchOptions, FetchResponse } from './schemas/fetch.js';
import { TokenStorage } from './storage/token-storage.interface.js';
import { CustomTokenStorage } from './storage/custom-token-storage.js';
import { AccessToken } from './schemas/access-token.js';
import { ShopeeSdkError } from './errors.js';
import { PublicManager } from './managers/public.manager.js';
import { PushManager } from './managers/push.manager.js';
import { generateSignature } from './utils/signature.js';
import { PaymentManager } from './managers/payment.manager.js';
import { LogisticsManager } from './managers/logistics.manager.js';

export interface ShopeeConfig {
  partner_id: number;
  partner_key: string;
  region?: ShopeeRegion;
  base_url?: string;
  sdk?: ShopeeSDK;
  shop_id?: number;
}

export class ShopeeSDK {
  private config: ShopeeConfig;
  private tokenStorage: TokenStorage;
  public readonly product: ProductManager;
  public readonly order: OrderManager;
  public readonly auth: AuthManager;
  public readonly public: PublicManager;
  public readonly push: PushManager;
  public readonly payment: PaymentManager;
  public readonly logistics: LogisticsManager;
  constructor(config: ShopeeConfig, tokenStorage?: TokenStorage) {
    this.config = {
      region: ShopeeRegion.GLOBAL,
      ...config,
      base_url:
        config.base_url ||
        (config.region ? SHOPEE_BASE_URLS[config.region] : SHOPEE_BASE_URLS[ShopeeRegion.GLOBAL]),
      sdk: this,
    };

    // Initialize token storage
    this.tokenStorage = tokenStorage || new CustomTokenStorage(config.shop_id);

    // Initialize managers
    this.product = new ProductManager(this.config);
    this.order = new OrderManager(this.config);
    this.auth = new AuthManager(this.config);
    this.public = new PublicManager(this.config);
    this.push = new PushManager(this.config);
    this.payment = new PaymentManager(this.config);
    this.logistics = new LogisticsManager(this.config);
  }

  public getConfig(): ShopeeConfig {
    return this.config;
  }

  public setRegion(region: ShopeeRegion): void {
    this.config.region = region;
    this.config.base_url = SHOPEE_BASE_URLS[region];
  }

  public setBaseUrl(baseUrl: string): void {
    this.config.base_url = baseUrl;
    this.config.region = undefined;
  }

  public getAuthorizationUrl(redirect_uri: string): string {
    const timestamp = Math.floor(Date.now() / 1000);
    return `${this.config.base_url}/shop/auth_partner?partner_id=${this.config.partner_id}&timestamp=${timestamp}&redirect=${redirect_uri}&sign=${generateSignature(
      this.config.partner_key,
      [
        this.config.partner_id.toString(),
        '/api/v2/shop/auth_partner',
        timestamp.toString()
      ]
    )}`;
  }

  public async authenticateWithCode(
    code: string,
    shopId?: number,
    mainAccountId?: number
  ): Promise<AccessToken | null> {
    const token = await this.auth.getAccessToken(code, shopId, mainAccountId);
    await this.tokenStorage.store(token);
    return token;
  }

  public async getAuthToken(): Promise<AccessToken | null> {
    return this.tokenStorage.get();
  }

  public async refreshToken(shop_id?: number, merchant_id?: number): Promise<AccessToken | null> {
    const old_token = await this.tokenStorage.get();
    if (!old_token) {
      throw new ShopeeSdkError('No token found to refresh');
    }
    const token = await this.auth.getRefreshToken(
      old_token.refresh_token,
      shop_id ?? old_token.shop_id,
      merchant_id
    );
    if (!token) {
      return null;
    }

    await this.tokenStorage.store(token);
    return token;
  }
}

export default ShopeeSDK;
