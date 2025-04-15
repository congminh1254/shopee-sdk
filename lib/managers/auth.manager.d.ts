import { ShopeeConfig } from '../sdk.js';
import { AccessToken } from '../schemas/access-token.js';
import { BaseManager } from './base.manager.js';
export declare class AuthManager extends BaseManager {
    constructor(config: ShopeeConfig);
    getAccessToken(code: string, shopId?: number, mainAccountId?: number): Promise<AccessToken>;
    getAccessTokenByResendCode(code: string): Promise<AccessToken>;
    getRefreshToken(refreshToken: string, shopId?: number, merchantId?: number): Promise<AccessToken>;
}
