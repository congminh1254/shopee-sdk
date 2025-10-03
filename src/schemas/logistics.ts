import { BaseResponse } from "./base.js";

/**
 * Enum for logistics status
 */
export enum LogisticsStatus {
  /** Initial status, order not ready for fulfillment */
  LOGISTICS_NOT_START = "LOGISTICS_NOT_START",
  /** Order arranged shipment */
  LOGISTICS_REQUEST_CREATED = "LOGISTICS_REQUEST_CREATED",
  /** Order handed over to 3PL */
  LOGISTICS_PICKUP_DONE = "LOGISTICS_PICKUP_DONE",
  /** Order pending 3PL retry pickup */
  LOGISTICS_PICKUP_RETRY = "LOGISTICS_PICKUP_RETRY",
  /** Order cancelled by 3PL due to failed pickup or picked up but not able to proceed with delivery */
  LOGISTICS_PICKUP_FAILED = "LOGISTICS_PICKUP_FAILED",
  /** Order successfully delivered */
  LOGISTICS_DELIVERY_DONE = "LOGISTICS_DELIVERY_DONE",
  /** Order cancelled due to 3PL delivery failed */
  LOGISTICS_DELIVERY_FAILED = "LOGISTICS_DELIVERY_FAILED",
  /** Order cancelled when order at LOGISTICS_REQUEST_CREATED */
  LOGISTICS_REQUEST_CANCELED = "LOGISTICS_REQUEST_CANCELED",
  /** Integrated logistics COD: Order rejected for COD */
  LOGISTICS_COD_REJECTED = "LOGISTICS_COD_REJECTED",
  /**
   * Order ready for fulfilment from payment perspective:
   * - non-COD: order paid
   * - COD: order passed COD screening
   */
  LOGISTICS_READY = "LOGISTICS_READY",
  /** Order cancelled when order at LOGISTICS_READY */
  LOGISTICS_INVALID = "LOGISTICS_INVALID",
  /** Order cancelled due to 3PL lost the order */
  LOGISTICS_LOST = "LOGISTICS_LOST",
  /** Order logistics pending arrangement */
  LOGISTICS_PENDING_ARRANGE = "LOGISTICS_PENDING_ARRANGE",
}

/**
 * Enum for tracking logistics status
 */
export enum TrackingLogisticsStatus {
  /** Initial state */
  INITIAL = "INITIAL",
  /** Order initialization */
  ORDER_INIT = "ORDER_INIT",
  /** Order has been submitted */
  ORDER_SUBMITTED = "ORDER_SUBMITTED",
  /** Order has been finalized */
  ORDER_FINALIZED = "ORDER_FINALIZED",
  /** Order has been created */
  ORDER_CREATED = "ORDER_CREATED",
  /** Pickup has been requested */
  PICKUP_REQUESTED = "PICKUP_REQUESTED",
  /** Pickup is pending */
  PICKUP_PENDING = "PICKUP_PENDING",
  /** Package has been picked up */
  PICKED_UP = "PICKED_UP",
  /** Delivery is pending */
  DELIVERY_PENDING = "DELIVERY_PENDING",
  /** Package has been delivered */
  DELIVERED = "DELIVERED",
  /** Retry pickup attempt */
  PICKUP_RETRY = "PICKUP_RETRY",
  /** Operation timed out */
  TIMEOUT = "TIMEOUT",
  /** Package is lost */
  LOST = "LOST",
  /** Status update */
  UPDATE = "UPDATE",
  /** Update has been submitted */
  UPDATE_SUBMITTED = "UPDATE_SUBMITTED",
  /** Update has been created */
  UPDATE_CREATED = "UPDATE_CREATED",
  /** Return process started */
  RETURN_STARTED = "RETURN_STARTED",
  /** Package has been returned */
  RETURNED = "RETURNED",
  /** Return is pending */
  RETURN_PENDING = "RETURN_PENDING",
  /** Return has been initiated */
  RETURN_INITIATED = "RETURN_INITIATED",
  /** Operation has expired */
  EXPIRED = "EXPIRED",
  /** Cancellation requested */
  CANCEL = "CANCEL",
  /** Cancellation has been created */
  CANCEL_CREATED = "CANCEL_CREATED",
  /** Order has been canceled */
  CANCELED = "CANCELED",
  /** Failed to initialize order */
  FAILED_ORDER_INIT = "FAILED_ORDER_INIT",
  /** Failed to submit order */
  FAILED_ORDER_SUBMITTED = "FAILED_ORDER_SUBMITTED",
  /** Failed to create order */
  FAILED_ORDER_CREATED = "FAILED_ORDER_CREATED",
  /** Failed to request pickup */
  FAILED_PICKUP_REQUESTED = "FAILED_PICKUP_REQUESTED",
  /** Failed to pick up package */
  FAILED_PICKED_UP = "FAILED_PICKED_UP",
  /** Failed to deliver package */
  FAILED_DELIVERED = "FAILED_DELIVERED",
  /** Failed to submit update */
  FAILED_UPDATE_SUBMITTED = "FAILED_UPDATE_SUBMITTED",
  /** Failed to create update */
  FAILED_UPDATE_CREATED = "FAILED_UPDATE_CREATED",
  /** Failed to start return */
  FAILED_RETURN_STARTED = "FAILED_RETURN_STARTED",
  /** Failed to return package */
  FAILED_RETURNED = "FAILED_RETURNED",
  /** Failed to create cancellation */
  FAILED_CANCEL_CREATED = "FAILED_CANCEL_CREATED",
  /** Failed to cancel order */
  FAILED_CANCELED = "FAILED_CANCELED",
}

/**
 * Parameters for getting tracking information
 */
export type GetTrackingInfoParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order.
   * You shouldn't fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Tracking information details
 */
export interface TrackingInfo {
  /** The time when logistics info has been updated */
  update_time: number;
  /** The description of order logistics tracking info */
  description: string;
  /**
   * The Shopee logistics status for the order.
   * Applicable values: See Data Definition- TrackingLogisticsStatus
   */
  logistics_status: TrackingLogisticsStatus;
}

/**
 * Response for get tracking info API
 */
export interface GetTrackingInfoResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** Shopee's unique identifier for the package under an order */
    package_number: string;
    /**
     * The Shopee logistics status for the order.
     * Applicable values: See Data Definition- LogisticsStatus
     */
    logistics_status: LogisticsStatus;
    /** The tracking info of the order */
    tracking_info: TrackingInfo[];
  };
}

/**
 * Weight limit for logistics channel
 */
export interface WeightLimit {
  /** Max weight for an item on this logistic channel */
  item_max_weight: number;
  /** Min weight for an item on this logistic channel */
  item_min_weight: number;
}

/**
 * Dimension limit for logistics channel
 */
export interface ItemMaxDimension {
  /** Max height limit */
  height: number;
  /** Max width limit */
  width: number;
  /** Max length limit */
  length: number;
  /** Unit for the limit */
  unit: string;
  /** Sum of the item's dimension */
  dimension_sum: number;
}

/**
 * Volume limit for logistics channel
 */
export interface VolumeLimit {
  /** Max volume for an item on this logistic channel */
  item_max_volume: number;
  /** Min volume for an item on this logistic channel */
  item_min_volume: number;
}

/**
 * Size information for logistics channel
 */
export interface SizeInfo {
  /** Identity of size */
  size_id: string;
  /** Name of size */
  name: string;
  /** Pre-defined shipping fee for the specific size */
  default_price: number;
}

/**
 * Logistics capability
 */
export interface LogisticsCapability {
  /** Whether it's a Seller logistics channel */
  seller_logistics: boolean;
}

/**
 * Logistics channel information
 */
export interface LogisticsChannel {
  /** Identity of logistic channel */
  logistics_channel_id: number;
  /** Name of logistic channel */
  logistics_channel_name: string;
  /** Whether this logistic channel supports COD */
  cod_enabled: boolean;
  /** Whether this logistic channel is enabled on shop level */
  enabled: boolean;
  /** Fee type: SIZE_SELECTION, SIZE_INPUT, FIXED_DEFAULT_PRICE, CUSTOM_PRICE */
  fee_type: string;
  /** List of sizes (only for fee_type SIZE_SELECTION) */
  size_list: SizeInfo[];
  /** Weight limit for this logistic channel */
  weight_limit: WeightLimit;
  /** Dimension limit for this logistic channel */
  item_max_dimension: ItemMaxDimension;
  /** Volume limit */
  volume_limit: VolumeLimit;
  /** Description of logistics channel */
  logistics_description: string;
  /** Whether the logistic channel is force enabled on Shop Level */
  force_enable: boolean;
  /** Parent logistic channel ID */
  mask_channel_id: number;
  /** Whether the channel is blocked to use seller cover shipping fee function */
  block_seller_cover_shipping_fee?: boolean;
  /** Whether this channel support cross border shipping */
  support_cross_border?: boolean;
  /** Whether seller has set the Seller logistics configuration */
  seller_logistic_has_configuration?: boolean | null;
  /** Capability of one logistic channel */
  logistics_capability?: LogisticsCapability;
  /** Whether this channel support pre-print AWB */
  preprint?: boolean;
}

/**
 * Response for get channel list API
 */
export interface GetChannelListResponse extends BaseResponse {
  response: {
    /** List of logistics channels */
    logistics_channel_list: LogisticsChannel[];
  };
}

/**
 * Pickup time slot information
 */
export interface PickupTimeSlot {
  /** Date of pickup time (timestamp) */
  date: number;
  /** Text description of pickup time */
  time_text?: string;
  /** Identity of pickup time */
  pickup_time_id: string;
  /** Flags for recommended time slots */
  flags?: string[];
}

/**
 * Pickup address information
 */
export interface PickupAddress {
  /** Identity of address */
  address_id: number;
  /** Region of address */
  region: string;
  /** State of address */
  state: string;
  /** City of address */
  city: string;
  /** District of address */
  district: string;
  /** Town of address */
  town: string;
  /** Address description */
  address: string;
  /** Zipcode of address */
  zipcode: string;
  /** Flags of shop address */
  address_flag?: string[];
  /** List of pickup time information */
  time_slot_list?: PickupTimeSlot[];
}

/**
 * Dropoff branch information
 */
export interface DropoffBranch {
  /** Identity of logistics branch */
  branch_id: number;
  /** Region of address */
  region: string;
  /** State of address */
  state: string;
  /** City of address */
  city: string;
  /** Address description */
  address: string;
  /** Zipcode of address */
  zipcode: string;
  /** District of address */
  district: string;
  /** Town of address */
  town: string;
}

/**
 * Slug information for TW 3PL drop-off partners
 */
export interface SlugInfo {
  /** Identity of slug */
  slug: string;
  /** Name of slug */
  slug_name: string;
}

/**
 * Info needed for shipping
 */
export interface InfoNeeded {
  /** Dropoff requirements */
  dropoff?: string[];
  /** Pickup requirements */
  pickup?: string[];
  /** Non-integrated requirements */
  non_integrated?: string[];
}

/**
 * Dropoff information
 */
export interface DropoffInfo {
  /** List of available dropoff branches */
  branch_list?: DropoffBranch[];
  /** List of available TW 3PL drop-off partners */
  slug_list?: SlugInfo[];
}

/**
 * Pickup information
 */
export interface PickupInfo {
  /** List of available pickup addresses */
  address_list?: PickupAddress[];
}

/**
 * Parameters for getting shipping parameter
 */
export type GetShippingParameterParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /**
   * Shopee's unique identifier for the package under an order.
   * You shouldn't fill the field with empty string when there isn't a package number.
   */
  package_number?: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get shipping parameter API
 */
export interface GetShippingParameterResponse extends BaseResponse {
  response: {
    /** Parameters required to initialize logistics */
    info_needed?: InfoNeeded;
    /** Logistics information for dropoff mode */
    dropoff?: DropoffInfo;
    /** Logistics information for pickup mode */
    pickup?: PickupInfo;
  };
}

/**
 * Parameters for getting tracking number
 */
export type GetTrackingNumberParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number?: string;
  /** Optional fields to include in response */
  response_optional_fields?: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get tracking number API
 */
export interface GetTrackingNumberResponse extends BaseResponse {
  response: {
    /** The tracking number of this order */
    tracking_number: string;
    /** The unique identifier for package of BR correios */
    plp_number?: string;
    /** The first mile tracking number of the order (Cross Border Seller only) */
    first_mile_tracking_number?: string;
    /** The last mile tracking number of the order (Cross Border BR seller only) */
    last_mile_tracking_number?: string;
    /** Hint information if cannot get some fields under special scenarios */
    hint?: string;
    /** Pickup code for drivers (ID local orders using instant+sameday) */
    pickup_code?: string;
  };
}

/**
 * Pickup information for ship order
 */
export interface ShipOrderPickup {
  /** Identity of address */
  address_id: number;
  /** Pickup time id */
  pickup_time_id?: string;
  /** Tracking number from third-party shipping carrier */
  tracking_number?: string;
}

/**
 * Dropoff information for ship order
 */
export interface ShipOrderDropoff {
  /** Identity of branch */
  branch_id?: number;
  /** Real name of sender */
  sender_real_name?: string;
  /** Tracking number from third-party shipping carrier */
  tracking_number?: string;
  /** Selected 3PL partner for drop-off */
  slug?: string;
}

/**
 * Non-integrated channel information for ship order
 */
export interface ShipOrderNonIntegrated {
  /** Tracking number assigned by shipping carrier */
  tracking_number?: string;
}

/**
 * Parameters for ship order
 */
export type ShipOrderParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number?: string;
  /** Pickup information (required if get_shipping_parameter returns "pickup") */
  pickup?: ShipOrderPickup;
  /** Dropoff information (required if get_shipping_parameter returns "dropoff") */
  dropoff?: ShipOrderDropoff;
  /** Non-integrated channel information */
  non_integrated?: ShipOrderNonIntegrated;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for ship order API
 */
export interface ShipOrderResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Address information
 */
export interface Address {
  /** Identity of address */
  address_id: number;
  /** Region of address */
  region: string;
  /** State of address */
  state: string;
  /** City of address */
  city: string;
  /** District of address */
  district: string;
  /** Town of address */
  town: string;
  /** Full address description */
  address: string;
  /** Zipcode */
  zipcode: string;
  /** Address type flags */
  address_flag?: string[];
  /** Address status */
  address_status?: string;
  /** Full address string */
  full_address?: string;
}

/**
 * Response for get address list API
 */
export interface GetAddressListResponse extends BaseResponse {
  response: {
    /** Whether to show pickup address */
    show_pickup_address: boolean;
    /** List of addresses */
    address_list: Address[];
  };
}

// ============================================
// Batch Ship Order
// ============================================

/**
 * Order item for batch ship order
 */
export interface BatchShipOrderItem {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number?: string;
  /** Pickup information */
  pickup?: ShipOrderPickup;
  /** Dropoff information */
  dropoff?: ShipOrderDropoff;
  /** Non-integrated channel information */
  non_integrated?: ShipOrderNonIntegrated;
}

/**
 * Parameters for batch ship order
 */
export type BatchShipOrderParams = {
  /** List of order items to ship */
  order_list: BatchShipOrderItem[];
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Batch ship order result item
 */
export interface BatchShipOrderResultItem {
  /** Order serial number */
  order_sn: string;
  /** Error code if failed */
  error?: string;
  /** Error message if failed */
  message?: string;
}

/**
 * Response for batch ship order API
 */
export interface BatchShipOrderResponse extends BaseResponse {
  response?: {
    /** List of results */
    result_list?: BatchShipOrderResultItem[];
  };
}

// ============================================
// Mass Ship Order
// ============================================

/**
 * Parameters for mass ship order
 */
export type MassShipOrderParams = {
  /** List of package numbers */
  package_number_list: string[];
  /** Pickup information */
  pickup?: ShipOrderPickup;
  /** Dropoff information */
  dropoff?: ShipOrderDropoff;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for mass ship order API
 */
export interface MassShipOrderResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// Ship Booking
// ============================================

/**
 * Parameters for ship booking
 */
export type ShipBookingParams = {
  /** Booking serial number */
  booking_sn: string;
  /** Pickup information */
  pickup?: ShipOrderPickup;
  /** Dropoff information */
  dropoff?: ShipOrderDropoff;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for ship booking API
 */
export interface ShipBookingResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// Get Booking Shipping Parameter
// ============================================

/**
 * Parameters for get booking shipping parameter
 */
export type GetBookingShippingParameterParams = {
  /** Booking serial number */
  booking_sn: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking shipping parameter API
 */
export interface GetBookingShippingParameterResponse extends BaseResponse {
  response: {
    /** Parameters required to initialize logistics */
    info_needed?: InfoNeeded;
    /** Logistics information for dropoff mode */
    dropoff?: DropoffInfo;
    /** Logistics information for pickup mode */
    pickup?: PickupInfo;
  };
}

// ============================================
// Get Booking Tracking Info/Number
// ============================================

/**
 * Parameters for get booking tracking info
 */
export type GetBookingTrackingInfoParams = {
  /** Booking serial number */
  booking_sn: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking tracking info API
 */
export interface GetBookingTrackingInfoResponse extends BaseResponse {
  response: {
    /** Booking serial number */
    booking_sn: string;
    /** Current logistics status */
    logistics_status: LogisticsStatus;
    /** Tracking info events */
    tracking_info: TrackingInfo[];
  };
}

/**
 * Parameters for get booking tracking number
 */
export type GetBookingTrackingNumberParams = {
  /** Booking serial number */
  booking_sn: string;
  /** Optional fields to include in response */
  response_optional_fields?: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking tracking number API
 */
export interface GetBookingTrackingNumberResponse extends BaseResponse {
  response: {
    /** The tracking number */
    tracking_number: string;
    /** Hint information */
    hint?: string;
  };
}

// ============================================
// Get Mass Shipping/Tracking
// ============================================

/**
 * Parameters for get mass shipping parameter
 */
export type GetMassShippingParameterParams = {
  /** List of package numbers */
  package_number_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get mass shipping parameter API
 */
export interface GetMassShippingParameterResponse extends BaseResponse {
  response: {
    /** Parameters required */
    info_needed?: InfoNeeded;
    /** Dropoff information */
    dropoff?: DropoffInfo;
    /** Pickup information */
    pickup?: PickupInfo;
  };
}

/**
 * Parameters for get mass tracking number
 */
export type GetMassTrackingNumberParams = {
  /** List of order serial numbers */
  order_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Mass tracking result item
 */
export interface MassTrackingResultItem {
  /** Order serial number */
  order_sn: string;
  /** Tracking number */
  tracking_number?: string;
  /** Hint information */
  hint?: string;
}

/**
 * Response for get mass tracking number API
 */
export interface GetMassTrackingNumberResponse extends BaseResponse {
  response?: {
    /** List of tracking results */
    result_list?: MassTrackingResultItem[];
  };
}

// ============================================
// Address Management
// ============================================

/**
 * Parameters for set address config
 */
export type SetAddressConfigParams = {
  /** Address ID */
  address_id: number;
  /** Address flags */
  address_flag?: string[];
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for set address config API
 */
export interface SetAddressConfigResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for delete address
 */
export type DeleteAddressParams = {
  /** Address ID to delete */
  address_id: number;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for delete address API
 */
export interface DeleteAddressResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// Shipping Documents
// ============================================

/**
 * Shipping document type enum
 */
export enum ShippingDocumentType {
  NORMAL_AIR_WAYBILL = "NORMAL_AIR_WAYBILL",
  THERMAL_AIR_WAYBILL = "THERMAL_AIR_WAYBILL",
  NORMAL_JOB_AIR_WAYBILL = "NORMAL_JOB_AIR_WAYBILL",
  THERMAL_JOB_AIR_WAYBILL = "THERMAL_JOB_AIR_WAYBILL",
}

/**
 * Parameters for create shipping document
 */
export type CreateShippingDocumentParams = {
  /** List of order SNs */
  order_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for create shipping document API
 */
export interface CreateShippingDocumentResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for download shipping document
 */
export type DownloadShippingDocumentParams = {
  /** List of order SNs */
  order_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for download shipping document API
 */
export interface DownloadShippingDocumentResponse extends BaseResponse {
  response?: {
    /** URL to download document */
    result?: string;
  };
}

/**
 * Parameters for get shipping document parameter
 */
export type GetShippingDocumentParameterParams = {
  /** List of order SNs */
  order_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get shipping document parameter API
 */
export interface GetShippingDocumentParameterResponse extends BaseResponse {
  response?: {
    /** Suggested document type */
    suggested_shipping_document_type?: string;
    /** Selectable document types */
    selectable_shipping_document_type?: string[];
  };
}

/**
 * Parameters for get shipping document result
 */
export type GetShippingDocumentResultParams = {
  /** List of order SNs */
  order_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Shipping document result item
 */
export interface ShippingDocumentResultItem {
  /** Order serial number */
  order_sn: string;
  /** Result status */
  status?: string;
  /** Error message if failed */
  error?: string;
}

/**
 * Response for get shipping document result API
 */
export interface GetShippingDocumentResultResponse extends BaseResponse {
  response?: {
    /** List of results */
    result_list?: ShippingDocumentResultItem[];
  };
}

/**
 * Parameters for get shipping document data info
 */
export type GetShippingDocumentDataInfoParams = {
  /** List of order SNs */
  order_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get shipping document data info API
 */
export interface GetShippingDocumentDataInfoResponse extends BaseResponse {
  response?: {
    /** Document data list */
    data_list?: any[];
  };
}

// ============================================
// Booking Shipping Documents
// ============================================

/**
 * Parameters for create booking shipping document
 */
export type CreateBookingShippingDocumentParams = {
  /** List of booking SNs */
  booking_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for create booking shipping document API
 */
export interface CreateBookingShippingDocumentResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for download booking shipping document
 */
export type DownloadBookingShippingDocumentParams = {
  /** List of booking SNs */
  booking_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for download booking shipping document API
 */
export interface DownloadBookingShippingDocumentResponse extends BaseResponse {
  response?: {
    /** URL to download document */
    result?: string;
  };
}

/**
 * Parameters for get booking shipping document parameter
 */
export type GetBookingShippingDocumentParameterParams = {
  /** List of booking SNs */
  booking_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking shipping document parameter API
 */
export interface GetBookingShippingDocumentParameterResponse extends BaseResponse {
  response?: {
    /** Suggested document type */
    suggested_shipping_document_type?: string;
    /** Selectable document types */
    selectable_shipping_document_type?: string[];
  };
}

/**
 * Parameters for get booking shipping document result
 */
export type GetBookingShippingDocumentResultParams = {
  /** List of booking SNs */
  booking_sn_list: string[];
  /** Document type */
  shipping_document_type: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking shipping document result API
 */
export interface GetBookingShippingDocumentResultResponse extends BaseResponse {
  response?: {
    /** List of results */
    result_list?: any[];
  };
}

/**
 * Parameters for get booking shipping document data info
 */
export type GetBookingShippingDocumentDataInfoParams = {
  /** List of booking SNs */
  booking_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get booking shipping document data info API
 */
export interface GetBookingShippingDocumentDataInfoResponse extends BaseResponse {
  response?: {
    /** Document data list */
    data_list?: any[];
  };
}

// ============================================
// Shipping Document Job
// ============================================

/**
 * Parameters for create shipping document job
 */
export type CreateShippingDocumentJobParams = {
  /** Job identifier */
  job_id?: string;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for create shipping document job API
 */
export interface CreateShippingDocumentJobResponse extends BaseResponse {
  response?: {
    /** Job ID */
    job_id?: string;
  };
}

/**
 * Parameters for download shipping document job
 */
export type DownloadShippingDocumentJobParams = {
  /** Job ID */
  job_id: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for download shipping document job API
 */
export interface DownloadShippingDocumentJobResponse extends BaseResponse {
  response?: {
    /** Download URL */
    result?: string;
  };
}

/**
 * Parameters for get shipping document job status
 */
export type GetShippingDocumentJobStatusParams = {
  /** Job ID */
  job_id: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get shipping document job status API
 */
export interface GetShippingDocumentJobStatusResponse extends BaseResponse {
  response?: {
    /** Job status */
    status?: string;
    /** Error message if failed */
    error?: string;
  };
}

/**
 * Parameters for download to label
 */
export type DownloadToLabelParams = {
  /** List of order SNs */
  order_sn_list: string[];
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for download to label API
 */
export interface DownloadToLabelResponse extends BaseResponse {
  response?: {
    /** Download URL */
    result?: string;
  };
}

// ============================================
// Channel and Order Updates
// ============================================

/**
 * Parameters for update channel
 */
export type UpdateChannelParams = {
  /** Logistics channel ID */
  logistics_channel_id: number;
  /** Whether to enable the channel */
  enabled?: boolean;
  /** COD enabled */
  cod_enabled?: boolean;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for update channel API
 */
export interface UpdateChannelResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for update shipping order
 */
export type UpdateShippingOrderParams = {
  /** Order serial number */
  order_sn: string;
  /** Package number */
  package_number?: string;
  /** Pickup information */
  pickup?: ShipOrderPickup;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for update shipping order API
 */
export interface UpdateShippingOrderResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for update tracking status
 */
export type UpdateTrackingStatusParams = {
  /** Order serial number */
  order_sn: string;
  /** Package number */
  package_number?: string;
  /** Tracking status */
  tracking_status?: string;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for update tracking status API
 */
export interface UpdateTrackingStatusResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for update self collection order logistics
 */
export type UpdateSelfCollectionOrderLogisticsParams = {
  /** Order serial number */
  order_sn: string;
  /** Package number */
  package_number: string;
  /** Self collection status */
  self_collection_status: string;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for update self collection order logistics API
 */
export interface UpdateSelfCollectionOrderLogisticsResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// Operating Hours
// ============================================

/**
 * Parameters for get operating hours
 */
export type GetOperatingHoursParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get operating hours API
 */
export interface GetOperatingHoursResponse extends BaseResponse {
  response?: {
    /** Operating hours data */
    operating_hours?: any[];
  };
}

/**
 * Parameters for update operating hours
 */
export type UpdateOperatingHoursParams = {
  /** Operating hours data */
  operating_hours?: any[];
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for update operating hours API
 */
export interface UpdateOperatingHoursResponse extends BaseResponse {
  response?: Record<string, never>;
}

/**
 * Parameters for get operating hour restrictions
 */
export type GetOperatingHourRestrictionsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Response for get operating hour restrictions API
 */
export interface GetOperatingHourRestrictionsResponse extends BaseResponse {
  response?: {
    /** Restrictions data */
    restrictions?: any[];
  };
}

/**
 * Parameters for delete special operating hour
 */
export type DeleteSpecialOperatingHourParams = {
  /** Date to delete */
  date?: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for delete special operating hour API
 */
export interface DeleteSpecialOperatingHourResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// Mart Packaging
// ============================================

/**
 * Parameters for get mart packaging info
 */
export type GetMartPackagingInfoParams = {
  /** Order serial number */
  order_sn: string;
} & Record<string, string | number | boolean | null | undefined>;

/**
 * Response for get mart packaging info API
 */
export interface GetMartPackagingInfoResponse extends BaseResponse {
  response?: {
    /** Packaging info */
    packaging_info?: any;
  };
}

/**
 * Parameters for set mart packaging info
 */
export type SetMartPackagingInfoParams = {
  /** Order serial number */
  order_sn: string;
  /** Packaging data */
  packaging_data?: any;
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for set mart packaging info API
 */
export interface SetMartPackagingInfoResponse extends BaseResponse {
  response?: Record<string, never>;
}

// ============================================
// TPF Warehouse
// ============================================

/**
 * TPF tracking status item
 */
export interface TPFTrackingStatusItem {
  /** Package number */
  package_number: string;
  /** Tracking status */
  tracking_status: string;
}

/**
 * Parameters for batch update TPF warehouse tracking status
 */
export type BatchUpdateTPFWarehouseTrackingStatusParams = {
  /** List of tracking status items */
  tracking_status_list: TPFTrackingStatusItem[];
} & Record<string, string | number | boolean | object | null | undefined>;

/**
 * Response for batch update TPF warehouse tracking status API
 */
export interface BatchUpdateTPFWarehouseTrackingStatusResponse extends BaseResponse {
  response?: Record<string, never>;
}
