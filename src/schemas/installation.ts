// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for receive_installation_order
 *
 * Receive installation order. Use this API to move installation status to PARCEL_PICKED_UP.
 */
export interface ReceiveInstallationOrderRequest {
  /**
   * Unique ID of the installation order. Passed to ISP on installation order creation.
   */
  installation_order_id: number;
  /**
   * Reason for the installation status update.Currently only support empty string.
   */
  reason: string;
}
/**
 * Response data payload for receive_installation_order
 */
export type ReceiveInstallationOrderResponseData = Record<string, never>;
/**
 * Response payload for receive_installation_order
 *
 * Receive installation order. Use this API to move installation status to PARCEL_PICKED_UP.
 */
export type ReceiveInstallationOrderResponse = FetchResponse<ReceiveInstallationOrderResponseData>;
/**
 * Request parameters for validate_installation_otp_code
 *
 * Validate installation order OTP code. Use this API to validate OTP code when parcel status is PARCEL_PICKED_UP, PARCEL_REQUEST_CANCELLED, or PARCEL_CANCELLED.
 */
export interface ValidateInstallationOtpCodeRequest {
  /**
   * Unique ID of the installation order. Passed to ISP on installation order creation.
   */
  installation_order_id: number;
  /**
   * OTP Code from buyer side.
   */
  installation_otp: string;
}
/**
 * Response data payload for validate_installation_otp_code
 */
export type ValidateInstallationOtpCodeResponseData = Record<string, never>;
/**
 * Response payload for validate_installation_otp_code
 *
 * Validate installation order OTP code. Use this API to validate OTP code when parcel status is PARCEL_PICKED_UP, PARCEL_REQUEST_CANCELLED, or PARCEL_CANCELLED.
 */
export type ValidateInstallationOtpCodeResponse =
  FetchResponse<ValidateInstallationOtpCodeResponseData>;
