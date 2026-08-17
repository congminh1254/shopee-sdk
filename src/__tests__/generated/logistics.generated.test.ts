import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { LogisticsManager } from "../../managers/logistics.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("LogisticsManager (Generated Tests)", () => {
  let manager: LogisticsManager;
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
    manager = new LogisticsManager(mockConfig);
  });

  describe("batchShipOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_list: [
          {
            order_sn: "201212DCXHJUIKJ",
            package_number: "test_string",
          },
        ],
        pickup: {
          address_id: 123,
          pickup_time_id: "test_string",
          tracking_number: "test_string",
        },
        dropoff: {
          branch_id: 0,
          sender_real_name: "test_string",
          tracking_number: "test_string",
        },
        non_integrated: {
          tracking_number: "test_string",
        },
      };
      const exampleResponse = {
        result_list: [
          {
            order_sn: "test_string",
            package_number: "test_string",
            fail_error: "test_string",
            fail_message: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchShipOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/batch_ship_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchUpdateTpfWarehouseTrackingStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        tpf_name: "Shopee 3PF",
        tpf_tracking_status: "3pf_warehouse_outbound_done",
        package_list: [
          {
            order_sn: "2003160SXK2A3T",
            package_number: "OFG38027870177402",
            update_time: 1610000000,
          },
        ],
      };
      const exampleResponse = {
        success_list: [
          {
            order_sn: "2003160SXK2A3T",
            package_number: "OFG38027870177402",
          },
        ],
        fail_list: [
          {
            order_sn: "201214JASXYXY6",
            package_number: "OFG134731496217591",
            fail_error: "common.error_server",
            fail_message: "Something wrong. Please try later.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchUpdateTpfWarehouseTrackingStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/batch_update_tpf_warehouse_tracking_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("checkPolygonUpdateStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        task_id: "test_task_id",
      };
      const exampleResponse = {
        status: 0,
        message: "task completed",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.checkPolygonUpdateStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/check_polygon_update_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createBookingShippingDocument", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_list: [
          {
            booking_sn: "201201E81SYYKE",
            tracking_number: "SPXID02742637123B",
            shipping_document_type: "NORMAL_AIR_WAYBILL",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            booking_sn: "201201E81SYYKE",
            fail_error: "logistics.booking_not_exist",
            fail_message: "The booking_sn 201201V81SYYDG you provided is not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createBookingShippingDocument(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/create_booking_shipping_document",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createShippingDocument", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_list: [
          {
            order_sn: "201118BCKPJQQ8",
            package_number: "2485710696837122445",
            tracking_number: "SPXID02742637123B",
            shipping_document_type: "NORMAL_AIR_WAYBILL",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            order_sn: "201118BCKPJQQ8",
            package_number: "2485710696837122445",
            fail_error: "logistics.order_not_exist",
            fail_message: "The order_sn 201118BCKPJKW0 you provided is not exist. Please check",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createShippingDocument(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/create_shipping_document",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createShippingDocumentJob", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shipping_document_type: "THERMAL_UNPACKAGED_LABEL",
        unpackaged_sku_requests: [
          {
            unpackaged_sku_id: "844091087_11192347",
            quantity: 10,
          },
        ],
        package_list: ["test_string"],
      };
      const exampleResponse = {
        job_id: "SDK0001_a86148a97a6e04ce2ed468968de344b7",
        success_id_list: ["844091087_11192347"],
        fail_list: [
          {
            id: "844091087_11192342",
            fail_error: "error_param",
            fail_message:
              "Wrong parameters, detail: This Unpackaged SKU ID is not eligible for printing. Reason: Invalid SKU ID.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createShippingDocumentJob(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/create_shipping_document_job",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteAddress", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        address_id: 14278,
      };
      const exampleResponse = {
        request_id: "KweCvVFAzQPRcmSDEoDfqpVWQyJrAUsW",
        error: "test_string",
        message: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteAddress(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/delete_address",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteSpecialOperatingHour", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        name: "3.3 Campaign",
      };
      const exampleResponse = {
        error: "common.error_auth",
        message: "Invalid access_token.",
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteSpecialOperatingHour(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/delete_special_operating_hour",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadBookingShippingDocument", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shipping_document_type: "NORMAL_AIR_WAYBILL",
        booking_list: [
          {
            booking_sn: "201201E81SYYKE",
          },
        ],
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

      const result = await manager.downloadBookingShippingDocument(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/download_booking_shipping_document",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadShippingDocument", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shipping_document_type: "NORMAL_AIR_WAYBILL",
        order_list: [
          {
            order_sn: "201118BCKPJQQ8",
            package_number: "2485710696837122445",
          },
        ],
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

      const result = await manager.downloadShippingDocument(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/download_shipping_document",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadShippingDocumentJob", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        job_id: "SDK0001_a86148a97a6e04ce2ed468968de344b7",
      };
      const exampleResponse = {
        file: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.downloadShippingDocumentJob(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/download_shipping_document_job",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadToLabel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        sorting_group: 1,
        quantity: 1,
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

      const result = await manager.downloadToLabel(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/download_to_label",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAddressList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        show_pickup_address: false,
        address_list: [
          {
            address_id: 1173,
            region: "test_string",
            state: "test_string",
            city: "test_string",
            address: "test_string",
            zipcode: "test_string",
            district: "test_string",
            town: "test_string",
            address_type: "DEFAULT_ADDRESS,PICK_UP_ADDRESS",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAddressList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_address_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingShippingDocumentDataInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn: "201201E81SYYKE",
        recipient_address_info: [
          {
            key: "name",
            style: {
              text_style: ["bold", "italic"],
              font_size: 12,
              text_color: "#39c5bb",
              image_width: 3,
              h_align: "center",
            },
          },
        ],
      };
      const exampleResponse = {
        recipient_address_info: {
          key: "name",
          image: "data:image/png;base64,/9j/4AAQSkZJRgABAgEASABIAAD/……",
        },
        shipping_document_info: {
          booking_weight: 500,
          logistics_channel_id: 28016,
          shipping_carrier: "Standard Delivery",
          recipient_sort_code: {
            first_recipient_sort_code: "B-151-ATP-ATP-010",
            second_recipient_sort_code: "test_string",
            third_recipient_sort_code: "SAN ROQUE 009",
          },
          sender_sort_code: {
            first_sender_sort_code: "test_string",
            second_sender_sort_code: "test_string",
            third_sender_sort_code: "test_string",
          },
          return_sort_code: {
            return_first_sort_code: "RTS-FM-MAN",
          },
          tracking_number: "MY200448706479IT",
          pickup_hub: "test_string",
          delivery_hub: "test_string",
          deliver_area: "SAN ROQUE 009",
          ec_booking_no: "test_string",
          create_date_ymd_sl: "2022/12/05",
          manufacturers_name: "test_string",
          manufacturers_website: "test_string",
          is_lm_dg_bool: 0,
          spx_sub_district: "test_string",
          spx_receive_station: {
            spx_first_receive_station: "test_string",
          },
          zone: "test_string",
          zone_code: "test_string",
          destination_base_code: "test_string",
          dg_specific_type: 0,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingShippingDocumentDataInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_shipping_document_data_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingShippingDocumentParameter", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_list: [
          {
            booking_sn: "201201E81SYYKE",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            booking_sn: "201201E81SYYKE",
            suggest_shipping_document_type: "THERMAL_AIR_WAYBILL",
            selectable_shipping_document_type: ["THERMAL_AIR_WAYBILL"],
            fail_error: "logistics.booking_not_exist",
            fail_message: "The booking_sn 201201V81SYYDG you provided is not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingShippingDocumentParameter(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_shipping_document_parameter",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingShippingDocumentResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_list: [
          {
            booking_sn: "201201E81SYYKE",
            shipping_document_type: "NORMAL_AIR_WAYBILL",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            booking_sn: "201201E81SYYKE",
            status: "READY",
            fail_error: "logistics.booking_not_exist",
            fail_message: "The booking_sn 201201V81SYYDG you provided is not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingShippingDocumentResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_shipping_document_result",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingShippingParameter", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn: "201214JASXYXY6",
      };
      const exampleResponse = {
        info_needed: {
          dropoff: ["test_string"],
          pickup: ["address_id", "pickup_time_id"],
        },
        pickup: {
          address_list: [
            {
              address_id: 234,
              region: "SG",
              state: "Sarawak",
              city: "test_string",
              district: "test_string",
              town: "haha",
              address: "test_string",
              zipcode: "50003",
              address_flag: ["test_string"],
              time_slot_list: [
                {
                  date: "test_string",
                  time_text: "test_string",
                  pickup_time_id: "test_string",
                  flags: ["recommended"],
                  error: "test_string",
                  msg: "test_string",
                },
              ],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingShippingParameter(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_shipping_parameter",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingTrackingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn: "201201E81SYYKE",
      };
      const exampleResponse = {
        booking_sn: "201214JASXYXY6",
        logistics_status: "LOGISTICS_REQUEST_CREATED",
        tracking_info: [
          {
            update_time: 1587375600,
            description: "Your parcel is ready to ship from the seller",
            logistics_status: "PICKED_UP",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingTrackingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_tracking_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn: "201201E81SYYKE",
      };
      const exampleResponse = {
        request_id: "a8e1b94f51d64540bf5762abe7783073",
        error: "common.error_auth",
        message: "Invalid access_token.",
        tracking_number: "MY200448706479IT",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_booking_tracking_number",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getChannelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        logistics_channel_list: [
          {
            logistics_channel_id: 28016,
            logistics_channel_name: "VNPost Nhanh_product",
            cod_enabled: true,
            enabled: true,
            fee_type: "SIZE_INPUT",
            size_list: [
              {
                size_id: "0",
                name: "test_string",
                default_price: 123,
              },
            ],
            weight_limit: {
              item_max_weight: 10,
              item_min_weight: 0.01,
            },
            item_max_dimension: {
              height: 100,
              width: 100,
              length: 100,
              unit: "cm",
              dimension_sum: 280,
            },
            volume_limit: {
              item_max_volume: 10,
              item_min_volume: 1,
            },
            logistics_description: "test_string",
            force_enable: false,
            mask_channel_id: 0,
            block_seller_cover_shipping_fee: false,
            support_cross_border: false,
            seller_logistic_has_configuration: false,
            logistics_capability: {
              seller_logistics: false,
            },
            preprint: false,
            service_type_identifier: "instant",
            auto_call_driver_setting: {
              auto_call_driver_eligible: true,
              auto_call_driver_enabled: true,
              preparation_time: 10,
              preparation_time_limit: {
                min_preparation_time: 10,
                max_preparation_time: 30,
              },
            },
            support_pause: false,
            compulsory_channel: true,
            channel_relation_rules: [
              {
                related_enabled_channels: [123],
                related_dependent_block_channels: [123],
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

      const result = await manager.getChannelList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_channel_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMartPackagingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        enable: true,
        dimension: {
          length: 15,
          width: 15,
          height: 15,
        },
        packaging_fee: {
          value: 100,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMartPackagingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_mart_packaging_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMassShippingParameter", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        logistics_channel_id: 50021,
        product_location_id: '"VN0002BIZ"',
        package_list: [
          {
            package_number: "OFG188728166212046",
          },
        ],
      };
      const exampleResponse = {
        info_needed: {
          dropoff: ["test_string"],
          pickup: ["address_id", "pickup_time_id"],
          non_integrated: ["test_string"],
        },
        dropoff: {
          branch_list: [
            {
              branch_id: 123,
              region: "test_string",
              state: "test_string",
              city: "test_string",
              address: "test_string",
              zipcode: "test_string",
              district: "test_string",
              town: "test_string",
            },
          ],
        },
        pickup: {
          address_list: [
            {
              address_id: 123,
              region: "test_string",
              state: "test_string",
              city: "test_string",
              district: "test_string",
              town: "test_string",
              address: "test_string",
              zipcode: "test_string",
              address_flag: ["test_string"],
              time_slot_list: [
                {
                  date: "test_string",
                  time_text: "test_string",
                  pickup_time_id: "test_string",
                  flags: ["recommended"],
                },
              ],
            },
          ],
        },
        success_list: [
          {
            package_number: "test_string",
          },
        ],
        fail_list: [
          {
            package_number: "test_string",
            fail_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMassShippingParameter(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_mass_shipping_parameter",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMassTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        package_list: [
          {
            package_number: "test_string",
          },
        ],
        response_optional_fields: "first_mile_tracking_number",
      };
      const exampleResponse = {
        success_list: [
          {
            package_number: "test_string",
            tracking_number: "MY200448706479IT",
            plp_number: "test_string",
            first_mile_tracking_number: "CNF877146678717210312",
            last_mile_tracking_number: "200448706479IT",
            hint: "Buyers CVS closed， waiting for buyer to reselect another CVS stores，auto cancel time 2021-01-01",
            pickup_code: "test_string",
          },
        ],
        fail_list: [
          {
            package_number: "test_string",
            fail_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMassTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_mass_tracking_number",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOperatingHourRestrictions", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        regular_operating_hour_restrictions: {
          minimum_working_days_in_week: 5,
          working_day_config: {
            monday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            tuesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            wednesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            thursday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            friday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            saturday: {
              mandatory: false,
              minimum_operating_hour: 0,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            sunday: {
              mandatory: false,
              minimum_operating_hour: 0,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            public_holiday: {
              mandatory: false,
              minimum_operating_hour: 0,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
          },
        },
        instant_operating_hour_restrictions: {
          minimum_working_days_in_week: 5,
          working_day_config: {
            monday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            tuesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            wednesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            thursday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            friday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            saturday: {
              mandatory: false,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            sunday: {
              mandatory: false,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            public_holiday: {
              mandatory: false,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
          },
        },
        special_operating_hour_restrictions: {
          special_day: {
            mandatory: false,
            minimum_operating_hour: 6,
            minimum_start_time: "07:00",
            maximum_start_time: "10:00",
            minimum_end_time: "16:00",
            maximum_end_time: "21:00",
            operating_24_hour_toggle: false,
          },
        },
        shop_collection_operating_hour_restrictions: {
          minimum_working_days_in_week: 5,
          working_day_config: {
            monday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            tuesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: "false",
            },
            wednesday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            thursday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            friday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            saturday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            sunday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
            public_holiday: {
              mandatory: true,
              minimum_operating_hour: 6,
              minimum_start_time: "07:00",
              maximum_start_time: "10:00",
              minimum_end_time: "16:00",
              maximum_end_time: "21:00",
              operating_24_hour_toggle: false,
            },
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOperatingHourRestrictions(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_operating_hour_restrictions",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOperatingHours", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
        error: "error_auth",
        message: "Invalid access_token.",
        repsonse: {
          regular_operating_hour: {
            monday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            tuesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            wednesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            thursday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            friday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            saturday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            sunday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            public_holiday: {
              start_time: "09:00",
              end_time: "18:30",
            },
          },
          instant_operating_hour: {
            monday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            tuesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            wednesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            thursday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            friday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            saturday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            sunday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            public_holiday: {
              start_time: "09:00",
              end_time: "18:30",
            },
          },
          special_operating_hour: {
            name: "9.9 Campaign",
            start_date: "YYYY-MM-DD",
            end_date: "YYYY-MM-DD",
            operating_hours: [
              {
                date: "YYYY-MM-DD",
                start_time: "09:00",
                end_time: "18:30",
                enable: false,
              },
            ],
          },
          shop_collection_operating_hour: {
            monday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            tuesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            wednesday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            thursday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            friday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            saturday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            sunday: {
              start_time: "09:00",
              end_time: "18:30",
            },
            public_holiday: {
              start_time: "09:00",
              end_time: "18:30",
            },
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOperatingHours(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_operating_hours",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPauseStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        is_paused: true,
        pause_end_time: "test_string",
        remaining_pause_quota: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPauseStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_pause_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingDocumentDataInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201224EM1FMFG1",
        package_number: "9087129345",
        recipient_address_info: [
          {
            key: "name",
            style: {
              text_style: ["bold", "italic"],
              font_size: 12,
              text_color: "#39c5bb",
              image_width: 3,
              h_align: "center",
            },
          },
        ],
      };
      const exampleResponse = {
        recipient_address_info: {
          key: "name",
          image: "data:image/png;base64,/9j/4AAQSkZJRgABAgEASABIAAD/……",
        },
        shipping_document_info: {
          cod: true,
          cod_amount: "185",
          order_weight: 500,
          logistics_channel_id: 28016,
          shipping_carrier: "Standard Delivery",
          service_code: "SHP",
          first_mile_name: "MYF3",
          last_mile_name: "MYL1",
          goods_to_declare: true,
          lane_code: "S-MY03",
          warehouse_address:
            "China Guangdong Shenzhen 1/F, Building 8,Tangtou industrial District ,Shiyan street ,baoan district",
          warehouse_id: "TWS01",
          recipient_sort_code: {
            first_recipient_sort_code: "B-151-ATP-ATP-010",
            second_recipient_sort_code: "test_string",
            third_recipient_sort_code: "SAN ROQUE 009",
          },
          sender_sort_code: {
            first_sender_sort_code: "test_string",
            second_sender_sort_code: "test_string",
            third_sender_sort_code: "test_string",
          },
          return_sort_code: {
            return_first_sort_code: "RTS-FM-MAN",
          },
          third_party_logistic_info: {
            service_description: "test_string",
            barcode: "test_string",
            purchase_time: "test_string",
            return_time: "test_string",
            manufacturers_name: "test_string",
            manufacturers_website: "test_string",
            recipient_area: "test_string",
            route_step: "test_string",
            suda5_code: "test_string",
            large_logistics_id: "test_string",
            parent_id: "test_string",
            return_cycle: "test_string",
            return_mode: "test_string",
            prompt: "test_string",
            order_sn: "test_string",
            qrcode: "test_string",
            ec_supplier_name: "test_string",
            ec_bar_code16: "test_string",
            equipment_id: "test_string",
            eshop_id: "test_string",
            ec_bar_code9: "test_string",
            pelican_tracking_no: "test_string",
            print_date: "test_string",
            pzip: "test_string",
            pzip_c: "test_string",
            deliver_area_txt: "test_string",
            deliver_date_ymd: "test_string",
            sd_driver_code: "test_string",
            md_driver_code: "test_string",
            putorder_stackzone_code: "test_string",
            customer_code: "test_string",
            deliver_router: "test_string",
            store_type: "test_string",
            pick_router: "test_string",
            barcode_dc: "test_string",
            ec_order_number: "test_string",
            barcode_pr: "test_string",
            first_pick_barcode: "test_string",
            second_pick_barcode: "test_string",
            is_cod_bool: "test_string",
            receiver_name: "test_string",
            rcv_store_name: "test_string",
            branch_code: "test_string",
            branch_name: "test_string",
            last_third_digits_recipient_phone: "test_string",
            last_third_digits_sender_phone: "test_string",
            barcode_no1: "test_string",
            barcode_no2: "test_string",
            print_datetime: "test_string",
            ok_mid_type: "test_string",
            ok_aisle_no: "test_string",
            ok_grid_no: "test_string",
            ok_tracking_number: "test_string",
            barcode_no3: "test_string",
            ship_type: "test_string",
            area: "test_string",
            barcode_no4: "test_string",
            barcode_no5: "test_string",
            tw_last_three_digits_buyer_phone: "678",
            tw_store_name: "聯合門市",
            tw_store_number: "214559",
            buyer_prefer_delivery_time: {
              slot_id: "4",
              start_time: "10:00",
              end_time: "17:00",
              description: "住家：本人收货",
            },
          },
          tracking_number: "MY200448706479IT",
          shopee_tracking_number: "MY200448706479IT",
          last_mile_tracking_number: "test_string",
          pickup_hub: "test_string",
          delivery_hub: "test_string",
          deliver_area: "SAN ROQUE 009",
          ec_order_no: "test_string",
          create_date_ymd_sl: "2022/12/05",
          manufacturers_name: "test_string",
          manufacturers_website: "test_string",
          is_lm_dg_bool: 0,
          preferred_delivery_option: 1,
          spx_sub_district: "test_string",
          spx_receive_station: {
            spx_first_receive_station: "test_string",
          },
          zone: "test_string",
          zone_code: "test_string",
          destination_base_code: "test_string",
          last_third_digits_buyer_phone: "test_string",
          parcel_size: "test_string",
          sod: false,
          buyer_cpf_id: "test_string",
          mutual_check: 1,
          dely_fri_label: "L",
          dely_sat_label: "M",
          dely_sun_label: "H",
          pickup_code: "test_string",
          sorting_group: "test_string",
          unpackaged_sku_id: "test_string",
          unpackaged_sku_id_qrcode: "test_string",
          high_value: true,
          dg_specific_type: 1,
          hotspot_id: "HS-BSC-01",
          weekend1_delivery_success_label: "H",
          weekend2_delivery_success_label: "M",
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingDocumentDataInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_document_data_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingDocumentJobStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        job_id: "SDK0001_a86148a97a6e04ce2ed468968de344b7",
      };
      const exampleResponse = {
        job_id: "SDK0001_a86148a97a6e04ce2ed468968de344b7",
        job_name: "SKU ID (Thermal).*0.pdf",
        job_status: "READY",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingDocumentJobStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_document_job_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingDocumentParameter", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_list: [
          {
            order_sn: "201201E81SYYKE",
            package_number: "60489687088750",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            order_sn: "201201E81SYYKE",
            package_number: "60489687088750",
            suggest_shipping_document_type: "THERMAL_AIR_WAYBILL",
            selectable_shipping_document_type: ["THERMAL_AIR_WAYBILL"],
            fail_error: "logistics.order_not_exist",
            fail_message: "The order_sn 201201V81SYYDG you provided is not exist. Please check",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingDocumentParameter(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_document_parameter",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingDocumentResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_list: [
          {
            order_sn: "201118BCKPJQQ8",
            package_number: "2485710696837122445",
            shipping_document_type: "NORMAL_AIR_WAYBILL",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            order_sn: "201118BCKPJQQ8",
            package_number: "2485710696837122445",
            status: "READY",
            fail_error: "test_string",
            fail_message: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingDocumentResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_document_result",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingParameter", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201214JASXYXY6",
        package_number: "OFG134731496217591",
      };
      const exampleResponse = {
        info_needed: {
          dropoff: ["test_string"],
          pickup: ["address_id", "pickup_time_id"],
          non_integrated: ["test_string"],
        },
        dropoff: {
          branch_list: [
            {
              branch_id: 123,
              region: "SG",
              state: "test_string",
              city: "Asajaya",
              address: "test_string",
              zipcode: "test_string",
              district: "Sarawak",
              town: "test_string",
            },
          ],
          slug_list: [
            {
              slug: "test_string",
              slug_name: "test_string",
            },
          ],
        },
        pickup: {
          address_list: [
            {
              address_id: 234,
              region: "SG",
              state: "Sarawak",
              city: "test_string",
              district: "test_string",
              town: "haha",
              address: "test_string",
              zipcode: "50003",
              address_flag: ["test_string"],
              time_slot_list: [
                {
                  date: 1608103685,
                  time_text: "test_string",
                  pickup_time_id: "test_string",
                  flags: ["recommended"],
                },
              ],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingParameter(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_shipping_parameter",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTrackingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "2409177JCSRTEU",
        package_number: "test_string",
      };
      const exampleResponse = {
        order_sn: "2409177JCSRTEU",
        package_number: "test_string",
        logistics_status: "LOGISTICS_DELIVERY_FAILED",
        tracking_info: [
          {
            update_time: 1726561500,
            description: "包裹正退回物流中心",
            logistics_status: "FAILED_DELIVERED",
            return_code: "1234",
          },
        ],
        collection_pin_code: "562891",
        reversed_tracking_number: "SG246907296501CU",
        reversed_courier_name: "SPX Express",
        reversed_tracking_info: [
          {
            update_time: 1729842624,
            description: "当地仓库已备货，包裹准备发运",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTrackingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_tracking_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTrackingNumber", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201214JASXYXY6",
        package_number: "test_string",
        response_optional_fields: "first_mile_tracking_number",
      };
      const exampleResponse = {
        tracking_number: "MY200448706479IT",
        plp_number: "test_string",
        first_mile_tracking_number: "CNF877146678717210312",
        last_mile_tracking_number: "200448706479IT",
        hint: "Buyers CVS closed， waiting for buyer to reselect another CVS stores，auto cancel time 2021-01-01",
        pickup_code: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTrackingNumber(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/get_tracking_number",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("massShipOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        logistics_channel_id: 50021,
        product_location_id: "test_string",
        package_list: [
          {
            package_number: "test_string",
          },
        ],
        pickup: {
          address_id: 123,
          pickup_time_id: "test_string",
        },
        dropoff: {
          branch_id: 0,
          sender_real_name: "test_string",
          tracking_number: "test_string",
        },
        non_integrated: {
          tracking_number: [
            {
              package_number: "test_string",
              tracking_number: "test_string",
            },
          ],
        },
      };
      const exampleResponse = {
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
        error: "error_auth",
        message: "Invalid access_token.",
        success_list: [
          {
            package_number: "test_string",
          },
        ],
        fail_list: [
          {
            package_number: "test_string",
            fail_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.massShipOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/mass_ship_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setAddressConfig", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        show_pickup_address: true,
        address_type_config: {
          address_id: 1234,
          address_type: "PICKUP_ADDRESS,RETURN_ADDRESS",
        },
      };
      const exampleResponse = {
        request_id: "KweCvVFAzQPRcmSDEoDfqpVWQyJrAUsW",
        error: "error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setAddressConfig(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/set_address_config",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setMartPackagingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        enable: true,
        dimension: {
          length: 15,
          width: 15,
          height: 15,
        },
        packaging_fee: {
          value: 100,
        },
      };
      const exampleResponse = {
        enable: true,
        dimension: {
          length: 15,
          width: 15,
          height: 15,
        },
        packaging_fee: {
          value: 100,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setMartPackagingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/set_mart_packaging_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setPauseStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        is_paused: true,
      };
      const exampleResponse = {
        is_paused: true,
        pause_end_time: "test_string",
        remaining_pause_quota: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setPauseStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/set_pause_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("shipBooking", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn: "201214JASXYXY6",
        pickup: {
          address_id: 123,
          pickup_time_id: "test_string",
        },
        dropoff: "test_string",
      };
      const exampleResponse = {
        request_id: "2880a5a28510424eaa3288fd941fae2c",
        error: "error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.shipBooking(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/ship_booking",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("shipOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201212DCXHJUIKJ",
        package_number: "test_string",
        pickup: {
          address_id: 123,
          pickup_time_id: "test_string",
          tracking_number: "test_string",
        },
        dropoff: {
          branch_id: 0,
          sender_real_name: "test_string",
          tracking_number: "test_string",
          slug: "test_string",
        },
        non_integrated: {
          tracking_number: "test_string",
        },
      };
      const exampleResponse = {
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
        error: "error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.shipOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/ship_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateAddress", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        address_id: 123456,
        region: "Brazil",
        state: "SP",
        city: "São Paulo",
        district: "Pinheiros",
        town: "Rua dos Pinheiros",
        address: "123 Rua dos Pinheiros Apt 45",
        zipcode: "05422-001",
        name: "Carlos Silva",
        phone: "+55-11-91234-5678",
        geo_info: "test_string",
      };
      const exampleResponse = {
        error: "NOT_ALLOW_TO_EDIT_ADDRESS_REGION",
        message: "The param is invalid. not allow to edit address region.",
        request_id: "6745b892295d750abf83a29430510400",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateAddress(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_address",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateChannel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        logistics_channel_id: 14623,
        enabled: true,
        cod_enabled: true,
        auto_call_driver_setting: {
          auto_call_driver_enabled: true,
          preparation_time: 10,
        },
      };
      const exampleResponse = {
        shop_id: 123123,
        enabled: true,
        cod_enabled: false,
        logistics_channel_id: 14623,
        updated_channels: [
          {
            channel_id: 80025,
            channel_display_name: "channel Anteraja",
            unsupport_warehouse: [
              {
                warehouse_id: 78,
                warehouse_name: "ID_WHS_03",
              },
            ],
          },
        ],
        is_multi_warehouse: false,
        auto_call_driver_setting: {
          auto_call_driver_enabled: true,
          preparation_time: 10,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateChannel(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_channel",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateOperatingHours", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        regular_operating_hour: {
          monday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          tuesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          wednesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          thursday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          friday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          saturday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          sunday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          public_holiday: {
            start_time: "09:00",
            end_time: "18:30",
          },
        },
        special_operating_hour: {
          name: "3.3 Campaign",
          start_date: "2025-03-03",
          end_date: "2025-03-05",
          operating_hours: [
            {
              date: "2025-03-03",
              start_time: "00:00",
              end_time: "23:30",
              enable: true,
            },
          ],
        },
        instant_operating_hour: {
          monday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          tuesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          wednesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          thrusday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          friday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          saturday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          sunday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          public_holiday: {
            start_time: "09:00",
            end_time: "18:30",
          },
        },
        shop_collection_operating_hour: {
          monday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          tuesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          wednesday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          thursday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          friday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          saturday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          sunday: {
            start_time: "09:00",
            end_time: "18:30",
          },
          public_holiday: {
            start_time: "09:00",
            end_time: "18:30",
          },
        },
      };
      const exampleResponse = {
        result_list: [
          {
            regular_operating_hour: {
              status: "Success",
              fail_message: "test_string",
            },
            special_operating_hour: {
              status: "Success",
              fail_message: "test_string",
            },
            instant_operating_hour: {
              status: "Success",
              fail_message: "test_string",
            },
            shop_collection_operating_hour: {
              status: "Success",
              fail_message: "test_string",
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateOperatingHours(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_operating_hours",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateSelfCollectionOrderLogistics", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        package_number: "OFG211171863281841",
        self_collection_logistics_action: "order_collected",
        epoc_image_list: ["id-11134284-7r98o-mef6xcoiw1nt15"],
        pin: "123456",
      };
      const exampleResponse = {
        error: "error_auth",
        message: "Invalid access_token.",
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateSelfCollectionOrderLogistics(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_self_collection_order_logistics",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateShippingOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201214JASXYXY6",
        package_number: "test_string",
        pickup: {
          address_id: 126194,
          pickup_time_id: "439291",
        },
      };
      const exampleResponse = {
        request_id: "3dad66f43b8447d282ae6da36626c6b7",
        error: "error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateShippingOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_shipping_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateTrackingStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201212DCXHJUIKJ",
        tracking_number: "1234567890",
        tracking_url: "https://tracking_url_order_201212DCXHJUIKJ",
        logistics_status: "logistics_pickup_done",
        failed_reason: "buyer_unreachable",
      };
      const exampleResponse = {
        update_result: "succeed",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateTrackingStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/update_tracking_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadServiceablePolygon", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        file: "test_string",
      };
      const exampleResponse = {
        task_id: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadServiceablePolygon(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/logistics/upload_serviceable_polygon",
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
