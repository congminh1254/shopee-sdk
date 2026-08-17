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
export class MerchantManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this call to get information of merchant
   *
   * @param {GetMerchantInfoRequest} params Request parameters
   * @returns {Promise<GetMerchantInfoResponse>} Promise resolving to the response
   */
  public async getMerchantInfo(params?: GetMerchantInfoRequest): Promise<GetMerchantInfoResponse> {
    return ShopeeFetch.fetch<GetMerchantInfoResponse>(this.config, "/merchant/get_merchant_info", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["auth_time", "expire_time"],
    });
  }
  /**
   * Use this api to get seller’s courier prepaid account.
   *
   * @param {GetMerchantPrepaidAccountListRequest} params Request parameters
   * @returns {Promise<GetMerchantPrepaidAccountListResponse>} Promise resolving to the response
   */
  public async getMerchantPrepaidAccountList(
    params?: GetMerchantPrepaidAccountListRequest
  ): Promise<GetMerchantPrepaidAccountListResponse> {
    return ShopeeFetch.fetch<GetMerchantPrepaidAccountListResponse>(
      this.config,
      "/merchant/get_merchant_prepaid_account_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get merchant warehouse with page
   *
   * @param {GetMerchantWarehouseListRequest} params Request parameters
   * @returns {Promise<GetMerchantWarehouseListResponse>} Promise resolving to the response
   */
  public async getMerchantWarehouseList(
    params?: GetMerchantWarehouseListRequest
  ): Promise<GetMerchantWarehouseListResponse> {
    return ShopeeFetch.fetch<GetMerchantWarehouseListResponse>(
      this.config,
      "/merchant/get_merchant_warehouse_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * get merchant warehouse location list
   *
   * @param {GetMerchantWarehouseLocationListRequest} params Request parameters
   * @returns {Promise<GetMerchantWarehouseLocationListResponse>} Promise resolving to the response
   */
  public async getMerchantWarehouseLocationList(
    params?: GetMerchantWarehouseLocationListRequest
  ): Promise<GetMerchantWarehouseLocationListResponse> {
    return ShopeeFetch.fetch<GetMerchantWarehouseLocationListResponse>(
      this.config,
      "/merchant/get_merchant_warehouse_location_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this call to get shop_list bound to merchant_id.
   *
   * @param {GetShopListByMerchantRequest} params Request parameters
   * @returns {Promise<GetShopListByMerchantResponse>} Promise resolving to the response
   */
  public async getShopListByMerchant(
    params?: GetShopListByMerchantRequest
  ): Promise<GetShopListByMerchantResponse> {
    return ShopeeFetch.fetch<GetShopListByMerchantResponse>(
      this.config,
      "/merchant/get_shop_list_by_merchant",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get eligible shop list by warehouse id
   *
   * @param {GetWarehouseEligibleShopListRequest} params Request parameters
   * @returns {Promise<GetWarehouseEligibleShopListResponse>} Promise resolving to the response
   */
  public async getWarehouseEligibleShopList(
    params?: GetWarehouseEligibleShopListRequest
  ): Promise<GetWarehouseEligibleShopListResponse> {
    return ShopeeFetch.fetch<GetWarehouseEligibleShopListResponse>(
      this.config,
      "/merchant/get_warehouse_eligible_shop_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
