import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class ProductManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    /**
     * Get comments for products
     *
     * Use this API to get comments by shop_id, item_id, or comment_id. Can retrieve up to 1000 comments.
     *
     * @param params - The parameters for getting comments
     * @param params.item_id - The identity of product item
     * @param params.comment_id - The identity of comment
     * @param params.cursor - Specifies the starting entry of data to return. Default is empty string
     * @param params.page_size - Maximum number of entries to return per page (between 1 and 100)
     *
     * @returns A promise that resolves to the comment response containing:
     * - request_id: The identifier for API request tracking
     * - error: Error type if any error occurred
     * - message: Error details if any error occurred
     * - response: The response data containing comment list, pagination info
     *
     * @throws {Error} When the API request fails or returns an error
     */
    async getComment(params) {
        const response = await ShopeeFetch.fetch(this.config, `/product/get_comment`, {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Reply to buyer comments in batch
     *
     * Use this API to reply to comments from buyers in batch. You can reply to multiple comments at once.
     *
     * @param params - The parameters for replying to comments
     * @param params.comment_list - List of comments to reply to (between 1 and 100 items)
     * @param params.comment_list[].comment_id - The identity of comment to reply to
     * @param params.comment_list[].comment - The content of the reply (between 1 and 500 characters)
     *
     * @returns A promise that resolves to the reply response containing:
     * - request_id: The identifier for API request tracking
     * - error: Error type if any error occurred
     * - message: Error details if any error occurred
     * - response: The response data containing result list and warnings
     *
     * @throws {Error} When the API request fails or returns an error
     * - product.duplicate_request: You have already replied to this comment
     * - product.comment_length_invalid: Comment length should be between 1 and 500
     * - product.error_permission: Reply comment failed due to invalid shop token
     * - product.error_not_exist: The comment you replied to does not exist
     * - product.duplicate_comment_id: Duplicate comment id in the request
     */
    async replyComment(params) {
        const response = await ShopeeFetch.fetch(this.config, `/product/reply_comment`, {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Use this call to get a list of items.
     *
     * @param params - Parameters for getting item list
     * @param params.offset - Specifies the starting entry of data to return. Default is 0.
     * @param params.page_size - The size of one page (1-100).
     * @param params.update_time_from - Start of date range for item update time.
     * @param params.update_time_to - End of date range for item update time.
     * @param params.item_status - Array of item statuses to filter by.
     *
     * @returns A promise that resolves to the item list response containing:
     * - item: List of item details (item_id, item_status, update_time, tag)
     * - total_count: Total number of items matching the filter
     * - has_next_page: Boolean indicating if there are more items
     * - next_offset: Offset for the next page if has_next_page is true
     * - warning: Optional warning message
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_update_time_range: update_time_to before update_time_from
     * - error_param_item_status: Invalid item status
     * - error_param_shop_id_not_found: Shop ID not found
     * - error_param: Offset over limit
     * - error_item_not_found: Product not found
     */
    async getItemList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Use this API to get basic info of items by a list of item_ids.
     *
     * @param params - Parameters for getting item base info
     * @param params.item_id_list - List of Shopee's unique identifiers for items. Max 50.
     * @param params.need_tax_info - If true, tax_info will be included in the response.
     * @param params.need_complaint_policy - If true, complaint_policy will be included in the response (PL region only).
     *
     * @returns A promise that resolves to the item base info response containing:
     * - item_list: List of detailed item base information including:
     *   - item_id, category_id, item_name, description, item_sku, create_time, update_time
     *   - attribute_list: Item attributes
     *   - price_info: Pricing details (if no models)
     *   - image: Image URLs and IDs
     *   - weight, dimension: Physical characteristics
     *   - logistic_info: Enabled logistics channels and fees
     *   - pre_order: Pre-order status and days to ship
     *   - wholesales: Wholesale pricing tiers
     *   - condition, size_chart, item_status, deboost, has_model, promotion_id
     *   - video_info: Video URLs, thumbnails, and duration
     *   - brand: Brand ID and name
     *   - item_dangerous: Dangerous goods status
     *   - gtin_code, size_chart_id, promotion_image, compatibility_info, scheduled_publish_time
     *   - authorised_brand_id, ssp_id, is_fulfillment_by_shopee
     *   - complaint_policy: (If requested and applicable)
     *   - tax_info: (If requested)
     *   - description_info, description_type: Normal or extended description details
     *   - stock_info_v2: Detailed stock information (summary, seller, Shopee, advance)
     *   - certification_info: Product certifications
     * - warning: Optional warning message
     * - Note: The top-level complaint_policy and tax_info in the response object seem redundant as they are also part of each item in item_list if requested.
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item ID not found
     * - error_param_shop_id_not_found: Shop ID not found
     * - error_invalid_language: Invalid language
     * - error_query_over_itemid_size: Too many item_ids in list
     */
    async getItemBaseInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_base_info", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    /**
     * Get model list of an item
     *
     * Use this API to get model list of an item.
     *
     * @param params - The parameters for getting the model list
     * @param params.item_id - The ID of the item
     *
     * @returns A promise that resolves to the model list response containing:
     * - tier_variation: Variation config of item with option_list and name
     * - model: List of model information including price_info, model_id, tier_index, model_sku, model_status, etc.
     * - standardise_tier_variation: Standardise variation config of item (if available)
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item_id is not found
     * - error_param_shop_id_not_found: Shop_id is not found
     * - error_item_not_found: Product not found
     */
    async getModelList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_model_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Update price of items
     *
     * Use this API to update item price. Can update up to 50 models in one call.
     *
     * @param params - Parameters for updating price
     * @param params.item_id - The ID of the item
     * @param params.price_list - List of prices to update (1-50 items). Each item contains:
     *   - model_id: Model ID (use 0 for items without models)
     *   - original_price: New original price
     *
     * @returns A promise that resolves to the update price response containing:
     * - success_list: List of successfully updated prices
     * - failure_list: List of failed updates with reasons
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item_id is not found
     * - error_param_shop_id_not_found: Shop_id is not found
     * - error_param: Invalid parameters
     */
    async updatePrice(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_price", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update stock of items
     *
     * Use this API to update item stock. Can update up to 50 models in one call.
     * This API updates only "seller_stock".
     *
     * @param params - Parameters for updating stock
     * @param params.item_id - The ID of the item
     * @param params.stock_list - List of stock updates (1-50 items). Each item contains:
     *   - model_id: Model ID (use 0 for items without models)
     *   - seller_stock: Array of seller stock updates with location_id and stock amount
     *
     * @returns A promise that resolves to the update stock response containing:
     * - success_list: List of successfully updated stock
     * - failure_list: List of failed updates with reasons
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item_id is not found
     * - error_param_shop_id_not_found: Shop_id is not found
     * - error_param: Invalid parameters
     */
    async updateStock(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_stock", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Delete a product item
     *
     * Use this API to delete a product item.
     *
     * @param params - Parameters for deleting item
     * @param params.item_id - The ID of the item to delete
     *
     * @returns A promise that resolves to the delete response
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item_id is not found
     * - error_param_shop_id_not_found: Shop_id is not found
     * - error_cannot_delete_item: Delete item failed
     */
    async deleteItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/delete_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Unlist or list items
     *
     * Use this API to unlist or list items. Can process up to 50 items in one call.
     *
     * @param params - Parameters for unlisting/listing items
     * @param params.item_list - List of items to unlist/list (1-50 items). Each item contains:
     *   - item_id: Shopee's unique identifier for an item
     *   - unlist: true to unlist, false to list
     *
     * @returns A promise that resolves to the unlist response containing:
     * - result: List of operation results with success status and error messages
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_item_not_found: Item_id is not found
     * - error_param_shop_id_not_found: Shop_id is not found
     * - error_param: Invalid parameters
     */
    async unlistItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/unlist_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get category tree
     *
     * Use this API to get category tree data.
     *
     * @param params - Parameters for getting categories
     * @param params.language - Language for category names (optional)
     *
     * @returns A promise that resolves to the category response containing:
     * - category_list: List of categories with id, parent_id, name, and has_children
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_param: Invalid parameters
     */
    async getCategory(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_category", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    /**
     * Add a new item
     *
     * Use this API to add a new product item to the shop.
     *
     * @param params - Parameters for adding item
     * @returns Promise resolving to add item response with item_id
     */
    async addItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/add_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update an existing item
     *
     * Use this API to update an existing product item.
     *
     * @param params - Parameters for updating item
     * @returns Promise resolving to update item response
     */
    async updateItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Add models/variations to an item
     *
     * Use this API to add product models/variations.
     *
     * @param params - Parameters for adding models
     * @returns Promise resolving to add model response with model IDs
     */
    async addModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/add_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update models/variations
     *
     * Use this API to update product models/variations.
     *
     * @param params - Parameters for updating models
     * @returns Promise resolving to update model response
     */
    async updateModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Delete models/variations
     *
     * Use this API to delete product models/variations.
     *
     * @param params - Parameters for deleting models
     * @returns Promise resolving to delete model response
     */
    async deleteModel(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/delete_model", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Initialize tier variations
     *
     * Use this API to initialize tier variations for an item.
     *
     * @param params - Parameters for initializing tier variations
     * @returns Promise resolving to init tier variation response
     */
    async initTierVariation(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/init_tier_variation", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Update tier variations
     *
     * Use this API to update tier variations for an item.
     *
     * @param params - Parameters for updating tier variations
     * @returns Promise resolving to update tier variation response
     */
    async updateTierVariation(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_tier_variation", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Search items
     *
     * Use this API to search for items in the shop.
     *
     * @param params - Parameters for searching items
     * @returns Promise resolving to search item response
     */
    async searchItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/search_item", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get item extra info
     *
     * Use this API to get extra information (sales, views, likes) for items.
     *
     * @param params - Parameters for getting item extra info
     * @returns Promise resolving to item extra info response
     */
    async getItemExtraInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_extra_info", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    /**
     * Get attribute tree
     *
     * Use this API to get the attribute tree for a category.
     *
     * @param params - Parameters for getting attribute tree
     * @returns Promise resolving to attribute tree response
     */
    async getAttributeTree(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_attribute_tree", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get brand list
     *
     * Use this API to get the list of brands for a category.
     *
     * @param params - Parameters for getting brand list
     * @returns Promise resolving to brand list response
     */
    async getBrandList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_brand_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Register a brand
     *
     * Use this API to register a new brand.
     *
     * @param params - Parameters for registering brand
     * @returns Promise resolving to register brand response
     */
    async registerBrand(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/register_brand", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get category recommendation
     *
     * Use this API to get category recommendations based on item name.
     *
     * @param params - Parameters for category recommendation
     * @returns Promise resolving to category recommendation response
     */
    async categoryRecommend(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/category_recommend", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get item limits
     *
     * Use this API to get item limits for a category.
     *
     * @param params - Parameters for getting item limits
     * @returns Promise resolving to item limit response
     */
    async getItemLimit(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_limit", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get item promotion
     *
     * Use this API to get promotion information for items.
     *
     * @param params - Parameters for getting item promotion
     * @returns Promise resolving to item promotion response
     */
    async getItemPromotion(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_promotion", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    /**
     * Boost items
     *
     * Use this API to boost items for better visibility.
     *
     * @param params - Parameters for boosting items
     * @returns Promise resolving to boost item response
     */
    async boostItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/boost_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    /**
     * Get boosted item list
     *
     * Use this API to get the list of boosted items.
     *
     * @returns Promise resolving to boosted list response
     */
    async getBoostedList() {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_boosted_list", {
            method: "GET",
            auth: true,
            params: {},
        });
        return response;
    }
    /**
     * Get variations
     *
     * Use this API to get variation information for an item.
     *
     * @param params - Parameters for getting variations
     * @returns Promise resolving to variations response
     */
    async getVariations(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_variations", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get recommended attributes
     *
     * Use this API to get recommended attributes for a category.
     *
     * @param params - Parameters for getting recommended attributes
     * @returns Promise resolving to recommended attributes response
     */
    async getRecommendAttribute(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_recommend_attribute", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Search attribute values
     *
     * Use this API to search for attribute values.
     *
     * @param params - Parameters for searching attribute values
     * @returns Promise resolving to attribute value list response
     */
    async searchAttributeValueList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/search_attribute_value_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get main item list
     *
     * Use this API to get the main item list.
     *
     * @param params - Parameters for getting main item list
     * @returns Promise resolving to main item list response
     */
    async getMainItemList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_main_item_list", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    /**
     * Get item violation info
     *
     * Use this API to get violation information for items.
     *
     * @param params - Parameters for getting item violation info
     * @returns Promise resolving to item violation info response
     */
    async getItemViolationInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_violation_info", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    /**
     * Get weight recommendation
     *
     * Use this API to get weight recommendations for an item.
     *
     * @param params - Parameters for getting weight recommendation
     * @returns Promise resolving to weight recommendation response
     */
    async getWeightRecommendation(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_weight_recommendation", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    /**
     * Get direct item list
     *
     * Use this API to get the direct item list.
     *
     * @param params - Parameters for getting direct item list
     * @returns Promise resolving to direct item list response
     */
    async getDirectItemList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_direct_item_list", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    /**
     * Get item content diagnosis result
     *
     * Use this API to get content diagnosis results for items.
     *
     * @param params - Parameters for getting content diagnosis result
     * @returns Promise resolving to content diagnosis result response
     */
    async getItemContentDiagnosisResult(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_content_diagnosis_result", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    /**
     * Get item list by content diagnosis
     *
     * Use this API to get items filtered by content diagnosis status.
     *
     * @param params - Parameters for getting item list by content diagnosis
     * @returns Promise resolving to item list by content diagnosis response
     */
    async getItemListByContentDiagnosis(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_item_list_by_content_diagnosis", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    // Kit Item Management
    async addKitItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/add_kit_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    async updateKitItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_kit_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    async getKitItemInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_kit_item_info", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                item_id_list: params.item_id_list.join(","),
            },
        });
        return response;
    }
    async getKitItemLimit(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_kit_item_limit", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    async generateKitImage(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/generate_kit_image", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    // SSP Management
    async addSspItem(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/add_ssp_item", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    async getSspInfo(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_ssp_info", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    async getSspList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_ssp_list", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    async linkSsp(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/link_ssp", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    async unlinkSsp(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/unlink_ssp", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    async updateSipItemPrice(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/update_sip_item_price", {
            method: "POST",
            auth: true,
            body: params,
        });
        return response;
    }
    // Size Chart Management
    async getSizeChartList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_size_chart_list", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    async getSizeChartDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_size_chart_detail", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    // Vehicle Compatibility
    async getAllVehicleList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_all_vehicle_list", {
            method: "GET",
            auth: true,
            params: params || {},
        });
        return response;
    }
    async getVehicleListByCompatibilityDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_vehicle_list_by_compatibility_detail", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    // Specialized Functions
    async getAitemByPitemId(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_aitem_by_pitem_id", {
            method: "GET",
            auth: true,
            params: {
                ...params,
                pitem_id_list: params.pitem_id_list.join(","),
            },
        });
        return response;
    }
    async getDirectShopRecommendedPrice(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_direct_shop_recommended_price", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    async getProductCertificationRule(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/get_product_certification_rule", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
    async searchUnpackagedModelList(params) {
        const response = await ShopeeFetch.fetch(this.config, "/product/search_unpackaged_model_list", {
            method: "GET",
            auth: true,
            params,
        });
        return response;
    }
}
//# sourceMappingURL=product.manager.js.map