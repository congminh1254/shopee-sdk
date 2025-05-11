import { BaseResponse } from "./base.js";
/**
 * Response for the get total balance API
 */
export interface GetTotalBalanceResponse extends BaseResponse {
    response: {
        /** Timestamp indicating when the total balance snapshot was taken */
        data_timestamp: number;
        /** Seller's total ads credit balance, including paid credits and free credits */
        total_balance: number;
    };
    /** Optional warning message if some data cannot be responded normally */
    warning?: string;
}
/**
 * Response for the get shop toggle info API
 */
export interface GetShopToggleInfoResponse extends BaseResponse {
    response: {
        /** Timestamp of data in response */
        data_timestamp: number;
        /** Auto top-up toggle on/off */
        auto_top_up: boolean;
        /** Campaign surge toggle on/off */
        campaign_surge: boolean;
    };
    /** Optional warning message if some data cannot be responded normally */
    warning?: string;
}
/**
 * Parameters for the get recommended keyword list API
 */
export type GetRecommendedKeywordListParams = {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The keyword seller typed in the manually add keyword window */
    input_keyword?: string;
};
/**
 * Response for the get recommended keyword list API
 */
export interface GetRecommendedKeywordListResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an item */
        item_id: number;
        /** The keyword seller typed in the manually add keyword window */
        input_keyword?: string;
        /** Suggested keywords recommended from product */
        suggested_keywords: Array<{
            /** Keyword value (Only return the highly recommended keywords, will be sightly different from Seller Center) */
            keyword: string;
            /** This is a measure of how attractive your ad is and its relevance to the keyword. The higher the quality score, the higher your ad rank. Ad rank is based on this score and your bid price. */
            quality_score: number;
            /** The number of times the keyword has been searched on Shopee in the last 30 days. The larger the search volume, the more impressions your ad will receive. */
            search_volume: number;
            /** This is bid price suggested by Shopee algorithm for the keyword in local currency. */
            suggested_bid: number;
        }>;
    };
    /** Optional warning message if some data cannot be responded normally */
    warning?: string;
}
