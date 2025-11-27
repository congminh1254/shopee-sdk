import { BaseResponse } from "./base.js";

/**
 * Penalty points information for a shop
 * Points accumulated will remain on record till the end of a quarter.
 * This will be reset on the first Monday of each quarter
 */
export interface PenaltyPoints {
  /** The overall penalty points */
  overall_penalty_points: number;
  /** The penalty points caused by non-fulfilment orders */
  non_fulfillment_rate: number;
  /** The penalty points caused by late shipment orders */
  late_shipment_rate: number;
  /** The penalty points caused by listing violations */
  listing_violations: number;
  /** The penalty points caused by orders that failed to be picked up during the scheduled pickup day */
  opfr_violations: number;
  /** Other penalty points */
  others: number;
}

/**
 * Information about ongoing punishment for a shop
 */
export interface OngoingPunishment {
  /** Punishment tier, ranges from 1-5 */
  punishment_tier: number;
  /** Number of days left for the punishment period */
  days_left: number;
  /** The name of punishment */
  punishment_name: string;
}

/**
 * Response for the get shop penalty API
 */
export interface GetShopPenaltyResponse extends BaseResponse {
  response: {
    /** The shop's penalty points information */
    penalty_points: PenaltyPoints;
    /** List of ongoing punishments for the shop */
    ongoing_punishment: OngoingPunishment[];
  };
}

/**
 * Metric type enum values
 * 1 = Fulfillment Performance
 * 2 = Listing Performance
 * 3 = Customer Service Performance
 */
export enum MetricType {
  FulfillmentPerformance = 1,
  ListingPerformance = 2,
  CustomerServicePerformance = 3,
}

/**
 * Metric unit enum values
 * 1 = Number
 * 2 = Percentage
 * 3 = Second
 * 4 = Day
 * 5 = Hour
 */
export enum MetricUnit {
  Number = 1,
  Percentage = 2,
  Second = 3,
  Day = 4,
  Hour = 5,
}

/**
 * Overall performance rating enum values
 * 1 = Poor
 * 2 = ImprovementNeeded
 * 3 = Good
 * 4 = Excellent
 */
export enum PerformanceRating {
  Poor = 1,
  ImprovementNeeded = 2,
  Good = 3,
  Excellent = 4,
}

/**
 * Target information for a metric
 */
export interface Target {
  /** Value of target */
  value: number;
  /** Comparator of target: <, <=, >, >=, = */
  comparator: string;
}

/**
 * Overall shop performance data
 */
export interface OverallPerformance {
  /** Overall performance rating (1=Poor, 2=ImprovementNeeded, 3=Good, 4=Excellent) */
  rating: PerformanceRating;
  /** The number of metrics that did not meet target under Fulfillment Performance type */
  fulfillment_failed: number;
  /** The number of metrics that did not meet target under Listing Performance type */
  listing_failed: number;
  /** The number of metrics that did not meet target under Customer Service Performance type */
  custom_service_failed: number;
}

/**
 * Shop performance metric information
 */
export interface Metric {
  /** Type of metric (1=Fulfillment, 2=Listing, 3=Customer Service) */
  metric_type: MetricType;
  /** ID of metric (see API documentation for specific IDs) */
  metric_id: number;
  /** ID of parent metric */
  parent_metric_id: number;
  /** Default name of metric */
  metric_name: string;
  /** The performance of the metric at current period */
  current_period: number | null;
  /** The performance of the metric at last period */
  last_period: number | null;
  /** Unit of metric (1=Number, 2=Percentage, 3=Second, 4=Day, 5=Hour) */
  unit: MetricUnit;
  /** Target information for the metric */
  target: Target;
  /**
   * (Only for whitelist TW sellers) The exemption end date for Pre-order Listing metrics
   * Only present if the shop is in the "POL Shop Whitelist", within the "Exemption Period",
   * and the metric_id is 12 (Pre-order Listing %) or 15 (Days of Pre-order Listing Violation)
   */
  exemption_end_date?: string;
}

/**
 * Response for the get shop performance API
 */
export interface GetShopPerformanceResponse extends BaseResponse {
  response: {
    /** Overall shop performance data */
    overall_performance: OverallPerformance;
    /** List of performance metrics */
    metric_list: Metric[];
  };
}

/**
 * Parameters for the get metric source detail API
 */
export type GetMetricSourceDetailParams = {
  /**
   * ID of metric. Supported values:
   * 1: Late Shipment Rate (All Channels)
   * 3: Non-Fulfilment Rate (All Channels)
   * 12: Pre-order Listing %
   * 15: Days of Pre-order Listing Violation
   * 25: Fast Handover Rate
   * 28: On-time Pickup Failure Rate Violation Value
   * 42: Cancellation Rate (All Channels)
   * 43: Return-refund Rate (All Channels)
   * 52: Severe Listing Violations
   * 53: Other Listing Violations
   * 85: Late Shipment Rate (NDD)
   * 88: Non-fulfilment Rate (NDD)
   * 91: Cancellation Rate (NDD)
   * 92: Return-refund Rate (NDD)
   * 97: % NDD Listings
   * 2001: Fast Handover Rate - SLS
   * 2002: Fast Handover Rate - FBS
   * 2003: Fast Handover Rate - 3PF
   */
  metric_id: number;
  /**
   * Specifies the page number of data to return in the current call.
   * Starting from 1. Default is 1.
   */
  page_no?: number;
  /**
   * Maximum number of entries to return in a single "page" of data.
   * The limit is between 1 and 100. Default is 10.
   */
  page_size?: number;
};

/**
 * Non-fulfillment order information
 */
export interface NonFulfillmentOrder {
  /** Order SN */
  order_sn: string;
  /**
   * Non-fulfilment type. Applicable values:
   * 1: System Cancellation
   * 2: Seller Cancellation
   * 3: Return Refunds
   */
  non_fulfillment_type: number;
  /**
   * Detailed reason for non-fulfillment. Applicable values include:
   * 1001: Return Refund
   * 1002: Parcel Split Cancellation
   * (see API documentation for full list)
   */
  detailed_reason: number;
}

/**
 * Cancellation order information
 */
export interface CancellationOrder {
  /** Order SN */
  order_sn: string;
  /**
   * Cancellation Type. Applicable values:
   * 1: System Cancellation
   * 2: Seller Cancellation
   */
  cancellation_type: number;
  /**
   * Detailed reason for cancellation. Applicable values include:
   * 1001: Return Refund
   * 1002: Parcel Split Cancellation
   * (see API documentation for full list)
   */
  detailed_reason: number;
}

/**
 * Return-refund order information
 */
export interface ReturnRefundOrder {
  /** Order SN */
  order_sn: string;
  /**
   * Detailed reason for return-refund. Applicable values include:
   * 1001: Return Refund
   * 1002: Parcel Split Cancellation
   * (see API documentation for full list)
   */
  detailed_reason: number;
}

/**
 * Late shipment order information
 */
export interface LateShipmentOrder {
  /** Order SN */
  order_sn: string;
  /** Shipping deadline timestamp */
  shipping_deadline: number;
  /** Actual shipping time timestamp */
  actual_shipping_time: number;
  /** Number of days the order was late by */
  late_by_days: number;
  /** Courier actual pick up time */
  actual_pick_up_time?: number;
  /** Logistics Company */
  shipping_channel?: string;
  /** First mile shipping type. Applicable values: Pickup, Drop off */
  first_mile_type?: string;
  /** Diagnosis of the issue */
  diagnosis_scenario?: string[];
}

/**
 * Fast handover order information
 */
export interface FastHandoverOrder {
  /** Order SN */
  order_sn: string;
  /** Parcel ID */
  parcel_id: number;
  /** Display Parcel ID */
  parcel_display_id?: string;
  /** Confirmed date timestamp */
  confirm_time: number;
  /** Parcel drop off / pickup datetime */
  handover_time: number;
  /** Fast handover deadline timestamp */
  handover_deadline: number;
  /** Fast handover due date timestamp */
  fast_handover_due_date?: number;
  /** Seller arrange pick up time */
  arrange_pick_up_time?: number;
  /** Logistics Company */
  shipping_channel?: string;
  /** First mile shipping type. Applicable values: Pickup, Drop off */
  first_mile_type?: string;
  /** First Mile Tracking No */
  first_mile_tracking_no?: string;
  /** Diagnosis of the issue */
  diagnosis_scenario?: string[];
}

/**
 * On-time pickup failure rate daily detail
 */
export interface OpfrDayDetail {
  /** Date in DD/MM/YYYY format */
  date: string;
  /** Number of scheduled pickups */
  scheduled_pickup_num: number;
  /** Number of failed pickups */
  failed_pickup_num: number;
  /** On-time Pickup Failure Rate */
  opfr: number;
  /** Target rate as a string (e.g., "49.90%") */
  target: string;
}

/**
 * Listing violation information
 */
export interface ViolationListing {
  /** Item ID */
  item_id: number;
  /**
   * Reason for violation. Applicable values:
   * 1: Prohibited
   * 2: Counterfeit
   * 3: Spam
   * 4: Inappropriate Image
   * 5: Insufficient Info
   * 6: Mall Listing Improvement
   * 7: Other Listing Improvement
   * 8: PQR Products
   */
  detailed_reason: number;
  /** Updated on timestamp */
  update_time: number;
}

/**
 * Pre-order listing violation daily detail
 */
export interface PreOrderListingViolationDay {
  /** Date in DD/MM/YYYY format */
  date: string;
  /** Number of live listings */
  live_listing_count: number;
  /** Number of pre-order listings */
  pre_order_listing_count: number;
  /** Pre-order listing percentage */
  pre_order_listing_rate: number;
  /** Target rate as a string (e.g., "13.00%") */
  target: string;
}

/**
 * Pre-order listing information
 */
export interface PreOrderListing {
  /** Item ID */
  item_id: number;
  /**
   * Current pre-order status. Applicable values:
   * 1: Yes
   * 2: No
   */
  current_pre_order_status: number;
}

/**
 * NDD (Next Day Delivery) listing information
 */
export interface NddListing {
  /** Item ID */
  item_id: number;
  /**
   * Current NDD status. Applicable values:
   * 1: Yes
   * 0: No
   */
  current_ndd_status: number;
}

/**
 * Preparation time order information
 * Used for metric_id 4 (Preparation Time)
 */
export interface PreparationTimeOrder {
  /** Order SN */
  order_sn: string;
  /** Order Paid Time timestamp */
  order_create_time: number;
  /** Seller arrange pick up time timestamp */
  arrange_pick_up_time: number;
  /** Courier actual pick up time timestamp */
  actual_pick_up_time: number;
  /** Preparation Days */
  preparation_days: number;
  /** Logistics Company */
  shipping_channel: string;
  /** First mile shipping type. Applicable values: Pickup, Drop off */
  first_mile_type: string;
  /** First Mile Tracking No */
  first_mile_tracking_no: string;
}

/**
 * SDD (Same Day Delivery) listing information
 */
export interface SddListing {
  /** Item ID */
  item_id: number;
  /**
   * Current SDD status. Applicable values:
   * 1: Yes
   * 0: No
   */
  current_sdd_status: number;
}

/**
 * Response for the get metric source detail API
 */
export interface GetMetricSourceDetailResponse extends BaseResponse {
  response: {
    /** ID of metric for which details are returned */
    metric_id: number;
    /** Total number of affected orders or relevant listings */
    total_count: number;
    /**
     * Affected orders for Non-fulfilment Rate.
     * Only present for metric_id: 3 (Non-Fulfilment Rate All Channels) or 88 (Non-fulfilment Rate NDD)
     */
    nfr_order_list?: NonFulfillmentOrder[];
    /**
     * Affected orders for Cancellation Rate.
     * Only present for metric_id: 42 (Cancellation Rate All Channels) or 91 (Cancellation Rate NDD)
     */
    cancellation_order_list?: CancellationOrder[];
    /**
     * Affected orders for Return-refund Rate.
     * Only present for metric_id: 43 (Return-refund Rate All Channels) or 92 (Return-refund Rate NDD)
     */
    return_refund_order_list?: ReturnRefundOrder[];
    /**
     * Affected orders for Late Shipment Rate.
     * Only present for metric_id: 1 (Late Shipment Rate All Channels) or 85 (Late Shipment Rate NDD)
     */
    lsr_order_list?: LateShipmentOrder[];
    /**
     * Affected orders for Fast Handover Rate.
     * Only present for metric_id: 25 (Fast Handover Rate), 2001 (FHR-SLS), 2002 (FHR-FBS), 2003 (FHR-3PF)
     */
    fhr_order_list?: FastHandoverOrder[];
    /**
     * Relevant violations for OPFR Violation Value.
     * Only present for metric_id: 28 (On-time Pickup Failure Rate Violation Value)
     */
    opfr_day_detail_data_list?: OpfrDayDetail[];
    /**
     * Relevant listings for Severe and Other Listing Violations.
     * Only present for metric_id: 52 (Severe Listing Violations) or 53 (Other Listing Violations)
     */
    violation_listing_list?: ViolationListing[];
    /**
     * Relevant listings for Days of Pre-order Listing Violation.
     * Only present for metric_id: 15 (Days of Pre-order Listing Violation)
     */
    pre_order_listing_violation_data_list?: PreOrderListingViolationDay[];
    /**
     * Relevant listings for Pre-order Listing %.
     * Only present for metric_id: 12 (Pre-order Listing %)
     */
    pre_order_listing_list?: PreOrderListing[];
    /**
     * Relevant listings for % NDD Listings.
     * Only present for metric_id: 97 (% NDD Listings)
     */
    ndd_listing_list?: NddListing[];
    /**
     * Relevant listings for % SDD Listings.
     * Only present for metric_id: 96 (% SDD Listings)
     */
    sdd_listing_list?: SddListing[];
    /**
     * Affected parcels for Preparation Time.
     * Only present for metric_id: 4 (Preparation Time)
     */
    apt_order_list?: PreparationTimeOrder[];
  };
}

/**
 * Violation types that can be used to filter penalty point history
 * These values correspond to different violation categories that might result in penalty points.
 * For a complete list, refer to the Shopee API documentation.
 */
export enum ViolationType {
  HighLateShipmentRate = 5,
  HighNonFulfillmentRate = 6,
  HighNumberOfNonFulfilledOrders = 7,
  HighNumberOfLateShippedOrders = 8,
  ProhibitedListings = 9,
  CounterfeitIPInfringement = 10,
  Spam = 11,
  CopyStealImages = 12,
  ReUploadingDeletedListings = 13,
  BoughtCounterfeitFromMall = 14,
  CounterfeitCaughtByShopee = 15,
  HighPercentageOfPreOrderListings = 16,
  ConfirmedFraudAttempts = 17,
  ConfirmedFraudAttemptsWithVouchers = 18,
  FakeReturnAddress = 19,
  ShippingFraudAbuse = 20,
  HighNonRespondedChat = 21,
  RudeChatReplies = 22,
  RequestBuyerToCancel = 23,
  RudeReplyToBuyerReview = 24,
  ViolateReturnRefundPolicy = 25,
  TierReason = 101,
  MisuseOfShopeesIP = 3026,
  ViolateShopNameRegulations = 3028,
  DirectTransactionsOutsidePlatform = 3030,
  ShippingEmptyIncompleteParcels = 3032,
  SevereViolationsOnShopeeFeed = 3034,
  SevereViolationsOnShopeeLIVE = 3036,
  MisuseOfLocalVendorTag = 3038,
  MisleadingShopTagInListingImage = 3040,
  CounterfeitIPInfringementTest = 3042,
  RepeatOffenderIPInfringement = 3044,
  ViolationOfLiveAnimalsSelling = 3046,
  ChatSpam = 3048,
  HighOverseasReturnRefundsRate = 3050,
  PrivacyBreachInBuyerReply = 3052,
  OrderBrushing = 3054,
  PornImage = 3056,
  IncorrectProductCategories = 3058,
  ExtremelyHighNonFulfillmentRate = 3060,
  AMSOverdueInvoicePayment = 3062,
  GovernmentRelatedListing = 3064,
  ListingInvalidGiftedItems = 3066,
  HighNonFulfillmentRateNDD = 3068,
  HighLateShipmentRateNDD = 3070,
  OPFRViolationValue = 3072,
  DirectTransactionsOutsidePlatformViaChat = 3074,
  ProhibitedListingsExtreme = 3090,
  ProhibitedListingsHigh = 3091,
  ProhibitedListingsMid = 3092,
  ProhibitedListingsLow = 3093,
  CounterfeitListingsExtreme = 3094,
  CounterfeitListingsHigh = 3095,
  CounterfeitListingsMid = 3096,
  CounterfeitListingsLow = 3097,
  SpamListingsExtreme = 3098,
  SpamListingsHigh = 3099,
  SpamListingsMid = 3100,
  SpamListingsLow = 3101,
  ReturnRefundRateNonIntegrated = 3145,
  PoorProductQuality = 4130,
}

/**
 * Parameters for the get penalty point history API
 */
export type GetPenaltyPointHistoryParams = {
  /**
   * Specifies the page number of data to return in the current call.
   * Starting from 1. Default is 1.
   */
  page_no?: number;
  /**
   * Maximum number of entries to return in a single "page" of data.
   * The limit is between 1 and 100. Default is 10.
   */
  page_size?: number;
  /**
   * Filter by specific violation type.
   * See ViolationType enum for values.
   */
  violation_type?: number;
};

/**
 * Penalty point record information
 */
export interface PenaltyPointRecord {
  /** The time when penalty points were issued (Unix timestamp) */
  issue_time: number;
  /**
   * The latest penalty points after any adjustments.
   * If seller raised an appeal that was approved, this shows the points after adjustment.
   */
  latest_point_num: number;
  /**
   * The original penalty points before any adjustments.
   * If seller raised an appeal that was approved, this shows the points before adjustment.
   */
  original_point_num: number;
  /** Reference ID for this penalty point record */
  reference_id: number;
  /** Type of violation that caused the penalty points */
  violation_type: number;
}

/**
 * Response for the get penalty point history API
 */
export interface GetPenaltyPointHistoryResponse extends BaseResponse {
  response: {
    /** List of penalty point records generated in the current quarter */
    penalty_point_list: PenaltyPointRecord[];
    /** Total number of penalty point records */
    total_count: number;
  };
}

/**
 * Status of punishment records
 */
export enum PunishmentStatus {
  /** Ongoing punishments */
  Ongoing = 1,
  /** Ended punishments */
  Ended = 2,
}

/**
 * Types of shop punishments
 */
export enum PunishmentType {
  /** Listings not displayed in category browsing */
  ListingsNotDisplayedInCategoryBrowsing = 103,
  /** Listings not displayed in search */
  ListingsNotDisplayedInSearch = 104,
  /** Unable to create new listings */
  UnableToCreateNewListings = 105,
  /** Unable to edit listings */
  UnableToEditListings = 106,
  /** Unable to join marketing campaigns */
  UnableToJoinMarketingCampaigns = 107,
  /** No shipping subsidies */
  NoShippingSubsidies = 108,
  /** Account is suspended */
  AccountSuspended = 109,
  /** Listings not displayed in search (alternative code) */
  ListingsNotDisplayedInSearchAlt = 600,
  /** Shop listings hide from recommendation */
  ShopListingsHideFromRecommendation = 601,
  /** Listings not displayed in category browsing (alternative code) */
  ListingsNotDisplayedInCategoryBrowsingAlt = 602,
  /** Listing Limit is reduced (Tier 1) */
  ListingLimitReducedTier1 = 1109,
  /** Listing Limit is reduced (Tier 2) */
  ListingLimitReducedTier2 = 1110,
  /** Listing Limit is reduced (POL) */
  ListingLimitReducedPOL = 1111,
  /** Listing Limit is reduced (additional code) */
  ListingLimitReducedExtra = 1112,
  /** Order Limit */
  OrderLimit = 2008,
}

/**
 * Reasons for shop punishments
 */
export enum PunishmentReason {
  /** Tier 1 punishment */
  Tier1 = 1,
  /** Tier 2 punishment */
  Tier2 = 2,
  /** Tier 3 punishment */
  Tier3 = 3,
  /** Tier 4 punishment */
  Tier4 = 4,
  /** Tier 5 punishment */
  Tier5 = 5,
  /** Listing Limit Tier 1 */
  ListingLimitTier1 = 1109,
  /** Listing Limit Tier 2 */
  ListingLimitTier2 = 1110,
  /** Listing Limit POL */
  ListingLimitPOL = 1111,
}

/**
 * Punishment record information
 */
export interface PunishmentRecord {
  /** The time when punishment was issued (Unix timestamp) */
  issue_time: number;
  /** Start time of punishment period (Unix timestamp) */
  start_time: number;
  /** End time of punishment period (Unix timestamp) */
  end_time: number;
  /** Type of punishment */
  punishment_type: number;
  /** Reason for punishment (typically indicates the tier) */
  reason: number;
  /** Reference ID for this punishment record */
  reference_id: number;
  /**
   * Specific value of listing limit (only present when punishment_type is related to listing limits)
   * Only present when punishment_type is: 1109, 1110, 1111, 1112
   */
  listing_limit?: number;
  /**
   * Percentage of order limit (only present when punishment_type is 2008)
   * Formula: Daily Order Limit = X % * L28D ADO (Average Daily Order of this Shop in Past 28 Days)
   */
  order_limit?: string;
}

/**
 * Parameters for the get punishment history API
 */
export type GetPunishmentHistoryParams = {
  /**
   * Specifies the page number of data to return in the current call.
   * Starting from 1. Default is 1.
   */
  page_no?: number;
  /**
   * Maximum number of entries to return in a single "page" of data.
   * The limit is between 1 and 100. Default is 10.
   */
  page_size?: number;
  /**
   * The status of punishment to retrieve.
   * 1: Ongoing punishments
   * 2: Ended punishments
   */
  punishment_status: PunishmentStatus;
};

/**
 * Response for the get punishment history API
 */
export interface GetPunishmentHistoryResponse extends BaseResponse {
  response: {
    /** List of punishment records generated in the current quarter */
    punishment_list: PunishmentRecord[];
    /** Total number of punishment records */
    total_count: number;
  };
}

/**
 * Reason types for listing issues
 */
export enum ListingIssueReason {
  /** Prohibited listing */
  Prohibited = 1,
  /** Counterfeit listing */
  Counterfeit = 2,
  /** Spam listing */
  Spam = 3,
  /** Inappropriate image */
  InappropriateImage = 4,
  /** Insufficient information */
  InsufficientInfo = 5,
  /** Mall listing improvement needed */
  MallListingImprovement = 6,
  /** Other listing improvement needed */
  OtherListingImprovement = 7,
}

/**
 * Listing with issue information
 */
export interface ListingWithIssue {
  /** Item ID of the problematic listing */
  item_id: number;
  /** Reason for the issue (see ListingIssueReason enum) */
  reason: number;
}

/**
 * Parameters for the get listings with issues API
 */
export type GetListingsWithIssuesParams = {
  /**
   * Specifies the page number of data to return in the current call.
   * Starting from 1. Default is 1.
   */
  page_no?: number;
  /**
   * Maximum number of entries to return in a single "page" of data.
   * The limit is between 1 and 100. Default is 10.
   */
  page_size?: number;
};

/**
 * Response for the get listings with issues API
 */
export interface GetListingsWithIssuesResponse extends BaseResponse {
  response: {
    /** List of problematic listings that need improvement */
    listing_list: ListingWithIssue[];
    /** Total number of listings with issues */
    total_count: number;
  };
}

/**
 * Parameters for the get late orders API
 */
export type GetLateOrdersParams = {
  /**
   * Specifies the page number of data to return in the current call.
   * Starting from 1. Default is 1.
   */
  page_no?: number;
  /**
   * Maximum number of entries to return in a single "page" of data.
   * The limit is between 1 and 100. Default is 10.
   */
  page_size?: number;
};

/**
 * Late order information
 */
export interface LateOrder {
  /** Order SN */
  order_sn: string;
  /** Shipping deadline timestamp */
  shipping_deadline: number;
  /** Number of days the order is late by */
  late_by_days: number;
}

/**
 * Response for the get late orders API
 */
export interface GetLateOrdersResponse extends BaseResponse {
  response: {
    /** List of late orders */
    late_order_list: LateOrder[];
    /** Total number of late orders */
    total_count: number;
  };
}
