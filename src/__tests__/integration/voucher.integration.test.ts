import { pollRead, testName, withCleanup } from "../utils/sandbox-fixtures.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { VoucherStatus } from "../utils/legacy-enums.js";

const { runTests, initSdk } = setupIntegrationTest();
const { runTests: runMutations } = setupIntegrationTest({ mutates: true });

(runTests ? describe : describe.skip)("ShopeeSDK VoucherManager Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  (runMutations ? it : it.skip)("should successfully run the full voucher lifecycle", async () => {
    // 1. Create a Voucher starting tomorrow and ending in 3 days
    const startTime = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
    const endTime = startTime + 86400 * 2; // Next 2 days

    const addResponse = await sdk.voucher.addVoucher({
      voucher_name: "Integration Test Voucher",
      voucher_code: testName("IV").slice(0, 5).toUpperCase(),
      start_time: startTime,
      end_time: endTime,
      voucher_type: 1, // Shop Voucher
      reward_type: 1, // Fix Amount Discount
      usage_quantity: 10,
      discount_amount: 10000, // 10k VND
      min_basket_price: 50000, // 50k VND
    });

    const testVoucherId = addResponse.response?.voucher_id;

    if (!testVoucherId) throw new Error("Create did not return a voucher ID");
    await withCleanup(
      testVoucherId!,
      async () => {
        expect(addResponse).toBeDefined();
        expect(addResponse.error).toBe("");
        expect(addResponse.response?.voucher_id).toBeDefined();

        const getResponse = await pollRead(
          () => sdk.voucher.getVoucher({ voucher_id: testVoucherId! }),
          (value) => value.response?.voucher_name === "Integration Test Voucher"
        );
        expect(getResponse.error).toBe("");
        expect(getResponse.response?.voucher_name).toBe("Integration Test Voucher");
        const updateResponse = await sdk.voucher.updateVoucher({
          voucher_id: testVoucherId,
          usage_quantity: 15,
        });
        expect(updateResponse.error).toBe("");
        const verified = await pollRead(
          () => sdk.voucher.getVoucher({ voucher_id: testVoucherId }),
          (value) => value.response?.usage_quantity === 15
        );
        expect(verified.response.usage_quantity).toBe(15);
      },
      async () => {
        const deleteResponse = await sdk.voucher.deleteVoucher({
          voucher_id: testVoucherId,
        });
        expect(deleteResponse.error).toBe("");
      }
    );
  });

  it("should successfully list shop vouchers", async () => {
    const listResponse = await sdk.voucher.getVoucherList({
      status: VoucherStatus.ALL,
      page_no: 1,
      page_size: 10,
    });

    expect(listResponse).toBeDefined();
    expect(listResponse.error).toBe("");
    {
      expect(Array.isArray(listResponse.response.voucher_list)).toBe(true);
    }
  });
});
