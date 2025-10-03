import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  BindCourierDeliveryFirstMileTrackingNumberParams,
  BindCourierDeliveryFirstMileTrackingNumberResponse,
  BindFirstMileTrackingNumberParams,
  BindFirstMileTrackingNumberResponse,
  GenerateAndBindFirstMileTrackingNumberParams,
  GenerateAndBindFirstMileTrackingNumberResponse,
  GenerateFirstMileTrackingNumberParams,
  GenerateFirstMileTrackingNumberResponse,
  GetChannelListParams,
  GetChannelListResponse,
  GetCourierDeliveryChannelListParams,
  GetCourierDeliveryChannelListResponse,
  GetCourierDeliveryDetailParams,
  GetCourierDeliveryDetailResponse,
  GetCourierDeliveryTrackingNumberListParams,
  GetCourierDeliveryTrackingNumberListResponse,
  GetCourierDeliveryWaybillParams,
  GetCourierDeliveryWaybillResponse,
  GetDetailParams,
  GetDetailResponse,
  GetTrackingNumberListParams,
  GetTrackingNumberListResponse,
  GetTransitWarehouseListParams,
  GetTransitWarehouseListResponse,
  GetUnbindOrderListParams,
  GetUnbindOrderListResponse,
  GetWaybillParams,
  GetWaybillResponse,
  UnbindFirstMileTrackingNumberParams,
  UnbindFirstMileTrackingNumberResponse,
  UnbindFirstMileTrackingNumberAllParams,
  UnbindFirstMileTrackingNumberAllResponse,
} from "../schemas/first-mile.js";
import { ShopeeFetch } from "../fetch.js";

export class FirstMileManager extends BaseManager {
  constructor(config: ShopeeConfig) {
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
  async bindCourierDeliveryFirstMileTrackingNumber(
    params: BindCourierDeliveryFirstMileTrackingNumberParams
  ): Promise<BindCourierDeliveryFirstMileTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<BindCourierDeliveryFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/bind_courier_delivery_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async bindFirstMileTrackingNumber(
    params: BindFirstMileTrackingNumberParams
  ): Promise<BindFirstMileTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<BindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/bind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async generateAndBindFirstMileTrackingNumber(
    params: GenerateAndBindFirstMileTrackingNumberParams
  ): Promise<GenerateAndBindFirstMileTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<GenerateAndBindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/generate_and_bind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async generateFirstMileTrackingNumber(
    params: GenerateFirstMileTrackingNumberParams
  ): Promise<GenerateFirstMileTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<GenerateFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/generate_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async getChannelList(params?: GetChannelListParams): Promise<GetChannelListResponse> {
    const response = await ShopeeFetch.fetch<GetChannelListResponse>(
      this.config,
      "/first_mile/get_channel_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getCourierDeliveryChannelList(
    params?: GetCourierDeliveryChannelListParams
  ): Promise<GetCourierDeliveryChannelListResponse> {
    const response = await ShopeeFetch.fetch<GetCourierDeliveryChannelListResponse>(
      this.config,
      "/first_mile/get_courier_delivery_channel_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getCourierDeliveryDetail(
    params: GetCourierDeliveryDetailParams
  ): Promise<GetCourierDeliveryDetailResponse> {
    const response = await ShopeeFetch.fetch<GetCourierDeliveryDetailResponse>(
      this.config,
      "/first_mile/get_courier_delivery_detail",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getCourierDeliveryTrackingNumberList(
    params: GetCourierDeliveryTrackingNumberListParams
  ): Promise<GetCourierDeliveryTrackingNumberListResponse> {
    const response = await ShopeeFetch.fetch<GetCourierDeliveryTrackingNumberListResponse>(
      this.config,
      "/first_mile/get_courier_delivery_tracking_number_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async getCourierDeliveryWaybill(
    params: GetCourierDeliveryWaybillParams
  ): Promise<GetCourierDeliveryWaybillResponse> {
    const response = await ShopeeFetch.fetch<GetCourierDeliveryWaybillResponse>(
      this.config,
      "/first_mile/get_courier_delivery_waybill",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async getDetail(params: GetDetailParams): Promise<GetDetailResponse> {
    const response = await ShopeeFetch.fetch<GetDetailResponse>(
      this.config,
      "/first_mile/get_detail",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getTrackingNumberList(
    params: GetTrackingNumberListParams
  ): Promise<GetTrackingNumberListResponse> {
    const response = await ShopeeFetch.fetch<GetTrackingNumberListResponse>(
      this.config,
      "/first_mile/get_tracking_number_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getTransitWarehouseList(
    params?: GetTransitWarehouseListParams
  ): Promise<GetTransitWarehouseListResponse> {
    const response = await ShopeeFetch.fetch<GetTransitWarehouseListResponse>(
      this.config,
      "/first_mile/get_transit_warehouse_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getUnbindOrderList(params?: GetUnbindOrderListParams): Promise<GetUnbindOrderListResponse> {
    const response = await ShopeeFetch.fetch<GetUnbindOrderListResponse>(
      this.config,
      "/first_mile/get_unbind_order_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

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
  async getWaybill(params: GetWaybillParams): Promise<GetWaybillResponse> {
    const response = await ShopeeFetch.fetch<GetWaybillResponse>(
      this.config,
      "/first_mile/get_waybill",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async unbindFirstMileTrackingNumber(
    params: UnbindFirstMileTrackingNumberParams
  ): Promise<UnbindFirstMileTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<UnbindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/unbind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

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
  async unbindFirstMileTrackingNumberAll(
    params: UnbindFirstMileTrackingNumberAllParams
  ): Promise<UnbindFirstMileTrackingNumberAllResponse> {
    const response = await ShopeeFetch.fetch<UnbindFirstMileTrackingNumberAllResponse>(
      this.config,
      "/first_mile/unbind_first_mile_tracking_number_all",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
