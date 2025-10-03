# DiscountManager

The DiscountManager handles shop discount activity creation, management, and item-level discount configuration.

## Overview

The DiscountManager provides methods for:
- Creating shop discount activities
- Adding and managing items in discounts
- Managing discount lifecycle (update, end, delete)
- Retrieving discount information and lists

## Quick Start

```typescript
// Create a new discount activity
const discount = await sdk.discount.addDiscount({
  discount_name: 'Flash Sale 2024',
  start_time: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
  end_time: Math.floor(Date.now() / 1000) + 7 * 86400, // Lasts 7 days
});

// Add items to the discount
await sdk.discount.addDiscountItem({
  discount_id: discount.response.discount_id,
  item_list: [
    {
      item_id: 123456,
      purchase_limit: 5,
      item_promotion_price: 19.99, // For items without variations
    },
    {
      item_id: 789012,
      purchase_limit: 3,
      model_list: [ // For items with variations
        {
          model_id: 100001,
          model_promotion_price: 29.99,
        },
      ],
    },
  ],
});

// Get discount details
const details = await sdk.discount.getDiscount({
  discount_id: discount.response.discount_id,
  page_no: 1,
  page_size: 50,
});
```

## Methods

### addDiscount()

**API Documentation:** [v2.discount.add_discount](https://open.shopee.com/documents/v2/v2.discount.add_discount?module=99&type=1)

Create a new shop discount activity.

```typescript
const response = await sdk.discount.addDiscount({
  discount_name: 'Weekend Special',
  start_time: 1624864213, // Must be at least 1 hour from now
  end_time: 1625382613,   // Must be at least 1 hour after start_time
});

console.log('Discount created:', response.response.discount_id);
```

**Important Notes:**
- Start time must be at least 1 hour later than current time
- End time must be at least 1 hour later than start time
- Discount period must be less than 180 days
- The discount activity is created without items initially
- Use `addDiscountItem()` to add products to the discount

**Constraints:**
- Maximum 1000 upcoming and ongoing discounts
- Cannot create discounts when holiday mode is enabled

### addDiscountItem()

**API Documentation:** [v2.discount.add_discount_item](https://open.shopee.com/documents/v2/v2.discount.add_discount_item?module=99&type=1)

Add items to an existing discount activity.

```typescript
const response = await sdk.discount.addDiscountItem({
  discount_id: 665123666665499,
  item_list: [
    {
      item_id: 800238393,
      purchase_limit: 2, // Max quantity per order
      model_list: [
        {
          model_id: 10004228693,
          model_promotion_price: 960, // Discounted price
        },
      ],
    },
    {
      item_id: 100862614,
      purchase_limit: 5,
      item_promotion_price: 19.99, // For items without variations
    },
  ],
});

console.log('Items added:', response.response.count);
console.log('Errors:', response.response.error_list);
```

**For Items with Variations:**
Use `model_list` to specify discounted prices for each variation:
```typescript
{
  item_id: 123456,
  purchase_limit: 2,
  model_list: [
    { model_id: 1001, model_promotion_price: 25.99 },
    { model_id: 1002, model_promotion_price: 29.99 },
  ],
}
```

**For Items without Variations:**
Use `item_promotion_price` directly:
```typescript
{
  item_id: 789012,
  purchase_limit: 3,
  item_promotion_price: 15.99,
}
```

### deleteDiscount()

**API Documentation:** [v2.discount.delete_discount](https://open.shopee.com/documents/v2/v2.discount.delete_discount?module=99&type=1)

Delete an upcoming discount activity.

```typescript
const response = await sdk.discount.deleteDiscount({
  discount_id: 665123666665499,
});

console.log('Deleted discount:', response.response.discount_id);
console.log('Modification time:', response.response.modify_time);
```

**Important Notes:**
- Can only delete upcoming discounts that haven't started yet
- Cannot delete ongoing or expired discounts
- Use `endDiscount()` to stop an ongoing discount

### deleteDiscountItem()

**API Documentation:** [v2.discount.delete_discount_item](https://open.shopee.com/documents/v2/v2.discount.delete_discount_item?module=99&type=1)

Remove items from an existing discount activity.

```typescript
const response = await sdk.discount.deleteDiscountItem({
  discount_id: 665123666665499,
  item_id: 100862614,
  model_id: 10000153738, // Required for items with variations, 0 otherwise
});

console.log('Item deleted from discount:', response.response.discount_id);
console.log('Errors:', response.response.error_list);
```

**For Items with Variations:**
```typescript
await sdk.discount.deleteDiscountItem({
  discount_id: 665123666665499,
  item_id: 100862614,
  model_id: 10000153738, // Specific variation ID
});
```

**For Items without Variations:**
```typescript
await sdk.discount.deleteDiscountItem({
  discount_id: 665123666665499,
  item_id: 100862614,
  model_id: 0, // Use 0 for items without variations
});
```

### endDiscount()

**API Documentation:** [v2.discount.end_discount](https://open.shopee.com/documents/v2/v2.discount.end_discount?module=99&type=1)

End an ongoing discount activity immediately.

```typescript
const response = await sdk.discount.endDiscount({
  discount_id: 66512366666549900,
});

console.log('Ended discount:', response.response.discount_id);
console.log('Modification time:', response.response.modify_time);
```

**Important Notes:**
- Can only end ongoing/active discounts
- Cannot end upcoming or already expired discounts
- The discount will stop immediately
- Items will return to their original prices

### getDiscount()

**API Documentation:** [v2.discount.get_discount](https://open.shopee.com/documents/v2/v2.discount.get_discount?module=99&type=1)

Get detailed information about a discount activity including all items.

```typescript
const response = await sdk.discount.getDiscount({
  discount_id: 1000029882,
  page_no: 1,      // Page number (starting from 1)
  page_size: 50,   // Items per page
});

console.log('Discount name:', response.response.discount_name);
console.log('Status:', response.response.status);
console.log('Items:', response.response.item_list.length);
console.log('More pages:', response.response.more);

// Access item details
response.response.item_list.forEach(item => {
  console.log(`Item ${item.item_id}:`);
  console.log(`  Original price: ${item.item_original_price}`);
  console.log(`  Discount price: ${item.item_promotion_price}`);
  console.log(`  Stock: ${item.normal_stock}`);
  console.log(`  Purchase limit: ${item.purchase_limit}`);
  
  // For items with variations
  item.model_list.forEach(model => {
    console.log(`  Model ${model.model_id}: ${model.model_promotion_price}`);
  });
});
```

**Response includes:**
- Basic discount information (ID, name, status, timing)
- Complete item list with pricing details
- Original and discounted prices (including tax-adjusted prices)
- Local prices (for cross-border shops)
- Stock information
- Model/variation details
- Pagination information

**Pagination:**
If `response.more` is `true`, there are more items to retrieve. Increment `page_no` to get the next page.

### getDiscountList()

**API Documentation:** [v2.discount.get_discount_list](https://open.shopee.com/documents/v2/v2.discount.get_discount_list?module=99&type=1)

Get a list of discount activities with pagination and filtering.

```typescript
import { DiscountStatus } from '@congminh1254/shopee-sdk/schemas';

const response = await sdk.discount.getDiscountList({
  discount_status: DiscountStatus.ONGOING,
  page_no: 1,      // Optional: default 1
  page_size: 100,  // Optional: default 100, max 100
});

console.log('Total discounts:', response.response.discount_list.length);
console.log('More pages:', response.response.more);

response.response.discount_list.forEach(discount => {
  console.log(`Discount ${discount.discount_id}:`);
  console.log(`  Name: ${discount.discount_name}`);
  console.log(`  Status: ${discount.status}`);
  console.log(`  Start: ${new Date(discount.start_time * 1000)}`);
  console.log(`  End: ${new Date(discount.end_time * 1000)}`);
  console.log(`  Source: ${discount.source === 0 ? 'Seller' : 'Shopee'}`);
});
```

**Status Filters:**
- `DiscountStatus.ALL`: All discounts
- `DiscountStatus.UPCOMING`: Discounts that haven't started
- `DiscountStatus.ONGOING`: Currently active discounts
- `DiscountStatus.EXPIRED`: Ended discounts

**Example: Get all ongoing discounts**
```typescript
const ongoing = await sdk.discount.getDiscountList({
  discount_status: DiscountStatus.ONGOING,
});
```

### updateDiscount()

**API Documentation:** [v2.discount.update_discount](https://open.shopee.com/documents/v2/v2.discount.update_discount?module=99&type=1)

Update an existing discount activity.

```typescript
const response = await sdk.discount.updateDiscount({
  discount_id: 661460179119131,
  discount_name: 'Updated Discount Name',
  start_time: 1656403800,  // Can only update for upcoming discounts
  end_time: 1656494739,    // Can be modified with restrictions
});

console.log('Updated discount:', response.response.discount_id);
console.log('Modification time:', response.response.modify_time);
```

**Update Restrictions:**

**For Upcoming Discounts:**
- All fields can be updated
- Must maintain time constraints (start time > current + 1 hour)

**For Ongoing Discounts:**
- Cannot change start_time
- Limited modifications allowed
- Cannot extend end_time (can only shorten it)

**For Expired Discounts:**
- Cannot be updated

### updateDiscountItem()

**API Documentation:** [v2.discount.update_discount_item](https://open.shopee.com/documents/v2/v2.discount.update_discount_item?module=99&type=1)

Update items in an existing discount activity.

```typescript
const response = await sdk.discount.updateDiscountItem({
  discount_id: 1000029745,
  item_list: [
    {
      item_id: 1776783,
      purchase_limit: 5, // Updated limit
      model_list: [
        {
          model_id: 0,
          model_promotion_price: 96, // Updated price
        },
      ],
    },
    {
      item_id: 1778783,
      purchase_limit: 3,
      item_promotion_price: 15.99, // Updated price for non-variation item
    },
  ],
});

console.log('Items updated:', response.response.count);
console.log('Failed updates:', response.response.error_list);
```

**Response includes:**
- `count`: Number of successfully updated items
- `error_list`: List of items that failed to update with error details

## Use Cases

### Flash Sale Campaign

Create a time-limited flash sale with specific items:

```typescript
// 1. Create the discount activity
const discount = await sdk.discount.addDiscount({
  discount_name: 'Flash Sale - 2 Hours Only',
  start_time: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
  end_time: Math.floor(Date.now() / 1000) + 3 * 3600, // Ends in 3 hours
});

// 2. Add featured items
await sdk.discount.addDiscountItem({
  discount_id: discount.response.discount_id,
  item_list: [
    { item_id: 123, purchase_limit: 1, item_promotion_price: 9.99 },
    { item_id: 456, purchase_limit: 2, item_promotion_price: 19.99 },
  ],
});
```

### Weekend Sale

Set up a recurring weekend promotion:

```typescript
// Get next Saturday midnight
const nextSaturday = new Date();
nextSaturday.setDate(nextSaturday.getDate() + (6 - nextSaturday.getDay()));
nextSaturday.setHours(0, 0, 0, 0);

const discount = await sdk.discount.addDiscount({
  discount_name: 'Weekend Special',
  start_time: Math.floor(nextSaturday.getTime() / 1000),
  end_time: Math.floor(nextSaturday.getTime() / 1000) + 2 * 86400, // 2 days
});
```

### Manage Active Discounts

Monitor and manage ongoing discounts:

```typescript
// Get all ongoing discounts
const ongoing = await sdk.discount.getDiscountList({
  discount_status: DiscountStatus.ONGOING,
});

// Check each discount's performance
for (const discount of ongoing.response.discount_list) {
  const details = await sdk.discount.getDiscount({
    discount_id: discount.discount_id,
    page_no: 1,
    page_size: 100,
  });
  
  console.log(`Discount: ${details.response.discount_name}`);
  console.log(`Items: ${details.response.item_list.length}`);
  
  // Update if needed
  if (needsUpdate(details)) {
    await sdk.discount.updateDiscount({
      discount_id: discount.discount_id,
      discount_name: 'Updated Name',
    });
  }
}
```

### Bulk Item Management

Add multiple items to a discount efficiently:

```typescript
// Prepare item list
const items = products.map(product => ({
  item_id: product.id,
  purchase_limit: 5,
  item_promotion_price: product.price * 0.8, // 20% off
}));

// Add in batches (API might have limits)
const BATCH_SIZE = 50;
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  await sdk.discount.addDiscountItem({
    discount_id: discountId,
    item_list: batch,
  });
}
```

## Best Practices

### 1. Plan Ahead

Always create discounts at least 1 hour before they should start:

```typescript
const startTime = Math.floor(Date.now() / 1000) + 2 * 3600; // 2 hours from now
const endTime = startTime + 24 * 3600; // 24 hours duration

await sdk.discount.addDiscount({
  discount_name: 'Daily Deal',
  start_time: startTime,
  end_time: endTime,
});
```

### 2. Handle Errors Gracefully

When adding multiple items, check for errors:

```typescript
const result = await sdk.discount.addDiscountItem({
  discount_id: discountId,
  item_list: items,
});

if (result.response.error_list.length > 0) {
  console.error('Some items failed to add:');
  result.response.error_list.forEach(error => {
    console.error(`Item ${error.item_id}: ${error.fail_message}`);
  });
}

console.log(`Successfully added ${result.response.count} items`);
```

### 3. Use Pagination for Large Item Lists

When retrieving discount details with many items:

```typescript
async function getAllDiscountItems(discountId: number) {
  const allItems = [];
  let pageNo = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await sdk.discount.getDiscount({
      discount_id: discountId,
      page_no: pageNo,
      page_size: 100,
    });
    
    allItems.push(...response.response.item_list);
    hasMore = response.response.more;
    pageNo++;
  }
  
  return allItems;
}
```

### 4. Validate Time Constraints

```typescript
function validateDiscountTimes(startTime: number, endTime: number) {
  const now = Math.floor(Date.now() / 1000);
  const minStart = now + 3600; // 1 hour from now
  const maxDuration = 180 * 86400; // 180 days
  
  if (startTime < minStart) {
    throw new Error('Start time must be at least 1 hour in the future');
  }
  
  if (endTime < startTime + 3600) {
    throw new Error('End time must be at least 1 hour after start time');
  }
  
  if (endTime - startTime > maxDuration) {
    throw new Error('Discount duration cannot exceed 180 days');
  }
  
  return true;
}
```

### 5. Monitor Discount Status

Regularly check discount status and take action:

```typescript
async function monitorDiscounts() {
  const discounts = await sdk.discount.getDiscountList({
    discount_status: DiscountStatus.ONGOING,
  });
  
  for (const discount of discounts.response.discount_list) {
    const endingSoon = discount.end_time - Math.floor(Date.now() / 1000) < 3600;
    
    if (endingSoon) {
      console.log(`Discount ${discount.discount_name} ending soon!`);
      // Send notification, extend discount, etc.
    }
  }
}
```

## Common Errors

### discount.discount_start_time_smaller_than_now

Start time is in the past or less than 1 hour from now.

**Solution:**
```typescript
const startTime = Math.floor(Date.now() / 1000) + 2 * 3600; // 2 hours from now
```

### discount.discount_period_too_long

Discount duration exceeds 180 days.

**Solution:**
```typescript
const maxDuration = 180 * 86400; // 180 days in seconds
const endTime = startTime + Math.min(desiredDuration, maxDuration);
```

### discount.discount_period_too_short

End time is less than 1 hour after start time.

**Solution:**
```typescript
const endTime = startTime + 2 * 3600; // At least 2 hours duration
```

### discount.exceed_max_discount_count

Too many upcoming and ongoing discounts (limit: 1000).

**Solution:** Delete or end old discounts before creating new ones:
```typescript
// Get all upcoming discounts
const upcoming = await sdk.discount.getDiscountList({
  discount_status: DiscountStatus.UPCOMING,
});

// Delete old ones
for (const discount of upcoming.response.discount_list.slice(0, 10)) {
  await sdk.discount.deleteDiscount({
    discount_id: discount.discount_id,
  });
}
```

### discount.error_holiday_mode

Cannot create discounts when holiday mode is enabled.

**Solution:** Disable holiday mode in shop settings before creating discounts.

## Discount Lifecycle

```
┌─────────────────┐
│    UPCOMING     │ ← Can be deleted or fully updated
│                 │
│ (Before start)  │
└────────┬────────┘
         │ start_time reached
         ▼
┌─────────────────┐
│    ONGOING      │ ← Can be ended or partially updated
│                 │
│  (Active now)   │
└────────┬────────┘
         │ end_time reached or manually ended
         ▼
┌─────────────────┐
│    EXPIRED      │ ← Read-only, cannot be modified
│                 │
│   (Finished)    │
└─────────────────┘
```

**State Transitions:**
1. **UPCOMING → ONGOING**: Automatically when start_time is reached
2. **ONGOING → EXPIRED**: Automatically when end_time is reached
3. **ONGOING → EXPIRED**: Manually via `endDiscount()`
4. **UPCOMING → Deleted**: Via `deleteDiscount()`

## Related

- [ProductManager](./product.md) - Product management for discount items
- [VoucherManager](./voucher.md) - Voucher management (different from discounts)
- [OrderManager](./order.md) - Orders using discounted items
- [Authentication Guide](../guides/authentication.md) - API authentication
