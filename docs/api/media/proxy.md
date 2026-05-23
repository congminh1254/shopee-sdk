# Proxy Configuration Guide

This guide explains how to configure HTTP/HTTPS proxies with the Shopee SDK for routing API requests through proxy servers.

## Overview

The SDK supports proxy configuration through Node.js HTTP/HTTPS agents. This is useful for:

- Routing traffic through corporate proxies
- Using proxy services for IP rotation
- Testing with proxy tools like Charles or Fiddler
- Bypassing rate limits (use responsibly)
- Accessing region-specific APIs

## Setting Up a Proxy

### Using https-proxy-agent

The most common approach is using the `https-proxy-agent` package:

#### Installation

```bash
npm install https-proxy-agent
```

#### Basic Usage

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Create proxy agent
const proxyAgent = new HttpsProxyAgent('http://proxy.example.com:8080');

// Initialize SDK
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent: proxyAgent, // Set proxy agent
});

// All API calls will now go through the proxy
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});
```

### Dynamic Proxy Configuration

You can change the proxy agent after SDK initialization:

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
});

// Set proxy later
const proxyAgent = new HttpsProxyAgent('http://proxy.example.com:8080');
sdk.setFetchAgent(proxyAgent);

// Make requests through proxy
await sdk.product.getItemList({ offset: 0, page_size: 20 });

// Remove proxy
sdk.setFetchAgent(undefined);

// Direct requests (no proxy)
await sdk.product.getItemList({ offset: 0, page_size: 20 });
```

## Proxy Types

### HTTP Proxy

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://proxy.example.com:8080');
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

### HTTPS Proxy

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('https://secure-proxy.example.com:8443');
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

### SOCKS Proxy

For SOCKS proxies, use the `socks-proxy-agent` package:

```bash
npm install socks-proxy-agent
```

```typescript
import { SocksProxyAgent } from 'socks-proxy-agent';

// SOCKS5 proxy
const agent = new SocksProxyAgent('socks5://proxy.example.com:1080');

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

### Authenticated Proxy

For proxies requiring authentication:

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

// Include username and password in URL
const agent = new HttpsProxyAgent(
  'http://username:password@proxy.example.com:8080'
);

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

## Proxy Configuration Examples

### Corporate Proxy

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

// Corporate proxy with authentication
const proxyUrl = process.env.CORPORATE_PROXY || 'http://proxy.corp.com:8080';
const agent = new HttpsProxyAgent(proxyUrl);

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

### Rotating Proxy Service

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

class RotatingProxySDK {
  private sdk: ShopeeSDK;
  private proxyList: string[];
  private currentIndex: number = 0;

  constructor(config: ShopeeConfig, proxies: string[]) {
    this.proxyList = proxies;
    this.sdk = new ShopeeSDK(config);
    this.rotateProxy();
  }

  private rotateProxy(): void {
    const proxyUrl = this.proxyList[this.currentIndex];
    const agent = new HttpsProxyAgent(proxyUrl);
    this.sdk.setFetchAgent(agent);
    
    this.currentIndex = (this.currentIndex + 1) % this.proxyList.length;
  }

  async makeRequest<T>(apiCall: () => Promise<T>): Promise<T> {
    try {
      return await apiCall();
    } catch (error) {
      // Rotate proxy and retry on failure
      this.rotateProxy();
      return await apiCall();
    }
  }
}

// Usage
const proxies = [
  'http://proxy1.example.com:8080',
  'http://proxy2.example.com:8080',
  'http://proxy3.example.com:8080',
];

const rotatingSDK = new RotatingProxySDK(config, proxies);

const products = await rotatingSDK.makeRequest(() =>
  sdk.product.getItemList({ offset: 0, page_size: 20 })
);
```

### Environment-Based Proxy

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

function createSDK(config: ShopeeConfig): ShopeeSDK {
  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  
  if (proxyUrl) {
    console.log(`Using proxy: ${proxyUrl}`);
    const agent = new HttpsProxyAgent(proxyUrl);
    return new ShopeeSDK({ ...config, agent });
  }
  
  console.log('No proxy configured, using direct connection');
  return new ShopeeSDK(config);
}

// Automatically uses proxy if environment variables are set
const sdk = createSDK({
  partner_id: 123456,
  partner_key: 'your-key',
});
```

### Proxy with Custom Options

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://proxy.example.com:8080', {
  // Custom timeout
  timeout: 30000,
  
  // TLS options
  rejectUnauthorized: false, // Accept self-signed certificates
  
  // Keep alive
  keepAlive: true,
  keepAliveMsecs: 1000,
});

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

## Debugging with Proxy Tools

### Charles Proxy

Configure the SDK to route through Charles for debugging:

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

// Charles typically runs on localhost:8888
const agent = new HttpsProxyAgent('http://localhost:8888', {
  rejectUnauthorized: false, // Required for Charles SSL proxying
});

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});

// All requests will now be visible in Charles
await sdk.product.getItemList({ offset: 0, page_size: 20 });
```

### Fiddler

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

// Fiddler typically runs on localhost:8888
const agent = new HttpsProxyAgent('http://localhost:8888', {
  rejectUnauthorized: false,
});

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

### mitmproxy

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

// mitmproxy default port is 8080
const agent = new HttpsProxyAgent('http://localhost:8080', {
  rejectUnauthorized: false,
});

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  agent,
});
```

## Testing Proxy Configuration

### Verify Proxy Connection

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

async function testProxy(proxyUrl: string): Promise<boolean> {
  try {
    const agent = new HttpsProxyAgent(proxyUrl);
    const sdk = new ShopeeSDK({
      partner_id: 123456,
      partner_key: 'your-key',
      agent,
    });
    
    // Try a simple API call
    await sdk.public.getShopeeIpRange();
    console.log('✅ Proxy connection successful');
    return true;
  } catch (error) {
    console.error('❌ Proxy connection failed:', error.message);
    return false;
  }
}

// Test your proxy
await testProxy('http://proxy.example.com:8080');
```

### Proxy Failover

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

class ProxyFailoverSDK {
  private sdk: ShopeeSDK;
  private proxies: string[];

  constructor(config: ShopeeConfig, proxies: string[]) {
    this.sdk = new ShopeeSDK(config);
    this.proxies = proxies;
  }

  async makeRequestWithFailover<T>(
    apiCall: (sdk: ShopeeSDK) => Promise<T>
  ): Promise<T> {
    // Try each proxy in order
    for (const proxyUrl of this.proxies) {
      try {
        const agent = new HttpsProxyAgent(proxyUrl);
        this.sdk.setFetchAgent(agent);
        
        return await apiCall(this.sdk);
      } catch (error) {
        console.warn(`Proxy ${proxyUrl} failed, trying next...`);
      }
    }
    
    // Try direct connection as last resort
    try {
      this.sdk.setFetchAgent(undefined);
      console.log('All proxies failed, trying direct connection...');
      return await apiCall(this.sdk);
    } catch (error) {
      throw new Error('All connection attempts failed');
    }
  }
}

// Usage
const failoverSDK = new ProxyFailoverSDK(config, [
  'http://proxy1.example.com:8080',
  'http://proxy2.example.com:8080',
]);

const products = await failoverSDK.makeRequestWithFailover((sdk) =>
  sdk.product.getItemList({ offset: 0, page_size: 20 })
);
```

## Best Practices

### 1. Secure Proxy Credentials

Never hardcode proxy credentials:

```typescript
// ✅ Good: Use environment variables
const proxyUrl = process.env.PROXY_URL;
const agent = new HttpsProxyAgent(proxyUrl);

// ❌ Bad: Hardcoded credentials
const agent = new HttpsProxyAgent('http://user:pass@proxy.com:8080');
```

### 2. Handle Proxy Errors Gracefully

```typescript
async function makeProxiedRequest<T>(
  apiCall: () => Promise<T>
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('Proxy connection refused');
    } else if (error.code === 'ENOTFOUND') {
      console.error('Proxy host not found');
    } else if (error.statusCode === 407) {
      console.error('Proxy authentication required');
    }
    throw error;
  }
}
```

### 3. Configure Timeouts

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://proxy.example.com:8080', {
  timeout: 30000, // 30 second timeout
});
```

### 4. Use Connection Pooling

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://proxy.example.com:8080', {
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100, // Connection pool size
});
```

### 5. Log Proxy Usage

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';

function createProxiedSDK(config: ShopeeConfig, proxyUrl: string): ShopeeSDK {
  console.log(`[PROXY] Routing requests through: ${proxyUrl}`);
  
  const agent = new HttpsProxyAgent(proxyUrl);
  return new ShopeeSDK({ ...config, agent });
}
```

## Common Issues

### Issue: Proxy Authentication Failed

**Error:** 407 Proxy Authentication Required

**Solution:**
```typescript
// Include credentials in proxy URL
const agent = new HttpsProxyAgent(
  'http://username:password@proxy.example.com:8080'
);
```

### Issue: SSL Certificate Verification Failed

**Error:** UNABLE_TO_VERIFY_LEAF_SIGNATURE

**Solution:**
```typescript
const agent = new HttpsProxyAgent('http://proxy.example.com:8080', {
  rejectUnauthorized: false, // Only use for debugging!
});
```

### Issue: Connection Timeout

**Error:** ETIMEDOUT

**Solution:**
```typescript
const agent = new HttpsProxyAgent('http://proxy.example.com:8080', {
  timeout: 60000, // Increase timeout to 60 seconds
});
```

### Issue: Proxy Not Being Used

**Solution:** Verify agent is set correctly:
```typescript
const config = sdk.getConfig();
console.log('Agent configured:', !!config.agent);
```

## Next Steps

- [Setup Guide](./setup.md) - SDK initialization and configuration
- [Authentication Guide](./authentication.md) - Authenticating API requests
- [Manager Guides](../managers/) - Using specific API endpoints
