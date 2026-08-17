import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { FirstMileManager } from "../../managers/first-mile.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("FirstMileManager (Generated Tests)", () => {
  let manager: FirstMileManager;
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
    manager = new FirstMileManager(mockConfig);
  });

  describe("bindCourierDeliveryFirstMileTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shipment_method: "courier_delivery",
        binding_id: "DCN247547439397PU",
        order_list: [
          {
            order_sn: "2410106R7DE3BX",
            package_number: "test_string",
          },
        ],
      };
      const exampleResponse = {
        binding_id: "DCN249601021852HU",
        success_list: [
          {
            order_sn: "2410106R7DE3BX",
            package_number: "test_string",
          },
        ],
        fail_list: [
          {
            order_sn: "2004239MRBBFPJ",
            package_number: "test_string",
            fail_error: "firstmile.invalid_order_status",
            fail_message: "The status of order(order_sn: 2004239MRBBFPJ) is invalid.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.bindCourierDeliveryFirstMileTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/bind_courier_delivery_first_mile_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("bindFirstMileTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        first_mile_tracking_number: "CNF731738838434210105",
        shipment_method: "pickup",
        region: "cn",
        logistics_channel_id: 813,
        volume: 1,
        weight: 2,
        width: 3,
        length: 4,
        height: 5,
        order_list: [
          {
            order_sn: "201229TVRKVB8W",
            package_number: "test_string",
          },
        ],
        warehouse_id: "ECP03",
        warehouse_type: 0,
      };
      const exampleResponse = {
        first_mile_tracking_number: "CNF731738838434210105",
        order_list: [
          {
            order_sn: "201229TVRKVB80",
            package_number: "test_string",
            fail_error: "firstmile.order_not_exist",
            fail_message: "Order is not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.bindFirstMileTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/bind_first_mile_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("generateAndBindFirstMileTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shipment_method: "courier_delivery",
        region: "CN",
        order_list: [
          {
            order_sn: "2410106R7TSAJR",
            package_number: "test_string",
          },
        ],
        courier_delivery_info: {
          address_id: 11222,
          warehouse_id: "ECP04",
          logistics_product_id: 1010004,
          prepaid_account_id: 21,
          courier_service_id: "LCN70002",
        },
      };
      const exampleResponse = {
        binding_id: "DCN249601021852HU",
        success_list: [
          {
            order_sn: "2410106R7TSAJR",
            package_number: "test_string",
          },
        ],
        fail_list: [
          {
            order_sn: "2004239MRBBFPJ",
            package_number: "test_string",
            fail_error: "firstmile.package_has_bind",
            fail_message:
              "Package (order_sn: 2004239MRBBFPJ, package_number: ) has been bind to first mile code.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.generateAndBindFirstMileTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/generate_and_bind_first_mile_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("generateFirstMileTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        declare_date: "2020-12-20",
        quantity: 1,
      };
      const exampleResponse = {
        first_mile_tracking_number_list: ["CNF487059659800210120"],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.generateFirstMileTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/generate_first_mile_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getChannelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "CN",
      };
      const exampleResponse = {
        logistics_channel_list: [
          {
            logistics_channel_id: 1,
            logistics_channel_name: "金岸物流",
            shipment_method: "pickup",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getChannelList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_channel_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCourierDeliveryChannelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "CN",
      };
      const exampleResponse = {
        logistics_channel_list: [
          {
            logistics_product_id: 1010003,
            logistics_product_name: "kuaidi100 to C",
            courier_list: [
              {
                courier_name: "德邦快递",
                courier_service_id: "LCN80001",
                courier_service_name: "德邦快递",
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCourierDeliveryChannelList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_channel_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCourierDeliveryDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        binding_id: "DCN249237197572VU",
        cursor: '""',
        page_size: 10,
      };
      const exampleResponse = {
        binding_id: "DCN249237197572VU",
        first_mile_tracking_number: "ZJS1729224232",
        status: "ORDER_RECEIVED",
        declare_date: "2024-10-18",
        more: false,
        next_cursor: '""',
        order_list: [
          {
            order_sn: "2410106R6X5Q85",
            package_number: "OFG182232162204802",
            sls_tracking_number: 1,
            pick_up_done: false,
            arrived_transit_warehouse: false,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCourierDeliveryDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCourierDeliveryTrackingNumberList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        from_date: "2024-10-01",
        to_date: "2024-10-28",
        page_size: 10,
        cursor: '""',
      };
      const exampleResponse = {
        tracking_number_list: [
          {
            binding_id: "DCN248699144540RU",
            first_mile_tracking_number: "ZJS1729224232",
            status: "ORDER_RECEIVED",
            reason: '""',
            declare_date: "2024-10-18",
          },
        ],
        more: false,
        next_cursor: '""',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCourierDeliveryTrackingNumberList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_tracking_number_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCourierDeliveryWaybill", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        binding_id_list: ["DCN248699144540RU"],
      };
      const exampleResponse = {
        waybill_list: [
          {
            binding_id: "DCN248699144540RU",
            shipping_label_url:
              "http://api.kuaidi100.com/label/getImage/20240620/AE6449DBB3FF4E7F80A36EA1A0DF17E2",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCourierDeliveryWaybill(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_courier_delivery_waybill",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        first_mile_tracking_number: "CNF731738838434210105",
        cursor: '""',
      };
      const exampleResponse = {
        logistics_channel_id: 813,
        first_mile_tracking_number: "CNF731738838434210105",
        shipment_method: "pickup",
        status: "PICKED_UP",
        declare_date: "2020-05-19",
        more: false,
        order_list: [
          {
            order_sn: "20012328KKGVR0",
            package_number: "25333320394471234567",
            sls_tracking_number: 1,
            pick_up_done: false,
            arrived_transit_warehouse: false,
          },
        ],
        next_cursor: '"100"',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTrackingNumberList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        from_date: "2020-01-01",
        to_date: "2020-12-29",
        page_size: 10,
        cursor: '""',
      };
      const exampleResponse = {
        more: true,
        first_mile_tracking_number_list: [
          {
            first_mile_tracking_number: "CNF373799546176200109",
            status: "NOT_AVAILABLE",
            declare_date: "2020-01-09",
          },
        ],
        next_cursor: '"10"',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTrackingNumberList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_tracking_number_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTransitWarehouseList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        region: "CN",
        shipment_method: "pickup",
      };
      const exampleResponse = {
        transit_warehouse_list: [
          {
            warehouse_id: "ECP03",
            warehouse_name_en: "Shopee Quanzhou Transit Warehouse",
            warehouse_name_cn: "Shopee泉州仓",
            warehouse_type: 0,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTransitWarehouseList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_transit_warehouse_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getUnbindOrderList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        cursor: '""',
        page_size: 10,
        response_optional_fields: "logistics_status,package_number",
      };
      const exampleResponse = {
        more: false,
        order_list: [
          {
            order_sn: "201224EM1FMFG1",
            package_number: "91238191238123",
            logistics_status: "LOGISTICS_PICKUP_DONE",
          },
        ],
        next_cursor: '"10"',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getUnbindOrderList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_unbind_order_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWaybill", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        first_mile_tracking_number_list: ["CNF880344919515201212"],
      };
      const exampleResponse = {
        waybill: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWaybill(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/get_waybill",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("unbindFirstMileTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        first_mile_tracking_number: "CNF918114805245200519",
        order_list: [
          {
            order_sn: "20042025DAD68U",
            package_number: "2332058284081153446",
          },
        ],
      };
      const exampleResponse = {
        first_mile_tracking_number: "CNF918114805245200519",
        order_list: [
          {
            order_sn: "2004239MRBBFPJ",
            package_number: "2332058284081153446",
            fail_error: "firstmile.invalid_order_status",
            fail_message: "The status of order(order_sn: 2004239MRBBFPJ) is invalid.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.unbindFirstMileTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/unbind_first_mile_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("unbindFirstMileTrackingNumberAll", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_list: [
          {
            order_sn: "2410215AMTPJ2N",
            package_number: "OFG183183235200317",
          },
        ],
      };
      const exampleResponse = {
        success_list: [
          {
            order_sn: "2410215AMTPJ2N",
            package_number: "OFG183183235200317",
            binding_id: "DCN240065737910MU",
            first_mile_tracking_number: "test_string",
          },
        ],
        fail_list: [
          {
            order_sn: "241023AX7W8DMY",
            package_number: "OFG173184901200180",
            fail_error: "firstmile.order_not_exist",
            fail_message: "Order is not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.unbindFirstMileTrackingNumberAll(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/first_mile/unbind_first_mile_tracking_number_all",
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
