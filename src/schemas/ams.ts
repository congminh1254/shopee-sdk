import { BaseResponse } from "./base.js";

// ============================================================================
// Common Types
// ============================================================================

/**
 * Item information for targeted campaigns
 */
export interface AmsItemInfo {
  /** Item ID */
  item_id: number;
  /** Commission rate (e.g., 1.1 means 1.1%) */
  rate: number;
}

/**
 * Affiliate information for targeted campaigns
 */
export interface AmsAffiliateInfo {
  /** The unique key for affiliate */
  affiliate_id: number;
}

/**
 * Failed item in response
 */
export interface AmsFailedItem {
  /** Item ID */
  item_id: number;
  /** Fail error */
  fail_error: string;
  /** Fail message */
  fail_message: string;
}

/**
 * Failed affiliate in response
 */
export interface AmsFailedAffiliate {
  /** Affiliate ID */
  affiliate_id: number;
  /** Fail error */
  fail_error: string;
  /** Fail message */
  fail_message: string;
}

// ============================================================================
// Open Campaign APIs
// ============================================================================

/**
 * Parameters for add_all_products_to_open_campaign API
 */
export type AddAllProductsToOpenCampaignParams = {
  /** Commission rate, 1.1 means 1.1%, supports two decimal places */
  commission_rate: number;
  /** Start time of the open campaign (Unix timestamp) */
  period_start_time: number;
  /** End time of the open campaign (Unix timestamp), use 32503651199 for permanent */
  period_end_time: number;
};

/**
 * Response for add_all_products_to_open_campaign API
 */
export interface AddAllProductsToOpenCampaignResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

/**
 * Parameters for batch_add_products_to_open_campaign API
 */
export type BatchAddProductsToOpenCampaignParams = {
  /** List of item IDs to add to open campaign */
  item_id_list: number[];
  /** Commission rate, 1.1 means 1.1%, supports two decimal places */
  commission_rate: number;
  /** Start time of the open campaign (Unix timestamp) */
  period_start_time: number;
  /** End time of the open campaign (Unix timestamp), use 32503651199 for permanent */
  period_end_time: number;
};

/**
 * Response for batch_add_products_to_open_campaign API
 */
export interface BatchAddProductsToOpenCampaignResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

/**
 * Parameters for batch_edit_products_open_campaign_setting API
 */
export type BatchEditProductsOpenCampaignSettingParams = {
  /** List of campaign IDs to edit */
  campaign_ids: number[];
  /** Commission rate, 1.1 means 1.1%, supports two decimal places */
  commission_rate?: number;
  /** Start time of the open campaign (Unix timestamp) */
  period_start_time?: number;
  /** End time of the open campaign (Unix timestamp) */
  period_end_time?: number;
};

/**
 * Response for batch_edit_products_open_campaign_setting API
 */
export interface BatchEditProductsOpenCampaignSettingResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

/**
 * Parameters for batch_get_products_suggested_rate API
 */
export type BatchGetProductsSuggestedRateParams = {
  /** Comma-separated list of item IDs */
  item_id_list: string;
};

/**
 * Response for batch_get_products_suggested_rate API
 */
export interface BatchGetProductsSuggestedRateResponse extends BaseResponse {
  response: {
    /** List of suggested rates for items */
    item_list: Array<{
      /** Item ID */
      item_id: number;
      /** Suggested commission rate */
      suggested_rate: number;
    }>;
  };
}

/**
 * Parameters for batch_remove_products_open_campaign_setting API
 */
export type BatchRemoveProductsOpenCampaignSettingParams = {
  /** List of campaign IDs to remove */
  campaign_ids: number[];
};

/**
 * Response for batch_remove_products_open_campaign_setting API
 */
export interface BatchRemoveProductsOpenCampaignSettingResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

/**
 * Parameters for edit_all_products_open_campaign_setting API
 */
export type EditAllProductsOpenCampaignSettingParams = {
  /** Commission rate, 1.1 means 1.1%, supports two decimal places */
  commission_rate?: number;
  /** Start time of the open campaign (Unix timestamp) */
  period_start_time?: number;
  /** End time of the open campaign (Unix timestamp) */
  period_end_time?: number;
};

/**
 * Response for edit_all_products_open_campaign_setting API
 */
export interface EditAllProductsOpenCampaignSettingResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

/**
 * Parameters for get_open_campaign_added_product API
 */
export type GetOpenCampaignAddedProductParams = {
  /** Page size (max 100) */
  page_size: number;
  /** Cursor for pagination */
  cursor?: string;
  /** Sort by field */
  sort_by?: string;
  /** Search type */
  search_type?: string;
  /** Search content */
  search_content?: string;
};

/**
 * Response for get_open_campaign_added_product API
 */
export interface GetOpenCampaignAddedProductResponse extends BaseResponse {
  response: {
    /** Total count of products */
    total_count: number;
    /** Cursor for next page */
    next_cursor: string;
    /** Whether there are more pages */
    has_more: boolean;
    /** List of products added to open campaign */
    item_list: Array<{
      /** Item ID */
      item_id: number;
      /** Campaign ID */
      campaign_id: number;
      /** Commission rate */
      commission_rate: number;
      /** Period start time */
      period_start_time: number;
      /** Period end time */
      period_end_time: number;
      /** Item name */
      item_name?: string;
    }>;
  };
}

/**
 * Parameters for get_open_campaign_batch_task_result API
 */
export type GetOpenCampaignBatchTaskResultParams = {
  /** Task ID returned from batch operations */
  task_id: string;
};

/**
 * Response for get_open_campaign_batch_task_result API
 */
export interface GetOpenCampaignBatchTaskResultResponse extends BaseResponse {
  response: {
    /** Task status: processing, completed, failed */
    status: string;
    /** Success count */
    success_count?: number;
    /** Failed count */
    fail_count?: number;
    /** List of failed item IDs */
    fail_item_id_list?: number[];
  };
}

/**
 * Parameters for get_open_campaign_not_added_product API
 */
export type GetOpenCampaignNotAddedProductParams = {
  /** Page size (max 100) */
  page_size: number;
  /** Cursor for pagination */
  cursor?: string;
  /** Sort by field */
  sort_by?: string;
  /** Search type */
  search_type?: string;
  /** Search content */
  search_content?: string;
};

/**
 * Response for get_open_campaign_not_added_product API
 */
export interface GetOpenCampaignNotAddedProductResponse extends BaseResponse {
  response: {
    /** Total count of products */
    total_count: number;
    /** Cursor for next page */
    next_cursor: string;
    /** Whether there are more pages */
    has_more: boolean;
    /** List of products not added to open campaign */
    item_list: Array<{
      /** Item ID */
      item_id: number;
      /** Item name */
      item_name?: string;
      /** Suggested commission rate */
      suggested_rate?: number;
    }>;
  };
}

/**
 * Parameters for get_open_campaign_performance API
 */
export type GetOpenCampaignPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_open_campaign_performance API
 */
export interface GetOpenCampaignPerformanceResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of performance data */
    data_list?: Array<{
      /** Item ID */
      item_id?: number;
      /** Sales amount */
      sales?: string;
      /** Number of orders */
      orders?: number;
      /** Estimated commission */
      est_commission?: string;
      /** Clicks */
      clicks?: number;
    }>;
  };
}

/**
 * Response for remove_all_products_open_campaign_setting API
 */
export interface RemoveAllProductsOpenCampaignSettingResponse extends BaseResponse {
  response: {
    /** Task ID for checking the batch task result */
    task_id: string;
  };
}

// ============================================================================
// Targeted Campaign APIs
// ============================================================================

/**
 * Parameters for create_new_targeted_campaign API
 */
export type CreateNewTargetedCampaignParams = {
  /** Campaign name */
  campaign_name: string;
  /** Start time (Unix timestamp) */
  period_start_time: number;
  /** End time (Unix timestamp), use 32503651199 for permanent */
  period_end_time: number;
  /** Whether to set a budget */
  is_set_budget: boolean;
  /** Budget amount (required if is_set_budget is true) */
  budget?: number;
  /** Message displayed to affiliates */
  seller_message: string;
  /** List of items with commission rates */
  item_list: AmsItemInfo[];
  /** List of affiliates to invite */
  affiliate_list: AmsAffiliateInfo[];
};

/**
 * Response for create_new_targeted_campaign API
 */
export interface CreateNewTargetedCampaignResponse extends BaseResponse {
  response: {
    /** Created campaign ID */
    campaign_id: number;
    /** List of failed items */
    fail_item_list?: AmsFailedItem[];
    /** List of failed affiliates */
    fail_affiliate_list?: AmsFailedAffiliate[];
  };
}

/**
 * Parameters for edit_affiliate_list_of_targeted_campaign API
 */
export type EditAffiliateListOfTargetedCampaignParams = {
  /** Campaign ID */
  campaign_id: number;
  /** Edit type: add or remove */
  edit_type: string;
  /** List of affiliates */
  affiliate_list: AmsAffiliateInfo[];
};

/**
 * Response for edit_affiliate_list_of_targeted_campaign API
 */
export interface EditAffiliateListOfTargetedCampaignResponse extends BaseResponse {
  response: {
    /** Campaign ID */
    campaign_id: number;
    /** List of failed affiliates */
    fail_affiliate_list?: AmsFailedAffiliate[];
  };
}

/**
 * Parameters for edit_product_list_of_targeted_campaign API
 */
export type EditProductListOfTargetedCampaignParams = {
  /** Campaign ID */
  campaign_id: number;
  /** Edit type: add, remove, or edit */
  edit_type: string;
  /** List of items with commission rates */
  item_list: AmsItemInfo[];
};

/**
 * Response for edit_product_list_of_targeted_campaign API
 */
export interface EditProductListOfTargetedCampaignResponse extends BaseResponse {
  response: {
    /** Campaign ID */
    campaign_id: number;
    /** List of failed items */
    fail_item_list?: AmsFailedItem[];
  };
}

/**
 * Parameters for get_targeted_campaign_addable_product_list API
 */
export type GetTargetedCampaignAddableProductListParams = {
  /** Page size (max 100) */
  page_size: number;
  /** Cursor for pagination */
  cursor?: string;
  /** Sort by field */
  sort_by?: string;
  /** Search type */
  search_type?: string;
  /** Search content */
  search_content?: string;
};

/**
 * Response for get_targeted_campaign_addable_product_list API
 */
export interface GetTargetedCampaignAddableProductListResponse extends BaseResponse {
  response: {
    /** Total count of products */
    total_count: number;
    /** Cursor for next page */
    next_cursor: string;
    /** Whether there are more pages */
    has_more: boolean;
    /** List of addable products */
    item_list: Array<{
      /** Item ID */
      item_id: number;
      /** Item name */
      item_name?: string;
      /** Suggested commission rate */
      suggested_rate?: number;
    }>;
  };
}

/**
 * Parameters for get_targeted_campaign_list API
 */
export type GetTargetedCampaignListParams = {
  /** Page size */
  page_size?: number;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Comma-separated list of campaign IDs to filter */
  campaign_id_list?: string;
  /** Campaign name to search */
  campaign_name?: string;
  /** Campaign status to filter */
  campaign_status?: string;
};

/**
 * Response for get_targeted_campaign_list API
 */
export interface GetTargetedCampaignListResponse extends BaseResponse {
  response: {
    /** Total count of campaigns */
    total_count: number;
    /** Whether there are more pages */
    has_more: boolean;
    /** List of campaigns */
    campaign_list: Array<{
      /** Campaign ID */
      campaign_id: number;
      /** Campaign name */
      campaign_name: string;
      /** Campaign status */
      campaign_status: string;
      /** Period start time */
      period_start_time: number;
      /** Period end time */
      period_end_time: number;
      /** Whether budget is set */
      is_set_budget: boolean;
      /** Budget amount */
      budget?: number;
      /** Create time */
      create_time: number;
      /** Update time */
      update_time: number;
    }>;
  };
}

/**
 * Parameters for get_targeted_campaign_performance API
 */
export type GetTargetedCampaignPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_targeted_campaign_performance API
 */
export interface GetTargetedCampaignPerformanceResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of performance data by campaign */
    data_list?: Array<{
      /** Campaign ID */
      campaign_id: number;
      /** Sales amount */
      sales?: string;
      /** Number of orders */
      orders?: number;
      /** Estimated commission */
      est_commission?: string;
      /** Clicks */
      clicks?: number;
    }>;
  };
}

/**
 * Parameters for get_targeted_campaign_settings API
 */
export type GetTargetedCampaignSettingsParams = {
  /** Campaign ID */
  campaign_id: number;
};

/**
 * Response for get_targeted_campaign_settings API
 */
export interface GetTargetedCampaignSettingsResponse extends BaseResponse {
  response: {
    /** Campaign ID */
    campaign_id: number;
    /** Campaign name */
    campaign_name: string;
    /** Campaign status */
    campaign_status: string;
    /** Period start time */
    period_start_time: number;
    /** Period end time */
    period_end_time: number;
    /** Whether budget is set */
    is_set_budget: boolean;
    /** Budget amount */
    budget?: number;
    /** Seller message */
    seller_message?: string;
    /** List of items in the campaign */
    item_list?: Array<{
      /** Item ID */
      item_id: number;
      /** Commission rate */
      rate: number;
    }>;
    /** List of affiliates in the campaign */
    affiliate_list?: Array<{
      /** Affiliate ID */
      affiliate_id: number;
      /** Affiliate name */
      affiliate_name?: string;
    }>;
  };
}

/**
 * Parameters for terminate_targeted_campaign API
 */
export type TerminateTargetedCampaignParams = {
  /** Campaign ID */
  campaign_id: number;
};

/**
 * Response for terminate_targeted_campaign API
 */
export interface TerminateTargetedCampaignResponse extends BaseResponse {
  response: {
    /** Campaign ID */
    campaign_id: number;
  };
}

/**
 * Parameters for update_basic_info_of_targeted_campaign API
 */
export type UpdateBasicInfoOfTargetedCampaignParams = {
  /** Campaign ID */
  campaign_id: number;
  /** Campaign name */
  campaign_name?: string;
  /** Period start time */
  period_start_time?: number;
  /** Period end time */
  period_end_time?: number;
  /** Whether to set a budget */
  is_set_budget?: boolean;
  /** Budget amount */
  budget?: number;
  /** Seller message */
  seller_message?: string;
};

/**
 * Response for update_basic_info_of_targeted_campaign API
 */
export interface UpdateBasicInfoOfTargetedCampaignResponse extends BaseResponse {
  response: {
    /** Campaign ID */
    campaign_id: number;
  };
}

// ============================================================================
// Performance & Analytics APIs
// ============================================================================

/**
 * Parameters for get_affiliate_performance API
 */
export type GetAffiliatePerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_affiliate_performance API
 */
export interface GetAffiliatePerformanceResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of affiliate performance data */
    data_list?: Array<{
      /** Affiliate ID */
      affiliate_id: number;
      /** Affiliate name */
      affiliate_name?: string;
      /** Sales amount */
      sales?: string;
      /** Number of orders */
      orders?: number;
      /** Estimated commission */
      est_commission?: string;
      /** Clicks */
      clicks?: number;
    }>;
  };
}

/**
 * Response for get_auto_add_new_product_toggle_status API
 */
export interface GetAutoAddNewProductToggleStatusResponse extends BaseResponse {
  response: {
    /** Whether auto-add new product is enabled */
    open: boolean;
    /** Commission rate for auto-added products */
    commission_rate?: number;
  };
}

/**
 * Parameters for get_campaign_key_metrics_performance API
 */
export type GetCampaignKeyMetricsPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
};

/**
 * Response for get_campaign_key_metrics_performance API
 */
export interface GetCampaignKeyMetricsPerformanceResponse extends BaseResponse {
  response: {
    /** Total sales */
    sales?: string;
    /** Total orders */
    orders?: number;
    /** Total estimated commission */
    est_commission?: string;
    /** Total clicks */
    clicks?: number;
    /** ROI */
    roi?: string;
  };
}

/**
 * Parameters for get_content_performance API
 */
export type GetContentPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_content_performance API
 */
export interface GetContentPerformanceResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of content performance data */
    data_list?: Array<{
      /** Content ID */
      content_id?: number;
      /** Content type */
      content_type?: string;
      /** Sales amount */
      sales?: string;
      /** Number of orders */
      orders?: number;
      /** Estimated commission */
      est_commission?: string;
      /** Clicks */
      clicks?: number;
    }>;
  };
}

/**
 * Parameters for get_conversion_report API
 */
export type GetConversionReportParams = {
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
  /** Order SN to filter */
  order_sn?: string;
  /** Affiliate ID to filter */
  affiliate_id?: number;
  /** Item ID to filter */
  item_id?: number;
};

/**
 * Response for get_conversion_report API
 */
export interface GetConversionReportResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of conversion data */
    data_list?: Array<{
      /** Order SN */
      order_sn: string;
      /** Item ID */
      item_id: number;
      /** Affiliate ID */
      affiliate_id: number;
      /** Commission amount */
      commission?: string;
      /** Order time */
      order_time?: number;
      /** Order status */
      order_status?: string;
    }>;
  };
}

/**
 * Parameters for get_managed_affiliate_list API
 */
export type GetManagedAffiliateListParams = {
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_managed_affiliate_list API
 */
export interface GetManagedAffiliateListResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of managed affiliates */
    affiliate_list?: Array<{
      /** Affiliate ID */
      affiliate_id: number;
      /** Affiliate name */
      affiliate_name?: string;
      /** Affiliate status */
      status?: string;
    }>;
  };
}

/**
 * Parameters for get_optimization_suggestion_product API
 */
export type GetOptimizationSuggestionProductParams = {
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
  /** Recommendation reason filter */
  rcmd_reason_filter?: string;
};

/**
 * Response for get_optimization_suggestion_product API
 */
export interface GetOptimizationSuggestionProductResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of products with optimization suggestions */
    item_list?: Array<{
      /** Item ID */
      item_id: number;
      /** Item name */
      item_name?: string;
      /** Current rate */
      current_rate?: number;
      /** Suggested rate */
      suggested_rate?: number;
      /** Recommendation reason */
      rcmd_reason?: string;
    }>;
  };
}

/**
 * Parameters for get_performance_data_update_time API
 */
export type GetPerformanceDataUpdateTimeParams = {
  /** Marker type: AmsMarker */
  marker_type: string;
};

/**
 * Response for get_performance_data_update_time API
 */
export interface GetPerformanceDataUpdateTimeResponse extends BaseResponse {
  response: {
    /** Latest data date in YYYYMMDD format */
    latest_data_date: string;
  };
}

/**
 * Parameters for get_product_performance API
 */
export type GetProductPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_product_performance API
 */
export interface GetProductPerformanceResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of product performance data */
    data_list?: Array<{
      /** Item ID */
      item_id: number;
      /** Item name */
      item_name?: string;
      /** Sales amount */
      sales?: string;
      /** Number of orders */
      orders?: number;
      /** Estimated commission */
      est_commission?: string;
      /** Clicks */
      clicks?: number;
    }>;
  };
}

/**
 * Parameters for get_recommended_affiliate_list API
 */
export type GetRecommendedAffiliateListParams = {
  /** Page size */
  page_size?: number;
};

/**
 * Response for get_recommended_affiliate_list API
 */
export interface GetRecommendedAffiliateListResponse extends BaseResponse {
  response: {
    /** List of recommended affiliates */
    affiliate_list?: Array<{
      /** Affiliate ID */
      affiliate_id: number;
      /** Affiliate name */
      affiliate_name?: string;
      /** Recommendation reason */
      rcmd_reason?: string;
    }>;
  };
}

/**
 * Parameters for get_shop_performance API
 */
export type AmsGetShopPerformanceParams = {
  /** Period type: Day, Week, Month, Last7d, Last30d */
  period_type: string;
  /** Start date in YYYYMMDD format */
  start_date: string;
  /** End date in YYYYMMDD format */
  end_date: string;
  /** Order type: PlacedOrder or ConfirmedOrder */
  order_type: string;
  /** Channel: AllChannel, SocialMedia, ShopeeVideo, LiveStreaming */
  channel: string;
};

/**
 * Response for get_shop_performance API
 */
export interface AmsGetShopPerformanceResponse extends BaseResponse {
  response: {
    /** Total sales */
    sales?: string;
    /** Gross items sold */
    gross_item_sold?: number;
    /** Total orders */
    orders?: number;
    /** Total clicks */
    clicks?: number;
    /** Estimated commission */
    est_commission?: string;
    /** ROI */
    roi?: string;
    /** Total buyers */
    total_buyers?: number;
    /** New buyers */
    new_buyers?: number;
    /** Fetched date range */
    fetched_date_range?: string;
  };
}

/**
 * Response for get_shop_suggested_rate API
 */
export interface GetShopSuggestedRateResponse extends BaseResponse {
  response: {
    /** Suggested commission rate */
    suggested_rate: number;
    /** Minimum rate */
    min_rate?: number;
    /** Maximum rate */
    max_rate?: number;
  };
}

// ============================================================================
// Validation APIs
// ============================================================================

/**
 * Response for get_validation_list API
 */
export interface GetValidationListResponse extends BaseResponse {
  response: {
    /** List of validation periods */
    validation_list?: Array<{
      /** Validation ID */
      validation_id: number;
      /** Validation month in YYYYMM format */
      validation_month: string;
      /** Status */
      status: string;
    }>;
  };
}

/**
 * Parameters for get_validation_report API
 */
export type GetValidationReportParams = {
  /** Page number (starts from 1) */
  page_no?: number;
  /** Page size */
  page_size?: number;
  /** Validation ID */
  validation_id?: number;
  /** Validation month in YYYYMM format */
  validation_month?: string;
  /** Campaign source */
  campaign_source?: string;
};

/**
 * Response for get_validation_report API
 */
export interface GetValidationReportResponse extends BaseResponse {
  response: {
    /** Total count */
    total_count?: number;
    /** List of validation data */
    data_list?: Array<{
      /** Order SN */
      order_sn: string;
      /** Item ID */
      item_id: number;
      /** Affiliate ID */
      affiliate_id: number;
      /** Validated commission */
      validated_commission?: string;
      /** Validation status */
      validation_status?: string;
    }>;
  };
}

// ============================================================================
// Query APIs
// ============================================================================

/**
 * Parameters for query_affiliate_list API
 */
export type QueryAffiliateListParams = {
  /** Query type: id or name */
  query_type: string;
  /** Comma-separated list of affiliate IDs (when query_type is id) */
  affiliate_id_list?: string;
  /** Name to search (when query_type is name) */
  name?: string;
};

/**
 * Response for query_affiliate_list API
 */
export interface QueryAffiliateListResponse extends BaseResponse {
  response: {
    /** List of affiliates */
    affiliate_list?: Array<{
      /** Affiliate ID */
      affiliate_id: number;
      /** Affiliate name */
      affiliate_name?: string;
      /** Avatar URL */
      avatar_url?: string;
    }>;
  };
}

// ============================================================================
// Settings APIs
// ============================================================================

/**
 * Parameters for update_auto_add_new_product_setting API
 */
export type UpdateAutoAddNewProductSettingParams = {
  /** Whether to enable auto-add new product */
  open: boolean;
  /** Commission rate for auto-added products */
  commission_rate?: number;
};

/**
 * Response for update_auto_add_new_product_setting API
 */
export interface UpdateAutoAddNewProductSettingResponse extends BaseResponse {
  response: Record<string, never>;
}
