import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { AddDiscountParams, AddDiscountResponse, AddDiscountItemParams, AddDiscountItemResponse, DeleteDiscountParams, DeleteDiscountResponse, DeleteDiscountItemParams, DeleteDiscountItemResponse, EndDiscountParams, EndDiscountResponse, GetDiscountParams, GetDiscountResponse, GetDiscountListParams, GetDiscountListResponse, UpdateDiscountParams, UpdateDiscountResponse, UpdateDiscountItemParams, UpdateDiscountItemResponse } from "../schemas/discount.js";
export declare class DiscountManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Add a new shop discount activity
     * @param {AddDiscountParams} params - Parameters for creating a new discount
     * @returns {Promise<AddDiscountResponse>} The response containing the created discount ID
     *
     * Note: The start time must be 1 hour later than current time.
     * The end time must be 1 hour later than start time, and the discount period must be less than 180 days.
     */
    addDiscount(params: AddDiscountParams): Promise<AddDiscountResponse>;
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
    addDiscountItem(params: AddDiscountItemParams): Promise<AddDiscountItemResponse>;
    /**
     * Delete an existing discount activity
     * @param {DeleteDiscountParams} params - Parameters for deleting a discount
     * @returns {Promise<DeleteDiscountResponse>} The response containing the deleted discount ID and modification time
     *
     * Note: Can only delete upcoming discounts that haven't started yet.
     * Will return an error if attempting to delete a discount that has already started.
     */
    deleteDiscount(params: DeleteDiscountParams): Promise<DeleteDiscountResponse>;
    /**
     * Delete items from an existing discount activity
     * @param {DeleteDiscountItemParams} params - Parameters for deleting items from a discount
     * @returns {Promise<DeleteDiscountItemResponse>} The response containing the discount ID and any errors
     *
     * The response includes:
     * - discount_id: The ID of the discount activity
     * - error_list: List of items that failed to be deleted with error details
     */
    deleteDiscountItem(params: DeleteDiscountItemParams): Promise<DeleteDiscountItemResponse>;
    /**
     * End an ongoing discount activity immediately
     * @param {EndDiscountParams} params - Parameters for ending a discount
     * @returns {Promise<EndDiscountResponse>} The response containing the ended discount ID and modification time
     *
     * Note: Can only end discounts that are currently ongoing/active.
     * Will return an error if attempting to end an upcoming or expired discount.
     */
    endDiscount(params: EndDiscountParams): Promise<EndDiscountResponse>;
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
    getDiscount(params: GetDiscountParams): Promise<GetDiscountResponse>;
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
    getDiscountList(params: GetDiscountListParams): Promise<GetDiscountListResponse>;
    /**
     * Update an existing discount activity
     * @param {UpdateDiscountParams} params - Parameters for updating a discount
     * @returns {Promise<UpdateDiscountResponse>} The response containing the updated discount ID and modification time
     *
     * Note: For ongoing discounts, update capabilities may be limited.
     * Only certain fields can be modified depending on the discount status.
     */
    updateDiscount(params: UpdateDiscountParams): Promise<UpdateDiscountResponse>;
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
    updateDiscountItem(params: UpdateDiscountItemParams): Promise<UpdateDiscountItemResponse>;
}
