import { BaseResponse } from "./base.js";
/**
 * Status of discounts for filtering in discount list query
 */
export declare enum DiscountStatus {
    /** All discounts regardless of status */
    ALL = "all",
    /** Discounts that have not started yet */
    UPCOMING = "upcoming",
    /** Currently active discounts */
    ONGOING = "ongoing",
    /** Discounts that have ended */
    EXPIRED = "expired"
}
/**
 * Model information for discount items with variations
 */
export interface DiscountModel {
    /** Shopee's unique identifier for a variation of an item */
    model_id: number;
    /** The discount price of the variation */
    model_promotion_price: number;
}
/**
 * Discount item information
 */
export interface DiscountItem {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The max number of this product in the promotion price */
    purchase_limit?: number;
    /** The discount price of the item. If there is variation, this field is not needed */
    item_promotion_price?: number;
    /** The list of variations for this item */
    model_list?: DiscountModel[];
}
/**
 * Parameters for adding a new discount
 */
export interface AddDiscountParams {
    /** Title of the discount */
    discount_name: string;
    /** The time when discount activity start. Must be 1 hour later than current time */
    start_time: number;
    /** The time when discount activity end. Must be 1 hour later than start time, and the discount period must be less than 180 days */
    end_time: number;
}
/**
 * Parameters for adding items to a discount
 */
export interface AddDiscountItemParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** The items added in this discount promotion */
    item_list: DiscountItem[];
}
/**
 * Parameters for deleting a discount
 */
export interface DeleteDiscountParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
}
/**
 * Parameters for deleting an item from a discount
 */
export interface DeleteDiscountItemParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Shopee's unique identifier for a variation of an item. If item has no variation, set to 0 */
    model_id?: number;
}
/**
 * Parameters for ending a discount immediately
 */
export interface EndDiscountParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
}
/**
 * Parameters for getting discount details
 */
export interface GetDiscountParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** Specifies the page number of data to return. Starting from 1 */
    page_no: number;
    /** Maximum number of entries to retrieve per page */
    page_size: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for getting a list of discounts
 */
export interface GetDiscountListParams {
    /** The status of discount promotion */
    discount_status: DiscountStatus;
    /** Specifies the page number of data to return. Default 1 */
    page_no?: number;
    /** Maximum number of entries to retrieve per page. Default 100, max 100 */
    page_size?: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for updating a discount
 */
export interface UpdateDiscountParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** Title of the discount */
    discount_name?: string;
    /** The time when discount activity start */
    start_time?: number;
    /** The time when discount activity end */
    end_time?: number;
}
/**
 * Parameters for updating discount items
 */
export interface UpdateDiscountItemParams {
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** The items to update in this discount promotion */
    item_list: DiscountItem[];
}
/**
 * Error information for failed item operations
 */
export interface DiscountItemError {
    /** The item ID that failed */
    item_id?: number;
    /** The model ID that failed */
    model_id?: number;
    /** The error message */
    fail_message?: string;
    /** The error code */
    fail_error?: string;
}
/**
 * Model information in get discount response
 */
export interface DiscountModelInfo {
    /** Shopee's unique identifier for a variation of an item */
    model_id: number;
    /** Name of the variation that belongs to the same item */
    model_name: string;
    /** The current stock quantity of the variation */
    model_normal_stock: number;
    /** The reserved stock of the model */
    model_promotion_stock: number;
    /** The original price before discount of the variation */
    model_original_price: number;
    /** The discount price of the variation */
    model_promotion_price: number;
    /** The original price after tax of model (Only for taxable Shop) */
    model_inflated_price_of_original_price?: number;
    /** The discount price after tax of model (Only for taxable Shop) */
    model_inflated_price_of_promotion_price?: number;
    /** The local price of model */
    model_local_price?: number;
    /** The local discount price of model */
    model_local_promotion_price?: number;
    /** The local price after tax of model (Only for taxable Shop) */
    model_local_price_inflated?: number;
    /** The local discount price after tax of model (Only for taxable Shop) */
    model_local_promotion_price_inflated?: number;
}
/**
 * Item information in get discount response
 */
export interface DiscountItemInfo {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Name of the item in local language */
    item_name: string;
    /** The current stock quantity of the item */
    normal_stock: number;
    /** The reserved stock of the item */
    item_promotion_stock: number;
    /** The original price before discount of the item */
    item_original_price: number;
    /** The discount price of the item */
    item_promotion_price: number;
    /** The original price after tax of item (Only for taxable Shop) */
    item_inflated_price_of_original_price?: number;
    /** The discount price after tax of item (Only for taxable Shop) */
    item_inflated_price_of_promotion_price?: number;
    /** The local price of item */
    item_local_price?: number;
    /** The local discount price of item */
    item_local_promotion_price?: number;
    /** The local price after tax of item (Only for taxable Shop) */
    item_local_price_inflated?: number;
    /** The local discount price after tax of item (Only for taxable Shop) */
    item_local_promotion_price_inflated?: number;
    /** The list of variations for this item */
    model_list: DiscountModelInfo[];
    /** The max number of this product in the promotion price */
    purchase_limit: number;
}
/**
 * Discount information in list response
 */
export interface DiscountInfo {
    /** The status of discount promotion */
    status: string;
    /** Title of the discount */
    discount_name: string;
    /** The time when discount activity start */
    start_time: number;
    /** Shopee's unique identifier for a discount activity */
    discount_id: number;
    /** The source of the discount. 0: seller created, 1: Shopee created */
    source?: number;
    /** The time when discount activity end */
    end_time: number;
}
/**
 * Response for the add discount API
 */
export interface AddDiscountResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
    };
}
/**
 * Response for the add discount item API
 */
export interface AddDiscountItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The number of items successfully added */
        count: number;
        /** List of items that failed to be added */
        error_list: DiscountItemError[];
        /** Warning message if any */
        warning?: string;
    };
}
/**
 * Response for the delete discount API
 */
export interface DeleteDiscountResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The time when the discount was modified */
        modify_time: number;
    };
}
/**
 * Response for the delete discount item API
 */
export interface DeleteDiscountItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** List of items that failed to be deleted */
        error_list: DiscountItemError[];
    };
}
/**
 * Response for the end discount API
 */
export interface EndDiscountResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The time when the discount was modified */
        modify_time: number;
    };
}
/**
 * Response for the get discount API
 */
export interface GetDiscountResponse extends BaseResponse {
    response: {
        /** The status of discount promotion */
        status: string;
        /** Title of the discount */
        discount_name: string;
        /** The items selected in this discount */
        item_list: DiscountItemInfo[];
        /** The time when discount activity start */
        start_time: number;
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The time when discount activity end */
        end_time: number;
        /** This is to indicate whether the item list is more than one page */
        more: boolean;
    };
}
/**
 * Response for the get discount list API
 */
export interface GetDiscountListResponse extends BaseResponse {
    response: {
        /** The list of discounts matching the query parameters */
        discount_list: DiscountInfo[];
        /** Indicates whether there are more pages of discounts to retrieve */
        more: boolean;
    };
}
/**
 * Response for the update discount API
 */
export interface UpdateDiscountResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The time when the discount was modified */
        modify_time: number;
    };
}
/**
 * Response for the update discount item API
 */
export interface UpdateDiscountItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for a discount activity */
        discount_id: number;
        /** The number of items successfully updated */
        count: number;
        /** List of items that failed to be updated */
        error_list: DiscountItemError[];
    };
    /** Warning message if any */
    warning?: string;
}
/**
 * SIP discount information
 */
export interface SipDiscountInfo {
    /** The region of SIP affiliate shop */
    region: string;
    /** The status of discount for SIP affiliate shop in current region, can be upcoming/ongoing, excluding expired discounts */
    status: string;
    /** The discount rate set for SIP affiliate shop in current region */
    sip_discount_rate: number;
    /** The start time of discount for SIP affiliate shop in current region, in UNIX seconds */
    start_time: number;
    /** The end time of discount for SIP affiliate shop in current region, in UNIX seconds */
    end_time: number;
    /** The create time of discount for SIP affiliate shop in current region, in UNIX seconds */
    create_time: number;
    /** The latest update time of discount for SIP affiliate shop in current region, in UNIX seconds */
    update_time: number;
}
/**
 * Parameters for getting SIP discounts
 */
export interface GetSipDiscountsParams {
    /** The region of SIP affiliate shop that needs to get discount information. If not passed, will return the discount information set for all SIP affiliate shops */
    region?: string;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for setting SIP discount
 */
export interface SetSipDiscountParams {
    /** The region of SIP affiliate shop that needs to set discount */
    region: string;
    /** The overall market discount rate that will apply to all items for SIP affiliate shop in current region */
    sip_discount_rate: number;
}
/**
 * Parameters for deleting SIP discount
 */
export interface DeleteSipDiscountParams {
    /** The region of SIP affiliate shop that needs to delete discount */
    region: string;
}
/**
 * Response for the get SIP discounts API
 */
export interface GetSipDiscountsResponse extends BaseResponse {
    response: {
        /** List of discounts in each region */
        discount_list: SipDiscountInfo[];
    };
}
/**
 * Response for the set SIP discount API
 */
export interface SetSipDiscountResponse extends BaseResponse {
    response: SipDiscountInfo;
}
/**
 * Response for the delete SIP discount API
 */
export interface DeleteSipDiscountResponse extends BaseResponse {
    response: {
        /** The region of SIP affiliate shop that was deleted */
        region: string;
    };
}
