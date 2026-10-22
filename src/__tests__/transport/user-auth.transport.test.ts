import { afterAll, beforeAll, beforeEach, describe, expect, it } from "@jest/globals";
import { createServer, Server } from "node:http";
import { AddressInfo } from "node:net";
import { createHmac } from "node:crypto";
import { ShopeeSDK } from "../../sdk.js";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import { ShopeeFetch } from "../../fetch.js";
import { AccessToken } from "../../schemas/access-token.js";

// Simulated gateway: validates SDK transport/signatures locally, not live Shopee behavior.
describe("User authentication transport against a simulated gateway", () => {
  let server: Server;
  let sdk: ShopeeSDK;
  let storage: InMemoryTokenStorage;
  let baseUrl: string;
  let requests: { url: URL; body: Record<string, unknown> }[];
  let rejectVideo: boolean;
  let alwaysReject: boolean;
  let users: number[];
  const partnerKey = "integration-partner-key";

  beforeAll(async () => {
    server = createServer(async (req, res) => {
      const url = new URL(req.url!, "http://localhost");
      let rawBody = "";
      for await (const chunk of req) rawBody += chunk;
      const body = rawBody ? JSON.parse(rawBody) : {};
      requests.push({ url, body });
      const q = url.searchParams;
      const userEndpoint =
        url.pathname.includes("/video/") || url.pathname.includes("/livestream/");
      const authenticated = userEndpoint || url.pathname.includes("/shop/");
      const identityKey = q.has("user_id") ? "user_id" : "shop_id";
      const base =
        `${q.get("partner_id")}${url.pathname}${q.get("timestamp")}` +
        (authenticated ? `${q.get("access_token")}${q.get(identityKey)}` : "");
      const signature = createHmac("sha256", partnerKey).update(base).digest("hex");
      res.setHeader("Content-Type", "application/json");
      if (q.get("sign") !== signature) {
        res.end(JSON.stringify({ error: "error_sign", message: "Wrong sign" }));
      } else if (url.pathname.endsWith("/auth/token/get")) {
        res.end(
          JSON.stringify({
            access_token: "initial",
            refresh_token: "refresh-1",
            expire_in: 14400,
            user_id_list: users,
          })
        );
      } else if (url.pathname.endsWith("/auth/access_token/get")) {
        res.end(
          JSON.stringify({
            access_token: "renewed",
            refresh_token: "refresh-2",
            expire_in: 14400,
            user_id: body.user_id,
          })
        );
      } else if (userEndpoint && (!q.has("user_id") || q.has("shop_id"))) {
        res.end(JSON.stringify({ error: "error_param", message: "Expected user_id only" }));
      } else if (authenticated && (rejectVideo || alwaysReject)) {
        rejectVideo = false;
        res.end(JSON.stringify({ error: "invalid_access_token", message: "Expired" }));
      } else {
        res.end(
          JSON.stringify({
            error: "",
            message: "",
            request_id: "local-gateway",
            response: { total_count: 0, has_more: false },
          })
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
    rejectVideo = false;
    alwaysReject = false;
    users = [123];
    storage = new InMemoryTokenStorage();
    sdk = new ShopeeSDK({ partner_id: 42, partner_key: partnerKey, base_url: baseUrl }, storage);
  });

  const getVideos = () => sdk.video.getVideoList({ page_no: 1, page_size: 20, list_type: [2] });

  it("exchanges a user code and signs a video request with the returned user", async () => {
    const token = await sdk.authenticateWithCode("user-code");
    expect(token?.user_id).toBe(123);
    expect(token?.user_id_list).toEqual([123]);
    expect(requests[0].body).toEqual({ code: "user-code", partner_id: 42 });
    expect((await getVideos()).error).toBe("");
    expect(requests[1].url.searchParams.get("user_id")).toBe("123");
    expect(requests[1].url.searchParams.has("shop_id")).toBe(false);
  });

  it("uses the token identity even if conflicting query identities are supplied", async () => {
    await sdk.authenticateWithCode("user-code");
    await ShopeeFetch.fetch(sdk.getConfig(), "/video/get_video_list", {
      auth: "user",
      params: { user_id: 456, shop_id: 999, page_no: 1, page_size: 1, list_type: [2] },
    });
    expect(requests[1].url.searchParams.get("user_id")).toBe("123");
    expect(requests[1].url.searchParams.has("shop_id")).toBe(false);
  });

  it("selects an explicitly authorized user from multiple returned identities", async () => {
    users = [123, 456];
    await sdk.authenticateWithCode("user-code", undefined, undefined, 456);
    await getVideos();
    expect(requests[1].url.searchParams.get("user_id")).toBe("456");
  });

  it("rejects an identity absent from the authorization response", async () => {
    await expect(sdk.authenticateWithCode("user-code", undefined, undefined, 456)).rejects.toThrow(
      "not authorized"
    );
    expect(await storage.get()).toBeNull();
  });

  it("does not choose an arbitrary user from a multi-user grant", async () => {
    users = [123, 456];
    await sdk.authenticateWithCode("user-code");
    await expect(getVideos()).rejects.toThrow("user_id");
    expect(requests).toHaveLength(1);
  });

  it("refreshes an expired user token without a shop identity and persists rotation", async () => {
    await sdk.authenticateWithCode("user-code");
    const token = (await storage.get())!;
    await storage.store({ ...token, expired_at: Date.now() - 1 });
    await getVideos();
    expect(requests[1].body).toEqual({ partner_id: 42, refresh_token: "refresh-1", user_id: 123 });
    expect(requests[2].url.searchParams.get("access_token")).toBe("renewed");
    expect(await storage.get()).toMatchObject({ user_id: 123, refresh_token: "refresh-2" });
  });

  it("retries an API token rejection with user authentication", async () => {
    await sdk.authenticateWithCode("user-code");
    rejectVideo = true;
    expect((await getVideos()).error).toBe("");
    expect(requests.map((r) => r.url.pathname)).toEqual([
      "/api/v2/auth/token/get",
      "/api/v2/video/get_video_list",
      "/api/v2/auth/access_token/get",
      "/api/v2/video/get_video_list",
    ]);
    expect(requests[2].body.user_id).toBe(123);
    expect(requests[3].url.searchParams.get("access_token")).toBe("renewed");
  });

  it("bounds retries when the API continues rejecting the token", async () => {
    await sdk.authenticateWithCode("user-code");
    alwaysReject = true;
    await expect(getVideos()).rejects.toThrow();
    expect(requests).toHaveLength(4);
  });

  it("signs livestream calls with the same user identity", async () => {
    await sdk.authenticateWithCode("user-code");
    expect((await sdk.livestream.getSessionDetail({ session_id: 1 })).error).toBe("");
    expect(requests[1].url.searchParams.get("user_id")).toBe("123");
  });

  it("fails locally for a shop token used on a user endpoint", async () => {
    await storage.store({
      access_token: "shop-token",
      refresh_token: "shop-refresh",
      shop_id: 999,
    } as AccessToken);
    await expect(getVideos()).rejects.toThrow("user_id");
    expect(requests).toHaveLength(0);
  });

  it("preserves shop request signatures and shop_id", async () => {
    await storage.store({
      access_token: "shop-token",
      refresh_token: "shop-refresh",
      shop_id: 999,
    } as AccessToken);
    expect((await sdk.shop.getShopInfo()).error).toBe("");
    expect(requests[0].url.searchParams.get("shop_id")).toBe("999");
    expect(requests[0].url.searchParams.has("user_id")).toBe(false);
  });

  it.each([-1, 1.5, Number.NaN])(
    "rejects invalid selected user %s before code exchange",
    async (userId) => {
      await expect(
        sdk.authenticateWithCode("user-code", undefined, undefined, userId)
      ).rejects.toThrow("Invalid user_id");
      expect(requests).toHaveLength(0);
    }
  );

  it("rejects mixing user and shop identities on refresh", async () => {
    await sdk.authenticateWithCode("user-code");
    await expect(sdk.refreshToken(999, undefined, 123)).rejects.toThrow("separately");
    expect(requests).toHaveLength(1);
  });
});
