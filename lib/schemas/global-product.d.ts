import { FetchResponse } from "./fetch.js";
import { BaseResponse } from "./base.js";
import { Attribute } from "./attribute.js";
/**
 * Global category information
 */
export interface GlobalCategory {
    /** ID for category */
    category_id: number;
    /** ID for parent category */
    parent_category_id: number;
    /** English category name */
    original_category_name: string;
    /** Display category name based on selected language */
    display_category_name: string;
    /** Whether this category has active children category */
    has_children: boolean;
}
/**
 * Parameters for getting global category list
 */
export type GetCategoryParams = {
    /** Language for category names. Should be one of "zh-hans", "en" */
    language?: string;
};
/**
 * Response for getting global category list
 */
export interface GetCategoryResponse extends FetchResponse<{
    /** List of categories */
    category_list: GlobalCategory[];
}> {
}
/**
 * Parameters for getting global item list
 */
export type GetGlobalItemListParams = {
    /** Specifies the starting entry of data to return. If data is more than one page, offset can be used for next call */
    offset?: string;
    /** The size of one page. Limit is [1,50] */
    page_size: number;
    /** The starting date range for retrieving items (based on item update time) */
    update_time_from?: number;
    /** The ending date range for retrieving items (based on item update time) */
    update_time_to?: number;
};
/**
 * Global item in list
 */
export interface GlobalItemListItem {
    /** Shopee's unique identifier for a global item */
    global_item_id: number;
    /** Timestamp that indicates the last time there was a change in value of the item */
    update_time: number;
}
/**
 * Response for getting global item list
 */
export interface GetGlobalItemListResponse extends FetchResponse<{
    /** List of global items */
    global_item_list: GlobalItemListItem[];
    /** Total global item count */
    total_count: number;
    /** Whether the item list is more than one page */
    has_next_page: boolean;
    /** Next page offset if has_next_page is true */
    offset?: string;
}> {
}
/**
 * Global item attribute
 */
export interface GlobalItemAttribute {
    /** Attribute ID */
    attribute_id: number;
    /** List of attribute values */
    attribute_value_list: {
        /** Attribute value ID */
        value_id?: number;
        /** Original attribute value name */
        original_value_name?: string;
        /** Value unit */
        value_unit?: string;
    }[];
}
/**
 * Global item image
 */
export interface GlobalItemImage {
    /** List of image URLs */
    image_url_list: string[];
    /** List of image IDs */
    image_id_list: string[];
}
/**
 * Global item video info
 */
export interface GlobalItemVideoInfo {
    /** List of video URLs */
    video_url_list: string[];
    /** List of thumbnail URLs */
    thumbnail_url_list: string[];
    /** Video duration */
    duration: number;
}
/**
 * Global item price info
 */
export interface GlobalItemPriceInfo {
    /** Currency used for the price */
    currency: string;
    /** Original price of the item */
    original_price: number;
    /** Current price of the item */
    current_price: number;
}
/**
 * Global item stock info
 */
export interface GlobalItemStockInfo {
    /** Stock type: 1-shop stock, 2-shopee stock */
    stock_type: number;
    /** Current stock */
    current_stock: number;
    /** Normal stock */
    normal_stock: number;
    /** Reserved stock */
    reserved_stock: number;
}
/**
 * Global item dimension
 */
export interface GlobalItemDimension {
    /** Package length in CM */
    package_length: number;
    /** Package width in CM */
    package_width: number;
    /** Package height in CM */
    package_height: number;
}
/**
 * Global item pre-order info
 */
export interface GlobalItemPreOrder {
    /** Whether the item is pre-order */
    is_pre_order: boolean;
    /** Days to ship */
    days_to_ship: number;
}
/**
 * Global item brand info
 */
export interface GlobalItemBrand {
    /** Brand ID */
    brand_id: number;
    /** Original brand name */
    original_brand_name: string;
}
/**
 * Global item description info
 */
export interface GlobalItemDescriptionInfo {
    /** Extended description details */
    extended_description?: {
        /** List of description fields */
        field_list: {
            /** Field type */
            field_type: string;
            /** Text content */
            text?: string;
            /** Image info */
            image_info?: {
                /** Image ID */
                image_id: string;
                /** Image URL */
                image_url: string;
            };
        }[];
    };
}
/**
 * Global item complete information
 */
export interface GlobalItemInfo {
    /** Shopee's unique identifier for a global item */
    global_item_id: number;
    /** Category ID */
    category_id: number;
    /** Global item name */
    global_item_name: string;
    /** Global item description */
    description: string;
    /** Global item SKU */
    global_item_sku?: string;
    /** Item weight in KG */
    weight?: number;
    /** Package dimension */
    dimension?: GlobalItemDimension;
    /** Image information */
    image: GlobalItemImage;
    /** Video information */
    video_info?: GlobalItemVideoInfo;
    /** Price information */
    price_info: GlobalItemPriceInfo[];
    /** Stock information */
    stock_info: GlobalItemStockInfo[];
    /** Attribute list */
    attribute_list: GlobalItemAttribute[];
    /** Pre-order info */
    pre_order?: GlobalItemPreOrder;
    /** Brand info */
    brand?: GlobalItemBrand;
    /** Item status: NORMAL, DELETED, BANNED, UNLIST */
    item_status: string;
    /** Whether item has model */
    has_model: boolean;
    /** Create time */
    create_time: number;
    /** Update time */
    update_time: number;
    /** Condition: NEW, USED */
    condition?: string;
    /** GTIN code */
    gtin_code?: string;
    /** Description type: normal, extended */
    description_type?: string;
    /** Description info for extended descriptions */
    description_info?: GlobalItemDescriptionInfo;
}
/**
 * Parameters for getting global item info
 */
export type GetGlobalItemInfoParams = {
    /** List of global item IDs to retrieve (max 50) */
    global_item_id_list: number[];
};
/**
 * Response for getting global item info
 */
export interface GetGlobalItemInfoResponse extends FetchResponse<{
    /** List of global item info */
    global_item_list: GlobalItemInfo[];
}> {
}
/**
 * Global model information
 */
export interface GlobalModel {
    /** Global model ID */
    global_model_id: number;
    /** Tier index list */
    tier_index: number[];
    /** Model SKU */
    model_sku?: string;
    /** Price info per region */
    price_info: GlobalItemPriceInfo[];
    /** Stock info */
    stock_info: GlobalItemStockInfo[];
    /** Model image */
    image?: {
        /** Image ID */
        image_id: string;
        /** Image URL */
        image_url: string;
    };
    /** Create time */
    create_time: number;
    /** Update time */
    update_time: number;
}
/**
 * Tier variation
 */
export interface TierVariation {
    /** Tier variation name */
    name: string;
    /** List of options */
    option_list: {
        /** Option name */
        option: string;
        /** Option image */
        image?: {
            /** Image ID */
            image_id: string;
            /** Image URL */
            image_url: string;
        };
    }[];
}
/**
 * Parameters for getting global model list
 */
export type GetGlobalModelListParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Response for getting global model list
 */
export interface GetGlobalModelListResponse extends FetchResponse<{
    /** Tier variation list */
    tier_variation: TierVariation[];
    /** Global model list */
    global_model: GlobalModel[];
}> {
}
/**
 * Parameters for adding a global item
 */
export type AddGlobalItemParams = {
    /** Category ID */
    category_id: number;
    /** Global item name */
    global_item_name: string;
    /** Item description */
    description: string;
    /** Global item SKU */
    global_item_sku?: string;
    /** Item weight in KG */
    weight?: number;
    /** Package dimension */
    dimension?: GlobalItemDimension;
    /** Image information */
    image: {
        /** List of image IDs */
        image_id_list: string[];
    };
    /** Video information */
    video_info?: {
        /** List of video IDs */
        video_id_list: string[];
    };
    /** Attribute list */
    attribute_list?: GlobalItemAttribute[];
    /** Brand info */
    brand?: {
        /** Brand ID */
        brand_id: number;
    };
    /** Condition: NEW, USED */
    condition?: string;
    /** GTIN code */
    gtin_code?: string;
    /** Description type: normal, extended */
    description_type?: string;
    /** Description info for extended descriptions */
    description_info?: GlobalItemDescriptionInfo;
};
/**
 * Response for adding a global item
 */
export interface AddGlobalItemResponse extends FetchResponse<{
    /** Created global item ID */
    global_item_id: number;
}> {
}
/**
 * Parameters for updating a global item
 */
export type UpdateGlobalItemParams = {
    /** Global item ID */
    global_item_id: number;
    /** Category ID */
    category_id?: number;
    /** Global item name */
    global_item_name?: string;
    /** Item description */
    description?: string;
    /** Global item SKU */
    global_item_sku?: string;
    /** Item weight in KG */
    weight?: number;
    /** Package dimension */
    dimension?: GlobalItemDimension;
    /** Image information */
    image?: {
        /** List of image IDs */
        image_id_list: string[];
    };
    /** Video information */
    video_info?: {
        /** List of video IDs */
        video_id_list: string[];
    };
    /** Attribute list */
    attribute_list?: GlobalItemAttribute[];
    /** Brand info */
    brand?: {
        /** Brand ID */
        brand_id: number;
    };
    /** Condition: NEW, USED */
    condition?: string;
    /** GTIN code */
    gtin_code?: string;
    /** Description type: normal, extended */
    description_type?: string;
    /** Description info for extended descriptions */
    description_info?: GlobalItemDescriptionInfo;
};
/**
 * Response for updating a global item
 */
export interface UpdateGlobalItemResponse extends FetchResponse<{
    /** Updated global item ID */
    global_item_id: number;
}> {
}
/**
 * Parameters for deleting a global item
 */
export type DeleteGlobalItemParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Response for deleting a global item
 */
export interface DeleteGlobalItemResponse extends BaseResponse {
}
/**
 * Parameters for adding a global model
 */
export type AddGlobalModelParams = {
    /** Global item ID */
    global_item_id: number;
    /** Model list to add */
    model_list: {
        /** Tier index */
        tier_index: number[];
        /** Model SKU */
        model_sku?: string;
        /** Model image */
        image?: {
            /** Image ID */
            image_id: string;
        };
    }[];
};
/**
 * Response for adding a global model
 */
export interface AddGlobalModelResponse extends FetchResponse<{
    /** List of added model results */
    model_list: {
        /** Global model ID */
        global_model_id: number;
        /** Tier index */
        tier_index: number[];
    }[];
}> {
}
/**
 * Parameters for updating a global model
 */
export type UpdateGlobalModelParams = {
    /** Global item ID */
    global_item_id: number;
    /** Model list to update */
    model_list: {
        /** Global model ID */
        global_model_id: number;
        /** Model SKU */
        model_sku?: string;
        /** Model image */
        image?: {
            /** Image ID */
            image_id: string;
        };
    }[];
};
/**
 * Response for updating a global model
 */
export interface UpdateGlobalModelResponse extends FetchResponse<{
    /** List of updated model results */
    model_list: {
        /** Global model ID */
        global_model_id: number;
    }[];
}> {
}
/**
 * Parameters for deleting a global model
 */
export type DeleteGlobalModelParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of global model IDs to delete */
    global_model_id_list: number[];
};
/**
 * Response for deleting a global model
 */
export interface DeleteGlobalModelResponse extends FetchResponse<{
    /** List of deleted model results */
    model_list: {
        /** Global model ID */
        global_model_id: number;
        /** Success status */
        success: boolean;
    }[];
}> {
}
/**
 * Parameters for initializing tier variation
 */
export type InitTierVariationParams = {
    /** Global item ID */
    global_item_id: number;
    /** Tier variation list (max 2 tiers) */
    tier_variation: {
        /** Tier variation name */
        name: string;
        /** List of options */
        option_list: {
            /** Option name */
            option: string;
            /** Option image */
            image?: {
                /** Image ID */
                image_id: string;
            };
        }[];
    }[];
    /** Model list */
    model_list: {
        /** Tier index */
        tier_index: number[];
        /** Model SKU */
        model_sku?: string;
        /** Model image */
        image?: {
            /** Image ID */
            image_id: string;
        };
    }[];
};
/**
 * Response for initializing tier variation
 */
export interface InitTierVariationResponse extends FetchResponse<{
    /** List of created models */
    model_list: {
        /** Global model ID */
        global_model_id: number;
        /** Tier index */
        tier_index: number[];
    }[];
}> {
}
/**
 * Parameters for updating tier variation
 */
export type UpdateTierVariationParams = {
    /** Global item ID */
    global_item_id: number;
    /** Tier variation list */
    tier_variation: {
        /** Tier variation name */
        name: string;
        /** List of options */
        option_list: {
            /** Option name */
            option: string;
            /** Option image */
            image?: {
                /** Image ID */
                image_id: string;
            };
        }[];
    }[];
};
/**
 * Response for updating tier variation
 */
export interface UpdateTierVariationResponse extends BaseResponse {
}
/**
 * Parameters for updating global item stock
 */
export type UpdateStockParams = {
    /** Global item ID */
    global_item_id: number;
    /** Stock list to update */
    stock_list: {
        /** Global model ID. If not provided, update item-level stock */
        global_model_id?: number;
        /** Shop ID */
        shop_id: number;
        /** Normal stock */
        normal_stock: number;
    }[];
};
/**
 * Response for updating global item stock
 */
export interface UpdateStockResponse extends FetchResponse<{
    /** List of stock update results */
    result_list: {
        /** Shop ID */
        shop_id: number;
        /** Global model ID */
        global_model_id?: number;
        /** Success status */
        success: boolean;
        /** Error message if failed */
        error_description?: string;
    }[];
}> {
}
/**
 * Parameters for updating global item price
 */
export type UpdatePriceParams = {
    /** Global item ID */
    global_item_id: number;
    /** Price list to update */
    price_list: {
        /** Global model ID. If not provided, update item-level price */
        global_model_id?: number;
        /** Shop ID */
        shop_id: number;
        /** Original price */
        original_price: number;
    }[];
};
/**
 * Response for updating global item price
 */
export interface UpdatePriceResponse extends FetchResponse<{
    /** List of price update results */
    result_list: {
        /** Shop ID */
        shop_id: number;
        /** Global model ID */
        global_model_id?: number;
        /** Success status */
        success: boolean;
        /** Error message if failed */
        error_description?: string;
    }[];
}> {
}
/**
 * Parameters for getting attribute tree
 */
export type GetAttributeTreeParams = {
    /** Category ID */
    category_id: number;
    /** Language for attribute names */
    language?: string;
};
/**
 * Response for getting attribute tree
 */
export interface GetAttributeTreeResponse extends FetchResponse<{
    /** List of attributes */
    attribute_list: Attribute[];
}> {
}
/**
 * Brand information
 */
export interface Brand {
    /** Brand ID */
    brand_id: number;
    /** Original brand name */
    original_brand_name: string;
    /** Display brand name */
    display_brand_name: string;
}
/**
 * Parameters for getting brand list
 */
export type GetBrandListParams = {
    /** Category ID */
    category_id: number;
    /** Offset for pagination */
    offset?: number;
    /** Page size (max 100) */
    page_size: number;
    /** Status: 1-normal, 2-pending */
    status?: number;
    /** Language for brand names */
    language?: string;
};
/**
 * Response for getting brand list
 */
export interface GetBrandListResponse extends FetchResponse<{
    /** List of brands */
    brand_list: Brand[];
    /** Whether there are more pages */
    has_next_page: boolean;
    /** Next page offset */
    next_offset: number;
    /** Total brand count */
    total_count: number;
}> {
}
/**
 * Parameters for category recommendation
 */
export type CategoryRecommendParams = {
    /** Global item name */
    global_item_name: string;
};
/**
 * Response for category recommendation
 */
export interface CategoryRecommendResponse extends FetchResponse<{
    /** List of recommended categories */
    category_id_list: number[];
}> {
}
/**
 * Parameters for getting global item limit
 */
export type GetGlobalItemLimitParams = {
    /** Category ID */
    category_id: number;
};
/**
 * Global item limit info
 */
export interface GlobalItemLimit {
    /** Maximum image count */
    max_image_count: number;
    /** Maximum video count */
    max_video_count: number;
    /** Maximum name length */
    max_name_length: number;
    /** Maximum description length */
    max_description_length: number;
    /** Whether video is supported */
    support_video: boolean;
    /** Whether size chart is supported */
    support_size_chart: boolean;
}
/**
 * Response for getting global item limit
 */
export interface GetGlobalItemLimitResponse extends FetchResponse<{
    /** Limit information */
    limit_info: GlobalItemLimit;
}> {
}
/**
 * Shop info for publishing
 */
export interface PublishableShop {
    /** Shop ID */
    shop_id: number;
    /** Shop name */
    shop_name: string;
    /** Shop region */
    region: string;
}
/**
 * Parameters for getting publishable shop list
 */
export type GetPublishableShopParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Response for getting publishable shop list
 */
export interface GetPublishableShopResponse extends FetchResponse<{
    /** List of publishable shops */
    shop_list: PublishableShop[];
}> {
}
/**
 * Parameters for getting shop publishable status
 */
export type GetShopPublishableStatusParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of shop IDs to check */
    shop_id_list: number[];
};
/**
 * Response for getting shop publishable status
 */
export interface GetShopPublishableStatusResponse extends FetchResponse<{
    /** List of shop status */
    shop_list: {
        /** Shop ID */
        shop_id: number;
        /** Whether the shop is publishable */
        publishable: boolean;
        /** Reason if not publishable */
        reason?: string;
    }[];
}> {
}
/**
 * Parameters for creating publish task
 */
export type CreatePublishTaskParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of shops to publish to */
    shop_list: {
        /** Shop ID */
        shop_id: number;
    }[];
};
/**
 * Response for creating publish task
 */
export interface CreatePublishTaskResponse extends FetchResponse<{
    /** Publish task ID */
    publish_task_id: string;
}> {
}
/**
 * Parameters for getting publish task result
 */
export type GetPublishTaskResultParams = {
    /** Publish task ID */
    publish_task_id: string;
};
/**
 * Response for getting publish task result
 */
export interface GetPublishTaskResultResponse extends FetchResponse<{
    /** Task status: PROCESSING, SUCCESS, FAILED */
    status: string;
    /** List of publish results */
    result_list: {
        /** Shop ID */
        shop_id: number;
        /** Item ID in the shop */
        item_id?: number;
        /** Success status */
        success: boolean;
        /** Error message if failed */
        error_description?: string;
    }[];
}> {
}
/**
 * Parameters for getting published list
 */
export type GetPublishedListParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Published shop info
 */
export interface PublishedShop {
    /** Shop ID */
    shop_id: number;
    /** Item ID in the shop */
    item_id: number;
    /** Shop name */
    shop_name: string;
    /** Shop region */
    region: string;
}
/**
 * Response for getting published list
 */
export interface GetPublishedListResponse extends FetchResponse<{
    /** List of published shops */
    shop_list: PublishedShop[];
}> {
}
/**
 * Parameters for getting global item ID by shop item ID
 */
export type GetGlobalItemIdParams = {
    /** Shop ID */
    shop_id: number;
    /** Item ID in the shop */
    item_id: number;
};
/**
 * Response for getting global item ID
 */
export interface GetGlobalItemIdResponse extends FetchResponse<{
    /** Global item ID */
    global_item_id: number;
}> {
}
/**
 * Parameters for getting recommended attributes
 */
export type GetRecommendAttributeParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Response for getting recommended attributes
 */
export interface GetRecommendAttributeResponse extends FetchResponse<{
    /** List of recommended attributes */
    attribute_list: Attribute[];
}> {
}
/**
 * Parameters for searching global attribute value list
 */
export type SearchGlobalAttributeValueListParams = {
    /** Category ID */
    category_id: number;
    /** Attribute ID */
    attribute_id: number;
    /** Search keyword */
    keyword: string;
    /** Language */
    language?: string;
    /** Page number */
    page_num?: number;
    /** Page size */
    page_size?: number;
};
/**
 * Response for searching global attribute value list
 */
export interface SearchGlobalAttributeValueListResponse extends FetchResponse<{
    /** List of attribute values */
    attribute_value_list: {
        /** Value ID */
        value_id: number;
        /** Original value name */
        original_value_name: string;
        /** Display value name */
        display_value_name: string;
        /** Value unit */
        value_unit?: string;
    }[];
}> {
}
/**
 * Parameters for getting variations
 */
export type GetVariationsParams = {
    /** Global item ID */
    global_item_id: number;
};
/**
 * Response for getting variations
 */
export interface GetVariationsResponse extends FetchResponse<{
    /** Tier variation list */
    tier_variation: TierVariation[];
}> {
}
/**
 * Parameters for setting sync field
 */
export type SetSyncFieldParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of shops to set sync field */
    shop_list: {
        /** Shop ID */
        shop_id: number;
        /** Fields to sync */
        sync_field_list: string[];
    }[];
};
/**
 * Response for setting sync field
 */
export interface SetSyncFieldResponse extends FetchResponse<{
    /** List of results */
    result_list: {
        /** Shop ID */
        shop_id: number;
        /** Success status */
        success: boolean;
        /** Error message if failed */
        error_description?: string;
    }[];
}> {
}
/**
 * Parameters for getting local adjustment rate
 */
export type GetLocalAdjustmentRateParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of shop IDs */
    shop_id_list: number[];
};
/**
 * Response for getting local adjustment rate
 */
export interface GetLocalAdjustmentRateResponse extends FetchResponse<{
    /** List of adjustment rates */
    adjustment_rate_list: {
        /** Shop ID */
        shop_id: number;
        /** Global model ID */
        global_model_id?: number;
        /** Adjustment rate (percentage) */
        adjustment_rate: number;
    }[];
}> {
}
/**
 * Parameters for updating local adjustment rate
 */
export type UpdateLocalAdjustmentRateParams = {
    /** Global item ID */
    global_item_id: number;
    /** List of adjustment rates to update */
    adjustment_rate_list: {
        /** Shop ID */
        shop_id: number;
        /** Global model ID */
        global_model_id?: number;
        /** Adjustment rate (percentage) */
        adjustment_rate: number;
    }[];
};
/**
 * Response for updating local adjustment rate
 */
export interface UpdateLocalAdjustmentRateResponse extends FetchResponse<{
    /** List of update results */
    result_list: {
        /** Shop ID */
        shop_id: number;
        /** Global model ID */
        global_model_id?: number;
        /** Success status */
        success: boolean;
        /** Error message if failed */
        error_description?: string;
    }[];
}> {
}
/**
 * Size chart information
 */
export interface SizeChart {
    /** Size chart ID */
    size_chart_id: string;
    /** Size chart name */
    size_chart_name: string;
    /** Size chart table */
    size_chart_table: {
        /** Header row */
        header: string[];
        /** Data rows */
        rows: string[][];
    };
}
/**
 * Parameters for getting size chart list
 */
export type GetSizeChartListParams = {
    /** Offset for pagination */
    offset?: number;
    /** Page size */
    page_size: number;
};
/**
 * Response for getting size chart list
 */
export interface GetSizeChartListResponse extends FetchResponse<{
    /** List of size charts */
    size_chart_list: SizeChart[];
    /** Whether there are more pages */
    has_next_page: boolean;
    /** Next page offset */
    next_offset: number;
}> {
}
/**
 * Parameters for getting size chart detail
 */
export type GetSizeChartDetailParams = {
    /** Size chart ID */
    size_chart_id: string;
};
/**
 * Response for getting size chart detail
 */
export interface GetSizeChartDetailResponse extends FetchResponse<{
    /** Size chart information */
    size_chart: SizeChart;
}> {
}
/**
 * Parameters for updating size chart
 */
export type UpdateSizeChartParams = {
    /** Size chart ID */
    size_chart_id: string;
    /** Size chart name */
    size_chart_name?: string;
    /** Size chart table */
    size_chart_table?: {
        /** Header row */
        header: string[];
        /** Data rows */
        rows: string[][];
    };
};
/**
 * Response for updating size chart
 */
export interface UpdateSizeChartResponse extends BaseResponse {
}
/**
 * Parameters for checking size chart support
 */
export type SupportSizeChartParams = {
    /** Category ID */
    category_id: number;
};
/**
 * Response for checking size chart support
 */
export interface SupportSizeChartResponse extends FetchResponse<{
    /** Whether size chart is supported */
    support: boolean;
}> {
}
