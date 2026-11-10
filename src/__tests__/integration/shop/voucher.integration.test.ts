import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../../sdk.js";
import { setupIntegrationTest, untilFound } from "./setup.js";
import { VoucherStatus } from "../../utils/legacy-enums.js";

const { initSdk } = setupIntegrationTest();

describe("ShopeeSDK VoucherManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;
  let testVoucherId: number | undefined;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully run the full voucher lifecycle", async () => {
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
    const voucherId = testVoucherId!;

    try {
      // 2. Fetch the voucher detail to verify (waits out the sandbox's read-after-create lag)
      const getResponse = await untilFound(() => sdk.voucher.getVoucher({ voucher_id: voucherId }));
      expect(getResponse.error).toBe("");
      expect(getResponse.response?.voucher_name).toBe("Integration Test Voucher");

      // 3. Update the voucher limits
      const updateResponse = await sdk.voucher.updateVoucher({
        voucher_id: voucherId,
        usage_quantity: 15,
      });
      expect(updateResponse.error).toBe("");
    } finally {
      // 4. Delete the upcoming voucher, even when a step above failed, so retries don't leak it
      const deleteResponse = await sdk.voucher.deleteVoucher({ voucher_id: voucherId });
      expect(deleteResponse.error).toBe("");
    }
  });

  it("should successfully list shop vouchers", async () => {
    const listResponse = await sdk.voucher.getVoucherList({
      status: VoucherStatus.ALL,
      page_no: 1,
      page_size: 10,
    });

    expect(listResponse).toBeDefined();
    expect(listResponse.error).toBe("");
    if (listResponse.response?.voucher_list) {
      expect(Array.isArray(listResponse.response.voucher_list)).toBe(true);
    }
  });
});
