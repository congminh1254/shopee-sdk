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
import { RequestOptions } from "../schemas/fetch.js";
export class LiveStreamManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add items to item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {AddItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddItemListResponse>} Promise resolving to the response
   */
  public async addItemList(
    params: AddItemListRequest,
    options?: RequestOptions
  ): Promise<AddItemListResponse> {
    return ShopeeFetch.fetch<AddItemListResponse>(this.config, "/livestream/add_item_list", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Add product set to item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {ApplyItemSetRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ApplyItemSetResponse>} Promise resolving to the response
   */
  public async applyItemSet(
    params: ApplyItemSetRequest,
    options?: RequestOptions
  ): Promise<ApplyItemSetResponse> {
    return ShopeeFetch.fetch<ApplyItemSetResponse>(this.config, "/livestream/apply_item_set", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Ban the user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {BanUserCommentRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<BanUserCommentResponse>} Promise resolving to the response
   */
  public async banUserComment(
    params: BanUserCommentRequest,
    options?: RequestOptions
  ): Promise<BanUserCommentResponse> {
    return ShopeeFetch.fetch<BanUserCommentResponse>(this.config, "/livestream/ban_user_comment", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Create a new live stream, include basic information, like cover, title, description, type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {CreateSessionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CreateSessionResponse>} Promise resolving to the response
   */
  public async createSession(
    params: CreateSessionRequest,
    options?: RequestOptions
  ): Promise<CreateSessionResponse> {
    return ShopeeFetch.fetch<CreateSessionResponse>(this.config, "/livestream/create_session", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Delete items from item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {DeleteItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteItemListResponse>} Promise resolving to the response
   */
  public async deleteItemList(
    params: DeleteItemListRequest,
    options?: RequestOptions
  ): Promise<DeleteItemListResponse> {
    return ShopeeFetch.fetch<DeleteItemListResponse>(this.config, "/livestream/delete_item_list", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Unshow showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {DeleteShowItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteShowItemResponse>} Promise resolving to the response
   */
  public async deleteShowItem(
    params: DeleteShowItemRequest,
    options?: RequestOptions
  ): Promise<DeleteShowItemResponse> {
    return ShopeeFetch.fetch<DeleteShowItemResponse>(this.config, "/livestream/delete_show_item", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * End Live. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {EndSessionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EndSessionResponse>} Promise resolving to the response
   */
  public async endSession(
    params: EndSessionRequest,
    options?: RequestOptions
  ): Promise<EndSessionResponse> {
    return ShopeeFetch.fetch<EndSessionResponse>(this.config, "/livestream/end_session", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Get the number of items in the shopping bag, including the current number of items in the shopping bag, the upper limit of the number, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemCountRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemCountResponse>} Promise resolving to the response
   */
  public async getItemCount(
    params: GetItemCountRequest,
    options?: RequestOptions
  ): Promise<GetItemCountResponse> {
    return ShopeeFetch.fetch<GetItemCountResponse>(this.config, "/livestream/get_item_count", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Get the detail information of item in item bag, including item id, item serial number, etc.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemListResponse>} Promise resolving to the response
   */
  public async getItemList(
    params: GetItemListRequest,
    options?: RequestOptions
  ): Promise<GetItemListResponse> {
    return ShopeeFetch.fetch<GetItemListResponse>(this.config, "/livestream/get_item_list", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Get the item list of the product set, including item name, id, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemSetItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemSetItemListResponse>} Promise resolving to the response
   */
  public async getItemSetItemList(
    params: GetItemSetItemListRequest,
    options?: RequestOptions
  ): Promise<GetItemSetItemListResponse> {
    return ShopeeFetch.fetch<GetItemSetItemListResponse>(
      this.config,
      "/livestream/get_item_set_item_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the product set of the live stream, including the product set name, id, and item number. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetItemSetListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemSetListResponse>} Promise resolving to the response
   */
  public async getItemSetList(
    params: GetItemSetListRequest,
    options?: RequestOptions
  ): Promise<GetItemSetListResponse> {
    return ShopeeFetch.fetch<GetItemSetListResponse>(this.config, "/livestream/get_item_set_list", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Get live stream room comments in the last 10 seconds, including user id, user name, comment id, comment content, and comment time. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetLatestCommentListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetLatestCommentListResponse>} Promise resolving to the response
   */
  public async getLatestCommentList(
    params: GetLatestCommentListRequest,
    options?: RequestOptions
  ): Promise<GetLatestCommentListResponse> {
    return ShopeeFetch.fetch<GetLatestCommentListResponse>(
      this.config,
      "/livestream/get_latest_comment_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
        timestampPaths: ["response.list.timestamp"],
      }
    );
  }
  /**
   * Get the item list of My Likes tab.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetLikeItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetLikeItemListResponse>} Promise resolving to the response
   */
  public async getLikeItemList(
    params: GetLikeItemListRequest,
    options?: RequestOptions
  ): Promise<GetLikeItemListResponse> {
    return ShopeeFetch.fetch<GetLikeItemListResponse>(
      this.config,
      "/livestream/get_like_item_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the item list of the Recently tab. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetRecentItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetRecentItemListResponse>} Promise resolving to the response
   */
  public async getRecentItemList(
    params: GetRecentItemListRequest,
    options?: RequestOptions
  ): Promise<GetRecentItemListResponse> {
    return ShopeeFetch.fetch<GetRecentItemListResponse>(
      this.config,
      "/livestream/get_recent_item_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get basic information about the live streaming room, including cover, title, description, type (test live or normal live), create time, update time, stream url, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSessionDetailResponse>} Promise resolving to the response
   */
  public async getSessionDetail(
    params: GetSessionDetailRequest,
    options?: RequestOptions
  ): Promise<GetSessionDetailResponse> {
    return ShopeeFetch.fetch<GetSessionDetailResponse>(
      this.config,
      "/livestream/get_session_detail",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get real-time indicator data of live stream products, including product clicks, add-to-cart, etc. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionItemMetricRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSessionItemMetricResponse>} Promise resolving to the response
   */
  public async getSessionItemMetric(
    params: GetSessionItemMetricRequest,
    options?: RequestOptions
  ): Promise<GetSessionItemMetricResponse> {
    return ShopeeFetch.fetch<GetSessionItemMetricResponse>(
      this.config,
      "/livestream/get_session_item_metric",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get real-time indicator data of the live stream room, including the number of likes, comments, shares, views, etc.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetSessionMetricRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetSessionMetricResponse>} Promise resolving to the response
   */
  public async getSessionMetric(
    params: GetSessionMetricRequest,
    options?: RequestOptions
  ): Promise<GetSessionMetricResponse> {
    return ShopeeFetch.fetch<GetSessionMetricResponse>(
      this.config,
      "/livestream/get_session_metric",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {GetShowItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetShowItemResponse>} Promise resolving to the response
   */
  public async getShowItem(
    params: GetShowItemRequest,
    options?: RequestOptions
  ): Promise<GetShowItemResponse> {
    return ShopeeFetch.fetch<GetShowItemResponse>(this.config, "/livestream/get_show_item", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Post comment in the live stream as streamer. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {PostCommentRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<PostCommentResponse>} Promise resolving to the response
   */
  public async postComment(
    params: PostCommentRequest,
    options?: RequestOptions
  ): Promise<PostCommentResponse> {
    return ShopeeFetch.fetch<PostCommentResponse>(this.config, "/livestream/post_comment", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Start Live. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {StartSessionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<StartSessionResponse>} Promise resolving to the response
   */
  public async startSession(
    params: StartSessionRequest,
    options?: RequestOptions
  ): Promise<StartSessionResponse> {
    return ShopeeFetch.fetch<StartSessionResponse>(this.config, "/livestream/start_session", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Unban a user from posting comments. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UnbanUserCommentRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UnbanUserCommentResponse>} Promise resolving to the response
   */
  public async unbanUserComment(
    params: UnbanUserCommentRequest,
    options?: RequestOptions
  ): Promise<UnbanUserCommentResponse> {
    return ShopeeFetch.fetch<UnbanUserCommentResponse>(
      this.config,
      "/livestream/unban_user_comment",
      {
        method: "POST",
        auth: "user",
        body: params,
        request: options,
      }
    );
  }
  /**
   * Update the order of items in item bag. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateItemListResponse>} Promise resolving to the response
   */
  public async updateItemList(
    params: UpdateItemListRequest,
    options?: RequestOptions
  ): Promise<UpdateItemListResponse> {
    return ShopeeFetch.fetch<UpdateItemListResponse>(this.config, "/livestream/update_item_list", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Update live stream information, including cover, title, description, and type (test live or normal live). (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateSessionRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateSessionResponse>} Promise resolving to the response
   */
  public async updateSession(
    params: UpdateSessionRequest,
    options?: RequestOptions
  ): Promise<UpdateSessionResponse> {
    return ShopeeFetch.fetch<UpdateSessionResponse>(this.config, "/livestream/update_session", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Set the showing item. (For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UpdateShowItemRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateShowItemResponse>} Promise resolving to the response
   */
  public async updateShowItem(
    params: UpdateShowItemRequest,
    options?: RequestOptions
  ): Promise<UpdateShowItemResponse> {
    return ShopeeFetch.fetch<UpdateShowItemResponse>(this.config, "/livestream/update_show_item", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * Upload an image as the live stream cover.(For TW, ID, TH, PH, MY, SG, VN)
   *
   * @param {UploadImageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadImageResponse>} Promise resolving to the response
   */
  public async uploadImage(
    params: UploadImageRequest,
    options?: RequestOptions
  ): Promise<UploadImageResponse> {
    return ShopeeFetch.fetch<UploadImageResponse>(this.config, "/livestream/upload_image", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
}
