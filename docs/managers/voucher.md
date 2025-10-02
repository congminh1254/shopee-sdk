# VoucherManager

The VoucherManager handles discount voucher creation, management, and retrieval.

## Overview

The VoucherManager provides methods for:
- Creating shop vouchers and discount codes
- Managing voucher lifecycle (update, end, delete)
- Retrieving voucher information and lists

## Quick Start

```typescript
// Add a new voucher
const voucher = await sdk.voucher.addVoucher({
  voucher_name: 'Summer Sale 2024',
  voucher_code: 'SUMMER20',
  start_time: Math.floor(Date.now() / 1000),
  end_time: Math.floor(Date.now() / 1000) + 30 * 86400, // 30 days
  voucher_type: 1, // Shop voucher
  reward_type: 1, // Fixed amount discount
  discount_amount: 10.00,
  min_basket_price: 50.00,
  usage_quantity: 100,
});

// Get voucher list
const vouchers = await sdk.voucher.getVoucherList({
  status: 'ongoing',
  page_size: 20,
});

// Update voucher
await sdk.voucher.updateVoucher({
  voucher_id: 123456,
  voucher_name: 'Updated Summer Sale',
  usage_quantity: 200,
});
```

## Methods

### addVoucher()

Create a new discount voucher.

```typescript
const response = await sdk.voucher.addVoucher({
  // Basic info
  voucher_name: 'New Year Sale',
  voucher_code: 'NY2024', // Optional: custom code
  
  // Time period
  start_time: Math.floor(Date.now() / 1000),
  end_time: Math.floor(Date.now() / 1000) + 7 * 86400, // 7 days
  
  // Voucher type
  voucher_type: 1, // 1 = Shop voucher, 2 = Product voucher
  
  // Discount configuration
  reward_type: 1, // 1 = Fixed amount, 2 = Percentage
  discount_amount: 15.00, // For fixed amount
  percentage: 20, // For percentage (use instead of discount_amount)
  max_discount_amount: 50.00, // Max discount for percentage type
  
  // Usage limits
  min_basket_price: 100.00, // Minimum order amount
  usage_quantity: 500, // Total number of uses
  usage_per_user: 1, // Uses per customer
  
  // Optional: Product-specific (for product voucher)
  item_id_list: [123456, 789012], // Specific products
});

console.log('Voucher created:', response.voucher_id);
console.log('Voucher code:', response.voucher_code);
console.log('Warning:', response.warning); // Any warnings
```

**Voucher Types:**
- `1`: Shop voucher (applies to entire order)
- `2`: Product voucher (applies to specific products)

**Reward Types:**
- `1`: Fixed amount discount (e.g., $10 off)
- `2`: Percentage discount (e.g., 20% off)

**Example: Percentage Voucher**
```typescript
await sdk.voucher.addVoucher({
  voucher_name: '20% Off Everything',
  start_time: startTime,
  end_time: endTime,
  voucher_type: 1,
  reward_type: 2, // Percentage
  percentage: 20,
  max_discount_amount: 50.00, // Cap at $50
  min_basket_price: 25.00,
  usage_quantity: 1000,
  usage_per_user: 2,
});
```

---

### updateVoucher()

Update an existing voucher's settings.

```typescript
await sdk.voucher.updateVoucher({
  voucher_id: 123456,
  
  // Update name
  voucher_name: 'Updated Voucher Name',
  
  // Extend end time
  end_time: Math.floor(Date.now() / 1000) + 14 * 86400,
  
  // Increase quantity
  usage_quantity: 1000,
  
  // Adjust minimum
  min_basket_price: 75.00,
});
```

**Note:** Not all fields can be updated. Check Shopee API docs for updatable fields.

---

### getVoucher()

Get detailed information about a specific voucher.

```typescript
const response = await sdk.voucher.getVoucher({
  voucher_id: 123456,
});

console.log('Voucher:', response.voucher_name);
console.log('Code:', response.voucher_code);
console.log('Status:', response.status);
console.log('Discount:', response.discount_amount || `${response.percentage}%`);
console.log('Used:', response.current_usage);
console.log('Remaining:', response.usage_quantity - response.current_usage);
console.log('Valid:', new Date(response.start_time * 1000), 'to', new Date(response.end_time * 1000));
```

---

### getVoucherList()

Retrieve a list of vouchers with filtering options.

```typescript
const response = await sdk.voucher.getVoucherList({
  status: 'ongoing', // ongoing, upcoming, expired, all
  page_no: 1,
  page_size: 20,
  voucher_type: 1, // Optional: filter by type
});

console.log('Total:', response.total_count);
console.log('Page:', response.page_no);

response.voucher_list.forEach((voucher) => {
  console.log('---');
  console.log('ID:', voucher.voucher_id);
  console.log('Name:', voucher.voucher_name);
  console.log('Code:', voucher.voucher_code);
  console.log('Status:', voucher.status);
  console.log('Used:', voucher.current_usage, '/', voucher.usage_quantity);
});
```

**Status Values:**
- `ongoing`: Currently active
- `upcoming`: Scheduled for future
- `expired`: Past end time
- `all`: All vouchers

**Pagination Example:**
```typescript
async function getAllVouchers() {
  const allVouchers = [];
  let pageNo = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await sdk.voucher.getVoucherList({
      status: 'all',
      page_no: pageNo,
      page_size: pageSize,
    });

    allVouchers.push(...response.voucher_list);
    
    hasMore = response.voucher_list.length === pageSize;
    pageNo++;
  }

  return allVouchers;
}
```

---

### endVoucher()

Manually end a voucher before its scheduled end time.

```typescript
await sdk.voucher.endVoucher({
  voucher_id: 123456,
});

console.log('Voucher ended');
```

**Use Cases:**
- Stop an underperforming promotion
- End a voucher that reached its goal early
- Cancel a voucher due to inventory issues

---

### deleteVoucher()

Delete a voucher (only if it hasn't started or been used).

```typescript
await sdk.voucher.deleteVoucher({
  voucher_id: 123456,
});

console.log('Voucher deleted');
```

**Note:** Can only delete vouchers that:
- Haven't started yet (upcoming)
- Haven't been used by any customers

## Use Cases

### Flash Sale Voucher

```typescript
async function createFlashSale() {
  const now = Math.floor(Date.now() / 1000);
  const flashDuration = 2 * 3600; // 2 hours
  
  const voucher = await sdk.voucher.addVoucher({
    voucher_name: 'Flash Sale - 30% OFF',
    start_time: now,
    end_time: now + flashDuration,
    voucher_type: 1,
    reward_type: 2, // Percentage
    percentage: 30,
    max_discount_amount: 100.00,
    min_basket_price: 50.00,
    usage_quantity: 100, // Limited quantity
    usage_per_user: 1, // One per customer
  });
  
  console.log('Flash sale voucher:', voucher.voucher_code);
  return voucher;
}
```

### First-Time Customer Voucher

```typescript
async function createWelcomeVoucher() {
  const voucher = await sdk.voucher.addVoucher({
    voucher_name: 'Welcome! $10 OFF',
    voucher_code: 'WELCOME10',
    start_time: Math.floor(Date.now() / 1000),
    end_time: Math.floor(Date.now() / 1000) + 365 * 86400, // 1 year
    voucher_type: 1,
    reward_type: 1, // Fixed amount
    discount_amount: 10.00,
    min_basket_price: 30.00,
    usage_quantity: 10000,
    usage_per_user: 1, // One-time use for new customers
  });
  
  return voucher;
}
```

### Product-Specific Promotion

```typescript
async function createProductPromotion(itemIds: number[]) {
  const voucher = await sdk.voucher.addVoucher({
    voucher_name: 'Buy These Products - Save 15%',
    start_time: Math.floor(Date.now() / 1000),
    end_time: Math.floor(Date.now() / 1000) + 14 * 86400, // 2 weeks
    voucher_type: 2, // Product voucher
    reward_type: 2, // Percentage
    percentage: 15,
    min_basket_price: 0, // No minimum
    usage_quantity: 500,
    usage_per_user: 3,
    item_id_list: itemIds, // Specific products
  });
  
  return voucher;
}
```

### Monitor Voucher Usage

```typescript
async function monitorVoucherUsage(voucherId: number) {
  const voucher = await sdk.voucher.getVoucher({
    voucher_id: voucherId,
  });
  
  const usagePercent = (voucher.current_usage / voucher.usage_quantity) * 100;
  
  console.log(`Voucher: ${voucher.voucher_name}`);
  console.log(`Code: ${voucher.voucher_code}`);
  console.log(`Usage: ${voucher.current_usage} / ${voucher.usage_quantity} (${usagePercent.toFixed(1)}%)`);
  
  // Alert if running low
  if (usagePercent > 80) {
    console.warn('⚠️ Voucher usage above 80%!');
  }
  
  // Auto-extend if popular
  if (usagePercent > 90 && voucher.status === 'ongoing') {
    await sdk.voucher.updateVoucher({
      voucher_id: voucherId,
      usage_quantity: voucher.usage_quantity + 500,
    });
    console.log('✅ Extended voucher quantity by 500');
  }
  
  return voucher;
}
```

### Voucher Performance Report

```typescript
async function generateVoucherReport() {
  const vouchers = await sdk.voucher.getVoucherList({
    status: 'all',
    page_size: 100,
  });
  
  const report = {
    total: vouchers.total_count,
    ongoing: 0,
    upcoming: 0,
    expired: 0,
    totalUsage: 0,
    byType: {},
  };
  
  vouchers.voucher_list.forEach((voucher) => {
    if (voucher.status === 'ongoing') report.ongoing++;
    else if (voucher.status === 'upcoming') report.upcoming++;
    else if (voucher.status === 'expired') report.expired++;
    
    report.totalUsage += voucher.current_usage;
    
    const type = voucher.voucher_type === 1 ? 'shop' : 'product';
    report.byType[type] = (report.byType[type] || 0) + 1;
  });
  
  console.log('Voucher Report:', report);
  return report;
}
```

## Best Practices

### 1. Use Descriptive Names and Codes

```typescript
// ✅ Good: Clear and descriptive
await sdk.voucher.addVoucher({
  voucher_name: 'Spring Sale 2024 - 25% Off Electronics',
  voucher_code: 'SPRING25TECH',
  // ...
});

// ❌ Bad: Unclear
await sdk.voucher.addVoucher({
  voucher_name: 'Promo1',
  voucher_code: 'ABC123',
  // ...
});
```

### 2. Set Appropriate Limits

```typescript
// Prevent abuse with per-user limits
await sdk.voucher.addVoucher({
  voucher_name: 'Limited Offer',
  usage_quantity: 1000, // Total uses
  usage_per_user: 1, // One per customer
  min_basket_price: 25.00, // Minimum order
  // ...
});
```

### 3. Monitor and Adjust

```typescript
async function manageActiveVouchers() {
  const vouchers = await sdk.voucher.getVoucherList({
    status: 'ongoing',
    page_size: 100,
  });
  
  for (const voucher of vouchers.voucher_list) {
    const usageRate = voucher.current_usage / voucher.usage_quantity;
    
    // End underperforming vouchers
    if (usageRate < 0.1 && Date.now() > voucher.start_time * 1000 + 7 * 86400000) {
      await sdk.voucher.endVoucher({ voucher_id: voucher.voucher_id });
      console.log(`Ended low-performing voucher: ${voucher.voucher_name}`);
    }
    
    // Extend popular vouchers
    if (usageRate > 0.9) {
      await sdk.voucher.updateVoucher({
        voucher_id: voucher.voucher_id,
        usage_quantity: voucher.usage_quantity * 1.5,
      });
      console.log(`Extended popular voucher: ${voucher.voucher_name}`);
    }
  }
}
```

### 4. Handle Errors Gracefully

```typescript
async function safeAddVoucher(params: AddVoucherParams) {
  try {
    return await sdk.voucher.addVoucher(params);
  } catch (error) {
    if (error.error === 'error_voucher_code_duplicate') {
      console.error('Voucher code already exists');
    } else if (error.error === 'error_param') {
      console.error('Invalid parameters');
    } else {
      console.error('Failed to create voucher:', error);
    }
    return null;
  }
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_voucher_code_duplicate` | Code already exists | Use a different voucher_code or omit for auto-generation |
| `error_param` | Invalid parameters | Check required fields and value constraints |
| `error_voucher_not_found` | Voucher doesn't exist | Verify voucher_id is correct |
| `error_voucher_status` | Invalid operation for voucher status | Check voucher status before operation |
| `error_time_invalid` | Invalid time range | Ensure start_time < end_time and times are in future |

## Voucher Lifecycle

```
Created (upcoming)
  ↓
Active (ongoing)
  ↓
Ended (expired/manually ended)
  
Can delete if:
- Status is upcoming
- No usage yet
```

## Related

- [ProductManager](./product.md) - Product management for product-specific vouchers
- [OrderManager](./order.md) - Orders using vouchers
- [PaymentManager](./payment.md) - Voucher impact on payments
- [Authentication Guide](../guides/authentication.md) - API authentication
