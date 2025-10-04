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
            rating: PerformanceRating.Good,
            fulfillment_failed: 0,
            listing_failed: 0,
            custom_service_failed: 0,
          },
          metric_list: [
            {
              metric_type: MetricType.FulfillmentPerformance,
              metric_id: 3,
              parent_metric_id: 0,
              metric_name: "Non-Fulfilment Rate",
              current_period: 2.5,
              last_period: 3.0,
              unit: MetricUnit.Percentage,
              target: {
                value: 5,
                comparator: "<=",
              },
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
      expect(result.response.overall_performance.rating).toBe(PerformanceRating.Good);
      expect(result.response.metric_list).toHaveLength(1);
      expect(result.response.metric_list[0].metric_name).toBe("Non-Fulfilment Rate");
    });
  });

  describe("getMetricSourceDetail", () => {
    it("should get metric source details for NFR successfully", async () => {
      const mockResponse: GetMetricSourceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_id: 3,
          total_count: 1,
          nfr_order_list: [
            {
              order_sn: "210101ABCDEF",
              non_fulfillment_type: 1,
              detailed_reason: 1001,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getMetricSourceDetail({
        metric_id: 3,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_metric_source_detail",
        {
          method: "GET",
          auth: true,
          params: {
            metric_id: 3,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.metric_id).toBe(3);
      expect(result.response.total_count).toBe(1);
      expect(result.response.nfr_order_list).toHaveLength(1);
    });

    it("should handle pagination parameters", async () => {
      const mockResponse: GetMetricSourceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_id: 52,
          total_count: 5,
          violation_listing_list: [
            {
              item_id: 123456,
              detailed_reason: 1,
              update_time: 1609459200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getMetricSourceDetail({
        metric_id: 52,
        page_no: 1,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_metric_source_detail",
        {
          method: "GET",
          auth: true,
          params: {
            metric_id: 52,
            page_no: 1,
            page_size: 20,
          },
        }
      );

      expect(result.response.metric_id).toBe(52);
      expect(result.response.total_count).toBe(5);
    });
  });

  describe("getPenaltyPointHistory", () => {
    it("should get penalty point history successfully", async () => {
      const mockResponse: GetPenaltyPointHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_point_list: [
            {
              issue_time: 1609459200,
              latest_point_num: 5,
              original_point_num: 5,
              reference_id: 123456789,
              violation_type: 5,
            },
          ],
          total_count: 1,
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
      expect(result.response.penalty_point_list).toHaveLength(1);
      expect(result.response.total_count).toBe(1);
    });

    it("should handle violation type filter", async () => {
      const mockResponse: GetPenaltyPointHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          penalty_point_list: [],
          total_count: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPenaltyPointHistory({
        page_no: 1,
        page_size: 20,
        violation_type: 6,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_penalty_point_history",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 20,
            violation_type: 6,
          },
        }
      );

      expect(result.response.total_count).toBe(0);
    });
  });

  describe("getPunishmentHistory", () => {
    it("should get punishment history successfully", async () => {
      const mockResponse: GetPunishmentHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          punishment_list: [
            {
              issue_time: 1609459200,
              start_time: 1609459200,
              end_time: 1610064000,
              punishment_type: 103,
              reason: 1,
              reference_id: 123456789,
            },
          ],
          total_count: 1,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPunishmentHistory({
        punishment_status: 1,
        page_size: 15,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_punishment_history",
        {
          method: "GET",
          auth: true,
          params: {
            punishment_status: 1,
            page_size: 15,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.punishment_list).toHaveLength(1);
      expect(result.response.total_count).toBe(1);
    });

    it("should get ended punishment history", async () => {
      const mockResponse: GetPunishmentHistoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          punishment_list: [
            {
              issue_time: 1609459200,
              start_time: 1609459200,
              end_time: 1610064000,
              punishment_type: 104,
              reason: 2,
              reference_id: 987654321,
              listing_limit: 100,
            },
          ],
          total_count: 1,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getPunishmentHistory({
        punishment_status: 2,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_punishment_history",
        {
          method: "GET",
          auth: true,
          params: {
            punishment_status: 2,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.punishment_list[0].listing_limit).toBe(100);
    });
  });

  describe("getListingsWithIssues", () => {
    it("should get listings with issues successfully", async () => {
      const mockResponse: GetListingsWithIssuesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          listing_list: [
            {
              item_id: 123456,
              reason: 1,
            },
          ],
          total_count: 1,
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
      expect(result.response.listing_list).toHaveLength(1);
      expect(result.response.listing_list[0].item_id).toBe(123456);
      expect(result.response.total_count).toBe(1);
    });

    it("should handle pagination", async () => {
      const mockResponse: GetListingsWithIssuesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          listing_list: [],
          total_count: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getListingsWithIssues({
        page_no: 2,
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_listings_with_issues",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 2,
            page_size: 20,
          },
        }
      );

      expect(result.response.total_count).toBe(0);
    });
  });

  describe("getLateOrders", () => {
    it("should get late orders successfully", async () => {
      const mockResponse: GetLateOrdersResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          late_order_list: [
            {
              order_sn: "210101ABCDEF",
              shipping_deadline: 1609459200,
              late_by_days: 2,
            },
          ],
          total_count: 1,
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
      expect(result.response.late_order_list).toHaveLength(1);
      expect(result.response.late_order_list[0].order_sn).toBe("210101ABCDEF");
      expect(result.response.total_count).toBe(1);
    });

    it("should handle pagination", async () => {
      const mockResponse: GetLateOrdersResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          late_order_list: [],
          total_count: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await accountHealthManager.getLateOrders({
        page_no: 2,
        page_size: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/account_health/get_late_orders", {
        method: "GET",
        auth: true,
        params: {
          page_no: 2,
          page_size: 50,
        },
      });

      expect(result.response.total_count).toBe(0);
    });
  });
});
