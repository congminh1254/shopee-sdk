import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetTotalBalanceResponse, GetShopToggleInfoResponse, GetRecommendedKeywordListParams, GetRecommendedKeywordListResponse } from "../schemas/ads.js";
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

    /**
     * Get seller's toggle status information at the shop level
     * @returns {Promise<GetShopToggleInfoResponse>} Response containing toggle statuses
     * 
     * This API returns the seller's toggle status information indicating whether 
     * certain features are enabled or disabled at the shop level.
     * 
     * The response includes:
     * - data_timestamp: The time when the information was retrieved
     * - auto_top_up: Whether automatic top-up is enabled (true) or disabled (false)
     * - campaign_surge: Whether campaign surge is enabled (true) or disabled (false)
     * 
     * These settings affect how ads campaigns are managed and funded.
     */
    async getShopToggleInfo(): Promise<GetShopToggleInfoResponse> {
      const response = await ShopeeFetch.fetch<GetShopToggleInfoResponse>(
        this.config,
        '/ads/get_shop_toggle_info',
        {
          method: 'GET',
          auth: true,
        }
      );

      return response;
    }

    /**
     * Get the list of recommended keywords for an item
     * @param {GetRecommendedKeywordListParams} params Request parameters
     * @param {number} params.item_id Shopee's unique identifier for an item
     * @param {string} [params.input_keyword] The keyword seller typed in the manually add keyword window
     * @returns {Promise<GetRecommendedKeywordListResponse>} Response containing recommended keywords
     * 
     * This API is used to get the list of recommended keywords by item and optionally a search keyword.
     * 
     * The response includes:
     * - item_id: The item ID for which keywords are recommended
     * - input_keyword: The keyword provided in the request (if any)
     * - suggested_keywords: List of suggested keywords with quality score, search volume, and suggested bid
     * 
     * Use this API to get keyword suggestions to improve item discoverability in search results.
     */
    async getRecommendedKeywordList(params: GetRecommendedKeywordListParams): Promise<GetRecommendedKeywordListResponse> {
      const response = await ShopeeFetch.fetch<GetRecommendedKeywordListResponse>(
        this.config,
        '/ads/get_recommended_keyword_list',
        {
          method: 'GET',
          auth: true,
          params,
        }
      );

      return response;
    }
}