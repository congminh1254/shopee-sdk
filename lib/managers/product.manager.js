import { BaseManager } from './base.manager.js';
import { ShopeeFetch } from '../fetch.js';
export class ProductManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Get comments for products
     *
     * Use this API to get comments by shop_id, item_id, or comment_id. Can retrieve up to 1000 comments.
     *
     * @param params - The parameters for getting comments
     * @param params.item_id - The identity of product item
     * @param params.comment_id - The identity of comment
     * @param params.cursor - Specifies the starting entry of data to return. Default is empty string
     * @param params.page_size - Maximum number of entries to return per page (between 1 and 100)
     *
     * @returns A promise that resolves to the comment response containing:
     * - request_id: The identifier for API request tracking
     * - error: Error type if any error occurred
     * - message: Error details if any error occurred
     * - response: The response data containing comment list, pagination info
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getComment(params) {
        const response = await ShopeeFetch.fetch(this.config, `/product/get_comment`, {
            method: 'GET',
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Reply to buyer comments in batch
     *
     * Use this API to reply to comments from buyers in batch. You can reply to multiple comments at once.
     *
     * @param params - The parameters for replying to comments
     * @param params.comment_list - List of comments to reply to (between 1 and 100 items)
     * @param params.comment_list[].comment_id - The identity of comment to reply to
     * @param params.comment_list[].comment - The content of the reply (between 1 and 500 characters)
     *
     * @returns A promise that resolves to the reply response containing:
     * - request_id: The identifier for API request tracking
     * - error: Error type if any error occurred
     * - message: Error details if any error occurred
     * - response: The response data containing result list and warnings
     *
     * @throws {Error} When the API request fails or returns an error
     * - product.duplicate_request: You have already replied to this comment
     * - product.comment_length_invalid: Comment length should be between 1 and 500
     * - product.error_permission: Reply comment failed due to invalid shop token
     * - product.error_not_exist: The comment you replied to does not exist
     * - product.duplicate_comment_id: Duplicate comment id in the request
     */
    async replyComment(params) {
        const response = await ShopeeFetch.fetch(this.config, `/product/reply_comment`, {
            method: 'POST',
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this call to get a list of items.
     *
     * @param params - Parameters for getting item list
     * @param params.offset - Specifies the starting entry of data to return. Default is 0.
     * @param params.page_size - The size of one page (1-100).
     * @param params.update_time_from - Start of date range for item update time.
     * @param params.update_time_to - End of date range for item update time.
     * @param params.item_status - Array of item statuses to filter by.
     *
     * @returns A promise that resolves to the item list response containing:
     * - item: List of item details (item_id, item_status, update_time, tag)
     * - total_count: Total number of items matching the filter
     * - has_next_page: Boolean indicating if there are more items
     * - next_offset: Offset for the next page if has_next_page is true
     * - warning: Optional warning message
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_update_time_range: update_time_to before update_time_from
     * - error_param_item_status: Invalid item status
     * - error_param_shop_id_not_found: Shop ID not found
     * - error_param: Offset over limit
     * - error_item_not_found: Product not found
     */
    async getItemList(params) {
        const response = await ShopeeFetch.fetch(this.config, '/product/get_item_list', {
            method: 'GET',
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get basic info of items by a list of item_ids.
     *
     * @param params - Parameters for getting item base info
     * @param params.item_id_list - List of Shopee's unique identifiers for items. Max 50.
     * @param params.need_tax_info - If true, tax_info will be included in the response.
     * @param params.need_complaint_policy - If true, complaint_policy will be included in the response (PL region only).
     *
     * @returns A promise that resolves to the item base info response containing:
     * - item_list: List of detailed item base information including:
     *   - item_id, category_id, item_name, description, item_sku, create_time, update_time
     *   - attribute_list: Item attributes
     *   - price_info: Pricing details (if no models)
     *   - image: Image URLs and IDs
     *   - weight, dimension: Physical characteristics
     *   - logistic_info: Enabled logistics channels and fees
     *   - pre_order: Pre-order status and days to ship
     *   - wholesales: Wholesale pricing tiers
     *   - condition, size_chart, item_status, deboost, has_model, promotion_id
     *   - video_info: Video URLs, thumbnails, and duration
     *   - brand: Brand ID and name
     *   - item_dangerous: Dangerous goods status
     *   - gtin_code, size_chart_id, promotion_image, compatibility_info, scheduled_publish_time
     *   - authorised_brand_id, ssp_id, is_fulfillment_by_shopee
     *   - complaint_policy: (If requested and applicable)
     *   - tax_info: (If requested)
     *   - description_info, description_type: Normal or extended description details
     *   - stock_info_v2: Detailed stock information (summary, seller, Shopee, advance)
     *   - certification_info: Product certifications
     * - warning: Optional warning message
     * - Note: The top-level complaint_policy and tax_info in the response object seem redundant as they are also part of each item in item_list if requested.
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item ID not found
     * - error_param_shop_id_not_found: Shop ID not found
     * - error_invalid_language: Invalid language
     * - error_query_over_itemid_size: Too many item_ids in list
     */
    async getItemBaseInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, '/product/get_item_base_info', {
            method: 'GET',
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(',')
            }
        });
        return response;
    }
}
//# sourceMappingURL=product.manager.js.map