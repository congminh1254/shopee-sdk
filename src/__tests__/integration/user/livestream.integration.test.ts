import { beforeAll, describe, expect, it } from "@jest/globals";
import { deflateSync } from "node:zlib";
import { ShopeeSDK } from "../../../sdk.js";
import { ShopeeApiError } from "../../../errors.js";
import { requireSandboxInt } from "../../utils/env-helper.js";
import { createMainAccountSdk } from "../main-account-setup.js";

// User APIs sign with user_id. The sandbox has Livestream but no Video API (its gateway answers
// error_not_found for /video/*), so Livestream is the user surface tested here.
// Run via `npm run test:sandbox:user`.

const AUTH_ERRORS = ["error_auth", "invalid_access_token", "invalid_acceess_token", "error_sign"];

/** Calls fn and returns Shopee's error code, asserting the request got past authentication. */
async function businessErrorOf(fn: () => Promise<{ error?: string }>): Promise<string> {
  try {
    return (await fn()).error ?? "";
  } catch (error) {
    expect(error).toBeInstanceOf(ShopeeApiError);
    const code = (error as ShopeeApiError).error ?? "";
    expect(AUTH_ERRORS).not.toContain(code);
    expect((error as ShopeeApiError).apiMessage ?? "").not.toMatch(/sign|access_token|user_id/i);
    return code;
  }
}

/** A minimal 64x64 white PNG, so the upload test needs no fixture file. */
function whitePng(size = 64): Buffer {
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf: Buffer) => {
    let c = 0xffffffff;
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type: string, data: Buffer) => {
    const typed = Buffer.concat([Buffer.from(type), data]);
    const out = Buffer.alloc(12 + data.length);
    out.writeUInt32BE(data.length, 0);
    typed.copy(out, 4);
    out.writeUInt32BE(crc(typed), 8 + data.length);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // truecolour
  const rows = Buffer.alloc(size * (1 + size * 3), 255);
  for (let y = 0; y < size; y++) rows[y * (1 + size * 3)] = 0; // filter byte
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

describe("User (Livestream) sandbox integration", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    const userId = requireSandboxInt("SHOPEE_SANDBOX_USER_ID");
    sdk = await createMainAccountSdk({ user_id: userId }, "SHOPEE_SANDBOX_USER_ACCESS_TOKEN");
  });

  it("uploads a livestream image signed with user_id", async () => {
    const result = await sdk.livestream.uploadImage({
      image: { data: whitePng(), filename: "cover.png", contentType: "image/png" },
    });
    expect(result.error).toBe("");
    expect(result.response?.image_url).toMatch(/^https:\/\//);
  });

  it("reaches session endpoints with user authentication", async () => {
    // Session 1 belongs to nobody here: Shopee answers with a business error, not an auth error.
    const code = await businessErrorOf(() => sdk.livestream.getSessionDetail({ session_id: 1 }));
    expect(code).not.toBe("");
  });

  it("reaches item set endpoints with user authentication", async () => {
    await businessErrorOf(() => sdk.livestream.getItemSetList({ offset: 0, page_size: 10 }));
  });

  it("fails locally on merchant endpoints without a merchant_id", async () => {
    await expect(sdk.merchant.getMerchantInfo()).rejects.toThrow("No valid merchant_id");
  });
});
