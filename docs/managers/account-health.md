# AccountHealthManager

The AccountHealthManager provides access to shop performance metrics and account health indicators.

## Overview

The AccountHealthManager provides methods for:
- Monitoring shop performance metrics across fulfillment, listing, and customer service
- Tracking penalty points and violation history
- Viewing punishment records and ongoing restrictions
- Identifying problematic listings that need improvement
- Managing late orders to avoid cancellations
- Getting detailed metric source information

## Quick Start

```typescript
// Get shop penalty information
const penalty = await sdk.accountHealth.getShopPenalty();
console.log('Penalty Points:', penalty.response.penalty_points.overall_penalty_points);

// Get shop performance metrics
const performance = await sdk.accountHealth.getShopPerformance();
console.log('Overall Rating:', performance.response.overall_performance.rating);

// Get late orders to prioritize shipping
const lateOrders = await sdk.accountHealth.getLateOrders({ page_size: 20 });
console.log('Late Orders:', lateOrders.response.total_count);

// Get listings with issues
const issues = await sdk.accountHealth.getListingsWithIssues({ page_size: 50 });
console.log('Problematic Listings:', issues.response.total_count);
```

## Important Notes

1. **Quarterly Reset**: Penalty points reset at the beginning of each quarter (first Monday)
2. **Permissions**: Requires shop-level authentication with appropriate permissions
3. **Pagination**: Most endpoints support pagination with `page_no` and `page_size` parameters
4. **Real-time Updates**: Metrics and penalties are updated regularly but may have slight delays

## Basic Concepts

### Performance Metrics (from `getShopPerformance()`)
- **Fulfillment Performance**: Late Shipment Rate, Non-Fulfillment Rate, Cancellation Rate, Return-refund Rate, Fast Handover Rate, On-time Pickup Failure Rate
- **Listing Performance**: Severe Listing Violations, Pre-order Listing %, Other Listing Violations
- **Customer Service Performance**: Chat Response Rate, Response Time, Shop Rating, Non-Responded Chats

### Penalty Points (from `getShopPenalty()`)
- **Overall Penalty Points**: Total accumulated points
- **By Category**: Non-fulfillment rate, Late shipment rate, Listing violations, OPFR violations, Others
- **Quarterly Reset**: Points reset on the first Monday of each quarter

### Punishments
- **Ongoing Punishments**: Active restrictions on your shop
- **Punishment Types**: Deboost, listing restrictions, marketing restrictions, account suspension, etc.
- **Punishment Tiers**: 1-5, with higher tiers having more severe consequences

## API Methods

### getShopPenalty()

Get the current penalty points and ongoing punishments for your shop.

```typescript
const penalty = await sdk.accountHealth.getShopPenalty();

console.log('Overall Penalty Points:', penalty.response.penalty_points.overall_penalty_points);
console.log('Non-fulfillment Rate:', penalty.response.penalty_points.non_fulfillment_rate);
console.log('Late Shipment Rate:', penalty.response.penalty_points.late_shipment_rate);
console.log('Listing Violations:', penalty.response.penalty_points.listing_violations);

// Check ongoing punishments
penalty.response.ongoing_punishment.forEach((punishment) => {
  console.log('Punishment:', punishment.punishment_name);
  console.log('Tier:', punishment.punishment_tier);
  console.log('Days Left:', punishment.days_left);
});
```

**Response Structure:**
- `penalty_points`: Breakdown of penalty points by category
- `ongoing_punishment`: List of active punishments with tier and duration

---

### getShopPerformance()

Get comprehensive performance metrics across all key dimensions.

```typescript
const performance = await sdk.accountHealth.getShopPerformance();

const overall = performance.response.overall_performance;
console.log('Overall Rating:', overall.rating); // 1=Poor, 2=ImprovementNeeded, 3=Good, 4=Excellent
console.log('Fulfillment Failed Metrics:', overall.fulfillment_failed);
console.log('Listing Failed Metrics:', overall.listing_failed);
console.log('Customer Service Failed Metrics:', overall.custom_service_failed);

// Analyze specific metrics
performance.response.metric_list.forEach((metric) => {
  console.log(`${metric.metric_name}:`);
  console.log('  Current:', metric.current_period, metric.unit);
  console.log('  Target:', metric.target.comparator, metric.target.value);
  console.log('  Last Period:', metric.last_period);
});
```

**Key Metric IDs:**
- `1`: Late Shipment Rate (All Channels)
- `3`: Non-Fulfilment Rate (All Channels)
- `12`: Pre-order Listing %
- `25`: Fast Handover Rate
- `42`: Cancellation Rate (All Channels)
- `43`: Return-refund Rate (All Channels)
- `52`: Severe Listing Violations

---

### getMetricSourceDetail()

Get detailed information about specific metrics, including affected orders or listings.

```typescript
// Get Non-Fulfilment Rate order details
const nfrDetails = await sdk.accountHealth.getMetricSourceDetail({
  metric_id: 3,
  page_size: 20,
});

nfrDetails.response.nfr_order_list?.forEach((order) => {
  console.log('Order:', order.order_sn);
  console.log('Type:', order.non_fulfillment_type);
  console.log('Reason:', order.detailed_reason);
});

// Get Listing Violations
const violations = await sdk.accountHealth.getMetricSourceDetail({
  metric_id: 52,
  page_size: 50,
});

violations.response.violation_listing_list?.forEach((listing) => {
  console.log('Item ID:', listing.item_id);
  console.log('Reason:', listing.detailed_reason);
  console.log('Updated:', new Date(listing.update_time * 1000));
});
```

**Supported Metric IDs:**
- `1`, `85`: Late Shipment Rate → `lsr_order_list`
- `3`, `88`: Non-Fulfilment Rate → `nfr_order_list`
- `4`: Preparation Time → `apt_order_list`
- `12`: Pre-order Listing % → `pre_order_listing_list`
- `15`: Pre-order Violation Days → `pre_order_listing_violation_data_list`
- `25`, `2001-2003`: Fast Handover Rate → `fhr_order_list`
- `28`: OPFR Violation → `opfr_day_detail_data_list`
- `42`, `91`: Cancellation Rate → `cancellation_order_list`
- `43`, `92`: Return-refund Rate → `return_refund_order_list`
- `52`, `53`: Listing Violations → `violation_listing_list`
- `96`: % SDD Listings → `sdd_listing_list`
- `97`: % NDD Listings → `ndd_listing_list`

---

### getPenaltyPointHistory()

Get historical records of penalty points issued during the current quarter.

```typescript
const history = await sdk.accountHealth.getPenaltyPointHistory({
  page_size: 50,
  violation_type: 5, // Optional: filter by violation type
});

console.log('Total Records:', history.response.total_count);

history.response.penalty_point_list.forEach((record) => {
  console.log('Issue Time:', new Date(record.issue_time * 1000));
  console.log('Original Points:', record.original_point_num);
  console.log('Latest Points:', record.latest_point_num);
  console.log('Violation Type:', record.violation_type);
  console.log('Reference ID:', record.reference_id);
});
```

**Parameters:**
- `page_no`: Page number (default: 1)
- `page_size`: Items per page, 1-100 (default: 10)
- `violation_type`: Filter by specific violation type (optional)

**Common Violation Types:**
- `5`: High Late Shipment Rate
- `6`: High Non-fulfilment Rate
- `9`: Prohibited Listings
- `10`: Counterfeit / IP infringement
- `11`: Spam

---

### getPunishmentHistory()

Get records of punishments applied during the current quarter.

```typescript
// Get ongoing punishments
const ongoing = await sdk.accountHealth.getPunishmentHistory({
  punishment_status: 1, // 1=Ongoing, 2=Ended
  page_size: 20,
});

ongoing.response.punishment_list.forEach((punishment) => {
  console.log('Punishment Type:', punishment.punishment_type);
  console.log('Reason/Tier:', punishment.reason);
  console.log('Start:', new Date(punishment.start_time * 1000));
  console.log('End:', new Date(punishment.end_time * 1000));
  
  if (punishment.listing_limit) {
    console.log('Listing Limit:', punishment.listing_limit);
  }
  if (punishment.order_limit) {
    console.log('Order Limit:', punishment.order_limit);
  }
});
```

**Parameters:**
- `punishment_status`: Required. 1 for Ongoing, 2 for Ended
- `page_no`: Page number (default: 1)
- `page_size`: Items per page, 1-100 (default: 10)

**Common Punishment Types:**
- `103`: Listings not displayed in category browsing
- `104`: Listings not displayed in search
- `105`: Unable to create new listings
- `106`: Unable to edit listings
- `107`: Unable to join marketing campaigns
- `109`: Account is suspended
- `1109-1112`: Listing Limit reduced
- `2008`: Order Limit applied

---

### getListingsWithIssues()

Get listings that have issues and need improvement.

```typescript
const issues = await sdk.accountHealth.getListingsWithIssues({
  page_size: 100,
});

console.log('Total Problematic Listings:', issues.response.total_count);

issues.response.listing_list.forEach((listing) => {
  console.log('Item ID:', listing.item_id);
  console.log('Reason:', listing.reason);
  // Reason values: 1=Prohibited, 2=Counterfeit, 3=Spam, 4=Inappropriate Image,
  // 5=Insufficient Info, 6=Mall Listing Improvement, 7=Other Listing Improvement
});
```

**Parameters:**
- `page_no`: Page number (default: 1)
- `page_size`: Items per page, 1-100 (default: 10)

**Issue Reasons:**
- `1`: Prohibited
- `2`: Counterfeit
- `3`: Spam
- `4`: Inappropriate Image
- `5`: Insufficient Info
- `6`: Mall Listing Improvement
- `7`: Other Listing Improvement

---

### getLateOrders()

Get orders that are late for shipping and need immediate attention.

```typescript
const lateOrders = await sdk.accountHealth.getLateOrders({
  page_size: 50,
});

console.log('Total Late Orders:', lateOrders.response.total_count);

lateOrders.response.late_order_list.forEach((order) => {
  console.log('Order SN:', order.order_sn);
  console.log('Shipping Deadline:', new Date(order.shipping_deadline * 1000));
  console.log('Late By Days:', order.late_by_days);
});

// Prioritize most urgent orders
const urgent = lateOrders.response.late_order_list
  .filter(order => order.late_by_days >= 2)
  .sort((a, b) => b.late_by_days - a.late_by_days);
```

**Parameters:**
- `page_no`: Page number (default: 1)
- `page_size`: Items per page, 1-100 (default: 10)

## Best Practices

### 1. Regular Monitoring

```typescript
async function dailyHealthCheck() {
  const [penalty, performance, lateOrders, issues] = await Promise.all([
    sdk.accountHealth.getShopPenalty(),
    sdk.accountHealth.getShopPerformance(),
    sdk.accountHealth.getLateOrders({ page_size: 100 }),
    sdk.accountHealth.getListingsWithIssues({ page_size: 100 }),
  ]);
  
  const alerts = [];
  
  // Check penalty points
  if (penalty.response.penalty_points.overall_penalty_points > 10) {
    alerts.push({
      severity: 'high',
      message: `Penalty points: ${penalty.response.penalty_points.overall_penalty_points}`,
    });
  }
  
  // Check ongoing punishments
  if (penalty.response.ongoing_punishment.length > 0) {
    alerts.push({
      severity: 'critical',
      message: `Active punishments: ${penalty.response.ongoing_punishment.length}`,
    });
  }
  
  // Check performance rating
  if (performance.response.overall_performance.rating < 3) {
    alerts.push({
      severity: 'medium',
      message: 'Performance rating needs improvement',
    });
  }
  
  // Check late orders
  if (lateOrders.response.total_count > 10) {
    alerts.push({
      severity: 'high',
      message: `Late orders: ${lateOrders.response.total_count}`,
    });
  }
  
  // Check problematic listings
  if (issues.response.total_count > 0) {
    alerts.push({
      severity: 'medium',
      message: `Problematic listings: ${issues.response.total_count}`,
    });
  }
  
  if (alerts.length > 0) {
    await notifyTeam(alerts);
  }
  
  return { penalty, performance, lateOrders, issues, alerts };
}

// Run daily
setInterval(dailyHealthCheck, 24 * 60 * 60 * 1000);
```

### 2. Handle Late Orders Proactively

```typescript
async function prioritizeLateOrders() {
  const lateOrders = await sdk.accountHealth.getLateOrders({
    page_size: 100,
  });
  
  if (lateOrders.response.total_count === 0) {
    console.log('✅ No late orders');
    return;
  }
  
  // Group by urgency
  const critical = lateOrders.response.late_order_list.filter(o => o.late_by_days >= 3);
  const urgent = lateOrders.response.late_order_list.filter(o => o.late_by_days === 2);
  const warning = lateOrders.response.late_order_list.filter(o => o.late_by_days === 1);
  
  console.log('🚨 Critical (3+ days late):', critical.length);
  console.log('⚠️  Urgent (2 days late):', urgent.length);
  console.log('⏰ Warning (1 day late):', warning.length);
  
  // Process critical orders first
  for (const order of critical) {
    await processUrgentOrder(order.order_sn);
    await notifyWarehouse(order.order_sn, 'CRITICAL');
  }
  
  return { critical, urgent, warning };
}

// Run every 4 hours
setInterval(prioritizeLateOrders, 4 * 60 * 60 * 1000);
```

### 3. Fix Problematic Listings

```typescript
async function fixListingIssues() {
  const issues = await sdk.accountHealth.getListingsWithIssues({
    page_size: 100,
  });
  
  if (issues.response.total_count === 0) {
    console.log('✅ No listing issues');
    return;
  }
  
  // Group by issue type
  const byReason: Record<number, number[]> = {};
  issues.response.listing_list.forEach((listing) => {
    if (!byReason[listing.reason]) {
      byReason[listing.reason] = [];
    }
    byReason[listing.reason].push(listing.item_id);
  });
  
  // Report and take action
  for (const [reason, itemIds] of Object.entries(byReason)) {
    const reasonText = {
      1: 'Prohibited',
      2: 'Counterfeit',
      3: 'Spam',
      4: 'Inappropriate Image',
      5: 'Insufficient Info',
      6: 'Mall Listing Improvement',
      7: 'Other Listing Improvement',
    }[Number(reason)] || 'Unknown';
    
    console.log(`Issue: ${reasonText} - ${itemIds.length} items`);
    
    // Take appropriate action
    if (Number(reason) === 5) {
      // Insufficient Info - update descriptions
      for (const itemId of itemIds) {
        await updateItemDescription(itemId);
      }
    } else if (Number(reason) === 4) {
      // Inappropriate Image - update images
      for (const itemId of itemIds) {
        await updateItemImages(itemId);
      }
    }
  }
  
  return byReason;
}

// Run weekly
setInterval(fixListingIssues, 7 * 24 * 60 * 60 * 1000);
```

### 4. Track Penalty Point Trends

```typescript
async function analyzePenaltyTrends() {
  const history = await sdk.accountHealth.getPenaltyPointHistory({
    page_size: 100,
  });
  
  if (history.response.total_count === 0) {
    console.log('✅ No penalty points in current quarter');
    return;
  }
  
  // Group by violation type
  const byViolationType: Record<number, { count: number; totalPoints: number }> = {};
  
  history.response.penalty_point_list.forEach((record) => {
    if (!byViolationType[record.violation_type]) {
      byViolationType[record.violation_type] = { count: 0, totalPoints: 0 };
    }
    byViolationType[record.violation_type].count++;
    byViolationType[record.violation_type].totalPoints += record.latest_point_num;
  });
  
  // Find most problematic areas
  const sorted = Object.entries(byViolationType)
    .sort(([, a], [, b]) => b.totalPoints - a.totalPoints);
  
  console.log('Top Violation Areas:');
  sorted.slice(0, 5).forEach(([type, data]) => {
    console.log(`Type ${type}: ${data.count} violations, ${data.totalPoints} points`);
  });
  
  return byViolationType;
}

async function checkPunishmentStatus() {
  const [ongoing, ended] = await Promise.all([
    sdk.accountHealth.getPunishmentHistory({
      punishment_status: 1,
      page_size: 50,
    }),
    sdk.accountHealth.getPunishmentHistory({
      punishment_status: 2,
      page_size: 50,
    }),
  ]);
  
  console.log('Ongoing Punishments:', ongoing.response.total_count);
  console.log('Ended Punishments:', ended.response.total_count);
  
  ongoing.response.punishment_list.forEach((p) => {
    const daysLeft = Math.ceil((p.end_time - Date.now() / 1000) / 86400);
    console.log(`Punishment Type ${p.punishment_type} - ${daysLeft} days left`);
  });
  
  return { ongoing, ended };
}
```

### 5. Analyze Metric Source Details

```typescript
async function analyzeMetricDetails() {
  const performance = await sdk.accountHealth.getShopPerformance();
  
  // Find metrics that failed to meet targets
  const failedMetrics = performance.response.metric_list.filter((metric) => {
    if (metric.current_period === null) return false;
    
    const { value, comparator } = metric.target;
    const current = metric.current_period;
    
    if (comparator === '<') return current >= value;
    if (comparator === '<=') return current > value;
    if (comparator === '>') return current <= value;
    if (comparator === '>=') return current < value;
    
    return false;
  });
  
  console.log(`Failed Metrics: ${failedMetrics.length}`);
  
  // Get details for each failed metric
  for (const metric of failedMetrics) {
    console.log(`\nAnalyzing: ${metric.metric_name}`);
    
    try {
      const details = await sdk.accountHealth.getMetricSourceDetail({
        metric_id: metric.metric_id,
        page_size: 20,
      });
      
      console.log(`Total Affected: ${details.response.total_count}`);
      
      // Handle different metric types
      if (details.response.nfr_order_list) {
        console.log('Non-Fulfillment Orders:', details.response.nfr_order_list.length);
      }
      if (details.response.lsr_order_list) {
        console.log('Late Shipment Orders:', details.response.lsr_order_list.length);
      }
      if (details.response.violation_listing_list) {
        console.log('Violation Listings:', details.response.violation_listing_list.length);
      }
    } catch (error) {
      console.log('Details not available for this metric');
    }
  }
  
  return failedMetrics;
}
```

## Dashboard Example

```typescript
async function generateHealthDashboard() {
  const [penalty, performance, lateOrders, issues, penaltyHistory] = await Promise.all([
    sdk.accountHealth.getShopPenalty(),
    sdk.accountHealth.getShopPerformance(),
    sdk.accountHealth.getLateOrders({ page_size: 10 }),
    sdk.accountHealth.getListingsWithIssues({ page_size: 10 }),
    sdk.accountHealth.getPenaltyPointHistory({ page_size: 10 }),
  ]);
  
  const dashboard = {
    timestamp: new Date(),
    
    overallHealth: {
      rating: performance.response.overall_performance.rating,
      ratingText: ['', 'Poor', 'Improvement Needed', 'Good', 'Excellent'][
        performance.response.overall_performance.rating
      ],
      penaltyPoints: penalty.response.penalty_points.overall_penalty_points,
      activePunishments: penalty.response.ongoing_punishment.length,
    },
    
    metrics: {
      fulfillmentFailed: performance.response.overall_performance.fulfillment_failed,
      listingFailed: performance.response.overall_performance.listing_failed,
      customerServiceFailed: performance.response.overall_performance.custom_service_failed,
    },
    
    urgentActions: {
      lateOrders: lateOrders.response.total_count,
      problematicListings: issues.response.total_count,
      recentPenalties: penaltyHistory.response.total_count,
    },
    
    punishments: penalty.response.ongoing_punishment.map((p) => ({
      name: p.punishment_name,
      tier: p.punishment_tier,
      daysLeft: p.days_left,
    })),
    
    topMetrics: performance.response.metric_list.slice(0, 10).map((m) => ({
      name: m.metric_name,
      current: m.current_period,
      target: `${m.target.comparator} ${m.target.value}`,
      unit: m.unit,
    })),
  };
  
  return dashboard;
}
```

## Performance Rating Guide

### Overall Performance Rating
- **4 (Excellent)**: All metrics meet or exceed targets
- **3 (Good)**: Most metrics meet targets with minor issues
- **2 (Improvement Needed)**: Several metrics below target
- **1 (Poor)**: Critical metrics failing, immediate action required

### Metric Units
- **1 (Number)**: Raw count value
- **2 (Percentage)**: Percentage value (0-100)
- **3 (Second)**: Time in seconds
- **4 (Day)**: Time in days
- **5 (Hour)**: Time in hours

### Violation Type Categories

**Fulfillment Issues:**
- `5`: High Late Shipment Rate
- `6`: High Non-fulfilment Rate
- `7`: High number of non-fulfilled orders
- `8`: High number of late shipped orders

**Listing Issues:**
- `9`: Prohibited Listings
- `10`: Counterfeit / IP infringement
- `11`: Spam
- `12`: Copy/Steal images
- `13`: Re-uploading deleted listings

**Customer Service Issues:**
- `21`: High No. of Non-responded Chat
- `22`: Rude chat replies
- `23`: Request buyer to cancel order
- `24`: Rude reply to buyer's review

## Error Handling

```typescript
try {
  const penalty = await sdk.accountHealth.getShopPenalty();
  
  if (penalty.error) {
    console.error('API Error:', penalty.error, penalty.message);
    return;
  }
  
  // Process successful response
  console.log('Penalty Points:', penalty.response.penalty_points.overall_penalty_points);
} catch (error) {
  console.error('Network or unexpected error:', error);
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_auth` | Authentication failed | Check access token validity |
| `error_param` | Invalid parameters | Verify parameter values and types |
| `error_permission_denied` | No permission | Verify shop permissions for account health |
| `error_data` | Data not available | Feature may not be available in your region |

## Related

- [OrderManager](./order.md) - Manage orders to improve fulfillment metrics
- [ProductManager](./product.md) - Fix listing issues and improve product quality
- [Authentication Guide](../guides/authentication.md) - API authentication setup

---

**Important Notes:**
- Penalty points reset quarterly (first Monday of each quarter)
- Metrics are updated regularly but may have slight delays
- Take immediate action on ongoing punishments to minimize impact
- Monitor late orders daily to avoid order cancellations
- Fix problematic listings promptly to avoid further penalties
