import { randomUUID } from "node:crypto";
import { expect } from "@jest/globals";
import { ShopeeApiError } from "../../errors.js";

/** Fail on transport, authentication, rate-limit and server errors in negative API tests. */
export async function expectApiError(
  request: Promise<unknown>,
  expected: Record<string, RegExp>
): Promise<Record<string, unknown>> {
  const outcome = await request.then(
    () => ({ rejected: false as const }),
    (error: unknown) => ({ rejected: true as const, error })
  );
  expect(outcome.rejected).toBe(true);
  if (!outcome.rejected) throw new Error("Expected the API request to fail");
  expect(outcome.error).toBeInstanceOf(ShopeeApiError);
  const error = outcome.error as ShopeeApiError;
  expect(error.status).toBeGreaterThanOrEqual(200);
  expect(error.status).toBeLessThan(500);
  expect(error.data).toEqual(
    expect.objectContaining({ error: expect.any(String), message: expect.any(String) })
  );
  const data = error.data as Record<string, unknown>;
  const code = data.error as string;
  expect(Object.keys(expected)).toContain(code);
  expect(data.message).toMatch(expected[code]);
  return data;
}

export function testName(prefix: string): string {
  return `${prefix}${randomUUID().replaceAll("-", "").slice(0, 10)}`;
}

/** Retry read-only observations until the expected state appears. Mutations are never retried. */
export async function pollRead<T>(
  read: () => Promise<T>,
  ready: (value: T) => boolean,
  options: { attempts?: number; delayMs?: number } = {}
): Promise<T> {
  const attempts = options.attempts ?? 10;
  if (attempts < 1) throw new Error("Polling requires at least one attempt");
  for (let attempt = 0; attempt < attempts; attempt++) {
    const value = await read();
    if (ready(value)) return value;
    if (attempt + 1 < attempts)
      await new Promise((resolve) => setTimeout(resolve, options.delayMs ?? 1000));
  }
  throw new Error("Sandbox read did not reach the expected state within the polling limit");
}

/** Register cleanup before executing assertions or additional requests. Preserve both failures. */
export async function withCleanup<T>(
  id: number | string,
  run: () => Promise<T>,
  cleanup: () => Promise<unknown>
): Promise<T> {
  if (id === undefined || id === null || id === "")
    throw new Error("Missing created resource ID; refusing unrelated cleanup");
  const outcome = await Promise.resolve()
    .then(run)
    .then(
      (value) => ({ ok: true as const, value }),
      (error: unknown) => ({ ok: false as const, error })
    );
  try {
    await cleanup();
  } catch (error) {
    if (!outcome.ok)
      throw new AggregateError(
        [outcome.error, error],
        `Test and cleanup failed for resource ${id}`,
        { cause: error }
      );
    throw error;
  }
  if (!outcome.ok) throw outcome.error;
  return outcome.value;
}
