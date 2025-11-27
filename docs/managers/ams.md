# AmsManager

The AmsManager handles Shopee Affiliate Marketing Solution (AMS) operations.

## Overview

The AmsManager provides comprehensive methods for managing affiliate marketing campaigns on Shopee, including:
- Creating and managing Open Campaigns (shop-wide affiliate marketing)
- Creating and managing Targeted Campaigns (specific products/affiliates)
- Tracking affiliate and product performance
- Managing commission rates and campaign settings
- Finding and managing affiliates

## Quick Start

```typescript
// Get shop suggested commission rate
const suggestedRate = await sdk.ams.getShopSuggestedRate();
console.log('Suggested commission rate:', suggestedRate.response.suggested_rate);

// Get shop performance
const performance = await sdk.ams.getShopPerformance({
  period_type: 'Last30d',
  start_date: '20250101',
  end_date: '20250131',
  order_type: 'ConfirmedOrder',
  channel: 'AllChannel',
});
console.log('Total sales:', performance.response.sales);

// Get targeted campaign list
const campaigns = await sdk.ams.getTargetedCampaignList();
console.log('Campaigns:', campaigns.response.campaign_list);
```

## Important Notes

1. **Permissions Required**: AMS features require the "Affiliate Marketing Solution Management" permission
2. **Period Types**: Valid period types are: `Day`, `Week`, `Month`, `Last7d`, `Last30d`
3. **Date Format**: All dates use YYYYMMDD format (e.g., "20250101")
4. **Permanent End Time**: Use Unix timestamp `32503651199` for campaigns with no end date
5. **Commission Rate**: Rates are specified as percentages (e.g., 5.5 means 5.5%)
6. **Documentation**: Refer to [Shopee Open API AMS documentation](https://open.shopee.com/documents?module=127&type=1)

## API Methods

### Open Campaign Management

Open campaigns allow all affiliates to promote your products.

- `addAllProductsToOpenCampaign(params)` - Add all products to open campaign
- `batchAddProductsToOpenCampaign(params)` - Add specific products to open campaign
- `batchEditProductsOpenCampaignSetting(params)` - Edit settings for multiple products
- `batchRemoveProductsOpenCampaignSetting(params)` - Remove products from open campaign
- `editAllProductsOpenCampaignSetting(params)` - Edit settings for all products
- `removeAllProductsOpenCampaignSetting()` - Remove all products from open campaign
- `getOpenCampaignAddedProduct(params)` - Get products added to open campaign
- `getOpenCampaignNotAddedProduct(params)` - Get products not in open campaign
- `getOpenCampaignBatchTaskResult(params)` - Check status of batch operations
- `getOpenCampaignPerformance(params)` - Get open campaign performance data

### Targeted Campaign Management

Targeted campaigns allow you to work with specific affiliates on specific products.

- `createNewTargetedCampaign(params)` - Create a new targeted campaign
- `updateBasicInfoOfTargetedCampaign(params)` - Update campaign basic information
- `editProductListOfTargetedCampaign(params)` - Add/remove/edit products in campaign
- `editAffiliateListOfTargetedCampaign(params)` - Add/remove affiliates from campaign
- `terminateTargetedCampaign(params)` - Terminate an active campaign
- `getTargetedCampaignList(params)` - Get list of targeted campaigns
- `getTargetedCampaignSettings(params)` - Get detailed campaign settings
- `getTargetedCampaignAddableProductList(params)` - Get products that can be added
- `getTargetedCampaignPerformance(params)` - Get targeted campaign performance

### Performance & Analytics

- `getShopPerformance(params)` - Get shop-level affiliate performance
- `getProductPerformance(params)` - Get product-level performance
- `getAffiliatePerformance(params)` - Get affiliate-level performance
- `getContentPerformance(params)` - Get content performance (videos, livestreams)
- `getCampaignKeyMetricsPerformance(params)` - Get aggregated campaign metrics
- `getConversionReport(params)` - Get detailed conversion data
- `getPerformanceDataUpdateTime(params)` - Get latest data update timestamp

### Affiliate Management

- `queryAffiliateList(params)` - Search for affiliates by ID or name
- `getManagedAffiliateList(params)` - Get list of managed affiliates
- `getRecommendedAffiliateList(params)` - Get recommended affiliates

### Rate Recommendations

- `getShopSuggestedRate()` - Get suggested commission rate for shop
- `batchGetProductsSuggestedRate(params)` - Get suggested rates for products
- `getOptimizationSuggestionProduct(params)` - Get products with optimization suggestions

### Settings

- `getAutoAddNewProductToggleStatus()` - Check auto-add new product status
- `updateAutoAddNewProductSetting(params)` - Enable/disable auto-add new product

### Validation

- `getValidationList()` - Get list of validation periods
- `getValidationReport(params)` - Get validation report data

## Example: Create a Targeted Campaign

```typescript
// 1. Get suggested commission rate for products
const suggestions = await sdk.ams.batchGetProductsSuggestedRate({
  item_id_list: '101,102,103',
});

// 2. Find affiliates to invite
const affiliates = await sdk.ams.getRecommendedAffiliateList({ page_size: 10 });

// 3. Create the targeted campaign
const campaign = await sdk.ams.createNewTargetedCampaign({
  campaign_name: 'Summer Sale 2025',
  period_start_time: Math.floor(Date.now() / 1000),
  period_end_time: 32503651199, // No end date
  is_set_budget: true,
  budget: 500000, // In local currency cents
  seller_message: 'Welcome to our affiliate program!',
  item_list: [
    { item_id: 101, rate: 5.5 },
    { item_id: 102, rate: 6.0 },
  ],
  affiliate_list: [
    { affiliate_id: affiliates.response.affiliate_list[0].affiliate_id },
  ],
});

console.log('Created campaign:', campaign.response.campaign_id);

// 4. Check for any failed items or affiliates
if (campaign.response.fail_item_list?.length) {
  console.log('Failed items:', campaign.response.fail_item_list);
}
```

## Example: Set Up Open Campaign

```typescript
// 1. Add all products to open campaign with 5% commission
const task = await sdk.ams.addAllProductsToOpenCampaign({
  commission_rate: 5.0,
  period_start_time: Math.floor(Date.now() / 1000),
  period_end_time: 32503651199,
});

// 2. Poll for task completion
let taskResult;
do {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  taskResult = await sdk.ams.getOpenCampaignBatchTaskResult({
    task_id: task.response.task_id,
  });
} while (taskResult.response.status === 'processing');

console.log('Task completed:', taskResult.response);

// 3. Enable auto-add new products
await sdk.ams.updateAutoAddNewProductSetting({
  open: true,
  commission_rate: 5.0,
});
```

## Example: Track Campaign Performance

```typescript
// Get performance data update time first
const updateTime = await sdk.ams.getPerformanceDataUpdateTime({
  marker_type: 'AmsMarker',
});
console.log('Data available until:', updateTime.response.latest_data_date);

// Get shop performance for last 30 days
const shopPerformance = await sdk.ams.getShopPerformance({
  period_type: 'Last30d',
  start_date: '20250101',
  end_date: '20250131',
  order_type: 'ConfirmedOrder',
  channel: 'AllChannel',
});

console.log('Performance Summary:');
console.log('- Sales:', shopPerformance.response.sales);
console.log('- Orders:', shopPerformance.response.orders);
console.log('- Est. Commission:', shopPerformance.response.est_commission);
console.log('- ROI:', shopPerformance.response.roi);
console.log('- New Buyers:', shopPerformance.response.new_buyers);

// Get top performing affiliates
const affiliatePerformance = await sdk.ams.getAffiliatePerformance({
  period_type: 'Last30d',
  start_date: '20250101',
  end_date: '20250131',
  page_no: 1,
  page_size: 10,
});

affiliatePerformance.response.data_list?.forEach(affiliate => {
  console.log(`Affiliate ${affiliate.affiliate_id}: ${affiliate.sales} sales`);
});
```

## Period Type Guidelines

| Period Type | Start Date | End Date |
|------------|------------|----------|
| Day | Any day in past 3 months | Same as start_date |
| Week | A Sunday | Following Saturday |
| Month | 1st of month | Last day of month |
| Last7d | 6 days before latest data date | Latest data date |
| Last30d | 29 days before latest data date | Latest data date |

## Order Types

- `PlacedOrder` - Orders that buyers have placed (includes paid and unpaid)
- `ConfirmedOrder` - Non-COD orders that are paid, or COD orders confirmed for shipping

## Channels

- `AllChannel` - All affiliate channels
- `SocialMedia` - Social media channels
- `ShopeeVideo` - Shopee Video content
- `LiveStreaming` - Livestream content
