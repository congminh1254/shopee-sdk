import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetTimeSlotIdParams, GetTimeSlotIdResponse, CreateShopFlashSaleParams, CreateShopFlashSaleResponse, GetShopFlashSaleParams, GetShopFlashSaleResponse, GetShopFlashSaleListParams, GetShopFlashSaleListResponse, UpdateShopFlashSaleParams, UpdateShopFlashSaleResponse, DeleteShopFlashSaleParams, DeleteShopFlashSaleResponse, AddShopFlashSaleItemsParams, AddShopFlashSaleItemsResponse, GetShopFlashSaleItemsParams, GetShopFlashSaleItemsResponse, UpdateShopFlashSaleItemsParams, UpdateShopFlashSaleItemsResponse, DeleteShopFlashSaleItemsParams, DeleteShopFlashSaleItemsResponse, GetItemCriteriaParams, GetItemCriteriaResponse } from "../schemas/shop-flash-sale.js";
export declare class ShopFlashSaleManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Get available time slot IDs
     *
     * Use this API to get available time slots for creating shop flash sales.
     * You can only use time slots that start in the future.
     *
     * @param params - Parameters containing start_time and end_time
     * @returns A promise that resolves to the list of available time slots
     *
     * @example
     * ```typescript
     * const now = Math.floor(Date.now() / 1000);
     * const slots = await sdk.shopFlashSale.getTimeSlotId({
     *   start_time: now,
     *   end_time: now + 7 * 86400 // Next 7 days
     * });
     * console.log('Available slots:', slots.response);
     * ```
     */
    getTimeSlotId(params: GetTimeSlotIdParams): Promise<GetTimeSlotIdResponse>;
    /**
     * Create a new shop flash sale
     *
     * Use this API to create a new shop flash sale activity for a specific time slot.
     * The time slot must be obtained from getTimeSlotId() and must start in the future.
     *
     * @param params - Parameters containing timeslot_id
     * @returns A promise that resolves to the created flash sale information
     *
     * @example
     * ```typescript
     * const flashSale = await sdk.shopFlashSale.createShopFlashSale({
     *   timeslot_id: 237859372232704
     * });
     * console.log('Flash sale created:', flashSale.response.flash_sale_id);
     * ```
     */
    createShopFlashSale(params: CreateShopFlashSaleParams): Promise<CreateShopFlashSaleResponse>;
    /**
     * Get shop flash sale details
     *
     * Use this API to get detailed information about a specific shop flash sale.
     *
     * @param params - Parameters containing flash_sale_id
     * @returns A promise that resolves to the flash sale details
     *
     * @example
     * ```typescript
     * const details = await sdk.shopFlashSale.getShopFlashSale({
     *   flash_sale_id: 802063533822541
     * });
     * console.log('Flash sale status:', details.response.status);
     * ```
     */
    getShopFlashSale(params: GetShopFlashSaleParams): Promise<GetShopFlashSaleResponse>;
    /**
     * Get shop flash sale list
     *
     * Use this API to get a list of shop flash sales with pagination support.
     * You can filter by type (upcoming, ongoing, expired) and time range.
     *
     * @param params - Parameters for filtering and pagination
     * @returns A promise that resolves to the list of flash sales
     *
     * @example
     * ```typescript
     * const list = await sdk.shopFlashSale.getShopFlashSaleList({
     *   type: 1, // upcoming
     *   offset: 0,
     *   limit: 20
     * });
     * console.log('Total flash sales:', list.response.total_count);
     * ```
     */
    getShopFlashSaleList(params: GetShopFlashSaleListParams): Promise<GetShopFlashSaleListResponse>;
    /**
     * Update shop flash sale status
     *
     * Use this API to enable or disable a shop flash sale.
     * Disabling a flash sale will disable all items in the session.
     * Cannot edit flash sales with 'system_rejected' status.
     *
     * @param params - Parameters containing flash_sale_id and status
     * @returns A promise that resolves to the updated flash sale information
     *
     * @example
     * ```typescript
     * const result = await sdk.shopFlashSale.updateShopFlashSale({
     *   flash_sale_id: 802063533822541,
     *   status: 1 // enable
     * });
     * console.log('Flash sale updated:', result.response.status);
     * ```
     */
    updateShopFlashSale(params: UpdateShopFlashSaleParams): Promise<UpdateShopFlashSaleResponse>;
    /**
     * Delete shop flash sale
     *
     * Use this API to delete a shop flash sale.
     * Cannot delete ongoing and expired flash sales.
     *
     * @param params - Parameters containing flash_sale_id
     * @returns A promise that resolves to the deleted flash sale information
     *
     * @example
     * ```typescript
     * const result = await sdk.shopFlashSale.deleteShopFlashSale({
     *   flash_sale_id: 802063533822541
     * });
     * console.log('Flash sale deleted, status:', result.response.status);
     * ```
     */
    deleteShopFlashSale(params: DeleteShopFlashSaleParams): Promise<DeleteShopFlashSaleResponse>;
    /**
     * Add items to shop flash sale
     *
     * Use this API to add items to a shop flash sale.
     * Maximum 50 enabled items per flash sale.
     * For items with variations, specify model_id and prices for each variation.
     *
     * @param params - Parameters containing flash_sale_id and items
     * @returns A promise that resolves to the result with any failed items
     *
     * @example
     * ```typescript
     * const result = await sdk.shopFlashSale.addShopFlashSaleItems({
     *   flash_sale_id: 802063533822541,
     *   items: [
     *     {
     *       item_id: 3744623870,
     *       purchase_limit: 5,
     *       models: [
     *         {
     *           model_id: 5414485721,
     *           input_promo_price: 69.3,
     *           stock: 100
     *         }
     *       ]
     *     }
     *   ]
     * });
     * console.log('Failed items:', result.response.failed_items);
     * ```
     */
    addShopFlashSaleItems(params: AddShopFlashSaleItemsParams): Promise<AddShopFlashSaleItemsResponse>;
    /**
     * Get shop flash sale items
     *
     * Use this API to get items and their details in a shop flash sale.
     * Returns both item information and model details for items with variations.
     *
     * @param params - Parameters containing flash_sale_id, offset, and limit
     * @returns A promise that resolves to the items and their details
     *
     * @example
     * ```typescript
     * const items = await sdk.shopFlashSale.getShopFlashSaleItems({
     *   flash_sale_id: 802063533822541,
     *   offset: 0,
     *   limit: 50
     * });
     * console.log('Total items:', items.response.total_count);
     * console.log('Items:', items.response.item_info);
     * console.log('Models:', items.response.models);
     * ```
     */
    getShopFlashSaleItems(params: GetShopFlashSaleItemsParams): Promise<GetShopFlashSaleItemsResponse>;
    /**
     * Update shop flash sale items
     *
     * Use this API to update items in a shop flash sale.
     * Can only edit items/models in disabled or enabled status.
     * Cannot modify price or stock of enabled items, must disable first.
     *
     * @param params - Parameters containing flash_sale_id and items
     * @returns A promise that resolves to the result with any failed items
     *
     * @example
     * ```typescript
     * const result = await sdk.shopFlashSale.updateShopFlashSaleItems({
     *   flash_sale_id: 802063533822541,
     *   items: [
     *     {
     *       item_id: 3744623870,
     *       purchase_limit: 10,
     *       models: [
     *         {
     *           model_id: 5414485721,
     *           status: 1, // enable
     *           input_promo_price: 65.0,
     *           stock: 150
     *         }
     *       ]
     *     }
     *   ]
     * });
     * console.log('Failed items:', result.response.failed_items);
     * ```
     */
    updateShopFlashSaleItems(params: UpdateShopFlashSaleItemsParams): Promise<UpdateShopFlashSaleItemsResponse>;
    /**
     * Delete items from shop flash sale
     *
     * Use this API to delete items from a shop flash sale.
     * Deleting an item will delete all its models/variations.
     *
     * @param params - Parameters containing flash_sale_id and item_ids
     * @returns A promise that resolves to the result with any failed items
     *
     * @example
     * ```typescript
     * const result = await sdk.shopFlashSale.deleteShopFlashSaleItems({
     *   flash_sale_id: 802063533822541,
     *   item_ids: [3744623870, 3744624265]
     * });
     * console.log('Items deleted');
     * ```
     */
    deleteShopFlashSaleItems(params: DeleteShopFlashSaleItemsParams): Promise<DeleteShopFlashSaleItemsResponse>;
    /**
     * Get item criteria for shop flash sale
     *
     * Use this API to get the criteria that items must meet to be eligible
     * for shop flash sales. Criteria vary by product category and region.
     *
     * @param params - No parameters required
     * @returns A promise that resolves to the criteria details
     *
     * @example
     * ```typescript
     * const criteria = await sdk.shopFlashSale.getItemCriteria({});
     * console.log('Criteria:', criteria.response.criteria);
     * console.log('Category mappings:', criteria.response.pair_ids);
     * ```
     */
    getItemCriteria(params?: GetItemCriteriaParams): Promise<GetItemCriteriaResponse>;
}
