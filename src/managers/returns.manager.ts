import {
  AcceptOfferRequest,
  AcceptOfferResponse,
  CancelDisputeRequest,
  CancelDisputeResponse,
  ConfirmRequest,
  ConfirmResponse,
  ConvertImageRequest,
  ConvertImageResponse,
  DisputeRequest,
  DisputeResponse,
  GetAvailableSolutionsRequest,
  GetAvailableSolutionsResponse,
  GetReturnDetailRequest,
  GetReturnDetailResponse,
  GetReturnDisputeReasonRequest,
  GetReturnDisputeReasonResponse,
  GetReturnListRequest,
  GetReturnListResponse,
  GetReverseTrackingInfoRequest,
  GetReverseTrackingInfoResponse,
  GetShippingCarrierRequest,
  GetShippingCarrierResponse,
  OfferRequest,
  OfferResponse,
  QueryProofRequest,
  QueryProofResponse,
  UploadProofRequest,
  UploadProofResponse,
  UploadShippingProofRequest,
  UploadShippingProofResponse,
} from "../schemas/returns.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class ReturnsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * v2.returns.accept_offer
   *
   * @param {AcceptOfferRequest} params Request parameters
   * @returns {Promise<AcceptOfferResponse>} Promise resolving to the response
   */
  public async acceptOffer(params?: AcceptOfferRequest): Promise<AcceptOfferResponse> {
    return ShopeeFetch.fetch<AcceptOfferResponse>(this.config, "/returns/accept_offer", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Sellers can only cancel compensation disputes, not normal disputes. This means that sellers can only cancel disputes when the return_status is ACCEPTED and the compensation_status is COMPENSATION_REQUESTED.
   *
   * @param {CancelDisputeRequest} params Request parameters
   * @returns {Promise<CancelDisputeResponse>} Promise resolving to the response
   */
  public async cancelDispute(params?: CancelDisputeRequest): Promise<CancelDisputeResponse> {
    return ShopeeFetch.fetch<CancelDisputeResponse>(this.config, "/returns/cancel_dispute", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Confirm refund
   *
   * @param {ConfirmRequest} params Request parameters
   * @returns {Promise<ConfirmResponse>} Promise resolving to the response
   */
  public async confirm(params?: ConfirmRequest): Promise<ConfirmResponse> {
    return ShopeeFetch.fetch<ConfirmResponse>(this.config, "/returns/confirm", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Convert a specific format and pictures within 10M into url.
   *
   * @param {ConvertImageRequest} params Request parameters
   * @returns {Promise<ConvertImageResponse>} Promise resolving to the response
   */
  public async convertImage(params?: ConvertImageRequest): Promise<ConvertImageResponse> {
    return ShopeeFetch.fetch<ConvertImageResponse>(this.config, "/returns/convert_image", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Dispute return.
   *
   * Support to raise dispute when return_status in REQUESTED / PROCESSING/ACCEPTED
   *
   * @param {DisputeRequest} params Request parameters
   * @returns {Promise<DisputeResponse>} Promise resolving to the response
   */
  public async dispute(params?: DisputeRequest): Promise<DisputeResponse> {
    return ShopeeFetch.fetch<DisputeResponse>(this.config, "/returns/dispute", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Get the available solutions offered to buyers.
   *
   * @param {GetAvailableSolutionsRequest} params Request parameters
   * @returns {Promise<GetAvailableSolutionsResponse>} Promise resolving to the response
   */
  public async getAvailableSolutions(
    params?: GetAvailableSolutionsRequest
  ): Promise<GetAvailableSolutionsResponse> {
    return ShopeeFetch.fetch<GetAvailableSolutionsResponse>(
      this.config,
      "/returns/get_available_solutions",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get detail information of a return by return sn.
   *
   * @param {GetReturnDetailRequest} params Request parameters
   * @returns {Promise<GetReturnDetailResponse>} Promise resolving to the response
   */
  public async getReturnDetail(params?: GetReturnDetailRequest): Promise<GetReturnDetailResponse> {
    return ShopeeFetch.fetch<GetReturnDetailResponse>(this.config, "/returns/get_return_detail", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "response.create_time",
        "response.update_time",
        "response.due_date",
        "response.return_ship_due_date",
        "response.return_seller_due_date",
        "response.seller_proof.seller_evidence_deadline",
        "response.seller_compensation.seller_compensation_due_date",
        "response.negotiation.offer_due_date",
      ],
    });
  }
  /**
   * To get the dispute return reason.
   *
   * @param {GetReturnDisputeReasonRequest} params Request parameters
   * @returns {Promise<GetReturnDisputeReasonResponse>} Promise resolving to the response
   */
  public async getReturnDisputeReason(
    params?: GetReturnDisputeReasonRequest
  ): Promise<GetReturnDisputeReasonResponse> {
    return ShopeeFetch.fetch<GetReturnDisputeReasonResponse>(
      this.config,
      "/returns/get_return_dispute_reason",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this api to get detail information of many return by shop id.
   *
   * @param {GetReturnListRequest} params Request parameters
   * @returns {Promise<GetReturnListResponse>} Promise resolving to the response
   */
  public async getReturnList(params?: GetReturnListRequest): Promise<GetReturnListResponse> {
    return ShopeeFetch.fetch<GetReturnListResponse>(this.config, "/returns/get_return_list", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "create_time_from",
        "create_time_to",
        "update_time_from",
        "update_time_to",
        "response.return.create_time",
        "response.return.update_time",
        "response.return.due_date",
        "response.return.return_ship_due_date",
        "response.return.return_seller_due_date",
      ],
    });
  }
  /**
   * Get reverse and post-return logistics information of return request. For Normal RR, return complete reverse logistics information, for In-transit RR and Return-on-the-Spot, only return latest reverse logistics status, without providing complete reverse logistics information. For seller_validation, only one segment of reverse (buyer to seller), use tracking_info, for warehouse_validation, two segment of reverse (buyer to warehouse and warehouse to seller), use post_return_logistics_tracking_info.
   *
   * @param {GetReverseTrackingInfoRequest} params Request parameters
   * @returns {Promise<GetReverseTrackingInfoResponse>} Promise resolving to the response
   */
  public async getReverseTrackingInfo(
    params?: GetReverseTrackingInfoRequest
  ): Promise<GetReverseTrackingInfoResponse> {
    return ShopeeFetch.fetch<GetReverseTrackingInfoResponse>(
      this.config,
      "/returns/get_reverse_tracking_info",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.reverse_logistics_update_time",
          "response.estimated_delivery_date_max",
          "response.estimated_delivery_date_min",
          "response.tracking_info.update_time",
          "response.post_return_logistics_update_time",
          "response.post_return_logistics_tracking_info.update_time",
        ],
      }
    );
  }
  /**
   * Use this API to get the list of shipping carriers and request parameters needed before calling v2.returns.upload_shipping_proof. Only for TW and BR returns with is_seller_arrange = true.
   *
   * @param {GetShippingCarrierRequest} params Request parameters
   * @returns {Promise<GetShippingCarrierResponse>} Promise resolving to the response
   */
  public async getShippingCarrier(
    params?: GetShippingCarrierRequest
  ): Promise<GetShippingCarrierResponse> {
    return ShopeeFetch.fetch<GetShippingCarrierResponse>(
      this.config,
      "/returns/get_shipping_carrier",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * v2.returns.offer
   *
   * @param {OfferRequest} params Request parameters
   * @returns {Promise<OfferResponse>} Promise resolving to the response
   */
  public async offer(params?: OfferRequest): Promise<OfferResponse> {
    return ShopeeFetch.fetch<OfferResponse>(this.config, "/returns/offer", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Support sellers to query the evidence uploaded through the upload evidence API.
   *
   * @param {QueryProofRequest} params Request parameters
   * @returns {Promise<QueryProofResponse>} Promise resolving to the response
   */
  public async queryProof(params?: QueryProofRequest): Promise<QueryProofResponse> {
    return ShopeeFetch.fetch<QueryProofResponse>(this.config, "/returns/query_proof", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Support sellers to upload evidence, including text and pictures and videos converted into URLs.
   *
   * @param {UploadProofRequest} params Request parameters
   * @returns {Promise<UploadProofResponse>} Promise resolving to the response
   */
  public async uploadProof(params?: UploadProofRequest): Promise<UploadProofResponse> {
    return ShopeeFetch.fetch<UploadProofResponse>(this.config, "/returns/upload_proof", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this API to upload shipping proof (Only for TW and BR returns with is_seller_arrange = true). This is not to upload evidence for disputes.
   *
   * @param {UploadShippingProofRequest} params Request parameters
   * @returns {Promise<UploadShippingProofResponse>} Promise resolving to the response
   */
  public async uploadShippingProof(
    params?: UploadShippingProofRequest
  ): Promise<UploadShippingProofResponse> {
    return ShopeeFetch.fetch<UploadShippingProofResponse>(
      this.config,
      "/returns/upload_shipping_proof",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
