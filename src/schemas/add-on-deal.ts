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
  [key: string]: any;
}
/**
 * AddAddOnDeal_Response sub-interface for AddAddOnDealResponse
 */
export interface AddAddOnDeal_Response {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_add_on_deal
 */
export type AddAddOnDealResponseData = AddAddOnDeal_Response;
/**
 * Response payload for add_add_on_deal
 *
 * Add Add-on Deal
 */
export type AddAddOnDealResponse = FetchResponse<AddAddOnDealResponseData>;
/**
 * AddAddOnDealMainItem_MainItem sub-interface for AddAddOnDealMainItemRequest
 */
export interface AddAddOnDealMainItem_MainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status: number;
  [key: string]: any;
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
  main_item_list: AddAddOnDealMainItem_MainItem[];
  [key: string]: any;
}
/**
 * AddAddOnDealMainItem_AddAddOnDealMainItem_MainItem sub-interface for AddAddOnDealMainItem_Response
 */
export interface AddAddOnDealMainItem_AddAddOnDealMainItem_MainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  [key: string]: any;
}
/**
 * AddAddOnDealMainItem_Response sub-interface for AddAddOnDealMainItemResponse
 */
export interface AddAddOnDealMainItem_Response {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: AddAddOnDealMainItem_AddAddOnDealMainItem_MainItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_add_on_deal_main_item
 */
export type AddAddOnDealMainItemResponseData = AddAddOnDealMainItem_Response;
/**
 * Response payload for add_add_on_deal_main_item
 *
 * Add Add-on Deal Main Item
 */
export type AddAddOnDealMainItemResponse = FetchResponse<AddAddOnDealMainItemResponseData>;
/**
 * AddAddOnDealSubItem_SubItem sub-interface for AddAddOnDealSubItemRequest
 */
export interface AddAddOnDealSubItem_SubItem {
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
  [key: string]: any;
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
  sub_item_list: AddAddOnDealSubItem_SubItem[];
  [key: string]: any;
}
/**
 * AddAddOnDealSubItem_AddAddOnDealSubItem_SubItem sub-interface for AddAddOnDealSubItem_Response
 */
export interface AddAddOnDealSubItem_AddAddOnDealSubItem_SubItem {
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
  [key: string]: any;
}
/**
 * AddAddOnDealSubItem_Response sub-interface for AddAddOnDealSubItemResponse
 */
export interface AddAddOnDealSubItem_Response {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: AddAddOnDealSubItem_AddAddOnDealSubItem_SubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_add_on_deal_sub_item
 */
export type AddAddOnDealSubItemResponseData = AddAddOnDealSubItem_Response;
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
  [key: string]: any;
}
/**
 * DeleteAddOnDeal_Response sub-interface for DeleteAddOnDealResponse
 */
export interface DeleteAddOnDeal_Response {
  /**
   * Shopee's unique identifier for an add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_add_on_deal
 */
export type DeleteAddOnDealResponseData = DeleteAddOnDeal_Response;
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
  [key: string]: any;
}
/**
 * DeleteAddOnDealMainItem_Response sub-interface for DeleteAddOnDealMainItemResponse
 */
export interface DeleteAddOnDealMainItem_Response {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: number[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_add_on_deal_main_item
 */
export type DeleteAddOnDealMainItemResponseData = DeleteAddOnDealMainItem_Response;
/**
 * Response payload for delete_add_on_deal_main_item
 *
 * Delete Add-on Deal Main Item
 */
export type DeleteAddOnDealMainItemResponse = FetchResponse<DeleteAddOnDealMainItemResponseData>;
/**
 * DeleteAddOnDealSubItem_SubItem sub-interface for DeleteAddOnDealSubItemRequest
 */
export interface DeleteAddOnDealSubItem_SubItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  [key: string]: any;
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
  sub_item_list: DeleteAddOnDealSubItem_SubItem[];
  [key: string]: any;
}
/**
 * DeleteAddOnDealSubItem_DeleteAddOnDealSubItem_SubItem sub-interface for DeleteAddOnDealSubItem_Response
 */
export interface DeleteAddOnDealSubItem_DeleteAddOnDealSubItem_SubItem {
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
  [key: string]: any;
}
/**
 * DeleteAddOnDealSubItem_Response sub-interface for DeleteAddOnDealSubItemResponse
 */
export interface DeleteAddOnDealSubItem_Response {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: DeleteAddOnDealSubItem_DeleteAddOnDealSubItem_SubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_add_on_deal_sub_item
 */
export type DeleteAddOnDealSubItemResponseData = DeleteAddOnDealSubItem_Response;
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
  [key: string]: any;
}
/**
 * EndAddOnDeal_Response sub-interface for EndAddOnDealResponse
 */
export interface EndAddOnDeal_Response {
  /**
   * The identifier of the API request for error tracking
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for end_add_on_deal
 */
export type EndAddOnDealResponseData = EndAddOnDeal_Response;
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
  [key: string]: any;
}
/**
 * GetAddOnDeal_Response sub-interface for GetAddOnDealResponse
 */
export interface GetAddOnDeal_Response {
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
  [key: string]: any;
}
/**
 * Response data payload for get_add_on_deal
 */
export type GetAddOnDealResponseData = GetAddOnDeal_Response;
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
  [key: string]: any;
}
/**
 * GetAddOnDealList_AddOnDeal sub-interface for GetAddOnDealList_Response
 */
export interface GetAddOnDealList_AddOnDeal {
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
  [key: string]: any;
}
/**
 * GetAddOnDealList_Response sub-interface for GetAddOnDealListResponse
 */
export interface GetAddOnDealList_Response {
  /**
   * The list of add on deal id
   */
  add_on_deal_list?: GetAddOnDealList_AddOnDeal[];
  /**
   * This is to indicate whether the promotion list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of promotions.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_add_on_deal_list
 */
export type GetAddOnDealListResponseData = GetAddOnDealList_Response;
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
  [key: string]: any;
}
/**
 * GetAddOnDealMainItem_MainItem sub-interface for GetAddOnDealMainItem_Response
 */
export interface GetAddOnDealMainItem_MainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  [key: string]: any;
}
/**
 * GetAddOnDealMainItem_Response sub-interface for GetAddOnDealMainItemResponse
 */
export interface GetAddOnDealMainItem_Response {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: GetAddOnDealMainItem_MainItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_add_on_deal_main_item
 */
export type GetAddOnDealMainItemResponseData = GetAddOnDealMainItem_Response;
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
  [key: string]: any;
}
/**
 * GetAddOnDealSubItem_Price sub-interface for GetAddOnDealSubItem_SubItem
 */
export interface GetAddOnDealSubItem_Price {
  /**
   * Add-on discount price before tax
   */
  promo_input_price?: number;
  /**
   * Add-on discount price after tax
   */
  promo_price?: number;
  [key: string]: any;
}
/**
 * GetAddOnDealSubItem_SubItem sub-interface for GetAddOnDealSubItem_Response
 */
export interface GetAddOnDealSubItem_SubItem {
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
  price?: GetAddOnDealSubItem_Price;
  [key: string]: any;
}
/**
 * GetAddOnDealSubItem_Response sub-interface for GetAddOnDealSubItemResponse
 */
export interface GetAddOnDealSubItem_Response {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: GetAddOnDealSubItem_SubItem[];
  /**
   * Shopee's unique identifier for add on deal activity.
   */
  add_on_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_add_on_deal_sub_item
 */
export type GetAddOnDealSubItemResponseData = GetAddOnDealSubItem_Response;
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
  [key: string]: any;
}
/**
 * UpdateAddOnDeal_Response sub-interface for UpdateAddOnDealResponse
 */
export interface UpdateAddOnDeal_Response {
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
  [key: string]: any;
}
/**
 * Response data payload for update_add_on_deal
 */
export type UpdateAddOnDealResponseData = UpdateAddOnDeal_Response;
/**
 * Response payload for update_add_on_deal
 *
 * Update Add-on Deal
 */
export type UpdateAddOnDealResponse = FetchResponse<UpdateAddOnDealResponseData>;
/**
 * UpdateAddOnDealMainItem_MainItem sub-interface for UpdateAddOnDealMainItemRequest
 */
export interface UpdateAddOnDealMainItem_MainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status: number;
  [key: string]: any;
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
  main_item_list: UpdateAddOnDealMainItem_MainItem[];
  [key: string]: any;
}
/**
 * UpdateAddOnDealMainItem_UpdateAddOnDealMainItem_MainItem sub-interface for UpdateAddOnDealMainItem_Response
 */
export interface UpdateAddOnDealMainItem_UpdateAddOnDealMainItem_MainItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The status of add on deal item：enable = 1；disable =2
   */
  status?: number;
  [key: string]: any;
}
/**
 * UpdateAddOnDealMainItem_Response sub-interface for UpdateAddOnDealMainItemResponse
 */
export interface UpdateAddOnDealMainItem_Response {
  /**
   * The main items added in this add on deal promotion.
   */
  main_item_list?: UpdateAddOnDealMainItem_UpdateAddOnDealMainItem_MainItem[];
  [key: string]: any;
}
/**
 * Response data payload for update_add_on_deal_main_item
 */
export type UpdateAddOnDealMainItemResponseData = UpdateAddOnDealMainItem_Response;
/**
 * Response payload for update_add_on_deal_main_item
 *
 * Update Add-on Deal Main Item
 */
export type UpdateAddOnDealMainItemResponse = FetchResponse<UpdateAddOnDealMainItemResponseData>;
/**
 * UpdateAddOnDealSubItem_SubItem sub-interface for UpdateAddOnDealSubItemRequest
 */
export interface UpdateAddOnDealSubItem_SubItem {
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
  [key: string]: any;
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
  sub_item_list: UpdateAddOnDealSubItem_SubItem[];
  [key: string]: any;
}
/**
 * UpdateAddOnDealSubItem_UpdateAddOnDealSubItem_SubItem sub-interface for UpdateAddOnDealSubItem_Response
 */
export interface UpdateAddOnDealSubItem_UpdateAddOnDealSubItem_SubItem {
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
  [key: string]: any;
}
/**
 * UpdateAddOnDealSubItem_Response sub-interface for UpdateAddOnDealSubItemResponse
 */
export interface UpdateAddOnDealSubItem_Response {
  /**
   * The sub items added in this add on deal promotion.
   */
  sub_item_list?: UpdateAddOnDealSubItem_UpdateAddOnDealSubItem_SubItem[];
  [key: string]: any;
}
/**
 * Response data payload for update_add_on_deal_sub_item
 */
export type UpdateAddOnDealSubItemResponseData = UpdateAddOnDealSubItem_Response;
/**
 * Response payload for update_add_on_deal_sub_item
 *
 * Update Add-on Deal Sub Item
 */
export type UpdateAddOnDealSubItemResponse = FetchResponse<UpdateAddOnDealSubItemResponseData>;
