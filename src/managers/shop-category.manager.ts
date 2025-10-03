import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import {
  GetShopCategoryListParams,
  GetShopCategoryListResponse,
  AddShopCategoryParams,
  AddShopCategoryResponse,
  UpdateShopCategoryParams,
  UpdateShopCategoryResponse,
  DeleteShopCategoryParams,
  DeleteShopCategoryResponse,
  AddItemListParams,
  AddItemListResponse,
  DeleteItemListParams,
  DeleteItemListResponse,
  GetShopCategoryItemListParams,
  GetShopCategoryItemListResponse,
} from "../schemas/shop-category.js";
import { ShopeeFetch } from "../fetch.js";

export class ShopCategoryManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get list of shop categories
   *
   * Use this call to get list of shop categories
   *
   * @param params - Parameters for getting shop category list
   * @param params.page_size - Total returned data per entry. Range: [1, 100]
   * @param params.page_no - Starting entry of data to return. Range: [1, 2147483647]
   *
   * @returns A promise that resolves to the shop category list response containing:
   * - shop_categorys: List of shop categories with id, status, name, and sort_weight
   * - total_count: Total number of shop categories
   * - more: Whether there are more pages
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: Invalid parameters
   * - error_auth: Invalid access_token or partner_id
   *
   * @example
   * ```typescript
   * const categories = await sdk.shopCategory.getShopCategoryList({
   *   page_size: 100,
   *   page_no: 1
   * });
   * console.log('Total categories:', categories.response.total_count);
   * ```
   */
  async getShopCategoryList(
    params: GetShopCategoryListParams
  ): Promise<GetShopCategoryListResponse> {
    const response = await ShopeeFetch.fetch<GetShopCategoryListResponse>(
      this.config,
      "/shop_category/get_shop_category_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }

  /**
   * Add a new shop category
   *
   * Use this call to add a new shop collection
   *
   * @param params - Parameters for adding a shop category
   * @param params.name - ShopCategory's name (max 40 characters)
   * @param params.sort_weight - ShopCategory's sort weight (optional, max 2147483546)
   *
   * @returns A promise that resolves to the add shop category response containing:
   * - shop_category_id: The newly created shop category ID
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: ShopCategory name is duplicated or exceeds 40 characters
   * - error_param: Sort_weight should be between [0, 2147483546]
   * - error_param: Maximum number of categories (1500) reached
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.addShopCategory({
   *   name: 'Summer Collection',
   *   sort_weight: 10
   * });
   * console.log('Category ID:', result.response.shop_category_id);
   * ```
   */
  async addShopCategory(params: AddShopCategoryParams): Promise<AddShopCategoryResponse> {
    const response = await ShopeeFetch.fetch<AddShopCategoryResponse>(
      this.config,
      "/shop_category/add_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Update an existing shop category
   *
   * Use this call to update an existing collection
   *
   * @param params - Parameters for updating a shop category
   * @param params.shop_category_id - ShopCategory's unique identifier
   * @param params.name - ShopCategory's name (optional)
   * @param params.sort_weight - ShopCategory's sort weight (optional)
   * @param params.status - ShopCategory's status (optional): NORMAL, INACTIVE, DELETED
   *
   * @returns A promise that resolves to the update shop category response containing:
   * - shop_category_id: The updated shop category ID
   * - name: Updated name
   * - sort_weight: Updated sort weight
   * - status: Updated status
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: ShopCategory name is duplicated
   * - error_param: Shopee category cannot edit name and sort_weight
   * - error_service: Shop category id is not found
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.updateShopCategory({
   *   shop_category_id: 12345,
   *   name: 'Winter Collection',
   *   status: 'NORMAL'
   * });
   * ```
   */
  async updateShopCategory(params: UpdateShopCategoryParams): Promise<UpdateShopCategoryResponse> {
    const response = await ShopeeFetch.fetch<UpdateShopCategoryResponse>(
      this.config,
      "/shop_category/update_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Delete an existing shop category
   *
   * Use this call to delete an existing shop collection
   *
   * @param params - Parameters for deleting a shop category
   * @param params.shop_category_id - ShopCategory's unique identifier
   *
   * @returns A promise that resolves to the delete shop category response containing:
   * - shop_category_id: The deleted shop category ID
   * - msg: Result message
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: Automatic & shopee category cannot be deleted
   * - error_service: Shop category id is not found
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.deleteShopCategory({
   *   shop_category_id: 12345
   * });
   * console.log('Deleted category:', result.response.shop_category_id);
   * ```
   */
  async deleteShopCategory(params: DeleteShopCategoryParams): Promise<DeleteShopCategoryResponse> {
    const response = await ShopeeFetch.fetch<DeleteShopCategoryResponse>(
      this.config,
      "/shop_category/delete_shop_category",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Add items to a shop category
   *
   * Use this call to add items list to certain shop_category
   *
   * @param params - Parameters for adding items
   * @param params.shop_category_id - ShopCategory's unique identifier
   * @param params.item_list - List of item IDs (max 100 items per request)
   *
   * @returns A promise that resolves to the add item list response containing:
   * - shop_category_id: The shop category ID
   * - current_count: Count of items after addition
   * - invalid_item_id_list: List of invalid item IDs with error details
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: Total item number exceeds limit (5000)
   * - error_param: Automatic & shopee category cannot add items
   * - error_service: Shop category id is not found
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.addItemList({
   *   shop_category_id: 12345,
   *   item_list: [100001, 100002, 100003]
   * });
   * console.log('Items in category:', result.response.current_count);
   * ```
   */
  async addItemList(params: AddItemListParams): Promise<AddItemListResponse> {
    const response = await ShopeeFetch.fetch<AddItemListResponse>(
      this.config,
      "/shop_category/add_item_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Delete items from a shop category
   *
   * Use this api to delete items from shop category
   *
   * @param params - Parameters for deleting items
   * @param params.shop_category_id - ShopCategory's unique identifier
   * @param params.item_list - List of item IDs to delete (max 100 items per request)
   *
   * @returns A promise that resolves to the delete item list response containing:
   * - shop_category_id: The shop category ID
   * - current_count: Count of items after deletion
   * - invalid_item_id_list: List of invalid item IDs with error details
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_param: Automatic & shopee category cannot delete items
   * - error_param: At most 100 items can be deleted per operation
   * - error_service: Shop category id is not found
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.deleteItemList({
   *   shop_category_id: 12345,
   *   item_list: [100001, 100002]
   * });
   * console.log('Remaining items:', result.response.current_count);
   * ```
   */
  async deleteItemList(params: DeleteItemListParams): Promise<DeleteItemListResponse> {
    const response = await ShopeeFetch.fetch<DeleteItemListResponse>(
      this.config,
      "/shop_category/delete_item_list",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
    return response;
  }

  /**
   * Get items in a shop category
   *
   * Use this call to get items list of certain shop_category
   *
   * @param params - Parameters for getting items
   * @param params.shop_category_id - ShopCategory's unique identifier
   * @param params.page_size - Results per page (optional, default: 1000, range: [0, 1000])
   * @param params.page_no - Page number (optional, default: 0)
   *
   * @returns A promise that resolves to the get item list response containing:
   * - item_list: List of item IDs
   * - total_count: Total number of items in this category
   * - more: Whether there are more pages
   *
   * @throws {Error} When the API request fails or returns an error:
   * - error_service: Shop category id is not found
   * - error_param: Page number should be [1, 2147483446/page_size]
   *
   * @example
   * ```typescript
   * const result = await sdk.shopCategory.getItemList({
   *   shop_category_id: 12345,
   *   page_size: 100,
   *   page_no: 1
   * });
   * console.log('Items:', result.response.item_list);
   * console.log('Has more:', result.response.more);
   * ```
   */
  async getItemList(
    params: GetShopCategoryItemListParams
  ): Promise<GetShopCategoryItemListResponse> {
    const response = await ShopeeFetch.fetch<GetShopCategoryItemListResponse>(
      this.config,
      "/shop_category/get_item_list",
      {
        method: "GET",
        auth: true,
        params,
      }
    );
    return response;
  }
}
