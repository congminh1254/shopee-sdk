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
 * AddTopPicks_Item sub-interface for AddTopPicks_Collection
 */
export interface AddTopPicks_Item {
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
 * AddTopPicks_Collection sub-interface for AddTopPicks_Response
 */
export interface AddTopPicks_Collection {
  /**
   * whether collection is activated.
   */
  is_activated?: boolean;
  /**
   * The items of top picks
   */
  item_list?: AddTopPicks_Item[];
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
 * AddTopPicks_Response sub-interface for AddTopPicksResponse
 */
export interface AddTopPicks_Response {
  /**
   * The top picks list in this shop.
   */
  collection_list?: AddTopPicks_Collection[];
}
/**
 * Response data payload for add_top_picks
 */
export type AddTopPicksResponseData = AddTopPicks_Response;
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
 * DeleteTopPicks_Response sub-interface for DeleteTopPicksResponse
 */
export interface DeleteTopPicks_Response {
  /**
   * collection id
   */
  top_picks_id?: number;
}
/**
 * Response data payload for delete_top_picks
 */
export type DeleteTopPicksResponseData = DeleteTopPicks_Response;
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
 * GetTopPicksList_Item sub-interface for GetTopPicksList_Collection
 */
export interface GetTopPicksList_Item {
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
 * GetTopPicksList_Collection sub-interface for GetTopPicksList_Response
 */
export interface GetTopPicksList_Collection {
  /**
   * whether collection is activated.
   */
  is_activated?: boolean;
  /**
   * The items of top picks
   */
  item_list?: GetTopPicksList_Item[];
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
 * GetTopPicksList_Response sub-interface for GetTopPicksListResponse
 */
export interface GetTopPicksList_Response {
  /**
   * The top picks list in this shop.
   */
  collection_list?: GetTopPicksList_Collection[];
}
/**
 * Response data payload for get_top_picks_list
 */
export type GetTopPicksListResponseData = GetTopPicksList_Response;
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
 * UpdateTopPicks_Item sub-interface for UpdateTopPicks_Collection
 */
export interface UpdateTopPicks_Item {
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
 * UpdateTopPicks_Collection sub-interface for UpdateTopPicks_Response
 */
export interface UpdateTopPicks_Collection {
  /**
   * whether is activated
   */
  is_activated?: boolean;
  /**
   * a list of item
   */
  item_list?: UpdateTopPicks_Item[];
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
 * UpdateTopPicks_Response sub-interface for UpdateTopPicksResponse
 */
export interface UpdateTopPicks_Response {
  /**
   * The top picks list in this shop.
   */
  collection_list?: UpdateTopPicks_Collection[];
}
/**
 * Response data payload for update_top_picks
 */
export type UpdateTopPicksResponseData = UpdateTopPicks_Response;
/**
 * Response payload for update_top_picks
 *
 * update a collection info
 */
export type UpdateTopPicksResponse = FetchResponse<UpdateTopPicksResponseData>;
