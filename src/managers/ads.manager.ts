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
export class AdsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Check the seller's eligibility in creating a GMS campaign
   *
   * @param {CheckCreateGmsProductCampaignEligibilityRequest} params Request parameters
   * @returns {Promise<CheckCreateGmsProductCampaignEligibilityResponse>} Promise resolving to the response
   */
  public async checkCreateGmsProductCampaignEligibility(
    params?: CheckCreateGmsProductCampaignEligibilityRequest
  ): Promise<CheckCreateGmsProductCampaignEligibilityResponse> {
    return ShopeeFetch.fetch<CheckCreateGmsProductCampaignEligibilityResponse>(
      this.config,
      "/ads/check_create_gms_product_campaign_eligibility",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to create Auto Product Ads
   *
   * @param {CreateAutoProductAdsRequest} params Request parameters
   * @returns {Promise<CreateAutoProductAdsResponse>} Promise resolving to the response
   */
  public async createAutoProductAds(
    params?: CreateAutoProductAdsRequest
  ): Promise<CreateAutoProductAdsResponse> {
    return ShopeeFetch.fetch<CreateAutoProductAdsResponse>(
      this.config,
      "/ads/create_auto_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Create a GMS campaign
   *
   * @param {CreateGmsProductCampaignRequest} params Request parameters
   * @returns {Promise<CreateGmsProductCampaignResponse>} Promise resolving to the response
   */
  public async createGmsProductCampaign(
    params?: CreateGmsProductCampaignRequest
  ): Promise<CreateGmsProductCampaignResponse> {
    return ShopeeFetch.fetch<CreateGmsProductCampaignResponse>(
      this.config,
      "/ads/create_gms_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to create Manual Selection Product Ads
   *
   * @param {CreateManualProductAdsRequest} params Request parameters
   * @returns {Promise<CreateManualProductAdsResponse>} Promise resolving to the response
   */
  public async createManualProductAds(
    params?: CreateManualProductAdsRequest
  ): Promise<CreateManualProductAdsResponse> {
    return ShopeeFetch.fetch<CreateManualProductAdsResponse>(
      this.config,
      "/ads/create_manual_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to edit Auto Product Ads
   *
   * @param {EditAutoProductAdsRequest} params Request parameters
   * @returns {Promise<EditAutoProductAdsResponse>} Promise resolving to the response
   */
  public async editAutoProductAds(
    params?: EditAutoProductAdsRequest
  ): Promise<EditAutoProductAdsResponse> {
    return ShopeeFetch.fetch<EditAutoProductAdsResponse>(
      this.config,
      "/ads/edit_auto_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Add/remove items to/from the GMS Campaign
   *
   * @param {EditGmsItemProductCampaignRequest} params Request parameters
   * @returns {Promise<EditGmsItemProductCampaignResponse>} Promise resolving to the response
   */
  public async editGmsItemProductCampaign(
    params?: EditGmsItemProductCampaignRequest
  ): Promise<EditGmsItemProductCampaignResponse> {
    return ShopeeFetch.fetch<EditGmsItemProductCampaignResponse>(
      this.config,
      "/ads/edit_gms_item_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Edit a GMS campaign
   *
   * @param {EditGmsProductCampaignRequest} params Request parameters
   * @returns {Promise<EditGmsProductCampaignResponse>} Promise resolving to the response
   */
  public async editGmsProductCampaign(
    params?: EditGmsProductCampaignRequest
  ): Promise<EditGmsProductCampaignResponse> {
    return ShopeeFetch.fetch<EditGmsProductCampaignResponse>(
      this.config,
      "/ads/edit_gms_product_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to edit Manual Selection Product Ad Keywords
   *
   * @param {EditManualProductAdKeywordsRequest} params Request parameters
   * @returns {Promise<EditManualProductAdKeywordsResponse>} Promise resolving to the response
   */
  public async editManualProductAdKeywords(
    params?: EditManualProductAdKeywordsRequest
  ): Promise<EditManualProductAdKeywordsResponse> {
    return ShopeeFetch.fetch<EditManualProductAdKeywordsResponse>(
      this.config,
      "/ads/edit_manual_product_ad_keywords",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to edit Manual Selection Product Ads
   *
   * @param {EditManualProductAdsRequest} params Request parameters
   * @returns {Promise<EditManualProductAdsResponse>} Promise resolving to the response
   */
  public async editManualProductAds(
    params?: EditManualProductAdsRequest
  ): Promise<EditManualProductAdsResponse> {
    return ShopeeFetch.fetch<EditManualProductAdsResponse>(
      this.config,
      "/ads/edit_manual_product_ads",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get shop rate for Ads Facil Program
   *
   * @param {GetAdsFacilShopRateRequest} params Request parameters
   * @returns {Promise<GetAdsFacilShopRateResponse>} Promise resolving to the response
   */
  public async getAdsFacilShopRate(
    params?: GetAdsFacilShopRateRequest
  ): Promise<GetAdsFacilShopRateResponse> {
    return ShopeeFetch.fetch<GetAdsFacilShopRateResponse>(
      this.config,
      "/ads/get_ads_facil_shop_rate",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get Shop level CPC ads multiple-days daily performance.
   *
   * @param {GetAllCpcAdsDailyPerformanceRequest} params Request parameters
   * @returns {Promise<GetAllCpcAdsDailyPerformanceResponse>} Promise resolving to the response
   */
  public async getAllCpcAdsDailyPerformance(
    params?: GetAllCpcAdsDailyPerformanceRequest
  ): Promise<GetAllCpcAdsDailyPerformanceResponse> {
    return ShopeeFetch.fetch<GetAllCpcAdsDailyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_daily_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get Shop level CPC ads single-date hourly performance.
   *
   * @param {GetAllCpcAdsHourlyPerformanceRequest} params Request parameters
   * @returns {Promise<GetAllCpcAdsHourlyPerformanceResponse>} Promise resolving to the response
   */
  public async getAllCpcAdsHourlyPerformance(
    params?: GetAllCpcAdsHourlyPerformanceRequest
  ): Promise<GetAllCpcAdsHourlyPerformanceResponse> {
    return ShopeeFetch.fetch<GetAllCpcAdsHourlyPerformanceResponse>(
      this.config,
      "/ads/get_all_cpc_ads_hourly_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Call this API to get budget suggestion for product ads creation
   *
   * @param {GetCreateProductAdBudgetSuggestionRequest} params Request parameters
   * @returns {Promise<GetCreateProductAdBudgetSuggestionResponse>} Promise resolving to the response
   */
  public async getCreateProductAdBudgetSuggestion(
    params?: GetCreateProductAdBudgetSuggestionRequest
  ): Promise<GetCreateProductAdBudgetSuggestionResponse> {
    return ShopeeFetch.fetch<GetCreateProductAdBudgetSuggestionResponse>(
      this.config,
      "/ads/get_create_product_ad_budget_suggestion",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get GMS Campaign performance
   *
   * @param {GetGmsCampaignPerformanceRequest} params Request parameters
   * @returns {Promise<GetGmsCampaignPerformanceResponse>} Promise resolving to the response
   */
  public async getGmsCampaignPerformance(
    params?: GetGmsCampaignPerformanceRequest
  ): Promise<GetGmsCampaignPerformanceResponse> {
    return ShopeeFetch.fetch<GetGmsCampaignPerformanceResponse>(
      this.config,
      "/ads/get_gms_campaign_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get GMS Item performance
   * 1. The response returned is sorted by item_id
   * 2. Only items with performance will be returned
   *
   * @param {GetGmsItemPerformanceRequest} params Request parameters
   * @returns {Promise<GetGmsItemPerformanceResponse>} Promise resolving to the response
   */
  public async getGmsItemPerformance(
    params?: GetGmsItemPerformanceRequest
  ): Promise<GetGmsItemPerformanceResponse> {
    return ShopeeFetch.fetch<GetGmsItemPerformanceResponse>(
      this.config,
      "/ads/get_gms_item_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to get Product level ads multiple-days daily performance.
   *
   * @param {GetProductCampaignDailyPerformanceRequest} params Request parameters
   * @returns {Promise<GetProductCampaignDailyPerformanceResponse>} Promise resolving to the response
   */
  public async getProductCampaignDailyPerformance(
    params?: GetProductCampaignDailyPerformanceRequest
  ): Promise<GetProductCampaignDailyPerformanceResponse> {
    return ShopeeFetch.fetch<GetProductCampaignDailyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_daily_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get Product level ads single-day hourly performance.
   *
   * @param {GetProductCampaignHourlyPerformanceRequest} params Request parameters
   * @returns {Promise<GetProductCampaignHourlyPerformanceResponse>} Promise resolving to the response
   */
  public async getProductCampaignHourlyPerformance(
    params?: GetProductCampaignHourlyPerformanceRequest
  ): Promise<GetProductCampaignHourlyPerformanceResponse> {
    return ShopeeFetch.fetch<GetProductCampaignHourlyPerformanceResponse>(
      this.config,
      "/ads/get_product_campaign_hourly_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Call this API to fetch all the product campaign ids displayed on advertiser platform under a specific Shop
   *
   * @param {GetProductLevelCampaignIdListRequest} params Request parameters
   * @returns {Promise<GetProductLevelCampaignIdListResponse>} Promise resolving to the response
   */
  public async getProductLevelCampaignIdList(
    params?: GetProductLevelCampaignIdListRequest
  ): Promise<GetProductLevelCampaignIdListResponse> {
    return ShopeeFetch.fetch<GetProductLevelCampaignIdListResponse>(
      this.config,
      "/ads/get_product_level_campaign_id_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Call this API to fetch all the campaign setting info under this Shop.
   *
   * @param {GetProductLevelCampaignSettingInfoRequest} params Request parameters
   * @returns {Promise<GetProductLevelCampaignSettingInfoResponse>} Promise resolving to the response
   */
  public async getProductLevelCampaignSettingInfo(
    params?: GetProductLevelCampaignSettingInfoRequest
  ): Promise<GetProductLevelCampaignSettingInfoResponse> {
    return ShopeeFetch.fetch<GetProductLevelCampaignSettingInfoResponse>(
      this.config,
      "/ads/get_product_level_campaign_setting_info",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get Product Recommended ROI Target
   *
   * @param {GetProductRecommendedRoiTargetRequest} params Request parameters
   * @returns {Promise<GetProductRecommendedRoiTargetResponse>} Promise resolving to the response
   */
  public async getProductRecommendedRoiTarget(
    params?: GetProductRecommendedRoiTargetRequest
  ): Promise<GetProductRecommendedRoiTargetResponse> {
    return ShopeeFetch.fetch<GetProductRecommendedRoiTargetResponse>(
      this.config,
      "/ads/get_product_recommended_roi_target",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get the list of recommended SKU (Shop level) with the corresponding tag, i.e top search/best selling/best ROI tag.
   *
   * @param {GetRecommendedItemListRequest} params Request parameters
   * @returns {Promise<GetRecommendedItemListResponse>} Promise resolving to the response
   */
  public async getRecommendedItemList(
    params?: GetRecommendedItemListRequest
  ): Promise<GetRecommendedItemListResponse> {
    return ShopeeFetch.fetch<GetRecommendedItemListResponse>(
      this.config,
      "/ads/get_recommended_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get the list of Recommended keywords by item and optionally a search keyword
   *
   * @param {GetRecommendedKeywordListRequest} params Request parameters
   * @returns {Promise<GetRecommendedKeywordListResponse>} Promise resolving to the response
   */
  public async getRecommendedKeywordList(
    params?: GetRecommendedKeywordListRequest
  ): Promise<GetRecommendedKeywordListResponse> {
    return ShopeeFetch.fetch<GetRecommendedKeywordListResponse>(
      this.config,
      "/ads/get_recommended_keyword_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get Shop level info - i.e. seller's toggle status is on/off
   *
   * @param {GetShopToggleInfoRequest} params Request parameters
   * @returns {Promise<GetShopToggleInfoResponse>} Promise resolving to the response
   */
  public async getShopToggleInfo(
    params?: GetShopToggleInfoRequest
  ): Promise<GetShopToggleInfoResponse> {
    return ShopeeFetch.fetch<GetShopToggleInfoResponse>(this.config, "/ads/get_shop_toggle_info", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.data_timestamp"],
    });
  }
  /**
   * Use this API to return the seller's Real-time total balance of their ads credit including the paid credits and free credits.
   *
   * @param {GetTotalBalanceRequest} params Request parameters
   * @returns {Promise<GetTotalBalanceResponse>} Promise resolving to the response
   */
  public async getTotalBalance(params?: GetTotalBalanceRequest): Promise<GetTotalBalanceResponse> {
    return ShopeeFetch.fetch<GetTotalBalanceResponse>(this.config, "/ads/get_total_balance", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.data_timestamp"],
    });
  }
  /**
   * List GMS items that have been removed from the Campaign by seller
   *
   * @param {ListGmsUserDeletedItemRequest} params Request parameters
   * @returns {Promise<ListGmsUserDeletedItemResponse>} Promise resolving to the response
   */
  public async listGmsUserDeletedItem(
    params?: ListGmsUserDeletedItemRequest
  ): Promise<ListGmsUserDeletedItemResponse> {
    return ShopeeFetch.fetch<ListGmsUserDeletedItemResponse>(
      this.config,
      "/ads/list_gms_user_deleted_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
