import { BaseManager } from "./base.manager.js";
import { ShopeeConfig } from "../sdk.js";
import { GetOrderListParams, GetOrderListResponse, GetOrdersDetailParams, GetOrdersDetailResponse, GetShipmentListParams, GetShipmentListResponse, SplitOrderParams, SplitOrderResponse, UnsplitOrderParams, UnsplitOrderResponse, CancelOrderParams, CancelOrderResponse, GetBuyerInvoiceInfoParams, GetBuyerInvoiceInfoResponse } from "../schemas/order.js";
export declare class OrderManager extends BaseManager {
    constructor(config: ShopeeConfig);
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
    getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse>;
    /**
     * Use this api to get order detail.
     *
     * @param params - The parameters for getting order details
     * @param params.order_sn_list - The set of order_sn. If there are multiple order_sn, you need to use English comma to connect them. limit [1,50]
     * @param params.request_order_status_pending - Compatible parameter during migration period, send True will let API support PENDING status and return pending_terms, send False or don't send will fallback to old logic
     * @param params.response_optional_fields - A response fields you want to get. Please select from the below response parameters. If you input an object field, all the params under it will be included automatically in the response. If there are multiple response fields you want to get, you need to use English comma to connect them.
     * @returns Promise<GetOrdersDetailResponse> - The response containing detailed order information
     */
    getOrdersDetail(params: GetOrdersDetailParams): Promise<GetOrdersDetailResponse>;
    /**
     * Use this api to get order list which order_status is READY_TO_SHIP to start process the whole shipping progress.
     *
     * @param params - The parameters for getting shipment list
     * @param params.cursor - Specifies the starting entry of data to return in the current call
     * @param params.page_size - The maximum number of entries to return in a single page (between 1 and 100)
     * @returns Promise<GetShipmentListResponse> - The response containing shipment list and pagination information
     */
    getShipmentList(params: GetShipmentListParams): Promise<GetShipmentListResponse>;
    /**
     * Split an order into multiple packages
     * @param params - Parameters for splitting the order
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_list - The list of packages that you want to split
     * @returns Promise resolving to the split order response
     */
    splitOrder(params: SplitOrderParams): Promise<SplitOrderResponse>;
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
    unsplitOrder(params: UnsplitOrderParams): Promise<UnsplitOrderResponse>;
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
    cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse>;
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
    getBuyerInvoiceInfo(params: GetBuyerInvoiceInfoParams): Promise<GetBuyerInvoiceInfoResponse>;
}
