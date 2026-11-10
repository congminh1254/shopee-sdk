import { beforeAll, describe, expect, it } from "@jest/globals";
import { ShopeeSDK } from "../../../sdk.js";
import { requireSandboxInt } from "../../utils/env-helper.js";
import { createMainAccountSdk } from "../main-account-setup.js";

// Merchant APIs (merchant, global_product) sign with merchant_id. Run via `npm run test:sandbox:merchant`.
describe("Merchant sandbox integration", () => {
  let sdk: ShopeeSDK;
  let merchantId: number;

  beforeAll(async () => {
    merchantId = requireSandboxInt("SHOPEE_SANDBOX_MERCHANT_ID");
    sdk = await createMainAccountSdk(
      { merchant_id: merchantId },
      "SHOPEE_SANDBOX_MERCHANT_ACCESS_TOKEN"
    );
  });

  it("reads merchant info", async () => {
    const result = await sdk.merchant.getMerchantInfo();
    expect(result.error).toBe("");
    // Shopee returns merchant fields at the top level for this endpoint; accept either shape.
    expect(result.merchant_name ?? result.response?.merchant_name).toEqual(expect.any(String));
  });

  it("lists shops bound to the merchant", async () => {
    const result = await sdk.merchant.getShopListByMerchant({ page_no: 1, page_size: 10 });
    expect(result.error).toBe("");
    const shops = result.shop_list ?? result.response?.shop_list;
    expect(Array.isArray(shops)).toBe(true);
  });

  it("reads the global product category tree", async () => {
    const result = await sdk.globalProduct.getCategory({ language: "en" });
    expect(result.error).toBe("");
    expect(result.response?.category_list?.length).toBeGreaterThan(0);
  });

  it("lists global items", async () => {
    const result = await sdk.globalProduct.getGlobalItemList({ page_size: 10 });
    expect(result.error).toBe("");
    expect(result.response?.total_count).toEqual(expect.any(Number));
  });

  it("calls partner-level endpoints while holding a merchant token", async () => {
    const methods = await sdk.payment.getPaymentMethodList();
    expect(methods.error ?? "").toBe("");
    const push = await sdk.push.getAppPushConfig();
    expect(push.error).toBe("");
  });

  it("fails locally on shop endpoints without a shop_id", async () => {
    await expect(sdk.shop.getShopInfo()).rejects.toThrow("No valid shop_id");
  });
});
