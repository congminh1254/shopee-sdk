import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field ResponseOptionalFields
 */
export enum ResponseOptionalFields {
  BUYER_USER_ID = "buyer_user_id",
  BUYER_USERNAME = "buyer_username",
  ESTIMATED_SHIPPING_FEE = "estimated_shipping_fee",
  RECIPIENT_ADDRESS = "recipient_address",
  ACTUAL_SHIPPING_FEE = "actual_shipping_fee",
  GOODS_TO_DECLARE = "goods_to_declare",
  NOTE = "note",
  NOTE_UPDATE_TIME = "note_update_time",
  ITEM_LIST = "item_list",
  PAY_TIME = "pay_time",
  DROPSHIPPER = "dropshipper",
  DROPSHIPPER_PHONE = "dropshipper_phone",
  SPLIT_UP = "split_up",
  BUYER_CANCEL_REASON = "buyer_cancel_reason",
  CANCEL_BY = "cancel_by",
  CANCEL_REASON = "cancel_reason",
  ACTUAL_SHIPPING_FEE_CONFIRMED = "actual_shipping_fee_confirmed",
  BUYER_CPF_ID = "buyer_cpf_id",
  FULFILLMENT_FLAG = "fulfillment_flag",
  PICKUP_DONE_TIME = "pickup_done_time",
  PACKAGE_LIST = "package_list",
  SHIPPING_CARRIER = "shipping_carrier",
  PAYMENT_METHOD = "payment_method",
  TOTAL_AMOUNT = "total_amount",
  INVOICE_DATA = "invoice_data",
  ORDER_CHARGEABLE_WEIGHT_GRAM = "order_chargeable_weight_gram",
  RETURN_REQUEST_DUE_DATE = "return_request_due_date",
  EDT = "edt",
  PAYMENT_INFO = "payment_info",
  INTERNATIONAL_LABEL = "international_label",
}
/**
 * Enum generated for field BookingStatus
 */
export enum BookingStatus {
  READY_TO_SHIP = "READY_TO_SHIP",
  PROCESSED = "PROCESSED",
  SHIPPED = "SHIPPED",
  CANCELLED = "CANCELLED",
  MATCHED = "MATCHED",
}
/**
 * Enum generated for field MatchStatus
 */
export enum MatchStatus {
  MATCH_PENDING = "MATCH_PENDING",
  MATCH_SUCCESSFUL = "MATCH_SUCCESSFUL",
  MATCH_FAILED = "MATCH_FAILED",
}
/**
 * Enum generated for field Town
 */
export enum Town {
  AND = "and",
  OR = "or",
}
/**
 * Enum generated for field District
 */
export enum District {
  AND = "and",
  OR = "or",
}
/**
 * Enum generated for field City
 */
export enum City {
  AND = "and",
  OR = "or",
}
/**
 * Enum generated for field State
 */
export enum State {
  STATE = "state",
  PROVINCE = "province",
}
/**
 * Enum generated for field TimeRangeField
 */
export enum TimeRangeField {
  CREATE_TIME = "create_time",
  UPDATE_TIME = "update_time",
}
/**
 * Enum generated for field PrescriptionImages
 */
export enum PrescriptionImages {
  ID = "id",
  FILE = "file",
}
/**
 * Enum generated for field OrderStatus
 */
export enum OrderStatus {
  UNPAID = "UNPAID",
  READY_TO_SHIP = "READY_TO_SHIP",
  PROCESSED = "PROCESSED",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  IN_CANCEL = "IN_CANCEL",
  CANCELLED = "CANCELLED",
}
/**
 * CancelOrder_Item sub-interface for CancelOrderRequest
 */
export interface CancelOrder_Item {
  /**
   * Id of item.
   */
  item_id: number;
  /**
   * Id of the model that belongs to the same item.
   */
  model_id: number;
}
/**
 * CancelOrder_PartialCancelItem sub-interface for CancelOrderRequest
 */
export interface CancelOrder_PartialCancelItem {
  /**
   * The unique identifier of the item to be partially cancelled.
   */
  item_id: number;
  /**
   * The unique identifier of the model to be partially cancelled.
   */
  model_id: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion.It's required for add on deal and bundle deal items.For items in one same add on deal or bundle deal promotion, the promotion_group_id should share the same id. For items not in add on deal or bundle deal promotion, the promotion_group_id should be 0. And the data is from promotion_group_id of v2,order.get_order_detail.
   */
  promotion_group_id?: number;
  /**
   * The quantity of the specified item model to be cancelled.
   */
  model_quantity: number;
}
/**
 * Request parameters for cancel_order
 *
 * Use this api to cancel an order. This action can only be performed before the order has been shipped.
 */
export interface CancelOrderRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * The reason seller want to cancel this order. Applicable values: OUT_OF_STOCKCUSTOMER_REQUESTUNDELIVERABLE_AREA (Note: Only apply for TW and MY)COD_NOT_SUPPORTED
   */
  cancel_reason: string;
  /**
   * Required when cancel_reason is OUT_OF_STOCK.
   */
  item_list?: CancelOrder_Item[];
  /**
   * The list of item models and quantities that the seller wants to partially cancel. This field should be provided when the seller intends to cancel only part of the order due to unavailable items while continuing to fulfill the remaining items.
   */
  partial_cancel_item_list?: CancelOrder_PartialCancelItem[];
}
/**
 * CancelOrder_Response sub-interface for CancelOrderResponse
 */
export interface CancelOrder_Response {
  /**
   * The time when the order is updated.
   */
  update_time?: Date | number;
}
/**
 * Response data payload for cancel_order
 */
export type CancelOrderResponseData = CancelOrder_Response;
/**
 * Response payload for cancel_order
 *
 * Use this api to cancel an order. This action can only be performed before the order has been shipped.
 */
export type CancelOrderResponse = FetchResponse<CancelOrderResponseData>;
/**
 * DownloadFbsInvoices_RequestId sub-interface for DownloadFbsInvoicesRequest
 */
export interface DownloadFbsInvoices_RequestId {
  request_id: number[];
}
/**
 * Request parameters for download_fbs_invoices
 *
 * This API allows you to download FBS invoices. To use this API, the client must first call v2.order.generate_fbs_invoices to create a new shipping document task, followed by calling v2.order.get_fbs_invoices_result to check the task status. The document can only be downloaded once the task status is "READY."
 */
export interface DownloadFbsInvoicesRequest {
  /**
   * list of request id (task identifiers)
   */
  request_id_list?: DownloadFbsInvoices_RequestId[];
}
/**
 * DownloadFbsInvoices_Response sub-interface for DownloadFbsInvoicesResponse
 */
export interface DownloadFbsInvoices_Response {
  request_id?: number;
  file_link?: string;
}
/**
 * Response data payload for download_fbs_invoices
 */
export type DownloadFbsInvoicesResponseData = DownloadFbsInvoices_Response;
/**
 * Response payload for download_fbs_invoices
 *
 * This API allows you to download FBS invoices. To use this API, the client must first call v2.order.generate_fbs_invoices to create a new shipping document task, followed by calling v2.order.get_fbs_invoices_result to check the task status. The document can only be downloaded once the task status is "READY."
 */
export type DownloadFbsInvoicesResponse = FetchResponse<DownloadFbsInvoicesResponseData>;
/**
 * Request parameters for download_invoice_doc
 *
 * This endpoint only for PH and BR local seller. Seller can download the invoice uploaded before through this endpoint.
 */
export interface DownloadInvoiceDocRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
}
/**
 * Response data payload for download_invoice_doc
 */
export interface DownloadInvoiceDocResponseData {
  invoice_doc?: any;
}
/**
 * Response payload for download_invoice_doc
 *
 * This endpoint only for PH and BR local seller. Seller can download the invoice uploaded before through this endpoint.
 */
export type DownloadInvoiceDocResponse = FetchResponse<DownloadInvoiceDocResponseData>;
/**
 * GenerateFbsInvoices_BatchDownload sub-interface for GenerateFbsInvoicesRequest
 */
export interface GenerateFbsInvoices_BatchDownload {
  /**
   * Format YYYYMMDDe.g. 20240101
   */
  start: number;
  /**
   * Format YYYYMMDDe.g. 20240101
   */
  end: number;
  /**
   * 1 = Remessa2 = Return3 = Symbolic Return4 = Sale5 = Entrada6 = Symbolic Remessa7 = all
   */
  document_type: number;
  /**
   * 1 = xml only2 = pdf only3 = both
   */
  file_type: number;
  /**
   * 1= authorized only2= cancelledDefault: If document_status not passed or passed empty, means documents under ALL status (both authorized and cancelled) must be included
   */
  document_status?: number;
}
/**
 * Request parameters for generate_fbs_invoices
 *
 * This API creates a task to download a specific tax document (e.g., sales invoice, remessa invoice) for the seller's account, available only after the document is issued by the system as part of the Fulfilled by Shopee (FBS) process.
 * The workflow is as follows: (1) v2.order.generate_fbs_invoices; (2) v2.order.get_fbs_invoices_result; (3) v2.order.download_fbs_invoices.
 * Please note: The download link for the document will expire 30 minutes after being generated.
 */
export interface GenerateFbsInvoicesRequest {
  batch_download?: GenerateFbsInvoices_BatchDownload;
}
/**
 * GenerateFbsInvoices_Result sub-interface for GenerateFbsInvoicesResponse
 */
export interface GenerateFbsInvoices_Result {
  /**
   * Unique task identifier that includes one or more tax documents to be downloaded according to the filters sent in the request.
   */
  request_id?: number;
  /**
   * Indicate error type if one element hit error. Empty if no error happened.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error. Empty if no error happened.
   */
  fail_message?: string;
}
/**
 * Response data payload for generate_fbs_invoices
 */
export interface GenerateFbsInvoicesResponseData {
  /**
   * Error messages
   */
  error_msg?: string;
  result_list?: GenerateFbsInvoices_Result[];
}
/**
 * Response payload for generate_fbs_invoices
 *
 * This API creates a task to download a specific tax document (e.g., sales invoice, remessa invoice) for the seller's account, available only after the document is issued by the system as part of the Fulfilled by Shopee (FBS) process.
 * The workflow is as follows: (1) v2.order.generate_fbs_invoices; (2) v2.order.get_fbs_invoices_result; (3) v2.order.download_fbs_invoices.
 * Please note: The download link for the document will expire 30 minutes after being generated.
 */
export type GenerateFbsInvoicesResponse = FetchResponse<GenerateFbsInvoicesResponseData>;
/**
 * Request parameters for get_booking_detail
 *
 * Use this api to get booking detail.
 */
export interface GetBookingDetailRequest {
  /**
   * The set of booking_sn. If there are multiple booking_sn, you need to use English comma to connect them. limit [1,50]
   */
  booking_sn_list: string[];
  /**
   * The response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them. Available values: item_list,cancel_by,cancel_reason,fulfillment_flag,pickup_done_time,shipping_carrier, recipient_address, dropshipper, dropshipper_phone
   */
  response_optional_fields?: ResponseOptionalFields | string | number;
}
/**
 * GetBookingDetail_RecipientAddress sub-interface for GetBookingDetail_Booking
 */
export interface GetBookingDetail_RecipientAddress {
  /**
   * Recipient's name for the address.
   */
  name?: string;
  /**
   * Recipient's phone number input when booking was placed.
   */
  phone?: string;
  /**
   * The town of the recipient's address. Whether there is a town will depend on the region and/or country.
   */
  town?: Town | string | number;
  /**
   * The district of the recipient's address. Whether there is a district will depend on the region and/or country.
   */
  district?: District | string | number;
  /**
   * The city of the recipient's address. Whether there is a city will depend on the region and/or country.
   */
  city?: City | string | number;
  /**
   * The state/province of the recipient's address. Whether there is a state/province will depend on the region and/or country.
   */
  state?: State | string | number;
  /**
   * The two-digit code representing the region of the Recipient.
   */
  region?: string;
  /**
   * Recipient's postal code.
   */
  zipcode?: string;
  /**
   * The full address of the recipient, including country, state, even street, and etc.
   */
  full_address?: string;
}
/**
 * GetBookingDetail_ImageInfo sub-interface for GetBookingDetail_Item
 */
export interface GetBookingDetail_ImageInfo {
  /**
   * The image url of the product. Default to be variation image, if the model does not have a variation image, will use an item main image instead.
   */
  image_url?: string;
}
/**
 * GetBookingDetail_Item sub-interface for GetBookingDetail_Booking
 */
export interface GetBookingDetail_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The name of the item.
   */
  item_name?: string;
  /**
   * A item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  item_sku?: string;
  /**
   * ID of the model that belongs to the same item.
   */
  model_id?: number;
  /**
   * Name of the model that belongs to the same item. A seller can offer models of the same item. For example, the seller could create a fixed-priced listing for a t-shirt design and offer the shirt in different colors and sizes. In this case, each color and size combination is a separate model. Each model can have a different quantity and price.
   */
  model_name?: string;
  /**
   * A model SKU (stock keeping unit) is an identifier defined by a seller. It is only intended for the seller's use. Many sellers assign a SKU to an item of a specific type, size, and color, which are models of one item in Shopee Listings.
   */
  model_sku?: string;
  /**
   * The number of identical items from one listing/item in the same booking.
   */
  model_quantity_purchased?: number;
  /**
   * The weight of the item
   */
  weight?: number;
  /**
   * The fulfilment warehouse ID(s) of the items in the booking. (Multi-Warehouse sellers only)
   */
  product_location_id?: string;
  /**
   * Image info of the product.
   */
  image_info?: GetBookingDetail_ImageInfo;
}
/**
 * GetBookingDetail_Booking sub-interface for GetBookingDetail_Response
 */
export interface GetBookingDetail_Booking {
  /**
   * Return by default. Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * Shopee's unique identifier for an order. Only return if booking_status is MATCHED.
   */
  order_sn?: string;
  /**
   * Return by default. The two-digit code representing the region where the booking was made.
   */
  region?: string;
  /**
   * Return by default. Enumerated type that defines the current status of the booking. Available value: READY_TO_SHIP/PROCESSED/SHIPPED/CANCELLED/MATCHED
   */
  booking_status?: BookingStatus | string | number;
  /**
   * MATCH_PENDING/MATCH_SUCCESSFUL/MATCH_FAILED
   */
  match_status?: MatchStatus | string | number;
  /**
   * The logistics service provider that will deliver the booking.
   */
  shipping_carrier?: string;
  /**
   * Return by default. Timestamp that indicates the date and time that the booking was created.
   */
  create_time?: Date | number;
  /**
   * Return by default. Timestamp that indicates the last time that there was a change in value of booking, such as booking status changed from 'Processed' to 'Shipped'.
   */
  update_time?: Date | number;
  /**
   * Return by default. The deadline to ship out the parcel.
   */
  ship_by_date?: number;
  /**
   * This object contains detailed breakdown for the recipient address.
   */
  recipient_address?: GetBookingDetail_RecipientAddress;
  /**
   * This object contains the detailed breakdown for the result of this API call.
   */
  item_list?: GetBookingDetail_Item[];
  /**
   * For Indonesia bookings only. The name of the dropshipper.
   */
  dropshipper?: string;
  /**
   * The phone number of dropshipper, could be empty.
   */
  dropshipper_phone?: string;
  /**
   * Could be one of buyer, seller, system or Ops.
   */
  cancel_by?: string;
  /**
   * Use this field to get reason for buyer, seller, and system cancellation.
   */
  cancel_reason?: string;
  /**
   * Use this field to indicate the booking is fulfilled by shopee or seller. Applicable values: fulfilled_by_shopee, fulfilled_by_cb_seller, fulfilled_by_local_seller.
   */
  fulfillment_flag?: string;
  /**
   * The timestamp when pickup is done.
   */
  pickup_done_time?: Date | number;
}
/**
 * GetBookingDetail_Response sub-interface for GetBookingDetailResponse
 */
export interface GetBookingDetail_Response {
  /**
   * The list of bookings.
   */
  booking_list?: GetBookingDetail_Booking[];
}
/**
 * Response data payload for get_booking_detail
 */
export type GetBookingDetailResponseData = GetBookingDetail_Response;
/**
 * Response payload for get_booking_detail
 *
 * Use this api to get booking detail.
 */
export type GetBookingDetailResponse = FetchResponse<GetBookingDetailResponseData>;
/**
 * Request parameters for get_booking_list
 *
 * Use this api to search bookings. You may also filter them by status, if needed.
 */
export interface GetBookingListRequest {
  /**
   * The kind of time_from and time_to. Available value: create_time, update_time.
   */
  time_range_field: TimeRangeField | string | number;
  /**
   * The time_from and time_to fields specify a date range for retrieving bookings (based on the time_range_field). The time_from field is the starting date range. The maximum date range that may be specified with the time_from and time_to fields is 15 days.
   */
  time_from: number;
  /**
   * The time_from and time_to fields specify a date range for retrieving bookings (based on the time_range_field). The time_from field is the starting date range. The maximum date range that may be specified with the time_from and time_to fields is 15 days.
   */
  time_to: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data.The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
  /**
   * The booking_status filter for retrieving bookings and each one only every request. Available value: READY_TO_SHIP/PROCESSED/SHIPPED/CANCELLED/MATCHED
   */
  booking_status?: BookingStatus | string | number;
}
/**
 * GetBookingList_Booking sub-interface for GetBookingList_Response
 */
export interface GetBookingList_Booking {
  /**
   * Shopee's unique identifier for a booking.
   */
  booking_sn?: string;
  /**
   * Shopee's unique identifier for an order. Only return if booking_status is MATCHED.
   */
  order_sn?: string;
  /**
   * The booking_status filter for retrieving booking and each one only every request. Available value: READY_TO_SHIP/PROCESSED/SHIPPED/CANCELLED/MATCHED
   */
  booking_status?: BookingStatus | string | number;
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * GetBookingList_Response sub-interface for GetBookingListResponse
 */
export interface GetBookingList_Response {
  /**
   * This is to indicate whether the booking list is more than one page. If this value is true, you may want to continue to check next page to retrieve bookings.
   */
  more?: boolean;
  booking_list?: GetBookingList_Booking[];
}
/**
 * Response data payload for get_booking_list
 */
export type GetBookingListResponseData = GetBookingList_Response;
/**
 * Response payload for get_booking_list
 *
 * Use this api to search bookings. You may also filter them by status, if needed.
 */
export type GetBookingListResponse = FetchResponse<GetBookingListResponseData>;
/**
 * GetBuyerInvoiceInfo_Querie sub-interface for GetBuyerInvoiceInfoRequest
 */
export interface GetBuyerInvoiceInfo_Querie {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
}
/**
 * Request parameters for get_buyer_invoice_info
 *
 * API to obtain buyer submitted invoice info for VN, TH and PH local sellers only.
 */
export interface GetBuyerInvoiceInfoRequest {
  queries: GetBuyerInvoiceInfo_Querie[];
}
/**
 * GetBuyerInvoiceInfo_AddressBreakdown sub-interface for GetBuyerInvoiceInfo_InvoiceDetail
 */
export interface GetBuyerInvoiceInfo_AddressBreakdown {
  /**
   * Return region value- PH, TH only
   */
  region?: string;
  /**
   * Return value- TH: Province
   */
  state?: string;
  /**
   * Return value- TH: District
   */
  city?: string;
  /**
   * Return value- TH: Sub district
   */
  town?: string;
  /**
   * Return value- TH: Postal code- PH: Postal code
   */
  postcode?: string;
  /**
   * Return value- PH: Additional details, i.e. street name, building- TH: Additional details, i.e. house number
   */
  detailed_address?: string;
  /**
   * Return value:- Empty for PH, TH
   */
  additional_info?: string;
  /**
   * - only has value when invoice_type is personal- Buyer address in format "detailed_address, town, district, state, postcode, additional_info" for all regions--- for TH: leave the 'additional_info' as empty
   */
  full_address?: string;
}
/**
 * GetBuyerInvoiceInfo_CompanyAddressBreakdown sub-interface for GetBuyerInvoiceInfo_InvoiceDetail
 */
export interface GetBuyerInvoiceInfo_CompanyAddressBreakdown {
  /**
   * Return region value- PH, TH only
   */
  company_region?: string;
  /**
   * Return value- PH: Province- TH: Province
   */
  company_state?: string;
  /**
   * Return value- PH: City
   */
  company_city?: string;
  /**
   * Return value- PH: Barangay- TH: District
   */
  company_district?: string;
  /**
   * Return value- TH: Sub district
   */
  company_town?: string;
  /**
   * Return postal code- TH, PH only
   */
  company_postcode?: string;
  /**
   * Return value- PH: Detailed address- TH: Detailed address
   */
  company_detailed_address?: string;
  /**
   * Return value:- Empty for PH, TH
   */
  company_additional_info?: string;
  /**
   * Concatenation of company address breakdown- only has value when invoice_type is company
   */
  company_full_address?: string;
}
/**
 * GetBuyerInvoiceInfo_HouseholdAddressBreakdown sub-interface for GetBuyerInvoiceInfo_InvoiceDetail
 */
export interface GetBuyerInvoiceInfo_HouseholdAddressBreakdown {
  /**
   * Region of the household address.
   */
  household_region?: string;
  /**
   * State of the household address.
   */
  household_state?: string;
  /**
   * City of the household address.
   */
  household_city?: string;
  /**
   * Province of the household address.
   */
  household_province?: string;
  /**
   * District of the household address.
   */
  household_district?: string;
  /**
   * Town of the household address.
   */
  household_town?: string;
  /**
   * Barangay of the household address.
   */
  household_barangay?: string;
  /**
   * Postal code of the household address.
   */
  household_postcode?: string;
  /**
   * Detailed street address of the household.
   */
  household_detailed_address?: string;
  /**
   * Additional address information provided by the buyer.
   */
  household_additional_info?: string;
  /**
   * Full formatted household address.
   */
  household_full_address?: string;
}
/**
 * GetBuyerInvoiceInfo_InvoiceDetail sub-interface for GetBuyerInvoiceInfo_InvoiceInfo
 */
export interface GetBuyerInvoiceInfo_InvoiceDetail {
  /**
   * Buyer name (has value when invoice_type is personal, household, or company)- VN, TH, PH only
   */
  name?: string;
  /**
   * Buyer email address (has value when invoice_type is personal and household)- VN, TH, PH only
   */
  email?: string;
  /**
   * Buyer phone number- TH only
   */
  phone_number?: string;
  /**
   * has value when invoice_type is personal and household. - VN, TH, PH only
   */
  tax_id?: string;
  /**
   * Buyer address in format "Street & number, city, zipcode, any additional info provided by buyer" (has value when invoice_type is personal and household)- PH, VN only
   */
  address?: string;
  /**
   * Same function as the address, only having a different field name for TH.Buyer address in format "Street & number, city, zipcode, any additional info provided by buyer" (only has value when invoice_type is personal).
   */
  id_card_address?: string;
  /**
   * Buyer address breakdown.- TH, PH only
   */
  address_breakdown?: GetBuyerInvoiceInfo_AddressBreakdown;
  /**
   * - return value for TH only (only has value when invoice_type is company)
   */
  company_head_office?: string;
  /**
   * - Only return value when invoice type is company- VN, TH, PH only
   */
  company_name?: string;
  /**
   * - Only return value when invoice type is company- TH only
   */
  company_branch_name?: string;
  /**
   * - Only return value when invoice type is company- TH only
   */
  company_branch_id?: string;
  /**
   * - Only return value when invoice type is company- TH only
   */
  company_type?: string;
  /**
   * - Only return value when invoice type is company- VN, TH, PH only
   */
  company_email?: string;
  /**
   * - Only return value when invoice type is company- VN, TH, PH only
   */
  company_tax_id?: string;
  /**
   * Buyer address in format "Street & number,city, zipcode, any additional info provided by buyer" (only has value when invoice_type is company)- VN, TH only
   */
  company_address?: string;
  /**
   * Company address breakdown- PH, TH only
   */
  company_address_breakdown?: GetBuyerInvoiceInfo_CompanyAddressBreakdown;
  /**
   * Household address breakdown-Only for VN
   */
  household_address_breakdown?: GetBuyerInvoiceInfo_HouseholdAddressBreakdown;
  /**
   * National ID information provided by the buyer.- Only return value when invoice_type is personal- VN only
   */
  national_id?: string;
}
/**
 * GetBuyerInvoiceInfo_InvoiceInfo sub-interface for GetBuyerInvoiceInfoResponse
 */
export interface GetBuyerInvoiceInfo_InvoiceInfo {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Type of invoice requested: {1: personal, 2: company, 3: household}.
   */
  invoice_type?: string;
  /**
   * Invoice info submitted by buyer. Might be masked, e.g. A****b, depending on order status.
   */
  invoice_detail?: GetBuyerInvoiceInfo_InvoiceDetail;
  /**
   * Error in retrieving the receipt setting of a particular order.
   */
  error?: string;
  /**
   * To identify order with and without buyer request, applicable to PL.
   */
  is_requested?: boolean;
}
/**
 * Response data payload for get_buyer_invoice_info
 */
export interface GetBuyerInvoiceInfoResponseData {
  invoice_info_list?: GetBuyerInvoiceInfo_InvoiceInfo[];
}
/**
 * Response payload for get_buyer_invoice_info
 *
 * API to obtain buyer submitted invoice info for VN, TH and PH local sellers only.
 */
export type GetBuyerInvoiceInfoResponse = FetchResponse<GetBuyerInvoiceInfoResponseData>;
/**
 * GetEstimateCancelValue_PartialCancelItem sub-interface for GetEstimateCancelValueRequest
 */
export interface GetEstimateCancelValue_PartialCancelItem {
  /**
   * The unique identifier of the item to be included in the estimated cancellation value calculation.
   */
  item_id: number;
  /**
   * The unique identifier of the model to be included in the estimated cancellation value calculation.
   */
  model_id: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion.It's required for add on deal and bundle deal items.For items in one same add on deal or bundle deal promotion, the promotion_group_id should share the same id. For items not in add on deal or bundle deal promotion, the promotion_group_id should be 0. And the data is from promotion_group_id of v2,order.get_order_detail.
   */
  promotion_group_id?: number;
  /**
   * The quantity of the specified item model to be included in the estimated cancellation value calculation.
   */
  model_quantity: number;
}
/**
 * Request parameters for get_estimate_cancel_value
 *
 * Returns the estimated refund value for a partial order cancellation given the specified items to cancel.
 */
export interface GetEstimateCancelValueRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * The list of item models and quantities for which the seller wants to estimate the cancellation value before submitting the actual partial cancellation request.
   */
  partial_cancel_item_list: GetEstimateCancelValue_PartialCancelItem[];
}
/**
 * Response data payload for get_estimate_cancel_value
 */
export interface GetEstimateCancelValueResponseData {
  /**
   * The estimated cancellation value for the selected item quantities. This value is calculated before the actual cancellation is submitted and can be used by sellers to preview the expected cancellation amount and support partial cancellation confirmation.
   */
  cancel_value_price?: string;
}
/**
 * Response payload for get_estimate_cancel_value
 *
 * Returns the estimated refund value for a partial order cancellation given the specified items to cancel.
 */
export type GetEstimateCancelValueResponse = FetchResponse<GetEstimateCancelValueResponseData>;
/**
 * GetFbsInvoicesResult_RequestId sub-interface for GetFbsInvoicesResultRequest
 */
export interface GetFbsInvoicesResult_RequestId {
  /**
   * A list of integers representing the request IDs to be queried.
   */
  request_id: number[];
}
/**
 * Request parameters for get_fbs_invoices_result
 *
 * This API allows you to consult the status of a previously requested batch download for FBS tax documents.
 */
export interface GetFbsInvoicesResultRequest {
  /**
   * -
   */
  request_id_list: GetFbsInvoicesResult_RequestId[];
}
/**
 * GetFbsInvoicesResult_Result sub-interface for GetFbsInvoicesResultResponse
 */
export interface GetFbsInvoicesResult_Result {
  /**
   * Represents the current status of the request
   */
  request_id?: number;
  /**
   * Name of the file to be downloaded
   */
  file_name?: string;
  /**
   * Represents the current status of the request
   */
  status?: string;
}
/**
 * Response data payload for get_fbs_invoices_result
 */
export interface GetFbsInvoicesResultResponseData {
  /**
   * Indicate error details if hit error. Empty if no error happened.
   */
  error_msg?: string;
  result_list?: GetFbsInvoicesResult_Result[];
}
/**
 * Response payload for get_fbs_invoices_result
 *
 * This API allows you to consult the status of a previously requested batch download for FBS tax documents.
 */
export type GetFbsInvoicesResultResponse = FetchResponse<GetFbsInvoicesResultResponseData>;
/**
 * Request parameters for get_order_detail
 *
 * Use this api to get order detail.
 */
export interface GetOrderDetailRequest {
  /**
   * The set of order_sn. If there are multiple order_sn, you need to use English comma to connect them. limit [1,50]
   */
  order_sn_list: string[];
  /**
   * Compatible parameter during migration period, send True will let API support PENDING status and return  pending_terms, send False or don’t send will fallback to old logic
   */
  request_order_status_pending?: boolean;
  /**
   * a response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them.  Available values: buyer_user_id,buyer_username,estimated_shipping_fee,recipient_address,actual_shipping_fee ,goods_to_declare,note,note_update_time,item_list,pay_time,dropshipper, dropshipper_phone,split_up,buyer_cancel_reason,cancel_by,cancel_reason,actual_shipping_fee_confirmed,buyer_cpf_id,fulfillment_flag,pickup_done_time,package_list,shipping_carrier,payment_method,total_amount,buyer_username,invoice_data,order_chargeable_weight_gram,return_request_due_date,edt,payment_info,international_label
   */
  response_optional_fields?: ResponseOptionalFields | string | number;
}
/**
 * GetOrderDetail_Geolocation sub-interface for GetOrderDetail_RecipientAddress
 */
export interface GetOrderDetail_Geolocation {
  /**
   * Latitude.
   */
  latitude?: number;
  /**
   * Longitude.
   */
  longitude?: number;
}
/**
 * GetOrderDetail_RecipientAddress sub-interface for GetOrderDetail_Order
 */
export interface GetOrderDetail_RecipientAddress {
  /**
   * Recipient's name for the address.
   */
  name?: string;
  /**
   * Recipient's phone number input when order was placed.[Only for TW non-integrated channel] Will return "****" when the "virtual_contact_number" is available
   */
  phone?: string;
  /**
   * The town of the recipient's address. Whether there is a town will depend on the region and/or country.
   */
  town?: Town | string | number;
  /**
   * The district of the recipient's address. Whether there is a district will depend on the region and/or country.
   */
  district?: District | string | number;
  /**
   * The city of the recipient's address. Whether there is a city will depend on the region and/or country.
   */
  city?: City | string | number;
  /**
   * The state/province of the recipient's address. Whether there is a state/province will depend on the region and/or country.
   */
  state?: State | string | number;
  /**
   * The two-digit code representing the region of the Recipient.
   */
  region?: string;
  /**
   * Recipient's postal code.
   */
  zipcode?: string;
  /**
   * The full address of the recipient, including country, state, even street, and etc.
   */
  full_address?: string;
  /**
   * Geolocation info. Only available for logistics_channel_id 90026.
   */
  geolocation?: GetOrderDetail_Geolocation;
}
/**
 * GetOrderDetail_ImageInfo sub-interface for GetOrderDetail_Item
 */
export interface GetOrderDetail_ImageInfo {
  /**
   * The image url of the product. Default to be variation image, if the model does not have a variation image, will use an item main image instead.
   */
  image_url?: string;
}
/**
 * GetOrderDetail_Promotion sub-interface for GetOrderDetail_Item
 */
export interface GetOrderDetail_Promotion {
  /**
   * Indicates the type of item or package level promotion applied to a product. Each item can be associated with at most one item promotion and one package promotion at a time.Item Promotions:low_price_promotiondeep_discountplatform_saleseller_discountflash_salewholesalewelcome_package_free_giftbrand_flash_salein_shop_flash_salesynced_promoplatform_streaming_priceseller_streaming_priceexclusive_streamer_priceprice_bidding_with_rebateprice_bidding_without_rebateseller_advisor_priceselling_pricesettlement_pricecampaign_settlement_pricelocal_sip_settlement_priceplatform_exclusive_priceseller_exclusive_priceseller_member_exclusive_skuitem_priceorder_sync_pricePackage Promotions:bundle_dealadd_on_deal_mainadd_on_deal_sub
   */
  promotion_type?: string;
  /**
   * Represents the unique identifier of a specific promotion applied to an item. Each promotion_id corresponds to a distinct promotion rule or campaign, defined under a particular promotion_type. The value is expressed in a numeric string format.
   */
  promotion_id?: number;
}
/**
 * GetOrderDetail_Item sub-interface for GetOrderDetail_Order
 */
export interface GetOrderDetail_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The name of the item.
   */
  item_name?: string;
  /**
   * A item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  item_sku?: string;
  /**
   * ID of the model that belongs to the same item.
   */
  model_id?: number;
  /**
   * Name of the model that belongs to the same item. A seller can offer models of the same item. For example, the seller could create a fixed-priced listing for a t-shirt design and offer the shirt in different colors and sizes. In this case, each color and size combination is a separate model. Each model can have a different quantity and price.
   */
  model_name?: string;
  /**
   * A model SKU (stock keeping unit) is an identifier defined by a seller. It is only intended for the seller's use. Many sellers assign a SKU to an item of a specific type, size, and color, which are models of one item in Shopee Listings.
   */
  model_sku?: string;
  /**
   * The number of identical items purchased at the same time by the same buyer from one listing/item.
   */
  model_quantity_purchased?: number;
  /**
   * The original price of the item in the listing currency.
   */
  model_original_price?: number;
  /**
   * The after-discount price of the item in the listing currency. If there is no discount, this value will be same as that of model_original_price. In case of bundle deal item, this value will return 0 as by design bundle deal discount will not be breakdown to item/model level. Due to technical restriction, the value will return the price before bundle deal if we don't configure it to 0. Please call GetEscrowDetails if you want to calculate item-level discounted price for bundle deal item.
   */
  model_discounted_price?: number;
  /**
   * This value indicates whether buyer buy the order item in wholesale price.
   */
  wholesale?: boolean;
  /**
   * The weight of the item
   */
  weight?: number;
  /**
   * To indicate if this item belongs to an addon deal.
   */
  add_on_deal?: boolean;
  /**
   * To indicate if this item is main item or sub item. True means main item, false means sub item.
   */
  main_item?: boolean;
  /**
   * A unique ID to distinguish groups of items in Cart, and Order. (e.g. AddOnDeal)
   */
  add_on_deal_id?: number;
  /**
   * Available type：product_promotion, flash_sale, bundle_deal, add_on_deal_main, add_on_deal_sub.For items which attend multiple promotions will only show one promotion, the order of priority is: bundle_deal > add_on_deal_main > add_on_deal_sub > product_promotion >flash_sale
   */
  promotion_type?: string;
  /**
   * The ID of the promotion.
   */
  promotion_id?: number;
  /**
   * The identify of order item.
   */
  order_item_id?: number;
  /**
   * The identity of order item. In case the order item is a bundle deal, this value will be unique to distinguish the order item
   */
  line_item_id?: number;
  /**
   * The identify of product promotion.
   */
  promotion_group_id?: number;
  /**
   * Image info of the product.
   */
  image_info?: GetOrderDetail_ImageInfo;
  /**
   * The fulfilment warehouse ID(s) of the items in the order. (Multi-Warehouse sellers only)
   */
  product_location_id?: string;
  /**
   * To indicate if this item is prescription item. Only for PH, TH, ID local shop.
   */
  is_prescription_item?: boolean;
  /**
   * To indicate if there was an error when validating whether this item is prescription. Default false. If is_prescription_item=false and this field is true, the item's prescription status is uncertain (label service call failed). Only for TH, PH, ID local shop.
   */
  error_in_fetching_is_prescription_item?: boolean;
  /**
   * An identifier of teleconsultation session which buyer did to order this item. Empty if item is not ordered through teleconsultation session
   */
  consultation_id?: string;
  /**
   * determine if item is B2C_shop_itemIt should be `is_b2c_shop_item` but it was a bug from dev. Then now it's is_b2c_owned_item
   */
  is_b2c_owned_item?: boolean;
  promotion_list?: GetOrderDetail_Promotion[];
  /**
   * [Only for PH,TH,VN,MY,BR,TW] True if the item is hot listing.
   */
  hot_listing_item?: boolean;
  /**
   * The quantity of the item model that remains active in the order and is still expected to be fulfilled.
   */
  active_qty?: number;
  /**
   * The quantity of the item model that is currently under a cancellation request but has not yet reached the final cancelled status.
   */
  cancel_requested_qty?: number;
  /**
   * The quantity of the item model that has already been successfully cancelled.
   */
  cancelled_qty?: number;
  /**
   * The quantity of the item model that is currently under a return/refund request.
   */
  return_requested_qty?: number;
  /**
   * The quantity of the item model that has already been successfully returned through the return/refund process.
   */
  returned_qty?: number;
}
/**
 * GetOrderDetail_GetOrderDetail_Item sub-interface for GetOrderDetail_Package
 */
export interface GetOrderDetail_GetOrderDetail_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  /**
   * The number of identical items/variations purchased at the same time by the same buyer from one listing/item.
   */
  model_quantity?: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion.
   */
  promotion_group_id?: number;
  /**
   * The warehouse ID of the item.
   */
  product_location_id?: string;
}
/**
 * GetOrderDetail_Package sub-interface for GetOrderDetail_Order
 */
export interface GetOrderDetail_Package {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The Shopee logistics status for the order. Applicable values: See Data Definition-LogisticsStatus.
   */
  logistics_status?: string;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The logistics service provider that the buyer selected for the order to deliver items. Note: If logistics_channel_id is 90021, 90025 or 90026, service_code will be appended, e.g., Entrega Turbo - M1020.
   */
  shipping_carrier?: string;
  /**
   * To indicate whether the package allows for self-designed AWB, if allow_self_design_awb returns false, it means that the package does not allow for self-designed AWB and only the system-AWB can be used.
   */
  allow_self_design_awb?: boolean;
  /**
   * The lis of items.
   */
  item_list?: GetOrderDetail_GetOrderDetail_Item[];
  /**
   * display weight used to calculate ASF for this parcel
   */
  parcel_chargeable_weight?: number;
  /**
   * The common identifier for multiple orders combined in the same parcel.
   */
  group_shipment_id?: number;
  /**
   * [Only for TW non-integrated channel] The virtual phone number to contact the recipient.
   */
  virtual_contact_number?: string;
  /**
   * [Only for TW non-integrated channel] The query number used in virtual phone number calls to contact the recipient of this package.
   */
  package_query_number?: string;
  /**
   * [Only for TW 30029 channel] This field indicate the sorting group value of the package. This field is only available for logistics_channel_id = 30029 and after the package has been arranged for shipment.
   */
  sorting_group?: string;
}
/**
 * GetOrderDetail_InvoiceData sub-interface for GetOrderDetail_Order
 */
export interface GetOrderDetail_InvoiceData {
  /**
   * The number of the invoice.
   */
  number?: string;
  /**
   * The series number of the invoice.
   */
  series_number?: string;
  /**
   * The access key of the invoice.
   */
  access_key?: string;
  /**
   * The issue date of the invoice.
   */
  issue_date?: Date | number;
  /**
   * The total value of the invoice.
   */
  total_value?: number;
  /**
   * The products total value of the invoice.
   */
  products_total_value?: number;
  /**
   * The tax code for the invoice.
   */
  tax_code?: string;
  /**
   * The invoice statuses should be:- valid (The invoice sent is valid)- pending (System is waiting to receive the invoice)
   */
  status?: string;
  /**
   * It's the failed reason if status is pending
   */
  pending_reason?: string;
}
/**
 * GetOrderDetail_PaymentInfo sub-interface for GetOrderDetail_Order
 */
export interface GetOrderDetail_PaymentInfo {
  /**
   * [Only for BR] Payment method used in the order, such as Credit Card, Debit Card, Pix, etc.
   */
  payment_method?: string;
  /**
   * [Only for BR] CNPJ of the payment processor handling the transaction.
   */
  payment_processor_register?: string;
  /**
   * [Only for BR] Card brand for credit or debit transactions, such as VISA, MASTER, etc. Empty string for Pix payments.
   */
  card_brand?: string;
  /**
   * [Only for BR] Payment authorization code generated by the bank or payment processor to validate the transaction.
   */
  transaction_id?: string;
  /**
   * [Only for BR] Amount paid by the corresponding payment method.
   */
  payment_amount?: number;
}
/**
 * GetOrderDetail_Order sub-interface for GetOrderDetail_Response
 */
export interface GetOrderDetail_Order {
  /**
   * Return by default. Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Return by default. The two-digit code representing the region where the order was made.
   */
  region?: string;
  /**
   * Return by default. The three-digit code representing the currency unit for which the order was paid.
   */
  currency?: string;
  /**
   * Return by default. This value indicates whether the order was a COD (cash on delivery) order.
   */
  cod?: boolean;
  /**
   * The total amount paid by the buyer for the order. This amount includes the total sale price of items, shipping cost beared by buyer; and offset by Shopee promotions if applicable. This value will only return after the buyer has completed payment for the order.
   */
  total_amount?: number;
  /**
   * The list of pending terms. Applicable values:- SYSTEM_PENDING: Under Shopee internal processing.- KYC_PENDING: Under KYC checking (TW CB order only).- ARRANGE_SHIPMENT_PENDING: Temporarily held due to 3PL capacity constraints.
   */
  pending_terms?: string[];
  /**
   * The value of this field is the description of pending reason corresponding with pending terms. Applicable values: - For SYSTEM_PENDING: Order is being processed by Shopee.- For KYC_PENDING: Order is pending buyer TW KYC pre-authorization.- For ARRANGE_SHIPMENT_PENDING: Allocating delivery resources due to high order volume. Label print will be available within 4 days after buyer paid.
   */
  pending_description?: string[];
  /**
   * Return by default. Enumerated type that defines the current status of the order.
   */
  order_status?: string;
  /**
   * The logistics service provider that the buyer selected for the order to deliver items. Note: If logistics_channel_id is 90021, 90025 or 90026, service_code will be appended, e.g., Entrega Turbo - M1020.
   */
  shipping_carrier?: string;
  /**
   * The payment method that the buyer selected to pay for the order. Applicable values: See Data Definition- Payment Methods.
   */
  payment_method?: string;
  /**
   * The estimated shipping fee is an estimation calculated by Shopee based on specific logistics courier's standard.
   */
  estimated_shipping_fee?: number;
  /**
   * Return by default. Message to seller.
   */
  message_to_seller?: string;
  /**
   * Return by default. Timestamp that indicates the date and time that the order was created.
   */
  create_time?: Date | number;
  /**
   * Return by default. Timestamp that indicates the last time that there was a change in value of order, such as order status changed from 'Paid' to 'Completed'.
   */
  update_time?: Date | number;
  /**
   * Return by default. Shipping preparation time set by the seller when listing item on Shopee.
   */
  days_to_ship?: number;
  /**
   * Return by default. The deadline to ship out the parcel.
   */
  ship_by_date?: Date | number;
  /**
   * The user id of buyer of this order, will be empty if it is a non-integrated order in TW region.
   */
  buyer_user_id?: number;
  /**
   * The name of buyer, will be masked as "****" if it is a non-integrated order in TW region.
   */
  buyer_username?: string;
  /**
   * This object contains detailed breakdown for the recipient address.Different parameters might be masked according to each market and kind of seller.For TW region integrated channel orders will be all masked as "****". More details may refer the announcement.
   */
  recipient_address?: GetOrderDetail_RecipientAddress;
  /**
   * The actual shipping fee of the order if available from external logistics partners.
   */
  actual_shipping_fee?: number;
  /**
   * Only work for cross-border order.This value indicates whether the order contains goods that are required to declare at customs. "T" means true and it will mark as "T" on the shipping label; "F" means false and it will mark as "P" on the shipping label. This value is accurate ONLY AFTER the order trackingNo is generated, please capture this value AFTER your retrieve the trackingNo.
   */
  goods_to_declare?: boolean;
  /**
   * The note seller made for own reference.
   */
  note?: string;
  /**
   * Update time for the note.
   */
  note_update_time?: Date | number;
  /**
   * This object contains the detailed breakdown for the result of this API call.
   */
  item_list?: GetOrderDetail_Item[];
  /**
   * The time when the order status is updated from UNPAID to PAID. This value is NULL when order is not paid yet.
   */
  pay_time?: Date | number;
  /**
   * For Indonesia orders only. The name of the dropshipper.
   */
  dropshipper?: string;
  /**
   * The phone number of dropshipper, could be empty.
   */
  dropshipper_phone?: string;
  /**
   * To indicate whether this order is split to fullfil order(forder) level. Call GetForderInfo if it's "true".
   */
  split_up?: boolean;
  /**
   * Cancel reason from buyer, could be empty.
   */
  buyer_cancel_reason?: string;
  /**
   * Could be one of buyer, seller, system or Ops.
   */
  cancel_by?: string;
  /**
   * Use this field to get reason for buyer, seller, and system cancellation.
   */
  cancel_reason?: string;
  /**
   * Use this filed to judge whether the actual_shipping_fee is confirmed.
   */
  actual_shipping_fee_confirmed?: boolean;
  /**
   * Buyer's CPF number for taxation and invoice purposes. Only for Brazil order.
   */
  buyer_cpf_id?: string;
  /**
   * Use this field to indicate the order is fulfilled by shopee or seller. Applicable values: fulfilled_by_shopee, fulfilled_by_cb_seller, fulfilled_by_local_seller.
   */
  fulfillment_flag?: string;
  /**
   * The timestamp when pickup is done.
   */
  pickup_done_time?: Date | number;
  /**
   * The list of package under an order
   */
  package_list?: GetOrderDetail_Package[];
  /**
   * The invoice data of the order.
   */
  invoice_data?: GetOrderDetail_InvoiceData;
  /**
   * For non masking order, the logistics service provider that the buyer selected for the order to deliver items.  For masking order, the logistics service type that the buyer selected for the order to deliver items.
   */
  checkout_shipping_carrier?: string;
  /**
   * Shopee charges the reverse shipping fee for the returned order.The value of this field will be non-negative.
   */
  reverse_shipping_fee?: number;
  /**
   * display weight used to calculate ASF for this order
   */
  order_chargeable_weight_gram?: number;
  /**
   * Prescription check status. For ID, PH whitelisted sellers, the applicable values:0: NONE1: PASSED2: FAILEDFor TH whitelisted sellers, the applicable values:0: NONE1: PASSED
   */
  prescription_check_status?: number;
  /**
   * Name of the Pharmacist for Prescription Order.
   */
  pharmacist_name?: string;
  /**
   * Return prescription images of this order, only for ID and PH whitelist sellers.Please add the prefix to review:for ID: https://cf.shopee.co.id/file/+prescription_imagefor PH:https://cf.shopee.ph/file/+prescription_image
   */
  prescription_images?: PrescriptionImages | string | number;
  /**
   * Time of when the prescription is approved.
   */
  prescription_approval_time?: Date | number;
  /**
   * Time of when the prescription is rejected.
   */
  prescription_rejection_time?: Date | number;
  /**
   * Return the reason why a prescription is rejected. If there is no rejection reason, return empty.Only for ID and PH whitelist sellers
   */
  prescription_reject_reason?: string;
  /**
   * To indicate if this order is buyer self collection at store order
   */
  is_buyer_shop_collection?: boolean;
  /**
   * The image url of the buyer self collection at the store.
   */
  buyer_proof_of_collection?: string[];
  /**
   * Earliest estimated delivery date of orders (only available for BR region)
   */
  edt_from?: Date | number;
  /**
   * Latest estimated delivery time of orders (only available for BR region)
   */
  edt_to?: Date | number;
  /**
   * Return by default. Shopee's unique identifier for a booking.Only returned for advance fulfilment matched order only.
   */
  booking_sn?: string;
  /**
   * Indicate whether order will be fulfilled using advance fulfilment stock or not. If value is true, order will be matched with a booking and seller should not arrange shipment.
   */
  advance_package?: boolean;
  /**
   * This field represents the deadline for buyers to initiate returns and refunds after order is completed.The “return_request_due_date” response parameter will be returned if the requested order meets ALL the conditions below:- The status of the order is COMPLETED- The return refund eligibility of the order is trueIf you have any questions related to the function of "returns and refunds after order is completed," please refer to the following link: https://seller.shopee.tw/edu/article/18474
   */
  return_request_due_date?: Date | number;
  /**
   * [Only for BR] List of payment information, to follow NT 2025.001 (BR government invoice rules).
   */
  payment_info?: GetOrderDetail_PaymentInfo[];
  /**
   * [Only for PH,TH,VN,MY,BR,TW] True if the order includes hot listing item.
   */
  hot_listing_order?: boolean;
  /**
   * [Only for BR] Indicate if the order is SIP order. This field will only be returned if international_label is included in response_optional_field in the request.
   */
  is_international?: boolean;
  /**
   * Indicates whether the order can be full cancelled: - If this value is true, seller can cancel the entire order- If the value is false, full order cancellation is not available for the order
   */
  can_full_cancel_order?: boolean;
  /**
   * Indicates whether the order is eligible for partial cancellation. This value is determined by both the system eligibility check and the buyer’s out-of-stock handling preference. - If this value is true, seller can cancel selected out-of-stock item quantities while continuing to fulfill the remaining items. - If this value is false, partial cancellation is not allowed.
   */
  can_partial_cancel_order?: boolean;
  /**
   * Indicates the buyer’s preference for handling out-of-stock items in the order. Applicable values:0 = Ship Available Items Only (The buyer allows the seller to cancel unavailable items and continue shipping the remaining available items)1 = Cancel The Entire Order (The buyer does not allow partial cancellation. If any item is unavailable, the seller should cancel the entire order instead)
   */
  buyer_preference_for_partial_cancellation?: number;
  /**
   * Indicates that this order is a refundable sample  order. Applicable values:0 = Order is not a refundable sample order1 = Order is a refundable sample order
   */
  affiliate_sample_type?: number;
}
/**
 * GetOrderDetail_Response sub-interface for GetOrderDetailResponse
 */
export interface GetOrderDetail_Response {
  /**
   * The list of orders.
   */
  order_list?: GetOrderDetail_Order[];
}
/**
 * Response data payload for get_order_detail
 */
export type GetOrderDetailResponseData = GetOrderDetail_Response;
/**
 * Response payload for get_order_detail
 *
 * Use this api to get order detail.
 */
export type GetOrderDetailResponse = FetchResponse<GetOrderDetailResponseData>;
/**
 * Request parameters for get_order_list
 *
 * Use this api to search orders. You may also filter them by status, if needed.
 */
export interface GetOrderListRequest {
  /**
   * The kind of time_from and time_to. Available value: create_time, update_time.
   */
  time_range_field: TimeRangeField | string | number;
  /**
   * The time_from and time_to fields specify a date range for retrieving orders (based on the time_range_field). The time_from field is the starting date range. The maximum date range that may be specified with the time_from and time_to fields is 15 days.
   */
  time_from: Date | number;
  /**
   * The time_from and time_to fields specify a date range for retrieving orders (based on the time_range_field). The time_from field is the starting date range. The maximum date range that may be specified with the time_from and time_to fields is 15 days.
   */
  time_to: Date | number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data.The limit of page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. The default is empty. If the data is more than one page, the offset can be some entry to start the next call.
   */
  cursor?: string;
  /**
   * The order_status filter for retriveing orders and each one only every request. Available value: UNPAID/READY_TO_SHIP/PROCESSED/SHIPPED/COMPLETED/IN_CANCEL/CANCELLED/INVOICE_PENDING
   */
  order_status?: OrderStatus | string | number;
  /**
   * Optional fields in response. Available value: order_status.
   */
  response_optional_fields?: string;
  /**
   * Compatible parameter during migration period, send True will let API support PENDING status, send False or don’t send will fallback to old logic.
   */
  request_order_status_pending?: boolean;
  /**
   * The identity of logistic channel. Valid only for BR.
   */
  logistics_channel_id?: number;
}
/**
 * GetOrderList_Order sub-interface for GetOrderList_Response
 */
export interface GetOrderList_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The order_status filter for retriveing orders and each one only every request. Available value: UNPAID/READY_TO_SHIP/PROCESSED/SHIPPED/COMPLETED/IN_CANCEL/CANCELLED
   */
  order_status?: OrderStatus | string | number;
  /**
   * Return by default. Shopee's unique identifier for a booking.Only returned for advance fulfilment matched order only.
   */
  booking_sn?: string;
}
/**
 * GetOrderList_Response sub-interface for GetOrderListResponse
 */
export interface GetOrderList_Response {
  /**
   * This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  more?: boolean;
  order_list?: GetOrderList_Order[];
  /**
   * If  more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_order_list
 */
export type GetOrderListResponseData = GetOrderList_Response;
/**
 * Response payload for get_order_list
 *
 * Use this api to search orders. You may also filter them by status, if needed.
 */
export type GetOrderListResponse = FetchResponse<GetOrderListResponseData>;
/**
 * Request parameters for get_package_detail
 *
 * Use this api to get package detail.
 */
export interface GetPackageDetailRequest {
  /**
   * The set of package_number. If there are multiple package_number, you need to use English comma to connect them. limit [1,50]
   */
  package_number_list: string[];
}
/**
 * GetPackageDetail_Item sub-interface for GetPackageDetail_Package
 */
export interface GetPackageDetail_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  /**
   * A item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  item_sku?: string;
  /**
   * ID of the model that belongs to the same item.
   */
  model_sku?: string;
  /**
   * The number of identical items/variations purchased at the same time by the same buyer from one listing/item.
   */
  model_quantity?: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion.
   */
  promotion_group_id?: number;
  /**
   * The warehouse ID of the item.
   */
  product_location_id?: string;
  /**
   * An identifier of teleconsultation session which buyer did to order this item. Empty if item is not ordered through teleconsultation session
   */
  consultation_id?: string;
  /**
   * To indicate if this item is a prescription item. Default false. Only for PH, TH, ID whitelist shops.
   */
  is_prescription_item?: boolean;
  /**
   * To indicate if there was an error when validating whether this item is prescription. Default false. If is_prescription_item=false and this field is true, the item's prescription status is uncertain (label service call failed). Only for PH, TH, ID whitelist shops.
   */
  error_in_fetching_is_prescription_item?: boolean;
  /**
   * Prescription check status. For ID, PH whitelisted sellers, the applicable values:0: NONE1: PASSED2: FAILEDFor TH whitelisted sellers, the applicable values:0: NONE1: PASSED
   */
  prescription_check_status?: number;
  /**
   * Return the reason why a prescription is rejected. If no rejection reason, return empty. Only for ID and PH whitelist sellers.
   */
  prescription_reject_reason?: string;
}
/**
 * GetPackageDetail_Geolocation sub-interface for GetPackageDetail_RecipientAddress
 */
export interface GetPackageDetail_Geolocation {
  /**
   * Latitude.
   */
  latitude?: number;
  /**
   * Longitude.
   */
  longitude?: number;
}
/**
 * GetPackageDetail_RecipientAddress sub-interface for GetPackageDetail_Package
 */
export interface GetPackageDetail_RecipientAddress {
  /**
   * Recipient's name for the address.
   */
  name?: string;
  /**
   * Recipient's phone number input when order was placed.[Only for TW non-integrated channel] Will return "****" when the "virtual_contact_number" is available
   */
  phone?: string;
  /**
   * The town of the recipient's address. Whether there is a town will depend on the region and/or country.
   */
  town?: Town | string | number;
  /**
   * The district of the recipient's address. Whether there is a district will depend on the region and/or country.
   */
  district?: District | string | number;
  /**
   * The city of the recipient's address. Whether there is a city will depend on the region and/or country.
   */
  city?: City | string | number;
  /**
   * The state/province of the recipient's address. Whether there is a state/province will depend on the region and/or country.
   */
  state?: State | string | number;
  /**
   * The two-digit code representing the region of the Recipient.
   */
  region?: string;
  /**
   * Recipient's postal code.
   */
  zipcode?: string;
  /**
   * The full address of the recipient, including country, state, even street, and etc.
   */
  full_address?: string;
  /**
   * Geolocation info. Only available for logistics_channel_id 90026.
   */
  geolocation?: GetPackageDetail_Geolocation;
}
/**
 * GetPackageDetail_StatusInfoTag sub-interface for GetPackageDetail_Package
 */
export interface GetPackageDetail_StatusInfoTag {
  /**
   * Shipping urgency tag type, applicable values below:0: No tag1: Will be cancelled within 1 day2: Must ship before the specified timestamp3: Shipment delayed4: Must ship within the current hour5: Will be cancelled at the specified timestamp
   */
  tag_id?: number;
  /**
   * When tag_id is 2 or 5, returns specific timestamp (e.g., cancel time, shipment deadline); otherwise returns 0.
   */
  timestamp?: Date | number;
}
/**
 * GetPackageDetail_DriverInfo sub-interface for GetPackageDetail_Package
 */
export interface GetPackageDetail_DriverInfo {
  /**
   * Driver Name
   */
  driver_name?: string;
  /**
   * Driver phone number
   */
  driver_phone?: string;
  /**
   * Delivery vehicle type
   */
  vehicle_type?: string;
  /**
   * License plate number
   */
  license_plate?: string;
  /**
   * URL of the driver's photo
   */
  courier_photo?: string;
  /**
   * Earliest estimated arrival time at pickup address
   */
  eta_start_time?: number;
  /**
   * Latest estimated arrival time at pickup address
   */
  eta_end_time?: number;
  /**
   * Driver status. Applicable values:- Allocating Driver- Driver assigned- Driver is on the way- Driver is arrived- Driver should arrive by {starting_time} - {end_time}
   */
  driver_status?: string;
}
/**
 * GetPackageDetail_InvoicePending sub-interface for GetPackageDetail_Package
 */
export interface GetPackageDetail_InvoicePending {
  /**
   * The invoice statuses should be:- valid (The invoice sent is valid)- pending (System is waiting to receive the invoice)
   */
  status?: string;
  /**
   * It's the failed reason if status is pending
   */
  pending_reason?: string;
}
/**
 * GetPackageDetail_Package sub-interface for GetPackageDetail_Response
 */
export interface GetPackageDetail_Package {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The Shopee fulfillment status for the package. Applicable values: See V2.0 Data Definition - PackageFulfillmentStatus.
   */
  fulfillment_status?: string;
  /**
   * Timestamp that indicates the last time that there was a change in value of package.
   */
  update_time?: number;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * The logistics service provider that the buyer selected for the package to deliver items. Note: If logistics_channel_id is 90021, 90025 or 90026, service_code will be appended, e.g., Entrega Turbo - M1020.
   */
  shipping_carrier?: string;
  /**
   * To indicate whether the package allows for self-designed AWB, if allow_self_design_awb returns false, it means that the package does not allow for self-designed AWB and only the system-AWB can be used.
   */
  allow_self_design_awb?: boolean;
  /**
   * Shipping preparation time set by the seller when listing item on Shopee.
   */
  days_to_ship?: number;
  /**
   * The deadline to ship out the package.
   */
  ship_by_date?: number;
  /**
   * The list of pending terms. Applicable values:- SYSTEM_PENDING: Under Shopee internal processing.- KYC_PENDING: Under KYC checking (TW CB order only).- ARRANGE_SHIPMENT_PENDING: Temporarily held due to 3PL capacity constraints.
   */
  pending_terms?: string[];
  /**
   * The value of this field is the description of pending reason corresponding with pending terms. Applicable values: - For SYSTEM_PENDING: Order is being processed by Shopee.- For KYC_PENDING: Order is pending buyer TW KYC pre-authorization.- For ARRANGE_SHIPMENT_PENDING: Allocating delivery resources due to high order volume. Label print will be available within 4 days after buyer paid.
   */
  pending_description?: string[];
  /**
   * The tracking number of this package.
   */
  tracking_number?: string;
  /**
   * [TW only] Tracking number expiration date
   */
  tracking_number_expiration_date?: number;
  /**
   * The timestamp when pickup is done.
   */
  pickup_done_time?: number;
  /**
   * To indicate whether this parcel is split.
   */
  is_split_up?: boolean;
  /**
   * The lis of items in the package.
   */
  item_list?: GetPackageDetail_Item[];
  /**
   * This object contains detailed breakdown for the recipient address.Different parameters might be masked according to each market and kind of seller.For TW region integrated channel orders will be all masked as "****". More details may refer the announcement.
   */
  recipient_address?: GetPackageDetail_RecipientAddress;
  /**
   * display weight used to calculate ASF for this parcel
   */
  parcel_chargeable_weight_gram?: number;
  /**
   * The common identifier for multiple orders combined in the same parcel.
   */
  group_shipment_id?: number;
  /**
   * [Only for TW non-integrated channel] The virtual phone number to contact the recipient.
   */
  virtual_contact_number?: string;
  /**
   * [Only for TW non-integrated channel] The query number used in virtual phone number calls to contact the recipient of this package.
   */
  package_query_number?: string;
  /**
   * [Only for TW 30029 channel] This field indicate the sorting group value of the package. This field is only available for logistics_channel_id = 30029 and after the package has been arranged for shipment.
   */
  sorting_group?: string;
  /**
   * Only effective when the package's logistics_status/fulfillment_status is LOGISTICS_READY. This parameter further distinguishes between two scenarios:- true: Package shipment has been arranged (Seller has processed shipment, system is generating tracking number, not yet updated to LOGISTICS_REQUEST_CREATED, no duplicate action needed)- false: Package awaiting shipment arrangement (Seller hasn't processed shipment yet, shipping arrangement required)
   */
  is_shipment_arranged?: boolean;
  /**
   * Package shipping urgency tag information.
   */
  status_info_tag?: GetPackageDetail_StatusInfoTag;
  /**
   * This field indicates whether this order can be split into multiple packages for separate shipment.- true: Support splitting, can call v2.order.split_order to execute- false: Does not support splitting
   */
  can_split_order?: boolean;
  /**
   * This field indicates whether this order can be unsplit.- true: Support unsplitting, can call v2.order.unsplit_order to execute- false: Does not support unsplitting
   */
  can_unsplit_order?: boolean;
  /**
   * This field indicates whether this order is a pre-order.- true: Pre-order- false: Non pre-order
   */
  is_pre_order?: boolean;
  /**
   * Name of the Pharmacist for Prescription Order.
   */
  pharmacist_name?: string;
  /**
   * Return prescription images of this order, only for ID and PH whitelist sellers.Please add the prefix to review:for ID: https://cf.shopee.co.id/file/+prescription_imagefor PH: https://cf.shopee.ph/file/+prescription_image
   */
  prescription_images?: PrescriptionImages | string | number;
  /**
   * Time of when the prescription is approved.
   */
  prescription_approval_time?: Date | number;
  /**
   * Time of when the prescription is rejected.
   */
  prescription_rejection_time?: Date | number;
  /**
   * To indicate if this order is buyer self collection at store order.
   */
  is_buyer_shop_collection?: boolean;
  /**
   * The image url of the proof for buyer self collection at the store.
   */
  buyer_proof_of_collection?: string[];
  /**
   * The system-calculated deadline for package preparation. When the package fulfillment_status/logistics_status changes to "LOGISTICS_READY", the system calculates this time based on the "Preparation Time" configured for the logistics channel of this package. Notes: 1) Only effective for logistics channels that have Auto Call Driver enabled and Preparation Time configured.2) Seller needs to complete packing and waybill printing before this time to ensure the package is ready when the driver arrives.3) When this time is reached, the system will automatically arrange shipment and trigger driver dispatch:- If driver calling is successful, the package fulfillment_status/logistics_status will change from “LOGISTICS_READY” to “LOGISTICS_REQUEST_CREATED”.- If driver calling fails, the package fulfillment_status/logistics_status will remain unchanged, and the seller must arrange shipment manually.
   */
  preparation_end_time?: Date | number;
  /**
   * After the driver is successfully called, the driver's information will be returned.Note: Data availability depends on the specific 3PL provider; certain fields may be omitted due to provider policies, PII restrictions, or data unavailability.
   */
  driver_info?: GetPackageDetail_DriverInfo;
  /**
   * Indicates whether the order can be full cancelled: - If this value is true, seller can cancel the entire order- If the value is false, full order cancellation is not available for the order
   */
  can_full_cancel_order?: boolean;
  /**
   * Indicates whether the order is eligible for partial cancellation. This value is determined by both the system eligibility check and the buyer’s out-of-stock handling preference. - If this value is true, seller can cancel selected out-of-stock item quantities while continuing to fulfill the remaining items. - If this value is false, partial cancellation is not allowed.
   */
  can_partial_cancel_order?: boolean;
  /**
   * Indicates the buyer’s preference for handling out-of-stock items in the order. Applicable values:0 = Ship Available Items Only (The buyer allows the seller to cancel unavailable items and continue shipping the remaining available items)1 = Cancel The Entire Order (The buyer does not allow partial cancellation. If any item is unavailable, the seller should cancel the entire order instead)
   */
  buyer_preference_for_partial_cancellation?: number;
  invoice_pending?: GetPackageDetail_InvoicePending;
}
/**
 * GetPackageDetail_Response sub-interface for GetPackageDetailResponse
 */
export interface GetPackageDetail_Response {
  /**
   * The list of packages.
   */
  package_list?: GetPackageDetail_Package[];
}
/**
 * Response data payload for get_package_detail
 */
export type GetPackageDetailResponseData = GetPackageDetail_Response;
/**
 * Response payload for get_package_detail
 *
 * Use this api to get package detail.
 */
export type GetPackageDetailResponse = FetchResponse<GetPackageDetailResponseData>;
/**
 * Request parameters for get_pending_buyer_invoice_order_list
 *
 * This endpoint only for PH and BR local sellers only. This API is used for seller to retrieve a list of order IDs that are pending invoice upload.
 */
export interface GetPendingBuyerInvoiceOrderListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data.The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetPendingBuyerInvoiceOrderList_Order sub-interface for GetPendingBuyerInvoiceOrderList_Response
 */
export interface GetPendingBuyerInvoiceOrderList_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
}
/**
 * GetPendingBuyerInvoiceOrderList_Response sub-interface for GetPendingBuyerInvoiceOrderListResponse
 */
export interface GetPendingBuyerInvoiceOrderList_Response {
  /**
   * This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  more?: boolean;
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
  order_list?: GetPendingBuyerInvoiceOrderList_Order[];
}
/**
 * Response data payload for get_pending_buyer_invoice_order_list
 */
export type GetPendingBuyerInvoiceOrderListResponseData = GetPendingBuyerInvoiceOrderList_Response;
/**
 * Response payload for get_pending_buyer_invoice_order_list
 *
 * This endpoint only for PH and BR local sellers only. This API is used for seller to retrieve a list of order IDs that are pending invoice upload.
 */
export type GetPendingBuyerInvoiceOrderListResponse =
  FetchResponse<GetPendingBuyerInvoiceOrderListResponseData>;
/**
 * Request parameters for get_shipment_list
 *
 * Use this api to get order list which order_status is READY_TO_SHIP or RETRY_SHIP to start process the whole shipping progress.
 */
export interface GetShipmentListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data.The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetShipmentList_Order sub-interface for GetShipmentList_Response
 */
export interface GetShipmentList_Order {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order
   */
  package_number?: string;
}
/**
 * GetShipmentList_Response sub-interface for GetShipmentListResponse
 */
export interface GetShipmentList_Response {
  /**
   * The list of  shipment orders
   */
  order_list?: GetShipmentList_Order[];
  /**
   * This is to indicate whether the order list is more than one page. If this value is true, you may want to continue to check next page to retrieve orders.
   */
  more?: boolean;
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response data payload for get_shipment_list
 */
export type GetShipmentListResponseData = GetShipmentList_Response;
/**
 * Response payload for get_shipment_list
 *
 * Use this api to get order list which order_status is READY_TO_SHIP or RETRY_SHIP to start process the whole shipping progress.
 */
export type GetShipmentListResponse = FetchResponse<GetShipmentListResponseData>;
/**
 * Request parameters for get_warehouse_filter_config
 *
 * For multi-warehouse shops, return all warehouses with packages that have not been SHIPPED including product_location_id and address_id. Compared to v2.shop.get_warehouse_detail, it covers some edge cases like warehouse that have been unlinked but still retain packages that have not been SHIPPED, and does not cover some cases like single warehouse with default product_location_id and FBS shop.
 */
export type GetWarehouseFilterConfigRequest = Record<string, never>;
/**
 * GetWarehouseFilterConfig_WarehouseFilter sub-interface for GetWarehouseFilterConfig_Response
 */
export interface GetWarehouseFilterConfig_WarehouseFilter {
  /**
   * The warehouse name filled in when creating the warehouse address.
   */
  warehouse_name?: string;
  /**
   * Type of warehouse. Applicable values:- 1: Local Warehouse- 2: CB Warehouse
   */
  warehouse_type?: number;
  /**
   * Location identifier for stocks. Different location_ids represent that your addresses are in different item stocks.
   */
  product_location_id?: string;
  /**
   * Identity of address.
   */
  address_id?: number;
  /**
   * Detail address of your warehouse.
   */
  address?: string;
}
/**
 * GetWarehouseFilterConfig_Response sub-interface for GetWarehouseFilterConfigResponse
 */
export interface GetWarehouseFilterConfig_Response {
  warehouse_filters?: GetWarehouseFilterConfig_WarehouseFilter[];
}
/**
 * Response data payload for get_warehouse_filter_config
 */
export type GetWarehouseFilterConfigResponseData = GetWarehouseFilterConfig_Response;
/**
 * Response payload for get_warehouse_filter_config
 *
 * For multi-warehouse shops, return all warehouses with packages that have not been SHIPPED including product_location_id and address_id. Compared to v2.shop.get_warehouse_detail, it covers some edge cases like warehouse that have been unlinked but still retain packages that have not been SHIPPED, and does not cover some cases like single warehouse with default product_location_id and FBS shop.
 */
export type GetWarehouseFilterConfigResponse = FetchResponse<GetWarehouseFilterConfigResponseData>;
/**
 * Request parameters for handle_buyer_cancellation
 *
 * Use this api to handle buyer's cancellation application.
 */
export interface HandleBuyerCancellationRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * The operation you want to handle.Avaiable value: ACCEPT, REJECT
   */
  operation: string;
}
/**
 * HandleBuyerCancellation_Response sub-interface for HandleBuyerCancellationResponse
 */
export interface HandleBuyerCancellation_Response {
  /**
   * The time when the order is updated.
   */
  update_time?: Date | number;
}
/**
 * Response data payload for handle_buyer_cancellation
 */
export type HandleBuyerCancellationResponseData = HandleBuyerCancellation_Response;
/**
 * Response payload for handle_buyer_cancellation
 *
 * Use this api to handle buyer's cancellation application.
 */
export type HandleBuyerCancellationResponse = FetchResponse<HandleBuyerCancellationResponseData>;
/**
 * HandlePrescriptionCheck_Item sub-interface for HandlePrescriptionCheckRequest
 */
export interface HandlePrescriptionCheck_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * Shopee's unique identifier for a model of an item.
   */
  model_id: number;
  /**
   * The identify of product promotion. For items in one same add on deal promotion, the group_id should share the same id. For items not in add on deal promotion, the group_id should be 0. And the data is from group_id of shopee.orders.GetOrderDetails.
   */
  group_id: number;
}
/**
 * Request parameters for handle_prescription_check
 *
 * Use this API to approve or reject a prescription
 */
export interface HandlePrescriptionCheckRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * Approve or reject the prescription. Available values: TRUE, FALSE.
   */
  is_approved: boolean;
  /**
   * Reject reason code. Available values: 1 = Invalid Prescription (counterfeit/incorrect format)2 = Incorrect Dosage3 = No Prescription4 = Unclear Image5 = Free Text
   */
  reject_reason_code?: number;
  /**
   * The list of invalid items that make the prescription get rejected
   */
  items?: HandlePrescriptionCheck_Item[];
  /**
   * Full name of the pharmacist. Required for PH and ID Prescription Orders.
   */
  pharmacist_name?: string;
  /**
   * The reason for rejecting the prescription. Only usable when the reject_reason_code = 5.
   */
  free_text?: string;
}
/**
 * HandlePrescriptionCheck_Response sub-interface for HandlePrescriptionCheckResponse
 */
export interface HandlePrescriptionCheck_Response {
  /**
   * This is to indicate whether the request has been executed successfully.
   */
  is_success?: boolean;
}
/**
 * Response data payload for handle_prescription_check
 */
export type HandlePrescriptionCheckResponseData = HandlePrescriptionCheck_Response;
/**
 * Response payload for handle_prescription_check
 *
 * Use this API to approve or reject a prescription
 */
export type HandlePrescriptionCheckResponse = FetchResponse<HandlePrescriptionCheckResponseData>;
/**
 * SearchPackageList_Filter sub-interface for SearchPackageListRequest
 */
export interface SearchPackageList_Filter {
  /**
   * Use this field to filter the packages of specific status. Applicable values:0: All1: Pending2: ToProcess3: ProcessedDefault value = 2 (ToProcess)
   */
  package_status?: number;
  /**
   * List of product_location_id. Use this field to filter the packages under specific warehouses.
   */
  product_location_ids?: string[];
  /**
   * List of logistics_channel_id. Use this field to filter the packages under specific logistics channels.
   */
  logistics_channel_ids?: number[];
  /**
   * Use this field to filter the packages fulfilled by shopee or seller. Applicable values: 0: None (not apply filter)1: Shopee2: SellerDefault value = 2 (Seller)
   */
  fulfillment_type?: number;
  /**
   * Use this field to filter the packages under invoice_pending.Default value = false
   */
  invoice_pending?: boolean;
  /**
   * [Only for TW 30029 channel] Use this field to filter the sorting group of parcel. This field is only available for package with package_status = 3 and logistics_channel_id = 30029. Applicable values: 0: All1: North2: South
   */
  sorting_group?: number;
  /**
   * Use this field to filter packages by order type. Applicable values:0: All1: Regular Order2: Instant OrderDefault value = 0 (All)Note: For VN shops, using 2: Instant Order will return both Instant Delivery and Same-day Delivery packages.
   */
  order_type?: number;
  /**
   * Use this field to filter packages by pre-order status. Applicable values:0: All1: Pre-Order2: Non Pre-OrderDefault value = 0 (All)
   */
  is_pre_order?: number;
  /**
   * Use this field to filter packages by shipping priority. Applicable values: - For MY/PH/TW/TH shops, and VN Preferred/Preferred Plus/Shopee Mall shops:0: All1: Overdue2: Ship by Today3: Ship by Tomorrow- For other shops：0: All1: Overdue2: Within 24h3: Beyond 24hDefault value = 0 (All)
   */
  shipping_priority?: number;
}
/**
 * SearchPackageList_Pagination sub-interface for SearchPackageListRequest
 */
export interface SearchPackageList_Pagination {
  /**
   * Each result set is returned as a page of entries. Use the "page_size"
   * filters to control the maximum number of entries to retrieve per page
   * (i.e., per call). This integer value is used to specify the maximum
   * number of entries to return in a single "page" of data.The limit of
   * page_size if between 1 and 100.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call.
   * Default is "". If data is more than one page, the offset can be some
   * entry to start next call.
   */
  cursor?: string;
}
/**
 * SearchPackageList_Sort sub-interface for SearchPackageListRequest
 */
export interface SearchPackageList_Sort {
  /**
   * Use this field to specify which field to use to sort the returned package list. Available values: 1: ShipByDate  2: CreateDate3: ConfirmedDateDefault value = 1 (ShipByDate)
   */
  sort_type?: number;
  /**
   * Use this field to specify whether the returned package list is sorted in ascending or descending sort_type.Default value = true
   */
  ascending?: boolean;
}
/**
 * Request parameters for search_package_list
 *
 * Use this API to search the list of packages that have not been SHIPPED to proceed arranging shipment, and it supports various filters and sort fields.
 */
export interface SearchPackageListRequest {
  filter?: SearchPackageList_Filter;
  pagination: SearchPackageList_Pagination;
  sort?: SearchPackageList_Sort;
}
/**
 * SearchPackageList_Packages sub-interface for SearchPackageList_Response
 */
export interface SearchPackageList_Packages {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * Shopee's unique identifier for the package under an order
   */
  package_number?: string;
  /**
   * The identity of logistic channel.
   */
  logistics_channel_id?: number;
  /**
   * Just use this field to pass the next step of Mass ArrangeShipment
   */
  product_location_id?: string;
  /**
   * [Only for TW 30029 channel] This field indicate the sorting group value of the package. This field is only available for logistics_channel_id = 30029 and after the package has been arranged for shipment.
   */
  sorting_group?: string;
  /**
   * Only effective when the package's logistics_status/fulfillment_status is LOGISTICS_READY. This parameter further distinguishes between two scenarios:- true: Package shipment has been arranged (Seller has processed shipment, system is generating tracking number, not yet updated to LOGISTICS_REQUEST_CREATED, no duplicate action needed)- false: Package awaiting shipment arrangement (Seller hasn't processed shipment yet, shipping arrangement required)
   */
  is_shipment_arranged?: boolean;
}
/**
 * SearchPackageList_SearchPackageList_Pagination sub-interface for SearchPackageList_Response
 */
export interface SearchPackageList_SearchPackageList_Pagination {
  /**
   * Total orders can be returned with your query
   */
  total_count?: number;
  /**
   * if packages is not empty or length of packages <= page_size. You should pass the next_cursor in the next request as page_sentinel.
   */
  next_cursor?: string;
  /**
   * To indicate, it's a the last page or not
   */
  more?: boolean;
}
/**
 * SearchPackageList_SearchPackageList_Sort sub-interface for SearchPackageList_Response
 */
export interface SearchPackageList_SearchPackageList_Sort {
  /**
   * As same as request param
   */
  sort_type?: number;
  /**
   * As same as request param
   */
  is_asc?: boolean;
}
/**
 * SearchPackageList_Response sub-interface for SearchPackageListResponse
 */
export interface SearchPackageList_Response {
  packages_list?: SearchPackageList_Packages[];
  pagination?: SearchPackageList_SearchPackageList_Pagination;
  /**
   * As same as request param
   */
  sort?: SearchPackageList_SearchPackageList_Sort;
}
/**
 * Response data payload for search_package_list
 */
export type SearchPackageListResponseData = SearchPackageList_Response;
/**
 * Response payload for search_package_list
 *
 * Use this API to search the list of packages that have not been SHIPPED to proceed arranging shipment, and it supports various filters and sort fields.
 */
export type SearchPackageListResponse = FetchResponse<SearchPackageListResponseData>;
/**
 * Request parameters for set_note
 *
 * Use this api to set note for an order.
 */
export interface SetNoteRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * The note seller add for reference.
   */
  note: string;
}
/**
 * Response data payload for set_note
 */
export type SetNoteResponseData = Record<string, never>;
/**
 * Response payload for set_note
 *
 * Use this api to set note for an order.
 */
export type SetNoteResponse = FetchResponse<SetNoteResponseData>;
/**
 * SplitOrder_Item sub-interface for SplitOrder_Package
 */
export interface SplitOrder_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id: number;
  /**
   * Shopee's unique identifier for a model of an item. For single item without variation, you can set model_id as 0.
   */
  model_id: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion.It's required for add on deal and bundle deal items.For items in one same add on deal or bundle deal promotion, the promotion_group_id should share the same id. For items not in add on deal or bundle deal promotion, the promotion_group_id should be 0. And the data is from promotion_group_id of v2,order.get_order_detail.
   */
  promotion_group_id?: number;
  /**
   * The number of identical items put in the package, the quantity sum of the same item from each parcel must be the full item quantity of the whole order.This field is only eligible for the shop whitelisted to the unit-level split in SG/TH/TW/MY markets.
   */
  model_quantity?: number;
}
/**
 * SplitOrder_Package sub-interface for SplitOrderRequest
 */
export interface SplitOrder_Package {
  /**
   * The list of items under the same package.
   */
  item_list: SplitOrder_Item[];
}
/**
 * Request parameters for split_order
 *
 * Use this api to split an order into multiple packages. Orders that include installation services cannot be split by quantity.
 */
export interface SplitOrderRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * The list of packages that you want to split. Note: - Orders that include installation services cannot be split by quantity.- When splitting the order, must contain all items in the order in one request.- You can split the order into 30 parcels at most in TW and 5 parcels at most in other regions.
   */
  package_list: SplitOrder_Package[];
}
/**
 * SplitOrder_SplitOrder_Item sub-interface for SplitOrder_SplitOrder_Package
 */
export interface SplitOrder_SplitOrder_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model.
   */
  model_id?: number;
  /**
   * The identify of order item. For items in one same bundle deal promotion, the order_item_id should share the same id, such as 1,2. For items not in bundle deal promotion, the order_item_id should be the same as item_id.
   */
  order_item_id?: number;
  /**
   * The identify of product promotion. For items in one same add on deal promotion, the promotion_group_id should share the same id. For items not in add on deal promotion, the promotion_group_id should be 0. And the data is from group_id of shopee.orders.GetOrderDetails.
   */
  promotion_group_id?: number;
  /**
   * The number of identical items put in the package.
   */
  model_quantity?: number;
}
/**
 * SplitOrder_SplitOrder_Package sub-interface for SplitOrder_Response
 */
export interface SplitOrder_SplitOrder_Package {
  /**
   * Shopee's unique identifier for the package under an order.
   */
  package_number?: string;
  /**
   * The list of items under this package.
   */
  item_list?: SplitOrder_SplitOrder_Item[];
}
/**
 * SplitOrder_Response sub-interface for SplitOrderResponse
 */
export interface SplitOrder_Response {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The list of package under this order you have split.
   */
  package_list?: SplitOrder_SplitOrder_Package[];
}
/**
 * Response data payload for split_order
 */
export type SplitOrderResponseData = SplitOrder_Response;
/**
 * Response payload for split_order
 *
 * Use this api to split an order into multiple packages. Orders that include installation services cannot be split by quantity.
 */
export type SplitOrderResponse = FetchResponse<SplitOrderResponseData>;
/**
 * Request parameters for unsplit_order
 *
 * Use this ai to undo split of order. After undo split, the order will have only one package. It can only be used when order status still at READY_TO_SHIP.
 */
export interface UnsplitOrderRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
}
/**
 * Response data payload for unsplit_order
 */
export type UnsplitOrderResponseData = Record<string, never>;
/**
 * Response payload for unsplit_order
 *
 * Use this ai to undo split of order. After undo split, the order will have only one package. It can only be used when order status still at READY_TO_SHIP.
 */
export type UnsplitOrderResponse = FetchResponse<UnsplitOrderResponseData>;
/**
 * Request parameters for upload_invoice_doc
 *
 * This endpoint is for PH and BR local seller. Upload the invoice document
 */
export interface UploadInvoiceDocRequest {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn: string;
  /**
   * the type of invoice file. 1:pdf 2.jpeg 3.png. 4.xml
   */
  file_type: number;
  /**
   * invoice file. File size limit to 1MB.
   */
  file: any;
}
/**
 * Response data payload for upload_invoice_doc
 */
export type UploadInvoiceDocResponseData = Record<string, never>;
/**
 * Response payload for upload_invoice_doc
 *
 * This endpoint is for PH and BR local seller. Upload the invoice document
 */
export type UploadInvoiceDocResponse = FetchResponse<UploadInvoiceDocResponseData>;
