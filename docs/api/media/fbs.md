# FbsManager

The FbsManager handles Fulfilled-by-Shopee (FBS) operations for Brazil, providing APIs to check enrollment status, block status, invoice errors, and SKU block status related to Brazil's tax and invoice requirements.

## Overview

The FBS module is specifically designed for Brazil sellers and allows them to:
- Check shop eligibility for FBS enrollment
- Monitor shop block status due to invoice issues
- Track invoice errors for various business processes
- Verify SKU block status

**Note:** All FBS APIs are Brazil-region specific and require proper tax information configuration.

## Quick Start

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.BRAZIL,
});

// Check enrollment status
const enrollmentStatus = await sdk.fbs.queryBrShopEnrollmentStatus({});

// Check shop block status
const shopBlockStatus = await sdk.fbs.queryBrShopBlockStatus({});

// Get invoice errors
const invoiceErrors = await sdk.fbs.queryBrShopInvoiceError({
  page_no: 1,
  page_size: 20,
});

// Check SKU block status
const skuBlockStatus = await sdk.fbs.queryBrSkuBlockStatus({
  shop_sku_id: '123456_789012',
});
```

## Methods

### queryBrShopEnrollmentStatus()

Check whether a given shop_id is eligible to enroll in the Brazil Fulfilled-by-Shopee (FBS) service.

**Parameters:**
- None required (pass empty object `{}`)

**Returns:** Enrollment status information containing:
- `shop_id`: Shopee's unique identifier for the shop
- `enrollment_status`: Enrollment status
  - 1: Enable enrollment (shop can enroll)
  - 2: Disable enrollment (shop cannot enroll)
  - 3: Already enrollment (shop is already enrolled)
- `enable_enrollment_time`: Unix timestamp when the shop can enroll in FBS

**Example:**
```typescript
const status = await sdk.fbs.queryBrShopEnrollmentStatus({});

if (status.response.enrollment_status === 1) {
  console.log('Shop is eligible for FBS enrollment');
  console.log(`Can enroll from: ${new Date(status.response.enable_enrollment_time * 1000)}`);
} else if (status.response.enrollment_status === 3) {
  console.log('Shop is already enrolled in FBS');
}
```

### queryBrShopBlockStatus()

Check whether an FBS shop is blocked due to invoice-related issues. When blocked, the shop cannot create new Inbound Requests, and its warehouse inventory is restricted from being sold.

**Parameters:**
- None required (pass empty object `{}`)

**Returns:** Block status information containing:
- `shop_id`: Shopee's unique identifier for the shop
- `is_block`: Boolean indicating if the shop is blocked

**Example:**
```typescript
const status = await sdk.fbs.queryBrShopBlockStatus({});

if (status.response.is_block) {
  console.log('⚠️ Shop is blocked due to invoice issues!');
  console.log('Cannot create new Inbound Requests');
  console.log('Warehouse inventory sales are restricted');
  // Check invoice errors to resolve the issue
  const errors = await sdk.fbs.queryBrShopInvoiceError({});
} else {
  console.log('✓ Shop is active and not blocked');
}
```

### queryBrShopInvoiceError()

Get failed invoice issuance information for FBS-related processes. This API handles invoice failures covering Inbound Requests, RTS Requests, Sales Orders, and Move Transfer Orders.

**Parameters:**
- `page_no` (number, optional): Page number (default: 1)
- `page_size` (number, optional): Page size, max: 100 (default: 10)

**Returns:** Invoice error information containing:
- `total`: Total number of invoice errors
- `list`: Array of invoice errors, each containing:
  - `shop_id`: Shop ID
  - `biz_request_type`: Business request type
    - 1: Inbound
    - 2: Return From Warehouse (RTS)
    - 3: Sales order invoice
    - 4: Move Transfer
    - 5: IA (Inventory Adjustment)
  - `biz_request_id`: Business request order ID
  - `fail_reason`: Reason for invoice failure
  - `fail_type`: Type of failure
    - 1: SKU tax info error
    - 2: Seller tax info error
  - `invoice_deadline_time`: Unix timestamp - deadline to fix the issue before order cancellation
  - `shop_sku_list`: Array of SKUs with errors, each containing:
    - `shop_item_id`: Item ID
    - `shop_model_id`: Model ID
    - `shop_item_name`: Item name
    - `shop_model_name`: Model name
    - `fail_reason`: Specific error for this SKU
  - `invoice_id`: Invoice ID
  - `reminder_desc`: Reminder message about potential shop/item blocking

**Example:**
```typescript
// Get all invoice errors with pagination
const errors = await sdk.fbs.queryBrShopInvoiceError({
  page_no: 1,
  page_size: 50,
});

console.log(`Total invoice errors: ${errors.response.total}`);

errors.response.list.forEach(error => {
  console.log(`\nBusiness Type: ${getBizTypeLabel(error.biz_request_type)}`);
  console.log(`Request ID: ${error.biz_request_id}`);
  console.log(`Fail Type: ${error.fail_type === 1 ? 'SKU Tax Info' : 'Seller Tax Info'}`);
  console.log(`Reason: ${error.fail_reason}`);
  console.log(`Deadline: ${new Date(error.invoice_deadline_time * 1000)}`);
  console.log(`Warning: ${error.reminder_desc}`);
  
  if (error.shop_sku_list.length > 0) {
    console.log('Affected SKUs:');
    error.shop_sku_list.forEach(sku => {
      console.log(`  - ${sku.shop_item_name} (${sku.shop_model_name})`);
      console.log(`    Error: ${sku.fail_reason}`);
    });
  }
});

function getBizTypeLabel(type: number): string {
  const labels: Record<number, string> = {
    1: 'Inbound Request',
    2: 'Return From Warehouse',
    3: 'Sales Order',
    4: 'Move Transfer',
    5: 'Inventory Adjustment',
  };
  return labels[type] || 'Unknown';
}
```

**Use Case - Monitoring and Fixing Invoice Errors:**
```typescript
// Regular monitoring workflow
async function monitorInvoiceErrors() {
  const errors = await sdk.fbs.queryBrShopInvoiceError({ page_size: 100 });
  
  if (errors.response.total > 0) {
    console.log(`⚠️ Found ${errors.response.total} invoice errors`);
    
    // Group by fail type
    const skuErrors = errors.response.list.filter(e => e.fail_type === 1);
    const sellerErrors = errors.response.list.filter(e => e.fail_type === 2);
    
    if (skuErrors.length > 0) {
      console.log(`\n${skuErrors.length} SKU tax info errors - Update product NCM/tax codes`);
    }
    
    if (sellerErrors.length > 0) {
      console.log(`\n${sellerErrors.length} Seller tax info errors - Update seller CNPJ/tax info`);
    }
    
    // Check urgent ones (deadline within 24 hours)
    const now = Math.floor(Date.now() / 1000);
    const urgent = errors.response.list.filter(
      e => e.invoice_deadline_time - now < 86400
    );
    
    if (urgent.length > 0) {
      console.log(`\n🚨 ${urgent.length} URGENT: Fix within 24 hours!`);
    }
  } else {
    console.log('✓ No invoice errors');
  }
}
```

### queryBrSkuBlockStatus()

Check whether an FBS product is blocked due to invoice-related issues. When blocked, the product cannot be included in new Inbound Requests, and its warehouse inventory is restricted from being sold.

**Parameters:**
- `shop_sku_id` (string, required): Shop SKU ID in format "itemID_modelID"

**Returns:** SKU block status containing:
- `shop_sku_id`: The queried SKU ID
- `is_block`: Boolean indicating if the SKU is blocked
- `shop_item_id`: Item ID
- `shop_model_id`: Model ID
- `shop_item_name`: Item name
- `shop_model_name`: Model/variation name

**Example:**
```typescript
// Check a specific SKU
const status = await sdk.fbs.queryBrSkuBlockStatus({
  shop_sku_id: '123456_789012',
});

console.log(`Product: ${status.response.shop_item_name}`);
console.log(`Variation: ${status.response.shop_model_name}`);

if (status.response.is_block) {
  console.log('⚠️ SKU is BLOCKED');
  console.log('Cannot add to Inbound Requests');
  console.log('Warehouse inventory cannot be sold');
} else {
  console.log('✓ SKU is active');
}
```

**Batch Checking Multiple SKUs:**
```typescript
// Check multiple SKUs
async function checkMultipleSkus(skuIds: string[]) {
  const results = await Promise.all(
    skuIds.map(skuId => 
      sdk.fbs.queryBrSkuBlockStatus({ shop_sku_id: skuId })
    )
  );
  
  const blocked = results.filter(r => r.response.is_block);
  const active = results.filter(r => !r.response.is_block);
  
  console.log(`Checked ${skuIds.length} SKUs:`);
  console.log(`  Active: ${active.length}`);
  console.log(`  Blocked: ${blocked.length}`);
  
  if (blocked.length > 0) {
    console.log('\nBlocked SKUs:');
    blocked.forEach(sku => {
      console.log(`  - ${sku.response.shop_item_name} (${sku.response.shop_model_name})`);
      console.log(`    SKU ID: ${sku.response.shop_sku_id}`);
    });
  }
  
  return { blocked, active };
}

// Usage
const skusToCheck = ['123456_789012', '234567_890123', '345678_901234'];
const { blocked, active } = await checkMultipleSkus(skusToCheck);
```

## Error Handling

All FBS methods can throw errors. Always implement proper error handling:

```typescript
try {
  const status = await sdk.fbs.queryBrShopEnrollmentStatus({});
  console.log(status);
} catch (error) {
  if (error.status === 'error_param') {
    console.error('Invalid parameters:', error.message);
  } else if (error.message.includes('not BR')) {
    console.error('FBS APIs are only available for Brazil region');
  } else {
    console.error('API error:', error);
  }
}
```

## Best Practices

1. **Regular Monitoring**: Check invoice errors daily to avoid shop/SKU blocking
   ```typescript
   // Run daily
   const errors = await sdk.fbs.queryBrShopInvoiceError({});
   if (errors.response.total > 0) {
     // Send alert to team
   }
   ```

2. **Proactive Block Checking**: Before critical operations, verify status
   ```typescript
   // Before creating inbound request
   const shopStatus = await sdk.fbs.queryBrShopBlockStatus({});
   if (shopStatus.response.is_block) {
     throw new Error('Shop is blocked, fix invoice issues first');
   }
   ```

3. **SKU Validation**: Check SKU status before inventory operations
   ```typescript
   // Before adding SKU to inbound
   const skuStatus = await sdk.fbs.queryBrSkuBlockStatus({
     shop_sku_id: mySkuId,
   });
   if (skuStatus.response.is_block) {
     console.warn(`SKU ${mySkuId} is blocked, skipping...`);
   }
   ```

4. **Deadline Tracking**: Monitor invoice deadlines to prevent auto-cancellation
   ```typescript
   const errors = await sdk.fbs.queryBrShopInvoiceError({});
   const now = Math.floor(Date.now() / 1000);
   
   errors.response.list.forEach(error => {
     const hoursLeft = (error.invoice_deadline_time - now) / 3600;
     if (hoursLeft < 48) {
       console.warn(`⚠️ Only ${hoursLeft.toFixed(1)} hours left to fix ${error.biz_request_id}`);
     }
   });
   ```

## Region Requirement

**Important:** All FBS APIs are **Brazil-specific**. Ensure your SDK is configured for the Brazil region:

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.BRAZIL, // Required!
});
```

Attempting to use FBS APIs in other regions will result in an error.

## Common Error Codes

- `fbs_err_param`: Invalid parameter provided
- `fbs_err_record_not_found`: Record not found
- `fbs_err_region_not_br`: Region is not BR (Brazil)
- `fbs_err_shop_sku_not_related`: Shop and SKU are not related
- `fbs_err_system`: System error, try again later
- `error_shop`: Shop ID is invalid

## Related Documentation

- [Order Manager](./order.md) - For FBS invoice generation APIs
- [SBS Manager](./sbs.md) - For warehouse inventory management
- [Product Manager](./product.md) - For managing product tax information
