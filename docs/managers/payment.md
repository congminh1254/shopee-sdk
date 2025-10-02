# PaymentManager

The PaymentManager handles payment and financial information for orders.

## Overview

The PaymentManager provides methods for:
- Getting escrow (payment) details for orders
- Retrieving payment breakdowns and fees
- Accessing buyer payment information

## Quick Start

```typescript
// Get payment details for an order
const payment = await sdk.payment.getEscrowDetail({
  order_sn: 'ORDER123',
});

console.log('Escrow amount:', payment.order_income.escrow_amount);
console.log('Buyer paid:', payment.order_income.buyer_total_amount);
console.log('Items:', payment.order_income.items);
```

## Methods

### getEscrowDetail()

**API Documentation:** [v2.payment.get_escrow_detail](https://open.shopee.com/documents/v2/v2.payment.get_escrow_detail?module=97&type=1)

Get detailed accounting information for an order.

```typescript
const response = await sdk.payment.getEscrowDetail({
  order_sn: 'ORDER123',
});

// Seller's expected income
console.log('Escrow amount:', response.order_income.escrow_amount);

// Total amount paid by buyer
console.log('Buyer total:', response.order_income.buyer_total_amount);

// Shipping fees
console.log('Shipping fee:', response.order_income.actual_shipping_fee);
console.log('Buyer shipping:', response.order_income.buyer_paid_shipping_fee);

// Item breakdown
response.order_income.items.forEach((item) => {
  console.log('Item:', item.item_sku);
  console.log('Quantity:', item.quantity_purchased);
  console.log('Price:', item.original_price);
  console.log('Discounted:', item.discounted_price);
  console.log('Seller discount:', item.seller_discount);
  console.log('Shopee discount:', item.shopee_discount);
});

// Fees and adjustments
console.log('Transaction fee:', response.order_income.transaction_fee);
console.log('Commission fee:', response.order_income.commission_fee);
console.log('Service fee:', response.order_income.service_fee);

// Taxes
console.log('VAT:', response.order_income.vat);
console.log('Withholding tax:', response.order_income.seller_withholding_tax);

// Coins and vouchers
console.log('Coins:', response.order_income.coins);
console.log('Voucher from seller:', response.order_income.voucher_from_seller);
console.log('Voucher from shopee:', response.order_income.voucher_from_shopee);

// Buyer payment info
console.log('Payment method:', response.buyer_payment_info.payment_method);
console.log('Card number:', response.buyer_payment_info.card_no);
```

**Response Structure:**

```typescript
interface EscrowDetailResponse {
  order_sn: string;
  buyer_user_name: string;
  return_order_sn_list?: string[];
  
  order_income: {
    escrow_amount: number;          // Amount seller will receive
    buyer_total_amount: number;     // Total paid by buyer
    
    // Item details
    items: Array<{
      item_sku: string;
      item_name: string;
      model_sku: string;
      model_name: string;
      quantity_purchased: number;
      original_price: number;
      sale_price: number;
      discounted_price: number;
      is_wholesale: boolean;
      weight: number;
      is_add_on_deal: boolean;
      is_main_item: boolean;
      seller_discount: number;
      shopee_discount: number;
    }>;
    
    // Shipping
    actual_shipping_fee: number;
    buyer_paid_shipping_fee: number;
    shipping_fee_rebate_from_shopee: number;
    
    // Fees
    transaction_fee: number;
    commission_fee: number;
    service_fee: number;
    buyer_transaction_fee: number;
    
    // Taxes
    vat: number;
    seller_withholding_tax: number;
    
    // Discounts
    coins: number;
    voucher_from_seller: number;
    voucher_from_shopee: number;
    credit_card_promotion: number;
    
    // Other
    insurance_fee: number;
    reverse_shipping_fee: number;
  };
  
  buyer_payment_info: {
    payment_method: string;
    card_no?: string;
  };
}
```

## Use Cases

### Calculate Seller Profit

```typescript
async function calculateProfit(orderSn: string) {
  const payment = await sdk.payment.getEscrowDetail({
    order_sn: orderSn,
  });
  
  const income = payment.order_income;
  
  const revenue = income.escrow_amount;
  const costs = {
    commission: income.commission_fee,
    transaction: income.transaction_fee,
    service: income.service_fee,
    shipping: income.actual_shipping_fee - income.buyer_paid_shipping_fee,
    tax: income.seller_withholding_tax,
  };
  
  const totalCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
  const profit = revenue - totalCosts;
  
  console.log('Revenue:', revenue);
  console.log('Costs:', costs);
  console.log('Total costs:', totalCosts);
  console.log('Net profit:', profit);
  
  return {
    revenue,
    costs,
    profit,
    margin: (profit / revenue) * 100,
  };
}
```

### Generate Financial Report

```typescript
async function generateFinancialReport(orderSns: string[]) {
  const report = {
    total_revenue: 0,
    total_fees: 0,
    total_discounts: 0,
    total_taxes: 0,
    orders: [],
  };
  
  for (const orderSn of orderSns) {
    try {
      const payment = await sdk.payment.getEscrowDetail({
        order_sn: orderSn,
      });
      
      const income = payment.order_income;
      
      report.total_revenue += income.escrow_amount;
      report.total_fees += income.commission_fee + income.transaction_fee + income.service_fee;
      report.total_discounts += income.voucher_from_seller + income.shopee_discount;
      report.total_taxes += income.vat + income.seller_withholding_tax;
      
      report.orders.push({
        order_sn: orderSn,
        revenue: income.escrow_amount,
        buyer_paid: income.buyer_total_amount,
      });
    } catch (error) {
      console.warn(`Failed to get payment details for ${orderSn}:`, error);
    }
  }
  
  return report;
}
```

### Track Fees Over Time

```typescript
async function trackMonthlyFees(year: number, month: number) {
  // Get orders for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  const orders = await sdk.order.getOrderList({
    time_range_field: 'create_time',
    time_from: Math.floor(startDate.getTime() / 1000),
    time_to: Math.floor(endDate.getTime() / 1000),
    page_size: 100,
  });
  
  const orderSns = orders.order_list.map(o => o.order_sn);
  
  const fees = {
    commission: 0,
    transaction: 0,
    service: 0,
    shipping: 0,
  };
  
  for (const orderSn of orderSns) {
    const payment = await sdk.payment.getEscrowDetail({
      order_sn: orderSn,
    });
    
    fees.commission += payment.order_income.commission_fee;
    fees.transaction += payment.order_income.transaction_fee;
    fees.service += payment.order_income.service_fee;
    fees.shipping += Math.max(
      0,
      payment.order_income.actual_shipping_fee - payment.order_income.buyer_paid_shipping_fee
    );
  }
  
  return fees;
}
```

## Best Practices

### 1. Handle Missing Data

```typescript
async function getPaymentSafely(orderSn: string) {
  try {
    const payment = await sdk.payment.getEscrowDetail({
      order_sn: orderSn,
    });
    return payment;
  } catch (error) {
    if (error.error === 'error_not_found') {
      console.log('Payment details not available yet');
      return null;
    }
    throw error;
  }
}
```

### 2. Cache Payment Data

```typescript
class PaymentCache {
  private cache = new Map<string, any>();
  
  async getEscrowDetail(orderSn: string) {
    if (this.cache.has(orderSn)) {
      return this.cache.get(orderSn);
    }
    
    const payment = await sdk.payment.getEscrowDetail({
      order_sn: orderSn,
    });
    
    this.cache.set(orderSn, payment);
    return payment;
  }
  
  clear() {
    this.cache.clear();
  }
}
```

### 3. Verify Payment Amounts

```typescript
async function verifyPayment(orderSn: string, expectedAmount: number) {
  const payment = await sdk.payment.getEscrowDetail({
    order_sn: orderSn,
  });
  
  const actualAmount = payment.order_income.buyer_total_amount;
  
  if (Math.abs(actualAmount - expectedAmount) > 0.01) {
    console.warn('Payment amount mismatch!');
    console.warn('Expected:', expectedAmount);
    console.warn('Actual:', actualAmount);
    return false;
  }
  
  return true;
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_not_found` | Payment details not available | Wait for order to be processed/completed |
| `error_param` | Invalid order_sn | Verify order_sn is correct |
| `error_auth` | Authentication failed | Check token is valid |
| `error_server` | Server error | Retry request after delay |

## Payment Timing

Payment details are typically available:
- After order is marked as SHIPPED or COMPLETED
- May not be immediately available for READY_TO_SHIP orders
- Returns are reflected in return_order_sn_list

## Related

- [OrderManager](./order.md) - Order information
- [VoucherManager](./voucher.md) - Discount management
- [Authentication Guide](../guides/authentication.md) - API authentication
