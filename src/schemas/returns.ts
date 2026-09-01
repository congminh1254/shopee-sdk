// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field ReturnRefundType
 */
export enum ReturnRefundType {
  RETURN = "Return",
  REFUND = "Refund",
}
/**
 * Enum generated for field ReturnSn
 */
export enum ReturnSn {
  RETURN = "return",
  REFUND = "refund",
}
/**
 * Enum generated for field TrackingDescription
 */
export enum TrackingDescription {
  RETURN = "return",
  REFUND = "refund",
}
/**
 * Request parameters for accept_offer
 *
 * v2.returns.accept_offer
 */
export interface AcceptOfferRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * AcceptOfferResponseData sub-interface for AcceptOfferResponse
 */
export interface AcceptOfferResponseData {
  /**
   * The serial number of return.
   */
  return_sn?: string;
}
/**
 * Response payload for accept_offer
 *
 * v2.returns.accept_offer
 */
export type AcceptOfferResponse = FetchResponse<AcceptOfferResponseData>;
/**
 * Request parameters for cancel_dispute
 *
 * Sellers can only cancel compensation disputes, not normal disputes. This means that sellers can only cancel disputes when the return_status is ACCEPTED and the compensation_status is COMPENSATION_REQUESTED.
 */
export interface CancelDisputeRequest {
  /**
   * Shopee's unique serial number identifier for a Return Refund request.Note: Sellers can only cancel compensation disputes, not normal disputes. This means that sellers can only cancel disputes when the return_status is ACCEPTED and the compensation_status is COMPENSATION_REQUESTED.
   */
  return_sn: string;
  /**
   * The operator's email address. For operation record keeping purposes (same as v2.returns.dispute API).
   */
  email: string;
}
/**
 * CancelDisputeResponseData sub-interface for CancelDisputeResponse
 */
export interface CancelDisputeResponseData {
  /**
   * Shopee's unique serial number identifier for a Return Refund request.
   */
  return_sn?: string;
  /**
   * To indicate whether the cancel dispute operation is successful or failed.
   */
  message?: string;
}
/**
 * Response payload for cancel_dispute
 *
 * Sellers can only cancel compensation disputes, not normal disputes. This means that sellers can only cancel disputes when the return_status is ACCEPTED and the compensation_status is COMPENSATION_REQUESTED.
 */
export type CancelDisputeResponse = FetchResponse<CancelDisputeResponseData>;
/**
 * Request parameters for confirm
 *
 * Confirm refund
 */
export interface ConfirmRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * ConfirmResponseData sub-interface for ConfirmResponse
 */
export interface ConfirmResponseData {
  /**
   * The identifier for an API request for error tracking
   */
  return_sn?: string;
}
/**
 * Response payload for confirm
 *
 * Confirm refund
 */
export type ConfirmResponse = FetchResponse<ConfirmResponseData>;
/**
 * Request parameters for convert_image
 *
 * Convert a specific format and pictures within 10M into url.
 */
export interface ConvertImageRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
  /**
   * The proof picture to be uploaded must be within 10MB in size, and the format only supports .jpg, .jpeg, and .png. Only one picture is allowed to be uploaded per request. If multiple pictures are uploaded, only the first picture will be processed.
   */
  upload_image: any;
}
/**
 * ConvertImageResponseData sub-interface for ConvertImageResponse
 */
export interface ConvertImageResponseData {
  /**
   * The link uploaded to the image server can be used with the upload_proof interface.
   */
  url?: string;
  /**
   * The image thumbnail.
   */
  thumbnail?: string;
}
/**
 * Response payload for convert_image
 *
 * Convert a specific format and pictures within 10M into url.
 */
export type ConvertImageResponse = FetchResponse<ConvertImageResponseData>;
/**
 * DisputeImage sub-interface for DisputeRequest
 */
export interface DisputeImage {
  /**
   * The module_index of current evidence module returned by get_return_dispute_reason API.
   */
  module_index: number;
  /**
   * The requirement content of current evidence module returned by get_return_dispute_reason API.
   */
  requirement: string;
  /**
   * The image URLs of current evidence module. It is recommended to pass in the URL returned by convert_image API.
   */
  image_url: string[];
}
/**
 * Request parameters for dispute
 *
 * Dispute return.
 *
 * Support to raise dispute when return_status in REQUESTED / PROCESSING/ACCEPTED
 */
export interface DisputeRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
  /**
   * The email address.
   */
  email: string;
  /**
   * The dispute reason id.Please call v2.returns.get_return_dispute_reason to get it.
   */
  dispute_reason_id: number;
  /**
   * Determines whether image submission is mandatory for the dispute request - mandatory input field for all dispute reasons except "Did not receive the return product".
   */
  image_list?: DisputeImage[];
  /**
   * The content of dispute reason.
   */
  dispute_text_reason?: string;
}
/**
 * DisputeResponseData sub-interface for DisputeResponse
 */
export interface DisputeResponseData {
  /**
   * The serial number of return.
   */
  return_sn?: string;
  msg?: string;
}
/**
 * Response payload for dispute
 *
 * Dispute return.
 *
 * Support to raise dispute when return_status in REQUESTED / PROCESSING/ACCEPTED
 */
export type DisputeResponse = FetchResponse<DisputeResponseData>;
/**
 * Request parameters for get_available_solutions
 *
 * Get the available solutions offered to buyers.
 */
export interface GetAvailableSolutionsRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * GetAvailableSolutionsOfferReturnRefund sub-interface for GetAvailableSolutionsResponseData
 */
export interface GetAvailableSolutionsOfferReturnRefund {
  /**
   * To indicate whether ReturnRefund solution is available for sellers to select.
   */
  eligibility?: boolean;
  /**
   * To indicate whether refund is adjustable for ReturnRefund solution.
   */
  refund_amount_adjustable?: boolean;
  /**
   * The max refund amount for ReturnRefund solution. Returned when refund_amount_adjustable is true.
   */
  max_refund_amount?: number;
  /**
   * The min refund amount for ReturnRefund solution. Returned when refund_amount_adjustable is true.
   */
  min_refund_amount?: number;
}
/**
 * GetAvailableSolutionsOfferRefund sub-interface for GetAvailableSolutionsResponseData
 */
export interface GetAvailableSolutionsOfferRefund {
  /**
   * To indicate whether Refund solution is available for sellers to select.
   */
  eligibility?: boolean;
  /**
   * To indicate whether refund is adjustable for Refund solution.
   */
  refund_amount_adjustable?: boolean;
  /**
   * The max refund amount for Refund solution. Returned when refund_amount_adjustable is true.
   */
  max_refund_amount?: number;
  /**
   * The min refund amount for Refund solution. Returned when refund_amount_adjustable is true.
   */
  min_refund_amount?: number;
}
/**
 * GetAvailableSolutionsResponseData sub-interface for GetAvailableSolutionsResponse
 */
export interface GetAvailableSolutionsResponseData {
  /**
   * The serial number of return.
   */
  return_sn?: string;
  offer_return_refund?: GetAvailableSolutionsOfferReturnRefund;
  offer_refund?: GetAvailableSolutionsOfferRefund;
}
/**
 * Response payload for get_available_solutions
 *
 * Get the available solutions offered to buyers.
 */
export type GetAvailableSolutionsResponse = FetchResponse<GetAvailableSolutionsResponseData>;
/**
 * Request parameters for get_return_detail
 *
 * Use this api to get detail information of a return by return sn.
 */
export interface GetReturnDetailRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * GetReturnDetailBuyerVideo sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailBuyerVideo {
  /**
   * The thumbnail url of video
   */
  thumbnail_url?: string;
  /**
   * The url of video
   */
  video_url?: string;
}
/**
 * GetReturnDetailUser sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailUser {
  /**
   * Buyer's nickname, will be masked as "****" if it is a non-integrated return in TW region.
   */
  username?: string;
  /**
   * Buyer's email, will be empty if it is a non-integrated return in TW region.
   */
  email?: string;
  /**
   * Buyer's portrait, will be empty if it is a non-integrated return in TW region.
   */
  portrait?: string;
}
/**
 * GetReturnDetailItem sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailItem {
  /**
   * Shopee's unique identifier for a variation of an item.
   */
  model_id?: number;
  /**
   * Name of item in local language.
   */
  name?: string;
  /**
   * Image URLs of item.
   */
  images?: string[];
  /**
   * Amount of this item.
   */
  amount?: number;
  /**
   * The price of item.
   */
  item_price?: number;
  /**
   * To indicate if this item belongs to an addon deal.
   */
  is_add_on_deal?: boolean;
  /**
   * To indicate if this item is main item or sub item. True means main item, false means sub item.
   */
  is_main_item?: boolean;
  /**
   * The unique identity of an addon deal.
   */
  add_on_deal_id?: number;
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * The sku of item.
   */
  item_sku?: string;
  /**
   * the variation sku of item
   */
  variation_sku?: string;
  /**
   * item's refund amount. only for shops whitelisted for Partial Qty RR.If not available, refer to item_price
   */
  refund_amount?: number;
}
/**
 * GetReturnDetail_GetReturnDetailItem sub-interface for GetReturnDetailActivity
 */
export interface GetReturnDetail_GetReturnDetailItem {
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a variation of an item.
   */
  variation_id?: number;
  /**
   * item's quantity purchase
   */
  quantity_purchased?: number;
  /**
   * item's origin price
   */
  original_price?: string;
}
/**
 * GetReturnDetailActivity sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailActivity {
  /**
   * The id of activity.
   */
  activity_id?: any;
  /**
   * The type of activity.
   */
  activity_type?: string;
  /**
   * activity's origin price
   */
  original_price?: string;
  /**
   * activity's discount price
   */
  discounted_price?: string;
  items?: GetReturnDetail_GetReturnDetailItem[];
  /**
   * item's refund amount for bundle deal cases, only for shops whitelisted for Partial Qty RR.
   */
  refund_amount?: string;
}
/**
 * GetReturnDetailSellerProof sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailSellerProof {
  /**
   * To indicate whether the seller needs to provide evidence when the return status is RETURN_JUDING, RETURN_SELLER_DISPUTE and RETURN_ACCEPTED. Applicable values: See Data Definition- SellerProofStatus.
   */
  seller_proof_status?: string;
  /**
   * To indicate the deadline for submitting the evidence.
   */
  seller_evidence_deadline?: Date | number;
}
/**
 * GetReturnDetailCompensationAmount sub-interface for GetReturnDetailSellerCompensation
 */
export interface GetReturnDetailCompensationAmount {
  /**
   * To indicate the type of return-related compensationApplicable values: See Data Definition - Compensation Type
   */
  compensation_type?: string;
  compensation_amount?: number;
}
/**
 * GetReturnDetailSellerCompensation sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailSellerCompensation {
  /**
   * To indicate whether the seller is eligible for raising a compensation request. See "Data Definition - SellerCompensationStatus"
   */
  seller_compensation_status?: string;
  /**
   * To indicate the deadline for requesting the compensation
   */
  seller_compensation_due_date?: Date | number;
  /**
   * To indicate the compensation amount that the agent decided
   */
  compensation_amount?: number;
  compensation_amount_list?: GetReturnDetailCompensationAmount[];
}
/**
 * GetReturnDetailNegotiation sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailNegotiation {
  /**
   * To indicate whether the seller can negotiate with the buyer. See "Data Definition - NegotiationStatus"
   */
  negotiation_status?: string;
  /**
   * To indicate what is the offer solution. See "Data Definition - ReturnSolution"
   */
  latest_solution?: string;
  /**
   * To indicate the refund amount in the latest offer solution
   */
  latest_offer_amount?: number;
  /**
   * To indicate which party made the latest offer
   */
  latest_offer_creator?: string;
  /**
   * To indicate the remaining counter limit
   */
  counter_limit?: number;
  /**
   * To indicate offer_due_date
   */
  offer_due_date?: Date | number;
}
/**
 * GetReturnDetailReturnPickupAddress sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailReturnPickupAddress {
  /**
   * To indicate receiver's address
   */
  address?: string;
  /**
   * To indicate receiver's name
   */
  name?: string;
  /**
   * To indicate receiver's phone[Only for TW non-integrated channel] Will return "****" when the "virtual_contact_number" is available
   */
  phone?: string;
  /**
   * To indicate receiver's town
   */
  town?: string;
  /**
   * To indicate receiver's district
   */
  district?: string;
  /**
   * To indicate receiver's city
   */
  city?: string;
  /**
   * To indicate receiver's state
   */
  state?: string;
  /**
   * To indicate receiver's region
   */
  region?: string;
  /**
   * To indicate receiver's zip code
   */
  zipcode?: string;
}
/**
 * GetReturnDetailReturnAddress sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailReturnAddress {
  /**
   * To indicate the warehouse id where item will be returned to. Please call v2.shop.get_warehouse_detail to check the detailed warehouse information the item returned to with the field "location_id" of the v2.shop.get_warehouse_detail match to the field"whs_id"of the v2.return.get_return_detail.For fulfillment by Shopee (FBS) & multi warehouse sellers, R/R orders will be returned back to the nearest warehouse of buyer address instead of going back to only 1 default return address like a normal seller.If it's a normal seller, then the field will be response empty.
   */
  whs_id?: string;
}
/**
 * GetReturnDetailFollowUpAction sub-interface for GetReturnDetailResponseData
 */
export interface GetReturnDetailFollowUpAction {
  /**
   * Unique identifier of the item.
   */
  item_id?: number;
  /**
   * Unique identifier of the model under the item.
   */
  model_id?: number;
  /**
   * Quantity of items or models under the same current status.
   */
  qty?: number;
  /**
   * Current status for the item/model within the warehouse.Applicable values:1：Dispose2：Return to Seller7：Received and Putaway8：Return to Buyer9：ShortageNote: Since Resell is currently applicable only to Failed Delivery parcels, the following values will not be returned for now, and will be returned once Resell becomes applicable to Return Refund parcels in the future:3：Putaway for Resell4：Resell Outbound5：Resell Failed6：Resell Exit
   */
  current_status?: number;
  /**
   * List of order_sn generated from the Resell process. Returned only when current_status = 4 (Resell Outbound).Note: Since Resell is currently applicable only to Failed Delivery parcels, this field will remain empty for now, and valid values will be returned once Resell becomes applicable to Return Refund parcels in the future.
   */
  related_order_sn_list?: string[];
  /**
   * Next step after a Resell failure. Returned only when current_status = 5 (Resell Failed).Note: Since Resell is currently applicable only to Failed Delivery parcels, this field will remain empty for now, and valid values will be returned once Resell becomes applicable to Return Refund parcels in the future.
   */
  resell_failed_next_step?: string;
}
/**
 * GetReturnDetailResponseData sub-interface for GetReturnDetailResponse
 */
export interface GetReturnDetailResponseData {
  /**
   * Image URLs of return.
   */
  image?: string[];
  buyer_videos?: GetReturnDetailBuyerVideo[];
  /**
   * Indicates the original return reason submitted by the buyer when initiating the return request.Applicable values: See Data Definition- ReturnReason and Reassessed Request Reason.
   * Note: There may be cases where Shopee Agent updates the return request with a "Reassessed Return Reason" after reviewing more details about the buyer's return request and potentially after requesting evidence from the seller. If the platform updates the return reason during this process, the reassessed outcome will be provided separately in the reassessed_request_reason field.
   */
  reason?: string;
  /**
   * Reason that buyer provide.
   */
  text_reason?: string;
  /**
   * Indicates the return reason reassessed by the platform as more suitable.There may be cases where Shopee Agent updates the return request with a "Reassessed Return Reason" after reviewing more details about the buyer's return request and potentially after requesting evidence from the seller.Applicable values: See Data Definition- ReturnReason and Reassessed Request Reason. If no reassessment has been made, the value will be NONE.
   */
  reassessed_request_reason?: string;
  /**
   * The serial number of return.
   */
  return_sn?: string;
  /**
   * Amount of the refund.
   */
  refund_amount?: number;
  /**
   * Currency of the return.
   */
  currency?: string;
  /**
   * The time of return create.
   */
  create_time?: Date | number;
  /**
   * The time of modify return.
   */
  update_time?: Date | number;
  /**
   * Enumerated type that defines the current status of the return. Applicable values: See Data Definition- ReturnStatus.
   */
  status?: string;
  /**
   * The last time seller deal with this return.
   */
  due_date?: Date | number;
  /**
   * The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
  /**
   * The reason of seller dispute return. While the return has been disputed, this field is useful. Applicable values: See Data Definition- ReturnDisputeReason.
   */
  dispute_reason?: string[];
  /**
   * The reason that seller provide. While the return has been disputed, this field is useful.
   */
  dispute_text_reason?: string[];
  /**
   * Items to be sent back to seller. Can be either integrated/non-integrated.
   */
  needs_logistics?: boolean;
  /**
   * Order price before discount.
   */
  amount_before_discount?: number;
  user?: GetReturnDetailUser;
  item?: GetReturnDetailItem[];
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The due date for buyer to ship order.
   */
  return_ship_due_date?: Date | number;
  /**
   * The due date for seller to deal with this return when buyer have shipped order.
   */
  return_seller_due_date?: Date | number;
  activity?: GetReturnDetailActivity[];
  seller_proof?: GetReturnDetailSellerProof;
  seller_compensation?: GetReturnDetailSellerCompensation;
  negotiation?: GetReturnDetailNegotiation;
  /**
   * To indicate the reverse logistics status. See "Data Definition - LogisticsStatus".Note: - This is a legacy field that only reflects the reverse logistics status of Normal RR. To determine whether the RR is a Normal RR, check if return_refund_request_type = 0.- If you need the reverse logistics status for Normal RR, In-transit RR, or Return-on-the-Spot, please use the newly released field reverse_logistic_status instead.
   */
  logistics_status?: string;
  /**
   * To indicate the latest reverse logistic status of a return, referring to the current status of the buyer shipping the return parcel back to the validation point (seller or warehouse), including Normal RR, In-transit RR, and Return-on-the-Spot.See "Data Definition - ReverseLogisticsStatus" as status displayed for Normal RR and In-transit RR or Return-on-the-Spot are different.
   */
  reverse_logistics_status?: string;
  /**
   * To indicate the buyer's pickup address
   */
  return_pickup_address?: GetReturnDetailReturnPickupAddress;
  /**
   * [Only for TW non-integrated channel] The virtual phone number to contact the recipient.
   */
  virtual_contact_number?: string;
  /**
   * [Only for TW non-integrated channel] The query number used in virtual phone number calls to contact the recipient of this return.
   */
  package_query_number?: string;
  return_address?: GetReturnDetailReturnAddress;
  /**
   * To indicate whether the return is RRBOC (Return/Refund request raised before Order Complete) or RRAOC (Return/Refund request raised after Order Complete).
   */
  return_refund_type?: ReturnRefundType | string | number;
  /**
   * To indicate the most updated solution of the Return/Refund request (NOTE: this is not the solution during negotiation). Applicable value: - 0: Return and Refund- 1: Refund Only
   */
  return_solution?: number;
  /**
   * To indicate whether the return_sn is using the “Seller Arrange” return method. This would only be True for TW and BR.
   */
  is_seller_arrange?: boolean;
  /**
   * To indicate whether uploading shipping proof is mandatory for seller to confirm "Arrange Pickup" when is_seller_arrange = true.
   */
  is_shipping_proof_mandatory?: boolean;
  /**
   * To indicate whether seller has already uploaded shipping proof for this return.
   */
  has_uploaded_shipping_proof?: boolean;
  /**
   * To indicate whether the reverse logistic channel type selected is integrated or non-integrated.
   */
  is_reverse_logistics_channel_integrated?: boolean;
  /**
   * To indicate reverse logistic carrier name.
   */
  reverse_logistics_channel_name?: string;
  /**
   * To indicate the type of return refund request, whether it is a Normal RR request, an In-transit RR request, and a Return on the Spot: 0: Normal RR (RR is raised by the buyer after delivery done / estimated delivery date)1: In-transit RR (RR is raised by the buyer while item is still in-transit to buyer)2: Return-on-the-Spot (RR is raised by the driver after buyer rejected parcel at delivery)For more details, see Data Definition- Return Refund Request Type.
   */
  return_refund_request_type?: number;
  /**
   * To indicate whether seller or warehouse will expect to receive the return parcel from buyer and validate the condition of the parcel: - seller_validation - warehouse_validationFor more details, see Data Definition- ValidationType.
   */
  validation_type?: string;
  /**
   * [Only for validation_type = warehouse_validation] Indicates the parcel’s check-in status at the warehouse. This field helps sellers quickly determine whether the parcel has arrived at the warehouse or has been rejected. Applicable values:1: Pending Inbound2: Rejected3: Inbound4: Cancelled
   */
  is_arrived_at_warehouse?: number;
  /**
   * [Only for validation_type = warehouse_validation] Warehouse handling actions for each item in the parcel.
   */
  follow_up_action_list?: GetReturnDetailFollowUpAction[];
  /**
   * To indicate whether the return includes items with partial quantities.
   */
  is_partial_quantity_return?: boolean;
  /**
   * To indicate whether the actual refund amount is less than the maximum allowable refund.
   */
  is_refund_amount_adjusted?: boolean;
}
/**
 * Response payload for get_return_detail
 *
 * Use this api to get detail information of a return by return sn.
 */
export type GetReturnDetailResponse = FetchResponse<GetReturnDetailResponseData>;
/**
 * Request parameters for get_return_dispute_reason
 *
 * To get the dispute return reason.
 */
export interface GetReturnDisputeReasonRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * GetReturnDisputeReasonSampleEvidence sub-interface for GetReturnDisputeReasonDisputeReason
 */
export interface GetReturnDisputeReasonSampleEvidence {
  /**
   * The type of sample evidence. Applicable value: - 1: Image
   */
  type?: number;
  /**
   * The link of sample evidence.
   */
  url?: string;
  /**
   * The link of the thumbnail of sample evidence.
   */
  thumbnail?: string;
}
/**
 * GetReturnDisputeReasonEvidenceModule sub-interface for GetReturnDisputeReasonDisputeReason
 */
export interface GetReturnDisputeReasonEvidenceModule {
  /**
   * The index of current evidence module.
   */
  module_index?: number;
  /**
   * The specific requirement of current evidence module.
   */
  requirement?: string;
  /**
   * Indicate if current evidence module is mandatory or not.
   */
  is_required?: boolean;
}
/**
 * GetReturnDisputeReasonDisputeReason sub-interface for GetReturnDisputeReasonResponseData
 */
export interface GetReturnDisputeReasonDisputeReason {
  /**
   * The dispute_reason for one specific case. See Data Definition - DisputeReason.
   */
  dispute_reason?: string;
  /**
   * Indicate the importance of uploading required proof.
   */
  dispute_requirement?: string;
  /**
   * The URL of sample evidence to upload.
   */
  sample_evidence?: GetReturnDisputeReasonSampleEvidence[];
  /**
   * The associated evidence module list for current dispute reason.
   */
  evidence_module_list?: GetReturnDisputeReasonEvidenceModule[];
}
/**
 * GetReturnDisputeReasonResponseData sub-interface for GetReturnDisputeReasonResponse
 */
export interface GetReturnDisputeReasonResponseData {
  /**
   * The dispute_reason and associated evidence list.
   */
  dispute_reason_list?: GetReturnDisputeReasonDisputeReason[];
}
/**
 * Response payload for get_return_dispute_reason
 *
 * To get the dispute return reason.
 */
export type GetReturnDisputeReasonResponse = FetchResponse<GetReturnDisputeReasonResponseData>;
/**
 * Request parameters for get_return_list
 *
 * Use this api to get detail information of many return by shop id.
 */
export interface GetReturnListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0. if data is more than one page, the offset can be some entry to start next call.
   */
  page_no: number;
  /**
   * if many items are available to retrieve, you may need to call GetReturnList multiple times to retrieve all the data. Each result set is returned as a page of entries. Default is 40. Use the Pagination filters to control the maximum number of entries (<= 100) to retrieve per page (i.e., per call), the offset number to start next call. This integer value is usUed to specify the maximum number of entries to return in a single ""page"" of data.
   */
  page_size: number;
  /**
   * The create_time_from and create_time_to fields specify a date range for retrieving orders (based on the order create time). The create_time_from field is the starting date range. The maximum date range that may be specified with the create_time_from and create_time_to fields is 15 days.
   */
  create_time_from?: Date | number;
  /**
   * The create_time_from and create_time_to fields specify a date range for retrieving orders (based on the order create time). The create_time_from field is the starting date range. The maximum date range that may be specified with the create_time_from and create_time_to fields is 15 days.
   */
  create_time_to?: Date | number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the last return updated time). The update_time_from field is the starting date range. The maximum date range that may be specified with the update_time_from and update_time_to fields is 15 days. update_time_from should be >= create_time_from
   */
  update_time_from?: Date | number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the last return updated time). The update_time_from field is the starting date range. The maximum date range that may be specified with the update_time_from and update_time_to fields is 15 days. update_time_from should be >= create_time_from
   */
  update_time_to?: Date | number;
  /**
   * This is for filtering return request by return status. See "Data Definition - ReturnStatus"
   */
  status?: string;
  /**
   * This is for filtering return request by counter status. See "Data Definition - NegotiationStatus"
   */
  negotiation_status?: string;
  /**
   * This is for filtering return request by proof status. See "Data Definition - SellerProofStatus"
   */
  seller_proof_status?: string;
  /**
   * This is for filtering return request by compensation status. See "Data Definition - SellerCompensationStatus"
   */
  seller_compensation_status?: string;
}
/**
 * GetReturnListUser sub-interface for GetReturnListReturn
 */
export interface GetReturnListUser {
  /**
   * Buyer's nickname, will be masked as "****" if it is a non-integrated return in TW region.
   */
  username?: string;
  /**
   * Buyer's email, will be empty if it is a non-integrated return in TW region.
   */
  email?: string;
  /**
   * Buyer's portrait, will be empty if it is a non-integrated return in TW region.
   */
  portrait?: string;
}
/**
 * GetReturnListItem sub-interface for GetReturnListReturn
 */
export interface GetReturnListItem {
  /**
   * Shopee's unique identifier for a variation of an item.
   */
  model_id?: number;
  /**
   * Name of item in local language.
   */
  name?: string;
  /**
   * Image URLs of item.
   */
  images?: string[];
  /**
   * Amount of this item.
   */
  amount?: number;
  /**
   * The price of item.
   */
  item_price?: number;
  /**
   * To indicate if this item belongs to an addon deal.
   */
  is_add_on_deal?: boolean;
  /**
   * To indicate if this item is main item or sub item. True means main item, false means sub item.
   */
  is_main_item?: boolean;
  /**
   * The unique identity of an addon deal.
   */
  add_on_deal_id?: number;
  /**
   * The id of item.
   */
  item_id?: number;
  /**
   * The sku of item.
   */
  item_sku?: string;
  /**
   * The variation sku of item
   */
  variation_sku?: string;
}
/**
 * GetReturnListFollowUpAction sub-interface for GetReturnListReturn
 */
export interface GetReturnListFollowUpAction {
  /**
   * Unique identifier of the item.
   */
  item_id?: number;
  /**
   * Unique identifier of the model under the item.
   */
  model_id?: number;
  /**
   * Quantity of items or models under the same current status.
   */
  qty?: number;
  /**
   * Current status for the item/model within the warehouse.Applicable values:1：Dispose2：Return to Seller7：Received and Putaway8：Return to Buyer9：ShortageNote: Since Resell is currently applicable only to Failed Delivery parcels, the following values will not be returned for now, and will be returned once Resell becomes applicable to Return Refund parcels in the future:3：Putaway for Resell4：Resell Outbound5：Resell Failed6：Resell Exit
   */
  current_status?: number;
  /**
   * List of order_sn generated from the Resell process. Returned only when current_status = 4 (Resell Outbound).Note: Since Resell is currently applicable only to Failed Delivery parcels, this field will remain empty for now, and valid values will be returned once Resell becomes applicable to Return Refund parcels in the future.
   */
  related_order_sn_list?: string[];
  /**
   * Next step after a Resell failure. Returned only when current_status = 5 (Resell Failed).Note: Since Resell is currently applicable only to Failed Delivery parcels, this field will remain empty for now, and valid values will be returned once Resell becomes applicable to Return Refund parcels in the future.
   */
  resell_failed_next_step?: string;
}
/**
 * GetReturnListReturn sub-interface for GetReturnListResponseData
 */
export interface GetReturnListReturn {
  /**
   * Image URLs of return.
   */
  image?: string[];
  /**
   * Indicates the original return reason submitted by the buyer when initiating the return request.Applicable values: See Data Definition- ReturnReason and Reassessed Request Reason.Note: There may be cases where Shopee Agent updates the return request with a "Reassessed Return Reason" after reviewing more details about the buyer's return request and potentially after requesting evidence from the seller. If the platform updates the return reason during this process, the reassessed outcome will be provided separately in the reassessed_request_reason field.
   */
  reason?: string;
  /**
   * Reason that buyer provide.
   */
  text_reason?: string;
  /**
   * Indicates the return reason reassessed by the platform as more suitable.There may be cases where Shopee Agent updates the return request with a "Reassessed Return Reason" after reviewing more details about the buyer's return request and potentially after requesting evidence from the seller. Applicable values: See Data Definition- ReturnReason and Reassessed Request Reason. If no reassessment has been made, the value will be NONE.
   */
  reassessed_request_reason?: string;
  /**
   * The serial number of return.
   */
  return_sn?: string;
  /**
   * Amount of the refund.
   */
  refund_amount?: number;
  /**
   * Currency of the return.
   */
  currency?: string;
  /**
   * The time of return create.
   */
  create_time?: Date | number;
  /**
   * The time of modify return.
   */
  update_time?: Date | number;
  /**
   * Enumerated type that defines the current status of the return. Applicable values: See Data Definition- ReturnStatus.
   */
  status?: string;
  /**
   * The last time seller deal with this return.
   */
  due_date?: Date | number;
  /**
   * The tracking number assigned by the shipping carrier for item shipment.
   */
  tracking_number?: string;
  /**
   * The reason of seller dispute return. While the return has been disputed, this field is useful. Applicable values: See Data Definition- ReturnDisputeReason.
   */
  dispute_reason?: string[];
  /**
   * The reason that seller provide. While the return has been disputed, this field is useful.
   */
  dispute_text_reason?: string[];
  /**
   * Items to be sent back to seller. Can be either integrated/non-integrated.
   */
  needs_logistics?: boolean;
  /**
   * Order price before discount.
   */
  amount_before_discount?: number;
  user?: GetReturnListUser;
  item?: GetReturnListItem[];
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The due date for buyer to ship order.
   */
  return_ship_due_date?: Date | number;
  /**
   * The due date for seller to deal with this return when buyer have shipped order.
   */
  return_seller_due_date?: Date | number;
  /**
   * Counter status. See "Data Definition - NegotiationStatus"
   */
  negotiation_status?: string;
  /**
   * Proof status. See "Data Definition - SellerProofStatus"
   */
  seller_proof_status?: string;
  /**
   * Compensation status. See "Data Definition - SellerCompensationStatus"
   */
  seller_compensation_status?: string;
  /**
   * To indicate whether the return is RRBOC (Return/Refund request raised before Order Complete) or RRAOC (Return/Refund request raised after Order Complete).
   */
  return_refund_type?: ReturnRefundType | string | number;
  /**
   * To indicate the most updated solution of the Return/Refund request (NOTE: this is not the solution during negotiation). Applicable value: - 0: Return and Refund- 1: Refund Only
   */
  return_solution?: number;
  /**
   * To indicate whether the return_sn is using the “Seller Arrange” return method. This would only be True for TW and BR.
   */
  is_seller_arrange?: boolean;
  /**
   * To indicate whether uploading shipping proof is mandatory for seller to confirm "Arrange Pickup" when is_seller_arrange = true.
   */
  is_shipping_proof_mandatory?: boolean;
  /**
   * To indicate the type of return refund request, whether it is a Normal RR request, an In-transit RR request, and a Return on the Spot: 0: Normal RR (RR is raised by the buyer after delivery done / estimated delivery date)1: In-transit RR (RR is raised by the buyer while item is still in-transit to buyer)2: Return-on-the-Spot (RR is raised by the driver after buyer rejected parcel at delivery)For more details, see Data Definition- Return Refund Request Type.
   */
  return_refund_request_type?: number;
  /**
   * To indicate whether seller or warehouse will expect to receive the return parcel from buyer and validate the condition of the parcel: - seller_validation - warehouse_validationFor more details, see Data Definition- ValidationType.
   */
  validation_type?: string;
  /**
   * [Only for validation_type = warehouse_validation] Indicates the parcel’s check-in status at the warehouse. This field helps sellers quickly determine whether the parcel has arrived at the warehouse or has been rejected. Applicable values:1: Pending Inbound2: Rejected3: Inbound4: Cancelled
   */
  is_arrived_at_warehouse?: number;
  /**
   * [Only for validation_type = warehouse_validation] Warehouse handling actions for each item in the parcel.
   */
  follow_up_action_list?: GetReturnListFollowUpAction[];
  /**
   * To indicate whether the return includes items with partial quantities.
   */
  is_partial_quantity_return?: boolean;
  /**
   * To indicate whether the actual refund amount is less than the maximum allowable refund.
   */
  is_refund_amount_adjusted?: boolean;
}
/**
 * GetReturnListResponseData sub-interface for GetReturnListResponse
 */
export interface GetReturnListResponseData {
  /**
   * Whether has next page
   */
  more?: boolean;
  return?: GetReturnListReturn[];
}
/**
 * Response payload for get_return_list
 *
 * Use this api to get detail information of many return by shop id.
 */
export type GetReturnListResponse = FetchResponse<GetReturnListResponseData>;
/**
 * Request parameters for get_reverse_tracking_info
 *
 * Get reverse and post-return logistics information of return request. For Normal RR, return complete reverse logistics information, for In-transit RR and Return-on-the-Spot, only return latest reverse logistics status, without providing complete reverse logistics information. For seller_validation, only one segment of reverse (buyer to seller), use tracking_info, for warehouse_validation, two segment of reverse (buyer to warehouse and warehouse to seller), use post_return_logistics_tracking_info.
 */
export interface GetReverseTrackingInfoRequest {
  /**
   * Shopee's unique identifier for a return/refund request (serial number of return).
   */
  return_sn: ReturnSn | string | number;
}
/**
 * GetReverseTrackingInfoTrackingInfo sub-interface for GetReverseTrackingInfoResponseData
 */
export interface GetReverseTrackingInfoTrackingInfo {
  /**
   * The timestamps when reverse logistics info has been updated for Normal RR, pushed from third party logistics provider to Shopee.
   */
  update_time?: Date | number;
  /**
   * The description of reverse logistics tracking info for Normal RR, pushed by third party logistics provider to Shopee.
   */
  tracking_description?: string;
  /**
   * Image URLs of electronic proof of pickup (ePOP) after return parcel has been picked up from the buyer for Normal RR.
   */
  epop_image_list?: string[];
  /**
   * Image URLs of electronic proof of delivery (ePOD) after return parcel has been delivered to the seller for Normal RR.
   */
  epod_image_list?: string[];
}
/**
 * GetReverseTrackingInfoPostReturnLogisticsTrackingInfo sub-interface for GetReverseTrackingInfoResponseData
 */
export interface GetReverseTrackingInfoPostReturnLogisticsTrackingInfo {
  /**
   * The timestamps when reverse logistics info has been updated for Normal RR from warehouse to seller, pushed from third party logistics provider to Shopee.
   */
  update_time?: Date | number;
  /**
   * The description of reverse logistics tracking info for Normal RR from warehouse to seller, pushed by third party logistics provider to Shopee.These would match the tracking description displayed to sellers on Seller Center return/refund detail page.
   */
  tracking_description?: TrackingDescription | string | number;
  /**
   * Image URLs of electronic proof of pickup (ePOP) after return parcel has been picked up from the warehouse for Normal RR with warehouse validation.
   */
  epop_image_list?: string[];
  /**
   * Image URLs of electronic proof of delivery (ePOD) after return parcel has been delivered to the seller for Normal RR with warehouse validation.
   */
  epod_image_list?: string[];
}
/**
 * GetReverseTrackingInfoResponseData sub-interface for GetReverseTrackingInfoResponse
 */
export interface GetReverseTrackingInfoResponseData {
  /**
   * Shopee's unique identifier for a return/refund request (serial number of return).
   */
  return_sn?: ReturnSn | string | number;
  /**
   * To indicate the type of return refund request, whether it is a Normal RR request, an In-transit RR request, and a Return on the Spot: 0: Normal RR (RR is raised by the buyer after delivery done / estimated delivery date)1: In-transit RR (RR is raised by the buyer while item is still in-transit to buyer)2: Return-on-the-Spot (RR is raised by the driver after buyer rejected parcel at delivery)For more details, see Data Definition- Return Refund Request Type.
   */
  return_refund_request_type?: number;
  /**
   * To indicate whether seller or warehouse will expect to receive the return parcel from buyer and validate the condition of the parcel: - seller_validation - warehouse_validationFor more details, see Data Definition- ValidationType.
   */
  validation_type?: string;
  /**
   * To indicate the latest reverse logistic status of a return, referring to the current status of the buyer shipping the return parcel back to the validation point (seller or warehouse), including Normal RR, In-transit RR, and Return-on-the-Spot.See "Data Definition - ReverseLogisticsStatus" as status displayed for Normal RR and In-transit RR or Return-on-the-Spot are different.Note: If validation_type = seller_validation, there is only one segment of reverse logistics (The buyer ships the return parcel directly back to the seller). Please use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain the reverse logistics tracking information.
   */
  reverse_logistics_status?: string;
  /**
   * The last update time of the reverse logistics status including Normal RR, In-transit RR, and Return-on-the-Spot.Note: If validation_type = seller_validation, there is only one segment of reverse logistics (The buyer ships the return parcel directly back to the seller). Please use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain the reverse logistics tracking information.
   */
  reverse_logistics_update_time?: Date | number;
  /**
   * The maximum estimated delivery date for the reverse logistics. This is calculated by Shopee Logistics Services once buyer ships out if there is historical tracking data available from third party logistics provider. Note: Only available for Normal RR with integrated reverse logistics.
   */
  estimated_delivery_date_max?: Date | number;
  /**
   * The minimum estimated delivery date for the reverse logistics. This is calculated by Shopee Logistics Services once buyer ships out if there is historical tracking data available from third party logistics provider.Note: Only available for Normal RR with integrated reverse logistics.
   */
  estimated_delivery_date_min?: Date | number;
  /**
   * The collection Pin Code to enter for seller to collect parcel in collection point or locker.Note: Only available for TW region.
   */
  collection_pin_code?: string;
  /**
   * The tracking number for the reverse logistics (the logistics tracking number provided when the buyer ships the item back).Note: - Only available for Normal RR with integrated reverse logistics.- If validation_type = seller_validation, there is only one segment of reverse logistics (The buyer ships the return parcel directly back to the seller). Please use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain the reverse logistics tracking information.
   */
  tracking_number?: string;
  /**
   * The detailed tracking information list for the reverse logistics.Note: - Only available for Normal RR with integrated reverse logistics, with the tracking information pushed by third party logistics provider to Shopee.- If validation_type = seller_validation, there is only one segment of reverse logistics (The buyer ships the return parcel directly back to the seller). Please use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain the reverse logistics tracking information.
   */
  tracking_info?: GetReverseTrackingInfoTrackingInfo[];
  /**
   * Post-return logistics status, referring to the current status of the warehouse shipping the return parcel back to the seller in warehouse validation mode. See "Data Definition - Post Return Logistics Status".Note: - Only available for Normal RR with return_solution = 0 (Return and Refund) and validation_type = warehouse_validation, and the warehouse ships the return parcel back to seller using integrated reverse logistics.- If validation_type = warehouse_validation AND the warehouse uses an integrated logistics channel to ship the return parcel back to the seller, there are two segments of reverse logistics: - The buyer first ships the return parcel back to the warehouse. Use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain tracking information for this first segment.- The warehouse then ships the return parcel back to the seller. Use the fields post_return_logistics_status, post_return_logistics_update_time, rts_tracking_number, and post_return_logistics_tracking_info to obtain tracking information for this second segment (post-return logistics).- For Cross-Border Returns, if the second segment exists, the API returns information for both the first and second segments. For Local Returns, if the second segment exists, the API prioritizes and returns only the second segment information.
   */
  post_return_logistics_status?: string;
  /**
   * The last update time of the post-return logistics status where warehouse sends return parcel from warehouse to seller.Note: - Only available for Normal RR with return_solution = 0 (Return and Refund) and validation_type = warehouse_validation, and the warehouse ships the return parcel back to seller using integrated reverse logistics.- If validation_type = warehouse_validation AND the warehouse uses an integrated logistics channel to ship the return parcel back to the seller, there are two segments of reverse logistics: - The buyer first ships the return parcel back to the warehouse. Use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain tracking information for this first segment.- The warehouse then ships the return parcel back to the seller. Use the fields post_return_logistics_status, post_return_logistics_update_time, rts_tracking_number, and post_return_logistics_tracking_info to obtain tracking information for this second segment (post-return logistics).- For Cross-Border Returns, if the second segment exists, the API returns information for both the first and second segments. For Local Returns, if the second segment exists, the API prioritizes and returns only the second segment information.
   */
  post_return_logistics_update_time?: Date | number;
  /**
   * The tracking number for the post-return logistics (the logistics tracking number used when the warehouse ships the parcel back to the seller). RTS stands for "Return to Seller".Note: - Only available for Normal RR with return_solution = 0 (Return and Refund) and validation_type = warehouse_validation, and the warehouse ships the return parcel back to seller using integrated reverse logistics.- If validation_type = warehouse_validation AND the warehouse uses an integrated logistics channel to ship the return parcel back to the seller, there are two segments of reverse logistics: - The buyer first ships the return parcel back to the warehouse. Use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain tracking information for this first segment.- The warehouse then ships the return parcel back to the seller. Use the fields post_return_logistics_status, post_return_logistics_update_time, rts_tracking_number, and post_return_logistics_tracking_info to obtain tracking information for this second segment (post-return logistics).- For Cross-Border Returns, if the second segment exists, the API returns information for both the first and second segments. For Local Returns, if the second segment exists, the API prioritizes and returns only the second segment information.
   */
  rts_tracking_number?: string;
  /**
   * Only available for Normal RR with return_solution = 0 (Return and Refund) and validation_type = warehouse_validation, and the warehouse ships the return parcel back to seller using integrated reverse logistics.In this scenario, the tracking logistics from warehouse to seller is called "post-return logistics", with the tracking information pushed by third party logistics provider to Shopee.Note: - If validation_type = warehouse_validation AND the warehouse uses an integrated logistics channel to ship the return parcel back to the seller, there are two segments of reverse logistics: - The buyer first ships the return parcel back to the warehouse. Use the fields reverse_logistics_status, reverse_logistics_update_time, tracking_number, and tracking_info to obtain tracking information for this first segment.- The warehouse then ships the return parcel back to the seller. Use the fields post_return_logistics_status, post_return_logistics_update_time, rts_tracking_number, and post_return_logistics_tracking_info to obtain tracking information for this second segment (post-return logistics).- For Cross-Border Returns, if the second segment exists, the API returns information for both the first and second segments. For Local Returns, if the second segment exists, the API prioritizes and returns only the second segment information.
   */
  post_return_logistics_tracking_info?: GetReverseTrackingInfoPostReturnLogisticsTrackingInfo[];
}
/**
 * Response payload for get_reverse_tracking_info
 *
 * Get reverse and post-return logistics information of return request. For Normal RR, return complete reverse logistics information, for In-transit RR and Return-on-the-Spot, only return latest reverse logistics status, without providing complete reverse logistics information. For seller_validation, only one segment of reverse (buyer to seller), use tracking_info, for warehouse_validation, two segment of reverse (buyer to warehouse and warehouse to seller), use post_return_logistics_tracking_info.
 */
export type GetReverseTrackingInfoResponse = FetchResponse<GetReverseTrackingInfoResponseData>;
/**
 * Request parameters for get_shipping_carrier
 *
 * Use this API to get the list of shipping carriers and request parameters needed before calling v2.returns.upload_shipping_proof. Only for TW and BR returns with is_seller_arrange = true.
 */
export interface GetShippingCarrierRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * GetShippingCarrierShippingProofTemplate sub-interface for GetShippingCarrierResponseData
 */
export interface GetShippingCarrierShippingProofTemplate {
  /**
   * To indicate whether it is mandatory to provide tracking number when uploading shipping proof.
   */
  is_tracking_number_required?: boolean;
  /**
   * To indicate whether it is mandatory to provide shipping image file(s) when uploading shipping proof.
   */
  is_shipping_image_file_mandatory?: boolean;
}
/**
 * GetShippingCarrierReverseLogisticsCarrier sub-interface for GetShippingCarrierResponseData
 */
export interface GetShippingCarrierReverseLogisticsCarrier {
  /**
   * To indicate the id of the non-integrated reverse logistics channel used by seller.
   */
  reverse_logistics_carrier_id?: number;
  /**
   * To indicate the selected carrier name from the list of carrier names provided.
   */
  reverse_logistics_carrier_name?: string;
}
/**
 * GetShippingCarrierResponseData sub-interface for GetShippingCarrierResponse
 */
export interface GetShippingCarrierResponseData {
  /**
   * To indicate whether uploading shipping proof is mandatory for seller to confirm "Arrange Pickup" when is_seller_arrange = true.
   */
  is_shipping_proof_mandatory?: boolean;
  /**
   * To indicate whether seller has already uploaded shipping proof for this return.
   */
  has_uploaded_seller_arrange_proof?: boolean;
  /**
   * To display list of request parameters needed to upload shipping proof.
   */
  shipping_proof_template?: GetShippingCarrierShippingProofTemplate[];
  /**
   * The list of logistics carriers available for sellers to choose.
   */
  reverse_logistics_carrier_list?: GetShippingCarrierReverseLogisticsCarrier[];
}
/**
 * Response payload for get_shipping_carrier
 *
 * Use this API to get the list of shipping carriers and request parameters needed before calling v2.returns.upload_shipping_proof. Only for TW and BR returns with is_seller_arrange = true.
 */
export type GetShippingCarrierResponse = FetchResponse<GetShippingCarrierResponseData>;
/**
 * Request parameters for offer
 *
 * v2.returns.offer
 */
export interface OfferRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
  /**
   * The new solution to be offered. See "Data Definition - ReturnSolution"
   */
  proposed_solution: string;
  /**
   * The new refund amount to be offered
   */
  proposed_adjusted_refund_amount?: number;
}
/**
 * OfferResponseData sub-interface for OfferResponse
 */
export interface OfferResponseData {
  /**
   * The serial number of return.
   */
  return_sn?: string;
}
/**
 * Response payload for offer
 *
 * v2.returns.offer
 */
export type OfferResponse = FetchResponse<OfferResponseData>;
/**
 * Request parameters for query_proof
 *
 * Support sellers to query the evidence uploaded through the upload evidence API.
 */
export interface QueryProofRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
}
/**
 * QueryProofImage sub-interface for QueryProofResponseData
 */
export interface QueryProofImage {
  /**
   * The image url in dispute proof.
   */
  url?: string;
  /**
   * The thumbnail of image.
   */
  thumbnail?: string;
}
/**
 * QueryProofVideo sub-interface for QueryProofResponseData
 */
export interface QueryProofVideo {
  /**
   * The video url in dispute proof.
   */
  url?: string;
  /**
   * The thumbnail of video
   */
  thumbnail?: string;
}
/**
 * QueryProofResponseData sub-interface for QueryProofResponse
 */
export interface QueryProofResponseData {
  image?: QueryProofImage[];
  video?: QueryProofVideo[];
  /**
   * The text description in the dispute proof.
   */
  description?: string;
}
/**
 * Response payload for query_proof
 *
 * Support sellers to query the evidence uploaded through the upload evidence API.
 */
export type QueryProofResponse = FetchResponse<QueryProofResponseData>;
/**
 * UploadProofPhoto sub-interface for UploadProofRequest
 */
export interface UploadProofPhoto {
  /**
   * Uploaded proof image link, it is recommended to pass in the return url of api called convert_image.
   */
  url: string;
  /**
   * The proof image thumbnail.
   */
  thumbnail: string;
}
/**
 * Request parameters for upload_proof
 *
 * Support sellers to upload evidence, including text and pictures and videos converted into URLs.
 */
export interface UploadProofRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
  photo?: UploadProofPhoto[];
  /**
   * text description in the dispute proof
   */
  description?: string;
}
/**
 * Response data payload for upload_proof
 */
export type UploadProofResponseData = any;
/**
 * Response payload for upload_proof
 *
 * Support sellers to upload evidence, including text and pictures and videos converted into URLs.
 */
export type UploadProofResponse = FetchResponse<UploadProofResponseData>;
/**
 * UploadShippingProofImageId sub-interface for UploadShippingProofRequest
 */
export interface UploadShippingProofImageId {
  /**
   * Unique image_id.
   */
  image_id?: string;
}
/**
 * Request parameters for upload_shipping_proof
 *
 * Use this API to upload shipping proof (Only for TW and BR returns with is_seller_arrange = true). This is not to upload evidence for disputes.
 */
export interface UploadShippingProofRequest {
  /**
   * The serial number of return.
   */
  return_sn: string;
  /**
   * Unique ID of non-integrated reverse logistics channel used by seller.
   */
  reverse_logistics_carrier_id: number;
  /**
   * Non-integrated reverse logistics channel name used by seller.
   */
  reverse_logistics_carrier_name?: string;
  /**
   * Tracking number used in seller arrange. Required when is_tracking_number_required = true in v2.returns.get_shipping_carrier.
   */
  tracking_number?: string;
  /**
   * List of image_id of shipping proof image. Required when is_shipping_image_file_mandatory = true in v2.returns.get_shipping_carrier. Max: 3.You can call the v2.media.upload_image to upload image and get the image_id, for this scenario, please pass the business = 2 and scene = 1.
   */
  image_id_list?: UploadShippingProofImageId[];
  /**
   * Optional remarks
   */
  remarks?: string;
}
/**
 * Response data payload for upload_shipping_proof
 */
export type UploadShippingProofResponseData = any;
/**
 * Response payload for upload_shipping_proof
 *
 * Use this API to upload shipping proof (Only for TW and BR returns with is_seller_arrange = true). This is not to upload evidence for disputes.
 */
export type UploadShippingProofResponse = FetchResponse<UploadShippingProofResponseData>;
