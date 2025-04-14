import { ShopeeFetch } from '../fetch.js';
import { BaseManager } from './base.manager.js';
export class PushManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    async setAppPushConfig(params) {
        const response = await ShopeeFetch.fetch(this.config, '/push/set_app_push_config', {
            method: 'POST',
            body: params
        });
        return response;
    }
    async getAppPushConfig() {
        const response = await ShopeeFetch.fetch(this.config, '/push/get_app_push_config', {
            method: 'GET',
        });
        return response;
    }
}
//# sourceMappingURL=push.manager.js.map