import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class FirstMileManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Use this api to bind first mile tracking number for courier delivery method.
     *
     * @param params - Parameters for binding courier delivery first mile tracking number
     * @returns A promise that resolves to the bind response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.bind_courier_delivery_first_mile_tracking_number
     */
    async bindCourierDeliveryFirstMileTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/bind_courier_delivery_first_mile_tracking_number", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to bind first mile tracking number.
     *
     * @param params - Parameters for binding first mile tracking number
     * @returns A promise that resolves to the bind response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.bind_first_mile_tracking_number
     */
    async bindFirstMileTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/bind_first_mile_tracking_number", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to generate first mile tracking number for courier delivery method.
     *
     * @param params - Parameters for generating and binding first mile tracking number
     * @returns A promise that resolves to the generate and bind response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.generate_and_bind_first_mile_tracking_number
     */
    async generateAndBindFirstMileTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/generate_and_bind_first_mile_tracking_number", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to generate first mile tracking number.
     *
     * @param params - Parameters for generating first mile tracking number
     * @returns A promise that resolves to the generate response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.generate_first_mile_tracking_number
     */
    async generateFirstMileTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/generate_first_mile_tracking_number", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to get first mile channel list.
     *
     * @param params - Parameters for getting channel list (optional region filter)
     * @returns A promise that resolves to the channel list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_channel_list
     */
    async getChannelList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_channel_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get courier information for courier delivery method.
     *
     * @param params - Parameters for getting courier delivery channel list (optional region filter)
     * @returns A promise that resolves to the courier delivery channel list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_channel_list
     */
    async getCourierDeliveryChannelList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_courier_delivery_channel_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get first mile detail for courier delivery method.
     *
     * @param params - Parameters for getting courier delivery detail
     * @returns A promise that resolves to the courier delivery detail response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_detail
     */
    async getCourierDeliveryDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_courier_delivery_detail", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get tracking number for courier delivery method.
     *
     * @param params - Parameters for getting courier delivery tracking number list
     * @returns A promise that resolves to the courier delivery tracking number list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_tracking_number_list
     */
    async getCourierDeliveryTrackingNumberList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_courier_delivery_tracking_number_list", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to get first mile waybill file for courier delivery method.
     *
     * @param params - Parameters for getting courier delivery waybill
     * @returns A promise that resolves to the courier delivery waybill response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_waybill
     */
    async getCourierDeliveryWaybill(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_courier_delivery_waybill", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to get first mile detail.
     *
     * @param params - Parameters for getting first mile detail
     * @returns A promise that resolves to the first mile detail response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_detail
     */
    async getDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_detail", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get first mile tracking number list.
     *
     * @param params - Parameters for getting tracking number list
     * @returns A promise that resolves to the tracking number list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_tracking_number_list
     */
    async getTrackingNumberList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_tracking_number_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get transit warehouse list which is used for first mile tracking number generation for courier delivery method.
     *
     * @param params - Parameters for getting transit warehouse list (optional region filter)
     * @returns A promise that resolves to the transit warehouse list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_transit_warehouse_list
     */
    async getTransitWarehouseList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_transit_warehouse_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get unbind order list.
     *
     * @param params - Parameters for getting unbind order list
     * @returns A promise that resolves to the unbind order list response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_unbind_order_list
     */
    async getUnbindOrderList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_unbind_order_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this api to get first mile waybill file.
     *
     * @param params - Parameters for getting waybill
     * @returns A promise that resolves to the waybill response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.get_waybill
     */
    async getWaybill(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/get_waybill", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to unbind first mile.
     *
     * @param params - Parameters for unbinding first mile tracking number
     * @returns A promise that resolves to the unbind response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.unbind_first_mile_tracking_number
     */
    async unbindFirstMileTrackingNumber(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/unbind_first_mile_tracking_number", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this api to unbind orders from first mile tracking number or binding ID.
     *
     * @param params - Parameters for unbinding all first mile tracking numbers
     * @returns A promise that resolves to the unbind response
     *
     * @see https://open.shopee.com/documents/v2/v2.first_mile.unbind_first_mile_tracking_number_all
     */
    async unbindFirstMileTrackingNumberAll(params) {
        const response = await ShopeeFetch.fetch(this.config, "/first_mile/unbind_first_mile_tracking_number_all", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
}
//# sourceMappingURL=first-mile.manager.js.map