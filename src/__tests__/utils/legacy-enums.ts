export enum LogisticsStatus {
  LOGISTICS_NOT_START = "LOGISTICS_NOT_START",
  LOGISTICS_REQUEST_CREATED = "LOGISTICS_REQUEST_CREATED",
  LOGISTICS_PICKUP_DONE = "LOGISTICS_PICKUP_DONE",
  LOGISTICS_PICKUP_RETRY = "LOGISTICS_PICKUP_RETRY",
  LOGISTICS_PICKUP_FAILED = "LOGISTICS_PICKUP_FAILED",
  LOGISTICS_DELIVERY_DONE = "LOGISTICS_DELIVERY_DONE",
  LOGISTICS_DELIVERY_FAILED = "LOGISTICS_DELIVERY_FAILED",
  LOGISTICS_REQUEST_CANCELED = "LOGISTICS_REQUEST_CANCELED",
  LOGISTICS_COD_REJECTED = "LOGISTICS_COD_REJECTED",
  LOGISTICS_READY = "LOGISTICS_READY",
  LOGISTICS_INVALID = "LOGISTICS_INVALID",
  LOGISTICS_LOST = "LOGISTICS_LOST",
  LOGISTICS_PENDING_ARRANGE = "LOGISTICS_PENDING_ARRANGE",
}

export enum TrackingLogisticsStatus {
  INITIAL = "INITIAL",
  ORDER_INIT = "ORDER_INIT",
  ORDER_SUBMITTED = "ORDER_SUBMITTED",
  ORDER_FINALIZED = "ORDER_FINALIZED",
  ORDER_CREATED = "ORDER_CREATED",
  PICKUP_REQUESTED = "PICKUP_REQUESTED",
  PICKUP_PENDING = "PICKUP_PENDING",
  PICKED_UP = "PICKED_UP",
  DELIVERY_PENDING = "DELIVERY_PENDING",
  DELIVERED = "DELIVERED",
  PICKUP_RETRY = "PICKUP_RETRY",
  TIMEOUT = "TIMEOUT",
  LOST = "LOST",
  UPDATE = "UPDATE",
  UPDATE_SUBMITTED = "UPDATE_SUBMITTED",
  UPDATE_CREATED = "UPDATE_CREATED",
  RETURN_STARTED = "RETURN_STARTED",
  RETURNED = "RETURNED",
  RETURN_PENDING = "RETURN_PENDING",
  RETURN_INITIATED = "RETURN_INITIATED",
  EXPIRED = "EXPIRED",
  CANCEL = "CANCEL",
  CANCEL_CREATED = "CANCEL_CREATED",
  CANCELED = "CANCELED",
  FAILED_ORDER_INIT = "FAILED_ORDER_INIT",
  FAILED_ORDER_SUBMITTED = "FAILED_ORDER_SUBMITTED",
  FAILED_ORDER_CREATED = "FAILED_ORDER_CREATED",
  FAILED_PICKUP_REQUESTED = "FAILED_PICKUP_REQUESTED",
  FAILED_PICKED_UP = "FAILED_PICKED_UP",
  FAILED_DELIVERED = "FAILED_DELIVERED",
  FAILED_UPDATE_SUBMITTED = "FAILED_UPDATE_SUBMITTED",
  FAILED_UPDATE_CREATED = "FAILED_UPDATE_CREATED",
  FAILED_RETURN_STARTED = "FAILED_RETURN_STARTED",
  FAILED_RETURNED = "FAILED_RETURNED",
  FAILED_CANCEL_CREATED = "FAILED_CANCEL_CREATED",
  FAILED_CANCEL_FAILED = "FAILED_CANCEL_FAILED",
  FAILED_CANCELED = "FAILED_CANCELED",
}

export enum BundleDealRuleType {
  FIX_PRICE = 1,
  DISCOUNT_PERCENTAGE = 2,
  DISCOUNT_VALUE = 3,
}

export enum FollowPrizeRewardType {
  DISCOUNT_FIX_AMOUNT = 1,
  DISCOUNT_BY_PERCENTAGE = 2,
  COIN_CASH_BACK = 3,
}

export enum VoucherStatus {
  ALL = "all",
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
}

export enum BundleDealTimeStatus {
  ALL = 1,
  UPCOMING = 2,
  ONGOING = 3,
  EXPIRED = 4,
}

export enum FollowPrizeStatus {
  ALL = "all",
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
}

export enum AddOnDealMainItemStatus {
  DELETED = 0,
  ACTIVE = 1,
}

export enum AddOnDealSubItemStatus {
  DELETED = 0,
  ACTIVE = 1,
}

export enum AddOnDealPromotionType {
  ADD_ON_DISCOUNT = 0,
  GIFT_WITH_MIN_SPEND = 1,
}

export enum AddOnDealPromotionStatus {
  ALL = "all",
  ONGOING = "ongoing",
  UPCOMING = "upcoming",
  EXPIRED = "expired",
}

export enum MetricType {
  FulfillmentPerformance = 1,
  ListingPerformance = 2,
  CustomerServicePerformance = 3,
}

export enum MetricUnit {
  Number = 1,
  Percentage = 2,
  Second = 3,
  Day = 4,
  Hour = 5,
}

export enum PerformanceRating {
  Poor = 1,
  ImprovementNeeded = 2,
  Good = 3,
  Excellent = 4,
}

export enum ReturnStatus {
  REQUESTED = "REQUESTED",
  PROCESSING = "PROCESSING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum SellerProofStatus {
  PENDING = "PENDING",
  UPLOADED = "UPLOADED",
  NOT_NEEDED = "NOT_NEEDED",
}

export enum SellerCompensationStatus {
  NOT_REQUIRED = "NOT_REQUIRED",
  PENDING_REQUEST = "PENDING_REQUEST",
  COMPENSATION_REQUESTED = "COMPENSATION_REQUESTED",
}

export enum ReturnSolution {
  RETURN_REFUND = "RETURN_REFUND",
  REFUND_ONLY = "REFUND_ONLY",
}

export enum NegotiationStatus {
  PENDING_RESPOND = "PENDING_RESPOND",
  ONGOING = "ONGOING",
  TERMINATED = "TERMINATED",
}

export enum ShopFlashSaleStatus {
  DELETED = 0,
  ENABLED = 1,
  DISABLED = 2,
  SYSTEM_REJECTED = 3,
}

export enum ShopFlashSaleType {
  UPCOMING = 1,
  ONGOING = 2,
  EXPIRED = 3,
}

export enum ShopFlashSaleItemStatus {
  DISABLED = 0,
  ENABLED = 1,
  DELETED = 2,
  SYSTEM_REJECTED = 4,
  MANUAL_REJECTED = 5,
}

export const allOptionalFields =
  "buyer_user_id,buyer_username,estimated_shipping_fee,recipient_address,actual_shipping_fee,goods_to_declare,note,note_update_time,item_list,pay_time,dropshipper,dropshipper_phone,split_up,buyer_cancel_reason,cancel_by,cancel_reason,actual_shipping_fee_confirmed,buyer_cpf_id,fulfillment_flag,pickup_done_time,package_list,shipping_carrier,payment_method,total_amount,invoice_data,order_chargeable_weight_gram,return_request_due_date,edt";
