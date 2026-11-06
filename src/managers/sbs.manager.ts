// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetBoundWhsInfoRequest,
  GetBoundWhsInfoResponse,
  GetCurrentInventoryRequest,
  GetCurrentInventoryResponse,
  GetExpiryReportRequest,
  GetExpiryReportResponse,
  GetFulfillmentMappingInventoryListRequest,
  GetFulfillmentMappingInventoryListResponse,
  GetStockAgingRequest,
  GetStockAgingResponse,
  GetStockMovementRequest,
  GetStockMovementResponse,
} from "../schemas/sbs.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class SbsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * get bound warehouse by shop id
   *
   * @param {GetBoundWhsInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBoundWhsInfoResponse>} Promise resolving to the response
   */
  public async getBoundWhsInfo(
    params?: GetBoundWhsInfoRequest,
    options?: RequestOptions
  ): Promise<GetBoundWhsInfoResponse> {
    return ShopeeFetch.fetch<GetBoundWhsInfoResponse>(this.config, "/sbs/get_bound_whs_info", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get Seller Center Current Inventory Page Data
   *
   * @param {GetCurrentInventoryRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetCurrentInventoryResponse>} Promise resolving to the response
   */
  public async getCurrentInventory(
    params: GetCurrentInventoryRequest,
    options?: RequestOptions
  ): Promise<GetCurrentInventoryResponse> {
    return ShopeeFetch.fetch<GetCurrentInventoryResponse>(
      this.config,
      "/sbs/get_current_inventory",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Seller Center Expiry Report page data
   *
   * @param {GetExpiryReportRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetExpiryReportResponse>} Promise resolving to the response
   */
  public async getExpiryReport(
    params: GetExpiryReportRequest,
    options?: RequestOptions
  ): Promise<GetExpiryReportResponse> {
    return ShopeeFetch.fetch<GetExpiryReportResponse>(this.config, "/sbs/get_expiry_report", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * This API is designed for sellers using Fulfillment Mapping and their ERP systems.It allows callers to query the corresponding mapping and inventory information using the MTSKU ID of either a Bundle SKU or a Parent SKU, supporting automated inventory reconciliation and planning, improving Parent SKU inventory visibility, and reducing manual operations and cross-channel overselling risks.
   *
   * @param {GetFulfillmentMappingInventoryListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetFulfillmentMappingInventoryListResponse>} Promise resolving to the response
   */
  public async getFulfillmentMappingInventoryList(
    params?: GetFulfillmentMappingInventoryListRequest,
    options?: RequestOptions
  ): Promise<GetFulfillmentMappingInventoryListResponse> {
    return ShopeeFetch.fetch<GetFulfillmentMappingInventoryListResponse>(
      this.config,
      "/sbs/get_fulfillment_mapping_inventory_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get Seller Center Stock Aging page data
   *
   * @param {GetStockAgingRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetStockAgingResponse>} Promise resolving to the response
   */
  public async getStockAging(
    params: GetStockAgingRequest,
    options?: RequestOptions
  ): Promise<GetStockAgingResponse> {
    return ShopeeFetch.fetch<GetStockAgingResponse>(this.config, "/sbs/get_stock_aging", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get Seller Center，Stock Movement page data
   *
   * @param {GetStockMovementRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetStockMovementResponse>} Promise resolving to the response
   */
  public async getStockMovement(
    params: GetStockMovementRequest,
    options?: RequestOptions
  ): Promise<GetStockMovementResponse> {
    return ShopeeFetch.fetch<GetStockMovementResponse>(this.config, "/sbs/get_stock_movement", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
}
