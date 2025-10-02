# GlobalProductManager

The GlobalProductManager handles all global product operations for China mainland and Korean sellers. Global products allow sellers to manage products centrally and publish them to multiple shops across different regions.

## Overview

The GlobalProductManager provides methods for:
- **Global Item Management**: Add, update, delete, and list global products
- **Model Management**: Manage product models and variations
- **Publishing**: Publish global products to multiple shops
- **Stock & Pricing**: Update inventory and prices across shops
- **Categories & Attributes**: Get categories, attributes, and brand information
- **Size Charts**: Manage size chart information
- **Synchronization**: Control field synchronization between global and shop items

## Quick Start

```typescript
// Get global category list
const categories = await sdk.globalProduct.getCategory({
  language: "en"
});

// Get list of global items
const items = await sdk.globalProduct.getGlobalItemList({
  page_size: 20,
  update_time_from: 1611311600,
  update_time_to: 1611311631
});

// Get detailed information for global items
const itemInfo = await sdk.globalProduct.getGlobalItemInfo({
  global_item_id_list: [123456, 789012]
});

// Update global item stock
await sdk.globalProduct.updateStock({
  global_item_id: 123456,
  stock_list: [{
    shop_id: 67890,
    normal_stock: 100
  }]
});

// Publish global item to shops
const task = await sdk.globalProduct.createPublishTask({
  global_item_id: 123456,
  shop_list: [
    { shop_id: 67890 },
    { shop_id: 67891 }
  ]
});
```

## Category Methods

### getCategory()

**API Documentation:** [v2.global_product.get_category](https://open.shopee.com/documents/v2/v2.global_product.get_category?module=90&type=1)

Get global category list.

```typescript
const categories = await sdk.globalProduct.getCategory({
  language: "en" // or "zh-hans"
});
```

**Parameters:**
- `language` (optional): Display language ("zh-hans" or "en")

**Returns:** List of global categories with their IDs, names, and hierarchy information.

### categoryRecommend()

**API Documentation:** [v2.global_product.category_recommend](https://open.shopee.com/documents/v2/v2.global_product.category_recommend?module=90&type=1)

Get category recommendations based on item name.

```typescript
const recommendations = await sdk.globalProduct.categoryRecommend({
  global_item_name: "iPhone Case"
});
```

**Parameters:**
- `global_item_name`: Global item name for recommendation

**Returns:** List of recommended category IDs.

## Item Management Methods

### getGlobalItemList()

**API Documentation:** [v2.global_product.get_global_item_list](https://open.shopee.com/documents/v2/v2.global_product.get_global_item_list?module=90&type=1)

Get list of global item IDs.

```typescript
const items = await sdk.globalProduct.getGlobalItemList({
  page_size: 20,
  update_time_from: 1611311600,
  update_time_to: 1611311631,
  offset: "AAAAFA=="
});
```

**Parameters:**
- `page_size`: Size of one page (1-50)
- `offset` (optional): Starting entry for pagination
- `update_time_from` (optional): Start of date range
- `update_time_to` (optional): End of date range

### getGlobalItemInfo()

**API Documentation:** [v2.global_product.get_global_item_info](https://open.shopee.com/documents/v2/v2.global_product.get_global_item_info?module=90&type=1)

Get detailed information for global items.

```typescript
const itemInfo = await sdk.globalProduct.getGlobalItemInfo({
  global_item_id_list: [123456, 789012]
});
```

**Parameters:**
- `global_item_id_list`: List of global item IDs (max 50)

### addGlobalItem()

**API Documentation:** [v2.global_product.add_global_item](https://open.shopee.com/documents/v2/v2.global_product.add_global_item?module=90&type=1)

Add a new global item.

```typescript
const result = await sdk.globalProduct.addGlobalItem({
  category_id: 100182,
  global_item_name: "iPhone 14 Case",
  description: "Premium protective case for iPhone 14",
  weight: 0.1,
  image: {
    image_id_list: ["image123", "image456"]
  },
  attribute_list: [{
    attribute_id: 1000,
    attribute_value_list: [{
      value_id: 1001
    }]
  }]
});
```

### updateGlobalItem()

**API Documentation:** [v2.global_product.update_global_item](https://open.shopee.com/documents/v2/v2.global_product.update_global_item?module=90&type=1)

Update an existing global item.

```typescript
const result = await sdk.globalProduct.updateGlobalItem({
  global_item_id: 123456,
  global_item_name: "Updated Product Name",
  description: "Updated description",
  weight: 0.15
});
```

### deleteGlobalItem()

**API Documentation:** [v2.global_product.delete_global_item](https://open.shopee.com/documents/v2/v2.global_product.delete_global_item?module=90&type=1)

Delete a global item.

```typescript
await sdk.globalProduct.deleteGlobalItem({
  global_item_id: 123456
});
```

### getGlobalItemLimit()

**API Documentation:** [v2.global_product.get_global_item_limit](https://open.shopee.com/documents/v2/v2.global_product.get_global_item_limit?module=90&type=1)

Get limits for a category (max images, videos, name length, etc.).

```typescript
const limits = await sdk.globalProduct.getGlobalItemLimit({
  category_id: 100182
});
```

### getGlobalItemId()

**API Documentation:** [v2.global_product.get_global_item_id](https://open.shopee.com/documents/v2/v2.global_product.get_global_item_id?module=90&type=1)

Get global item ID from shop item ID.

```typescript
const globalId = await sdk.globalProduct.getGlobalItemId({
  shop_id: 67890,
  item_id: 123456
});
```

## Model & Variation Methods

### getGlobalModelList()

**API Documentation:** [v2.global_product.get_global_model_list](https://open.shopee.com/documents/v2/v2.global_product.get_global_model_list?module=90&type=1)

Get model list for a global item.

```typescript
const models = await sdk.globalProduct.getGlobalModelList({
  global_item_id: 123456
});
```

### addGlobalModel()

**API Documentation:** [v2.global_product.add_global_model](https://open.shopee.com/documents/v2/v2.global_product.add_global_model?module=90&type=1)

Add models to a global item.

```typescript
const result = await sdk.globalProduct.addGlobalModel({
  global_item_id: 123456,
  model_list: [{
    tier_index: [0, 1],
    model_sku: "SKU-001"
  }]
});
```

### updateGlobalModel()

**API Documentation:** [v2.global_product.update_global_model](https://open.shopee.com/documents/v2/v2.global_product.update_global_model?module=90&type=1)

Update existing global models.

```typescript
const result = await sdk.globalProduct.updateGlobalModel({
  global_item_id: 123456,
  model_list: [{
    global_model_id: 789,
    model_sku: "SKU-002"
  }]
});
```

### deleteGlobalModel()

**API Documentation:** [v2.global_product.delete_global_model](https://open.shopee.com/documents/v2/v2.global_product.delete_global_model?module=90&type=1)

Delete global models.

```typescript
const result = await sdk.globalProduct.deleteGlobalModel({
  global_item_id: 123456,
  global_model_id_list: [789, 790]
});
```

### initTierVariation()

**API Documentation:** [v2.global_product.init_tier_variation](https://open.shopee.com/documents/v2/v2.global_product.init_tier_variation?module=90&type=1)

Initialize tier variation for a global item.

```typescript
const result = await sdk.globalProduct.initTierVariation({
  global_item_id: 123456,
  tier_variation: [{
    name: "Color",
    option_list: [
      { option: "Red" },
      { option: "Blue" }
    ]
  }, {
    name: "Size",
    option_list: [
      { option: "S" },
      { option: "M" },
      { option: "L" }
    ]
  }],
  model_list: [{
    tier_index: [0, 0],
    model_sku: "RED-S"
  }, {
    tier_index: [0, 1],
    model_sku: "RED-M"
  }]
});
```

### updateTierVariation()

**API Documentation:** [v2.global_product.update_tier_variation](https://open.shopee.com/documents/v2/v2.global_product.update_tier_variation?module=90&type=1)

Update tier variation for a global item.

```typescript
const result = await sdk.globalProduct.updateTierVariation({
  global_item_id: 123456,
  tier_variation: [{
    name: "Size",
    option_list: [
      { option: "S" },
      { option: "M" },
      { option: "L" },
      { option: "XL" }
    ]
  }]
});
```

### getVariations()

**API Documentation:** [v2.global_product.get_variations](https://open.shopee.com/documents/v2/v2.global_product.get_variations?module=90&type=1)

Get variation information for a global item.

```typescript
const variations = await sdk.globalProduct.getVariations({
  global_item_id: 123456
});
```

## Stock & Pricing Methods

### updateStock()

**API Documentation:** [v2.global_product.update_stock](https://open.shopee.com/documents/v2/v2.global_product.update_stock?module=90&type=1)

Update stock for global items or models.

```typescript
// Update item-level stock
const result = await sdk.globalProduct.updateStock({
  global_item_id: 123456,
  stock_list: [{
    shop_id: 67890,
    normal_stock: 100
  }]
});

// Update model-level stock
const result = await sdk.globalProduct.updateStock({
  global_item_id: 123456,
  stock_list: [{
    shop_id: 67890,
    global_model_id: 789,
    normal_stock: 50
  }]
});
```

### updatePrice()

**API Documentation:** [v2.global_product.update_price](https://open.shopee.com/documents/v2/v2.global_product.update_price?module=90&type=1)

Update price for global items or models.

```typescript
// Update item-level price
const result = await sdk.globalProduct.updatePrice({
  global_item_id: 123456,
  price_list: [{
    shop_id: 67890,
    original_price: 29.99
  }]
});

// Update model-level price
const result = await sdk.globalProduct.updatePrice({
  global_item_id: 123456,
  price_list: [{
    shop_id: 67890,
    global_model_id: 789,
    original_price: 24.99
  }]
});
```

### getLocalAdjustmentRate()

**API Documentation:** [v2.global_product.get_local_adjustment_rate](https://open.shopee.com/documents/v2/v2.global_product.get_local_adjustment_rate?module=90&type=1)

Get local price adjustment rates for shops.

```typescript
const rates = await sdk.globalProduct.getLocalAdjustmentRate({
  global_item_id: 123456,
  shop_id_list: [67890, 67891]
});
```

### updateLocalAdjustmentRate()

**API Documentation:** [v2.global_product.update_local_adjustment_rate](https://open.shopee.com/documents/v2/v2.global_product.update_local_adjustment_rate?module=90&type=1)

Update local price adjustment rates for shops.

```typescript
const result = await sdk.globalProduct.updateLocalAdjustmentRate({
  global_item_id: 123456,
  adjustment_rate_list: [{
    shop_id: 67890,
    adjustment_rate: 10.5
  }]
});
```

## Attribute & Brand Methods

### getAttributeTree()

**API Documentation:** [v2.global_product.get_attribute_tree](https://open.shopee.com/documents/v2/v2.global_product.get_attribute_tree?module=90&type=1)

Get attribute tree for a category.

```typescript
const attributes = await sdk.globalProduct.getAttributeTree({
  category_id: 100182,
  language: "en"
});
```

### getRecommendAttribute()

**API Documentation:** [v2.global_product.get_recommend_attribute](https://open.shopee.com/documents/v2/v2.global_product.get_recommend_attribute?module=90&type=1)

Get recommended attributes for a global item.

```typescript
const attributes = await sdk.globalProduct.getRecommendAttribute({
  global_item_id: 123456
});
```

### searchGlobalAttributeValueList()

**API Documentation:** [v2.global_product.search_global_attribute_value_list](https://open.shopee.com/documents/v2/v2.global_product.search_global_attribute_value_list?module=90&type=1)

Search for attribute values.

```typescript
const values = await sdk.globalProduct.searchGlobalAttributeValueList({
  category_id: 100182,
  attribute_id: 1000,
  keyword: "cotton",
  language: "en"
});
```

### getBrandList()

**API Documentation:** [v2.global_product.get_brand_list](https://open.shopee.com/documents/v2/v2.global_product.get_brand_list?module=90&type=1)

Get brand list for a category.

```typescript
const brands = await sdk.globalProduct.getBrandList({
  category_id: 100182,
  page_size: 20,
  language: "en"
});
```

## Publishing Methods

### getPublishableShop()

**API Documentation:** [v2.global_product.get_publishable_shop](https://open.shopee.com/documents/v2/v2.global_product.get_publishable_shop?module=90&type=1)

Get list of shops where a global item can be published.

```typescript
const shops = await sdk.globalProduct.getPublishableShop({
  global_item_id: 123456
});
```

### getShopPublishableStatus()

**API Documentation:** [v2.global_product.get_shop_publishable_status](https://open.shopee.com/documents/v2/v2.global_product.get_shop_publishable_status?module=90&type=1)

Check if shops can publish a specific global item.

```typescript
const status = await sdk.globalProduct.getShopPublishableStatus({
  global_item_id: 123456,
  shop_id_list: [67890, 67891]
});
```

### createPublishTask()

**API Documentation:** [v2.global_product.create_publish_task](https://open.shopee.com/documents/v2/v2.global_product.create_publish_task?module=90&type=1)

Create a task to publish a global item to multiple shops.

```typescript
const task = await sdk.globalProduct.createPublishTask({
  global_item_id: 123456,
  shop_list: [
    { shop_id: 67890 },
    { shop_id: 67891 }
  ]
});
```

### getPublishTaskResult()

**API Documentation:** [v2.global_product.get_publish_task_result](https://open.shopee.com/documents/v2/v2.global_product.get_publish_task_result?module=90&type=1)

Get the result of a publish task.

```typescript
const result = await sdk.globalProduct.getPublishTaskResult({
  publish_task_id: "task123"
});

// Check status
if (result.response.status === "SUCCESS") {
  result.response.result_list.forEach(r => {
    console.log(`Shop ${r.shop_id}: Item ID ${r.item_id}`);
  });
}
```

### getPublishedList()

**API Documentation:** [v2.global_product.get_published_list](https://open.shopee.com/documents/v2/v2.global_product.get_published_list?module=90&type=1)

Get list of shops where a global item has been published.

```typescript
const published = await sdk.globalProduct.getPublishedList({
  global_item_id: 123456
});
```

## Synchronization Methods

### setSyncField()

**API Documentation:** [v2.global_product.set_sync_field](https://open.shopee.com/documents/v2/v2.global_product.set_sync_field?module=90&type=1)

Set which fields should sync between global item and shop items.

```typescript
const result = await sdk.globalProduct.setSyncField({
  global_item_id: 123456,
  shop_list: [{
    shop_id: 67890,
    sync_field_list: ["name", "price", "stock", "description", "image"]
  }]
});
```

**Sync Fields:**
- `name`: Product name
- `price`: Product price
- `stock`: Stock quantity
- `description`: Product description
- `image`: Product images

## Size Chart Methods

### getSizeChartList()

**API Documentation:** [v2.global_product.get_size_chart_list](https://open.shopee.com/documents/v2/v2.global_product.get_size_chart_list?module=90&type=1)

Get list of size charts.

```typescript
const sizeCharts = await sdk.globalProduct.getSizeChartList({
  page_size: 20,
  offset: 0
});
```

### getSizeChartDetail()

**API Documentation:** [v2.global_product.get_size_chart_detail](https://open.shopee.com/documents/v2/v2.global_product.get_size_chart_detail?module=90&type=1)

Get detailed information of a size chart.

```typescript
const sizeChart = await sdk.globalProduct.getSizeChartDetail({
  size_chart_id: "chart123"
});
```

### updateSizeChart()

**API Documentation:** [v2.global_product.update_size_chart](https://open.shopee.com/documents/v2/v2.global_product.update_size_chart?module=90&type=1)

Update a size chart.

```typescript
const result = await sdk.globalProduct.updateSizeChart({
  size_chart_id: "chart123",
  size_chart_name: "Updated Size Chart",
  size_chart_table: {
    header: ["Size", "Chest (cm)", "Length (cm)"],
    rows: [
      ["S", "90", "60"],
      ["M", "95", "65"],
      ["L", "100", "70"]
    ]
  }
});
```

### supportSizeChart()

**API Documentation:** [v2.global_product.support_size_chart](https://open.shopee.com/documents/v2/v2.global_product.support_size_chart?module=90&type=1)

Check if a category supports size charts.

```typescript
const support = await sdk.globalProduct.supportSizeChart({
  category_id: 100182
});

if (support.response.support) {
  console.log("This category supports size charts");
}
```

## Best Practices

### 1. Global Product Workflow

```typescript
// Step 1: Get category and attributes
const categories = await sdk.globalProduct.getCategory();
const attributes = await sdk.globalProduct.getAttributeTree({
  category_id: 100182
});

// Step 2: Create global item
const newItem = await sdk.globalProduct.addGlobalItem({
  category_id: 100182,
  global_item_name: "Premium Phone Case",
  description: "Durable protective case",
  image: { image_id_list: ["img1", "img2"] },
  attribute_list: [/* ... */]
});

// Step 3: Initialize variations if needed
await sdk.globalProduct.initTierVariation({
  global_item_id: newItem.response.global_item_id,
  tier_variation: [/* ... */],
  model_list: [/* ... */]
});

// Step 4: Publish to shops
const task = await sdk.globalProduct.createPublishTask({
  global_item_id: newItem.response.global_item_id,
  shop_list: [{ shop_id: 67890 }]
});

// Step 5: Check publish result
const result = await sdk.globalProduct.getPublishTaskResult({
  publish_task_id: task.response.publish_task_id
});
```

### 2. Batch Operations

```typescript
// Update prices for multiple shops in one call
await sdk.globalProduct.updatePrice({
  global_item_id: 123456,
  price_list: [
    { shop_id: 67890, original_price: 29.99 },
    { shop_id: 67891, original_price: 25.99 },
    { shop_id: 67892, original_price: 27.99 }
  ]
});
```

### 3. Error Handling

```typescript
try {
  const result = await sdk.globalProduct.updateStock({
    global_item_id: 123456,
    stock_list: [{ shop_id: 67890, normal_stock: 100 }]
  });
  
  // Check individual results
  result.response.result_list.forEach(r => {
    if (!r.success) {
      console.error(`Failed for shop ${r.shop_id}: ${r.error_description}`);
    }
  });
} catch (error) {
  console.error("API error:", error);
}
```

## Common Errors

- `error_param`: Invalid parameters provided
- `error_auth`: Authentication failed or no permission
- `error_item_not_found`: Global item not found
- `error_category_prohibited`: Category not allowed for global products
- `error_shop_not_publishable`: Shop cannot publish this global item

## Limitations

- Only available for China mainland and Korean sellers
- Maximum 50 global item IDs per `getGlobalItemInfo` call
- Page size limit: 1-50 for `getGlobalItemList`
- Maximum 2 tier variations per global item
- Sync field changes apply to future updates only

## Related

- [ProductManager](./product.md) - For shop-level product management
- [MediaManager](./media.md) - For uploading images and videos
- [ShopManager](./shop.md) - For shop information

## API Reference

For complete API documentation, visit the [Shopee Open Platform Documentation](https://open.shopee.com/documents?module=90&type=1).
