import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  GetTotalBalanceResponse,
  GetShopToggleInfoResponse,
  GetRecommendedKeywordListParams,
  GetRecommendedKeywordListResponse,
  GetRecommendedItemListResponse,
  GetAllCpcAdsHourlyPerformanceParams,
  GetAllCpcAdsHourlyPerformanceResponse,
  GetAllCpcAdsDailyPerformanceParams,
  GetAllCpcAdsDailyPerformanceResponse,
  GetProductCampaignDailyPerformanceParams,
  GetProductCampaignDailyPerformanceResponse,
  GetProductCampaignHourlyPerformanceParams,
  GetProductCampaignHourlyPerformanceResponse,
  GetProductLevelCampaignIdListParams,
  GetProductLevelCampaignIdListResponse,
  GetProductLevelCampaignSettingInfoParams,
  GetProductLevelCampaignSettingInfoResponse,
  GetProductRecommendedRoiTargetParams,
  GetProductRecommendedRoiTargetResponse,
} from "../schemas/ads.js";
import { ShopeeFetch } from "../fetch.js";

export class AdsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get seller's real-time total balance of ads credit
   * @returns {Promise<GetTotalBalanceResponse>} Response containing the total balance and timestamp
   *
   * This API returns the seller's real-time total balance of their ads credit,
   * including both paid credits and free credits.
   *
   * The response includes:
   * - data_timestamp: The time when the balance snapshot was taken
   * - total_balance: The total ads credit balance
   *
   * Note: This balance is real-time and represents the current available credit
   * that can be used for advertising campaigns.
   */
  async getTotalBalance(): Promise<GetTotalBalanceResponse> {
    const response = await ShopeeFetch.fetch<GetTotalBalanceResponse>(
      this.config,
      "/ads/get_total_balance",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Get seller's toggle status information at the shop level
   * @returns {Promise<GetShopToggleInfoResponse>} Response containing toggle statuses
   *
   * This API returns the seller's toggle status information indicating whether
   * certain features are enabled or disabled at the shop level.
   *
   * The response includes:
   * - data_timestamp: The time when the information was retrieved
   * - auto_top_up: Whether automatic top-up is enabled (true) or disabled (false)
   * - campaign_surge: Whether campaign surge is enabled (true) or disabled (false)
   *
   * These settings affect how ads campaigns are managed and funded.
   */
  async getShopToggleInfo(): Promise<GetShopToggleInfoResponse> {
    const response = await ShopeeFetch.fetch<GetShopToggleInfoResponse>(
      this.config,
      "/ads/get_shop_toggle_info",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Get the list of recommended keywords for an item
   * @param {GetRecommendedKeywordListParams} params Request parameters
   * @param {number} params.item_id Shopee's unique identifier for an item
   * @param {string} [params.input_keyword] The keyword seller typed in the manually add keyword window
   * @returns {Promise<GetRecommendedKeywordListResponse>} Response containing recommended keywords
   *
   * This API is used to get the list of recommended keywords by item and optionally a search keyword.
   *
   * The response includes:
   * - item_id: The item ID for which keywords are recommended
   * - input_keyword: The keyword provided in the request (if any)
   * - suggested_keywords: List of suggested keywords with quality score, search volume, and suggested bid
   *
   * Use this API to get keyword suggestions to improve item discoverability in search results.
   */
  async getRecommendedKeywordList(
    params: GetRecommendedKeywordListParams
  ): Promise<GetRecommendedKeywordListResponse> {
    const response = await ShopeeFetch.fetch<GetRecommendedKeywordListResponse>(
      this.config,
      "/ads/get_recommended_keyword_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get the list of recommended SKUs (Shop level) with the corresponding tag
   * @returns {Promise<GetRecommendedItemListResponse>} Response containing recommended items
   *
   * This API is used to get the list of recommended SKU (Shop level) with the corresponding tag,
   * i.e top search/best selling/best ROI tag.
   *
   * The response includes an array of items with the following details for each item:
   * - item_id: Recommended SKU's item id
   * - item_status_list: Status of items (indicates whether an item is eligible for ads or not)
   * - sku_tag_list: Tags such as "best selling", "best ROI", "top search"
   * - ongoing_ad_type_list: Current status of ads on this item (e.g., search ads, discovery ads)
   *
   * Use this API to identify high-potential items for advertising campaigns.
   */
  async getRecommendedItemList(): Promise<GetRecommendedItemListResponse> {
    const response = await ShopeeFetch.fetch<GetRecommendedItemListResponse>(
      this.config,
      "/ads/get_recommended_item_list",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Get shop level CPC ads single-date hourly performance data
   * @param {GetAllCpcAdsHourlyPerformanceParams} params Request parameters
   * @param {string} params.performance_date Single date for hourly performance data in DD-MM-YYYY format
   * @returns {Promise<GetAllCpcAdsHourlyPerformanceResponse>} Response containing hourly performance metrics
   *
   * This API is used to get Shop level CPC ads single-date hourly performance.
   * The date must be today or earlier than today (up to 6 months ago).
   *
   * The response includes an array of hourly performance metrics with the following details for each hour:
   * - hour: The hour the performance record belongs to
   * - date: The date the performance record belongs to
   * - impression: Number of times buyers see ads
   * - clicks: Total number of clicks on the ad
   * - ctr: Click-through rate (Clicks / Impressions)
   * - direct_order: Orders placed within 7 days after clicking on the clicked ad
   * - broad_order: Orders placed within 7 days after clicking on any ad from the same shop
   * - direct_conversions: Direct conversion rate (clicked ad orders / total clicks)
   * - broad_conversions: Broad conversion rate (any shop orders / total clicks)
   * - direct_item_sold: Items sold from the clicked ad
   * - broad_item_sold: Items sold from the shop after any ad click
   * - direct_gmv: Total sales from the clicked ad
   * - broad_gmv: Total sales from the shop after any ad click
   * - expense: Ad expenditure
   * - cost_per_conversion: Average cost per sales conversion
   * - direct_roas: Direct return on ad spend (direct GMV / expense)
   * - broad_roas: Broad return on ad spend (broad GMV / expense)
   *
   * Use this API to analyze hourly ad performance patterns for optimization.
   */
  async getAllCpcAdsHourlyPerformance(
    params: GetAllCpcAdsHourlyPerformanceParams
  ): Promise<GetAllCpcAdsHourlyPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetAllCpcAdsHourlyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_hourly_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get shop level CPC ads daily performance data for a date range
   * @param {GetAllCpcAdsDailyPerformanceParams} params Request parameters
   * @param {string} params.start_date Start date of the performance data range in DD-MM-YYYY format
   * @param {string} params.end_date End date of the performance data range in DD-MM-YYYY format
   * @returns {Promise<GetAllCpcAdsDailyPerformanceResponse>} Response containing daily performance metrics
   *
   * This API is used to get Shop level CPC ads multiple-days daily performance.
   * The date range must be today or earlier than today (up to 6 months ago), and cannot exceed 1 month.
   * Start date must be earlier than end date and cannot be equal to end date.
   *
   * The response includes an array of daily performance metrics with the following details for each day:
   * - date: The date the performance record belongs to
   * - impression: Number of times buyers see ads
   * - clicks: Total number of clicks on the ad
   * - ctr: Click-through rate (Clicks / Impressions)
   * - direct_order: Orders placed within 7 days after clicking on the clicked ad
   * - broad_order: Orders placed within 7 days after clicking on any ad from the same shop
   * - direct_conversions: Direct conversion rate (clicked ad orders / total clicks)
   * - broad_conversions: Broad conversion rate (any shop orders / total clicks)
   * - direct_item_sold: Items sold from the clicked ad
   * - broad_item_sold: Items sold from the shop after any ad click
   * - direct_gmv: Total sales from the clicked ad
   * - broad_gmv: Total sales from the shop after any ad click
   * - expense: Ad expenditure
   * - cost_per_conversion: Average cost per sales conversion
   * - direct_roas: Direct return on ad spend (direct GMV / expense)
   * - broad_roas: Broad return on ad spend (broad GMV / expense)
   *
   * Use this API to analyze daily ad performance trends over a time period.
   */
  async getAllCpcAdsDailyPerformance(
    params: GetAllCpcAdsDailyPerformanceParams
  ): Promise<GetAllCpcAdsDailyPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetAllCpcAdsDailyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_daily_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get product-level campaign performance data for a date range
   * @param {GetProductCampaignDailyPerformanceParams} params Request parameters
   * @param {string} params.start_date Start date of the performance data range in DD-MM-YYYY format
   * @param {string} params.end_date End date of the performance data range in DD-MM-YYYY format
   * @param {string} params.campaign_id_list Comma-separated list of campaign IDs to fetch performance for (max 100)
   * @returns {Promise<GetProductCampaignDailyPerformanceResponse>} Response containing detailed campaign performance metrics
   *
   * This API is used to get product-level ads performance data across multiple days.
   * The date range must be today or earlier than today (up to 6 months ago), and cannot exceed 1 month.
   * Start date must be earlier than end date and cannot be equal to end date.
   *
   * The response is structured hierarchically with:
   * - shop_id and region information
   * - Detailed campaign list with campaign_id, ad_type, campaign_placement, and ad_name
   * - Comprehensive daily metrics for each campaign including:
   *   - Impressions, clicks, and CTR
   *   - Expense (ad spend)
   *   - Direct and broad performance metrics (orders, GMV, ROI)
   *   - Conversion rates and cost efficiency metrics
   *
   * Direct metrics refer to performance of the advertised product specifically, while
   * broad metrics account for any purchases from the shop after an ad click.
   *
   * Use this API to analyze campaign effectiveness at the product level and optimize
   * your advertising strategy based on detailed performance data.
   */
  async getProductCampaignDailyPerformance(
    params: GetProductCampaignDailyPerformanceParams
  ): Promise<GetProductCampaignDailyPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetProductCampaignDailyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_daily_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get product-level campaign hourly performance data for a single day
   * @param {GetProductCampaignHourlyPerformanceParams} params Request parameters
   * @param {string} params.performance_date Single date for the hourly performance data in DD-MM-YYYY format
   * @param {string} params.campaign_id_list Comma-separated list of campaign IDs to fetch performance for (max 100)
   * @returns {Promise<GetProductCampaignHourlyPerformanceResponse>} Response containing detailed hourly campaign performance metrics
   *
   * This API is used to get product-level ads hourly performance data for a single day.
   * The date must be today or earlier than today (up to 6 months ago).
   *
   * The response is structured hierarchically with:
   * - shop_id and region information
   * - Detailed campaign list with campaign_id, ad_type, campaign_placement, and ad_name
   * - Comprehensive hourly metrics for each campaign including:
   *   - Hour the performance record belongs to
   *   - Impressions, clicks, and CTR
   *   - Expense (ad spend)
   *   - Direct and broad performance metrics (orders, GMV, ROI)
   *   - Conversion rates and cost efficiency metrics
   *
   * Direct metrics refer to performance of the advertised product specifically, while
   * broad metrics account for any purchases from the shop after an ad click.
   *
   * Use this API to analyze hourly campaign patterns and performance fluctuations
   * throughout the day to optimize timing of ad campaigns and budget allocation.
   */
  async getProductCampaignHourlyPerformance(
    params: GetProductCampaignHourlyPerformanceParams
  ): Promise<GetProductCampaignHourlyPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetProductCampaignHourlyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_hourly_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get a list of all product-level campaign IDs for a shop
   * @param {GetProductLevelCampaignIdListParams} [params] Optional request parameters
   * @param {string} [params.ad_type] Filter campaigns by ad type (can be "", "all", "auto", or "manual")
   * @param {number} [params.offset] Pagination offset for fetching subsequent pages
   * @param {number} [params.limit] Page size limit (number of results to return)
   * @returns {Promise<GetProductLevelCampaignIdListResponse>} Response containing campaign IDs and pagination info
   *
   * This API is used to fetch all product campaign IDs displayed on the advertiser platform
   * for a specific shop. The results can be filtered by ad type and paginated using
   * offset and limit parameters.
   *
   * The response contains:
   * - shop_id: The unique identifier for the shop
   * - region: The region where the shop is located
   * - has_next_page: Indicates if there are more campaigns on the next page
   * - campaign_list: List of campaigns with ad_type and campaign_id
   *
   * Use this API to retrieve campaign IDs that can then be used with other APIs
   * like getProductCampaignDailyPerformance or getProductCampaignHourlyPerformance
   * to fetch detailed performance metrics.
   */
  async getProductLevelCampaignIdList(
    params?: GetProductLevelCampaignIdListParams
  ): Promise<GetProductLevelCampaignIdListResponse> {
    const response = await ShopeeFetch.fetch<GetProductLevelCampaignIdListResponse>(
      this.config,
      "/ads/get_product_level_campaign_id_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get detailed settings information for product-level campaigns
   * @param {GetProductLevelCampaignSettingInfoParams} params Request parameters
   * @param {string} params.info_type_list Comma-separated list of info types to retrieve (1: Common Info, 2: Manual Bidding Info, 3: Auto Bidding Info, 4: Auto Product Ads Info)
   * @param {string} params.campaign_id_list Comma-separated list of campaign IDs to fetch settings for (max 100)
   * @returns {Promise<GetProductLevelCampaignSettingInfoResponse>} Response containing detailed campaign settings
   *
   * This API is used to retrieve detailed configuration settings for product-level ad campaigns.
   * Depending on the info_type_list parameter, different types of information will be returned:
   *
   * Info type 1 (Common Info) includes:
   * - Ad type (auto or manual)
   * - Ad name and status
   * - Bidding method and placement
   * - Campaign budget and duration
   * - List of item IDs in the campaign
   *
   * Info type 2 (Manual Bidding Info) includes:
   * - Enhanced CPC setting
   * - Selected keywords with match types and bid prices
   * - Discovery ads placement settings
   *
   * Info type 3 (Auto Bidding Info) includes:
   * - ROAS (Return on Ad Spend) target
   *
   * Info type 4 (Auto Product Ads Info) includes:
   * - Product name and status
   * - Item IDs
   *
   * Use this API to analyze and understand the detailed settings of your ad campaigns,
   * which can help with optimization and decision-making for future campaign management.
   */
  async getProductLevelCampaignSettingInfo(
    params: GetProductLevelCampaignSettingInfoParams
  ): Promise<GetProductLevelCampaignSettingInfoResponse> {
    const response = await ShopeeFetch.fetch<GetProductLevelCampaignSettingInfoResponse>(
      this.config,
      "/ads/get_product_level_campaign_setting_info",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get recommended ROI target values for a product's ad campaign
   * @param {GetProductRecommendedRoiTargetParams} params Request parameters
   * @param {string} params.reference_id A random string used to prevent duplicate ads
   * @param {number} params.item_id Unique identifier for a product
   * @returns {Promise<GetProductRecommendedRoiTargetResponse>} Response containing recommended ROI targets
   *
   * This API is used to get recommended Return on Investment (ROI) target values for
   * a product's ad campaign. These recommendations help sellers set competitive ROI
   * targets for their advertising campaigns.
   *
   * The response includes three recommendation levels:
   *
   * - Lower bound: A more competitive target (e.g., value=3.5, percentile=80) that makes
   *   the ad more competitive than 80% of similar ads.
   *
   * - Exact (mid-level): A balanced target (e.g., value=5.9, percentile=50) that makes
   *   the ad more competitive than 50% of similar ads.
   *
   * - Upper bound: A less competitive target (e.g., value=10.8, percentile=20) that makes
   *   the ad more competitive than 20% of similar ads.
   *
   * Each recommendation includes:
   * - value: The recommended ROI target value
   * - percentile: Indicates how competitive this target is compared to similar ads
   *
   * Use this API to help determine optimal ROI targets for your advertising strategy
   * based on competitive marketplace data.
   */
  async getProductRecommendedRoiTarget(
    params: GetProductRecommendedRoiTargetParams
  ): Promise<GetProductRecommendedRoiTargetResponse> {
    const response = await ShopeeFetch.fetch<GetProductRecommendedRoiTargetResponse>(
      this.config,
      "/ads/get_product_recommended_roi_target",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }
}
