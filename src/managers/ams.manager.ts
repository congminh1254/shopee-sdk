import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import {
  AddAllProductsToOpenCampaignParams,
  AddAllProductsToOpenCampaignResponse,
  BatchAddProductsToOpenCampaignParams,
  BatchAddProductsToOpenCampaignResponse,
  BatchEditProductsOpenCampaignSettingParams,
  BatchEditProductsOpenCampaignSettingResponse,
  BatchGetProductsSuggestedRateParams,
  BatchGetProductsSuggestedRateResponse,
  BatchRemoveProductsOpenCampaignSettingParams,
  BatchRemoveProductsOpenCampaignSettingResponse,
  CreateNewTargetedCampaignParams,
  CreateNewTargetedCampaignResponse,
  EditAffiliateListOfTargetedCampaignParams,
  EditAffiliateListOfTargetedCampaignResponse,
  EditAllProductsOpenCampaignSettingParams,
  EditAllProductsOpenCampaignSettingResponse,
  EditProductListOfTargetedCampaignParams,
  EditProductListOfTargetedCampaignResponse,
  GetAffiliatePerformanceParams,
  GetAffiliatePerformanceResponse,
  GetAutoAddNewProductToggleStatusResponse,
  GetCampaignKeyMetricsPerformanceParams,
  GetCampaignKeyMetricsPerformanceResponse,
  GetContentPerformanceParams,
  GetContentPerformanceResponse,
  GetConversionReportParams,
  GetConversionReportResponse,
  GetManagedAffiliateListParams,
  GetManagedAffiliateListResponse,
  GetOpenCampaignAddedProductParams,
  GetOpenCampaignAddedProductResponse,
  GetOpenCampaignBatchTaskResultParams,
  GetOpenCampaignBatchTaskResultResponse,
  GetOpenCampaignNotAddedProductParams,
  GetOpenCampaignNotAddedProductResponse,
  GetOpenCampaignPerformanceParams,
  GetOpenCampaignPerformanceResponse,
  GetOptimizationSuggestionProductParams,
  GetOptimizationSuggestionProductResponse,
  GetPerformanceDataUpdateTimeParams,
  GetPerformanceDataUpdateTimeResponse,
  GetProductPerformanceParams,
  GetProductPerformanceResponse,
  GetRecommendedAffiliateListParams,
  GetRecommendedAffiliateListResponse,
  AmsGetShopPerformanceParams,
  AmsGetShopPerformanceResponse,
  GetShopSuggestedRateResponse,
  GetTargetedCampaignAddableProductListParams,
  GetTargetedCampaignAddableProductListResponse,
  GetTargetedCampaignListParams,
  GetTargetedCampaignListResponse,
  GetTargetedCampaignPerformanceParams,
  GetTargetedCampaignPerformanceResponse,
  GetTargetedCampaignSettingsParams,
  GetTargetedCampaignSettingsResponse,
  GetValidationListResponse,
  GetValidationReportParams,
  GetValidationReportResponse,
  QueryAffiliateListParams,
  QueryAffiliateListResponse,
  RemoveAllProductsOpenCampaignSettingResponse,
  TerminateTargetedCampaignParams,
  TerminateTargetedCampaignResponse,
  UpdateAutoAddNewProductSettingParams,
  UpdateAutoAddNewProductSettingResponse,
  UpdateBasicInfoOfTargetedCampaignParams,
  UpdateBasicInfoOfTargetedCampaignResponse,
} from "../schemas/ams.js";

/**
 * AMS (Affiliate Marketing Solution) Manager
 *
 * This manager provides methods for managing affiliate marketing campaigns,
 * including open campaigns, targeted campaigns, performance tracking, and affiliate management.
 */
export class AmsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  // ============================================================================
  // Open Campaign APIs
  // ============================================================================

  /**
   * Add all products to open campaign
   *
   * Use this API to add all shop products to the open campaign with specified commission rate and period.
   *
   * @param params - Parameters for adding all products
   * @returns Promise with task ID for checking batch task result
   */
  async addAllProductsToOpenCampaign(
    params: AddAllProductsToOpenCampaignParams
  ): Promise<AddAllProductsToOpenCampaignResponse> {
    const response = await ShopeeFetch.fetch<AddAllProductsToOpenCampaignResponse>(
      this.config,
      "/ams/add_all_products_to_open_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Batch add products to open campaign
   *
   * Use this API to add specific products to the open campaign.
   *
   * @param params - Parameters including item IDs, commission rate, and period
   * @returns Promise with task ID for checking batch task result
   */
  async batchAddProductsToOpenCampaign(
    params: BatchAddProductsToOpenCampaignParams
  ): Promise<BatchAddProductsToOpenCampaignResponse> {
    const response = await ShopeeFetch.fetch<BatchAddProductsToOpenCampaignResponse>(
      this.config,
      "/ams/batch_add_products_to_open_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Batch edit products open campaign setting
   *
   * Use this API to edit settings for multiple products in the open campaign.
   *
   * @param params - Parameters including campaign IDs and new settings
   * @returns Promise with task ID for checking batch task result
   */
  async batchEditProductsOpenCampaignSetting(
    params: BatchEditProductsOpenCampaignSettingParams
  ): Promise<BatchEditProductsOpenCampaignSettingResponse> {
    const response = await ShopeeFetch.fetch<BatchEditProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/batch_edit_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Batch get products suggested rate
   *
   * Use this API to get suggested commission rates for multiple products.
   *
   * @param params - Parameters with item ID list
   * @returns Promise with suggested rates for each item
   */
  async batchGetProductsSuggestedRate(
    params: BatchGetProductsSuggestedRateParams
  ): Promise<BatchGetProductsSuggestedRateResponse> {
    const response = await ShopeeFetch.fetch<BatchGetProductsSuggestedRateResponse>(
      this.config,
      "/ams/batch_get_products_suggested_rate",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Batch remove products open campaign setting
   *
   * Use this API to remove multiple products from the open campaign.
   *
   * @param params - Parameters with campaign IDs to remove
   * @returns Promise with task ID for checking batch task result
   */
  async batchRemoveProductsOpenCampaignSetting(
    params: BatchRemoveProductsOpenCampaignSettingParams
  ): Promise<BatchRemoveProductsOpenCampaignSettingResponse> {
    const response = await ShopeeFetch.fetch<BatchRemoveProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/batch_remove_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Edit all products open campaign setting
   *
   * Use this API to edit settings for all products in the open campaign.
   *
   * @param params - Parameters with new commission rate and period
   * @returns Promise with task ID for checking batch task result
   */
  async editAllProductsOpenCampaignSetting(
    params: EditAllProductsOpenCampaignSettingParams
  ): Promise<EditAllProductsOpenCampaignSettingResponse> {
    const response = await ShopeeFetch.fetch<EditAllProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/edit_all_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get open campaign added product list
   *
   * Use this API to get the list of products added to the open campaign.
   *
   * @param params - Pagination and search parameters
   * @returns Promise with list of added products
   */
  async getOpenCampaignAddedProduct(
    params: GetOpenCampaignAddedProductParams
  ): Promise<GetOpenCampaignAddedProductResponse> {
    const response = await ShopeeFetch.fetch<GetOpenCampaignAddedProductResponse>(
      this.config,
      "/ams/get_open_campaign_added_product",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get open campaign batch task result
   *
   * Use this API to check the status and result of a batch operation.
   *
   * @param params - Parameters with task ID
   * @returns Promise with task status and results
   */
  async getOpenCampaignBatchTaskResult(
    params: GetOpenCampaignBatchTaskResultParams
  ): Promise<GetOpenCampaignBatchTaskResultResponse> {
    const response = await ShopeeFetch.fetch<GetOpenCampaignBatchTaskResultResponse>(
      this.config,
      "/ams/get_open_campaign_batch_task_result",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get open campaign not added product list
   *
   * Use this API to get products that are not yet added to the open campaign.
   *
   * @param params - Pagination and search parameters
   * @returns Promise with list of not added products
   */
  async getOpenCampaignNotAddedProduct(
    params: GetOpenCampaignNotAddedProductParams
  ): Promise<GetOpenCampaignNotAddedProductResponse> {
    const response = await ShopeeFetch.fetch<GetOpenCampaignNotAddedProductResponse>(
      this.config,
      "/ams/get_open_campaign_not_added_product",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get open campaign performance
   *
   * Use this API to get performance data for the open campaign.
   *
   * @param params - Period type, date range, and pagination parameters
   * @returns Promise with performance data
   */
  async getOpenCampaignPerformance(
    params: GetOpenCampaignPerformanceParams
  ): Promise<GetOpenCampaignPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetOpenCampaignPerformanceResponse>(
      this.config,
      "/ams/get_open_campaign_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Remove all products from open campaign
   *
   * Use this API to remove all products from the open campaign.
   *
   * @returns Promise with task ID for checking batch task result
   */
  async removeAllProductsOpenCampaignSetting(): Promise<RemoveAllProductsOpenCampaignSettingResponse> {
    const response = await ShopeeFetch.fetch<RemoveAllProductsOpenCampaignSettingResponse>(
      this.config,
      "/ams/remove_all_products_open_campaign_setting",
      {
        method: "POST",
        auth: true,
        body: {},
      }
    );
    return response;
  }

  // ============================================================================
  // Targeted Campaign APIs
  // ============================================================================

  /**
   * Create a new targeted campaign
   *
   * Use this API to create a targeted campaign with specific products and affiliates.
   *
   * @param params - Campaign details including name, period, items, and affiliates
   * @returns Promise with created campaign ID and any failed items/affiliates
   */
  async createNewTargetedCampaign(
    params: CreateNewTargetedCampaignParams
  ): Promise<CreateNewTargetedCampaignResponse> {
    const response = await ShopeeFetch.fetch<CreateNewTargetedCampaignResponse>(
      this.config,
      "/ams/create_new_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Edit affiliate list of targeted campaign
   *
   * Use this API to add or remove affiliates from a targeted campaign.
   *
   * @param params - Campaign ID, edit type (add/remove), and affiliate list
   * @returns Promise with campaign ID and any failed affiliates
   */
  async editAffiliateListOfTargetedCampaign(
    params: EditAffiliateListOfTargetedCampaignParams
  ): Promise<EditAffiliateListOfTargetedCampaignResponse> {
    const response = await ShopeeFetch.fetch<EditAffiliateListOfTargetedCampaignResponse>(
      this.config,
      "/ams/edit_affiliate_list_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Edit product list of targeted campaign
   *
   * Use this API to add, remove, or edit products in a targeted campaign.
   *
   * @param params - Campaign ID, edit type (add/remove/edit), and item list
   * @returns Promise with campaign ID and any failed items
   */
  async editProductListOfTargetedCampaign(
    params: EditProductListOfTargetedCampaignParams
  ): Promise<EditProductListOfTargetedCampaignResponse> {
    const response = await ShopeeFetch.fetch<EditProductListOfTargetedCampaignResponse>(
      this.config,
      "/ams/edit_product_list_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get targeted campaign addable product list
   *
   * Use this API to get products that can be added to targeted campaigns.
   *
   * @param params - Pagination and search parameters
   * @returns Promise with list of addable products
   */
  async getTargetedCampaignAddableProductList(
    params: GetTargetedCampaignAddableProductListParams
  ): Promise<GetTargetedCampaignAddableProductListResponse> {
    const response = await ShopeeFetch.fetch<GetTargetedCampaignAddableProductListResponse>(
      this.config,
      "/ams/get_targeted_campaign_addable_product_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get targeted campaign list
   *
   * Use this API to get a list of targeted campaigns with optional filters.
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with list of campaigns
   */
  async getTargetedCampaignList(
    params?: GetTargetedCampaignListParams
  ): Promise<GetTargetedCampaignListResponse> {
    const response = await ShopeeFetch.fetch<GetTargetedCampaignListResponse>(
      this.config,
      "/ams/get_targeted_campaign_list",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  /**
   * Get targeted campaign performance
   *
   * Use this API to get performance data for targeted campaigns.
   *
   * @param params - Period type, date range, and pagination parameters
   * @returns Promise with campaign performance data
   */
  async getTargetedCampaignPerformance(
    params: GetTargetedCampaignPerformanceParams
  ): Promise<GetTargetedCampaignPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetTargetedCampaignPerformanceResponse>(
      this.config,
      "/ams/get_targeted_campaign_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get targeted campaign settings
   *
   * Use this API to get detailed settings of a specific targeted campaign.
   *
   * @param params - Campaign ID
   * @returns Promise with campaign settings including items and affiliates
   */
  async getTargetedCampaignSettings(
    params: GetTargetedCampaignSettingsParams
  ): Promise<GetTargetedCampaignSettingsResponse> {
    const response = await ShopeeFetch.fetch<GetTargetedCampaignSettingsResponse>(
      this.config,
      "/ams/get_targeted_campaign_settings",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Terminate targeted campaign
   *
   * Use this API to terminate an active targeted campaign.
   *
   * @param params - Campaign ID to terminate
   * @returns Promise with terminated campaign ID
   */
  async terminateTargetedCampaign(
    params: TerminateTargetedCampaignParams
  ): Promise<TerminateTargetedCampaignResponse> {
    const response = await ShopeeFetch.fetch<TerminateTargetedCampaignResponse>(
      this.config,
      "/ams/terminate_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Update basic info of targeted campaign
   *
   * Use this API to update basic information of a targeted campaign.
   *
   * @param params - Campaign ID and fields to update
   * @returns Promise with updated campaign ID
   */
  async updateBasicInfoOfTargetedCampaign(
    params: UpdateBasicInfoOfTargetedCampaignParams
  ): Promise<UpdateBasicInfoOfTargetedCampaignResponse> {
    const response = await ShopeeFetch.fetch<UpdateBasicInfoOfTargetedCampaignResponse>(
      this.config,
      "/ams/update_basic_info_of_targeted_campaign",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  // ============================================================================
  // Performance & Analytics APIs
  // ============================================================================

  /**
   * Get affiliate performance
   *
   * Use this API to get performance data by affiliate.
   *
   * @param params - Period type, date range, and pagination parameters
   * @returns Promise with affiliate performance data
   */
  async getAffiliatePerformance(
    params: GetAffiliatePerformanceParams
  ): Promise<GetAffiliatePerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetAffiliatePerformanceResponse>(
      this.config,
      "/ams/get_affiliate_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get auto add new product toggle status
   *
   * Use this API to check if auto-add new product feature is enabled.
   *
   * @returns Promise with toggle status and commission rate
   */
  async getAutoAddNewProductToggleStatus(): Promise<GetAutoAddNewProductToggleStatusResponse> {
    const response = await ShopeeFetch.fetch<GetAutoAddNewProductToggleStatusResponse>(
      this.config,
      "/ams/get_auto_add_new_product_toggle_status",
      {
        method: "GET",
        auth: true,
      }
    );
    return response;
  }

  /**
   * Get campaign key metrics performance
   *
   * Use this API to get overall key metrics for campaigns.
   *
   * @param params - Period type and date range
   * @returns Promise with aggregated performance metrics
   */
  async getCampaignKeyMetricsPerformance(
    params: GetCampaignKeyMetricsPerformanceParams
  ): Promise<GetCampaignKeyMetricsPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetCampaignKeyMetricsPerformanceResponse>(
      this.config,
      "/ams/get_campaign_key_metrics_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get content performance
   *
   * Use this API to get performance data by content.
   *
   * @param params - Period type, date range, and pagination parameters
   * @returns Promise with content performance data
   */
  async getContentPerformance(
    params: GetContentPerformanceParams
  ): Promise<GetContentPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetContentPerformanceResponse>(
      this.config,
      "/ams/get_content_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get conversion report
   *
   * Use this API to get detailed conversion data with optional filters.
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with conversion report data
   */
  async getConversionReport(
    params?: GetConversionReportParams
  ): Promise<GetConversionReportResponse> {
    const response = await ShopeeFetch.fetch<GetConversionReportResponse>(
      this.config,
      "/ams/get_conversion_report",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  /**
   * Get managed affiliate list
   *
   * Use this API to get the list of affiliates managed by the shop.
   *
   * @param params - Pagination parameters
   * @returns Promise with list of managed affiliates
   */
  async getManagedAffiliateList(
    params?: GetManagedAffiliateListParams
  ): Promise<GetManagedAffiliateListResponse> {
    const response = await ShopeeFetch.fetch<GetManagedAffiliateListResponse>(
      this.config,
      "/ams/get_managed_affiliate_list",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  /**
   * Get optimization suggestion product
   *
   * Use this API to get products with optimization suggestions.
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with products and their suggested optimizations
   */
  async getOptimizationSuggestionProduct(
    params?: GetOptimizationSuggestionProductParams
  ): Promise<GetOptimizationSuggestionProductResponse> {
    const response = await ShopeeFetch.fetch<GetOptimizationSuggestionProductResponse>(
      this.config,
      "/ams/get_optimization_suggestion_product",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  /**
   * Get performance data update time
   *
   * Use this API to get the latest data date for performance data.
   *
   * @param params - Marker type (e.g., AmsMarker)
   * @returns Promise with latest data date
   */
  async getPerformanceDataUpdateTime(
    params: GetPerformanceDataUpdateTimeParams
  ): Promise<GetPerformanceDataUpdateTimeResponse> {
    const response = await ShopeeFetch.fetch<GetPerformanceDataUpdateTimeResponse>(
      this.config,
      "/ams/get_performance_data_update_time",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get product performance
   *
   * Use this API to get performance data by product.
   *
   * @param params - Period type, date range, and pagination parameters
   * @returns Promise with product performance data
   */
  async getProductPerformance(
    params: GetProductPerformanceParams
  ): Promise<GetProductPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetProductPerformanceResponse>(
      this.config,
      "/ams/get_product_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get recommended affiliate list
   *
   * Use this API to get a list of recommended affiliates for the shop.
   *
   * @param params - Page size parameter
   * @returns Promise with list of recommended affiliates
   */
  async getRecommendedAffiliateList(
    params?: GetRecommendedAffiliateListParams
  ): Promise<GetRecommendedAffiliateListResponse> {
    const response = await ShopeeFetch.fetch<GetRecommendedAffiliateListResponse>(
      this.config,
      "/ams/get_recommended_affiliate_list",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  /**
   * Get shop performance
   *
   * Use this API to retrieve overall key metrics for all channels or specific channels.
   *
   * @param params - Period type, date range, order type, and channel
   * @returns Promise with shop-level performance metrics
   */
  async getShopPerformance(params: AmsGetShopPerformanceParams): Promise<AmsGetShopPerformanceResponse> {
    const response = await ShopeeFetch.fetch<AmsGetShopPerformanceResponse>(
      this.config,
      "/ams/get_shop_performance",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get shop suggested rate
   *
   * Use this API to get the suggested commission rate for the shop.
   *
   * @returns Promise with suggested rate and rate range
   */
  async getShopSuggestedRate(): Promise<GetShopSuggestedRateResponse> {
    const response = await ShopeeFetch.fetch<GetShopSuggestedRateResponse>(
      this.config,
      "/ams/get_shop_suggested_rate",
      {
        method: "GET",
        auth: true,
      }
    );
    return response;
  }

  // ============================================================================
  // Validation APIs
  // ============================================================================

  /**
   * Get validation list
   *
   * Use this API to get the list of validation periods.
   *
   * @returns Promise with list of validation periods
   */
  async getValidationList(): Promise<GetValidationListResponse> {
    const response = await ShopeeFetch.fetch<GetValidationListResponse>(
      this.config,
      "/ams/get_validation_list",
      {
        method: "GET",
        auth: true,
      }
    );
    return response;
  }

  /**
   * Get validation report
   *
   * Use this API to get detailed validation report data.
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with validation report data
   */
  async getValidationReport(
    params?: GetValidationReportParams
  ): Promise<GetValidationReportResponse> {
    const response = await ShopeeFetch.fetch<GetValidationReportResponse>(
      this.config,
      "/ams/get_validation_report",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );
    return response;
  }

  // ============================================================================
  // Query APIs
  // ============================================================================

  /**
   * Query affiliate list
   *
   * Use this API to search for affiliates by ID or name.
   *
   * @param params - Query type (id/name) and search criteria
   * @returns Promise with matching affiliates
   */
  async queryAffiliateList(params: QueryAffiliateListParams): Promise<QueryAffiliateListResponse> {
    const response = await ShopeeFetch.fetch<QueryAffiliateListResponse>(
      this.config,
      "/ams/query_affiliate_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  // ============================================================================
  // Settings APIs
  // ============================================================================

  /**
   * Update auto add new product setting
   *
   * Use this API to enable/disable and configure auto-add new product feature.
   *
   * @param params - Toggle status and commission rate
   * @returns Promise with empty response on success
   */
  async updateAutoAddNewProductSetting(
    params: UpdateAutoAddNewProductSettingParams
  ): Promise<UpdateAutoAddNewProductSettingResponse> {
    const response = await ShopeeFetch.fetch<UpdateAutoAddNewProductSettingResponse>(
      this.config,
      "/ams/update_auto_add_new_product_setting",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }
}
