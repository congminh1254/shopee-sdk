import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { AddAllProductsToOpenCampaignParams, AddAllProductsToOpenCampaignResponse, BatchAddProductsToOpenCampaignParams, BatchAddProductsToOpenCampaignResponse, BatchEditProductsOpenCampaignSettingParams, BatchEditProductsOpenCampaignSettingResponse, BatchGetProductsSuggestedRateParams, BatchGetProductsSuggestedRateResponse, BatchRemoveProductsOpenCampaignSettingParams, BatchRemoveProductsOpenCampaignSettingResponse, CreateNewTargetedCampaignParams, CreateNewTargetedCampaignResponse, EditAffiliateListOfTargetedCampaignParams, EditAffiliateListOfTargetedCampaignResponse, EditAllProductsOpenCampaignSettingParams, EditAllProductsOpenCampaignSettingResponse, EditProductListOfTargetedCampaignParams, EditProductListOfTargetedCampaignResponse, GetAffiliatePerformanceParams, GetAffiliatePerformanceResponse, GetAutoAddNewProductToggleStatusResponse, GetCampaignKeyMetricsPerformanceParams, GetCampaignKeyMetricsPerformanceResponse, GetContentPerformanceParams, GetContentPerformanceResponse, GetConversionReportParams, GetConversionReportResponse, GetManagedAffiliateListParams, GetManagedAffiliateListResponse, GetOpenCampaignAddedProductParams, GetOpenCampaignAddedProductResponse, GetOpenCampaignBatchTaskResultParams, GetOpenCampaignBatchTaskResultResponse, GetOpenCampaignNotAddedProductParams, GetOpenCampaignNotAddedProductResponse, GetOpenCampaignPerformanceParams, GetOpenCampaignPerformanceResponse, GetOptimizationSuggestionProductParams, GetOptimizationSuggestionProductResponse, GetPerformanceDataUpdateTimeParams, GetPerformanceDataUpdateTimeResponse, GetProductPerformanceParams, GetProductPerformanceResponse, GetRecommendedAffiliateListParams, GetRecommendedAffiliateListResponse, AmsGetShopPerformanceParams, AmsGetShopPerformanceResponse, GetShopSuggestedRateResponse, GetTargetedCampaignAddableProductListParams, GetTargetedCampaignAddableProductListResponse, GetTargetedCampaignListParams, GetTargetedCampaignListResponse, GetTargetedCampaignPerformanceParams, GetTargetedCampaignPerformanceResponse, GetTargetedCampaignSettingsParams, GetTargetedCampaignSettingsResponse, GetValidationListResponse, GetValidationReportParams, GetValidationReportResponse, QueryAffiliateListParams, QueryAffiliateListResponse, RemoveAllProductsOpenCampaignSettingResponse, TerminateTargetedCampaignParams, TerminateTargetedCampaignResponse, UpdateAutoAddNewProductSettingParams, UpdateAutoAddNewProductSettingResponse, UpdateBasicInfoOfTargetedCampaignParams, UpdateBasicInfoOfTargetedCampaignResponse } from "../schemas/ams.js";
/**
 * AMS (Affiliate Marketing Solution) Manager
 *
 * This manager provides methods for managing affiliate marketing campaigns,
 * including open campaigns, targeted campaigns, performance tracking, and affiliate management.
 */
export declare class AmsManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Add all products to open campaign
     *
     * Use this API to add all shop products to the open campaign with specified commission rate and period.
     *
     * @param params - Parameters for adding all products
     * @returns Promise with task ID for checking batch task result
     */
    addAllProductsToOpenCampaign(params: AddAllProductsToOpenCampaignParams): Promise<AddAllProductsToOpenCampaignResponse>;
    /**
     * Batch add products to open campaign
     *
     * Use this API to add specific products to the open campaign.
     *
     * @param params - Parameters including item IDs, commission rate, and period
     * @returns Promise with task ID for checking batch task result
     */
    batchAddProductsToOpenCampaign(params: BatchAddProductsToOpenCampaignParams): Promise<BatchAddProductsToOpenCampaignResponse>;
    /**
     * Batch edit products open campaign setting
     *
     * Use this API to edit settings for multiple products in the open campaign.
     *
     * @param params - Parameters including campaign IDs and new settings
     * @returns Promise with task ID for checking batch task result
     */
    batchEditProductsOpenCampaignSetting(params: BatchEditProductsOpenCampaignSettingParams): Promise<BatchEditProductsOpenCampaignSettingResponse>;
    /**
     * Batch get products suggested rate
     *
     * Use this API to get suggested commission rates for multiple products.
     *
     * @param params - Parameters with item ID list
     * @returns Promise with suggested rates for each item
     */
    batchGetProductsSuggestedRate(params: BatchGetProductsSuggestedRateParams): Promise<BatchGetProductsSuggestedRateResponse>;
    /**
     * Batch remove products open campaign setting
     *
     * Use this API to remove multiple products from the open campaign.
     *
     * @param params - Parameters with campaign IDs to remove
     * @returns Promise with task ID for checking batch task result
     */
    batchRemoveProductsOpenCampaignSetting(params: BatchRemoveProductsOpenCampaignSettingParams): Promise<BatchRemoveProductsOpenCampaignSettingResponse>;
    /**
     * Edit all products open campaign setting
     *
     * Use this API to edit settings for all products in the open campaign.
     *
     * @param params - Parameters with new commission rate and period
     * @returns Promise with task ID for checking batch task result
     */
    editAllProductsOpenCampaignSetting(params: EditAllProductsOpenCampaignSettingParams): Promise<EditAllProductsOpenCampaignSettingResponse>;
    /**
     * Get open campaign added product list
     *
     * Use this API to get the list of products added to the open campaign.
     *
     * @param params - Pagination and search parameters
     * @returns Promise with list of added products
     */
    getOpenCampaignAddedProduct(params: GetOpenCampaignAddedProductParams): Promise<GetOpenCampaignAddedProductResponse>;
    /**
     * Get open campaign batch task result
     *
     * Use this API to check the status and result of a batch operation.
     *
     * @param params - Parameters with task ID
     * @returns Promise with task status and results
     */
    getOpenCampaignBatchTaskResult(params: GetOpenCampaignBatchTaskResultParams): Promise<GetOpenCampaignBatchTaskResultResponse>;
    /**
     * Get open campaign not added product list
     *
     * Use this API to get products that are not yet added to the open campaign.
     *
     * @param params - Pagination and search parameters
     * @returns Promise with list of not added products
     */
    getOpenCampaignNotAddedProduct(params: GetOpenCampaignNotAddedProductParams): Promise<GetOpenCampaignNotAddedProductResponse>;
    /**
     * Get open campaign performance
     *
     * Use this API to get performance data for the open campaign.
     *
     * @param params - Period type, date range, and pagination parameters
     * @returns Promise with performance data
     */
    getOpenCampaignPerformance(params: GetOpenCampaignPerformanceParams): Promise<GetOpenCampaignPerformanceResponse>;
    /**
     * Remove all products from open campaign
     *
     * Use this API to remove all products from the open campaign.
     *
     * @returns Promise with task ID for checking batch task result
     */
    removeAllProductsOpenCampaignSetting(): Promise<RemoveAllProductsOpenCampaignSettingResponse>;
    /**
     * Create a new targeted campaign
     *
     * Use this API to create a targeted campaign with specific products and affiliates.
     *
     * @param params - Campaign details including name, period, items, and affiliates
     * @returns Promise with created campaign ID and any failed items/affiliates
     */
    createNewTargetedCampaign(params: CreateNewTargetedCampaignParams): Promise<CreateNewTargetedCampaignResponse>;
    /**
     * Edit affiliate list of targeted campaign
     *
     * Use this API to add or remove affiliates from a targeted campaign.
     *
     * @param params - Campaign ID, edit type (add/remove), and affiliate list
     * @returns Promise with campaign ID and any failed affiliates
     */
    editAffiliateListOfTargetedCampaign(params: EditAffiliateListOfTargetedCampaignParams): Promise<EditAffiliateListOfTargetedCampaignResponse>;
    /**
     * Edit product list of targeted campaign
     *
     * Use this API to add, remove, or edit products in a targeted campaign.
     *
     * @param params - Campaign ID, edit type (add/remove/edit), and item list
     * @returns Promise with campaign ID and any failed items
     */
    editProductListOfTargetedCampaign(params: EditProductListOfTargetedCampaignParams): Promise<EditProductListOfTargetedCampaignResponse>;
    /**
     * Get targeted campaign addable product list
     *
     * Use this API to get products that can be added to targeted campaigns.
     *
     * @param params - Pagination and search parameters
     * @returns Promise with list of addable products
     */
    getTargetedCampaignAddableProductList(params: GetTargetedCampaignAddableProductListParams): Promise<GetTargetedCampaignAddableProductListResponse>;
    /**
     * Get targeted campaign list
     *
     * Use this API to get a list of targeted campaigns with optional filters.
     *
     * @param params - Pagination and filter parameters
     * @returns Promise with list of campaigns
     */
    getTargetedCampaignList(params?: GetTargetedCampaignListParams): Promise<GetTargetedCampaignListResponse>;
    /**
     * Get targeted campaign performance
     *
     * Use this API to get performance data for targeted campaigns.
     *
     * @param params - Period type, date range, and pagination parameters
     * @returns Promise with campaign performance data
     */
    getTargetedCampaignPerformance(params: GetTargetedCampaignPerformanceParams): Promise<GetTargetedCampaignPerformanceResponse>;
    /**
     * Get targeted campaign settings
     *
     * Use this API to get detailed settings of a specific targeted campaign.
     *
     * @param params - Campaign ID
     * @returns Promise with campaign settings including items and affiliates
     */
    getTargetedCampaignSettings(params: GetTargetedCampaignSettingsParams): Promise<GetTargetedCampaignSettingsResponse>;
    /**
     * Terminate targeted campaign
     *
     * Use this API to terminate an active targeted campaign.
     *
     * @param params - Campaign ID to terminate
     * @returns Promise with terminated campaign ID
     */
    terminateTargetedCampaign(params: TerminateTargetedCampaignParams): Promise<TerminateTargetedCampaignResponse>;
    /**
     * Update basic info of targeted campaign
     *
     * Use this API to update basic information of a targeted campaign.
     *
     * @param params - Campaign ID and fields to update
     * @returns Promise with updated campaign ID
     */
    updateBasicInfoOfTargetedCampaign(params: UpdateBasicInfoOfTargetedCampaignParams): Promise<UpdateBasicInfoOfTargetedCampaignResponse>;
    /**
     * Get affiliate performance
     *
     * Use this API to get performance data by affiliate.
     *
     * @param params - Period type, date range, and pagination parameters
     * @returns Promise with affiliate performance data
     */
    getAffiliatePerformance(params: GetAffiliatePerformanceParams): Promise<GetAffiliatePerformanceResponse>;
    /**
     * Get auto add new product toggle status
     *
     * Use this API to check if auto-add new product feature is enabled.
     *
     * @returns Promise with toggle status and commission rate
     */
    getAutoAddNewProductToggleStatus(): Promise<GetAutoAddNewProductToggleStatusResponse>;
    /**
     * Get campaign key metrics performance
     *
     * Use this API to get overall key metrics for campaigns.
     *
     * @param params - Period type and date range
     * @returns Promise with aggregated performance metrics
     */
    getCampaignKeyMetricsPerformance(params: GetCampaignKeyMetricsPerformanceParams): Promise<GetCampaignKeyMetricsPerformanceResponse>;
    /**
     * Get content performance
     *
     * Use this API to get performance data by content.
     *
     * @param params - Period type, date range, and pagination parameters
     * @returns Promise with content performance data
     */
    getContentPerformance(params: GetContentPerformanceParams): Promise<GetContentPerformanceResponse>;
    /**
     * Get conversion report
     *
     * Use this API to get detailed conversion data with optional filters.
     *
     * @param params - Pagination and filter parameters
     * @returns Promise with conversion report data
     */
    getConversionReport(params?: GetConversionReportParams): Promise<GetConversionReportResponse>;
    /**
     * Get managed affiliate list
     *
     * Use this API to get the list of affiliates managed by the shop.
     *
     * @param params - Pagination parameters
     * @returns Promise with list of managed affiliates
     */
    getManagedAffiliateList(params?: GetManagedAffiliateListParams): Promise<GetManagedAffiliateListResponse>;
    /**
     * Get optimization suggestion product
     *
     * Use this API to get products with optimization suggestions.
     *
     * @param params - Pagination and filter parameters
     * @returns Promise with products and their suggested optimizations
     */
    getOptimizationSuggestionProduct(params?: GetOptimizationSuggestionProductParams): Promise<GetOptimizationSuggestionProductResponse>;
    /**
     * Get performance data update time
     *
     * Use this API to get the latest data date for performance data.
     *
     * @param params - Marker type (e.g., AmsMarker)
     * @returns Promise with latest data date
     */
    getPerformanceDataUpdateTime(params: GetPerformanceDataUpdateTimeParams): Promise<GetPerformanceDataUpdateTimeResponse>;
    /**
     * Get product performance
     *
     * Use this API to get performance data by product.
     *
     * @param params - Period type, date range, and pagination parameters
     * @returns Promise with product performance data
     */
    getProductPerformance(params: GetProductPerformanceParams): Promise<GetProductPerformanceResponse>;
    /**
     * Get recommended affiliate list
     *
     * Use this API to get a list of recommended affiliates for the shop.
     *
     * @param params - Page size parameter
     * @returns Promise with list of recommended affiliates
     */
    getRecommendedAffiliateList(params?: GetRecommendedAffiliateListParams): Promise<GetRecommendedAffiliateListResponse>;
    /**
     * Get shop performance
     *
     * Use this API to retrieve overall key metrics for all channels or specific channels.
     *
     * @param params - Period type, date range, order type, and channel
     * @returns Promise with shop-level performance metrics
     */
    getShopPerformance(params: AmsGetShopPerformanceParams): Promise<AmsGetShopPerformanceResponse>;
    /**
     * Get shop suggested rate
     *
     * Use this API to get the suggested commission rate for the shop.
     *
     * @returns Promise with suggested rate and rate range
     */
    getShopSuggestedRate(): Promise<GetShopSuggestedRateResponse>;
    /**
     * Get validation list
     *
     * Use this API to get the list of validation periods.
     *
     * @returns Promise with list of validation periods
     */
    getValidationList(): Promise<GetValidationListResponse>;
    /**
     * Get validation report
     *
     * Use this API to get detailed validation report data.
     *
     * @param params - Pagination and filter parameters
     * @returns Promise with validation report data
     */
    getValidationReport(params?: GetValidationReportParams): Promise<GetValidationReportResponse>;
    /**
     * Query affiliate list
     *
     * Use this API to search for affiliates by ID or name.
     *
     * @param params - Query type (id/name) and search criteria
     * @returns Promise with matching affiliates
     */
    queryAffiliateList(params: QueryAffiliateListParams): Promise<QueryAffiliateListResponse>;
    /**
     * Update auto add new product setting
     *
     * Use this API to enable/disable and configure auto-add new product feature.
     *
     * @param params - Toggle status and commission rate
     * @returns Promise with empty response on success
     */
    updateAutoAddNewProductSetting(params: UpdateAutoAddNewProductSettingParams): Promise<UpdateAutoAddNewProductSettingResponse>;
}
