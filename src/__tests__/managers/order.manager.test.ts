import { jest } from "@jest/globals";
import { OrderManager } from "../../managers/order.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetOrderListResponse,
  GetOrdersDetailResponse,
  GetShipmentListResponse,
  SplitOrderResponse,
  UnsplitOrderResponse,
  CancelOrderResponse,
  GetBuyerInvoiceInfoResponse,
  SetNoteResponse,
  GetPackageDetailResponse,
  HandleBuyerCancellationResponse,
  SearchPackageListResponse,
  GetPendingBuyerInvoiceOrderListResponse,
  HandlePrescriptionCheckResponse,
  DownloadInvoiceDocResponse,
  UploadInvoiceDocResponse,
  GetBookingDetailResponse,
  GetBookingListResponse,
  GetWarehouseFilterConfigResponse,
  DownloadFbsInvoicesResponse,
  GenerateFbsInvoicesResponse,
  GetFbsInvoicesResultResponse,
} from "../../schemas/order.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("OrderManager", () => {
  let orderManager: OrderManager;
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

    orderManager = new OrderManager(mockConfig);
  });

  describe("getOrderList", () => {
    it("should get order list with required parameters", async () => {
      const mockResponse: GetOrderListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          order_list: [
            {
              order_sn: "220101000000001",
              order_status: "READY_TO_SHIP",
              update_time: 1640995200,
            },
            {
              order_sn: "220101000000002",
              order_status: "COMPLETED",
              update_time: 1640995300,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getOrderList({
        time_range_field: "create_time",
        time_from: 1640908800,
        time_to: 1640995200,
        page_size: 20,
        cursor: "",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_order_list", {
        method: "GET",
        auth: true,
        params: {
          time_range_field: "create_time",
          time_from: 1640908800,
          time_to: 1640995200,
          page_size: 20,
          cursor: "",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should get order list with status filter", async () => {
      const mockResponse: GetOrderListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          order_list: [
            {
              order_sn: "220101000000003",
              order_status: "READY_TO_SHIP",
              update_time: 1640995200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getOrderList({
        time_range_field: "update_time",
        time_from: 1640908800,
        time_to: 1640995200,
        page_size: 10,
        cursor: "",
        order_status: "READY_TO_SHIP",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_order_list", {
        method: "GET",
        auth: true,
        params: {
          time_range_field: "update_time",
          time_from: 1640908800,
          time_to: 1640995200,
          page_size: 10,
          cursor: "",
          order_status: "READY_TO_SHIP",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getOrdersDetail", () => {
    it("should get orders detail for multiple orders", async () => {
      const mockResponse: GetOrdersDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_list: [
            {
              order_sn: "220101000000001",
              order_status: "READY_TO_SHIP",
              region: "SG",
              currency: "SGD",
              cod: false,
              total_amount: 25.5,
              order_flag: "NORMAL",
              create_time: 1640995200,
              update_time: 1640995300,
              days_to_ship: 3,
              ship_by_date: 1641259200,
              buyer_user_id: 123456,
              buyer_username: "testbuyer",
              estimated_shipping_fee: 2.5,
              recipient_address: {
                name: "John Doe",
                phone: "+6512345678",
                full_address: "123 Test Street, Singapore 123456",
                district: "Central",
                city: "Singapore",
                state: "Singapore",
                zipcode: "123456",
                country: "SG",
              },
              actual_shipping_fee: 2.5,
              goods_to_declare: false,
              note: "Test order",
              note_update_time: 1640995250,
              item_list: [
                {
                  item_id: 111111,
                  item_name: "Test Product",
                  item_sku: "TEST-SKU-001",
                  model_id: 222222,
                  model_name: "Red-Large",
                  model_sku: "TEST-SKU-001-RED-L",
                  model_quantity_purchased: 1,
                  model_original_price: 25.0,
                  model_discounted_price: 23.0,
                  wholesale: false,
                  weight: 0.5,
                  add_on_deal: false,
                  main_item: false,
                  add_on_deal_id: 0,
                  promotion_type: "NORMAL",
                  promotion_id: 0,
                  order_item_id: 333333,
                  promotion_group_id: 0,
                  image_info: {
                    image_url: "https://example.com/image.jpg",
                  },
                  product_location_id: [],
                },
              ],
              pay_time: 1640995250,
              dropshipper: "",
              dropshipper_phone: "",
              split_up: false,
              buyer_cancel_reason: "",
              cancel_by: "",
              cancel_reason: "",
              actual_shipping_fee_confirmed: true,
              buyer_cpf_id: "",
              fulfillment_flag: "FULFILLED_BY_SHOPEE",
              pickup_done: false,
              package_list: [],
              shipping_carrier: "",
              payment_method: "Credit Card",
              invoice_data: {
                number: "INV-001",
                series_number: "2022",
                access_key: "abc123",
                issue_date: 1640995200,
                total_value: 25.5,
                products_total_value: 23.0,
                tax_code: "TAX001",
              },
              checkout_shipping_carrier: "Standard",
              reverse_shipping_fee: 0,
              order_chargeable_weight_gram: 500,
              edt: 1641340800,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getOrdersDetail({
        order_sn_list: ["220101000000001"],
        response_optional_fields: [
          "buyer_user_id",
          "buyer_username",
          "estimated_shipping_fee",
          "recipient_address",
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_order_detail", {
        method: "GET",
        auth: true,
        params: {
          order_sn_list: "220101000000001",
          response_optional_fields: [
            "buyer_user_id",
            "buyer_username",
            "estimated_shipping_fee",
            "recipient_address",
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShipmentList", () => {
    it("should get shipment list", async () => {
      const mockResponse: GetShipmentListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          shipment_list: [
            {
              order_sn: "220101000000001",
              package_number: "PKG123456789",
              logistics_status: "LOGISTICS_PICKUP_DONE",
              shipment_method: "PICKUP",
              create_time: 1640995200,
              update_time: 1640995300,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getShipmentList({
        cursor: "",
        page_size: 20,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_shipment_list", {
        method: "GET",
        auth: true,
        params: {
          cursor: "",
          page_size: 20,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("splitOrder", () => {
    it("should split an order", async () => {
      const mockResponse: SplitOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.splitOrder({
        order_sn: "220101000000001",
        package_list: [
          {
            item_list: [
              {
                item_id: 111111,
                model_id: 222222,
                order_item_id: 333333,
                promotion_group_id: 0,
                model_quantity: 1,
              },
            ],
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/split_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
          package_list: [
            {
              item_list: [
                {
                  item_id: 111111,
                  model_id: 222222,
                  order_item_id: 333333,
                  promotion_group_id: 0,
                  model_quantity: 1,
                },
              ],
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("unsplitOrder", () => {
    it("should unsplit an order", async () => {
      const mockResponse: UnsplitOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.unsplitOrder({
        order_sn: "220101000000001",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/unsplit_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("cancelOrder", () => {
    it("should cancel an order", async () => {
      const mockResponse: CancelOrderResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.cancelOrder({
        order_sn: "220101000000001",
        cancel_reason: "OUT_OF_STOCK",
        item_list: [
          {
            item_id: 111111,
            model_id: 222222,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/cancel_order", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
          cancel_reason: "OUT_OF_STOCK",
          item_list: [
            {
              item_id: 111111,
              model_id: 222222,
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBuyerInvoiceInfo", () => {
    it("should get buyer invoice info", async () => {
      const mockResponse: GetBuyerInvoiceInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: null,
        invoice_info_list: [
          {
            order_sn: "220101000000001",
            invoice_type: "personal",
            invoice_detail: {
              name: "John Doe",
              email: "john@example.com",
              tax_id: "TAX123",
            },
            error: "",
            is_requested: true,
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getBuyerInvoiceInfo({
        queries: [
          {
            order_sn: "220101000000001",
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_buyer_invoice_info", {
        method: "POST",
        auth: true,
        body: {
          queries: [
            {
              order_sn: "220101000000001",
            },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("setNote", () => {
    it("should set note for an order", async () => {
      const mockResponse: SetNoteResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: null,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.setNote({
        order_sn: "220101000000001",
        note: "Thank you for your order",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/set_note", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
          note: "Thank you for your order",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPackageDetail", () => {
    it("should get package detail", async () => {
      const mockResponse: GetPackageDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          package_list: [
            {
              order_sn: "220101000000001",
              package_number: "PKG001",
              fulfillment_status: "READY_TO_SHIP",
              update_time: 1640995200,
              logistics_channel_id: 80001,
              shipping_carrier: "Standard Delivery",
              allow_self_design_awb: true,
              days_to_ship: 3,
              ship_by_date: 1641254400,
              is_split_up: false,
              item_list: [
                {
                  item_id: 111111,
                  model_id: 222222,
                  model_quantity: 1,
                  order_item_id: 333333,
                  product_location_id: "LOC001",
                  promotion_group_id: 0,
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getPackageDetail({
        package_number_list: ["PKG001", "PKG002"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_package_detail", {
        method: "GET",
        auth: true,
        params: {
          package_number_list: "PKG001,PKG002",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("handleBuyerCancellation", () => {
    it("should accept buyer cancellation", async () => {
      const mockResponse: HandleBuyerCancellationResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000001",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.handleBuyerCancellation({
        order_sn: "220101000000001",
        operation: "ACCEPT",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/handle_buyer_cancellation", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
          operation: "ACCEPT",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("searchPackageList", () => {
    it("should search package list with filters", async () => {
      const mockResponse: SearchPackageListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          package_list: [
            {
              order_sn: "220101000000001",
              package_number: "PKG001",
              fulfillment_status: "READY_TO_SHIP",
              update_time: 1640995200,
              logistics_channel_id: 80001,
              days_to_ship: 3,
              ship_by_date: 1641254400,
              create_time: 1640908800,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.searchPackageList({
        filter: {
          package_status: 2,
        },
        pagination: {
          page_size: 20,
          cursor: "",
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/search_package_list", {
        method: "POST",
        auth: true,
        body: {
          filter: {
            package_status: 2,
          },
          pagination: {
            page_size: 20,
            cursor: "",
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPendingBuyerInvoiceOrderList", () => {
    it("should get pending buyer invoice order list", async () => {
      const mockResponse: GetPendingBuyerInvoiceOrderListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          order_sn_list: ["220101000000001", "220101000000002"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getPendingBuyerInvoiceOrderList({
        page_size: 20,
        cursor: "",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_pending_buyer_invoice_order_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 20,
            cursor: "",
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("handlePrescriptionCheck", () => {
    it("should approve prescription", async () => {
      const mockResponse: HandlePrescriptionCheckResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          package_number: "PKG001",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.handlePrescriptionCheck({
        package_number: "PKG001",
        operation: "APPROVE",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/handle_prescription_check", {
        method: "POST",
        auth: true,
        body: {
          package_number: "PKG001",
          operation: "APPROVE",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("downloadInvoiceDoc", () => {
    it("should download invoice document", async () => {
      const mockResponse: DownloadInvoiceDocResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          url: "https://example.com/invoice.pdf",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.downloadInvoiceDoc({
        order_sn: "220101000000001",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/download_invoice_doc", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000001",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("uploadInvoiceDoc", () => {
    it("should upload invoice document", async () => {
      const mockResponse: UploadInvoiceDocResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: null,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.uploadInvoiceDoc({
        order_sn: "220101000000001",
        invoice_file: "base64_encoded_file_content",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/upload_invoice_doc", {
        method: "POST",
        auth: true,
        body: {
          order_sn: "220101000000001",
          invoice_file: "base64_encoded_file_content",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBookingDetail", () => {
    it("should get booking detail", async () => {
      const mockResponse: GetBookingDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          booking_list: [
            {
              booking_sn: "BOOK001",
              order_sn: "220101000000001",
              booking_status: "READY_TO_SHIP",
              create_time: 1640908800,
              update_time: 1640995200,
              logistics_channel_id: 80001,
              package_list: ["PKG001", "PKG002"],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getBookingDetail({
        booking_sn_list: ["BOOK001"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_booking_detail", {
        method: "GET",
        auth: true,
        params: {
          booking_sn_list: "BOOK001",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBookingList", () => {
    it("should get booking list", async () => {
      const mockResponse: GetBookingListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_cursor: "",
          booking_list: [
            {
              booking_sn: "BOOK001",
              booking_status: "READY_TO_SHIP",
              update_time: 1640995200,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getBookingList({
        time_range_field: "create_time",
        time_from: 1640908800,
        time_to: 1640995200,
        page_size: 20,
        cursor: "",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_booking_list", {
        method: "GET",
        auth: true,
        params: {
          time_range_field: "create_time",
          time_from: 1640908800,
          time_to: 1640995200,
          page_size: 20,
          cursor: "",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getWarehouseFilterConfig", () => {
    it("should get warehouse filter config", async () => {
      const mockResponse: GetWarehouseFilterConfigResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          warehouse_list: [
            {
              product_location_id: "LOC001",
              address_id: 12345,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getWarehouseFilterConfig();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/order/get_warehouse_filter_config",
        {
          method: "GET",
          auth: true,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("downloadFbsInvoices", () => {
    it("should download FBS invoices", async () => {
      const mockResponse: DownloadFbsInvoicesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              request_id: 123,
              url: "https://example.com/invoice.pdf",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.downloadFbsInvoices({
        request_id_list: {
          request_id: [123, 456],
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/download_fbs_invoices", {
        method: "POST",
        auth: true,
        body: {
          request_id_list: {
            request_id: [123, 456],
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateFbsInvoices", () => {
    it("should generate FBS invoices", async () => {
      const mockResponse: GenerateFbsInvoicesResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          request_id: 123,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.generateFbsInvoices({
        batch_download: {
          start: 20240101,
          end: 20240131,
          document_type: 1,
          file_type: 3,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/generate_fbs_invoices", {
        method: "POST",
        auth: true,
        body: {
          batch_download: {
            start: 20240101,
            end: 20240131,
            document_type: 1,
            file_type: 3,
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getFbsInvoicesResult", () => {
    it("should get FBS invoices result", async () => {
      const mockResponse: GetFbsInvoicesResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          result_list: [
            {
              request_id: 123,
              status: "READY",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getFbsInvoicesResult({
        request_id_list: {
          request_id: [123],
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_fbs_invoices_result", {
        method: "POST",
        auth: true,
        body: {
          request_id_list: {
            request_id: [123],
          },
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
