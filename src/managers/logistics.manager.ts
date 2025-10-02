import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  GetTrackingInfoParams,
  GetTrackingInfoResponse,
  GetChannelListResponse,
  GetShippingParameterParams,
  GetShippingParameterResponse,
  GetTrackingNumberParams,
  GetTrackingNumberResponse,
} from "../schemas/logistics.js";
import { ShopeeFetch } from "../fetch.js";

export class LogisticsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Use this API to get all supported logistic channels.
   *
   * @returns A promise that resolves to the channel list response containing:
   * - logistics_channel_list: Array of available logistics channels with:
   *   - logistics_channel_id: Channel identifier
   *   - logistics_channel_name: Channel name
   *   - enabled: Whether channel is enabled
   *   - cod_enabled: Whether COD is supported
   *   - fee_type: Fee calculation type
   *   - weight_limit: Weight restrictions
   *   - item_max_dimension: Size restrictions
   *   - and more channel details
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_auth: Invalid access_token
   * - error_permission: No permission
   * - error_server: System error
   */
  async getChannelList(): Promise<GetChannelListResponse> {
    const response = await ShopeeFetch.fetch<GetChannelListResponse>(
      this.config,
      "/logistics/get_channel_list",
      {
        method: "GET",
        auth: true,
      }
    );

    return response;
  }

  /**
   * Use this API to get the parameters required for initializing logistics for an order.
   * This is also known as getParameterForInit in the documentation.
   *
   * @param params - Parameters for getting shipping information
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
   *
   * @returns A promise that resolves to the shipping parameter response containing:
   * - info_needed: Required parameters based on the specific order
   * - dropoff: Logistics information for dropoff mode (if applicable)
   * - pickup: Logistics information for pickup mode (if applicable)
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_auth: Invalid access_token
   * - error_param: Wrong parameters
   * - error_permission: No permission
   * - error_server: System error
   */
  async getShippingParameter(params: GetShippingParameterParams): Promise<GetShippingParameterResponse> {
    const response = await ShopeeFetch.fetch<GetShippingParameterResponse>(
      this.config,
      "/logistics/get_shipping_parameter",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Use this API to get the tracking number of a shipped order.
   *
   * @param params - Parameters for getting tracking number
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
   * @param params.response_optional_fields - Optional fields to include in response (optional)
   *
   * @returns A promise that resolves to the tracking number response containing:
   * - tracking_number: The tracking number of the order
   * - plp_number: Package identifier for BR correios (optional)
   * - first_mile_tracking_number: First mile tracking (Cross Border only)
   * - last_mile_tracking_number: Last mile tracking (Cross Border BR only)
   * - hint: Hint information for special scenarios
   * - pickup_code: Quick identification code (ID local orders only)
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_auth: Invalid access_token
   * - error_param: Wrong parameters
   * - error_permission: No permission
   * - error_server: System error
   */
  async getTrackingNumber(params: GetTrackingNumberParams): Promise<GetTrackingNumberResponse> {
    const response = await ShopeeFetch.fetch<GetTrackingNumberResponse>(
      this.config,
      "/logistics/get_tracking_number",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Use this API to get the logistics tracking information of an order.
   *
   * @param params - Parameters for getting tracking information
   * @param params.order_sn - Shopee's unique identifier for an order
   * @param params.package_number - Shopee's unique identifier for the package under an order
   *
   * @returns A promise that resolves to the tracking info response containing:
   * - order_sn: Order identifier
   * - package_number: Package identifier
   * - logistics_status: Current logistics status
   * - tracking_info: Array of tracking events with:
   *   - update_time: Time of status update
   *   - description: Description of the tracking event
   *   - logistics_status: Status code for the event
   *
   * @throws {Error} When the API request fails or returns an error:
   * - logistics.error_param: Order allocation in progress
   * - error_not_found: Wrong parameters
   * - error_permission: No permission
   * - error_server: System error
   * - logistics.invalid_error: Order does not exist
   * - logistics.error_status_limit: Invalid order status
   * - logistics.package_not_exist: Package does not exist
   * - logistics.package_number_not_exist: Package number required for split order
   */
  async getTrackingInfo(params: GetTrackingInfoParams): Promise<GetTrackingInfoResponse> {
    const response = await ShopeeFetch.fetch<GetTrackingInfoResponse>(
      this.config,
      "/logistics/get_tracking_info",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }
}
