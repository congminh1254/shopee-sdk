# TopPicksManager

The TopPicksManager handles top picks collection management for featured product displays on the shop page.

## Overview

The TopPicksManager provides methods for:
- Creating top picks collections to showcase featured products
- Managing collection lifecycle (update, delete)
- Retrieving collection information
- Activating/deactivating collections

## Quick Start

```typescript
// Create a new top picks collection
const newCollection = await sdk.topPicks.addTopPicks({
  name: 'Featured Products',
  item_id_list: [123456, 234567, 345678],
  is_activated: true,
});

// Get all collections
const collections = await sdk.topPicks.getTopPicksList();

// Update a collection
await sdk.topPicks.updateTopPicks({
  top_picks_id: 62,
  name: 'Updated Featured Products',
  item_id_list: [123456, 234567, 345678, 456789],
});

// Delete a collection (must be deactivated first)
await sdk.topPicks.deleteTopPicks({
  top_picks_id: 62,
});
```

## Methods

### addTopPicks()

**API Documentation:** [v2.top_picks.add_top_picks](https://open.shopee.com/documents/v2/v2.top_picks.add_top_picks?module=100&type=1)

Create a new top picks collection to showcase featured products.

```typescript
const response = await sdk.topPicks.addTopPicks({
  name: 'Hot Sale Items',
  item_id_list: [2200040632, 3000043257, 2800026288, 3600031776],
  is_activated: false,
});

console.log('Collection created:', response.response.collection_list[0].top_picks_id);
console.log('Collection name:', response.response.collection_list[0].name);
console.log('Number of items:', response.response.collection_list[0].item_list.length);

response.response.collection_list[0].item_list.forEach((item) => {
  console.log('---');
  console.log('Item name:', item.item_name);
  console.log('Item ID:', item.item_id);
  console.log('Current price:', item.current_price);
  console.log('Sales:', item.sales);
});
```

**Parameters:**
- `name` (required): The name of the top picks collection
- `item_id_list` (required): Array of item IDs to include in the collection
- `is_activated` (required): Whether to activate the collection (deactivates others if true)

**Important Notes:**
- Only one top picks collection can be activated at a time
- Setting `is_activated` to true will automatically deactivate all other collections
- Collection names must be unique within the shop
- Items must belong to your shop

**Example Response:**
```typescript
{
  request_id: "ce13698485624ddb953e954e17b51229",
  error: "",
  message: "",
  response: {
    collection_list: [{
      is_activated: false,
      item_list: [{
        item_name: "tools Sep 28 2020 16:57:068",
        item_id: 3400134771,
        current_price: 2000.00,
        inflated_price_of_current_price: 3000.00,
        sales: 0
      }],
      top_picks_id: 62,
      name: "test1234"
    }]
  }
}
```

---

### deleteTopPicks()

**API Documentation:** [v2.top_picks.delete_top_picks](https://open.shopee.com/documents/v2/v2.top_picks.delete_top_picks?module=100&type=1)

Delete a top picks collection.

```typescript
const response = await sdk.topPicks.deleteTopPicks({
  top_picks_id: 480,
});

console.log('Deleted collection ID:', response.response.top_picks_id);
```

**Parameters:**
- `top_picks_id` (required): The ID of the collection to delete

**Important Notes:**
- Only deactivated collections can be deleted
- You cannot delete an activated collection
- If you need to delete an activated collection, first deactivate it by activating another collection or updating it

**Example Error:**
```typescript
{
  request_id: "9cec5a6ef70fd1a912c83d8cedae688b",
  error: "top_pick.top_pick_delete_status_error",
  message: "The enabled top-picks can not be deleted.",
  response: {}
}
```

---

### getTopPicksList()

**API Documentation:** [v2.top_picks.get_top_picks_list](https://open.shopee.com/documents/v2/v2.top_picks.get_top_picks_list?module=100&type=1)

Get all top picks collections for the shop.

```typescript
const response = await sdk.topPicks.getTopPicksList();

console.log('Total collections:', response.response.collection_list.length);

response.response.collection_list.forEach((collection) => {
  console.log('---');
  console.log('Collection ID:', collection.top_picks_id);
  console.log('Name:', collection.name);
  console.log('Is activated:', collection.is_activated);
  console.log('Number of items:', collection.item_list.length);
  
  collection.item_list.forEach((item) => {
    console.log(`  - ${item.item_name} (${item.item_id}): $${item.current_price}`);
  });
});
```

**Response includes:**
- `collection_list`: Array of all top picks collections with:
  - `top_picks_id`: The unique collection identifier
  - `name`: Collection name
  - `is_activated`: Whether the collection is currently active
  - `item_list`: Array of items with details (name, id, price, sales)

**Example Response:**
```typescript
{
  request_id: "ce13698485624ddb953e954e17b51229",
  error: "",
  message: "",
  response: {
    collection_list: [{
      is_activated: false,
      item_list: [{
        item_name: "tools Sep 28 2020 16:57:068",
        item_id: 3400134771,
        current_price: 2000.00,
        inflated_price_of_current_price: 2100.00,
        sales: 0
      }],
      top_picks_id: 62,
      name: "test1234"
    }]
  }
}
```

---

### updateTopPicks()

**API Documentation:** [v2.top_picks.update_top_picks](https://open.shopee.com/documents/v2/v2.top_picks.update_top_picks?module=100&type=1)

Update an existing top picks collection.

```typescript
// Update all fields
const response = await sdk.topPicks.updateTopPicks({
  top_picks_id: 480,
  name: 'hotsale3',
  item_id_list: [13232, 1321, 11213],
  is_activated: true,
});

// Update only the name
const response2 = await sdk.topPicks.updateTopPicks({
  top_picks_id: 480,
  name: 'New Collection Name',
});

// Activate a collection
const response3 = await sdk.topPicks.updateTopPicks({
  top_picks_id: 480,
  is_activated: true,
});
```

**Parameters:**
- `top_picks_id` (required): The ID of the collection to update
- `name` (optional): New name for the collection
- `item_id_list` (optional): New list of item IDs (replaces the old list)
- `is_activated` (optional): Whether to activate the collection

**Important Notes:**
- When updating `item_id_list`, it completely replaces the old item list
- Setting `is_activated` to true will deactivate all other collections
- Collection names must be unique
- All items must belong to your shop

**Example Response:**
```typescript
{
  request_id: "ce13698485624ddb953e954e17b51229",
  error: "",
  message: "",
  response: {
    collection_list: [{
      is_activated: false,
      item_list: [{
        item_name: "tools Sep 28 2020 16:57:068",
        item_id: 3400134771,
        current_price: 2000.00,
        inflated_price_of_current_price: 2000.00,
        sales: 0
      }],
      top_picks_id: 62,
      name: "test1234"
    }]
  }
}
```

---

## Common Use Cases

### Creating and Activating a Featured Collection

```typescript
async function createFeaturedCollection(itemIds: number[]) {
  // Create the collection
  const response = await sdk.topPicks.addTopPicks({
    name: 'Featured Products',
    item_id_list: itemIds,
    is_activated: true, // Activates immediately
  });
  
  console.log('Created and activated collection:', response.response.collection_list[0].top_picks_id);
  return response.response.collection_list[0];
}
```

### Switching Active Collections

```typescript
async function switchActiveCollection(newCollectionId: number) {
  // Activating a new collection automatically deactivates others
  await sdk.topPicks.updateTopPicks({
    top_picks_id: newCollectionId,
    is_activated: true,
  });
  
  console.log('Switched to collection:', newCollectionId);
}
```

### Managing Seasonal Collections

```typescript
async function manageSeasonal() {
  // Get all collections
  const collections = await sdk.topPicks.getTopPicksList();
  
  // Find the summer collection
  const summerCollection = collections.response.collection_list.find(
    (c) => c.name === 'Summer Sale'
  );
  
  if (summerCollection && !summerCollection.is_activated) {
    // Activate summer collection
    await sdk.topPicks.updateTopPicks({
      top_picks_id: summerCollection.top_picks_id,
      is_activated: true,
    });
  }
}
```

### Deactivating All Collections

```typescript
async function deactivateAllCollections() {
  const collections = await sdk.topPicks.getTopPicksList();
  
  // Create a temporary collection and activate it
  const temp = await sdk.topPicks.addTopPicks({
    name: 'Temporary',
    item_id_list: [123456], // Must have at least one item
    is_activated: true,
  });
  
  // Delete the temporary collection (it can't be deleted while active)
  // First deactivate by activating another collection, or just leave it
  console.log('All collections deactivated via temporary collection');
}
```

## Error Handling

Common errors you may encounter:

```typescript
try {
  await sdk.topPicks.addTopPicks({
    name: 'My Collection',
    item_id_list: [123, 456],
    is_activated: true,
  });
} catch (error) {
  // Handle specific errors
  if (error.error === 'top_pick.top_pick_name_duplication') {
    console.error('A collection with this name already exists');
  } else if (error.error === 'top_pick.top_pick_item_id_not_exist') {
    console.error('One or more items do not belong to your shop');
  } else if (error.error === 'top_pick.exceed_max_top_pick_count') {
    console.error('Maximum number of top picks collections reached');
  }
}
```

**Common Error Codes:**
- `top_pick.top_pick_name_duplication`: Collection name already exists
- `top_pick.top_pick_item_id_not_exist`: Item does not belong to shop
- `top_pick.top_pick_item_id_duplication`: Duplicate items in the list
- `top_pick.top_pick_delete_status_error`: Cannot delete activated collection
- `top_pick.exceed_max_top_pick_count`: Maximum collections limit reached
- `common.error_not_found`: Collection not found

## Best Practices

1. **Collection Activation**: Only one collection can be active at a time. When you activate a new collection, all others are automatically deactivated.

2. **Deletion**: Always ensure a collection is deactivated before attempting to delete it. You can deactivate by activating another collection.

3. **Item Management**: When updating `item_id_list`, remember it completely replaces the old list. If you want to add items, fetch the current list first and append to it.

4. **Unique Names**: Collection names must be unique within your shop. Consider using descriptive names with dates or seasons.

5. **Monitoring**: Regularly check your active collection using `getTopPicksList()` to ensure the right products are being featured.
