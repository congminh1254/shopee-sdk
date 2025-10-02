import { BaseManager } from "./base.manager.js";
import { ShopeeConfig } from "../sdk.js";
import {
  GetOrderListParams,
  GetOrderListResponse,
  GetOrdersDetailParams,
  GetOrdersDetailResponse,
  GetShipmentListParams,
  GetShipmentListResponse,
  SplitOrderParams,
  SplitOrderResponse,
  UnsplitOrderParams,
  UnsplitOrderResponse,
  CancelOrderParams,
  CancelOrderResponse,
  GetBuyerInvoiceInfoParams,
  GetBuyerInvoiceInfoResponse,
  SetNoteParams,
  SetNoteResponse,
  GetPackageDetailParams,
  GetPackageDetailResponse,
  HandleBuyerCancellationParams,
  HandleBuyerCancellationResponse,
  SearchPackageListParams,
  SearchPackageListResponse,
  GetPendingBuyerInvoiceOrderListParams,
  GetPendingBuyerInvoiceOrderListResponse,
  HandlePrescriptionCheckParams,
  HandlePrescriptionCheckResponse,
  DownloadInvoiceDocParams,
  DownloadInvoiceDocResponse,
  UploadInvoiceDocParams,
  UploadInvoiceDocResponse,
  GetBookingDetailParams,
  GetBookingDetailResponse,
  GetBookingListParams,
  GetBookingListResponse,
  GetWarehouseFilterConfigResponse,
  DownloadFbsInvoicesParams,
  DownloadFbsInvoicesResponse,
  GenerateFbsInvoicesParams,
  GenerateFbsInvoicesResponse,
  GetFbsInvoicesResultParams,
  GetFbsInvoicesResultResponse,
} from "../schemas/order.js";
import { ShopeeFetch } from "../fetch.js";

export class OrderManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Use this api to search orders. You may also filter them by status, if needed.
   *
   * @param params - The parameters for getting order list
   * @param params.time_range_field - The kind of time_from and time_to. Available value: create_time, update_time
   * @param params.time_from - The starting date range for retrieving orders. The maximum date range is 15 days
   * @param params.time_to - The ending date range for retrieving orders. The maximum date range is 15 days
   * @param params.page_size - The maximum number of entries to return in a single page (between 1 and 100)
   * @param params.cursor - Specifies the starting entry of data to return in the current call
   * @param params.order_status - The order status filter for retrieving orders. Available value: UNPAID/READY_TO_SHIP/PROCESSED/SHIPPED/COMPLETED/IN_CANCEL/CANCELLED/INVOICE_PENDING
   * @param params.response_optional_fields - Optional fields in response. Available value: order_status
   * @param params.request_order_status_pending - Compatible parameter during migration period, send True will let API support PENDING status
   * @param params.logistics_channel_id - The identity of logistic channel. Valid only for BR
   * @returns Promise<GetOrderListResponse> - The response containing order list and pagination information
   */
  async getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse> {
    const response = await ShopeeFetch.fetch<GetOrderListResponse>(
      this.config,
      "/order/get_order_list",
      {
        method: "GET",
        params,
        auth: true,
      }
    );

    return response;
  }

  /**
   * Use this api to get order detail.
   *
   * @param params - The parameters for getting order details
   * @param params.order_sn_list - The set of order_sn. If there are multiple order_sn, you need to use English comma to connect them. limit [1,50]
   * @param params.request_order_status_pending - Compatible parameter during migration period, send True will let API support PENDING status and return pending_terms, send False or don't send will fallback to old logic
   * @param params.response_optional_fields - A response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them.
   * @returns Promise<GetOrdersDetailResponse> - The response containing detailed order information
   */
  async getOrdersDetail(params: GetOrdersDetailParams): Promise<GetOrdersDetailResponse> {
    const response = await ShopeeFetch.fetch<GetOrdersDetailResponse>(
      this.config,
      `/order/get_order_detail`,
      {
        method: "GET",
        auth: true,
        params: {
          ...params,
          order_sn_list: params.order_sn_list.join(","),
        },
      }
    );

    return response;
  }

  /**
   * Use this api to get order list which order_status is READY_TO_SHIP to start process the whole shipping progress.
   *
   * @param params - The parameters for getting shipment list
   * @param params.cursor - Specifies the starting entry of data to return in the current call
   * @param params.page_size - The maximum number of entries to return in a single page (between 1 and 100)
   * @returns Promise<GetShipmentListResponse> - The response containing shipment list and pagination information
   */
  async getShipmentList(params: GetShipmentListParams): Promise<GetShipmentListResponse> {
    const response = await ShopeeFetch.fetch<GetShipmentListResponse>(
      this.config,
      "/order/get_shipment_list",
      {
        method: "GET",
        params,
        auth: true,
      }
    );

    return response;
  }

  /**
   * Split an order into multiple packages
   * @param params - Parameters for splitting the order
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.package_list - The list of packages that you want to split
   * @returns Promise resolving to the split order response
   */
  async splitOrder(params: SplitOrderParams): Promise<SplitOrderResponse> {
    return ShopeeFetch.fetch<SplitOrderResponse>(this.config, "/order/split_order", {
      method: "POST",
      body: {
        order_sn: params.order_sn,
        package_list: params.package_list.map((pkg) => ({
          item_list: pkg.item_list.map((item) => ({
            item_id: item.item_id,
            model_id: item.model_id,
            order_item_id: item.order_item_id,
            promotion_group_id: item.promotion_group_id,
            model_quantity: item.model_quantity,
          })),
        })),
      },
      auth: true,
    });
  }

  /**
   * Use this api to unsplit an order that has been split into multiple packages.
   *
   * @param params - Parameters for unsplitting the order
   * @param params.order_sn - Shopee's unique identifier for an order
   * @returns Promise<UnsplitOrderResponse> - Response containing the unsplit order details
   * @throws {ShopeeApiError} - Throws error if:
   * - Wrong parameters are provided
   * - No permission to unsplit order
   * - Order has not been split
   * - Unsplit order failed
   * - Cannot unsplit order with invalid items
   * - Cannot unsplit order with missing items
   */
  async unsplitOrder(params: UnsplitOrderParams): Promise<UnsplitOrderResponse> {
    return ShopeeFetch.fetch<UnsplitOrderResponse>(this.config, "/order/unsplit_order", {
      method: "POST",
      body: {
        order_sn: params.order_sn,
      },
      auth: true,
    });
  }

  /**
   * Use this api to cancel an order. This action can only be performed before an order has been shipped.
   *
   * @param params - Parameters for canceling the order
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.cancel_reason - The reason seller want to cancel this order. Applicable values: OUT_OF_STOCK, UNDELIVERABLE_AREA(only apply for TW and MY)
   * @param params.item_list - Required when cancel_reason is OUT_OF_STOCK. List of items to cancel
   * @param params.item_list[].item_id - Shopee's unique identifier for an item
   * @param params.item_list[].model_id - Shopee's unique identifier for a model of an item
   * @returns Promise<CancelOrderResponse> - Response containing the update time of the canceled order
   * @throws {ShopeeApiError} - Throws error if:
   * - Wrong parameters are provided
   * - No permission to cancel order
   * - Cannot cancel warehouse order
   * - Shop and partner are not linked on seller center
   * - Order has already been shipped
   */
  async cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse> {
    return ShopeeFetch.fetch<CancelOrderResponse>(this.config, "/order/cancel_order", {
      method: "POST",
      body: {
        order_sn: params.order_sn,
        cancel_reason: params.cancel_reason,
        item_list: params.item_list,
      },
      auth: true,
    });
  }

  /**
   * Get buyer invoice information for orders
   *
   * Use this API to obtain buyer submitted invoice info for VN, TH and PH local sellers only.
   *
   * @param params - The parameters for getting buyer invoice info
   * @param params.queries - List of order queries
   * @param params.queries[].order_sn - Shopee's unique identifier for an order
   *
   * @returns A promise that resolves to the invoice info response containing:
   * - invoice_info_list: List of invoice information for each order
   *   - order_sn: Order identifier
   *   - invoice_type: Type of invoice (personal/company)
   *   - invoice_detail: Detailed invoice information
   *   - error: Error message if any
   *   - is_requested: Whether buyer requested invoice
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_param: Missing or invalid parameters
   * - error_auth: Authentication or permission errors
   * - error_server: Internal server errors
   */
  async getBuyerInvoiceInfo(
    params: GetBuyerInvoiceInfoParams
  ): Promise<GetBuyerInvoiceInfoResponse> {
    const response = await ShopeeFetch.fetch<GetBuyerInvoiceInfoResponse>(
      this.config,
      `/order/get_buyer_invoice_info`,
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Set note for an order
   *
   * Use this API to set note for an order.
   *
   * @param params - The parameters for setting note
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.note - The note seller add for reference
   *
   * @returns A promise that resolves to the set note response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async setNote(params: SetNoteParams): Promise<SetNoteResponse> {
    return ShopeeFetch.fetch<SetNoteResponse>(this.config, "/order/set_note", {
      method: "POST",
      auth: true,
      body: params,
    });
  }

  /**
   * Get package detail
   *
   * Use this API to get package detail.
   *
   * @param params - The parameters for getting package detail
   * @param params.package_number_list - The set of package_number. If there are multiple package_number, you need to use English comma to connect them. limit [1,50]
   *
   * @returns A promise that resolves to the package detail response containing:
   * - package_list: List of package details
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getPackageDetail(params: GetPackageDetailParams): Promise<GetPackageDetailResponse> {
    const response = await ShopeeFetch.fetch<GetPackageDetailResponse>(
      this.config,
      `/order/get_package_detail`,
      {
        method: "GET",
        auth: true,
        params: {
          package_number_list: params.package_number_list.join(","),
        },
      }
    );

    return response;
  }

  /**
   * Handle buyer's cancellation application
   *
   * Use this API to handle buyer's cancellation application.
   *
   * @param params - The parameters for handling buyer cancellation
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.operation - The operation you want to handle. Available value: ACCEPT, REJECT
   *
   * @returns A promise that resolves to the handle buyer cancellation response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async handleBuyerCancellation(
    params: HandleBuyerCancellationParams
  ): Promise<HandleBuyerCancellationResponse> {
    return ShopeeFetch.fetch<HandleBuyerCancellationResponse>(
      this.config,
      "/order/handle_buyer_cancellation",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }

  /**
   * Search package list
   *
   * Use this API to search the list of packages that have not been SHIPPED to proceed arranging shipment, and it supports various filters and sort fields.
   *
   * @param params - The parameters for searching package list
   * @param params.filter - Filter options
   * @param params.pagination - Pagination options
   * @param params.sort - Sort options
   *
   * @returns A promise that resolves to the search package list response containing:
   * - more: Indicates whether the package list is more than one page
   * - next_cursor: If more is true, you should pass the next_cursor in the next request as cursor
   * - package_list: The list of packages
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async searchPackageList(params: SearchPackageListParams): Promise<SearchPackageListResponse> {
    return ShopeeFetch.fetch<SearchPackageListResponse>(this.config, "/order/search_package_list", {
      method: "POST",
      auth: true,
      body: params,
    });
  }

  /**
   * Get pending buyer invoice order list
   *
   * This endpoint only for PH and BR local sellers only. This API is used for seller to retrieve a list of order IDs that are pending invoice upload.
   *
   * @param params - The parameters for getting pending buyer invoice order list
   * @param params.page_size - Maximum number of entries to return in a single page (between 1 and 100)
   * @param params.cursor - Specifies the starting entry of data to return in the current call
   *
   * @returns A promise that resolves to the pending buyer invoice order list response containing:
   * - more: Indicates whether the order list is more than one page
   * - next_cursor: If more is true, you should pass the next_cursor in the next request as cursor
   * - order_sn_list: The list of order serial numbers
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getPendingBuyerInvoiceOrderList(
    params: GetPendingBuyerInvoiceOrderListParams
  ): Promise<GetPendingBuyerInvoiceOrderListResponse> {
    const response = await ShopeeFetch.fetch<GetPendingBuyerInvoiceOrderListResponse>(
      this.config,
      `/order/get_pending_buyer_invoice_order_list`,
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Handle prescription check
   *
   * Use this API to approve or reject a prescription.
   *
   * @param params - The parameters for handling prescription check
   * @param params.package_number - Shopee's unique identifier for the package under an order
   * @param params.operation - The operation you want to handle. Available value: APPROVE, REJECT
   * @param params.reject_reason - The reason for rejection. Required when operation is REJECT
   *
   * @returns A promise that resolves to the handle prescription check response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async handlePrescriptionCheck(
    params: HandlePrescriptionCheckParams
  ): Promise<HandlePrescriptionCheckResponse> {
    return ShopeeFetch.fetch<HandlePrescriptionCheckResponse>(
      this.config,
      "/order/handle_prescription_check",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }

  /**
   * Download invoice document
   *
   * This endpoint only for PH and BR local seller. Seller can download the invoice uploaded before through this endpoint.
   *
   * @param params - The parameters for downloading invoice document
   * @param params.order_sn - Shopee's unique identifier for an order
   *
   * @returns A promise that resolves to the download invoice document response containing:
   * - url: The URL of the invoice document
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async downloadInvoiceDoc(params: DownloadInvoiceDocParams): Promise<DownloadInvoiceDocResponse> {
    const response = await ShopeeFetch.fetch<DownloadInvoiceDocResponse>(
      this.config,
      `/order/download_invoice_doc`,
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Upload invoice document
   *
   * This endpoint is for PH and BR local seller. Upload the invoice document.
   *
   * @param params - The parameters for uploading invoice document
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.invoice_file - The invoice document file
   *
   * @returns A promise that resolves to the upload invoice document response
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async uploadInvoiceDoc(params: UploadInvoiceDocParams): Promise<UploadInvoiceDocResponse> {
    return ShopeeFetch.fetch<UploadInvoiceDocResponse>(this.config, "/order/upload_invoice_doc", {
      method: "POST",
      auth: true,
      body: params,
    });
  }

  /**
   * Get booking detail
   *
   * Use this API to get booking detail.
   *
   * @param params - The parameters for getting booking detail
   * @param params.booking_sn_list - The set of booking_sn. If there are multiple booking_sn, you need to use English comma to connect them. limit [1,50]
   *
   * @returns A promise that resolves to the booking detail response containing:
   * - booking_list: List of booking details
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getBookingDetail(params: GetBookingDetailParams): Promise<GetBookingDetailResponse> {
    const response = await ShopeeFetch.fetch<GetBookingDetailResponse>(
      this.config,
      `/order/get_booking_detail`,
      {
        method: "GET",
        auth: true,
        params: {
          booking_sn_list: params.booking_sn_list.join(","),
        },
      }
    );

    return response;
  }

  /**
   * Get booking list
   *
   * Use this API to search bookings. You may also filter them by status, if needed.
   *
   * @param params - The parameters for getting booking list
   * @param params.time_range_field - The kind of time_from and time_to. Available value: create_time, update_time
   * @param params.time_from - The starting date range for retrieving bookings. The maximum date range is 15 days
   * @param params.time_to - The ending date range for retrieving bookings. The maximum date range is 15 days
   * @param params.page_size - Maximum number of entries to return in a single page (between 1 and 100)
   * @param params.cursor - Specifies the starting entry of data to return in the current call
   * @param params.booking_status - The booking_status filter for retrieving bookings. Available value: READY_TO_SHIP/PROCESSED/SHIPPED/CANCELLED/MATCHED
   *
   * @returns A promise that resolves to the booking list response containing:
   * - more: Indicates whether the booking list is more than one page
   * - next_cursor: If more is true, you should pass the next_cursor in the next request as cursor
   * - booking_list: The list of bookings
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getBookingList(params: GetBookingListParams): Promise<GetBookingListResponse> {
    const response = await ShopeeFetch.fetch<GetBookingListResponse>(
      this.config,
      `/order/get_booking_list`,
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get warehouse filter config
   *
   * For multi-warehouse shops, return all warehouses with packages that have not been SHIPPED including product_location_id and address_id.
   *
   * @returns A promise that resolves to the warehouse filter config response containing:
   * - warehouse_list: The list of warehouse filter configurations
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getWarehouseFilterConfig(): Promise<GetWarehouseFilterConfigResponse> {
    const response = await ShopeeFetch.fetch<GetWarehouseFilterConfigResponse>(
      this.config,
      `/order/get_warehouse_filter_config`,
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Download FBS invoices
   *
   * This API allows you to download FBS invoices. To use this API, the client must first call v2.order.generate_fbs_invoices to create a new shipping document task,
   * followed by calling v2.order.get_fbs_invoices_result to check the task status. The document can only be downloaded once the task status is "READY."
   *
   * @param params - The parameters for downloading FBS invoices
   * @param params.request_id_list - List of request id (task identifiers)
   *
   * @returns A promise that resolves to the download FBS invoices response containing:
   * - result_list: The list of download results
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async downloadFbsInvoices(
    params: DownloadFbsInvoicesParams
  ): Promise<DownloadFbsInvoicesResponse> {
    return ShopeeFetch.fetch<DownloadFbsInvoicesResponse>(
      this.config,
      "/order/download_fbs_invoices",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }

  /**
   * Generate FBS invoices
   *
   * This API creates a task to download a specific tax document (e.g., sales invoice, remessa invoice) for the seller's account,
   * available only after the document is issued by the system as part of the Fulfilled by Shopee (FBS) process.
   * The workflow is as follows: (1) v2.order.generate_fbs_invoices; (2) v2.order.get_fbs_invoices_result; (3) v2.order.download_fbs_invoices.
   * Please note: The download link for the document will expire 30 minutes after being generated.
   *
   * @param params - The parameters for generating FBS invoices
   * @param params.batch_download - Batch download parameters
   *
   * @returns A promise that resolves to the generate FBS invoices response containing:
   * - request_id: The request ID for the generated task
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async generateFbsInvoices(
    params: GenerateFbsInvoicesParams
  ): Promise<GenerateFbsInvoicesResponse> {
    return ShopeeFetch.fetch<GenerateFbsInvoicesResponse>(
      this.config,
      "/order/generate_fbs_invoices",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }

  /**
   * Get FBS invoices result
   *
   * This API allows you to consult the status of a previously requested batch download for FBS tax documents.
   *
   * @param params - The parameters for getting FBS invoices result
   * @param params.request_id_list - List of request id to be queried
   *
   * @returns A promise that resolves to the get FBS invoices result response containing:
   * - result_list: The list of results
   *
   * @throws {Error} When the API request fails or returns an error
   */
  async getFbsInvoicesResult(
    params: GetFbsInvoicesResultParams
  ): Promise<GetFbsInvoicesResultResponse> {
    return ShopeeFetch.fetch<GetFbsInvoicesResultResponse>(
      this.config,
      "/order/get_fbs_invoices_result",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
