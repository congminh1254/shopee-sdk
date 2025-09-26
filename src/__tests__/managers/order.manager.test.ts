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
        response: {
          order_invoice_info_list: [
            {
              order_sn: "220101000000001",
              invoice_data: {
                number: "INV-001",
                series_number: "2022",
                access_key: "abc123",
                issue_date: 1640995200,
                total_value: 25.5,
                products_total_value: 23.0,
                tax_code: "TAX001",
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await orderManager.getBuyerInvoiceInfo({
        order_sn_list: ["220101000000001"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/order/get_buyer_invoice_info", {
        method: "POST",
        auth: true,
        body: {
          order_sn_list: ["220101000000001"],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
