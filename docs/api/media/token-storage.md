# Token Storage Guide

This guide explains how token storage works in the Shopee SDK and how to implement custom storage solutions.

## Overview

The SDK needs to store access tokens to maintain authentication between API calls. By default, tokens are stored in local JSON files, but you can implement custom storage using databases, cloud storage, or any other method.

## Default Token Storage

### CustomTokenStorage

The SDK includes a default `CustomTokenStorage` class that stores tokens as JSON files in a `.token` folder:

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

// Uses default file-based storage
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  shop_id: 789012,
});
```

**File Structure:**
```
project-root/
└── .token/
    ├── default.json      # Default token (fallback)
    └── 789012.json       # Token for shop_id 789012
```

**Token File Content:**
```json
{
  "access_token": "abc123...",
  "refresh_token": "xyz789...",
  "expire_in": 14400,
  "expired_at": 1640000000000,
  "shop_id": 789012,
  "request_id": "req123"
}
```

### Default Storage Behavior

```typescript
// Token is stored automatically when authenticating
await sdk.authenticateWithCode('auth-code', 789012);
// Stored in: .token/789012.json and .token/default.json (if first token)

// Retrieve stored token
const token = await sdk.getAuthToken();

// Token is updated automatically when refreshing
await sdk.refreshToken();
```

### Multiple Shops

The default storage handles multiple shops by using separate files:

```typescript
// Shop 1
const sdk1 = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  shop_id: 111111,
});
await sdk1.authenticateWithCode('code1', 111111);
// Stored in: .token/111111.json

// Shop 2
const sdk2 = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  shop_id: 222222,
});
await sdk2.authenticateWithCode('code2', 222222);
// Stored in: .token/222222.json
```

## TokenStorage Interface

To implement custom token storage, implement the `TokenStorage` interface:

```typescript
interface TokenStorage {
  /**
   * Store an access token
   * @param token The access token to store
   */
  store(token: AccessToken): Promise<void>;

  /**
   * Retrieve the stored access token
   * @returns The stored token or null if not found
   */
  get(): Promise<AccessToken | null>;

  /**
   * Clear/delete the stored token
   */
  clear(): Promise<void>;
}
```

## Custom Storage Implementations

### Database Storage (PostgreSQL)

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';
import { Pool } from 'pg';

class PostgresTokenStorage implements TokenStorage {
  private pool: Pool;
  private shopId: number;

  constructor(pool: Pool, shopId: number) {
    this.pool = pool;
    this.shopId = shopId;
  }

  async store(token: AccessToken): Promise<void> {
    const query = `
      INSERT INTO shopee_tokens (
        shop_id, access_token, refresh_token, expire_in, expired_at
      )
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (shop_id)
      DO UPDATE SET
        access_token = $2,
        refresh_token = $3,
        expire_in = $4,
        expired_at = $5,
        updated_at = NOW()
    `;
    
    await this.pool.query(query, [
      this.shopId,
      token.access_token,
      token.refresh_token,
      token.expire_in,
      token.expired_at,
    ]);
  }

  async get(): Promise<AccessToken | null> {
    const query = 'SELECT * FROM shopee_tokens WHERE shop_id = $1';
    const result = await this.pool.query(query, [this.shopId]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      access_token: row.access_token,
      refresh_token: row.refresh_token,
      expire_in: row.expire_in,
      expired_at: row.expired_at,
      shop_id: row.shop_id,
    };
  }

  async clear(): Promise<void> {
    const query = 'DELETE FROM shopee_tokens WHERE shop_id = $1';
    await this.pool.query(query, [this.shopId]);
  }
}

// Usage
const pool = new Pool({ /* connection config */ });
const tokenStorage = new PostgresTokenStorage(pool, 789012);
const sdk = new ShopeeSDK(config, tokenStorage);
```

**Database Schema:**
```sql
CREATE TABLE shopee_tokens (
  shop_id BIGINT PRIMARY KEY,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expire_in INTEGER NOT NULL,
  expired_at BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_shopee_tokens_expired_at ON shopee_tokens(expired_at);
```

### Redis Storage

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';
import Redis from 'ioredis';

class RedisTokenStorage implements TokenStorage {
  private redis: Redis;
  private keyPrefix: string;
  private shopId: number;

  constructor(redis: Redis, shopId: number, keyPrefix = 'shopee:token') {
    this.redis = redis;
    this.shopId = shopId;
    this.keyPrefix = keyPrefix;
  }

  private getKey(): string {
    return `${this.keyPrefix}:${this.shopId}`;
  }

  async store(token: AccessToken): Promise<void> {
    const key = this.getKey();
    const value = JSON.stringify(token);
    
    // Store with TTL based on token expiry
    if (token.expired_at) {
      const ttl = Math.floor((token.expired_at - Date.now()) / 1000);
      if (ttl > 0) {
        await this.redis.setex(key, ttl, value);
        return;
      }
    }
    
    // Fallback to default TTL (4 hours)
    await this.redis.setex(key, 14400, value);
  }

  async get(): Promise<AccessToken | null> {
    const key = this.getKey();
    const value = await this.redis.get(key);
    
    if (!value) {
      return null;
    }
    
    return JSON.parse(value) as AccessToken;
  }

  async clear(): Promise<void> {
    const key = this.getKey();
    await this.redis.del(key);
  }
}

// Usage
const redis = new Redis({ /* connection config */ });
const tokenStorage = new RedisTokenStorage(redis, 789012);
const sdk = new ShopeeSDK(config, tokenStorage);
```

### MongoDB Storage

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';
import { MongoClient, Collection } from 'mongodb';

interface TokenDocument extends AccessToken {
  _id?: string;
  shop_id: number;
  updatedAt: Date;
}

class MongoTokenStorage implements TokenStorage {
  private collection: Collection<TokenDocument>;
  private shopId: number;

  constructor(client: MongoClient, shopId: number) {
    this.collection = client.db('shopee').collection('tokens');
    this.shopId = shopId;
  }

  async store(token: AccessToken): Promise<void> {
    await this.collection.updateOne(
      { shop_id: this.shopId },
      {
        $set: {
          ...token,
          shop_id: this.shopId,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  async get(): Promise<AccessToken | null> {
    const doc = await this.collection.findOne({ shop_id: this.shopId });
    
    if (!doc) {
      return null;
    }
    
    return {
      access_token: doc.access_token,
      refresh_token: doc.refresh_token,
      expire_in: doc.expire_in,
      expired_at: doc.expired_at,
      shop_id: doc.shop_id,
    };
  }

  async clear(): Promise<void> {
    await this.collection.deleteOne({ shop_id: this.shopId });
  }
}

// Usage
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const tokenStorage = new MongoTokenStorage(client, 789012);
const sdk = new ShopeeSDK(config, tokenStorage);
```

### In-Memory Storage (Testing)

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';

class InMemoryTokenStorage implements TokenStorage {
  private tokens: Map<number, AccessToken> = new Map();
  private shopId: number;

  constructor(shopId: number) {
    this.shopId = shopId;
  }

  async store(token: AccessToken): Promise<void> {
    this.tokens.set(this.shopId, token);
  }

  async get(): Promise<AccessToken | null> {
    return this.tokens.get(this.shopId) || null;
  }

  async clear(): Promise<void> {
    this.tokens.delete(this.shopId);
  }
}

// Usage (good for testing)
const tokenStorage = new InMemoryTokenStorage(789012);
const sdk = new ShopeeSDK(config, tokenStorage);
```

### Encrypted File Storage

```typescript
import { TokenStorage, AccessToken } from '@congminh1254/shopee-sdk';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

class EncryptedFileTokenStorage implements TokenStorage {
  private filePath: string;
  private encryptionKey: Buffer;

  constructor(shopId: number, encryptionPassword: string) {
    const tokenDir = path.join(process.cwd(), '.token');
    this.filePath = path.join(tokenDir, `${shopId}.enc`);
    // Derive encryption key from password
    this.encryptionKey = crypto.scryptSync(encryptionPassword, 'salt', 32);
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(text: string): string {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async store(token: AccessToken): Promise<void> {
    const json = JSON.stringify(token);
    const encrypted = this.encrypt(json);
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, encrypted, 'utf8');
  }

  async get(): Promise<AccessToken | null> {
    try {
      const encrypted = await fs.readFile(this.filePath, 'utf8');
      const json = this.decrypt(encrypted);
      return JSON.parse(json) as AccessToken;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
  }
}

// Usage
const tokenStorage = new EncryptedFileTokenStorage(789012, 'my-secret-password');
const sdk = new ShopeeSDK(config, tokenStorage);
```

## Best Practices

### 1. Encrypt Sensitive Data

Always encrypt tokens when storing them, especially in persistent storage:

```typescript
// ✅ Good: Encrypted storage
class SecureStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    const encrypted = encrypt(JSON.stringify(token));
    await database.save(encrypted);
  }
}

// ❌ Bad: Plain text storage
class InsecureStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    await database.save(JSON.stringify(token));
  }
}
```

### 2. Handle Storage Failures

Implement proper error handling:

```typescript
class RobustTokenStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    try {
      await this.saveToDatabase(token);
    } catch (error) {
      console.error('Failed to store token:', error);
      // Optionally: Fall back to alternative storage
      await this.saveToFile(token);
    }
  }

  async get(): Promise<AccessToken | null> {
    try {
      return await this.getFromDatabase();
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null; // Return null instead of throwing
    }
  }
}
```

### 3. Implement Token Rotation

Keep track of token versions for security:

```typescript
interface VersionedToken extends AccessToken {
  version: number;
  rotatedAt: Date;
}

class VersionedTokenStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    const versioned: VersionedToken = {
      ...token,
      version: Date.now(),
      rotatedAt: new Date(),
    };
    await this.saveWithVersion(versioned);
  }
}
```

### 4. Set Appropriate TTL

For cache-based storage (Redis, Memcached), set TTL based on token expiry:

```typescript
async store(token: AccessToken): Promise<void> {
  const ttl = token.expired_at
    ? Math.floor((token.expired_at - Date.now()) / 1000)
    : 14400; // Default 4 hours
  
  // Add buffer to prevent edge cases
  const bufferTTL = Math.max(ttl - 300, 0); // Subtract 5 minutes
  
  await this.redis.setex(this.key, bufferTTL, JSON.stringify(token));
}
```

### 5. Support Multiple Shops

Design storage to handle multiple shops efficiently:

```typescript
class MultiShopTokenStorage implements TokenStorage {
  private cache: Map<number, AccessToken> = new Map();
  
  constructor(private shopId: number) {}
  
  async store(token: AccessToken): Promise<void> {
    // Store with shop_id as key
    await database.tokens.upsert({
      shop_id: this.shopId,
      ...token,
    });
    // Update cache
    this.cache.set(this.shopId, token);
  }
  
  async get(): Promise<AccessToken | null> {
    // Check cache first
    if (this.cache.has(this.shopId)) {
      return this.cache.get(this.shopId)!;
    }
    // Fallback to database
    const token = await database.tokens.findOne({ shop_id: this.shopId });
    if (token) {
      this.cache.set(this.shopId, token);
    }
    return token;
  }
}
```

## Testing Token Storage

### Unit Test Example

```typescript
import { describe, it, expect } from '@jest/globals';

describe('CustomTokenStorage', () => {
  it('should store and retrieve token', async () => {
    const storage = new CustomTokenStorage(123456);
    
    const token: AccessToken = {
      access_token: 'test_token',
      refresh_token: 'test_refresh',
      expire_in: 14400,
      expired_at: Date.now() + 14400000,
      shop_id: 123456,
    };
    
    await storage.store(token);
    const retrieved = await storage.get();
    
    expect(retrieved).toEqual(token);
  });

  it('should return null when no token exists', async () => {
    const storage = new CustomTokenStorage(999999);
    const token = await storage.get();
    expect(token).toBeNull();
  });

  it('should clear stored token', async () => {
    const storage = new CustomTokenStorage(123456);
    
    const token: AccessToken = {
      access_token: 'test_token',
      refresh_token: 'test_refresh',
      expire_in: 14400,
    };
    
    await storage.store(token);
    await storage.clear();
    
    const retrieved = await storage.get();
    expect(retrieved).toBeNull();
  });
});
```

## Next Steps

- [Authentication Guide](./authentication.md) - Learn how tokens are used
- [Setup Guide](./setup.md) - SDK initialization and configuration
- [Manager Guides](../managers/) - Using the SDK with stored tokens
