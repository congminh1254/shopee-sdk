import { jest } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AccessToken } from "../../schemas/access-token.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import { requireSandboxEnv } from "../utils/env-helper.js";

/**
 * Builds an SDK holding the token the sandbox runner injected for a main-account suite.
 * Missing configuration throws. Refresh is disabled: the token is fresh, and refresh tokens are
 * single-use, so a test must not consume one.
 */
export async function createMainAccountSdk(identity: Partial<AccessToken>, tokenEnv: string) {
  jest.retryTimes(2, { logErrorsBeforeRetry: true });
  const env = requireSandboxEnv([
    "SHOPEE_SANDBOX_PARTNER_ID",
    "SHOPEE_SANDBOX_PARTNER_KEY",
    tokenEnv,
  ]);
  const storage = new InMemoryTokenStorage();
  await storage.store({
    access_token: env[tokenEnv],
    refresh_token: "",
    expire_in: 14400,
    request_id: "sandbox-runner",
    error: "",
    message: "",
    ...identity,
  });
  const sdk = new ShopeeSDK(
    {
      partner_id: Number(env.SHOPEE_SANDBOX_PARTNER_ID),
      partner_key: env.SHOPEE_SANDBOX_PARTNER_KEY,
      region: ShopeeRegion.TEST_GLOBAL,
    },
    storage
  );
  sdk.refreshToken = async () => {
    throw new Error("Sandbox tests must not refresh; rerun the suite for a fresh token");
  };
  return sdk;
}
