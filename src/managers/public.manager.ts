import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import {
  GetShopsByPartnerParams,
  GetMerchantsByPartnerParams,
  GetShopsByPartnerResponse,
  GetMerchantsByPartnerResponse,
  GetShopeeIpRangeResponse,
} from "../schemas/public.js";
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
}
