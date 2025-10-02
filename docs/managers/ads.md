# AdsManager

The AdsManager handles Shopee advertising campaigns and promotions.

## Overview

The AdsManager provides methods for managing advertising campaigns on Shopee, including:
- Creating and managing ad campaigns
- Setting budgets and bids
- Tracking ad performance
- Managing ad keywords and targeting

## Quick Start

```typescript
// Note: Ads functionality requires specific permissions
// and may not be available to all sellers

// Example usage would go here once you have ads permissions
const campaigns = await sdk.ads.getCampaignList({
  page_size: 20,
});
```

## Important Notes

1. **Permissions Required**: Advertising features require special permissions from Shopee
2. **Availability**: Not all regions support the Ads API
3. **Documentation**: Refer to [Shopee Open API Ads documentation](https://open.shopee.com/documents/v2/v2.ads.get_list?module=105&type=1) for detailed information

## Basic Concepts

### Campaign Types
- **Product Ads**: Promote specific products
- **Shop Ads**: Promote your entire shop
- **Discovery Ads**: Appear in discovery sections

### Bidding Strategies
- **Manual Bidding**: Set your own bid amounts
- **Auto Bidding**: Let Shopee optimize bids

### Budget Management
- **Daily Budget**: Maximum spend per day
- **Total Budget**: Maximum spend for campaign lifetime

## Common Operations

### Managing Campaigns

```typescript
// Get campaign list
const campaigns = await sdk.ads.getCampaignList({
  page_size: 50,
  page_no: 1,
});

// Get campaign details
const campaign = await sdk.ads.getCampaignDetail({
  campaign_id: 123456,
});

// Update campaign budget
await sdk.ads.updateCampaign({
  campaign_id: 123456,
  daily_budget: 100.00,
  status: 'ACTIVE',
});
```

### Managing Keywords

```typescript
// Add keywords to campaign
await sdk.ads.addKeyword({
  campaign_id: 123456,
  keywords: [
    {
      keyword: 'wireless headphones',
      bid: 0.50,
      match_type: 'BROAD',
    },
  ],
});

// Get keyword performance
const keywords = await sdk.ads.getKeywordList({
  campaign_id: 123456,
});
```

### Performance Tracking

```typescript
// Get campaign performance metrics
const performance = await sdk.ads.getCampaignPerformance({
  campaign_id: 123456,
  start_date: '2024-01-01',
  end_date: '2024-01-31',
});

console.log('Impressions:', performance.impressions);
console.log('Clicks:', performance.clicks);
console.log('Spend:', performance.spend);
console.log('Sales:', performance.sales);
console.log('ROI:', performance.roi);
```

## Best Practices

### 1. Start Small

```typescript
// Begin with modest budgets
const campaign = await sdk.ads.createCampaign({
  campaign_name: 'Test Campaign',
  daily_budget: 10.00, // Start small
  products: [{ item_id: 123456 }],
});
```

### 2. Monitor Performance

```typescript
async function monitorCampaignROI(campaignId: number) {
  const perf = await sdk.ads.getCampaignPerformance({
    campaign_id: campaignId,
    start_date: getDateDaysAgo(7),
    end_date: getTodayDate(),
  });
  
  const roi = (perf.sales - perf.spend) / perf.spend * 100;
  
  if (roi < 50) {
    console.warn(`⚠️ Low ROI: ${roi.toFixed(2)}%`);
    // Consider pausing or adjusting campaign
  }
}
```

### 3. A/B Test Keywords

```typescript
async function testKeywordVariations(campaignId: number) {
  const keywords = [
    { keyword: 'bluetooth headphones', bid: 0.40 },
    { keyword: 'wireless earbuds', bid: 0.45 },
    { keyword: 'noise cancelling headphones', bid: 0.50 },
  ];
  
  // Add all keywords
  await sdk.ads.addKeyword({
    campaign_id: campaignId,
    keywords: keywords.map(k => ({ ...k, match_type: 'EXACT' })),
  });
  
  // Monitor and keep best performers
  // ...
}
```

## Integration Example

```typescript
class AdsManager {
  async createProductCampaign(itemId: number, dailyBudget: number) {
    // Create campaign
    const campaign = await sdk.ads.createCampaign({
      campaign_name: `Product ${itemId} Campaign`,
      campaign_type: 'PRODUCT',
      daily_budget: dailyBudget,
      start_date: getTodayDate(),
      products: [{ item_id: itemId }],
    });
    
    // Add relevant keywords
    await sdk.ads.addKeyword({
      campaign_id: campaign.campaign_id,
      keywords: await this.generateKeywords(itemId),
    });
    
    return campaign;
  }
  
  private async generateKeywords(itemId: number): Promise<any[]> {
    // Get product details
    const product = await sdk.product.getItemBaseInfo({
      item_id_list: [itemId],
    });
    
    // Generate keywords from product name and category
    // Implementation depends on your strategy
    return [
      { keyword: product.item_list[0].item_name, bid: 0.50 },
      // More keywords...
    ];
  }
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_permission_denied` | No ads permission | Contact Shopee to enable ads features |
| `error_budget_insufficient` | Budget too low | Increase campaign budget |
| `error_keyword_invalid` | Invalid keyword | Check keyword format and restrictions |

## Resources

- [Shopee Ads API Documentation](https://open.shopee.com/documents/v2/v2.ads.get_list?module=105&type=1)
- Contact Shopee Partner Support for Ads API access

## Related

- [ProductManager](./product.md) - Manage products being advertised
- [Authentication Guide](../guides/authentication.md) - API authentication

---

**Note:** This manager requires special permissions. Contact Shopee Partner Support to enable advertising features for your application.
