// NOTE: This file is auto-generated. Do not edit directly.

import {
  BindCourierDeliveryFirstMileTrackingNumberRequest,
  BindCourierDeliveryFirstMileTrackingNumberResponse,
  BindFirstMileTrackingNumberRequest,
  BindFirstMileTrackingNumberResponse,
  GenerateAndBindFirstMileTrackingNumberRequest,
  GenerateAndBindFirstMileTrackingNumberResponse,
  GenerateFirstMileTrackingNumberRequest,
  GenerateFirstMileTrackingNumberResponse,
  GetChannelListRequest,
  GetChannelListResponse,
  GetCourierDeliveryChannelListRequest,
  GetCourierDeliveryChannelListResponse,
  GetCourierDeliveryDetailRequest,
  GetCourierDeliveryDetailResponse,
  GetCourierDeliveryTrackingNumberListRequest,
  GetCourierDeliveryTrackingNumberListResponse,
  GetCourierDeliveryWaybillRequest,
  GetCourierDeliveryWaybillResponse,
  GetDetailRequest,
  GetDetailResponse,
  GetTrackingNumberListRequest,
  GetTrackingNumberListResponse,
  GetTransitWarehouseListRequest,
  GetTransitWarehouseListResponse,
  GetUnbindOrderListRequest,
  GetUnbindOrderListResponse,
  GetWaybillRequest,
  GetWaybillResponse,
  UnbindFirstMileTrackingNumberRequest,
  UnbindFirstMileTrackingNumberResponse,
  UnbindFirstMileTrackingNumberAllRequest,
  UnbindFirstMileTrackingNumberAllResponse,
} from "../schemas/first-mile.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class FirstMileManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this api to bind first mile tracking number for courier delivery method.
   *
   * @param {BindCourierDeliveryFirstMileTrackingNumberRequest} params Request parameters
   * @returns {Promise<BindCourierDeliveryFirstMileTrackingNumberResponse>} Promise resolving to the response
   */
  public async bindCourierDeliveryFirstMileTrackingNumber(
    params?: BindCourierDeliveryFirstMileTrackingNumberRequest
  ): Promise<BindCourierDeliveryFirstMileTrackingNumberResponse> {
    return ShopeeFetch.fetch<BindCourierDeliveryFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/bind_courier_delivery_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to bind first mile tracking number.
   *
   * @param {BindFirstMileTrackingNumberRequest} params Request parameters
   * @returns {Promise<BindFirstMileTrackingNumberResponse>} Promise resolving to the response
   */
  public async bindFirstMileTrackingNumber(
    params?: BindFirstMileTrackingNumberRequest
  ): Promise<BindFirstMileTrackingNumberResponse> {
    return ShopeeFetch.fetch<BindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/bind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to generate first mile tracking number for courier delivery method.
   *
   * @param {GenerateAndBindFirstMileTrackingNumberRequest} params Request parameters
   * @returns {Promise<GenerateAndBindFirstMileTrackingNumberResponse>} Promise resolving to the response
   */
  public async generateAndBindFirstMileTrackingNumber(
    params?: GenerateAndBindFirstMileTrackingNumberRequest
  ): Promise<GenerateAndBindFirstMileTrackingNumberResponse> {
    return ShopeeFetch.fetch<GenerateAndBindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/generate_and_bind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to generate first mile tracking number.
   *
   * @param {GenerateFirstMileTrackingNumberRequest} params Request parameters
   * @returns {Promise<GenerateFirstMileTrackingNumberResponse>} Promise resolving to the response
   */
  public async generateFirstMileTrackingNumber(
    params?: GenerateFirstMileTrackingNumberRequest
  ): Promise<GenerateFirstMileTrackingNumberResponse> {
    return ShopeeFetch.fetch<GenerateFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/generate_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get first mile channel list.
   *
   * @param {GetChannelListRequest} params Request parameters
   * @returns {Promise<GetChannelListResponse>} Promise resolving to the response
   */
  public async getChannelList(params?: GetChannelListRequest): Promise<GetChannelListResponse> {
    return ShopeeFetch.fetch<GetChannelListResponse>(this.config, "/first_mile/get_channel_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Use this api to get courier information for courier delivery method.
   *
   * @param {GetCourierDeliveryChannelListRequest} params Request parameters
   * @returns {Promise<GetCourierDeliveryChannelListResponse>} Promise resolving to the response
   */
  public async getCourierDeliveryChannelList(
    params?: GetCourierDeliveryChannelListRequest
  ): Promise<GetCourierDeliveryChannelListResponse> {
    return ShopeeFetch.fetch<GetCourierDeliveryChannelListResponse>(
      this.config,
      "/first_mile/get_courier_delivery_channel_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get first mile detail for courier delivery method.
   *
   * @param {GetCourierDeliveryDetailRequest} params Request parameters
   * @returns {Promise<GetCourierDeliveryDetailResponse>} Promise resolving to the response
   */
  public async getCourierDeliveryDetail(
    params?: GetCourierDeliveryDetailRequest
  ): Promise<GetCourierDeliveryDetailResponse> {
    return ShopeeFetch.fetch<GetCourierDeliveryDetailResponse>(
      this.config,
      "/first_mile/get_courier_delivery_detail",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get tracking number for courier delivery method.
   *
   * @param {GetCourierDeliveryTrackingNumberListRequest} params Request parameters
   * @returns {Promise<GetCourierDeliveryTrackingNumberListResponse>} Promise resolving to the response
   */
  public async getCourierDeliveryTrackingNumberList(
    params?: GetCourierDeliveryTrackingNumberListRequest
  ): Promise<GetCourierDeliveryTrackingNumberListResponse> {
    return ShopeeFetch.fetch<GetCourierDeliveryTrackingNumberListResponse>(
      this.config,
      "/first_mile/get_courier_delivery_tracking_number_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get first mile waybill file for courier delivery method.
   *
   * @param {GetCourierDeliveryWaybillRequest} params Request parameters
   * @returns {Promise<GetCourierDeliveryWaybillResponse>} Promise resolving to the response
   */
  public async getCourierDeliveryWaybill(
    params?: GetCourierDeliveryWaybillRequest
  ): Promise<GetCourierDeliveryWaybillResponse> {
    return ShopeeFetch.fetch<GetCourierDeliveryWaybillResponse>(
      this.config,
      "/first_mile/get_courier_delivery_waybill",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get first mile detail.
   *
   * @param {GetDetailRequest} params Request parameters
   * @returns {Promise<GetDetailResponse>} Promise resolving to the response
   */
  public async getDetail(params?: GetDetailRequest): Promise<GetDetailResponse> {
    return ShopeeFetch.fetch<GetDetailResponse>(this.config, "/first_mile/get_detail", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Use this api to get first mile tracking number list.
   *
   * @param {GetTrackingNumberListRequest} params Request parameters
   * @returns {Promise<GetTrackingNumberListResponse>} Promise resolving to the response
   */
  public async getTrackingNumberList(
    params?: GetTrackingNumberListRequest
  ): Promise<GetTrackingNumberListResponse> {
    return ShopeeFetch.fetch<GetTrackingNumberListResponse>(
      this.config,
      "/first_mile/get_tracking_number_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get transit warehouse list which is used for first mile tracking number generation for courier delivery method.
   *
   * @param {GetTransitWarehouseListRequest} params Request parameters
   * @returns {Promise<GetTransitWarehouseListResponse>} Promise resolving to the response
   */
  public async getTransitWarehouseList(
    params?: GetTransitWarehouseListRequest
  ): Promise<GetTransitWarehouseListResponse> {
    return ShopeeFetch.fetch<GetTransitWarehouseListResponse>(
      this.config,
      "/first_mile/get_transit_warehouse_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get unbind order list. It will only return orders unbound to first-mile that were created within the past 6 months.
   *
   * @param {GetUnbindOrderListRequest} params Request parameters
   * @returns {Promise<GetUnbindOrderListResponse>} Promise resolving to the response
   */
  public async getUnbindOrderList(
    params?: GetUnbindOrderListRequest
  ): Promise<GetUnbindOrderListResponse> {
    return ShopeeFetch.fetch<GetUnbindOrderListResponse>(
      this.config,
      "/first_mile/get_unbind_order_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get first mile waybill file.
   *
   * @param {GetWaybillRequest} params Request parameters
   * @returns {Promise<GetWaybillResponse>} Promise resolving to the response
   */
  public async getWaybill(params?: GetWaybillRequest): Promise<GetWaybillResponse> {
    return ShopeeFetch.fetch<GetWaybillResponse>(this.config, "/first_mile/get_waybill", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this api to unbind first mile.
   *
   * @param {UnbindFirstMileTrackingNumberRequest} params Request parameters
   * @returns {Promise<UnbindFirstMileTrackingNumberResponse>} Promise resolving to the response
   */
  public async unbindFirstMileTrackingNumber(
    params?: UnbindFirstMileTrackingNumberRequest
  ): Promise<UnbindFirstMileTrackingNumberResponse> {
    return ShopeeFetch.fetch<UnbindFirstMileTrackingNumberResponse>(
      this.config,
      "/first_mile/unbind_first_mile_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to unbind orders from first mile tracking number or binding ID.
   *
   * @param {UnbindFirstMileTrackingNumberAllRequest} params Request parameters
   * @returns {Promise<UnbindFirstMileTrackingNumberAllResponse>} Promise resolving to the response
   */
  public async unbindFirstMileTrackingNumberAll(
    params?: UnbindFirstMileTrackingNumberAllRequest
  ): Promise<UnbindFirstMileTrackingNumberAllResponse> {
    return ShopeeFetch.fetch<UnbindFirstMileTrackingNumberAllResponse>(
      this.config,
      "/first_mile/unbind_first_mile_tracking_number_all",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
