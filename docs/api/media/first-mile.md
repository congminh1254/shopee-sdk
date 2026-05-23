# FirstMileManager

The FirstMileManager handles first-mile logistics operations for cross-border shipping.

## Overview

The FirstMileManager provides methods for:
- Generating and managing first-mile tracking numbers
- Binding orders to first-mile shipments
- Managing courier delivery services
- Retrieving waybill documents
- Tracking first-mile shipment status

## Quick Start

```typescript
// Get available first mile channels
const channels = await sdk.firstMile.getChannelList({ region: 'CN' });

// Generate tracking number
const trackingNumbers = await sdk.firstMile.generateFirstMileTrackingNumber({
  declare_date: '2024-01-15',
  quantity: 5,
});

// Bind orders to tracking number
await sdk.firstMile.bindFirstMileTrackingNumber({
  first_mile_tracking_number: 'CNF731738838434210105',
  shipment_method: 'pickup',
  region: 'CN',
  logistics_channel_id: 813,
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
});

// Get shipment details
const detail = await sdk.firstMile.getDetail({
  first_mile_tracking_number: 'CNF731738838434210105',
});

// Get waybill for printing
const waybill = await sdk.firstMile.getWaybill({
  first_mile_tracking_number_list: ['CNF731738838434210105'],
});
```

## Methods

### getChannelList()

**API Documentation:** [v2.first_mile.get_channel_list](https://open.shopee.com/documents/v2/v2.first_mile.get_channel_list?module=96&type=1)

Get a list of available first-mile logistics channels.

```typescript
const response = await sdk.firstMile.getChannelList({ region: 'CN' });

console.log('Available channels:');
response.response?.logistics_channel_list?.forEach((channel) => {
  console.log(`ID: ${channel.logistics_channel_id}`);
  console.log(`Name: ${channel.logistics_channel_name}`);
  console.log(`Method: ${channel.shipment_method}`);
});
```

**Parameters:**
- `region` (optional): Filter by region (CN, KR)

**Shipment Methods:**
- `pickup`: Courier picks up from seller
- `dropoff`: Seller drops off at logistics point
- `self_deliver`: Seller delivers to warehouse

---

### generateFirstMileTrackingNumber()

**API Documentation:** [v2.first_mile.generate_first_mile_tracking_number](https://open.shopee.com/documents/v2/v2.first_mile.generate_first_mile_tracking_number?module=96&type=1)

Generate first-mile tracking numbers for a specific date.

```typescript
const response = await sdk.firstMile.generateFirstMileTrackingNumber({
  declare_date: '2024-01-15',
  quantity: 5, // Generate 5 tracking numbers
});

console.log('Generated tracking numbers:');
response.response?.first_mile_tracking_number_list?.forEach((tn) => {
  console.log(tn);
});
```

**Parameters:**
- `declare_date`: Date for shipment (YYYY-MM-DD format)
- `quantity` (optional): Number of tracking numbers to generate (max 20 per day)

**Important Notes:**
- Maximum 20 tracking numbers can be generated per declaration day
- Tracking numbers must be used for the declared date
- Use for `pickup` or `self_deliver` shipment methods

---

### bindFirstMileTrackingNumber()

**API Documentation:** [v2.first_mile.bind_first_mile_tracking_number](https://open.shopee.com/documents/v2/v2.first_mile.bind_first_mile_tracking_number?module=96&type=1)

Bind orders to a first-mile tracking number.

```typescript
const response = await sdk.firstMile.bindFirstMileTrackingNumber({
  first_mile_tracking_number: 'CNF731738838434210105',
  shipment_method: 'pickup',
  region: 'CN',
  logistics_channel_id: 813,
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
  // Optional parcel dimensions
  weight: 1.5,
  volume: 0.001,
  length: 20,
  width: 15,
  height: 10,
});

if (response.response?.fail_list && response.response.fail_list.length > 0) {
  console.log('Some orders failed to bind:');
  response.response.fail_list.forEach((fail) => {
    console.log(`Order ${fail.order_sn}: ${fail.failed_reason}`);
  });
}
```

**Parameters:**
- `first_mile_tracking_number`: Tracking number from `generateFirstMileTrackingNumber()` or logistics provider
- `shipment_method`: `pickup`, `dropoff`, or `self_deliver`
- `region`: CN or KR
- `logistics_channel_id`: From `getChannelList()` (null for `self_deliver`)
- `order_list`: Array of orders (max 50 orders, max 10,000 total per tracking number)
- Parcel dimensions (optional): `weight`, `volume`, `length`, `width`, `height`

---

### getDetail()

**API Documentation:** [v2.first_mile.get_detail](https://open.shopee.com/documents/v2/v2.first_mile.get_detail?module=96&type=1)

Get detailed information about a first-mile shipment.

```typescript
const response = await sdk.firstMile.getDetail({
  first_mile_tracking_number: 'CNF731738838434210105',
});

console.log('Shipment status:', response.response?.status);
console.log('Declare date:', response.response?.declare_date);
console.log('Orders in shipment:');
response.response?.order_list?.forEach((order) => {
  console.log(`- ${order.order_sn}`);
  console.log(`  Picked up: ${order.pick_up_done}`);
  console.log(`  At warehouse: ${order.arrived_transit_warehouse}`);
});

// Handle pagination if needed
if (response.response?.more) {
  const nextPage = await sdk.firstMile.getDetail({
    first_mile_tracking_number: 'CNF731738838434210105',
    cursor: response.response.next_cursor,
  });
}
```

**Shipment Status Values:**
- `NOT_AVAILABLE`: Tracking number not bound or doesn't exist
- `ORDER_CREATED`: Orders are bound
- `PICKED_UP`: Parcel picked up by courier
- `DELIVERED`: Delivered to transit warehouse
- `ORDER_RECEIVED`: Received at destination
- `CANCELING`: Cancellation in progress
- `CANCELED`: Shipment canceled

---

### unbindFirstMileTrackingNumber()

**API Documentation:** [v2.first_mile.unbind_first_mile_tracking_number](https://open.shopee.com/documents/v2/v2.first_mile.unbind_first_mile_tracking_number?module=96&type=1)

Unbind specific orders from a tracking number.

```typescript
const response = await sdk.firstMile.unbindFirstMileTrackingNumber({
  first_mile_tracking_number: 'CNF731738838434210105',
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
});

console.log('Unbind successful for', response.response?.success_count, 'orders');
```

---

### getTrackingNumberList()

**API Documentation:** [v2.first_mile.get_tracking_number_list](https://open.shopee.com/documents/v2/v2.first_mile.get_tracking_number_list?module=96&type=1)

Get list of tracking numbers within a date range.

```typescript
const response = await sdk.firstMile.getTrackingNumberList({
  from_date: '2024-01-01',
  to_date: '2024-01-31',
  page_size: 20,
});

response.response?.first_mile_tracking_number_list?.forEach((item) => {
  console.log(`TN: ${item.first_mile_tracking_number}`);
  console.log(`Date: ${item.declare_date}`);
});

// Handle pagination
if (response.response?.more) {
  const nextPage = await sdk.firstMile.getTrackingNumberList({
    from_date: '2024-01-01',
    to_date: '2024-01-31',
    page_size: 20,
    offset: response.response.next_offset,
  });
}
```

---

### getUnbindOrderList()

**API Documentation:** [v2.first_mile.get_unbind_order_list](https://open.shopee.com/documents/v2/v2.first_mile.get_unbind_order_list?module=96&type=1)

Get list of orders that are not yet bound to any first-mile shipment.

```typescript
const response = await sdk.firstMile.getUnbindOrderList({
  page_size: 50,
  response_optional_fields: 'item_list',
});

console.log('Unbound orders:');
response.response?.order_list?.forEach((order) => {
  console.log(`Order: ${order.order_sn}`);
  console.log(`Package: ${order.package_number}`);
});
```

---

### getWaybill()

**API Documentation:** [v2.first_mile.get_waybill](https://open.shopee.com/documents/v2/v2.first_mile.get_waybill?module=96&type=1)

Get waybill documents for printing shipping labels.

```typescript
const response = await sdk.firstMile.getWaybill({
  first_mile_tracking_number_list: [
    'CNF731738838434210105',
    'CNF731738838434210106',
  ],
});

response.response?.waybill_list?.forEach((item) => {
  console.log(`TN: ${item.first_mile_tracking_number}`);
  
  // Waybill is base64 encoded PDF
  const pdfBuffer = Buffer.from(item.waybill, 'base64');
  fs.writeFileSync(`waybill_${item.first_mile_tracking_number}.pdf`, pdfBuffer);
});
```

**Important Notes:**
- Waybill content is base64-encoded PDF
- Maximum 50 tracking numbers per request
- Only available after orders are bound

---

## Courier Delivery Methods

For regions that support courier delivery (e.g., China), additional methods are available:

### getCourierDeliveryChannelList()

**API Documentation:** [v2.first_mile.get_courier_delivery_channel_list](https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_channel_list?module=96&type=1)

Get available courier services for courier delivery method.

```typescript
const response = await sdk.firstMile.getCourierDeliveryChannelList({
  region: 'CN',
});

response.response?.courier_service_list?.forEach((service) => {
  console.log(`Service ID: ${service.courier_service_id}`);
  console.log(`Name: ${service.courier_service_name}`);
});
```

---

### getTransitWarehouseList()

**API Documentation:** [v2.first_mile.get_transit_warehouse_list](https://open.shopee.com/documents/v2/v2.first_mile.get_transit_warehouse_list?module=96&type=1)

Get list of transit warehouses for cross-border shipping.

```typescript
const response = await sdk.firstMile.getTransitWarehouseList({ region: 'CN' });

response.response?.warehouse_list?.forEach((warehouse) => {
  console.log(`Warehouse ID: ${warehouse.warehouse_id}`);
  console.log(`Name: ${warehouse.warehouse_name}`);
  console.log(`Address: ${warehouse.warehouse_address}`);
});
```

---

### generateAndBindFirstMileTrackingNumber()

**API Documentation:** [v2.first_mile.generate_and_bind_first_mile_tracking_number](https://open.shopee.com/documents/v2/v2.first_mile.generate_and_bind_first_mile_tracking_number?module=96&type=1)

Generate tracking number and bind orders in one operation (courier delivery only).

```typescript
const response = await sdk.firstMile.generateAndBindFirstMileTrackingNumber({
  shipment_method: 'courier_delivery',
  region: 'CN',
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
  courier_delivery_info: {
    address_id: 12345, // From v2.logistics.get_address_list
    warehouse_id: 'WH001', // From getTransitWarehouseList
    logistics_product_id: 1010003, // 1010003 or 1010004
    courier_service_id: '1', // From getCourierDeliveryChannelList
    prepaid_account_id: 67890, // Required for logistics_product_id 1010004
  },
});

console.log('Binding ID:', response.response?.binding_id);
```

**Logistics Product IDs:**
- `1010003`: Seller books courier and pays offline
- `1010004`: Seller uses prepaid account (requires `prepaid_account_id`)

---

### bindCourierDeliveryFirstMileTrackingNumber()

**API Documentation:** [v2.first_mile.bind_courier_delivery_first_mile_tracking_number](https://open.shopee.com/documents/v2/v2.first_mile.bind_courier_delivery_first_mile_tracking_number?module=96&type=1)

Bind additional orders to existing courier delivery shipment.

```typescript
await sdk.firstMile.bindCourierDeliveryFirstMileTrackingNumber({
  shipment_method: 'courier_delivery',
  binding_id: 'BINDING123456',
  order_list: [
    {
      order_sn: '20012328KKGVR1',
      package_number: '25333320394471234568',
    },
  ],
});
```

---

### getCourierDeliveryDetail()

**API Documentation:** [v2.first_mile.get_courier_delivery_detail](https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_detail?module=96&type=1)

Get details of a courier delivery shipment.

```typescript
const response = await sdk.firstMile.getCourierDeliveryDetail({
  binding_id: 'BINDING123456',
});

console.log('Status:', response.response?.status);
console.log('Courier tracking:', response.response?.courier_tracking_number);
```

---

### getCourierDeliveryTrackingNumberList()

**API Documentation:** [v2.first_mile.get_courier_delivery_tracking_number_list](https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_tracking_number_list?module=96&type=1)

Get list of courier delivery shipments.

```typescript
const response = await sdk.firstMile.getCourierDeliveryTrackingNumberList({
  from_date: '2024-01-01',
  to_date: '2024-01-31',
  page_size: 20,
});

response.response?.binding_info_list?.forEach((item) => {
  console.log(`Binding ID: ${item.binding_id}`);
  console.log(`Date: ${item.declare_date}`);
});
```

---

### getCourierDeliveryWaybill()

**API Documentation:** [v2.first_mile.get_courier_delivery_waybill](https://open.shopee.com/documents/v2/v2.first_mile.get_courier_delivery_waybill?module=96&type=1)

Get waybill for courier delivery shipments.

```typescript
const response = await sdk.firstMile.getCourierDeliveryWaybill({
  binding_id_list: ['BINDING123456'],
});

response.response?.waybill_list?.forEach((item) => {
  const pdfBuffer = Buffer.from(item.waybill, 'base64');
  fs.writeFileSync(`courier_waybill_${item.binding_id}.pdf`, pdfBuffer);
});
```

---

### unbindFirstMileTrackingNumberAll()

**API Documentation:** [v2.first_mile.unbind_first_mile_tracking_number_all](https://open.shopee.com/documents/v2/v2.first_mile.unbind_first_mile_tracking_number_all?module=96&type=1)

Unbind orders from any tracking number or binding.

```typescript
await sdk.firstMile.unbindFirstMileTrackingNumberAll({
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
});
```

---

## Common Operations

### Complete First-Mile Workflow (Pickup/Dropoff)

```typescript
// 1. Get available channels
const channels = await sdk.firstMile.getChannelList({ region: 'CN' });
const pickupChannel = channels.response?.logistics_channel_list?.find(
  (ch) => ch.shipment_method === 'pickup'
);

// 2. Get unbound orders
const unboundOrders = await sdk.firstMile.getUnbindOrderList({
  page_size: 50,
});

// 3. Generate tracking numbers
const trackingNumbers = await sdk.firstMile.generateFirstMileTrackingNumber({
  declare_date: '2024-01-15',
  quantity: 1,
});

const trackingNumber = trackingNumbers.response?.first_mile_tracking_number_list?.[0];

// 4. Bind orders
await sdk.firstMile.bindFirstMileTrackingNumber({
  first_mile_tracking_number: trackingNumber!,
  shipment_method: 'pickup',
  region: 'CN',
  logistics_channel_id: pickupChannel!.logistics_channel_id,
  order_list: unboundOrders.response?.order_list?.slice(0, 10) || [],
});

// 5. Get waybill
const waybill = await sdk.firstMile.getWaybill({
  first_mile_tracking_number_list: [trackingNumber!],
});

// 6. Track shipment
const detail = await sdk.firstMile.getDetail({
  first_mile_tracking_number: trackingNumber!,
});

console.log('Shipment created and ready for pickup!');
console.log('Status:', detail.response?.status);
```

---

### Complete Courier Delivery Workflow

```typescript
// 1. Get courier services and warehouses
const [couriers, warehouses] = await Promise.all([
  sdk.firstMile.getCourierDeliveryChannelList({ region: 'CN' }),
  sdk.firstMile.getTransitWarehouseList({ region: 'CN' }),
]);

// 2. Get pickup address (from logistics API)
const addresses = await sdk.logistics.getAddressList();
const pickupAddress = addresses.response?.address_list?.find(
  (addr) => addr.address_type === 'FIRST_MILE_PICKUP_ADDRESS'
);

// 3. Generate and bind in one step
const result = await sdk.firstMile.generateAndBindFirstMileTrackingNumber({
  shipment_method: 'courier_delivery',
  region: 'CN',
  order_list: [
    {
      order_sn: '20012328KKGVR0',
      package_number: '25333320394471234567',
    },
  ],
  courier_delivery_info: {
    address_id: pickupAddress!.address_id,
    warehouse_id: warehouses.response?.warehouse_list?.[0]?.warehouse_id!,
    logistics_product_id: 1010003,
    courier_service_id: couriers.response?.courier_service_list?.[0]?.courier_service_id!,
  },
});

// 4. Get waybill
const waybill = await sdk.firstMile.getCourierDeliveryWaybill({
  binding_id_list: [result.response!.binding_id!],
});

console.log('Courier booking created!');
console.log('Binding ID:', result.response?.binding_id);
```

---

## Best Practices

### 1. Batch Operations

```typescript
// Process orders in batches of 50
async function bindOrdersInBatches(
  trackingNumber: string,
  orders: Array<{ order_sn: string; package_number?: string }>
) {
  const BATCH_SIZE = 50;
  
  for (let i = 0; i < orders.length; i += BATCH_SIZE) {
    const batch = orders.slice(i, i + BATCH_SIZE);
    
    await sdk.firstMile.bindFirstMileTrackingNumber({
      first_mile_tracking_number: trackingNumber,
      shipment_method: 'pickup',
      region: 'CN',
      logistics_channel_id: 813,
      order_list: batch,
    });
    
    console.log(`Bound ${Math.min(i + BATCH_SIZE, orders.length)} of ${orders.length} orders`);
  }
}
```

---

### 2. Error Handling

```typescript
async function bindWithRetry(params: any) {
  try {
    const result = await sdk.firstMile.bindFirstMileTrackingNumber(params);
    
    if (result.response?.fail_list && result.response.fail_list.length > 0) {
      console.warn('Some orders failed to bind:');
      result.response.fail_list.forEach((fail) => {
        console.warn(`- ${fail.order_sn}: ${fail.failed_reason}`);
      });
      
      // Retry failed orders with different tracking number
      const failedOrders = result.response.fail_list.map((f) => ({
        order_sn: f.order_sn,
        package_number: f.package_number,
      }));
      
      // Handle retry logic here
    }
    
    return result;
  } catch (error) {
    console.error('Failed to bind:', error);
    throw error;
  }
}
```

---

### 3. Status Monitoring

```typescript
async function monitorShipment(trackingNumber: string) {
  const detail = await sdk.firstMile.getDetail({
    first_mile_tracking_number: trackingNumber,
  });
  
  const status = detail.response?.status;
  
  switch (status) {
    case 'ORDER_CREATED':
      console.log('⏳ Waiting for pickup');
      break;
    case 'PICKED_UP':
      console.log('📦 Parcel picked up');
      break;
    case 'DELIVERED':
      console.log('🏭 At transit warehouse');
      break;
    case 'ORDER_RECEIVED':
      console.log('✅ Received at destination');
      break;
    case 'CANCELED':
      console.log('❌ Shipment canceled');
      break;
  }
  
  return status;
}
```

---

### 4. Waybill Management

```typescript
async function downloadWaybills(trackingNumbers: string[]) {
  // Split into batches of 50
  const BATCH_SIZE = 50;
  const allWaybills = [];
  
  for (let i = 0; i < trackingNumbers.length; i += BATCH_SIZE) {
    const batch = trackingNumbers.slice(i, i + BATCH_SIZE);
    
    const response = await sdk.firstMile.getWaybill({
      first_mile_tracking_number_list: batch,
    });
    
    if (response.response?.waybill_list) {
      allWaybills.push(...response.response.waybill_list);
    }
  }
  
  // Save to files
  allWaybills.forEach((item) => {
    const pdfBuffer = Buffer.from(item.waybill, 'base64');
    fs.writeFileSync(
      `waybill_${item.first_mile_tracking_number}.pdf`,
      pdfBuffer
    );
  });
  
  console.log(`Downloaded ${allWaybills.length} waybills`);
}
```

---

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `firstmile.auth` | No permission for first mile | Contact Shopee to enable first mile |
| `firstmile.area_not_support` | Region not supported | Check supported regions (CN, KR) |
| `firstmile.shipment_pre_declare_permission` | No pre-declare permission | Apply for permission with Shopee |
| `error_param` | Invalid parameters | Check all required fields |
| `error_not_found` | Tracking number not found | Verify tracking number exists |

---

## Related

- [LogisticsManager](./logistics.md) - Manage shipping and tracking
- [OrderManager](./order.md) - Manage orders
- [Authentication Guide](../guides/authentication.md) - API authentication

