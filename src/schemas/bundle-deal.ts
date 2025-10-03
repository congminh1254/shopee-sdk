import { BaseResponse } from "./base.js";

/**
 * Bundle deal rule types
 */
export enum BundleDealRuleType {
  /** Fixed price for the bundle */
  FIX_PRICE = 1,
  /** Discount percentage */
  DISCOUNT_PERCENTAGE = 2,
  /** Discount value */
  DISCOUNT_VALUE = 3,
}

/**
 * Bundle deal time status for filtering
 */
export enum BundleDealTimeStatus {
  /** All bundle deals regardless of status */
  ALL = 1,
  /** Bundle deals that have not started yet */
  UPCOMING = 2,
  /** Currently active bundle deals */
  ONGOING = 3,
  /** Bundle deals that have ended */
  EXPIRED = 4,
}

/**
 * Additional tier for multi-tier bundle deals
 */
export interface BundleDealAdditionalTier {
  /** The quantity of items that the buyers need to purchase for additional tier */
  min_amount: number;
  /** The bundle price when the buyers purchase a bundle deal for additional tiers */
  fix_price?: number;
  /** The bundle deal discount amount the buyer can save when purchasing a bundle deal */
  discount_value?: number;
  /** The bundle deal discount% that the buyer can get when buying a bundle deal for additional tiers */
  discount_percentage?: number;
}

/**
 * Bundle deal rule information
 */
export interface BundleDealRule {
  /** The bundle deal rule type */
  rule_type: BundleDealRuleType;
  /** The deducted price when buying a bundle deal */
  discount_value?: number;
  /** The amount of the buyer needs to spend to purchase a bundle deal */
  fix_price?: number;
  /** The discount that the buyer can get when buying a bundle deal */
  discount_percentage?: number;
  /** The quantity of items that need buyer to combine purchased */
  min_amount: number;
  /** Additional tiers for tiered bundle deals (max 2 additional tiers) */
  additional_tiers?: BundleDealAdditionalTier[];
}

/**
 * Bundle deal item in list
 */
export interface BundleDealItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
}

/**
 * Bundle deal information
 */
export interface BundleDealInfo {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
  /** Title of the bundle deal */
  name: string;
  /** The time when bundle deal activity start */
  start_time: number;
  /** The time when bundle deal activity end */
  end_time: number;
  /** Bundle deal rule configuration */
  bundle_deal_rule: BundleDealRule;
  /** Maximum number of bundle deals that can be bought by a buyer */
  purchase_limit: number;
}

/**
 * Failed item in batch operations
 */
export interface BundleDealFailedItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** Error code */
  fail_error: string;
  /** Error message */
  fail_message: string;
}

/**
 * Parameters for adding a new bundle deal
 */
export interface AddBundleDealParams {
  /** The bundle deal rule type */
  rule_type: BundleDealRuleType;
  /** The deducted price when buying a bundle deal (required when rule_type is DISCOUNT_VALUE) */
  discount_value?: number;
  /** The amount of the buyer needs to spend to purchase a bundle deal (required when rule_type is FIX_PRICE) */
  fix_price?: number;
  /** The discount that the buyer can get when buying a bundle deal (required when rule_type is DISCOUNT_PERCENTAGE) */
  discount_percentage?: number;
  /** The quantity of items that need buyer to combine purchased */
  min_amount: number;
  /** The time when bundle deal activity start */
  start_time: number;
  /** The time when bundle deal activity end */
  end_time: number;
  /** Title of the bundle deal */
  name: string;
  /** Maximum number of bundle deals that can be bought by a buyer */
  purchase_limit: number;
  /** Additional tiers for tiered bundle deals (max 2 additional tiers) */
  additional_tiers?: BundleDealAdditionalTier[];
}

/**
 * Parameters for adding items to a bundle deal
 */
export interface AddBundleDealItemParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
  /** List of items to add to the bundle deal */
  item_list: BundleDealItem[];
}

/**
 * Parameters for deleting a bundle deal
 */
export interface DeleteBundleDealParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
}

/**
 * Parameters for deleting items from a bundle deal
 */
export interface DeleteBundleDealItemParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
  /** List of items to delete from the bundle deal */
  item_list: BundleDealItem[];
}

/**
 * Parameters for ending a bundle deal immediately
 */
export interface EndBundleDealParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
}

/**
 * Parameters for getting bundle deal details
 */
export interface GetBundleDealParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
}

/**
 * Parameters for getting bundle deal items
 */
export interface GetBundleDealItemParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
}

/**
 * Parameters for getting a list of bundle deals
 */
export interface GetBundleDealListParams {
  /** Data paging, representing the data size of each page (max: 1000, default: 20) */
  page_size?: number;
  /** The Status of bundle deal */
  time_status?: BundleDealTimeStatus;
  /** Data paging, represents the page number, starting from 1 (default: 1) */
  page_no?: number;
}

/**
 * Parameters for updating a bundle deal
 */
export interface UpdateBundleDealParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
  /** The bundle deal rule type */
  rule_type?: BundleDealRuleType;
  /** The deducted price when buying a bundle deal */
  discount_value?: number;
  /** The amount of the buyer needs to spend to purchase a bundle deal */
  fix_price?: number;
  /** The discount that the buyer can get when buying a bundle deal */
  discount_percentage?: number;
  /** The quantity of items that need buyer to combine purchased */
  min_amount?: number;
  /** The time when bundle deal activity start */
  start_time?: number;
  /** The time when bundle deal activity end */
  end_time?: number;
  /** Title of the bundle deal */
  name?: string;
  /** Maximum number of bundle deals that can be bought by a buyer */
  purchase_limit?: number;
  /** Additional tiers for tiered bundle deals */
  additional_tiers?: BundleDealAdditionalTier[];
}

/**
 * Parameters for updating bundle deal items
 */
export interface UpdateBundleDealItemParams {
  /** Shopee's unique identifier for a bundle deal activity */
  bundle_deal_id: number;
  /** List of items to update in the bundle deal */
  item_list: BundleDealItem[];
}

/**
 * Response for the add bundle deal API
 */
export interface AddBundleDealResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a bundle deal activity */
    bundle_deal_id: number;
  };
}

/**
 * Response for the add bundle deal item API
 */
export interface AddBundleDealItemResponse extends BaseResponse {
  response: {
    /** List of items that failed to be added */
    failed_list: BundleDealFailedItem[];
    /** List of successfully added item IDs */
    success_list: number[];
  };
}

/**
 * Response for the delete bundle deal API
 */
export interface DeleteBundleDealResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a bundle deal activity */
    bundle_deal_id: number;
  };
}

/**
 * Response for the delete bundle deal item API
 */
export interface DeleteBundleDealItemResponse extends BaseResponse {
  response: {
    /** List of items that failed to be deleted */
    failed_list: BundleDealFailedItem[];
    /** List of successfully deleted item IDs */
    success_list: number[];
  };
}

/**
 * Response for the end bundle deal API
 */
export interface EndBundleDealResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a bundle deal activity */
    bundle_deal_id: number;
  };
}

/**
 * Response for the get bundle deal API
 */
export interface GetBundleDealResponse extends BaseResponse {
  response: BundleDealInfo;
}

/**
 * Response for the get bundle deal item API
 */
export interface GetBundleDealItemResponse extends BaseResponse {
  response: {
    /** List of items in the bundle deal */
    item_list: number[];
  };
}

/**
 * Response for the get bundle deal list API
 */
export interface GetBundleDealListResponse extends BaseResponse {
  response: {
    /** The list of bundle deals */
    bundle_deal_list: BundleDealInfo[];
    /** Indicates whether there are more pages of bundle deals to retrieve */
    more: boolean;
  };
}

/**
 * Response for the update bundle deal API
 */
export interface UpdateBundleDealResponse extends BaseResponse {
  response: BundleDealInfo;
}

/**
 * Response for the update bundle deal item API
 */
export interface UpdateBundleDealItemResponse extends BaseResponse {
  response: {
    /** List of items that failed to be updated */
    failed_list: BundleDealFailedItem[];
    /** List of successfully updated item IDs */
    success_list: number[];
  };
}
