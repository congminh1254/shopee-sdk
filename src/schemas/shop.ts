import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field TaxIdType
 */
export enum TaxIdType {
  /**
   * Personal seller (CPF)
   */
  PersonalSellerCpf = 1,
  /**
   * Company seller (CNPJ)
   */
  CompanySellerCnpj = 2,
}
/**
 * Enum generated for field ShopFulfillmentFlag
 */
export enum ShopFulfillmentFlag {
  LOCAL = "Local",
  CB = "CB",
}
/**
 * Request parameters for get_authorised_reseller_brand
 *
 * Get the authorised reseller brand list for the shop.
 */
export interface GetAuthorisedResellerBrandRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 30.
   */
  page_size: number;
}
/**
 * GetAuthorisedResellerBrand_AuthorisedBrand sub-interface for GetAuthorisedResellerBrand_Response
 */
export interface GetAuthorisedResellerBrand_AuthorisedBrand {
  /**
   * ID of the authorised brand, it may be the same in different regions.
   */
  brand_id?: number;
  /**
   * Name of the authorised brand.
   */
  brand_name?: string;
}
/**
 * GetAuthorisedResellerBrand_Response sub-interface for GetAuthorisedResellerBrandResponse
 */
export interface GetAuthorisedResellerBrand_Response {
  /**
   * This is to indicate whether the shop is authorised reseller.
   */
  is_authorised_reseller?: boolean;
  /**
   * The number of authorised brand linked with the shop.
   */
  total_count?: number;
  /**
   * This is to indicate whether the authorised brand list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of authorised brand.
   */
  more?: boolean;
  authorised_brand_list?: GetAuthorisedResellerBrand_AuthorisedBrand[];
}
/**
 * Response data payload for get_authorised_reseller_brand
 */
export type GetAuthorisedResellerBrandResponseData = GetAuthorisedResellerBrand_Response;
/**
 * Response payload for get_authorised_reseller_brand
 *
 * Get the authorised reseller brand list for the shop.
 */
export type GetAuthorisedResellerBrandResponse =
  FetchResponse<GetAuthorisedResellerBrandResponseData>;
/**
 * Request parameters for get_br_shop_onboarding_info
 *
 * [For BR Shop Only] Use this API to get shop KYC registration and qualification information.
 */
export type GetBrShopOnboardingInfoRequest = Record<string, never>;
/**
 * GetBrShopOnboardingInfo_BillingAddress sub-interface for GetBrShopOnboardingInfo_Response
 */
export interface GetBrShopOnboardingInfo_BillingAddress {
  /**
   * State of the billing address.
   */
  state?: string;
  /**
   * City of the billing address.
   */
  city?: string;
  /**
   * Specific detail of the billing address.
   */
  address?: string;
  /**
   * ZIP code of the billing address.
   */
  zipcode?: string;
  /**
   * Neighborhood of the billing address.
   */
  neighborhood?: string;
}
/**
 * GetBrShopOnboardingInfo_Response sub-interface for GetBrShopOnboardingInfoResponse
 */
export interface GetBrShopOnboardingInfo_Response {
  /**
   * Type of the shop’s tax ID. Applicable values:
   * 1: Personal seller (CPF)
   * 2: Company seller (CNPJ)
   */
  tax_id_type?: TaxIdType | string | number;
  /**
   * The shop’s tax ID.- When tax_id_type = 1 (Personal seller), it is CPF.- When tax_id_type = 2 (Company seller), it is CNPJ.
   */
  tax_id?: string;
  /**
   * CPF number of the individual seller. Valid only when tax_id_type = 1.
   */
  cpf_id?: string;
  /**
   * CNPJ number of the company seller. Valid only when tax_id_type = 2.
   */
  cnpj_id?: string;
  /**
   * Full name of the individual seller. Valid only when tax_id_type = 1.
   */
  name?: string;
  /**
   * Legal name of the company seller. Valid only when tax_id_type = 2.
   */
  legal_entity_name?: string;
  /**
   * Birthday of the individual seller (stored as Unix timestamp). Valid only when tax_id_type = 1.
   */
  birthday?: number;
  /**
   * Birthday of the individual seller (formatted as YYYY-MM-DD). Valid only when tax_id_type = 1.
   */
  birthday_str?: string;
  /**
   * State registration number of the shop.
   */
  state_registration?: string;
  /**
   * Shop’s billing address details.
   */
  billing_address?: GetBrShopOnboardingInfo_BillingAddress;
  /**
   * Status of the shop’s current KYC onboarding process. Applicable values:0: None1: Regis Processing2: Regis Validated3: Regis Rejected4: KYC Pending5: KYC Processing6: KYC Processing Manually7: KYC Validated8: KYC Rejected
   */
  onboarding_status?: number;
  /**
   * Timestamp when the onboarding information was submitted.
   */
  submission_time?: number;
  /**
   * Nationality of the individual seller. Valid only when tax_id_type=1.
   */
  nationality?: string;
  /**
   * Main CNAE code.
   */
  cnae_main?: string;
  /**
   * Secondary CNAE code.
   */
  cnae_secondary?: string;
  /**
   * MEI verification result. Applicable values:0: No1: Yes
   */
  mei_check?: string;
  /**
   * Indicate if the shop has passed KYC verification.
   */
  onboarding_passed?: boolean;
}
/**
 * Response data payload for get_br_shop_onboarding_info
 */
export type GetBrShopOnboardingInfoResponseData = GetBrShopOnboardingInfo_Response;
/**
 * Response payload for get_br_shop_onboarding_info
 *
 * [For BR Shop Only] Use this API to get shop KYC registration and qualification information.
 */
export type GetBrShopOnboardingInfoResponse = FetchResponse<GetBrShopOnboardingInfoResponseData>;
/**
 * Request parameters for get_profile
 *
 * This API support to get information of shop.
 */
export type GetProfileRequest = Record<string, never>;
/**
 * GetProfile_Response sub-interface for GetProfileResponse
 */
export interface GetProfile_Response {
  /**
   * The Image URL of the shop logo.
   */
  shop_logo?: string;
  /**
   * The content of the shop description.
   */
  description?: string;
  /**
   * The content of the shop name.
   */
  shop_name?: string;
  /**
   * The invoice issuer information for the shop. It could be "Shopee" or "Other" as the invoice issuer. This is for BR CNPJ seller only.
   */
  invoice_issuer?: string;
}
/**
 * Response data payload for get_profile
 */
export type GetProfileResponseData = GetProfile_Response;
/**
 * Response payload for get_profile
 *
 * This API support to get information of shop.
 */
export type GetProfileResponse = FetchResponse<GetProfileResponseData>;
/**
 * Request parameters for get_shop_holiday_mode
 *
 * Use this API to check whether a shop has enabled holiday mode and its ongoing and upcoming holiday mode period.
 */
export type GetShopHolidayModeRequest = Record<string, never>;
/**
 * GetShopHolidayMode_Response sub-interface for GetShopHolidayModeResponse
 */
export interface GetShopHolidayMode_Response {
  /**
   * Indicate whether the shop has enabled holiday mode. true means ON, false means OFF.
   */
  holiday_mode_on?: boolean;
  /**
   * The last time the holiday mode was modifies.
   */
  holiday_mode_mtime?: Date | number;
  /**
   * Indicate whether the holiday mode is partial holiday or full holiday.1: Partial Holiday: seller can still receive orders during partial holiday0: Full Holiday: seller can not receive orders during full holidayonly when holiday_mode_on = true will the holiday_mode_type work
   */
  holiday_mode_type?: number;
  /**
   * Holiday start time timestamp.
   */
  holiday_mode_start_time?: Date | number;
  /**
   * Holiday end time timestamp.
   */
  holiday_mode_end_time?: Date | number;
  /**
   * Description of the holiday
   */
  holiday_mode_description?: string;
  /**
   * Debug message.
   */
  debug_msg?: string;
}
/**
 * Response data payload for get_shop_holiday_mode
 */
export type GetShopHolidayModeResponseData = GetShopHolidayMode_Response;
/**
 * Response payload for get_shop_holiday_mode
 *
 * Use this API to check whether a shop has enabled holiday mode and its ongoing and upcoming holiday mode period.
 */
export type GetShopHolidayModeResponse = FetchResponse<GetShopHolidayModeResponseData>;
/**
 * Request parameters for get_shop_info
 *
 * Use this call to get information of shop
 */
export type GetShopInfoRequest = Record<string, never>;
/**
 * GetShopInfo_SipAffiShop sub-interface for GetShopInfoResponse
 */
export interface GetShopInfo_SipAffiShop {
  /**
   * Affiliate shop's id.
   */
  affi_shop_id?: number;
  /**
   * Affiliate Shop's area.
   */
  region?: string;
}
/**
 * GetShopInfo_LinkedDirectShop sub-interface for GetShopInfoResponse
 */
export interface GetShopInfo_LinkedDirectShop {
  /**
   * Shop ID of the Cross Border Direct Shop.
   */
  direct_shop_id?: number;
  /**
   * Shop Region of the Cross Border Direct Shop.
   */
  direct_shop_region?: string;
}
/**
 * GetShopInfo_OutletShopInfo sub-interface for GetShopInfoResponse
 */
export interface GetShopInfo_OutletShopInfo {
  /**
   * Shop ID of the Outlet Shop.
   */
  outlet_shop_id?: number;
}
/**
 * Response data payload for get_shop_info
 */
export interface GetShopInfoResponseData {
  /**
   * Name of the shop.
   */
  shop_name?: string;
  /**
   * Shop's area.
   */
  region?: string;
  /**
   * Applicable status: BANNED, FROZEN, NORMAL.
   */
  status?: string;
  /**
   * SIP affiliate shops info list.If you request for SIP primary shop,this field will be returned, if you request for SIP affiliate shop,this field won't be returned
   */
  sip_affi_shops?: GetShopInfo_SipAffiShop[];
  /**
   * Use this filed to indicate whether the shop is a cross-border shop.
   */
  is_cb?: boolean;
  /**
   * The timestamp when the shop was authorized to the partner.
   */
  auth_time?: Date | number;
  /**
   * Use this field to indicate the expiration date for shop authorization.
   */
  expire_time?: Date | number;
  /**
   * This filed will return "true" when SIP primary shop or affiliate shop calls
   */
  is_sip?: boolean;
  /**
   * Use this filed to indicate whether this merchant is upgraded to CBSC, including CNSC and KRSC.
   */
  is_upgraded_cbsc?: boolean;
  /**
   * Shopee’s unique identifier for a merchant. If the shop won't under any merchant, then the value will be null.
   */
  merchant_id?: number;
  /**
   * Use this field to indicate the fulfillment type of current shop, the applicable values: - Pure - FBS Shop: Single mode, refer to Local/CB shops which only have Shopee official warehouse stock, orders are fulfilled by Shopee from Shopee official warehouse; - Pure - 3PF Shop: Single mode, refer to CB shops which only have local seller warehouse stock, orders are fulfilled by seller from local seller warehouse via local logistics channels; - PFF - FBS Shop: 1) Hybird mode, refer to Local shops which have both Shopee official warehouse stock and local seller warehouse stock, orders can be fulfilled by Shopee from Shopee official warehouse and can also fulfilled by seller from local seller warehouse via local logistics channels; 2) Hybrid mode, refer to CB shops which have both Shopee official warehouse stock and CB seller warehouse stock, orders can be fulfilled by Shopee from Shopee official warehouse and can also fulfilled by seller from CB seller warehouse via CB logistics channels; - PFF - 3PF Shop: Hybrid mode, refer to CB shops which have both local seller warehouse stock and CB seller warehouse stock, orders can be fulfilled by seller from local seller warehouse via local logistics channels and can also fulfilled by seller from CB seller warehouse via CB logistics channels; - LFF Hybrid Shop: Hybrid mode, refer to CB shops which have 3 types of stock: FBS stock (Shopee official warehouse stock), 3PF stock (CB seller own stock in the local market) and CB SLS stock (CB seller own stock in CN/HK/KR);- Others- Unknown: Returned when obtaining shop_fulfillment_flag information fails
   */
  shop_fulfillment_flag?: ShopFulfillmentFlag | string | number;
  /**
   * Identifies if the current shop is a Local Shop linked to Cross Border Direct Shop.
   */
  is_main_shop?: boolean;
  /**
   * Identifies if the current shop is a Cross Border Direct Shop.
   */
  is_direct_shop?: boolean;
  /**
   * Returns the Shop ID of the Local Shop linked to the Cross Border Direct Shop.
   */
  linked_main_shop_id?: number;
  /**
   * Returns the list of Cross Border Direct Shops linked to the Local Shop.
   */
  linked_direct_shop_list?: GetShopInfo_LinkedDirectShop[];
  /**
   * Use this filed to indicate if the shop is in 1-AWB whitelist. If is_one_awb return true, please use new AWB size (10cm x 15cm thermal paper) to print AWB. For more details, please refer to: https://open.shopee.com/announcements/1138?category=3&is_top=false
   */
  is_one_awb?: boolean;
  /**
   * Indicates whether the current shop is a Mart Shop.
   */
  is_mart_shop?: boolean;
  /**
   * Indicates whether the current shop is an Outlet Shop.
   */
  is_outlet_shop?: boolean;
  /**
   * (Only returned when requesting an Outlet Shop) Refers to the Mart Shop ID this Outlet belongs to.
   */
  mart_shop_id?: number;
  /**
   * (Only returned when requesting a Mart Shop) List of Outlet Shop IDs under this Mart Shop.
   */
  outlet_shop_info_list?: GetShopInfo_OutletShopInfo[];
  /**
   * (Only returned when requesting a Mart or Outlet Shop)Indicates the structure type of the Mart or Outlet shop. Applicable values are: normal_mart_shop, warehouse_mart_shop, normal_outlet_shop, warehouse_outlet_shop
   */
  mart_outlet_structure_type?: string;
}
/**
 * Response payload for get_shop_info
 *
 * Use this call to get information of shop
 */
export type GetShopInfoResponse = FetchResponse<GetShopInfoResponseData>;
/**
 * Request parameters for get_shop_notification
 *
 * get Seller Center notification, the permission is controlled by App type
 */
export interface GetShopNotificationRequest {
  /**
   * The last notification_id returned on the page. When using the cursor, notifications will start with the one following this cursor notification. If no cursor is provided, the latest message from the shop will be returned.
   */
  cursor?: number;
  /**
   * Default 10; maximum 50
   */
  page_size?: number;
}
/**
 * GetShopNotification_Data sub-interface for GetShopNotificationResponse
 */
export interface GetShopNotification_Data {
  /**
   * the notification create time
   */
  create_time?: number;
  /**
   * The content of the notification
   */
  content?: string;
  /**
   * The content of the notification
   */
  title?: string;
  /**
   * Some notification may be attached with URL, it will redirect to seller center
   */
  url?: string;
}
/**
 * Response data payload for get_shop_notification
 */
export interface GetShopNotificationResponseData {
  /**
   * Last notification_id returned in the page
   */
  cursor?: number;
  data?: GetShopNotification_Data;
}
/**
 * Response payload for get_shop_notification
 *
 * get Seller Center notification, the permission is controlled by App type
 */
export type GetShopNotificationResponse = FetchResponse<GetShopNotificationResponseData>;
/**
 * Request parameters for get_warehouse_detail
 *
 * For given shop id and region, return warehouse info including warehouse id, address id and location id, return all warehouse with once call.
 */
export interface GetWarehouseDetailRequest {
  /**
   * Type of warehouse. Applicable values: - 1: Pickup Warehouse- 2: Return WarehouseDefault value is 1 (Pickup Warehouse)
   */
  warehouse_type?: number;
}
/**
 * GetWarehouseDetail_Response sub-interface for GetWarehouseDetailResponse
 */
export interface GetWarehouseDetail_Response {
  /**
   * Warehouse address identifier. It should be unique for every warehouse address
   */
  warehouse_id?: number;
  /**
   * The warehouse name filled in when creating the warehouse address
   */
  warehouse_name?: string;
  /**
   * Type of warehouse. Applicable values: - 1: Pickup Warehouse- 2: Return Warehouse
   */
  warehouse_type?: number;
  /**
   * Location identifier for stocks. Different location_ids represent that your addresses are in different item stocks
   */
  location_id?: string;
  /**
   * Identity of address
   */
  address_id?: number;
  /**
   * Region of your warehouse address
   */
  region?: string;
  /**
   * State of your warehouse address
   */
  state?: string;
  /**
   * City of your warehouse address
   */
  city?: string;
  /**
   * Detail address of your warehouse address
   */
  address?: string;
  /**
   * Zipcode of your warehouse address
   */
  zipcode?: string;
  /**
   * Distinct of your warehouse address
   */
  district?: string;
  /**
   * Town of your warehouse address
   */
  town?: string;
  /**
   * State code of your warehouse address
   */
  state_code?: string;
  /**
   * The holiday mode state of your address.0: not in holiday mode1: holiday mode active2: holiday mode is turning of3: holiday mode is turning on
   */
  holiday_mode_state?: number;
}
/**
 * Response data payload for get_warehouse_detail
 */
export type GetWarehouseDetailResponseData = GetWarehouseDetail_Response[];
/**
 * Response payload for get_warehouse_detail
 *
 * For given shop id and region, return warehouse info including warehouse id, address id and location id, return all warehouse with once call.
 */
export type GetWarehouseDetailResponse = FetchResponse<GetWarehouseDetailResponseData>;
/**
 * Request parameters for set_shop_holiday_mode
 *
 * Use this API to set holiday periods in advance for automatic on/off of holiday mode and there are two holiday modes allowing sellers to choose whether to accept new orders during holiday.
 */
export interface SetShopHolidayModeRequest {
  /**
   * Indicate whether to enable holiday mode for the shop. true means turn ON, false means turn OFF.
   */
  holiday_mode_on: boolean;
  /**
   * Holiday type:0 - Full holiday，buyers cannot place new orders. The behavior remains consistent with the current Holiday Mode.1 - Partial holiday, buyers can continue placing orders, and the system will automatically extend the order’s Ship-By-Date (SBD).
   */
  holiday_mode_type?: number;
  /**
   * Holiday start time should be whole hour and could be parsed as "2026:01:16 15:00:00"
   */
  holiday_mode_start_time?: Date | number;
  /**
   * Holiday end time plus one second should be whole hour, which means the input timestamp must be able to be parsed as "2025:01:20 17:59:59"and the holiday_end_time must be larger than holiday_start_time
   */
  holiday_mode_end_time?: Date | number;
  /**
   * Description of the holiday
   */
  holiday_mode_description?: string;
}
/**
 * SetShopHolidayMode_Response sub-interface for SetShopHolidayModeResponse
 */
export interface SetShopHolidayMode_Response {
  /**
   * Debug message.
   */
  debug_msg?: string;
}
/**
 * Response data payload for set_shop_holiday_mode
 */
export type SetShopHolidayModeResponseData = SetShopHolidayMode_Response;
/**
 * Response payload for set_shop_holiday_mode
 *
 * Use this API to set holiday periods in advance for automatic on/off of holiday mode and there are two holiday modes allowing sellers to choose whether to accept new orders during holiday.
 */
export type SetShopHolidayModeResponse = FetchResponse<SetShopHolidayModeResponseData>;
/**
 * Request parameters for update_profile
 *
 * This API support to let sellers to update the shop name, shop logo, and shop description.
 */
export interface UpdateProfileRequest {
  /**
   * The new shop name
   */
  shop_name?: string;
  /**
   * The new shop logo url. Recommend to use images
   */
  shop_logo?: string;
  /**
   * The new shop description.
   */
  description?: string;
}
/**
 * UpdateProfile_Response sub-interface for UpdateProfileResponse
 */
export interface UpdateProfile_Response {
  /**
   * The Image URL of the shop logo after updated.
   */
  shop_logo?: string;
  /**
   * The content of the shop description after updated.
   */
  description?: string;
  /**
   * The content of the shop name after updated.
   */
  shop_name?: string;
}
/**
 * Response data payload for update_profile
 */
export type UpdateProfileResponseData = UpdateProfile_Response;
/**
 * Response payload for update_profile
 *
 * This API support to let sellers to update the shop name, shop logo, and shop description.
 */
export type UpdateProfileResponse = FetchResponse<UpdateProfileResponseData>;
