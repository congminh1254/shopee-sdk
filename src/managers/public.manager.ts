import {
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  GetMerchantsByPartnerRequest,
  GetMerchantsByPartnerResponse,
  GetShopeeIpRangesRequest,
  GetShopeeIpRangesResponse,
  GetShopsByPartnerRequest,
  GetShopsByPartnerResponse,
  GetTokenByResendCodeRequest,
  GetTokenByResendCodeResponse,
  RefreshAccessTokenRequest,
  RefreshAccessTokenResponse,
} from "../schemas/public.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class PublicManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use the code from the authorization step to call this API to obtain the authorized shop_id, merchant_id, supplier_id, or user_id, and its corresponding access_token and refresh_token.
   *
   * @param {GetAccessTokenRequest} params Request parameters
   * @returns {Promise<GetAccessTokenResponse>} Promise resolving to the response
   */
  public async getAccessToken(params?: GetAccessTokenRequest): Promise<GetAccessTokenResponse> {
    return ShopeeFetch.fetch<GetAccessTokenResponse>(this.config, "/auth/token/get", {
      method: "POST",
      body: params,
      timestampPaths: ["expire_in"],
    });
  }
  /**
   * Use this API to get basic info of merchants which have authorized to the partner.
   *
   * @param {GetMerchantsByPartnerRequest} params Request parameters
   * @returns {Promise<GetMerchantsByPartnerResponse>} Promise resolving to the response
   */
  public async getMerchantsByPartner(
    params?: GetMerchantsByPartnerRequest
  ): Promise<GetMerchantsByPartnerResponse> {
    return ShopeeFetch.fetch<GetMerchantsByPartnerResponse>(
      this.config,
      "/public/get_merchants_by_partner",
      {
        method: "GET",
        params: params,
        timestampPaths: ["authed_merchant_list.auth_time", "authed_merchant_list.expire_time"],
      }
    );
  }
  /**
   * You can get shopee ip address ranges through this open api.
   *
   * @param {GetShopeeIpRangesRequest} params Request parameters
   * @returns {Promise<GetShopeeIpRangesResponse>} Promise resolving to the response
   */
  public async getShopeeIpRanges(
    params?: GetShopeeIpRangesRequest
  ): Promise<GetShopeeIpRangesResponse> {
    return ShopeeFetch.fetch<GetShopeeIpRangesResponse>(
      this.config,
      "/public/get_shopee_ip_ranges",
      {
        method: "GET",
        params: params,
      }
    );
  }
  /**
   * get basic info of shops which have authorized to the partner.
   *
   * @param {GetShopsByPartnerRequest} params Request parameters
   * @returns {Promise<GetShopsByPartnerResponse>} Promise resolving to the response
   */
  public async getShopsByPartner(
    params?: GetShopsByPartnerRequest
  ): Promise<GetShopsByPartnerResponse> {
    return ShopeeFetch.fetch<GetShopsByPartnerResponse>(
      this.config,
      "/public/get_shops_by_partner",
      {
        method: "GET",
        params: params,
        timestampPaths: ["authed_shop_list.auth_time", "authed_shop_list.expire_time"],
      }
    );
  }
  /**
   * Use the resend code to get access token and refresh token. When you lost your access token or refresh token, you can go to authorization management page to resend code by yourselves. You can only use this endpoint in live environment, we don't support in test-stable environment.
   *
   * @param {GetTokenByResendCodeRequest} params Request parameters
   * @returns {Promise<GetTokenByResendCodeResponse>} Promise resolving to the response
   */
  public async getTokenByResendCode(
    params?: GetTokenByResendCodeRequest
  ): Promise<GetTokenByResendCodeResponse> {
    return ShopeeFetch.fetch<GetTokenByResendCodeResponse>(
      this.config,
      "/public/get_token_by_resend_code",
      {
        method: "POST",
        body: params,
      }
    );
  }
  /**
   * Use this API to refresh the access_token after it expires. Refresh_token can be used once only, this API will also return a new refresh_token. Please use the new refresh_token for the next RefreshAccessToken call
   *
   * @param {RefreshAccessTokenRequest} params Request parameters
   * @returns {Promise<RefreshAccessTokenResponse>} Promise resolving to the response
   */
  public async refreshAccessToken(
    params?: RefreshAccessTokenRequest
  ): Promise<RefreshAccessTokenResponse> {
    return ShopeeFetch.fetch<RefreshAccessTokenResponse>(this.config, "/auth/access_token/get", {
      method: "POST",
      body: params,
      timestampPaths: ["expire_in"],
    });
  }
}
