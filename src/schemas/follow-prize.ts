import { BaseResponse } from "./base.js";

/**
 * Status of follow prizes for filtering in follow prize list query
 */
export enum FollowPrizeStatus {
  /** All follow prizes regardless of status */
  ALL = "all",
  /** Follow prizes that have not started yet */
  UPCOMING = "upcoming",
  /** Currently active follow prizes */
  ONGOING = "ongoing",
  /** Follow prizes that have ended */
  EXPIRED = "expired",
}

/**
 * Reward type for follow prize
 */
export enum FollowPrizeRewardType {
  /** Discount - fix amount */
  DISCOUNT_FIX_AMOUNT = 1,
  /** Discount - by percentage */
  DISCOUNT_BY_PERCENTAGE = 2,
  /** Coin cash back */
  COIN_CASH_BACK = 3,
}

/**
 * Parameters for adding a new follow prize
 */
export interface AddFollowPrizeParams {
  /** The name of the follow prize, max length is 20 characters */
  follow_prize_name: string;
  /** The timing from when the follow prize is valid (unix timestamp) */
  start_time: number;
  /** The timing until when the follow prize is still valid (unix timestamp). Must be at least 1 day after start_time */
  end_time: number;
  /** The usage quantity of the follow prize (1-200000) */
  usage_quantity: number;
  /** The minimum spend required for using this follow prize */
  min_spend: number;
  /** The reward type of the follow prize (1: discount fix amount, 2: discount by percentage, 3: coin cash back) */
  reward_type: FollowPrizeRewardType;
  /** The discount amount. Required when reward_type is 1 (fix amount) */
  discount_amount?: number;
  /** The discount percentage. Required when reward_type is 2 (percentage) or 3 (coin cash back) */
  percentage?: number;
  /** The max amount of discount/value. Required when reward_type is 2 or 3 */
  max_price?: number;
}

/**
 * Parameters for deleting a follow prize
 */
export interface DeleteFollowPrizeParams {
  /** The unique identifier for the follow prize */
  campaign_id: number;
}

/**
 * Parameters for ending a follow prize immediately
 */
export interface EndFollowPrizeParams {
  /** The unique identifier for the follow prize */
  campaign_id: number;
}

/**
 * Parameters for getting follow prize detail
 */
export interface GetFollowPrizeDetailParams {
  /** The unique identifier for the follow prize */
  campaign_id: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Parameters for getting a list of follow prizes
 */
export interface GetFollowPrizeListParams {
  /** The status filter for retrieving follow prize list */
  status: FollowPrizeStatus;
  /** Specifies the page number of data to return. Default 1 */
  page_no?: number;
  /** Maximum number of entries to retrieve per page. Default 20, max 100 */
  page_size?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Parameters for updating a follow prize
 */
export interface UpdateFollowPrizeParams {
  /** The unique identifier for the follow prize */
  campaign_id: number;
  /** The name of the follow prize */
  follow_prize_name?: string;
  /** The timing from when the follow prize is valid */
  start_time?: number;
  /** The timing until when the follow prize is still valid */
  end_time?: number;
  /** The usage quantity of the follow prize */
  usage_quantity?: number;
  /** The minimum spend required for using this follow prize */
  min_spend?: number;
}

/**
 * Follow prize information in detail response
 */
export interface FollowPrizeDetail {
  /** The status of follow prize (upcoming/ongoing/expired) */
  campaign_status: string;
  /** The unique identifier for the follow prize */
  campaign_id: number;
  /** The usage quantity of the follow prize */
  usage_quantity: number;
  /** The timing from when the follow prize is valid */
  start_time: number;
  /** The timing until when the follow prize is still valid */
  end_time: number;
  /** The minimum spend required for using this follow prize */
  min_spend: number;
  /** The reward type of the follow prize */
  reward_type: FollowPrizeRewardType;
  /** The name of the follow prize */
  follow_prize_name: string;
  /** The discount amount (for fix amount type) */
  discount_amount?: number;
  /** The discount percentage (for percentage or coin cash back type) */
  percentage?: number;
  /** The max amount of discount/value */
  max_price?: number;
}

/**
 * Follow prize information in list response
 */
export interface FollowPrizeInfo {
  /** The unique identifier for the follow prize */
  campaign_id: number;
  /** The status of follow prize (upcoming/ongoing/expired) */
  campaign_status: string;
  /** The name of the follow prize */
  follow_prize_name: string;
  /** The timing from when the follow prize is valid */
  start_time: number;
  /** The timing until when the follow prize is still valid */
  end_time: number;
  /** The usage quantity of the follow prize */
  usage_quantity: number;
  /** The quantity of voucher claimed */
  claimed: number;
}

/**
 * Response for the add follow prize API
 */
export interface AddFollowPrizeResponse extends BaseResponse {
  response: {
    /** The unique identifier for the created follow prize */
    campagin_id: number; // Note: API has typo "campagin_id" instead of "campaign_id"
  };
}

/**
 * Response for the delete follow prize API
 */
export interface DeleteFollowPrizeResponse extends BaseResponse {
  response: {
    /** The unique identifier for the deleted follow prize */
    campagin_id: number; // Note: API has typo "campagin_id" instead of "campaign_id"
  };
}

/**
 * Response for the end follow prize API
 */
export interface EndFollowPrizeResponse extends BaseResponse {
  response: {
    /** The unique identifier for the ended follow prize */
    campaign_id: number;
  };
}

/**
 * Response for the get follow prize detail API
 */
export interface GetFollowPrizeDetailResponse extends BaseResponse {
  response: FollowPrizeDetail;
}

/**
 * Response for the get follow prize list API
 */
export interface GetFollowPrizeListResponse extends BaseResponse {
  response: {
    /** Indicates whether there are more pages to retrieve */
    more: boolean;
    /** The list of follow prizes matching the query parameters */
    follow_prize_list: FollowPrizeInfo[];
  };
}

/**
 * Response for the update follow prize API
 */
export interface UpdateFollowPrizeResponse extends BaseResponse {
  response: {
    /** The unique identifier for the updated follow prize */
    campagin_id: number; // Note: API has typo "campagin_id" instead of "campaign_id"
  };
}
