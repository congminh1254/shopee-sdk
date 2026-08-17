import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { OrderManager } from "../../managers/order.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("OrderManager (Generated Tests)", () => {
  let manager: OrderManager;
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
    manager = new OrderManager(mockConfig);
  });

  describe("cancelOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201020SQQ5K2EP",
        cancel_reason: "OUT_OF_STOCK",
        item_list: [
          {
            item_id: 123,
            model_id: 123,
          },
        ],
        partial_cancel_item_list: [
          {
            item_id: 1680783,
            model_id: 327890123,
            order_item_id: 123,
            promotion_group_id: 123,
            model_quantity: 2,
          },
        ],
      };
      const exampleResponse = {
        update_time: 1603184533,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.cancelOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/cancel_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadFbsInvoices", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        request_id_list: [
          {
            request_id: [123, 234, 345],
          },
        ],
      };
      const exampleResponse = {
        request_id: 123,
        file_link: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.downloadFbsInvoices(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/download_fbs_invoices",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("downloadInvoiceDoc", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201218V2Y6E59M",
      };
      const exampleResponse = {
        invoice_doc: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.downloadInvoiceDoc(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/download_invoice_doc",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("generateFbsInvoices", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        batch_download: {
          start: 20250601,
          end: 20250601,
          document_type: 1,
          file_type: 123,
          document_status: 123,
        },
      };
      const exampleResponse = {
        error: 123,
        error_msg: "test_string",
        result_list: [
          {
            request_id: 123,
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

      const result = await manager.generateFbsInvoices(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/generate_fbs_invoices",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        booking_sn_list: ["201214JAJXU6G7", "201214JASXYXY6"],
        response_optional_fields: "total_amount",
      };
      const exampleResponse = {
        booking_list: [
          {
            booking_sn: "201214JASXYXY6",
            order_sn: "201218V2Y6E59M",
            region: "MY",
            booking_status: "CANCELLED",
            match_status: "MATCH_PENDING",
            shipping_carrier: "Standard Delivery",
            create_time: 1607930885,
            update_time: 1608134691,
            ship_by_date: 1608103685,
            recipient_address: {
              name: "Max",
              phone: "3828203",
              town: "Sara",
              district: "Dada",
              city: "Asajaya",
              state: "Sarawak",
              region: "MY",
              zipcode: "40009",
              full_address: "C-15-14 BLOK C JALAN 30/146, Asajaya, 40009, Sarawak",
            },
            item_list: [
              {
                item_id: 2600144043,
                item_name: "backpack",
                item_sku: "sku",
                model_id: 0,
                model_name: "test_string",
                model_sku: "test_string",
                model_quantity_purchased: 1,
                weight: 12,
                product_location_id: "test_string",
                image_info: {
                  image_url: "test_string",
                },
              },
            ],
            dropshipper: "test_string",
            dropshipper_phone: "test_string",
            cancel_by: "system",
            cancel_reason: "BACKEND_LOGISTICS_NOT_STARTED",
            fulfillment_flag: "fulfilled_by_shopee",
            pickup_done_time: 0,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_booking_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBookingList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        time_range_field: "create_time",
        time_from: 1607235072,
        time_to: 1608271872,
        page_size: 20,
        cursor: '""',
        booking_status: "READY_TO_SHIP",
      };
      const exampleResponse = {
        more: false,
        booking_list: [
          {
            booking_sn: "201218V2Y6E59M",
            order_sn: "201218V2Y6E59M",
            booking_status: "READY_TO_SHIP",
            next_cursor: "20",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBookingList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_booking_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBuyerInvoiceInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        queries: [
          {
            order_sn: "220314U0G6UNMN",
          },
        ],
      };
      const exampleResponse = {
        invoice_info_list: [
          {
            order_sn: "220314U0G6UNMN",
            invoice_type: "personal",
            invoice_detail: {
              name: "Tom Jerry",
              email: "tom.and.jerry@gmail.com",
              phone_number: "(+66) 828918689",
              tax_id: "1234567898",
              address: "GieŁdowa 4b, Długi Bród, 17200, PIĄTE PIĘTRO",
              id_card_address: "GieŁdowa 4b, Długi Bród, 17200, PIĄTE PIĘTRO",
              address_breakdown: {
                region: "Thailand",
                state: "Małopolskie",
                city: "Myślenicki",
                town: "Łęki",
                postcode: "17200",
                detailed_address: "GieŁdowa 4b",
                additional_info: "PIĄTE PIĘTRO",
                full_address: "GieŁdowa 4b, Łęki, 17200, PIĄTE PIĘTRO",
              },
              company_head_office: "yes",
              company_name: "Michal Orwinski S.C.",
              company_branch_name: "CIty A branch",
              company_branch_id: "123",
              company_type: "head office",
              company_email: "michal@shopee.com",
              company_tax_id: "123456789",
              company_address: "GieŁdowa 4b, Długi Bród, 17200, PIĄTE PIĘTRO",
              company_address_breakdown: {
                company_region: "Thailand",
                company_state: "Małopolskie",
                company_city: "Myślenicki",
                company_district: "Myślenice",
                company_town: "Łęki",
                company_postcode: "17200",
                company_detailed_address: "GieŁdowa 4b",
                company_additional_info: "PIĄTE PIĘTRO",
                company_full_address: "GieŁdowa 4b, Łęki, 17200, PIĄTE PIĘTRO",
              },
              household_address_breakdown: {
                household_region: "test_string",
                household_state: "test_string",
                household_city: "test_string",
                household_province: "test_string",
                household_district: "test_string",
                household_town: "test_string",
                household_barangay: "test_string",
                household_postcode: "test_string",
                household_detailed_address: "test_string",
                household_additional_info: "test_string",
                household_full_address: "test_string",
              },
              national_id: "test_string",
            },
            error: "order not found",
            is_requested: false,
          },
        ],
        request_id: "ZQKEZfwaNQUnMKqMmjWuRPybfshyFygV",
        error: "common.error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBuyerInvoiceInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_buyer_invoice_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getEstimateCancelValue", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "2012300NQJVTYN",
        partial_cancel_item_list: [
          {
            item_id: 1680783,
            model_id: 327890123,
            order_item_id: 123,
            promotion_group_id: 123,
            model_quantity: 2,
          },
        ],
      };
      const exampleResponse = {
        cancel_value_price: "1000",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getEstimateCancelValue(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_estimate_cancel_value",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getFbsInvoicesResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        request_id_list: [
          {
            request_id: [123, 234, 456],
          },
        ],
      };
      const exampleResponse = {
        error: 10001,
        error_msg: "Invalid access_token.",
        result_list: [
          {
            request_id: 123,
            file_name: "test.xlsx",
            status: "Available",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getFbsInvoicesResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_fbs_invoices_result",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOrderDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn_list: ["201214JAJXU6G7", "201214JASXYXY6"],
        request_order_status_pending: true,
        response_optional_fields: "total_amount",
      };
      const exampleResponse = {
        order_list: [
          {
            order_sn: "2404098R48U37H",
            region: "VN",
            currency: "VND",
            cod: false,
            total_amount: 1004,
            pending_terms: ["SYSTEM_PENDING", "KYC_PENDING"],
            pending_description: ["Order is being processed by Shopee"],
            order_status: "CANCELLED",
            shipping_carrier: "Standard Delivery",
            payment_method: "Bank Transfer",
            estimated_shipping_fee: 4,
            message_to_seller: "test_string",
            create_time: 1607930885,
            update_time: 1608134691,
            days_to_ship: 2,
            ship_by_date: 1608103685,
            buyer_user_id: 9193214,
            buyer_username: "Tom",
            recipient_address: {
              name: "Max",
              phone: "3828203",
              town: "Sara",
              district: "Dada",
              city: "Asajaya",
              state: "Sarawak",
              region: "MY",
              zipcode: "40009",
              full_address: "C-15-14 BLOK C JALAN 30/146, Asajaya, 40009, Sarawak",
              geolocation: {
                latitude: -23.567851,
                longitude: -46.6912611,
              },
            },
            actual_shipping_fee: 0,
            goods_to_declare: false,
            note: "haha",
            note_update_time: 1608103685,
            item_list: [
              {
                item_id: 2600144043,
                item_name: "backpack",
                item_sku: "sku",
                model_id: 0,
                model_name: "test_string",
                model_sku: "test_string",
                model_quantity_purchased: 1,
                model_original_price: 1000,
                model_discounted_price: 1000,
                wholesale: false,
                weight: 12,
                add_on_deal: false,
                main_item: false,
                add_on_deal_id: 0,
                promotion_type: "flash_sale",
                promotion_id: 0,
                order_item_id: 2600144043,
                line_item_id: 2600144043,
                promotion_group_id: 0,
                image_info: {
                  image_url: "test_string",
                },
                product_location_id: "test_string",
                is_prescription_item: true,
                error_in_fetching_is_prescription_item: true,
                consultation_id: "test_string",
                is_b2c_owned_item: true,
                promotion_list: [
                  {
                    promotion_type: "seller_discount",
                    promotion_id: 848474823,
                  },
                ],
                hot_listing_item: true,
                active_qty: 123,
                cancel_requested_qty: 123,
                cancelled_qty: 123,
                return_requested_qty: 123,
                returned_qty: 123,
              },
            ],
            pay_time: 1607930885,
            dropshipper: "test_string",
            dropshipper_phone: "test_string",
            split_up: false,
            buyer_cancel_reason: "test_string",
            cancel_by: "system",
            cancel_reason: "BACKEND_LOGISTICS_NOT_STARTED",
            actual_shipping_fee_confirmed: false,
            buyer_cpf_id: "test_string",
            fulfillment_flag: "fulfilled_by_shopee",
            pickup_done_time: 0,
            package_list: [
              {
                package_number: '"61630084074470"',
                logistics_status: "LOGISTICS_INVALID",
                logistics_channel_id: 18080,
                shipping_carrier: "Standard Delivery",
                allow_self_design_awb: false,
                item_list: [
                  {
                    item_id: 2600144043,
                    model_id: 0,
                    model_quantity: 1,
                    order_item_id: 2600144043,
                    promotion_group_id: 7850298,
                    product_location_id: "IDL",
                  },
                ],
                parcel_chargeable_weight: 123,
                group_shipment_id: 150654369130420,
                virtual_contact_number: "0928000886",
                package_query_number: "66668888",
                sorting_group: "North",
              },
            ],
            invoice_data: {
              number: "test_string",
              series_number: "test_string",
              access_key: "test_string",
              issue_date: "test_string",
              total_value: 123,
              products_total_value: 123,
              tax_code: "test_string",
              status: "valid",
              pending_reason: "test_string",
            },
            checkout_shipping_carrier: "Standard Delivery",
            reverse_shipping_fee: 123,
            order_chargeable_weight_gram: 123,
            prescription_check_status: 123,
            pharmacist_name: "test_string",
            prescription_images: "test_string",
            prescription_approval_time: "test_string",
            prescription_rejection_time: "test_string",
            prescription_reject_reason: "Insufficient prescription detail",
            is_buyer_shop_collection: true,
            buyer_proof_of_collection: ["test_string"],
            edt_from: "test_string",
            edt_to: "test_string",
            booking_sn: "2404098R48U37H",
            advance_package: true,
            return_request_due_date: "test_string",
            payment_info: [
              {
                payment_method: "Debit Card",
                payment_processor_register: "38.372.267/0001-82",
                card_brand: "VISA",
                transaction_id: "951679",
                payment_amount: 1004,
              },
            ],
            hot_listing_order: true,
            is_international: false,
            can_full_cancel_order: true,
            can_partial_cancel_order: false,
            buyer_preference_for_partial_cancellation: 1,
            affiliate_sample_type: 1,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOrderDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_order_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOrderList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        time_range_field: "create_time",
        time_from: 1607235072,
        time_to: 1608271872,
        page_size: 20,
        cursor: "test_string",
        order_status: "READY_TO_SHIP",
        response_optional_fields: "order_status",
        request_order_status_pending: true,
        logistics_channel_id: 91007,
      };
      const exampleResponse = {
        more: false,
        order_list: [
          {
            order_sn: "201218V2Y6E59M",
            order_status: "READY_TO_SHIP",
            booking_sn: "2404098R48U37H",
          },
        ],
        next_cursor: "20",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOrderList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_order_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPackageDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        package_number_list: ["OFG1156498731071468", "OFG199593509207187"],
      };
      const exampleResponse = {
        package_list: [
          {
            order_sn: "220831EGF1JMXF",
            package_number: "OFG1156498731071468",
            fulfillment_status: "LOGISTICS_READY",
            update_time: 1661950674,
            logistics_channel_id: 80008,
            shipping_carrier: "JNE Trucking (JTR) LPS",
            allow_self_design_awb: true,
            days_to_ship: 3,
            ship_by_date: 1662209873,
            pending_terms: ["SYSTEM_PENDING"],
            pending_description: ["Order is being processed by Shopee"],
            tracking_number: "test_string",
            tracking_number_expiration_date: 123,
            pickup_done_time: 123,
            is_split_up: false,
            item_list: [
              {
                item_id: 2200149592,
                model_id: 123,
                item_sku: "test_string",
                model_sku: "test_string",
                model_quantity: 1,
                order_item_id: 2200149592,
                promotion_group_id: 123,
                product_location_id: "test_string",
                consultation_id: "test_string",
                is_prescription_item: true,
                error_in_fetching_is_prescription_item: true,
                prescription_check_status: 123,
                prescription_reject_reason: "test_string",
              },
            ],
            recipient_address: {
              name: "b***r",
              phone: "******78",
              town: "****",
              district: "****",
              city: "****",
              state: "****",
              region: "****",
              zipcode: "****",
              full_address: "******11",
              geolocation: {
                latitude: -23.567851,
                longitude: -46.6912611,
              },
            },
            parcel_chargeable_weight_gram: 123,
            group_shipment_id: 123,
            virtual_contact_number: "test_string",
            package_query_number: "false",
            sorting_group: "North",
            is_shipment_arranged: false,
            status_info_tag: {
              tag_id: 0,
              timestamp: 0,
            },
            can_split_order: false,
            can_unsplit_order: false,
            is_pre_order: false,
            pharmacist_name: "test_string",
            prescription_images: "test_string",
            prescription_approval_time: "test_string",
            prescription_rejection_time: "test_string",
            is_buyer_shop_collection: true,
            buyer_proof_of_collection: ["test_string"],
            preparation_end_time: 1772276400,
            driver_info: {
              driver_name: "test_string",
              driver_phone: "test_string",
              vehicle_type: "test_string",
              license_plate: "test_string",
              courier_photo: "test_string",
              eta_start_time: 123,
              eta_end_time: 123,
              driver_status: "Driver is on the way",
            },
            can_full_cancel_order: true,
            can_partial_cancel_order: false,
            buyer_preference_for_partial_cancellation: 1,
            invoice_pending: {
              status: "test_string",
              pending_reason: "test_string",
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

      const result = await manager.getPackageDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_package_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPendingBuyerInvoiceOrderList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        cursor: '""',
        page_size: 10,
      };
      const exampleResponse = {
        more: false,
        next_cursor: '"20"',
        order_list: [
          {
            order_sn: "201218V2Y6E59M",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPendingBuyerInvoiceOrderList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_pending_buyer_invoice_order_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShipmentList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        cursor: '""',
        page_size: 20,
      };
      const exampleResponse = {
        order_list: [
          {
            order_sn: "2003160SXK2A3T",
            package_number: "38027870177402",
          },
        ],
        more: true,
        next_cursor: "20",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShipmentList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_shipment_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWarehouseFilterConfig", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        warehouse_filters: [
          {
            warehouse_name: "Warehouse1",
            warehouse_type: 1,
            product_location_id: "VN001GGYZ",
            address_id: 200000016,
            address: "167/2 Đ. Nguyễn Ảnh Thủ",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWarehouseFilterConfig(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_warehouse_filter_config",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("handleBuyerCancellation", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201016F6B94MQK",
        operation: "ACCEPT",
      };
      const exampleResponse = {
        update_time: 14981918191,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.handleBuyerCancellation(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/handle_buyer_cancellation",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("handlePrescriptionCheck", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "test_string",
        is_approved: true,
        reject_reason_code: 123,
        items: [
          {
            item_id: 123,
            model_id: 123,
            group_id: 123,
          },
        ],
        pharmacist_name: "test_string",
        free_text: "test_string",
      };
      const exampleResponse = {
        is_success: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.handlePrescriptionCheck(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/handle_prescription_check",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("searchPackageList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        filter: {
          package_status: 2,
          product_location_ids: ["VN0005EIZ"],
          logistics_channel_ids: [50021],
          fulfillment_type: 2,
          invoice_pending: false,
          sorting_group: 1,
          order_type: 0,
          is_pre_order: 0,
          shipping_priority: 0,
        },
        pagination: {
          page_size: 5,
          cursor: '""',
        },
        sort: {
          sort_type: 1,
          ascending: false,
        },
      };
      const exampleResponse = {
        packages_list: [
          {
            order_sn: '"250211UJM7EVM7"',
            package_number: '"OFG192947720204989"',
            logistics_channel_id: 50021,
            product_location_id: '"VN0005EIZ"',
            sorting_group: '"North"',
            is_shipment_arranged: false,
          },
        ],
        pagination: {
          total_count: 320,
          next_cursor: '"1730437200,184066343203459"',
          more: true,
        },
        sort: {
          sort_type: 1,
          is_asc: false,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.searchPackageList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/search_package_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setNote", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201224EM1FMFG1",
        note: "Thank you",
      };
      const exampleResponse = {
        request_id: "d66edb8e726d414eb874edda8fa43f4c",
        error: "common.error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setNote(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/set_note",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("splitOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "2012300NQJVTYN",
        package_list: [
          {
            item_list: [
              {
                item_id: 3600140554,
                model_id: 10000605797,
                order_item_id: 123,
                promotion_group_id: 123,
                model_quantity: 2,
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        order_sn: "2012300NQJVTYN",
        package_list: [
          {
            package_number: "2521728636547073446",
            item_list: [
              {
                item_id: 3600140567,
                model_id: 2000502199,
                order_item_id: 123,
                promotion_group_id: 123,
                model_quantity: 123,
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

      const result = await manager.splitOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/split_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("unsplitOrder", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "2012312AVA7HVN",
      };
      const exampleResponse = {
        error: "common.error_auth",
        message: "Invalid access_token.",
        request_id: "a081e75eb44346caa3d11c8bba5143de",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.unsplitOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/unsplit_order",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadInvoiceDoc", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "201218V2Y6E59M",
        file_type: 1,
        file: "test_string",
      };
      const exampleResponse = {
        request_id: "b937c04e554847789cbf3fe33a0ad5f1",
        error: "common.error_auth",
        message: "Invalid access_token.",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadInvoiceDoc(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/upload_invoice_doc",
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
