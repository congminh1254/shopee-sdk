// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddAllProductsToOpenCampaignRequest,
  AddAllProductsToOpenCampaignResponse,
  BatchAddProductsToOpenCampaignRequest,
  BatchAddProductsToOpenCampaignResponse,
  BatchEditProductsOpenCampaignSettingRequest,
  BatchEditProductsOpenCampaignSettingResponse,
  BatchGetProductsSuggestedRateRequest,
  BatchGetProductsSuggestedRateResponse,
  BatchRemoveProductsOpenCampaignSettingRequest,
  BatchRemoveProductsOpenCampaignSettingResponse,
  CreateNewTargetedCampaignRequest,
  CreateNewTargetedCampaignResponse,
  EditAffiliateListOfTargetedCampaignRequest,
  EditAffiliateListOfTargetedCampaignResponse,
  EditAllProductsOpenCampaignSettingRequest,
  EditAllProductsOpenCampaignSettingResponse,
  EditProductListOfTargetedCampaignRequest,
  EditProductListOfTargetedCampaignResponse,
  GetAffiliatePerformanceRequest,
  GetAffiliatePerformanceResponse,
  GetAutoAddNewProductToggleStatusRequest,
  GetAutoAddNewProductToggleStatusResponse,
  GetCampaignKeyMetricsPerformanceRequest,
  GetCampaignKeyMetricsPerformanceResponse,
  GetContentPerformanceRequest,
  GetContentPerformanceResponse,
  GetConversionReportRequest,
  GetConversionReportResponse,
  GetManagedAffiliateListRequest,
  GetManagedAffiliateListResponse,
  GetOpenCampaignAddedProductRequest,
  GetOpenCampaignAddedProductResponse,
  GetOpenCampaignBatchTaskResultRequest,
  GetOpenCampaignBatchTaskResultResponse,
  GetOpenCampaignNotAddedProductRequest,
  GetOpenCampaignNotAddedProductResponse,
  GetOpenCampaignPerformanceRequest,
  GetOpenCampaignPerformanceResponse,
  GetOptimizationSuggestionProductRequest,
  GetOptimizationSuggestionProductResponse,
  GetPerformanceDataUpdateTimeRequest,
  GetPerformanceDataUpdateTimeResponse,
  GetProductPerformanceRequest,
  GetProductPerformanceResponse,
  GetRecommendedAffiliateListRequest,
  GetRecommendedAffiliateListResponse,
  GetShopPerformanceRequest,
  GetShopPerformanceResponse,
  GetShopSuggestedRateRequest,
  GetShopSuggestedRateResponse,
  GetTargetedCampaignAddableProductListRequest,
  GetTargetedCampaignAddableProductListResponse,
  GetTargetedCampaignListRequest,
  GetTargetedCampaignListResponse,
  GetTargetedCampaignPerformanceRequest,
  GetTargetedCampaignPerformanceResponse,
  GetTargetedCampaignSettingsRequest,
  GetTargetedCampaignSettingsResponse,
  GetValidationListRequest,
  GetValidationListResponse,
  GetValidationReportRequest,
  GetValidationReportResponse,
  QueryAffiliateListRequest,
  QueryAffiliateListResponse,
  RemoveAllProductsOpenCampaignSettingRequest,
  RemoveAllProductsOpenCampaignSettingResponse,
  TerminateTargetedCampaignRequest,
  TerminateTargetedCampaignResponse,
  UpdateAutoAddNewProductSettingRequest,
  UpdateAutoAddNewProductSettingResponse,
  UpdateBasicInfoOfTargetedCampaignRequest,
  UpdateBasicInfoOfTargetedCampaignResponse,
} from "../schemas/ams.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class AmsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add all eligible products into the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_add_products_to_open_campaign by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
   *
   * @param {AddAllProductsToOpenCampaignRequest} params Request parameters
   * @returns {Promise<AddAllProductsToOpenCampaignResponse>} Promise resolving to the response
   */
  public async addAllProductsToOpenCampaign(
    params?: AddAllProductsToOpenCampaignRequest
  ): Promise<AddAllProductsToOpenCampaignResponse> {
    return ShopeeFetch.fetch<AddAllProductsToOpenCampaignResponse>(
      this.config,
      "/ams/add_all_products_to_open_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
  /**
   * Batch add products to the Open Campaign for a given list of product IDs
   *
   * @param {BatchAddProductsToOpenCampaignRequest} params Request parameters
   * @returns {Promise<BatchAddProductsToOpenCampaignResponse>} Promise resolving to the response
   */
  public async batchAddProductsToOpenCampaign(
    params?: BatchAddProductsToOpenCampaignRequest
  ): Promise<BatchAddProductsToOpenCampaignResponse> {
    return ShopeeFetch.fetch<BatchAddProductsToOpenCampaignResponse>(
      this.config,
      "/ams/batch_add_products_to_open_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
  /**
   * Batch update open campaign settings for a given list of product IDs
   *
   * @param {BatchEditProductsOpenCampaignSettingRequest} params Request parameters
   * @returns {Promise<BatchEditProductsOpenCampaignSettingResponse>} Promise resolving to the response
   */
  public async batchEditProductsOpenCampaignSetting(
    params?: BatchEditProductsOpenCampaignSettingRequest
  ): Promise<BatchEditProductsOpenCampaignSettingResponse> {
    return ShopeeFetch.fetch<BatchEditProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/batch_edit_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
  /**
   * Fetch suggested rates for a given list of product IDs
   *
   * @param {BatchGetProductsSuggestedRateRequest} params Request parameters
   * @returns {Promise<BatchGetProductsSuggestedRateResponse>} Promise resolving to the response
   */
  public async batchGetProductsSuggestedRate(
    params?: BatchGetProductsSuggestedRateRequest
  ): Promise<BatchGetProductsSuggestedRateResponse> {
    return ShopeeFetch.fetch<BatchGetProductsSuggestedRateResponse>(
      this.config,
      "/ams/batch_get_products_suggested_rate",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Batch update products from Open Campaign for a given list of product IDs
   *
   * @param {BatchRemoveProductsOpenCampaignSettingRequest} params Request parameters
   * @returns {Promise<BatchRemoveProductsOpenCampaignSettingResponse>} Promise resolving to the response
   */
  public async batchRemoveProductsOpenCampaignSetting(
    params?: BatchRemoveProductsOpenCampaignSettingRequest
  ): Promise<BatchRemoveProductsOpenCampaignSettingResponse> {
    return ShopeeFetch.fetch<BatchRemoveProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/batch_remove_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Create a new campaign with custom product & affiliate selections, and basic info filling.
   *
   * @param {CreateNewTargetedCampaignRequest} params Request parameters
   * @returns {Promise<CreateNewTargetedCampaignResponse>} Promise resolving to the response
   */
  public async createNewTargetedCampaign(
    params?: CreateNewTargetedCampaignRequest
  ): Promise<CreateNewTargetedCampaignResponse> {
    return ShopeeFetch.fetch<CreateNewTargetedCampaignResponse>(
      this.config,
      "/ams/create_new_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
  /**
   * Modify the selected affiliate list in an existing target campaign
   *
   * @param {EditAffiliateListOfTargetedCampaignRequest} params Request parameters
   * @returns {Promise<EditAffiliateListOfTargetedCampaignResponse>} Promise resolving to the response
   */
  public async editAffiliateListOfTargetedCampaign(
    params?: EditAffiliateListOfTargetedCampaignRequest
  ): Promise<EditAffiliateListOfTargetedCampaignResponse> {
    return ShopeeFetch.fetch<EditAffiliateListOfTargetedCampaignResponse>(
      this.config,
      "/ams/edit_affiliate_list_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update for all products in the Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams.batch_edit_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
   *
   * @param {EditAllProductsOpenCampaignSettingRequest} params Request parameters
   * @returns {Promise<EditAllProductsOpenCampaignSettingResponse>} Promise resolving to the response
   */
  public async editAllProductsOpenCampaignSetting(
    params?: EditAllProductsOpenCampaignSettingRequest
  ): Promise<EditAllProductsOpenCampaignSettingResponse> {
    return ShopeeFetch.fetch<EditAllProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/edit_all_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
  /**
   * Modify the selected product list in an existing target campaign
   *
   * @param {EditProductListOfTargetedCampaignRequest} params Request parameters
   * @returns {Promise<EditProductListOfTargetedCampaignResponse>} Promise resolving to the response
   */
  public async editProductListOfTargetedCampaign(
    params?: EditProductListOfTargetedCampaignRequest
  ): Promise<EditProductListOfTargetedCampaignResponse> {
    return ShopeeFetch.fetch<EditProductListOfTargetedCampaignResponse>(
      this.config,
      "/ams/edit_product_list_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Retrieve affiliate performance of the shop.
   *
   * @param {GetAffiliatePerformanceRequest} params Request parameters
   * @returns {Promise<GetAffiliatePerformanceResponse>} Promise resolving to the response
   */
  public async getAffiliatePerformance(
    params?: GetAffiliatePerformanceRequest
  ): Promise<GetAffiliatePerformanceResponse> {
    return ShopeeFetch.fetch<GetAffiliatePerformanceResponse>(
      this.config,
      "/ams/get_affiliate_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Check if auto-add new product is currently enabled
   *
   * @param {GetAutoAddNewProductToggleStatusRequest} params Request parameters
   * @returns {Promise<GetAutoAddNewProductToggleStatusResponse>} Promise resolving to the response
   */
  public async getAutoAddNewProductToggleStatus(
    params?: GetAutoAddNewProductToggleStatusRequest
  ): Promise<GetAutoAddNewProductToggleStatusResponse> {
    return ShopeeFetch.fetch<GetAutoAddNewProductToggleStatusResponse>(
      this.config,
      "/ams/get_auto_add_new_product_toggle_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve key metrics for Open and Targeted campaigns
   *
   * @param {GetCampaignKeyMetricsPerformanceRequest} params Request parameters
   * @returns {Promise<GetCampaignKeyMetricsPerformanceResponse>} Promise resolving to the response
   */
  public async getCampaignKeyMetricsPerformance(
    params?: GetCampaignKeyMetricsPerformanceRequest
  ): Promise<GetCampaignKeyMetricsPerformanceResponse> {
    return ShopeeFetch.fetch<GetCampaignKeyMetricsPerformanceResponse>(
      this.config,
      "/ams/get_campaign_key_metrics_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve content performance of the shop
   *
   * @param {GetContentPerformanceRequest} params Request parameters
   * @returns {Promise<GetContentPerformanceResponse>} Promise resolving to the response
   */
  public async getContentPerformance(
    params?: GetContentPerformanceRequest
  ): Promise<GetContentPerformanceResponse> {
    return ShopeeFetch.fetch<GetContentPerformanceResponse>(
      this.config,
      "/ams/get_content_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve the shop's conversion report with details about each order, item, affiliate, campaign.You can filter results using one or multiple time ranges, and the final result will be the intersection of these ranges. Due to data volume limitations, the maximum queryable time span is three months, etc.Maximum data can be viewed is 500 pages, please export data for more details.
   *
   * @param {GetConversionReportRequest} params Request parameters
   * @returns {Promise<GetConversionReportResponse>} Promise resolving to the response
   */
  public async getConversionReport(
    params?: GetConversionReportRequest
  ): Promise<GetConversionReportResponse> {
    return ShopeeFetch.fetch<GetConversionReportResponse>(
      this.config,
      "/ams/get_conversion_report",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "place_order_time_start",
          "place_order_time_end",
          "order_completed_time_start",
          "order_completed_time_end",
          "conversion_completed_time_start",
          "conversion_completed_time_end",
          "ams_deduction_time_start",
          "ams_deduction_time_end",
        ],
      }
    );
  }
  /**
   * Returns affiliates that are saved to managed affiliate list
   *
   * @param {GetManagedAffiliateListRequest} params Request parameters
   * @returns {Promise<GetManagedAffiliateListResponse>} Promise resolving to the response
   */
  public async getManagedAffiliateList(
    params?: GetManagedAffiliateListRequest
  ): Promise<GetManagedAffiliateListResponse> {
    return ShopeeFetch.fetch<GetManagedAffiliateListResponse>(
      this.config,
      "/ams/get_managed_affiliate_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve all products currently in the Open Campaign, including campaign status, commission rate, and promotion period
   *
   * @param {GetOpenCampaignAddedProductRequest} params Request parameters
   * @returns {Promise<GetOpenCampaignAddedProductResponse>} Promise resolving to the response
   */
  public async getOpenCampaignAddedProduct(
    params?: GetOpenCampaignAddedProductRequest
  ): Promise<GetOpenCampaignAddedProductResponse> {
    return ShopeeFetch.fetch<GetOpenCampaignAddedProductResponse>(
      this.config,
      "/ams/get_open_campaign_added_product",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.item_list.period_start_time",
          "response.item_list.period_end_time",
          "response.item_list.pending_terminated_time",
          "response.item_list.commission_protection_list.protection_period_end_time",
        ],
      }
    );
  }
  /**
   * Get open campaign batch task result
   *
   * @param {GetOpenCampaignBatchTaskResultRequest} params Request parameters
   * @returns {Promise<GetOpenCampaignBatchTaskResultResponse>} Promise resolving to the response
   */
  public async getOpenCampaignBatchTaskResult(
    params?: GetOpenCampaignBatchTaskResultRequest
  ): Promise<GetOpenCampaignBatchTaskResultResponse> {
    return ShopeeFetch.fetch<GetOpenCampaignBatchTaskResultResponse>(
      this.config,
      "/ams/get_open_campaign_batch_task_result",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve eligible products not yet added to the Open Campaign
   *
   * @param {GetOpenCampaignNotAddedProductRequest} params Request parameters
   * @returns {Promise<GetOpenCampaignNotAddedProductResponse>} Promise resolving to the response
   */
  public async getOpenCampaignNotAddedProduct(
    params?: GetOpenCampaignNotAddedProductRequest
  ): Promise<GetOpenCampaignNotAddedProductResponse> {
    return ShopeeFetch.fetch<GetOpenCampaignNotAddedProductResponse>(
      this.config,
      "/ams/get_open_campaign_not_added_product",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve all products in the Open Campaign along with performance data
   *
   * @param {GetOpenCampaignPerformanceRequest} params Request parameters
   * @returns {Promise<GetOpenCampaignPerformanceResponse>} Promise resolving to the response
   */
  public async getOpenCampaignPerformance(
    params?: GetOpenCampaignPerformanceRequest
  ): Promise<GetOpenCampaignPerformanceResponse> {
    return ShopeeFetch.fetch<GetOpenCampaignPerformanceResponse>(
      this.config,
      "/ams/get_open_campaign_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve products with suggestions to improve performance
   *
   * @param {GetOptimizationSuggestionProductRequest} params Request parameters
   * @returns {Promise<GetOptimizationSuggestionProductResponse>} Promise resolving to the response
   */
  public async getOptimizationSuggestionProduct(
    params?: GetOptimizationSuggestionProductRequest
  ): Promise<GetOptimizationSuggestionProductResponse> {
    return ShopeeFetch.fetch<GetOptimizationSuggestionProductResponse>(
      this.config,
      "/ams/get_optimization_suggestion_product",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.item_list.period_start_time",
          "response.item_list.period_end_time",
        ],
      }
    );
  }
  /**
   * Retrieve the latest date of AMS dashboard data metrics update.
   *
   * @param {GetPerformanceDataUpdateTimeRequest} params Request parameters
   * @returns {Promise<GetPerformanceDataUpdateTimeResponse>} Promise resolving to the response
   */
  public async getPerformanceDataUpdateTime(
    params?: GetPerformanceDataUpdateTimeRequest
  ): Promise<GetPerformanceDataUpdateTimeResponse> {
    return ShopeeFetch.fetch<GetPerformanceDataUpdateTimeResponse>(
      this.config,
      "/ams/get_performance_data_update_time",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve product performance of the shop.
   *
   * @param {GetProductPerformanceRequest} params Request parameters
   * @returns {Promise<GetProductPerformanceResponse>} Promise resolving to the response
   */
  public async getProductPerformance(
    params?: GetProductPerformanceRequest
  ): Promise<GetProductPerformanceResponse> {
    return ShopeeFetch.fetch<GetProductPerformanceResponse>(
      this.config,
      "/ams/get_product_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Returns top 200 recommended affiliates that can be added to a campaign
   *
   * @param {GetRecommendedAffiliateListRequest} params Request parameters
   * @returns {Promise<GetRecommendedAffiliateListResponse>} Promise resolving to the response
   */
  public async getRecommendedAffiliateList(
    params?: GetRecommendedAffiliateListRequest
  ): Promise<GetRecommendedAffiliateListResponse> {
    return ShopeeFetch.fetch<GetRecommendedAffiliateListResponse>(
      this.config,
      "/ams/get_recommended_affiliate_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve overall key metrics for all channels or specific channels.
   *
   * @param {GetShopPerformanceRequest} params Request parameters
   * @returns {Promise<GetShopPerformanceResponse>} Promise resolving to the response
   */
  public async getShopPerformance(
    params?: GetShopPerformanceRequest
  ): Promise<GetShopPerformanceResponse> {
    return ShopeeFetch.fetch<GetShopPerformanceResponse>(this.config, "/ams/get_shop_performance", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Retrieve suggested rates for all eligible products
   *
   * @param {GetShopSuggestedRateRequest} params Request parameters
   * @returns {Promise<GetShopSuggestedRateResponse>} Promise resolving to the response
   */
  public async getShopSuggestedRate(
    params?: GetShopSuggestedRateRequest
  ): Promise<GetShopSuggestedRateResponse> {
    return ShopeeFetch.fetch<GetShopSuggestedRateResponse>(
      this.config,
      "/ams/get_shop_suggested_rate",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Returns a list of products that can be added to a targeted campaign
   *
   * @param {GetTargetedCampaignAddableProductListRequest} params Request parameters
   * @returns {Promise<GetTargetedCampaignAddableProductListResponse>} Promise resolving to the response
   */
  public async getTargetedCampaignAddableProductList(
    params?: GetTargetedCampaignAddableProductListRequest
  ): Promise<GetTargetedCampaignAddableProductListResponse> {
    return ShopeeFetch.fetch<GetTargetedCampaignAddableProductListResponse>(
      this.config,
      "/ams/get_targeted_campaign_addable_product_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieve all current targeted campaigns created by the seller
   *
   * @param {GetTargetedCampaignListRequest} params Request parameters
   * @returns {Promise<GetTargetedCampaignListResponse>} Promise resolving to the response
   */
  public async getTargetedCampaignList(
    params?: GetTargetedCampaignListRequest
  ): Promise<GetTargetedCampaignListResponse> {
    return ShopeeFetch.fetch<GetTargetedCampaignListResponse>(
      this.config,
      "/ams/get_targeted_campaign_list",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "period_start_time",
          "period_end_time",
          "response.campaign_list.period_start_time",
          "response.campaign_list.period_end_time",
          "response.campaign_list.last_edit_time",
        ],
      }
    );
  }
  /**
   * Retrieve a list of Targeted Campaigns and their performance data
   *
   * @param {GetTargetedCampaignPerformanceRequest} params Request parameters
   * @returns {Promise<GetTargetedCampaignPerformanceResponse>} Promise resolving to the response
   */
  public async getTargetedCampaignPerformance(
    params?: GetTargetedCampaignPerformanceRequest
  ): Promise<GetTargetedCampaignPerformanceResponse> {
    return ShopeeFetch.fetch<GetTargetedCampaignPerformanceResponse>(
      this.config,
      "/ams/get_targeted_campaign_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * For each campaign, return: campaign basic info (name, status, promotion period, message), selected product list (with product name & ID), selected affiliate list (with affiliate names)
   *
   * @param {GetTargetedCampaignSettingsRequest} params Request parameters
   * @returns {Promise<GetTargetedCampaignSettingsResponse>} Promise resolving to the response
   */
  public async getTargetedCampaignSettings(
    params?: GetTargetedCampaignSettingsRequest
  ): Promise<GetTargetedCampaignSettingsResponse> {
    return ShopeeFetch.fetch<GetTargetedCampaignSettingsResponse>(
      this.config,
      "/ams/get_targeted_campaign_settings",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.period_start_time",
          "response.period_end_time",
          "response.pending_terminated_time",
          "response.item_list.commission_protection_list.protection_period_end_time",
        ],
      }
    );
  }
  /**
   * Retrieve the seller's AMS validation bill
   *
   * @param {GetValidationListRequest} params Request parameters
   * @returns {Promise<GetValidationListResponse>} Promise resolving to the response
   */
  public async getValidationList(
    params?: GetValidationListRequest
  ): Promise<GetValidationListResponse> {
    return ShopeeFetch.fetch<GetValidationListResponse>(this.config, "/ams/get_validation_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Retrieve detailed information for a specific validation bill
   *
   * @param {GetValidationReportRequest} params Request parameters
   * @returns {Promise<GetValidationReportResponse>} Promise resolving to the response
   */
  public async getValidationReport(
    params?: GetValidationReportRequest
  ): Promise<GetValidationReportResponse> {
    return ShopeeFetch.fetch<GetValidationReportResponse>(
      this.config,
      "/ams/get_validation_report",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["place_order_time_start", "place_order_time_end"],
      }
    );
  }
  /**
   * Retrieve affiliate information by affiliate id.
   *
   * @param {QueryAffiliateListRequest} params Request parameters
   * @returns {Promise<QueryAffiliateListResponse>} Promise resolving to the response
   */
  public async queryAffiliateList(
    params?: QueryAffiliateListRequest
  ): Promise<QueryAffiliateListResponse> {
    return ShopeeFetch.fetch<QueryAffiliateListResponse>(this.config, "/ams/query_affiliate_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Remove the entire product list of Open Campaign. We will only return the general error that caused the whole task failure, without returning the specific error for each product in the v2.ams.get_open_campaign_batch_task_result API. If you want to get the result for each products, you can use v2.ams. batch_remove_products_open_campaign_setting by pagination manually, or check the product status by using the GET API after the task progress turn to 100%.
   *
   * @param {RemoveAllProductsOpenCampaignSettingRequest} params Request parameters
   * @returns {Promise<RemoveAllProductsOpenCampaignSettingResponse>} Promise resolving to the response
   */
  public async removeAllProductsOpenCampaignSetting(
    params?: RemoveAllProductsOpenCampaignSettingRequest
  ): Promise<RemoveAllProductsOpenCampaignSettingResponse> {
    return ShopeeFetch.fetch<RemoveAllProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/remove_all_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Change target campaign status to "terminated" to stop all affiliate promotion activity
   *
   * @param {TerminateTargetedCampaignRequest} params Request parameters
   * @returns {Promise<TerminateTargetedCampaignResponse>} Promise resolving to the response
   */
  public async terminateTargetedCampaign(
    params?: TerminateTargetedCampaignRequest
  ): Promise<TerminateTargetedCampaignResponse> {
    return ShopeeFetch.fetch<TerminateTargetedCampaignResponse>(
      this.config,
      "/ams/terminate_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Change auto-add toggle and default commission rate setting
   *
   * @param {UpdateAutoAddNewProductSettingRequest} params Request parameters
   * @returns {Promise<UpdateAutoAddNewProductSettingResponse>} Promise resolving to the response
   */
  public async updateAutoAddNewProductSetting(
    params?: UpdateAutoAddNewProductSettingRequest
  ): Promise<UpdateAutoAddNewProductSettingResponse> {
    return ShopeeFetch.fetch<UpdateAutoAddNewProductSettingResponse>(
      this.config,
      "/ams/update_auto_add_new_product_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Edit campaign name, promotion period, message, and budget (if the shop is whitelisted) of target campaign
   *
   * @param {UpdateBasicInfoOfTargetedCampaignRequest} params Request parameters
   * @returns {Promise<UpdateBasicInfoOfTargetedCampaignResponse>} Promise resolving to the response
   */
  public async updateBasicInfoOfTargetedCampaign(
    params?: UpdateBasicInfoOfTargetedCampaignRequest
  ): Promise<UpdateBasicInfoOfTargetedCampaignResponse> {
    return ShopeeFetch.fetch<UpdateBasicInfoOfTargetedCampaignResponse>(
      this.config,
      "/ams/update_basic_info_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["period_start_time", "period_end_time"],
      }
    );
  }
}
