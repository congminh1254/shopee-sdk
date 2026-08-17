// NOTE: This file is auto-generated. Do not edit directly.

import {
  BatchShipOrderRequest,
  BatchShipOrderResponse,
  BatchUpdateTpfWarehouseTrackingStatusRequest,
  BatchUpdateTpfWarehouseTrackingStatusResponse,
  CheckPolygonUpdateStatusRequest,
  CheckPolygonUpdateStatusResponse,
  CreateBookingShippingDocumentRequest,
  CreateBookingShippingDocumentResponse,
  CreateShippingDocumentRequest,
  CreateShippingDocumentResponse,
  CreateShippingDocumentJobRequest,
  CreateShippingDocumentJobResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  DeleteSpecialOperatingHourRequest,
  DeleteSpecialOperatingHourResponse,
  DownloadBookingShippingDocumentRequest,
  DownloadBookingShippingDocumentResponse,
  DownloadShippingDocumentRequest,
  DownloadShippingDocumentResponse,
  DownloadShippingDocumentJobRequest,
  DownloadShippingDocumentJobResponse,
  DownloadToLabelRequest,
  DownloadToLabelResponse,
  GetAddressListRequest,
  GetAddressListResponse,
  GetBookingShippingDocumentDataInfoRequest,
  GetBookingShippingDocumentDataInfoResponse,
  GetBookingShippingDocumentParameterRequest,
  GetBookingShippingDocumentParameterResponse,
  GetBookingShippingDocumentResultRequest,
  GetBookingShippingDocumentResultResponse,
  GetBookingShippingParameterRequest,
  GetBookingShippingParameterResponse,
  GetBookingTrackingInfoRequest,
  GetBookingTrackingInfoResponse,
  GetBookingTrackingNumberRequest,
  GetBookingTrackingNumberResponse,
  GetChannelListRequest,
  GetChannelListResponse,
  GetMartPackagingInfoRequest,
  GetMartPackagingInfoResponse,
  GetMassShippingParameterRequest,
  GetMassShippingParameterResponse,
  GetMassTrackingNumberRequest,
  GetMassTrackingNumberResponse,
  GetOperatingHourRestrictionsRequest,
  GetOperatingHourRestrictionsResponse,
  GetOperatingHoursRequest,
  GetOperatingHoursResponse,
  GetPauseStatusRequest,
  GetPauseStatusResponse,
  GetShippingDocumentDataInfoRequest,
  GetShippingDocumentDataInfoResponse,
  GetShippingDocumentJobStatusRequest,
  GetShippingDocumentJobStatusResponse,
  GetShippingDocumentParameterRequest,
  GetShippingDocumentParameterResponse,
  GetShippingDocumentResultRequest,
  GetShippingDocumentResultResponse,
  GetShippingParameterRequest,
  GetShippingParameterResponse,
  GetTrackingInfoRequest,
  GetTrackingInfoResponse,
  GetTrackingNumberRequest,
  GetTrackingNumberResponse,
  MassShipOrderRequest,
  MassShipOrderResponse,
  SetAddressConfigRequest,
  SetAddressConfigResponse,
  SetMartPackagingInfoRequest,
  SetMartPackagingInfoResponse,
  SetPauseStatusRequest,
  SetPauseStatusResponse,
  ShipBookingRequest,
  ShipBookingResponse,
  ShipOrderRequest,
  ShipOrderResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateOperatingHoursRequest,
  UpdateOperatingHoursResponse,
  UpdateSelfCollectionOrderLogisticsRequest,
  UpdateSelfCollectionOrderLogisticsResponse,
  UpdateShippingOrderRequest,
  UpdateShippingOrderResponse,
  UpdateTrackingStatusRequest,
  UpdateTrackingStatusResponse,
  UploadServiceablePolygonRequest,
  UploadServiceablePolygonResponse,
} from "../schemas/logistics.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class LogisticsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this api to batch initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller.Only channel 90003 - Padrão in Brazil has the permission of this API.
   *
   * @param {BatchShipOrderRequest} params Request parameters
   * @returns {Promise<BatchShipOrderResponse>} Promise resolving to the response
   */
  public async batchShipOrder(params?: BatchShipOrderRequest): Promise<BatchShipOrderResponse> {
    return ShopeeFetch.fetch<BatchShipOrderResponse>(this.config, "/logistics/batch_ship_order", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * For CB orders that fulfilled by 3PF, support 3PF Warehouse Vendors to update the tpf_tracking_status when 3PF warehouse receive the order and complete the outbound of the package.
   * CB orders that fulfilled by 3PF：
   * v2.shop.get_shop_info  - shop_fulfillment_flag in {Pure - 3PF Shop,PFF - 3PF Shop,LFF Hybrid Shop}
   * And
   * v2.order.get_order_detail -  fulfillment_flag = fulfilled_by_local_seller
   *
   * @param {BatchUpdateTpfWarehouseTrackingStatusRequest} params Request parameters
   * @returns {Promise<BatchUpdateTpfWarehouseTrackingStatusResponse>} Promise resolving to the response
   */
  public async batchUpdateTpfWarehouseTrackingStatus(
    params?: BatchUpdateTpfWarehouseTrackingStatusRequest
  ): Promise<BatchUpdateTpfWarehouseTrackingStatusResponse> {
    return ShopeeFetch.fetch<BatchUpdateTpfWarehouseTrackingStatusResponse>(
      this.config,
      "/logistics/batch_update_tpf_warehouse_tracking_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Only available for Brazil sellers. Use this API to check the status of polygon file uploaded for BR Entrega Turbo channel (Channel ID: 90026) by querying the task_id returned via the v2.logistics.upload_serviceable_polygon.
   *
   * @param {CheckPolygonUpdateStatusRequest} params Request parameters
   * @returns {Promise<CheckPolygonUpdateStatusResponse>} Promise resolving to the response
   */
  public async checkPolygonUpdateStatus(
    params?: CheckPolygonUpdateStatusRequest
  ): Promise<CheckPolygonUpdateStatusResponse> {
    return ShopeeFetch.fetch<CheckPolygonUpdateStatusResponse>(
      this.config,
      "/logistics/check_polygon_update_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to create shipping document task for each booking and this API is only available after retrieving the tracking number.
   *
   * @param {CreateBookingShippingDocumentRequest} params Request parameters
   * @returns {Promise<CreateBookingShippingDocumentResponse>} Promise resolving to the response
   */
  public async createBookingShippingDocument(
    params?: CreateBookingShippingDocumentRequest
  ): Promise<CreateBookingShippingDocumentResponse> {
    return ShopeeFetch.fetch<CreateBookingShippingDocumentResponse>(
      this.config,
      "/logistics/create_booking_shipping_document",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to create shipping document task for each order or package and this API is only available after retrieving the tracking number.
   *
   * @param {CreateShippingDocumentRequest} params Request parameters
   * @returns {Promise<CreateShippingDocumentResponse>} Promise resolving to the response
   */
  public async createShippingDocument(
    params?: CreateShippingDocumentRequest
  ): Promise<CreateShippingDocumentResponse> {
    return ShopeeFetch.fetch<CreateShippingDocumentResponse>(
      this.config,
      "/logistics/create_shipping_document",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * This API creates a shipping document job for selected documents. The system receives requests and returns a job ID along with success and failure details.
   *
   * @param {CreateShippingDocumentJobRequest} params Request parameters
   * @returns {Promise<CreateShippingDocumentJobResponse>} Promise resolving to the response
   */
  public async createShippingDocumentJob(
    params?: CreateShippingDocumentJobRequest
  ): Promise<CreateShippingDocumentJobResponse> {
    return ShopeeFetch.fetch<CreateShippingDocumentJobResponse>(
      this.config,
      "/logistics/create_shipping_document_job",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to delete address.
   *
   * @param {DeleteAddressRequest} params Request parameters
   * @returns {Promise<DeleteAddressResponse>} Promise resolving to the response
   */
  public async deleteAddress(params?: DeleteAddressRequest): Promise<DeleteAddressResponse> {
    return ShopeeFetch.fetch<DeleteAddressResponse>(this.config, "/logistics/delete_address", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * This API is used to delete a specific special operating hour for a seller. This API allows sellers to manage their operating hours by removing any special operating hours that are no longer needed. To use this API, the name of the special operating hour to be deleted should be obtained from the v2.logistics.get_operating_hours API.
   *
   * @param {DeleteSpecialOperatingHourRequest} params Request parameters
   * @returns {Promise<DeleteSpecialOperatingHourResponse>} Promise resolving to the response
   */
  public async deleteSpecialOperatingHour(
    params?: DeleteSpecialOperatingHourRequest
  ): Promise<DeleteSpecialOperatingHourResponse> {
    return ShopeeFetch.fetch<DeleteSpecialOperatingHourResponse>(
      this.config,
      "/logistics/delete_special_operating_hour",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to download shipping_document. You have to call v2.logistics.create_booking_shipping_document to create a new shipping document task first and call v2.logistics.get_booking_shipping_document_result to get the task status second. If the task is READY, you can download this shipping document.
   *
   * @param {DownloadBookingShippingDocumentRequest} params Request parameters
   * @returns {Promise<DownloadBookingShippingDocumentResponse>} Promise resolving to the response
   */
  public async downloadBookingShippingDocument(
    params?: DownloadBookingShippingDocumentRequest
  ): Promise<DownloadBookingShippingDocumentResponse> {
    return ShopeeFetch.fetch<DownloadBookingShippingDocumentResponse>(
      this.config,
      "/logistics/download_booking_shipping_document",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to download shipping_document. You have to call v2.logistics.create_shipping_document to create a new shipping document task first and call v2.logistics.get_shipping_document_resut to get the task status second. If the task is READY, you can download this shipping document.
   *
   * @param {DownloadShippingDocumentRequest} params Request parameters
   * @returns {Promise<DownloadShippingDocumentResponse>} Promise resolving to the response
   */
  public async downloadShippingDocument(
    params?: DownloadShippingDocumentRequest
  ): Promise<DownloadShippingDocumentResponse> {
    return ShopeeFetch.fetch<DownloadShippingDocumentResponse>(
      this.config,
      "/logistics/download_shipping_document",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * This API allows users to download the shipping document associated with a specific job ID. It checks the job status before proceeding with the download.
   *
   * @param {DownloadShippingDocumentJobRequest} params Request parameters
   * @returns {Promise<DownloadShippingDocumentJobResponse>} Promise resolving to the response
   */
  public async downloadShippingDocumentJob(
    params?: DownloadShippingDocumentJobRequest
  ): Promise<DownloadShippingDocumentJobResponse> {
    return ShopeeFetch.fetch<DownloadShippingDocumentJobResponse>(
      this.config,
      "/logistics/download_shipping_document_job",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use the API to download the TO label that should be attached to the carton before drop-off at the warehouse (Only for TW channel_id:30029).
   *
   * @param {DownloadToLabelRequest} params Request parameters
   * @returns {Promise<DownloadToLabelResponse>} Promise resolving to the response
   */
  public async downloadToLabel(params?: DownloadToLabelRequest): Promise<DownloadToLabelResponse> {
    return ShopeeFetch.fetch<DownloadToLabelResponse>(this.config, "/logistics/download_to_label", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * For integrated logistics channel, use this call to get pickup address for pickup mode order.
   *
   * @param {GetAddressListRequest} params Request parameters
   * @returns {Promise<GetAddressListResponse>} Promise resolving to the response
   */
  public async getAddressList(params?: GetAddressListRequest): Promise<GetAddressListResponse> {
    return ShopeeFetch.fetch<GetAddressListResponse>(this.config, "/logistics/get_address_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Use this api to fetch the logistics information of a booking these info can be used for airwaybill printing. Dedicated for crossborder SLS order airwaybill. May not be applicable for local channel airwaybill. Besides, this api supports returning personal info as images.
   *
   * @param {GetBookingShippingDocumentDataInfoRequest} params Request parameters
   * @returns {Promise<GetBookingShippingDocumentDataInfoResponse>} Promise resolving to the response
   */
  public async getBookingShippingDocumentDataInfo(
    params?: GetBookingShippingDocumentDataInfoRequest
  ): Promise<GetBookingShippingDocumentDataInfoResponse> {
    return ShopeeFetch.fetch<GetBookingShippingDocumentDataInfoResponse>(
      this.config,
      "/logistics/get_booking_shipping_document_data_info",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
   *
   * @param {GetBookingShippingDocumentParameterRequest} params Request parameters
   * @returns {Promise<GetBookingShippingDocumentParameterResponse>} Promise resolving to the response
   */
  public async getBookingShippingDocumentParameter(
    params?: GetBookingShippingDocumentParameterRequest
  ): Promise<GetBookingShippingDocumentParameterResponse> {
    return ShopeeFetch.fetch<GetBookingShippingDocumentParameterResponse>(
      this.config,
      "/logistics/get_booking_shipping_document_parameter",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
   *
   * @param {GetBookingShippingDocumentResultRequest} params Request parameters
   * @returns {Promise<GetBookingShippingDocumentResultResponse>} Promise resolving to the response
   */
  public async getBookingShippingDocumentResult(
    params?: GetBookingShippingDocumentResultRequest
  ): Promise<GetBookingShippingDocumentResultResponse> {
    return ShopeeFetch.fetch<GetBookingShippingDocumentResultResponse>(
      this.config,
      "/logistics/get_booking_shipping_document_result",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get the parameter "info_needed" from the response to check if the booking has pickup or dropoff. This api will also return the addresses and pickup time id options for the pickup method. For dropoff, it can return branch id, sender real name etc, depending on the 3PL requirements.
   *
   * @param {GetBookingShippingParameterRequest} params Request parameters
   * @returns {Promise<GetBookingShippingParameterResponse>} Promise resolving to the response
   */
  public async getBookingShippingParameter(
    params?: GetBookingShippingParameterRequest
  ): Promise<GetBookingShippingParameterResponse> {
    return ShopeeFetch.fetch<GetBookingShippingParameterResponse>(
      this.config,
      "/logistics/get_booking_shipping_parameter",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.pickup.address_list.time_slot_list.date"],
      }
    );
  }
  /**
   * Use this api to get the logistics tracking information of a booking.
   *
   * @param {GetBookingTrackingInfoRequest} params Request parameters
   * @returns {Promise<GetBookingTrackingInfoResponse>} Promise resolving to the response
   */
  public async getBookingTrackingInfo(
    params?: GetBookingTrackingInfoRequest
  ): Promise<GetBookingTrackingInfoResponse> {
    return ShopeeFetch.fetch<GetBookingTrackingInfoResponse>(
      this.config,
      "/logistics/get_booking_tracking_info",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.tracking_info.update_time"],
      }
    );
  }
  /**
   * After arranging shipment (v2.logistics.ship_booking) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
   *
   * @param {GetBookingTrackingNumberRequest} params Request parameters
   * @returns {Promise<GetBookingTrackingNumberResponse>} Promise resolving to the response
   */
  public async getBookingTrackingNumber(
    params?: GetBookingTrackingNumberRequest
  ): Promise<GetBookingTrackingNumberResponse> {
    return ShopeeFetch.fetch<GetBookingTrackingNumberResponse>(
      this.config,
      "/logistics/get_booking_tracking_number",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get all supported logistic channels.
   *
   * @param {GetChannelListRequest} params Request parameters
   * @returns {Promise<GetChannelListResponse>} Promise resolving to the response
   */
  public async getChannelList(params?: GetChannelListRequest): Promise<GetChannelListResponse> {
    return ShopeeFetch.fetch<GetChannelListResponse>(this.config, "/logistics/get_channel_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * [Only for ID mart seller] The API allows sellers to retrieve their current packaging fee settings.
   *
   * @param {GetMartPackagingInfoRequest} params Request parameters
   * @returns {Promise<GetMartPackagingInfoResponse>} Promise resolving to the response
   */
  public async getMartPackagingInfo(
    params?: GetMartPackagingInfoRequest
  ): Promise<GetMartPackagingInfoResponse> {
    return ShopeeFetch.fetch<GetMartPackagingInfoResponse>(
      this.config,
      "/logistics/get_mart_packaging_info",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to check if package support pickup, dropoff, non-integrated. For pickup, return address and pickup time id options. For dropoff, return branch id, sender real name, etc. Can batch request for packages under same product_location_id and logistics_channel_id. [Please call it when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule conditions]
   *
   * @param {GetMassShippingParameterRequest} params Request parameters
   * @returns {Promise<GetMassShippingParameterResponse>} Promise resolving to the response
   */
  public async getMassShippingParameter(
    params?: GetMassShippingParameterRequest
  ): Promise<GetMassShippingParameterResponse> {
    return ShopeeFetch.fetch<GetMassShippingParameterResponse>(
      this.config,
      "/logistics/get_mass_shipping_parameter",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["response.pickup.address_list.time_slot_list.date"],
      }
    );
  }
  /**
   * After arranging shipment (v2.logistics.mass_ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
   *
   * @param {GetMassTrackingNumberRequest} params Request parameters
   * @returns {Promise<GetMassTrackingNumberResponse>} Promise resolving to the response
   */
  public async getMassTrackingNumber(
    params?: GetMassTrackingNumberRequest
  ): Promise<GetMassTrackingNumberResponse> {
    return ShopeeFetch.fetch<GetMassTrackingNumberResponse>(
      this.config,
      "/logistics/get_mass_tracking_number",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * This API is designed to retrieve all restrictions related to inputting operating hours for the v2.logistics.update_operating_hours function. This API ensures that user are aware of any limitations or conditions that may affect their operating hours.
   *
   * @param {GetOperatingHourRestrictionsRequest} params Request parameters
   * @returns {Promise<GetOperatingHourRestrictionsResponse>} Promise resolving to the response
   */
  public async getOperatingHourRestrictions(
    params?: GetOperatingHourRestrictionsRequest
  ): Promise<GetOperatingHourRestrictionsResponse> {
    return ShopeeFetch.fetch<GetOperatingHourRestrictionsResponse>(
      this.config,
      "/logistics/get_operating_hour_restrictions",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API is utilized to retrieve the existing operating hours of sellers including Pickup Operating Hours,  Special Hours, Instant Operating Hours, and Shop Collection Operating Hours.
   *
   * @param {GetOperatingHoursRequest} params Request parameters
   * @returns {Promise<GetOperatingHoursResponse>} Promise resolving to the response
   */
  public async getOperatingHours(
    params?: GetOperatingHoursRequest
  ): Promise<GetOperatingHoursResponse> {
    return ShopeeFetch.fetch<GetOperatingHoursResponse>(
      this.config,
      "/logistics/get_operating_hours",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API returns the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Sellers need to refer to the support_pause field in v2.logistics.get_channel_list response to determine which channels are actually paused.
   *
   * @param {GetPauseStatusRequest} params Request parameters
   * @returns {Promise<GetPauseStatusResponse>} Promise resolving to the response
   */
  public async getPauseStatus(params?: GetPauseStatusRequest): Promise<GetPauseStatusResponse> {
    return ShopeeFetch.fetch<GetPauseStatusResponse>(this.config, "/logistics/get_pause_status", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.pause_end_time"],
    });
  }
  /**
   * Use this api to fetch the logistics information of an order, these info can be used for self-design AWB printing. Besides, this api supports returning personal info as images.
   *
   * @param {GetShippingDocumentDataInfoRequest} params Request parameters
   * @returns {Promise<GetShippingDocumentDataInfoResponse>} Promise resolving to the response
   */
  public async getShippingDocumentDataInfo(
    params?: GetShippingDocumentDataInfoRequest
  ): Promise<GetShippingDocumentDataInfoResponse> {
    return ShopeeFetch.fetch<GetShippingDocumentDataInfoResponse>(
      this.config,
      "/logistics/get_shipping_document_data_info",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * This API retrieves the status of a shipping document job using the job ID provided.
   *
   * @param {GetShippingDocumentJobStatusRequest} params Request parameters
   * @returns {Promise<GetShippingDocumentJobStatusResponse>} Promise resolving to the response
   */
  public async getShippingDocumentJobStatus(
    params?: GetShippingDocumentJobStatusRequest
  ): Promise<GetShippingDocumentJobStatusResponse> {
    return ShopeeFetch.fetch<GetShippingDocumentJobStatusResponse>(
      this.config,
      "/logistics/get_shipping_document_job_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
   *
   * @param {GetShippingDocumentParameterRequest} params Request parameters
   * @returns {Promise<GetShippingDocumentParameterResponse>} Promise resolving to the response
   */
  public async getShippingDocumentParameter(
    params?: GetShippingDocumentParameterRequest
  ): Promise<GetShippingDocumentParameterResponse> {
    return ShopeeFetch.fetch<GetShippingDocumentParameterResponse>(
      this.config,
      "/logistics/get_shipping_document_parameter",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
   *
   * @param {GetShippingDocumentResultRequest} params Request parameters
   * @returns {Promise<GetShippingDocumentResultResponse>} Promise resolving to the response
   */
  public async getShippingDocumentResult(
    params?: GetShippingDocumentResultRequest
  ): Promise<GetShippingDocumentResultResponse> {
    return ShopeeFetch.fetch<GetShippingDocumentResultResponse>(
      this.config,
      "/logistics/get_shipping_document_result",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to check if the package support pickup, dropoff, or non-integrated method. For pickup, will return addresses and pickup time id options. For dropoff, will return branch id, sender real name etc, depending on 3PL requirements. [Please call this API when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule Pickup conditions]
   *
   * @param {GetShippingParameterRequest} params Request parameters
   * @returns {Promise<GetShippingParameterResponse>} Promise resolving to the response
   */
  public async getShippingParameter(
    params?: GetShippingParameterRequest
  ): Promise<GetShippingParameterResponse> {
    return ShopeeFetch.fetch<GetShippingParameterResponse>(
      this.config,
      "/logistics/get_shipping_parameter",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.pickup.address_list.time_slot_list.date"],
      }
    );
  }
  /**
   * Use this api to get the logistics tracking information of an order.
   *
   * @param {GetTrackingInfoRequest} params Request parameters
   * @returns {Promise<GetTrackingInfoResponse>} Promise resolving to the response
   */
  public async getTrackingInfo(params?: GetTrackingInfoRequest): Promise<GetTrackingInfoResponse> {
    return ShopeeFetch.fetch<GetTrackingInfoResponse>(this.config, "/logistics/get_tracking_info", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.tracking_info.update_time"],
    });
  }
  /**
   * After arranging shipment (v2.logistics.ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
   *
   * @param {GetTrackingNumberRequest} params Request parameters
   * @returns {Promise<GetTrackingNumberResponse>} Promise resolving to the response
   */
  public async getTrackingNumber(
    params?: GetTrackingNumberRequest
  ): Promise<GetTrackingNumberResponse> {
    return ShopeeFetch.fetch<GetTrackingNumberResponse>(
      this.config,
      "/logistics/get_tracking_number",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_mass_shipping_parameter to fetch all required params first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller. The API can only batch arrange shipment for multiple packages under the same product_location_id and same logistics_channel_id.
   *
   * @param {MassShipOrderRequest} params Request parameters
   * @returns {Promise<MassShipOrderResponse>} Promise resolving to the response
   */
  public async massShipOrder(params?: MassShipOrderRequest): Promise<MassShipOrderResponse> {
    return ShopeeFetch.fetch<MassShipOrderResponse>(this.config, "/logistics/mass_ship_order", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this API to set address config of your shop.
   *
   * @param {SetAddressConfigRequest} params Request parameters
   * @returns {Promise<SetAddressConfigResponse>} Promise resolving to the response
   */
  public async setAddressConfig(
    params?: SetAddressConfigRequest
  ): Promise<SetAddressConfigResponse> {
    return ShopeeFetch.fetch<SetAddressConfigResponse>(
      this.config,
      "/logistics/set_address_config",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * [Only for ID mart seller] This API allows sellers to set up their packaging fee info. Through this API, sellers can enable or disable packaging fees, and if enabled, specify the dimensions of the packaging and the associated fee. This ensures that sellers can configure their shipping costs accurately based on their packaging requirements.
   *
   * @param {SetMartPackagingInfoRequest} params Request parameters
   * @returns {Promise<SetMartPackagingInfoResponse>} Promise resolving to the response
   */
  public async setMartPackagingInfo(
    params?: SetMartPackagingInfoRequest
  ): Promise<SetMartPackagingInfoResponse> {
    return ShopeeFetch.fetch<SetMartPackagingInfoResponse>(
      this.config,
      "/logistics/set_mart_packaging_info",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to set the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Note: The pause may take a few moments to take effect. Please check for any additional orders that may still be placed during this window.
   *
   * @param {SetPauseStatusRequest} params Request parameters
   * @returns {Promise<SetPauseStatusResponse>} Promise resolving to the response
   */
  public async setPauseStatus(params?: SetPauseStatusRequest): Promise<SetPauseStatusResponse> {
    return ShopeeFetch.fetch<SetPauseStatusResponse>(this.config, "/logistics/set_pause_status", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["response.pause_end_time"],
    });
  }
  /**
   * Use this api to initiate logistics including arrange pickup, dropoff. Should call v2.logistics.get_booking_shipping_parameter to fetch all required param first.
   *
   * @param {ShipBookingRequest} params Request parameters
   * @returns {Promise<ShipBookingResponse>} Promise resolving to the response
   */
  public async shipBooking(params?: ShipBookingRequest): Promise<ShipBookingResponse> {
    return ShopeeFetch.fetch<ShipBookingResponse>(this.config, "/logistics/ship_booking", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed.
   *
   * @param {ShipOrderRequest} params Request parameters
   * @returns {Promise<ShipOrderResponse>} Promise resolving to the response
   */
  public async shipOrder(params?: ShipOrderRequest): Promise<ShipOrderResponse> {
    return ShopeeFetch.fetch<ShipOrderResponse>(this.config, "/logistics/ship_order", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this API to update the address of a shop.
   *
   * @param {UpdateAddressRequest} params Request parameters
   * @returns {Promise<UpdateAddressResponse>} Promise resolving to the response
   */
  public async updateAddress(params?: UpdateAddressRequest): Promise<UpdateAddressResponse> {
    return ShopeeFetch.fetch<UpdateAddressResponse>(this.config, "/logistics/update_address", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this api to update shop level logistics channel's configuration.
   *
   * @param {UpdateChannelRequest} params Request parameters
   * @returns {Promise<UpdateChannelResponse>} Promise resolving to the response
   */
  public async updateChannel(params?: UpdateChannelRequest): Promise<UpdateChannelResponse> {
    return ShopeeFetch.fetch<UpdateChannelResponse>(this.config, "/logistics/update_channel", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * This API is designed to allow sellers to update their operating hours. It is essential that the values provided in this API align with the restrictions retrieved from the v2.logistics.get_operating_hour_restrictions API to ensure compliance with platform requirements. This API uses overwriting updates, when updating pickup operating hours, still need to include all parts even those not needing changes.
   *
   * @param {UpdateOperatingHoursRequest} params Request parameters
   * @returns {Promise<UpdateOperatingHoursResponse>} Promise resolving to the response
   */
  public async updateOperatingHours(
    params?: UpdateOperatingHoursRequest
  ): Promise<UpdateOperatingHoursResponse> {
    return ShopeeFetch.fetch<UpdateOperatingHoursResponse>(
      this.config,
      "/logistics/update_operating_hours",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to update the order status for buyer to collect the orders directly from your pharmacy. This includes indicating that order is ready for collection, and that the order has been picked up by the buyer. You should call v2.logistics.get_order_detail or v2.logistics.get_package_detail first to get the package_number of such orders.
   *
   * @param {UpdateSelfCollectionOrderLogisticsRequest} params Request parameters
   * @returns {Promise<UpdateSelfCollectionOrderLogisticsResponse>} Promise resolving to the response
   */
  public async updateSelfCollectionOrderLogistics(
    params?: UpdateSelfCollectionOrderLogisticsRequest
  ): Promise<UpdateSelfCollectionOrderLogisticsResponse> {
    return ShopeeFetch.fetch<UpdateSelfCollectionOrderLogisticsResponse>(
      this.config,
      "/logistics/update_self_collection_order_logistics",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * For pickup method only, use this api to update pickup address and pickup time for packages meet: 1) package's fulfillment status is LOGISTICS_PICKUP_RETRY; or 2) package's fulfillment status is 'LOGISTICS_REQUEST_CREATED' and meets the Instant Order Reschedule Pickup conditions.
   *
   * @param {UpdateShippingOrderRequest} params Request parameters
   * @returns {Promise<UpdateShippingOrderResponse>} Promise resolving to the response
   */
  public async updateShippingOrder(
    params?: UpdateShippingOrderRequest
  ): Promise<UpdateShippingOrderResponse> {
    return ShopeeFetch.fetch<UpdateShippingOrderResponse>(
      this.config,
      "/logistics/update_shipping_order",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Only available for Brazil sellers. This API is only available for orders/parcels which are fulfilled by BR Seller Logistics channel (logistics_channel_id: 90021), Samsung (logistics_channel_id: 90025) and BR Instant Delivery channel (logistics_channel_id: 90026). The logistics_status will become LOGISTICS_REQUEST_CREATED after arrange shipment, and can call this API to update to: LOGISTICS_PICKUP_DONE, LOGISTICS_DELIVERY_DONE, LOGISTICS_DELIVERY_FAILED.
   *
   * @param {UpdateTrackingStatusRequest} params Request parameters
   * @returns {Promise<UpdateTrackingStatusResponse>} Promise resolving to the response
   */
  public async updateTrackingStatus(
    params?: UpdateTrackingStatusRequest
  ): Promise<UpdateTrackingStatusResponse> {
    return ShopeeFetch.fetch<UpdateTrackingStatusResponse>(
      this.config,
      "/logistics/update_tracking_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Only available for Brazil sellers. Use this API to upload KML file for shop level serviceability setting for BR Entrega Turbo channel (Channel ID: 90026). Please note that multiple Outlet Shops under the same Mart Shop cannot have overlapping service areas.
   *
   * @param {UploadServiceablePolygonRequest} params Request parameters
   * @returns {Promise<UploadServiceablePolygonResponse>} Promise resolving to the response
   */
  public async uploadServiceablePolygon(
    params?: UploadServiceablePolygonRequest
  ): Promise<UploadServiceablePolygonResponse> {
    return ShopeeFetch.fetch<UploadServiceablePolygonResponse>(
      this.config,
      "/logistics/upload_serviceable_polygon",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
