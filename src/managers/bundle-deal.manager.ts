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
export class BundleDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * create bundle deal. Relevant restrictions refer to FAQ：https://open.shopee.com/faq/254
   *
   * @param {AddBundleDealRequest} params Request parameters
   * @returns {Promise<AddBundleDealResponse>} Promise resolving to the response
   */
  public async addBundleDeal(params?: AddBundleDealRequest): Promise<AddBundleDealResponse> {
    return ShopeeFetch.fetch<AddBundleDealResponse>(this.config, "/bundle_deal/add_bundle_deal", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["start_time", "end_time"],
    });
  }
  /**
   * add product to bundle deal
   *
   * @param {AddBundleDealItemRequest} params Request parameters
   * @returns {Promise<AddBundleDealItemResponse>} Promise resolving to the response
   */
  public async addBundleDealItem(
    params?: AddBundleDealItemRequest
  ): Promise<AddBundleDealItemResponse> {
    return ShopeeFetch.fetch<AddBundleDealItemResponse>(
      this.config,
      "/bundle_deal/add_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * delete bundle deal
   *
   * @param {DeleteBundleDealRequest} params Request parameters
   * @returns {Promise<DeleteBundleDealResponse>} Promise resolving to the response
   */
  public async deleteBundleDeal(
    params?: DeleteBundleDealRequest
  ): Promise<DeleteBundleDealResponse> {
    return ShopeeFetch.fetch<DeleteBundleDealResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * delete product in bundle deal
   *
   * @param {DeleteBundleDealItemRequest} params Request parameters
   * @returns {Promise<DeleteBundleDealItemResponse>} Promise resolving to the response
   */
  public async deleteBundleDealItem(
    params?: DeleteBundleDealItemRequest
  ): Promise<DeleteBundleDealItemResponse> {
    return ShopeeFetch.fetch<DeleteBundleDealItemResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * end bundle deal
   *
   * @param {EndBundleDealRequest} params Request parameters
   * @returns {Promise<EndBundleDealResponse>} Promise resolving to the response
   */
  public async endBundleDeal(params?: EndBundleDealRequest): Promise<EndBundleDealResponse> {
    return ShopeeFetch.fetch<EndBundleDealResponse>(this.config, "/bundle_deal/end_bundle_deal", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * get bundle deal detail
   *
   * @param {GetBundleDealRequest} params Request parameters
   * @returns {Promise<GetBundleDealResponse>} Promise resolving to the response
   */
  public async getBundleDeal(params?: GetBundleDealRequest): Promise<GetBundleDealResponse> {
    return ShopeeFetch.fetch<GetBundleDealResponse>(this.config, "/bundle_deal/get_bundle_deal", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.start_time", "response.end_time"],
    });
  }
  /**
   * get bundle deal item
   *
   * @param {GetBundleDealItemRequest} params Request parameters
   * @returns {Promise<GetBundleDealItemResponse>} Promise resolving to the response
   */
  public async getBundleDealItem(
    params?: GetBundleDealItemRequest
  ): Promise<GetBundleDealItemResponse> {
    return ShopeeFetch.fetch<GetBundleDealItemResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_item",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * get bundle deal list
   *
   * @param {GetBundleDealListRequest} params Request parameters
   * @returns {Promise<GetBundleDealListResponse>} Promise resolving to the response
   */
  public async getBundleDealList(
    params?: GetBundleDealListRequest
  ): Promise<GetBundleDealListResponse> {
    return ShopeeFetch.fetch<GetBundleDealListResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_list",
      {
        method: "GET",
        auth: true,
        params: params,
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
   * @returns {Promise<UpdateBundleDealResponse>} Promise resolving to the response
   */
  public async updateBundleDeal(
    params?: UpdateBundleDealRequest
  ): Promise<UpdateBundleDealResponse> {
    return ShopeeFetch.fetch<UpdateBundleDealResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["start_time", "end_time", "response.start_time", "response.end_time"],
      }
    );
  }
  /**
   * update product in bundle deal
   *
   * @param {UpdateBundleDealItemRequest} params Request parameters
   * @returns {Promise<UpdateBundleDealItemResponse>} Promise resolving to the response
   */
  public async updateBundleDealItem(
    params?: UpdateBundleDealItemRequest
  ): Promise<UpdateBundleDealItemResponse> {
    return ShopeeFetch.fetch<UpdateBundleDealItemResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
