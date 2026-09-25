// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_buybox_model_performance
 *
 * Get Buybox model performance by model IDs for the authorized shop.
 */
export interface GetBuyboxModelPerformanceRequest {
  model_id_list: number[];
}
/**
 * GetBuyboxModelPerformancePerformance sub-interface for GetBuyboxModelPerformanceResponseData
 */
export interface GetBuyboxModelPerformancePerformance {
  model_id?: number;
  past_7_days_sold_count?: number;
}
/**
 * GetBuyboxModelPerformanceResponseData sub-interface for GetBuyboxModelPerformanceResponse
 */
export interface GetBuyboxModelPerformanceResponseData {
  performance_list?: GetBuyboxModelPerformancePerformance[];
  data_updated_time?: string;
}
/**
 * Response payload for get_buybox_model_performance
 *
 * Get Buybox model performance by model IDs for the authorized shop.
 */
export type GetBuyboxModelPerformanceResponse =
  FetchResponse<GetBuyboxModelPerformanceResponseData>;
/**
 * Request parameters for get_buybox_models_by_model_id
 *
 * Get Buybox model information by model IDs for the authorized shop.
 */
export interface GetBuyboxModelsByModelIdRequest {
  model_id_list: number[];
}
/**
 * GetBuyboxModelsByModelIdModel sub-interface for GetBuyboxModelsByModelIdResponseData
 */
export interface GetBuyboxModelsByModelIdModel {
  model_id?: number;
  is_model_mapped?: boolean;
  is_eligible?: boolean;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
}
/**
 * GetBuyboxModelsByModelIdResponseData sub-interface for GetBuyboxModelsByModelIdResponse
 */
export interface GetBuyboxModelsByModelIdResponseData {
  model_list?: GetBuyboxModelsByModelIdModel[];
}
/**
 * Response payload for get_buybox_models_by_model_id
 *
 * Get Buybox model information by model IDs for the authorized shop.
 */
export type GetBuyboxModelsByModelIdResponse = FetchResponse<GetBuyboxModelsByModelIdResponseData>;
/**
 * Request parameters for get_buybox_models_by_shop_id
 *
 * Get the paginated Buybox model list for the authorized shop.
 */
export interface GetBuyboxModelsByShopIdRequest {
  /**
   * Pagination offset. Must be non-negative.
   */
  offset?: number;
  /**
   * Page size. Valid range is 1 to 250.
   */
  limit?: number;
}
/**
 * GetBuyboxModelsByShopIdModel sub-interface for GetBuyboxModelsByShopIdResponseData
 */
export interface GetBuyboxModelsByShopIdModel {
  model_id?: number;
  is_model_mapped?: boolean;
  is_eligible?: boolean;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
}
/**
 * GetBuyboxModelsByShopIdPageInfo sub-interface for GetBuyboxModelsByShopIdResponseData
 */
export interface GetBuyboxModelsByShopIdPageInfo {
  offset?: number;
  limit?: number;
  total_count?: number;
}
/**
 * GetBuyboxModelsByShopIdResponseData sub-interface for GetBuyboxModelsByShopIdResponse
 */
export interface GetBuyboxModelsByShopIdResponseData {
  model_list?: GetBuyboxModelsByShopIdModel[];
  page_info?: GetBuyboxModelsByShopIdPageInfo;
  shop_id?: number;
}
/**
 * Response payload for get_buybox_models_by_shop_id
 *
 * Get the paginated Buybox model list for the authorized shop.
 */
export type GetBuyboxModelsByShopIdResponse = FetchResponse<GetBuyboxModelsByShopIdResponseData>;
/**
 * Request parameters for get_buybox_shop_performance
 *
 * Get Buybox shop performance for the authorized shop.
 */
export type GetBuyboxShopPerformanceRequest = Record<string, never>;
/**
 * GetBuyboxShopPerformanceResponseData sub-interface for GetBuyboxShopPerformanceResponse
 */
export interface GetBuyboxShopPerformanceResponseData {
  past_7_days_sold_count?: number;
  total_sold_count?: number;
  sales?: number;
  data_updated_time?: string;
  shop_id?: number;
}
/**
 * Response payload for get_buybox_shop_performance
 *
 * Get Buybox shop performance for the authorized shop.
 */
export type GetBuyboxShopPerformanceResponse = FetchResponse<GetBuyboxShopPerformanceResponseData>;
/**
 * Request parameters for update_buybox_model_enrollment
 *
 * Update Buybox model enrollment status for the authorized shop.
 */
export interface UpdateBuyboxModelEnrollmentRequest {
  model_id: number;
  model_toggle_on_status: boolean;
}
/**
 * UpdateBuyboxModelEnrollmentResponseData sub-interface for UpdateBuyboxModelEnrollmentResponse
 */
export interface UpdateBuyboxModelEnrollmentResponseData {
  model_id?: number;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
  shop_id?: number;
}
/**
 * Response payload for update_buybox_model_enrollment
 *
 * Update Buybox model enrollment status for the authorized shop.
 */
export type UpdateBuyboxModelEnrollmentResponse =
  FetchResponse<UpdateBuyboxModelEnrollmentResponseData>;
