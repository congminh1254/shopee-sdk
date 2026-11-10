import { afterAll, beforeAll, beforeEach, describe, expect, it } from "@jest/globals";
import { createServer, Server } from "node:http";
import { AddressInfo } from "node:net";
import { createHmac } from "node:crypto";
import { ShopeeSDK } from "../../sdk.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import { AccessToken } from "../../schemas/access-token.js";

// Real HTTP transport with an independent gateway signature check; no Shopee credentials needed.
// Shopee's Merchant APIs (merchant, global_product) use merchant_id as the common identity
// parameter and Principal APIs use principal_id, both in the query and in the sign base string.
describe("Merchant and principal authentication through the HTTP transport", () => {
  let server: Server;
  let sdk: ShopeeSDK;
  let storage: InMemoryTokenStorage;
  let baseUrl: string;
  let requests: { url: URL; body: Record<string, unknown> }[];
  let rejectOnce: boolean;
  let merchants: number[];
  let principals: number[];
  const partnerKey = "integration-partner-key";

  const identityFor = (pathname: string) =>
    pathname.includes("/merchant/") || pathname.includes("/global_product/")
      ? "merchant_id"
      : pathname.includes("/principal/")
        ? "principal_id"
        : pathname.includes("/shop/")
          ? "shop_id"
          : undefined;

  beforeAll(async () => {
    server = createServer(async (req, res) => {
      const url = new URL(req.url!, "http://localhost");
      let rawBody = "";
      for await (const chunk of req) rawBody += chunk;
      const body = rawBody ? JSON.parse(rawBody) : {};
      requests.push({ url, body });
      const q = url.searchParams;
      const identityKey = identityFor(url.pathname);
      const base =
        `${q.get("partner_id")}${url.pathname}${q.get("timestamp")}` +
        (identityKey ? `${q.get("access_token")}${q.get(identityKey)}` : "");
      const signature = createHmac("sha256", partnerKey).update(base).digest("hex");
      res.setHeader("Content-Type", "application/json");
      if (identityKey && !q.has(identityKey)) {
        res.end(JSON.stringify({ error: "error_param", message: `Missing ${identityKey}` }));
      } else if (q.get("sign") !== signature) {
        res.end(JSON.stringify({ error: "error_sign", message: "Wrong sign" }));
      } else if (url.pathname.endsWith("/auth/token/get")) {
        res.end(
          JSON.stringify({
            access_token: "initial",
            refresh_token: "refresh-1",
            expire_in: 14400,
            merchant_id_list: merchants,
            principal_id_list: principals,
            shop_id_list: [999],
          })
        );
      } else if (url.pathname.endsWith("/auth/access_token/get")) {
        res.end(
          JSON.stringify({
            access_token: "renewed",
            refresh_token: "refresh-2",
            expire_in: 14400,
            merchant_id: body.merchant_id,
            principal_id: body.principal_id,
          })
        );
      } else if (identityKey && rejectOnce) {
        rejectOnce = false;
        res.end(JSON.stringify({ error: "invalid_access_token", message: "Expired" }));
      } else {
        res.end(
          JSON.stringify({ error: "", message: "", request_id: "local-gateway", response: {} })
        );
      }
    });
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/v2`;
  });

  afterAll(async () => {
    if (server?.listening) await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    requests = [];
    rejectOnce = false;
    merchants = [555];
    principals = [];
    storage = new InMemoryTokenStorage();
    sdk = new ShopeeSDK({ partner_id: 42, partner_key: partnerKey, base_url: baseUrl }, storage);
  });

  const getMerchantInfo = () => sdk.merchant.getMerchantInfo();
  const getPrincipalPerformance = () =>
    sdk.principal.getPrincipalAffiliatePerformance({
      start_date: "2026-01-01",
      end_date: "2026-01-02",
      timezone: "UTC",
      granularity: "day",
    });

  it("selects the only merchant of a main-account grant and signs merchant calls with it", async () => {
    const token = await sdk.authenticateWithCode("main-code", undefined, 777);
    expect(requests[0].body).toEqual({ code: "main-code", partner_id: 42, main_account_id: 777 });
    expect(token?.merchant_id).toBe(555);
    expect(token?.shop_id).toBeUndefined();
    expect((await getMerchantInfo()).error).toBe("");
    expect(requests[1].url.searchParams.get("merchant_id")).toBe("555");
    expect(requests[1].url.searchParams.has("shop_id")).toBe(false);
  });

  it("signs global product calls with merchant_id and keeps a shop_id request parameter", async () => {
    await sdk.authenticateWithCode("main-code", undefined, 777);
    const response = await sdk.globalProduct.getGlobalItemId({ shop_id: 999, item_id_list: [1] });
    expect(response.error).toBe("");
    expect(requests[1].url.searchParams.get("merchant_id")).toBe("555");
    expect(requests[1].url.searchParams.get("shop_id")).toBe("999");
  });

  it("signs each API type with its own identity when the token holds several", async () => {
    await storage.store({
      access_token: "main-token",
      refresh_token: "main-refresh",
      shop_id: 999,
      merchant_id: 555,
    } as AccessToken);
    expect((await sdk.shop.getShopInfo()).error).toBe("");
    expect((await getMerchantInfo()).error).toBe("");
    expect(requests[0].url.searchParams.get("shop_id")).toBe("999");
    expect(requests[0].url.searchParams.has("merchant_id")).toBe(false);
    expect(requests[1].url.searchParams.get("merchant_id")).toBe("555");
    expect(requests[1].url.searchParams.has("shop_id")).toBe(false);
  });

  it("does not choose an arbitrary merchant from a multi-merchant grant", async () => {
    merchants = [555, 556];
    const token = await sdk.authenticateWithCode("main-code", undefined, 777);
    expect(token?.merchant_id).toBeUndefined();
    await expect(getMerchantInfo()).rejects.toThrow("No valid merchant_id found on access token");
    expect(requests).toHaveLength(1);
  });

  it("selects a merchant from a multi-merchant grant by refreshing for it", async () => {
    merchants = [555, 556];
    await sdk.authenticateWithCode("main-code", undefined, 777);
    const token = await sdk.refreshToken(undefined, 556);
    expect(requests[1].body).toEqual({
      partner_id: 42,
      refresh_token: "refresh-1",
      merchant_id: 556,
    });
    expect(token?.merchant_id).toBe(556);
    await getMerchantInfo();
    expect(requests[2].url.searchParams.get("merchant_id")).toBe("556");
  });

  it("fails locally for a shop token used on a merchant endpoint", async () => {
    await storage.store({
      access_token: "shop-token",
      refresh_token: "shop-refresh",
      shop_id: 999,
    } as AccessToken);
    await expect(getMerchantInfo()).rejects.toThrow("merchant_id");
    expect(requests).toHaveLength(0);
  });

  it("refreshes an expired merchant token for the merchant and persists it", async () => {
    await sdk.authenticateWithCode("main-code", undefined, 777);
    const token = (await storage.get())!;
    await storage.store({ ...token, expired_at: Date.now() - 1 });
    expect((await getMerchantInfo()).error).toBe("");
    expect(requests[1].body).toEqual({
      partner_id: 42,
      refresh_token: "refresh-1",
      merchant_id: 555,
    });
    expect(requests[2].url.searchParams.get("access_token")).toBe("renewed");
    expect(await storage.get()).toMatchObject({ merchant_id: 555, refresh_token: "refresh-2" });
  });

  it("retries a merchant call after a token rejection by refreshing the merchant", async () => {
    await sdk.authenticateWithCode("main-code", undefined, 777);
    rejectOnce = true;
    expect((await getMerchantInfo()).error).toBe("");
    expect(requests.map((r) => r.url.pathname)).toEqual([
      "/api/v2/auth/token/get",
      "/api/v2/merchant/get_merchant_info",
      "/api/v2/auth/access_token/get",
      "/api/v2/merchant/get_merchant_info",
    ]);
    expect(requests[2].body).toEqual({
      partner_id: 42,
      refresh_token: "refresh-1",
      merchant_id: 555,
    });
    expect(requests[3].url.searchParams.get("merchant_id")).toBe("555");
  });

  it("signs principal calls with principal_id and refreshes the principal", async () => {
    merchants = [];
    principals = [888];
    const token = await sdk.authenticateWithCode("main-code", undefined, 777);
    expect(token?.principal_id).toBe(888);
    expect((await getPrincipalPerformance()).error).toBe("");
    expect(requests[1].url.searchParams.get("principal_id")).toBe("888");
    expect(requests[1].url.searchParams.has("shop_id")).toBe(false);

    await storage.store({ ...(await storage.get())!, expired_at: Date.now() - 1 });
    await getPrincipalPerformance();
    expect(requests[2].body).toEqual({
      partner_id: 42,
      refresh_token: "refresh-1",
      principal_id: 888,
    });
    expect(await storage.get()).toMatchObject({ principal_id: 888, refresh_token: "refresh-2" });
  });

  it("rejects mixing principal and other identities on refresh", async () => {
    await sdk.authenticateWithCode("main-code", undefined, 777);
    await expect(sdk.refreshToken(999, undefined, undefined, 888)).rejects.toThrow("separately");
    expect(requests).toHaveLength(1);
  });

  it.each([-1, 1.5])("rejects invalid merchant_id %s before refresh", async (merchantId) => {
    await sdk.authenticateWithCode("main-code", undefined, 777);
    await expect(sdk.refreshToken(undefined, merchantId)).rejects.toThrow("Invalid merchant_id");
    expect(requests).toHaveLength(1);
  });
});
