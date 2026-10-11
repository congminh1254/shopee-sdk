// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_buybox_model_performance（onlyforBRnow）
 *
 * Get Buybox model performance by model IDs for the authorized shop.
 */
export interface GetBuyboxModelPerformanceonlyforbrnowRequest {
  model_id_list: number[];
}
/**
 * GetBuyboxModelPerformanceonlyforbrnowPerformance sub-interface for GetBuyboxModelPerformanceonlyforbrnowResponseData
 */
export interface GetBuyboxModelPerformanceonlyforbrnowPerformance {
  model_id?: number;
  past_7_days_sold_count?: number;
}
/**
 * GetBuyboxModelPerformanceonlyforbrnowResponseData sub-interface for GetBuyboxModelPerformanceonlyforbrnowResponse
 */
export interface GetBuyboxModelPerformanceonlyforbrnowResponseData {
  performance_list?: GetBuyboxModelPerformanceonlyforbrnowPerformance[];
  data_updated_time?: string;
}
/**
 * Response payload for get_buybox_model_performance（onlyforBRnow）
 *
 * Get Buybox model performance by model IDs for the authorized shop.
 */
export type GetBuyboxModelPerformanceonlyforbrnowResponse =
  FetchResponse<GetBuyboxModelPerformanceonlyforbrnowResponseData>;
/**
 * Request parameters for get_buybox_models_by_model_id（onlyforBRnow）
 *
 * Get Buybox model information by model IDs for the authorized shop.
 */
export interface GetBuyboxModelsByModelIdonlyforbrnowRequest {
  model_id_list: number[];
}
/**
 * GetBuyboxModelsByModelIdonlyforbrnowModel sub-interface for GetBuyboxModelsByModelIdonlyforbrnowResponseData
 */
export interface GetBuyboxModelsByModelIdonlyforbrnowModel {
  model_id?: number;
  is_model_mapped?: boolean;
  is_eligible?: boolean;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
}
/**
 * GetBuyboxModelsByModelIdonlyforbrnowResponseData sub-interface for GetBuyboxModelsByModelIdonlyforbrnowResponse
 */
export interface GetBuyboxModelsByModelIdonlyforbrnowResponseData {
  model_list?: GetBuyboxModelsByModelIdonlyforbrnowModel[];
}
/**
 * Response payload for get_buybox_models_by_model_id（onlyforBRnow）
 *
 * Get Buybox model information by model IDs for the authorized shop.
 */
export type GetBuyboxModelsByModelIdonlyforbrnowResponse =
  FetchResponse<GetBuyboxModelsByModelIdonlyforbrnowResponseData>;
/**
 * Request parameters for get_buybox_models_by_shop_id（onlyforBRnow）
 *
 * Get the paginated Buybox model list for the authorized shop.
 */
export interface GetBuyboxModelsByShopIdonlyforbrnowRequest {
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
 * GetBuyboxModelsByShopIdonlyforbrnowModel sub-interface for GetBuyboxModelsByShopIdonlyforbrnowResponseData
 */
export interface GetBuyboxModelsByShopIdonlyforbrnowModel {
  model_id?: number;
  is_model_mapped?: boolean;
  is_eligible?: boolean;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
}
/**
 * GetBuyboxModelsByShopIdonlyforbrnowPageInfo sub-interface for GetBuyboxModelsByShopIdonlyforbrnowResponseData
 */
export interface GetBuyboxModelsByShopIdonlyforbrnowPageInfo {
  offset?: number;
  limit?: number;
  total_count?: number;
}
/**
 * GetBuyboxModelsByShopIdonlyforbrnowResponseData sub-interface for GetBuyboxModelsByShopIdonlyforbrnowResponse
 */
export interface GetBuyboxModelsByShopIdonlyforbrnowResponseData {
  model_list?: GetBuyboxModelsByShopIdonlyforbrnowModel[];
  page_info?: GetBuyboxModelsByShopIdonlyforbrnowPageInfo;
  shop_id?: number;
}
/**
 * Response payload for get_buybox_models_by_shop_id（onlyforBRnow）
 *
 * Get the paginated Buybox model list for the authorized shop.
 */
export type GetBuyboxModelsByShopIdonlyforbrnowResponse =
  FetchResponse<GetBuyboxModelsByShopIdonlyforbrnowResponseData>;
/**
 * Request parameters for get_buybox_shop_performance（onlyforBRnow）
 *
 * Get Buybox shop performance for the authorized shop.
 */
export type GetBuyboxShopPerformanceonlyforbrnowRequest = Record<string, never>;
/**
 * GetBuyboxShopPerformanceonlyforbrnowResponseData sub-interface for GetBuyboxShopPerformanceonlyforbrnowResponse
 */
export interface GetBuyboxShopPerformanceonlyforbrnowResponseData {
  past_7_days_sold_count?: number;
  total_sold_count?: number;
  sales?: number;
  data_updated_time?: string;
  shop_id?: number;
}
/**
 * Response payload for get_buybox_shop_performance（onlyforBRnow）
 *
 * Get Buybox shop performance for the authorized shop.
 */
export type GetBuyboxShopPerformanceonlyforbrnowResponse =
  FetchResponse<GetBuyboxShopPerformanceonlyforbrnowResponseData>;
/**
 * Request parameters for update_buybox_model_enrollment（onlyforBRnow）
 *
 * Update Buybox model enrollment status for the authorized shop.
 */
export interface UpdateBuyboxModelEnrollmentonlyforbrnowRequest {
  model_id: number;
  model_toggle_on_status: boolean;
}
/**
 * UpdateBuyboxModelEnrollmentonlyforbrnowResponseData sub-interface for UpdateBuyboxModelEnrollmentonlyforbrnowResponse
 */
export interface UpdateBuyboxModelEnrollmentonlyforbrnowResponseData {
  model_id?: number;
  model_toggle_on_status?: boolean;
  last_updated_time?: string;
  shop_id?: number;
}
/**
 * Response payload for update_buybox_model_enrollment（onlyforBRnow）
 *
 * Update Buybox model enrollment status for the authorized shop.
 */
export type UpdateBuyboxModelEnrollmentonlyforbrnowResponse =
  FetchResponse<UpdateBuyboxModelEnrollmentonlyforbrnowResponseData>;
