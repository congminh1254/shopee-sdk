import { ShopeeSDK } from "../../../sdk.js";
import { ShopeeRegion } from "../../../schemas/region.js";
import { requireSandboxEnv } from "../../utils/env-helper.js";
import { jest } from "@jest/globals";

/**
 * Shop sandbox suites. `npm run test:sandbox:shop` logs in to the sandbox shop and injects
 * SHOPEE_SANDBOX_ACCESS_TOKEN / SHOPEE_SANDBOX_SHOP_ID; missing configuration fails the suite.
 */
export function setupIntegrationTest() {
  // Retry failing integration tests up to 3 times
  jest.retryTimes(3, { logErrorsBeforeRetry: true });

  let sdk: ShopeeSDK;

  const initSdk = async () => {
    if (sdk) return sdk;
    const env = requireSandboxEnv([
      "SHOPEE_SANDBOX_PARTNER_ID",
      "SHOPEE_SANDBOX_PARTNER_KEY",
      "SHOPEE_SANDBOX_SHOP_ID",
      "SHOPEE_SANDBOX_ACCESS_TOKEN",
    ]);
    const shopId = Number(env.SHOPEE_SANDBOX_SHOP_ID);
    sdk = new ShopeeSDK({
      partner_id: Number(env.SHOPEE_SANDBOX_PARTNER_ID),
      partner_key: env.SHOPEE_SANDBOX_PARTNER_KEY,
      shop_id: shopId,
      region: ShopeeRegion.TEST_GLOBAL, // TEST_GLOBAL serves local Vietnam sandbox accounts
    });
    await sdk["tokenStorage"].store({
      access_token: env.SHOPEE_SANDBOX_ACCESS_TOKEN,
      refresh_token: process.env.SHOPEE_SANDBOX_REFRESH_TOKEN || "",
      expire_in: 3600,
      expired_at: Date.now() + 3600000, // Valid for 1 hour
      shop_id: shopId,
      request_id: "env-injected",
      error: "",
      message: "",
    });
    return sdk;
  };

  return { initSdk };
}

/**
 * Retries a read until Shopee can see a record the test just created. The sandbox is
 * eventually consistent: a read right after a successful create can briefly return
 * `common.error_not_found` (observed for ~1.5s on vouchers).
 */
export async function untilFound<T>(read: () => Promise<T>, timeoutMs = 20000): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      return await read();
    } catch (error) {
      const notFound = (error as { error?: string })?.error?.endsWith("error_not_found");
      if (!notFound || Date.now() >= deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
