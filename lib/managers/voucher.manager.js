import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class VoucherManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Add a new voucher
     * @param {AddVoucherParams} params - Parameters for creating a new voucher
     * @returns {Promise<AddVoucherResponse>} The response containing the created voucher ID
     */
    async addVoucher(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/add_voucher', {
            method: 'POST',
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Delete an existing voucher
     * @param {DeleteVoucherParams} params - Parameters for deleting a voucher
     * @returns {Promise<DeleteVoucherResponse>} The response containing the deleted voucher ID
     *
     * Note: Can only delete upcoming vouchers that haven't started yet.
     * Will return an error if attempting to delete a voucher that has already started.
     */
    async deleteVoucher(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/delete_voucher', {
            method: 'POST',
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * End an ongoing voucher immediately
     * @param {EndVoucherParams} params - Parameters for ending a voucher
     * @returns {Promise<EndVoucherResponse>} The response containing the ended voucher ID
     *
     * Note: Can only end vouchers that are currently ongoing/active.
     * Will return an error if attempting to end an upcoming or expired voucher.
     */
    async endVoucher(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/end_voucher', {
            method: 'POST',
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update an existing voucher
     * @param {UpdateVoucherParams} params - Parameters for updating a voucher
     * @returns {Promise<UpdateVoucherResponse>} The response containing the updated voucher ID
     *
     * Note: For ongoing vouchers, only these fields can be modified:
     * - voucher_name
     * - usage_quantity (can only be increased)
     * - end_time (can only be shortened, not extended)
     * - display_channel_list
     * - item_id_list
     */
    async updateVoucher(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/update_voucher', {
            method: 'POST',
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get detailed information about a voucher
     * @param {GetVoucherParams} params - Parameters for getting voucher details
     * @returns {Promise<GetVoucherResponse>} The response containing comprehensive voucher information
     *
     * The response includes:
     * - Basic voucher details (ID, code, name, type, etc.)
     * - Usage information (total quantity, current usage)
     * - Timing details (start time, end time, display time)
     * - Reward specifics (reward type, discount amount/percentage, min basket price)
     * - Display settings (channels where voucher is shown)
     * - For product vouchers: list of applicable items
     */
    async getVoucher(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/get_voucher', {
            method: 'GET',
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get a list of vouchers with pagination
     * @param {GetVoucherListParams} params - Parameters for retrieving voucher list
     * @param {VoucherStatus} params.status - Filter by voucher status (UPCOMING, ONGOING, EXPIRED, or ALL)
     * @param {number} [params.page_no] - Page number to retrieve (default: 1, range: 1-5000)
     * @param {number} [params.page_size] - Number of items per page (default: 20, range: 1-100)
     * @returns {Promise<GetVoucherListResponse>} The response containing a paginated list of vouchers
     *
     * The response includes:
     * - Pagination information (more: boolean indicating if there are more pages)
     * - A list of vouchers with details such as ID, code, name, type, usage statistics, timing, and reward information
     */
    async getVoucherList(params) {
        const response = await ShopeeFetch.fetch(this.config, '/voucher/get_voucher_list', {
            method: 'GET',
            auth: true,
            params,
        });
        return response;
    }
}
//# sourceMappingURL=voucher.manager.js.map