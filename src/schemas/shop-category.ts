import { FetchResponse } from "./fetch.js";

/**
 * Shop category information
 */
export interface ShopCategory {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** ShopCategory's status. 1: NORMAL, 2: INACTIVE, 0: DELETED */
  status: number;
  /** ShopCategory's name */
  name: string;
  /** ShopCategory's sort weight */
  sort_weight: number;
  /** Who created the category */
  created_by?: string;
}

/**
 * Parameters for getting shop category list
 */
export interface GetShopCategoryListParams {
  /** Specifies the total returned data per entry. Range: [1, 100] */
  page_size: number;
  /** Specifies the starting entry of data to return. Range: [1, 2147483647] */
  page_no: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Response for getting shop category list
 */
export interface GetShopCategoryListResponse extends FetchResponse<{
  /** List of shop categories */
  shop_categorys: ShopCategory[];
  /** Total count of shop categories */
  total_count: number;
  /** Whether there are more pages */
  more: boolean;
}> {}

/**
 * Parameters for adding a new shop category
 */
export interface AddShopCategoryParams {
  /** ShopCategory's name */
  name: string;
  /** ShopCategory's sort weight. Max: 2147483546 */
  sort_weight?: number;
}

/**
 * Response for adding a shop category
 */
export interface AddShopCategoryResponse extends FetchResponse<{
  /** ShopCategory's unique identifier */
  shop_category_id: number;
}> {}

/**
 * Parameters for updating a shop category
 */
export interface UpdateShopCategoryParams {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** ShopCategory's name */
  name?: string;
  /** ShopCategory's sort weight */
  sort_weight?: number;
  /** ShopCategory's status. Applicable values: NORMAL, INACTIVE, DELETED */
  status?: string;
}

/**
 * Response for updating a shop category
 */
export interface UpdateShopCategoryResponse extends FetchResponse<{
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** ShopCategory's name */
  name: string;
  /** ShopCategory's sort weight */
  sort_weight: number;
  /** ShopCategory's status */
  status: string;
}> {}

/**
 * Parameters for deleting a shop category
 */
export interface DeleteShopCategoryParams {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
}

/**
 * Response for deleting a shop category
 */
export interface DeleteShopCategoryResponse extends FetchResponse<{
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** Result message */
  msg?: string;
}> {}

/**
 * Invalid item information
 */
export interface InvalidItem {
  /** The invalid item id */
  item_id: number;
  /** The reason of the fail */
  fail_error: string;
  /** The detailed reason of the failure */
  fail_message: string;
}

/**
 * Parameters for adding items to a shop category
 */
export interface AddItemListParams {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** List of item IDs to add. Max 100 items per request */
  item_list: number[];
}

/**
 * Response for adding items to a shop category
 */
export interface AddItemListResponse extends FetchResponse<{
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** Count of items under this shop category after addition */
  current_count: number;
  /** List of invalid item ids */
  invalid_item_id_list?: InvalidItem[];
}> {}

/**
 * Parameters for deleting items from a shop category
 */
export interface DeleteItemListParams {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** List of item IDs to delete. Max 100 items per request */
  item_list: number[];
}

/**
 * Response for deleting items from a shop category
 */
export interface DeleteItemListResponse extends FetchResponse<{
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** Count of items under this shop category after deletion */
  current_count: number;
  /** List of invalid item ids */
  invalid_item_id_list?: InvalidItem[];
}> {}

/**
 * Parameters for getting items in a shop category
 */
export interface GetShopCategoryItemListParams {
  /** ShopCategory's unique identifier */
  shop_category_id: number;
  /** Results per page. Default: 1000. Range: [0, 1000] */
  page_size?: number;
  /** Page number. Default: 0. page_size*page_no should be [0, 2147483446] */
  page_no?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Response for getting items in a shop category
 */
export interface GetShopCategoryItemListResponse extends FetchResponse<{
  /** List of item IDs */
  item_list: number[];
  /** Total count of items under this shop category */
  total_count: number;
  /** Whether there are more pages */
  more: boolean;
}> {}
