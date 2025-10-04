import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class SbsManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Get bound warehouse by shop id.
     *
     * @param params - Parameters for getting bound warehouse info (empty object)
     *
     * @returns A promise that resolves to the bound warehouse info response containing:
     * - list: List of shops with bound warehouses
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getBoundWhsInfo(params = {}) {
        const response = await ShopeeFetch.fetch(this.config, "/sbs/get_bound_whs_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get Seller Center Current Inventory Page Data.
     * This API provides detailed inventory information including sellable, reserved,
     * and unsellable quantities across different warehouses.
     *
     * @param params - Parameters for getting current inventory
     * @param params.whs_region - Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG
     * @param params.page_no - Page number (default: 1)
     * @param params.page_size - Page size, 1-100 (default: 10)
     * @param params.search_type - Search type: 0=All data; 1=Product Name; 2=SKU ID; 3=Variations; 4=Item ID
     * @param params.keyword - Search keyword
     * @param params.whs_ids - Warehouse IDs, comma-separated
     * @param params.not_moving_tag - Not moving tag: Blank=All; 0=No; 1=Yes
     * @param params.inbound_pending_approval - Inbound pending approval: Blank=All; 0=No; 1=Yes
     * @param params.products_with_inventory - Products with inventory: Blank=All; 0=No; 1=Yes
     * @param params.category_id - Category id (first-tier)
     * @param params.stock_levels - Stock levels (comma-separated): 1=Low Stock & No Sellable stock; 2=Low Stock & To replenish; 3=Low Stock & Replenished; 4=Excess
     *
     * @returns A promise that resolves to the current inventory response containing:
     * - cursor: Pagination cursor
     * - item_list: List of items with inventory details
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getCurrentInventory(params) {
        const response = await ShopeeFetch.fetch(this.config, "/sbs/get_current_inventory", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get Seller Center Expiry Report page data.
     * This API provides information about expiring, expired, and damaged stocks.
     *
     * @param params - Parameters for getting expiry report
     * @param params.whs_region - Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG
     * @param params.page_no - Page number (default: 1)
     * @param params.page_size - Page size, 1-40 (default: 10)
     * @param params.whs_ids - Warehouse IDs, comma-separated
     * @param params.expiry_status - Expiry status (comma-separated): 0=Expired, 2=Expiring, 4=expiry_blocked, 5=damaged, 6=normal
     * @param params.category_id_l1 - Only Level 1 Category can be filtered
     * @param params.sku_id - SKU ID
     * @param params.item_id - Item ID
     * @param params.variation - Variation
     * @param params.item_name - Item name
     *
     * @returns A promise that resolves to the expiry report response containing:
     * - item_list: List of items with expiry information
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getExpiryReport(params) {
        const response = await ShopeeFetch.fetch(this.config, "/sbs/get_expiry_report", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get Seller Center Stock Aging page data.
     * This API provides stock aging information showing how long items have been in stock.
     *
     * @param params - Parameters for getting stock aging
     * @param params.whs_region - Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG
     * @param params.page_no - Page number (default: 1)
     * @param params.page_size - Page size, 1-100 (default: 10)
     * @param params.search_type - Search type: 1=Product Name; 2=SKU ID; 3=Variations; 4=Item ID
     * @param params.keyword - Search keyword
     * @param params.whs_ids - Warehouse IDs, comma-separated
     * @param params.aging_storage_tag - Aging storage tag: 0=false; 1=true
     * @param params.excess_storage_tag - Excess storage tag: 0=false; 1=true
     * @param params.category_id - L1-level product category ID
     *
     * @returns A promise that resolves to the stock aging response containing:
     * - item_list: List of items with stock aging details
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getStockAging(params) {
        const response = await ShopeeFetch.fetch(this.config, "/sbs/get_stock_aging", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get Seller Center Stock Movement page data.
     * This API provides stock movement information including inbound, outbound, and adjustments.
     *
     * @param params - Parameters for getting stock movement
     * @param params.start_time - Start date in YYYY-MM-DD format (required)
     * @param params.end_time - End date in YYYY-MM-DD format (required)
     * @param params.whs_region - Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG
     * @param params.page_no - Page number (default: 1)
     * @param params.page_size - Page size, 1-20 (default: 10)
     * @param params.whs_ids - Warehouse IDs, comma-separated
     * @param params.category_id_l1 - L1-level category_id
     * @param params.sku_id - SKU ID
     * @param params.item_id - Item ID
     * @param params.item_name - Item name
     * @param params.variation - Variation
     *
     * @returns A promise that resolves to the stock movement response containing:
     * - total: Total number of items
     * - start_time: Start time
     * - end_time: End time
     * - query_end_time: Query end time
     * - item_list: List of items with stock movement details
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getStockMovement(params) {
        const response = await ShopeeFetch.fetch(this.config, "/sbs/get_stock_movement", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
}
//# sourceMappingURL=sbs.manager.js.map