import { AccessToken } from '../schemas/access-token.js';
import { TokenStorage } from './token-storage.interface.js';
export declare class CustomTokenStorage implements TokenStorage {
    private readonly tokenPath;
    private readonly defaultTokenPath;
    constructor(shopId?: number);
    store(token: AccessToken): Promise<void>;
    get(): Promise<AccessToken | null>;
    clear(): Promise<void>;
}
