import { BaseResponse } from "./base.js";

/**
 * Return status enum
 */
export enum ReturnStatus {
  /** Return request initiated */
  REQUESTED = "REQUESTED",
  /** Return is being processed */
  PROCESSING = "PROCESSING",
  /** Return has been accepted */
  ACCEPTED = "ACCEPTED",
  /** Return has been completed */
  COMPLETED = "COMPLETED",
  /** Return has been cancelled */
  CANCELLED = "CANCELLED",
}

/**
 * Negotiation status enum
 */
export enum NegotiationStatus {
  /** Pending seller response */
  PENDING_RESPOND = "PENDING_RESPOND",
  /** Negotiation ongoing */
  ONGOING = "ONGOING",
  /** Negotiation terminated */
  TERMINATED = "TERMINATED",
}

/**
 * Seller proof status enum
 */
export enum SellerProofStatus {
  /** Proof pending */
  PENDING = "PENDING",
  /** Proof uploaded */
  UPLOADED = "UPLOADED",
  /** Proof not needed */
  NOT_NEEDED = "NOT_NEEDED",
}

/**
 * Seller compensation status enum
 */
export enum SellerCompensationStatus {
  /** Compensation not required */
  NOT_REQUIRED = "NOT_REQUIRED",
  /** Compensation request pending */
  PENDING_REQUEST = "PENDING_REQUEST",
  /** Compensation requested */
  COMPENSATION_REQUESTED = "COMPENSATION_REQUESTED",
}

/**
 * Return solution enum
 */
export enum ReturnSolution {
  /** Return and refund */
  RETURN_REFUND = "RETURN_REFUND",
  /** Refund only */
  REFUND_ONLY = "REFUND_ONLY",
}

/**
 * User information for returns
 */
export interface ReturnUser {
  /** Buyer's username */
  username: string;
  /** Buyer's email */
  email: string;
  /** Buyer's portrait URL */
  portrait: string;
}

/**
 * Item information in return
 */
export interface ReturnItem {
  /** Model ID of the item */
  model_id: number;
  /** Item name */
  name: string;
  /** Item image URLs */
  images: string[];
  /** Quantity of item */
  amount: number;
  /** Item price */
  item_price: number;
  /** Whether item is part of add-on deal */
  is_add_on_deal: boolean;
  /** Whether item is main item */
  is_main_item: boolean;
  /** Add-on deal ID */
  add_on_deal_id: number;
  /** Item ID */
  item_id: number;
  /** Item SKU */
  item_sku: string;
  /** Variation SKU */
  variation_sku: string;
  /** Item's refund amount (for Partial Qty RR) */
  refund_amount?: number;
}

/**
 * Video information for returns
 */
export interface ReturnVideoInfo {
  /** Thumbnail URL of video */
  thumbnail_url: string;
  /** URL of video */
  video_url: string;
}

/**
 * Seller proof information
 */
export interface SellerProof {
  /** Seller proof status */
  seller_proof_status: string;
  /** Deadline for submitting evidence */
  seller_evidence_deadline: number;
}

/**
 * Seller compensation information
 */
export interface SellerCompensation {
  /** Seller compensation status */
  seller_compensation_status: string;
  /** Deadline for requesting compensation */
  seller_compensation_due_date: number;
  /** Compensation amount */
  compensation_amount: number;
}

/**
 * Negotiation information
 */
export interface Negotiation {
  /** Negotiation status */
  negotiation_status: string;
  /** Latest solution offered */
  latest_solution: string;
  /** Latest offer amount */
  latest_offer_amount: number;
  /** Creator of latest offer */
  latest_offer_creator: string;
  /** Remaining counter limit */
  counter_limit: number;
  /** Offer due date */
  offer_due_date: number;
}

/**
 * Return address information
 */
export interface ReturnAddress {
  /** Warehouse ID */
  whs_id?: string;
}

/**
 * Pickup address information
 */
export interface PickupAddress {
  /** Address */
  address: string;
  /** Name */
  name: string;
  /** Phone number */
  phone: string;
  /** Town */
  town: string;
  /** District */
  district: string;
  /** City */
  city: string;
  /** State */
  state: string;
  /** Region */
  region: string;
  /** Zipcode */
  zipcode: string;
}

/**
 * Activity item information
 */
export interface ActivityItem {
  /** Item ID */
  item_id: number;
  /** Variation ID */
  variation_id: number;
  /** Quantity purchased */
  quantity_purchased: number;
  /** Original price */
  original_price: string;
}

/**
 * Activity information
 */
export interface Activity {
  /** Activity ID */
  activity_id: number;
  /** Activity type */
  activity_type: string;
  /** Original price */
  original_price: string;
  /** Discounted price */
  discounted_price: string;
  /** Items in activity */
  items: ActivityItem[];
  /** Refund amount for bundle deal cases */
  refund_amount?: number;
}

/**
 * Return detail information
 */
export interface ReturnDetail {
  /** Return images */
  image: string[];
  /** Buyer videos */
  buyer_videos?: ReturnVideoInfo[];
  /** Return reason */
  reason: string;
  /** Text reason provided by buyer */
  text_reason: string;
  /** Return serial number */
  return_sn: string;
  /** Refund amount */
  refund_amount: number;
  /** Currency */
  currency: string;
  /** Create time */
  create_time: number;
  /** Update time */
  update_time: number;
  /** Return status */
  status: string;
  /** Due date */
  due_date: number;
  /** Tracking number */
  tracking_number: string;
  /** Dispute reason */
  dispute_reason?: number | string[];
  /** Dispute text reason */
  dispute_text_reason?: string | string[];
  /** Needs logistics */
  needs_logistics: boolean;
  /** Amount before discount */
  amount_before_discount: number;
  /** User information */
  user: ReturnUser;
  /** Items in return */
  item: ReturnItem[];
  /** Order serial number */
  order_sn: string;
  /** Return ship due date */
  return_ship_due_date: number;
  /** Return seller due date */
  return_seller_due_date: number;
  /** Negotiation status */
  negotiation_status?: string;
  /** Seller proof status */
  seller_proof_status?: string;
  /** Seller compensation status */
  seller_compensation_status?: string;
  /** Seller proof */
  seller_proof?: SellerProof;
  /** Seller compensation */
  seller_compensation?: SellerCompensation;
  /** Negotiation */
  negotiation?: Negotiation;
  /** Logistics status */
  logistics_status?: string;
  /** Return pickup address */
  return_pickup_address?: PickupAddress;
  /** Virtual contact number */
  virtual_contact_number?: string;
  /** Package query number */
  package_query_number?: string;
  /** Return address */
  return_address?: ReturnAddress;
  /** Return refund type */
  return_refund_type?: string;
  /** Return solution */
  return_solution?: number;
  /** Is seller arrange */
  is_seller_arrange?: boolean;
  /** Is shipping proof mandatory */
  is_shipping_proof_mandatory?: boolean;
  /** Has uploaded shipping proof */
  has_uploaded_shipping_proof?: boolean;
  /** Is reverse logistics channel integrated */
  is_reverse_logistics_channel_integrated?: boolean;
  /** Reverse logistic channel name */
  reverse_logistic_channel_name?: string;
  /** Return refund request type */
  return_refund_request_type?: number;
  /** Validation type */
  validation_type?: string;
  /** Activities */
  activity?: Activity[];
}

/**
 * Parameters for getting return list
 */
export type GetReturnListParams = {
  /** Page number */
  page_no: number;
  /** Page size */
  page_size: number;
  /** Create time from */
  create_time_from?: number;
  /** Create time to */
  create_time_to?: number;
  /** Update time from */
  update_time_from?: number;
  /** Update time to */
  update_time_to?: number;
  /** Return status filter */
  status?: string;
  /** Negotiation status filter */
  negotiation_status?: string;
  /** Seller proof status filter */
  seller_proof_status?: string;
  /** Seller compensation status filter */
  seller_compensation_status?: string;
};

/**
 * Response for get return list API
 */
export interface GetReturnListResponse extends BaseResponse {
  response: {
    /** Whether there are more pages */
    more: boolean;
    /** List of returns */
    return: ReturnDetail[];
  };
}

/**
 * Parameters for getting return detail
 */
export type GetReturnDetailParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for get return detail API
 */
export interface GetReturnDetailResponse extends BaseResponse {
  response: ReturnDetail;
}

/**
 * Parameters for confirming return
 */
export type ConfirmParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for confirm API
 */
export interface ConfirmResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for disputing return
 */
export type DisputeParams = {
  /** Return serial number */
  return_sn: string;
  /** Email for contact */
  email: string;
  /** Dispute reason */
  dispute_reason: number;
  /** Dispute text reason */
  dispute_text_reason?: string;
  /** Images for dispute */
  images?: string[];
};

/**
 * Response for dispute API
 */
export interface DisputeResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for offering solution
 */
export type OfferParams = {
  /** Return serial number */
  return_sn: string;
  /** Solution to offer */
  solution: number;
  /** Refund amount */
  refund_amount?: number;
};

/**
 * Response for offer API
 */
export interface OfferResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for accepting offer
 */
export type AcceptOfferParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for accept offer API
 */
export interface AcceptOfferResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for getting available solutions
 */
export type GetAvailableSolutionsParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Solution information
 */
export interface SolutionInfo {
  /** Solution option */
  solution: number;
  /** Maximum refund amount */
  max_refund_amount: number;
}

/**
 * Response for get available solutions API
 */
export interface GetAvailableSolutionsResponse extends BaseResponse {
  response: {
    /** Available solutions */
    solution: SolutionInfo[];
  };
}

/**
 * Parameters for cancelling dispute
 */
export type CancelDisputeParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for cancel dispute API
 */
export interface CancelDisputeResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Dispute reason information
 */
export interface DisputeReason {
  /** Reason ID */
  reason_id: number;
  /** Reason text */
  reason_text: string;
}

/**
 * Parameters for getting return dispute reason
 */
export type GetReturnDisputeReasonParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for get return dispute reason API
 */
export interface GetReturnDisputeReasonResponse extends BaseResponse {
  response: {
    /** List of dispute reasons */
    dispute_reason: DisputeReason[];
  };
}

/**
 * Image to convert
 */
export interface ImageToConvert {
  /** Image content */
  image: string;
}

/**
 * Parameters for converting image
 */
export type ConvertImageParams = {
  /** Images to convert */
  images: ImageToConvert[];
};

/**
 * Converted image information
 */
export interface ConvertedImage {
  /** Image URL */
  url: string;
  /** Thumbnail URL */
  thumbnail_url?: string;
}

/**
 * Response for convert image API
 */
export interface ConvertImageResponse extends BaseResponse {
  response: {
    /** Converted images */
    images: ConvertedImage[];
  };
}

/**
 * Proof text item
 */
export interface ProofTextItem {
  /** Text content */
  text: string;
}

/**
 * Proof image item
 */
export interface ProofImageItem {
  /** Image URL */
  url: string;
}

/**
 * Proof video item
 */
export interface ProofVideoItem {
  /** Video URL */
  url: string;
}

/**
 * Parameters for uploading proof
 */
export type UploadProofParams = {
  /** Return serial number */
  return_sn: string;
  /** Proof text */
  proof_text?: ProofTextItem[];
  /** Proof images */
  proof_image?: ProofImageItem[];
  /** Proof videos */
  proof_video?: ProofVideoItem[];
};

/**
 * Response for upload proof API
 */
export interface UploadProofResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for querying proof
 */
export type QueryProofParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Proof information
 */
export interface ProofInfo {
  /** Proof text */
  proof_text?: ProofTextItem[];
  /** Proof images */
  proof_image?: ProofImageItem[];
  /** Proof videos */
  proof_video?: ProofVideoItem[];
}

/**
 * Response for query proof API
 */
export interface QueryProofResponse extends BaseResponse {
  response: ProofInfo;
}

/**
 * Shipping carrier information
 */
export interface ShippingCarrier {
  /** Carrier ID */
  carrier_id: number;
  /** Carrier name */
  carrier_name: string;
  /** Required fields */
  required_fields: string[];
}

/**
 * Parameters for getting shipping carrier
 */
export type GetShippingCarrierParams = {
  /** Return serial number */
  return_sn: string;
};

/**
 * Response for get shipping carrier API
 */
export interface GetShippingCarrierResponse extends BaseResponse {
  response: {
    /** List of shipping carriers */
    carrier_list: ShippingCarrier[];
  };
}

/**
 * Parameters for uploading shipping proof
 */
export type UploadShippingProofParams = {
  /** Return serial number */
  return_sn: string;
  /** Carrier ID */
  carrier_id: number;
  /** Tracking number */
  tracking_number: string;
  /** Additional fields as key-value pairs */
  [key: string]: string | number;
};

/**
 * Response for upload shipping proof API
 */
export interface UploadShippingProofResponse extends BaseResponse {
  response: {
    /** Return serial number */
    return_sn: string;
  };
}

/**
 * Parameters for getting reverse tracking info
 */
export type GetReverseTrackingInfoParams = {
  /** Shopee's unique identifier for a return/refund request (serial number of return) */
  return_sn: string;
};

/**
 * Tracking information detail
 */
export interface TrackingInfo {
  /** The timestamps when reverse logistics info has been updated */
  update_time: number;
  /** The description of reverse logistics tracking info */
  tracking_description: string;
  /** Image URLs of electronic proof of pickup (ePOP) after return parcel has been picked up */
  epop_image_list?: string[];
  /** Image URLs of electronic proof of delivery (ePOD) after return parcel has been delivered */
  epod_image_list?: string[];
}

/**
 * Response for get reverse tracking info API
 */
export interface GetReverseTrackingInfoResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a return/refund request (serial number of return) */
    return_sn: string;
    /** Return refund request type: 0 = Normal RR, 1 = In-transit RR, 2 = Return-on-the-Spot */
    return_refund_request_type: number;
    /** Validation type: seller_validation or warehouse_validation */
    validation_type: string;
    /** Latest reverse logistic status */
    reverse_logistics_status: string;
    /** The last update time of the reverse logistics status */
    reverse_logistics_update_time: number;
    /** The maximum estimated delivery date for the reverse logistics */
    estimated_delivery_date_max?: number;
    /** The minimum estimated delivery date for the reverse logistics */
    estimated_delivery_date_min?: number;
    /** The tracking number for the reverse logistics */
    tracking_number?: string;
    /** The detailed tracking information list for the reverse logistics */
    tracking_info?: TrackingInfo[];
    /** Post-return logistics status */
    post_return_logistics_status?: string;
    /** The last update time of the post-return logistics status */
    post_return_logistics_update_time?: number;
    /** The tracking number for the post-return logistics (Return to Seller) */
    rts_tracking_number?: string;
    /** The detailed tracking information for post-return logistics */
    post_return_logistics_tracking_info?: TrackingInfo[];
  };
}
