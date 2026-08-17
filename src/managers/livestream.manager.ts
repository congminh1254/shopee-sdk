// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddItemListRequest,
  AddItemListResponse,
  ApplyItemSetRequest,
  ApplyItemSetResponse,
  BanUserCommentRequest,
  BanUserCommentResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  DeleteItemListRequest,
  DeleteItemListResponse,
  DeleteShowItemRequest,
  DeleteShowItemResponse,
  EndSessionRequest,
  EndSessionResponse,
  GetItemCountRequest,
  GetItemCountResponse,
  GetItemListRequest,
  GetItemListResponse,
  GetItemSetItemListRequest,
  GetItemSetItemListResponse,
  GetItemSetListRequest,
  GetItemSetListResponse,
  GetLatestCommentListRequest,
  GetLatestCommentListResponse,
  GetLikeItemListRequest,
  GetLikeItemListResponse,
  GetRecentItemListRequest,
  GetRecentItemListResponse,
  GetSessionDetailRequest,
  GetSessionDetailResponse,
  GetSessionItemMetricRequest,
  GetSessionItemMetricResponse,
  GetSessionMetricRequest,
  GetSessionMetricResponse,
  GetShowItemRequest,
  GetShowItemResponse,
  PostCommentRequest,
  PostCommentResponse,
  StartSessionRequest,
  StartSessionResponse,
  UnbanUserCommentRequest,
  UnbanUserCommentResponse,
  UpdateItemListRequest,
  UpdateItemListResponse,
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateShowItemRequest,
  UpdateShowItemResponse,
  UploadImageRequest,
  UploadImageResponse,
} from "../schemas/livestream.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class LiveStreamManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add items to item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {AddItemListRequest} params Request parameters
   * @returns {Promise<AddItemListResponse>} Promise resolving to the response
   */
  public async addItemList(params?: AddItemListRequest): Promise<AddItemListResponse> {
    return ShopeeFetch.fetch<AddItemListResponse>(this.config, "/livestream/add_item_list", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Add product set to item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {ApplyItemSetRequest} params Request parameters
   * @returns {Promise<ApplyItemSetResponse>} Promise resolving to the response
   */
  public async applyItemSet(params?: ApplyItemSetRequest): Promise<ApplyItemSetResponse> {
    return ShopeeFetch.fetch<ApplyItemSetResponse>(this.config, "/livestream/apply_item_set", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Ban the user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {BanUserCommentRequest} params Request parameters
   * @returns {Promise<BanUserCommentResponse>} Promise resolving to the response
   */
  public async banUserComment(params?: BanUserCommentRequest): Promise<BanUserCommentResponse> {
    return ShopeeFetch.fetch<BanUserCommentResponse>(this.config, "/livestream/ban_user_comment", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Create a new live stream, include basic information, like cover, title, description, type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {CreateSessionRequest} params Request parameters
   * @returns {Promise<CreateSessionResponse>} Promise resolving to the response
   */
  public async createSession(params?: CreateSessionRequest): Promise<CreateSessionResponse> {
    return ShopeeFetch.fetch<CreateSessionResponse>(this.config, "/livestream/create_session", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Delete items from item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {DeleteItemListRequest} params Request parameters
   * @returns {Promise<DeleteItemListResponse>} Promise resolving to the response
   */
  public async deleteItemList(params?: DeleteItemListRequest): Promise<DeleteItemListResponse> {
    return ShopeeFetch.fetch<DeleteItemListResponse>(this.config, "/livestream/delete_item_list", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Unshow showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {DeleteShowItemRequest} params Request parameters
   * @returns {Promise<DeleteShowItemResponse>} Promise resolving to the response
   */
  public async deleteShowItem(params?: DeleteShowItemRequest): Promise<DeleteShowItemResponse> {
    return ShopeeFetch.fetch<DeleteShowItemResponse>(this.config, "/livestream/delete_show_item", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * End Live. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {EndSessionRequest} params Request parameters
   * @returns {Promise<EndSessionResponse>} Promise resolving to the response
   */
  public async endSession(params?: EndSessionRequest): Promise<EndSessionResponse> {
    return ShopeeFetch.fetch<EndSessionResponse>(this.config, "/livestream/end_session", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Get the number of items in the shopping bag, including the current number of items in the shopping bag, the upper limit of the number, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemCountRequest} params Request parameters
   * @returns {Promise<GetItemCountResponse>} Promise resolving to the response
   */
  public async getItemCount(params?: GetItemCountRequest): Promise<GetItemCountResponse> {
    return ShopeeFetch.fetch<GetItemCountResponse>(this.config, "/livestream/get_item_count", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get the detail information of item in item bag, including item id, item serial number, etc.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemListRequest} params Request parameters
   * @returns {Promise<GetItemListResponse>} Promise resolving to the response
   */
  public async getItemList(params?: GetItemListRequest): Promise<GetItemListResponse> {
    return ShopeeFetch.fetch<GetItemListResponse>(this.config, "/livestream/get_item_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get the item list of the product set, including item name, id, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemSetItemListRequest} params Request parameters
   * @returns {Promise<GetItemSetItemListResponse>} Promise resolving to the response
   */
  public async getItemSetItemList(
    params?: GetItemSetItemListRequest
  ): Promise<GetItemSetItemListResponse> {
    return ShopeeFetch.fetch<GetItemSetItemListResponse>(
      this.config,
      "/livestream/get_item_set_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the product set of the live stream, including the product set name, id, and item number. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemSetListRequest} params Request parameters
   * @returns {Promise<GetItemSetListResponse>} Promise resolving to the response
   */
  public async getItemSetList(params?: GetItemSetListRequest): Promise<GetItemSetListResponse> {
    return ShopeeFetch.fetch<GetItemSetListResponse>(this.config, "/livestream/get_item_set_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get live stream room comments in the last 10 seconds, including user id, user name, comment id, comment content, and comment time. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetLatestCommentListRequest} params Request parameters
   * @returns {Promise<GetLatestCommentListResponse>} Promise resolving to the response
   */
  public async getLatestCommentList(
    params?: GetLatestCommentListRequest
  ): Promise<GetLatestCommentListResponse> {
    return ShopeeFetch.fetch<GetLatestCommentListResponse>(
      this.config,
      "/livestream/get_latest_comment_list",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.list.timestamp"],
      }
    );
  }
  /**
   * Get the item list of My Likes tab.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetLikeItemListRequest} params Request parameters
   * @returns {Promise<GetLikeItemListResponse>} Promise resolving to the response
   */
  public async getLikeItemList(params?: GetLikeItemListRequest): Promise<GetLikeItemListResponse> {
    return ShopeeFetch.fetch<GetLikeItemListResponse>(
      this.config,
      "/livestream/get_like_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the item list of the Recently tab. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetRecentItemListRequest} params Request parameters
   * @returns {Promise<GetRecentItemListResponse>} Promise resolving to the response
   */
  public async getRecentItemList(
    params?: GetRecentItemListRequest
  ): Promise<GetRecentItemListResponse> {
    return ShopeeFetch.fetch<GetRecentItemListResponse>(
      this.config,
      "/livestream/get_recent_item_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get basic information about the live streaming room, including cover, title, description, type (test live or normal live), create time, update time, stream url, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionDetailRequest} params Request parameters
   * @returns {Promise<GetSessionDetailResponse>} Promise resolving to the response
   */
  public async getSessionDetail(
    params?: GetSessionDetailRequest
  ): Promise<GetSessionDetailResponse> {
    return ShopeeFetch.fetch<GetSessionDetailResponse>(
      this.config,
      "/livestream/get_session_detail",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get real-time indicator data of live stream products, including product clicks, add-to-cart, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionItemMetricRequest} params Request parameters
   * @returns {Promise<GetSessionItemMetricResponse>} Promise resolving to the response
   */
  public async getSessionItemMetric(
    params?: GetSessionItemMetricRequest
  ): Promise<GetSessionItemMetricResponse> {
    return ShopeeFetch.fetch<GetSessionItemMetricResponse>(
      this.config,
      "/livestream/get_session_item_metric",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get real-time indicator data of the live stream room, including the number of likes, comments, shares, views, etc.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionMetricRequest} params Request parameters
   * @returns {Promise<GetSessionMetricResponse>} Promise resolving to the response
   */
  public async getSessionMetric(
    params?: GetSessionMetricRequest
  ): Promise<GetSessionMetricResponse> {
    return ShopeeFetch.fetch<GetSessionMetricResponse>(
      this.config,
      "/livestream/get_session_metric",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetShowItemRequest} params Request parameters
   * @returns {Promise<GetShowItemResponse>} Promise resolving to the response
   */
  public async getShowItem(params?: GetShowItemRequest): Promise<GetShowItemResponse> {
    return ShopeeFetch.fetch<GetShowItemResponse>(this.config, "/livestream/get_show_item", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Post comment in the live stream as streamer. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {PostCommentRequest} params Request parameters
   * @returns {Promise<PostCommentResponse>} Promise resolving to the response
   */
  public async postComment(params?: PostCommentRequest): Promise<PostCommentResponse> {
    return ShopeeFetch.fetch<PostCommentResponse>(this.config, "/livestream/post_comment", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Start Live. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {StartSessionRequest} params Request parameters
   * @returns {Promise<StartSessionResponse>} Promise resolving to the response
   */
  public async startSession(params?: StartSessionRequest): Promise<StartSessionResponse> {
    return ShopeeFetch.fetch<StartSessionResponse>(this.config, "/livestream/start_session", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Unban a user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UnbanUserCommentRequest} params Request parameters
   * @returns {Promise<UnbanUserCommentResponse>} Promise resolving to the response
   */
  public async unbanUserComment(
    params?: UnbanUserCommentRequest
  ): Promise<UnbanUserCommentResponse> {
    return ShopeeFetch.fetch<UnbanUserCommentResponse>(
      this.config,
      "/livestream/unban_user_comment",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Update the order of items in item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateItemListRequest} params Request parameters
   * @returns {Promise<UpdateItemListResponse>} Promise resolving to the response
   */
  public async updateItemList(params?: UpdateItemListRequest): Promise<UpdateItemListResponse> {
    return ShopeeFetch.fetch<UpdateItemListResponse>(this.config, "/livestream/update_item_list", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Update live stream information, including cover, title, description, and type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateSessionRequest} params Request parameters
   * @returns {Promise<UpdateSessionResponse>} Promise resolving to the response
   */
  public async updateSession(params?: UpdateSessionRequest): Promise<UpdateSessionResponse> {
    return ShopeeFetch.fetch<UpdateSessionResponse>(this.config, "/livestream/update_session", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Set the showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateShowItemRequest} params Request parameters
   * @returns {Promise<UpdateShowItemResponse>} Promise resolving to the response
   */
  public async updateShowItem(params?: UpdateShowItemRequest): Promise<UpdateShowItemResponse> {
    return ShopeeFetch.fetch<UpdateShowItemResponse>(this.config, "/livestream/update_show_item", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Upload an image as the live stream cover.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UploadImageRequest} params Request parameters
   * @returns {Promise<UploadImageResponse>} Promise resolving to the response
   */
  public async uploadImage(params?: UploadImageRequest): Promise<UploadImageResponse> {
    return ShopeeFetch.fetch<UploadImageResponse>(this.config, "/livestream/upload_image", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
}
