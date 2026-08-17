// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddGlobalItemRequest,
  AddGlobalItemResponse,
  AddGlobalModelRequest,
  AddGlobalModelResponse,
  CategoryRecommendRequest,
  CategoryRecommendResponse,
  CreatePublishTaskRequest,
  CreatePublishTaskResponse,
  DeleteGlobalItemRequest,
  DeleteGlobalItemResponse,
  DeleteGlobalModelRequest,
  DeleteGlobalModelResponse,
  GetAttributeTreeRequest,
  GetAttributeTreeResponse,
  GetBrandListRequest,
  GetBrandListResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetGlobalItemIdRequest,
  GetGlobalItemIdResponse,
  GetGlobalItemInfoRequest,
  GetGlobalItemInfoResponse,
  GetGlobalItemLimitRequest,
  GetGlobalItemLimitResponse,
  GetGlobalItemListRequest,
  GetGlobalItemListResponse,
  GetGlobalModelListRequest,
  GetGlobalModelListResponse,
  GetLocalAdjustmentRateRequest,
  GetLocalAdjustmentRateResponse,
  GetPublishTaskResultRequest,
  GetPublishTaskResultResponse,
  GetPublishableShopRequest,
  GetPublishableShopResponse,
  GetPublishedListRequest,
  GetPublishedListResponse,
  GetRecommendAttributeRequest,
  GetRecommendAttributeResponse,
  GetShopPublishableStatusRequest,
  GetShopPublishableStatusResponse,
  GetSizeChartDetailRequest,
  GetSizeChartDetailResponse,
  GetSizeChartListRequest,
  GetSizeChartListResponse,
  GetVariationsRequest,
  GetVariationsResponse,
  InitTierVariationRequest,
  InitTierVariationResponse,
  SearchGlobalAttributeValueListRequest,
  SearchGlobalAttributeValueListResponse,
  SetSyncFieldRequest,
  SetSyncFieldResponse,
  SupportSizeChartRequest,
  SupportSizeChartResponse,
  UpdateGlobalItemRequest,
  UpdateGlobalItemResponse,
  UpdateGlobalModelRequest,
  UpdateGlobalModelResponse,
  UpdateLocalAdjustmentRateRequest,
  UpdateLocalAdjustmentRateResponse,
  UpdatePriceRequest,
  UpdatePriceResponse,
  UpdateSizeChartRequest,
  UpdateSizeChartResponse,
  UpdateStockRequest,
  UpdateStockResponse,
  UpdateTierVariationRequest,
  UpdateTierVariationResponse,
} from "../schemas/global-product.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class GlobalProductManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add global item. Only for China mainland sellers using China Seller Centre(CNSC). More details in https://shopee.cn/cooperate/46/53/926.
   *
   * @param {AddGlobalItemRequest} params Request parameters
   * @returns {Promise<AddGlobalItemResponse>} Promise resolving to the response
   */
  public async addGlobalItem(params?: AddGlobalItemRequest): Promise<AddGlobalItemResponse> {
    return ShopeeFetch.fetch<AddGlobalItemResponse>(
      this.config,
      "/global_product/add_global_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Add global model. Only for China mainland sellers and Korean sellers.
   *
   * @param {AddGlobalModelRequest} params Request parameters
   * @returns {Promise<AddGlobalModelResponse>} Promise resolving to the response
   */
  public async addGlobalModel(params?: AddGlobalModelRequest): Promise<AddGlobalModelResponse> {
    return ShopeeFetch.fetch<AddGlobalModelResponse>(
      this.config,
      "/global_product/add_global_model",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Recommend category by item name. Only for China mainland sellers and Korean sellers.
   *
   * @param {CategoryRecommendRequest} params Request parameters
   * @returns {Promise<CategoryRecommendResponse>} Promise resolving to the response
   */
  public async categoryRecommend(
    params?: CategoryRecommendRequest
  ): Promise<CategoryRecommendResponse> {
    return ShopeeFetch.fetch<CategoryRecommendResponse>(
      this.config,
      "/global_product/category_recommend",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Create publish task for global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {CreatePublishTaskRequest} params Request parameters
   * @returns {Promise<CreatePublishTaskResponse>} Promise resolving to the response
   */
  public async createPublishTask(
    params?: CreatePublishTaskRequest
  ): Promise<CreatePublishTaskResponse> {
    return ShopeeFetch.fetch<CreatePublishTaskResponse>(
      this.config,
      "/global_product/create_publish_task",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {DeleteGlobalItemRequest} params Request parameters
   * @returns {Promise<DeleteGlobalItemResponse>} Promise resolving to the response
   */
  public async deleteGlobalItem(
    params?: DeleteGlobalItemRequest
  ): Promise<DeleteGlobalItemResponse> {
    return ShopeeFetch.fetch<DeleteGlobalItemResponse>(
      this.config,
      "/global_product/delete_global_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete global model. Only for China mainland sellers and Korean sellers.
   *
   * @param {DeleteGlobalModelRequest} params Request parameters
   * @returns {Promise<DeleteGlobalModelResponse>} Promise resolving to the response
   */
  public async deleteGlobalModel(
    params?: DeleteGlobalModelRequest
  ): Promise<DeleteGlobalModelResponse> {
    return ShopeeFetch.fetch<DeleteGlobalModelResponse>(
      this.config,
      "/global_product/delete_global_model",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get the mtsku attribute trees for categories
   *
   * @param {GetAttributeTreeRequest} params Request parameters
   * @returns {Promise<GetAttributeTreeResponse>} Promise resolving to the response
   */
  public async getAttributeTree(
    params?: GetAttributeTreeRequest
  ): Promise<GetAttributeTreeResponse> {
    return ShopeeFetch.fetch<GetAttributeTreeResponse>(
      this.config,
      "/global_product/get_attribute_tree",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this call to get a list of brand. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetBrandListRequest} params Request parameters
   * @returns {Promise<GetBrandListResponse>} Promise resolving to the response
   */
  public async getBrandList(params?: GetBrandListRequest): Promise<GetBrandListResponse> {
    return ShopeeFetch.fetch<GetBrandListResponse>(this.config, "/global_product/get_brand_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get global category. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetCategoryRequest} params Request parameters
   * @returns {Promise<GetCategoryResponse>} Promise resolving to the response
   */
  public async getCategory(params?: GetCategoryRequest): Promise<GetCategoryResponse> {
    return ShopeeFetch.fetch<GetCategoryResponse>(this.config, "/global_product/get_category", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get get_global_item_id by item_id. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetGlobalItemIdRequest} params Request parameters
   * @returns {Promise<GetGlobalItemIdResponse>} Promise resolving to the response
   */
  public async getGlobalItemId(params?: GetGlobalItemIdRequest): Promise<GetGlobalItemIdResponse> {
    return ShopeeFetch.fetch<GetGlobalItemIdResponse>(
      this.config,
      "/global_product/get_global_item_id",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get global item info.Only for China mainland sellers and Korean sellers.
   *
   * @param {GetGlobalItemInfoRequest} params Request parameters
   * @returns {Promise<GetGlobalItemInfoResponse>} Promise resolving to the response
   */
  public async getGlobalItemInfo(
    params?: GetGlobalItemInfoRequest
  ): Promise<GetGlobalItemInfoResponse> {
    return ShopeeFetch.fetch<GetGlobalItemInfoResponse>(
      this.config,
      "/global_product/get_global_item_info",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.global_item_list.create_time",
          "response.global_item_list.update_time",
        ],
      }
    );
  }
  /**
   * Get global item upload control.
   *
   * @param {GetGlobalItemLimitRequest} params Request parameters
   * @returns {Promise<GetGlobalItemLimitResponse>} Promise resolving to the response
   */
  public async getGlobalItemLimit(
    params?: GetGlobalItemLimitRequest
  ): Promise<GetGlobalItemLimitResponse> {
    return ShopeeFetch.fetch<GetGlobalItemLimitResponse>(
      this.config,
      "/global_product/get_global_item_limit",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get global item id list. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetGlobalItemListRequest} params Request parameters
   * @returns {Promise<GetGlobalItemListResponse>} Promise resolving to the response
   */
  public async getGlobalItemList(
    params?: GetGlobalItemListRequest
  ): Promise<GetGlobalItemListResponse> {
    return ShopeeFetch.fetch<GetGlobalItemListResponse>(
      this.config,
      "/global_product/get_global_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "update_time_from",
          "update_time_to",
          "response.global_item_list.update_time",
        ],
      }
    );
  }
  /**
   * Get global model list. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetGlobalModelListRequest} params Request parameters
   * @returns {Promise<GetGlobalModelListResponse>} Promise resolving to the response
   */
  public async getGlobalModelList(
    params?: GetGlobalModelListRequest
  ): Promise<GetGlobalModelListResponse> {
    return ShopeeFetch.fetch<GetGlobalModelListResponse>(
      this.config,
      "/global_product/get_global_model_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Retrieves the adjustment rate that converts CB stock price into local-warehouse price for a specific shop.
   *
   * @param {GetLocalAdjustmentRateRequest} params Request parameters
   * @returns {Promise<GetLocalAdjustmentRateResponse>} Promise resolving to the response
   */
  public async getLocalAdjustmentRate(
    params?: GetLocalAdjustmentRateRequest
  ): Promise<GetLocalAdjustmentRateResponse> {
    return ShopeeFetch.fetch<GetLocalAdjustmentRateResponse>(
      this.config,
      "/global_product/get_local_adjustment_rate",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get publish task result for global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetPublishTaskResultRequest} params Request parameters
   * @returns {Promise<GetPublishTaskResultResponse>} Promise resolving to the response
   */
  public async getPublishTaskResult(
    params?: GetPublishTaskResultRequest
  ): Promise<GetPublishTaskResultResponse> {
    return ShopeeFetch.fetch<GetPublishTaskResultResponse>(
      this.config,
      "/global_product/get_publish_task_result",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get publishable shop list for global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetPublishableShopRequest} params Request parameters
   * @returns {Promise<GetPublishableShopResponse>} Promise resolving to the response
   */
  public async getPublishableShop(
    params?: GetPublishableShopRequest
  ): Promise<GetPublishableShopResponse> {
    return ShopeeFetch.fetch<GetPublishableShopResponse>(
      this.config,
      "/global_product/get_publishable_shop",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get published item list of global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetPublishedListRequest} params Request parameters
   * @returns {Promise<GetPublishedListResponse>} Promise resolving to the response
   */
  public async getPublishedList(
    params?: GetPublishedListRequest
  ): Promise<GetPublishedListResponse> {
    return ShopeeFetch.fetch<GetPublishedListResponse>(
      this.config,
      "/global_product/get_published_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get recommend attributes. Only for China mainland sellers and Korean sellers.
   *
   * @param {GetRecommendAttributeRequest} params Request parameters
   * @returns {Promise<GetRecommendAttributeResponse>} Promise resolving to the response
   */
  public async getRecommendAttribute(
    params?: GetRecommendAttributeRequest
  ): Promise<GetRecommendAttributeResponse> {
    return ShopeeFetch.fetch<GetRecommendAttributeResponse>(
      this.config,
      "/global_product/get_recommend_attribute",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get publishable shop list for global item in pages.
   *
   * @param {GetShopPublishableStatusRequest} params Request parameters
   * @returns {Promise<GetShopPublishableStatusResponse>} Promise resolving to the response
   */
  public async getShopPublishableStatus(
    params?: GetShopPublishableStatusRequest
  ): Promise<GetShopPublishableStatusResponse> {
    return ShopeeFetch.fetch<GetShopPublishableStatusResponse>(
      this.config,
      "/global_product/get_shop_publishable_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get new size chart detail
   *
   * @param {GetSizeChartDetailRequest} params Request parameters
   * @returns {Promise<GetSizeChartDetailResponse>} Promise resolving to the response
   */
  public async getSizeChartDetail(
    params?: GetSizeChartDetailRequest
  ): Promise<GetSizeChartDetailResponse> {
    return ShopeeFetch.fetch<GetSizeChartDetailResponse>(
      this.config,
      "/global_product/get_size_chart_detail",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get size chart list
   *
   * @param {GetSizeChartListRequest} params Request parameters
   * @returns {Promise<GetSizeChartListResponse>} Promise resolving to the response
   */
  public async getSizeChartList(
    params?: GetSizeChartListRequest
  ): Promise<GetSizeChartListResponse> {
    return ShopeeFetch.fetch<GetSizeChartListResponse>(
      this.config,
      "/global_product/get_size_chart_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure. The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
   *
   * @param {GetVariationsRequest} params Request parameters
   * @returns {Promise<GetVariationsResponse>} Promise resolving to the response
   */
  public async getVariations(params?: GetVariationsRequest): Promise<GetVariationsResponse> {
    return ShopeeFetch.fetch<GetVariationsResponse>(this.config, "/global_product/get_variations", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Only for China mainland sellers and Korean sellers. If you only define color, it is one tier, if you define color and size, it is two tier. Support two tier structures at most. This API can change no tier to one tier, no tier to two tier, one tier to two tier, two tier to one tier, one tier to no tier, two tier to no tier. Please create variants after an interval of 5 seconds after creating an item, as there may be a delay.
   *
   * @param {InitTierVariationRequest} params Request parameters
   * @returns {Promise<InitTierVariationResponse>} Promise resolving to the response
   */
  public async initTierVariation(
    params?: InitTierVariationRequest
  ): Promise<InitTierVariationResponse> {
    return ShopeeFetch.fetch<InitTierVariationResponse>(
      this.config,
      "/global_product/init_tier_variation",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * this api is for searching attribute value list for attribute with support_search_value flag
   *
   * @param {SearchGlobalAttributeValueListRequest} params Request parameters
   * @returns {Promise<SearchGlobalAttributeValueListResponse>} Promise resolving to the response
   */
  public async searchGlobalAttributeValueList(
    params?: SearchGlobalAttributeValueListRequest
  ): Promise<SearchGlobalAttributeValueListResponse> {
    return ShopeeFetch.fetch<SearchGlobalAttributeValueListResponse>(
      this.config,
      "/global_product/search_global_attribute_value_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Set auto sync field. Only for China mainland sellers and Korean sellers.
   *
   * @param {SetSyncFieldRequest} params Request parameters
   * @returns {Promise<SetSyncFieldResponse>} Promise resolving to the response
   */
  public async setSyncField(params?: SetSyncFieldRequest): Promise<SetSyncFieldResponse> {
    return ShopeeFetch.fetch<SetSyncFieldResponse>(this.config, "/global_product/set_sync_field", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Get category support size chart. Only for China mainland sellers and Korean sellers.
   *
   * @param {SupportSizeChartRequest} params Request parameters
   * @returns {Promise<SupportSizeChartResponse>} Promise resolving to the response
   */
  public async supportSizeChart(
    params?: SupportSizeChartRequest
  ): Promise<SupportSizeChartResponse> {
    return ShopeeFetch.fetch<SupportSizeChartResponse>(
      this.config,
      "/global_product/support_size_chart",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Update global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {UpdateGlobalItemRequest} params Request parameters
   * @returns {Promise<UpdateGlobalItemResponse>} Promise resolving to the response
   */
  public async updateGlobalItem(
    params?: UpdateGlobalItemRequest
  ): Promise<UpdateGlobalItemResponse> {
    return ShopeeFetch.fetch<UpdateGlobalItemResponse>(
      this.config,
      "/global_product/update_global_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update global model. Only for China mainland sellers and Korean sellers.
   *
   * @param {UpdateGlobalModelRequest} params Request parameters
   * @returns {Promise<UpdateGlobalModelResponse>} Promise resolving to the response
   */
  public async updateGlobalModel(
    params?: UpdateGlobalModelRequest
  ): Promise<UpdateGlobalModelResponse> {
    return ShopeeFetch.fetch<UpdateGlobalModelResponse>(
      this.config,
      "/global_product/update_global_model",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * A multiplier that automatically converts your CB stock price into the local-warehouse price. It ensures your local inventory prices reflect regional costs, currency factors, and margin targets.
   *
   * @param {UpdateLocalAdjustmentRateRequest} params Request parameters
   * @returns {Promise<UpdateLocalAdjustmentRateResponse>} Promise resolving to the response
   */
  public async updateLocalAdjustmentRate(
    params?: UpdateLocalAdjustmentRateRequest
  ): Promise<UpdateLocalAdjustmentRateResponse> {
    return ShopeeFetch.fetch<UpdateLocalAdjustmentRateResponse>(
      this.config,
      "/global_product/update_local_adjustment_rate",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update global price. Only for China mainland sellers and Korean sellers.
   *
   * @param {UpdatePriceRequest} params Request parameters
   * @returns {Promise<UpdatePriceResponse>} Promise resolving to the response
   */
  public async updatePrice(params?: UpdatePriceRequest): Promise<UpdatePriceResponse> {
    return ShopeeFetch.fetch<UpdatePriceResponse>(this.config, "/global_product/update_price", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Update size chart for global item. Only for China mainland sellers and Korean sellers.
   *
   * @param {UpdateSizeChartRequest} params Request parameters
   * @returns {Promise<UpdateSizeChartResponse>} Promise resolving to the response
   */
  public async updateSizeChart(params?: UpdateSizeChartRequest): Promise<UpdateSizeChartResponse> {
    return ShopeeFetch.fetch<UpdateSizeChartResponse>(
      this.config,
      "/global_product/update_size_chart",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update global stock. Only for China mainland sellers and Korean sellers.
   *
   * @param {UpdateStockRequest} params Request parameters
   * @returns {Promise<UpdateStockResponse>} Promise resolving to the response
   */
  public async updateStock(params?: UpdateStockRequest): Promise<UpdateStockResponse> {
    return ShopeeFetch.fetch<UpdateStockResponse>(this.config, "/global_product/update_stock", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Update global product tier variation. Only for China mainland sellers and Korean sellers.This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api.
   *
   * @param {UpdateTierVariationRequest} params Request parameters
   * @returns {Promise<UpdateTierVariationResponse>} Promise resolving to the response
   */
  public async updateTierVariation(
    params?: UpdateTierVariationRequest
  ): Promise<UpdateTierVariationResponse> {
    return ShopeeFetch.fetch<UpdateTierVariationResponse>(
      this.config,
      "/global_product/update_tier_variation",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
