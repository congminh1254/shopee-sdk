# ProductManager

The ProductManager handles all product catalog operations including creating, updating, retrieving, and managing products and their variations.

## Overview

The ProductManager provides methods for:
- **Item Management**: Add, update, delete, and list products
- **Variations**: Manage product variations (size, color, etc.)
- **Stock & Pricing**: Update inventory and prices
- **Categories & Attributes**: Get categories and product attributes
- **Comments**: Retrieve and reply to product comments
- **Boosting**: Promote products
- **Compliance**: Check item violations and content diagnostics

## Quick Start

```typescript
// Get product list
const products = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
});

// Get specific product details
const details = await sdk.product.getItemBaseInfo({
  item_id_list: [123456, 789012],
});

// Update product stock
await sdk.product.updateStock({
  item_id: 123456,
  stock_list: [
    {
      model_id: 111,
      normal_stock: 50,
    },
  ],
});
```

## Item Management Methods

### getItemList()

**API Documentation:** [v2.product.get_item_list](https://open.shopee.com/documents/v2/v2.product.get_item_list?module=89&type=1)

Retrieve a list of products from your shop.

```typescript
const response = await sdk.product.getItemList({
  offset: 0,
  page_size: 20,
  update_time_from: Math.floor(Date.now() / 1000) - 86400, // Last 24 hours
  update_time_to: Math.floor(Date.now() / 1000),
  item_status: ['NORMAL', 'BANNED'], // Optional filter
});

console.log('Total items:', response.total_count);
console.log('Items:', response.item);
```

**Common Parameters:**
- `offset`: Starting position for pagination (default: 0)
- `page_size`: Number of items per page (max: 100)
- `update_time_from`: Start of update time range (Unix timestamp)
- `update_time_to`: End of update time range (Unix timestamp)
- `item_status`: Filter by status: NORMAL, DELETED, UNLIST, BANNED

---

### getItemBaseInfo()

**API Documentation:** [v2.product.get_item_base_info](https://open.shopee.com/documents/v2/v2.product.get_item_base_info?module=89&type=1)

Get detailed information about specific products.

```typescript
const response = await sdk.product.getItemBaseInfo({
  item_id_list: [123456, 789012], // Up to 50 item IDs
  need_tax_info: true,             // Include tax information
  need_complaint_policy: true,     // Include complaint policy (PL region)
});

response.item_list.forEach((item) => {
  console.log('Item:', item.item_name);
  console.log('Price:', item.price_info);
  console.log('Stock:', item.stock_info);
  console.log('Dimensions:', item.dimension);
});
```

---

### addItem()

**API Documentation:** [v2.product.add_item](https://open.shopee.com/documents/v2/v2.product.add_item?module=89&type=1)

Create a new product in your shop.

```typescript
const response = await sdk.product.addItem({
  item_name: 'New Product',
  description: 'Product description',
  category_id: 12345,
  price: 99.99,
  stock: 100,
  
  // Images (up to 9)
  image: {
    image_id_list: ['image-id-1', 'image-id-2'],
  },
  
  // Dimensions and weight
  dimension: {
    package_length: 20,
    package_width: 15,
    package_height: 10,
  },
  weight: 0.5,
  
  // Logistics
  logistic_info: [
    {
      logistic_id: 10001,
      enabled: true,
    },
  ],
  
  // Attributes
  attribute_list: [
    {
      attribute_id: 1001,
      attribute_value_list: [
        { value_id: 2001 },
      ],
    },
  ],
});

console.log('New item ID:', response.item_id);
console.log('Warning:', response.warning);
```

---

### updateItem()

**API Documentation:** [v2.product.update_item](https://open.shopee.com/documents/v2/v2.product.update_item?module=89&type=1)

Update an existing product.

```typescript
await sdk.product.updateItem({
  item_id: 123456,
  item_name: 'Updated Product Name',
  description: 'Updated description',
  price: 89.99,
  stock: 150,
  
  // Update specific fields only
  attribute_list: [
    {
      attribute_id: 1001,
      attribute_value_list: [
        { value_id: 2002 },
      ],
    },
  ],
});
```

---

### deleteItem()

**API Documentation:** [v2.product.delete_item](https://open.shopee.com/documents/v2/v2.product.delete_item?module=89&type=1)

Delete a product from your shop.

```typescript
await sdk.product.deleteItem({
  item_id: 123456,
});

console.log('Item deleted');
```

---

### unlistItem()

**API Documentation:** [v2.product.unlist_item](https://open.shopee.com/documents/v2/v2.product.unlist_item?module=89&type=1)

Temporarily remove a product from sale without deleting it.

```typescript
await sdk.product.unlistItem({
  item_id: 123456,
  unlist: true, // true to unlist, false to relist
});
```

## Stock & Pricing Methods

### updateStock()

**API Documentation:** [v2.product.update_stock](https://open.shopee.com/documents/v2/v2.product.update_stock?module=89&type=1)

Update product inventory levels.

```typescript
// Update stock for product with variations
await sdk.product.updateStock({
  item_id: 123456,
  stock_list: [
    {
      model_id: 111, // Variation model ID
      normal_stock: 50,
    },
    {
      model_id: 112,
      normal_stock: 30,
    },
  ],
});

// Update stock for product without variations
await sdk.product.updateStock({
  item_id: 789012,
  stock_list: [
    {
      normal_stock: 100,
    },
  ],
});
```

---

### updatePrice()

**API Documentation:** [v2.product.update_price](https://open.shopee.com/documents/v2/v2.product.update_price?module=89&type=1)

Update product prices.

```typescript
// Update price for product with variations
await sdk.product.updatePrice({
  item_id: 123456,
  price_list: [
    {
      model_id: 111,
      original_price: 99.99,
    },
    {
      model_id: 112,
      original_price: 89.99,
    },
  ],
});

// Update price for product without variations
await sdk.product.updatePrice({
  item_id: 789012,
  price_list: [
    {
      original_price: 79.99,
    },
  ],
});
```

## Variation Methods

### getModelList()

**API Documentation:** [v2.product.get_model_list](https://open.shopee.com/documents/v2/v2.product.get_model_list?module=89&type=1)

Get variation models for a product.

```typescript
const response = await sdk.product.getModelList({
  item_id: 123456,
});

console.log('Variations:', response.tier_variation);
response.model.forEach((model) => {
  console.log('Model:', model.model_sku);
  console.log('Price:', model.price_info);
  console.log('Stock:', model.stock_info);
});
```

---

### initTierVariation()

**API Documentation:** [v2.product.init_tier_variation](https://open.shopee.com/documents/v2/v2.product.init_tier_variation?module=89&type=1)

Initialize product variations (e.g., size, color).

```typescript
await sdk.product.initTierVariation({
  item_id: 123456,
  tier_variation: [
    {
      name: 'Size',
      option_list: [
        { option: 'S' },
        { option: 'M' },
        { option: 'L' },
      ],
    },
    {
      name: 'Color',
      option_list: [
        { option: 'Red', image: { image_id: 'img-1' } },
        { option: 'Blue', image: { image_id: 'img-2' } },
      ],
    },
  ],
  model: [
    {
      tier_index: [0, 0], // S, Red
      normal_stock: 10,
      original_price: 99.99,
      model_sku: 'SKU-S-RED',
    },
    {
      tier_index: [0, 1], // S, Blue
      normal_stock: 15,
      original_price: 99.99,
      model_sku: 'SKU-S-BLUE',
    },
    // ... other combinations
  ],
});
```

---

### updateTierVariation()

**API Documentation:** [v2.product.update_tier_variation](https://open.shopee.com/documents/v2/v2.product.update_tier_variation?module=89&type=1)

Update existing product variations.

```typescript
await sdk.product.updateTierVariation({
  item_id: 123456,
  tier_variation: [
    {
      name: 'Size',
      option_list: [
        { option: 'S' },
        { option: 'M' },
        { option: 'L' },
        { option: 'XL' }, // Add new size
      ],
    },
  ],
});
```

---

### addModel()

**API Documentation:** [v2.product.add_model](https://open.shopee.com/documents/v2/v2.product.add_model?module=89&type=1)

Add a new variation model to an existing product.

```typescript
await sdk.product.addModel({
  item_id: 123456,
  model_list: [
    {
      tier_index: [3, 0], // XL, Red
      normal_stock: 20,
      original_price: 109.99,
      model_sku: 'SKU-XL-RED',
    },
  ],
});
```

---

### updateModel()

**API Documentation:** [v2.product.update_model](https://open.shopee.com/documents/v2/v2.product.update_model?module=89&type=1)

Update existing variation models.

```typescript
await sdk.product.updateModel({
  item_id: 123456,
  model: [
    {
      model_id: 111,
      normal_stock: 50,
      original_price: 99.99,
      seller_stock: [
        {
          stock: 50,
        },
      ],
    },
  ],
});
```

---

### deleteModel()

**API Documentation:** [v2.product.delete_model](https://open.shopee.com/documents/v2/v2.product.delete_model?module=89&type=1)

Delete a variation model from a product.

```typescript
await sdk.product.deleteModel({
  item_id: 123456,
  model_id: 111,
});
```

## Category & Attribute Methods

### getCategory()

**API Documentation:** [v2.product.get_category](https://open.shopee.com/documents/v2/v2.product.get_category?module=89&type=1)

Get the product category tree.

```typescript
// Get root categories
const response = await sdk.product.getCategory({
  language: 'en',
});

console.log('Root categories:', response.category_list);

// Get subcategories
const subcategories = await sdk.product.getCategory({
  parent_category_id: 12345,
  language: 'en',
});
```

---

### getAttributeTree()

**API Documentation:** [v2.product.get_attribute_tree](https://open.shopee.com/documents/v2/v2.product.get_attribute_tree?module=89&type=1)

Get attributes required for a category.

```typescript
const response = await sdk.product.getAttributeTree({
  category_id: 12345,
  language: 'en',
});

response.attribute_list.forEach((attr) => {
  console.log('Attribute:', attr.attribute_name);
  console.log('Required:', attr.is_mandatory);
  console.log('Type:', attr.attribute_type); // TEXT, DROP_DOWN, COMBO_BOX, etc.
  
  if (attr.attribute_value_list) {
    console.log('Values:', attr.attribute_value_list);
  }
});
```

---

### getBrandList()

**API Documentation:** [v2.product.get_brand_list](https://open.shopee.com/documents/v2/v2.product.get_brand_list?module=89&type=1)

Get available brands for a category.

```typescript
const response = await sdk.product.getBrandList({
  category_id: 12345,
  offset: 0,
  page_size: 100,
  status: 1, // 1 for valid brands
});

response.brand_list.forEach((brand) => {
  console.log('Brand:', brand.display_brand_name);
  console.log('Brand ID:', brand.brand_id);
});
```

---

### categoryRecommend()

**API Documentation:** [v2.product.category_recommend](https://open.shopee.com/documents/v2/v2.product.category_recommend?module=89&type=1)

Get recommended categories for a product.

```typescript
const response = await sdk.product.categoryRecommend({
  item_name: 'Wireless Bluetooth Headphones',
});

console.log('Recommended categories:', response.category_id_list);
```

## Comment Methods

### getComment()

**API Documentation:** [v2.product.get_comment](https://open.shopee.com/documents/v2/v2.product.get_comment?module=89&type=1)

Retrieve product comments/reviews.

```typescript
const response = await sdk.product.getComment({
  item_id: 123456,
  comment_id: 0, // Start from 0, use last comment_id for pagination
  page_size: 20,
});

response.item_comment_list.forEach((comment) => {
  console.log('Rating:', comment.rating_star);
  console.log('Comment:', comment.comment);
  console.log('User:', comment.buyer_username);
  console.log('Date:', new Date(comment.ctime * 1000));
});
```

---

### replyComment()

**API Documentation:** [v2.product.reply_comment](https://open.shopee.com/documents/v2/v2.product.reply_comment?module=89&type=1)

Reply to a product comment.

```typescript
await sdk.product.replyComment({
  comment_id: 987654,
  comment: 'Thank you for your feedback! We appreciate your support.',
});
```

## Search & Discovery Methods

### searchItem()

**API Documentation:** [v2.product.search_item](https://open.shopee.com/documents/v2/v2.product.search_item?module=89&type=1)

Search for products in your shop.

```typescript
const response = await sdk.product.searchItem({
  offset: 0,
  page_size: 20,
  item_name: 'headphones',
  attribute_status: 'NORMAL', // Filter by status
});

console.log('Found:', response.total_count, 'items');
```

---

### getItemExtraInfo()

**API Documentation:** [v2.product.get_item_extra_info](https://open.shopee.com/documents/v2/v2.product.get_item_extra_info?module=89&type=1)

Get additional product information.

```typescript
const response = await sdk.product.getItemExtraInfo({
  item_id_list: [123456, 789012],
});

response.item_list.forEach((item) => {
  console.log('Item:', item.item_id);
  console.log('Sale:', item.sale);
  console.log('Views:', item.views);
  console.log('Likes:', item.likes);
});
```

---

### getItemLimit()

**API Documentation:** [v2.product.get_item_limit](https://open.shopee.com/documents/v2/v2.product.get_item_limit?module=89&type=1)

Get the item listing limit for your shop.

```typescript
const response = await sdk.product.getItemLimit();

console.log('Current count:', response.current_item_count);
console.log('Limit:', response.item_limit);
console.log('Remaining:', response.item_limit - response.current_item_count);
```

## Promotion Methods

### boostItem()

**API Documentation:** [v2.product.boost_item](https://open.shopee.com/documents/v2/v2.product.boost_item?module=89&type=1)

Boost a product to increase visibility.

```typescript
await sdk.product.boostItem({
  item_id_list: [123456, 789012],
});

console.log('Products boosted');
```

---

### getBoostedList()

**API Documentation:** [v2.product.get_boosted_list](https://open.shopee.com/documents/v2/v2.product.get_boosted_list?module=89&type=1)

Get list of currently boosted products.

```typescript
const response = await sdk.product.getBoostedList();

response.item_list.forEach((item) => {
  console.log('Boosted item:', item.item_id);
  console.log('Boost ends:', new Date(item.boost_end_time * 1000));
});
```

---

### getItemPromotion()

**API Documentation:** [v2.product.get_item_promotion](https://open.shopee.com/documents/v2/v2.product.get_item_promotion?module=89&type=1)

Get promotion information for products.

```typescript
const response = await sdk.product.getItemPromotion({
  item_id_list: [123456, 789012],
});

response.item_list.forEach((item) => {
  if (item.promotion_info) {
    console.log('Item:', item.item_id);
    console.log('Promotion price:', item.promotion_info.promotion_price);
    console.log('Discount:', item.promotion_info.discount);
  }
});
```

## Compliance & Diagnostics Methods

### getItemViolationInfo()

**API Documentation:** [v2.product.get_item_violation_info](https://open.shopee.com/documents/v2/v2.product.get_item_violation_info?module=89&type=1)

Check if a product has any violations.

```typescript
const response = await sdk.product.getItemViolationInfo({
  item_id: 123456,
});

if (response.violation_list && response.violation_list.length > 0) {
  response.violation_list.forEach((violation) => {
    console.log('Violation:', violation.violation_type);
    console.log('Reason:', violation.violation_reason);
  });
} else {
  console.log('No violations found');
}
```

---

### getItemContentDiagnosisResult()

**API Documentation:** [v2.product.get_item_content_diagnosis_result](https://open.shopee.com/documents/v2/v2.product.get_item_content_diagnosis_result?module=89&type=1)

Get content diagnosis results for a product.

```typescript
const response = await sdk.product.getItemContentDiagnosisResult({
  item_id: 123456,
});

console.log('Diagnosis status:', response.diagnosis_status);
console.log('Suggestions:', response.suggestion_list);
```

---

### getItemListByContentDiagnosis()

**API Documentation:** [v2.product.get_item_list_by_content_diagnosis](https://open.shopee.com/documents/v2/v2.product.get_item_list_by_content_diagnosis?module=89&type=1)

Get list of products filtered by content diagnosis status.

```typescript
const response = await sdk.product.getItemListByContentDiagnosis({
  diagnosis_status: 'FAILED', // PASSED, FAILED, or PENDING
  offset: 0,
  page_size: 20,
});

console.log('Items with issues:', response.item_list);
```

## Advanced Features

### getVariations()

**API Documentation:** [v2.product.get_variations](https://open.shopee.com/documents/v2/v2.product.get_variations?module=89&type=1)

Get standardized variations for a category.

```typescript
const response = await sdk.product.getVariations({
  category_id: 12345,
});

response.variation_list.forEach((variation) => {
  console.log('Variation:', variation.name);
  console.log('Options:', variation.option_list);
});
```

---

### getRecommendAttribute()

**API Documentation:** [v2.product.get_recommend_attribute](https://open.shopee.com/documents/v2/v2.product.get_recommend_attribute?module=89&type=1)

Get recommended attributes for a product.

```typescript
const response = await sdk.product.getRecommendAttribute({
  category_id: 12345,
  item_name: 'Wireless Headphones',
});

console.log('Recommended attributes:', response.recommend_attribute_list);
```

---

### getWeightRecommendation()

**API Documentation:** [v2.product.get_weight_recommendation](https://open.shopee.com/documents/v2/v2.product.get_weight_recommendation?module=89&type=1)

Get recommended shipping weight for a product.

```typescript
const response = await sdk.product.getWeightRecommendation({
  category_id: 12345,
});

console.log('Recommended weight:', response.weight, 'kg');
```

## Kit Item Methods (Product Bundles)

### addKitItem()

**API Documentation:** [v2.product.add_kit_item](https://open.shopee.com/documents/v2/v2.product.add_kit_item?module=89&type=1)

Create a product bundle/kit.

```typescript
await sdk.product.addKitItem({
  item_name: 'Headphones Bundle',
  kit_item_list: [
    {
      item_id: 123456,
      model_id: 111,
      quantity: 1,
    },
    {
      item_id: 789012,
      model_id: 222,
      quantity: 2,
    },
  ],
  price: 199.99,
  stock: 50,
});
```

---

### updateKitItem()

**API Documentation:** [v2.product.update_kit_item](https://open.shopee.com/documents/v2/v2.product.update_kit_item?module=89&type=1)

Update an existing product bundle.

```typescript
await sdk.product.updateKitItem({
  kit_item_id: 456789,
  price: 189.99,
  stock: 75,
});
```

---

### getKitItemInfo()

**API Documentation:** [v2.product.get_kit_item_info](https://open.shopee.com/documents/v2/v2.product.get_kit_item_info?module=89&type=1)

Get information about a product bundle.

```typescript
const response = await sdk.product.getKitItemInfo({
  kit_item_id: 456789,
});

console.log('Kit:', response.kit_item_name);
console.log('Items:', response.kit_item_list);
console.log('Price:', response.price);
```

## Best Practices

### 1. Pagination

Always use pagination for large result sets:

```typescript
async function getAllProducts() {
  const allProducts = [];
  let offset = 0;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await sdk.product.getItemList({
      offset,
      page_size: pageSize,
    });

    allProducts.push(...response.item);
    offset += pageSize;
    hasMore = response.has_next_page;
  }

  return allProducts;
}
```

### 2. Batch Operations

Process items in batches:

```typescript
async function updatePricesInBatches(updates: Array<{ item_id: number; price: number }>) {
  const batchSize = 10;
  
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(update =>
        sdk.product.updatePrice({
          item_id: update.item_id,
          price_list: [{ original_price: update.price }],
        })
      )
    );
    
    // Small delay between batches to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### 3. Error Handling

```typescript
try {
  await sdk.product.updateStock({
    item_id: 123456,
    stock_list: [{ model_id: 111, normal_stock: 50 }],
  });
} catch (error) {
  if (error.error === 'error_param') {
    console.error('Invalid parameters');
  } else if (error.error === 'error_item_not_found') {
    console.error('Item not found');
  } else {
    console.error('Update failed:', error.message);
  }
}
```

### 4. Image Upload

Before creating/updating products, upload images first:

```typescript
// Note: Image upload is typically handled separately
// Check Shopee's documentation for the media upload endpoint

const imageIds = await uploadProductImages([
  'path/to/image1.jpg',
  'path/to/image2.jpg',
]);

await sdk.product.addItem({
  item_name: 'Product with Images',
  image: {
    image_id_list: imageIds,
  },
  // ... other fields
});
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_item_not_found` | Item doesn't exist | Verify item_id is correct |
| `error_param` | Invalid parameters | Check required fields and formats |
| `error_stock_not_enough` | Stock update exceeds limits | Adjust stock values |
| `error_price_invalid` | Price format or value invalid | Check price constraints |
| `error_category_invalid` | Category not valid for item | Use getCategory to find valid categories |

## Related

- [Authentication Guide](../guides/authentication.md) - Authenticating API requests
- [OrderManager](./order.md) - Managing orders for products
- [VoucherManager](./voucher.md) - Creating discounts for products
