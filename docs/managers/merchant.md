# MerchantManager

The MerchantManager handles merchant-level operations including merchant information, prepaid accounts, warehouse management, and shop associations.

## Overview

The MerchantManager provides methods for:
- Retrieving merchant information and authorization details
- Managing courier prepaid accounts
- Managing merchant warehouses and locations
- Retrieving shop lists bound to merchant
- Getting warehouse-eligible shop lists

## Quick Start

```typescript
// Get merchant information
const merchantInfo = await sdk.merchant.getMerchantInfo();
console.log(`Merchant: ${merchantInfo.merchant_name}`);
console.log(`Region: ${merchantInfo.merchant_region}`);
console.log(`Currency: ${merchantInfo.merchant_currency}`);

// Get merchant warehouses
const warehouses = await sdk.merchant.getMerchantWarehouseList({
  cursor: {
    next_id: 0,
    page_size: 30,
  },
});

// Get shops bound to merchant
const shops = await sdk.merchant.getShopListByMerchant({
  page_no: 1,
  page_size: 100,
});
```

## Methods

### getMerchantInfo()

**API Documentation:** [v2.merchant.get_merchant_info](https://open.shopee.com/documents/v2/v2.merchant.get_merchant_info?module=93&type=1)

Get comprehensive information about the merchant.

```typescript
const merchantInfo = await sdk.merchant.getMerchantInfo();
```

**Response includes:**
- `merchant_name`: Name of the merchant
- `auth_time`: Timestamp when merchant was authorized
- `expire_time`: Authorization expiration date
- `merchant_currency`: Currency code (CNY, USD, KRW, etc.)
- `merchant_region`: Region code (CN, KR, HK, etc.)
- `is_upgraded_cbsc`: Whether merchant is upgraded to CBSC
- `is_cnsc`: Whether this is a CNSC merchant

**Example Response:**
```typescript
{
  request_id: "4022b2fcf376045bba533b504e02476a",
  error: "",
  message: "",
  merchant_name: "CNSC Company 7",
  is_cnsc: true,
  auth_time: 1650624369,
  expire_time: 1682179199,
  merchant_currency: "CNY",
  merchant_region: "CN",
  is_upgraded_cbsc: true
}
```

### getMerchantPrepaidAccountList()

**API Documentation:** [v2.merchant.get_merchant_prepaid_account_list](https://open.shopee.com/documents/v2/v2.merchant.get_merchant_prepaid_account_list?module=93&type=1)

Get the seller's courier prepaid account list.

```typescript
const accounts = await sdk.merchant.getMerchantPrepaidAccountList({
  page_no: 1,
  page_size: 100,
});
```

**Parameters:**
- `page_no` (required): Page number, starting from 1
- `page_size` (required): Number of items per page, maximum 100

**Response includes:**
- `list`: Array of prepaid accounts with:
  - `prepaid_account_id`: Account ID
  - `prepaid_account_courier_key`: Courier identifier (e.g., "jd", "shunfeng")
  - `prepaid_account_courier_name`: Display name of courier
  - `prepaid_account_is_default`: Whether this is the default account
  - `prepaid_account_partner_id`: Partner ID for the account
  - Partner credentials (may be masked for security)
- `more`: Whether there are more pages
- `total`: Total number of accounts

**Example Response:**
```typescript
{
  request_id: "77d031430cb946209c877fef646be9f5",
  error: "",
  response: {
    list: [
      {
        prepaid_account_id: 19,
        prepaid_account_courier_key: "jd",
        prepaid_account_courier_name: "京东快递",
        prepaid_account_is_default: true,
        prepaid_account_partner_id: "020K3075414"
      },
      // ... more accounts
    ],
    more: false,
    total: 8
  }
}
```

### getMerchantWarehouseList()

**API Documentation:** [v2.merchant.get_merchant_warehouse_list](https://open.shopee.com/documents/v2/v2.merchant.get_merchant_warehouse_list?module=93&type=1)

Get merchant warehouse list with pagination using double-sided cursor.

```typescript
const warehouses = await sdk.merchant.getMerchantWarehouseList({
  cursor: {
    next_id: 0, // 0 or null for first page
    page_size: 30,
  },
});
```

**Parameters:**
- `cursor` (required): Pagination cursor
  - `next_id`: ID for next page (0 or null for first page)
  - `prev_id`: ID for previous page
  - `page_size`: Number of items per page

**Pagination Guide:**
- **First page**: Set `next_id = 0` or `null`, specify `page_size`
- **Next page**: Use `next_id` from previous response, set `prev_id = null`
- **Previous page**: Use `prev_id` from previous response, set `next_id = null`
- **No more next data**: `next_id` in response is `null`
- **No more prev data**: `prev_id` in response is `null`

**Response includes:**
- `warehouse_list`: Array of warehouses with:
  - `warehouse_id`: Warehouse identifier
  - `warehouse_name`: Name of warehouse
  - `warehouse_type`: 1 = pickup, 2 = return
  - `warehouse_region`: Region code
  - `location_id`: Location identifier
  - `address`: Complete address details (street, city, state, zip code)
  - `enterprise_info`: Enterprise information (for applicable regions like Brazil)
- `cursor`: Updated pagination cursor
- `total_count`: Total number of warehouses

**Example Response:**
```typescript
{
  request_id: "9b73908eb0237c86670147a8883b7210",
  error: "",
  response: {
    warehouse_list: [
      {
        warehouse_id: 10001027,
        warehouse_name: "MX Warehouse 1",
        warehouse_region: "MX",
        warehouse_type: 1,
        location_id: "MX1004MQZ",
        address: {
          address: "Calle Becal, MZ28 LT23, test",
          address_name: "mx tester",
          city: "Tlalpan",
          state: "Ciudad de México",
          zip_code: "14240",
          region: "MX"
        }
      }
    ],
    cursor: {
      next_id: null,
      prev_id: null,
      page_size: 30
    },
    total_count: 12
  }
}
```

### getMerchantWarehouseLocationList()

**API Documentation:** [v2.merchant.get_merchant_warehouse_location_list](https://open.shopee.com/documents/v2/v2.merchant.get_merchant_warehouse_location_list?module=93&type=1)

Get a simplified list of merchant warehouse locations.

```typescript
const locations = await sdk.merchant.getMerchantWarehouseLocationList();
```

**Response includes:**
- Array of warehouse locations with:
  - `location_id`: Location identifier
  - `warehouse_name`: Name of warehouse

This endpoint provides a quick overview of available warehouse locations without the detailed address information provided by `getMerchantWarehouseList()`.

**Example Response:**
```typescript
{
  request_id: "7131251eb8519f10dd18e03167a42d71",
  error: "",
  response: [
    {
      location_id: "CNZ",
      warehouse_name: "warehouse1"
    },
    {
      location_id: "USZ",
      warehouse_name: "warehouse2"
    }
  ]
}
```

### getShopListByMerchant()

**API Documentation:** [v2.merchant.get_shop_list_by_merchant](https://open.shopee.com/documents/v2/v2.merchant.get_shop_list_by_merchant?module=93&type=1)

Get list of shops authorized to the partner and bound to the merchant.

```typescript
const shops = await sdk.merchant.getShopListByMerchant({
  page_no: 1,
  page_size: 100,
});
```

**Parameters:**
- `page_no` (required): Page number, starting from 1
- `page_size` (required): Number of items per page, maximum 500

**Response includes:**
- `shop_list`: Array of shops with:
  - `shop_id`: Shopee's unique shop identifier
  - `sip_affi_shops`: Array of SIP affiliate shops (only for primary shops)
- `more`: Whether there are more pages
- `is_cnsc`: Whether this is a CNSC merchant

**Example Response:**
```typescript
{
  request_id: "nGwxMqhTRqgbpfmNlbvgcTZEenLPmyyo",
  error: "",
  is_cnsc: true,
  shop_list: [
    {
      shop_id: 601306294
    },
    {
      shop_id: 601306295,
      sip_affi_shops: [
        { affi_shop_id: 123456 },
        { affi_shop_id: 789012 }
      ]
    }
  ],
  more: false
}
```

### getWarehouseEligibleShopList()

**API Documentation:** [v2.merchant.get_warehouse_eligible_shop_list](https://open.shopee.com/documents/v2/v2.merchant.get_warehouse_eligible_shop_list?module=93&type=1)

Get eligible shop list by warehouse ID.

```typescript
const eligibleShops = await sdk.merchant.getWarehouseEligibleShopList({
  warehouse_id: 10001027,
  warehouse_type: 1, // 1 = pickup, 2 = return
  cursor: {
    next_id: 0,
    page_size: 30,
  },
});
```

**Parameters:**
- `warehouse_id` (required): Warehouse address identifier
- `warehouse_type` (required): 1 = pickup warehouse, 2 = return warehouse
- `cursor` (required): Pagination cursor
  - `next_id`: ID for next page
  - `prev_id`: ID for previous page
  - `page_size`: Number of items per page (limit: 1-30)

**Response includes:**
- `shop_list`: Array of eligible shops with:
  - `shop_id`: Shop identifier
  - `shop_name`: Name of the shop
- `cursor`: Updated pagination cursor

This endpoint is useful for determining which shops can use a particular warehouse for pickups (warehouse_type = 1) or returns (warehouse_type = 2).

**Example Response:**
```typescript
{
  request_id: "94bec7620823b3e78ed50fa6c8ec8381",
  error: "",
  response: {
    shop_list: [
      {
        shop_id: 222859294,
        shop_name: "test_shop11"
      },
      {
        shop_id: 222859295,
        shop_name: "test_shop12"
      }
    ],
    cursor: {
      next_id: 222859324,
      prev_id: null,
      page_size: 4
    }
  }
}
```

## Common Use Cases

### Getting All Warehouses with Pagination

```typescript
async function getAllWarehouses() {
  const allWarehouses = [];
  let cursor = { next_id: 0, page_size: 30 };
  
  do {
    const response = await sdk.merchant.getMerchantWarehouseList({ cursor });
    
    if (response.response?.warehouse_list) {
      allWarehouses.push(...response.response.warehouse_list);
    }
    
    cursor = {
      next_id: response.response?.cursor.next_id ?? null,
      page_size: 30,
    };
  } while (cursor.next_id !== null);
  
  return allWarehouses;
}
```

### Finding Shops for a Warehouse

```typescript
async function findShopsForWarehouse(warehouseId: number, isPickup: boolean = true) {
  const warehouseType = isPickup ? 1 : 2;
  
  const response = await sdk.merchant.getWarehouseEligibleShopList({
    warehouse_id: warehouseId,
    warehouse_type: warehouseType,
    cursor: {
      next_id: 0,
      page_size: 30,
    },
  });
  
  return response.response?.shop_list ?? [];
}
```

### Getting All Shops Bound to Merchant

```typescript
async function getAllMerchantShops() {
  const allShops = [];
  let pageNo = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await sdk.merchant.getShopListByMerchant({
      page_no: pageNo,
      page_size: 100,
    });
    
    allShops.push(...response.shop_list);
    hasMore = response.more;
    pageNo++;
  }
  
  return allShops;
}
```

## Error Handling

All merchant endpoints return standard Shopee API error responses:

```typescript
try {
  const merchantInfo = await sdk.merchant.getMerchantInfo();
  console.log(merchantInfo);
} catch (error) {
  if (error instanceof ShopeeApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.status);
    console.error('Data:', error.data);
  }
}
```

Common errors:
- `error_auth`: Invalid access_token or no permission
- `error_param`: Invalid or missing parameters
- `error_data`: Data not found or parse error
- `error_network`: Internal network error
- `error_sign`: Wrong signature

## Region Support

The Merchant API primarily supports Cross-Border (CB) and Cross-Border Seller Center (CNSC/CBSC) merchants in regions:
- **CN**: China (CNY, USD)
- **KR**: Korea (KRW, USD)
- **HK**: Hong Kong (USD, HKD)

Regular regional merchants may have limited access to these endpoints.
