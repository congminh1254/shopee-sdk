import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field CampaignStatus
 */
export enum CampaignStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
}
/**
 * Enum generated for field Status
 */
export enum Status {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
  ALL = "all",
}
/**
 * Request parameters for add_follow_prize
 *
 * OpenAPI add Follow Prize
 */
export interface AddFollowPrizeRequest {
  /**
   * The name of the follow prize,The follow prize name length max limit is 20.
   */
  follow_prize_name?: string;
  /**
   * The timing from when the follow prize is valid,the start time later than the current time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  start_time?: Date | number;
  /**
   * The timing until when the follow prize is still valid,the end time must be greater than the start time by at least 1 day and end time cannot exceed 3 months after start time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  end_time?: Date | number;
  /**
   * Please enter a value between 1 and 200000.
   */
  usage_quantity?: number;
  /**
   * The minimum spend required for using this follow prize.
   */
  min_spend?: number;
  /**
   * The reward type of the follow prize.The available values are:1:discount---fix amount,2:discount---by percentage,3:coin cash back.
   */
  reward_type?: number;
  /**
   * The discount amount set for this particular follow prize.Only fill in when you are creating a fix amount follow prize.
   */
  discount_amount?: number;
  /**
   * The discount percentage set for this particular follow prize. Only fill in when you are creating a discount percentage follow prize or coins cashback follow prize.Discount percentage (reward_type ==2) or Percentage of coins cash back (reward_type==3).
   */
  percentage?: number;
  /**
   * The max amount of discount/value a user can enjoy by using this particular follow prize. It is required to fill in when you are creating a discount percentage follow prize or coins cashback follow prize. max_price >=1
   */
  max_price?: number;
  [key: string]: any;
}
/**
 * AddFollowPrize_Response sub-interface for AddFollowPrizeResponse
 */
export interface AddFollowPrize_Response {
  /**
   * The unique identifier for the created follow prize.
   */
  campagin_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_follow_prize
 */
export type AddFollowPrizeResponseData = AddFollowPrize_Response;
/**
 * Response payload for add_follow_prize
 *
 * OpenAPI add Follow Prize
 */
export type AddFollowPrizeResponse = FetchResponse<AddFollowPrizeResponseData>;
/**
 * Request parameters for delete_follow_prize
 *
 * delete_follow_prize
 */
export interface DeleteFollowPrizeRequest {
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  [key: string]: any;
}
/**
 * DeleteFollowPrize_Response sub-interface for DeleteFollowPrizeResponse
 */
export interface DeleteFollowPrize_Response {
  /**
   * The unique identifier for the created follow prize.
   */
  campagin_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_follow_prize
 */
export type DeleteFollowPrizeResponseData = DeleteFollowPrize_Response;
/**
 * Response payload for delete_follow_prize
 *
 * delete_follow_prize
 */
export type DeleteFollowPrizeResponse = FetchResponse<DeleteFollowPrizeResponseData>;
/**
 * Request parameters for end_follow_prize
 *
 * end follow prize
 */
export interface EndFollowPrizeRequest {
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  [key: string]: any;
}
/**
 * EndFollowPrize_Response sub-interface for EndFollowPrizeResponse
 */
export interface EndFollowPrize_Response {
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for end_follow_prize
 */
export type EndFollowPrizeResponseData = EndFollowPrize_Response;
/**
 * Response payload for end_follow_prize
 *
 * end follow prize
 */
export type EndFollowPrizeResponse = FetchResponse<EndFollowPrizeResponseData>;
/**
 * Request parameters for get_follow_prize_detail
 *
 * get_follow_prize_detail
 */
export interface GetFollowPrizeDetailRequest {
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  [key: string]: any;
}
/**
 * GetFollowPrizeDetail_Response sub-interface for GetFollowPrizeDetailResponse
 */
export interface GetFollowPrizeDetail_Response {
  /**
   * The status of follow prize,the campagin status have upcoming/ongoing/expired.
   */
  campaign_status?: CampaignStatus | string | number;
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  /**
   * Please enter a value between 1 and 200000.
   */
  usage_quantity?: number;
  /**
   * The timing from when the follow prize is valid,the start time later than the current time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  start_time?: Date | number;
  /**
   * The timing until when the follow prize is still valid,the end time must be greater than the start time by at least 1 day and end time cannot exceed 3 months after start time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  end_time?: Date | number;
  /**
   * The minimum spend required for using this follow prize.
   */
  min_spend?: number;
  /**
   * The reward type of the follow prize.The available values are:1:discount---fix amount,2:discount---by percentage,3:coin cash back.
   */
  reward_type?: number;
  /**
   * The name of the follow prize,The follow prize name length max limit is 20.
   */
  follow_prize_name?: string;
  /**
   * The discount amount set for this particular follow prize.Only fill in when you are creating a fix amount follow prize.
   */
  discount_amount?: number;
  /**
   * The discount percentage set for this particular follow prize. Only fill in when you are creating a discount percentage follow prize or coins cashback follow prize.Discount percentage (reward_type ==2) or Percentage of coins cash back (reward_type==3).
   */
  percentage?: number;
  /**
   * The max amount of discount/value a user can enjoy by using this particular follow prize. Only fill in when you are creating a discount percentage follow prize or coins cashback follow prize.
   */
  max_price?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_follow_prize_detail
 */
export type GetFollowPrizeDetailResponseData = GetFollowPrizeDetail_Response;
/**
 * Response payload for get_follow_prize_detail
 *
 * get_follow_prize_detail
 */
export type GetFollowPrizeDetailResponse = FetchResponse<GetFollowPrizeDetailResponseData>;
/**
 * Request parameters for get_follow_prize_list
 *
 * OpenAPI get_follow_prize_list
 */
export interface GetFollowPrizeListRequest {
  /**
   * Specifies the page number of data to return in the current call. Default to be 1.
   */
  page_no?: number;
  /**
   * Use the 'page_size' filters to control the maximum number of entries to retrieve per page (i.e., per call). Default to be 20 and allowed input is from 1- 100.
   */
  page_size?: number;
  /**
   * The status filter for retrieving follow prize list. Available value: upcoming/ongoing/expired/all.
   */
  status?: Status | string | number;
  [key: string]: any;
}
/**
 * GetFollowPrizeList_FollowPrize sub-interface for GetFollowPrizeList_Response
 */
export interface GetFollowPrizeList_FollowPrize {
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  /**
   * The status of follow prize,the campagin status have upcoming/ongoing/expired.
   */
  campaign_status?: CampaignStatus | string | number;
  /**
   * The name of the follow prize,The follow prize name length max limit is 20.
   */
  follow_prize_name?: string;
  /**
   * The timing from when the follow prize is valid,the start time later than the current time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  start_time?: Date | number;
  /**
   * The timing until when the follow prize is still valid,the end time must be greater than the start time by at least 1 day and end time cannot exceed 3 months after start time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  end_time?: Date | number;
  /**
   * Please enter a value between 1 and 200000.
   */
  usage_quantity?: number;
  /**
   * This is to indicate the quantity of voucher claimed.
   */
  claimed?: number;
  [key: string]: any;
}
/**
 * GetFollowPrizeList_Response sub-interface for GetFollowPrizeListResponse
 */
export interface GetFollowPrizeList_Response {
  /**
   * This is to indicate whether the comment list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of comments.
   */
  more?: boolean;
  /**
   * The list of follow prize.
   */
  follow_prize_list?: GetFollowPrizeList_FollowPrize[];
  [key: string]: any;
}
/**
 * Response data payload for get_follow_prize_list
 */
export type GetFollowPrizeListResponseData = GetFollowPrizeList_Response;
/**
 * Response payload for get_follow_prize_list
 *
 * OpenAPI get_follow_prize_list
 */
export type GetFollowPrizeListResponse = FetchResponse<GetFollowPrizeListResponseData>;
/**
 * Request parameters for update_follow_prize
 *
 * update_follow_prize
 */
export interface UpdateFollowPrizeRequest {
  /**
   * The name of the follow prize,The follow prize name length max limit is 20.
   */
  follow_prize_name?: string;
  /**
   * The unique identifier for the created follow prize.
   */
  campaign_id?: number;
  /**
   * The timing from when the follow prize is valid,the start time later than the current time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  start_time?: Date | number;
  /**
   * The timing until when the follow prize is still valid,the end time must be greater than the start time by at least 1 day and end time cannot exceed 3 months after start time.If the start time and end time passed in by the seller overlap with other upcoming/ongoing activities, it will prompt "Another Follow Prize voucher already exists during this time period, please set another period."
   */
  end_time?: Date | number;
  /**
   * Please enter a value between 1 and 200000.
   */
  usage_quantity?: number;
  /**
   * The minimum spend required for using this follow prize.
   */
  min_spend?: number;
  [key: string]: any;
}
/**
 * UpdateFollowPrize_Response sub-interface for UpdateFollowPrizeResponse
 */
export interface UpdateFollowPrize_Response {
  /**
   * The unique identifier for the created follow prize.
   */
  campagin_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_follow_prize
 */
export type UpdateFollowPrizeResponseData = UpdateFollowPrize_Response;
/**
 * Response payload for update_follow_prize
 *
 * update_follow_prize
 */
export type UpdateFollowPrizeResponse = FetchResponse<UpdateFollowPrizeResponseData>;
