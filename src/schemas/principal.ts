// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * GetClipVideoPerformanceVideo sub-interface for GetClipVideoPerformanceRequest
 */
export interface GetClipVideoPerformanceVideo {
  /**
   * Shop identifier that owns the specified videos.Limitations:- Required for every object in video_list.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * List of video identifiers to be queried under the specified shop.Limitations:- Required for every object in video_list.- Must contain at least one video_id.- Must contain at most 100 video_ids per object.- Null video_id values are rejected.- Duplicate video_id values across the whole request are rejected.- Across the whole request, the total number of unique video_ids must not exceed 100.
   */
  video_ids: number[];
  /**
   * Currency used for amount-based metrics for the specified videos.Limitations:- Optional for every object in video_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_clip_video_performance
 *
 * Queries video clip performance data for the specified videos within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and video-level detailed metrics.
 */
export interface GetClipVideoPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of video clip query targets.Limitations:- Must contain at least one object.- Must contain at most 100 objects.- Every shop_id must belong to the specified principal_id.- Duplicate shop_id values are rejected.- Each object must provide a non-empty video_ids list.- Null video_id values are rejected.- Duplicate video_id values across the whole request are rejected.- The total number of unique video_ids across the whole request must not exceed 100.
   */
  video_list?: GetClipVideoPerformanceVideo[];
  /**
   * Number of detail records to return in the current response page.Limitations:- Only supported when video_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive.
   */
  page_size?: number;
  /**
   * Zero-based offset of the first detail record to return.Limitations:- Only supported when video_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0.
   */
  cursor?: number;
}
/**
 * GetClipVideoPerformanceSummary sub-interface for GetClipVideoPerformanceResponseData
 */
export interface GetClipVideoPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary.
   */
  currency?: string;
  /**
   * Total views from the selected videos.
   */
  total_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Video duration in minutes.
   */
  video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of Like clicks from the selected videos.
   */
  likes?: number;
  /**
   * Number of comments generated from the selected videos.
   */
  comments?: number;
  /**
   * Number of shares created from the selected videos.
   */
  share?: number;
  /**
   * Number of unique buyers who placed order from the selected videos. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during the selected videos.
   */
  atc_units?: number;
  /**
   * Number of items sold from placed orders during the selected videos.
   */
  units_sold?: number;
  /**
   * Number of placed orders (paid and unpaid) during the selected videos, including cancelled orders.
   */
  orders?: number;
  /**
   * Value of placed orders (paid and unpaid) from the selected videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Video orders / total video views.
   */
  conversion_rate?: number;
}
/**
 * GetClipVideoPerformanceDetail sub-interface for GetClipVideoPerformanceResponseData
 */
export interface GetClipVideoPerformanceDetail {
  /**
   * Region code of the shop that owns this video.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this video item.
   */
  currency?: string;
  /**
   * Shop identifier that owns this video.
   */
  shop_id?: number;
  /**
   * Shop name that owns this video.
   */
  shop_name?: string;
  /**
   * Video identifier.
   */
  video_id?: number;
  /**
   * Video name.
   */
  video_name?: string;
  /**
   * Total views from this video.
   */
  total_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Video duration in minutes.
   */
  video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of Like clicks from this video.
   */
  likes?: number;
  /**
   * Number of comments generated from this video.
   */
  comments?: number;
  /**
   * Number of shares created from this video.
   */
  share?: number;
  /**
   * Number of unique buyers who placed order from this video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during this video.
   */
  atc_units?: number;
  /**
   * Number of items sold from placed orders during this video.
   */
  units_sold?: number;
  /**
   * Number of placed orders (paid and unpaid) during this video, including cancelled orders.
   */
  orders?: number;
  /**
   * Value of placed orders (paid and unpaid) from this video in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Video orders / total video views.
   */
  conversion_rate?: number;
}
/**
 * GetClipVideoPerformanceResponseData sub-interface for GetClipVideoPerformanceResponse
 */
export interface GetClipVideoPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall performance of the selected videos.Note:- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  summary?: GetClipVideoPerformanceSummary[];
  /**
   * List of video-level detail records that returns performance metrics for each selected video within the requested date range.Details are sorted by shop_id and then video_id in ascending order.- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  details?: GetClipVideoPerformanceDetail[];
  /**
   * Offset to be used in the next request for fetching the next page of detail records.Notes:- Returned only when video_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor.
   */
  next_cursor?: number;
}
/**
 * Response payload for get_clip_video_performance
 *
 * Queries video clip performance data for the specified videos within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and video-level detailed metrics.
 */
export type GetClipVideoPerformanceResponse = FetchResponse<GetClipVideoPerformanceResponseData>;
/**
 * GetContentAffiliatePerformanceContent sub-interface for GetContentAffiliatePerformanceRequest
 */
export interface GetContentAffiliatePerformanceContent {
  /**
   * Shop identifier of the target shop to be queried.Limitations:- Required for every shop object in content_list.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * List of content IDs under the specified shop_id to be queried.Limitations:- Required for every shop object in content_list.- Must contain 1 to 100 values.- Duplicate content_id values are not allowed within the request.
   */
  content_ids: number[];
  /**
   * Currency used for amount-based metrics for the specified content items.Limitations:- Optional for every object in content_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_content_affiliate_performance
 *
 * Queries affiliate performance data for the specified content items within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and content-level detailed metrics with placed-order and confirmed-order views.
 */
export interface GetContentAffiliatePerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of shops and content IDs to be queried.Limitations:- If omitted or set to [], the API returns all eligible content under the specified principal_id.- If provided, must contain 1 to 100 shop entries.- Duplicate shop_id values are not allowed.- page_size and cursor are only supported when content_list is omitted or empty.
   */
  content_list?: GetContentAffiliatePerformanceContent[];
  /**
   * Number of detail records to return in the current response page.Limitations:- Only supported when content_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive.
   */
  page_size?: number;
  /**
   * Zero-based offset of the first detail record to return.Limitations:- Only supported when content_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0.
   */
  cursor?: number;
}
/**
 * GetContentAffiliatePerformanceSummary sub-interface for GetContentAffiliatePerformanceResponseData
 */
export interface GetContentAffiliatePerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary.
   */
  currency?: string;
  /**
   * Total content views generated during the selected period.
   */
  views?: number;
  /**
   * Total content likes generated during the selected period.
   */
  likes?: number;
  /**
   * Total content comments generated during the selected period.
   */
  comments?: number;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
}
/**
 * GetContentAffiliatePerformanceDetail sub-interface for GetContentAffiliatePerformanceResponseData
 */
export interface GetContentAffiliatePerformanceDetail {
  /**
   * Region code of the shop that owns this content item.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this content item.
   */
  currency?: string;
  /**
   * Shop identifier that owns this content item.
   */
  shop_id?: number;
  /**
   * Shop name that owns this content item.
   */
  shop_name?: string;
  /**
   * Affiliate content identifier.
   */
  content_id?: number;
  /**
   * Affiliate content name.
   */
  content_name?: string;
  /**
   * Total content views generated during the selected period for this content item.
   */
  views?: number;
  /**
   * Total content likes generated during the selected period for this content item.
   */
  likes?: number;
  /**
   * Total content comments generated during the selected period for this content item.
   */
  comments?: number;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period for this content item. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period for this content item. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period for this content item.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period for this content item.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period for this content item. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period for this content item. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
}
/**
 * GetContentAffiliatePerformanceResponseData sub-interface for GetContentAffiliatePerformanceResponse
 */
export interface GetContentAffiliatePerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall affiliate performance of the selected content items. The summary currency is USD when multiple currencies are requested; otherwise it follows the single requested currency, or USD by default.
   */
  summary?: GetContentAffiliatePerformanceSummary[];
  /**
   * List of content-level detail records that returns affiliate performance metrics for each selected content item within the requested date range.Details are sorted by shop_id and then content_id in ascending order.
   */
  details?: GetContentAffiliatePerformanceDetail[];
  /**
   * Offset to be used in the next request for fetching the next page of detail records.Notes:- Returned only when content_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor.
   */
  next_cursor?: number;
}
/**
 * Response payload for get_content_affiliate_performance
 *
 * Queries affiliate performance data for the specified content items within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and content-level detailed metrics with placed-order and confirmed-order views.
 */
export type GetContentAffiliatePerformanceResponse =
  FetchResponse<GetContentAffiliatePerformanceResponseData>;
/**
 * GetPrincipalAffiliatePerformanceRegion sub-interface for GetPrincipalAffiliatePerformanceRequest
 */
export interface GetPrincipalAffiliatePerformanceRegion {
  /**
   * Region code to be queried.Limitations:- Required for every region object in region_list.- Must be a valid region code supported by the API.- Must belong to the specified principal_id.
   */
  region: string;
  /**
   * Currency used for amount-based metrics for the region.Limitations:- Optional for every region object in region_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_principal_affiliate_performance
 *
 * Queries affiliate performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics with placed-order and confirmed-order views.
 */
export interface GetPrincipalAffiliatePerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * Optional list of principal regions to be queried.Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged when they use the same currency.- The same region cannot appear with different currencies.
   */
  region_list?: GetPrincipalAffiliatePerformanceRegion[];
}
/**
 * GetPrincipalAffiliatePerformanceSummary sub-interface for GetPrincipalAffiliatePerformanceResponseData
 */
export interface GetPrincipalAffiliatePerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
  /**
   * Estimated total payout from placed affiliate marketing orders during the selected period.
   */
  estimated_commission_placed?: number;
  /**
   * Estimated total payout from confirmed affiliate marketing orders during the selected period.
   */
  estimated_commission_confirmed?: number;
  /**
   * Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_placed?: number;
  /**
   * Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_confirmed?: number;
  /**
   * Total number of unique buyers who placed affiliate marketing orders from the selected principal during the selected period.
   */
  buyers_placed?: number;
  /**
   * Total number of unique buyers with confirmed affiliate marketing orders from the selected principal during the selected period.
   */
  buyers_confirmed?: number;
  /**
   * Total number of unique new buyers who placed affiliate marketing orders from the selected principal during the selected period.
   */
  new_buyers_placed?: number;
  /**
   * Total number of unique new buyers with confirmed affiliate marketing orders from the selected principal during the selected period.
   */
  new_buyers_confirmed?: number;
}
/**
 * GetPrincipalAffiliatePerformanceDetail sub-interface for GetPrincipalAffiliatePerformanceResponseData
 */
export interface GetPrincipalAffiliatePerformanceDetail {
  /**
   * Region code of this detail item.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this region item.
   */
  currency?: string;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period for this region. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period for this region. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period for this region.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period for this region.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period for this region. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period for this region. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
  /**
   * Estimated total payout from placed affiliate marketing orders during the selected period for this region.
   */
  estimated_commission_placed?: number;
  /**
   * Estimated total payout from confirmed affiliate marketing orders during the selected period for this region.
   */
  estimated_commission_confirmed?: number;
  /**
   * Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_placed?: number;
  /**
   * Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_confirmed?: number;
  /**
   * Total number of unique buyers who placed affiliate marketing orders from this region during the selected period.
   */
  buyers_placed?: number;
  /**
   * Total number of unique buyers with confirmed affiliate marketing orders from this region during the selected period.
   */
  buyers_confirmed?: number;
  /**
   * Total number of unique new buyers who placed affiliate marketing orders from this region during the selected period.
   */
  new_buyers_placed?: number;
  /**
   * Total number of unique new buyers with confirmed affiliate marketing orders from this region during the selected period.
   */
  new_buyers_confirmed?: number;
}
/**
 * GetPrincipalAffiliatePerformanceResponseData sub-interface for GetPrincipalAffiliatePerformanceResponse
 */
export interface GetPrincipalAffiliatePerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall affiliate performance of the requested principal. Summary values are returned only when the principal has accessible shops under the selected regions.
   */
  summary?: GetPrincipalAffiliatePerformanceSummary[];
  /**
   * List of region-level detail records that returns affiliate performance metrics for each selected region within the requested date range.Note:- Details are queried from shop-level source data and then merged into region-level results in the service layer.- For de-duplicated metrics such as buyers, new_buyers, and orders, values may differ from a true region-level de-duplicated aggregation when multiple shops in the same region share overlapping users or orders.
   */
  details?: GetPrincipalAffiliatePerformanceDetail[];
}
/**
 * Response payload for get_principal_affiliate_performance
 *
 * Queries affiliate performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics with placed-order and confirmed-order views.
 */
export type GetPrincipalAffiliatePerformanceResponse =
  FetchResponse<GetPrincipalAffiliatePerformanceResponseData>;
/**
 * GetPrincipalLivestreamPerformanceRegion sub-interface for GetPrincipalLivestreamPerformanceRequest
 */
export interface GetPrincipalLivestreamPerformanceRegion {
  /**
   * Region code to be queried.Limitations:- Required for every region object in region_list.- Must be a valid region code supported by the API.- Must belong to the specified principal_id.
   */
  region: string;
  /**
   * Currency used for amount-based metrics for the region.Limitations:- Optional for every region object in region_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_principal_livestream_performance
 *
 * Queries livestream performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export interface GetPrincipalLivestreamPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * Optional list of principal regions to be queried.Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id except the aggregate regional bucket.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged for filtering purposes.- Currency defaults to USD when omitted.- When the same region appears multiple times, the first provided currency is used.
   */
  region_list?: GetPrincipalLivestreamPerformanceRegion[];
}
/**
 * GetPrincipalLivestreamPerformanceSummary sub-interface for GetPrincipalLivestreamPerformanceResponseData
 */
export interface GetPrincipalLivestreamPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of unique buyers who placed order from your Livestream.
   */
  buyers?: number;
  /**
   * Total number of likes in your Livestream.
   */
  likes?: number;
  /**
   * Total number of comments acquired during your Livestream.
   */
  comments?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Number of items sold from placed orders during your Livestream.
   */
  units_sold?: number;
  /**
   * Total views from your Livestream.
   */
  total_views?: number;
  /**
   * Total duration of your Livestream.
   */
  total_live_duration?: number;
  /**
   * Total unique viewers from your Livestream.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Livestream.
   */
  atc_units?: number;
  /**
   * Total count of Livestream sessions in the selected period.
   */
  total_livestreams?: number;
  /**
   * Average duration of your Livestream.
   */
  average_live_duration?: number;
  /**
   * Average time viewers watch your Livestreams.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from your Livestream.
   */
  new_followers?: number;
  /**
   * Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  new_buyers?: number;
  /**
   * Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  existing_buyers?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetPrincipalLivestreamPerformanceDetail sub-interface for GetPrincipalLivestreamPerformanceResponseData
 */
export interface GetPrincipalLivestreamPerformanceDetail {
  /**
   * Region code of this detail item.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this region item.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of unique buyers who placed order from your Livestream.
   */
  buyers?: number;
  /**
   * Total number of likes in your Livestream.
   */
  likes?: number;
  /**
   * Total number of comments acquired during your Livestream.
   */
  comments?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Number of items sold from placed orders during your Livestream.
   */
  units_sold?: number;
  /**
   * Total views from your Livestream.
   */
  total_views?: number;
  /**
   * Total duration of your Livestream.
   */
  total_live_duration?: number;
  /**
   * Total unique viewers from your Livestream.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Livestream.
   */
  atc_units?: number;
  /**
   * Total count of Livestream sessions in the selected period.
   */
  total_livestreams?: number;
  /**
   * Average duration of your Livestream.
   */
  average_live_duration?: number;
  /**
   * Average time viewers watch your Livestreams.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from your Livestream.
   */
  new_followers?: number;
  /**
   * Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  new_buyers?: number;
  /**
   * Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  existing_buyers?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetPrincipalLivestreamPerformanceResponseData sub-interface for GetPrincipalLivestreamPerformanceResponse
 */
export interface GetPrincipalLivestreamPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall livestream performance of the selected principal. Summary values are returned in USD when data exists.
   */
  summary?: GetPrincipalLivestreamPerformanceSummary[];
  /**
   * List of region-level detail records that returns livestream performance metrics for each selected region within the requested date range.Details are produced by aggregating shop-level livestream data into region-level results in the service layer.
   */
  details?: GetPrincipalLivestreamPerformanceDetail[];
}
/**
 * Response payload for get_principal_livestream_performance
 *
 * Queries livestream performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export type GetPrincipalLivestreamPerformanceResponse =
  FetchResponse<GetPrincipalLivestreamPerformanceResponseData>;
/**
 * GetPrincipalSalesPerformanceDetailRegion sub-interface for GetPrincipalSalesPerformanceDetailRequest
 */
export interface GetPrincipalSalesPerformanceDetailRegion {
  /**
   * Target region code of the principal to be queried.Limitations:- Required for every region object in region_list.- Must be a valid region code or region name recognized by the API, such as SG or ID.
   */
  region: string;
  /**
   * Currency used for amount-based metrics for the region.Limitations:- Optional for every region object in region_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_principal_sales_performance_detail
 *
 * Queries the business performance data aggregated at principal level for the specified regions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export interface GetPrincipalSalesPerformanceDetailRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of principal regions to be queried.Limitations:- Optional. If omitted or empty, the API queries all regions that belong to the specified principal.- Duplicate region entries are deduplicated internally.- The same region must not appear multiple times with different currency values.
   */
  region_list?: GetPrincipalSalesPerformanceDetailRegion[];
}
/**
 * GetPrincipalSalesPerformanceDetailSummary sub-interface for GetPrincipalSalesPerformanceDetailResponseData
 */
export interface GetPrincipalSalesPerformanceDetailSummary {
  /**
   * Currency code used for all monetary metrics in the summary. When multiple regions are requested, the summary currency is always USD. When exactly one region is requested, the summary currency follows that region's requested currency.
   */
  currency?: string;
  /**
   * Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * The number of placed orders, including unpaid orders.
   */
  orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.
   */
  units_sold?: number;
  /**
   * Average Basket Size = Sales ÷ Orders. It measures average sales per order.
   */
  average_basket_size?: number;
  /**
   * Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction.
   */
  items_per_order?: number;
  /**
   * Average selling price = Sales ÷ Units Sold. It measures average sales per unit.
   */
  average_selling_price?: number;
  /**
   * Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023.
   */
  product_clicks?: number;
  /**
   * The number of visits to the product page.
   */
  product_views?: number;
  /**
   * Total number of unique visitors who viewed your shop or product pages over the selected time period. Multiple views by the same visitor are counted as 1 unique visitor. This metric is only available after 31/12/2023.
   */
  unique_visitors?: number;
  /**
   * Item conversion rate = Units Sold ÷ Product Views.
   */
  item_conversion_rate?: number;
  /**
   * Number of orders divided by total number of product clicks over the selected time period. This metric is only available after 31/12/2023.
   */
  order_conversion_rate?: number;
}
/**
 * GetPrincipalSalesPerformanceDetailDetail sub-interface for GetPrincipalSalesPerformanceDetailResponseData
 */
export interface GetPrincipalSalesPerformanceDetailDetail {
  /**
   * Region code.
   */
  region?: string;
  /**
   * Currency code used for all monetary metrics of this region item.
   */
  currency?: string;
  /**
   * Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * The number of placed orders, including unpaid orders.
   */
  orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.
   */
  units_sold?: number;
  /**
   * Average Basket Size = Sales ÷ Orders. It measures average sales per order.
   */
  average_basket_size?: number;
  /**
   * Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction.
   */
  items_per_order?: number;
  /**
   * Average selling price = Sales ÷ Units Sold. It measures average sales per unit.
   */
  average_selling_price?: number;
  /**
   * Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023.
   */
  product_clicks?: number;
  /**
   * The number of visits to the product page.
   */
  product_views?: number;
  /**
   * Total number of unique visitors who viewed your shop or product pages over the selected time period. Multiple views by the same visitor are counted as 1 unique visitor. This metric is only available after 31/12/2023.
   */
  unique_visitors?: number;
  /**
   * Item conversion rate = Units Sold ÷ Product Views.
   */
  item_conversion_rate?: number;
  /**
   * Number of orders divided by total number of product clicks over the selected time period. This metric is only available after 31/12/2023.
   */
  order_conversion_rate?: number;
}
/**
 * GetPrincipalSalesPerformanceDetailResponseData sub-interface for GetPrincipalSalesPerformanceDetailResponse
 */
export interface GetPrincipalSalesPerformanceDetailResponseData {
  /**
   * Aggregated summary metrics for the requested date range and selected granularity, representing the overall performance of the requested principal across the selected regions.
   */
  summary?: GetPrincipalSalesPerformanceDetailSummary[];
  /**
   * List of region-level detail records that returns performance metrics for each selected region within the requested date range.
   */
  details?: GetPrincipalSalesPerformanceDetailDetail[];
}
/**
 * Response payload for get_principal_sales_performance_detail
 *
 * Queries the business performance data aggregated at principal level for the specified regions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export type GetPrincipalSalesPerformanceDetailResponse =
  FetchResponse<GetPrincipalSalesPerformanceDetailResponseData>;
/**
 * GetPrincipalVideoPerformanceRegion sub-interface for GetPrincipalVideoPerformanceRequest
 */
export interface GetPrincipalVideoPerformanceRegion {
  /**
   * Region code to be queried.Limitations:- Required for every region object in region_list.- Must be a valid region code supported by the API.- Must belong to the specified principal_id.
   */
  region: string;
  /**
   * Currency used for amount-based metrics for the region.Limitations:- Optional for every region object in region_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_principal_video_performance
 *
 * Queries video performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export interface GetPrincipalVideoPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * Optional list of principal regions to be queried.Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id except the aggregate regional bucket.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged when they use the same currency.- The same region cannot appear with different currencies.- Currency defaults to USD when omitted.
   */
  region_list?: GetPrincipalVideoPerformanceRegion[];
}
/**
 * GetPrincipalVideoPerformanceSummary sub-interface for GetPrincipalVideoPerformanceResponseData
 */
export interface GetPrincipalVideoPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Video, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of Like clicks from all videos.
   */
  likes?: number;
  /**
   * Number of comments generated from all videos.
   */
  comments?: number;
  /**
   * Number of shares created from all videos.
   */
  share?: number;
  /**
   * Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Number of items sold from placed orders during your Video.
   */
  units_sold?: number;
  /**
   * Number of views from the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Total duration of your videos in minutes. This field is returned only in summary.
   */
  total_video_duration?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Video.
   */
  atc_units?: number;
  /**
   * Average duration of your videos in minutes.
   */
  average_video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Video orders / effective video views.
   */
  conversion_rate?: number;
}
/**
 * GetPrincipalVideoPerformanceDetail sub-interface for GetPrincipalVideoPerformanceResponseData
 */
export interface GetPrincipalVideoPerformanceDetail {
  /**
   * Region code of this detail item.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this region item.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Video, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of Like clicks from all videos.
   */
  likes?: number;
  /**
   * Number of comments generated from all videos.
   */
  comments?: number;
  /**
   * Number of shares created from all videos.
   */
  share?: number;
  /**
   * Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Number of items sold from placed orders during your Video.
   */
  units_sold?: number;
  /**
   * Number of views from the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Video.
   */
  atc_units?: number;
  /**
   * Average duration of your videos in minutes.
   */
  average_video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Video orders / effective video views.
   */
  conversion_rate?: number;
}
/**
 * GetPrincipalVideoPerformanceResponseData sub-interface for GetPrincipalVideoPerformanceResponse
 */
export interface GetPrincipalVideoPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall video performance of the selected principal. Summary values are returned in USD when data exists.Note:- total_video_duration is returned only in summary.- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  summary?: GetPrincipalVideoPerformanceSummary[];
  /**
   * List of region-level detail records that returns video performance metrics for each selected region within the requested date range.Note:- details do not include total_video_duration.- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  details?: GetPrincipalVideoPerformanceDetail[];
}
/**
 * Response payload for get_principal_video_performance
 *
 * Queries video performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
 */
export type GetPrincipalVideoPerformanceResponse =
  FetchResponse<GetPrincipalVideoPerformanceResponseData>;
/**
 * GetSessionLivestreamPerformanceSession sub-interface for GetSessionLivestreamPerformanceRequest
 */
export interface GetSessionLivestreamPerformanceSession {
  /**
   * Shop identifier that owns the specified livestream sessions.Limitations:- Required for every object in session_list.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * List of livestream session identifiers to be queried under the specified shop.Limitations:- Required for every object in session_list.- Must contain at least one session_id.- Must contain at most 100 session_ids per object.- Null session_id values are rejected.- Duplicate session_id values across the whole request are rejected.- Across the whole request, the total number of unique session_ids must not exceed 100.
   */
  session_ids: number[];
  /**
   * Currency used for amount-based metrics for the specified livestream sessions.Limitations:- Optional for every object in session_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_session_livestream_performance
 *
 * Queries livestream session performance data for the specified sessions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and session-level detailed metrics.
 */
export interface GetSessionLivestreamPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of livestream session query targets.Limitations:- Must contain at least one object.- Must contain at most 100 objects.- Every shop_id must belong to the specified principal_id.- Duplicate shop_id values are rejected.- Each object must provide a non-empty session_ids list.- Null session_id values are rejected.- Duplicate session_id values across the whole request are rejected.- The total number of unique session_ids across the whole request must not exceed 100.
   */
  session_list?: GetSessionLivestreamPerformanceSession[];
  /**
   * Number of detail records to return in the current response page.Limitations:- Only supported when session_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive.
   */
  page_size?: number;
  /**
   * Zero-based offset of the first detail record to return.Limitations:- Only supported when session_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0.
   */
  cursor?: number;
}
/**
 * GetSessionLivestreamPerformanceSummary sub-interface for GetSessionLivestreamPerformanceResponseData
 */
export interface GetSessionLivestreamPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Total number of likes in the selected livestream sessions.
   */
  likes?: number;
  /**
   * Total number of comments acquired during the selected livestream sessions.
   */
  comments?: number;
  /**
   * Number of unique buyers who placed orders from the selected livestream sessions.
   */
  buyers?: number;
  /**
   * Number of placed orders (paid and unpaid) during the selected livestream sessions, including cancelled orders.
   */
  orders?: number;
  /**
   * Total views from the selected livestream sessions.
   */
  total_views?: number;
  /**
   * Total unique viewers from the selected livestream sessions.
   */
  unique_viewers?: number;
  /**
   * Total duration of the selected livestream sessions.
   */
  total_live_duration?: number;
  /**
   * Average time viewers watch the selected livestream sessions.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from the selected livestream sessions.
   */
  new_followers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during the selected livestream sessions.
   */
  atc_units?: number;
  /**
   * Number of items sold from placed orders during the selected livestream sessions.
   */
  units_sold?: number;
  /**
   * Value of placed orders (paid and unpaid) during the selected livestream sessions, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Value of placed orders (paid and unpaid) during the selected livestream sessions, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetSessionLivestreamPerformanceDetail sub-interface for GetSessionLivestreamPerformanceResponseData
 */
export interface GetSessionLivestreamPerformanceDetail {
  /**
   * Region code of the shop that owns this livestream session.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this livestream session item.
   */
  currency?: string;
  /**
   * Total number of likes in this livestream session.
   */
  likes?: number;
  /**
   * Total number of comments acquired during this livestream session.
   */
  comments?: number;
  /**
   * Number of unique buyers who placed orders from this livestream session.
   */
  buyers?: number;
  /**
   * Number of placed orders (paid and unpaid) during this livestream session, including cancelled orders.
   */
  orders?: number;
  /**
   * Shop identifier that owns this livestream session.
   */
  shop_id?: number;
  /**
   * Shop name that owns this livestream session.
   */
  shop_name?: string;
  /**
   * Livestream session identifier.
   */
  session_id?: number;
  /**
   * Livestream session name.
   */
  session_name?: string;
  /**
   * Total views from this livestream session.
   */
  total_views?: number;
  /**
   * Total unique viewers from this livestream session.
   */
  unique_viewers?: number;
  /**
   * Total duration of this livestream session.
   */
  total_live_duration?: number;
  /**
   * Average time viewers watch this livestream session.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from this livestream session.
   */
  new_followers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during this livestream session.
   */
  atc_units?: number;
  /**
   * Number of items sold from placed orders during this livestream session.
   */
  units_sold?: number;
  /**
   * Value of placed orders (paid and unpaid) during this livestream session, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Value of placed orders (paid and unpaid) during this livestream session, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetSessionLivestreamPerformanceResponseData sub-interface for GetSessionLivestreamPerformanceResponse
 */
export interface GetSessionLivestreamPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall livestream session performance of the selected sessions. Summary values are returned in USD when data exists.
   */
  summary?: GetSessionLivestreamPerformanceSummary[];
  /**
   * List of livestream session-level detail records that returns performance metrics for each selected session within the requested date range.
   */
  details?: GetSessionLivestreamPerformanceDetail[];
  /**
   * Offset to be used in the next request for fetching the next page of detail records.Notes:- Returned only when session_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor.
   */
  next_cursor?: number;
}
/**
 * Response payload for get_session_livestream_performance
 *
 * Queries livestream session performance data for the specified sessions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and session-level detailed metrics.
 */
export type GetSessionLivestreamPerformanceResponse =
  FetchResponse<GetSessionLivestreamPerformanceResponseData>;
/**
 * GetShopAffiliatePerformanceShop sub-interface for GetShopAffiliatePerformanceRequest
 */
export interface GetShopAffiliatePerformanceShop {
  /**
   * Shop identifier of the target shop to be queried.Limitations:- Required for every shop object when shop_list is provided as a non-empty array.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * Currency used for amount-based metrics for the shop.Limitations:- Optional for every shop object in shop_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_shop_affiliate_performance
 *
 * Queries affiliate performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics with placed-order and confirmed-order views.
 */
export interface GetShopAffiliatePerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.Limitations:- If provided, must contain at most 50 shops.- If omitted or passed as [], all shops under the specified principal_id will be queried.- If provided as a non-empty array, all shops must belong to the specified principal_id.Duplicate shops are not allowed.
   */
  shop_list?: GetShopAffiliatePerformanceShop[];
}
/**
 * GetShopAffiliatePerformanceSummary sub-interface for GetShopAffiliatePerformanceResponseData
 */
export interface GetShopAffiliatePerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
  /**
   * Estimated total payout from placed affiliate marketing orders during the selected period.
   */
  estimated_commission_placed?: number;
  /**
   * Estimated total payout from confirmed affiliate marketing orders during the selected period.
   */
  estimated_commission_confirmed?: number;
  /**
   * Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_placed?: number;
  /**
   * Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_confirmed?: number;
  /**
   * Total number of unique buyers who placed affiliate marketing orders from your shop set during the selected period.
   */
  buyers_placed?: number;
  /**
   * Total number of unique buyers with confirmed affiliate marketing orders from your shop set during the selected period.
   */
  buyers_confirmed?: number;
  /**
   * Total number of unique new buyers who placed affiliate marketing orders from your shop set during the selected period.
   */
  new_buyers_placed?: number;
  /**
   * Total number of unique new buyers with confirmed affiliate marketing orders from your shop set during the selected period.
   */
  new_buyers_confirmed?: number;
}
/**
 * GetShopAffiliatePerformanceDetail sub-interface for GetShopAffiliatePerformanceResponseData
 */
export interface GetShopAffiliatePerformanceDetail {
  /**
   * Region code of the shop.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this shop item.
   */
  currency?: string;
  /**
   * Shop identifier.
   */
  shop_id?: number;
  /**
   * Shop name.
   */
  shop_name?: string;
  /**
   * Total value of placed orders generated through affiliate marketing during the selected period.
   */
  sales_placed?: number;
  /**
   * Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  sales_confirmed?: number;
  /**
   * Total number of items sold in placed orders generated through affiliate marketing during the selected period.
   */
  units_sold_placed?: number;
  /**
   * Total number of items sold in confirmed orders generated through affiliate marketing during the selected period.
   */
  units_sold_confirmed?: number;
  /**
   * Total number of placed orders generated through affiliate marketing during the selected period.
   */
  orders_placed?: number;
  /**
   * Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  orders_confirmed?: number;
  /**
   * Estimated total payout from placed affiliate marketing orders during the selected period.
   */
  estimated_commission_placed?: number;
  /**
   * Estimated total payout from confirmed affiliate marketing orders during the selected period.
   */
  estimated_commission_confirmed?: number;
  /**
   * Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_placed?: number;
  /**
   * Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing.
   */
  roi_confirmed?: number;
  /**
   * Total number of unique buyers who placed affiliate marketing orders from this shop during the selected period.
   */
  buyers_placed?: number;
  /**
   * Total number of unique buyers with confirmed affiliate marketing orders from this shop during the selected period.
   */
  buyers_confirmed?: number;
  /**
   * Total number of unique new buyers who placed affiliate marketing orders from this shop during the selected period.
   */
  new_buyers_placed?: number;
  /**
   * Total number of unique new buyers with confirmed affiliate marketing orders from this shop during the selected period.
   */
  new_buyers_confirmed?: number;
}
/**
 * GetShopAffiliatePerformanceResponseData sub-interface for GetShopAffiliatePerformanceResponse
 */
export interface GetShopAffiliatePerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall affiliate performance of the requested shop set.
   */
  summary?: GetShopAffiliatePerformanceSummary[];
  /**
   * List of shop-level detail records that returns affiliate performance metrics for each selected shop within the requested date range.
   */
  details?: GetShopAffiliatePerformanceDetail[];
}
/**
 * Response payload for get_shop_affiliate_performance
 *
 * Queries affiliate performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics with placed-order and confirmed-order views.
 */
export type GetShopAffiliatePerformanceResponse =
  FetchResponse<GetShopAffiliatePerformanceResponseData>;
/**
 * GetShopLivestreamPerformanceShop sub-interface for GetShopLivestreamPerformanceRequest
 */
export interface GetShopLivestreamPerformanceShop {
  /**
   * Shop identifier of the target shop to be queried.Limitations:- Required for every shop object when shop_list is provided as a non-empty array.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * Currency used for amount-based metrics for the shop.Limitations:- Optional for every shop object in shop_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_shop_livestream_performance
 *
 * Queries livestream performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
 */
export interface GetShopLivestreamPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.Limitations:- If provided, must contain at most 50 shops.- If omitted or passed as [], all shops under the specified principal_id will be queried.- If provided as a non-empty array, all shops must belong to the specified principal_id.Duplicate shops are not allowed.
   */
  shop_list?: GetShopLivestreamPerformanceShop[];
}
/**
 * GetShopLivestreamPerformanceSummary sub-interface for GetShopLivestreamPerformanceResponseData
 */
export interface GetShopLivestreamPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of unique buyers who placed order from your Livestream.
   */
  buyers?: number;
  /**
   * Total number of likes in your Livestream.
   */
  likes?: number;
  /**
   * Total number of comments acquired during your Livestream.
   */
  comments?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Number of items sold from placed orders during your Livestream.
   */
  units_sold?: number;
  /**
   * Total views from your Livestream.
   */
  total_views?: number;
  /**
   * Total duration of your Livestream.
   */
  total_live_duration?: number;
  /**
   * Total unique viewers from your Livestream.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Livestream.
   */
  atc_units?: number;
  /**
   * Total count of Livestream sessions in the selected period.
   */
  total_livestreams?: number;
  /**
   * Average duration of your Livestream.
   */
  average_live_duration?: number;
  /**
   * Average time viewers watch your Livestreams.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from your Livestream.
   */
  new_followers?: number;
  /**
   * Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  new_buyers?: number;
  /**
   * Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  existing_buyers?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetShopLivestreamPerformanceDetail sub-interface for GetShopLivestreamPerformanceResponseData
 */
export interface GetShopLivestreamPerformanceDetail {
  /**
   * Region code of the shop.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this shop item.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of unique buyers who placed order from your Livestream.
   */
  buyers?: number;
  /**
   * Total number of likes in your Livestream.
   */
  likes?: number;
  /**
   * Total number of comments acquired during your Livestream.
   */
  comments?: number;
  /**
   * Shop identifier.
   */
  shop_id?: number;
  /**
   * Shop name.
   */
  shop_name?: string;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders.
   */
  sales_gross?: number;
  /**
   * Number of items sold from placed orders during your Livestream.
   */
  units_sold?: number;
  /**
   * Total views from your Livestream.
   */
  total_views?: number;
  /**
   * Total duration of your Livestream.
   */
  total_live_duration?: number;
  /**
   * Total unique viewers from your Livestream.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Livestream.
   */
  atc_units?: number;
  /**
   * Total count of Livestream sessions in the selected period.
   */
  total_livestreams?: number;
  /**
   * Average duration of your Livestream.
   */
  average_live_duration?: number;
  /**
   * Average time viewers watch your Livestreams.
   */
  average_views_duration?: number;
  /**
   * Total followers gained from your Livestream.
   */
  new_followers?: number;
  /**
   * Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  new_buyers?: number;
  /**
   * Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days.
   */
  existing_buyers?: number;
  /**
   * Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items.
   */
  sales_net?: number;
  /**
   * Livestream orders / Livestream views.
   */
  conversion_rate?: number;
}
/**
 * GetShopLivestreamPerformanceResponseData sub-interface for GetShopLivestreamPerformanceResponse
 */
export interface GetShopLivestreamPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall livestream performance of the requested shop set. Summary values are returned in USD when data exists.
   */
  summary?: GetShopLivestreamPerformanceSummary[];
  /**
   * List of shop-level detail records that returns livestream performance metrics for each selected shop within the requested date range.
   */
  details?: GetShopLivestreamPerformanceDetail[];
}
/**
 * Response payload for get_shop_livestream_performance
 *
 * Queries livestream performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
 */
export type GetShopLivestreamPerformanceResponse =
  FetchResponse<GetShopLivestreamPerformanceResponseData>;
/**
 * GetShopSalesPerformanceDetailShop sub-interface for GetShopSalesPerformanceDetailRequest
 */
export interface GetShopSalesPerformanceDetailShop {
  /**
   * Shop identifier of the target shop to be queried.Limitations:- Required for every shop object when shop_list is provided as a non-empty array.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * Currency used for amount-based metrics for the shop.Limitations:- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- default USD
   */
  currency?: string;
}
/**
 * Request parameters for get_shop_sales_performance_detail
 *
 * Queries the business performance data of stores under the specified entity within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and store-level detailed metrics.
 */
export interface GetShopSalesPerformanceDetailRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date .- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: ["GMT+7", "GMT+8", "GMT-3"]- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.-Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.Limitations:- If provided, must contain at most 50 shops.- If omitted or passed as [], all shops under the specified principal_id will be queried.- If provided as a non-empty array, all shops must belong to the specified principal_id.Duplicate shops are not allowed.
   */
  shop_list?: GetShopSalesPerformanceDetailShop[];
}
/**
 * GetShopSalesPerformanceDetailSummary sub-interface for GetShopSalesPerformanceDetailResponseData
 */
export interface GetShopSalesPerformanceDetailSummary {
  /**
   * currency code used for all monetary metrics of this shop item
   */
  currency?: string;
  /**
   * Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * The number of placed orders, including unpaid orders.
   */
  orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.
   */
  units_sold?: number;
  /**
   * Average Basket Size = Sales ÷ Orders. It measures average sales per order
   */
  average_basket_size?: number;
  /**
   * Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction.
   */
  items_per_order?: number;
  /**
   * Average selling price=Sales ÷ Units Sold. It measures average sales per unit.
   */
  average_selling_price?: number;
  /**
   * Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023.
   */
  product_clicks?: number;
  /**
   * The number of visits to the product page.
   */
  product_views?: number;
  /**
   * Total number of unique visitors who viewed your shop, product detail pages, or item cards in Live or Video over the selected time period. Multiple views of one page by the same visitor is counted as 1 unique visitor. This metric is only available after 31/12/2023
   */
  unique_visitors?: number;
  /**
   * Item conversion rate = Units Sold ÷ Product Views.
   */
  item_conversion_rate?: number;
  /**
   * Number of orders divided by total number of product clicks, over the selected time period. This metric is only available after 31/12/2023
   */
  order_conversion_rate?: number;
  /**
   * Total flash sale order value (paid and unpaid) within the selected time period (done by both seller and platform flash sale), reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  flash_sale_sales?: number;
  /**
   * The number of placed orders, including unpaid orders.This includes flash sales done by seller and platform.
   */
  flash_sale_orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.This includes flash sales done by seller and platform.
   */
  flash_sale_units_sold?: number;
  /**
   * Total value of all placed orders using your vouchers, including shipping fees and excluding other promotions, over the selected time period.
   */
  voucher_sales?: number;
  /**
   * Total number of unique buyers who applied your vouchers at least once, in all placed orders over the selected time period.
   */
  voucher_buyers?: number;
  /**
   * Usage Rate = Vouchers Redeemed / Vouchers Claimed * 100%
   */
  voucher_usage_rate?: number;
  /**
   * Cost to Income Ratio (Voucher Cost/Gross Sales) measures the cost of vouchers relative to the revenue generated by the voucher from the sales of your shop's products.
   */
  voucher_cir?: number;
  /**
   * Total cost of vouchers applied at checkout, including shipping fees and excluding other promotions, over the selected time period.
   */
  voucher_cost?: number;
}
/**
 * GetShopSalesPerformanceDetailDetail sub-interface for GetShopSalesPerformanceDetailResponseData
 */
export interface GetShopSalesPerformanceDetailDetail {
  /**
   * Shop identifier.
   */
  shop_id?: number;
  /**
   * Shop name.
   */
  shop_name?: string;
  /**
   * Shop region code.
   */
  shop_region_code?: string;
  /**
   * currency code used for all monetary metrics of this shop item
   */
  currency?: string;
  /**
   * Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * The number of placed orders, including unpaid orders.
   */
  orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.
   */
  units_sold?: number;
  /**
   * Average Basket Size = Sales ÷ Orders. It measures average sales per order
   */
  average_basket_size?: number;
  /**
   * Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction.
   */
  items_per_order?: number;
  /**
   * Average selling price=Sales ÷ Units Sold. It measures average sales per unit.
   */
  average_selling_price?: number;
  /**
   * Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023.
   */
  product_clicks?: number;
  /**
   * The number of visits to the product page.
   */
  product_views?: number;
  /**
   * Total number of unique visitors who viewed your shop, product detail pages, or item cards in Live or Video over the selected time period. Multiple views of one page by the same visitor is counted as 1 unique visitor. This metric is only available after 31/12/2023
   */
  unique_visitors?: number;
  /**
   * Item conversion rate = Units Sold ÷ Product Views.
   */
  item_conversion_rate?: number;
  /**
   * Number of orders divided by total number of product clicks, over the selected time period. This metric is only available after 31/12/2023
   */
  order_conversion_rate?: number;
  /**
   * Average daily ATP% of top 80% GMV-contributing SKUs in the selected timeframe, the data will begin from 2023-10-01.
   */
  atp_top_skus_l1d?: number;
  /**
   * Average ATP% of top 80% GMV SKUs over a rolling 30-day period in the selected timeframe, the data will begin from 2023-10-01.
   */
  atp_top_skus_l30d?: number;
  /**
   * Average daily ATP% of all GMV-contributing SKUs in the selected timeframe, the data will begin from 2023-10-01.
   */
  atp_live_skus_l1d?: number;
  /**
   * Average ATP% of all-GMV SKUs over a rolling 30-day period in the selected timeframe, the data will begin from 2023-10-01.
   */
  atp_live_skus_l30d?: number;
  /**
   * Total flash sale order value (paid and unpaid) within the selected time period (done by both seller and platform flash sale), reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  flash_sale_sales?: number;
  /**
   * The number of placed orders, including unpaid orders.This includes flash sales done by seller and platform.
   */
  flash_sale_orders?: number;
  /**
   * The number of units associated with the orders placed, including unpaid orders.This includes flash sales done by seller and platform.
   */
  flash_sale_units_sold?: number;
  /**
   * Total value of all placed orders using your vouchers, including shipping fees and excluding other promotions, over the selected time period.
   */
  voucher_sales?: number;
  /**
   * Total number of unique buyers who applied your vouchers at least once, in all placed orders over the selected time period.
   */
  voucher_buyers?: number;
  /**
   * Usage Rate = Vouchers Redeemed / Vouchers Claimed * 100%
   */
  voucher_usage_rate?: number;
  /**
   * Cost to Income Ratio (Voucher Cost/Gross Sales) measures the cost of vouchers relative to the revenue generated by the voucher from the sales of your shop's products.
   */
  voucher_cir?: number;
  /**
   * Total cost of vouchers applied at checkout, including shipping fees and excluding other promotions, over the selected time period.
   */
  voucher_cost?: number;
}
/**
 * GetShopSalesPerformanceDetailResponseData sub-interface for GetShopSalesPerformanceDetailResponse
 */
export interface GetShopSalesPerformanceDetailResponseData {
  /**
   * Aggregated summary metrics for the requested date range and selected granularity, representing the overall performance of the requested shop set.
   */
  summary?: GetShopSalesPerformanceDetailSummary[];
  /**
   * List of shop-level detail records that returns performance metrics for each selected shop within the requested date range.
   */
  details?: GetShopSalesPerformanceDetailDetail[];
}
/**
 * Response payload for get_shop_sales_performance_detail
 *
 * Queries the business performance data of stores under the specified entity within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and store-level detailed metrics.
 */
export type GetShopSalesPerformanceDetailResponse =
  FetchResponse<GetShopSalesPerformanceDetailResponseData>;
/**
 * GetShopVideoPerformanceShop sub-interface for GetShopVideoPerformanceRequest
 */
export interface GetShopVideoPerformanceShop {
  /**
   * Shop identifier of the target shop to be queried.Limitations:- Required for every shop object when shop_list is provided as a non-empty array.- Must belong to the specified principal_id.
   */
  shop_id: number;
  /**
   * Currency used for amount-based metrics for the shop.Limitations:- Optional for every shop object in shop_list.- Supported values are LOCAL and USD.- Invalid currency values are rejected as invalid_parameter.- Defaults to USD when omitted.
   */
  currency?: string;
}
/**
 * Request parameters for get_shop_video_performance
 *
 * Queries video performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
 */
export interface GetShopVideoPerformanceRequest {
  /**
   * Start date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year.
   */
  start_date: string;
  /**
   * End date of the requested period in YYYY-MM-DD format.Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be earlier than start_date.- Validation is based on the requested timezone.- For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.- For day, end_date must equal start_date.- For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).- For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).- For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).- For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day).
   */
  end_date: string;
  /**
   * Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone.
   */
  timezone: string;
  /**
   * Aggregation granularity that determines the validation rules for the requested date range and the reporting period.Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter.
   */
  granularity: string;
  /**
   * shops under the specified principal_id.Limitations:- If provided, must contain at most 50 shops.- If omitted or passed as [], all shops under the specified principal_id will be queried.- If provided as a non-empty array, all shops must belong to the specified principal_id.Duplicate shops are not allowed.
   */
  shop_list?: GetShopVideoPerformanceShop[];
}
/**
 * GetShopVideoPerformanceSummary sub-interface for GetShopVideoPerformanceResponseData
 */
export interface GetShopVideoPerformanceSummary {
  /**
   * Currency code used for all amount-based metrics in the summary. Summary values are returned in USD.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Video, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of Like clicks from all videos.
   */
  likes?: number;
  /**
   * Number of comments generated from all videos.
   */
  comments?: number;
  /**
   * Number of shares created from all videos.
   */
  share?: number;
  /**
   * Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Number of items sold from placed orders during your Video.
   */
  units_sold?: number;
  /**
   * Number of views from the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Total duration of your videos in minutes. This field is returned only in summary.
   */
  total_video_duration?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Video.
   */
  atc_units?: number;
  /**
   * Average duration of your videos in minutes.
   */
  average_video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Video orders / effective video views.
   */
  conversion_rate?: number;
}
/**
 * GetShopVideoPerformanceDetail sub-interface for GetShopVideoPerformanceResponseData
 */
export interface GetShopVideoPerformanceDetail {
  /**
   * Region code of the shop.
   */
  region?: string;
  /**
   * Currency code used for all amount-based metrics of this shop item.
   */
  currency?: string;
  /**
   * Number of placed orders (paid and unpaid) during your Video, including cancelled orders.
   */
  orders?: number;
  /**
   * Number of Like clicks from all videos.
   */
  likes?: number;
  /**
   * Number of comments generated from all videos.
   */
  comments?: number;
  /**
   * Number of shares created from all videos.
   */
  share?: number;
  /**
   * Shop identifier.
   */
  shop_id?: number;
  /**
   * Shop name.
   */
  shop_name?: string;
  /**
   * Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders.
   */
  sales?: number;
  /**
   * Number of items sold from placed orders during your Video.
   */
  units_sold?: number;
  /**
   * Number of views from the video that lasted for more than 3 seconds.
   */
  effective_views?: number;
  /**
   * Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  unique_viewers?: number;
  /**
   * Number of Add To Cart button clicks for all products in the orange bag during your Video.
   */
  atc_units?: number;
  /**
   * Average duration of your videos in minutes.
   */
  average_video_duration?: number;
  /**
   * Average viewing duration per video in minutes.
   */
  average_views_duration?: number;
  /**
   * Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range.
   */
  total_unique_buyers?: number;
  /**
   * Video orders / effective video views.
   */
  conversion_rate?: number;
}
/**
 * GetShopVideoPerformanceResponseData sub-interface for GetShopVideoPerformanceResponse
 */
export interface GetShopVideoPerformanceResponseData {
  /**
   * Aggregated summary metrics for the requested date range, representing the overall video performance of the requested shop set. Summary values are returned in USD when data exists.Note:- total_video_duration is returned only in summary.- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  summary?: GetShopVideoPerformanceSummary[];
  /**
   * List of shop-level detail records that returns video performance metrics for each selected shop within the requested date range.Note:- details do not include total_video_duration.- unique_viewers and total_unique_buyers are unavailable for customize, month, quarter, year, and non-full-week weekly ranges.
   */
  details?: GetShopVideoPerformanceDetail[];
}
/**
 * Response payload for get_shop_video_performance
 *
 * Queries video performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
 */
export type GetShopVideoPerformanceResponse = FetchResponse<GetShopVideoPerformanceResponseData>;
