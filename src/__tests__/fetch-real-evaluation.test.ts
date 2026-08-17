import { describe, it, expect } from "@jest/globals";

describe("ShopeeFetch Module Real Evaluation", () => {
  it("should evaluate module without mock node-fetch", async () => {
    const { ShopeeFetch } = await import("../fetch.js");
    expect(ShopeeFetch).toBeDefined();
    expect(typeof ShopeeFetch.fetch).toBe("function");
  });

  it("should cover fallback branches when globalThis fetch classes are undefined", async () => {
    const originalFetch = globalThis.fetch;
    const originalFormData = globalThis.FormData;
    const originalFile = globalThis.File;
    const originalHeaders = globalThis.Headers;

    try {
      // Temporarily remove global fetch APIs to trigger the fallback to node-fetch classes
      Object.defineProperty(globalThis, "fetch", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "FormData", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "File", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "Headers", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      // Use a dynamic variable path to bypass TypeScript compile-time path check
      const importPath = "../fetch.js?fallback=true";
      const module = await import(importPath);
      const fallbackFetch = module.ShopeeFetch;
      expect(fallbackFetch).toBeDefined();
    } finally {
      // Always restore global fetch APIs
      Object.defineProperty(globalThis, "fetch", {
        value: originalFetch,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "FormData", {
        value: originalFormData,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "File", {
        value: originalFile,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, "Headers", {
        value: originalHeaders,
        writable: true,
        configurable: true,
      });
    }
  });
});
