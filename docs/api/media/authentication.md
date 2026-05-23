# Authentication Guide

This guide covers how to authenticate with the Shopee API using OAuth 2.0 and manage access tokens.

## Overview

Shopee uses OAuth 2.0 for authentication. The authentication flow involves:

1. Redirecting users to Shopee's authorization page
2. User authorizes your application
3. Shopee redirects back to your callback URL with an authorization code
4. Exchange the code for access and refresh tokens
5. Use tokens to make authenticated API calls
6. Refresh tokens when they expire

## Authentication Flow

### Step 1: Generate Authorization URL

```typescript
const authUrl = sdk.getAuthorizationUrl('https://your-app.com/callback');
console.log('Redirect user to:', authUrl);
```

The authorization URL includes:
- Your partner ID
- A timestamp
- Your callback URL
- A signature for verification

### Step 2: Redirect User to Authorization URL

Redirect the user to the generated URL. They will see Shopee's authorization page where they can:
- Log in to their Shopee seller account
- Review the permissions your app is requesting
- Authorize or deny access

### Step 3: Handle Callback

After authorization, Shopee redirects the user back to your callback URL with a `code` parameter:

```
https://your-app.com/callback?code=AUTHORIZATION_CODE&shop_id=123456
```

Extract the `code` and `shop_id` from the query parameters.

### Step 4: Exchange Code for Access Token

```typescript
// Method 1: Using SDK convenience method (recommended)
const token = await sdk.authenticateWithCode(
  'AUTHORIZATION_CODE',
  123456, // shop_id (optional)
  456789  // main_account_id (optional, for main account)
);

// Token is automatically stored
console.log('Access token:', token.access_token);
console.log('Expires in:', token.expire_in, 'seconds');
```

```typescript
// Method 2: Using AuthManager directly
const token = await sdk.auth.getAccessToken(
  'AUTHORIZATION_CODE',
  123456, // shop_id (optional)
  456789  // main_account_id (optional)
);

// You need to store the token manually
await sdk.tokenStorage.store(token);
```

### Step 5: Access Token Structure

```typescript
interface AccessToken {
  access_token: string;      // The access token for API calls
  refresh_token: string;     // Token to refresh the access token
  expire_in: number;         // Token expiry time in seconds
  expired_at?: number;       // Unix timestamp when token expires
  shop_id?: number;          // Associated shop ID
  merchant_id?: number;      // Associated merchant ID (for main account)
  request_id?: string;       // Request ID from API
  error?: string;            // Error code if any
  message?: string;          // Error message if any
}
```

## Token Management

### Retrieving Stored Token

```typescript
const token = await sdk.getAuthToken();

if (token) {
  console.log('Found stored token');
  console.log('Access token:', token.access_token);
  console.log('Shop ID:', token.shop_id);
} else {
  console.log('No token found, need to authenticate');
}
```

### Refreshing Tokens

Access tokens expire after a certain period (usually 4 hours). Use the refresh token to get a new access token:

```typescript
try {
  const newToken = await sdk.refreshToken(
    123456, // shop_id (optional, uses stored token's shop_id if not provided)
    456789  // merchant_id (optional, for main account)
  );
  
  console.log('New access token:', newToken.access_token);
  console.log('New refresh token:', newToken.refresh_token);
} catch (error) {
  console.error('Failed to refresh token:', error);
  // Token refresh failed, need to re-authenticate
}
```

```typescript
// Using AuthManager directly
const oldToken = await sdk.getAuthToken();
if (oldToken) {
  const newToken = await sdk.auth.getRefreshToken(
    oldToken.refresh_token,
    oldToken.shop_id,
    oldToken.merchant_id
  );
  // Store the new token
  await sdk.tokenStorage.store(newToken);
}
```

### Token Expiry Handling

Implement automatic token refresh:

```typescript
async function getValidToken(): Promise<AccessToken> {
  const token = await sdk.getAuthToken();
  
  if (!token) {
    throw new Error('No token found, please authenticate');
  }
  
  // Check if token is about to expire (within 5 minutes)
  const now = Date.now();
  const expiryBuffer = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  if (token.expired_at && now >= token.expired_at - expiryBuffer) {
    console.log('Token expired or expiring soon, refreshing...');
    return await sdk.refreshToken();
  }
  
  return token;
}

// Use the function before making API calls
const validToken = await getValidToken();
const products = await sdk.product.getItemList({ offset: 0, page_size: 20 });
```

### Resending Authentication Code

If you need to resend the authentication code (e.g., if the original authorization failed):

```typescript
const token = await sdk.auth.getAccessTokenByResendCode('AUTHORIZATION_CODE');
await sdk.tokenStorage.store(token);
```

## Authentication Types

### Shop-Level Authentication (Most Common)

For accessing shop-specific data (products, orders, etc.):

```typescript
const token = await sdk.authenticateWithCode(
  'AUTHORIZATION_CODE',
  123456  // shop_id
);
```

### Main Account Authentication

For managing multiple shops under a main account:

```typescript
const token = await sdk.authenticateWithCode(
  'AUTHORIZATION_CODE',
  undefined,  // no specific shop_id
  456789      // main_account_id
);
```

## Best Practices

### 1. Store Tokens Securely

Never expose tokens in client-side code or version control. Store them securely:

```typescript
// ✅ Good: Server-side with encrypted database
class SecureTokenStorage implements TokenStorage {
  async store(token: AccessToken): Promise<void> {
    const encrypted = encrypt(JSON.stringify(token));
    await database.tokens.save(encrypted);
  }
  
  async get(): Promise<AccessToken | null> {
    const encrypted = await database.tokens.find();
    if (!encrypted) return null;
    return JSON.parse(decrypt(encrypted));
  }
  
  async clear(): Promise<void> {
    await database.tokens.delete();
  }
}
```

### 2. Handle Token Expiration Gracefully

```typescript
async function callApiWithRetry<T>(
  apiCall: () => Promise<T>
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    // Check if error is due to token expiration
    if (error.error === 'error_auth' || error.message?.includes('token')) {
      // Refresh token and retry
      await sdk.refreshToken();
      return await apiCall();
    }
    throw error;
  }
}

// Usage
const products = await callApiWithRetry(() =>
  sdk.product.getItemList({ offset: 0, page_size: 20 })
);
```

### 3. Log Authentication Events

```typescript
// Log authentication for debugging and audit
const token = await sdk.authenticateWithCode(code, shopId);
console.log(`[AUTH] Shop ${shopId} authenticated successfully`);
console.log(`[AUTH] Token expires at ${new Date(token.expired_at)}`);
```

### 4. Handle Multiple Shops

If you manage multiple shops, store tokens separately:

```typescript
// Initialize SDK for specific shop
const shopSDK = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-key',
  shop_id: 789012, // Specific shop
});

// Token is stored with shop_id as identifier
await shopSDK.authenticateWithCode(code, 789012);
```

## Common Authentication Errors

### Error: `error_auth`

**Cause:** Invalid or expired token

**Solution:** Refresh the token or re-authenticate

```typescript
try {
  await sdk.product.getItemList({ offset: 0, page_size: 20 });
} catch (error) {
  if (error.error === 'error_auth') {
    console.log('Token invalid, refreshing...');
    await sdk.refreshToken();
  }
}
```

### Error: `error_param`

**Cause:** Missing or invalid parameters (e.g., shop_id)

**Solution:** Ensure all required parameters are provided

```typescript
// ✅ Include shop_id
await sdk.authenticateWithCode(code, 123456);

// ❌ Missing shop_id for shop-level auth
await sdk.authenticateWithCode(code);
```

### Error: Invalid signature

**Cause:** Incorrect partner_key or timestamp issues

**Solution:** Verify your partner_key and ensure system time is synchronized

## Testing Authentication

For development and testing:

```typescript
// Use test environment
const testSDK = new ShopeeSDK({
  partner_id: TEST_PARTNER_ID,
  partner_key: TEST_PARTNER_KEY,
  base_url: 'https://partner.test-stable.shopeemobile.com',
});

// Generate test authorization URL
const testAuthUrl = testSDK.getAuthorizationUrl('http://localhost:3000/callback');
console.log('Test auth URL:', testAuthUrl);
```

## Next Steps

- [Token Storage Guide](./token-storage.md) - Learn about custom token storage
- [Setup Guide](./setup.md) - SDK configuration options
- [Manager Guides](../managers/) - Using authenticated API endpoints
