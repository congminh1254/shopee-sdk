import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  AddBundleDealParams,
  AddBundleDealResponse,
  AddBundleDealItemParams,
  AddBundleDealItemResponse,
  DeleteBundleDealParams,
  DeleteBundleDealResponse,
  DeleteBundleDealItemParams,
  DeleteBundleDealItemResponse,
  EndBundleDealParams,
  EndBundleDealResponse,
  GetBundleDealParams,
  GetBundleDealResponse,
  GetBundleDealItemParams,
  GetBundleDealItemResponse,
  GetBundleDealListParams,
  GetBundleDealListResponse,
  UpdateBundleDealParams,
  UpdateBundleDealResponse,
  UpdateBundleDealItemParams,
  UpdateBundleDealItemResponse,
} from "../schemas/bundle-deal.js";
import { ShopeeFetch } from "../fetch.js";

export class BundleDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Create a new bundle deal activity
   * @param {AddBundleDealParams} params - Parameters for creating a new bundle deal
   * @returns {Promise<AddBundleDealResponse>} The response containing the created bundle deal ID
   *
   * Note: A maximum of 1000 bundle deals can be created.
   * The bundle deal must follow the pricing rules based on rule_type.
   */
  async addBundleDeal(params: AddBundleDealParams): Promise<AddBundleDealResponse> {
    const response = await ShopeeFetch.fetch<AddBundleDealResponse>(
      this.config,
      "/bundle_deal/add_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Add items to an existing bundle deal activity
   * @param {AddBundleDealItemParams} params - Parameters for adding items to a bundle deal
   * @returns {Promise<AddBundleDealItemResponse>} The response containing lists of successful and failed items
   *
   * The response includes:
   * - success_list: Array of item IDs that were successfully added
   * - failed_list: Array of items that failed to be added with error details
   */
  async addBundleDealItem(params: AddBundleDealItemParams): Promise<AddBundleDealItemResponse> {
    const response = await ShopeeFetch.fetch<AddBundleDealItemResponse>(
      this.config,
      "/bundle_deal/add_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete an existing bundle deal activity
   * @param {DeleteBundleDealParams} params - Parameters for deleting a bundle deal
   * @returns {Promise<DeleteBundleDealResponse>} The response containing the deleted bundle deal ID
   *
   * Note: Can only delete upcoming bundle deals that haven't started yet.
   * Will return an error if attempting to delete a bundle deal that has already started.
   */
  async deleteBundleDeal(params: DeleteBundleDealParams): Promise<DeleteBundleDealResponse> {
    const response = await ShopeeFetch.fetch<DeleteBundleDealResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete items from an existing bundle deal activity
   * @param {DeleteBundleDealItemParams} params - Parameters for deleting items from a bundle deal
   * @returns {Promise<DeleteBundleDealItemResponse>} The response containing lists of successful and failed deletions
   *
   * The response includes:
   * - success_list: Array of item IDs that were successfully deleted
   * - failed_list: Array of items that failed to be deleted with error details
   */
  async deleteBundleDealItem(
    params: DeleteBundleDealItemParams
  ): Promise<DeleteBundleDealItemResponse> {
    const response = await ShopeeFetch.fetch<DeleteBundleDealItemResponse>(
      this.config,
      "/bundle_deal/delete_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * End an ongoing bundle deal activity immediately
   * @param {EndBundleDealParams} params - Parameters for ending a bundle deal
   * @returns {Promise<EndBundleDealResponse>} The response containing the ended bundle deal ID
   *
   * Note: Can only end bundle deals that are currently ongoing/active.
   * Will return an error if attempting to end an upcoming or expired bundle deal.
   */
  async endBundleDeal(params: EndBundleDealParams): Promise<EndBundleDealResponse> {
    const response = await ShopeeFetch.fetch<EndBundleDealResponse>(
      this.config,
      "/bundle_deal/end_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get detailed information about a bundle deal activity
   * @param {GetBundleDealParams} params - Parameters for getting bundle deal details
   * @returns {Promise<GetBundleDealResponse>} The response containing comprehensive bundle deal information
   *
   * The response includes:
   * - Basic bundle deal details (ID, name, timing, etc.)
   * - Bundle deal rule configuration (type, pricing, min amount, etc.)
   * - Purchase limits
   * - Additional tiers if configured
   */
  async getBundleDeal(params: GetBundleDealParams): Promise<GetBundleDealResponse> {
    const response = await ShopeeFetch.fetch<GetBundleDealResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get the list of items in a bundle deal
   * @param {GetBundleDealItemParams} params - Parameters for getting bundle deal items
   * @returns {Promise<GetBundleDealItemResponse>} The response containing the list of item IDs
   *
   * The response includes:
   * - item_list: Array of item IDs that are part of the bundle deal
   */
  async getBundleDealItem(params: GetBundleDealItemParams): Promise<GetBundleDealItemResponse> {
    const response = await ShopeeFetch.fetch<GetBundleDealItemResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get a list of bundle deal activities with pagination
   * @param {GetBundleDealListParams} params - Parameters for retrieving bundle deal list
   * @param {BundleDealTimeStatus} [params.time_status] - Filter by bundle deal status (default: ALL)
   * @param {number} [params.page_no] - Page number to retrieve (default: 1)
   * @param {number} [params.page_size] - Number of items per page (default: 20, max: 1000)
   * @returns {Promise<GetBundleDealListResponse>} The response containing a paginated list of bundle deals
   *
   * The response includes:
   * - bundle_deal_list: List of bundle deals with full details
   * - more: Boolean indicating if there are more pages
   */
  async getBundleDealList(
    params: GetBundleDealListParams = {}
  ): Promise<GetBundleDealListResponse> {
    const response = await ShopeeFetch.fetch<GetBundleDealListResponse>(
      this.config,
      "/bundle_deal/get_bundle_deal_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Update an existing bundle deal activity
   * @param {UpdateBundleDealParams} params - Parameters for updating a bundle deal
   * @returns {Promise<UpdateBundleDealResponse>} The response containing the updated bundle deal information
   *
   * Note: For ongoing bundle deals, update capabilities may be limited.
   * Only certain fields can be modified depending on the bundle deal status.
   */
  async updateBundleDeal(params: UpdateBundleDealParams): Promise<UpdateBundleDealResponse> {
    const response = await ShopeeFetch.fetch<UpdateBundleDealResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Update items in an existing bundle deal activity
   * @param {UpdateBundleDealItemParams} params - Parameters for updating bundle deal items
   * @returns {Promise<UpdateBundleDealItemResponse>} The response containing lists of successful and failed updates
   *
   * The response includes:
   * - success_list: Array of item IDs that were successfully updated
   * - failed_list: Array of items that failed to be updated with error details
   */
  async updateBundleDealItem(
    params: UpdateBundleDealItemParams
  ): Promise<UpdateBundleDealItemResponse> {
    const response = await ShopeeFetch.fetch<UpdateBundleDealItemResponse>(
      this.config,
      "/bundle_deal/update_bundle_deal_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
