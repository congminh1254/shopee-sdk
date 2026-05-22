import { chromium } from "playwright";
import { ShopeeSDK } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { getSandboxConfig, validateSandboxEnv } from "./env-helper.js";
import { AccessToken } from "../../schemas/access-token.js";

/**
 * Automates the Sandbox OAuth login and authorization flow using Playwright.
 * It navigates to the official authorization page, switch regions, fills in standard
 * seller credentials (account/password), clicks "Log In", confirms consent,
 * intercepts the authorization callback code, and exchanges it for an access token.
 */
export async function automateSandboxAuth(): Promise<AccessToken> {
  validateSandboxEnv();
  const config = getSandboxConfig();

  const sdk = new ShopeeSDK({
    partner_id: config.partner_id!,
    partner_key: config.partner_key!,
    shop_id: config.shop_id,
    region: ShopeeRegion.TEST_GLOBAL,
  });

  const redirectUri = "https://open.sandbox.test-stable.shopee.com";
  const authUrl = sdk.getAuthorizationUrl(redirectUri);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  let code: string | null = null;
  let shopId: number | null = null;

  try {
    // Navigate directly to the standard authorization URL
    await page.goto(authUrl);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);

    // Switch region to Vietnam (VN) if the select box is present
    try {
      const regionSelect = page.locator("div.shopee-select").first();
      if (await regionSelect.isVisible()) {
        await regionSelect.click();
        await page.waitForTimeout(500);

        const vnOption = page
          .locator("li.shopee-option:has-text('Vietnam'), li.shopee-option:has-text('VN')")
          .first();
        await vnOption.waitFor({ state: "visible", timeout: 5000 });
        await vnOption.click();
        await page.waitForTimeout(500);
      }
    } catch {
      // Ignore region switch errors and assume VN or default is active
    }

    // Automatically fill in the Username and Password login fields
    const usernameLocator = page.locator("div.username input").first();
    await usernameLocator.waitFor({ state: "visible", timeout: 10000 });
    await usernameLocator.fill(config.account!);
    await page.waitForTimeout(500);

    const passwordLocator = page.locator("div.password input").first();
    await passwordLocator.waitFor({ state: "visible", timeout: 10000 });
    await passwordLocator.fill(config.password!);
    await page.waitForTimeout(500);

    // Click the standard Log In button
    const loginButtonLocator = page.locator("button.login-btn").first();
    await loginButtonLocator.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);

    // 4. Click authorization buttons if present
    if (!page.url().includes("code=")) {
      const confirmButton = page.locator("button.timestone-confirm_authorization").first();
      await confirmButton.waitFor({ state: "visible", timeout: 10000 });
      await confirmButton.click();
      await page.waitForTimeout(1000);

      const secondaryConfirmButton = page
        .locator("div.shopee-modal__box button.shopee-button--primary")
        .first();
      await secondaryConfirmButton.waitFor({ state: "visible", timeout: 10000 });

      // Start waiting for the redirect request to stable sandbox BEFORE triggering the action to avoid race conditions
      const redirectPromise = page.waitForRequest(
        (request) =>
          request.url().includes("open.sandbox.test-stable.shopee.com") &&
          request.url().includes("code="),
        { timeout: 15000 }
      );

      await secondaryConfirmButton.click();

      try {
        const interceptedRequest = await redirectPromise;
        const requestUrl = interceptedRequest.url();
        const urlObj = new URL(requestUrl);
        const queryCode = urlObj.searchParams.get("code");
        if (queryCode) {
          code = queryCode;
        }
        const queryShopId = urlObj.searchParams.get("shop_id");
        if (queryShopId) {
          shopId = parseInt(queryShopId, 10);
        }
      } catch {
        // Suppress timeout/interception errors to let the outer check fail or handle gracefully
      }
    }

    if (!code) {
      throw new Error(
        `Failed to intercept authorization code from callback. Final URL: ${page.url()}`
      );
    }

    const token = await sdk.authenticateWithCode(code, shopId || config.shop_id);
    if (!token) {
      throw new Error("authenticateWithCode returned null token.");
    }

    return token;
  } finally {
    await browser.close();
  }
}
