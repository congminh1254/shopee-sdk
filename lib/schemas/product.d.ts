import { FetchResponse } from "./fetch.js";
/**
 * Parameters for getting product comments
 * Use this API to get comments by shop_id, item_id, or comment_id, up to 1000 comments.
 */
export type GetCommentParams = {
    /** The identity of product item */
    item_id?: number;
    /** The identity of comment */
    comment_id?: number;
    /** Specifies the starting entry of data to return in the current call. Default is empty string */
    cursor: string;
    /** Maximum number of entries to return per page (between 1 and 100) */
    page_size: number;
};
/**
 * Comment reply information
 */
export type CommentReply = {
    /** The content of reply */
    reply: string;
    /** Whether the reply is hidden or not */
    hidden: boolean;
    /** The time the seller replied to the comment */
    create_time: number;
};
/**
 * Media information for a comment
 */
export type CommentMedia = {
    /** List of image URLs uploaded by the buyer in the comment */
    image_url_list: string[];
    /** List of video URLs uploaded by the buyer in the comment */
    video_url_list: string[];
};
/**
 * Individual comment information
 */
export type CommentItem = {
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** The identity of comment */
    comment_id: number;
    /** The content of the comment */
    comment: string;
    /** The username of the buyer who posted the comment */
    buyer_username: string;
    /** The commented item's id */
    item_id: number;
    /** Shopee's unique identifier for a model of an item (will be offline on 2024-12-27) */
    model_id: number;
    /** List of model IDs of the buyer's purchase corresponding to the comment */
    model_id_list: number[];
    /** Buyer's rating for the item (1-5) */
    rating_star: number;
    /** The editable status of the comment (EXPIRED/EDITABLE/HAVE_EDIT_ONCE) */
    editable: string;
    /** Whether the comment is hidden or not */
    hidden: boolean;
    /** The create time of the comment */
    create_time: number;
    /** The reply information for the comment */
    comment_reply?: CommentReply;
    /** Media information for the comment */
    media: CommentMedia;
};
/**
 * Response for getting product comments
 */
export interface GetCommentResponse extends FetchResponse<{
    /** List of comments */
    item_comment_list: CommentItem[];
    /** Indicates if there are more comments to fetch */
    more: boolean;
    /** Cursor for the next page of results */
    next_cursor: string;
}> {
}
/**
 * Comment item for replying to comments
 */
export type ReplyCommentItem = {
    /** The identity of comment to reply to */
    comment_id: number;
    /** The content of the reply (between 1 and 500 characters) */
    comment: string;
};
/**
 * Parameters for replying to comments in batch
 */
export type ReplyCommentParams = {
    /** The list of comments to reply to (between 1 and 100 items) */
    comment_list: ReplyCommentItem[];
};
/**
 * Result item for a comment reply operation
 */
export type ReplyCommentResultItem = {
    /** The identity of comment that was replied to */
    comment_id: number;
    /** Error type if the reply failed for this comment */
    fail_error?: string;
    /** Error message if the reply failed for this comment */
    fail_message?: string;
};
/**
 * Response for replying to comments
 */
export interface ReplyCommentResponse extends FetchResponse<{
    /** The result list of the request comment list */
    result_list: ReplyCommentResultItem[];
    /** Warning messages to take care of */
    warning?: string[];
}> {
}
