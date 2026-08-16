import { FetchResponse } from "./fetch.js";
/**
 * AddBundleDeal_AdditionalTier sub-interface for AddBundleDealRequest
 */
export interface AddBundleDeal_AdditionalTier {
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
  [key: string]: any;
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
  additional_tiers?: AddBundleDeal_AdditionalTier[];
  [key: string]: any;
}
/**
 * AddBundleDeal_Response sub-interface for AddBundleDealResponse
 */
export interface AddBundleDeal_Response {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_bundle_deal
 */
export type AddBundleDealResponseData = AddBundleDeal_Response;
/**
 * Response payload for add_bundle_deal
 *
 * create bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export type AddBundleDealResponse = FetchResponse<AddBundleDealResponseData>;
/**
 * AddBundleDealItem_Item sub-interface for AddBundleDealItemRequest
 */
export interface AddBundleDealItem_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of bundle deal item：enable = 1；disable =0
   */
  status: number;
  [key: string]: any;
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
  item_list: AddBundleDealItem_Item[];
  [key: string]: any;
}
/**
 * AddBundleDealItem_Failed sub-interface for AddBundleDealItem_Response
 */
export interface AddBundleDealItem_Failed {
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
  [key: string]: any;
}
/**
 * AddBundleDealItem_Response sub-interface for AddBundleDealItemResponse
 */
export interface AddBundleDealItem_Response {
  /**
   * Indicate error details.
   */
  failed_list?: AddBundleDealItem_Failed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
  [key: string]: any;
}
/**
 * Response data payload for add_bundle_deal_item
 */
export type AddBundleDealItemResponseData = AddBundleDealItem_Response;
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
  [key: string]: any;
}
/**
 * DeleteBundleDeal_Response sub-interface for DeleteBundleDealResponse
 */
export interface DeleteBundleDeal_Response {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_bundle_deal
 */
export type DeleteBundleDealResponseData = DeleteBundleDeal_Response;
/**
 * Response payload for delete_bundle_deal
 *
 * delete bundle deal
 */
export type DeleteBundleDealResponse = FetchResponse<DeleteBundleDealResponseData>;
/**
 * DeleteBundleDealItem_Item sub-interface for DeleteBundleDealItemRequest
 */
export interface DeleteBundleDealItem_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  [key: string]: any;
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
  item_list: DeleteBundleDealItem_Item[];
  [key: string]: any;
}
/**
 * DeleteBundleDealItem_Failed sub-interface for DeleteBundleDealItem_Response
 */
export interface DeleteBundleDealItem_Failed {
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
  [key: string]: any;
}
/**
 * DeleteBundleDealItem_Response sub-interface for DeleteBundleDealItemResponse
 */
export interface DeleteBundleDealItem_Response {
  /**
   * Indicate error details.
   */
  failed_list?: DeleteBundleDealItem_Failed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
  [key: string]: any;
}
/**
 * Response data payload for delete_bundle_deal_item
 */
export type DeleteBundleDealItemResponseData = DeleteBundleDealItem_Response;
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
  [key: string]: any;
}
/**
 * EndBundleDeal_Response sub-interface for EndBundleDealResponse
 */
export interface EndBundleDeal_Response {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  bundle_deal_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for end_bundle_deal
 */
export type EndBundleDealResponseData = EndBundleDeal_Response;
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
  [key: string]: any;
}
/**
 * GetBundleDeal_AdditionalTier sub-interface for GetBundleDeal_BundleDealRule
 */
export interface GetBundleDeal_AdditionalTier {
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
  [key: string]: any;
}
/**
 * GetBundleDeal_BundleDealRule sub-interface for GetBundleDeal_Response
 */
export interface GetBundleDeal_BundleDealRule {
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
  additional_tiers?: GetBundleDeal_AdditionalTier;
  [key: string]: any;
}
/**
 * GetBundleDeal_Response sub-interface for GetBundleDealResponse
 */
export interface GetBundleDeal_Response {
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
  bundle_deal_rule?: GetBundleDeal_BundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_bundle_deal
 */
export type GetBundleDealResponseData = GetBundleDeal_Response;
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
  [key: string]: any;
}
/**
 * GetBundleDealItem_Item sub-interface for GetBundleDealItem_Response
 */
export interface GetBundleDealItem_Item {
  /**
   * Shopee's unique identifier for a bundle deal activity.
   */
  item_id?: number;
  /**
   * The status of items：enable = 1，disable =0
   */
  status?: number;
  [key: string]: any;
}
/**
 * GetBundleDealItem_Response sub-interface for GetBundleDealItemResponse
 */
export interface GetBundleDealItem_Response {
  /**
   * The list of bundle deal item
   */
  item_list?: GetBundleDealItem_Item[];
  /**
   * The number of  items in this bundle deal
   */
  total_count?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_bundle_deal_item
 */
export type GetBundleDealItemResponseData = GetBundleDealItem_Response;
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
  [key: string]: any;
}
/**
 * GetBundleDealList_AdditionalTier sub-interface for GetBundleDealList_BundleDealRule
 */
export interface GetBundleDealList_AdditionalTier {
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
  [key: string]: any;
}
/**
 * GetBundleDealList_BundleDealRule sub-interface for GetBundleDealList_BundleDeal
 */
export interface GetBundleDealList_BundleDealRule {
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
  additional_tiers?: GetBundleDealList_AdditionalTier[];
  [key: string]: any;
}
/**
 * GetBundleDealList_BundleDeal sub-interface for GetBundleDealList_Response
 */
export interface GetBundleDealList_BundleDeal {
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
  bundle_deal_rule?: GetBundleDealList_BundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * GetBundleDealList_Response sub-interface for GetBundleDealListResponse
 */
export interface GetBundleDealList_Response {
  /**
   * The list of bundle deal id
   */
  bundle_deal_list?: GetBundleDealList_BundleDeal[];
  /**
   * this field shows whether there are more bundle deals in next page or not
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_bundle_deal_list
 */
export type GetBundleDealListResponseData = GetBundleDealList_Response;
/**
 * Response payload for get_bundle_deal_list
 *
 * get bundle deal list
 */
export type GetBundleDealListResponse = FetchResponse<GetBundleDealListResponseData>;
/**
 * UpdateBundleDeal_AdditionalTier sub-interface for UpdateBundleDealRequest
 */
export interface UpdateBundleDeal_AdditionalTier {
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
  [key: string]: any;
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
  additional_tiers?: UpdateBundleDeal_AdditionalTier;
  [key: string]: any;
}
/**
 * UpdateBundleDeal_UpdateBundleDeal_AdditionalTier sub-interface for UpdateBundleDeal_BundleDealRule
 */
export interface UpdateBundleDeal_UpdateBundleDeal_AdditionalTier {
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
  [key: string]: any;
}
/**
 * UpdateBundleDeal_BundleDealRule sub-interface for UpdateBundleDeal_Response
 */
export interface UpdateBundleDeal_BundleDealRule {
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
  additional_tiers?: UpdateBundleDeal_UpdateBundleDeal_AdditionalTier[];
  [key: string]: any;
}
/**
 * UpdateBundleDeal_Response sub-interface for UpdateBundleDealResponse
 */
export interface UpdateBundleDeal_Response {
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
  bundle_deal_rule?: UpdateBundleDeal_BundleDealRule;
  /**
   * Maximum number of bundle deals that can be bought by a buyer.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_bundle_deal
 */
export type UpdateBundleDealResponseData = UpdateBundleDeal_Response;
/**
 * Response payload for update_bundle_deal
 *
 * update bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
 */
export type UpdateBundleDealResponse = FetchResponse<UpdateBundleDealResponseData>;
/**
 * UpdateBundleDealItem_Item sub-interface for UpdateBundleDealItemRequest
 */
export interface UpdateBundleDealItem_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The status of bundle deal item：enable = 1；disable =0
   */
  status: number;
  [key: string]: any;
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
  item_list: UpdateBundleDealItem_Item[];
  [key: string]: any;
}
/**
 * UpdateBundleDealItem_Failed sub-interface for UpdateBundleDealItem_Response
 */
export interface UpdateBundleDealItem_Failed {
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
  [key: string]: any;
}
/**
 * UpdateBundleDealItem_Response sub-interface for UpdateBundleDealItemResponse
 */
export interface UpdateBundleDealItem_Response {
  /**
   * Indicate error details.
   */
  failed_list?: UpdateBundleDealItem_Failed[];
  /**
   * The list of succeed added items
   */
  success_list?: any[];
  [key: string]: any;
}
/**
 * Response data payload for update_bundle_deal_item
 */
export type UpdateBundleDealItemResponseData = UpdateBundleDealItem_Response;
/**
 * Response payload for update_bundle_deal_item
 *
 * update product in bundle deal
 */
export type UpdateBundleDealItemResponse = FetchResponse<UpdateBundleDealItemResponseData>;
