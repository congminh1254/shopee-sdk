import { jest, describe, it, expect } from "@jest/globals";
import { paginate, paginatePages, nextByCursor, nextByOffset, nextByPageNo } from "../sdk.js";
import type { GetOrderListRequest, GetOrderListResponse } from "../schemas/order.js";
import type { GetItemListRequest, GetItemListResponse } from "../schemas/product.js";

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const items: T[] = [];
  for await (const item of iterable) items.push(item);
  return items;
}

describe("pagination helpers", () => {
  it("follows next_cursor until more is false", async () => {
    const pages: Record<string, GetOrderListResponse> = {
      "": {
        response: {
          order_list: [{ order_sn: "A" }, { order_sn: "B" }],
          more: true,
          next_cursor: "2",
        },
      } as GetOrderListResponse,
      "2": {
        response: { order_list: [{ order_sn: "C" }], more: false, next_cursor: "" },
      } as GetOrderListResponse,
    };
    const fetchPage = jest.fn(async (params: GetOrderListRequest) => pages[params.cursor ?? ""]);
    const params: GetOrderListRequest = {
      time_range_field: "create_time",
      time_from: 1,
      time_to: 2,
      page_size: 2,
    };

    const orders = await collect(
      paginate(fetchPage, params, {
        items: (res) => res.response?.order_list,
        next: nextByCursor(),
      })
    );

    expect(orders.map((o) => o.order_sn)).toEqual(["A", "B", "C"]);
    expect(fetchPage).toHaveBeenCalledTimes(2);
    expect(fetchPage.mock.calls[1][0]).toEqual({ ...params, cursor: "2" });
  });

  it("stops when the cursor does not advance", async () => {
    const fetchPage = jest.fn(async () => ({ response: { more: true, next_cursor: "same" } }));
    const pages = await collect(
      paginatePages(fetchPage, { cursor: "same" }, { next: nextByCursor() })
    );
    expect(pages).toHaveLength(1);
  });

  it("follows next_offset for offset pagination", async () => {
    const fetchPage = jest.fn(
      async (params: GetItemListRequest) =>
        ({
          response: {
            item: [{ item_id: params.offset }],
            has_next_page: params.offset < 20,
            next_offset: params.offset + 10,
          },
        }) as GetItemListResponse
    );
    const items = await collect(
      paginate(
        fetchPage,
        { offset: 0, page_size: 10, item_status: "NORMAL" },
        { items: (res) => res.response?.item, next: nextByOffset() }
      )
    );
    expect(items.map((i) => i.item_id)).toEqual([0, 10, 20]);
  });

  it("increments page_no for page-number pagination", async () => {
    const fetchPage = jest.fn(async (params: { page_no: number; page_size: number }) => ({
      response: { list: [params.page_no], more: params.page_no < 3 },
    }));
    const items = await collect(
      paginate(
        fetchPage,
        { page_no: 1, page_size: 50 },
        { items: (res) => res.response.list, next: nextByPageNo() }
      )
    );
    expect(items).toEqual([1, 2, 3]);
  });

  it("respects max_pages and custom field names", async () => {
    const fetchPage = jest.fn(async (params: { token?: string }) => ({
      response: { has_more: true, next_token: `${Number(params.token ?? 0) + 1}` },
    }));
    const pages = await collect(
      paginatePages(
        fetchPage,
        {},
        {
          next: nextByCursor({ param: "token", nextCursor: "next_token", more: "has_more" }),
          max_pages: 3,
        }
      )
    );
    expect(pages).toHaveLength(3);
    expect(fetchPage.mock.calls.map(([p]) => p.token)).toEqual([undefined, "1", "2"]);
  });
});
