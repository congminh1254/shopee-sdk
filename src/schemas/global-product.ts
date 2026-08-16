import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field TierIndex
 */
export enum TierIndex {
  TIER = "tier",
  TWO = "two",
}
/**
 * AddGlobalItem_Image sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_Image {
  /**
   * Image id list of global item.
   */
  image_id_list: string[];
  [key: string]: any;
}
/**
 * AddGlobalItem_Dimension sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_Dimension {
  /**
   * Package length of global item.
   */
  package_length: number;
  /**
   * Package width of global item.
   */
  package_width: number;
  /**
   * Package height of global item.
   */
  package_height: number;
  [key: string]: any;
}
/**
 * AddGlobalItem_PreOrder sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_PreOrder {
  /**
   * Days to ship.
   */
  days_to_ship: number;
  [key: string]: any;
}
/**
 * AddGlobalItem_Brand sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
  [key: string]: any;
}
/**
 * AddGlobalItem_AttributeValue sub-interface for AddGlobalItem_Attribute
 */
export interface AddGlobalItem_AttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Name of attribute value. original_value_name from global_product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value.(quantitative attribute only)
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * AddGlobalItem_Attribute sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_Attribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  attribute_value_list?: AddGlobalItem_AttributeValue[];
  [key: string]: any;
}
/**
 * AddGlobalItem_ImageInfo sub-interface for AddGlobalItem_Field
 */
export interface AddGlobalItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * AddGlobalItem_Field sub-interface for AddGlobalItem_ExtendedDescription
 */
export interface AddGlobalItem_Field {
  /**
   * type of extended description field ：values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text， text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image，image url will be set by this field.
   */
  image_info?: AddGlobalItem_ImageInfo;
  [key: string]: any;
}
/**
 * AddGlobalItem_ExtendedDescription sub-interface for AddGlobalItem_DescriptionInfo
 */
export interface AddGlobalItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: AddGlobalItem_Field[];
  [key: string]: any;
}
/**
 * AddGlobalItem_DescriptionInfo sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: AddGlobalItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * AddGlobalItem_SellerStock sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_SellerStock {
  /**
   * location_id of stock
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
  [key: string]: any;
}
/**
 * AddGlobalItem_SizeChartInfo sub-interface for AddGlobalItemRequest
 */
export interface AddGlobalItem_SizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both local shops and CB shops are supported to set "size_chart_id" now and seller need set the size_chart template in CBSC in advance
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * Request parameters for add_global_item
 *
 * Add global item. Only for China mainland sellers using China Seller Centre(CNSC). More details in https://shopee.cn/cooperate/46/53/926.
 */
export interface AddGlobalItemRequest {
  /**
   * Category id of global item.
   */
  category_id: number;
  /**
   * Name of global item.
   */
  global_item_name: string;
  /**
   * Description of global item.
   */
  description: string;
  /**
   * Sku of global item.
   */
  global_item_sku?: string;
  /**
   * Image information of global item.
   */
  image?: AddGlobalItem_Image;
  /**
   * Original price of global item.
   */
  original_price: number;
  /**
   * Normal stock of global item.
   */
  normal_stock?: number;
  /**
   * Weight of global item.
   */
  weight: number;
  /**
   * Dimension information of global item.
   */
  dimension?: AddGlobalItem_Dimension;
  /**
   * Preorder information of global item.
   */
  pre_order: AddGlobalItem_PreOrder;
  /**
   * Condition of global item, "NEW" or "USED" is available.
   */
  condition?: string;
  /**
   * Video upload id of global item. Only accept one video_upload_id at most.
   */
  video_upload_id?: string[];
  brand?: AddGlobalItem_Brand;
  /**
   * Item attributes.
   */
  attribute_list?: AddGlobalItem_Attribute[];
  /**
   * New description field. New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: AddGlobalItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed
   */
  description_type?: string;
  /**
   * seller_stock of global item.
   */
  seller_stock?: AddGlobalItem_SellerStock[];
  /**
   * category recommendation service id
   */
  ds_cat_rcmd_id?: string;
  size_chart_info?: AddGlobalItem_SizeChartInfo;
  [key: string]: any;
}
/**
 * AddGlobalItem_Response sub-interface for AddGlobalItemResponse
 */
export interface AddGlobalItem_Response {
  /**
   * Id of added global item.
   */
  global_item_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_global_item
 */
export type AddGlobalItemResponseData = AddGlobalItem_Response;
/**
 * Response payload for add_global_item
 *
 * Add global item. Only for China mainland sellers using China Seller Centre(CNSC). More details in https://shopee.cn/cooperate/46/53/926.
 */
export type AddGlobalItemResponse = FetchResponse<AddGlobalItemResponseData>;
/**
 * AddGlobalModel_SellerStock sub-interface for AddGlobalModel_GlobalModel
 */
export interface AddGlobalModel_SellerStock {
  /**
   * location_id of stock, if the merchant has 3PF shop, the location_id cannot be empty, can use the get_merchant_warehouse_location_list API to obtain the location_id list of the merchant, if the merchant does not have 3PF shop (only has normal CBSC shop), the location_id can be empty
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
  [key: string]: any;
}
/**
 * AddGlobalModel_Dimension sub-interface for AddGlobalModel_GlobalModel
 */
export interface AddGlobalModel_Dimension {
  /**
   * The height of package for this global model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this global model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this global model, the unit is CM.
   */
  package_width: number;
  [key: string]: any;
}
/**
 * AddGlobalModel_PreOrder sub-interface for AddGlobalModel_GlobalModel
 */
export interface AddGlobalModel_PreOrder {
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship: number;
  [key: string]: any;
}
/**
 * AddGlobalModel_GlobalModel sub-interface for AddGlobalModelRequest
 */
export interface AddGlobalModel_GlobalModel {
  /**
   * Sku of global model. model_sku length information needs to be no more than 100 characters.
   */
  global_model_sku?: string;
  /**
   * Tier index of global model.
   */
  tier_index: number[];
  /**
   * seller_stock of global item
   */
  seller_stock?: AddGlobalModel_SellerStock[];
  /**
   * Original price of global item.
   */
  original_price: number;
  /**
   * The weight of this global model, the unit is KG.If don't set the weight of this global model, will use the weight of global item by default.If set the dimension of this global model, them must set the weight of this global model.
   */
  weight?: number;
  /**
   * The dimension of this global model.If don't set the dimension of this global model, will use the dimension of global item by default.
   */
  dimension?: AddGlobalModel_Dimension;
  /**
   * Pre-order information of this global model.Notes: If don't set the DTS of this global model, will use the DTS of the global item by default.
   */
  pre_order?: AddGlobalModel_PreOrder;
  [key: string]: any;
}
/**
 * Request parameters for add_global_model
 *
 * Add global model. Only for China mainland sellers and Korean sellers.
 */
export interface AddGlobalModelRequest {
  /**
   * ID of global item.
   */
  global_item_id: number;
  /**
   * Global model setting list. Limit is  [1,50].
   */
  global_model: AddGlobalModel_GlobalModel[];
  [key: string]: any;
}
/**
 * Response data payload for add_global_model
 */
export interface AddGlobalModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for add_global_model
 *
 * Add global model. Only for China mainland sellers and Korean sellers.
 */
export type AddGlobalModelResponse = FetchResponse<AddGlobalModelResponseData>;
/**
 * Request parameters for category_recommend
 *
 * Recommend category by item name. Only for China mainland sellers and Korean sellers.
 */
export interface CategoryRecommendRequest {
  /**
   * name of item
   */
  global_item_name: string;
  /**
   * Please use the image id returned by v2.media_space.upload_image api, we will ignore if this field is empty string
   */
  global_product_cover_image?: string;
  [key: string]: any;
}
/**
 * CategoryRecommend_Response sub-interface for CategoryRecommendResponse
 */
export interface CategoryRecommend_Response {
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number[];
  [key: string]: any;
}
/**
 * Response data payload for category_recommend
 */
export type CategoryRecommendResponseData = CategoryRecommend_Response;
/**
 * Response payload for category_recommend
 *
 * Recommend category by item name. Only for China mainland sellers and Korean sellers.
 */
export type CategoryRecommendResponse = FetchResponse<CategoryRecommendResponseData>;
/**
 * CreatePublishTask_Image sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_Image {
  /**
   * Image id list of item.
   */
  image_id_list: string[];
  [key: string]: any;
}
/**
 * CreatePublishTask_Model sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_Model {
  /**
   * Tier index of model.
   */
  tier_index: number[];
  /**
   * Original price of model. If you upload this field, we will take your value, so you should pass the value in local currency, if you don't upload this field, Shopee will automatically calculate the price.
   */
  original_price: number;
  /**
   * can be "NORMAL" or "UNAVAILABLE". Normal models can be sold on the buyer's side, and UNAVAILABLE models cannot be sold on the buyer's side. If you do not upload this field, the model status will be considered as "NORMAL".
   */
  model_status?: string;
  [key: string]: any;
}
/**
 * CreatePublishTask_Logistic sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_Logistic {
  /**
   * Logistic id.
   */
  logistic_id: number;
  /**
   * If this logistic channel is enabled.
   */
  enabled: boolean;
  /**
   * Shipping fee.
   */
  shipping_fee?: number;
  /**
   * Size id.
   */
  size_id?: number;
  /**
   * If this logistic channel is free.
   */
  is_free?: boolean;
  [key: string]: any;
}
/**
 * CreatePublishTask_PreOrder sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_PreOrder {
  /**
   * If this item is preorder.
   */
  is_pre_order: boolean;
  /**
   * Days to ship, it's mandatory if is_pre_order is true.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * CreatePublishTask_ImageInfo sub-interface for CreatePublishTask_Field
 */
export interface CreatePublishTask_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * CreatePublishTask_Field sub-interface for CreatePublishTask_ExtendedDescription
 */
export interface CreatePublishTask_Field {
  /**
   * Type of extended description field ：values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text， text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image，image url will be set by this field.
   */
  image_info?: CreatePublishTask_ImageInfo;
  [key: string]: any;
}
/**
 * CreatePublishTask_ExtendedDescription sub-interface for CreatePublishTask_DescriptionInfo
 */
export interface CreatePublishTask_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: CreatePublishTask_Field[];
  [key: string]: any;
}
/**
 * CreatePublishTask_DescriptionInfo sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: CreatePublishTask_ExtendedDescription;
  [key: string]: any;
}
/**
 * CreatePublishTask_VariationOption sub-interface for CreatePublishTask_StandardiseTierVariation
 */
export interface CreatePublishTask_VariationOption {
  variation_option_id?: number;
  variation_option_name?: string;
  image_id?: string;
  [key: string]: any;
}
/**
 * CreatePublishTask_StandardiseTierVariation sub-interface for CreatePublishTask_Item
 */
export interface CreatePublishTask_StandardiseTierVariation {
  variation_id?: number;
  variation_name?: string;
  variation_group_id?: number;
  variation_option_list?: CreatePublishTask_VariationOption[];
  [key: string]: any;
}
/**
 * CreatePublishTask_Item sub-interface for CreatePublishTaskRequest
 */
export interface CreatePublishTask_Item {
  /**
   * Name of item. If you upload this field, we will take your value, so you should pass the value in the local language, if you don't upload this field, Shopee will automatically translate your global product name into the local language.
   */
  item_name?: string;
  /**
   * Description of item. If you upload this field, we will take your value, so you should pass the value in the local language, if you don't upload this field, Shopee will automatically translate your global product description into the local language.
   */
  description?: string;
  /**
   * Status of item.
   */
  item_status?: string;
  /**
   * Original price of item.For SG/MY/BR/MX/PL/ES/AR seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer. If you upload this field, we will take your value, so you should pass the value in local currency, if you don't upload this field, Shopee will automatically calculate the price.
   */
  original_price?: number;
  /**
   * Image information of item.
   */
  image?: CreatePublishTask_Image;
  /**
   * Model information of item.
   */
  model?: CreatePublishTask_Model[];
  /**
   * Size chart of item. Only support image_id for now
   */
  size_chart?: string;
  /**
   * Logistic information of item.
   */
  logistic?: CreatePublishTask_Logistic[];
  /**
   * Preorder information of item.
   */
  pre_order?: CreatePublishTask_PreOrder;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal. If you upload this field, we will take your value, so you should pass the value in the local language, if you don't upload this field, Shopee will automatically translate your global product description into the local language.
   */
  description_info?: CreatePublishTask_DescriptionInfo;
  standardise_tier_variation?: CreatePublishTask_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * Request parameters for create_publish_task
 *
 * Create publish task for global item. Only for China mainland sellers and Korean sellers.
 */
export interface CreatePublishTaskRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Id of shop to publish to.
   */
  shop_id: number;
  /**
   * Region of shop.
   */
  shop_region: string;
  /**
   * Item information.
   */
  item?: CreatePublishTask_Item;
  [key: string]: any;
}
/**
 * CreatePublishTask_Response sub-interface for CreatePublishTaskResponse
 */
export interface CreatePublishTask_Response {
  /**
   * The id of publish task.
   */
  publish_task_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for create_publish_task
 */
export type CreatePublishTaskResponseData = CreatePublishTask_Response;
/**
 * Response payload for create_publish_task
 *
 * Create publish task for global item. Only for China mainland sellers and Korean sellers.
 */
export type CreatePublishTaskResponse = FetchResponse<CreatePublishTaskResponseData>;
/**
 * Request parameters for delete_global_item
 *
 * Delete global item. Only for China mainland sellers and Korean sellers.
 */
export interface DeleteGlobalItemRequest {
  /**
   * The id of global item to delete.
   */
  global_item_id: number;
  [key: string]: any;
}
/**
 * DeleteGlobalItem_FailureDeleteItem sub-interface for DeleteGlobalItem_Response
 */
export interface DeleteGlobalItem_FailureDeleteItem {
  /**
   * The id of shop corresponding to the related item failed to delete.
   */
  shop_id?: number;
  /**
   * The id of related item failed to delete.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * DeleteGlobalItem_Response sub-interface for DeleteGlobalItemResponse
 */
export interface DeleteGlobalItem_Response {
  /**
   * If delete failed, this field shows the details.
   */
  failure_delete_item?: DeleteGlobalItem_FailureDeleteItem[];
  [key: string]: any;
}
/**
 * Response data payload for delete_global_item
 */
export type DeleteGlobalItemResponseData = DeleteGlobalItem_Response;
/**
 * Response payload for delete_global_item
 *
 * Delete global item. Only for China mainland sellers and Korean sellers.
 */
export type DeleteGlobalItemResponse = FetchResponse<DeleteGlobalItemResponseData>;
/**
 * Request parameters for delete_global_model
 *
 * Delete global model. Only for China mainland sellers and Korean sellers.
 */
export interface DeleteGlobalModelRequest {
  /**
   * Shopee's unique identifier for an global item.
   */
  global_item_id: number;
  /**
   * Shopee's unique identifier for an global model.
   */
  global_model_id: number;
  [key: string]: any;
}
/**
 * DeleteGlobalModel_Failure sub-interface for DeleteGlobalModel_Response
 */
export interface DeleteGlobalModel_Failure {
  /**
   * Failed shop id.
   */
  shop_id?: number;
  /**
   * Failed item id.
   */
  item_id?: number;
  /**
   * Failed model id.
   */
  model_id?: number;
  [key: string]: any;
}
/**
 * DeleteGlobalModel_Response sub-interface for DeleteGlobalModelResponse
 */
export interface DeleteGlobalModel_Response {
  /**
   * Global model id.
   */
  global_model_id?: number;
  failures?: DeleteGlobalModel_Failure[];
  [key: string]: any;
}
/**
 * Response data payload for delete_global_model
 */
export type DeleteGlobalModelResponseData = DeleteGlobalModel_Response;
/**
 * Response payload for delete_global_model
 *
 * Delete global model. Only for China mainland sellers and Korean sellers.
 */
export type DeleteGlobalModelResponse = FetchResponse<DeleteGlobalModelResponseData>;
/**
 * Request parameters for get_attribute_tree
 *
 * Get the mtsku attribute trees for categories
 */
export interface GetAttributeTreeRequest {
  /**
   * Max count is 20
   */
  category_id_list: number[];
  /**
   * LanguageSupport Lanuage:"SG": [ "en", "zh-Hans", "ms" ], "MY": [ "en", "zh-Hans", "ms" ],"PH": [ "en", "zh-Hans" ],"VN": [ "vn", "en" ],"ID": [ "id", "en" ],"TH": [ "th", "en" ],"BR": [ "pt-BR", "en" ],"MX": [ "es-MX", "en" ],"CO": [ "es-CO", "en" ],"CL": [ "es-CL", "en" ],"TW": [ "zh-Hant", "zh-Hans", "en" ],"IN": [ "en", "hi" ]
   */
  language?: string;
  [key: string]: any;
}
/**
 * GetAttributeTree_MultiLang sub-interface for GetAttributeTree_AttributeValue
 */
export interface GetAttributeTree_MultiLang {
  /**
   * Language
   */
  language?: string;
  /**
   * Translate result
   */
  value?: string;
  [key: string]: any;
}
/**
 * GetAttributeTree_AttributeValue sub-interface for GetAttributeTree_AttributeTree
 */
export interface GetAttributeTree_AttributeValue {
  /**
   * Value ID
   */
  value_id?: number;
  /**
   * Value name
   */
  name?: string;
  /**
   * Value unit
   */
  value_unit?: string;
  /**
   * Child attributes for the value of parent attributeThe structure content is the same as attribute_tree
   */
  child_attribute_list?: any[];
  /**
   * Translate results for value name display
   */
  multi_lang?: GetAttributeTree_MultiLang;
  [key: string]: any;
}
/**
 * GetAttributeTree_AttributeInfo sub-interface for GetAttributeTree_AttributeTree
 */
export interface GetAttributeTree_AttributeInfo {
  /**
   * SINGLE_DROP_DOWN = 1SINGLE_COMBO_BOX = 2FREE_TEXT_FILED        = 3MULTI_DROP_DOWN   = 4MULTI_COMBO_BOX   = 5
   */
  input_type?: number;
  /**
   * VALIDATOR_NO_VALIDATE_TYPE =  0VALIDATOR_INT_TYPE = 1 VALIDATOR_STRING_TYPE = 2VALIDATOR_FLOAT_TYPE = 3 VALIDATOR_DATE_TYPE = 4
   */
  input_validation_type?: number;
  /**
   * FORMAT_NORMAL = 1FORMAT_QUANTITATIVE_WITH_UNIT = 2
   */
  format_type?: number;
  /**
   * YEAR_MONTH_DATE = 0 (DD/MM/YYYY)YEAR_MONTH = 1 (MM/YYYY)
   */
  date_format_type?: number;
  /**
   * Attribute's available units list
   */
  attribute_unit_list?: string[];
  /**
   * Attribute is mandatory for these regions
   */
  mandatory_region?: string[];
  /**
   * Max selected value count
   */
  max_value_count?: number;
  /**
   * introduction of special attribute
   */
  introduction?: string;
  is_oem?: boolean;
  /**
   * Indicates whether this attribute has searchable values.If yes, please call v2.global_product.search_global_attribute_value_list to get the default values
   */
  support_search_value?: boolean;
  [key: string]: any;
}
/**
 * GetAttributeTree_AttributeTree sub-interface for GetAttributeTree_List
 */
export interface GetAttributeTree_AttributeTree {
  /**
   * Attribute ID
   */
  attribute_id?: number;
  /**
   * Is mandatory or not
   */
  mandatory?: boolean;
  /**
   * Attribute Name
   */
  name?: string;
  /**
   * All available values for this attribute
   */
  attribute_value_list?: GetAttributeTree_AttributeValue[];
  /**
   * Attribute extra info
   */
  attribute_info?: GetAttributeTree_AttributeInfo;
  /**
   * Translate result for attribute name display
   */
  multi_lang?: GetAttributeTree_MultiLang[];
  [key: string]: any;
}
/**
 * GetAttributeTree_List sub-interface for GetAttributeTree_Response
 */
export interface GetAttributeTree_List {
  /**
   * One category's attribute trees
   */
  attribute_tree?: GetAttributeTree_AttributeTree[];
  /**
   * Category ID
   */
  category_id?: number;
  /**
   * Warning msg
   */
  warning?: string;
  [key: string]: any;
}
/**
 * GetAttributeTree_Response sub-interface for GetAttributeTreeResponse
 */
export interface GetAttributeTree_Response {
  /**
   * Each result corresponds to one category in category_ids
   */
  list?: GetAttributeTree_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_attribute_tree
 */
export type GetAttributeTreeResponseData = GetAttributeTree_Response;
/**
 * Response payload for get_attribute_tree
 *
 * Get the mtsku attribute trees for categories
 */
export type GetAttributeTreeResponse = FetchResponse<GetAttributeTreeResponseData>;
/**
 * Request parameters for get_brand_list
 *
 * Use this call to get a list of brand. Only for China mainland sellers and Korean sellers.
 */
export interface GetBrandListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0. if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * the size of one page.
   */
  page_size: number;
  /**
   * ID of category.
   */
  category_id: number;
  /**
   * Brand status , 1: normal brand, 2: pending brand.
   */
  status: number;
  [key: string]: any;
}
/**
 * GetBrandList_Brand sub-interface for GetBrandList_Response
 */
export interface GetBrandList_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand
   */
  original_brand_name?: string;
  /**
   * Display name of brand
   */
  display_brand_name?: string;
  [key: string]: any;
}
/**
 * GetBrandList_Response sub-interface for GetBrandListResponse
 */
export interface GetBrandList_Response {
  brand_list?: GetBrandList_Brand[];
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * If has_next_page is true, this value need set to next request.offset
   */
  next_offset?: number;
  /**
   * Whether is mandatory.
   */
  is_mandatory?: boolean;
  /**
   * Input type: DROP_DOWN
   */
  input_type?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_brand_list
 */
export type GetBrandListResponseData = GetBrandList_Response;
/**
 * Response payload for get_brand_list
 *
 * Use this call to get a list of brand. Only for China mainland sellers and Korean sellers.
 */
export type GetBrandListResponse = FetchResponse<GetBrandListResponseData>;
/**
 * Request parameters for get_category
 *
 * Get global category. Only for China mainland sellers and Korean sellers.
 */
export interface GetCategoryRequest {
  /**
   * Display language. Language should be one of "zh-hans", "en"
   */
  language?: string;
  [key: string]: any;
}
/**
 * GetCategory_Category sub-interface for GetCategory_Response
 */
export interface GetCategory_Category {
  /**
   * ID for category.
   */
  category_id?: number;
  /**
   * ID for parent category.
   */
  parent_category_id?: number;
  /**
   * English category name.
   */
  original_category_name?: string;
  /**
   * Display category name, it depends on what language you have uploaded
   */
  display_category_name?: string;
  /**
   * Whether this category has active children category.
   */
  has_children?: boolean;
  [key: string]: any;
}
/**
 * GetCategory_Response sub-interface for GetCategoryResponse
 */
export interface GetCategory_Response {
  category_list?: GetCategory_Category[];
  [key: string]: any;
}
/**
 * Response data payload for get_category
 */
export type GetCategoryResponseData = GetCategory_Response;
/**
 * Response payload for get_category
 *
 * Get global category. Only for China mainland sellers and Korean sellers.
 */
export type GetCategoryResponse = FetchResponse<GetCategoryResponseData>;
/**
 * Request parameters for get_global_item_id
 *
 * Get get_global_item_id by item_id. Only for China mainland sellers and Korean sellers.
 */
export interface GetGlobalItemIdRequest {
  /**
   * Id of shop.
   */
  shop_id: number;
  /**
   * Item id list. Length limit is [1,20].
   */
  item_id_list: number[];
  [key: string]: any;
}
/**
 * GetGlobalItemId_ItemIdMap sub-interface for GetGlobalItemId_Response
 */
export interface GetGlobalItemId_ItemIdMap {
  /**
   * Id of item.
   */
  item_id?: number;
  /**
   * Id of global item.
   */
  global_item_id?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemId_Response sub-interface for GetGlobalItemIdResponse
 */
export interface GetGlobalItemId_Response {
  item_id_map?: GetGlobalItemId_ItemIdMap[];
  [key: string]: any;
}
/**
 * Response data payload for get_global_item_id
 */
export type GetGlobalItemIdResponseData = GetGlobalItemId_Response;
/**
 * Response payload for get_global_item_id
 *
 * Get get_global_item_id by item_id. Only for China mainland sellers and Korean sellers.
 */
export type GetGlobalItemIdResponse = FetchResponse<GetGlobalItemIdResponseData>;
/**
 * Request parameters for get_global_item_info
 *
 * Get global item info.Only for China mainland sellers and Korean sellers.
 */
export interface GetGlobalItemInfoRequest {
  /**
   * Global item id list. Length limit is [1,20].
   */
  global_item_id_list: number[];
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_StockInfo sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_StockInfo {
  /**
   * The stock type.
   */
  stock_type?: number;
  /**
   * location_id of the stock.
   */
  stock_location_id?: string;
  /**
   * The normal stock quantity of the variation in the listing currency.
   */
  normal_stock?: number;
  /**
   * The reserved stock quantity of the variation in the listing currency.
   */
  reserved_stock?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_PriceInfo sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_PriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item in Shopee Listings.
   */
  currency?: string;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
  /**
   * SIP item price.
   */
  sip_item_price?: number;
  /**
   * source of sip' price. ( auto or manual).
   */
  sip_item_price_source?: string;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Image sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_Image {
  /**
   * List of image url.
   */
  image_id_list?: string[];
  /**
   * List of image id.
   */
  image_url_list?: string[];
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Dimension sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_Dimension {
  /**
   * The length of package for this global item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this global item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this global item, the unit is CM.
   */
  package_height?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_PreOrder sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_PreOrder {
  /**
   * Days to ship.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Video sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_Video {
  /**
   * Url of video.
   */
  video_url?: string;
  /**
   * Thumbnail of video.
   */
  thumbnail_url?: string;
  /**
   * Duration of video.
   */
  duration?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Brand sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_AttributeValue sub-interface for GetGlobalItemInfo_Attribute
 */
export interface GetGlobalItemInfo_AttributeValue {
  /**
   * Unique identifier for value of this item attribute.
   */
  value_id?: number;
  /**
   * Value name of this item attribute.
   */
  original_value_name?: string;
  /**
   * Value unit of this item attribute.
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Attribute sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_Attribute {
  /**
   * The Identify of each category.
   */
  attribute_id?: number;
  /**
   * The name of each attribute.
   */
  original_attribute_name?: string;
  attribute_value_list?: GetGlobalItemInfo_AttributeValue[];
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_ImageInfo sub-interface for GetGlobalItemInfo_Field
 */
export interface GetGlobalItemInfo_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  /**
   * Image url.
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Field sub-interface for GetGlobalItemInfo_ExtendedDescription
 */
export interface GetGlobalItemInfo_Field {
  /**
   * Type of extended description field: values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be returned through this field.
   */
  text?: string;
  /**
   * If field_type is image, image url will be returned through this field.
   */
  image_info?: GetGlobalItemInfo_ImageInfo;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_ExtendedDescription sub-interface for GetGlobalItemInfo_DescriptionInfo
 */
export interface GetGlobalItemInfo_ExtendedDescription {
  /**
   * Field of extended description
   */
  field_list?: GetGlobalItemInfo_Field[];
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_DescriptionInfo sub-interface for GetGlobalItemInfo_GlobalItem
 */
export interface GetGlobalItemInfo_DescriptionInfo {
  /**
   * If description_type is extended , Description information will be returned through this field.
   */
  extended_description?: GetGlobalItemInfo_ExtendedDescription;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_GlobalItem sub-interface for GetGlobalItemInfo_Response
 */
export interface GetGlobalItemInfo_GlobalItem {
  /**
   * Shopee's unique identifier for an global item.
   */
  global_item_id?: number;
  /**
   * Name of the global item.
   */
  global_item_name?: string;
  /**
   * Description of the global item.
   */
  description?: string;
  /**
   * An global item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  global_item_sku?: string;
  /**
   * The current status of the item. You can only query global product with normal status, otherwise api will return error.
   */
  global_item_status?: string;
  /**
   * Timestamp that indicates the date and time that the global item was created.
   */
  create_time?: Date | number;
  /**
   * Timestamp that indicates the last time that there was a change in value of the global item.
   */
  update_time?: Date | number;
  /**
   * If the item has models, this field will not be returned, please get it through get_model_list api.
   */
  stock_info?: GetGlobalItemInfo_StockInfo[];
  /**
   * If the item has models, price_info will not be returned. Please get the price of each model through the get_global_model_list api.
   */
  price_info?: GetGlobalItemInfo_PriceInfo[];
  image?: GetGlobalItemInfo_Image;
  /**
   * The weight of this global item, the unit is KG.If set the weight of global models under this item, will return the max weight of all global models during the switching period to ensure system compatibility, please switch to call v2.global_product.get_global_model_list to get the weight of models.
   */
  weight?: string;
  /**
   * The dimension of this global item.If set the dimension of global models under this global item, will return the dimension with largest volume calculated by height*length*width during the switching period to ensure system compatibility, please switch to call v2.global_product.get_global_model_list to get the dimension of models.
   */
  dimension?: GetGlobalItemInfo_Dimension;
  /**
   * If set the DTS of global models under this item, will return the max DTS of all global models during the switching period to ensure system compatibility, please switch to call v2.global_product.get_global_model_list to get the DTS of models.
   */
  pre_order?: GetGlobalItemInfo_PreOrder;
  /**
   * Url of size chart image.
   */
  size_chart?: string;
  /**
   * Is it second-hand.
   */
  condition?: string;
  /**
   * Does it contain model.
   */
  has_model?: boolean;
  video?: GetGlobalItemInfo_Video;
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number;
  brand?: GetGlobalItemInfo_Brand;
  attribute_list?: GetGlobalItemInfo_Attribute[];
  /**
   * New description field.New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: GetGlobalItemInfo_DescriptionInfo;
  /**
   * Type of description : values: See Data Definition- description_type (normal , extended).
   */
  description_type?: any;
  /**
   * whether item is fulfillment by shopee
   */
  is_fulfillment_by_shopee?: boolean;
  /**
   * size_chart 模板ID
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemInfo_Response sub-interface for GetGlobalItemInfoResponse
 */
export interface GetGlobalItemInfo_Response {
  global_item_list?: GetGlobalItemInfo_GlobalItem[];
  [key: string]: any;
}
/**
 * Response data payload for get_global_item_info
 */
export type GetGlobalItemInfoResponseData = GetGlobalItemInfo_Response;
/**
 * Response payload for get_global_item_info
 *
 * Get global item info.Only for China mainland sellers and Korean sellers.
 */
export type GetGlobalItemInfoResponse = FetchResponse<GetGlobalItemInfoResponseData>;
/**
 * Request parameters for get_global_item_limit
 *
 * Get global item upload control.
 */
export interface GetGlobalItemLimitRequest {
  category_id?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_PriceLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_PriceLimit {
  /**
   * Global item price min limit.
   */
  min_limit?: number;
  /**
   * Global item price max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_StockLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_StockLimit {
  /**
   * Global item stock min limit.
   */
  min_limit?: number;
  /**
   * Global item stock max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_GlobalItemNameLengthLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_GlobalItemNameLengthLimit {
  /**
   * Global item name length min limit.
   */
  min_limit?: number;
  /**
   * Global item name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_GlobalItemImageCountLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_GlobalItemImageCountLimit {
  /**
   * Global item image count min limit.
   */
  min_limit?: number;
  /**
   * Global item image count max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_GlobalItemDescriptionLengthLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_GlobalItemDescriptionLengthLimit {
  /**
   * Global item description length min limit.
   */
  min_limit?: number;
  /**
   * Global item description length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_TierVariationNameLengthLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_TierVariationNameLengthLimit {
  /**
   * Global item tier variation name length min limit.
   */
  min_limit?: number;
  /**
   * Global item tier variation name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_TierVariationOptionLengthLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_TierVariationOptionLengthLimit {
  /**
   * Global item tier variation option length min limit.
   */
  min_limit?: number;
  /**
   * Global item tier variation option length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_ExtendedDescriptionLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_ExtendedDescriptionLimit {
  /**
   * length min limit for item extended description text part
   */
  description_text_length_min?: number;
  /**
   * length max limit for item extended description text part
   */
  description_text_length_max?: number;
  /**
   * length min limit for item extended description image num
   */
  description_image_num_min?: number;
  /**
   * length max limit for item extended description image num
   */
  description_image_num_max?: number;
  /**
   * length min limit for item extended description image width
   */
  description_image_width_min?: number;
  /**
   * length min limit for item extended description image hight
   */
  description_image_height_min?: number;
  /**
   * length min limit for item extended description image aspect (image width / image hight )
   */
  description_image_aspect_ratio_min?: number;
  /**
   * length max limit for item extended description image aspect (image width / image hight )
   */
  description_image_aspect_ratio_max?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_DaysToShipRange sub-interface for GetGlobalItemLimit_DtsLimit
 */
export interface GetGlobalItemLimit_DaysToShipRange {
  min_limit?: number;
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_DtsLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_DtsLimit {
  /**
   * Allowed limit scope for Pre order
   */
  days_to_ship_range_list?: GetGlobalItemLimit_DaysToShipRange[];
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_WeightLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_WeightLimit {
  /**
   * weight is mandatory or not
   */
  weight_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_DimensionLimit sub-interface for GetGlobalItemLimit_Response
 */
export interface GetGlobalItemLimit_DimensionLimit {
  /**
   * dimension is mandatory or not for the category
   */
  dimension_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_Response sub-interface for GetGlobalItemLimitResponse
 */
export interface GetGlobalItemLimit_Response {
  price_limit?: GetGlobalItemLimit_PriceLimit;
  stock_limit?: GetGlobalItemLimit_StockLimit;
  global_item_name_length_limit?: GetGlobalItemLimit_GlobalItemNameLengthLimit;
  global_item_image_count_limit?: GetGlobalItemLimit_GlobalItemImageCountLimit;
  global_item_description_length_limit?: GetGlobalItemLimit_GlobalItemDescriptionLengthLimit;
  tier_variation_name_length_limit?: GetGlobalItemLimit_TierVariationNameLengthLimit;
  tier_variation_option_length_limit?: GetGlobalItemLimit_TierVariationOptionLengthLimit;
  /**
   * Length ratio of Chinese characters to English characters in parameter verification. len(text)=len(Chinese characters)*text_length_multiplier+len(English characters )
   */
  text_length_multiplier?: number;
  extended_description_limit?: GetGlobalItemLimit_ExtendedDescriptionLimit;
  dts_limit?: GetGlobalItemLimit_DtsLimit;
  weight_limit?: GetGlobalItemLimit_WeightLimit;
  dimension_limit?: GetGlobalItemLimit_DimensionLimit;
  [key: string]: any;
}
/**
 * GetGlobalItemLimit_SizeChartLimit sub-interface for GetGlobalItemLimitResponse
 */
export interface GetGlobalItemLimit_SizeChartLimit {
  size_chart_mandatory?: boolean;
  support_image_size_chart?: boolean;
  support_template_size_chart?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for get_global_item_limit
 */
export type GetGlobalItemLimitResponseData = GetGlobalItemLimit_Response;
/**
 * Response payload for get_global_item_limit
 *
 * Get global item upload control.
 */
export type GetGlobalItemLimitResponse = FetchResponse<GetGlobalItemLimitResponseData>;
/**
 * Request parameters for get_global_item_list
 *
 * Get global item id list. Only for China mainland sellers and Korean sellers.
 */
export interface GetGlobalItemListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is null. if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: string;
  /**
   * The size of one page. Limit is [1,50].
   */
  page_size: number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the item update time). The update_time_from field is the starting date range.
   */
  update_time_from?: Date | number;
  /**
   * The update_time_from and update_time_to fields specify a date range for retrieving orders (based on the item update time). The update_time_to field is the ending date range
   */
  update_time_to?: Date | number;
  [key: string]: any;
}
/**
 * GetGlobalItemList_GlobalItem sub-interface for GetGlobalItemList_Response
 */
export interface GetGlobalItemList_GlobalItem {
  /**
   * Shopee's unique identifier for an global item.
   */
  global_item_id?: number;
  /**
   * Timestamp that indicates the last time that there was a change in value of the item, such as price/stock change.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * GetGlobalItemList_Response sub-interface for GetGlobalItemListResponse
 */
export interface GetGlobalItemList_Response {
  global_item_list?: GetGlobalItemList_GlobalItem[];
  /**
   * Total global item count.
   */
  total_count?: number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * If has_next_page is true, this value need set to next request.offset.
   */
  offset?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_global_item_list
 */
export type GetGlobalItemListResponseData = GetGlobalItemList_Response;
/**
 * Response payload for get_global_item_list
 *
 * Get global item id list. Only for China mainland sellers and Korean sellers.
 */
export type GetGlobalItemListResponse = FetchResponse<GetGlobalItemListResponseData>;
/**
 * Request parameters for get_global_model_list
 *
 * Get global model list. Only for China mainland sellers and Korean sellers.
 */
export interface GetGlobalModelListRequest {
  /**
   * The id of global item.
   */
  global_item_id: number;
  [key: string]: any;
}
/**
 * GetGlobalModelList_Image sub-interface for GetGlobalModelList_Option
 */
export interface GetGlobalModelList_Image {
  /**
   * Image url.
   */
  image_url?: string;
  /**
   * Id of image.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * GetGlobalModelList_Option sub-interface for GetGlobalModelList_TierVariation
 */
export interface GetGlobalModelList_Option {
  /**
   * Tier option.
   */
  option?: string;
  /**
   * Image information of tier.
   */
  image?: GetGlobalModelList_Image;
  [key: string]: any;
}
/**
 * GetGlobalModelList_TierVariation sub-interface for GetGlobalModelList_Response
 */
export interface GetGlobalModelList_TierVariation {
  /**
   * Tier name.
   */
  name?: string;
  /**
   * Tier option list for corresponding tier name.
   */
  option_list?: GetGlobalModelList_Option[];
  [key: string]: any;
}
/**
 * GetGlobalModelList_PriceInfo sub-interface for GetGlobalModelList_GlobalModel
 */
export interface GetGlobalModelList_PriceInfo {
  /**
   * Original price of global model.
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * GetGlobalModelList_StockInfo sub-interface for GetGlobalModelList_GlobalModel
 */
export interface GetGlobalModelList_StockInfo {
  /**
   * Stock type. "1" means wms on hand, "2" means seller on hand.
   */
  stock_type?: number;
  /**
   * Stock location id.
   */
  stock_location_id?: string;
  /**
   * Current stock.
   */
  current_stock?: number;
  /**
   * Normal stock.
   */
  normal_stock?: number;
  /**
   * Reserved stock.
   */
  reserved_stock?: number;
  [key: string]: any;
}
/**
 * GetGlobalModelList_Dimension sub-interface for GetGlobalModelList_GlobalModel
 */
export interface GetGlobalModelList_Dimension {
  /**
   * The height of package for this global model, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this global model, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this global model, the unit is CM.
   */
  package_width?: number;
  [key: string]: any;
}
/**
 * GetGlobalModelList_PreOrder sub-interface for GetGlobalModelList_GlobalModel
 */
export interface GetGlobalModelList_PreOrder {
  /**
   * Days to ship.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetGlobalModelList_GlobalModel sub-interface for GetGlobalModelList_Response
 */
export interface GetGlobalModelList_GlobalModel {
  /**
   * Id of global model.
   */
  global_model_id?: number;
  /**
   * Sku of global model.
   */
  global_model_sku?: string;
  /**
   * Price info of global model.
   */
  price_info?: GetGlobalModelList_PriceInfo;
  /**
   * Stock info of global model.
   */
  stock_info?: GetGlobalModelList_StockInfo[];
  /**
   * Tier index of global model.
   */
  tier_index?: number[];
  /**
   * The weight of this global model, the unit is KG.If don't set the weight of this global model, will use the weight of global item by default.
   */
  weight?: string;
  /**
   * The dimension of this global model.If don't set the dimension of this global model, will use the dimension of global item by default.
   */
  dimension?: GetGlobalModelList_Dimension;
  /**
   * Pre-order information of this global model.Notes: If don't set the DTS of this global model, will use the DTS of the global item by default.
   */
  pre_order?: GetGlobalModelList_PreOrder;
  /**
   * If it it a FBS model
   */
  is_fulfillment_by_shopee?: boolean;
  [key: string]: any;
}
/**
 * GetGlobalModelList_VariationOption sub-interface for GetGlobalModelList_StandardiseTierVariation
 */
export interface GetGlobalModelList_VariationOption {
  /**
   * Standardise Tier variation Option ID.
   */
  variation_option_id?: number;
  /**
   * Standardise Tier variation Option Name.
   */
  variation_option_name?: string;
  /**
   * ID of image
   */
  image_id?: string;
  /**
   * URL of image
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * GetGlobalModelList_StandardiseTierVariation sub-interface for GetGlobalModelList_Response
 */
export interface GetGlobalModelList_StandardiseTierVariation {
  /**
   * Standardise Tier variation ID.
   */
  variation_id?: number;
  /**
   * Standardise Tier variation Name.
   */
  variation_name?: string;
  /**
   * Standardise Tier variation Group ID.
   */
  variation_group_id?: number;
  /**
   * Standardise Tier variation Options List.
   */
  variation_option_list?: GetGlobalModelList_VariationOption[];
  [key: string]: any;
}
/**
 * GetGlobalModelList_Response sub-interface for GetGlobalModelListResponse
 */
export interface GetGlobalModelList_Response {
  /**
   * Tier variation information of global item.
   */
  tier_variation?: GetGlobalModelList_TierVariation[];
  /**
   * Global models.
   */
  global_model?: GetGlobalModelList_GlobalModel[];
  /**
   * Standardise Tier variation information of global item.
   */
  standardise_tier_variation?: GetGlobalModelList_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * Response data payload for get_global_model_list
 */
export type GetGlobalModelListResponseData = GetGlobalModelList_Response;
/**
 * Response payload for get_global_model_list
 *
 * Get global model list. Only for China mainland sellers and Korean sellers.
 */
export type GetGlobalModelListResponse = FetchResponse<GetGlobalModelListResponseData>;
/**
 * Request parameters for get_local_adjustment_rate
 *
 * Retrieves the adjustment rate that converts CB stock price into local-warehouse price for a specific shop.
 */
export interface GetLocalAdjustmentRateRequest {
  /**
   * The unique identifier of the shop whose adjustment rate is being queried
   */
  shop_id: number;
  [key: string]: any;
}
/**
 * GetLocalAdjustmentRate_Response sub-interface for GetLocalAdjustmentRateResponse
 */
export interface GetLocalAdjustmentRate_Response {
  /**
   * The multiplier used to adjust the cross-border original price to local price
   */
  local_adjustment_rate?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_local_adjustment_rate
 */
export type GetLocalAdjustmentRateResponseData = GetLocalAdjustmentRate_Response;
/**
 * Response payload for get_local_adjustment_rate
 *
 * Retrieves the adjustment rate that converts CB stock price into local-warehouse price for a specific shop.
 */
export type GetLocalAdjustmentRateResponse = FetchResponse<GetLocalAdjustmentRateResponseData>;
/**
 * Request parameters for get_publish_task_result
 *
 * Get publish task result for global item. Only for China mainland sellers and Korean sellers.
 */
export interface GetPublishTaskResultRequest {
  /**
   * Id of publish task.
   */
  publish_task_id: number;
  [key: string]: any;
}
/**
 * GetPublishTaskResult_Succes sub-interface for GetPublishTaskResult_Response
 */
export interface GetPublishTaskResult_Succes {
  /**
   * The region of published item.
   */
  region?: string;
  /**
   * The shop id of published item.
   */
  shop_id?: string;
  /**
   * The id of published item.
   */
  item_id?: string;
  [key: string]: any;
}
/**
 * GetPublishTaskResult_Failed sub-interface for GetPublishTaskResult_Response
 */
export interface GetPublishTaskResult_Failed {
  /**
   * Failed reason.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * GetPublishTaskResult_Response sub-interface for GetPublishTaskResultResponse
 */
export interface GetPublishTaskResult_Response {
  /**
   * Status of publish task.
   */
  publish_status?: string;
  /**
   * If publish task is successful, this field shows the published results.
   */
  success?: GetPublishTaskResult_Succes;
  /**
   * If publish task is failed, this field shows the failed reason.
   */
  failed?: GetPublishTaskResult_Failed;
  [key: string]: any;
}
/**
 * Response data payload for get_publish_task_result
 */
export type GetPublishTaskResultResponseData = GetPublishTaskResult_Response;
/**
 * Response payload for get_publish_task_result
 *
 * Get publish task result for global item. Only for China mainland sellers and Korean sellers.
 */
export type GetPublishTaskResultResponse = FetchResponse<GetPublishTaskResultResponseData>;
/**
 * Request parameters for get_publishable_shop
 *
 * Get publishable shop list for global item. Only for China mainland sellers and Korean sellers.
 */
export interface GetPublishableShopRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Shop id list for checking if the shop is publishable.If not input the list, will return the first 300 publishable shop list in response
   */
  shop_id_list?: number[];
  [key: string]: any;
}
/**
 * GetPublishableShop_PublishableShop sub-interface for GetPublishableShop_Response
 */
export interface GetPublishableShop_PublishableShop {
  /**
   * Id of publishable shop.
   */
  shop_id?: number;
  /**
   * Region of published shop.
   */
  shop_region?: string;
  [key: string]: any;
}
/**
 * GetPublishableShop_Response sub-interface for GetPublishableShopResponse
 */
export interface GetPublishableShop_Response {
  /**
   * Detail of publishable shops.
   */
  publishable_shop?: GetPublishableShop_PublishableShop[];
  [key: string]: any;
}
/**
 * Response data payload for get_publishable_shop
 */
export type GetPublishableShopResponseData = GetPublishableShop_Response;
/**
 * Response payload for get_publishable_shop
 *
 * Get publishable shop list for global item. Only for China mainland sellers and Korean sellers.
 */
export type GetPublishableShopResponse = FetchResponse<GetPublishableShopResponseData>;
/**
 * Request parameters for get_published_list
 *
 * Get published item list of global item. Only for China mainland sellers and Korean sellers.
 */
export interface GetPublishedListRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Shop id list for checking if the shop is publishable.If not input the list, will return the first 300 publishable shop list in response after the migration period.
   */
  shop_id_list?: number[];
  [key: string]: any;
}
/**
 * GetPublishedList_PublishedItem sub-interface for GetPublishedList_Response
 */
export interface GetPublishedList_PublishedItem {
  /**
   * Shop id corresponding to the published item.
   */
  shop_id?: number;
  /**
   * Region of shop.
   */
  shop_region?: string;
  /**
   * Id of published item.
   */
  item_id?: number;
  /**
   * Status of published item.Applicable values: 0.DELETED(Item is deleted by seller himself),1.NORMAL, 2.BANNED,3.REVIEWING,4.INVALID(Shopee Admin deleted),5.INVALID_HIDE(Shopee Admin delete confirmed),6.BLACKLISTED(Offensive_hide),8.NORMAL_UNLIST
   */
  item_status?: number;
  [key: string]: any;
}
/**
 * GetPublishedList_Response sub-interface for GetPublishedListResponse
 */
export interface GetPublishedList_Response {
  /**
   * Detail of published items.
   */
  published_item?: GetPublishedList_PublishedItem[];
  [key: string]: any;
}
/**
 * Response data payload for get_published_list
 */
export type GetPublishedListResponseData = GetPublishedList_Response;
/**
 * Response payload for get_published_list
 *
 * Get published item list of global item. Only for China mainland sellers and Korean sellers.
 */
export type GetPublishedListResponse = FetchResponse<GetPublishedListResponseData>;
/**
 * Request parameters for get_recommend_attribute
 *
 * Get recommend attributes. Only for China mainland sellers and Korean sellers.
 */
export interface GetRecommendAttributeRequest {
  /**
   * Name of item.
   */
  global_item_name: string;
  /**
   * ID of category.
   */
  category_id: number;
  /**
   * ID of image.
   */
  cover_image_id?: string;
  [key: string]: any;
}
/**
 * GetRecommendAttribute_AttributeValue sub-interface for GetRecommendAttribute_Attribute
 */
export interface GetRecommendAttribute_AttributeValue {
  /**
   * ID of attribute value.
   */
  value_id?: number;
  [key: string]: any;
}
/**
 * GetRecommendAttribute_Attribute sub-interface for GetRecommendAttribute_Response
 */
export interface GetRecommendAttribute_Attribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  /**
   * Value list of this attribute.
   */
  attribute_value_list?: GetRecommendAttribute_AttributeValue[];
  [key: string]: any;
}
/**
 * GetRecommendAttribute_Response sub-interface for GetRecommendAttributeResponse
 */
export interface GetRecommendAttribute_Response {
  /**
   * Attribute info list.
   */
  attribute_list?: GetRecommendAttribute_Attribute[];
  [key: string]: any;
}
/**
 * Response data payload for get_recommend_attribute
 */
export type GetRecommendAttributeResponseData = GetRecommendAttribute_Response;
/**
 * Response payload for get_recommend_attribute
 *
 * Get recommend attributes. Only for China mainland sellers and Korean sellers.
 */
export type GetRecommendAttributeResponse = FetchResponse<GetRecommendAttributeResponseData>;
/**
 * Request parameters for get_shop_publishable_status
 *
 * Get publishable shop list for global item in pages.
 */
export interface GetShopPublishableStatusRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0. if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * the size of one page.Max=100
   */
  page_size: number;
  [key: string]: any;
}
/**
 * GetShopPublishableStatus_ShopPublishableStatus sub-interface for GetShopPublishableStatus_Response
 */
export interface GetShopPublishableStatus_ShopPublishableStatus {
  /**
   * Id of publishable shop.
   */
  shop_id?: number;
  /**
   * Region of published shop.
   */
  region?: string;
  /**
   * If the shop is publishable, ture means shop is publishable, fals means shop is unpublishable
   */
  shop_publishable_status?: boolean;
  /**
   * Return the unpublishable reason. If the shop is publishable, will return empty for this field.
   */
  unpublishable_reason?: string;
  [key: string]: any;
}
/**
 * GetShopPublishableStatus_Response sub-interface for GetShopPublishableStatusResponse
 */
export interface GetShopPublishableStatus_Response {
  /**
   * Detail of publishable shops.
   */
  shop_publishable_status_list?: GetShopPublishableStatus_ShopPublishableStatus[];
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * if has_next_page is true, this value need set to next request.offset
   */
  next_offset?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_shop_publishable_status
 */
export type GetShopPublishableStatusResponseData = GetShopPublishableStatus_Response;
/**
 * Response payload for get_shop_publishable_status
 *
 * Get publishable shop list for global item in pages.
 */
export type GetShopPublishableStatusResponse = FetchResponse<GetShopPublishableStatusResponseData>;
/**
 * Request parameters for get_size_chart_detail
 *
 * Get new size chart detail
 */
export interface GetSizeChartDetailRequest {
  size_chart_id: number;
  /**
   * language should be in the list: ["en", "zh-Hans"]
   */
  language?: string;
  [key: string]: any;
}
/**
 * GetSizeChartDetail_Measurement sub-interface for GetSizeChartDetail_Column
 */
export interface GetSizeChartDetail_Measurement {
  /**
   * there are 3 kinds of measurement type: Single Dropdown, Input Single Number, Input Range Number.
   */
  input_type?: string;
  /**
   * the unit of this size measurement.
   */
  unit?: string;
  /**
   * name of column header (measurement)
   */
  display_name?: string;
  [key: string]: any;
}
/**
 * GetSizeChartDetail_MeasurementValue sub-interface for GetSizeChartDetail_Column
 */
export interface GetSizeChartDetail_MeasurementValue {
  /**
   * if the input_type of measurement is single input number, measurement will have one value which is returned by this field.
   */
  value?: number;
  /**
   * if the input_type of measurement is input range number, measurement will be a range which is returned by 2 fields: min_value and max_value.
   */
  min_value?: number;
  /**
   * if the input_type of measurement is input range number, measurement will be a range which is returned by 2 fields: min_value and max_value.
   */
  max_value?: number;
  /**
   * if the input_type of measurement is single dropdown, measurement will have one value which is returned by this field.
   */
  option?: string;
  [key: string]: any;
}
/**
 * GetSizeChartDetail_Column sub-interface for GetSizeChartDetail_SizeChartTable
 */
export interface GetSizeChartDetail_Column {
  /**
   * this is the column header which means a kind of measurement
   */
  measurement?: GetSizeChartDetail_Measurement;
  /**
   * the list of measurement value
   */
  measurement_value_list?: GetSizeChartDetail_MeasurementValue[];
  [key: string]: any;
}
/**
 * GetSizeChartDetail_SizeChartTable sub-interface for GetSizeChartDetail_Response
 */
export interface GetSizeChartDetail_SizeChartTable {
  /**
   * column list of new size chart table. it include one column (measurement) and multiple values (measurement value)
   */
  column_list?: GetSizeChartDetail_Column[];
  [key: string]: any;
}
/**
 * GetSizeChartDetail_Response sub-interface for GetSizeChartDetailResponse
 */
export interface GetSizeChartDetail_Response {
  /**
   * ID of new size chart
   */
  size_chart_id?: number;
  /**
   * name of new size chart
   */
  size_chart_name?: string;
  /**
   * new size chart is a table format which include multiple columns. each column has column header (measurement) and multiple values (measurement value) of this column.
   */
  size_chart_table?: GetSizeChartDetail_SizeChartTable;
  [key: string]: any;
}
/**
 * Response data payload for get_size_chart_detail
 */
export type GetSizeChartDetailResponseData = GetSizeChartDetail_Response;
/**
 * Response payload for get_size_chart_detail
 *
 * Get new size chart detail
 */
export type GetSizeChartDetailResponse = FetchResponse<GetSizeChartDetailResponseData>;
/**
 * Request parameters for get_size_chart_list
 *
 * Get size chart list
 */
export interface GetSizeChartListRequest {
  category_id: number;
  page_size: number;
  cursor: string;
  [key: string]: any;
}
/**
 * GetSizeChartList_SizeChart sub-interface for GetSizeChartList_Response
 */
export interface GetSizeChartList_SizeChart {
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * GetSizeChartList_Response sub-interface for GetSizeChartListResponse
 */
export interface GetSizeChartList_Response {
  size_chart_list?: GetSizeChartList_SizeChart[];
  total_count?: number;
  next_cursor?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_size_chart_list
 */
export type GetSizeChartListResponseData = GetSizeChartList_Response;
/**
 * Response payload for get_size_chart_list
 *
 * Get size chart list
 */
export type GetSizeChartListResponse = FetchResponse<GetSizeChartListResponseData>;
/**
 * Request parameters for get_variations
 *
 * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure. The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
 */
export interface GetVariationsRequest {
  /**
   * Leaf category id
   */
  category_id: number;
  [key: string]: any;
}
/**
 * GetVariations_VariationOption sub-interface for GetVariations_VariationGroup
 */
export interface GetVariations_VariationOption {
  variation_option_id?: number;
  variation_option_name?: string;
  [key: string]: any;
}
/**
 * GetVariations_VariationGroup sub-interface for GetVariations_StandardiseVariation
 */
export interface GetVariations_VariationGroup {
  variation_group_id?: number;
  variation_group_name?: string;
  variation_option_list?: GetVariations_VariationOption[];
  [key: string]: any;
}
/**
 * GetVariations_StandardiseVariation sub-interface for GetVariationsResponse
 */
export interface GetVariations_StandardiseVariation {
  variation_id?: number;
  variation_name?: string;
  variation_group_list?: GetVariations_VariationGroup[];
  [key: string]: any;
}
/**
 * Response data payload for get_variations
 */
export interface GetVariationsResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  data?: any;
  standardise_variation_list?: GetVariations_StandardiseVariation[];
  [key: string]: any;
}
/**
 * Response payload for get_variations
 *
 * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure. The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
 */
export type GetVariationsResponse = FetchResponse<GetVariationsResponseData>;
/**
 * InitTierVariation_SellerStock sub-interface for InitTierVariation_GlobalModel
 */
export interface InitTierVariation_SellerStock {
  /**
   * location_id of stock, if the merchant has 3PF shop, the location_id cannot be empty, can use the get_merchant_warehouse_location_list API to obtain the location_id list of the merchant, if the merchant does not have 3PF shop (only has normal CBSC shop), the location_id can be empty
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
  [key: string]: any;
}
/**
 * InitTierVariation_Dimension sub-interface for InitTierVariation_GlobalModel
 */
export interface InitTierVariation_Dimension {
  /**
   * The height of package for this global model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this global model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this global model, the unit is CM.
   */
  package_width: number;
  [key: string]: any;
}
/**
 * InitTierVariation_PreOrder sub-interface for InitTierVariation_GlobalModel
 */
export interface InitTierVariation_PreOrder {
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship: number;
  [key: string]: any;
}
/**
 * InitTierVariation_GlobalModel sub-interface for InitTierVariationRequest
 */
export interface InitTierVariation_GlobalModel {
  /**
   * Original price of global model.
   */
  original_price: number;
  /**
   * seller_stock of global item
   */
  seller_stock?: InitTierVariation_SellerStock[];
  /**
   * Sku of global model. model_sku length information needs to be no more than 100 characters.
   */
  global_model_sku?: string;
  /**
   * Tier index of global model. Index starts from 0.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the global_model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  tier_index: TierIndex | string | number;
  /**
   * The weight of this global model, the unit is KG.If don't set the weight of this global model, will use the weight of global item by default.If set the dimension of this global model, them must set the weight of this global model.
   */
  weight?: number;
  /**
   * The dimension of this global model.If don't set the dimension of this global model, will use the dimension of global item by default.
   */
  dimension?: InitTierVariation_Dimension;
  /**
   * Pre-order information of this global model.Notes: If don't set the DTS of this global model, will use the DTS of the global item by default.
   */
  pre_order?: InitTierVariation_PreOrder;
  [key: string]: any;
}
/**
 * InitTierVariation_VariationOption sub-interface for InitTierVariation_StandardiseTierVariation
 */
export interface InitTierVariation_VariationOption {
  /**
   * standardise tier variation option ID
   */
  variation_option_id: number;
  /**
   * standardise tier variation option value
   */
  variation_option_name?: string;
  /**
   * standardise tier variation option image ID
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * InitTierVariation_StandardiseTierVariation sub-interface for InitTierVariationRequest
 */
export interface InitTierVariation_StandardiseTierVariation {
  /**
   * standardise tier variation ID
   */
  variation_id: number;
  /**
   * standardise tier variation name
   */
  variation_name?: string;
  /**
   * standardise tier variation group ID
   */
  variation_group_id?: number;
  /**
   * standardise tier variation option list
   */
  variation_option_list: InitTierVariation_VariationOption[];
  [key: string]: any;
}
/**
 * Request parameters for init_tier_variation
 *
 * Only for China mainland sellers and Korean sellers. If you only define color, it is one tier, if you define color and size, it is two tier. Support two tier structures at most. This API can change no tier to one tier, no tier to two tier, one tier to two tier, two tier to one tier, one tier to no tier, two tier to no tier. Please create variants after an interval of 5 seconds after creating an item, as there may be a delay.
 */
export interface InitTierVariationRequest {
  /**
   * Model info list, model number at most 50
   */
  global_model: InitTierVariation_GlobalModel[];
  /**
   * ID of global item.
   */
  global_item_id: number;
  /**
   * There is at least one standardise_tier_variation and tier_variation.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the global_model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  standardise_tier_variation?: InitTierVariation_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * Response data payload for init_tier_variation
 */
export interface InitTierVariationResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for init_tier_variation
 *
 * Only for China mainland sellers and Korean sellers. If you only define color, it is one tier, if you define color and size, it is two tier. Support two tier structures at most. This API can change no tier to one tier, no tier to two tier, one tier to two tier, two tier to one tier, one tier to no tier, two tier to no tier. Please create variants after an interval of 5 seconds after creating an item, as there may be a delay.
 */
export type InitTierVariationResponse = FetchResponse<InitTierVariationResponseData>;
/**
 * Request parameters for search_global_attribute_value_list
 *
 * this api is for searching attribute value list for attribute with support_search_value flag
 */
export interface SearchGlobalAttributeValueListRequest {
  attribute_id: number;
  value_name?: string;
  cursor: number;
  /**
   * The range is 1 to 100
   */
  limit: number;
  [key: string]: any;
}
/**
 * SearchGlobalAttributeValueList_Value sub-interface for SearchGlobalAttributeValueList_Response
 */
export interface SearchGlobalAttributeValueList_Value {
  value_id?: number;
  value_name?: string;
  [key: string]: any;
}
/**
 * SearchGlobalAttributeValueList_PageInfo sub-interface for SearchGlobalAttributeValueList_Response
 */
export interface SearchGlobalAttributeValueList_PageInfo {
  cursor?: number;
  has_next?: boolean;
  [key: string]: any;
}
/**
 * SearchGlobalAttributeValueList_Response sub-interface for SearchGlobalAttributeValueListResponse
 */
export interface SearchGlobalAttributeValueList_Response {
  value_list?: SearchGlobalAttributeValueList_Value[];
  page_info?: SearchGlobalAttributeValueList_PageInfo;
  [key: string]: any;
}
/**
 * Response data payload for search_global_attribute_value_list
 */
export type SearchGlobalAttributeValueListResponseData = SearchGlobalAttributeValueList_Response;
/**
 * Response payload for search_global_attribute_value_list
 *
 * this api is for searching attribute value list for attribute with support_search_value flag
 */
export type SearchGlobalAttributeValueListResponse =
  FetchResponse<SearchGlobalAttributeValueListResponseData>;
/**
 * SetSyncField_ShopSync sub-interface for SetSyncFieldRequest
 */
export interface SetSyncField_ShopSync {
  /**
   * Id of shop.
   */
  shop_id: number;
  /**
   * TW TH MY BR IN SG VN
   */
  shop_region: string;
  /**
   * sync name and description
   */
  name_and_description: boolean;
  /**
   * sync media information
   */
  media_information: boolean;
  /**
   * sync tier variation
   */
  tier_variation_name_and_option: boolean;
  /**
   * sync price
   */
  price: boolean;
  /**
   * sync days to ship info
   */
  days_to_ship: boolean;
  [key: string]: any;
}
/**
 * Request parameters for set_sync_field
 *
 * Set auto sync field. Only for China mainland sellers and Korean sellers.
 */
export interface SetSyncFieldRequest {
  /**
   * Length limit is [1,50].
   */
  shop_sync_list: SetSyncField_ShopSync[];
  [key: string]: any;
}
/**
 * Response data payload for set_sync_field
 */
export interface SetSyncFieldResponseData {
  /**
   * Warning  message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for set_sync_field
 *
 * Set auto sync field. Only for China mainland sellers and Korean sellers.
 */
export type SetSyncFieldResponse = FetchResponse<SetSyncFieldResponseData>;
/**
 * Request parameters for support_size_chart
 *
 * Get category support size chart. Only for China mainland sellers and Korean sellers.
 */
export interface SupportSizeChartRequest {
  /**
   * Id of category.
   */
  category_id: number;
  [key: string]: any;
}
/**
 * SupportSizeChart_Response sub-interface for SupportSizeChartResponse
 */
export interface SupportSizeChart_Response {
  /**
   * If category support size chart.
   */
  support_size_chart?: boolean;
  [key: string]: any;
}
/**
 * Response data payload for support_size_chart
 */
export type SupportSizeChartResponseData = SupportSizeChart_Response;
/**
 * Response payload for support_size_chart
 *
 * Get category support size chart. Only for China mainland sellers and Korean sellers.
 */
export type SupportSizeChartResponse = FetchResponse<SupportSizeChartResponseData>;
/**
 * UpdateGlobalItem_Dimension sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_Dimension {
  /**
   * The length of package for this global item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this global item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this global item, the unit is CM.
   */
  package_height?: number;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_PreOrder sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_PreOrder {
  /**
   * Days to ship.
   */
  days_to_ship: number;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_Image sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_Image {
  /**
   * Image id list of global item.
   */
  image_id_list: string[];
  [key: string]: any;
}
/**
 * UpdateGlobalItem_Brand sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_AttributeValue sub-interface for UpdateGlobalItem_Attribute
 */
export interface UpdateGlobalItem_AttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Name of attribute value. original_value_name from global_product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value.(quantitative attribute only)
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_Attribute sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_Attribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  attribute_value_list?: UpdateGlobalItem_AttributeValue[];
  [key: string]: any;
}
/**
 * UpdateGlobalItem_ImageInfo sub-interface for UpdateGlobalItem_Field
 */
export interface UpdateGlobalItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_Field sub-interface for UpdateGlobalItem_ExtendedDescription
 */
export interface UpdateGlobalItem_Field {
  /**
   * Type of extended description field ：values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image, image url will be set by this field.
   */
  image_info?: UpdateGlobalItem_ImageInfo;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_ExtendedDescription sub-interface for UpdateGlobalItem_DescriptionInfo
 */
export interface UpdateGlobalItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: UpdateGlobalItem_Field[];
  [key: string]: any;
}
/**
 * UpdateGlobalItem_DescriptionInfo sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: UpdateGlobalItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_SizeChartInfo sub-interface for UpdateGlobalItemRequest
 */
export interface UpdateGlobalItem_SizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both local shops and CB shops are supported to set "size_chart_id" now and seller need set the size_chart template in CBSC in advance
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * Request parameters for update_global_item
 *
 * Update global item. Only for China mainland sellers and Korean sellers.
 */
export interface UpdateGlobalItemRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Category id of global item.
   */
  category_id?: number;
  /**
   * Name of global item.
   */
  global_item_name?: string;
  /**
   * Description of global item.
   */
  description?: string;
  /**
   * Sku of global item.
   */
  global_item_sku?: string;
  /**
   * The weight of this global item, the unit is KG.Updating the weight of this global item will overwrite the weight of all global models under this global item.
   */
  weight?: number;
  /**
   * The dimension of this global item.Updating the dimension of this global item will overwrite the dimension of all global models under this global item.
   */
  dimension?: UpdateGlobalItem_Dimension;
  /**
   * Preorder information of global item.Updating the DTS of global item will overwrite the DTS of all global models under the global item
   */
  pre_order?: UpdateGlobalItem_PreOrder;
  /**
   * Condition of global item, "NEW" or "USED" is available.
   */
  condition?: string;
  /**
   * Image information of global item.
   */
  image?: UpdateGlobalItem_Image;
  /**
   * Video upload id of global item.
   */
  video_upload_id?: string[];
  brand?: UpdateGlobalItem_Brand;
  /**
   * Item attributes.
   */
  attribute_list?: UpdateGlobalItem_Attribute[];
  /**
   * New description field. New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateGlobalItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description or change description type ,this field must be inputed
   */
  description_type?: string;
  size_chart_info?: UpdateGlobalItem_SizeChartInfo;
  [key: string]: any;
}
/**
 * UpdateGlobalItem_Response sub-interface for UpdateGlobalItemResponse
 */
export interface UpdateGlobalItem_Response {
  /**
   * Id of updated global item.
   */
  global_item_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_global_item
 */
export type UpdateGlobalItemResponseData = UpdateGlobalItem_Response;
/**
 * Response payload for update_global_item
 *
 * Update global item. Only for China mainland sellers and Korean sellers.
 */
export type UpdateGlobalItemResponse = FetchResponse<UpdateGlobalItemResponseData>;
/**
 * UpdateGlobalModel_Dimension sub-interface for UpdateGlobalModel_GlobalModel
 */
export interface UpdateGlobalModel_Dimension {
  /**
   * The height of package for this global model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this global model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this global model, the unit is CM.
   */
  package_width: number;
  [key: string]: any;
}
/**
 * UpdateGlobalModel_PreOrder sub-interface for UpdateGlobalModel_GlobalModel
 */
export interface UpdateGlobalModel_PreOrder {
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship: number;
  [key: string]: any;
}
/**
 * UpdateGlobalModel_GlobalModel sub-interface for UpdateGlobalModelRequest
 */
export interface UpdateGlobalModel_GlobalModel {
  /**
   * Sku of global model.
   */
  global_model_sku: string;
  /**
   * ID of global model.
   */
  global_model_id: number;
  /**
   * The weight of this global model, the unit is KG.If don't set the weight of this global model, will use the weight of global item by default.If set the dimension of this global model, them must set the weight of this global model.
   */
  weight?: number;
  /**
   * The dimension of this global model.If don't set the dimension of this global model, will use the dimension of global item by default.
   */
  dimension?: UpdateGlobalModel_Dimension;
  /**
   * Pre-order information of this global model.Notes: If don't set the DTS of this global model, will use the DTS of the global item by default.
   */
  pre_order?: UpdateGlobalModel_PreOrder;
  [key: string]: any;
}
/**
 * Request parameters for update_global_model
 *
 * Update global model. Only for China mainland sellers and Korean sellers.
 */
export interface UpdateGlobalModelRequest {
  /**
   * ID of global item.
   */
  global_item_id: number;
  /**
   * Sku setting for global model. Limit is [1,50].
   */
  global_model: UpdateGlobalModel_GlobalModel[];
  [key: string]: any;
}
/**
 * Response data payload for update_global_model
 */
export interface UpdateGlobalModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_global_model
 *
 * Update global model. Only for China mainland sellers and Korean sellers.
 */
export type UpdateGlobalModelResponse = FetchResponse<UpdateGlobalModelResponseData>;
/**
 * Request parameters for update_local_adjustment_rate
 *
 * A multiplier that automatically converts your CB stock price into the local-warehouse price. It ensures your local inventory prices reflect regional costs, currency factors, and margin targets.
 */
export interface UpdateLocalAdjustmentRateRequest {
  /**
   * The multiplier used to adjust the cross-border original price to local price
   */
  adjustment_rate: number;
  /**
   * The unique identifier of the shop to which the adjustment rate applies
   */
  shop_id: number;
  [key: string]: any;
}
/**
 * Response data payload for update_local_adjustment_rate
 */
export interface UpdateLocalAdjustmentRateResponseData {
  /**
   * Indicate waring details if hit waring. Empty if no waring happened.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_local_adjustment_rate
 *
 * A multiplier that automatically converts your CB stock price into the local-warehouse price. It ensures your local inventory prices reflect regional costs, currency factors, and margin targets.
 */
export type UpdateLocalAdjustmentRateResponse =
  FetchResponse<UpdateLocalAdjustmentRateResponseData>;
/**
 * UpdatePrice_Price sub-interface for UpdatePriceRequest
 */
export interface UpdatePrice_Price {
  /**
   * ID of global model.
   */
  global_model_id?: number;
  /**
   * Original price of global item.
   */
  original_price: number;
  [key: string]: any;
}
/**
 * Request parameters for update_price
 *
 * Update global price. Only for China mainland sellers and Korean sellers.
 */
export interface UpdatePriceRequest {
  /**
   * ID of global item.
   */
  global_item_id: number;
  /**
   * Price setting for global model. Limit is [1,50].
   */
  price_list: UpdatePrice_Price[];
  [key: string]: any;
}
/**
 * Response data payload for update_price
 */
export interface UpdatePriceResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_price
 *
 * Update global price. Only for China mainland sellers and Korean sellers.
 */
export type UpdatePriceResponse = FetchResponse<UpdatePriceResponseData>;
/**
 * Request parameters for update_size_chart
 *
 * Update size chart for global item. Only for China mainland sellers and Korean sellers.
 */
export interface UpdateSizeChartRequest {
  /**
   * Id of global item.
   */
  global_item_id: number;
  /**
   * Image id of size chart.
   */
  size_chart: string;
  [key: string]: any;
}
/**
 * Response data payload for update_size_chart
 */
export interface UpdateSizeChartResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_size_chart
 *
 * Update size chart for global item. Only for China mainland sellers and Korean sellers.
 */
export type UpdateSizeChartResponse = FetchResponse<UpdateSizeChartResponseData>;
/**
 * UpdateStock_SellerStock sub-interface for UpdateStock_Stock
 */
export interface UpdateStock_SellerStock {
  /**
   * location_id of stock, if the merchant has 3PF shop, the location_id cannot be empty, can use the get_merchant_warehouse_location_list API to obtain the location_id list of the merchant, if the merchant does not have 3PF shop (only has normal CBSC shop), the location_id can be empty
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
  [key: string]: any;
}
/**
 * UpdateStock_Stock sub-interface for UpdateStockRequest
 */
export interface UpdateStock_Stock {
  /**
   * ID of global model.
   */
  global_model_id?: number;
  seller_stock?: UpdateStock_SellerStock[];
  [key: string]: any;
}
/**
 * Request parameters for update_stock
 *
 * Update global stock. Only for China mainland sellers and Korean sellers.
 */
export interface UpdateStockRequest {
  /**
   * ID of global item.
   */
  global_item_id: number;
  /**
   * Stock setting for global model. Limit is [1,50].
   */
  stock_list: UpdateStock_Stock[];
  [key: string]: any;
}
/**
 * Response data payload for update_stock
 */
export interface UpdateStockResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_stock
 *
 * Update global stock. Only for China mainland sellers and Korean sellers.
 */
export type UpdateStockResponse = FetchResponse<UpdateStockResponseData>;
/**
 * UpdateTierVariation_Model sub-interface for UpdateTierVariationRequest
 */
export interface UpdateTierVariation_Model {
  /**
   * ID of model
   */
  model_id: number;
  /**
   * Model's tier_variation
   */
  tier_index: number;
  [key: string]: any;
}
/**
 * UpdateTierVariation_VariationOption sub-interface for UpdateTierVariation_StandardiseTierVariation
 */
export interface UpdateTierVariation_VariationOption {
  variation_option_id: number;
  variation_option_name?: string;
  image_id?: string;
  [key: string]: any;
}
/**
 * UpdateTierVariation_StandardiseTierVariation sub-interface for UpdateTierVariationRequest
 */
export interface UpdateTierVariation_StandardiseTierVariation {
  /**
   * standardise tier variation ID
   */
  variation_id: number;
  /**
   * standardise tier variation name
   */
  variation_name?: string;
  /**
   * standardise tier variation group ID
   */
  variation_group_id?: number;
  /**
   * standardise tier variation option list
   */
  variation_option_list: UpdateTierVariation_VariationOption[];
  [key: string]: any;
}
/**
 * Request parameters for update_tier_variation
 *
 * Update global product tier variation. Only for China mainland sellers and Korean sellers.This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api.
 */
export interface UpdateTierVariationRequest {
  /**
   * ID of global item.
   */
  global_item_id: number;
  model_list?: UpdateTierVariation_Model[];
  /**
   * item standardise tier variation There is at least one standardise_tier_variation and tier_variation
   */
  standardise_tier_variation?: UpdateTierVariation_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * Response data payload for update_tier_variation
 */
export interface UpdateTierVariationResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_tier_variation
 *
 * Update global product tier variation. Only for China mainland sellers and Korean sellers.This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api.
 */
export type UpdateTierVariationResponse = FetchResponse<UpdateTierVariationResponseData>;
