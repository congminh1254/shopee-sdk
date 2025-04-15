import { AccessToken } from '../schemas/access-token.js';
export interface TokenStorage {
    store(token: AccessToken): Promise<void>;
    get(): Promise<AccessToken | null>;
    clear(): Promise<void>;
}
