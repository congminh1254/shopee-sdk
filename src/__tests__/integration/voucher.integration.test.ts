import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { VoucherStatus } from "../../schemas/voucher.js";

const { runTests, initSdk, hasValidToken } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK VoucherManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;
  let testVoucherId: number | undefined;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully run the full voucher lifecycle", async () => {
    if (!hasValidToken()) return;

    // 1. Create a Voucher starting tomorrow and ending in 3 days
    const startTime = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
    const endTime = startTime + 86400 * 2; // Next 2 days

    const addResponse = await sdk.voucher.addVoucher({
      voucher_name: "Integration Test Voucher",
      voucher_code: "IV" + Math.floor(100 + Math.random() * 899),
      start_time: startTime,
      end_time: endTime,
      voucher_type: 1, // Shop Voucher
      reward_type: 1, // Fix Amount Discount
      usage_quantity: 10,
      discount_amount: 10000, // 10k VND
      min_basket_price: 50000, // 50k VND
    });

    expect(addResponse).toBeDefined();
    expect(addResponse.error).toBe("");
    expect(addResponse.response?.voucher_id).toBeDefined();

    testVoucherId = addResponse.response?.voucher_id;

    if (testVoucherId) {
      // 2. Fetch the voucher detail to verify
      const getResponse = await sdk.voucher.getVoucher({
        voucher_id: testVoucherId,
      });
      expect(getResponse.error).toBe("");
      expect(getResponse.response?.voucher_name).toBe("Integration Test Voucher");

      // 3. Update the voucher limits
      const updateResponse = await sdk.voucher.updateVoucher({
        voucher_id: testVoucherId,
        usage_quantity: 15,
      });
      expect(updateResponse.error).toBe("");

      // 4. Delete the upcoming voucher (clean up)
      const deleteResponse = await sdk.voucher.deleteVoucher({
        voucher_id: testVoucherId,
      });
      expect(deleteResponse.error).toBe("");
    }
  });

  it("should successfully list shop vouchers", async () => {
    if (!hasValidToken()) return;

    const listResponse = await sdk.voucher.getVoucherList({
      status: VoucherStatus.ALL,
      page_no: 1,
      page_size: 10,
    });

    expect(listResponse).toBeDefined();
    expect(listResponse.error).toBe("");
    expect(listResponse.response?.voucher_list).toBeDefined();
    expect(Array.isArray(listResponse.response.voucher_list)).toBe(true);
  });
});
