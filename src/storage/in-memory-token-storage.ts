import { AccessToken } from "../schemas/access-token.js";
import { TokenStorage } from "./token-storage.interface.js";

export class InMemoryTokenStorage implements TokenStorage {
  private token: AccessToken | null = null;

  public async store(token: AccessToken): Promise<void> {
    this.token = token;
  }

  public async get(): Promise<AccessToken | null> {
    return this.token;
  }

  public async clear(): Promise<void> {
    this.token = null;
  }
}
