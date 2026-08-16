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
export class PushManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Confirm consumed lost push message
   *
   * @param {ConfirmConsumedLostPushMessageRequest} params Request parameters
   * @returns {Promise<ConfirmConsumedLostPushMessageResponse>} Promise resolving to the response
   */
  public async confirmConsumedLostPushMessage(
    params?: ConfirmConsumedLostPushMessageRequest
  ): Promise<ConfirmConsumedLostPushMessageResponse> {
    return ShopeeFetch.fetch<ConfirmConsumedLostPushMessageResponse>(
      this.config,
      "/push/confirm_consumed_lost_push_message",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * you can get your app current push config setting through this api
   *
   * @param {GetAppPushConfigRequest} params Request parameters
   * @returns {Promise<GetAppPushConfigResponse>} Promise resolving to the response
   */
  public async getAppPushConfig(
    params?: GetAppPushConfigRequest
  ): Promise<GetAppPushConfigResponse> {
    return ShopeeFetch.fetch<GetAppPushConfigResponse>(this.config, "/push/get_app_push_config", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.suspended_time"],
    });
  }
  /**
   * Get the lost push messages that were lost within 3 days of the current time and not confirmed to have been consumed
   *
   * @param {GetLostPushMessageRequest} params Request parameters
   * @returns {Promise<GetLostPushMessageResponse>} Promise resolving to the response
   */
  public async getLostPushMessage(
    params?: GetLostPushMessageRequest
  ): Promise<GetLostPushMessageResponse> {
    return ShopeeFetch.fetch<GetLostPushMessageResponse>(
      this.config,
      "/push/get_lost_push_message",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.push_message_list.timestamp"],
      }
    );
  }
  /**
   * you can turn on or turn off your app push config setting through this open api
   *
   * @param {SetAppPushConfigRequest} params Request parameters
   * @returns {Promise<SetAppPushConfigResponse>} Promise resolving to the response
   */
  public async setAppPushConfig(
    params?: SetAppPushConfigRequest
  ): Promise<SetAppPushConfigResponse> {
    return ShopeeFetch.fetch<SetAppPushConfigResponse>(this.config, "/push/set_app_push_config", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
}
