import { FetchResponse } from "./fetch.js";
/**
 * AddShopFlashSaleItems_Model sub-interface for AddShopFlashSaleItems_Item
 */
export interface AddShopFlashSaleItems_Model {
  /**
   * If the item has variation, this param is necessary.
   */
  model_id?: number;
  /**
   * promotion price without tax
   */
  input_promo_price?: number;
  /**
   * min=1, Campaign Stock, Campaign stock can only be reserved from either Shopee stock or Seller stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * AddShopFlashSaleItems_Item sub-interface for AddShopFlashSaleItemsRequest
 */
export interface AddShopFlashSaleItems_Item {
  item_id?: number;
  /**
   * min=0, 0 means no limit
   */
  purchase_limit?: number;
  /**
   * If the item has variation, this param is necessary.
   */
  models?: AddShopFlashSaleItems_Model[];
  /**
   * promotion price without tax of the item. If the item has no variation, this param is necessary, otherwise don't use this field
   */
  item_input_promo_price?: number;
  /**
   * min=1, The campaign stock of the item. If the item has no variation, this param is necessary, otherwise don't use this field
   */
  item_stock?: number;
  [key: string]: any;
}
/**
 * Request parameters for add_shop_flash_sale_items
 *
 * add shop flash sale item
 */
export interface AddShopFlashSaleItemsRequest {
  flash_sale_id?: number;
  items?: AddShopFlashSaleItems_Item[];
  [key: string]: any;
}
/**
 * AddShopFlashSaleItems_UnqualifiedCondition sub-interface for AddShopFlashSaleItems_FailedItem
 */
export interface AddShopFlashSaleItems_UnqualifiedCondition {
  /**
   * error code for unqualified item
   */
  unqualified_code?: number;
  /**
   * error message for unqualified item
   */
  unqualified_msg?: string;
  [key: string]: any;
}
/**
 * AddShopFlashSaleItems_FailedItem sub-interface for AddShopFlashSaleItems_Response
 */
export interface AddShopFlashSaleItems_FailedItem {
  item_id?: number;
  /**
   * If the item has no variation, this field will be empty
   */
  model_id?: number;
  err_code?: number;
  /**
   * the reason why the model cannot be added
   */
  err_msg?: string;
  /**
   * if model or item doesn't meet a criteria, will show the detail in this field
   */
  unqualified_conditions?: AddShopFlashSaleItems_UnqualifiedCondition[];
  [key: string]: any;
}
/**
 * AddShopFlashSaleItems_Response sub-interface for AddShopFlashSaleItemsResponse
 */
export interface AddShopFlashSaleItems_Response {
  failed_items?: AddShopFlashSaleItems_FailedItem[];
  [key: string]: any;
}
/**
 * Response data payload for add_shop_flash_sale_items
 */
export type AddShopFlashSaleItemsResponseData = AddShopFlashSaleItems_Response;
/**
 * Response payload for add_shop_flash_sale_items
 *
 * add shop flash sale item
 */
export type AddShopFlashSaleItemsResponse = FetchResponse<AddShopFlashSaleItemsResponseData>;
/**
 * Request parameters for create_shop_flash_sale
 *
 * creat shop flash sale
 */
export interface CreateShopFlashSaleRequest {
  /**
   * can get it from v2.shop_flash_sale.get_time_slot_id API, and you can only use the timeslot which start_time > now
   */
  timeslot_id?: number;
  [key: string]: any;
}
/**
 * CreateShopFlashSale_Response sub-interface for CreateShopFlashSaleResponse
 */
export interface CreateShopFlashSale_Response {
  timeslot_id?: number;
  flash_sale_id?: number;
  /**
   * the status of shop flash sale0: deleted1: enabled2: disabled3: system_rejected
   */
  status?: number;
  [key: string]: any;
}
/**
 * Response data payload for create_shop_flash_sale
 */
export type CreateShopFlashSaleResponseData = CreateShopFlashSale_Response;
/**
 * Response payload for create_shop_flash_sale
 *
 * creat shop flash sale
 */
export type CreateShopFlashSaleResponse = FetchResponse<CreateShopFlashSaleResponseData>;
/**
 * Request parameters for delete_shop_flash_sale
 *
 * delete shop flash sale
 */
export interface DeleteShopFlashSaleRequest {
  /**
   * cannot delete ongoing and expired shop flash sale
   */
  flash_sale_id?: number;
  [key: string]: any;
}
/**
 * DeleteShopFlashSale_Response sub-interface for DeleteShopFlashSaleResponse
 */
export interface DeleteShopFlashSale_Response {
  timeslot_id?: number;
  flash_sale_id?: number;
  /**
   * the status of shop flash sale0: deleted1: enabled2: disabled3: system_rejected
   */
  status?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_shop_flash_sale
 */
export type DeleteShopFlashSaleResponseData = DeleteShopFlashSale_Response;
/**
 * Response payload for delete_shop_flash_sale
 *
 * delete shop flash sale
 */
export type DeleteShopFlashSaleResponse = FetchResponse<DeleteShopFlashSaleResponseData>;
/**
 * Request parameters for delete_shop_flash_sale_items
 *
 * delete shop flash sale items
 */
export interface DeleteShopFlashSaleItemsRequest {
  flash_sale_id?: number;
  /**
   * if you delete a item, will delete all models of the item
   */
  item_ids?: number[];
  [key: string]: any;
}
/**
 * DeleteShopFlashSaleItems_UnqualifiedCondition sub-interface for DeleteShopFlashSaleItems_FailedItem
 */
export interface DeleteShopFlashSaleItems_UnqualifiedCondition {
  unqualified_code?: number;
  unqualified_msg?: string;
  [key: string]: any;
}
/**
 * DeleteShopFlashSaleItems_FailedItem sub-interface for DeleteShopFlashSaleItems_Response
 */
export interface DeleteShopFlashSaleItems_FailedItem {
  item_id?: number;
  /**
   * If the item has no variation, this field will be empty
   */
  model_id?: number;
  err_code?: number;
  /**
   * the reason why the model cannot be added
   */
  err_msg?: string;
  /**
   * if the model doesn't meet a criteria, will show the detail in this field
   */
  unqualified_conditions?: DeleteShopFlashSaleItems_UnqualifiedCondition[];
  [key: string]: any;
}
/**
 * DeleteShopFlashSaleItems_Response sub-interface for DeleteShopFlashSaleItemsResponse
 */
export interface DeleteShopFlashSaleItems_Response {
  failed_items?: DeleteShopFlashSaleItems_FailedItem[];
  [key: string]: any;
}
/**
 * Response data payload for delete_shop_flash_sale_items
 */
export type DeleteShopFlashSaleItemsResponseData = DeleteShopFlashSaleItems_Response;
/**
 * Response payload for delete_shop_flash_sale_items
 *
 * delete shop flash sale items
 */
export type DeleteShopFlashSaleItemsResponse = FetchResponse<DeleteShopFlashSaleItemsResponseData>;
/**
 * Request parameters for get_item_criteria
 *
 * get shop flash sale item criteria
 */
export type GetItemCriteriaRequest = Record<string, never>;
/**
 * GetItemCriteria_Criteria sub-interface for GetItemCriteria_Response
 */
export interface GetItemCriteria_Criteria {
  criteria_id?: number;
  /**
   * Product Rating(0.0-5.0), -1 means no limit
   */
  min_product_rating?: number;
  /**
   * Likes(s), -1 means no limit
   */
  min_likes?: number;
  /**
   * Pre-Order(s)
   */
  must_not_pre_order?: boolean;
  /**
   * Orders in the last 30 day(s), -1 means no limit
   */
  min_order_total?: number;
  /**
   * Days to Ship, -1 means no limit
   */
  max_days_to_ship?: number;
  /**
   * Repetition Control (Same Product cannot Join ISFS within N Days), -1 means no limit
   */
  min_repetition_day?: number;
  /**
   * Promo Stock, -1 means no limit
   */
  min_promo_stock?: number;
  /**
   * Promo Stock, -1 means no limit
   */
  max_promo_stock?: number;
  /**
   * Discount Limit, 10 means 10%, -1 means no limit
   */
  min_discount?: number;
  /**
   * Discount Limit, 100 means 100%, -1 means no limit
   */
  max_discount?: number;
  /**
   * Discount Limit, -1 means no limit, real min discount price = min_discount_price / 100000
   */
  min_discount_price?: number;
  /**
   * Discount Limit, -1 means no limit, real max discount price = max_discount_price / 100000
   */
  max_discount_price?: number;
  /**
   * lower than lowest price in last 7 days (exclude Shopee Flash Deals)
   */
  need_lowest_price?: boolean;
  [key: string]: any;
}
/**
 * GetItemCriteria_Category sub-interface for GetItemCriteria_PairId
 */
export interface GetItemCriteria_Category {
  /**
   * o means this is All category
   */
  category_id?: number;
  /**
   * category name
   */
  name?: string;
  /**
   * the parent category id, 0 means this category is L1 category
   */
  parent_id?: number;
  [key: string]: any;
}
/**
 * GetItemCriteria_PairId sub-interface for GetItemCriteria_Response
 */
export interface GetItemCriteria_PairId {
  criteria_id?: number;
  /**
   * these are the categories that the shop has items, and the criteria will apply to these categories
   */
  category_list?: GetItemCriteria_Category[];
  [key: string]: any;
}
/**
 * GetItemCriteria_Response sub-interface for GetItemCriteriaResponse
 */
export interface GetItemCriteria_Response {
  /**
   * criteria detail
   */
  criteria?: GetItemCriteria_Criteria[];
  /**
   * the mapping relationship between criteria and category
   */
  pair_ids?: GetItemCriteria_PairId[];
  /**
   * Due to regulations, the promotion of some products in these categories are prohibited in this region
   */
  overlap_block_category_ids?: number[];
  [key: string]: any;
}
/**
 * Response data payload for get_item_criteria
 */
export type GetItemCriteriaResponseData = GetItemCriteria_Response;
/**
 * Response payload for get_item_criteria
 *
 * get shop flash sale item criteria
 */
export type GetItemCriteriaResponse = FetchResponse<GetItemCriteriaResponseData>;
/**
 * Request parameters for get_shop_flash_sale
 *
 * get shop flash sale detail
 */
export interface GetShopFlashSaleRequest {
  flash_sale_id?: number;
  [key: string]: any;
}
/**
 * GetShopFlashSale_Response sub-interface for GetShopFlashSaleResponse
 */
export interface GetShopFlashSale_Response {
  timeslot_id?: number;
  flash_sale_id?: number;
  /**
   * the status of shop flash sale0: deleted1: enabled2: disabled
   */
  status?: number;
  /**
   * the start time of shop flash sale
   */
  start_time?: Date | number;
  /**
   * the end time of shop flash sale
   */
  end_time?: Date | number;
  /**
   * the number of enabled items in shop flash sale
   */
  enabled_item_count?: number;
  /**
   * the number of items in shop flash sale
   */
  item_count?: number;
  /**
   * the state of shop flash sale1: upcoming2: ongoing3: expired
   */
  type?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_flash_sale
 */
export type GetShopFlashSaleResponseData = GetShopFlashSale_Response;
/**
 * Response payload for get_shop_flash_sale
 *
 * get shop flash sale detail
 */
export type GetShopFlashSaleResponse = FetchResponse<GetShopFlashSaleResponseData>;
/**
 * Request parameters for get_shop_flash_sale_items
 *
 * get shop flash sale items and item detail
 */
export interface GetShopFlashSaleItemsRequest {
  flash_sale_id?: number;
  /**
   * min=0,max=1000
   */
  offset?: number;
  /**
   * min=1,max=100
   */
  limit?: number;
  [key: string]: any;
}
/**
 * GetShopFlashSaleItems_UnqualifiedCondition sub-interface for GetShopFlashSaleItems_Model
 */
export interface GetShopFlashSaleItems_UnqualifiedCondition {
  unqualified_code?: number;
  unqualified_msg?: string;
  [key: string]: any;
}
/**
 * GetShopFlashSaleItems_Model sub-interface for GetShopFlashSaleItems_Response
 */
export interface GetShopFlashSaleItems_Model {
  item_id?: number;
  model_id?: number;
  model_name?: string;
  /**
   * the status of model in shop flash sale0: disable1: enable2: delete4: system_rejected, the model is rejected by system5: manual_rejected, the model is rejected manually
   */
  status?: number;
  original_price?: number;
  /**
   * promotion price without tax
   */
  input_promotion_price?: number;
  /**
   * promotion price with tax
   */
  promotion_price_with_tax?: number;
  /**
   * 0 means NO LIMIT
   */
  purchase_limit?: number;
  campaign_stock?: number;
  /**
   * Active inventory
   */
  stock?: number;
  /**
   * if the status is 4 or 5, this field will show the reason why this model was rejected
   */
  reject_reason?: string;
  /**
   * if the model doesn't meet a criteria, will show the detail in this field
   */
  unqualified_conditions?: GetShopFlashSaleItems_UnqualifiedCondition;
  [key: string]: any;
}
/**
 * GetShopFlashSaleItems_ItemInfo sub-interface for GetShopFlashSaleItems_Response
 */
export interface GetShopFlashSaleItems_ItemInfo {
  item_id?: number;
  item_name?: string;
  /**
   * item status0: Deleted1: Normal2: reviewing3: banned4: invalid5: invalid hide6: offensive hide7: auditing8: normal unlist
   */
  status?: number;
  /**
   * item image
   */
  image?: string;
  /**
   * the status of item in shop flash sale. If the item has variation, this field will be empty0: disable1: enable2: delete4: system_rejected, the item is rejected by system5: manual_rejected, the item is rejected manually
   */
  item_status?: number;
  /**
   * original price of item, if the item has variation, this field will be empty
   */
  original_price?: number;
  /**
   * promotion price without tax of item, if the item has variation, this field will be empty
   */
  input_promotion_price?: number;
  /**
   * promotion price with tax of item, if the item has no variation, this field will has value
   */
  promotion_price_with_tax?: number;
  /**
   * 0 means NO LIMITpurchase limit of item, if the item has variation, this field will be empty
   */
  purchase_limit?: number;
  /**
   * campaign stock of item, if the item has no variation, this field will has value
   */
  campaign_stock?: number;
  /**
   * Active inventory of item, if the item has no variation, this field will has value
   */
  stock?: number;
  /**
   * if the item_status is 4 or 5, this field will show the reason why this item was rejectedif the item has variation, this field will be empty
   */
  reject_reason?: string;
  /**
   * if the item doesn't meet a criteria, will show the detail in this fieldif the item has variation, this field will be empty
   */
  unqualified_conditions?: GetShopFlashSaleItems_UnqualifiedCondition;
  [key: string]: any;
}
/**
 * GetShopFlashSaleItems_Response sub-interface for GetShopFlashSaleItemsResponse
 */
export interface GetShopFlashSaleItems_Response {
  total_count?: number;
  /**
   * If the item has variation, the infomation of model will be in this field
   */
  models?: GetShopFlashSaleItems_Model[];
  item_info?: GetShopFlashSaleItems_ItemInfo[];
  [key: string]: any;
}
/**
 * Response data payload for get_shop_flash_sale_items
 */
export type GetShopFlashSaleItemsResponseData = GetShopFlashSaleItems_Response;
/**
 * Response payload for get_shop_flash_sale_items
 *
 * get shop flash sale items and item detail
 */
export type GetShopFlashSaleItemsResponse = FetchResponse<GetShopFlashSaleItemsResponseData>;
/**
 * Request parameters for get_shop_flash_sale_list
 *
 * get shop flash sale list
 */
export interface GetShopFlashSaleListRequest {
  /**
   * you can use this filed to search different state of shop flash sale0: all state1: upcoming state2: ongoing state3: expired state
   */
  type?: number;
  /**
   * you should use start_time and end_time together, and start_time shoule be < end_time
   */
  start_time?: Date | number;
  /**
   * you should use start_time and end_time together, and start_time shoule be < end_time
   */
  end_time?: Date | number;
  /**
   * min=0,max=1000
   */
  offset?: number;
  /**
   * min=1,max=100
   */
  limit?: number;
  [key: string]: any;
}
/**
 * GetShopFlashSaleList_Response sub-interface for GetShopFlashSaleListResponse
 */
export interface GetShopFlashSaleList_Response {
  /**
   * the number of shop flash sale that the shop has
   */
  total_count?: number;
  [key: string]: any;
}
/**
 * GetShopFlashSaleList_FlashSale sub-interface for GetShopFlashSaleListResponse
 */
export interface GetShopFlashSaleList_FlashSale {
  timeslot_id?: number;
  flash_sale_id?: number;
  /**
   * the status of shop flash sale0: deleted1: enabled2: disabled3: system_rejected, you cannot edit the shop flash sale in 'system_rejected' status
   */
  status?: number;
  /**
   * the start time of shop flash sale
   */
  start_time?: Date | number;
  /**
   * the end time of shop flash sale
   */
  end_time?: Date | number;
  /**
   * the number of enabled items in shop flash sale
   */
  enabled_item_count?: number;
  /**
   * the number of items in shop flash sale
   */
  item_count?: number;
  /**
   * the state of shop flash sale1: upcoming2: ongoing3: expired
   */
  type?: number;
  /**
   * No. of Reminders Set
   */
  remindme_count?: number;
  /**
   * No. of Product Clicks
   */
  click_count?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_flash_sale_list
 */
export type GetShopFlashSaleListResponseData = GetShopFlashSaleList_Response;
/**
 * Response payload for get_shop_flash_sale_list
 *
 * get shop flash sale list
 */
export type GetShopFlashSaleListResponse = FetchResponse<GetShopFlashSaleListResponseData>;
/**
 * Request parameters for get_time_slot_id
 *
 * get time slot id
 */
export interface GetTimeSlotIdRequest {
  /**
   * min = now, max=2145887999, should be < end_time
   */
  start_time?: Date | number;
  /**
   * should be > start_time, max=2145887999
   */
  end_time?: Date | number;
  [key: string]: any;
}
/**
 * GetTimeSlotId_Response sub-interface for GetTimeSlotIdResponse
 */
export interface GetTimeSlotId_Response {
  timeslot_id?: number;
  /**
   * the start time of time slot
   */
  start_time?: Date | number;
  /**
   * the end time of time slot
   */
  end_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for get_time_slot_id
 */
export type GetTimeSlotIdResponseData = GetTimeSlotId_Response[];
/**
 * Response payload for get_time_slot_id
 *
 * get time slot id
 */
export type GetTimeSlotIdResponse = FetchResponse<GetTimeSlotIdResponseData>;
/**
 * Request parameters for update_shop_flash_sale
 *
 * edit shop flash sale(enable, disable)
 */
export interface UpdateShopFlashSaleRequest {
  flash_sale_id?: number;
  /**
   * the status of shop flash sale you want to set, you cannot edit the shop flash sale in 'system_rejected' statusDisabling this Flash Sale will disable all items in this session1: enable2: disbaled
   */
  status?: number;
  [key: string]: any;
}
/**
 * UpdateShopFlashSale_Response sub-interface for UpdateShopFlashSaleResponse
 */
export interface UpdateShopFlashSale_Response {
  timeslot_id?: number;
  flash_sale_id?: number;
  /**
   * the status of shop flash sale0: deleted1: enabled2: disabled3: system_rejected, you cannot edit the shop flash sale in 'system_rejected' status
   */
  status?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_shop_flash_sale
 */
export type UpdateShopFlashSaleResponseData = UpdateShopFlashSale_Response;
/**
 * Response payload for update_shop_flash_sale
 *
 * edit shop flash sale(enable, disable)
 */
export type UpdateShopFlashSaleResponse = FetchResponse<UpdateShopFlashSaleResponseData>;
/**
 * UpdateShopFlashSaleItems_Model sub-interface for UpdateShopFlashSaleItems_Item
 */
export interface UpdateShopFlashSaleItems_Model {
  /**
   * If the item has variation, this param is necessary.
   */
  model_id?: number;
  /**
   * you can use this field to set the status of model0: disable1: enable
   */
  status?: number;
  /**
   * promotion price without taxif the model is enabled(status  = 1) now, you can't set this field, you can only disable the modelif the model is disabled(status  = 0) now and you want to set this field, you should also set status to 1
   */
  input_promo_price?: number;
  /**
   * min=1, Campaign Stock, Campaign stock can only be reserved from either Shopee stock or Seller stockif the model is enabled(status  = 1) now, you can't set this field, you can only disable the modelif the model is disabled(status  = 0) now and you want to set this field, you should also set status to 1
   */
  stock?: number;
  [key: string]: any;
}
/**
 * UpdateShopFlashSaleItems_Item sub-interface for UpdateShopFlashSaleItemsRequest
 */
export interface UpdateShopFlashSaleItems_Item {
  item_id?: number;
  /**
   * min=0, 0 means no limitif the item is in enabled status or the item has models in enabled status, you can't set this field
   */
  purchase_limit?: number;
  /**
   * If the item has variation, this param is necessary, otherwise please don't use this field
   */
  models?: UpdateShopFlashSaleItems_Model[];
  /**
   * The status of the item. If the item has no variation, this param is necessary, otherwise don't use this fieldyou can use this field to set the status of item0: disable1: enable
   */
  item_status?: number;
  /**
   * The promotion price of the item. If the item has no variation, you can use this field to update the promotion price of the item, otherwise don't use this fieldif the item is enabled(item_status  = 1) now, you can't set this field, you can only disable the itemif the item is disabled(item_status  = 0) now and you want to set this field, you should also set item_status to 1
   */
  item_input_promo_price?: number;
  /**
   * min=1, The campaign stock of the item. If the item has no variation, you can use this field to update the campaign stock of the item, otherwise don't use this fieldif the item is enabled(item_status  = 1) now, you can't set this field, you can only disable the itemif the item is disabled(item_status  = 0) now and you want to set this field, you should also set item_status to 1
   */
  item_stock?: number;
  [key: string]: any;
}
/**
 * Request parameters for update_shop_flash_sale_items
 *
 * edit shop flash sale item, you can only edit the models in disbaled or enabled status
 */
export interface UpdateShopFlashSaleItemsRequest {
  flash_sale_id?: number;
  items?: UpdateShopFlashSaleItems_Item[];
  [key: string]: any;
}
/**
 * UpdateShopFlashSaleItems_UnqualifiedCondition sub-interface for UpdateShopFlashSaleItems_FailedItem
 */
export interface UpdateShopFlashSaleItems_UnqualifiedCondition {
  unqualified_code?: number;
  unqualified_msg?: string;
  [key: string]: any;
}
/**
 * UpdateShopFlashSaleItems_FailedItem sub-interface for UpdateShopFlashSaleItems_Response
 */
export interface UpdateShopFlashSaleItems_FailedItem {
  item_id?: number;
  /**
   * If the item has no variation, this field will be empty
   */
  model_id?: number;
  err_code?: number;
  /**
   * the reason why the model cannot be added
   */
  err_msg?: string;
  /**
   * if the model doesn't meet a criteria, will show the detail in this field
   */
  unqualified_conditions?: UpdateShopFlashSaleItems_UnqualifiedCondition[];
  [key: string]: any;
}
/**
 * UpdateShopFlashSaleItems_Response sub-interface for UpdateShopFlashSaleItemsResponse
 */
export interface UpdateShopFlashSaleItems_Response {
  failed_items?: UpdateShopFlashSaleItems_FailedItem[];
  [key: string]: any;
}
/**
 * Response data payload for update_shop_flash_sale_items
 */
export type UpdateShopFlashSaleItemsResponseData = UpdateShopFlashSaleItems_Response;
/**
 * Response payload for update_shop_flash_sale_items
 *
 * edit shop flash sale item, you can only edit the models in disbaled or enabled status
 */
export type UpdateShopFlashSaleItemsResponse = FetchResponse<UpdateShopFlashSaleItemsResponseData>;
