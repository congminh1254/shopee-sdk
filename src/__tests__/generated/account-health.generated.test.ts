import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AccountHealthManager } from "../../managers/account-health.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("AccountHealthManager (Generated Tests)", () => {
  let manager: AccountHealthManager;
  let mockConfig: ShopeeConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };
    manager = new AccountHealthManager(mockConfig);
  });

  describe("getLateOrders", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        late_order_list: [
          {
            order_sn: "test_string",
            shipping_deadline: "test_string",
            late_by_days: 123,
          },
        ],
        total_count: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getLateOrders(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_late_orders",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getListingsWithIssues", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        listing_list: [
          {
            item_id: 100963774,
            reason: 1,
          },
        ],
        total_count: 7,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getListingsWithIssues(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_listings_with_issues",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMetricSourceDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        metric_id: 1,
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        metric_id: 1,
        nfr_order_list: [
          {
            order_sn: "test_string",
            non_fulfillment_type: 123,
            detailed_reason: 123,
          },
        ],
        cancellation_order_list: [
          {
            order_sn: "test_string",
            cancellation_type: 123,
            detailed_reason: 123,
          },
        ],
        return_refund_order_list: [
          {
            order_sn: "test_string",
            detailed_reason: 123,
          },
        ],
        lsr_order_list: [
          {
            order_sn: "test_string",
            shipping_deadline: "test_string",
            actual_shipping_time: "test_string",
            late_by_days: 123,
            actual_pick_up_time: "test_string",
            shipping_channel: "test_string",
            first_mile_type: "test_string",
            diagnosis_scenario: ["test_string"],
          },
        ],
        fhr_order_list: [
          {
            order_sn: "test_string",
            parcel_id: 123,
            parcel_display_id: "test_string",
            confirm_time: "test_string",
            handover_deadline: "test_string",
            fast_handover_due_date: "test_string",
            arrange_pick_up_time: "test_string",
            handover_time: "test_string",
            shipping_channel: "test_string",
            first_mile_type: "test_string",
            first_mile_tracking_no: "test_string",
            diagnosis_scenario: ["test_string"],
          },
        ],
        opfr_day_detail_data_list: [
          {
            date: "19/10/2024",
            scheduled_pickup_num: 48,
            failed_pickup_num: 11,
            opfr: 123,
            target: "49.90%",
          },
        ],
        violation_listing_list: [
          {
            item_id: 123,
            detailed_reason: 123,
            update_time: "test_string",
          },
        ],
        pre_order_listing_violation_data_list: [
          {
            date: "03/11/2024",
            live_listing_count: [100],
            pre_order_listing_count: [10],
            pre_order_listing_rate: [123],
            target: "13.00%",
          },
        ],
        pre_order_listing_list: [
          {
            item_id: 123,
            current_pre_order_status: 123,
          },
        ],
        sdd_listing_list: [
          {
            item_id: 123,
            current_sdd_status: 123,
          },
        ],
        ndd_listing_list: [
          {
            item_id: 123,
            current_ndd_status: 123,
          },
        ],
        apt_order_list: [
          {
            order_sn: "test_string",
            order_create_time: "test_string",
            arrange_pick_up_time: "test_string",
            actual_pick_up_time: "test_string",
            preparation_days: 123,
            shipping_channel: "test_string",
            first_mile_type: "test_string",
            first_mile_tracking_no: "test_string",
          },
        ],
        hd_listing_list: [
          {
            item_id: 123,
            current_status: 123,
          },
        ],
        saturday_shipment_list: [
          {
            order_sn: "test_string",
            order_create_time: "test_string",
            arrange_pick_up_time: "test_string",
            actual_pick_up_time: "test_string",
            preparation_days: 123,
            shipping_channel: "test_string",
            first_mile_type: "test_string",
            first_mile_tracking_no: "test_string",
          },
        ],
        otdr_order_list: [
          {
            order_id: "test_string",
            order_sn: "test_string",
            paid_time: "test_string",
            estimated_delivery_date: "test_string",
            actual_pick_up_time: "test_string",
            real_delivery_time: "test_string",
            difference_between_edd_rdt: "test_string",
          },
        ],
        total_count: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMetricSourceDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_metric_source_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPenaltyPointHistory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        violation_type: 5,
      };
      const exampleResponse = {
        penalty_point_list: [
          {
            issue_time: 1728552398,
            latest_point_num: 0,
            original_point_num: 1,
            reference_id: 764539404640322300,
            violation_type: 5,
          },
        ],
        total_count: 8,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPenaltyPointHistory(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_penalty_point_history",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPunishmentHistory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        punishment_status: 1,
      };
      const exampleResponse = {
        punishment_list: [
          {
            issue_time: "test_string",
            start_time: "test_string",
            end_time: "test_string",
            punishment_type: 123,
            reason: 123,
            reference_id: 123,
            listing_limit: [123],
            order_limit: "test_string",
          },
        ],
        total_count: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPunishmentHistory(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_punishment_history",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        overall_performance: {
          rating: 123,
          fulfillment_failed: 123,
          listing_failed: [123],
          custom_service_failed: 123,
        },
        metric_list: [
          {
            metric_type: 123,
            metric_id: 123,
            parent_metric_id: 123,
            metric_name: "test_string",
            current_period: 123,
            last_period: 123,
            unit: 123,
            target: {
              value: 123,
              comparator: "test_string",
            },
            exemption_end_date: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopPerformance(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/account_health/get_shop_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
