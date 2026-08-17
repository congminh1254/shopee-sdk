// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * AddBundleDealAdditionalTier sub-interface for AddBundleDealRequest
 */
export interface AddBundleDealAdditionalTier {
  /**
   * The quantity of items that the buyers need to purchase for additional tier
   */
  min_amount: number;
  /**
   * The bundle price when the buyers purchase a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 1.
   */
  fix_price?: number;
  /**
   * The bundle deal discount amount the buyer can save when purchasing a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
}
/**
 * Request parameters for add_bundle_deal
 *
 * create bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export interface AddBundleDealRequest {
  /**
   * The bundle deal rule type：FIX_PRICE = 1 ；DISCOUNT_PERCENTAGE = 2； DISCOUNT_VALUE = 3
   */
  rule_type: number;
  /**
   * The deducted price when when buying a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value: number;
  /**
   * The amount of the buyer needs to spend to purchase a bundle deal. Need to input it when the bundle deal rule type is 1
   */
  fix_price: number;
  /**
   * The discount that the buyer can get when buying a bundle deal. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage: number;
  /**
   * The quantity of items that need buyer to combine purchased
   */
  min_amount: number;
  /**
   * The time when bundle deal activity start.The start time must be later than current time.
   */
  start_time: Date | number;
  /**
   * The time when bundle deal activity end. The end time must be 1 hour later than start time.
   */
  end_time: Date | number;
  /**
   * Title of the bundle deal
   */
  name: string;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit: number;
  /**
   * Use to create tiered discount for bundle deals, a max of 2 additional tiers are allowed to create.the rule of multiple tiers needs to follow this faq https://open.shopee.com/faq/53For additional tiers, the fix price, discount_percentage, discount_value should be consistent with tier 1
   */
  additional_tiers?: AddBundleDealAdditionalTier[];
}
/**
 * AddBundleDealResponseData sub-interface for AddBundleDealResponse
 */
export interface AddBundleDealResponseData {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
}
/**
 * Response payload for add_bundle_deal
 *
 * create bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export type AddBundleDealResponse = FetchResponse<AddBundleDealResponseData>;
/**
 * AddBundleDealItemItem sub-interface for AddBundleDealItemRequest
 */
export interface AddBundleDealItemItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of bundle deal item：enable = 1；disable =0
   */
  status: number;
}
/**
 * Request parameters for add_bundle_deal_item
 *
 * add product to bundle deal
 */
export interface AddBundleDealItemRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
  /**
   * The items added in this bundle deal promotion.
   */
  item_list: AddBundleDealItemItem[];
}
/**
 * AddBundleDealItemFailed sub-interface for AddBundleDealItemResponseData
 */
export interface AddBundleDealItemFailed {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * AddBundleDealItemResponseData sub-interface for AddBundleDealItemResponse
 */
export interface AddBundleDealItemResponseData {
  /**
   * Indicate error details.
   */
  failed_list?: AddBundleDealItemFailed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
}
/**
 * Response payload for add_bundle_deal_item
 *
 * add product to bundle deal
 */
export type AddBundleDealItemResponse = FetchResponse<AddBundleDealItemResponseData>;
/**
 * Request parameters for delete_bundle_deal
 *
 * delete bundle deal
 */
export interface DeleteBundleDealRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
}
/**
 * DeleteBundleDealResponseData sub-interface for DeleteBundleDealResponse
 */
export interface DeleteBundleDealResponseData {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
}
/**
 * Response payload for delete_bundle_deal
 *
 * delete bundle deal
 */
export type DeleteBundleDealResponse = FetchResponse<DeleteBundleDealResponseData>;
/**
 * DeleteBundleDealItemItem sub-interface for DeleteBundleDealItemRequest
 */
export interface DeleteBundleDealItemItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
}
/**
 * Request parameters for delete_bundle_deal_item
 *
 * delete product in bundle deal
 */
export interface DeleteBundleDealItemRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
  /**
   * The items deleted in this bundle deal promotion.
   */
  item_list: DeleteBundleDealItemItem[];
}
/**
 * DeleteBundleDealItemFailed sub-interface for DeleteBundleDealItemResponseData
 */
export interface DeleteBundleDealItemFailed {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * DeleteBundleDealItemResponseData sub-interface for DeleteBundleDealItemResponse
 */
export interface DeleteBundleDealItemResponseData {
  /**
   * Indicate error details.
   */
  failed_list?: DeleteBundleDealItemFailed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
}
/**
 * Response payload for delete_bundle_deal_item
 *
 * delete product in bundle deal
 */
export type DeleteBundleDealItemResponse = FetchResponse<DeleteBundleDealItemResponseData>;
/**
 * Request parameters for end_bundle_deal
 *
 * end bundle deal
 */
export interface EndBundleDealRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
}
/**
 * EndBundleDealResponseData sub-interface for EndBundleDealResponse
 */
export interface EndBundleDealResponseData {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
}
/**
 * Response payload for end_bundle_deal
 *
 * end bundle deal
 */
export type EndBundleDealResponse = FetchResponse<EndBundleDealResponseData>;
/**
 * Request parameters for get_bundle_deal
 *
 * get bundle deal detail
 */
export interface GetBundleDealRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
}
/**
 * GetBundleDealAdditionalTier sub-interface for GetBundleDealBundleDealRule
 */
export interface GetBundleDealAdditionalTier {
  /**
   * The quantity of items that the buyers need to purchase for additional tier
   */
  min_amount?: number;
  /**
   * The bundle price when the buyers purchase a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 1.
   */
  fix_price?: number;
  /**
   * The bundle deal discount amount the buyer can save when purchasing a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
}
/**
 * GetBundleDealBundleDealRule sub-interface for GetBundleDealResponseData
 */
export interface GetBundleDealBundleDealRule {
  /**
   * The bundle deal rule type：FIX_PRICE = 1 ；DISCOUNT_PERCENTAGE = 2； DISCOUNT_VALUE = 3
   */
  rule_type?: number;
  /**
   * The deducted price when when buying a bundle deal.Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The amount of the buyer needs to spend to purchase a bundle deal. Need to input it when the bundle deal rule type is 1
   */
  fix_price?: number;
  /**
   * The discount that the buyer can get when buying a bundle deal. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
  /**
   * The quantity of items that need buyer to combine purchased
   */
  min_amount?: number;
  /**
   * Use to create tiered discount for bundle deals, a max of 2 additional tiers are allowed to create bundle deals like buy 2 get 10% off, buy 3 for 15% off, buy 4 for 20% off; For each tier, we will need to set the following 4 values based on bundle deal type +    min_amount = IntAttribute() +    fix_price = IntAttribute() +    discount_percentage = IntAttribute() +    discount_value = IntAttribute()  Note: for additional tiers, the fix price, discount_percentage, discount_value should be consistent with tier 1
   */
  additional_tiers?: GetBundleDealAdditionalTier;
}
/**
 * GetBundleDealResponseData sub-interface for GetBundleDealResponse
 */
export interface GetBundleDealResponseData {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  /**
   * Title of the bundle deal
   */
  name?: string;
  /**
   * The time when bundle deal activity start.
   */
  start_time?: Date | number;
  /**
   * The time when bundle deal activity end.
   */
  end_time?: Date | number;
  bundle_deal_rule?: GetBundleDealBundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
}
/**
 * Response payload for get_bundle_deal
 *
 * get bundle deal detail
 */
export type GetBundleDealResponse = FetchResponse<GetBundleDealResponseData>;
/**
 * Request parameters for get_bundle_deal_item
 *
 * get bundle deal item
 */
export interface GetBundleDealItemRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
}
/**
 * GetBundleDealItemItem sub-interface for GetBundleDealItemResponseData
 */
export interface GetBundleDealItemItem {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  item_id?: number;
  /**
   * The status of items：enable = 1，disable =0
   */
  status?: number;
}
/**
 * GetBundleDealItemResponseData sub-interface for GetBundleDealItemResponse
 */
export interface GetBundleDealItemResponseData {
  /**
   * The list of bundle deal item
   */
  item_list?: GetBundleDealItemItem[];
  /**
   * The number of  items in this bundle deal
   */
  total_count?: number;
}
/**
 * Response payload for get_bundle_deal_item
 *
 * get bundle deal item
 */
export type GetBundleDealItemResponse = FetchResponse<GetBundleDealItemResponseData>;
/**
 * Request parameters for get_bundle_deal_list
 *
 * get bundle deal list
 */
export interface GetBundleDealListRequest {
  /**
   * Data paging, representing the data size of each page, the maximum is 1000, the default is 20
   */
  page_size?: number;
  /**
   * The Status of bundle deal，all=1；upcoming=2；ongoing=3，expired=4 , the default is 1
   */
  time_status?: number;
  /**
   * Data paging, represents the page number, starting from 1, the default is 1
   */
  page_no?: number;
}
/**
 * GetBundleDealListAdditionalTier sub-interface for GetBundleDealListBundleDealRule
 */
export interface GetBundleDealListAdditionalTier {
  /**
   * The quantity of items that the buyers need to purchase for additional tier
   */
  min_amount?: number;
  /**
   * The bundle price when the buyers purchase a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 1.
   */
  fix_price?: number;
  /**
   * The bundle deal discount amount the buyer can save when purchasing a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
}
/**
 * GetBundleDealListBundleDealRule sub-interface for GetBundleDealListBundleDeal
 */
export interface GetBundleDealListBundleDealRule {
  /**
   * The bundle deal rule type：FIX_PRICE = 1 ；DISCOUNT_PERCENTAGE = 2； DISCOUNT_VALUE = 3
   */
  rule_type?: number;
  /**
   * The deducted price when when buying a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The amount of the buyer needs to spend to purchase a bundle deal. Need to input it when the bundle deal rule type is 1
   */
  fix_price?: number;
  /**
   * The discount that the buyer can get when buying a bundle deal. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
  /**
   * The quantity of items that need buyer to combine purchased
   */
  min_amount?: number;
  /**
   * Use to create tiered discount for bundle deals, a max of 2 additional tiers are allowed to create bundle deals like buy 2 get 10% off, buy 3 for 15% off, buy 4 for 20% off; For each tier, we will need to set the following 4 values based on bundle deal type +    min_amount = IntAttribute() +    fix_price = IntAttribute() +    discount_percentage = IntAttribute() +    discount_value = IntAttribute() Note: for additional tiers, the fix price, discount_percentage, discount_value should be consistent with tier 1
   */
  additional_tiers?: GetBundleDealListAdditionalTier[];
}
/**
 * GetBundleDealListBundleDeal sub-interface for GetBundleDealListResponseData
 */
export interface GetBundleDealListBundleDeal {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  /**
   * Title of the bundle deal
   */
  name?: string;
  /**
   * The time when bundle deal activity start.
   */
  start_time?: Date | number;
  /**
   * The time when bundle deal activity end.
   */
  end_time?: Date | number;
  bundle_deal_rule?: GetBundleDealListBundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
}
/**
 * GetBundleDealListResponseData sub-interface for GetBundleDealListResponse
 */
export interface GetBundleDealListResponseData {
  /**
   * The list of bundle deal id
   */
  bundle_deal_list?: GetBundleDealListBundleDeal[];
  /**
   * this field shows whether there are more bundle deals in next page or not
   */
  more?: boolean;
}
/**
 * Response payload for get_bundle_deal_list
 *
 * get bundle deal list
 */
export type GetBundleDealListResponse = FetchResponse<GetBundleDealListResponseData>;
/**
 * UpdateBundleDealAdditionalTier sub-interface for UpdateBundleDealRequest
 */
export interface UpdateBundleDealAdditionalTier {
  /**
   * The quantity of items that the buyers need to purchase for additional tier
   */
  min_amount: number;
  /**
   * The bundle price when the buyers purchase a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 1.
   */
  fix_price?: number;
  /**
   * The bundle deal discount amount the buyer can save when purchasing a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
}
/**
 * Request parameters for update_bundle_deal
 *
 * update bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export interface UpdateBundleDealRequest {
  /**
   * The bundle deal rule type：FIX_PRICE = 1 ；DISCOUNT_PERCENTAGE = 2； DISCOUNT_VALUE = 3
   */
  rule_type?: number;
  /**
   * The deducted price when when buying a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The amount of the buyer needs to spend to purchase a bundle deal.Need to input it when the bundle deal rule type is 1
   */
  fix_price?: number;
  /**
   * The discount that the buyer can get when buying a bundle deal. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
  /**
   * The quantity of items that need buyer to combine purchased
   */
  min_amount?: number;
  /**
   * The time when bundle deal activity start.The start time must be later than current time.
   */
  start_time?: Date | number;
  /**
   * The time when bundle deal activity end. The end time must be later than current time.
   */
  end_time?: Date | number;
  /**
   * Title of the bundle deal
   */
  name?: string;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
  /**
   * Use to create tiered discount for bundle deals, a max of 2 additional tiers are allowed to create bundle deals like buy 2 get 10% off, buy 3 for 15% off, buy 4 for 20% off; For each tier, we will need to set the following 4 values based on bundle deal type +    min_amount = IntAttribute() +    fix_price = IntAttribute() +    discount_percentage = IntAttribute() +    discount_value = IntAttribute()Note: for additional tiers, the fix price, discount_percentage, discount_value should be consistent with tier 1
   */
  additional_tiers?: UpdateBundleDealAdditionalTier;
}
/**
 * UpdateBundleDeal_UpdateBundleDealAdditionalTier sub-interface for UpdateBundleDealBundleDealRule
 */
export interface UpdateBundleDeal_UpdateBundleDealAdditionalTier {
  /**
   * The quantity of items that the buyers need to purchase for additional tier
   */
  min_amount?: number;
  /**
   * The bundle price when the buyers purchase a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 1.
   */
  fix_price?: number;
  /**
   * The bundle deal discount amount the buyer can save when purchasing a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
}
/**
 * UpdateBundleDealBundleDealRule sub-interface for UpdateBundleDealResponseData
 */
export interface UpdateBundleDealBundleDealRule {
  /**
   * The bundle deal rule type：FIX_PRICE = 1 ；DISCOUNT_PERCENTAGE = 2； DISCOUNT_VALUE = 3
   */
  rule_type?: number;
  /**
   * The deducted price when when buying a bundle deal. Need to input it when the bundle deal rule type is 3
   */
  discount_value?: number;
  /**
   * The amount of the buyer needs to spend to purchase a bundle deal. Need to input it when the bundle deal rule type is 1
   */
  fix_price?: number;
  /**
   * The discount that the buyer can get when buying a bundle deal. Need to input it when the bundle deal rule type is 2
   */
  discount_percentage?: number;
  /**
   * The quantity of items that need buyer to combine purchased
   */
  min_amount?: number;
  /**
   * Use to create tiered discount for bundle deals, a max of 2 additional tiers are allowed to create bundle deals like buy 2 get 10% off, buy 3 for 15% off, buy 4 for 20% off; For each tier, we will need to set the following 4 values based on bundle deal type +    min_amount = IntAttribute() +    fix_price = IntAttribute() +    discount_percentage = IntAttribute() +    discount_value = IntAttribute()Note: for additional tiers, the fix price, discount_percentage, discount_value should be consistent with tier 1
   */
  additional_tiers?: UpdateBundleDeal_UpdateBundleDealAdditionalTier[];
}
/**
 * UpdateBundleDealResponseData sub-interface for UpdateBundleDealResponse
 */
export interface UpdateBundleDealResponseData {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  /**
   * Title of the bundle deal
   */
  name?: string;
  /**
   * The time when bundle deal activity start.
   */
  start_time?: Date | number;
  /**
   * The time when bundle deal activity end.
   */
  end_time?: Date | number;
  bundle_deal_rule?: UpdateBundleDealBundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
}
/**
 * Response payload for update_bundle_deal
 *
 * update bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export type UpdateBundleDealResponse = FetchResponse<UpdateBundleDealResponseData>;
/**
 * UpdateBundleDealItemItem sub-interface for UpdateBundleDealItemRequest
 */
export interface UpdateBundleDealItemItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of bundle deal item：enable = 1；disable =0
   */
  status: number;
}
/**
 * Request parameters for update_bundle_deal_item
 *
 * update product in bundle deal
 */
export interface UpdateBundleDealItemRequest {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id: number;
  /**
   * The items added in this bundle deal promotion.
   */
  item_list: UpdateBundleDealItemItem[];
}
/**
 * UpdateBundleDealItemFailed sub-interface for UpdateBundleDealItemResponseData
 */
export interface UpdateBundleDealItemFailed {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * UpdateBundleDealItemResponseData sub-interface for UpdateBundleDealItemResponse
 */
export interface UpdateBundleDealItemResponseData {
  /**
   * Indicate error details.
   */
  failed_list?: UpdateBundleDealItemFailed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
}
/**
 * Response payload for update_bundle_deal_item
 *
 * update product in bundle deal
 */
export type UpdateBundleDealItemResponse = FetchResponse<UpdateBundleDealItemResponseData>;
