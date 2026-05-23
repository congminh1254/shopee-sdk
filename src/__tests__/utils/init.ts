/* eslint-disable no-console */
import { spawn } from "node:child_process";
import { automateSandboxAuth } from "./sandbox-auth-automation.js";
import { getSandboxConfig, validateSandboxEnv } from "./env-helper.js";

async function main() {
  validateSandboxEnv();
  const config = getSandboxConfig();

  console.log("Starting automated sandbox login and token generation...");
  const token = await automateSandboxAuth();
  console.log("Successfully obtained access token via automated OAuth flow.");

  // Check if --auth-only flag is set
  if (process.argv.includes("--auth-only")) {
    console.log("Auth-only mode requested. Exiting successfully.");
    process.exit(0);
  }

  // Inject tokens into process.env so Jest and the SDK setup can read them from memory
  process.env.SHOPEE_SANDBOX_ACCESS_TOKEN = token.access_token;
  process.env.SHOPEE_SANDBOX_REFRESH_TOKEN = token.refresh_token || "";
  if (token.shop_id) {
    process.env.SHOPEE_SANDBOX_SHOP_ID = token.shop_id.toString();
  } else if (config.shop_id) {
    process.env.SHOPEE_SANDBOX_SHOP_ID = config.shop_id.toString();
  }

  // Enable ESM in Jest
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS
    ? `${process.env.NODE_OPTIONS} --experimental-vm-modules`
    : "--experimental-vm-modules";

  console.log("Spawning integration tests...");
  // Spawn jest to run the integration tests
  const jestProcess = spawn("npx", ["jest", "src/__tests__/integration/", "--no-coverage"], {
    stdio: "inherit",
    env: process.env,
    shell: true,
  });

  jestProcess.on("close", (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error("Initialization / Sandbox Auth failed:");
  console.error(error?.stack || error);
  process.exit(1);
});
