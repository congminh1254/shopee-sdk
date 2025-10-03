import { jest } from "@jest/globals";
import { PaymentManager } from "../../managers/payment.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetEscrowDetailResponse,
  GetEscrowListResponse,
  GetEscrowDetailBatchResponse,
  GetWalletTransactionListResponse,
  GetPaymentMethodListResponse,
  GetShopInstallmentStatusResponse,
  SetShopInstallmentStatusResponse,
  GetItemInstallmentStatusResponse,
  SetItemInstallmentStatusResponse,
  GenerateIncomeReportResponse,
  GetIncomeReportResponse,
  GenerateIncomeStatementResponse,
  GetIncomeStatementResponse,
  GetBillingTransactionInfoResponse,
  GetPayoutDetailResponse,
  GetPayoutInfoResponse,
} from "../../schemas/payment.js";

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

  describe("getEscrowList", () => {
    it("should get escrow list for a time range", async () => {
      const mockResponse: GetEscrowListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          escrow_list: [
            {
              order_sn: "220415N6SB140P",
              payout_amount: 57334,
              escrow_release_time: 1651849648,
            },
            {
              order_sn: "220415M9J6GHBP",
              payout_amount: 5930,
              escrow_release_time: 1651849648,
            },
          ],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getEscrowList({
        release_time_from: 1651680000,
        release_time_to: 1651939200,
        page_size: 40,
        page_no: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_escrow_list", {
        method: "POST",
        auth: true,
        body: {
          release_time_from: 1651680000,
          release_time_to: 1651939200,
          page_size: 40,
          page_no: 1,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.escrow_list).toHaveLength(2);
      expect(result.response.more).toBe(true);
    });
  });

  describe("getEscrowDetailBatch", () => {
    it("should get escrow details for multiple orders", async () => {
      const mockResponse: GetEscrowDetailBatchResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          order_income_list: [
            {
              order_sn: "220101000000001",
              buyer_user_name: "testbuyer1",
              return_order_sn_list: [],
              order_income: {
                escrow_amount: 100.0,
                buyer_total_amount: 105.0,
                original_price: 100.0,
                seller_discount: 0.0,
                shopee_discount: 0.0,
                voucher_from_seller: 0.0,
                voucher_from_shopee: 0.0,
                coins: 0.0,
                buyer_paid_shipping_fee: 5.0,
                buyer_transaction_fee: 0.0,
                cross_border_tax: 0.0,
                payment_promotion: 0.0,
                commission_fee: 5.0,
                service_fee: 1.0,
                seller_transaction_fee: 0.0,
                seller_lost_compensation: 0.0,
                seller_coin_cash_back: 0.0,
                escrow_tax: 0.0,
                estimated_shipping_fee: 5.0,
                final_shipping_fee: 5.0,
                actual_shipping_fee: 5.0,
                shopee_shipping_rebate: 0.0,
                shipping_fee_discount_from_3pl: 0.0,
                seller_shipping_discount: 0.0,
                seller_voucher_code: [],
                drc_adjustable_refund: 0.0,
                cost_of_goods_sold: 100.0,
                original_cost_of_goods_sold: 100.0,
                original_shopee_discount: 0.0,
                seller_return_refund: 0.0,
                items: [],
                reverse_shipping_fee: 0.0,
                final_product_protection: 0.0,
                credit_card_promotion: 0.0,
                credit_card_transaction_fee: 0.0,
                final_product_vat_tax: 0.0,
              },
              buyer_payment_info: {
                buyer_payment_method: "Credit Card",
                buyer_service_fee: 0.0,
                buyer_tax_amount: 0.0,
                buyer_total_amount: 105.0,
                credit_card_promotion: 0.0,
                icms_tax_amount: 0.0,
                import_tax_amount: 0.0,
                initial_buyer_txn_fee: 0.0,
                insurance_premium: 0.0,
                iof_tax_amount: 0.0,
                is_paid_by_credit_card: true,
                merchant_subtotal: 100.0,
                seller_voucher: 0.0,
                shipping_fee: 5.0,
                shipping_fee_sst_amount: 0.0,
                shopee_voucher: 0.0,
                shopee_coins_redeemed: 0.0,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getEscrowDetailBatch({
        order_sn_list: ["220101000000001", "220101000000002"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_escrow_detail_batch", {
        method: "GET",
        auth: true,
        params: {
          order_sn_list: ["220101000000001", "220101000000002"],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.order_income_list).toHaveLength(1);
    });
  });

  describe("getWalletTransactionList", () => {
    it("should get wallet transaction list", async () => {
      const mockResponse: GetWalletTransactionListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          transaction_list: [
            {
              transaction_id: 123456,
              transaction_type: "ORDER_PAYMENT",
              status: "COMPLETED",
              amount: 100.0,
              current_balance: 1000.0,
              create_time: 1651680000,
              order_sn: "220101000000001",
              reason: "Order payment received",
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getWalletTransactionList({
        create_time_from: 1651680000,
        create_time_to: 1651939200,
        page_no: 0,
        page_size: 40,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_wallet_transaction_list",
        {
          method: "POST",
          auth: true,
          body: {
            create_time_from: 1651680000,
            create_time_to: 1651939200,
            page_no: 0,
            page_size: 40,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.transaction_list).toHaveLength(1);
      expect(result.response.more).toBe(false);
    });
  });

  describe("getPaymentMethodList", () => {
    it("should get payment method list without authentication", async () => {
      const mockResponse: GetPaymentMethodListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          payment_method_list: [
            {
              payment_method_id: 1,
              payment_method_name: "Credit Card",
              is_enabled: true,
            },
            {
              payment_method_id: 2,
              payment_method_name: "Bank Transfer",
              is_enabled: true,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getPaymentMethodList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_payment_method_list", {
        method: "POST",
        auth: false,
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.payment_method_list).toHaveLength(2);
    });
  });

  describe("getShopInstallmentStatus", () => {
    it("should get shop installment status", async () => {
      const mockResponse: GetShopInstallmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          tenure_list: [3, 6, 12],
          status: "ENABLED",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getShopInstallmentStatus();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_shop_installment_status",
        {
          method: "POST",
          auth: true,
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.tenure_list).toHaveLength(3);
      expect(result.response.status).toBe("ENABLED");
    });
  });

  describe("setShopInstallmentStatus", () => {
    it("should set shop installment status", async () => {
      const mockResponse: SetShopInstallmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.setShopInstallmentStatus({
        installment_enabled: true,
        tenure_list: [3, 6, 12],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/set_shop_installment_status",
        {
          method: "GET",
          auth: true,
          params: {
            installment_enabled: true,
            tenure_list: [3, 6, 12],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemInstallmentStatus", () => {
    it("should get item installment status", async () => {
      const mockResponse: GetItemInstallmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_id: 123456,
          tenure_list: [3, 6],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getItemInstallmentStatus({
        item_id: 123456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_item_installment_status",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.item_id).toBe(123456);
      expect(result.response.tenure_list).toHaveLength(2);
    });
  });

  describe("setItemInstallmentStatus", () => {
    it("should set item installment status", async () => {
      const mockResponse: SetItemInstallmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.setItemInstallmentStatus({
        item_id: 123456,
        tenure_list: [3, 6, 12],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/set_item_installment_status",
        {
          method: "GET",
          auth: true,
          params: {
            item_id: 123456,
            tenure_list: [3, 6, 12],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateIncomeReport", () => {
    it("should trigger income report generation", async () => {
      const mockResponse: GenerateIncomeReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          income_report_id: "REPORT_123456",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.generateIncomeReport({
        start_time: 1651680000,
        end_time: 1651939200,
        currency: "SGD",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/generate_income_report", {
        method: "POST",
        auth: true,
        body: {
          start_time: 1651680000,
          end_time: 1651939200,
          currency: "SGD",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.income_report_id).toBe("REPORT_123456");
    });
  });

  describe("getIncomeReport", () => {
    it("should get income report status and download link", async () => {
      const mockResponse: GetIncomeReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          income_report_id: "REPORT_123456",
          status: "COMPLETED",
          url: "https://example.com/report.csv",
          create_time: 1651680000,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getIncomeReport({
        income_report_id: "REPORT_123456",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_income_report", {
        method: "POST",
        auth: true,
        body: {
          income_report_id: "REPORT_123456",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe("COMPLETED");
      expect(result.response.url).toBe("https://example.com/report.csv");
    });
  });

  describe("generateIncomeStatement", () => {
    it("should trigger income statement generation", async () => {
      const mockResponse: GenerateIncomeStatementResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          income_statement_id: "STATEMENT_123456",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.generateIncomeStatement({
        start_time: 1651680000,
        end_time: 1651939200,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/generate_income_statement",
        {
          method: "POST",
          auth: true,
          body: {
            start_time: 1651680000,
            end_time: 1651939200,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.income_statement_id).toBe("STATEMENT_123456");
    });
  });

  describe("getIncomeStatement", () => {
    it("should get income statement status and download link", async () => {
      const mockResponse: GetIncomeStatementResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          income_statement_id: "STATEMENT_123456",
          status: "COMPLETED",
          url: "https://example.com/statement.pdf",
          create_time: 1651680000,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getIncomeStatement({
        income_statement_id: "STATEMENT_123456",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_income_statement", {
        method: "POST",
        auth: true,
        body: {
          income_statement_id: "STATEMENT_123456",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe("COMPLETED");
      expect(result.response.url).toBe("https://example.com/statement.pdf");
    });
  });

  describe("getBillingTransactionInfo", () => {
    it("should get billing transaction info for CB sellers", async () => {
      const mockResponse: GetBillingTransactionInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          transaction_list: [
            {
              transaction_id: "TXN_123456",
              transaction_type: "ORDER_PAYMENT",
              amount: 1000.0,
              transaction_time: 1651680000,
              order_sn: "220101000000001",
              currency: "USD",
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getBillingTransactionInfo({
        transaction_time_from: 1651680000,
        transaction_time_to: 1651939200,
        page_no: 1,
        page_size: 40,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_billing_transaction_info",
        {
          method: "GET",
          auth: true,
          params: {
            transaction_time_from: 1651680000,
            transaction_time_to: 1651939200,
            page_no: 1,
            page_size: 40,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.transaction_list).toHaveLength(1);
    });
  });

  describe("getPayoutDetail", () => {
    it("should get payout detail for CB sellers (deprecated)", async () => {
      const mockResponse: GetPayoutDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          payout_list: [
            {
              payout_id: "PAYOUT_123456",
              payout_amount: 5000.0,
              payout_time: 1651680000,
              currency: "USD",
              exchange_rate: 1.35,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getPayoutDetail({
        payout_time_from: 1651680000,
        payout_time_to: 1651939200,
        page_no: 1,
        page_size: 40,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_payout_detail", {
        method: "POST",
        auth: true,
        body: {
          payout_time_from: 1651680000,
          payout_time_to: 1651939200,
          page_no: 1,
          page_size: 40,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.payout_list).toHaveLength(1);
    });
  });

  describe("getPayoutInfo", () => {
    it("should get payout info for CB sellers", async () => {
      const mockResponse: GetPayoutInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          payout_list: [
            {
              payout_id: "PAYOUT_789012",
              payout_amount: 7500.0,
              payout_time: 1651680000,
              currency: "USD",
              exchange_rate: 1.35,
              payout_fee: 25.0,
            },
          ],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await paymentManager.getPayoutInfo({
        payout_time_from: 1651680000,
        payout_time_to: 1651939200,
        page_no: 1,
        page_size: 40,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/payment/get_payout_info", {
        method: "POST",
        auth: true,
        body: {
          payout_time_from: 1651680000,
          payout_time_to: 1651939200,
          page_no: 1,
          page_size: 40,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.payout_list).toHaveLength(1);
      expect(result.response.payout_list[0].payout_fee).toBe(25.0);
    });
  });
});
