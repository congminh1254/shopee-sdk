import { describe, it, expect, jest } from "@jest/globals";
import { EventEmitter } from "node:events";
import { childExitCode, assertTestResults, waitForTestProcess } from "./sandbox-runner.js";
import { getSandboxConfig, validateSandboxEnv } from "./env-helper.js";
import { pollRead, withCleanup, testName, expectApiError } from "./sandbox-fixtures.js";
import { setupIntegrationTest } from "../integration/setup.js";
import { ShopeeApiError } from "../../errors.js";

describe("sandbox harness", () => {
  it("accepts the expected API validation error with its matching message", async () => {
    const data = { error: "error_param", message: "Invalid order_sn" };
    await expect(
      expectApiError(Promise.reject(new ShopeeApiError(400, data)), { error_param: /order_sn/ })
    ).resolves.toEqual(data);
  });
  it.each([
    new Error("network failed"),
    new ShopeeApiError(401, { error: "error_auth", message: "Invalid token" }),
    new ShopeeApiError(429, { error: "error_rate_limit", message: "Too many requests" }),
    new ShopeeApiError(503, { error: "error_param", message: "Invalid order_sn" }),
    new ShopeeApiError(400, { error: "error_param", message: "Invalid partner_id" }),
  ])("rejects unrelated failures in negative API assertions: %s", async (error) => {
    await expect(
      expectApiError(Promise.reject(error), { error_param: /order_sn/ })
    ).rejects.toThrow();
  });
  it("rejects unexpected successful requests in negative API assertions", async () => {
    await expect(
      expectApiError(Promise.resolve({ request_id: "success" }), { error_param: /order_sn/ })
    ).rejects.toThrow();
  });
  it("rejects null exit statuses and signals, and preserves ordinary failure codes", () => {
    expect(childExitCode(null, null)).toBe(1);
    expect(childExitCode(0, "SIGTERM")).toBe(1);
    expect(childExitCode(7, null)).toBe(7);
    expect(childExitCode(0, null)).toBe(0);
  });
  it.each([
    {},
    { success: true },
    { success: true, numPassedTests: "1", numFailedTests: 0 },
    { success: true, numPassedTests: 1, numFailedTests: null },
    { success: true, numPassedTests: 0, numFailedTests: 0 },
    { success: false, numPassedTests: 1, numFailedTests: 0 },
    { success: true, numPassedTests: 1, numFailedTests: 1 },
  ])("rejects incomplete runner outcomes %j", (result) =>
    expect(() => assertTestResults(result)).toThrow()
  );
  it("rejects spawn errors and terminated child processes", async () => {
    const failed = new EventEmitter();
    const failure = waitForTestProcess(failed);
    failed.emit("error", new Error("spawn failed"));
    await expect(failure).rejects.toThrow("spawn failed");
    const terminated = new EventEmitter();
    const termination = waitForTestProcess(terminated);
    terminated.emit("close", null, "SIGTERM");
    await expect(termination).rejects.toThrow("SIGTERM");
  });
  it("accepts current successful test results", () =>
    expect(() =>
      assertTestResults({ success: true, numPassedTests: 1, numFailedTests: 0 })
    ).not.toThrow());
  it("parses numeric identity configuration strictly and supports injected tokens without browser credentials", () => {
    const keys = [
      "SHOPEE_SANDBOX_PARTNER_ID",
      "SHOPEE_SANDBOX_PARTNER_KEY",
      "SHOPEE_SANDBOX_ACCESS_TOKEN",
      "SHOPEE_SANDBOX_ACCOUNT",
      "SHOPEE_SANDBOX_PASSWORD",
    ];
    const original = keys.map((key) => process.env[key]);
    try {
      process.env.SHOPEE_SANDBOX_PARTNER_ID = "12junk";
      expect(getSandboxConfig().partner_id).toBeUndefined();
      process.env.SHOPEE_SANDBOX_PARTNER_ID = "12";
      process.env.SHOPEE_SANDBOX_PARTNER_KEY = "test";
      process.env.SHOPEE_SANDBOX_ACCESS_TOKEN = "test";
      delete process.env.SHOPEE_SANDBOX_ACCOUNT;
      delete process.env.SHOPEE_SANDBOX_PASSWORD;
      expect(() => validateSandboxEnv()).not.toThrow();
    } finally {
      keys.forEach((key, index) =>
        original[index] === undefined
          ? delete process.env[key]
          : (process.env[key] = original[index])
      );
    }
  });
  it("records real skips for missing credentials, fails explicit requests, and keeps mutations opt-in", () => {
    const keys = [
      "SHOPEE_SANDBOX_PARTNER_ID",
      "SHOPEE_SANDBOX_REQUIRED",
      "SHOPEE_SANDBOX_ALLOW_MUTATIONS",
    ];
    const original = keys.map((key) => process.env[key]);
    try {
      delete process.env.SHOPEE_SANDBOX_PARTNER_ID;
      delete process.env.SHOPEE_SANDBOX_REQUIRED;
      delete process.env.SHOPEE_SANDBOX_ALLOW_MUTATIONS;
      expect(setupIntegrationTest().runTests).toBe(false);
      process.env.SHOPEE_SANDBOX_REQUIRED = "1";
      expect(() => setupIntegrationTest()).toThrow();
      expect(setupIntegrationTest({ mutates: true }).runTests).toBe(false);
    } finally {
      keys.forEach((key, index) =>
        original[index] === undefined
          ? delete process.env[key]
          : (process.env[key] = original[index])
      );
    }
  });
  it("polls observations without retrying mutations and fails when state never appears", async () => {
    const read = jest.fn<() => Promise<number>>().mockResolvedValueOnce(0).mockResolvedValueOnce(1);
    expect(await pollRead(read, (value) => value === 1, { attempts: 2, delayMs: 0 })).toBe(1);
    expect(read).toHaveBeenCalledTimes(2);
    await expect(
      pollRead(
        async () => 0,
        (value) => value === 1,
        { attempts: 2, delayMs: 0 }
      )
    ).rejects.toThrow();
  });
  it("cleans a created resource on assertion failure and preserves both cleanup and test errors", async () => {
    const cleanup = jest.fn<() => Promise<void>>().mockResolvedValue();
    await expect(
      withCleanup(
        "own-id",
        async () => {
          throw new Error("assertion");
        },
        cleanup
      )
    ).rejects.toThrow("assertion");
    expect(cleanup).toHaveBeenCalledTimes(1);
    await expect(
      withCleanup(
        "own-id",
        async () => {
          throw new Error("assertion");
        },
        async () => {
          throw new Error("cleanup");
        }
      )
    ).rejects.toBeInstanceOf(AggregateError);
    expect(testName("test")).not.toBe(testName("test"));
  });
});
