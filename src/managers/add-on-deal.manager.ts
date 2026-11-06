// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddAddOnDealRequest,
  AddAddOnDealResponse,
  AddAddOnDealMainItemRequest,
  AddAddOnDealMainItemResponse,
  AddAddOnDealSubItemRequest,
  AddAddOnDealSubItemResponse,
  DeleteAddOnDealRequest,
  DeleteAddOnDealResponse,
  DeleteAddOnDealMainItemRequest,
  DeleteAddOnDealMainItemResponse,
  DeleteAddOnDealSubItemRequest,
  DeleteAddOnDealSubItemResponse,
  EndAddOnDealRequest,
  EndAddOnDealResponse,
  GetAddOnDealRequest,
  GetAddOnDealResponse,
  GetAddOnDealListRequest,
  GetAddOnDealListResponse,
  GetAddOnDealMainItemRequest,
  GetAddOnDealMainItemResponse,
  GetAddOnDealSubItemRequest,
  GetAddOnDealSubItemResponse,
  UpdateAddOnDealRequest,
  UpdateAddOnDealResponse,
  UpdateAddOnDealMainItemRequest,
  UpdateAddOnDealMainItemResponse,
  UpdateAddOnDealSubItemRequest,
  UpdateAddOnDealSubItemResponse,
} from "../schemas/add-on-deal.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class AddOnDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add Add-on Deal
   *
   * @param {AddAddOnDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddAddOnDealResponse>} Promise resolving to the response
   */
  public async addAddOnDeal(
    params: AddAddOnDealRequest,
    options?: RequestOptions
  ): Promise<AddAddOnDealResponse> {
    return ShopeeFetch.fetch<AddAddOnDealResponse>(this.config, "/add_on_deal/add_add_on_deal", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Add Add-on Deal Main Item
   *
   * @param {AddAddOnDealMainItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async addAddOnDealMainItem(
    params: AddAddOnDealMainItemRequest,
    options?: RequestOptions
  ): Promise<AddAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<AddAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Add Add-on Deal Sub Item
   *
   * @param {AddAddOnDealSubItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async addAddOnDealSubItem(
    params: AddAddOnDealSubItemRequest,
    options?: RequestOptions
  ): Promise<AddAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<AddAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Delete Add-on Deal
   *
   * @param {DeleteAddOnDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteAddOnDealResponse>} Promise resolving to the response
   */
  public async deleteAddOnDeal(
    params: DeleteAddOnDealRequest,
    options?: RequestOptions
  ): Promise<DeleteAddOnDealResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Delete Add-on Deal Main Item
   *
   * @param {DeleteAddOnDealMainItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async deleteAddOnDealMainItem(
    params: DeleteAddOnDealMainItemRequest,
    options?: RequestOptions
  ): Promise<DeleteAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Delete Add-on Deal Sub Item
   *
   * @param {DeleteAddOnDealSubItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async deleteAddOnDealSubItem(
    params: DeleteAddOnDealSubItemRequest,
    options?: RequestOptions
  ): Promise<DeleteAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * End Add-on Deal
   *
   * @param {EndAddOnDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EndAddOnDealResponse>} Promise resolving to the response
   */
  public async endAddOnDeal(
    params: EndAddOnDealRequest,
    options?: RequestOptions
  ): Promise<EndAddOnDealResponse> {
    return ShopeeFetch.fetch<EndAddOnDealResponse>(this.config, "/add_on_deal/end_add_on_deal", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Get Add-on Deal
   *
   * @param {GetAddOnDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAddOnDealResponse>} Promise resolving to the response
   */
  public async getAddOnDeal(
    params: GetAddOnDealRequest,
    options?: RequestOptions
  ): Promise<GetAddOnDealResponse> {
    return ShopeeFetch.fetch<GetAddOnDealResponse>(this.config, "/add_on_deal/get_add_on_deal", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Get Add-on Deal List
   *
   * @param {GetAddOnDealListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAddOnDealListResponse>} Promise resolving to the response
   */
  public async getAddOnDealList(
    params: GetAddOnDealListRequest,
    options?: RequestOptions
  ): Promise<GetAddOnDealListResponse> {
    return ShopeeFetch.fetch<GetAddOnDealListResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get Add-on Deal Main Item
   *
   * @param {GetAddOnDealMainItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async getAddOnDealMainItem(
    params: GetAddOnDealMainItemRequest,
    options?: RequestOptions
  ): Promise<GetAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<GetAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_main_item",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get Add-on Deal Sub Item
   *
   * @param {GetAddOnDealSubItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async getAddOnDealSubItem(
    params: GetAddOnDealSubItemRequest,
    options?: RequestOptions
  ): Promise<GetAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<GetAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_sub_item",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Update Add-on Deal
   *
   * @param {UpdateAddOnDealRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateAddOnDealResponse>} Promise resolving to the response
   */
  public async updateAddOnDeal(
    params: UpdateAddOnDealRequest,
    options?: RequestOptions
  ): Promise<UpdateAddOnDealResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Update Add-on Deal Main Item
   *
   * @param {UpdateAddOnDealMainItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async updateAddOnDealMainItem(
    params: UpdateAddOnDealMainItemRequest,
    options?: RequestOptions
  ): Promise<UpdateAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Update Add-on Deal Sub Item
   *
   * @param {UpdateAddOnDealSubItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async updateAddOnDealSubItem(
    params: UpdateAddOnDealSubItemRequest,
    options?: RequestOptions
  ): Promise<UpdateAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
