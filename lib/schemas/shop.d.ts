import { BaseResponse } from "./base.js";
/**
 * Parameters for getting shop profile
 * Use this API to get information of shop.
 */
export type GetProfileParams = Record<string, never>;
/**
 * Shop profile information
 */
export type ShopProfile = {
    /** The Image URL of the shop logo */
    shop_logo: string;
    /** The content of the shop description */
    description: string;
    /** The content of the shop name */
    shop_name: string;
    /** The invoice issuer information for the shop. It could be "Shopee" or "Other" as the invoice issuer. This is for BR CNPJ seller only. */
    invoice_issuer?: string;
};
/**
 * Response for getting shop profile
 */
export type GetProfileResponse = BaseResponse & {
    /** The information about shop logo, shop name, shop description */
    response: ShopProfile;
};
/**
 * Parameters for getting shop information
 * Use this call to get information of shop
 */
export type GetShopInfoParams = Record<string, never>;
/**
 * SIP affiliate shop information
 */
export type SipAffiShop = {
    /** Affiliate shop's id */
    affi_shop_id: number;
    /** Affiliate Shop's area */
    region: string;
};
/**
 * Linked direct shop information
 */
export type LinkedDirectShop = {
    /** Shop ID of the Cross Border Direct Shop */
    direct_shop_id: number;
    /** Shop Region of the Cross Border Direct Shop */
    direct_shop_region: string;
};
/**
 * Outlet shop information
 */
export type OutletShopInfo = {
    /** Shop ID of the Outlet Shop */
    outlet_shop_id: number;
};
/**
 * Response for getting shop information
 */
export type GetShopInfoResponse = BaseResponse & {
    /** Name of the shop */
    shop_name: string;
    /** Shop's area */
    region: string;
    /** Applicable status: BANNED, FROZEN, NORMAL */
    status: string;
    /** SIP affiliate shops info list. If you request for SIP primary shop, this field will be returned, if you request for SIP affiliate shop, this field won't be returned */
    sip_affi_shops?: SipAffiShop[];
    /** Use this filed to indicate whether the shop is a cross-border shop */
    is_cb: boolean;
    /** The timestamp when the shop was authorized to the partner */
    auth_time: number;
    /** Use this field to indicate the expiration date for shop authorization */
    expire_time: number;
    /** This filed will return "true" when SIP primary shop or affiliate shop calls */
    is_sip: boolean;
    /** Use this filed to indicate whether this merchant is upgraded to CBSC, including CNSC and KRSC */
    is_upgraded_cbsc?: boolean;
    /** Shopee's unique identifier for a merchant. If the shop won't under any merchant, then the value will be null */
    merchant_id?: number;
    /** Use this field to indicate the fulfillment type of current shop */
    shop_fulfillment_flag?: string;
    /** Identifies if the current shop is a Local Shop linked to Cross Border Direct Shop */
    is_main_shop?: boolean;
    /** Identifies if the current shop is a Cross Border Direct Shop */
    is_direct_shop?: boolean;
    /** Returns the Shop ID of the Local Shop linked to the Cross Border Direct Shop */
    linked_main_shop_id?: number;
    /** Returns the list of Cross Border Direct Shops linked to the Local Shop */
    linked_direct_shop_list?: LinkedDirectShop[];
    /** Use this filed to indicate if the shop is in 1-AWB whitelist */
    is_one_awb?: boolean;
    /** Indicates whether the current shop is a Mart Shop */
    is_mart_shop?: boolean;
    /** Indicates whether the current shop is an Outlet Shop */
    is_outlet_shop?: boolean;
    /** (Only returned when requesting an Outlet Shop) Refers to the Mart Shop ID this Outlet belongs to */
    mart_shop_id?: number;
    /** (Only returned when requesting a Mart Shop) List of Outlet Shop IDs under this Mart Shop */
    outlet_shop_info_list?: OutletShopInfo[];
};
/**
 * Parameters for updating shop profile
 * This API support to let sellers to update the shop name, shop logo, and shop description.
 */
export type UpdateProfileParams = {
    /** The new shop name */
    shop_name?: string;
    /** The new shop logo url. Recommend to use images */
    shop_logo?: string;
    /** The new shop description */
    description?: string;
};
/**
 * Updated shop profile information
 */
export type UpdatedShopProfile = {
    /** The Image URL of the shop logo after updated */
    shop_logo?: string;
    /** The content of the shop description after updated */
    description?: string;
    /** The content of the shop name after updated */
    shop_name?: string;
};
/**
 * Response for updating shop profile
 */
export type UpdateProfileResponse = BaseResponse & {
    /** If update successfully, the information is about shop logo, shop name, shop description */
    response: UpdatedShopProfile;
};
/**
 * Parameters for getting warehouse detail
 * For given shop id and region, return warehouse info including warehouse id, address id and location id
 */
export type GetWarehouseDetailParams = {
    /** Type of warehouse. Applicable values: 1: Pickup Warehouse, 2: Return Warehouse. Default value is 1 (Pickup Warehouse) */
    warehouse_type?: number;
};
/**
 * Warehouse detail information
 */
export type WarehouseDetail = {
    /** Warehouse address identifier. It should be unique for every warehouse address */
    warehouse_id: number;
    /** The warehouse name filled in when creating the warehouse address */
    warehouse_name: string;
    /** Type of warehouse. Applicable values: 1: Pickup Warehouse, 2: Return Warehouse */
    warehouse_type: number;
    /** Location identifier for stocks. Different location_ids represent that your addresses are in different item stocks */
    location_id: string;
    /** Identity of address */
    address_id: number;
    /** Region of your warehouse address */
    region: string;
    /** State of your warehouse address */
    state: string;
    /** City of your warehouse address */
    city: string;
    /** Detail address of your warehouse address */
    address: string;
    /** Zipcode of your warehouse address */
    zipcode: string;
    /** Distinct of your warehouse address */
    district: string;
    /** Town of your warehouse address */
    town: string;
    /** State code of your warehouse address */
    state_code: string;
    /** The holiday mode state of your address. 0: not in holiday mode, 1: holiday mode active, 2: holiday mode is turning off, 3: holiday mode is turning on */
    holiday_mode_state: number;
};
/**
 * Response for getting warehouse detail
 */
export type GetWarehouseDetailResponse = BaseResponse & {
    /** List of warehouse details */
    response: WarehouseDetail[];
};
/**
 * Parameters for getting shop notification
 * Get Seller Center notification, the permission is controlled by App type
 */
export type GetShopNotificationParams = {
    /** The last notification_id returned on the page. When using the cursor, notifications will start with the one following this cursor notification. If no cursor is provided, the latest message from the shop will be returned. */
    cursor?: number;
    /** Default 10; maximum 50 */
    page_size?: number;
};
/**
 * Shop notification data
 */
export type ShopNotificationData = {
    /** the notification create time */
    create_time: number;
    /** The content of the notification */
    content: string;
    /** The content of the notification */
    title: string;
    /** Some notification may be attached with URL, it will redirect to seller center */
    url: string;
};
/**
 * Response for getting shop notification
 */
export type GetShopNotificationResponse = BaseResponse & {
    /** Last notification_id returned in the page */
    cursor: number;
    /** Notification data */
    data: ShopNotificationData;
};
/**
 * Parameters for getting authorised reseller brand
 * Get the authorised reseller brand list for the shop.
 */
export type GetAuthorisedResellerBrandParams = {
    /** Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. */
    page_no: number;
    /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 30. */
    page_size: number;
};
/**
 * Authorised brand information
 */
export type AuthorisedBrand = {
    /** ID of the authorised brand, it may be the same in different regions */
    brand_id: number;
    /** Name of the authorised brand */
    brand_name: string;
};
/**
 * Authorised reseller brand response data
 */
export type AuthorisedResellerBrandData = {
    /** This is to indicate whether the shop is authorised reseller */
    is_authorised_reseller: boolean;
    /** The number of authorised brand linked with the shop */
    total_count: number;
    /** This is to indicate whether the authorised brand list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of authorised brand. */
    more: boolean;
    /** List of authorised brands */
    authorised_brand_list: AuthorisedBrand[];
};
/**
 * Response for getting authorised reseller brand
 */
export type GetAuthorisedResellerBrandResponse = BaseResponse & {
    /** Authorised reseller brand data */
    response: AuthorisedResellerBrandData;
};
/**
 * Parameters for getting BR shop onboarding info
 */
export type GetBRShopOnboardingInfoParams = Record<string, never>;
/**
 * Billing address information
 */
export type BillingAddress = {
    /** State of the billing address */
    state?: string;
    /** City of the billing address */
    city?: string;
    /** Specific detail of the billing address */
    address?: string;
    /** ZIP code of the billing address */
    zipcode?: string;
    /** Neighborhood of the billing address */
    neighborhood?: string;
};
/**
 * BR shop onboarding information
 */
export type BRShopOnboardingInfo = {
    /** Type of the shop's tax ID. 1: Personal seller (CPF), 2: Company seller (CNPJ) */
    tax_id_type?: number;
    /** The shop's tax ID. When tax_id_type = 1 (Personal seller), it is CPF. When tax_id_type = 2 (Company seller), it is CNPJ. */
    tax_id?: string;
    /** CPF number of the individual seller. Valid only when tax_id_type = 1. */
    cpf_id?: string;
    /** CNPJ number of the company seller. Valid only when tax_id_type = 2. */
    cnpj_id?: string;
    /** Full name of the individual seller. Valid only when tax_id_type = 1. */
    name?: string;
    /** Legal name of the company seller. Valid only when tax_id_type = 2. */
    legal_entity_name?: string;
    /** Birthday of the individual seller (stored as Unix timestamp). Valid only when tax_id_type = 1. */
    birthday?: number;
    /** Birthday of the individual seller (formatted as YYYY-MM-DD). Valid only when tax_id_type = 1. */
    birthday_str?: string;
    /** State registration number of the shop */
    state_registration?: string;
    /** Shop's billing address details */
    billing_address?: BillingAddress;
    /** Status of the shop's current KYC onboarding process. 0: None, 1: Regis Processing, 2: Regis Validated, 3: Regis Rejected, 4: KYC Pending, 5: KYC Processing, 6: KYC Processing Manually, 7: KYC Validated, 8: KYC Rejected */
    onboarding_status?: number;
    /** Timestamp when the onboarding information was submitted */
    submission_time?: number;
    /** Nationality of the individual seller. Valid only when tax_id_type=1. */
    nationality?: string;
    /** Main CNAE code */
    cnae_main?: string;
    /** Secondary CNAE code */
    cnae_secondary?: string;
    /** MEI verification result. 0: No, 1: Yes */
    mei_check?: string;
    /** Indicate if the shop has passed KYC verification */
    onboarding_passed?: boolean;
};
/**
 * Response for getting BR shop onboarding info
 */
export type GetBRShopOnboardingInfoResponse = BaseResponse & {
    /** Onboarding information of the Shop */
    response?: BRShopOnboardingInfo;
};
/**
 * Parameters for getting shop holiday mode
 */
export type GetShopHolidayModeParams = Record<string, never>;
/**
 * Response for getting shop holiday mode
 */
export type GetShopHolidayModeResponse = BaseResponse & {
    response?: {
        /** Indicate whether the shop has enabled holiday mode. true means ON, false means OFF. */
        holiday_mode_on?: boolean;
        /** The last time the holiday mode was modified */
        holiday_mode_mtime?: number;
        /** Debug message */
        debug_msg?: string;
    };
};
/**
 * Parameters for setting shop holiday mode
 */
export type SetShopHolidayModeParams = {
    /** Indicate whether to enable holiday mode for the shop. true means turn ON, false means turn OFF. */
    holiday_mode_on: boolean;
};
/**
 * Response for setting shop holiday mode
 */
export type SetShopHolidayModeResponse = BaseResponse & {
    response?: {
        /** Debug message */
        debug_msg?: string;
    };
};
