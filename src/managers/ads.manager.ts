// NOTE: This file is auto-generated. Do not edit directly.

import {
  CheckCreateGmsProductCampaignEligibilityRequest,
  CheckCreateGmsProductCampaignEligibilityResponse,
  CreateAutoProductAdsRequest,
  CreateAutoProductAdsResponse,
  CreateGmsProductCampaignRequest,
  CreateGmsProductCampaignResponse,
  CreateManualProductAdsRequest,
  CreateManualProductAdsResponse,
  EditAutoProductAdsRequest,
  EditAutoProductAdsResponse,
  EditGmsItemProductCampaignRequest,
  EditGmsItemProductCampaignResponse,
  EditGmsProductCampaignRequest,
  EditGmsProductCampaignResponse,
  EditManualProductAdKeywordsRequest,
  EditManualProductAdKeywordsResponse,
  EditManualProductAdsRequest,
  EditManualProductAdsResponse,
  GetAdsFacilShopRateRequest,
  GetAdsFacilShopRateResponse,
  GetAllCpcAdsDailyPerformanceRequest,
  GetAllCpcAdsDailyPerformanceResponse,
  GetAllCpcAdsHourlyPerformanceRequest,
  GetAllCpcAdsHourlyPerformanceResponse,
  GetCreateProductAdBudgetSuggestionRequest,
  GetCreateProductAdBudgetSuggestionResponse,
  GetGmsCampaignPerformanceRequest,
  GetGmsCampaignPerformanceResponse,
  GetGmsItemPerformanceRequest,
  GetGmsItemPerformanceResponse,
  GetProductCampaignDailyPerformanceRequest,
  GetProductCampaignDailyPerformanceResponse,
  GetProductCampaignHourlyPerformanceRequest,
  GetProductCampaignHourlyPerformanceResponse,
  GetProductLevelCampaignIdListRequest,
  GetProductLevelCampaignIdListResponse,
  GetProductLevelCampaignSettingInfoRequest,
  GetProductLevelCampaignSettingInfoResponse,
  GetProductRecommendedRoiTargetRequest,
  GetProductRecommendedRoiTargetResponse,
  GetRecommendedItemListRequest,
  GetRecommendedItemListResponse,
  GetRecommendedKeywordListRequest,
  GetRecommendedKeywordListResponse,
  GetShopToggleInfoRequest,
  GetShopToggleInfoResponse,
  GetTotalBalanceRequest,
  GetTotalBalanceResponse,
  ListGmsUserDeletedItemRequest,
  ListGmsUserDeletedItemResponse,
} from "../schemas/ads.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class AdsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Check the seller's eligibility in creating a GMS campaign
   *
   * @param {CheckCreateGmsProductCampaignEligibilityRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CheckCreateGmsProductCampaignEligibilityResponse>} Promise resolving to the response
   */
  public async checkCreateGmsProductCampaignEligibility(
    params?: CheckCreateGmsProductCampaignEligibilityRequest,
    options?: RequestOptions
  ): Promise<CheckCreateGmsProductCampaignEligibilityResponse> {
    return ShopeeFetch.fetch<CheckCreateGmsProductCampaignEligibilityResponse>(
      this.config,
      "/ads/check_create_gms_product_campaign_eligibility",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to create Auto Product Ads
   *
   * @param {CreateAutoProductAdsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CreateAutoProductAdsResponse>} Promise resolving to the response
   */
  public async createAutoProductAds(
    params: CreateAutoProductAdsRequest,
    options?: RequestOptions
  ): Promise<CreateAutoProductAdsResponse> {
    return ShopeeFetch.fetch<CreateAutoProductAdsResponse>(
      this.config,
      "/ads/create_auto_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Create a GMS campaign
   *
   * @param {CreateGmsProductCampaignRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CreateGmsProductCampaignResponse>} Promise resolving to the response
   */
  public async createGmsProductCampaign(
    params: CreateGmsProductCampaignRequest,
    options?: RequestOptions
  ): Promise<CreateGmsProductCampaignResponse> {
    return ShopeeFetch.fetch<CreateGmsProductCampaignResponse>(
      this.config,
      "/ads/create_gms_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to create Manual Selection Product Ads
   *
   * @param {CreateManualProductAdsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CreateManualProductAdsResponse>} Promise resolving to the response
   */
  public async createManualProductAds(
    params: CreateManualProductAdsRequest,
    options?: RequestOptions
  ): Promise<CreateManualProductAdsResponse> {
    return ShopeeFetch.fetch<CreateManualProductAdsResponse>(
      this.config,
      "/ads/create_manual_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to edit Auto Product Ads
   *
   * @param {EditAutoProductAdsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditAutoProductAdsResponse>} Promise resolving to the response
   */
  public async editAutoProductAds(
    params: EditAutoProductAdsRequest,
    options?: RequestOptions
  ): Promise<EditAutoProductAdsResponse> {
    return ShopeeFetch.fetch<EditAutoProductAdsResponse>(
      this.config,
      "/ads/edit_auto_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Add/remove items to/from the GMS Campaign
   *
   * @param {EditGmsItemProductCampaignRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditGmsItemProductCampaignResponse>} Promise resolving to the response
   */
  public async editGmsItemProductCampaign(
    params: EditGmsItemProductCampaignRequest,
    options?: RequestOptions
  ): Promise<EditGmsItemProductCampaignResponse> {
    return ShopeeFetch.fetch<EditGmsItemProductCampaignResponse>(
      this.config,
      "/ads/edit_gms_item_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Edit a GMS campaign
   *
   * @param {EditGmsProductCampaignRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditGmsProductCampaignResponse>} Promise resolving to the response
   */
  public async editGmsProductCampaign(
    params: EditGmsProductCampaignRequest,
    options?: RequestOptions
  ): Promise<EditGmsProductCampaignResponse> {
    return ShopeeFetch.fetch<EditGmsProductCampaignResponse>(
      this.config,
      "/ads/edit_gms_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to edit Manual Selection Product Ad Keywords
   *
   * @param {EditManualProductAdKeywordsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditManualProductAdKeywordsResponse>} Promise resolving to the response
   */
  public async editManualProductAdKeywords(
    params: EditManualProductAdKeywordsRequest,
    options?: RequestOptions
  ): Promise<EditManualProductAdKeywordsResponse> {
    return ShopeeFetch.fetch<EditManualProductAdKeywordsResponse>(
      this.config,
      "/ads/edit_manual_product_ad_keywords",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to edit Manual Selection Product Ads
   *
   * @param {EditManualProductAdsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditManualProductAdsResponse>} Promise resolving to the response
   */
  public async editManualProductAds(
    params: EditManualProductAdsRequest,
    options?: RequestOptions
  ): Promise<EditManualProductAdsResponse> {
    return ShopeeFetch.fetch<EditManualProductAdsResponse>(
      this.config,
      "/ads/edit_manual_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get shop rate for Ads Facil Program
   *
   * @param {GetAdsFacilShopRateRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAdsFacilShopRateResponse>} Promise resolving to the response
   */
  public async getAdsFacilShopRate(
    params?: GetAdsFacilShopRateRequest,
    options?: RequestOptions
  ): Promise<GetAdsFacilShopRateResponse> {
    return ShopeeFetch.fetch<GetAdsFacilShopRateResponse>(
      this.config,
      "/ads/get_ads_facil_shop_rate",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get Shop level CPC ads multiple-days daily performance.
   *
   * @param {GetAllCpcAdsDailyPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAllCpcAdsDailyPerformanceResponse>} Promise resolving to the response
   */
  public async getAllCpcAdsDailyPerformance(
    params: GetAllCpcAdsDailyPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetAllCpcAdsDailyPerformanceResponse> {
    return ShopeeFetch.fetch<GetAllCpcAdsDailyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_daily_performance",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get Shop level CPC ads single-date hourly performance.
   *
   * @param {GetAllCpcAdsHourlyPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAllCpcAdsHourlyPerformanceResponse>} Promise resolving to the response
   */
  public async getAllCpcAdsHourlyPerformance(
    params: GetAllCpcAdsHourlyPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetAllCpcAdsHourlyPerformanceResponse> {
    return ShopeeFetch.fetch<GetAllCpcAdsHourlyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_hourly_performance",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Call this API to get budget suggestion for product ads creation
   *
   * @param {GetCreateProductAdBudgetSuggestionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetCreateProductAdBudgetSuggestionResponse>} Promise resolving to the response
   */
  public async getCreateProductAdBudgetSuggestion(
    params: GetCreateProductAdBudgetSuggestionRequest,
    options?: RequestOptions
  ): Promise<GetCreateProductAdBudgetSuggestionResponse> {
    return ShopeeFetch.fetch<GetCreateProductAdBudgetSuggestionResponse>(
      this.config,
      "/ads/get_create_product_ad_budget_suggestion",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get GMS Campaign performance
   *
   * @param {GetGmsCampaignPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetGmsCampaignPerformanceResponse>} Promise resolving to the response
   */
  public async getGmsCampaignPerformance(
    params: GetGmsCampaignPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetGmsCampaignPerformanceResponse> {
    return ShopeeFetch.fetch<GetGmsCampaignPerformanceResponse>(
      this.config,
      "/ads/get_gms_campaign_performance",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get GMS Item performance
   * 1. The response returned is sorted by item_id
   * 2. Only items with performance will be returned
   *
   * @param {GetGmsItemPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetGmsItemPerformanceResponse>} Promise resolving to the response
   */
  public async getGmsItemPerformance(
    params: GetGmsItemPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetGmsItemPerformanceResponse> {
    return ShopeeFetch.fetch<GetGmsItemPerformanceResponse>(
      this.config,
      "/ads/get_gms_item_performance",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get Product level ads multiple-days daily performance.
   *
   * @param {GetProductCampaignDailyPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductCampaignDailyPerformanceResponse>} Promise resolving to the response
   */
  public async getProductCampaignDailyPerformance(
    params: GetProductCampaignDailyPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetProductCampaignDailyPerformanceResponse> {
    return ShopeeFetch.fetch<GetProductCampaignDailyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_daily_performance",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get Product level ads single-day hourly performance.
   *
   * @param {GetProductCampaignHourlyPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductCampaignHourlyPerformanceResponse>} Promise resolving to the response
   */
  public async getProductCampaignHourlyPerformance(
    params: GetProductCampaignHourlyPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetProductCampaignHourlyPerformanceResponse> {
    return ShopeeFetch.fetch<GetProductCampaignHourlyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_hourly_performance",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Call this API to fetch all the product campaign ids displayed on advertiser platform under a specific Shop
   *
   * @param {GetProductLevelCampaignIdListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductLevelCampaignIdListResponse>} Promise resolving to the response
   */
  public async getProductLevelCampaignIdList(
    params?: GetProductLevelCampaignIdListRequest,
    options?: RequestOptions
  ): Promise<GetProductLevelCampaignIdListResponse> {
    return ShopeeFetch.fetch<GetProductLevelCampaignIdListResponse>(
      this.config,
      "/ads/get_product_level_campaign_id_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Call this API to fetch all the campaign setting info under this Shop.
   *
   * @param {GetProductLevelCampaignSettingInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductLevelCampaignSettingInfoResponse>} Promise resolving to the response
   */
  public async getProductLevelCampaignSettingInfo(
    params: GetProductLevelCampaignSettingInfoRequest,
    options?: RequestOptions
  ): Promise<GetProductLevelCampaignSettingInfoResponse> {
    return ShopeeFetch.fetch<GetProductLevelCampaignSettingInfoResponse>(
      this.config,
      "/ads/get_product_level_campaign_setting_info",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get Product Recommended ROI Target
   *
   * @param {GetProductRecommendedRoiTargetRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductRecommendedRoiTargetResponse>} Promise resolving to the response
   */
  public async getProductRecommendedRoiTarget(
    params: GetProductRecommendedRoiTargetRequest,
    options?: RequestOptions
  ): Promise<GetProductRecommendedRoiTargetResponse> {
    return ShopeeFetch.fetch<GetProductRecommendedRoiTargetResponse>(
      this.config,
      "/ads/get_product_recommended_roi_target",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get the list of recommended SKU (Shop level) with the corresponding tag, i.e top search/best selling/best ROI tag.
   *
   * @param {GetRecommendedItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetRecommendedItemListResponse>} Promise resolving to the response
   */
  public async getRecommendedItemList(
    params?: GetRecommendedItemListRequest,
    options?: RequestOptions
  ): Promise<GetRecommendedItemListResponse> {
    return ShopeeFetch.fetch<GetRecommendedItemListResponse>(
      this.config,
      "/ads/get_recommended_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get the list of Recommended keywords by item and optionally a search keyword
   *
   * @param {GetRecommendedKeywordListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetRecommendedKeywordListResponse>} Promise resolving to the response
   */
  public async getRecommendedKeywordList(
    params: GetRecommendedKeywordListRequest,
    options?: RequestOptions
  ): Promise<GetRecommendedKeywordListResponse> {
    return ShopeeFetch.fetch<GetRecommendedKeywordListResponse>(
      this.config,
      "/ads/get_recommended_keyword_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to get Shop level info - i.e. seller's toggle status is on/off
   *
   * @param {GetShopToggleInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetShopToggleInfoResponse>} Promise resolving to the response
   */
  public async getShopToggleInfo(
    params?: GetShopToggleInfoRequest,
    options?: RequestOptions
  ): Promise<GetShopToggleInfoResponse> {
    return ShopeeFetch.fetch<GetShopToggleInfoResponse>(this.config, "/ads/get_shop_toggle_info", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: ["response.data_timestamp"],
    });
  }
  /**
   * Use this API to return the seller's Real-time total balance of their ads credit including the paid credits and free credits.
   *
   * @param {GetTotalBalanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetTotalBalanceResponse>} Promise resolving to the response
   */
  public async getTotalBalance(
    params?: GetTotalBalanceRequest,
    options?: RequestOptions
  ): Promise<GetTotalBalanceResponse> {
    return ShopeeFetch.fetch<GetTotalBalanceResponse>(this.config, "/ads/get_total_balance", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: ["response.data_timestamp"],
    });
  }
  /**
   * List GMS items that have been removed from the Campaign by seller
   *
   * @param {ListGmsUserDeletedItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ListGmsUserDeletedItemResponse>} Promise resolving to the response
   */
  public async listGmsUserDeletedItem(
    params?: ListGmsUserDeletedItemRequest,
    options?: RequestOptions
  ): Promise<ListGmsUserDeletedItemResponse> {
    return ShopeeFetch.fetch<ListGmsUserDeletedItemResponse>(
      this.config,
      "/ads/list_gms_user_deleted_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
