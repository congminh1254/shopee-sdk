# AddOnDealManager

The AddOnDealManager handles add-on deal activity creation, management, and item-level configuration for both main items and sub items (discounted/gift items).

## Overview

The AddOnDealManager provides methods for:
- Creating add-on deal activities with two promotion types:
  - **Add-on Discount**: Offer discounted products when customers purchase specific items
  - **Gift with Minimum Spend**: Offer gift items when customers meet minimum purchase requirements
- Adding and managing main items (products customers must buy to qualify)
- Adding and managing sub items (discounted products or gifts)
- Managing add-on deal lifecycle (update, end, delete)
- Retrieving add-on deal information and lists

## Quick Start

```typescript
import { ShopeeSDK, AddOnDealPromotionType, AddOnDealMainItemStatus, AddOnDealSubItemStatus } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
});

// Create a new add-on deal (Add-on Discount type)
const addOnDeal = await sdk.addOnDeal.addAddOnDeal({
  add_on_deal_name: 'Buy Phone, Get Discounted Case',
  start_time: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
  end_time: Math.floor(Date.now() / 1000) + 7 * 86400, // Lasts 7 days
  promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
  promotion_purchase_limit: 5, // Max 5 add-on items per order
});

// Add main items (products customers must purchase)
await sdk.addOnDeal.addAddOnDealMainItem({
  add_on_deal_id: addOnDeal.response.add_on_deal_id,
  main_item_list: [
    {
      item_id: 123456, // Phone product
      status: AddOnDealMainItemStatus.ACTIVE,
    },
  ],
});

// Add sub items (discounted products)
await sdk.addOnDeal.addAddOnDealSubItem({
  add_on_deal_id: addOnDeal.response.add_on_deal_id,
  sub_item_list: [
    {
      item_id: 789012, // Phone case product
      model_id: 100001, // Specific variation
      sub_item_input_price: 5.99, // Discounted price
      sub_item_limit: 2, // Max 2 cases per order
      status: AddOnDealSubItemStatus.ACTIVE,
    },
  ],
});

// Get add-on deal details
const details = await sdk.addOnDeal.getAddOnDeal({
  add_on_deal_id: addOnDeal.response.add_on_deal_id,
});
```

## Methods

### addAddOnDeal()

**API Documentation:** [v2.add_on_deal.add_add_on_deal](https://open.shopee.com/documents/v2/v2.add_on_deal.add_add_on_deal?module=111&type=1)

Create a new add-on deal activity.

```typescript
const response = await sdk.addOnDeal.addAddOnDeal({
  add_on_deal_name: 'Holiday Add-on Deal',
  start_time: 1700000000,
  end_time: 1710000000,
  promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
  promotion_purchase_limit: 3,
});

console.log('Add-on deal created:', response.response.add_on_deal_id);
```

**Promotion Types:**
- `AddOnDealPromotionType.ADD_ON_DISCOUNT = 0`: Offer discounted add-on items
- `AddOnDealPromotionType.GIFT_WITH_MIN_SPEND = 1`: Offer gifts with minimum spend

**Example: Gift with Minimum Spend**
```typescript
const response = await sdk.addOnDeal.addAddOnDeal({
  add_on_deal_name: 'Spend $100, Get Free Gift',
  start_time: 1700000000,
  end_time: 1710000000,
  promotion_type: AddOnDealPromotionType.GIFT_WITH_MIN_SPEND,
  purchase_min_spend: 100.0, // Minimum $100 purchase
  per_gift_num: 1, // 1 free gift per order
});
```

**Important Notes:**
- Maximum of 1000 add-on deals can be created
- Start time must be 1 hour later than current time
- End time must be 1 hour later than start time
- Add-on deal name cannot exceed 25 characters

---

### addAddOnDealMainItem()

**API Documentation:** [v2.add_on_deal.add_add_on_deal_main_item](https://open.shopee.com/documents/v2/v2.add_on_deal.add_add_on_deal_main_item?module=111&type=1)

Add main items to an add-on deal. Main items are the products that customers must purchase to be eligible for the add-on deal.

```typescript
await sdk.addOnDeal.addAddOnDealMainItem({
  add_on_deal_id: 20141,
  main_item_list: [
    {
      item_id: 123456,
      status: AddOnDealMainItemStatus.ACTIVE,
    },
    {
      item_id: 789012,
      status: AddOnDealMainItemStatus.ACTIVE,
    },
  ],
});
```

---

### addAddOnDealSubItem()

**API Documentation:** [v2.add_on_deal.add_add_on_deal_sub_item](https://open.shopee.com/documents/v2/v2.add_on_deal.add_add_on_deal_sub_item?module=111&type=1)

Add sub items (discounted products or gifts) to an add-on deal.

```typescript
const response = await sdk.addOnDeal.addAddOnDealSubItem({
  add_on_deal_id: 20141,
  sub_item_list: [
    {
      item_id: 999888,
      model_id: 777666, // Variation ID
      sub_item_input_price: 9.99, // Discounted price
      sub_item_limit: 3, // Max 3 per order
      status: AddOnDealSubItemStatus.ACTIVE,
    },
  ],
});

// Check for any failed items
if (response.response.sub_item_list.length > 0) {
  console.log('Failed items:', response.response.sub_item_list);
}
```

---

### deleteAddOnDeal()

**API Documentation:** [v2.add_on_deal.delete_add_on_deal](https://open.shopee.com/documents/v2/v2.add_on_deal.delete_add_on_deal?module=111&type=1)

Delete an add-on deal activity.

```typescript
await sdk.addOnDeal.deleteAddOnDeal({
  add_on_deal_id: 20141,
});
```

**Note:** Can only delete upcoming add-on deals that haven't started yet.

---

### deleteAddOnDealMainItem()

**API Documentation:** [v2.add_on_deal.delete_add_on_deal_main_item](https://open.shopee.com/documents/v2/v2.add_on_deal.delete_add_on_deal_main_item?module=111&type=1)

Delete main items from an add-on deal.

```typescript
const response = await sdk.addOnDeal.deleteAddOnDealMainItem({
  add_on_deal_id: 20141,
  item_id_list: [123456, 789012],
});

if (response.response.failed_item_id_list.length > 0) {
  console.log('Failed to delete:', response.response.failed_item_id_list);
}
```

---

### deleteAddOnDealSubItem()

**API Documentation:** [v2.add_on_deal.delete_add_on_deal_sub_item](https://open.shopee.com/documents/v2/v2.add_on_deal.delete_add_on_deal_sub_item?module=111&type=1)

Delete sub items from an add-on deal.

```typescript
await sdk.addOnDeal.deleteAddOnDealSubItem({
  add_on_deal_id: 20141,
  sub_item_list: [
    {
      item_id: 999888,
      model_id: 777666,
    },
  ],
});
```

**Note:** At least one sub item must remain in the add-on deal.

---

### endAddOnDeal()

**API Documentation:** [v2.add_on_deal.end_add_on_deal](https://open.shopee.com/documents/v2/v2.add_on_deal.end_add_on_deal?module=111&type=1)

End an ongoing add-on deal immediately.

```typescript
await sdk.addOnDeal.endAddOnDeal({
  add_on_deal_id: 20141,
});
```

**Note:** Can only end add-on deals that are currently ongoing/active.

---

### getAddOnDeal()

**API Documentation:** [v2.add_on_deal.get_add_on_deal](https://open.shopee.com/documents/v2/v2.add_on_deal.get_add_on_deal?module=111&type=1)

Get detailed information about an add-on deal.

```typescript
const response = await sdk.addOnDeal.getAddOnDeal({
  add_on_deal_id: 20141,
});

console.log('Add-on deal name:', response.response.add_on_deal_name);
console.log('Promotion type:', response.response.promotion_type);
console.log('Start time:', new Date(response.response.start_time * 1000));
console.log('End time:', new Date(response.response.end_time * 1000));
```

---

### getAddOnDealList()

**API Documentation:** [v2.add_on_deal.get_add_on_deal_list](https://open.shopee.com/documents/v2/v2.add_on_deal.get_add_on_deal_list?module=111&type=1)

Get a paginated list of add-on deals.

```typescript
const response = await sdk.addOnDeal.getAddOnDealList({
  promotion_status: AddOnDealPromotionStatus.ONGOING,
  page_no: 1,
  page_size: 50,
});

console.log('Add-on deals:', response.response.add_on_deal_list.length);
console.log('Has more pages:', response.response.more);

// List all add-on deals
response.response.add_on_deal_list.forEach(deal => {
  console.log(`${deal.add_on_deal_id}: ${deal.add_on_deal_name}`);
});
```

**Promotion Statuses:**
- `AddOnDealPromotionStatus.ALL = "all"`: All add-on deals
- `AddOnDealPromotionStatus.ONGOING = "ongoing"`: Currently active
- `AddOnDealPromotionStatus.UPCOMING = "upcoming"`: Not started yet
- `AddOnDealPromotionStatus.EXPIRED = "expired"`: Ended

---

### getAddOnDealMainItem()

**API Documentation:** [v2.add_on_deal.get_add_on_deal_main_item](https://open.shopee.com/documents/v2/v2.add_on_deal.get_add_on_deal_main_item?module=111&type=1)

Get main items in an add-on deal.

```typescript
const response = await sdk.addOnDeal.getAddOnDealMainItem({
  add_on_deal_id: 20141,
});

response.response.main_item_list.forEach(item => {
  console.log(`Item ${item.item_id}: ${item.status === 1 ? 'Active' : 'Deleted'}`);
});
```

---

### getAddOnDealSubItem()

**API Documentation:** [v2.add_on_deal.get_add_on_deal_sub_item](https://open.shopee.com/documents/v2/v2.add_on_deal.get_add_on_deal_sub_item?module=111&type=1)

Get sub items in an add-on deal.

```typescript
const response = await sdk.addOnDeal.getAddOnDealSubItem({
  add_on_deal_id: 20141,
});

response.response.sub_item_list.forEach(item => {
  console.log(`Item ${item.item_id}, Model ${item.model_id}`);
  console.log(`  Price: ${item.sub_item_input_price}`);
  console.log(`  Limit: ${item.sub_item_limit || 'unlimited'}`);
});
```

---

### updateAddOnDeal()

**API Documentation:** [v2.add_on_deal.update_add_on_deal](https://open.shopee.com/documents/v2/v2.add_on_deal.update_add_on_deal?module=111&type=1)

Update an add-on deal activity.

```typescript
const response = await sdk.addOnDeal.updateAddOnDeal({
  add_on_deal_id: 20141,
  add_on_deal_name: 'Updated Add-on Deal Name',
  end_time: 1720000000, // Can only move end time earlier
  sub_item_priority: [999888, 777666], // Display order
});
```

**Update Restrictions:**
- Start time of upcoming add-on deals cannot be shortened
- End time can only be changed to an earlier timing
- Some fields cannot be modified for ongoing add-on deals
- Add-on deals created by Shopee admin cannot be edited

---

### updateAddOnDealMainItem()

**API Documentation:** [v2.add_on_deal.update_add_on_deal_main_item](https://open.shopee.com/documents/v2/v2.add_on_deal.update_add_on_deal_main_item?module=111&type=1)

Update main items in an add-on deal.

```typescript
await sdk.addOnDeal.updateAddOnDealMainItem({
  add_on_deal_id: 20141,
  main_item_list: [
    {
      item_id: 123456,
      status: AddOnDealMainItemStatus.DELETED, // Mark as deleted
    },
  ],
});
```

---

### updateAddOnDealSubItem()

**API Documentation:** [v2.add_on_deal.update_add_on_deal_sub_item](https://open.shopee.com/documents/v2/v2.add_on_deal.update_add_on_deal_sub_item?module=111&type=1)

Update sub items in an add-on deal.

```typescript
const response = await sdk.addOnDeal.updateAddOnDealSubItem({
  add_on_deal_id: 20141,
  sub_item_list: [
    {
      item_id: 999888,
      model_id: 777666,
      sub_item_input_price: 7.99, // Updated price
      sub_item_limit: 5, // Updated limit
      status: AddOnDealSubItemStatus.ACTIVE,
    },
  ],
});

// Check for failed updates
if (response.response.sub_item_list.length > 0) {
  response.response.sub_item_list.forEach(failed => {
    console.log(`Failed: ${failed.item_id}/${failed.model_id}`);
    console.log(`Error: ${failed.fail_message}`);
  });
}
```

## Use Cases

### Add-on Discount Campaign

Create a promotion where customers get discounted accessories when buying main products:

```typescript
// 1. Create the add-on deal
const deal = await sdk.addOnDeal.addAddOnDeal({
  add_on_deal_name: 'Phone + Discounted Accessories',
  start_time: Math.floor(Date.now() / 1000) + 3600,
  end_time: Math.floor(Date.now() / 1000) + 30 * 86400, // 30 days
  promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
  promotion_purchase_limit: 3,
});

const dealId = deal.response.add_on_deal_id;

// 2. Add main items (phones)
await sdk.addOnDeal.addAddOnDealMainItem({
  add_on_deal_id: dealId,
  main_item_list: [
    { item_id: 100001, status: AddOnDealMainItemStatus.ACTIVE },
    { item_id: 100002, status: AddOnDealMainItemStatus.ACTIVE },
  ],
});

// 3. Add discounted sub items (accessories)
await sdk.addOnDeal.addAddOnDealSubItem({
  add_on_deal_id: dealId,
  sub_item_list: [
    {
      item_id: 200001,
      model_id: 300001,
      sub_item_input_price: 9.99,
      sub_item_limit: 2,
      status: AddOnDealSubItemStatus.ACTIVE,
    },
    {
      item_id: 200002,
      model_id: 300002,
      sub_item_input_price: 14.99,
      sub_item_limit: 1,
      status: AddOnDealSubItemStatus.ACTIVE,
    },
  ],
});
```

### Gift with Minimum Spend

Offer free gifts when customers spend a certain amount:

```typescript
// 1. Create gift promotion
const deal = await sdk.addOnDeal.addAddOnDeal({
  add_on_deal_name: 'Spend $50, Get Free Gift',
  start_time: Math.floor(Date.now() / 1000) + 3600,
  end_time: Math.floor(Date.now() / 1000) + 14 * 86400, // 2 weeks
  promotion_type: AddOnDealPromotionType.GIFT_WITH_MIN_SPEND,
  purchase_min_spend: 50.0,
  per_gift_num: 1,
});

const dealId = deal.response.add_on_deal_id;

// 2. Add qualifying products
await sdk.addOnDeal.addAddOnDealMainItem({
  add_on_deal_id: dealId,
  main_item_list: [
    { item_id: 100001, status: AddOnDealMainItemStatus.ACTIVE },
  ],
});

// 3. Add gift items
await sdk.addOnDeal.addAddOnDealSubItem({
  add_on_deal_id: dealId,
  sub_item_list: [
    {
      item_id: 200003,
      model_id: 300003,
      sub_item_input_price: 0.0, // Free gift
      status: AddOnDealSubItemStatus.ACTIVE,
    },
  ],
});
```

### Manage Active Add-on Deals

Monitor and update your active add-on deals:

```typescript
// Get all ongoing add-on deals
const ongoing = await sdk.addOnDeal.getAddOnDealList({
  promotion_status: AddOnDealPromotionStatus.ONGOING,
  page_size: 100,
});

for (const deal of ongoing.response.add_on_deal_list) {
  console.log(`\nAdd-on Deal: ${deal.add_on_deal_name}`);
  
  // Get sub items
  const subItems = await sdk.addOnDeal.getAddOnDealSubItem({
    add_on_deal_id: deal.add_on_deal_id,
  });
  
  console.log(`  Sub items: ${subItems.response.sub_item_list.length}`);
  
  // Update prices if needed
  // await sdk.addOnDeal.updateAddOnDealSubItem({ ... });
}
```

## Best Practices

### 1. Clear Naming
Use descriptive names that clearly explain the promotion to customers:
```typescript
// Good
add_on_deal_name: 'Buy Phone Case, Get Screen Protector 50% Off'

// Avoid
add_on_deal_name: 'Promo 1'
```

### 2. Set Appropriate Limits
Configure purchase limits to prevent abuse while allowing genuine customers to benefit:
```typescript
{
  promotion_purchase_limit: 5, // Reasonable limit per order
  sub_item_limit: 2, // Limit per sub item
}
```

### 3. Organize Sub Items
Use `sub_item_priority` to control the display order of sub items:
```typescript
await sdk.addOnDeal.updateAddOnDeal({
  add_on_deal_id: dealId,
  sub_item_priority: [100001, 100002, 100003], // Order by item ID
});
```

### 4. Handle Errors Gracefully
Always check for failed items in batch operations:
```typescript
const result = await sdk.addOnDeal.addAddOnDealSubItem({
  add_on_deal_id: dealId,
  sub_item_list: items,
});

if (result.response.sub_item_list.length > 0) {
  console.log('Failed to add some items:');
  result.response.sub_item_list.forEach(failed => {
    console.log(`  ${failed.item_id}/${failed.model_id}: ${failed.fail_message}`);
  });
}
```

## Common Errors

### add_on.add_on_deal_name_invalid
**Error:** The name of add on deal can't exceed 25 characters

**Solution:** Keep your add-on deal name under 25 characters.

### add_on.add_on_deal_start_time_error
**Error:** The start time should be 1 hour later than current time

**Solution:** Set the start time at least 1 hour in the future.

### add_on.add_on_delete_error
**Error:** Only upcoming add on deal can be deleted

**Solution:** You can only delete add-on deals that haven't started yet. Use `endAddOnDeal()` for ongoing deals.

### add_on.add_on_item_delete_error
**Error:** At least one sub item should be added in add on deal

**Solution:** Ensure at least one sub item remains in the add-on deal. Don't delete all sub items.

### add_on.add_on_deal_expired
**Error:** The expired add on deal can't be edited

**Solution:** You cannot edit add-on deals that have already ended.

### add_on.add_on_item_exceed_discount_limit_error
**Error:** The overall item level promotion limit has been reached.

**Solution:** The item you're trying to add is already participating in too many promotions. Remove the item from some other promotions before adding it to this add-on deal, or choose a different item.

## Add-on Deal Lifecycle

1. **Create** - Use `addAddOnDeal()` to create a new add-on deal
2. **Configure Items** - Add main items and sub items
3. **Update** - Modify details before or during the promotion (with restrictions)
4. **Monitor** - Track performance and adjust if needed
5. **End** - Either let it expire naturally or use `endAddOnDeal()` to stop early
6. **Delete** - Only possible for upcoming deals using `deleteAddOnDeal()`

## Related

- [BundleDealManager](./bundle-deal.md) - For buy X get Y deals
- [DiscountManager](./discount.md) - For standard product discounts
- [VoucherManager](./voucher.md) - For voucher promotions
