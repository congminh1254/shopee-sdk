import { jest, describe, it, expect, beforeEach, afterEach, afterAll } from "@jest/globals";
import { Agent } from "node:http";

// A plain function (not a jest.fn) keeps fetch.ts out of its "mocked node-fetch" mode,
// so it chooses between the real global fetch and node-fetch like it does in production.
const nodeFetchCalls: Array<{ url: string; init: any }> = [];
jest.unstable_mockModule("node-fetch", () => ({
  default: async (url: string, init: any) => {
    nodeFetchCalls.push({ url, init });
    return jsonResponse();
  },
  Blob: globalThis.Blob,
  File: globalThis.File,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
}));

function jsonResponse() {
  return new Response(JSON.stringify({ response: { ok: true } }), {
    headers: { "content-type": "application/json" },
  });
}

const originalFetch = globalThis.fetch;
const nativeFetch = jest.fn<(url: string, init?: any) => Promise<Response>>(async () =>
  jsonResponse()
);
globalThis.fetch = nativeFetch as unknown as typeof fetch;
const { ShopeeFetch } = await import("../fetch.js");

describe("ShopeeFetch transport selection", () => {
  const baseConfig = {
    partner_id: 1,
    partner_key: "key",
    base_url: "https://example.invalid/api/v2",
  };

  beforeEach(() => {
    nodeFetchCalls.length = 0;
    nativeFetch.mockClear();
  });

  afterEach(() => {
    globalThis.fetch = nativeFetch as unknown as typeof fetch;
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it("uses the built-in fetch when no agent is configured", async () => {
    await ShopeeFetch.fetch(baseConfig, "/public/get_shops_by_partner");
    expect(nativeFetch).toHaveBeenCalledTimes(1);
    expect(nodeFetchCalls).toHaveLength(0);
  });

  it("routes through node-fetch with the agent when one is configured", async () => {
    const agent = new Agent({ keepAlive: true });
    await ShopeeFetch.fetch({ ...baseConfig, agent }, "/public/get_shops_by_partner");
    expect(nativeFetch).not.toHaveBeenCalled();
    expect(nodeFetchCalls).toHaveLength(1);
    expect(nodeFetchCalls[0].init.agent).toBe(agent);
    agent.destroy();
  });
});
