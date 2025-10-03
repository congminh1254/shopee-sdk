# ShopFlashSaleManager

The ShopFlashSaleManager handles shop flash sale activity creation, management, and item-level configuration for Shopee's flash sale promotions.

## Overview

The ShopFlashSaleManager provides methods for:
- Getting available time slots for flash sales
- Creating and managing shop flash sales
- Adding and managing items in flash sales
- Updating flash sale and item statuses
- Retrieving flash sale information and criteria
- Managing flash sale lifecycle (enable, disable, delete)

## Quick Start

```typescript
// 1. Get available time slots
const now = Math.floor(Date.now() / 1000);
const slots = await sdk.shopFlashSale.getTimeSlotId({
  start_time: now,
  end_time: now + 7 * 86400, // Next 7 days
});

// 2. Create a flash sale
const flashSale = await sdk.shopFlashSale.createShopFlashSale({
  timeslot_id: slots.response[0].timeslot_id,
});

// 3. Add items to the flash sale
await sdk.shopFlashSale.addShopFlashSaleItems({
  flash_sale_id: flashSale.response.flash_sale_id,
  items: [
    {
      item_id: 123456,
      purchase_limit: 5,
      models: [
        {
          model_id: 789012,
          input_promo_price: 19.99,
          stock: 100,
        },
      ],
    },
  ],
});

// 4. Enable the flash sale
await sdk.shopFlashSale.updateShopFlashSale({
  flash_sale_id: flashSale.response.flash_sale_id,
  status: 1, // 1: enable, 2: disable
});
```

## Methods

### getTimeSlotId()

**API Documentation:** [v2.shop_flash_sale.get_time_slot_id](https://open.shopee.com/documents/v2/v2.shop_flash_sale.get_time_slot_id?module=123&type=1)

Get available time slots for creating shop flash sales.

```typescript
const now = Math.floor(Date.now() / 1000);
const response = await sdk.shopFlashSale.getTimeSlotId({
  start_time: now,
  end_time: now + 30 * 86400, // Next 30 days
});

console.log('Available time slots:', response.response);
// Each slot includes: timeslot_id, start_time, end_time
```

**Important Notes:**
- You can only use time slots that start in the future
- Time slots are pre-defined by Shopee
- Each time slot represents a specific flash sale session

### createShopFlashSale()

**API Documentation:** [v2.shop_flash_sale.create_shop_flash_sale](https://open.shopee.com/documents/v2/v2.shop_flash_sale.create_shop_flash_sale?module=123&type=1)

Create a new shop flash sale for a specific time slot.

```typescript
const response = await sdk.shopFlashSale.createShopFlashSale({
  timeslot_id: 236767490043904,
});

console.log('Flash sale created:', response.response.flash_sale_id);
console.log('Status:', response.response.status); // 1: enabled, 2: disabled
```

**Important Notes:**
- Time slot must be obtained from `getTimeSlotId()`
- Time slot must start in the future
- Shop must meet criteria to create flash sales
- Flash sale is created empty - use `addShopFlashSaleItems()` to add products

**Constraints:**
- Cannot create flash sales when shop is in holiday mode
- Shop must be active

### getShopFlashSale()

**API Documentation:** [v2.shop_flash_sale.get_shop_flash_sale](https://open.shopee.com/documents/v2/v2.shop_flash_sale.get_shop_flash_sale?module=123&type=1)

Get detailed information about a specific shop flash sale.

```typescript
const response = await sdk.shopFlashSale.getShopFlashSale({
  flash_sale_id: 802063533822541,
});

console.log('Flash sale details:', response.response);
// Includes: status, start_time, end_time, enabled_item_count, item_count, type
```

**Status Values:**
- `0`: Deleted
- `1`: Enabled
- `2`: Disabled
- `3`: System rejected

**Type Values:**
- `1`: Upcoming
- `2`: Ongoing
- `3`: Expired

### getShopFlashSaleList()

**API Documentation:** [v2.shop_flash_sale.get_shop_flash_sale_list](https://open.shopee.com/documents/v2/v2.shop_flash_sale.get_shop_flash_sale_list?module=123&type=1)

Get a list of shop flash sales with pagination and filtering.

```typescript
const response = await sdk.shopFlashSale.getShopFlashSaleList({
  type: 1, // 0: all, 1: upcoming, 2: ongoing, 3: expired
  offset: 0,
  limit: 20,
});

console.log('Total flash sales:', response.response.total_count);
console.log('Flash sales:', response.flash_sale_list);

// Optional: Filter by time range
const filtered = await sdk.shopFlashSale.getShopFlashSaleList({
  type: 0,
  start_time: Math.floor(Date.now() / 1000),
  end_time: Math.floor(Date.now() / 1000) + 30 * 86400,
  offset: 0,
  limit: 20,
});
```

**Pagination:**
- `offset`: Min 0, Max 1000
- `limit`: Min 1, Max 100

### updateShopFlashSale()

**API Documentation:** [v2.shop_flash_sale.update_shop_flash_sale](https://open.shopee.com/documents/v2/v2.shop_flash_sale.update_shop_flash_sale?module=123&type=1)

Enable or disable a shop flash sale.

```typescript
// Enable flash sale
const response = await sdk.shopFlashSale.updateShopFlashSale({
  flash_sale_id: 802063533822541,
  status: 1, // 1: enable
});

// Disable flash sale
const response2 = await sdk.shopFlashSale.updateShopFlashSale({
  flash_sale_id: 802063533822541,
  status: 2, // 2: disable
});
```

**Important Notes:**
- Disabling a flash sale will disable all items in the session
- Cannot edit flash sales with `system_rejected` status (status = 3)
- Status options: `1` (enable), `2` (disable)

### deleteShopFlashSale()

**API Documentation:** [v2.shop_flash_sale.delete_shop_flash_sale](https://open.shopee.com/documents/v2/v2.shop_flash_sale.delete_shop_flash_sale?module=123&type=1)

Delete a shop flash sale.

```typescript
const response = await sdk.shopFlashSale.deleteShopFlashSale({
  flash_sale_id: 802063533822541,
});

console.log('Flash sale deleted, status:', response.response.status); // 0: deleted
```

**Important Notes:**
- **Cannot** delete ongoing flash sales (type = 2)
- **Cannot** delete expired flash sales (type = 3)
- Can only delete upcoming flash sales (type = 1)

### addShopFlashSaleItems()

**API Documentation:** [v2.shop_flash_sale.add_shop_flash_sale_items](https://open.shopee.com/documents/v2/v2.shop_flash_sale.add_shop_flash_sale_items?module=123&type=1)

Add items to a shop flash sale.

```typescript
const response = await sdk.shopFlashSale.addShopFlashSaleItems({
  flash_sale_id: 802063533822541,
  items: [
    {
      item_id: 3744623870,
      purchase_limit: 5, // 0 means no limit
      models: [
        {
          model_id: 5414485721,
          input_promo_price: 69.3, // Price without tax
          stock: 100, // Campaign stock
        },
      ],
    },
  ],
});

console.log('Failed items:', response.response.failed_items);
```

**For Items with Variations:**
```typescript
{
  item_id: 123456,
  purchase_limit: 5,
  models: [
    { model_id: 1001, input_promo_price: 25.99, stock: 100 },
    { model_id: 1002, input_promo_price: 29.99, stock: 150 },
  ],
}
```

**For Items without Variations:**
```typescript
{
  item_id: 789012,
  purchase_limit: 3,
  item_input_promo_price: 15.99, // Use this instead of models
  item_stock: 200,
}
```

**Constraints:**
- Maximum 50 enabled items per flash sale
- Items must meet criteria (check with `getItemCriteria()`)
- Flash sale must be enabled or upcoming
- Shop must not be in holiday mode

### getShopFlashSaleItems()

**API Documentation:** [v2.shop_flash_sale.get_shop_flash_sale_items](https://open.shopee.com/documents/v2/v2.shop_flash_sale.get_shop_flash_sale_items?module=123&type=1)

Get items and their details in a shop flash sale.

```typescript
const response = await sdk.shopFlashSale.getShopFlashSaleItems({
  flash_sale_id: 802063533822541,
  offset: 0,
  limit: 50,
});

console.log('Total items:', response.response.total_count);
console.log('Item info:', response.response.item_info);
console.log('Model details:', response.response.models);
```

**Response Structure:**
- `item_info`: Basic item information (ID, name, image)
- `models`: Detailed model information for items with variations
- Items without variations have details in `item_info`

**Item Status:**
- `0`: Disabled
- `1`: Enabled
- `2`: Deleted
- `4`: System rejected
- `5`: Manual rejected

### updateShopFlashSaleItems()

**API Documentation:** [v2.shop_flash_sale.update_shop_flash_sale_items](https://open.shopee.com/documents/v2/v2.shop_flash_sale.update_shop_flash_sale_items?module=123&type=1)

Update items in a shop flash sale.

```typescript
const response = await sdk.shopFlashSale.updateShopFlashSaleItems({
  flash_sale_id: 802063533822541,
  items: [
    {
      item_id: 3744623870,
      purchase_limit: 10,
      models: [
        {
          model_id: 5414485721,
          status: 1, // 0: disable, 1: enable
          input_promo_price: 65.0, // Can only set if status = 1
          stock: 150,
        },
      ],
    },
  ],
});

console.log('Failed items:', response.response.failed_items);
```

**Important Notes:**
- Can only edit items/models in **disabled** or **enabled** status
- **Cannot** modify price or stock of enabled items
- To change price/stock: First disable the item, then update and enable
- Flash sale must be enabled or upcoming

**Status Management:**
- To enable a disabled item: Set `status: 1` and provide new price/stock
- To disable an enabled item: Set `status: 0` (cannot modify price/stock)
- To update price/stock: Must disable first, then re-enable with new values

### deleteShopFlashSaleItems()

**API Documentation:** [v2.shop_flash_sale.delete_shop_flash_sale_items](https://open.shopee.com/documents/v2/v2.shop_flash_sale.delete_shop_flash_sale_items?module=123&type=1)

Delete items from a shop flash sale.

```typescript
const response = await sdk.shopFlashSale.deleteShopFlashSaleItems({
  flash_sale_id: 802063533822541,
  item_ids: [3744623870, 3744624265],
});

console.log('Items deleted');
```

**Important Notes:**
- Deleting an item will delete **all its models/variations**
- Flash sale must be enabled or upcoming
- Cannot delete items from ongoing or expired flash sales

### getItemCriteria()

**API Documentation:** [v2.shop_flash_sale.get_item_criteria](https://open.shopee.com/documents/v2/v2.shop_flash_sale.get_item_criteria?module=123&type=1)

Get criteria that items must meet to be eligible for shop flash sales.

```typescript
const response = await sdk.shopFlashSale.getItemCriteria({});

console.log('Criteria:', response.response.criteria);
console.log('Category mappings:', response.response.pair_ids);
console.log('Blocked categories:', response.response.overlap_block_category_ids);
```

**Criteria Fields:**
- `min_product_rating`: Minimum product rating (0.0-5.0)
- `min_likes`: Minimum number of likes
- `must_not_pre_order`: Whether pre-order items are allowed
- `min_order_total`: Minimum orders in last 30 days
- `max_days_to_ship`: Maximum days to ship
- `min_repetition_day`: Cooldown period before item can join flash sale again
- `min_promo_stock` / `max_promo_stock`: Promo stock limits
- `min_discount` / `max_discount`: Discount percentage limits
- `min_discount_price` / `max_discount_price`: Discount price limits
- `need_lowest_price`: Must be lower than lowest price in last 7 days

**Note:** `-1` value means no limit for that criteria.

## Use Cases

### Create a Flash Sale Campaign

```typescript
async function createFlashSaleCampaign() {
  // 1. Get available time slots
  const now = Math.floor(Date.now() / 1000);
  const slots = await sdk.shopFlashSale.getTimeSlotId({
    start_time: now,
    end_time: now + 7 * 86400,
  });
  
  console.log('Available slots:', slots.response.length);
  
  // 2. Create flash sale for the first available slot
  const flashSale = await sdk.shopFlashSale.createShopFlashSale({
    timeslot_id: slots.response[0].timeslot_id,
  });
  
  console.log('Flash sale created:', flashSale.response.flash_sale_id);
  
  // 3. Add items
  await sdk.shopFlashSale.addShopFlashSaleItems({
    flash_sale_id: flashSale.response.flash_sale_id,
    items: [
      {
        item_id: 123456,
        purchase_limit: 5,
        models: [
          { model_id: 789, input_promo_price: 19.99, stock: 100 },
        ],
      },
    ],
  });
  
  // 4. Enable the flash sale
  await sdk.shopFlashSale.updateShopFlashSale({
    flash_sale_id: flashSale.response.flash_sale_id,
    status: 1,
  });
  
  console.log('Flash sale is now live!');
}
```

### Manage Flash Sale Items

```typescript
async function manageFlashSaleItems(flashSaleId: number) {
  // Get current items
  const items = await sdk.shopFlashSale.getShopFlashSaleItems({
    flash_sale_id: flashSaleId,
    offset: 0,
    limit: 50,
  });
  
  console.log('Current items:', items.response.total_count);
  
  // Disable a model to update its price
  await sdk.shopFlashSale.updateShopFlashSaleItems({
    flash_sale_id: flashSaleId,
    items: [
      {
        item_id: 123456,
        models: [
          { model_id: 789, status: 0 }, // Disable
        ],
      },
    ],
  });
  
  // Re-enable with new price
  await sdk.shopFlashSale.updateShopFlashSaleItems({
    flash_sale_id: flashSaleId,
    items: [
      {
        item_id: 123456,
        models: [
          {
            model_id: 789,
            status: 1, // Enable
            input_promo_price: 15.99, // New price
            stock: 150,
          },
        ],
      },
    ],
  });
  
  console.log('Item price updated!');
}
```

### Check Item Eligibility

```typescript
async function checkItemEligibility() {
  // Get criteria for flash sales
  const criteria = await sdk.shopFlashSale.getItemCriteria({});
  
  console.log('Flash sale criteria:');
  criteria.response.criteria.forEach((c) => {
    console.log(`- Criteria ${c.criteria_id}:`);
    console.log(`  Min rating: ${c.min_product_rating}`);
    console.log(`  Min discount: ${c.min_discount}%`);
    console.log(`  Max discount: ${c.max_discount}%`);
    console.log(`  Min orders: ${c.min_order_total}`);
  });
  
  // Check category mappings
  criteria.response.pair_ids.forEach((pair) => {
    console.log(`Criteria ${pair.criteria_id} applies to:`);
    pair.category_list.forEach((cat) => {
      console.log(`  - ${cat.name} (ID: ${cat.category_id})`);
    });
  });
}
```

### Monitor Flash Sales

```typescript
async function monitorFlashSales() {
  // Get all upcoming flash sales
  const upcoming = await sdk.shopFlashSale.getShopFlashSaleList({
    type: 1, // upcoming
    offset: 0,
    limit: 100,
  });
  
  console.log(`${upcoming.response.total_count} upcoming flash sales`);
  
  // Get ongoing flash sales
  const ongoing = await sdk.shopFlashSale.getShopFlashSaleList({
    type: 2, // ongoing
    offset: 0,
    limit: 100,
  });
  
  console.log(`${ongoing.response.total_count} ongoing flash sales`);
  
  // Get details for each ongoing sale
  for (const sale of ongoing.flash_sale_list) {
    const details = await sdk.shopFlashSale.getShopFlashSale({
      flash_sale_id: sale.flash_sale_id,
    });
    
    console.log(`Flash sale ${sale.flash_sale_id}:`);
    console.log(`  - Enabled items: ${details.response.enabled_item_count}`);
    console.log(`  - Total items: ${details.response.item_count}`);
    console.log(`  - Clicks: ${sale.click_count}`);
    console.log(`  - Reminders: ${sale.remindme_count}`);
  }
}
```

## Best Practices

### Item Management
- Always check item criteria before adding items
- Start with a small number of items to test
- Monitor failed items and adjust accordingly
- Keep promotional stock at reasonable levels

### Pricing Strategy
- Ensure promotion prices meet discount criteria
- Price should be lower than last 7 days' lowest price
- Consider tax when setting `input_promo_price`
- Use `promotion_price_with_tax` for display to customers

### Status Management
- Enable flash sales only when all items are ready
- Disable flash sales temporarily if needed (doesn't delete items)
- Delete only upcoming flash sales to avoid issues
- Cannot modify ongoing or expired flash sales

### Performance Optimization
- Use pagination for large item lists
- Batch item operations when possible
- Cache time slot data (they don't change frequently)
- Monitor flash sale performance with click and reminder counts

## Common Errors

### shop_flash_sale_already_exist
**Cause:** A flash sale already exists for this time slot
**Solution:** Choose a different time slot or delete the existing flash sale

### shop_flash_sale.not_meet_shop_criteria
**Cause:** Shop doesn't meet requirements for flash sales
**Solution:** Check shop rating, performance metrics, and account status

### shop_flash_sale_exceed_max_item_limit
**Cause:** Trying to enable more than 50 items
**Solution:** Reduce number of enabled items or remove some items

### shop_flash_sale_is_not_enabled_or_upcoming
**Cause:** Trying to modify ongoing or expired flash sale
**Solution:** Can only modify flash sales that are enabled or upcoming

### shop_flash_sale_in_holiday_mode
**Cause:** Shop is in holiday mode
**Solution:** Disable holiday mode before managing flash sales

## Flash Sale Lifecycle

1. **Planning**: Get time slots and check item criteria
2. **Creation**: Create flash sale for desired time slot
3. **Setup**: Add eligible items with promotional prices
4. **Enable**: Activate the flash sale
5. **Monitor**: Track performance during flash sale
6. **Adjustment**: Disable/enable items as needed (only before sale starts)
7. **Completion**: Flash sale automatically expires after end time
8. **Cleanup**: Optionally delete expired flash sales

## Related

- [DiscountManager](./discount.md) - Regular shop discounts
- [VoucherManager](./voucher.md) - Shop vouchers
- [BundleDealManager](./bundle-deal.md) - Bundle deals
- [AddOnDealManager](./add-on-deal.md) - Add-on deals
