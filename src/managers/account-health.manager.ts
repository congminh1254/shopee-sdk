import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import {
  GetShopPenaltyResponse,
  GetShopPerformanceResponse,
  GetMetricSourceDetailParams,
  GetMetricSourceDetailResponse,
  GetPenaltyPointHistoryParams,
  GetPenaltyPointHistoryResponse,
  GetPunishmentHistoryParams,
  GetPunishmentHistoryResponse,
  GetListingsWithIssuesParams,
  GetListingsWithIssuesResponse,
  GetLateOrdersParams,
  GetLateOrdersResponse,
} from "../schemas/account-health.js";

export class AccountHealthManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get the information of shop penalty
   * @returns {Promise<GetShopPenaltyResponse>} Response containing penalty points and ongoing punishments
   *
   * This API returns the seller's shop penalty information, including:
   *
   * - Penalty points that remain on record till the end of a quarter (reset on the first Monday of each quarter)
   *   - Overall penalty points total
   *   - Points from non-fulfillment rate issues
   *   - Points from late shipment issues
   *   - Points from listing violations
   *   - Points from OPFR (Order Pick-up Failure Rate) violations
   *   - Points from other violations
   *
   * - List of ongoing punishments with details about:
   *   - Punishment tier (1-5)
   *   - Days left in the punishment period
   *   - Name of the punishment (e.g., "deboost")
   *
   * Use this API to monitor your shop's health status and take proactive measures
   * to address any issues that could affect your shop's performance.
   */
  async getShopPenalty(): Promise<GetShopPenaltyResponse> {
    const response = await ShopeeFetch.fetch<GetShopPenaltyResponse>(
      this.config,
      "/account_health/shop_penalty",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Get data metrics of shop performance
   * @returns {Promise<GetShopPerformanceResponse>} Response containing shop performance metrics
   *
   * This API returns comprehensive data metrics about a shop's performance across three
   * key dimensions:
   *
   * 1. Fulfillment Performance - Metrics related to order processing and logistics:
   *    - Late Shipment Rate
   *    - Non-Fulfillment Rate
   *    - Preparation Time
   *    - Fast Handover Rate
   *    - Cancellation Rate
   *    - Return-refund Rate
   *    - On-time Pickup Failure Rate
   *
   * 2. Listing Performance - Metrics related to product listings quality:
   *    - Severe Listing Violations (Prohibited, Counterfeit/IP infringement, Spam)
   *    - Pre-order Listing percentage and days in violation
   *    - Other Listing Violations
   *
   * 3. Customer Service Performance - Metrics related to customer interactions:
   *    - Chat Response Rate
   *    - Response Time
   *    - Shop Rating
   *    - Non-Responded Chats
   *
   * The response includes both overall performance ratings and detailed metrics with:
   * - Current and previous period performance values
   * - Target values with comparators (e.g., "<", ">=") to meet performance standards
   * - Units of measurement (percentage, number, days, etc.)
   * - Parent-child relationship between metrics
   *
   * Use this API to gain insights into shop performance and identify areas
   * for improvement to maintain good shop health.
   */
  async getShopPerformance(): Promise<GetShopPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetShopPerformanceResponse>(
      this.config,
      "/account_health/get_shop_performance",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Get the Affected Orders / Relevant Listings / Relevant Violations details of metrics
   * @param {GetMetricSourceDetailParams} params Request parameters
   * @param {number} params.metric_id ID of metric to get details for
   * @param {number} [params.page_no] Page number, starting from 1 (default: 1)
   * @param {number} [params.page_size] Number of items per page, 1-100 (default: 10)
   * @returns {Promise<GetMetricSourceDetailResponse>} Response containing detailed information about the metric
   *
   * This API returns detailed information about specific metrics, including affected orders,
   * relevant listings, or violation details. The response structure varies based on the
   * metric_id provided:
   *
   * - Non-Fulfillment Rate metrics (3, 88): Returns `nfr_order_list` with affected orders
   * - Cancellation Rate metrics (42, 91): Returns `cancellation_order_list` with affected orders
   * - Return-refund Rate metrics (43, 92): Returns `return_refund_order_list` with affected orders
   * - Late Shipment Rate metrics (1, 85): Returns `lsr_order_list` with late shipment details
   * - Fast Handover Rate metrics (25, 2001-2003): Returns `fhr_order_list` with handover details
   * - On-time Pickup Failure Rate (28): Returns `opfr_day_detail_data_list` with daily violation data
   * - Listing Violations (52, 53): Returns `violation_listing_list` with problematic listings
   * - Pre-order Listing Violation (15): Returns `pre_order_listing_violation_data_list` with daily data
   * - Pre-order Listing % (12): Returns `pre_order_listing_list` with pre-order listings
   * - NDD Listings % (97): Returns `ndd_listing_list` with NDD-enabled listings
   *
   * The response is paginated - use page_no and page_size to navigate through the results.
   * The total_count field indicates the total number of items available across all pages.
   *
   * Use this API to identify specific orders or listings that are affecting your shop's
   * performance metrics and take corrective actions.
   */
  async getMetricSourceDetail(
    params: GetMetricSourceDetailParams
  ): Promise<GetMetricSourceDetailResponse> {
    const response = await ShopeeFetch.fetch<GetMetricSourceDetailResponse>(
      this.config,
      "/account_health/get_metric_source_detail",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get the penalty point records generated in the current quarter
   * @param {GetPenaltyPointHistoryParams} [params] Optional request parameters
   * @param {number} [params.page_no] Page number, starting from 1 (default: 1)
   * @param {number} [params.page_size] Number of items per page, 1-100 (default: 10)
   * @param {number} [params.violation_type] Filter by specific violation type (see ViolationType enum)
   * @returns {Promise<GetPenaltyPointHistoryResponse>} Response containing penalty point records
   *
   * This API returns detailed records of penalty points that have been issued to the shop
   * during the current quarter. Each record includes:
   *
   * - The time when the penalty points were issued
   * - The number of points (both original and current after any adjustments via appeals)
   * - A unique reference ID for the penalty
   * - The type of violation that triggered the penalty
   *
   * Use this API to track and analyze penalty points history, which can help in:
   * - Understanding what types of violations are impacting your shop health
   * - Monitoring the effects of appeals on penalty points
   * - Tracking progress over time in reducing violations
   *
   * The response is paginated - use page_no and page_size to navigate through the results.
   * You can also filter by violation_type to focus on specific types of issues.
   *
   * Note: Penalty points reset at the beginning of each quarter (on the first Monday).
   */
  async getPenaltyPointHistory(
    params?: GetPenaltyPointHistoryParams
  ): Promise<GetPenaltyPointHistoryResponse> {
    const response = await ShopeeFetch.fetch<GetPenaltyPointHistoryResponse>(
      this.config,
      "/account_health/get_penalty_point_history",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get the punishment records generated in the current quarter
   * @param {GetPunishmentHistoryParams} params Request parameters
   * @param {number} params.punishment_status Status of punishments to retrieve (1=Ongoing, 2=Ended)
   * @param {number} [params.page_no] Page number, starting from 1 (default: 1)
   * @param {number} [params.page_size] Number of items per page, 1-100 (default: 10)
   * @returns {Promise<GetPunishmentHistoryResponse>} Response containing punishment records
   *
   * This API returns detailed records of punishments that have been applied to the shop
   * during the current quarter. Each punishment record includes:
   *
   * - The time when the punishment was issued
   * - Start and end times of the punishment period
   * - Type of punishment (e.g., listing restrictions, marketing restrictions)
   * - Reason for the punishment (typically indicates the tier level)
   * - A unique reference ID for the punishment
   * - For listing limit punishments: the specific listing limit value
   * - For order limit punishments: the percentage applied to order limits
   *
   * You can retrieve either ongoing punishments (punishment_status=1) or
   * ended punishments (punishment_status=2).
   *
   * Common punishment types include:
   * - Listings not displayed in search or category browsing
   * - Unable to create or edit listings
   * - Unable to join marketing campaigns
   * - No shipping subsidies
   * - Account suspension
   * - Listing limit reductions
   * - Order limits
   *
   * The response is paginated - use page_no and page_size to navigate through the results.
   *
   * Use this API to understand current restrictions on your shop and when they will expire.
   */
  async getPunishmentHistory(
    params: GetPunishmentHistoryParams
  ): Promise<GetPunishmentHistoryResponse> {
    const response = await ShopeeFetch.fetch<GetPunishmentHistoryResponse>(
      this.config,
      "/account_health/get_punishment_history",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get the listings that have issues and need improvement
   * @param {GetListingsWithIssuesParams} [params] Optional request parameters
   * @param {number} [params.page_no] Page number, starting from 1 (default: 1)
   * @param {number} [params.page_size] Number of items per page, 1-100 (default: 10)
   * @returns {Promise<GetListingsWithIssuesResponse>} Response containing listings with issues
   *
   * This API returns details of problematic listings that need improvement. Each listing record includes:
   *
   * - The item ID of the problematic listing
   * - The reason for the issue, with possible values including:
   *   - Prohibited (1): Listing violates Shopee's prohibited items policy
   *   - Counterfeit (2): Listing is flagged as potentially counterfeit
   *   - Spam (3): Listing is identified as spam content
   *   - Inappropriate Image (4): Listing contains inappropriate images
   *   - Insufficient Info (5): Listing lacks required information
   *   - Mall Listing Improvement (6): Mall listing requiring improvement
   *   - Other Listing Improvement (7): Other issues requiring attention
   *
   * The response is paginated - use page_no and page_size to navigate through the results.
   * The total_count field indicates the total number of listings with issues across all pages.
   *
   * Use this API to identify listings that need improvement to maintain good shop health
   * and avoid potential penalties or restrictions on your shop.
   */
  async getListingsWithIssues(
    params?: GetListingsWithIssuesParams
  ): Promise<GetListingsWithIssuesResponse> {
    const response = await ShopeeFetch.fetch<GetListingsWithIssuesResponse>(
      this.config,
      "/account_health/get_listings_with_issues",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Get the late orders to take action to avoid order cancellation and penalty points
   * @param {GetLateOrdersParams} [params] Optional request parameters
   * @param {number} [params.page_no] Page number, starting from 1 (default: 1)
   * @param {number} [params.page_size] Number of items per page, 1-100 (default: 10)
   * @returns {Promise<GetLateOrdersResponse>} Response containing late orders information
   *
   * This API returns a list of orders that are late for shipping and require immediate
   * attention to avoid potential cancellations and resulting penalty points.
   * Each late order record includes:
   *
   * - The order SN (order number)
   * - The shipping deadline timestamp
   * - The number of days the order is late by
   *
   * The response is paginated - use page_no and page_size to navigate through the results.
   * The total_count field indicates the total number of late orders across all pages.
   *
   * Use this API to prioritize shipping for late orders and take action to minimize
   * late shipment rates, which can affect your shop's performance metrics and potentially
   * result in penalties or restrictions on your shop.
   */
  async getLateOrders(params?: GetLateOrdersParams): Promise<GetLateOrdersResponse> {
    const response = await ShopeeFetch.fetch<GetLateOrdersResponse>(
      this.config,
      "/account_health/get_late_orders",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }
}
