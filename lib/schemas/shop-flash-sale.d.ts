import { BaseResponse } from "./base.js";
/**
 * Status of shop flash sale
 */
export declare enum ShopFlashSaleStatus {
    /** Deleted */
    DELETED = 0,
    /** Enabled */
    ENABLED = 1,
    /** Disabled */
    DISABLED = 2,
    /** System rejected */
    SYSTEM_REJECTED = 3
}
/**
 * State/type of shop flash sale
 */
export declare enum ShopFlashSaleType {
    /** Upcoming */
    UPCOMING = 1,
    /** Ongoing */
    ONGOING = 2,
    /** Expired */
    EXPIRED = 3
}
/**
 * Status of items/models in shop flash sale
 */
export declare enum ShopFlashSaleItemStatus {
    /** Disabled */
    DISABLED = 0,
    /** Enabled */
    ENABLED = 1,
    /** Deleted */
    DELETED = 2,
    /** System rejected */
    SYSTEM_REJECTED = 4,
    /** Manual rejected */
    MANUAL_REJECTED = 5
}
/**
 * Time slot information
 */
export interface TimeSlot {
    /** Time slot ID */
    timeslot_id: number;
    /** Start time of time slot */
    start_time: number;
    /** End time of time slot */
    end_time: number;
}
/**
 * Shop flash sale basic information
 */
export interface ShopFlashSale {
    /** Time slot ID */
    timeslot_id: number;
    /** Flash sale ID */
    flash_sale_id: number;
    /** Status of shop flash sale */
    status: ShopFlashSaleStatus;
    /** Start time of shop flash sale */
    start_time?: number;
    /** End time of shop flash sale */
    end_time?: number;
    /** Number of enabled items in shop flash sale */
    enabled_item_count?: number;
    /** Number of items in shop flash sale */
    item_count?: number;
    /** State of shop flash sale */
    type?: ShopFlashSaleType;
    /** Number of reminders set */
    remindme_count?: number;
    /** Number of product clicks */
    click_count?: number;
}
/**
 * Model information for flash sale items with variations
 */
export interface FlashSaleModel {
    /** Model ID */
    model_id: number;
    /** Promotion price without tax */
    input_promo_price: number;
    /** Campaign stock */
    stock: number;
}
/**
 * Flash sale item information for add/update
 */
export interface FlashSaleItem {
    /** Item ID */
    item_id: number;
    /** Purchase limit, 0 means no limit */
    purchase_limit: number;
    /** Models for items with variations */
    models?: FlashSaleModel[];
    /** Promotion price without tax for items without variations */
    item_input_promo_price?: number;
    /** Campaign stock for items without variations */
    item_stock?: number;
}
/**
 * Unqualified condition information
 */
export interface UnqualifiedCondition {
    /** Error code for unqualified item */
    unqualified_code: number;
    /** Error message for unqualified item */
    unqualified_msg: string;
}
/**
 * Failed item information
 */
export interface FailedItem {
    /** Item ID */
    item_id: number;
    /** Model ID (empty if item has no variation) */
    model_id?: number;
    /** Error code */
    err_code: number;
    /** Error message */
    err_msg: string;
    /** Unqualified conditions */
    unqualified_conditions?: UnqualifiedCondition[];
}
/**
 * Model details for get items response
 */
export interface FlashSaleModelDetail {
    /** Item ID */
    item_id: number;
    /** Model ID */
    model_id: number;
    /** Model name */
    model_name: string;
    /** Status of model in shop flash sale */
    status: ShopFlashSaleItemStatus;
    /** Original price */
    original_price: number;
    /** Promotion price without tax */
    input_promotion_price: number;
    /** Promotion price with tax */
    promotion_price_with_tax: number;
    /** Purchase limit, 0 means no limit */
    purchase_limit: number;
    /** Campaign stock */
    campaign_stock: number;
    /** Active inventory */
    stock: number;
    /** Reject reason (if status is SYSTEM_REJECTED or MANUAL_REJECTED) */
    reject_reason?: string;
    /** Unqualified conditions */
    unqualified_conditions?: UnqualifiedCondition;
}
/**
 * Item information for get items response
 */
export interface FlashSaleItemDetail {
    /** Item ID */
    item_id: number;
    /** Item name */
    item_name: string;
    /** Item status */
    status: number;
    /** Item image */
    image: string;
    /** Status of item in shop flash sale (empty if item has variations) */
    item_status?: ShopFlashSaleItemStatus;
    /** Original price (empty if item has variations) */
    original_price?: number;
    /** Promotion price without tax (empty if item has variations) */
    input_promotion_price?: number;
    /** Promotion price with tax */
    promotion_price_with_tax?: number;
    /** Purchase limit (empty if item has variations) */
    purchase_limit?: number;
    /** Campaign stock */
    campaign_stock?: number;
    /** Active inventory */
    stock?: number;
    /** Reject reason (empty if item has variations) */
    reject_reason?: string;
    /** Unqualified conditions (empty if item has variations) */
    unqualified_conditions?: UnqualifiedCondition;
}
/**
 * Model information for update items
 */
export interface UpdateFlashSaleModel {
    /** Model ID */
    model_id: number;
    /** Status to set (0: disable, 1: enable) */
    status: 0 | 1;
    /** Promotion price without tax (cannot set if model is enabled) */
    input_promo_price?: number;
    /** Campaign stock (cannot set if model is enabled) */
    stock?: number;
}
/**
 * Item information for update items
 */
export interface UpdateFlashSaleItem {
    /** Item ID */
    item_id: number;
    /** Purchase limit (cannot set if item is enabled) */
    purchase_limit?: number;
    /** Models for items with variations */
    models?: UpdateFlashSaleModel[];
    /** Item status (0: disable, 1: enable) */
    item_status?: 0 | 1;
    /** Promotion price without tax (cannot set if item is enabled) */
    item_input_promo_price?: number;
    /** Campaign stock (cannot set if item is enabled) */
    item_stock?: number;
}
/**
 * Category information for item criteria
 */
export interface CriteriaCategory {
    /** Category ID, 0 means all categories */
    category_id: number;
    /** Category name */
    name: string;
    /** Parent category ID, 0 means L1 category */
    parent_id: number;
}
/**
 * Criteria detail for items
 */
export interface ItemCriteria {
    /** Criteria ID */
    criteria_id: number;
    /** Product rating (0.0-5.0), -1 means no limit */
    min_product_rating: number;
    /** Likes, -1 means no limit */
    min_likes: number;
    /** Pre-order requirement */
    must_not_pre_order: boolean;
    /** Orders in the last 30 days, -1 means no limit */
    min_order_total: number;
    /** Days to ship, -1 means no limit */
    max_days_to_ship: number;
    /** Repetition control (same product cannot join ISFS within N days), -1 means no limit */
    min_repetition_day: number;
    /** Promo stock minimum, -1 means no limit */
    min_promo_stock: number;
    /** Promo stock maximum, -1 means no limit */
    max_promo_stock: number;
    /** Discount limit minimum (percentage), -1 means no limit */
    min_discount: number;
    /** Discount limit maximum (percentage), -1 means no limit */
    max_discount: number;
    /** Discount price minimum, -1 means no limit (real value = min_discount_price / 100000) */
    min_discount_price: number;
    /** Discount price maximum, -1 means no limit (real value = max_discount_price / 100000) */
    max_discount_price: number;
    /** Must be lower than lowest price in last 7 days */
    need_lowest_price: boolean;
}
/**
 * Mapping between criteria and categories
 */
export interface CriteriaPair {
    /** Criteria ID */
    criteria_id: number;
    /** Categories that this criteria applies to */
    category_list: CriteriaCategory[];
}
/**
 * Parameters for getting time slot IDs
 */
export interface GetTimeSlotIdParams {
    /** Start time (min = now, max = 2145887999, should be < end_time) */
    start_time: number;
    /** End time (should be > start_time, max = 2145887999) */
    end_time: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for creating shop flash sale
 */
export interface CreateShopFlashSaleParams {
    /** Time slot ID (get from getTimeSlotId API, must be in the future) */
    timeslot_id: number;
}
/**
 * Parameters for getting shop flash sale details
 */
export interface GetShopFlashSaleParams {
    /** Flash sale ID */
    flash_sale_id: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for getting shop flash sale list
 */
export interface GetShopFlashSaleListParams {
    /** Filter by type (0: all, 1: upcoming, 2: ongoing, 3: expired) */
    type: 0 | 1 | 2 | 3;
    /** Start time for filtering (optional, use with end_time) */
    start_time?: number;
    /** End time for filtering (optional, use with start_time) */
    end_time?: number;
    /** Offset for pagination (min=0, max=1000) */
    offset: number;
    /** Limit for pagination (min=1, max=100) */
    limit: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for updating shop flash sale status
 */
export interface UpdateShopFlashSaleParams {
    /** Flash sale ID */
    flash_sale_id: number;
    /** Status to set (1: enable, 2: disable) */
    status: 1 | 2;
}
/**
 * Parameters for deleting shop flash sale
 */
export interface DeleteShopFlashSaleParams {
    /** Flash sale ID (cannot delete ongoing and expired flash sales) */
    flash_sale_id: number;
}
/**
 * Parameters for adding items to shop flash sale
 */
export interface AddShopFlashSaleItemsParams {
    /** Flash sale ID */
    flash_sale_id: number;
    /** Items to add */
    items: FlashSaleItem[];
}
/**
 * Parameters for getting shop flash sale items
 */
export interface GetShopFlashSaleItemsParams {
    /** Flash sale ID */
    flash_sale_id: number;
    /** Offset for pagination (min=0, max=1000) */
    offset: number;
    /** Limit for pagination (min=1, max=100) */
    limit: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Parameters for updating shop flash sale items
 */
export interface UpdateShopFlashSaleItemsParams {
    /** Flash sale ID */
    flash_sale_id: number;
    /** Items to update */
    items: UpdateFlashSaleItem[];
}
/**
 * Parameters for deleting shop flash sale items
 */
export interface DeleteShopFlashSaleItemsParams {
    /** Flash sale ID */
    flash_sale_id: number;
    /** Item IDs to delete (deleting an item will delete all its models) */
    item_ids: number[];
}
/**
 * Parameters for getting item criteria (no parameters required)
 */
export type GetItemCriteriaParams = Record<string, never>;
/**
 * Response for getting time slot IDs
 */
export interface GetTimeSlotIdResponse extends BaseResponse {
    response: TimeSlot[];
}
/**
 * Response for creating shop flash sale
 */
export interface CreateShopFlashSaleResponse extends BaseResponse {
    response: {
        timeslot_id: number;
        flash_sale_id: number;
        status: ShopFlashSaleStatus;
    };
}
/**
 * Response for getting shop flash sale details
 */
export interface GetShopFlashSaleResponse extends BaseResponse {
    response: {
        timeslot_id: number;
        flash_sale_id: number;
        status: ShopFlashSaleStatus;
        start_time: number;
        end_time: number;
        enabled_item_count: number;
        item_count: number;
        type: ShopFlashSaleType;
    };
}
/**
 * Response for getting shop flash sale list
 */
export interface GetShopFlashSaleListResponse extends BaseResponse {
    response: {
        total_count: number;
    };
    flash_sale_list: ShopFlashSale[];
}
/**
 * Response for updating shop flash sale
 */
export interface UpdateShopFlashSaleResponse extends BaseResponse {
    response: {
        timeslot_id: number;
        flash_sale_id: number;
        status: ShopFlashSaleStatus;
    };
}
/**
 * Response for deleting shop flash sale
 */
export interface DeleteShopFlashSaleResponse extends BaseResponse {
    response: {
        timeslot_id: number;
        flash_sale_id: number;
        status: ShopFlashSaleStatus;
    };
}
/**
 * Response for adding items to shop flash sale
 */
export interface AddShopFlashSaleItemsResponse extends BaseResponse {
    response: {
        failed_items: FailedItem[];
    };
}
/**
 * Response for getting shop flash sale items
 */
export interface GetShopFlashSaleItemsResponse extends BaseResponse {
    response: {
        total_count: number;
        models: FlashSaleModelDetail[];
        item_info: FlashSaleItemDetail[];
    };
}
/**
 * Response for updating shop flash sale items
 */
export interface UpdateShopFlashSaleItemsResponse extends BaseResponse {
    response: {
        failed_items: FailedItem[];
    };
}
/**
 * Response for deleting shop flash sale items
 */
export interface DeleteShopFlashSaleItemsResponse extends BaseResponse {
    response: {
        failed_items?: FailedItem[];
    };
}
/**
 * Response for getting item criteria
 */
export interface GetItemCriteriaResponse extends BaseResponse {
    response: {
        criteria: ItemCriteria[];
        pair_ids: CriteriaPair[];
        overlap_block_category_ids: number[];
    };
}
