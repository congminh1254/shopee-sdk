// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetMerchantInfoRequest,
  GetMerchantInfoResponse,
  GetMerchantPrepaidAccountListRequest,
  GetMerchantPrepaidAccountListResponse,
  GetMerchantWarehouseListRequest,
  GetMerchantWarehouseListResponse,
  GetMerchantWarehouseLocationListRequest,
  GetMerchantWarehouseLocationListResponse,
  GetShopListByMerchantRequest,
  GetShopListByMerchantResponse,
  GetWarehouseEligibleShopListRequest,
  GetWarehouseEligibleShopListResponse,
} from "../schemas/merchant.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class MerchantManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this call to get information of merchant
   *
   * @param {GetMerchantInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMerchantInfoResponse>} Promise resolving to the response
   */
  public async getMerchantInfo(
    params?: GetMerchantInfoRequest,
    options?: RequestOptions
  ): Promise<GetMerchantInfoResponse> {
    return ShopeeFetch.fetch<GetMerchantInfoResponse>(this.config, "/merchant/get_merchant_info", {
      method: "GET",
      auth: "merchant",
      params: params,
      request: options,
      timestampPaths: ["auth_time", "expire_time"],
    });
  }
  /**
   * Use this api to get seller’s courier prepaid account.
   *
   * @param {GetMerchantPrepaidAccountListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMerchantPrepaidAccountListResponse>} Promise resolving to the response
   */
  public async getMerchantPrepaidAccountList(
    params: GetMerchantPrepaidAccountListRequest,
    options?: RequestOptions
  ): Promise<GetMerchantPrepaidAccountListResponse> {
    return ShopeeFetch.fetch<GetMerchantPrepaidAccountListResponse>(
      this.config,
      "/merchant/get_merchant_prepaid_account_list",
      {
        method: "GET",
        auth: "merchant",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get merchant warehouse with page
   *
   * @param {GetMerchantWarehouseListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMerchantWarehouseListResponse>} Promise resolving to the response
   */
  public async getMerchantWarehouseList(
    params: GetMerchantWarehouseListRequest,
    options?: RequestOptions
  ): Promise<GetMerchantWarehouseListResponse> {
    return ShopeeFetch.fetch<GetMerchantWarehouseListResponse>(
      this.config,
      "/merchant/get_merchant_warehouse_list",
      {
        method: "POST",
        auth: "merchant",
        body: params,
        request: options,
      }
    );
  }
  /**
   * get merchant warehouse location list
   *
   * @param {GetMerchantWarehouseLocationListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMerchantWarehouseLocationListResponse>} Promise resolving to the response
   */
  public async getMerchantWarehouseLocationList(
    params?: GetMerchantWarehouseLocationListRequest,
    options?: RequestOptions
  ): Promise<GetMerchantWarehouseLocationListResponse> {
    return ShopeeFetch.fetch<GetMerchantWarehouseLocationListResponse>(
      this.config,
      "/merchant/get_merchant_warehouse_location_list",
      {
        method: "GET",
        auth: "merchant",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to get shop_list bound to merchant_id.
   *
   * @param {GetShopListByMerchantRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetShopListByMerchantResponse>} Promise resolving to the response
   */
  public async getShopListByMerchant(
    params: GetShopListByMerchantRequest,
    options?: RequestOptions
  ): Promise<GetShopListByMerchantResponse> {
    return ShopeeFetch.fetch<GetShopListByMerchantResponse>(
      this.config,
      "/merchant/get_shop_list_by_merchant",
      {
        method: "GET",
        auth: "merchant",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get eligible shop list by warehouse id
   *
   * @param {GetWarehouseEligibleShopListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetWarehouseEligibleShopListResponse>} Promise resolving to the response
   */
  public async getWarehouseEligibleShopList(
    params: GetWarehouseEligibleShopListRequest,
    options?: RequestOptions
  ): Promise<GetWarehouseEligibleShopListResponse> {
    return ShopeeFetch.fetch<GetWarehouseEligibleShopListResponse>(
      this.config,
      "/merchant/get_warehouse_eligible_shop_list",
      {
        method: "POST",
        auth: "merchant",
        body: params,
        request: options,
      }
    );
  }
}
