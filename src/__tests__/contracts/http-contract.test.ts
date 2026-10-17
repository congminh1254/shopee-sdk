import { describe, it, expect } from "@jest/globals";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { createHmac } from "node:crypto";
import { ShopeeSDK } from "../../sdk.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import { ShopeeApiError, ShopeeSdkError } from "../../errors.js";
import { parseResponseJson } from "../../utils/response-json.js";

async function serverTest(
  run: (
    base: string,
    requests: { url: URL; body: Buffer; headers: IncomingMessage["headers"] }[],
    respond: (handler: (url: URL, res: ServerResponse) => void) => void
  ) => Promise<void>
) {
  const requests: { url: URL; body: Buffer; headers: IncomingMessage["headers"] }[] = [];
  let handler = (url: URL, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ request_id: "test", error: "", message: "", response: [] }));
  };
  const server = createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(Buffer.from(chunk));
    const url = new URL(req.url!, "http://127.0.0.1");
    requests.push({ url, body: Buffer.concat(chunks), headers: req.headers });
    handler(url, res);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  try {
    await run(`http://127.0.0.1:${port}/api/v2`, requests, (next) => {
      handler = next;
    });
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
}
async function client(base: string) {
  const storage = new InMemoryTokenStorage();
  await storage.store({
    access_token: "local-token",
    refresh_token: "local-refresh",
    expire_in: 3600,
    expired_at: Date.now() + 3600000,
    shop_id: 11,
    merchant_id: 22,
    user_id: 33,
    request_id: "test",
    error: "",
    message: "",
  });
  return new ShopeeSDK(
    {
      partner_id: 7,
      partner_key: "local-key",
      base_url: base,
      shop_id: 11,
      merchant_id: 22,
      user_id: 33,
    },
    storage
  );
}
function signature(url: URL, suffix: string[] = []) {
  return createHmac("sha256", "local-key")
    .update(["7", url.pathname, url.searchParams.get("timestamp")!, ...suffix].join(""))
    .digest("hex");
}

describe("real HTTP contracts", () => {
  it("signs partner-only generated endpoints without acquiring a shop token", () =>
    serverTest(async (base, requests) => {
      const sdk = new ShopeeSDK({ partner_id: 7, partner_key: "local-key", base_url: base });
      await sdk.payment.getPaymentMethodList();
      const url = requests[0].url;
      expect(url.searchParams.get("sign")).toBe(signature(url));
      expect(url.searchParams.has("access_token")).toBe(false);
      expect(url.searchParams.has("shop_id")).toBe(false);
    }));
  it.each(["shop", "merchant", "user", "token"] as const)(
    "binds the %s identity and independently verifies its signature",
    (mode) =>
      serverTest(async (base, requests) => {
        const sdk = await client(base);
        if (mode === "shop") await sdk.shop.getProfile();
        else if (mode === "merchant") await sdk.merchant.getMerchantInfo();
        else if (mode === "user")
          await sdk.livestream.getItemList({ session_id: 1, offset: 0, page_size: 1 });
        else
          await sdk.principal.getClipVideoPerformance({
            start_date: "2026-01-01",
            end_date: "2026-01-02",
            timezone: "UTC",
            granularity: "day",
          });
        const url = requests[0].url;
        const identity = mode === "token" ? undefined : `${mode}_id`;
        const value = { shop: "11", merchant: "22", user: "33", token: "" }[mode];
        expect(url.searchParams.get("access_token")).toBe("local-token");
        expect(url.searchParams.get("sign")).toBe(
          signature(url, ["local-token", ...(identity ? [value] : [])])
        );
        for (const key of ["shop_id", "merchant_id", "user_id"])
          expect(url.searchParams.get(key)).toBe(key === identity ? value : null);
      })
  );
  it("rejects missing scoped identity before issuing a request", () =>
    serverTest(async (base, requests) => {
      const sdk = new ShopeeSDK({ partner_id: 7, partner_key: "local-key", base_url: base });
      await expect(sdk.merchant.getMerchantInfo()).rejects.toThrow(ShopeeSdkError);
      expect(requests).toHaveLength(0);
    }));
  it("returns flat JSON exactly without inventing a response envelope", () =>
    serverTest(async (base, requests, respond) => {
      respond((_url, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({ request_id: "flat", error: "", message: "", ip_list: ["127.0.0.1"] })
        );
      });
      const sdk = new ShopeeSDK({ partner_id: 7, partner_key: "local-key", base_url: base });
      const value = await sdk.public.getShopeeIpRanges();
      expect(value.ip_list).toEqual(["127.0.0.1"]);
      expect(value).not.toHaveProperty("response");
    }));
  it("serializes enum query arrays and request dates and deserializes response timestamps", () =>
    serverTest(async (base, requests, respond) => {
      respond((_url, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            request_id: "test",
            error: "",
            message: "",
            response: { item: [{ item_id: 1, update_time: 1700000000 }] },
          })
        );
      });
      const sdk = await client(base);
      const result = await sdk.product.getItemList({
        offset: 0,
        page_size: 2,
        item_status: ["NORMAL", "UNLIST"],
        update_time_from: new Date(1700000000000),
      });
      expect(requests[0].url.searchParams.getAll("item_status")).toEqual(["NORMAL", "UNLIST"]);
      expect(requests[0].url.searchParams.get("update_time_from")).toBe("1700000000");
      expect(result.response.item?.[0].update_time).toEqual(new Date(1700000000000));
    }));
  it("sends a real multipart file with native fetch and a generated manager", () =>
    serverTest(async (base, requests) => {
      const sdk = new ShopeeSDK({ partner_id: 7, partner_key: "local-key", base_url: base });
      await sdk.mediaSpace.uploadImage({
        image: Buffer.from("file bytes"),
        scene: "normal",
        ratio: "1:1",
      });
      expect(requests[0].headers["content-type"]).toMatch(/^multipart\/form-data; boundary=/);
      expect(requests[0].body.toString()).toContain('filename="image.bin"');
      expect(requests[0].body.toString()).toContain("file bytes");
      expect(requests[0].body.toString()).toContain('name="scene"');
    }));
  it("returns binary manager responses as Buffers and rejects HTTP errors", () =>
    serverTest(async (base, _requests, respond) => {
      const sdk = await client(base);
      respond((_url, res) => {
        res.setHeader("Content-Type", "application/pdf");
        res.end(Buffer.from("%PDF-test"));
      });
      const value = await sdk.logistics.downloadShippingDocumentJob({ job_id: "job" });
      expect(Buffer.isBuffer(value)).toBe(true);
      expect(value.toString()).toBe("%PDF-test");
      respond((_url, res) => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/pdf");
        res.end("missing");
      });
      await expect(
        sdk.logistics.downloadShippingDocumentJob({ job_id: "job" })
      ).rejects.toMatchObject({ status: 404 });
    }));
  it("refreshes once through actual HTTP and retries with the newly stored token", () =>
    serverTest(async (base, requests, respond) => {
      respond((url, res) => {
        res.setHeader("Content-Type", "application/json");
        if (url.pathname.endsWith("/auth/access_token/get"))
          res.end(
            JSON.stringify({
              access_token: "new-token",
              refresh_token: "new-refresh",
              expire_in: 3600,
              request_id: "refresh",
              error: "",
              message: "",
            })
          );
        else if (url.searchParams.get("access_token") === "local-token")
          res.end(JSON.stringify({ error: "invalid_access_token", request_id: "expired" }));
        else
          res.end(
            JSON.stringify({
              request_id: "ok",
              error: "",
              message: "",
              response: { shop_name: "local" },
            })
          );
      });
      const sdk = await client(base);
      await sdk.shop.getProfile();
      expect(requests).toHaveLength(3);
      expect(JSON.parse(requests[1].body.toString())).toEqual({
        refresh_token: "local-refresh",
        partner_id: 7,
        shop_id: 11,
      });
      expect(requests[2].url.searchParams.get("access_token")).toBe("new-token");
      expect((await sdk.getAuthToken())?.access_token).toBe("new-token");
    }));
  it("propagates API and status errors rather than accepting them as success", () =>
    serverTest(async (base, _requests, respond) => {
      const sdk = await client(base);
      respond((_url, res) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "error_param", request_id: "bad" }));
      });
      await expect(sdk.shop.getProfile()).rejects.toBeInstanceOf(ShopeeApiError);
      respond((_url, res) => {
        res.statusCode = 503;
        res.setHeader("Content-Type", "application/json");
        res.end("{}");
      });
      await expect(sdk.shop.getProfile()).rejects.toMatchObject({ status: 503 });
    }));
  it("preserves large integers through a real HTTP flat response", () =>
    serverTest(async (base, _requests, respond) => {
      respond((_url, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          '{"request_id":"large","error":"","message":"","linked_main_shop_id":9223372036854775807}'
        );
      });
      const sdk = await client(base);
      const result = await sdk.shop.getShopInfo();
      expect(result.linked_main_shop_id).toBe("9223372036854775807");
    }));
  it("bounds invalid-token retries even when the replacement token is also rejected", () =>
    serverTest(async (base, requests, respond) => {
      respond((url, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          url.pathname.endsWith("/auth/access_token/get")
            ? JSON.stringify({
                access_token: "invalid-new",
                refresh_token: "refresh",
                expire_in: 3600,
                request_id: "refresh",
                error: "",
                message: "",
              })
            : JSON.stringify({ error: "invalid_access_token", request_id: "bad" })
        );
      });
      const sdk = await client(base);
      await expect(sdk.shop.getProfile()).rejects.toBeInstanceOf(ShopeeApiError);
      expect(requests).toHaveLength(3);
    }));
  it("rejects unsafe numeric inputs and invalid dates before making requests", () =>
    serverTest(async (base, requests) => {
      const sdk = await client(base);
      await expect(
        sdk.product.getItemBaseInfo({ item_id_list: [Number.MAX_SAFE_INTEGER + 1] })
      ).rejects.toThrow("Unsafe numeric request");
      await expect(
        sdk.product.getItemList({
          offset: 0,
          page_size: 1,
          item_status: ["NORMAL"],
          update_time_from: new Date(NaN),
        })
      ).rejects.toThrow("Invalid request Date");
      expect(requests).toHaveLength(0);
    }));
  it("traverses populated and empty order pages through actual HTTP", () =>
    serverTest(async (base, requests, respond) => {
      respond((url, res) => {
        res.setHeader("Content-Type", "application/json");
        const cursor = url.searchParams.get("cursor");
        res.end(
          JSON.stringify({
            request_id: "page",
            error: "",
            message: "",
            response: {
              order_list:
                cursor === "empty" ? [] : [{ order_sn: cursor === "second" ? "SN2" : "SN1" }],
              more: cursor === "",
              next_cursor: cursor === "" ? "second" : "",
            },
          })
        );
      });
      const sdk = await client(base);
      const params = {
        time_range_field: "create_time",
        time_from: 1700000000,
        time_to: 1700001000,
        page_size: 1,
      };
      const first = await sdk.order.getOrderList({ ...params, cursor: "" });
      const second = await sdk.order.getOrderList({
        ...params,
        cursor: first.response.next_cursor,
      });
      const empty = await sdk.order.getOrderList({ ...params, cursor: "empty" });
      expect(first.response.order_list?.[0].order_sn).toBe("SN1");
      expect(second.response.order_list?.[0].order_sn).toBe("SN2");
      expect(second.response.more).toBe(false);
      expect(empty.response.order_list).toEqual([]);
      expect(requests[1].url.searchParams.get("cursor")).toBe("second");
    }));
  it("preserves large integer wire tokens without touching numbers in quoted strings", () => {
    expect(
      parseResponseJson(
        '{"id":9223372036854775807,"small":42,"text":"9223372036854775807","negative":-9223372036854775808}'
      )
    ).toEqual({
      id: "9223372036854775807",
      small: 42,
      text: "9223372036854775807",
      negative: "-9223372036854775808",
    });
    expect(() => parseResponseJson('{"id":09223372036854775807}')).toThrow();
    expect(() => parseResponseJson('{"id":1e19}')).toThrow("Unsafe numeric response");
    expect(parseResponseJson('{"value":1e3,"fraction":0.125}')).toEqual({
      value: 1000,
      fraction: 0.125,
    });
  });
});
