// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field SmartCreativeSetting
 */
export enum SmartCreativeSetting {
  ON = "on",
  OFF = "off",
}
/**
 * Enum generated for field AdType
 */
export enum AdType {
  AUTO = "auto",
  MANUAL = "manual",
}
/**
 * Enum generated for field ReferenceId
 */
export enum ReferenceId {
  SUGGESTION = "suggestion",
  RECOMMENDATION = "recommendation",
}
/**
 * Request parameters for check_create_gms_product_campaign_eligibility
 *
 * Check the seller's eligibility in creating a GMS campaign
 */
export type CheckCreateGmsProductCampaignEligibilityRequest = Record<string, never>;
/**
 * CheckCreateGmsProductCampaignEligibilityResponseData sub-interface for CheckCreateGmsProductCampaignEligibilityResponse
 */
export interface CheckCreateGmsProductCampaignEligibilityResponseData {
  /**
   * Indicates if the seller is eligible to create a GMS Campaign
   */
  is_eligible?: boolean;
  /**
   * The following are the list of reasons for not being able to create a GMS Campaign: active_campaign    There is already an existing GMS Campaign that is activenot_whitelisted    The seller is not whitelisted to sz_shop_gmv_max_featurenot_have_enough_sku    The seller does not have enough valid items in the shopexclusive_with_other_campaign    Seller is whitelisted to sz_ads_auto_boost
   */
  reason?: string;
}
/**
 * Response payload for check_create_gms_product_campaign_eligibility
 *
 * Check the seller's eligibility in creating a GMS campaign
 */
export type CheckCreateGmsProductCampaignEligibilityResponse =
  FetchResponse<CheckCreateGmsProductCampaignEligibilityResponseData>;
/**
 * Request parameters for create_gms_product_campaign
 *
 * Create a GMS campaign
 */
export interface CreateGmsProductCampaignRequest {
  /**
   * Start date of Campaign e.g. "30-11-2025". Cannot be earlier than today.
   */
  start_date: string;
  /**
   * End date of Campaign e.g. "30-11-2025". Do not fill if no end date.
   */
  end_date?: string;
  /**
   * Daily budget for Campaign.
   */
  daily_budget: number;
  /**
   * Input a string
   */
  reference_id?: string;
  /**
   * No input will be GMV Max Auto Bidding (Shop).Input 0 for GMV Max Auto Bidding (Shop).Input greater than 0 for GMV Max Custom ROAS (Shop).If value = 10.123456, it will be taken as 10.1If value = 10.199999, it will be taken as 10.1
   */
  roas_target?: number;
}
/**
 * CreateGmsProductCampaignResponseData sub-interface for CreateGmsProductCampaignResponse
 */
export interface CreateGmsProductCampaignResponseData {
  /**
   * GMS Campaign ID.
   */
  campaign_id?: number;
}
/**
 * Response payload for create_gms_product_campaign
 *
 * Create a GMS campaign
 */
export type CreateGmsProductCampaignResponse = FetchResponse<CreateGmsProductCampaignResponseData>;
/**
 * CreateManualProductAdsSelectedKeyword sub-interface for CreateManualProductAdsRequest
 */
export interface CreateManualProductAdsSelectedKeyword {
  /**
   * bid keyword for each campaign
   */
  keyword: string;
  /**
   * exact, broad
   */
  match_type: string;
  /**
   * the bid price of keyword
   */
  bid_price_per_click: number;
}
/**
 * CreateManualProductAdsDiscoveryAdsLocation sub-interface for CreateManualProductAdsRequest
 */
export interface CreateManualProductAdsDiscoveryAdsLocation {
  /**
   * daily_discover, you_may_also_like
   */
  location: string;
  /**
   * bid price of the location
   */
  bid_price: number;
}
/**
 * Request parameters for create_manual_product_ads
 *
 * Use this API to create Manual Selection Product Ads
 */
export interface CreateManualProductAdsRequest {
  /**
   * A random string used to prevent duplicate ads. If an ads is created successfully, subsequent request using the same reference id will fail
   */
  reference_id: string;
  /**
   * The budget set for the Auto Product Ads
   */
  budget: number;
  /**
   * the start date per campaign. please kindly note that if you want to set unlimited date, you can just pass today's date as the start date
   */
  start_date: string;
  /**
   * the end date of each campaign. please kindly note that if you want to set an unlimited campaign, you can keep empty for the end date field
   */
  end_date?: string;
  /**
   * auto, manual
   */
  bidding_method: string;
  /**
   * Product ID
   */
  item_id: number;
  /**
   * the ROAS target for each campaign with auto bidding. If 0, GMV Max / ROI feature is not enabled
   */
  roas_target?: number;
  /**
   * selected keywords, required for manual bidding mode
   */
  selected_keywords?: CreateManualProductAdsSelectedKeyword[];
  /**
   * the location settings for manual bidding method
   */
  discovery_ads_locations?: CreateManualProductAdsDiscoveryAdsLocation[];
  /**
   * Enhanced CPC functionality toggle
   */
  enhanced_cpc?: boolean;
  /**
   * Whether to use default or set on/off Smart Creative for this ad. Supported Values: "", "default", "on", "off". Empty string treated as default.
   */
  smart_creative_setting?: SmartCreativeSetting | string | number;
}
/**
 * CreateManualProductAdsResponseDataItem sub-interface for CreateManualProductAdsResponse
 */
export interface CreateManualProductAdsResponseDataItem {
  /**
   * The unique identifier for a campaign
   */
  campaign_id?: number;
}
/**
 * Response data payload for create_manual_product_ads
 */
export type CreateManualProductAdsResponseData = CreateManualProductAdsResponseDataItem[];
/**
 * Response payload for create_manual_product_ads
 *
 * Use this API to create Manual Selection Product Ads
 */
export type CreateManualProductAdsResponse = FetchResponse<CreateManualProductAdsResponseData>;
/**
 * Request parameters for edit_gms_item_product_campaign
 *
 * Add/remove items to/from the GMS Campaign
 */
export interface EditGmsItemProductCampaignRequest {
  /**
   * The GMS Campaign ID. Provide if available.
   */
  campaign_id?: number;
  /**
   * The following is the list of possible actions:    add    remove
   */
  edit_action: string;
  /**
   * Item IDs to add / remove. Minimum 1 Item ID. Maximum 30 Item IDs.
   */
  item_id_list: number[];
}
/**
 * EditGmsItemProductCampaignResponseData sub-interface for EditGmsItemProductCampaignResponse
 */
export interface EditGmsItemProductCampaignResponseData {
  /**
   * GMS Campaign ID
   */
  campaign_id?: number;
}
/**
 * Response payload for edit_gms_item_product_campaign
 *
 * Add/remove items to/from the GMS Campaign
 */
export type EditGmsItemProductCampaignResponse =
  FetchResponse<EditGmsItemProductCampaignResponseData>;
/**
 * Request parameters for edit_gms_product_campaign
 *
 * Edit a GMS campaign
 */
export interface EditGmsProductCampaignRequest {
  /**
   * The GMS Campaign ID. Provide if available.
   */
  campaign_id?: number;
  /**
   * The following is the list of possible actions and their required fields:1.change_budgetdaily_budget2.change_durationstart_date3.end_date4.pause5.resume6.start7.change_roas_targetroas_target: when edit_action = change_roas_target, you must provide:roas_target (float) Value rules follow the same logic as in the create endpoint
   */
  edit_action: string;
  /**
   * Daily budget for Campaign.
   */
  daily_budget?: number;
  /**
   * Start date of Campaign e.g. "11-11-2025". Cannot be earlier than today.
   */
  start_date?: string;
  /**
   * End date of Campaign e.g. "11-11-2025". Do not fill if no end date.
   */
  end_date?: string;
  /**
   * No input will be GMV Max Auto Bidding (Shop).Input 0 for GMV Max Auto Bidding (Shop).Input greater than 0 for GMV Max Custom ROAS (Shop).If value = 10.123456, it will be taken as 10.1If value = 10.199999, it will be taken as 10.1
   */
  roas_target?: number;
  /**
   * Generated by developers, used to prevent duplicate requestsSubmitting the same reference_id more than once will fail; a new reference_id must be generated to retry.Example: 086a16bf-49e9-4103-b7fe-c0125beb9278
   */
  reference_id?: string;
}
/**
 * EditGmsProductCampaignResponseData sub-interface for EditGmsProductCampaignResponse
 */
export interface EditGmsProductCampaignResponseData {
  /**
   * GMS Campaign ID
   */
  campaign_id?: number;
}
/**
 * Response payload for edit_gms_product_campaign
 *
 * Edit a GMS campaign
 */
export type EditGmsProductCampaignResponse = FetchResponse<EditGmsProductCampaignResponseData>;
/**
 * EditManualProductAdKeywordsSelectedKeyword sub-interface for EditManualProductAdKeywordsRequest
 */
export interface EditManualProductAdKeywordsSelectedKeyword {
  /**
   * The update behaviours such as "add", "delete", "restore", "change_bid_price", "change_match_type"
   */
  edit_action: string;
  /**
   * bid keyword for each campaign
   */
  keyword: string;
  /**
   * exact, broad; required if changing match type
   */
  match_type?: string;
  /**
   * the bid price of keyword; required if changing bid price
   */
  bid_price_per_click?: number;
}
/**
 * Request parameters for edit_manual_product_ad_keywords
 *
 * Use this API to edit Manual Selection Product Ad Keywords
 */
export interface EditManualProductAdKeywordsRequest {
  /**
   * A random string used to prevent duplicate ads. If an ads is created successfully, subsequent request using the same reference id will fail
   */
  reference_id: string;
  /**
   * The unique identifier for a campaign
   */
  campaign_id: number;
  /**
   * selected keywords, required for manual bidding mode.
   */
  selected_keywords: EditManualProductAdKeywordsSelectedKeyword[];
}
/**
 * EditManualProductAdKeywordsFailedEdit sub-interface for EditManualProductAdKeywordsResponseDataItem
 */
export interface EditManualProductAdKeywordsFailedEdit {
  /**
   * keyword that failed to update
   */
  keyword?: string;
  /**
   * Error code
   */
  error?: string;
  /**
   * error description
   */
  message?: string;
}
/**
 * EditManualProductAdKeywordsResponseDataItem sub-interface for EditManualProductAdKeywordsResponse
 */
export interface EditManualProductAdKeywordsResponseDataItem {
  /**
   * The unique identifier for a campaign
   */
  campaign_id?: number;
  /**
   * failed edits are mentioned here
   */
  failed_edits?: EditManualProductAdKeywordsFailedEdit[];
}
/**
 * Response data payload for edit_manual_product_ad_keywords
 */
export type EditManualProductAdKeywordsResponseData = EditManualProductAdKeywordsResponseDataItem[];
/**
 * Response payload for edit_manual_product_ad_keywords
 *
 * Use this API to edit Manual Selection Product Ad Keywords
 */
export type EditManualProductAdKeywordsResponse =
  FetchResponse<EditManualProductAdKeywordsResponseData>;
/**
 * EditManualProductAdsDiscoveryAdsLocation sub-interface for EditManualProductAdsRequest
 */
export interface EditManualProductAdsDiscoveryAdsLocation {
  /**
   * daily_discover, you_may_also_like
   */
  location: string;
  /**
   * active / inactive
   */
  status: string;
  /**
   * bid price of the location
   */
  bid_price: number;
}
/**
 * Request parameters for edit_manual_product_ads
 *
 * Use this API to edit Manual Selection Product Ads
 */
export interface EditManualProductAdsRequest {
  /**
   * A random string used to prevent duplicate ads. If an ads is created successfully, subsequent request using the same reference id will fail
   */
  reference_id: string;
  /**
   * The unique identifier for a campaign
   */
  campaign_id: number;
  /**
   * Actions supported: "start", "pause", "resume", "stop", "delete", "change_budget", "change_duration", "change_smart_creative", "change_location", "change_enhanced_cpc", "change_roas_target"
   */
  edit_action: string;
  /**
   * The budget set for the Auto Product Ads
   */
  budget?: number;
  /**
   * the start date per campaign. please kindly note that if you want to set unlimited date, you can just pass today's date as the start date
   */
  start_date?: string;
  /**
   * the end date of each campaign. please kindly note that if you want to set an unlimited campaign, you can keep empty for the end date field
   */
  end_date?: string;
  /**
   * the ROAS target for each campaign with auto bidding
   */
  roas_target?: number;
  /**
   * the location settings for manual bidding method
   */
  discovery_ads_locations?: EditManualProductAdsDiscoveryAdsLocation[];
  /**
   * Enhanced CPC functionality toggle
   */
  enhanced_cpc?: boolean;
  /**
   * Whether to use default or set on/off Smart Creative for this ad. Supported Values: "", "default", "on", "off". Empty string treated as default.
   */
  smart_creative_setting?: SmartCreativeSetting | string | number;
}
/**
 * EditManualProductAdsResponseDataItem sub-interface for EditManualProductAdsResponse
 */
export interface EditManualProductAdsResponseDataItem {
  /**
   * The unique identifier for a campaign
   */
  campaign_id?: number;
}
/**
 * Response data payload for edit_manual_product_ads
 */
export type EditManualProductAdsResponseData = EditManualProductAdsResponseDataItem[];
/**
 * Response payload for edit_manual_product_ads
 *
 * Use this API to edit Manual Selection Product Ads
 */
export type EditManualProductAdsResponse = FetchResponse<EditManualProductAdsResponseData>;
/**
 * Request parameters for get_ads_facil_shop_rate
 *
 * Get shop rate for Ads Facil Program
 */
export type GetAdsFacilShopRateRequest = Record<string, never>;
/**
 * Response data payload for get_ads_facil_shop_rate
 */
export interface GetAdsFacilShopRateResponseData {
  /**
   * The rate of the shop who choose to participate in this program
   */
  rate?: number;
  /**
   * The update time in timestamp format
   */
  update_at?: number;
}
/**
 * Response payload for get_ads_facil_shop_rate
 *
 * Get shop rate for Ads Facil Program
 */
export type GetAdsFacilShopRateResponse = FetchResponse<GetAdsFacilShopRateResponseData>;
/**
 * Request parameters for get_all_cpc_ads_daily_performance
 *
 * Use this API to get Shop level CPC ads multiple-days daily performance.
 */
export interface GetAllCpcAdsDailyPerformanceRequest {
  /**
   * This is the parameter to indicate the start date of the time length of performance.
   */
  start_date: string;
  /**
   * This is the parameter to indicate the end date of the time length of performance
   */
  end_date: string;
}
/**
 * GetAllCpcAdsDailyPerformanceResponseDataItem sub-interface for GetAllCpcAdsDailyPerformanceResponse
 */
export interface GetAllCpcAdsDailyPerformanceResponseDataItem {
  /**
   * This is the parameter to indicate which date the performance record belongs to.
   */
  date?: string;
  /**
   * Number of times buyers see ads
   */
  impression?: number;
  /**
   * Total number of clicks on the Ad
   */
  clicks?: number;
  /**
   * Ctr, click-through rate measures how often shoppers who see an ad end up clicking it. CTR = Clicks / Impressions
   */
  ctr?: number;
  /**
   * Buyer place an order within 7 days after clicking on the ads (item gets purchased from the clicked ads)Please kindly note that the direct_order in the API reflected to Seller Center - Shopee Ads Module FE is Direct Conversions.
   */
  direct_order?: number;
  /**
   * Buyer place an order within 7 days after clicking on the ads; (the item gets purchased as long as there are other items from the same shops got click.)Please kindly note that the broad_order in the API reflected to Seller Center - Shopee Ads Module FE is Conversions.
   */
  broad_order?: number;
  /**
   * Ad orders / total number of clicks on the Ad. (item gets purchased from the clicked ads.)Please kindly note that the direct_conversions in the API reflected to Seller Center - Shopee Ads Module FE is Direct Conversions Rate.
   */
  direct_conversions?: number;
  /**
   * Ad orders / total number of clicks on the Ad. (the item gets purchased as long as there are other items from the same shops got click.)Please kindly note that the broad_conversions in the API reflected to Seller Center - Shopee Ads Module FE is Conversions Rate.
   */
  broad_conversions?: number;
  /**
   * item sold within 7 days after clicking on the ads. (item gets purchased from the clicked ads.)
   */
  direct_item_sold?: number;
  /**
   * item sold within 7 days after clicking on the ads.(the item gets purchased as long as there are other items from the same shops got click.)Please kindly note that the broad_conversions in the API reflected to Advertiser Platform is Conversion Rate.
   */
  broad_item_sold?: number;
  /**
   * Total sales generated from Ad over a certain time frame Typically 7 days. (item gets purchased from the clicked ads.)
   */
  direct_gmv?: number;
  /**
   * Total sales generated from Ad over a certain time frame (the item gets purchased as long as there are other items from the same shops got click.)
   */
  broad_gmv?: number;
  /**
   * Ad Expenditure
   */
  expense?: number;
  /**
   * (Cost Per Conversion) Ad's average cost per sales conversion
   */
  cost_per_conversion?: number;
  /**
   * Ad GMV/Ad Expenditure. (item gets purchased from the clicked ads.)
   */
  direct_roas?: number;
  /**
   * Ad GMV/Ad Expenditure. (the item gets purchased as long as there are other items from the same shops got click.)
   */
  broad_roas?: number;
}
/**
 * Response data payload for get_all_cpc_ads_daily_performance
 */
export type GetAllCpcAdsDailyPerformanceResponseData =
  GetAllCpcAdsDailyPerformanceResponseDataItem[];
/**
 * Response payload for get_all_cpc_ads_daily_performance
 *
 * Use this API to get Shop level CPC ads multiple-days daily performance.
 */
export type GetAllCpcAdsDailyPerformanceResponse =
  FetchResponse<GetAllCpcAdsDailyPerformanceResponseData>;
/**
 * Request parameters for get_all_cpc_ads_hourly_performance
 *
 * Use this API to get Shop level CPC ads single-date hourly performance.
 */
export interface GetAllCpcAdsHourlyPerformanceRequest {
  /**
   * This is the parameter of the single date on which requester wants to check the hourly performance. Date in DD-MM-YYYY format.
   */
  performance_date: string;
}
/**
 * GetAllCpcAdsHourlyPerformanceResponseDataItem sub-interface for GetAllCpcAdsHourlyPerformanceResponse
 */
export interface GetAllCpcAdsHourlyPerformanceResponseDataItem {
  /**
   * This is the parameter to indicate each hour the performance record belongs to.
   */
  hour?: number;
  /**
   * This is the parameter to indicate which date the performance record belongs to.
   */
  date?: string;
  /**
   * Number of times buyers see ads
   */
  impression?: number;
  /**
   * Total number of clicks on the Ad
   */
  clicks?: number;
  /**
   * Ctr, click-through rate measures how often shoppers who see an ad end up clicking it. CTR = Clicks / Impressions
   */
  ctr?: number;
  /**
   * Buyer place an order within 7 days after clicking on the ads (item gets purchased from the clicked ads).Please kindly note that the direct_order in the API reflected to Seller Center Shopee Ads Module FE is Direct Conversions.
   */
  direct_order?: number;
  /**
   * Buyer place an order within 7 days after clicking on the ads; (the item gets purchased as long as there are other items from the same shops got click.)Please kindly note that the broad_order in the API reflected to Seller Center Shopee Ads Module FE is Conversions.
   */
  broad_order?: number;
  /**
   * Ad orders / total number of clicks on the Ad. (item gets purchased from the clicked ads.)Please kindly note that the direct_conversions in the API reflected to Seller Center Shopee Ads Module FE is the Direct Conversion Rate
   */
  direct_conversions?: number;
  /**
   * Ad orders / total number of clicks on the Ad. (the item gets purchased as long as there are other items from the same shops got click.)Please kindly note that the broad conversions in the API reflected to Seller Center Shopee Ads Module FE is Conversion Rate
   */
  broad_conversions?: number;
  /**
   * item sold within 7 days after clicking on the ads. (item gets purchased from the clicked ads.)
   */
  direct_item_sold?: number;
  /**
   * item sold within 7 days after clicking on the ads.(the item gets purchased as long as there are other items from the same shops got click.)
   */
  broad_item_sold?: number;
  /**
   * Total sales generated from Ad over a certain time frame Typically 7 days. (item gets purchased from the clicked ads.)
   */
  direct_gmv?: number;
  /**
   * Total sales generated from Ad over a certain time frame (the item gets purchased as long as there are other items from the same shops got click.)
   */
  broad_gmv?: number;
  /**
   * Ad Expenditure
   */
  expense?: number;
  /**
   * (Cost Per Conversion) Ad's average cost per sales conversion
   */
  cost_per_conversion?: number;
  /**
   * Ad GMV/Ad Expenditure. (item gets purchased from the clicked ads.)
   */
  direct_roas?: number;
  /**
   * Ad GMV/Ad Expenditure. (the item gets purchased as long as there are other items from the same shops got click.)
   */
  broad_roas?: number;
}
/**
 * Response data payload for get_all_cpc_ads_hourly_performance
 */
export type GetAllCpcAdsHourlyPerformanceResponseData =
  GetAllCpcAdsHourlyPerformanceResponseDataItem[];
/**
 * Response payload for get_all_cpc_ads_hourly_performance
 *
 * Use this API to get Shop level CPC ads single-date hourly performance.
 */
export type GetAllCpcAdsHourlyPerformanceResponse =
  FetchResponse<GetAllCpcAdsHourlyPerformanceResponseData>;
/**
 * Request parameters for get_create_product_ad_budget_suggestion
 *
 * Call this API to get budget suggestion for product ads creation
 */
export interface GetCreateProductAdBudgetSuggestionRequest {
  /**
   * A random string used to prevent duplicate ads. If an ads is created successfully, subsequent request using the same reference id will fail
   */
  reference_id: string;
  /**
   * auto,manual - for Auto product ads or Manual Product Ads
   */
  product_selection: string;
  /**
   * search, discovery, all
   */
  campaign_placement: string;
  /**
   * Bidding Method of product ad: auto, manual
   */
  bidding_method: string;
  /**
   * Enhanced CPC functionality toggle. Values supported "true"/"false". Mandatory for product_selection=manual, bidding_method=manual
   */
  enhanced_cpc?: string;
  /**
   * List of comma separated location values from: daily_discover, you_may_also_like.Mandatory for product_selection=manual, product_placement={all|discovery}, bidding_method=manual
   */
  discovery_ads_location_names?: string;
  /**
   * the ROAS target for each campaign with auto bidding. If 0, GMV Max / ROI feature is not enabled
   */
  roas_target?: number;
  /**
   * Product ID. Mandatory for product_selection=manual
   */
  item_id?: number;
}
/**
 * GetCreateProductAdBudgetSuggestionBudget sub-interface for GetCreateProductAdBudgetSuggestionResponseData
 */
export interface GetCreateProductAdBudgetSuggestionBudget {
  /**
   * Recommended Suggested Budget
   */
  recommended_budget?: number;
  /**
   * Minimun Suggested Budget
   */
  min_budget?: number;
  /**
   * Maximum Suggested Budget
   */
  max_budget?: number;
}
/**
 * GetCreateProductAdBudgetSuggestionResponseData sub-interface for GetCreateProductAdBudgetSuggestionResponse
 */
export interface GetCreateProductAdBudgetSuggestionResponseData {
  /**
   * Budget data
   */
  budget?: GetCreateProductAdBudgetSuggestionBudget;
}
/**
 * Response payload for get_create_product_ad_budget_suggestion
 *
 * Call this API to get budget suggestion for product ads creation
 */
export type GetCreateProductAdBudgetSuggestionResponse =
  FetchResponse<GetCreateProductAdBudgetSuggestionResponseData>;
/**
 * Request parameters for get_gms_campaign_performance
 *
 * Get GMS Campaign performance
 */
export interface GetGmsCampaignPerformanceRequest {
  /**
   * The GMS Campaign ID. Provide if available.
   */
  campaign_id?: number;
  /**
   * Start date of Campaign e.g. "11-11-2025". Maximum duration of 3 months between start_date & end_date. Earliest start_date is 6 months before today.
   */
  start_date: string;
  /**
   * End date of Campaign e.g. "11-11-2025". Maximum duration of 3 months between start_date & end_date.
   */
  end_date: string;
}
/**
 * GetGmsCampaignPerformanceReport sub-interface for GetGmsCampaignPerformanceResponseData
 */
export interface GetGmsCampaignPerformanceReport {
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  broad_cir?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing products within 7 days of them clicking on your ad.
   */
  broad_gmv?: number;
  /**
   * The number of times shoppers purchased any product from your shop within 7 days of them clicking on your ad.
   */
  broad_order?: number;
  /**
   * The total quantity of products purchased by shoppers within 7 days of them clicking on your ad.
   */
  broad_order_amount?: number;
  /**
   * Return on ad spend (ROAS) measures how much revenue is generated by your ad relative to the cost of the ad. It is the amount of sales revenue attributed to your ad divided by the amount spent on the ad. ROAS = GMV ÷ expense. (Note: We recommend monitoring ROAS trends on a weekly basis.)
   */
  broad_roi?: number;
  /**
   * The number of times shoppers click on your ad. (Note: Shopee filters out repeated clicks from the same shopper that occur within a short time frame.)
   */
  clicks?: number;
  /**
   * The amount spent on your ad.
   */
  expense?: number;
  /**
   * The cost per conversion is how much each conversion costs, on average. It is the amount spent on your ad divided by the number of conversions attributed to the ad. Cost per conversion = expense ÷ conversions.
   */
  cpc?: number;
  /**
   * The cost per direct conversion is how much each direct conversion costs, on average. It is the amount spent on your ad divided by the number of direct conversions attributed to the ad. Cost per direct conversion = expense ÷ direct conversions.
   */
  cpdc?: number;
  /**
   * The conversion rate measures how often shoppers end up purchasing something from your shop after clicking on your ad. It is the number of conversions attributed to your ad divided by the number of clicks on the ad. Conversion rate = conversions ÷ clicks × 100%.
   */
  cr?: number;
  /**
   * The direct conversion rate measures how often shoppers end up purchasing the advertised product after clicking on the ad. Direct conversion rate is the number of direct conversions divided by the number of clicks. Direct conversion rate = direct conversions ÷ clicks × 100%.
   */
  direct_cr?: number;
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  direct_cir?: number;
  /**
   * The number of times shoppers purchased the advertised product within 7 days of them clicking on the ad.
   */
  direct_order?: number;
  /**
   * The total quantity of the advertised product purchased by shoppers within 7 days of them clicking on the ad.
   */
  direct_order_amount?: number;
  /**
   * The direct return on ad spend, or direct ROAS, measures how much revenue is generated from sales of the advertised product, relative to the cost of the ad. It is the amount of sales revenue for the advertised product attributed to the ad, divided by the amount spent on the ad. Direct ROAS = direct GMV ÷ expense.
   */
  direct_roi?: number;
  /**
   * The number of times shoppers see your ad.
   */
  impression?: number;
}
/**
 * GetGmsCampaignPerformanceResponseData sub-interface for GetGmsCampaignPerformanceResponse
 */
export interface GetGmsCampaignPerformanceResponseData {
  /**
   * GMS Campaign ID
   */
  campaign_id?: number;
  report?: GetGmsCampaignPerformanceReport;
}
/**
 * Response payload for get_gms_campaign_performance
 *
 * Get GMS Campaign performance
 */
export type GetGmsCampaignPerformanceResponse =
  FetchResponse<GetGmsCampaignPerformanceResponseData>;
/**
 * Request parameters for get_gms_item_performance
 *
 * Get GMS Item performance
 * 1. The response returned is sorted by item_id
 * 2. Only items with performance will be returned
 */
export interface GetGmsItemPerformanceRequest {
  /**
   * The GMS Campaign ID. Provide if available.
   */
  campaign_id?: number;
  /**
   * Start date of Campaign e.g. "11-11-2025". Maximum duration of 3 months between start_date & end_date. Earliest start_date is 6 months before today.
   */
  start_date: string;
  /**
   * End date of Campaign e.g. "11-11-2025". Maximum duration of 3 months between start_date & end_date.
   */
  end_date: string;
  /**
   * Specifies the starting point, or the number of records to skip. Default is 0.
   */
  offset?: number;
  /**
   * Specifies the maximum number of records to show. Default is 50. Maximum is 100.
   */
  limit?: number;
}
/**
 * GetGmsItemPerformanceReport sub-interface for GetGmsItemPerformanceResult
 */
export interface GetGmsItemPerformanceReport {
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  broad_cir?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing products within 7 days of them clicking on your ad.
   */
  broad_gmv?: number;
  /**
   * The number of times shoppers purchased any product from your shop within 7 days of them clicking on your ad.
   */
  broad_order?: number;
  /**
   * The total quantity of products purchased by shoppers within 7 days of them clicking on your ad.
   */
  broad_order_amount?: number;
  /**
   * Return on ad spend (ROAS) measures how much revenue is generated by your ad relative to the cost of the ad. It is the amount of sales revenue attributed to your ad divided by the amount spent on the ad. ROAS = GMV ÷ expense. (Note: We recommend monitoring ROAS trends on a weekly basis.)
   */
  broad_roi?: number;
  /**
   * The number of times shoppers click on your ad. (Note: Shopee filters out repeated clicks from the same shopper that occur within a short time frame.)
   */
  clicks?: number;
  /**
   * The amount spent on your ad.
   */
  expense?: number;
  /**
   * The cost per conversion is how much each conversion costs, on average. It is the amount spent on your ad divided by the number of conversions attributed to the ad. Cost per conversion = expense ÷ conversions.
   */
  cpc?: number;
  /**
   * The cost per direct conversion is how much each direct conversion costs, on average. It is the amount spent on your ad divided by the number of direct conversions attributed to the ad. Cost per direct conversion = expense ÷ direct conversions.
   */
  cpdc?: number;
  /**
   * The conversion rate measures how often shoppers end up purchasing something from your shop after clicking on your ad. It is the number of conversions attributed to your ad divided by the number of clicks on the ad. Conversion rate = conversions ÷ clicks × 100%.
   */
  cr?: number;
  /**
   * The direct conversion rate measures how often shoppers end up purchasing the advertised product after clicking on the ad. Direct conversion rate is the number of direct conversions divided by the number of clicks. Direct conversion rate = direct conversions ÷ clicks × 100%.
   */
  direct_cr?: number;
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  direct_cir?: number;
  /**
   * The number of times shoppers purchased the advertised product within 7 days of them clicking on the ad.
   */
  direct_order?: number;
  /**
   * The total quantity of the advertised product purchased by shoppers within 7 days of them clicking on the ad.
   */
  direct_order_amount?: number;
  /**
   * The direct return on ad spend, or direct ROAS, measures how much revenue is generated from sales of the advertised product, relative to the cost of the ad. It is the amount of sales revenue for the advertised product attributed to the ad, divided by the amount spent on the ad. Direct ROAS = direct GMV ÷ expense.
   */
  direct_roi?: number;
  /**
   * The number of times shoppers see your ad.
   */
  impression?: number;
}
/**
 * GetGmsItemPerformanceResult sub-interface for GetGmsItemPerformanceResponseData
 */
export interface GetGmsItemPerformanceResult {
  /**
   * Item ID. Results are sorted by this.
   */
  item_id?: number;
  report?: GetGmsItemPerformanceReport;
}
/**
 * GetGmsItemPerformanceResponseData sub-interface for GetGmsItemPerformanceResponse
 */
export interface GetGmsItemPerformanceResponseData {
  /**
   * GMS Campaign ID
   */
  campaign_id?: number;
  result_list?: GetGmsItemPerformanceResult[];
  /**
   * Total number of Item ID reports.
   */
  total?: number;
  /**
   * Indicate that there are more item ID reports.
   */
  has_next_page?: boolean;
}
/**
 * Response payload for get_gms_item_performance
 *
 * Get GMS Item performance
 * 1. The response returned is sorted by item_id
 * 2. Only items with performance will be returned
 */
export type GetGmsItemPerformanceResponse = FetchResponse<GetGmsItemPerformanceResponseData>;
/**
 * Request parameters for get_product_campaign_daily_performance
 *
 * Use this API to get Product level ads multiple-days daily performance.
 */
export interface GetProductCampaignDailyPerformanceRequest {
  /**
   * This is the parameter to indicate the start date of the time length of performance.
   */
  start_date: string;
  /**
   * This is the parameter to indicate the end date of the time length of performance
   */
  end_date: string;
  /**
   * The campaign ids (comma separated) you want to fetch the performance. (max 100)
   */
  campaign_id_list: string[];
}
/**
 * GetProductCampaignDailyPerformanceMetrics sub-interface for GetProductCampaignDailyPerformanceCampaign
 */
export interface GetProductCampaignDailyPerformanceMetrics {
  /**
   * the given date for the performance
   */
  date?: string;
  /**
   * The number of times shoppers see your ad.
   */
  impression?: number;
  /**
   * The number of times shoppers click on your ad. (Note: Shopee filters out repeated clicks from the same shopper that occur within a short time frame.)
   */
  clicks?: number;
  /**
   * The click-through rate (CTR) measures how often shoppers end up clicking on your ad after seeing it. It is the number of clicks on your ad divided by the number of times your ad is seen. CTR = clicks ÷ impressions × 100%.
   */
  ctr?: number;
  /**
   * The amount spent on your ad.
   */
  expense?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing products within 7 days of them clicking on your ad.
   */
  broad_gmv?: number;
  /**
   * The number of times shoppers purchased any product from your shop within 7 days of them clicking on your ad.
   */
  broad_order?: number;
  /**
   * The total quantity of products purchased by shoppers within 7 days of them clicking on your ad.
   */
  broad_order_amount?: number;
  /**
   * Return on ad spend (ROAS) measures how much revenue is generated by your ad relative to the cost of the ad. It is the amount of sales revenue attributed to your ad divided by the amount spent on the ad. ROAS = GMV ÷ expense. (Note: We recommend monitoring ROAS trends on a weekly basis.)
   */
  broad_roi?: number;
  /**
   * The advertising cost of sales (ACOS) measures how much your ad costs relative to the revenue the ad generates. It is the amount spent on your ad divided by the amount of sales revenue attributed to the ad. ACOS = expense ÷ GMV × 100%.
   */
  broad_cir?: number;
  /**
   * The conversion rate measures how often shoppers end up purchasing something from your shop after clicking on your ad. It is the number of conversions attributed to your ad divided by the number of clicks on the ad. Conversion rate = conversions ÷ clicks × 100%.
   */
  cr?: number;
  /**
   * The cost per conversion is how much each conversion costs, on average. It is the amount spent on your ad divided by the number of conversions attributed to the ad. Cost per conversion = expense ÷ conversions.
   */
  cpc?: number;
  /**
   * The number of times shoppers purchased the advertised product within 7 days of them clicking on the ad.
   */
  direct_order?: number;
  /**
   * The total quantity of the advertised product purchased by shoppers within 7 days of them clicking on the ad.
   */
  direct_order_amount?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing the advertised product within 7 days of them clicking on the ad.
   */
  direct_gmv?: number;
  /**
   * The direct return on ad spend, or direct ROAS, measures how much revenue is generated from sales of the advertised product, relative to the cost of the ad. It is the amount of sales revenue for the advertised product attributed to the ad, divided by the amount spent on the ad. Direct ROAS = direct GMV ÷ expense.
   */
  direct_roi?: number;
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  direct_cir?: number;
  /**
   * The direct conversion rate measures how often shoppers end up purchasing the advertised product after clicking on the ad. Direct conversion rate is the number of direct conversions divided by the number of clicks. Direct conversion rate = direct conversions ÷ clicks × 100%.
   */
  direct_cr?: number;
  /**
   * The cost per direct conversion is how much each direct conversion costs, on average. It is the amount spent on your ad divided by the number of direct conversions attributed to the ad. Cost per direct conversion = expense ÷ direct conversions.
   */
  cpdc?: number;
}
/**
 * GetProductCampaignDailyPerformanceCampaign sub-interface for GetProductCampaignDailyPerformanceResponseDataItem
 */
export interface GetProductCampaignDailyPerformanceCampaign {
  /**
   * the unique id per campaign
   */
  campaign_id?: number;
  /**
   * auto, manual
   */
  ad_type?: string;
  /**
   * search, discovery, all
   */
  campaign_placement?: string;
  /**
   * the name of each ad
   */
  ad_name?: string;
  /**
   * the performance metric list
   */
  metrics_list?: GetProductCampaignDailyPerformanceMetrics[];
}
/**
 * GetProductCampaignDailyPerformanceResponseDataItem sub-interface for GetProductCampaignDailyPerformanceResponse
 */
export interface GetProductCampaignDailyPerformanceResponseDataItem {
  /**
   * the unique id per shop
   */
  shop_id?: number;
  /**
   * the region where each shop is under
   */
  region?: string;
  /**
   * the list of campaign
   */
  campaign_list?: GetProductCampaignDailyPerformanceCampaign[];
}
/**
 * Response data payload for get_product_campaign_daily_performance
 */
export type GetProductCampaignDailyPerformanceResponseData =
  GetProductCampaignDailyPerformanceResponseDataItem[];
/**
 * Response payload for get_product_campaign_daily_performance
 *
 * Use this API to get Product level ads multiple-days daily performance.
 */
export type GetProductCampaignDailyPerformanceResponse =
  FetchResponse<GetProductCampaignDailyPerformanceResponseData>;
/**
 * Request parameters for get_product_campaign_hourly_performance
 *
 * Use this API to get Product level ads single-day hourly performance.
 */
export interface GetProductCampaignHourlyPerformanceRequest {
  /**
   * This is the parameter to indicate the start date of the time length of performance.
   */
  performance_date: string;
  /**
   * The campaign ids (comma separated) you want to fetch the performance. (max 100)
   */
  campaign_id_list: string[];
}
/**
 * GetProductCampaignHourlyPerformanceMetrics sub-interface for GetProductCampaignHourlyPerformanceCampaign
 */
export interface GetProductCampaignHourlyPerformanceMetrics {
  /**
   * This is the parameter to indicate each hour the performance record belongs to.
   */
  hour?: number;
  /**
   * This is the parameter of the single date on which requestor wants to check the hourly performance
   */
  date?: string;
  /**
   * The number of times shoppers see your ad.
   */
  impression?: number;
  /**
   * The number of times shoppers click on your ad. (Note: Shopee filters out repeated clicks from the same shopper that occur within a short time frame.)
   */
  clicks?: number;
  /**
   * The click-through rate (CTR) measures how often shoppers end up clicking on your ad after seeing it. It is the number of clicks on your ad divided by the number of times your ad is seen. CTR = clicks ÷ impressions × 100%.
   */
  ctr?: number;
  /**
   * The amount spent on your ad.
   */
  expense?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing products within 7 days of them clicking on your ad.
   */
  broad_gmv?: number;
  /**
   * The number of times shoppers purchased any product from your shop within 7 days of them clicking on your ad.
   */
  broad_order?: number;
  /**
   * The total quantity of products purchased by shoppers within 7 days of them clicking on your ad.
   */
  broad_order_amount?: number;
  /**
   * Return on ad spend (ROAS) measures how much revenue is generated by your ad relative to the cost of the ad. It is the amount of sales revenue attributed to your ad divided by the amount spent on the ad. ROAS = GMV ÷ expense. (Note: We recommend monitoring ROAS trends on a weekly basis.)
   */
  broad_roi?: number;
  /**
   * The advertising cost of sales (ACOS) measures how much your ad costs relative to the revenue the ad generates. It is the amount spent on your ad divided by the amount of sales revenue attributed to the ad. ACOS = expense ÷ GMV × 100%.
   */
  broad_cir?: number;
  /**
   * The conversion rate measures how often shoppers end up purchasing something from your shop after clicking on your ad. It is the number of conversions attributed to your ad divided by the number of clicks on the ad. Conversion rate = conversions ÷ clicks × 100%.
   */
  cr?: number;
  /**
   * The cost per conversion is how much each conversion costs, on average. It is the amount spent on your ad divided by the number of conversions attributed to the ad. Cost per conversion = expense ÷ conversions.
   */
  cpc?: number;
  /**
   * The number of times shoppers purchased the advertised product within 7 days of them clicking on the ad.
   */
  direct_order?: number;
  /**
   * The total quantity of the advertised product purchased by shoppers within 7 days of them clicking on the ad.
   */
  direct_order_amount?: number;
  /**
   * The amount of sales revenue generated from shoppers purchasing the advertised product within 7 days of them clicking on the ad.
   */
  direct_gmv?: number;
  /**
   * The direct return on ad spend, or direct ROAS, measures how much revenue is generated from sales of the advertised product, relative to the cost of the ad. It is the amount of sales revenue for the advertised product attributed to the ad, divided by the amount spent on the ad. Direct ROAS = direct GMV ÷ expense.
   */
  direct_roi?: number;
  /**
   * The direct advertising cost of sales, or direct ACOS, measures how much your ad costs relative to the revenue generated from sales of the advertised product. It is the amount spent on the ad divided by the amount of sales revenue for the advertised product that is attributed to the ad. Direct ACOS = expense ÷ direct GMV × 100%.
   */
  direct_cir?: number;
  /**
   * The direct conversion rate measures how often shoppers end up purchasing the advertised product after clicking on the ad. Direct conversion rate is the number of direct conversions divided by the number of clicks. Direct conversion rate = direct conversions ÷ clicks × 100%.
   */
  direct_cr?: number;
  /**
   * The cost per direct conversion is how much each direct conversion costs, on average. It is the amount spent on your ad divided by the number of direct conversions attributed to the ad. Cost per direct conversion = expense ÷ direct conversions.
   */
  cpdc?: number;
}
/**
 * GetProductCampaignHourlyPerformanceCampaign sub-interface for GetProductCampaignHourlyPerformanceResponseDataItem
 */
export interface GetProductCampaignHourlyPerformanceCampaign {
  /**
   * The unique identifier for a campaign
   */
  campaign_id?: number;
  /**
   * auto, manual
   */
  ad_type?: string;
  /**
   * search, discovery, all
   */
  campaign_placement?: string;
  /**
   * the name of each campaign
   */
  ad_name?: string;
  /**
   * performance metric list
   */
  metrics_list?: GetProductCampaignHourlyPerformanceMetrics[];
}
/**
 * GetProductCampaignHourlyPerformanceResponseDataItem sub-interface for GetProductCampaignHourlyPerformanceResponse
 */
export interface GetProductCampaignHourlyPerformanceResponseDataItem {
  /**
   * Shopee's unique identifier for a shop
   */
  shop_id?: number;
  /**
   * The region where this Shop is under
   */
  region?: string;
  /**
   * the list of campaign
   */
  campaign_list?: GetProductCampaignHourlyPerformanceCampaign[];
}
/**
 * Response data payload for get_product_campaign_hourly_performance
 */
export type GetProductCampaignHourlyPerformanceResponseData =
  GetProductCampaignHourlyPerformanceResponseDataItem[];
/**
 * Response payload for get_product_campaign_hourly_performance
 *
 * Use this API to get Product level ads single-day hourly performance.
 */
export type GetProductCampaignHourlyPerformanceResponse =
  FetchResponse<GetProductCampaignHourlyPerformanceResponseData>;
/**
 * Request parameters for get_product_level_campaign_id_list
 *
 * Call this API to fetch all the product campaign ids displayed on advertiser platform under a specific Shop
 */
export interface GetProductLevelCampaignIdListRequest {
  /**
   * Any of ["","all","auto","manual"]
   */
  ad_type?: string;
  /**
   * offset
   */
  offset?: number;
  /**
   * limit
   */
  limit?: number;
}
/**
 * GetProductLevelCampaignIdListCampaign sub-interface for GetProductLevelCampaignIdListResponseData
 */
export interface GetProductLevelCampaignIdListCampaign {
  /**
   * auto/manual
   */
  ad_type?: AdType | string | number;
  /**
   * the unique id per campaign
   */
  campaign_id?: number;
}
/**
 * GetProductLevelCampaignIdListResponseData sub-interface for GetProductLevelCampaignIdListResponse
 */
export interface GetProductLevelCampaignIdListResponseData {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Region the shop belongs to
   */
  region?: string;
  /**
   * there are more campaigns on next page
   */
  has_next_page?: boolean;
  /**
   * the list of campaigns
   */
  campaign_list?: GetProductLevelCampaignIdListCampaign[];
}
/**
 * Response payload for get_product_level_campaign_id_list
 *
 * Call this API to fetch all the product campaign ids displayed on advertiser platform under a specific Shop
 */
export type GetProductLevelCampaignIdListResponse =
  FetchResponse<GetProductLevelCampaignIdListResponseData>;
/**
 * Request parameters for get_product_level_campaign_setting_info
 *
 * Call this API to fetch all the campaign setting info under this Shop.
 */
export interface GetProductLevelCampaignSettingInfoRequest {
  /**
   * Info type values: 1.Common Info 2.Manual Bidding Info 3.Auto Bidding Info 4.Auto Product Ads Info
   */
  info_type_list: string[];
  /**
   * list of campaign ids comma separated (max 100 campaign ids)
   */
  campaign_id_list: string[];
}
/**
 * GetProductLevelCampaignSettingInfoCampaignDuration sub-interface for GetProductLevelCampaignSettingInfoCommonInfo
 */
export interface GetProductLevelCampaignSettingInfoCampaignDuration {
  /**
   * The start date for each campaign. please kindly note that if this campaign is no end date, please pass today's date as the start date
   */
  start_time?: number;
  /**
   * the end date per campaign. please kindly note that if it's no limit, so you don't need pass anything and if it's unlimited, the end time would return 0
   */
  end_time?: number;
}
/**
 * GetProductLevelCampaignSettingInfoCommonInfo sub-interface for GetProductLevelCampaignSettingInfoCampaign
 */
export interface GetProductLevelCampaignSettingInfoCommonInfo {
  /**
   * auto, manual
   */
  ad_type?: string;
  /**
   * the name of each ad
   */
  ad_name?: string;
  /**
   * ongoing, scheduled, ended, paused, deleted, closed
   */
  campaign_status?: string;
  /**
   * auto, manual
   */
  bidding_method?: string;
  /**
   * search, discovery, all
   */
  campaign_placement?: string;
  /**
   * The budget per campaign. Please kindly note that if the campaign budget = 0, it means the budget set for this campaign is unlimited
   */
  campaign_budget?: number;
  /**
   * the duration per campaign
   */
  campaign_duration?: GetProductLevelCampaignSettingInfoCampaignDuration;
  /**
   * List of unique identifiers for all products under this campaign. If the campaign is using auto product selection it can have between zero and many products. If the campaign is using manual product selection, it has exactly one.
   */
  item_id_list?: number[];
}
/**
 * GetProductLevelCampaignSettingInfoSelectedKeyword sub-interface for GetProductLevelCampaignSettingInfoManualBiddingInfo
 */
export interface GetProductLevelCampaignSettingInfoSelectedKeyword {
  /**
   * bid keywords for each campaign with search placement
   */
  keyword?: string;
  /**
   * deleted, normal, reserved, blacklist
   */
  status?: string;
  /**
   * exact, broad
   */
  match_type?: string;
  /**
   * the bid price
   */
  bid_price_per_click?: number;
}
/**
 * GetProductLevelCampaignSettingInfoDiscoveryAdsLocation sub-interface for GetProductLevelCampaignSettingInfoManualBiddingInfo
 */
export interface GetProductLevelCampaignSettingInfoDiscoveryAdsLocation {
  /**
   * daily_discover, you_may_also_like
   */
  location?: string;
  /**
   * toggle on or toggle off
   */
  status?: string;
  /**
   * bid price
   */
  bid_price?: number;
}
/**
 * GetProductLevelCampaignSettingInfoManualBiddingInfo sub-interface for GetProductLevelCampaignSettingInfoCampaign
 */
export interface GetProductLevelCampaignSettingInfoManualBiddingInfo {
  /**
   * Enhanced CPC functionality
   */
  enhanced_cpc?: boolean;
  /**
   * selected keywords
   */
  selected_keywords?: GetProductLevelCampaignSettingInfoSelectedKeyword[];
  /**
   * the location settings
   */
  discovery_ads_locations?: GetProductLevelCampaignSettingInfoDiscoveryAdsLocation[];
}
/**
 * GetProductLevelCampaignSettingInfoAutoBiddingInfo sub-interface for GetProductLevelCampaignSettingInfoCampaign
 */
export interface GetProductLevelCampaignSettingInfoAutoBiddingInfo {
  /**
   * the ROAS target for each campaign with auto bidding
   */
  roas_target?: number;
}
/**
 * GetProductLevelCampaignSettingInfoAutoProductAdsInfo sub-interface for GetProductLevelCampaignSettingInfoCampaign
 */
export interface GetProductLevelCampaignSettingInfoAutoProductAdsInfo {
  /**
   * the name of product
   */
  product_name?: string;
  /**
   * learning, ongoing, paused, ended, unavailable
   */
  status?: string;
  /**
   * Unique identifier for the product.
   */
  item_id?: number;
}
/**
 * GetProductLevelCampaignSettingInfoCampaign sub-interface for GetProductLevelCampaignSettingInfoResponseData
 */
export interface GetProductLevelCampaignSettingInfoCampaign {
  /**
   * The unique ID per campaign
   */
  campaign_id?: number;
  /**
   * common_info body
   */
  common_info?: GetProductLevelCampaignSettingInfoCommonInfo;
  /**
   * manual bidding info
   */
  manual_bidding_info?: GetProductLevelCampaignSettingInfoManualBiddingInfo;
  /**
   * bidding info
   */
  auto_bidding_info?: GetProductLevelCampaignSettingInfoAutoBiddingInfo;
  /**
   * selected products info
   */
  auto_product_ads_info?: GetProductLevelCampaignSettingInfoAutoProductAdsInfo[];
}
/**
 * GetProductLevelCampaignSettingInfoResponseData sub-interface for GetProductLevelCampaignSettingInfoResponse
 */
export interface GetProductLevelCampaignSettingInfoResponseData {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Region the shop belongs to
   */
  region?: string;
  /**
   * -
   */
  campaign_list?: GetProductLevelCampaignSettingInfoCampaign[];
}
/**
 * Response payload for get_product_level_campaign_setting_info
 *
 * Call this API to fetch all the campaign setting info under this Shop.
 */
export type GetProductLevelCampaignSettingInfoResponse =
  FetchResponse<GetProductLevelCampaignSettingInfoResponseData>;
/**
 * Request parameters for get_product_recommended_roi_target
 *
 * Get Product Recommended ROI Target
 */
export interface GetProductRecommendedRoiTargetRequest {
  /**
   * A random string used to prevent duplicate ads. If an ads is created successfully, subsequent requests using the same reference id will fail - in this case, a new one must be generated.Use the same string for calling suggestion/recommendation API before the actual request to create an ads.
   */
  reference_id: ReferenceId | string | number;
  /**
   * Unique identifier for a product.
   */
  item_id: number;
}
/**
 * GetProductRecommendedRoiTargetLowerBound sub-interface for GetProductRecommendedRoiTargetResponseData
 */
export interface GetProductRecommendedRoiTargetLowerBound {
  /**
   * The ROI target value.
   */
  value?: number;
  /**
   * Competitiveness over similar ads.
   */
  percentile?: number;
}
/**
 * GetProductRecommendedRoiTargetExact sub-interface for GetProductRecommendedRoiTargetResponseData
 */
export interface GetProductRecommendedRoiTargetExact {
  /**
   * The ROI target value.
   */
  value?: number;
  /**
   * Competitiveness over similar ads.
   */
  percentile?: number;
}
/**
 * GetProductRecommendedRoiTargetUpperBound sub-interface for GetProductRecommendedRoiTargetResponseData
 */
export interface GetProductRecommendedRoiTargetUpperBound {
  /**
   * The ROI target value.
   */
  value?: number;
  /**
   * Competitiveness over similar ads.
   */
  percentile?: number;
}
/**
 * GetProductRecommendedRoiTargetResponseData sub-interface for GetProductRecommendedRoiTargetResponse
 */
export interface GetProductRecommendedRoiTargetResponseData {
  /**
   * Lower bound recommendation.
   * e.g., value=3.5 and percentile=80 mean that setting an ROI target of 3.5 makes the ads more competitive than 80% of similar ads.
   */
  lower_bound?: GetProductRecommendedRoiTargetLowerBound;
  /**
   * Mid-level recommendation e.g., value=5.9 and percentile=50 mean that setting an ROI target of 5.9 makes the ads more competitive than 50% of similar ads.
   */
  exact?: GetProductRecommendedRoiTargetExact;
  /**
   * Higher bound recommendation.e.g., value=10.8 and percentile=20 mean that setting an ROI target of 10.8 makes the ads more competitive than 20% of similar ads.
   */
  upper_bound?: GetProductRecommendedRoiTargetUpperBound;
}
/**
 * Response payload for get_product_recommended_roi_target
 *
 * Get Product Recommended ROI Target
 */
export type GetProductRecommendedRoiTargetResponse =
  FetchResponse<GetProductRecommendedRoiTargetResponseData>;
/**
 * Request parameters for get_recommended_item_list
 *
 * Use this API to get the list of recommended SKU (Shop level) with the corresponding tag, i.e top search/best selling/best ROI tag.
 */
export type GetRecommendedItemListRequest = Record<string, never>;
/**
 * GetRecommendedItemListResponseDataItem sub-interface for GetRecommendedItemListResponse
 */
export interface GetRecommendedItemListResponseDataItem {
  /**
   * Recommended SKU's item id
   */
  item_id?: number;
  /**
   * This is param to indicate the status of items, so sellers can know whether an item is eligible for ads or not.
   */
  item_status_list?: string[];
  /**
   * The corresponding tag (or tags) that belong to item_id, sequences follow as best selling>best ROI>top search
   */
  sku_tag_list?: string[];
  /**
   * Current status of the ad on this item. For example- no ongoing promotion, search ads, discovery ads, boost ads
   */
  ongoing_ad_type_list?: string[];
}
/**
 * Response data payload for get_recommended_item_list
 */
export type GetRecommendedItemListResponseData = GetRecommendedItemListResponseDataItem[];
/**
 * Response payload for get_recommended_item_list
 *
 * Use this API to get the list of recommended SKU (Shop level) with the corresponding tag, i.e top search/best selling/best ROI tag.
 */
export type GetRecommendedItemListResponse = FetchResponse<GetRecommendedItemListResponseData>;
/**
 * Request parameters for get_recommended_keyword_list
 *
 * Use this API to get the list of Recommended keywords by item and optionally a search keyword
 */
export interface GetRecommendedKeywordListRequest {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * The keyword seller typed in the manually add keyword window.
   */
  input_keyword?: string;
}
/**
 * GetRecommendedKeywordListSuggestedKeyword sub-interface for GetRecommendedKeywordListResponseData
 */
export interface GetRecommendedKeywordListSuggestedKeyword {
  /**
   * Keyword value(Only return the highly recommended keywords, will be sightly different from Seller Center)
   */
  keyword?: string;
  /**
   * This is a measure of how attractive your ad is and its relevance to the keyword. The higher the quality score, the higher your ad rank. Ad rank is based on this score and your bid price.
   */
  quality_score?: number;
  /**
   * The number of times the keyword has been searched on Shopee in the last 30 days. The larger the search volume, the more impressions your ad will receive.
   */
  search_volume?: number;
  /**
   * This is bid price suggested by Shopee algorithm for the keyword in local currency.
   */
  suggested_bid?: number;
}
/**
 * GetRecommendedKeywordListResponseData sub-interface for GetRecommendedKeywordListResponse
 */
export interface GetRecommendedKeywordListResponseData {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The keyword seller typed in the manually add keyword window.
   */
  input_keyword?: string;
  /**
   * Suggested keywords recommended from product.
   */
  suggested_keywords?: GetRecommendedKeywordListSuggestedKeyword[];
}
/**
 * Response payload for get_recommended_keyword_list
 *
 * Use this API to get the list of Recommended keywords by item and optionally a search keyword
 */
export type GetRecommendedKeywordListResponse =
  FetchResponse<GetRecommendedKeywordListResponseData>;
/**
 * Request parameters for get_shop_toggle_info
 *
 * Use this API to get Shop level info - i.e. seller's toggle status is on/off
 */
export type GetShopToggleInfoRequest = Record<string, never>;
/**
 * GetShopToggleInfoResponseData sub-interface for GetShopToggleInfoResponse
 */
export interface GetShopToggleInfoResponseData {
  /**
   * Timestamp of data in response
   */
  data_timestamp?: Date | number;
  /**
   * auto_top_up toggle on/off
   */
  auto_top_up?: boolean;
  /**
   * campaign_surge toggle on/off
   */
  campaign_surge?: boolean;
}
/**
 * Response payload for get_shop_toggle_info
 *
 * Use this API to get Shop level info - i.e. seller's toggle status is on/off
 */
export type GetShopToggleInfoResponse = FetchResponse<GetShopToggleInfoResponseData>;
/**
 * Request parameters for get_total_balance
 *
 * Use this API to return the seller's Real-time total balance of their ads credit including the paid credits and free credits.
 */
export type GetTotalBalanceRequest = Record<string, never>;
/**
 * GetTotalBalanceResponseData sub-interface for GetTotalBalanceResponse
 */
export interface GetTotalBalanceResponseData {
  /**
   * This is param to indicate the time of the snapshot of total balance
   */
  data_timestamp?: Date | number;
  /**
   * This is seller's ads credit balance, including paid credits and free credits.
   */
  total_balance?: number;
}
/**
 * Response payload for get_total_balance
 *
 * Use this API to return the seller's Real-time total balance of their ads credit including the paid credits and free credits.
 */
export type GetTotalBalanceResponse = FetchResponse<GetTotalBalanceResponseData>;
/**
 * Request parameters for list_gms_user_deleted_item
 *
 * List GMS items that have been removed from the Campaign by seller
 */
export interface ListGmsUserDeletedItemRequest {
  /**
   * Specifies the starting point, or the number of records to skip. Default is 0.
   */
  offset?: number;
  /**
   * Specifies the maximum number of records to show. Default is 50. Maximum is 100.
   */
  limit?: number;
}
/**
 * ListGmsUserDeletedItemResponseData sub-interface for ListGmsUserDeletedItemResponse
 */
export interface ListGmsUserDeletedItemResponseData {
  /**
   * GMS Campaign ID
   */
  campaign_id?: number;
  /**
   * List of Item IDs
   */
  item_id_list?: number[];
  /**
   * Total number of Item IDs
   */
  total?: number;
  /**
   * Indicate that there are more item IDs.
   */
  has_next_page?: boolean;
}
/**
 * Response payload for list_gms_user_deleted_item
 *
 * List GMS items that have been removed from the Campaign by seller
 */
export type ListGmsUserDeletedItemResponse = FetchResponse<ListGmsUserDeletedItemResponseData>;
