// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddItemRequest,
  AddItemResponse,
  AddKitItemRequest,
  AddKitItemResponse,
  AddModelRequest,
  AddModelResponse,
  BatchAddItemRequest,
  BatchAddItemResponse,
  BatchPublishItemToOutletShopRequest,
  BatchPublishItemToOutletShopResponse,
  BatchUpdateOutletPriceRequest,
  BatchUpdateOutletPriceResponse,
  BatchUpdateOutletStockRequest,
  BatchUpdateOutletStockResponse,
  BoostItemRequest,
  BoostItemResponse,
  CategoryRecommendRequest,
  CategoryRecommendResponse,
  DeleteItemRequest,
  DeleteItemResponse,
  DeleteModelRequest,
  DeleteModelResponse,
  GenerateKitImageRequest,
  GenerateKitImageResponse,
  GetAitemByPitemIdRequest,
  GetAitemByPitemIdResponse,
  GetAllVehicleListRequest,
  GetAllVehicleListResponse,
  GetAttributeTreeRequest,
  GetAttributeTreeResponse,
  GetBatchTaskResultRequest,
  GetBatchTaskResultResponse,
  GetBoostedListRequest,
  GetBoostedListResponse,
  GetBrandListRequest,
  GetBrandListResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetCommentRequest,
  GetCommentResponse,
  GetDirectItemListRequest,
  GetDirectItemListResponse,
  GetDirectShopRecommendedPriceRequest,
  GetDirectShopRecommendedPriceResponse,
  GetItemBaseInfoRequest,
  GetItemBaseInfoResponse,
  GetItemContentDiagnosisResultRequest,
  GetItemContentDiagnosisResultResponse,
  GetItemExtraInfoRequest,
  GetItemExtraInfoResponse,
  GetItemLimitRequest,
  GetItemLimitResponse,
  GetItemListRequest,
  GetItemListResponse,
  GetItemListByContentDiagnosisRequest,
  GetItemListByContentDiagnosisResponse,
  GetItemPromotionRequest,
  GetItemPromotionResponse,
  GetItemViolationInfoRequest,
  GetItemViolationInfoResponse,
  GetKitItemInfoRequest,
  GetKitItemInfoResponse,
  GetKitItemLimitRequest,
  GetKitItemLimitResponse,
  GetMainItemListRequest,
  GetMainItemListResponse,
  GetMartItemByOutletItemIdRequest,
  GetMartItemByOutletItemIdResponse,
  GetMartItemMappingByIdRequest,
  GetMartItemMappingByIdResponse,
  GetModelListRequest,
  GetModelListResponse,
  GetProductCertificationRuleRequest,
  GetProductCertificationRuleResponse,
  GetRecommendAttributeRequest,
  GetRecommendAttributeResponse,
  GetSizeChartDetailRequest,
  GetSizeChartDetailResponse,
  GetSizeChartListRequest,
  GetSizeChartListResponse,
  GetSspDetailRequest,
  GetSspDetailResponse,
  GetSspRecommendationRequest,
  GetSspRecommendationResponse,
  GetVariationsRequest,
  GetVariationsResponse,
  GetVehicleListByCompatibilityDetailRequest,
  GetVehicleListByCompatibilityDetailResponse,
  GetWeightRecommendationRequest,
  GetWeightRecommendationResponse,
  InitTierVariationRequest,
  InitTierVariationResponse,
  LinkItemToSspRequest,
  LinkItemToSspResponse,
  PublishItemToOutletShopRequest,
  PublishItemToOutletShopResponse,
  RegisterBrandRequest,
  RegisterBrandResponse,
  ReplyCommentRequest,
  ReplyCommentResponse,
  SearchAttributeValueListRequest,
  SearchAttributeValueListResponse,
  SearchItemRequest,
  SearchItemResponse,
  SearchSspListRequest,
  SearchSspListResponse,
  SearchUnpackagedModelListRequest,
  SearchUnpackagedModelListResponse,
  UnlinkItemFromSspRequest,
  UnlinkItemFromSspResponse,
  UnlistItemRequest,
  UnlistItemResponse,
  UpdateItemRequest,
  UpdateItemResponse,
  UpdateKitItemRequest,
  UpdateKitItemResponse,
  UpdateModelRequest,
  UpdateModelResponse,
  UpdatePriceRequest,
  UpdatePriceResponse,
  UpdateSipItemPriceRequest,
  UpdateSipItemPriceResponse,
  UpdateStockRequest,
  UpdateStockResponse,
  UpdateTierVariationRequest,
  UpdateTierVariationResponse,
} from "../schemas/product.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class ProductManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add a new item.
   *
   * @param {AddItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddItemResponse>} Promise resolving to the response
   */
  public async addItem(params: AddItemRequest, options?: RequestOptions): Promise<AddItemResponse> {
    return ShopeeFetch.fetch<AddItemResponse>(this.config, "/product/add_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Create the kit item by selecting multiple items and setting main component and quantity per kit.
   *
   * @param {AddKitItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddKitItemResponse>} Promise resolving to the response
   */
  public async addKitItem(
    params: AddKitItemRequest,
    options?: RequestOptions
  ): Promise<AddKitItemResponse> {
    return ShopeeFetch.fetch<AddKitItemResponse>(this.config, "/product/add_kit_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Add model. More detail please check: https://open.shopee.com/developer-guide/219
   *
   * @param {AddModelRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddModelResponse>} Promise resolving to the response
   */
  public async addModel(
    params: AddModelRequest,
    options?: RequestOptions
  ): Promise<AddModelResponse> {
    return ShopeeFetch.fetch<AddModelResponse>(this.config, "/product/add_model", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Create asynchronous task to batch add item
   *
   * @param {BatchAddItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BatchAddItemResponse>} Promise resolving to the response
   */
  public async batchAddItem(
    params: BatchAddItemRequest,
    options?: RequestOptions
  ): Promise<BatchAddItemResponse> {
    return ShopeeFetch.fetch<BatchAddItemResponse>(this.config, "/product/batch_add_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Create asynchronous task to batch publish outlet item
   *
   * @param {BatchPublishItemToOutletShopRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BatchPublishItemToOutletShopResponse>} Promise resolving to the response
   */
  public async batchPublishItemToOutletShop(
    params: BatchPublishItemToOutletShopRequest,
    options?: RequestOptions
  ): Promise<BatchPublishItemToOutletShopResponse> {
    return ShopeeFetch.fetch<BatchPublishItemToOutletShopResponse>(
      this.config,
      "/product/batch_publish_item_to_outlet_shop",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Create asynchronous task to batch update outlet item's price
   *
   * @param {BatchUpdateOutletPriceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BatchUpdateOutletPriceResponse>} Promise resolving to the response
   */
  public async batchUpdateOutletPrice(
    params: BatchUpdateOutletPriceRequest,
    options?: RequestOptions
  ): Promise<BatchUpdateOutletPriceResponse> {
    return ShopeeFetch.fetch<BatchUpdateOutletPriceResponse>(
      this.config,
      "/product/batch_update_outlet_price",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Create asynchronous task to batch update outlet stock
   *
   * @param {BatchUpdateOutletStockRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BatchUpdateOutletStockResponse>} Promise resolving to the response
   */
  public async batchUpdateOutletStock(
    params: BatchUpdateOutletStockRequest,
    options?: RequestOptions
  ): Promise<BatchUpdateOutletStockResponse> {
    return ShopeeFetch.fetch<BatchUpdateOutletStockResponse>(
      this.config,
      "/product/batch_update_outlet_stock",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Boost item.
   *
   * @param {BoostItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BoostItemResponse>} Promise resolving to the response
   */
  public async boostItem(
    params: BoostItemRequest,
    options?: RequestOptions
  ): Promise<BoostItemResponse> {
    return ShopeeFetch.fetch<BoostItemResponse>(this.config, "/product/boost_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Recommend category by item name.
   *
   * @param {CategoryRecommendRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CategoryRecommendResponse>} Promise resolving to the response
   */
  public async categoryRecommend(
    params: CategoryRecommendRequest,
    options?: RequestOptions
  ): Promise<CategoryRecommendResponse> {
    return ShopeeFetch.fetch<CategoryRecommendResponse>(
      this.config,
      "/product/category_recommend",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to delete a product item.
   *
   * @param {DeleteItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteItemResponse>} Promise resolving to the response
   */
  public async deleteItem(
    params: DeleteItemRequest,
    options?: RequestOptions
  ): Promise<DeleteItemResponse> {
    return ShopeeFetch.fetch<DeleteItemResponse>(this.config, "/product/delete_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Delete item model.
   *
   * @param {DeleteModelRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteModelResponse>} Promise resolving to the response
   */
  public async deleteModel(
    params: DeleteModelRequest,
    options?: RequestOptions
  ): Promise<DeleteModelResponse> {
    return ShopeeFetch.fetch<DeleteModelResponse>(this.config, "/product/delete_model", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * This API generates a single consolidated image by combining the cover images of all selected items. It is typically used to create a unified product display image for kits or bundles.
   *
   * @param {GenerateKitImageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GenerateKitImageResponse>} Promise resolving to the response
   */
  public async generateKitImage(
    params: GenerateKitImageRequest,
    options?: RequestOptions
  ): Promise<GenerateKitImageResponse> {
    return ShopeeFetch.fetch<GenerateKitImageResponse>(this.config, "/product/generate_kit_image", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Get the list of A Items under SIP Affiliate Shop corresponding to P Items under SIP Primary Shop.
   *
   * @param {GetAitemByPitemIdRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAitemByPitemIdResponse>} Promise resolving to the response
   */
  public async getAitemByPitemId(
    params: GetAitemByPitemIdRequest,
    options?: RequestOptions
  ): Promise<GetAitemByPitemIdResponse> {
    return ShopeeFetch.fetch<GetAitemByPitemIdResponse>(
      this.config,
      "/product/get_aitem_by_pitem_id",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this Open API to get all vehicle list.
   *
   * @param {GetAllVehicleListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAllVehicleListResponse>} Promise resolving to the response
   */
  public async getAllVehicleList(
    params: GetAllVehicleListRequest,
    options?: RequestOptions
  ): Promise<GetAllVehicleListResponse> {
    return ShopeeFetch.fetch<GetAllVehicleListResponse>(
      this.config,
      "/product/get_all_vehicle_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the attribute tree for categories
   *
   * @param {GetAttributeTreeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAttributeTreeResponse>} Promise resolving to the response
   */
  public async getAttributeTree(
    params: GetAttributeTreeRequest,
    options?: RequestOptions
  ): Promise<GetAttributeTreeResponse> {
    return ShopeeFetch.fetch<GetAttributeTreeResponse>(this.config, "/product/get_attribute_tree", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Query batch task result
   *
   * @param {GetBatchTaskResultRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBatchTaskResultResponse>} Promise resolving to the response
   */
  public async getBatchTaskResult(
    params: GetBatchTaskResultRequest,
    options?: RequestOptions
  ): Promise<GetBatchTaskResultResponse> {
    return ShopeeFetch.fetch<GetBatchTaskResultResponse>(
      this.config,
      "/product/get_batch_task_result",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get boosted item list.
   *
   * @param {GetBoostedListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBoostedListResponse>} Promise resolving to the response
   */
  public async getBoostedList(
    params?: GetBoostedListRequest,
    options?: RequestOptions
  ): Promise<GetBoostedListResponse> {
    return ShopeeFetch.fetch<GetBoostedListResponse>(this.config, "/product/get_boosted_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get the brand data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
   *
   * @param {GetBrandListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBrandListResponse>} Promise resolving to the response
   */
  public async getBrandList(
    params: GetBrandListRequest,
    options?: RequestOptions
  ): Promise<GetBrandListResponse> {
    return ShopeeFetch.fetch<GetBrandListResponse>(this.config, "/product/get_brand_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get category tree data. More detail please check https://open.shopee.com/developer-guide/209
   *
   * @param {GetCategoryRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetCategoryResponse>} Promise resolving to the response
   */
  public async getCategory(
    params?: GetCategoryRequest,
    options?: RequestOptions
  ): Promise<GetCategoryResponse> {
    return ShopeeFetch.fetch<GetCategoryResponse>(this.config, "/product/get_category", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Use this api to get comment by shop_id, item_id, or comment_id, get up to 1000 comments.
   *
   * @param {GetCommentRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetCommentResponse>} Promise resolving to the response
   */
  public async getComment(
    params: GetCommentRequest,
    options?: RequestOptions
  ): Promise<GetCommentResponse> {
    return ShopeeFetch.fetch<GetCommentResponse>(this.config, "/product/get_comment", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.item_comment_list.create_time",
        "response.item_comment_list.comment_reply.create_time",
      ],
    });
  }
  /**
   * get direct item by main item.
   *
   * @param {GetDirectItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetDirectItemListResponse>} Promise resolving to the response
   */
  public async getDirectItemList(
    params: GetDirectItemListRequest,
    options?: RequestOptions
  ): Promise<GetDirectItemListResponse> {
    return ShopeeFetch.fetch<GetDirectItemListResponse>(
      this.config,
      "/product/get_direct_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * get recommend price for direct shop.
   *
   * @param {GetDirectShopRecommendedPriceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetDirectShopRecommendedPriceResponse>} Promise resolving to the response
   */
  public async getDirectShopRecommendedPrice(
    params: GetDirectShopRecommendedPriceRequest,
    options?: RequestOptions
  ): Promise<GetDirectShopRecommendedPriceResponse> {
    return ShopeeFetch.fetch<GetDirectShopRecommendedPriceResponse>(
      this.config,
      "/product/get_direct_shop_recommended_price",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to get basic info of item by item_id list.
   *
   * @param {GetItemBaseInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemBaseInfoResponse>} Promise resolving to the response
   */
  public async getItemBaseInfo(
    params: GetItemBaseInfoRequest,
    options?: RequestOptions
  ): Promise<GetItemBaseInfoResponse> {
    return ShopeeFetch.fetch<GetItemBaseInfoResponse>(this.config, "/product/get_item_base_info", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.item_list.create_time",
        "response.item_list.update_time",
        "response.item_list.scheduled_publish_time",
      ],
    });
  }
  /**
   * Get the content quality details (including content quality level, content issues, and system suggestions) for specific product list.
   *
   * @param {GetItemContentDiagnosisResultRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemContentDiagnosisResultResponse>} Promise resolving to the response
   */
  public async getItemContentDiagnosisResult(
    params: GetItemContentDiagnosisResultRequest,
    options?: RequestOptions
  ): Promise<GetItemContentDiagnosisResultResponse> {
    return ShopeeFetch.fetch<GetItemContentDiagnosisResultResponse>(
      this.config,
      "/product/get_item_content_diagnosis_result",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to get extra info of item by item_id list.
   *
   * @param {GetItemExtraInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemExtraInfoResponse>} Promise resolving to the response
   */
  public async getItemExtraInfo(
    params: GetItemExtraInfoRequest,
    options?: RequestOptions
  ): Promise<GetItemExtraInfoResponse> {
    return ShopeeFetch.fetch<GetItemExtraInfoResponse>(
      this.config,
      "/product/get_item_extra_info",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get item upload control.
   *
   * @param {GetItemLimitRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemLimitResponse>} Promise resolving to the response
   */
  public async getItemLimit(
    params?: GetItemLimitRequest,
    options?: RequestOptions
  ): Promise<GetItemLimitResponse> {
    return ShopeeFetch.fetch<GetItemLimitResponse>(this.config, "/product/get_item_limit", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Use this call to get a list of items.
   *
   * @param {GetItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemListResponse>} Promise resolving to the response
   */
  public async getItemList(
    params: GetItemListRequest,
    options?: RequestOptions
  ): Promise<GetItemListResponse> {
    return ShopeeFetch.fetch<GetItemListResponse>(this.config, "/product/get_item_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: ["response.item.update_time"],
    });
  }
  /**
   * Query the list of products and their content quality details by content quality level or content issues.
   *
   * @param {GetItemListByContentDiagnosisRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemListByContentDiagnosisResponse>} Promise resolving to the response
   */
  public async getItemListByContentDiagnosis(
    params: GetItemListByContentDiagnosisRequest,
    options?: RequestOptions
  ): Promise<GetItemListByContentDiagnosisResponse> {
    return ShopeeFetch.fetch<GetItemListByContentDiagnosisResponse>(
      this.config,
      "/product/get_item_list_by_content_diagnosis",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get item promotion info.
   *
   * @param {GetItemPromotionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemPromotionResponse>} Promise resolving to the response
   */
  public async getItemPromotion(
    params: GetItemPromotionRequest,
    options?: RequestOptions
  ): Promise<GetItemPromotionResponse> {
    return ShopeeFetch.fetch<GetItemPromotionResponse>(this.config, "/product/get_item_promotion", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.success_list.promotion.start_time",
        "response.success_list.promotion.end_time",
      ],
    });
  }
  /**
   * get item violation info
   *
   * @param {GetItemViolationInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemViolationInfoResponse>} Promise resolving to the response
   */
  public async getItemViolationInfo(
    params: GetItemViolationInfoRequest,
    options?: RequestOptions
  ): Promise<GetItemViolationInfoResponse> {
    return ShopeeFetch.fetch<GetItemViolationInfoResponse>(
      this.config,
      "/product/get_item_violation_info",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: [
          "response.item_list.item_status_details.fix_deadline_time",
          "response.item_list.item_status_details.update_time",
          "response.item_list.deboost_details.fix_deadline_time",
          "response.item_list.deboost_details.update_time",
        ],
      }
    );
  }
  /**
   * Get the kit basic information and kit components.
   *
   * @param {GetKitItemInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetKitItemInfoResponse>} Promise resolving to the response
   */
  public async getKitItemInfo(
    params: GetKitItemInfoRequest,
    options?: RequestOptions
  ): Promise<GetKitItemInfoResponse> {
    return ShopeeFetch.fetch<GetKitItemInfoResponse>(this.config, "/product/get_kit_item_info", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get the limit of Kit item.
   *
   * @param {GetKitItemLimitRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetKitItemLimitResponse>} Promise resolving to the response
   */
  public async getKitItemLimit(
    params?: GetKitItemLimitRequest,
    options?: RequestOptions
  ): Promise<GetKitItemLimitResponse> {
    return ShopeeFetch.fetch<GetKitItemLimitResponse>(this.config, "/product/get_kit_item_limit", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * get main item by direct item.
   *
   * @param {GetMainItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMainItemListResponse>} Promise resolving to the response
   */
  public async getMainItemList(
    params: GetMainItemListRequest,
    options?: RequestOptions
  ): Promise<GetMainItemListResponse> {
    return ShopeeFetch.fetch<GetMainItemListResponse>(this.config, "/product/get_main_item_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get the mapping information between a Mart item and its corresponding outlet item by outlet item ID.
   *
   * @param {GetMartItemByOutletItemIdRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMartItemByOutletItemIdResponse>} Promise resolving to the response
   */
  public async getMartItemByOutletItemId(
    params: GetMartItemByOutletItemIdRequest,
    options?: RequestOptions
  ): Promise<GetMartItemByOutletItemIdResponse> {
    return ShopeeFetch.fetch<GetMartItemByOutletItemIdResponse>(
      this.config,
      "/product/get_mart_item_by_outlet_item_id",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get the mapping information between a Mart item and its corresponding outlet item by item ID.
   *
   * @param {GetMartItemMappingByIdRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMartItemMappingByIdResponse>} Promise resolving to the response
   */
  public async getMartItemMappingById(
    params: GetMartItemMappingByIdRequest,
    options?: RequestOptions
  ): Promise<GetMartItemMappingByIdResponse> {
    return ShopeeFetch.fetch<GetMartItemMappingByIdResponse>(
      this.config,
      "/product/get_mart_item_mapping_by_id",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get model list of an item.
   *
   * @param {GetModelListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetModelListResponse>} Promise resolving to the response
   */
  public async getModelList(
    params: GetModelListRequest,
    options?: RequestOptions
  ): Promise<GetModelListResponse> {
    return ShopeeFetch.fetch<GetModelListResponse>(this.config, "/product/get_model_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get product certification rule
   *
   * @param {GetProductCertificationRuleRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProductCertificationRuleResponse>} Promise resolving to the response
   */
  public async getProductCertificationRule(
    params?: GetProductCertificationRuleRequest,
    options?: RequestOptions
  ): Promise<GetProductCertificationRuleResponse> {
    return ShopeeFetch.fetch<GetProductCertificationRuleResponse>(
      this.config,
      "/product/get_product_certification_rule",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Get recommend attributes.
   *
   * @param {GetRecommendAttributeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetRecommendAttributeResponse>} Promise resolving to the response
   */
  public async getRecommendAttribute(
    params: GetRecommendAttributeRequest,
    options?: RequestOptions
  ): Promise<GetRecommendAttributeResponse> {
    return ShopeeFetch.fetch<GetRecommendAttributeResponse>(
      this.config,
      "/product/get_recommend_attribute",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get new size chart detail. Now only local shop support to use this api to get new size chart detail.
   *
   * @param {GetSizeChartDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSizeChartDetailResponse>} Promise resolving to the response
   */
  public async getSizeChartDetail(
    params: GetSizeChartDetailRequest,
    options?: RequestOptions
  ): Promise<GetSizeChartDetailResponse> {
    return ShopeeFetch.fetch<GetSizeChartDetailResponse>(
      this.config,
      "/product/get_size_chart_detail",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get new size chart list. Now only support local shop to use new size chart.
   *
   * @param {GetSizeChartListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSizeChartListResponse>} Promise resolving to the response
   */
  public async getSizeChartList(
    params: GetSizeChartListRequest,
    options?: RequestOptions
  ): Promise<GetSizeChartListResponse> {
    return ShopeeFetch.fetch<GetSizeChartListResponse>(
      this.config,
      "/product/get_size_chart_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the details of an SSP or CSSP. At least one of ssp_id and cssp_id is required, and cssp_id takes priority when both are provided.The response covers the product content such as the category path, attributes, brand and variations. Each entry in cssps is a country-specific SSP under the SSP, and its tier_indices point to the selected options of the parent tier_variation.
   *
   * @param {GetSspDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSspDetailResponse>} Promise resolving to the response
   */
  public async getSspDetail(
    params?: GetSspDetailRequest,
    options?: RequestOptions
  ): Promise<GetSspDetailResponse> {
    return ShopeeFetch.fetch<GetSspDetailResponse>(this.config, "/product/get_ssp_detail", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get the SSP enrollment recommendations of the authorized shop, separating items that can be enrolled automatically from items that may be enrolled after further action.auto_enroll_time is the automatic enrollment time in seconds as a future timestamp, returned for automatic enrollment only.
   *
   * @param {GetSspRecommendationRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSspRecommendationResponse>} Promise resolving to the response
   */
  public async getSspRecommendation(
    params?: GetSspRecommendationRequest,
    options?: RequestOptions
  ): Promise<GetSspRecommendationResponse> {
    return ShopeeFetch.fetch<GetSspRecommendationResponse>(
      this.config,
      "/product/get_ssp_recommendation",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure.
   * The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
   *
   * @param {GetVariationsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVariationsResponse>} Promise resolving to the response
   */
  public async getVariations(
    params: GetVariationsRequest,
    options?: RequestOptions
  ): Promise<GetVariationsResponse> {
    return ShopeeFetch.fetch<GetVariationsResponse>(this.config, "/product/get_variation_tree", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Use this Open API to get vehicle list by brand, model, year, and version.
   *
   * @param {GetVehicleListByCompatibilityDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVehicleListByCompatibilityDetailResponse>} Promise resolving to the response
   */
  public async getVehicleListByCompatibilityDetail(
    params: GetVehicleListByCompatibilityDetailRequest,
    options?: RequestOptions
  ): Promise<GetVehicleListByCompatibilityDetailResponse> {
    return ShopeeFetch.fetch<GetVehicleListByCompatibilityDetailResponse>(
      this.config,
      "/product/get_vehicle_list_by_compatibility_detail",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get recommended weight. Now only BR shop support to use this api to get recommended weight.
   *
   * @param {GetWeightRecommendationRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetWeightRecommendationResponse>} Promise resolving to the response
   */
  public async getWeightRecommendation(
    params: GetWeightRecommendationRequest,
    options?: RequestOptions
  ): Promise<GetWeightRecommendationResponse> {
    return ShopeeFetch.fetch<GetWeightRecommendationResponse>(
      this.config,
      "/product/get_weight_recommendation",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * This API allows you to update the tier structure of a product. Defining only color creates one tier, while color + size creates two tiers (maximum supported). Supported changes include: no tier ↔ one/two tiers, one tier ↔ two/no tier, and two tiers ↔ one/no tier. For details, see Developer Guide. Please wait at least 5 seconds after creating an item before creating variants, as processing may be delayed.
   *
   * @param {InitTierVariationRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<InitTierVariationResponse>} Promise resolving to the response
   */
  public async initTierVariation(
    params: InitTierVariationRequest,
    options?: RequestOptions
  ): Promise<InitTierVariationResponse> {
    return ShopeeFetch.fetch<InitTierVariationResponse>(
      this.config,
      "/product/init_tier_variation",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Link one or more models of an item to their country-specific SSPs. item_id and model_cssp_pairs are required, and each pair must contain model_id and cssp_id; ssp_id is optional.
   *
   * @param {LinkItemToSspRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<LinkItemToSspResponse>} Promise resolving to the response
   */
  public async linkItemToSsp(
    params: LinkItemToSspRequest,
    options?: RequestOptions
  ): Promise<LinkItemToSspResponse> {
    return ShopeeFetch.fetch<LinkItemToSspResponse>(this.config, "/product/link_item_to_ssp", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * This API supports publishing an existing item from the mart shop to an outlet shop.
   *
   * @param {PublishItemToOutletShopRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<PublishItemToOutletShopResponse>} Promise resolving to the response
   */
  public async publishItemToOutletShop(
    params: PublishItemToOutletShopRequest,
    options?: RequestOptions
  ): Promise<PublishItemToOutletShopResponse> {
    return ShopeeFetch.fetch<PublishItemToOutletShopResponse>(
      this.config,
      "/product/publish_item_to_outlet_shop",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to register a brand.
   *
   * @param {RegisterBrandRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<RegisterBrandResponse>} Promise resolving to the response
   */
  public async registerBrand(
    params: RegisterBrandRequest,
    options?: RequestOptions
  ): Promise<RegisterBrandResponse> {
    return ShopeeFetch.fetch<RegisterBrandResponse>(this.config, "/product/register_brand", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this api to reply comments from buyers in batch.
   *
   * @param {ReplyCommentRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ReplyCommentResponse>} Promise resolving to the response
   */
  public async replyComment(
    params: ReplyCommentRequest,
    options?: RequestOptions
  ): Promise<ReplyCommentResponse> {
    return ShopeeFetch.fetch<ReplyCommentResponse>(this.config, "/product/reply_comment", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * this api is for searching attribute value list for attribute with support_search_value flag
   *
   * @param {SearchAttributeValueListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SearchAttributeValueListResponse>} Promise resolving to the response
   */
  public async searchAttributeValueList(
    params: SearchAttributeValueListRequest,
    options?: RequestOptions
  ): Promise<SearchAttributeValueListResponse> {
    return ShopeeFetch.fetch<SearchAttributeValueListResponse>(
      this.config,
      "/product/search_attribute_value_list",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to search item.
   *
   * @param {SearchItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SearchItemResponse>} Promise resolving to the response
   */
  public async searchItem(
    params: SearchItemRequest,
    options?: RequestOptions
  ): Promise<SearchItemResponse> {
    return ShopeeFetch.fetch<SearchItemResponse>(this.config, "/product/search_item", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Search SSPs by title or by image. At most 50 results are returned.When image_id_list is provided, the search is based on image similarity and title is ignored; otherwise title must contain at least three characters.
   *
   * @param {SearchSspListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SearchSspListResponse>} Promise resolving to the response
   */
  public async searchSspList(
    params?: SearchSspListRequest,
    options?: RequestOptions
  ): Promise<SearchSspListResponse> {
    return ShopeeFetch.fetch<SearchSspListResponse>(this.config, "/product/search_ssp_list", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this API to retrieve Unpackaged SKU ID information for items that toggle on logistics channel 30029.
   *
   * @param {SearchUnpackagedModelListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SearchUnpackagedModelListResponse>} Promise resolving to the response
   */
  public async searchUnpackagedModelList(
    params: SearchUnpackagedModelListRequest,
    options?: RequestOptions
  ): Promise<SearchUnpackagedModelListResponse> {
    return ShopeeFetch.fetch<SearchUnpackagedModelListResponse>(
      this.config,
      "/product/search_unpackaged_model_list",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Remove the SSP links of one or more models of an item. item_id and model_cssp_pairs are required, and each pair must contain model_id and cssp_id; ssp_id is optional.
   *
   * @param {UnlinkItemFromSspRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UnlinkItemFromSspResponse>} Promise resolving to the response
   */
  public async unlinkItemFromSsp(
    params: UnlinkItemFromSspRequest,
    options?: RequestOptions
  ): Promise<UnlinkItemFromSspResponse> {
    return ShopeeFetch.fetch<UnlinkItemFromSspResponse>(
      this.config,
      "/product/unlink_item_from_ssp",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Unlist item.
   *
   * @param {UnlistItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UnlistItemResponse>} Promise resolving to the response
   */
  public async unlistItem(
    params: UnlistItemRequest,
    options?: RequestOptions
  ): Promise<UnlistItemResponse> {
    return ShopeeFetch.fetch<UnlistItemResponse>(this.config, "/product/unlist_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Update item.
   *
   * @param {UpdateItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateItemResponse>} Promise resolving to the response
   */
  public async updateItem(
    params: UpdateItemRequest,
    options?: RequestOptions
  ): Promise<UpdateItemResponse> {
    return ShopeeFetch.fetch<UpdateItemResponse>(this.config, "/product/update_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Update the kit basic information and kit components, only support adding kit variations and updating existing kit variation’s image, price, and model_sku, don’t support deleting existing kit variations and updating the items, main component and quantity per kit of existing kit variations.
   *
   * @param {UpdateKitItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateKitItemResponse>} Promise resolving to the response
   */
  public async updateKitItem(
    params: UpdateKitItemRequest,
    options?: RequestOptions
  ): Promise<UpdateKitItemResponse> {
    return ShopeeFetch.fetch<UpdateKitItemResponse>(this.config, "/product/update_kit_item", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Update seller sku/ pre order/ model status for model.
   *
   * @param {UpdateModelRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateModelResponse>} Promise resolving to the response
   */
  public async updateModel(
    params: UpdateModelRequest,
    options?: RequestOptions
  ): Promise<UpdateModelResponse> {
    return ShopeeFetch.fetch<UpdateModelResponse>(this.config, "/product/update_model", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Update price.
   *
   * @param {UpdatePriceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdatePriceResponse>} Promise resolving to the response
   */
  public async updatePrice(
    params: UpdatePriceRequest,
    options?: RequestOptions
  ): Promise<UpdatePriceResponse> {
    return ShopeeFetch.fetch<UpdatePriceResponse>(this.config, "/product/update_price", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Update sip item price.
   *
   * @param {UpdateSipItemPriceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateSipItemPriceResponse>} Promise resolving to the response
   */
  public async updateSipItemPrice(
    params: UpdateSipItemPriceRequest,
    options?: RequestOptions
  ): Promise<UpdateSipItemPriceResponse> {
    return ShopeeFetch.fetch<UpdateSipItemPriceResponse>(
      this.config,
      "/product/update_sip_item_price",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to update one item_id for each call, but still can support updating multiple model_ids stock of the same item_id (If you need batch modification, please call multiple times)This API will update only "seller_stock".Whenever there is a promotion ongoing or upcoming, the total stock must be larger than or equal to real-time “reserved_stock” promotion stock (Please check v2.get_item_promotion API for more details). Items that are deleted will not be allowed to modify stock.
   *
   * @param {UpdateStockRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateStockResponse>} Promise resolving to the response
   */
  public async updateStock(
    params: UpdateStockRequest,
    options?: RequestOptions
  ): Promise<UpdateStockResponse> {
    return ShopeeFetch.fetch<UpdateStockResponse>(this.config, "/product/update_stock", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api. More detail please check: https://open.shopee.com/developer-guide/219
   *
   * @param {UpdateTierVariationRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateTierVariationResponse>} Promise resolving to the response
   */
  public async updateTierVariation(
    params: UpdateTierVariationRequest,
    options?: RequestOptions
  ): Promise<UpdateTierVariationResponse> {
    return ShopeeFetch.fetch<UpdateTierVariationResponse>(
      this.config,
      "/product/update_tier_variation",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
