import { setupIntegrationTest } from "./setup.js";
import { ShopeeSDK } from "../../sdk.js";
import { expectApiError } from "../utils/sandbox-fixtures.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK Returns Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully retrieve return list for the shop", async () => {
    const response = await sdk.returns.getReturnList({
      page_no: 0,
      page_size: 10,
    });

    expect(response).toBeDefined();
    expect(response.error || "").toBe("");
  });

  it("should gracefully propagate error when querying details with a dummy return serial number", async () => {
    await expectApiError(sdk.returns.getReturnDetail({ return_sn: "1234567890" }), {
      "returns.return_not_exist": /return/i,
      "returns.return_not_exists": /return/i,
      error_param: /return|information.*not found/i,
      error_data: /return.*(?:not available|doesn.t exist)|data not exist/i,
    });
  });
});
