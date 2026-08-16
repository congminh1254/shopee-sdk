import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for delete_video
 *
 * Use this API to delete video. You can delete the video for both draft and post status.
 */
export interface DeleteVideoRequest {
  /**
   * You can only select one from video_upload_id_list and post_id_list: - If you want to delete video with draft status, please pass video_upload_id_list.- If you want to delete video with post status, please pass post_id_list.
   */
  video_upload_id_list?: string[];
  /**
   * You can only select one from video_upload_id_list and post_id_list: - If you want to delete video with draft status, please pass video_upload_id_list.- If you want to delete video with post status, please pass post_id_list.
   */
  post_id_list?: string[];
  [key: string]: any;
}
/**
 * DeleteVideo_Success sub-interface for DeleteVideo_Response
 */
export interface DeleteVideo_Success {
  /**
   * The video_upload_id delete successfully.
   */
  success_video_upload_id?: string;
  /**
   * The post_id delete successfully.
   */
  success_post_id?: string;
  [key: string]: any;
}
/**
 * DeleteVideo_Failure sub-interface for DeleteVideo_Response
 */
export interface DeleteVideo_Failure {
  /**
   * Failed video_upload_id.
   */
  fail_video_upload_id?: string;
  /**
   * Failed post_id.
   */
  fail_post_id?: string;
  /**
   * Failed reason of the corresponding video_upload_id or post_id.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * DeleteVideo_Response sub-interface for DeleteVideoResponse
 */
export interface DeleteVideo_Response {
  /**
   * The list of video delete successfully.
   */
  success_list?: DeleteVideo_Success[];
  /**
   * The list of video delete deleted.
   */
  failure_list?: DeleteVideo_Failure[];
  [key: string]: any;
}
/**
 * Response data payload for delete_video
 */
export type DeleteVideoResponseData = DeleteVideo_Response;
/**
 * Response payload for delete_video
 *
 * Use this API to delete video. You can delete the video for both draft and post status.
 */
export type DeleteVideoResponse = FetchResponse<DeleteVideoResponseData>;
/**
 * EditVideoInfo_ItemInfo sub-interface for EditVideoInfo_VideoUpload
 */
export interface EditVideoInfo_ItemInfo {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Product display name in Shopee Video.
   */
  custom_item_name?: string;
  [key: string]: any;
}
/**
 * EditVideoInfo_AllowInfo sub-interface for EditVideoInfo_VideoUpload
 */
export interface EditVideoInfo_AllowInfo {
  /**
   * Whether allow duet.
   */
  allow_duet?: boolean;
  /**
   * Whether allow stitch.
   */
  allow_stitch?: boolean;
  [key: string]: any;
}
/**
 * EditVideoInfo_ScheduledInfo sub-interface for EditVideoInfo_VideoUpload
 */
export interface EditVideoInfo_ScheduledInfo {
  /**
   * Whether post it to Shopee Video at scheduled time.
   */
  scheduled_post?: boolean;
  /**
   * Scheduled post time, millisecond timestamp. When scheduled_post is true, scheduled_post_time must not empty.
   */
  scheduled_post_time?: Date | number;
  [key: string]: any;
}
/**
 * EditVideoInfo_VideoUpload sub-interface for EditVideoInfoRequest
 */
export interface EditVideoInfo_VideoUpload {
  /**
   * ID of uploaded video. Obtain from v2.media.get_video_upload_result.
   */
  video_upload_id?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Selected cover image url of the Shopee Video. Obtain from v2.video.get_cover_list.
   */
  cover_image_url?: string;
  /**
   * List of products to be linked with the Shopee Video, no more than 6.
   */
  item_info?: EditVideoInfo_ItemInfo[];
  /**
   * Whether allow stitch and duet.
   */
  allow_info?: EditVideoInfo_AllowInfo;
  /**
   * When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty.
   */
  scheduled_info?: EditVideoInfo_ScheduledInfo;
  [key: string]: any;
}
/**
 * Request parameters for edit_video_info
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video first, then call this API to set video post information. After submit, the video is still draft status, you need to call v2.video.post_video to post the video to Shopee Video. You can only set and update post information before the video is post.
 */
export interface EditVideoInfoRequest {
  /**
   * Video information collection, no more than 5.
   */
  video_upload_list?: EditVideoInfo_VideoUpload[];
  [key: string]: any;
}
/**
 * EditVideoInfo_Failure sub-interface for EditVideoInfo_Response
 */
export interface EditVideoInfo_Failure {
  /**
   * Failed video_upload_id.
   */
  fail_video_upload_id?: string;
  /**
   * Failed reason of the corresponding video_upload_id.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * EditVideoInfo_Response sub-interface for EditVideoInfoResponse
 */
export interface EditVideoInfo_Response {
  /**
   * The list of video_upload_id edit successfully.
   */
  success_list?: string[];
  /**
   * The list of video_upload_id edit failed.
   */
  failure_list?: EditVideoInfo_Failure[];
  [key: string]: any;
}
/**
 * Response data payload for edit_video_info
 */
export type EditVideoInfoResponseData = EditVideoInfo_Response;
/**
 * Response payload for edit_video_info
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video first, then call this API to set video post information. After submit, the video is still draft status, you need to call v2.video.post_video to post the video to Shopee Video. You can only set and update post information before the video is post.
 */
export type EditVideoInfoResponse = FetchResponse<EditVideoInfoResponseData>;
/**
 * Request parameters for get_cover_list
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video. After the video is uploaded, obtain the frame-by-frame results and select a specific frame as the video cover.
 */
export interface GetCoverListRequest {
  /**
   * ID of uploaded video. Obtain from v2.media.get_video_upload_result.
   */
  video_upload_id?: string;
  [key: string]: any;
}
/**
 * GetCoverList_Response sub-interface for GetCoverListResponse
 */
export interface GetCoverList_Response {
  /**
   * List of image url for each frame of the uploaded video, you can select one as the video cover when calling v2.video.edit_video_info.
   */
  image_url_list?: string[];
  [key: string]: any;
}
/**
 * Response data payload for get_cover_list
 */
export type GetCoverListResponseData = GetCoverList_Response;
/**
 * Response payload for get_cover_list
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video. After the video is uploaded, obtain the frame-by-frame results and select a specific frame as the video cover.
 */
export type GetCoverListResponse = FetchResponse<GetCoverListResponseData>;
/**
 * Request parameters for get_metric_trend
 *
 * Query video data indicator trends.
 */
export interface GetMetricTrendRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type.
   */
  period_type?: string;
  /**
   * The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month.
   */
  end_date?: string;
  [key: string]: any;
}
/**
 * GetMetricTrend_VideoTotalMetric sub-interface for GetMetricTrend_Response
 */
export interface GetMetricTrend_VideoTotalMetric {
  /**
   * The placed value of orders from all videos in the period selected.
   */
  placed_sales?: number;
  /**
   * The confirmed value of orders from all videos in the period selected.
   */
  confirmed_sales?: number;
  /**
   * The number of placed orders from all videos in the period selected.
   */
  placed_orders?: number;
  /**
   * The number of confirmed orders from all videos in the period selected.
   */
  confirmed_orders?: number;
  /**
   * Number of item sold from placed orders in the video.
   */
  placed_item_sold?: number;
  /**
   * Number of item sold from confirmed orders in the video.
   */
  confirmed_item_sold?: number;
  /**
   * Number of viewers in the video.
   */
  total_viewers?: number;
  /**
   * Number of views from the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Total watch duration per video.
   */
  avg_view_duration?: number;
  /**
   * Number of unique buyers who placed order from the video.
   */
  placed_buyers?: number;
  /**
   * Number of unique buyers who confirmed order from the video.
   */
  confirmed_buyers?: number;
  /**
   * Number of "Add To Cart" button clicked for all products in the orange bag during video viewing.
   */
  total_atc?: number;
  /**
   * Number of products clicks divided by Number of video views.
   */
  ctr?: number;
  /**
   * Number of placed product orders from the video divided by Number of product clicks from the video.
   */
  placed_co_rate?: number;
  /**
   * Number of confirmed product orders from the video divided by Number of product clicks from the video.
   */
  confirmed_co_rate?: number;
  /**
   * Total placed sales divided by Total placed orders.
   */
  placed_abs?: number;
  /**
   * Total confirmed sales divided by Total confirmed orders.
   */
  confirmed_abs?: number;
  /**
   * The placed Sales generated for every 1,000 views.
   */
  placed_gpm?: number;
  /**
   * The confirmed Sales generated for every 1,000 views.
   */
  confirmed_gpm?: number;
  /**
   * Videos with at least one product in the orange bag
   */
  video_with_products?: number;
  /**
   * Videos that generates placed revenues.
   */
  placed_revenue_generating_videos?: number;
  /**
   * Videos that generates confirmed revenues.
   */
  confirmed_revenue_generating_videos?: number;
  /**
   * Number of views from all videos.
   */
  total_views?: number;
  /**
   * Number of likes from all videos.
   */
  total_likes?: number;
  /**
   * Number of shares from all videos.
   */
  total_shares?: number;
  /**
   * Number of comments from all videos.
   */
  total_comments?: number;
  /**
   * Number of new followers from all videos.
   */
  video_new_followers?: number;
  /**
   * Data offline computation time.
   */
  data_period?: string;
  [key: string]: any;
}
/**
 * GetMetricTrend_Response sub-interface for GetMetricTrendResponse
 */
export interface GetMetricTrend_Response {
  video_total_metric_list?: GetMetricTrend_VideoTotalMetric[];
  [key: string]: any;
}
/**
 * Response data payload for get_metric_trend
 */
export type GetMetricTrendResponseData = GetMetricTrend_Response;
/**
 * Response payload for get_metric_trend
 *
 * Query video data indicator trends.
 */
export type GetMetricTrendResponse = FetchResponse<GetMetricTrendResponseData>;
/**
 * Request parameters for get_overview_performance
 *
 * Get overall performance data for all post Shopee Video. There is at least a one-day delay.
 */
export interface GetOverviewPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type.
   */
  period_type?: string;
  /**
   * The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month.
   */
  end_date?: string;
  [key: string]: any;
}
/**
 * GetOverviewPerformance_KeyMetric sub-interface for GetOverviewPerformance_Response
 */
export interface GetOverviewPerformance_KeyMetric {
  /**
   * The placed value of orders from all videos in the period selected.
   */
  placed_sales?: number;
  /**
   * The confirmed value of orders from all videos in the period selected.
   */
  confirmed_sales?: number;
  /**
   * The number of placed orders from all videos in the period selected.
   */
  placed_orders?: number;
  /**
   * The number of confirmed orders from all videos in the period selected.
   */
  confirmed_orders?: number;
  /**
   * Number of item sold from placed orders in the video.
   */
  placed_item_sold?: number;
  /**
   * Number of item sold from confirmed orders in the video.
   */
  confirmed_item_sold?: number;
  /**
   * Number of viewers of the video.
   */
  total_viewers?: number;
  /**
   * Number of views for the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Total watch duration per video.
   */
  avg_view_duration?: number;
  [key: string]: any;
}
/**
 * GetOverviewPerformance_Conversion sub-interface for GetOverviewPerformance_Response
 */
export interface GetOverviewPerformance_Conversion {
  /**
   * Number of unique buyers who placed order from the video.
   */
  placed_buyers?: number;
  /**
   * Number of unique buyers who confirmed order from the video.
   */
  confirmed_buyers?: number;
  /**
   * Number of "Add To Cart" button clicked for all products in the orange bag during video viewing.
   */
  total_atc?: number;
  /**
   * Number of products clicks divided by Number of video views.
   */
  ctr?: number;
  /**
   * Number of placed product orders from the video divided by Number of product clicks from the video.
   */
  placed_co_rate?: number;
  /**
   * Number of confirmed product orders from the video divided by Number of product clicks from the video.
   */
  confirmed_co_rate?: number;
  /**
   * Total placed sales divided by Total placed orders.
   */
  placed_abs?: number;
  /**
   * Total confirmed sales divided by Total confirmed orders.
   */
  confirmed_abs?: number;
  /**
   * The placed Sales generated for every 1,000 views.
   */
  placed_gpm?: number;
  /**
   * The confirmed Sales generated for every 1,000 views.
   */
  confirmed_gpm?: number;
  /**
   * Videos with at least one product in the orange bag.
   */
  video_with_products?: number;
  /**
   * Videos that generates placed revenues.
   */
  placed_revenue_generating_videos?: number;
  /**
   * Videos that generates confirmed revenues.
   */
  confirmed_revenue_generating_videos?: number;
  [key: string]: any;
}
/**
 * GetOverviewPerformance_Engagement sub-interface for GetOverviewPerformance_Response
 */
export interface GetOverviewPerformance_Engagement {
  /**
   * Number of views from all videos
   */
  total_views?: number;
  /**
   * Number of likes from all videos
   */
  total_likes?: number;
  /**
   * Number of shares from all videos
   */
  total_shares?: number;
  /**
   * Number of comments from all videos
   */
  total_comments?: number;
  /**
   * Number of new followers from all videos
   */
  video_new_followers?: number;
  [key: string]: any;
}
/**
 * GetOverviewPerformance_Response sub-interface for GetOverviewPerformanceResponse
 */
export interface GetOverviewPerformance_Response {
  key_metric?: GetOverviewPerformance_KeyMetric;
  conversion?: GetOverviewPerformance_Conversion;
  engagement?: GetOverviewPerformance_Engagement;
  /**
   * Data offline computation time.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_overview_performance
 */
export type GetOverviewPerformanceResponseData = GetOverviewPerformance_Response;
/**
 * Response payload for get_overview_performance
 *
 * Get overall performance data for all post Shopee Video. There is at least a one-day delay.
 */
export type GetOverviewPerformanceResponse = FetchResponse<GetOverviewPerformanceResponseData>;
/**
 * Request parameters for get_prodcut_performance_list
 *
 * Get specific performance data for products linked with Shopee Video. There is at least a one-day delay.
 */
export interface GetProdcutPerformanceListRequest {
  /**
   * The start index of request. Starting from 1.
   */
  page_no?: number;
  /**
   * The number of item returned by this request. Max is 20.
   */
  page_size?: number;
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type.
   */
  period_type?: string;
  /**
   * The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month.
   */
  end_date?: string;
  /**
   * Use this field to specify which field to use to sort the returned list. Available values:PlacedOrdersPlacedSalesPlacedUniqueBuyersConfirmedOrdersConfirmedSalesConfirmedUniqueBuyers
   */
  order_by?: string;
  /**
   * Use this field to specify whether the returned list is sorted in ascending or descending order_by. Available values:ascdesc
   */
  sort?: string;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Search by product name.
   */
  item_name?: string;
  [key: string]: any;
}
/**
 * GetProdcutPerformanceList_List sub-interface for GetProdcutPerformanceList_Response
 */
export interface GetProdcutPerformanceList_List {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Cover image url of the item.
   */
  item_cover_image_url?: string;
  /**
   * Description of the item.
   */
  item_description?: string;
  /**
   * The number of placed orders for the item.
   */
  placed_orders?: number;
  /**
   * The number of confirmed orders for the item.
   */
  confirmed_orders?: number;
  /**
   * The placed value of orders for the item.
   */
  placed_sales?: number;
  /**
   * The confirmed value of orders for the item.
   */
  confirmed_sales?: number;
  /**
   * Number of unique buyers who placed order for the item.
   */
  placed_unique_buyers?: number;
  /**
   * Number of unique buyers who confirmed order for the item.
   */
  confirmed_unique_buyers?: number;
  /**
   * Data Date Range.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * GetProdcutPerformanceList_Response sub-interface for GetProdcutPerformanceListResponse
 */
export interface GetProdcutPerformanceList_Response {
  /**
   * The total count of product that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  has_more?: boolean;
  /**
   * The list of product that match the condition.
   */
  list?: GetProdcutPerformanceList_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_prodcut_performance_list
 */
export type GetProdcutPerformanceListResponseData = GetProdcutPerformanceList_Response;
/**
 * Response payload for get_prodcut_performance_list
 *
 * Get specific performance data for products linked with Shopee Video. There is at least a one-day delay.
 */
export type GetProdcutPerformanceListResponse =
  FetchResponse<GetProdcutPerformanceListResponseData>;
/**
 * Request parameters for get_user_demographics
 *
 * Get user demographics data to better understand the types of viewers that watch your Shopee Video.
 */
export type GetUserDemographicsRequest = Record<string, never>;
/**
 * GetUserDemographics_Response sub-interface for GetUserDemographicsResponse
 */
export interface GetUserDemographics_Response {
  /**
   * The age distribution of your viewers.Note: The type of age is a map. The key is an enumerated value corresponding to an age range: -1: Unknown1: 18-24 years old2: 25-34 years old3: 35-44 years old4: 45+ years oldThe value is the number of viewers in each age group.
   */
  age?: any;
  /**
   * The gender distribution of your viewers.Note: The type of gender is a map. The key is one of: MaleFemalePredicted MalePredicted FemaleThe value is the number of viewers for each gender type.
   */
  gender?: any;
  /**
   * The geographic distribution of your viewers. Note: The type of location is a map. The key is top 10 city, and the value is the number of viewers in each city.
   */
  location?: any;
  /**
   * The distribution of viewers based on whether they follow your Shopee Video profile.Note: The type of identity is a map. The key is either "follow" or "unfollow", indicating followers and non-followers respectively, and the value is number of page views generated by each group.
   */
  identity?: any;
  /**
   * The distribution of video views across different hours of the day.Note: The type of activity is a map. The key is the hour of the day (ranging from 0 to 23), and the value is the number of video views generated during that specific hour.
   */
  activity?: any;
  /**
   * The types of videos that your viewer is most interested in.Note: The type of content is a map. The key is top 10 content category, and the value is the number of video views corresponding to that content category.
   */
  content?: any;
  /**
   * The types of products that your viewers is most interested in.Note: The type of shopping is a map. The key is top 10 product category, and the value is the number of video views corresponding to that product category.
   */
  shopping?: any;
  [key: string]: any;
}
/**
 * Response data payload for get_user_demographics
 */
export type GetUserDemographicsResponseData = GetUserDemographics_Response;
/**
 * Response payload for get_user_demographics
 *
 * Get user demographics data to better understand the types of viewers that watch your Shopee Video.
 */
export type GetUserDemographicsResponse = FetchResponse<GetUserDemographicsResponseData>;
/**
 * Request parameters for get_video_detail
 *
 * Get the detail information of video.
 */
export interface GetVideoDetailRequest {
  /**
   * You can only select one from video_upload_id and post_id: - If you want to get detail information of video with draft status, please pass video_upload_id.- If you want to get detail information of video with post status, please pass post_id.
   */
  video_upload_id?: string;
  /**
   * You can only select one from video_upload_id and post_id: - If you want to get detail information of video with draft status, please pass video_upload_id.- If you want to get detail information of video with post status, please pass post_id.
   */
  post_id?: string;
  [key: string]: any;
}
/**
 * GetVideoDetail_Item sub-interface for GetVideoDetail_Response
 */
export interface GetVideoDetail_Item {
  /**
   * Shopee's unique identifier for a shop of the item.
   */
  shop_id?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Name of the item displayed on Shopee Video (max 255 characters).
   */
  custom_item_name?: string;
  /**
   * Cover image url of the item.
   */
  item_cover_image_url?: string;
  /**
   * Min price of the item.
   */
  min_price?: number;
  /**
   * Max price of the item.
   */
  max_price?: number;
  /**
   * Stock of the item.
   */
  stock?: number;
  [key: string]: any;
}
/**
 * GetVideoDetail_AllowInfo sub-interface for GetVideoDetail_Response
 */
export interface GetVideoDetail_AllowInfo {
  /**
   * Whether allow stitch.
   */
  allow_stitch?: boolean;
  /**
   * Whether allow duet.
   */
  allow_duet?: boolean;
  [key: string]: any;
}
/**
 * GetVideoDetail_ScheduledInfo sub-interface for GetVideoDetail_Response
 */
export interface GetVideoDetail_ScheduledInfo {
  /**
   * Whether post it to Shopee Video at scheduled time.
   */
  scheduled_post?: boolean;
  /**
   * Scheduled post time, millisecond timestamp.
   */
  scheduled_post_time?: Date | number;
  [key: string]: any;
}
/**
 * GetVideoDetail_Response sub-interface for GetVideoDetailResponse
 */
export interface GetVideoDetail_Response {
  /**
   * ID of uploaded video.
   */
  video_upload_id?: string;
  /**
   * The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_id?: string;
  /**
   * The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_time?: Date | number;
  /**
   * Video play url.
   */
  video_url?: string;
  /**
   * Video current status. Applicable values:200: DRAFT300: POSTED400: DELETED500: SCHEDULED600: SCHEDULED_FAILED
   */
  status?: number;
  /**
   * Cover image url of the Shopee Video.
   */
  cover_image_url?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Video duration time in millisecond.
   */
  duration?: number;
  /**
   * View count of post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  views?: number;
  /**
   * Like count of post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  likes?: number;
  /**
   * Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  comments?: number;
  /**
   * Whether there is video metric data.
   */
  has_performance?: boolean;
  /**
   * List of products linked with the Shopee Video.
   */
  item_list?: GetVideoDetail_Item[];
  /**
   * Whether allow stitch and duet.
   */
  allow_info?: GetVideoDetail_AllowInfo;
  /**
   * When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty.
   */
  scheduled_info?: GetVideoDetail_ScheduledInfo;
  /**
   * The lasted update time the video.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * Response data payload for get_video_detail
 */
export type GetVideoDetailResponseData = GetVideoDetail_Response;
/**
 * Response payload for get_video_detail
 *
 * Get the detail information of video.
 */
export type GetVideoDetailResponse = FetchResponse<GetVideoDetailResponseData>;
/**
 * Request parameters for get_video_detail_audience_distribution
 *
 * Get detailed audience distribution data for individual post Shopee Video. There is at least a one-day delay.
 */
export interface GetVideoDetailAudienceDistributionRequest {
  /**
   * A unique identifier for Shopee videos.
   */
  post_id?: string;
  [key: string]: any;
}
/**
 * GetVideoDetailAudienceDistribution_Response sub-interface for GetVideoDetailAudienceDistributionResponse
 */
export interface GetVideoDetailAudienceDistribution_Response {
  /**
   * The age distribution of your viewers.Note: The type of age is a map. The key is an enumerated value corresponding to an age range: -1: Unknown1: 18-24 years old2: 25-34 years old3: 35-44 years old4: 45+ years oldThe value is the number of viewers in each age group.
   */
  age?: any;
  /**
   * The gender distribution of your viewers.Note: The type of gender is a map. The key is one of: malefemalepredictedMalepredictedFemaleunknownThe value is the number of viewers for each gender type.
   */
  gender?: any;
  /**
   * The geographic distribution of your viewers. Note: The type of location is a map. The key is top 10 city, and the value is the number of viewers in each city.
   */
  location?: any;
  /**
   * The distribution of viewers based on whether they follow your Shopee Video profile.Note: The type of identity is a map. The key is one of: 0: Non-follower1: FollowerThe value is number of user views generated by each group.
   */
  identity?: any;
  /**
   * The distribution of video views across different hours of the day.Note: The type of activity is a map. The key is the hour of the day (ranging from 0 to 23), and the value is the number of video views generated during that specific hour.
   */
  activity?: any;
  /**
   * The types of videos that your viewer is most interested in.Note: The type of content is a map. The key is content category, and the value is the number of video views corresponding to that content category.
   */
  content?: any;
  /**
   * The types of products that your viewers is most interested in.Note: The type of shopping is a map. The key is product category, and the value is the number of video views corresponding to that product category.
   */
  shopping?: any;
  [key: string]: any;
}
/**
 * Response data payload for get_video_detail_audience_distribution
 */
export type GetVideoDetailAudienceDistributionResponseData =
  GetVideoDetailAudienceDistribution_Response;
/**
 * Response payload for get_video_detail_audience_distribution
 *
 * Get detailed audience distribution data for individual post Shopee Video. There is at least a one-day delay.
 */
export type GetVideoDetailAudienceDistributionResponse =
  FetchResponse<GetVideoDetailAudienceDistributionResponseData>;
/**
 * Request parameters for get_video_detail_metric_trend
 *
 * Get detailed metric trend data for individual post Shopee Video. There is at least a one-day delay.
 */
export interface GetVideoDetailMetricTrendRequest {
  /**
   * A unique identifier for Shopee videos.
   */
  post_id?: string;
  /**
   * The name of metric that require obtaining trend data. Applicable values: Views, Likes, Comments, Shares, FollowersGrowth, PlacedOrders, PlacedSales, UniqueBuyers, ConversionRate, SoldItems, SalesPerOrder, SalesPerBuyer
   */
  metric_name?: string;
  [key: string]: any;
}
/**
 * GetVideoDetailMetricTrend_Response sub-interface for GetVideoDetailMetricTrendResponse
 */
export interface GetVideoDetailMetricTrend_Response {
  /**
   * The type of metric_trend is a map. The key is date (in millisecond timestamp format), and the value is the number corresponding to metric.
   */
  metric_trend?: any;
  [key: string]: any;
}
/**
 * Response data payload for get_video_detail_metric_trend
 */
export type GetVideoDetailMetricTrendResponseData = GetVideoDetailMetricTrend_Response;
/**
 * Response payload for get_video_detail_metric_trend
 *
 * Get detailed metric trend data for individual post Shopee Video. There is at least a one-day delay.
 */
export type GetVideoDetailMetricTrendResponse =
  FetchResponse<GetVideoDetailMetricTrendResponseData>;
/**
 * Request parameters for get_video_detail_performance
 *
 * Get detailed performance data for individual post Shopee Video. There is at least a one-day delay.
 */
export interface GetVideoDetailPerformanceRequest {
  /**
   * A unique identifier for Shopee videos.
   */
  post_id?: string;
  [key: string]: any;
}
/**
 * GetVideoDetailPerformance_VideoInfo sub-interface for GetVideoDetailPerformance_Response
 */
export interface GetVideoDetailPerformance_VideoInfo {
  /**
   * A unique identifier for Shopee videos.
   */
  post_id?: string;
  /**
   * The time when the video post to Shopee Video.
   */
  post_time?: Date | number;
  /**
   * Video play url.
   */
  video_url?: string;
  /**
   * Cover image url of the Shopee Video.
   */
  cover_image_url?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Video duration time in millisecond.
   */
  duration?: number;
  /**
   * Number of products linked with the Shopee Video.
   */
  related_item_count?: number;
  [key: string]: any;
}
/**
 * GetVideoDetailPerformance_VideoPerformance sub-interface for GetVideoDetailPerformance_Response
 */
export interface GetVideoDetailPerformance_VideoPerformance {
  /**
   * Amount of views from the video.
   */
  views?: number;
  /**
   * Total likes from the video.
   */
  likes?: number;
  /**
   * Total comments from the video.
   */
  comments?: number;
  /**
   * Total shares from the video.
   */
  shares?: number;
  /**
   * Amount of new followers from the Video.
   */
  followers_growth?: number;
  /**
   * Amount of product orders from the video.
   */
  placed_orders?: number;
  /**
   * Amount of product sales from the video.
   */
  placed_sales?: number;
  /**
   * Buyers of the products in the video.
   */
  unique_buyers?: number;
  /**
   * Amount of products sold from the video/amount of views from the video.
   */
  conversion_rate?: number;
  /**
   * Amount of products sold from the video.
   */
  sold_items?: number;
  /**
   * The product click value of orders for item.
   */
  product_clicks?: number;
  /**
   * The product click rate value of orders for item.
   */
  product_click_rate?: number;
  /**
   * Amount of product sales from the video/amount of product orders from the video.
   */
  sales_per_order?: number;
  /**
   * Amount of product sales from the video/amount of buyers from the video.
   */
  sales_per_buyer?: number;
  [key: string]: any;
}
/**
 * GetVideoDetailPerformance_Response sub-interface for GetVideoDetailPerformanceResponse
 */
export interface GetVideoDetailPerformance_Response {
  /**
   * Video post detail informations you are querying.
   */
  video_info?: GetVideoDetailPerformance_VideoInfo;
  /**
   * Overall performance data of the video you are querying.
   */
  video_performance?: GetVideoDetailPerformance_VideoPerformance;
  [key: string]: any;
}
/**
 * Response data payload for get_video_detail_performance
 */
export type GetVideoDetailPerformanceResponseData = GetVideoDetailPerformance_Response;
/**
 * Response payload for get_video_detail_performance
 *
 * Get detailed performance data for individual post Shopee Video. There is at least a one-day delay.
 */
export type GetVideoDetailPerformanceResponse =
  FetchResponse<GetVideoDetailPerformanceResponseData>;
/**
 * Request parameters for get_video_detail_product_performance
 *
 * Get performance data for products linked with individual post Shopee Video. There is at least a one-day delay.
 */
export interface GetVideoDetailProductPerformanceRequest {
  /**
   * The start index of request. Starting from 1.
   */
  page_no?: number;
  /**
   * The number of item returned by this request. Max is 20.
   */
  page_size?: number;
  /**
   * The unique identifier for post Shopee Video.
   */
  post_id?: string;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  [key: string]: any;
}
/**
 * GetVideoDetailProductPerformance_List sub-interface for GetVideoDetailProductPerformance_Response
 */
export interface GetVideoDetailProductPerformance_List {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Cover image url of the item.
   */
  item_cover_image_url?: string;
  /**
   * Description of the item.
   */
  item_description?: string;
  /**
   * Like count the post Shopee Video.
   */
  likes?: number;
  /**
   * Comment count the post Shopee Video.
   */
  comments?: number;
  /**
   * Amount of product orders from the video.
   */
  placed_orders?: number;
  /**
   * Amount of product sales from the video.
   */
  placed_sales?: number;
  /**
   * Buyers of the product in the video.
   */
  unique_buyers?: number;
  /**
   * Amount of products sold from the video.
   */
  sold_items?: number;
  /**
   * Amount of product clicks from the video.
   */
  product_clicks?: number;
  /**
   * Amount of product clicks from the video/Product view from video.
   */
  product_click_rate?: number;
  /**
   * Amount of products sold from the video/amount of views from the video.
   */
  conversion_rate?: number;
  /**
   * Amount of product sales from the video/amount of product orders from the video.
   */
  sales_per_order?: number;
  /**
   * Amount of product sales from the video/amount of buyers from the video.
   */
  sales_per_buyer?: number;
  [key: string]: any;
}
/**
 * GetVideoDetailProductPerformance_Response sub-interface for GetVideoDetailProductPerformanceResponse
 */
export interface GetVideoDetailProductPerformance_Response {
  /**
   * The list of item that match the condition.
   */
  list?: GetVideoDetailProductPerformance_List[];
  /**
   * The total count of video that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_video_detail_product_performance
 */
export type GetVideoDetailProductPerformanceResponseData =
  GetVideoDetailProductPerformance_Response;
/**
 * Response payload for get_video_detail_product_performance
 *
 * Get performance data for products linked with individual post Shopee Video. There is at least a one-day delay.
 */
export type GetVideoDetailProductPerformanceResponse =
  FetchResponse<GetVideoDetailProductPerformanceResponseData>;
/**
 * Request parameters for get_video_list
 *
 * Get the list of video in draft status or video already post to Shopee Video.
 */
export interface GetVideoListRequest {
  /**
   * The start index of request. Starting from 1.
   */
  page_no?: number;
  /**
   * The number of affiliate returned by this request, Max is 20.
   */
  page_size?: number;
  /**
   * Search tpye for video in draft status or video already post to Shopee Video.1: draft2: post
   */
  list_type?: number[];
  [key: string]: any;
}
/**
 * GetVideoList_Item sub-interface for GetVideoList_List
 */
export interface GetVideoList_Item {
  /**
   * Shopee's unique identifier for a shop of the item.
   */
  shop_id?: number;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Name of the item displayed on Shopee Video (max 255 characters).
   */
  custom_item_name?: string;
  /**
   * Cover image url of the item.
   */
  item_cover_image_url?: string;
  /**
   * Min price of the item.
   */
  min_price?: number;
  /**
   * Max price of the item.
   */
  max_price?: number;
  /**
   * Stock of the item.
   */
  stock?: number;
  [key: string]: any;
}
/**
 * GetVideoList_AllowInfo sub-interface for GetVideoList_List
 */
export interface GetVideoList_AllowInfo {
  /**
   * Whether allow stitch.
   */
  allow_stitch?: boolean;
  /**
   * Whether allow duet.
   */
  allow_duet?: boolean;
  [key: string]: any;
}
/**
 * GetVideoList_ScheduledInfo sub-interface for GetVideoList_List
 */
export interface GetVideoList_ScheduledInfo {
  /**
   * Whether post it to Shopee Video at scheduled time.
   */
  scheduled_post?: boolean;
  /**
   * Scheduled post time, millisecond timestamp.
   */
  scheduled_post_time?: Date | number;
  [key: string]: any;
}
/**
 * GetVideoList_List sub-interface for GetVideoList_Response
 */
export interface GetVideoList_List {
  /**
   * ID of uploaded video.
   */
  video_upload_id?: string;
  /**
   * The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_id?: string;
  /**
   * The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_time?: Date | number;
  /**
   * Video play url.
   */
  video_url?: string;
  /**
   * Video current status. Applicable values:200: DRAFT300: POSTED400: DELETED500: SCHEDULED600: SCHEDULED_FAILED
   */
  status?: number;
  /**
   * Cover image url of the Shopee Video.
   */
  cover_image_url?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Video duration time in millisecond.
   */
  duration?: number;
  /**
   * View count of post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  views?: number;
  /**
   * Like count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  likes?: number;
  /**
   * Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  comments?: number;
  /**
   * Whether there is video metric data.
   */
  has_performance?: boolean;
  /**
   * List of products linked with the Shopee Video.
   */
  item_list?: GetVideoList_Item[];
  /**
   * Whether allow stitch and duet.
   */
  allow_info?: GetVideoList_AllowInfo;
  /**
   * When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty.
   */
  scheduled_info?: GetVideoList_ScheduledInfo;
  /**
   * The lasted update time the video.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * GetVideoList_Response sub-interface for GetVideoListResponse
 */
export interface GetVideoList_Response {
  /**
   * The total count of video that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  has_more?: boolean;
  /**
   * The list of video that match the condition.
   */
  list?: GetVideoList_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_video_list
 */
export type GetVideoListResponseData = GetVideoList_Response;
/**
 * Response payload for get_video_list
 *
 * Get the list of video in draft status or video already post to Shopee Video.
 */
export type GetVideoListResponse = FetchResponse<GetVideoListResponseData>;
/**
 * Request parameters for get_video_performance_list
 *
 * Get specific performance data for individual post Shopee Video. There is at least a one-day delay.
 */
export interface GetVideoPerformanceListRequest {
  /**
   * The start index of request. Starting from 1.
   */
  page_no?: number;
  /**
   * The number of video returned by this request. Max is 20.
   */
  page_size?: number;
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type.
   */
  period_type?: string;
  /**
   * The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month.
   */
  end_date?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Use this field to specify which field to use to sort the returned list. Available values:ViewsLikesCommentsAvgViewsDuration
   */
  order_by?: string;
  /**
   * Use this field to specify whether the returned list is sorted in ascending or descending order_by. Available values:ascdesc
   */
  sort?: string;
  [key: string]: any;
}
/**
 * GetVideoPerformanceList_List sub-interface for GetVideoPerformanceList_Response
 */
export interface GetVideoPerformanceList_List {
  /**
   * ID of uploaded video.
   */
  video_upload_id?: string;
  /**
   * The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_id?: string;
  /**
   * The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  post_time?: Date | number;
  /**
   * Video play url.
   */
  video_url?: string;
  /**
   * Video current status. Applicable values:300: POSTED400: DELETED
   */
  status?: number;
  /**
   * Cover image url of the Shopee Video.
   */
  cover_image_url?: string;
  /**
   * Description of the Shopee Video.
   */
  caption?: string;
  /**
   * Video duration time in millisecond.
   */
  duration?: string;
  /**
   * View count of post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  views?: number;
  /**
   * Like count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  likes?: number;
  /**
   * Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  comments?: number;
  /**
   * Share count the post Shopee Video. Only have value when the video status is 300 (POSTED).
   */
  shares?: number;
  /**
   * Total watch duration per video.
   */
  avg_views_duration?: number;
  /**
   * Video completion rate.
   */
  completion_rate?: number;
  /**
   * The number of placed orders for the video.
   */
  placed_orders?: number;
  /**
   * The number of confirmed orders for the video.
   */
  confirmed_orders?: number;
  /**
   * The placed value of orders for the video.
   */
  placed_sales?: number;
  /**
   * The confirmed value of orders for the video.
   */
  confirmed_sales?: number;
  /**
   * Number of item sold from placed orders in the video.
   */
  placed_item_sold?: number;
  /**
   * Number of item sold from confirmed orders in the video.
   */
  confirmed_item_sold?: number;
  /**
   * Data Date Range.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * GetVideoPerformanceList_Response sub-interface for GetVideoPerformanceListResponse
 */
export interface GetVideoPerformanceList_Response {
  /**
   * The total count of video that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data.
   */
  has_more?: boolean;
  /**
   * The list of video that match the condition.
   */
  list?: GetVideoPerformanceList_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_video_performance_list
 */
export type GetVideoPerformanceListResponseData = GetVideoPerformanceList_Response;
/**
 * Response payload for get_video_performance_list
 *
 * Get specific performance data for individual post Shopee Video. There is at least a one-day delay.
 */
export type GetVideoPerformanceListResponse = FetchResponse<GetVideoPerformanceListResponseData>;
/**
 * Request parameters for post_video
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, then call the v2.video.edit_video_info API to set video post information, finally call this API to post the video to Shopee Video.
 */
export interface PostVideoRequest {
  /**
   * ID of uploaded video. Obtain from v2.media.get_video_upload_result. No more than 5.
   */
  video_upload_id_list?: string[];
  [key: string]: any;
}
/**
 * PostVideo_Success sub-interface for PostVideo_Response
 */
export interface PostVideo_Success {
  /**
   * The video_upload_id post successfully.
   */
  success_video_upload_id?: string;
  /**
   * The unique identifier for post Shopee Video.
   */
  post_id?: string;
  [key: string]: any;
}
/**
 * PostVideo_Failure sub-interface for PostVideo_Response
 */
export interface PostVideo_Failure {
  /**
   * Failed video_upload_id.
   */
  fail_video_upload_id?: string;
  /**
   * Failed reason of the corresponding video_upload_id.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * PostVideo_Response sub-interface for PostVideoResponse
 */
export interface PostVideo_Response {
  /**
   * The list of video post successfully.
   */
  success_list?: PostVideo_Success[];
  /**
   * The list of video post failed.
   */
  failure_list?: PostVideo_Failure[];
  [key: string]: any;
}
/**
 * Response data payload for post_video
 */
export type PostVideoResponseData = PostVideo_Response;
/**
 * Response payload for post_video
 *
 * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, then call the v2.video.edit_video_info API to set video post information, finally call this API to post the video to Shopee Video.
 */
export type PostVideoResponse = FetchResponse<PostVideoResponseData>;
