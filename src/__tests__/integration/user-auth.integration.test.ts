import { beforeAll, describe, expect, it } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";

// Real Shopee API only. npm run test:user:integration explicitly enables this suite.
// No automatic refresh: live refresh tokens are single-use and must be persisted by the owner.
const enabled = process.env.SHOPEE_RUN_USER_INTEGRATION === "1";
(enabled ? describe : describe.skip)("Shopee Video live user endpoint", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    const required = [
      "SHOPEE_USER_PARTNER_ID",
      "SHOPEE_USER_PARTNER_KEY",
      "SHOPEE_USER_ID",
      "SHOPEE_USER_ACCESS_TOKEN",
    ];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length)
      throw new Error(`Missing live user test configuration: ${missing.join(", ")}`);
    const partnerId = Number(process.env.SHOPEE_USER_PARTNER_ID);
    const userId = Number(process.env.SHOPEE_USER_ID);
    if (
      !Number.isSafeInteger(partnerId) ||
      partnerId < 0 ||
      !Number.isSafeInteger(userId) ||
      userId < 0
    ) {
      throw new Error("SHOPEE_USER_PARTNER_ID and SHOPEE_USER_ID must be nonnegative integers");
    }
    const baseUrl = process.env.SHOPEE_USER_BASE_URL;
    if (baseUrl) {
      const url = new URL(baseUrl);
      const allowedHosts = [
        "partner.shopeemobile.com",
        "partner.test-stable.shopeemobile.com",
        "openplatform.shopee.cn",
        "openplatform.test-stable.shopee.cn",
      ];
      if (
        url.protocol !== "https:" ||
        !allowedHosts.includes(url.hostname) ||
        url.pathname !== "/api/v2" ||
        url.port ||
        url.username ||
        url.password ||
        url.search ||
        url.hash
      ) {
        throw new Error("SHOPEE_USER_BASE_URL must be an official Shopee HTTPS /api/v2 endpoint");
      }
    }
    const storage = new InMemoryTokenStorage();
    await storage.store({
      access_token: process.env.SHOPEE_USER_ACCESS_TOKEN!,
      refresh_token: "",
      user_id: userId,
      expire_in: 14400,
      request_id: "live-test",
      error: "",
      message: "",
    });
    sdk = new ShopeeSDK(
      {
        partner_id: partnerId,
        partner_key: process.env.SHOPEE_USER_PARTNER_KEY!,
        region: ShopeeRegion.GLOBAL,
        base_url: baseUrl,
      },
      storage
    );
    sdk.refreshToken = async () => {
      throw new Error("Supply a fresh user access token to rerun the live test");
    };
  });

  it.each([1, 2])("authenticates with Shopee and reads video list_type=%s", async (listType) => {
    const result = await sdk.video.getVideoList({
      page_no: 1,
      page_size: 1,
      list_type: [listType],
    });
    expect(result.error).toBe("");
    expect(result.request_id).toEqual(expect.any(String));
    expect(result.response).toBeDefined();
    expect(result.response?.total_count).toEqual(expect.any(Number));
  });
});
