import { FetchResponse } from "./fetch.js";
export type PushConfigType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export interface SetAppPushConfigParams extends Record<string, string | number | boolean | number[] | undefined> {
    callback_url?: string;
    set_push_config_on?: PushConfigType[];
    set_push_config_off?: PushConfigType[];
    blocked_shop_id_list?: number[];
}
export type SetAppPushConfigResponse = FetchResponse<{
    result: string;
}>;
export type LivePushStatus = 'Normal' | 'Warning' | 'Suspended';
export interface GetAppPushConfigResponse extends FetchResponse<{
    callback_url: string;
    live_push_status: LivePushStatus;
    suspended_time?: number;
    blocked_shop_id: number[];
    push_config_on_list: PushConfigType[];
    push_config_off_list: PushConfigType[];
}> {
}
