import { jest } from "@jest/globals";
import { AccountHealthManager } from "../../managers/account-health.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetShopPenaltyResponse,
  GetShopPerformanceResponse,
  GetMetricSourceDetailResponse,
  GetPenaltyPointHistoryResponse,
  GetPunishmentHistoryResponse,
  GetListingsWithIssuesResponse,
  GetLateOrdersResponse,
  MetricType,
  MetricUnit,
  PerformanceRating,
} from "../../schemas/account-health.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("AccountHealthManager", () => {
  let accountHealthManager: AccountHealthManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    accountHealthManager = new AccountHealthManager(mockConfig);
  });

  describe("getShopPenalty", () => {
    it("should get shop penalty information successfully", async () => {
      const mockResponse: GetShopPenaltyResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_points: {
            overall_penalty_points: 10,
            non_fulfillment_rate: 2,
            late_shipment_rate: 3,
            listing_violations: 2,
            opfr_violations: 1,
            others: 2,
          },
          ongoing_punishment: [
            {
              punishment_tier: 2,
              days_left: 15,
              punishment_name: "deboost",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getShopPenalty();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/account_health/shop_penalty", {
        method: "GET",
        auth: true,
      });

      expect(result.error).toBe("");
      expect(result.response.penalty_points.overall_penalty_points).toBe(10);
      expect(result.response.ongoing_punishment).toHaveLength(1);
      expect(result.response.ongoing_punishment[0].punishment_name).toBe("deboost");
    });

    it("should handle response with no ongoing punishments", async () => {
      const mockResponse: GetShopPenaltyResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_points: {
            overall_penalty_points: 0,
            non_fulfillment_rate: 0,
            late_shipment_rate: 0,
            listing_violations: 0,
            opfr_violations: 0,
            others: 0,
          },
          ongoing_punishment: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getShopPenalty();

      expect(result.response.penalty_points.overall_penalty_points).toBe(0);
      expect(result.response.ongoing_punishment).toHaveLength(0);
    });
  });

  describe("getShopPerformance", () => {
    it("should get shop performance metrics successfully", async () => {
      const mockResponse: GetShopPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          overall_performance: {
            performance_rating: PerformanceRating.Good,
            rating_threshold: [
              { performance_rating: PerformanceRating.Good, lower_bound: 70 },
            ],
          },
          metric_list: [
            {
              metric_type: MetricType.FulfillmentPerformance,
              metrics: [
                {
                  metric_name: "Non-Fulfilment Rate",
                  value: 2.5,
                  unit: MetricUnit.Percentage,
                  target: {
                    value: 5,
                    comparator: "<=",
                  },
                  description: "Percentage of non-fulfilled orders",
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getShopPerformance();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_shop_performance",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result.error).toBe("");
      expect(result.response.overall_performance.performance_rating).toBe(PerformanceRating.Good);
      expect(result.response.metric_list).toHaveLength(1);
    });
  });

  describe("getMetricSourceDetail", () => {
    it("should get metric source details successfully", async () => {
      const mockResponse: GetMetricSourceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_source_detail: [
            {
              order_sn: "210101ABCDEF",
              create_time: 1609459200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getMetricSourceDetail({
        metric_type: MetricType.FulfillmentPerformance,
        metric_name: "Non-Fulfilment Rate",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_metric_source_detail",
        {
          method: "GET",
          auth: true,
          params: {
            metric_type: MetricType.FulfillmentPerformance,
            metric_name: "Non-Fulfilment Rate",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.metric_source_detail).toHaveLength(1);
      expect(result.response.more).toBe(false);
    });

    it("should handle pagination parameters", async () => {
      const mockResponse: GetMetricSourceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_source_detail: [],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getMetricSourceDetail({
        metric_type: MetricType.ListingPerformance,
        metric_name: "Test Metric",
        page_size: 20,
        cursor: "cursor123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_metric_source_detail",
        {
          method: "GET",
          auth: true,
          params: {
            metric_type: MetricType.ListingPerformance,
            metric_name: "Test Metric",
            page_size: 20,
            cursor: "cursor123",
          },
        }
      );

      expect(result.response.more).toBe(true);
    });
  });

  describe("getPenaltyPointHistory", () => {
    it("should get penalty point history successfully", async () => {
      const mockResponse: GetPenaltyPointHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_point_history: [
            {
              date: 1609459200,
              penalty_points: 5,
              violation_type: "Late Shipment",
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPenaltyPointHistory({
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_penalty_point_history",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 10,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.penalty_point_history).toHaveLength(1);
      expect(result.response.more).toBe(false);
    });

    it("should handle cursor-based pagination", async () => {
      const mockResponse: GetPenaltyPointHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_point_history: [],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPenaltyPointHistory({
        page_size: 20,
        cursor: "next_cursor",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_penalty_point_history",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 20,
            cursor: "next_cursor",
          },
        }
      );

      expect(result.response.more).toBe(true);
    });
  });

  describe("getPunishmentHistory", () => {
    it("should get punishment history successfully", async () => {
      const mockResponse: GetPunishmentHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          punishment_history: [
            {
              punishment_name: "deboost",
              start_time: 1609459200,
              end_time: 1610064000,
              punishment_tier: 1,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPunishmentHistory({
        page_size: 15,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_punishment_history",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 15,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.punishment_history).toHaveLength(1);
      expect(result.response.punishment_history[0].punishment_name).toBe("deboost");
    });
  });

  describe("getListingsWithIssues", () => {
    it("should get listings with issues successfully", async () => {
      const mockResponse: GetListingsWithIssuesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          listings_with_issues: [
            {
              item_id: 123456,
              item_name: "Test Product",
              issue_type: "prohibited_item",
              violation_date: 1609459200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getListingsWithIssues({
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_listings_with_issues",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 10,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.listings_with_issues).toHaveLength(1);
      expect(result.response.listings_with_issues[0].issue_type).toBe("prohibited_item");
    });

    it("should handle filter by issue type", async () => {
      const mockResponse: GetListingsWithIssuesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          listings_with_issues: [],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getListingsWithIssues({
        page_size: 20,
        issue_type: "copyright_violation",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_listings_with_issues",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 20,
            issue_type: "copyright_violation",
          },
        }
      );

      expect(result.response.more).toBe(false);
    });
  });

  describe("getLateOrders", () => {
    it("should get late orders successfully", async () => {
      const mockResponse: GetLateOrdersResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          late_orders: [
            {
              order_sn: "210101ABCDEF",
              item_id: 123456,
              model_id: 789,
              late_reason: "Late Shipment",
              create_time: 1609459200,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getLateOrders({
        page_size: 15,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/account_health/get_late_orders", {
        method: "GET",
        auth: true,
        params: {
          page_size: 15,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.late_orders).toHaveLength(1);
      expect(result.response.late_orders[0].late_reason).toBe("Late Shipment");
    });

    it("should handle cursor pagination", async () => {
      const mockResponse: GetLateOrdersResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          late_orders: [],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getLateOrders({
        page_size: 50,
        cursor: "page2_cursor",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/account_health/get_late_orders", {
        method: "GET",
        auth: true,
        params: {
          page_size: 50,
          cursor: "page2_cursor",
        },
      });

      expect(result.response.more).toBe(true);
    });
  });
});
