import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { ItemStatus } from "../../schemas/product.js";
import { ShopeeApiError } from "../../errors.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK ProductManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;
  let testCategoryId = 100001; // default fallback category ID

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should retrieve category tree list and discover a valid category ID with no mandatory attributes", async () => {
    const categoryResponse = await sdk.product.getCategory();
    expect(categoryResponse).toBeDefined();
    expect(categoryResponse.request_id).toBeDefined();
    expect(categoryResponse.response).toBeDefined();
    expect(Array.isArray(categoryResponse.response.category_list)).toBe(true);

    if (
      categoryResponse.response.category_list &&
      categoryResponse.response.category_list.length > 0
    ) {
      const leafCategories = categoryResponse.response.category_list.filter(
        (cat) => !cat.has_children
      );

      if (leafCategories.length > 0) {
        testCategoryId = leafCategories[0].category_id;
      }

      // Dynamically traverse leaf categories to find one with no mandatory attributes (limit to 10 for speed)
      for (const cat of leafCategories.slice(0, 10)) {
        try {
          const attrResponse = await sdk.product.getAttributeTree({ category_id: cat.category_id });
          if (attrResponse.response && attrResponse.response.attribute_list) {
            const hasMandatory = attrResponse.response.attribute_list.some(
              (attr) => attr.is_mandatory
            );
            if (!hasMandatory) {
              testCategoryId = cat.category_id;
              break;
            }
          }
        } catch {
          // Skip failures
        }
      }
    }
  }, 30000);

  it("should retrieve items from local sandbox shop", async () => {
    const itemsResponse = await sdk.product.getItemList({
      offset: 0,
      page_size: 10,
      item_status: [ItemStatus.NORMAL],
    });

    expect(itemsResponse).toBeDefined();
    expect(itemsResponse.request_id).toBeDefined();
    if (itemsResponse.response?.item) {
      expect(Array.isArray(itemsResponse.response.item)).toBe(true);
    }
  });

  it("should fetch boosted list of products", async () => {
    const boostedResponse = await sdk.product.getBoostedList();
    expect(boostedResponse).toBeDefined();
    expect(boostedResponse.request_id).toBeDefined();
    expect(boostedResponse.response).toBeDefined();
    expect(Array.isArray(boostedResponse.response.item_list)).toBe(true);
  });

  it("should retrieve brand list for the test category ID", async () => {
    const brandResponse = await sdk.product.getBrandList({
      category_id: testCategoryId,
      offset: 0,
      page_size: 10,
      status: 1,
    });

    expect(brandResponse).toBeDefined();
    expect(brandResponse.request_id).toBeDefined();
    expect(brandResponse.response).toBeDefined();
    expect(Array.isArray(brandResponse.response.brand_list)).toBe(true);
  });

  it("should retrieve item limits for the test category ID", async () => {
    const limitResponse = await sdk.product.getItemLimit({
      category_id: testCategoryId,
    });

    expect(limitResponse).toBeDefined();
    expect(limitResponse.request_id).toBeDefined();
    expect(limitResponse.response).toBeDefined();
    if (limitResponse.response.item_limit) {
      expect(typeof limitResponse.response.item_limit.max_product_title_length).toBe("number");
    }
  });

  it("should query category recommendations based on an item name", async () => {
    try {
      const recommendResponse = await sdk.product.categoryRecommend({
        item_name: "Red Cotton T-Shirt",
      });

      expect(recommendResponse).toBeDefined();
      expect(recommendResponse.request_id).toBeDefined();
      expect(recommendResponse.response).toBeDefined();
      if (recommendResponse.response.category_id_list) {
        expect(Array.isArray(recommendResponse.response.category_id_list)).toBe(true);
      }
    } catch (err) {
      if (err instanceof ShopeeApiError) {
        expect((err.data as any).error).toBe("product.error_unknown");
      } else {
        throw err;
      }
    }
  });

  it("should query recommended attributes for the test category ID", async () => {
    try {
      const attributeResponse = await sdk.product.getRecommendAttribute({
        category_id: testCategoryId,
      });

      expect(attributeResponse).toBeDefined();
      expect(attributeResponse.request_id).toBeDefined();
      expect(attributeResponse.response).toBeDefined();
      if (attributeResponse.response.recommended_attribute_list) {
        expect(Array.isArray(attributeResponse.response.recommended_attribute_list)).toBe(true);
      }
    } catch (err) {
      if (err instanceof ShopeeApiError) {
        expect((err.data as any).error).toBe("product.error_unknown");
      } else {
        throw err;
      }
    }
  });

  it("should successfully run the full product creation and deletion lifecycle", async () => {
    // 1. Fetch enabled logistics channel
    const logisticsResponse = await sdk.logistics.getChannelList();
    expect(logisticsResponse).toBeDefined();
    expect(logisticsResponse.response?.logistics_channel_list).toBeDefined();
    const enabledChannel = logisticsResponse.response.logistics_channel_list.find(
      (ch) => ch.enabled
    );

    const channelId = enabledChannel ? enabledChannel.logistics_channel_id : 20001;
    const channelName = enabledChannel
      ? enabledChannel.logistics_channel_name
      : "Standard Delivery";

    // 2. Upload a temporary 200x200 image pixel to satisfy image requirements and avoid Sandbox rejection
    const imageBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAACXBIWXMAAAABAAAAAQBPJcTWAAACEElEQVR4nO3SQQkAMAzAwPo3vaoIg3KnII/Mg8D8DuAmY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBaJBcLKBp7i8n+mAAAAAElFTkSuQmCC",
      "base64"
    );
    const uploadResponse = await sdk.mediaSpace.uploadImage({
      scene: "normal",
      ratio: "1:1",
      image: imageBuffer,
    });
    expect(uploadResponse.response?.image_info_list).toBeDefined();
    const imageId = uploadResponse.response!.image_info_list![0].image_info!.image_id;

    // 3. Create the product
    const itemName = "Sandbox Test Product " + Date.now();
    const addResponse = await sdk.product.addItem({
      item_name: itemName,
      description:
        "This is a detailed sandbox integration test product description that satisfies minimum length requirement.",
      original_price: 50000,
      category_id: testCategoryId,
      weight: 0.5,
      dimension: {
        package_length: 10,
        package_width: 10,
        package_height: 10,
      },
      image: {
        image_id_list: [imageId],
      },
      logistic_info: [
        {
          logistic_id: channelId,
          logistic_name: channelName,
          enabled: true,
          is_free: false,
        },
      ],
      brand: {
        brand_id: 0,
        original_brand_name: "NoBrand",
      },
      seller_stock: [
        {
          stock: 100,
        },
      ],
    });

    expect(addResponse).toBeDefined();
    expect(addResponse.error).toBe("");
    expect(addResponse.response?.item_id).toBeDefined();

    const createdItemId = addResponse.response.item_id;

    // 4. Tear down: delete the newly created product immediately to keep Sandbox clean
    const deleteResponse = await sdk.product.deleteItem({
      item_id: createdItemId,
    });

    expect(deleteResponse).toBeDefined();
    expect(deleteResponse.error).toBe("");
  });
});
