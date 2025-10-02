import { FetchResponse } from "./fetch.js";

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
 * The logistics status of a package
 */
export type LogisticsStatus =
  /** Initial status, order not ready for fulfillment */
  | "LOGISTICS_NOT_STARTED"
  /** order arranged shipment */
  | "LOGISTICS_REQUEST_CREATED"
  /** order handed over to 3PL */
  | "LOGISTICS_PICKUP_DONE"
  /** order pending 3PL retry pickup */
  | "LOGISTICS_PICKUP_RETRY"
  /** order cancelled by 3PL due to failed pickup or picked up but not able to proceed with delivery */
  | "LOGISTICS_PICKUP_FAILED"
  /** order successfully delivered */
  | "LOGISTICS_DELIVERY_DONE"
  /** order cancelled due to 3PL delivery failed */
  | "LOGISTICS_DELIVERY_FAILED"
  /** order cancelled when order at LOGISTICS_REQUEST_CREATED */
  | "LOGISTICS_REQUEST_CANCELED"
  /** Integrated logistics COD: Order rejected for COD */
  | "LOGISTICS_COD_REJECTED"
  /** order ready for fulfilment from payment perspective: non-COD: order paid, COD: order passed COD screening */
  | "LOGISTICS_READY"
  /** order cancelled when order at LOGISTICS_READY */
  | "LOGISTICS_INVALID"
  /** order cancelled due to 3PL lost the order */
  | "LOGISTICS_LOST"
  /** order logistics pending arrangement */
  | "LOGISTICS_PENDING_ARRANGE";

/**
 * Represents a package in an order with shipping information
 */
export interface Package {
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The Shopee logistics status for the order */
  logistics_status: LogisticsStatus;
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
  order_status: OrderStatus;
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
export type TimeRangeField = "create_time" | "update_time";

/**
 * The status of an order
 */
export type OrderStatus =
  /** Order is created, buyer has not paid yet */
  | "UNPAID"
  /** Seller can arrange shipment */
  | "READY_TO_SHIP"
  /** Seller has arranged shipment online and got tracking number from 3PL */
  | "PROCESSED"
  /** 3PL pickup parcel fail. Need to re arrange shipment */
  | "RETRY_SHIP"
  /** The parcel has been drop to 3PL or picked up by 3PL */
  | "SHIPPED"
  /** The order has been received by buyer */
  | "TO_CONFIRM_RECEIVE"
  /** The order's cancelation is under processing */
  | "IN_CANCEL"
  /** The order has been canceled */
  | "CANCELLED"
  /** The buyer requested to return the order and order's return is processing */
  | "TO_RETURN"
  /** The order has been completed */
  | "COMPLETED";

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
  "buyer_user_id,buyer_username,estimated_shipping_fee,recipient_address,actual_shipping_fee,goods_to_declare,note,note_update_time,item_list,pay_time,dropshipper,dropshipper_phone,split_up,buyer_cancel_reason,cancel_by,cancel_reason,actual_shipping_fee_confirmed,buyer_cpf_id,fulfillment_flag,pickup_done_time,package_list,shipping_carrier,payment_method,total_amount,invoice_data,order_chargeable_weight_gram,return_request_due_date,edt";
export type OrderDetailOptionalFields =
  | "buyer_user_id"
  | "buyer_username"
  | "estimated_shipping_fee"
  | "recipient_address"
  | "actual_shipping_fee"
  | "goods_to_declare"
  | "note"
  | "note_update_time"
  | "item_list"
  | "pay_time"
  | "dropshipper"
  | "dropshipper_phone"
  | "split_up"
  | "buyer_cancel_reason"
  | "cancel_by"
  | "cancel_reason"
  | "actual_shipping_fee_confirmed"
  | "buyer_cpf_id"
  | "fulfillment_flag"
  | "pickup_done_time"
  | "package_list"
  | "shipping_carrier"
  | "payment_method"
  | "total_amount"
  | "invoice_data"
  | "order_chargeable_weight_gram"
  | "return_request_due_date"
  | "edt";

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
export interface CancelOrderResponse
  extends FetchResponse<{
    /** The time when the order is updated */
    update_time: number;
  }> {}

/**
 * Query parameters for getting buyer invoice info
 */
export type BuyerInvoiceQuery = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
};

/**
 * Parameters for getting buyer invoice info
 */
export type GetBuyerInvoiceInfoParams = {
  /** List of order queries */
  queries: BuyerInvoiceQuery[];
};

/**
 * Address breakdown information
 */
export type AddressBreakdown = {
  /** Region value (PH, TH only) */
  region: string;
  /** State/Province (TH: Province) */
  state: string;
  /** City (TH: District) */
  city: string;
  /** Town (TH: Sub district) */
  town: string;
  /** Postal code (TH, PH) */
  postcode: string;
  /** Detailed address (street name, building, house number) */
  detailed_address: string;
  /** Additional address information (empty for PH, TH) */
  additional_info: string;
  /** Full address in format "detailed_address, town, district, state, postcode, additional_info" */
  full_address: string;
};

/**
 * Company address breakdown information
 */
export type CompanyAddressBreakdown = {
  /** Region value (PH, TH only) */
  company_region: string;
  /** Province (PH, TH) */
  company_state: string;
  /** City (PH) */
  company_city: string;
  /** District (PH: Barangay, TH: District) */
  company_district: string;
  /** Town (TH: Sub district) */
  company_town: string;
  /** Postal code (TH, PH) */
  company_postcode: string;
  /** Detailed address */
  company_detailed_address: string;
  /** Additional information (empty for PH, TH) */
  company_additional_info: string;
  /** Full company address */
  company_full_address: string;
};

/**
 * Invoice details for personal or company
 */
export type InvoiceDetail = {
  /** Buyer name (personal invoice only - VN, TH, PH) */
  name?: string;
  /** Buyer email address (personal invoice only - VN, TH, PH) */
  email?: string;
  /** Buyer phone number (TH only) */
  phone_number?: string;
  /** Tax ID (personal invoice only - VN, TH, PH) */
  tax_id?: string;
  /** Buyer address (personal invoice only - PH, VN) */
  address?: string;
  /** Buyer ID card address (personal invoice only - TH) */
  id_card_address?: string;
  /** Address breakdown information */
  address_breakdown?: AddressBreakdown;
  /** Company head office indicator (TH only, company invoice only) */
  company_head_office?: string;
  /** Company name (company invoice only - VN, TH, PH) */
  company_name?: string;
  /** Company branch name (TH only, company invoice only) */
  company_branch_name?: string;
  /** Company branch ID (TH only, company invoice only) */
  company_branch_id?: string;
  /** Company type (TH only, company invoice only) */
  company_type?: string;
  /** Company email (company invoice only - VN, TH, PH) */
  company_email?: string;
  /** Company tax ID (company invoice only - VN, TH, PH) */
  company_tax_id?: string;
  /** Company address (company invoice only - VN, TH) */
  company_address?: string;
  /** Company address breakdown */
  company_address_breakdown?: CompanyAddressBreakdown;
};

/**
 * Invoice information for an order
 */
export type InvoiceInfo = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Type of invoice requested: personal or company */
  invoice_type: string;
  /** Invoice details */
  invoice_detail: InvoiceDetail | null;
  /** Error in retrieving the receipt setting */
  error: string;
  /** Indicates if buyer requested invoice (applicable to PL) */
  is_requested: boolean;
};

/**
 * Response for getting buyer invoice info
 */
export interface GetBuyerInvoiceInfoResponse extends FetchResponse<null> {
  invoice_info_list: InvoiceInfo[];
}

/**
 * Parameters for setting a note on an order
 */
export interface SetNoteParams {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The note seller add for reference */
  note: string;
}

/**
 * Response for setting a note
 */
export interface SetNoteResponse extends FetchResponse<null> {}

/**
 * Parameters for getting package detail
 */
export interface GetPackageDetailParams {
  /** The set of package_number. If there are multiple package_number, you need to use English comma to connect them. limit [1,50] */
  package_number_list: string[];
}

/**
 * Package detail information
 */
export interface PackageDetail {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The Shopee fulfillment status for the package */
  fulfillment_status: string;
  /** Timestamp that indicates the last time that there was a change in value of package */
  update_time: number;
  /** The identity of logistic channel */
  logistics_channel_id: number;
  /** The logistics service provider that the buyer selected for the package to deliver items */
  shipping_carrier: string;
  /** To indicate whether the package allows for self-designed AWB */
  allow_self_design_awb: boolean;
  /** Shipping preparation time set by the seller when listing item on Shopee */
  days_to_ship: number;
  /** The deadline to ship out the package */
  ship_by_date: number;
  /** The list of pending terms */
  pending_terms?: string[];
  /** The tracking number of this package */
  tracking_number?: string;
  /** [TW only] Tracking number expiration date */
  tracking_number_expiration_date?: number;
  /** The timestamp when pickup is done */
  pickup_done_time?: number;
  /** To indicate whether this parcel is split */
  is_split_up: boolean;
  /** The list of items in the package */
  item_list: PackageItem[];
  /** Recipient address information */
  recipient_address?: RecipientAddress;
  /** Display weight used to calculate ASF for this parcel */
  parcel_chargeable_weight_gram?: number;
  /** The common identifier for multiple orders combined in the same parcel */
  group_shipment_id?: number;
  /** [Only for TW non-integrated channel] The virtual phone number to contact the recipient */
  virtual_contact_number?: string;
  /** [Only for TW non-integrated channel] The query number used in virtual phone number calls */
  package_query_number?: string;
  /** [Only for TW 30029 channel] Sorting group value of the package */
  sorting_group?: string;
  /** Return prescription images of this order, only for ID and PH whitelist sellers */
  prescription_images?: string[];
  /** Name of the Pharmacist for Prescription Order */
  pharmacist_name?: string;
  /** Time of when the prescription is approved */
  prescription_approval_time?: number;
  /** Time of when the prescription is rejected */
  prescription_rejection_time?: number;
  /** To indicate if this order is buyer self collection at store order */
  is_buyer_shop_collection?: boolean;
  /** The image url of the proof for buyer self collection at the store */
  buyer_proof_of_collection?: string[];
}

/**
 * Response for getting package detail
 */
export interface GetPackageDetailResponse
  extends FetchResponse<{
    /** The list of packages */
    package_list: PackageDetail[];
  }> {}

/**
 * Parameters for handling buyer cancellation
 */
export interface HandleBuyerCancellationParams {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The operation you want to handle. Available value: ACCEPT, REJECT */
  operation: "ACCEPT" | "REJECT";
}

/**
 * Response for handling buyer cancellation
 */
export interface HandleBuyerCancellationResponse
  extends FetchResponse<{
    /** Shopee's unique identifier for an order */
    order_sn: string;
  }> {}

/**
 * Filter options for searching package list
 */
export interface SearchPackageListFilter {
  /** Use this field to filter the packages of specific status. 0: All, 1: Pending, 2: ToProcess, 3: Processed. Default value = 2 (ToProcess) */
  package_status?: number;
  /** List of product_location_id. Use this field to filter the packages under specific warehouses */
  product_location_ids?: string[];
  /** List of logistics_channel_id. Use this field to filter the packages under specific logistics channels */
  logistics_channel_ids?: number[];
  /** Use this field to filter the packages fulfilled by shopee or seller. 0: None, 1: Shopee, 2: Seller. Default value = 2 (Seller) */
  fulfillment_type?: number;
  /** Use this field to filter the packages under invoice_pending. Default value = false */
  invoice_pending?: boolean;
  /** [Only for TW 30029 channel] Use this field to filter the sorting group of parcel. 1: North, 2: South */
  sorting_group?: number;
}

/**
 * Pagination options for searching package list
 */
export interface SearchPackageListPagination {
  /** Maximum number of entries to return in a single page (between 1 and 100) */
  page_size: number;
  /** Specifies the starting entry of data to return in the current call. Default is "" */
  cursor?: string;
}

/**
 * Sort options for searching package list
 */
export interface SearchPackageListSort {
  /** Sort field. Available value: package_number, ship_by_date, create_time. Default = ship_by_date */
  sort_field?: string;
  /** Sort direction. Available value: ASC, DESC. Default = ASC */
  sort_direction?: "ASC" | "DESC";
}

/**
 * Parameters for searching package list
 */
export interface SearchPackageListParams {
  /** Filter options */
  filter?: SearchPackageListFilter;
  /** Pagination options */
  pagination: SearchPackageListPagination;
  /** Sort options */
  sort?: SearchPackageListSort;
}

/**
 * Package item in search result
 */
export interface SearchPackageListPackage {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The Shopee fulfillment status for the package */
  fulfillment_status: string;
  /** Timestamp that indicates the last time that there was a change in value of package */
  update_time: number;
  /** The identity of logistic channel */
  logistics_channel_id: number;
  /** Shipping preparation time set by the seller when listing item on Shopee */
  days_to_ship: number;
  /** The deadline to ship out the package */
  ship_by_date: number;
  /** Creation time of the package */
  create_time: number;
}

/**
 * Response for searching package list
 */
export interface SearchPackageListResponse
  extends FetchResponse<{
    /** Indicates whether the package list is more than one page */
    more: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor */
    next_cursor: string;
    /** The list of packages */
    package_list: SearchPackageListPackage[];
  }> {}

/**
 * Parameters for getting pending buyer invoice order list
 */
export type GetPendingBuyerInvoiceOrderListParams = {
  /** Maximum number of entries to return in a single page (between 1 and 100) */
  page_size: number;
  /** Specifies the starting entry of data to return in the current call */
  cursor?: string;
};

/**
 * Response for getting pending buyer invoice order list
 */
export interface GetPendingBuyerInvoiceOrderListResponse
  extends FetchResponse<{
    /** Indicates whether the order list is more than one page */
    more: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor */
    next_cursor: string;
    /** The list of order serial numbers */
    order_sn_list: string[];
  }> {}

/**
 * Parameters for handling prescription check
 */
export interface HandlePrescriptionCheckParams {
  /** Shopee's unique identifier for the package under an order */
  package_number: string;
  /** The operation you want to handle. Available value: APPROVE, REJECT */
  operation: "APPROVE" | "REJECT";
  /** The reason for rejection. Required when operation is REJECT */
  reject_reason?: string;
}

/**
 * Response for handling prescription check
 */
export interface HandlePrescriptionCheckResponse
  extends FetchResponse<{
    /** Shopee's unique identifier for the package under an order */
    package_number: string;
  }> {}

/**
 * Parameters for downloading invoice document
 */
export type DownloadInvoiceDocParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
};

/**
 * Response for downloading invoice document
 */
export interface DownloadInvoiceDocResponse
  extends FetchResponse<{
    /** The URL of the invoice document */
    url: string;
  }> {}

/**
 * Parameters for uploading invoice document
 */
export interface UploadInvoiceDocParams {
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The invoice document file */
  invoice_file: string;
}

/**
 * Response for uploading invoice document
 */
export interface UploadInvoiceDocResponse extends FetchResponse<null> {}

/**
 * Parameters for getting booking detail
 */
export interface GetBookingDetailParams {
  /** The set of booking_sn. If there are multiple booking_sn, you need to use English comma to connect them. limit [1,50] */
  booking_sn_list: string[];
}

/**
 * Booking detail information
 */
export interface BookingDetail {
  /** Shopee's unique identifier for a booking */
  booking_sn: string;
  /** Shopee's unique identifier for an order */
  order_sn: string;
  /** The booking status */
  booking_status: string;
  /** Creation time of the booking */
  create_time: number;
  /** Update time of the booking */
  update_time: number;
  /** The identity of logistic channel */
  logistics_channel_id: number;
  /** The list of packages in the booking */
  package_list: string[];
}

/**
 * Response for getting booking detail
 */
export interface GetBookingDetailResponse
  extends FetchResponse<{
    /** The list of bookings */
    booking_list: BookingDetail[];
  }> {}

/**
 * Parameters for getting booking list
 */
export type GetBookingListParams = {
  /** The kind of time_from and time_to. Available value: create_time, update_time */
  time_range_field: "create_time" | "update_time";
  /** The starting date range for retrieving bookings. The maximum date range is 15 days */
  time_from: number;
  /** The ending date range for retrieving bookings. The maximum date range is 15 days */
  time_to: number;
  /** Maximum number of entries to return in a single page (between 1 and 100) */
  page_size: number;
  /** Specifies the starting entry of data to return in the current call */
  cursor?: string;
  /** The booking_status filter for retrieving bookings. Available value: READY_TO_SHIP/PROCESSED/SHIPPED/CANCELLED/MATCHED */
  booking_status?: string;
};

/**
 * Booking list item
 */
export interface BookingListItem {
  /** Shopee's unique identifier for a booking */
  booking_sn: string;
  /** The booking status */
  booking_status: string;
  /** Update time of the booking */
  update_time: number;
}

/**
 * Response for getting booking list
 */
export interface GetBookingListResponse
  extends FetchResponse<{
    /** Indicates whether the booking list is more than one page */
    more: boolean;
    /** If more is true, you should pass the next_cursor in the next request as cursor */
    next_cursor: string;
    /** The list of bookings */
    booking_list: BookingListItem[];
  }> {}

/**
 * Warehouse filter configuration
 */
export interface WarehouseFilterConfig {
  /** The warehouse ID */
  product_location_id: string;
  /** The address ID */
  address_id: number;
}

/**
 * Response for getting warehouse filter config
 */
export interface GetWarehouseFilterConfigResponse
  extends FetchResponse<{
    /** The list of warehouse filter configurations */
    warehouse_list: WarehouseFilterConfig[];
  }> {}

/**
 * Request ID list for FBS invoices
 */
export interface FbsInvoicesRequestIdList {
  /** List of request IDs */
  request_id: number[];
}

/**
 * Parameters for downloading FBS invoices
 */
export interface DownloadFbsInvoicesParams {
  /** List of request id (task identifiers) */
  request_id_list?: FbsInvoicesRequestIdList;
}

/**
 * FBS invoice download result
 */
export interface FbsInvoiceDownloadResult {
  /** The request ID */
  request_id: number;
  /** The download URL */
  url: string;
}

/**
 * Response for downloading FBS invoices
 */
export interface DownloadFbsInvoicesResponse
  extends FetchResponse<{
    /** The list of download results */
    result_list: FbsInvoiceDownloadResult[];
  }> {}

/**
 * Batch download parameters for FBS invoices
 */
export interface FbsBatchDownload {
  /** Start date in format YYYYMMDD, e.g. 20240101 */
  start: number;
  /** End date in format YYYYMMDD, e.g. 20240101 */
  end: number;
  /** Document type. 1 = Remessa, 2 = Return, 3 = Symbolic Return, 4 = Sale, 5 = Entrada, 6 = Symbolic Remessa, 7 = all */
  document_type: number;
  /** File type. 1 = xml only, 2 = pdf only, 3 = both */
  file_type: number;
  /** Document status. 1= authorized only, 2= cancelled. Default: If not passed or passed empty, means documents under ALL status (both authorized and cancelled) must be included */
  document_status?: number;
}

/**
 * Parameters for generating FBS invoices
 */
export interface GenerateFbsInvoicesParams {
  /** Batch download parameters */
  batch_download?: FbsBatchDownload;
}

/**
 * Response for generating FBS invoices
 */
export interface GenerateFbsInvoicesResponse
  extends FetchResponse<{
    /** The request ID for the generated task */
    request_id: number;
  }> {}

/**
 * Parameters for getting FBS invoices result
 */
export interface GetFbsInvoicesResultParams {
  /** List of request id to be queried */
  request_id_list: FbsInvoicesRequestIdList;
}

/**
 * FBS invoice result item
 */
export interface FbsInvoiceResultItem {
  /** The request ID */
  request_id: number;
  /** The status of the request. PROCESSING, READY, ERROR */
  status: string;
  /** Error message if status is ERROR */
  error_message?: string;
}

/**
 * Response for getting FBS invoices result
 */
export interface GetFbsInvoicesResultResponse
  extends FetchResponse<{
    /** The list of results */
    result_list: FbsInvoiceResultItem[];
  }> {}
