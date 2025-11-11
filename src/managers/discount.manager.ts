import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  AddDiscountParams,
  AddDiscountResponse,
  AddDiscountItemParams,
  AddDiscountItemResponse,
  DeleteDiscountParams,
  DeleteDiscountResponse,
  DeleteDiscountItemParams,
  DeleteDiscountItemResponse,
  EndDiscountParams,
  EndDiscountResponse,
  GetDiscountParams,
  GetDiscountResponse,
  GetDiscountListParams,
  GetDiscountListResponse,
  UpdateDiscountParams,
  UpdateDiscountResponse,
  UpdateDiscountItemParams,
  UpdateDiscountItemResponse,
  GetSipDiscountsParams,
  GetSipDiscountsResponse,
  SetSipDiscountParams,
  SetSipDiscountResponse,
  DeleteSipDiscountParams,
  DeleteSipDiscountResponse,
} from "../schemas/discount.js";
import { ShopeeFetch } from "../fetch.js";

export class DiscountManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Add a new shop discount activity
   * @param {AddDiscountParams} params - Parameters for creating a new discount
   * @returns {Promise<AddDiscountResponse>} The response containing the created discount ID
   *
   * Note: The start time must be 1 hour later than current time.
   * The end time must be 1 hour later than start time, and the discount period must be less than 180 days.
   */
  async addDiscount(params: AddDiscountParams): Promise<AddDiscountResponse> {
    const response = await ShopeeFetch.fetch<AddDiscountResponse>(
      this.config,
      "/discount/add_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Add items to an existing discount activity
   * @param {AddDiscountItemParams} params - Parameters for adding items to a discount
   * @returns {Promise<AddDiscountItemResponse>} The response containing the count of added items and any errors
   *
   * The response includes:
   * - discount_id: The ID of the discount activity
   * - count: Number of items successfully added
   * - error_list: List of items that failed to be added with error details
   * - warning: Warning message if any
   */
  async addDiscountItem(params: AddDiscountItemParams): Promise<AddDiscountItemResponse> {
    const response = await ShopeeFetch.fetch<AddDiscountItemResponse>(
      this.config,
      "/discount/add_discount_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete an existing discount activity
   * @param {DeleteDiscountParams} params - Parameters for deleting a discount
   * @returns {Promise<DeleteDiscountResponse>} The response containing the deleted discount ID and modification time
   *
   * Note: Can only delete upcoming discounts that haven't started yet.
   * Will return an error if attempting to delete a discount that has already started.
   */
  async deleteDiscount(params: DeleteDiscountParams): Promise<DeleteDiscountResponse> {
    const response = await ShopeeFetch.fetch<DeleteDiscountResponse>(
      this.config,
      "/discount/delete_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete items from an existing discount activity
   * @param {DeleteDiscountItemParams} params - Parameters for deleting items from a discount
   * @returns {Promise<DeleteDiscountItemResponse>} The response containing the discount ID and any errors
   *
   * The response includes:
   * - discount_id: The ID of the discount activity
   * - error_list: List of items that failed to be deleted with error details
   */
  async deleteDiscountItem(params: DeleteDiscountItemParams): Promise<DeleteDiscountItemResponse> {
    const response = await ShopeeFetch.fetch<DeleteDiscountItemResponse>(
      this.config,
      "/discount/delete_discount_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * End an ongoing discount activity immediately
   * @param {EndDiscountParams} params - Parameters for ending a discount
   * @returns {Promise<EndDiscountResponse>} The response containing the ended discount ID and modification time
   *
   * Note: Can only end discounts that are currently ongoing/active.
   * Will return an error if attempting to end an upcoming or expired discount.
   */
  async endDiscount(params: EndDiscountParams): Promise<EndDiscountResponse> {
    const response = await ShopeeFetch.fetch<EndDiscountResponse>(
      this.config,
      "/discount/end_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get detailed information about a discount activity
   * @param {GetDiscountParams} params - Parameters for getting discount details
   * @returns {Promise<GetDiscountResponse>} The response containing comprehensive discount information
   *
   * The response includes:
   * - Basic discount details (ID, name, status, timing, etc.)
   * - Item list with detailed pricing information (original price, promotion price, stock, etc.)
   * - For items with variations: detailed model information
   * - Purchase limits for each item
   * - Pagination info (more: boolean indicating if there are more pages)
   */
  async getDiscount(params: GetDiscountParams): Promise<GetDiscountResponse> {
    const response = await ShopeeFetch.fetch<GetDiscountResponse>(
      this.config,
      "/discount/get_discount",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get a list of discount activities with pagination
   * @param {GetDiscountListParams} params - Parameters for retrieving discount list
   * @param {DiscountStatus} params.discount_status - Filter by discount status (UPCOMING, ONGOING, EXPIRED, or ALL)
   * @param {number} [params.page_no] - Page number to retrieve (default: 1)
   * @param {number} [params.page_size] - Number of items per page (default: 100, max: 100)
   * @returns {Promise<GetDiscountListResponse>} The response containing a paginated list of discounts
   *
   * The response includes:
   * - Pagination information (more: boolean indicating if there are more pages)
   * - A list of discounts with basic details such as ID, name, status, start/end time, and source
   */
  async getDiscountList(params: GetDiscountListParams): Promise<GetDiscountListResponse> {
    const response = await ShopeeFetch.fetch<GetDiscountListResponse>(
      this.config,
      "/discount/get_discount_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Update an existing discount activity
   * @param {UpdateDiscountParams} params - Parameters for updating a discount
   * @returns {Promise<UpdateDiscountResponse>} The response containing the updated discount ID and modification time
   *
   * Note: For ongoing discounts, update capabilities may be limited.
   * Only certain fields can be modified depending on the discount status.
   */
  async updateDiscount(params: UpdateDiscountParams): Promise<UpdateDiscountResponse> {
    const response = await ShopeeFetch.fetch<UpdateDiscountResponse>(
      this.config,
      "/discount/update_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Update items in an existing discount activity
   * @param {UpdateDiscountItemParams} params - Parameters for updating discount items
   * @returns {Promise<UpdateDiscountItemResponse>} The response containing the count of updated items and any errors
   *
   * The response includes:
   * - discount_id: The ID of the discount activity
   * - count: Number of items successfully updated
   * - error_list: List of items that failed to be updated with error details
   * - warning: Warning message if any
   */
  async updateDiscountItem(params: UpdateDiscountItemParams): Promise<UpdateDiscountItemResponse> {
    const response = await ShopeeFetch.fetch<UpdateDiscountItemResponse>(
      this.config,
      "/discount/update_discount_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get SIP Overseas Discounts
   * @param {GetSipDiscountsParams} [params] - Optional parameters for filtering by region
   * @returns {Promise<GetSipDiscountsResponse>} The response containing a list of SIP discounts
   *
   * Only regions that have upcoming/ongoing discounts will be returned.
   * Use Primary shop's Shop ID to request - the API will return the list of Affiliate shops
   * under this Primary shop that have set discounts, along with the discount details.
   *
   * The response includes:
   * - discount_list: Array of discount information for each region
   *   - region: The region of the SIP affiliate shop
   *   - status: The status of the discount (upcoming/ongoing)
   *   - sip_discount_rate: The discount rate percentage
   *   - start_time: When the discount starts (UNIX timestamp)
   *   - end_time: When the discount ends (UNIX timestamp)
   *   - create_time: When the discount was created (UNIX timestamp)
   *   - update_time: When the discount was last updated (UNIX timestamp)
   */
  async getSipDiscounts(params?: GetSipDiscountsParams): Promise<GetSipDiscountsResponse> {
    const response = await ShopeeFetch.fetch<GetSipDiscountsResponse>(
      this.config,
      "/discount/get_sip_discounts",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Set SIP Overseas Discount for SIP affiliate region
   * @param {SetSipDiscountParams} params - Parameters for setting the SIP discount
   * @returns {Promise<SetSipDiscountResponse>} The response containing the created/updated discount details
   *
   * Use Primary shop's Shop ID to request. Provide the region and discount rate of the Affiliate shop
   * to be set or update - the API will set or update the discount rate for that region's Affiliate shop.
   *
   * Notes:
   * - The start time is 30 minutes after the discount is set
   * - The end time is 180 days after the start time
   * - Cannot edit the promotion within 15 minutes after an update
   * - In VN region, discount rate cannot exceed 50%
   */
  async setSipDiscount(params: SetSipDiscountParams): Promise<SetSipDiscountResponse> {
    const response = await ShopeeFetch.fetch<SetSipDiscountResponse>(
      this.config,
      "/discount/set_sip_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Delete SIP Overseas Discount for SIP affiliate region
   * @param {DeleteSipDiscountParams} params - Parameters for deleting the SIP discount
   * @returns {Promise<DeleteSipDiscountResponse>} The response containing the deleted region
   *
   * Use Primary shop's Shop ID to request. Provide the region of the Affiliate shop to be deleted,
   * and the API will delete the discount from that region's Affiliate shop.
   *
   * Note: Cannot edit the promotion within 15 minutes after an update
   */
  async deleteSipDiscount(params: DeleteSipDiscountParams): Promise<DeleteSipDiscountResponse> {
    const response = await ShopeeFetch.fetch<DeleteSipDiscountResponse>(
      this.config,
      "/discount/delete_sip_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
