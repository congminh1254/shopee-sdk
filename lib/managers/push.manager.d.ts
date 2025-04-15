import { ShopeeConfig } from '../sdk.js';
import { SetAppPushConfigParams, SetAppPushConfigResponse, GetAppPushConfigResponse } from '../schemas/push.js';
import { BaseManager } from './base.manager.js';
export declare class PushManager extends BaseManager {
    constructor(config: ShopeeConfig);
    setAppPushConfig(params: SetAppPushConfigParams): Promise<SetAppPushConfigResponse>;
    getAppPushConfig(): Promise<GetAppPushConfigResponse>;
}
