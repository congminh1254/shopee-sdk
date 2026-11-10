/* eslint-disable no-console */
import { spawn } from "node:child_process";
import { automateMainAccountAuth, automateSandboxAuth } from "./sandbox-auth-automation.js";
import { requireSandboxEnv, SANDBOX_SUITE_ENV, SandboxSuite } from "./env-helper.js";

/**
 * Sandbox runner: `tsx init.ts <shop|user|merchant> [--auth-only]`.
 * Logs in with the suite's sandbox account, injects the fresh token into the environment and runs
 * that suite's Jest tests. Missing configuration or a failed login fails the run; nothing skips.
 */
async function authenticate(suite: SandboxSuite): Promise<void> {
  requireSandboxEnv(SANDBOX_SUITE_ENV[suite]);
  switch (suite) {
    case "shop": {
      const token = await automateSandboxAuth();
      if (typeof token.shop_id !== "number") throw new Error("Shop grant returned no shop_id");
      process.env.SHOPEE_SANDBOX_ACCESS_TOKEN = token.access_token;
      process.env.SHOPEE_SANDBOX_REFRESH_TOKEN = token.refresh_token || "";
      process.env.SHOPEE_SANDBOX_SHOP_ID = String(token.shop_id);
      console.log(`Obtained shop token for shop_id ${token.shop_id}.`);
      return;
    }
    case "merchant": {
      const token = await automateMainAccountAuth();
      if (typeof token.merchant_id !== "number") {
        throw new Error("Main account grant did not contain exactly one merchant");
      }
      process.env.SHOPEE_SANDBOX_MERCHANT_ID = String(token.merchant_id);
      process.env.SHOPEE_SANDBOX_MERCHANT_ACCESS_TOKEN = token.access_token;
      console.log(`Obtained merchant token for merchant_id ${token.merchant_id}.`);
      return;
    }
    case "user": {
      // SHOPEE_SANDBOX_USER_ID selects a user; otherwise the grant's first user is used.
      const selected = process.env.SHOPEE_SANDBOX_USER_ID
        ? Number(process.env.SHOPEE_SANDBOX_USER_ID)
        : undefined;
      const token = await automateMainAccountAuth(selected);
      const userId = token.user_id ?? token.user_id_list?.[0];
      if (typeof userId !== "number") throw new Error("Main account grant listed no users");
      process.env.SHOPEE_SANDBOX_USER_ID = String(userId);
      process.env.SHOPEE_SANDBOX_USER_ACCESS_TOKEN = token.access_token;
      console.log(`Obtained user token for user_id ${userId}.`);
      return;
    }
  }
}

async function main() {
  const suite = process.argv[2] as SandboxSuite;
  if (!(suite in SANDBOX_SUITE_ENV)) {
    throw new Error(`Usage: init.ts <${Object.keys(SANDBOX_SUITE_ENV).join("|")}> [--auth-only]`);
  }

  console.log(`Authenticating the ${suite} sandbox suite...`);
  await authenticate(suite);
  if (process.argv.includes("--auth-only")) {
    console.log("Auth-only mode requested. Exiting successfully.");
    return;
  }

  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS
    ? `${process.env.NODE_OPTIONS} --experimental-vm-modules`
    : "--experimental-vm-modules";

  console.log(`Running ${suite} sandbox tests...`);
  const jest = spawn(
    "npx",
    ["jest", "--config", "jest.integration.config.js", `src/__tests__/integration/${suite}/`],
    { stdio: "inherit", env: process.env, shell: true }
  );
  jest.on("close", (code) => process.exit(code ?? 1));
}

main().catch((error) => {
  console.error("Sandbox run failed:");
  console.error(error?.stack || error);
  process.exit(1);
});
