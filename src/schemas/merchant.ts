import { BaseResponse } from "./base.js";

/**
 * Cursor for pagination with double-sided navigation
 */
export interface DoubleSidedCursor {
  /** ID for fetching next page. Set to null or 0 for first page */
  next_id?: number | null;
  /** ID for fetching previous page */
  prev_id?: number | null;
  /** Number of items per page */
  page_size: number;
}

/**
 * Response wrapper for merchant endpoints
 */
export type MerchantResponse<T> = BaseResponse & {
  response?: T;
};

/**
 * Parameters for getting merchant information
 */
export type GetMerchantInfoParams = Record<string, never>;

/**
 * Response from getting merchant information
 */
export interface GetMerchantInfoResponse extends BaseResponse {
  /** Name of the merchant */
  merchant_name?: string;
  /** Timestamp when the merchant was authorized to the partner */
  auth_time?: number;
  /** Expiration date for merchant authorization */
  expire_time?: number;
  /** Currency unit used for items in this merchant (e.g., CNY, USD, KRW) */
  merchant_currency?: string;
  /** Region of the merchant (KR, HK, CN, etc.) */
  merchant_region?: string;
  /** Whether this merchant is upgraded to CBSC */
  is_upgraded_cbsc?: boolean;
  /** Whether this is a CNSC merchant */
  is_cnsc?: boolean;
}

/**
 * Parameters for getting merchant prepaid account list
 */
export interface GetMerchantPrepaidAccountListParams {
  /** Page number, starting from 1 */
  page_no: number;
  /** Number of items per page, maximum 100 */
  page_size: number;
}

/**
 * Prepaid account information
 */
export interface PrepaidAccount {
  /** ID of the prepaid account */
  prepaid_account_id: number;
  /** Courier key identifier */
  prepaid_account_courier_key: string;
  /** Display name of the courier */
  prepaid_account_courier_name: string;
  /** Whether this is the default account */
  prepaid_account_is_default: boolean;
  /** Partner ID for the prepaid account */
  prepaid_account_partner_id: string;
  /** Partner code */
  prepaid_account_partner_code?: string;
  /** Partner key (may be masked) */
  prepaid_account_partner_key?: string;
  /** Partner secret (may be masked) */
  prepaid_account_partner_secret?: string;
  /** Partner name */
  prepaid_account_partner_name?: string;
  /** Partner network */
  prepaid_account_partner_net?: string;
  /** Check man information */
  prepaid_account_check_man?: string;
}

/**
 * Response from getting merchant prepaid account list
 */
export type GetMerchantPrepaidAccountListResponse = MerchantResponse<{
  /** List of prepaid accounts */
  list: PrepaidAccount[];
  /** Whether there are more pages */
  more: boolean;
  /** Total number of accounts */
  total: number;
}>;

/**
 * Parameters for getting merchant warehouse list
 */
export interface GetMerchantWarehouseListParams {
  /** Pagination cursor */
  cursor: DoubleSidedCursor;
}

/**
 * Address information
 */
export interface Address {
  /** Street address */
  address: string;
  /** Name associated with the address */
  address_name: string;
  /** City */
  city: string;
  /** District */
  district?: string;
  /** Region code */
  region: string;
  /** State/Province */
  state: string;
  /** Town */
  town?: string;
  /** Postal/ZIP code */
  zip_code: string;
}

/**
 * Enterprise information for warehouse
 */
export interface EnterpriseInfo {
  /** CNPJ number (Brazil) */
  cnpj?: string;
  /** Company name */
  company_name?: string;
  /** Whether the company is a freight payer */
  is_freight_payer?: boolean;
  /** State registration number */
  state_registration_number?: string;
}

/**
 * Warehouse information
 */
export interface Warehouse {
  /** Warehouse ID */
  warehouse_id: number;
  /** Name of the warehouse */
  warehouse_name: string;
  /** Region where warehouse is located */
  warehouse_region: string;
  /** Type of warehouse: 1 = pickup, 2 = return */
  warehouse_type: number;
  /** Location identifier */
  location_id: string;
  /** Address details */
  address: Address;
  /** Enterprise information (if applicable) */
  enterprise_info?: EnterpriseInfo | null;
}

/**
 * Response from getting merchant warehouse list
 */
export type GetMerchantWarehouseListResponse = MerchantResponse<{
  /** List of warehouses */
  warehouse_list: Warehouse[];
  /** Pagination cursor */
  cursor: DoubleSidedCursor;
  /** Total count of warehouses */
  total_count: number;
}>;

/**
 * Parameters for getting merchant warehouse location list
 */
export type GetMerchantWarehouseLocationListParams = Record<string, never>;

/**
 * Warehouse location information
 */
export interface WarehouseLocation {
  /** Location ID */
  location_id: string;
  /** Warehouse name */
  warehouse_name: string;
}

/**
 * Response from getting merchant warehouse location list
 */
export type GetMerchantWarehouseLocationListResponse = MerchantResponse<WarehouseLocation[]>;

/**
 * Parameters for getting shop list by merchant
 */
export interface GetShopListByMerchantParams {
  /** Page number, starting from 1 */
  page_no: number;
  /** Number of items per page, maximum 500 */
  page_size: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * SIP affiliate shop information
 */
export interface SipAffiShop {
  /** Affiliate shop's ID */
  affi_shop_id: number;
}

/**
 * Shop information
 */
export interface MerchantShop {
  /** Shopee's unique identifier for a shop */
  shop_id: number;
  /** List of SIP affiliate shops (only for primary shop) */
  sip_affi_shops?: SipAffiShop[];
}

/**
 * Response from getting shop list by merchant
 */
export interface GetShopListByMerchantResponse extends BaseResponse {
  /** List of shops authorized to the partner and bound to the merchant */
  shop_list: MerchantShop[];
  /** Whether there are more pages */
  more: boolean;
  /** Whether this is a CNSC merchant */
  is_cnsc?: boolean;
}

/**
 * Parameters for getting warehouse eligible shop list
 */
export interface GetWarehouseEligibleShopListParams {
  /** Warehouse address identifier */
  warehouse_id: number;
  /** 1 = pickup warehouse, 2 = return warehouse */
  warehouse_type: number;
  /** Pagination cursor */
  cursor: DoubleSidedCursor;
}

/**
 * Eligible shop information
 */
export interface EligibleShop {
  /** Shopee's unique identifier for a shop */
  shop_id: number;
  /** Name of the shop */
  shop_name: string;
}

/**
 * Response from getting warehouse eligible shop list
 */
export type GetWarehouseEligibleShopListResponse = MerchantResponse<{
  /** List of eligible shops */
  shop_list: EligibleShop[];
  /** Pagination cursor */
  cursor: DoubleSidedCursor;
}>;
