import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { expectApiError } from "../utils/sandbox-fixtures.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK Payment Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should retrieve payment method list (auth: false)", async () => {
    const result = await sdk.payment.getPaymentMethodList();
    expect(result).toBeDefined();
    expect(result.request_id).toBeDefined();
    expect(result.response).toBeDefined();

    expect(Array.isArray(result.response)).toBe(true);
    expect(result.response.length).toBeGreaterThan(0);
    const first = result.response[0];
    expect(first.region).toBeDefined();
    expect(Array.isArray(first.payment_method)).toBe(true);
  }, 60000);

  const installmentTest = process.env.SHOPEE_SANDBOX_INSTALLMENT_ENABLED === "1" ? it : it.skip;
  installmentTest(
    "should retrieve shop installment status for a whitelisted shop",
    async () => {
      const result = await sdk.payment.getShopInstallmentStatus();
      expect(result.request_id).toBeDefined();
      expect(result.response).toBeDefined();
      expect(result.response.installment_status).toBeDefined();
    },
    60000
  );

  it("should gracefully propagate error when querying escrow detail with dummy order ID", async () => {
    await expectApiError(sdk.payment.getEscrowDetail({ order_sn: "NONEXISTENT_ORDER_SN_12345" }), {
      order_not_found: /order.*(?:invalid|not|belong)/i,
      error_param: /order_sn|information.*not found/i,
    });
  }, 60000);
});
