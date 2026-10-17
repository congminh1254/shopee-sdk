import type { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function assertTestResults(result: unknown): void {
  if (!result || typeof result !== "object") throw new Error("Invalid sandbox test report");
  const report = result as Record<string, unknown>;
  if (
    report.success !== true ||
    !Number.isSafeInteger(report.numPassedTests) ||
    (report.numPassedTests as number) < 1 ||
    report.numFailedTests !== 0
  )
    throw new Error("Sandbox run failed or executed zero passing tests");
}
export function childExitCode(code: number | null, signal: string | null): number {
  return signal || code === null ? 1 : code;
}
export function waitForTestProcess(child: EventEmitter): Promise<void> {
  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code: number | null, signal: string | null) =>
      childExitCode(code, signal) === 0
        ? resolve()
        : reject(new Error(`Sandbox Jest failed: exit ${code}, signal ${signal}`))
    );
  });
}
export async function runSandboxJest(): Promise<void> {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "shopee-sandbox-results-"));
  const results = path.join(directory, "results.json");
  try {
    const child = spawn(
      process.execPath,
      [
        path.resolve("node_modules/jest/bin/jest.js"),
        "src/__tests__/integration/",
        "--runInBand",
        "--no-coverage",
        "--json",
        `--outputFile=${results}`,
      ],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          NODE_OPTIONS: "--experimental-vm-modules",
          SHOPEE_SANDBOX_REQUIRED: "1",
        },
      }
    );
    await waitForTestProcess(child);
    if (!fs.existsSync(results))
      throw new Error("Sandbox runner did not produce current test results");
    assertTestResults(JSON.parse(fs.readFileSync(results, "utf8")));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
