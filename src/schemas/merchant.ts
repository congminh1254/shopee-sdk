import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field MerchantCurrency
 */
export enum MerchantCurrency {
  CNSC = "CNSC",
  KRSC = "KRSC",
}
/**
 * Request parameters for get_merchant_info
 *
 * Use this call to get information of merchant
 */
export type GetMerchantInfoRequest = Record<string, never>;
/**
 * Response data payload for get_merchant_info
 */
export interface GetMerchantInfoResponseData {
  /**
   * Name of the merchant.
   */
  merchant_name?: string;
  /**
   * The timestamp when the merchant was authorized to the partner.
   */
  auth_time?: Date | number;
  /**
   * Use this field to indicate the expiration date for merchant authorization.
   */
  expire_time?: Date | number;
  /**
   * The three-digit code representing the currency unit used for the item in this merchant. If currency haven't been setting in CNSC/KRSC, it will be empty.China merchant support CNY and USD currently.Korea merchant support KRW and USD currently. Hong kong merchant support USD currently, will support HKD later.
   */
  merchant_currency?: MerchantCurrency | string | number;
  /**
   * Region of the merchant. Including KR, HK and CN.
   */
  merchant_region?: string;
  /**
   * Use this filed to indicate whether this merchant is upgraded to cbsc.
   */
  is_upgraded_cbsc?: boolean;
  [key: string]: any;
}
/**
 * Response payload for get_merchant_info
 *
 * Use this call to get information of merchant
 */
export type GetMerchantInfoResponse = FetchResponse<GetMerchantInfoResponseData>;
/**
 * Request parameters for get_merchant_prepaid_account_list
 *
 * Use this api to get seller’s courier prepaid account.
 */
export interface GetMerchantPrepaidAccountListRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.Min: 1 Max:10
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * GetMerchantPrepaidAccountList_List sub-interface for GetMerchantPrepaidAccountList_Response
 */
export interface GetMerchantPrepaidAccountList_List {
  /**
   * Record ID
   */
  prepaid_account_id?: number;
  /**
   * Courier Company Key (快递公司编码).
   */
  prepaid_account_courier_key?: string;
  /**
   * Courier Company Name (快递公司名称).
   */
  prepaid_account_courier_name?: string;
  /**
   * Prepaid Account Number (电子面单账户号码).
   */
  prepaid_account_partner_id?: string;
  /**
   * Prepaid Account Password (电子面单账户密码).
   */
  prepaid_account_partner_key?: string;
  /**
   * Partner Secret (电子面单密钥).
   */
  prepaid_account_partner_secret?: string;
  /**
   * Partner Name (电子面单客户账户名称).
   */
  prepaid_account_partner_name?: string;
  /**
   * Branch Name (网点名称).
   */
  prepaid_account_partner_net?: string;
  /**
   * Partner Code (电子面单承载编号).
   */
  prepaid_account_partner_code?: string;
  /**
   * Delivery Agent Name (电子面单承载快递员名).
   */
  prepaid_account_check_man?: string;
  /**
   * This is to indicate whether the prepaid account is Default Prepaid Account.
   */
  prepaid_account_is_default?: boolean;
  [key: string]: any;
}
/**
 * GetMerchantPrepaidAccountList_Response sub-interface for GetMerchantPrepaidAccountListResponse
 */
export interface GetMerchantPrepaidAccountList_Response {
  total?: number;
  list?: GetMerchantPrepaidAccountList_List[];
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_merchant_prepaid_account_list
 */
export type GetMerchantPrepaidAccountListResponseData = GetMerchantPrepaidAccountList_Response;
/**
 * Response payload for get_merchant_prepaid_account_list
 *
 * Use this api to get seller’s courier prepaid account.
 */
export type GetMerchantPrepaidAccountListResponse =
  FetchResponse<GetMerchantPrepaidAccountListResponseData>;
/**
 * GetMerchantWarehouseList_Cursor sub-interface for GetMerchantWarehouseListRequest
 */
export interface GetMerchantWarehouseList_Cursor {
  next_id?: number;
  prev_id?: number;
  /**
   * The size of one page. Limit is [1,30].
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * Request parameters for get_merchant_warehouse_list
 *
 * Get merchant warehouse with page
 */
export interface GetMerchantWarehouseListRequest {
  /**
   * // how to use DoubleSidedCursor// Get data for the first page: Please pass next_id = 0 or nil, page_size = {your page size}.// Get data for the next page: Please pass the Cursor from the previous response, and set prev_id=nil;// Get data for the prev page: Please pass the Cursor from the previous response, and set next_id=nil;// Stop fetching next data: The Cursor.next_id in the previous response is nil.// Stop fetching prev data: The Cursor.prev_id in the previous response is nil.
   */
  cursor?: GetMerchantWarehouseList_Cursor;
  /**
   * 1 means pickup warehouse2 means return warehouse
   */
  warehouse_type?: number;
  [key: string]: any;
}
/**
 * GetMerchantWarehouseList_Address sub-interface for GetMerchantWarehouseList_Warehouse
 */
export interface GetMerchantWarehouseList_Address {
  /**
   * The address name filled in when creating the warehouse.
   */
  address_name?: string;
  /**
   * Region of your warehouse address.
   */
  region?: string;
  /**
   * Detail address of your warehouse address.
   */
  address?: string;
  /**
   * City of your warehouse address.
   */
  city?: string;
  /**
   * Distinct of your warehouse address.
   */
  district?: string;
  /**
   * State of your warehouse address.
   */
  state?: string;
  /**
   * Town of your warehouse address.
   */
  town?: string;
  /**
   * Zipcode of your warehouse address.
   */
  zip_code?: string;
  [key: string]: any;
}
/**
 * GetMerchantWarehouseList_EnterpriseInfo sub-interface for GetMerchantWarehouseList_Warehouse
 */
export interface GetMerchantWarehouseList_EnterpriseInfo {
  company_name?: string;
  cnpj?: string;
  state_registration_number?: string;
  is_freight_payer?: boolean;
  [key: string]: any;
}
/**
 * GetMerchantWarehouseList_Warehouse sub-interface for GetMerchantWarehouseList_Response
 */
export interface GetMerchantWarehouseList_Warehouse {
  /**
   * Warehouse address identifier.
   */
  warehouse_id?: number;
  /**
   * The warehouse name filled in when creating the warehouse.
   */
  warehouse_name?: string;
  /**
   * 1 means pickup warehouse2 means return warehouse
   */
  warehouse_type?: number;
  /**
   * Region of your warehouse.
   */
  warehouse_region?: string;
  /**
   * Location identifier for stocks. Different location_ids represent that your addresses are in different item stocks.
   */
  location_id?: string;
  address?: GetMerchantWarehouseList_Address;
  enterprise_info?: GetMerchantWarehouseList_EnterpriseInfo;
  [key: string]: any;
}
/**
 * GetMerchantWarehouseList_GetMerchantWarehouseList_Cursor sub-interface for GetMerchantWarehouseList_Response
 */
export interface GetMerchantWarehouseList_GetMerchantWarehouseList_Cursor {
  next_id?: number;
  prev_id?: number;
  page_size?: number;
  [key: string]: any;
}
/**
 * GetMerchantWarehouseList_Response sub-interface for GetMerchantWarehouseListResponse
 */
export interface GetMerchantWarehouseList_Response {
  /**
   * Total count of all warehouses.
   */
  total_count?: number;
  warehouse_list?: GetMerchantWarehouseList_Warehouse[];
  cursor?: GetMerchantWarehouseList_GetMerchantWarehouseList_Cursor;
  [key: string]: any;
}
/**
 * Response data payload for get_merchant_warehouse_list
 */
export type GetMerchantWarehouseListResponseData = GetMerchantWarehouseList_Response;
/**
 * Response payload for get_merchant_warehouse_list
 *
 * Get merchant warehouse with page
 */
export type GetMerchantWarehouseListResponse = FetchResponse<GetMerchantWarehouseListResponseData>;
/**
 * Request parameters for get_merchant_warehouse_location_list
 *
 * get merchant warehouse location list
 */
export type GetMerchantWarehouseLocationListRequest = Record<string, never>;
/**
 * GetMerchantWarehouseLocationList_Response sub-interface for GetMerchantWarehouseLocationListResponse
 */
export interface GetMerchantWarehouseLocationList_Response {
  /**
   * Location identifier for stocks. Different location_ids represent that your addresses are in different item stocks
   */
  location_id?: string;
  /**
   * The warehouse name filled in when creating the warehouse address
   */
  warehouse_name?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_merchant_warehouse_location_list
 */
export type GetMerchantWarehouseLocationListResponseData =
  GetMerchantWarehouseLocationList_Response[];
/**
 * Response payload for get_merchant_warehouse_location_list
 *
 * get merchant warehouse location list
 */
export type GetMerchantWarehouseLocationListResponse =
  FetchResponse<GetMerchantWarehouseLocationListResponseData>;
/**
 * Request parameters for get_shop_list_by_merchant
 *
 * Use this call to get shop_list bound to merchant_id.
 */
export interface GetShopListByMerchantRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.No more than 500.
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * GetShopListByMerchant_SipAffiShop sub-interface for GetShopListByMerchant_Shop
 */
export interface GetShopListByMerchant_SipAffiShop {
  /**
   * Affiliate shop's id.
   */
  affi_shop_id?: number;
  [key: string]: any;
}
/**
 * GetShopListByMerchant_Shop sub-interface for GetShopListByMerchantResponse
 */
export interface GetShopListByMerchant_Shop {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * List of SIP affiliate shops.Only primary shop will return this parameter
   */
  sip_affi_shops?: GetShopListByMerchant_SipAffiShop[];
  [key: string]: any;
}
/**
 * Response data payload for get_shop_list_by_merchant
 */
export interface GetShopListByMerchantResponseData {
  /**
   * list of shop authorized to the partner and bound to the merchant.
   */
  shop_list?: GetShopListByMerchant_Shop[];
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response payload for get_shop_list_by_merchant
 *
 * Use this call to get shop_list bound to merchant_id.
 */
export type GetShopListByMerchantResponse = FetchResponse<GetShopListByMerchantResponseData>;
/**
 * GetWarehouseEligibleShopList_Cursor sub-interface for GetWarehouseEligibleShopListRequest
 */
export interface GetWarehouseEligibleShopList_Cursor {
  next_id?: number;
  prev_id?: number;
  /**
   * The size of one page. Limit is [1,30].
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * Request parameters for get_warehouse_eligible_shop_list
 *
 * Get eligible shop list by warehouse id
 */
export interface GetWarehouseEligibleShopListRequest {
  /**
   * Warehouse address identifier.
   */
  warehouse_id?: number;
  /**
   * 1 means pickup warehouse2 means return warehouse
   */
  warehouse_type?: number;
  /**
   * // how to use DoubleSidedCursor// Get data for the first page: Please pass next_id = 0 or nil, page_size = {your page size}.// Get data for the next page: Please pass the Cursor from the previous response, and set prev_id=nil;// Get data for the prev page: Please pass the Cursor from the previous response, and set next_id=nil;// Stop fetching next data: The Cursor.next_id in the previous response is nil.// Stop fetching prev data: The Cursor.prev_id in the previous response is nil.
   */
  cursor?: GetWarehouseEligibleShopList_Cursor;
  [key: string]: any;
}
/**
 * GetWarehouseEligibleShopList_Shop sub-interface for GetWarehouseEligibleShopList_Response
 */
export interface GetWarehouseEligibleShopList_Shop {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Name of the shop.
   */
  shop_name?: string;
  [key: string]: any;
}
/**
 * GetWarehouseEligibleShopList_GetWarehouseEligibleShopList_Cursor sub-interface for GetWarehouseEligibleShopList_Response
 */
export interface GetWarehouseEligibleShopList_GetWarehouseEligibleShopList_Cursor {
  next_id?: number;
  prev_id?: number;
  page_size?: number;
  [key: string]: any;
}
/**
 * GetWarehouseEligibleShopList_Response sub-interface for GetWarehouseEligibleShopListResponse
 */
export interface GetWarehouseEligibleShopList_Response {
  /**
   * Eligible shop list of the warehouse
   */
  shop_list?: GetWarehouseEligibleShopList_Shop[];
  cursor?: GetWarehouseEligibleShopList_GetWarehouseEligibleShopList_Cursor;
  [key: string]: any;
}
/**
 * Response data payload for get_warehouse_eligible_shop_list
 */
export type GetWarehouseEligibleShopListResponseData = GetWarehouseEligibleShopList_Response;
/**
 * Response payload for get_warehouse_eligible_shop_list
 *
 * Get eligible shop list by warehouse id
 */
export type GetWarehouseEligibleShopListResponse =
  FetchResponse<GetWarehouseEligibleShopListResponseData>;
