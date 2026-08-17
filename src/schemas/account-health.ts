import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_late_orders
 *
 * Get the Late Orders to take action to avoid order cancellation and penalty points.
 */
export interface GetLateOrdersRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. Default is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100. Default is 10.
   */
  page_size?: number;
}
/**
 * GetLateOrders_LateOrder sub-interface for GetLateOrders_Response
 */
export interface GetLateOrders_LateOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Shipping Deadline of this order.
   */
  shipping_deadline?: Date | number;
  /**
   * Late-by Days of this order.
   */
  late_by_days?: number;
}
/**
 * GetLateOrders_Response sub-interface for GetLateOrdersResponse
 */
export interface GetLateOrders_Response {
  /**
   * Late Orders.
   */
  late_order_list?: GetLateOrders_LateOrder[];
  /**
   * Total number of late orders.
   */
  total_count?: number;
}
/**
 * Response data payload for get_late_orders
 */
export type GetLateOrdersResponseData = GetLateOrders_Response;
/**
 * Response payload for get_late_orders
 *
 * Get the Late Orders to take action to avoid order cancellation and penalty points.
 */
export type GetLateOrdersResponse = FetchResponse<GetLateOrdersResponseData>;
/**
 * Request parameters for get_listings_with_issues
 *
 * Get the Problematic Listings to improve the listings to avoid incurring penalty points.
 */
export interface GetListingsWithIssuesRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. Default is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100. Default is 10.
   */
  page_size?: number;
}
/**
 * GetListingsWithIssues_Listing sub-interface for GetListingsWithIssues_Response
 */
export interface GetListingsWithIssues_Listing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Reason of this item. Applicable values: 1: Prohibited2: Counterfeit3: Spam4: Inappropriate Image5: Insufficient Info6: Mall Listing Improvement7: Other Listing Improvement
   */
  reason?: number;
}
/**
 * GetListingsWithIssues_Response sub-interface for GetListingsWithIssuesResponse
 */
export interface GetListingsWithIssues_Response {
  /**
   * Listing with issues.
   */
  listing_list?: GetListingsWithIssues_Listing[];
  /**
   * Total number of listing with issues.
   */
  total_count?: number;
}
/**
 * Response data payload for get_listings_with_issues
 */
export type GetListingsWithIssuesResponseData = GetListingsWithIssues_Response;
/**
 * Response payload for get_listings_with_issues
 *
 * Get the Problematic Listings to improve the listings to avoid incurring penalty points.
 */
export type GetListingsWithIssuesResponse = FetchResponse<GetListingsWithIssuesResponseData>;
/**
 * Request parameters for get_metric_source_detail
 *
 * Get the Affected Orders / Relevant Listings / Relevant Violations details of metrics.
 */
export interface GetMetricSourceDetailRequest {
  /**
   * ID of metric. Supported values: 1: Late Shipment Rate (All Channels)3: Non-Fulfilment Rate (All Channels)4: Preparation Time12: Pre-order Listing %15: Days of Pre-order Listing Violation25: Fast Handover Rate28: On-time Pickup Failure Rate Violation Value42: Cancellation Rate (All Channels)43: Return-refund Rate (All Channels)52: Severe Listing Violations53: Other Listing Violations85: Late Shipment Rate (NDD)88: Non-fulfilment Rate (NDD91: Cancellation Rate (NDD)92: Return-refund Rate (NDD)96: % SDD Listings97: % NDD Listings2001: Fast Handover Rate - SLS2002: Fast Handover Rate - FBS2003: Fast Handover Rate - 3PF2030: % HD Listings2031: % HD Free Shipping Enabled2032: Saturday Shipment2033: Preparation Time PS2033: Preparation Time PS2036: OTDR Logistic Rate2037: OTDR DD Rate
   */
  metric_id: number;
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. Default is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100. Default is 10.
   */
  page_size?: number;
}
/**
 * GetMetricSourceDetail_NfrOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_NfrOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Non-fulfilment type. Applicable values: 1: System Cancellation2: Seller Cancellation3: Return Refunds
   */
  non_fulfillment_type?: number;
  /**
   * Reason. Applicable values: 1001: Return Refund1002: Parcel Split Cancellation1003: First Mile Pick up fail1004: Order inclusion10005: Out of Stock10006: Undeliverable area10007: Cannot support COD10008: Logistics request cancelled10009: Logistics pickup failed10010: Logistics not ready10011: Inactive seller10012: Seller did not ship order10013: Order did not reach warehouse10014: Seller asked to cancel10015: Non-receipt10016: Wrong item10017: Damaged item10018: Incomplete product10019: Fake item10020: Functional Damage10021: Return Refund
   */
  detailed_reason?: number;
}
/**
 * GetMetricSourceDetail_CancellationOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_CancellationOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Cancellation Type. Applicable values: 1: System Cancellation2: Seller Cancellation
   */
  cancellation_type?: number;
  /**
   * Reason. Applicable values: 1001: Return Refund1002: Parcel Split Cancellation1003: First Mile Pick up fail1004: Order inclusion10005: Out of Stock10006: Undeliverable area10007: Cannot support COD10008: Logistics request cancelled10009: Logistics pickup failed10010: Logistics not ready10011: Inactive seller10012: Seller did not ship order10013: Order did not reach warehouse10014: Seller asked to cancel10015: Non-receipt10016: Wrong item10017: Damaged item10018: Incomplete product10019: Fake item10020: Functional Damage10021: Return Refund
   */
  detailed_reason?: number;
}
/**
 * GetMetricSourceDetail_ReturnRefundOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_ReturnRefundOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Reason. Applicable values: 1001: Return Refund1002: Parcel Split Cancellation1003: First Mile Pick up fail1004: Order inclusion10005: Out of Stock10006: Undeliverable area10007: Cannot support COD10008: Logistics request cancelled10009: Logistics pickup failed10010: Logistics not ready10011: Inactive seller10012: Seller did not ship order10013: Order did not reach warehouse10014: Seller asked to cancel10015: Non-receipt10016: Wrong item10017: Damaged item10018: Incomplete product10019: Fake item10020: Functional Damage10021: Return Refund
   */
  detailed_reason?: number;
}
/**
 * GetMetricSourceDetail_LsrOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_LsrOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Ship by date.
   */
  shipping_deadline?: Date | number;
  /**
   * Seller arrange shipment time.
   */
  actual_shipping_time?: Date | number;
  /**
   * Late-by Days.
   */
  late_by_days?: number;
  /**
   * Courier actual pick up time.
   */
  actual_pick_up_time?: Date | number;
  /**
   * Logistics Company.
   */
  shipping_channel?: string;
  /**
   * First mile shipping type. Applicable values:PickupDrop off
   */
  first_mile_type?: string;
  /**
   * Diagnosis of the issue.
   */
  diagnosis_scenario?: string[];
}
/**
 * GetMetricSourceDetail_FhrOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_FhrOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Parcel ID.
   */
  parcel_id?: number;
  /**
   * Display Parcel ID.
   */
  parcel_display_id?: string;
  /**
   * Confirmed Date.
   */
  confirm_time?: Date | number;
  /**
   * Handover Deadline.
   */
  handover_deadline?: Date | number;
  /**
   * Fast Handover Due Date.
   */
  fast_handover_due_date?: Date | number;
  /**
   * Seller arrange pick up time.
   */
  arrange_pick_up_time?: Date | number;
  /**
   * Parcel drop off / pickup time.
   */
  handover_time?: Date | number;
  /**
   * Logistics Company.
   */
  shipping_channel?: string;
  /**
   * First mile shipping type. Applicable values:PickupDrop off
   */
  first_mile_type?: string;
  /**
   * First Mile Tracking No.
   */
  first_mile_tracking_no?: string;
  /**
   * Diagnosis of the issue.
   */
  diagnosis_scenario?: string[];
}
/**
 * GetMetricSourceDetail_OpfrDayDetailData sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_OpfrDayDetailData {
  /**
   * Date.
   */
  date?: string;
  /**
   * Number of scheduled pickups.
   */
  scheduled_pickup_num?: number;
  /**
   * Number of failed pickups.
   */
  failed_pickup_num?: number;
  /**
   * OPFR.
   */
  opfr?: number;
  /**
   * Target.
   */
  target?: string;
}
/**
 * GetMetricSourceDetail_ViolationListing sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_ViolationListing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Reason. Applicable values: 1: Prohibited2: Counterfeit3: Spam4: Inappropriate Image5: Insufficient Info6: Mall Listing Improvement7: Other Listing Improvement8: PQR Products
   */
  detailed_reason?: number;
  /**
   * Updated on.
   */
  update_time?: Date | number;
}
/**
 * GetMetricSourceDetail_PreOrderListingViolationData sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_PreOrderListingViolationData {
  /**
   * Date.
   */
  date?: string;
  /**
   * Number of Live Listings.
   */
  live_listing_count?: number[];
  /**
   * Number of pre-order Listings.
   */
  pre_order_listing_count?: number[];
  /**
   * Pre-order Listing %.
   */
  pre_order_listing_rate?: number[];
  /**
   * Target.
   */
  target?: string;
}
/**
 * GetMetricSourceDetail_PreOrderListing sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_PreOrderListing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Current Pre-order Status. Applicable values: 1: Yes2: No
   */
  current_pre_order_status?: number;
}
/**
 * GetMetricSourceDetail_SddListing sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_SddListing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Current SDD Status. Applicable values: 1: Yes0: No
   */
  current_sdd_status?: number;
}
/**
 * GetMetricSourceDetail_NddListing sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_NddListing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * Current NDD Status. Applicable values: 1: Yes0: No
   */
  current_ndd_status?: number;
}
/**
 * GetMetricSourceDetail_AptOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_AptOrder {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Order Paid Time.
   */
  order_create_time?: Date | number;
  /**
   * Seller arrange pick up time.
   */
  arrange_pick_up_time?: Date | number;
  /**
   * Courier actual pick up time.
   */
  actual_pick_up_time?: Date | number;
  /**
   * Preparation Days.
   */
  preparation_days?: number;
  /**
   * Logistics Company.
   */
  shipping_channel?: string;
  /**
   * First mile shipping type. Applicable values:PickupDrop off
   */
  first_mile_type?: string;
  /**
   * First Mile Tracking No.
   */
  first_mile_tracking_no?: string;
}
/**
 * GetMetricSourceDetail_HdListing sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_HdListing {
  /**
   * Item ID.
   */
  item_id?: number;
  /**
   * For 2030: % HD Listings, it refer to Current HD Status.For 2031: % HD Free Shipping Enabled, it refer to Free Shipping Enabled Status.Applicable values: 1: Yes2: No
   */
  current_status?: number;
}
/**
 * GetMetricSourceDetail_SaturdayShipment sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_SaturdayShipment {
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Order Paid Time.
   */
  order_create_time?: Date | number;
  /**
   * Seller arrange pick up time.
   */
  arrange_pick_up_time?: Date | number;
  /**
   * Courier actual pick up time.
   */
  actual_pick_up_time?: Date | number;
  /**
   * Preparation Days.
   */
  preparation_days?: number;
  /**
   * Logistics Company.
   */
  shipping_channel?: string;
  /**
   * First mile shipping type. Applicable values:PickupDrop off
   */
  first_mile_type?: string;
  /**
   * First Mile Tracking No.
   */
  first_mile_tracking_no?: string;
}
/**
 * GetMetricSourceDetail_OtdrOrder sub-interface for GetMetricSourceDetail_Response
 */
export interface GetMetricSourceDetail_OtdrOrder {
  /**
   * Order ID.
   */
  order_id?: string;
  /**
   * Order SN.
   */
  order_sn?: string;
  /**
   * Order Paid Time.
   */
  paid_time?: Date | number;
  /**
   * Estimated delivery date
   */
  estimated_delivery_date?: Date | number;
  /**
   * Actual pick up time
   */
  actual_pick_up_time?: Date | number;
  /**
   * Real delivery time
   */
  real_delivery_time?: Date | number;
  /**
   * Difference days between estimated delivery date and real delivery time
   */
  difference_between_edd_rdt?: string;
}
/**
 * GetMetricSourceDetail_Response sub-interface for GetMetricSourceDetailResponse
 */
export interface GetMetricSourceDetail_Response {
  /**
   * ID of metric.
   */
  metric_id?: number;
  /**
   * Affected Orders for Non-fulfilment Rate.Supported metric_id: 3: Non-Fulfilment Rate (All Channels)88: Non-fulfilment Rate (NDD)
   */
  nfr_order_list?: GetMetricSourceDetail_NfrOrder[];
  /**
   * Affected Orders for Cancellation Rate. Supported metric_id: 42: Cancellation Rate (All Channels)91: Cancellation Rate (NDD)
   */
  cancellation_order_list?: GetMetricSourceDetail_CancellationOrder[];
  /**
   * Affected Orders for Return-refund Rate.Supported metric_id: 43: Return-refund Rate (All Channels)92: Return-refund Rate (NDD)
   */
  return_refund_order_list?: GetMetricSourceDetail_ReturnRefundOrder[];
  /**
   * Affected Orders for Late Shipment Rate.Supported metric_id: 1: Late Shipment Rate (All Channels)85: Late Shipment Rate (NDD)
   */
  lsr_order_list?: GetMetricSourceDetail_LsrOrder[];
  /**
   * Affected Orders for Fast Handover Rate.Supported metric_id: 25: Fast Handover Rate2001: Fast Handover Rate - SLS2002: Fast Handover Rate - FBS2003: Fast Handover Rate - 3PF
   */
  fhr_order_list?: GetMetricSourceDetail_FhrOrder[];
  /**
   * Relevant Violations for OPFR Violation Value.Supported metric_id: 28: On-time Pickup Failure Rate Violation Value
   */
  opfr_day_detail_data_list?: GetMetricSourceDetail_OpfrDayDetailData[];
  /**
   * Relevant Listings for Severe Listing Violations and Other Listing Violations.Supported metric_id: 52: Severe Listing Violations53: Other Listing Violations
   */
  violation_listing_list?: GetMetricSourceDetail_ViolationListing[];
  /**
   * Relevant Listings for Days of Pre-order Listing Violation.Supported metric_id: 15: Days of Pre-order Listing Violation
   */
  pre_order_listing_violation_data_list?: GetMetricSourceDetail_PreOrderListingViolationData[];
  /**
   * Relevant Listings for Pre-order Listing.Supported metric_id: 12: Pre-order Listing %
   */
  pre_order_listing_list?: GetMetricSourceDetail_PreOrderListing[];
  /**
   * Relevant Listings for % SDD Listings.Supported metric_id: 96: % SDD Listings.
   */
  sdd_listing_list?: GetMetricSourceDetail_SddListing[];
  /**
   * Relevant Listings for % NDD Listings.Supported metric_id: 97: % NDD Listings.
   */
  ndd_listing_list?: GetMetricSourceDetail_NddListing[];
  /**
   * Affected Parcels for Preparation Time.Supported metric_id: 4: Preparation Time
   */
  apt_order_list?: GetMetricSourceDetail_AptOrder[];
  /**
   * Relevant Listings for % HD Listings and % HD Free Shipping Enabled.Supported metric_id: 2030: % HD Listings2031: % HD Free Shipping Enabled
   */
  hd_listing_list?: GetMetricSourceDetail_HdListing[];
  /**
   * Affected Parcels for Saturday ShipmentSupported metric_id:2032: Saturday Shipment
   */
  saturday_shipment_list?: GetMetricSourceDetail_SaturdayShipment[];
  otdr_order_list?: GetMetricSourceDetail_OtdrOrder[];
  /**
   * Total number of Affected Orders or Relevant Listings.
   */
  total_count?: number;
}
/**
 * Response data payload for get_metric_source_detail
 */
export type GetMetricSourceDetailResponseData = GetMetricSourceDetail_Response;
/**
 * Response payload for get_metric_source_detail
 *
 * Get the Affected Orders / Relevant Listings / Relevant Violations details of metrics.
 */
export type GetMetricSourceDetailResponse = FetchResponse<GetMetricSourceDetailResponseData>;
/**
 * Request parameters for get_penalty_point_history
 *
 * Get the penalty point records generated in the current quarter.
 */
export interface GetPenaltyPointHistoryRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. Default is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100. Default is 10.
   */
  page_size?: number;
  /**
   * Applicable values: 5: High Late Shipment Rate6: High Non-fulfilment Rate7: High number of non-fulfilled orders8: High number of late shipped orders9: Prohibited Listings10: Counterfeit / IP infringement11: Spam12: Copy/Steal images13: Re-uploading deleted listings with no change14: Bought counterfeit from mall15: Counterfeit caught by Shopee16: High percentage of pre-order listings17: Confirmed Fraud attempts (total)18: Confirmed Fraud attempts per week (All with vouchers only)19: Fake return address20: Shipping fraud/abuse21: High No. of Non-responded Chat22: Rude chat replies23: Request buyer to cancel order24: Rude reply to buyer's review25: Violate Return/Refund policy101: Tier Reason3026: Misuse of Shopee’s IP3028: Violate Shop Name Regulations3030: Direct transactions outside of the Shopee platform3032: Shipping empty / incomplete parcels3034: Severe Violations on Shopee Feed3036: Severe Violations on Shopee LIVE3038: Misuse of Local Vendor Tag3040: Use of misleading shop tag in listing image3042: Counterfeit / IP Infringement test3044: Repeat Offender - IP infringement and Counterfeit listings3046: Violation of Live Animals Selling Policy3048: Chat Spam3050: High Overseas Return Refunds Rate3052: Privacy breach in buyer's review reply3054: Order Brushing3056: porn image3058: Incorrect Product Categories3060: Extremely High Non-Fulfilment Rate3062: Penalty of Affiliate Marketing Solution (AMS) Overdue Invoice Payment3064: Government-related listing3066: Listing invalid gifted items3068: High non-fulfilment rate (Next Day Delivery Orders)3070: High Late Shipment Rate (Next Day Delivery Orders)3072: OPFR Violation Value3074: Direct transactions outside Shopee platform via chat3090: Prohibited Listings-Extreme Violations3091: Prohibited Listings-High Violations3092: Prohibited Listings-Mid Violations3093: Prohibited Listings-Low Violations3094: Counterfeit Listings-Extreme Violations3095: Counterfeit Listings-High Violations3096: Counterfeit Listings-Mid Violations3097: Counterfeit Listings-Low Violations3098: Spam Listings-Extreme Violations3099: Spam Listings-High Violations3100: Spam Listings-Mid Violations3101: Spam Listings-Low Violations3145: Return/Refund Rate (Non-integrated Channel)4130: Poor Product Quality
   */
  violation_type?: number;
}
/**
 * GetPenaltyPointHistory_PenaltyPoint sub-interface for GetPenaltyPointHistory_Response
 */
export interface GetPenaltyPointHistory_PenaltyPoint {
  /**
   * The time when penalty points are issued.
   */
  issue_time?: Date | number;
  /**
   * The latest penalty points issued under current penalty point record. If seller raised appeal for this penalty point record and the appeal has been approved and Shopee adjusted the penalty point, then the original_point_num returns the penalty point before the adjustment, and latest_point_num returns the penalty point after the adjustment.
   */
  latest_point_num?: number;
  /**
   * The original penalty points issued under current penalty point record.If seller raised appeal for this penalty point record and the appeal has been approved and Shopee adjusted the penalty point, then the original_point_num returns the penalty point before the adjustment, and latest_point_num returns the penalty point after the adjustment.
   */
  original_point_num?: number;
  /**
   * Reference ID for this penalty point record.
   */
  reference_id?: number;
  /**
   * Applicable values: 5: High Late Shipment Rate6: High Non-fulfilment Rate7: High number of non-fulfilled orders8: High number of late shipped orders9: Prohibited Listings10: Counterfeit / IP infringement11: Spam12: Copy/Steal images13: Re-uploading deleted listings with no change14: Bought counterfeit from mall15: Counterfeit caught by Shopee16: High percentage of pre-order listings17: Confirmed Fraud attempts (total)18: Confirmed Fraud attempts per week (All with vouchers only)19: Fake return address20: Shipping fraud/abuse21: High No. of Non-responded Chat22: Rude chat replies23: Request buyer to cancel order24: Rude reply to buyer's review25: Violate Return/Refund policy101: Tier Reason3026: Misuse of Shopee’s IP3028: Violate Shop Name Regulations3030: Direct transactions outside of the Shopee platform3032: Shipping empty / incomplete parcels3034: Severe Violations on Shopee Feed3036: Severe Violations on Shopee LIVE3038: Misuse of Local Vendor Tag3040: Use of misleading shop tag in listing image3042: Counterfeit / IP Infringement test3044: Repeat Offender - IP infringement and Counterfeit listings3046: Violation of Live Animals Selling Policy3048: Chat Spam3050: High Overseas Return Refunds Rate3052: Privacy breach in buyer's review reply3054: Order Brushing3056: porn image3058: Incorrect Product Categories3060: Extremely High Non-Fulfilment Rate3062: Penalty of Affiliate Marketing Solution (AMS) Overdue Invoice Payment3064: Government-related listing3066: Listing invalid gifted items3068: High non-fulfilment rate (Next Day Delivery Orders)3070: High Late Shipment Rate (Next Day Delivery Orders)3072: OPFR Violation Value3074: Direct transactions outside Shopee platform via chat3090: Prohibited Listings-Extreme Violations3091: Prohibited Listings-High Violations3092: Prohibited Listings-Mid Violations3093: Prohibited Listings-Low Violations3094: Counterfeit Listings-Extreme Violations3095: Counterfeit Listings-High Violations3096: Counterfeit Listings-Mid Violations3097: Counterfeit Listings-Low Violations3098: Spam Listings-Extreme Violations3099: Spam Listings-High Violations3100: Spam Listings-Mid Violations3101: Spam Listings-Low Violations3145: Return/Refund Rate (Non-integrated Channel)4130: Poor Product Quality
   */
  violation_type?: number;
}
/**
 * GetPenaltyPointHistory_Response sub-interface for GetPenaltyPointHistoryResponse
 */
export interface GetPenaltyPointHistory_Response {
  /**
   * The penalty point records generated in the current quarter.
   */
  penalty_point_list?: GetPenaltyPointHistory_PenaltyPoint[];
  /**
   * Total number of penalty point records.
   */
  total_count?: number;
}
/**
 * Response data payload for get_penalty_point_history
 */
export type GetPenaltyPointHistoryResponseData = GetPenaltyPointHistory_Response;
/**
 * Response payload for get_penalty_point_history
 *
 * Get the penalty point records generated in the current quarter.
 */
export type GetPenaltyPointHistoryResponse = FetchResponse<GetPenaltyPointHistoryResponseData>;
/**
 * Request parameters for get_punishment_history
 *
 * Get the punishment records generated in the current quarter.
 */
export interface GetPunishmentHistoryRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. Default is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100. Default is 10.
   */
  page_size?: number;
  /**
   * The status of punishment. Applicable values: 1: Ongoing2: Ended
   */
  punishment_status: number;
}
/**
 * GetPunishmentHistory_Punishment sub-interface for GetPunishmentHistory_Response
 */
export interface GetPunishmentHistory_Punishment {
  /**
   * The time when punishment are issued.
   */
  issue_time?: Date | number;
  /**
   * Start time in the duration of this punishment record.
   */
  start_time?: Date | number;
  /**
   * End time in the duration of this punishment record.
   */
  end_time?: Date | number;
  /**
   * Punishment Type of this punishment record. Applicable values: 103: Listings not displayed in category browsing104: Listings not displayed in search105: Unable to create new listings106: Unable to edit listings107: Unable to join marketing campaigns108: No shipping subsidies109: Account is suspended600: Listings not displayed in search601: Shop listings hide from recommendation602: Listings not displayed in category browsing1109: Listing Limit is reduced1110: Listing Limit is reduced1111: Listing Limit is reduced1112: Listing Limit is reduced2008: Order Limit
   */
  punishment_type?: number;
  /**
   * Reason of this punishment record. Applicable values: 1: Tier 12: Tier 23: Tier 34: Tier 45: Tier 51109: Listing Limit Tier 11110: Listing Limit Tier 21111: Listing Limit POL
   */
  reason?: number;
  /**
   * Reference ID for this punishment record.
   */
  reference_id?: number;
  /**
   * Return the specific value of listing limit when punishment_type is: 1109: Listing Limit is reduced1110: Listing Limit is reduced1111: Listing Limit is reduced1112: Listing Limit is reduced
   */
  listing_limit?: number[];
  /**
   * Return the specific percentage of order limit when punishment_type is: 2008: Order LimitDaily Order Limit = X % * L28D ADO (Average Daily Order of this Shop in Past 28 Days)
   */
  order_limit?: string;
}
/**
 * GetPunishmentHistory_Response sub-interface for GetPunishmentHistoryResponse
 */
export interface GetPunishmentHistory_Response {
  /**
   * The punishment records generated in the current quarter.
   */
  punishment_list?: GetPunishmentHistory_Punishment[];
  /**
   * Total number of punishment records.
   */
  total_count?: number;
}
/**
 * Response data payload for get_punishment_history
 */
export type GetPunishmentHistoryResponseData = GetPunishmentHistory_Response;
/**
 * Response payload for get_punishment_history
 *
 * Get the punishment records generated in the current quarter.
 */
export type GetPunishmentHistoryResponse = FetchResponse<GetPunishmentHistoryResponseData>;
/**
 * Request parameters for get_shop_performance
 *
 * The data metrics of shop performance.
 */
export type GetShopPerformanceRequest = Record<string, never>;
/**
 * GetShopPerformance_OverallPerformance sub-interface for GetShopPerformance_Response
 */
export interface GetShopPerformance_OverallPerformance {
  /**
   * Overall Performance: Poor = 1ImprovementNeeded = 2Good = 3Excellent = 4
   */
  rating?: number;
  /**
   * The number of metrics that did not meet target under Fulfillment Performance type.
   */
  fulfillment_failed?: number;
  /**
   * The number of metrics that did not meet target under Listing Performance type.
   */
  listing_failed?: number[];
  /**
   * The number of metrics that did not meet target under Customer Service Performance type.
   */
  custom_service_failed?: number;
}
/**
 * GetShopPerformance_Target sub-interface for GetShopPerformance_Metric
 */
export interface GetShopPerformance_Target {
  /**
   * Value of target.
   */
  value?: number;
  /**
   * Comparator of target: <, <=, >, >=, =
   */
  comparator?: string;
}
/**
 * GetShopPerformance_Metric sub-interface for GetShopPerformance_Response
 */
export interface GetShopPerformance_Metric {
  /**
   * Type of metric: Fulfillment Performance = 1Listing Performance = 2Customer Service Performance = 3
   */
  metric_type?: number;
  /**
   * ID of metric.If metric_id < 0, it means that this is not a real metric, but a group of metrics.Non-Responded Chats = -1Late Shipment Rate (All Channels) = 1Non-Fulfilment Rate (All Channels) = 3Preparation Time = 4Chat Response Rate = 11Pre-order Listing % = 12Days of Pre-order Listing Violation = 15Response Time = 21Shop Rating = 22No. of Non-Responded Chats = 23Fast Handover Rate = 25On-time Pickup Failure Rate = 27On-time Pickup Failure Rate Violation Value = 28Average Response Time = 29Cancellation Rate (All Channels) = 42Return-refund Rate (All Channels) = 43Severe Listing Violations = 52Other Listing Violations = 53Prohibited Listings = 54Counterfeit/IP infringement = 55Spam Listings = 56Late Shipment Rate (NDD) = 85Non-fulfilment Rate (NDD) = 88Cancellation Rate (NDD) = 91Return-refund Rate (NDD) = 92Customer Satisfaction = 95% SDD Listings = 96% NDD Listings = 97Fast Handover Rate - SLS = 2001Fast Handover Rate - FBS = 2002Fast Handover Rate - 3PF = 2003Poor Quality Products = 2011% HD Listings = 2030% HD Free Shipping Enabled = 2031Saturday Shipment = 2032Preparation Time PS = 2033OTDR Logistic Rate = 2036OTDR DD Rate = 2037
   */
  metric_id?: number;
  /**
   * ID of parent metric.
   */
  parent_metric_id?: number;
  /**
   * Default name of metric.
   */
  metric_name?: string;
  /**
   * The performance of the metric at current period.
   */
  current_period?: number;
  /**
   * The performance of the metric at last period.
   */
  last_period?: number;
  /**
   * Unit of metric: Number = 1Percentage = 2Second = 3Day = 4Hour = 5
   */
  unit?: number;
  target?: GetShopPerformance_Target;
  /**
   * (Only for whitelist TW sellers) The exemption_end_date value will not be empty if ALL conditions are met: - The shop is in the "POL Shop Whitelist"- Within the "Exemption Period"- The metric_id is 12 (Pre-order Listing %) or 15 (Days of Pre-order Listing Violation)
   */
  exemption_end_date?: string;
}
/**
 * GetShopPerformance_Response sub-interface for GetShopPerformanceResponse
 */
export interface GetShopPerformance_Response {
  overall_performance?: GetShopPerformance_OverallPerformance;
  metric_list?: GetShopPerformance_Metric[];
}
/**
 * Response data payload for get_shop_performance
 */
export type GetShopPerformanceResponseData = GetShopPerformance_Response;
/**
 * Response payload for get_shop_performance
 *
 * The data metrics of shop performance.
 */
export type GetShopPerformanceResponse = FetchResponse<GetShopPerformanceResponseData>;
