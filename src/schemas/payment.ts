import { BaseResponse } from '../schemas/base.js';

/**
 * Parameters for getting escrow detail
 */
export type GetEscrowDetailParams = {
  /** Shopee's unique identifier for an order */
  order_sn: string;
}

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