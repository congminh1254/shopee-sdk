import type { FetchResponse } from "./fetch.js";

// ==================== delete_video ====================

export interface DeleteVideoParams {
  /** You can only select one from video_upload_id_list and post_id_list: - If you want to delete video with draft status, please pass video_upload_id_list.- If you want to delete video with post status, please pass post_id_list. */
  videoUploadIdList?: string[];
  /** You can only select one from video_upload_id_list and post_id_list: - If you want to delete video with draft status, please pass video_upload_id_list.- If you want to delete video with post status, please pass post_id_list. */
  postIdList?: string[];
}

export interface DeleteVideoSuccessList {
  /** The video_upload_id delete successfully. */
  successVideoUploadId?: string;
  /** The post_id delete successfully. */
  successPostId?: string;
}

export interface DeleteVideoFailureList {
  /** Failed video_upload_id. */
  failVideoUploadId?: string;
  /** Failed post_id. */
  failPostId?: string;
  /** Failed reason of the corresponding video_upload_id or post_id. */
  failedReason?: string;
}

export interface DeleteVideoResponseData {
  /** The list of video delete successfully. */
  successList?: DeleteVideoSuccessList[];
  /** The list of video delete deleted. */
  failureList?: DeleteVideoFailureList[];
}

export type DeleteVideoResponse = FetchResponse<DeleteVideoResponseData>;

// ==================== edit_video_info ====================

export interface EditVideoInfoParams {
  /** Video information collection, no more than 5. */
  videoUploadList: EditVideoInfoVideoUploadList[];
}

export interface EditVideoInfoVideoUploadList {
  /** ID of uploaded video. Obtain from v2.media.get_video_upload_result. */
  videoUploadId: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Selected cover image url of the Shopee Video. Obtain from v2.video.get_cover_list. */
  coverImageUrl: string;
  /** List of products to be linked with the Shopee Video, no more than 6. */
  itemInfo?: EditVideoInfoVideoUploadListItemInfo[];
  /** Whether allow stitch and duet. */
  allowInfo: EditVideoInfoVideoUploadListAllowInfo;
  /** When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty. */
  scheduledInfo: EditVideoInfoVideoUploadListScheduledInfo;
}

export interface EditVideoInfoVideoUploadListItemInfo {
  /** Shopee's unique identifier for an item. */
  itemId: number;
  /** Product display name in Shopee Video. */
  customItemName?: string;
}

export interface EditVideoInfoVideoUploadListAllowInfo {
  /** Whether allow duet. */
  allowDuet: boolean;
  /** Whether allow stitch. */
  allowStitch: boolean;
}

export interface EditVideoInfoVideoUploadListScheduledInfo {
  /** Whether post it to Shopee Video at scheduled time. */
  scheduledPost: boolean;
  /** Scheduled post time, millisecond timestamp. When scheduled_post is true, scheduled_post_time must not empty. */
  scheduledPostTime?: number;
}

export interface EditVideoInfoFailureList {
  /** Failed video_upload_id. */
  failVideoUploadId?: string;
  /** Failed reason of the corresponding video_upload_id. */
  failedReason?: string;
}

export interface EditVideoInfoResponseData {
  /** The list of video_upload_id edit successfully. */
  successList?: string[];
  /** The list of video_upload_id edit failed. */
  failureList?: EditVideoInfoFailureList[];
}

export type EditVideoInfoResponse = FetchResponse<EditVideoInfoResponseData>;

// ==================== get_cover_list ====================

export interface GetCoverListParams {
  /** ID of uploaded video. Obtain from v2.media.get_video_upload_result. */
  videoUploadId: string;
}

export interface GetCoverListResponseData {
  /** List of image url for each frame of the uploaded video, you can select one as the video cover when calling v2.video.edit_video_info. */
  imageUrlList?: string[];
}

export type GetCoverListResponse = FetchResponse<GetCoverListResponseData>;

// ==================== get_metric_trend ====================

export interface GetMetricTrendParams {
  /** Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type. */
  periodType: string;
  /** The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month. */
  endDate: string;
}

export interface GetMetricTrendVideoTotalMetricList {
  /** The placed value of orders from all videos in the period selected. */
  placedSales?: number;
  /** The confirmed value of orders from all videos in the period selected. */
  confirmedSales?: number;
  /** The number of placed orders from all videos in the period selected. */
  placedOrders?: number;
  /** The number of confirmed orders from all videos in the period selected. */
  confirmedOrders?: number;
  /** Number of item sold from placed orders in the video. */
  placedItemSold?: number;
  /** Number of item sold from confirmed orders in the video. */
  confirmedItemSold?: number;
  /** Number of viewers in the video. */
  totalViewers?: number;
  /** Number of views from the video that lasted for more than 3 seconds. */
  effectiveViews?: number;
  /** Total watch duration per video. */
  avgViewDuration?: number;
  /** Number of unique buyers who placed order from the video. */
  placedBuyers?: number;
  /** Number of unique buyers who confirmed order from the video. */
  confirmedBuyers?: number;
  /** Number of "Add To Cart" button clicked for all products in the orange bag during video viewing. */
  totalAtc?: number;
  /** Number of products clicks divided by Number of video views. */
  ctr?: number;
  /** Number of placed product orders from the video divided by Number of product clicks from the video. */
  placedCoRate?: number;
  /** Number of confirmed product orders from the video divided by Number of product clicks from the video. */
  confirmedCoRate?: number;
  /** Total placed sales divided by Total placed orders. */
  placedAbs?: number;
  /** Total confirmed sales divided by Total confirmed orders. */
  confirmedAbs?: number;
  /** The placed Sales generated for every 1,000 views. */
  placedGpm?: number;
  /** The confirmed Sales generated for every 1,000 views. */
  confirmedGpm?: number;
  /** Videos with at least one product in the orange bag */
  videoWithProducts?: number;
  /** Videos that generates placed revenues. */
  placedRevenueGeneratingVideos?: number;
  /** Videos that generates confirmed revenues. */
  confirmedRevenueGeneratingVideos?: number;
  /** Number of views from all videos. */
  totalViews?: number;
  /** Number of likes from all videos. */
  totalLikes?: number;
  /** Number of shares from all videos. */
  totalShares?: number;
  /** Number of comments from all videos. */
  totalComments?: number;
  /** Number of new followers from all videos. */
  videoNewFollowers?: number;
  /** Data offline computation time. */
  dataPeriod?: string;
}

export interface GetMetricTrendResponseData {
  videoTotalMetricList?: GetMetricTrendVideoTotalMetricList[];
}

export type GetMetricTrendResponse = FetchResponse<GetMetricTrendResponseData>;

// ==================== get_overview_performance ====================

export interface GetOverviewPerformanceParams {
  /** Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type. */
  periodType: string;
  /** The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month. */
  endDate: string;
}

export interface GetOverviewPerformanceKeyMetric {
  /** The placed value of orders from all videos in the period selected. */
  placedSales?: number;
  /** The confirmed value of orders from all videos in the period selected. */
  confirmedSales?: number;
  /** The number of placed orders from all videos in the period selected. */
  placedOrders?: number;
  /** The number of confirmed orders from all videos in the period selected. */
  confirmedOrders?: number;
  /** Number of item sold from placed orders in the video. */
  placedItemSold?: number;
  /** Number of item sold from confirmed orders in the video. */
  confirmedItemSold?: number;
  /** Number of viewers of the video. */
  totalViewers?: number;
  /** Number of views for the video that lasted for more than 3 seconds. */
  effectiveViews?: number;
  /** Total watch duration per video. */
  avgViewDuration?: number;
}

export interface GetOverviewPerformanceConversion {
  /** Number of unique buyers who placed order from the video. */
  placedBuyers?: number;
  /** Number of unique buyers who confirmed order from the video. */
  confirmedBuyers?: number;
  /** Number of "Add To Cart" button clicked for all products in the orange bag during video viewing. */
  totalAtc?: number;
  /** Number of products clicks divided by Number of video views. */
  ctr?: number;
  /** Number of placed product orders from the video divided by Number of product clicks from the video. */
  placedCoRate?: number;
  /** Number of confirmed product orders from the video divided by Number of product clicks from the video. */
  confirmedCoRate?: number;
  /** Total placed sales divided by Total placed orders. */
  placedAbs?: number;
  /** Total confirmed sales divided by Total confirmed orders. */
  confirmedAbs?: number;
  /** The placed Sales generated for every 1,000 views. */
  placedGpm?: number;
  /** The confirmed Sales generated for every 1,000 views. */
  confirmedGpm?: number;
  /** Videos with at least one product in the orange bag. */
  videoWithProducts?: number;
  /** Videos that generates placed revenues. */
  placedRevenueGeneratingVideos?: number;
  /** Videos that generates confirmed revenues. */
  confirmedRevenueGeneratingVideos?: number;
}

export interface GetOverviewPerformanceEngagement {
  /** Number of views from all videos */
  totalViews?: number;
  /** Number of likes from all videos */
  totalLikes?: number;
  /** Number of shares from all videos */
  totalShares?: number;
  /** Number of comments from all videos */
  totalComments?: number;
  /** Number of new followers from all videos */
  videoNewFollowers?: number;
}

export interface GetOverviewPerformanceResponseData {
  keyMetric?: GetOverviewPerformanceKeyMetric;
  conversion?: GetOverviewPerformanceConversion;
  engagement?: GetOverviewPerformanceEngagement;
  /** Data offline computation time. */
  fetchedDateRange?: string;
}

export type GetOverviewPerformanceResponse = FetchResponse<GetOverviewPerformanceResponseData>;

// ==================== get_product_performance_list ====================

export interface GetProductPerformanceListParams {
  /** The start index of request. Starting from 1. */
  pageNo: number;
  /** The number of item returned by this request. Max is 20. */
  pageSize: number;
  /** Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type. */
  periodType: string;
  /** The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month. */
  endDate: string;
  /** Use this field to specify which field to use to sort the returned list. Available values:PlacedOrdersPlacedSalesPlacedUniqueBuyersConfirmedOrdersConfirmedSalesConfirmedUniqueBuyers */
  orderBy: string;
  /** Use this field to specify whether the returned list is sorted in ascending or descending order_by. Available values:ascdesc */
  sort: string;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Search by product name. */
  itemName?: string;
}

export interface GetProductPerformanceListList {
  /** Shopee's unique identifier for a shop. */
  shopId?: number;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Name of the item. */
  itemName?: string;
  /** Cover image url of the item. */
  itemCoverImageUrl?: string;
  /** Description of the item. */
  itemDescription?: string;
  /** The number of placed orders for the item. */
  placedOrders?: number;
  /** The number of confirmed orders for the item. */
  confirmedOrders?: number;
  /** The placed value of orders for the item. */
  placedSales?: number;
  /** The confirmed value of orders for the item. */
  confirmedSales?: number;
  /** Number of unique buyers who placed order for the item. */
  placedUniqueBuyers?: number;
  /** Number of unique buyers who confirmed order for the item. */
  confirmedUniqueBuyers?: number;
  /** Data Date Range. */
  fetchedDateRange?: string;
}

export interface GetProductPerformanceListResponseData {
  /** The total count of product that match the condition. */
  totalCount?: number;
  /** This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data. */
  hasMore?: boolean;
  /** The list of product that match the condition. */
  list?: GetProductPerformanceListList[];
}

export type GetProductPerformanceListResponse =
  FetchResponse<GetProductPerformanceListResponseData>;

// ==================== get_user_demographics ====================

export interface GetUserDemographicsParams {}

export interface GetUserDemographicsResponseData {
  /** The age distribution of your viewers.Note: The type of age is a map. The key is an enumerated value corresponding to an age range: -1: Unknown1: 18-24 years old2: 25-34 years old3: 35-44 years old4: 45+ years oldThe value is the number of viewers in each age group. */
  age?: object;
  /** The gender distribution of your viewers.Note: The type of gender is a map. The key is one of: MaleFemalePredicted MalePredicted FemaleThe value is the number of viewers for each gender type. */
  gender?: object;
  /** The geographic distribution of your viewers. Note: The type of location is a map. The key is top 10 city, and the value is the number of viewers in each city. */
  location?: object;
  /** The distribution of viewers based on whether they follow your Shopee Video profile.Note: The type of identity is a map. The key is either "follow" or "unfollow", indicating followers and non-followers respectively, and the value is number of page views generated by each group. */
  identity?: object;
  /** The distribution of video views across different hours of the day.Note: The type of activity is a map. The key is the hour of the day (ranging from 0 to 23), and the value is the number of video views generated during that specific hour. */
  activity?: object;
  /** The types of videos that your viewer is most interested in.Note: The type of content is a map. The key is top 10 content category, and the value is the number of video views corresponding to that content category. */
  content?: object;
  /** The types of products that your viewers is most interested in.Note: The type of shopping is a map. The key is top 10 product category, and the value is the number of video views corresponding to that product category. */
  shopping?: object;
}

export type GetUserDemographicsResponse = FetchResponse<GetUserDemographicsResponseData>;

// ==================== get_video_detail ====================

export interface GetVideoDetailParams {
  /** You can only select one from video_upload_id and post_id: - If you want to get detail information of video with draft status, please pass video_upload_id.- If you want to get detail information of video with post status, please pass post_id. */
  videoUploadId?: string;
  /** You can only select one from video_upload_id and post_id: - If you want to get detail information of video with draft status, please pass video_upload_id.- If you want to get detail information of video with post status, please pass post_id. */
  postId?: string;
}

export interface GetVideoDetailItemList {
  /** Shopee's unique identifier for a shop of the item. */
  shopId?: number;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Name of the item. */
  itemName?: string;
  /** Name of the item displayed on Shopee Video (max 255 characters). */
  customItemName?: string;
  /** Cover image url of the item. */
  itemCoverImageUrl?: string;
  /** Min price of the item. */
  minPrice?: number;
  /** Max price of the item. */
  maxPrice?: number;
  /** Stock of the item. */
  stock?: number;
}

export interface GetVideoDetailAllowInfo {
  /** Whether allow stitch. */
  allowStitch?: boolean;
  /** Whether allow duet. */
  allowDuet?: boolean;
}

export interface GetVideoDetailScheduledInfo {
  /** Whether post it to Shopee Video at scheduled time. */
  scheduledPost?: boolean;
  /** Scheduled post time, millisecond timestamp. */
  scheduledPostTime?: number;
}

export interface GetVideoDetailResponseData {
  /** ID of uploaded video. */
  videoUploadId?: string;
  /** The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED). */
  postId?: string;
  /** The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED). */
  postTime?: number;
  /** Video play url. */
  videoUrl?: string;
  /** Video current status. Applicable values:200: DRAFT300: POSTED400: DELETED500: SCHEDULED600: SCHEDULED_FAILED */
  status?: number;
  /** Cover image url of the Shopee Video. */
  coverImageUrl?: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Video duration time in millisecond. */
  duration?: number;
  /** View count of post Shopee Video. Only have value when the video status is 300 (POSTED). */
  views?: number;
  /** Like count of post Shopee Video. Only have value when the video status is 300 (POSTED). */
  likes?: number;
  /** Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  comments?: number;
  /** Whether there is video metric data. */
  hasPerformance?: boolean;
  /** List of products linked with the Shopee Video. */
  itemList?: GetVideoDetailItemList[];
  /** Whether allow stitch and duet. */
  allowInfo?: GetVideoDetailAllowInfo;
  /** When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty. */
  scheduledInfo?: GetVideoDetailScheduledInfo;
  /** The lasted update time the video. */
  updateTime?: number;
}

export type GetVideoDetailResponse = FetchResponse<GetVideoDetailResponseData>;

// ==================== get_video_detail_audience_distribution ====================

export interface GetVideoDetailAudienceDistributionParams {
  /** A unique identifier for Shopee videos. */
  postId: string;
}

export interface GetVideoDetailAudienceDistributionResponseData {
  /** The age distribution of your viewers.Note: The type of age is a map. The key is an enumerated value corresponding to an age range: -1: Unknown1: 18-24 years old2: 25-34 years old3: 35-44 years old4: 45+ years oldThe value is the number of viewers in each age group. */
  age?: object;
  /** The gender distribution of your viewers.Note: The type of gender is a map. The key is one of: malefemalepredictedMalepredictedFemaleunknownThe value is the number of viewers for each gender type. */
  gender?: object;
  /** The geographic distribution of your viewers. Note: The type of location is a map. The key is top 10 city, and the value is the number of viewers in each city. */
  location?: object;
  /** The distribution of viewers based on whether they follow your Shopee Video profile.Note: The type of identity is a map. The key is one of: 0: Non-follower1: FollowerThe value is number of user views generated by each group. */
  identity?: object;
  /** The distribution of video views across different hours of the day.Note: The type of activity is a map. The key is the hour of the day (ranging from 0 to 23), and the value is the number of video views generated during that specific hour. */
  activity?: object;
  /** The types of videos that your viewer is most interested in.Note: The type of content is a map. The key is content category, and the value is the number of video views corresponding to that content category. */
  content?: object;
  /** The types of products that your viewers is most interested in.Note: The type of shopping is a map. The key is product category, and the value is the number of video views corresponding to that product category. */
  shopping?: object;
}

export type GetVideoDetailAudienceDistributionResponse =
  FetchResponse<GetVideoDetailAudienceDistributionResponseData>;

// ==================== get_video_detail_metric_trend ====================

export interface GetVideoDetailMetricTrendParams {
  /** A unique identifier for Shopee videos. */
  postId: string;
  /** The name of metric that require obtaining trend data. Applicable values: Views, Likes, Comments, Shares, FollowersGrowth, PlacedOrders, PlacedSales, UniqueBuyers, ConversionRate, SoldItems, SalesPerOrder, SalesPerBuyer */
  metricName: string;
}

export interface GetVideoDetailMetricTrendResponseData {
  /** The type of metric_trend is a map. The key is date (in millisecond timestamp format), and the value is the number corresponding to metric. */
  metricTrend?: object;
}

export type GetVideoDetailMetricTrendResponse =
  FetchResponse<GetVideoDetailMetricTrendResponseData>;

// ==================== get_video_detail_performance ====================

export interface GetVideoDetailPerformanceParams {
  /** A unique identifier for Shopee videos. */
  postId: string;
}

export interface GetVideoDetailPerformanceVideoInfo {
  /** A unique identifier for Shopee videos. */
  postId?: string;
  /** The time when the video post to Shopee Video. */
  postTime?: number;
  /** Video play url. */
  videoUrl?: string;
  /** Cover image url of the Shopee Video. */
  coverImageUrl?: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Video duration time in millisecond. */
  duration?: number;
  /** Number of products linked with the Shopee Video. */
  relatedItemCount?: number;
}

export interface GetVideoDetailPerformanceVideoPerformance {
  /** Amount of views from the video. */
  views?: number;
  /** Total likes from the video. */
  likes?: number;
  /** Total comments from the video. */
  comments?: number;
  /** Total shares from the video. */
  shares?: number;
  /** Amount of new followers from the Video. */
  followersGrowth?: number;
  /** Amount of product orders from the video. */
  placedOrders?: number;
  /** Amount of product sales from the video. */
  placedSales?: number;
  /** Buyers of the products in the video. */
  uniqueBuyers?: number;
  /** Amount of products sold from the video/amount of views from the video. */
  conversionRate?: number;
  /** Amount of products sold from the video. */
  soldItems?: number;
  /** The product click value of orders for item. */
  productClicks?: number;
  /** The product click rate value of orders for item. */
  productClickRate?: number;
  /** Amount of product sales from the video/amount of product orders from the video. */
  salesPerOrder?: number;
  /** Amount of product sales from the video/amount of buyers from the video. */
  salesPerBuyer?: number;
}

export interface GetVideoDetailPerformanceResponseData {
  /** Video post detail informations you are querying. */
  videoInfo?: GetVideoDetailPerformanceVideoInfo;
  /** Overall performance data of the video you are querying. */
  videoPerformance?: GetVideoDetailPerformanceVideoPerformance;
}

export type GetVideoDetailPerformanceResponse =
  FetchResponse<GetVideoDetailPerformanceResponseData>;

// ==================== get_video_detail_product_performance ====================

export interface GetVideoDetailProductPerformanceParams {
  /** The start index of request. Starting from 1. */
  pageNo: number;
  /** The number of item returned by this request. Max is 20. */
  pageSize: number;
  /** The unique identifier for post Shopee Video. */
  postId: string;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Name of the item. */
  itemName?: string;
}

export interface GetVideoDetailProductPerformanceList {
  /** Shopee's unique identifier for a shop. */
  shopId?: number;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Name of the item. */
  itemName?: string;
  /** Cover image url of the item. */
  itemCoverImageUrl?: string;
  /** Description of the item. */
  itemDescription?: string;
  /** Like count the post Shopee Video. */
  likes?: number;
  /** Comment count the post Shopee Video. */
  comments?: number;
  /** Amount of product orders from the video. */
  placedOrders?: number;
  /** Amount of product sales from the video. */
  placedSales?: number;
  /** Buyers of the product in the video. */
  uniqueBuyers?: number;
  /** Amount of products sold from the video. */
  soldItems?: number;
  /** Amount of product clicks from the video. */
  productClicks?: number;
  /** Amount of product clicks from the video/Product view from video. */
  productClickRate?: number;
  /** Amount of products sold from the video/amount of views from the video. */
  conversionRate?: number;
  /** Amount of product sales from the video/amount of product orders from the video. */
  salesPerOrder?: number;
  /** Amount of product sales from the video/amount of buyers from the video. */
  salesPerBuyer?: number;
}

export interface GetVideoDetailProductPerformanceResponseData {
  /** The list of item that match the condition. */
  list?: GetVideoDetailProductPerformanceList[];
  /** The total count of video that match the condition. */
  totalCount?: number;
  /** This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data. */
  hasMore?: boolean;
}

export type GetVideoDetailProductPerformanceResponse =
  FetchResponse<GetVideoDetailProductPerformanceResponseData>;

// ==================== get_video_list ====================

export interface GetVideoListParams {
  /** The start index of request. Starting from 1. */
  pageNo: number;
  /** The number of affiliate returned by this request, Max is 20. */
  pageSize: number;
  /** Search tpye for video in draft status or video already post to Shopee Video.1: draft2: post */
  listType: number;
}

export interface GetVideoListList {
  /** ID of uploaded video. */
  videoUploadId?: string;
  /** The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED). */
  postId?: string;
  /** The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED). */
  postTime?: number;
  /** Video play url. */
  videoUrl?: string;
  /** Video current status. Applicable values:200: DRAFT300: POSTED400: DELETED500: SCHEDULED600: SCHEDULED_FAILED */
  status?: number;
  /** Cover image url of the Shopee Video. */
  coverImageUrl?: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Video duration time in millisecond. */
  duration?: number;
  /** View count of post Shopee Video. Only have value when the video status is 300 (POSTED). */
  views?: number;
  /** Like count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  likes?: number;
  /** Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  comments?: number;
  /** Whether there is video metric data. */
  hasPerformance?: boolean;
  /** List of products linked with the Shopee Video. */
  itemList?: GetVideoListListItemList[];
  /** Whether allow stitch and duet. */
  allowInfo?: GetVideoListListAllowInfo;
  /** When scheduled_post is true, scheduled_post_time must not empty.When scheduled_post is false, scheduled_post_time must empty. */
  scheduledInfo?: GetVideoListListScheduledInfo;
  /** The lasted update time the video. */
  updateTime?: number;
}

export interface GetVideoListListItemList {
  /** Shopee's unique identifier for a shop of the item. */
  shopId?: number;
  /** Shopee's unique identifier for an item. */
  itemId?: number;
  /** Name of the item. */
  itemName?: string;
  /** Name of the item displayed on Shopee Video (max 255 characters). */
  customItemName?: string;
  /** Cover image url of the item. */
  itemCoverImageUrl?: string;
  /** Min price of the item. */
  minPrice?: number;
  /** Max price of the item. */
  maxPrice?: number;
  /** Stock of the item. */
  stock?: number;
}

export interface GetVideoListListAllowInfo {
  /** Whether allow stitch. */
  allowStitch?: boolean;
  /** Whether allow duet. */
  allowDuet?: boolean;
}

export interface GetVideoListListScheduledInfo {
  /** Whether post it to Shopee Video at scheduled time. */
  scheduledPost?: boolean;
  /** Scheduled post time, millisecond timestamp. */
  scheduledPostTime?: number;
}

export interface GetVideoListResponseData {
  /** The total count of video that match the condition. */
  totalCount?: number;
  /** This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data. */
  hasMore?: boolean;
  /** The list of video that match the condition. */
  list?: GetVideoListList;
}

export type GetVideoListResponse = FetchResponse<GetVideoListResponseData>;

// ==================== get_video_performance_list ====================

export interface GetVideoPerformanceListParams {
  /** The start index of request. Starting from 1. */
  pageNo: number;
  /** The number of video returned by this request. Max is 20. */
  pageSize: number;
  /** Period Type. Applicable values:DayWeekMonthLast7dLast15dLast30dNote: The end date must align with the Period Type. */
  periodType: string;
  /** The end_date format should be "YYYY-MM-DD".- For Day, Last7d, Last15d, and Last30d, the end_date must before current day.- For Week, the end_date must be Sunday and must be less than or equal to the current week.- For Month, the end_date must be the end of the month and must be less than or equal to the current month. */
  endDate: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Use this field to specify which field to use to sort the returned list. Available values:ViewsLikesCommentsAvgViewsDuration */
  orderBy: string;
  /** Use this field to specify whether the returned list is sorted in ascending or descending order_by. Available values:ascdesc */
  sort: string;
}

export interface GetVideoPerformanceListList {
  /** ID of uploaded video. */
  videoUploadId?: string;
  /** The unique identifier for post Shopee Video. Only have value when the video status is 300 (POSTED). */
  postId?: string;
  /** The time when the video post to Shopee Video. Only have value when the video status is 300 (POSTED). */
  postTime?: number;
  /** Video play url. */
  videoUrl?: string;
  /** Video current status. Applicable values:300: POSTED400: DELETED */
  status?: number;
  /** Cover image url of the Shopee Video. */
  coverImageUrl?: string;
  /** Description of the Shopee Video. */
  caption?: string;
  /** Video duration time in millisecond. */
  duration?: number;
  /** View count of post Shopee Video. Only have value when the video status is 300 (POSTED). */
  views?: number;
  /** Like count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  likes?: number;
  /** Comment count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  comments?: number;
  /** Share count the post Shopee Video. Only have value when the video status is 300 (POSTED). */
  shares?: number;
  /** Total watch duration per video. */
  avgViewsDuration?: number;
  /** Video completion rate. */
  completionRate?: number;
  /** The number of placed orders for the video. */
  placedOrders?: number;
  /** The number of confirmed orders for the video. */
  confirmedOrders?: number;
  /** The placed value of orders for the video. */
  placedSales?: number;
  /** The confirmed value of orders for the video. */
  confirmedSales?: number;
  /** Number of item sold from placed orders in the video. */
  placedItemSold?: number;
  /** Number of item sold from confirmed orders in the video. */
  confirmedItemSold?: number;
  /** Data Date Range. */
  fetchedDateRange?: string;
}

export interface GetVideoPerformanceListResponseData {
  /** The total count of video that match the condition. */
  totalCount?: number;
  /** This is to indicate whether the video list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of data. */
  hasMore?: boolean;
  /** The list of video that match the condition. */
  list?: GetVideoPerformanceListList[];
}

export type GetVideoPerformanceListResponse = FetchResponse<GetVideoPerformanceListResponseData>;

// ==================== post_video ====================

export interface PostVideoParams {
  /** ID of uploaded video. Obtain from v2.media.get_video_upload_result. No more than 5. */
  videoUploadIdList: string[];
}

export interface PostVideoSuccessList {
  /** The video_upload_id post successfully. */
  successVideoUploadId?: string;
  /** The unique identifier for post Shopee Video. */
  postId?: string;
}

export interface PostVideoFailureList {
  /** Failed video_upload_id. */
  failVideoUploadId?: string;
  /** Failed reason of the corresponding video_upload_id. */
  failedReason?: string;
}

export interface PostVideoResponseData {
  /** The list of video post successfully. */
  successList?: PostVideoSuccessList[];
  /** The list of video post failed. */
  failureList?: PostVideoFailureList[];
}

export type PostVideoResponse = FetchResponse<PostVideoResponseData>;
