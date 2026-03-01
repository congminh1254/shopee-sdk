import { FetchResponse } from "./fetch.js";
import { BaseResponse } from "./base.js";

export type PushConfigType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface SetAppPushConfigParams extends Record<
  string,
  string | number | boolean | number[] | undefined
> {
  callback_url?: string;
  set_push_config_on?: PushConfigType[];
  set_push_config_off?: PushConfigType[];
  blocked_shop_id_list?: number[];
}

export type SetAppPushConfigResponse = FetchResponse<{
  result: string;
}>;

export type LivePushStatus = "Normal" | "Warning" | "Suspended";

export interface GetAppPushConfigResponse extends FetchResponse<{
  callback_url: string;
  live_push_status: LivePushStatus;
  suspended_time?: number;
  blocked_shop_id: number[];
  push_config_on_list: PushConfigType[];
  push_config_off_list: PushConfigType[];
}> {}

/**
 * Push message information
 */
export type PushMessage = {
  /** Shopee's unique identifier for a shop. Not returned for partner level push (such as code: 1, 2, 12) */
  shop_id?: number;
  /** Shopee's unique identifier for a push notification */
  code: number;
  /** Timestamp that indicates the message was lost */
  timestamp: number;
  /** Main Push message data as a JSON string */
  data: string;
};

/**
 * Parameters for confirming consumed lost push messages
 */
export interface ConfirmConsumedLostPushMessageParams {
  /** The last_message_id returned by getLostPushMessage */
  last_message_id: number;
}

/**
 * Response for the get lost push message API
 */
export interface GetLostPushMessageResponse extends BaseResponse {
  response: {
    /** Returns the earliest 100 lost push messages that were lost within 3 days of the current time and not confirmed to have been consumed */
    push_message_list: PushMessage[];
    /** Indicates whether there are more than 100 lost push messages to be consumed. If true, you need to continue calling to get the remaining lost messages */
    has_next_page: boolean;
    /** Specifies the end entry of data returned in the current call */
    last_message_id: number;
  };
  /** Indicate warning details if any warning occurred */
  warning?: string;
}

/**
 * Response for the confirm consumed lost push message API
 */
export interface ConfirmConsumedLostPushMessageResponse extends BaseResponse {
  /** Indicate warning details if any warning occurred */
  warning?: string;
}
