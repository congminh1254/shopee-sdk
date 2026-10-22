// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse, Integer } from "./fetch.js";
/**
 * Request parameters for get_buybox_model_performance
 *
 * Get Buybox model performance by model IDs for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export interface GetBuyboxModelPerformanceRequest {
  model_id_list: Integer[];
}
/**
 * GetBuyboxModelPerformancePerformance sub-interface for GetBuyboxModelPerformanceResponseData
 */
export interface GetBuyboxModelPerformancePerformance {
  model_id?: Integer;
  past_7_days_sold_count?: Integer;
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
 *
 * Only available in Brazil (BR).
 */
export type GetBuyboxModelPerformanceResponse =
  FetchResponse<GetBuyboxModelPerformanceResponseData>;
/**
 * Request parameters for get_buybox_models_by_model_id
 *
 * Get Buybox model information by model IDs for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export interface GetBuyboxModelsByModelIdRequest {
  model_id_list: Integer[];
}
/**
 * GetBuyboxModelsByModelIdModel sub-interface for GetBuyboxModelsByModelIdResponseData
 */
export interface GetBuyboxModelsByModelIdModel {
  model_id?: Integer;
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
 *
 * Only available in Brazil (BR).
 */
export type GetBuyboxModelsByModelIdResponse = FetchResponse<GetBuyboxModelsByModelIdResponseData>;
/**
 * Request parameters for get_buybox_models_by_shop_id
 *
 * Get the paginated Buybox model list for the authorized shop.
 *
 * Only available in Brazil (BR).
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
  model_id?: Integer;
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
  shop_id?: Integer;
}
/**
 * Response payload for get_buybox_models_by_shop_id
 *
 * Get the paginated Buybox model list for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export type GetBuyboxModelsByShopIdResponse = FetchResponse<GetBuyboxModelsByShopIdResponseData>;
/**
 * Request parameters for get_buybox_shop_performance
 *
 * Get Buybox shop performance for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export type GetBuyboxShopPerformanceRequest = Record<string, never>;
/**
 * GetBuyboxShopPerformanceResponseData sub-interface for GetBuyboxShopPerformanceResponse
 */
export interface GetBuyboxShopPerformanceResponseData {
  past_7_days_sold_count?: Integer;
  total_sold_count?: Integer;
  sales?: number;
  data_updated_time?: string;
  shop_id?: Integer;
}
/**
 * Response payload for get_buybox_shop_performance
 *
 * Get Buybox shop performance for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export type GetBuyboxShopPerformanceResponse = FetchResponse<GetBuyboxShopPerformanceResponseData>;
/**
 * Request parameters for update_buybox_model_enrollment
 *
 * Update Buybox model enrollment status for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export interface UpdateBuyboxModelEnrollmentRequest {
  model_id: Integer;
  model_toggle_on_status: boolean;
}
/**
 * UpdateBuyboxModelEnrollmentResponseData sub-interface for UpdateBuyboxModelEnrollmentResponse
 */
export interface UpdateBuyboxModelEnrollmentResponseData {
  model_id?: Integer;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
  shop_id?: Integer;
}
/**
 * Response payload for update_buybox_model_enrollment
 *
 * Update Buybox model enrollment status for the authorized shop.
 *
 * Only available in Brazil (BR).
 */
export type UpdateBuyboxModelEnrollmentResponse =
  FetchResponse<UpdateBuyboxModelEnrollmentResponseData>;
