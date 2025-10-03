import { BaseResponse } from "./base.js";

export type BindCourierDeliveryFirstMileTrackingNumberParamsOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there isn't a package number. */
  package_number?: string;
};

/**
 * Parameters for bind_courier_delivery_first_mile_tracking_number
 */
export type BindCourierDeliveryFirstMileTrackingNumberParams = {
  /** The shipment method for generate and bind orders. Available value:&nbsp;courier_delivery. */
  shipment_method: string;
  /** If using courier_delivery as the shipment method, the "binding_id" field should pass the value generated from&nbsp;v2.first_mile.generate_and_bind_first_mile_tracking_number. */
  binding_id: string;
  /** The list of order_sn. You can specify up to 50 order_sns in this call.&nbsp;One fm_tn maximum number of total bind orders is 10000. */
  order_list: BindCourierDeliveryFirstMileTrackingNumberParamsOrderList[];
};

export type BindFirstMileTrackingNumberParamsOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number. */
  package_number?: string;
};

/**
 * Parameters for bind_first_mile_tracking_number
 */
export type BindFirstMileTrackingNumberParams = {
  /** If using "pickup" or "self_deliver" as the shipment method the "first_mile_tracking_number" field should pass the value generated from v2.first_mile.generate_first_mile_tracking_number.If using "dropoff" as the shipment method the "first_mile_tracking_number" field should pass the tracking number provide by the supplier. */
  first_mile_tracking_number: string;
  /** The shipment method for bound orders, should be pickup, dropoff or self_deliver. */
  shipment_method: string;
  /** Use this field to specify the region you want to ship parcel.Available value: cn,kr.&nbsp;Please fill in the field according to the region of the Merchant to which the shop belongs. */
  region: string;
  /** The identity of first-mile logistic channel.If you using "dropoff" or "pickup" as shipment method, please call&nbsp;v2.first_mile.get_channel_list to get the logsitc_channel_id then fill it.If you using "self_deliver"as shipment method then the logistics_channel_id should be "null". */
  logistics_channel_id: number | null;
  /** The volume of the parcel. */
  volume?: number;
  /** The weight of the parcel. */
  weight?: number;
  /** The width of the parcel. */
  width?: number;
  /** The length of the parcel. */
  length?: number;
  /** The height of the parcel. */
  height?: number;
  /** The set of ordersn. You can specify up to 50 ordersns in this call.one fm_tn maximum number of total bind orders is 10000. */
  order_list: BindFirstMileTrackingNumberParamsOrderList[];
};

export type GenerateAndBindFirstMileTrackingNumberParamsOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order. You should fill the field with empty string when there isn't a package number. */
  package_number?: string;
};

export type GenerateAndBindFirstMileTrackingNumberParamsCourierDeliveryInfo = {
  /** The identity of address. Retrieved from v2.logistics.get_address_list, address_type need to be FIRST_MILE_PICKUP_ADDRESS. */
  address_id: number;
  /** The identity of transit warehouse address. Retrieved from&nbsp;v2.first_mile.get_transit_warehouse_list. */
  warehouse_id: string;
  /** The definition of logistics product ID:&nbsp;1010003 (kuaidi100 to C) - seller book courier pickup and pay offline1010004 (kuaidi100 prepaid(MP)) -&nbsp;seller can use prepaid account to place courier order, so prepaid_account_id is required */
  logistics_product_id: number;
  /** ID of prepaid account. Retrieved from&nbsp;v2.merchant.get_merchant_prepaid_account_list. */
  prepaid_account_id?: number;
  /** The identity of courier service. Retrieved from v2.first_mile.get_courier_delivery_channel_list. */
  courier_service_id: string;
};

/**
 * Parameters for generate_and_bind_first_mile_tracking_number
 */
export type GenerateAndBindFirstMileTrackingNumberParams = {
  /** The shipment method for generate and bind orders. Available value:&nbsp;courier_delivery. */
  shipment_method: string;
  /** Use this field to specify the region you want to ship parcel. Available value:&nbsp;CN. */
  region?: string;
  /** The list of order_sn. You can specify up to 50 order_sns in this call. One fm_tn maximum number of total bind orders is 10000. */
  order_list: GenerateAndBindFirstMileTrackingNumberParamsOrderList[];
  /** The set of information you need to generate FM tracking number and bind orders. */
  courier_delivery_info: GenerateAndBindFirstMileTrackingNumberParamsCourierDeliveryInfo;
};

/**
 * Parameters for generate_first_mile_tracking_number
 */
export type GenerateFirstMileTrackingNumberParams = {
  /** This field is used for seller to specify the declare time. */
  declare_date: string;
  /** The number of first-mile tracking numbers generated. Up to 20 first-mile tracking numbers can be generated for one declaration day. */
  quantity?: number;
};

/**
 * Parameters for get_channel_list
 */
export type GetChannelListParams = {
  /** Use this field to specify the region you want to ship parcel. Available value: CN, KR */
  region?: string;
};

/**
 * Parameters for get_courier_delivery_channel_list
 */
export type GetCourierDeliveryChannelListParams = {
  /** Use this field to specify the region you want to ship parcel. Available value: CN */
  region?: string;
};

/**
 * Parameters for get_courier_delivery_detail
 */
export type GetCourierDeliveryDetailParams = {
  /** Binding ID */
  binding_id: string;
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call. */
  cursor?: string;
  /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50]. */
  page_size?: number;
};

/**
 * Parameters for get_courier_delivery_tracking_number_list
 */
export type GetCourierDeliveryTrackingNumberListParams = {
  /** The start time of creation time */
  from_date: string;
  /** The end time of creation time */
  to_date: string;
  /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50] */
  page_size?: number;
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call. */
  cursor?: string;
};

/**
 * Parameters for get_courier_delivery_waybill
 */
export type GetCourierDeliveryWaybillParams = {
  /** Binding ID list of waybill. System limits maximum of Binding ID to 50.&nbsp;&nbsp; */
  binding_id_list: string[];
};

/**
 * Parameters for get_detail
 */
export type GetDetailParams = {
  /** The first mile tracking number. */
  first_mile_tracking_number: string;
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call. */
  cursor?: string;
};

/**
 * Parameters for get_tracking_number_list
 */
export type GetTrackingNumberListParams = {
  /** The start time of declare_date. */
  from_date: string;
  /** The end time of declare_date. */
  to_date: string;
  /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 50] */
  page_size?: number;
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call. */
  cursor?: string;
};

/**
 * Parameters for get_transit_warehouse_list
 */
export type GetTransitWarehouseListParams = {
  /** Use this field to specify the region you want to ship parcel. Available value:&nbsp;CN. */
  region?: string;
};

/**
 * Parameters for get_unbind_order_list
 */
export type GetUnbindOrderListParams = {
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call. */
  cursor?: string;
  /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. limit [1, 100] */
  page_size?: number;
  /** Indicate response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them. Available values: logistics_status,package_number. */
  response_optional_fields?: string;
};

/**
 * Parameters for get_waybill
 */
export type GetWaybillParams = {
  /** The first mile tracking number that you want to print waybill.limit [1, 50] */
  first_mile_tracking_number_list: string[];
};

export type UnbindFirstMileTrackingNumberParamsOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order. You should't fill the field with empty string when there is't a package number. */
  package_number?: string;
};

/**
 * Parameters for unbind_first_mile_tracking_number
 */
export type UnbindFirstMileTrackingNumberParams = {
  /** The identifier for an API request for error tracking. */
  first_mile_tracking_number: string;
  /** The list of order info you want to unbind from the given first mile tracking number.You can specify up to 50 orders in this call. */
  order_list: UnbindFirstMileTrackingNumberParamsOrderList[];
};

export type UnbindFirstMileTrackingNumberAllParamsOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order. You should fill the field with empty string when there isn't a package number. */
  package_number?: string;
};

/**
 * Parameters for unbind_first_mile_tracking_number_all
 */
export type UnbindFirstMileTrackingNumberAllParams = {
  /** The list of order info you want to unbind from the first mile tracking number or binding ID.&nbsp;You can specify up to 50 order_sns in this call. */
  order_list: UnbindFirstMileTrackingNumberAllParamsOrderList[];
};

export type BindCourierDeliveryFirstMileTrackingNumberResponseSuccessList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
};

export type BindCourierDeliveryFirstMileTrackingNumberResponseFailList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Indicate error type if one element hit error. */
  fail_error?: string;
  /** Indicate error details if one element hit error. */
  fail_message?: string;
};

/**
 * Response for bind_courier_delivery_first_mile_tracking_number
 */
export type BindCourierDeliveryFirstMileTrackingNumberResponse = BaseResponse & {
  response?: {
    /** Binding ID */
    binding_id?: string;
    success_list?: BindCourierDeliveryFirstMileTrackingNumberResponseSuccessList[];
    fail_list?: BindCourierDeliveryFirstMileTrackingNumberResponseFailList[];
  };
};

export type BindFirstMileTrackingNumberResponseOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Indicate error type if one element hit error. */
  fail_error?: string;
  /** Indicate error details if one element hit error. */
  fail_message?: string;
};

/**
 * Response for bind_first_mile_tracking_number
 */
export type BindFirstMileTrackingNumberResponse = BaseResponse & {
  response?: {
    /** The first mile tracking number */
    first_mile_tracking_number?: string;
    /** The list of orders. */
    order_list?: BindFirstMileTrackingNumberResponseOrderList[];
  };
};

export type GenerateAndBindFirstMileTrackingNumberResponseSuccessList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
};

export type GenerateAndBindFirstMileTrackingNumberResponseFailList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Indicate error type if one element hit error. */
  fail_error?: string;
  /** Indicate error details if one element hit error. */
  fail_message?: string;
};

/**
 * Response for generate_and_bind_first_mile_tracking_number
 */
export type GenerateAndBindFirstMileTrackingNumberResponse = BaseResponse & {
  response?: {
    /** Binding ID */
    binding_id?: string;
    success_list?: GenerateAndBindFirstMileTrackingNumberResponseSuccessList[];
    fail_list?: GenerateAndBindFirstMileTrackingNumberResponseFailList[];
  };
};

/**
 * Response for generate_first_mile_tracking_number
 */
export type GenerateFirstMileTrackingNumberResponse = BaseResponse & {
  response?: {
    /** The list of first mile tracking number that you generate */
    first_mile_tracking_number_list?: string[];
  };
};

export type GetChannelListResponseLogisticsChannelList = {
  /** The identity of logistic channel. */
  logistics_channel_id?: number;
  /** The name of logistic channel. */
  logistics_channel_name?: string;
  /** The shipment method for bound orders.Available values: pickup, dropoff, self_deliver. */
  shipment_method?: string;
};

/**
 * Response for get_channel_list
 */
export type GetChannelListResponse = BaseResponse & {
  response?: {
    logistics_channel_list?: GetChannelListResponseLogisticsChannelList[];
  };
};

export type GetCourierDeliveryChannelListResponseLogisticsChannelListCourierList = {
  /** The name of the courier. */
  courier_name?: string;
  /** The identity of the service provided by courier. */
  courier_service_id?: string;
  /** The name of the service provided by courier. */
  courier_service_name?: string;
};

export type GetCourierDeliveryChannelListResponseLogisticsChannelList = {
  /** The identity of logistics product ID:&nbsp;1010003: kuaidi100 to C1010004:&nbsp;kuaidi100 prepaid(MP) */
  logistics_product_id?: number;
  /** The name of logistics product ID:&nbsp;- kuaidi100 to C- kuaidi100 prepaid(MP) */
  logistics_product_name?: string;
  courier_list?: GetCourierDeliveryChannelListResponseLogisticsChannelListCourierList[];
};

/**
 * Response for get_courier_delivery_channel_list
 */
export type GetCourierDeliveryChannelListResponse = BaseResponse & {
  response?: {
    logistics_channel_list?: GetCourierDeliveryChannelListResponseLogisticsChannelList[];
  };
};

export type GetCourierDeliveryDetailResponseOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** The tracking number of SLS for orders/forders. */
  sls_tracking_number?: string;
  /** Use this filed to indicate whether the order has been picked up by carrier. */
  pick_up_done?: boolean;
  /** Use this filed to indicate whether the order has arrived at transit warehouse. */
  arrived_transit_warehouse?: boolean;
};

/**
 * Response for get_courier_delivery_detail
 */
export type GetCourierDeliveryDetailResponse = BaseResponse & {
  response?: {
    /** Binding ID */
    binding_id?: string;
    /** The first mile tracking number. */
    first_mile_tracking_number?: string;
    /** The logistics status for first-mile tracking number. Status could be:CANCELEDCANCELINGDELIVEREDNOT_AVAILABLEORDER_CREATEDORDER_RECEIVEDPICKED_UP */
    status?: string;
    /** The specified delivery date. */
    declare_date?: string;
    /** This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items. */
    more?: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false. */
    next_cursor?: string;
    order_list?: GetCourierDeliveryDetailResponseOrderList[];
  };
};

export type GetCourierDeliveryTrackingNumberListResponseTrackingNumberList = {
  /** The generated binding ID. */
  binding_id?: string;
  /** The generate first-mile tracking number, value might be blank. */
  first_mile_tracking_number?: string;
  /** The logistics status for first-mile tracking number. Status could be:CANCELEDCANCELINGDELIVEREDNOT_AVAILABLEORDER_CREATEDORDER_RECEIVEDPICKED_UPNote:&nbsp;NOT_AVAILABLE status means that Binding ID / First Mile Tracking Number is not yet bound with any order. */
  status?: string;
  /** Indicate the reason when Shopee failed to place courier order to 3PL (Kuaidi 100 supporting) or courier company cancelled the order.Note: Will be empty if status is not CANCELED. */
  reason?: string;
  /** The declare date of binding ID/first-mile tracking number. */
  declare_date?: string;
};

/**
 * Response for get_courier_delivery_tracking_number_list
 */
export type GetCourierDeliveryTrackingNumberListResponse = BaseResponse & {
  response?: {
    tracking_number_list?: GetCourierDeliveryTrackingNumberListResponseTrackingNumberList[];
    /** This is to indicate whether the tracking number list is more than one page. If this value is true, you may want to continue to check next page to retrieve tracking numbers. */
    more?: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false. */
    next_cursor?: string;
  };
};

export type GetCourierDeliveryWaybillResponseWaybillList = {
  /** Binding ID */
  binding_id?: string;
  /** URL for downloading waybill. */
  shipping_label_url?: string;
};

/**
 * Response for get_courier_delivery_waybill
 */
export type GetCourierDeliveryWaybillResponse = BaseResponse & {
  response?: {
    waybill_list?: GetCourierDeliveryWaybillResponseWaybillList[];
  };
};

export type GetDetailResponseOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** The tracking number of SLS for orders/forders. */
  sls_tracking_number?: string;
  /** Use this filed to indicate whether the order has been picked up by carrier. */
  pick_up_done?: boolean;
  /** Use this filed to indicate whether the order has arrived at transit warehouse. */
  arrived_transit_warehouse?: boolean;
};

/**
 * Response for get_detail
 */
export type GetDetailResponse = BaseResponse & {
  response?: {
    /** The identity of logistic channel. */
    logistics_channel_id?: number;
    /** The first-mile tracking number. */
    first_mile_tracking_number?: string;
    /** The shipment method for bound orders, should be pickup or dropoff. */
    shipment_method?: string;
    /** The logistics status for first-mile tracking number. Status could be: NOT_AVAILABLE,ORDER_CREATED,PICKED_UP,DELIVERED,ORDER_RECEIVED,CANCELING,CANCELED.NOT_AVAILABLE status means that either of the two scenarios has happened:1. First Mile Tracking Number in the request does not exist. (e.g., wrong format)2. First Mile Tracking Number is not yet bound with any order. */
    status?: string;
    /** The specified delivery date. */
    declare_date?: string;
    /** This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items. */
    more?: boolean;
    /** The list of order. */
    order_list?: GetDetailResponseOrderList[];
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false. */
    next_cursor?: string;
  };
};

export type GetTrackingNumberListResponseFirstMileTrackingNumberList = {
  /** The first-mile tracking number. */
  first_mile_tracking_number?: string;
  /** The logistics status for bound orders.NOT_AVAILABLE status means that First Mile Tracking Number is not yet bound with any order. */
  status?: string;
  /** The specified delivery date. */
  declare_date?: string;
};

/**
 * Response for get_tracking_number_list
 */
export type GetTrackingNumberListResponse = BaseResponse & {
  response?: {
    /** This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders. */
    more?: boolean;
    /** The first-mile tracking number. */
    first_mile_tracking_number_list?: GetTrackingNumberListResponseFirstMileTrackingNumberList[];
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false. */
    next_cursor?: string;
  };
};

export type GetTransitWarehouseListResponseTransitWarehouseList = {
  /** The identity of transit warehouse. */
  warehouse_id?: string;
  /** The name of transit warehouse in English. */
  warehouse_name_en?: string;
  /** The name of transit warehouse in Chinese. */
  warehouse_name_cn?: string;
};

/**
 * Response for get_transit_warehouse_list
 */
export type GetTransitWarehouseListResponse = BaseResponse & {
  response?: {
    transit_warehouse_list?: GetTransitWarehouseListResponseTransitWarehouseList[];
  };
};

export type GetUnbindOrderListResponseOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** The Shopee logistics status for the order. Applicable values: See Data Definition- LogisticsStatus. */
  logistics_status?: string;
};

/**
 * Response for get_unbind_order_list
 */
export type GetUnbindOrderListResponse = BaseResponse & {
  response?: {
    /** This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items. */
    more?: boolean;
    /** The result list of order you querying. */
    order_list?: GetUnbindOrderListResponseOrderList[];
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false. */
    next_cursor?: string;
  };
};

/**
 * Response for get_waybill
 */
export type GetWaybillResponse = BaseResponse & {
  response?: object;
};

export type UnbindFirstMileTrackingNumberResponseOrderList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Indicate error type if one element hit error. */
  fail_error?: string;
  /** Indicate error details if one element hit error. */
  fail_message?: string;
};

/**
 * Response for unbind_first_mile_tracking_number
 */
export type UnbindFirstMileTrackingNumberResponse = BaseResponse & {
  response?: {
    /** The first mile tracking number. */
    first_mile_tracking_number?: string;
    /** The binding result list of each order. */
    order_list?: UnbindFirstMileTrackingNumberResponseOrderList[];
  };
};

export type UnbindFirstMileTrackingNumberAllResponseSuccessList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Binding ID */
  binding_id?: string;
  /** The generated first-mile tracking number, value might be blank. */
  first_mile_tracking_number?: string;
};

export type UnbindFirstMileTrackingNumberAllResponseFailList = {
  /** Shopee's unique identifier for an order. */
  order_sn?: string;
  /** Shopee's unique identifier for the package under an order. */
  package_number?: string;
  /** Indicate error type if one element hit error. */
  fail_error?: string;
  /** Indicate error details if one element hit error. */
  fail_message?: string;
};

/**
 * Response for unbind_first_mile_tracking_number_all
 */
export type UnbindFirstMileTrackingNumberAllResponse = BaseResponse & {
  response?: {
    success_list?: UnbindFirstMileTrackingNumberAllResponseSuccessList[];
    fail_list?: UnbindFirstMileTrackingNumberAllResponseFailList[];
  };
};
