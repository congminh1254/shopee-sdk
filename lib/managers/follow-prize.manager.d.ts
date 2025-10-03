import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { AddFollowPrizeParams, AddFollowPrizeResponse, DeleteFollowPrizeParams, DeleteFollowPrizeResponse, EndFollowPrizeParams, EndFollowPrizeResponse, GetFollowPrizeDetailParams, GetFollowPrizeDetailResponse, GetFollowPrizeListParams, GetFollowPrizeListResponse, UpdateFollowPrizeParams, UpdateFollowPrizeResponse } from "../schemas/follow-prize.js";
export declare class FollowPrizeManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Add a new follow prize activity
     * @param {AddFollowPrizeParams} params - Parameters for creating a new follow prize
     * @returns {Promise<AddFollowPrizeResponse>} The response containing the created follow prize ID
     *
     * The follow prize allows shops to reward followers with vouchers when they follow the shop.
     *
     * @throws {Error} When the API request fails or returns an error
     * - follow_prize.campaign_num_max_limit: Max number of follow prizes reached (1000 ongoing and upcoming)
     * - follow_prize.campaign_overlap: Another follow prize already exists during this time period
     * - follow_prize.name_length_limit: Please input up to 20 characters
     * - follow_prize.percentage_RANGE: Please enter a value between 1 and 99
     * - follow_prize.end_time_min_limit: End time must be at least 1 day after start time
     * - follow_prize.quota_out_range: Please enter a value between 1 and 200000
     * - follow_prize.start_time_min_limit: Start time must be later than current time
     * - follow_prize.time_future_limit: Start/end time should not exceed 2037-12-31 23:59:59
     */
    addFollowPrize(params: AddFollowPrizeParams): Promise<AddFollowPrizeResponse>;
    /**
     * Delete an existing follow prize activity
     * @param {DeleteFollowPrizeParams} params - Parameters for deleting a follow prize
     * @returns {Promise<DeleteFollowPrizeResponse>} The response containing the deleted follow prize ID
     *
     * @throws {Error} When the API request fails or returns an error
     * - follow_prize.campaign_none: The promotion id does not exist
     * - follow_prize.delete_type: Only upcoming promotions can be deleted
     */
    deleteFollowPrize(params: DeleteFollowPrizeParams): Promise<DeleteFollowPrizeResponse>;
    /**
     * End an ongoing follow prize activity immediately
     * @param {EndFollowPrizeParams} params - Parameters for ending a follow prize
     * @returns {Promise<EndFollowPrizeResponse>} The response containing the ended follow prize ID
     *
     * @throws {Error} When the API request fails or returns an error
     * - follow_prize.campaign_none: The promotion id does not exist
     * - follow_prize.end_type: Only ongoing follow prizes can be ended
     */
    endFollowPrize(params: EndFollowPrizeParams): Promise<EndFollowPrizeResponse>;
    /**
     * Get detailed information about a follow prize activity
     * @param {GetFollowPrizeDetailParams} params - Parameters for getting follow prize details
     * @returns {Promise<GetFollowPrizeDetailResponse>} The response containing comprehensive follow prize information
     *
     * The response includes:
     * - campaign_status: The status of the follow prize (upcoming/ongoing/expired)
     * - campaign_id: The unique identifier for the follow prize
     * - follow_prize_name: The name of the follow prize
     * - start_time: When the follow prize becomes valid
     * - end_time: When the follow prize expires
     * - usage_quantity: The total quantity available
     * - min_spend: Minimum basket price required
     * - reward_type: Type of reward (1: fix amount, 2: percentage, 3: coin cash back)
     * - discount_amount/percentage/max_price: Reward details based on reward_type
     *
     * @throws {Error} When the API request fails or returns an error
     * - follow_prize.campaign_none: The promotion id does not exist
     */
    getFollowPrizeDetail(params: GetFollowPrizeDetailParams): Promise<GetFollowPrizeDetailResponse>;
    /**
     * Get a list of follow prize activities with pagination
     * @param {GetFollowPrizeListParams} params - Parameters for retrieving follow prize list
     * @param {FollowPrizeStatus} params.status - Filter by follow prize status (upcoming/ongoing/expired/all)
     * @param {number} [params.page_no] - Page number to retrieve (default: 1)
     * @param {number} [params.page_size] - Number of items per page (default: 20, max: 100)
     * @returns {Promise<GetFollowPrizeListResponse>} The response containing a paginated list of follow prizes
     *
     * The response includes:
     * - more: Boolean indicating if there are more pages
     * - follow_prize_list: Array of follow prize information containing:
     *   - campaign_id: The unique identifier
     *   - campaign_status: Current status
     *   - follow_prize_name: Name of the follow prize
     *   - start_time/end_time: Validity period
     *   - usage_quantity: Total quantity
     *   - claimed: Quantity already claimed
     */
    getFollowPrizeList(params: GetFollowPrizeListParams): Promise<GetFollowPrizeListResponse>;
    /**
     * Update an existing follow prize activity
     * @param {UpdateFollowPrizeParams} params - Parameters for updating a follow prize
     * @returns {Promise<UpdateFollowPrizeResponse>} The response containing the updated follow prize ID
     *
     * Update restrictions:
     * - Cannot rename ongoing follow prizes
     * - Cannot update minimum basket price for ongoing follow prizes
     * - Cannot update start time for ongoing follow prizes
     * - Start time can only be changed to a later timing (for upcoming)
     * - End time can only be changed to an earlier timing
     * - Cannot reduce dispatch quantity
     * - Cannot update expired follow prizes
     *
     * @throws {Error} When the API request fails or returns an error
     * - follow_prize.campaign_none: The promotion id does not exist
     * - follow_prize.update_expired_campaign: Cannot update expired follow prizes
     * - follow_prize.update_prize_name_ongoing: Cannot rename ongoing follow prizes
     * - follow_prize.update_min_spend_ongoing: Cannot update minimum basket price for ongoing
     * - follow_prize.update_start_time_ongoing: Cannot update start time for ongoing
     * - follow_prize.update_start_time_earlier: Start time can only be changed to later
     * - follow_prize.update_end_time_later: End time can only be changed to earlier
     * - follow_prize.update_quantity_reduce: Cannot reduce dispatch quantity
     */
    updateFollowPrize(params: UpdateFollowPrizeParams): Promise<UpdateFollowPrizeResponse>;
}
