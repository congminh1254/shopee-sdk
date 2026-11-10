// NOTE: This file is auto-generated. Do not edit directly.

import {
  ReceiveInstallationOrderRequest,
  ReceiveInstallationOrderResponse,
  ValidateInstallationOtpCodeRequest,
  ValidateInstallationOtpCodeResponse,
} from "../schemas/installation.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class InstallationManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Receive installation order. Use this API to move installation status to PARCEL_PICKED_UP.
   *
   * @param {ReceiveInstallationOrderRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ReceiveInstallationOrderResponse>} Promise resolving to the response
   */
  public async receiveInstallationOrder(
    params: ReceiveInstallationOrderRequest,
    options?: RequestOptions
  ): Promise<ReceiveInstallationOrderResponse> {
    return ShopeeFetch.fetch<ReceiveInstallationOrderResponse>(
      this.config,
      "/installation/receive_installation_order",
      {
        method: "POST",
        body: params,
        request: options,
      }
    );
  }
  /**
   * Validate installation order OTP code. Use this API to validate OTP code when parcel status is PARCEL_PICKED_UP, PARCEL_REQUEST_CANCELLED, or PARCEL_CANCELLED.
   *
   * @param {ValidateInstallationOtpCodeRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<ValidateInstallationOtpCodeResponse>} Promise resolving to the response
   */
  public async validateInstallationOtpCode(
    params: ValidateInstallationOtpCodeRequest,
    options?: RequestOptions
  ): Promise<ValidateInstallationOtpCodeResponse> {
    return ShopeeFetch.fetch<ValidateInstallationOtpCodeResponse>(
      this.config,
      "/installation/validate_installation_otp_code",
      {
        method: "POST",
        body: params,
        request: options,
      }
    );
  }
}
