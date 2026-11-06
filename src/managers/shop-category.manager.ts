// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddItemListRequest,
  AddItemListResponse,
  AddShopCategoryRequest,
  AddShopCategoryResponse,
  DeleteItemListRequest,
  DeleteItemListResponse,
  DeleteShopCategoryRequest,
  DeleteShopCategoryResponse,
  GetItemListRequest,
  GetItemListResponse,
  GetShopCategoryListRequest,
  GetShopCategoryListResponse,
  UpdateShopCategoryRequest,
  UpdateShopCategoryResponse,
} from "../schemas/shop-category.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class ShopCategoryManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this call to add items list to certain shop_category
   *
   * @param {AddItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddItemListResponse>} Promise resolving to the response
   */
  public async addItemList(
    params: AddItemListRequest,
    options?: RequestOptions
  ): Promise<AddItemListResponse> {
    return ShopeeFetch.fetch<AddItemListResponse>(this.config, "/shop_category/add_item_list", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this call to add a new shop collecion
   *
   * @param {AddShopCategoryRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<AddShopCategoryResponse>} Promise resolving to the response
   */
  public async addShopCategory(
    params: AddShopCategoryRequest,
    options?: RequestOptions
  ): Promise<AddShopCategoryResponse> {
    return ShopeeFetch.fetch<AddShopCategoryResponse>(
      this.config,
      "/shop_category/add_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this api to delete items from shop category
   *
   * @param {DeleteItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteItemListResponse>} Promise resolving to the response
   */
  public async deleteItemList(
    params: DeleteItemListRequest,
    options?: RequestOptions
  ): Promise<DeleteItemListResponse> {
    return ShopeeFetch.fetch<DeleteItemListResponse>(
      this.config,
      "/shop_category/delete_item_list",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to delete a existing shop collecion
   *
   * @param {DeleteShopCategoryRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteShopCategoryResponse>} Promise resolving to the response
   */
  public async deleteShopCategory(
    params: DeleteShopCategoryRequest,
    options?: RequestOptions
  ): Promise<DeleteShopCategoryResponse> {
    return ShopeeFetch.fetch<DeleteShopCategoryResponse>(
      this.config,
      "/shop_category/delete_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to get items list of certain shop_category
   *
   * @param {GetItemListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetItemListResponse>} Promise resolving to the response
   */
  public async getItemList(
    params: GetItemListRequest,
    options?: RequestOptions
  ): Promise<GetItemListResponse> {
    return ShopeeFetch.fetch<GetItemListResponse>(this.config, "/shop_category/get_item_list", {
      method: "GET",
      auth: true,
      params: params,
      request: options,
    });
  }
  /**
   * Use this call to get list of shop categories
   *
   * @param {GetShopCategoryListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetShopCategoryListResponse>} Promise resolving to the response
   */
  public async getShopCategoryList(
    params: GetShopCategoryListRequest,
    options?: RequestOptions
  ): Promise<GetShopCategoryListResponse> {
    return ShopeeFetch.fetch<GetShopCategoryListResponse>(
      this.config,
      "/shop_category/get_shop_category_list",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Use this call to update a existing collecion
   *
   * @param {UpdateShopCategoryRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UpdateShopCategoryResponse>} Promise resolving to the response
   */
  public async updateShopCategory(
    params: UpdateShopCategoryRequest,
    options?: RequestOptions
  ): Promise<UpdateShopCategoryResponse> {
    return ShopeeFetch.fetch<UpdateShopCategoryResponse>(
      this.config,
      "/shop_category/update_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
}
