import { jest } from "@jest/globals";
import { LogisticsManager } from "../../managers/logistics.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetTrackingInfoResponse,
  GetChannelListResponse,
  GetShippingParameterResponse,
  GetTrackingNumberResponse,
  ShipOrderResponse,
  GetAddressListResponse,
} from "../../schemas/logistics.js";

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

  describe("getChannelList", () => {
    it("should get list of available logistics channels", async () => {
      const mockResponse: GetChannelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          logistics_channel_list: [
            {
              logistics_channel_id: 40029,
              logistics_channel_name: "Shopee Self Pick-up",
              cod_enabled: true,
              enabled: true,
              fee_type: "SIZE_INPUT",
              force_enable: false,
              mask_channel_id: 0,
              size_list: [],
              weight_limit: {
                item_max_weight: 5,
                item_min_weight: 0,
              },
              item_max_dimension: {
                dimension_sum: 90,
                height: 30,
                length: 30,
                unit: "cm",
                width: 30,
              },
              volume_limit: {
                item_max_volume: 0,
                item_min_volume: 0,
              },
              logistics_description: "Shopee Self Collect operating hours",
              block_seller_cover_shipping_fee: false,
              support_cross_border: false,
              seller_logistic_has_configuration: null,
              logistics_capability: {
                seller_logistics: false,
              },
              preprint: false,
            },
            {
              logistics_channel_id: 40018,
              logistics_channel_name: "J&T Express",
              cod_enabled: true,
              enabled: true,
              fee_type: "SIZE_INPUT",
              force_enable: false,
              mask_channel_id: 4000,
              size_list: [],
              weight_limit: {
                item_max_weight: 50,
                item_min_weight: 0,
              },
              item_max_dimension: {
                dimension_sum: 0,
                height: 150,
                length: 150,
                unit: "cm",
                width: 150,
              },
              volume_limit: {
                item_max_volume: 0,
                item_min_volume: 0,
              },
              logistics_description: "J&T branches operating hours",
              block_seller_cover_shipping_fee: false,
              support_cross_border: false,
              seller_logistic_has_configuration: null,
              logistics_capability: {
                seller_logistics: false,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getChannelList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_channel_list", {
        method: "GET",
        auth: true,
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.logistics_channel_list).toHaveLength(2);
      expect(result.response.logistics_channel_list[0].logistics_channel_name).toBe(
        "Shopee Self Pick-up"
      );
    });

    it("should handle empty channel list", async () => {
      const mockResponse: GetChannelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          logistics_channel_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getChannelList();

      expect(result).toEqual(mockResponse);
      expect(result.response.logistics_channel_list).toHaveLength(0);
    });
  });

  describe("getShippingParameter", () => {
    it("should get shipping parameters for an order", async () => {
      const mockResponse: GetShippingParameterResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          info_needed: {
            dropoff: [],
            pickup: ["address_id", "pickup_time_id"],
            non_integrated: [],
          },
          pickup: {
            address_list: [
              {
                address_id: 234,
                region: "SG",
                state: "Sarawak",
                city: "Kuching",
                district: "Central",
                town: "Downtown",
                address: "123 Main Street",
                zipcode: "50003",
                address_flag: ["default_address", "pickup_address"],
                time_slot_list: [
                  {
                    date: 1608103685,
                    time_text: "9:00 AM - 12:00 PM",
                    pickup_time_id: "slot_123",
                    flags: ["recommended"],
                  },
                  {
                    date: 1608190085,
                    time_text: "2:00 PM - 5:00 PM",
                    pickup_time_id: "slot_124",
                  },
                ],
              },
            ],
          },
          dropoff: {
            branch_list: [],
            slug_list: [],
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getShippingParameter({
        order_sn: "ORDER123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_parameter",
        {
          method: "GET",
          auth: true,
          params: {
            order_sn: "ORDER123",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.info_needed?.pickup).toContain("address_id");
      expect(result.response.pickup?.address_list).toHaveLength(1);
    });

    it("should get shipping parameters with package number", async () => {
      const mockResponse: GetShippingParameterResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          info_needed: {
            dropoff: ["branch_id"],
            pickup: [],
          },
          dropoff: {
            branch_list: [
              {
                branch_id: 101,
                region: "PH",
                state: "Metro Manila",
                city: "Manila",
                address: "456 Branch Ave",
                zipcode: "1000",
                district: "Downtown",
                town: "Central",
              },
            ],
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getShippingParameter({
        order_sn: "ORDER456",
        package_number: "PKG789",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_parameter",
        {
          method: "GET",
          auth: true,
          params: {
            order_sn: "ORDER456",
            package_number: "PKG789",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.dropoff?.branch_list).toHaveLength(1);
    });
  });

  describe("getTrackingNumber", () => {
    it("should get tracking number for an order", async () => {
      const mockResponse: GetTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tracking_number: "MY200448706479IT",
          plp_number: "PLP123456",
          hint: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingNumber({
        order_sn: "ORDER789",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_tracking_number", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "ORDER789",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.tracking_number).toBe("MY200448706479IT");
    });

    it("should get tracking number with optional fields", async () => {
      const mockResponse: GetTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tracking_number: "MY200448706479IT",
          first_mile_tracking_number: "CNF877146678717210312",
          last_mile_tracking_number: "200448706479IT",
          pickup_code: "ABC123",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingNumber({
        order_sn: "ORDER999",
        package_number: "PKG999",
        response_optional_fields: "first_mile_tracking_number,last_mile_tracking_number",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_tracking_number", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "ORDER999",
          package_number: "PKG999",
          response_optional_fields: "first_mile_tracking_number,last_mile_tracking_number",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.first_mile_tracking_number).toBe("CNF877146678717210312");
      expect(result.response.pickup_code).toBe("ABC123");
    });

    it("should handle hint message when tracking not available", async () => {
      const mockResponse: GetTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tracking_number: "",
          hint: "Buyers CVS closed, waiting for buyer to reselect another CVS stores",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getTrackingNumber({
        order_sn: "ORDER000",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.hint).toBeTruthy();
      expect(result.response.tracking_number).toBe("");
    });
  });

  describe("shipOrder", () => {
    it("should ship order with pickup information", async () => {
      const mockResponse: ShipOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.shipOrder({
        order_sn: "ORDER123",
        pickup: {
          address_id: 234,
          pickup_time_id: "slot_123",
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/ship_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "ORDER123",
          pickup: {
            address_id: 234,
            pickup_time_id: "slot_123",
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should ship order with dropoff information", async () => {
      const mockResponse: ShipOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.shipOrder({
        order_sn: "ORDER456",
        package_number: "PKG789",
        dropoff: {
          branch_id: 101,
          sender_real_name: "John Doe",
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/ship_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "ORDER456",
          package_number: "PKG789",
          dropoff: {
            branch_id: 101,
            sender_real_name: "John Doe",
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should ship order with non-integrated channel", async () => {
      const mockResponse: ShipOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.shipOrder({
        order_sn: "ORDER789",
        non_integrated: {
          tracking_number: "TRACK123",
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/ship_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "ORDER789",
          non_integrated: {
            tracking_number: "TRACK123",
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAddressList", () => {
    it("should get shop address list", async () => {
      const mockResponse: GetAddressListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          show_pickup_address: true,
          address_list: [
            {
              address_id: 1173,
              region: "SG",
              state: "Singapore",
              city: "Singapore",
              district: "Central",
              town: "Downtown",
              address: "123 Main Street",
              zipcode: "123456",
              address_flag: ["default_address", "pickup_address"],
              address_status: "ACTIVE",
              full_address: "123 Main Street, Downtown, Central, Singapore, Singapore 123456",
            },
            {
              address_id: 1174,
              region: "SG",
              state: "Singapore",
              city: "Singapore",
              district: "West",
              town: "Jurong",
              address: "456 West Avenue",
              zipcode: "654321",
              address_flag: ["return_address"],
              address_status: "ACTIVE",
              full_address: "456 West Avenue, Jurong, West, Singapore, Singapore 654321",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getAddressList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/get_address_list", {
        method: "GET",
        auth: true,
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.address_list).toHaveLength(2);
      expect(result.response.show_pickup_address).toBe(true);
    });

    it("should handle empty address list", async () => {
      const mockResponse: GetAddressListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          show_pickup_address: false,
          address_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.getAddressList();

      expect(result).toEqual(mockResponse);
      expect(result.response.address_list).toHaveLength(0);
    });
  });
});
