import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_access_token
 *
 * Use the code from the authorization step to call this API to obtain the authorized shop_id, merchant_id, supplier_id, or user_id, and its corresponding access_token and refresh_token.
 */
export interface GetAccessTokenRequest {
  /**
   * The code in redirect url after the authorization. Valid for one-time use, expires in 10 minutes
   */
  code: string;
  /**
   * Partner ID is assigned upon registration is successful. Required for all requests.
   */
  partner_id: number;
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * The main_account_id of the seller that authorized the developer.
   */
  main_account_id?: number;
}
/**
 * Response data payload for get_access_token
 */
export interface GetAccessTokenResponseData {
  /**
   * Returned all shop_ids authorized this time.
   */
  shop_id_list?: number[];
  /**
   * Returned all merchant_ids authorized this time.
   */
  merchant_id_list?: number[];
  /**
   * Returned all supplier_ids authorized this time.
   */
  supplier_id_list?: number[];
  /**
   * Returned all user_ids authorized this time.
   */
  user_id_list?: number[];
  /**
   * If the authorized role is principal administrator, return all principal_id under this authorization.
   */
  principal_id_list?: number[];
  /**
   * Returned when the API call is successful. A dynamic token that can be used multiple times and expires after 4 hours.
   */
  access_token?: string;
  /**
   * Returned when the API call is successful. Use refresh_token to get a new access_token. Valid for each shop_id, merchant_id, supplier_id, or user_id respectively, for 30 days.
   */
  refresh_token?: string;
  /**
   * Returned when the API call is successful. The validity period of the access_token, in seconds.
   */
  expire_in?: Date | number;
}
/**
 * Response payload for get_access_token
 *
 * Use the code from the authorization step to call this API to obtain the authorized shop_id, merchant_id, supplier_id, or user_id, and its corresponding access_token and refresh_token.
 */
export type GetAccessTokenResponse = FetchResponse<GetAccessTokenResponseData>;
/**
 * Request parameters for get_merchants_by_partner
 *
 * Use this API to get basic info of merchants which have authorized to the partner.
 */
export interface GetMerchantsByPartnerRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.
   */
  page_size?: number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
}
/**
 * GetMerchantsByPartner_AuthedMerchant sub-interface for GetMerchantsByPartnerResponse
 */
export interface GetMerchantsByPartner_AuthedMerchant {
  /**
   * Merchant's area
   */
  region?: string;
  /**
   * Shopee's unique identifier for a merchant.
   */
  merchant_id?: number;
  /**
   * The timestamp when the merchant was authorized to the partner.
   */
  auth_time?: Date | number;
  /**
   * Use this field to indicate the expiration date for merchant authorization.
   */
  expire_time?: Date | number;
}
/**
 * Response data payload for get_merchants_by_partner
 */
export interface GetMerchantsByPartnerResponseData {
  /**
   * A list of merchants authorized to the partner.
   */
  authed_merchant_list?: GetMerchantsByPartner_AuthedMerchant[];
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  more?: boolean;
}
/**
 * Response payload for get_merchants_by_partner
 *
 * Use this API to get basic info of merchants which have authorized to the partner.
 */
export type GetMerchantsByPartnerResponse = FetchResponse<GetMerchantsByPartnerResponseData>;
/**
 * Request parameters for get_shopee_ip_ranges
 *
 * You can get shopee ip address ranges through this open api.
 */
export type GetShopeeIpRangesRequest = Record<string, never>;
/**
 * Response data payload for get_shopee_ip_ranges
 */
export interface GetShopeeIpRangesResponseData {
  /**
   * IP address ranges of Shopee
   */
  ip_list?: string[];
}
/**
 * Response payload for get_shopee_ip_ranges
 *
 * You can get shopee ip address ranges through this open api.
 */
export type GetShopeeIpRangesResponse = FetchResponse<GetShopeeIpRangesResponseData>;
/**
 * Request parameters for get_shops_by_partner
 *
 * get basic info of shops which have authorized to the partner.
 */
export interface GetShopsByPartnerRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.
   */
  page_size?: number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
}
/**
 * GetShopsByPartner_SipAffiShop sub-interface for GetShopsByPartner_AuthedShop
 */
export interface GetShopsByPartner_SipAffiShop {
  /**
   * Affiliate Shop's area
   */
  region?: string;
  /**
   * Affiliate shop's id
   */
  affi_shop_id?: number;
}
/**
 * GetShopsByPartner_AuthedShop sub-interface for GetShopsByPartnerResponse
 */
export interface GetShopsByPartner_AuthedShop {
  /**
   * Shop's area
   */
  region?: string;
  /**
   * Shop id
   */
  shop_id?: number;
  /**
   * The timestamp when the shop was authorized to the partner.
   */
  auth_time?: Date | number;
  /**
   * Use this field to indicate the expiration date for shop authorization.
   */
  expire_time?: Date | number;
  /**
   * SIP affiliate shops info list
   */
  sip_affi_shop_list?: GetShopsByPartner_SipAffiShop[];
}
/**
 * Response data payload for get_shops_by_partner
 */
export interface GetShopsByPartnerResponseData {
  /**
   * A list of shops authorized to the partner.
   */
  authed_shop_list?: GetShopsByPartner_AuthedShop[];
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  more?: boolean;
}
/**
 * Response payload for get_shops_by_partner
 *
 * get basic info of shops which have authorized to the partner.
 */
export type GetShopsByPartnerResponse = FetchResponse<GetShopsByPartnerResponseData>;
/**
 * Request parameters for get_token_by_resend_code
 *
 * Use the resend code to get access token and refresh token. When you lost your access token or refresh token, you can go to authorization management page to resend code by yourselves. You can only use this endpoint in live environment, we don't support in test-stable environment.
 */
export interface GetTokenByResendCodeRequest {
  /**
   * the code in redirect url after you resend code in shop authorization management page. valid for one-time use, expires in 10minutes.
   */
  resend_code: string;
}
/**
 * Response data payload for get_token_by_resend_code
 */
export interface GetTokenByResendCodeResponseData {
  /**
   * Return when resend code in shop module
   */
  shop_id_list?: number[];
  /**
   * Return when resend code in merchant module
   */
  merchant_id_list?: number[];
  /**
   * Use refresh_token to obtain new access_token. Valid for each shop_id and merchant_id respectively one-time use, expires in 30 days.
   */
  refresh_token?: string;
  /**
   * The token for API access, using to identify your permission to the api. Valid for multiple use and expires in 4 hours.
   */
  access_token?: string;
  /**
   * Access_token expiration time, unit is second.
   */
  expire_in?: number;
}
/**
 * Response payload for get_token_by_resend_code
 *
 * Use the resend code to get access token and refresh token. When you lost your access token or refresh token, you can go to authorization management page to resend code by yourselves. You can only use this endpoint in live environment, we don't support in test-stable environment.
 */
export type GetTokenByResendCodeResponse = FetchResponse<GetTokenByResendCodeResponseData>;
/**
 * Request parameters for refresh_access_token
 *
 * Use this API to refresh the access_token after it expires. Refresh_token can be used once only, this API will also return a new refresh_token. Please use the new refresh_token for the next RefreshAccessToken call
 */
export interface RefreshAccessTokenRequest {
  /**
   * Use refresh_token to get a new access_token. Each refresh_token is valid for 30 days, and can only be used once by either a shop_id or merchant_id or supplier_id or user_id.
   */
  refresh_token: string;
  /**
   * The partner_id obtained from the App. This partner_id is inserted into the body.
   */
  partner_id: number;
  /**
   * The shop_id that granted authorization to your App. Only the shop_id or merchant_id or supplier_id or user_id can be selected as the input parameter, and they must be refreshed separately.
   */
  shop_id?: number;
  /**
   * The merchant_id that granted authorization to your App. Only the shop_id or merchant_id or supplier_id or user_id can be selected as the input parameter, and they must be refreshed separately.
   */
  merchant_id?: number;
  /**
   * The supplier_id that granted authorization to your App. Only the shop_id or merchant_id or supplier_id or user_id can be selected as the input parameter, and they must be refreshed separately.
   */
  supplier_id?: number;
  /**
   * The user_id that granted authorization to your App. Only the shop_id or merchant_id or supplier_id or user_id can be selected as the input parameter, and they must be refreshed separately.
   */
  user_id?: number;
  /**
   * Shopee's unique identifier for a principal.
   */
  principal_id?: number;
}
/**
 * Response data payload for refresh_access_token
 */
export interface RefreshAccessTokenResponseData {
  /**
   * Returned when the API call is successful. The partner_id you used for this refresh.
   */
  partner_id?: number;
  /**
   * Returned when the API call is successful.The principal_id for this refresh.
   */
  principal_id?: number;
  /**
   * Returned when the API call is successful. The shop_id for this refresh.
   */
  shop_id?: number;
  /**
   * Returned when the API call is successful. The merchant_id for this refresh.
   */
  merchant_id?: number;
  /**
   * Returned when the API call is successful. The supplier_id for this refresh.
   */
  supplier_id?: number;
  /**
   * Returned when the API call is successful. The user_id for this refresh.
   */
  user_id?: number;
  /**
   * Returned when the API call is successful. Each new access_token is a dynamic token that can be used multiple times. It expires after 4 hours.
   */
  access_token?: string;
  /**
   * New refresh_tokenReturned when the API call is successful. Use a refresh_token to get a new access_token. Each refresh_token is valid for 30 days, and can only be used once by either a shop_id or merchant_id or supplier_id or user_id.
   */
  refresh_token?: string;
  /**
   * Returned when the API call is successful. The validity period of the access_token, in seconds.
   */
  expire_in?: Date | number;
}
/**
 * Response payload for refresh_access_token
 *
 * Use this API to refresh the access_token after it expires. Refresh_token can be used once only, this API will also return a new refresh_token. Please use the new refresh_token for the next RefreshAccessToken call
 */
export type RefreshAccessTokenResponse = FetchResponse<RefreshAccessTokenResponseData>;
