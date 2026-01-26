import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class LogisticsManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Use this API to get all supported logistic channels.
     *
     * @returns A promise that resolves to the channel list response containing:
     * - logistics_channel_list: Array of available logistics channels with:
     *   - logistics_channel_id: Channel identifier
     *   - logistics_channel_name: Channel name
     *   - enabled: Whether channel is enabled
     *   - cod_enabled: Whether COD is supported
     *   - fee_type: Fee calculation type
     *   - weight_limit: Weight restrictions
     *   - item_max_dimension: Size restrictions
     *   - and more channel details
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_permission: No permission
     * - error_server: System error
     */
    async getChannelList() {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_channel_list", {
            method: "GET",
            auth: true,
        });
        return response;
    }
    /**
     * Use this API to get the parameters required for initializing logistics for an order.
     * This is also known as getParameterForInit in the documentation.
     *
     * @param params - Parameters for getting shipping information
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     *
     * @returns A promise that resolves to the shipping parameter response containing:
     * - info_needed: Required parameters based on the specific order
     * - dropoff: Logistics information for dropoff mode (if applicable)
     * - pickup: Logistics information for pickup mode (if applicable)
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     */
    async getShippingParameter(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_shipping_parameter", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get the tracking number of a shipped order.
     *
     * @param params - Parameters for getting tracking number
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     * @param params.response_optional_fields - Optional fields to include in response (optional)
     *
     * @returns A promise that resolves to the tracking number response containing:
     * - tracking_number: The tracking number of the order
     * - plp_number: Package identifier for BR correios (optional)
     * - first_mile_tracking_number: First mile tracking (Cross Border only)
     * - last_mile_tracking_number: Last mile tracking (Cross Border BR only)
     * - hint: Hint information for special scenarios
     * - pickup_code: Quick identification code (ID local orders only)
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     */
    async getTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_tracking_number", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to initiate logistics including arranging pickup, dropoff or shipment for non-integrated channels.
     * This is also known as "Init" in the Shopee API documentation.
     *
     * @param params - Parameters for shipping an order
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     * @param params.pickup - Pickup information (required if get_shipping_parameter returns "pickup")
     * @param params.dropoff - Dropoff information (required if get_shipping_parameter returns "dropoff")
     * @param params.non_integrated - Non-integrated channel information (optional)
     *
     * @returns A promise that resolves to the ship order response
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     *
     * @example
     * ```typescript
     * // For pickup mode
     * await sdk.logistics.shipOrder({
     *   order_sn: 'ORDER123',
     *   pickup: {
     *     address_id: 234,
     *     pickup_time_id: 'slot_123',
     *   },
     * });
     *
     * // For dropoff mode
     * await sdk.logistics.shipOrder({
     *   order_sn: 'ORDER456',
     *   dropoff: {
     *     branch_id: 101,
     *   },
     * });
     * ```
     */
    async shipOrder(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/ship_order", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get the address list of the shop.
     *
     * @returns A promise that resolves to the address list response containing:
     * - show_pickup_address: Whether to show pickup address
     * - address_list: Array of shop addresses with full details
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_permission: No permission
     * - error_server: System error
     *
     * @example
     * ```typescript
     * const response = await sdk.logistics.getAddressList();
     * response.address_list.forEach((addr) => {
     *   console.log('Address ID:', addr.address_id);
     *   console.log('Address:', addr.full_address);
     *   console.log('Flags:', addr.address_flag);
     * });
     * ```
     */
    async getAddressList() {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_address_list", {
            method: "GET",
            auth: true,
        });
        return response;
    }
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
    async getTrackingInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_tracking_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to batch initiate logistics for multiple orders.
     */
    async batchShipOrder(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/batch_ship_order", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to mass ship orders.
     */
    async massShipOrder(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/mass_ship_order", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to initiate logistics for a booking.
     */
    async shipBooking(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/ship_booking", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get shipping parameters for a booking.
     */
    async getBookingShippingParameter(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_shipping_parameter", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get tracking info for a booking.
     */
    async getBookingTrackingInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_tracking_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get tracking number for a booking.
     */
    async getBookingTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_tracking_number", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get mass shipping parameters.
     */
    async getMassShippingParameter(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_mass_shipping_parameter", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get mass tracking numbers.
     */
    async getMassTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_mass_tracking_number", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to set address configuration.
     */
    async setAddressConfig(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/set_address_config", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to delete an address.
     */
    async deleteAddress(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/delete_address", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to create shipping document.
     */
    async createShippingDocument(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/create_shipping_document", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to download shipping document.
     */
    async downloadShippingDocument(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/download_shipping_document", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get shipping document parameters.
     */
    async getShippingDocumentParameter(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_shipping_document_parameter", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get shipping document result.
     */
    async getShippingDocumentResult(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_shipping_document_result", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get shipping document data info.
     */
    async getShippingDocumentDataInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_shipping_document_data_info", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to create booking shipping document.
     */
    async createBookingShippingDocument(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/create_booking_shipping_document", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to download booking shipping document.
     */
    async downloadBookingShippingDocument(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/download_booking_shipping_document", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get booking shipping document parameters.
     */
    async getBookingShippingDocumentParameter(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_shipping_document_parameter", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get booking shipping document result.
     */
    async getBookingShippingDocumentResult(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_shipping_document_result", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get booking shipping document data info.
     */
    async getBookingShippingDocumentDataInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_booking_shipping_document_data_info", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to create shipping document job.
     */
    async createShippingDocumentJob(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/create_shipping_document_job", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to download shipping document job.
     */
    async downloadShippingDocumentJob(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/download_shipping_document_job", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get shipping document job status.
     */
    async getShippingDocumentJobStatus(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_shipping_document_job_status", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to download shipping label.
     */
    async downloadToLabel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/download_to_label", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to update logistics channel configuration.
     */
    async updateChannel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_channel", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to update shipping order.
     */
    async updateShippingOrder(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_shipping_order", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to update tracking status.
     */
    async updateTrackingStatus(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_tracking_status", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to update self collection order logistics.
     */
    async updateSelfCollectionOrderLogistics(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_self_collection_order_logistics", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get operating hours.
     */
    async getOperatingHours(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_operating_hours", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to update operating hours.
     */
    async updateOperatingHours(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_operating_hours", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get operating hour restrictions.
     */
    async getOperatingHourRestrictions(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_operating_hour_restrictions", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to delete special operating hour.
     */
    async deleteSpecialOperatingHour(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/delete_special_operating_hour", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to get mart packaging info.
     */
    async getMartPackagingInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/get_mart_packaging_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to set mart packaging info.
     */
    async setMartPackagingInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/set_mart_packaging_info", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to batch update TPF warehouse tracking status.
     */
    async batchUpdateTPFWarehouseTrackingStatus(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/batch_update_tpf_warehouse_tracking_status", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Only available for Brazil sellers. Use this API to check the status of polygon file uploaded for BR Entrega Turbo channel (Channel ID: 90026) by querying the task_id returned via the v2.logistics.upload_serviceable_polygon.
     */
    async checkPolygonUpdateStatus(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/check_polygon_update_status", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this API to update the address of a shop.
     */
    async updateAddress(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/update_address", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Only available for Brazil sellers. Use this API to upload KML file for shop level serviceability setting for BR Entrega Turbo channel (Channel ID: 90026). Please note that multiple Outlet Shops under the same Mart Shop cannot have overlapping service areas.
     */
    async uploadServiceablePolygon(params) {
        const response = await ShopeeFetch.fetch(this.config, "/logistics/upload_serviceable_polygon", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
}
//# sourceMappingURL=logistics.manager.js.map