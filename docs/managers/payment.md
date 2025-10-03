# PaymentManager

The PaymentManager handles payment and financial information for orders.

## Overview

The PaymentManager provides methods for:
- Getting escrow (payment) details for individual or multiple orders
- Retrieving payment breakdowns and fees
- Accessing buyer payment information
- Managing wallet transactions (local shops only)
- Managing installment payment options for shop and items (TH/TW only)
- Generating and downloading income reports and statements
- Accessing billing and payout information for Cross Border sellers
- Querying available payment methods

## Quick Start

```typescript
// Get payment details for a single order
const payment = await sdk.payment.getEscrowDetail({
  order_sn: 'ORDER123',
});

console.log('Escrow amount:', payment.order_income.escrow_amount);
console.log('Buyer paid:', payment.order_income.buyer_total_amount);
console.log('Items:', payment.order_income.items);

// Get list of escrow orders in a time range
const escrowList = await sdk.payment.getEscrowList({
  release_time_from: 1651680000,
  release_time_to: 1651939200,
  page_size: 40,
});

console.log('Escrow orders:', escrowList.response.escrow_list);

// Get payment details for multiple orders at once
const batchDetails = await sdk.payment.getEscrowDetailBatch({
  order_sn_list: ['ORDER123', 'ORDER456', 'ORDER789'],
});

console.log('Order incomes:', batchDetails.response.order_income_list);

// Generate and download income report
const reportResp = await sdk.payment.generateIncomeReport({
  start_time: 1651680000,
  end_time: 1651939200,
  currency: 'SGD',
});

// Wait and check status
const reportStatus = await sdk.payment.getIncomeReport({
  income_report_id: reportResp.response.income_report_id,
});

if (reportStatus.response.status === 'COMPLETED') {
  console.log('Download from:', reportStatus.response.url);
}
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

### getEscrowList()

**API Documentation:** [v2.payment.get_escrow_list](https://open.shopee.com/documents/v2/v2.payment.get_escrow_list?module=97&type=1)

Fetch the accounting list of orders within a time range.

```typescript
const response = await sdk.payment.getEscrowList({
  release_time_from: 1651680000,
  release_time_to: 1651939200,
  page_size: 40,
  page_no: 1,
});

response.response.escrow_list.forEach((escrow) => {
  console.log('Order SN:', escrow.order_sn);
  console.log('Payout Amount:', escrow.payout_amount);
  console.log('Release Time:', escrow.escrow_release_time);
});

console.log('Has more pages:', response.response.more);
```

### getEscrowDetailBatch()

**API Documentation:** [v2.payment.get_escrow_detail_batch](https://open.shopee.com/documents/v2/v2.payment.get_escrow_detail_batch?module=97&type=1)

Fetch order income details for multiple orders at once. Recommended for 1-20 orders per request, maximum 50.

```typescript
const response = await sdk.payment.getEscrowDetailBatch({
  order_sn_list: ['ORDER123', 'ORDER456', 'ORDER789'],
});

response.response.order_income_list.forEach((orderIncome) => {
  console.log('Order:', orderIncome.order_sn);
  console.log('Escrow Amount:', orderIncome.order_income.escrow_amount);
  console.log('Buyer:', orderIncome.buyer_user_name);
});
```

### getWalletTransactionList()

**API Documentation:** [v2.payment.get_wallet_transaction_list](https://open.shopee.com/documents/v2/v2.payment.get_wallet_transaction_list?module=97&type=1)

Get wallet transaction records. Only applicable for local shops.

```typescript
const response = await sdk.payment.getWalletTransactionList({
  create_time_from: 1651680000,
  create_time_to: 1651939200,
  page_no: 0,
  page_size: 40,
});

response.response.transaction_list.forEach((txn) => {
  console.log('Transaction ID:', txn.transaction_id);
  console.log('Type:', txn.transaction_type);
  console.log('Amount:', txn.amount);
  console.log('Balance:', txn.current_balance);
  console.log('Time:', new Date(txn.create_time * 1000));
});
```

### getPaymentMethodList()

**API Documentation:** [v2.payment.get_payment_method_list](https://open.shopee.com/documents/v2/v2.payment.get_payment_method_list?module=97&type=1)

Obtain available payment methods. No authentication required.

```typescript
const response = await sdk.payment.getPaymentMethodList();

response.response.payment_method_list.forEach((method) => {
  console.log('ID:', method.payment_method_id);
  console.log('Name:', method.payment_method_name);
  console.log('Enabled:', method.is_enabled);
});
```

### getShopInstallmentStatus()

**API Documentation:** [v2.payment.get_shop_installment_status](https://open.shopee.com/documents/v2/v2.payment.get_shop_installment_status?module=97&type=1)

Get the installment state of the shop.

```typescript
const response = await sdk.payment.getShopInstallmentStatus();

console.log('Status:', response.response.status);
console.log('Available tenures:', response.response.tenure_list);
```

### setShopInstallmentStatus()

**API Documentation:** [v2.payment.set_shop_installment_status](https://open.shopee.com/documents/v2/v2.payment.set_shop_installment_status?module=97&type=1)

Set the installment capability at shop level.

```typescript
await sdk.payment.setShopInstallmentStatus({
  installment_enabled: true,
  tenure_list: [3, 6, 12],
});
```

### getItemInstallmentStatus()

**API Documentation:** [v2.payment.get_item_installment_status](https://open.shopee.com/documents/v2/v2.payment.get_item_installment_status?module=97&type=1)

Get item installment tenures. Only for TH and TW regions.

```typescript
const response = await sdk.payment.getItemInstallmentStatus({
  item_id: 123456,
});

console.log('Item ID:', response.response.item_id);
console.log('Available tenures:', response.response.tenure_list);
```

### setItemInstallmentStatus()

**API Documentation:** [v2.payment.set_item_installment_status](https://open.shopee.com/documents/v2/v2.payment.set_item_installment_status?module=97&type=1)

Set item installment. Only for TH and TW regions.

```typescript
await sdk.payment.setItemInstallmentStatus({
  item_id: 123456,
  tenure_list: [3, 6, 12],
});
```

### generateIncomeReport()

**API Documentation:** [v2.payment.generate_income_report](https://open.shopee.com/documents/v2/v2.payment.generate_income_report?module=97&type=1)

Trigger income report generation.

```typescript
const response = await sdk.payment.generateIncomeReport({
  start_time: 1651680000,
  end_time: 1651939200,
  currency: 'SGD',
});

console.log('Report ID:', response.response.income_report_id);
```

### getIncomeReport()

**API Documentation:** [v2.payment.get_income_report](https://open.shopee.com/documents/v2/v2.payment.get_income_report?module=97&type=1)

Query income report status and get download link when ready.

```typescript
const response = await sdk.payment.getIncomeReport({
  income_report_id: 'REPORT_123456',
});

console.log('Status:', response.response.status);
if (response.response.status === 'COMPLETED') {
  console.log('Download URL:', response.response.url);
}
```

### generateIncomeStatement()

**API Documentation:** [v2.payment.generate_income_statement](https://open.shopee.com/documents/v2/v2.payment.generate_income_statement?module=97&type=1)

Trigger income statement generation.

```typescript
const response = await sdk.payment.generateIncomeStatement({
  start_time: 1651680000,
  end_time: 1651939200,
});

console.log('Statement ID:', response.response.income_statement_id);
```

### getIncomeStatement()

**API Documentation:** [v2.payment.get_income_statement](https://open.shopee.com/documents/v2/v2.payment.get_income_statement?module=97&type=1)

Query income statement status and get download link when ready.

```typescript
const response = await sdk.payment.getIncomeStatement({
  income_statement_id: 'STATEMENT_123456',
});

console.log('Status:', response.response.status);
if (response.response.status === 'COMPLETED') {
  console.log('Download URL:', response.response.url);
}
```

### getBillingTransactionInfo()

**API Documentation:** [v2.payment.get_billing_transaction_info](https://open.shopee.com/documents/v2/v2.payment.get_billing_transaction_info?module=97&type=1)

Get detailed payout transaction data. Only applicable for Cross Border (CB) sellers.

```typescript
const response = await sdk.payment.getBillingTransactionInfo({
  transaction_time_from: 1651680000,
  transaction_time_to: 1651939200,
  page_no: 1,
  page_size: 40,
});

response.response.transaction_list.forEach((txn) => {
  console.log('Transaction ID:', txn.transaction_id);
  console.log('Type:', txn.transaction_type);
  console.log('Amount:', txn.amount);
  console.log('Currency:', txn.currency);
});
```

### getPayoutDetail()

**API Documentation:** [v2.payment.get_payout_detail](https://open.shopee.com/documents/v2/v2.payment.get_payout_detail?module=97&type=1)

**⚠️ Deprecated:** Use `getPayoutInfo()` instead.

Get shop's payout data. Only applicable for Cross Border (CB) sellers.

```typescript
const response = await sdk.payment.getPayoutDetail({
  payout_time_from: 1651680000,
  payout_time_to: 1651939200,
  page_no: 1,
  page_size: 40,
});

response.response.payout_list.forEach((payout) => {
  console.log('Payout ID:', payout.payout_id);
  console.log('Amount:', payout.payout_amount);
  console.log('Currency:', payout.currency);
});
```

### getPayoutInfo()

**API Documentation:** [v2.payment.get_payout_info](https://open.shopee.com/documents/v2/v2.payment.get_payout_info?module=97&type=1)

Get shop's payout data. Only applicable for Cross Border (CB) sellers. This is the replacement for `getPayoutDetail()`.

```typescript
const response = await sdk.payment.getPayoutInfo({
  payout_time_from: 1651680000,
  payout_time_to: 1651939200,
  page_no: 1,
  page_size: 40,
});

response.response.payout_list.forEach((payout) => {
  console.log('Payout ID:', payout.payout_id);
  console.log('Amount:', payout.payout_amount);
  console.log('Currency:', payout.currency);
  console.log('Exchange Rate:', payout.exchange_rate);
  console.log('Payout Fee:', payout.payout_fee);
});
```

## Use Cases

### Batch Download Income Reports

```typescript
async function downloadMonthlyReports(year: number) {
  const reports = [];
  
  for (let month = 1; month <= 12; month++) {
    const startTime = Math.floor(new Date(year, month - 1, 1).getTime() / 1000);
    const endTime = Math.floor(new Date(year, month, 0).getTime() / 1000);
    
    // Generate report
    const generateResp = await sdk.payment.generateIncomeReport({
      start_time: startTime,
      end_time: endTime,
      currency: 'SGD',
    });
    
    // Poll for completion
    let status = 'PROCESSING';
    let downloadUrl;
    
    while (status === 'PROCESSING') {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResp = await sdk.payment.getIncomeReport({
        income_report_id: generateResp.response.income_report_id,
      });
      
      status = statusResp.response.status;
      downloadUrl = statusResp.response.url;
    }
    
    if (status === 'COMPLETED') {
      reports.push({
        month,
        url: downloadUrl,
      });
    }
  }
  
  return reports;
}
```

### Track Wallet Balance

```typescript
async function trackWalletBalance(days: number = 30) {
  const endTime = Math.floor(Date.now() / 1000);
  const startTime = endTime - (days * 24 * 60 * 60);
  
  const transactions = [];
  let pageNo = 0;
  let hasMore = true;
  
  while (hasMore) {
    const response = await sdk.payment.getWalletTransactionList({
      create_time_from: startTime,
      create_time_to: endTime,
      page_no: pageNo,
      page_size: 100,
    });
    
    transactions.push(...response.response.transaction_list);
    hasMore = response.response.more;
    pageNo++;
  }
  
  // Calculate balance changes
  const summary = {
    starting_balance: 0,
    ending_balance: 0,
    total_income: 0,
    total_expense: 0,
    transactions_count: transactions.length,
  };
  
  if (transactions.length > 0) {
    summary.ending_balance = transactions[0].current_balance;
    
    transactions.forEach(txn => {
      if (txn.amount > 0) {
        summary.total_income += txn.amount;
      } else {
        summary.total_expense += Math.abs(txn.amount);
      }
    });
    
    summary.starting_balance = summary.ending_balance - summary.total_income + summary.total_expense;
  }
  
  return summary;
}
```

### Manage Installment Plans

```typescript
async function enableInstallmentForProducts(itemIds: number[], tenures: number[] = [3, 6, 12]) {
  // First, enable at shop level
  await sdk.payment.setShopInstallmentStatus({
    installment_enabled: true,
    tenure_list: tenures,
  });
  
  // Then enable for each item
  const results = [];
  
  for (const itemId of itemIds) {
    try {
      await sdk.payment.setItemInstallmentStatus({
        item_id: itemId,
        tenure_list: tenures,
      });
      
      results.push({
        item_id: itemId,
        success: true,
      });
    } catch (error) {
      results.push({
        item_id: itemId,
        success: false,
        error: error.message,
      });
    }
  }
  
  return results;
}
```

### Reconcile Cross-Border Payouts

```typescript
async function reconcilePayouts(startDate: Date, endDate: Date) {
  const startTime = Math.floor(startDate.getTime() / 1000);
  const endTime = Math.floor(endDate.getTime() / 1000);
  
  // Get payout information
  const payoutResp = await sdk.payment.getPayoutInfo({
    payout_time_from: startTime,
    payout_time_to: endTime,
    page_size: 100,
  });
  
  // Get billing transactions
  const billingResp = await sdk.payment.getBillingTransactionInfo({
    transaction_time_from: startTime,
    transaction_time_to: endTime,
    page_size: 100,
  });
  
  // Reconcile
  const reconciliation = {
    total_payout: 0,
    total_fees: 0,
    total_transactions: 0,
    payouts: payoutResp.response.payout_list.map(p => ({
      id: p.payout_id,
      amount: p.payout_amount,
      currency: p.currency,
      fee: p.payout_fee || 0,
      exchange_rate: p.exchange_rate,
    })),
    transactions: billingResp.response.transaction_list,
  };
  
  reconciliation.total_payout = payoutResp.response.payout_list.reduce(
    (sum, p) => sum + p.payout_amount,
    0
  );
  
  reconciliation.total_fees = payoutResp.response.payout_list.reduce(
    (sum, p) => sum + (p.payout_fee || 0),
    0
  );
  
  reconciliation.total_transactions = billingResp.response.transaction_list.length;
  
  return reconciliation;
}
```

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
