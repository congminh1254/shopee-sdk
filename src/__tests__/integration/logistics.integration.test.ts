import { setupIntegrationTest } from "./setup.js";
import { ShopeeApiError } from "../../errors.js";

describe("ShopeeSDK Logistics Sandbox Integration Tests", () => {
  const { runTests, initSdk, hasValidToken } = setupIntegrationTest();

  if (!runTests) {
    it("should skip sandbox integration tests if credentials are not configured", () => {
      // Skipped
    });
    return;
  }

  let sdk: any;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully retrieve the active shipping channel list for the shop", async () => {
    if (!hasValidToken()) {
      return; // Skip if no active shop session
    }

    const response = await sdk.logistics.getChannelList();

    expect(response).toBeDefined();
    expect(response.error || "").toBe("");

    const channelList = response.response?.logistics_channel_list;
    expect(channelList).toBeDefined();
    expect(Array.isArray(channelList)).toBe(true);

    if (channelList.length > 0) {
      const channel = channelList[0];
      expect(channel.logistics_channel_id).toBeDefined();
      expect(channel.logistics_channel_name).toBeDefined();
    }
  });

  it("should gracefully propagate error when fetching shipping document parameter with dummy order ID", async () => {
    if (!hasValidToken()) {
      return;
    }

    try {
      await sdk.logistics.getShippingDocumentParameter({
        order_list: [
          {
            order_sn: "1234567890ABCDEF", // Dummy order SN
          },
        ],
      });
      fail("Should have thrown a ShopeeApiError for dummy order ID");
    } catch (err) {
      expect(err).toBeInstanceOf(ShopeeApiError);
      const apiErr = err as ShopeeApiError;
      expect([
        "order.error_not_exist",
        "error_param",
        "order.order_not_exists",
        "logistics.order_not_exist",
      ]).toContain((apiErr.data as any).error);
    }
  });
});
