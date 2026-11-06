import { jest, describe, it, expect } from "@jest/globals";
import { ShopeeSDK } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import type { GetOrderListRequest } from "../schemas/order.js";
import { GetOrderListRequestOrderStatus } from "../schemas/order.js";

describe("per-call request options", () => {
  it("passes options from manager methods to ShopeeFetch", async () => {
    const spy = jest.spyOn(ShopeeFetch, "fetch").mockResolvedValue({ response: {} });
    const sdk = new ShopeeSDK({ partner_id: 1, partner_key: "k" });
    const controller = new AbortController();
    const options = { signal: controller.signal, timeout_ms: 5000, retry: false as const };

    await sdk.order.getOrderDetail({ order_sn_list: ["A"] }, options);
    await sdk.order.getOrderDetail({ order_sn_list: ["A"] });

    expect(spy.mock.calls[0][2]).toMatchObject({ request: options });
    expect(spy.mock.calls[1][2]?.request).toBeUndefined();
    spy.mockRestore();
  });

  it("keeps enum fields open to any string or number", () => {
    // Compile-time check: enum members, arbitrary strings and numbers stay assignable.
    const base = { time_range_field: "create_time", time_from: 1, time_to: 2, page_size: 1 };
    const fromConfig: string = String(process.env.ORDER_STATUS ?? "UNPAID");
    const requests: GetOrderListRequest[] = [
      { ...base, order_status: fromConfig },
      { ...base, order_status: GetOrderListRequestOrderStatus.READY_TO_SHIP },
      { ...base, order_status: "SOME_FUTURE_STATUS" },
      { ...base, order_status: 3 },
    ];
    expect(requests).toHaveLength(4);
  });
});
