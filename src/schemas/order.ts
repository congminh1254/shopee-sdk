import { FetchResponse } from './fetch.js';

/**
 * Represents an item in an order with detailed product information
 */
export interface OrderItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** The name of the item */
  item_name: string;
  /** A item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU */
  item_sku: string;
  /** ID of the model that belongs to the same item */
  model_id: number;
  /** Name of the model that belongs to the same item */
  model_name: string;
  /** A model SKU (stock keeping unit) is an identifier defined by a seller */
  model_sku: string;
  /** The number of identical items purchased at the same time by the same buyer from one listing/item */
  model_quantity_purchased: number;
  /** The original price of the item in the listing currency */
  model_original_price: number;
  /** The after-discount price of the item in the listing currency */
  model_discounted_price: number;
  /** This value indicates whether buyer buy the order item in wholesale price */
  wholesale: boolean;
  /** The weight of the item */
  weight: number;
  /** To indicate if this item belongs to an addon deal */
  add_on_deal: boolean;
  /** To indicate if this item is main item or sub item. True means main item, false means sub item */
  main_item: boolean;
  /** A unique ID to distinguish groups of items in Cart, and Order */
  add_on_deal_id: number;
  /** Available type: product_promotion, flash_sale, bundle_deal, add_on_deal_main, add_on_deal_sub */
  promotion_type: string;
  /** The ID of the promotion */
  promotion_id: number;
  /** The identify of order item */
  order_item_id: number;
  /** The identify of product promotion */
  promotion_group_id: number;
  /** Image info of the product */
  image_info: {
    /** The image url of the product */
    image_url: string;
  };
  /** The fulfilment warehouse ID(s) of the items in the order */
  product_location_id: string[];
  /** To indicate if this item is prescription item */
  is_prescription_item: boolean;
  /** Determine if item is B2C shop item */
  is_b2c_owned_item: boolean;
}

/**
 * Represents an item in a package with basic information
 */
export interface PackageItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** Shopee's unique identifier for a model */
  model_id: number;
  /** The number of identical items/variations purchased at the same time by the same buyer from one listing/item */
  model_quantity: number;
  /** The identify of order item */
  order_item_id: number;
  /** The warehouse ID of the item */
  product_location_id: string;
  /** The identify of product promotion */
  promotion_group_id: number;
}

/**
 * Represents a package in an order with shipping information
 */
export interface Package {
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The Shopee logistics status for the order */
  logistics_status: string;
  /** The identity of logistic channel */
  logistics_channel_id: number;
  /** The logistics service provider that the buyer selected for the order to deliver items */
  shipping_carrier: string;
  /** To indicate whether the package allows for self-designed AWB */
  allow_self_design_awb: boolean;
  /** The list of items in the package */
  item_list: PackageItem[];
  /** Display weight used to calculate ASF for this parcel */
  parcel_chargeable_weight_gram?: number;
  /** The common identifier for multiple orders combined in the same parcel */
  group_shipment_id?: number;
  /** [Only for TW non-integrated channel] The virtual phone number to contact the recipient */
  virtual_contact_number?: string;
  /** [Only for TW non-integrated channel] The query number used in virtual phone number calls */
  package_query_number?: string;
}

/**
 * Represents the recipient's address information
 */
export interface RecipientAddress {
  /** Recipient's name for the address */
  name: string;
  /** Recipient's phone number input when order was placed */
  phone: string;
  /** The town of the recipient's address */
  town: string;
  /** The district of the recipient's address */
  district: string;
  /** The city of the recipient's address */
  city: string;
  /** The state/province of the recipient's address */
  state: string;
  /** The two-digit code representing the region of the Recipient */
  region: string;
  /** Recipient's postal code */
  zipcode: string;
  /** The full address of the recipient, including country, state, even street, and etc */
  full_address: string;
}

/**
 * Represents invoice data for an order
 */
export interface InvoiceData {
  /** The number of the invoice */
  number: string;
  /** The series number of the invoice */
  series_number: string;
  /** The access key of the invoice */
  access_key: string;
  /** The issue date of the invoice */
  issue_date: number;
  /** The total value of the invoice */
  total_value: number;
  /** The products total value of the invoice */
  products_total_value: number;
  /** The tax code for the invoice */
  tax_code: string;
}

export interface Order {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The two-digit code representing the region where the order was made */
  region: string;
  /** The three-digit code representing the currency unit for which the order was paid */
  currency: string;
  /** This value indicates whether the order was a COD (cash on delivery) order */
  cod: boolean;
  /** The total amount paid by the buyer for the order. This amount includes the total sale price of items, shipping cost beared by buyer; and offset by Shopee promotions if applicable */
  total_amount: number;
  /** The list of pending terms, possible values: SYSTEM_PENDING for order under Shopee internal processing, KYC_PENDING for order under KYC checking(TW CB order only) */
  pending_terms: string[];
  /** Enumerated type that defines the current status of the order */
  order_status: string;
  /** The logistics service provider that the buyer selected for the order to deliver items */
  shipping_carrier: string;
  /** The payment method that the buyer selected to pay for the order */
  payment_method: string;
  /** The estimated shipping fee is an estimation calculated by Shopee based on specific logistics courier's standard */
  estimated_shipping_fee: number;
  /** Message to seller */
  message_to_seller: string;
  /** Timestamp that indicates the date and time that the order was created */
  create_time: number;
  /** Timestamp that indicates the last time that there was a change in value of order, such as order status changed from 'Paid' to 'Completed' */
  update_time: number;
  /** Shipping preparation time set by the seller when listing item on Shopee */
  days_to_ship: number;
  /** The deadline to ship out the parcel */
  ship_by_date: number;
  /** The user id of buyer of this order, will be empty if it is a non-integrated order in TW region */
  buyer_user_id: number;
  /** The name of buyer, will be masked as "****" if it is a non-integrated order in TW region */
  buyer_username: string;
  /** This object contains detailed breakdown for the recipient address */
  recipient_address: RecipientAddress;
  /** The actual shipping fee of the order if available from external logistics partners */
  actual_shipping_fee: number;
  /** Only work for cross-border order. This value indicates whether the order contains goods that are required to declare at customs */
  goods_to_declare: boolean;
  /** The note seller made for own reference */
  note: string;
  /** Update time for the note */
  note_update_time: number;
  /** This object contains the detailed breakdown for the result of this API call */
  item_list: OrderItem[];
  /** The time when the order status is updated from UNPAID to PAID. This value is NULL when order is not paid yet */
  pay_time: number;
  /** For Indonesia orders only. The name of the dropshipper */
  dropshipper?: string;
  /** The phone number of dropshipper, could be empty */
  dropshipper_phone?: string;
  /** To indicate whether this order is split to fullfil order(forder) level. Call GetForderInfo if it's "true" */
  split_up: boolean;
  /** Cancel reason from buyer, could be empty */
  buyer_cancel_reason: string;
  /** Could be one of buyer, seller, system or Ops */
  cancel_by: string;
  /** Use this field to get reason for buyer, seller, and system cancellation */
  cancel_reason: string;
  /** Use this filed to judge whether the actual_shipping_fee is confirmed */
  actual_shipping_fee_confirmed: boolean;
  /** Buyer's CPF number for taxation and invoice purposes. Only for Brazil order */
  buyer_cpf_id?: string;
  /** Use this field to indicate the order is fulfilled by shopee or seller. Applicable values: fulfilled_by_shopee, fulfilled_by_cb_seller, fulfilled_by_local_seller */
  fulfillment_flag: string;
  /** The timestamp when pickup is done */
  pickup_done_time: number;
  /** The list of package under an order */
  package_list: Package[];
  /** For non masking order, the logistics service provider that the buyer selected for the order to deliver items. For masking order, the logistics service type that the buyer selected for the order to deliver items */
  checkout_shipping_carrier: string;
  /** Shopee charges the reverse shipping fee for the returned order. The value of this field will be non-negative */
  reverse_shipping_fee: number;
  /** Display weight used to calculate ASF for this order */
  order_chargeable_weight_gram: number;
  /** Return prescription images of this order, only for ID and PH whitelist sellers */
  prescription_images?: string[];
  /** Enum OrderPrescriptionCheckStatus: NONE = 0; PASSED = 1; FAILED = 2; Only for ID and PH whitelist sellers */
  prescription_check_status?: number;
  /** Earliest estimated delivery date of orders (only available for BR region) */
  edt_from?: number;
  /** Latest estimated delivery time of orders (only available for BR region) */
  edt_to?: number;
  /** Shopee's unique identifier for a booking. Only returned for advance fulfilment matched order */
  booking_sn?: string;
  /** Indicate whether order will be fulfilled using advance fulfilment stock or not. If value is true, order will be matched with a booking and seller should not arrange shipment */
  advance_package?: boolean;
  /** This field represents the deadline for buyers to initiate returns and refunds after order is completed */
  return_request_due_date?: number;
  /** The invoice data of the order */
  invoice_data?: InvoiceData;
}

/**
 * The kind of time range field for order list query
 */
export type TimeRangeField = 'create_time' | 'update_time';

/**
 * The status of an order
 */
export type OrderStatus =
  | 'UNPAID'
  | 'READY_TO_SHIP'
  | 'PROCESSED'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'IN_CANCEL'
  | 'CANCELLED'
  | 'INVOICE_PENDING';

/**
 * Represents a single order in the order list response
 */
export interface OrderListItem {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The status of the order */
  order_status?: OrderStatus;
  /** Shopee's unique identifier for a booking. Only returned for advance fulfilment matched order */
  booking_sn?: string;
}

/**
 * Parameters for getting order list
 */
export type GetOrderListParams = {
  /** The kind of time_from and time_to. Available value: create_time, update_time */
  time_range_field: TimeRangeField;
  /** The starting date range for retrieving orders. The maximum date range is 15 days */
  time_from: number;
  /** The ending date range for retrieving orders. The maximum date range is 15 days */
  time_to: number;
  /** The maximum number of entries to return in a single page (between 1 and 100) */
  page_size: number;
  /** Specifies the starting entry of data to return in the current call */
  cursor?: string;
  /** The order status filter for retrieving orders */
  order_status?: OrderStatus;
  /** Optional fields in response. Available value: order_status */
  response_optional_fields?: string;
  /** Compatible parameter during migration period, send True will let API support PENDING status */
  request_order_status_pending?: boolean;
  /** The identity of logistic channel. Valid only for BR */
  logistics_channel_id?: number;
};

/**
 * Response for getting order list
 */
export interface GetOrderListResponse
  extends FetchResponse<{
    /** Indicates whether the order list is more than one page */
    more: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor */
    next_cursor: string;
    /** List of orders */
    order_list: OrderListItem[];
  }> {}

export const allOptionalFields =
  'buyer_user_id,buyer_username,estimated_shipping_fee,recipient_address,actual_shipping_fee,goods_to_declare,note,note_update_time,item_list,pay_time,dropshipper,dropshipper_phone,split_up,buyer_cancel_reason,cancel_by,cancel_reason,actual_shipping_fee_confirmed,buyer_cpf_id,fulfillment_flag,pickup_done_time,package_list,shipping_carrier,payment_method,total_amount,invoice_data,order_chargeable_weight_gram,return_request_due_date,edt';
export type OrderDetailOptionalFields =
  | 'buyer_user_id'
  | 'buyer_username'
  | 'estimated_shipping_fee'
  | 'recipient_address'
  | 'actual_shipping_fee'
  | 'goods_to_declare'
  | 'note'
  | 'note_update_time'
  | 'item_list'
  | 'pay_time'
  | 'dropshipper'
  | 'dropshipper_phone'
  | 'split_up'
  | 'buyer_cancel_reason'
  | 'cancel_by'
  | 'cancel_reason'
  | 'actual_shipping_fee_confirmed'
  | 'buyer_cpf_id'
  | 'fulfillment_flag'
  | 'pickup_done_time'
  | 'package_list'
  | 'shipping_carrier'
  | 'payment_method'
  | 'total_amount'
  | 'invoice_data'
  | 'order_chargeable_weight_gram'
  | 'return_request_due_date'
  | 'edt';

/**
 * Parameters for getting order details
 */
export type GetOrdersDetailParams = {
  /** The set of order_sn. If there are multiple order_sn, you need to use English comma to connect them. limit [1,50] */
  order_sn_list: string[];
  /** Compatible parameter during migration period, send True will let API support PENDING status and return pending_terms, send False or don't send will fallback to old logic */
  request_order_status_pending?: boolean;
  /** A response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them. */
  response_optional_fields?: string;
};

/**
 * Response for getting order details
 */
export interface GetOrdersDetailResponse
  extends FetchResponse<{
    /** The list of orders */
    order_list: Order[];
  }> {}

/**
 * Represents a shipment order in the list
 */
export interface ShipmentOrder {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
}

/**
 * Parameters for getting shipment list
 */
export type GetShipmentListParams = {
  /** Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call */
  cursor?: string;
  /** Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100 */
  page_size: number;
};

/**
 * Response for getting shipment list
 */
export interface GetShipmentListResponse
  extends FetchResponse<{
    /** The list of shipment orders */
    order_list: ShipmentOrder[];
    /** This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders */
    more: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false */
    next_cursor: string;
  }> {}

/**
 * Represents an item in a split order package
 */
export interface SplitOrderPackageItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** Shopee's unique identifier for a model of an item */
  model_id: number;
  /** The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id */
  order_item_id?: number;
  /** The identify of product promotion. It's required for add on deal and bundle deal items. For items in one same add on deal or bundle deal promotion, the promotion_group_id should share the same id. For items not in add on deal or bundle deal promotion, the promotion_group_id should be 0 */
  promotion_group_id?: number;
  /** The number of identical items put in the package, the quantity sum of the same item from each parcel must be the full item quantity of the whole order. This field is only eligible for the shop whitelisted to the unit-level split in SG/TH/TW/MY markets */
  model_quantity?: number;
}

/**
 * Represents a package in a split order
 */
export interface SplitOrderPackage {
  /** The list of items under the same package */
  item_list: SplitOrderPackageItem[];
}

/**
 * Parameters for splitting an order
 */
export type SplitOrderParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The list of packages that you want to split */
  package_list: SplitOrderPackage[];
};

/**
 * Represents a package in the split order response
 */
export interface SplitOrderResponsePackage {
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The list of items under this package */
  item_list: SplitOrderPackageItem[];
}

/**
 * Response for splitting an order
 */
export interface SplitOrderResponse
  extends FetchResponse<{
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** The list of package under this order you have split */
    package_list: SplitOrderResponsePackage[];
  }> {}

/**
 * Parameters for unsplitting an order
 */
export interface UnsplitOrderParams {
  /** Shopee's unique identifier for an order */
  order_sn: string;
}

/**
 * Response from unsplitting an order
 */
export interface UnsplitOrderResponse extends FetchResponse<null> {}

/**
 * Represents an item in a cancel order request
 */
export interface CancelOrderItem {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** Shopee's unique identifier for a model of an item */
  model_id: number;
}

/**
 * Parameters for canceling an order
 */
export interface CancelOrderParams {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The reason seller want to cancel this order. Applicable values: OUT_OF_STOCK, UNDELIVERABLE_AREA(only apply for TW and MY) */
  cancel_reason: string;
  /** Required when cancel_reason is OUT_OF_STOCK */
  item_list?: CancelOrderItem[];
}

/**
 * Response from canceling an order
 */
export interface CancelOrderResponse extends FetchResponse<{
  /** The time when the order is updated */
  update_time: number;
}> {}
