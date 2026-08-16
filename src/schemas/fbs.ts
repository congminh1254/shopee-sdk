import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for query_br_shop_block_status
 *
 * This API checks whether an FBS shop is blocked due to invoice-related issues. When blocked, the shop cannot create new Inbound Requests, and its warehouse inventory is restricted from being sold.
 */
export type QueryBrShopBlockStatusRequest = Record<string, never>;
/**
 * QueryBrShopBlockStatus_Response sub-interface for QueryBrShopBlockStatusResponse
 */
export interface QueryBrShopBlockStatus_Response {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * shop blocked status
   */
  is_block?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for query_br_shop_block_status
 */
export type QueryBrShopBlockStatusResponseData = QueryBrShopBlockStatus_Response;
/**
 * Response payload for query_br_shop_block_status
 *
 * This API checks whether an FBS shop is blocked due to invoice-related issues. When blocked, the shop cannot create new Inbound Requests, and its warehouse inventory is restricted from being sold.
 */
export type QueryBrShopBlockStatusResponse = FetchResponse<QueryBrShopBlockStatusResponseData>;
/**
 * Request parameters for query_br_shop_enrollment_status
 *
 * This API checks whether a given shop_id is eligible to enroll in the Brazil Fulfilled-by-Shopee (FBS) service.
 */
export type QueryBrShopEnrollmentStatusRequest = Record<string, never>;
/**
 * QueryBrShopEnrollmentStatus_Response sub-interface for QueryBrShopEnrollmentStatusResponse
 */
export interface QueryBrShopEnrollmentStatus_Response {
  /**
   * Shopee's unique identifier for a shop
   */
  shop_id?: number;
  /**
   * 1: enable enrollment2: disable enrollment3: already enrollment
   */
  enrollment_status?: number;
  /**
   * The time of this shop able to enroll FBS.
   */
  enable_enrollment_time?: number;
  [key: string]: any;
}
/**
 * Response data payload for query_br_shop_enrollment_status
 */
export type QueryBrShopEnrollmentStatusResponseData = QueryBrShopEnrollmentStatus_Response;
/**
 * Response payload for query_br_shop_enrollment_status
 *
 * This API checks whether a given shop_id is eligible to enroll in the Brazil Fulfilled-by-Shopee (FBS) service.
 */
export type QueryBrShopEnrollmentStatusResponse =
  FetchResponse<QueryBrShopEnrollmentStatusResponseData>;
/**
 * Request parameters for query_br_shop_invoice_error
 *
 * This API handles failed invoice issuance for FBS-related processes, covering Inbound Requests, RTS Requests, Sales Orders, and Move Transfer Orders.
 */
export interface QueryBrShopInvoiceErrorRequest {
  page_no?: number;
  /**
   * max: 100
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * QueryBrShopInvoiceError_ShopSku sub-interface for QueryBrShopInvoiceError_List
 */
export interface QueryBrShopInvoiceError_ShopSku {
  /**
   * ID of item
   */
  shop_item_id?: number;
  /**
   * ID of model
   */
  shop_model_id?: number;
  /**
   * Name of item
   */
  shop_item_name?: string;
  /**
   * Name of model
   */
  shop_model_name?: string;
  /**
   * Invoice issuance failed reason.
   */
  fail_reason?: string;
  [key: string]: any;
}
/**
 * QueryBrShopInvoiceError_List sub-interface for QueryBrShopInvoiceError_Response
 */
export interface QueryBrShopInvoiceError_List {
  /**
   * Shopee's unique identifier for a shop.
   */
  shop_id?: number;
  /**
   * 1: Inbound2: Return From Warehouse3: Sales order invoice4: Move Transfer5：IA
   */
  biz_request_type?: number;
  /**
   * Return by default. The business FBS request order ID.
   */
  biz_request_id?: string;
  /**
   * Invoice issuance failed reason.
   */
  fail_reason?: string;
  /**
   * 1: sku tax info error2: seller tax info error
   */
  fail_type?: number;
  /**
   * The expired time of this failed invoice. If expired, then this request order would be cancelled.
   */
  invoice_deadline_time?: number;
  shop_sku_list?: QueryBrShopInvoiceError_ShopSku[];
  /**
   * Invoice ID
   */
  invoice_id?: string;
  /**
   * remind seller if this block issue is not solved , it will block the shop or item
   */
  reminder_desc?: string;
  [key: string]: any;
}
/**
 * QueryBrShopInvoiceError_Response sub-interface for QueryBrShopInvoiceErrorResponse
 */
export interface QueryBrShopInvoiceError_Response {
  total?: number;
  list?: QueryBrShopInvoiceError_List[];
  [key: string]: any;
}
/**
 * Response data payload for query_br_shop_invoice_error
 */
export type QueryBrShopInvoiceErrorResponseData = QueryBrShopInvoiceError_Response;
/**
 * Response payload for query_br_shop_invoice_error
 *
 * This API handles failed invoice issuance for FBS-related processes, covering Inbound Requests, RTS Requests, Sales Orders, and Move Transfer Orders.
 */
export type QueryBrShopInvoiceErrorResponse = FetchResponse<QueryBrShopInvoiceErrorResponseData>;
/**
 * Request parameters for query_br_sku_block_status
 *
 * This API checks whether an FBS product is blocked due to invoice-related issues. When blocked, the product cannot be included in new Inbound Requests, and its warehouse inventory is restricted from being sold.
 */
export interface QueryBrSkuBlockStatusRequest {
  shop_sku_id?: string;
  [key: string]: any;
}
/**
 * QueryBrSkuBlockStatus_Response sub-interface for QueryBrSkuBlockStatusResponse
 */
export interface QueryBrSkuBlockStatus_Response {
  /**
   * itemID_modelID
   */
  shop_sku_id?: string;
  /**
   * product is blocked and warehouse stock cannot be sold
   */
  is_block?: boolean;
  /**
   * ID of item
   */
  shop_item_id?: number;
  /**
   * ID of model
   */
  shop_model_id?: number;
  /**
   * Name of Item
   */
  shop_item_name?: string;
  /**
   * Name of model
   */
  shop_model_name?: string;
  [key: string]: any;
}
/**
 * Response data payload for query_br_sku_block_status
 */
export type QueryBrSkuBlockStatusResponseData = QueryBrSkuBlockStatus_Response;
/**
 * Response payload for query_br_sku_block_status
 *
 * This API checks whether an FBS product is blocked due to invoice-related issues. When blocked, the product cannot be included in new Inbound Requests, and its warehouse inventory is restricted from being sold.
 */
export type QueryBrSkuBlockStatusResponse = FetchResponse<QueryBrSkuBlockStatusResponseData>;
