import { BaseManager } from "./base.manager.js";
import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import {
  GetProfileParams,
  GetProfileResponse,
  GetShopInfoParams,
  GetShopInfoResponse,
  UpdateProfileParams,
  UpdateProfileResponse,
  GetWarehouseDetailParams,
  GetWarehouseDetailResponse,
  GetShopNotificationParams,
  GetShopNotificationResponse,
  GetAuthorisedResellerBrandParams,
  GetAuthorisedResellerBrandResponse,
} from "../schemas/shop.js";

export class ShopManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get shop profile
   *
   * This API support to get information of shop.
   *
   * @returns A promise that resolves to the profile response containing:
   * - shop_logo: The Image URL of the shop logo
   * - description: The content of the shop description
   * - shop_name: The content of the shop name
   * - invoice_issuer: The invoice issuer information for BR CNPJ seller only
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const profile = await sdk.shop.getProfile();
   * console.log('Shop name:', profile.response.shop_name);
   * console.log('Shop logo:', profile.response.shop_logo);
   * ```
   */
  async getProfile(params?: GetProfileParams): Promise<GetProfileResponse> {
    const response = await ShopeeFetch.fetch<GetProfileResponse>(
      this.config,
      "/shop/get_profile",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );

    return response;
  }

  /**
   * Get shop information
   *
   * Use this call to get information of shop
   *
   * @returns A promise that resolves to the shop info response containing:
   * - shop_name: Name of the shop
   * - region: Shop's area
   * - status: Shop status (BANNED, FROZEN, NORMAL)
   * - is_cb: Whether the shop is a cross-border shop
   * - auth_time: Timestamp when shop was authorized
   * - expire_time: Expiration date for shop authorization
   * - is_sip: Whether it's a SIP primary/affiliate shop
   * - Additional fields for merchant info, fulfillment type, etc.
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const shopInfo = await sdk.shop.getShopInfo();
   * console.log('Shop name:', shopInfo.shop_name);
   * console.log('Region:', shopInfo.region);
   * console.log('Status:', shopInfo.status);
   * ```
   */
  async getShopInfo(params?: GetShopInfoParams): Promise<GetShopInfoResponse> {
    const response = await ShopeeFetch.fetch<GetShopInfoResponse>(
      this.config,
      "/shop/get_shop_info",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );

    return response;
  }

  /**
   * Update shop profile
   *
   * This API support to let sellers to update the shop name, shop logo, and shop description.
   *
   * @param params - The parameters for updating profile
   * @param params.shop_name - The new shop name
   * @param params.shop_logo - The new shop logo url
   * @param params.description - The new shop description
   *
   * @returns A promise that resolves to the updated profile response
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_data_check: Failed to change shop name (changed within 30 days, invalid length, etc.)
   * - error_data_check: Failed to change shop logo (invalid URL, wrong format, etc.)
   * - error_data_check: Failed to change description (exceeds 500 characters, etc.)
   *
   * @example
   * ```typescript
   * const result = await sdk.shop.updateProfile({
   *   shop_name: 'New Shop Name',
   *   description: 'Welcome to our shop. Quality products at great prices!'
   * });
   * console.log('Updated shop:', result.response.shop_name);
   * ```
   */
  async updateProfile(params: UpdateProfileParams): Promise<UpdateProfileResponse> {
    const response = await ShopeeFetch.fetch<UpdateProfileResponse>(
      this.config,
      "/shop/update_profile",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get warehouse detail
   *
   * For given shop id and region, return warehouse info including warehouse id, address id and location id
   *
   * @param params - The parameters for getting warehouse detail
   * @param params.warehouse_type - Type of warehouse (1: Pickup Warehouse, 2: Return Warehouse). Default is 1
   *
   * @returns A promise that resolves to the warehouse detail response containing:
   * - warehouse_id: Warehouse address identifier
   * - warehouse_name: The warehouse name
   * - warehouse_type: Type of warehouse
   * - location_id: Location identifier for stocks
   * - address_id: Identity of address
   * - region, state, city, address: Location details
   * - zipcode, district, town, state_code: Additional location info
   * - holiday_mode_state: Holiday mode status
   *
   * @throws {Error} When the API request fails or returns an error:
   * - warehouse.error_can_not_find_warehouse: No legal warehouse address for given shop id
   * - warehouse.error_not_in_whitelist: Shop has no permission to access multi-warehouse
   * - warehouse.error_region_can_not_blank: Region is missing
   * - warehouse.error_region_not_valid: Region is not valid
   *
   * @example
   * ```typescript
   * const warehouses = await sdk.shop.getWarehouseDetail({
   *   warehouse_type: 1 // Pickup warehouse
   * });
   * warehouses.response.forEach(wh => {
   *   console.log('Warehouse:', wh.warehouse_name);
   *   console.log('Location ID:', wh.location_id);
   * });
   * ```
   */
  async getWarehouseDetail(
    params?: GetWarehouseDetailParams
  ): Promise<GetWarehouseDetailResponse> {
    const response = await ShopeeFetch.fetch<GetWarehouseDetailResponse>(
      this.config,
      "/shop/get_warehouse_detail",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );

    return response;
  }

  /**
   * Get shop notification
   *
   * Get Seller Center notification, the permission is controlled by App type
   *
   * @param params - The parameters for getting shop notification
   * @param params.cursor - The last notification_id returned on the page. When using the cursor, notifications will start with the one following this cursor notification. If no cursor is provided, the latest message from the shop will be returned.
   * @param params.page_size - Default 10; maximum 50
   *
   * @returns A promise that resolves to the notification response containing:
   * - cursor: Last notification_id returned in the page
   * - data: Notification data with create_time, content, title, and url
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const notifications = await sdk.shop.getShopNotification({
   *   page_size: 10
   * });
   * console.log('Title:', notifications.data.title);
   * console.log('Content:', notifications.data.content);
   * console.log('Cursor:', notifications.cursor);
   * ```
   */
  async getShopNotification(
    params?: GetShopNotificationParams
  ): Promise<GetShopNotificationResponse> {
    const response = await ShopeeFetch.fetch<GetShopNotificationResponse>(
      this.config,
      "/shop/get_shop_notification",
      {
        method: "GET",
        auth: true,
        params: params || {},
      }
    );

    return response;
  }

  /**
   * Get authorised reseller brand
   *
   * Get the authorised reseller brand list for the shop.
   *
   * @param params - The parameters for getting authorised reseller brand
   * @param params.page_no - Specifies the page number of data to return (starting from 1)
   * @param params.page_size - Maximum number of entries per page (between 1 and 30)
   *
   * @returns A promise that resolves to the authorised reseller brand response containing:
   * - is_authorised_reseller: Whether the shop is authorised reseller
   * - total_count: Number of authorised brands linked with the shop
   * - more: Whether there are more pages
   * - authorised_brand_list: List of authorised brands with brand_id and brand_name
   *
   * @throws {Error} When the API request fails or returns an error
   *
   * @example
   * ```typescript
   * const brands = await sdk.shop.getAuthorisedResellerBrand({
   *   page_no: 1,
   *   page_size: 10
   * });
   * console.log('Is authorised reseller:', brands.response.is_authorised_reseller);
   * console.log('Total brands:', brands.response.total_count);
   * brands.response.authorised_brand_list.forEach(brand => {
   *   console.log('Brand:', brand.brand_name);
   * });
   * ```
   */
  async getAuthorisedResellerBrand(
    params: GetAuthorisedResellerBrandParams
  ): Promise<GetAuthorisedResellerBrandResponse> {
    const response = await ShopeeFetch.fetch<GetAuthorisedResellerBrandResponse>(
      this.config,
      "/shop/get_authorised_reseller_brand",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }
}
