// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddFollowPrizeRequest,
  AddFollowPrizeResponse,
  DeleteFollowPrizeRequest,
  DeleteFollowPrizeResponse,
  EndFollowPrizeRequest,
  EndFollowPrizeResponse,
  GetFollowPrizeDetailRequest,
  GetFollowPrizeDetailResponse,
  GetFollowPrizeListRequest,
  GetFollowPrizeListResponse,
  UpdateFollowPrizeRequest,
  UpdateFollowPrizeResponse,
} from "../schemas/follow-prize.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class FollowPrizeManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * OpenAPI add Follow Prize
   *
   * @param {AddFollowPrizeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddFollowPrizeResponse>} Promise resolving to the response
   */
  public async addFollowPrize(
    params: AddFollowPrizeRequest,
    options?: RequestOptions
  ): Promise<AddFollowPrizeResponse> {
    return ShopeeFetch.fetch<AddFollowPrizeResponse>(
      this.config,
      "/follow_prize/add_follow_prize",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * delete_follow_prize
   *
   * @param {DeleteFollowPrizeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteFollowPrizeResponse>} Promise resolving to the response
   */
  public async deleteFollowPrize(
    params: DeleteFollowPrizeRequest,
    options?: RequestOptions
  ): Promise<DeleteFollowPrizeResponse> {
    return ShopeeFetch.fetch<DeleteFollowPrizeResponse>(
      this.config,
      "/follow_prize/delete_follow_prize",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * end follow prize
   *
   * @param {EndFollowPrizeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EndFollowPrizeResponse>} Promise resolving to the response
   */
  public async endFollowPrize(
    params: EndFollowPrizeRequest,
    options?: RequestOptions
  ): Promise<EndFollowPrizeResponse> {
    return ShopeeFetch.fetch<EndFollowPrizeResponse>(
      this.config,
      "/follow_prize/end_follow_prize",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * get_follow_prize_detail
   *
   * @param {GetFollowPrizeDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetFollowPrizeDetailResponse>} Promise resolving to the response
   */
  public async getFollowPrizeDetail(
    params?: GetFollowPrizeDetailRequest,
    options?: RequestOptions
  ): Promise<GetFollowPrizeDetailResponse> {
    return ShopeeFetch.fetch<GetFollowPrizeDetailResponse>(
      this.config,
      "/follow_prize/get_follow_prize_detail",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: ["response.start_time", "response.end_time"],
      }
    );
  }
  /**
   * OpenAPI get_follow_prize_list
   *
   * @param {GetFollowPrizeListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetFollowPrizeListResponse>} Promise resolving to the response
   */
  public async getFollowPrizeList(
    params: GetFollowPrizeListRequest,
    options?: RequestOptions
  ): Promise<GetFollowPrizeListResponse> {
    return ShopeeFetch.fetch<GetFollowPrizeListResponse>(
      this.config,
      "/follow_prize/get_follow_prize_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: [
          "response.follow_prize_list.start_time",
          "response.follow_prize_list.end_time",
        ],
      }
    );
  }
  /**
   * update_follow_prize
   *
   * @param {UpdateFollowPrizeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateFollowPrizeResponse>} Promise resolving to the response
   */
  public async updateFollowPrize(
    params: UpdateFollowPrizeRequest,
    options?: RequestOptions
  ): Promise<UpdateFollowPrizeResponse> {
    return ShopeeFetch.fetch<UpdateFollowPrizeResponse>(
      this.config,
      "/follow_prize/update_follow_prize",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
