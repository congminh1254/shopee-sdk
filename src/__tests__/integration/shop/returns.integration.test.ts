import { setupIntegrationTest } from "./setup.js";
import { ShopeeApiError } from "../../../errors.js";

describe("ShopeeSDK Returns Sandbox Integration Tests", () => {
  const { initSdk } = setupIntegrationTest();

  let sdk: any;

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
    try {
      await sdk.returns.getReturnDetail({
        return_sn: "1234567890", // Dummy return SN
      });
      fail("Should have thrown a ShopeeApiError for dummy return SN");
    } catch (err) {
      expect(err).toBeInstanceOf(ShopeeApiError);
      const apiErr = err as ShopeeApiError;
      expect([
        "returns.return_not_exist",
        "error_param",
        "returns.return_not_exists",
        "error_data",
      ]).toContain((apiErr.data as any).error);
    }
  });
});
