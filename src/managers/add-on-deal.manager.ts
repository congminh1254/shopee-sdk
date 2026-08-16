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
export class AddOnDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add Add-on Deal
   *
   * @param {AddAddOnDealRequest} params Request parameters
   * @returns {Promise<AddAddOnDealResponse>} Promise resolving to the response
   */
  public async addAddOnDeal(params?: AddAddOnDealRequest): Promise<AddAddOnDealResponse> {
    return ShopeeFetch.fetch<AddAddOnDealResponse>(this.config, "/add_on_deal/add_add_on_deal", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Add Add-on Deal Main Item
   *
   * @param {AddAddOnDealMainItemRequest} params Request parameters
   * @returns {Promise<AddAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async addAddOnDealMainItem(
    params?: AddAddOnDealMainItemRequest
  ): Promise<AddAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<AddAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Add Add-on Deal Sub Item
   *
   * @param {AddAddOnDealSubItemRequest} params Request parameters
   * @returns {Promise<AddAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async addAddOnDealSubItem(
    params?: AddAddOnDealSubItemRequest
  ): Promise<AddAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<AddAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete Add-on Deal
   *
   * @param {DeleteAddOnDealRequest} params Request parameters
   * @returns {Promise<DeleteAddOnDealResponse>} Promise resolving to the response
   */
  public async deleteAddOnDeal(params?: DeleteAddOnDealRequest): Promise<DeleteAddOnDealResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete Add-on Deal Main Item
   *
   * @param {DeleteAddOnDealMainItemRequest} params Request parameters
   * @returns {Promise<DeleteAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async deleteAddOnDealMainItem(
    params?: DeleteAddOnDealMainItemRequest
  ): Promise<DeleteAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete Add-on Deal Sub Item
   *
   * @param {DeleteAddOnDealSubItemRequest} params Request parameters
   * @returns {Promise<DeleteAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async deleteAddOnDealSubItem(
    params?: DeleteAddOnDealSubItemRequest
  ): Promise<DeleteAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<DeleteAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * End Add-on Deal
   *
   * @param {EndAddOnDealRequest} params Request parameters
   * @returns {Promise<EndAddOnDealResponse>} Promise resolving to the response
   */
  public async endAddOnDeal(params?: EndAddOnDealRequest): Promise<EndAddOnDealResponse> {
    return ShopeeFetch.fetch<EndAddOnDealResponse>(this.config, "/add_on_deal/end_add_on_deal", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Get Add-on Deal
   *
   * @param {GetAddOnDealRequest} params Request parameters
   * @returns {Promise<GetAddOnDealResponse>} Promise resolving to the response
   */
  public async getAddOnDeal(params?: GetAddOnDealRequest): Promise<GetAddOnDealResponse> {
    return ShopeeFetch.fetch<GetAddOnDealResponse>(this.config, "/add_on_deal/get_add_on_deal", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get Add-on Deal List
   *
   * @param {GetAddOnDealListRequest} params Request parameters
   * @returns {Promise<GetAddOnDealListResponse>} Promise resolving to the response
   */
  public async getAddOnDealList(
    params?: GetAddOnDealListRequest
  ): Promise<GetAddOnDealListResponse> {
    return ShopeeFetch.fetch<GetAddOnDealListResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get Add-on Deal Main Item
   *
   * @param {GetAddOnDealMainItemRequest} params Request parameters
   * @returns {Promise<GetAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async getAddOnDealMainItem(
    params?: GetAddOnDealMainItemRequest
  ): Promise<GetAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<GetAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_main_item",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get Add-on Deal Sub Item
   *
   * @param {GetAddOnDealSubItemRequest} params Request parameters
   * @returns {Promise<GetAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async getAddOnDealSubItem(
    params?: GetAddOnDealSubItemRequest
  ): Promise<GetAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<GetAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_sub_item",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Update Add-on Deal
   *
   * @param {UpdateAddOnDealRequest} params Request parameters
   * @returns {Promise<UpdateAddOnDealResponse>} Promise resolving to the response
   */
  public async updateAddOnDeal(params?: UpdateAddOnDealRequest): Promise<UpdateAddOnDealResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update Add-on Deal Main Item
   *
   * @param {UpdateAddOnDealMainItemRequest} params Request parameters
   * @returns {Promise<UpdateAddOnDealMainItemResponse>} Promise resolving to the response
   */
  public async updateAddOnDealMainItem(
    params?: UpdateAddOnDealMainItemRequest
  ): Promise<UpdateAddOnDealMainItemResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update Add-on Deal Sub Item
   *
   * @param {UpdateAddOnDealSubItemRequest} params Request parameters
   * @returns {Promise<UpdateAddOnDealSubItemResponse>} Promise resolving to the response
   */
  public async updateAddOnDealSubItem(
    params?: UpdateAddOnDealSubItemRequest
  ): Promise<UpdateAddOnDealSubItemResponse> {
    return ShopeeFetch.fetch<UpdateAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
