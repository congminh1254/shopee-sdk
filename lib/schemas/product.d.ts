import { FetchResponse } from "./fetch.js";
import { BaseResponse } from "./base.js";
import { Attribute } from "./attribute.js";
/**
 * Enum for item status
 */
export declare enum ItemStatus {
    NORMAL = "NORMAL",
    BANNED = "BANNED",
    UNLIST = "UNLIST",
    REVIEWING = "REVIEWING",
    SELLER_DELETE = "SELLER_DELETE",
    SHOPEE_DELETE = "SHOPEE_DELETE"
}
/**
 * Parameters for getting product comments
 * Use this API to get comments by shop_id, item_id, or comment_id, up to 1000 comments.
 */
export type GetCommentParams = {
    /** The identity of product item */
    item_id?: number;
    /** The identity of comment */
    comment_id?: number;
    /** Specifies the starting entry of data to return in the current call. Default is empty string */
    cursor: string;
    /** Maximum number of entries to return per page (between 1 and 100) */
    page_size: number;
};
/**
 * Comment reply information
 */
export type CommentReply = {
    /** The content of reply */
    reply: string;
    /** Whether the reply is hidden or not */
    hidden: boolean;
    /** The time the seller replied to the comment */
    create_time: number;
};
/**
 * Media information for a comment
 */
export type CommentMedia = {
    /** List of image URLs uploaded by the buyer in the comment */
    image_url_list: string[];
    /** List of video URLs uploaded by the buyer in the comment */
    video_url_list: string[];
};
/**
 * Individual comment information
 */
export type CommentItem = {
    /** Shopee's unique identifier for an order */
    order_sn: string;
    /** The identity of comment */
    comment_id: number;
    /** The content of the comment */
    comment: string;
    /** The username of the buyer who posted the comment */
    buyer_username: string;
    /** The commented item's id */
    item_id: number;
    /** Shopee's unique identifier for a model of an item (will be offline on 2024-12-27) */
    model_id: number;
    /** List of model IDs of the buyer's purchase corresponding to the comment */
    model_id_list: number[];
    /** Buyer's rating for the item (1-5) */
    rating_star: number;
    /** The editable status of the comment (EXPIRED/EDITABLE/HAVE_EDIT_ONCE) */
    editable: string;
    /** Whether the comment is hidden or not */
    hidden: boolean;
    /** The create time of the comment */
    create_time: number;
    /** The reply information for the comment */
    comment_reply?: CommentReply;
    /** Media information for the comment */
    media: CommentMedia;
};
/**
 * Response for getting product comments
 */
export interface GetCommentResponse extends FetchResponse<{
    /** List of comments */
    item_comment_list: CommentItem[];
    /** Indicates if there are more comments to fetch */
    more: boolean;
    /** Cursor for the next page of results */
    next_cursor: string;
}> {
}
/**
 * Comment item for replying to comments
 */
export type ReplyCommentItem = {
    /** The identity of comment to reply to */
    comment_id: number;
    /** The content of the reply (between 1 and 500 characters) */
    comment: string;
};
/**
 * Parameters for replying to comments in batch
 */
export type ReplyCommentParams = {
    /** The list of comments to reply to (between 1 and 100 items) */
    comment_list: ReplyCommentItem[];
};
/**
 * Result item for a comment reply operation
 */
export type ReplyCommentResultItem = {
    /** The identity of comment that was replied to */
    comment_id: number;
    /** Error type if the reply failed for this comment */
    fail_error?: string;
    /** Error message if the reply failed for this comment */
    fail_message?: string;
};
/**
 * Response for replying to comments
 */
export interface ReplyCommentResponse extends FetchResponse<{
    /** The result list of the request comment list */
    result_list: ReplyCommentResultItem[];
    /** Warning messages to take care of */
    warning?: string[];
}> {
}
/**
 * Parameters for getting item list
 */
export type GetItemListParams = {
    /** Specifies the starting entry of data to return in the current call. Default is 0. */
    offset: number;
    /** The size of one page. Max=100 */
    page_size: number;
    /** The starting date range for retrieving orders (based on the item update time) */
    update_time_from?: number;
    /** The ending date range for retrieving orders (based on the item update time) */
    update_time_to?: number;
    /** Item status filter. If multiple, use separate parameters (e.g. item_status=NORMAL&item_status=BANNED) */
    item_status: ItemStatus[];
};
/**
 * Item tag details
 */
export interface ItemTag {
    /** Indicate if the item is kit item. */
    kit?: boolean;
}
/**
 * Item details in the list for GetItemList API
 */
export interface ItemListItemInfo {
    /** Shopee's unique identifier for an item. */
    item_id: number;
    /** Current status of the item. */
    item_status: ItemStatus;
    /** The update time of item. */
    update_time: number;
    /** Item tag information. */
    tag?: ItemTag;
}
/**
 * Response for get item list API
 */
export interface GetItemListResponse extends BaseResponse {
    /** Warning details if any. */
    warning?: string;
    response: {
        /** List of item info with item_id, item_status, update_time. */
        item: ItemListItemInfo[];
        /** Total count of all items. */
        total_count: number;
        /** Indicates whether there are more items to retrieve. */
        has_next_page: boolean;
        /** If has_next_page is true, use this value for the next request's offset. */
        next_offset: number;
    };
}
/**
 * Parameters for getting item base information
 */
export type GetItemBaseInfoParams = {
    /** List of item IDs. Limit [0,50] */
    item_id_list: number[];
    /** If true, response will include tax_info */
    need_tax_info?: boolean;
    /** If true, response will include complaint_policy */
    need_complaint_policy?: boolean;
};
/**
 * Price information for an item
 */
export interface PriceInfo {
    /** The three-digit code representing the currency unit used for the item in Shopee Listings. */
    currency: string;
    /** The original price of the item in the listing currency. */
    original_price: number;
    /** The current price of the item in the listing currency. */
    current_price: number;
    /** The After-tax original price of the item in the listing currency. */
    inflated_price_of_original_price: number;
    /** The After-tax current price of the item in the listing currency. */
    inflated_price_of_current_price: number;
    /** The price of the item in sip. If item is for CNSC primary shop, this field will not be returned */
    sip_item_price?: number;
    /** source of sip' price. ( auto or manual).If item is for CNSC SIP primary shop, this field will not be returned */
    sip_item_price_source?: string;
}
/**
 * Image information
 */
export interface ImageInfo {
    /** List of image url. */
    image_url_list: string[];
    /** List of image id. */
    image_id_list: string[];
    /** Image ratio */
    image_ratio?: string;
}
/**
 * Dimension details
 */
export interface Dimension {
    /** The length of package for this item, the unit is CM. */
    package_length: number;
    /** The width of package for this item, the unit is CM. */
    package_width: number;
    /** The height of package for this item, the unit is CM. */
    package_height: number;
}
/**
 * Logistic information for an item
 */
export interface LogisticInfo {
    /** The identity of logistic channel. */
    logistic_id: number;
    /** The name of logistic. */
    logistic_name: string;
    /** Related to shopee.logistics.GetLogistics result.logistics.enabled only affect current item. */
    enabled: boolean;
    /** Only needed when logistics fee_type = CUSTOM_PRICE. */
    shipping_fee?: number;
    /** If specify logistic fee_type is SIZE_SELECTION size_id is required. */
    size_id?: number;
    /** when seller chooses this option, the shipping fee of this channel on item will be set to 0. Default value is False. */
    is_free: boolean;
    /** Estimated shipping fee calculated by weight. Don't exist if channel is no-integrated. */
    estimated_shipping_fee?: number;
}
/**
 * Pre-order details
 */
export interface PreOrder {
    /** Pre-order will be set true. */
    is_pre_order: boolean;
    /** The days to ship. Only work for pre-orde. */
    days_to_ship: number;
}
/**
 * Wholesale tier details
 */
export interface Wholesale {
    /** The min count of this tier wholesale. */
    min_count: number;
    /** The max count of this tier wholesale. */
    max_count: number;
    /** The current price of the wholesale in the listing currency.If item is in promotion, this price is useless. */
    unit_price: number;
    /** The After-tax Price of the wholesale show to buyer. */
    inflated_price_of_unit_price: number;
}
/**
 * Video information
 */
export interface VideoInfo {
    /** Url of video. */
    video_url: string;
    /** Thumbnail of video. */
    thumbnail_url: string;
    /** Duration of video. */
    duration: number;
}
/**
 * Brand information
 */
export interface BrandInfo {
    /** Id of brand. */
    brand_id: number;
    /** Original name of brand. */
    original_brand_name: string;
}
/**
 * Promotion image details
 */
export interface PromotionImage {
    /** Promotion image id list */
    image_id_list?: string[];
    /** Promotion image url list */
    image_url_list?: string[];
    /** Promotion image ratio */
    image_ratio?: string;
}
/**
 * Vehicle information for compatibility
 */
export interface VehicleInfo {
    /** ID of the brand. */
    brand_id?: number;
    /** ID of the model. */
    model_id?: number;
    /** ID of the year. */
    year_id?: number;
    /** ID of the version. */
    version_id?: number;
}
/**
 * Compatibility information
 */
export interface CompatibilityInfo {
    /** List of vehicle information */
    vehicle_info_list?: VehicleInfo[];
}
/**
 * Complaint policy details (PL region)
 */
export interface ComplaintPolicy {
    /** Time for a warranty claim. Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS. */
    warranty_time: string;
    /** If True means "I exclude warranty complaints for entrepreneur" */
    exclude_entrepreneur_warranty: boolean;
    /** The identity of complaint address. */
    complaint_address_id: number;
    /** Additional information for complaint policy */
    additional_information: string;
}
/**
 * Group item tax information (BR region)
 */
export interface GroupItemTaxInfo {
    /** Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter 6. */
    group_qtd?: string;
    /** Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter UNI for the individual can. */
    group_unit?: string;
    /** Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unity), enter the value of the individual can. */
    group_unit_value?: string;
    /** Example: The item is a package that contains 6 soda cans. Enter the price of the whole package. */
    original_group_price?: string;
    /** Example: The item is a package that contains 6 soda cans. Please inform the GTIN SSCC code for the package. */
    group_gtin_sscc?: string;
    /** Example: The item is box, that contain 6 packages. Each package contains 6 soda cans. Please inform the GRAI GTIN SSCC code for the Box. */
    group_grai_gtin_sscc?: string;
}
/**
 * Tax information (region-specific)
 */
export interface TaxInfo {
    /** Mercosur Common Nomenclature (BR region). Note: ncm = "00" means no NCM. */
    ncm?: string;
    /** Tax Code of Operations and Installments for orders that seller and buyer are in different states (BR region). */
    diff_state_cfop?: string;
    /** Code of Operation Status – Simples Nacional (BR region). */
    csosn?: string;
    /** Product source, domestic or foreign (BR region). */
    origin?: string;
    /** Tax Replacement Specifying Code (CEST) (BR region). Note: cest = "00" means no CEST. */
    cest?: string;
    /** Measure unit (BR region). */
    measure_unit?: string;
    /** Invoice option (PL region). Value should be one of NO_INVOICES VAT_MARGIN_SCHEME_INVOICES VAT_INVOICES NON_VAT_INVOICES. If NON_VAT_INVOICE, vat_rate is null. */
    invoice_option?: string;
    /** VAT rate (PL region). Value should be one of 0% 5% 8% 23% NO_VAT_RATE. */
    vat_rate?: string;
    /** HS Code (IN region). */
    hs_code?: string;
    /** Tax Code (IN region). */
    tax_code?: string;
    /** Tax type for TW whitelist shop (0: no tax, 1: taxable, 2: tax-free). */
    tax_type?: number;
    /** PIS - Social Integration Program percentage (BR region). */
    pis?: string;
    /** COFINS - Contribution for Social Security Funding percentage (BR region). */
    cofins?: string;
    /** ICMS CST - Tax Situation Code for ICMS (BR region). */
    icms_cst?: string;
    /** PIS/COFINS CST - Tax Situation Code for PIS/COFINS (BR region). */
    pis_cofins_cst?: string;
    /** Total percentage of federal, state, and municipal taxes (BR region). */
    federal_state_taxes?: string;
    /** Operation type (1: Retailer, 2: Manufacturer) (BR region). */
    operation_type?: string;
    /** EXTIPI - Exception to IPI tax rate (BR region). */
    ex_tipi?: string;
    /** FCI Control Number for import FCI (BR region). */
    fci_num?: string;
    /** RECOPI NACIONAL number for tax-exempt paper (BR region). */
    recopi_num?: string;
    /** Additional invoice information (BR region). */
    additional_info?: string;
    /** Group item tax information (BR region). Required if item is a group item. */
    group_item_info?: GroupItemTaxInfo;
    /** Export CFOP for goods exported to other countries (7101: self-produced, 7102: third-party resale) (BR region). */
    export_cfop?: string;
}
/**
 * Extended description image details
 */
export interface ExtendedDescriptionImage {
    /** Image id */
    image_id: string;
    /** Image url. */
    image_url: string;
}
/**
 * Extended description field details
 */
export interface ExtendedDescriptionField {
    /** Type of extended description field: text, image. */
    field_type: string;
    /** If field_type is text, text information will be returned through this field. */
    text?: string;
    /** If field_type is image, image url will be returned through this field. */
    image_info?: ExtendedDescriptionImage;
}
/**
 * Extended description details
 */
export interface ExtendedDescription {
    /** Field of extended description */
    field_list: ExtendedDescriptionField[];
}
/**
 * Description information
 */
export interface DescriptionInfo {
    /** If description_type is extended , Description information will be returned through this field. */
    extended_description?: ExtendedDescription;
}
/**
 * Stock summary information
 */
export interface StockSummaryInfo {
    /** Stock reserved for promotion. For SIP P Item, total reserved stock for P Item and all A Items. */
    total_reserved_stock?: number;
    /** Total available stock */
    total_available_stock?: number;
}
/**
 * Seller stock details
 */
export interface SellerStock {
    /** Location id */
    location_id?: string;
    /** Stock in the current warehouse */
    stock?: number;
    /** To return if the stock of the location id is saleable */
    if_saleable?: boolean;
}
/**
 * Shopee stock details
 */
export interface ShopeeStock {
    /** Location id */
    location_id?: string;
    /** Stock */
    stock?: number;
}
/**
 * Advance stock details (PH/VN/ID/MY local selected shops)
 */
export interface AdvanceStock {
    /** Advance Fulfillment stock that Seller has shipped out and is available to be used to fulfill an order. */
    sellable_advance_stock?: number;
    /** Advance Fulfillment stock that seller has shipped out and is still in transit and unavailable to be used to fulfill an order. */
    in_transit_advance_stock?: number;
}
/**
 * Stock information V2
 */
export interface StockInfoV2 {
    /** Stock summary info */
    summary_info?: StockSummaryInfo;
    /** Seller stock */
    seller_stock?: SellerStock[];
    /** Shopee stock */
    shopee_stock?: ShopeeStock[];
    /** Advance stock details */
    advance_stock?: AdvanceStock;
}
/**
 * Certification proof details
 */
export interface CertificationProof {
    image_id?: string;
    image_url?: string;
    name?: string;
}
/**
 * Certification information
 */
export interface CertificationInfo {
    certification_type?: number;
    certification_no?: string;
    certification_proofs?: CertificationProof[];
    expire_time?: number;
    permit_id?: number;
}
/**
 * Base information for an item
 */
export interface ItemBaseInfo {
    /** Shopee's unique identifier for an item. */
    item_id: number;
    /** Shopee's unique identifier for a category. */
    category_id: number;
    /** Name of the item in local language. */
    item_name: string;
    /** if description_type is normal , Description information will be returned through this field，else description will be empty */
    description?: string;
    /** An item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. */
    item_sku?: string;
    /** Timestamp that indicates the date and time that the item was created. */
    create_time: number;
    /** Timestamp that indicates the last time that there was a change in value of the item. */
    update_time: number;
    /** List of attributes */
    attribute_list?: Attribute[];
    /** Price information. If item has models, this is not returned. Use get_model_list instead. */
    price_info?: PriceInfo[];
    /** Image information */
    image?: ImageInfo;
    /** The weight of this item, the unit is KG. */
    weight?: string;
    /** The dimension of this item. */
    dimension?: Dimension;
    /** The logistics list. */
    logistic_info?: LogisticInfo[];
    /** Pre-order details. */
    pre_order?: PreOrder;
    /** The wholesales tier list. */
    wholesales?: Wholesale[];
    /** Is it second-hand. NEW/USED */
    condition?: string;
    /** Url of size chart image. */
    size_chart?: string;
    /** Current status of the item. */
    item_status: ItemStatus;
    /** If deboost is true, means that the item's search ranking is lowered. */
    deboost?: boolean;
    /** Does it contain model. */
    has_model: boolean;
    /** Promotion ID */
    promotion_id?: number;
    /** Info of video list. */
    video_info?: VideoInfo[];
    /** Brand information. */
    brand?: BrandInfo;
    /** Item dangerous status (0: non-dangerous, 1: dangerous). Indonesia and Malaysia local sellers only. */
    item_dangerous?: number;
    /** GTIN code for BR region. "00" means item without GTIN. */
    gtin_code?: string;
    /** ID of new size chart. */
    size_chart_id?: number;
    /** Promotion image details */
    promotion_image?: PromotionImage;
    /** Compatibility information */
    compatibility_info?: CompatibilityInfo;
    /** Scheduled publish time of this item. */
    scheduled_publish_time?: number;
    /** ID of authorised reseller brand. */
    authorised_brand_id?: number;
    /** Shopee's unique identifier for Shopee Standard Product. */
    ssp_id?: number;
    /** Return true if the item only has a default model and it is FBS model */
    is_fulfillment_by_shopee?: boolean;
    /** Complaint policy. Only returned for local PL sellers, and need_complaint_policy in request is true. */
    complaint_policy?: ComplaintPolicy;
    /** Tax information. Only returned if need_tax_info in request is true. */
    tax_info?: TaxInfo;
    /** Description information. Only whitelist sellers can use it. */
    description_info?: DescriptionInfo;
    /** Type of description: normal, extended. */
    description_type?: string;
    /** New stock object */
    stock_info_v2?: StockInfoV2;
    /** Certification information */
    certification_info?: CertificationInfo[];
}
/**
 * Response for get item base info API
 */
export interface GetItemBaseInfoResponse extends BaseResponse {
    /** Warning details if any. */
    warning?: string;
    response: {
        /** List of item base information. */
        item_list: ItemBaseInfo[];
        /** Complaint policy. Only returned for local PL sellers, and need_complaint_policy in request is true. */
        complaint_policy?: ComplaintPolicy;
        /** Tax information. Only returned if need_tax_info in request is true. */
        tax_info?: TaxInfo;
    };
}
/**
 * Parameters for getting model list of an item
 */
export type GetModelListParams = {
    /** The ID of the item */
    item_id: number;
};
/**
 * Option information in variation
 */
export interface VariationOption {
    /** Option name */
    option: string;
    /** Image information for the option */
    image?: {
        /** Id of image */
        image_id?: string;
        /** Url of image */
        image_url?: string;
    };
}
/**
 * Tier variation information
 */
export interface TierVariation {
    /** List of options for this variation */
    option_list: VariationOption[];
    /** Variation name */
    name: string;
}
/**
 * Model price information
 */
export interface ModelPriceInfo {
    /** Currency for the item price */
    currency?: string;
    /** Current price of item */
    current_price: number;
    /** Original price of item */
    original_price: number;
    /** Original price of item after tax */
    inflated_price_of_original_price: number;
    /** Current price of item after tax */
    inflated_price_of_current_price: number;
    /** SIP item price. Only returned for SIP primary shop */
    sip_item_price?: number;
    /** SIP item price source, could be manual or auto. Only returned for SIP primary shop */
    sip_item_price_source?: string;
    /** The currency of sip_item_price. Only returned for SIP primary shop */
    sip_item_price_currency?: string;
}
/**
 * Pre-order information for the model
 */
export interface ModelPreOrder {
    /** Whether the model is on pre-order */
    is_pre_order: boolean;
    /** The days to ship for pre-order */
    days_to_ship: number;
}
/**
 * Model stock information
 */
export interface ModelStockInfoV2 {
    /** Stock summary info */
    summary_info?: StockSummaryInfo;
    /** Seller stock */
    seller_stock?: SellerStock[];
    /** Shopee stock */
    shopee_stock?: ShopeeStock[];
    /** Advance stock details */
    advance_stock?: AdvanceStock;
}
/**
 * Model dimension information
 */
export interface ModelDimension {
    /** The height of package for this model, the unit is CM */
    package_height: number;
    /** The length of package for this model, the unit is CM */
    package_length: number;
    /** The width of package for this model, the unit is CM */
    package_width: number;
}
/**
 * Individual model information
 */
export interface ModelInfo {
    /** Price information for this model */
    price_info: ModelPriceInfo[];
    /** Model ID */
    model_id?: number;
    /** Tier index of this model */
    tier_index?: number[];
    /** Current promotion ID of this model */
    promotion_id?: number;
    /** SKU of this model */
    model_sku?: string;
    /** The model status, either MODEL_NORMAL or MODEL_UNAVAILABLE */
    model_status?: string;
    /** Pre-order information */
    pre_order?: ModelPreOrder;
    /** Stock information v2 */
    stock_info_v2?: ModelStockInfoV2;
    /** GTIN code (only available for TW seller and BR local seller) */
    gtin_code?: string;
    /** The weight of this model, the unit is KG */
    weight?: string;
    /** The dimension of this model */
    dimension?: ModelDimension;
    /** Whether model is fulfillment by shopee */
    is_fulfillment_by_shopee?: boolean;
    /** Name of the model */
    model_name?: string;
}
/**
 * Standardized variation option
 */
export interface StandardVariationOption {
    /** Standardize Option ID */
    variation_option_id?: number;
    /** Standardize Option Name */
    variation_option_name?: string;
    /** ID of image */
    image_id?: string;
    /** URL of image */
    image_url?: string;
}
/**
 * Standardized variation information
 */
export interface StandardiseTierVariation {
    /** Standardize Variation ID */
    variation_id?: number;
    /** Standardize Variation Name */
    variation_name?: string;
    /** Standardize Variation Group ID */
    variation_group_id?: number;
    /** Standardize Variation Option List */
    variation_option_list?: StandardVariationOption[];
}
/**
 * Response for getting model list
 */
export interface GetModelListResponse extends FetchResponse<{
    /** Variation config of item */
    tier_variation: TierVariation[];
    /** Model list */
    model: ModelInfo[];
    /** Standardise Variation config of item */
    standardise_tier_variation?: StandardiseTierVariation[];
}> {
}
/**
 * Price list item for updating product price
 */
export interface PriceListItem {
    /** Model ID. Use 0 for items without models */
    model_id?: number;
    /** Original price for this model */
    original_price: number;
}
/**
 * Parameters for updating product price
 */
export type UpdatePriceParams = {
    /** Item ID */
    item_id: number;
    /** List of prices to update. Length should be between 1 to 50 */
    price_list: PriceListItem[];
};
/**
 * Result of a single price update
 */
export interface UpdatePriceResultItem {
    /** Model ID that was updated */
    model_id: number;
    /** Original price that was set */
    original_price: number;
}
/**
 * Response for updating product price
 */
export interface UpdatePriceResponse extends FetchResponse<{
    /** List of successfully updated prices */
    success_list?: UpdatePriceResultItem[];
    /** List of failed updates */
    failure_list?: {
        /** Model ID that failed */
        model_id: number;
        /** Failure error message */
        failed_reason: string;
    }[];
}> {
}
/**
 * Seller stock information for stock update
 */
export interface SellerStockUpdate {
    /** Location ID from v2.shop.get_warehouse_detail API */
    location_id?: string;
    /** Stock amount */
    stock: number;
}
/**
 * Stock list item for updating stock
 */
export interface StockListItem {
    /** Model ID. Use 0 for items without models */
    model_id?: number;
    /** New seller stock info */
    seller_stock: SellerStockUpdate[];
}
/**
 * Parameters for updating product stock
 */
export type UpdateStockParams = {
    /** Item ID */
    item_id: number;
    /** List of stock updates. Length should be between 1 to 50 */
    stock_list: StockListItem[];
};
/**
 * Result of a single stock update
 */
export interface UpdateStockResultItem {
    /** Model ID that was updated */
    model_id: number;
    /** Seller stock that was updated */
    seller_stock: SellerStockUpdate[];
}
/**
 * Response for updating product stock
 */
export interface UpdateStockResponse extends FetchResponse<{
    /** List of successfully updated stock */
    success_list?: UpdateStockResultItem[];
    /** List of failed updates */
    failure_list?: {
        /** Model ID that failed */
        model_id: number;
        /** Failure error message */
        failed_reason: string;
    }[];
}> {
}
/**
 * Parameters for deleting a product item
 */
export type DeleteItemParams = {
    /** The ID of the product item to delete */
    item_id: number;
};
/**
 * Response for deleting a product item
 */
export interface DeleteItemResponse extends BaseResponse {
}
/**
 * Item in the unlist request
 */
export interface UnlistItemInfo {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** Unlist (true) or list (false) */
    unlist: boolean;
}
/**
 * Parameters for unlisting/listing items
 */
export type UnlistItemParams = {
    /** List of items to unlist/list. Length should be between 1 to 50 */
    item_list: UnlistItemInfo[];
};
/**
 * Result of a single unlist operation
 */
export interface UnlistItemResultItem {
    /** Item ID that was processed */
    item_id: number;
    /** Whether operation was successful */
    success: boolean;
    /** Error message if failed */
    failed_reason?: string;
}
/**
 * Response for unlisting/listing items
 */
export interface UnlistItemResponse extends FetchResponse<{
    /** List of results */
    result?: UnlistItemResultItem[];
}> {
}
/**
 * Category information
 */
export interface CategoryInfo {
    /** The ID of category */
    category_id: number;
    /** The ID of parent category (if any) */
    parent_category_id?: number;
    /** The name of category */
    category_name: string;
    /** Whether this category has children */
    has_children: boolean;
}
/**
 * Parameters for getting product category list
 */
export type GetProductCategoryParams = {
    /** Language for category names */
    language?: string;
};
/**
 * Response for getting product category list
 */
export interface GetProductCategoryResponse extends FetchResponse<{
    /** List of categories */
    category_list: CategoryInfo[];
}> {
}
/**
 * Image input for adding/updating items
 */
export interface ImageInput {
    /** List of image IDs */
    image_id_list: string[];
}
/**
 * Description info for extended descriptions
 */
export interface DescriptionInfo {
    /** Extended description details */
    extended_description?: {
        /** List of description fields */
        field_list: ExtendedDescriptionField[];
    };
}
/**
 * Item attribute
 */
export interface ItemAttribute {
    /** Attribute ID */
    attribute_id: number;
    /** List of attribute values */
    attribute_value_list: {
        /** Attribute value ID */
        value_id?: number;
        /** Original attribute value name */
        original_value_name?: string;
        /** Value unit */
        value_unit?: string;
    }[];
}
/**
 * Parameters for adding a new item
 */
export type AddItemParams = {
    /** Original price of the item */
    original_price: number;
    /** Item description */
    description: string;
    /** Item weight in KG */
    weight?: number;
    /** Item name */
    item_name: string;
    /** Item status: NORMAL or UNLIST */
    item_status?: string;
    /** Package dimensions */
    dimension?: Dimension;
    /** Logistics information */
    logistic_info?: LogisticInfo[];
    /** Attribute list */
    attribute_list?: ItemAttribute[];
    /** Category ID */
    category_id: number;
    /** Image information */
    image: ImageInput;
    /** Pre-order information */
    pre_order?: PreOrder;
    /** Item SKU */
    item_sku?: string;
    /** Item condition: NEW or USED */
    condition?: string;
    /** Wholesale pricing */
    wholesale?: Wholesale[];
    /** Video upload IDs */
    video_upload_id?: string[];
    /** Brand information */
    brand?: BrandInfo;
    /** Item dangerous goods indicator */
    item_dangerous?: number;
    /** Tax information */
    tax_info?: TaxInfo;
    /** Complaint policy (PL only) */
    complaint_policy?: ComplaintPolicy;
    /** Description info for extended description */
    description_info?: DescriptionInfo;
    /** Description type */
    description_type?: string;
    /** Seller stock list */
    seller_stock?: SellerStockUpdate[];
};
/**
 * Response for adding an item
 */
export interface AddItemResponse extends FetchResponse<{
    /** Newly created item ID */
    item_id: number;
    /** Warning messages */
    warning?: string[];
}> {
}
/**
 * Parameters for updating an item
 */
export type UpdateItemParams = {
    /** Item ID to update */
    item_id: number;
    /** Original price */
    original_price?: number;
    /** Item description */
    description?: string;
    /** Item weight in KG */
    weight?: number;
    /** Item name */
    item_name?: string;
    /** Item status */
    item_status?: string;
    /** Package dimensions */
    dimension?: Dimension;
    /** Logistics information */
    logistic_info?: LogisticInfo[];
    /** Attribute list */
    attribute_list?: ItemAttribute[];
    /** Category ID */
    category_id?: number;
    /** Image information */
    image?: ImageInput;
    /** Pre-order information */
    pre_order?: PreOrder;
    /** Item SKU */
    item_sku?: string;
    /** Item condition */
    condition?: string;
    /** Wholesale pricing */
    wholesale?: Wholesale[];
    /** Video upload IDs */
    video_upload_id?: string[];
    /** Brand information */
    brand?: BrandInfo;
    /** Item dangerous goods indicator */
    item_dangerous?: number;
    /** Tax information */
    tax_info?: TaxInfo;
    /** Complaint policy */
    complaint_policy?: ComplaintPolicy;
    /** Description info */
    description_info?: DescriptionInfo;
    /** Description type */
    description_type?: string;
    /** Seller stock */
    seller_stock?: SellerStockUpdate[];
};
/**
 * Response for updating an item
 */
export interface UpdateItemResponse extends FetchResponse<{
    /** Updated item ID */
    item_id: number;
    /** Warning messages */
    warning?: string[];
}> {
}
/**
 * Tier variation option for models
 */
export interface TierVariationOption {
    /** Option name */
    option: string;
    /** Image for the option */
    image?: {
        /** Image ID */
        image_id?: string;
    };
}
/**
 * Tier variation definition
 */
export interface TierVariationInput {
    /** Variation name */
    name: string;
    /** List of options */
    option_list: TierVariationOption[];
}
/**
 * Model input for adding models
 */
export interface ModelInput {
    /** Tier index (position in variation) */
    tier_index: number[];
    /** Stock info */
    normal_stock?: number;
    /** Original price */
    original_price: number;
    /** Model SKU */
    model_sku?: string;
    /** Seller stock */
    seller_stock?: SellerStockUpdate[];
}
/**
 * Parameters for adding models to an item
 */
export type AddModelParams = {
    /** Item ID */
    item_id: number;
    /** Model list to add */
    model_list: ModelInput[];
};
/**
 * Response for adding models
 */
export interface AddModelResponse extends FetchResponse<{
    /** List of created model IDs */
    model_id_list: number[];
    /** Warning messages */
    warning?: string[];
}> {
}
/**
 * Model update input
 */
export interface ModelUpdateInput {
    /** Model ID to update */
    model_id: number;
    /** Original price */
    original_price?: number;
    /** Model SKU */
    model_sku?: string;
    /** Seller stock */
    seller_stock?: SellerStockUpdate[];
}
/**
 * Parameters for updating models
 */
export type UpdateModelParams = {
    /** Item ID */
    item_id: number;
    /** Model list to update */
    model_list: ModelUpdateInput[];
};
/**
 * Response for updating models
 */
export interface UpdateModelResponse extends FetchResponse<{
    /** List of updated model IDs */
    model_id_list: number[];
    /** Warning messages */
    warning?: string[];
}> {
}
/**
 * Parameters for deleting models
 */
export type DeleteModelParams = {
    /** Item ID */
    item_id: number;
    /** List of model IDs to delete */
    model_id_list: number[];
};
/**
 * Response for deleting models
 */
export interface DeleteModelResponse extends FetchResponse<{
    /** Success status */
    success: boolean;
}> {
}
/**
 * Parameters for initializing tier variations
 */
export type InitTierVariationParams = {
    /** Item ID */
    item_id: number;
    /** Tier variation list */
    tier_variation: TierVariationInput[];
    /** Model list */
    model: ModelInput[];
};
/**
 * Response for initializing tier variations
 */
export interface InitTierVariationResponse extends FetchResponse<{
    /** Created model IDs */
    model_id_list: number[];
    /** Warning messages */
    warning?: string[];
}> {
}
/**
 * Parameters for updating tier variations
 */
export type UpdateTierVariationParams = {
    /** Item ID */
    item_id: number;
    /** Tier variation list */
    tier_variation: TierVariationInput[];
};
/**
 * Response for updating tier variations
 */
export interface UpdateTierVariationResponse extends BaseResponse {
}
/**
 * Parameters for searching items
 */
export type SearchItemParams = {
    /** Offset for pagination */
    offset?: number;
    /** Page size (1-100) */
    page_size?: number;
    /** Item status filter */
    item_status?: string[];
    /** Search by item name */
    item_name?: string;
    /** Search by item SKU */
    item_sku?: string;
};
/**
 * Response for searching items
 */
export interface SearchItemResponse extends FetchResponse<{
    /** List of items found */
    item: ItemListItemInfo[];
    /** Total count */
    total_count: number;
    /** Has more items */
    has_next_page: boolean;
    /** Next page offset */
    next_offset: number;
}> {
}
/**
 * Parameters for getting item extra info
 */
export type GetItemExtraInfoParams = {
    /** List of item IDs */
    item_id_list: number[];
};
/**
 * Sale info details
 */
export interface SaleInfo {
    /** Current sale count */
    sale: number;
    /** Sale count in 7 days */
    sale_7d: number;
    /** Sale count in 30 days */
    sale_30d: number;
}
/**
 * Item extra info
 */
export interface ItemExtraInfo {
    /** Item ID */
    item_id: number;
    /** Sale information */
    sale_info: SaleInfo;
    /** View count */
    view: number;
    /** Like count */
    liked_count: number;
    /** Comment count */
    cmt_count: number;
}
/**
 * Response for getting item extra info
 */
export interface GetItemExtraInfoResponse extends FetchResponse<{
    /** List of item extra info */
    item_list: ItemExtraInfo[];
}> {
}
/**
 * Attribute tree node
 */
export interface AttributeTreeNode {
    /** Attribute ID */
    attribute_id: number;
    /** Original attribute name */
    original_attribute_name: string;
    /** Is mandatory */
    is_mandatory: boolean;
    /** Input type */
    input_type: string;
    /** Format type */
    format_type?: string;
    /** Attribute value list */
    attribute_value_list?: {
        /** Attribute value ID */
        value_id?: number;
        /** Original attribute value name */
        original_value_name?: string;
        /** Value unit */
        value_unit?: string;
    }[];
}
/**
 * Parameters for getting attribute tree
 */
export type GetAttributeTreeParams = {
    /** Category ID */
    category_id: number;
    /** Language */
    language?: string;
};
/**
 * Response for getting attribute tree
 */
export interface GetAttributeTreeResponse extends FetchResponse<{
    /** List of attributes */
    attribute_list: AttributeTreeNode[];
}> {
}
/**
 * Brand info for brand list
 */
export interface BrandItem {
    /** Brand ID */
    brand_id: number;
    /** Original brand name */
    original_brand_name: string;
    /** Display brand name */
    display_brand_name: string;
}
/**
 * Parameters for getting brand list
 */
export type GetBrandListParams = {
    /** Category ID */
    category_id: number;
    /** Page offset */
    offset: number;
    /** Page size */
    page_size: number;
    /** Status filter */
    status?: number;
};
/**
 * Response for getting brand list
 */
export interface GetBrandListResponse extends FetchResponse<{
    /** List of brands */
    brand_list: BrandItem[];
    /** Has more data */
    has_next_page: boolean;
    /** Next page offset */
    next_offset: number;
    /** Is mandatory */
    is_mandatory: boolean;
    /** Input type */
    input_type: string;
}> {
}
/**
 * Parameters for registering a brand
 */
export type RegisterBrandParams = {
    /** Category ID */
    category_id: number;
    /** Original brand name */
    original_brand_name: string;
};
/**
 * Response for registering a brand
 */
export interface RegisterBrandResponse extends FetchResponse<{
    /** Brand ID */
    brand_id: number;
    /** Original brand name */
    original_brand_name: string;
}> {
}
/**
 * Recommended category
 */
export interface RecommendedCategory {
    /** Category ID */
    category_id: number;
    /** Category name */
    category_name: string;
}
/**
 * Parameters for category recommendation
 */
export type CategoryRecommendParams = {
    /** Item name */
    item_name: string;
};
/**
 * Response for category recommendation
 */
export interface CategoryRecommendResponse extends FetchResponse<{
    /** List of recommended categories */
    category_id_list: number[];
}> {
}
/**
 * Item limit info
 */
export interface ItemLimit {
    /** Maximum image count */
    max_image_count: number;
    /** Maximum video count */
    max_video_count: number;
    /** Maximum product title length */
    max_product_title_length: number;
    /** Maximum description length */
    max_description_length: number;
    /** Maximum extended description length */
    max_extended_description_length: number;
    /** Whether video is required */
    is_video_required: boolean;
}
/**
 * Parameters for getting item limits
 */
export type GetItemLimitParams = {
    /** Category ID */
    category_id: number;
};
/**
 * Response for getting item limits
 */
export interface GetItemLimitResponse extends FetchResponse<{
    /** Item limit information */
    item_limit: ItemLimit;
}> {
}
/**
 * Promotion info
 */
export interface PromotionInfo {
    /** Promotion ID */
    promotion_id: number;
    /** Promotion type */
    promotion_type: number;
    /** Start time */
    start_time: number;
    /** End time */
    end_time: number;
}
/**
 * Parameters for getting item promotion
 */
export type GetItemPromotionParams = {
    /** List of item IDs */
    item_id_list: number[];
};
/**
 * Item promotion info
 */
export interface ItemPromotionInfo {
    /** Item ID */
    item_id: number;
    /** Promotion list */
    promotion_list: PromotionInfo[];
}
/**
 * Response for getting item promotion
 */
export interface GetItemPromotionResponse extends FetchResponse<{
    /** List of item promotions */
    item_promotion_list: ItemPromotionInfo[];
}> {
}
/**
 * Parameters for boosting an item
 */
export type BoostItemParams = {
    /** List of item IDs to boost */
    item_id_list: number[];
};
/**
 * Response for boosting items
 */
export interface BoostItemResponse extends FetchResponse<{
    /** List of failed item IDs */
    failed_item_id_list?: number[];
}> {
}
/**
 * Boosted item info
 */
export interface BoostedItem {
    /** Item ID */
    item_id: number;
    /** Boost end time */
    boost_end_time: number;
}
/**
 * Response for getting boosted list
 */
export interface GetBoostedListResponse extends FetchResponse<{
    /** List of boosted items */
    item_list: BoostedItem[];
}> {
}
/**
 * Parameters for getting variations
 */
export type GetVariationsParams = {
    /** Item ID */
    item_id: number;
    /** Language */
    language?: string;
};
/**
 * Response for getting variations
 */
export interface GetVariationsResponse extends FetchResponse<{
    /** Tier variation */
    tier_variation: TierVariation[];
}> {
}
/**
 * Parameters for recommending attributes
 */
export type GetRecommendAttributeParams = {
    /** Category ID */
    category_id: number;
    /** Item name */
    item_name?: string;
};
/**
 * Recommended attribute
 */
export interface RecommendedAttribute {
    /** Attribute ID */
    attribute_id: number;
    /** Recommended value list */
    recommended_value_list: {
        /** Attribute value ID */
        value_id?: number;
        /** Original attribute value name */
        original_value_name?: string;
        /** Value unit */
        value_unit?: string;
    }[];
}
/**
 * Response for getting recommended attributes
 */
export interface GetRecommendAttributeResponse extends FetchResponse<{
    /** List of recommended attributes */
    recommended_attribute_list: RecommendedAttribute[];
}> {
}
/**
 * Parameters for searching attribute values
 */
export type SearchAttributeValueListParams = {
    /** Category ID */
    category_id: number;
    /** Attribute ID */
    attribute_id: number;
    /** Search value */
    search_value: string;
    /** Language */
    language?: string;
};
/**
 * Response for searching attribute values
 */
export interface SearchAttributeValueListResponse extends FetchResponse<{
    /** List of attribute values */
    attribute_value_list: {
        /** Attribute value ID */
        value_id?: number;
        /** Original attribute value name */
        original_value_name?: string;
        /** Value unit */
        value_unit?: string;
    }[];
}> {
}
/**
 * Parameters for getting main item list
 */
export type GetMainItemListParams = {
    /** Page offset */
    offset?: number;
    /** Page size */
    page_size?: number;
    /** Time filter from */
    update_time_from?: number;
    /** Time filter to */
    update_time_to?: number;
};
/**
 * Response for getting main item list
 */
export interface GetMainItemListResponse extends FetchResponse<{
    /** List of items */
    item: ItemListItemInfo[];
    /** Total count */
    total_count: number;
    /** Has next page */
    has_next_page: boolean;
    /** Next offset */
    next_offset: number;
}> {
}
/**
 * Violation info
 */
export interface ViolationInfo {
    /** Violation type */
    violation_type: string;
    /** Violation reason */
    violation_reason: string;
    /** Violated item info */
    violated_item_info: string[];
}
/**
 * Parameters for getting item violation info
 */
export type GetItemViolationInfoParams = {
    /** List of item IDs */
    item_id_list: number[];
};
/**
 * Item violation
 */
export interface ItemViolation {
    /** Item ID */
    item_id: number;
    /** Violation list */
    violation_list: ViolationInfo[];
}
/**
 * Response for getting item violation info
 */
export interface GetItemViolationInfoResponse extends FetchResponse<{
    /** List of item violations */
    item_violation_list: ItemViolation[];
}> {
}
/**
 * Weight recommendation
 */
export interface WeightRecommendation {
    /** Category ID */
    category_id: number;
    /** Item name */
    item_name: string;
    /** Recommended weight */
    weight: number;
}
/**
 * Parameters for getting weight recommendation
 */
export type GetWeightRecommendationParams = {
    /** Category ID */
    category_id: number;
    /** Item name */
    item_name: string;
};
/**
 * Response for getting weight recommendation
 */
export interface GetWeightRecommendationResponse extends FetchResponse<{
    /** Weight recommendation */
    weight: number;
}> {
}
/**
 * Parameters for getting direct item list
 */
export type GetDirectItemListParams = {
    /** Page offset */
    offset?: number;
    /** Page size */
    page_size?: number;
};
/**
 * Direct item info
 */
export interface DirectItemInfo {
    /** Item ID */
    item_id: number;
    /** Category ID */
    category_id: number;
    /** Item name */
    item_name: string;
    /** Item status */
    item_status: string;
    /** Update time */
    update_time: number;
}
/**
 * Response for getting direct item list
 */
export interface GetDirectItemListResponse extends FetchResponse<{
    /** List of direct items */
    item: DirectItemInfo[];
    /** Total count */
    total_count: number;
    /** Has next page */
    has_next_page: boolean;
    /** Next offset */
    next_offset: number;
}> {
}
/**
 * Content diagnosis result
 */
export interface ContentDiagnosisResult {
    /** Item ID */
    item_id: number;
    /** Diagnosis status */
    status: string;
    /** Failed fields */
    failed_field_list?: string[];
}
/**
 * Parameters for getting item content diagnosis result
 */
export type GetItemContentDiagnosisResultParams = {
    /** List of item IDs */
    item_id_list: number[];
};
/**
 * Response for getting item content diagnosis result
 */
export interface GetItemContentDiagnosisResultResponse extends FetchResponse<{
    /** Diagnosis result list */
    item_list: ContentDiagnosisResult[];
}> {
}
/**
 * Parameters for getting item list by content diagnosis
 */
export type GetItemListByContentDiagnosisParams = {
    /** Diagnosis status */
    status: string;
    /** Page offset */
    offset?: number;
    /** Page size */
    page_size?: number;
};
/**
 * Response for getting item list by content diagnosis
 */
export interface GetItemListByContentDiagnosisResponse extends FetchResponse<{
    /** List of items */
    item: ItemListItemInfo[];
    /** Total count */
    total_count: number;
    /** Has next page */
    has_next_page: boolean;
    /** Next offset */
    next_offset: number;
}> {
}
/**
 * Kit item params (simplified - represents a bundled product)
 */
export type AddKitItemParams = Record<string, any>;
export interface AddKitItemResponse extends FetchResponse<{
    item_id: number;
}> {
}
export type UpdateKitItemParams = Record<string, any>;
export interface UpdateKitItemResponse extends BaseResponse {
}
export type GetKitItemInfoParams = {
    item_id_list: number[];
};
export interface GetKitItemInfoResponse extends FetchResponse<{
    item_list: any[];
}> {
}
export type GetKitItemLimitParams = {
    category_id: number;
};
export interface GetKitItemLimitResponse extends FetchResponse<{
    item_limit: any;
}> {
}
export type GenerateKitImageParams = {
    image_id_list: string[];
};
export interface GenerateKitImageResponse extends FetchResponse<{
    image_info: {
        image_id: string;
        image_url: string;
    };
}> {
}
/**
 * SSP (Seller-Sponsored Product) params
 */
export type AddSspItemParams = Record<string, any>;
export interface AddSspItemResponse extends FetchResponse<{
    item_id: number;
}> {
}
export type GetSspInfoParams = {
    item_id: number;
};
export interface GetSspInfoResponse extends FetchResponse<{
    ssp_info: any;
}> {
}
export type GetSspListParams = {
    offset?: number;
    page_size?: number;
};
export interface GetSspListResponse extends FetchResponse<{
    item_list: any[];
    has_next_page: boolean;
    next_offset: number;
}> {
}
export type LinkSspParams = {
    item_id: number;
    ssp_item_id: number;
};
export interface LinkSspResponse extends BaseResponse {
}
export type UnlinkSspParams = {
    item_id: number;
};
export interface UnlinkSspResponse extends BaseResponse {
}
export type UpdateSipItemPriceParams = {
    item_id: number;
    sip_item_price: number;
};
export interface UpdateSipItemPriceResponse extends BaseResponse {
}
/**
 * Size chart params
 */
export type GetSizeChartListParams = {
    offset?: number;
    page_size?: number;
};
export interface GetSizeChartListResponse extends FetchResponse<{
    size_chart_list: any[];
    has_next_page: boolean;
    next_offset: number;
}> {
}
export type GetSizeChartDetailParams = {
    size_chart_id: string;
};
export interface GetSizeChartDetailResponse extends FetchResponse<{
    size_chart: any;
}> {
}
/**
 * Vehicle compatibility params
 */
export type GetAllVehicleListParams = Record<string, any>;
export interface GetAllVehicleListResponse extends FetchResponse<{
    vehicle_list: any[];
}> {
}
export type GetVehicleListByCompatibilityDetailParams = {
    item_id: number;
};
export interface GetVehicleListByCompatibilityDetailResponse extends FetchResponse<{
    vehicle_list: any[];
}> {
}
/**
 * Other specialized params
 */
export type GetAitemByPitemIdParams = {
    pitem_id_list: number[];
};
export interface GetAitemByPitemIdResponse extends FetchResponse<{
    item_list: any[];
}> {
}
export type GetDirectShopRecommendedPriceParams = {
    category_id: number;
    item_name?: string;
};
export interface GetDirectShopRecommendedPriceResponse extends FetchResponse<{
    recommended_price: number;
}> {
}
export type GetProductCertificationRuleParams = {
    category_id: number;
};
export interface GetProductCertificationRuleResponse extends FetchResponse<{
    certification_list: any[];
}> {
}
export type SearchUnpackagedModelListParams = {
    item_id: number;
    search_value?: string;
};
export interface SearchUnpackagedModelListResponse extends FetchResponse<{
    model_list: any[];
}> {
}
