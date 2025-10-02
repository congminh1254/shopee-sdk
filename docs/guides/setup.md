# Setup Guide

This guide will walk you through installing and configuring the Shopee SDK.

## Installation

Install the SDK using npm:

```bash
npm install @congminh1254/shopee-sdk
```

Or using yarn:

```bash
yarn add @congminh1254/shopee-sdk
```

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0 (for TypeScript projects)

## Basic Configuration

### Import the SDK

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';
```

### Initialize the SDK

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,        // Your partner ID from Shopee
  partner_key: 'your-key',   // Your partner key from Shopee
  region: ShopeeRegion.GLOBAL, // Optional: defaults to GLOBAL
  shop_id: 789012,           // Optional: for shop-level operations
});
```

## Configuration Options

### ShopeeConfig Interface

```typescript
interface ShopeeConfig {
  partner_id: number;      // Required: Your Shopee Partner ID
  partner_key: string;     // Required: Your Shopee Partner Key
  region?: ShopeeRegion;   // Optional: Target region
  base_url?: string;       // Optional: Custom API base URL
  shop_id?: number;        // Optional: Default shop ID
  agent?: Agent;           // Optional: HTTP/HTTPS agent for proxy
}
```

### Region Configuration

The SDK supports multiple Shopee regions:

```typescript
import { ShopeeRegion } from '@congminh1254/shopee-sdk';

// Available regions
ShopeeRegion.GLOBAL    // Global region (default)
ShopeeRegion.SG        // Singapore
ShopeeRegion.MY        // Malaysia
ShopeeRegion.TH        // Thailand
ShopeeRegion.VN        // Vietnam
ShopeeRegion.PH        // Philippines
ShopeeRegion.ID        // Indonesia
ShopeeRegion.TW        // Taiwan
ShopeeRegion.BR        // Brazil
ShopeeRegion.MX        // Mexico
ShopeeRegion.CO        // Colombia
ShopeeRegion.CL        // Chile
ShopeeRegion.PL        // Poland
```

Example with specific region:

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  region: ShopeeRegion.SG, // Singapore region
});
```

### Environment-Specific Configuration

#### Sandbox/Test Environment

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-test-key',
  base_url: 'https://partner.test-stable.shopeemobile.com',
});
```

#### Production Environment

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-production-key',
  region: ShopeeRegion.GLOBAL, // Or specific region
});
```

**Note:** When you specify a `region`, the SDK automatically uses the correct base URL for that region. If you provide both `base_url` and `region`, `base_url` takes precedence.

### Dynamic Configuration

You can update configuration after initialization:

```typescript
// Change region
sdk.setRegion(ShopeeRegion.MY);

// Change base URL (overrides region)
sdk.setBaseUrl('https://partner.test-stable.shopeemobile.com');

// Set proxy agent
import { HttpsProxyAgent } from 'https-proxy-agent';
const agent = new HttpsProxyAgent('http://proxy.example.com:8080');
sdk.setFetchAgent(agent);

// Get current configuration
const config = sdk.getConfig();
console.log(config);
```

## Custom Token Storage

By default, the SDK stores tokens in local JSON files in a `.token` folder. You can provide your own token storage implementation:

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';

class DatabaseTokenStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    // Store token in your database
    await database.tokens.upsert({ token });
  }

  async get(): Promise<AccessToken | null> {
    // Retrieve token from your database
    return await database.tokens.findOne();
  }

  async clear(): Promise<void> {
    // Clear token from your database
    await database.tokens.delete();
  }
}

// Use custom storage
const tokenStorage = new DatabaseTokenStorage();
const sdk = new ShopeeSDK(config, tokenStorage);
```

See [Token Storage Guide](./token-storage.md) for more details.

## Next Steps

- [Authentication](./authentication.md) - Learn how to authenticate with Shopee
- [Token Storage](./token-storage.md) - Learn about managing access tokens
- [Proxy Configuration](./proxy.md) - Configure HTTP/HTTPS proxies
- [Manager Guides](../managers/) - Explore specific API endpoints

## Getting Your Partner Credentials

To use the Shopee SDK, you need to:

1. Register as a Shopee Open Platform Partner at [https://open.shopee.com](https://open.shopee.com)
2. Create an application to get your `partner_id` and `partner_key`
3. Configure your OAuth callback URL
4. Request necessary API permissions for your application

For detailed instructions, visit the [Shopee Open Platform Documentation](https://open.shopee.com/documents).
