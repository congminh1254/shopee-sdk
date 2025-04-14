import { ShopeeConfig } from '../sdk.js';
import { ShopeeFetch } from '../fetch.js';
import { SetAppPushConfigParams, SetAppPushConfigResponse, GetAppPushConfigResponse } from '../schemas/push.js';
import { BaseManager } from './base.manager.js';

export class PushManager extends BaseManager {
    constructor(config: ShopeeConfig) {
        super(config);
    }

    public async setAppPushConfig(params: SetAppPushConfigParams): Promise<SetAppPushConfigResponse> {
        const response = await ShopeeFetch.fetch<SetAppPushConfigResponse>(
            this.config,
            '/push/set_app_push_config',
            {
                method: 'POST',
                body: params as Record<string, string | number | boolean>
            }
        );

        return response;
    }

    public async getAppPushConfig(): Promise<GetAppPushConfigResponse> {
        const response = await ShopeeFetch.fetch<GetAppPushConfigResponse>(
            this.config,
            '/push/get_app_push_config',
            {
                method: 'GET',
            }
        );

        return response;
    }
}