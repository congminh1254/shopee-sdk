// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddBundleDealRequest,
  AddBundleDealResponse,
  AddBundleDealItemRequest,
  AddBundleDealItemResponse,
  DeleteBundleDealRequest,
  DeleteBundleDealResponse,
  DeleteBundleDealItemRequest,
  DeleteBundleDealItemResponse,
  EndBundleDealRequest,
  EndBundleDealResponse,
  GetBundleDealRequest,
  GetBundleDealResponse,
  GetBundleDealItemRequest,
  GetBundleDealItemResponse,
  GetBundleDealListRequest,
  GetBundleDealListResponse,
  UpdateBundleDealRequest,
  UpdateBundleDealResponse,
  UpdateBundleDealItemRequest,
  UpdateBundleDealItemResponse,
} from "../schemas/bundle-deal.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class BundleDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * create bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
   *
   * @param {AddBundleDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddBundleDealResponse>} Promise resolving to the response
   */
  public async addBundleDeal(
    params: AddBundleDealRequest,
    options?: RequestOptions
  ): Promise<AddBundleDealResponse> {
    return ShopeeFetch.fetch<AddBundleDealResponse>(this.config, "/bundle_deal/add_bundle_deal", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * add product to bundle deal
   *
   * @param {AddBundleDealItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddBundleDealItemResponse>} Promise resolving to the response
   */
  public async addBundleDealItem(
    params: AddBundleDealItemRequest,
    options?: RequestOptions
  ): Promise<AddBundleDealItemResponse> {
    return ShopeeFetch.fetch<AddBundleDealItemResponse>(
      this.config,
      "/bundle_deal/add_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * delete bundle deal
   *
   * @param {DeleteBundleDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteBundleDealResponse>} Promise resolving to the response
   */
  public async deleteBundleDeal(
    params: DeleteBundleDealRequest,
    options?: RequestOptions
  ): Promise<DeleteBundleDealResponse> {
    return ShopeeFetch.fetch<DeleteBundleDealResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * delete product in bundle deal
   *
   * @param {DeleteBundleDealItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteBundleDealItemResponse>} Promise resolving to the response
   */
  public async deleteBundleDealItem(
    params: DeleteBundleDealItemRequest,
    options?: RequestOptions
  ): Promise<DeleteBundleDealItemResponse> {
    return ShopeeFetch.fetch<DeleteBundleDealItemResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * end bundle deal
   *
   * @param {EndBundleDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EndBundleDealResponse>} Promise resolving to the response
   */
  public async endBundleDeal(
    params: EndBundleDealRequest,
    options?: RequestOptions
  ): Promise<EndBundleDealResponse> {
    return ShopeeFetch.fetch<EndBundleDealResponse>(this.config, "/bundle_deal/end_bundle_deal", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * get bundle deal detail
   *
   * @param {GetBundleDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBundleDealResponse>} Promise resolving to the response
   */
  public async getBundleDeal(
    params: GetBundleDealRequest,
    options?: RequestOptions
  ): Promise<GetBundleDealResponse> {
    return ShopeeFetch.fetch<GetBundleDealResponse>(this.config, "/bundle_deal/get_bundle_deal", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: ["response.start_time", "response.end_time"],
    });
  }
  /**
   * get bundle deal item
   *
   * @param {GetBundleDealItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBundleDealItemResponse>} Promise resolving to the response
   */
  public async getBundleDealItem(
    params: GetBundleDealItemRequest,
    options?: RequestOptions
  ): Promise<GetBundleDealItemResponse> {
    return ShopeeFetch.fetch<GetBundleDealItemResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_item",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * get bundle deal list
   *
   * @param {GetBundleDealListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBundleDealListResponse>} Promise resolving to the response
   */
  public async getBundleDealList(
    params?: GetBundleDealListRequest,
    options?: RequestOptions
  ): Promise<GetBundleDealListResponse> {
    return ShopeeFetch.fetch<GetBundleDealListResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: [
          "response.bundle_deal_list.start_time",
          "response.bundle_deal_list.end_time",
        ],
      }
    );
  }
  /**
   * update bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
   *
   * @param {UpdateBundleDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateBundleDealResponse>} Promise resolving to the response
   */
  public async updateBundleDeal(
    params: UpdateBundleDealRequest,
    options?: RequestOptions
  ): Promise<UpdateBundleDealResponse> {
    return ShopeeFetch.fetch<UpdateBundleDealResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
        timestampPaths: ["response.start_time", "response.end_time"],
      }
    );
  }
  /**
   * update product in bundle deal
   *
   * @param {UpdateBundleDealItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateBundleDealItemResponse>} Promise resolving to the response
   */
  public async updateBundleDealItem(
    params: UpdateBundleDealItemRequest,
    options?: RequestOptions
  ): Promise<UpdateBundleDealItemResponse> {
    return ShopeeFetch.fetch<UpdateBundleDealItemResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
