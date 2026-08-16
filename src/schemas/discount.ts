import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field DiscountStatus
 */
export enum DiscountStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
  ALL = "all",
}
/**
 * Enum generated for field Status
 */
export enum Status {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
}
/**
 * Request parameters for add_discount
 *
 * Use this api to add shop discount activity
 */
export interface AddDiscountRequest {
  /**
   * Title of the discount.
   */
  discount_name?: string;
  /**
   * The time when discount activity start.The start time must be 1 hour later than current time.
   */
  start_time?: Date | number;
  /**
   * The time when discount activity end.The end time must be 1 hour later than start time,and the discount period must be less than 180 days.
   */
  end_time?: Date | number;
  [key: string]: any;
}
/**
 * AddDiscount_Response sub-interface for AddDiscountResponse
 */
export interface AddDiscount_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_discount
 */
export type AddDiscountResponseData = AddDiscount_Response;
/**
 * Response payload for add_discount
 *
 * Use this api to add shop discount activity
 */
export type AddDiscountResponse = FetchResponse<AddDiscountResponseData>;
/**
 * AddDiscountItem_Model sub-interface for AddDiscountItem_Item
 */
export interface AddDiscountItem_Model {
  /**
   * Shopee's unique identifier for a variation of an item. If there is no variation of this item, you don't need to input this param. Dafault is 0.
   */
  model_id?: number;
  /**
   * The discount price of the item.
   */
  model_promotion_price?: number;
  /**
   * The reserved stock of the model, default is no limit, and can not update. To edit the promotion stock, you need to delete the exist discount and re-add again.
   */
  model_promotion_stock?: number;
  [key: string]: any;
}
/**
 * AddDiscountItem_Item sub-interface for AddDiscountItemRequest
 */
export interface AddDiscountItem_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The discount price of the item. If the item has no variation, this param is necessary.
   */
  item_promotion_price?: number;
  /**
   * The reserved stock of the item.
   */
  item_promotion_stock?: number;
  /**
   * The models which belongs to this item.
   */
  model_list?: AddDiscountItem_Model[];
  /**
   * The max number of this product in the promotion price. If it's No Limit, please input the 0 for this request data.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * Request parameters for add_discount_item
 *
 * Use this api to add shop discount item.
 */
export interface AddDiscountItemRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The items added in this discount promotion.
   */
  item_list?: AddDiscountItem_Item[];
  [key: string]: any;
}
/**
 * AddDiscountItem_Error sub-interface for AddDiscountItem_Response
 */
export interface AddDiscountItem_Error {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a variation of an item. If there is no variation of this item, you don't need to input this param. Dafault is 0.
   */
  model_id?: number;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  [key: string]: any;
}
/**
 * AddDiscountItem_Response sub-interface for AddDiscountItemResponse
 */
export interface AddDiscountItem_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The number of items that add successfully.
   */
  count?: number;
  /**
   * Indicate error details.
   */
  error_list?: AddDiscountItem_Error[];
  [key: string]: any;
}
/**
 * Response data payload for add_discount_item
 */
export type AddDiscountItemResponseData = AddDiscountItem_Response;
/**
 * Response payload for add_discount_item
 *
 * Use this api to add shop discount item.
 */
export type AddDiscountItemResponse = FetchResponse<AddDiscountItemResponseData>;
/**
 * Request parameters for delete_discount
 *
 * Use this api to delete one discount activity
 */
export interface DeleteDiscountRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  [key: string]: any;
}
/**
 * DeleteDiscount_Response sub-interface for DeleteDiscountResponse
 */
export interface DeleteDiscount_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The time when discount has been deleted.
   */
  modify_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for delete_discount
 */
export type DeleteDiscountResponseData = DeleteDiscount_Response;
/**
 * Response payload for delete_discount
 *
 * Use this api to delete one discount activity
 */
export type DeleteDiscountResponse = FetchResponse<DeleteDiscountResponseData>;
/**
 * Request parameters for delete_discount_item
 *
 * Use this api to delete items of the discount activity
 */
export interface DeleteDiscountItemRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a variation of an item. If there is no variation of this item, you don't need to input this param. Dafault is 0.
   */
  model_id?: number;
  [key: string]: any;
}
/**
 * DeleteDiscountItem_Error sub-interface for DeleteDiscountItem_Response
 */
export interface DeleteDiscountItem_Error {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a variation of an item.
   */
  model_id?: number;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  [key: string]: any;
}
/**
 * DeleteDiscountItem_Response sub-interface for DeleteDiscountItemResponse
 */
export interface DeleteDiscountItem_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * Detail informations about error.
   */
  error_list?: DeleteDiscountItem_Error[];
  [key: string]: any;
}
/**
 * Response data payload for delete_discount_item
 */
export type DeleteDiscountItemResponseData = DeleteDiscountItem_Response;
/**
 * Response payload for delete_discount_item
 *
 * Use this api to delete items of the discount activity
 */
export type DeleteDiscountItemResponse = FetchResponse<DeleteDiscountItemResponseData>;
/**
 * Request parameters for delete_sip_discount
 *
 * Delete SIP Overseas Discounts for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region of the Affiliate shop to be deleted, the API will delete the discount from that region's Affiliate shop.
 */
export interface DeleteSipDiscountRequest {
  /**
   * The region of SIP affiliate shop that needs to delete discount.
   */
  region?: string;
  [key: string]: any;
}
/**
 * DeleteSipDiscount_Response sub-interface for DeleteSipDiscountResponse
 */
export interface DeleteSipDiscount_Response {
  /**
   * The region of SIP affiliate shop that needs to delete discount.
   */
  region?: string;
  [key: string]: any;
}
/**
 * Response data payload for delete_sip_discount
 */
export type DeleteSipDiscountResponseData = DeleteSipDiscount_Response;
/**
 * Response payload for delete_sip_discount
 *
 * Delete SIP Overseas Discounts for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region of the Affiliate shop to be deleted, the API will delete the discount from that region's Affiliate shop.
 */
export type DeleteSipDiscountResponse = FetchResponse<DeleteSipDiscountResponseData>;
/**
 * Request parameters for end_discount
 *
 * Use this api to end shop discount activity
 */
export interface EndDiscountRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  [key: string]: any;
}
/**
 * EndDiscount_Response sub-interface for EndDiscountResponse
 */
export interface EndDiscount_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The time to track the modified time.
   */
  modify_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for end_discount
 */
export type EndDiscountResponseData = EndDiscount_Response;
/**
 * Response payload for end_discount
 *
 * Use this api to end shop discount activity
 */
export type EndDiscountResponse = FetchResponse<EndDiscountResponseData>;
/**
 * Request parameters for get_discount
 *
 * Use this api to get one shop discount activity detail
 */
export interface GetDiscountRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * GetDiscount_Model sub-interface for GetDiscount_Item
 */
export interface GetDiscount_Model {
  /**
   * Shopee's unique identifier for a variation of an item.
   */
  model_id?: number;
  /**
   * Name of the variation that belongs to the same item.
   */
  model_name?: string;
  /**
   * The current stock quantity of the variation.
   */
  model_normal_stock?: number;
  /**
   * The reserved stock of the model.
   */
  model_promotion_stock?: number;
  /**
   * The original price before discount of the variation.
   */
  model_original_price?: number;
  /**
   * The discount price of the variation.
   */
  model_promotion_price?: number;
  /**
   * The original price after tax of model (Only for taxable Shop).
   */
  model_inflated_price_of_original_price?: number;
  /**
   * The discount price after tax of model (Only for taxable Shop).
   */
  model_inflated_price_of_promotion_price?: number;
  /**
   * The local price of model calculated as: Local Price = CB Original Price × Local Adjustment Rate.Reflects the final local price derived from shop-level adjustment rules and is denominated in local currency.
   */
  model_local_price?: number;
  /**
   * The local discount price of model calculated as: Local Discount Price = Local Price × Discount Rate.Reflects the final local seller discount price derived from setting a seller discount and is denominated in local currency.
   */
  model_local_promotion_price?: number;
  /**
   * The local price after tax of model (Only for taxable Shop).
   */
  model_local_price_inflated?: number;
  /**
   * The local discount price after tax of model (Only for taxable Shop).
   */
  model_local_promotion_price_inflated?: number;
  [key: string]: any;
}
/**
 * GetDiscount_Item sub-interface for GetDiscount_Response
 */
export interface GetDiscount_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item in local language.
   */
  item_name?: string;
  /**
   * The current stock quantity of the item.
   */
  normal_stock?: number;
  /**
   * The reserved stock of the item. If the item has no variation, this param is necessary.
   */
  item_promotion_stock?: number;
  /**
   * The original price before discount of the item. If there is variation, this value is 0.
   */
  item_original_price?: number;
  /**
   * The discount price of the item. If there is variation, this value is 0.
   */
  item_promotion_price?: number;
  /**
   * The original price after tax of item (Only for taxable Shop).
   */
  item_inflated_price_of_original_price?: number;
  /**
   * The discount price after tax of item (Only for taxable Shop).
   */
  item_inflated_price_of_promotion_price?: number;
  /**
   * The local price of item calculated as: Local Price = CB Original Price × Local Adjustment Rate.Reflects the final local price derived from shop-level adjustment rules and is denominated in local currency.
   */
  item_local_price?: number;
  /**
   * The local discount price of item calculated as: Local Discount Price = Local Price × Discount Rate.Reflects the final local seller discount price derived from setting a seller discount and is denominated in local currency.
   */
  item_local_promotion_price?: number;
  /**
   * The local price after tax of item (Only for taxable Shop).
   */
  item_local_price_inflated?: number;
  /**
   * The local discount price after tax of item (Only for taxable Shop).
   */
  item_local_promotion_price_inflated?: number;
  /**
   * The models belong to this item.
   */
  model_list?: GetDiscount_Model[];
  /**
   * The max number of this product in the promotion price.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * GetDiscount_Response sub-interface for GetDiscountResponse
 */
export interface GetDiscount_Response {
  /**
   * The status of discount promotion
   */
  status?: string;
  /**
   * Title of the discount.
   */
  discount_name?: string;
  /**
   * The items selected in this discount.
   */
  item_list?: GetDiscount_Item[];
  /**
   * The time when discount activity start.
   */
  start_time?: Date | number;
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The time when discount activity end.
   */
  end_time?: Date | number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_discount
 */
export type GetDiscountResponseData = GetDiscount_Response;
/**
 * Response payload for get_discount
 *
 * Use this api to get one shop discount activity detail
 */
export type GetDiscountResponse = FetchResponse<GetDiscountResponseData>;
/**
 * Request parameters for get_discount_list
 *
 * Use this api to get shop discount activity list
 */
export interface GetDiscountListRequest {
  /**
   * The status filter for retriveing discount list. Available value: upcoming/ongoing/expired/all.
   */
  discount_status?: DiscountStatus | string | number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no?: number;
  /**
   * If many items are available to retrieve, you may need to call GetDiscountsList multiple times to retrieve all the data. Each result set is returned as a page of entries. Use the Pagination filters to control the maximum number of entries (<= 100) to retrieve per page (i.e., per call), the offset number to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.
   */
  page_size?: number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the discount update time). The maximum date range that may be specified with the update_time_from and update_time_to fields is 30 days.
   */
  update_time_from?: Date | number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the discount update time). The maximum date range that may be specified with the update_time_from and update_time_to fields is 30 days.
   */
  update_time_to?: Date | number;
  [key: string]: any;
}
/**
 * GetDiscountList_Discount sub-interface for GetDiscountList_Response
 */
export interface GetDiscountList_Discount {
  /**
   * The status of discount.
   */
  status?: string;
  /**
   * Title of the discount.
   */
  discount_name?: string;
  /**
   * The time when discount activity start.
   */
  start_time?: Date | number;
  /**
   * The time when discount activity end.
   */
  end_time?: Date | number;
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * Source of the discount. 7: live stream, 1: admin, 0: others
   */
  source?: number;
  [key: string]: any;
}
/**
 * GetDiscountList_Response sub-interface for GetDiscountListResponse
 */
export interface GetDiscountList_Response {
  /**
   * The discounts created in this shop.
   */
  discount_list?: GetDiscountList_Discount[];
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_discount_list
 */
export type GetDiscountListResponseData = GetDiscountList_Response;
/**
 * Response payload for get_discount_list
 *
 * Use this api to get shop discount activity list
 */
export type GetDiscountListResponse = FetchResponse<GetDiscountListResponseData>;
/**
 * Request parameters for get_sip_discounts
 *
 * Get SIP Overseas Discounts. Only regions that have upcoming/ongoing discounts will be returned. Please use Primary shop's Shop ID to request, the API will return the list of Affiliate shops under this Primary shop that have set discounts, along with the discount details.
 */
export interface GetSipDiscountsRequest {
  /**
   * The region of SIP affiliate shop that needs to get discount information.If do not pass, will return the discount information set for all SIP affiliate shops.
   */
  region?: string;
  [key: string]: any;
}
/**
 * GetSipDiscounts_Discount sub-interface for GetSipDiscounts_Response
 */
export interface GetSipDiscounts_Discount {
  /**
   * The region of SIP affiliate shop.
   */
  region?: string;
  /**
   * The status of discount for SIP affiliate shop in current region, can be upcoming/ongoing, excluding expired discounts.
   */
  status?: Status | string | number;
  /**
   * The discount rate set for SIP affiliate shop in current region.
   */
  sip_discount_rate?: number;
  /**
   * The start time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  start_time?: Date | number;
  /**
   * The end time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  end_time?: Date | number;
  /**
   * The create time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  create_time?: Date | number;
  /**
   * The latest update time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * GetSipDiscounts_Response sub-interface for GetSipDiscountsResponse
 */
export interface GetSipDiscounts_Response {
  /**
   * List of discounts in each region. Will be filtered based on the "region" request parameter.
   */
  discount_list?: GetSipDiscounts_Discount[];
  [key: string]: any;
}
/**
 * Response data payload for get_sip_discounts
 */
export type GetSipDiscountsResponseData = GetSipDiscounts_Response;
/**
 * Response payload for get_sip_discounts
 *
 * Get SIP Overseas Discounts. Only regions that have upcoming/ongoing discounts will be returned. Please use Primary shop's Shop ID to request, the API will return the list of Affiliate shops under this Primary shop that have set discounts, along with the discount details.
 */
export type GetSipDiscountsResponse = FetchResponse<GetSipDiscountsResponseData>;
/**
 * Request parameters for set_sip_discount
 *
 * Set SIP Overseas Discount for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region and discount rate of the Affiliate shop to be set or update, the API will set or update the discount rate for that region's Affiliate shop.
 */
export interface SetSipDiscountRequest {
  /**
   * The region of SIP affiliate shop that needs to set discount.
   */
  region?: string;
  /**
   * The overall market discount rate that will apply to all items for SIP affiliate shop in current region.
   */
  sip_discount_rate?: number;
  [key: string]: any;
}
/**
 * SetSipDiscount_Response sub-interface for SetSipDiscountResponse
 */
export interface SetSipDiscount_Response {
  /**
   * The region of SIP affiliate shop.
   */
  region?: string;
  /**
   * The status of discount for SIP affiliate shop in current region, can be upcoming/ongoing, excluding expired discounts.
   */
  status?: Status | string | number;
  /**
   * The discount rate set for SIP affiliate shop in current region.
   */
  sip_discount_rate?: number;
  /**
   * The start time of discount for SIP affiliate shop in current region, in UNIX seconds.Note: The start time is 30 minutes after the sellers set up the sip_discount_rate.
   */
  start_time?: Date | number;
  /**
   * The end time of discount for SIP affiliate shop in current region, in UNIX seconds.Note: The end time is 180 days after the start time.
   */
  end_time?: Date | number;
  /**
   * The create time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  create_time?: Date | number;
  /**
   * The latest update time of discount for SIP affiliate shop in current region, in UNIX seconds.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for set_sip_discount
 */
export type SetSipDiscountResponseData = SetSipDiscount_Response;
/**
 * Response payload for set_sip_discount
 *
 * Set SIP Overseas Discount for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region and discount rate of the Affiliate shop to be set or update, the API will set or update the discount rate for that region's Affiliate shop.
 */
export type SetSipDiscountResponse = FetchResponse<SetSipDiscountResponseData>;
/**
 * Request parameters for update_discount
 *
 * Use this api to update one discount information
 */
export interface UpdateDiscountRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * Title of the discount.
   */
  discount_name?: string;
  /**
   * The time when discount activity end. The end time must be 1 hour later than start time.
   */
  end_time?: number;
  /**
   * The time when discount activity start. The new start time must later than original start time.
   */
  start_time?: number;
  [key: string]: any;
}
/**
 * UpdateDiscount_Response sub-interface for UpdateDiscountResponse
 */
export interface UpdateDiscount_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The time when discount is updated.
   */
  modify_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for update_discount
 */
export type UpdateDiscountResponseData = UpdateDiscount_Response;
/**
 * Response payload for update_discount
 *
 * Use this api to update one discount information
 */
export type UpdateDiscountResponse = FetchResponse<UpdateDiscountResponseData>;
/**
 * UpdateDiscountItem_Model sub-interface for UpdateDiscountItem_Item
 */
export interface UpdateDiscountItem_Model {
  /**
   * Shopee's unique identifier for a variation of an item. If there is no variation of this item, you don't need to input this param. Dafault is 0.
   */
  model_id?: number;
  /**
   * The discount price of the item.
   */
  model_promotion_price?: number;
  [key: string]: any;
}
/**
 * UpdateDiscountItem_Item sub-interface for UpdateDiscountItemRequest
 */
export interface UpdateDiscountItem_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The discount price of the item.
   */
  item_promotion_price?: number;
  /**
   * The models selected to this discount.
   */
  model_list?: UpdateDiscountItem_Model[];
  /**
   * The max number of this product in the promotion price.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * Request parameters for update_discount_item
 *
 * Use this api to update items of the discount promotion.
 */
export interface UpdateDiscountItemRequest {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The items selected to this discount. You can update at most 50 items per call.
   */
  item_list?: UpdateDiscountItem_Item[];
  [key: string]: any;
}
/**
 * UpdateDiscountItem_Error sub-interface for UpdateDiscountItem_Response
 */
export interface UpdateDiscountItem_Error {
  /**
   * The items which have something error.
   */
  item_id?: number;
  /**
   * The models which have something error.
   */
  model_id?: number;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  [key: string]: any;
}
/**
 * UpdateDiscountItem_Response sub-interface for UpdateDiscountItemResponse
 */
export interface UpdateDiscountItem_Response {
  /**
   * Shopee's unique identifier for a discount activity.
   */
  discount_id?: number;
  /**
   * The number of items that modify successfully.
   */
  count?: number;
  /**
   * Error list of this discount.
   */
  error_list?: UpdateDiscountItem_Error[];
  [key: string]: any;
}
/**
 * Response data payload for update_discount_item
 */
export type UpdateDiscountItemResponseData = UpdateDiscountItem_Response;
/**
 * Response payload for update_discount_item
 *
 * Use this api to update items of the discount promotion.
 */
export type UpdateDiscountItemResponse = FetchResponse<UpdateDiscountItemResponseData>;
