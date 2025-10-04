import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  CreateSessionParams,
  CreateSessionResponse,
  StartSessionParams,
  StartSessionResponse,
  EndSessionParams,
  EndSessionResponse,
  UpdateSessionParams,
  UpdateSessionResponse,
  GetSessionDetailParams,
  GetSessionDetailResponse,
  GetSessionMetricParams,
  GetSessionMetricResponse,
  GetSessionItemMetricParams,
  GetSessionItemMetricResponse,
  AddItemListParams,
  AddItemListResponse,
  UpdateItemListParams,
  UpdateItemListResponse,
  DeleteItemListParams,
  DeleteItemListResponse,
  GetItemListParams,
  GetItemListResponse,
  GetItemCountParams,
  GetItemCountResponse,
  GetRecentItemListParams,
  GetRecentItemListResponse,
  GetLikeItemListParams,
  GetLikeItemListResponse,
  ApplyItemSetParams,
  ApplyItemSetResponse,
  GetItemSetListParams,
  GetItemSetListResponse,
  GetItemSetItemListParams,
  GetItemSetItemListResponse,
  GetShowItemParams,
  GetShowItemResponse,
  UpdateShowItemParams,
  UpdateShowItemResponse,
  DeleteShowItemParams,
  DeleteShowItemResponse,
  PostCommentParams,
  PostCommentResponse,
  GetLatestCommentListParams,
  GetLatestCommentListResponse,
  BanUserCommentParams,
  BanUserCommentResponse,
  UnbanUserCommentParams,
  UnbanUserCommentResponse,
  UploadImageParams,
  UploadImageResponse,
} from "../schemas/livestream.js";
import { ShopeeFetch } from "../fetch.js";

export class LiveStreamManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Create a new livestream session with basic information.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for creating a livestream session
   * @param params.title - The title of livestream session, cannot exceed 200 characters (required)
   * @param params.cover_image_url - The cover image URL of livestream session (required)
   * @param params.description - The description of livestream session, cannot exceed 200 characters
   * @param params.is_test - Indicate whether the livestream session is for testing purpose only
   *
   * @returns A promise that resolves to the create session response containing:
   * - session_id: The identifier of the created livestream session
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async createSession(params: CreateSessionParams): Promise<CreateSessionResponse> {
    const response = await ShopeeFetch.fetch<CreateSessionResponse>(
      this.config,
      "/livestream/create_session",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Start a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for starting a livestream session
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.domain_id - The identifier of the stream domain (required)
   *
   * @returns A promise that resolves to the start session response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async startSession(params: StartSessionParams): Promise<StartSessionResponse> {
    const response = await ShopeeFetch.fetch<StartSessionResponse>(
      this.config,
      "/livestream/start_session",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * End a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for ending a livestream session
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the end session response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async endSession(params: EndSessionParams): Promise<EndSessionResponse> {
    const response = await ShopeeFetch.fetch<EndSessionResponse>(
      this.config,
      "/livestream/end_session",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Update basic information of a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for updating a livestream session
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.title - The title of livestream session, cannot exceed 200 characters
   * @param params.description - The description of livestream session, cannot exceed 200 characters
   * @param params.cover_image_url - The cover image URL of livestream session
   *
   * @returns A promise that resolves to the update session response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async updateSession(params: UpdateSessionParams): Promise<UpdateSessionResponse> {
    const response = await ShopeeFetch.fetch<UpdateSessionResponse>(
      this.config,
      "/livestream/update_session",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Get basic information about a livestream session including cover, title, description,
   * type (test live or normal live), create time, update time, stream url, etc.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting session detail
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the session detail response containing:
   * - session_id: Session identifier
   * - title: Session title
   * - description: Session description
   * - cover_image_url: Cover image URL
   * - status: Session status (0=Not started, 1=Ongoing, 2=Ended)
   * - share_url: Share URL
   * - is_test: Whether it's a test session
   * - create_time: Creation timestamp
   * - update_time: Last update timestamp
   * - start_time: Start timestamp
   * - end_time: End timestamp
   * - stream_url_list: Stream URL information
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getSessionDetail(params: GetSessionDetailParams): Promise<GetSessionDetailResponse> {
    const response = await ShopeeFetch.fetch<GetSessionDetailResponse>(
      this.config,
      "/livestream/get_session_detail",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get metrics for a livestream session including GMV, orders, viewers, engagement metrics.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting session metrics
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the session metric response containing:
   * - gmv: Value of placed orders during livestream
   * - atc: Number of "Add To Cart" clicks
   * - ctr: Click-through rate
   * - co: Conversion rate
   * - orders: Number of placed orders
   * - ccu: Number of concurrent viewers
   * - engage_ccu_1m: Number of engaged concurrent viewers (>1 min)
   * - peak_ccu: Peak concurrent viewers
   * - likes: Number of likes
   * - comments: Number of comments
   * - shares: Number of shares
   * - views: Number of views
   * - avg_viewing_duration: Average viewing duration
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getSessionMetric(params: GetSessionMetricParams): Promise<GetSessionMetricResponse> {
    const response = await ShopeeFetch.fetch<GetSessionMetricResponse>(
      this.config,
      "/livestream/get_session_metric",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get item-level metrics for a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting session item metrics
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the session item metric response containing:
   * - more: Whether there are more pages
   * - next_offset: Next offset for pagination
   * - list: List of item metrics with clicks, orders, and GMV
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getSessionItemMetric(
    params: GetSessionItemMetricParams
  ): Promise<GetSessionItemMetricResponse> {
    const response = await ShopeeFetch.fetch<GetSessionItemMetricResponse>(
      this.config,
      "/livestream/get_session_item_metric",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Add items to a livestream session's shopping bag.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for adding items
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.item_list - The list of items to add (required)
   *
   * @returns A promise that resolves to the add item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async addItemList(params: AddItemListParams): Promise<AddItemListResponse> {
    const response = await ShopeeFetch.fetch<AddItemListResponse>(
      this.config,
      "/livestream/add_item_list",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Update the order of items in a livestream session's shopping bag.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for updating items
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.item_list - The list of items to update with new order (required)
   *
   * @returns A promise that resolves to the update item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async updateItemList(params: UpdateItemListParams): Promise<UpdateItemListResponse> {
    const response = await ShopeeFetch.fetch<UpdateItemListResponse>(
      this.config,
      "/livestream/update_item_list",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete items from a livestream session's shopping bag.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for deleting items
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.item_list - The list of items to delete (required)
   *
   * @returns A promise that resolves to the delete item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async deleteItemList(params: DeleteItemListParams): Promise<DeleteItemListResponse> {
    const response = await ShopeeFetch.fetch<DeleteItemListResponse>(
      this.config,
      "/livestream/delete_item_list",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Get the list of items in a livestream session's shopping bag.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting item list
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the item list response containing:
   * - more: Whether there are more pages
   * - next_offset: Next offset for pagination
   * - list: List of items with details, pricing, and affiliate info
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getItemList(params: GetItemListParams): Promise<GetItemListResponse> {
    const response = await ShopeeFetch.fetch<GetItemListResponse>(
      this.config,
      "/livestream/get_item_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get the total count of items in a livestream session's shopping bag.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting item count
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the item count response containing:
   * - total_count: Total number of items
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getItemCount(params: GetItemCountParams): Promise<GetItemCountResponse> {
    const response = await ShopeeFetch.fetch<GetItemCountResponse>(
      this.config,
      "/livestream/get_item_count",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get recently added items in a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting recent item list
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the recent item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getRecentItemList(params: GetRecentItemListParams): Promise<GetRecentItemListResponse> {
    const response = await ShopeeFetch.fetch<GetRecentItemListResponse>(
      this.config,
      "/livestream/get_recent_item_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get items that viewers liked during the livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting like item list
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the like item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getLikeItemList(params: GetLikeItemListParams): Promise<GetLikeItemListResponse> {
    const response = await ShopeeFetch.fetch<GetLikeItemListResponse>(
      this.config,
      "/livestream/get_like_item_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Apply a pre-defined item set to a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for applying item set
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.item_set_id - The identifier of item set (required)
   *
   * @returns A promise that resolves to the apply item set response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async applyItemSet(params: ApplyItemSetParams): Promise<ApplyItemSetResponse> {
    const response = await ShopeeFetch.fetch<ApplyItemSetResponse>(
      this.config,
      "/livestream/apply_item_set",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Get the list of available item sets.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting item set list
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the item set list response containing:
   * - more: Whether there are more pages
   * - next_offset: Next offset for pagination
   * - list: List of item sets with ID, name, and item count
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getItemSetList(params: GetItemSetListParams): Promise<GetItemSetListResponse> {
    const response = await ShopeeFetch.fetch<GetItemSetListResponse>(
      this.config,
      "/livestream/get_item_set_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get the items in a specific item set.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting item set item list
   * @param params.item_set_id - The identifier of item set (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the item set item list response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getItemSetItemList(
    params: GetItemSetItemListParams
  ): Promise<GetItemSetItemListResponse> {
    const response = await ShopeeFetch.fetch<GetItemSetItemListResponse>(
      this.config,
      "/livestream/get_item_set_item_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Get the currently displayed item in a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting show item
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the show item response containing:
   * - item: The currently displayed item (null if no item is being shown)
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getShowItem(params: GetShowItemParams): Promise<GetShowItemResponse> {
    const response = await ShopeeFetch.fetch<GetShowItemResponse>(
      this.config,
      "/livestream/get_show_item",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Update which item to display in a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for updating show item
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.item_id - Shopee's unique identifier for an item (required)
   * @param params.shop_id - The shop id of this item (required)
   *
   * @returns A promise that resolves to the update show item response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async updateShowItem(params: UpdateShowItemParams): Promise<UpdateShowItemResponse> {
    const response = await ShopeeFetch.fetch<UpdateShowItemResponse>(
      this.config,
      "/livestream/update_show_item",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Remove the currently displayed item from a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for deleting show item
   * @param params.session_id - The identifier of livestream session (required)
   *
   * @returns A promise that resolves to the delete show item response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async deleteShowItem(params: DeleteShowItemParams): Promise<DeleteShowItemResponse> {
    const response = await ShopeeFetch.fetch<DeleteShowItemResponse>(
      this.config,
      "/livestream/delete_show_item",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Post a comment to a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for posting a comment
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.comment - Comment text (required)
   *
   * @returns A promise that resolves to the post comment response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async postComment(params: PostCommentParams): Promise<PostCommentResponse> {
    const response = await ShopeeFetch.fetch<PostCommentResponse>(
      this.config,
      "/livestream/post_comment",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Get the latest comments from a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for getting latest comment list
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.offset - Starting entry of data to return (required)
   * @param params.page_size - Maximum number of entries per page, 1-100 (required)
   *
   * @returns A promise that resolves to the latest comment list response containing:
   * - more: Whether there are more pages
   * - next_offset: Next offset for pagination
   * - list: List of comments with user info and timestamp
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getLatestCommentList(
    params: GetLatestCommentListParams
  ): Promise<GetLatestCommentListResponse> {
    const response = await ShopeeFetch.fetch<GetLatestCommentListResponse>(
      this.config,
      "/livestream/get_latest_comment_list",
      {
        method: "GET",
        params,
      }
    );

    return response;
  }

  /**
   * Ban a user from commenting in a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for banning a user
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.user_id - User ID to ban (required)
   *
   * @returns A promise that resolves to the ban user comment response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async banUserComment(params: BanUserCommentParams): Promise<BanUserCommentResponse> {
    const response = await ShopeeFetch.fetch<BanUserCommentResponse>(
      this.config,
      "/livestream/ban_user_comment",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Unban a user from commenting in a livestream session.
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for unbanning a user
   * @param params.session_id - The identifier of livestream session (required)
   * @param params.user_id - User ID to unban (required)
   *
   * @returns A promise that resolves to the unban user comment response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async unbanUserComment(params: UnbanUserCommentParams): Promise<UnbanUserCommentResponse> {
    const response = await ShopeeFetch.fetch<UnbanUserCommentResponse>(
      this.config,
      "/livestream/unban_user_comment",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Upload an image for use in livestream (e.g., cover image).
   * Only available for TW, ID, TH regions.
   *
   * @param params - Parameters for uploading an image
   * @param params.image - The image file to upload (required)
   *
   * @returns A promise that resolves to the upload image response containing:
   * - image_url: The uploaded image URL
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async uploadImage(params: UploadImageParams): Promise<UploadImageResponse> {
    const response = await ShopeeFetch.fetch<UploadImageResponse>(
      this.config,
      "/livestream/upload_image",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }
}
