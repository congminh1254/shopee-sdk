import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field AiStream
 */
export enum AiStream {
  PH = "ph",
  EDU = "edu",
  ARTICLE = "article",
}
/**
 * AddItemList_Item sub-interface for AddItemListRequest
 */
export interface AddItemList_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The shop id of this item.
   */
  shop_id: number;
}
/**
 * Request parameters for add_item_list
 *
 * Add items to item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface AddItemListRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The list of item to add.
   */
  item_list: AddItemList_Item[];
}
/**
 * Response data payload for add_item_list
 */
export type AddItemListResponseData = any;
/**
 * Response payload for add_item_list
 *
 * Add items to item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type AddItemListResponse = FetchResponse<AddItemListResponseData>;
/**
 * Request parameters for apply_item_set
 *
 * Add product set to item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface ApplyItemSetRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * List of item set id to apply.
   */
  item_set_ids: number[];
}
/**
 * Response data payload for apply_item_set
 */
export type ApplyItemSetResponseData = any;
/**
 * Response payload for apply_item_set
 *
 * Add product set to item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type ApplyItemSetResponse = FetchResponse<ApplyItemSetResponseData>;
/**
 * Request parameters for ban_user_comment
 *
 * Ban the user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface BanUserCommentRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The user id that will be banned from posting comments.
   */
  ban_user_id: number;
}
/**
 * Response data payload for ban_user_comment
 */
export type BanUserCommentResponseData = any;
/**
 * Response payload for ban_user_comment
 *
 * Ban the user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type BanUserCommentResponse = FetchResponse<BanUserCommentResponseData>;
/**
 * Request parameters for create_session
 *
 * Create a new live stream, include basic information, like cover, title, description, type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface CreateSessionRequest {
  /**
   * The title of livestream session, cannot exceed 200 characters.
   */
  title: string;
  /**
   * The description of livestream session, cannot exceed 200 characters.
   */
  description?: string;
  /**
   * The cover image URL of livestream session.Please call the v2.livestream.upload_image to upload the cover image file and get the cover_image_url.
   */
  cover_image_url: string;
  /**
   * Indicate whether the livestream session is for testing purpose only.
   */
  is_test?: boolean;
}
/**
 * CreateSession_Response sub-interface for CreateSessionResponse
 */
export interface CreateSession_Response {
  /**
   * The identifier of livestream session.
   */
  session_id?: number;
}
/**
 * Response data payload for create_session
 */
export type CreateSessionResponseData = CreateSession_Response;
/**
 * Response payload for create_session
 *
 * Create a new live stream, include basic information, like cover, title, description, type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
 */
export type CreateSessionResponse = FetchResponse<CreateSessionResponseData>;
/**
 * DeleteItemList_Item sub-interface for DeleteItemListRequest
 */
export interface DeleteItemList_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The shop id of this item.
   */
  shop_id: number;
}
/**
 * Request parameters for delete_item_list
 *
 * Delete items from item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface DeleteItemListRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The list of item to delete.
   */
  item_list: DeleteItemList_Item[];
}
/**
 * Response data payload for delete_item_list
 */
export type DeleteItemListResponseData = any;
/**
 * Response payload for delete_item_list
 *
 * Delete items from item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type DeleteItemListResponse = FetchResponse<DeleteItemListResponseData>;
/**
 * Request parameters for delete_show_item
 *
 * Unshow showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface DeleteShowItemRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * Response data payload for delete_show_item
 */
export type DeleteShowItemResponseData = any;
/**
 * Response payload for delete_show_item
 *
 * Unshow showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type DeleteShowItemResponse = FetchResponse<DeleteShowItemResponseData>;
/**
 * Request parameters for end_session
 *
 * End Live. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface EndSessionRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * Response data payload for end_session
 */
export type EndSessionResponseData = any;
/**
 * Response payload for end_session
 *
 * End Live. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type EndSessionResponse = FetchResponse<EndSessionResponseData>;
/**
 * Request parameters for get_item_count
 *
 * Get the number of items in the shopping bag, including the current number of items in the shopping bag, the upper limit of the number, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetItemCountRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * GetItemCount_Response sub-interface for GetItemCountResponse
 */
export interface GetItemCount_Response {
  /**
   * The number of items in the shopping bag of this session.
   */
  item_count?: number;
  /**
   * The maximum number of items allowed in the shopping bag of this session.
   */
  max_item_count?: number;
}
/**
 * Response data payload for get_item_count
 */
export type GetItemCountResponseData = GetItemCount_Response;
/**
 * Response payload for get_item_count
 *
 * Get the number of items in the shopping bag, including the current number of items in the shopping bag, the upper limit of the number, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetItemCountResponse = FetchResponse<GetItemCountResponseData>;
/**
 * Request parameters for get_item_list
 *
 * Get the detail information of item in item bag, including item id, item serial number, etc.(For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetItemListRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetItemList_PriceInfo sub-interface for GetItemList_List
 */
export interface GetItemList_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetItemList_AffiliateInfo sub-interface for GetItemList_List
 */
export interface GetItemList_AffiliateInfo {
  /**
   * The commission rate that the streamer can get, for example, 0.1 means 10%.
   */
  commission_rate?: number;
  /**
   * Whether participate in a campaign project (generally, the commission will be higher)
   */
  is_campaign?: boolean;
  /**
   * MCN agency that initiated this campaign
   */
  campaign_mcn_name?: string;
  /**
   * Campaign start time, it's unix timestamp in seconds.
   */
  campaign_start_time?: number;
  /**
   * Campaign end time, it's unix timestamp in seconds.
   */
  campaign_end_time?: number;
}
/**
 * GetItemList_List sub-interface for GetItemList_Response
 */
export interface GetItemList_List {
  /**
   * The order of this item in the shopping bag of current session, start from 1.
   */
  item_no?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of this item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of this item.
   */
  image_url?: string;
  price_info?: GetItemList_PriceInfo;
  affiliate_info?: GetItemList_AffiliateInfo;
}
/**
 * GetItemList_Response sub-interface for GetItemListResponse
 */
export interface GetItemList_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetItemList_List[];
}
/**
 * Response data payload for get_item_list
 */
export type GetItemListResponseData = GetItemList_Response;
/**
 * Response payload for get_item_list
 *
 * Get the detail information of item in item bag, including item id, item serial number, etc.(For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetItemListResponse = FetchResponse<GetItemListResponseData>;
/**
 * Request parameters for get_item_set_item_list
 *
 * Get the item list of the product set, including item name, id, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetItemSetItemListRequest {
  /**
   * The identifier of the item set.
   */
  item_set_id: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetItemSetItemList_PriceInfo sub-interface for GetItemSetItemList_List
 */
export interface GetItemSetItemList_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetItemSetItemList_AffiliateInfo sub-interface for GetItemSetItemList_List
 */
export interface GetItemSetItemList_AffiliateInfo {
  /**
   * The commission rate that the streamer can get, for example, 0.1 means 10%.
   */
  commission_rate?: number;
  /**
   * Whether participate in a campaign project (generally, the commission will be higher)
   */
  is_campaign?: boolean;
  /**
   * MCN agency that initiated this campaign
   */
  campaign_mcn_name?: string;
  /**
   * Campaign start time, it's unix timestamp in seconds.
   */
  campaign_start_time?: number;
  /**
   * Campaign end time, it's unix timestamp in seconds.
   */
  campaign_end_time?: number;
}
/**
 * GetItemSetItemList_List sub-interface for GetItemSetItemList_Response
 */
export interface GetItemSetItemList_List {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of this item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of this item.
   */
  image_url?: string;
  price_info?: GetItemSetItemList_PriceInfo;
  affiliate_info?: GetItemSetItemList_AffiliateInfo;
}
/**
 * GetItemSetItemList_Response sub-interface for GetItemSetItemListResponse
 */
export interface GetItemSetItemList_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetItemSetItemList_List[];
}
/**
 * Response data payload for get_item_set_item_list
 */
export type GetItemSetItemListResponseData = GetItemSetItemList_Response;
/**
 * Response payload for get_item_set_item_list
 *
 * Get the item list of the product set, including item name, id, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetItemSetItemListResponse = FetchResponse<GetItemSetItemListResponseData>;
/**
 * Request parameters for get_item_set_list
 *
 * Get the product set of the live stream, including the product set name, id, and item number. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetItemSetListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Search the item set with it's name matching the keyword.
   */
  keyword?: string;
}
/**
 * GetItemSetList_List sub-interface for GetItemSetList_Response
 */
export interface GetItemSetList_List {
  /**
   * The identifier of the item set.
   */
  item_set_id?: number;
  /**
   * The name of the item set.
   */
  item_set_name?: string;
  /**
   * The number of items in this item set.
   */
  item_count?: number;
}
/**
 * GetItemSetList_Response sub-interface for GetItemSetListResponse
 */
export interface GetItemSetList_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetItemSetList_List[];
}
/**
 * Response data payload for get_item_set_list
 */
export type GetItemSetListResponseData = GetItemSetList_Response;
/**
 * Response payload for get_item_set_list
 *
 * Get the product set of the live stream, including the product set name, id, and item number. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetItemSetListResponse = FetchResponse<GetItemSetListResponseData>;
/**
 * Request parameters for get_latest_comment_list
 *
 * Get live stream room comments in the last 10 seconds, including user id, user name, comment id, comment content, and comment time. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetLatestCommentListRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: number;
}
/**
 * GetLatestCommentList_List sub-interface for GetLatestCommentList_Response
 */
export interface GetLatestCommentList_List {
  /**
   * The identifier of comment.
   */
  comment_id?: number;
  /**
   * The content of comment.
   */
  content?: string;
  /**
   * Timestamp for posting comment. It's unix timestamp in seconds.
   */
  timestamp?: Date | number;
  /**
   * The user id of the one who posted the comment.
   */
  user_id?: number;
  /**
   * The username of the one who posted comment.
   */
  username?: string;
}
/**
 * GetLatestCommentList_Response sub-interface for GetLatestCommentListResponse
 */
export interface GetLatestCommentList_Response {
  /**
   * The offset for next page request.
   */
  next_offset?: number;
  list?: GetLatestCommentList_List[];
}
/**
 * Response data payload for get_latest_comment_list
 */
export type GetLatestCommentListResponseData = GetLatestCommentList_Response;
/**
 * Response payload for get_latest_comment_list
 *
 * Get live stream room comments in the last 10 seconds, including user id, user name, comment id, comment content, and comment time. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetLatestCommentListResponse = FetchResponse<GetLatestCommentListResponseData>;
/**
 * Request parameters for get_like_item_list
 *
 * Get the item list of My Likes tab.(For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetLikeItemListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Search items with name matching this keyword.
   */
  keyword?: string;
}
/**
 * GetLikeItemList_PriceInfo sub-interface for GetLikeItemList_List
 */
export interface GetLikeItemList_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetLikeItemList_AffiliateInfo sub-interface for GetLikeItemList_List
 */
export interface GetLikeItemList_AffiliateInfo {
  /**
   * The commission rate that the streamer can get, for example, 0.1 means 10%.
   */
  commission_rate?: number;
  /**
   * Whether participate in a campaign project (generally, the commission will be higher).
   */
  is_campaign?: boolean;
  /**
   * MCN agency that initiated this campaign.
   */
  campaign_mcn_name?: string;
  /**
   * Campaign start time, it's unix timestamp in seconds.
   */
  campaign_start_time?: number;
  /**
   * Campaign end time, it's unix timestamp in seconds.
   */
  campaign_end_time?: number;
}
/**
 * GetLikeItemList_List sub-interface for GetLikeItemList_Response
 */
export interface GetLikeItemList_List {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of this item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of this item.
   */
  image_url?: string;
  price_info?: GetLikeItemList_PriceInfo;
  affiliate_info?: GetLikeItemList_AffiliateInfo;
}
/**
 * GetLikeItemList_Response sub-interface for GetLikeItemListResponse
 */
export interface GetLikeItemList_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetLikeItemList_List[];
}
/**
 * Response data payload for get_like_item_list
 */
export type GetLikeItemListResponseData = GetLikeItemList_Response;
/**
 * Response payload for get_like_item_list
 *
 * Get the item list of My Likes tab.(For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetLikeItemListResponse = FetchResponse<GetLikeItemListResponseData>;
/**
 * Request parameters for get_recent_item_list
 *
 * Get the item list of the Recently tab. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetRecentItemListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetRecentItemList_PriceInfo sub-interface for GetRecentItemList_List
 */
export interface GetRecentItemList_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetRecentItemList_AffiliateInfo sub-interface for GetRecentItemList_List
 */
export interface GetRecentItemList_AffiliateInfo {
  /**
   * The commission rate that the streamer can get, for example, 0.1 means 10%.
   */
  commission_rate?: number;
  /**
   * Whether participate in a campaign project (generally, the commission will be higher)
   */
  is_campaign?: boolean;
  /**
   * MCN agency that initiated this campaign
   */
  campaign_mcn_name?: string;
  /**
   * Campaign start time, it's unix timestamp in seconds.
   */
  campaign_start_time?: number;
  /**
   * Campaign end time, it's unix timestamp in seconds.
   */
  campaign_end_time?: number;
}
/**
 * GetRecentItemList_List sub-interface for GetRecentItemList_Response
 */
export interface GetRecentItemList_List {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of this item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of this item.
   */
  image_url?: string;
  price_info?: GetRecentItemList_PriceInfo;
  affiliate_info?: GetRecentItemList_AffiliateInfo;
}
/**
 * GetRecentItemList_Response sub-interface for GetRecentItemListResponse
 */
export interface GetRecentItemList_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetRecentItemList_List[];
}
/**
 * Response data payload for get_recent_item_list
 */
export type GetRecentItemListResponseData = GetRecentItemList_Response;
/**
 * Response payload for get_recent_item_list
 *
 * Get the item list of the Recently tab. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetRecentItemListResponse = FetchResponse<GetRecentItemListResponseData>;
/**
 * Request parameters for get_session_detail
 *
 * Get basic information about the live streaming room, including cover, title, description, type (test live or normal live), create time, update time, stream url, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetSessionDetailRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * GetSessionDetail_StreamUrl sub-interface for GetSessionDetail_Response
 */
export interface GetSessionDetail_StreamUrl {
  /**
   * The push stream url for the livestream session.
   */
  push_url?: string;
  /**
   * The push stream key for the livestream session.
   */
  push_key?: string;
  /**
   * The pull stream url of the livestream session.
   */
  play_url?: string;
  /**
   * The identifier of the stream domain, need to be passed in request for v2.livestream.start_session.
   */
  domain_id?: number;
}
/**
 * GetSessionDetail_Response sub-interface for GetSessionDetailResponse
 */
export interface GetSessionDetail_Response {
  /**
   * The identifier of livestream session.
   */
  session_id?: number;
  /**
   * The title of the livestream session.
   */
  title?: string;
  /**
   * The description of the livestream session.
   */
  description?: string;
  /**
   * The cover image URL of the livestream session.
   */
  cover_image_url?: string;
  /**
   * The status of the livestream session, the enumeration values are as follows:0 - Initial1 - Ongoing2 - Ended
   */
  status?: number;
  /**
   * The share link of the livestream session.
   */
  share_url?: string;
  /**
   * Indicate whether this livestream session if for testing purpose only.
   */
  is_test?: boolean;
  /**
   * The creation time of the livestream session. It's unix timestamp in seconds.
   */
  create_time?: number;
  /**
   * The update time of the livestream session. It's unix timestamp in seconds.
   */
  update_time?: number;
  /**
   * The start time of the livestream session, 0 if session is not started yet. It's unix timestamp in seconds.
   */
  start_time?: number;
  /**
   * The end time of livestream session, 0 if session is not ended yet. It's unix timestamp in seconds.
   */
  end_time?: number;
  stream_url_list?: GetSessionDetail_StreamUrl[];
}
/**
 * Response data payload for get_session_detail
 */
export type GetSessionDetailResponseData = GetSessionDetail_Response;
/**
 * Response payload for get_session_detail
 *
 * Get basic information about the live streaming room, including cover, title, description, type (test live or normal live), create time, update time, stream url, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetSessionDetailResponse = FetchResponse<GetSessionDetailResponseData>;
/**
 * Request parameters for get_session_item_metric
 *
 * Get real-time indicator data of live stream products, including product clicks, add-to-cart, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetSessionItemMetricRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetSessionItemMetric_PriceInfo sub-interface for GetSessionItemMetric_Item
 */
export interface GetSessionItemMetric_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetSessionItemMetric_Item sub-interface for GetSessionItemMetric_List
 */
export interface GetSessionItemMetric_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of the item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of the item.
   */
  image_url?: string;
  price_info?: GetSessionItemMetric_PriceInfo;
}
/**
 * GetSessionItemMetric_Metric sub-interface for GetSessionItemMetric_List
 */
export interface GetSessionItemMetric_Metric {
  /**
   * Number of product clicks.
   */
  item_clicks?: number;
  /**
   * Number of "Add To Cart" button clicked for all products in the orange bag during livestream.
   */
  atc?: number;
  /**
   * Number of product sold.
   */
  sold_items?: number;
}
/**
 * GetSessionItemMetric_List sub-interface for GetSessionItemMetric_Response
 */
export interface GetSessionItemMetric_List {
  item?: GetSessionItemMetric_Item;
  metric?: GetSessionItemMetric_Metric;
}
/**
 * GetSessionItemMetric_Response sub-interface for GetSessionItemMetricResponse
 */
export interface GetSessionItemMetric_Response {
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  more?: boolean;
  /**
   * If more is true, this value need set to next request offset.
   */
  next_offset?: number;
  list?: GetSessionItemMetric_List[];
}
/**
 * Response data payload for get_session_item_metric
 */
export type GetSessionItemMetricResponseData = GetSessionItemMetric_Response;
/**
 * Response payload for get_session_item_metric
 *
 * Get real-time indicator data of live stream products, including product clicks, add-to-cart, etc. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetSessionItemMetricResponse = FetchResponse<GetSessionItemMetricResponseData>;
/**
 * Request parameters for get_session_metric
 *
 * Get real-time indicator data of the live stream room, including the number of likes, comments, shares, views, etc.(For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetSessionMetricRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * GetSessionMetric_Response sub-interface for GetSessionMetricResponse
 */
export interface GetSessionMetric_Response {
  /**
   * Value of placed orders (paid and unpaid) during Livestream, including sales from cancelled orders.
   */
  gmv?: number;
  /**
   * Number of "Add To Cart" button clicked for all products in the orange bag during livestream.
   */
  atc?: number;
  /**
   * Number of products clicks divided by Number of Livestream views.
   */
  ctr?: number;
  /**
   * Amount of product orders from the stream divided by Amount of product clicks from the stream.
   */
  co?: number;
  /**
   * Number of placed orders (paid and unpaid) during Livestream, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of viewers during stream.
   */
  ccu?: number;
  /**
   * Number of Concurrent viewers in the stream that have watched for more than 1 minute.
   */
  engage_ccu_1m?: number;
  /**
   * Highest number of viewers during stream.
   */
  peak_ccu?: number;
  /**
   * Number of "Like" clicked during livestream.
   */
  likes?: number;
  /**
   * Number of comments acquired during the stream.
   */
  comments?: number;
  /**
   * Number of shares created during the stream.
   */
  shares?: number;
  /**
   * Number of views from the stream.
   */
  views?: number;
  /**
   * Average of Viewer duration watching in the stream.
   */
  avg_viewing_duration?: number;
}
/**
 * Response data payload for get_session_metric
 */
export type GetSessionMetricResponseData = GetSessionMetric_Response;
/**
 * Response payload for get_session_metric
 *
 * Get real-time indicator data of the live stream room, including the number of likes, comments, shares, views, etc.(For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetSessionMetricResponse = FetchResponse<GetSessionMetricResponseData>;
/**
 * Request parameters for get_show_item
 *
 * Get the showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface GetShowItemRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
}
/**
 * GetShowItem_PriceInfo sub-interface for GetShowItem_Item
 */
export interface GetShowItem_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item.
   */
  currency?: string;
  /**
   * The current price of the item in the listing currency. If product under an ongoing promotion, current_price will be the promotion price.
   */
  current_price?: number;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
}
/**
 * GetShowItem_Item sub-interface for GetShowItem_Response
 */
export interface GetShowItem_Item {
  /**
   * The order of this item in the shopping bag of current session, start from 1. Only return item_no when showing item is in the shopping bag of current session.
   */
  item_no?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The shop id of this item.
   */
  shop_id?: number;
  /**
   * Name of the item in local language.
   */
  name?: string;
  /**
   * The image url of this item.
   */
  image_url?: string;
  price_info?: GetShowItem_PriceInfo;
}
/**
 * GetShowItem_Response sub-interface for GetShowItemResponse
 */
export interface GetShowItem_Response {
  /**
   * Whether has the showing item.
   */
  has_show_item?: boolean;
  item?: GetShowItem_Item;
}
/**
 * Response data payload for get_show_item
 */
export type GetShowItemResponseData = GetShowItem_Response;
/**
 * Response payload for get_show_item
 *
 * Get the showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type GetShowItemResponse = FetchResponse<GetShowItemResponseData>;
/**
 * Request parameters for post_comment
 *
 * Post comment in the live stream as streamer. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface PostCommentRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The comment content, cannot exceed 150 characters.
   */
  content: string;
}
/**
 * PostComment_Response sub-interface for PostCommentResponse
 */
export interface PostComment_Response {
  /**
   * The identifier of the comment.
   */
  comment_id?: number;
}
/**
 * Response data payload for post_comment
 */
export type PostCommentResponseData = PostComment_Response;
/**
 * Response payload for post_comment
 *
 * Post comment in the live stream as streamer. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type PostCommentResponse = FetchResponse<PostCommentResponseData>;
/**
 * Request parameters for start_session
 *
 * Start Live. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface StartSessionRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The identifier of the stream domain.
   */
  domain_id: number;
  /**
   * Only available in PH region.To support transparent experiences on Shopee Live,please select this option if AI-generated streameris used for live-streaming.Failure of doing so may lead to warning or termination.Learn more about the policy:PH: https://seller.shopee.ph/edu/article/25213
   */
  ai_stream?: AiStream | string | number;
}
/**
 * Response data payload for start_session
 */
export type StartSessionResponseData = any;
/**
 * Response payload for start_session
 *
 * Start Live. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type StartSessionResponse = FetchResponse<StartSessionResponseData>;
/**
 * Request parameters for unban_user_comment
 *
 * Unban a user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface UnbanUserCommentRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The user ID that will be unbanned from posting comments.
   */
  unban_user_id: number;
}
/**
 * Response data payload for unban_user_comment
 */
export type UnbanUserCommentResponseData = any;
/**
 * Response payload for unban_user_comment
 *
 * Unban a user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type UnbanUserCommentResponse = FetchResponse<UnbanUserCommentResponseData>;
/**
 * UpdateItemList_Item sub-interface for UpdateItemListRequest
 */
export interface UpdateItemList_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The shop id of this item.
   */
  shop_id: number;
}
/**
 * Request parameters for update_item_list
 *
 * Update the order of items in item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface UpdateItemListRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The list of item with updated order.
   */
  item_list: UpdateItemList_Item[];
}
/**
 * Response data payload for update_item_list
 */
export type UpdateItemListResponseData = any;
/**
 * Response payload for update_item_list
 *
 * Update the order of items in item bag. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type UpdateItemListResponse = FetchResponse<UpdateItemListResponseData>;
/**
 * Request parameters for update_session
 *
 * Update live stream information, including cover, title, description, and type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface UpdateSessionRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * The title of the livestream session, cannot exceed 200 characters.
   */
  title: string;
  /**
   * The description of the livestream session, cannot exceed 200 characters.
   */
  description?: string;
  /**
   * The cover image url of the livestream session.Please call the v2.livestream.upload_image to upload the cover image file and get the cover_image_url.
   */
  cover_image_url: string;
  /**
   * Indicate whether this livestream session if for testing purpose only.
   */
  is_test: boolean;
}
/**
 * Response data payload for update_session
 */
export type UpdateSessionResponseData = any;
/**
 * Response payload for update_session
 *
 * Update live stream information, including cover, title, description, and type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
 */
export type UpdateSessionResponse = FetchResponse<UpdateSessionResponseData>;
/**
 * Request parameters for update_show_item
 *
 * Set the showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export interface UpdateShowItemRequest {
  /**
   * The identifier of livestream session.
   */
  session_id: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The shop id of this item.
   */
  shop_id: number;
}
/**
 * Response data payload for update_show_item
 */
export type UpdateShowItemResponseData = any;
/**
 * Response payload for update_show_item
 *
 * Set the showing item. (For TW, ID, TH, PH, MY, SG, VN)
 */
export type UpdateShowItemResponse = FetchResponse<UpdateShowItemResponseData>;
/**
 * Request parameters for upload_image
 *
 * Upload an image as the live stream cover.(For TW, ID, TH, PH, MY, SG, VN)
 */
export interface UploadImageRequest {
  /**
   * The image file to upload.
   */
  image: any;
}
/**
 * UploadImage_Response sub-interface for UploadImageResponse
 */
export interface UploadImage_Response {
  /**
   * The image URL
   */
  image_url?: string;
}
/**
 * Response data payload for upload_image
 */
export type UploadImageResponseData = UploadImage_Response;
/**
 * Response payload for upload_image
 *
 * Upload an image as the live stream cover.(For TW, ID, TH, PH, MY, SG, VN)
 */
export type UploadImageResponse = FetchResponse<UploadImageResponseData>;
