import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import { AccessToken } from "../schemas/access-token.js";
import { BaseManager } from "./base.manager.js";

export class AuthManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  public async getAccessToken(
    code: string,
    shopId?: number,
    mainAccountId?: number
  ): Promise<AccessToken> {
    const body: Record<string, string | number | boolean> = {
      code,
      partner_id: this.config.partner_id,
    };

    if (shopId) {
      body.shop_id = shopId;
    }

    if (mainAccountId) {
      body.main_account_id = mainAccountId;
    }

    const response: AccessToken = await ShopeeFetch.fetch<AccessToken>(
      this.config,
      "/auth/token/get",
      {
        method: "POST",
        body,
      }
    );

    if (!response.expired_at && response.expire_in) {
      response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
    }

    return {
      ...response,
      shop_id: shopId,
    };
  }

  public async getAccessTokenByResendCode(code: string): Promise<AccessToken> {
    const body: Record<string, string | number | boolean> = {
      resend_code: code,
    };

    const response: AccessToken = await ShopeeFetch.fetch<AccessToken>(
      this.config,
      "/public/get_token_by_resend_code",
      {
        method: "POST",
        body,
      }
    );

    if (!response.expired_at && response.expire_in) {
      response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
    }

    return response;
  }

  public async getRefreshToken(
    refreshToken: string,
    shopId?: number,
    merchantId?: number
  ): Promise<AccessToken> {
    const body: Record<string, string | number | boolean> = {
      partner_id: this.config.partner_id,
      refresh_token: refreshToken,
    };

    if (shopId) {
      body.shop_id = shopId;
    }

    if (merchantId) {
      body.merchant_id = merchantId;
    }

    const response: AccessToken = await ShopeeFetch.fetch<AccessToken>(
      this.config,
      "/auth/access_token/get",
      {
        method: "POST",
        body,
      }
    );

    if (!response.expired_at && response.expire_in) {
      response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
    }

    return {
      ...response,
      shop_id: shopId,
    };
  }
}
