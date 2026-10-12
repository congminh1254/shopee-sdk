import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import { expectApiError } from "../utils/sandbox-fixtures.js";

const reads = setupIntegrationTest();
const mutations = setupIntegrationTest({ mutates: true });

(reads.runTests ? describe : describe.skip)("Shipping document reads", () => {
  let sdk: ShopeeSDK;
  beforeAll(async () => {
    sdk = await reads.initSdk();
  });

  it("rejects a nonexistent document job with its documented validation error", async () => {
    await expectApiError(
      sdk.logistics.downloadShippingDocumentJob({ job_id: "DUMMY_JOB_ID_123" }),
      { error_param: /job|information.*not found|parameter invalid/i }
    );
  }, 60000);
});

(mutations.runTests ? describe : describe.skip)("Shipping document creation validation", () => {
  let sdk: ShopeeSDK;
  beforeAll(async () => {
    sdk = await mutations.initSdk();
  });

  it("rejects a dummy order without accepting unrelated API failures", async () => {
    const data = await expectApiError(
      sdk.logistics.createShippingDocument({
        order_list: [{ order_sn: "NONEXISTENT_ORDER_SN_12345" }],
      }),
      {
        error_not_found: /order|not found/i,
        error_param: /order|information.*not found|parameter invalid/i,
        "common.batch_api_all_failed": /result_list/i,
      }
    );
    if (data.error === "common.batch_api_all_failed") {
      expect(data.response).toEqual(
        expect.objectContaining({
          result_list: [
            expect.objectContaining({
              order_sn: "NONEXISTENT_ORDER_SN_12345",
              fail_error: expect.stringMatching(
                /^(?:error_not_found|error_param|logistics\.order_not_exist)$/
              ),
              fail_message: expect.stringMatching(/order|not (?:found|exist)/i),
            }),
          ],
        })
      );
    }
  }, 60000);
});
