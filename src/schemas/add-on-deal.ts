// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for add_add_on_deal
 *
 * Add Add-on Deal
 */
export interface AddAddOnDealRequest {
  /**
   * Title of the add on deal
   */
  add_on_deal_name: string;
  /**
   * The time when add on deal activity start.
   */
  start_time: number;
  /**
   * The time when add on deal activity end
   */
  end_time: number;
  /**
   * The type of add on deal：add on discount =0；gift with mini spend=1
   */
  promotion_type: number;
  /**
   * The minimum purchase amount that needs to be met to buy the gift with min.Spend
   */
  purchase_min_spend?: number;
  /**
   * Number of gifts that buyers can get
   */
  per_gift_num?: number;
  /**
   * promotion_purchase_limit
   */
  promotion_purchase_limit?: number;
}
/**
 * AddAddOnDealResponseData sub-interface for AddAddOnDealResponse
 */
export interface AddAddOnDealResponseData {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for add_add_on_deal
 *
 * Add Add-on Deal
 */
export type AddAddOnDealResponse = FetchResponse<AddAddOnDealResponseData>;
/**
 * AddAddOnDealMainItemMainItem sub-interface for AddAddOnDealMainItemRequest
 */
export interface AddAddOnDealMainItemMainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status: number;
}
/**
 * Request parameters for add_add_on_deal_main_item
 *
 * Add Add-on Deal Main Item
 */
export interface AddAddOnDealMainItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list: AddAddOnDealMainItemMainItem[];
}
/**
 * AddAddOnDealMainItem_AddAddOnDealMainItemMainItem sub-interface for AddAddOnDealMainItemResponseData
 */
export interface AddAddOnDealMainItem_AddAddOnDealMainItemMainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
}
/**
 * AddAddOnDealMainItemResponseData sub-interface for AddAddOnDealMainItemResponse
 */
export interface AddAddOnDealMainItemResponseData {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: AddAddOnDealMainItem_AddAddOnDealMainItemMainItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for add_add_on_deal_main_item
 *
 * Add Add-on Deal Main Item
 */
export type AddAddOnDealMainItemResponse = FetchResponse<AddAddOnDealMainItemResponseData>;
/**
 * AddAddOnDealSubItemSubItem sub-interface for AddAddOnDealSubItemRequest
 */
export interface AddAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  /**
   * Add-on discount price before tax
   */
  sub_item_input_price?: number;
  /**
   * The purchase limit of sub item.
   */
  sub_item_limit?: number;
}
/**
 * Request parameters for add_add_on_deal_sub_item
 *
 * Add Add-on Deal Sub Item
 */
export interface AddAddOnDealSubItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list: AddAddOnDealSubItemSubItem[];
}
/**
 * AddAddOnDealSubItem_AddAddOnDealSubItemSubItem sub-interface for AddAddOnDealSubItemResponseData
 */
export interface AddAddOnDealSubItem_AddAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  fail_error?: string;
  fail_message?: string;
}
/**
 * AddAddOnDealSubItemResponseData sub-interface for AddAddOnDealSubItemResponse
 */
export interface AddAddOnDealSubItemResponseData {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: AddAddOnDealSubItem_AddAddOnDealSubItemSubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for add_add_on_deal_sub_item
 *
 * Add Add-on Deal Sub Item
 */
export type AddAddOnDealSubItemResponse = FetchResponse<AddAddOnDealSubItemResponseData>;
/**
 * Request parameters for delete_add_on_deal
 *
 * Delete Add-on Deal
 */
export interface DeleteAddOnDealRequest {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id: number;
}
/**
 * DeleteAddOnDealResponseData sub-interface for DeleteAddOnDealResponse
 */
export interface DeleteAddOnDealResponseData {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for delete_add_on_deal
 *
 * Delete Add-on Deal
 */
export type DeleteAddOnDealResponse = FetchResponse<DeleteAddOnDealResponseData>;
/**
 * Request parameters for delete_add_on_deal_main_item
 *
 * Delete Add-on Deal Main Item
 */
export interface DeleteAddOnDealMainItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list: number[];
}
/**
 * DeleteAddOnDealMainItemResponseData sub-interface for DeleteAddOnDealMainItemResponse
 */
export interface DeleteAddOnDealMainItemResponseData {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: number[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for delete_add_on_deal_main_item
 *
 * Delete Add-on Deal Main Item
 */
export type DeleteAddOnDealMainItemResponse = FetchResponse<DeleteAddOnDealMainItemResponseData>;
/**
 * DeleteAddOnDealSubItemSubItem sub-interface for DeleteAddOnDealSubItemRequest
 */
export interface DeleteAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
}
/**
 * Request parameters for delete_add_on_deal_sub_item
 *
 * Delete Add-on Deal Sub Item
 */
export interface DeleteAddOnDealSubItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list: DeleteAddOnDealSubItemSubItem[];
}
/**
 * DeleteAddOnDealSubItem_DeleteAddOnDealSubItemSubItem sub-interface for DeleteAddOnDealSubItemResponseData
 */
export interface DeleteAddOnDealSubItem_DeleteAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  fail_error?: string;
  fail_message?: string;
}
/**
 * DeleteAddOnDealSubItemResponseData sub-interface for DeleteAddOnDealSubItemResponse
 */
export interface DeleteAddOnDealSubItemResponseData {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: DeleteAddOnDealSubItem_DeleteAddOnDealSubItemSubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for delete_add_on_deal_sub_item
 *
 * Delete Add-on Deal Sub Item
 */
export type DeleteAddOnDealSubItemResponse = FetchResponse<DeleteAddOnDealSubItemResponseData>;
/**
 * Request parameters for end_add_on_deal
 *
 * End Add-on Deal
 */
export interface EndAddOnDealRequest {
  /**
   * The identifier of the API request for error tracking
   */
  add_on_deal_id: number;
}
/**
 * EndAddOnDealResponseData sub-interface for EndAddOnDealResponse
 */
export interface EndAddOnDealResponseData {
  /**
   * The identifier of the API request for error tracking
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for end_add_on_deal
 *
 * End Add-on Deal
 */
export type EndAddOnDealResponse = FetchResponse<EndAddOnDealResponseData>;
/**
 * Request parameters for get_add_on_deal
 *
 * Get Add-on Deal
 */
export interface GetAddOnDealRequest {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id: number;
}
/**
 * GetAddOnDealResponseData sub-interface for GetAddOnDealResponse
 */
export interface GetAddOnDealResponseData {
  /**
   * The time when add on deal activity start.
   */
  start_time?: number;
  /**
   * The time when add on deal activity end
   */
  end_time?: number;
  /**
   * The type of add on deal：add on discount =0；gift with mini spend=1
   */
  promotion_type?: number;
  /**
   * The minimum purchase amount that needs to be met to buy the gift with min.Spend
   */
  purchase_min_spend?: number;
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
  /**
   * Number of gifts that buyers can get
   */
  per_gift_num?: number;
  /**
   * The order of the sub item
   */
  sub_item_priority?: number[];
  /**
   * Max. number of add-on products that a customer can purchase per order.
   */
  promotion_purchase_limit?: number;
  /**
   * Title of the add on deal
   */
  add_on_deal_name?: string;
  source?: number;
}
/**
 * Response payload for get_add_on_deal
 *
 * Get Add-on Deal
 */
export type GetAddOnDealResponse = FetchResponse<GetAddOnDealResponseData>;
/**
 * Request parameters for get_add_on_deal_list
 *
 * Get Add-on Deal List
 */
export interface GetAddOnDealListRequest {
  /**
   * The Status of add on deal，default status is all
   */
  promotion_status: string;
  /**
   * The default page number is 1
   */
  page_no?: number;
  /**
   * The default page size is 100
   */
  page_size?: number;
}
/**
 * GetAddOnDealListAddOnDeal sub-interface for GetAddOnDealListResponseData
 */
export interface GetAddOnDealListAddOnDeal {
  /**
   * The time when add on deal activity start.
   */
  start_time?: number;
  /**
   * The time when add on deal activity end
   */
  end_time?: number;
  /**
   * The type of add on deal：add on discount =0；gift with mini spend=1
   */
  promotion_type?: number;
  /**
   * The minimum purchase amount that needs to be met to buy the gift with min.Spend
   */
  purchase_min_spend?: number;
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
  /**
   * Number of gifts that buyers can get
   */
  per_gift_num?: number;
  /**
   * Max. number of add-on products that a customer can purchase per order.
   */
  promotion_purchase_limit?: number;
  /**
   * Title of the add on deal
   */
  add_on_deal_name?: string;
  /**
   * The create source of bundle deal：Seller=1，shopee admin=0
   */
  source?: number;
  /**
   * The display sequence of sub item in buyer side
   */
  sub_item_prioriry?: number[];
}
/**
 * GetAddOnDealListResponseData sub-interface for GetAddOnDealListResponse
 */
export interface GetAddOnDealListResponseData {
  /**
   * The list of add on deal id
   */
  add_on_deal_list?: GetAddOnDealListAddOnDeal[];
  /**
   * This is to indicate whether the promotion list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of promotions.
   */
  more?: boolean;
}
/**
 * Response payload for get_add_on_deal_list
 *
 * Get Add-on Deal List
 */
export type GetAddOnDealListResponse = FetchResponse<GetAddOnDealListResponseData>;
/**
 * Request parameters for get_add_on_deal_main_item
 *
 * Get Add-on Deal Main Item
 */
export interface GetAddOnDealMainItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
}
/**
 * GetAddOnDealMainItemMainItem sub-interface for GetAddOnDealMainItemResponseData
 */
export interface GetAddOnDealMainItemMainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
}
/**
 * GetAddOnDealMainItemResponseData sub-interface for GetAddOnDealMainItemResponse
 */
export interface GetAddOnDealMainItemResponseData {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: GetAddOnDealMainItemMainItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for get_add_on_deal_main_item
 *
 * Get Add-on Deal Main Item
 */
export type GetAddOnDealMainItemResponse = FetchResponse<GetAddOnDealMainItemResponseData>;
/**
 * Request parameters for get_add_on_deal_sub_item
 *
 * Get Add-on Deal Sub Item
 */
export interface GetAddOnDealSubItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
}
/**
 * GetAddOnDealSubItemPrice sub-interface for GetAddOnDealSubItemSubItem
 */
export interface GetAddOnDealSubItemPrice {
  /**
   * Add-on discount price before tax
   */
  promo_input_price?: number;
  /**
   * Add-on discount price after tax
   */
  promo_price?: number;
}
/**
 * GetAddOnDealSubItemSubItem sub-interface for GetAddOnDealSubItemResponseData
 */
export interface GetAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  /**
   * The purchase limit of each sub item. Only the add on discount can be set and the default limit of gift with mini.spend is 1
   */
  sub_item_limit?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  price?: GetAddOnDealSubItemPrice;
}
/**
 * GetAddOnDealSubItemResponseData sub-interface for GetAddOnDealSubItemResponse
 */
export interface GetAddOnDealSubItemResponseData {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: GetAddOnDealSubItemSubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
}
/**
 * Response payload for get_add_on_deal_sub_item
 *
 * Get Add-on Deal Sub Item
 */
export type GetAddOnDealSubItemResponse = FetchResponse<GetAddOnDealSubItemResponseData>;
/**
 * Request parameters for update_add_on_deal
 *
 * Update Add-on Deal
 */
export interface UpdateAddOnDealRequest {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The time when bundle deal activity start.The start time must be 1 hour than current time.
   */
  start_time?: number;
  /**
   * The time when bundle deal activity end. The end time must be later than start time.
   */
  end_time?: number;
  /**
   * The minimum purchase amount that needs to be met to buy the gift with min.Spend
   */
  purchase_min_spend?: number;
  /**
   * Number of gifts that buyers can get
   */
  per_gift_num?: number;
  /**
   * Max. number of add-on products that a customer can purchase per order.
   */
  promotion_purchase_limit?: number;
  /**
   * The order of sub item
   */
  sub_item_priority?: number[];
  /**
   * Title of the add on deal
   */
  add_on_deal_name?: string;
}
/**
 * UpdateAddOnDealResponseData sub-interface for UpdateAddOnDealResponse
 */
export interface UpdateAddOnDealResponseData {
  /**
   * The time when add on deal activity start.
   */
  start_time?: number;
  /**
   * The time when add on deal activity end
   */
  end_time?: number;
  /**
   * The type of add on deal：add on discount =0；gift with mini spend=1
   */
  promotion_type?: number;
  /**
   * The minimum purchase amount that needs to be met to buy the gift with min.Spend
   */
  purchase_min_spend?: number;
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
  /**
   * Number of gifts that buyers can get
   */
  per_gift_num?: number;
  /**
   * Max. number of add-on products that a customer can purchase per order.
   */
  promotion_purchase_limit?: number;
  /**
   * Title of the add on deal
   */
  add_on_deal_name?: string;
}
/**
 * Response payload for update_add_on_deal
 *
 * Update Add-on Deal
 */
export type UpdateAddOnDealResponse = FetchResponse<UpdateAddOnDealResponseData>;
/**
 * UpdateAddOnDealMainItemMainItem sub-interface for UpdateAddOnDealMainItemRequest
 */
export interface UpdateAddOnDealMainItemMainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status: number;
}
/**
 * Request parameters for update_add_on_deal_main_item
 *
 * Update Add-on Deal Main Item
 */
export interface UpdateAddOnDealMainItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list: UpdateAddOnDealMainItemMainItem[];
}
/**
 * UpdateAddOnDealMainItem_UpdateAddOnDealMainItemMainItem sub-interface for UpdateAddOnDealMainItemResponseData
 */
export interface UpdateAddOnDealMainItem_UpdateAddOnDealMainItemMainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
}
/**
 * UpdateAddOnDealMainItemResponseData sub-interface for UpdateAddOnDealMainItemResponse
 */
export interface UpdateAddOnDealMainItemResponseData {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: UpdateAddOnDealMainItem_UpdateAddOnDealMainItemMainItem[];
}
/**
 * Response payload for update_add_on_deal_main_item
 *
 * Update Add-on Deal Main Item
 */
export type UpdateAddOnDealMainItemResponse = FetchResponse<UpdateAddOnDealMainItemResponseData>;
/**
 * UpdateAddOnDealSubItemSubItem sub-interface for UpdateAddOnDealSubItemRequest
 */
export interface UpdateAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  /**
   * Add-on discount price before tax
   */
  sub_item_input_price?: number;
  /**
   * The purchase limit of sub item.The purchase limit of each sub item. Only the add on discount can be set and the default limit of gift with mini.spend is 1
   */
  sub_item_limit?: number;
}
/**
 * Request parameters for update_add_on_deal_sub_item
 *
 * Update Add-on Deal Sub Item
 */
export interface UpdateAddOnDealSubItemRequest {
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id: number;
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list: UpdateAddOnDealSubItemSubItem[];
}
/**
 * UpdateAddOnDealSubItem_UpdateAddOnDealSubItemSubItem sub-interface for UpdateAddOnDealSubItemResponseData
 */
export interface UpdateAddOnDealSubItem_UpdateAddOnDealSubItemSubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  fail_error?: string;
  fail_message?: string;
  /**
   * The discounted price of sub item
   */
  sub_item_input_price?: number;
  /**
   * The purchase limit of sub item.The purchase limit of each sub item. Only the add on discount can be set and the default limit of gift with mini.spend is 1
   */
  sub_item_limit?: number;
}
/**
 * UpdateAddOnDealSubItemResponseData sub-interface for UpdateAddOnDealSubItemResponse
 */
export interface UpdateAddOnDealSubItemResponseData {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: UpdateAddOnDealSubItem_UpdateAddOnDealSubItemSubItem[];
}
/**
 * Response payload for update_add_on_deal_sub_item
 *
 * Update Add-on Deal Sub Item
 */
export type UpdateAddOnDealSubItemResponse = FetchResponse<UpdateAddOnDealSubItemResponseData>;
