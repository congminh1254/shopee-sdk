# PublicManager

The PublicManager handles public API endpoints that don't require shop-level authentication.

## Overview

The PublicManager provides methods for:
- Getting authorized shops for a partner
- Getting authorized merchants for a partner
- Getting Shopee's IP address ranges for whitelisting

**Note:** These endpoints are partner-level and don't require shop-specific authentication.

## Quick Start

```typescript
// Get list of shops authorized by your partner
const shops = await sdk.public.getShopsByPartner({
  page_size: 20,
});

// Get list of merchants (for main account model)
const merchants = await sdk.public.getMerchantsByPartner({
  page_size: 20,
});

// Get Shopee IP ranges for firewall whitelisting
const ipRanges = await sdk.public.getShopeeIpRange();
console.log('Shopee IPs:', ipRanges.ip_list);
```

## Methods

### getShopsByPartner()

Get list of shops that have authorized your partner application.

```typescript
const response = await sdk.public.getShopsByPartner({
  page_size: 50,
  page_no: 1,
});

console.log('Total shops:', response.total_count);
console.log('Current page:', response.page_no);
console.log('Has more:', response.has_more);

response.authed_shop_list.forEach((shop) => {
  console.log('---');
  console.log('Shop ID:', shop.shop_id);
  console.log('Shop name:', shop.shop_name);
  console.log('Region:', shop.region);
  console.log('Status:', shop.status); // NORMAL, FROZEN, BANNED
  console.log('Auth time:', new Date(shop.auth_time * 1000));
  console.log('Expire time:', new Date(shop.expire_time * 1000));
});
```

**Use Cases:**
- Display list of connected shops to users
- Monitor authorization status
- Check which shops need re-authorization
- Sync shop list with your database

**Pagination:**
```typescript
async function getAllAuthorizedShops() {
  const allShops = [];
  let pageNo = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await sdk.public.getShopsByPartner({
      page_size: 100,
      page_no: pageNo,
    });

    allShops.push(...response.authed_shop_list);
    hasMore = response.has_more;
    pageNo++;
  }

  return allShops;
}
```

---

### getMerchantsByPartner()

Get list of merchants (main accounts) that have authorized your partner application.

```typescript
const response = await sdk.public.getMerchantsByPartner({
  page_size: 50,
  page_no: 1,
});

console.log('Total merchants:', response.total_count);

response.authed_merchant_list.forEach((merchant) => {
  console.log('---');
  console.log('Merchant ID:', merchant.merchant_id);
  console.log('Merchant name:', merchant.merchant_name);
  console.log('Status:', merchant.status);
  console.log('Auth time:', new Date(merchant.auth_time * 1000));
  console.log('Expire time:', new Date(merchant.expire_time * 1000));
});
```

**Use Cases:**
- Manage multi-shop accounts
- Track main account authorizations
- Monitor merchant-level access

**Note:** Merchants are used in the main account authorization model where one account can manage multiple shops.

---

### getShopeeIpRange()

Get Shopee's IP address ranges for webhook security and firewall configuration.

```typescript
const response = await sdk.public.getShopeeIpRange();

console.log('Shopee IP ranges:');
response.ip_list.forEach((ip) => {
  console.log(ip);
});

// Use for firewall configuration
const ipRanges = response.ip_list;
```

**Use Cases:**
- Whitelist Shopee IPs in your firewall
- Validate webhook sources
- Configure security groups/ACLs
- Enhance webhook security

**Example: Webhook IP Validation**
```typescript
import ipRangeCheck from 'ip-range-check';

let shopeeIps: string[] = [];

// Cache Shopee IPs
async function refreshShopeeIps() {
  const response = await sdk.public.getShopeeIpRange();
  shopeeIps = response.ip_list;
  console.log('Updated Shopee IPs:', shopeeIps.length);
}

// Refresh periodically (e.g., daily)
await refreshShopeeIps();
setInterval(refreshShopeeIps, 24 * 60 * 60 * 1000);

// Validate webhook source IP
function isValidShopeeIp(clientIp: string): boolean {
  return ipRangeCheck(clientIp, shopeeIps);
}

// Use in webhook handler
app.post('/webhook', (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  
  if (!isValidShopeeIp(clientIp)) {
    console.warn('Webhook from unauthorized IP:', clientIp);
    return res.status(403).send('Forbidden');
  }
  
  // Process webhook
  // ...
});
```

## Integration Examples

### Shop Management Dashboard

```typescript
async function getShopDashboardData() {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  const stats = {
    total: shops.total_count,
    active: 0,
    expiring: 0,
    expired: 0,
    frozen: 0,
    banned: 0,
  };
  
  const now = Date.now() / 1000;
  const sevenDaysLater = now + 7 * 86400;
  
  shops.authed_shop_list.forEach((shop) => {
    if (shop.status === 'FROZEN') stats.frozen++;
    else if (shop.status === 'BANNED') stats.banned++;
    else if (shop.expire_time < now) stats.expired++;
    else if (shop.expire_time < sevenDaysLater) stats.expiring++;
    else stats.active++;
  });
  
  return {
    stats,
    shops: shops.authed_shop_list,
  };
}
```

### Authorization Status Monitor

```typescript
async function checkExpiringAuthorizations() {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  const now = Date.now() / 1000;
  const thirtyDaysLater = now + 30 * 86400;
  
  const expiringShops = shops.authed_shop_list.filter(
    shop => shop.expire_time < thirtyDaysLater && shop.expire_time > now
  );
  
  if (expiringShops.length > 0) {
    console.log(`⚠️ ${expiringShops.length} shops expiring within 30 days:`);
    expiringShops.forEach((shop) => {
      const daysUntilExpiry = Math.floor(
        (shop.expire_time - now) / 86400
      );
      console.log(`- ${shop.shop_name} (ID: ${shop.shop_id}): ${daysUntilExpiry} days`);
    });
    
    // Send notifications to shop owners
    await notifyShopOwners(expiringShops);
  }
  
  return expiringShops;
}

// Run daily
setInterval(checkExpiringAuthorizations, 24 * 60 * 60 * 1000);
```

### Multi-Shop Operations

```typescript
async function performBulkOperation(operation: (shopId: number) => Promise<void>) {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  const activeShops = shops.authed_shop_list.filter(
    shop => shop.status === 'NORMAL' && shop.expire_time > Date.now() / 1000
  );
  
  console.log(`Performing operation on ${activeShops.length} shops`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: [] as any[],
  };
  
  for (const shop of activeShops) {
    try {
      await operation(shop.shop_id);
      results.success++;
      console.log(`✅ Success: ${shop.shop_name}`);
    } catch (error) {
      results.failed++;
      results.errors.push({ shop: shop.shop_name, error });
      console.error(`❌ Failed: ${shop.shop_name}`, error);
    }
  }
  
  return results;
}

// Example usage
const results = await performBulkOperation(async (shopId) => {
  // Update something for each shop
  const shopSDK = new ShopeeSDK({ ...config, shop_id: shopId });
  await shopSDK.product.updateStock({
    item_id: 123456,
    stock_list: [{ normal_stock: 100 }],
  });
});

console.log('Bulk operation results:', results);
```

## Best Practices

### 1. Cache Shop Lists

```typescript
class ShopCache {
  private shops: any[] = [];
  private lastUpdate: number = 0;
  private cacheExpiry = 3600000; // 1 hour
  
  async getShops(forceRefresh = false) {
    const now = Date.now();
    
    if (!forceRefresh && this.shops.length > 0 && now - this.lastUpdate < this.cacheExpiry) {
      return this.shops;
    }
    
    const response = await sdk.public.getShopsByPartner({
      page_size: 100,
    });
    
    this.shops = response.authed_shop_list;
    this.lastUpdate = now;
    
    return this.shops;
  }
}
```

### 2. Monitor Authorization Status

```typescript
async function monitorAuthorizationHealth() {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  const issues = {
    expired: [] as any[],
    frozen: [] as any[],
    banned: [] as any[],
    expiringSoon: [] as any[],
  };
  
  const now = Date.now() / 1000;
  const sevenDaysLater = now + 7 * 86400;
  
  shops.authed_shop_list.forEach((shop) => {
    if (shop.expire_time < now) {
      issues.expired.push(shop);
    } else if (shop.expire_time < sevenDaysLater) {
      issues.expiringSoon.push(shop);
    }
    
    if (shop.status === 'FROZEN') issues.frozen.push(shop);
    if (shop.status === 'BANNED') issues.banned.push(shop);
  });
  
  // Alert if issues found
  if (Object.values(issues).some(arr => arr.length > 0)) {
    console.warn('⚠️ Authorization issues detected:', {
      expired: issues.expired.length,
      frozen: issues.frozen.length,
      banned: issues.banned.length,
      expiringSoon: issues.expiringSoon.length,
    });
  }
  
  return issues;
}
```

### 3. Secure Webhook IP Validation

```typescript
class WebhookSecurity {
  private allowedIps: string[] = [];
  private lastIpUpdate: number = 0;
  
  async updateAllowedIps() {
    const response = await sdk.public.getShopeeIpRange();
    this.allowedIps = response.ip_list;
    this.lastIpUpdate = Date.now();
    console.log(`Updated ${this.allowedIps.length} allowed IPs`);
  }
  
  async ensureIpsUpdated() {
    // Update daily
    if (Date.now() - this.lastIpUpdate > 24 * 60 * 60 * 1000) {
      await this.updateAllowedIps();
    }
  }
  
  isIpAllowed(clientIp: string): boolean {
    // Check if IP is in allowed ranges
    return this.allowedIps.some(range => {
      // Use ip-range-check or similar library
      return ipRangeCheck(clientIp, range);
    });
  }
}
```

## Common Patterns

### Shop Selection UI

```typescript
async function getShopsForUserSelection() {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  // Filter active shops only
  const activeShops = shops.authed_shop_list
    .filter(shop => 
      shop.status === 'NORMAL' && 
      shop.expire_time > Date.now() / 1000
    )
    .map(shop => ({
      id: shop.shop_id,
      name: shop.shop_name,
      region: shop.region,
    }));
  
  return activeShops;
}
```

### Authorization Renewal Reminder

```typescript
async function sendRenewalReminders() {
  const shops = await sdk.public.getShopsByPartner({
    page_size: 100,
  });
  
  const now = Date.now() / 1000;
  const fourteenDaysLater = now + 14 * 86400;
  
  for (const shop of shops.authed_shop_list) {
    if (shop.expire_time < fourteenDaysLater && shop.expire_time > now) {
      const daysLeft = Math.floor((shop.expire_time - now) / 86400);
      
      await sendEmail({
        to: shop.shop_email,
        subject: `Shopee Authorization Expiring in ${daysLeft} Days`,
        body: `Your authorization for ${shop.shop_name} will expire soon. Please re-authorize.`,
      });
    }
  }
}
```

## No Authentication Required

**Important:** Public endpoints don't require shop-level authentication, only partner-level credentials (partner_id and partner_key):

```typescript
// No shop-specific token needed
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  // No shop_id needed for public endpoints
});

// Works without shop authentication
const shops = await sdk.public.getShopsByPartner();
const ipRanges = await sdk.public.getShopeeIpRange();
```

## Related

- [Authentication Guide](../guides/authentication.md) - Partner vs shop authentication
- [PushManager](./push.md) - Webhook configuration using IP ranges
- [Setup Guide](../guides/setup.md) - SDK initialization
