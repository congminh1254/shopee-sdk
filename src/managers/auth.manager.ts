import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import { AccessToken } from "../schemas/access-token.js";
import { GetTokenByResendCodeRequest } from "../schemas/public.js";
import { ShopeeSdkError } from "../errors.js";
import { BaseManager } from "./base.manager.js";

export class AuthManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /** Exchange a code; userId selects an entry from the returned user_id_list locally. */
  public async getAccessToken(
    code: string,
    shopId?: number,
    mainAccountId?: number,
    userId?: number
  ): Promise<AccessToken> {
    if (userId !== undefined && (!Number.isSafeInteger(userId) || userId < 0)) {
      throw new ShopeeSdkError("Invalid user_id");
    }
    if (userId !== undefined && shopId !== undefined) {
      throw new ShopeeSdkError("Select either shop_id or user_id, not both");
    }
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

    // Code exchange returns authorized users; user_id is not a request field.
    const selectedUserId =
      shopId === undefined
        ? (userId ??
          response.user_id ??
          (response.user_id_list?.length === 1 ? response.user_id_list[0] : undefined))
        : undefined;
    if (userId !== undefined && response.user_id_list && !response.user_id_list.includes(userId)) {
      throw new ShopeeSdkError("Selected user_id was not authorized by this code");
    }
    return {
      ...response,
      shop_id: shopId,
      ...(selectedUserId !== undefined ? { user_id: selectedUserId } : {}),
    };
  }

  public async getAccessTokenByResendCode(
    params: GetTokenByResendCodeRequest
  ): Promise<AccessToken> {
    const response: AccessToken = await ShopeeFetch.fetch<AccessToken>(
      this.config,
      "/public/get_token_by_resend_code",
      {
        method: "POST",
        body: params,
      }
    );

    if (!response.expired_at && response.expire_in) {
      response.expired_at = Date.now() + response.expire_in * 1000 - 60 * 1000;
    }

    return response;
  }

  /** Refresh one identity. For users, pass undefined shop/merchant IDs and the userId. */
  public async getRefreshToken(
    refreshToken: string,
    shopId?: number,
    merchantId?: number,
    userId?: number
  ): Promise<AccessToken> {
    if (userId !== undefined && (!Number.isSafeInteger(userId) || userId < 0)) {
      throw new ShopeeSdkError("Invalid user_id");
    }
    if (userId !== undefined && (shopId !== undefined || merchantId !== undefined)) {
      throw new ShopeeSdkError("Refresh user_id separately from shop_id or merchant_id");
    }
    const body: Record<string, string | number | boolean> = {
      partner_id: this.config.partner_id,
      refresh_token: refreshToken,
    };
    if (userId !== undefined) {
      body.user_id = userId;
    }

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
      ...(userId !== undefined ? { user_id: userId } : {}),
    };
  }
}
