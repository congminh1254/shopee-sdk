import { FetchResponse } from "./fetch.js";
import { AuthedShop } from "./authed-shop.js";
import { AuthedMerchant } from "./authed-merchant.js";
export interface GetShopsByPartnerParams {
    page_size?: number;
    page_no?: number;
}
export interface GetMerchantsByPartnerParams {
    page_size?: number;
    page_no?: number;
}
export interface GetShopsByPartnerResponse extends FetchResponse<{
    authed_shop_list: AuthedShop[];
    more: boolean;
}> {
}
export interface GetMerchantsByPartnerResponse extends FetchResponse<{
    authed_merchant_list: AuthedMerchant[];
    more: boolean;
}> {
}
export interface GetShopeeIpRangeResponse extends FetchResponse<{
    ip_list: string[];
}> {
}
