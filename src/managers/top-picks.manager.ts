// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddTopPicksRequest,
  AddTopPicksResponse,
  DeleteTopPicksRequest,
  DeleteTopPicksResponse,
  GetTopPicksListRequest,
  GetTopPicksListResponse,
  UpdateTopPicksRequest,
  UpdateTopPicksResponse,
} from "../schemas/top-picks.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class TopPicksManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * add one collection
   *
   * @param {AddTopPicksRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddTopPicksResponse>} Promise resolving to the response
   */
  public async addTopPicks(
    params: AddTopPicksRequest,
    options?: RequestOptions
  ): Promise<AddTopPicksResponse> {
    return ShopeeFetch.fetch<AddTopPicksResponse>(this.config, "/top_picks/add_top_picks", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * delete a collection
   *
   * @param {DeleteTopPicksRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteTopPicksResponse>} Promise resolving to the response
   */
  public async deleteTopPicks(
    params: DeleteTopPicksRequest,
    options?: RequestOptions
  ): Promise<DeleteTopPicksResponse> {
    return ShopeeFetch.fetch<DeleteTopPicksResponse>(this.config, "/top_picks/delete_top_picks", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * get one TopPicks
   *
   * @param {GetTopPicksListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetTopPicksListResponse>} Promise resolving to the response
   */
  public async getTopPicksList(
    params?: GetTopPicksListRequest,
    options?: RequestOptions
  ): Promise<GetTopPicksListResponse> {
    return ShopeeFetch.fetch<GetTopPicksListResponse>(
      this.config,
      "/top_picks/get_top_picks_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * update a collection info
   *
   * @param {UpdateTopPicksRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateTopPicksResponse>} Promise resolving to the response
   */
  public async updateTopPicks(
    params: UpdateTopPicksRequest,
    options?: RequestOptions
  ): Promise<UpdateTopPicksResponse> {
    return ShopeeFetch.fetch<UpdateTopPicksResponse>(this.config, "/top_picks/update_top_picks", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
}
