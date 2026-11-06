import { describe, it, expect, afterEach } from "@jest/globals";
import fs from "fs";
import os from "os";
import path from "path";
import { CustomTokenStorage } from "../../storage/custom-token-storage.js";
import { AccessToken } from "../../schemas/access-token.js";

const dirs: string[] = [];
function tempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "shopee-sdk-tokens-"));
  dirs.push(dir);
  return path.join(dir, "nested", "tokens");
}

afterEach(() => {
  for (const dir of dirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

const token = (n: number) =>
  ({ access_token: `a${n}`, refresh_token: `r${n}`, shop_id: 7 }) as AccessToken;

describe("CustomTokenStorage options", () => {
  it("stores tokens in a custom directory", async () => {
    const directory = tempDir();
    const storage = new CustomTokenStorage(7, { directory });
    await storage.store(token(1));

    expect(JSON.parse(fs.readFileSync(path.join(directory, "7.json"), "utf8"))).toEqual(token(1));
    expect(fs.existsSync(path.join(directory, "default.json"))).toBe(true);
    expect(fs.existsSync(path.join(directory, ".gitignore"))).toBe(true);
    expect(await new CustomTokenStorage(7, { directory }).get()).toEqual(token(1));
  });

  it("writes atomically and leaves no temporary files behind", async () => {
    const directory = tempDir();
    const storage = new CustomTokenStorage(7, { directory });
    await Promise.all([1, 2, 3, 4, 5].map((n) => storage.store(token(n))));

    const files = fs.readdirSync(directory).sort();
    expect(files).toEqual([".gitignore", "7.json", "default.json"]);
    // Whichever write landed last, the file holds one complete token.
    const stored = JSON.parse(fs.readFileSync(path.join(directory, "7.json"), "utf8"));
    expect(stored.access_token).toMatch(/^a[1-5]$/);
  });

  const posixIt = process.platform === "win32" ? it.skip : it;
  posixIt("keeps token files owner-only", async () => {
    const directory = tempDir();
    const storage = new CustomTokenStorage(7, { directory });
    await storage.store(token(1));
    await storage.store(token(2));
    expect(fs.statSync(path.join(directory, "7.json")).mode & 0o777).toBe(0o600);
    expect(fs.statSync(directory).mode & 0o777).toBe(0o700);
  });
});
