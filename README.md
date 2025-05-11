# Shopee SDK

A TypeScript SDK for interacting with the Shopee Open API, maintained by the community.

## Installation

```bash
npm install shopee-sdk
```

## Usage

```typescript
import { ShopeeClient } from 'shopee-sdk';

// Initialize the client
const client = new ShopeeClient({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  base_url: 'https://partner.test-stable.shopeemobile.com', // For sandbox
  // base_url: 'https://partner.shopeemobile.com', // For production
});

// Authenticate (if working with shop-level APIs)
await client.auth.getToken({
  code: 'authorization-code',
  shop_id: 123456,
});

// Example: Get product list
const products = await client.product.getItemList({
  offset: 0,
  page_size: 10,
});

// Example: Add a voucher
const voucher = await client.voucher.addVoucher({
  voucher_name: "Special Discount",
  voucher_code: "SAVE10",
  start_time: Math.floor(Date.now() / 1000),
  end_time: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  voucher_type: 1, // shop voucher
  reward_type: 1, // fixed amount
  usage_quantity: 100,
  min_basket_price: 20,
  discount_amount: 10
});

// Example: Get lost push messages (partner-level API, no auth required)
const lostMessages = await client.push.getLostPushMessage();
```

## Features

- TypeScript support with full type definitions
- Support for all Shopee Open API endpoints
- Authentication flow helpers
- Automatic token refresh

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