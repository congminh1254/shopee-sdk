import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  GetReturnListParams,
  GetReturnListResponse,
  GetReturnDetailParams,
  GetReturnDetailResponse,
  ConfirmParams,
  ConfirmResponse,
  DisputeParams,
  DisputeResponse,
  OfferParams,
  OfferResponse,
  AcceptOfferParams,
  AcceptOfferResponse,
  GetAvailableSolutionsParams,
  GetAvailableSolutionsResponse,
  CancelDisputeParams,
  CancelDisputeResponse,
  GetReturnDisputeReasonParams,
  GetReturnDisputeReasonResponse,
  ConvertImageParams,
  ConvertImageResponse,
  UploadProofParams,
  UploadProofResponse,
  QueryProofParams,
  QueryProofResponse,
  GetShippingCarrierParams,
  GetShippingCarrierResponse,
  UploadShippingProofParams,
  UploadShippingProofResponse,
} from "../schemas/returns.js";
import { ShopeeFetch } from "../fetch.js";

export class ReturnsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Use this API to get detail information of many returns by shop ID.
   *
   * @param params - Parameters for getting return list
   * @param params.page_no - Page number (required)
   * @param params.page_size - Page size, max 100 (required)
   * @param params.create_time_from - Filter by create time from (timestamp)
   * @param params.create_time_to - Filter by create time to (timestamp)
   * @param params.update_time_from - Filter by update time from (timestamp)
   * @param params.update_time_to - Filter by update time to (timestamp)
   * @param params.status - Filter by return status
   * @param params.negotiation_status - Filter by negotiation status
   * @param params.seller_proof_status - Filter by seller proof status
   * @param params.seller_compensation_status - Filter by seller compensation status
   *
   * @returns A promise that resolves to the return list response containing:
   * - more: Whether there are more pages
   * - return: List of return details
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getReturnList(params: GetReturnListParams): Promise<GetReturnListResponse> {
    const response = await ShopeeFetch.fetch<GetReturnListResponse>(
      this.config,
      "/returns/get_return_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Use this API to get detail information of a return by return serial number.
   *
   * @param params - Parameters for getting return detail
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the return detail response containing:
   * - Complete return information including items, user, status, etc.
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getReturnDetail(params: GetReturnDetailParams): Promise<GetReturnDetailResponse> {
    const response = await ShopeeFetch.fetch<GetReturnDetailResponse>(
      this.config,
      "/returns/get_return_detail",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Confirm refund for a return request.
   *
   * @param params - Parameters for confirming return
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the confirm response containing:
   * - return_sn: The confirmed return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async confirm(params: ConfirmParams): Promise<ConfirmResponse> {
    const response = await ShopeeFetch.fetch<ConfirmResponse>(
      this.config,
      "/returns/confirm",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Dispute a return request. Support raising dispute when return_status is REQUESTED/PROCESSING/ACCEPTED.
   *
   * @param params - Parameters for disputing return
   * @param params.return_sn - Return serial number (required)
   * @param params.email - Email for contact (required)
   * @param params.dispute_reason - Dispute reason ID (required)
   * @param params.dispute_text_reason - Text explanation for dispute
   * @param params.images - Image URLs for dispute evidence
   *
   * @returns A promise that resolves to the dispute response containing:
   * - return_sn: The disputed return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async dispute(params: DisputeParams): Promise<DisputeResponse> {
    const response = await ShopeeFetch.fetch<DisputeResponse>(
      this.config,
      "/returns/dispute",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Offer a solution to the buyer during negotiation.
   *
   * @param params - Parameters for offering solution
   * @param params.return_sn - Return serial number (required)
   * @param params.solution - Solution to offer (required)
   * @param params.refund_amount - Refund amount (if applicable)
   *
   * @returns A promise that resolves to the offer response containing:
   * - return_sn: The return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async offer(params: OfferParams): Promise<OfferResponse> {
    const response = await ShopeeFetch.fetch<OfferResponse>(
      this.config,
      "/returns/offer",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Accept an offer from the buyer.
   *
   * @param params - Parameters for accepting offer
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the accept offer response containing:
   * - return_sn: The return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async acceptOffer(params: AcceptOfferParams): Promise<AcceptOfferResponse> {
    const response = await ShopeeFetch.fetch<AcceptOfferResponse>(
      this.config,
      "/returns/accept_offer",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get the available solutions offered to buyers.
   *
   * @param params - Parameters for getting available solutions
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the available solutions response containing:
   * - solution: List of available solution options with max refund amounts
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getAvailableSolutions(params: GetAvailableSolutionsParams): Promise<GetAvailableSolutionsResponse> {
    const response = await ShopeeFetch.fetch<GetAvailableSolutionsResponse>(
      this.config,
      "/returns/get_available_solutions",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Cancel a compensation dispute. Sellers can only cancel compensation disputes, not normal disputes.
   * This means sellers can only cancel disputes when return_status is ACCEPTED and compensation_status is COMPENSATION_REQUESTED.
   *
   * @param params - Parameters for cancelling dispute
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the cancel dispute response containing:
   * - return_sn: The return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async cancelDispute(params: CancelDisputeParams): Promise<CancelDisputeResponse> {
    const response = await ShopeeFetch.fetch<CancelDisputeResponse>(
      this.config,
      "/returns/cancel_dispute",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get the dispute return reasons available for a return.
   *
   * @param params - Parameters for getting dispute reasons
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the dispute reason response containing:
   * - dispute_reason: List of available dispute reasons with IDs and text
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getReturnDisputeReason(params: GetReturnDisputeReasonParams): Promise<GetReturnDisputeReasonResponse> {
    const response = await ShopeeFetch.fetch<GetReturnDisputeReasonResponse>(
      this.config,
      "/returns/get_return_dispute_reason",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Convert image files to URLs. Supports specific formats and pictures within 10MB.
   *
   * @param params - Parameters for converting images
   * @param params.images - Array of images to convert (required)
   *
   * @returns A promise that resolves to the convert image response containing:
   * - images: Array of converted image URLs
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async convertImage(params: ConvertImageParams): Promise<ConvertImageResponse> {
    const response = await ShopeeFetch.fetch<ConvertImageResponse>(
      this.config,
      "/returns/convert_image",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Upload evidence for a return, including text, pictures, and videos.
   *
   * @param params - Parameters for uploading proof
   * @param params.return_sn - Return serial number (required)
   * @param params.proof_text - Array of text evidence
   * @param params.proof_image - Array of image URLs as evidence
   * @param params.proof_video - Array of video URLs as evidence
   *
   * @returns A promise that resolves to the upload proof response containing:
   * - return_sn: The return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async uploadProof(params: UploadProofParams): Promise<UploadProofResponse> {
    const response = await ShopeeFetch.fetch<UploadProofResponse>(
      this.config,
      "/returns/upload_proof",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Query the evidence uploaded through the upload evidence API.
   *
   * @param params - Parameters for querying proof
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the query proof response containing:
   * - proof_text: Uploaded text evidence
   * - proof_image: Uploaded image evidence
   * - proof_video: Uploaded video evidence
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async queryProof(params: QueryProofParams): Promise<QueryProofResponse> {
    const response = await ShopeeFetch.fetch<QueryProofResponse>(
      this.config,
      "/returns/query_proof",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Get the list of shipping carriers and required parameters for uploading shipping proof.
   * Only for TW and BR returns with is_seller_arrange = true.
   *
   * @param params - Parameters for getting shipping carriers
   * @param params.return_sn - Return serial number (required)
   *
   * @returns A promise that resolves to the shipping carrier response containing:
   * - carrier_list: List of available shipping carriers with required fields
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getShippingCarrier(params: GetShippingCarrierParams): Promise<GetShippingCarrierResponse> {
    const response = await ShopeeFetch.fetch<GetShippingCarrierResponse>(
      this.config,
      "/returns/get_shipping_carrier",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Upload shipping proof for seller-arranged returns.
   * Only for TW and BR returns with is_seller_arrange = true. This is not to upload evidence for disputes.
   *
   * @param params - Parameters for uploading shipping proof
   * @param params.return_sn - Return serial number (required)
   * @param params.carrier_id - Carrier ID (required)
   * @param params.tracking_number - Tracking number (required)
   *
   * @returns A promise that resolves to the upload shipping proof response containing:
   * - return_sn: The return serial number
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async uploadShippingProof(params: UploadShippingProofParams): Promise<UploadShippingProofResponse> {
    const response = await ShopeeFetch.fetch<UploadShippingProofResponse>(
      this.config,
      "/returns/upload_shipping_proof",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }
}
