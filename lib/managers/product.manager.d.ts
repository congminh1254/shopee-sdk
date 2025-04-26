import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { GetCommentParams, GetCommentResponse, ReplyCommentParams, ReplyCommentResponse } from '../schemas/product.js';
export declare class ProductManager extends BaseManager {
    constructor(config: ShopeeConfig);
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
    getComment(params: GetCommentParams): Promise<GetCommentResponse>;
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
    replyComment(params: ReplyCommentParams): Promise<ReplyCommentResponse>;
}
