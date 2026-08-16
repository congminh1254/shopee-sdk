# Migration Guide: Upgrading from v1.x to v2.0

This guide provides step-by-step instructions for migrating your application from Shopee SDK v1.x to v2.0.

v2.0 introduces a major architectural shift: the entire SDK is now automatically generated from Shopee's OpenAPI specifications, meaning all manual overrides and helper code blocks have been removed in favor of pure spec compliance.

---

## 🚨 Breaking Changes & Action Items

### 1. Accessing Nested Response Parameters (`.response`)
Shopee's API nests all actual response parameters inside a top-level `response` wrapper object. 
* **In v1.x**: The generator flattened these fields directly onto the root response interface.
* **In v2.0**: The generator strictly preserves this nested structure by placing these fields under a `.response` property.

#### How to Migrate:
You must update your API response handling to access fields via the `.response` wrapper:

```typescript
// ❌ v1.x - Flattened fields
const result = await sdk.product.getItemList(params);
console.log(result.item_list); // undefined in v2.0

// ✅ v2.0 - Nested under .response
const result = await sdk.product.getItemList(params);
console.log(result.response?.item_list);
```

---

### 2. Optional Response Fields
* **In v1.x**: Some response fields were marked as required in the TypeScript definitions.
* **In v2.0**: All properties in response interfaces (including sub-interfaces) are now optional (`?`) by default to prevent runtime crashes when Shopee's API omits conditional or undocumented fields.

#### How to Migrate:
Use optional chaining (`?.`) or fallback nullish coalescing (`??`) when accessing response properties:

```typescript
// ❌ v1.x
const name = result.response.item_name;

// ✅ v2.0
const name = result.response?.item_name ?? "Default Name";
```

---

### 3. Enum Field Types Restored to Primitives
* **In v1.x**: Several fields (such as `start_time` and `end_time` in voucher/promotion managers) were incorrectly mapped to custom TypeScript enums containing description texts or format guidelines.
* **In v2.0**: These fields have been restored to their correct primitive types (`number` or `string`) as defined in Shopee's specifications.

#### How to Migrate:
Ensure you pass and compare primitive types (`string` or `number`) for these parameters instead of using enum imports:

```typescript
// ❌ v1.x
params.start_time = StartTimeEnum.VALID_START_TIME;

// ✅ v2.0
params.start_time = Math.floor(Date.now() / 1000) + 3600; // UNIX timestamp
```
