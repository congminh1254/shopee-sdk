// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field ShippingDocumentType
 */
export enum ShippingDocumentType {
  NORMAL_AIR_WAYBILL = "NORMAL_AIR_WAYBILL",
  THERMAL_AIR_WAYBILL = "THERMAL_AIR_WAYBILL",
  NORMAL_JOB_AIR_WAYBILL = "NORMAL_JOB_AIR_WAYBILL",
  THERMAL_JOB_AIR_WAYBILL = "THERMAL_JOB_AIR_WAYBILL",
  THERMAL_UNPACKAGED_LABEL = "THERMAL_UNPACKAGED_LABEL",
}
/**
 * Enum generated for field AddressType
 */
export enum AddressType {
  DEFAULT_ADDRESS = "DEFAULT_ADDRESS",
  PICKUP_ADDRESS = "PICKUP_ADDRESS",
  RETURN_ADDRESS = "RETURN_ADDRESS",
  INBOUND_PICKUP_ADDRESS = "INBOUND_PICKUP_ADDRESS",
}
/**
 * Enum generated for field Status
 */
export enum Status {
  READY = "READY",
  FAILED = "FAILED",
  PROCESSING = "PROCESSING",
}
/**
 * Enum generated for field ResponseOptionalFields
 */
export enum ResponseOptionalFields {
  PLP_NUMBER = "plp_number",
  FIRST_MILE_TRACKING_NUMBER = "first_mile_tracking_number",
  LAST_MILE_TRACKING_NUMBER = "last_mile_tracking_number",
}
/**
 * Enum generated for field JobStatus
 */
export enum JobStatus {
  PROCESSING = "PROCESSING",
  READY = "READY",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
}
/**
 * BatchShipOrderOrder sub-interface for BatchShipOrderRequest
 */
export interface BatchShipOrderOrder {
  /**
   * Shopee's unique identifier for an order. Limit 150.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
}
/**
 * BatchShipOrderPickup sub-interface for BatchShipOrderRequest
 */
export interface BatchShipOrderPickup {
  /**
   * The identity of address. Retrieved from shopee.logistics.GetAddress.
   */
  address_id?: number;
  /**
   * The pickup time id. Retrieved from shopee.logistics.GetTimeSlot.
   */
  pickup_time_id?: string;
  /**
   * Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * BatchShipOrderDropoff sub-interface for BatchShipOrderRequest
 */
export interface BatchShipOrderDropoff {
  /**
   * The identity of branch. Retrieved from shopee.logistics.GetBranch branch.
   */
  branch_id?: number;
  /**
   * The real name of sender.
   */
  sender_real_name?: string;
  /**
   * Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * BatchShipOrderNonIntegrated sub-interface for BatchShipOrderRequest
 */
export interface BatchShipOrderNonIntegrated {
  /**
   * Optional parameter for non-integrated channel order. The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * Request parameters for batch_ship_order
 *
 * Use this api to batch initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller.Only channel 90003 - Padrão in Brazil has the permission of this API.
 */
export interface BatchShipOrderRequest {
  /**
   * The list of order.
   */
  order_list: BatchShipOrderOrder[];
  /**
   * Required parameter ONLY if GetParameterForInit returns "pickup" or if GetLogisticsInfo returns "pickup" under "info_needed" for the same order. Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup?: BatchShipOrderPickup;
  /**
   * Required parameter ONLY if GetParameterForInit returns "dropoff" or if GetLogisticsInfo returns "dropoff" under "info_needed" for the same order. Developer should still include "dropoff" field in the call even if "dropoff" has empty value. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  dropoff?: BatchShipOrderDropoff;
  /**
   * Optional parameter when GetParameterForInit returns "non-integrated" or GetLogisticsInfo returns "non-integrated" under "info_needed".
   */
  non_integrated?: BatchShipOrderNonIntegrated;
}
/**
 * BatchShipOrderWarning sub-interface for BatchShipOrderResponse
 */
export interface BatchShipOrderWarning {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
}
/**
 * BatchShipOrderResult sub-interface for BatchShipOrderResponseData
 */
export interface BatchShipOrderResult {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * BatchShipOrderResponseData sub-interface for BatchShipOrderResponse
 */
export interface BatchShipOrderResponseData {
  result_list?: BatchShipOrderResult[];
}
/**
 * Response payload for batch_ship_order
 *
 * Use this api to batch initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller.Only channel 90003 - Padrão in Brazil has the permission of this API.
 */
export type BatchShipOrderResponse = FetchResponse<BatchShipOrderResponseData>;
/**
 * BatchUpdateTpfWarehouseTrackingStatusPackage sub-interface for BatchUpdateTpfWarehouseTrackingStatusRequest
 */
export interface BatchUpdateTpfWarehouseTrackingStatusPackage {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * This is to indicate timestamp of the 3PF tracking status.Timestamp should be within order create time and order pick up by 3PL time.
   */
  update_time: number;
}
/**
 * Request parameters for batch_update_tpf_warehouse_tracking_status
 *
 * For CB orders that fulfilled by 3PF, support 3PF Warehouse Vendors to update the tpf_tracking_status when 3PF warehouse receive the order and complete the outbound of the package.
 * CB orders that fulfilled by 3PF：
 * v2.shop.get_shop_info  - shop_fulfillment_flag in {Pure - 3PF Shop,PFF - 3PF Shop,LFF Hybrid Shop}
 * And
 * v2.order.get_order_detail -  fulfillment_flag = fulfilled_by_local_seller
 */
export interface BatchUpdateTpfWarehouseTrackingStatusRequest {
  /**
   * The name of 3PF Warehouse Vendor. Prohibit pure numbers and excessive abbreviations. Standardize naming for easy business recognition. Input priority: warehouse English name > full pinyin of warehouse brand name > warehouse Chinese name > other officially recognized and prominent names.
   */
  tpf_name: string;
  /**
   * The 3PF tracking status for the timestamp. All statuses are in lower case. List of status: - 3pf_warehouse_order_created- 3pf_warehouse_outbound_done
   */
  tpf_tracking_status: string;
  package_list: BatchUpdateTpfWarehouseTrackingStatusPackage[];
}
/**
 * BatchUpdateTpfWarehouseTrackingStatusSuccess sub-interface for BatchUpdateTpfWarehouseTrackingStatusResponseData
 */
export interface BatchUpdateTpfWarehouseTrackingStatusSuccess {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * BatchUpdateTpfWarehouseTrackingStatusFail sub-interface for BatchUpdateTpfWarehouseTrackingStatusResponseData
 */
export interface BatchUpdateTpfWarehouseTrackingStatusFail {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Reason for failure.
   */
  fail_error?: string;
  /**
   * Reason for failure.
   */
  fail_message?: string;
}
/**
 * BatchUpdateTpfWarehouseTrackingStatusResponseData sub-interface for BatchUpdateTpfWarehouseTrackingStatusResponse
 */
export interface BatchUpdateTpfWarehouseTrackingStatusResponseData {
  /**
   * Update success order list.
   */
  success_list?: BatchUpdateTpfWarehouseTrackingStatusSuccess[];
  /**
   * Update fail order list.
   */
  fail_list?: BatchUpdateTpfWarehouseTrackingStatusFail[];
}
/**
 * Response payload for batch_update_tpf_warehouse_tracking_status
 *
 * For CB orders that fulfilled by 3PF, support 3PF Warehouse Vendors to update the tpf_tracking_status when 3PF warehouse receive the order and complete the outbound of the package.
 * CB orders that fulfilled by 3PF：
 * v2.shop.get_shop_info  - shop_fulfillment_flag in {Pure - 3PF Shop,PFF - 3PF Shop,LFF Hybrid Shop}
 * And
 * v2.order.get_order_detail -  fulfillment_flag = fulfilled_by_local_seller
 */
export type BatchUpdateTpfWarehouseTrackingStatusResponse =
  FetchResponse<BatchUpdateTpfWarehouseTrackingStatusResponseData>;
/**
 * Request parameters for check_polygon_update_status
 *
 * Only available for Brazil sellers. Use this API to check the status of polygon file uploaded for BR Entrega Turbo channel (Channel ID: 90026) by querying the task_id returned via the v2.logistics.upload_serviceable_polygon.
 */
export interface CheckPolygonUpdateStatusRequest {
  /**
   * ID that needs to be checked. Please pass the task_id returned via the v2.logistics.upload_serviceable_polygon.
   */
  task_id: string;
}
/**
 * CheckPolygonUpdateStatusResponseData sub-interface for CheckPolygonUpdateStatusResponse
 */
export interface CheckPolygonUpdateStatusResponseData {
  /**
   * Serviceable polygon file upload status. Applicable values: 0: Task completed1: Task in progress2: KML file related errors
   */
  status?: number;
  /**
   * Details of the upload status, e.g "task in progress".
   */
  message?: string;
}
/**
 * Response payload for check_polygon_update_status
 *
 * Only available for Brazil sellers. Use this API to check the status of polygon file uploaded for BR Entrega Turbo channel (Channel ID: 90026) by querying the task_id returned via the v2.logistics.upload_serviceable_polygon.
 */
export type CheckPolygonUpdateStatusResponse = FetchResponse<CheckPolygonUpdateStatusResponseData>;
/**
 * CreateBookingShippingDocumentBooking sub-interface for CreateBookingShippingDocumentRequest
 */
export interface CreateBookingShippingDocumentBooking {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
  /**
   * The tracking number of booking. Required except for the channel allow print before arrange shipment.
   */
  tracking_number?: string;
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL,THERMAL_AIR_WAYBILL,NORMAL_JOB_AIR_WAYBILL,THERMAL_JOB_AIR_WAYBILL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
}
/**
 * Request parameters for create_booking_shipping_document
 *
 * Use this api to create shipping document task for each booking and this API is only available after retrieving the tracking number.
 */
export interface CreateBookingShippingDocumentRequest {
  /**
   * The list of bookings you want to get. limit [1,50]
   */
  booking_list: CreateBookingShippingDocumentBooking[];
}
/**
 * CreateBookingShippingDocumentWarning sub-interface for CreateBookingShippingDocumentResponse
 */
export interface CreateBookingShippingDocumentWarning {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
}
/**
 * CreateBookingShippingDocumentResult sub-interface for CreateBookingShippingDocumentResponseData
 */
export interface CreateBookingShippingDocumentResult {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * CreateBookingShippingDocumentResponseData sub-interface for CreateBookingShippingDocumentResponse
 */
export interface CreateBookingShippingDocumentResponseData {
  /**
   * The list of the result data.
   */
  result_list?: CreateBookingShippingDocumentResult[];
}
/**
 * Response payload for create_booking_shipping_document
 *
 * Use this api to create shipping document task for each booking and this API is only available after retrieving the tracking number.
 */
export type CreateBookingShippingDocumentResponse =
  FetchResponse<CreateBookingShippingDocumentResponseData>;
/**
 * CreateShippingDocumentOrder sub-interface for CreateShippingDocumentRequest
 */
export interface CreateShippingDocumentOrder {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is not a package number.
   */
  package_number?: string;
  /**
   * The tracking number of order. Required except for the channel allow print before arrange shipment.
   */
  tracking_number?: string;
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL, THERMAL_AIR_WAYBILL, NORMAL_JOB_AIR_WAYBILL, THERMAL_JOB_AIR_WAYBILL, THERMAL_UNPACKAGED_LABEL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
}
/**
 * Request parameters for create_shipping_document
 *
 * Use this api to create shipping document task for each order or package and this API is only available after retrieving the tracking number.
 */
export interface CreateShippingDocumentRequest {
  /**
   * The list of order you want to create shipping document. limit [1, 50]
   */
  order_list: CreateShippingDocumentOrder[];
}
/**
 * CreateShippingDocumentWarning sub-interface for CreateShippingDocumentResponse
 */
export interface CreateShippingDocumentWarning {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * CreateShippingDocumentResult sub-interface for CreateShippingDocumentResponseData
 */
export interface CreateShippingDocumentResult {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * CreateShippingDocumentResponseData sub-interface for CreateShippingDocumentResponse
 */
export interface CreateShippingDocumentResponseData {
  /**
   * The list of the result data.
   */
  result_list?: CreateShippingDocumentResult[];
}
/**
 * Response payload for create_shipping_document
 *
 * Use this api to create shipping document task for each order or package and this API is only available after retrieving the tracking number.
 */
export type CreateShippingDocumentResponse = FetchResponse<CreateShippingDocumentResponseData>;
/**
 * CreateShippingDocumentJobUnpackagedSkuRequest sub-interface for CreateShippingDocumentJobRequest
 */
export interface CreateShippingDocumentJobUnpackagedSkuRequest {
  /**
   * Unpackaged SKU ID of the model.
   */
  unpackaged_sku_id?: string;
  /**
   * Number of copies for the generated labels (maximum 600 total across all requested SKUs).
   */
  quantity?: number;
}
/**
 * Request parameters for create_shipping_document_job
 *
 * This API creates a shipping document job for selected documents. The system receives requests and returns a job ID along with success and failure details.
 */
export interface CreateShippingDocumentJobRequest {
  /**
   * The type of shipping document. Available values: THERMAL_UNPACKAGED_LABEL
   */
  shipping_document_type: string;
  /**
   * List of Unpackaged SKUs to generate labels for.Note: The unpackaged_sku_requests and package_list cannot be populated at the same time, please select one.
   */
  unpackaged_sku_requests?: CreateShippingDocumentJobUnpackagedSkuRequest[];
  /**
   * List of Package Numbers to generate labels for. (maximum 600 total)Note: The unpackaged_sku_requests and package_list cannot be populated at the same time, please select one.
   */
  package_list?: string[];
}
/**
 * CreateShippingDocumentJobFail sub-interface for CreateShippingDocumentJobResponseData
 */
export interface CreateShippingDocumentJobFail {
  /**
   * Package Number or Unpackaged SKU ID that failed in generating Shipping Document
   */
  id?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * CreateShippingDocumentJobResponseData sub-interface for CreateShippingDocumentJobResponse
 */
export interface CreateShippingDocumentJobResponseData {
  /**
   * Generated Job ID which will be used for status tracking and download the Shipping Document
   */
  job_id?: string;
  /**
   * List of Package Number or Unpackaged SKU ID that succeeds in generating Shipping Document
   */
  success_id_list?: string[];
  /**
   * List of Package Numbers or Unpackaged SKUs that failed in generating Shipping Document
   */
  fail_list?: CreateShippingDocumentJobFail[];
}
/**
 * Response payload for create_shipping_document_job
 *
 * This API creates a shipping document job for selected documents. The system receives requests and returns a job ID along with success and failure details.
 */
export type CreateShippingDocumentJobResponse =
  FetchResponse<CreateShippingDocumentJobResponseData>;
/**
 * Request parameters for delete_address
 *
 * Use this api to delete address.
 */
export interface DeleteAddressRequest {
  /**
   * The identity of address you want to delete.
   */
  address_id: number;
}
/**
 * Response data payload for delete_address
 */
export type DeleteAddressResponseData = Record<string, never>;
/**
 * Response payload for delete_address
 *
 * Use this api to delete address.
 */
export type DeleteAddressResponse = FetchResponse<DeleteAddressResponseData>;
/**
 * Request parameters for delete_special_operating_hour
 *
 * This API is used to delete a specific special operating hour for a seller. This API allows sellers to manage their operating hours by removing any special operating hours that are no longer needed. To use this API, the name of the special operating hour to be deleted should be obtained from the v2.logistics.get_operating_hours API.
 */
export interface DeleteSpecialOperatingHourRequest {
  /**
   * Name of the special operating hour which can be retrieved from v2.logistics.get_operating_hours
   */
  name: string;
}
/**
 * Response data payload for delete_special_operating_hour
 */
export type DeleteSpecialOperatingHourResponseData = Record<string, never>;
/**
 * Response payload for delete_special_operating_hour
 *
 * This API is used to delete a specific special operating hour for a seller. This API allows sellers to manage their operating hours by removing any special operating hours that are no longer needed. To use this API, the name of the special operating hour to be deleted should be obtained from the v2.logistics.get_operating_hours API.
 */
export type DeleteSpecialOperatingHourResponse =
  FetchResponse<DeleteSpecialOperatingHourResponseData>;
/**
 * DownloadBookingShippingDocumentBooking sub-interface for DownloadBookingShippingDocumentRequest
 */
export interface DownloadBookingShippingDocumentBooking {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
}
/**
 * Request parameters for download_booking_shipping_document
 *
 * Use this api to download shipping_document. You have to call v2.logistics.create_booking_shipping_document to create a new shipping document task first and call v2.logistics.get_booking_shipping_document_result to get the task status second. If the task is READY, you can download this shipping document.
 */
export interface DownloadBookingShippingDocumentRequest {
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL,THERMAL_AIR_WAYBILL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
  /**
   * The list of bookings you want to get. limit [1,50]
   */
  booking_list: DownloadBookingShippingDocumentBooking[];
}
/**
 * Response data payload for download_booking_shipping_document
 */
export interface DownloadBookingShippingDocumentResponseData {
  /**
   * The waybill file.
   */
  waybill?: any;
}
/**
 * Response payload for download_booking_shipping_document
 *
 * Use this api to download shipping_document. You have to call v2.logistics.create_booking_shipping_document to create a new shipping document task first and call v2.logistics.get_booking_shipping_document_result to get the task status second. If the task is READY, you can download this shipping document.
 */
export type DownloadBookingShippingDocumentResponse =
  FetchResponse<DownloadBookingShippingDocumentResponseData>;
/**
 * DownloadShippingDocumentOrder sub-interface for DownloadShippingDocumentRequest
 */
export interface DownloadShippingDocumentOrder {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
}
/**
 * Request parameters for download_shipping_document
 *
 * Use this api to download shipping_document. You have to call v2.logistics.create_shipping_document to create a new shipping document task first and call v2.logistics.get_shipping_document_resut to get the task status second. If the task is READY, you can download this shipping document.
 */
export interface DownloadShippingDocumentRequest {
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL, THERMAL_AIR_WAYBILL, NORMAL_JOB_AIR_WAYBILL, THERMAL_JOB_AIR_WAYBILL, THERMAL_UNPACKAGED_LABEL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
  /**
   * The list of orders you need to download it's shipping document.
   */
  order_list: DownloadShippingDocumentOrder[];
}
/**
 * Response data payload for download_shipping_document
 */
export interface DownloadShippingDocumentResponseData {
  /**
   * The waybill file.
   */
  waybill?: any;
}
/**
 * Response payload for download_shipping_document
 *
 * Use this api to download shipping_document. You have to call v2.logistics.create_shipping_document to create a new shipping document task first and call v2.logistics.get_shipping_document_resut to get the task status second. If the task is READY, you can download this shipping document.
 */
export type DownloadShippingDocumentResponse = FetchResponse<DownloadShippingDocumentResponseData>;
/**
 * Request parameters for download_shipping_document_job
 *
 * This API allows users to download the shipping document associated with a specific job ID. It checks the job status before proceeding with the download.
 */
export interface DownloadShippingDocumentJobRequest {
  /**
   * Generated Job ID for status tracking and download the Shipping Document
   */
  job_id: string;
}
/**
 * Response data payload for download_shipping_document_job
 */
export interface DownloadShippingDocumentJobResponseData {
  file?: any;
}
/**
 * Response payload for download_shipping_document_job
 *
 * This API allows users to download the shipping document associated with a specific job ID. It checks the job status before proceeding with the download.
 */
export type DownloadShippingDocumentJobResponse =
  FetchResponse<DownloadShippingDocumentJobResponseData>;
/**
 * Request parameters for download_to_label
 *
 * Use the API to download the TO label that should be attached to the carton before drop-off at the warehouse (Only for TW channel_id:30029).
 */
export interface DownloadToLabelRequest {
  /**
   * Sorting Group of the TO. Available value:1:North2:South
   */
  sorting_group: number;
  /**
   * Specifies the TO quantity, up to a maximum of 20 per request. If not specified, the default value is 1
   */
  quantity?: number;
}
/**
 * Response data payload for download_to_label
 */
export interface DownloadToLabelResponseData {
  /**
   * The waybill file.
   */
  waybill?: any;
}
/**
 * Response payload for download_to_label
 *
 * Use the API to download the TO label that should be attached to the carton before drop-off at the warehouse (Only for TW channel_id:30029).
 */
export type DownloadToLabelResponse = FetchResponse<DownloadToLabelResponseData>;
/**
 * Request parameters for get_address_list
 *
 * For integrated logistics channel, use this call to get pickup address for pickup mode order.
 */
export type GetAddressListRequest = Record<string, never>;
/**
 * GetAddressListAddress sub-interface for GetAddressListResponseData
 */
export interface GetAddressListAddress {
  /**
   * The identity of address.
   */
  address_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
  /**
   * The flag of shop address.Available values: DEFAULT_ADDRESS, PICK_UP_ADDRESS, RETURN_ADDRESS, INBOUND_PICKUP_ADDRESS.
   */
  address_type?: AddressType | string | number;
}
/**
 * GetAddressListResponseData sub-interface for GetAddressListResponse
 */
export interface GetAddressListResponseData {
  /**
   * Show pickup address or not.
   */
  show_pickup_address?: boolean;
  /**
   * The address list of you shop
   */
  address_list?: GetAddressListAddress[];
}
/**
 * Response payload for get_address_list
 *
 * For integrated logistics channel, use this call to get pickup address for pickup mode order.
 */
export type GetAddressListResponse = FetchResponse<GetAddressListResponseData>;
/**
 * GetBookingShippingDocumentDataInfoStyle sub-interface for GetBookingShippingDocumentDataInfoRecipientAddressInfo
 */
export interface GetBookingShippingDocumentDataInfoStyle {
  /**
   * supports bold and italic
   */
  text_style?: string[];
  /**
   * supports 1 - 108
   */
  font_size?: number;
  /**
   * color string like "#AbCd12"
   */
  text_color?: string;
  /**
   * supports 0.1-30, in centimeters
   */
  image_width?: number;
  /**
   * text horizontal align, supports left, center and right.
   */
  h_align?: string;
}
/**
 * GetBookingShippingDocumentDataInfoRecipientAddressInfo sub-interface for GetBookingShippingDocumentDataInfoRequest
 */
export interface GetBookingShippingDocumentDataInfoRecipientAddressInfo {
  /**
   * fields to query in the recipient address, should be name, phone, full_address, town, district, city, state, region, zipcode.
   */
  key: string;
  /**
   * image style
   */
  style?: GetBookingShippingDocumentDataInfoStyle;
}
/**
 * Request parameters for get_booking_shipping_document_data_info
 *
 * Use this api to fetch the logistics information of a booking these info can be used for airwaybill printing. Dedicated for crossborder SLS order airwaybill. May not be applicable for local channel airwaybill. Besides, this api supports returning personal info as images.
 */
export interface GetBookingShippingDocumentDataInfoRequest {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
  /**
   * recipient address to query as image
   */
  recipient_address_info?: GetBookingShippingDocumentDataInfoRecipientAddressInfo[];
}
/**
 * GetBookingShippingDocumentDataInfo_GetBookingShippingDocumentDataInfoRecipientAddressInfo sub-interface for GetBookingShippingDocumentDataInfoResponseData
 */
export interface GetBookingShippingDocumentDataInfo_GetBookingShippingDocumentDataInfoRecipientAddressInfo {
  /**
   * queried field in recipient address
   */
  key?: string;
  /**
   * base64 encoded png data string
   */
  image?: string;
}
/**
 * GetBookingShippingDocumentDataInfoRecipientSortCode sub-interface for GetBookingShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetBookingShippingDocumentDataInfoRecipientSortCode {
  /**
   * The first-level sort_code of recipient.
   */
  first_recipient_sort_code?: string;
  /**
   * The second-level sort_code of recipient.
   */
  second_recipient_sort_code?: string;
  /**
   * The third-level sort_code of recipient.
   */
  third_recipient_sort_code?: string;
}
/**
 * GetBookingShippingDocumentDataInfoSenderSortCode sub-interface for GetBookingShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetBookingShippingDocumentDataInfoSenderSortCode {
  /**
   * The first-level sort_code of sender.
   */
  first_sender_sort_code?: string;
  /**
   * The second-level sort_code of sender.
   */
  second_sender_sort_code?: string;
  /**
   * The third-level sort_code of sender.
   */
  third_sender_sort_code?: string;
}
/**
 * GetBookingShippingDocumentDataInfoReturnSortCode sub-interface for GetBookingShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetBookingShippingDocumentDataInfoReturnSortCode {
  /**
   * The first-level sort code for 3PL doing RTS.
   */
  return_first_sort_code?: string;
}
/**
 * GetBookingShippingDocumentDataInfoSpxReceiveStation sub-interface for GetBookingShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetBookingShippingDocumentDataInfoSpxReceiveStation {
  /**
   * The first pickup station.
   */
  spx_first_receive_station?: string;
}
/**
 * GetBookingShippingDocumentDataInfoShippingDocumentInfo sub-interface for GetBookingShippingDocumentDataInfoResponseData
 */
export interface GetBookingShippingDocumentDataInfoShippingDocumentInfo {
  /**
   * Use this field to indicate booking weight when calculate the shipping fee. The unit of weigh is gram.
   */
  booking_weight?: number;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The logistics service provider for the booking.
   */
  shipping_carrier?: string;
  /**
   * The sort_code of recipient.
   */
  recipient_sort_code?: GetBookingShippingDocumentDataInfoRecipientSortCode;
  /**
   * The sort_code of sender.
   */
  sender_sort_code?: GetBookingShippingDocumentDataInfoSenderSortCode;
  /**
   * The sort code for 3PL doing RTS.
   */
  return_sort_code?: GetBookingShippingDocumentDataInfoReturnSortCode;
  /**
   * The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
  /**
   * The name of pickup hub.
   */
  pickup_hub?: string;
  /**
   * The name of delivery hub.
   */
  delivery_hub?: string;
  /**
   * Zone name.
   */
  deliver_area?: string;
  /**
   * The name of ec booing.
   */
  ec_booking_no?: string;
  /**
   * The date of create shipment booking.
   */
  create_date_ymd_sl?: string;
  /**
   * The name of manufacturer.
   */
  manufacturers_name?: string;
  /**
   * The website of manufacturer.
   */
  manufacturers_website?: string;
  /**
   * Use this field to indicate order contains dangerous goods or not.0: Non-dangerous good1: Dangerous good2: Prohibited
   */
  is_lm_dg_bool?: number;
  /**
   * The sub-district of recipient's address.
   */
  spx_sub_district?: string;
  /**
   * The spx receive station.
   */
  spx_receive_station?: GetBookingShippingDocumentDataInfoSpxReceiveStation;
  /**
   * The zone of this booking.
   */
  zone?: string;
  /**
   * Delivery Sub Zone.
   */
  zone_code?: string;
  /**
   * Distribution Center Code.
   */
  destination_base_code?: string;
  /**
   * Currently only applicable for Brazil, Indonesia, Vietnam, Philippines.For orders with Dangerous Goods, this value indicates the severity of the danger and requires special handling by the logistics provider. 0 = Not classified / no DG sub-type1 = DG_A2 = DG_B3 = DG_C4 = DG_D
   */
  dg_specific_type?: number;
}
/**
 * GetBookingShippingDocumentDataInfoResponseData sub-interface for GetBookingShippingDocumentDataInfoResponse
 */
export interface GetBookingShippingDocumentDataInfoResponseData {
  recipient_address_info?: GetBookingShippingDocumentDataInfo_GetBookingShippingDocumentDataInfoRecipientAddressInfo;
  shipping_document_info?: GetBookingShippingDocumentDataInfoShippingDocumentInfo;
}
/**
 * Response payload for get_booking_shipping_document_data_info
 *
 * Use this api to fetch the logistics information of a booking these info can be used for airwaybill printing. Dedicated for crossborder SLS order airwaybill. May not be applicable for local channel airwaybill. Besides, this api supports returning personal info as images.
 */
export type GetBookingShippingDocumentDataInfoResponse =
  FetchResponse<GetBookingShippingDocumentDataInfoResponseData>;
/**
 * GetBookingShippingDocumentParameterBooking sub-interface for GetBookingShippingDocumentParameterRequest
 */
export interface GetBookingShippingDocumentParameterBooking {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
}
/**
 * Request parameters for get_booking_shipping_document_parameter
 *
 * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
 */
export interface GetBookingShippingDocumentParameterRequest {
  /**
   * The list of bookings you want to get. limit [1,50]
   */
  booking_list: GetBookingShippingDocumentParameterBooking[];
}
/**
 * GetBookingShippingDocumentParameterWarning sub-interface for GetBookingShippingDocumentParameterResponse
 */
export interface GetBookingShippingDocumentParameterWarning {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
}
/**
 * GetBookingShippingDocumentParameterResult sub-interface for GetBookingShippingDocumentParameterResponseData
 */
export interface GetBookingShippingDocumentParameterResult {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * The shipping document type Shopee suggests. If you don't select any shipping document type, Shopee will use this as default shipping document type.
   */
  suggest_shipping_document_type?: string;
  /**
   * The shipping document type you can select of this booking.
   */
  selectable_shipping_document_type?: string[];
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * GetBookingShippingDocumentParameterResponseData sub-interface for GetBookingShippingDocumentParameterResponse
 */
export interface GetBookingShippingDocumentParameterResponseData {
  /**
   * The list of the result data.
   */
  result_list?: GetBookingShippingDocumentParameterResult[];
}
/**
 * Response payload for get_booking_shipping_document_parameter
 *
 * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
 */
export type GetBookingShippingDocumentParameterResponse =
  FetchResponse<GetBookingShippingDocumentParameterResponseData>;
/**
 * GetBookingShippingDocumentResultBooking sub-interface for GetBookingShippingDocumentResultRequest
 */
export interface GetBookingShippingDocumentResultBooking {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL,THERMAL_AIR_WAYBILL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
}
/**
 * Request parameters for get_booking_shipping_document_result
 *
 * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
 */
export interface GetBookingShippingDocumentResultRequest {
  /**
   * The list of bookings you want to get. limit [1,50]
   */
  booking_list: GetBookingShippingDocumentResultBooking[];
}
/**
 * GetBookingShippingDocumentResultWarning sub-interface for GetBookingShippingDocumentResultResponse
 */
export interface GetBookingShippingDocumentResultWarning {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
}
/**
 * GetBookingShippingDocumentResultResult sub-interface for GetBookingShippingDocumentResultResponseData
 */
export interface GetBookingShippingDocumentResultResult {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * The status of the shipping document task you querying with booking_sn. Available values: READY/FAILED/PROCESSING
   */
  status?: Status | string | number;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * GetBookingShippingDocumentResultResponseData sub-interface for GetBookingShippingDocumentResultResponse
 */
export interface GetBookingShippingDocumentResultResponseData {
  /**
   * The list of the result data.
   */
  result_list?: GetBookingShippingDocumentResultResult[];
}
/**
 * Response payload for get_booking_shipping_document_result
 *
 * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
 */
export type GetBookingShippingDocumentResultResponse =
  FetchResponse<GetBookingShippingDocumentResultResponseData>;
/**
 * Request parameters for get_booking_shipping_parameter
 *
 * Use this api to get the parameter "info_needed" from the response to check if the booking has pickup or dropoff. This api will also return the addresses and pickup time id options for the pickup method. For dropoff, it can return branch id, sender real name etc, depending on the 3PL requirements.
 */
export interface GetBookingShippingParameterRequest {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
}
/**
 * GetBookingShippingParameterInfoNeeded sub-interface for GetBookingShippingParameterResponseData
 */
export interface GetBookingShippingParameterInfoNeeded {
  /**
   * Could contain 'branch_id', 'sender_real_name' or 'tracking_no'. If it contains 'branch_id', choose one to Init. If it contains 'sender_real_name' or 'tracking_no', should manually input these values in Init API. If it has empty value, developer should still include "dropoff" field in Init API.
   */
  dropoff?: string[];
  /**
   * Could contain 'address_id' and 'pickup_time_id'. Choose one address_id and its corresponding pickup_time_id to Init. If it has empty value, developer should still include "pickup" field in Init API.It could contains "tracking_number" returned from "info_need"for some channels, please also add it when init.
   */
  pickup?: string[];
}
/**
 * GetBookingShippingParameterTimeSlot sub-interface for GetBookingShippingParameterAddress
 */
export interface GetBookingShippingParameterTimeSlot {
  /**
   * The date of pickup time. In timestamp.
   */
  date?: Date | number;
  /**
   * The text description of pickup time. Only applicable for certain channels.
   */
  time_text?: string;
  /**
   * The identity of pickuptime.
   */
  pickup_time_id?: string;
  /**
   * This field will have the value “recommended” for the time slot that Shopee suggests sellers choose. While it is advisable for sellers to choose the recommended time slot, they can also choose other time slots that do not have the recommended flag.
   */
  flags?: string[];
  /**
   * return if error getting pickup time, otherwise omitted
   */
  error?: string;
  /**
   * return if error getting pickup time, otherwise omitted
   */
  msg?: string;
}
/**
 * GetBookingShippingParameterAddress sub-interface for GetBookingShippingParameterPickup
 */
export interface GetBookingShippingParameterAddress {
  /**
   * The identity of address.
   */
  address_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The flag of shop address, applicable values: default_address, pickup_address, return_address, current_address(only for multi-warehouse sellers)
   */
  address_flag?: string[];
  /**
   * List of pickup_time information corresponding to the address_id.Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  time_slot_list?: GetBookingShippingParameterTimeSlot[];
}
/**
 * GetBookingShippingParameterPickup sub-interface for GetBookingShippingParameterResponseData
 */
export interface GetBookingShippingParameterPickup {
  /**
   * List of available pickup address info.
   */
  address_list?: GetBookingShippingParameterAddress[];
}
/**
 * GetBookingShippingParameterResponseData sub-interface for GetBookingShippingParameterResponse
 */
export interface GetBookingShippingParameterResponseData {
  /**
   * The parameters required based on each specific booking to Init. Must use the fields included under info_needed to call Init.
   */
  info_needed?: GetBookingShippingParameterInfoNeeded;
  /**
   * Logistics information for pickup mode booking.
   */
  pickup?: GetBookingShippingParameterPickup;
}
/**
 * Response payload for get_booking_shipping_parameter
 *
 * Use this api to get the parameter "info_needed" from the response to check if the booking has pickup or dropoff. This api will also return the addresses and pickup time id options for the pickup method. For dropoff, it can return branch id, sender real name etc, depending on the 3PL requirements.
 */
export type GetBookingShippingParameterResponse =
  FetchResponse<GetBookingShippingParameterResponseData>;
/**
 * Request parameters for get_booking_tracking_info
 *
 * Use this api to get the logistics tracking information of a booking.
 */
export interface GetBookingTrackingInfoRequest {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
}
/**
 * GetBookingTrackingInfoTrackingInfo sub-interface for GetBookingTrackingInfoResponseData
 */
export interface GetBookingTrackingInfoTrackingInfo {
  /**
   * The time when logistics info has been updated.
   */
  update_time?: Date | number;
  /**
   * The description of booking logistics tracking info.logistics_status
   */
  description?: string;
  /**
   * The Shopee logistics status for the booking. TrackingLogisticsStatus:INITIALORDER_INITORDER_SUBMITTEDORDER_CREATEDPICKUP_REQUESTEDPICKUP_PENDINGPICKED_UPDELIVERY_PENDINGDELIVEREDLOSTUPDATEUPDATE_SUBMITTEDUPDATE_CREATEDRETURN_STARTEDRETURN_PENDINGCANCELCANCEL_CREATEDCANCELEDFAILED_ORDER_SUBMITTEDFAILED_ORDER_CREATEDFAILED_PICKUP_REQUESTEDFAILED_PICKED_UPFAILED_DELIVEREDFAILED_UPDATE_SUBMITTEDFAILED_UPDATE_CREATEDFAILED_RETURNEDFAILED_CANCEL_CREATEDFAILED_CANCELEDRETURNEDRETURN_INTIATED
   */
  logistics_status?: string;
}
/**
 * GetBookingTrackingInfoResponseData sub-interface for GetBookingTrackingInfoResponse
 */
export interface GetBookingTrackingInfoResponseData {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * The Shopee logistics status for the booking. Applicable values.LOGISTICS_REQUEST_CREATED:booking arranged shipmentLOGISTICS_PICKUP_DONE:booking handed over to 3PLLOGISTICS_PICKUP_FAILED:booking cancelled by 3PL due to failed pickup or picked up but not able to proceed with deliveryLOGISTICS_DELIVERY_DONE:successfully deliveredLOGISTICS_REQUEST_CANCELED:cancelled when booking at LOGISTICS_REQUEST_CREATEDLOGISTICS_READY:booking ready for fulfilmentLOGISTICS_INVALID:cancelled when booking at LOGISTICS_READYLOGISTICS_LOST:booking cancelled due to 3PL lost the parcel
   */
  logistics_status?: string;
  /**
   * The tracking info of the booking.
   */
  tracking_info?: GetBookingTrackingInfoTrackingInfo[];
}
/**
 * Response payload for get_booking_tracking_info
 *
 * Use this api to get the logistics tracking information of a booking.
 */
export type GetBookingTrackingInfoResponse = FetchResponse<GetBookingTrackingInfoResponseData>;
/**
 * Request parameters for get_booking_tracking_number
 *
 * After arranging shipment (v2.logistics.ship_booking) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export interface GetBookingTrackingNumberRequest {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
}
/**
 * Response data payload for get_booking_tracking_number
 */
export interface GetBookingTrackingNumberResponseData {
  /**
   * The tracking number of this booking.
   */
  tracking_number?: string;
}
/**
 * Response payload for get_booking_tracking_number
 *
 * After arranging shipment (v2.logistics.ship_booking) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export type GetBookingTrackingNumberResponse = FetchResponse<GetBookingTrackingNumberResponseData>;
/**
 * Request parameters for get_channel_list
 *
 * Use this api to get all supported logistic channels.
 */
export type GetChannelListRequest = Record<string, never>;
/**
 * GetChannelListSize sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListSize {
  /**
   * The identity of size.
   */
  size_id?: string;
  /**
   * The name of size.
   */
  name?: string;
  /**
   * The pre-defined shipping fee for the specific size.
   */
  default_price?: number;
}
/**
 * GetChannelListWeightLimit sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListWeightLimit {
  /**
   * The max weight for an item on this logistic channel.If the value is 0 or null, that means there is no limit.
   */
  item_max_weight?: number;
  /**
   * The min weight for an item on this logistic channel. If the value is 0 or null, that means there is no limit.
   */
  item_min_weight?: number;
}
/**
 * GetChannelListItemMaxDimension sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListItemMaxDimension {
  /**
   * The max height limit.
   */
  height?: number;
  /**
   * The max width limit.
   */
  width?: number;
  /**
   * The max length limit.
   */
  length?: number;
  /**
   * The unit for the limit.
   */
  unit?: string;
  /**
   * The sum of the item's dimension
   */
  dimension_sum?: number;
}
/**
 * GetChannelListVolumeLimit sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListVolumeLimit {
  /**
   * The max volume for an item on this logistic channel.If the value is 0 or null, that means there is no limit for the item weight.
   */
  item_max_volume?: number;
  /**
   * The min volume for an item on this logistic channel. If the value is 0 or null, that means there is no limit for the item weight.
   */
  item_min_volume?: number;
}
/**
 * GetChannelListLogisticsCapability sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListLogisticsCapability {
  /**
   * Indicate If it's a Seller logistics channel, if it's a Seller logistics channel will return true, otherwise it will return false.
   */
  seller_logistics?: boolean;
}
/**
 * GetChannelListPreparationTimeLimit sub-interface for GetChannelListAutoCallDriverSetting
 */
export interface GetChannelListPreparationTimeLimit {
  /**
   * The minimum allowable preparation time, in minutes.
   */
  min_preparation_time?: number;
  /**
   * The maximum allowable preparation time, in minutes.
   */
  max_preparation_time?: number;
}
/**
 * GetChannelListAutoCallDriverSetting sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListAutoCallDriverSetting {
  /**
   * Indicate whether this channel is eligible for Auto Call Driver.
   */
  auto_call_driver_eligible?: boolean;
  /**
   * Indicate whether Auto Call Driver is currently enabled for this channel
   */
  auto_call_driver_enabled?: boolean;
  /**
   * The current valid preparation time for this channel, in minutes.
   */
  preparation_time?: number;
  /**
   * The preparation time range allowed for this channel.Note: When calling v2.logistics.update_channel to set the Preparation Time for the channel, the time must not exceed this range.
   */
  preparation_time_limit?: GetChannelListPreparationTimeLimit;
}
/**
 * GetChannelListChannelRelationRule sub-interface for GetChannelListLogisticsChannel
 */
export interface GetChannelListChannelRelationRule {
  /**
   * Channels that will be auto-enabled in the same request if this channel is enabled.
   */
  related_enabled_channels?: number[];
  /**
   * Channels that must be disabled before or while disabling this parent channel.
   */
  related_dependent_block_channels?: number[];
}
/**
 * GetChannelListLogisticsChannel sub-interface for GetChannelListResponseData
 */
export interface GetChannelListLogisticsChannel {
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The name of logistic channel.
   */
  logistics_channel_name?: string;
  /**
   * This is to indicate whether this logistic channel supports COD
   */
  cod_enabled?: boolean;
  /**
   * Whether this logistic channel is enabled on shop level.
   */
  enabled?: boolean;
  /**
   * SIZE_SELECTIONSIZE_INPUTFIXED_DEFAULT_PRICECUSTOM_PRICE
   */
  fee_type?: string;
  /**
   * Only for fee_type is SIZE_SELECTION
   */
  size_list?: GetChannelListSize[];
  /**
   * The weight limit for this logistic channel.
   */
  weight_limit?: GetChannelListWeightLimit;
  /**
   * The dimension limit for this logistic channel.
   */
  item_max_dimension?: GetChannelListItemMaxDimension;
  /**
   * The limit of item volume.
   */
  volume_limit?: GetChannelListVolumeLimit;
  /**
   * For checkout channels, this field indicates its corresponding fulfillment channels.
   */
  logistics_description?: string;
  /**
   * Indicates whether the logistic channel is force enabled on Shop Level. If true, sellers cannot close this channel.
   */
  force_enable?: boolean;
  /**
   * Indicate the parent logistic channel ID. If it’s 0, it indicates the channel is a checkout(masked) channel; if it’s not 0, indicate the channel is a fulfillment channel and has a checkout channel(checkout channel’s channel_id equals this mask_channel_id) on top of it. Multiple channels may share the same mask_channel_id.
   */
  mask_channel_id?: number;
  /**
   * Indicate whether the channel is blocked to use seller cover shipping fee function.if the channel does not allow sellers to cover shipping fee, then the block_seller_cover_shipping_fee field will return true, otherwise it will return false.
   */
  block_seller_cover_shipping_fee?: boolean;
  /**
   * Indicate whether this channel support cross border shipping.
   */
  support_cross_border?: boolean;
  /**
   * Indicate If seller has set the Seller logistics configuration if set will return true, otherwise it will return false or null.
   */
  seller_logistic_has_configuration?: boolean;
  /**
   * The capability of one logistic channel.
   */
  logistics_capability?: GetChannelListLogisticsCapability;
  /**
   * Indicate whether this channel support pre-print AWB
   */
  preprint?: boolean;
  /**
   * This parameter specifies the delivery service type of logistics channel. Applicable values: - instant- same_day- null
   */
  service_type_identifier?: string;
  auto_call_driver_setting?: GetChannelListAutoCallDriverSetting;
  /**
   * Indicates whether this channel supports the pause operation (Pausing allows the shop to temporarily prevent buyers from placing orders through this logistics channel).- true: This channel is affected by the pause function.- false: This channel is not affected by the pause function.Note: Please first call v2.logistics.get_pause_status to get the current pause status of logistics channels under the shop. If is_paused = true, then call v2.logistics.get_channel_list and identify the range of channels affected by the pause function through support_pause = true.
   */
  support_pause?: boolean;
  /**
   * Indicates if the channel is compulsory. If the value is true, at least one such channel must be enabled.
   */
  compulsory_channel?: boolean;
  /**
   * Indicate the related rules & channels of this logistic channel.
   */
  channel_relation_rules?: GetChannelListChannelRelationRule[];
}
/**
 * GetChannelListResponseData sub-interface for GetChannelListResponse
 */
export interface GetChannelListResponseData {
  /**
   * The list of logistics channel.
   */
  logistics_channel_list?: GetChannelListLogisticsChannel[];
}
/**
 * Response payload for get_channel_list
 *
 * Use this api to get all supported logistic channels.
 */
export type GetChannelListResponse = FetchResponse<GetChannelListResponseData>;
/**
 * Request parameters for get_mart_packaging_info
 *
 * [Only for ID mart seller] The API allows sellers to retrieve their current packaging fee settings.
 */
export type GetMartPackagingInfoRequest = Record<string, never>;
/**
 * GetMartPackagingInfoDimension sub-interface for GetMartPackagingInfoResponseData
 */
export interface GetMartPackagingInfoDimension {
  /**
   * The length of the packaging in centimetres (cm).
   */
  length?: number;
  /**
   * The width of the packaging in centimetres (cm).
   */
  width?: number;
  /**
   * The height of the packaging in centimetres (cm).
   */
  height?: number;
}
/**
 * GetMartPackagingInfoPackagingFee sub-interface for GetMartPackagingInfoResponseData
 */
export interface GetMartPackagingInfoPackagingFee {
  /**
   * The packaging fee price in the seller's local currency.
   */
  value?: number;
}
/**
 * GetMartPackagingInfoResponseData sub-interface for GetMartPackagingInfoResponse
 */
export interface GetMartPackagingInfoResponseData {
  /**
   * Indicates whether the seller has enabled or disabled the packaging fee configuration.True: The seller charges a packaging fee.False: The seller does not charge a packaging fee.
   */
  enable?: boolean;
  /**
   * Returned only if enabled is set to True.
   */
  dimension?: GetMartPackagingInfoDimension;
  /**
   * Returned only if enabled is set to True.
   */
  packaging_fee?: GetMartPackagingInfoPackagingFee;
}
/**
 * Response payload for get_mart_packaging_info
 *
 * [Only for ID mart seller] The API allows sellers to retrieve their current packaging fee settings.
 */
export type GetMartPackagingInfoResponse = FetchResponse<GetMartPackagingInfoResponseData>;
/**
 * GetMassShippingParameterPackage sub-interface for GetMassShippingParameterRequest
 */
export interface GetMassShippingParameterPackage {
  /**
   * Shopee's unique identifier for the package under an order. You shouldn't fill the field with empty string when there isn't a package number.
   */
  package_number: string;
}
/**
 * Request parameters for get_mass_shipping_parameter
 *
 * Use this api to check if package support pickup, dropoff, non-integrated. For pickup, return address and pickup time id options. For dropoff, return branch id, sender real name, etc. Can batch request for packages under same product_location_id and logistics_channel_id. [Please call it when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule conditions]
 */
export interface GetMassShippingParameterRequest {
  /**
   * The API can only batch request the shipping parameter for multiple packages under the same product_location_id and same logistics_channel_id. Use this field to specify the logistics_channel_id for the request. If not specified, will use the logistics_channel_id corresponds to the first package_number by default.
   */
  logistics_channel_id?: number;
  /**
   * The API can only batch request the shipping parameter for multiple packages under the same product_location_id and same logistics_channel_id. Use this field to specify the product_location_id for the request. If not specified, will use the product_location_id corresponds to the first package_number by default.
   */
  product_location_id?: string;
  /**
   * The list of packages you want to get shipping parameters. limit [1, 50].
   */
  package_list: GetMassShippingParameterPackage[];
}
/**
 * GetMassShippingParameterInfoNeeded sub-interface for GetMassShippingParameterResponseData
 */
export interface GetMassShippingParameterInfoNeeded {
  /**
   * Could contain 'branch_id', 'sender_real_name', or 'tracking_no'. If it contains 'branch_id', choose one to Init. If it contains 'sender_real_name' or 'tracking_no', should manually input these values in Init API. If it has empty value, developer should still include "dropoff" field in Init API.
   */
  dropoff?: string[];
  /**
   * Could contain 'address_id' and 'pickup_time_id'. Choose one address_id and its corresponding pickup_time_id to Init. If it has empty value, developer should still include "pickup" field in Init API. It could contains "tracking_number" returned from "info_need"for some channels, please also add it when init.
   */
  pickup?: string[];
  /**
   * Could contain 'tracking_no'. If it contains 'tracking_no', should manually input these values in Init API. If it has empty value, developer should still include "non-integrated" field in Init API.
   */
  non_integrated?: string[];
}
/**
 * GetMassShippingParameterBranch sub-interface for GetMassShippingParameterDropoff
 */
export interface GetMassShippingParameterBranch {
  /**
   * The identity of logistics branch.
   */
  branch_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
}
/**
 * GetMassShippingParameterDropoff sub-interface for GetMassShippingParameterResponseData
 */
export interface GetMassShippingParameterDropoff {
  /**
   * List of available dropoff branches info.
   */
  branch_list?: GetMassShippingParameterBranch[];
}
/**
 * GetMassShippingParameterTimeSlot sub-interface for GetMassShippingParameterAddress
 */
export interface GetMassShippingParameterTimeSlot {
  /**
   * The date of pickup time. In timestamp.
   */
  date?: Date | number;
  /**
   * The text description of pickup time. Only applicable for certain channels.
   */
  time_text?: string;
  /**
   * The identity of pickuptime.
   */
  pickup_time_id?: string;
  /**
   * This field will have the value “recommended” for the time slot that Shopee suggests sellers choose. While it is advisable for sellers to choose the recommended time slot, they can also choose other time slots that do not have the recommended flag.
   */
  flags?: string[];
}
/**
 * GetMassShippingParameterAddress sub-interface for GetMassShippingParameterPickup
 */
export interface GetMassShippingParameterAddress {
  /**
   * The identity of address.
   */
  address_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The flag of shop address, applicable values: default_address, pickup_address, return_address, current_address (Multi-Warehouse sellers only)
   */
  address_flag?: string[];
  /**
   * List of pickup_time information corresponding to the address_id.Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  time_slot_list?: GetMassShippingParameterTimeSlot[];
}
/**
 * GetMassShippingParameterPickup sub-interface for GetMassShippingParameterResponseData
 */
export interface GetMassShippingParameterPickup {
  /**
   * List of available pickup address info. For Multi-Warehouse sellers, note that changing pickup address from Current may incur higher shipping fees.
   */
  address_list?: GetMassShippingParameterAddress[];
}
/**
 * GetMassShippingParameterSuccess sub-interface for GetMassShippingParameterResponseData
 */
export interface GetMassShippingParameterSuccess {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * GetMassShippingParameterFail sub-interface for GetMassShippingParameterResponseData
 */
export interface GetMassShippingParameterFail {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Reason for failure.
   */
  fail_reason?: string;
}
/**
 * GetMassShippingParameterResponseData sub-interface for GetMassShippingParameterResponse
 */
export interface GetMassShippingParameterResponseData {
  /**
   * The parameters required based on each specific order to Init. Must use the fields included under info_needed to call Init. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  info_needed?: GetMassShippingParameterInfoNeeded;
  /**
   * Logistics information for dropoff mode package.
   */
  dropoff?: GetMassShippingParameterDropoff;
  /**
   * Logistics information for pickup mode package.
   */
  pickup?: GetMassShippingParameterPickup;
  /**
   * Success package list.
   */
  success_list?: GetMassShippingParameterSuccess[];
  /**
   * Fail package list.
   */
  fail_list?: GetMassShippingParameterFail[];
}
/**
 * Response payload for get_mass_shipping_parameter
 *
 * Use this api to check if package support pickup, dropoff, non-integrated. For pickup, return address and pickup time id options. For dropoff, return branch id, sender real name, etc. Can batch request for packages under same product_location_id and logistics_channel_id. [Please call it when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule conditions]
 */
export type GetMassShippingParameterResponse = FetchResponse<GetMassShippingParameterResponseData>;
/**
 * GetMassTrackingNumberPackage sub-interface for GetMassTrackingNumberRequest
 */
export interface GetMassTrackingNumberPackage {
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there isn't a package number.
   */
  package_number: string;
}
/**
 * Request parameters for get_mass_tracking_number
 *
 * After arranging shipment (v2.logistics.mass_ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export interface GetMassTrackingNumberRequest {
  /**
   * The list of packages you want to get tracking number. limit [1, 50].
   */
  package_list: GetMassTrackingNumberPackage[];
  /**
   * Indicate response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them. Available values: plp_number, first_mile_tracking_number,last_mile_tracking_number.
   */
  response_optional_fields?: ResponseOptionalFields | string | number;
}
/**
 * GetMassTrackingNumberSuccess sub-interface for GetMassTrackingNumberResponseData
 */
export interface GetMassTrackingNumberSuccess {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The tracking number of this order.
   */
  tracking_number?: string;
  /**
   * The unique identifier for package of BR correios.
   */
  plp_number?: string;
  /**
   * The first mile tracking number of the order. Only for Cross Border Seller
   */
  first_mile_tracking_number?: string;
  /**
   * The last mile tracking number of the order. Only for Cross Border BR seller.
   */
  last_mile_tracking_number?: string;
  /**
   * Indicate hint information if cannot get some fields under special scenarios. For example, cannot get tracking_number when cvs store is closed.
   */
  hint?: string;
  /**
   * For drivers to quickly identify parcel to be picked up. Only returned for instant+sameday orders.
   */
  pickup_code?: string;
}
/**
 * GetMassTrackingNumberFail sub-interface for GetMassTrackingNumberResponseData
 */
export interface GetMassTrackingNumberFail {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Reason for failure.
   */
  fail_reason?: string;
}
/**
 * GetMassTrackingNumberResponseData sub-interface for GetMassTrackingNumberResponse
 */
export interface GetMassTrackingNumberResponseData {
  /**
   * Success package list.
   */
  success_list?: GetMassTrackingNumberSuccess[];
  /**
   * Fail package list.
   */
  fail_list?: GetMassTrackingNumberFail[];
}
/**
 * Response payload for get_mass_tracking_number
 *
 * After arranging shipment (v2.logistics.mass_ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export type GetMassTrackingNumberResponse = FetchResponse<GetMassTrackingNumberResponseData>;
/**
 * Request parameters for get_operating_hour_restrictions
 *
 * This API is designed to retrieve all restrictions related to inputting operating hours for the v2.logistics.update_operating_hours function. This API ensures that user are aware of any limitations or conditions that may affect their operating hours.
 */
export type GetOperatingHourRestrictionsRequest = Record<string, never>;
/**
 * GetOperatingHourRestrictionsMonday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsMonday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsTuesday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsTuesday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsWednesday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsWednesday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsThursday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsThursday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsFriday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsFriday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsSaturday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsSaturday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsSunday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsSunday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsPublicHoliday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictionsPublicHoliday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsWorkingDayConfig sub-interface for GetOperatingHourRestrictionsRegularOperatingHourRestriction
 */
export interface GetOperatingHourRestrictionsWorkingDayConfig {
  /**
   * The restrictions specific for Monday
   */
  monday?: GetOperatingHourRestrictionsMonday;
  /**
   * The restrictions specific for Tuesday
   */
  tuesday?: GetOperatingHourRestrictionsTuesday;
  /**
   * The restrictions specific for Wednesday
   */
  wednesday?: GetOperatingHourRestrictionsWednesday;
  /**
   * The restrictions specific for Thursday
   */
  thursday?: GetOperatingHourRestrictionsThursday;
  /**
   * The restrictions specific for Friday
   */
  friday?: GetOperatingHourRestrictionsFriday;
  /**
   * The restrictions specific for Saturday
   */
  saturday?: GetOperatingHourRestrictionsSaturday;
  /**
   * The restrictions specific for Sunday
   */
  sunday?: GetOperatingHourRestrictionsSunday;
  /**
   * The restrictions specific for public holiday
   */
  public_holiday?: GetOperatingHourRestrictionsPublicHoliday;
}
/**
 * GetOperatingHourRestrictionsRegularOperatingHourRestriction sub-interface for GetOperatingHourRestrictionsResponseData
 */
export interface GetOperatingHourRestrictionsRegularOperatingHourRestriction {
  /**
   * Minimum number of days the seller needs to designate as working days per week (including Monday to Sunday, but excluding public holidays from the count).
   */
  minimum_working_days_in_week?: number;
  /**
   * The restrictions specific to each day
   */
  working_day_config?: GetOperatingHourRestrictionsWorkingDayConfig;
}
/**
 * GetOperatingHourRestrictionsInstantOperatingHourRestriction sub-interface for GetOperatingHourRestrictionsResponseData
 */
export interface GetOperatingHourRestrictionsInstantOperatingHourRestriction {
  /**
   * Minimum number of days the seller needs to designate as working days per week (including Monday to Sunday, but excluding public holidays from the count).
   */
  minimum_working_days_in_week?: number;
  /**
   * The restrictions specific to each day
   */
  working_day_config?: GetOperatingHourRestrictionsWorkingDayConfig;
}
/**
 * GetOperatingHourRestrictionsSpecialDay sub-interface for GetOperatingHourRestrictionsSpecialOperatingHourRestriction
 */
export interface GetOperatingHourRestrictionsSpecialDay {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: boolean;
}
/**
 * GetOperatingHourRestrictionsSpecialOperatingHourRestriction sub-interface for GetOperatingHourRestrictionsResponseData
 */
export interface GetOperatingHourRestrictionsSpecialOperatingHourRestriction {
  special_day?: GetOperatingHourRestrictionsSpecialDay;
}
/**
 * GetOperatingHourRestrictions_GetOperatingHourRestrictionsTuesday sub-interface for GetOperatingHourRestrictionsWorkingDayConfig
 */
export interface GetOperatingHourRestrictions_GetOperatingHourRestrictionsTuesday {
  /**
   * If the value is true, this day must be marked as open.
   */
  mandatory?: boolean;
  /**
   * Minimum number of hours required for the seller to operate on that day.
   */
  minimum_operating_hour?: number;
  /**
   * The start hour for that day should not be set earlier than this time.
   */
  minimum_start_time?: string;
  /**
   * The start hour for that day should not be set later than this time.
   */
  maximum_start_time?: string;
  /**
   * The end hour for that day should not be set earlier than this time.
   */
  minimum_end_time?: string;
  /**
   * The end hour for that day should not be set later than this time.
   */
  maximum_end_time?: string;
  /**
   * If the toggle value is true, the user can set the start_time to 00:00 and the end_time to 23:59 to indicate that the shop is operating 24 hours a day.
   */
  operating_24_hour_toggle?: string;
}
/**
 * GetOperatingHourRestrictionsShopCollectionOperatingHourRestriction sub-interface for GetOperatingHourRestrictionsResponseData
 */
export interface GetOperatingHourRestrictionsShopCollectionOperatingHourRestriction {
  /**
   * Minimum number of days the seller needs to designate as working days per week (including Monday to Sunday, but excluding public holidays from the count).
   */
  minimum_working_days_in_week?: number;
  /**
   * The restrictions specific to each day
   */
  working_day_config?: GetOperatingHourRestrictionsWorkingDayConfig;
}
/**
 * GetOperatingHourRestrictionsResponseData sub-interface for GetOperatingHourRestrictionsResponse
 */
export interface GetOperatingHourRestrictionsResponseData {
  /**
   * The restrictions for Pickup Operating Hours / Preferred Pickup Hours
   */
  regular_operating_hour_restrictions?: GetOperatingHourRestrictionsRegularOperatingHourRestriction;
  /**
   * The restrictions for Instant Operating Hours
   */
  instant_operating_hour_restrictions?: GetOperatingHourRestrictionsInstantOperatingHourRestriction;
  /**
   * The restrictions for Special Operating Hours
   */
  special_operating_hour_restrictions?: GetOperatingHourRestrictionsSpecialOperatingHourRestriction;
  /**
   * The restrictions for Shop Collection Operating Hours
   */
  shop_collection_operating_hour_restrictions?: GetOperatingHourRestrictionsShopCollectionOperatingHourRestriction;
}
/**
 * Response payload for get_operating_hour_restrictions
 *
 * This API is designed to retrieve all restrictions related to inputting operating hours for the v2.logistics.update_operating_hours function. This API ensures that user are aware of any limitations or conditions that may affect their operating hours.
 */
export type GetOperatingHourRestrictionsResponse =
  FetchResponse<GetOperatingHourRestrictionsResponseData>;
/**
 * Request parameters for get_operating_hours
 *
 * This API is utilized to retrieve the existing operating hours of sellers including Pickup Operating Hours,  Special Hours, Instant Operating Hours, and Shop Collection Operating Hours.
 */
export type GetOperatingHoursRequest = Record<string, never>;
/**
 * GetOperatingHoursMonday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursMonday {
  /**
   * Start time for Monday
   */
  start_time?: string;
  /**
   * End time for Monday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursTuesday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursTuesday {
  /**
   * Start time for Tuesday
   */
  start_time?: string;
  /**
   * End time for Tuesday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursWednesday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursWednesday {
  /**
   * Start time for Wednesday
   */
  start_time?: string;
  /**
   * End time for Wednesday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursThursday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursThursday {
  /**
   * Start time for Thursday
   */
  start_time?: string;
  /**
   * End time for Thursday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursFriday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursFriday {
  /**
   * Start time for Friday
   */
  start_time?: string;
  /**
   * End time for Friday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursSaturday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursSaturday {
  /**
   * Start time for Saturday
   */
  start_time?: string;
  /**
   * End time for Saturday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursSunday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursSunday {
  /**
   * Start time for Sunday
   */
  start_time?: string;
  /**
   * End time for Sunday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursPublicHoliday sub-interface for GetOperatingHoursRegularOperatingHour
 */
export interface GetOperatingHoursPublicHoliday {
  /**
   * Start time for Public Holiday
   */
  start_time?: string;
  /**
   * End time for Public Holiday
   */
  end_time?: string;
}
/**
 * GetOperatingHoursRegularOperatingHour sub-interface for GetOperatingHoursRepsonse
 */
export interface GetOperatingHoursRegularOperatingHour {
  /**
   * The Operating hours for Monday
   */
  monday?: GetOperatingHoursMonday;
  /**
   * The Operating hours for Tuesday
   */
  tuesday?: GetOperatingHoursTuesday;
  /**
   * The Operating hours for Wednesday
   */
  wednesday?: GetOperatingHoursWednesday;
  /**
   * The Operating hours for Thursday
   */
  thursday?: GetOperatingHoursThursday;
  /**
   * The Operating hours for Friday
   */
  friday?: GetOperatingHoursFriday;
  /**
   * The Operating hours for Saturday
   */
  saturday?: GetOperatingHoursSaturday;
  /**
   * The Operating hours for Sunday
   */
  sunday?: GetOperatingHoursSunday;
  /**
   * The Operating hours for Public Holiday
   */
  public_holiday?: GetOperatingHoursPublicHoliday;
}
/**
 * GetOperatingHoursInstantOperatingHour sub-interface for GetOperatingHoursRepsonse
 */
export interface GetOperatingHoursInstantOperatingHour {
  /**
   * The Operating hours for Monday
   */
  monday?: GetOperatingHoursMonday;
  /**
   * The Operating hours for Tuesday
   */
  tuesday?: GetOperatingHoursTuesday;
  /**
   * The Operating hours for Wednesday
   */
  wednesday?: GetOperatingHoursWednesday;
  /**
   * The Operating hours for Thursday
   */
  thursday?: GetOperatingHoursThursday;
  /**
   * The Operating hours for Friday
   */
  friday?: GetOperatingHoursFriday;
  /**
   * The Operating hours for Saturday
   */
  saturday?: GetOperatingHoursSaturday;
  /**
   * The Operating hours for Sunday
   */
  sunday?: GetOperatingHoursSunday;
  /**
   * The Operating hours for Public Holiday
   */
  public_holiday?: GetOperatingHoursPublicHoliday;
}
/**
 * GetOperatingHoursOperatingHour sub-interface for GetOperatingHoursSpecialOperatingHour
 */
export interface GetOperatingHoursOperatingHour {
  /**
   * Date: it should include all date from start_date until end_date
   */
  date?: string;
  /**
   * Start time for that date<path></path>
   */
  start_time?: string;
  /**
   * End time for that date
   */
  end_time?: string;
  /**
   * True: If it is open on that date.False: If it is closed on that date.
   */
  enable?: boolean;
}
/**
 * GetOperatingHoursSpecialOperatingHour sub-interface for GetOperatingHoursRepsonse
 */
export interface GetOperatingHoursSpecialOperatingHour {
  /**
   * The name of Special Operating Hours
   */
  name?: string;
  /**
   * The start date of special operating hours
   */
  start_date?: string;
  /**
   * The end date of special operating hours
   */
  end_date?: string;
  operating_hours?: GetOperatingHoursOperatingHour[];
}
/**
 * GetOperatingHoursShopCollectionOperatingHour sub-interface for GetOperatingHoursRepsonse
 */
export interface GetOperatingHoursShopCollectionOperatingHour {
  /**
   * The Operating hours for Monday
   */
  monday?: GetOperatingHoursMonday;
  /**
   * The Operating hours for Tuesday
   */
  tuesday?: GetOperatingHoursTuesday;
  /**
   * The Operating hours for Wednesday
   */
  wednesday?: GetOperatingHoursWednesday;
  /**
   * The Operating hours for Thursday
   */
  thursday?: GetOperatingHoursThursday;
  /**
   * The Operating hours for Friday
   */
  friday?: GetOperatingHoursFriday;
  /**
   * The Operating hours for Saturday
   */
  saturday?: GetOperatingHoursSaturday;
  /**
   * The Operating hours for Sunday
   */
  sunday?: GetOperatingHoursSunday;
  /**
   * The Operating hours for Public Holiday
   */
  public_holiday?: GetOperatingHoursPublicHoliday;
}
/**
 * GetOperatingHoursRepsonse sub-interface for GetOperatingHoursResponse
 */
export interface GetOperatingHoursRepsonse {
  /**
   * The details of Pickup Operating Hours/Preferred Pickup Hours
   */
  regular_operating_hour?: GetOperatingHoursRegularOperatingHour;
  /**
   * The details of Instant Operating Hours
   */
  instant_operating_hour?: GetOperatingHoursInstantOperatingHour;
  /**
   * The details of Special Operating Hours<path></path>
   */
  special_operating_hour?: GetOperatingHoursSpecialOperatingHour;
  /**
   * The details of Shop Collection Operating Hours
   */
  shop_collection_operating_hour?: GetOperatingHoursShopCollectionOperatingHour;
}
/**
 * Response data payload for get_operating_hours
 */
export interface GetOperatingHoursResponseData {
  repsonse?: GetOperatingHoursRepsonse;
}
/**
 * Response payload for get_operating_hours
 *
 * This API is utilized to retrieve the existing operating hours of sellers including Pickup Operating Hours,  Special Hours, Instant Operating Hours, and Shop Collection Operating Hours.
 */
export type GetOperatingHoursResponse = FetchResponse<GetOperatingHoursResponseData>;
/**
 * Request parameters for get_pause_status
 *
 * This API returns the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Sellers need to refer to the support_pause field in v2.logistics.get_channel_list response to determine which channels are actually paused.
 */
export type GetPauseStatusRequest = Record<string, never>;
/**
 * GetPauseStatusResponseData sub-interface for GetPauseStatusResponse
 */
export interface GetPauseStatusResponseData {
  /**
   * Indicate the current pause status of logistics channels under the shop. Applicable values: - true: All relevant channels are currently paused and will not have any new incoming orders- false: No channels are paused and may have new incoming ordersNote: Please first call v2.logistics.get_pause_status to query the current suspension status of instant orders for the store. If is_paused = true, then call v2.logistics.get_channel_list and identify the range of channels affected by the pause function through support_pause = true.
   */
  is_paused?: boolean;
  /**
   * Time at which the relevant paused channels will automatically resume, returned only when is_paused = true, indicating the estimated time when the system will automatically resume order acceptance after the daily remaining quota is exhausted.Note: During the pause period, the seller may call the v2.logistics.set_pause_status at any time with is_paused = false to manually resume order acceptance. After resumption, the consumption of the daily remaining quota will stop and it will be retained until reset the next day.
   */
  pause_end_time?: Date | number;
  /**
   * The remaining pause quota of the shop on the current day, in seconds, returned only when is_paused = false.
   */
  remaining_pause_quota?: number;
}
/**
 * Response payload for get_pause_status
 *
 * This API returns the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Sellers need to refer to the support_pause field in v2.logistics.get_channel_list response to determine which channels are actually paused.
 */
export type GetPauseStatusResponse = FetchResponse<GetPauseStatusResponseData>;
/**
 * GetShippingDocumentDataInfoStyle sub-interface for GetShippingDocumentDataInfoRecipientAddressInfo
 */
export interface GetShippingDocumentDataInfoStyle {
  /**
   * supports bold and italic
   */
  text_style?: string[];
  /**
   * supports 1 - 108
   */
  font_size?: number;
  /**
   * color string like "#AbCd12"
   */
  text_color?: string;
  /**
   * supports 0.1-30, in centimeters
   */
  image_width?: number;
  /**
   * text horizontal align, supports left, center and right.
   */
  h_align?: string;
}
/**
 * GetShippingDocumentDataInfoRecipientAddressInfo sub-interface for GetShippingDocumentDataInfoRequest
 */
export interface GetShippingDocumentDataInfoRecipientAddressInfo {
  /**
   * fields to query in the recipient address, should be name, phone, full_address, town, district, city, state, region, zipcode.
   */
  key: string;
  /**
   * image style
   */
  style?: GetShippingDocumentDataInfoStyle;
}
/**
 * Request parameters for get_shipping_document_data_info
 *
 * Use this api to fetch the logistics information of an order, these info can be used for self-design AWB printing. Besides, this api supports returning personal info as images.
 */
export interface GetShippingDocumentDataInfoRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You shouldn't fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
  /**
   * recipient address to query as image
   */
  recipient_address_info?: GetShippingDocumentDataInfoRecipientAddressInfo[];
}
/**
 * GetShippingDocumentDataInfo_GetShippingDocumentDataInfoRecipientAddressInfo sub-interface for GetShippingDocumentDataInfoResponseData
 */
export interface GetShippingDocumentDataInfo_GetShippingDocumentDataInfoRecipientAddressInfo {
  /**
   * queried field in recipient address
   */
  key?: string;
  /**
   * base64 encoded png data string
   */
  image?: string;
}
/**
 * GetShippingDocumentDataInfoRecipientSortCode sub-interface for GetShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetShippingDocumentDataInfoRecipientSortCode {
  /**
   * The first-level sort_code of recipient.
   */
  first_recipient_sort_code?: string;
  /**
   * The second-level sort_code of recipient.
   */
  second_recipient_sort_code?: string;
  /**
   * The third-level sort_code of recipient.
   */
  third_recipient_sort_code?: string;
}
/**
 * GetShippingDocumentDataInfoSenderSortCode sub-interface for GetShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetShippingDocumentDataInfoSenderSortCode {
  /**
   * The first-level sort_code of sender.
   */
  first_sender_sort_code?: string;
  /**
   * The second-level sort_code of sender.
   */
  second_sender_sort_code?: string;
  /**
   * The third-level sort_code of sender.
   */
  third_sender_sort_code?: string;
}
/**
 * GetShippingDocumentDataInfoReturnSortCode sub-interface for GetShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetShippingDocumentDataInfoReturnSortCode {
  /**
   * The first-level sort code for 3PL doing RTS.
   */
  return_first_sort_code?: string;
}
/**
 * GetShippingDocumentDataInfoBuyerPreferDeliveryTime sub-interface for GetShippingDocumentDataInfoThirdPartyLogisticInfo
 */
export interface GetShippingDocumentDataInfoBuyerPreferDeliveryTime {
  /**
   * The slot which buyer choose
   */
  slot_id?: string;
  /**
   * The start time of a day buyer prefer to receive the packages
   */
  start_time?: string;
  /**
   * The end time of a day buyer prefer to receive the packages.
   */
  end_time?: string;
  /**
   * The detailed instructions of the package delivering.
   */
  description?: string;
}
/**
 * GetShippingDocumentDataInfoThirdPartyLogisticInfo sub-interface for GetShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetShippingDocumentDataInfoThirdPartyLogisticInfo {
  /**
   * Use this field to indicate the order category.
   */
  service_description?: string;
  /**
   * The manufacturer barcode.
   */
  barcode?: string;
  /**
   * The purchase_time of the store.
   */
  purchase_time?: string;
  /**
   * The return_time of the store.
   */
  return_time?: string;
  /**
   * The name of manufacturers.
   */
  manufacturers_name?: string;
  /**
   * The website of manufacturers.
   */
  manufacturers_website?: string;
  /**
   * The identification of recipient area.
   */
  recipient_area?: string;
  /**
   * The route code of the waybill.
   */
  route_step?: string;
  /**
   * The tally code of the waybill.
   */
  suda5_code?: string;
  /**
   * The code of large logistics.
   */
  large_logistics_id?: string;
  /**
   * The parent code of the waybill.
   */
  parent_id?: string;
  /**
   * Use this field to indicate the return cycle.
   */
  return_cycle?: string;
  /**
   * Use this field to indicate the return mode.
   */
  return_mode?: string;
  /**
   * The reminder of stork work.
   */
  prompt?: string;
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The QR code of the waybill.
   */
  qrcode?: string;
  /**
   * The supplier name of channel.
   */
  ec_supplier_name?: string;
  /**
   * Use this field to indicate the first barcode.
   */
  ec_bar_code16?: string;
  /**
   * The device code.
   */
  equipment_id?: string;
  /**
   * The child code for B2C Family-mart.
   */
  eshop_id?: string;
  /**
   * Use this field to indicate the pick barcode.
   */
  ec_bar_code9?: string;
  /**
   * The tracking number of Shopee Delivery.
   */
  pelican_tracking_no?: string;
  /**
   * The date of printing the wayBill.
   */
  print_date?: string;
  /**
   * The sort code of the order.
   */
  pzip?: string;
  /**
   * The barcode of the sort code.
   */
  pzip_c?: string;
  /**
   * The code of the delivery area.
   */
  deliver_area_txt?: string;
  /**
   * Expected delivery date of the order.
   */
  deliver_date_ymd?: string;
  /**
   * Lorry driver code of the order.
   */
  sd_driver_code?: string;
  /**
   * Motorcycle driver code of the order.
   */
  md_driver_code?: string;
  /**
   * Stacking area of the order.
   */
  putorder_stackzone_code?: string;
  /**
   * The customer code of Shopee.
   */
  customer_code?: string;
  /**
   * Use this field to indicate the delivery router.
   */
  deliver_router?: string;
  /**
   * Use this field to indicate the store type.
   */
  store_type?: string;
  /**
   * Use this field to indicate the pick router.
   */
  pick_router?: string;
  /**
   * The main logistic barcode of the waybill.
   */
  barcode_dc?: string;
  /**
   * Use this field to indicate the logistics order number.
   */
  ec_order_number?: string;
  /**
   * The sorting barcode of the waybill.
   */
  barcode_pr?: string;
  /**
   * The first pick barcode of the waybill.
   */
  first_pick_barcode?: string;
  /**
   * The second pick barcode of the waybill.
   */
  second_pick_barcode?: string;
  /**
   * Use this field to indicate the service type.
   */
  is_cod_bool?: string;
  /**
   * Use this field to indicate the receiver name.
   */
  receiver_name?: string;
  /**
   * Use this field to indicate the receiver store name.
   */
  rcv_store_name?: string;
  /**
   * Use this field indicates destination service point code.
   */
  branch_code?: string;
  /**
   * Use this field indicates destination service point name.
   */
  branch_name?: string;
  /**
   * Use this field indicates buyer phone number (last 3 digits).
   */
  last_third_digits_recipient_phone?: string;
  /**
   * Use this field indicates seller phone number (last 3 digits).
   */
  last_third_digits_sender_phone?: string;
  /**
   * First barcode no. sacnned when seller drop off
   */
  barcode_no1?: string;
  /**
   * Second barcode no. sacnned when seller drop off
   */
  barcode_no2?: string;
  /**
   * AWB Print date and time
   */
  print_datetime?: string;
  /**
   * Middle type used in OK Mart SOC
   */
  ok_mid_type?: string;
  /**
   * Aisle no. used in OK Mart SOC
   */
  ok_aisle_no?: string;
  /**
   * Grid no used in OK Mart SOC
   */
  ok_grid_no?: string;
  /**
   * The tracking number of OK Mart.
   */
  ok_tracking_number?: string;
  /**
   * OK SOC received no.
   */
  barcode_no3?: string;
  /**
   * Ship type used by OK Mart
   */
  ship_type?: string;
  /**
   * The area of the collect OK branch used for OK sorting
   */
  area?: string;
  /**
   * First barcode no. sacnned when buyer collect
   */
  barcode_no4?: string;
  /**
   * Second barcode no. sacnned when buyer collect
   */
  barcode_no5?: string;
  /**
   * [Only for local TW orders] Last 3 digits of buyer's phone number, apply for channel_id: 30005, 30006, 30007,30014,30015
   */
  tw_last_three_digits_buyer_phone?: string;
  /**
   * [Only for TW channel_id:30005 ] Store name for 7-ELEVEN orders.
   */
  tw_store_name?: string;
  /**
   * [Only for TW channel_id:30005 ]Store number for 7-ELEVEN orders.
   */
  tw_store_number?: string;
  /**
   * [Only for TW channel:30017] The time buyer prefers to receive the packages.
   */
  buyer_prefer_delivery_time?: GetShippingDocumentDataInfoBuyerPreferDeliveryTime;
}
/**
 * GetShippingDocumentDataInfoSpxReceiveStation sub-interface for GetShippingDocumentDataInfoShippingDocumentInfo
 */
export interface GetShippingDocumentDataInfoSpxReceiveStation {
  /**
   * The first pickup station.
   */
  spx_first_receive_station?: string;
}
/**
 * GetShippingDocumentDataInfoShippingDocumentInfo sub-interface for GetShippingDocumentDataInfoResponseData
 */
export interface GetShippingDocumentDataInfoShippingDocumentInfo {
  /**
   * This value indicates whether the order was a COD (cash on delivery) order.
   */
  cod?: boolean;
  /**
   * Use this field to indicate cod amount.
   */
  cod_amount?: string;
  /**
   * Use this field to indicate order weight when calculate the shipping fee. The unit of weigh is gram.
   */
  order_weight?: number;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The logistics service provider that the buyer selected for the order to deliver items.
   */
  shipping_carrier?: string;
  /**
   * Only work for cross-border order. This code is required at some sorting hub. Please ensure the service_code is INCLUDED on your shipping label, otherwise the parcel cannot be processed by the warehouse. If you didn't retrieve service_code after you first called this API, please try few more times within 30 minutes.
   */
  service_code?: string;
  /**
   * Only work for cross-border order.The name of the carrier ships cross country or region.
   */
  first_mile_name?: string;
  /**
   * Only work for cross-border order.The name of the carrier delivers the parcels in local country or region.
   */
  last_mile_name?: string;
  /**
   * Only work for cross-border order.This value indicates whether the order contains goods that are required to declare at customs. "T" means true and it will mark as "T" on the shipping label; "F" means false and it will mark as "P" on the shipping label. This value is accurate ONLY AFTER the order trackingNo is generated, please capture this value AFTER your retrieve the trackingNo.
   */
  goods_to_declare?: boolean;
  /**
   * Only work for cross-border order. The string use for waybill printing. The format is "S - region_code and lane_number". For example, S-TH01, S-TH02
   */
  lane_code?: string;
  /**
   * Only work for cross-border order in some special shop. The address info of the warehouse.
   */
  warehouse_address?: string;
  /**
   * Only work for cross-border order in some special shop. The ID of the warehouse.
   */
  warehouse_id?: string;
  /**
   * The sort_code of recipient.
   */
  recipient_sort_code?: GetShippingDocumentDataInfoRecipientSortCode;
  /**
   * The sort_code of sender.
   */
  sender_sort_code?: GetShippingDocumentDataInfoSenderSortCode;
  /**
   * The sort code for 3PL doing RTS.
   */
  return_sort_code?: GetShippingDocumentDataInfoReturnSortCode;
  /**
   * Only used for TW sellers.
   */
  third_party_logistic_info?: GetShippingDocumentDataInfoThirdPartyLogisticInfo;
  /**
   * The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
  /**
   * First mile tracking NO. for CrossBoard BR seller can be used to self-design CB Brazil AWB.
   */
  shopee_tracking_number?: string;
  /**
   * The last-mile tracking number. Only for Cross Board BR seller.
   */
  last_mile_tracking_number?: string;
  /**
   * The name of pickup hub.
   */
  pickup_hub?: string;
  /**
   * The name of delivery hub.
   */
  delivery_hub?: string;
  /**
   * Zone name.
   */
  deliver_area?: string;
  /**
   * The name of ec order.
   */
  ec_order_no?: string;
  /**
   * The date of create shipment order.
   */
  create_date_ymd_sl?: string;
  /**
   * The name of manufacturer.
   */
  manufacturers_name?: string;
  /**
   * The website of manufacturer.
   */
  manufacturers_website?: string;
  /**
   * Use this field to indicate order contains dangerous goods or not.0: Non-dangerous good1: Dangerous good2: Prohibited
   */
  is_lm_dg_bool?: number;
  /**
   * Use this field to indicate delivery address is residential or office address.0: not configured1: office address2: residential address
   */
  preferred_delivery_option?: number;
  /**
   * The sub-district of recipient's address.
   */
  spx_sub_district?: string;
  /**
   * The spx receive station.
   */
  spx_receive_station?: GetShippingDocumentDataInfoSpxReceiveStation;
  /**
   * The zone of this order.
   */
  zone?: string;
  /**
   * Delivery Sub Zone.
   */
  zone_code?: string;
  /**
   * Distribution Center Code.
   */
  destination_base_code?: string;
  /**
   * Use this field indicates buyer phone number (last 3 digits). For non-TW local sellers
   */
  last_third_digits_buyer_phone?: string;
  /**
   * corresponding locker sizing for self-collection locker channels [only available for specific logistic channels: 148003 and 140006]
   */
  parcel_size?: string;
  /**
   * this value indicates whether the buyer select "scan on delivery" payment channel at checkout.
   */
  sod?: boolean;
  /**
   * Buyer's CPF number for taxation and invoice purposes. Only for Brazil order.
   */
  buyer_cpf_id?: string;
  /**
   * only apply for ID/VN shops.mutual_check indicates whether the parcel is eligible for Return-on-the-Spot (RoS) co-check. If mutual_check=1, then the parcel is RoS eligible, where drivers and buyers can co-check the parcel. Buyer can then choose to accept or reject the parcel on the spot.If mutual_check=0, then the parcel is ineligible for RoS.
   */
  mutual_check?: number;
  /**
   * Probability of Successful Friday Delivery.The value of L(low), M(medium), H(high) represent the chances of successful delivery attempts on Friday.
   */
  dely_fri_label?: string;
  /**
   * Probability of Successful Saturday DeliveryThe value of L(low), M(medium), H(high) represent the chances of successful delivery attempts on Saturday.
   */
  dely_sat_label?: string;
  /**
   * Probability of Successful Sunday Delivery.The value of L(low), M(medium), H(high) represent the chances of successful delivery attempts on Sunday.
   */
  dely_sun_label?: string;
  /**
   * For drivers to quickly identify parcel to be picked up. Only returned for ID and TH local orders which use instant+sameday for delivery.
   */
  pickup_code?: string;
  /**
   * [Only for TW 30029 channel] This field indicate the sorting group value of the package. Available values: - North- South
   */
  sorting_group?: string;
  /**
   * [Only for TW 30029 channel] Please refer to this number instead of tracking number for this this channel. This field will be empty for other channels.
   */
  unpackaged_sku_id?: string;
  /**
   * [Only for TW 30029 channel] Please refer to this field to generate the QR code for the shipping document for this channel. This field will be empty for other channels.
   */
  unpackaged_sku_id_qrcode?: string;
  /**
   * This value indicates whether the order is considered a “high value” item and requires special handling by the logistics provider. The threshold to be considered "high value" item differs by region, and is only applicable to SPX channels. For regions other than Malaysia and Thailand, this field will always return empty.
   */
  high_value?: boolean;
  /**
   * Currently only applicable for Brazil, Indonesia, Vietnam, Philippines.For orders with Dangerous Goods, this value indicates the severity of the danger and requires special handling by the logistics provider. 0 = Not classified / no DG sub-type1 = DG_A2 = DG_B3 = DG_C4 = DG_D
   */
  dg_specific_type?: number;
  /**
   * This ID is used by 3PL to determine parcel routing. For regions other than Malaysia and Thailand, this field will always return empty.
   */
  hotspot_id?: string;
  /**
   * This value indicates whether an order has a high / medium / low delivery success rate on each weekend (e.g. sat and sun respectively). For regions other than Malaysia, this field will always return empty.High = HMedium = MLow = L
   */
  weekend1_delivery_success_label?: string;
  /**
   * This value indicates whether an order has a high / medium / low delivery success rate on each weekend (e.g. sat and sun respectively). For regions other than Malaysia, this field will always return empty.High = HMedium = MLow = L
   */
  weekend2_delivery_success_label?: string;
}
/**
 * GetShippingDocumentDataInfoResponseData sub-interface for GetShippingDocumentDataInfoResponse
 */
export interface GetShippingDocumentDataInfoResponseData {
  recipient_address_info?: GetShippingDocumentDataInfo_GetShippingDocumentDataInfoRecipientAddressInfo;
  shipping_document_info?: GetShippingDocumentDataInfoShippingDocumentInfo;
}
/**
 * Response payload for get_shipping_document_data_info
 *
 * Use this api to fetch the logistics information of an order, these info can be used for self-design AWB printing. Besides, this api supports returning personal info as images.
 */
export type GetShippingDocumentDataInfoResponse =
  FetchResponse<GetShippingDocumentDataInfoResponseData>;
/**
 * Request parameters for get_shipping_document_job_status
 *
 * This API retrieves the status of a shipping document job using the job ID provided.
 */
export interface GetShippingDocumentJobStatusRequest {
  /**
   * Generated Job ID for status tracking and download the Shipping Document
   */
  job_id: string;
}
/**
 * GetShippingDocumentJobStatusResponseData sub-interface for GetShippingDocumentJobStatusResponse
 */
export interface GetShippingDocumentJobStatusResponseData {
  /**
   * Generated Job ID for status tracking and download the Shipping Document
   */
  job_id?: string;
  /**
   * Generated Shipping Document file name.
   */
  job_name?: string;
  /**
   * Requested Shipping Document current status. Available values: PROCESSING, READY, EXPIRED, FAILED
   */
  job_status?: JobStatus | string | number;
}
/**
 * Response payload for get_shipping_document_job_status
 *
 * This API retrieves the status of a shipping document job using the job ID provided.
 */
export type GetShippingDocumentJobStatusResponse =
  FetchResponse<GetShippingDocumentJobStatusResponseData>;
/**
 * GetShippingDocumentParameterOrder sub-interface for GetShippingDocumentParameterRequest
 */
export interface GetShippingDocumentParameterOrder {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
}
/**
 * Request parameters for get_shipping_document_parameter
 *
 * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
 */
export interface GetShippingDocumentParameterRequest {
  /**
   * The list of orders you want to get. limit [1,50]
   */
  order_list: GetShippingDocumentParameterOrder[];
}
/**
 * GetShippingDocumentParameterWarning sub-interface for GetShippingDocumentParameterResponse
 */
export interface GetShippingDocumentParameterWarning {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * GetShippingDocumentParameterResult sub-interface for GetShippingDocumentParameterResponseData
 */
export interface GetShippingDocumentParameterResult {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The shipping document type Shopee suggests. If you don't select any shipping document type, Shopee will use this as default shipping document type.
   */
  suggest_shipping_document_type?: string;
  /**
   * The shipping document type you can select of this order.
   */
  selectable_shipping_document_type?: string[];
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * GetShippingDocumentParameterResponseData sub-interface for GetShippingDocumentParameterResponse
 */
export interface GetShippingDocumentParameterResponseData {
  /**
   * The list of the result data.
   */
  result_list?: GetShippingDocumentParameterResult[];
}
/**
 * Response payload for get_shipping_document_parameter
 *
 * Use this api to get the selectable shipping_document_type and suggested shipping_document_type.
 */
export type GetShippingDocumentParameterResponse =
  FetchResponse<GetShippingDocumentParameterResponseData>;
/**
 * GetShippingDocumentResultOrder sub-interface for GetShippingDocumentResultRequest
 */
export interface GetShippingDocumentResultOrder {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
  /**
   * The type of shipping document. Available values: NORMAL_AIR_WAYBILL, THERMAL_AIR_WAYBILL, NORMAL_JOB_AIR_WAYBILL, THERMAL_JOB_AIR_WAYBILL, THERMAL_UNPACKAGED_LABEL
   */
  shipping_document_type?: ShippingDocumentType | string | number;
}
/**
 * Request parameters for get_shipping_document_result
 *
 * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
 */
export interface GetShippingDocumentResultRequest {
  /**
   * The list of orders, limit [1,50]
   */
  order_list: GetShippingDocumentResultOrder[];
}
/**
 * GetShippingDocumentResultWarning sub-interface for GetShippingDocumentResultResponse
 */
export interface GetShippingDocumentResultWarning {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * GetShippingDocumentResultResult sub-interface for GetShippingDocumentResultResponseData
 */
export interface GetShippingDocumentResultResult {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The status of the shipping document task you querying with order_sn. Available values: READY， FAILED， PROCESSING
   */
  status?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * GetShippingDocumentResultResponseData sub-interface for GetShippingDocumentResultResponse
 */
export interface GetShippingDocumentResultResponseData {
  /**
   * The result data list of the API response.
   */
  result_list?: GetShippingDocumentResultResult[];
}
/**
 * Response payload for get_shipping_document_result
 *
 * Use this api to retrieve the status of the shipping document task. Document will be available for download only after the status change to 'READY'.
 */
export type GetShippingDocumentResultResponse =
  FetchResponse<GetShippingDocumentResultResponseData>;
/**
 * Request parameters for get_shipping_parameter
 *
 * Use this api to check if the package support pickup, dropoff, or non-integrated method. For pickup, will return addresses and pickup time id options. For dropoff, will return branch id, sender real name etc, depending on 3PL requirements. [Please call this API when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule Pickup conditions]
 */
export interface GetShippingParameterRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
}
/**
 * GetShippingParameterInfoNeeded sub-interface for GetShippingParameterResponseData
 */
export interface GetShippingParameterInfoNeeded {
  /**
   * Could contain 'branch_id', 'sender_real_name' or 'tracking_no'. If it contains 'branch_id', choose one to Init. If it contains 'sender_real_name' or 'tracking_no', should manually input these values in Init API. If it has empty value, developer should still include "dropoff" field in Init API.Could contain 'slug'.If it contains 'slug', to return selected 3PL partner only for TW C2C sellers to drop-off parcels with.
   */
  dropoff?: string[];
  /**
   * Could contain 'address_id' and 'pickup_time_id'. Choose one address_id and its corresponding pickup_time_id to Init. If it has empty value, developer should still include "pickup" field in Init API.It could contains "tracking_number" returned from "info_need"for some channels, please also add it when init.
   */
  pickup?: string[];
  /**
   * Could contain 'tracking_no'. If it contains 'tracking_no', should manually input these values in Init API. If it has empty value, developer should still include "non-integrated" field in Init API.
   */
  non_integrated?: string[];
}
/**
 * GetShippingParameterBranch sub-interface for GetShippingParameterDropoff
 */
export interface GetShippingParameterBranch {
  /**
   * The identity of logistics branch.
   */
  branch_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
}
/**
 * GetShippingParameterSlug sub-interface for GetShippingParameterDropoff
 */
export interface GetShippingParameterSlug {
  /**
   * The identity of slug.
   */
  slug?: string;
  /**
   * The name of slug.
   */
  slug_name?: string;
}
/**
 * GetShippingParameterDropoff sub-interface for GetShippingParameterResponseData
 */
export interface GetShippingParameterDropoff {
  /**
   * List of available dropoff branches info.
   */
  branch_list?: GetShippingParameterBranch[];
  /**
   * List of available TW 3PL drop-off partners.
   */
  slug_list?: GetShippingParameterSlug[];
}
/**
 * GetShippingParameterTimeSlot sub-interface for GetShippingParameterAddress
 */
export interface GetShippingParameterTimeSlot {
  /**
   * The date of pickup time. In timestamp.
   */
  date?: Date | number;
  /**
   * The text description of pickup time. Only applicable for certain channels.
   */
  time_text?: string;
  /**
   * The identity of pickuptime.
   */
  pickup_time_id?: string;
  /**
   * This field will have the value “recommended” for the time slot that Shopee suggests sellers choose. While it is advisable for sellers to choose the recommended time slot, they can also choose other time slots that do not have the recommended flag.
   */
  flags?: string[];
}
/**
 * GetShippingParameterAddress sub-interface for GetShippingParameterPickup
 */
export interface GetShippingParameterAddress {
  /**
   * The identity of address.
   */
  address_id?: number;
  /**
   * The region of specify address.
   */
  region?: string;
  /**
   * The state of specify address.
   */
  state?: string;
  /**
   * The city of specify address.
   */
  city?: string;
  /**
   * The district of specify address.
   */
  district?: string;
  /**
   * The town of specify address.
   */
  town?: string;
  /**
   * The address description of specify address.
   */
  address?: string;
  /**
   * The zipcode of specify address.
   */
  zipcode?: string;
  /**
   * The flag of shop address, applicable values: default_address, pickup_address, return_address, current_address(only for multi-warehouse sellers)
   */
  address_flag?: string[];
  /**
   * List of pickup_time information corresponding to the address_id.Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  time_slot_list?: GetShippingParameterTimeSlot[];
}
/**
 * GetShippingParameterPickup sub-interface for GetShippingParameterResponseData
 */
export interface GetShippingParameterPickup {
  /**
   * List of available pickup address info.
   */
  address_list?: GetShippingParameterAddress[];
}
/**
 * GetShippingParameterResponseData sub-interface for GetShippingParameterResponse
 */
export interface GetShippingParameterResponseData {
  /**
   * The parameters required based on each specific order to Init. Must use the fields included under info_needed to call Init. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  info_needed?: GetShippingParameterInfoNeeded;
  /**
   * Logistics information for dropoff mode order.
   */
  dropoff?: GetShippingParameterDropoff;
  /**
   * Logistics information for pickup mode order.
   */
  pickup?: GetShippingParameterPickup;
}
/**
 * Response payload for get_shipping_parameter
 *
 * Use this api to check if the package support pickup, dropoff, or non-integrated method. For pickup, will return addresses and pickup time id options. For dropoff, will return branch id, sender real name etc, depending on 3PL requirements. [Please call this API when packages meet: 1) fulfillment status is LOGISTICS_READY; or 2) fulfillment status is LOGISTICS_PICKUP_RETRY; or 3) fulfillment status is LOGISTICS_REQUEST_CREATED and meet Instant Order Reschedule Pickup conditions]
 */
export type GetShippingParameterResponse = FetchResponse<GetShippingParameterResponseData>;
/**
 * Request parameters for get_tracking_info
 *
 * Use this api to get the logistics tracking information of an order.
 */
export interface GetTrackingInfoRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You shouldn't fill the field with empty string when there is a package number.
   */
  package_number?: string;
}
/**
 * GetTrackingInfoTrackingInfo sub-interface for GetTrackingInfoResponseData
 */
export interface GetTrackingInfoTrackingInfo {
  /**
   * The time when the logistics tracking info is updated.
   */
  update_time?: Date | number;
  /**
   * The description of the logistics tracking info.
   */
  description?: string;
  /**
   * The logistics status for the order. Applicable values: See Data Definition- LogisticsStatus.
   */
  logistics_status?: string;
  /**
   * The OTP generated after the parcel enters the RTS (Return to Seller) process. Sellers need to provide this OTP to the driver to complete the return confirmation.Note: - This field only applies to orders under the SPX Instant & Sameday channel in ID region.- This field is only returned when the driver has initiated the return process to the seller. If the driver has not initiated the return process for the parcel, this field will be empty.
   */
  return_code?: string;
}
/**
 * GetTrackingInfoReversedTrackingInfo sub-interface for GetTrackingInfoResponseData
 */
export interface GetTrackingInfoReversedTrackingInfo {
  /**
   * The time when the reversed logistics tracking info is updated.
   */
  update_time?: number;
  /**
   * The description of the reversed logistics tracking info.
   */
  description?: string;
}
/**
 * GetTrackingInfoResponseData sub-interface for GetTrackingInfoResponse
 */
export interface GetTrackingInfoResponseData {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The logistics status for the order. Applicable values: See Data Definition- LogisticsStatus.
   */
  logistics_status?: string;
  /**
   * The tracking info of the order.
   */
  tracking_info?: GetTrackingInfoTrackingInfo[];
  /**
   * [TW Only] The unique 6-digit PIN code for sellers to collect RTS (Return to Seller) parcels at service points. This field is returned when the channel is C2C and the logistics_status is FULFILMENT_DELIVERY_FAILED.
   */
  collection_pin_code?: string;
  /**
   * The tracking number of the reversed logistics.Note: Only apply to the cross-border segment of failed delivery parcels returned from the local return warehouse to the seller.
   */
  reversed_tracking_number?: string;
  /**
   * The courier name of the reversed logistics.Note: Only apply to the cross-border segment of failed delivery parcels returned from the local return warehouse to the seller.
   */
  reversed_courier_name?: string;
  /**
   * The tracking information of the reversed logistics.Note: Only apply to the cross-border segment of failed delivery parcels returned from the local return warehouse to the seller.
   */
  reversed_tracking_info?: GetTrackingInfoReversedTrackingInfo[];
}
/**
 * Response payload for get_tracking_info
 *
 * Use this api to get the logistics tracking information of an order.
 */
export type GetTrackingInfoResponse = FetchResponse<GetTrackingInfoResponseData>;
/**
 * Request parameters for get_tracking_number
 *
 * After arranging shipment (v2.logistics.ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export interface GetTrackingNumberRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
  /**
   * Indicate response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them. Available values: plp_number, first_mile_tracking_number,last_mile_tracking_number
   */
  response_optional_fields?: ResponseOptionalFields | string | number;
}
/**
 * GetTrackingNumberResponseData sub-interface for GetTrackingNumberResponse
 */
export interface GetTrackingNumberResponseData {
  /**
   * The tracking number of this order.
   */
  tracking_number?: string;
  /**
   * The unique identifier for package of BR correios.
   */
  plp_number?: string;
  /**
   * The first mile tracking number of the order. Only for Cross Border Seller
   */
  first_mile_tracking_number?: string;
  /**
   * The last mile tracking number of the order. Only for Cross Border BR seller.
   */
  last_mile_tracking_number?: string;
  /**
   * Indicate hint information if cannot get some fields under special scenarios. For example, cannot get tracking_number when cvs store is closed.
   */
  hint?: string;
  /**
   * For drivers to quickly identify parcel to be picked up. Only returned for ID local orders who using instant+sameday for delivery.
   */
  pickup_code?: string;
}
/**
 * Response payload for get_tracking_number
 *
 * After arranging shipment (v2.logistics.ship_order) for the integrated channel, use this api to get the tracking_number, which is a required parameter for creating shipping labels. The api response can return tracking_number empty, since this info is dependent from the 3PL, due to this it is allowed to keep calling the api within 5 minutes interval, until the tracking_number is returned.
 */
export type GetTrackingNumberResponse = FetchResponse<GetTrackingNumberResponseData>;
/**
 * MassShipOrderPackage sub-interface for MassShipOrderRequest
 */
export interface MassShipOrderPackage {
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number: string;
}
/**
 * MassShipOrderPickup sub-interface for MassShipOrderRequest
 */
export interface MassShipOrderPickup {
  /**
   * The identity of address.
   */
  address_id?: number;
  /**
   * The pickup time id. Retrieved from v2.logistics.get_mass_shipping_parameter, you can only select one from the time_slot_list.Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  pickup_time_id?: string;
}
/**
 * MassShipOrderDropoff sub-interface for MassShipOrderRequest
 */
export interface MassShipOrderDropoff {
  /**
   * The identity of branch.
   */
  branch_id?: number;
  /**
   * The real name of sender.
   */
  sender_real_name?: string;
  /**
   * Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * MassShipOrderTrackingNumber sub-interface for MassShipOrderNonIntegrated
 */
export interface MassShipOrderTrackingNumber {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number: string;
  /**
   * Optional parameter for non-integrated channel order. The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number: string;
}
/**
 * MassShipOrderNonIntegrated sub-interface for MassShipOrderRequest
 */
export interface MassShipOrderNonIntegrated {
  /**
   * Optional parameter for non-integrated channel order. The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: MassShipOrderTrackingNumber[];
}
/**
 * Request parameters for mass_ship_order
 *
 * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_mass_shipping_parameter to fetch all required params first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller. The API can only batch arrange shipment for multiple packages under the same product_location_id and same logistics_channel_id.
 */
export interface MassShipOrderRequest {
  /**
   * The API can only batch arrange shipment for multiple packages under the same product_location_id and same logistics_channel_id. Use this field to specify the logistics_channel_id for the request. If not specified, will use the logistics_channel_id corresponds to the first package_number by default.
   */
  logistics_channel_id?: number;
  /**
   * The API can only batch arrange shipment for multiple packages under the same product_location_id and same logistics_channel_id. Use this field to specify the product_location_id for the request. If not specified, will use the product_location_id corresponds to the first package_number by default.
   */
  product_location_id?: string;
  /**
   * The list of packages you want to arrange shipment. limit [1, 50].
   */
  package_list: MassShipOrderPackage[];
  /**
   * Required parameter ONLY if GetParameterForInit returns "pickup" or if GetLogisticsInfo returns "pickup" under "info_needed" for the same order. Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup?: MassShipOrderPickup;
  /**
   * Required parameter ONLY if GetParameterForInit returns "dropoff" or if GetLogisticsInfo returns "dropoff" under "info_needed" for the same order. Developer should still include "dropoff" field in the call even if "dropoff" has empty value. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  dropoff?: MassShipOrderDropoff;
  /**
   * Optional parameter when get_mass_shipping_parameter returns "non-integrated" under "info_needed".
   */
  non_integrated?: MassShipOrderNonIntegrated;
}
/**
 * MassShipOrderSuccess sub-interface for MassShipOrderResponse
 */
export interface MassShipOrderSuccess {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
}
/**
 * MassShipOrderFail sub-interface for MassShipOrderResponse
 */
export interface MassShipOrderFail {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Reason for failure.
   */
  fail_reason?: string;
}
/**
 * Response data payload for mass_ship_order
 */
export interface MassShipOrderResponseData {
  /**
   * Success package list.
   */
  success_list?: MassShipOrderSuccess[];
  /**
   * Fail package list.
   */
  fail_list?: MassShipOrderFail[];
}
/**
 * Response payload for mass_ship_order
 *
 * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_mass_shipping_parameter to fetch all required params first. It's recommended to initiate logistics one hour after the orders were placed since there is one-hour window buyer can cancel any order without request to seller. The API can only batch arrange shipment for multiple packages under the same product_location_id and same logistics_channel_id.
 */
export type MassShipOrderResponse = FetchResponse<MassShipOrderResponseData>;
/**
 * SetAddressConfigAddressTypeConfig sub-interface for SetAddressConfigRequest
 */
export interface SetAddressConfigAddressTypeConfig {
  /**
   * The identifier id of the address.
   */
  address_id?: number;
  /**
   * The type of address. Available values: DEFAULT_ADDRESS, PICKUP_ADDRESS, RETURN_ADDRESS, INBOUND_PICKUP_ADDRESS.
   */
  address_type?: AddressType | string | number;
}
/**
 * Request parameters for set_address_config
 *
 * Use this API to set address config of your shop.
 */
export interface SetAddressConfigRequest {
  /**
   * Definite show pickup address or not.
   */
  show_pickup_address?: boolean;
  /**
   * The config of your shop addres.
   */
  address_type_config?: SetAddressConfigAddressTypeConfig;
}
/**
 * Response data payload for set_address_config
 */
export type SetAddressConfigResponseData = Record<string, never>;
/**
 * Response payload for set_address_config
 *
 * Use this API to set address config of your shop.
 */
export type SetAddressConfigResponse = FetchResponse<SetAddressConfigResponseData>;
/**
 * SetMartPackagingInfoDimension sub-interface for SetMartPackagingInfoRequest
 */
export interface SetMartPackagingInfoDimension {
  /**
   * The length of the packaging in centimetres (cm).
   */
  length: number;
  /**
   * The width of the packaging in centimetres (cm).
   */
  width: number;
  /**
   * The height of the packaging in centimetres (cm).
   */
  height: number;
}
/**
 * SetMartPackagingInfoPackagingFee sub-interface for SetMartPackagingInfoRequest
 */
export interface SetMartPackagingInfoPackagingFee {
  /**
   * The packaging fee price in your region's local currency.For SG/MY/BR/MX seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer.
   */
  value: number;
}
/**
 * Request parameters for set_mart_packaging_info
 *
 * [Only for ID mart seller] This API allows sellers to set up their packaging fee info. Through this API, sellers can enable or disable packaging fees, and if enabled, specify the dimensions of the packaging and the associated fee. This ensures that sellers can configure their shipping costs accurately based on their packaging requirements.
 */
export interface SetMartPackagingInfoRequest {
  /**
   * Indicates whether the seller has enabled or disabled the packaging fee configuration.True: The seller charges a packaging fee.False: The seller does not charge a packaging fee.
   */
  enable: boolean;
  /**
   * Required if enabled is set to True.
   */
  dimension?: SetMartPackagingInfoDimension;
  /**
   * Required if enabled is set to True.
   */
  packaging_fee?: SetMartPackagingInfoPackagingFee;
}
/**
 * SetMartPackagingInfo_SetMartPackagingInfoDimension sub-interface for SetMartPackagingInfoResponseData
 */
export interface SetMartPackagingInfo_SetMartPackagingInfoDimension {
  /**
   * The length of the packaging in centimetres (cm).
   */
  length?: number;
  /**
   * The width of the packaging in centimetres (cm).
   */
  width?: number;
  /**
   * The height of the packaging in centimetres (cm).
   */
  height?: number;
}
/**
 * SetMartPackagingInfo_SetMartPackagingInfoPackagingFee sub-interface for SetMartPackagingInfoResponseData
 */
export interface SetMartPackagingInfo_SetMartPackagingInfoPackagingFee {
  /**
   * The packaging fee price in the seller's local currency.
   */
  value?: number;
}
/**
 * SetMartPackagingInfoResponseData sub-interface for SetMartPackagingInfoResponse
 */
export interface SetMartPackagingInfoResponseData {
  /**
   * Indicates whether the seller has enabled or disabled the packaging fee configuration.True: The seller charges a packaging fee.False: The seller does not charge a packaging fee.
   */
  enable?: boolean;
  /**
   * Returned only if enabled is set to True.
   */
  dimension?: SetMartPackagingInfo_SetMartPackagingInfoDimension;
  /**
   * Returned only if enabled is set to True.
   */
  packaging_fee?: SetMartPackagingInfo_SetMartPackagingInfoPackagingFee;
}
/**
 * Response payload for set_mart_packaging_info
 *
 * [Only for ID mart seller] This API allows sellers to set up their packaging fee info. Through this API, sellers can enable or disable packaging fees, and if enabled, specify the dimensions of the packaging and the associated fee. This ensures that sellers can configure their shipping costs accurately based on their packaging requirements.
 */
export type SetMartPackagingInfoResponse = FetchResponse<SetMartPackagingInfoResponseData>;
/**
 * Request parameters for set_pause_status
 *
 * Use this API to set the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Note: The pause may take a few moments to take effect. Please check for any additional orders that may still be placed during this window.
 */
export interface SetPauseStatusRequest {
  /**
   * The target pause status that seller wants to update to. Applicable values: - true: Trigger pause. All relevant channels will be paused and will not have any new incoming orders (fulfillment of existing orders will not be affected). Meanwhile, the system will start deducting the daily pause quota and automatically calculate the pause end time based on the remaining quota.- false: Trigger manual resume. No channels are paused and may have new incoming orders. The remaining daily quota will stop being consumed and be retained until reset the next day.Note: Due to the system cache synchronization mechanism, there may be an approximately 15-second delay before the pause/resume operation takes effect. It is recommended to call the v2.logistics.get_pause_status for confirmation after the update.
   */
  is_paused: boolean;
}
/**
 * SetPauseStatusResponseData sub-interface for SetPauseStatusResponse
 */
export interface SetPauseStatusResponseData {
  /**
   * Indicate the current pause status of logistics channels under the shop. Applicable values: - true: All relevant channels are currently paused and will not have any new incoming orders- false: No channels are paused and may have new incoming ordersNote: Please first call v2.logistics.get_pause_status to query the current suspension status of instant orders for the store. If is_paused = true, then call v2.logistics.get_channel_list and identify the range of channels affected by the pause function through support_pause = true.
   */
  is_paused?: boolean;
  /**
   * Time at which the relevant paused channels will automatically resume, returned only when is_paused = true, indicating the estimated time when the system will automatically resume order acceptance after the daily remaining quota is exhausted.Note: During the pause period, the seller may call the v2.logistics.set_pause_status at any time with is_paused = false to manually resume order acceptance. After resumption, the consumption of the daily remaining quota will stop and it will be retained until reset the next day.
   */
  pause_end_time?: Date | number;
  /**
   * The remaining pause quota of the shop on the current day, in seconds, returned only when is_paused = false.
   */
  remaining_pause_quota?: number;
}
/**
 * Response payload for set_pause_status
 *
 * Use this API to set the pause status of logistics channels under the shop. Pausing allows the shop to temporarily prevent buyers from placing orders through specific logistics channels. The response includes whether a pause is currently active, the pause end time (if active), and the remaining daily pause quota in seconds (if inactive). Note: The pause may take a few moments to take effect. Please check for any additional orders that may still be placed during this window.
 */
export type SetPauseStatusResponse = FetchResponse<SetPauseStatusResponseData>;
/**
 * ShipBookingPickup sub-interface for ShipBookingRequest
 */
export interface ShipBookingPickup {
  /**
   * The identity of address. Retrieved from v2.logistics.get_booking_shipping_parameter.
   */
  address_id: number;
  /**
   * The pickup time id. Retrieved from v2.logistics.get_shipping_booking_parameter, you can only select one from the time_slot_list.Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  pickup_time_id?: string;
}
/**
 * Request parameters for ship_booking
 *
 * Use this api to initiate logistics including arrange pickup, dropoff. Should call v2.logistics.get_booking_shipping_parameter to fetch all required param first.
 */
export interface ShipBookingRequest {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn: string;
  /**
   * Required parameter ONLY if get_shipping_parameter returns "pickup" under "info_needed". Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup?: ShipBookingPickup;
  /**
   * Required parameter ONLY if get_shipping_parameter returns "dropoff" under "info_needed". Developer should still include "dropoff" field in the call even if "dropoff" has empty value. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  dropoff?: any;
}
/**
 * Response data payload for ship_booking
 */
export type ShipBookingResponseData = Record<string, never>;
/**
 * Response payload for ship_booking
 *
 * Use this api to initiate logistics including arrange pickup, dropoff. Should call v2.logistics.get_booking_shipping_parameter to fetch all required param first.
 */
export type ShipBookingResponse = FetchResponse<ShipBookingResponseData>;
/**
 * ShipOrderPickup sub-interface for ShipOrderRequest
 */
export interface ShipOrderPickup {
  /**
   * The identity of address. Retrieved from v2.logistics.get_shipping_parameter.
   */
  address_id: number;
  /**
   * The pickup time id. Retrieved from v2.logistics.get_shipping_parameter, you can only select one from the time_slot_list. Some logistics channels may not return any date or time for pickup time slots. In such cases, sellers can arrange shipment without selecting any time slot, and Shopee will arrange a suitable timing for these situations.
   */
  pickup_time_id?: string;
  /**
   * Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * ShipOrderDropoff sub-interface for ShipOrderRequest
 */
export interface ShipOrderDropoff {
  /**
   * The identity of branch.
   */
  branch_id?: number;
  /**
   * The real name of sender.
   */
  sender_real_name?: string;
  /**
   * Need input this field when "tracking_number" is returned from "info_need". Please note that this tracking number is assigned by third-party shipping carrier for item shipment.
   */
  tracking_number?: string;
  /**
   * The selected 3PL partner to drop-off parcels with.
   */
  slug?: string;
}
/**
 * ShipOrderNonIntegrated sub-interface for ShipOrderRequest
 */
export interface ShipOrderNonIntegrated {
  /**
   * Optional parameter for non-integrated channel order. The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
}
/**
 * Request parameters for ship_order
 *
 * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed.
 */
export interface ShipOrderRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
  /**
   * Required parameter ONLY if get_shipping_parameter returns "pickup" under "info_needed". Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup?: ShipOrderPickup;
  /**
   * Required parameter ONLY if get_shipping_parameter returns "dropoff" under "info_needed". Developer should still include "dropoff" field in the call even if "dropoff" has empty value. For logistic_id 80003 and 80004, both Regular and JOB shipping methods are supported. If you choose Regular shipping method, please use "tracking_no" to call Init API. If you choose JOB shipping method, please use "sender_real_name" to call Init API. Note that only one of "tracking_no" and "sender_real_name" can be selected.
   */
  dropoff?: ShipOrderDropoff;
  /**
   * Optional parameter when get_shipping_parameter returns "non-integrated" under "info_needed".
   */
  non_integrated?: ShipOrderNonIntegrated;
}
/**
 * Response data payload for ship_order
 */
export type ShipOrderResponseData = Record<string, never>;
/**
 * Response payload for ship_order
 *
 * Use this api to initiate logistics including arrange pickup, dropoff or shipment for non-integrated logistic channels. Should call v2.logistics.get_shipping_parameter to fetch all required param first. It's recommended to initiate logistics one hour after the orders were placed.
 */
export type ShipOrderResponse = FetchResponse<ShipOrderResponseData>;
/**
 * Request parameters for update_address
 *
 * Use this API to update the address of a shop.
 */
export interface UpdateAddressRequest {
  /**
   * Unique identifier for the address. You can get the address_id via v2.logistics.get_address_list.
   */
  address_id: number;
  /**
   * The region of the address.Note: Do not allow to update the region of the address.
   */
  region?: string;
  /**
   * The state of the address.
   */
  state?: string;
  /**
   * The city of the address.
   */
  city?: string;
  /**
   * The district of the address.
   */
  district?: string;
  /**
   * The town of the address.
   */
  town?: string;
  /**
   * The detailed address description of the address.
   */
  address?: string;
  /**
   * The zipcode of the address.
   */
  zipcode?: string;
  /**
   * Recipient’s name at this address.
   */
  name?: string;
  /**
   * Contact phone number for the recipient.
   */
  phone?: string;
  /**
   * Geolocation information for the address. Type: JSON stringNote: 1) To clear existing geo info, pass "" or {}.2) To keep existing geo info, do not include this field.3) The JSON may include optional fields:- formattedAddress (string): full formatted address.- region (object) – contains latitude and longitude as floats.- user_verified (boolean) – whether the geolocation is verified by the user.- user_adjusted (boolean) – whether the geolocation was adjusted by the user.
   */
  geo_info?: string;
}
/**
 * Response data payload for update_address
 */
export type UpdateAddressResponseData = Record<string, never>;
/**
 * Response payload for update_address
 *
 * Use this API to update the address of a shop.
 */
export type UpdateAddressResponse = FetchResponse<UpdateAddressResponseData>;
/**
 * UpdateChannelAutoCallDriverSetting sub-interface for UpdateChannelRequest
 */
export interface UpdateChannelAutoCallDriverSetting {
  /**
   * Whether to enable Auto Call Driver for this logistic channel.
   */
  auto_call_driver_enabled?: boolean;
  /**
   * Used to set the Preparation Time for this channel, in minutes. Required when auto_call_driver_enabled = true.Note: Please ensure the passed preparation_time value falls within the preparation_time_limit range returned by v2.logistics.get_channel_list.
   */
  preparation_time?: number;
}
/**
 * Request parameters for update_channel
 *
 * Use this api to update shop level logistics channel's configuration.
 */
export interface UpdateChannelRequest {
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id: number;
  /**
   * Whether to enable this logistic channel.
   */
  enabled?: boolean;
  /**
   * Whether to enable COD for this logistic channel. Only COD supported channels are applicable.
   */
  cod_enabled?: boolean;
  auto_call_driver_setting?: UpdateChannelAutoCallDriverSetting;
}
/**
 * UpdateChannelUnsupportWarehouse sub-interface for UpdateChannelUpdatedChannel
 */
export interface UpdateChannelUnsupportWarehouse {
  /**
   * Unsupported warehouse ID
   */
  warehouse_id?: number;
  /**
   * Unsupported warehouse name
   */
  warehouse_name?: string;
}
/**
 * UpdateChannelUpdatedChannel sub-interface for UpdateChannelResponseData
 */
export interface UpdateChannelUpdatedChannel {
  /**
   * Logistics channel ID
   */
  channel_id?: number;
  /**
   * Logistics channel name
   */
  channel_display_name?: string;
  /**
   * List details of unsupported warehouses
   */
  unsupport_warehouse?: UpdateChannelUnsupportWarehouse[];
}
/**
 * UpdateChannelResponseData sub-interface for UpdateChannelResponse
 */
export interface UpdateChannelResponseData {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * Whether this logistic channel is enabled.
   */
  enabled?: boolean;
  /**
   * Whether COD is enabled for this channel.
   */
  cod_enabled?: boolean;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * List of channels that are updated in the operation (inclusive of dependent logistics channels)
   */
  updated_channels?: UpdateChannelUpdatedChannel[];
  is_multi_warehouse?: boolean;
  auto_call_driver_setting?: UpdateChannelAutoCallDriverSetting;
}
/**
 * Response payload for update_channel
 *
 * Use this api to update shop level logistics channel's configuration.
 */
export type UpdateChannelResponse = FetchResponse<UpdateChannelResponseData>;
/**
 * UpdateOperatingHoursMonday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursMonday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursTuesday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursTuesday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursWednesday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursWednesday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursThursday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursThursday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursFriday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursFriday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursSaturday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursSaturday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursSunday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursSunday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursPublicHoliday sub-interface for UpdateOperatingHoursRegularOperatingHour
 */
export interface UpdateOperatingHoursPublicHoliday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursRegularOperatingHour sub-interface for UpdateOperatingHoursRequest
 */
export interface UpdateOperatingHoursRegularOperatingHour {
  /**
   * Operating hours for Monday: You can skip this information if you want to mark the day as closed.
   */
  monday?: UpdateOperatingHoursMonday;
  /**
   * Operating hours for Tuesday: You can skip this information if you want to mark the day as closed.
   */
  tuesday?: UpdateOperatingHoursTuesday;
  /**
   * Operating hours for Wednesday: You can skip this information if you want to mark the day as closed.
   */
  wednesday?: UpdateOperatingHoursWednesday;
  /**
   * Operating hours for Thursday: You can skip this information if you want to mark the day as closed.
   */
  thursday?: UpdateOperatingHoursThursday;
  /**
   * Operating hours for Friday: You can skip this information if you want to mark the day as closed.
   */
  friday?: UpdateOperatingHoursFriday;
  /**
   * Operating hours for Saturday: You can skip this information if you want to mark the day as closed.
   */
  saturday?: UpdateOperatingHoursSaturday;
  /**
   * Operating hours for Sunday: You can skip this information if you want to mark the day as closed.
   */
  sunday?: UpdateOperatingHoursSunday;
  /**
   * Operating hours for public holiday: You can skip this information if you want to mark the day as closed.
   */
  public_holiday?: UpdateOperatingHoursPublicHoliday;
}
/**
 * UpdateOperatingHoursOperatingHour sub-interface for UpdateOperatingHoursSpecialOperatingHour
 */
export interface UpdateOperatingHoursOperatingHour {
  /**
   * Date: it should be include all date from start_date until end_date
   */
  date: string;
  /**
   * Start time for operating hours on that date:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
  /**
   * To specify this value as False if you're not operate on that date (close)
   */
  enable: boolean;
}
/**
 * UpdateOperatingHoursSpecialOperatingHour sub-interface for UpdateOperatingHoursRequest
 */
export interface UpdateOperatingHoursSpecialOperatingHour {
  /**
   * The name of Special Operating Hours
   */
  name: string;
  /**
   * The start date of the Special Operating Hours. The value should be within [today + 1] and [today + 365 days].
   */
  start_date: string;
  /**
   * The end date of the Special Operating Hours. The value should be within [start_date + 30 days]
   */
  end_date: string;
  /**
   * To specify the operating hours for each date
   */
  operating_hours: UpdateOperatingHoursOperatingHour[];
}
/**
 * UpdateOperatingHoursThrusday sub-interface for UpdateOperatingHoursInstantOperatingHour
 */
export interface UpdateOperatingHoursThrusday {
  /**
   * Start time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.
   */
  start_time: string;
  /**
   * End time for operating hours on that day:The time should be in the format XX:YY, where YY is either 00 or 30.Except for a 24-hour, you can input a start_time of 00:00 and an end_time of 23:59
   */
  end_time: string;
}
/**
 * UpdateOperatingHoursInstantOperatingHour sub-interface for UpdateOperatingHoursRequest
 */
export interface UpdateOperatingHoursInstantOperatingHour {
  /**
   * Operating hours for Monday: You can skip this information if you want to mark the day as closed.
   */
  monday?: UpdateOperatingHoursMonday;
  /**
   * Operating hours for Tuesday: You can skip this information if you want to mark the day as closed.
   */
  tuesday?: UpdateOperatingHoursTuesday;
  /**
   * Operating hours for Wednesday: You can skip this information if you want to mark the day as closed.
   */
  wednesday?: UpdateOperatingHoursWednesday;
  /**
   * Operating hours for Thursday: You can skip this information if you want to mark the day as closed.
   */
  thrusday?: UpdateOperatingHoursThrusday;
  /**
   * Operating hours for Friday: You can skip this information if you want to mark the day as closed.
   */
  friday?: UpdateOperatingHoursFriday;
  /**
   * Operating hours for Saturday: You can skip this information if you want to mark the day as closed.
   */
  saturday?: UpdateOperatingHoursSaturday;
  /**
   * Operating hours for Sunday: You can skip this information if you want to mark the day as closed.
   */
  sunday?: UpdateOperatingHoursSunday;
  /**
   * Operating hours for public holiday: You can skip this information if you want to mark the day as closed.
   */
  public_holiday?: UpdateOperatingHoursPublicHoliday;
}
/**
 * UpdateOperatingHoursShopCollectionOperatingHour sub-interface for UpdateOperatingHoursRequest
 */
export interface UpdateOperatingHoursShopCollectionOperatingHour {
  /**
   * Operating hours for Monday: You can skip this information if you want to mark the day as closed.
   */
  monday?: UpdateOperatingHoursMonday;
  /**
   * Operating hours for Tuesday: You can skip this information if you want to mark the day as closed.
   */
  tuesday?: UpdateOperatingHoursTuesday;
  /**
   * Operating hours for Wednesday: You can skip this information if you want to mark the day as closed.
   */
  wednesday?: UpdateOperatingHoursWednesday;
  /**
   * Operating hours for Thursday: You can skip this information if you want to mark the day as closed.
   */
  thursday?: UpdateOperatingHoursThursday;
  /**
   * Operating hours for Friday: You can skip this information if you want to mark the day as closed.
   */
  friday?: UpdateOperatingHoursFriday;
  /**
   * Operating hours for Saturday: You can skip this information if you want to mark the day as closed.
   */
  saturday?: UpdateOperatingHoursSaturday;
  /**
   * Operating hours for Sunday: You can skip this information if you want to mark the day as closed.
   */
  sunday?: UpdateOperatingHoursSunday;
  /**
   * Operating hours for Public Holiday: You can skip this information if you want to mark the day as closed.
   */
  public_holiday?: UpdateOperatingHoursPublicHoliday;
}
/**
 * Request parameters for update_operating_hours
 *
 * This API is designed to allow sellers to update their operating hours. It is essential that the values provided in this API align with the restrictions retrieved from the v2.logistics.get_operating_hour_restrictions API to ensure compliance with platform requirements. This API uses overwriting updates, when updating pickup operating hours, still need to include all parts even those not needing changes.
 */
export interface UpdateOperatingHoursRequest {
  /**
   * Details of Pickup Operating Hours / Preferred Pickup Hours: You can skip this parameter if you are not updating the Pickup Operating Hours / Preferred Pickup Hours
   */
  regular_operating_hour?: UpdateOperatingHoursRegularOperatingHour;
  /**
   * Details of Special Operating Hours : You can skip this parameter if you are not creating Special Operating Hours or if you do not have access to create Special Operating Hours
   */
  special_operating_hour?: UpdateOperatingHoursSpecialOperatingHour;
  /**
   * Details of Instant Operating Hours : You can skip this parameter if you are not creating/updating Instant Operating Hours or if you do not have access to create/update Instant Operating Hours
   */
  instant_operating_hour?: UpdateOperatingHoursInstantOperatingHour;
  /**
   * Details of Shop Collection Operating Hours : You can skip this parameter if you are not creating/updating Shop Collection Operating Hours or if you do not have access to create/update Shop Collection Operating Hours
   */
  shop_collection_operating_hour?: UpdateOperatingHoursShopCollectionOperatingHour;
}
/**
 * UpdateOperatingHours_UpdateOperatingHoursRegularOperatingHour sub-interface for UpdateOperatingHoursResult
 */
export interface UpdateOperatingHours_UpdateOperatingHoursRegularOperatingHour {
  /**
   * The system will return "Failed" if there are any validation errors. Otherwise, it will return a blank response.
   */
  status?: string;
  /**
   * Fail reason
   */
  fail_message?: string;
}
/**
 * UpdateOperatingHours_UpdateOperatingHoursSpecialOperatingHour sub-interface for UpdateOperatingHoursResult
 */
export interface UpdateOperatingHours_UpdateOperatingHoursSpecialOperatingHour {
  /**
   * The system will return "Failed" if there are any validation errors. Otherwise, it will return a blank response.
   */
  status?: string;
  /**
   * Fail reason
   */
  fail_message?: string;
}
/**
 * UpdateOperatingHours_UpdateOperatingHoursInstantOperatingHour sub-interface for UpdateOperatingHoursResult
 */
export interface UpdateOperatingHours_UpdateOperatingHoursInstantOperatingHour {
  /**
   * The system will return "Failed" if there are any validation errors. Otherwise, it will return a blank response.
   */
  status?: string;
  /**
   * Fail reason
   */
  fail_message?: string;
}
/**
 * UpdateOperatingHours_UpdateOperatingHoursShopCollectionOperatingHour sub-interface for UpdateOperatingHoursResult
 */
export interface UpdateOperatingHours_UpdateOperatingHoursShopCollectionOperatingHour {
  /**
   * The system will return "Failed" if there are any validation errors. Otherwise, it will return a blank response.
   */
  status?: string;
  /**
   * Fail reason
   */
  fail_message?: string;
}
/**
 * UpdateOperatingHoursResult sub-interface for UpdateOperatingHoursResponseData
 */
export interface UpdateOperatingHoursResult {
  /**
   * The result of create/update regular_operating_hour.
   */
  regular_operating_hour?: UpdateOperatingHours_UpdateOperatingHoursRegularOperatingHour;
  /**
   * The result of create/update speicial_operating_hour.
   */
  special_operating_hour?: UpdateOperatingHours_UpdateOperatingHoursSpecialOperatingHour;
  /**
   * The result of create/update instant_operating_hour.
   */
  instant_operating_hour?: UpdateOperatingHours_UpdateOperatingHoursInstantOperatingHour;
  /**
   * The result of create/update shop_collection_operating_hour.
   */
  shop_collection_operating_hour?: UpdateOperatingHours_UpdateOperatingHoursShopCollectionOperatingHour;
}
/**
 * UpdateOperatingHoursResponseData sub-interface for UpdateOperatingHoursResponse
 */
export interface UpdateOperatingHoursResponseData {
  result_list?: UpdateOperatingHoursResult[];
}
/**
 * Response payload for update_operating_hours
 *
 * This API is designed to allow sellers to update their operating hours. It is essential that the values provided in this API align with the restrictions retrieved from the v2.logistics.get_operating_hour_restrictions API to ensure compliance with platform requirements. This API uses overwriting updates, when updating pickup operating hours, still need to include all parts even those not needing changes.
 */
export type UpdateOperatingHoursResponse = FetchResponse<UpdateOperatingHoursResponseData>;
/**
 * Request parameters for update_self_collection_order_logistics
 *
 * Use this api to update the order status for buyer to collect the orders directly from your pharmacy. This includes indicating that order is ready for collection, and that the order has been picked up by the buyer. You should call v2.logistics.get_order_detail or v2.logistics.get_package_detail first to get the package_number of such orders.
 */
export interface UpdateSelfCollectionOrderLogisticsRequest {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number: string;
  /**
   * Order logistics action. available values:- ready_for_collection- order_collected
   */
  self_collection_logistics_action: string;
  /**
   * List of image_id for the proof that buyer already collected the order at the store. Required when self_collection_logistics_action is order_collected. Max: 3.You can call the v2.media.upload_image to upload image and get the image_id, for this scenario, please pass the business = 1 and scene = 1.
   */
  epoc_image_list?: string[];
  /**
   * PIN code required for prescription orders when buyer collects at your shop.
   */
  pin?: string;
}
/**
 * Response data payload for update_self_collection_order_logistics
 */
export type UpdateSelfCollectionOrderLogisticsResponseData = Record<string, never>;
/**
 * Response payload for update_self_collection_order_logistics
 *
 * Use this api to update the order status for buyer to collect the orders directly from your pharmacy. This includes indicating that order is ready for collection, and that the order has been picked up by the buyer. You should call v2.logistics.get_order_detail or v2.logistics.get_package_detail first to get the package_number of such orders.
 */
export type UpdateSelfCollectionOrderLogisticsResponse =
  FetchResponse<UpdateSelfCollectionOrderLogisticsResponseData>;
/**
 * UpdateShippingOrderPickup sub-interface for UpdateShippingOrderRequest
 */
export interface UpdateShippingOrderPickup {
  /**
   * The identity of address. Retrieved from get_shipping_parameter.
   */
  address_id: number;
  /**
   * The pickup time id. Retrieved from get_shipping_parameter.
   */
  pickup_time_id: string;
}
/**
 * Request parameters for update_shipping_order
 *
 * For pickup method only, use this api to update pickup address and pickup time for packages meet: 1) package's fulfillment status is LOGISTICS_PICKUP_RETRY; or 2) package's fulfillment status is 'LOGISTICS_REQUEST_CREATED' and meets the Instant Order Reschedule Pickup conditions.
 */
export interface UpdateShippingOrderRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number.
   */
  package_number?: string;
  /**
   * Required parameter ONLY if GetParameterForInit returns "pickup" or if GetLogisticsInfo returns "pickup" under "info_needed" for the same order. Developer should still include "pickup" field in the call even if "pickup" has empty value.
   */
  pickup: UpdateShippingOrderPickup;
}
/**
 * Response data payload for update_shipping_order
 */
export type UpdateShippingOrderResponseData = Record<string, never>;
/**
 * Response payload for update_shipping_order
 *
 * For pickup method only, use this api to update pickup address and pickup time for packages meet: 1) package's fulfillment status is LOGISTICS_PICKUP_RETRY; or 2) package's fulfillment status is 'LOGISTICS_REQUEST_CREATED' and meets the Instant Order Reschedule Pickup conditions.
 */
export type UpdateShippingOrderResponse = FetchResponse<UpdateShippingOrderResponseData>;
/**
 * Request parameters for update_tracking_status
 *
 * Only available for Brazil sellers. This API is only available for orders/parcels which are fulfilled by BR Seller Logistics channel (logistics_channel_id: 90021), Samsung (logistics_channel_id: 90025) and BR Instant Delivery channel (logistics_channel_id: 90026). The logistics_status will become LOGISTICS_REQUEST_CREATED after arrange shipment, and can call this API to update to: LOGISTICS_PICKUP_DONE, LOGISTICS_DELIVERY_DONE, LOGISTICS_DELIVERY_FAILED.
 */
export interface UpdateTrackingStatusRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Order tracking number, might help seller to identify his order on the tracking_URL.Can only be sent when updating logistics_status to "logistic_pickup_done".
   */
  tracking_number?: string;
  /**
   * Website's URL for order tracking with maximum length of 2048 characters.Can only be sent when updating logistics_status to "logistic_pickup_done".
   */
  tracking_url?: string;
  /**
   * Order status update support:- logistics_pickup_done- logistics_delivery_done- logistics_delivery_failed
   */
  logistics_status: string;
  /**
   * Only required when updating logistics_status to "logistics_delivery_failed". Only required for BR Instant Delivery channel (logistics_channel_id: 90026). Only accept the following values. - buyer_unreachable- buyer_unresponsive- no_delivery_location_consensus
   */
  failed_reason?: string;
}
/**
 * UpdateTrackingStatusResponseData sub-interface for UpdateTrackingStatusResponse
 */
export interface UpdateTrackingStatusResponseData {
  /**
   * Update results:- succeed- failed
   */
  update_result?: string;
}
/**
 * Response payload for update_tracking_status
 *
 * Only available for Brazil sellers. This API is only available for orders/parcels which are fulfilled by BR Seller Logistics channel (logistics_channel_id: 90021), Samsung (logistics_channel_id: 90025) and BR Instant Delivery channel (logistics_channel_id: 90026). The logistics_status will become LOGISTICS_REQUEST_CREATED after arrange shipment, and can call this API to update to: LOGISTICS_PICKUP_DONE, LOGISTICS_DELIVERY_DONE, LOGISTICS_DELIVERY_FAILED.
 */
export type UpdateTrackingStatusResponse = FetchResponse<UpdateTrackingStatusResponseData>;
/**
 * Request parameters for upload_serviceable_polygon
 *
 * Only available for Brazil sellers. Use this API to upload KML file for shop level serviceability setting for BR Entrega Turbo channel (Channel ID: 90026). Please note that multiple Outlet Shops under the same Mart Shop cannot have overlapping service areas.
 */
export interface UploadServiceablePolygonRequest {
  /**
   * The .kml file to be uploaded to denote the serviceability area of the shops.Note: Please refer to “KML file format for v2.logistics.upload_serviceable_polygon” to understand the structure specifications and upload requirements for KML files.
   */
  file: any;
}
/**
 * UploadServiceablePolygonResponseData sub-interface for UploadServiceablePolygonResponse
 */
export interface UploadServiceablePolygonResponseData {
  /**
   * Use the task_id to call v2.logistics.check_polygon_update_status to check if the upload job has been completed.
   */
  task_id?: string;
}
/**
 * Response payload for upload_serviceable_polygon
 *
 * Only available for Brazil sellers. Use this API to upload KML file for shop level serviceability setting for BR Entrega Turbo channel (Channel ID: 90026). Please note that multiple Outlet Shops under the same Mart Shop cannot have overlapping service areas.
 */
export type UploadServiceablePolygonResponse = FetchResponse<UploadServiceablePolygonResponseData>;
