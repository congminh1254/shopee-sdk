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
