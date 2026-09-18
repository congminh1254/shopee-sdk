import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { BusinessInsightsManager } from "../../managers/business-insights.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("BusinessInsightsManager (Generated Tests)", () => {
  let manager: BusinessInsightsManager;
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
    manager = new BusinessInsightsManager(mockConfig);
  });

  describe("getMarketingHotListing", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_time: 123,
        end_time: 123,
        period: "real_time/yesterday/past7days/past30days/monthday/week/",
        product_id_list: ["test_string"],
      };
      const exampleResponse = {
        code: 0,
        msg: "ok",
        result: ["test_string"],
        result_order_type: "placed",
        result_key_metrics: "test_string",
        result_key_metrics_key_metrics: "test_string",
        result_key_metrics_time_series: ["test_string"],
        result_performance: ["test_string"],
        result_key_metrics_key_metrics_sales: 1520.5,
        result_key_metrics_key_metrics_buyers: 120,
        result_key_metrics_key_metrics_orders: 135,
        result_key_metrics_key_metrics_units: 168,
        result_key_metrics_key_metrics_conversion_rate: 0.12,
        result_key_metrics_key_metrics_product_impression: 12500,
        result_key_metrics_key_metrics_product_clicks: 1500,
        result_key_metrics_key_metrics_click_through_rate: 0.12,
        result_key_metrics_key_metrics_sales_pct_diff: 0.15,
        result_key_metrics_key_metrics_buyers_pct_diff: 0.1,
        result_key_metrics_key_metrics_orders_pct_diff: 0.12,
        result_key_metrics_key_metrics_units_pct_diff: 0.2,
        result_key_metrics_key_metrics_conversion_rate_pct_diff: 0.01,
        result_key_metrics_key_metrics_product_impression_pct_diff: 0.08,
        result_key_metrics_key_metrics_product_clicks_pct_diff: 0.09,
        result_key_metrics_key_metrics_click_through_rate_pct_diff: 0.01,
        result_key_metrics_time_series_t: 1788278400,
        result_key_metrics_time_series_sales: 520.5,
        result_key_metrics_time_series_buyers: 40,
        result_key_metrics_time_series_orders: 45,
        result_key_metrics_time_series_units: 56,
        result_key_metrics_time_series_conversion_rate: 0.11,
        result_key_metrics_time_series_product_impression: 4200,
        result_key_metrics_time_series_product_clicks: 500,
        result_key_metrics_time_series_click_through_rate: 0.119,
        result_performance_item_id: 123456789,
        result_performance_item_name: "Sample Product",
        result_performance_image: "image_identifier_or_url",
        result_performance_variation_name: "Black / M",
        result_performance_status: 1,
        result_performance_sales: 320.5,
        result_performance_buyers: 25,
        result_performance_orders: 28,
        result_performance_units: 35,
        result_performance_conversion_rate: 0.14,
        result_performance_product_impression: 2100,
        result_performance_product_clicks: 280,
        result_performance_click_through_rate: 0.133,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMarketingHotListing(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/business_insights/get_marketing_hot_listing",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
