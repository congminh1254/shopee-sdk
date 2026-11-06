import { AccessToken } from "../schemas/access-token.js";
import { TokenStorage } from "./token-storage.interface.js";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

/** Token directory is accessible by the owner only. */
const TOKEN_DIR_MODE = 0o700;
/** Token files are readable/writable by the owner only. */
const TOKEN_FILE_MODE = 0o600;
/** Placed inside the token directory so it is never committed to git. */
const GITIGNORE_CONTENT = "# Created by @congminh1254/shopee-sdk - contains credentials\n*\n";

/**
 * File-based token storage.
 *
 * Tokens (including the long-lived refresh_token) are written in plaintext to
 * `<cwd>/.token/` (or `options.directory`). Writes are atomic: the token is written to a
 * temporary file and renamed into place, so a crash never leaves a half-written token. The directory is restricted to mode 0700 and files to 0600,
 * and a `.gitignore` is written inside the directory so its contents are not
 * committed. For production deployments prefer a secrets manager or an
 * encrypted database via a custom `TokenStorage` implementation.
 */
export class CustomTokenStorage implements TokenStorage {
  private readonly tokenPath: string;
  private readonly isShop: boolean;
  private readonly defaultTokenPath: string;
  constructor(identity?: number | { user_id: number }, options: { directory?: string } = {}) {
    // Defaults to a folder called .token in the current working directory.
    const tokenDir = options.directory
      ? path.resolve(options.directory)
      : path.join(process.cwd(), ".token");
    if (!fs.existsSync(tokenDir)) {
      fs.mkdirSync(tokenDir, { recursive: true, mode: TOKEN_DIR_MODE });
    }
    // mkdir's mode is subject to umask and is not applied to an existing
    // directory, so tighten it explicitly (also migrates older installs).
    secureChmod(tokenDir, TOKEN_DIR_MODE);
    ensureGitignore(tokenDir);

    this.defaultTokenPath = path.join(tokenDir, "default.json");
    this.isShop = typeof identity === "number";
    const key = typeof identity === "object" ? `user-${identity.user_id}` : (identity ?? "default");
    this.tokenPath = path.join(tokenDir, `${key}.json`);

    // Migrate token files written by older versions with permissive modes.
    for (const file of [this.tokenPath, this.defaultTokenPath]) {
      if (fs.existsSync(file)) {
        secureChmod(file, TOKEN_FILE_MODE);
      }
    }
  }

  public async store(token: AccessToken): Promise<void> {
    try {
      const data = JSON.stringify(token, null, 2);
      await writeSecureFile(this.tokenPath, data);
      if (this.isShop && !(await fileExists(this.defaultTokenPath))) {
        await writeSecureFile(this.defaultTokenPath, data);
      }
    } catch (error) {
      throw new Error(
        `Failed to store token: ${error instanceof Error ? error.message : "Unknown error"}`,
        { cause: error }
      );
    }
  }

  public async get(): Promise<AccessToken | null> {
    try {
      const data = await fs.promises.readFile(this.tokenPath, "utf-8");
      return JSON.parse(data) as AccessToken;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      throw new Error(
        `Failed to get token: ${error instanceof Error ? error.message : "Unknown error"}`,
        { cause: error }
      );
    }
  }

  public async clear(): Promise<void> {
    try {
      await fs.promises.unlink(this.tokenPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw new Error(
          `Failed to clear token: ${error instanceof Error ? error.message : "Unknown error"}`,
          { cause: error }
        );
      }
    }
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Atomically write a file that only the owner can read: the data goes to a temporary file
 * in the same directory (created with mode 0600) which is then renamed over the target.
 */
async function writeSecureFile(filePath: string, data: string): Promise<void> {
  const temporary = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await fs.promises.writeFile(temporary, data, { mode: TOKEN_FILE_MODE, flag: "wx" });
    // `mode` is subject to umask, so tighten it explicitly before the file becomes visible.
    if (process.platform !== "win32") {
      await fs.promises.chmod(temporary, TOKEN_FILE_MODE);
    }
    await fs.promises.rename(temporary, filePath);
  } catch (error) {
    await fs.promises.rm(temporary, { force: true }).catch(() => undefined);
    throw error;
  }
}

/** chmod is a no-op for POSIX permission bits on Windows, so skip it there. */
function secureChmod(target: string, mode: number): void {
  if (process.platform === "win32") return;
  fs.chmodSync(target, mode);
}

function ensureGitignore(tokenDir: string): void {
  const gitignorePath = path.join(tokenDir, ".gitignore");
  if (fs.existsSync(gitignorePath)) return;
  try {
    fs.writeFileSync(gitignorePath, GITIGNORE_CONTENT, { mode: 0o644 });
  } catch {
    // Best effort: failing to write .gitignore must not block token storage.
  }
}
