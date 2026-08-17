// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetAuthorisedResellerBrandRequest,
  GetAuthorisedResellerBrandResponse,
  GetBrShopOnboardingInfoRequest,
  GetBrShopOnboardingInfoResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetShopHolidayModeRequest,
  GetShopHolidayModeResponse,
  GetShopInfoRequest,
  GetShopInfoResponse,
  GetShopNotificationRequest,
  GetShopNotificationResponse,
  GetWarehouseDetailRequest,
  GetWarehouseDetailResponse,
  SetShopHolidayModeRequest,
  SetShopHolidayModeResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../schemas/shop.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class ShopManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Get the authorised reseller brand list for the shop.
   *
   * @param {GetAuthorisedResellerBrandRequest} params Request parameters
   * @returns {Promise<GetAuthorisedResellerBrandResponse>} Promise resolving to the response
   */
  public async getAuthorisedResellerBrand(
    params?: GetAuthorisedResellerBrandRequest
  ): Promise<GetAuthorisedResellerBrandResponse> {
    return ShopeeFetch.fetch<GetAuthorisedResellerBrandResponse>(
      this.config,
      "/shop/get_authorised_reseller_brand",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * [For BR Shop Only] Use this API to get shop KYC registration and qualification information.
   *
   * @param {GetBrShopOnboardingInfoRequest} params Request parameters
   * @returns {Promise<GetBrShopOnboardingInfoResponse>} Promise resolving to the response
   */
  public async getBrShopOnboardingInfo(
    params?: GetBrShopOnboardingInfoRequest
  ): Promise<GetBrShopOnboardingInfoResponse> {
    return ShopeeFetch.fetch<GetBrShopOnboardingInfoResponse>(
      this.config,
      "/shop/get_br_shop_onboarding_info",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API support to get information of shop.
   *
   * @param {GetProfileRequest} params Request parameters
   * @returns {Promise<GetProfileResponse>} Promise resolving to the response
   */
  public async getProfile(params?: GetProfileRequest): Promise<GetProfileResponse> {
    return ShopeeFetch.fetch<GetProfileResponse>(this.config, "/shop/get_profile", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Use this API to check whether a shop has enabled holiday mode and its ongoing and upcoming holiday mode period.
   *
   * @param {GetShopHolidayModeRequest} params Request parameters
   * @returns {Promise<GetShopHolidayModeResponse>} Promise resolving to the response
   */
  public async getShopHolidayMode(
    params?: GetShopHolidayModeRequest
  ): Promise<GetShopHolidayModeResponse> {
    return ShopeeFetch.fetch<GetShopHolidayModeResponse>(
      this.config,
      "/shop/get_shop_holiday_mode",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "response.holiday_mode_mtime",
          "response.holiday_mode_start_time",
          "response.holiday_mode_end_time",
        ],
      }
    );
  }
  /**
   * Use this call to get information of shop
   *
   * @param {GetShopInfoRequest} params Request parameters
   * @returns {Promise<GetShopInfoResponse>} Promise resolving to the response
   */
  public async getShopInfo(params?: GetShopInfoRequest): Promise<GetShopInfoResponse> {
    return ShopeeFetch.fetch<GetShopInfoResponse>(this.config, "/shop/get_shop_info", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["auth_time", "expire_time"],
    });
  }
  /**
   * get Seller Center notification, the permission is controlled by App type
   *
   * @param {GetShopNotificationRequest} params Request parameters
   * @returns {Promise<GetShopNotificationResponse>} Promise resolving to the response
   */
  public async getShopNotification(
    params?: GetShopNotificationRequest
  ): Promise<GetShopNotificationResponse> {
    return ShopeeFetch.fetch<GetShopNotificationResponse>(
      this.config,
      "/shop/get_shop_notification",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * For given shop id and region, return warehouse info including warehouse id, address id and location id, return all warehouse with once call.
   *
   * @param {GetWarehouseDetailRequest} params Request parameters
   * @returns {Promise<GetWarehouseDetailResponse>} Promise resolving to the response
   */
  public async getWarehouseDetail(
    params?: GetWarehouseDetailRequest
  ): Promise<GetWarehouseDetailResponse> {
    return ShopeeFetch.fetch<GetWarehouseDetailResponse>(
      this.config,
      "/shop/get_warehouse_detail",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to set holiday periods in advance for automatic on/off of holiday mode and there are two holiday modes allowing sellers to choose whether to accept new orders during holiday.
   *
   * @param {SetShopHolidayModeRequest} params Request parameters
   * @returns {Promise<SetShopHolidayModeResponse>} Promise resolving to the response
   */
  public async setShopHolidayMode(
    params?: SetShopHolidayModeRequest
  ): Promise<SetShopHolidayModeResponse> {
    return ShopeeFetch.fetch<SetShopHolidayModeResponse>(
      this.config,
      "/shop/set_shop_holiday_mode",
      {
        method: "POST",
        auth: true,
        body: params,
        timestampPaths: ["holiday_mode_start_time", "holiday_mode_end_time"],
      }
    );
  }
  /**
   * This API support to let sellers to update the shop name, shop logo, and shop description.
   *
   * @param {UpdateProfileRequest} params Request parameters
   * @returns {Promise<UpdateProfileResponse>} Promise resolving to the response
   */
  public async updateProfile(params?: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    return ShopeeFetch.fetch<UpdateProfileResponse>(this.config, "/shop/update_profile", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
}
