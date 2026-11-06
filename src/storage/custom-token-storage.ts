import { AccessToken } from "../schemas/access-token.js";
import { TokenStorage } from "./token-storage.interface.js";
import fs from "fs";
import path from "path";

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
 * `<cwd>/.token/`. The directory is restricted to mode 0700 and files to 0600,
 * and a `.gitignore` is written inside the directory so its contents are not
 * committed. For production deployments prefer a secrets manager or an
 * encrypted database via a custom `TokenStorage` implementation.
 */
export class CustomTokenStorage implements TokenStorage {
  private readonly tokenPath: string;
  private readonly isShop: boolean;
  private readonly defaultTokenPath: string;
  constructor(identity?: number | { user_id: number }) {
    // create a folder in the root of the project called .token
    const tokenDir = path.join(process.cwd(), ".token");
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
      writeSecureFile(this.tokenPath, JSON.stringify(token, null, 2));
      if (this.isShop && !fs.existsSync(this.defaultTokenPath)) {
        writeSecureFile(this.defaultTokenPath, JSON.stringify(token, null, 2));
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
      const data = fs.readFileSync(this.tokenPath, "utf-8");
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
      fs.unlinkSync(this.tokenPath);
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

/**
 * Write a file that only the owner can read. `mode` only applies when the file
 * is created, so an existing file is chmod-ed before it receives new content.
 */
function writeSecureFile(filePath: string, data: string): void {
  if (fs.existsSync(filePath)) {
    secureChmod(filePath, TOKEN_FILE_MODE);
  }
  fs.writeFileSync(filePath, data, { mode: TOKEN_FILE_MODE });
  secureChmod(filePath, TOKEN_FILE_MODE);
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
