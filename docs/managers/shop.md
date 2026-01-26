# ShopManager

The ShopManager handles all shop-related operations including retrieving shop information, updating shop profile, managing warehouse details, and handling shop notifications.

## Overview

The ShopManager provides methods for:
- **Shop Information**: Get shop profile and detailed shop information
- **Profile Management**: Update shop name, logo, and description
- **Warehouse Management**: Retrieve warehouse details and addresses
- **Notifications**: Get seller center notifications
- **Authorised Brands**: List authorised reseller brands for the shop

## Quick Start

```typescript
// Get shop profile
const profile = await sdk.shop.getProfile();
console.log('Shop name:', profile.response.shop_name);

// Get detailed shop information
const shopInfo = await sdk.shop.getShopInfo();
console.log('Region:', shopInfo.region);
console.log('Status:', shopInfo.status);

// Update shop profile
await sdk.shop.updateProfile({
  shop_name: 'New Shop Name',
  description: 'Welcome to our shop!'
});
```

## Shop Information Methods

### getProfile()

**API Documentation:** [v2.shop.get_profile](https://open.shopee.com/documents/v2/v2.shop.get_profile?module=92&type=1)

Get basic shop profile information including shop name, logo, and description.

```typescript
const profile = await sdk.shop.getProfile();

console.log('Shop name:', profile.response.shop_name);
console.log('Shop logo:', profile.response.shop_logo);
console.log('Description:', profile.response.description);

// For BR CNPJ sellers, invoice_issuer is also returned
if (profile.response.invoice_issuer) {
  console.log('Invoice issuer:', profile.response.invoice_issuer);
}
```

**Response Fields:**
- `shop_name`: The shop name
- `shop_logo`: URL of the shop logo image
- `description`: Shop description text
- `invoice_issuer`: (BR only) Invoice issuer information ("Shopee" or "Other")

**Common Errors:**
- `error_auth`: Invalid access_token or partner_id
- `error_param`: Missing or invalid parameters
- `error_shop`: Invalid shop_id

---

### getShopInfo()

**API Documentation:** [v2.shop.get_shop_info](https://open.shopee.com/documents/v2/v2.shop.get_shop_info?module=92&type=1)

Get comprehensive shop information including region, status, authorization details, and fulfillment settings.

```typescript
const shopInfo = await sdk.shop.getShopInfo();

console.log('Shop name:', shopInfo.shop_name);
console.log('Region:', shopInfo.region);
console.log('Status:', shopInfo.status); // NORMAL, BANNED, or FROZEN
console.log('Is cross-border shop:', shopInfo.is_cb);
console.log('Authorization expires:', new Date(shopInfo.expire_time * 1000));

// Check if shop is a SIP primary shop
if (shopInfo.is_sip && shopInfo.sip_affi_shops) {
  console.log('SIP affiliate shops:', shopInfo.sip_affi_shops.length);
}

// Check if shop has merchant
if (shopInfo.merchant_id) {
  console.log('Merchant ID:', shopInfo.merchant_id);
}

// Check fulfillment type
console.log('Fulfillment flag:', shopInfo.shop_fulfillment_flag);

// Check if shop is part of Cross Border Direct Selling model
if (shopInfo.is_main_shop && shopInfo.linked_direct_shop_list) {
  shopInfo.linked_direct_shop_list.forEach(shop => {
    console.log(`Direct shop: ${shop.direct_shop_id} in ${shop.direct_shop_region}`);
  });
}
```

**Response Fields:**
- `shop_name`: Name of the shop
- `region`: Shop's region (e.g., "SG", "MY", "TW")
- `status`: Shop status - "NORMAL", "BANNED", or "FROZEN"
- `is_cb`: Whether the shop is a cross-border shop
- `auth_time`: Timestamp when shop was authorized to partner
- `expire_time`: Authorization expiration timestamp
- `is_sip`: Whether this is a SIP (Shopee Integrated Platform) shop
- `sip_affi_shops`: List of SIP affiliate shops (for SIP primary shops)
- `merchant_id`: Merchant ID if shop belongs to a merchant
- `is_upgraded_cbsc`: Whether merchant is upgraded to CBSC (CNSC/KRSC)
- `shop_fulfillment_flag`: Fulfillment type ("Pure - FBS Shop", "Pure - 3PF Shop", "PFF - FBS Shop", "PFF - 3PF Shop", "LFF Hybrid Shop", "Others", "Unknown")
- `is_main_shop`: Whether shop is a Local Shop linked to Cross Border Direct Shop
- `is_direct_shop`: Whether shop is a Cross Border Direct Shop
- `linked_main_shop_id`: Shop ID of linked Local Shop (for Direct Shops)
- `linked_direct_shop_list`: List of linked Direct Shops (for Local Shops)
- `is_one_awb`: Whether shop is in 1-AWB whitelist
- `is_mart_shop`: Whether shop is a Mart Shop
- `is_outlet_shop`: Whether shop is an Outlet Shop
- `mart_shop_id`: Mart Shop ID (for Outlet Shops)
- `outlet_shop_info_list`: List of Outlet Shop IDs (for Mart Shops)

---

## Profile Management Methods

### updateProfile()

**API Documentation:** [v2.shop.update_profile](https://open.shopee.com/documents/v2/v2.shop.update_profile?module=92&type=1)

Update shop profile information including name, logo, and description.

```typescript
// Update all fields
await sdk.shop.updateProfile({
  shop_name: 'My Awesome Shop',
  shop_logo: 'https://cf.shopee.sg/file/your-logo-url',
  description: 'Welcome to our shop! We offer quality products at great prices.'
});

// Update only shop name
await sdk.shop.updateProfile({
  shop_name: 'New Shop Name'
});

// Update only description
await sdk.shop.updateProfile({
  description: 'Updated shop description with more details about our products.'
});
```

**Parameters:**
- `shop_name` (optional): New shop name
- `shop_logo` (optional): New shop logo URL (must be Shopee image URL)
- `description` (optional): New shop description

**Important Notes:**
- Shop name can only be changed once every 30 days
- Shop name must be within the allowed character limit (varies by region)
- Shop logo must be a valid Shopee image URL
- Description cannot exceed 500 characters

**Common Errors:**
- `error_data_check`: Shop name changed within 30 days
- `error_data_check`: Shop name length invalid
- `error_data_check`: Shop logo URL is not a Shopee image URL
- `error_data_check`: Description exceeds 500 characters

---

## Warehouse Management Methods

### getWarehouseDetail()

**API Documentation:** [v2.shop.get_warehouse_detail](https://open.shopee.com/documents/v2/v2.shop.get_warehouse_detail?module=92&type=1)

Get warehouse details including warehouse ID, address ID, location ID, and full address information.

```typescript
// Get pickup warehouse details (default)
const pickupWarehouses = await sdk.shop.getWarehouseDetail();

pickupWarehouses.response.forEach(warehouse => {
  console.log('Warehouse ID:', warehouse.warehouse_id);
  console.log('Warehouse name:', warehouse.warehouse_name);
  console.log('Location ID:', warehouse.location_id);
  console.log('Address:', warehouse.address);
  console.log('City:', warehouse.city);
  console.log('Zipcode:', warehouse.zipcode);
  console.log('Holiday mode state:', warehouse.holiday_mode_state);
});

// Get return warehouse details
const returnWarehouses = await sdk.shop.getWarehouseDetail({
  warehouse_type: 2
});
```

**Parameters:**
- `warehouse_type` (optional): Type of warehouse to retrieve
  - `1`: Pickup Warehouse (default)
  - `2`: Return Warehouse

**Response Fields (per warehouse):**
- `warehouse_id`: Unique warehouse address identifier
- `warehouse_name`: Warehouse name
- `warehouse_type`: Type (1 = Pickup, 2 = Return)
- `location_id`: Location identifier for stocks
- `address_id`: Address identifier
- `region`: Warehouse region
- `state`: State/province
- `city`: City
- `address`: Detailed address
- `zipcode`: Postal/ZIP code
- `district`: District
- `town`: Town
- `state_code`: State code
- `holiday_mode_state`: Holiday mode status (0 = not in holiday mode, 1 = active, 2 = turning off, 3 = turning on)

**Common Errors:**
- `warehouse.error_can_not_find_warehouse`: No legal warehouse address for shop
- `warehouse.error_not_in_whitelist`: Shop doesn't have multi-warehouse permission
- `warehouse.error_region_can_not_blank`: Region parameter is missing
- `warehouse.error_region_not_valid`: Invalid region value

---

## Notification Methods

### getShopNotification()

**API Documentation:** [v2.shop.get_shop_notification](https://open.shopee.com/documents/v2/v2.shop.get_shop_notification?module=92&type=1)

Get Seller Center notifications. Permission is controlled by app type.

```typescript
// Get latest notifications
const notifications = await sdk.shop.getShopNotification({
  page_size: 10
});

console.log('Notification title:', notifications.data.title);
console.log('Content:', notifications.data.content);
console.log('Created at:', new Date(notifications.data.create_time * 1000));
console.log('URL:', notifications.data.url);

// Get next page using cursor
const nextPage = await sdk.shop.getShopNotification({
  cursor: notifications.cursor,
  page_size: 10
});
```

**Parameters:**
- `cursor` (optional): Last notification_id from previous page. If not provided, returns latest notification
- `page_size` (optional): Number of notifications per page (default: 10, max: 50)

**Response Fields:**
- `cursor`: Last notification_id in this page (use for pagination)
- `data`: Notification data object
  - `create_time`: Notification creation timestamp
  - `content`: Notification content text
  - `title`: Notification title
  - `url`: URL that redirects to Seller Center (if applicable)

**Pagination:**
```typescript
let cursor: number | undefined = undefined;
const allNotifications = [];

do {
  const result = await sdk.shop.getShopNotification({
    cursor,
    page_size: 50
  });
  
  allNotifications.push(result.data);
  cursor = result.cursor;
  
  // Continue if cursor changed (more data available)
} while (cursor !== undefined && /* your condition */);
```

---

## Authorised Brands Methods

### getAuthorisedResellerBrand()

**API Documentation:** [v2.shop.get_authorised_reseller_brand](https://open.shopee.com/documents/v2/v2.shop.get_authorised_reseller_brand?module=92&type=1)

Get the list of authorised reseller brands for the shop.

```typescript
// Get first page of authorised brands
const result = await sdk.shop.getAuthorisedResellerBrand({
  page_no: 1,
  page_size: 10
});

console.log('Is authorised reseller:', result.response.is_authorised_reseller);
console.log('Total brands:', result.response.total_count);

result.response.authorised_brand_list.forEach(brand => {
  console.log(`Brand: ${brand.brand_name} (ID: ${brand.brand_id})`);
});

// Check if there are more pages
if (result.response.more) {
  console.log('More brands available on next page');
}

// Fetch all authorised brands
async function getAllAuthorisedBrands() {
  const allBrands = [];
  let pageNo = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await sdk.shop.getAuthorisedResellerBrand({
      page_no: pageNo,
      page_size: 30
    });

    allBrands.push(...result.response.authorised_brand_list);
    hasMore = result.response.more;
    pageNo++;
  }

  return allBrands;
}
```

**Parameters:**
- `page_no` (required): Page number (starting from 1)
- `page_size` (required): Number of entries per page (min: 1, max: 30)

**Response Fields:**
- `is_authorised_reseller`: Whether the shop is an authorised reseller
- `total_count`: Total number of authorised brands
- `more`: Whether there are more pages available
- `authorised_brand_list`: Array of brand objects
  - `brand_id`: Brand ID (may be same across different regions)
  - `brand_name`: Brand name

**Pagination:**
The API supports pagination for large brand lists. Use the `more` field to determine if additional pages exist, then increment `page_no` to fetch the next page.

---

## Complete Example

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.SINGAPORE
});

// Authenticate first
await sdk.authenticateWithCode('AUTH_CODE');

// Get shop information
const shopInfo = await sdk.shop.getShopInfo();
console.log('Shop:', shopInfo.shop_name);
console.log('Status:', shopInfo.status);
console.log('Region:', shopInfo.region);

// Get shop profile
const profile = await sdk.shop.getProfile();
console.log('Description:', profile.response.description);

// Update shop profile
await sdk.shop.updateProfile({
  description: 'Updated description with new information!'
});

// Get warehouse details
const warehouses = await sdk.shop.getWarehouseDetail();
warehouses.response.forEach(wh => {
  console.log(`Warehouse: ${wh.warehouse_name} (Location: ${wh.location_id})`);
});

// Get notifications
const notifications = await sdk.shop.getShopNotification({ page_size: 5 });
console.log('Latest notification:', notifications.data.title);

// Get authorised brands
const brands = await sdk.shop.getAuthorisedResellerBrand({
  page_no: 1,
  page_size: 10
});

if (brands.response.is_authorised_reseller) {
  console.log('Authorised brands:', brands.response.total_count);
  brands.response.authorised_brand_list.forEach(brand => {
    console.log(`- ${brand.brand_name}`);
  });
}
```

## Best Practices

1. **Shop Profile Updates**: Be aware of the 30-day restriction on shop name changes. Plan updates carefully.

2. **Warehouse Management**: Store `warehouse_id` and `location_id` for inventory management operations.

3. **Notification Polling**: Use the cursor-based pagination to efficiently fetch new notifications without missing any.

4. **Brand Authorization**: Check `is_authorised_reseller` before attempting to use brand-related features.

5. **Error Handling**: Always check the `error` field in responses and handle errors appropriately:
   ```typescript
   const profile = await sdk.shop.getProfile();
   if (profile.error) {
     console.error('Error:', profile.error, profile.message);
   } else {
     // Process profile data
   }
   ```

6. **Token Expiration**: Monitor `expire_time` from `getShopInfo()` to refresh tokens before expiration.

## Related Managers

- **[AuthManager](./auth.md)**: For shop authorization and token management
- **[PublicManager](./public.md)**: For getting shop lists by partner
- **[ProductManager](./product.md)**: For managing products in the shop
- **[OrderManager](./order.md)**: For managing shop orders


---

### getBRShopOnboardingInfo()

**API Documentation:** [v2.shop.get_br_shop_onboarding_info](https://open.shopee.com/documents/v2/v2.shop.get_br_shop_onboarding_info?module=93&type=1)

**[For BR Shop Only]** Get shop KYC registration and qualification information.

```typescript
const response = await sdk.shop.getBRShopOnboardingInfo();

console.log('Tax ID Type:', response.response?.tax_id_type); // 1: CPF, 2: CNPJ
console.log('Tax ID:', response.response?.tax_id);
console.log('Onboarding Status:', response.response?.onboarding_status);
console.log('KYC Passed:', response.response?.onboarding_passed);

if (response.response?.tax_id_type === 1) {
  console.log('Name:', response.response?.name);
  console.log('CPF:', response.response?.cpf_id);
  console.log('Birthday:', response.response?.birthday_str);
} else if (response.response?.tax_id_type === 2) {
  console.log('Legal Entity:', response.response?.legal_entity_name);
  console.log('CNPJ:', response.response?.cnpj_id);
  console.log('CNAE Main:', response.response?.cnae_main);
}

// Billing address
console.log('Address:', response.response?.billing_address);
```

**Use Cases:**
- Verify shop KYC status
- Retrieve tax identification
- Check onboarding completion
- Get billing address information

**Onboarding Status Values:**
- 0: None
- 1: Regis Processing
- 2: Regis Validated
- 3: Regis Rejected
- 4: KYC Pending
- 5: KYC Processing
- 6: KYC Processing Manually
- 7: KYC Validated
- 8: KYC Rejected

---

### getShopHolidayMode()

**API Documentation:** [v2.shop.get_shop_holiday_mode](https://open.shopee.com/documents/v2/v2.shop.get_shop_holiday_mode?module=93&type=1)

Check whether a shop has enabled holiday mode.

```typescript
const response = await sdk.shop.getShopHolidayMode();

console.log('Holiday mode:', response.response?.holiday_mode_on ? 'ON' : 'OFF');
console.log('Last modified:', new Date(response.response?.holiday_mode_mtime * 1000));
```

**Use Cases:**
- Check current holiday mode status
- Verify when holiday mode was last changed
- Integrate with shop management systems

---

### setShopHolidayMode()

**API Documentation:** [v2.shop.set_shop_holiday_mode](https://open.shopee.com/documents/v2/v2.shop.set_shop_holiday_mode?module=93&type=1)

Enable or disable holiday mode for a shop.

```typescript
// Enable holiday mode
const response = await sdk.shop.setShopHolidayMode({
  holiday_mode_on: true,
});

console.log('Holiday mode enabled');

// Disable holiday mode
const response2 = await sdk.shop.setShopHolidayMode({
  holiday_mode_on: false,
});

console.log('Holiday mode disabled');
```

**Use Cases:**
- Temporarily pause shop operations
- Automate shop closure during vacations
- Manage shop availability

**Note:** When holiday mode is enabled, customers cannot place orders from the shop.
