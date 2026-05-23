import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { ShopeeApiError } from "../../errors.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK Shipping Document Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should gracefully propagate error when creating shipping document with dummy order ID", async () => {
    try {
      await sdk.logistics.createShippingDocument({
        order_list: [
          {
            order_sn: "NONEXISTENT_ORDER_SN_12345",
          },
        ],
      });
      throw new Error("Should have thrown a ShopeeApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(ShopeeApiError);
      const apiErr = err as ShopeeApiError;
      expect(apiErr.status).toBeDefined();
      expect(apiErr.data).toBeDefined();
      expect(apiErr.message).toBeDefined();
    }
  });

  it("should gracefully propagate error when downloading document with dummy job ID", async () => {
    await expect(
      sdk.logistics.downloadShippingDocumentJob({
        job_id: "DUMMY_JOB_ID_123",
      })
    ).rejects.toThrow();
  });
});
