import { jest, describe, it, expect } from "@jest/globals";
import { ShopeeSDK } from "../sdk.js";
import { InMemoryTokenStorage } from "../storage/in-memory-token-storage.js";
import { AccessToken } from "../schemas/access-token.js";

function makeToken(n: number, extra: Partial<AccessToken> = {}): AccessToken {
  return {
    access_token: `access_${n}`,
    refresh_token: `refresh_${n}`,
    expire_in: 14400,
    expired_at: Date.now() + 3_600_000,
    request_id: `req_${n}`,
    error: "",
    message: "",
    shop_id: 1001,
    ...extra,
  };
}

/** Simulates Shopee: each refresh_token can be exchanged exactly once. */
function setup() {
  const storage = new InMemoryTokenStorage();
  const sdk = new ShopeeSDK({ partner_id: 1, partner_key: "key" }, storage);
  let issued = 0;
  const used = new Set<string>();
  const getRefreshToken = jest.fn(
    async (refreshToken: string, shopId?: number): Promise<AccessToken> => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (used.has(refreshToken)) {
        throw new Error(`refresh token reused: ${refreshToken}`);
      }
      used.add(refreshToken);
      issued += 1;
      return makeToken(issued, { shop_id: shopId });
    }
  );
  sdk.auth.getRefreshToken = getRefreshToken as typeof sdk.auth.getRefreshToken;
  return { sdk, storage, getRefreshToken };
}

describe("ShopeeSDK.refreshToken concurrency", () => {
  it("shares one refresh between concurrent identical calls", async () => {
    const { sdk, storage, getRefreshToken } = setup();
    await storage.store(makeToken(0));

    const results = await Promise.all([sdk.refreshToken(), sdk.refreshToken(), sdk.refreshToken()]);

    expect(getRefreshToken).toHaveBeenCalledTimes(1);
    expect(results.map((t) => t?.access_token)).toEqual(["access_1", "access_1", "access_1"]);
    expect((await storage.get())?.refresh_token).toBe("refresh_1");
  });

  it("serializes concurrent refreshes with different arguments", async () => {
    const { sdk, storage, getRefreshToken } = setup();
    await storage.store(makeToken(0));

    const [first, second] = await Promise.all([sdk.refreshToken(), sdk.refreshToken(2002)]);

    expect(getRefreshToken).toHaveBeenCalledTimes(2);
    expect(getRefreshToken.mock.calls[0][0]).toBe("refresh_0");
    // The second refresh uses the rotated token rather than the consumed one.
    expect(getRefreshToken.mock.calls[1][0]).toBe("refresh_1");
    expect(first?.access_token).toBe("access_1");
    expect(second?.shop_id).toBe(2002);
  });

  it("lets a later refresh run after a failed one", async () => {
    const { sdk, storage, getRefreshToken } = setup();
    await storage.store(makeToken(0));
    getRefreshToken.mockRejectedValueOnce(new Error("boom"));

    await expect(Promise.all([sdk.refreshToken(), sdk.refreshToken()])).rejects.toThrow("boom");
    expect(getRefreshToken).toHaveBeenCalledTimes(1);

    await expect(sdk.refreshToken()).resolves.toMatchObject({ access_token: "access_1" });
  });
});
