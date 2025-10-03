import { BaseResponse } from "../schemas/base.js";
/**
 * Parameters for getting escrow detail
 */
export type GetEscrowDetailParams = {
    /** Shopee's unique identifier for an order */
    order_sn: string;
};
/**
 * Item details in escrow response
 */
export interface EscrowItem {
    /** ID of item */
    item_id: number;
    /** Name of item */
    item_name: string;
    /** A item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU */
    item_sku: string;
    /** ID of the model that belongs to the same item */
    model_id: number;
    /** Name of the model that belongs to the same item */
    model_name: string;
    /** A model SKU (stock keeping unit) is an identifier defined by a seller */
    model_sku: string;
    /** The original price of the item before ANY promotion/discount */
    original_price: number;
    /** The original price in primary currency (Only for CB SIP affiliate shop) */
    original_price_pri?: number;
    /** Price before bundle deal promo but after item promo */
    selling_price?: number;
    /** The after-discount price of the item */
    discounted_price: number;
    /** The discount provided by seller for this item */
    seller_discount?: number;
    /** The discount provided by Shopee for this item */
    shopee_discount?: number;
    /** The offset when buyer consumed Shopee Coins */
    discount_from_coin: number;
    /** The offset when buyer used Shopee voucher */
    discount_from_voucher_shopee: number;
    /** The offset when buyer used seller-specific voucher */
    discount_from_voucher_seller: number;
    /** The type of item activity */
    activity_type: string;
    /** ID of bundle/add-on deal */
    activity_id: number;
    /** Whether this is a main item for add-on deal */
    is_main_item: boolean;
    /** Number of items purchased */
    quantity_purchased: number;
    /** Whether this is a B2C owned item */
    is_b2c_shop_item?: boolean;
    /** Affiliate commission fee for items sold via Affiliate Program */
    ams_commission_fee?: number;
}
/**
 * Order adjustment information
 */
export interface OrderAdjustment {
    /** Adjustment transaction amount */
    amount: number;
    /** Adjustment transaction complete date */
    date: number;
    /** Currency type for adjustment */
    currency: string;
    /** Reason for adjustment */
    adjustment_reason: string;
}
/**
 * Tenure information for payment
 */
export interface TenureInfo {
    /** Payment channel name used at checkout */
    payment_channel_name: string;
    /** Instalment plan information */
    instalment_plan: string;
}
/**
 * Buyer payment information
 */
export interface BuyerPaymentInfo {
    /** Payment method used by buyer */
    buyer_payment_method: string;
    /** Service fee charged by Shopee to Buyer at checkout */
    buyer_service_fee: number;
    /** Tax amount paid by buyer */
    buyer_tax_amount: number;
    /** Total amount paid by buyer at checkout */
    buyer_total_amount: number;
    /** Credit card promotion amount */
    credit_card_promotion: number;
    /** ICMS tax amount (BR region only) */
    icms_tax_amount: number;
    /** Import tax amount */
    import_tax_amount: number;
    /** Initial buyer transaction fee */
    initial_buyer_txn_fee: number;
    /** Insurance premium paid by buyer */
    insurance_premium: number;
    /** IOF tax amount (BR region only) */
    iof_tax_amount: number;
    /** Whether paid by credit card */
    is_paid_by_credit_card: boolean;
    /** Total item price at checkout */
    merchant_subtotal: number;
    /** Seller voucher amount */
    seller_voucher: number;
    /** Shipping fee paid by buyer */
    shipping_fee: number;
    /** Shipping fee SST amount (MY region only) */
    shipping_fee_sst_amount: number;
    /** Shopee voucher amount */
    shopee_voucher: number;
    /** Shopee coins redeemed amount */
    shopee_coins_redeemed: number;
}
/**
 * Order income details
 */
export interface OrderIncome {
    /** The total amount seller expected to receive */
    escrow_amount: number;
    /** Total amount paid by buyer */
    buyer_total_amount: number;
    /** Original item price before discounts */
    order_original_price?: number;
    /** Original price before discounts */
    original_price: number;
    /** Total discounted price for order */
    order_discounted_price?: number;
    /** Sum of item prices before bundle deal */
    order_selling_price?: number;
    /** Total seller discount for order */
    order_seller_discount?: number;
    /** Sum of item seller discounts */
    seller_discount: number;
    /** Sum of Shopee discounts */
    shopee_discount: number;
    /** Seller voucher value */
    voucher_from_seller: number;
    /** Shopee voucher value */
    voucher_from_shopee: number;
    /** Shopee Coins offset amount */
    coins: number;
    /** Shipping fee paid by buyer */
    buyer_paid_shipping_fee: number;
    /** Buyer transaction fee */
    buyer_transaction_fee: number;
    /** Cross border tax amount */
    cross_border_tax: number;
    /** Payment promotion offset */
    payment_promotion: number;
    /** Commission fee charged by Shopee */
    commission_fee: number;
    /** Service fee for additional services */
    service_fee: number;
    /** Seller transaction fee */
    seller_transaction_fee: number;
    /** Lost parcel compensation */
    seller_lost_compensation: number;
    /** Seller coin cashback value */
    seller_coin_cash_back: number;
    /** Cross-border tax for Indonesian sellers */
    escrow_tax: number;
    /** Estimated shipping fee */
    estimated_shipping_fee: number;
    /** Final shipping fee adjustment */
    final_shipping_fee: number;
    /** Actual shipping cost */
    actual_shipping_fee: number;
    /** Service tax on shipping fee (MY SST) */
    shipping_fee_sst?: number;
    /** Weight used for shipping fee calculation */
    order_chargeable_weight?: number;
    /** Shipping rebate from Shopee */
    shopee_shipping_rebate: number;
    /** Shipping fee discount from 3PL */
    shipping_fee_discount_from_3pl: number;
    /** Seller shipping discount */
    seller_shipping_discount: number;
    /** Seller voucher codes */
    seller_voucher_code: string[];
    /** Adjustable refund amount from dispute resolution */
    drc_adjustable_refund: number;
    /** Final amount paid by buyer for items */
    cost_of_goods_sold: number;
    /** Original amount paid for items */
    original_cost_of_goods_sold: number;
    /** Original Shopee discount amount */
    original_shopee_discount: number;
    /** Seller refund amount for partial returns */
    seller_return_refund: number;
    /** List of items in the order */
    items: EscrowItem[];
    /** Escrow amount in primary currency */
    escrow_amount_pri?: number;
    /** Buyer total in primary currency */
    buyer_total_amount_pri?: number;
    /** Original price in primary currency */
    original_price_pri?: number;
    /** Seller refund in primary currency */
    seller_return_refund_pri?: number;
    /** Commission fee in primary currency */
    commission_fee_pri?: number;
    /** Service fee in primary currency */
    service_fee_pri?: number;
    /** Adjustable refund in primary currency */
    drc_adjustable_refund_pri?: number;
    /** Primary currency code */
    pri_currency?: string;
    /** Affiliate currency code */
    aff_currency?: string;
    /** Exchange rate between currencies */
    exchange_rate?: number;
    /** Reverse shipping fee */
    reverse_shipping_fee: number;
    /** Service tax on reverse shipping */
    reverse_shipping_fee_sst?: number;
    /** Product protection amount */
    final_product_protection: number;
    /** Credit card promotion amount */
    credit_card_promotion: number;
    /** Total credit card transaction fee */
    credit_card_transaction_fee: number;
    /** Product VAT tax */
    final_product_vat_tax: number;
    /** Shipping VAT tax */
    final_shipping_vat_tax?: number;
    /** Campaign fee charged by Shopee */
    campaign_fee?: number;
    /** SIP subsidy amount */
    sip_subsidy?: number;
    /** SIP subsidy in primary currency */
    sip_subsidy_pri?: number;
    /** Insurance claim for reverse shipping */
    rsf_seller_protection_fee_claim_amount?: number;
    /** Seller protection fee */
    shipping_seller_protection_fee_amount?: number;
    /** GST for product price */
    final_escrow_product_gst?: number;
    /** GST for shipping fee */
    final_escrow_shipping_gst?: number;
    /** Insurance premium for delivery protection */
    delivery_seller_protection_fee_premium_amount?: number;
    /** Order level adjustments */
    order_adjustment?: OrderAdjustment[];
    /** Total adjustment amount */
    total_adjustment_amount?: number;
    /** Final income after adjustments */
    escrow_amount_after_adjustment?: number;
    /** Affiliate commission fee */
    order_ams_commission_fee?: number;
    /** Payment method used by buyer */
    buyer_payment_method?: string;
    /** Instalment plan details */
    instalment_plan?: string;
    /** Sales tax on low value goods */
    sales_tax_on_lvg?: number;
    /** Failed delivery shipping fee */
    final_return_to_seller_shipping_fee?: number;
    /** Withholding tax amount */
    withholding_tax?: number;
    /** Overseas return service fee */
    overseas_return_service_fee?: number;
    /** Prorated coin offset for returns */
    prorated_coins_value_offset_return_items?: number;
    /** Prorated Shopee voucher for returns */
    prorated_shopee_voucher_offset_return_items?: number;
    /** Prorated seller voucher for returns */
    prorated_seller_voucher_offset_return_items?: number;
    /** Prorated bank promo for returns */
    prorated_payment_channel_promo_bank_offset_return_items?: number;
    /** Prorated Shopee promo for returns */
    prorated_payment_channel_promo_shopee_offset_return_items?: number;
    /** Shipping fee protection claim */
    fsf_seller_protection_fee_claim_amount?: number;
    /** VAT on imported goods */
    vat_on_imported_goods?: number;
    /** Payment tenure information */
    tenure_info_list?: TenureInfo;
}
/**
 * Response for get escrow detail API
 */
export interface GetEscrowDetailResponse extends BaseResponse {
    response: {
        /** Shopee's unique identifier for an order */
        order_sn: string;
        /** Username of buyer */
        buyer_user_name: string;
        /** List of return order numbers */
        return_order_sn_list: string[];
        /** Order income details */
        order_income: OrderIncome;
        /** Buyer payment information */
        buyer_payment_info: BuyerPaymentInfo;
    };
}
/**
 * Parameters for getting escrow list
 */
export type GetEscrowListParams = {
    /** Query start time (timestamp) */
    release_time_from: number;
    /** Query end time (timestamp) */
    release_time_to: number;
    /** Number of pages returned, max: 100, default: 40 */
    page_size?: number;
    /** The page number, min: 1, default: 1 */
    page_no?: number;
};
/**
 * Escrow item in list response
 */
export interface EscrowListItem {
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** The settlement amount */
    payout_amount: number;
    /** The release time (timestamp) */
    escrow_release_time: number;
}
/**
 * Response for get escrow list API
 */
export interface GetEscrowListResponse extends BaseResponse {
    response: {
        /** The list of escrow order sn */
        escrow_list: EscrowListItem[];
        /** Indicates whether there are more pages */
        more: boolean;
    };
}
/**
 * Parameters for getting escrow detail batch
 */
export type GetEscrowDetailBatchParams = {
    /** List of order SNs, limit [1,50]. Recommended 1-20 orders per request */
    order_sn_list: string[];
};
/**
 * Escrow detail batch item
 */
export interface EscrowDetailBatchItem {
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** Username of buyer */
    buyer_user_name: string;
    /** List of return order numbers */
    return_order_sn_list: string[];
    /** Order income details */
    order_income: OrderIncome;
    /** Buyer payment information */
    buyer_payment_info: BuyerPaymentInfo;
}
/**
 * Response for get escrow detail batch API
 */
export interface GetEscrowDetailBatchResponse extends BaseResponse {
    response: {
        /** List of escrow details */
        order_income_list: EscrowDetailBatchItem[];
    };
}
/**
 * Parameters for getting wallet transaction list
 */
export type GetWalletTransactionListParams = {
    /** The start time of the query, timestamp */
    create_time_from: number;
    /** The end time of the query, timestamp */
    create_time_to: number;
    /** Offset for pagination, start from 0 */
    page_no?: number;
    /** The number of records returned per page, min 1, max 100, default 40 */
    page_size?: number;
    /** Transaction types filter */
    transaction_type?: number;
};
/**
 * Wallet transaction item
 */
export interface WalletTransaction {
    /** Transaction ID */
    transaction_id: number;
    /** Transaction type */
    transaction_type: string;
    /** Transaction status */
    status: string;
    /** Amount */
    amount: number;
    /** Current balance after this transaction */
    current_balance: number;
    /** Transaction time (timestamp) */
    create_time: number;
    /** Order SN if related to order */
    order_sn?: string;
    /** Withdrawal ID if related to withdrawal */
    withdrawal_id?: number;
    /** Reason for transaction */
    reason: string;
}
/**
 * Response for get wallet transaction list API
 */
export interface GetWalletTransactionListResponse extends BaseResponse {
    response: {
        /** List of wallet transactions */
        transaction_list: WalletTransaction[];
        /** Indicates whether there are more pages */
        more: boolean;
    };
}
/**
 * Payment method item
 */
export interface PaymentMethod {
    /** Payment method ID */
    payment_method_id: number;
    /** Payment method name */
    payment_method_name: string;
    /** Whether this payment method is enabled */
    is_enabled: boolean;
}
/**
 * Response for get payment method list API
 */
export interface GetPaymentMethodListResponse extends BaseResponse {
    response: {
        /** List of payment methods */
        payment_method_list: PaymentMethod[];
    };
}
/**
 * Response for get shop installment status API
 */
export interface GetShopInstallmentStatusResponse extends BaseResponse {
    response: {
        /** Tenure list for shop */
        tenure_list: number[];
        /** Shop installment status */
        status: string;
    };
}
/**
 * Parameters for setting shop installment status
 */
export type SetShopInstallmentStatusParams = {
    /** Whether to enable installment for shop */
    installment_enabled: boolean;
    /** List of tenure months to enable */
    tenure_list?: number[];
};
/**
 * Response for set shop installment status API
 */
export interface SetShopInstallmentStatusResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for getting item installment status
 */
export type GetItemInstallmentStatusParams = {
    /** Item ID */
    item_id: number;
};
/**
 * Response for get item installment status API
 */
export interface GetItemInstallmentStatusResponse extends BaseResponse {
    response: {
        /** Item ID */
        item_id: number;
        /** Tenure list enabled for this item */
        tenure_list: number[];
    };
}
/**
 * Parameters for setting item installment status
 */
export type SetItemInstallmentStatusParams = {
    /** Item ID */
    item_id: number;
    /** List of tenure months to enable */
    tenure_list: number[];
};
/**
 * Response for set item installment status API
 */
export interface SetItemInstallmentStatusResponse extends BaseResponse {
    response: Record<string, never>;
}
/**
 * Parameters for generating income report
 */
export type GenerateIncomeReportParams = {
    /** Start time for the report (timestamp) */
    start_time: number;
    /** End time for the report (timestamp) */
    end_time: number;
    /** Currency for the report */
    currency?: string;
};
/**
 * Response for generate income report API
 */
export interface GenerateIncomeReportResponse extends BaseResponse {
    response: {
        /** Unique identifier for the income report */
        income_report_id: string;
    };
}
/**
 * Parameters for getting income report
 */
export type GetIncomeReportParams = {
    /** Income report ID */
    income_report_id: string;
};
/**
 * Response for get income report API
 */
export interface GetIncomeReportResponse extends BaseResponse {
    response: {
        /** Income report ID */
        income_report_id: string;
        /** Report status: PROCESSING, COMPLETED, FAILED */
        status: string;
        /** Download URL if report is ready */
        url?: string;
        /** Report generation time (timestamp) */
        create_time: number;
    };
}
/**
 * Parameters for generating income statement
 */
export type GenerateIncomeStatementParams = {
    /** Start time for the statement (timestamp) */
    start_time: number;
    /** End time for the statement (timestamp) */
    end_time: number;
};
/**
 * Response for generate income statement API
 */
export interface GenerateIncomeStatementResponse extends BaseResponse {
    response: {
        /** Unique identifier for the income statement */
        income_statement_id: string;
    };
}
/**
 * Parameters for getting income statement
 */
export type GetIncomeStatementParams = {
    /** Income statement ID */
    income_statement_id: string;
};
/**
 * Response for get income statement API
 */
export interface GetIncomeStatementResponse extends BaseResponse {
    response: {
        /** Income statement ID */
        income_statement_id: string;
        /** Statement status: PROCESSING, COMPLETED, FAILED */
        status: string;
        /** Download URL if statement is ready */
        url?: string;
        /** Statement generation time (timestamp) */
        create_time: number;
    };
}
/**
 * Parameters for getting billing transaction info
 */
export type GetBillingTransactionInfoParams = {
    /** Transaction time from (timestamp) */
    transaction_time_from: number;
    /** Transaction time to (timestamp) */
    transaction_time_to: number;
    /** Page number, default 1 */
    page_no?: number;
    /** Page size, max 100, default 40 */
    page_size?: number;
};
/**
 * Billing transaction item
 */
export interface BillingTransaction {
    /** Transaction ID */
    transaction_id: string;
    /** Transaction type */
    transaction_type: string;
    /** Transaction amount */
    amount: number;
    /** Transaction time (timestamp) */
    transaction_time: number;
    /** Order SN if applicable */
    order_sn?: string;
    /** Currency */
    currency: string;
}
/**
 * Response for get billing transaction info API
 */
export interface GetBillingTransactionInfoResponse extends BaseResponse {
    response: {
        /** List of billing transactions */
        transaction_list: BillingTransaction[];
        /** Indicates whether there are more pages */
        more: boolean;
    };
}
/**
 * Parameters for getting payout detail (deprecated, use getPayoutInfo instead)
 */
export type GetPayoutDetailParams = {
    /** Payout time from (timestamp) */
    payout_time_from: number;
    /** Payout time to (timestamp) */
    payout_time_to: number;
    /** Page number, default 1 */
    page_no?: number;
    /** Page size, max 100, default 40 */
    page_size?: number;
};
/**
 * Payout detail item
 */
export interface PayoutDetail {
    /** Payout ID */
    payout_id: string;
    /** Payout amount */
    payout_amount: number;
    /** Payout time (timestamp) */
    payout_time: number;
    /** Currency */
    currency: string;
    /** Exchange rate */
    exchange_rate?: number;
}
/**
 * Response for get payout detail API (deprecated)
 */
export interface GetPayoutDetailResponse extends BaseResponse {
    response: {
        /** List of payout details */
        payout_list: PayoutDetail[];
        /** Indicates whether there are more pages */
        more: boolean;
    };
}
/**
 * Parameters for getting payout info
 */
export type GetPayoutInfoParams = {
    /** Payout time from (timestamp) */
    payout_time_from: number;
    /** Payout time to (timestamp) */
    payout_time_to: number;
    /** Page number, default 1 */
    page_no?: number;
    /** Page size, max 100, default 40 */
    page_size?: number;
};
/**
 * Payout info item
 */
export interface PayoutInfo {
    /** Payout ID */
    payout_id: string;
    /** Payout amount */
    payout_amount: number;
    /** Payout time (timestamp) */
    payout_time: number;
    /** Currency */
    currency: string;
    /** Exchange rate */
    exchange_rate?: number;
    /** Payout fee */
    payout_fee?: number;
}
/**
 * Response for get payout info API
 */
export interface GetPayoutInfoResponse extends BaseResponse {
    response: {
        /** List of payout info */
        payout_list: PayoutInfo[];
        /** Indicates whether there are more pages */
        more: boolean;
    };
}
