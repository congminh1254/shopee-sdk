/* eslint-disable no-console */
import { automateSandboxAuth } from "./sandbox-auth-automation.js";
import { getSandboxConfig, validateSandboxEnv } from "./env-helper.js";
import { runSandboxJest } from "./sandbox-runner.js";
async function main() {
  validateSandboxEnv();
  const config = getSandboxConfig();
  if (!config.access_token) {
    const token = await automateSandboxAuth();
    process.env.SHOPEE_SANDBOX_ACCESS_TOKEN = token.access_token;
    process.env.SHOPEE_SANDBOX_REFRESH_TOKEN = token.refresh_token ?? "";
    if (token.shop_id) process.env.SHOPEE_SANDBOX_SHOP_ID = String(token.shop_id);
    console.log("Sandbox authentication succeeded.");
  }
  if (!getSandboxConfig().shop_id)
    throw new Error("Sandbox shop tests require SHOPEE_SANDBOX_SHOP_ID");
  if (process.argv.includes("--auth-only")) return;
  await runSandboxJest();
}
main().catch((error) => {
  console.error("Sandbox run failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
