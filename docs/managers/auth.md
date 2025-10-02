# AuthManager

The AuthManager handles authentication operations, including obtaining access tokens and refreshing them.

## Overview

The AuthManager provides methods for:
- Getting access tokens from authorization codes
- Refreshing expired access tokens
- Handling different authentication scenarios (shop-level, main account)

## Methods

### getAccessToken()

**API Documentation:** [v2.public.get_access_token](https://open.shopee.com/documents/v2/v2.public.get_access_token?module=104&type=1)

Exchange an authorization code for an access token.

```typescript
async getAccessToken(
  code: string,
  shopId?: number,
  mainAccountId?: number
): Promise<AccessToken>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | Authorization code from OAuth callback |
| `shopId` | `number` | No | Shop ID for shop-level authentication |
| `mainAccountId` | `number` | No | Main account ID for main account authentication |

#### Returns

`Promise<AccessToken>` - Access token object containing:
- `access_token`: The access token string
- `refresh_token`: Token for refreshing access
- `expire_in`: Token lifetime in seconds
- `expired_at`: Calculated expiry timestamp
- `shop_id`: Associated shop ID (if provided)
- `merchant_id`: Associated merchant ID (if main account)

#### Example

```typescript
// Shop-level authentication
const token = await sdk.auth.getAccessToken(
  'authorization_code_from_callback',
  123456 // shop_id
);

console.log('Access token:', token.access_token);
console.log('Expires in:', token.expire_in, 'seconds');
console.log('Expires at:', new Date(token.expired_at));
```

```typescript
// Main account authentication
const token = await sdk.auth.getAccessToken(
  'authorization_code_from_callback',
  undefined, // no shop_id
  789012     // main_account_id
);
```

#### Error Handling

```typescript
try {
  const token = await sdk.auth.getAccessToken(code, shopId);
} catch (error) {
  if (error.error === 'error_auth') {
    console.error('Invalid authorization code');
  } else if (error.error === 'error_param') {
    console.error('Missing or invalid parameters');
  }
}
```

---

### getAccessTokenByResendCode()

Get an access token by resending an authorization code. This is useful when the initial authorization request failed or timed out.

```typescript
async getAccessTokenByResendCode(code: string): Promise<AccessToken>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | Authorization code to resend |

#### Returns

`Promise<AccessToken>` - Access token object

#### Example

```typescript
try {
  const token = await sdk.auth.getAccessTokenByResendCode(code);
  console.log('Token obtained via resend:', token.access_token);
} catch (error) {
  console.error('Failed to resend code:', error);
}
```

---

### getRefreshToken()

Refresh an expired access token using a refresh token.

```typescript
async getRefreshToken(
  refreshToken: string,
  shopId?: number,
  merchantId?: number
): Promise<AccessToken>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `refreshToken` | `string` | Yes | The refresh token from a previous access token |
| `shopId` | `number` | No | Shop ID (required for shop-level tokens) |
| `merchantId` | `number` | No | Merchant ID (for main account tokens) |

#### Returns

`Promise<AccessToken>` - New access token with a new refresh token

#### Example

```typescript
// Refresh shop-level token
const oldToken = await sdk.getAuthToken();
if (oldToken) {
  const newToken = await sdk.auth.getRefreshToken(
    oldToken.refresh_token,
    oldToken.shop_id
  );
  
  console.log('New access token:', newToken.access_token);
  console.log('New refresh token:', newToken.refresh_token);
}
```

```typescript
// Automatic refresh with SDK method (recommended)
const newToken = await sdk.refreshToken();
// SDK automatically handles getting old token and storing new token
```

#### Error Handling

```typescript
try {
  const newToken = await sdk.auth.getRefreshToken(refreshToken, shopId);
} catch (error) {
  if (error.error === 'error_auth') {
    console.error('Invalid refresh token, need to re-authenticate');
    // Redirect user to authorization URL
    const authUrl = sdk.getAuthorizationUrl(callbackUrl);
    // ... redirect logic
  }
}
```

## Complete Authentication Flow

### Shop-Level Authentication

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  shop_id: 789012,
});

// Step 1: Get authorization URL
const callbackUrl = 'https://your-app.com/callback';
const authUrl = sdk.getAuthorizationUrl(callbackUrl);
console.log('Redirect user to:', authUrl);

// Step 2: User authorizes and returns with code
// Extract code from callback: https://your-app.com/callback?code=ABC123&shop_id=789012

// Step 3: Exchange code for token
const token = await sdk.auth.getAccessToken('ABC123', 789012);

// Step 4: Store token (automatically done if using sdk.authenticateWithCode)
await sdk.tokenStorage.store(token);

// Step 5: Use authenticated APIs
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});
```

### Main Account Authentication

```typescript
// For managing multiple shops under one account
const token = await sdk.auth.getAccessToken(
  code,
  undefined,  // no specific shop_id
  mainAccountId
);
```

### Token Refresh Flow

```typescript
// Automatic refresh (recommended)
async function ensureValidToken(): Promise<void> {
  const token = await sdk.getAuthToken();
  
  if (!token) {
    throw new Error('No token found, please authenticate');
  }
  
  // Check if token is expired or expiring soon (within 5 minutes)
  const now = Date.now();
  const buffer = 5 * 60 * 1000; // 5 minutes
  
  if (token.expired_at && now >= token.expired_at - buffer) {
    console.log('Token expired, refreshing...');
    await sdk.refreshToken();
  }
}

// Call before making API requests
await ensureValidToken();
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});
```

```typescript
// Manual refresh
const oldToken = await sdk.getAuthToken();
if (oldToken) {
  try {
    const newToken = await sdk.auth.getRefreshToken(
      oldToken.refresh_token,
      oldToken.shop_id
    );
    await sdk.tokenStorage.store(newToken);
  } catch (error) {
    // Refresh failed, need to re-authenticate
    console.error('Token refresh failed, need to re-authenticate');
  }
}
```

## Access Token Structure

```typescript
interface AccessToken {
  access_token: string;      // Token for API authentication
  refresh_token: string;     // Token for refreshing access token
  expire_in: number;         // Lifetime in seconds (usually 14400 = 4 hours)
  expired_at?: number;       // Unix timestamp when token expires (calculated)
  shop_id?: number;          // Shop ID (for shop-level tokens)
  merchant_id?: number;      // Merchant ID (for main account tokens)
  request_id?: string;       // Request ID from Shopee API
  error?: string;            // Error code if request failed
  message?: string;          // Error message if request failed
}
```

## Best Practices

### 1. Use SDK Convenience Methods

```typescript
// ✅ Recommended: Use SDK method (handles storage automatically)
await sdk.authenticateWithCode(code, shopId);

// ⚠️ Manual: Need to handle storage yourself
const token = await sdk.auth.getAccessToken(code, shopId);
await sdk.tokenStorage.store(token);
```

### 2. Implement Automatic Token Refresh

```typescript
class APIClient {
  private sdk: ShopeeSDK;
  
  constructor(sdk: ShopeeSDK) {
    this.sdk = sdk;
  }
  
  async callAPI<T>(apiCall: () => Promise<T>): Promise<T> {
    try {
      await this.ensureValidToken();
      return await apiCall();
    } catch (error) {
      // If auth error, try refreshing once
      if (error.error === 'error_auth') {
        await this.sdk.refreshToken();
        return await apiCall();
      }
      throw error;
    }
  }
  
  private async ensureValidToken(): Promise<void> {
    const token = await this.sdk.getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const now = Date.now();
    const buffer = 5 * 60 * 1000;
    
    if (token.expired_at && now >= token.expired_at - buffer) {
      await this.sdk.refreshToken();
    }
  }
}

// Usage
const client = new APIClient(sdk);
const products = await client.callAPI(() =>
  sdk.product.getItemList({ offset: 0, page_size: 20 })
);
```

### 3. Handle Authentication Errors

```typescript
async function authenticate(code: string, shopId: number): Promise<boolean> {
  try {
    await sdk.authenticateWithCode(code, shopId);
    console.log('✅ Authentication successful');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed');
    
    if (error.error === 'error_auth') {
      console.error('Invalid authorization code');
    } else if (error.error === 'error_param') {
      console.error('Invalid parameters');
    } else if (error.message?.includes('timeout')) {
      console.error('Request timeout, please retry');
    } else {
      console.error('Unknown error:', error);
    }
    
    return false;
  }
}
```

### 4. Secure Token Storage

```typescript
// Never expose tokens in logs or error messages
try {
  const token = await sdk.auth.getAccessToken(code, shopId);
  // ❌ Don't log full token
  console.log('Token:', token);
  
  // ✅ Log minimal info
  console.log(`Token obtained for shop ${token.shop_id}, expires in ${token.expire_in}s`);
} catch (error) {
  console.error('Auth failed:', error.error); // Don't log full error object
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_auth` | Invalid or expired authorization code | Get a new authorization code from user |
| `error_param` | Missing required parameters | Check that shop_id or main_account_id is provided |
| `error_sign` | Invalid signature | Verify partner_key is correct |
| `error_permission` | Missing required permissions | Request additional permissions from Shopee |

## Related

- [Authentication Guide](../guides/authentication.md) - Complete authentication flow
- [Token Storage Guide](../guides/token-storage.md) - Managing tokens
- [Setup Guide](../guides/setup.md) - SDK initialization
