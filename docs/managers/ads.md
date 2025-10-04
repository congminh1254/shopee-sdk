# AdsManager

The AdsManager handles Shopee advertising campaigns and promotions.

## Overview

The AdsManager provides comprehensive methods for managing advertising campaigns on Shopee, including:
- Creating and managing Auto Product Ads and Manual Product Ads
- Creating and managing GMS (Gross Merchandise Sales) campaigns
- Setting budgets, bids, and ROAS targets
- Tracking ad performance (hourly and daily)
- Managing ad keywords and targeting
- Getting budget suggestions and ROI recommendations

## Quick Start

```typescript
// Get total balance
const balance = await sdk.ads.getTotalBalance();
console.log('Available balance:', balance.response.total_balance);

// Get recommended items for advertising
const recommendedItems = await sdk.ads.getRecommendedItemList();
console.log('Recommended items:', recommendedItems.response);

// Get campaign IDs
const campaigns = await sdk.ads.getProductLevelCampaignIdList({
  ad_type: 'all',
  offset: 0,
  limit: 50,
});
```

## Important Notes

1. **Permissions Required**: Advertising features require special permissions from Shopee
2. **Availability**: Not all regions support the Ads API
3. **Reference ID**: Use a unique reference_id for create/edit operations to prevent duplicates
4. **Date Format**: All dates use DD-MM-YYYY format
5. **Documentation**: Refer to [Shopee Open API Ads documentation](https://open.shopee.com/documents?module=105&type=1)

## API Methods

### Account & Shop Information

- `getTotalBalance()` - Get real-time ads credit balance
- `getShopToggleInfo()` - Get shop toggle status (auto top-up, campaign surge)
- `getAdsFacilShopRate()` - Get shop rate for Ads Facil Program

### Recommendations & Suggestions

- `getRecommendedItemList()` - Get recommended SKUs with tags (best selling, best ROI, top search)
- `getRecommendedKeywordList()` - Get recommended keywords for an item
- `getProductRecommendedRoiTarget()` - Get recommended ROI targets
- `getCreateProductAdBudgetSuggestion()` - Get budget suggestions before creating ads

### Auto Product Ads

- `createAutoProductAds()` - Create Auto Product Ads
- `editAutoProductAds()` - Edit existing Auto Product Ads (budget, duration, status)

### Manual Product Ads

- `createManualProductAds()` - Create Manual Product Ads with full control
- `editManualProductAds()` - Edit existing Manual Product Ads
- `editManualProductAdKeywords()` - Add/edit/delete keywords for Manual Product Ads

### GMS Campaigns

- `checkCreateGmsProductCampaignEligibility()` - Check eligibility for creating GMS campaign
- `createGmsProductCampaign()` - Create GMS campaign
- `editGmsProductCampaign()` - Edit GMS campaign settings
- `editGmsItemProductCampaign()` - Add/remove items from GMS campaign
- `listGmsUserDeletedItem()` - List items removed from GMS campaign

### Campaign Information

- `getProductLevelCampaignIdList()` - Get list of all campaign IDs
- `getProductLevelCampaignSettingInfo()` - Get detailed campaign settings (4 info types)

### Performance Metrics

- `getAllCpcAdsHourlyPerformance()` - Shop-level hourly performance
- `getAllCpcAdsDailyPerformance()` - Shop-level daily performance
- `getProductCampaignDailyPerformance()` - Product-level campaign daily performance
- `getProductCampaignHourlyPerformance()` - Product-level campaign hourly performance
- `getGmsCampaignPerformance()` - GMS campaign performance
- `getGmsItemPerformance()` - GMS item-level performance

## Example: Complete Campaign Lifecycle

```typescript
// 1. Check balance
const balance = await sdk.ads.getTotalBalance();

// 2. Get recommended items
const items = await sdk.ads.getRecommendedItemList();
const topItem = items.response[0];

// 3. Get budget suggestion
const budget = await sdk.ads.getCreateProductAdBudgetSuggestion({
  reference_id: 'budget-001',
  product_selection: 'manual',
  campaign_placement: 'all',
  bidding_method: 'auto',
  item_id: topItem.item_id,
});

// 4. Create campaign
const campaign = await sdk.ads.createManualProductAds({
  reference_id: 'campaign-001',
  budget: budget.response.budget.recommended_budget || 100.0,
  start_date: '01-01-2024',
  bidding_method: 'auto',
  item_id: topItem.item_id,
  roas_target: 3.0,
});

// 5. Monitor performance
const perf = await sdk.ads.getProductCampaignDailyPerformance({
  start_date: '01-01-2024',
  end_date: '31-01-2024',
  campaign_id_list: campaign.response.campaign_id.toString(),
});
```

## Best Practices

1. **Use Reference IDs** - Generate unique IDs to prevent duplicate campaigns
2. **Check Eligibility** - Use `checkCreateGmsProductCampaignEligibility()` before creating GMS campaigns
3. **Get Suggestions** - Use budget and ROI suggestions for optimal campaign setup
4. **Monitor Regularly** - Track performance metrics to optimize campaigns
5. **Optimize Keywords** - Regularly review and update keywords based on performance

## Performance Metrics Explained

### Direct vs Broad Metrics

- **Direct**: Performance of the advertised product specifically
- **Broad**: Performance of any shop product after ad click

### Key Metrics

- **CTR**: Click-Through Rate (Clicks / Impressions × 100%)
- **CR**: Conversion Rate (Conversions / Clicks × 100%)
- **ROAS**: Return on Ad Spend (GMV / Expense)
- **CPC**: Cost Per Click (Expense / Clicks)

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_permission_denied` | No ads permission | Contact Shopee Support |
| `ads.campaign.error_budget_range` | Invalid budget | Use budget suggestion API |
| `ads.campaign.error_date_setting` | Invalid date | Ensure start >= today |
| `ads.rate_limit.exceed_api` | Too many requests | Reduce request rate |

## Resources

- [Shopee Ads API Documentation](https://open.shopee.com/documents?module=105&type=1)
- Contact Shopee Partner Support for Ads API access

---

**Note:** This manager requires special permissions. Contact Shopee Partner Support to enable advertising features.
