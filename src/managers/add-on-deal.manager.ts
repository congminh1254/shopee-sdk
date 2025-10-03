import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  AddAddOnDealParams,
  AddAddOnDealResponse,
  AddAddOnDealMainItemParams,
  AddAddOnDealMainItemResponse,
  AddAddOnDealSubItemParams,
  AddAddOnDealSubItemResponse,
  DeleteAddOnDealParams,
  DeleteAddOnDealResponse,
  DeleteAddOnDealMainItemParams,
  DeleteAddOnDealMainItemResponse,
  DeleteAddOnDealSubItemParams,
  DeleteAddOnDealSubItemResponse,
  EndAddOnDealParams,
  EndAddOnDealResponse,
  GetAddOnDealParams,
  GetAddOnDealResponse,
  GetAddOnDealListParams,
  GetAddOnDealListResponse,
  GetAddOnDealMainItemParams,
  GetAddOnDealMainItemResponse,
  GetAddOnDealSubItemParams,
  GetAddOnDealSubItemResponse,
  UpdateAddOnDealParams,
  UpdateAddOnDealResponse,
  UpdateAddOnDealMainItemParams,
  UpdateAddOnDealMainItemResponse,
  UpdateAddOnDealSubItemParams,
  UpdateAddOnDealSubItemResponse,
} from "../schemas/add-on-deal.js";
import { ShopeeFetch } from "../fetch.js";

export class AddOnDealManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Create a new add-on deal activity
   * @param {AddAddOnDealParams} params - Parameters for creating a new add-on deal
   * @returns {Promise<AddAddOnDealResponse>} The response containing the created add-on deal ID
   *
   * Note: A maximum of 1000 add-on deals can be created.
   * The start time must be 1 hour later than current time.
   * The end time must be 1 hour later than start time.
   */
  async addAddOnDeal(params: AddAddOnDealParams): Promise<AddAddOnDealResponse> {
    const response = await ShopeeFetch.fetch<AddAddOnDealResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Add main items to an existing add-on deal activity
   * @param {AddAddOnDealMainItemParams} params - Parameters for adding main items to an add-on deal
   * @returns {Promise<AddAddOnDealMainItemResponse>} The response containing the list of added main items
   *
   * Main items are the products that customers must purchase to be eligible for the add-on deal.
   */
  async addAddOnDealMainItem(
    params: AddAddOnDealMainItemParams
  ): Promise<AddAddOnDealMainItemResponse> {
    const response = await ShopeeFetch.fetch<AddAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Add sub items (discounted or gift items) to an existing add-on deal activity
   * @param {AddAddOnDealSubItemParams} params - Parameters for adding sub items to an add-on deal
   * @returns {Promise<AddAddOnDealSubItemResponse>} The response containing any failed sub items
   *
   * Sub items are the products offered at a discount or as gifts when customers purchase main items.
   * The response includes a list of items that failed to be added with error details.
   */
  async addAddOnDealSubItem(
    params: AddAddOnDealSubItemParams
  ): Promise<AddAddOnDealSubItemResponse> {
    const response = await ShopeeFetch.fetch<AddAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/add_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete an existing add-on deal activity
   * @param {DeleteAddOnDealParams} params - Parameters for deleting an add-on deal
   * @returns {Promise<DeleteAddOnDealResponse>} The response containing the deleted add-on deal ID
   *
   * Note: Can only delete upcoming add-on deals that haven't started yet.
   * Will return an error if attempting to delete an add-on deal that has already started.
   */
  async deleteAddOnDeal(params: DeleteAddOnDealParams): Promise<DeleteAddOnDealResponse> {
    const response = await ShopeeFetch.fetch<DeleteAddOnDealResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete main items from an existing add-on deal activity
   * @param {DeleteAddOnDealMainItemParams} params - Parameters for deleting main items from an add-on deal
   * @returns {Promise<DeleteAddOnDealMainItemResponse>} The response containing any failed item deletions
   *
   * The response includes:
   * - add_on_deal_id: The ID of the add-on deal
   * - failed_item_id_list: List of item IDs that failed to be deleted
   */
  async deleteAddOnDealMainItem(
    params: DeleteAddOnDealMainItemParams
  ): Promise<DeleteAddOnDealMainItemResponse> {
    const response = await ShopeeFetch.fetch<DeleteAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete sub items from an existing add-on deal activity
   * @param {DeleteAddOnDealSubItemParams} params - Parameters for deleting sub items from an add-on deal
   * @returns {Promise<DeleteAddOnDealSubItemResponse>} The response containing any failed sub item deletions
   *
   * The response includes a list of sub items that failed to be deleted with error details.
   * Note: At least one sub item should remain in the add-on deal.
   */
  async deleteAddOnDealSubItem(
    params: DeleteAddOnDealSubItemParams
  ): Promise<DeleteAddOnDealSubItemResponse> {
    const response = await ShopeeFetch.fetch<DeleteAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/delete_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * End an ongoing add-on deal activity immediately
   * @param {EndAddOnDealParams} params - Parameters for ending an add-on deal
   * @returns {Promise<EndAddOnDealResponse>} The response containing the ended add-on deal ID
   *
   * Note: Can only end add-on deals that are currently ongoing/active.
   * Will return an error if attempting to end an upcoming or expired add-on deal.
   */
  async endAddOnDeal(params: EndAddOnDealParams): Promise<EndAddOnDealResponse> {
    const response = await ShopeeFetch.fetch<EndAddOnDealResponse>(
      this.config,
      "/add_on_deal/end_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get detailed information about an add-on deal activity
   * @param {GetAddOnDealParams} params - Parameters for getting add-on deal details
   * @returns {Promise<GetAddOnDealResponse>} The response containing comprehensive add-on deal information
   *
   * The response includes:
   * - Basic add-on deal details (ID, name, start/end time, etc.)
   * - Promotion type and configuration
   * - Purchase limits and requirements
   * - Sub item display priority
   * - Source information
   */
  async getAddOnDeal(params: GetAddOnDealParams): Promise<GetAddOnDealResponse> {
    const response = await ShopeeFetch.fetch<GetAddOnDealResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get a list of add-on deal activities with pagination
   * @param {GetAddOnDealListParams} params - Parameters for retrieving add-on deal list
   * @param {AddOnDealPromotionStatus} params.promotion_status - Filter by promotion status (all, ongoing, upcoming, expired)
   * @param {number} [params.page_no] - Page number to retrieve (default: 1, max: 1000)
   * @param {number} [params.page_size] - Number of items per page (default: 100, max: 100)
   * @returns {Promise<GetAddOnDealListResponse>} The response containing a paginated list of add-on deals
   *
   * The response includes:
   * - add_on_deal_list: List of add-on deals with full details
   * - more: Boolean indicating if there are more pages
   */
  async getAddOnDealList(params: GetAddOnDealListParams): Promise<GetAddOnDealListResponse> {
    const response = await ShopeeFetch.fetch<GetAddOnDealListResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get main items in an add-on deal activity
   * @param {GetAddOnDealMainItemParams} params - Parameters for getting main items
   * @returns {Promise<GetAddOnDealMainItemResponse>} The response containing the list of main items
   *
   * Main items are the products that customers must purchase to be eligible for the add-on deal.
   */
  async getAddOnDealMainItem(
    params: GetAddOnDealMainItemParams
  ): Promise<GetAddOnDealMainItemResponse> {
    const response = await ShopeeFetch.fetch<GetAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_main_item",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get sub items (discounted or gift items) in an add-on deal activity
   * @param {GetAddOnDealSubItemParams} params - Parameters for getting sub items
   * @returns {Promise<GetAddOnDealSubItemResponse>} The response containing the list of sub items
   *
   * Sub items are the products offered at a discount or as gifts when customers purchase main items.
   */
  async getAddOnDealSubItem(
    params: GetAddOnDealSubItemParams
  ): Promise<GetAddOnDealSubItemResponse> {
    const response = await ShopeeFetch.fetch<GetAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/get_add_on_deal_sub_item",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Update an existing add-on deal activity
   * @param {UpdateAddOnDealParams} params - Parameters for updating an add-on deal
   * @returns {Promise<UpdateAddOnDealResponse>} The response containing the updated add-on deal information
   *
   * Note: For ongoing add-on deals, update capabilities may be limited.
   * Only certain fields can be modified depending on the add-on deal status.
   * The start time of upcoming add-on deals cannot be shortened.
   * Promotion end time can only be changed to an earlier timing.
   */
  async updateAddOnDeal(params: UpdateAddOnDealParams): Promise<UpdateAddOnDealResponse> {
    const response = await ShopeeFetch.fetch<UpdateAddOnDealResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Update main items in an existing add-on deal activity
   * @param {UpdateAddOnDealMainItemParams} params - Parameters for updating main items
   * @returns {Promise<UpdateAddOnDealMainItemResponse>} The response containing the updated main items
   *
   * Main items are the products that customers must purchase to be eligible for the add-on deal.
   */
  async updateAddOnDealMainItem(
    params: UpdateAddOnDealMainItemParams
  ): Promise<UpdateAddOnDealMainItemResponse> {
    const response = await ShopeeFetch.fetch<UpdateAddOnDealMainItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_main_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Update sub items in an existing add-on deal activity
   * @param {UpdateAddOnDealSubItemParams} params - Parameters for updating sub items
   * @returns {Promise<UpdateAddOnDealSubItemResponse>} The response containing any failed sub item updates
   *
   * Sub items are the products offered at a discount or as gifts when customers purchase main items.
   * The response includes a list of sub items that failed to be updated with error details.
   */
  async updateAddOnDealSubItem(
    params: UpdateAddOnDealSubItemParams
  ): Promise<UpdateAddOnDealSubItemResponse> {
    const response = await ShopeeFetch.fetch<UpdateAddOnDealSubItemResponse>(
      this.config,
      "/add_on_deal/update_add_on_deal_sub_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
