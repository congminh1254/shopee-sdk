import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { getSandboxConfig, hasSandboxPartnerCredentials } from "../utils/env-helper.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import type { AuthMode } from "../../schemas/fetch.js";

export function setupIntegrationTest(options: { auth?: AuthMode; mutates?: boolean } = {}) {
  const config = getSandboxConfig();
  const auth = options.auth ?? "shop";
  if (auth === "merchant") {
    config.access_token = config.merchant_access_token;
    config.refresh_token = config.merchant_refresh_token;
  }
  if (auth === "user") {
    config.access_token = config.user_access_token;
    config.refresh_token = config.user_refresh_token;
  }
  const identity =
    auth === "shop"
      ? config.shop_id
      : auth === "merchant"
        ? config.merchant_id
        : auth === "user"
          ? config.user_id
          : true;
  const available =
    hasSandboxPartnerCredentials() && (auth === "partner" || (!!config.access_token && !!identity));
  const enabled = !options.mutates || process.env.SHOPEE_SANDBOX_ALLOW_MUTATIONS === "1";
  if (
    enabled &&
    !available &&
    process.env.SHOPEE_SANDBOX_REQUIRED === "1" &&
    ["partner", "shop"].includes(auth)
  ) {
    throw new Error(`Requested sandbox ${auth} tests lack usable credentials/token/identity`);
  }
  let sdk: ShopeeSDK | undefined;
  return {
    runTests: available && enabled,
    initSdk: async () => {
      if (!available) throw new Error(`Missing ${auth} sandbox prerequisites`);
      if (sdk) return sdk;
      const storage = new InMemoryTokenStorage();
      if (config.access_token)
        await storage.store({
          access_token: config.access_token,
          refresh_token: config.refresh_token ?? "",
          expire_in: 3600,
          expired_at: Date.now() + 3600000,
          shop_id: config.shop_id,
          merchant_id: config.merchant_id,
          user_id: config.user_id,
          request_id: "env-injected",
          error: "",
          message: "",
        });
      sdk = new ShopeeSDK(
        {
          partner_id: config.partner_id!,
          partner_key: config.partner_key!,
          shop_id: config.shop_id,
          merchant_id: config.merchant_id,
          user_id: config.user_id,
          region: ShopeeRegion.TEST_GLOBAL,
        },
        storage
      );
      return sdk;
    },
  };
}
