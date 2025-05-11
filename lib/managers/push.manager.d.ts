import { ShopeeConfig } from '../sdk.js';
import { SetAppPushConfigParams, SetAppPushConfigResponse, GetAppPushConfigResponse, GetLostPushMessageResponse, ConfirmConsumedLostPushMessageParams, ConfirmConsumedLostPushMessageResponse } from '../schemas/push.js';
import { BaseManager } from './base.manager.js';
export declare class PushManager extends BaseManager {
    constructor(config: ShopeeConfig);
    setAppPushConfig(params: SetAppPushConfigParams): Promise<SetAppPushConfigResponse>;
    getAppPushConfig(): Promise<GetAppPushConfigResponse>;
    /**
     * Get the lost push messages that were lost within 3 days of the current time and not confirmed to have been consumed
     * @returns {Promise<GetLostPushMessageResponse>} Response containing up to 100 lost push messages
     *
     * This API retrieves the earliest 100 lost push messages from the past 3 days that haven't been confirmed as consumed.
     * If there are more than 100 messages, the response will indicate this via the has_next_page field,
     * and you'll need to make additional calls to retrieve the remaining messages.
     *
     * The returned messages contain:
     * - shop_id: The shop identifier (absent for partner level pushes)
     * - code: The push notification identifier
     * - timestamp: When the message was lost
     * - data: The actual push message content (as a JSON string)
     */
    getLostPushMessage(): Promise<GetLostPushMessageResponse>;
    /**
     * Confirm that lost push messages have been consumed up to a specific message ID
     * @param {ConfirmConsumedLostPushMessageParams} params - Parameters for confirming consumed lost push messages
     * @param {number} params.last_message_id - The last_message_id returned by getLostPushMessage
     * @returns {Promise<ConfirmConsumedLostPushMessageResponse>} Response indicating the confirmation result
     *
     * This API confirms that all lost push messages up to and including the specified last_message_id
     * have been successfully consumed/processed by your application. After confirmation, these messages
     * will no longer be returned by the getLostPushMessage API.
     *
     * Use this method after you have successfully processed the messages returned by getLostPushMessage.
     */
    confirmConsumedLostPushMessage(params: ConfirmConsumedLostPushMessageParams): Promise<ConfirmConsumedLostPushMessageResponse>;
}
