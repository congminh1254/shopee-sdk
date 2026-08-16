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
export class TopPicksManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * add one collection
   *
   * @param {AddTopPicksRequest} params Request parameters
   * @returns {Promise<AddTopPicksResponse>} Promise resolving to the response
   */
  public async addTopPicks(params?: AddTopPicksRequest): Promise<AddTopPicksResponse> {
    return ShopeeFetch.fetch<AddTopPicksResponse>(this.config, "/top_picks/add_top_picks", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * delete a collection
   *
   * @param {DeleteTopPicksRequest} params Request parameters
   * @returns {Promise<DeleteTopPicksResponse>} Promise resolving to the response
   */
  public async deleteTopPicks(params?: DeleteTopPicksRequest): Promise<DeleteTopPicksResponse> {
    return ShopeeFetch.fetch<DeleteTopPicksResponse>(this.config, "/top_picks/delete_top_picks", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * get one TopPicks
   *
   * @param {GetTopPicksListRequest} params Request parameters
   * @returns {Promise<GetTopPicksListResponse>} Promise resolving to the response
   */
  public async getTopPicksList(params?: GetTopPicksListRequest): Promise<GetTopPicksListResponse> {
    return ShopeeFetch.fetch<GetTopPicksListResponse>(
      this.config,
      "/top_picks/get_top_picks_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * update a collection info
   *
   * @param {UpdateTopPicksRequest} params Request parameters
   * @returns {Promise<UpdateTopPicksResponse>} Promise resolving to the response
   */
  public async updateTopPicks(params?: UpdateTopPicksRequest): Promise<UpdateTopPicksResponse> {
    return ShopeeFetch.fetch<UpdateTopPicksResponse>(this.config, "/top_picks/update_top_picks", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
}
