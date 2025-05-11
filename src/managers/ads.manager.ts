import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetTotalBalanceResponse } from "../schemas/ads.js";
import { ShopeeFetch } from "../fetch.js";

export class AdsManager extends BaseManager {
    constructor(config: ShopeeConfig) {
      super(config);
    }

    /**
     * Get seller's real-time total balance of ads credit
     * @returns {Promise<GetTotalBalanceResponse>} Response containing the total balance and timestamp
     * 
     * This API returns the seller's real-time total balance of their ads credit,
     * including both paid credits and free credits.
     * 
     * The response includes:
     * - data_timestamp: The time when the balance snapshot was taken
     * - total_balance: The total ads credit balance
     * 
     * Note: This balance is real-time and represents the current available credit
     * that can be used for advertising campaigns.
     */
    async getTotalBalance(): Promise<GetTotalBalanceResponse> {
      const response = await ShopeeFetch.fetch<GetTotalBalanceResponse>(
        this.config,
        '/ads/get_total_balance',
        {
          method: 'GET',
          auth: true,
        }
      );

      return response;
    }
}