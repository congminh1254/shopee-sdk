export interface SandboxConfig {
  partner_id?: number;
  partner_key?: string;
  shop_id?: number;
  merchant_id?: number;
  user_id?: number;
  merchant_access_token?: string;
  merchant_refresh_token?: string;
  user_access_token?: string;
  user_refresh_token?: string;
  account?: string;
  password?: string;
  access_token?: string;
  refresh_token?: string;
}
function positiveId(value: string | undefined): number | undefined {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : undefined;
}
export function getSandboxConfig(): SandboxConfig {
  return {
    partner_id: positiveId(process.env.SHOPEE_SANDBOX_PARTNER_ID),
    partner_key: process.env.SHOPEE_SANDBOX_PARTNER_KEY,
    shop_id: positiveId(process.env.SHOPEE_SANDBOX_SHOP_ID),
    merchant_id: positiveId(process.env.SHOPEE_SANDBOX_MERCHANT_ID),
    user_id: positiveId(process.env.SHOPEE_SANDBOX_USER_ID),
    merchant_access_token: process.env.SHOPEE_SANDBOX_MERCHANT_ACCESS_TOKEN,
    merchant_refresh_token: process.env.SHOPEE_SANDBOX_MERCHANT_REFRESH_TOKEN,
    user_access_token: process.env.SHOPEE_SANDBOX_USER_ACCESS_TOKEN,
    user_refresh_token: process.env.SHOPEE_SANDBOX_USER_REFRESH_TOKEN,
    account: process.env.SHOPEE_SANDBOX_ACCOUNT,
    password: process.env.SHOPEE_SANDBOX_PASSWORD,
    access_token: process.env.SHOPEE_SANDBOX_ACCESS_TOKEN,
    refresh_token: process.env.SHOPEE_SANDBOX_REFRESH_TOKEN,
  };
}
export function hasSandboxPartnerCredentials(): boolean {
  const config = getSandboxConfig();
  return !!config.partner_id && !!config.partner_key;
}
export function validateSandboxEnv(): void {
  const config = getSandboxConfig();
  const missing = [
    !config.partner_id && "SHOPEE_SANDBOX_PARTNER_ID",
    !config.partner_key && "SHOPEE_SANDBOX_PARTNER_KEY",
    !config.access_token &&
      !config.account &&
      "SHOPEE_SANDBOX_ACCOUNT or SHOPEE_SANDBOX_ACCESS_TOKEN",
    !config.access_token &&
      !config.password &&
      "SHOPEE_SANDBOX_PASSWORD or SHOPEE_SANDBOX_ACCESS_TOKEN",
  ].filter(Boolean);
  if (missing.length)
    throw new Error(
      `Sandbox prerequisites missing or invalid: ${missing.join(", ")}. Configure values in environment settings.`
    );
}
