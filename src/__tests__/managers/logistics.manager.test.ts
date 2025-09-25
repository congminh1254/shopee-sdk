import { jest } from "@jest/globals";
import { LogisticsManager } from "../../managers/logistics.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import { GetTrackingInfoResponse } from "../../schemas/logistics.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("LogisticsManager", () => {
  let logisticsManager: LogisticsManager;
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

    logisticsManager = new LogisticsManager(mockConfig);
  });

  describe("getTrackingInfo", () => {
    it("should get tracking info for an order", async () => {
      const mockResponse: GetTrackingInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000001",
          package_number: "PKG123456789",
          logistics_status: "LOGISTICS_DELIVERED",
          tracking_info: [
            {
              update_time: 1640995200,
              description: "Package has been delivered",
              logistics_status: "LOGISTICS_DELIVERED",
            },
            {
              update_time: 1640995100,
              description: "Package is out for delivery",
              logistics_status: "LOGISTICS_DELIVERY",
            },
            {
              update_time: 1640995000,
              description: "Package has arrived at delivery station",
              logistics_status: "LOGISTICS_ARRIVAL",
            },
            {
              update_time: 1640994900,
              description: "Package is in transit",
              logistics_status: "LOGISTICS_PICKUP_DONE",
            },
            {
              update_time: 1640994800,
              description: "Package has been picked up",
              logistics_status: "LOGISTICS_PICKUP_RETRY",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingInfo({
        order_sn: "220101000000001",
        package_number: "PKG123456789",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_tracking_info", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000001",
          package_number: "PKG123456789",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get tracking info without package number", async () => {
      const mockResponse: GetTrackingInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000002",
          package_number: "",
          logistics_status: "LOGISTICS_PICKUP_DONE",
          tracking_info: [
            {
              update_time: 1640995000,
              description: "Package has been picked up by courier",
              logistics_status: "LOGISTICS_PICKUP_DONE",
            },
            {
              update_time: 1640994900,
              description: "Package is ready for pickup",
              logistics_status: "LOGISTICS_PICKUP_RETRY",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingInfo({
        order_sn: "220101000000002",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_tracking_info", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000002",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle empty tracking info", async () => {
      const mockResponse: GetTrackingInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000003",
          package_number: "PKG987654321",
          logistics_status: "LOGISTICS_REQUEST_CREATED",
          tracking_info: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingInfo({
        order_sn: "220101000000003",
        package_number: "PKG987654321",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_tracking_info", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000003",
          package_number: "PKG987654321",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.tracking_info).toHaveLength(0);
    });
  });
});
