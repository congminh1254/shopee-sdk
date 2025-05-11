import { FetchResponse } from "./fetch.js";
import { BaseResponse } from './base.js';
import { Attribute } from "./attribute.js";

/**
 * Enum for item status
 */
export enum ItemStatus {
  NORMAL = 'NORMAL',
  BANNED = 'BANNED',
  UNLIST = 'UNLIST',
  REVIEWING = 'REVIEWING',
  SELLER_DELETE = 'SELLER_DELETE',
  SHOPEE_DELETE = 'SHOPEE_DELETE',
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
}

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
}

/**
 * Media information for a comment
 */
export type CommentMedia = {
  /** List of image URLs uploaded by the buyer in the comment */
  image_url_list: string[];
  /** List of video URLs uploaded by the buyer in the comment */
  video_url_list: string[];
}

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
}

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
}> {};

/**
 * Comment item for replying to comments
 */
export type ReplyCommentItem = {
  /** The identity of comment to reply to */
  comment_id: number;
  /** The content of the reply (between 1 and 500 characters) */
  comment: string;
}

/**
 * Parameters for replying to comments in batch
 */
export type ReplyCommentParams = {
  /** The list of comments to reply to (between 1 and 100 items) */
  comment_list: ReplyCommentItem[];
}

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
}

/**
 * Response for replying to comments
 */
export interface ReplyCommentResponse extends FetchResponse<{
  /** The result list of the request comment list */
  result_list: ReplyCommentResultItem[];
  /** Warning messages to take care of */
  warning?: string[];
}> {}

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
  field_type: string; // Consider an enum: 'text' | 'image'
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
  condition?: string; // Consider enum: 'NEW' | 'USED'
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
  description_type?: string; // Consider enum: 'normal' | 'extended'
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
    complaint_policy?: ComplaintPolicy; // This seems redundant as it's also in ItemBaseInfo
    /** Tax information. Only returned if need_tax_info in request is true. */
    tax_info?: TaxInfo; // This seems redundant as it's also in ItemBaseInfo
  };
}