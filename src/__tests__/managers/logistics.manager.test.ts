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
  CheckPolygonUpdateStatusResponse,
  UpdateAddressResponse,
  UploadServiceablePolygonResponse,
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

  // Tests for new functions (35 additional endpoints)
  describe("batchShipOrder", () => {
    it("should batch ship multiple orders", async () => {
      const mockResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.batchShipOrder({
        order_list: [{ order_sn: "ORDER1" }, { order_sn: "ORDER2" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/batch_ship_order", {
        method: "POST",
        auth: true,
        body: { order_list: [{ order_sn: "ORDER1" }, { order_sn: "ORDER2" }] },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("massShipOrder", () => {
    it("should mass ship orders", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.massShipOrder({
        package_number_list: ["PKG1", "PKG2"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/mass_ship_order", {
        method: "POST",
        auth: true,
        body: { package_number_list: ["PKG1", "PKG2"] },
      });
    });
  });

  describe("shipBooking", () => {
    it("should ship booking", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.shipBooking({
        booking_sn: "BOOKING123",
        pickup: { address_id: 1 },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/ship_booking", {
        method: "POST",
        auth: true,
        body: { booking_sn: "BOOKING123", pickup: { address_id: 1 } },
      });
    });
  });

  describe("getBookingShippingParameter", () => {
    it("should get booking shipping parameter", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { info_needed: {} },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingShippingParameter({ booking_sn: "BOOKING123" });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_shipping_parameter",
        {
          method: "GET",
          auth: true,
          params: { booking_sn: "BOOKING123" },
        }
      );
    });
  });

  describe("getBookingTrackingInfo", () => {
    it("should get booking tracking info", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: {
          booking_sn: "BOOKING123",
          logistics_status: "LOGISTICS_READY",
          tracking_info: [],
        },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingTrackingInfo({ booking_sn: "BOOKING123" });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_tracking_info",
        {
          method: "GET",
          auth: true,
          params: { booking_sn: "BOOKING123" },
        }
      );
    });
  });

  describe("getBookingTrackingNumber", () => {
    it("should get booking tracking number", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { tracking_number: "TRACK123" },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingTrackingNumber({ booking_sn: "BOOKING123" });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_tracking_number",
        {
          method: "GET",
          auth: true,
          params: { booking_sn: "BOOKING123" },
        }
      );
    });
  });

  describe("getMassShippingParameter", () => {
    it("should get mass shipping parameter", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { info_needed: {} },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getMassShippingParameter({ package_number_list: ["PKG1"] });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_mass_shipping_parameter",
        {
          method: "GET",
          auth: true,
          params: { package_number_list: ["PKG1"] },
        }
      );
    });
  });

  describe("getMassTrackingNumber", () => {
    it("should get mass tracking number", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { result_list: [] },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getMassTrackingNumber({ order_sn_list: ["ORDER1"] });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_mass_tracking_number",
        {
          method: "GET",
          auth: true,
          params: { order_sn_list: ["ORDER1"] },
        }
      );
    });
  });

  describe("setAddressConfig", () => {
    it("should set address config", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.setAddressConfig({ address_id: 123 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/set_address_config", {
        method: "POST",
        auth: true,
        body: { address_id: 123 },
      });
    });
  });

  describe("deleteAddress", () => {
    it("should delete address", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.deleteAddress({ address_id: 123 });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/delete_address", {
        method: "POST",
        auth: true,
        body: { address_id: 123 },
      });
    });
  });

  describe("shipping documents", () => {
    it("should create shipping document", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.createShippingDocument({
        order_sn_list: ["ORDER1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/create_shipping_document",
        {
          method: "POST",
          auth: true,
          body: { order_sn_list: ["ORDER1"], shipping_document_type: "NORMAL_AIR_WAYBILL" },
        }
      );
    });

    it("should download shipping document", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { result: "URL" },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.downloadShippingDocument({
        order_sn_list: ["ORDER1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get shipping document parameter", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getShippingDocumentParameter({ order_sn_list: ["ORDER1"] });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get shipping document result", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getShippingDocumentResult({
        order_sn_list: ["ORDER1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get shipping document data info", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getShippingDocumentDataInfo({ order_sn_list: ["ORDER1"] });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("booking shipping documents", () => {
    it("should create booking shipping document", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.createBookingShippingDocument({
        booking_sn_list: ["BOOKING1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should download booking shipping document", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.downloadBookingShippingDocument({
        booking_sn_list: ["BOOKING1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get booking shipping document parameter", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingShippingDocumentParameter({ booking_sn_list: ["BOOKING1"] });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get booking shipping document result", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingShippingDocumentResult({
        booking_sn_list: ["BOOKING1"],
        shipping_document_type: "NORMAL_AIR_WAYBILL",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get booking shipping document data info", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getBookingShippingDocumentDataInfo({ booking_sn_list: ["BOOKING1"] });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("shipping document job", () => {
    it("should create shipping document job", async () => {
      const mockResponse = {
        request_id: "test",
        error: "",
        message: "",
        response: { job_id: "JOB1" },
      };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.createShippingDocumentJob({});

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should download shipping document job", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.downloadShippingDocumentJob({ job_id: "JOB1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get shipping document job status", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getShippingDocumentJobStatus({ job_id: "JOB1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should download to label", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.downloadToLabel({ order_sn_list: ["ORDER1"] });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("channel and order updates", () => {
    it("should update channel", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.updateChannel({ logistics_channel_id: 123, enabled: true });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should update shipping order", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.updateShippingOrder({ order_sn: "ORDER1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should update tracking status", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.updateTrackingStatus({ order_sn: "ORDER1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should update self collection order logistics", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.updateSelfCollectionOrderLogistics({
        order_sn: "ORDER1",
        package_number: "PKG1",
        self_collection_status: "READY",
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("operating hours", () => {
    it("should get operating hours", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getOperatingHours({});

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should update operating hours", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.updateOperatingHours({});

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should get operating hour restrictions", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getOperatingHourRestrictions({});

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should delete special operating hour", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.deleteSpecialOperatingHour({});

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("mart packaging", () => {
    it("should get mart packaging info", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.getMartPackagingInfo({ order_sn: "ORDER1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });

    it("should set mart packaging info", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.setMartPackagingInfo({ order_sn: "ORDER1" });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("batchUpdateTPFWarehouseTrackingStatus", () => {
    it("should batch update TPF warehouse tracking status", async () => {
      const mockResponse = { request_id: "test", error: "", message: "", response: {} };
      mockShopeeFetch.mockResolvedValue(mockResponse);

      await logisticsManager.batchUpdateTPFWarehouseTrackingStatus({
        tracking_status_list: [{ package_number: "PKG1", tracking_status: "DELIVERED" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalled();
    });
  });

  describe("checkPolygonUpdateStatus", () => {
    it("should check polygon update status successfully", async () => {
      const mockResponse: CheckPolygonUpdateStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "SUCCESS",
          error_message: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.checkPolygonUpdateStatus({
        address_id: 12345,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/check_polygon_update_status",
        {
          method: "POST",
          auth: true,
          body: {
            address_id: 12345,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.status).toBe("SUCCESS");
      expect(result.response.error_message).toBe("");
    });

    it("should handle failed polygon update status", async () => {
      const mockResponse: CheckPolygonUpdateStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "FAILED",
          error_message: "Invalid KML file format",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.checkPolygonUpdateStatus({
        address_id: 12345,
      });

      expect(result.response.status).toBe("FAILED");
      expect(result.response.error_message).toBe("Invalid KML file format");
    });
  });

  describe("updateAddress", () => {
    it("should update address successfully", async () => {
      const mockResponse: UpdateAddressResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.updateAddress({
        address_id: 12345,
        address: "Updated Street Address",
        city: "Updated City",
        state: "Updated State",
        zipcode: "12345",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/logistics/update_address", {
        method: "POST",
        auth: true,
        body: {
          address_id: 12345,
          address: "Updated Street Address",
          city: "Updated City",
          state: "Updated State",
          zipcode: "12345",
        },
      });

      expect(result.error).toBe("");
    });

    it("should handle error when updating address", async () => {
      const mockResponse: UpdateAddressResponse = {
        request_id: "test-request-id",
        error: "error_param",
        message: "Invalid zipcode format",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.updateAddress({
        address_id: 12345,
        zipcode: "invalid",
      });

      expect(result.error).toBe("error_param");
      expect(result.message).toBe("Invalid zipcode format");
    });
  });

  describe("uploadServiceablePolygon", () => {
    it("should upload serviceable polygon successfully", async () => {
      const mockResponse: UploadServiceablePolygonResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.uploadServiceablePolygon({
        address_id: 12345,
        kml_content: '<?xml version="1.0" encoding="UTF-8"?><kml>...</kml>',
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/upload_serviceable_polygon",
        {
          method: "POST",
          auth: true,
          body: {
            address_id: 12345,
            kml_content: '<?xml version="1.0" encoding="UTF-8"?><kml>...</kml>',
          },
        }
      );

      expect(result.error).toBe("");
    });

    it("should handle error when uploading invalid polygon", async () => {
      const mockResponse: UploadServiceablePolygonResponse = {
        request_id: "test-request-id",
        error: "error_invalid_kml",
        message: "KML file contains invalid polygon data",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await logisticsManager.uploadServiceablePolygon({
        address_id: 12345,
        kml_content: "invalid kml",
      });

      expect(result.error).toBe("error_invalid_kml");
      expect(result.message).toBe("KML file contains invalid polygon data");
    });
  });
});
