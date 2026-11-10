import { beforeAll, describe, expect, it } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";

// Explicit opt-in: uses an existing merchant (main-account) token and only reads data.
// No automatic refresh: live refresh tokens are single-use and must be persisted by the owner.
const enabled = process.env.SHOPEE_RUN_MERCHANT_INTEGRATION === "1";
(enabled ? describe : describe.skip)("Shopee live Merchant APIs", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    const required = [
      "SHOPEE_MERCHANT_PARTNER_ID",
      "SHOPEE_MERCHANT_PARTNER_KEY",
      "SHOPEE_MERCHANT_ID",
      "SHOPEE_MERCHANT_ACCESS_TOKEN",
    ];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length)
      throw new Error(`Missing live merchant test configuration: ${missing.join(", ")}`);
    const partnerId = Number(process.env.SHOPEE_MERCHANT_PARTNER_ID);
    const merchantId = Number(process.env.SHOPEE_MERCHANT_ID);
    if (
      !Number.isSafeInteger(partnerId) ||
      partnerId < 0 ||
      !Number.isSafeInteger(merchantId) ||
      merchantId < 0
    ) {
      throw new Error(
        "SHOPEE_MERCHANT_PARTNER_ID and SHOPEE_MERCHANT_ID must be nonnegative integers"
      );
    }
    const storage = new InMemoryTokenStorage();
    await storage.store({
      access_token: process.env.SHOPEE_MERCHANT_ACCESS_TOKEN!,
      refresh_token: "",
      merchant_id: merchantId,
      expire_in: 14400,
      request_id: "live-test",
      error: "",
      message: "",
    });
    sdk = new ShopeeSDK(
      {
        partner_id: partnerId,
        partner_key: process.env.SHOPEE_MERCHANT_PARTNER_KEY!,
        // Defaults to the global sandbox; override for production or the China sandbox.
        region: ShopeeRegion.TEST_GLOBAL,
        base_url: process.env.SHOPEE_MERCHANT_BASE_URL || undefined,
      },
      storage
    );
    sdk.refreshToken = async () => {
      throw new Error("Supply a fresh merchant access token to rerun the live test");
    };
  });

  it("reads merchant info signed with merchant_id", async () => {
    const result = await sdk.merchant.getMerchantInfo();
    expect(result.error).toBe("");
    expect(result.request_id).toEqual(expect.any(String));
    // Shopee returns merchant fields at the top level for this endpoint; accept either shape.
    expect(result.merchant_name ?? result.response?.merchant_name).toEqual(expect.any(String));
  }, 60000);

  it("lists shops bound to the merchant", async () => {
    const result = await sdk.merchant.getShopListByMerchant({ page_no: 1, page_size: 10 });
    expect(result.error).toBe("");
    expect(result.request_id).toEqual(expect.any(String));
  }, 60000);

  it("reads the global product category tree", async () => {
    const result = await sdk.globalProduct.getCategory({ language: "en" });
    expect(result.error).toBe("");
    expect(result.response).toBeDefined();
  }, 60000);
});
