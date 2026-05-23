# OrderManager

The OrderManager handles all order-related operations including retrieving, processing, and managing orders.

## Overview

The OrderManager provides methods for:
- **Order Retrieval**: Get order lists and details
- **Order Processing**: Split, unsplit, and cancel orders
- **Shipping Management**: Get shipment information
- **Package Management**: Get package details and search packages
- **Invoice Management**: Retrieve, upload, and download buyer invoice information
- **Booking Management**: Get booking details and lists
- **Prescription Management**: Handle prescription checks (ID/PH only)
- **Buyer Cancellation**: Handle buyer cancellation requests
- **FBS Invoices**: Generate, check status, and download FBS tax documents (BR only)
- **Warehouse Management**: Get warehouse filter configurations
- **Order Notes**: Add notes to orders

## Quick Start

```typescript
// Get order list
const orders = await sdk.order.getOrderList({
  time_range_field: 'create_time',
  time_from: Math.floor(Date.now() / 1000) - 86400, // Last 24 hours
  time_to: Math.floor(Date.now() / 1000),
  page_size: 20,
});

// Get order details
const details = await sdk.order.getOrdersDetail({
  order_sn_list: ['ORDER123', 'ORDER456'],
});

// Get shipment list
const shipments = await sdk.order.getShipmentList({
  page_size: 20,
});
```

## Methods

### getOrderList()

**API Documentation:** [v2.order.get_order_list](https://open.shopee.com/documents/v2/v2.order.get_order_list?module=94&type=1)

Retrieve a list of orders within a time range.

```typescript
const response = await sdk.order.getOrderList({
  time_range_field: 'create_time', // or 'update_time'
  time_from: Math.floor(Date.now() / 1000) - 7 * 86400, // Last 7 days
  time_to: Math.floor(Date.now() / 1000),
  page_size: 50,
  cursor: '', // For pagination
  order_status: 'READY_TO_SHIP', // Optional: filter by status
});

console.log('Total:', response.more ? 'More available' : 'All loaded');
console.log('Next cursor:', response.next_cursor);

response.order_list.forEach((order) => {
  console.log('Order SN:', order.order_sn);
  console.log('Status:', order.order_status);
});
```

**Order Status Values:**
- `UNPAID`: Order placed but not paid
- `READY_TO_SHIP`: Paid and ready for shipping
- `PROCESSED`: Order processed/shipped
- `SHIPPED`: Order shipped
- `COMPLETED`: Order completed
- `CANCELLED`: Order cancelled
- `INVOICE_PENDING`: Waiting for invoice

**Parameters:**
- `time_range_field`: Filter by 'create_time' or 'update_time'
- `time_from`: Start of time range (Unix timestamp)
- `time_to`: End of time range (Unix timestamp)
- `page_size`: Number of orders per page (max: 100)
- `cursor`: Pagination cursor from previous response
- `order_status`: Filter by specific status

**Pagination Example:**
```typescript
async function getAllOrders(timeFrom: number, timeTo: number) {
  const allOrders = [];
  let cursor = '';
  let hasMore = true;

  while (hasMore) {
    const response = await sdk.order.getOrderList({
      time_range_field: 'create_time',
      time_from: timeFrom,
      time_to: timeTo,
      page_size: 100,
      cursor,
    });

    allOrders.push(...response.order_list);
    cursor = response.next_cursor;
    hasMore = response.more;
  }

  return allOrders;
}
```

---

### getOrdersDetail()

Get detailed information about specific orders.

```typescript
const response = await sdk.order.getOrdersDetail({
  order_sn_list: ['ORDER123', 'ORDER456'], // Up to 50 order SNs
  response_optional_fields: [
    'buyer_user_id',
    'buyer_username',
    'estimated_shipping_fee',
    'recipient_address',
    'actual_shipping_fee',
    'goods_to_declare',
    'note',
    'note_update_time',
    'item_list',
    'pay_time',
    'dropshipper',
    'credit_card_number',
    'dropshipper_phone',
    'split_up',
    'buyer_cancel_reason',
    'cancel_by',
    'cancel_reason',
    'actual_shipping_fee_confirmed',
    'buyer_cpf_id',
    'fulfillment_flag',
    'pickup_done_time',
    'package_list',
    'shipping_carrier',
    'payment_method',
    'total_amount',
    'buyer_username',
    'invoice_data',
  ],
});

response.order_list.forEach((order) => {
  console.log('Order:', order.order_sn);
  console.log('Buyer:', order.buyer_username);
  console.log('Total:', order.total_amount);
  console.log('Status:', order.order_status);
  console.log('Shipping address:', order.recipient_address);
  
  order.item_list?.forEach((item) => {
    console.log('- Item:', item.item_name);
    console.log('  Quantity:', item.model_quantity_purchased);
    console.log('  Price:', item.model_discounted_price);
  });
});
```

**Optional Fields:** Use `response_optional_fields` to request specific data to reduce response size and improve performance.

---

### getShipmentList()

**API Documentation:** [v2.order.get_shipment_list](https://open.shopee.com/documents/v2/v2.order.get_shipment_list?module=94&type=1)

Get list of orders ready to ship or shipped.

```typescript
const response = await sdk.order.getShipmentList({
  page_size: 50,
  cursor: '', // For pagination
});

console.log('More available:', response.more);
console.log('Next cursor:', response.next_cursor);

response.order_list.forEach((order) => {
  console.log('Order:', order.order_sn);
  console.log('Package:', order.package_number);
  console.log('Logistic:', order.logistics_status);
});
```

---

### splitOrder()

**API Documentation:** [v2.order.split_order](https://open.shopee.com/documents/v2/v2.order.split_order?module=94&type=1)

Split an order into multiple packages for separate shipping.

```typescript
await sdk.order.splitOrder({
  order_sn: 'ORDER123',
  item_list: [
    {
      item_id: 123456,
      model_id: 111,
      quantity: 2,
    },
    {
      item_id: 789012,
      model_id: 222,
      quantity: 1,
    },
  ],
});

console.log('Order split successfully');
```

**Use Cases:**
- Split large orders for separate warehouse fulfillment
- Ship items separately based on availability
- Handle partial fulfillment scenarios

---

### unsplitOrder()

**API Documentation:** [v2.order.unsplit_order](https://open.shopee.com/documents/v2/v2.order.unsplit_order?module=94&type=1)

Revert a split order back to a single order.

```typescript
await sdk.order.unsplitOrder({
  order_sn: 'ORDER123',
});

console.log('Order unsplit successfully');
```

**Note:** Can only unsplit orders that haven't been shipped yet.

---

### cancelOrder()

**API Documentation:** [v2.order.cancel_order](https://open.shopee.com/documents/v2/v2.order.cancel_order?module=94&type=1)

Cancel an order.

```typescript
await sdk.order.cancelOrder({
  order_sn: 'ORDER123',
  cancel_reason: 'OUT_OF_STOCK', // Cancellation reason code
  item_list: [
    {
      item_id: 123456,
      model_id: 111,
    },
  ],
});

console.log('Order cancelled');
```

**Common Cancel Reasons:**
- `OUT_OF_STOCK`: Product out of stock
- `CUSTOMER_REQUEST`: Buyer requested cancellation
- `UNDELIVERABLE_AREA`: Cannot deliver to area
- `COD_NOT_SUPPORTED`: COD not available

**Important:** Only unpaid orders or orders with buyer agreement can be cancelled by seller.

---

### getBuyerInvoiceInfo()

**API Documentation:** [v2.order.get_buyer_invoice_info](https://open.shopee.com/documents/v2/v2.order.get_buyer_invoice_info?module=94&type=1)

Get invoice information for an order (region-specific, e.g., Brazil, Poland).

```typescript
const response = await sdk.order.getBuyerInvoiceInfo({
  order_sn_list: ['ORDER123', 'ORDER456'],
});

response.result_list.forEach((result) => {
  if (result.invoice_info) {
    console.log('Order:', result.order_sn);
    console.log('Invoice number:', result.invoice_info.number);
    console.log('Invoice date:', result.invoice_info.create_time);
    console.log('Tax ID:', result.invoice_info.tax_id);
  }
});
```

**Note:** This method is only applicable to regions that require invoices (e.g., BR, PL).

## Order Processing Workflow

### Complete Order Fulfillment Flow

```typescript
async function fulfillOrder(orderSn: string) {
  // Step 1: Get order details
  const details = await sdk.order.getOrdersDetail({
    order_sn_list: [orderSn],
    response_optional_fields: ['item_list', 'recipient_address'],
  });
  
  const order = details.order_list[0];
  console.log('Processing order:', order.order_sn);
  
  // Step 2: Verify order status
  if (order.order_status !== 'READY_TO_SHIP') {
    console.log('Order not ready to ship');
    return;
  }
  
  // Step 3: Check inventory
  const hasInventory = await checkInventory(order.item_list);
  if (!hasInventory) {
    // Cancel if out of stock
    await sdk.order.cancelOrder({
      order_sn: orderSn,
      cancel_reason: 'OUT_OF_STOCK',
      item_list: order.item_list.map(item => ({
        item_id: item.item_id,
        model_id: item.model_id,
      })),
    });
    return;
  }
  
  // Step 4: Process shipment (handled by LogisticsManager)
  await sdk.logistics.shipOrder({
    order_sn: orderSn,
    // ... shipping details
  });
  
  console.log('Order fulfilled successfully');
}
```

### Bulk Order Processing

```typescript
async function processPendingOrders() {
  // Get orders ready to ship
  const response = await sdk.order.getOrderList({
    time_range_field: 'update_time',
    time_from: Math.floor(Date.now() / 1000) - 86400,
    time_to: Math.floor(Date.now() / 1000),
    page_size: 100,
    order_status: 'READY_TO_SHIP',
  });
  
  console.log(`Found ${response.order_list.length} orders to process`);
  
  // Process in batches
  const batchSize = 10;
  for (let i = 0; i < response.order_list.length; i += batchSize) {
    const batch = response.order_list.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(order => fulfillOrder(order.order_sn))
    );
    
    console.log(`Processed batch ${i / batchSize + 1}`);
  }
}
```

## Best Practices

### 1. Use Pagination Efficiently

```typescript
// ✅ Good: Use cursor-based pagination
let cursor = '';
let hasMore = true;

while (hasMore) {
  const response = await sdk.order.getOrderList({
    time_range_field: 'create_time',
    time_from: startTime,
    time_to: endTime,
    page_size: 100,
    cursor,
  });
  
  // Process orders
  await processOrders(response.order_list);
  
  cursor = response.next_cursor;
  hasMore = response.more;
}
```

### 2. Request Only Needed Fields

```typescript
// ✅ Good: Request specific fields
const response = await sdk.order.getOrdersDetail({
  order_sn_list: orderSns,
  response_optional_fields: ['item_list', 'total_amount'], // Only what you need
});

// ❌ Bad: Request all fields unnecessarily
const response = await sdk.order.getOrdersDetail({
  order_sn_list: orderSns,
  response_optional_fields: [/* all 30+ fields */],
});
```

### 3. Handle Time Ranges Properly

```typescript
// ✅ Good: Use reasonable time ranges (max 15 days)
const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 86400;
const now = Math.floor(Date.now() / 1000);

const response = await sdk.order.getOrderList({
  time_range_field: 'create_time',
  time_from: sevenDaysAgo,
  time_to: now,
  page_size: 100,
});
```

### 4. Error Handling

```typescript
try {
  await sdk.order.cancelOrder({
    order_sn: orderSn,
    cancel_reason: 'OUT_OF_STOCK',
    item_list: items,
  });
} catch (error) {
  if (error.error === 'error_order_status') {
    console.error('Order status does not allow cancellation');
  } else if (error.error === 'error_permission_denied') {
    console.error('No permission to cancel this order');
  } else {
    console.error('Cancellation failed:', error.message);
  }
}
```

### 5. Monitor Order Status Changes

```typescript
async function monitorOrders() {
  const lastCheckTime = await getLastCheckTime();
  const now = Math.floor(Date.now() / 1000);
  
  const response = await sdk.order.getOrderList({
    time_range_field: 'update_time', // Check by update time
    time_from: lastCheckTime,
    time_to: now,
    page_size: 100,
  });
  
  for (const order of response.order_list) {
    // Handle status changes
    if (order.order_status === 'READY_TO_SHIP') {
      await handleReadyToShip(order.order_sn);
    } else if (order.order_status === 'CANCELLED') {
      await handleCancellation(order.order_sn);
    }
  }
  
  await saveLastCheckTime(now);
}

// Run periodically
setInterval(monitorOrders, 5 * 60 * 1000); // Every 5 minutes
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_order_not_found` | Order doesn't exist | Verify order_sn is correct |
| `error_order_status` | Invalid order status for operation | Check current order status first |
| `error_permission_denied` | No permission for this operation | Verify shop authorization |
| `error_param` | Invalid parameters | Check required fields and formats |
| `error_time_range_invalid` | Time range exceeds limits | Use smaller time ranges (max 15 days) |

## Order Status Flow

```
UNPAID
  ↓
READY_TO_SHIP (Payment confirmed)
  ↓
PROCESSED (Shipping arrangement made)
  ↓
SHIPPED (Package shipped)
  ↓
COMPLETED (Delivered and confirmed)

       or

CANCELLED (Cancelled by buyer/seller)
```

## Integration Examples

### Sync Orders to Your Database

```typescript
async function syncOrders() {
  const lastSyncTime = await database.getLastSyncTime();
  const now = Math.floor(Date.now() / 1000);
  
  let cursor = '';
  let hasMore = true;
  
  while (hasMore) {
    const response = await sdk.order.getOrderList({
      time_range_field: 'update_time',
      time_from: lastSyncTime,
      time_to: now,
      page_size: 100,
      cursor,
    });
    
    // Get detailed info
    const orderSns = response.order_list.map(o => o.order_sn);
    const details = await sdk.order.getOrdersDetail({
      order_sn_list: orderSns,
      response_optional_fields: ['item_list', 'buyer_username', 'total_amount'],
    });
    
    // Save to database
    await database.orders.bulkUpsert(details.order_list);
    
    cursor = response.next_cursor;
    hasMore = response.more;
  }
  
  await database.setLastSyncTime(now);
}
```

### Generate Daily Order Report

```typescript
async function generateDailyReport(date: Date) {
  const startOfDay = Math.floor(date.setHours(0, 0, 0, 0) / 1000);
  const endOfDay = Math.floor(date.setHours(23, 59, 59, 999) / 1000);
  
  const response = await sdk.order.getOrderList({
    time_range_field: 'create_time',
    time_from: startOfDay,
    time_to: endOfDay,
    page_size: 100,
  });
  
  const orderSns = response.order_list.map(o => o.order_sn);
  const details = await sdk.order.getOrdersDetail({
    order_sn_list: orderSns,
    response_optional_fields: ['total_amount', 'order_status'],
  });
  
  const stats = {
    total_orders: details.order_list.length,
    total_revenue: details.order_list.reduce((sum, o) => sum + o.total_amount, 0),
    by_status: {},
  };
  
  details.order_list.forEach(order => {
    stats.by_status[order.order_status] = 
      (stats.by_status[order.order_status] || 0) + 1;
  });
  
  return stats;
}
```

---

### setNote()

**API Documentation:** [v2.order.set_note](https://open.shopee.com/documents/v2/v2.order.set_note?module=94&type=1)

Set a note for an order.

```typescript
await sdk.order.setNote({
  order_sn: 'ORDER123',
  note: 'Customer requested express shipping',
});
```

**Parameters:**
- `order_sn`: Shopee's unique identifier for an order
- `note`: The note seller add for reference

---

### getPackageDetail()

**API Documentation:** [v2.order.get_package_detail](https://open.shopee.com/documents/v2/v2.order.get_package_detail?module=94&type=1)

Get detailed information about packages.

```typescript
const response = await sdk.order.getPackageDetail({
  package_number_list: ['PKG001', 'PKG002'],
});

response.package_list.forEach((pkg) => {
  console.log('Package:', pkg.package_number);
  console.log('Order:', pkg.order_sn);
  console.log('Status:', pkg.fulfillment_status);
  console.log('Carrier:', pkg.shipping_carrier);
  console.log('Ship by:', new Date(pkg.ship_by_date * 1000));
});
```

**Parameters:**
- `package_number_list`: Array of package numbers (max: 50)

---

### handleBuyerCancellation()

**API Documentation:** [v2.order.handle_buyer_cancellation](https://open.shopee.com/documents/v2/v2.order.handle_buyer_cancellation?module=94&type=1)

Accept or reject buyer's cancellation application.

```typescript
// Accept cancellation
await sdk.order.handleBuyerCancellation({
  order_sn: 'ORDER123',
  operation: 'ACCEPT',
});

// Reject cancellation
await sdk.order.handleBuyerCancellation({
  order_sn: 'ORDER456',
  operation: 'REJECT',
});
```

**Parameters:**
- `order_sn`: Shopee's unique identifier for an order
- `operation`: Either 'ACCEPT' or 'REJECT'

---

### searchPackageList()

**API Documentation:** [v2.order.search_package_list](https://open.shopee.com/documents/v2/v2.order.search_package_list?module=94&type=1)

Search for packages with various filters.

```typescript
const response = await sdk.order.searchPackageList({
  filter: {
    package_status: 2, // ToProcess
    product_location_ids: ['WAREHOUSE001'],
    logistics_channel_ids: [80001],
    fulfillment_type: 2, // Seller
    invoice_pending: false,
  },
  pagination: {
    page_size: 50,
    cursor: '',
  },
  sort: {
    sort_field: 'ship_by_date',
    sort_direction: 'ASC',
  },
});

console.log('Packages found:', response.package_list.length);
response.package_list.forEach((pkg) => {
  console.log(`${pkg.package_number}: ${pkg.fulfillment_status}`);
});
```

**Package Status:**
- `0`: All
- `1`: Pending
- `2`: ToProcess (default)
- `3`: Processed

**Fulfillment Type:**
- `0`: None (no filter)
- `1`: Shopee
- `2`: Seller (default)

---

### getPendingBuyerInvoiceOrderList()

**API Documentation:** [v2.order.get_pending_buyer_invoice_order_list](https://open.shopee.com/documents/v2/v2.order.get_pending_buyer_invoice_order_list?module=94&type=1)

Get list of orders pending invoice upload (PH and BR sellers only).

```typescript
const response = await sdk.order.getPendingBuyerInvoiceOrderList({
  page_size: 100,
  cursor: '',
});

console.log('Orders pending invoice:', response.order_sn_list);
```

**Parameters:**
- `page_size`: Number of entries per page (max: 100)
- `cursor`: Pagination cursor

---

### handlePrescriptionCheck()

**API Documentation:** [v2.order.handle_prescription_check](https://open.shopee.com/documents/v2/v2.order.handle_prescription_check?module=94&type=1)

Approve or reject a prescription for prescription orders (ID and PH only).

```typescript
// Approve prescription
await sdk.order.handlePrescriptionCheck({
  package_number: 'PKG001',
  operation: 'APPROVE',
});

// Reject prescription
await sdk.order.handlePrescriptionCheck({
  package_number: 'PKG002',
  operation: 'REJECT',
  reject_reason: 'Invalid prescription details',
});
```

**Parameters:**
- `package_number`: Shopee's unique identifier for the package
- `operation`: Either 'APPROVE' or 'REJECT'
- `reject_reason`: Required when operation is 'REJECT'

---

### downloadInvoiceDoc()

**API Documentation:** [v2.order.download_invoice_doc](https://open.shopee.com/documents/v2/v2.order.download_invoice_doc?module=94&type=1)

Download invoice document (PH and BR sellers only).

```typescript
const response = await sdk.order.downloadInvoiceDoc({
  order_sn: 'ORDER123',
});

console.log('Invoice URL:', response.url);
// Download the file from the URL
```

**Parameters:**
- `order_sn`: Shopee's unique identifier for an order

---

### uploadInvoiceDoc()

**API Documentation:** [v2.order.upload_invoice_doc](https://open.shopee.com/documents/v2/v2.order.upload_invoice_doc?module=94&type=1)

Upload invoice document (PH and BR sellers only).

```typescript
await sdk.order.uploadInvoiceDoc({
  order_sn: 'ORDER123',
  invoice_file: 'base64_encoded_file_content',
});
```

**Parameters:**
- `order_sn`: Shopee's unique identifier for an order
- `invoice_file`: Base64 encoded file content

---

### getBookingDetail()

**API Documentation:** [v2.order.get_booking_detail](https://open.shopee.com/documents/v2/v2.order.get_booking_detail?module=94&type=1)

Get detailed information about bookings.

```typescript
const response = await sdk.order.getBookingDetail({
  booking_sn_list: ['BOOK001', 'BOOK002'],
});

response.booking_list.forEach((booking) => {
  console.log('Booking:', booking.booking_sn);
  console.log('Order:', booking.order_sn);
  console.log('Status:', booking.booking_status);
  console.log('Packages:', booking.package_list);
});
```

**Parameters:**
- `booking_sn_list`: Array of booking SNs (max: 50)

---

### getBookingList()

**API Documentation:** [v2.order.get_booking_list](https://open.shopee.com/documents/v2/v2.order.get_booking_list?module=94&type=1)

Search for bookings within a time range.

```typescript
const response = await sdk.order.getBookingList({
  time_range_field: 'create_time',
  time_from: Math.floor(Date.now() / 1000) - 7 * 86400,
  time_to: Math.floor(Date.now() / 1000),
  page_size: 50,
  cursor: '',
  booking_status: 'READY_TO_SHIP',
});

response.booking_list.forEach((booking) => {
  console.log(`${booking.booking_sn}: ${booking.booking_status}`);
});
```

**Booking Status:**
- `READY_TO_SHIP`
- `PROCESSED`
- `SHIPPED`
- `CANCELLED`
- `MATCHED`

---

### getWarehouseFilterConfig()

**API Documentation:** [v2.order.get_warehouse_filter_config](https://open.shopee.com/documents/v2/v2.order.get_warehouse_filter_config?module=94&type=1)

Get warehouse filter configuration for multi-warehouse shops.

```typescript
const response = await sdk.order.getWarehouseFilterConfig();

response.warehouse_list.forEach((warehouse) => {
  console.log('Warehouse:', warehouse.product_location_id);
  console.log('Address ID:', warehouse.address_id);
});
```

---

### downloadFbsInvoices()

**API Documentation:** [v2.order.download_fbs_invoices](https://open.shopee.com/documents/v2/v2.order.download_fbs_invoices?module=94&type=1)

Download FBS (Fulfilled by Shopee) invoices.

**Note:** This API is part of a 3-step workflow:
1. `generateFbsInvoices()` - Create download task
2. `getFbsInvoicesResult()` - Check task status
3. `downloadFbsInvoices()` - Download when status is "READY"

```typescript
const response = await sdk.order.downloadFbsInvoices({
  request_id_list: {
    request_id: [123, 456],
  },
});

response.result_list.forEach((result) => {
  console.log('Request ID:', result.request_id);
  console.log('Download URL:', result.url);
});
```

**Important:** Download link expires 30 minutes after being generated.

---

### generateFbsInvoices()

**API Documentation:** [v2.order.generate_fbs_invoices](https://open.shopee.com/documents/v2/v2.order.generate_fbs_invoices?module=94&type=1)

Generate FBS tax documents for download.

```typescript
const response = await sdk.order.generateFbsInvoices({
  batch_download: {
    start: 20240101,
    end: 20240131,
    document_type: 1, // Remessa
    file_type: 3, // Both PDF and XML
    document_status: 1, // Authorized only
  },
});

console.log('Request ID:', response.request_id);
// Use this request_id with getFbsInvoicesResult() to check status
```

**Document Types:**
- `1`: Remessa
- `2`: Return
- `3`: Symbolic Return
- `4`: Sale
- `5`: Entrada
- `6`: Symbolic Remessa
- `7`: All

**File Types:**
- `1`: XML only
- `2`: PDF only
- `3`: Both

**Document Status:**
- `1`: Authorized only
- `2`: Cancelled
- Not specified: All statuses

---

### getFbsInvoicesResult()

**API Documentation:** [v2.order.get_fbs_invoices_result](https://open.shopee.com/documents/v2/v2.order.get_fbs_invoices_result?module=94&type=1)

Check the status of FBS invoice generation tasks.

```typescript
const response = await sdk.order.getFbsInvoicesResult({
  request_id_list: {
    request_id: [123, 456],
  },
});

response.result_list.forEach((result) => {
  console.log('Request ID:', result.request_id);
  console.log('Status:', result.status);
  if (result.status === 'ERROR') {
    console.log('Error:', result.error_message);
  }
});

// When status is "READY", use downloadFbsInvoices()
```

**Status Values:**
- `PROCESSING`: Task is being processed
- `READY`: Documents are ready for download
- `ERROR`: Task failed

---

## Complete FBS Invoice Workflow Example

```typescript
// Step 1: Generate the invoices
const generateResponse = await sdk.order.generateFbsInvoices({
  batch_download: {
    start: 20240101,
    end: 20240131,
    document_type: 4, // Sale invoices
    file_type: 3, // Both PDF and XML
  },
});

const requestId = generateResponse.request_id;

// Step 2: Poll for completion
let isReady = false;
while (!isReady) {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  
  const statusResponse = await sdk.order.getFbsInvoicesResult({
    request_id_list: {
      request_id: [requestId],
    },
  });
  
  const status = statusResponse.result_list[0].status;
  
  if (status === 'READY') {
    isReady = true;
  } else if (status === 'ERROR') {
    throw new Error(statusResponse.result_list[0].error_message);
  }
}

// Step 3: Download the invoices
const downloadResponse = await sdk.order.downloadFbsInvoices({
  request_id_list: {
    request_id: [requestId],
  },
});

console.log('Download URL:', downloadResponse.result_list[0].url);
// Remember: URL expires in 30 minutes
```

## Related

- [LogisticsManager](./logistics.md) - Shipping and tracking
- [PaymentManager](./payment.md) - Payment information
- [ProductManager](./product.md) - Product information
- [Authentication Guide](../guides/authentication.md) - API authentication
