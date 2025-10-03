# BundleDealManager

The BundleDealManager handles bundle deal activity creation, management, and item-level configuration.

## Overview

The BundleDealManager provides methods for:
- Creating bundle deal activities
- Adding and managing items in bundle deals
- Managing bundle deal lifecycle (update, end, delete)
- Retrieving bundle deal information and lists
- Support for tiered bundle deals (buy more, save more)

## Quick Start

```typescript
// Create a new bundle deal activity
const bundleDeal = await sdk.bundleDeal.addBundleDeal({
  rule_type: BundleDealRuleType.FIX_PRICE,
  fix_price: 99.99,
  min_amount: 2,
  start_time: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
  end_time: Math.floor(Date.now() / 1000) + 7 * 86400, // Lasts 7 days
  name: 'Buy 2 for $99.99',
  purchase_limit: 10,
});

// Add items to the bundle deal
await sdk.bundleDeal.addBundleDealItem({
  bundle_deal_id: bundleDeal.response.bundle_deal_id,
  item_list: [
    { item_id: 123456 },
    { item_id: 789012 },
  ],
});

// Get bundle deal details
const details = await sdk.bundleDeal.getBundleDeal({
  bundle_deal_id: bundleDeal.response.bundle_deal_id,
});
```

## Methods

### addBundleDeal()

**API Documentation:** [v2.bundle_deal.add_bundle_deal](https://open.shopee.com/documents/v2/v2.bundle_deal.add_bundle_deal?module=110&type=1)

Create a new bundle deal activity.

```typescript
const response = await sdk.bundleDeal.addBundleDeal({
  rule_type: BundleDealRuleType.FIX_PRICE,
  fix_price: 50.0,
  min_amount: 3,
  start_time: 1600000000,
  end_time: 1610000000,
  name: 'Buy 3 for $50',
  purchase_limit: 5,
});

console.log('Bundle deal created:', response.response.bundle_deal_id);
```

**Bundle Deal Rule Types:**
- `FIX_PRICE = 1`: Fixed price for the bundle (e.g., buy 3 for $50)
- `DISCOUNT_PERCENTAGE = 2`: Percentage discount (e.g., buy 2 get 20% off)
- `DISCOUNT_VALUE = 3`: Fixed discount amount (e.g., buy 2 save $10)

**Multi-Tier Bundle Deals:**

You can create tiered discounts where buyers get better deals for purchasing more items:

```typescript
const response = await sdk.bundleDeal.addBundleDeal({
  rule_type: BundleDealRuleType.DISCOUNT_PERCENTAGE,
  discount_percentage: 10,
  min_amount: 2,
  start_time: 1600000000,
  end_time: 1610000000,
  name: 'Buy more, save more',
  purchase_limit: 20,
  additional_tiers: [
    {
      min_amount: 3,
      discount_percentage: 15,
    },
    {
      min_amount: 5,
      discount_percentage: 20,
    },
  ],
});
```

This creates a promotion like:
- Buy 2 get 10% off
- Buy 3 get 15% off
- Buy 5 get 20% off

**Important Notes:**
- A maximum of 1000 bundle deals can be created
- Maximum 2 additional tiers allowed for multi-tier bundle deals
- For each tier, higher tiers should have better or equal pricing
- The rule type must be consistent across all tiers

---

### addBundleDealItem()

**API Documentation:** [v2.bundle_deal.add_bundle_deal_item](https://open.shopee.com/documents/v2/v2.bundle_deal.add_bundle_deal_item?module=110&type=1)

Add items to an existing bundle deal activity.

```typescript
const response = await sdk.bundleDeal.addBundleDealItem({
  bundle_deal_id: 11111,
  item_list: [
    { item_id: 123456 },
    { item_id: 789012 },
    { item_id: 345678 },
  ],
});

console.log('Successfully added:', response.response.success_list);
console.log('Failed to add:', response.response.failed_list);
```

**Response Structure:**
- `success_list`: Array of item IDs that were successfully added
- `failed_list`: Array of items that failed with error details

**Common Errors:**
- `bundle.bundle_deal_no_shipping_channel`: Item doesn't have shipping channel set
- `bundle.bundle_deal_item_under_block_categories`: Item category prohibited from promotions

---

### deleteBundleDeal()

**API Documentation:** [v2.bundle_deal.delete_bundle_deal](https://open.shopee.com/documents/v2/v2.bundle_deal.delete_bundle_deal?module=110&type=1)

Delete an existing bundle deal activity.

```typescript
const response = await sdk.bundleDeal.deleteBundleDeal({
  bundle_deal_id: 11111,
});

console.log('Bundle deal deleted:', response.response.bundle_deal_id);
```

**Important Notes:**
- Can only delete upcoming bundle deals that haven't started yet
- Will return an error if attempting to delete a bundle deal that has already started
- To stop an ongoing bundle deal, use `endBundleDeal()` instead

---

### deleteBundleDealItem()

**API Documentation:** [v2.bundle_deal.delete_bundle_deal_item](https://open.shopee.com/documents/v2/v2.bundle_deal.delete_bundle_deal_item?module=110&type=1)

Delete items from an existing bundle deal activity.

```typescript
const response = await sdk.bundleDeal.deleteBundleDealItem({
  bundle_deal_id: 11111,
  item_list: [
    { item_id: 123456 },
    { item_id: 789012 },
  ],
});

console.log('Successfully deleted:', response.response.success_list);
console.log('Failed to delete:', response.response.failed_list);
```

**Response Structure:**
- `success_list`: Array of item IDs that were successfully deleted
- `failed_list`: Array of items that failed to be deleted with error details

---

### endBundleDeal()

**API Documentation:** [v2.bundle_deal.end_bundle_deal](https://open.shopee.com/documents/v2/v2.bundle_deal.end_bundle_deal?module=110&type=1)

End an ongoing bundle deal activity immediately.

```typescript
const response = await sdk.bundleDeal.endBundleDeal({
  bundle_deal_id: 11111,
});

console.log('Bundle deal ended:', response.response.bundle_deal_id);
```

**Important Notes:**
- Can only end bundle deals that are currently ongoing/active
- Will return an error if attempting to end an upcoming or expired bundle deal
- This action is immediate and cannot be undone

---

### getBundleDeal()

**API Documentation:** [v2.bundle_deal.get_bundle_deal](https://open.shopee.com/documents/v2/v2.bundle_deal.get_bundle_deal?module=110&type=1)

Get detailed information about a bundle deal activity.

```typescript
const response = await sdk.bundleDeal.getBundleDeal({
  bundle_deal_id: 113891,
});

const bundleDeal = response.response;
console.log('Name:', bundleDeal.name);
console.log('Rule type:', bundleDeal.bundle_deal_rule.rule_type);
console.log('Min amount:', bundleDeal.bundle_deal_rule.min_amount);
console.log('Purchase limit:', bundleDeal.purchase_limit);
```

**Response includes:**
- Basic bundle deal details (ID, name, timing)
- Bundle deal rule configuration
  - Rule type and pricing information
  - Minimum amount required
  - Additional tiers if configured
- Purchase limit per buyer

---

### getBundleDealItem()

**API Documentation:** [v2.bundle_deal.get_bundle_deal_item](https://open.shopee.com/documents/v2/v2.bundle_deal.get_bundle_deal_item?module=110&type=1)

Get the list of items in a bundle deal.

```typescript
const response = await sdk.bundleDeal.getBundleDealItem({
  bundle_deal_id: 11111,
});

console.log('Items in bundle deal:', response.response.item_list);
// Output: [123456, 789012, 345678]
```

**Response includes:**
- `item_list`: Array of item IDs that are part of the bundle deal

---

### getBundleDealList()

**API Documentation:** [v2.bundle_deal.get_bundle_deal_list](https://open.shopee.com/documents/v2/v2.bundle_deal.get_bundle_deal_list?module=110&type=1)

Get a list of bundle deal activities with pagination and filtering.

```typescript
// Get all upcoming bundle deals
const response = await sdk.bundleDeal.getBundleDealList({
  time_status: BundleDealTimeStatus.UPCOMING,
  page_no: 1,
  page_size: 100,
});

console.log('Bundle deals:', response.response.bundle_deal_list);
console.log('Has more pages:', response.response.more);
```

**Time Status Options:**
- `ALL = 1`: All bundle deals regardless of status
- `UPCOMING = 2`: Bundle deals that have not started yet
- `ONGOING = 3`: Currently active bundle deals
- `EXPIRED = 4`: Bundle deals that have ended

**Pagination:**
- `page_no`: Page number (default: 1)
- `page_size`: Items per page (default: 20, max: 1000)

**Response includes:**
- `bundle_deal_list`: Array of bundle deals with full details
- `more`: Boolean indicating if there are more pages

---

### updateBundleDeal()

**API Documentation:** [v2.bundle_deal.update_bundle_deal](https://open.shopee.com/documents/v2/v2.bundle_deal.update_bundle_deal?module=110&type=1)

Update an existing bundle deal activity.

```typescript
const response = await sdk.bundleDeal.updateBundleDeal({
  bundle_deal_id: 6833,
  name: 'Updated Bundle Name',
  end_time: 1658246412,
  purchase_limit: 15,
});

console.log('Updated bundle deal:', response.response);
```

**Updateable Fields:**
- `name`: Bundle deal title
- `start_time`: Bundle deal start time
- `end_time`: Bundle deal end time
- `purchase_limit`: Maximum purchases per buyer
- `rule_type`: Bundle deal rule type
- `discount_value`, `fix_price`, `discount_percentage`: Pricing based on rule type
- `min_amount`: Minimum items required
- `additional_tiers`: Tiered pricing configuration

**Important Notes:**
- For ongoing bundle deals, update capabilities may be limited
- Only certain fields can be modified depending on the bundle deal status

---

### updateBundleDealItem()

**API Documentation:** [v2.bundle_deal.update_bundle_deal_item](https://open.shopee.com/documents/v2/v2.bundle_deal.update_bundle_deal_item?module=110&type=1)

Update items in an existing bundle deal activity.

```typescript
const response = await sdk.bundleDeal.updateBundleDealItem({
  bundle_deal_id: 11111,
  item_list: [
    { item_id: 123456 },
    { item_id: 789012 },
  ],
});

console.log('Successfully updated:', response.response.success_list);
console.log('Failed to update:', response.response.failed_list);
```

**Response Structure:**
- `success_list`: Array of item IDs that were successfully updated
- `failed_list`: Array of items that failed to be updated with error details

---

## Common Workflows

### Create a Complete Bundle Deal

```typescript
// 1. Create the bundle deal
const bundleDeal = await sdk.bundleDeal.addBundleDeal({
  rule_type: BundleDealRuleType.FIX_PRICE,
  fix_price: 149.99,
  min_amount: 3,
  start_time: Math.floor(Date.now() / 1000) + 3600,
  end_time: Math.floor(Date.now() / 1000) + 30 * 86400,
  name: 'Buy 3 for $149.99',
  purchase_limit: 10,
});

const bundleDealId = bundleDeal.response.bundle_deal_id;

// 2. Add items to the bundle deal
const addItems = await sdk.bundleDeal.addBundleDealItem({
  bundle_deal_id: bundleDealId,
  item_list: [
    { item_id: 123456 },
    { item_id: 789012 },
    { item_id: 345678 },
  ],
});

// 3. Check for any failed items
if (addItems.response.failed_list.length > 0) {
  console.log('Some items failed to add:', addItems.response.failed_list);
}

// 4. Get the complete bundle deal details
const details = await sdk.bundleDeal.getBundleDeal({
  bundle_deal_id: bundleDealId,
});

console.log('Bundle deal created successfully:', details.response);
```

### Create Multi-Tier Bundle Deal

```typescript
// Create a tiered bundle deal: Buy 2 get 15% off, buy 3 get 20% off, buy 5 get 25% off
const bundleDeal = await sdk.bundleDeal.addBundleDeal({
  rule_type: BundleDealRuleType.DISCOUNT_PERCENTAGE,
  discount_percentage: 15,
  min_amount: 2,
  start_time: Math.floor(Date.now() / 1000) + 3600,
  end_time: Math.floor(Date.now() / 1000) + 14 * 86400,
  name: 'Buy More, Save More Sale',
  purchase_limit: 50,
  additional_tiers: [
    {
      min_amount: 3,
      discount_percentage: 20,
    },
    {
      min_amount: 5,
      discount_percentage: 25,
    },
  ],
});
```

### Manage Existing Bundle Deals

```typescript
// Get all ongoing bundle deals
const ongoing = await sdk.bundleDeal.getBundleDealList({
  time_status: BundleDealTimeStatus.ONGOING,
  page_size: 50,
});

for (const deal of ongoing.response.bundle_deal_list) {
  // Get items in each bundle deal
  const items = await sdk.bundleDeal.getBundleDealItem({
    bundle_deal_id: deal.bundle_deal_id,
  });
  
  console.log(`Bundle deal "${deal.name}" has ${items.response.item_list.length} items`);
  
  // Update bundle deal if needed
  if (deal.purchase_limit < 10) {
    await sdk.bundleDeal.updateBundleDeal({
      bundle_deal_id: deal.bundle_deal_id,
      purchase_limit: 10,
    });
  }
}
```

### End a Bundle Deal Early

```typescript
// Get ongoing bundle deals
const ongoing = await sdk.bundleDeal.getBundleDealList({
  time_status: BundleDealTimeStatus.ONGOING,
});

// End a specific bundle deal
const bundleDealToEnd = ongoing.response.bundle_deal_list.find(
  (deal) => deal.name === 'Flash Sale'
);

if (bundleDealToEnd) {
  const result = await sdk.bundleDeal.endBundleDeal({
    bundle_deal_id: bundleDealToEnd.bundle_deal_id,
  });
  
  console.log('Bundle deal ended:', result.response.bundle_deal_id);
}
```

---

## Error Handling

Common errors you may encounter:

```typescript
try {
  const result = await sdk.bundleDeal.addBundleDealItem({
    bundle_deal_id: 11111,
    item_list: [{ item_id: 123456 }],
  });
  
  // Check for partial failures
  if (result.response.failed_list.length > 0) {
    result.response.failed_list.forEach((failure) => {
      console.error(
        `Item ${failure.item_id} failed: ${failure.fail_message} (${failure.fail_error})`
      );
    });
  }
} catch (error) {
  console.error('API error:', error);
}
```

**Common Error Codes:**
- `bundle.bundle_deal_no_shipping_channel`: Item doesn't have shipping channel configured
- `bundle.bundle_deal_item_under_block_categories`: Item category is prohibited from promotions
- `bundle.bundle_deal_error_total_count_limit`: Maximum 1000 bundle deals reached
- `bundle.bundle_deal_start_time_error`: Start time validation failed
- `bundle.bundle_deal_exceed_remaining_time_limit`: End time exceeds maximum allowed

---

## TypeScript Types

All bundle deal types are exported from the schemas:

```typescript
import {
  BundleDealRuleType,
  BundleDealTimeStatus,
  AddBundleDealParams,
  BundleDealInfo,
  BundleDealRule,
  // ... and more
} from '@congminh1254/shopee-sdk/schemas';
```

## Best Practices

1. **Plan Your Bundle Deals**: Ensure items have proper inventory before creating bundle deals
2. **Check Failed Items**: Always check the `failed_list` in responses for batch operations
3. **Use Appropriate Rule Types**: Choose the right rule type for your pricing strategy
4. **Multi-Tier Validation**: Ensure higher tiers have better or equal pricing
5. **Monitor Inventory**: Keep track of stock levels for items in bundle deals
6. **Test First**: Test bundle deal creation with a small set of items before scaling up
7. **Use Pagination**: When retrieving large lists, use pagination to avoid timeouts

## Related Documentation

- [Discount Manager](./discount.md) - For item-level discount management
- [Product Manager](./product.md) - For managing products in your shop
- [Voucher Manager](./voucher.md) - For shop voucher management
