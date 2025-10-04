# Shopee SDK

[![CI](https://github.com/congminh1254/shopee-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/congminh1254/shopee-sdk/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/congminh1254/shopee-sdk/badge.svg?branch=main)](https://coveralls.io/github/congminh1254/shopee-sdk?branch=main)
[![npm version](https://badge.fury.io/js/@congminh1254%2Fshopee-sdk.svg)](https://badge.fury.io/js/@congminh1254%2Fshopee-sdk)
[![Node.js Version](https://img.shields.io/node/v/@congminh1254/shopee-sdk.svg)](https://www.npmjs.com/package/@congminh1254/shopee-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript SDK for interacting with the Shopee Open API, maintained by the community.

## 📚 Documentation

**[Complete Documentation](./docs/README.md)** - Comprehensive guides and API references

### Quick Links

**Getting Started:**
- [Setup Guide](./docs/guides/setup.md) - Installation and configuration
- [Authentication](./docs/guides/authentication.md) - OAuth flow and token management
- [Token Storage](./docs/guides/token-storage.md) - Managing access tokens
- [Proxy Configuration](./docs/guides/proxy.md) - Using HTTP/HTTPS proxies

**API Managers:**
- [AuthManager](./docs/managers/auth.md) - Authentication operations
- [ProductManager](./docs/managers/product.md) - Product catalog management
- [OrderManager](./docs/managers/order.md) - Order processing
- [LogisticsManager](./docs/managers/logistics.md) - Shipping operations
- [PaymentManager](./docs/managers/payment.md) - Payment information
- [VoucherManager](./docs/managers/voucher.md) - Discount management
- [PushManager](./docs/managers/push.md) - Webhooks and notifications
- [PublicManager](./docs/managers/public.md) - Public API endpoints
- [AdsManager](./docs/managers/ads.md) - Advertising campaigns
- [AccountHealthManager](./docs/managers/account-health.md) - Performance metrics
- [ShopManager](./docs/managers/shop.md) - Shop information and settings
- [MediaManager](./docs/managers/media.md) - Image and video upload
- [MediaSpaceManager](./docs/managers/media-space.md) - Media uploads (images and videos)
- [MerchantManager](./docs/managers/merchant.md) - Merchant information and warehouses
- [GlobalProductManager](./docs/managers/global-product.md) - Global product management
- [FirstMileManager](./docs/managers/first-mile.md) - First mile logistics
- [DiscountManager](./docs/managers/discount.md) - Discount campaigns
- [BundleDealManager](./docs/managers/bundle-deal.md) - Bundle deal promotions
- [AddOnDealManager](./docs/managers/add-on-deal.md) - Add-on deal promotions
- [ShopFlashSaleManager](./docs/managers/shop-flash-sale.md) - Flash sale campaigns
- [FollowPrizeManager](./docs/managers/follow-prize.md) - Follow prize activities
- [TopPicksManager](./docs/managers/top-picks.md) - Top picks collections
- [ShopCategoryManager](./docs/managers/shop-category.md) - Shop category management
- [ReturnsManager](./docs/managers/returns.md) - Return and refund management
- [SbsManager](./docs/managers/sbs.md) - Shopee Business Services (SBS) warehouse inventory

## Installation

```bash
npm install @congminh1254/shopee-sdk
```

## Quick Start

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

// Initialize the SDK
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  region: ShopeeRegion.GLOBAL,
  shop_id: 789012, // Optional
});

// Get authorization URL
const authUrl = sdk.getAuthorizationUrl('https://your-app.com/callback');
console.log('Visit:', authUrl);

// After user authorizes, exchange code for token
await sdk.authenticateWithCode('auth-code-from-callback');

// Use the SDK
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});

const orders = await sdk.order.getOrderList({
  time_range_field: 'create_time',
  time_from: Math.floor(Date.now() / 1000) - 86400,
  time_to: Math.floor(Date.now() / 1000),
  page_size: 50,
});
```

See the [Setup Guide](./docs/guides/setup.md) and [Authentication Guide](./docs/guides/authentication.md) for detailed instructions.

## Features

- ✅ **Full TypeScript Support** - Complete type definitions for all API endpoints
- 🔐 **Authentication Management** - OAuth flow helpers and automatic token refresh
- 💾 **Flexible Token Storage** - File-based storage included, custom storage supported
- 🌍 **Multi-Region Support** - Support for all Shopee regions (SG, MY, TH, VN, PH, ID, TW, BR, MX, CO, CL, PL)
- 🔌 **Proxy Support** - HTTP/HTTPS proxy configuration
- 📦 **25 API Managers** - Comprehensive coverage of Shopee API endpoints:
  - Products, Orders, Logistics, Payments
  - Vouchers, Webhooks, Ads, Account Health
  - Shop, Media, Media Space, Public endpoints, Authentication
  - Merchant, Global Product, First Mile, SBS (Shopee Business Services)
  - Promotions (Discount, Bundle, Add-on, Flash Sale, Follow Prize, Top Picks)
  - Returns, Shop Category
- 🧪 **Well Tested** - 499+ tests with high coverage
- 📚 **Comprehensive Documentation** - Detailed guides and examples

## Contributing

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages to automate versioning and release notes.

Examples of commit messages:

- `feat: add support for logistics API` - Minor version bump
- `fix: correct error handling in order API` - Patch version bump
- `docs: update API documentation` - No version bump
- `feat!: rename parameters in product API` or `feat: rename parameters in product API BREAKING CHANGE: ...` - Major version bump

## Release Process

This project uses [Release Please](https://github.com/googleapis/release-please) to automate version management and releases.

The release process follows these steps:

1. Commits to the main branch are automatically analyzed
2. When conventional commit messages are detected, Release Please creates or updates a release PR
3. When the release PR is merged:
   - A new GitHub tag and release is created
   - The package is automatically published to npm
   - The CHANGELOG.md is updated with the release notes

## License

MIT
