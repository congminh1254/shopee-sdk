import { jest } from "@jest/globals";
import { PaymentManager } from "../../managers/payment.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import { GetEscrowDetailResponse } from "../../schemas/payment.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("PaymentManager", () => {
  let paymentManager: PaymentManager;
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

    paymentManager = new PaymentManager(mockConfig);
  });

  describe("getEscrowDetail", () => {
    it("should get escrow detail for an order", async () => {
      const mockResponse: GetEscrowDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000001",
          buyer_user_name: "testbuyer123",
          return_order_sn_list: [],
          order_income: {
            escrow_amount: 22.5,
            buyer_total_amount: 25.5,
            original_price: 23.0,
            seller_discount: 0.0,
            shopee_discount: 0.0,
            voucher_from_seller: 0.0,
            voucher_from_shopee: 0.0,
            coin: 0.0,
            escrow_tax: 0.5,
            final_escrow_tax: 0.5,
            seller_shipping_discount: 0.0,
            estimated_shipping_fee: 2.5,
            drc_adjustable_refund: 0.0,
            final_shipping_fee: 2.5,
            actual_shipping_fee: 2.5,
            shopee_shipping_rebate: 0.0,
            shipping_fee_discount_from_3pl: 0.0,
            credit_card_promotion: 0.0,
            items: [
              {
                item_id: 111111,
                item_name: "Test Product",
                model_id: 222222,
                model_name: "Red-Large",
                quantity_purchased: 1,
                original_price: 23.0,
                sale_price: 23.0,
                seller_discount: 0.0,
                shopee_discount: 0.0,
                final_product_price: 23.0,
                seller_sku: "TEST-SKU-001-RED-L",
              },
            ],
            bank_guarantee: 0.0,
            total_released_amount: 22.5,
            escrow_detail: {
              order_chargeable_weight_gram: 500,
              commission_fee: 1.38,
              service_fee: 0.12,
              processing_fee: 0.0,
              final_commission_fee: 1.38,
              final_service_fee: 0.12,
              final_processing_fee: 0.0,
            },
          },
          buyer_payment_info: {
            card_info: {
              issuer: "VISA",
              last_four_digits: "1234",
              first_six_digits: "424242",
            },
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getEscrowDetail({
        order_sn: "220101000000001",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_escrow_detail", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000001",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.order_income.escrow_amount).toBe(22.5);
      expect(result.response.order_income.items).toHaveLength(1);
      expect(result.response.buyer_user_name).toBe("testbuyer123");
    });

    it("should get escrow detail with return orders", async () => {
      const mockResponse: GetEscrowDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000002",
          buyer_user_name: "anotherbuyer",
          return_order_sn_list: ["RET220101000000001", "RET220101000000002"],
          order_income: {
            escrow_amount: 18.75,
            buyer_total_amount: 25.5,
            original_price: 23.0,
            seller_discount: 2.0,
            shopee_discount: 0.0,
            voucher_from_seller: 0.0,
            voucher_from_shopee: 0.0,
            coin: 0.0,
            escrow_tax: 0.25,
            final_escrow_tax: 0.25,
            seller_shipping_discount: 0.0,
            estimated_shipping_fee: 2.5,
            drc_adjustable_refund: 2.0,
            final_shipping_fee: 2.5,
            actual_shipping_fee: 2.5,
            shopee_shipping_rebate: 0.0,
            shipping_fee_discount_from_3pl: 0.0,
            credit_card_promotion: 0.0,
            items: [
              {
                item_id: 333333,
                item_name: "Another Test Product",
                model_id: 444444,
                model_name: "Blue-Medium",
                quantity_purchased: 1,
                original_price: 23.0,
                sale_price: 21.0,
                seller_discount: 2.0,
                shopee_discount: 0.0,
                final_product_price: 21.0,
                seller_sku: "TEST-SKU-002-BLUE-M",
              },
            ],
            bank_guarantee: 0.0,
            total_released_amount: 18.75,
            escrow_detail: {
              order_chargeable_weight_gram: 300,
              commission_fee: 1.26,
              service_fee: 0.09,
              processing_fee: 0.0,
              final_commission_fee: 1.26,
              final_service_fee: 0.09,
              final_processing_fee: 0.0,
            },
          },
          buyer_payment_info: {
            card_info: {
              issuer: "MASTERCARD",
              last_four_digits: "5678",
              first_six_digits: "555555",
            },
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getEscrowDetail({
        order_sn: "220101000000002",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_escrow_detail", {
        method: "GET",
        auth: true,
        params: {
          order_sn: "220101000000002",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_order_sn_list).toHaveLength(2);
      expect(result.response.order_income.seller_discount).toBe(2.0);
      expect(result.response.order_income.drc_adjustable_refund).toBe(2.0);
    });

    it("should handle orders with no escrow detail breakdown", async () => {
      const mockResponse: GetEscrowDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_sn: "220101000000003",
          buyer_user_name: "simpleorder",
          return_order_sn_list: [],
          order_income: {
            escrow_amount: 15.0,
            buyer_total_amount: 15.0,
            original_price: 15.0,
            seller_discount: 0.0,
            shopee_discount: 0.0,
            voucher_from_seller: 0.0,
            voucher_from_shopee: 0.0,
            coin: 0.0,
            escrow_tax: 0.0,
            final_escrow_tax: 0.0,
            seller_shipping_discount: 0.0,
            estimated_shipping_fee: 0.0,
            drc_adjustable_refund: 0.0,
            final_shipping_fee: 0.0,
            actual_shipping_fee: 0.0,
            shopee_shipping_rebate: 0.0,
            shipping_fee_discount_from_3pl: 0.0,
            credit_card_promotion: 0.0,
            items: [
              {
                item_id: 555555,
                item_name: "Digital Product",
                model_id: 666666,
                model_name: "Standard",
                quantity_purchased: 1,
                original_price: 15.0,
                sale_price: 15.0,
                seller_discount: 0.0,
                shopee_discount: 0.0,
                final_product_price: 15.0,
                seller_sku: "DIGITAL-001",
              },
            ],
            bank_guarantee: 0.0,
            total_released_amount: 15.0,
            escrow_detail: {
              order_chargeable_weight_gram: 0,
              commission_fee: 0.0,
              service_fee: 0.0,
              processing_fee: 0.0,
              final_commission_fee: 0.0,
              final_service_fee: 0.0,
              final_processing_fee: 0.0,
            },
          },
          buyer_payment_info: {
            card_info: {
              issuer: "PAYPAL",
              last_four_digits: "",
              first_six_digits: "",
            },
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getEscrowDetail({
        order_sn: "220101000000003",
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.order_income.escrow_amount).toBe(15.0);
      expect(result.response.order_income.final_shipping_fee).toBe(0.0);
      expect(result.response.order_income.escrow_detail.commission_fee).toBe(0.0);
    });
  });
});
