import { AccessToken } from "../schemas/access-token.js";
import { TokenStorage } from "./token-storage.interface.js";
import fs from "fs";
import path from "path";

export class CustomTokenStorage implements TokenStorage {
  private readonly tokenPath: string;
  private readonly defaultTokenPath: string;
  constructor(shopId?: number) {
    // create a folder in the root of the project called .token
    const tokenDir = path.join(process.cwd(), ".token");
    if (!fs.existsSync(tokenDir)) {
      fs.mkdirSync(tokenDir, { recursive: true });
    }
    this.defaultTokenPath = path.join(tokenDir, "default.json");
    this.tokenPath = path.join(tokenDir, `${shopId ?? "default"}.json`);
  }

  public async store(token: AccessToken): Promise<void> {
    try {
      fs.writeFileSync(this.tokenPath, JSON.stringify(token, null, 2));
      if (this.defaultTokenPath !== this.tokenPath && !fs.existsSync(this.defaultTokenPath)) {
        fs.writeFileSync(this.defaultTokenPath, JSON.stringify(token, null, 2));
      }
    } catch (error) {
      throw new Error(
        `Failed to store token: ${error instanceof Error ? error.message : "Unknown error"}`
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
        `Failed to get token: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  public async clear(): Promise<void> {
    try {
      fs.unlinkSync(this.tokenPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw new Error(
          `Failed to clear token: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }
  }
}
