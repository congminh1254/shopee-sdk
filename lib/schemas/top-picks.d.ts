import { BaseResponse } from "./base.js";
/**
 * Item information in a top picks collection
 */
export interface TopPicksItem {
    /** The name of the item */
    item_name: string;
    /** The ID of the item */
    item_id: number;
    /** The price before tax of item */
    current_price: number;
    /** The price after tax of item */
    inflated_price_of_current_price: number;
    /** The sales of item */
    sales: number;
}
/**
 * Top picks collection information
 */
export interface TopPicksCollection {
    /** Whether collection is activated */
    is_activated: boolean;
    /** The items of top picks */
    item_list: TopPicksItem[];
    /** Collection id */
    top_picks_id: number;
    /** The title of top picks */
    name: string;
}
/**
 * Parameters for adding a new top picks collection
 */
export interface AddTopPicksParams {
    /** The name of the top picks collection */
    name: string;
    /** List of item IDs to include in the collection */
    item_id_list: number[];
    /** Whether the collection should be activated */
    is_activated: boolean;
    [key: string]: string | number | boolean | number[] | undefined;
}
/**
 * Response for the add top picks API
 */
export interface AddTopPicksResponse extends BaseResponse {
    response: {
        /** The top picks list in this shop */
        collection_list: TopPicksCollection[];
    };
}
/**
 * Parameters for deleting a top picks collection
 */
export interface DeleteTopPicksParams {
    /** The collection ID to delete */
    top_picks_id: number;
    [key: string]: string | number | boolean | undefined;
}
/**
 * Response for the delete top picks API
 */
export interface DeleteTopPicksResponse extends BaseResponse {
    response: {
        /** The deleted collection ID */
        top_picks_id: number;
    };
}
/**
 * Response for the get top picks list API
 */
export interface GetTopPicksListResponse extends BaseResponse {
    response: {
        /** The top picks list in this shop */
        collection_list: TopPicksCollection[];
    };
}
/**
 * Parameters for updating a top picks collection
 */
export interface UpdateTopPicksParams {
    /** The collection ID to update */
    top_picks_id: number;
    /** The new name for the collection (optional) */
    name?: string;
    /** The new list of item IDs (optional, will replace old list) */
    item_id_list?: number[];
    /** Whether to activate the collection (optional, will deactivate others if true) */
    is_activated?: boolean;
    [key: string]: string | number | boolean | number[] | undefined;
}
/**
 * Response for the update top picks API
 */
export interface UpdateTopPicksResponse extends BaseResponse {
    response: {
        /** The top picks list in this shop */
        collection_list: TopPicksCollection[];
    };
}
