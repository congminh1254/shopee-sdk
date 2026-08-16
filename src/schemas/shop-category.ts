import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for add_item_list
 *
 * Use this call to add items list to certain shop_category
 */
export interface AddItemListRequest {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * Shopee's unique identifiers list for an item. Max. 100 items to be deleted per request.
   */
  item_list?: number[];
  [key: string]: any;
}
/**
 * AddItemList_InvalidItemId sub-interface for AddItemList_Response
 */
export interface AddItemList_InvalidItemId {
  /**
   * The invalid item id.
   */
  item_id?: number;
  /**
   * The reason of the fail.
   */
  fail_error?: string;
  /**
   * The detailed reason of the failure and the hints of error fixing
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * AddItemList_Response sub-interface for AddItemListResponse
 */
export interface AddItemList_Response {
  /**
   * List of invalid item ids.
   */
  invalid_item_id_list?: AddItemList_InvalidItemId[];
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * Count of items under this shop category after deletion.
   */
  current_count?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_item_list
 */
export type AddItemListResponseData = AddItemList_Response;
/**
 * Response payload for add_item_list
 *
 * Use this call to add items list to certain shop_category
 */
export type AddItemListResponse = FetchResponse<AddItemListResponseData>;
/**
 * Request parameters for add_shop_category
 *
 * Use this call to add a new shop collecion
 */
export interface AddShopCategoryRequest {
  /**
   * ShopCategory's name.
   */
  name?: string;
  /**
   * ShopCategory's sort weight. The maximum number should be 2147483546.
   */
  sort_weight?: number;
  [key: string]: any;
}
/**
 * AddShopCategory_Response sub-interface for AddShopCategoryResponse
 */
export interface AddShopCategory_Response {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_shop_category
 */
export type AddShopCategoryResponseData = AddShopCategory_Response;
/**
 * Response payload for add_shop_category
 *
 * Use this call to add a new shop collecion
 */
export type AddShopCategoryResponse = FetchResponse<AddShopCategoryResponseData>;
/**
 * Request parameters for delete_item_list
 *
 * Use this api to delete items from shop category
 */
export interface DeleteItemListRequest {
  /**
   * The list of items need to be deleted. To note that the items which can be deleted successfully should be under this category.
   */
  shop_category_id?: number;
  /**
   * ShopCategory's unique identifier.
   */
  item_list?: number[];
  [key: string]: any;
}
/**
 * DeleteItemList_Response sub-interface for DeleteItemListResponse
 */
export interface DeleteItemList_Response {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * The list of item ids which are invalid; In other words, the item ids not being under the category.
   */
  invalid_item_id?: number[];
  /**
   * count of items under this shop category after deleting
   */
  current_count?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_item_list
 */
export type DeleteItemListResponseData = DeleteItemList_Response;
/**
 * Response payload for delete_item_list
 *
 * Use this api to delete items from shop category
 */
export type DeleteItemListResponse = FetchResponse<DeleteItemListResponseData>;
/**
 * Request parameters for delete_shop_category
 *
 * Use this call to delete a existing shop collecion
 */
export interface DeleteShopCategoryRequest {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  [key: string]: any;
}
/**
 * DeleteShopCategory_Response sub-interface for DeleteShopCategoryResponse
 */
export interface DeleteShopCategory_Response {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * The return message of the operation result
   */
  msg?: string;
  [key: string]: any;
}
/**
 * Response data payload for delete_shop_category
 */
export type DeleteShopCategoryResponseData = DeleteShopCategory_Response;
/**
 * Response payload for delete_shop_category
 *
 * Use this call to delete a existing shop collecion
 */
export type DeleteShopCategoryResponse = FetchResponse<DeleteShopCategoryResponseData>;
/**
 * Request parameters for get_item_list
 *
 * Use this call to get items list of certain shop_category
 */
export interface GetItemListRequest {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 1000. The input range of page_size is [0, 1000]
   */
  page_size?: number;
  /**
   * If many items are available to retrieve, you may need to call this api multiple times to retrieve all the data. And the default will be 0. page_size*page_no should be [0, 2147483446].
   */
  page_no?: number;
  [key: string]: any;
}
/**
 * GetItemList_Response sub-interface for GetItemListResponse
 */
export interface GetItemList_Response {
  /**
   * A list of Shopee's unique identifiers for items.
   */
  item_list?: number[];
  /**
   * This is to indicate the whole number of items under the shop category.
   */
  total_count?: number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_item_list
 */
export type GetItemListResponseData = GetItemList_Response;
/**
 * Response payload for get_item_list
 *
 * Use this call to get items list of certain shop_category
 */
export type GetItemListResponse = FetchResponse<GetItemListResponseData>;
/**
 * Request parameters for get_shop_category_list
 *
 * Use this call to get list of shop categories
 */
export interface GetShopCategoryListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. The parameter range of page_size should be [1, 2147483647]
   */
  page_size?: number;
  /**
   * Specifies the total returned data per entry. The parameter range of page_no should be [1, 100]
   */
  page_no?: number;
  [key: string]: any;
}
/**
 * GetShopCategoryList_ShopCategory sub-interface for GetShopCategoryList_Response
 */
export interface GetShopCategoryList_ShopCategory {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * ShopCategory's status. Applicable values--1: 'NORMAL', 2: 'INACTIVE', 0: 'DELETED'
   */
  status?: number;
  /**
   * ShopCategory's name.
   */
  name?: string;
  /**
   * ShopCategory's sort weight.
   */
  sort_weight?: number;
  [key: string]: any;
}
/**
 * GetShopCategoryList_Response sub-interface for GetShopCategoryListResponse
 */
export interface GetShopCategoryList_Response {
  /**
   * ShopCategory's unique identifier.
   */
  shop_categorys?: GetShopCategoryList_ShopCategory[];
  /**
   * This is to indicate the whole number of  in-shop categories under the shop.
   */
  total_count?: number;
  /**
   * This is to indicate whether the list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest.
   */
  more?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_category_list
 */
export type GetShopCategoryListResponseData = GetShopCategoryList_Response;
/**
 * Response payload for get_shop_category_list
 *
 * Use this call to get list of shop categories
 */
export type GetShopCategoryListResponse = FetchResponse<GetShopCategoryListResponseData>;
/**
 * Request parameters for update_shop_category
 *
 * Use this call to update a existing collecion
 */
export interface UpdateShopCategoryRequest {
  /**
   * ShopCategory's unique identifier.
   */
  shop_category_id?: number;
  /**
   * ShopCategory's name.
   */
  name?: string;
  /**
   * ShopCategory's sort weight.
   */
  sort_weight?: number;
  /**
   * ShopCategory's status. Applicable values: NORMAL, INACTIVE, DELETED.
   */
  status?: string;
  [key: string]: any;
}
/**
 * UpdateShopCategory_Response sub-interface for UpdateShopCategoryResponse
 */
export interface UpdateShopCategory_Response {
  /**
   * This is to indicate whether the shop categories list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of shop categories
   */
  shop_category_id?: number;
  /**
   * ShopCategory's name.
   */
  name?: string;
  /**
   * ShopCategory's sort weight.
   */
  sort_weight?: number;
  /**
   * ShopCategory's status. Applicable values: NORMAL, INACTIVE, DELETED.
   */
  status?: string;
  [key: string]: any;
}
/**
 * Response data payload for update_shop_category
 */
export type UpdateShopCategoryResponseData = UpdateShopCategory_Response;
/**
 * Response payload for update_shop_category
 *
 * Use this call to update a existing collecion
 */
export type UpdateShopCategoryResponse = FetchResponse<UpdateShopCategoryResponseData>;
