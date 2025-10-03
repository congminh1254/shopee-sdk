# ShopCategoryManager

The ShopCategoryManager handles shop category (collection) management for organizing products into custom categories within your shop.

## Overview

The ShopCategoryManager provides methods for:
- Creating and managing shop categories (collections)
- Organizing items into categories
- Managing category status and visibility
- Retrieving category and item information

Shop categories allow you to organize your products into custom groups for better product discovery and shopping experience. Each shop can have up to 1,500 categories.

## Quick Start

```typescript
// Create a new shop category
const category = await sdk.shopCategory.addShopCategory({
  name: 'Summer Collection',
  sort_weight: 10,
});

// Add items to the category
await sdk.shopCategory.addItemList({
  shop_category_id: category.response.shop_category_id,
  item_list: [100001, 100002, 100003],
});

// Get all categories
const categories = await sdk.shopCategory.getShopCategoryList({
  page_size: 100,
  page_no: 1,
});

// Update a category
await sdk.shopCategory.updateShopCategory({
  shop_category_id: category.response.shop_category_id,
  name: 'Summer Sale',
  status: 'NORMAL',
});

// Delete a category
await sdk.shopCategory.deleteShopCategory({
  shop_category_id: category.response.shop_category_id,
});
```

## Methods

### getShopCategoryList()

**API Documentation:** [v2.shop_category.get_shop_category_list](https://open.shopee.com/documents/v2/v2.shop_category.get_shop_category_list?module=101&type=1)

Get a paginated list of shop categories.

```typescript
const response = await sdk.shopCategory.getShopCategoryList({
  page_size: 100,
  page_no: 1,
});

console.log('Total categories:', response.response.total_count);
console.log('Has more pages:', response.response.more);

response.response.shop_categorys.forEach((category) => {
  console.log('---');
  console.log('Category ID:', category.shop_category_id);
  console.log('Name:', category.name);
  console.log('Status:', category.status); // 1: NORMAL, 2: INACTIVE, 0: DELETED
  console.log('Sort weight:', category.sort_weight);
  console.log('Created by:', category.created_by);
});
```

**Parameters:**
- `page_size` (required): Number of results per page. Range: [1, 100]
- `page_no` (required): Page number. Range: [1, 2147483647]

**Category Status:**
- `1`: NORMAL - Active and visible
- `2`: INACTIVE - Hidden but not deleted
- `0`: DELETED - Deleted category

**Example Response:**
```typescript
{
  request_id: "26982ef64176bd5730503d0342514f9e",
  error: "",
  message: "",
  response: {
    shop_categorys: [
      {
        shop_category_id: 114559550,
        status: 2,
        name: "rule-based joandy test",
        sort_weight: 52,
        created_by: "Seller | Rule Selection"
      },
      {
        shop_category_id: 136321997,
        status: 2,
        name: "12345",
        sort_weight: 31,
        created_by: "Seller | Rule Selection"
      }
    ],
    more: true,
    total_count: 45
  }
}
```

---

### addShopCategory()

**API Documentation:** [v2.shop_category.add_shop_category](https://open.shopee.com/documents/v2/v2.shop_category.add_shop_category?module=101&type=1)

Create a new shop category (collection).

```typescript
const response = await sdk.shopCategory.addShopCategory({
  name: 'Winter Collection 2024',
  sort_weight: 15,
});

console.log('Category ID:', response.response.shop_category_id);
```

**Parameters:**
- `name` (required): Category name (max 40 characters)
- `sort_weight` (optional): Sort weight for ordering categories. Range: [0, 2147483546]

**Important Notes:**
- Maximum 1,500 categories per shop
- Category names must be unique within the shop
- Names cannot exceed 40 characters
- Automatic and Shopee-managed categories cannot be manually created

**Common Errors:**
```typescript
// Duplicate name
{
  error: "error_param",
  message: "ShopCategory name is duplicated."
}

// Name too long
{
  error: "error_param",
  message: "ShopCategory name length cannot exceed 40 characters."
}

// Maximum categories reached
{
  error: "error_param",
  message: "You've reached the maximum number 1500 of categories, please delete some categories to create new"
}
```

**Example Response:**
```typescript
{
  request_id: "7f22f503112102b848045323686d6b6b",
  error: "",
  message: "",
  response: {
    shop_category_id: 29333
  }
}
```

---

### updateShopCategory()

**API Documentation:** [v2.shop_category.update_shop_category](https://open.shopee.com/documents/v2/v2.shop_category.update_shop_category?module=101&type=1)

Update an existing shop category.

```typescript
const response = await sdk.shopCategory.updateShopCategory({
  shop_category_id: 29333,
  name: 'Updated Winter Collection',
  sort_weight: 20,
  status: 'NORMAL',
});

console.log('Updated category:', response.response.name);
console.log('Status:', response.response.status);
```

**Parameters:**
- `shop_category_id` (required): The category ID to update
- `name` (optional): New category name (max 40 characters)
- `sort_weight` (optional): New sort weight. Range: [0, 2147483546]
- `status` (optional): New status. Values: NORMAL, INACTIVE, DELETED

**Important Notes:**
- Shopee-managed categories cannot edit name and sort_weight
- Automatic categories have restrictions
- At least one parameter must be changed

**Common Errors:**
```typescript
// Nothing to change
{
  error: "error_param",
  message: "Nothing changes on the shop category update operation."
}

// Shopee category restriction
{
  error: "error_param",
  message: "Shopee 24 category cannot edit the name and sort_weight."
}
```

**Example Response:**
```typescript
{
  request_id: "062afea7ca7c225a7966b5bf97570bc1",
  error: "",
  message: "",
  response: {
    status: "NORMAL",
    shop_category_id: 29333,
    sort_weight: 21,
    name: "OA_V2_11"
  }
}
```

---

### deleteShopCategory()

**API Documentation:** [v2.shop_category.delete_shop_category](https://open.shopee.com/documents/v2/v2.shop_category.delete_shop_category?module=101&type=1)

Delete a shop category.

```typescript
const response = await sdk.shopCategory.deleteShopCategory({
  shop_category_id: 9209570,
});

console.log('Deleted category ID:', response.response.shop_category_id);
```

**Parameters:**
- `shop_category_id` (required): The category ID to delete

**Important Notes:**
- Only manually created categories can be deleted
- Automatic and Shopee-managed categories cannot be deleted
- Items in the category will not be deleted, only the category itself

**Common Errors:**
```typescript
// Cannot delete automatic/Shopee category
{
  error: "error_param",
  message: "Automatic & shopee category cannot be deleted."
}

// Category not found
{
  error: "error_param",
  message: "This shop category doesn't exist."
}
```

**Example Response:**
```typescript
{
  request_id: "7d5a89985a362f381d82e6499454ac6f",
  error: "",
  message: "",
  response: {
    shop_category_id: 9209570
  }
}
```

---

### addItemList()

**API Documentation:** [v2.shop_category.add_item_list](https://open.shopee.com/documents/v2/v2.shop_category.add_item_list?module=101&type=1)

Add items to a shop category.

```typescript
const response = await sdk.shopCategory.addItemList({
  shop_category_id: 29333,
  item_list: [100908152, 100908153, 100908154, 100908155],
});

console.log('Items in category:', response.response.current_count);

if (response.response.invalid_item_id_list) {
  console.log('Invalid items:');
  response.response.invalid_item_id_list.forEach((invalid) => {
    console.log('- Item ID:', invalid.item_id);
    console.log('  Error:', invalid.fail_error);
    console.log('  Message:', invalid.fail_message);
  });
}
```

**Parameters:**
- `shop_category_id` (required): The category ID to add items to
- `item_list` (required): Array of item IDs to add (max 100 items per request)

**Important Notes:**
- Maximum 100 items can be added per request
- Maximum 5,000 items per category
- Automatic and Shopee-managed categories cannot add items manually
- Items must belong to your shop and be in normal status

**Common Errors:**
```typescript
// Category limit exceeded
{
  error: "error_param",
  message: "The total item number has exceed its limit number : 5000."
}

// Cannot add to automatic category
{
  error: "error_param",
  message: "Automatic & shopee category cannot add items."
}
```

**Example Response with Invalid Items:**
```typescript
{
  request_id: "36616164626338323038343831363337",
  error: "",
  message: "",
  response: {
    shop_category_id: 100006468,
    current_count: 1,
    invalid_item_id_list: [
      {
        item_id: 8002383931,
        fail_message: "The item id you provided is not normal. Please check.",
        fail_error: "err_not_normal_item"
      }
    ]
  }
}
```

---

### deleteItemList()

**API Documentation:** [v2.shop_category.delete_item_list](https://open.shopee.com/documents/v2/v2.shop_category.delete_item_list?module=101&type=1)

Delete items from a shop category.

```typescript
const response = await sdk.shopCategory.deleteItemList({
  shop_category_id: 29333,
  item_list: [100908152, 100908153],
});

console.log('Remaining items:', response.response.current_count);

if (response.response.invalid_item_id_list) {
  console.log('Items not found in category:');
  response.response.invalid_item_id_list.forEach((invalid) => {
    console.log('- Item ID:', invalid.item_id);
    console.log('  Error:', invalid.fail_error);
  });
}
```

**Parameters:**
- `shop_category_id` (required): The category ID to remove items from
- `item_list` (required): Array of item IDs to remove (max 100 items per request)

**Important Notes:**
- Maximum 100 items can be deleted per request
- Automatic and Shopee-managed categories cannot delete items manually
- Only items that exist in the category can be removed

**Common Errors:**
```typescript
// Cannot delete from automatic category
{
  error: "error_param",
  message: "Automatic & shopee category cannot delete items"
}

// Too many items
{
  error: "error_param",
  message: "At most 100 items can be deleted per operation."
}
```

**Example Response:**
```typescript
{
  request_id: "2bf799cd6f6bb4a1486519c3def3280c",
  error: "",
  message: "",
  response: {
    shop_category_id: 29333,
    current_count: 0,
    invalid_item_id_list: [
      {
        item_id: 100908152,
        fail_message: "The item id you provided not exist in category. Please check.",
        fail_error: "err_not_exist_item"
      }
    ]
  }
}
```

---

### getItemList()

**API Documentation:** [v2.shop_category.get_item_list](https://open.shopee.com/documents/v2/v2.shop_category.get_item_list?module=101&type=1)

Get the list of items in a shop category.

```typescript
const response = await sdk.shopCategory.getItemList({
  shop_category_id: 231232,
  page_size: 100,
  page_no: 1,
});

console.log('Total items:', response.response.total_count);
console.log('Has more pages:', response.response.more);
console.log('Item IDs:', response.response.item_list);
```

**Parameters:**
- `shop_category_id` (required): The category ID to get items from
- `page_size` (optional): Results per page. Default: 1000. Range: [0, 1000]
- `page_no` (optional): Page number. Default: 0. page_size * page_no should be ≤ 2147483446

**Pagination:**
```typescript
// Fetch all items across multiple pages
let allItems = [];
let page = 1;
let hasMore = true;

while (hasMore) {
  const response = await sdk.shopCategory.getItemList({
    shop_category_id: 231232,
    page_size: 100,
    page_no: page,
  });
  
  allItems = allItems.concat(response.response.item_list);
  hasMore = response.response.more;
  page++;
}

console.log('Total items fetched:', allItems.length);
```

**Example Response:**
```typescript
{
  request_id: "375ae1023f7396e34904fddfaafed901",
  error: "",
  message: "",
  response: {
    item_list: [100908154, 100908155],
    more: false,
    total_count: 2
  }
}
```

## Best Practices

### 1. Organizing Categories

```typescript
// Use meaningful names and sort weights
const categories = [
  { name: 'New Arrivals', sort_weight: 1 },
  { name: 'Best Sellers', sort_weight: 2 },
  { name: 'On Sale', sort_weight: 3 },
  { name: 'Seasonal', sort_weight: 4 },
];

for (const cat of categories) {
  await sdk.shopCategory.addShopCategory(cat);
}
```

### 2. Batch Adding Items

```typescript
// Split large item lists into batches of 100
const allItems = [/* array of 500 item IDs */];
const batchSize = 100;

for (let i = 0; i < allItems.length; i += batchSize) {
  const batch = allItems.slice(i, i + batchSize);
  
  const result = await sdk.shopCategory.addItemList({
    shop_category_id: 12345,
    item_list: batch,
  });
  
  console.log(`Added batch ${i / batchSize + 1}:`, result.response.current_count);
}
```

### 3. Error Handling

```typescript
try {
  const result = await sdk.shopCategory.addShopCategory({
    name: 'New Collection',
    sort_weight: 10,
  });
  
  if (result.error) {
    switch (result.error) {
      case 'error_param':
        if (result.message.includes('duplicated')) {
          console.error('Category name already exists');
        } else if (result.message.includes('1500')) {
          console.error('Maximum categories reached');
        }
        break;
      default:
        console.error('Error:', result.error, result.message);
    }
  } else {
    console.log('Success! Category ID:', result.response.shop_category_id);
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

### 4. Managing Category Status

```typescript
// Deactivate a category instead of deleting
await sdk.shopCategory.updateShopCategory({
  shop_category_id: 12345,
  status: 'INACTIVE',
});

// Later, reactivate it
await sdk.shopCategory.updateShopCategory({
  shop_category_id: 12345,
  status: 'NORMAL',
});
```

### 5. Checking Invalid Items

```typescript
const result = await sdk.shopCategory.addItemList({
  shop_category_id: 12345,
  item_list: [100001, 100002, 100003],
});

if (result.response.invalid_item_id_list?.length) {
  console.warn('Some items could not be added:');
  result.response.invalid_item_id_list.forEach((invalid) => {
    console.warn(`- ${invalid.item_id}: ${invalid.fail_message}`);
  });
}

console.log('Successfully added items. Total:', result.response.current_count);
```

## Complete Example

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';
import { ShopeeRegion } from '@congminh1254/shopee-sdk/schemas';

const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your_partner_key',
  shop_id: 789012,
  region: ShopeeRegion.SINGAPORE,
});

async function manageCategoryExample() {
  // 1. Create a new category
  const newCategory = await sdk.shopCategory.addShopCategory({
    name: 'Flash Sale Items',
    sort_weight: 1,
  });
  
  const categoryId = newCategory.response.shop_category_id;
  console.log('✅ Created category:', categoryId);
  
  // 2. Add items to the category
  const itemsToAdd = [100001, 100002, 100003, 100004, 100005];
  const addResult = await sdk.shopCategory.addItemList({
    shop_category_id: categoryId,
    item_list: itemsToAdd,
  });
  
  console.log('✅ Added items. Total:', addResult.response.current_count);
  
  // 3. Get items in the category
  const items = await sdk.shopCategory.getItemList({
    shop_category_id: categoryId,
    page_size: 100,
    page_no: 1,
  });
  
  console.log('✅ Items in category:', items.response.item_list);
  
  // 4. Update category name
  await sdk.shopCategory.updateShopCategory({
    shop_category_id: categoryId,
    name: 'Mega Flash Sale',
  });
  
  console.log('✅ Updated category name');
  
  // 5. Remove some items
  await sdk.shopCategory.deleteItemList({
    shop_category_id: categoryId,
    item_list: [100001, 100002],
  });
  
  console.log('✅ Removed items from category');
  
  // 6. Get all categories
  const allCategories = await sdk.shopCategory.getShopCategoryList({
    page_size: 100,
    page_no: 1,
  });
  
  console.log('✅ Total categories:', allCategories.response.total_count);
  
  // 7. Deactivate the category
  await sdk.shopCategory.updateShopCategory({
    shop_category_id: categoryId,
    status: 'INACTIVE',
  });
  
  console.log('✅ Category deactivated');
}

manageCategoryExample().catch(console.error);
```

## Error Handling

### Common Error Codes

| Error | Description | Solution |
|-------|-------------|----------|
| `error_param` | Invalid parameters | Check parameter values and constraints |
| `error_auth` | Invalid access_token or partner_id | Refresh authentication |
| `error_service` | Shop category id is not found | Verify category ID exists |
| `error_data` | Data not exist | Check if resource exists |

### Category-Specific Errors

```typescript
// Handle specific category errors
const handleCategoryError = (result) => {
  if (!result.error) return true;
  
  const { error, message } = result;
  
  if (message.includes('duplicated')) {
    console.error('❌ Category name already exists');
    return false;
  }
  
  if (message.includes('1500')) {
    console.error('❌ Maximum categories (1500) reached');
    return false;
  }
  
  if (message.includes('Automatic & shopee category')) {
    console.error('❌ Cannot modify system-managed category');
    return false;
  }
  
  console.error('❌ Error:', error, message);
  return false;
};
```

## Rate Limits

Be mindful of API rate limits when:
- Batch processing large numbers of categories
- Adding/removing many items
- Fetching all categories across multiple pages

Consider implementing:
- Delays between batch operations
- Retry logic with exponential backoff
- Caching frequently accessed category data
