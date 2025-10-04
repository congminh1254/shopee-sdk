import { BaseResponse } from "./base.js";
/**
 * Session status
 * 0: Not started
 * 1: Ongoing
 * 2: Ended
 */
export type SessionStatus = 0 | 1 | 2;
/**
 * Stream URL information
 */
export interface StreamUrlInfo {
    /** Push URL for streaming */
    push_url: string;
    /** Push key for authentication */
    push_key: string;
    /** Play URL for viewing */
    play_url: string;
    /** Domain ID */
    domain_id: number;
}
/**
 * Parameters for creating a livestream session
 */
export interface CreateSessionParams {
    /** The title of livestream session, cannot exceed 200 characters */
    title: string;
    /** The description of livestream session, cannot exceed 200 characters */
    description?: string;
    /** The cover image URL of livestream session */
    cover_image_url: string;
    /** Indicate whether the livestream session is for testing purpose only */
    is_test?: boolean;
}
/**
 * Response for creating a livestream session
 */
export interface CreateSessionResponse extends BaseResponse {
    response: {
        /** The identifier of livestream session */
        session_id: number;
    };
}
/**
 * Parameters for starting a livestream session
 */
export interface StartSessionParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The identifier of the stream domain */
    domain_id: number;
}
/**
 * Response for starting a livestream session
 */
export interface StartSessionResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for ending a livestream session
 */
export interface EndSessionParams {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Response for ending a livestream session
 */
export interface EndSessionResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for updating a livestream session
 */
export interface UpdateSessionParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The title of livestream session, cannot exceed 200 characters */
    title?: string;
    /** The description of livestream session, cannot exceed 200 characters */
    description?: string;
    /** The cover image URL of livestream session */
    cover_image_url?: string;
}
/**
 * Response for updating a livestream session
 */
export interface UpdateSessionResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for getting session detail
 */
export interface GetSessionDetailParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Response for getting session detail
 */
export interface GetSessionDetailResponse extends BaseResponse {
    response: {
        /** The identifier of livestream session */
        session_id: number;
        /** The title of livestream session */
        title: string;
        /** The description of livestream session */
        description: string;
        /** The cover image URL */
        cover_image_url: string;
        /** Session status: 0=Not started, 1=Ongoing, 2=Ended */
        status: SessionStatus;
        /** Share URL */
        share_url: string;
        /** Whether it's a test session */
        is_test: boolean;
        /** Create time in unix timestamp (milliseconds) */
        create_time: number;
        /** Update time in unix timestamp (milliseconds) */
        update_time: number;
        /** Start time in unix timestamp (milliseconds) */
        start_time: number;
        /** End time in unix timestamp (milliseconds) */
        end_time: number;
        /** Stream URL information */
        stream_url_list: StreamUrlInfo;
    };
}
/**
 * Parameters for getting session metrics
 */
export interface GetSessionMetricParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Response for getting session metrics
 */
export interface GetSessionMetricResponse extends BaseResponse {
    response: {
        /** Value of placed orders during livestream */
        gmv: number;
        /** Number of "Add To Cart" clicks */
        atc: number;
        /** Click-through rate */
        ctr: number;
        /** Conversion rate */
        co: number;
        /** Number of placed orders */
        orders: number;
        /** Number of concurrent viewers */
        ccu: number;
        /** Number of engaged concurrent viewers (>1 min) */
        engage_ccu_1m: number;
        /** Peak concurrent viewers */
        peak_ccu: number;
        /** Number of likes */
        likes: number;
        /** Number of comments */
        comments: number;
        /** Number of shares */
        shares: number;
        /** Number of views */
        views: number;
        /** Average viewing duration */
        avg_viewing_duration: number;
    };
}
/**
 * Parameters for getting session item metrics
 */
export interface GetSessionItemMetricParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Item metric information
 */
export interface ItemMetric {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
    /** Item name */
    name: string;
    /** Number of item clicks */
    clicks: number;
    /** Number of orders */
    orders: number;
    /** GMV (Gross Merchandise Value) */
    gmv: number;
}
/**
 * Response for getting session item metrics
 */
export interface GetSessionItemMetricResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of item metrics */
        list: ItemMetric[];
    };
}
/**
 * Item information for adding to session
 */
export interface ItemToAdd {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
}
/**
 * Parameters for adding items to session
 */
export interface AddItemListParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The list of items to add */
    item_list: ItemToAdd[];
}
/**
 * Response for adding items to session
 */
export interface AddItemListResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Item information for updating
 */
export interface ItemToUpdate {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
    /** The order of this item in the shopping bag */
    item_no: number;
}
/**
 * Parameters for updating items in session
 */
export interface UpdateItemListParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The list of items to update */
    item_list: ItemToUpdate[];
}
/**
 * Response for updating items in session
 */
export interface UpdateItemListResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Item information for deletion
 */
export interface ItemToDelete {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
}
/**
 * Parameters for deleting items from session
 */
export interface DeleteItemListParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The list of items to delete */
    item_list: ItemToDelete[];
}
/**
 * Response for deleting items from session
 */
export interface DeleteItemListResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for getting item list
 */
export interface GetItemListParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Price information
 */
export interface PriceInfo {
    /** Currency code */
    currency: string;
    /** Current price */
    current_price: number;
    /** Original price */
    original_price: number;
}
/**
 * Affiliate information
 */
export interface AffiliateInfo {
    /** Commission rate */
    commission_rate: number;
    /** Whether participating in a campaign */
    is_campaign: boolean;
    /** MCN agency name */
    campaign_mcn_name: string;
    /** Campaign start time (unix timestamp) */
    campaign_start_time: number;
    /** Campaign end time (unix timestamp) */
    campaign_end_time: number;
}
/**
 * Item information
 */
export interface Item {
    /** The order of this item in the shopping bag */
    item_no: number;
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
    /** Item name */
    name: string;
    /** Image URL */
    image_url: string;
    /** Price information */
    price_info: PriceInfo;
    /** Affiliate information */
    affiliate_info: AffiliateInfo;
}
/**
 * Response for getting item list
 */
export interface GetItemListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of items */
        list: Item[];
    };
}
/**
 * Parameters for getting item count
 */
export interface GetItemCountParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Response for getting item count
 */
export interface GetItemCountResponse extends BaseResponse {
    response: {
        /** Total number of items */
        total_count: number;
    };
}
/**
 * Parameters for getting recent item list
 */
export interface GetRecentItemListParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Response for getting recent item list
 */
export interface GetRecentItemListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of items */
        list: Item[];
    };
}
/**
 * Parameters for getting like item list
 */
export interface GetLikeItemListParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Response for getting like item list
 */
export interface GetLikeItemListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of items */
        list: Item[];
    };
}
/**
 * Parameters for applying item set
 */
export interface ApplyItemSetParams {
    /** The identifier of livestream session */
    session_id: number;
    /** The identifier of item set */
    item_set_id: number;
}
/**
 * Response for applying item set
 */
export interface ApplyItemSetResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for getting item set list
 */
export interface GetItemSetListParams extends Record<string, string | number | boolean | undefined> {
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Item set information
 */
export interface ItemSet {
    /** Item set ID */
    item_set_id: number;
    /** Item set name */
    name: string;
    /** Number of items in the set */
    item_count: number;
}
/**
 * Response for getting item set list
 */
export interface GetItemSetListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of item sets */
        list: ItemSet[];
    };
}
/**
 * Parameters for getting item set item list
 */
export interface GetItemSetItemListParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of item set */
    item_set_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Response for getting item set item list
 */
export interface GetItemSetItemListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of items */
        list: Item[];
    };
}
/**
 * Parameters for getting show item
 */
export interface GetShowItemParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Show item information
 */
export interface ShowItem {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
    /** Item name */
    name: string;
    /** Image URL */
    image_url: string;
    /** Price information */
    price_info: PriceInfo;
}
/**
 * Response for getting show item
 */
export interface GetShowItemResponse extends BaseResponse {
    response: {
        /** Show item information */
        item: ShowItem | null;
    };
}
/**
 * Parameters for updating show item
 */
export interface UpdateShowItemParams {
    /** The identifier of livestream session */
    session_id: number;
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The shop id of this item */
    shop_id: number;
}
/**
 * Response for updating show item
 */
export interface UpdateShowItemResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for deleting show item
 */
export interface DeleteShowItemParams {
    /** The identifier of livestream session */
    session_id: number;
}
/**
 * Response for deleting show item
 */
export interface DeleteShowItemResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for posting a comment
 */
export interface PostCommentParams {
    /** The identifier of livestream session */
    session_id: number;
    /** Comment text */
    comment: string;
}
/**
 * Response for posting a comment
 */
export interface PostCommentResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for getting latest comment list
 */
export interface GetLatestCommentListParams extends Record<string, string | number | boolean | undefined> {
    /** The identifier of livestream session */
    session_id: number;
    /** Specifies the starting entry of data to return */
    offset: number;
    /** Maximum number of entries per page (1-100) */
    page_size: number;
}
/**
 * Comment information
 */
export interface Comment {
    /** Comment ID */
    comment_id: number;
    /** User ID who made the comment */
    user_id: number;
    /** Username */
    username: string;
    /** Comment text */
    comment: string;
    /** Comment time (unix timestamp) */
    comment_time: number;
}
/**
 * Response for getting latest comment list
 */
export interface GetLatestCommentListResponse extends BaseResponse {
    response: {
        /** Whether there are more pages */
        more: boolean;
        /** Next offset for pagination */
        next_offset: number;
        /** List of comments */
        list: Comment[];
    };
}
/**
 * Parameters for banning a user from commenting
 */
export interface BanUserCommentParams {
    /** The identifier of livestream session */
    session_id: number;
    /** User ID to ban */
    user_id: number;
}
/**
 * Response for banning a user from commenting
 */
export interface BanUserCommentResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for unbanning a user from commenting
 */
export interface UnbanUserCommentParams {
    /** The identifier of livestream session */
    session_id: number;
    /** User ID to unban */
    user_id: number;
}
/**
 * Response for unbanning a user from commenting
 */
export interface UnbanUserCommentResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for uploading an image
 */
export interface UploadImageParams {
    /** The image file to upload */
    image: Buffer | Blob;
}
/**
 * Response for uploading an image
 */
export interface UploadImageResponse extends BaseResponse {
    response: {
        /** The uploaded image URL */
        image_url: string;
    };
}
