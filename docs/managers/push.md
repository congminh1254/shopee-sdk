# PushManager

The PushManager handles webhook and push notification configuration for receiving real-time updates from Shopee.

## Overview

The PushManager provides methods for:
- Configuring webhook URLs for push notifications
- Retrieving current push configuration
- Getting lost/missed push messages
- Confirming message consumption

## Quick Start

```typescript
// Set webhook callback URL and enable push notifications
await sdk.push.setAppPushConfig({
  callback_url: 'https://your-app.com/webhooks/shopee',
  set_push_config_on: [3, 4, 6, 7], // Enable order status, tracking, banned item, item promotion
  set_push_config_off: [5, 8], // Disable shopee updates and reserved stock change
});

// Get current configuration
const config = await sdk.push.getAppPushConfig();
console.log('Callback URL:', config.response.callback_url);
console.log('Enabled configs:', config.response.push_config_on_list);
console.log('Push status:', config.response.live_push_status);

// Get lost messages
const lostMessages = await sdk.push.getLostPushMessage();
if (lostMessages.response.push_message_list.length > 0) {
  console.log('Found', lostMessages.response.push_message_list.length, 'lost messages');
  
  // Process messages...
  
  // Confirm messages have been consumed
  await sdk.push.confirmConsumedLostPushMessage({
    last_message_id: lostMessages.response.last_message_id,
  });
}
```

## Methods

### setAppPushConfig()

**API Documentation:** [v2.push.set_app_push_config](https://open.shopee.com/documents/v2/v2.push.set_app_push_config?module=105&type=1)

Configure the webhook callback URL and enable/disable push notification types.

```typescript
await sdk.push.setAppPushConfig({
  callback_url: 'https://your-app.com/webhooks/shopee',
  set_push_config_on: [1, 2, 3, 4, 5, 8, 9, 10],
  set_push_config_off: [6, 7, 11, 12, 13],
  blocked_shop_id_list: [10010, 20020, 30030],
});

console.log('Webhook configuration updated');
```

**Push Config Types:**
- `1`: Shop authorization for partners
- `2`: Shop deauthorization for partners
- `3`: Order status update push
- `4`: TrackingNo push
- `5`: Shopee Updates
- `6`: Banned item push
- `7`: Item promotion push
- `8`: Reserved stock change push
- `9`: Promotion update push
- `10`: Webchat push
- `11`: Video upload push
- `12`: OpenAPI authorization expiry push
- `13`: Brand register result

**Parameters:**
- `callback_url` (optional): The callback URL where Shopee will send push messages (HTTPS required)
- `set_push_config_on` (optional): Array of push config types to enable
- `set_push_config_off` (optional): Array of push config types to disable
- `blocked_shop_id_list` (optional): Array of shop IDs to block (max 500 shop IDs)

**Important:** 
- The callback URL must use HTTPS
- Your endpoint must respond quickly (< 5 seconds recommended)
- Return 200 OK to acknowledge receipt
- If you haven't set a callback_url before, it's required on first configuration

---

### getAppPushConfig()

**API Documentation:** [v2.push.get_app_push_config](https://open.shopee.com/documents/v2/v2.push.get_app_push_config?module=105&type=1)

Retrieve current webhook configuration.

```typescript
const response = await sdk.push.getAppPushConfig();

console.log('Callback URL:', response.response.callback_url);
console.log('Live Push Status:', response.response.live_push_status);
console.log('Push Config ON:', response.response.push_config_on_list);
console.log('Push Config OFF:', response.response.push_config_off_list);
console.log('Blocked Shops:', response.response.blocked_shop_id);

if (response.response.live_push_status === 'Suspended') {
  console.log('Suspended at:', new Date(response.response.suspended_time! * 1000));
}
```

**Response Fields:**
- `callback_url`: The configured callback URL for push notifications
- `live_push_status`: Current push status - "Normal", "Warning", or "Suspended"
- `suspended_time`: Unix timestamp when push was suspended (only present if status is Suspended)
- `blocked_shop_id`: Array of blocked shop IDs
- `push_config_on_list`: Array of enabled push config types
- `push_config_off_list`: Array of disabled push config types

---

### getLostPushMessage()

**API Documentation:** [v2.push.get_lost_push_message](https://open.shopee.com/documents/v2/v2.push.get_lost_push_message?module=105&type=1)

Get push messages that were lost within the past 3 days and not yet confirmed as consumed.

```typescript
const response = await sdk.push.getLostPushMessage();

console.log('Lost messages:', response.response.push_message_list.length);
console.log('Has more pages:', response.response.has_next_page);
console.log('Last message ID:', response.response.last_message_id);

response.response.push_message_list.forEach((message) => {
  console.log('Shop ID:', message.shop_id);
  console.log('Code:', message.code);
  console.log('Timestamp:', new Date(message.timestamp * 1000));
  console.log('Data:', JSON.parse(message.data));
});
```

**Response Fields:**
- `push_message_list`: Array of lost push messages (max 100 per call)
- `has_next_page`: Boolean indicating if more messages exist
- `last_message_id`: The ID of the last message in this batch

**Message Fields:**
- `shop_id`: Shop identifier (not present for partner-level pushes like codes 1, 2, 12)
- `code`: Push notification identifier (see push config types above)
- `timestamp`: Unix timestamp when the message was lost
- `data`: Push message content as a JSON string

**Use Cases:**
- Recover from webhook endpoint downtime
- Handle missed events during maintenance
- Sync missed updates to your system

**Important Notes:**
- Returns up to 100 messages per call
- Messages are available for 3 days
- Use `has_next_page` to check if more messages exist
- Call repeatedly until `has_next_page` is false to get all messages

---

### confirmConsumedLostPushMessage()

**API Documentation:** [v2.push.confirm_consumed_lost_push_message](https://open.shopee.com/documents/v2/v2.push.confirm_consumed_lost_push_message?module=105&type=1)

Confirm that lost push messages have been consumed up to a specific message ID.

```typescript
// Get lost messages
const lostMessages = await sdk.push.getLostPushMessage();

// Process the messages
for (const message of lostMessages.response.push_message_list) {
  // ... process message ...
}

// Confirm all messages have been consumed
await sdk.push.confirmConsumedLostPushMessage({
  last_message_id: lostMessages.response.last_message_id,
});

console.log('Messages confirmed as consumed');
```

**Parameters:**
- `last_message_id`: The `last_message_id` value returned by `getLostPushMessage()`

**Important:** 
- This confirms that ALL messages up to and including `last_message_id` have been consumed
- After confirmation, these messages will not be returned by future `getLostPushMessage()` calls
- Always confirm messages after successfully processing them
- If you don't confirm, you'll receive the same messages again on the next call

## Webhook Implementation

### Basic Webhook Handler (Express.js)

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Shopee webhook endpoint
app.post('/webhooks/shopee/orders', async (req, res) => {
  try {
    // Verify webhook signature (important for security!)
    const isValid = verifyShopeeSignature(
      req.headers['authorization'],
      req.body
    );
    
    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(401).send('Invalid signature');
    }
    
    // Process the webhook
    const event = req.body;
    console.log('Received order event:', event);
    
    // Handle different event codes
    switch (event.code) {
      case 1: // Order created
        await handleOrderCreated(event.data);
        break;
      case 2: // Order status updated
        await handleOrderUpdated(event.data);
        break;
      case 3: // Order cancelled
        await handleOrderCancelled(event.data);
        break;
      default:
        console.log('Unhandled event code:', event.code);
    }
    
    // Respond quickly
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

function verifyShopeeSignature(authHeader: string, body: any): boolean {
  // Implement signature verification
  // Check Shopee documentation for the exact algorithm
  const signature = authHeader?.replace('SHA256 ', '');
  const baseString = JSON.stringify(body);
  const expectedSignature = crypto
    .createHmac('sha256', process.env.PARTNER_KEY!)
    .update(baseString)
    .digest('hex');
  
  return signature === expectedSignature;
}

async function handleOrderCreated(data: any) {
  console.log('New order:', data.order_sn);
  // Save to database, send notifications, etc.
}

async function handleOrderUpdated(data: any) {
  console.log('Order updated:', data.order_sn);
  // Update database
}

async function handleOrderCancelled(data: any) {
  console.log('Order cancelled:', data.order_sn);
  // Handle cancellation
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Webhook Queue System

```typescript
import Queue from 'bull';

const webhookQueue = new Queue('shopee-webhooks', {
  redis: { host: 'localhost', port: 6379 },
});

// Express webhook handler
app.post('/webhooks/shopee/orders', async (req, res) => {
  try {
    // Verify signature
    if (!verifyShopeeSignature(req.headers['authorization'], req.body)) {
      return res.status(401).send('Invalid signature');
    }
    
    // Add to queue for async processing
    await webhookQueue.add(req.body, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
    
    // Respond immediately
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

// Process queue
webhookQueue.process(async (job) => {
  const event = job.data;
  console.log('Processing webhook:', event.code);
  
  switch (event.code) {
    case 1:
      await handleOrderCreated(event.data);
      break;
    case 2:
      await handleOrderUpdated(event.data);
      break;
    case 3:
      await handleOrderCancelled(event.data);
      break;
  }
});
```

### Lost Message Recovery

```typescript
async function recoverLostMessages() {
  console.log('Checking for lost messages...');
  
  const response = await sdk.push.getLostPushMessage();
  
  if (!response.data || response.data.length === 0) {
    console.log('No lost messages');
    return;
  }
  
  console.log(`Found ${response.data.length} lost messages`);
  
  const processedIds: number[] = [];
  
  for (const message of response.data) {
    try {
      console.log(`Processing lost message ${message.push_id}`);
      
      // Process based on type
      if (message.type === 0) {
        // Order event
        await handleOrderEvent(message.data);
      } else if (message.type === 1) {
        // Product event
        await handleProductEvent(message.data);
      }
      
      processedIds.push(message.push_id);
    } catch (error) {
      console.error(`Failed to process message ${message.push_id}:`, error);
    }
  }
  
  // Confirm processed messages
  if (processedIds.length > 0) {
    await sdk.push.confirmConsumedLostPushMessage({
      push_id_list: processedIds,
    });
    console.log(`Confirmed ${processedIds.length} messages`);
  }
}

// Run recovery periodically
setInterval(recoverLostMessages, 15 * 60 * 1000); // Every 15 minutes
```

## Best Practices

### 1. Implement Signature Verification

```typescript
// Always verify webhook signatures for security
function verifyWebhook(authHeader: string, body: any): boolean {
  if (!authHeader) {
    return false;
  }
  
  try {
    const signature = authHeader.replace('SHA256 ', '');
    const baseString = JSON.stringify(body);
    const expectedSignature = crypto
      .createHmac('sha256', process.env.PARTNER_KEY!)
      .update(baseString)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
```

### 2. Respond Quickly

```typescript
// ✅ Good: Respond immediately, process async
app.post('/webhook', async (req, res) => {
  if (!verifyWebhook(req.headers['authorization'], req.body)) {
    return res.status(401).send('Invalid');
  }
  
  // Queue for processing
  await queue.add(req.body);
  
  // Respond immediately
  res.status(200).send('OK');
});

// ❌ Bad: Process synchronously
app.post('/webhook', async (req, res) => {
  await processWebhook(req.body); // Slow!
  res.status(200).send('OK');
});
```

### 3. Handle Idempotency

```typescript
const processedMessages = new Set<number>();

async function handleWebhook(event: any) {
  // Check if already processed
  if (processedMessages.has(event.push_id)) {
    console.log('Message already processed:', event.push_id);
    return;
  }
  
  // Process
  await processEvent(event);
  
  // Mark as processed
  processedMessages.add(event.push_id);
  
  // Cleanup old entries periodically
  if (processedMessages.size > 10000) {
    const oldEntries = Array.from(processedMessages).slice(0, 5000);
    oldEntries.forEach(id => processedMessages.delete(id));
  }
}
```

### 4. Implement Retry Logic

```typescript
async function processEventWithRetry(event: any, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await processEvent(event);
      return; // Success
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }
  
  // All retries failed
  console.error('All retries failed:', lastError);
  // Alert admin, save to dead letter queue, etc.
}
```

### 5. Monitor Webhook Health

```typescript
class WebhookMonitor {
  private stats = {
    received: 0,
    processed: 0,
    failed: 0,
    lastReceived: 0,
  };
  
  recordReceived() {
    this.stats.received++;
    this.stats.lastReceived = Date.now();
  }
  
  recordProcessed() {
    this.stats.processed++;
  }
  
  recordFailed() {
    this.stats.failed++;
  }
  
  getStats() {
    return {
      ...this.stats,
      successRate: this.stats.received > 0 
        ? (this.stats.processed / this.stats.received) * 100 
        : 0,
      minutesSinceLastReceived: (Date.now() - this.stats.lastReceived) / 60000,
    };
  }
  
  checkHealth() {
    const stats = this.getStats();
    
    if (stats.minutesSinceLastReceived > 60) {
      console.warn('⚠️ No webhooks received in 60 minutes');
    }
    
    if (stats.successRate < 95) {
      console.warn(`⚠️ Low success rate: ${stats.successRate.toFixed(1)}%`);
    }
  }
}

const monitor = new WebhookMonitor();
setInterval(() => monitor.checkHealth(), 5 * 60 * 1000); // Every 5 min
```

## Common Event Codes

### Order Events (type 0)
- `1`: Order created
- `2`: Order status updated
- `3`: Order cancelled
- `4`: Order shipped
- `5`: Order delivered
- (Check Shopee docs for complete list)

### Product Events (type 1)
- `1`: Product created
- `2`: Product updated
- `3`: Product deleted
- `4`: Stock updated
- (Check Shopee docs for complete list)

## Security Considerations

1. **Always verify signatures** - Never process unsigned webhooks
2. **Use HTTPS only** - Shopee requires HTTPS endpoints
3. **Rate limiting** - Implement rate limits to prevent abuse
4. **Validate data** - Don't trust webhook data blindly
5. **Store secrets securely** - Never commit webhook secrets to git

## Testing Webhooks

### Local Development with ngrok

```bash
# Start ngrok
ngrok http 3000

# Use ngrok URL in webhook config
```

```typescript
// Development webhook configuration
if (process.env.NODE_ENV === 'development') {
  await sdk.push.setAppPushConfig({
    push_config: [
      {
        event_type: 0,
        url: 'https://your-ngrok-url.ngrok.io/webhooks/orders',
      },
    ],
  });
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_param` | Invalid URL or parameters | Check URL is valid HTTPS |
| `error_permission_denied` | No permission to configure | Verify authentication |
| `error_push_config_not_found` | No configuration exists | Set configuration first |

## Related

- [OrderManager](./order.md) - Process order webhooks
- [ProductManager](./product.md) - Process product webhooks
- [Authentication Guide](../guides/authentication.md) - API authentication
