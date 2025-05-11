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
