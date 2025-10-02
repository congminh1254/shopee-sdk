import { BaseResponse } from "./base.js";
/**
 * Enum for logistics status
 */
export declare enum LogisticsStatus {
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
    LOGISTICS_PENDING_ARRANGE = "LOGISTICS_PENDING_ARRANGE"
}
/**
 * Enum for tracking logistics status
 */
export declare enum TrackingLogisticsStatus {
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
    FAILED_CANCELED = "FAILED_CANCELED"
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
