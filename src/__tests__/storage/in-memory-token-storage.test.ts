import { describe, it, expect } from "@jest/globals";
import { InMemoryTokenStorage } from "../../storage/in-memory-token-storage.js";
import { AccessToken } from "../../schemas/access-token.js";

describe("InMemoryTokenStorage", () => {
  it("should store, get and clear token correctly", async () => {
    const storage = new InMemoryTokenStorage();

    // Initially should be null
    let token = await storage.get();
    expect(token).toBeNull();

    // Store a token
    const testToken: AccessToken = {
      access_token: "test_access_token",
      refresh_token: "test_refresh_token",
      expire_in: 3600,
      request_id: "req_id",
      error: "",
      message: "",
      expired_at: Date.now() + 3600000,
      shop_id: 12345,
    };
    await storage.store(testToken);

    // Retrieve token
    token = await storage.get();
    expect(token).toEqual(testToken);

    // Clear token
    await storage.clear();
    token = await storage.get();
    expect(token).toBeNull();
  });
});
