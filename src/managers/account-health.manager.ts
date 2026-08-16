import {
  GetLateOrdersRequest,
  GetLateOrdersResponse,
  GetListingsWithIssuesRequest,
  GetListingsWithIssuesResponse,
  GetMetricSourceDetailRequest,
  GetMetricSourceDetailResponse,
  GetPenaltyPointHistoryRequest,
  GetPenaltyPointHistoryResponse,
  GetPunishmentHistoryRequest,
  GetPunishmentHistoryResponse,
  GetShopPerformanceRequest,
  GetShopPerformanceResponse,
} from "../schemas/account-health.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class AccountHealthManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Get the Late Orders to take action to avoid order cancellation and penalty points.
   *
   * @param {GetLateOrdersRequest} params Request parameters
   * @returns {Promise<GetLateOrdersResponse>} Promise resolving to the response
   */
  public async getLateOrders(params?: GetLateOrdersRequest): Promise<GetLateOrdersResponse> {
    return ShopeeFetch.fetch<GetLateOrdersResponse>(
      this.config,
      "/account_health/get_late_orders",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.late_order_list.shipping_deadline"],
      }
    );
  }
  /**
   * Get the Problematic Listings to improve the listings to avoid incurring penalty points.
   *
   * @param {GetListingsWithIssuesRequest} params Request parameters
   * @returns {Promise<GetListingsWithIssuesResponse>} Promise resolving to the response
   */
  public async getListingsWithIssues(
    params?: GetListingsWithIssuesRequest
  ): Promise<GetListingsWithIssuesResponse> {
    return ShopeeFetch.fetch<GetListingsWithIssuesResponse>(
      this.config,
      "/account_health/get_listings_with_issues",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the Affected Orders / Relevant Listings / Relevant Violations details of metrics.
   *
   * @param {GetMetricSourceDetailRequest} params Request parameters
   * @returns {Promise<GetMetricSourceDetailResponse>} Promise resolving to the response
   */
  public async getMetricSourceDetail(
    params?: GetMetricSourceDetailRequest
  ): Promise<GetMetricSourceDetailResponse> {
    return ShopeeFetch.fetch<GetMetricSourceDetailResponse>(
      this.config,
      "/account_health/get_metric_source_detail",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.lsr_order_list.shipping_deadline",
          "response.lsr_order_list.actual_shipping_time",
          "response.lsr_order_list.actual_pick_up_time",
          "response.fhr_order_list.confirm_time",
          "response.fhr_order_list.handover_deadline",
          "response.fhr_order_list.fast_handover_due_date",
          "response.fhr_order_list.arrange_pick_up_time",
          "response.fhr_order_list.handover_time",
          "response.violation_listing_list.update_time",
          "response.apt_order_list.order_create_time",
          "response.apt_order_list.arrange_pick_up_time",
          "response.apt_order_list.actual_pick_up_time",
          "response.saturday_shipment_list.order_create_time",
          "response.saturday_shipment_list.arrange_pick_up_time",
          "response.saturday_shipment_list.actual_pick_up_time",
          "response.otdr_order_list.paid_time",
          "response.otdr_order_list.estimated_delivery_date",
          "response.otdr_order_list.actual_pick_up_time",
          "response.otdr_order_list.real_delivery_time",
        ],
      }
    );
  }
  /**
   * Get the penalty point records generated in the current quarter.
   *
   * @param {GetPenaltyPointHistoryRequest} params Request parameters
   * @returns {Promise<GetPenaltyPointHistoryResponse>} Promise resolving to the response
   */
  public async getPenaltyPointHistory(
    params?: GetPenaltyPointHistoryRequest
  ): Promise<GetPenaltyPointHistoryResponse> {
    return ShopeeFetch.fetch<GetPenaltyPointHistoryResponse>(
      this.config,
      "/account_health/get_penalty_point_history",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.penalty_point_list.issue_time"],
      }
    );
  }
  /**
   * Get the punishment records generated in the current quarter.
   *
   * @param {GetPunishmentHistoryRequest} params Request parameters
   * @returns {Promise<GetPunishmentHistoryResponse>} Promise resolving to the response
   */
  public async getPunishmentHistory(
    params?: GetPunishmentHistoryRequest
  ): Promise<GetPunishmentHistoryResponse> {
    return ShopeeFetch.fetch<GetPunishmentHistoryResponse>(
      this.config,
      "/account_health/get_punishment_history",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.punishment_list.issue_time",
          "response.punishment_list.start_time",
          "response.punishment_list.end_time",
        ],
      }
    );
  }
  /**
   * The data metrics of shop performance.
   *
   * @param {GetShopPerformanceRequest} params Request parameters
   * @returns {Promise<GetShopPerformanceResponse>} Promise resolving to the response
   */
  public async getShopPerformance(
    params?: GetShopPerformanceRequest
  ): Promise<GetShopPerformanceResponse> {
    return ShopeeFetch.fetch<GetShopPerformanceResponse>(
      this.config,
      "/account_health/get_shop_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
}
