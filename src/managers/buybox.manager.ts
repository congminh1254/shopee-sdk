// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetBuyboxModelPerformanceRequest,
  GetBuyboxModelPerformanceResponse,
  GetBuyboxModelPerformanceonlyforbrnowRequest,
  GetBuyboxModelPerformanceonlyforbrnowResponse,
  GetBuyboxModelsByModelIdRequest,
  GetBuyboxModelsByModelIdResponse,
  GetBuyboxModelsByModelIdonlyforbrnowRequest,
  GetBuyboxModelsByModelIdonlyforbrnowResponse,
  GetBuyboxModelsByShopIdRequest,
  GetBuyboxModelsByShopIdResponse,
  GetBuyboxModelsByShopIdonlyforbrnowRequest,
  GetBuyboxModelsByShopIdonlyforbrnowResponse,
  GetBuyboxShopPerformanceRequest,
  GetBuyboxShopPerformanceResponse,
  GetBuyboxShopPerformanceonlyforbrnowRequest,
  GetBuyboxShopPerformanceonlyforbrnowResponse,
  UpdateBuyboxModelEnrollmentRequest,
  UpdateBuyboxModelEnrollmentResponse,
  UpdateBuyboxModelEnrollmentonlyforbrnowRequest,
  UpdateBuyboxModelEnrollmentonlyforbrnowResponse,
} from "../schemas/buybox.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class BuyboxManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Get Buybox model performance by model IDs for the authorized shop.
   *
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelPerformanceRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelPerformanceResponse>} Promise resolving to the response
   */
  public async getBuyboxModelPerformance(
    params?: GetBuyboxModelPerformanceRequest
  ): Promise<GetBuyboxModelPerformanceResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelPerformanceResponse>(
      this.config,
      "/buybox/get_buybox_model_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get Buybox model information by model IDs for the authorized shop.
   *
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelsByModelIdRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelsByModelIdResponse>} Promise resolving to the response
   */
  public async getBuyboxModelsByModelId(
    params?: GetBuyboxModelsByModelIdRequest
  ): Promise<GetBuyboxModelsByModelIdResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelsByModelIdResponse>(
      this.config,
      "/buybox/get_buybox_models_by_model_id",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get the paginated Buybox model list for the authorized shop.
   *
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelsByShopIdRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelsByShopIdResponse>} Promise resolving to the response
   */
  public async getBuyboxModelsByShopId(
    params?: GetBuyboxModelsByShopIdRequest
  ): Promise<GetBuyboxModelsByShopIdResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelsByShopIdResponse>(
      this.config,
      "/buybox/get_buybox_models_by_shop_id",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Get Buybox shop performance for the authorized shop.
   *
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxShopPerformanceRequest} params Request parameters
   * @returns {Promise<GetBuyboxShopPerformanceResponse>} Promise resolving to the response
   */
  public async getBuyboxShopPerformance(
    params?: GetBuyboxShopPerformanceRequest
  ): Promise<GetBuyboxShopPerformanceResponse> {
    return ShopeeFetch.fetch<GetBuyboxShopPerformanceResponse>(
      this.config,
      "/buybox/get_buybox_shop_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update Buybox model enrollment status for the authorized shop.
   *
   * Only available in Brazil (BR).
   *
   * @param {UpdateBuyboxModelEnrollmentRequest} params Request parameters
   * @returns {Promise<UpdateBuyboxModelEnrollmentResponse>} Promise resolving to the response
   */
  public async updateBuyboxModelEnrollment(
    params?: UpdateBuyboxModelEnrollmentRequest
  ): Promise<UpdateBuyboxModelEnrollmentResponse> {
    return ShopeeFetch.fetch<UpdateBuyboxModelEnrollmentResponse>(
      this.config,
      "/buybox/update_buybox_model_enrollment",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * @deprecated Use getBuyboxModelPerformance instead.
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelPerformanceonlyforbrnowRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelPerformanceonlyforbrnowResponse>} Promise resolving to the response
   */
  public async getBuyboxModelPerformanceonlyforbrnow(
    params?: GetBuyboxModelPerformanceonlyforbrnowRequest
  ): Promise<GetBuyboxModelPerformanceonlyforbrnowResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelPerformanceonlyforbrnowResponse>(
      this.config,
      "/buybox/get_buybox_model_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * @deprecated Use getBuyboxModelsByModelId instead.
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelsByModelIdonlyforbrnowRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelsByModelIdonlyforbrnowResponse>} Promise resolving to the response
   */
  public async getBuyboxModelsByModelIdonlyforbrnow(
    params?: GetBuyboxModelsByModelIdonlyforbrnowRequest
  ): Promise<GetBuyboxModelsByModelIdonlyforbrnowResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelsByModelIdonlyforbrnowResponse>(
      this.config,
      "/buybox/get_buybox_models_by_model_id",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * @deprecated Use getBuyboxModelsByShopId instead.
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxModelsByShopIdonlyforbrnowRequest} params Request parameters
   * @returns {Promise<GetBuyboxModelsByShopIdonlyforbrnowResponse>} Promise resolving to the response
   */
  public async getBuyboxModelsByShopIdonlyforbrnow(
    params?: GetBuyboxModelsByShopIdonlyforbrnowRequest
  ): Promise<GetBuyboxModelsByShopIdonlyforbrnowResponse> {
    return ShopeeFetch.fetch<GetBuyboxModelsByShopIdonlyforbrnowResponse>(
      this.config,
      "/buybox/get_buybox_models_by_shop_id",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * @deprecated Use getBuyboxShopPerformance instead.
   * Only available in Brazil (BR).
   *
   * @param {GetBuyboxShopPerformanceonlyforbrnowRequest} params Request parameters
   * @returns {Promise<GetBuyboxShopPerformanceonlyforbrnowResponse>} Promise resolving to the response
   */
  public async getBuyboxShopPerformanceonlyforbrnow(
    params?: GetBuyboxShopPerformanceonlyforbrnowRequest
  ): Promise<GetBuyboxShopPerformanceonlyforbrnowResponse> {
    return ShopeeFetch.fetch<GetBuyboxShopPerformanceonlyforbrnowResponse>(
      this.config,
      "/buybox/get_buybox_shop_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * @deprecated Use updateBuyboxModelEnrollment instead.
   * Only available in Brazil (BR).
   *
   * @param {UpdateBuyboxModelEnrollmentonlyforbrnowRequest} params Request parameters
   * @returns {Promise<UpdateBuyboxModelEnrollmentonlyforbrnowResponse>} Promise resolving to the response
   */
  public async updateBuyboxModelEnrollmentonlyforbrnow(
    params?: UpdateBuyboxModelEnrollmentonlyforbrnowRequest
  ): Promise<UpdateBuyboxModelEnrollmentonlyforbrnowResponse> {
    return ShopeeFetch.fetch<UpdateBuyboxModelEnrollmentonlyforbrnowResponse>(
      this.config,
      "/buybox/update_buybox_model_enrollment",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
