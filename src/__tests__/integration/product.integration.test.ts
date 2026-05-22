import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { ItemStatus } from "../../schemas/product.js";

const { runTests, initSdk, hasValidToken } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK ProductManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should retrieve items from local sandbox shop", async () => {
    if (!hasValidToken()) return;

    const itemsResponse = await sdk.product.getItemList({
      offset: 0,
      page_size: 10,
      item_status: [ItemStatus.NORMAL],
    });

    expect(itemsResponse).toBeDefined();
    expect(itemsResponse.request_id).toBeDefined();
    if (itemsResponse.response) {
      expect(Array.isArray(itemsResponse.response.item)).toBe(true);
    }
  });
});
