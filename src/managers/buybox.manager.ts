// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetBuyboxModelPerformanceRequest,
  GetBuyboxModelPerformanceResponse,
  GetBuyboxModelsByModelIdRequest,
  GetBuyboxModelsByModelIdResponse,
  GetBuyboxModelsByShopIdRequest,
  GetBuyboxModelsByShopIdResponse,
  GetBuyboxShopPerformanceRequest,
  GetBuyboxShopPerformanceResponse,
  UpdateBuyboxModelEnrollmentRequest,
  UpdateBuyboxModelEnrollmentResponse,
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
}
