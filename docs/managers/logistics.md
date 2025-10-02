# LogisticsManager

The LogisticsManager handles shipping and logistics operations including getting shipping information, tracking shipments, and managing shipping labels.

## Overview

The LogisticsManager provides methods for:
- Getting available shipping channels
- Retrieving shipping parameters
- Managing shipping addresses and info

## Quick Start

```typescript
// Get available shipping channels
const channels = await sdk.logistics.getChannelList();

// Get shipping parameter info (also known as getParameterForInit)
const params = await sdk.logistics.getShippingParameter({
  order_sn: 'ORDER123',
});

// Get list of shop addresses
const addresses = await sdk.logistics.getAddressList();

// Ship the order (arrange pickup/dropoff)
await sdk.logistics.shipOrder({
  order_sn: 'ORDER123',
  pickup: {
    address_id: addresses.address_list[0].address_id,
    pickup_time_id: params.pickup?.address_list?.[0]?.time_slot_list?.[0]?.pickup_time_id,
  },
});

// Get tracking number
const tracking = await sdk.logistics.getTrackingNumber({
  order_sn: 'ORDER123',
});

// Get detailed tracking info with event history
const trackingInfo = await sdk.logistics.getTrackingInfo({
  order_sn: 'ORDER123',
  package_number: 'PKG456',
});
```

## Methods

### getChannelList()

**API Documentation:** [v2.logistics.get_channel_list](https://open.shopee.com/documents/v2/v2.logistics.get_channel_list?module=95&type=1)

Get list of available logistics channels for a shop.

```typescript
const response = await sdk.logistics.getChannelList();

response.logistics_channel_list.forEach((channel) => {
  console.log('Channel:', channel.logistics_channel_name);
  console.log('ID:', channel.logistics_channel_id);
  console.log('Enabled:', channel.enabled);
  console.log('COD enabled:', channel.cod_enabled);
  console.log('Mask channel ID:', channel.mask_channel_id);
});
```

**Use Cases:**
- Display available shipping options to internal users
- Validate shipping method selections
- Check COD availability for different channels

---

### getShippingParameter()

**API Documentation:** [v2.logistics.get_shipping_parameter](https://open.shopee.com/documents/v2/v2.logistics.get_shipping_parameter?module=95&type=1)

Get required parameters for initializing logistics for an order. This method is also referred to as `getParameterForInit` in some documentation.

```typescript
const response = await sdk.logistics.getShippingParameter({
  order_sn: 'ORDER123',
});

console.log('Pickup address:', response.info_needed?.pickup);
console.log('Dropoff address:', response.info_needed?.dropoff);
console.log('Pickup time slots:', response.pickup?.address_list?.[0]?.time_slot_list);
console.log('Addresses:', response.pickup?.address_list);
```

**Use Cases:**
- Get pickup/dropoff requirements before shipping
- Validate address information
- Check available time slots for pickup

---

### getTrackingNumber()

**API Documentation:** [v2.logistics.get_tracking_number](https://open.shopee.com/documents/v2/v2.logistics.get_tracking_number?module=95&type=1)

Get tracking information for a shipped order.

```typescript
const response = await sdk.logistics.getTrackingNumber({
  order_sn: 'ORDER123',
});

console.log('Tracking number:', response.tracking_number);
console.log('Plp number:', response.plp_number); // Pre-printed label
```

**Use Cases:**
- Provide tracking information to customers
- Update internal order tracking systems
- Verify shipment details

---

### getTrackingInfo()

**API Documentation:** [v2.logistics.get_tracking_info](https://open.shopee.com/documents/v2/v2.logistics.get_tracking_info?module=95&type=1)

Get detailed logistics tracking information with event history for an order.

```typescript
const response = await sdk.logistics.getTrackingInfo({
  order_sn: 'ORDER123',
  package_number: 'PKG456', // optional
});

console.log('Order:', response.order_sn);
console.log('Current status:', response.logistics_status);
response.tracking_info.forEach((event) => {
  console.log('Event:', event.description);
  console.log('Time:', new Date(event.update_time * 1000).toISOString());
  console.log('Status:', event.logistics_status);
});
```

**Use Cases:**
- Track detailed shipment progress
- Display tracking history to customers
- Monitor delivery status updates
- Identify potential delivery issues

**Note:** This API returns an array of tracking events with timestamps, descriptions, and status codes, providing a complete timeline of the shipment's journey.

---

### shipOrder()

**API Documentation:** [v2.logistics.ship_order](https://open.shopee.com/documents/v2/v2.logistics.ship_order?module=95&type=1)

Initiate logistics for an order including arranging pickup, dropoff, or shipment. This is the core API to arrange shipment after getting shipping parameters.

```typescript
// For pickup mode
await sdk.logistics.shipOrder({
  order_sn: 'ORDER123',
  pickup: {
    address_id: 234,
    pickup_time_id: 'slot_123',
  },
});

// For dropoff mode
await sdk.logistics.shipOrder({
  order_sn: 'ORDER456',
  dropoff: {
    branch_id: 101,
    sender_real_name: 'John Doe',
  },
});

// For non-integrated channel
await sdk.logistics.shipOrder({
  order_sn: 'ORDER789',
  non_integrated: {
    tracking_number: 'TRACK123',
  },
});
```

**Use Cases:**
- Arrange shipment pickup at seller's address
- Schedule dropoff at logistics partner branch
- Register tracking number for non-integrated channels
- Complete the shipping initialization workflow

**Important:** Must call `getShippingParameter()` first to determine which fields are required (pickup, dropoff, or non_integrated).

---

### getAddressList()

**API Documentation:** [v2.logistics.get_address_list](https://open.shopee.com/documents/v2/v2.logistics.get_address_list?module=95&type=1)

Get the list of addresses configured for the shop.

```typescript
const response = await sdk.logistics.getAddressList();

response.address_list.forEach((addr) => {
  console.log('Address ID:', addr.address_id);
  console.log('Full Address:', addr.full_address);
  console.log('Type:', addr.address_flag); // e.g., ['pickup_address', 'return_address']
  console.log('Status:', addr.address_status);
});
```

**Use Cases:**
- Display available pickup addresses to user
- Validate address information before shipping
- Manage shop addresses for logistics operations
- Get address_id for use in shipOrder() pickup parameter

## Integration Example

### Complete Shipping Workflow

```typescript
async function shipOrder(orderSn: string) {
  try {
    // Step 1: Get order details
    const orderDetails = await sdk.order.getOrdersDetail({
      order_sn_list: [orderSn],
      response_optional_fields: ['recipient_address', 'item_list'],
    });
    
    const order = orderDetails.order_list[0];
    
    // Step 2: Get available shipping channels
    const channels = await sdk.logistics.getChannelList();
    const availableChannel = channels.logistics_channel_list.find(
      ch => ch.enabled && !ch.cod_enabled // Filter as needed
    );
    
    if (!availableChannel) {
      throw new Error('No available shipping channel');
    }
    
    // Step 3: Get shipping parameters
    const params = await sdk.logistics.getShippingParameter({
      order_sn: orderSn,
    });
    
    console.log('Shipping parameters:', params);
    
    // Step 4: Get shop addresses
    const addresses = await sdk.logistics.getAddressList();
    const pickupAddress = addresses.address_list.find(
      addr => addr.address_flag?.includes('pickup_address')
    );
    
    if (!pickupAddress) {
      throw new Error('No pickup address configured');
    }
    
    // Step 5: Select pickup time slot
    const timeSlot = params.pickup?.address_list
      ?.find(addr => addr.address_id === pickupAddress.address_id)
      ?.time_slot_list?.find(slot => slot.flags?.includes('recommended'));
    
    // Step 6: Ship the order (arrange pickup)
    await sdk.logistics.shipOrder({
      order_sn: orderSn,
      pickup: {
        address_id: pickupAddress.address_id,
        pickup_time_id: timeSlot?.pickup_time_id || params.pickup?.address_list?.[0]?.time_slot_list?.[0]?.pickup_time_id,
      },
    });
    
    // Step 7: Get tracking number
    const tracking = await sdk.logistics.getTrackingNumber({
      order_sn: orderSn,
    });
    
    console.log('✅ Order shipped successfully');
    console.log('Tracking number:', tracking.tracking_number);
    
    return tracking;
  } catch (error) {
    console.error('❌ Failed to ship order:', error);
    throw error;
  }
}
```

### Bulk Tracking Update

```typescript
async function updateTrackingInfo(orderSns: string[]) {
  const trackingInfo = [];
  
  for (const orderSn of orderSns) {
    try {
      const tracking = await sdk.logistics.getTrackingNumber({
        order_sn: orderSn,
      });
      
      trackingInfo.push({
        order_sn: orderSn,
        tracking_number: tracking.tracking_number,
        plp_number: tracking.plp_number,
      });
    } catch (error) {
      console.warn(`Failed to get tracking for ${orderSn}:`, error);
    }
  }
  
  return trackingInfo;
}
```

## Best Practices

### 1. Cache Channel List

```typescript
class LogisticsService {
  private channelCache: any = null;
  private cacheExpiry: number = 0;
  
  async getChannels() {
    const now = Date.now();
    
    // Cache for 1 hour
    if (this.channelCache && now < this.cacheExpiry) {
      return this.channelCache;
    }
    
    this.channelCache = await sdk.logistics.getChannelList();
    this.cacheExpiry = now + 3600000; // 1 hour
    
    return this.channelCache;
  }
}
```

### 2. Handle Shipping Errors Gracefully

```typescript
async function safeShipOrder(orderSn: string) {
  try {
    return await shipOrder(orderSn);
  } catch (error) {
    if (error.error === 'error_order_status') {
      console.error('Order not ready for shipping');
    } else if (error.error === 'error_logistics_channel') {
      console.error('Invalid logistics channel');
    } else {
      console.error('Shipping failed:', error);
    }
    return null;
  }
}
```

### 3. Validate Shipping Requirements

```typescript
async function validateShippingRequirements(orderSn: string): Promise<boolean> {
  const params = await sdk.logistics.getShippingParameter({
    order_sn: orderSn,
  });
  
  // Check if pickup address is required
  if (params.info_needed?.pickup && !params.pickup?.address_list?.length) {
    console.error('Pickup address required but not provided');
    return false;
  }
  
  // Check if time slot selection is needed
  if (params.pickup?.address_list?.[0]?.time_slot_list?.length) {
    console.error('Pickup time slot selection required');
    return false;
  }
  
  return true;
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_order_not_found` | Order doesn't exist | Verify order_sn is correct |
| `error_order_status` | Order not ready for shipping | Check order status is READY_TO_SHIP |
| `error_logistics_channel` | Invalid logistics channel | Use getChannelList to get valid channels |
| `error_param` | Missing required parameters | Check all required fields are provided |

## Related

- [OrderManager](./order.md) - Order management
- [PaymentManager](./payment.md) - Payment information
- [Authentication Guide](../guides/authentication.md) - API authentication
