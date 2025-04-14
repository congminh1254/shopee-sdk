import { ShopeeConfig } from '../sdk.js';
import { GetShopsByPartnerParams, GetMerchantsByPartnerParams, GetShopsByPartnerResponse, GetMerchantsByPartnerResponse, GetShopeeIpRangeResponse } from '../schemas/public.js';
import { BaseManager } from './base.manager.js';
export declare class PublicManager extends BaseManager {
    constructor(config: ShopeeConfig);
    getShopsByPartner(params?: GetShopsByPartnerParams): Promise<GetShopsByPartnerResponse>;
    getMerchantsByPartner(params?: GetMerchantsByPartnerParams): Promise<GetMerchantsByPartnerResponse>;
    getShopeeIpRange(): Promise<GetShopeeIpRangeResponse>;
}
