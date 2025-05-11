import { ShopeeFetch } from "../fetch.js";
import { BaseManager } from "./base.manager.js";
export class AuthManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    async getAccessToken(code, shopId, mainAccountId) {
        const body = {
            code,
            partner_id: this.config.partner_id,
        };
        if (shopId) {
            body.shop_id = shopId;
        }
        if (mainAccountId) {
            body.main_account_id = mainAccountId;
        }
        const response = await ShopeeFetch.fetch(this.config, "/auth/token/get", {
            method: "POST",
            body,
        });
        if (!response.expired_at && response.expire_in) {
            response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
        }
        return {
            ...response,
            shop_id: shopId,
        };
    }
    async getAccessTokenByResendCode(code) {
        const body = {
            resend_code: code,
        };
        const response = await ShopeeFetch.fetch(this.config, "/public/get_token_by_resend_code", {
            method: "POST",
            body,
        });
        if (!response.expired_at && response.expire_in) {
            response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
        }
        return response;
    }
    async getRefreshToken(refreshToken, shopId, merchantId) {
        const body = {
            partner_id: this.config.partner_id,
            refresh_token: refreshToken,
        };
        if (shopId) {
            body.shop_id = shopId;
        }
        if (merchantId) {
            body.merchant_id = merchantId;
        }
        const response = await ShopeeFetch.fetch(this.config, "/auth/access_token/get", {
            method: "POST",
            body,
        });
        if (!response.expired_at && response.expire_in) {
            response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
        }
        return {
            ...response,
            shop_id: shopId,
        };
    }
}
//# sourceMappingURL=auth.manager.js.map