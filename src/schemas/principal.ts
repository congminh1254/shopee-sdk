import { BaseResponse } from "./base.js";

// Common sub-interfaces used in request bodies
export interface PrincipalVideoListItem {
  shop_id: number;
  video_ids?: number[];
  currency?: string;
}

export interface PrincipalContentListItem {
  shop_id: number;
  content_ids?: string[];
  currency?: string;
}

export interface PrincipalRegionListItem {
  region: string;
  currency?: string;
}

export interface PrincipalSessionListItem {
  shop_id: number;
  session_ids?: number[];
  currency?: string;
}

export interface PrincipalShopListItem {
  shop_id: number;
  currency?: string;
}

/**
 * Parameters for get_clip_video_performance
 */
export interface GetClipVideoPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of video clip query targets.
   * Limitations:- Must contain at least one object.- Must contain at most 100 objects.- Every shop_id must belong to the specified principal_id.- Duplicate shop_id values are rejected.- Each object must provide a non-empty video_ids list.- Null video_id values are rejected.- Duplicate video_id values across the whole request are rejected.- The total number of unique video_ids across the whole request must not exceed 100. */
  video_list?: PrincipalVideoListItem[];
  /** Number of detail records to return in the current response page.
   * Limitations:- Only supported when video_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive. */
  page_size?: number;
  /** Zero-based offset of the first detail record to return.
   * Limitations:- Only supported when video_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0. */
  cursor?: number;
}

export interface GetClipVideoPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. */
  currency: string;
  /** Total views from the selected videos. */
  total_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Video duration in minutes. */
  video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of Like clicks from the selected videos. */
  likes: number;
  /** Number of comments generated from the selected videos. */
  comments: number;
  /** Number of shares created from the selected videos. */
  share: number;
  /** Number of unique buyers who placed order from the selected videos. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during the selected videos. */
  atc_units: number;
  /** Number of items sold from placed orders during the selected videos. */
  units_sold: number;
  /** Number of placed orders (paid and unpaid) during the selected videos, including cancelled orders. */
  orders: number;
  /** Value of placed orders (paid and unpaid) from the selected videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Video orders / total video views. */
  conversion_rate: number;
}

export interface GetClipVideoPerformanceDetail {
  /** Region code of the shop that owns this video. */
  region: string;
  /** Currency code used for all amount-based metrics of this video item. */
  currency: string;
  /** Shop identifier that owns this video. */
  shop_id: number;
  /** Shop name that owns this video. */
  shop_name: string;
  /** Video identifier. */
  video_id: number;
  /** Video name. */
  video_name: string;
  /** Total views from this video. */
  total_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Video duration in minutes. */
  video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of Like clicks from this video. */
  likes: number;
  /** Number of comments generated from this video. */
  comments: number;
  /** Number of shares created from this video. */
  share: number;
  /** Number of unique buyers who placed order from this video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during this video. */
  atc_units: number;
  /** Number of items sold from placed orders during this video. */
  units_sold: number;
  /** Number of placed orders (paid and unpaid) during this video, including cancelled orders. */
  orders: number;
  /** Value of placed orders (paid and unpaid) from this video in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Video orders / total video views. */
  conversion_rate: number;
}

/**
 * Response for get_clip_video_performance
 */
export interface GetClipVideoPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetClipVideoPerformanceSummary[];
    details?: GetClipVideoPerformanceDetail[];
    /** Offset to be used in the next request for fetching the next page of detail records.
     * Notes:- Returned only when video_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor. */
    next_cursor?: number;
  };
}

/**
 * Parameters for get_content_affiliate_performance
 */
export interface GetContentAffiliatePerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of shops and content IDs to be queried.
   * Limitations:- If omitted or set to [], the API returns all eligible content under the specified principal_id.- If provided, must contain 1 to 100 shop entries.- Duplicate shop_id values are not allowed.- page_size and cursor are only supported when content_list is omitted or empty. */
  content_list?: PrincipalContentListItem[];
  /** Number of detail records to return in the current response page.
   * Limitations:- Only supported when content_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive. */
  page_size?: number;
  /** Zero-based offset of the first detail record to return.
   * Limitations:- Only supported when content_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0. */
  cursor?: number;
}

export interface GetContentAffiliatePerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. */
  currency: string;
  /** Total content views generated during the selected period. */
  views: number;
  /** Total content likes generated during the selected period. */
  likes: number;
  /** Total content comments generated during the selected period. */
  comments: number;
  /** Total value of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
}

export interface GetContentAffiliatePerformanceDetail {
  /** Region code of the shop that owns this content item. */
  region: string;
  /** Currency code used for all amount-based metrics of this content item. */
  currency: string;
  /** Shop identifier that owns this content item. */
  shop_id: number;
  /** Shop name that owns this content item. */
  shop_name: string;
  /** Affiliate content identifier. */
  content_id: number;
  /** Affiliate content name. */
  content_name: string;
  /** Total content views generated during the selected period for this content item. */
  views: number;
  /** Total content likes generated during the selected period for this content item. */
  likes: number;
  /** Total content comments generated during the selected period for this content item. */
  comments: number;
  /** Total value of placed orders generated through affiliate marketing during the selected period for this content item. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period for this content item. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period for this content item. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period for this content item. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period for this content item. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period for this content item. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
}

/**
 * Response for get_content_affiliate_performance
 */
export interface GetContentAffiliatePerformanceResponse extends BaseResponse {
  response: {
    summary?: GetContentAffiliatePerformanceSummary[];
    details?: GetContentAffiliatePerformanceDetail[];
    /** Offset to be used in the next request for fetching the next page of detail records.Notes:- Returned only when content_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor. */
    next_cursor?: number;
  };
}

/**
 * Parameters for get_principal_affiliate_performance
 */
export interface GetPrincipalAffiliatePerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** Optional list of principal regions to be queried.
   * Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged when they use the same currency.- The same region cannot appear with different currencies. */
  region_list?: PrincipalRegionListItem[];
}

export interface GetPrincipalAffiliatePerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Total value of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
  /** Estimated total payout from placed affiliate marketing orders during the selected period. */
  estimated_commission_placed: number;
  /** Estimated total payout from confirmed affiliate marketing orders during the selected period. */
  estimated_commission_confirmed: number;
  /** Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_placed: number;
  /** Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_confirmed: number;
  /** Total number of unique buyers who placed affiliate marketing orders from the selected principal during the selected period. */
  buyers_placed: number;
  /** Total number of unique buyers with confirmed affiliate marketing orders from the selected principal during the selected period. */
  buyers_confirmed: number;
  /** Total number of unique new buyers who placed affiliate marketing orders from the selected principal during the selected period. */
  new_buyers_placed: number;
  /** Total number of unique new buyers with confirmed affiliate marketing orders from the selected principal during the selected period. */
  new_buyers_confirmed: number;
}

export interface GetPrincipalAffiliatePerformanceDetail {
  /** Region code of this detail item. */
  region: string;
  /** Currency code used for all amount-based metrics of this region item. */
  currency: string;
  /** Total value of placed orders generated through affiliate marketing during the selected period for this region. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period for this region. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period for this region. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period for this region. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period for this region. Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period for this region. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
  /** Estimated total payout from placed affiliate marketing orders during the selected period for this region. */
  estimated_commission_placed: number;
  /** Estimated total payout from confirmed affiliate marketing orders during the selected period for this region. */
  estimated_commission_confirmed: number;
  /** Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_placed: number;
  /** Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_confirmed: number;
  /** Total number of unique buyers who placed affiliate marketing orders from this region during the selected period. */
  buyers_placed: number;
  /** Total number of unique buyers with confirmed affiliate marketing orders from this region during the selected period. */
  buyers_confirmed: number;
  /** Total number of unique new buyers who placed affiliate marketing orders from this region during the selected period. */
  new_buyers_placed: number;
  /** Total number of unique new buyers with confirmed affiliate marketing orders from this region during the selected period. */
  new_buyers_confirmed: number;
}

/**
 * Response for get_principal_affiliate_performance
 */
export interface GetPrincipalAffiliatePerformanceResponse extends BaseResponse {
  response: {
    summary?: GetPrincipalAffiliatePerformanceSummary[];
    details?: GetPrincipalAffiliatePerformanceDetail[];
  };
}

/**
 * Parameters for get_principal_livestream_performance
 */
export interface GetPrincipalLivestreamPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** Optional list of principal regions to be queried.
   * Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id except the aggregate regional bucket.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged for filtering purposes.- Currency defaults to USD when omitted.- When the same region appears multiple times, the first provided currency is used. */
  region_list?: PrincipalRegionListItem[];
}

export interface GetPrincipalLivestreamPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders. */
  orders: number;
  /** Number of unique buyers who placed order from your Livestream. */
  buyers: number;
  /** Total number of likes in your Livestream. */
  likes: number;
  /** Total number of comments acquired during your Livestream. */
  comments: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Number of items sold from placed orders during your Livestream. */
  units_sold: number;
  /** Total views from your Livestream. */
  total_views: number;
  /** Total duration of your Livestream. */
  total_live_duration: number;
  /** Total unique viewers from your Livestream. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Livestream. */
  atc_units: number;
  /** Total count of Livestream sessions in the selected period. */
  total_livestreams: number;
  /** Average duration of your Livestream. */
  average_live_duration: number;
  /** Average time viewers watch your Livestreams. */
  average_views_duration: number;
  /** Total followers gained from your Livestream. */
  new_followers: number;
  /** Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  new_buyers: number;
  /** Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  existing_buyers: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

export interface GetPrincipalLivestreamPerformanceDetail {
  /** Region code of this detail item. */
  region: string;
  /** Currency code used for all amount-based metrics of this region item. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders. */
  orders: number;
  /** Number of unique buyers who placed order from your Livestream. */
  buyers: number;
  /** Total number of likes in your Livestream. */
  likes: number;
  /** Total number of comments acquired during your Livestream. */
  comments: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Number of items sold from placed orders during your Livestream. */
  units_sold: number;
  /** Total views from your Livestream. */
  total_views: number;
  /** Total duration of your Livestream. */
  total_live_duration: number;
  /** Total unique viewers from your Livestream. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Livestream. */
  atc_units: number;
  /** Total count of Livestream sessions in the selected period. */
  total_livestreams: number;
  /** Average duration of your Livestream. */
  average_live_duration: number;
  /** Average time viewers watch your Livestreams. */
  average_views_duration: number;
  /** Total followers gained from your Livestream. */
  new_followers: number;
  /** Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  new_buyers: number;
  /** Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  existing_buyers: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

/**
 * Response for get_principal_livestream_performance
 */
export interface GetPrincipalLivestreamPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetPrincipalLivestreamPerformanceSummary[];
    details?: GetPrincipalLivestreamPerformanceDetail[];
  };
}

/**
 * Parameters for get_principal_sales_performance_detail
 */
export interface GetPrincipalSalesPerformanceDetailParams {
  /** Start date of the requested period in&nbsp;YYYY-MM-DD&nbsp;format.
   *
   * Limitations:
   * - Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of principal regions to be queried.
   * Limitations:- Optional. If omitted or empty, the API queries all regions that belong to the specified principal.- Duplicate region entries are deduplicated internally.- The same region must not appear multiple times with different currency values. */
  region_list?: PrincipalRegionListItem[];
}

export interface GetPrincipalSalesPerformanceDetailSummary {
  /** Currency code used for all monetary metrics in the summary. When multiple regions are requested, the summary currency is always USD. When exactly one region is requested, the summary currency follows that region's requested currency. */
  currency: string;
  /** Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** The number of placed orders, including unpaid orders. */
  orders: number;
  /** The number of units associated with the orders placed, including unpaid orders. */
  units_sold: number;
  /** Average Basket Size = Sales ÷ Orders. It measures average sales per order. */
  average_basket_size: number;
  /** Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction. */
  items_per_order: number;
  /** Average selling price = Sales ÷ Units Sold. It measures average sales per unit. */
  average_selling_price: number;
  /** Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023. */
  product_clicks: number;
  /** The number of visits to the product page. */
  product_views: number;
  /** Total number of unique visitors who viewed your shop or product pages over the selected time period. Multiple views by the same visitor are counted as 1 unique visitor. This metric is only available after 31/12/2023. */
  unique_visitors: number;
  /** Item conversion rate = Units Sold ÷ Product Views. */
  item_conversion_rate: number;
  /** Number of orders divided by total number of product clicks over the selected time period. This metric is only available after 31/12/2023. */
  order_conversion_rate: number;
}

export interface GetPrincipalSalesPerformanceDetailDetail {
  /** Region code. */
  region: string;
  /** Currency code used for all monetary metrics of this region item. */
  currency: string;
  /** Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** The number of placed orders, including unpaid orders. */
  orders: number;
  /** The number of units associated with the orders placed, including unpaid orders. */
  units_sold: number;
  /** Average Basket Size = Sales ÷ Orders. It measures average sales per order. */
  average_basket_size: number;
  /** Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction. */
  items_per_order: number;
  /** Average selling price = Sales ÷ Units Sold. It measures average sales per unit. */
  average_selling_price: number;
  /** Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023. */
  product_clicks: number;
  /** The number of visits to the product page. */
  product_views: number;
  /** Total number of unique visitors who viewed your shop or product pages over the selected time period. Multiple views by the same visitor are counted as 1 unique visitor. This metric is only available after 31/12/2023. */
  unique_visitors: number;
  /** Item conversion rate = Units Sold ÷ Product Views. */
  item_conversion_rate: number;
  /** Number of orders divided by total number of product clicks over the selected time period. This metric is only available after 31/12/2023. */
  order_conversion_rate: number;
}

/**
 * Response for get_principal_sales_performance_detail
 */
export interface GetPrincipalSalesPerformanceDetailResponse extends BaseResponse {
  response: {
    summary?: GetPrincipalSalesPerformanceDetailSummary[];
    details?: GetPrincipalSalesPerformanceDetailDetail[];
  };
}

/**
 * Parameters for get_principal_video_performance
 */
export interface GetPrincipalVideoPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** Optional list of principal regions to be queried.
   * Limitations:- When omitted or empty, the API queries all regions belonging to the specified principal_id except the aggregate regional bucket.- Must contain at most 100 region objects.- Every region must belong to the specified principal_id.- Duplicate region values are merged when they use the same currency.- The same region cannot appear with different currencies.- Currency defaults to USD when omitted. */
  region_list?: PrincipalRegionListItem[];
}

export interface GetPrincipalVideoPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Video, including cancelled orders. */
  orders: number;
  /** Number of Like clicks from all videos. */
  likes: number;
  /** Number of comments generated from all videos. */
  comments: number;
  /** Number of shares created from all videos. */
  share: number;
  /** Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Number of items sold from placed orders during your Video. */
  units_sold: number;
  /** Number of views from the video that lasted for more than 3 seconds. */
  effective_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Total duration of your videos in minutes. This field is returned only in summary. */
  total_video_duration: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Video. */
  atc_units: number;
  /** Average duration of your videos in minutes. */
  average_video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Video orders / effective video views. */
  conversion_rate: number;
}

export interface GetPrincipalVideoPerformanceDetail {
  /** Region code of this detail item. */
  region: string;
  /** Currency code used for all amount-based metrics of this region item. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Video, including cancelled orders. */
  orders: number;
  /** Number of Like clicks from all videos. */
  likes: number;
  /** Number of comments generated from all videos. */
  comments: number;
  /** Number of shares created from all videos. */
  share: number;
  /** Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Number of items sold from placed orders during your Video. */
  units_sold: number;
  /** Number of views from the video that lasted for more than 3 seconds. */
  effective_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Video. */
  atc_units: number;
  /** Average duration of your videos in minutes. */
  average_video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Video orders / effective video views. */
  conversion_rate: number;
}

/**
 * Response for get_principal_video_performance
 */
export interface GetPrincipalVideoPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetPrincipalVideoPerformanceSummary[];
    details?: GetPrincipalVideoPerformanceDetail[];
  };
}

/**
 * Parameters for get_session_livestream_performance
 */
export interface GetSessionLivestreamPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of livestream session query targets.
   * Limitations:- Must contain at least one object.- Must contain at most 100 objects.- Every shop_id must belong to the specified principal_id.- Duplicate shop_id values are rejected.- Each object must provide a non-empty session_ids list.- Null session_id values are rejected.- Duplicate session_id values across the whole request are rejected.- The total number of unique session_ids across the whole request must not exceed 100. */
  session_list?: PrincipalSessionListItem[];
  /** Number of detail records to return in the current response page.
   * Limitations:- Only supported when session_list is omitted or an empty array.- Default value is 100.- Must be between 1 and 200, inclusive. */
  page_size?: number;
  /** Zero-based offset of the first detail record to return.
   * Limitations:- Only supported when session_list is omitted or an empty array.- Default value is 0.- Must be greater than or equal to 0. */
  cursor?: number;
}

export interface GetSessionLivestreamPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Total number of likes in the selected livestream sessions. */
  likes: number;
  /** Total number of comments acquired during the selected livestream sessions. */
  comments: number;
  /** Number of unique buyers who placed orders from the selected livestream sessions. */
  buyers: number;
  /** Number of placed orders (paid and unpaid) during the selected livestream sessions, including cancelled orders. */
  orders: number;
  /** Total views from the selected livestream sessions. */
  total_views: number;
  /** Total unique viewers from the selected livestream sessions. */
  unique_viewers: number;
  /** Total duration of the selected livestream sessions. */
  total_live_duration: number;
  /** Average time viewers watch the selected livestream sessions. */
  average_views_duration: number;
  /** Total followers gained from the selected livestream sessions. */
  new_followers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during the selected livestream sessions. */
  atc_units: number;
  /** Number of items sold from placed orders during the selected livestream sessions. */
  units_sold: number;
  /** Value of placed orders (paid and unpaid) during the selected livestream sessions, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Value of placed orders (paid and unpaid) during the selected livestream sessions, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

export interface GetSessionLivestreamPerformanceDetail {
  /** Region code of the shop that owns this livestream session. */
  region: string;
  /** Currency code used for all amount-based metrics of this livestream session item. */
  currency: string;
  /** Total number of likes in this livestream session. */
  likes: number;
  /** Total number of comments acquired during this livestream session. */
  comments: number;
  /** Number of unique buyers who placed orders from this livestream session. */
  buyers: number;
  /** Number of placed orders (paid and unpaid) during this livestream session, including cancelled orders. */
  orders: number;
  /** Shop identifier that owns this livestream session. */
  shop_id: number;
  /** Shop name that owns this livestream session. */
  shop_name: string;
  /** Livestream session identifier. */
  session_id: number;
  /** Livestream session name. */
  session_name: string;
  /** Total views from this livestream session. */
  total_views: number;
  /** Total unique viewers from this livestream session. */
  unique_viewers: number;
  /** Total duration of this livestream session. */
  total_live_duration: number;
  /** Average time viewers watch this livestream session. */
  average_views_duration: number;
  /** Total followers gained from this livestream session. */
  new_followers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during this livestream session. */
  atc_units: number;
  /** Number of items sold from placed orders during this livestream session. */
  units_sold: number;
  /** Value of placed orders (paid and unpaid) during this livestream session, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Value of placed orders (paid and unpaid) during this livestream session, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

/**
 * Response for get_session_livestream_performance
 */
export interface GetSessionLivestreamPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetSessionLivestreamPerformanceSummary[];
    details?: GetSessionLivestreamPerformanceDetail[];
    /** Offset to be used in the next request for fetching the next page of detail records.Notes:- Returned only when session_list is omitted or an empty array.- Calculated as cursor + returned_detail_count.- If returned_detail_count is less than page_size, it indicates there may be no more records.- If the request is already beyond the end of the result set, the API returns 0 detail records and next_cursor remains equal to the input cursor. */
    next_cursor?: number;
  };
}

/**
 * Parameters for get_shop_affiliate_performance
 */
export interface GetShopAffiliatePerformanceParams {
  /** Start date of the requested period in&nbsp;YYYY-MM-DD&nbsp;format.
   *
   * Limitations:
   * - Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.
   * Limitations:
   * - If provided, must contain at most 50 shops.
   * - If omitted or passed as [], all shops under the specified principal_id will be queried.
   * - If provided as a non-empty array, all shops must belong to the specified principal_id.
   * Duplicate shops are not allowed. */
  shop_list?: PrincipalShopListItem[];
}

export interface GetShopAffiliatePerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Total value of placed orders generated through affiliate marketing during the selected period. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
  /** Estimated total payout from placed affiliate marketing orders during the selected period. */
  estimated_commission_placed: number;
  /** Estimated total payout from confirmed affiliate marketing orders during the selected period. */
  estimated_commission_confirmed: number;
  /** Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_placed: number;
  /** Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_confirmed: number;
  /** Total number of unique buyers who placed affiliate marketing orders from your shop set during the selected period. */
  buyers_placed: number;
  /** Total number of unique buyers with confirmed affiliate marketing orders from your shop set during the selected period. */
  buyers_confirmed: number;
  /** Total number of unique new buyers who placed affiliate marketing orders from your shop set during the selected period. */
  new_buyers_placed: number;
  /** Total number of unique new buyers with confirmed affiliate marketing orders from your shop set during the selected period. */
  new_buyers_confirmed: number;
}

export interface GetShopAffiliatePerformanceDetail {
  /** Region code of the shop. */
  region: string;
  /** Currency code used for all amount-based metrics of this shop item. */
  currency: string;
  /** Shop identifier. */
  shop_id: number;
  /** Shop name. */
  shop_name: string;
  /** Total value of placed orders generated through affiliate marketing during the selected period. */
  sales_placed: number;
  /** Total value of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  sales_confirmed: number;
  /** Total number of items sold in placed orders generated through affiliate marketing during the selected period. */
  units_sold_placed: number;
  /** Total number of items sold in confirmed orders generated through affiliate marketing during the selected period. */
  units_sold_confirmed: number;
  /** Total number of placed orders generated through affiliate marketing during the selected period. */
  orders_placed: number;
  /** Total number of confirmed orders generated through affiliate marketing during the selected period. Confirmed orders are either non-Cash On Delivery (non-COD) orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order). */
  orders_confirmed: number;
  /** Estimated total payout from placed affiliate marketing orders during the selected period. */
  estimated_commission_placed: number;
  /** Estimated total payout from confirmed affiliate marketing orders during the selected period. */
  estimated_commission_confirmed: number;
  /** Return on Investment = Sales Placed / Estimated Commission Placed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_placed: number;
  /** Return on Investment = Sales Confirmed / Estimated Commission Confirmed. It can be used to evaluate the efficiency of your investment in affiliate marketing. */
  roi_confirmed: number;
  /** Total number of unique buyers who placed affiliate marketing orders from this shop during the selected period. */
  buyers_placed: number;
  /** Total number of unique buyers with confirmed affiliate marketing orders from this shop during the selected period. */
  buyers_confirmed: number;
  /** Total number of unique new buyers who placed affiliate marketing orders from this shop during the selected period. */
  new_buyers_placed: number;
  /** Total number of unique new buyers with confirmed affiliate marketing orders from this shop during the selected period. */
  new_buyers_confirmed: number;
}

/**
 * Response for get_shop_affiliate_performance
 */
export interface GetShopAffiliatePerformanceResponse extends BaseResponse {
  response: {
    summary?: GetShopAffiliatePerformanceSummary[];
    details?: GetShopAffiliatePerformanceDetail[];
  };
}

/**
 * Parameters for get_shop_livestream_performance
 */
export interface GetShopLivestreamPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for livestream metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried with the affiliate-compatible livestream granularity.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.
   * Limitations:
   * - If provided, must contain at most 50 shops.
   * - If omitted or passed as [], all shops under the specified principal_id will be queried.
   * - If provided as a non-empty array, all shops must belong to the specified principal_id.
   * Duplicate shops are not allowed. */
  shop_list?: PrincipalShopListItem[];
}

export interface GetShopLivestreamPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders. */
  orders: number;
  /** Number of unique buyers who placed order from your Livestream. */
  buyers: number;
  /** Total number of likes in your Livestream. */
  likes: number;
  /** Total number of comments acquired during your Livestream. */
  comments: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Number of items sold from placed orders during your Livestream. */
  units_sold: number;
  /** Total views from your Livestream. */
  total_views: number;
  /** Total duration of your Livestream. */
  total_live_duration: number;
  /** Total unique viewers from your Livestream. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Livestream. */
  atc_units: number;
  /** Total count of Livestream sessions in the selected period. */
  total_livestreams: number;
  /** Average duration of your Livestream. */
  average_live_duration: number;
  /** Average time viewers watch your Livestreams. */
  average_views_duration: number;
  /** Total followers gained from your Livestream. */
  new_followers: number;
  /** Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  new_buyers: number;
  /** Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  existing_buyers: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

export interface GetShopLivestreamPerformanceDetail {
  /** Region code of the shop. */
  region: string;
  /** Currency code used for all amount-based metrics of this shop item. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Livestream, including cancelled orders. */
  orders: number;
  /** Number of unique buyers who placed order from your Livestream. */
  buyers: number;
  /** Total number of likes in your Livestream. */
  likes: number;
  /** Total number of comments acquired during your Livestream. */
  comments: number;
  /** Shop identifier. */
  shop_id: number;
  /** Shop name. */
  shop_name: string;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled orders. */
  sales_gross: number;
  /** Number of items sold from placed orders during your Livestream. */
  units_sold: number;
  /** Total views from your Livestream. */
  total_views: number;
  /** Total duration of your Livestream. */
  total_live_duration: number;
  /** Total unique viewers from your Livestream. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Livestream. */
  atc_units: number;
  /** Total count of Livestream sessions in the selected period. */
  total_livestreams: number;
  /** Average duration of your Livestream. */
  average_live_duration: number;
  /** Average time viewers watch your Livestreams. */
  average_views_duration: number;
  /** Total followers gained from your Livestream. */
  new_followers: number;
  /** Number of buyers who have not had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  new_buyers: number;
  /** Number of buyers who have already had placed orders (including paid and unpaid) via your Livestream in the past 365 days. */
  existing_buyers: number;
  /** Value of placed orders (paid and unpaid) during your Livestream, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value excludes the refund amount for all non-cancelled and invalid items. */
  sales_net: number;
  /** Livestream orders / Livestream views. */
  conversion_rate: number;
}

/**
 * Response for get_shop_livestream_performance
 */
export interface GetShopLivestreamPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetShopLivestreamPerformanceSummary[];
    details?: GetShopLivestreamPerformanceDetail[];
  };
}

/**
 * Parameters for get_shop_sales_performance_detail
 */
export interface GetShopSalesPerformanceDetailParams {
  /** Start date of the requested period in&nbsp;YYYY-MM-DD&nbsp;format.
   *
   * Limitations:
   * - Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date .- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: ["GMT+7", "GMT+8", "GMT-3"]- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range and is internally queried as daily data.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.-Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** List of shops to be queried. This field is optional. If omitted or passed as an empty array, the API will return data for all shops under the specified principal_id.Limitations:- If provided, must contain at most 50 shops.- If omitted or passed as [], all shops under the specified principal_id will be queried.- If provided as a non-empty array, all shops must belong to the specified principal_id.Duplicate shops are not allowed. */
  shop_list?: PrincipalShopListItem[];
}

export interface GetShopSalesPerformanceDetailSummary {
  /** currency code used for all monetary metrics of this shop item */
  currency: string;
  /** Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.&nbsp;Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** The number of placed orders, including unpaid orders. */
  orders: number;
  /** The number of units associated with the orders placed, including unpaid orders. */
  units_sold: number;
  /** Average Basket Size = Sales ÷ Orders. It measures average sales per order */
  average_basket_size: number;
  /** Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction. */
  items_per_order: number;
  /** Average selling price=Sales ÷ Units Sold. It measures average sales per unit. */
  average_selling_price: number;
  /** Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023. */
  product_clicks: number;
  /** The number of visits to the product page. */
  product_views: number;
  /** Total number of unique visitors who viewed your shop, product detail pages, or item cards in Live or Video over the selected time period. Multiple views of one page by the same visitor is counted as 1 unique visitor. This metric is only available after 31/12/2023 */
  unique_visitors: number;
  /** Item conversion rate = Units Sold ÷ Product Views. */
  item_conversion_rate: number;
  /** Number of orders divided by total number of product clicks, over the selected time period. This metric is only available after 31/12/2023 */
  order_conversion_rate: number;
  /** Total flash sale order value (paid and unpaid) within the selected time period (done by both seller and platform flash sale), reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  flash_sale_sales: number;
  /** The number of placed orders, including unpaid orders.This includes flash sales done by seller and platform. */
  flash_sale_orders: number;
  /** The number of units associated with the orders placed, including unpaid orders.This includes flash sales done by seller and platform. */
  flash_sale_units_sold: number;
  /** Total value of all placed orders using your vouchers, including shipping fees and excluding other promotions, over the selected time period. */
  voucher_sales: number;
  /** Total number of unique buyers who applied your vouchers at least once, in all placed orders over the selected time period. */
  voucher_buyers: number;
  /** Usage Rate = Vouchers Redeemed / Vouchers Claimed * 100% */
  voucher_usage_rate: number;
  /** Cost to Income Ratio (Voucher Cost/Gross Sales) measures the cost of vouchers relative to the revenue generated by the voucher from the sales of your shop's products. */
  voucher_cir: number;
  /** Total cost of vouchers applied at checkout, including shipping fees and excluding other promotions, over the selected time period. */
  voucher_cost: number;
}

export interface GetShopSalesPerformanceDetailDetail {
  /** Shop identifier. */
  shop_id: number;
  /** Shop name. */
  shop_name: string;
  /** Shop region code. */
  shop_region_code: string;
  /** currency code used for all monetary metrics of this shop item */
  currency: string;
  /** Total order value (paid and unpaid) within the selected time period, reflecting the sales amount received by sellers after deducting seller rebates.&nbsp;Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** The number of placed orders, including unpaid orders. */
  orders: number;
  /** The number of units associated with the orders placed, including unpaid orders. */
  units_sold: number;
  /** Average Basket Size = Sales ÷ Orders. It measures average sales per order */
  average_basket_size: number;
  /** Items Per Order = Units Sold ÷ Orders. It measures the average number of items sold per transaction. */
  items_per_order: number;
  /** Average selling price=Sales ÷ Units Sold. It measures average sales per unit. */
  average_selling_price: number;
  /** Total number of times your item cards were clicked over the selected time period, on both App and PC. This metric is only available after 31/12/2023. */
  product_clicks: number;
  /** The number of visits to the product page. */
  product_views: number;
  /** Total number of unique visitors who viewed your shop, product detail pages, or item cards in Live or Video over the selected time period. Multiple views of one page by the same visitor is counted as 1 unique visitor. This metric is only available after 31/12/2023 */
  unique_visitors: number;
  /** Item conversion rate = Units Sold ÷ Product Views. */
  item_conversion_rate: number;
  /** Number of orders divided by total number of product clicks, over the selected time period. This metric is only available after 31/12/2023 */
  order_conversion_rate: number;
  /** Average daily ATP% of top 80% GMV-contributing SKUs in the selected timeframe, the data will begin from 2023-10-01. */
  atp_top_skus_l1d: number;
  /** Average ATP% of top 80% GMV SKUs over a rolling 30-day period in the selected timeframe, the data will begin from 2023-10-01. */
  atp_top_skus_l30d: number;
  /** Average daily ATP% of all GMV-contributing SKUs in the selected timeframe, the data will begin from 2023-10-01. */
  atp_live_skus_l1d: number;
  /** Average ATP% of all-GMV SKUs over a rolling 30-day period in the selected timeframe, the data will begin from 2023-10-01. */
  atp_live_skus_l30d: number;
  /** Total flash sale order value (paid and unpaid) within the selected time period (done by both seller and platform flash sale), reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  flash_sale_sales: number;
  /** The number of placed orders, including unpaid orders.This includes flash sales done by seller and platform. */
  flash_sale_orders: number;
  /** The number of units associated with the orders placed, including unpaid orders.This includes flash sales done by seller and platform. */
  flash_sale_units_sold: number;
  /** Total value of all placed orders using your vouchers, including shipping fees and excluding other promotions, over the selected time period. */
  voucher_sales: number;
  /** Total number of unique buyers who applied your vouchers at least once, in all placed orders over the selected time period. */
  voucher_buyers: number;
  /** Usage Rate = Vouchers Redeemed / Vouchers Claimed * 100% */
  voucher_usage_rate: number;
  /** Cost to Income Ratio (Voucher Cost/Gross Sales) measures the cost of vouchers relative to the revenue generated by the voucher from the sales of your shop's products. */
  voucher_cir: number;
  /** Total cost of vouchers applied at checkout, including shipping fees and excluding other promotions, over the selected time period. */
  voucher_cost: number;
}

/**
 * Response for get_shop_sales_performance_detail
 */
export interface GetShopSalesPerformanceDetailResponse extends BaseResponse {
  response: {
    summary?: GetShopSalesPerformanceDetailSummary[];
    details?: GetShopSalesPerformanceDetailDetail[];
  };
}

/**
 * Parameters for get_shop_video_performance
 */
export interface GetShopVideoPerformanceParams {
  /** Start date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:- Must use the YYYY-MM-DD format.- Must be a valid calendar date.- Must not be later than end_date.- Validation is based on the requested timezone.- The earliest selectable date is calculated as: current day in timezone - 1 day - 2 years.- The exact boundary rules depend on granularity:-- For customize, start_date must not be earlier than the earliest selectable date.-- For day, start_date must equal end_date.-- For week, start_date must be a Sunday.-- For month, start_date must be the first day of the month.-- For quarter, start_date must be the first day of the quarter.-- For year, start_date must be the first day of the year. */
  start_date: string;
  /** End date of the requested period in YYYY-MM-DD format.
   *
   * Limitations:
   *
   * - Must use the YYYY-MM-DD format.
   *
   * - Must be a valid calendar date.
   *
   * - Must not be earlier than start_date.
   *
   * - Validation is based on the requested timezone.
   *
   * - For customize, end_date must not be later than the day before the current day in the requested timezone. The inclusive date range from start_date to end_date must not exceed 366 days.
   *
   * - For day, end_date must equal start_date.
   *
   * - For week, end_date must be within the selected week range: from start_date (Sunday) to the end of that Sunday-to-Saturday week, or to the latest selectable day if the week extends beyond today. Formally: startDate ≤ endDate ≤ min(startDate + 6 days, today - 1 day).
   *
   * - For month, end_date must be within the selected month: from the 1st day of the month to the last calendar day of that month, or to the latest selectable day for the current month. Formally: startDate ≤ endDate ≤ min(month end, today - 1 day).
   *
   * - For quarter, end_date must be within the selected quarter: from the 1st day of the quarter to the last calendar day of that quarter, or to the latest selectable day for the current quarter. Formally: startDate ≤ endDate ≤ min(quarter end, today - 1 day).
   *
   * - For year, end_date must be within the selected year: from January 1st to December 31st of that year, or to the latest selectable day for the current year. Formally: startDate ≤ endDate ≤ min(Dec 31, today - 1 day). */
  end_date: string;
  /** Timezone used for date boundary calculation, selectable date validation, and timestamp conversion.
   *
   * Limitations:- Enum values: [\"GMT+7\", \"GMT+8\", \"GMT-3\"]- The API internally normalizes the open API timezone value for video metric queries.- All date validation rules are evaluated in the requested timezone. */
  timezone: string;
  /** Aggregation granularity that determines the validation rules for the requested date range and the reporting period.
   * Limitations:- Supported values are customize, day, week, month, quarter, and year.- customize is validated as a free date range.- day represents a single calendar day.- week requires a Sunday-based calendar week.- month requires a calendar month range.- quarter requires a calendar quarter range.- year requires a calendar year range.- Any other value is rejected as invalid_parameter. */
  granularity: string;
  /** shops under the specified principal_id.
   * Limitations:
   * - If provided, must contain at most 50 shops.
   * - If omitted or passed as [], all shops under the specified principal_id will be queried.
   * - If provided as a non-empty array, all shops must belong to the specified principal_id.
   * Duplicate shops are not allowed. */
  shop_list?: PrincipalShopListItem[];
}

export interface GetShopVideoPerformanceSummary {
  /** Currency code used for all amount-based metrics in the summary. Summary values are returned in USD. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Video, including cancelled orders. */
  orders: number;
  /** Number of Like clicks from all videos. */
  likes: number;
  /** Number of comments generated from all videos. */
  comments: number;
  /** Number of shares created from all videos. */
  share: number;
  /** Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Number of items sold from placed orders during your Video. */
  units_sold: number;
  /** Number of views from the video that lasted for more than 3 seconds. */
  effective_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Total duration of your videos in minutes. This field is returned only in summary. */
  total_video_duration: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Video. */
  atc_units: number;
  /** Average duration of your videos in minutes. */
  average_video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Video orders / effective video views. */
  conversion_rate: number;
}

export interface GetShopVideoPerformanceDetail {
  /** Region code of the shop. */
  region: string;
  /** Currency code used for all amount-based metrics of this shop item. */
  currency: string;
  /** Number of placed orders (paid and unpaid) during your Video, including cancelled orders. */
  orders: number;
  /** Number of Like clicks from all videos. */
  likes: number;
  /** Number of comments generated from all videos. */
  comments: number;
  /** Number of shares created from all videos. */
  share: number;
  /** Shop identifier. */
  shop_id: number;
  /** Shop name. */
  shop_name: string;
  /** Value of placed orders (paid and unpaid) from all videos in the period, reflecting the sales amount received by sellers after deducting seller rebates. Note: This value includes sales from cancelled and return/refund orders. */
  sales: number;
  /** Number of items sold from placed orders during your Video. */
  units_sold: number;
  /** Number of views from the video that lasted for more than 3 seconds. */
  effective_views: number;
  /** Number of video viewers in the selected period. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  unique_viewers: number;
  /** Number of Add To Cart button clicks for all products in the orange bag during your Video. */
  atc_units: number;
  /** Average duration of your videos in minutes. */
  average_video_duration: number;
  /** Average viewing duration per video in minutes. */
  average_views_duration: number;
  /** Number of unique buyers who placed order from your Video. Note: This data is unavailable when you select by month, by quarter, by year, customize date, or a non-full weekly range. */
  total_unique_buyers: number;
  /** Video orders / effective video views. */
  conversion_rate: number;
}

/**
 * Response for get_shop_video_performance
 */
export interface GetShopVideoPerformanceResponse extends BaseResponse {
  response: {
    summary?: GetShopVideoPerformanceSummary[];
    details?: GetShopVideoPerformanceDetail[];
  };
}
