import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK ShopManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should retrieve shop info details", async () => {
    const shopInfo = await sdk.shop.getShopInfo();

    expect(shopInfo).toBeDefined();
    expect(shopInfo.request_id).toBeDefined();
    if (shopInfo.shop_name) {
      expect(typeof shopInfo.shop_name).toBe("string");
    }
  }, 60000);

  it("should retrieve shop profile details", async () => {
    const profile = await sdk.shop.getProfile();

    expect(profile).toBeDefined();
    expect(profile.request_id).toBeDefined();
  }, 60000);
});
