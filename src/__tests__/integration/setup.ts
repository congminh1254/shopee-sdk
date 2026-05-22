import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { getSandboxConfig, hasSandboxPartnerCredentials } from "../utils/env-helper.js";
import { AccessToken } from "../../schemas/access-token.js";

export function setupIntegrationTest() {
  const runTests = hasSandboxPartnerCredentials();
  let sdk: ShopeeSDK;
  let hasValidToken = false;

  const initSdk = async () => {
    if (sdk) return sdk;
    const config = getSandboxConfig();
    sdk = new ShopeeSDK({
      partner_id: config.partner_id!,
      partner_key: config.partner_key!,
      shop_id: config.shop_id,
      region: ShopeeRegion.TEST_GLOBAL, // TEST_GLOBAL serves local Vietnam sandbox accounts
    });

    // 1. If an explicit access token was provided in .env, pre-load it into storage
    if (config.access_token) {
      const token: AccessToken = {
        access_token: config.access_token,
        refresh_token: config.refresh_token || "",
        expire_in: 3600,
        expired_at: Date.now() + 3600000, // Valid for 1 hour
        shop_id: config.shop_id,
        request_id: "env-injected",
        error: "",
        message: "",
      };
      await sdk["tokenStorage"].store(token);
      hasValidToken = typeof config.shop_id === "number" && !isNaN(config.shop_id);
    } else {
      // 2. Check if there's already a valid token in the persistent token storage
      const token = await sdk.getAuthToken();
      if (
        token &&
        typeof token.shop_id === "number" &&
        token.expired_at &&
        token.expired_at > Date.now()
      ) {
        hasValidToken = true;
      }
    }
    return sdk;
  };

  return {
    runTests,
    initSdk,
    hasValidToken: () => hasValidToken,
  };
}
