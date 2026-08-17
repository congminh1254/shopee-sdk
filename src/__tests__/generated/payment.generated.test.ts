import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { PaymentManager } from "../../managers/payment.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("PaymentManager (Generated Tests)", () => {
  let manager: PaymentManager;
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
    manager = new PaymentManager(mockConfig);
  });

  describe("generateIncomeReport", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        release_time_from: 1234567890,
        release_time_to: 1234567890,
      };
      const exampleResponse = {
        id: 123456,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.generateIncomeReport(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/generate_income_report",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("generateIncomeStatement", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        release_time_from: 1751302800,
        release_time_to: 1753981199,
        statement_type: 1,
      };
      const exampleResponse = {
        id: 123456789,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.generateIncomeStatement(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/generate_income_statement",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBillingTransactionInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        billing_transaction_info_type: 1,
        encrypted_payout_ids: ["10376329180766", "637926329180767"],
        cursor: '""',
        page_size: 100,
      };
      const exampleResponse = {
        transactions: {
          amount: -594.78,
          currency: "SGD",
          order_sn: "SGD",
          cost_header: "Refund Amount",
          scenario: "Return Refund After Order Completed",
          remark: "Deduction on return refund requests raised after order is completed",
          level: "Order",
          billing_transaction_type: "ADJUSTMENT",
          billing_transaction_status: "Released",
        },
        more: false,
        next_cursor: "false",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBillingTransactionInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_billing_transaction_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getEscrowDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn: "220914R9U7D3C6",
      };
      const exampleResponse = {
        order_sn: "220725D58XURJS",
        buyer_user_name: "xixxixi",
        return_order_sn_list: ["test_string"],
        order_income: {
          escrow_amount: 100,
          buyer_total_amount: 99,
          order_original_price: 110,
          original_price: 139,
          order_discounted_price: 100,
          order_selling_price: 100,
          order_seller_discount: 10,
          bcrs_deposit: 0.1,
          seller_discount: 10,
          shopee_discount: 10,
          voucher_from_seller: 10,
          voucher_from_shopee: 10,
          voucher_from_external_party: 123,
          coins: 0,
          buyer_paid_shipping_fee: 0,
          buyer_transaction_fee: 0,
          cross_border_tax: 0,
          payment_promotion: 0,
          commission_fee: 0,
          service_fee: 0,
          seller_transaction_fee: 0,
          seller_lost_compensation: 0,
          seller_coin_cash_back: 0,
          escrow_tax: 0,
          estimated_shipping_fee: 10,
          final_shipping_fee: -10,
          actual_shipping_fee: 10,
          shipping_fee_sst: 0.1,
          order_chargeable_weight: 500,
          shopee_shipping_rebate: 0,
          shipping_fee_discount_from_3pl: 0,
          seller_shipping_discount: 0,
          seller_voucher_code: ["test_string"],
          drc_adjustable_refund: 0,
          cost_of_goods_sold: 1,
          original_cost_of_goods_sold: 0,
          original_shopee_discount: 0,
          seller_return_refund: 0,
          items: [
            {
              item_id: 800062998,
              item_name: "Product",
              item_sku: "test_string",
              model_id: 0,
              model_name: "test_string",
              model_sku: "test_string",
              line_item_id: 2600144043,
              original_price: 139,
              original_price_pri: 110,
              selling_price: 100,
              discounted_price: 99,
              bcrs_deposit: 0.1,
              seller_discount: 10,
              shopee_discount: 10,
              discount_from_coin: 0,
              discount_from_voucher_shopee: 10,
              discount_from_voucher_seller: 10,
              activity_type: "bundle_deal",
              activity_id: "0",
              is_main_item: false,
              quantity_purchased: 1,
              is_b2c_shop_item: false,
              ams_commission_fee: 0,
              is_kit: true,
              kit_items: {
                original_product_id: 123,
                original_model_id: 123,
                total_qty: 123,
                original_price: 123,
                proportional_price: 123,
              },
              promotion_list: [
                {
                  promotion_type: "seller_discount",
                  promotion_id: "848474823",
                },
              ],
            },
          ],
          escrow_amount_pri: 0,
          buyer_total_amount_pri: 0,
          original_price_pri: 0,
          seller_return_refund_pri: 0,
          commission_fee_pri: 0,
          service_fee_pri: 0,
          drc_adjustable_refund_pri: 0,
          pri_currency: "0.0",
          aff_currency: "0.0",
          exchange_rate: 0,
          reverse_shipping_fee: 0,
          reverse_shipping_fee_sst: 0.1,
          final_product_protection: 0,
          credit_card_promotion: 0,
          credit_card_transaction_fee: 0,
          final_product_vat_tax: 0,
          final_shipping_vat_tax: 0,
          campaign_fee: 0,
          sip_subsidy: 0.57,
          sip_subsidy_pri: 2.8,
          rsf_seller_protection_fee_claim_amount: 123,
          shipping_seller_protection_fee_amount: 123,
          final_escrow_product_gst: 4.35,
          final_escrow_shipping_gst: 0.07,
          delivery_seller_protection_fee_premium_amount: 0,
          order_adjustment: [
            {
              amount: 10.1,
              date: 1688107565,
              currency: "TWD",
              adjustment_reason: "test_string",
            },
          ],
          total_adjustment_amount: 10.1,
          escrow_amount_after_adjustment: 110.1,
          order_ams_commission_fee: 0,
          buyer_payment_method: "Credit Card/Debit Card",
          instalment_plan: "N/A",
          sales_tax_on_lvg: 0.99,
          final_return_to_seller_shipping_fee: 0,
          withholding_tax: 0,
          overseas_return_service_fee: 0,
          prorated_coins_value_offset_return_items: 0,
          prorated_shopee_voucher_offset_return_items: 0,
          prorated_seller_voucher_offset_return_items: 0,
          prorated_payment_channel_promo_bank_offset_return_items: 0,
          prorated_payment_channel_promo_shopee_offset_return_items: 0,
          fsf_seller_protection_fee_claim_amount: 0,
          vat_on_imported_goods: 0,
          tenure_info_list: [
            {
              payment_channel_name: "test_string",
              instalment_plan: "test_string",
            },
          ],
          withholding_vat_tax: 1,
          withholding_pit_tax: 2,
          withholding_cit_tax: 3,
          tax_registration_code: "8881234567-888",
          seller_order_processing_fee: 3,
          buyer_paid_packaging_fee: 123,
          trade_in_bonus_by_seller: 123,
          fbs_fee: 123,
          net_commission_fee: 123,
          net_service_fee: 123,
          net_commission_fee_info_list: [
            {
              rule_id: 123,
              fee_amount: 123,
              rule_display_name: "test_string",
            },
          ],
          net_service_fee_info_list: [
            {
              rule_id: 123,
              fee_amount: 123,
              rule_display_name: "test_string",
              category: "test_string",
            },
          ],
          seller_product_rebate: {
            amount: 123,
            commission_fee_offset: 123,
            service_fee_offset: 123,
          },
          pix_discount: 123,
          prorated_pix_discount_offset_return_items: 123,
          ads_escrow_top_up_fee_or_technical_support_fee: 123,
          th_import_duty: 123,
          remaining_voucher: 10,
        },
        buyer_payment_info: {
          buyer_payment_method: "test_string",
          buyer_service_fee: 123,
          buyer_tax_amount: 123,
          buyer_total_amount: 123,
          shopeevip_subtotal: 0.1,
          credit_card_promotion: 123,
          icms_tax_amount: 123,
          import_tax_amount: 123,
          initial_buyer_txn_fee: 123,
          insurance_premium: 123,
          iof_tax_amount: 123,
          is_paid_by_credit_card: false,
          merchant_subtotal: 123,
          seller_voucher: 123,
          shipping_fee: 123,
          shipping_fee_sst_amount: 123,
          shopee_voucher: 123,
          shopee_coins_redeemed: 123,
          buyer_paid_packaging_fee: 123,
          trade_in_bonus: 123,
          bulky_handling_fee: 123,
          discount_pix: 123,
          bcrs_deposit: 0.1,
          ads_voucher_discount: 123,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getEscrowDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_escrow_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getEscrowDetailBatch", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        order_sn_list: ["test_string"],
      };
      const exampleResponse = [
        {
          escrow_detail: {
            order_sn: "test_string",
            buyer_user_name: "test_string",
            return_order_sn_list: ["test_string"],
            order_income: {
              escrow_amount: 123,
              order_original_price: 123,
              original_price: 123,
              order_selling_price: 123,
              bcrs_deposit: 0.1,
              order_seller_discount: 123,
              seller_discount: 123,
              order_discounted_price: 123,
              shopee_discount: 123,
              voucher_from_seller: 123,
              voucher_from_shopee: 123,
              voucher_from_external_party: 123,
              coins: 123,
              cross_border_tax: 123,
              payment_promotion: 123,
              commission_fee: 123,
              service_fee: 123,
              seller_transaction_fee: 123,
              seller_lost_compensation: 123,
              seller_coin_cash_back: 123,
              escrow_tax: 123,
              final_shipping_fee: 123,
              actual_shipping_fee: 123,
              shopee_shipping_rebate: 123,
              shipping_fee_sst: 123,
              shipping_fee_discount_from_pl: 123,
              seller_shipping_discount: 123,
              estimated_shipping_fee: 123,
              seller_voucher_code: 123,
              drc_adjustable_refund: 123,
              refund_amount_to_buyer: 123,
              cost_of_goods_sold: 123,
              original_cost_of_goods_sold: 123,
              original_shopee_discount: 123,
              items: [
                {
                  item_id: 123,
                  item_name: "test_string",
                  item_sku: "test_string",
                  model_id: 123,
                  model_name: "test_string",
                  model_sku: "test_string",
                  line_item_id: 2600144043,
                  original_price: 123,
                  original_price_pri: 123,
                  selling_price: 123,
                  discounted_price: 123,
                  bcrs_deposit: 0.1,
                  seller_discount: 123,
                  shopee_discount: 123,
                  discount_from_coin: 123,
                  discount_from_voucher_shopee: 123,
                  discount_from_voucher_seller: 123,
                  activity_type: "test_string",
                  activity_id: "test_string",
                  is_main_item: true,
                  quantity_purchased: 123,
                  is_b2c_shop_item: true,
                  ams_commission_fee: 123,
                  is_kit: true,
                  kit_items: {
                    original_product_id: 123,
                    original_model_id: 123,
                    total_qty: 123,
                    original_price: 123,
                    proportional_price: 123,
                  },
                  promotion_list: [
                    {
                      promotion_type: "seller_discount",
                      promotion_id: "871828283",
                    },
                  ],
                },
              ],
              escrow_amount_pri: 123,
              buyer_total_amount_pri: 123,
              original_price_pri: 123,
              seller_return_refund_pri: 123,
              commission_fee_pri: 123,
              service_fee_pri: 123,
              drc_adjustable_refund_pri: 123,
              pri_currency: "test_string",
              aff_currency: "test_string",
              exchange_rate: 123,
              reverse_shipping_fee: 123,
              reverse_shipping_fee_sst: 123,
              final_product_protection: 123,
              credit_card_promotion: 123,
              credit_card_transaction_fee: 123,
              final_product_vat_tax: 123,
              final_shipping_vat_tax: 123,
              campaign_fee: 123,
              sip_subsidy: 123,
              sip_subsidy_pri: 123,
              rsf_seller_protection_fee_claim_amount: 123,
              rsf_seller_protection_fee_premium_amount: 123,
              final_escrow_product_gst: 123,
              final_escrow_shipping_gst: 123,
              delivery_seller_protection_fee_premium_amount: 123,
              order_ams_commission_fee: 123,
              buyer_payment_method: 123,
              instalment_plan: 123,
              sales_tax_on_lvg: 123,
              withholding_tax: 123,
              overseas_return_service_fee: 123,
              prorated_coins_value_offset_return_items: 123,
              prorated_shopee_voucher_offset_return_items: 123,
              prorated_seller_voucher_offset_return_items: 123,
              prorated_payment_channel_promo_bank_offset_return_items: 123,
              prorated_payment_channel_promo_shopee_offset_return_items: 123,
              fsf_seller_protection_fee_claim_amount: 123,
              shipping_seller_protection_fee_amount: 123,
              final_return_to_seller_shipping_fee: 123,
              vat_on_imported_goods: 123,
              withholding_vat_tax: 1,
              withholding_pit_tax: 2,
              withholding_cit_tax: 3,
              tax_registration_code: "8881234567-888",
              seller_order_processing_fee: 3,
              buyer_paid_packaging_fee: 123,
              trade_in_bonus_seller: 123,
              fbs_fee: 123,
              net_commission_fee: 123,
              net_service_fee: 123,
              net_commission_fee_info_list: [
                {
                  rule_id: 123,
                  fee_amount: 123,
                  rule_display_name: "test_string",
                },
              ],
              net_service_fee_info_list: [
                {
                  rule_id: 123,
                  fee_amount: 123,
                  rule_display_name: "test_string",
                  category: "test_string",
                },
              ],
              seller_product_rebate: {
                amount: 123,
                commission_fee_offset: 123,
                service_fee_offset: 123,
              },
              pix_discount: 123,
              prorated_pix_discount_offset_return_items: 123,
              ads_escrow_top_up_fee_or_technical_support_fee: 123,
              th_import_duty: 123,
              remaining_voucher: 10,
            },
            buyer_payment_info: {
              buyer_payment_method: "test_string",
              buyer_service_fee: "test_string",
              buyer_tax_amount: 123,
              buyer_total_amount: 123,
              shopeevip_subtotal: 0.1,
              bcrs_discount: 0.1,
              credit_card_promotion: 123,
              icms_tax_amount: 123,
              import_tax_amount: 123,
              initial_buyer_txn_fee: 123,
              insurance_premium: 123,
              iof_tax_amount: 123,
              is_paid_by_credit_card: true,
              merchant_subtotal: 123,
              seller_voucher: 123,
              shipping_fee: 123,
              shipping_fee_sst_amount: 123,
              shopee_voucher: 123,
              shopee_coins_redeemed: 123,
              buyer_paid_packaging_fee: 123,
              trade_in_bonus: 123,
              bulky_handling_fee: 123,
              discount_pix: 123,
              bcrs_deposit: 0.1,
              ads_voucher_discount: 123,
            },
          },
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getEscrowDetailBatch(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_escrow_detail_batch",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getEscrowList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        release_time_from: 1651680000,
        release_time_to: 1651939200,
        page_size: 40,
        page_no: 1,
      };
      const exampleResponse = {
        escrow_list: [
          {
            order_sn: "220415N6SB140P",
            payout_amount: 5733.04,
            escrow_release_time: 1651849648,
          },
        ],
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getEscrowList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_escrow_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getIncomeDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        date_from: "2025-09-25",
        date_to: "2025-09-30",
        income_status: 1,
        cursor: "176714986216530",
        page_size: 30,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        request_id: "test_string",
        income_detail_list: [
          {
            next_page: {
              cursor: "176714986216530",
              page_size: 30,
            },
            income_detail_list_item: [
              {
                payment_method: "ATM Payment",
                order_sn: "2510102F4S56JW",
                description: "Order Income",
                status: "The payment has been successfully transferred.",
                currency: "Thai Baht",
                estimated_escrow_amount: 4709353.87,
                estimated_payout_time: 1755584911,
                to_release_amount: 4709353.87,
                creation_date: 1694753463,
                released_amount: 4709353.87,
                actual_payout_time: 1755584911,
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

      const result = await manager.getIncomeDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_income_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getIncomeOverview", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        income_status: 1,
      };
      const exampleResponse = {
        latest_payout_date: "2025-08-19",
        total_income: {
          pending_amount: 330598.87,
          to_release_amount: 330598.87,
          released_amount: 330598.87,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getIncomeOverview(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_income_overview",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getIncomeReport", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        income_report_id: 123456,
      };
      const exampleResponse = {
        id: 123456,
        file_name: "weekly_report_20241111.pdf",
        status: 1,
        generated_time: 12345678987654,
        file_link:
          "https://seller.uat.shopee.sg/api/v4/accounting/pc/seller_income/income_report/get_income_document_file?path=0/ODljOWY0MjYtOTExMS00MmIxLTkzOGEtNzQ1MmEyZThiZGJi/weekly_report_20241111.pdf",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getIncomeReport(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_income_report",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getIncomeStatement", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        income_statement_id: 123456,
      };
      const exampleResponse = {
        id: 123456,
        file_name: "weekly_report_20241111.pdf",
        status: 1,
        generated_time: 12345678987654,
        file_link:
          "https://seller.uat.shopee.sg/api/v4/accounting/pc/seller_income/income_report/get_income_document_file?path=0/ODljOWY0MjYtOTExMS00MmIxLTkzOGEtNzQ1MmEyZThiZGJi/weekly_report_20241111.pdf",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getIncomeStatement(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_income_statement",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemInstallmentStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [123],
      };
      const exampleResponse = {
        item_installment_list: [
          {
            item_id: 123,
            tenure_list: [123],
          },
        ],
        item_plan_ahora_list: [
          {
            item_id: 123,
            participate_plan_ahora: true,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemInstallmentStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_item_installment_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPaymentMethodList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = [
        {
          payment_method: ["test_string"],
          region: "test_string",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPaymentMethodList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_payment_method_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPayoutDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 10,
        page_no: 1,
        payout_time_from: 1643365068,
        payout_time_to: 1659003469,
      };
      const exampleResponse = {
        more: false,
        payout_list: [
          {
            payout_info: {
              from_currency: "VND",
              payout_currency: "USD",
              from_amount: 591797912,
              payout_amount: 25678.64,
              exchange_rate: "0.00",
              payout_time: 1651842208,
              pay_service: "Payoneer",
              payee_id: "279016275538",
            },
            escrow_list: [
              {
                escrow_amount: 20865,
                currency: "VND",
                order_sn: "220404NF3CFFNY",
              },
            ],
            offline_adjustment_list: [
              {
                adjustment_amount: 2,
                module: "Commission Fee",
                remark: "DRC commission fee adjustment",
                scenario: "Commission Fee Adjustment",
                adjustment_level: "shop",
                order_sn: "220322JUMMT0S0",
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

      const result = await manager.getPayoutDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_payout_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPayoutInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        payout_time_from: 1643365068,
        payout_time_to: 1659003469,
        page_size: 10,
        cursor: '""',
      };
      const exampleResponse = {
        payout_list: [
          {
            from_currency: "SGD",
            payout_currency: "USD",
            from_amount: 1769.01,
            payout_amount: 1769.01,
            exchange_rate: '"1"',
            payout_time: 1691050374,
            pay_service: "Payoneer",
            payee_id: '"279016275538"',
            encrypted_payout_id: '"16061973102097436445"',
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

      const result = await manager.getPayoutInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_payout_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopInstallmentStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        installment_status: 0,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopInstallmentStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_shop_installment_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWalletTransactionList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 123,
        page_size: 123,
        create_time_from: 123,
        create_time_to: 123,
        wallet_type: "test_string",
        transaction_type: "test_string",
        money_flow: "test_string",
        transaction_tab_type: "test_string",
      };
      const exampleResponse = {
        transaction_list: [
          {
            status: "test_string",
            transaction_type: "test_string",
            txn_title: "test_string",
            amount: 123,
            current_balance: 123,
            create_time: 123,
            order_sn: "test_string",
            refund_sn: "test_string",
            withdrawal_type: "test_string",
            transaction_fee: 123,
            description: "test_string",
            buyer_name: "test_string",
            pay_order_list: [
              {
                order_sn: "test_string",
                shop_name: "test_string",
              },
            ],
            shop_name: "test_string",
            withdrawal_id: 123,
            reason: "test_string",
            root_withdrawal_id: 123,
            transaction_tab_type: "test_string",
            money_flow: "test_string",
            outlet_shop_name: "test_string",
          },
        ],
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWalletTransactionList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/get_wallet_transaction_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setItemInstallmentStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [123],
        tenure_list: [123],
        participate_plan_ahora: true,
      };
      const exampleResponse = {
        item_installment_list: [
          {
            item_id: 123,
            tenure_list: [123],
          },
        ],
        item_plan_ahora_list: [
          {
            item_id: 123,
            participate_plan_ahor: true,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setItemInstallmentStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/set_item_installment_status",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setShopInstallmentStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        installment_status: 0,
      };
      const exampleResponse = {
        installment_status: 0,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setShopInstallmentStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/payment/set_shop_installment_status",
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
