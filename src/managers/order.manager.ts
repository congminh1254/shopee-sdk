// NOTE: This file is auto-generated. Do not edit directly.

import {
  CancelOrderRequest,
  CancelOrderResponse,
  DownloadFbsInvoicesRequest,
  DownloadFbsInvoicesResponse,
  DownloadInvoiceDocRequest,
  DownloadInvoiceDocResponse,
  GenerateFbsInvoicesRequest,
  GenerateFbsInvoicesResponse,
  GetBookingDetailRequest,
  GetBookingDetailResponse,
  GetBookingListRequest,
  GetBookingListResponse,
  GetBuyerInvoiceInfoRequest,
  GetBuyerInvoiceInfoResponse,
  GetEstimateCancelValueRequest,
  GetEstimateCancelValueResponse,
  GetFbsInvoicesResultRequest,
  GetFbsInvoicesResultResponse,
  GetOrderDetailRequest,
  GetOrderDetailResponse,
  GetOrderListRequest,
  GetOrderListResponse,
  GetPackageDetailRequest,
  GetPackageDetailResponse,
  GetPendingBuyerInvoiceOrderListRequest,
  GetPendingBuyerInvoiceOrderListResponse,
  GetShipmentListRequest,
  GetShipmentListResponse,
  GetWarehouseFilterConfigRequest,
  GetWarehouseFilterConfigResponse,
  HandleBuyerCancellationRequest,
  HandleBuyerCancellationResponse,
  HandlePrescriptionCheckRequest,
  HandlePrescriptionCheckResponse,
  SearchPackageListRequest,
  SearchPackageListResponse,
  SetNoteRequest,
  SetNoteResponse,
  SplitOrderRequest,
  SplitOrderResponse,
  UnsplitOrderRequest,
  UnsplitOrderResponse,
  UploadInvoiceDocRequest,
  UploadInvoiceDocResponse,
} from "../schemas/order.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class OrderManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this api to cancel an order. This action can only be performed before the order has been shipped.
   *
   * @param {CancelOrderRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CancelOrderResponse>} Promise resolving to the response
   */
  public async cancelOrder(
    params: CancelOrderRequest,
    options?: RequestOptions
  ): Promise<CancelOrderResponse> {
    return ShopeeFetch.fetch<CancelOrderResponse>(this.config, "/order/cancel_order", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
      timestampPaths: ["response.update_time"],
    });
  }
  /**
   * This API allows you to download FBS invoices. To use this API, the client must first call v2.order.generate_fbs_invoices to create a new shipping document task, followed by calling v2.order.get_fbs_invoices_result to check the task status. The document can only be downloaded once the task status is "READY."
   *
   * @param {DownloadFbsInvoicesRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DownloadFbsInvoicesResponse>} Promise resolving to the response
   */
  public async downloadFbsInvoices(
    params?: DownloadFbsInvoicesRequest,
    options?: RequestOptions
  ): Promise<DownloadFbsInvoicesResponse> {
    return ShopeeFetch.fetch<DownloadFbsInvoicesResponse>(
      this.config,
      "/order/download_fbs_invoices",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
        timestampPaths: ["timestamp"],
      }
    );
  }
  /**
   * This endpoint only for PH and BR local seller. Seller can download the invoice uploaded before through this endpoint.
   *
   * @param {DownloadInvoiceDocRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DownloadInvoiceDocResponse>} Promise resolving to the response
   */
  public async downloadInvoiceDoc(
    params: DownloadInvoiceDocRequest,
    options?: RequestOptions
  ): Promise<DownloadInvoiceDocResponse> {
    return ShopeeFetch.fetch<DownloadInvoiceDocResponse>(
      this.config,
      "/order/download_invoice_doc",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * This API creates a task to download a specific tax document (e.g., sales invoice, remessa invoice) for the seller's account, available only after the document is issued by the system as part of the Fulfilled by Shopee (FBS) process.The workflow is as follows: (1) v2.order.generate_fbs_invoices; (2) v2.order.get_fbs_invoices_result; (3) v2.order.download_fbs_invoices.Please note: The download link for the document will expire 30 minutes after being generated.
   *
   * @param {GenerateFbsInvoicesRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GenerateFbsInvoicesResponse>} Promise resolving to the response
   */
  public async generateFbsInvoices(
    params?: GenerateFbsInvoicesRequest,
    options?: RequestOptions
  ): Promise<GenerateFbsInvoicesResponse> {
    return ShopeeFetch.fetch<GenerateFbsInvoicesResponse>(
      this.config,
      "/order/generate_fbs_invoices",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to get booking detail.
   *
   * @param {GetBookingDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBookingDetailResponse>} Promise resolving to the response
   */
  public async getBookingDetail(
    params: GetBookingDetailRequest,
    options?: RequestOptions
  ): Promise<GetBookingDetailResponse> {
    return ShopeeFetch.fetch<GetBookingDetailResponse>(this.config, "/order/get_booking_detail", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.booking_list.create_time",
        "response.booking_list.update_time",
        "response.booking_list.pickup_done_time",
      ],
    });
  }
  /**
   * Use this api to search bookings. You may also filter them by status, if needed.
   *
   * @param {GetBookingListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBookingListResponse>} Promise resolving to the response
   */
  public async getBookingList(
    params: GetBookingListRequest,
    options?: RequestOptions
  ): Promise<GetBookingListResponse> {
    return ShopeeFetch.fetch<GetBookingListResponse>(this.config, "/order/get_booking_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * API to obtain buyer submitted invoice info for VN, TH and PH local sellers only.
   *
   * @param {GetBuyerInvoiceInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetBuyerInvoiceInfoResponse>} Promise resolving to the response
   */
  public async getBuyerInvoiceInfo(
    params: GetBuyerInvoiceInfoRequest,
    options?: RequestOptions
  ): Promise<GetBuyerInvoiceInfoResponse> {
    return ShopeeFetch.fetch<GetBuyerInvoiceInfoResponse>(
      this.config,
      "/order/get_buyer_invoice_info",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Returns the estimated refund value for a partial order cancellation given the specified items to cancel.
   *
   * @param {GetEstimateCancelValueRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetEstimateCancelValueResponse>} Promise resolving to the response
   */
  public async getEstimateCancelValue(
    params: GetEstimateCancelValueRequest,
    options?: RequestOptions
  ): Promise<GetEstimateCancelValueResponse> {
    return ShopeeFetch.fetch<GetEstimateCancelValueResponse>(
      this.config,
      "/order/get_estimate_cancel_value",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * This API allows you to consult the status of a previously requested batch download for FBS tax documents.
   *
   * @param {GetFbsInvoicesResultRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetFbsInvoicesResultResponse>} Promise resolving to the response
   */
  public async getFbsInvoicesResult(
    params: GetFbsInvoicesResultRequest,
    options?: RequestOptions
  ): Promise<GetFbsInvoicesResultResponse> {
    return ShopeeFetch.fetch<GetFbsInvoicesResultResponse>(
      this.config,
      "/order/get_fbs_invoices_result",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to get order detail.
   *
   * @param {GetOrderDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetOrderDetailResponse>} Promise resolving to the response
   */
  public async getOrderDetail(
    params: GetOrderDetailRequest,
    options?: RequestOptions
  ): Promise<GetOrderDetailResponse> {
    return ShopeeFetch.fetch<GetOrderDetailResponse>(this.config, "/order/get_order_detail", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.order_list.create_time",
        "response.order_list.update_time",
        "response.order_list.ship_by_date",
        "response.order_list.note_update_time",
        "response.order_list.pay_time",
        "response.order_list.pickup_done_time",
        "response.order_list.invoice_data.issue_date",
        "response.order_list.prescription_approval_time",
        "response.order_list.prescription_rejection_time",
        "response.order_list.edt_from",
        "response.order_list.edt_to",
        "response.order_list.return_request_due_date",
      ],
    });
  }
  /**
   * Use this api to search orders. You may also filter them by status, if needed.
   *
   * @param {GetOrderListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetOrderListResponse>} Promise resolving to the response
   */
  public async getOrderList(
    params: GetOrderListRequest,
    options?: RequestOptions
  ): Promise<GetOrderListResponse> {
    return ShopeeFetch.fetch<GetOrderListResponse>(this.config, "/order/get_order_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Use this api to get package detail.
   *
   * @param {GetPackageDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetPackageDetailResponse>} Promise resolving to the response
   */
  public async getPackageDetail(
    params: GetPackageDetailRequest,
    options?: RequestOptions
  ): Promise<GetPackageDetailResponse> {
    return ShopeeFetch.fetch<GetPackageDetailResponse>(this.config, "/order/get_package_detail", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: [
        "response.package_list.status_info_tag.timestamp",
        "response.package_list.prescription_approval_time",
        "response.package_list.prescription_rejection_time",
        "response.package_list.preparation_end_time",
      ],
    });
  }
  /**
   * This endpoint only for PH and BR local sellers only. This API is used for seller to retrieve a list of order IDs that are pending invoice upload.
   *
   * @param {GetPendingBuyerInvoiceOrderListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetPendingBuyerInvoiceOrderListResponse>} Promise resolving to the response
   */
  public async getPendingBuyerInvoiceOrderList(
    params: GetPendingBuyerInvoiceOrderListRequest,
    options?: RequestOptions
  ): Promise<GetPendingBuyerInvoiceOrderListResponse> {
    return ShopeeFetch.fetch<GetPendingBuyerInvoiceOrderListResponse>(
      this.config,
      "/order/get_pending_buyer_invoice_order_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to get order list which order_status is READY_TO_SHIP or RETRY_SHIP to start process the whole shipping progress.
   *
   * @param {GetShipmentListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetShipmentListResponse>} Promise resolving to the response
   */
  public async getShipmentList(
    params: GetShipmentListRequest,
    options?: RequestOptions
  ): Promise<GetShipmentListResponse> {
    return ShopeeFetch.fetch<GetShipmentListResponse>(this.config, "/order/get_shipment_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * For multi-warehouse shops, return all warehouses with packages that have not been SHIPPED including product_location_id and address_id. Compared to v2.shop.get_warehouse_detail, it covers some edge cases like warehouse that have been unlinked but still retain packages that have not been SHIPPED, and does not cover some cases like single warehouse with default product_location_id and FBS shop.
   *
   * @param {GetWarehouseFilterConfigRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetWarehouseFilterConfigResponse>} Promise resolving to the response
   */
  public async getWarehouseFilterConfig(
    params?: GetWarehouseFilterConfigRequest,
    options?: RequestOptions
  ): Promise<GetWarehouseFilterConfigResponse> {
    return ShopeeFetch.fetch<GetWarehouseFilterConfigResponse>(
      this.config,
      "/order/get_warehouse_filter_config",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to handle buyer's cancellation application.
   *
   * @param {HandleBuyerCancellationRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<HandleBuyerCancellationResponse>} Promise resolving to the response
   */
  public async handleBuyerCancellation(
    params: HandleBuyerCancellationRequest,
    options?: RequestOptions
  ): Promise<HandleBuyerCancellationResponse> {
    return ShopeeFetch.fetch<HandleBuyerCancellationResponse>(
      this.config,
      "/order/handle_buyer_cancellation",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
        timestampPaths: ["response.update_time"],
      }
    );
  }
  /**
   * Use this API to approve or reject a prescription
   *
   * @param {HandlePrescriptionCheckRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<HandlePrescriptionCheckResponse>} Promise resolving to the response
   */
  public async handlePrescriptionCheck(
    params: HandlePrescriptionCheckRequest,
    options?: RequestOptions
  ): Promise<HandlePrescriptionCheckResponse> {
    return ShopeeFetch.fetch<HandlePrescriptionCheckResponse>(
      this.config,
      "/order/handle_prescription_check",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to search the list of packages that have not been SHIPPED to proceed arranging shipment, and it supports various filters and sort fields.
   *
   * @param {SearchPackageListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SearchPackageListResponse>} Promise resolving to the response
   */
  public async searchPackageList(
    params: SearchPackageListRequest,
    options?: RequestOptions
  ): Promise<SearchPackageListResponse> {
    return ShopeeFetch.fetch<SearchPackageListResponse>(this.config, "/order/search_package_list", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this api to set note for an order.
   *
   * @param {SetNoteRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SetNoteResponse>} Promise resolving to the response
   */
  public async setNote(params: SetNoteRequest, options?: RequestOptions): Promise<SetNoteResponse> {
    return ShopeeFetch.fetch<SetNoteResponse>(this.config, "/order/set_note", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this api to split an order into multiple packages. Orders that include installation services cannot be split by quantity.
   *
   * @param {SplitOrderRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SplitOrderResponse>} Promise resolving to the response
   */
  public async splitOrder(
    params: SplitOrderRequest,
    options?: RequestOptions
  ): Promise<SplitOrderResponse> {
    return ShopeeFetch.fetch<SplitOrderResponse>(this.config, "/order/split_order", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this ai to undo split of order. After undo split, the order will have only one package. It can only be used when order status still at READY_TO_SHIP.
   *
   * @param {UnsplitOrderRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UnsplitOrderResponse>} Promise resolving to the response
   */
  public async unsplitOrder(
    params: UnsplitOrderRequest,
    options?: RequestOptions
  ): Promise<UnsplitOrderResponse> {
    return ShopeeFetch.fetch<UnsplitOrderResponse>(this.config, "/order/unsplit_order", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * This endpoint is for PH and BR local seller. Upload the invoice document
   *
   * @param {UploadInvoiceDocRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadInvoiceDocResponse>} Promise resolving to the response
   */
  public async uploadInvoiceDoc(
    params: UploadInvoiceDocRequest,
    options?: RequestOptions
  ): Promise<UploadInvoiceDocResponse> {
    return ShopeeFetch.fetch<UploadInvoiceDocResponse>(this.config, "/order/upload_invoice_doc", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
}
