import {
  GetBoundWhsInfoRequest,
  GetBoundWhsInfoResponse,
  GetCurrentInventoryRequest,
  GetCurrentInventoryResponse,
  GetExpiryReportRequest,
  GetExpiryReportResponse,
  GetStockAgingRequest,
  GetStockAgingResponse,
  GetStockMovementRequest,
  GetStockMovementResponse,
} from "../schemas/sbs.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class SbsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * get bound warehouse by shop id
   *
   * @param {GetBoundWhsInfoRequest} params Request parameters
   * @returns {Promise<GetBoundWhsInfoResponse>} Promise resolving to the response
   */
  public async getBoundWhsInfo(params?: GetBoundWhsInfoRequest): Promise<GetBoundWhsInfoResponse> {
    return ShopeeFetch.fetch<GetBoundWhsInfoResponse>(this.config, "/sbs/get_bound_whs_info", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get Seller Center Current Inventory Page Data
   *
   * @param {GetCurrentInventoryRequest} params Request parameters
   * @returns {Promise<GetCurrentInventoryResponse>} Promise resolving to the response
   */
  public async getCurrentInventory(
    params?: GetCurrentInventoryRequest
  ): Promise<GetCurrentInventoryResponse> {
    return ShopeeFetch.fetch<GetCurrentInventoryResponse>(
      this.config,
      "/sbs/get_current_inventory",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Seller Center Expiry Report page data
   *
   * @param {GetExpiryReportRequest} params Request parameters
   * @returns {Promise<GetExpiryReportResponse>} Promise resolving to the response
   */
  public async getExpiryReport(params?: GetExpiryReportRequest): Promise<GetExpiryReportResponse> {
    return ShopeeFetch.fetch<GetExpiryReportResponse>(this.config, "/sbs/get_expiry_report", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get Seller Center Stock Aging page data
   *
   * @param {GetStockAgingRequest} params Request parameters
   * @returns {Promise<GetStockAgingResponse>} Promise resolving to the response
   */
  public async getStockAging(params?: GetStockAgingRequest): Promise<GetStockAgingResponse> {
    return ShopeeFetch.fetch<GetStockAgingResponse>(this.config, "/sbs/get_stock_aging", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get Seller Center，Stock Movement page data
   *
   * @param {GetStockMovementRequest} params Request parameters
   * @returns {Promise<GetStockMovementResponse>} Promise resolving to the response
   */
  public async getStockMovement(
    params?: GetStockMovementRequest
  ): Promise<GetStockMovementResponse> {
    return ShopeeFetch.fetch<GetStockMovementResponse>(this.config, "/sbs/get_stock_movement", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
}
