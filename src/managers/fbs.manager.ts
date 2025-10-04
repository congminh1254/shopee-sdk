import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  QueryBrShopEnrollmentStatusParams,
  QueryBrShopEnrollmentStatusResponse,
  QueryBrShopBlockStatusParams,
  QueryBrShopBlockStatusResponse,
  QueryBrShopInvoiceErrorParams,
  QueryBrShopInvoiceErrorResponse,
  QueryBrSkuBlockStatusParams,
  QueryBrSkuBlockStatusResponse,
} from "../schemas/fbs.js";
import { ShopeeFetch } from "../fetch.js";

export class FbsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Check whether a given shop_id is eligible to enroll in the Brazil Fulfilled-by-Shopee (FBS) service.
   * This API is for Brazil region only.
   *
   * @param params - Parameters for querying enrollment status (empty object)
   *
   * @returns A promise that resolves to the enrollment status response containing:
   * - shop_id: Shopee's unique identifier for the shop
   * - enrollment_status: 1=enable enrollment, 2=disable enrollment, 3=already enrollment
   * - enable_enrollment_time: The time when the shop can enroll in FBS
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const status = await sdk.fbs.queryBrShopEnrollmentStatus({});
   * if (status.response.enrollment_status === 1) {
   *   console.log('Shop can enroll in FBS');
   * }
   * ```
   */
  async queryBrShopEnrollmentStatus(
    params: QueryBrShopEnrollmentStatusParams = {}
  ): Promise<QueryBrShopEnrollmentStatusResponse> {
    const response = await ShopeeFetch.fetch<QueryBrShopEnrollmentStatusResponse>(
      this.config,
      "/fbs/query_br_shop_enrollment_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Check whether an FBS shop is blocked due to invoice-related issues.
   * When blocked, the shop cannot create new Inbound Requests, and its warehouse
   * inventory is restricted from being sold. This API is for Brazil region only.
   *
   * @param params - Parameters for querying shop block status (empty object)
   *
   * @returns A promise that resolves to the block status response containing:
   * - shop_id: Shopee's unique identifier for the shop
   * - is_block: Whether the shop is blocked
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const status = await sdk.fbs.queryBrShopBlockStatus({});
   * if (status.response.is_block) {
   *   console.log('Shop is blocked due to invoice issues');
   * }
   * ```
   */
  async queryBrShopBlockStatus(
    params: QueryBrShopBlockStatusParams = {}
  ): Promise<QueryBrShopBlockStatusResponse> {
    const response = await ShopeeFetch.fetch<QueryBrShopBlockStatusResponse>(
      this.config,
      "/fbs/query_br_shop_block_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get failed invoice issuance information for FBS-related processes.
   * This covers Inbound Requests, RTS Requests, Sales Orders, and Move Transfer Orders.
   * This API is for Brazil region only.
   *
   * @param params - Parameters for querying invoice errors
   * @param params.page_no - Page number (default: 1)
   * @param params.page_size - Page size, max: 100 (default: 10)
   *
   * @returns A promise that resolves to the invoice error response containing:
   * - total: Total number of invoice errors
   * - list: List of invoice errors with details including:
   *   - biz_request_type: Type of business request (1=Inbound, 2=RTS, 3=Sales, 4=Move Transfer, 5=IA)
   *   - biz_request_id: Business request ID
   *   - fail_reason: Reason for invoice failure
   *   - fail_type: 1=SKU tax info error, 2=seller tax info error
   *   - invoice_deadline_time: Deadline to fix the issue
   *   - shop_sku_list: List of SKUs with errors
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const errors = await sdk.fbs.queryBrShopInvoiceError({
   *   page_no: 1,
   *   page_size: 20,
   * });
   *
   * errors.response.list.forEach(error => {
   *   console.log(`Request ID: ${error.biz_request_id}`);
   *   console.log(`Failed reason: ${error.fail_reason}`);
   * });
   * ```
   */
  async queryBrShopInvoiceError(
    params: QueryBrShopInvoiceErrorParams = {}
  ): Promise<QueryBrShopInvoiceErrorResponse> {
    const response = await ShopeeFetch.fetch<QueryBrShopInvoiceErrorResponse>(
      this.config,
      "/fbs/query_br_shop_invoice_error",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Check whether an FBS product is blocked due to invoice-related issues.
   * When blocked, the product cannot be included in new Inbound Requests, and its
   * warehouse inventory is restricted from being sold. This API is for Brazil region only.
   *
   * @param params - Parameters for querying SKU block status
   * @param params.shop_sku_id - Shop SKU ID in format "itemID_modelID"
   *
   * @returns A promise that resolves to the SKU block status response containing:
   * - shop_sku_id: The queried SKU ID
   * - is_block: Whether the SKU is blocked
   * - shop_item_id: Item ID
   * - shop_model_id: Model ID
   * - shop_item_name: Item name
   * - shop_model_name: Model name
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const status = await sdk.fbs.queryBrSkuBlockStatus({
   *   shop_sku_id: '123456_789012',
   * });
   *
   * if (status.response.is_block) {
   *   console.log(`SKU ${status.response.shop_item_name} is blocked`);
   * }
   * ```
   */
  async queryBrSkuBlockStatus(
    params: QueryBrSkuBlockStatusParams
  ): Promise<QueryBrSkuBlockStatusResponse> {
    const response = await ShopeeFetch.fetch<QueryBrSkuBlockStatusResponse>(
      this.config,
      "/fbs/query_br_sku_block_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }
}
