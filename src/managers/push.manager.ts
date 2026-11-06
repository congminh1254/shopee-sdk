// NOTE: This file is auto-generated. Do not edit directly.

import {
  ConfirmConsumedLostPushMessageRequest,
  ConfirmConsumedLostPushMessageResponse,
  GetAppPushConfigRequest,
  GetAppPushConfigResponse,
  GetLostPushMessageRequest,
  GetLostPushMessageResponse,
  SetAppPushConfigRequest,
  SetAppPushConfigResponse,
} from "../schemas/push.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class PushManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Confirm consumed lost push message
   *
   * @param {ConfirmConsumedLostPushMessageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ConfirmConsumedLostPushMessageResponse>} Promise resolving to the response
   */
  public async confirmConsumedLostPushMessage(
    params: ConfirmConsumedLostPushMessageRequest,
    options?: RequestOptions
  ): Promise<ConfirmConsumedLostPushMessageResponse> {
    return ShopeeFetch.fetch<ConfirmConsumedLostPushMessageResponse>(
      this.config,
      "/push/confirm_consumed_lost_push_message",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * you can get your app current push config setting through this api
   *
   * @param {GetAppPushConfigRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetAppPushConfigResponse>} Promise resolving to the response
   */
  public async getAppPushConfig(
    params?: GetAppPushConfigRequest,
    options?: RequestOptions
  ): Promise<GetAppPushConfigResponse> {
    return ShopeeFetch.fetch<GetAppPushConfigResponse>(this.config, "/push/get_app_push_config", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
      timestampPaths: ["response.suspended_time"],
    });
  }
  /**
   * Get the lost push messages that were lost within 3 days of the current time and not confirmed to have been consumed
   *
   * @param {GetLostPushMessageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetLostPushMessageResponse>} Promise resolving to the response
   */
  public async getLostPushMessage(
    params?: GetLostPushMessageRequest,
    options?: RequestOptions
  ): Promise<GetLostPushMessageResponse> {
    return ShopeeFetch.fetch<GetLostPushMessageResponse>(
      this.config,
      "/push/get_lost_push_message",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: ["response.push_message_list.timestamp"],
      }
    );
  }
  /**
   * you can turn on or turn off your app push config setting through this open api
   *
   * @param {SetAppPushConfigRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<SetAppPushConfigResponse>} Promise resolving to the response
   */
  public async setAppPushConfig(
    params?: SetAppPushConfigRequest,
    options?: RequestOptions
  ): Promise<SetAppPushConfigResponse> {
    return ShopeeFetch.fetch<SetAppPushConfigResponse>(this.config, "/push/set_app_push_config", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
}
