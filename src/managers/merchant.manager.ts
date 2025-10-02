import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  GetMerchantInfoParams,
  GetMerchantInfoResponse,
  GetMerchantPrepaidAccountListParams,
  GetMerchantPrepaidAccountListResponse,
  GetMerchantWarehouseListParams,
  GetMerchantWarehouseListResponse,
  GetMerchantWarehouseLocationListParams,
  GetMerchantWarehouseLocationListResponse,
  GetShopListByMerchantParams,
  GetShopListByMerchantResponse,
  GetWarehouseEligibleShopListParams,
  GetWarehouseEligibleShopListResponse,
} from "../schemas/merchant.js";
import { ShopeeFetch } from "../fetch.js";

export class MerchantManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get information of merchant
   * @returns {Promise<GetMerchantInfoResponse>} The response containing merchant information including name, authorization time, currency, region, and CBSC status
   *
   * This endpoint retrieves comprehensive information about the merchant including:
   * - Merchant name and region
   * - Authorization and expiration times
   * - Supported currency
   * - CNSC/CBSC upgrade status
   */
  async getMerchantInfo(
    params?: GetMerchantInfoParams
  ): Promise<GetMerchantInfoResponse> {
    const response = await ShopeeFetch.fetch<GetMerchantInfoResponse>(
      this.config,
      "/merchant/get_merchant_info",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get seller's courier prepaid account list
   * @param {GetMerchantPrepaidAccountListParams} params - Pagination parameters
   * @param {number} params.page_no - Page number starting from 1
   * @param {number} params.page_size - Number of items per page (max 100)
   * @returns {Promise<GetMerchantPrepaidAccountListResponse>} The response containing list of prepaid accounts with courier details
   *
   * This endpoint retrieves the merchant's prepaid courier accounts including:
   * - Account IDs and default status
   * - Courier information (name, key)
   * - Partner credentials (may be masked for security)
   * - Account configuration details
   */
  async getMerchantPrepaidAccountList(
    params: GetMerchantPrepaidAccountListParams
  ): Promise<GetMerchantPrepaidAccountListResponse> {
    const response =
      await ShopeeFetch.fetch<GetMerchantPrepaidAccountListResponse>(
        this.config,
        "/merchant/get_merchant_prepaid_account_list",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

    return response;
  }

  /**
   * Get merchant warehouse list with pagination
   * @param {GetMerchantWarehouseListParams} params - Parameters with cursor for pagination
   * @param {DoubleSidedCursor} params.cursor - Cursor for pagination (next_id, prev_id, page_size)
   * @returns {Promise<GetMerchantWarehouseListResponse>} The response containing list of warehouses with full address details
   *
   * This endpoint retrieves the merchant's warehouse list including:
   * - Warehouse IDs, names, and types (pickup/return)
   * - Complete address information (street, city, state, region, zip code)
   * - Location identifiers
   * - Enterprise information (for applicable regions like Brazil)
   * - Support for double-sided cursor pagination (next/prev)
   *
   * Pagination guide:
   * - First page: Set next_id = 0 or null
   * - Next page: Use next_id from previous response, set prev_id = null
   * - Previous page: Use prev_id from previous response, set next_id = null
   * - No more next data: next_id in response is null
   * - No more prev data: prev_id in response is null
   */
  async getMerchantWarehouseList(
    params: GetMerchantWarehouseListParams
  ): Promise<GetMerchantWarehouseListResponse> {
    const response = await ShopeeFetch.fetch<GetMerchantWarehouseListResponse>(
      this.config,
      "/merchant/get_merchant_warehouse_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get merchant warehouse location list
   * @returns {Promise<GetMerchantWarehouseLocationListResponse>} The response containing list of warehouse locations with location IDs and names
   *
   * This endpoint retrieves a simplified list of warehouse locations including:
   * - Location IDs
   * - Warehouse names
   *
   * This is useful for getting a quick overview of available warehouse locations
   * without the full address details provided by getMerchantWarehouseList.
   */
  async getMerchantWarehouseLocationList(
    params?: GetMerchantWarehouseLocationListParams
  ): Promise<GetMerchantWarehouseLocationListResponse> {
    const response =
      await ShopeeFetch.fetch<GetMerchantWarehouseLocationListResponse>(
        this.config,
        "/merchant/get_merchant_warehouse_location_list",
        {
          method: "GET",
          auth: true,
          params,
        }
      );

    return response;
  }

  /**
   * Get shop list bound to merchant
   * @param {GetShopListByMerchantParams} params - Pagination parameters
   * @param {number} params.page_no - Page number starting from 1
   * @param {number} params.page_size - Number of items per page (max 500)
   * @returns {Promise<GetShopListByMerchantResponse>} The response containing list of shops with SIP affiliate information
   *
   * This endpoint retrieves all shops that are authorized to the partner and bound to the merchant including:
   * - Shop IDs
   * - SIP affiliate shops (only returned for primary shops)
   * - CNSC status indicator
   * - Pagination support with more flag
   */
  async getShopListByMerchant(
    params: GetShopListByMerchantParams
  ): Promise<GetShopListByMerchantResponse> {
    const response = await ShopeeFetch.fetch<GetShopListByMerchantResponse>(
      this.config,
      "/merchant/get_shop_list_by_merchant",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get eligible shop list by warehouse id
   * @param {GetWarehouseEligibleShopListParams} params - Parameters with warehouse ID, type, and cursor
   * @param {number} params.warehouse_id - Warehouse address identifier
   * @param {number} params.warehouse_type - 1 = pickup warehouse, 2 = return warehouse
   * @param {DoubleSidedCursor} params.cursor - Cursor for pagination
   * @returns {Promise<GetWarehouseEligibleShopListResponse>} The response containing list of eligible shops with names
   *
   * This endpoint retrieves shops that are eligible for a specific warehouse including:
   * - Shop IDs and names
   * - Support for double-sided cursor pagination
   *
   * Useful for determining which shops can use a particular warehouse for
   * pickups (warehouse_type = 1) or returns (warehouse_type = 2).
   *
   * Pagination guide:
   * - First page: Set next_id = 0 or null, specify page_size
   * - Next page: Use next_id from previous response, set prev_id = null
   * - Previous page: Use prev_id from previous response, set next_id = null
   * - Page size limit: [1, 30]
   */
  async getWarehouseEligibleShopList(
    params: GetWarehouseEligibleShopListParams
  ): Promise<GetWarehouseEligibleShopListResponse> {
    const response =
      await ShopeeFetch.fetch<GetWarehouseEligibleShopListResponse>(
        this.config,
        "/merchant/get_warehouse_eligible_shop_list",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

    return response;
  }
}
