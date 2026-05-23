import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { ShopeeApiError } from "../../errors.js";

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

  it("should retrieve shop installment status (auth: true)", async () => {
    try {
      const result = await sdk.payment.getShopInstallmentStatus();
      expect(result).toBeDefined();
      expect(result.request_id).toBeDefined();
      if (result.response) {
        expect(result.response.status).toBeDefined();
      }
    } catch (err) {
      if (err instanceof ShopeeApiError) {
        expect(err.status).toBeDefined();
        expect(err.data).toBeDefined();
      } else {
        throw err;
      }
    }
  }, 60000);

  it("should gracefully propagate error when querying escrow detail with dummy order ID", async () => {
    try {
      await sdk.payment.getEscrowDetail({
        order_sn: "NONEXISTENT_ORDER_SN_12345",
      });
      throw new Error("Should have thrown a ShopeeApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(ShopeeApiError);
      const apiErr = err as ShopeeApiError;
      expect(apiErr.status).toBeDefined();
      expect(apiErr.data).toBeDefined();
      expect(apiErr.message).toBeDefined();
    }
  }, 60000);
});
