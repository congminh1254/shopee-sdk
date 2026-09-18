// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_marketing_hot_listing
 *
 * Provide all metrics currently available on the Business Insights Buybox dashboard, including metrics not explicitly requested by Local (for example, CTR), covering both:Shop-level performanceProduct-level performance
 */
export interface GetMarketingHotListingRequest {
  /**
   * Start of the requested time range as a Unix timestamp in seconds.
   */
  start_time: number;
  /**
   * End of the requested time range as a Unix timestamp in seconds. It must be greater than or equal to start_time.
   */
  end_time: number;
  /**
   * Time period of the requested data. Supported values are listed below.
   */
  period: string;
  /**
   * Product ID list, comma-separated, e.g., 111,222,333
   */
  product_id_list?: string[];
}
/**
 * Response data payload for get_marketing_hot_listing
 */
export interface GetMarketingHotListingResponseData {
  /**
   * Business status code. 0 indicates success.
   */
  code?: number;
  /**
   * Business status message. The value is ok on success.
   */
  msg?: string;
  /**
   * Metrics for every order type supported by the shop country. Non-COD shops return placed and paid; COD shops additionally return confirmed.
   */
  result?: any[];
  /**
   * Order type represented by this entry. Possible values are placed, confirmed, and paid.
   */
  result_order_type?: string;
  /**
   * Shop-level summary metrics and time-series data for the order type.
   */
  result_key_metrics?: any;
  /**
   * Shop-level summary metrics for the requested period.
   */
  result_key_metrics_key_metrics?: any;
  /**
   * Shop-level metrics grouped by time bucket.
   */
  result_key_metrics_time_series?: any[];
  /**
   * Product-level performance sorted by sales in descending order.
   */
  result_performance?: any[];
  /**
   * Sales amount for the order type.
   */
  result_key_metrics_key_metrics_sales?: number;
  /**
   * Number of buyers.
   */
  result_key_metrics_key_metrics_buyers?: number;
  /**
   * Number of orders.
   */
  result_key_metrics_key_metrics_orders?: number;
  /**
   * Number of units sold.
   */
  result_key_metrics_key_metrics_units?: number;
  /**
   * Conversion rate.
   */
  result_key_metrics_key_metrics_conversion_rate?: number;
  /**
   * Number of product impressions.
   */
  result_key_metrics_key_metrics_product_impression?: number;
  /**
   * Number of product clicks.
   */
  result_key_metrics_key_metrics_product_clicks?: number;
  /**
   * Product click-through rate.
   */
  result_key_metrics_key_metrics_click_through_rate?: number;
  /**
   * Sales change compared with the previous period.
   */
  result_key_metrics_key_metrics_sales_pct_diff?: number;
  /**
   * Buyer-count change compared with the previous period.
   */
  result_key_metrics_key_metrics_buyers_pct_diff?: number;
  /**
   * Order-count change compared with the previous period.
   */
  result_key_metrics_key_metrics_orders_pct_diff?: number;
  /**
   * Units-sold change compared with the previous period.
   */
  result_key_metrics_key_metrics_units_pct_diff?: number;
  /**
   * Conversion-rate change compared with the previous period.
   */
  result_key_metrics_key_metrics_conversion_rate_pct_diff?: number;
  /**
   * Product-impression change compared with the previous period.
   */
  result_key_metrics_key_metrics_product_impression_pct_diff?: number;
  /**
   * Product-click change compared with the previous period.
   */
  result_key_metrics_key_metrics_product_clicks_pct_diff?: number;
  /**
   * Click-through-rate change compared with the previous period.
   */
  result_key_metrics_key_metrics_click_through_rate_pct_diff?: number;
  /**
   * Unix timestamp in seconds representing the time bucket.
   */
  result_key_metrics_time_series_t?: number;
  /**
   * Sales amount in the time bucket.
   */
  result_key_metrics_time_series_sales?: number;
  /**
   * Number of buyers in the time bucket.
   */
  result_key_metrics_time_series_buyers?: number;
  /**
   * Number of orders in the time bucket.
   */
  result_key_metrics_time_series_orders?: number;
  /**
   * Number of units sold in the time bucket.
   */
  result_key_metrics_time_series_units?: number;
  /**
   * Conversion rate in the time bucket.
   */
  result_key_metrics_time_series_conversion_rate?: number;
  /**
   * Number of product impressions in the time bucket.
   */
  result_key_metrics_time_series_product_impression?: number;
  /**
   * Number of product clicks in the time bucket.
   */
  result_key_metrics_time_series_product_clicks?: number;
  /**
   * Product click-through rate in the time bucket.
   */
  result_key_metrics_time_series_click_through_rate?: number;
  /**
   * Product ID.
   */
  result_performance_item_id?: number;
  /**
   * Product name.
   */
  result_performance_item_name?: string;
  /**
   * Product image identifier or URL.
   */
  result_performance_image?: string;
  /**
   * Product variation or model name.
   */
  result_performance_variation_name?: string;
  /**
   * Product status code.
   */
  result_performance_status?: number;
  /**
   * Sales amount for the order type.
   */
  result_performance_sales?: number;
  /**
   * Number of buyers.
   */
  result_performance_buyers?: number;
  /**
   * Number of orders.
   */
  result_performance_orders?: number;
  /**
   * Number of units sold.
   */
  result_performance_units?: number;
  /**
   * Conversion rate.
   */
  result_performance_conversion_rate?: number;
  /**
   * Number of product impressions.
   */
  result_performance_product_impression?: number;
  /**
   * Number of product clicks.
   */
  result_performance_product_clicks?: number;
  /**
   * Product click-through rate.
   */
  result_performance_click_through_rate?: number;
}
/**
 * Response payload for get_marketing_hot_listing
 *
 * Provide all metrics currently available on the Business Insights Buybox dashboard, including metrics not explicitly requested by Local (for example, CTR), covering both:Shop-level performanceProduct-level performance
 */
export type GetMarketingHotListingResponse = FetchResponse<GetMarketingHotListingResponseData>;
