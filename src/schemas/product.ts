// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field PisCofinsCst
 */
export enum PisCofinsCst {
  PIS = "PIS",
  COFINS = "Cofins",
}
/**
 * Enum generated for field GtinCode
 */
export enum GtinCode {
  ITEM = "item",
  MODEL = "model",
}
/**
 * Enum generated for field Language
 */
export enum Language {
  EN = "en",
  ES = "es",
}
/**
 * Enum generated for field Editable
 */
export enum Editable {
  EXPIRED = "EXPIRED",
  EDITABLE = "EDITABLE",
  HAVE_EDIT_ONCE = "HAVE_EDIT_ONCE",
}
/**
 * Enum generated for field GtinValidationRule
 */
export enum GtinValidationRule {
  ITEM = "item",
  MODEL = "model",
}
/**
 * Enum generated for field ItemStatus
 */
export enum ItemStatus {
  NORMAL = "NORMAL",
  BANNED = "BANNED",
  UNLIST = "UNLIST",
  REVIEWING = "REVIEWING",
  SELLER_DELETE = "SELLER_DELETE",
  SHOPEE_DELETEIF = "SHOPEE_DELETEIf",
}
/**
 * Enum generated for field PromotionStaging
 */
export enum PromotionStaging {
  ONGOING = "ongoing",
  UPCOMING = "upcoming",
}
/**
 * Enum generated for field TierIndex
 */
export enum TierIndex {
  TIER = "tier",
  TWO = "two",
}
/**
 * Enum generated for field CertificationNo
 */
export enum CertificationNo {
  PH = "ph",
  EDU = "edu",
  ARTICLE = "article",
}
/**
 * AddItemDimension sub-interface for AddItemRequest
 */
export interface AddItemDimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width: number;
}
/**
 * AddItemLogisticInfo sub-interface for AddItemRequest
 */
export interface AddItemLogisticInfo {
  /**
   * Size ID, If specify logistic fee_type is SIZE_SELECTION size_id is required.
   */
  size_id?: number;
  /**
   * Shipping fee, Only needed when logistics fee_type = CUSTOM_PRICE.
   */
  shipping_fee?: number;
  /**
   * Whether channel is enabled for this item
   */
  enabled: boolean;
  /**
   * ID of the channel
   */
  logistic_id: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free?: boolean;
}
/**
 * AddItemAttributeValue sub-interface for AddItemAttribute
 */
export interface AddItemAttributeValue {
  /**
   * Value ID. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id: number;
  /**
   * Value name. original_value_name from product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
}
/**
 * AddItemAttribute sub-interface for AddItemRequest
 */
export interface AddItemAttribute {
  /**
   * ID of attribute
   */
  attribute_id: number;
  attribute_value_list?: AddItemAttributeValue[];
}
/**
 * AddItemImage sub-interface for AddItemRequest
 */
export interface AddItemImage {
  /**
   * ID of image
   */
  image_id_list: string[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"only applicable to whitelisted seller.
   */
  image_ratio?: string;
}
/**
 * AddItemPreOrder sub-interface for AddItemRequest
 */
export interface AddItemPreOrder {
  /**
   * Whether item is pre order
   */
  is_pre_order: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_dts_limit api
   */
  days_to_ship?: number;
}
/**
 * AddItemWholesale sub-interface for AddItemRequest
 */
export interface AddItemWholesale {
  /**
   * Minimum count of this tier
   */
  min_count: number;
  /**
   * Maximum count of this tier
   */
  max_count: number;
  /**
   * Unit price of this tier
   */
  unit_price: number;
}
/**
 * AddItemBrand sub-interface for AddItemRequest
 */
export interface AddItemBrand {
  /**
   * Id of brand.
   */
  brand_id: number;
  /**
   * Original name of brand( No Brand if not brand).
   */
  original_brand_name: string;
}
/**
 * AddItemGroupItemInfo sub-interface for AddItemTaxInfo
 */
export interface AddItemGroupItemInfo {
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter 6.
   */
  group_qtd?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter UNI for the individual can.
   */
  group_unit?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unity), enter the value of the individual can.
   */
  group_unit_value?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Enter the price of the whole package.
   */
  original_group_price?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Please inform the GTIN SSCC code for the package.
   */
  group_gtin_sscc?: string;
  /**
   * Example: The item is box, that contain 6 packages. Each package contains 6 soda cans. Please inform the GRAI GTIN SSCC code for the Box.
   */
  group_grai_gtin_sscc?: string;
}
/**
 * AddItemTaxInfo sub-interface for AddItemRequest
 */
export interface AddItemTaxInfo {
  /**
   * Mercosur Common Nomenclature, it is a convention between Mercosur member countries to easily recognize goods, services and productive factors negotiated among themselves. (BR region)NCM must have 8 digits, OR, if your item doesn't have a NCM enter the value "00"
   */
  ncm?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in the same state. It identifies a specific operation by category at the time of issuing the invoice.(BR region)
   */
  same_state_cfop?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in different states. It identifies a specific operation by category at the time of issuing the invoice.(BR region)
   */
  diff_state_cfop?: string;
  /**
   * Code of Operation Status – Simples Nacional, code for company operations to identify the origin of the goods and the taxation regime of the operations.(BR region)
   */
  csosn?: string;
  /**
   * Product source, domestic or foreig (BR region).|0 - National, except for those indicated in codes 3, 4, 5, and 8|
   * |1 - Foreign: Direct import, except for that indicated in code 6|
   * |2 - Foreign: Acquired in the domestic market, except for that indicated in code 7|
   * |3 - National: Goods or products with Import Content greater than 40% and less than or equal to 70%|
   * |4 - National: Produced in compliance with the basic production processes outlined in the legislations cited in the Agreements|
   * |5 - National: Goods or products with Import Content less than or equal to 40%|
   * |6 - Foreign: Direct import, without a national equivalent, listed by CAMEX and natural gas|
   * |7 - Foreign: Acquired in the domestic market, without a national equivalent, listed by CAMEX and natural gas|
   * |8 - National: Goods or products with Import Content greater than 70%|
   */
  origin?: string;
  /**
   * Tax Replacement Specifying Code (CEST), to separate within the same NCM products that do or do not have ICMS tax substitution. (BR region)CEST must have 7 digits, OR, if your item doesn't have a CEST enter the value "00".
   */
  cest?: string;
  /**
   * (BR region)The value must be provided in uppercase and must match one of the supported units below:
   * AMPOLA, BALDE, BANDEJ, BARRA, BISNAG, BLOCO, BOBINA, BOMB, CAPS, CART, CENTO, CJ, CM, CM2, CX, CX2, CX3, CX5, CX10, CX15, CX20, CX25, CX50, CX100, DISP, DUZIA, EMBAL, FARDO, FOLHA, FRASCO, GALAO, GF, GRAMAS, JOGO, KG, KIT, LATA, LITRO, M, M2, M3, MILHEI, ML, MWH, PACOTE, PALETE, PARES, PC, POTE, K, RESMA, ROLO, SACO, SACOLA, TAMBOR, TANQUE, TON, TUBO, UN, VASIL, VIDRO.
   */
  measure_unit?: string;
  /**
   * tax_type only for TW whitelist shop. Shopee will referred Tax type when substitute sellers for issuing e-receipts to buyers. All variations share the same tax type. The meaning of value: 0: no tax type1: tax-able2: tax-free
   */
  tax_type?: number;
  /**
   * Only for BR shop.PIS - Programa de Integração Social (Social Integration Program). It is a government tax to collect resources for the payment of unemployment insurance and other employee related rights.PIS % - the tax applied to this product
   */
  pis?: string;
  /**
   * Only for BR shop.COFINS – Contribuição para Financiamento da Seguridade Social (Contribution for Social Security Funding). It is a government tax to collect resources for public health system and social security.COFINS % - the tax applied to this product
   */
  cofins?: string;
  /**
   * Only for BR shop.ICMS - Imposto sobre Circulação de Mercadorias e Serviços (Circulation of Goods and Services Tax). CST - Código da Situação Tributária (Tax Situation Code) is represented by a combination of 3 numbers with the purpose of demonstrating the origin of a product and determining the form of taxation that will apply to it. Therefore, each digit in the CST Table has a specific meaning: the first digit indicates the origin of the operation, the second digit represents the ICMS taxation on the operation and the third digit provides additional information about the form of taxation.
   */
  icms_cst?: string;
  /**
   * Only for BR shop.The CST PIS/Cofins is a code on the Electronic Invoice (NF-e) that identifies the tax situation of PIS (Programa de Integração Social) and Cofins (Contribuição para o Financiamento da Seguridade Social) in sales of goods.
   */
  pis_cofins_cst?: PisCofinsCst | string | number;
  /**
   * Only for BR shop.Enter the total percentage of the combination of federal, state, and municipal taxes, using up to two decimals.
   */
  federal_state_taxes?: string;
  /**
   * Only for BR shop.1: Retailer2: Manufacturer
   */
  operation_type?: string;
  /**
   * Only for BR shop.The EXTIPI field in the NF-e (Nota Fiscal Eletrônica) is used to indicate if there's an exception to the IPI (Imposto sobre Produtos Industrializados) tax rate for a specific product.
   */
  ex_tipi?: string;
  /**
   * Only for BR shop.The FCI Control Number is a unique identifier assigned to each import FCI (Import Content Form). It's mandatory on the corresponding NF-e (electronic invoice) to ensure compliance with Brazilian import tax regulations.
   */
  fci_num?: string;
  /**
   * Only for BR shop.RECOPI NACIONAL is a Brazilian government system that facilitates the registration and management of tax-exempt operations involving paper destined for printing books, newspapers, and periodicals (known as "papel imune" in Portuguese).
   */
  recopi_num?: string;
  /**
   * Only for BR shop.Include relevant information to display on Invoice.
   */
  additional_info?: string;
  /**
   * Only for BR shop.Required if the item is a group item.
   */
  group_item_info?: AddItemGroupItemInfo;
  /**
   * [BR region]7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
}
/**
 * AddItemComplaintPolicy sub-interface for AddItemRequest
 */
export interface AddItemComplaintPolicy {
  /**
   * Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS.
   */
  warranty_time?: string;
  /**
   * Whether to exclude warranty complaints for entrepreneurs.If True means "I exclude warranty complaints for entrepreneur"
   */
  exclude_entrepreneur_warranty?: boolean;
  /**
   * Address for complaint. Fetch available addresses using v2.logistics.get_address_list, and use address_id  returned from it.
   */
  complaint_address_id?: number;
  /**
   * Additional information for warranty claim. Should be less than 1000 characters.
   */
  additional_information?: string;
}
/**
 * AddItemImageInfo sub-interface for AddItemField
 */
export interface AddItemImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
}
/**
 * AddItemField sub-interface for AddItemExtendedDescription
 */
export interface AddItemField {
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
  image_info?: AddItemImageInfo;
}
/**
 * AddItemExtendedDescription sub-interface for AddItemDescriptionInfo
 */
export interface AddItemExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: AddItemField[];
}
/**
 * AddItemDescriptionInfo sub-interface for AddItemRequest
 */
export interface AddItemDescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: AddItemExtendedDescription;
}
/**
 * AddItemSellerStock sub-interface for AddItemRequest
 */
export interface AddItemSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
}
/**
 * AddItemPromotionImage sub-interface for AddItemRequest
 */
export interface AddItemPromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
}
/**
 * AddItemVehicleInfo sub-interface for AddItemCompatibilityInfo
 */
export interface AddItemVehicleInfo {
  /**
   * ID of the brand.
   */
  brand_id: number;
  /**
   * ID of the model.
   */
  model_id: number;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * ID of the version.
   */
  version_id?: number;
}
/**
 * AddItemCompatibilityInfo sub-interface for AddItemRequest
 */
export interface AddItemCompatibilityInfo {
  vehicle_info_list: AddItemVehicleInfo[];
}
/**
 * AddItemSizeChartInfo sub-interface for AddItemRequest
 */
export interface AddItemSizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
}
/**
 * AddItemCertificationProof sub-interface for AddItemCertification
 */
export interface AddItemCertificationProof {
  /**
   * The name of the uploaded certification proof file.
   */
  file_name: string;
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id: number;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio: number;
}
/**
 * AddItemCertification sub-interface for AddItemCertificationInfo
 */
export interface AddItemCertification {
  /**
   * Certification No.
   */
  certification_no: string;
  /**
   * Permit ID, get from v2.product.get_product_certification_rule
   */
  permit_id: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs: AddItemCertificationProof[];
}
/**
 * AddItemCertificationInfo sub-interface for AddItemRequest
 */
export interface AddItemCertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: AddItemCertification[];
}
/**
 * AddItemMaxPurchaseLimit sub-interface for AddItemPurchaseLimitInfo
 */
export interface AddItemMaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
}
/**
 * AddItemPurchaseLimitInfo sub-interface for AddItemRequest
 */
export interface AddItemPurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: AddItemMaxPurchaseLimit;
}
/**
 * Request parameters for add_item
 *
 * Add a new item.
 */
export interface AddItemRequest {
  /**
   * Item price
   */
  original_price: number;
  /**
   * if description_type is normal , Description information should be set by this field.
   */
  description: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight: number;
  /**
   * Item name
   */
  item_name: string;
  /**
   * Item status, could be UNLIST or NORMAL
   */
  item_status?: string;
  /**
   * The dimension of this item.
   */
  dimension?: AddItemDimension;
  /**
   * Logistic channel setting
   */
  logistic_info: AddItemLogisticInfo[];
  /**
   * This field is optional(expect Indonesia) depending on the specific attribute under different categories. Should call shopee.item.GetAttributes to get attribute first. Must contain all all mandatory attribute.
   */
  attribute_list?: AddItemAttribute[];
  /**
   * ID of category
   */
  category_id: number;
  /**
   * Item images
   */
  image: AddItemImage;
  /**
   * Pre order setting
   */
  pre_order?: AddItemPreOrder;
  /**
   * SKU tag of item
   */
  item_sku?: string;
  /**
   * Condition of item, could be USED or NEW
   */
  condition?: string;
  /**
   * Wholesale setting
   */
  wholesale?: AddItemWholesale[];
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  brand?: AddItemBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: AddItemTaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: AddItemComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: AddItemDescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed
   */
  description_type?: string;
  /**
   * seller stock（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: AddItemSellerStock[];
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * category recommendation service id
   */
  ds_cat_rcmd_id?: string;
  /**
   * Promotion ImageCurrently only allow one promoton imageYou could set promotion image only if the product images' ratio is 3:4
   */
  promotion_images?: AddItemPromotionImage;
  compatibility_info?: AddItemCompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: AddItemSizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: AddItemCertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: AddItemPurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
}
/**
 * AddItem_AddItemPreOrder sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemPreOrder {
  /**
   * The guaranteed days to ship orders.
   */
  days_to_ship: number;
  /**
   * Whether this item is pre order
   */
  is_pre_order: boolean;
}
/**
 * AddItem_AddItemImage sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemImage {
  /**
   * ID of image
   */
  image_id_list: string[];
  /**
   * Display URL of image
   */
  image_url_list: string[];
}
/**
 * AddItemPriceInfo sub-interface for AddItemResponseData
 */
export interface AddItemPriceInfo {
  /**
   * Current price of item
   */
  current_price: number;
  /**
   * Original price of item
   */
  original_price: number;
}
/**
 * AddItem_AddItemLogisticInfo sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemLogisticInfo {
  /**
   * Size ID
   */
  size_id: number;
  /**
   * Shipping fee
   */
  shipping_fee: number;
  /**
   * Whether this channel is enabled for this item
   */
  enabled: boolean;
  /**
   * Logistic channel ID
   */
  logistic_id: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free: boolean;
}
/**
 * AddItem_AddItemAttributeValue sub-interface for AddItemAttribute
 */
export interface AddItem_AddItemAttributeValue {
  /**
   * Value name
   */
  original_value_name?: string;
  /**
   * Value ID
   */
  value_id?: number;
  /**
   * Unit of attribute value
   */
  value_unit?: string;
}
/**
 * AddItemVideoInfo sub-interface for AddItemResponseData
 */
export interface AddItemVideoInfo {
  /**
   * Video playback url
   */
  video_url?: string;
  /**
   * Video preview image url
   */
  thumbnail_url?: string;
  /**
   * Video duration
   */
  duration?: number;
}
/**
 * AddItem_AddItemWholesale sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemWholesale {
  /**
   * Minimum count of this tier
   */
  min_count?: number;
  /**
   * Maximum count of this tier
   */
  max_count?: number;
  /**
   * Unit price of this tier
   */
  unit_price?: number;
}
/**
 * AddItem_AddItemBrand sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemBrand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
}
/**
 * AddItem_AddItemSellerStock sub-interface for AddItemResponseData
 */
export interface AddItem_AddItemSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
}
/**
 * AddItemResponseData sub-interface for AddItemResponse
 */
export interface AddItemResponseData {
  /**
   * Description of item
   */
  description: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight: number;
  /**
   * Pre order setting
   */
  pre_order: AddItem_AddItemPreOrder;
  /**
   * Item name
   */
  item_name: string;
  /**
   * Item images
   */
  images: AddItem_AddItemImage;
  /**
   * Item status
   */
  item_status: string;
  /**
   * Item price info
   */
  price_info: AddItemPriceInfo;
  /**
   * Logistic setting
   */
  logistic_info: AddItem_AddItemLogisticInfo[];
  /**
   * Item ID
   */
  item_id: number;
  /**
   * Item attributes
   */
  attribute: AddItemAttribute[];
  /**
   * Category ID
   */
  category_id: number;
  /**
   * The dimension of this item.
   */
  dimension: AddItemDimension;
  /**
   * Item condition, could be NEW or USED
   */
  condition: string;
  /**
   * Item video
   */
  video_info?: AddItemVideoInfo[];
  /**
   * Wholesale setting
   */
  wholesale?: AddItem_AddItemWholesale[];
  brand?: AddItem_AddItemBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * New description field. Only whitelist sellers can use it. If item with extended_description this field will return, otherwise do not return.
   */
  description_info?: AddItemDescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * Complaint Policy for item. Only returned for local PL sellers.
   */
  complaint_policy?: AddItemComplaintPolicy;
  /**
   * seller stock
   */
  seller_stock?: AddItem_AddItemSellerStock[];
}
/**
 * Response payload for add_item
 *
 * Add a new item.
 */
export type AddItemResponse = FetchResponse<AddItemResponseData>;
/**
 * AddKitItemImage sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemImage {
  /**
   * ID of image.
   */
  image_id_list: string[];
}
/**
 * AddKitItemLongImage sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemLongImage {
  /**
   * ID of image.
   */
  image_id_list: string[];
}
/**
 * AddKitItemImageInfo sub-interface for AddKitItemField
 */
export interface AddKitItemImageInfo {
  /**
   * Image id.
   */
  image_id: string;
}
/**
 * AddKitItemField sub-interface for AddKitItemExtendedDescription
 */
export interface AddKitItemField {
  /**
   * Type of extended description field. See Data Definition- description_field_type (text , image).
   */
  field_type: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text: string;
  /**
   * If field_type is image, image will be set by this field.
   */
  image_info?: AddKitItemImageInfo;
}
/**
 * AddKitItemExtendedDescription sub-interface for AddKitItemDescriptionInfo
 */
export interface AddKitItemExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list: AddKitItemField[];
}
/**
 * AddKitItemDescriptionInfo sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemDescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description: AddKitItemExtendedDescription;
}
/**
 * AddKitItemLogisticInfo sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemLogisticInfo {
  /**
   * ID of the channel.
   */
  logistic_id: number;
  /**
   * Whether channel is enabled for this kit item.
   */
  enabled: boolean;
  /**
   * Shipping fee. Only needed when logistics fee_type = CUSTOM_PRICE.
   */
  shipping_fee?: number;
  /**
   * Size ID. Only needed when logistic fee_type = SIZE_SELECTION.
   */
  size_id?: number;
  /**
   * Whether cover shipping fee for buyer.
   */
  is_free?: boolean;
}
/**
 * AddKitItemDimension sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemDimension {
  /**
   * The length of package for this kit item, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this kit item, the unit is CM.
   */
  package_width: number;
  /**
   * The height of package for this kit item, the unit is CM.
   */
  package_height: number;
}
/**
 * AddKitItemPreOrder sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemPreOrder {
  /**
   * Whether kit item is pre order.
   */
  is_pre_order: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_kit_item_limit api.
   */
  days_to_ship?: number;
}
/**
 * AddKitItemComponent sub-interface for AddKitItemModel
 */
export interface AddKitItemComponent {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  /**
   * The amount of the item/model that composes this kit model.
   */
  quantity: number;
  /**
   * Whether this item/model is the main component for this kit.One kit item can only have one item/model as main component.
   */
  main_component?: boolean;
}
/**
 * AddKitItemModel sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemModel {
  /**
   * Tier index of this kit model.
   */
  tier_index: number[];
  /**
   * Seller SKU of this kit model, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * Original price of this kit model.
   */
  original_price: number;
  /**
   * Please get the amount of item/model that one kit model support from get_kit_item_limit.
   */
  component_list: AddKitItemComponent[];
}
/**
 * AddKitItem_AddKitItemImage sub-interface for AddKitItemOption
 */
export interface AddKitItem_AddKitItemImage {
  /**
   * ID of image. If you choose to define, you need to define an image for all options.
   */
  image_id: string;
}
/**
 * AddKitItemOption sub-interface for AddKitItemTierVariation
 */
export interface AddKitItemOption {
  /**
   * Option name.
   */
  option: string;
  /**
   * Option image.
   */
  image?: AddKitItem_AddKitItemImage;
}
/**
 * AddKitItemTierVariation sub-interface for AddKitItemItemSetting
 */
export interface AddKitItemTierVariation {
  /**
   * Tier variation name.
   */
  name?: string;
  /**
   * Tier variation option info list.
   */
  option_list: AddKitItemOption[];
}
/**
 * AddKitItemItemSetting sub-interface for AddKitItemRequest
 */
export interface AddKitItemItemSetting {
  /**
   * The name of this kit item.
   */
  item_name: string;
  /**
   * Item images with 1:1 ratio.
   */
  images: AddKitItemImage;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: AddKitItemLongImage;
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  /**
   * If description_type is normal, description information should be set by this field.
   */
  description?: string;
  /**
   * Rich text description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: AddKitItemDescriptionInfo;
  /**
   * See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed.
   */
  description_type: string;
  /**
   * Logistic channel setting.
   */
  logistic_info: AddKitItemLogisticInfo[];
  /**
   * Unlist or not.
   */
  unlisted?: boolean;
  /**
   * SKU tag of item
   */
  item_sku?: string;
  /**
   * The weight of this kit item, the unit is KG.
   */
  weight: number;
  /**
   * The dimension of this kit item.
   */
  dimension?: AddKitItemDimension;
  /**
   * Pre order setting.
   */
  pre_order?: AddKitItemPreOrder;
  /**
   * Model info list, model number at most 9.
   */
  model_list: AddKitItemModel[];
  /**
   * Tier variation info list. Only support one tier variation, and each kit item can have from 1 to 9 kit variations.
   */
  tier_variation_list: AddKitItemTierVariation[];
}
/**
 * AddKitItemSyncSetting sub-interface for AddKitItemRequest
 */
export interface AddKitItemSyncSetting {
  /**
   * Auto sync the pre_order setting from main component or not.
   */
  auto_sync_dts: boolean;
}
/**
 * Request parameters for add_kit_item
 *
 * Create the kit item by selecting multiple items and setting main component and quantity per kit.
 */
export interface AddKitItemRequest {
  item_setting: AddKitItemItemSetting;
  sync_setting?: AddKitItemSyncSetting;
}
/**
 * AddKitItemResponseData sub-interface for AddKitItemResponse
 */
export interface AddKitItemResponseData {
  item_id?: number;
}
/**
 * Response payload for add_kit_item
 *
 * Create the kit item by selecting multiple items and setting main component and quantity per kit.
 */
export type AddKitItemResponse = FetchResponse<AddKitItemResponseData>;
/**
 * AddModelSellerStock sub-interface for AddModelModel
 */
export interface AddModelSellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
}
/**
 * AddModelDimension sub-interface for AddModelModel
 */
export interface AddModelDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width: number;
}
/**
 * AddModelPreOrder sub-interface for AddModelModel
 */
export interface AddModelPreOrder {
  /**
   * Whether the model is pre order.
   */
  is_pre_order: boolean;
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship?: number;
}
/**
 * AddModelModel sub-interface for AddModelRequest
 */
export interface AddModelModel {
  /**
   * Tier index of model
   */
  tier_index: number[];
  /**
   * Normal stock for price
   */
  original_price: number;
  /**
   * Seller sku, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * new stock info for model（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock: AddModelSellerStock[];
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: AddModelDimension;
  /**
   * Pre-order information of this model.Notes: If don't set the DTS of this model, will use the DTS of the item by default.
   */
  pre_order?: AddModelPreOrder;
}
/**
 * Request parameters for add_model
 *
 * Add model. More detail please check: https://open.shopee.com/developer-guide/219
 */
export interface AddModelRequest {
  /**
   * ID of item
   */
  item_id: number;
  /**
   * Model list
   */
  model_list: AddModelModel[];
}
/**
 * AddModelPriceInfo sub-interface for AddModel_AddModelModel
 */
export interface AddModelPriceInfo {
  /**
   * Original Price.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）
   */
  original_price?: number;
}
/**
 * AddModel_AddModelSellerStock sub-interface for AddModel_AddModelModel
 */
export interface AddModel_AddModelSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
}
/**
 * AddModel_AddModelDimension sub-interface for AddModel_AddModelModel
 */
export interface AddModel_AddModelDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width?: number;
}
/**
 * AddModel_AddModelModel sub-interface for AddModelResponseData
 */
export interface AddModel_AddModelModel {
  /**
   * model tier index
   */
  tier_index?: number[];
  /**
   * ID of model
   */
  model_id?: number;
  /**
   * Seller SKU of this model, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  price_info?: AddModelPriceInfo[];
  /**
   * new stock info
   */
  seller_stock?: AddModel_AddModelSellerStock[];
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: AddModel_AddModelDimension;
}
/**
 * AddModelResponseData sub-interface for AddModelResponse
 */
export interface AddModelResponseData {
  model?: AddModel_AddModelModel[];
}
/**
 * Response payload for add_model
 *
 * Add model. More detail please check: https://open.shopee.com/developer-guide/219
 */
export type AddModelResponse = FetchResponse<AddModelResponseData>;
/**
 * BatchAddItemDimension sub-interface for BatchAddItemItem
 */
export interface BatchAddItemDimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width: number;
}
/**
 * BatchAddItemLogisticInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemLogisticInfo {
  /**
   * Size ID, If specify logistic fee_type is SIZE_SELECTION size_id is required.
   */
  size_id?: number;
  /**
   * Shipping fee, Only needed when logistics fee_type = CUSTOM_PRICE.
   */
  shipping_fee?: number;
  /**
   * Whether channel is enabled for this item
   */
  enabled: boolean;
  /**
   * ID of the channel
   */
  logistic_id: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free?: boolean;
}
/**
 * BatchAddItemAttributeValue sub-interface for BatchAddItemAttribute
 */
export interface BatchAddItemAttributeValue {
  /**
   * Value ID. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id: number;
  /**
   * Value name. original_value_name from product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
}
/**
 * BatchAddItemAttribute sub-interface for BatchAddItemItem
 */
export interface BatchAddItemAttribute {
  /**
   * ID of attribute
   */
  attribute_id: number;
  attribute_value_list?: BatchAddItemAttributeValue[];
}
/**
 * BatchAddItemImage sub-interface for BatchAddItemItem
 */
export interface BatchAddItemImage {
  /**
   * ID of image
   */
  image_id_list: string[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"only applicable to whitelisted seller.
   */
  image_ratio?: string;
}
/**
 * BatchAddItemPreOrder sub-interface for BatchAddItemItem
 */
export interface BatchAddItemPreOrder {
  /**
   * Whether item is pre order
   */
  is_pre_order: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_dts_limit api
   */
  days_to_ship?: number;
}
/**
 * BatchAddItemWholesale sub-interface for BatchAddItemItem
 */
export interface BatchAddItemWholesale {
  /**
   * Minimum count of this tier
   */
  min_count: number;
  /**
   * Maximum count of this tier
   */
  max_count: number;
  /**
   * Unit price of this tier
   */
  unit_price: number;
}
/**
 * BatchAddItemBrand sub-interface for BatchAddItemItem
 */
export interface BatchAddItemBrand {
  /**
   * Id of brand.
   */
  brand_id: number;
  /**
   * Original name of brand( No Brand if not brand).
   */
  original_brand_name: string;
}
/**
 * BatchAddItemGroupItemInfo sub-interface for BatchAddItemTaxInfo
 */
export interface BatchAddItemGroupItemInfo {
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter 6.
   */
  group_qtd?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter UNI for the individual can.
   */
  group_unit?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unity), enter the value of the individual can.
   */
  group_unit_value?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Enter the price of the whole package.
   */
  original_group_price?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Please inform the GTIN SSCC code for the package.
   */
  group_gtin_sscc?: string;
  /**
   * Example: The item is box, that contain 6 packages. Each package contains 6 soda cans. Please inform the GRAI GTIN SSCC code for the Box.
   */
  group_grai_gtin_sscc?: string;
}
/**
 * BatchAddItemTaxInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemTaxInfo {
  /**
   * Mercosur Common Nomenclature, it is a convention between Mercosur member countries to easily recognize goods, services and productive factors negotiated among themselves. (BR region)NCM must have 8 digits, OR, if your item doesn't have a NCM enter the value "00"
   */
  ncm?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in the same state. It identifies a specific operation by category at the time of issuing the invoice.(BR region)
   */
  same_state_cfop?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in different states. It identifies a specific operation by category at the time of issuing the invoice.(BR region)
   */
  diff_state_cfop?: string;
  /**
   * Code of Operation Status – Simples Nacional, code for company operations to identify the origin of the goods and the taxation regime of the operations.(BR region)
   */
  csosn?: string;
  /**
   * Product source, domestic or foreig (BR region).|0 - National, except for those indicated in codes 3, 4, 5, and 8|
   * |1 - Foreign: Direct import, except for that indicated in code 6|
   * |2 - Foreign: Acquired in the domestic market, except for that indicated in code 7|
   * |3 - National: Goods or products with Import Content greater than 40% and less than or equal to 70%|
   * |4 - National: Produced in compliance with the basic production processes outlined in the legislations cited in the Agreements|
   * |5 - National: Goods or products with Import Content less than or equal to 40%|
   * |6 - Foreign: Direct import, without a national equivalent, listed by CAMEX and natural gas|
   * |7 - Foreign: Acquired in the domestic market, without a national equivalent, listed by CAMEX and natural gas|
   * |8 - National: Goods or products with Import Content greater than 70%|
   */
  origin?: string;
  /**
   * Tax Replacement Specifying Code (CEST), to separate within the same NCM products that do or do not have ICMS tax substitution. (BR region)CEST must have 7 digits, OR, if your item doesn't have a CEST enter the value "00".
   */
  cest?: string;
  /**
   * (BR region)
   */
  measure_unit?: string;
  /**
   * tax_type only for TW whitelist shop. Shopee will referred Tax type when substitute sellers for issuing e-receipts to buyers. All variations share the same tax type. The meaning of value: 0: no tax type1: tax-able2: tax-free
   */
  tax_type?: number;
  /**
   * Only for BR shop.PIS - Programa de Integração Social (Social Integration Program). It is a government tax to collect resources for the payment of unemployment insurance and other employee related rights.PIS % - the tax applied to this product
   */
  pis?: string;
  /**
   * Only for BR shop.COFINS – Contribuição para Financiamento da Seguridade Social (Contribution for Social Security Funding). It is a government tax to collect resources for public health system and social security.COFINS % - the tax applied to this product
   */
  cofins?: string;
  /**
   * Only for BR shop.ICMS - Imposto sobre Circulação de Mercadorias e Serviços (Circulation of Goods and Services Tax). CST - Código da Situação Tributária (Tax Situation Code) is represented by a combination of 3 numbers with the purpose of demonstrating the origin of a product and determining the form of taxation that will apply to it. Therefore, each digit in the CST Table has a specific meaning: the first digit indicates the origin of the operation, the second digit represents the ICMS taxation on the operation and the third digit provides additional information about the form of taxation.
   */
  icms_cst?: string;
  /**
   * Only for BR shop.The CST PIS/Cofins is a code on the Electronic Invoice (NF-e) that identifies the tax situation of PIS (Programa de Integração Social) and Cofins (Contribuição para o Financiamento da Seguridade Social) in sales of goods.
   */
  pis_cofins_cst?: PisCofinsCst | string | number;
  /**
   * Only for BR shop.Enter the total percentage of the combination of federal, state, and municipal taxes, using up to two decimals.
   */
  federal_state_taxes?: string;
  /**
   * Only for BR shop.1: Retailer2: Manufacturer
   */
  operation_type?: string;
  /**
   * Only for BR shop.The EXTIPI field in the NF-e (Nota Fiscal Eletrônica) is used to indicate if there's an exception to the IPI (Imposto sobre Produtos Industrializados) tax rate for a specific product.
   */
  ex_tipi?: string;
  /**
   * Only for BR shop.The FCI Control Number is a unique identifier assigned to each import FCI (Import Content Form). It's mandatory on the corresponding NF-e (electronic invoice) to ensure compliance with Brazilian import tax regulations.
   */
  fci_num?: string;
  /**
   * Only for BR shop.RECOPI NACIONAL is a Brazilian government system that facilitates the registration and management of tax-exempt operations involving paper destined for printing books, newspapers, and periodicals (known as "papel imune" in Portuguese).
   */
  recopi_num?: string;
  /**
   * Only for BR shop.Include relevant information to display on Invoice.
   */
  additional_info?: string;
  /**
   * Only for BR shop.Required if the item is a group item.
   */
  group_item_info?: BatchAddItemGroupItemInfo;
  /**
   * [BR region]7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
}
/**
 * BatchAddItemComplaintPolicy sub-interface for BatchAddItemItem
 */
export interface BatchAddItemComplaintPolicy {
  /**
   * Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS.
   */
  warranty_time?: string;
  /**
   * Whether to exclude warranty complaints for entrepreneurs.If True means "I exclude warranty complaints for entrepreneur"
   */
  exclude_entrepreneur_warranty?: boolean;
  /**
   * Address for complaint. Fetch available addresses using v2.logistics.get_address_list, and use address_id  returned from it.
   */
  complaint_address_id?: number;
  /**
   * Additional information for warranty claim. Should be less than 1000 characters.
   */
  additional_information?: string;
}
/**
 * BatchAddItemImageInfo sub-interface for BatchAddItemField
 */
export interface BatchAddItemImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
}
/**
 * BatchAddItemField sub-interface for BatchAddItemExtendedDescription
 */
export interface BatchAddItemField {
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
  image_info?: BatchAddItemImageInfo;
}
/**
 * BatchAddItemExtendedDescription sub-interface for BatchAddItemDescriptionInfo
 */
export interface BatchAddItemExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: BatchAddItemField[];
}
/**
 * BatchAddItemDescriptionInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemDescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: BatchAddItemExtendedDescription;
}
/**
 * BatchAddItemSellerStock sub-interface for BatchAddItemItem
 */
export interface BatchAddItemSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
}
/**
 * BatchAddItemPromotionImage sub-interface for BatchAddItemItem
 */
export interface BatchAddItemPromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
}
/**
 * BatchAddItemVehicleInfo sub-interface for BatchAddItemCompatibilityInfo
 */
export interface BatchAddItemVehicleInfo {
  /**
   * ID of the brand.
   */
  brand_id: number;
  /**
   * ID of the model.
   */
  model_id: number;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * ID of the version.
   */
  version_id?: number;
}
/**
 * BatchAddItemCompatibilityInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemCompatibilityInfo {
  vehicle_info_list: BatchAddItemVehicleInfo[];
}
/**
 * BatchAddItemSizeChartInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemSizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
}
/**
 * BatchAddItemCertificationProof sub-interface for BatchAddItemCertification
 */
export interface BatchAddItemCertificationProof {
  /**
   * The name of the uploaded certification proof file.
   */
  file_name: string;
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id: number;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio: number;
}
/**
 * BatchAddItemCertification sub-interface for BatchAddItemCertificationInfo
 */
export interface BatchAddItemCertification {
  /**
   * Certification No.
   */
  certification_no: string;
  /**
   * Permit ID, get from v2.product.get_product_certification_rule
   */
  permit_id: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs: BatchAddItemCertificationProof[];
}
/**
 * BatchAddItemCertificationInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemCertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: BatchAddItemCertification[];
}
/**
 * BatchAddItemMaxPurchaseLimit sub-interface for BatchAddItemPurchaseLimitInfo
 */
export interface BatchAddItemMaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
}
/**
 * BatchAddItemPurchaseLimitInfo sub-interface for BatchAddItemItem
 */
export interface BatchAddItemPurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: BatchAddItemMaxPurchaseLimit;
}
/**
 * BatchAddItemItem sub-interface for BatchAddItemRequest
 */
export interface BatchAddItemItem {
  /**
   * Item price
   */
  original_price: number;
  /**
   * if description_type is normal , Description information should be set by this field.
   */
  description: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight: number;
  /**
   * Item name
   */
  item_name: string;
  /**
   * Item status, could be UNLIST or NORMAL
   */
  item_status?: string;
  /**
   * The dimension of this item.
   */
  dimension?: BatchAddItemDimension;
  /**
   * Logistic channel setting
   */
  logistic_info: BatchAddItemLogisticInfo[];
  /**
   * This field is optional(expect Indonesia) depending on the specific attribute under different categories. Should call shopee.item.GetAttributes to get attribute first. Must contain all all mandatory attribute.
   */
  attribute_list?: BatchAddItemAttribute[];
  /**
   * ID of category
   */
  category_id: number;
  /**
   * Item images
   */
  image: BatchAddItemImage;
  /**
   * Pre order setting
   */
  pre_order?: BatchAddItemPreOrder;
  /**
   * SKU tag of item
   */
  item_sku?: string;
  /**
   * Condition of item, could be USED or NEW
   */
  condition?: string;
  /**
   * Wholesale setting
   */
  wholesale?: BatchAddItemWholesale[];
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  brand?: BatchAddItemBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: BatchAddItemTaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: BatchAddItemComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: BatchAddItemDescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed
   */
  description_type?: string;
  /**
   * seller stock（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: BatchAddItemSellerStock[];
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * category recommendation service id
   */
  ds_cat_rcmd_id?: string;
  /**
   * Promotion ImageCurrently only allow one promoton imageYou could set promotion image only if the product images' ratio is 3:4
   */
  promotion_images?: BatchAddItemPromotionImage;
  compatibility_info?: BatchAddItemCompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: BatchAddItemSizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: BatchAddItemCertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: BatchAddItemPurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
}
/**
 * Request parameters for batch_add_item
 *
 * Create asynchronous task to batch add item
 */
export interface BatchAddItemRequest {
  /**
   * The item list to batch add. The list size must be between 1 and 100.
   */
  item_list: BatchAddItemItem[];
}
/**
 * BatchAddItemResponseData sub-interface for BatchAddItemResponse
 */
export interface BatchAddItemResponseData {
  /**
   * The task ID of the batch add item task.
   */
  task_id?: number;
}
/**
 * Response payload for batch_add_item
 *
 * Create asynchronous task to batch add item
 */
export type BatchAddItemResponse = FetchResponse<BatchAddItemResponseData>;
/**
 * BatchPublishItemToOutletShopSellerStock sub-interface for BatchPublishItemToOutletShopModel
 */
export interface BatchPublishItemToOutletShopSellerStock {
  /**
   * The location ID.
   */
  location_id?: string;
  /**
   * The stock quantity of the location.
   */
  stock: number;
}
/**
 * BatchPublishItemToOutletShopPreOrder sub-interface for BatchPublishItemToOutletShopModel
 */
export interface BatchPublishItemToOutletShopPreOrder {
  /**
   * Indicate whether the model is pre-order.
   */
  is_pre_order: boolean;
  /**
   * The days to ship for pre-order model.
   */
  days_to_ship?: number;
}
/**
 * BatchPublishItemToOutletShopModel sub-interface for BatchPublishItemToOutletShopPublishItem
 */
export interface BatchPublishItemToOutletShopModel {
  /**
   * The related model ID of the product in the Mart shop.
   */
  relate_mart_model_id?: number;
  /**
   * The model status.
   */
  model_status?: string;
  /**
   * The original price of the outlet model.
   */
  original_price?: number;
  /**
   * The seller stock by location.
   */
  seller_stock?: BatchPublishItemToOutletShopSellerStock[];
  /**
   * The pre-order setting of the model.
   */
  pre_order?: BatchPublishItemToOutletShopPreOrder;
}
/**
 * BatchPublishItemToOutletShopLogisticInfo sub-interface for BatchPublishItemToOutletShopPublishItem
 */
export interface BatchPublishItemToOutletShopLogisticInfo {
  /**
   * The logistics channel ID used for shipping the item.
   */
  logistic_id?: number;
  /**
   * Indicates whether the logistics channel is enabled for the item.
   */
  enabled: boolean;
  /**
   * The shipping fee charged to the buyer for this logistics channel.
   */
  shipping_fee?: number;
  /**
   * The parcel size ID used to calculate shipping fees.
   */
  size_id?: number;
  /**
   * Indicates whether free shipping is applied for this logistics channel.
   */
  is_free?: boolean;
}
/**
 * BatchPublishItemToOutletShopMaxPurchaseLimit sub-interface for BatchPublishItemToOutletShopPurchaseLimitInfo
 */
export interface BatchPublishItemToOutletShopMaxPurchaseLimit {
  /**
   * The maximum quantity that a buyer is allowed to purchase per order.
   */
  purchase_limit?: number;
}
/**
 * BatchPublishItemToOutletShopPurchaseLimitInfo sub-interface for BatchPublishItemToOutletShopPublishItem
 */
export interface BatchPublishItemToOutletShopPurchaseLimitInfo {
  /**
   * The minimum quantity that a buyer is allowed to purchase per order.
   */
  min_purchase_limit?: number;
  /**
   * The maximum purchase quantity configuration for the item.
   */
  max_purchase_limit?: BatchPublishItemToOutletShopMaxPurchaseLimit;
}
/**
 * BatchPublishItemToOutletShopPublishItem sub-interface for BatchPublishItemToOutletShopItem
 */
export interface BatchPublishItemToOutletShopPublishItem {
  /**
   * The item ID of the item in the Outlet shop.
   */
  outlet_item_id?: number;
  /**
   * The outlet model list.
   */
  model?: BatchPublishItemToOutletShopModel[];
  /**
   * The logistic information of the outlet item.
   */
  logistic_info?: BatchPublishItemToOutletShopLogisticInfo[];
  /**
   * The purchase limit information of the outlet item.
   */
  purchase_limit_info?: BatchPublishItemToOutletShopPurchaseLimitInfo;
}
/**
 * BatchPublishItemToOutletShopItem sub-interface for BatchPublishItemToOutletShopRequest
 */
export interface BatchPublishItemToOutletShopItem {
  /**
   * The item ID of the item in the Mart shop.
   */
  mart_item_id: number;
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id: number;
  /**
   * The outlet item data to publish.
   */
  publish_item: BatchPublishItemToOutletShopPublishItem;
}
/**
 * Request parameters for batch_publish_item_to_outlet_shop
 *
 * Create asynchronous task to batch publish outlet item
 */
export interface BatchPublishItemToOutletShopRequest {
  /**
   * The item list to batch publish to Outlet shop. The list size must be between 1 and 100.
   */
  item_list: BatchPublishItemToOutletShopItem[];
}
/**
 * BatchPublishItemToOutletShopResponseData sub-interface for BatchPublishItemToOutletShopResponse
 */
export interface BatchPublishItemToOutletShopResponseData {
  /**
   * The task ID of the batch publish outlet item task.
   */
  task_id?: number;
}
/**
 * Response payload for batch_publish_item_to_outlet_shop
 *
 * Create asynchronous task to batch publish outlet item
 */
export type BatchPublishItemToOutletShopResponse =
  FetchResponse<BatchPublishItemToOutletShopResponseData>;
/**
 * BatchUpdateOutletPricePrice sub-interface for BatchUpdateOutletPriceItem
 */
export interface BatchUpdateOutletPricePrice {
  /**
   * The model ID of the product. Empty for item without model.
   */
  model_id?: number;
  /**
   * The original price to update. The value must be greater than 0.
   */
  original_price: number;
}
/**
 * BatchUpdateOutletPriceItem sub-interface for BatchUpdateOutletPriceRequest
 */
export interface BatchUpdateOutletPriceItem {
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id: number;
  /**
   * The item ID of the item in the Outlet shop.
   */
  item_id: number;
  /**
   * The price list of item models. The list size must be at least 1.
   */
  price_list: BatchUpdateOutletPricePrice[];
}
/**
 * Request parameters for batch_update_outlet_price
 *
 * Create asynchronous task to batch update outlet item's price
 */
export interface BatchUpdateOutletPriceRequest {
  /**
   * The item list to batch update price. The list size must be between 1 and 100.
   */
  item_list: BatchUpdateOutletPriceItem[];
}
/**
 * BatchUpdateOutletPriceResponseData sub-interface for BatchUpdateOutletPriceResponse
 */
export interface BatchUpdateOutletPriceResponseData {
  /**
   * The task ID of the batch update price task.
   */
  task_id?: number;
}
/**
 * Response payload for batch_update_outlet_price
 *
 * Create asynchronous task to batch update outlet item's price
 */
export type BatchUpdateOutletPriceResponse = FetchResponse<BatchUpdateOutletPriceResponseData>;
/**
 * BatchUpdateOutletStockSellerStock sub-interface for BatchUpdateOutletStockStock
 */
export interface BatchUpdateOutletStockSellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * The stock quantity of the location.
   */
  stock: number;
}
/**
 * BatchUpdateOutletStockStock sub-interface for BatchUpdateOutletStockItem
 */
export interface BatchUpdateOutletStockStock {
  /**
   * The model ID of the product. Empty for item without model.
   */
  model_id?: number;
  /**
   * The seller stock by location.
   */
  seller_stock: BatchUpdateOutletStockSellerStock[];
}
/**
 * BatchUpdateOutletStockItem sub-interface for BatchUpdateOutletStockRequest
 */
export interface BatchUpdateOutletStockItem {
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id: number;
  /**
   * The item ID of the item in the Outlet shop.
   */
  item_id: number;
  /**
   * The stock list of item models. The list size must be at least 1.
   */
  stock_list: BatchUpdateOutletStockStock[];
}
/**
 * Request parameters for batch_update_outlet_stock
 *
 * Create asynchronous task to batch update outlet stock
 */
export interface BatchUpdateOutletStockRequest {
  /**
   * The item list to batch update stock. The list size must be between 1 and 100.
   */
  item_list: BatchUpdateOutletStockItem[];
}
/**
 * BatchUpdateOutletStockResponseData sub-interface for BatchUpdateOutletStockResponse
 */
export interface BatchUpdateOutletStockResponseData {
  /**
   * The task ID of the batch update stock task.
   */
  task_id?: number;
}
/**
 * Response payload for batch_update_outlet_stock
 *
 * Create asynchronous task to batch update outlet stock
 */
export type BatchUpdateOutletStockResponse = FetchResponse<BatchUpdateOutletStockResponseData>;
/**
 * Request parameters for boost_item
 *
 * Boost item.
 */
export interface BoostItemRequest {
  /**
   * Shopee's unique identifier for an item, limit:[1,5]
   */
  item_id_list: number[];
}
/**
 * BoostItemFailure sub-interface for BoostItemResponseData
 */
export interface BoostItemFailure {
  /**
   * Failed item ID.
   */
  item_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
}
/**
 * BoostItemSuccess sub-interface for BoostItemResponseData
 */
export interface BoostItemSuccess {
  /**
   * Success item ID.
   */
  item_id_list?: number[];
}
/**
 * BoostItemResponseData sub-interface for BoostItemResponse
 */
export interface BoostItemResponseData {
  failure_list?: BoostItemFailure[];
  success_list?: BoostItemSuccess[];
}
/**
 * Response payload for boost_item
 *
 * Boost item.
 */
export type BoostItemResponse = FetchResponse<BoostItemResponseData>;
/**
 * Request parameters for category_recommend
 *
 * Recommend category by item name.
 */
export interface CategoryRecommendRequest {
  /**
   * name of item
   */
  item_name: string;
  /**
   * Please use the image id returned by v2.media_space.upload_image api, we will ignore if this field is empty string
   */
  product_cover_image?: string;
}
/**
 * CategoryRecommendResponseData sub-interface for CategoryRecommendResponse
 */
export interface CategoryRecommendResponseData {
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number[];
}
/**
 * Response payload for category_recommend
 *
 * Recommend category by item name.
 */
export type CategoryRecommendResponse = FetchResponse<CategoryRecommendResponseData>;
/**
 * Request parameters for delete_item
 *
 * Use this call to delete a product item.
 */
export interface DeleteItemRequest {
  /**
   * The identity of product item.
   */
  item_id: number;
}
/**
 * Response data payload for delete_item
 */
export interface DeleteItemResponseData {
  /**
   * Indicate waring details if hit waring. Empty if no waring happened.
   */
  warning?: string;
}
/**
 * Response payload for delete_item
 *
 * Use this call to delete a product item.
 */
export type DeleteItemResponse = FetchResponse<DeleteItemResponseData>;
/**
 * Request parameters for delete_model
 *
 * Delete item model.
 */
export interface DeleteModelRequest {
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * ID of model.
   */
  model_id: number;
}
/**
 * Response data payload for delete_model
 */
export interface DeleteModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for delete_model
 *
 * Delete item model.
 */
export type DeleteModelResponse = FetchResponse<DeleteModelResponseData>;
/**
 * GenerateKitImageComponent sub-interface for GenerateKitImageRequest
 */
export interface GenerateKitImageComponent {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
}
/**
 * Request parameters for generate_kit_image
 *
 * This API generates a single consolidated image by combining the cover images of all selected items. It is typically used to create a unified product display image for kits or bundles.
 */
export interface GenerateKitImageRequest {
  /**
   * Please send up until 9 components.
   */
  component_list: GenerateKitImageComponent[];
}
/**
 * GenerateKitImageResponseData sub-interface for GenerateKitImageResponse
 */
export interface GenerateKitImageResponseData {
  /**
   * generated kit image
   */
  kit_image?: string;
}
/**
 * Response payload for generate_kit_image
 *
 * This API generates a single consolidated image by combining the cover images of all selected items. It is typically used to create a unified product display image for kits or bundles.
 */
export type GenerateKitImageResponse = FetchResponse<GenerateKitImageResponseData>;
/**
 * Request parameters for get_aitem_by_pitem_id
 *
 * Get the list of A Items under SIP Affiliate Shop corresponding to P Items under SIP Primary Shop.
 */
export interface GetAitemByPitemIdRequest {
  /**
   * ID of item under SIP Primary Shop.
   */
  pitem_id: number;
}
/**
 * GetAitemByPitemIdModelMapping sub-interface for GetAitemByPitemIdAitem
 */
export interface GetAitemByPitemIdModelMapping {
  /**
   * ID of model for the P Item.
   */
  pmodel_id?: number;
  /**
   * ID of model for the A Item.
   */
  amodel_id?: number;
}
/**
 * GetAitemByPitemIdAitem sub-interface for GetAitemByPitemIdResponseData
 */
export interface GetAitemByPitemIdAitem {
  /**
   * ID of SIP Affiliate Shop.
   */
  ashop_id?: number;
  /**
   * Region of SIP Affiliate Shop.
   */
  ashop_region?: string;
  /**
   * ID of item under SIP Affiliate Shop corresponding to the P Item.
   */
  aitem_id?: number;
  /**
   * If the P Item does not have model, then the model_mapping_list will not be returned.
   */
  model_mapping_list?: GetAitemByPitemIdModelMapping[];
}
/**
 * GetAitemByPitemIdResponseData sub-interface for GetAitemByPitemIdResponse
 */
export interface GetAitemByPitemIdResponseData {
  aitem_list?: GetAitemByPitemIdAitem[];
}
/**
 * Response payload for get_aitem_by_pitem_id
 *
 * Get the list of A Items under SIP Affiliate Shop corresponding to P Items under SIP Primary Shop.
 */
export type GetAitemByPitemIdResponse = FetchResponse<GetAitemByPitemIdResponseData>;
/**
 * Request parameters for get_all_vehicle_list
 *
 * Use this Open API to get all vehicle list.
 */
export interface GetAllVehicleListRequest {
  /**
   * The size of one page. Max=100
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: number;
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ; BR: en / pt-br ; MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL. Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data
   */
  language?: Language | string | number;
}
/**
 * GetAllVehicleListVehicle sub-interface for GetAllVehicleListResponseData
 */
export interface GetAllVehicleListVehicle {
  /**
   * ID of the brand.
   */
  brand_id?: number;
  /**
   * Name of the brand.
   */
  brand_name?: string;
  /**
   * ID of the model.
   */
  model_id?: number;
  /**
   * Name of the model.
   */
  model_name?: string;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * Name of the year.
   */
  year_name?: string;
  /**
   * ID of the version.
   */
  version_id?: number;
  /**
   * Name of the version.
   */
  version_name?: string;
}
/**
 * GetAllVehicleListResponseData sub-interface for GetAllVehicleListResponse
 */
export interface GetAllVehicleListResponseData {
  vehicle_list?: GetAllVehicleListVehicle[];
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * If has_next_page is true, this value need set to next request offset
   */
  next_offset?: number;
}
/**
 * Response payload for get_all_vehicle_list
 *
 * Use this Open API to get all vehicle list.
 */
export type GetAllVehicleListResponse = FetchResponse<GetAllVehicleListResponseData>;
/**
 * Request parameters for get_attribute_tree
 *
 * Get the attribute tree for categories
 */
export interface GetAttributeTreeRequest {
  /**
   * max count is 20
   */
  category_id_list: number[];
  /**
   * LanguageSupport Lanuage:"SG": [        "en",        "zh-Hans",        "ms"      ], "MY": [        "en",        "zh-Hans",        "ms"      ], "PH": [        "en",        "zh-Hans"      ], "VN": [        "vn",        "en"      ], "ID": [        "id",        "en"      ], "TH": [        "th",        "en"      ], "BR": [        "pt-BR",        "en"      ], "MX": [        "es-MX",        "en"      ], "CO": [        "es-CO",        "en"      ], "CL": [        "es-CL",        "en"      ], "TW": [        "zh-Hant",        "zh-Hans",        "en"      ],"IN": [        "en",        "hi"      ]
   */
  language?: string;
}
/**
 * GetAttributeTreeMultiLang sub-interface for GetAttributeTreeAttributeValue
 */
export interface GetAttributeTreeMultiLang {
  /**
   * Language
   */
  language?: string;
  /**
   * Translate result
   */
  value?: string;
}
/**
 * GetAttributeTreeAttributeValue sub-interface for GetAttributeTreeAttributeTree
 */
export interface GetAttributeTreeAttributeValue {
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
   * Translate results for display
   */
  multi_lang?: GetAttributeTreeMultiLang[];
}
/**
 * GetAttributeTreeAttributeInfo sub-interface for GetAttributeTreeAttributeTree
 */
export interface GetAttributeTreeAttributeInfo {
  /**
   * SINGLE_DROP_DOWN = 1 SINGLE_COMBO_BOX = 2 FREE_TEXT_FILED        = 3 MULTI_DROP_DOWN   = 4 MULTI_COMBO_BOX   = 5
   */
  input_type?: number;
  /**
   * VALIDATOR_NO_VALIDATE_TYPE =  0 VALIDATOR_INT_TYPE = 1 VALIDATOR_STRING_TYPE = 2VALIDATOR_FLOAT_TYPE = 3 VALIDATOR_DATE_TYPE = 4
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
   * Max selected value count
   */
  max_value_count?: number;
  /**
   * Introduction for special Attribute
   */
  introduction?: string;
  is_oem?: boolean;
  /**
   * Indicates whether this attribute has searchable values.If yes, please call v2.product.search_attribute_value_list to get the default values
   */
  support_search_value?: boolean;
}
/**
 * GetAttributeTreeAttributeTree sub-interface for GetAttributeTreeList
 */
export interface GetAttributeTreeAttributeTree {
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
  attribute_value_list?: GetAttributeTreeAttributeValue[];
  /**
   * Attribute extra info
   */
  attribute_info?: GetAttributeTreeAttributeInfo;
  /**
   * Attribute translate info
   */
  multi_lang?: GetAttributeTreeMultiLang[];
}
/**
 * GetAttributeTreeList sub-interface for GetAttributeTreeResponseData
 */
export interface GetAttributeTreeList {
  /**
   * One category's attribute trees
   */
  attribute_tree?: GetAttributeTreeAttributeTree[];
  /**
   * Category ID
   */
  category_id?: number;
  /**
   * Warning msg
   */
  warning?: string;
}
/**
 * GetAttributeTreeResponseData sub-interface for GetAttributeTreeResponse
 */
export interface GetAttributeTreeResponseData {
  /**
   * Each result corresponds to one category in category_ids
   */
  list?: GetAttributeTreeList[];
}
/**
 * Response payload for get_attribute_tree
 *
 * Get the attribute tree for categories
 */
export type GetAttributeTreeResponse = FetchResponse<GetAttributeTreeResponseData>;
/**
 * Request parameters for get_batch_task_result
 *
 * Query batch task result
 */
export interface GetBatchTaskResultRequest {
  /**
   * The task type. 1: price; 2: stock; 3: publish outlet; 4: add item.
   */
  task_type: number;
  /**
   * The task ID to query.
   */
  task_id: number;
}
/**
 * GetBatchTaskResultSuccess sub-interface for GetBatchTaskResultResponseData
 */
export interface GetBatchTaskResultSuccess {
  /**
   * The shop ID
   */
  shop_id?: number;
  /**
   * The item ID of the item in the shop.
   */
  item_id?: number;
  /**
   * The model ID of the model in the shop.
   */
  model_id?: number;
}
/**
 * GetBatchTaskResultFailed sub-interface for GetBatchTaskResultResponseData
 */
export interface GetBatchTaskResultFailed {
  /**
   * The shop ID
   */
  shop_id?: number;
  /**
   * The item ID of the item in the shop.
   */
  item_id?: number;
  /**
   * The model ID of the model in the shop.
   */
  model_id?: number;
  /**
   * The failed reason.
   */
  failed_reason?: string;
}
/**
 * GetBatchTaskResultResponseData sub-interface for GetBatchTaskResultResponse
 */
export interface GetBatchTaskResultResponseData {
  /**
   * The publish status. 1: ongoing; 2: finished.
   */
  publish_status?: number;
  /**
   * The batch task success records.
   */
  success_list?: GetBatchTaskResultSuccess[];
  /**
   * The batch task failed records.
   */
  failed_list?: GetBatchTaskResultFailed[];
}
/**
 * Response payload for get_batch_task_result
 *
 * Query batch task result
 */
export type GetBatchTaskResultResponse = FetchResponse<GetBatchTaskResultResponseData>;
/**
 * Request parameters for get_boosted_list
 *
 * Get boosted item list.
 */
export type GetBoostedListRequest = Record<string, never>;
/**
 * GetBoostedListItem sub-interface for GetBoostedListResponseData
 */
export interface GetBoostedListItem {
  /**
   * Shopee's unique identifier for an item
   */
  item_id?: number;
  /**
   * Remain cool down time
   */
  cool_down_second?: number;
}
/**
 * GetBoostedListResponseData sub-interface for GetBoostedListResponse
 */
export interface GetBoostedListResponseData {
  item_list?: GetBoostedListItem[];
}
/**
 * Response payload for get_boosted_list
 *
 * Get boosted item list.
 */
export type GetBoostedListResponse = FetchResponse<GetBoostedListResponseData>;
/**
 * Request parameters for get_brand_list
 *
 * Get the brand data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
 */
export interface GetBrandListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0. If data is more than one page,this field needs to be replaced with "next_offset" to request,and the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * the size of one page.Max=100
   */
  page_size: number;
  /**
   * ID of category.
   */
  category_id: number;
  /**
   * Brand status , 1: normal brand, 2: pending brand
   */
  status: number;
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ;  BR: en / pt-br ;  MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL. Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data
   */
  language?: Language | string | number;
}
/**
 * GetBrandListBrand sub-interface for GetBrandListResponseData
 */
export interface GetBrandListBrand {
  /**
   * Original name of brand
   */
  original_brand_name?: string;
  brand_id?: number;
  /**
   * Display name of brand
   */
  display_brand_name?: string;
}
/**
 * GetBrandListResponseData sub-interface for GetBrandListResponse
 */
export interface GetBrandListResponseData {
  brand_list?: GetBrandListBrand[];
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
}
/**
 * Response payload for get_brand_list
 *
 * Get the brand data of a leaf category. More detail please check: https://open.shopee.com/developer-guide/209
 */
export type GetBrandListResponse = FetchResponse<GetBrandListResponseData>;
/**
 * Request parameters for get_category
 *
 * Get category tree data. More detail please check https://open.shopee.com/developer-guide/209
 */
export interface GetCategoryRequest {
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ;  BR: en / pt-br ;  MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL .Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data
   */
  language?: Language | string | number;
}
/**
 * GetCategoryCategory sub-interface for GetCategoryResponseData
 */
export interface GetCategoryCategory {
  /**
   * ID for category.
   */
  category_id?: number;
  /**
   * ID for parent category.
   */
  parent_category_id?: number;
  /**
   * Default name for category.
   */
  original_category_name?: string;
  /**
   * Display name dependent on display name.
   */
  display_category_name?: string;
  /**
   * Whether this category has active children category.
   */
  has_children?: boolean;
}
/**
 * GetCategoryResponseData sub-interface for GetCategoryResponse
 */
export interface GetCategoryResponseData {
  category_list?: GetCategoryCategory[];
}
/**
 * Response payload for get_category
 *
 * Get category tree data. More detail please check https://open.shopee.com/developer-guide/209
 */
export type GetCategoryResponse = FetchResponse<GetCategoryResponseData>;
/**
 * Request parameters for get_comment
 *
 * Use this api to get comment by shop_id, item_id, or comment_id, get up to 1000 comments.
 */
export interface GetCommentRequest {
  /**
   * The identity of product item.
   */
  item_id?: number;
  /**
   * The identity of comment.
   */
  comment_id?: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the offset can be some entry to start next call.
   */
  cursor: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size: number;
}
/**
 * GetCommentCommentReply sub-interface for GetCommentItemComment
 */
export interface GetCommentCommentReply {
  /**
   * The content of reply.
   */
  reply?: string;
  /**
   * The comment reply is hidden or not.
   */
  hidden?: boolean;
  /**
   * The time the seller replied to the comment.
   */
  create_time?: Date | number;
}
/**
 * GetCommentMedia sub-interface for GetCommentItemComment
 */
export interface GetCommentMedia {
  /**
   * List of image url uploaded by the buyer in the comment.
   */
  image_url_list?: string[];
  /**
   * List of video url uploaded by the buyer in the comment.
   */
  video_url_list?: string[];
}
/**
 * GetCommentItemComment sub-interface for GetCommentResponseData
 */
export interface GetCommentItemComment {
  /**
   * Shopee's unique identifier for an order.
   */
  order_sn?: string;
  /**
   * The identity of comment.
   */
  comment_id?: string;
  /**
   * The content of the comment.
   */
  comment?: string;
  /**
   * The username of the buyer who posted the comment.
   */
  buyer_username?: string;
  /**
   * The commented item's id
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a model of an item. It will only return 0 now. Will be offline on 2024-12-27, please switch to use model_id_list.
   */
  model_id?: number;
  /**
   * Buyer's rating for the item.
   */
  rating_star?: number;
  /**
   * The editable status of the comment. The value may be one of  EXPIRED/EDITABLE/HAVE_EDIT_ONCE.
   */
  editable?: Editable | string | number;
  /**
   * The comment is hidden or not.
   */
  hidden?: boolean;
  /**
   * The create time of the comment.
   */
  create_time?: Date | number;
  /**
   * The reply of the comment.
   */
  comment_reply?: GetCommentCommentReply;
  /**
   * List of model id of the buyer's purchase corresponding to the comment.
   */
  model_id_list?: number[];
  media?: GetCommentMedia;
}
/**
 * GetCommentResponseData sub-interface for GetCommentResponse
 */
export interface GetCommentResponseData {
  /**
   * This is to indicate whether the comment list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of comments. But only respond 500 comments at most through OpenAPI, if there are more than 500, this field "more" also respond "true".
   */
  more?: boolean;
  /**
   * The comment data list of the items.
   */
  item_comment_list?: GetCommentItemComment[];
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
}
/**
 * Response payload for get_comment
 *
 * Use this api to get comment by shop_id, item_id, or comment_id, get up to 1000 comments.
 */
export type GetCommentResponse = FetchResponse<GetCommentResponseData>;
/**
 * Request parameters for get_direct_item_list
 *
 * get direct item by main item.
 */
export interface GetDirectItemListRequest {
  /**
   * Item id of main shop.
   */
  main_item_id: number[];
}
/**
 * GetDirectItemListDirectItem sub-interface for GetDirectItemListList
 */
export interface GetDirectItemListDirectItem {
  /**
   * Id of direct shop.
   */
  direct_shop_id?: number;
  /**
   * Item id of direct shop.
   */
  direct_item_id?: number;
}
/**
 * GetDirectItemListList sub-interface for GetDirectItemListResponseData
 */
export interface GetDirectItemListList {
  /**
   * Item id of main shop.
   */
  main_item_id?: number;
  direct_item_list?: GetDirectItemListDirectItem[];
}
/**
 * GetDirectItemListResponseData sub-interface for GetDirectItemListResponse
 */
export interface GetDirectItemListResponseData {
  list?: GetDirectItemListList[];
}
/**
 * Response payload for get_direct_item_list
 *
 * get direct item by main item.
 */
export type GetDirectItemListResponse = FetchResponse<GetDirectItemListResponseData>;
/**
 * GetDirectShopRecommendedPriceModel sub-interface for GetDirectShopRecommendedPriceRequest
 */
export interface GetDirectShopRecommendedPriceModel {
  /**
   * Id of main model.
   */
  model_id?: number;
  /**
   * Tier index of main model. Index starts from 0.
   */
  tier_index?: number[];
  input_price?: number;
  weight?: number;
}
/**
 * Request parameters for get_direct_shop_recommended_price
 *
 * get recommend price for direct shop.
 */
export interface GetDirectShopRecommendedPriceRequest {
  main_item_id: number;
  /**
   * Direct shop regions.
   */
  direct_shop_regions: string[];
  /**
   * Main_item's category.
   */
  category_id?: number;
  /**
   * Main model model info.
   */
  model_list?: GetDirectShopRecommendedPriceModel[];
  /**
   * direct shop enabled channel
   */
  enabled_channel_id_list?: number[];
}
/**
 * GetDirectShopRecommendedPriceItemModelPrice sub-interface for GetDirectShopRecommendedPriceDirectItemPrice
 */
export interface GetDirectShopRecommendedPriceItemModelPrice {
  /**
   * Id of main model.
   */
  model_id?: number;
  /**
   * Tier index of main model. Index starts from 0.
   */
  tier_index?: number[];
  price?: number;
}
/**
 * GetDirectShopRecommendedPriceDirectItemPrice sub-interface for GetDirectShopRecommendedPriceResponseData
 */
export interface GetDirectShopRecommendedPriceDirectItemPrice {
  /**
   * Id of direct shop.
   */
  shop_id?: number;
  /**
   * Region of direct shop.
   */
  region?: string;
  hidden_price?: number;
  item_model_price_list?: GetDirectShopRecommendedPriceItemModelPrice[];
}
/**
 * GetDirectShopRecommendedPriceResponseData sub-interface for GetDirectShopRecommendedPriceResponse
 */
export interface GetDirectShopRecommendedPriceResponseData {
  direct_item_price?: GetDirectShopRecommendedPriceDirectItemPrice[];
}
/**
 * Response payload for get_direct_shop_recommended_price
 *
 * get recommend price for direct shop.
 */
export type GetDirectShopRecommendedPriceResponse =
  FetchResponse<GetDirectShopRecommendedPriceResponseData>;
/**
 * Request parameters for get_item_base_info
 *
 * Use this api to get basic info of item by item_id list.
 */
export interface GetItemBaseInfoRequest {
  /**
   * item_id list; limit [0,50]
   */
  item_id_list: number[];
  /**
   * if true will response tax_info
   */
  need_tax_info?: boolean;
  /**
   * if true will response complaint_policy
   */
  need_complaint_policy?: boolean;
}
/**
 * GetItemBaseInfoAttributeValue sub-interface for GetItemBaseInfoAttribute
 */
export interface GetItemBaseInfoAttributeValue {
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
}
/**
 * GetItemBaseInfoAttribute sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoAttribute {
  /**
   * The Identify of each category.
   */
  attribute_id?: number;
  /**
   * The name of each attribute.
   */
  original_attribute_name?: string;
  /**
   * This is to indicate whether this attribute is mandantory.
   */
  is_mandatory?: boolean;
  attribute_value_list?: GetItemBaseInfoAttributeValue[];
}
/**
 * GetItemBaseInfoPriceInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoPriceInfo {
  /**
   * The three-digit code representing the currency unit used for the item in Shopee Listings.
   */
  currency?: string;
  /**
   * The original price of the item in the listing currency.
   */
  original_price?: number;
  /**
   * The current price of the item in the listing currency. If product under a onging promotion, current_price will be the promotion price
   */
  current_price?: number;
  /**
   * The After-tax original price of the item in the listing currency.
   */
  inflated_price_of_original_price?: number;
  /**
   * The After-tax current price of the item in the listing currency.
   */
  inflated_price_of_current_price?: number;
  /**
   * The price of the item in sip.If item is for CNSC primary shop, this field will not be returned
   */
  sip_item_price?: number;
  /**
   * source of sip' price. ( auto or manual).If item is for CNSC SIP primary shop, this field will not be returned
   */
  sip_item_price_source?: string;
  /**
   * The original price multiplied by the local adjustment rate equals the local price. The local price is denominated in the local currency and is rounded to two decimal places.
   */
  local_price?: number;
  /**
   * During the promotion period, the CB price is multiplied by the local adjustment rate. Once the promotion starts, the price remains unchanged. During the promotion, the local_promotion_price= current_price, which is denominated in the local currency and retained to two decimal places.
   */
  local_promotion_price?: number;
}
/**
 * GetItemBaseInfoImage sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoImage {
  /**
   * List of image url.
   */
  image_url_list?: string[];
  /**
   * List of image id.
   */
  image_id_list?: string[];
  /**
   * Image ratio
   */
  image_ratio?: string;
}
/**
 * GetItemBaseInfoDimension sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoDimension {
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height?: number;
}
/**
 * GetItemBaseInfoLogisticInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoLogisticInfo {
  /**
   * The identity of logistic channel.
   */
  logistic_id?: number;
  /**
   * The name of logistic.
   */
  logistic_name?: string;
  /**
   * Related to shopee.logistics.GetLogistics result.logistics.enabled only affect current item.
   */
  enabled?: boolean;
  /**
   * Only needed when logistics fee_type = CUSTOM_PRICE.
   */
  shipping_fee?: number;
  /**
   * If specify logistic fee_type is SIZE_SELECTION size_id is required.
   */
  size_id?: number;
  /**
   * when seller chooses this option, the shipping fee of this channel on item will be set to 0. Default value is False.
   */
  is_free?: boolean;
  /**
   * Estimated shipping fee calculated by weight. Don't exist if channel is no-integrated.
   */
  estimated_shipping_fee?: number;
}
/**
 * GetItemBaseInfoPreOrder sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoPreOrder {
  /**
   * Pre-order will be set true.
   */
  is_pre_order?: boolean;
  /**
   * The days to ship. Only work for pre-orde.
   */
  days_to_ship?: number;
}
/**
 * GetItemBaseInfoWholesale sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoWholesale {
  /**
   * The min count of this tier wholesale.
   */
  min_count?: number;
  /**
   * The max count of this tier wholesale.
   */
  max_count?: number;
  /**
   * The current price of the wholesale in the listing currency.If item is in promotion, this price is useless.
   */
  unit_price?: number;
  /**
   * The After-tax Price of the wholesale show to buyer.
   */
  inflated_price_of_unit_price?: number;
}
/**
 * GetItemBaseInfoVideoInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoVideoInfo {
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
}
/**
 * GetItemBaseInfoBrand sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoBrand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
}
/**
 * GetItemBaseInfoPromotionImage sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoPromotionImage {
  /**
   * Promotion image
   */
  image_id_list?: string[];
  /**
   * Promiton image urls
   */
  image_url_list?: string[];
  /**
   * Promotion image ratio
   */
  image_ratio?: string;
}
/**
 * GetItemBaseInfoVehicleInfo sub-interface for GetItemBaseInfoCompatibilityInfo
 */
export interface GetItemBaseInfoVehicleInfo {
  /**
   * ID of the brand.
   */
  brand_id?: number;
  /**
   * ID of the model.
   */
  model_id?: number;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * ID of the version.
   */
  version_id?: number;
}
/**
 * GetItemBaseInfoCompatibilityInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoCompatibilityInfo {
  vehicle_info_list?: GetItemBaseInfoVehicleInfo[];
}
/**
 * GetItemBaseInfoTag sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoTag {
  /**
   * Indicate if the item is kit item.
   */
  kit?: boolean;
}
/**
 * GetItemBaseInfoMaxPurchaseLimit sub-interface for GetItemBaseInfoPurchaseLimitInfo
 */
export interface GetItemBaseInfoMaxPurchaseLimit {
  /**
   * maximum purchase limit for each order
   */
  purchase_limit?: number;
}
/**
 * GetItemBaseInfoPurchaseLimitInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoPurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: GetItemBaseInfoMaxPurchaseLimit;
}
/**
 * GetItemBaseInfoCertificationProof sub-interface for GetItemBaseInfoCertification
 */
export interface GetItemBaseInfoCertificationProof {
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id?: string;
  /**
   * image weight/ image height.
   */
  ratio?: number;
  /**
   * The name of the uploaded certification proof file.
   */
  file_name?: string;
  /**
   * The image url of the proof
   */
  image_url?: string;
}
/**
 * GetItemBaseInfoCertification sub-interface for GetItemBaseInfoCertificationInfo
 */
export interface GetItemBaseInfoCertification {
  /**
   * Permit ID, get from v2.product.get_product_certification_rule
   */
  permit_id?: number;
  /**
   * Certification No.
   */
  certification_no?: string;
  /**
   * expiry timestamp
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.
   */
  certification_proofs?: GetItemBaseInfoCertificationProof[];
}
/**
 * GetItemBaseInfoCertificationInfo sub-interface for GetItemBaseInfoItem
 */
export interface GetItemBaseInfoCertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: GetItemBaseInfoCertification[];
}
/**
 * GetItemBaseInfoItem sub-interface for GetItemBaseInfoResponseData
 */
export interface GetItemBaseInfoItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number;
  /**
   * Name of the item in local language.
   */
  item_name?: string;
  /**
   * if description_type is normal , Description information will be returned through this field，else description will be empty
   */
  description?: string;
  /**
   * An item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  item_sku?: string;
  /**
   * Timestamp that indicates the date and time that the item was created.
   */
  create_time?: Date | number;
  /**
   * Timestamp that indicates the last time that there was a change in value of the item, such as price/stock change.
   */
  update_time?: Date | number;
  attribute_list?: GetItemBaseInfoAttribute[];
  /**
   * If the item has models, price_info will not be returned. Please get the price of each model through the get_model_list api
   */
  price_info?: GetItemBaseInfoPriceInfo[];
  image?: GetItemBaseInfoImage;
  /**
   * The weight of this item, the unit is KG.If set the weight of models under this item, will return the max weight of all models during the switching period to ensure system compatibility, please switch to call v2.product.get_model_list to get the weight of models.
   */
  weight?: string;
  /**
   * The dimension of this item.If set the dimension of models under this item, will return the dimension with largest volume calculated by height*length*width during the switching period to ensure system compatibility, please switch to call v2.product.get_model_list to get the dimension of models.
   */
  dimension?: GetItemBaseInfoDimension;
  /**
   * The logistics list.
   */
  logistic_info?: GetItemBaseInfoLogisticInfo[];
  pre_order?: GetItemBaseInfoPreOrder;
  /**
   * The wholesales tier list.
   */
  wholesales?: GetItemBaseInfoWholesale[];
  /**
   * Is it second-hand.
   */
  condition?: string;
  /**
   * Url of size chart image.
   */
  size_chart?: string;
  /**
   * Enumerated type that defines the current status of the item. Applicable values: NORMAL, BANNED, UNLIST, SELLER_DELETE, SHOPEE_DELETE, REVIEWING.
   */
  item_status?: string;
  /**
   * If deboost is true, means that the item's search ranking is lowered.
   */
  deboost?: boolean;
  /**
   * Does it contain model.
   */
  has_model?: boolean;
  /**
   * Indicates whether the item is currently under any ongoing promotion.
   */
  has_promotion?: boolean;
  /**
   * Info of video list.
   */
  video_info?: GetItemBaseInfoVideoInfo[];
  brand?: GetItemBaseInfoBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * gtin code for br region, will return this code only item has default modelNote: gtin_code = "00" means that this item is “Item without GTIN”
   */
  gtin_code?: string;
  /**
   * id of new size chart.
   */
  size_chart_id?: number;
  promotion_image?: GetItemBaseInfoPromotionImage;
  compatibility_info?: GetItemBaseInfoCompatibilityInfo;
  /**
   * Scheduled publish time of this item.
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  /**
   * Shopee's unique identifier for Shopee Standard Product.
   */
  ssp_id?: number;
  /**
   * return true if the item only has a default model and it is FBS model
   */
  is_fulfillment_by_shopee?: boolean;
  tag?: GetItemBaseInfoTag;
  /**
   * purchase limit info
   */
  purchase_limit_info?: GetItemBaseInfoPurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine.
   */
  medicine_id?: number;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: GetItemBaseInfoCertificationInfo;
}
/**
 * GetItemBaseInfoComplaintPolicy sub-interface for GetItemBaseInfoResponseData
 */
export interface GetItemBaseInfoComplaintPolicy {
  /**
   * Time for a warranty claim.Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS.
   */
  warranty_time?: string;
  /**
   * If True means "I exclude warranty complaints for entrepreneur"
   */
  exclude_entrepreneur_warranty?: boolean;
  /**
   * The identity of complaint address.
   */
  complaint_address_id?: number;
  /**
   * Additional information for complaint policy
   */
  additional_information?: string;
}
/**
 * GetItemBaseInfoGroupItemInfo sub-interface for GetItemBaseInfoTaxInfo
 */
export interface GetItemBaseInfoGroupItemInfo {
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter 6.
   */
  group_qtd?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter UNI for the individual can.
   */
  group_unit?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unity), enter the value of the individual can.
   */
  group_unit_value?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Enter the price of the whole package.
   */
  original_group_price?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Please inform the GTIN SSCC code for the package.
   */
  group_gtin_sscc?: string;
  /**
   * Example: The item is box, that contain 6 packages. Each package contains 6 soda cans. Please inform the GRAI GTIN SSCC code for the Box.
   */
  group_grai_gtin_sscc?: string;
}
/**
 * GetItemBaseInfoTaxInfo sub-interface for GetItemBaseInfoResponseData
 */
export interface GetItemBaseInfoTaxInfo {
  /**
   * Mercosur Common Nomenclature, it is a convention between Mercosur member countries to easily recognize goods, services and productive factors negotiated among themselves.(BR region)Note: ncm = "00" means that this item doesn't have a NCM.
   */
  ncm?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in different states. It identifies a specific operation by category at the time of issuing the invoice. (BR region)
   */
  diff_state_cfop?: string;
  /**
   * Code of Operation Status – Simples Nacional, code for company operations to identify the origin of the goods and the taxation regime of the operations. (BR region)
   */
  csosn?: string;
  /**
   * Product source, domestic or foreig (BR region)
   */
  origin?: string;
  /**
   * Tax Replacement Specifying Code (CEST), to separate within the same NCM products that do or do not have ICMS tax substitution. (BR region)Note: cest = "00" means that this item doesn't have a CEST.
   */
  cest?: string;
  /**
   * (BR region)
   */
  measure_unit?: string;
  /**
   * Value shuold be one of NO_INVOICES VAT_MARGIN_SCHEME_INVOICES VAT_INVOICES NON_VAT_INVOICES and if value is NON_VAT_INVOICE vat_rate should be null (PL region)
   */
  invoice_option?: string;
  /**
   * Value should be one of 0% 5% 8% 23% NO_VAT_RATE (PL region)
   */
  vat_rate?: string;
  /**
   * HS Code (Only for IN region)
   */
  hs_code?: string;
  /**
   * Tax Code (Only for IN region)
   */
  tax_code?: string;
  /**
   * tax_type only for TW whitelist shop. Shopee will referred Tax type when substitute sellers for issuing e-receipts to buyers. All variations share the same tax type. The meaning of value: 0: no tax type1: tax-able2: tax-free
   */
  tax_type?: number;
  /**
   * Only for BR shop.PIS - Programa de Integração Social (Social Integration Program). It is a government tax to collect resources for the payment of unemployment insurance and other employee related rights.PIS % - the tax applied to this product
   */
  pis?: string;
  /**
   * Only for BR shop.COFINS – Contribuição para Financiamento da Seguridade Social (Contribution for Social Security Funding). It is a government tax to collect resources for public health system and social security.COFINS % - the tax applied to this product
   */
  cofins?: string;
  /**
   * Only for BR shop.ICMS - Imposto sobre Circulação de Mercadorias e Serviços (Circulation of Goods and Services Tax). CST - Código da Situação Tributária (Tax Situation Code) is represented by a combination of 3 numbers with the purpose of demonstrating the origin of a product and determining the form of taxation that will apply to it. Therefore, each digit in the CST Table has a specific meaning: the first digit indicates the origin of the operation, the second digit represents the ICMS taxation on the operation and the third digit provides additional information about the form of taxation.
   */
  icms_cst?: string;
  /**
   * Only for BR shop.The CST PIS/Cofins is a code on the Electronic Invoice (NF-e) that identifies the tax situation of PIS (Programa de Integração Social) and Cofins (Contribuição para o Financiamento da Seguridade Social) in sales of goods.
   */
  pis_cofins_cst?: PisCofinsCst | string | number;
  /**
   * Only for BR shop.Enter the total percentage of the combination of federal, state, and municipal taxes, using up to two decimals.
   */
  federal_state_taxes?: string;
  /**
   * Only for BR shop.1: Retailer2: Manufacturer
   */
  operation_type?: string;
  /**
   * Only for BR shop.The EXTIPI field in the NF-e (Nota Fiscal Eletrônica) is used to indicate if there's an exception to the IPI (Imposto sobre Produtos Industrializados) tax rate for a specific product.
   */
  ex_tipi?: string;
  /**
   * Only for BR shop.The FCI Control Number is a unique identifier assigned to each import FCI (Import Content Form). It's mandatory on the corresponding NF-e (electronic invoice) to ensure compliance with Brazilian import tax regulations.
   */
  fci_num?: string;
  /**
   * Only for BR shop.RECOPI NACIONAL is a Brazilian government system that facilitates the registration and management of tax-exempt operations involving paper destined for printing books, newspapers, and periodicals (known as "papel imune" in Portuguese).
   */
  recopi_num?: string;
  /**
   * Only for BR shop.Include relevant information to display on Invoice.
   */
  additional_info?: string;
  /**
   * Only for BR shop.Required if the item is a group item.
   */
  group_item_info?: GetItemBaseInfoGroupItemInfo;
  /**
   * 7101 - for sales of self-produced goods7102 - resale of third-party goodsa tax code used in Brazil to classify and identify the nature of goods or services transactions for tax purposes. This is used for goods export to other counties
   */
  export_cfop?: string;
}
/**
 * GetItemBaseInfoImageInfo sub-interface for GetItemBaseInfoField
 */
export interface GetItemBaseInfoImageInfo {
  /**
   * Image id
   */
  image_id?: string;
  /**
   * Image url.
   */
  image_url?: string;
}
/**
 * GetItemBaseInfoField sub-interface for GetItemBaseInfoExtendedDescription
 */
export interface GetItemBaseInfoField {
  /**
   * Type of extended description field ：values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be returned through this field.
   */
  text?: string;
  /**
   * If field_type is image, image url will be returned through this field.
   */
  image_info?: GetItemBaseInfoImageInfo;
}
/**
 * GetItemBaseInfoExtendedDescription sub-interface for GetItemBaseInfoDescriptionInfo
 */
export interface GetItemBaseInfoExtendedDescription {
  /**
   * Field of extended description
   */
  field_list?: GetItemBaseInfoField[];
}
/**
 * GetItemBaseInfoDescriptionInfo sub-interface for GetItemBaseInfoResponseData
 */
export interface GetItemBaseInfoDescriptionInfo {
  /**
   * If description_type is extended , Description information will be returned through this field.
   */
  extended_description?: GetItemBaseInfoExtendedDescription;
}
/**
 * GetItemBaseInfoSummaryInfo sub-interface for GetItemBaseInfoStockInfoV2
 */
export interface GetItemBaseInfoSummaryInfo {
  /**
   * Stock reserved for promotion.Note: For SIP P Item, will return the total reserved stock for P Item and all A Items under the P Item;
   */
  total_reserved_stock?: number;
  /**
   * total available stock
   */
  total_available_stock?: number;
}
/**
 * GetItemBaseInfoSellerStock sub-interface for GetItemBaseInfoStockInfoV2
 */
export interface GetItemBaseInfoSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock in the current warehouse
   */
  stock?: number;
  /**
   * To return if the stock of the location id is saleable
   */
  if_saleable?: boolean;
}
/**
 * GetItemBaseInfoShopeeStock sub-interface for GetItemBaseInfoStockInfoV2
 */
export interface GetItemBaseInfoShopeeStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock in the current warehouse
   */
  stock?: number;
}
/**
 * GetItemBaseInfoAdvanceStock sub-interface for GetItemBaseInfoStockInfoV2
 */
export interface GetItemBaseInfoAdvanceStock {
  /**
   * Refers to Advance Fulfillment stock that Seller has shipped out and is available to be used to fulfill an order.
   */
  sellable_advance_stock?: number;
  /**
   * Refers to Advance Fulfillment stock that seller has shipped out and is still in transit and unavailable to be used to fulfill an order.
   */
  in_transit_advance_stock?: number;
}
/**
 * GetItemBaseInfoStockInfoV2 sub-interface for GetItemBaseInfoResponseData
 */
export interface GetItemBaseInfoStockInfoV2 {
  /**
   * stock summary info
   */
  summary_info?: GetItemBaseInfoSummaryInfo;
  /**
   * seller stock
   */
  seller_stock?: GetItemBaseInfoSellerStock[];
  /**
   * shopee stock
   */
  shopee_stock?: GetItemBaseInfoShopeeStock[];
  /**
   * Only for PH/VN/ID/MY local selected shops.
   */
  advance_stock?: GetItemBaseInfoAdvanceStock;
}
/**
 * GetItemBaseInfoResponseData sub-interface for GetItemBaseInfoResponse
 */
export interface GetItemBaseInfoResponseData {
  item_list?: GetItemBaseInfoItem[];
  /**
   * Complaint policy.Only returned for local PL sellers, and need_complaint_policy in request is true.
   */
  complaint_policy?: GetItemBaseInfoComplaintPolicy;
  /**
   * Tax information
   */
  tax_info?: GetItemBaseInfoTaxInfo;
  /**
   * New description  field. Only whitelist sellers can use it.
   */
  description_info?: GetItemBaseInfoDescriptionInfo;
  /**
   * Type of description : values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * new stock object
   */
  stock_info_v2?: GetItemBaseInfoStockInfoV2;
}
/**
 * Response payload for get_item_base_info
 *
 * Use this api to get basic info of item by item_id list.
 */
export type GetItemBaseInfoResponse = FetchResponse<GetItemBaseInfoResponseData>;
/**
 * Request parameters for get_item_content_diagnosis_result
 *
 * Get the content quality details (including content quality level, content issues, and system suggestions) for specific product list.
 */
export interface GetItemContentDiagnosisResultRequest {
  /**
   * item_id list; limit [1,48]
   */
  item_id_list: number[];
}
/**
 * GetItemContentDiagnosisResultUnfinishedTask sub-interface for GetItemContentDiagnosisResultSuccessItem
 */
export interface GetItemContentDiagnosisResultUnfinishedTask {
  /**
   * Item's content issue. Applicable values:1: TOO_FEW_IMAGES  2: WRONG_CATEGORY  3: TOO_FEW_ATTRIBUTES_FOR_QUALIFIED4: LACK_OF_SIZE_CHART  5: LACK_OF_STANDARD_VARIATION 6: LACK_BRAND  7: TOO_SHORT_DESCRIPTION  8: TOO_SHORT_OR_TOO_LONG_NAME9: WRONG_WEIGHT  10: LACK_OF_VIDEO11: TOO_FEW_ATTRIBUTES_FOR_EXCELLENT
   */
  issue_type?: number;
  /**
   * System suggestion for item's content issue. Applicable values:Add at least 3 imagesAdopt suggested categoryAdd at least 1 attributesAdd size chartAdopt the color or size variationAdd brand infoAdd at least 100 characters or 1 image for descAdd characters for name to 25~100Adopt suggested weightAdd videoAdd at least 3 attributes
   */
  suggestion?: string;
}
/**
 * GetItemContentDiagnosisResultSuccessItem sub-interface for GetItemContentDiagnosisResultResponseData
 */
export interface GetItemContentDiagnosisResultSuccessItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's latest content quality level. Applicable values:0: NONE (No quality level for item in SELLER_DELETE / SHOPEE_DELETE / BANNED status)1: TO_BE_IMPROVED2: QUALIFIED3: EXCELLENT
   */
  quality_level?: number;
  unfinished_task?: GetItemContentDiagnosisResultUnfinishedTask[];
}
/**
 * GetItemContentDiagnosisResultFailureItem sub-interface for GetItemContentDiagnosisResultResponseData
 */
export interface GetItemContentDiagnosisResultFailureItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's failure reason.
   */
  failed_reason?: string;
}
/**
 * GetItemContentDiagnosisResultResponseData sub-interface for GetItemContentDiagnosisResultResponse
 */
export interface GetItemContentDiagnosisResultResponseData {
  success_item_list?: GetItemContentDiagnosisResultSuccessItem[];
  failure_item_list?: GetItemContentDiagnosisResultFailureItem[];
}
/**
 * Response payload for get_item_content_diagnosis_result
 *
 * Get the content quality details (including content quality level, content issues, and system suggestions) for specific product list.
 */
export type GetItemContentDiagnosisResultResponse =
  FetchResponse<GetItemContentDiagnosisResultResponseData>;
/**
 * Request parameters for get_item_extra_info
 *
 * Use this api to get extra info of item by item_id list.
 */
export interface GetItemExtraInfoRequest {
  /**
   * item_id list, limit [0,50]
   */
  item_id_list: number[];
}
/**
 * GetItemExtraInfoItem sub-interface for GetItemExtraInfoResponseData
 */
export interface GetItemExtraInfoItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * The sales volume of item.
   */
  sale?: number;
  /**
   * The page view of item.
   */
  views?: number;
  /**
   * The collection number of item.
   */
  likes?: number;
  /**
   * The rating star scores of this item.
   */
  rating_star?: number;
  /**
   * Count of comments for the item.
   */
  comment_count?: number;
}
/**
 * GetItemExtraInfoResponseData sub-interface for GetItemExtraInfoResponse
 */
export interface GetItemExtraInfoResponseData {
  /**
   * extra info of item list.
   */
  item_list?: GetItemExtraInfoItem[];
}
/**
 * Response payload for get_item_extra_info
 *
 * Use this api to get extra info of item by item_id list.
 */
export type GetItemExtraInfoResponse = FetchResponse<GetItemExtraInfoResponseData>;
/**
 * Request parameters for get_item_limit
 *
 * Get item upload control.
 */
export interface GetItemLimitRequest {
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number;
}
/**
 * GetItemLimitPriceLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitPriceLimit {
  /**
   * Item price max limit.
   */
  min_limit?: number;
  /**
   * Item price min limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitWholesalePriceThresholdPercentage sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitWholesalePriceThresholdPercentage {
  /**
   * Item wholesale price percentage of original price min limit.
   */
  min_limit?: number;
  /**
   * Item wholesale price percentage of original price min limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitStockLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitStockLimit {
  /**
   * Item stock min limit.
   */
  min_limit?: number;
  /**
   * Item stock max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitItemNameLengthLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitItemNameLengthLimit {
  /**
   * Item name length min limit.
   */
  min_limit?: number;
  /**
   * Item name length max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitItemImageCountLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitItemImageCountLimit {
  /**
   * Item image count min limit.
   */
  min_limit?: number;
  /**
   * Item image count max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitItemDescriptionLengthLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitItemDescriptionLengthLimit {
  /**
   * Item description length min limit.
   */
  min_limit?: number;
  /**
   * Item description length max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitTierVariationNameLengthLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitTierVariationNameLengthLimit {
  /**
   * Item tier variation name length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation name length max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitTierVariationOptionLengthLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitTierVariationOptionLengthLimit {
  /**
   * Item tier variation option length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation option length max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitItemCountLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitItemCountLimit {
  /**
   * Item count max limit.
   */
  max_limit?: number;
}
/**
 * GetItemLimitExtendedDescriptionLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitExtendedDescriptionLimit {
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
   * length min limit for item extended description image aspect  (image width / image hight )
   */
  description_image_aspect_ratio_min?: number;
  /**
   * length max limit for item extended description image aspect (image width / image hight )
   */
  description_image_aspect_ratio_max?: number;
}
/**
 * GetItemLimitDaysToShipLimit sub-interface for GetItemLimitDtsLimit
 */
export interface GetItemLimitDaysToShipLimit {
  min_limit?: number;
  max_limit?: number;
}
/**
 * GetItemLimitDtsLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitDtsLimit {
  /**
   * Pre order limits for the category
   */
  days_to_ship_limit?: GetItemLimitDaysToShipLimit;
  non_pre_order_days_to_ship?: number;
}
/**
 * GetItemLimitWeightLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitWeightLimit {
  /**
   * weight is mandatory or not
   */
  weight_mandatory?: boolean;
}
/**
 * GetItemLimitDimensionLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitDimensionLimit {
  /**
   * dimension is mandatory or not for the category
   */
  dimension_mandatory?: boolean;
}
/**
 * GetItemLimitSizeChartLimit sub-interface for GetItemLimitResponseData
 */
export interface GetItemLimitSizeChartLimit {
  size_chart_mandatory?: boolean;
  support_image_size_chart?: boolean;
  support_template_size_chart?: boolean;
}
/**
 * GetItemLimitResponseData sub-interface for GetItemLimitResponse
 */
export interface GetItemLimitResponseData {
  price_limit?: GetItemLimitPriceLimit;
  wholesale_price_threshold_percentage?: GetItemLimitWholesalePriceThresholdPercentage;
  stock_limit?: GetItemLimitStockLimit;
  item_name_length_limit?: GetItemLimitItemNameLengthLimit;
  item_image_count_limit?: GetItemLimitItemImageCountLimit;
  item_description_length_limit?: GetItemLimitItemDescriptionLengthLimit;
  tier_variation_name_length_limit?: GetItemLimitTierVariationNameLengthLimit;
  tier_variation_option_length_limit?: GetItemLimitTierVariationOptionLengthLimit;
  item_count_limit?: GetItemLimitItemCountLimit;
  extended_description_limit?: GetItemLimitExtendedDescriptionLimit;
  dts_limit?: GetItemLimitDtsLimit;
  weight_limit?: GetItemLimitWeightLimit;
  dimension_limit?: GetItemLimitDimensionLimit;
  size_chart_limit?: GetItemLimitSizeChartLimit;
}
/**
 * GetItemLimitGtinLimit sub-interface for GetItemLimitResponse
 */
export interface GetItemLimitGtinLimit {
  /**
   * Indicate gtin_code validation logic in v2.product.add_itemv2.product.update_itemv2.product.init_tier_variationv2.product.add_modelv2.product.update_model- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" todeclare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omittedentirely.
   */
  gtin_validation_rule?: GtinValidationRule | string | number;
}
/**
 * Response payload for get_item_limit
 *
 * Get item upload control.
 */
export type GetItemLimitResponse = FetchResponse<GetItemLimitResponseData>;
/**
 * Request parameters for get_item_list
 *
 * Use this call to get a list of items.
 */
export interface GetItemListRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0. if data is more than one page, the offset can be some entry to start next call.
   */
  offset: number;
  /**
   * the size of one page.Max=100
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
  /**
   * NORMAL/BANNED/UNLIST/REVIEWING/SELLER_DELETE/SHOPEE_DELETEIf you want to search multiple status, please upload the url like this: item_status=NORMAL&item_status=BANNED
   */
  item_status: ItemStatus | string | number;
}
/**
 * GetItemListTag sub-interface for GetItemListItem
 */
export interface GetItemListTag {
  /**
   * Indicate if the item is kit item.
   */
  kit?: boolean;
}
/**
 * GetItemListItem sub-interface for GetItemListResponseData
 */
export interface GetItemListItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Enumerated type that defines the current status of the item. Applicable values: NORMAL, BANNED, UNLIST, REVIEWING, SELLER_DELETE, SHOPEE_DELETE.
   */
  item_status?: string;
  /**
   * The update time of item.
   */
  update_time?: Date | number;
  tag?: GetItemListTag;
}
/**
 * GetItemListResponseData sub-interface for GetItemListResponse
 */
export interface GetItemListResponseData {
  /**
   * list of item info with item_id/ item_status/ update_time
   */
  item?: GetItemListItem[];
  /**
   * total count of all items
   */
  total_count?: number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * if has_next_page is true, this value need set to next request.offset
   */
  next_offset?: number;
}
/**
 * Response payload for get_item_list
 *
 * Use this call to get a list of items.
 */
export type GetItemListResponse = FetchResponse<GetItemListResponseData>;
/**
 * Request parameters for get_item_list_by_content_diagnosis
 *
 * Query the list of products and their content quality details by content quality level or content issues.
 */
export interface GetItemListByContentDiagnosisRequest {
  /**
   * the size of one page. Max=48
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is empty. if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: string;
  /**
   * Item's latest content quality level. Applicable values:1: TO_BE_IMPROVED2: QUALIFIED3: EXCELLENT
   */
  quality_level?: number[];
  /**
   * Item's content issue. Applicable values: 1: TOO_FEW_IMAGES2: WRONG_CATEGORY3: TOO_FEW_ATTRIBUTES_FOR_QUALIFIED4: LACK_OF_SIZE_CHART5: LACK_OF_STANDARD_VARIATION6: LACK_BRAND7: TOO_SHORT_DESCRIPTION8: TOO_SHORT_OR_TOO_LONG_NAME9: WRONG_WEIGHT10: LACK_OF_VIDEO11: TOO_FEW_ATTRIBUTES_FOR_EXCELLENTIf you need to pass both quality_level and issue_type, the logic are as follows:- When quality_level is 1, issue_type can only be 1, 2, 3, 4, 5- When quality_level is 2, issue_type can only be 6, 7, 8, 9, 10, 11- When quality_level is 3, issue_type can only be empty
   */
  issue_type?: number[];
}
/**
 * GetItemListByContentDiagnosisUnfinishedTask sub-interface for GetItemListByContentDiagnosisItem
 */
export interface GetItemListByContentDiagnosisUnfinishedTask {
  /**
   * Item's content issue. Applicable values:1: TOO_FEW_IMAGES2: WRONG_CATEGORY3: TOO_FEW_ATTRIBUTES_FOR_QUALIFIED4: LACK_OF_SIZE_CHART5: LACK_OF_STANDARD_VARIATION6: LACK_BRAND7: TOO_SHORT_DESCRIPTION8: TOO_SHORT_OR_TOO_LONG_NAME9: WRONG_WEIGHT10: LACK_OF_VIDEO11: TOO_FEW_ATTRIBUTES_FOR_EXCELLENT
   */
  issue_type?: number;
  /**
   * System suggestion for item's content issue. Applicable values:Add at least 3 imagesAdopt suggested categoryAdd at least 1 attributesAdd size chartAdopt the color or size variationAdd brand infoAdd at least 100 characters or 1 image for descAdd characters for name to 25~100Adopt suggested weightAdd videoAdd at least 3 attributes
   */
  suggestion?: string;
}
/**
 * GetItemListByContentDiagnosisItem sub-interface for GetItemListByContentDiagnosisResponseData
 */
export interface GetItemListByContentDiagnosisItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's latest content quality level. Applicable values:0: NONE (No quality level for item in SELLER_DELETE / SHOPEE_DELETE / BANNED status)1: TO_BE_IMPROVED2: QUALIFIED3: EXCELLENT
   */
  quality_level?: number;
  unfinished_task?: GetItemListByContentDiagnosisUnfinishedTask[];
}
/**
 * GetItemListByContentDiagnosisResponseData sub-interface for GetItemListByContentDiagnosisResponse
 */
export interface GetItemListByContentDiagnosisResponseData {
  item_list?: GetItemListByContentDiagnosisItem[];
  /**
   * Total num of items match condition.
   */
  total_count?: number;
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * If has_next_page is true, this value need set to next request.offset
   */
  next_offset?: string;
}
/**
 * Response payload for get_item_list_by_content_diagnosis
 *
 * Query the list of products and their content quality details by content quality level or content issues.
 */
export type GetItemListByContentDiagnosisResponse =
  FetchResponse<GetItemListByContentDiagnosisResponseData>;
/**
 * Request parameters for get_item_promotion
 *
 * Get item promotion info.
 */
export interface GetItemPromotionRequest {
  /**
   * Item ID list, can send 1 to 50 items.
   */
  item_id_list: number[];
}
/**
 * GetItemPromotionPromotionPriceInfo sub-interface for GetItemPromotionPromotion
 */
export interface GetItemPromotionPromotionPriceInfo {
  /**
   * Promotion price.
   */
  promotion_price?: number;
}
/**
 * GetItemPromotionPromotionStockInfoV2 sub-interface for GetItemPromotionPromotion
 */
export interface GetItemPromotionPromotionStockInfoV2 {
  /**
   * stock summary info
   */
  summary_info?: any;
  /**
   * Total Stock reserved for promotion
   */
  total_reserved_stock?: number;
}
/**
 * GetItemPromotionPromotion sub-interface for GetItemPromotionSuccess
 */
export interface GetItemPromotionPromotion {
  /**
   * Promotion type, Applicable values: See Data Definition- PromotionType.
   */
  promotion_type?: string;
  /**
   * The identity of item promotion.
   */
  promotion_id?: any;
  /**
   * The identity of product model.
   */
  model_id?: number;
  /**
   * Promotion start tiem.
   */
  start_time?: Date | number;
  /**
   * Promotion end item.
   */
  end_time?: Date | number;
  /**
   * Promotion price info.
   */
  promotion_price_info?: GetItemPromotionPromotionPriceInfo[];
  /**
   * Could be ongoing/upcoming
   */
  promotion_staging?: PromotionStaging | string | number;
  /**
   * new promotion stock
   */
  promotion_stock_info_v2?: GetItemPromotionPromotionStockInfoV2;
}
/**
 * GetItemPromotionSuccess sub-interface for GetItemPromotionResponseData
 */
export interface GetItemPromotionSuccess {
  /**
   * The identity of product item.
   */
  item_id?: number;
  /**
   * Item promotion info list
   */
  promotion?: GetItemPromotionPromotion[];
}
/**
 * GetItemPromotionFailure sub-interface for GetItemPromotionResponseData
 */
export interface GetItemPromotionFailure {
  /**
   * The identity of item.
   */
  item_id?: number;
  /**
   * Fail reason.
   */
  failed_reason?: string;
}
/**
 * GetItemPromotionResponseData sub-interface for GetItemPromotionResponse
 */
export interface GetItemPromotionResponseData {
  /**
   * Success item promotion info.
   */
  success_list?: GetItemPromotionSuccess[];
  /**
   * Fail item promotion info.
   */
  failure_list?: GetItemPromotionFailure[];
}
/**
 * Response payload for get_item_promotion
 *
 * Get item promotion info.
 */
export type GetItemPromotionResponse = FetchResponse<GetItemPromotionResponseData>;
/**
 * Request parameters for get_item_violation_info
 *
 * get item violation info
 */
export interface GetItemViolationInfoRequest {
  /**
   * item_id list; limit [0,50]
   */
  item_id_list: number[];
}
/**
 * GetItemViolationInfoItemStatusDetail sub-interface for GetItemViolationInfoItem
 */
export interface GetItemViolationInfoItemStatusDetail {
  /**
   * Violation types defined by Shopee. Applicable values: Prohibited ListingCounterfeit and IP InfringementSpamInappropriate ImageInsufficient InformationMall Listing ImprovementOther Listing Improvement
   */
  violation_type?: string;
  /**
   * The reason for violation.
   */
  violation_reason?: string;
  /**
   * Shopee provides you with suggestions for modifying items.
   */
  suggestion?: string;
  /**
   * Action required deadline. Empty if no deadline.
   */
  fix_deadline_time?: Date | number;
  /**
   * Latest update time.
   */
  update_time?: Date | number;
}
/**
 * GetItemViolationInfoSuggestedCategory sub-interface for GetItemViolationInfoDeboostDetail
 */
export interface GetItemViolationInfoSuggestedCategory {
  /**
   * ID for Shopee suggested category.
   */
  category_id?: number;
  /**
   * Default name for Shopee suggested category.
   */
  category_name?: string;
}
/**
 * GetItemViolationInfoDeboostDetail sub-interface for GetItemViolationInfoItem
 */
export interface GetItemViolationInfoDeboostDetail {
  /**
   * Violation types defined by Shopee. Applicable values: Prohibited ListingCounterfeit and IP InfringementSpamInappropriate ImageInsufficient InformationMall Listing ImprovementOther Listing Improvement
   */
  violation_type?: string;
  /**
   * The reason for violation.
   */
  violation_reason?: string;
  /**
   * Shopee provides you with suggestions for modifying items.
   */
  suggestion?: string;
  suggested_category?: GetItemViolationInfoSuggestedCategory[];
  /**
   * Action required deadline. Empty if no deadline.
   */
  fix_deadline_time?: Date | number;
  /**
   * Latest update time.
   */
  update_time?: Date | number;
}
/**
 * GetItemViolationInfoItem sub-interface for GetItemViolationInfoResponseData
 */
export interface GetItemViolationInfoItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Enumerated type that defines the current status of the item. Applicable values: NORMAL, BANNED, UNLIST, SELLER_DELETE, SHOPEE_DELETE, REVIEWING.
   */
  item_status?: string;
  /**
   * If deboost is true, means that the item's search ranking is lowered.
   */
  deboost?: boolean;
  item_status_details?: GetItemViolationInfoItemStatusDetail[];
  deboost_details?: GetItemViolationInfoDeboostDetail[];
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
}
/**
 * GetItemViolationInfoResponseData sub-interface for GetItemViolationInfoResponse
 */
export interface GetItemViolationInfoResponseData {
  item_list?: GetItemViolationInfoItem[];
}
/**
 * Response payload for get_item_violation_info
 *
 * get item violation info
 */
export type GetItemViolationInfoResponse = FetchResponse<GetItemViolationInfoResponseData>;
/**
 * Request parameters for get_kit_item_info
 *
 * Get the kit basic information and kit components.
 */
export interface GetKitItemInfoRequest {
  /**
   * ID of kit item.
   */
  item_id: number;
}
/**
 * GetKitItemInfoImage sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoImage {
  /**
   * List of image id.
   */
  image_id_list?: string[];
  /**
   * List of image url.
   */
  image_url_list?: string[];
  /**
   * 1:1
   */
  image_ratio?: string;
}
/**
 * GetKitItemInfoLongImage sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoLongImage {
  /**
   * List of image id.
   */
  image_id_list?: string[];
  /**
   * List of image url.
   */
  image_url_list?: string[];
  /**
   * 3:4
   */
  image_ratio?: string;
}
/**
 * GetKitItemInfoImageInfo sub-interface for GetKitItemInfoField
 */
export interface GetKitItemInfoImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  /**
   * Image url.
   */
  image_url?: string;
}
/**
 * GetKitItemInfoField sub-interface for GetKitItemInfoExtendedDescription
 */
export interface GetKitItemInfoField {
  /**
   * Type of extended description field. See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be returned through this field.
   */
  text?: string;
  /**
   * If field_type is image, image will be returned through this field.
   */
  image_info?: GetKitItemInfoImageInfo;
}
/**
 * GetKitItemInfoExtendedDescription sub-interface for GetKitItemInfoDescriptionInfo
 */
export interface GetKitItemInfoExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: GetKitItemInfoField[];
}
/**
 * GetKitItemInfoDescriptionInfo sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoDescriptionInfo {
  /**
   * If description_type is extended , Description information will be returned through this field.
   */
  extended_description?: GetKitItemInfoExtendedDescription;
}
/**
 * GetKitItemInfoVideo sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoVideo {
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
}
/**
 * GetKitItemInfoAttributeValue sub-interface for GetKitItemInfoAttribute
 */
export interface GetKitItemInfoAttributeValue {
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
}
/**
 * GetKitItemInfoAttribute sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoAttribute {
  /**
   * The Identify of each attribute.
   */
  attribute_id?: number;
  /**
   * The name of each attribute.
   */
  original_attribute_name?: string;
  attribute_value_list?: GetKitItemInfoAttributeValue[];
}
/**
 * GetKitItemInfoDimension sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoDimension {
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height?: number;
}
/**
 * GetKitItemInfoBrandInfo sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoBrandInfo {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
}
/**
 * GetKitItemInfoComponent sub-interface for GetKitItemInfoModel
 */
export interface GetKitItemInfoComponent {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id?: number;
  /**
   * Name of the item that composes this kit model.
   */
  component_item_name?: string;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  /**
   * Name of the model that composes this kit model.
   */
  component_model_name?: string;
  /**
   * The amount of the item/model that composes this kit model.
   */
  quantity?: number;
  /**
   * Whether this item/model is the main component for this kit.
   */
  main_component?: boolean;
  component_item_or_model_image?: string;
  component_item_or_model_sku?: string;
}
/**
 * GetKitItemInfoModel sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoModel {
  /**
   * ID of this kit model.
   */
  model_id?: number;
  /**
   * Seller SKU of this kit model.
   */
  model_sku?: number;
  /**
   * Original price of this kit model.
   */
  original_price?: number;
  /**
   * Tier index of this kit model.
   */
  tier_index?: number[];
  component_list?: GetKitItemInfoComponent[];
}
/**
 * GetKitItemInfoPreOrderInfo sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoPreOrderInfo {
  is_pre_order?: boolean;
  days_to_ship?: number;
}
/**
 * GetKitItemInfo_GetKitItemInfoImage sub-interface for GetKitItemInfoOption
 */
export interface GetKitItemInfo_GetKitItemInfoImage {
  /**
   * Id of image.
   */
  image_id?: string;
  /**
   * Url of image.
   */
  image_url?: string;
}
/**
 * GetKitItemInfoOption sub-interface for GetKitItemInfoTierVariation
 */
export interface GetKitItemInfoOption {
  /**
   * Option name.
   */
  option?: string;
  image?: GetKitItemInfo_GetKitItemInfoImage[];
}
/**
 * GetKitItemInfoTierVariation sub-interface for GetKitItemInfoProductInfo
 */
export interface GetKitItemInfoTierVariation {
  /**
   * Variation name.
   */
  name?: string;
  /**
   * Option list.
   */
  option_list?: GetKitItemInfoOption[];
}
/**
 * GetKitItemInfoProductInfo sub-interface for GetKitItemInfoResponseData
 */
export interface GetKitItemInfoProductInfo {
  /**
   * ID of this kit item.
   */
  item_id?: number;
  /**
   * The name of this kit item.
   */
  item_name?: string;
  /**
   * The category of this kit item, sync from the category of the main component of this kit item.
   */
  category_id?: number[];
  /**
   * Enumerated type that defines the current status of the item. Applicable values: NORMAL, BANNED, UNLIST, SELLER_DELETE, SHOPEE_DELETE, REVIEWING.
   */
  item_status?: string;
  /**
   * An item SKU (stock keeping unit) is an identifier defined by a seller, sometimes called parent SKU. Item SKU can be assigned to an item in Shopee Listings.
   */
  item_sku?: string;
  /**
   * Item images with 1:1 ratio.
   */
  images?: GetKitItemInfoImage;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: GetKitItemInfoLongImage;
  /**
   * Rich text description field. Only whitelist sellers can use it.
   */
  description_info?: GetKitItemInfoDescriptionInfo;
  /**
   * If description_type is normal, description information will be returned through this field, else description will be empty.
   */
  description?: string;
  /**
   * Type of description : values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * Info of video list.
   */
  video_list?: GetKitItemInfoVideo[];
  /**
   * The attributes of this kit item, sync from the attributes of the main component of this kit item.
   */
  attributes?: GetKitItemInfoAttribute[];
  /**
   * The weight of this kit item, the unit is KG.
   */
  weight?: string;
  /**
   * The dimension of this kit item.
   */
  dimension?: GetKitItemInfoDimension;
  /**
   * The brand of this kit item, sync from the brand of the main component of this kit item.
   */
  brand_info?: GetKitItemInfoBrandInfo;
  /**
   * Model info list, model number at most 9.
   */
  model_list?: GetKitItemInfoModel[];
  pre_order_info?: GetKitItemInfoPreOrderInfo;
  /**
   * Variation config of item.
   */
  tier_variation_list?: GetKitItemInfoTierVariation[];
}
/**
 * GetKitItemInfoResponseData sub-interface for GetKitItemInfoResponse
 */
export interface GetKitItemInfoResponseData {
  product_info?: GetKitItemInfoProductInfo;
}
/**
 * Response payload for get_kit_item_info
 *
 * Get the kit basic information and kit components.
 */
export type GetKitItemInfoResponse = FetchResponse<GetKitItemInfoResponseData>;
/**
 * Request parameters for get_kit_item_limit
 *
 * Get the limit of Kit item.
 */
export interface GetKitItemLimitRequest {
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number;
}
/**
 * GetKitItemLimitPriceLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitPriceLimit {
  /**
   * Item price max limit.
   */
  min_limit?: number;
  /**
   * Item price min limit.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitItemNameLengthLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitItemNameLengthLimit {
  /**
   * Item name length min limit.
   */
  min_limit?: number;
  /**
   * Item name length max limit.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitItemImageCountLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitItemImageCountLimit {
  /**
   * Item image count min limit.
   */
  min_limit?: number;
  /**
   * Item image count max limit.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitDescriptionLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitDescriptionLimit {
  /**
   * Item description length min limit.
   */
  description_length_min?: number;
  /**
   * length max limit for item extended description text part.
   */
  description_length_max?: number;
  /**
   * length min limit for item extended description text part, when one of the minimum limits for image and text is reached, the item can be added or updated successfully.
   */
  description_text_length_min?: number;
  /**
   * length max limit for item extended description text part
   */
  description_text_length_max?: number;
  /**
   * length min limit for item extended description image num, when one of the minimum limits for image and text is reached, the item can be added or updated successfully.
   */
  description_image_num_min?: number;
  /**
   * length max limit for item extended description image num.
   */
  description_image_num_max?: number;
  /**
   * length min limit for item extended description image width.
   */
  description_image_width_min?: number;
  /**
   * length min limit for item extended description image hight.
   */
  description_image_height_min?: number;
  /**
   * length min limit for item extended description image aspect ( aspect_ratio= image width / image hight ).
   */
  description_image_aspect_ratio_min?: number;
  /**
   * length max limit for item extended description image aspect ( aspect_ratio= image width / image hight ).
   */
  description_image_aspect_ratio_max?: number;
}
/**
 * GetKitItemLimitTierVariationNameLengthLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitTierVariationNameLengthLimit {
  /**
   * Item tier variation name length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation name length max limit.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitTierVariationOptionLengthLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitTierVariationOptionLengthLimit {
  /**
   * Item tier variation option length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation option length max limit.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitWeightLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitWeightLimit {
  /**
   * Whether weight is mandatory or not for the category.
   */
  weight_mandatory?: boolean;
}
/**
 * GetKitItemLimitDimensionLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitDimensionLimit {
  /**
   * Whether dimension is mandatory or not for the category.
   */
  dimension_mandatory?: boolean;
}
/**
 * GetKitItemLimitDaysToShipLimit sub-interface for GetKitItemLimitDtsLimit
 */
export interface GetKitItemLimitDaysToShipLimit {
  /**
   * Min limit of days to ship for pre-order products.
   */
  min_limit?: number;
  /**
   * Max limit of days to ship for pre-order products.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitDtsLimit sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitDtsLimit {
  /**
   * Days to ship for non pre-order products.
   */
  non_pre_order_days_to_ship?: number;
  /**
   * Whether support pre_order for the category.
   */
  support_pre_order?: boolean;
  /**
   * Days to ship for pre-order products.
   */
  days_to_ship_limit?: GetKitItemLimitDaysToShipLimit;
}
/**
 * GetKitItemLimitComponentCountLimitOfSingleModel sub-interface for GetKitItemLimitResponseData
 */
export interface GetKitItemLimitComponentCountLimitOfSingleModel {
  /**
   * Item count min limit that each kit variations support.
   */
  min_limit?: number;
  /**
   * Item count max limit that each kit variations support.
   */
  max_limit?: number;
}
/**
 * GetKitItemLimitResponseData sub-interface for GetKitItemLimitResponse
 */
export interface GetKitItemLimitResponseData {
  price_limit?: GetKitItemLimitPriceLimit;
  item_name_length_limit?: GetKitItemLimitItemNameLengthLimit;
  item_image_count_limit?: GetKitItemLimitItemImageCountLimit;
  description_limit?: GetKitItemLimitDescriptionLimit;
  tier_variation_name_length_limit?: GetKitItemLimitTierVariationNameLengthLimit;
  tier_variation_option_length_limit?: GetKitItemLimitTierVariationOptionLengthLimit;
  weight_limit?: GetKitItemLimitWeightLimit;
  dimension_limit?: GetKitItemLimitDimensionLimit;
  dts_limit?: GetKitItemLimitDtsLimit;
  component_count_limit_of_single_model?: GetKitItemLimitComponentCountLimitOfSingleModel;
}
/**
 * Response payload for get_kit_item_limit
 *
 * Get the limit of Kit item.
 */
export type GetKitItemLimitResponse = FetchResponse<GetKitItemLimitResponseData>;
/**
 * Request parameters for get_main_item_list
 *
 * get main item by direct item.
 */
export interface GetMainItemListRequest {
  /**
   * Item id of direct shop.
   */
  direct_item_id: number[];
}
/**
 * GetMainItemListList sub-interface for GetMainItemListResponseData
 */
export interface GetMainItemListList {
  /**
   * Item id of direct shop.
   */
  direct_item_id?: number;
  /**
   * Id of main shop.
   */
  main_shop_id?: number;
  /**
   * Item id of main shop.
   */
  main_item_id?: number;
}
/**
 * GetMainItemListResponseData sub-interface for GetMainItemListResponse
 */
export interface GetMainItemListResponseData {
  list?: GetMainItemListList[];
}
/**
 * Response payload for get_main_item_list
 *
 * get main item by direct item.
 */
export type GetMainItemListResponse = FetchResponse<GetMainItemListResponseData>;
/**
 * Request parameters for get_mart_item_by_outlet_item_id
 *
 * Get the mapping information between a Mart item and its corresponding outlet item by outlet item ID.
 */
export interface GetMartItemByOutletItemIdRequest {
  /**
   * The item ID of the item in the outlet shop.
   */
  outlet_item_id: number;
}
/**
 * GetMartItemByOutletItemIdModelMapping sub-interface for GetMartItemByOutletItemIdItemMapping
 */
export interface GetMartItemByOutletItemIdModelMapping {
  /**
   * The model ID of the product in the Mart shop.
   */
  mart_model_id?: number;
  /**
   * The model ID of the corresponding product in the outlet shop.
   */
  outlet_model_id?: number;
}
/**
 * GetMartItemByOutletItemIdItemMapping sub-interface for GetMartItemByOutletItemIdResponseData
 */
export interface GetMartItemByOutletItemIdItemMapping {
  /**
   * The item ID of the item in the Mart shop.
   */
  mart_item_id?: number;
  /**
   * The item ID of the corresponding item in the outlet shop.
   */
  outlet_item_id?: number;
  /**
   * The mapping relationship between Mart models and outlet models under the mapped items.
   */
  model_mapping?: GetMartItemByOutletItemIdModelMapping[];
}
/**
 * GetMartItemByOutletItemIdResponseData sub-interface for GetMartItemByOutletItemIdResponse
 */
export interface GetMartItemByOutletItemIdResponseData {
  /**
   * A list of item mapping records between the Mart item and its corresponding outlet items.
   */
  item_mapping_list?: GetMartItemByOutletItemIdItemMapping[];
}
/**
 * Response payload for get_mart_item_by_outlet_item_id
 *
 * Get the mapping information between a Mart item and its corresponding outlet item by outlet item ID.
 */
export type GetMartItemByOutletItemIdResponse =
  FetchResponse<GetMartItemByOutletItemIdResponseData>;
/**
 * Request parameters for get_mart_item_mapping_by_id
 *
 * Get the mapping information between a Mart item and its corresponding outlet item by item ID.
 */
export interface GetMartItemMappingByIdRequest {
  /**
   * The item ID of the item in the Mart shop.
   */
  mart_item_id: number;
  /**
   * A list of outlet shop IDs used to filter the mapping results.
   */
  outlet_shop_id_list: number[];
}
/**
 * GetMartItemMappingByIdModelMapping sub-interface for GetMartItemMappingByIdItemMapping
 */
export interface GetMartItemMappingByIdModelMapping {
  /**
   * The model ID of the product in the Mart shop.
   */
  mart_model_id?: number;
  /**
   * The model ID of the corresponding product in the outlet shop.
   */
  outlet_model_id?: number;
}
/**
 * GetMartItemMappingByIdItemMapping sub-interface for GetMartItemMappingByIdResponseData
 */
export interface GetMartItemMappingByIdItemMapping {
  /**
   * The item ID of the item in the Mart shop.
   */
  mart_item_id?: number;
  /**
   * The item ID of the corresponding item in the outlet shop.
   */
  outlet_item_id?: number;
  /**
   * The mapping relationship between Mart models and outlet models under the mapped items.
   */
  model_mapping?: GetMartItemMappingByIdModelMapping[];
}
/**
 * GetMartItemMappingByIdResponseData sub-interface for GetMartItemMappingByIdResponse
 */
export interface GetMartItemMappingByIdResponseData {
  /**
   * A list of item mapping records between the Mart item and its corresponding outlet items.
   */
  item_mapping_list?: GetMartItemMappingByIdItemMapping[];
}
/**
 * Response payload for get_mart_item_mapping_by_id
 *
 * Get the mapping information between a Mart item and its corresponding outlet item by item ID.
 */
export type GetMartItemMappingByIdResponse = FetchResponse<GetMartItemMappingByIdResponseData>;
/**
 * Request parameters for get_model_list
 *
 * Get model list of an item.
 */
export interface GetModelListRequest {
  /**
   * The ID of the item
   */
  item_id: number;
}
/**
 * GetModelListImage sub-interface for GetModelListOption
 */
export interface GetModelListImage {
  /**
   * Id of image
   */
  image_id?: string;
  /**
   * Url of image.
   */
  image_url?: string;
}
/**
 * GetModelListOption sub-interface for GetModelListTierVariation
 */
export interface GetModelListOption {
  /**
   * Option name.
   */
  option: string;
  image?: GetModelListImage;
}
/**
 * GetModelListTierVariation sub-interface for GetModelListResponseData
 */
export interface GetModelListTierVariation {
  /**
   * Option list.
   */
  option_list: GetModelListOption[];
  /**
   * Variation name.
   */
  name: string;
}
/**
 * GetModelListPriceInfo sub-interface for GetModelListModel
 */
export interface GetModelListPriceInfo {
  /**
   * Currency for the item price.
   */
  currency?: string;
  /**
   * Current price of item.
   */
  current_price: number;
  /**
   * Original price of item.
   */
  original_price: number;
  /**
   * Original price of item after tax.
   */
  inflated_price_of_original_price: number;
  /**
   * Current price of item after tax.
   */
  inflated_price_of_current_price: number;
  /**
   * SIP item price. If item is from SIP primary shop, this field will be returned.
   */
  sip_item_price?: number;
  /**
   * SIP item price source, could be manual or auto.If item is from SIP primary shop, this field will be returned.
   */
  sip_item_price_source?: string;
  /**
   * The currency of sip_item_price.If item is from SIP primary shop, this field will be returned.
   */
  sip_item_price_currency?: string;
  /**
   * The original price multiplied by the local adjustment rate equals the local price. The local price is denominated in the local currency and is rounded to two decimal places.<path></path>
   */
  local_price?: number;
  /**
   * During the promotion period, the CB price is multiplied by the local adjustment rate. Once the promotion starts, the price remains unchanged. During the promotion, the local_promotion_price= current_price, which is denominated in the local currency and retained to two decimal places.<path></path>
   */
  local_promotion_price?: number;
}
/**
 * GetModelListPreOrder sub-interface for GetModelListModel
 */
export interface GetModelListPreOrder {
  /**
   * Pre-order.
   */
  is_pre_order?: boolean;
  /**
   * The days to ship.
   */
  days_to_ship?: number;
}
/**
 * GetModelListSummaryInfo sub-interface for GetModelListStockInfoV2
 */
export interface GetModelListSummaryInfo {
  /**
   * Stock reserved for promotion.Note: For SIP P Item, will return the total reserved stock for P Item and all A Items under the P Item.
   */
  total_reserved_stock?: number;
  /**
   * Stock can be sold currently
   */
  total_available_stock?: number;
}
/**
 * GetModelListSellerStock sub-interface for GetModelListStockInfoV2
 */
export interface GetModelListSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock in the current warehouse
   */
  stock?: number;
  /**
   * To return if the stock of the location id is saleable
   */
  if_saleable?: boolean;
}
/**
 * GetModelListShopeeStock sub-interface for GetModelListStockInfoV2
 */
export interface GetModelListShopeeStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: string;
}
/**
 * GetModelListAdvanceStock sub-interface for GetModelListStockInfoV2
 */
export interface GetModelListAdvanceStock {
  /**
   * Refers to Advance Fulfillment stock that Seller has shipped out and is available to be used to fulfill an order.
   */
  sellable_advance_stock?: number;
  /**
   * Refers to Advance Fulfillment stock that seller has shipped out and is still in transit and unavailable to be used to fulfill an order.
   */
  in_transit_advance_stock?: number;
}
/**
 * GetModelListStockInfoV2 sub-interface for GetModelListModel
 */
export interface GetModelListStockInfoV2 {
  /**
   * stock summary Info
   */
  summary_info?: GetModelListSummaryInfo;
  /**
   * Seller-managed stock
   */
  seller_stock?: GetModelListSellerStock[];
  /**
   * Shopee warehouse stock
   */
  shopee_stock?: GetModelListShopeeStock[];
  /**
   * Only for PH/VN/ID/MY local selected shops.
   */
  advance_stock?: GetModelListAdvanceStock;
}
/**
 * GetModelListDimension sub-interface for GetModelListModel
 */
export interface GetModelListDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width?: number;
}
/**
 * GetModelListModel sub-interface for GetModelListResponseData
 */
export interface GetModelListModel {
  /**
   * Price info.For SG/MY/BR/MX/PL/ES/AR seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer.
   */
  price_info: GetModelListPriceInfo[];
  /**
   * Model ID.
   */
  model_id: number;
  /**
   * Tier index of this model.
   */
  tier_index: number[];
  /**
   * Current promotion ID of this model.
   */
  promotion_id: any;
  /**
   * Indicates whether the model is currently under any ongoing promotion.
   */
  has_promotion?: boolean;
  /**
   * SKU of this model. the length should be under 100.
   */
  model_sku?: string;
  /**
   * The model status. Should be MODEL_NORMAL or MODEL_UNAVAILABLE. MODEL_NORMAL models can be sold on the buyer's side, and MODEL_UNAVAILABLE models cannot be sold on the buyer's side.
   */
  model_status?: string;
  /**
   * (Only whitelisted users can use)
   */
  pre_order?: GetModelListPreOrder;
  /**
   * new stock info.Please check this FAQ for more detail: https://open.shopee.com/faq?top=162&sub=166&page=1&faq=230
   */
  stock_info_v2?: GetModelListStockInfoV2;
  /**
   * (Only TW seller and BR local seller available) gtin code.
   */
  gtin_code?: string;
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.
   */
  weight?: string;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: GetModelListDimension;
  /**
   * whether model is fulfillment by shopee
   */
  is_fulfillment_by_shopee?: boolean;
}
/**
 * GetModelListVariationOption sub-interface for GetModelListStandardiseTierVariation
 */
export interface GetModelListVariationOption {
  /**
   * Standardise Option ID
   */
  variation_option_id?: number;
  /**
   * Standardise Option Name
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
}
/**
 * GetModelListStandardiseTierVariation sub-interface for GetModelListResponseData
 */
export interface GetModelListStandardiseTierVariation {
  /**
   * Standardise Variation ID
   */
  variation_id?: number;
  /**
   * Standardise Variation Name
   */
  variation_name?: string;
  /**
   * Standardise Variation Group ID
   */
  variation_group_id?: number;
  /**
   * Standardise Variation Option List
   */
  variation_option_list?: GetModelListVariationOption[];
}
/**
 * GetModelListResponseData sub-interface for GetModelListResponse
 */
export interface GetModelListResponseData {
  /**
   * Variation config of item.
   */
  tier_variation: GetModelListTierVariation[];
  /**
   * Model list.
   */
  model: GetModelListModel[];
  /**
   * Standardise Variation config of item.
   */
  standardise_tier_variation?: GetModelListStandardiseTierVariation[];
}
/**
 * Response payload for get_model_list
 *
 * Get model list of an item.
 */
export type GetModelListResponse = FetchResponse<GetModelListResponseData>;
/**
 * GetProductCertificationRuleAttributeValue sub-interface for GetProductCertificationRuleAttribute
 */
export interface GetProductCertificationRuleAttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id: number;
  /**
   * Value name. original_value_name from produc.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
}
/**
 * GetProductCertificationRuleAttribute sub-interface for GetProductCertificationRuleRequest
 */
export interface GetProductCertificationRuleAttribute {
  /**
   * ID of attribute.
   */
  attribute_id: number;
  attribute_value_list?: GetProductCertificationRuleAttributeValue[];
}
/**
 * Request parameters for get_product_certification_rule
 *
 * Get product certification rule
 */
export interface GetProductCertificationRuleRequest {
  /**
   * Item attributes.
   */
  attribute_list?: GetProductCertificationRuleAttribute[];
  /**
   * ID of category.
   */
  category_id?: number;
}
/**
 * GetProductCertificationRuleCertificationRule sub-interface for GetProductCertificationRuleResponseData
 */
export interface GetProductCertificationRuleCertificationRule {
  /**
   * type of certification; always=1
   */
  certification_type?: number;
  /**
   * if this type of certification is mandatory for product
   */
  is_mandatory?: boolean;
  permit_id?: number;
  /**
   * Permit Type Name
   */
  name?: string;
}
/**
 * GetProductCertificationRuleResponseData sub-interface for GetProductCertificationRuleResponse
 */
export interface GetProductCertificationRuleResponseData {
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  certification_rule_list?: GetProductCertificationRuleCertificationRule[];
}
/**
 * Response payload for get_product_certification_rule
 *
 * Get product certification rule
 */
export type GetProductCertificationRuleResponse =
  FetchResponse<GetProductCertificationRuleResponseData>;
/**
 * Request parameters for get_recommend_attribute
 *
 * Get recommend attributes.
 */
export interface GetRecommendAttributeRequest {
  /**
   * name of item
   */
  item_name: string;
  /**
   * Cover image id of item
   */
  cover_image_id?: number;
  /**
   * ID of category
   */
  category_id: number;
}
/**
 * GetRecommendAttributeAttributeValue sub-interface for GetRecommendAttributeAttribute
 */
export interface GetRecommendAttributeAttributeValue {
  /**
   * ID of attribute value.
   */
  value_id?: number;
}
/**
 * GetRecommendAttributeAttribute sub-interface for GetRecommendAttributeResponseData
 */
export interface GetRecommendAttributeAttribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  /**
   * Value list of this attribute.
   */
  attribute_value_list?: GetRecommendAttributeAttributeValue[];
}
/**
 * GetRecommendAttributeResponseData sub-interface for GetRecommendAttributeResponse
 */
export interface GetRecommendAttributeResponseData {
  /**
   * Attribute info list.
   */
  attribute_list?: GetRecommendAttributeAttribute[];
}
/**
 * Response payload for get_recommend_attribute
 *
 * Get recommend attributes.
 */
export type GetRecommendAttributeResponse = FetchResponse<GetRecommendAttributeResponseData>;
/**
 * Request parameters for get_size_chart_detail
 *
 * Get new size chart detail. Now only local shop support to use this api to get new size chart detail.
 */
export interface GetSizeChartDetailRequest {
  /**
   * ID of new size chart
   */
  size_chart_id: number;
}
/**
 * GetSizeChartDetailMeasurement sub-interface for GetSizeChartDetailColumn
 */
export interface GetSizeChartDetailMeasurement {
  /**
   * there are 3 kinds of measurement type: Single Dropdown, Input Single Number, Input Range Number.
   */
  input_type?: string;
  /**
   * name of column header (measurement)
   */
  display_name?: string;
  /**
   * the unit of this size measurement.
   */
  unit?: string;
}
/**
 * GetSizeChartDetailMeasurementValue sub-interface for GetSizeChartDetailColumn
 */
export interface GetSizeChartDetailMeasurementValue {
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
}
/**
 * GetSizeChartDetailColumn sub-interface for GetSizeChartDetailSizeChartTable
 */
export interface GetSizeChartDetailColumn {
  /**
   * this is the column header which means a kind of measurement
   */
  measurement?: GetSizeChartDetailMeasurement;
  /**
   * the list of measurement value
   */
  measurement_value_list?: GetSizeChartDetailMeasurementValue[];
}
/**
 * GetSizeChartDetailSizeChartTable sub-interface for GetSizeChartDetailResponseData
 */
export interface GetSizeChartDetailSizeChartTable {
  /**
   * column list of new size chart table. it include one column (measurement) and multiple values (measurement value)
   */
  column_list?: GetSizeChartDetailColumn[];
}
/**
 * GetSizeChartDetailResponseData sub-interface for GetSizeChartDetailResponse
 */
export interface GetSizeChartDetailResponseData {
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
  size_chart_table?: GetSizeChartDetailSizeChartTable;
}
/**
 * Response payload for get_size_chart_detail
 *
 * Get new size chart detail. Now only local shop support to use this api to get new size chart detail.
 */
export type GetSizeChartDetailResponse = FetchResponse<GetSizeChartDetailResponseData>;
/**
 * Request parameters for get_size_chart_list
 *
 * Get new size chart list. Now only support local shop to use new size chart.
 */
export interface GetSizeChartListRequest {
  /**
   * category id under this shop
   */
  category_id: string;
  /**
   * the size of one page. Max=50.
   */
  page_size: string;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
}
/**
 * GetSizeChartListSizeChart sub-interface for GetSizeChartListResponseData
 */
export interface GetSizeChartListSizeChart {
  /**
   * ID of new size chart
   */
  size_chart_id?: string;
}
/**
 * GetSizeChartListResponseData sub-interface for GetSizeChartListResponse
 */
export interface GetSizeChartListResponseData {
  size_chart_list?: GetSizeChartListSizeChart[];
  /**
   * total number of new size chart under requested category_id
   */
  total_count?: string;
  /**
   * if next_cursor has value, this value need set to next request.cursor
   */
  next_cursor?: string;
}
/**
 * Response payload for get_size_chart_list
 *
 * Get new size chart list. Now only support local shop to use new size chart.
 */
export type GetSizeChartListResponse = FetchResponse<GetSizeChartListResponseData>;
/**
 * Request parameters for get_variations
 *
 * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure.
 * The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
 */
export interface GetVariationsRequest {
  /**
   * Leaf category id
   */
  category_id: number;
}
/**
 * GetVariationsVariationOption sub-interface for GetVariationsVariationGroup
 */
export interface GetVariationsVariationOption {
  variation_option_id?: number;
  variation_option_name?: string;
}
/**
 * GetVariationsVariationGroup sub-interface for GetVariationsStandardiseVariation
 */
export interface GetVariationsVariationGroup {
  variation_group_id?: number;
  variation_group_name?: string;
  variation_option_list?: GetVariationsVariationOption[];
}
/**
 * GetVariationsStandardiseVariation sub-interface for GetVariationsData
 */
export interface GetVariationsStandardiseVariation {
  variation_id?: number;
  variation_name?: string;
  variation_group_list?: GetVariationsVariationGroup[];
}
/**
 * GetVariationsData sub-interface for GetVariationsResponse
 */
export interface GetVariationsData {
  /**
   * standardized tier variation tree
   */
  standardise_variation_list?: GetVariationsStandardiseVariation[];
}
/**
 * Response data payload for get_variations
 */
export interface GetVariationsResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  /**
   * standardized tier variation data
   */
  data?: GetVariationsData;
}
/**
 * Response payload for get_variations
 *
 * Get the standardized tier variation defined by Shopee, which is currently a three-layer tree structure.
 * The top layer is variations, the second layer is groups, groups are used to divide options, and the third layer is options.
 */
export type GetVariationsResponse = FetchResponse<GetVariationsResponseData>;
/**
 * Request parameters for get_vehicle_list_by_compatibility_detail
 *
 * Use this Open API to get vehicle list by brand, model, year, and version.
 */
export interface GetVehicleListByCompatibilityDetailRequest {
  /**
   * To inform compatibility list, can be equal to Brand, Model, Year, or Version.Pass the compatibility_details="Brand" to get all brand list;Pass the compatibility_details="Model" and brand_id=1234 to get all model list under brand_id=1234;Pass the compatibility_details="Year" and brand_id=1234 and model_id=2345 to get all year list under brand_id=1234 and model_id=2345;Pass the compatibility_details="Version" and brand_id=1234 and model_id=2345 and year_id=3456 to get all version list under brand_id=1234 and model_id=2345 and year_id=3456.
   */
  compatibility_details: string;
  /**
   * ID of the brand.
   */
  brand_id?: number;
  /**
   * ID of the model.
   */
  model_id?: number;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ; BR: en / pt-br ; MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL. Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data.
   */
  language?: Language | string | number;
}
/**
 * GetVehicleListByCompatibilityDetailVehicle sub-interface for GetVehicleListByCompatibilityDetailResponseData
 */
export interface GetVehicleListByCompatibilityDetailVehicle {
  /**
   * ID of the brand.
   */
  brand_id?: number;
  /**
   * Name of the brand.
   */
  brand_name?: string;
  /**
   * ID of the model.
   */
  model_id?: number;
  /**
   * Name of the model.
   */
  model_name?: string;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * Name of the year.
   */
  year_name?: string;
  /**
   * ID of the version.
   */
  version_id?: number;
  /**
   * Name of the version.
   */
  version_name?: string;
}
/**
 * GetVehicleListByCompatibilityDetailResponseData sub-interface for GetVehicleListByCompatibilityDetailResponse
 */
export interface GetVehicleListByCompatibilityDetailResponseData {
  vehicle_list?: GetVehicleListByCompatibilityDetailVehicle[];
}
/**
 * Response payload for get_vehicle_list_by_compatibility_detail
 *
 * Use this Open API to get vehicle list by brand, model, year, and version.
 */
export type GetVehicleListByCompatibilityDetailResponse =
  FetchResponse<GetVehicleListByCompatibilityDetailResponseData>;
/**
 * GetWeightRecommendationAttributeValue sub-interface for GetWeightRecommendationAttribute
 */
export interface GetWeightRecommendationAttributeValue {
  /**
   * Unique identifier for value of this item attribute.
   */
  value_id: number;
  /**
   * Value name of this item attribute.
   */
  original_value_name?: string;
  /**
   * Value unit of this item attribute.
   */
  value_unit?: string;
}
/**
 * GetWeightRecommendationAttribute sub-interface for GetWeightRecommendationRequest
 */
export interface GetWeightRecommendationAttribute {
  /**
   * The Identify of each attribute.
   */
  attribute_id: number;
  attribute_value_list: GetWeightRecommendationAttributeValue[];
}
/**
 * GetWeightRecommendationImageInfo sub-interface for GetWeightRecommendationField
 */
export interface GetWeightRecommendationImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
}
/**
 * GetWeightRecommendationField sub-interface for GetWeightRecommendationExtendedDescription
 */
export interface GetWeightRecommendationField {
  /**
   * Type of extended description field, values: See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image, image information will be set by this field.
   */
  image_info?: GetWeightRecommendationImageInfo;
}
/**
 * GetWeightRecommendationExtendedDescription sub-interface for GetWeightRecommendationDescriptionInfo
 */
export interface GetWeightRecommendationExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: GetWeightRecommendationField[];
}
/**
 * GetWeightRecommendationDescriptionInfo sub-interface for GetWeightRecommendationRequest
 */
export interface GetWeightRecommendationDescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: GetWeightRecommendationExtendedDescription;
}
/**
 * Request parameters for get_weight_recommendation
 *
 * Get recommended weight. Now only BR shop support to use this api to get recommended weight.
 */
export interface GetWeightRecommendationRequest {
  /**
   * Name of the item in local language.
   */
  item_name: string;
  /**
   * Image id of first product image.
   */
  cover_image_id: string;
  /**
   * Shopee's unique identifier for a category.
   */
  category_id: number;
  attribute_list: GetWeightRecommendationAttribute[];
  /**
   * Id of brand.
   */
  brand_id: number;
  /**
   * Type of description, values: See Data Definition- description_type (normal , extended).
   */
  description_type: string;
  /**
   * If description_type is normal , Description information should be set by this field.
   */
  description?: string;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended.
   */
  description_info?: GetWeightRecommendationDescriptionInfo;
}
/**
 * GetWeightRecommendationResponseData sub-interface for GetWeightRecommendationResponse
 */
export interface GetWeightRecommendationResponseData {
  /**
   * Recommended weight range, in kg. If there are no recommended results, return empty.
   */
  normal_weight_range?: number[];
}
/**
 * Response payload for get_weight_recommendation
 *
 * Get recommended weight. Now only BR shop support to use this api to get recommended weight.
 */
export type GetWeightRecommendationResponse = FetchResponse<GetWeightRecommendationResponseData>;
/**
 * InitTierVariationSellerStock sub-interface for InitTierVariationModel
 */
export interface InitTierVariationSellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
}
/**
 * InitTierVariationDimension sub-interface for InitTierVariationModel
 */
export interface InitTierVariationDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width: number;
}
/**
 * InitTierVariationPreOrder sub-interface for InitTierVariationModel
 */
export interface InitTierVariationPreOrder {
  /**
   * Whether the model is pre order.
   */
  is_pre_order: boolean;
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship?: number;
}
/**
 * InitTierVariationModel sub-interface for InitTierVariationRequest
 */
export interface InitTierVariationModel {
  /**
   * Tier index of this model.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  tier_index: TierIndex | string | number;
  /**
   * Original price of this model.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）
   */
  original_price: number;
  /**
   * Seller SKU of this model, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * new stock info（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock: InitTierVariationSellerStock[];
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: InitTierVariationDimension;
  /**
   * Pre-order information of this model.Notes: If don't set the DTS of this model, will use the DTS of the item by default.
   */
  pre_order?: InitTierVariationPreOrder;
}
/**
 * InitTierVariationVariationOption sub-interface for InitTierVariationStandardiseTierVariation
 */
export interface InitTierVariationVariationOption {
  /**
   * standardise tier variation option ID.
   */
  variation_option_id?: number;
  /**
   * standardise tier variation option value
   */
  variation_option_name?: string;
  /**
   * standardise tier variation option image ID
   */
  image_id?: string;
}
/**
 * InitTierVariationStandardiseTierVariation sub-interface for InitTierVariationRequest
 */
export interface InitTierVariationStandardiseTierVariation {
  /**
   * standardise tier variation ID.
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
  variation_option_list: InitTierVariationVariationOption[];
}
/**
 * Request parameters for init_tier_variation
 *
 * This API allows you to update the tier structure of a product. Defining only color creates one tier, while color + size creates two tiers (maximum supported). Supported changes include: no tier ↔ one/two tiers, one tier ↔ two/no tier, and two tiers ↔ one/no tier. For details, see Developer Guide.  Please wait at least 5 seconds after creating an item before creating variants, as processing may be delayed.
 */
export interface InitTierVariationRequest {
  /**
   * ID of item
   */
  item_id: number;
  /**
   * Model info list, model number at most 50
   */
  model: InitTierVariationModel[];
  /**
   * There is at least one standardise_tier_variation and tier_variation.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  standardise_tier_variation?: InitTierVariationStandardiseTierVariation[];
}
/**
 * InitTierVariationImage sub-interface for InitTierVariationOption
 */
export interface InitTierVariationImage {
  /**
   * URL of image
   */
  image_url?: string;
}
/**
 * InitTierVariationOption sub-interface for InitTierVariationTierVariation
 */
export interface InitTierVariationOption {
  /**
   * Image of this option
   */
  image?: InitTierVariationImage;
  /**
   * Option name
   */
  option?: string;
}
/**
 * InitTierVariationTierVariation sub-interface for InitTierVariationResponseData
 */
export interface InitTierVariationTierVariation {
  /**
   * Variation name
   */
  name?: string;
  /**
   * Options of this variation
   */
  option_list?: InitTierVariationOption[];
}
/**
 * InitTierVariationPriceInfo sub-interface for InitTierVariation_InitTierVariationModel
 */
export interface InitTierVariationPriceInfo {
  /**
   * Original price
   */
  original_price?: number;
}
/**
 * InitTierVariation_InitTierVariationSellerStock sub-interface for InitTierVariation_InitTierVariationModel
 */
export interface InitTierVariation_InitTierVariationSellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
}
/**
 * InitTierVariation_InitTierVariationDimension sub-interface for InitTierVariation_InitTierVariationModel
 */
export interface InitTierVariation_InitTierVariationDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width?: number;
}
/**
 * InitTierVariation_InitTierVariationModel sub-interface for InitTierVariationResponseData
 */
export interface InitTierVariation_InitTierVariationModel {
  /**
   * Tier index of model. Index starts from 0.
   */
  tier_index?: any[];
  /**
   * ID of model
   */
  model_id?: number;
  /**
   * Seller SKU of this model
   */
  model_sku?: string;
  price_info?: InitTierVariationPriceInfo[];
  /**
   * new stock info
   */
  seller_stock?: InitTierVariation_InitTierVariationSellerStock[];
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: InitTierVariation_InitTierVariationDimension;
}
/**
 * InitTierVariationResponseData sub-interface for InitTierVariationResponse
 */
export interface InitTierVariationResponseData {
  /**
   * ID of item
   */
  item_id?: number;
  /**
   * Variations of item
   */
  tier_variation?: InitTierVariationTierVariation[];
  model?: InitTierVariation_InitTierVariationModel[];
}
/**
 * Response payload for init_tier_variation
 *
 * This API allows you to update the tier structure of a product. Defining only color creates one tier, while color + size creates two tiers (maximum supported). Supported changes include: no tier ↔ one/two tiers, one tier ↔ two/no tier, and two tiers ↔ one/no tier. For details, see Developer Guide.  Please wait at least 5 seconds after creating an item before creating variants, as processing may be delayed.
 */
export type InitTierVariationResponse = FetchResponse<InitTierVariationResponseData>;
/**
 * RegisterBrandProductImage sub-interface for RegisterBrandRequest
 */
export interface RegisterBrandProductImage {
  /**
   * Image Id of product image for this brand, max input num of file = 10 ,each file's length<=498. ID market is optional.
   */
  image_id_list: string[];
}
/**
 * RegisterBrandLicense sub-interface for RegisterBrandRequest
 */
export interface RegisterBrandLicense {
  /**
   * Brand registration certificate image name, len < 254
   */
  file_name?: string;
  /**
   * Image id of brand registration certificate image , max input num of file = 1 , each file's length<=498
   */
  file_hash?: string;
}
/**
 * Request parameters for register_brand
 *
 * Use this call to register a brand.
 */
export interface RegisterBrandRequest {
  /**
   * Brand name, length<=254.
   */
  original_brand_name: string;
  /**
   * Category_id list for this brand, please input category in L1 or L2. Max input num of category_id is 50.
   */
  category_list: number[];
  product_image: RegisterBrandProductImage;
  /**
   * Image_id  of logo for  app client,please input hashcode of this picture.
   */
  app_logo_image_id?: string;
  /**
   * Official website of brand, length<=254.
   */
  brand_website?: string;
  /**
   * The description of this brand, can input the information, length<=254.
   */
  brand_description?: string;
  /**
   * Additional notes or comment can seller can add, length<=254.
   */
  additional_information?: string;
  /**
   * Image_id  of logo for  pc client,please input hashcode of this picture.
   */
  pc_logo_image_id?: string;
  /**
   * origin region of brand.
   */
  brand_region: string;
  /**
   * For appeal blacklisted brand data
   */
  licenses?: RegisterBrandLicense[];
  /**
   * The link to brand registration website, It is mandatory when brand name hit blacklist.len<254
   */
  brand_registration_website?: string;
}
/**
 * RegisterBrandResponseData sub-interface for RegisterBrandResponse
 */
export interface RegisterBrandResponseData {
  /**
   * The identity of brand.
   */
  brand_id?: number;
  /**
   * Brand name
   */
  original_brand_name?: string;
}
/**
 * Response payload for register_brand
 *
 * Use this call to register a brand.
 */
export type RegisterBrandResponse = FetchResponse<RegisterBrandResponseData>;
/**
 * ReplyCommentComment sub-interface for ReplyCommentRequest
 */
export interface ReplyCommentComment {
  /**
   * The identity of comment.
   */
  comment_id: number;
  /**
   * The content of the comment.
   */
  comment: string;
}
/**
 * Request parameters for reply_comment
 *
 * Use this api to reply comments from buyers in batch.
 */
export interface ReplyCommentRequest {
  /**
   * The list of comment. The limit is between 1 and 100.
   */
  comment_list: ReplyCommentComment[];
}
/**
 * ReplyCommentResult sub-interface for ReplyCommentResponseData
 */
export interface ReplyCommentResult {
  /**
   * The identity of comment.
   */
  comment_id?: number;
  /**
   * Indicate error details if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error type if one element hit error.
   */
  fail_message?: string;
}
/**
 * ReplyCommentResponseData sub-interface for ReplyCommentResponse
 */
export interface ReplyCommentResponseData {
  /**
   * The result list of the request comment list.
   */
  result_list?: ReplyCommentResult[];
}
/**
 * Response payload for reply_comment
 *
 * Use this api to reply comments from buyers in batch.
 */
export type ReplyCommentResponse = FetchResponse<ReplyCommentResponseData>;
/**
 * Request parameters for search_attribute_value_list
 *
 * this api is for searching attribute value list for attribute with support_search_value flag
 */
export interface SearchAttributeValueListRequest {
  attribute_id: number;
  /**
   * search the keywords of the attributes value
   */
  value_name?: string;
  cursor: number;
  /**
   * The range is 1 to 100
   */
  limit: number;
}
/**
 * SearchAttributeValueListValue sub-interface for SearchAttributeValueListResponseData
 */
export interface SearchAttributeValueListValue {
  /**
   * The ID of the predefined attributes value.
   */
  value_id?: number;
  /**
   * The name of the predefined attributes value.
   */
  value_name?: string;
}
/**
 * SearchAttributeValueListPageInfo sub-interface for SearchAttributeValueListResponseData
 */
export interface SearchAttributeValueListPageInfo {
  cursor?: number;
  has_next?: boolean;
}
/**
 * SearchAttributeValueListResponseData sub-interface for SearchAttributeValueListResponse
 */
export interface SearchAttributeValueListResponseData {
  value_list?: SearchAttributeValueListValue[];
  page_info?: SearchAttributeValueListPageInfo;
}
/**
 * Response payload for search_attribute_value_list
 *
 * this api is for searching attribute value list for attribute with support_search_value flag
 */
export type SearchAttributeValueListResponse = FetchResponse<SearchAttributeValueListResponseData>;
/**
 * Request parameters for search_item
 *
 * Use this call to search item.
 */
export interface SearchItemRequest {
  /**
   * Specifies the starting entry of data to return in the current call. Default is empty. if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: string;
  /**
   * the size of one page.
   */
  page_size: number;
  /**
   * name of item.
   */
  item_name?: string;
  /**
   * 1:get item lack of requires attribute.   2:get item lack of optional attribute.
   */
  attribute_status?: number;
  /**
   * sku. If you search for item_sku and item_name at the same time, only the results that match item_sku will be returned. If you search for item_sku and attribute_status at the same time, the results that match both item_sku and attribute_status will be returned.
   */
  item_sku?: string;
  /**
   * NORMAL/BANNED/UNLIST/REVIEWING/SELLER_DELETE/SHOPEE_DELETEIf you want to search multiple status, please upload the url like this: item_status=NORMAL&item_status=BANNED
   */
  item_status?: ItemStatus | string | number;
  /**
   * If deboost_only is true, then API will return items whose deboost is true, if deboost_only is empty or false, then API will return items whose deboost is true and false simultaneously
   */
  deboost_only?: boolean;
}
/**
 * SearchItemResponseData sub-interface for SearchItemResponse
 */
export interface SearchItemResponseData {
  /**
   * List of  item ID.
   */
  item_id_list?: number[];
  /**
   * Total num of items match condation.
   */
  total_count?: number;
  /**
   * If has_next_page is true, this value need set to next request.offset
   */
  next_offset?: string;
}
/**
 * Response payload for search_item
 *
 * Use this call to search item.
 */
export type SearchItemResponse = FetchResponse<SearchItemResponseData>;
/**
 * Request parameters for search_unpackaged_model_list
 *
 * Use this API to retrieve Unpackaged SKU ID information for items that toggle on logistics channel 30029.
 */
export interface SearchUnpackagedModelListRequest {
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 48.
   */
  page_size: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Shopee's unique identifier for a model under item.
   */
  model_id?: number;
  /**
   * Unpackaged SKU ID of the model.
   */
  unpackaged_sku_id?: string;
}
/**
 * SearchUnpackagedModelListModel sub-interface for SearchUnpackagedModelListResponseData
 */
export interface SearchUnpackagedModelListModel {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Name of the item.
   */
  item_name?: string;
  /**
   * Shopee's unique identifier for a model under item. 0 for no model item.
   */
  model_id?: number;
  /**
   * Unpackaged SKU ID of the model.
   */
  unpackaged_sku_id?: string;
}
/**
 * SearchUnpackagedModelListResponseData sub-interface for SearchUnpackagedModelListResponse
 */
export interface SearchUnpackagedModelListResponseData {
  /**
   * Total number of models that match the condition.
   */
  total_count?: number;
  /**
   * Pass the next_cursor in the next request as cursor to get the next page data.
   */
  next_cursor?: string;
  /**
   * List of models that match the condition.
   */
  model_list?: SearchUnpackagedModelListModel[];
}
/**
 * Response payload for search_unpackaged_model_list
 *
 * Use this API to retrieve Unpackaged SKU ID information for items that toggle on logistics channel 30029.
 */
export type SearchUnpackagedModelListResponse =
  FetchResponse<SearchUnpackagedModelListResponseData>;
/**
 * UnlistItemItem sub-interface for UnlistItemRequest
 */
export interface UnlistItemItem {
  /**
   * Shopee's unique identifier for an item
   */
  item_id: number;
  /**
   * Unlist or not
   */
  unlist: boolean;
}
/**
 * Request parameters for unlist_item
 *
 * Unlist item.
 */
export interface UnlistItemRequest {
  /**
   * Length should be between 1 to 50.
   */
  item_list: UnlistItemItem[];
}
/**
 * UnlistItemFailure sub-interface for UnlistItemResponseData
 */
export interface UnlistItemFailure {
  /**
   * Failed item id
   */
  item_id?: number;
  /**
   * Failed reason
   */
  failed_reason?: string;
}
/**
 * UnlistItemSuccess sub-interface for UnlistItemResponseData
 */
export interface UnlistItemSuccess {
  /**
   * Success item id
   */
  item_id?: number;
  /**
   * Whether the item is unlisted
   */
  unlist?: boolean;
}
/**
 * UnlistItemResponseData sub-interface for UnlistItemResponse
 */
export interface UnlistItemResponseData {
  failure_list?: UnlistItemFailure[];
  success_list?: UnlistItemSuccess[];
}
/**
 * Response payload for unlist_item
 *
 * Unlist item.
 */
export type UnlistItemResponse = FetchResponse<UnlistItemResponseData>;
/**
 * UpdateItemPreOrder sub-interface for UpdateItemRequest
 */
export interface UpdateItemPreOrder {
  /**
   * Days to ship.
   */
  days_to_ship: number;
  /**
   * Whether the item is pre order.
   */
  is_pre_order: boolean;
}
/**
 * UpdateItemAttributeValue sub-interface for UpdateItemAttribute
 */
export interface UpdateItemAttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id: number;
  /**
   * Value name. original_value_name from produc.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
}
/**
 * UpdateItemAttribute sub-interface for UpdateItemRequest
 */
export interface UpdateItemAttribute {
  /**
   * ID of attribute.
   */
  attribute_id: number;
  attribute_value_list?: UpdateItemAttributeValue[];
}
/**
 * UpdateItemImage sub-interface for UpdateItemRequest
 */
export interface UpdateItemImage {
  /**
   * Image ID.
   */
  image_id_list: string[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"
   */
  image_ratio?: string;
}
/**
 * UpdateItemWholesale sub-interface for UpdateItemRequest
 */
export interface UpdateItemWholesale {
  /**
   * Minimum count of this tier.
   */
  min_count: number;
  /**
   * Price of this tier.
   */
  unit_price: number;
  /**
   * Maximum count of this tier.
   */
  max_count: number;
}
/**
 * UpdateItemDimension sub-interface for UpdateItemRequest
 */
export interface UpdateItemDimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width: number;
}
/**
 * UpdateItemBrand sub-interface for UpdateItemRequest
 */
export interface UpdateItemBrand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand.
   */
  original_brand_name?: string;
}
/**
 * UpdateItemGroupItemInfo sub-interface for UpdateItemTaxInfo
 */
export interface UpdateItemGroupItemInfo {
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter 6.
   */
  group_qtd?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unit), enter UNI for the individual can.
   */
  group_unit?: string;
  /**
   * Example: The package contains 6 soda cans. Whether you are selling a pack of 6 cans (fardo) or a single can (unity), enter the value of the individual can.
   */
  group_unit_value?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Enter the price of the whole package.
   */
  original_group_price?: string;
  /**
   * Example: The item is a package that contains 6 soda cans. Please inform the GTIN SSCC code for the package.
   */
  group_gtin_sscc?: string;
  /**
   * Example: The item is box, that contain 6 packages. Each package contains 6 soda cans. Please inform the GRAI GTIN SSCC code for the Box.
   */
  group_grai_gtin_sscc?: string;
}
/**
 * UpdateItemTaxInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemTaxInfo {
  /**
   * Mercosur Common Nomenclature, it is a convention between Mercosur member countries to easily recognize goods, services and productive factors negotiated among themselves. (BR region)NCM must have 8 digits, OR, if your item doesn't have a NCM enter the value "00"
   */
  ncm?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in the same state. It identifies a specific operation by category at the time of issuing the invoice.
   */
  same_state_cfop?: string;
  /**
   * Tax Code of Operations and Installments for orders that seller and buyer are in different states. It identifies a specific operation by category at the time of issuing the invoice.
   */
  diff_state_cfop?: string;
  /**
   * Code of Operation Status – Simples Nacional, code for company operations to identify the origin of the goods and the taxation regime of the operations.
   */
  csosn?: string;
  /**
   * Product source, domestic or foreig
   */
  origin?: string;
  /**
   * Tax Replacement Specifying Code (CEST), to separate within the same NCM products that do or do not have ICMS tax substitution. (BR region)CEST must have 7 digits, OR, if your item doesn't have a CEST enter the value "00".
   */
  cest?: string;
  /**
   * (BR region)The value must be provided in uppercase and must match one of the supported units below:AMPOLA, BALDE, BANDEJ, BARRA, BISNAG, BLOCO, BOBINA, BOMB, CAPS, CART, CENTO, CJ, CM, CM2, CX, CX2, CX3, CX5, CX10, CX15, CX20, CX25, CX50, CX100, DISP, DUZIA, EMBAL, FARDO, FOLHA, FRASCO, GALAO, GF, GRAMAS, JOGO, KG, KIT, LATA, LITRO, M, M2, M3, MILHEI, ML, MWH, PACOTE, PALETE, PARES, PC, POTE, K, RESMA, ROLO, SACO, SACOLA, TAMBOR, TANQUE, TON, TUBO, UN, VASIL, VIDRO.
   */
  measure_unit?: string;
  /**
   * Value shuold be one of NO_INVOICES VAT_MARGIN_SCHEME_INVOICES VAT_INVOICES NON_VAT_INVOICES and if value is NON_VAT_INVOICE vat_rate should be null (PL region)
   */
  invoice_option?: string;
  /**
   * Value should be one of 0% 5% 8% 23% NO_VAT_RATE (PL region)
   */
  vat_rate?: string;
  /**
   * HS Code. (Only for IN region)
   */
  hs_code?: string;
  /**
   * Tax Code. (Only for IN region)
   */
  tax_code?: string;
  /**
   * tax_type only for TW whitelist shop. Shopee will referred Tax type when substitute sellers for issuing e-receipts to buyers. All variations share the same tax type. The meaning of value: 0: no tax type1: tax-able2: tax-free
   */
  tax_type?: number;
  /**
   * Only for BR shop.PIS - Programa de Integração Social (Social Integration Program). It is a government tax to collect resources for the payment of unemployment insurance and other employee related rights.PIS % - the tax applied to this product
   */
  pis?: string;
  /**
   * Only for BR shop.COFINS – Contribuição para Financiamento da Seguridade Social (Contribution for Social Security Funding). It is a government tax to collect resources for public health system and social security.COFINS % - the tax applied to this product
   */
  cofins?: string;
  /**
   * Only for BR shop.ICMS - Imposto sobre Circulação de Mercadorias e Serviços (Circulation of Goods and Services Tax). CST - Código da Situação Tributária (Tax Situation Code) is represented by a combination of 3 numbers with the purpose of demonstrating the origin of a product and determining the form of taxation that will apply to it. Therefore, each digit in the CST Table has a specific meaning: the first digit indicates the origin of the operation, the second digit represents the ICMS taxation on the operation and the third digit provides additional information about the form of taxation.
   */
  icms_cst?: string;
  /**
   * Only for BR shop.The CST PIS/Cofins is a code on the Electronic Invoice (NF-e) that identifies the tax situation of PIS (Programa de Integração Social) and Cofins (Contribuição para o Financiamento da Seguridade Social) in sales of goods.
   */
  pis_cofins_cst?: PisCofinsCst | string | number;
  /**
   * Only for BR shop.Enter the total percentage of the combination of federal, state, and municipal taxes, using up to two decimals.
   */
  federal_state_taxes?: string;
  /**
   * Only for BR shop.1: Retailer2: Manufacturer
   */
  operation_type?: string;
  /**
   * Only for BR shop.The EXTIPI field in the NF-e (Nota Fiscal Eletrônica) is used to indicate if there's an exception to the IPI (Imposto sobre Produtos Industrializados) tax rate for a specific product.
   */
  ex_tipi?: string;
  /**
   * Only for BR shop.The FCI Control Number is a unique identifier assigned to each import FCI (Import Content Form). It's mandatory on the corresponding NF-e (electronic invoice) to ensure compliance with Brazilian import tax regulations.
   */
  fci_num?: string;
  /**
   * Only for BR shop.RECOPI NACIONAL is a Brazilian government system that facilitates the registration and management of tax-exempt operations involving paper destined for printing books, newspapers, and periodicals (known as "papel imune" in Portuguese).
   */
  recopi_num?: string;
  /**
   * Only for BR shop.Include relevant information to display on Invoice.
   */
  additional_info?: string;
  /**
   * Only for BR shop.Required if the item is a group item.
   */
  group_item_info?: UpdateItemGroupItemInfo;
  /**
   * 7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
}
/**
 * UpdateItemComplaintPolicy sub-interface for UpdateItemRequest
 */
export interface UpdateItemComplaintPolicy {
  /**
   * Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS.
   */
  warranty_time?: string;
  /**
   * If True means "I exclude warranty complaints for entrepreneur"
   */
  exclude_entrepreneur_warranty?: boolean;
  /**
   * Address for complaint. Fetch available addresses using v2.logistics.get_address_list, and use address_id returned from it.
   */
  complaint_address_id?: number;
  /**
   * Additional information for warranty claim. Should be less than 1000 characters.
   */
  additional_information?: string;
}
/**
 * UpdateItemImageInfo sub-interface for UpdateItemField
 */
export interface UpdateItemImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
}
/**
 * UpdateItemField sub-interface for UpdateItemExtendedDescription
 */
export interface UpdateItemField {
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
  image_info?: UpdateItemImageInfo;
}
/**
 * UpdateItemExtendedDescription sub-interface for UpdateItemDescriptionInfo
 */
export interface UpdateItemExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: UpdateItemField[];
}
/**
 * UpdateItemDescriptionInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemDescriptionInfo {
  /**
   * If description_type is extended , description information should be set by this field.
   */
  extended_description?: UpdateItemExtendedDescription;
}
/**
 * UpdateItemPromotionImage sub-interface for UpdateItemRequest
 */
export interface UpdateItemPromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
}
/**
 * UpdateItemVehicleInfo sub-interface for UpdateItemCompatibilityInfo
 */
export interface UpdateItemVehicleInfo {
  /**
   * ID of the brand.
   */
  brand_id: number;
  /**
   * ID of the model.
   */
  model_id: number;
  /**
   * ID of the year.
   */
  year_id?: number;
  /**
   * ID of the version.
   */
  version_id?: number;
}
/**
 * UpdateItemCompatibilityInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemCompatibilityInfo {
  vehicle_info_list: UpdateItemVehicleInfo[];
}
/**
 * UpdateItemSizeChartInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemSizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty.You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0.You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
}
/**
 * UpdateItemCertificationProof sub-interface for UpdateItemCertification
 */
export interface UpdateItemCertificationProof {
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id: string;
  /**
   * The name of the uploaded certification proof file.
   */
  file_name: string;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio: number;
}
/**
 * UpdateItemCertification sub-interface for UpdateItemCertificationInfo
 */
export interface UpdateItemCertification {
  /**
   * Certification number issued by the regulatory or certifying authority; uniquely identifies the certification.refer tohttps://seller.shopee.ph/edu/article/24236
   */
  certification_no: CertificationNo | string | number;
  /**
   * Platform-defined permit ID used to link to a specific certification template or rule.get from v2.product.get_product_certification_rule
   */
  permit_id: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs?: UpdateItemCertificationProof;
}
/**
 * UpdateItemCertificationInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemCertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: UpdateItemCertification[];
}
/**
 * UpdateItemMaxPurchaseLimit sub-interface for UpdateItemPurchaseLimitInfo
 */
export interface UpdateItemMaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
}
/**
 * UpdateItemPurchaseLimitInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItemPurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: UpdateItemMaxPurchaseLimit;
}
/**
 * Request parameters for update_item
 *
 * Update item.
 */
export interface UpdateItemRequest {
  /**
   * Description of item.
   */
  description?: string;
  /**
   * The weight of this item, the unit is KG.Updating the weight of this item will overwrite the weight of all models under this item.
   */
  weight?: number;
  /**
   * Pre Order setting.
   */
  pre_order?: UpdateItemPreOrder;
  /**
   * Item name.
   */
  item_name?: string;
  /**
   * Item attributes.
   */
  attribute_list?: UpdateItemAttribute[];
  /**
   * Images of item.
   */
  image?: UpdateItemImage;
  /**
   * SKU tag for item.
   */
  item_sku?: string;
  /**
   * Item status, could be UNLIST or NORMAL.
   */
  item_status?: string;
  /**
   * Wholesale setting.If you want to delete it, please pass it with blank.
   */
  wholesale?: UpdateItemWholesale[];
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * ID of category.
   */
  category_id?: number;
  /**
   * The dimension of this item.Updating the dimension of this item will overwrite the dimension of all models under this item.
   */
  dimension?: UpdateItemDimension;
  /**
   * Condition of item, could be NEW or USED.
   */
  condition?: string;
  /**
   * Video upload ID returned from video uploading API.If you want to delete it, please pass it with blank.
   */
  video_upload_id?: string[];
  brand?: UpdateItemBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: UpdateItemTaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: UpdateItemComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateItemDescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description or change description type ,this field must be inputed
   */
  description_type?: string;
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * category recommendation service id
   */
  ds_cat_rcmd_id?: string;
  /**
   * Promotion ImageCurrently only allow one promoton imageYou could set promotion image only if the product images' ratio is 3:4
   */
  promotion_images?: UpdateItemPromotionImage;
  compatibility_info?: UpdateItemCompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: UpdateItemSizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: UpdateItemCertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: UpdateItemPurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
}
/**
 * UpdateItem_UpdateItemImage sub-interface for UpdateItemResponseData
 */
export interface UpdateItem_UpdateItemImage {
  /**
   * ID list of item image.
   */
  image_id_list: string[];
  /**
   * URL list of item image
   */
  image_url_list: string[];
}
/**
 * UpdateItemLogisticInfo sub-interface for UpdateItemResponseData
 */
export interface UpdateItemLogisticInfo {
  /**
   * Estimated shipping fee.
   */
  estimated_shipping_fee: number;
  /**
   * Name of logistics channel.
   */
  logistic_name: string;
  /**
   * Whether this channel is enabled.
   */
  enabled: boolean;
  /**
   * ID of this channel.
   */
  logistic_id: number;
  /**
   * Whether cover shipping fee for buyer.
   */
  is_free: boolean;
}
/**
 * UpdateItem_UpdateItemComplaintPolicy sub-interface for UpdateItemResponseData
 */
export interface UpdateItem_UpdateItemComplaintPolicy {
  /**
   * Value should be in one of ONE_YEAR TWO_YEARS OVER_TWO_YEARS.
   */
  warranty_time?: string;
  /**
   * If True means "I exclude warranty complaints for entrepreneur"
   */
  exclude_entrepreneur_warranty?: boolean;
  /**
   * Additional information for complaint policy
   */
  additional_information?: string;
}
/**
 * UpdateItemResponseData sub-interface for UpdateItemResponse
 */
export interface UpdateItemResponseData {
  /**
   * Item description.
   */
  description: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight: number;
  pre_order: UpdateItemPreOrder;
  /**
   * Item name.
   */
  item_name: string;
  /**
   * Item status.
   */
  item_status: string;
  /**
   * Item images.
   */
  images: UpdateItem_UpdateItemImage;
  logistic_info: UpdateItemLogisticInfo[];
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * ID of item category.
   */
  category_id: number;
  /**
   * The dimension of this item.
   */
  dimension: UpdateItemDimension;
  /**
   * Item condition, could be USED or NEW.
   */
  condition: string;
  brand?: UpdateItemBrand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Complaint policy
   */
  complaint_policy?: UpdateItem_UpdateItemComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateItemDescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
}
/**
 * Response payload for update_item
 *
 * Update item.
 */
export type UpdateItemResponse = FetchResponse<UpdateItemResponseData>;
/**
 * UpdateKitItemImage sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemImage {
  /**
   * ID of image.
   */
  image_id_list: string[];
}
/**
 * UpdateKitItemLongImage sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemLongImage {
  /**
   * ID of image.
   */
  image_id_list: string[];
}
/**
 * UpdateKitItemImageInfo sub-interface for UpdateKitItemField
 */
export interface UpdateKitItemImageInfo {
  /**
   * Image id.
   */
  image_id: string;
}
/**
 * UpdateKitItemField sub-interface for UpdateKitItemExtendedDescription
 */
export interface UpdateKitItemField {
  /**
   * Type of extended description field. See Data Definition- description_field_type (text , image).
   */
  field_type: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text: string;
  /**
   * If field_type is image, image will be set by this field.
   */
  image_info?: UpdateKitItemImageInfo;
}
/**
 * UpdateKitItemExtendedDescription sub-interface for UpdateKitItemDescriptionInfo
 */
export interface UpdateKitItemExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list: UpdateKitItemField[];
}
/**
 * UpdateKitItemDescriptionInfo sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemDescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description: UpdateKitItemExtendedDescription;
}
/**
 * UpdateKitItemLogisticInfo sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemLogisticInfo {
  /**
   * ID of the channel.
   */
  logistic_id: number;
  /**
   * Whether channel is enabled for this kit item.
   */
  enabled: boolean;
  /**
   * Shipping fee. Only needed when logistics fee_type = CUSTOM_PRICE.
   */
  shipping_fee?: number;
  /**
   * Size ID. Only needed when logistic fee_type = SIZE_SELECTION.
   */
  size_id?: number;
  /**
   * Whether cover shipping fee for buyer.
   */
  is_free?: boolean;
}
/**
 * UpdateKitItemDimension sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemDimension {
  /**
   * The length of package for this kit item, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this kit item, the unit is CM.
   */
  package_width: number;
  /**
   * The height of package for this kit item, the unit is CM.
   */
  package_height: number;
}
/**
 * UpdateKitItemPreOrder sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemPreOrder {
  /**
   * Whether kit item is pre order.
   */
  is_pre_order: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_kit_item_limit api.
   */
  days_to_ship?: number;
}
/**
 * UpdateKitItemComponent sub-interface for UpdateKitItemModel
 */
export interface UpdateKitItemComponent {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  /**
   * The amount of the item/model that composes this kit model.
   */
  quantity: number;
  /**
   * Whether this item/model is the main component for this kit.One kit item can only have one item/model as main component.
   */
  main_component?: boolean;
}
/**
 * UpdateKitItemModel sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemModel {
  /**
   * ID of this kit model.
   */
  model_id?: number;
  /**
   * Tier index of this kit model.
   */
  tier_index: number[];
  /**
   * Seller SKU of this kit model, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * Original price of this kit model.
   */
  original_price?: number;
  /**
   * Please get the amount of item/model that one kit model support from get_kit_item_limit.
   */
  component_list?: UpdateKitItemComponent[];
}
/**
 * UpdateKitItem_UpdateKitItemImage sub-interface for UpdateKitItemOption
 */
export interface UpdateKitItem_UpdateKitItemImage {
  /**
   * ID of image. If you choose to define, you need to define an image for all options.
   */
  image_id: string;
}
/**
 * UpdateKitItemOption sub-interface for UpdateKitItemTierVariation
 */
export interface UpdateKitItemOption {
  /**
   * Option name.
   */
  option: string;
  /**
   * Option image.
   */
  image?: UpdateKitItem_UpdateKitItemImage;
}
/**
 * UpdateKitItemTierVariation sub-interface for UpdateKitItemItemSetting
 */
export interface UpdateKitItemTierVariation {
  /**
   * Tier variation name.
   */
  name?: string;
  /**
   * Tier variation option info list.
   */
  option_list: UpdateKitItemOption[];
}
/**
 * UpdateKitItemItemSetting sub-interface for UpdateKitItemRequest
 */
export interface UpdateKitItemItemSetting {
  /**
   * The name of this kit item.
   */
  item_name?: string;
  /**
   * Item images with 1:1 ratio.
   */
  images?: UpdateKitItemImage;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: UpdateKitItemLongImage;
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  /**
   * If description_type is normal, description information should be set by this field.
   */
  description?: string;
  /**
   * Rich text description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateKitItemDescriptionInfo;
  /**
   * See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed.
   */
  description_type?: string;
  /**
   * Logistic channel setting.
   */
  logistic_info?: UpdateKitItemLogisticInfo[];
  /**
   * Unlist or not.
   */
  unlisted?: boolean;
  /**
   * SKU tag of item
   */
  item_sku?: string;
  /**
   * The weight of this kit item, the unit is KG.
   */
  weight?: number;
  /**
   * The dimension of this kit item.
   */
  dimension?: UpdateKitItemDimension;
  /**
   * Pre order setting.
   */
  pre_order?: UpdateKitItemPreOrder;
  /**
   * Model info list, model number at most 9.
   */
  model_list?: UpdateKitItemModel[];
  /**
   * Tier variation info list. Only support one tier variation, and each kit item can have from 1 to 9 kit variations.
   */
  tier_variation_list?: UpdateKitItemTierVariation[];
}
/**
 * UpdateKitItemSyncSetting sub-interface for UpdateKitItemRequest
 */
export interface UpdateKitItemSyncSetting {
  /**
   * Auto sync the pre_order setting from main component or not.
   */
  auto_sync_dts: boolean;
}
/**
 * Request parameters for update_kit_item
 *
 * Update the kit basic information and kit components, only support adding kit variations and updating existing kit variation’s image, price, and model_sku, don’t support deleting existing kit variations and updating the items, main component and quantity per kit of existing kit variations.
 */
export interface UpdateKitItemRequest {
  /**
   * ID of kit item.
   */
  item_id: number;
  item_setting?: UpdateKitItemItemSetting;
  sync_setting?: UpdateKitItemSyncSetting;
}
/**
 * Response data payload for update_kit_item
 */
export interface UpdateKitItemResponseData {
  warning?: string;
}
/**
 * Response payload for update_kit_item
 *
 * Update the kit basic information and kit components, only support adding kit variations and updating existing kit variation’s image, price, and model_sku, don’t support deleting existing kit variations and updating the items, main component and quantity per kit of existing kit variations.
 */
export type UpdateKitItemResponse = FetchResponse<UpdateKitItemResponseData>;
/**
 * UpdateModelPreOrder sub-interface for UpdateModelModel
 */
export interface UpdateModelPreOrder {
  /**
   * Pre-order
   */
  is_pre_order: boolean;
  /**
   * The days to ship. Only work for is_pre_order=true
   */
  days_to_ship: number;
}
/**
 * UpdateModelDimension sub-interface for UpdateModelModel
 */
export interface UpdateModelDimension {
  /**
   * The height of package for this model, the unit is CM.
   */
  package_height: number;
  /**
   * The length of package for this model, the unit is CM.
   */
  package_length: number;
  /**
   * The width of package for this model, the unit is CM.
   */
  package_width: number;
}
/**
 * UpdateModelModel sub-interface for UpdateModelRequest
 */
export interface UpdateModelModel {
  /**
   * ID of model
   */
  model_id: number;
  /**
   * Seller SKU for model, model_sku length information needs to be no more than 100 characters. CNSC and KRSC sellers are not allowed to update the MPSKU model sku.
   */
  model_sku: string;
  pre_order?: UpdateModelPreOrder;
  /**
   * - GTIN is an identifier for trade items, developed by the international organization GS1.- They have 8 to 14 digits. The most common are UPC, EAN, JAN and ISBN.- GTIN will help boost positioning in online marketing channels like Google and Facebook.- That incorporation with GTIN will also aid in Search and Recommendation in Shopee itself allowing buyers to have higher likelihood of finding one's listing.Note: If you want to set “Item without GTIN”, please pass the gtin_code as "00".The validation rule is based on the value return in gtin_validation_rule" field in v2.product.get_item_limit API- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" to declare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omitted entirely.
   */
  gtin_code?: GtinCode | string | number;
  /**
   * can be "NORMAL" or "UNAVAILABLE". Only CNSC and KRSC sellers can set the model_status. Normal models can be sold on the buyer's side, and UNAVAILABLE models cannot be sold on the buyer's side.
   */
  model_status?: string;
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: UpdateModelDimension;
}
/**
 * Request parameters for update_model
 *
 * Update seller sku/ pre order/ model status for model.
 */
export interface UpdateModelRequest {
  /**
   * ID of item
   */
  item_id: number;
  /**
   * Length should be between 1 to 50
   */
  model: UpdateModelModel[];
}
/**
 * Response data payload for update_model
 */
export interface UpdateModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for update_model
 *
 * Update seller sku/ pre order/ model status for model.
 */
export type UpdateModelResponse = FetchResponse<UpdateModelResponseData>;
/**
 * UpdatePricePrice sub-interface for UpdatePriceRequest
 */
export interface UpdatePricePrice {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * Original price for this model.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）For SG/MY/BR/MX/PL/ES/AR seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer.
   */
  original_price: number;
}
/**
 * Request parameters for update_price
 *
 * Update price.
 */
export interface UpdatePriceRequest {
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * Length should be between 1 to 50.
   */
  price_list: UpdatePricePrice[];
}
/**
 * UpdatePriceFailure sub-interface for UpdatePriceResponseData
 */
export interface UpdatePriceFailure {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
}
/**
 * UpdatePriceSuccess sub-interface for UpdatePriceResponseData
 */
export interface UpdatePriceSuccess {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Original price for model.
   */
  original_price?: number;
}
/**
 * UpdatePriceResponseData sub-interface for UpdatePriceResponse
 */
export interface UpdatePriceResponseData {
  /**
   * Fail model list.
   */
  failure_list?: UpdatePriceFailure[];
  /**
   * Success model list.
   */
  success_list?: UpdatePriceSuccess[];
}
/**
 * Response payload for update_price
 *
 * Update price.
 */
export type UpdatePriceResponse = FetchResponse<UpdatePriceResponseData>;
/**
 * UpdateSipItemPriceSipItemPrice sub-interface for UpdateSipItemPriceRequest
 */
export interface UpdateSipItemPriceSipItemPrice {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * SIP item price.
   */
  sip_item_price: number;
}
/**
 * Request parameters for update_sip_item_price
 *
 * Update sip item price.
 */
export interface UpdateSipItemPriceRequest {
  /**
   * ID of item.
   */
  item_id: number;
  sip_item_price?: UpdateSipItemPriceSipItemPrice[];
}
/**
 * Response data payload for update_sip_item_price
 */
export interface UpdateSipItemPriceResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for update_sip_item_price
 *
 * Update sip item price.
 */
export type UpdateSipItemPriceResponse = FetchResponse<UpdateSipItemPriceResponseData>;
/**
 * UpdateStockSellerStock sub-interface for UpdateStockStock
 */
export interface UpdateStockSellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock: number;
}
/**
 * UpdateStockStock sub-interface for UpdateStockRequest
 */
export interface UpdateStockStock {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * new stock info（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock: UpdateStockSellerStock[];
}
/**
 * Request parameters for update_stock
 *
 * Use this API to update one item_id for each call, but still can support updating multiple model_ids stock of the same item_id (If you need batch modification, please call multiple times)This API will update only "seller_stock".Whenever there is a promotion ongoing or upcoming, the total stock must be larger than or equal to real-time “reserved_stock” promotion stock (Please check v2.get_item_promotion API for more details). Items that are deleted will not be allowed to modify stock.
 */
export interface UpdateStockRequest {
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * Length should be between 1 to 50.
   */
  stock_list: UpdateStockStock[];
}
/**
 * UpdateStockFailure sub-interface for UpdateStockResponseData
 */
export interface UpdateStockFailure {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
}
/**
 * UpdateStockSuccess sub-interface for UpdateStockResponseData
 */
export interface UpdateStockSuccess {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * location id; This field and the stock field are returned in pairs
   */
  location_id?: string;
  /**
   * stock;This field is returned if seller stock is used in the request, and normal stock fields are not returned.
   */
  stock?: number;
}
/**
 * UpdateStockResponseData sub-interface for UpdateStockResponse
 */
export interface UpdateStockResponseData {
  /**
   * Fail model list.
   */
  failure_list?: UpdateStockFailure[];
  /**
   * Success model list.
   */
  success_list?: UpdateStockSuccess[];
}
/**
 * Response payload for update_stock
 *
 * Use this API to update one item_id for each call, but still can support updating multiple model_ids stock of the same item_id (If you need batch modification, please call multiple times)This API will update only "seller_stock".Whenever there is a promotion ongoing or upcoming, the total stock must be larger than or equal to real-time “reserved_stock” promotion stock (Please check v2.get_item_promotion API for more details). Items that are deleted will not be allowed to modify stock.
 */
export type UpdateStockResponse = FetchResponse<UpdateStockResponseData>;
/**
 * UpdateTierVariationModel sub-interface for UpdateTierVariationRequest
 */
export interface UpdateTierVariationModel {
  /**
   * ID of model
   */
  model_id: number;
  /**
   * Model's tier_variation
   */
  tier_index: number[];
}
/**
 * UpdateTierVariationVariationOption sub-interface for UpdateTierVariationStandardiseTierVariation
 */
export interface UpdateTierVariationVariationOption {
  /**
   * standardise tier variation option ID
   */
  variation_option_id: number;
  /**
   * standardise tier variation option value
   */
  variation_option_name?: string;
  /**
   * ID of image
   */
  image_id?: string;
}
/**
 * UpdateTierVariationStandardiseTierVariation sub-interface for UpdateTierVariationRequest
 */
export interface UpdateTierVariationStandardiseTierVariation {
  /**
   * standardise tier variation ID
   */
  variation_id: number;
  /**
   * standardise tier variation name
   */
  variation_name?: string;
  /**
   * standardise tier variation group id
   */
  variation_group_id?: number;
  /**
   * standardise tier variation option list
   */
  variation_option_list: UpdateTierVariationVariationOption[];
}
/**
 * Request parameters for update_tier_variation
 *
 * This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api. More detail please check: https://open.shopee.com/developer-guide/219
 */
export interface UpdateTierVariationRequest {
  /**
   * ID of item.
   */
  item_id: number;
  /**
   * Item's model list
   */
  model_list?: UpdateTierVariationModel[];
  /**
   * item standardise tier variation There is at least one standardise_tier_variation and tier_variation
   */
  standardise_tier_variation?: UpdateTierVariationStandardiseTierVariation[];
}
/**
 * Response data payload for update_tier_variation
 */
export interface UpdateTierVariationResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for update_tier_variation
 *
 * This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api. More detail please check: https://open.shopee.com/developer-guide/219
 */
export type UpdateTierVariationResponse = FetchResponse<UpdateTierVariationResponseData>;
