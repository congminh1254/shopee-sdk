import fs from 'fs';
import path from 'path';
export class CustomTokenStorage {
    constructor(shopId) {
        // create a folder in the root of the project called .token
        const tokenDir = path.join(process.cwd(), '.token');
        if (!fs.existsSync(tokenDir)) {
            fs.mkdirSync(tokenDir, { recursive: true });
        }
        this.tokenPath = path.join(tokenDir, `${shopId ?? 'default'}.json`);
    }
    async store(token) {
        try {
            fs.writeFileSync(this.tokenPath, JSON.stringify(token, null, 2));
        }
        catch (error) {
            throw new Error(`Failed to store token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async get() {
        try {
            const data = fs.readFileSync(this.tokenPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return null;
            }
            throw new Error(`Failed to get token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async clear() {
        try {
            fs.unlinkSync(this.tokenPath);
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error(`Failed to clear token: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    }
}
//# sourceMappingURL=custom-token-storage.js.map