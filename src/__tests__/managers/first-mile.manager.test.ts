import { jest } from "@jest/globals";
import { FirstMileManager } from "../../managers/first-mile.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  BindCourierDeliveryFirstMileTrackingNumberResponse,
  BindFirstMileTrackingNumberResponse,
  GenerateAndBindFirstMileTrackingNumberResponse,
  GenerateFirstMileTrackingNumberResponse,
  GetChannelListResponse,
  GetCourierDeliveryChannelListResponse,
  GetCourierDeliveryDetailResponse,
  GetCourierDeliveryTrackingNumberListResponse,
  GetCourierDeliveryWaybillResponse,
  GetDetailResponse,
  GetTrackingNumberListResponse,
  GetTransitWarehouseListResponse,
  GetUnbindOrderListResponse,
  GetWaybillResponse,
  UnbindFirstMileTrackingNumberResponse,
  UnbindFirstMileTrackingNumberAllResponse,
} from "../../schemas/first-mile.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("FirstMileManager", () => {
  let firstMileManager: FirstMileManager;
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

    firstMileManager = new FirstMileManager(mockConfig);
  });

  describe("getChannelList", () => {
    it("should get first mile channel list", async () => {
      const mockResponse: GetChannelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          logistics_channel_list: [
            {
              logistics_channel_id: 1,
              logistics_channel_name: "金岸物流",
              shipment_method: "dropoff",
            },
            {
              logistics_channel_id: 2,
              logistics_channel_name: "海带宝",
              shipment_method: "dropoff",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getChannelList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/first_mile/get_channel_list", {
        method: "GET",
        auth: true,
        params: undefined,
      });

      expect(result).toEqual(mockResponse);
      expect(result.response?.logistics_channel_list).toHaveLength(2);
    });

    it("should get channel list with region filter", async () => {
      const mockResponse: GetChannelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          logistics_channel_list: [
            {
              logistics_channel_id: 1,
              logistics_channel_name: "Test Channel",
              shipment_method: "pickup",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getChannelList({ region: "CN" });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/first_mile/get_channel_list", {
        method: "GET",
        auth: true,
        params: { region: "CN" },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateFirstMileTrackingNumber", () => {
    it("should generate first mile tracking number", async () => {
      const mockResponse: GenerateFirstMileTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          first_mile_tracking_number_list: ["CNF731738838434210105"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.generateFirstMileTrackingNumber({
        declare_date: "2024-01-15",
        quantity: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/generate_first_mile_tracking_number",
        {
          method: "POST",
          auth: true,
          body: {
            declare_date: "2024-01-15",
            quantity: 1,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.first_mile_tracking_number_list).toHaveLength(1);
    });
  });

  describe("getDetail", () => {
    it("should get first mile detail", async () => {
      const mockResponse: GetDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          first_mile_tracking_number: "CNF731738838434210105",
          shipment_method: "pickup",
          logistics_channel_id: 813,
          status: "PICKED_UP",
          declare_date: "2020-05-19",
          order_list: [
            {
              order_sn: "20012328KKGVR0",
              package_number: "25333320394471234567",
              sls_tracking_number: "TW211342705212345",
              pick_up_done: false,
              arrived_transit_warehouse: false,
            },
          ],
          more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getDetail({
        first_mile_tracking_number: "CNF731738838434210105",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/first_mile/get_detail", {
        method: "GET",
        auth: true,
        params: {
          first_mile_tracking_number: "CNF731738838434210105",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response?.status).toBe("PICKED_UP");
    });

    it("should get detail with cursor for pagination", async () => {
      const mockResponse: GetDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          first_mile_tracking_number: "CNF731738838434210105",
          shipment_method: "pickup",
          logistics_channel_id: 813,
          status: "PICKED_UP",
          declare_date: "2020-05-19",
          order_list: [],
          more: false,
          next_cursor: "100",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getDetail({
        first_mile_tracking_number: "CNF731738838434210105",
        cursor: "50",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/first_mile/get_detail", {
        method: "GET",
        auth: true,
        params: {
          first_mile_tracking_number: "CNF731738838434210105",
          cursor: "50",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("bindFirstMileTrackingNumber", () => {
    it("should bind first mile tracking number", async () => {
      const mockResponse: BindFirstMileTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          fail_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.bindFirstMileTrackingNumber({
        first_mile_tracking_number: "CNF731738838434210105",
        shipment_method: "pickup",
        region: "CN",
        logistics_channel_id: 813,
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/bind_first_mile_tracking_number",
        {
          method: "POST",
          auth: true,
          body: {
            first_mile_tracking_number: "CNF731738838434210105",
            shipment_method: "pickup",
            region: "CN",
            logistics_channel_id: 813,
            order_list: [
              {
                order_sn: "20012328KKGVR0",
                package_number: "25333320394471234567",
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.fail_list).toHaveLength(0);
    });
  });

  describe("unbindFirstMileTrackingNumber", () => {
    it("should unbind first mile tracking number", async () => {
      const mockResponse: UnbindFirstMileTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          fail_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.unbindFirstMileTrackingNumber({
        first_mile_tracking_number: "CNF731738838434210105",
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/unbind_first_mile_tracking_number",
        {
          method: "POST",
          auth: true,
          body: {
            first_mile_tracking_number: "CNF731738838434210105",
            order_list: [
              {
                order_sn: "20012328KKGVR0",
                package_number: "25333320394471234567",
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTrackingNumberList", () => {
    it("should get tracking number list", async () => {
      const mockResponse: GetTrackingNumberListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          first_mile_tracking_number_list: [
            {
              first_mile_tracking_number: "CNF731738838434210105",
              declare_date: "2020-05-19",
            },
          ],
          more: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getTrackingNumberList({
        from_date: "2024-01-01",
        to_date: "2024-01-31",
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_tracking_number_list",
        {
          method: "GET",
          auth: true,
          params: {
            from_date: "2024-01-01",
            to_date: "2024-01-31",
            page_size: 20,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.first_mile_tracking_number_list).toHaveLength(1);
    });
  });

  describe("getUnbindOrderList", () => {
    it("should get unbind order list", async () => {
      const mockResponse: GetUnbindOrderListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_list: [
            {
              order_sn: "20012328KKGVR0",
              package_number: "25333320394471234567",
            },
          ],
          more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getUnbindOrderList({
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_unbind_order_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 20,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.order_list).toHaveLength(1);
    });
  });

  describe("getWaybill", () => {
    it("should get waybill", async () => {
      const mockResponse: GetWaybillResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          waybill_list: [
            {
              first_mile_tracking_number: "CNF731738838434210105",
              waybill: "base64_encoded_pdf_content",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getWaybill({
        first_mile_tracking_number_list: ["CNF731738838434210105"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/first_mile/get_waybill", {
        method: "POST",
        auth: true,
        body: {
          first_mile_tracking_number_list: ["CNF731738838434210105"],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response?.waybill_list).toHaveLength(1);
    });
  });

  describe("getCourierDeliveryChannelList", () => {
    it("should get courier delivery channel list", async () => {
      const mockResponse: GetCourierDeliveryChannelListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          courier_service_list: [
            {
              courier_service_id: "1",
              courier_service_name: "Test Courier",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getCourierDeliveryChannelList({
        region: "CN",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_channel_list",
        {
          method: "GET",
          auth: true,
          params: {
            region: "CN",
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTransitWarehouseList", () => {
    it("should get transit warehouse list", async () => {
      const mockResponse: GetTransitWarehouseListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warehouse_list: [
            {
              warehouse_id: "WH001",
              warehouse_name: "Test Warehouse",
              warehouse_address: "123 Test St",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getTransitWarehouseList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_transit_warehouse_list",
        {
          method: "GET",
          auth: true,
          params: undefined,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateAndBindFirstMileTrackingNumber", () => {
    it("should generate and bind first mile tracking number", async () => {
      const mockResponse: GenerateAndBindFirstMileTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          binding_id: "BINDING123456",
          fail_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.generateAndBindFirstMileTrackingNumber({
        shipment_method: "courier_delivery",
        region: "CN",
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
          },
        ],
        courier_delivery_info: {
          address_id: 12345,
          warehouse_id: "WH001",
          logistics_product_id: 1010003,
          courier_service_id: "1",
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/generate_and_bind_first_mile_tracking_number",
        {
          method: "POST",
          auth: true,
          body: {
            shipment_method: "courier_delivery",
            region: "CN",
            order_list: [
              {
                order_sn: "20012328KKGVR0",
                package_number: "25333320394471234567",
              },
            ],
            courier_delivery_info: {
              address_id: 12345,
              warehouse_id: "WH001",
              logistics_product_id: 1010003,
              courier_service_id: "1",
            },
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.binding_id).toBe("BINDING123456");
    });
  });

  describe("bindCourierDeliveryFirstMileTrackingNumber", () => {
    it("should bind courier delivery first mile tracking number", async () => {
      const mockResponse: BindCourierDeliveryFirstMileTrackingNumberResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          fail_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.bindCourierDeliveryFirstMileTrackingNumber({
        shipment_method: "courier_delivery",
        binding_id: "BINDING123456",
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/bind_courier_delivery_first_mile_tracking_number",
        {
          method: "POST",
          auth: true,
          body: {
            shipment_method: "courier_delivery",
            binding_id: "BINDING123456",
            order_list: [
              {
                order_sn: "20012328KKGVR0",
                package_number: "25333320394471234567",
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCourierDeliveryDetail", () => {
    it("should get courier delivery detail", async () => {
      const mockResponse: GetCourierDeliveryDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          binding_id: "BINDING123456",
          shipment_method: "courier_delivery",
          status: "PICKED_UP",
          declare_date: "2024-01-15",
          order_list: [
            {
              order_sn: "20012328KKGVR0",
              package_number: "25333320394471234567",
              sls_tracking_number: "TW211342705212345",
              pick_up_done: false,
              arrived_transit_warehouse: false,
            },
          ],
          more: false,
          next_cursor: "",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getCourierDeliveryDetail({
        binding_id: "BINDING123456",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_detail",
        {
          method: "GET",
          auth: true,
          params: {
            binding_id: "BINDING123456",
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCourierDeliveryTrackingNumberList", () => {
    it("should get courier delivery tracking number list", async () => {
      const mockResponse: GetCourierDeliveryTrackingNumberListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          binding_info_list: [
            {
              binding_id: "BINDING123456",
              declare_date: "2024-01-15",
            },
          ],
          more: false,
          next_offset: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getCourierDeliveryTrackingNumberList({
        from_date: "2024-01-01",
        to_date: "2024-01-31",
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_tracking_number_list",
        {
          method: "POST",
          auth: true,
          body: {
            from_date: "2024-01-01",
            to_date: "2024-01-31",
            page_size: 20,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCourierDeliveryWaybill", () => {
    it("should get courier delivery waybill", async () => {
      const mockResponse: GetCourierDeliveryWaybillResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          waybill_list: [
            {
              binding_id: "BINDING123456",
              waybill: "base64_encoded_pdf_content",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.getCourierDeliveryWaybill({
        binding_id_list: ["BINDING123456"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_waybill",
        {
          method: "POST",
          auth: true,
          body: {
            binding_id_list: ["BINDING123456"],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("unbindFirstMileTrackingNumberAll", () => {
    it("should unbind all first mile tracking numbers", async () => {
      const mockResponse: UnbindFirstMileTrackingNumberAllResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          fail_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await firstMileManager.unbindFirstMileTrackingNumberAll({
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/unbind_first_mile_tracking_number_all",
        {
          method: "POST",
          auth: true,
          body: {
            order_list: [
              {
                order_sn: "20012328KKGVR0",
                package_number: "25333320394471234567",
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });
});
