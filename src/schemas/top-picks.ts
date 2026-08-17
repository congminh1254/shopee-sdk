// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for add_top_picks
 *
 * add one collection
 */
export interface AddTopPicksRequest {
  name: string;
  item_id_list: number[];
  is_activated: boolean;
}
/**
 * AddTopPicksItem sub-interface for AddTopPicksCollection
 */
export interface AddTopPicksItem {
  /**
   * The name of item.
   */
  item_name?: string;
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * The price before tax of item.
   */
  current_price?: number;
  /**
   * The price after tax of item.
   */
  inflated_price_of_current_price?: number;
  /**
   * The sales of item.
   */
  sales?: number;
}
/**
 * AddTopPicksCollection sub-interface for AddTopPicksResponseData
 */
export interface AddTopPicksCollection {
  /**
   * whether collection is activated.
   */
  is_activated?: boolean;
  /**
   * The items of top picks
   */
  item_list?: AddTopPicksItem[];
  /**
   * Collection id.
   */
  top_picks_id?: number;
  /**
   * The title of top picks.
   */
  name?: string;
}
/**
 * AddTopPicksResponseData sub-interface for AddTopPicksResponse
 */
export interface AddTopPicksResponseData {
  /**
   * The top picks list in this shop.
   */
  collection_list?: AddTopPicksCollection[];
}
/**
 * Response payload for add_top_picks
 *
 * add one collection
 */
export type AddTopPicksResponse = FetchResponse<AddTopPicksResponseData>;
/**
 * Request parameters for delete_top_picks
 *
 * delete a collection
 */
export interface DeleteTopPicksRequest {
  /**
   * collection id
   */
  top_picks_id: number;
}
/**
 * DeleteTopPicksResponseData sub-interface for DeleteTopPicksResponse
 */
export interface DeleteTopPicksResponseData {
  /**
   * collection id
   */
  top_picks_id?: number;
}
/**
 * Response payload for delete_top_picks
 *
 * delete a collection
 */
export type DeleteTopPicksResponse = FetchResponse<DeleteTopPicksResponseData>;
/**
 * Request parameters for get_top_picks_list
 *
 * get one TopPicks
 */
export type GetTopPicksListRequest = Record<string, never>;
/**
 * GetTopPicksListItem sub-interface for GetTopPicksListCollection
 */
export interface GetTopPicksListItem {
  /**
   * The name of item.
   */
  item_name?: string;
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * The price before tax of item.
   */
  current_price?: number;
  /**
   * The price after tax of item.
   */
  inflated_price_of_current_price?: number;
  /**
   * The sales of  item.
   */
  sales?: number;
}
/**
 * GetTopPicksListCollection sub-interface for GetTopPicksListResponseData
 */
export interface GetTopPicksListCollection {
  /**
   * whether collection is activated.
   */
  is_activated?: boolean;
  /**
   * The items of top picks
   */
  item_list?: GetTopPicksListItem[];
  /**
   * collection id.
   */
  top_picks_id?: number;
  /**
   * The title of  top picks.
   */
  name?: string;
}
/**
 * GetTopPicksListResponseData sub-interface for GetTopPicksListResponse
 */
export interface GetTopPicksListResponseData {
  /**
   * The top picks list in this shop.
   */
  collection_list?: GetTopPicksListCollection[];
}
/**
 * Response payload for get_top_picks_list
 *
 * get one TopPicks
 */
export type GetTopPicksListResponse = FetchResponse<GetTopPicksListResponseData>;
/**
 * Request parameters for update_top_picks
 *
 * update a collection info
 */
export interface UpdateTopPicksRequest {
  /**
   * collection id
   */
  top_picks_id: number;
  /**
   * collection name
   */
  name?: string;
  /**
   * a list of item id, and we will cover old item_ids by new_item_ids
   */
  item_id_list?: number[];
  /**
   * if true, we will close other collection and open this collection
   */
  is_activated?: boolean;
}
/**
 * UpdateTopPicksItem sub-interface for UpdateTopPicksCollection
 */
export interface UpdateTopPicksItem {
  /**
   * The name of item.
   */
  item_name?: string;
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * The price before tax of item.
   */
  current_price?: number;
  /**
   * The price after tax of item.
   */
  inflated_price_of_current_price?: number;
  /**
   * The sales of item.
   */
  sales?: number;
}
/**
 * UpdateTopPicksCollection sub-interface for UpdateTopPicksResponseData
 */
export interface UpdateTopPicksCollection {
  /**
   * whether is activated
   */
  is_activated?: boolean;
  /**
   * a list of item
   */
  item_list?: UpdateTopPicksItem[];
  /**
   * collection id
   */
  top_picks_id?: number;
  /**
   * collection name
   */
  name?: string;
}
/**
 * UpdateTopPicksResponseData sub-interface for UpdateTopPicksResponse
 */
export interface UpdateTopPicksResponseData {
  /**
   * The top picks list in this shop.
   */
  collection_list?: UpdateTopPicksCollection[];
}
/**
 * Response payload for update_top_picks
 *
 * update a collection info
 */
export type UpdateTopPicksResponse = FetchResponse<UpdateTopPicksResponseData>;
