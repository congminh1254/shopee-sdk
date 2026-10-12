import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";

const { runTests, initSdk } = setupIntegrationTest({ auth: "partner" });

(runTests ? describe : describe.skip)("ShopeeSDK PublicManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully fetch Shopee IP ranges from the sandbox environment", async () => {
    const response = await sdk.public.getShopeeIpRanges();

    expect(response).toBeDefined();
    expect(response.request_id).toBeDefined();
    {
      expect(response.ip_list).toBeDefined();
      expect(Array.isArray(response.ip_list)).toBe(true);
    }
  }, 60000);

  it("should fetch shops associated with partner in the sandbox environment", async () => {
    const response = await sdk.public.getShopsByPartner();

    expect(response).toBeDefined();
    expect(response.request_id).toBeDefined();
    {
      expect(Array.isArray(response.authed_shop_list)).toBe(true);
    }
  }, 60000);
});
