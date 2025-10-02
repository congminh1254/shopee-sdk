/**
 * Enum for logistics status
 */
export var LogisticsStatus;
(function (LogisticsStatus) {
    /** Initial status, order not ready for fulfillment */
    LogisticsStatus["LOGISTICS_NOT_START"] = "LOGISTICS_NOT_START";
    /** Order arranged shipment */
    LogisticsStatus["LOGISTICS_REQUEST_CREATED"] = "LOGISTICS_REQUEST_CREATED";
    /** Order handed over to 3PL */
    LogisticsStatus["LOGISTICS_PICKUP_DONE"] = "LOGISTICS_PICKUP_DONE";
    /** Order pending 3PL retry pickup */
    LogisticsStatus["LOGISTICS_PICKUP_RETRY"] = "LOGISTICS_PICKUP_RETRY";
    /** Order cancelled by 3PL due to failed pickup or picked up but not able to proceed with delivery */
    LogisticsStatus["LOGISTICS_PICKUP_FAILED"] = "LOGISTICS_PICKUP_FAILED";
    /** Order successfully delivered */
    LogisticsStatus["LOGISTICS_DELIVERY_DONE"] = "LOGISTICS_DELIVERY_DONE";
    /** Order cancelled due to 3PL delivery failed */
    LogisticsStatus["LOGISTICS_DELIVERY_FAILED"] = "LOGISTICS_DELIVERY_FAILED";
    /** Order cancelled when order at LOGISTICS_REQUEST_CREATED */
    LogisticsStatus["LOGISTICS_REQUEST_CANCELED"] = "LOGISTICS_REQUEST_CANCELED";
    /** Integrated logistics COD: Order rejected for COD */
    LogisticsStatus["LOGISTICS_COD_REJECTED"] = "LOGISTICS_COD_REJECTED";
    /**
     * Order ready for fulfilment from payment perspective:
     * - non-COD: order paid
     * - COD: order passed COD screening
     */
    LogisticsStatus["LOGISTICS_READY"] = "LOGISTICS_READY";
    /** Order cancelled when order at LOGISTICS_READY */
    LogisticsStatus["LOGISTICS_INVALID"] = "LOGISTICS_INVALID";
    /** Order cancelled due to 3PL lost the order */
    LogisticsStatus["LOGISTICS_LOST"] = "LOGISTICS_LOST";
    /** Order logistics pending arrangement */
    LogisticsStatus["LOGISTICS_PENDING_ARRANGE"] = "LOGISTICS_PENDING_ARRANGE";
})(LogisticsStatus || (LogisticsStatus = {}));
/**
 * Enum for tracking logistics status
 */
export var TrackingLogisticsStatus;
(function (TrackingLogisticsStatus) {
    /** Initial state */
    TrackingLogisticsStatus["INITIAL"] = "INITIAL";
    /** Order initialization */
    TrackingLogisticsStatus["ORDER_INIT"] = "ORDER_INIT";
    /** Order has been submitted */
    TrackingLogisticsStatus["ORDER_SUBMITTED"] = "ORDER_SUBMITTED";
    /** Order has been finalized */
    TrackingLogisticsStatus["ORDER_FINALIZED"] = "ORDER_FINALIZED";
    /** Order has been created */
    TrackingLogisticsStatus["ORDER_CREATED"] = "ORDER_CREATED";
    /** Pickup has been requested */
    TrackingLogisticsStatus["PICKUP_REQUESTED"] = "PICKUP_REQUESTED";
    /** Pickup is pending */
    TrackingLogisticsStatus["PICKUP_PENDING"] = "PICKUP_PENDING";
    /** Package has been picked up */
    TrackingLogisticsStatus["PICKED_UP"] = "PICKED_UP";
    /** Delivery is pending */
    TrackingLogisticsStatus["DELIVERY_PENDING"] = "DELIVERY_PENDING";
    /** Package has been delivered */
    TrackingLogisticsStatus["DELIVERED"] = "DELIVERED";
    /** Retry pickup attempt */
    TrackingLogisticsStatus["PICKUP_RETRY"] = "PICKUP_RETRY";
    /** Operation timed out */
    TrackingLogisticsStatus["TIMEOUT"] = "TIMEOUT";
    /** Package is lost */
    TrackingLogisticsStatus["LOST"] = "LOST";
    /** Status update */
    TrackingLogisticsStatus["UPDATE"] = "UPDATE";
    /** Update has been submitted */
    TrackingLogisticsStatus["UPDATE_SUBMITTED"] = "UPDATE_SUBMITTED";
    /** Update has been created */
    TrackingLogisticsStatus["UPDATE_CREATED"] = "UPDATE_CREATED";
    /** Return process started */
    TrackingLogisticsStatus["RETURN_STARTED"] = "RETURN_STARTED";
    /** Package has been returned */
    TrackingLogisticsStatus["RETURNED"] = "RETURNED";
    /** Return is pending */
    TrackingLogisticsStatus["RETURN_PENDING"] = "RETURN_PENDING";
    /** Return has been initiated */
    TrackingLogisticsStatus["RETURN_INITIATED"] = "RETURN_INITIATED";
    /** Operation has expired */
    TrackingLogisticsStatus["EXPIRED"] = "EXPIRED";
    /** Cancellation requested */
    TrackingLogisticsStatus["CANCEL"] = "CANCEL";
    /** Cancellation has been created */
    TrackingLogisticsStatus["CANCEL_CREATED"] = "CANCEL_CREATED";
    /** Order has been canceled */
    TrackingLogisticsStatus["CANCELED"] = "CANCELED";
    /** Failed to initialize order */
    TrackingLogisticsStatus["FAILED_ORDER_INIT"] = "FAILED_ORDER_INIT";
    /** Failed to submit order */
    TrackingLogisticsStatus["FAILED_ORDER_SUBMITTED"] = "FAILED_ORDER_SUBMITTED";
    /** Failed to create order */
    TrackingLogisticsStatus["FAILED_ORDER_CREATED"] = "FAILED_ORDER_CREATED";
    /** Failed to request pickup */
    TrackingLogisticsStatus["FAILED_PICKUP_REQUESTED"] = "FAILED_PICKUP_REQUESTED";
    /** Failed to pick up package */
    TrackingLogisticsStatus["FAILED_PICKED_UP"] = "FAILED_PICKED_UP";
    /** Failed to deliver package */
    TrackingLogisticsStatus["FAILED_DELIVERED"] = "FAILED_DELIVERED";
    /** Failed to submit update */
    TrackingLogisticsStatus["FAILED_UPDATE_SUBMITTED"] = "FAILED_UPDATE_SUBMITTED";
    /** Failed to create update */
    TrackingLogisticsStatus["FAILED_UPDATE_CREATED"] = "FAILED_UPDATE_CREATED";
    /** Failed to start return */
    TrackingLogisticsStatus["FAILED_RETURN_STARTED"] = "FAILED_RETURN_STARTED";
    /** Failed to return package */
    TrackingLogisticsStatus["FAILED_RETURNED"] = "FAILED_RETURNED";
    /** Failed to create cancellation */
    TrackingLogisticsStatus["FAILED_CANCEL_CREATED"] = "FAILED_CANCEL_CREATED";
    /** Failed to cancel order */
    TrackingLogisticsStatus["FAILED_CANCELED"] = "FAILED_CANCELED";
})(TrackingLogisticsStatus || (TrackingLogisticsStatus = {}));
// ============================================
// Shipping Documents
// ============================================
/**
 * Shipping document type enum
 */
export var ShippingDocumentType;
(function (ShippingDocumentType) {
    ShippingDocumentType["NORMAL_AIR_WAYBILL"] = "NORMAL_AIR_WAYBILL";
    ShippingDocumentType["THERMAL_AIR_WAYBILL"] = "THERMAL_AIR_WAYBILL";
    ShippingDocumentType["NORMAL_JOB_AIR_WAYBILL"] = "NORMAL_JOB_AIR_WAYBILL";
    ShippingDocumentType["THERMAL_JOB_AIR_WAYBILL"] = "THERMAL_JOB_AIR_WAYBILL";
})(ShippingDocumentType || (ShippingDocumentType = {}));
//# sourceMappingURL=logistics.js.map