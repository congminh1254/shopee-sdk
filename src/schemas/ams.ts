import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field CampaignPartner
 */
export enum CampaignPartner {
  NAME = "Name",
  ID = "ID",
}
/**
 * Enum generated for field Platform
 */
export enum Platform {
  VIDEO = "video",
  SHOPEE = "shopee",
}
/**
 * Request parameters for add_all_products_to_open_campaign
 *
 * Add all eligible products into the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_add_products_to_open_campaign by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export interface AddAllProductsToOpenCampaignRequest {
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate: number;
  /**
   * Period start time, in seconds, if missing, will set 10 minutes later
   */
  period_start_time?: Date | number;
  /**
   * Period end time, in seconds, if missing, will set 32503651199 (2999-12-31 23:59:59) represent of no limit
   */
  period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * AddAllProductsToOpenCampaign_Response sub-interface for AddAllProductsToOpenCampaignResponse
 */
export interface AddAllProductsToOpenCampaign_Response {
  /**
   * Task type. Applicable values: batch_add_open_campaignsbatch_remove_open_campaignsbatch_update_open_campaignsFor this API, task type will be batch_add_open_campaigns
   */
  task_type?: string;
  /**
   * Task id, used to query task progress when calling v2.ams.get_open_campaign_batch_task_result API
   */
  task_id?: string;
  [key: string]: any;
}
/**
 * Response data payload for add_all_products_to_open_campaign
 */
export type AddAllProductsToOpenCampaignResponseData = AddAllProductsToOpenCampaign_Response;
/**
 * Response payload for add_all_products_to_open_campaign
 *
 * Add all eligible products into the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_add_products_to_open_campaign by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export type AddAllProductsToOpenCampaignResponse =
  FetchResponse<AddAllProductsToOpenCampaignResponseData>;
/**
 * Request parameters for batch_add_products_to_open_campaign
 *
 * Batch add products to the Open Campaign for a given list of product IDs
 */
export interface BatchAddProductsToOpenCampaignRequest {
  /**
   * The list of item_id, max limit: 50
   */
  item_id_list: number[];
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate: number;
  /**
   * Period start time, in seconds, if missing, will set 10 minutes later
   */
  period_start_time?: Date | number;
  /**
   * Period end time, in seconds, if missing, will set 32503651199 (2999-12-31 23:59:59) represent of no limit
   */
  period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * BatchAddProductsToOpenCampaign_Failed sub-interface for BatchAddProductsToOpenCampaign_Response
 */
export interface BatchAddProductsToOpenCampaign_Failed {
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Fail Error
   */
  fail_error?: string;
  /**
   * Fail Message
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * BatchAddProductsToOpenCampaign_Response sub-interface for BatchAddProductsToOpenCampaignResponse
 */
export interface BatchAddProductsToOpenCampaign_Response {
  failed_list?: BatchAddProductsToOpenCampaign_Failed[];
  /**
   * Success Item ID List
   */
  success_list?: number[];
  [key: string]: any;
}
/**
 * Response data payload for batch_add_products_to_open_campaign
 */
export type BatchAddProductsToOpenCampaignResponseData = BatchAddProductsToOpenCampaign_Response;
/**
 * Response payload for batch_add_products_to_open_campaign
 *
 * Batch add products to the Open Campaign for a given list of product IDs
 */
export type BatchAddProductsToOpenCampaignResponse =
  FetchResponse<BatchAddProductsToOpenCampaignResponseData>;
/**
 * Request parameters for batch_edit_products_open_campaign_setting
 *
 * Batch update open campaign settings for a given list of product IDs
 */
export interface BatchEditProductsOpenCampaignSettingRequest {
  /**
   * The list of campaign_id, max limit: 50
   */
  campaign_ids: number[];
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate?: number;
  /**
   * Period start time, in seconds, if missing, will skip and do not updateOnly allow to update on UPCOMING status, when in other status, will skip too
   */
  period_start_time?: Date | number;
  /**
   * Period end time, in seconds, if missing, will skip and do not updateCan set 32503651199 to make period no limit
   */
  period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * BatchEditProductsOpenCampaignSetting_Failed sub-interface for BatchEditProductsOpenCampaignSetting_Response
 */
export interface BatchEditProductsOpenCampaignSetting_Failed {
  /**
   * Campaign ID
   */
  campaign_id?: number;
  /**
   * Fail error
   */
  fail_error?: string;
  /**
   * Fail message
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * BatchEditProductsOpenCampaignSetting_Response sub-interface for BatchEditProductsOpenCampaignSettingResponse
 */
export interface BatchEditProductsOpenCampaignSetting_Response {
  failed_list?: BatchEditProductsOpenCampaignSetting_Failed[];
  /**
   * Success Campaign ID List
   */
  success_list?: number[];
  [key: string]: any;
}
/**
 * Response data payload for batch_edit_products_open_campaign_setting
 */
export type BatchEditProductsOpenCampaignSettingResponseData =
  BatchEditProductsOpenCampaignSetting_Response;
/**
 * Response payload for batch_edit_products_open_campaign_setting
 *
 * Batch update open campaign settings for a given list of product IDs
 */
export type BatchEditProductsOpenCampaignSettingResponse =
  FetchResponse<BatchEditProductsOpenCampaignSettingResponseData>;
/**
 * Request parameters for batch_get_products_suggested_rate
 *
 * Fetch suggested rates for a given list of product IDs
 */
export interface BatchGetProductsSuggestedRateRequest {
  /**
   * The list of item_id, different item id should be split by comma and at most 20 items
   */
  item_id_list: string[];
  [key: string]: any;
}
/**
 * BatchGetProductsSuggestedRate_Rate sub-interface for BatchGetProductsSuggestedRate_Response
 */
export interface BatchGetProductsSuggestedRate_Rate {
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Minimum suggested commission rate, 1.1 means 1.1%, support two decimal places
   */
  min_rate?: number;
  /**
   * Maximum suggested commission rate, 1.2 means 1.2%, support two decimal places
   */
  max_rate?: number;
  [key: string]: any;
}
/**
 * BatchGetProductsSuggestedRate_Response sub-interface for BatchGetProductsSuggestedRateResponse
 */
export interface BatchGetProductsSuggestedRate_Response {
  rates?: BatchGetProductsSuggestedRate_Rate[];
  [key: string]: any;
}
/**
 * Response data payload for batch_get_products_suggested_rate
 */
export type BatchGetProductsSuggestedRateResponseData = BatchGetProductsSuggestedRate_Response;
/**
 * Response payload for batch_get_products_suggested_rate
 *
 * Fetch suggested rates for a given list of product IDs
 */
export type BatchGetProductsSuggestedRateResponse =
  FetchResponse<BatchGetProductsSuggestedRateResponseData>;
/**
 * Request parameters for batch_remove_products_open_campaign_setting
 *
 * Batch update products from Open Campaign for a given list of product IDs
 */
export interface BatchRemoveProductsOpenCampaignSettingRequest {
  /**
   * The list of campaign_id, max limit: 50
   */
  campaign_ids: number[];
  [key: string]: any;
}
/**
 * BatchRemoveProductsOpenCampaignSetting_Failed sub-interface for BatchRemoveProductsOpenCampaignSetting_Response
 */
export interface BatchRemoveProductsOpenCampaignSetting_Failed {
  /**
   * Campaign ID
   */
  campaign_id?: number;
  /**
   * Fail error
   */
  fail_error?: string;
  /**
   * Fail message
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * BatchRemoveProductsOpenCampaignSetting_Response sub-interface for BatchRemoveProductsOpenCampaignSettingResponse
 */
export interface BatchRemoveProductsOpenCampaignSetting_Response {
  failed_list?: BatchRemoveProductsOpenCampaignSetting_Failed[];
  /**
   * Success Campaign ID List
   */
  success_list?: number[];
  [key: string]: any;
}
/**
 * Response data payload for batch_remove_products_open_campaign_setting
 */
export type BatchRemoveProductsOpenCampaignSettingResponseData =
  BatchRemoveProductsOpenCampaignSetting_Response;
/**
 * Response payload for batch_remove_products_open_campaign_setting
 *
 * Batch update products from Open Campaign for a given list of product IDs
 */
export type BatchRemoveProductsOpenCampaignSettingResponse =
  FetchResponse<BatchRemoveProductsOpenCampaignSettingResponseData>;
/**
 * CreateNewTargetedCampaign_Item sub-interface for CreateNewTargetedCampaignRequest
 */
export interface CreateNewTargetedCampaign_Item {
  /**
   * Item ID.
   */
  item_id: number;
  /**
   * Commission rate of current item, 1.1 means 1.1%, support two decimal places.
   */
  rate: number;
  [key: string]: any;
}
/**
 * CreateNewTargetedCampaign_Affiliate sub-interface for CreateNewTargetedCampaignRequest
 */
export interface CreateNewTargetedCampaign_Affiliate {
  /**
   * The unique key for affiliate.
   */
  affiliate_id: number;
  [key: string]: any;
}
/**
 * Request parameters for create_new_targeted_campaign
 *
 * Create a new campaign with custom product & affiliate selections, and basic info filling.
 */
export interface CreateNewTargetedCampaignRequest {
  /**
   * The name of the current campaign.
   */
  campaign_name: string;
  /**
   * The period start time of campaign, in seconds.
   */
  period_start_time: Date | number;
  /**
   * The period end time of campaign, in seconds.Can set 32503651199 (2999-12-31 23:59:59) represent of no limit.
   */
  period_end_time: Date | number;
  /**
   * Budget allocation toggle for the current campaign.Note: TH not supported
   */
  is_set_budget?: boolean;
  /**
   * Budget value set for the current campaign.Note: TH not supported
   */
  budget?: number;
  /**
   * The message displayed to affiliates.
   */
  seller_message: string;
  /**
   * The list of items associated with the current campaign.
   */
  item_list: CreateNewTargetedCampaign_Item[];
  /**
   * The list of affiliates associated with the current campaign.
   */
  affiliate_list: CreateNewTargetedCampaign_Affiliate[];
  [key: string]: any;
}
/**
 * CreateNewTargetedCampaign_FailItem sub-interface for CreateNewTargetedCampaign_Response
 */
export interface CreateNewTargetedCampaign_FailItem {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Fail error.
   */
  fail_error?: string;
  /**
   * Fail message.
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * CreateNewTargetedCampaign_FailAffiliate sub-interface for CreateNewTargetedCampaign_Response
 */
export interface CreateNewTargetedCampaign_FailAffiliate {
  /**
   * Affiliate ID.
   */
  affiliate_id?: number;
  /**
   * Fail error.
   */
  fail_error?: string;
  /**
   * Fail message.
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * CreateNewTargetedCampaign_Response sub-interface for CreateNewTargetedCampaignResponse
 */
export interface CreateNewTargetedCampaign_Response {
  /**
   * The unique key for campaign.
   */
  campaign_id?: number;
  /**
   * Failed Item List.
   */
  fail_item_list?: CreateNewTargetedCampaign_FailItem[];
  /**
   * Fail Affiliate List.
   */
  fail_affiliate_list?: CreateNewTargetedCampaign_FailAffiliate[];
  [key: string]: any;
}
/**
 * Response data payload for create_new_targeted_campaign
 */
export type CreateNewTargetedCampaignResponseData = CreateNewTargetedCampaign_Response;
/**
 * Response payload for create_new_targeted_campaign
 *
 * Create a new campaign with custom product & affiliate selections, and basic info filling.
 */
export type CreateNewTargetedCampaignResponse =
  FetchResponse<CreateNewTargetedCampaignResponseData>;
/**
 * EditAffiliateListOfTargetedCampaign_Affiliate sub-interface for EditAffiliateListOfTargetedCampaignRequest
 */
export interface EditAffiliateListOfTargetedCampaign_Affiliate {
  /**
   * The unique key for affiliate.
   */
  affiliate_id: number;
  [key: string]: any;
}
/**
 * Request parameters for edit_affiliate_list_of_targeted_campaign
 *
 * Modify the selected affiliate list in an existing target campaign
 */
export interface EditAffiliateListOfTargetedCampaignRequest {
  /**
   * Campaign id for update.
   */
  campaign_id: number;
  /**
   * Edit type. Applicable values:adddelete
   */
  edit_type: string;
  /**
   * The list of affiliates to be modified.
   */
  affiliate_list: EditAffiliateListOfTargetedCampaign_Affiliate[];
  [key: string]: any;
}
/**
 * EditAffiliateListOfTargetedCampaign_FailAffiliate sub-interface for EditAffiliateListOfTargetedCampaign_Response
 */
export interface EditAffiliateListOfTargetedCampaign_FailAffiliate {
  /**
   * The unique key for affiliate.
   */
  affiliate_id?: number;
  /**
   * Indicate error type if hit error. Empty if no error happened.
   */
  fail_error?: string;
  /**
   * Indicate error details if hit error. Empty if no error happened.
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * EditAffiliateListOfTargetedCampaign_Response sub-interface for EditAffiliateListOfTargetedCampaignResponse
 */
export interface EditAffiliateListOfTargetedCampaign_Response {
  /**
   * Failed Affiliate List.
   */
  fail_affiliate_list?: EditAffiliateListOfTargetedCampaign_FailAffiliate[];
  [key: string]: any;
}
/**
 * Response data payload for edit_affiliate_list_of_targeted_campaign
 */
export type EditAffiliateListOfTargetedCampaignResponseData =
  EditAffiliateListOfTargetedCampaign_Response;
/**
 * Response payload for edit_affiliate_list_of_targeted_campaign
 *
 * Modify the selected affiliate list in an existing target campaign
 */
export type EditAffiliateListOfTargetedCampaignResponse =
  FetchResponse<EditAffiliateListOfTargetedCampaignResponseData>;
/**
 * Request parameters for edit_all_products_open_campaign_setting
 *
 * Update for all products in the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_edit_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export interface EditAllProductsOpenCampaignSettingRequest {
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places, if miss, will skip and do not update
   */
  commission_rate?: number;
  /**
   * Period start time, in seconds, if missing, will skip and do not updateOnly allow to update on UPCOMING status, when in other status, will skip too
   */
  period_start_time?: Date | number;
  /**
   * Period end time, in seconds, if missing, will skip and do not updateCan set 32503651199 to make period no limit
   */
  period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * EditAllProductsOpenCampaignSetting_Response sub-interface for EditAllProductsOpenCampaignSettingResponse
 */
export interface EditAllProductsOpenCampaignSetting_Response {
  /**
   * Task type. Applicable values: batch_add_open_campaignsbatch_remove_open_campaignsbatch_update_open_campaignsFor this API, task type will be batch_update_open_campaigns
   */
  task_type?: string;
  /**
   * Task id, used to query task progress when calling v2.ams.get_open_campaign_batch_task_result API
   */
  task_id?: string;
  [key: string]: any;
}
/**
 * Response data payload for edit_all_products_open_campaign_setting
 */
export type EditAllProductsOpenCampaignSettingResponseData =
  EditAllProductsOpenCampaignSetting_Response;
/**
 * Response payload for edit_all_products_open_campaign_setting
 *
 * Update for all products in the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_edit_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export type EditAllProductsOpenCampaignSettingResponse =
  FetchResponse<EditAllProductsOpenCampaignSettingResponseData>;
/**
 * EditProductListOfTargetedCampaign_Item sub-interface for EditProductListOfTargetedCampaignRequest
 */
export interface EditProductListOfTargetedCampaign_Item {
  /**
   * Item ID.
   */
  item_id: number;
  /**
   * Commission rate of current item, 1.1 means 1.1%, support two decimal places.
   */
  rate?: number;
  [key: string]: any;
}
/**
 * Request parameters for edit_product_list_of_targeted_campaign
 *
 * Modify the selected product list in an existing target campaign
 */
export interface EditProductListOfTargetedCampaignRequest {
  /**
   * Campaign id for update.
   */
  campaign_id: number;
  /**
   * Edit type. Applicable values: adddeleteupdate
   */
  edit_type: string;
  /**
   * The list of items to be modified.
   */
  item_list: EditProductListOfTargetedCampaign_Item[];
  [key: string]: any;
}
/**
 * EditProductListOfTargetedCampaign_FailItem sub-interface for EditProductListOfTargetedCampaign_Response
 */
export interface EditProductListOfTargetedCampaign_FailItem {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Indicate error type if hit error. Empty if no error happened.
   */
  fail_error?: string;
  /**
   * Indicate error details if hit error. Empty if no error happened.
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * EditProductListOfTargetedCampaign_Response sub-interface for EditProductListOfTargetedCampaignResponse
 */
export interface EditProductListOfTargetedCampaign_Response {
  /**
   * Failed Item List.
   */
  fail_item_list?: EditProductListOfTargetedCampaign_FailItem[];
  [key: string]: any;
}
/**
 * Response data payload for edit_product_list_of_targeted_campaign
 */
export type EditProductListOfTargetedCampaignResponseData =
  EditProductListOfTargetedCampaign_Response;
/**
 * Response payload for edit_product_list_of_targeted_campaign
 *
 * Modify the selected product list in an existing target campaign
 */
export type EditProductListOfTargetedCampaignResponse =
  FetchResponse<EditProductListOfTargetedCampaignResponseData>;
/**
 * Request parameters for get_affiliate_performance
 *
 * Retrieve affiliate performance of the shop.
 */
export interface GetAffiliatePerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 20.
   */
  page_size: number;
  /**
   * Order Type. Applicable values: PlacedOrderConfirmedOrder: Note: - Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.- Confirmed orders are either non-COD orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  order_type: string;
  /**
   * Channel. Applicable values: - AllChannel- SocialMedia- ShopeeVideo- LiveStreaming
   */
  channel: string;
  /**
   * Affiliate ID for query.
   */
  affiliate_id?: number;
  [key: string]: any;
}
/**
 * GetAffiliatePerformance_List sub-interface for GetAffiliatePerformance_Response
 */
export interface GetAffiliatePerformance_List {
  /**
   * Unique identifier assigned to the affiliate. Used as a reference key in the system.
   */
  affiliate_id?: number;
  /**
   * Display name of the affiliate, typically the Shopee display name.
   */
  affiliate_name?: string;
  /**
   * Login or Shopee account username associated with the affiliate.
   */
  affiliate_username?: string;
  /**
   * Total value of the product sold through the affiliate's promotion.
   */
  sales?: string;
  /**
   * Total number of the product sold through the affiliate's promotion.
   */
  items_sold?: number;
  /**
   * Total number of orders generated through the affiliate's promotion.
   */
  orders?: number;
  /**
   * Total number of clicks on your product links through affiliate marketing during the selected period.
   */
  clicks?: number;
  /**
   * Estimated payout through the affiliate's promotion.
   */
  est_commission?: string;
  /**
   * Return on Investment, equal to GMV divided by Estimated Commission. It can be used to evaluate the efficiency of the affiliate's promotion. If it does not exist, the return value is --.
   */
  roi?: string;
  /**
   * Total number of buyers who have purchased the product through the affiliate's promotion.
   */
  total_buyers?: number;
  /**
   * Total number of new buyers who have purchased the product through the affiliate's promotion.
   */
  new_buyers?: number;
  [key: string]: any;
}
/**
 * GetAffiliatePerformance_Response sub-interface for GetAffiliatePerformanceResponse
 */
export interface GetAffiliatePerformance_Response {
  list?: GetAffiliatePerformance_List[];
  /**
   * Total number of affiliates that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_affiliate_performance
 */
export type GetAffiliatePerformanceResponseData = GetAffiliatePerformance_Response;
/**
 * Response payload for get_affiliate_performance
 *
 * Retrieve affiliate performance of the shop.
 */
export type GetAffiliatePerformanceResponse = FetchResponse<GetAffiliatePerformanceResponseData>;
/**
 * Request parameters for get_auto_add_new_product_toggle_status
 *
 * Check if auto-add new product is currently enabled
 */
export type GetAutoAddNewProductToggleStatusRequest = Record<string, never>;
/**
 * GetAutoAddNewProductToggleStatus_Response sub-interface for GetAutoAddNewProductToggleStatusResponse
 */
export interface GetAutoAddNewProductToggleStatus_Response {
  /**
   * If auto-add new product is currently enabled
   */
  is_open?: boolean;
  /**
   * Commission Rate, 1.11 means 1.11%, support two decimal places
   */
  commission_rate?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_auto_add_new_product_toggle_status
 */
export type GetAutoAddNewProductToggleStatusResponseData =
  GetAutoAddNewProductToggleStatus_Response;
/**
 * Response payload for get_auto_add_new_product_toggle_status
 *
 * Check if auto-add new product is currently enabled
 */
export type GetAutoAddNewProductToggleStatusResponse =
  FetchResponse<GetAutoAddNewProductToggleStatusResponseData>;
/**
 * Request parameters for get_campaign_key_metrics_performance
 *
 * Retrieve key metrics for Open and Targeted campaigns
 */
export interface GetCampaignKeyMetricsPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  [key: string]: any;
}
/**
 * GetCampaignKeyMetricsPerformance_OpenCampaignKeyMetirc sub-interface for GetCampaignKeyMetricsPerformance_Response
 */
export interface GetCampaignKeyMetricsPerformance_OpenCampaignKeyMetirc {
  /**
   * Total number of affiliates who drove orders from Open Campaigns.
   */
  affiliates?: number;
  /**
   * Total number of items sold from Open Campaigns.
   */
  items_sold?: number;
  /**
   * Total value of orders from Open Campaigns.
   */
  sales?: string;
  /**
   * Total estimated commission for orders placed from Open Campaigns.
   */
  est_commission?: string;
  [key: string]: any;
}
/**
 * GetCampaignKeyMetricsPerformance_TargetedCampaignKeyMetirc sub-interface for GetCampaignKeyMetricsPerformance_Response
 */
export interface GetCampaignKeyMetricsPerformance_TargetedCampaignKeyMetirc {
  /**
   * Total number of affiliates who drove orders from Targeted Campaigns.
   */
  affiliates?: number;
  /**
   * Total number of items sold from Targeted Campaigns.
   */
  items_sold?: number;
  /**
   * Total value of orders from Targeted Campaigns.
   */
  sales?: string;
  /**
   * Total estimated commission for orders placed from Targeted Campaigns.
   */
  est_commission?: string;
  [key: string]: any;
}
/**
 * GetCampaignKeyMetricsPerformance_Response sub-interface for GetCampaignKeyMetricsPerformanceResponse
 */
export interface GetCampaignKeyMetricsPerformance_Response {
  /**
   * Performance data of Open Campaign.
   */
  open_campaign_key_metircs?: GetCampaignKeyMetricsPerformance_OpenCampaignKeyMetirc;
  /**
   * Performance data of Target Campaign.
   */
  targeted_campaign_key_metircs?: GetCampaignKeyMetricsPerformance_TargetedCampaignKeyMetirc;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_campaign_key_metrics_performance
 */
export type GetCampaignKeyMetricsPerformanceResponseData =
  GetCampaignKeyMetricsPerformance_Response;
/**
 * Response payload for get_campaign_key_metrics_performance
 *
 * Retrieve key metrics for Open and Targeted campaigns
 */
export type GetCampaignKeyMetricsPerformanceResponse =
  FetchResponse<GetCampaignKeyMetricsPerformanceResponseData>;
/**
 * Request parameters for get_content_performance
 *
 * Retrieve content performance of the shop
 */
export interface GetContentPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 20.
   */
  page_size: number;
  /**
   * Order Type. Applicable values: PlacedOrderConfirmedOrder: Note: - Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.- Confirmed orders are either non-COD orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  order_type: string;
  /**
   * Channel. Applicable values: - ShopeeVideo- LiveStreaming
   */
  channel: string;
  /**
   * Search for the contents published by affiliates with the affiliate id entered.
   */
  affiliate_id?: number;
  /**
   * Search for the contents with the searched product included (precise search).
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * GetContentPerformance_List sub-interface for GetContentPerformance_Response
 */
export interface GetContentPerformance_List {
  /**
   * Unique identifier of the content where the product is placed.
   */
  content_id?: string;
  /**
   * Title or name of the content (e.g., video, livestream) associated with the product.
   */
  content_title?: string;
  /**
   * Livestream:  The livestream start time.Video: The video post time.
   */
  post_time?: number;
  /**
   * Display name of the affiliate who posted the content, typically the Shopee name.
   */
  affiliate_name?: string;
  /**
   * Login or Shopee account username associated with the affiliate.
   */
  affiliate_username?: string;
  /**
   * Number of products associated with the content.
   */
  products?: number;
  /**
   * The total viewed pv of the content of this shop within the selected time range
   */
  views?: number;
  /**
   * The total number of likes for the content of this shop within the selected time range
   */
  likes?: number;
  /**
   * The total number of comments for the content of this shop within the selected time range
   */
  comments?: number;
  /**
   * The total sales of the content associated with the shop orders within the selected time range
   */
  sales?: string;
  /**
   * The total number of orders associated with the shop for the content in the selected time range
   */
  orders?: number;
  /**
   * The total number of items sold associated with the shop for the content in the selected time range
   */
  items_sold?: number;
  /**
   * Channel. Applicable values: - ShopeeVideo- LiveStreaming
   */
  channel?: string;
  [key: string]: any;
}
/**
 * GetContentPerformance_Response sub-interface for GetContentPerformanceResponse
 */
export interface GetContentPerformance_Response {
  list?: GetContentPerformance_List[];
  /**
   * This is to indicate the whole number of items.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_content_performance
 */
export type GetContentPerformanceResponseData = GetContentPerformance_Response;
/**
 * Response payload for get_content_performance
 *
 * Retrieve content performance of the shop
 */
export type GetContentPerformanceResponse = FetchResponse<GetContentPerformanceResponseData>;
/**
 * Request parameters for get_conversion_report
 *
 * Retrieve the shop's conversion report with details about each order, item, affiliate, campaign.You can filter results using one or multiple time ranges, and the final result will be the intersection of these ranges. Due to data volume limitations, the maximum queryable time span is three months, etc.Maximum data can be viewed is 500 pages, please export data for more details.
 */
export interface GetConversionReportRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. If data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Number of records returned per page, the maximum limit is 500, and page_no * page_size must be <= 10000.
   */
  page_size: number;
  /**
   * Unique identifier of the order.
   */
  order_sn?: string;
  /**
   * ID of the affiliate who promoted the item.
   */
  affiliate_id?: number;
  /**
   * ID of the product purchased.
   */
  item_id?: number;
  /**
   * Product's name.
   */
  item_name?: string;
  /**
   * Hierarchical product category classification. (L1 Category)
   */
  l1_category_id?: number;
  /**
   * Hierarchical product category classification. (L2 category)
   */
  l2_category_id?: number;
  /**
   * Hierarchical product category classification. (L3 Category)
   */
  l3_category_id?: number;
  /**
   * Order Status. Applicable values:UnpaidPendingCompletedCancelled
   */
  order_status?: string;
  /**
   * Verified Status. Applicable values:UnverifiedValidInvalid
   */
  verified_status?: string;
  /**
   * Buyer Status. Applicable values:NewExisting
   */
  buyer_status?: string;
  /**
   * ID referencing the campaign rule applied.
   */
  attr_campaign_id?: number;
  /**
   * Name/ID of campaign partner.
   */
  campaign_partner?: CampaignPartner | string | number;
  /**
   * Seller Campaign Type. Applicable values:TargetCampaignOpenCampaignMCNCampaign
   */
  seller_campaign_type?: string;
  /**
   * Deduction Status. Applicable values:PendingDeductionDeducted
   */
  deduction_status?: string;
  /**
   * Deduction Method. Applicable values:OrderEscrowSellerWalletAutoAdjustmentSVSPaymentLinkOfflineSettlementAMSCredit
   */
  deduction_method?: string;
  /**
   * Start time (inclusive) of order placement, in timestamp format.
   */
  place_order_time_start?: Date | number;
  /**
   * End time (inclusive) of order placement, in timestamp format.
   */
  place_order_time_end?: Date | number;
  /**
   * Start time (inclusive) of order completion, in timestamp format.
   */
  order_completed_time_start?: Date | number;
  /**
   * End time (inclusive) of order completion, in timestamp format.
   */
  order_completed_time_end?: Date | number;
  /**
   * Start time (inclusive) of final completion, in timestamp format.
   */
  conversion_completed_time_start?: Date | number;
  /**
   * End time (inclusive) of final completion, in timestamp format.
   */
  conversion_completed_time_end?: Date | number;
  /**
   * Start time (inclusive) of fee deduction, in timestamp format.
   */
  ams_deduction_time_start?: Date | number;
  /**
   * End time (inclusive) of fee deduction, in timestamp format.
   */
  ams_deduction_time_end?: Date | number;
  [key: string]: any;
}
/**
 * GetConversionReport_Item sub-interface for GetConversionReport_List
 */
export interface GetConversionReport_Item {
  /**
   * Unique identifier of the item in the order.
   */
  item_id?: number;
  /**
   * Name of the item in the order.
   */
  item_name?: string;
  /**
   * SKU/model identifier for the item.
   */
  model_id?: number;
  /**
   * Level-1 global category id classification of the item.
   */
  l1_category_id?: number;
  /**
   * Level-2 global category id classification of the item.
   */
  l2_category_id?: number;
  /**
   * Level-3 global category id classification of the item.
   */
  l3_category_id?: number;
  /**
   * Identifier of the promotion campaign linked to the order.
   */
  promotion_id?: string;
  /**
   * Item price in cents (or smallest currency unit).
   */
  price?: number;
  /**
   * Quantity of the item purchased.
   */
  qty?: number;
  /**
   * Type of seller campaign:1. Seller Open Campaign – Open to all affiliates.2. Seller Target Campaign – Restricted to designated affiliates.
   */
  seller_campaign_type?: string;
  /**
   * Campaign attribute ID associated with the order.
   */
  attr_campaign_id?: number;
  /**
   * Total purchase value of the order in cents (or smallest currency unit).
   */
  purchase_value?: number;
  /**
   * Amount refunded for the order.
   */
  refund_amount?: string;
  /**
   * Commission (amount) for the item, paid by the seller.
   */
  item_brand_commission?: string;
  /**
   * Commission rate allocated to the affiliate for the item.
   */
  item_brand_commission_rate_to_affiliate?: string;
  /**
   * Commission (amount) allocated to the affiliate for the item.
   */
  item_brand_commission_to_affiliate?: string;
  /**
   * Commission rate allocated to the MCN for the item.
   */
  item_brand_commission_rate_to_mcn?: string;
  /**
   * Commission (amount) allocated to the MCN for the item.
   */
  item_brand_commission_to_mcn?: string;
  /**
   * Seller service fee rate applied to the item.
   */
  seller_service_fee_rate?: string;
  /**
   * Seller service fee amount charged for the item.seller_service_fee = item_brand_commission *  seller_service_fee_rate
   */
  seller_service_fee?: string;
  [key: string]: any;
}
/**
 * GetConversionReport_List sub-interface for GetConversionReport_Response
 */
export interface GetConversionReport_List {
  /**
   * Unique identifier of the order.
   */
  order_sn?: string;
  /**
   * Current status of the order (e.g., Pending, Completed, Cancelled).
   */
  order_status?: string;
  /**
   * Verification status of the order (Unverified, Verified).
   */
  verified_status?: string;
  /**
   * Time when the order was placed.
   */
  place_order_time?: string;
  /**
   * Time when the order was marked as completed.
   */
  order_completed_time?: string;
  /**
   * Time when the conversion (affiliate action) was completed.
   */
  conversion_completed_time?: string;
  /**
   * Unique identifier of the affiliate.
   */
  affiliate_id?: number;
  /**
   * Shopee display name of the affiliate who promoted the item.
   */
  affiliate_name?: string;
  /**
   * Affiliate's Shopee login username.
   */
  affiliate_username?: string;
  /**
   * MCN (Multi-Channel Network) linked with the affiliate, if any.
   */
  linked_mcn?: string;
  /**
   * Commission (amount) for the whole order, paid by the seller.
   */
  order_brand_commission?: string;
  /**
   * Traffic channel or platform where the promotion took place.
   */
  channel?: string;
  /**
   * Type of order: Direct Order or Indirect Order.
   */
  order_type?: string;
  /**
   * Buyer Status. Applicable values: NewExisting
   */
  buyer_status?: string;
  items?: GetConversionReport_Item[];
  /**
   * Partner identifier for the campaign.
   */
  campaign_partner?: string;
  [key: string]: any;
}
/**
 * GetConversionReport_Response sub-interface for GetConversionReportResponse
 */
export interface GetConversionReport_Response {
  /**
   * Array of order records. Each object contains order and commission details.
   */
  list?: GetConversionReport_List[];
  /**
   * Total number of entities that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_conversion_report
 */
export type GetConversionReportResponseData = GetConversionReport_Response;
/**
 * Response payload for get_conversion_report
 *
 * Retrieve the shop's conversion report with details about each order, item, affiliate, campaign.You can filter results using one or multiple time ranges, and the final result will be the intersection of these ranges. Due to data volume limitations, the maximum queryable time span is three months, etc.Maximum data can be viewed is 500 pages, please export data for more details.
 */
export type GetConversionReportResponse = FetchResponse<GetConversionReportResponseData>;
/**
 * Request parameters for get_managed_affiliate_list
 *
 * Returns affiliates that are saved to managed affiliate list
 */
export interface GetManagedAffiliateListRequest {
  /**
   * The start index of request.The max managed affiliates of affiliate is 2000. Zero count will returned if offset > 2000 or offset > real managed count.
   */
  page_no: number;
  /**
   * The number of affiliate returned by this request, Max is 100, default is 20.The max managed affiliates of affiliate is 2000.
   */
  page_size: number;
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_PopularSocialMedia sub-interface for GetManagedAffiliateList_Affiliate
 */
export interface GetManagedAffiliateList_PopularSocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_SocialMedia sub-interface for GetManagedAffiliateList_Affiliate
 */
export interface GetManagedAffiliateList_SocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  /**
   * Social media name of this account.
   */
  social_media_user_name?: string;
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_TopPopularContent sub-interface for GetManagedAffiliateList_Affiliate
 */
export interface GetManagedAffiliateList_TopPopularContent {
  /**
   * The platform of this affiliate's content. eg. shopee video/shopee live
   */
  platform?: Platform | string | number;
  /**
   * The comment count of this affiliate's content.
   */
  comment_count?: number;
  /**
   * The like count of this affiliate's content.
   */
  like_count?: number;
  /**
   * The view count of this affiliate's content.
   */
  view_count?: number;
  /**
   * The cover link of this affiliate's content.
   */
  cover_url?: string;
  /**
   * The media link of this affiliate's content.
   */
  media_url?: string;
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_TopSellingProduct sub-interface for GetManagedAffiliateList_Affiliate
 */
export interface GetManagedAffiliateList_TopSellingProduct {
  /**
   * The item id of this item.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_Affiliate sub-interface for GetManagedAffiliateList_Response
 */
export interface GetManagedAffiliateList_Affiliate {
  /**
   * The unique key for the current affiliate.
   */
  affiliate_id?: number;
  /**
   * The name of the current commission.
   */
  affiliate_name?: string;
  /**
   * The shopee user name or affiliate name for this affiliate
   */
  user_name?: string;
  /**
   * The portrait url of affiliate.
   */
  portrait_url?: string;
  /**
   * The popular social media of this affiliate.
   */
  popular_social_media?: GetManagedAffiliateList_PopularSocialMedia;
  /**
   * Social media account list of this affiliate.
   */
  social_medias?: GetManagedAffiliateList_SocialMedia[];
  /**
   * Number of clicks in the last 30 days.
   */
  total_click?: number;
  /**
   * Range number of the orders in the last 30 days.
   */
  order_range?: number[];
  /**
   * Range number of the gmv in the last 30 days.
   */
  gmv_range?: number[];
  /**
   * Golden tick means affiliates create high quality contents with good sales conversion in Shopee Live or Shopee Video.
   */
  is_orange_tick_kol?: boolean;
  /**
   * Good sample fulfillment means that affiliates demonstrate better in free sample fulfillment compared to the majority of affiliates in recent180 days.
   */
  is_good_fulfillment?: boolean;
  /**
   * Top three promote category ids for this affiliate
   */
  promote_category_ids?: number[];
  /**
   * Top popular contents of this affiliate.
   */
  top_popular_contents?: GetManagedAffiliateList_TopPopularContent[];
  /**
   * Top selling items of the affiliate.
   */
  top_selling_products?: GetManagedAffiliateList_TopSellingProduct[];
  [key: string]: any;
}
/**
 * GetManagedAffiliateList_Response sub-interface for GetManagedAffiliateListResponse
 */
export interface GetManagedAffiliateList_Response {
  /**
   * The total count of affiliates that managed by this seller.
   */
  total_count?: number;
  /**
   * Affiliate list managed by seller.Not all return fields will have values.
   */
  affiliate_list?: GetManagedAffiliateList_Affiliate[];
  [key: string]: any;
}
/**
 * Response data payload for get_managed_affiliate_list
 */
export type GetManagedAffiliateListResponseData = GetManagedAffiliateList_Response;
/**
 * Response payload for get_managed_affiliate_list
 *
 * Returns affiliates that are saved to managed affiliate list
 */
export type GetManagedAffiliateListResponse = FetchResponse<GetManagedAffiliateListResponseData>;
/**
 * Request parameters for get_open_campaign_added_product
 *
 * Retrieve all products currently in the Open Campaign, including campaign status, commission rate, and promotion period
 */
export interface GetOpenCampaignAddedProductRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "" or not passed. If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Use this field to specify which field to use to sort the returned item list. Sort by update_time and commission_id in descending order by default. Available values:commission_rate: Sort by commission_rate in ascending order-commission_rate: Sort by commission_rate in descending order
   */
  sort_by?: string;
  /**
   * Search type: ITEM_NAME or ITEM_ID
   */
  search_type?: string;
  /**
   * Search for item_name or item_id, item_id should be split by comma and at most 50 items.
   */
  search_content?: string;
  [key: string]: any;
}
/**
 * GetOpenCampaignAddedProduct_CommissionProtection sub-interface for GetOpenCampaignAddedProduct_Item
 */
export interface GetOpenCampaignAddedProduct_CommissionProtection {
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate?: number;
  /**
   * Protection Period End Time
   */
  protection_period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * GetOpenCampaignAddedProduct_Item sub-interface for GetOpenCampaignAddedProduct_Response
 */
export interface GetOpenCampaignAddedProduct_Item {
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Item Name
   */
  item_name?: string;
  /**
   * Campaign ID
   */
  campaign_id?: number;
  /**
   * Campaign Status: UpcomingOngoingTerminating
   */
  campaign_status?: string;
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate?: number;
  /**
   * Period Start Time
   */
  period_start_time?: Date | number;
  /**
   * Period End Time, if get 32503651199 (2999-12-31 23:59:59), it means no limit
   */
  period_end_time?: Date | number;
  /**
   * Pending Terminated Time
   */
  pending_terminated_time?: Date | number;
  /**
   * Commission Protection List
   */
  commission_protection_list?: GetOpenCampaignAddedProduct_CommissionProtection[];
  /**
   * Max Commission Rate Current Day, 1.1 means 1.1%, support two decimal places
   */
  max_commission_rate_current_day?: number;
  [key: string]: any;
}
/**
 * GetOpenCampaignAddedProduct_Response sub-interface for GetOpenCampaignAddedProductResponse
 */
export interface GetOpenCampaignAddedProduct_Response {
  item_list?: GetOpenCampaignAddedProduct_Item[];
  /**
   * Total number of items that match the condition
   */
  total_count?: number;
  /**
   * Pass the content in the next request as cursor to get the next page data
   */
  cursor?: string;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_open_campaign_added_product
 */
export type GetOpenCampaignAddedProductResponseData = GetOpenCampaignAddedProduct_Response;
/**
 * Response payload for get_open_campaign_added_product
 *
 * Retrieve all products currently in the Open Campaign, including campaign status, commission rate, and promotion period
 */
export type GetOpenCampaignAddedProductResponse =
  FetchResponse<GetOpenCampaignAddedProductResponseData>;
/**
 * Request parameters for get_open_campaign_batch_task_result
 *
 * Get open campaign batch task result
 */
export interface GetOpenCampaignBatchTaskResultRequest {
  /**
   * Task id, used to query task progress
   */
  task_id: string;
  [key: string]: any;
}
/**
 * GetOpenCampaignBatchTaskResult_Response sub-interface for GetOpenCampaignBatchTaskResultResponse
 */
export interface GetOpenCampaignBatchTaskResult_Response {
  /**
   * Task status. Applicable values:DoingDoneFailNote: Please note that task Done here refers to the completion of scanning all products in the shop, but not the successful execution of all products. Some products may fail, but due to the unpredictable huge volume of data, detailed information will not returned in the fail_reason. After the task is Done, you need to retrieve the list again by GET API and compare it with the before list to confirm the execution details
   */
  status?: string;
  /**
   * Progress rate, 80 means 80%
   */
  progress_rate?: number;
  /**
   * Error message, if it is not empty, it means there is an errorWill not return the detail error for each products, you can check the products detail by using GET API, or using the batch operate API
   */
  fail_reason?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_open_campaign_batch_task_result
 */
export type GetOpenCampaignBatchTaskResultResponseData = GetOpenCampaignBatchTaskResult_Response;
/**
 * Response payload for get_open_campaign_batch_task_result
 *
 * Get open campaign batch task result
 */
export type GetOpenCampaignBatchTaskResultResponse =
  FetchResponse<GetOpenCampaignBatchTaskResultResponseData>;
/**
 * Request parameters for get_open_campaign_not_added_product
 *
 * Retrieve eligible products not yet added to the Open Campaign
 */
export interface GetOpenCampaignNotAddedProductRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "" or not passed. If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Use this field to specify which field to use to sort the returned item list. Available values:-sales: Sort by sales in descending order (default value)sales: Sort by sales in ascending order-stock: Sort by inventory in descending orderstock: Sort by inventory in ascending order-price: Sort by price in descending orderprice: Sort by price in ascending order
   */
  sort_by?: string;
  /**
   * Search type: ITEM_ID or ITEM_NAME
   */
  search_type?: string;
  /**
   * Search for item name or item id. item id should be split by comma and at most 50 items. When search_content is passed, search_type is required.
   */
  search_content?: string;
  [key: string]: any;
}
/**
 * GetOpenCampaignNotAddedProduct_Item sub-interface for GetOpenCampaignNotAddedProduct_Response
 */
export interface GetOpenCampaignNotAddedProduct_Item {
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Item name
   */
  item_name?: string;
  /**
   * Item sales
   */
  sales?: number;
  /**
   * Item display price
   */
  display_price?: string;
  /**
   * Item stock
   */
  stock?: number;
  /**
   * If item is in blacklist, it cannot set up open campaign
   */
  is_in_blacklist?: boolean;
  /**
   * If item already has open campaign, it cannot set up another open campaignThe item list may be delayed, so it is used to further filter items that already have open campaigns
   */
  with_open_campaign?: boolean;
  [key: string]: any;
}
/**
 * GetOpenCampaignNotAddedProduct_Response sub-interface for GetOpenCampaignNotAddedProductResponse
 */
export interface GetOpenCampaignNotAddedProduct_Response {
  item_list?: GetOpenCampaignNotAddedProduct_Item[];
  /**
   * Total number of items that match the condition
   */
  total_count?: number;
  /**
   * Pass the content in the next request as cursor to get the next page data
   */
  cursor?: string;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_open_campaign_not_added_product
 */
export type GetOpenCampaignNotAddedProductResponseData = GetOpenCampaignNotAddedProduct_Response;
/**
 * Response payload for get_open_campaign_not_added_product
 *
 * Retrieve eligible products not yet added to the Open Campaign
 */
export type GetOpenCampaignNotAddedProductResponse =
  FetchResponse<GetOpenCampaignNotAddedProductResponseData>;
/**
 * Request parameters for get_open_campaign_performance
 *
 * Retrieve all products in the Open Campaign along with performance data
 */
export interface GetOpenCampaignPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 20.
   */
  page_size: number;
  /**
   * Item ID for query.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * GetOpenCampaignPerformance_List sub-interface for GetOpenCampaignPerformance_Response
 */
export interface GetOpenCampaignPerformance_List {
  /**
   * Unique identifier of the promoted item within open campaign.
   */
  item_id?: number;
  /**
   * Name or title of the promoted item within open campaign.
   */
  item_name?: string;
  /**
   * Number of affiliates currently participating in the campaign for this item.
   */
  affiliates?: number;
  /**
   * Total sales amount generated from the campaign, in the market's currency.
   */
  sales?: string;
  /**
   * Total quantity of the item sold through the campaign.
   */
  item_sold?: number;
  /**
   * Estimated commission amount payable to affiliates for this item, based on current campaign data.
   */
  est_commission?: string;
  [key: string]: any;
}
/**
 * GetOpenCampaignPerformance_Response sub-interface for GetOpenCampaignPerformanceResponse
 */
export interface GetOpenCampaignPerformance_Response {
  list?: GetOpenCampaignPerformance_List[];
  /**
   * This is to indicate the whole number of items.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_open_campaign_performance
 */
export type GetOpenCampaignPerformanceResponseData = GetOpenCampaignPerformance_Response;
/**
 * Response payload for get_open_campaign_performance
 *
 * Retrieve all products in the Open Campaign along with performance data
 */
export type GetOpenCampaignPerformanceResponse =
  FetchResponse<GetOpenCampaignPerformanceResponseData>;
/**
 * Request parameters for get_optimization_suggestion_product
 *
 * Retrieve products with suggestions to improve performance
 */
export interface GetOptimizationSuggestionProductRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data.The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Recommended types. Applicable values: product_opportunitiesoptimize_increase_commission_rateoptimize_extend_promotion_period
   */
  rcmd_reason_filter: string;
  [key: string]: any;
}
/**
 * GetOptimizationSuggestionProduct_Item sub-interface for GetOptimizationSuggestionProduct_Response
 */
export interface GetOptimizationSuggestionProduct_Item {
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Item Name
   */
  item_name?: string;
  /**
   * Recommend reason. Applicable values: severe_shortagehigh_popularityoptimize_commission_rateextend_time_period
   */
  rcmd_reason?: string[];
  /**
   * Campaign ID
   */
  campaign_id?: number;
  /**
   * Commission Rate, 1.11 means 1.11%, support two decimal places
   */
  commission_rate?: number;
  /**
   * Period Start Time
   */
  period_start_time?: Date | number;
  /**
   * Period End Time, if get 32503651199 (2999-12-31 23:59:59), it means no limit
   */
  period_end_time?: Date | number;
  /**
   * The total number of affiliates who have ever shared the product in the last 90 days
   */
  affiliate_count?: number;
  /**
   * If the requested rcmd_reason_filter is product_opportunition, it is represented as item sales. Other scenarios are the total number of item sold for each product of the shop through AMS in the last 90 days
   */
  item_sold?: number;
  /**
   * Campaign Status:UpcomingOngoingTerminating
   */
  campaign_status?: string;
  /**
   * The total number of AMS orders for the product's L2 category in the last 30 days, only available when requested rcmd_reason_filter is product_opportunition
   */
  l2_category_order_count?: number;
  /**
   * Minimum suggested commission rate, 1.1 means 1.1%, support two decimal places
   */
  suggest_min_rate?: number;
  /**
   * Maximum suggested commission rate, 1.2 means 1.2%, support two decimal places
   */
  suggest_max_rate?: number;
  /**
   * Prefill rate, 1.1 means 1.1%, support two decimal places
   */
  prefill_rate?: number;
  /**
   * Prefill subsidy rate, platform commission rate calculated based on seller commission, 1.2 means 1.2%, support two decimal places
   */
  prefill_subsidy_rate?: number;
  /**
   * Display price
   */
  display_price?: string;
  /**
   * Has subsidy rate
   */
  has_subsidy_data?: boolean;
  [key: string]: any;
}
/**
 * GetOptimizationSuggestionProduct_Response sub-interface for GetOptimizationSuggestionProductResponse
 */
export interface GetOptimizationSuggestionProduct_Response {
  item_list?: GetOptimizationSuggestionProduct_Item[];
  /**
   * Total number of items that match the condition
   */
  total?: number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_optimization_suggestion_product
 */
export type GetOptimizationSuggestionProductResponseData =
  GetOptimizationSuggestionProduct_Response;
/**
 * Response payload for get_optimization_suggestion_product
 *
 * Retrieve products with suggestions to improve performance
 */
export type GetOptimizationSuggestionProductResponse =
  FetchResponse<GetOptimizationSuggestionProductResponseData>;
/**
 * Request parameters for get_performance_data_update_time
 *
 * Retrieve the latest date of AMS dashboard data metrics update.
 */
export interface GetPerformanceDataUpdateTimeRequest {
  /**
   * Marker type. Applicable values: - AmsMarker: Used to query the data update date for ams metrics.
   */
  marker_type: string;
  [key: string]: any;
}
/**
 * GetPerformanceDataUpdateTime_Response sub-interface for GetPerformanceDataUpdateTimeResponse
 */
export interface GetPerformanceDataUpdateTime_Response {
  /**
   * The latest date of AMS dashboard data metrics update.
   */
  last_report_date?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_performance_data_update_time
 */
export type GetPerformanceDataUpdateTimeResponseData = GetPerformanceDataUpdateTime_Response;
/**
 * Response payload for get_performance_data_update_time
 *
 * Retrieve the latest date of AMS dashboard data metrics update.
 */
export type GetPerformanceDataUpdateTimeResponse =
  FetchResponse<GetPerformanceDataUpdateTimeResponseData>;
/**
 * Request parameters for get_product_performance
 *
 * Retrieve product performance of the shop.
 */
export interface GetProductPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. If data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 20.
   */
  page_size: number;
  /**
   * Order Type. Applicable values: PlacedOrderConfirmedOrder: Note: - Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.- Confirmed orders are either non-COD orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  order_type: string;
  /**
   * Channel. Applicable values: - AllChannel- SocialMedia- ShopeeVideo- LiveStreaming
   */
  channel: string;
  /**
   * Item ID for query.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * GetProductPerformance_List sub-interface for GetProductPerformance_Response
 */
export interface GetProductPerformance_List {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Item Name.
   */
  item_name?: string;
  /**
   * Total value of the product sold through affiliate marketing.
   */
  sales?: string;
  /**
   * Total number of the product sold through affiliate marketing.
   */
  items_sold?: number;
  /**
   * Total number of orders including the product generated through affiliate marketing.
   */
  orders?: number;
  /**
   * Total number of clicks on your product links through affiliate marketing during the selected period.
   */
  clicks?: number;
  /**
   * Estimated payout of the product sold through affiliate marketing.
   */
  est_commission?: string;
  /**
   * Return on Investment, equal to GMV divided by Estimated Commission. It can be used to evaluate the efficiency of your investment in affiliate marketing on the product.If it does not exist, the return value is --.
   */
  roi?: string;
  /**
   * Total number of buyers who have purchased the product through affiliate marketing.
   */
  total_buyers?: number;
  /**
   * Total number of new buyers who have purchased the product through affiliate marketing.
   */
  new_buyers?: number;
  [key: string]: any;
}
/**
 * GetProductPerformance_Response sub-interface for GetProductPerformanceResponse
 */
export interface GetProductPerformance_Response {
  list?: GetProductPerformance_List[];
  /**
   * Total number of items that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_product_performance
 */
export type GetProductPerformanceResponseData = GetProductPerformance_Response;
/**
 * Response payload for get_product_performance
 *
 * Retrieve product performance of the shop.
 */
export type GetProductPerformanceResponse = FetchResponse<GetProductPerformanceResponseData>;
/**
 * Request parameters for get_recommended_affiliate_list
 *
 * Returns top 200 recommended affiliates that can be added to a campaign
 */
export interface GetRecommendedAffiliateListRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. Note: The response size will up to 200.
   */
  page_size: number;
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_PopularSocialMedia sub-interface for GetRecommendedAffiliateList_Affiliate
 */
export interface GetRecommendedAffiliateList_PopularSocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_SocialMedia sub-interface for GetRecommendedAffiliateList_Affiliate
 */
export interface GetRecommendedAffiliateList_SocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  /**
   * Social media name of this account.
   */
  social_media_user_name?: string;
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_TopPopularContent sub-interface for GetRecommendedAffiliateList_Affiliate
 */
export interface GetRecommendedAffiliateList_TopPopularContent {
  /**
   * The platform of this affiliate's content. eg. shopee video/shopee live
   */
  platform?: Platform | string | number;
  /**
   * The comment count of this affiliate's content.
   */
  comment_count?: number;
  /**
   * The like count of this affiliate's content.
   */
  like_count?: number;
  /**
   * The view count of this affiliate's content.
   */
  view_count?: number;
  /**
   * The cover link of this affiliate's content.
   */
  cover_url?: string;
  /**
   * The media link of this affiliate's content.
   */
  media_url?: string;
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_TopSellingProduct sub-interface for GetRecommendedAffiliateList_Affiliate
 */
export interface GetRecommendedAffiliateList_TopSellingProduct {
  /**
   * The item id of this item.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_Affiliate sub-interface for GetRecommendedAffiliateList_Response
 */
export interface GetRecommendedAffiliateList_Affiliate {
  /**
   * The unique key for the current affiliate.
   */
  affiliate_id?: number;
  /**
   * The name of the affiliate.
   */
  affiliate_name?: string;
  /**
   * The shopee user name or affiliate name for this affiliate.
   */
  user_name?: string;
  /**
   * The portrait url of affiliate.
   */
  portrait_url?: string;
  /**
   * The popular social media of this affiliate.
   */
  popular_social_media?: GetRecommendedAffiliateList_PopularSocialMedia;
  /**
   * Social media account list of this affiliate.
   */
  social_medias?: GetRecommendedAffiliateList_SocialMedia[];
  /**
   * Number of clicks in the last 30 days.
   */
  total_click?: number;
  /**
   * Range number of the orders in the last 30 days.
   */
  order_range?: number[];
  /**
   * Range number of the GMV in the last 30 days.
   */
  gmv_range?: number[];
  /**
   * Golden tick means affiliates create high quality contents with good sales conversion in Shopee Live or Shopee Video.
   */
  is_orange_tick_kol?: boolean;
  /**
   * Good sample fulfillment means that affiliates demonstrate better in free sample fulfillment compared to the majority of affiliates in recent180 days
   */
  is_good_fulfillment?: boolean;
  /**
   * Three promote category ids for this affiliate.
   */
  promote_category_ids?: number[];
  /**
   * Top popular contents of this affiliate.
   */
  top_popular_contents?: GetRecommendedAffiliateList_TopPopularContent[];
  /**
   * Top selling items of the affiliate.
   */
  top_selling_products?: GetRecommendedAffiliateList_TopSellingProduct[];
  [key: string]: any;
}
/**
 * GetRecommendedAffiliateList_Response sub-interface for GetRecommendedAffiliateListResponse
 */
export interface GetRecommendedAffiliateList_Response {
  /**
   * The total count of affiliates that recommended for shop id.
   */
  total_count?: number;
  /**
   * Recommended Affiliate list. Not all return fields will have values.
   */
  affiliate_list?: GetRecommendedAffiliateList_Affiliate[];
  [key: string]: any;
}
/**
 * Response data payload for get_recommended_affiliate_list
 */
export type GetRecommendedAffiliateListResponseData = GetRecommendedAffiliateList_Response;
/**
 * Response payload for get_recommended_affiliate_list
 *
 * Returns top 200 recommended affiliates that can be added to a campaign
 */
export type GetRecommendedAffiliateListResponse =
  FetchResponse<GetRecommendedAffiliateListResponseData>;
/**
 * Request parameters for get_shop_performance
 *
 * Retrieve overall key metrics for all channels or specific channels.
 */
export interface GetShopPerformanceRequest {
  /**
   * Period Type. Applicable values: DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Order Type. Applicable values: PlacedOrderConfirmedOrder: Note: - Placed orders are orders (COD and non-COD) that buyers have successfully placed, including paid and unpaid orders.- Confirmed orders are either non-COD orders that have been paid for or COD orders that have been confirmed for shipping (usually 30 mins after placing the order).
   */
  order_type: string;
  /**
   * Channel. Applicable values: - AllChannel- SocialMedia- ShopeeVideo- LiveStreaming
   */
  channel: string;
  [key: string]: any;
}
/**
 * GetShopPerformance_Response sub-interface for GetShopPerformanceResponse
 */
export interface GetShopPerformance_Response {
  /**
   * Total value of orders generated through affiliate marketing during the selected period.
   */
  sales?: string;
  /**
   * Total number of items sold through affiliate marketing during the selected period.
   */
  gross_item_sold?: number;
  /**
   * Total number of orders generated through affiliate marketing during the selected period.
   */
  orders?: number;
  /**
   * Total clicks on your product links through affiliate marketing during the selected period.
   */
  clicks?: number;
  /**
   * Estimated total payout from your affiliate marketing orders.
   */
  est_commission?: string;
  /**
   * Return on Investment, equal to Sales divided by Est. Commission. It can be used to evaluate the efficiency of your investment in affiliate marketing. If it does not exist, the return value is --.
   */
  roi?: string;
  /**
   * Total number of buyers who order from your shop through affiliate marketing.
   */
  total_buyers?: number;
  /**
   * Total number of new buyers who order from your shop through affiliate marketing.
   */
  new_buyers?: number;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_performance
 */
export type GetShopPerformanceResponseData = GetShopPerformance_Response;
/**
 * Response payload for get_shop_performance
 *
 * Retrieve overall key metrics for all channels or specific channels.
 */
export type GetShopPerformanceResponse = FetchResponse<GetShopPerformanceResponseData>;
/**
 * Request parameters for get_shop_suggested_rate
 *
 * Retrieve suggested rates for all eligible products
 */
export type GetShopSuggestedRateRequest = Record<string, never>;
/**
 * GetShopSuggestedRate_Response sub-interface for GetShopSuggestedRateResponse
 */
export interface GetShopSuggestedRate_Response {
  /**
   * Minimum suggested commission rate, 1.1 means 1.1%, support two decimal places
   */
  min_rate?: number;
  /**
   * Maximum suggested commission rate, 1.2 means 1.2%, support two decimal places
   */
  max_rate?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_suggested_rate
 */
export type GetShopSuggestedRateResponseData = GetShopSuggestedRate_Response;
/**
 * Response payload for get_shop_suggested_rate
 *
 * Retrieve suggested rates for all eligible products
 */
export type GetShopSuggestedRateResponse = FetchResponse<GetShopSuggestedRateResponseData>;
/**
 * Request parameters for get_targeted_campaign_addable_product_list
 *
 * Returns a list of products that can be added to a targeted campaign
 */
export interface GetTargetedCampaignAddableProductListRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "" or not passed. If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Use this field to specify which field to use to sort the returned item list. Available values:-sales: Sort by sales in descending order (default value)sales: Sort by sales in ascending order-stock: Sort by inventory in descending orderstock: Sort by inventory in ascending order-price: Sort by price in descending orderprice: Sort by price in ascending order
   */
  sort_by?: string;
  /**
   * Search type: ITEM_NAME or ITEM_ID, used with search_content.
   */
  search_type?: string;
  /**
   * Search by item name or item ID, item_id should be split by comma and at most 50 items.Please specify search_type for it to be effective, otherwise search_content will be ignored.
   */
  search_content?: string;
  [key: string]: any;
}
/**
 * GetTargetedCampaignAddableProductList_Item sub-interface for GetTargetedCampaignAddableProductList_Response
 */
export interface GetTargetedCampaignAddableProductList_Item {
  /**
   * The unique key for item.
   */
  item_id?: number;
  /**
   * The name of the current item.
   */
  item_name?: string;
  /**
   * The sold of the current item.
   */
  sales?: number;
  /**
   * The display_price of the current item.
   */
  display_price?: string;
  /**
   * The stock of the current item.
   */
  stock?: number;
  /**
   * Is the current item in the blacklist.
   */
  is_in_blacklist?: boolean;
  [key: string]: any;
}
/**
 * GetTargetedCampaignAddableProductList_Response sub-interface for GetTargetedCampaignAddableProductListResponse
 */
export interface GetTargetedCampaignAddableProductList_Response {
  /**
   * Item list.
   */
  item_list?: GetTargetedCampaignAddableProductList_Item[];
  /**
   * The total count of items that meet the query criteria.
   */
  total_count?: number;
  /**
   * Pass the content in the next request as cursor to get the next page data.
   */
  cursor?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_targeted_campaign_addable_product_list
 */
export type GetTargetedCampaignAddableProductListResponseData =
  GetTargetedCampaignAddableProductList_Response;
/**
 * Response payload for get_targeted_campaign_addable_product_list
 *
 * Returns a list of products that can be added to a targeted campaign
 */
export type GetTargetedCampaignAddableProductListResponse =
  FetchResponse<GetTargetedCampaignAddableProductListResponseData>;
/**
 * Request parameters for get_targeted_campaign_list
 *
 * Retrieve all current targeted campaigns created by the seller
 */
export interface GetTargetedCampaignListRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * The list of campaign_id for query, different campaign id should be split by comma and at most 50 campaigns.
   */
  campaign_id_list?: string[];
  /**
   * Campaign name for query.
   */
  campaign_name?: string;
  /**
   * Campaign status for query. Applicable values: UpcomingOngoingEndedCancelledDraftTerminatingTerminatedPaused
   */
  campaign_status?: string;
  /**
   * Campaign period start time for query.
   */
  period_start_time?: Date | number;
  /**
   * Campaign period end time for query.
   */
  period_end_time?: Date | number;
  /**
   * Item id for query.
   */
  item_id?: number;
  /**
   * Item name for query.
   */
  item_name?: string;
  [key: string]: any;
}
/**
 * GetTargetedCampaignList_Campaign sub-interface for GetTargetedCampaignList_Response
 */
export interface GetTargetedCampaignList_Campaign {
  /**
   * The unique key for the current campaign.
   */
  campaign_id?: number;
  /**
   * The name of the current campaign.
   */
  campaign_name?: string;
  /**
   * Campaign Status: UpcomingOngoingEndedCancelledDraftTerminatingTerminatedPaused
   */
  campaign_status?: string;
  /**
   * Source of campaign setup. Applicable values: - ShopeeManaged (Note: You cannot view the details or edit this campaign. If you try to do so, an 'invalid campaign_id' error will occur.)- Seller- Unknown
   */
  campaign_source?: string;
  /**
   * The start time of the current campaign.
   */
  period_start_time?: Date | number;
  /**
   * The end time of the current campaign, if get 32503651199 (2999-12-31 23:59:59), it means no limit
   */
  period_end_time?: Date | number;
  /**
   * The last editor of the current campaign.
   */
  last_editor?: string;
  /**
   * The last edit time of the current campaign.
   */
  last_edit_time?: Date | number;
  /**
   * The total count of affiliates associated with the current campaign.
   */
  affiliate_count?: number;
  /**
   * The total count of items associated with the current campaign.
   */
  item_count?: number;
  /**
   * The min commission rate of the current campaign.
   */
  min_rate?: number;
  /**
   * The max commission rate of the current campaign.
   */
  max_rate?: number;
  [key: string]: any;
}
/**
 * GetTargetedCampaignList_Response sub-interface for GetTargetedCampaignListResponse
 */
export interface GetTargetedCampaignList_Response {
  /**
   * The total count of targeted campaigns that meet the query criteria.
   */
  total_count?: number;
  /**
   * Targeted campaign list.
   */
  campaign_list?: GetTargetedCampaignList_Campaign[];
  [key: string]: any;
}
/**
 * Response data payload for get_targeted_campaign_list
 */
export type GetTargetedCampaignListResponseData = GetTargetedCampaignList_Response;
/**
 * Response payload for get_targeted_campaign_list
 *
 * Retrieve all current targeted campaigns created by the seller
 */
export type GetTargetedCampaignListResponse = FetchResponse<GetTargetedCampaignListResponseData>;
/**
 * Request parameters for get_targeted_campaign_performance
 *
 * Retrieve a list of Targeted Campaigns and their performance data
 */
export interface GetTargetedCampaignPerformanceRequest {
  /**
   * Period Type. Applicable values:DayWeekMonthLast7dLast30dNote: The start date and end date must align with the Period Type.
   */
  period_type: string;
  /**
   * The start_date must be:- Any day in the past three calendar months for "Day" period type- Sunday for "Week" period type- The 1st day of a Month for "Month" period type- The date that is 6 days prior to the latest data date for "Last7d" period type- The date that is 29 days prior to the latest data date for "Last30d" period typeNote: The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  start_date: string;
  /**
   * The end_date must be: - Equal to start_date for "Day" period type- Saturday for "Week" period type- The last day of a Month for "Month" period type. If the selected month is the current month, the end_date should be the latest data date- The latest data date for "Last7d" period type- The latest data date for "Last30d" period typeNote: - The end_date must be later than the start_date and earlier than the latest data date- The latest data date can be obtained by using "AmsMarker" in the v2.ams.get_performance_data_update_time API.
   */
  end_date: string;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 20.
   */
  page_size: number;
  /**
   * Campaign ID for query.
   */
  campaign_id?: number;
  [key: string]: any;
}
/**
 * GetTargetedCampaignPerformance_List sub-interface for GetTargetedCampaignPerformance_Response
 */
export interface GetTargetedCampaignPerformance_List {
  /**
   * Unique identifier of the targeted campaign.
   */
  campaign_id?: number;
  /**
   * The number of affiliates ever brought sales for the targeted campaign.
   */
  affiliates?: number;
  /**
   * Total sales amount generated from this targeted campaign, in the market's default currency.
   */
  sales?: string;
  /**
   * Total quantity of the item sold through the targeted campaign.
   */
  item_sold?: number;
  /**
   * The estimated commission amount payable to affiliates from this targeted campaign.
   */
  est_commission?: string;
  /**
   * Campaign name.
   */
  campaign_name?: string;
  [key: string]: any;
}
/**
 * GetTargetedCampaignPerformance_Response sub-interface for GetTargetedCampaignPerformanceResponse
 */
export interface GetTargetedCampaignPerformance_Response {
  list?: GetTargetedCampaignPerformance_List[];
  /**
   * This is to indicate the whole number of target campaigns.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  /**
   * Effective query date range. Invalid input ranges will be automatically shifted.
   */
  fetched_date_range?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_targeted_campaign_performance
 */
export type GetTargetedCampaignPerformanceResponseData = GetTargetedCampaignPerformance_Response;
/**
 * Response payload for get_targeted_campaign_performance
 *
 * Retrieve a list of Targeted Campaigns and their performance data
 */
export type GetTargetedCampaignPerformanceResponse =
  FetchResponse<GetTargetedCampaignPerformanceResponseData>;
/**
 * Request parameters for get_targeted_campaign_settings
 *
 * For each campaign, return: campaign basic info (name, status, promotion period, message), selected product list (with product name & ID), selected affiliate list (with affiliate names)
 */
export interface GetTargetedCampaignSettingsRequest {
  /**
   * Campaign id for query.Note: For campaigns with campaign_source = ShopeeManaged, cannot be queried for details through this API.
   */
  campaign_id: number;
  [key: string]: any;
}
/**
 * GetTargetedCampaignSettings_Affiliate sub-interface for GetTargetedCampaignSettings_Response
 */
export interface GetTargetedCampaignSettings_Affiliate {
  /**
   * The unique key for affiliate, can call v2.ams.query_affiliate_list to get affiliate details.
   */
  affiliate_id?: number;
  [key: string]: any;
}
/**
 * GetTargetedCampaignSettings_CommissionProtection sub-interface for GetTargetedCampaignSettings_Item
 */
export interface GetTargetedCampaignSettings_CommissionProtection {
  /**
   * Commission Rate, 1.1 means 1.1%, support two decimal places.
   */
  commission_rate?: number;
  /**
   * Protection Period End Time.
   */
  protection_period_end_time?: Date | number;
  [key: string]: any;
}
/**
 * GetTargetedCampaignSettings_Item sub-interface for GetTargetedCampaignSettings_Response
 */
export interface GetTargetedCampaignSettings_Item {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Item Name.
   */
  item_name?: string;
  /**
   * Commission rate of current item, 1.1 means 1.1%, support two decimal places.
   */
  rate?: number;
  /**
   * Max Commission Rate Current Day, 1.1 means 1.1%, support two decimal places.
   */
  max_commission_rate_current_day?: number;
  /**
   * Commission Protection List.
   */
  commission_protection_list?: GetTargetedCampaignSettings_CommissionProtection[];
  [key: string]: any;
}
/**
 * GetTargetedCampaignSettings_Response sub-interface for GetTargetedCampaignSettingsResponse
 */
export interface GetTargetedCampaignSettings_Response {
  /**
   * The name of the current campaign.
   */
  campaign_name?: string;
  /**
   * Campaign Status: UpcomingOngoingEndedCancelledDraftTerminatingTerminatedPaused
   */
  commission_status?: string;
  /**
   * The start time of the current campaign.
   */
  period_start_time?: Date | number;
  /**
   * The end time of the current campaign, if get 32503651199 (2999-12-31 23:59:59), it means no limit.
   */
  period_end_time?: Date | number;
  /**
   * Has the current campaign set a budget.Note: TH not supported
   */
  is_set_budget?: boolean;
  /**
   * The budget of the current campaign.Note: TH not supported
   */
  budget?: number;
  /**
   * The budget already spent on the current campaign.Note: TH not supported
   */
  budget_cost?: number;
  /**
   * The message displayed to affiliates.
   */
  seller_message?: string;
  /**
   * Pending Terminated Time.
   */
  pending_terminated_time?: Date | number;
  /**
   * The list of affiliates associated with the current campaign.
   */
  affiliate_list?: GetTargetedCampaignSettings_Affiliate[];
  /**
   * The list of items associated with the current campaign.
   */
  item_list?: GetTargetedCampaignSettings_Item[];
  [key: string]: any;
}
/**
 * Response data payload for get_targeted_campaign_settings
 */
export type GetTargetedCampaignSettingsResponseData = GetTargetedCampaignSettings_Response;
/**
 * Response payload for get_targeted_campaign_settings
 *
 * For each campaign, return: campaign basic info (name, status, promotion period, message), selected product list (with product name & ID), selected affiliate list (with affiliate names)
 */
export type GetTargetedCampaignSettingsResponse =
  FetchResponse<GetTargetedCampaignSettingsResponseData>;
/**
 * Request parameters for get_validation_list
 *
 * Retrieve the seller's AMS validation bill
 */
export type GetValidationListRequest = Record<string, never>;
/**
 * GetValidationList_OnlineBill sub-interface for GetValidationList_Validation
 */
export interface GetValidationList_OnlineBill {
  /**
   * Total commission amount for the billing month.
   */
  total_amount?: number;
  /**
   * Billing Status. Applicable values:1 = Pending2 = Completed3 = In process4 = To pay via payment link5 = Manual completed6 = To Be Settled Offline
   */
  bill_status?: number;
  /**
   * Commission amount already deducted.
   */
  deducted_amount?: number;
  /**
   * Commission amount paid using AMS Credits
   */
  ams_credit_deducted_amount?: number;
  /**
   * Commission amount pending deduction.
   */
  pending_amount?: number;
  [key: string]: any;
}
/**
 * GetValidationList_OfflineBill sub-interface for GetValidationList_Validation
 */
export interface GetValidationList_OfflineBill {
  /**
   * Order placement month in the format YYYYMM.
   */
  order_place_month?: number;
  /**
   * Total commission amount = commission_amount_after_tax + ams_credit_deducted_amount.
   */
  total_amount?: number;
  /**
   * Offline commission amount before tax.
   */
  commission_amount?: number;
  /**
   * Offline commission amount including tax.
   */
  commission_amount_after_tax?: number;
  /**
   * Commission amount already paid using AMS Credits.
   */
  ams_credit_deducted_amount?: number;
  [key: string]: any;
}
/**
 * GetValidationList_Validation sub-interface for GetValidationList_Response
 */
export interface GetValidationList_Validation {
  /**
   * Unique identifier of the billing entry.
   */
  validation_id?: string;
  /**
   * Payment method. Applicable values:1 = Online2 = Offline
   */
  payment_method?: number;
  /**
   * Billing month in the format YYYYMM (e.g., 202405).
   */
  validation_month?: number;
  /**
   * Source of campaign setup. Applicable values:ShopeeManagedSeller
   */
  campaign_source?: string;
  /**
   * Billing details when payment method is Online.
   */
  online_bill?: GetValidationList_OnlineBill;
  /**
   * List of billing details when payment method is Offline, grouped by order placement month.
   */
  offline_bills?: GetValidationList_OfflineBill[];
  [key: string]: any;
}
/**
 * GetValidationList_Response sub-interface for GetValidationListResponse
 */
export interface GetValidationList_Response {
  validation_list?: GetValidationList_Validation[];
  [key: string]: any;
}
/**
 * Response data payload for get_validation_list
 */
export type GetValidationListResponseData = GetValidationList_Response;
/**
 * Response payload for get_validation_list
 *
 * Retrieve the seller's AMS validation bill
 */
export type GetValidationListResponse = FetchResponse<GetValidationListResponseData>;
/**
 * Request parameters for get_validation_report
 *
 * Retrieve detailed information for a specific validation bill
 */
export interface GetValidationReportRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. If data is more than one page, the page_no can be some entry to start next call.
   */
  page_no: number;
  /**
   * Number of records returned per page, the maximum limit is 500, and page_no * page_size must be <= 10000.
   */
  page_size: number;
  /**
   * Unique identifier of the billing entry.
   */
  validation_id: string;
  /**
   * Billing month in the format YYYYMM (e.g., 202405).
   */
  validation_month: number;
  /**
   * Source of campaign setup. Applicable values:ShopeeManagedSeller
   */
  campaign_source: string;
  /**
   * Unique identifier of the order.
   */
  order_sn?: string;
  /**
   * Hierarchical product category classification. (L1 Category)
   */
  l1_category_id?: number;
  /**
   * Hierarchical product category classification. (L2 Category)
   */
  l2_category_id?: number;
  /**
   * Hierarchical product category classification. (L3 Category)
   */
  l3_category_id?: number;
  /**
   * Unique identifier of the product.
   */
  item_id?: number;
  /**
   * The product's name.
   */
  item_name?: string;
  /**
   * Verified Status. Applicable values:ValidInvalid
   */
  verified_status?: string;
  /**
   * ID referencing the campaign rule applied. (Ties to the campaign seller created).
   */
  attr_campaign_id?: number;
  /**
   * Start time (inclusive) of order placement, in timestamp format.
   */
  place_order_time_start: Date | number;
  /**
   * End time (inclusive) of order placement, in timestamp format.
   */
  place_order_time_end: Date | number;
  [key: string]: any;
}
/**
 * GetValidationReport_Item sub-interface for GetValidationReport_List
 */
export interface GetValidationReport_Item {
  /**
   * Unique identifier of the item in the order.
   */
  item_id?: number;
  /**
   * Name of the item in the order.
   */
  item_name?: string;
  /**
   * SKU/model identifier for the item.
   */
  model_id?: number;
  /**
   * Level-1 global category id classification of the item.
   */
  l1_category_id?: number;
  /**
   * Level-2 global category id classification of the item.
   */
  l2_category_id?: number;
  /**
   * Level-3 global category id classification of the item.
   */
  l3_category_id?: number;
  /**
   * Identifier of the promotion campaign linked to the order.
   */
  promotion_id?: string;
  /**
   * Item price in cents (or smallest currency unit).
   */
  price?: number;
  /**
   * Quantity of the item purchased.
   */
  qty?: number;
  /**
   * Type of seller campaign:1. Seller Open Campaign – Open to all affiliates.2. Seller Target Campaign – Restricted to designated affiliates.
   */
  seller_campaign_type?: string;
  /**
   * ID referencing the campaign rule applied.
   */
  attr_campaign_id?: number;
  /**
   * Total purchase value of the order in cents (or smallest currency unit).
   */
  purchase_value?: number;
  /**
   * Amount refunded for the item.
   */
  refund_amount?: string;
  /**
   * Commission (amount) for the item, paid by the seller.
   */
  item_brand_commission?: string;
  /**
   * Commission rate allocated to the affiliate for the item.
   */
  item_brand_commission_rate_to_affiliate?: string;
  /**
   * Commission (amount) allocated to the affiliate for the item.
   */
  item_brand_commission_to_affiliate?: string;
  /**
   * Commission rate allocated to the MCN for the item.
   */
  item_brand_commission_rate_to_mcn?: string;
  /**
   * Commission (amount) allocated to the MCN for the item.
   */
  item_brand_commission_to_mcn?: string;
  /**
   * Seller service fee rate applied to the item.
   */
  seller_service_fee_rate?: string;
  /**
   * Seller service fee amount charged for the item. seller_service_fee = item_brand_commission *  seller_service_fee_rate
   */
  seller_service_fee?: string;
  [key: string]: any;
}
/**
 * GetValidationReport_List sub-interface for GetValidationReport_Response
 */
export interface GetValidationReport_List {
  /**
   * Unique identifier of the order.
   */
  order_sn?: string;
  /**
   * Current status of the order (e.g., Pending, Completed, Cancelled).
   */
  order_status?: string;
  /**
   * Verification status of the order (Unverified, Verified).
   */
  verified_status?: string;
  /**
   * Time when the order was placed.
   */
  place_order_time?: string;
  /**
   * Time when the order was marked as completed.
   */
  order_completed_time?: string;
  /**
   * Time when the conversion (affiliate action) was completed.
   */
  conversion_completed_time?: string;
  /**
   * Display name of the affiliate who promoted the item.
   */
  affiliate_name?: string;
  /**
   * Login username of the affiliate.
   */
  affiliate_username?: string;
  /**
   * MCN (Multi-Channel Network) linked with the affiliate, if any.
   */
  linked_mcn?: string;
  /**
   * Partner identifier for the campaign.
   */
  campaign_partner?: string;
  /**
   * Type of order: Direct Order or Indirect Order.
   */
  order_type?: string;
  /**
   * Commission (amount) for the whole order, paid by the seller.
   */
  order_brand_commission?: string;
  /**
   * Traffic channel or platform where the promotion took place.
   */
  channel?: string;
  /**
   * Unique identifier of the affiliate.
   */
  affiliate_id?: number;
  /**
   * Buyer Status. Applicable values:NewExisting
   */
  buyer_status?: string;
  items?: GetValidationReport_Item[];
  [key: string]: any;
}
/**
 * GetValidationReport_Response sub-interface for GetValidationReportResponse
 */
export interface GetValidationReport_Response {
  /**
   * Array of order records. Each object contains order and commission details.
   */
  list?: GetValidationReport_List[];
  /**
   * Total number of entities that match the condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of datas.
   */
  has_more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_validation_report
 */
export type GetValidationReportResponseData = GetValidationReport_Response;
/**
 * Response payload for get_validation_report
 *
 * Retrieve detailed information for a specific validation bill
 */
export type GetValidationReportResponse = FetchResponse<GetValidationReportResponseData>;
/**
 * Request parameters for query_affiliate_list
 *
 * Retrieve affiliate information by affiliate id.
 */
export interface QueryAffiliateListRequest {
  /**
   * Query type: 1: query affiliate information by id list2: query affiliate id by name(fuzzy matching), only return affiliate id and affiliate name
   */
  query_type: number;
  /**
   * Query affiliate information by affiliate id list.Max count of affiliate id is 200. Will return first 200 affiliates' information if length > 200.
   */
  affiliate_id_list?: string[];
  /**
   * Query affiliate information by name use fuzzy matching.Will return first 200 affiliates' information is match number > 200.
   */
  name?: string;
  [key: string]: any;
}
/**
 * QueryAffiliateList_PopularSocialMedia sub-interface for QueryAffiliateList_Affiliate
 */
export interface QueryAffiliateList_PopularSocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  [key: string]: any;
}
/**
 * QueryAffiliateList_SocialMedia sub-interface for QueryAffiliateList_Affiliate
 */
export interface QueryAffiliateList_SocialMedia {
  /**
   * The platform of this social media account.
   */
  platform?: string;
  /**
   * The follower count of this account.
   */
  follower_count?: number;
  /**
   * Social media name of this account.
   */
  social_media_user_name?: string;
  [key: string]: any;
}
/**
 * QueryAffiliateList_TopPopularContent sub-interface for QueryAffiliateList_Affiliate
 */
export interface QueryAffiliateList_TopPopularContent {
  /**
   * The platform of this affiliate's content.
   */
  platform?: string;
  /**
   * The comment count of this affiliate's content.
   */
  comment_count?: number;
  /**
   * The like count of this affiliate's content.
   */
  like_count?: number;
  /**
   * The view count of this affiliate's content.
   */
  view_count?: number;
  /**
   * The cover link of this affiliate's content.
   */
  cover_url?: string;
  /**
   * The media link of this affiliate's content.
   */
  media_url?: string;
  [key: string]: any;
}
/**
 * QueryAffiliateList_TopSellingProduct sub-interface for QueryAffiliateList_Affiliate
 */
export interface QueryAffiliateList_TopSellingProduct {
  /**
   * The item id of this item.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * QueryAffiliateList_Affiliate sub-interface for QueryAffiliateList_Response
 */
export interface QueryAffiliateList_Affiliate {
  /**
   * The unique key for the current affiliate.
   */
  affiliate_id?: number;
  /**
   * The name of the affiliate.
   */
  affiliate_name?: string;
  /**
   * The shopee user name or affiliate name for this affiliate.
   */
  user_name?: string;
  /**
   * The url of affiliate's portrait
   */
  portrait_url?: string;
  /**
   * The popular social media of this affiliate.
   */
  popular_social_media?: QueryAffiliateList_PopularSocialMedia[];
  /**
   * Social media account list of this affiliate.
   */
  social_medias?: QueryAffiliateList_SocialMedia[];
  /**
   * Number of clicks in the last 30 days.
   */
  total_click?: number;
  /**
   * Range number of the orders in the last 30 days.
   */
  order_range?: number[];
  /**
   * Range number of the gmv in the last 30 days.
   */
  gmv_range?: number[];
  /**
   * Golden tick means affiliates create high quality contents with good sales conversion in Shopee Live or Shopee Video.
   */
  is_orange_tick_kol?: boolean;
  /**
   * Good sample fulfillment means that affiliates demonstrate better in free sample fulfillment compared to the majority of affiliates in recent180 days
   */
  is_good_fulfillment?: boolean;
  /**
   * Three promote category ids for this affiliate
   */
  promote_category_ids?: number[];
  /**
   * Top popular contents of this affiliate.
   */
  top_popular_contents?: QueryAffiliateList_TopPopularContent[];
  /**
   * Top selling items of the affiliate.
   */
  top_selling_products?: QueryAffiliateList_TopSellingProduct[];
  [key: string]: any;
}
/**
 * QueryAffiliateList_Response sub-interface for QueryAffiliateListResponse
 */
export interface QueryAffiliateList_Response {
  /**
   * The total count of affiliates by this query.Max is 200.
   */
  total_count?: number;
  /**
   * Affiliate list by this query.Not all return fields will have values.
   */
  affiliate_list?: QueryAffiliateList_Affiliate[];
  [key: string]: any;
}
/**
 * Response data payload for query_affiliate_list
 */
export type QueryAffiliateListResponseData = QueryAffiliateList_Response;
/**
 * Response payload for query_affiliate_list
 *
 * Retrieve affiliate information by affiliate id.
 */
export type QueryAffiliateListResponse = FetchResponse<QueryAffiliateListResponseData>;
/**
 * Request parameters for remove_all_products_open_campaign_setting
 *
 * Remove the entire product list of Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams. batch_remove_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export type RemoveAllProductsOpenCampaignSettingRequest = Record<string, never>;
/**
 * RemoveAllProductsOpenCampaignSetting_Response sub-interface for RemoveAllProductsOpenCampaignSettingResponse
 */
export interface RemoveAllProductsOpenCampaignSetting_Response {
  /**
   * Task type. Applicable values: batch_add_open_campaignsbatch_remove_open_campaignsbatch_update_open_campaignsFor this API, task type will be batch_remove_open_campaigns
   */
  task_type?: string;
  /**
   * Task id, used to query task progress when calling v2.ams.get_open_campaign_batch_task_result API
   */
  task_id?: string;
  [key: string]: any;
}
/**
 * Response data payload for remove_all_products_open_campaign_setting
 */
export type RemoveAllProductsOpenCampaignSettingResponseData =
  RemoveAllProductsOpenCampaignSetting_Response;
/**
 * Response payload for remove_all_products_open_campaign_setting
 *
 * Remove the entire product list of Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams. batch_remove_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
 */
export type RemoveAllProductsOpenCampaignSettingResponse =
  FetchResponse<RemoveAllProductsOpenCampaignSettingResponseData>;
/**
 * Request parameters for terminate_targeted_campaign
 *
 * Change target campaign status to "terminated" to stop all affiliate promotion activity
 */
export interface TerminateTargetedCampaignRequest {
  /**
   * The unique key for the current campaign.
   */
  campaign_id: number;
  [key: string]: any;
}
/**
 * Response data payload for terminate_targeted_campaign
 */
export type TerminateTargetedCampaignResponseData = Record<string, never>;
/**
 * Response payload for terminate_targeted_campaign
 *
 * Change target campaign status to "terminated" to stop all affiliate promotion activity
 */
export type TerminateTargetedCampaignResponse =
  FetchResponse<TerminateTargetedCampaignResponseData>;
/**
 * Request parameters for update_auto_add_new_product_setting
 *
 * Change auto-add toggle and default commission rate setting
 */
export interface UpdateAutoAddNewProductSettingRequest {
  /**
   * Enable or disable auto-add new product, if true is passed, it means enabled, if false is passed, it means disabled
   */
  open: boolean;
  /**
   * Commission rate, 1.1 means 1.1%, support two decimal places
   */
  commission_rate?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_auto_add_new_product_setting
 */
export type UpdateAutoAddNewProductSettingResponseData = Record<string, never>;
/**
 * Response payload for update_auto_add_new_product_setting
 *
 * Change auto-add toggle and default commission rate setting
 */
export type UpdateAutoAddNewProductSettingResponse =
  FetchResponse<UpdateAutoAddNewProductSettingResponseData>;
/**
 * Request parameters for update_basic_info_of_targeted_campaign
 *
 * Edit campaign name, promotion period, message, and budget (if the shop is whitelisted) of target campaign
 */
export interface UpdateBasicInfoOfTargetedCampaignRequest {
  /**
   * The unique key for the current campaign.
   */
  campaign_id: number;
  /**
   * The name of the current campaign.
   */
  campaign_name?: string;
  /**
   * The start time of the designated campaign, in seconds.
   */
  period_start_time?: Date | number;
  /**
   * The period end time of campaign, in seconds.Can set 32503651199 (2999-12-31 23:59:59) represent of no limit.
   */
  period_end_time?: Date | number;
  /**
   * Budget allocation toggle for the current campaign.Note: TH not supported
   */
  is_set_budget?: boolean;
  /**
   * Budget value set for the current campaign.Note: TH not supported
   */
  budget?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_basic_info_of_targeted_campaign
 */
export type UpdateBasicInfoOfTargetedCampaignResponseData = Record<string, never>;
/**
 * Response payload for update_basic_info_of_targeted_campaign
 *
 * Edit campaign name, promotion period, message, and budget (if the shop is whitelisted) of target campaign
 */
export type UpdateBasicInfoOfTargetedCampaignResponse =
  FetchResponse<UpdateBasicInfoOfTargetedCampaignResponseData>;
