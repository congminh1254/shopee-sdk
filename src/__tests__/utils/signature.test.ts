import { generateSignature } from "../../utils/signature.js";

describe("generateSignature", () => {
  it("should generate correct signature for given parameters", () => {
    const partnerKey = "test_partner_key";
    const parts = [
      "/api/v2/auth/token/get",
      "123456",
      "test_partner_id",
      "test_shop_id",
      "test_main_account_id",
    ];

    const signature = generateSignature(partnerKey, parts);
    expect(signature).toBe("37c864bd9821ff5f2c2f46b2faca14eb1811a718d1fdc6dcf383cba7c74bf9e9"); // This is a placeholder, replace with actual expected signature
  });

  it("should generate different signatures for different timestamps", () => {
    const partnerKey = "test_partner_key";
    const parts1 = ["/api/v2/auth/token/get", "123456"];
    const parts2 = ["/api/v2/auth/token/get", "123457"];

    const signature1 = generateSignature(partnerKey, parts1);
    const signature2 = generateSignature(partnerKey, parts2);

    expect(signature1).not.toBe(signature2);
  });

  it("should generate different signatures for different paths", () => {
    const partnerKey = "test_partner_key";
    const parts1 = ["/api/v2/auth/token/get", "123456"];
    const parts2 = ["/api/v2/auth/token/refresh", "123456"];

    const signature1 = generateSignature(partnerKey, parts1);
    const signature2 = generateSignature(partnerKey, parts2);

    expect(signature1).not.toBe(signature2);
  });

  it("should generate different signatures for different partner keys", () => {
    const parts = ["/api/v2/auth/token/get", "123456"];
    const signature1 = generateSignature("key1", parts);
    const signature2 = generateSignature("key2", parts);

    expect(signature1).not.toBe(signature2);
  });
});
