import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field Region
 */
export enum Region {
  CN = "CN",
  KR = "KR",
}
/**
 * Enum generated for field ShipmentMethod
 */
export enum ShipmentMethod {
  PICKUP = "pickup",
  DROPOFF = "dropoff",
  SELF_DELIVER = "self_deliver",
  COURIER_DELIVERY = "courier_delivery",
}
/**
 * Enum generated for field SlsTrackingNumber
 */
export enum SlsTrackingNumber {
  ORDERS = "orders",
  FORDERS = "forders",
}
/**
 * Enum generated for field DeclareDate
 */
export enum DeclareDate {
  ID = "ID",
  FIRST = "first",
}
/**
 * Enum generated for field ResponseOptionalFields
 */
export enum ResponseOptionalFields {
  LOGISTICS_STATUS = "logistics_status",
  PACKAGE_NUMBER = "package_number",
}
/**
 * BindCourierDeliveryFirstMileTrackingNumber_Order sub-interface for BindCourierDeliveryFirstMileTrackingNumberRequest
 */
export interface BindCourierDeliveryFirstMileTrackingNumber_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
}
/**
 * Request parameters for bind_courier_delivery_first_mile_tracking_number
 *
 * Use this api to bind first mile tracking number for courier delivery method.
 */
export interface BindCourierDeliveryFirstMileTrackingNumberRequest {
  /**
   * The shipment method for generate and bind orders. Available value: courier_delivery.
   */
  shipment_method: string;
  /**
   * If using courier_delivery as the shipment method, the "binding_id" field should pass the value generated from v2.first_mile.generate_and_bind_first_mile_tracking_number.
   */
  binding_id: string;
  /**
   * The list of order_sn. You can specify up to 50 order_sns in this call. One fm_tn maximum number of total bind orders is 10000.
   */
  order_list: BindCourierDeliveryFirstMileTrackingNumber_Order[];
}
/**
 * BindCourierDeliveryFirstMileTrackingNumber_Success sub-interface for BindCourierDeliveryFirstMileTrackingNumber_Response
 */
export interface BindCourierDeliveryFirstMileTrackingNumber_Success {
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
 * BindCourierDeliveryFirstMileTrackingNumber_Fail sub-interface for BindCourierDeliveryFirstMileTrackingNumber_Response
 */
export interface BindCourierDeliveryFirstMileTrackingNumber_Fail {
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
 * BindCourierDeliveryFirstMileTrackingNumber_Response sub-interface for BindCourierDeliveryFirstMileTrackingNumberResponse
 */
export interface BindCourierDeliveryFirstMileTrackingNumber_Response {
  /**
   * Binding ID
   */
  binding_id?: string;
  success_list?: BindCourierDeliveryFirstMileTrackingNumber_Success[];
  fail_list?: BindCourierDeliveryFirstMileTrackingNumber_Fail[];
}
/**
 * Response data payload for bind_courier_delivery_first_mile_tracking_number
 */
export type BindCourierDeliveryFirstMileTrackingNumberResponseData =
  BindCourierDeliveryFirstMileTrackingNumber_Response;
/**
 * Response payload for bind_courier_delivery_first_mile_tracking_number
 *
 * Use this api to bind first mile tracking number for courier delivery method.
 */
export type BindCourierDeliveryFirstMileTrackingNumberResponse =
  FetchResponse<BindCourierDeliveryFirstMileTrackingNumberResponseData>;
/**
 * BindFirstMileTrackingNumber_Order sub-interface for BindFirstMileTrackingNumberRequest
 */
export interface BindFirstMileTrackingNumber_Order {
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
 * Request parameters for bind_first_mile_tracking_number
 *
 * Use this api to bind first mile tracking number.
 */
export interface BindFirstMileTrackingNumberRequest {
  /**
   * If using "pickup" or "self_deliver" as the shipment method the "first_mile_tracking_number" field should pass the value generated from v2.first_mile.generate_first_mile_tracking_number.If using "dropoff" as the shipment method the "first_mile_tracking_number" field should pass the tracking number provide by the supplier.
   */
  first_mile_tracking_number: string;
  /**
   * The shipment method for bound orders, should be pickup, dropoff or self_deliver.
   */
  shipment_method: string;
  /**
   * Use this field to specify the region you want to ship parcel.Available value: cn,kr. Please fill in the field according to the region of the Merchant to which the shop belongs.
   */
  region: Region | string | number;
  /**
   * The identity of first-mile logistic channel.If you using "dropoff" or "pickup" as shipment method, please call v2.first_mile.get_channel_list to get the logsitc_channel_id then fill it.If you using "self_deliver"as shipment method then the logistics_channel_id should be "null".
   */
  logistics_channel_id: number;
  /**
   * The volume of the parcel.
   */
  volume?: number;
  /**
   * The weight of the parcel.
   */
  weight?: number;
  /**
   * The width of the parcel.
   */
  width?: number;
  /**
   * The length of the parcel.
   */
  length?: number;
  /**
   * The height of the parcel.
   */
  height?: number;
  /**
   * The set of ordersn. You can specify up to 50 ordersns in this call.one fm_tn maximum number of total bind orders is 10000.
   */
  order_list: BindFirstMileTrackingNumber_Order[];
  /**
   * The identity of transit warehouse address. Retrieved from v2.first_mile.get_transit_warehouse_list.Note: When the first-mile delivery mode is "Drop Off", this field is expected to be a required field. However, to avoid affecting your existing services, this field will be temporarily optional until April 30, 2026. Please complete the integration before then to avoid any impact on your services if it is changed to a required field later.
   */
  warehouse_id?: string;
  /**
   * Warehouse type. Retrieved from v2.first_mile.get_transit_warehouse_list.0 = normal warehouse1 = vendor warehouseNote: When the first-mile delivery mode is "Drop Off", this field is expected to be a required field. However, to avoid affecting your existing services, this field will be temporarily optional until April 30, 2026. Please complete the integration before then to avoid any impact on your services if it is changed to a required field later.
   */
  warehouse_type?: number;
}
/**
 * BindFirstMileTrackingNumber_Warning sub-interface for BindFirstMileTrackingNumberResponse
 */
export interface BindFirstMileTrackingNumber_Warning {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
}
/**
 * BindFirstMileTrackingNumber_BindFirstMileTrackingNumber_Order sub-interface for BindFirstMileTrackingNumber_Response
 */
export interface BindFirstMileTrackingNumber_BindFirstMileTrackingNumber_Order {
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
 * BindFirstMileTrackingNumber_Response sub-interface for BindFirstMileTrackingNumberResponse
 */
export interface BindFirstMileTrackingNumber_Response {
  /**
   * The first mile tracking number
   */
  first_mile_tracking_number?: string;
  /**
   * The list of orders.
   */
  order_list?: BindFirstMileTrackingNumber_BindFirstMileTrackingNumber_Order[];
}
/**
 * Response data payload for bind_first_mile_tracking_number
 */
export type BindFirstMileTrackingNumberResponseData = BindFirstMileTrackingNumber_Response;
/**
 * Response payload for bind_first_mile_tracking_number
 *
 * Use this api to bind first mile tracking number.
 */
export type BindFirstMileTrackingNumberResponse =
  FetchResponse<BindFirstMileTrackingNumberResponseData>;
/**
 * GenerateAndBindFirstMileTrackingNumber_Order sub-interface for GenerateAndBindFirstMileTrackingNumberRequest
 */
export interface GenerateAndBindFirstMileTrackingNumber_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
}
/**
 * GenerateAndBindFirstMileTrackingNumber_CourierDeliveryInfo sub-interface for GenerateAndBindFirstMileTrackingNumberRequest
 */
export interface GenerateAndBindFirstMileTrackingNumber_CourierDeliveryInfo {
  /**
   * The identity of address. Retrieved from v2.logistics.get_address_list, address_type need to be FIRST_MILE_PICKUP_ADDRESS.
   */
  address_id: number;
  /**
   * The identity of transit warehouse address. Retrieved from v2.first_mile.get_transit_warehouse_list.
   */
  warehouse_id: string;
  /**
   * The definition of logistics product ID: 1010003 (kuaidi100 to C) - seller book courier pickup and pay offline1010004 (kuaidi100 prepaid(MP)) - seller can use prepaid account to place courier order, so prepaid_account_id is required
   */
  logistics_product_id: number;
  /**
   * ID of prepaid account. Retrieved from v2.merchant.get_merchant_prepaid_account_list.
   */
  prepaid_account_id?: number;
  /**
   * The identity of courier service. Retrieved from v2.first_mile.get_courier_delivery_channel_list.
   */
  courier_service_id: string;
}
/**
 * Request parameters for generate_and_bind_first_mile_tracking_number
 *
 * Use this api to generate first mile tracking number for courier delivery method.
 */
export interface GenerateAndBindFirstMileTrackingNumberRequest {
  /**
   * The shipment method for generate and bind orders. Available value: courier_delivery.
   */
  shipment_method: string;
  /**
   * Use this field to specify the region you want to ship parcel. Available value: CN.
   */
  region?: string;
  /**
   * The list of order_sn. You can specify up to 50 order_sns in this call. One fm_tn maximum number of total bind orders is 10000.
   */
  order_list: GenerateAndBindFirstMileTrackingNumber_Order[];
  /**
   * The set of information you need to generate FM tracking number and bind orders.
   */
  courier_delivery_info: GenerateAndBindFirstMileTrackingNumber_CourierDeliveryInfo;
}
/**
 * GenerateAndBindFirstMileTrackingNumber_Success sub-interface for GenerateAndBindFirstMileTrackingNumber_Response
 */
export interface GenerateAndBindFirstMileTrackingNumber_Success {
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
 * GenerateAndBindFirstMileTrackingNumber_Fail sub-interface for GenerateAndBindFirstMileTrackingNumber_Response
 */
export interface GenerateAndBindFirstMileTrackingNumber_Fail {
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
 * GenerateAndBindFirstMileTrackingNumber_Response sub-interface for GenerateAndBindFirstMileTrackingNumberResponse
 */
export interface GenerateAndBindFirstMileTrackingNumber_Response {
  /**
   * Binding ID
   */
  binding_id?: string;
  success_list?: GenerateAndBindFirstMileTrackingNumber_Success[];
  fail_list?: GenerateAndBindFirstMileTrackingNumber_Fail[];
}
/**
 * Response data payload for generate_and_bind_first_mile_tracking_number
 */
export type GenerateAndBindFirstMileTrackingNumberResponseData =
  GenerateAndBindFirstMileTrackingNumber_Response;
/**
 * Response payload for generate_and_bind_first_mile_tracking_number
 *
 * Use this api to generate first mile tracking number for courier delivery method.
 */
export type GenerateAndBindFirstMileTrackingNumberResponse =
  FetchResponse<GenerateAndBindFirstMileTrackingNumberResponseData>;
/**
 * Request parameters for generate_first_mile_tracking_number
 *
 * Use this api to generate first mile tracking number.
 */
export interface GenerateFirstMileTrackingNumberRequest {
  /**
   * This field is used for seller to specify the declare time.
   */
  declare_date: string;
  /**
   * The number of first-mile tracking numbers generated. Up to 20 first-mile tracking numbers can be generated for one declaration day.
   */
  quantity?: number;
}
/**
 * GenerateFirstMileTrackingNumber_Response sub-interface for GenerateFirstMileTrackingNumberResponse
 */
export interface GenerateFirstMileTrackingNumber_Response {
  /**
   * The list of first mile tracking number that you generate
   */
  first_mile_tracking_number_list?: string[];
}
/**
 * Response data payload for generate_first_mile_tracking_number
 */
export type GenerateFirstMileTrackingNumberResponseData = GenerateFirstMileTrackingNumber_Response;
/**
 * Response payload for generate_first_mile_tracking_number
 *
 * Use this api to generate first mile tracking number.
 */
export type GenerateFirstMileTrackingNumberResponse =
  FetchResponse<GenerateFirstMileTrackingNumberResponseData>;
/**
 * Request parameters for get_channel_list
 *
 * Use this api to get first mile channel list.
 */
export interface GetChannelListRequest {
  /**
   * Use this field to specify the region you want to ship parcel. Available value: CN, KR
   */
  region?: Region | string | number;
}
/**
 * GetChannelList_LogisticsChannel sub-interface for GetChannelList_Response
 */
export interface GetChannelList_LogisticsChannel {
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The name of logistic channel.
   */
  logistics_channel_name?: string;
  /**
   * The shipment method for bound orders.Available values: pickup, dropoff, self_deliver.
   */
  shipment_method?: ShipmentMethod | string | number;
}
/**
 * GetChannelList_Response sub-interface for GetChannelListResponse
 */
export interface GetChannelList_Response {
  logistics_channel_list?: GetChannelList_LogisticsChannel[];
}
/**
 * Response data payload for get_channel_list
 */
export type GetChannelListResponseData = GetChannelList_Response;
/**
 * Response payload for get_channel_list
 *
 * Use this api to get first mile channel list.
 */
export type GetChannelListResponse = FetchResponse<GetChannelListResponseData>;
/**
 * Request parameters for get_courier_delivery_channel_list
 *
 * Use this api to get courier information for courier delivery method.
 */
export interface GetCourierDeliveryChannelListRequest {
  /**
   * Use this field to specify the region you want to ship parcel. Available value: CN
   */
  region?: string;
}
/**
 * GetCourierDeliveryChannelList_Courier sub-interface for GetCourierDeliveryChannelList_LogisticsChannel
 */
export interface GetCourierDeliveryChannelList_Courier {
  /**
   * The name of the courier.
   */
  courier_name?: string;
  /**
   * The identity of the service provided by courier.
   */
  courier_service_id?: string;
  /**
   * The name of the service provided by courier.
   */
  courier_service_name?: string;
}
/**
 * GetCourierDeliveryChannelList_LogisticsChannel sub-interface for GetCourierDeliveryChannelList_Response
 */
export interface GetCourierDeliveryChannelList_LogisticsChannel {
  /**
   * The identity of logistics product ID: 1010003: kuaidi100 to C1010004: kuaidi100 prepaid(MP)
   */
  logistics_product_id?: number;
  /**
   * The name of logistics product ID: - kuaidi100 to C- kuaidi100 prepaid(MP)
   */
  logistics_product_name?: string;
  courier_list?: GetCourierDeliveryChannelList_Courier[];
}
/**
 * GetCourierDeliveryChannelList_Response sub-interface for GetCourierDeliveryChannelListResponse
 */
export interface GetCourierDeliveryChannelList_Response {
  logistics_channel_list?: GetCourierDeliveryChannelList_LogisticsChannel[];
}
/**
 * Response data payload for get_courier_delivery_channel_list
 */
export type GetCourierDeliveryChannelListResponseData = GetCourierDeliveryChannelList_Response;
/**
 * Response payload for get_courier_delivery_channel_list
 *
 * Use this api to get courier information for courier delivery method.
 */
export type GetCourierDeliveryChannelListResponse =
  FetchResponse<GetCourierDeliveryChannelListResponseData>;
/**
 * Request parameters for get_courier_delivery_detail
 *
 * Use this api to get first mile detail for courier delivery method.
 */
export interface GetCourierDeliveryDetailRequest {
  /**
   * Binding ID
   */
  binding_id: string;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50].
   */
  page_size?: number;
}
/**
 * GetCourierDeliveryDetail_Order sub-interface for GetCourierDeliveryDetail_Response
 */
export interface GetCourierDeliveryDetail_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The tracking number of SLS for orders/forders.
   */
  sls_tracking_number?: SlsTrackingNumber | string | number;
  /**
   * Use this filed to indicate whether the order has been picked up by carrier.
   */
  pick_up_done?: boolean;
  /**
   * Use this filed to indicate whether the order has arrived at transit warehouse.
   */
  arrived_transit_warehouse?: boolean;
}
/**
 * GetCourierDeliveryDetail_Response sub-interface for GetCourierDeliveryDetailResponse
 */
export interface GetCourierDeliveryDetail_Response {
  /**
   * Binding ID
   */
  binding_id?: string;
  /**
   * The first mile tracking number.
   */
  first_mile_tracking_number?: string;
  /**
   * The logistics status for first-mile tracking number. Status could be:CANCELEDCANCELINGDELIVEREDNOT_AVAILABLEORDER_CREATEDORDER_RECEIVEDPICKED_UP
   */
  status?: string;
  /**
   * The specified delivery date.
   */
  declare_date?: string;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
  order_list?: GetCourierDeliveryDetail_Order[];
}
/**
 * Response data payload for get_courier_delivery_detail
 */
export type GetCourierDeliveryDetailResponseData = GetCourierDeliveryDetail_Response;
/**
 * Response payload for get_courier_delivery_detail
 *
 * Use this api to get first mile detail for courier delivery method.
 */
export type GetCourierDeliveryDetailResponse = FetchResponse<GetCourierDeliveryDetailResponseData>;
/**
 * Request parameters for get_courier_delivery_tracking_number_list
 *
 * Use this api to get tracking number for courier delivery method.
 */
export interface GetCourierDeliveryTrackingNumberListRequest {
  /**
   * The start time of creation time
   */
  from_date: string;
  /**
   * The end time of creation time
   */
  to_date: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50]
   */
  page_size?: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
}
/**
 * GetCourierDeliveryTrackingNumberList_TrackingNumber sub-interface for GetCourierDeliveryTrackingNumberList_Response
 */
export interface GetCourierDeliveryTrackingNumberList_TrackingNumber {
  /**
   * The generated binding ID.
   */
  binding_id?: string;
  /**
   * The generate first-mile tracking number, value might be blank.
   */
  first_mile_tracking_number?: string;
  /**
   * The logistics status for first-mile tracking number. Status could be:CANCELEDCANCELINGDELIVEREDNOT_AVAILABLEORDER_CREATEDORDER_RECEIVEDPICKED_UPNote: NOT_AVAILABLE status means that Binding ID / First Mile Tracking Number is not yet bound with any order.
   */
  status?: string;
  /**
   * Indicate the reason when Shopee failed to place courier order to 3PL (Kuaidi 100 supporting) or courier company cancelled the order.Note: Will be empty if status is not CANCELED.
   */
  reason?: string;
  /**
   * The declare date of binding ID/first-mile tracking number.
   */
  declare_date?: DeclareDate | string | number;
}
/**
 * GetCourierDeliveryTrackingNumberList_Response sub-interface for GetCourierDeliveryTrackingNumberListResponse
 */
export interface GetCourierDeliveryTrackingNumberList_Response {
  tracking_number_list?: GetCourierDeliveryTrackingNumberList_TrackingNumber[];
  /**
   * This is to indicate whether the tracking number list is more than one page. If this value is true, you may want to continue to check next page to retrieve tracking numbers.
   */
  more?: boolean;
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_courier_delivery_tracking_number_list
 */
export type GetCourierDeliveryTrackingNumberListResponseData =
  GetCourierDeliveryTrackingNumberList_Response;
/**
 * Response payload for get_courier_delivery_tracking_number_list
 *
 * Use this api to get tracking number for courier delivery method.
 */
export type GetCourierDeliveryTrackingNumberListResponse =
  FetchResponse<GetCourierDeliveryTrackingNumberListResponseData>;
/**
 * Request parameters for get_courier_delivery_waybill
 *
 * Use this api to get first mile waybill file for courier delivery method.
 */
export interface GetCourierDeliveryWaybillRequest {
  /**
   * Binding ID list of waybill. System limits maximum of Binding ID to 50.
   */
  binding_id_list: string[];
}
/**
 * GetCourierDeliveryWaybill_Waybill sub-interface for GetCourierDeliveryWaybill_Response
 */
export interface GetCourierDeliveryWaybill_Waybill {
  /**
   * Binding ID
   */
  binding_id?: string;
  /**
   * URL for downloading waybill.
   */
  shipping_label_url?: string;
}
/**
 * GetCourierDeliveryWaybill_Response sub-interface for GetCourierDeliveryWaybillResponse
 */
export interface GetCourierDeliveryWaybill_Response {
  waybill_list?: GetCourierDeliveryWaybill_Waybill[];
}
/**
 * Response data payload for get_courier_delivery_waybill
 */
export type GetCourierDeliveryWaybillResponseData = GetCourierDeliveryWaybill_Response;
/**
 * Response payload for get_courier_delivery_waybill
 *
 * Use this api to get first mile waybill file for courier delivery method.
 */
export type GetCourierDeliveryWaybillResponse =
  FetchResponse<GetCourierDeliveryWaybillResponseData>;
/**
 * Request parameters for get_detail
 *
 * Use this api to get first mile detail.
 */
export interface GetDetailRequest {
  /**
   * The first mile tracking number.
   */
  first_mile_tracking_number: string;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
}
/**
 * GetDetail_Order sub-interface for GetDetail_Response
 */
export interface GetDetail_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The tracking number of SLS for orders/forders.
   */
  sls_tracking_number?: SlsTrackingNumber | string | number;
  /**
   * Use this filed to indicate whether the order has been picked up by carrier.
   */
  pick_up_done?: boolean;
  /**
   * Use this filed to indicate whether the order has arrived at transit warehouse.
   */
  arrived_transit_warehouse?: boolean;
}
/**
 * GetDetail_Response sub-interface for GetDetailResponse
 */
export interface GetDetail_Response {
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The first-mile tracking number.
   */
  first_mile_tracking_number?: string;
  /**
   * The shipment method for bound orders, should be pickup or dropoff.
   */
  shipment_method?: string;
  /**
   * The logistics status for first-mile tracking number. Status could be: NOT_AVAILABLE,ORDER_CREATED,PICKED_UP,DELIVERED,ORDER_RECEIVED,CANCELING,CANCELED.NOT_AVAILABLE status means that either of the two scenarios has happened:1. First Mile Tracking Number in the request does not exist. (e.g., wrong format)2. First Mile Tracking Number is not yet bound with any order.
   */
  status?: string;
  /**
   * The specified delivery date.
   */
  declare_date?: string;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  /**
   * The list of order.
   */
  order_list?: GetDetail_Order[];
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_detail
 */
export type GetDetailResponseData = GetDetail_Response;
/**
 * Response payload for get_detail
 *
 * Use this api to get first mile detail.
 */
export type GetDetailResponse = FetchResponse<GetDetailResponseData>;
/**
 * Request parameters for get_tracking_number_list
 *
 * Use this api to get first mile tracking number list.
 */
export interface GetTrackingNumberListRequest {
  /**
   * The start time of declare_date.
   */
  from_date: string;
  /**
   * The end time of declare_date.
   */
  to_date: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50]
   */
  page_size?: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
}
/**
 * GetTrackingNumberList_FirstMileTrackingNumber sub-interface for GetTrackingNumberList_Response
 */
export interface GetTrackingNumberList_FirstMileTrackingNumber {
  /**
   * The first-mile tracking number.
   */
  first_mile_tracking_number?: string;
  /**
   * The logistics status for bound orders.NOT_AVAILABLE status means that First Mile Tracking Number is not yet bound with any order.
   */
  status?: string;
  /**
   * The specified delivery date.
   */
  declare_date?: string;
}
/**
 * GetTrackingNumberList_Response sub-interface for GetTrackingNumberListResponse
 */
export interface GetTrackingNumberList_Response {
  /**
   * This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  more?: boolean;
  /**
   * The first-mile tracking number.
   */
  first_mile_tracking_number_list?: GetTrackingNumberList_FirstMileTrackingNumber[];
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_tracking_number_list
 */
export type GetTrackingNumberListResponseData = GetTrackingNumberList_Response;
/**
 * Response payload for get_tracking_number_list
 *
 * Use this api to get first mile tracking number list.
 */
export type GetTrackingNumberListResponse = FetchResponse<GetTrackingNumberListResponseData>;
/**
 * Request parameters for get_transit_warehouse_list
 *
 * Use this api to get transit warehouse list which is used for first mile tracking number generation for courier delivery method.
 */
export interface GetTransitWarehouseListRequest {
  /**
   * Use this field to specify the region you want to ship parcel. Available value: CN.
   */
  region?: string;
  /**
   * Use this field to specify the shipment method you want to ship parcel. Available value: pickup, dropoff, self_deliver, courier_delivery.Note: Only when shipment_method = dropoff, the API response will include warehouses where warehouse_type = 1 (vendor warehouse).
   */
  shipment_method?: ShipmentMethod | string | number;
}
/**
 * GetTransitWarehouseList_TransitWarehouse sub-interface for GetTransitWarehouseList_Response
 */
export interface GetTransitWarehouseList_TransitWarehouse {
  /**
   * The identity of transit warehouse.
   */
  warehouse_id?: string;
  /**
   * The name of transit warehouse in English.
   */
  warehouse_name_en?: string;
  /**
   * The name of transit warehouse in Chinese.
   */
  warehouse_name_cn?: string;
  /**
   * Warehouse type: 0 = normal warehouse1 = vendor warehouseNote: Only when shipment_method = dropoff, the API response will include warehouses where warehouse_type = 1 (vendor warehouse).
   */
  warehouse_type?: number;
}
/**
 * GetTransitWarehouseList_Response sub-interface for GetTransitWarehouseListResponse
 */
export interface GetTransitWarehouseList_Response {
  transit_warehouse_list?: GetTransitWarehouseList_TransitWarehouse[];
}
/**
 * Response data payload for get_transit_warehouse_list
 */
export type GetTransitWarehouseListResponseData = GetTransitWarehouseList_Response;
/**
 * Response payload for get_transit_warehouse_list
 *
 * Use this api to get transit warehouse list which is used for first mile tracking number generation for courier delivery method.
 */
export type GetTransitWarehouseListResponse = FetchResponse<GetTransitWarehouseListResponseData>;
/**
 * Request parameters for get_unbind_order_list
 *
 * Use this api to get unbind order list. It will only return orders unbound to first-mile that were created within the past 6 months.
 */
export interface GetUnbindOrderListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 100]
   */
  page_size?: number;
  /**
   * Indicate response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them.  Available values: logistics_status,package_number.
   */
  response_optional_fields?: ResponseOptionalFields | string | number;
}
/**
 * GetUnbindOrderList_Order sub-interface for GetUnbindOrderList_Response
 */
export interface GetUnbindOrderList_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The Shopee logistics status for the order. Applicable values: See Data Definition- LogisticsStatus.
   */
  logistics_status?: string;
}
/**
 * GetUnbindOrderList_Response sub-interface for GetUnbindOrderListResponse
 */
export interface GetUnbindOrderList_Response {
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  /**
   * The result list of order you querying.
   */
  order_list?: GetUnbindOrderList_Order[];
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_unbind_order_list
 */
export type GetUnbindOrderListResponseData = GetUnbindOrderList_Response;
/**
 * Response payload for get_unbind_order_list
 *
 * Use this api to get unbind order list. It will only return orders unbound to first-mile that were created within the past 6 months.
 */
export type GetUnbindOrderListResponse = FetchResponse<GetUnbindOrderListResponseData>;
/**
 * Request parameters for get_waybill
 *
 * Use this api to get first mile waybill file.
 */
export interface GetWaybillRequest {
  /**
   * The first mile tracking number that you want to print waybill.limit [1, 50]
   */
  first_mile_tracking_number_list: string[];
}
/**
 * Response data payload for get_waybill
 */
export interface GetWaybillResponseData {
  /**
   * The waybill file.
   */
  waybill?: any;
}
/**
 * Response payload for get_waybill
 *
 * Use this api to get first mile waybill file.
 */
export type GetWaybillResponse = FetchResponse<GetWaybillResponseData>;
/**
 * UnbindFirstMileTrackingNumber_Order sub-interface for UnbindFirstMileTrackingNumberRequest
 */
export interface UnbindFirstMileTrackingNumber_Order {
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
 * Request parameters for unbind_first_mile_tracking_number
 *
 * Use this api to unbind first mile.
 */
export interface UnbindFirstMileTrackingNumberRequest {
  /**
   * The identifier for an API request for error tracking.
   */
  first_mile_tracking_number: string;
  /**
   * The list of order info you want to unbind from the given first mile tracking number.You can specify up to 50 orders in this call.
   */
  order_list: UnbindFirstMileTrackingNumber_Order[];
}
/**
 * UnbindFirstMileTrackingNumber_Warning sub-interface for UnbindFirstMileTrackingNumberResponse
 */
export interface UnbindFirstMileTrackingNumber_Warning {
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
 * UnbindFirstMileTrackingNumber_UnbindFirstMileTrackingNumber_Order sub-interface for UnbindFirstMileTrackingNumber_Response
 */
export interface UnbindFirstMileTrackingNumber_UnbindFirstMileTrackingNumber_Order {
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
 * UnbindFirstMileTrackingNumber_Response sub-interface for UnbindFirstMileTrackingNumberResponse
 */
export interface UnbindFirstMileTrackingNumber_Response {
  /**
   * The first mile tracking number.
   */
  first_mile_tracking_number?: string;
  /**
   * The binding result list of each order.
   */
  order_list?: UnbindFirstMileTrackingNumber_UnbindFirstMileTrackingNumber_Order[];
}
/**
 * Response data payload for unbind_first_mile_tracking_number
 */
export type UnbindFirstMileTrackingNumberResponseData = UnbindFirstMileTrackingNumber_Response;
/**
 * Response payload for unbind_first_mile_tracking_number
 *
 * Use this api to unbind first mile.
 */
export type UnbindFirstMileTrackingNumberResponse =
  FetchResponse<UnbindFirstMileTrackingNumberResponseData>;
/**
 * UnbindFirstMileTrackingNumberAll_Order sub-interface for UnbindFirstMileTrackingNumberAllRequest
 */
export interface UnbindFirstMileTrackingNumberAll_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order. You should fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
}
/**
 * Request parameters for unbind_first_mile_tracking_number_all
 *
 * Use this api to unbind orders from first mile tracking number or binding ID.
 */
export interface UnbindFirstMileTrackingNumberAllRequest {
  /**
   * The list of order info you want to unbind from the first mile tracking number or binding ID. You can specify up to 50 order_sns in this call.
   */
  order_list: UnbindFirstMileTrackingNumberAll_Order[];
}
/**
 * UnbindFirstMileTrackingNumberAll_Success sub-interface for UnbindFirstMileTrackingNumberAll_Response
 */
export interface UnbindFirstMileTrackingNumberAll_Success {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * Binding ID
   */
  binding_id?: string;
  /**
   * The generated first-mile tracking number, value might be blank.
   */
  first_mile_tracking_number?: string;
}
/**
 * UnbindFirstMileTrackingNumberAll_Fail sub-interface for UnbindFirstMileTrackingNumberAll_Response
 */
export interface UnbindFirstMileTrackingNumberAll_Fail {
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
 * UnbindFirstMileTrackingNumberAll_Response sub-interface for UnbindFirstMileTrackingNumberAllResponse
 */
export interface UnbindFirstMileTrackingNumberAll_Response {
  success_list?: UnbindFirstMileTrackingNumberAll_Success[];
  fail_list?: UnbindFirstMileTrackingNumberAll_Fail[];
}
/**
 * Response data payload for unbind_first_mile_tracking_number_all
 */
export type UnbindFirstMileTrackingNumberAllResponseData =
  UnbindFirstMileTrackingNumberAll_Response;
/**
 * Response payload for unbind_first_mile_tracking_number_all
 *
 * Use this api to unbind orders from first mile tracking number or binding ID.
 */
export type UnbindFirstMileTrackingNumberAllResponse =
  FetchResponse<UnbindFirstMileTrackingNumberAllResponseData>;
