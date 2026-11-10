export interface SandboxConfig {
  partner_id?: number;
  partner_key?: string;
  shop_id?: number;
  account?: string;
  password?: string;
  main_account?: string;
  main_password?: string;
  main_account_id?: number;
}

const optionalInt = (value: string | undefined) => (value ? parseInt(value, 10) : undefined);

/** Reads the sandbox configuration from environment variables. */
export function getSandboxConfig(): SandboxConfig {
  return {
    partner_id: optionalInt(process.env.SHOPEE_SANDBOX_PARTNER_ID),
    partner_key: process.env.SHOPEE_SANDBOX_PARTNER_KEY,
    shop_id: optionalInt(process.env.SHOPEE_SANDBOX_SHOP_ID),
    account: process.env.SHOPEE_SANDBOX_ACCOUNT,
    password: process.env.SHOPEE_SANDBOX_PASSWORD,
    main_account: process.env.SHOPEE_SANDBOX_MAIN_ACCOUNT || undefined,
    main_password: process.env.SHOPEE_SANDBOX_MAIN_PASSWORD || undefined,
    main_account_id: optionalInt(process.env.SHOPEE_SANDBOX_MAIN_ACCOUNT_ID),
  };
}

/** Credentials each sandbox suite needs to log in; the runner fails if any is missing. */
export const SANDBOX_SUITE_ENV = {
  shop: [
    "SHOPEE_SANDBOX_PARTNER_ID",
    "SHOPEE_SANDBOX_PARTNER_KEY",
    "SHOPEE_SANDBOX_ACCOUNT",
    "SHOPEE_SANDBOX_PASSWORD",
  ],
  user: [
    "SHOPEE_SANDBOX_PARTNER_ID",
    "SHOPEE_SANDBOX_PARTNER_KEY",
    "SHOPEE_SANDBOX_MAIN_ACCOUNT",
    "SHOPEE_SANDBOX_MAIN_PASSWORD",
  ],
  merchant: [
    "SHOPEE_SANDBOX_PARTNER_ID",
    "SHOPEE_SANDBOX_PARTNER_KEY",
    "SHOPEE_SANDBOX_MAIN_ACCOUNT",
    "SHOPEE_SANDBOX_MAIN_PASSWORD",
  ],
} as const;

export type SandboxSuite = keyof typeof SANDBOX_SUITE_ENV;

/**
 * Returns the named environment variables, throwing one error that lists every missing name.
 * Sandbox suites never skip: absent configuration is a failure.
 */
export function requireSandboxEnv<K extends string>(names: readonly K[]): Record<K, string> {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(
      `Sandbox test configuration missing: ${missing.join(", ")}. ` +
        "Set them in .env (see .env.example) or as GitHub Actions secrets."
    );
  }
  return Object.fromEntries(names.map((name) => [name, process.env[name]!])) as Record<K, string>;
}

/** Reads a required nonnegative integer environment variable. */
export function requireSandboxInt(name: string): number {
  const value = Number(requireSandboxEnv([name])[name]);
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} must be a nonnegative integer`);
  }
  return value;
}
