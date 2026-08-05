# PrincipalManager

The `PrincipalManager` provides methods to fetch consolidated multi-shop performance metrics for content creators, affiliates, livestreamers, and videos across different regions.

## Overview

Content creators, Multi-Channel Networks (MCNs), and principal entities can track analytics across their linked shops and assets, including:
- Video performance (standard clip videos, shop-level, and creator-level)
- Affiliate performance (content-level, shop-level, and principal-level)
- Livestreaming performance (session-level, shop-level, and principal-level)
- Sales and conversion performance details

## Quick Start

```typescript
// Fetch principal video performance
const performance = await sdk.principal.getPrincipalVideoPerformance({
  start_date: '2026-01-01',
  end_date: '2026-01-31',
  timezone: 'GMT+8',
  granularity: 'month',
  region_list: [
    { region: 'SG', currency: 'SGD' }
  ]
});

console.log('Video views:', performance.response.summary?.[0]?.views);
```

## API Methods

### getClipVideoPerformance

- Method: `POST /api/v2/principal/get_clip_video_performance`
- Params Type: `GetClipVideoPerformanceParams`
- Response Type: `GetClipVideoPerformanceResponse`

### getContentAffiliatePerformance

- Method: `POST /api/v2/principal/get_content_affiliate_performance`
- Params Type: `GetContentAffiliatePerformanceParams`
- Response Type: `GetContentAffiliatePerformanceResponse`

### getPrincipalAffiliatePerformance

- Method: `POST /api/v2/principal/get_principal_affiliate_performance`
- Params Type: `GetPrincipalAffiliatePerformanceParams`
- Response Type: `GetPrincipalAffiliatePerformanceResponse`

### getPrincipalLivestreamPerformance

- Method: `POST /api/v2/principal/get_principal_livestream_performance`
- Params Type: `GetPrincipalLivestreamPerformanceParams`
- Response Type: `GetPrincipalLivestreamPerformanceResponse`

### getPrincipalSalesPerformanceDetail

- Method: `POST /api/v2/principal/get_principal_sales_performance_detail`
- Params Type: `GetPrincipalSalesPerformanceDetailParams`
- Response Type: `GetPrincipalSalesPerformanceDetailResponse`

### getPrincipalVideoPerformance

- Method: `POST /api/v2/principal/get_principal_video_performance`
- Params Type: `GetPrincipalVideoPerformanceParams`
- Response Type: `GetPrincipalVideoPerformanceResponse`

### getSessionLivestreamPerformance

- Method: `POST /api/v2/principal/get_session_livestream_performance`
- Params Type: `GetSessionLivestreamPerformanceParams`
- Response Type: `GetSessionLivestreamPerformanceResponse`

### getShopAffiliatePerformance

- Method: `POST /api/v2/principal/get_shop_affiliate_performance`
- Params Type: `GetShopAffiliatePerformanceParams`
- Response Type: `GetShopAffiliatePerformanceResponse`

### getShopLivestreamPerformance

- Method: `POST /api/v2/principal/get_shop_livestream_performance`
- Params Type: `GetShopLivestreamPerformanceParams`
- Response Type: `GetShopLivestreamPerformanceResponse`

### getShopSalesPerformanceDetail

- Method: `POST /api/v2/principal/get_shop_sales_performance_detail`
- Params Type: `GetShopSalesPerformanceDetailParams`
- Response Type: `GetShopSalesPerformanceDetailResponse`

### getShopVideoPerformance

- Method: `POST /api/v2/principal/get_shop_video_performance`
- Params Type: `GetShopVideoPerformanceParams`
- Response Type: `GetShopVideoPerformanceResponse`

