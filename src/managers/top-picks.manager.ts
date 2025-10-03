import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  AddTopPicksParams,
  AddTopPicksResponse,
  DeleteTopPicksParams,
  DeleteTopPicksResponse,
  GetTopPicksListResponse,
  UpdateTopPicksParams,
  UpdateTopPicksResponse,
} from "../schemas/top-picks.js";
import { ShopeeFetch } from "../fetch.js";

export class TopPicksManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Add a new top picks collection
   * @param {AddTopPicksParams} params - Parameters for creating a new top picks collection
   * @returns {Promise<AddTopPicksResponse>} The response containing the created collection list
   *
   * Top picks are featured product collections that can be displayed on your shop page.
   * Only one collection can be activated at a time. When you activate a new collection,
   * all other collections will be automatically deactivated.
   *
   * @throws {Error} When the API request fails or returns an error
   * - top_pick.top_pick_name_duplication: The Top-picks name already exists
   * - top_pick.top_pick_item_id_not_exist: Item does not belong to shop
   * - top_pick.exceed_max_top_pick_count: The created top picks can not more than limit
   */
  async addTopPicks(params: AddTopPicksParams): Promise<AddTopPicksResponse> {
    const response = await ShopeeFetch.fetch<AddTopPicksResponse>(
      this.config,
      "/top_picks/add_top_picks",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete an existing top picks collection
   * @param {DeleteTopPicksParams} params - Parameters for deleting a top picks collection
   * @returns {Promise<DeleteTopPicksResponse>} The response containing the deleted collection ID
   *
   * Note: Only disabled/deactivated top picks collections can be deleted.
   * You cannot delete an activated collection.
   *
   * @throws {Error} When the API request fails or returns an error
   * - top_pick.top_pick_delete_status_error: The enabled top-picks can not be deleted
   * - common.error_not_found: The collection does not exist
   */
  async deleteTopPicks(params: DeleteTopPicksParams): Promise<DeleteTopPicksResponse> {
    const response = await ShopeeFetch.fetch<DeleteTopPicksResponse>(
      this.config,
      "/top_picks/delete_top_picks",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get all top picks collections for the shop
   * @returns {Promise<GetTopPicksListResponse>} The response containing all top picks collections
   *
   * This endpoint retrieves all top picks collections in your shop, including both
   * activated and deactivated collections. Each collection contains:
   * - top_picks_id: The unique identifier
   * - name: The collection name
   * - is_activated: Activation status
   * - item_list: Array of items with details (name, id, price, sales)
   */
  async getTopPicksList(): Promise<GetTopPicksListResponse> {
    const response = await ShopeeFetch.fetch<GetTopPicksListResponse>(
      this.config,
      "/top_picks/get_top_picks_list",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Update an existing top picks collection
   * @param {UpdateTopPicksParams} params - Parameters for updating a top picks collection
   * @returns {Promise<UpdateTopPicksResponse>} The response containing the updated collection list
   *
   * You can update the name, items, and activation status of a collection.
   * When updating item_id_list, it will completely replace the old item list.
   * If you set is_activated to true, all other collections will be automatically deactivated.
   *
   * @throws {Error} When the API request fails or returns an error
   * - top_pick.top_pick_name_duplication: The Top-picks name already exists
   * - top_pick.top_pick_item_id_not_exist: Item does not belong to shop
   * - top_pick.top_pick_item_id_duplication: The top-picks has duplicative item
   * - common.error_not_found: The collection does not exist
   */
  async updateTopPicks(params: UpdateTopPicksParams): Promise<UpdateTopPicksResponse> {
    const response = await ShopeeFetch.fetch<UpdateTopPicksResponse>(
      this.config,
      "/top_picks/update_top_picks",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
