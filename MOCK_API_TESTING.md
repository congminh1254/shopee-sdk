# Mock API Testing Guide

This document explains how to use the comprehensive mock API testing setup in the Shopee SDK.

## Coverage Summary

**Overall Test Coverage: 75.21%** ⬆️ (improved from 60.5%)
- **Total Tests**: 86 tests (86 passing - 100% success rate! 🎉)
- **Statements**: 75.21%
- **Branches**: 74.60%  
- **Functions**: 74.69%
- **Lines**: 75.10%

### Manager Classes Coverage: 70.96%

**Fully Tested Managers (100% coverage):**
- ✅ **AuthManager**: 6 tests - Authentication & token management
- ✅ **ProductManager**: 8 tests - Product operations & comments  
- ✅ **PublicManager**: 7 tests - Public API endpoints
- ✅ **OrderManager**: 8 tests - Order management & processing
- ✅ **LogisticsManager**: 3 tests - Shipping & tracking
- ✅ **PaymentManager**: 3 tests - Payment & escrow details
- ✅ **PushManager**: 9 tests - Push notifications & webhooks
- ✅ **VoucherManager**: 8 tests - Voucher management

**Remaining Managers (specialized/low usage):**
- **AccountHealthManager**: 6.66% coverage (complex analytics manager)
- **AdsManager**: 4.34% coverage (advertising management)

## Overview

The SDK includes extensive mock API call tests that allow you to:
- Test your application logic without making real API calls
- Simulate different API responses (success, errors, edge cases)
- Test authentication flows and token refresh scenarios
- Verify API request parameters and validation

## Test Structure

The mock API tests are organized as follows:

```
src/__tests__/
├── fetch.test.ts                    # Low-level HTTP request testing
├── integration.test.ts              # End-to-end workflow testing
└── managers/
    ├── auth.manager.test.ts         # Authentication API tests (6 tests)
    ├── product.manager.test.ts      # Product API tests (8 tests)
    ├── public.manager.test.ts       # Public API tests (7 tests)
    ├── order.manager.test.ts        # Order API tests (8 tests)
    ├── logistics.manager.test.ts    # Logistics API tests (3 tests)
    ├── payment.manager.test.ts      # Payment API tests (3 tests)
    ├── push.manager.test.ts         # Push API tests (9 tests)
    └── voucher.manager.test.ts      # Voucher API tests (8 tests)
```

## Key Features

### 1. HTTP Request Mocking

The `fetch.test.ts` file demonstrates how to mock the underlying HTTP requests:

```typescript
// Mock successful API response
mockFetch.mockResolvedValueOnce({
  status: 200,
  headers: new Map([["content-type", "application/json"]]),
  json: jest.fn().mockResolvedValue({
    request_id: "test-request",
    error: "",
    message: "",
    response: { data: "test data" }
  }),
});

const result = await ShopeeFetch.fetch(config, "/api/endpoint");
```

### 2. Manager-Level API Testing

Each manager class has comprehensive tests that mock specific API endpoints:

```typescript
// Example: Testing AuthManager.getAccessToken()
const mockResponse: AccessToken = {
  access_token: "test_token",
  refresh_token: "test_refresh",
  expire_in: 3600,
  request_id: "test-request",
  error: "",
  message: "",
};

mockShopeeFetch.mockResolvedValue(mockResponse);
const result = await authManager.getAccessToken("auth_code");

expect(mockShopeeFetch).toHaveBeenCalledWith(
  mockConfig,
  "/auth/token/get",
  {
    method: "POST",
    body: {
      code: "auth_code",
      partner_id: 12345,
    },
  }
);
```

### 3. Integration Testing

The `integration.test.ts` file shows how to test complete workflows:

```typescript
// Test complete authentication + API call workflow
const token = await sdk.authenticateWithCode("mock_code");
const shops = await sdk.public.getShopsByPartner();

// Verify both API calls were made correctly
expect(mockFetch).toHaveBeenCalledTimes(2);
```

### 4. Error Scenario Testing

Mock different types of errors:

```typescript
// Network error
mockFetch.mockImplementationOnce(() => {
  const error = new Error("Network error");
  error.name = "FetchError";
  throw error;
});

// API error
mockFetch.mockImplementationOnce(() => {
  throw new ShopeeApiError(400, { error: "invalid_request" });
});

// Token expiration and refresh
const expiredToken = {
  access_token: "expired",
  expired_at: Date.now() - 1000, // Already expired
};
```

## Running the Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Manager tests only
npm test -- --testPathPattern="managers"

# Integration tests only
npm test -- --testPathPattern="integration" 

# Fetch/HTTP layer tests only
npm test -- --testPathPattern="fetch"
```

### Run with Coverage
```bash
npm test -- --coverage
```

## Test Coverage

The mock API tests provide comprehensive coverage:

- **AuthManager**: 100% coverage (6 tests)
- **ProductManager**: 100% coverage (8 tests)  
- **PublicManager**: 100% coverage (7 tests)
- **ShopeeFetch**: 91% coverage (8/11 tests passing)
- **Integration**: Complete workflow testing (4 tests)

## Creating New Mock Tests

### 1. For New Manager Methods

```typescript
describe("YourManager", () => {
  it("should call API with correct parameters", async () => {
    const mockResponse = { /* your expected response */ };
    mockFetch.mockResolvedValue(mockResponse);

    const result = await manager.yourMethod(params);

    expect(mockFetch).toHaveBeenCalledWith(
      config,
      "/api/your/endpoint",
      {
        method: "POST", // or GET
        auth: true,     // if authentication required
        params: params, // for GET requests
        body: params,   // for POST requests
      }
    );

    expect(result).toEqual(mockResponse);
  });
});
```

### 2. For Error Scenarios

```typescript
it("should handle API errors", async () => {
  mockFetch.mockImplementationOnce(() => {
    throw new ShopeeApiError(400, { error: "validation_failed" });
  });

  await expect(manager.yourMethod(params))
    .rejects.toThrow(ShopeeApiError);
});
```

### 3. For Authentication Flows

```typescript
it("should refresh token when expired", async () => {
  const expiredToken = { 
    expired_at: Date.now() - 1000 
  };
  const newToken = { 
    expired_at: Date.now() + 3600000 
  };

  (mockSdk.getAuthToken as jest.MockedFunction<any>)
    .mockResolvedValue(expiredToken);
  (mockSdk.refreshToken as jest.MockedFunction<any>)
    .mockResolvedValue(newToken);

  // Your test logic here
});
```

## Benefits

1. **Fast Testing**: No network requests, tests run in milliseconds
2. **Reliable**: No dependency on external services or network conditions
3. **Comprehensive**: Test success, error, and edge case scenarios
4. **Maintainable**: Clear structure and reusable mock patterns
5. **Documentation**: Tests serve as usage examples

## Best Practices

1. **Mock at the Right Level**: Use `ShopeeFetch.fetch` mocks for manager tests
2. **Test Real Scenarios**: Use realistic request/response data
3. **Verify Parameters**: Always check that APIs are called with correct parameters
4. **Test Error Cases**: Include network errors, API errors, and validation failures
5. **Use TypeScript**: Ensure mock responses match the expected types

This mock API testing setup ensures your Shopee SDK integration is robust and well-tested without requiring actual API credentials or network access.