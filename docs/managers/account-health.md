# AccountHealthManager

The AccountHealthManager provides access to shop performance metrics and account health indicators.

## Overview

The AccountHealthManager provides methods for:
- Monitoring shop performance metrics
- Tracking penalty points and violations
- Getting account health scores
- Accessing analytics and insights

## Quick Start

```typescript
// Get shop performance metrics
const performance = await sdk.accountHealth.getShopPerformance({
  start_date: '2024-01-01',
  end_date: '2024-01-31',
});

// Get penalty points
const penalties = await sdk.accountHealth.getPenaltyPoints();

// Get shop metrics
const metrics = await sdk.accountHealth.getShopMetrics();
```

## Important Notes

1. **Availability**: Account health features may vary by region
2. **Permissions**: Some metrics may require specific API permissions
3. **Data Delay**: Metrics are typically updated daily, not real-time

## Basic Concepts

### Performance Metrics
- **Order Fulfillment Rate**: Percentage of orders successfully fulfilled
- **Late Shipment Rate**: Percentage of orders shipped late
- **Return/Refund Rate**: Percentage of orders returned or refunded
- **Response Rate**: How quickly you respond to customer inquiries
- **Chat Response Time**: Average time to respond to messages

### Account Health Indicators
- **Penalty Points**: Accumulated from violations
- **Health Score**: Overall account health rating
- **Violations**: Policy violations and their severity
- **Warnings**: Active warnings on your account

## Common Operations

### Get Shop Performance

```typescript
const performance = await sdk.accountHealth.getShopPerformance({
  start_date: '2024-01-01',
  end_date: '2024-01-31',
});

console.log('Order Fulfillment:', performance.order_fulfillment_rate);
console.log('Late Shipment:', performance.late_shipment_rate);
console.log('Return Rate:', performance.return_rate);
console.log('Response Rate:', performance.response_rate);
console.log('Chat Response Time:', performance.chat_response_time);
```

### Monitor Penalty Points

```typescript
const penalties = await sdk.accountHealth.getPenaltyPoints();

console.log('Total Points:', penalties.total_points);
console.log('Penalty List:');
penalties.penalty_list?.forEach((penalty) => {
  console.log('- Type:', penalty.penalty_type);
  console.log('  Points:', penalty.points);
  console.log('  Date:', new Date(penalty.create_time * 1000));
  console.log('  Reason:', penalty.reason);
});

// Alert if points are high
if (penalties.total_points > 10) {
  console.warn('⚠️ High penalty points - review account health!');
}
```

### Track Key Metrics

```typescript
const metrics = await sdk.accountHealth.getShopMetrics();

const healthScore = {
  fulfillment: metrics.order_fulfillment_rate >= 95 ? '✅' : '⚠️',
  lateShipment: metrics.late_shipment_rate <= 5 ? '✅' : '⚠️',
  returnRate: metrics.return_rate <= 10 ? '✅' : '⚠️',
  responseRate: metrics.response_rate >= 90 ? '✅' : '⚠️',
};

console.log('Shop Health Scorecard:');
console.log('Fulfillment Rate:', healthScore.fulfillment, metrics.order_fulfillment_rate);
console.log('Late Shipment:', healthScore.lateShipment, metrics.late_shipment_rate);
console.log('Return Rate:', healthScore.returnRate, metrics.return_rate);
console.log('Response Rate:', healthScore.responseRate, metrics.response_rate);
```

## Best Practices

### 1. Regular Monitoring

```typescript
async function dailyHealthCheck() {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 86400000); // Last 30 days
  
  const performance = await sdk.accountHealth.getShopPerformance({
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
  });
  
  const issues = [];
  
  if (performance.order_fulfillment_rate < 95) {
    issues.push('Low fulfillment rate');
  }
  if (performance.late_shipment_rate > 5) {
    issues.push('High late shipment rate');
  }
  if (performance.return_rate > 10) {
    issues.push('High return rate');
  }
  
  if (issues.length > 0) {
    console.warn('⚠️ Account health issues:', issues);
    await alertTeam(issues);
  }
  
  return { performance, issues };
}

// Run daily
setInterval(dailyHealthCheck, 24 * 60 * 60 * 1000);
```

### 2. Set Up Alerts

```typescript
interface HealthThresholds {
  orderFulfillmentMin: number;
  lateShipmentMax: number;
  returnRateMax: number;
  responseRateMin: number;
  penaltyPointsMax: number;
}

async function checkHealthThresholds(thresholds: HealthThresholds) {
  const [performance, penalties] = await Promise.all([
    sdk.accountHealth.getShopPerformance({
      start_date: getDateDaysAgo(30),
      end_date: getTodayDate(),
    }),
    sdk.accountHealth.getPenaltyPoints(),
  ]);
  
  const alerts = [];
  
  if (performance.order_fulfillment_rate < thresholds.orderFulfillmentMin) {
    alerts.push({
      type: 'FULFILLMENT',
      message: `Fulfillment rate ${performance.order_fulfillment_rate}% below threshold`,
      severity: 'HIGH',
    });
  }
  
  if (performance.late_shipment_rate > thresholds.lateShipmentMax) {
    alerts.push({
      type: 'LATE_SHIPMENT',
      message: `Late shipment rate ${performance.late_shipment_rate}% above threshold`,
      severity: 'HIGH',
    });
  }
  
  if (penalties.total_points > thresholds.penaltyPointsMax) {
    alerts.push({
      type: 'PENALTIES',
      message: `Penalty points ${penalties.total_points} above threshold`,
      severity: 'CRITICAL',
    });
  }
  
  // Send alerts
  if (alerts.length > 0) {
    await sendHealthAlerts(alerts);
  }
  
  return alerts;
}
```

### 3. Historical Tracking

```typescript
class HealthTracker {
  private history: any[] = [];
  
  async recordDailyMetrics() {
    const performance = await sdk.accountHealth.getShopPerformance({
      start_date: getYesterdayDate(),
      end_date: getTodayDate(),
    });
    
    this.history.push({
      date: new Date().toISOString(),
      ...performance,
    });
    
    // Keep last 90 days
    if (this.history.length > 90) {
      this.history.shift();
    }
    
    await this.saveToDatabase(this.history);
  }
  
  getTrend(metric: string, days: number = 7) {
    const recent = this.history.slice(-days);
    const values = recent.map(h => h[metric]);
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const trend = values[values.length - 1] - values[0];
    
    return {
      average: avg,
      trend: trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable',
      change: trend,
    };
  }
}

const tracker = new HealthTracker();
setInterval(() => tracker.recordDailyMetrics(), 24 * 60 * 60 * 1000);
```

### 4. Improvement Actions

```typescript
async function generateImprovementPlan() {
  const performance = await sdk.accountHealth.getShopPerformance({
    start_date: getDateDaysAgo(30),
    end_date: getTodayDate(),
  });
  
  const plan = [];
  
  if (performance.late_shipment_rate > 5) {
    plan.push({
      issue: 'High late shipment rate',
      actions: [
        'Review fulfillment process',
        'Add buffer time for packing',
        'Consider automated shipping labels',
        'Optimize inventory management',
      ],
    });
  }
  
  if (performance.return_rate > 10) {
    plan.push({
      issue: 'High return rate',
      actions: [
        'Review product descriptions for accuracy',
        'Improve product photography',
        'Add size guides and measurements',
        'Check product quality',
      ],
    });
  }
  
  if (performance.response_rate < 90) {
    plan.push({
      issue: 'Low response rate',
      actions: [
        'Set up automated responses',
        'Increase customer service hours',
        'Use quick reply templates',
        'Enable mobile notifications',
      ],
    });
  }
  
  return plan;
}
```

## Dashboard Example

```typescript
async function generateHealthDashboard() {
  const [performance, penalties, metrics] = await Promise.all([
    sdk.accountHealth.getShopPerformance({
      start_date: getDateDaysAgo(30),
      end_date: getTodayDate(),
    }),
    sdk.accountHealth.getPenaltyPoints(),
    sdk.accountHealth.getShopMetrics(),
  ]);
  
  const dashboard = {
    timestamp: new Date(),
    
    overallHealth: calculateHealthScore(performance, penalties),
    
    performance: {
      orderFulfillment: {
        value: performance.order_fulfillment_rate,
        status: performance.order_fulfillment_rate >= 95 ? 'GOOD' : 'WARNING',
      },
      lateShipment: {
        value: performance.late_shipment_rate,
        status: performance.late_shipment_rate <= 5 ? 'GOOD' : 'WARNING',
      },
      returnRate: {
        value: performance.return_rate,
        status: performance.return_rate <= 10 ? 'GOOD' : 'WARNING',
      },
      responseRate: {
        value: performance.response_rate,
        status: performance.response_rate >= 90 ? 'GOOD' : 'WARNING',
      },
    },
    
    penalties: {
      total: penalties.total_points,
      status: penalties.total_points < 5 ? 'GOOD' : 
              penalties.total_points < 10 ? 'WARNING' : 'CRITICAL',
      recent: penalties.penalty_list?.slice(0, 5),
    },
    
    recommendations: await generateImprovementPlan(),
  };
  
  return dashboard;
}

function calculateHealthScore(performance: any, penalties: any): number {
  let score = 100;
  
  // Deduct for poor performance
  if (performance.order_fulfillment_rate < 95) score -= 10;
  if (performance.late_shipment_rate > 5) score -= 10;
  if (performance.return_rate > 10) score -= 10;
  if (performance.response_rate < 90) score -= 10;
  
  // Deduct for penalties
  score -= penalties.total_points * 2;
  
  return Math.max(0, score);
}
```

## Common Metrics

### Performance Targets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Order Fulfillment Rate | ≥ 95% | < 95% | < 90% |
| Late Shipment Rate | ≤ 5% | > 5% | > 10% |
| Return/Refund Rate | ≤ 10% | > 10% | > 15% |
| Response Rate | ≥ 90% | < 90% | < 80% |
| Chat Response Time | ≤ 2 hours | > 2 hours | > 4 hours |
| Penalty Points | 0 | > 5 | > 10 |

## Related

- [OrderManager](./order.md) - Impact fulfillment metrics
- [ProductManager](./product.md) - Impact return rates
- [Authentication Guide](../guides/authentication.md) - API authentication

---

**Note:** Keep your shop's health metrics within Shopee's recommended ranges to maintain good standing and access to platform features.
