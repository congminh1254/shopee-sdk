import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class PaymentManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Use this API to fetch the accounting detail of order.
     *
     * @param params - Parameters for getting escrow detail
     * @param params.order_sn - Shopee's unique identifier for an order
     *
     * @returns A promise that resolves to the escrow detail response containing:
     * - order_sn: Order identifier
     * - buyer_user_name: Username of buyer
     * - return_order_sn_list: List of return order numbers
     * - order_income: Detailed breakdown of order income including:
     *   - escrow_amount: Expected amount seller will receive
     *   - buyer_total_amount: Total amount paid by buyer
     *   - items: List of items with pricing details
     *   - fees and adjustments: Various fees, taxes and adjustments
     * - buyer_payment_info: Payment details from buyer's perspective
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_param: Missing or invalid parameters
     * - error_auth: Authentication or permission errors
     * - error_server: Internal server errors
     * - error_not_found: Order income details not found
     */
    async getEscrowDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, '/payment/get_escrow_detail', {
            method: 'GET',
            auth: true,
            params,
        });
        return response;
    }
}
//# sourceMappingURL=payment.manager.js.map