import {
  AddShopFlashSaleItemsRequest,
  AddShopFlashSaleItemsResponse,
  CreateShopFlashSaleRequest,
  CreateShopFlashSaleResponse,
  DeleteShopFlashSaleRequest,
  DeleteShopFlashSaleResponse,
  DeleteShopFlashSaleItemsRequest,
  DeleteShopFlashSaleItemsResponse,
  GetItemCriteriaRequest,
  GetItemCriteriaResponse,
  GetShopFlashSaleRequest,
  GetShopFlashSaleResponse,
  GetShopFlashSaleItemsRequest,
  GetShopFlashSaleItemsResponse,
  GetShopFlashSaleListRequest,
  GetShopFlashSaleListResponse,
  GetTimeSlotIdRequest,
  GetTimeSlotIdResponse,
  UpdateShopFlashSaleRequest,
  UpdateShopFlashSaleResponse,
  UpdateShopFlashSaleItemsRequest,
  UpdateShopFlashSaleItemsResponse,
} from "../schemas/shop-flash-sale.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class ShopFlashSaleManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * add shop flash sale item
   *
   * @param {AddShopFlashSaleItemsRequest} params Request parameters
   * @returns {Promise<AddShopFlashSaleItemsResponse>} Promise resolving to the response
   */
  public async addShopFlashSaleItems(
    params?: AddShopFlashSaleItemsRequest
  ): Promise<AddShopFlashSaleItemsResponse> {
    return ShopeeFetch.fetch<AddShopFlashSaleItemsResponse>(
      this.config,
      "/shop_flash_sale/add_shop_flash_sale_items",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * creat shop flash sale
   *
   * @param {CreateShopFlashSaleRequest} params Request parameters
   * @returns {Promise<CreateShopFlashSaleResponse>} Promise resolving to the response
   */
  public async createShopFlashSale(
    params?: CreateShopFlashSaleRequest
  ): Promise<CreateShopFlashSaleResponse> {
    return ShopeeFetch.fetch<CreateShopFlashSaleResponse>(
      this.config,
      "/shop_flash_sale/create_shop_flash_sale",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * delete shop flash sale
   *
   * @param {DeleteShopFlashSaleRequest} params Request parameters
   * @returns {Promise<DeleteShopFlashSaleResponse>} Promise resolving to the response
   */
  public async deleteShopFlashSale(
    params?: DeleteShopFlashSaleRequest
  ): Promise<DeleteShopFlashSaleResponse> {
    return ShopeeFetch.fetch<DeleteShopFlashSaleResponse>(
      this.config,
      "/shop_flash_sale/delete_shop_flash_sale",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * delete shop flash sale items
   *
   * @param {DeleteShopFlashSaleItemsRequest} params Request parameters
   * @returns {Promise<DeleteShopFlashSaleItemsResponse>} Promise resolving to the response
   */
  public async deleteShopFlashSaleItems(
    params?: DeleteShopFlashSaleItemsRequest
  ): Promise<DeleteShopFlashSaleItemsResponse> {
    return ShopeeFetch.fetch<DeleteShopFlashSaleItemsResponse>(
      this.config,
      "/shop_flash_sale/delete_shop_flash_sale_items",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * get shop flash sale item criteria
   *
   * @param {GetItemCriteriaRequest} params Request parameters
   * @returns {Promise<GetItemCriteriaResponse>} Promise resolving to the response
   */
  public async getItemCriteria(params?: GetItemCriteriaRequest): Promise<GetItemCriteriaResponse> {
    return ShopeeFetch.fetch<GetItemCriteriaResponse>(
      this.config,
      "/shop_flash_sale/get_item_criteria",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * get shop flash sale detail
   *
   * @param {GetShopFlashSaleRequest} params Request parameters
   * @returns {Promise<GetShopFlashSaleResponse>} Promise resolving to the response
   */
  public async getShopFlashSale(
    params?: GetShopFlashSaleRequest
  ): Promise<GetShopFlashSaleResponse> {
    return ShopeeFetch.fetch<GetShopFlashSaleResponse>(
      this.config,
      "/shop_flash_sale/get_shop_flash_sale",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.start_time", "response.end_time"],
      }
    );
  }
  /**
   * get shop flash sale items and item detail
   *
   * @param {GetShopFlashSaleItemsRequest} params Request parameters
   * @returns {Promise<GetShopFlashSaleItemsResponse>} Promise resolving to the response
   */
  public async getShopFlashSaleItems(
    params?: GetShopFlashSaleItemsRequest
  ): Promise<GetShopFlashSaleItemsResponse> {
    return ShopeeFetch.fetch<GetShopFlashSaleItemsResponse>(
      this.config,
      "/shop_flash_sale/get_shop_flash_sale_items",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * get shop flash sale list
   *
   * @param {GetShopFlashSaleListRequest} params Request parameters
   * @returns {Promise<GetShopFlashSaleListResponse>} Promise resolving to the response
   */
  public async getShopFlashSaleList(
    params?: GetShopFlashSaleListRequest
  ): Promise<GetShopFlashSaleListResponse> {
    return ShopeeFetch.fetch<GetShopFlashSaleListResponse>(
      this.config,
      "/shop_flash_sale/get_shop_flash_sale_list",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: [
          "start_time",
          "end_time",
          "flash_sale_list.start_time",
          "flash_sale_list.end_time",
        ],
      }
    );
  }
  /**
   * get time slot id
   *
   * @param {GetTimeSlotIdRequest} params Request parameters
   * @returns {Promise<GetTimeSlotIdResponse>} Promise resolving to the response
   */
  public async getTimeSlotId(params?: GetTimeSlotIdRequest): Promise<GetTimeSlotIdResponse> {
    return ShopeeFetch.fetch<GetTimeSlotIdResponse>(
      this.config,
      "/shop_flash_sale/get_time_slot_id",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["start_time", "end_time", "response.start_time", "response.end_time"],
      }
    );
  }
  /**
   * edit shop flash sale(enable, disable)
   *
   * @param {UpdateShopFlashSaleRequest} params Request parameters
   * @returns {Promise<UpdateShopFlashSaleResponse>} Promise resolving to the response
   */
  public async updateShopFlashSale(
    params?: UpdateShopFlashSaleRequest
  ): Promise<UpdateShopFlashSaleResponse> {
    return ShopeeFetch.fetch<UpdateShopFlashSaleResponse>(
      this.config,
      "/shop_flash_sale/update_shop_flash_sale",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * edit shop flash sale item, you can only edit the models in disbaled or enabled status
   *
   * @param {UpdateShopFlashSaleItemsRequest} params Request parameters
   * @returns {Promise<UpdateShopFlashSaleItemsResponse>} Promise resolving to the response
   */
  public async updateShopFlashSaleItems(
    params?: UpdateShopFlashSaleItemsRequest
  ): Promise<UpdateShopFlashSaleItemsResponse> {
    return ShopeeFetch.fetch<UpdateShopFlashSaleItemsResponse>(
      this.config,
      "/shop_flash_sale/update_shop_flash_sale_items",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
