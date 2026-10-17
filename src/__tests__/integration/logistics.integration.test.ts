import { setupIntegrationTest } from "./setup.js";
import { ShopeeSDK } from "../../sdk.js";
import { expectApiError } from "../utils/sandbox-fixtures.js";

const { runTests, initSdk } = setupIntegrationTest();

(runTests ? describe : describe.skip)("ShopeeSDK Logistics Sandbox Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully retrieve the active shipping channel list for the shop", async () => {
    const response = await sdk.logistics.getChannelList();

    expect(response).toBeDefined();
    expect(response.error || "").toBe("");

    const channelList = response.response?.logistics_channel_list;
    expect(channelList).toBeDefined();
    expect(Array.isArray(channelList)).toBe(true);

    if (channelList && channelList.length > 0) {
      const channel = channelList[0];
      expect(channel.logistics_channel_id).toBeDefined();
      expect(channel.logistics_channel_name).toBeDefined();
    }
  });

  it("should gracefully propagate error when fetching shipping document parameter with dummy order ID", async () => {
    await expectApiError(
      sdk.logistics.getShippingDocumentParameter({
        order_list: [{ order_sn: "1234567890ABCDEF" }],
      }),
      {
        "order.error_not_exist": /order/i,
        "order.order_not_exists": /order/i,
        "logistics.order_not_exist": /order/i,
        error_not_found: /order|not found/i,
        error_param: /order|information.*not found|parameter invalid/i,
      }
    );
  });
});
