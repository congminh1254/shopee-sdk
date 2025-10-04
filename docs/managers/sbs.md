# SbsManager

The SbsManager handles Shopee Business Services (SBS) warehouse inventory management, providing access to current inventory, expiry reports, stock aging, and stock movement data.

## Overview

The SBS module allows sellers to:
- View bound warehouse information for their shop
- Monitor current inventory levels across warehouses
- Track expiring and expired stock
- Analyze stock aging patterns
- Review stock movement history (inbound, outbound, adjustments)

## Quick Start

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.SINGAPORE,
});

// Get bound warehouse info
const warehouseInfo = await sdk.sbs.getBoundWhsInfo({});

// Get current inventory
const inventory = await sdk.sbs.getCurrentInventory({
  whs_region: 'CN',
  page_no: 1,
  page_size: 20,
});

// Get stock movement report
const movement = await sdk.sbs.getStockMovement({
  start_time: '2025-02-01',
  end_time: '2025-02-28',
  whs_region: 'CN',
});
```

## Methods

### getBoundWhsInfo()

Get bound warehouse information by shop ID. This returns a list of warehouses that are associated with your shop.

**Parameters:**
- None required (pass empty object `{}`)

**Returns:** List of shops with their bound warehouse regions and IDs

**Example:**
```typescript
const result = await sdk.sbs.getBoundWhsInfo({});

result.response.list.forEach(shop => {
  console.log(`Shop ID: ${shop.shop_id}`);
  shop.bound_whs.forEach(whs => {
    console.log(`  Region: ${whs.whs_region}`);
    console.log(`  Warehouse IDs: ${whs.whs_ids}`);
  });
});
```

### getCurrentInventory()

Get Seller Center Current Inventory Page Data. This API provides detailed inventory information including sellable, reserved, and unsellable quantities across different warehouses.

**Parameters:**
- `whs_region` (string, required): Warehouse region - BR, CN, ID, MY, MX, TH, TW, PH, VN, or SG
- `page_no` (number, optional): Page number (default: 1)
- `page_size` (number, optional): Page size, 1-100 (default: 10)
- `search_type` (number, optional): Search type
  - 0: All data
  - 1: Product Name
  - 2: SKU ID
  - 3: Variations
  - 4: Item ID
- `keyword` (string, optional): Search keyword (use with search_type)
- `whs_ids` (string, optional): Warehouse IDs, comma-separated (e.g., "IDL,IDG")
- `not_moving_tag` (number, optional): Not moving tag (0=No, 1=Yes)
- `inbound_pending_approval` (number, optional): Inbound pending approval (0=No, 1=Yes)
- `products_with_inventory` (number, optional): Products with inventory (0=No, 1=Yes)
- `category_id` (number, optional): Category ID (first-tier only)
- `stock_levels` (string, optional): Stock levels, comma-separated
  - 1: Low Stock & No Sellable stock
  - 2: Low Stock & To replenish
  - 3: Low Stock & Replenished
  - 4: Excess

**Returns:** Current inventory data with pagination cursor

**Example:**
```typescript
// Get all inventory for China warehouse
const inventory = await sdk.sbs.getCurrentInventory({
  whs_region: 'CN',
  page_no: 1,
  page_size: 50,
});

inventory.response.item_list.forEach(item => {
  console.log(`Product: ${item.item_name}`);
  item.sku_list.forEach(sku => {
    console.log(`  SKU: ${sku.model_name}`);
    sku.whs_list.forEach(whs => {
      console.log(`    Warehouse: ${whs.whs_id}`);
      console.log(`    Sellable: ${whs.sellable_qty}`);
      console.log(`    Reserved: ${whs.reserved_qty}`);
      console.log(`    Coverage Days: ${whs.coverage_days}`);
    });
  });
});

// Search for specific product by name
const searchResult = await sdk.sbs.getCurrentInventory({
  whs_region: 'SG',
  search_type: 1,
  keyword: 'T-shirt',
  stock_levels: '1,2', // Low stock items
});

// Filter by category
const categoryInventory = await sdk.sbs.getCurrentInventory({
  whs_region: 'ID',
  category_id: 100002,
  products_with_inventory: 1, // Only products with inventory
});
```

### getExpiryReport()

Get Seller Center Expiry Report page data. This API provides information about expiring, expired, and damaged stocks.

**Parameters:**
- `whs_region` (string, required): Warehouse region - BR, CN, ID, MY, MX, TH, TW, PH, VN, or SG
- `page_no` (number, optional): Page number (default: 1)
- `page_size` (number, optional): Page size, 1-40 (default: 10)
- `whs_ids` (string, optional): Warehouse IDs, comma-separated
- `expiry_status` (string, optional): Expiry status, comma-separated
  - 0: Expired
  - 2: Expiring
  - 4: Expiry blocked
  - 5: Damaged
  - 6: Normal
- `category_id_l1` (number, optional): Level 1 Category ID
- `sku_id` (string, optional): SKU ID
- `item_id` (string, optional): Item ID
- `variation` (string, optional): Variation
- `item_name` (string, optional): Item name

**Returns:** List of items with expiry information

**Example:**
```typescript
// Get all expiring items
const expiryReport = await sdk.sbs.getExpiryReport({
  whs_region: 'CN',
  expiry_status: '2', // Expiring soon
  page_no: 1,
  page_size: 20,
});

expiryReport.response.item_list.forEach(item => {
  console.log(`Product: ${item.item_name}`);
  item.sku_list.forEach(sku => {
    sku.whs_list.forEach(whs => {
      if (whs.expiring_qty > 0) {
        console.log(`  Warehouse: ${whs.whs_id}`);
        console.log(`  Expiring: ${whs.expiring_qty}`);
        console.log(`  Expired: ${whs.expired_qty}`);
        console.log(`  Blocked: ${whs.expiry_blocked_qty}`);
      }
    });
  });
});

// Get expired and damaged items for specific category
const problematicStock = await sdk.sbs.getExpiryReport({
  whs_region: 'MY',
  expiry_status: '0,5', // Expired and damaged
  category_id_l1: 100002,
  whs_ids: 'MYL,MYC',
});
```

### getStockAging()

Get Seller Center Stock Aging page data. This API provides stock aging information showing how long items have been in stock.

**Parameters:**
- `whs_region` (string, required): Warehouse region - BR, CN, ID, MY, MX, TH, TW, PH, VN, or SG
- `page_no` (number, optional): Page number (default: 1)
- `page_size` (number, optional): Page size, 1-100 (default: 10)
- `search_type` (number, optional): Search type
  - 1: Product Name
  - 2: SKU ID
  - 3: Variations
  - 4: Item ID
- `keyword` (string, optional): Search keyword (use with search_type)
- `whs_ids` (string, optional): Warehouse IDs, comma-separated
- `aging_storage_tag` (number, optional): Aging storage tag (0=false, 1=true)
- `excess_storage_tag` (number, optional): Excess storage tag (0=false, 1=true)
- `category_id` (number, optional): L1-level product category ID

**Returns:** List of items with stock aging details

**Stock Age Periods:**
- age_one: 0-30 Days
- age_two: 31-60 Days
- age_three: 61-90 Days
- age_four: 91-120 Days
- age_five: 121-180 Days
- age_six: >180 Days

**Example:**
```typescript
// Get stock aging report
const stockAging = await sdk.sbs.getStockAging({
  whs_region: 'TH',
  page_no: 1,
  page_size: 50,
});

stockAging.response.item_list.forEach(item => {
  console.log(`Product: ${item.item_name}`);
  item.sku_list.forEach(sku => {
    sku.whs_list.forEach(whs => {
      console.log(`  Warehouse: ${whs.whs_id}`);
      console.log(`  0-30 days: ${whs.qty_of_stock_age_one}`);
      console.log(`  31-60 days: ${whs.qty_of_stock_age_two}`);
      console.log(`  61-90 days: ${whs.qty_of_stock_age_three}`);
      console.log(`  91-120 days: ${whs.qty_of_stock_age_four}`);
      console.log(`  121-180 days: ${whs.qty_of_stock_age_five}`);
      console.log(`  >180 days: ${whs.qty_of_stock_age_six}`);
      console.log(`  Excess stock: ${whs.excess_stock}`);
    });
  });
});

// Get only aging stock items
const agingStock = await sdk.sbs.getStockAging({
  whs_region: 'VN',
  aging_storage_tag: 1, // Only aging items
  search_type: 1,
  keyword: 'Electronics',
});
```

### getStockMovement()

Get Seller Center Stock Movement page data. This API provides stock movement information including inbound, outbound, and adjustments over a specified time period.

**Parameters:**
- `start_time` (string, required): Start date in YYYY-MM-DD format
- `end_time` (string, required): End date in YYYY-MM-DD format
- `whs_region` (string, required): Warehouse region - BR, CN, ID, MY, MX, TH, TW, PH, VN, or SG
- `page_no` (number, optional): Page number (default: 1)
- `page_size` (number, optional): Page size, 1-20 (default: 10)
- `whs_ids` (string, optional): Warehouse IDs, comma-separated
- `category_id_l1` (number, optional): L1-level category ID
- `sku_id` (string, optional): SKU ID
- `item_id` (string, optional): Item ID
- `item_name` (string, optional): Item name
- `variation` (string, optional): Variation

**Note:** Only data within the past 1 year can be queried, and the time range must not exceed 90 days.

**Returns:** Stock movement data including start/end quantities, inbound, outbound, and adjustments

**Example:**
```typescript
// Get stock movement for the last month
const movement = await sdk.sbs.getStockMovement({
  start_time: '2025-02-01',
  end_time: '2025-02-28',
  whs_region: 'CN',
  page_no: 1,
  page_size: 20,
});

console.log(`Total items: ${movement.response.total}`);

movement.response.item_list.forEach(item => {
  console.log(`\nProduct: ${item.item_name}`);
  
  item.sku_list.forEach(sku => {
    console.log(`  SKU: ${sku.variation}`);
    
    // Summary per warehouse
    sku.whs_list.forEach(whs => {
      console.log(`    Warehouse: ${whs.whs_id}`);
      console.log(`    Start: ${whs.start_on_hand_total}`);
      console.log(`    +Inbound: ${whs.inbound_total}`);
      console.log(`    -Outbound: ${whs.outbound_total}`);
      console.log(`    ±Adjust: ${whs.adjust_total}`);
      console.log(`    End: ${whs.end_on_hand_total}`);
    });
    
    // Detailed breakdown
    console.log(`  Start Quantities:`);
    console.log(`    Sellable: ${sku.start_qty.start_sellable}`);
    console.log(`    Reserved: ${sku.start_qty.start_reserved}`);
    console.log(`    Unsellable: ${sku.start_qty.start_unsellable}`);
    
    console.log(`  Inbound Breakdown:`);
    console.log(`    Total: ${sku.inbound_qty.inbound_total}`);
    console.log(`    Procurement: ${sku.inbound_qty.inbound_my}`);
    console.log(`    Returns: ${sku.inbound_qty.inbound_returned}`);
    
    console.log(`  Outbound Breakdown:`);
    console.log(`    Total: ${sku.outbound_qty.outbound_total}`);
    console.log(`    Sold: ${sku.outbound_qty.outbound_sold}`);
    console.log(`    Returns: ${sku.outbound_qty.outbound_returned}`);
    console.log(`    Disposed: ${sku.outbound_qty.outbound_disposed}`);
  });
});

// Get movement for specific product category
const categoryMovement = await sdk.sbs.getStockMovement({
  start_time: '2025-01-01',
  end_time: '2025-01-31',
  whs_region: 'SG',
  category_id_l1: 100002,
  whs_ids: 'SGL,SGC',
});

// Get movement for specific SKU
const skuMovement = await sdk.sbs.getStockMovement({
  start_time: '2025-02-01',
  end_time: '2025-02-15',
  whs_region: 'MY',
  sku_id: '801866836_10006075010',
});
```

## Data Structures

### Warehouse Inventory Structure

```typescript
interface WhsInventory {
  whs_id: string;                         // Warehouse ID
  stock_level: number;                    // Stock level indicator
  ir_approval_qty: number;                // IR approval quantity
  in_transit_pending_putaway_qty: number; // In-transit quantity
  sellable_qty: number;                   // Available for sale
  reserved_qty: number;                   // Reserved by orders
  unsellable_qty: number;                 // Not available for sale
  excess_stock: number;                   // Excess inventory
  coverage_days: number;                  // Days of coverage
  in_whs_coverage_days: number;          // In-warehouse coverage days
  selling_speed: number;                  // Average daily sales
  last_7_sold: number;                    // Sales last 7 days
  last_15_sold: number;                   // Sales last 15 days
  last_30_sold: number;                   // Sales last 30 days
  last_60_sold: number;                   // Sales last 60 days
  last_90_sold: number;                   // Sales last 90 days
}
```

### Shop SKU Information

```typescript
interface ShopSku {
  shop_sku_id: string;    // Shop-level SKU ID (item_id_model_id)
  shop_item_id: string;   // Shop item ID (same as Product module item_id)
  shop_model_id: string;  // Shop model ID (item-level model_id)
}
```

## Best Practices

1. **Warehouse Region**: Always specify the correct warehouse region for your shop. Use `getBoundWhsInfo()` to get the list of bound warehouses first.

2. **Pagination**: Use appropriate page sizes based on your needs:
   - Current Inventory: up to 100 items per page
   - Expiry Report: up to 40 items per page
   - Stock Aging: up to 100 items per page
   - Stock Movement: up to 20 items per page

3. **Date Ranges**: For stock movement reports, keep the date range within 90 days and within the past year.

4. **Filtering**: Use filters to reduce the amount of data returned and improve performance:
   - Filter by warehouse IDs when querying specific warehouses
   - Use category filters when analyzing specific product categories
   - Apply stock level filters to focus on problematic inventory

5. **Monitoring**: Regularly check:
   - Expiring stock to prevent waste
   - Stock aging to identify slow-moving items
   - Stock levels to maintain optimal inventory
   - Stock movement to understand sales patterns

## Error Handling

All methods may throw errors with the following common error types:
- `error_data`: Parse data failed or data not found
- `error_param`: Invalid parameters or information not found
- `error_server`: Server error (retry later)
- `invalid_param`: Parameters in the request are invalid
- `invalid_request`: Failed to parse the request
- `server_internal_error`: Internal server error (retry or contact support)

**Example:**
```typescript
try {
  const inventory = await sdk.sbs.getCurrentInventory({
    whs_region: 'CN',
  });
  
  if (inventory.error) {
    console.error('API Error:', inventory.error);
    console.error('Message:', inventory.message);
  } else {
    // Process inventory data
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

## Related Resources

- [Shopee Open Platform - SBS Module](https://open.shopee.com/documents?module=124&type=1&id=2496&version=2)
- [Product Manager](./product.md) - For managing product information
- [Order Manager](./order.md) - For managing orders and fulfillment

## Notes

- The SBS module is designed for shops using Shopee Business Services (cross-border/fulfillment by Shopee)
- For Global Items: `warehouse_item_id` = Global Item ID
- For Local Items: `shop_item_id` = `item_id`
- Warehouse model SKU ID differs from the product model ID for local items
- Use `shop_model_id` to match with the Product module's `model_id`
