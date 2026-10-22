import { beforeAll, describe, expect, it } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";

// Explicit opt-in: uses an existing user token and only reads the video list.
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
        base_url: process.env.SHOPEE_USER_BASE_URL,
      },
      storage
    );
    sdk.refreshToken = async () => {
      throw new Error("Supply a fresh user access token to rerun the live test");
    };
  });

  it("authenticates and reads the posted video list", async () => {
    const result = await sdk.video.getVideoList({ page_no: 1, page_size: 1, list_type: [2] });
    expect(result.error).toBe("");
    expect(result.request_id).toEqual(expect.any(String));
    expect(result.response).toBeDefined();
    expect(result.response?.total_count).toEqual(expect.any(Number));
  });
});
