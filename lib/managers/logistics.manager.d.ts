import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetTrackingInfoParams, GetTrackingInfoResponse } from "../schemas/logistics.js";
export declare class LogisticsManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Use this API to get the logistics tracking information of an order.
     *
     * @param params - Parameters for getting tracking information
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order
     *
     * @returns A promise that resolves to the tracking info response containing:
     * - order_sn: Order identifier
     * - package_number: Package identifier
     * - logistics_status: Current logistics status
     * - tracking_info: Array of tracking events with:
     *   - update_time: Time of status update
     *   - description: Description of the tracking event
     *   - logistics_status: Status code for the event
     *
     * @throws {Error} When the API request fails or returns an error:
     * - logistics.error_param: Order allocation in progress
     * - error_not_found: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     * - logistics.invalid_error: Order does not exist
     * - logistics.error_status_limit: Invalid order status
     * - logistics.package_not_exist: Package does not exist
     * - logistics.package_number_not_exist: Package number required for split order
     */
    getTrackingInfo(params: GetTrackingInfoParams): Promise<GetTrackingInfoResponse>;
}
