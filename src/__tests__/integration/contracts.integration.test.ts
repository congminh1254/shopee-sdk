import { describe, it, expect } from "@jest/globals";
import { setupIntegrationTest } from "./setup.js";
import { pollRead } from "../utils/sandbox-fixtures.js";

const partner = setupIntegrationTest({ auth: "partner" });
(partner.runTests ? describe : describe.skip)("Partner endpoint sandbox contracts", () => {
  it("calls no-request endpoints without a shop token and requires their real response shapes", async () => {
    const sdk = await partner.initSdk();
    const ranges = await sdk.public.getShopeeIpRanges();
    expect(ranges.request_id).toBeDefined();
    expect(Array.isArray(ranges.ip_list)).toBe(true);
    expect(ranges).not.toHaveProperty("response");
    const methods = await sdk.payment.getPaymentMethodList();
    expect(Array.isArray(methods.response)).toBe(true);
    expect(methods.request_id).toBeDefined();
  });
});
const shop = setupIntegrationTest();
(shop.runTests ? describe : describe.skip)("Shop read contracts", () => {
  it("checks flat shop data and converted timestamps", async () => {
    const sdk = await shop.initSdk();
    const info = await sdk.shop.getShopInfo();
    expect(info.request_id).toBeDefined();
    expect(typeof info.shop_name).toBe("string");
    expect(info).not.toHaveProperty("response");
    expect(info.auth_time).toBeInstanceOf(Date);
    expect(info.expire_time).toBeInstanceOf(Date);
  });
  it("follows order pagination and validates both empty and populated pages", async () => {
    const sdk = await shop.initSdk();
    const end = Math.floor(Date.now() / 1000);
    const seen = new Set<string>();
    let cursor = "";
    for (let page = 0; page < 3; page++) {
      const data = await sdk.order.getOrderList({
        time_range_field: "create_time",
        time_from: end - 15 * 86400,
        time_to: end,
        page_size: 2,
        cursor,
      });
      expect(data.request_id).toBeDefined();
      expect(Array.isArray(data.response.order_list)).toBe(true);
      for (const order of data.response.order_list ?? []) {
        expect(typeof order.order_sn).toBe("string");
        expect(seen.has(order.order_sn!)).toBe(false);
        seen.add(order.order_sn!);
      }
      if (!data.response.more) return;
      expect(data.response.next_cursor).toBeTruthy();
      expect(data.response.next_cursor).not.toBe(cursor);
      cursor = data.response.next_cursor!;
    }
  });
});
const merchant = setupIntegrationTest({ auth: "merchant" });
(merchant.runTests ? describe : describe.skip)("Merchant sandbox contracts", () => {
  it("retrieves merchant-bound details using dedicated merchant credentials", async () => {
    const sdk = await merchant.initSdk();
    const info = await sdk.merchant.getMerchantInfo();
    expect(info.request_id).toBeDefined();
    expect(typeof info.merchant_name).toBe("string");
    expect(info.auth_time).toBeInstanceOf(Date);
  });
});
const itemIds = (process.env.SHOPEE_SANDBOX_ITEM_IDS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
(shop.runTests && itemIds.length > 0 ? describe : describe.skip)("Known shop item fixtures", () => {
  it("requests explicit item IDs together and checks their independent identities", async () => {
    const sdk = await shop.initSdk();
    const info = await pollRead(
      () => sdk.product.getItemBaseInfo({ item_id_list: itemIds }),
      (value) =>
        itemIds.every((id) => value.response.item_list?.some((item) => String(item.item_id) === id))
    );
    expect(info.response.item_list?.map((item) => String(item.item_id))).toEqual(
      expect.arrayContaining(itemIds)
    );
  });
});
