# LiveStreamManager

The LiveStreamManager handles all livestream-related operations for managing live shopping sessions on Shopee.

## Overview

The LiveStreamManager provides methods for:
- **Session Management**: Create, start, end, and update livestream sessions
- **Session Monitoring**: Get session details and performance metrics
- **Item Management**: Add, update, delete, and list items in the shopping bag
- **Item Sets**: Manage and apply pre-defined item collections
- **Show Items**: Control which item is currently displayed during the stream
- **Comments**: Post comments and manage user comment permissions
- **Media**: Upload images for session covers and other purposes

**Note:** LiveStream APIs are only available for TW (Taiwan), ID (Indonesia), and TH (Thailand) regions.

## Quick Start

```typescript
// Create a new livestream session
const session = await sdk.livestream.createSession({
  title: "Flash Sale - Electronics",
  description: "Special deals on smartphones and accessories",
  cover_image_url: "https://cf.shopee.sg/file/cover.jpg",
  is_test: false,
});

console.log('Session ID:', session.response.session_id);

// Start the livestream
await sdk.livestream.startSession({
  session_id: session.response.session_id,
  domain_id: 1,
});

// Add items to the shopping bag
await sdk.livestream.addItemList({
  session_id: session.response.session_id,
  item_list: [
    { item_id: 123456, shop_id: 67890 },
    { item_id: 234567, shop_id: 67890 },
  ],
});

// Get live metrics during the stream
const metrics = await sdk.livestream.getSessionMetric({
  session_id: session.response.session_id,
});

console.log('Current viewers:', metrics.response.ccu);
console.log('Total views:', metrics.response.views);
console.log('Orders:', metrics.response.orders);

// End the session
await sdk.livestream.endSession({
  session_id: session.response.session_id,
});
```

## Methods

### Session Management

#### createSession()

**API Documentation:** [v2.livestream.create_session](https://open.shopee.com/documents/v2/v2.livestream.create_session?module=125&type=1)

Create a new livestream session with basic information.

```typescript
const response = await sdk.livestream.createSession({
  title: "New Product Launch",
  description: "Launching our latest collection",
  cover_image_url: "https://cf.shopee.sg/file/id-xxx-cover.jpg",
  is_test: false, // Set to true for testing
});

console.log('Session ID:', response.response.session_id);
```

**Parameters:**
- `title` (required): Session title, max 200 characters
- `cover_image_url` (required): Cover image URL (use `uploadImage()` first)
- `description` (optional): Session description, max 200 characters
- `is_test` (optional): Whether this is a test session

**Best Practices:**
- Upload a compelling cover image that represents your products
- Keep titles concise and attention-grabbing
- Test your setup with `is_test: true` before going live

---

#### startSession()

**API Documentation:** [v2.livestream.start_session](https://open.shopee.com/documents/v2/v2.livestream.start_session?module=125&type=1)

Start a livestream session.

```typescript
await sdk.livestream.startSession({
  session_id: 6236215,
  domain_id: 1, // Get from session detail
});
```

**Parameters:**
- `session_id` (required): The livestream session ID
- `domain_id` (required): Stream domain ID (from `getSessionDetail()`)

**Notes:**
- Session must be in "Not Started" status
- Only one session can be active at a time
- Get the `domain_id` from `stream_url_list` in session detail

---

#### endSession()

**API Documentation:** [v2.livestream.end_session](https://open.shopee.com/documents/v2/v2.livestream.end_session?module=125&type=1)

End an ongoing livestream session.

```typescript
await sdk.livestream.endSession({
  session_id: 6236215,
});
```

**Parameters:**
- `session_id` (required): The livestream session ID

---

#### updateSession()

**API Documentation:** [v2.livestream.update_session](https://open.shopee.com/documents/v2/v2.livestream.update_session?module=125&type=1)

Update basic information of a livestream session.

```typescript
await sdk.livestream.updateSession({
  session_id: 6236215,
  title: "Updated: Flash Sale Extended!",
  description: "2 more hours of amazing deals",
  cover_image_url: "https://cf.shopee.sg/file/id-xxx-new-cover.jpg",
});
```

**Parameters:**
- `session_id` (required): The livestream session ID
- `title` (optional): New title, max 200 characters
- `description` (optional): New description, max 200 characters
- `cover_image_url` (optional): New cover image URL

---

#### getSessionDetail()

**API Documentation:** [v2.livestream.get_session_detail](https://open.shopee.com/documents/v2/v2.livestream.get_session_detail?module=125&type=1)

Get detailed information about a livestream session.

```typescript
const response = await sdk.livestream.getSessionDetail({
  session_id: 6236215,
});

console.log('Status:', response.response.status); // 0=Not started, 1=Ongoing, 2=Ended
console.log('Share URL:', response.response.share_url);
console.log('Push URL:', response.response.stream_url_list.push_url);
console.log('Play URL:', response.response.stream_url_list.play_url);
```

**Response Fields:**
- `session_id`: Session identifier
- `title`: Session title
- `description`: Session description
- `cover_image_url`: Cover image URL
- `status`: 0 = Not started, 1 = Ongoing, 2 = Ended
- `share_url`: URL to share the livestream
- `is_test`: Whether it's a test session
- `create_time`: Creation timestamp (milliseconds)
- `update_time`: Last update timestamp (milliseconds)
- `start_time`: Start timestamp (milliseconds)
- `end_time`: End timestamp (milliseconds)
- `stream_url_list`: Streaming URLs and keys
  - `push_url`: RTMP push URL for streaming
  - `push_key`: Authentication key for pushing
  - `play_url`: Playback URL for viewers
  - `domain_id`: Stream domain identifier

---

### Session Metrics

#### getSessionMetric()

**API Documentation:** [v2.livestream.get_session_metric](https://open.shopee.com/documents/v2/v2.livestream.get_session_metric?module=125&type=1)

Get performance metrics for a livestream session.

```typescript
const response = await sdk.livestream.getSessionMetric({
  session_id: 6236215,
});

const metrics = response.response;
console.log('GMV:', metrics.gmv);
console.log('Orders:', metrics.orders);
console.log('Peak viewers:', metrics.peak_ccu);
console.log('Engagement rate:', (metrics.engage_ccu_1m / metrics.ccu * 100).toFixed(2) + '%');
```

**Response Metrics:**
- `gmv`: Gross Merchandise Value (total order value)
- `atc`: Add-to-cart clicks
- `ctr`: Click-through rate
- `co`: Conversion rate
- `orders`: Number of orders placed
- `ccu`: Current concurrent viewers
- `engage_ccu_1m`: Engaged viewers (watched >1 min)
- `peak_ccu`: Peak concurrent viewers
- `likes`: Number of likes
- `comments`: Number of comments
- `shares`: Number of shares
- `views`: Total views
- `avg_viewing_duration`: Average viewing time (seconds)

---

#### getSessionItemMetric()

**API Documentation:** [v2.livestream.get_session_item_metric](https://open.shopee.com/documents/v2/v2.livestream.get_session_item_metric?module=125&type=1)

Get item-level performance metrics.

```typescript
const response = await sdk.livestream.getSessionItemMetric({
  session_id: 6236215,
  offset: 0,
  page_size: 20,
});

response.response.list.forEach(item => {
  console.log(`${item.name}: ${item.orders} orders, ${item.clicks} clicks`);
  console.log(`  Conversion: ${(item.orders / item.clicks * 100).toFixed(2)}%`);
  console.log(`  GMV: $${item.gmv}`);
});
```

**Parameters:**
- `session_id` (required): Session ID
- `offset` (required): Starting entry (0 for first page)
- `page_size` (required): Items per page (1-100)

---

### Item Management

#### addItemList()

**API Documentation:** [v2.livestream.add_item_list](https://open.shopee.com/documents/v2/v2.livestream.add_item_list?module=125&type=1)

Add items to the session's shopping bag.

```typescript
await sdk.livestream.addItemList({
  session_id: 6236215,
  item_list: [
    { item_id: 123456, shop_id: 67890 },
    { item_id: 234567, shop_id: 67890 },
    { item_id: 345678, shop_id: 67890 },
  ],
});
```

**Parameters:**
- `session_id` (required): Session ID
- `item_list` (required): Array of items to add
  - `item_id`: Product item ID
  - `shop_id`: Shop ID

---

#### updateItemList()

**API Documentation:** [v2.livestream.update_item_list](https://open.shopee.com/documents/v2/v2.livestream.update_item_list?module=125&type=1)

Update the order of items in the shopping bag.

```typescript
await sdk.livestream.updateItemList({
  session_id: 6236215,
  item_list: [
    { item_id: 234567, shop_id: 67890, item_no: 1 }, // Move to first
    { item_id: 123456, shop_id: 67890, item_no: 2 }, // Move to second
  ],
});
```

**Parameters:**
- `session_id` (required): Session ID
- `item_list` (required): Array of items with new positions
  - `item_id`: Product item ID
  - `shop_id`: Shop ID
  - `item_no`: New position (starts from 1)

---

#### deleteItemList()

**API Documentation:** [v2.livestream.delete_item_list](https://open.shopee.com/documents/v2/v2.livestream.delete_item_list?module=125&type=1)

Remove items from the shopping bag.

```typescript
await sdk.livestream.deleteItemList({
  session_id: 6236215,
  item_list: [
    { item_id: 123456, shop_id: 67890 },
  ],
});
```

---

#### getItemList()

**API Documentation:** [v2.livestream.get_item_list](https://open.shopee.com/documents/v2/v2.livestream.get_item_list?module=125&type=1)

Get all items in the shopping bag with pricing and affiliate information.

```typescript
const response = await sdk.livestream.getItemList({
  session_id: 6236215,
  offset: 0,
  page_size: 20,
});

response.response.list.forEach(item => {
  console.log(`${item.item_no}. ${item.name}`);
  console.log(`  Price: ${item.price_info.currency} ${item.price_info.current_price}`);
  console.log(`  Commission: ${(item.affiliate_info.commission_rate * 100)}%`);
});
```

---

#### getItemCount()

**API Documentation:** [v2.livestream.get_item_count](https://open.shopee.com/documents/v2/v2.livestream.get_item_count?module=125&type=1)

Get the total count of items in the shopping bag.

```typescript
const response = await sdk.livestream.getItemCount({
  session_id: 6236215,
});

console.log('Total items:', response.response.total_count);
```

---

#### getRecentItemList()

**API Documentation:** [v2.livestream.get_recent_item_list](https://open.shopee.com/documents/v2/v2.livestream.get_recent_item_list?module=125&type=1)

Get recently added items.

```typescript
const response = await sdk.livestream.getRecentItemList({
  session_id: 6236215,
  offset: 0,
  page_size: 10,
});
```

---

#### getLikeItemList()

**API Documentation:** [v2.livestream.get_like_item_list](https://open.shopee.com/documents/v2/v2.livestream.get_like_item_list?module=125&type=1)

Get items that viewers liked during the stream.

```typescript
const response = await sdk.livestream.getLikeItemList({
  session_id: 6236215,
  offset: 0,
  page_size: 20,
});

console.log('Most liked items:');
response.response.list.forEach(item => {
  console.log(`- ${item.name}`);
});
```

---

### Item Sets

#### applyItemSet()

**API Documentation:** [v2.livestream.apply_item_set](https://open.shopee.com/documents/v2/v2.livestream.apply_item_set?module=125&type=1)

Apply a pre-defined item set to the session.

```typescript
await sdk.livestream.applyItemSet({
  session_id: 6236215,
  item_set_id: 12345,
});
```

**Use Case:** Quickly populate the shopping bag with a pre-configured collection of items.

---

#### getItemSetList()

**API Documentation:** [v2.livestream.get_item_set_list](https://open.shopee.com/documents/v2/v2.livestream.get_item_set_list?module=125&type=1)

Get all available item sets.

```typescript
const response = await sdk.livestream.getItemSetList({
  offset: 0,
  page_size: 20,
});

response.response.list.forEach(set => {
  console.log(`${set.name}: ${set.item_count} items`);
});
```

---

#### getItemSetItemList()

**API Documentation:** [v2.livestream.get_item_set_item_list](https://open.shopee.com/documents/v2/v2.livestream.get_item_set_item_list?module=125&type=1)

Get items within a specific item set.

```typescript
const response = await sdk.livestream.getItemSetItemList({
  item_set_id: 12345,
  offset: 0,
  page_size: 50,
});
```

---

### Show Items

#### getShowItem()

**API Documentation:** [v2.livestream.get_show_item](https://open.shopee.com/documents/v2/v2.livestream.get_show_item?module=125&type=1)

Get the currently displayed item.

```typescript
const response = await sdk.livestream.getShowItem({
  session_id: 6236215,
});

if (response.response.item) {
  console.log('Currently showing:', response.response.item.name);
} else {
  console.log('No item currently displayed');
}
```

---

#### updateShowItem()

**API Documentation:** [v2.livestream.update_show_item](https://open.shopee.com/documents/v2/v2.livestream.update_show_item?module=125&type=1)

Set which item to display during the stream.

```typescript
await sdk.livestream.updateShowItem({
  session_id: 6236215,
  item_id: 123456,
  shop_id: 67890,
});
```

**Use Case:** Highlight specific items during the livestream to drive viewer attention and purchases.

---

#### deleteShowItem()

**API Documentation:** [v2.livestream.delete_show_item](https://open.shopee.com/documents/v2/v2.livestream.delete_show_item?module=125&type=1)

Remove the currently displayed item.

```typescript
await sdk.livestream.deleteShowItem({
  session_id: 6236215,
});
```

---

### Comments

#### postComment()

**API Documentation:** [v2.livestream.post_comment](https://open.shopee.com/documents/v2/v2.livestream.post_comment?module=125&type=1)

Post a comment to the livestream.

```typescript
await sdk.livestream.postComment({
  session_id: 6236215,
  comment: "Welcome everyone! Today's deals are amazing!",
});
```

**Use Case:** Post announcements, answer questions, or engage with viewers.

---

#### getLatestCommentList()

**API Documentation:** [v2.livestream.get_latest_comment_list](https://open.shopee.com/documents/v2/v2.livestream.get_latest_comment_list?module=125&type=1)

Get the latest comments from the livestream.

```typescript
const response = await sdk.livestream.getLatestCommentList({
  session_id: 6236215,
  offset: 0,
  page_size: 50,
});

response.response.list.forEach(comment => {
  console.log(`${comment.username}: ${comment.comment}`);
});
```

---

#### banUserComment()

**API Documentation:** [v2.livestream.ban_user_comment](https://open.shopee.com/documents/v2/v2.livestream.ban_user_comment?module=125&type=1)

Ban a user from commenting.

```typescript
await sdk.livestream.banUserComment({
  session_id: 6236215,
  user_id: 5001,
});
```

**Use Case:** Moderate inappropriate behavior or spam.

---

#### unbanUserComment()

**API Documentation:** [v2.livestream.unban_user_comment](https://open.shopee.com/documents/v2/v2.livestream.unban_user_comment?module=125&type=1)

Unban a previously banned user.

```typescript
await sdk.livestream.unbanUserComment({
  session_id: 6236215,
  user_id: 5001,
});
```

---

### Media

#### uploadImage()

**API Documentation:** [v2.livestream.upload_image](https://open.shopee.com/documents/v2/v2.livestream.upload_image?module=125&type=1)

Upload an image for use in livestream (e.g., cover image).

```typescript
import fs from 'fs';

const imageBuffer = fs.readFileSync('cover.jpg');
const response = await sdk.livestream.uploadImage({
  image: imageBuffer,
});

console.log('Uploaded image URL:', response.response.image_url);

// Use the URL when creating a session
await sdk.livestream.createSession({
  title: "My Livestream",
  cover_image_url: response.response.image_url,
});
```

**Parameters:**
- `image` (required): Image file as Buffer or Blob

**Notes:**
- Upload the cover image before creating a session
- Image must be within size limits (typically <10MB)
- Supported formats: JPG, PNG

---

## Best Practices

### 1. Pre-Stream Setup

```typescript
// Upload cover image first
const imageBuffer = fs.readFileSync('cover.jpg');
const imageResponse = await sdk.livestream.uploadImage({
  image: imageBuffer,
});

// Create session with uploaded cover
const session = await sdk.livestream.createSession({
  title: "Flash Sale - Limited Time Only!",
  description: "50% off selected items",
  cover_image_url: imageResponse.response.image_url,
  is_test: false,
});

// Prepare items using an item set
await sdk.livestream.applyItemSet({
  session_id: session.response.session_id,
  item_set_id: 12345,
});

// Or add individual items
await sdk.livestream.addItemList({
  session_id: session.response.session_id,
  item_list: [
    { item_id: 111, shop_id: 67890 },
    { item_id: 222, shop_id: 67890 },
  ],
});
```

### 2. During Stream Management

```typescript
// Monitor metrics in real-time
setInterval(async () => {
  const metrics = await sdk.livestream.getSessionMetric({
    session_id: sessionId,
  });
  
  console.log(`Viewers: ${metrics.response.ccu}, Orders: ${metrics.response.orders}`);
  
  // Auto-post milestone announcements
  if (metrics.response.orders % 10 === 0) {
    await sdk.livestream.postComment({
      session_id: sessionId,
      comment: `🎉 ${metrics.response.orders} orders already! Thank you!`,
    });
  }
}, 30000); // Check every 30 seconds

// Highlight items strategically
await sdk.livestream.updateShowItem({
  session_id: sessionId,
  item_id: topSellingItemId,
  shop_id: shopId,
});
```

### 3. Comment Moderation

```typescript
// Monitor and moderate comments
const comments = await sdk.livestream.getLatestCommentList({
  session_id: sessionId,
  offset: 0,
  page_size: 50,
});

// Filter spam or inappropriate comments
const spamUsers = comments.response.list
  .filter(c => isSpam(c.comment))
  .map(c => c.user_id);

// Ban spam users
for (const userId of spamUsers) {
  await sdk.livestream.banUserComment({
    session_id: sessionId,
    user_id: userId,
  });
}
```

### 4. Post-Stream Analysis

```typescript
// Get final metrics
const finalMetrics = await sdk.livestream.getSessionMetric({
  session_id: sessionId,
});

// Get item performance
const itemMetrics = await sdk.livestream.getSessionItemMetric({
  session_id: sessionId,
  offset: 0,
  page_size: 100,
});

// Identify top performers
const topItems = itemMetrics.response.list
  .sort((a, b) => b.gmv - a.gmv)
  .slice(0, 5);

console.log('Top 5 Items by GMV:');
topItems.forEach((item, index) => {
  console.log(`${index + 1}. ${item.name}: $${item.gmv}`);
});

// End the session
await sdk.livestream.endSession({
  session_id: sessionId,
});
```

## Common Workflows

### Complete Livestream Workflow

```typescript
async function runLivestream() {
  // 1. Upload cover image
  const imageBuffer = fs.readFileSync('cover.jpg');
  const imageResponse = await sdk.livestream.uploadImage({ image: imageBuffer });
  
  // 2. Create session
  const session = await sdk.livestream.createSession({
    title: "Weekend Flash Sale",
    description: "Amazing deals on electronics",
    cover_image_url: imageResponse.response.image_url,
  });
  
  const sessionId = session.response.session_id;
  
  // 3. Add items
  await sdk.livestream.applyItemSet({
    session_id: sessionId,
    item_set_id: 12345,
  });
  
  // 4. Get session details and streaming info
  const details = await sdk.livestream.getSessionDetail({
    session_id: sessionId,
  });
  
  console.log('Push URL:', details.response.stream_url_list.push_url);
  console.log('Push Key:', details.response.stream_url_list.push_key);
  console.log('Share URL:', details.response.share_url);
  
  // 5. Start the session
  await sdk.livestream.startSession({
    session_id: sessionId,
    domain_id: details.response.stream_url_list.domain_id,
  });
  
  // 6. During stream - manage items and comments
  // ... (see "During Stream Management" section)
  
  // 7. End session
  await sdk.livestream.endSession({
    session_id: sessionId,
  });
  
  // 8. Get final metrics
  const finalMetrics = await sdk.livestream.getSessionMetric({
    session_id: sessionId,
  });
  
  return finalMetrics;
}
```

## Error Handling

```typescript
try {
  await sdk.livestream.createSession({
    title: "My Livestream",
    cover_image_url: imageUrl,
  });
} catch (error) {
  if (error.message.includes('title cannot exceed 200 characters')) {
    console.error('Title too long, please shorten it');
  } else if (error.message.includes('last session is still ongoing')) {
    console.error('End the current session before starting a new one');
  } else {
    console.error('Failed to create session:', error);
  }
}
```

## Common Errors

- `The last session is still ongoing`: End the current session before creating a new one
- `The title cannot exceed 200 characters`: Keep title under limit
- `You do not have permission to livestream`: Enable livestream permission for your region
- `The API is not supported for current region`: LiveStream is only available for TW, ID, TH
- `Invalid session_id`: Session doesn't exist or doesn't belong to you
- `The session is ended`: Cannot modify an ended session

## Related

- [ProductManager](./product.md) - For managing product items
- [OrderManager](./order.md) - For handling orders from livestream
- [ShopManager](./shop.md) - For shop-level settings
