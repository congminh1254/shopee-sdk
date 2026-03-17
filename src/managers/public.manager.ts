import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import {
  GetShopsByPartnerParams,
  GetMerchantsByPartnerParams,
  GetShopsByPartnerResponse,
  GetMerchantsByPartnerResponse,
  GetShopeeIpRangeResponse,
} from "../schemas/public.js";
import { AccessToken } from "../schemas/access-token.js";
import { BaseManager } from "./base.manager.js";

export class PublicManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  public async getShopsByPartner(
    params?: GetShopsByPartnerParams
  ): Promise<GetShopsByPartnerResponse> {
    const response = await ShopeeFetch.fetch<GetShopsByPartnerResponse>(
      this.config,
      "/public/get_shops_by_partner",
      {
        method: "GET",
        params: {
          partner_id: this.config.partner_id,
          ...params,
        },
      }
    );

    return response;
  }

  public async getMerchantsByPartner(
    params?: GetMerchantsByPartnerParams
  ): Promise<GetMerchantsByPartnerResponse> {
    const response = await ShopeeFetch.fetch<GetMerchantsByPartnerResponse>(
      this.config,
      "/public/get_merchants_by_partner",
      {
        method: "GET",
        params: {
          partner_id: this.config.partner_id,
          ...params,
        },
      }
    );

    return response;
  }

  public async getShopeeIpRange(): Promise<GetShopeeIpRangeResponse> {
    const response = await ShopeeFetch.fetch<GetShopeeIpRangeResponse>(
      this.config,
      "/public/get_shopee_ip_ranges",
      {
        method: "GET",
      }
    );

    return response;
  }

  public async getAccessToken(params: {
    code: string;
    shop_id?: number;
    main_account_id?: number;
  }): Promise<AccessToken> {
    return ShopeeFetch.fetch<AccessToken>(this.config, "/public/get_access_token", {
      method: "POST",
      body: {
        partner_id: this.config.partner_id,
        ...params,
      },
    });
  }

  public async refreshAccessToken(params: {
    refresh_token: string;
    shop_id?: number;
    merchant_id?: number;
    supplier_id?: number;
    user_id?: number;
  }): Promise<AccessToken> {
    return ShopeeFetch.fetch<AccessToken>(this.config, "/public/refresh_access_token", {
      method: "POST",
      body: {
        partner_id: this.config.partner_id,
        ...params,
      },
    });
  }
}
