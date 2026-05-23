# VideoManager

The VideoManager handles all Shopee Video operations including uploading videos, managing video content, analytics, and performance tracking.

## Overview

The VideoManager provides methods for:
- **Video Management**: Post, edit, delete, and list videos
- **Content Setup**: Get cover images, edit video information
- **Performance Analytics**: Track video metrics, trends, and performance data
- **Audience Insights**: Get demographic and distribution data for viewers
- **Product Performance**: Monitor product sales and performance linked to videos

## Quick Start

```typescript
// Get list of draft videos
const draftVideos = await sdk.video.getVideoList({
  page_no: 1,
  page_size: 20,
  list_type: 1, // 1 = draft, 2 = posted
});

// Get video details
const videoDetail = await sdk.video.getVideoDetail({
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
});

// Get overview performance
const performance = await sdk.video.getOverviewPerformance({
  period_type: 'Last7d',
  end_date: '2025-01-31',
});
```

## Video Management Methods

### deleteVideo()

**API Documentation:** [v2.video.delete_video](https://open.shopee.com/documents/v2/v2.video.delete_video?module=129&type=1)

Delete videos with draft or post status.

```typescript
// Delete draft videos
await sdk.video.deleteVideo({
  video_upload_id_list: ['sg-11110199-6v8gq-mgbni6rb44qz04'],
});

// Delete posted videos
await sdk.video.deleteVideo({
  post_id_list: ['YwOo_gZqCACXbM0UAAAAAA=='],
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `video_upload_id_list` | `string[]` | Optional* | List of video_upload_ids to delete (for draft status) |
| `post_id_list` | `string[]` | Optional* | List of post_ids to delete (for post status) |

*Note: Must provide either `video_upload_id_list` or `post_id_list`, but not both.

**Returns:** `DeleteVideoResponse`
- `success_list`: List of successfully deleted videos
- `failure_list`: List of videos that failed to delete with reasons

---

### editVideoInfo()

**API Documentation:** [v2.video.edit_video_info](https://open.shopee.com/documents/v2/v2.video.edit_video_info?module=129&type=1)

Edit video information including caption, cover image, linked products, and schedule settings before or after posting.

```typescript
await sdk.video.editVideoInfo({
  video_upload_list: [
    {
      video_upload_id: 'sg-11110199-6v99e-mgezdwct5eyya0',
      caption: 'Check out this amazing product!',
      cover_image_url: 'https://down-sg.img.susercontent.com/...',
      item_info: [
        {
          item_id: 123456,
          custom_item_name: 'My Product Display Name',
        },
      ],
      allow_info: {
        allow_duet: true,
        allow_stitch: true,
      },
      scheduled_info: {
        scheduled_post: true,
        scheduled_post_time: 1761734929450, // millisecond timestamp
      },
    },
  ],
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `video_upload_list` | `object[]` | Yes | List of videos to edit (max 5) |
| `video_upload_list[].video_upload_id` | `string` | Yes | ID of uploaded video from v2.media.get_video_upload_result |
| `video_upload_list[].caption` | `string` | No | Description of the video (max 150 characters) |
| `video_upload_list[].cover_image_url` | `string` | Yes | Selected cover image URL from v2.video.get_cover_list |
| `video_upload_list[].item_info` | `object[]` | No | List of products to link (max 6) |
| `video_upload_list[].item_info[].item_id` | `number` | Yes | Shopee's unique identifier for an item |
| `video_upload_list[].item_info[].custom_item_name` | `string` | No | Product display name in video |
| `video_upload_list[].allow_info` | `object` | Yes | Duet and stitch permissions |
| `video_upload_list[].allow_info.allow_duet` | `boolean` | Yes | Whether to allow duet |
| `video_upload_list[].allow_info.allow_stitch` | `boolean` | Yes | Whether to allow stitch |
| `video_upload_list[].scheduled_info` | `object` | Yes | Scheduling information |
| `video_upload_list[].scheduled_info.scheduled_post` | `boolean` | Yes | Whether to schedule posting |
| `video_upload_list[].scheduled_info.scheduled_post_time` | `number` | No* | Scheduled post time (millisecond timestamp, required if scheduled_post is true) |

*Note: Must be 15 minutes after current time and within 30 days.

**Returns:** `EditVideoInfoResponse`
- `success_list`: List of successfully edited video_upload_ids
- `failure_list`: List of failed video_upload_ids with reasons

---

### postVideo()

**API Documentation:** [v2.video.post_video](https://open.shopee.com/documents/v2/v2.video.post_video?module=129&type=1)

Post videos to Shopee Video. Must call v2.video.edit_video_info first to set video information.

```typescript
const result = await sdk.video.postVideo({
  video_upload_id_list: [
    'sg-11110199-6v8gq-mgbni6rb44qz04',
    'sg-11110199-6v9an-mgfwrq9n668d44',
  ],
});

console.log('Posted videos:', result.response.success_list);
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `video_upload_id_list` | `string[]` | Yes | List of video_upload_ids to post (max 5) |

**Returns:** `PostVideoResponse`
- `success_list`: List of successfully posted videos with post_id
- `failure_list`: List of videos that failed to post with reasons

---

### getVideoList()

**API Documentation:** [v2.video.get_video_list](https://open.shopee.com/documents/v2/v2.video.get_video_list?module=129&type=1)

Get list of videos in draft or posted status.

```typescript
// Get draft videos
const drafts = await sdk.video.getVideoList({
  page_no: 1,
  page_size: 20,
  list_type: 1, // 1 = draft
});

// Get posted videos
const posted = await sdk.video.getVideoList({
  page_no: 1,
  page_size: 20,
  list_type: 2, // 2 = posted
});

// Pagination
if (drafts.response.has_more) {
  const nextPage = await sdk.video.getVideoList({
    page_no: 2,
    page_size: 20,
    list_type: 1,
  });
}
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page_no` | `number` | Yes | Page number (starting from 1) |
| `page_size` | `number` | Yes | Number of videos per page (max 20) |
| `list_type` | `number` | Yes | 1 = draft videos, 2 = posted videos |

**Returns:** `GetVideoListResponse`
- `total_count`: Total number of videos
- `has_more`: Whether there are more pages
- `list`: Array of video objects with details

---

### getVideoDetail()

**API Documentation:** [v2.video.get_video_detail](https://open.shopee.com/documents/v2/v2.video.get_video_detail?module=129&type=1)

Get detailed information about a specific video.

```typescript
// Get draft video details
const draftDetail = await sdk.video.getVideoDetail({
  video_upload_id: 'sg-11110199-6v99e-mgezdwct5eyya0',
});

// Get posted video details
const postedDetail = await sdk.video.getVideoDetail({
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
});

console.log('Video caption:', postedDetail.response.caption);
console.log('Views:', postedDetail.response.views);
console.log('Likes:', postedDetail.response.likes);
console.log('Linked products:', postedDetail.response.item_list);
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `video_upload_id` | `string` | Optional* | Video upload ID (for draft videos) |
| `post_id` | `string` | Optional* | Post ID (for posted videos) |

*Note: Must provide either `video_upload_id` or `post_id`, but not both.

**Returns:** `GetVideoDetailResponse`
- `video_upload_id`: Video upload identifier
- `post_id`: Post identifier (if posted)
- `post_time`: Post timestamp (if posted)
- `video_url`: Video play URL
- `status`: Video status (200=DRAFT, 300=POSTED, 400=DELETED, 500=SCHEDULED, 600=SCHEDULED_FAILED)
- `cover_image_url`: Cover image URL
- `caption`: Video caption
- `duration`: Video duration in milliseconds
- `views`, `likes`, `comments`: Engagement metrics (if posted)
- `item_list`: Linked products
- `allow_info`: Duet/stitch permissions
- `scheduled_info`: Scheduling information

---

### getCoverList()

**API Documentation:** [v2.video.get_cover_list](https://open.shopee.com/documents/v2/v2.video.get_cover_list?module=129&type=1)

Get available cover images for a video after upload.

```typescript
const covers = await sdk.video.getCoverList({
  video_upload_id: 'sg-11110199-6v99e-mgezdwct5eyya0',
});

// Select a cover for editVideoInfo
const selectedCover = covers.response.image_url_list[0];
await sdk.video.editVideoInfo({
  video_upload_list: [
    {
      video_upload_id: 'sg-11110199-6v99e-mgezdwct5eyya0',
      cover_image_url: selectedCover,
      // ... other fields
    },
  ],
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `video_upload_id` | `string` | Yes | ID of uploaded video from v2.media.get_video_upload_result |

**Returns:** `GetCoverListResponse`
- `image_url_list`: Array of frame URLs to use as video cover

---

## Performance & Analytics Methods

### getOverviewPerformance()

**API Documentation:** [v2.video.get_overview_performance](https://open.shopee.com/documents/v2/v2.video.get_overview_performance?module=129&type=1)

Get overall performance data for all posted Shopee Videos. Data has at least a one-day delay.

```typescript
const overview = await sdk.video.getOverviewPerformance({
  period_type: 'Last7d',
  end_date: '2025-01-31',
});

console.log('Key Metrics:');
console.log('  Placed Sales:', overview.response.key_metric.placed_sales);
console.log('  Placed Orders:', overview.response.key_metric.placed_orders);
console.log('  Total Views:', overview.response.engagement.total_views);
console.log('  Total Likes:', overview.response.engagement.total_likes);

console.log('Conversion:');
console.log('  CTR:', overview.response.conversion.ctr);
console.log('  Placed CO Rate:', overview.response.conversion.placed_co_rate);
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `period_type` | `string` | Yes | "Day", "Week", "Month", "Last7d", "Last15d", or "Last30d" |
| `end_date` | `string` | Yes | End date in "YYYY-MM-DD" format (must align with period_type) |

**Returns:** `GetOverviewPerformanceResponse`
- `key_metric`: Sales, orders, items sold, viewers, views, and average view duration
- `conversion`: Buyers, ATC, CTR, conversion rates, ABS, GPM, and video counts
- `engagement`: Views, likes, shares, comments, and followers growth
- `fetched_date_range`: Data computation date

---

### getMetricTrend()

**API Documentation:** [v2.video.get_metric_trend](https://open.shopee.com/documents/v2/v2.video.get_metric_trend?module=129&type=1)

Get metric trends for videos over a time period.

```typescript
const trends = await sdk.video.getMetricTrend({
  period_type: 'Week',
  end_date: '2025-09-21', // Must be Sunday for Week type
});

trends.response.video_total_metric_list.forEach((metric) => {
  console.log('Period:', metric.data_period);
  console.log('  Total Views:', metric.total_views);
  console.log('  Placed Sales:', metric.placed_sales);
  console.log('  Placed Orders:', metric.placed_orders);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `period_type` | `string` | Yes | "Day", "Week", "Month", "Last7d", "Last15d", or "Last30d" |
| `end_date` | `string` | Yes | End date in "YYYY-MM-DD" format (must align with period_type) |

**Returns:** `GetMetricTrendResponse`
- `video_total_metric_list`: Array of metric objects for each period with sales, orders, views, engagement, and performance data

---

### getVideoPerformanceList()

**API Documentation:** [v2.video.get_video_performance_list](https://open.shopee.com/documents/v2/v2.video.get_video_performance_list?module=129&type=1)

Get performance metrics for multiple videos with sorting and filtering.

```typescript
const performance = await sdk.video.getVideoPerformanceList({
  page_no: 1,
  page_size: 20,
  period_type: 'Last7d',
  end_date: '2025-10-30',
  order_by: 'Views', // Views, Likes, Comments, AvgViewsDuration
  sort: 'desc',
  caption: 'product launch', // Optional filter
});

performance.response.list.forEach((video) => {
  console.log('Video:', video.caption);
  console.log('  Views:', video.views);
  console.log('  Likes:', video.likes);
  console.log('  Placed Orders:', video.placed_orders);
  console.log('  Placed Sales:', video.placed_sales);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page_no` | `number` | Yes | Page number (starting from 1) |
| `page_size` | `number` | Yes | Videos per page (max 20) |
| `period_type` | `string` | Yes | "Day", "Week", "Month", "Last7d", "Last15d", or "Last30d" |
| `end_date` | `string` | Yes | End date in "YYYY-MM-DD" format |
| `caption` | `string` | No | Filter by video caption text |
| `order_by` | `string` | Yes | Sort field: "Views", "Likes", "Comments", "AvgViewsDuration" |
| `sort` | `string` | Yes | Sort order: "asc" or "desc" |

**Returns:** `GetVideoPerformanceListResponse`
- `total_count`: Total matching videos
- `has_more`: Whether there are more pages
- `list`: Array of video performance data

---

### getProductPerformanceList()

**API Documentation:** [v2.video.get_prodcut_performance_list](https://open.shopee.com/documents/v2/v2.video.get_prodcut_performance_list?module=129&type=1)

Get performance data for products linked with Shopee Videos.

```typescript
const productPerf = await sdk.video.getProductPerformanceList({
  page_no: 1,
  page_size: 20,
  period_type: 'Last7d',
  end_date: '2025-10-30',
  order_by: 'PlacedSales', // PlacedOrders, PlacedSales, PlacedUniqueBuyers, ConfirmedOrders, ConfirmedSales, ConfirmedUniqueBuyers
  sort: 'desc',
  item_id: 123456, // Optional filter
  item_name: 'headphones', // Optional filter
});

productPerf.response.list.forEach((product) => {
  console.log('Product:', product.item_name);
  console.log('  Placed Orders:', product.placed_orders);
  console.log('  Placed Sales:', product.placed_sales);
  console.log('  Unique Buyers:', product.placed_unique_buyers);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page_no` | `number` | Yes | Page number (starting from 1) |
| `page_size` | `number` | Yes | Products per page (max 20) |
| `period_type` | `string` | Yes | "Day", "Week", "Month", "Last7d", "Last15d", or "Last30d" |
| `end_date` | `string` | Yes | End date in "YYYY-MM-DD" format |
| `item_id` | `number` | No | Filter by specific product ID |
| `item_name` | `string` | No | Filter by product name |
| `order_by` | `string` | Yes | Sort field: "PlacedOrders", "PlacedSales", "PlacedUniqueBuyers", "ConfirmedOrders", "ConfirmedSales", "ConfirmedUniqueBuyers" |
| `sort` | `string` | Yes | Sort order: "asc" or "desc" |

**Returns:** `GetProductPerformanceListResponse`
- `total_count`: Total matching products
- `has_more`: Whether there are more pages
- `list`: Array of product performance data with sales, orders, and buyer metrics

---

## Video Detail Analytics Methods

### getVideoDetailPerformance()

**API Documentation:** [v2.video.get_video_detail_performance](https://open.shopee.com/documents/v2/v2.video.get_video_detail_performance?module=129&type=1)

Get detailed performance data for a specific posted video.

```typescript
const detail = await sdk.video.getVideoDetailPerformance({
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
});

console.log('Video Info:');
console.log('  Caption:', detail.response.video_info.caption);
console.log('  Duration:', detail.response.video_info.duration, 'ms');
console.log('  Products:', detail.response.video_info.related_item_count);

console.log('Performance:');
console.log('  Views:', detail.response.video_performance.views);
console.log('  Likes:', detail.response.video_performance.likes);
console.log('  Placed Orders:', detail.response.video_performance.placed_orders);
console.log('  Conversion Rate:', detail.response.video_performance.conversion_rate);
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `post_id` | `string` | Yes | Unique identifier for posted Shopee video |

**Returns:** `GetVideoDetailPerformanceResponse`
- `video_info`: Post ID, time, URL, cover, caption, duration, and product count
- `video_performance`: Views, likes, comments, shares, followers growth, orders, sales, buyers, conversion rate, and other metrics

---

### getVideoDetailMetricTrend()

**API Documentation:** [v2.video.get_video_detail_metric_trend](https://open.shopee.com/documents/v2/v2.video.get_video_detail_metric_trend?module=129&type=1)

Get metric trends for a specific video over time.

```typescript
const trend = await sdk.video.getVideoDetailMetricTrend({
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
  metric_name: 'Views', // Views, Likes, Comments, Shares, FollowersGrowth, PlacedOrders, PlacedSales, etc.
});

// metric_trend is a map of timestamp -> value
Object.entries(trend.response.metric_trend).forEach(([timestamp, value]) => {
  const date = new Date(parseInt(timestamp));
  console.log(`${date.toLocaleDateString()}: ${value}`);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `post_id` | `string` | Yes | Unique identifier for posted Shopee video |
| `metric_name` | `string` | Yes | Metric to track: "Views", "Likes", "Comments", "Shares", "FollowersGrowth", "PlacedOrders", "PlacedSales", "UniqueBuyers", "ConversionRate", "SoldItems", "SalesPerOrder", "SalesPerBuyer" |

**Returns:** `GetVideoDetailMetricTrendResponse`
- `metric_trend`: Map of timestamp (milliseconds) to metric value

---

### getVideoDetailProductPerformance()

**API Documentation:** [v2.video.get_video_detail_product_performance](https://open.shopee.com/documents/v2/v2.video.get_video_detail_product_performance?module=129&type=1)

Get performance data for products linked with a specific video.

```typescript
const products = await sdk.video.getVideoDetailProductPerformance({
  page_no: 1,
  page_size: 20,
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
  item_id: 123456, // Optional filter
  item_name: 'headphones', // Optional filter
});

products.response.list.forEach((product) => {
  console.log('Product:', product.item_name);
  console.log('  Likes:', product.likes);
  console.log('  Comments:', product.comments);
  console.log('  Placed Orders:', product.placed_orders);
  console.log('  Product Clicks:', product.product_clicks);
  console.log('  Conversion Rate:', product.conversion_rate);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page_no` | `number` | Yes | Page number (starting from 1) |
| `page_size` | `number` | Yes | Products per page (max 20) |
| `post_id` | `string` | Yes | Unique identifier for posted Shopee video |
| `item_id` | `number` | No | Filter by specific product ID |
| `item_name` | `string` | No | Filter by product name |

**Returns:** `GetVideoDetailProductPerformanceResponse`
- `total_count`: Total matching products
- `has_more`: Whether there are more pages
- `list`: Array of product performance with likes, comments, orders, sales, clicks, and conversion metrics

---

## Audience & Demographics Methods

### getUserDemographics()

**API Documentation:** [v2.video.get_user_demographics](https://open.shopee.com/documents/v2/v2.video.get_user_demographics?module=129&type=1)

Get demographic information of video viewers across all videos.

```typescript
const demographics = await sdk.video.getUserDemographics();

// Age distribution (key: -1=Unknown, 1=18-24, 2=25-34, 3=35-44, 4=45+)
console.log('Age Distribution:', demographics.response.age);

// Gender distribution
console.log('Gender Distribution:', demographics.response.gender);
// Keys: Male, Female, Predicted Male, Predicted Female

// Location (top 10 cities)
console.log('Top Cities:', demographics.response.location);

// Identity (follower vs non-follower views)
console.log('Follower Status:', demographics.response.identity);
// Keys: "follow", "unfollow"

// Activity by hour (0-23)
console.log('Hourly Activity:', demographics.response.activity);

// Content interests (top 10 categories)
console.log('Content Interests:', demographics.response.content);

// Shopping interests (top 10 product categories)
console.log('Shopping Interests:', demographics.response.shopping);
```

**Parameters:** None

**Returns:** `GetUserDemographicsResponse`
- `age`: Age group distribution (map of age range key to viewer count)
- `gender`: Gender distribution (map of gender type to viewer count)
- `location`: Geographic distribution (map of city name to viewer count)
- `identity`: Follower vs non-follower distribution (map of status to view count)
- `activity`: Hourly activity (map of hour 0-23 to view count)
- `content`: Content category interests (map of category to view count)
- `shopping`: Product category interests (map of category to view count)

---

### getVideoDetailAudienceDistribution()

**API Documentation:** [v2.video.get_video_detail_audience_distribution](https://open.shopee.com/documents/v2/v2.video.get_video_detail_audience_distribution?module=129&type=1)

Get detailed audience distribution data for a specific video.

```typescript
const audience = await sdk.video.getVideoDetailAudienceDistribution({
  post_id: 'YwOo_gZqCACXbM0UAAAAAA==',
});

// Similar structure to getUserDemographics but for a specific video
console.log('Age Distribution:', audience.response.age);
console.log('Gender Distribution:', audience.response.gender);
console.log('Location Distribution:', audience.response.location);
console.log('Identity Distribution:', audience.response.identity);
console.log('Activity Pattern:', audience.response.activity);
console.log('Content Interests:', audience.response.content);
console.log('Shopping Interests:', audience.response.shopping);
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `post_id` | `string` | Yes | Unique identifier for posted Shopee video |

**Returns:** `GetVideoDetailAudienceDistributionResponse`
- `age`: Age distribution (map)
- `gender`: Gender distribution (map with keys: male, female, predictedMale, predictedFemale, unknown)
- `location`: Geographic distribution (map of city to viewer count)
- `identity`: Follower distribution (map with keys: 0=non-follower, 1=follower)
- `activity`: Hourly activity pattern (map of hour to view count)
- `content`: Content interests (map of category to view count)
- `shopping`: Shopping interests (map of category to view count)

---

## Complete Example

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.SINGAPORE
});

// Authenticate first
await sdk.authenticateWithCode('AUTH_CODE');

// 1. Upload video (use MediaManager or MediaSpaceManager)
// See MediaManager documentation for upload process

// 2. Get video_upload_id after upload completes
const videoUploadId = 'sg-11110199-6v99e-mgezdwct5eyya0';

// 3. Get cover images
const covers = await sdk.video.getCoverList({
  video_upload_id: videoUploadId,
});

// 4. Edit video information
await sdk.video.editVideoInfo({
  video_upload_list: [
    {
      video_upload_id: videoUploadId,
      caption: 'New product launch! Check it out! #shopee',
      cover_image_url: covers.response.image_url_list[0],
      item_info: [
        {
          item_id: 123456,
          custom_item_name: 'Amazing Product',
        },
      ],
      allow_info: {
        allow_duet: true,
        allow_stitch: true,
      },
      scheduled_info: {
        scheduled_post: false,
        scheduled_post_time: undefined,
      },
    },
  ],
});

// 5. Post video to Shopee Video
const postResult = await sdk.video.postVideo({
  video_upload_id_list: [videoUploadId],
});

const postId = postResult.response.success_list[0].post_id;
console.log('Video posted successfully:', postId);

// 6. Get video details
const detail = await sdk.video.getVideoDetail({
  post_id: postId,
});

console.log('Video caption:', detail.response.caption);
console.log('Video views:', detail.response.views);

// 7. Monitor performance (after some time)
const performance = await sdk.video.getVideoDetailPerformance({
  post_id: postId,
});

console.log('Performance Metrics:');
console.log('  Views:', performance.response.video_performance.views);
console.log('  Likes:', performance.response.video_performance.likes);
console.log('  Orders:', performance.response.video_performance.placed_orders);
console.log('  Sales:', performance.response.video_performance.placed_sales);

// 8. Get audience demographics
const demographics = await sdk.video.getVideoDetailAudienceDistribution({
  post_id: postId,
});

console.log('Audience Demographics:', demographics.response);

// 9. Get product performance
const products = await sdk.video.getVideoDetailProductPerformance({
  page_no: 1,
  page_size: 10,
  post_id: postId,
});

products.response.list.forEach((product) => {
  console.log(`${product.item_name}: ${product.placed_orders} orders`);
});

// 10. Get overview performance for all videos
const overview = await sdk.video.getOverviewPerformance({
  period_type: 'Last7d',
  end_date: '2025-01-31',
});

console.log('Total Views:', overview.response.engagement.total_views);
console.log('Total Sales:', overview.response.key_metric.placed_sales);
```

## Best Practices

### 1. Video Upload Workflow

Follow the complete workflow for uploading and posting videos:

```typescript
// Step 1: Upload video using MediaManager or MediaSpaceManager
// Step 2: Get video_upload_id from upload result
// Step 3: Get cover list
const covers = await sdk.video.getCoverList({ video_upload_id });

// Step 4: Edit video info with all required fields
await sdk.video.editVideoInfo({
  video_upload_list: [{
    video_upload_id,
    cover_image_url: covers.response.image_url_list[0],
    allow_info: { allow_duet: true, allow_stitch: true },
    scheduled_info: { scheduled_post: false },
    // ... other fields
  }]
});

// Step 5: Post video
await sdk.video.postVideo({ video_upload_id_list: [video_upload_id] });
```

### 2. Performance Tracking

Monitor video performance regularly with proper date formatting:

```typescript
// Always use proper date format for end_date
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const endDate = yesterday.toISOString().split('T')[0]; // "YYYY-MM-DD"

const performance = await sdk.video.getOverviewPerformance({
  period_type: 'Last7d',
  end_date: endDate, // Must be before current day
});
```

### 3. Pagination

Handle pagination properly for large result sets:

```typescript
async function getAllVideoPerformance(params) {
  const allVideos = [];
  let pageNo = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await sdk.video.getVideoPerformanceList({
      ...params,
      page_no: pageNo,
      page_size: 20,
    });

    allVideos.push(...result.response.list);
    hasMore = result.response.has_more;
    pageNo++;
  }

  return allVideos;
}
```

### 4. Error Handling

Handle batch operations and errors properly:

```typescript
const result = await sdk.video.postVideo({
  video_upload_id_list: videoIds,
});

// Check for partial failures
if (result.response.failure_list.length > 0) {
  console.log('Some videos failed to post:');
  result.response.failure_list.forEach((failure) => {
    console.log(`  ${failure.fail_video_upload_id}: ${failure.failed_reason}`);
  });
}

// Process successful posts
result.response.success_list.forEach((success) => {
  console.log(`Posted: ${success.success_video_upload_id} -> ${success.post_id}`);
});
```

### 5. Data Delay Awareness

Remember that performance data has at least a one-day delay:

```typescript
// Don't expect immediate performance data after posting
await sdk.video.postVideo({ video_upload_id_list: [videoId] });

// Wait at least 24 hours before checking performance
// Performance data is computed overnight
setTimeout(async () => {
  const performance = await sdk.video.getVideoDetailPerformance({
    post_id: postId,
  });
}, 24 * 60 * 60 * 1000);
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_param` | Invalid parameters | Check parameter formats and required fields |
| `batch_process_failed` | Batch operation had failures | Check failure_list for detailed reasons |
| `video_upload_id is illegal` | Video upload ID not found | Verify video was uploaded successfully |
| `post_id is illegal` | Post ID not found | Verify video was posted successfully |
| `caption length is more than 150` | Caption too long | Limit caption to 150 characters |
| `item size can not over 6` | Too many products | Link maximum 6 products per video |
| `video_upload_list can not over 5` | Too many videos in batch | Process maximum 5 videos per request |
| `periodType is Illegal` | Invalid period type | Use: Day, Week, Month, Last7d, Last15d, Last30d |
| `endDate is Illegal` | Invalid end date | Use YYYY-MM-DD format and align with period_type |
| `unauthorized` | User not authorized | Ensure user has Shopee Video Management permission |

## Related Managers

- **[MediaManager](./media.md)**: For uploading video files (older method)
- **[MediaSpaceManager](./media-space.md)**: For uploading video files (newer method)
- **[ProductManager](./product.md)**: For managing products linked to videos
- **[AuthManager](./auth.md)**: For authentication and authorization
