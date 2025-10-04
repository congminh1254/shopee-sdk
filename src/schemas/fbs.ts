import { BaseResponse } from "./base.js";

// ==================== Query BR Shop Enrollment Status ====================

/**
 * Parameters for querying BR shop enrollment status
 */
export type QueryBrShopEnrollmentStatusParams = Record<string, never>;

/**
 * Response for querying BR shop enrollment status
 */
export interface QueryBrShopEnrollmentStatusResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a shop */
    shop_id: number;
    /** 1: enable enrollment; 2: disable enrollment; 3: already enrollment */
    enrollment_status: number;
    /** The time of this shop able to enroll FBS */
    enable_enrollment_time: number;
  };
}

// ==================== Query BR Shop Block Status ====================

/**
 * Parameters for querying BR shop block status
 */
export type QueryBrShopBlockStatusParams = Record<string, never>;

/**
 * Response for querying BR shop block status
 */
export interface QueryBrShopBlockStatusResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for a shop */
    shop_id: number;
    /** Shop blocked status */
    is_block: boolean;
  };
}

// ==================== Query BR Shop Invoice Error ====================

/**
 * Shop SKU information in invoice error
 */
export interface ShopSkuInvoiceError {
  /** ID of item */
  shop_item_id: number;
  /** ID of model */
  shop_model_id: number;
  /** Name of item */
  shop_item_name: string;
  /** Name of model */
  shop_model_name: string;
  /** Invoice issuance failed reason */
  fail_reason: string;
}

/**
 * Invoice error information
 */
export interface InvoiceError {
  /** Shopee's unique identifier for a shop */
  shop_id: number;
  /** 1: Inbound; 2: Return From Warehouse; 3: Sales order invoice; 4: Move Transfer; 5: IA */
  biz_request_type: number;
  /** Return by default. The business FBS request order ID */
  biz_request_id: string;
  /** Invoice issuance failed reason */
  fail_reason: string;
  /** 1: sku tax info error; 2: seller tax info error */
  fail_type: number;
  /** The expired time of this failed invoice. If expired, then this request order would be cancelled */
  invoice_deadline_time: number;
  /** Shop SKU list with errors */
  shop_sku_list: ShopSkuInvoiceError[];
  /** Invoice ID */
  invoice_id: string;
  /** Remind seller if this block issue is not solved, it will block the shop or item */
  reminder_desc: string;
}

/**
 * Parameters for querying BR shop invoice error
 */
export interface QueryBrShopInvoiceErrorParams {
  /** Page number (default: 1) */
  page_no?: number;
  /** Page size, max: 100 (default: 10) */
  page_size?: number;
}

/**
 * Response for querying BR shop invoice error
 */
export interface QueryBrShopInvoiceErrorResponse extends BaseResponse {
  response: {
    /** Total number of invoice errors */
    total: number;
    /** List of invoice errors */
    list: InvoiceError[];
  };
}

// ==================== Query BR SKU Block Status ====================

/**
 * Parameters for querying BR SKU block status
 */
export interface QueryBrSkuBlockStatusParams {
  /** itemID_modelID */
  shop_sku_id: string;
}

/**
 * Response for querying BR SKU block status
 */
export interface QueryBrSkuBlockStatusResponse extends BaseResponse {
  response: {
    /** itemID_modelID */
    shop_sku_id: string;
    /** Product is blocked and warehouse stock cannot be sold */
    is_block: boolean;
    /** ID of item */
    shop_item_id: number;
    /** ID of model */
    shop_model_id: number;
    /** Name of Item */
    shop_item_name: string;
    /** Name of model */
    shop_model_name: string;
  };
}
