import {
  QueryBrShopBlockStatusRequest,
  QueryBrShopBlockStatusResponse,
  QueryBrShopEnrollmentStatusRequest,
  QueryBrShopEnrollmentStatusResponse,
  QueryBrShopInvoiceErrorRequest,
  QueryBrShopInvoiceErrorResponse,
  QueryBrSkuBlockStatusRequest,
  QueryBrSkuBlockStatusResponse,
} from "../schemas/fbs.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class FbsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * This API checks whether an FBS shop is blocked due to invoice-related issues. When blocked, the shop cannot create new Inbound Requests, and its warehouse inventory is restricted from being sold.
   *
   * @param {QueryBrShopBlockStatusRequest} params Request parameters
   * @returns {Promise<QueryBrShopBlockStatusResponse>} Promise resolving to the response
   */
  public async queryBrShopBlockStatus(
    params?: QueryBrShopBlockStatusRequest
  ): Promise<QueryBrShopBlockStatusResponse> {
    return ShopeeFetch.fetch<QueryBrShopBlockStatusResponse>(
      this.config,
      "/fbs/query_br_shop_block_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API checks whether a given shop_id is eligible to enroll in the Brazil Fulfilled-by-Shopee (FBS) service.
   *
   * @param {QueryBrShopEnrollmentStatusRequest} params Request parameters
   * @returns {Promise<QueryBrShopEnrollmentStatusResponse>} Promise resolving to the response
   */
  public async queryBrShopEnrollmentStatus(
    params?: QueryBrShopEnrollmentStatusRequest
  ): Promise<QueryBrShopEnrollmentStatusResponse> {
    return ShopeeFetch.fetch<QueryBrShopEnrollmentStatusResponse>(
      this.config,
      "/fbs/query_br_shop_enrollment_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API handles failed invoice issuance for FBS-related processes, covering Inbound Requests, RTS Requests, Sales Orders, and Move Transfer Orders.
   *
   * @param {QueryBrShopInvoiceErrorRequest} params Request parameters
   * @returns {Promise<QueryBrShopInvoiceErrorResponse>} Promise resolving to the response
   */
  public async queryBrShopInvoiceError(
    params?: QueryBrShopInvoiceErrorRequest
  ): Promise<QueryBrShopInvoiceErrorResponse> {
    return ShopeeFetch.fetch<QueryBrShopInvoiceErrorResponse>(
      this.config,
      "/fbs/query_br_shop_invoice_error",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API checks whether an FBS product is blocked due to invoice-related issues. When blocked, the product cannot be included in new Inbound Requests, and its warehouse inventory is restricted from being sold.
   *
   * @param {QueryBrSkuBlockStatusRequest} params Request parameters
   * @returns {Promise<QueryBrSkuBlockStatusResponse>} Promise resolving to the response
   */
  public async queryBrSkuBlockStatus(
    params?: QueryBrSkuBlockStatusRequest
  ): Promise<QueryBrSkuBlockStatusResponse> {
    return ShopeeFetch.fetch<QueryBrSkuBlockStatusResponse>(
      this.config,
      "/fbs/query_br_sku_block_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
}
