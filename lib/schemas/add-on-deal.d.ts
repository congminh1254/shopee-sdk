import { BaseResponse } from "./base.js";
/**
 * Add-on deal promotion types
 */
export declare enum AddOnDealPromotionType {
    /** Add-on discount promotion */
    ADD_ON_DISCOUNT = 0,
    /** Gift with minimum spend promotion */
    GIFT_WITH_MIN_SPEND = 1
}
/**
 * Add-on deal promotion status for filtering
 */
export declare enum AddOnDealPromotionStatus {
    /** All add-on deals regardless of status */
    ALL = "all",
    /** Currently active add-on deals */
    ONGOING = "ongoing",
    /** Add-on deals that have not started yet */
    UPCOMING = "upcoming",
    /** Add-on deals that have ended */
    EXPIRED = "expired"
}
/**
 * Main item status
 */
export declare enum AddOnDealMainItemStatus {
    /** Deleted status */
    DELETED = 0,
    /** Active status */
    ACTIVE = 1
}
/**
 * Sub item status
 */
export declare enum AddOnDealSubItemStatus {
    /** Deleted status */
    DELETED = 0,
    /** Active status */
    ACTIVE = 1
}
/**
 * Main item in add-on deal
 */
export interface AddOnDealMainItem {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Status of the main item (0=deleted, 1=active) */
    status: AddOnDealMainItemStatus;
}
/**
 * Sub item (discounted/gift item) in add-on deal
 */
export interface AddOnDealSubItem {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Shopee's unique identifier for a model (variation) */
    model_id: number;
    /** Discounted price or gift price for the sub item */
    sub_item_input_price: number;
    /** Maximum quantity of this sub item that can be purchased per order */
    sub_item_limit?: number;
    /** Status of the sub item (0=deleted, 1=active) */
    status: AddOnDealSubItemStatus;
}
/**
 * Failed item in batch operations
 */
export interface AddOnDealFailedItem {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Shopee's unique identifier for a model (variation) - only for sub items */
    model_id?: number;
    /** Error code */
    fail_error: string;
    /** Error message */
    fail_message: string;
}
/**
 * Add-on deal information
 */
export interface AddOnDealInfo {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** Title of the add on deal */
    add_on_deal_name: string;
    /** The time when add on deal activity start */
    start_time: number;
    /** The time when add on deal activity end */
    end_time: number;
    /** The type of add on deal (0=add on discount, 1=gift with min spend) */
    promotion_type: AddOnDealPromotionType;
    /** The minimum purchase amount that needs to be met to buy the gift with min spend */
    purchase_min_spend?: number;
    /** Number of gifts that buyers can get */
    per_gift_num?: number;
    /** Max number of add-on products that a customer can purchase per order */
    promotion_purchase_limit?: number;
    /** The display sequence of sub items in buyer side */
    sub_item_priority: number[];
    /** The create source of add on deal (0=shopee admin, 1=seller) */
    source: number;
}
/**
 * Parameters for adding a new add-on deal
 */
export interface AddAddOnDealParams {
    /** Title of the add on deal (max 25 characters) */
    add_on_deal_name: string;
    /** The time when add on deal activity start (must be 1 hour later than current time) */
    start_time: number;
    /** The time when add on deal activity end (must be 1 hour later than start time) */
    end_time: number;
    /** The type of add on deal (0=add on discount, 1=gift with min spend) */
    promotion_type: AddOnDealPromotionType;
    /** The minimum purchase amount that needs to be met to buy the gift with min spend */
    purchase_min_spend?: number;
    /** Number of gifts that buyers can get (1-50) */
    per_gift_num?: number;
    /** Max number of add-on products that a customer can purchase per order (1-100) */
    promotion_purchase_limit?: number;
}
/**
 * Parameters for adding main items to an add-on deal
 */
export interface AddAddOnDealMainItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of main items to add */
    main_item_list: AddOnDealMainItem[];
}
/**
 * Parameters for adding sub items to an add-on deal
 */
export interface AddAddOnDealSubItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of sub items to add */
    sub_item_list: AddOnDealSubItem[];
}
/**
 * Parameters for deleting an add-on deal
 */
export interface DeleteAddOnDealParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
}
/**
 * Parameters for deleting main items from an add-on deal
 */
export interface DeleteAddOnDealMainItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of item IDs to delete */
    item_id_list: number[];
}
/**
 * Parameters for deleting sub items from an add-on deal
 */
export interface DeleteAddOnDealSubItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of sub items to delete */
    sub_item_list: Array<{
        /** Shopee's unique identifier for an item */
        item_id: number;
        /** Shopee's unique identifier for a model (variation) */
        model_id: number;
    }>;
}
/**
 * Parameters for ending an add-on deal
 */
export interface EndAddOnDealParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
}
/**
 * Parameters for getting an add-on deal
 */
export interface GetAddOnDealParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    [key: string]: string | number | boolean | (string | number | boolean)[] | null | undefined;
}
/**
 * Parameters for getting add-on deal list
 */
export interface GetAddOnDealListParams {
    /** Filter by promotion status (default: all) */
    promotion_status: AddOnDealPromotionStatus;
    /** Page number (1-1000, default: 1) */
    page_no?: number;
    /** Number of items per page (1-100, default: 100) */
    page_size?: number;
    [key: string]: string | number | boolean | (string | number | boolean)[] | null | undefined;
}
/**
 * Parameters for getting main items in an add-on deal
 */
export interface GetAddOnDealMainItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    [key: string]: string | number | boolean | (string | number | boolean)[] | null | undefined;
}
/**
 * Parameters for getting sub items in an add-on deal
 */
export interface GetAddOnDealSubItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    [key: string]: string | number | boolean | (string | number | boolean)[] | null | undefined;
}
/**
 * Parameters for updating an add-on deal
 */
export interface UpdateAddOnDealParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** Title of the add on deal */
    add_on_deal_name?: string;
    /** The time when add on deal activity start */
    start_time?: number;
    /** The time when add on deal activity end */
    end_time?: number;
    /** The minimum purchase amount that needs to be met to buy the gift with min spend */
    purchase_min_spend?: number;
    /** Number of gifts that buyers can get */
    per_gift_num?: number;
    /** Max number of add-on products that a customer can purchase per order */
    promotion_purchase_limit?: number;
    /** The order of sub items */
    sub_item_priority?: number[];
}
/**
 * Parameters for updating main items in an add-on deal
 */
export interface UpdateAddOnDealMainItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of main items to update */
    main_item_list: AddOnDealMainItem[];
}
/**
 * Parameters for updating sub items in an add-on deal
 */
export interface UpdateAddOnDealSubItemParams {
    /** Shopee's unique identifier for an add on deal activity */
    add_on_deal_id: number;
    /** List of sub items to update */
    sub_item_list: AddOnDealSubItem[];
}
/**
 * Response for the add add-on deal API
 */
export interface AddAddOnDealResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
    };
}
/**
 * Response for the add add-on deal main item API
 */
export interface AddAddOnDealMainItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of main items that were added */
        main_item_list: AddOnDealMainItem[];
    };
}
/**
 * Response for the add add-on deal sub item API
 */
export interface AddAddOnDealSubItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of sub items that failed to be added */
        sub_item_list: AddOnDealFailedItem[];
    };
}
/**
 * Response for the delete add-on deal API
 */
export interface DeleteAddOnDealResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
    };
}
/**
 * Response for the delete add-on deal main item API
 */
export interface DeleteAddOnDealMainItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of item IDs that failed to be deleted */
        failed_item_id_list: number[];
    };
}
/**
 * Response for the delete add-on deal sub item API
 */
export interface DeleteAddOnDealSubItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of sub items that failed to be deleted */
        sub_item_list: AddOnDealFailedItem[];
    };
}
/**
 * Response for the end add-on deal API
 */
export interface EndAddOnDealResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
    };
}
/**
 * Response for the get add-on deal API
 */
export interface GetAddOnDealResponse extends BaseResponse {
    response: AddOnDealInfo;
}
/**
 * Response for the get add-on deal list API
 */
export interface GetAddOnDealListResponse extends BaseResponse {
    response: {
        /** List of add-on deals */
        add_on_deal_list: AddOnDealInfo[];
        /** Whether there are more pages */
        more: boolean;
    };
}
/**
 * Response for the get add-on deal main item API
 */
export interface GetAddOnDealMainItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of main items */
        main_item_list: AddOnDealMainItem[];
    };
}
/**
 * Response for the get add-on deal sub item API
 */
export interface GetAddOnDealSubItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of sub items */
        sub_item_list: AddOnDealSubItem[];
    };
}
/**
 * Response for the update add-on deal API
 */
export interface UpdateAddOnDealResponse extends BaseResponse {
    response: AddOnDealInfo;
}
/**
 * Response for the update add-on deal main item API
 */
export interface UpdateAddOnDealMainItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of main items that were updated */
        main_item_list: AddOnDealMainItem[];
    };
}
/**
 * Response for the update add-on deal sub item API
 */
export interface UpdateAddOnDealSubItemResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an add on deal activity */
        add_on_deal_id: number;
        /** List of sub items that failed to be updated */
        sub_item_list: AddOnDealFailedItem[];
    };
}
