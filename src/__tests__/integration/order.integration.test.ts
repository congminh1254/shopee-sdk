import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK OrderManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should retrieve orders in last 15 days", async () => {
    const timeTo = Math.floor(Date.now() / 1000);
    const timeFrom = timeTo - 15 * 24 * 3600;

    const ordersResponse = await sdk.order.getOrderList({
      time_range_field: "create_time",
      time_from: timeFrom,
      time_to: timeTo,
      page_size: 10,
    });

    expect(ordersResponse).toBeDefined();
    expect(ordersResponse.request_id).toBeDefined();
    if (ordersResponse.response) {
      expect(Array.isArray(ordersResponse.response.order_list)).toBe(true);
    }
  });
});
