/* eslint-disable no-console */
export interface SandboxConfig {
  partner_id?: number;
  partner_key?: string;
  shop_id?: number;
  account?: string;
  password?: string;
  access_token?: string;
  refresh_token?: string;
}

/**
 * Retrieves the Sandbox configuration from environment variables.
 */
export function getSandboxConfig(): SandboxConfig {
  const partnerIdStr = process.env.SHOPEE_SANDBOX_PARTNER_ID;
  const partnerKey = process.env.SHOPEE_SANDBOX_PARTNER_KEY;
  const shopIdStr = process.env.SHOPEE_SANDBOX_SHOP_ID;
  const account = process.env.SHOPEE_SANDBOX_ACCOUNT;
  const password = process.env.SHOPEE_SANDBOX_PASSWORD;
  const accessToken = process.env.SHOPEE_SANDBOX_ACCESS_TOKEN;
  const refreshToken = process.env.SHOPEE_SANDBOX_REFRESH_TOKEN;

  return {
    partner_id: partnerIdStr ? parseInt(partnerIdStr, 10) : undefined,
    partner_key: partnerKey,
    shop_id: shopIdStr ? parseInt(shopIdStr, 10) : undefined,
    account,
    password,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}

/**
 * Checks if the minimal required sandbox partner credentials are present.
 */
export function hasSandboxPartnerCredentials(): boolean {
  const config = getSandboxConfig();
  return typeof config.partner_id === "number" && !isNaN(config.partner_id) && !!config.partner_key;
}

/**
 * Unifies and validates that all required sandbox environment variables are configured.
 * If any required variables are missing, it prints a clear error message and exits the process.
 */
export function validateSandboxEnv(): void {
  const config = getSandboxConfig();
  const missing: string[] = [];

  if (!config.partner_id) missing.push("SHOPEE_SANDBOX_PARTNER_ID");
  if (!config.partner_key) missing.push("SHOPEE_SANDBOX_PARTNER_KEY");
  if (!config.account) missing.push("SHOPEE_SANDBOX_ACCOUNT");
  if (!config.password) missing.push("SHOPEE_SANDBOX_PASSWORD");

  if (missing.length > 0) {
    console.error("Error: Sandbox integration test credentials not fully configured.");
    console.error("Please configure the following environment variables in your .env file:");
    for (const key of missing) {
      console.error(`- ${key}`);
    }
    process.exit(1);
  }
}
