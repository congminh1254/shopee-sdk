# AI Agent Onboarding Guide - Shopee SDK

> **Purpose**: This document helps AI agents quickly understand and work with the Shopee SDK codebase. It provides a comprehensive overview of the architecture, structure, and key concepts needed to effectively contribute to or use this SDK.

## 📋 Quick Overview

**Project**: Shopee SDK - A complete TypeScript SDK for Shopee Open API  
**Language**: TypeScript (ES2020, NodeNext modules)  
**Package**: `@congminh1254/shopee-sdk` (npm)  
**Node Version**: >= 18.0.0  
**Main Entry**: `src/sdk.ts` → `lib/sdk.js` (compiled)  
**Dependencies**: Minimal (only `node-fetch`)  
**Test Coverage**: 75%+, 86 comprehensive tests

## 🏗️ Project Structure

```
shopee-sdk/
├── src/                          # Source code (TypeScript)
│   ├── sdk.ts                    # Main SDK class - entry point
│   ├── fetch.ts                  # HTTP client with auto-signing
│   ├── errors.ts                 # Custom error classes
│   ├── version.ts                # Auto-generated version file
│   ├── managers/                 # API endpoint managers (27 total)
│   │   ├── base.manager.ts       # Abstract base class
│   │   ├── auth.manager.ts       # OAuth & token management
│   │   ├── product.manager.ts    # Product catalog (55+ endpoints)
│   │   ├── order.manager.ts      # Order processing
│   │   ├── logistics.manager.ts  # Shipping operations
│   │   ├── payment.manager.ts    # Payment info
│   │   ├── voucher.manager.ts    # Discount vouchers
│   │   ├── ads.manager.ts        # Advertising campaigns
│   │   ├── shop.manager.ts       # Shop profile
│   │   ├── merchant.manager.ts   # Merchant & warehouse info
│   │   ├── media.manager.ts      # Image upload
│   │   ├── media-space.manager.ts # Video upload
│   │   ├── global-product.manager.ts # Cross-border products
│   │   ├── first-mile.manager.ts # First mile logistics
│   │   ├── discount.manager.ts   # Discount campaigns
│   │   ├── bundle-deal.manager.ts # Bundle promotions
│   │   ├── add-on-deal.manager.ts # Add-on promotions
│   │   ├── shop-flash-sale.manager.ts # Flash sales
│   │   ├── follow-prize.manager.ts # Follow activities
│   │   ├── top-picks.manager.ts  # Top picks collections
│   │   ├── shop-category.manager.ts # Shop categories
│   │   ├── returns.manager.ts    # Returns & refunds
│   │   ├── sbs.manager.ts        # SBS warehouse inventory
│   │   ├── fbs.manager.ts        # Fulfillment by Shopee
│   │   ├── livestream.manager.ts # Live streaming
│   │   ├── ams.manager.ts        # AMS (Advertising Management)
│   │   ├── push.manager.ts       # Webhooks
│   │   ├── public.manager.ts     # Public endpoints (no auth)
│   │   ├── account-health.manager.ts # Performance metrics
│   │   └── index.ts              # Manager exports
│   ├── storage/                  # Token storage implementations
│   │   ├── token-storage.interface.ts # Storage interface
│   │   └── custom-token-storage.ts # File-based storage
│   ├── schemas/                  # TypeScript type definitions
│   │   ├── region.ts             # Regions & base URLs
│   │   ├── access-token.ts       # Token structure
│   │   ├── fetch.ts              # Fetch options
│   │   └── *.ts                  # API request/response types
│   ├── utils/                    # Utility functions
│   │   └── signature.ts          # HMAC-SHA256 signing
│   └── __tests__/                # Test files
│       ├── sdk.test.ts
│       ├── fetch.test.ts
│       ├── integration.test.ts
│       ├── managers/             # Manager tests
│       ├── storage/              # Storage tests
│       └── utils/                # Utility tests
├── lib/                          # Compiled output (gitignored)
├── docs/                         # Documentation
│   ├── README.md                 # Docs index
│   ├── guides/                   # User guides
│   └── managers/                 # Manager-specific docs
├── schemas/                      # JSON schemas (from Shopee API)
├── scripts/                      # Build scripts
│   └── generate-version.js       # Version file generator
├── package.json                  # npm package config
├── tsconfig.json                 # TypeScript config
├── jest.config.js                # Jest test config
├── .eslintrc.json                # ESLint config
├── .prettierrc                   # Prettier config
└── README.md                     # Main readme
```

## 🎯 Core Architecture

### 1. Main SDK Class (`src/sdk.ts`)

The `ShopeeSDK` class is the main entry point:

```typescript
class ShopeeSDK {
  // Configuration
  private config: ShopeeConfig;
  private tokenStorage: TokenStorage;
  
  // 27 Manager instances (public properties)
  public readonly product: ProductManager;
  public readonly order: OrderManager;
  public readonly auth: AuthManager;
  // ... 24 more managers
  
  constructor(config: ShopeeConfig, tokenStorage?: TokenStorage) {
    // Initialize config with defaults
    // Initialize token storage
    // Initialize all 27 managers
  }
  
  // Authentication helpers
  getAuthorizationUrl(redirect_url: string): string;
  authenticateWithCode(code: string): Promise<void>;
  getAuthToken(): Promise<AccessToken | null>;
  refreshToken(): Promise<AccessToken>;
  setAuthToken(token: AccessToken): Promise<void>;
}
```

**Key Points:**
- All managers are initialized in constructor
- Each manager receives the shared `config` object
- Token storage is pluggable (default: file-based)
- Config includes: `partner_id`, `partner_key`, `region`, `base_url`, `shop_id`, `agent` (proxy)

### 2. HTTP Client (`src/fetch.ts`)

The `ShopeeFetch` class handles all API requests:

```typescript
class ShopeeFetch {
  static async fetch<T>(
    config: ShopeeConfig,
    path: string,
    options: FetchOptions
  ): Promise<T>
}
```

**Auto-handles:**
- Request signing (HMAC-SHA256)
- Partner ID and timestamp injection
- Access token injection (for authenticated requests)
- Token expiration detection
- Error parsing and throwing custom errors
- User-Agent header (`shopee-sdk/{version}`)
- Proxy support (via `config.agent`)

**Signature Algorithm:**
```
HMAC-SHA256(
  partner_key,
  partner_id + path + timestamp + [access_token]
)
```

### 3. Manager Pattern

All 27 managers extend `BaseManager`:

```typescript
abstract class BaseManager {
  constructor(protected config: ShopeeConfig) {}
}

class ProductManager extends BaseManager {
  async getItemList(params: GetItemListRequest): Promise<GetItemListResponse> {
    return ShopeeFetch.fetch(this.config, '/product/get_item_list', {
      method: 'GET',
      params,
      auth: true, // Requires authentication
    });
  }
}
```

**Manager Responsibilities:**
- Provide typed methods for API endpoints
- Use `ShopeeFetch.fetch()` for all HTTP requests
- Define request/response types from schemas
- Handle both GET and POST methods
- Specify `auth: true` for authenticated endpoints

### 4. Token Storage

Interface for storing OAuth tokens:

```typescript
interface TokenStorage {
  get(shop_id?: number): Promise<AccessToken | null>;
  set(token: AccessToken): Promise<void>;
  delete(shop_id?: number): Promise<void>;
}
```

**Default Implementation** (`CustomTokenStorage`):
- Stores tokens in `~/.shopee-sdk/tokens/shop_{shop_id}.json`
- File-based JSON storage
- Can be replaced with Redis, database, etc.

### 5. Error Handling

Two custom error types:

```typescript
class ShopeeSdkError extends Error {
  // SDK-level errors (config, token issues, etc.)
}

class ShopeeApiError extends Error {
  // API errors from Shopee
  constructor(message: string, code?: string, response?: any)
}
```

## 🔑 Key Concepts

### Regions

The SDK supports 5 regions:

```typescript
enum ShopeeRegion {
  GLOBAL = "GLOBAL",                    // https://partner.shopeemobile.com/api/v2
  CHINA = "CHINA",                      // https://openplatform.shopee.cn/api/v2/public
  BRAZIL = "BRAZIL",                    // https://openplatform.shopee.com.br/api/v2
  TEST_GLOBAL = "TEST_GLOBAL",          // Test environment
  TEST_CHINA = "TEST_CHINA",            // Test environment
}
```

### Authentication Flow

1. **Get Authorization URL**: `sdk.getAuthorizationUrl(redirect_url)`
2. **User authorizes** in browser
3. **Shopee redirects** to your callback with `code` and `shop_id`
4. **Exchange code**: `sdk.authenticateWithCode(code)`
5. **Token stored** automatically
6. **Auto-refresh** on expiration

### Request Flow

```
Client Code
    ↓
Manager Method (e.g., product.getItemList())
    ↓
ShopeeFetch.fetch()
    ↓
1. Generate timestamp
2. Build URL with query params
3. Get access token (if auth: true)
4. Check token expiration → refresh if needed
5. Generate signature
6. Add headers (User-Agent, Content-Type)
7. Make HTTP request
8. Parse response
9. Throw error if failed
    ↓
Return typed response
```

## 📦 All 27 Managers

| Manager | Purpose | Auth Required | Key Methods |
|---------|---------|--------------|-------------|
| **AuthManager** | OAuth & tokens | No | `generateToken`, `refreshToken` |
| **ProductManager** | Product catalog | Yes | `getItemList`, `addItem`, `updateItem`, `deleteItem` (55+ methods) |
| **OrderManager** | Order processing | Yes | `getOrderList`, `getOrderDetail`, `shipOrder` |
| **LogisticsManager** | Shipping | Yes | `getShippingParameter`, `getTrackingNumber` |
| **PaymentManager** | Payment info | Yes | `getEscrowDetail`, `getPayoutInfo` |
| **VoucherManager** | Discount vouchers | Yes | `addVoucher`, `updateVoucher` |
| **DiscountManager** | Discount campaigns | Yes | `addDiscount`, `updateDiscount` |
| **BundleDealManager** | Bundle promotions | Yes | `addBundleDeal`, `updateBundleDeal` |
| **AddOnDealManager** | Add-on promotions | Yes | `addAddOnDeal`, `updateAddOnDeal` |
| **ShopFlashSaleManager** | Flash sales | Yes | `addFlashSale`, `updateFlashSale` |
| **FollowPrizeManager** | Follow activities | Yes | `addFollowPrize`, `updateFollowPrize` |
| **TopPicksManager** | Top picks | Yes | `addTopPicks`, `updateTopPicks` |
| **ShopCategoryManager** | Shop categories | Yes | `addShopCategory`, `getShopCategoryList` |
| **ReturnsManager** | Returns & refunds | Yes | `getReturnList`, `confirmReturn` |
| **AdsManager** | Advertising | Yes | `createCampaign`, `updateCampaign` |
| **AmsManager** | Ads Management | Yes | `createAdGroup`, `getAdReport` |
| **AccountHealthManager** | Performance metrics | Yes | `getShopPerformance`, `getItemPerformance` |
| **ShopManager** | Shop profile | Yes | `getShopInfo`, `updateShopInfo` |
| **MerchantManager** | Merchant & warehouses | Yes | `getMerchantInfo`, `getWarehouseList` |
| **MediaManager** | Image upload | Yes | `uploadImage`, `uploadVideo` |
| **MediaSpaceManager** | Video upload | Yes | `uploadMedia`, `getMediaInfo` |
| **GlobalProductManager** | Cross-border products | Yes | `getGlobalItemList`, `addGlobalItem` |
| **FirstMileManager** | First mile logistics | Yes | `getTrackingInfo`, `getWaybill` |
| **SbsManager** | SBS warehouse | Yes | `getInventory`, `updateInventory` |
| **FbsManager** | Fulfillment by Shopee | Yes | `getFbsOrder`, `confirmFbsOrder` |
| **LivestreamManager** | Live streaming | Yes | `createSession`, `getSessionInfo` |
| **PushManager** | Webhooks | Yes | `setPushConfig`, `getPushConfig` |
| **PublicManager** | Public endpoints | No | `getShopsByPartner`, `getCategories` |

## 🛠️ Development Workflow

### Setup

```bash
npm install                 # Install dependencies
```

### Build

```bash
npm run build              # TypeScript → JavaScript (src/ → lib/)
# Internally runs:
# 1. npm run prebuild    → Generate version.ts
# 2. tsc                 → Compile TypeScript
```

### Test

```bash
npm test                   # Run all tests with Jest
# Uses NODE_OPTIONS=--experimental-vm-modules for ESM
```

### Lint & Format

```bash
npm run lint               # ESLint
npm run format             # Prettier
```

### Code Quality Tools

- **ESLint**: TypeScript-aware linting (`.eslintrc.json`)
- **Prettier**: Code formatting (`.prettierrc`)
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages
- **Jest**: Testing with TypeScript support

### Release Process

Uses **Release Please** (automated):
1. Commits follow Conventional Commits format
2. Release Please creates/updates release PR
3. Merging release PR triggers:
   - GitHub tag/release creation
   - npm publish
   - CHANGELOG.md update

Commit prefixes:
- `feat:` → Minor version bump
- `fix:` → Patch version bump
- `feat!:` or `BREAKING CHANGE:` → Major version bump
- `docs:`, `chore:`, `test:` → No version bump

## 💡 Common Tasks for AI Agents

### Adding a New Manager

1. Create `src/managers/new-manager.manager.ts`:
```typescript
import { BaseManager } from './base.manager.js';
import { ShopeeFetch } from '../fetch.js';

export class NewManager extends BaseManager {
  async someMethod(params: SomeRequest): Promise<SomeResponse> {
    return ShopeeFetch.fetch(this.config, '/some/path', {
      method: 'POST',
      body: params,
      auth: true,
    });
  }
}
```

2. Export in `src/managers/index.ts`
3. Import and add to `src/sdk.ts`:
```typescript
import { NewManager } from './managers/new-manager.manager.js';

export class ShopeeSDK {
  public readonly new: NewManager;
  
  constructor(...) {
    this.new = new NewManager(this.config);
  }
}
```

4. Add tests in `src/__tests__/managers/new-manager.test.ts`
5. Add docs in `docs/managers/new-manager.md`

### Adding a New Method to Existing Manager

1. Define types in `src/schemas/` (if needed)
2. Add method to manager:
```typescript
async newMethod(params: NewMethodRequest): Promise<NewMethodResponse> {
  return ShopeeFetch.fetch(this.config, '/path/to/endpoint', {
    method: 'GET', // or POST
    params,        // for GET
    body,          // for POST
    auth: true,    // or false for public endpoints
  });
}
```

3. Add tests
4. Update docs

### Working with Types

Types are in `src/schemas/`:
- Use TypeScript interfaces for request/response
- Export from schema files
- Import in managers

Example:
```typescript
// src/schemas/product.ts
export interface GetItemListRequest {
  offset: number;
  page_size: number;
  item_status?: string[];
}

export interface GetItemListResponse {
  response: {
    item: Item[];
    total_count: number;
    has_next_page: boolean;
  };
}
```

### Testing Guidelines

Tests use Jest with TypeScript:
- Mock API responses
- Test success and error cases
- Test token refresh logic
- Test signature generation
- Integration tests for full flows

Example test structure:
```typescript
describe('ProductManager', () => {
  it('should get item list', async () => {
    // Setup mock
    // Call method
    // Assert results
  });
});
```

## 🔍 Important Files

### Configuration Files

- **`tsconfig.json`**: TypeScript compiler config (ES2020, NodeNext modules)
- **`jest.config.js`**: Jest test runner config
- **`package.json`**: Dependencies, scripts, exports
- **`.eslintrc.json`**: Linting rules
- **`.prettierrc`**: Code formatting rules
- **`release-please-config.json`**: Release automation config

### Build Artifacts (gitignored)

- **`lib/`**: Compiled JavaScript output
- **`src/version.ts`**: Auto-generated version file
- **`node_modules/`**: Dependencies

### Documentation

- **`README.md`**: Main project readme
- **`docs/README.md`**: Documentation index
- **`docs/guides/`**: User guides (setup, auth, etc.)
- **`docs/managers/`**: Per-manager documentation
- **`CHANGELOG.md`**: Version history
- **`AI_ONBOARDING.md`**: This file!

## 🎓 Learning the Codebase

### Start Here (Reading Order)

1. **`README.md`** - Understand what the SDK does
2. **`src/sdk.ts`** - Main entry point and configuration
3. **`src/fetch.ts`** - HTTP client and request signing
4. **`src/managers/base.manager.ts`** - Manager base class
5. **`src/managers/product.manager.ts`** - Example manager (largest)
6. **`src/storage/token-storage.interface.ts`** - Token storage
7. **`src/schemas/region.ts`** - Regions and base URLs
8. **`src/utils/signature.ts`** - Request signing logic

### Key Patterns to Understand

1. **Module System**: Uses ESM (`.js` extensions in imports)
2. **Manager Pattern**: Each API domain gets a manager class
3. **Factory Pattern**: SDK class creates all managers
4. **Strategy Pattern**: Pluggable token storage
5. **Promise-based**: All async operations use Promises
6. **Type Safety**: Full TypeScript coverage

### Code Style

- **Imports**: Always use `.js` extension (ESM requirement)
- **Exports**: Named exports preferred
- **Naming**: camelCase for methods, PascalCase for classes
- **Async**: Use `async/await` over `.then()`
- **Errors**: Throw custom error classes
- **Comments**: Minimal (code should be self-documenting)

## 🚀 Quick Reference

### Initialize SDK

```typescript
import { ShopeeSDK, ShopeeRegion } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  region: ShopeeRegion.GLOBAL,
  shop_id: 789012,
});
```

### Make API Call

```typescript
// Via manager
const products = await sdk.product.getItemList({ offset: 0, page_size: 20 });

// Via ShopeeFetch (internal)
const result = await ShopeeFetch.fetch(config, '/product/get_item_list', {
  method: 'GET',
  params: { offset: 0, page_size: 20 },
  auth: true,
});
```

### Handle Errors

```typescript
try {
  const result = await sdk.product.getItemList(...);
} catch (error) {
  if (error instanceof ShopeeApiError) {
    console.error('API error:', error.code, error.message);
  } else if (error instanceof ShopeeSdkError) {
    console.error('SDK error:', error.message);
  }
}
```

### Custom Token Storage

```typescript
class RedisTokenStorage implements TokenStorage {
  async get(shop_id?: number): Promise<AccessToken | null> { /* ... */ }
  async set(token: AccessToken): Promise<void> { /* ... */ }
  async delete(shop_id?: number): Promise<void> { /* ... */ }
}

const sdk = new ShopeeSDK(config, new RedisTokenStorage());
```

## 📚 External Resources

- **Shopee Open API Docs**: https://open.shopee.com/documents
- **GitHub Repository**: https://github.com/congminh1254/shopee-sdk
- **npm Package**: https://www.npmjs.com/package/@congminh1254/shopee-sdk
- **Issue Tracker**: https://github.com/congminh1254/shopee-sdk/issues

## 🎯 Success Checklist for AI Agents

When working with this SDK, ensure you:

- [ ] Understand the manager pattern and how endpoints are organized
- [ ] Know how to add methods to managers using `ShopeeFetch.fetch()`
- [ ] Understand the authentication flow and token management
- [ ] Know how request signing works (HMAC-SHA256)
- [ ] Follow TypeScript best practices and ESM module syntax
- [ ] Add appropriate tests for new functionality
- [ ] Update documentation when adding features
- [ ] Use Conventional Commits for version management
- [ ] Verify builds pass: `npm run build`
- [ ] Verify tests pass: `npm test`
- [ ] Run linter: `npm run lint`
- [ ] Format code: `npm run format`

## 🤝 Contributing Tips

- **Small PRs**: Keep changes focused and minimal
- **Tests Required**: Add tests for new features
- **Docs Required**: Update relevant documentation
- **Conventional Commits**: Follow commit message format
- **Type Safety**: Maintain full TypeScript coverage
- **No Breaking Changes**: Unless necessary (major version)
- **Backwards Compatible**: Preserve existing APIs

---

**Last Updated**: January 2026  
**SDK Version**: 1.4.0  
**Maintained By**: Community (congminh1254)
