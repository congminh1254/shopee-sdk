# Shopee SDK Documentation

Welcome to the comprehensive documentation for the Shopee SDK! This guide will help you get started with integrating Shopee's Open API into your application.

## Table of Contents

### Getting Started
- [Setup Guide](./guides/setup.md) - Installation, configuration, and initialization
- [Authentication](./guides/authentication.md) - OAuth flow and token management
- [Token Storage](./guides/token-storage.md) - Managing access tokens
- [Proxy Configuration](./guides/proxy.md) - Using HTTP/HTTPS proxies

### API Managers
Each manager provides access to a specific set of Shopee API endpoints:

- [AuthManager](./managers/auth.md) - Authentication and token operations
- [ProductManager](./managers/product.md) - Product catalog management
- [OrderManager](./managers/order.md) - Order processing and fulfillment
- [LogisticsManager](./managers/logistics.md) - Shipping and tracking
- [PaymentManager](./managers/payment.md) - Payment and escrow information
- [VoucherManager](./managers/voucher.md) - Discount voucher management
- [PushManager](./managers/push.md) - Webhook and push notification configuration
- [PublicManager](./managers/public.md) - Public API endpoints (no auth required)
- [AdsManager](./managers/ads.md) - Advertising campaign management
- [AccountHealthManager](./managers/account-health.md) - Account performance analytics
- [MediaManager](./managers/media.md) - Image and video upload operations

## Quick Start

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

// Initialize the SDK
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  region: ShopeeRegion.GLOBAL,
  shop_id: 789012, // Optional: for shop-level operations
});

// Authenticate and get authorization URL
const authUrl = sdk.getAuthorizationUrl('https://your-app.com/callback');
console.log('Visit this URL to authorize:', authUrl);

// After user authorizes, exchange code for token
await sdk.authenticateWithCode('auth-code-from-callback');

// Use the SDK
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});
```

## Support

- [GitHub Repository](https://github.com/congminh1254/shopee-sdk)
- [Issue Tracker](https://github.com/congminh1254/shopee-sdk/issues)
- [Shopee Open API Documentation](https://open.shopee.com/documents)

## Contributing

We welcome contributions! Please see our [Contributing Guide](../README.md#contributing) for details.

## License

MIT License - see [LICENSE](../LICENSE) file for details.
