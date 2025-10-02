import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
/**
 * GlobalProductManager handles all global product operations for China mainland and Korean sellers.
 * Global products allow sellers to manage products centrally and publish them to multiple shops.
 */
export class GlobalProductManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Get global category list
     *
     * Use this API to get global category list. Only for China mainland sellers and Korean sellers.
     *
     * @param params - Parameters for getting category list
     * @param params.language - Display language. Should be one of "zh-hans", "en"
     *
     * @returns Promise resolving to category list response
     *
     * @example
     * ```typescript
     * const categories = await sdk.globalProduct.getCategory({
     *   language: "en"
     * });
     * ```
     */
    async getCategory(params = {}) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_category", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get global item list
     *
     * Use this API to get global item id list. Only for China mainland sellers and Korean sellers.
     *
     * @param params - Parameters for getting global item list
     * @param params.page_size - The size of one page. Limit is [1,50]
     * @param params.offset - Specifies the starting entry of data to return
     * @param params.update_time_from - The starting date range for retrieving items
     * @param params.update_time_to - The ending date range for retrieving items
     *
     * @returns Promise resolving to global item list response
     *
     * @example
     * ```typescript
     * const items = await sdk.globalProduct.getGlobalItemList({
     *   page_size: 20,
     *   update_time_from: 1611311600,
     *   update_time_to: 1611311631
     * });
     * ```
     */
    async getGlobalItemList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_global_item_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get global item information
     *
     * Use this API to get global item detailed information.
     *
     * @param params - Parameters for getting global item info
     * @param params.global_item_id_list - List of global item IDs to retrieve (max 50)
     *
     * @returns Promise resolving to global item info response
     *
     * @example
     * ```typescript
     * const itemInfo = await sdk.globalProduct.getGlobalItemInfo({
     *   global_item_id_list: [123456, 789012]
     * });
     * ```
     */
    async getGlobalItemInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_global_item_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get global model list
     *
     * Use this API to get global model list for a global item.
     *
     * @param params - Parameters for getting global model list
     * @param params.global_item_id - Global item ID
     *
     * @returns Promise resolving to global model list response
     *
     * @example
     * ```typescript
     * const models = await sdk.globalProduct.getGlobalModelList({
     *   global_item_id: 123456
     * });
     * ```
     */
    async getGlobalModelList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_global_model_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Add a global item
     *
     * Use this API to add a new global item.
     *
     * @param params - Parameters for adding a global item
     * @returns Promise resolving to add global item response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.addGlobalItem({
     *   category_id: 100182,
     *   global_item_name: "Test Product",
     *   description: "This is a test product",
     *   weight: 1.0,
     *   image: {
     *     image_id_list: ["image123"]
     *   }
     * });
     * ```
     */
    async addGlobalItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/add_global_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update a global item
     *
     * Use this API to update an existing global item.
     *
     * @param params - Parameters for updating a global item
     * @returns Promise resolving to update global item response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateGlobalItem({
     *   global_item_id: 123456,
     *   global_item_name: "Updated Product Name",
     *   description: "Updated description"
     * });
     * ```
     */
    async updateGlobalItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_global_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Delete a global item
     *
     * Use this API to delete a global item.
     *
     * @param params - Parameters for deleting a global item
     * @param params.global_item_id - Global item ID to delete
     *
     * @returns Promise resolving to delete global item response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.deleteGlobalItem({
     *   global_item_id: 123456
     * });
     * ```
     */
    async deleteGlobalItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/delete_global_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Add global models
     *
     * Use this API to add models to a global item.
     *
     * @param params - Parameters for adding global models
     * @returns Promise resolving to add global model response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.addGlobalModel({
     *   global_item_id: 123456,
     *   model_list: [{
     *     tier_index: [0, 1],
     *     model_sku: "SKU-001"
     *   }]
     * });
     * ```
     */
    async addGlobalModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/add_global_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update global models
     *
     * Use this API to update existing global models.
     *
     * @param params - Parameters for updating global models
     * @returns Promise resolving to update global model response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateGlobalModel({
     *   global_item_id: 123456,
     *   model_list: [{
     *     global_model_id: 789,
     *     model_sku: "SKU-002"
     *   }]
     * });
     * ```
     */
    async updateGlobalModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_global_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Delete global models
     *
     * Use this API to delete global models.
     *
     * @param params - Parameters for deleting global models
     * @returns Promise resolving to delete global model response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.deleteGlobalModel({
     *   global_item_id: 123456,
     *   global_model_id_list: [789, 790]
     * });
     * ```
     */
    async deleteGlobalModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/delete_global_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Initialize tier variation
     *
     * Use this API to initialize tier variation for a global item.
     *
     * @param params - Parameters for initializing tier variation
     * @returns Promise resolving to init tier variation response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.initTierVariation({
     *   global_item_id: 123456,
     *   tier_variation: [{
     *     name: "Color",
     *     option_list: [
     *       { option: "Red" },
     *       { option: "Blue" }
     *     ]
     *   }],
     *   model_list: [{
     *     tier_index: [0],
     *     model_sku: "SKU-RED"
     *   }]
     * });
     * ```
     */
    async initTierVariation(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/init_tier_variation", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update tier variation
     *
     * Use this API to update tier variation for a global item.
     *
     * @param params - Parameters for updating tier variation
     * @returns Promise resolving to update tier variation response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateTierVariation({
     *   global_item_id: 123456,
     *   tier_variation: [{
     *     name: "Size",
     *     option_list: [
     *       { option: "S" },
     *       { option: "M" },
     *       { option: "L" }
     *     ]
     *   }]
     * });
     * ```
     */
    async updateTierVariation(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_tier_variation", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update global item stock
     *
     * Use this API to update stock for global items or models.
     *
     * @param params - Parameters for updating stock
     * @returns Promise resolving to update stock response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateStock({
     *   global_item_id: 123456,
     *   stock_list: [{
     *     shop_id: 67890,
     *     normal_stock: 100
     *   }]
     * });
     * ```
     */
    async updateStock(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_stock", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update global item price
     *
     * Use this API to update price for global items or models.
     *
     * @param params - Parameters for updating price
     * @returns Promise resolving to update price response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updatePrice({
     *   global_item_id: 123456,
     *   price_list: [{
     *     shop_id: 67890,
     *     original_price: 29.99
     *   }]
     * });
     * ```
     */
    async updatePrice(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_price", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get attribute tree
     *
     * Use this API to get attribute tree for a category.
     *
     * @param params - Parameters for getting attribute tree
     * @param params.category_id - Category ID
     * @param params.language - Language for attribute names
     *
     * @returns Promise resolving to attribute tree response
     *
     * @example
     * ```typescript
     * const attributes = await sdk.globalProduct.getAttributeTree({
     *   category_id: 100182,
     *   language: "en"
     * });
     * ```
     */
    async getAttributeTree(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_attribute_tree", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get brand list
     *
     * Use this API to get brand list for a category.
     *
     * @param params - Parameters for getting brand list
     * @returns Promise resolving to brand list response
     *
     * @example
     * ```typescript
     * const brands = await sdk.globalProduct.getBrandList({
     *   category_id: 100182,
     *   page_size: 20
     * });
     * ```
     */
    async getBrandList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_brand_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get category recommendation
     *
     * Use this API to get category recommendations based on item name.
     *
     * @param params - Parameters for getting category recommendation
     * @param params.global_item_name - Global item name
     *
     * @returns Promise resolving to category recommendation response
     *
     * @example
     * ```typescript
     * const recommendations = await sdk.globalProduct.categoryRecommend({
     *   global_item_name: "iPhone Case"
     * });
     * ```
     */
    async categoryRecommend(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/category_recommend", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get global item limit
     *
     * Use this API to get limits for a category (max images, videos, name length, etc.).
     *
     * @param params - Parameters for getting global item limit
     * @param params.category_id - Category ID
     *
     * @returns Promise resolving to global item limit response
     *
     * @example
     * ```typescript
     * const limits = await sdk.globalProduct.getGlobalItemLimit({
     *   category_id: 100182
     * });
     * ```
     */
    async getGlobalItemLimit(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_global_item_limit", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get publishable shop list
     *
     * Use this API to get list of shops where a global item can be published.
     *
     * @param params - Parameters for getting publishable shops
     * @param params.global_item_id - Global item ID
     *
     * @returns Promise resolving to publishable shop list response
     *
     * @example
     * ```typescript
     * const shops = await sdk.globalProduct.getPublishableShop({
     *   global_item_id: 123456
     * });
     * ```
     */
    async getPublishableShop(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_publishable_shop", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get shop publishable status
     *
     * Use this API to check if shops can publish a specific global item.
     *
     * @param params - Parameters for getting shop publishable status
     * @returns Promise resolving to shop publishable status response
     *
     * @example
     * ```typescript
     * const status = await sdk.globalProduct.getShopPublishableStatus({
     *   global_item_id: 123456,
     *   shop_id_list: [67890, 67891]
     * });
     * ```
     */
    async getShopPublishableStatus(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_shop_publishable_status", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Create publish task
     *
     * Use this API to create a task to publish a global item to multiple shops.
     *
     * @param params - Parameters for creating publish task
     * @returns Promise resolving to create publish task response
     *
     * @example
     * ```typescript
     * const task = await sdk.globalProduct.createPublishTask({
     *   global_item_id: 123456,
     *   shop_list: [
     *     { shop_id: 67890 },
     *     { shop_id: 67891 }
     *   ]
     * });
     * ```
     */
    async createPublishTask(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/create_publish_task", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get publish task result
     *
     * Use this API to get the result of a publish task.
     *
     * @param params - Parameters for getting publish task result
     * @param params.publish_task_id - Publish task ID
     *
     * @returns Promise resolving to publish task result response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.getPublishTaskResult({
     *   publish_task_id: "task123"
     * });
     * ```
     */
    async getPublishTaskResult(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_publish_task_result", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get published list
     *
     * Use this API to get list of shops where a global item has been published.
     *
     * @param params - Parameters for getting published list
     * @param params.global_item_id - Global item ID
     *
     * @returns Promise resolving to published list response
     *
     * @example
     * ```typescript
     * const published = await sdk.globalProduct.getPublishedList({
     *   global_item_id: 123456
     * });
     * ```
     */
    async getPublishedList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_published_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get global item ID by shop item ID
     *
     * Use this API to get the global item ID from a shop item ID.
     *
     * @param params - Parameters for getting global item ID
     * @param params.shop_id - Shop ID
     * @param params.item_id - Item ID in the shop
     *
     * @returns Promise resolving to global item ID response
     *
     * @example
     * ```typescript
     * const globalId = await sdk.globalProduct.getGlobalItemId({
     *   shop_id: 67890,
     *   item_id: 123456
     * });
     * ```
     */
    async getGlobalItemId(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_global_item_id", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get recommended attributes
     *
     * Use this API to get recommended attributes for a global item.
     *
     * @param params - Parameters for getting recommended attributes
     * @param params.global_item_id - Global item ID
     *
     * @returns Promise resolving to recommended attributes response
     *
     * @example
     * ```typescript
     * const attributes = await sdk.globalProduct.getRecommendAttribute({
     *   global_item_id: 123456
     * });
     * ```
     */
    async getRecommendAttribute(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_recommend_attribute", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Search global attribute value list
     *
     * Use this API to search for attribute values.
     *
     * @param params - Parameters for searching attribute values
     * @returns Promise resolving to search attribute value list response
     *
     * @example
     * ```typescript
     * const values = await sdk.globalProduct.searchGlobalAttributeValueList({
     *   category_id: 100182,
     *   attribute_id: 1000,
     *   keyword: "cotton"
     * });
     * ```
     */
    async searchGlobalAttributeValueList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/search_global_attribute_value_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get variations
     *
     * Use this API to get variation information for a global item.
     *
     * @param params - Parameters for getting variations
     * @param params.global_item_id - Global item ID
     *
     * @returns Promise resolving to variations response
     *
     * @example
     * ```typescript
     * const variations = await sdk.globalProduct.getVariations({
     *   global_item_id: 123456
     * });
     * ```
     */
    async getVariations(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_variations", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Set sync field
     *
     * Use this API to set which fields should sync between global item and shop items.
     *
     * @param params - Parameters for setting sync field
     * @returns Promise resolving to set sync field response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.setSyncField({
     *   global_item_id: 123456,
     *   shop_list: [{
     *     shop_id: 67890,
     *     sync_field_list: ["name", "price", "stock"]
     *   }]
     * });
     * ```
     */
    async setSyncField(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/set_sync_field", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get local adjustment rate
     *
     * Use this API to get local price adjustment rates for shops.
     *
     * @param params - Parameters for getting local adjustment rate
     * @returns Promise resolving to local adjustment rate response
     *
     * @example
     * ```typescript
     * const rates = await sdk.globalProduct.getLocalAdjustmentRate({
     *   global_item_id: 123456,
     *   shop_id_list: [67890, 67891]
     * });
     * ```
     */
    async getLocalAdjustmentRate(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_local_adjustment_rate", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Update local adjustment rate
     *
     * Use this API to update local price adjustment rates for shops.
     *
     * @param params - Parameters for updating local adjustment rate
     * @returns Promise resolving to update local adjustment rate response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateLocalAdjustmentRate({
     *   global_item_id: 123456,
     *   adjustment_rate_list: [{
     *     shop_id: 67890,
     *     adjustment_rate: 10.5
     *   }]
     * });
     * ```
     */
    async updateLocalAdjustmentRate(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_local_adjustment_rate", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get size chart list
     *
     * Use this API to get list of size charts.
     *
     * @param params - Parameters for getting size chart list
     * @returns Promise resolving to size chart list response
     *
     * @example
     * ```typescript
     * const sizeCharts = await sdk.globalProduct.getSizeChartList({
     *   page_size: 20
     * });
     * ```
     */
    async getSizeChartList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_size_chart_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get size chart detail
     *
     * Use this API to get detailed information of a size chart.
     *
     * @param params - Parameters for getting size chart detail
     * @param params.size_chart_id - Size chart ID
     *
     * @returns Promise resolving to size chart detail response
     *
     * @example
     * ```typescript
     * const sizeChart = await sdk.globalProduct.getSizeChartDetail({
     *   size_chart_id: "chart123"
     * });
     * ```
     */
    async getSizeChartDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/get_size_chart_detail", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Update size chart
     *
     * Use this API to update a size chart.
     *
     * @param params - Parameters for updating size chart
     * @returns Promise resolving to update size chart response
     *
     * @example
     * ```typescript
     * const result = await sdk.globalProduct.updateSizeChart({
     *   size_chart_id: "chart123",
     *   size_chart_name: "Updated Size Chart",
     *   size_chart_table: {
     *     header: ["Size", "Chest", "Length"],
     *     rows: [
     *       ["S", "90cm", "60cm"],
     *       ["M", "95cm", "65cm"]
     *     ]
     *   }
     * });
     * ```
     */
    async updateSizeChart(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/update_size_chart", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Check size chart support
     *
     * Use this API to check if a category supports size charts.
     *
     * @param params - Parameters for checking size chart support
     * @param params.category_id - Category ID
     *
     * @returns Promise resolving to size chart support response
     *
     * @example
     * ```typescript
     * const support = await sdk.globalProduct.supportSizeChart({
     *   category_id: 100182
     * });
     * ```
     */
    async supportSizeChart(params) {
        const response = await ShopeeFetch.fetch(this.config, "/global_product/support_size_chart", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
}
//# sourceMappingURL=global-product.manager.js.map