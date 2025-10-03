# FollowPrizeManager

The FollowPrizeManager handles follow prize activity creation, management, and configuration for rewarding shop followers.

## Overview

The FollowPrizeManager provides methods for:
- Creating follow prize activities to reward shop followers
- Managing follow prize lifecycle (update, end, delete)
- Retrieving follow prize information and lists
- Supporting multiple reward types (fix amount, percentage, coin cashback)

## Quick Start

```typescript
// Create a new follow prize with fix amount discount
const followPrize = await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'Welcome Followers',
  start_time: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
  end_time: Math.floor(Date.now() / 1000) + 30 * 86400, // Lasts 30 days
  usage_quantity: 1000,
  min_spend: 50,
  reward_type: 1, // Fix amount discount
  discount_amount: 10,
});

// Get follow prize details
const details = await sdk.followPrize.getFollowPrizeDetail({
  campaign_id: followPrize.response.campagin_id,
});

// Get list of all follow prizes
const list = await sdk.followPrize.getFollowPrizeList({
  status: 'all',
  page_no: 1,
  page_size: 20,
});
```

## Methods

### addFollowPrize()

**API Documentation:** [v2.follow_prize.add_follow_prize](https://open.shopee.com/documents/v2/v2.follow_prize.add_follow_prize?module=113&type=1)

Create a new follow prize activity to reward shop followers.

```typescript
// Fix amount discount
const response = await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'New Follower Gift',
  start_time: 1621844677,
  end_time: 1621944677,
  usage_quantity: 2000,
  min_spend: 200,
  reward_type: 1, // Fix amount
  discount_amount: 50,
});

// Percentage discount
const response = await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'Follower Discount 10%',
  start_time: 1621844677,
  end_time: 1621944677,
  usage_quantity: 1000,
  min_spend: 100,
  reward_type: 2, // Percentage
  percentage: 10,
  max_price: 50,
});

// Coin cashback
const response = await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'Coins Reward',
  start_time: 1621844677,
  end_time: 1621944677,
  usage_quantity: 500,
  min_spend: 150,
  reward_type: 3, // Coin cashback
  percentage: 5,
  max_price: 20,
});

console.log('Follow prize created:', response.response.campagin_id);
```

**Reward Types:**
- `1`: **Fix Amount Discount** - Requires `discount_amount` parameter
- `2`: **Percentage Discount** - Requires `percentage` and `max_price` parameters
- `3`: **Coin Cashback** - Requires `percentage` and `max_price` parameters

**Important Notes:**
- Follow prize name maximum length is 20 characters
- Start time must be later than current time
- End time must be at least 1 day after start time
- End time cannot exceed 3 months after start time
- Usage quantity must be between 1 and 200,000
- Percentage must be between 1 and 99
- Maximum 1000 ongoing and upcoming follow prizes
- Follow prizes cannot overlap in time period

**Common Errors:**
- `follow_prize.campaign_num_max_limit`: Maximum number of follow prizes reached (1000)
- `follow_prize.campaign_overlap`: Another follow prize exists during this time period
- `follow_prize.name_length_limit`: Name exceeds 20 characters
- `follow_prize.quota_out_range`: Usage quantity not between 1-200,000

---

### deleteFollowPrize()

**API Documentation:** [v2.follow_prize.delete_follow_prize](https://open.shopee.com/documents/v2/v2.follow_prize.delete_follow_prize?module=113&type=1)

Delete an upcoming follow prize activity.

```typescript
const response = await sdk.followPrize.deleteFollowPrize({
  campaign_id: 24255,
});

console.log('Deleted follow prize:', response.response.campagin_id);
```

**Important Notes:**
- Can only delete **upcoming** follow prizes (not started yet)
- Cannot delete ongoing or expired follow prizes
- Use `endFollowPrize()` to stop an ongoing follow prize

**Common Errors:**
- `follow_prize.campaign_none`: The promotion ID does not exist
- `follow_prize.delete_type`: Only upcoming promotions can be deleted

---

### endFollowPrize()

**API Documentation:** [v2.follow_prize.end_follow_prize](https://open.shopee.com/documents/v2/v2.follow_prize.end_follow_prize?module=113&type=1)

End an ongoing follow prize activity immediately.

```typescript
const response = await sdk.followPrize.endFollowPrize({
  campaign_id: 123344,
});

console.log('Ended follow prize:', response.response.campaign_id);
```

**Important Notes:**
- Can only end **ongoing** follow prizes
- Cannot end upcoming or expired follow prizes
- Once ended, the follow prize cannot be restarted

**Common Errors:**
- `follow_prize.campaign_none`: The promotion ID does not exist
- `follow_prize.end_type`: Only ongoing follow prizes can be ended

---

### getFollowPrizeDetail()

**API Documentation:** [v2.follow_prize.get_follow_prize_detail](https://open.shopee.com/documents/v2/v2.follow_prize.get_follow_prize_detail?module=113&type=1)

Get detailed information about a follow prize activity.

```typescript
const response = await sdk.followPrize.getFollowPrizeDetail({
  campaign_id: 1551,
});

console.log('Follow Prize Details:');
console.log('Status:', response.response.campaign_status); // upcoming/ongoing/expired
console.log('Name:', response.response.follow_prize_name);
console.log('Start:', new Date(response.response.start_time * 1000));
console.log('End:', new Date(response.response.end_time * 1000));
console.log('Usage Quantity:', response.response.usage_quantity);
console.log('Min Spend:', response.response.min_spend);
console.log('Reward Type:', response.response.reward_type);

// For fix amount discount
if (response.response.reward_type === 1) {
  console.log('Discount Amount:', response.response.discount_amount);
}

// For percentage discount or coin cashback
if (response.response.reward_type === 2 || response.response.reward_type === 3) {
  console.log('Percentage:', response.response.percentage);
  console.log('Max Price:', response.response.max_price);
}
```

**Response Fields:**
- `campaign_status`: Current status (upcoming/ongoing/expired)
- `campaign_id`: Unique identifier
- `follow_prize_name`: Name of the follow prize
- `start_time`/`end_time`: Validity period (unix timestamps)
- `usage_quantity`: Total vouchers available
- `min_spend`: Minimum basket price required
- `reward_type`: Type of reward (1, 2, or 3)
- `discount_amount`: For fix amount type
- `percentage`: For percentage or coin cashback type
- `max_price`: Maximum discount/cashback value

---

### getFollowPrizeList()

**API Documentation:** [v2.follow_prize.get_follow_prize_list](https://open.shopee.com/documents/v2/v2.follow_prize.get_follow_prize_list?module=113&type=1)

Get a paginated list of follow prize activities.

```typescript
// Get all upcoming follow prizes
const response = await sdk.followPrize.getFollowPrizeList({
  status: 'upcoming',
  page_no: 1,
  page_size: 100,
});

console.log('Has more pages:', response.response.more);
response.response.follow_prize_list.forEach((prize) => {
  console.log(`ID: ${prize.campaign_id}`);
  console.log(`Name: ${prize.follow_prize_name}`);
  console.log(`Status: ${prize.campaign_status}`);
  console.log(`Quantity: ${prize.usage_quantity}`);
  console.log(`Claimed: ${prize.claimed}`);
  console.log('---');
});

// Get all follow prizes
const allPrizes = await sdk.followPrize.getFollowPrizeList({
  status: 'all',
  page_no: 1,
  page_size: 20,
});
```

**Status Filters:**
- `"upcoming"`: Follow prizes that haven't started yet
- `"ongoing"`: Currently active follow prizes
- `"expired"`: Follow prizes that have ended
- `"all"`: All follow prizes regardless of status

**Pagination:**
- `page_no`: Page number (default: 1)
- `page_size`: Items per page (default: 20, max: 100)
- `more`: Boolean indicating if there are more pages

**Response List Fields:**
- `campaign_id`: Unique identifier
- `campaign_status`: Current status
- `follow_prize_name`: Name of the follow prize
- `start_time`/`end_time`: Validity period
- `usage_quantity`: Total vouchers available
- `claimed`: Number of vouchers already claimed

---

### updateFollowPrize()

**API Documentation:** [v2.follow_prize.update_follow_prize](https://open.shopee.com/documents/v2/v2.follow_prize.update_follow_prize?module=113&type=1)

Update an existing follow prize activity.

```typescript
// Update multiple fields
const response = await sdk.followPrize.updateFollowPrize({
  campaign_id: 3434334,
  follow_prize_name: 'Updated Prize Name',
  start_time: 1621844677,
  end_time: 1621944677,
  usage_quantity: 3000,
  min_spend: 250,
});

// Update only usage quantity
const response = await sdk.followPrize.updateFollowPrize({
  campaign_id: 3434334,
  usage_quantity: 5000,
});

console.log('Updated follow prize:', response.response.campagin_id);
```

**Update Restrictions:**

For **Upcoming** Follow Prizes:
- ✅ Can update all fields
- ⚠️ Start time can only be changed to a **later** timing
- ⚠️ End time can only be changed to an **earlier** timing
- ⚠️ Cannot reduce usage quantity (can only increase)

For **Ongoing** Follow Prizes:
- ❌ Cannot rename (update `follow_prize_name`)
- ❌ Cannot update start time
- ❌ Cannot update minimum basket price (`min_spend`)
- ✅ Can update end time (only to earlier timing)
- ✅ Can increase usage quantity (cannot reduce)

For **Expired** Follow Prizes:
- ❌ Cannot update any fields

**Common Errors:**
- `follow_prize.campaign_none`: Promotion ID does not exist
- `follow_prize.update_expired_campaign`: Cannot update expired follow prizes
- `follow_prize.update_prize_name_ongoing`: Cannot rename ongoing follow prizes
- `follow_prize.update_min_spend_ongoing`: Cannot update min spend for ongoing
- `follow_prize.update_start_time_ongoing`: Cannot update start time for ongoing
- `follow_prize.update_start_time_earlier`: Start time can only be changed to later
- `follow_prize.update_end_time_later`: End time can only be changed to earlier
- `follow_prize.update_quantity_reduce`: Cannot reduce dispatch quantity

---

## Best Practices

### 1. Planning Follow Prize Campaigns

```typescript
// Schedule campaigns in advance
const startDate = new Date();
startDate.setDate(startDate.getDate() + 7); // Start in 7 days
const endDate = new Date(startDate);
endDate.setMonth(endDate.getMonth() + 1); // Run for 1 month

await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'Monthly Follower',
  start_time: Math.floor(startDate.getTime() / 1000),
  end_time: Math.floor(endDate.getTime() / 1000),
  usage_quantity: 10000,
  min_spend: 100,
  reward_type: 2,
  percentage: 15,
  max_price: 50,
});
```

### 2. Monitoring Follow Prize Performance

```typescript
// Regular monitoring
const ongoing = await sdk.followPrize.getFollowPrizeList({
  status: 'ongoing',
  page_no: 1,
  page_size: 50,
});

ongoing.response.follow_prize_list.forEach((prize) => {
  const claimRate = (prize.claimed / prize.usage_quantity) * 100;
  console.log(`${prize.follow_prize_name}: ${claimRate.toFixed(1)}% claimed`);
  
  // Consider increasing quantity if claim rate is high
  if (claimRate > 80) {
    console.log(`⚠️ Consider increasing quantity for campaign ${prize.campaign_id}`);
  }
});
```

### 3. Handling Updates Carefully

```typescript
// Safe update pattern
try {
  const detail = await sdk.followPrize.getFollowPrizeDetail({
    campaign_id: campaignId,
  });
  
  // Check status before updating
  if (detail.response.campaign_status === 'upcoming') {
    // Can update most fields
    await sdk.followPrize.updateFollowPrize({
      campaign_id: campaignId,
      usage_quantity: detail.response.usage_quantity + 1000,
    });
  } else if (detail.response.campaign_status === 'ongoing') {
    // Limited updates for ongoing campaigns
    await sdk.followPrize.updateFollowPrize({
      campaign_id: campaignId,
      usage_quantity: detail.response.usage_quantity + 500, // Can only increase
    });
  } else {
    console.log('Cannot update expired campaign');
  }
} catch (error) {
  console.error('Update failed:', error);
}
```

### 4. Preventing Overlap

```typescript
// Check for overlaps before creating
const existing = await sdk.followPrize.getFollowPrizeList({
  status: 'all',
  page_no: 1,
  page_size: 100,
});

const newStart = Math.floor(Date.now() / 1000) + 86400;
const newEnd = newStart + 30 * 86400;

const hasOverlap = existing.response.follow_prize_list.some((prize) => {
  return (
    (newStart >= prize.start_time && newStart <= prize.end_time) ||
    (newEnd >= prize.start_time && newEnd <= prize.end_time) ||
    (newStart <= prize.start_time && newEnd >= prize.end_time)
  );
});

if (hasOverlap) {
  console.log('⚠️ Time period overlaps with existing campaign');
} else {
  await sdk.followPrize.addFollowPrize({
    // ... campaign details
  });
}
```

### 5. Choosing the Right Reward Type

```typescript
// Fix amount - Simple and predictable
// Best for: New shops, clear value communication
await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'New Follower $10',
  reward_type: 1,
  discount_amount: 10,
  min_spend: 50,
  // ...
});

// Percentage - Scales with order value
// Best for: Higher order values, premium products
await sdk.followPrize.addFollowPrize({
  follow_prize_name: '20% Off',
  reward_type: 2,
  percentage: 20,
  max_price: 100, // Cap the discount
  min_spend: 200,
  // ...
});

// Coin cashback - Encourages platform engagement
// Best for: Building loyalty, repeat purchases
await sdk.followPrize.addFollowPrize({
  follow_prize_name: 'Coins Reward',
  reward_type: 3,
  percentage: 5,
  max_price: 50,
  min_spend: 100,
  // ...
});
```

## Error Handling

```typescript
try {
  const result = await sdk.followPrize.addFollowPrize({
    follow_prize_name: 'Summer Sale',
    start_time: Math.floor(Date.now() / 1000) + 3600,
    end_time: Math.floor(Date.now() / 1000) + 30 * 86400,
    usage_quantity: 1000,
    min_spend: 100,
    reward_type: 1,
    discount_amount: 20,
  });
  
  if (result.error) {
    switch (result.error) {
      case 'follow_prize.campaign_num_max_limit':
        console.error('Too many active campaigns. Delete or end some first.');
        break;
      case 'follow_prize.campaign_overlap':
        console.error('Time period overlaps with existing campaign.');
        break;
      case 'follow_prize.name_length_limit':
        console.error('Name too long. Max 20 characters.');
        break;
      default:
        console.error('Error:', result.error, result.message);
    }
  } else {
    console.log('Success! Campaign ID:', result.response.campagin_id);
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

## Complete Example

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: YOUR_PARTNER_KEY,
  shop_id: YOUR_SHOP_ID,
});

async function manageFollowPrize() {
  try {
    // Create a new follow prize
    const newPrize = await sdk.followPrize.addFollowPrize({
      follow_prize_name: 'Welcome Gift',
      start_time: Math.floor(Date.now() / 1000) + 3600,
      end_time: Math.floor(Date.now() / 1000) + 30 * 86400,
      usage_quantity: 5000,
      min_spend: 100,
      reward_type: 2,
      percentage: 15,
      max_price: 50,
    });
    
    const campaignId = newPrize.response.campagin_id;
    console.log('Created campaign:', campaignId);
    
    // Get details
    const details = await sdk.followPrize.getFollowPrizeDetail({
      campaign_id: campaignId,
    });
    console.log('Campaign details:', details.response);
    
    // Update if needed
    if (details.response.campaign_status === 'upcoming') {
      await sdk.followPrize.updateFollowPrize({
        campaign_id: campaignId,
        usage_quantity: 10000, // Increase quantity
      });
      console.log('Updated campaign quantity');
    }
    
    // List all campaigns
    const list = await sdk.followPrize.getFollowPrizeList({
      status: 'ongoing',
      page_no: 1,
      page_size: 20,
    });
    console.log('Ongoing campaigns:', list.response.follow_prize_list.length);
    
  } catch (error) {
    console.error('Error managing follow prize:', error);
  }
}

manageFollowPrize();
```
