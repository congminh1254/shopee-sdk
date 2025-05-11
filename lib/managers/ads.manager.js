import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class AdsManager extends BaseManager {
    constructor(config) {
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
    async getTotalBalance() {
        const response = await ShopeeFetch.fetch(this.config, '/ads/get_total_balance', {
            method: 'GET',
            auth: true,
        });
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
    async getShopToggleInfo() {
        const response = await ShopeeFetch.fetch(this.config, '/ads/get_shop_toggle_info', {
            method: 'GET',
            auth: true,
        });
        return response;
    }
}
//# sourceMappingURL=ads.manager.js.map