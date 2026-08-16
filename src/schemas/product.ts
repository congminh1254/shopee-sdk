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
 * Enum generated for field MainComponent
 */
export enum MainComponent {
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
 * AddItem_Dimension sub-interface for AddItemRequest
 */
export interface AddItem_Dimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width?: number;
  [key: string]: any;
}
/**
 * AddItem_LogisticInfo sub-interface for AddItemRequest
 */
export interface AddItem_LogisticInfo {
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
  enabled?: boolean;
  /**
   * ID of the channel
   */
  logistic_id?: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free?: boolean;
  [key: string]: any;
}
/**
 * AddItem_AttributeValue sub-interface for AddItem_Attribute
 */
export interface AddItem_AttributeValue {
  /**
   * Value ID. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Value name. original_value_name from product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * AddItem_Attribute sub-interface for AddItemRequest
 */
export interface AddItem_Attribute {
  /**
   * ID of attribute
   */
  attribute_id?: number;
  attribute_value_list?: AddItem_AttributeValue[];
  [key: string]: any;
}
/**
 * AddItem_Image sub-interface for AddItemRequest
 */
export interface AddItem_Image {
  /**
   * ID of image
   */
  image_id_list?: string[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"only applicable to whitelisted seller.
   */
  image_ratio?: string;
  [key: string]: any;
}
/**
 * AddItem_PreOrder sub-interface for AddItemRequest
 */
export interface AddItem_PreOrder {
  /**
   * Whether item is pre order
   */
  is_pre_order?: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_dts_limit api
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * AddItem_Wholesale sub-interface for AddItemRequest
 */
export interface AddItem_Wholesale {
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
  [key: string]: any;
}
/**
 * AddItem_Brand sub-interface for AddItemRequest
 */
export interface AddItem_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand( No Brand if not brand).
   */
  original_brand_name?: string;
  [key: string]: any;
}
/**
 * AddItem_GroupItemInfo sub-interface for AddItem_TaxInfo
 */
export interface AddItem_GroupItemInfo {
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
  [key: string]: any;
}
/**
 * AddItem_TaxInfo sub-interface for AddItemRequest
 */
export interface AddItem_TaxInfo {
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
  group_item_info?: AddItem_GroupItemInfo;
  /**
   * [BR region]7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
  [key: string]: any;
}
/**
 * AddItem_ComplaintPolicy sub-interface for AddItemRequest
 */
export interface AddItem_ComplaintPolicy {
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
  [key: string]: any;
}
/**
 * AddItem_ImageInfo sub-interface for AddItem_Field
 */
export interface AddItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * AddItem_Field sub-interface for AddItem_ExtendedDescription
 */
export interface AddItem_Field {
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
  image_info?: AddItem_ImageInfo;
  [key: string]: any;
}
/**
 * AddItem_ExtendedDescription sub-interface for AddItem_DescriptionInfo
 */
export interface AddItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: AddItem_Field[];
  [key: string]: any;
}
/**
 * AddItem_DescriptionInfo sub-interface for AddItemRequest
 */
export interface AddItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: AddItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * AddItem_SellerStock sub-interface for AddItemRequest
 */
export interface AddItem_SellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * AddItem_PromotionImage sub-interface for AddItemRequest
 */
export interface AddItem_PromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * AddItem_VehicleInfo sub-interface for AddItem_CompatibilityInfo
 */
export interface AddItem_VehicleInfo {
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
  [key: string]: any;
}
/**
 * AddItem_CompatibilityInfo sub-interface for AddItemRequest
 */
export interface AddItem_CompatibilityInfo {
  vehicle_info_list?: AddItem_VehicleInfo[];
  [key: string]: any;
}
/**
 * AddItem_SizeChartInfo sub-interface for AddItemRequest
 */
export interface AddItem_SizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * AddItem_CertificationProof sub-interface for AddItem_Certification
 */
export interface AddItem_CertificationProof {
  /**
   * The name of the uploaded certification proof file.
   */
  file_name?: string;
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id?: number;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio?: number;
  [key: string]: any;
}
/**
 * AddItem_Certification sub-interface for AddItem_CertificationInfo
 */
export interface AddItem_Certification {
  /**
   * Certification No.
   */
  certification_no?: string;
  /**
   * Permit ID, get from v2.product.get_product_certification_rule
   */
  permit_id?: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs?: AddItem_CertificationProof[];
  [key: string]: any;
}
/**
 * AddItem_CertificationInfo sub-interface for AddItemRequest
 */
export interface AddItem_CertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: AddItem_Certification[];
  [key: string]: any;
}
/**
 * AddItem_MaxPurchaseLimit sub-interface for AddItem_PurchaseLimitInfo
 */
export interface AddItem_MaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * AddItem_PurchaseLimitInfo sub-interface for AddItemRequest
 */
export interface AddItem_PurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: AddItem_MaxPurchaseLimit;
  [key: string]: any;
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
  original_price?: number;
  /**
   * if description_type is normal , Description information should be set by this field.
   */
  description?: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight?: number;
  /**
   * Item name
   */
  item_name?: string;
  /**
   * Item status, could be UNLIST or NORMAL
   */
  item_status?: string;
  /**
   * The dimension of this item.
   */
  dimension?: AddItem_Dimension;
  /**
   * Logistic channel setting
   */
  logistic_info?: AddItem_LogisticInfo[];
  /**
   * This field is optional(expect Indonesia) depending on the specific attribute under different categories. Should call shopee.item.GetAttributes to get attribute first. Must contain all all mandatory attribute.
   */
  attribute_list?: AddItem_Attribute[];
  /**
   * ID of category
   */
  category_id?: number;
  /**
   * Item images
   */
  image?: AddItem_Image;
  /**
   * Pre order setting
   */
  pre_order?: AddItem_PreOrder;
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
  wholesale?: AddItem_Wholesale[];
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  brand?: AddItem_Brand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: AddItem_TaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: AddItem_ComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: AddItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed
   */
  description_type?: string;
  /**
   * seller stock（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: AddItem_SellerStock[];
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
  promotion_images?: AddItem_PromotionImage;
  compatibility_info?: AddItem_CompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: AddItem_SizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: AddItem_CertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: AddItem_PurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
  [key: string]: any;
}
/**
 * AddItem_AddItem_PreOrder sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_PreOrder {
  /**
   * The guaranteed days to ship orders.
   */
  days_to_ship?: number;
  /**
   * Whether this item is pre order
   */
  is_pre_order?: boolean;
  [key: string]: any;
}
/**
 * AddItem_AddItem_Image sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_Image {
  /**
   * ID of image
   */
  image_id_list?: string[];
  /**
   * Display URL of image
   */
  image_url_list?: string[];
  [key: string]: any;
}
/**
 * AddItem_PriceInfo sub-interface for AddItem_Response
 */
export interface AddItem_PriceInfo {
  /**
   * Current price of item
   */
  current_price?: number;
  /**
   * Original price of item
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * AddItem_AddItem_LogisticInfo sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_LogisticInfo {
  /**
   * Size ID
   */
  size_id?: number;
  /**
   * Shipping fee
   */
  shipping_fee?: number;
  /**
   * Whether this channel is enabled for this item
   */
  enabled?: boolean;
  /**
   * Logistic channel ID
   */
  logistic_id?: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free?: boolean;
  [key: string]: any;
}
/**
 * AddItem_AddItem_AttributeValue sub-interface for AddItem_Attribute
 */
export interface AddItem_AddItem_AttributeValue {
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
  [key: string]: any;
}
/**
 * AddItem_VideoInfo sub-interface for AddItem_Response
 */
export interface AddItem_VideoInfo {
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
  [key: string]: any;
}
/**
 * AddItem_AddItem_Wholesale sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_Wholesale {
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
  [key: string]: any;
}
/**
 * AddItem_AddItem_Brand sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_Brand {
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
 * AddItem_AddItem_SellerStock sub-interface for AddItem_Response
 */
export interface AddItem_AddItem_SellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * AddItem_Response sub-interface for AddItemResponse
 */
export interface AddItem_Response {
  /**
   * Description of item
   */
  description?: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight?: number;
  /**
   * Pre order setting
   */
  pre_order?: AddItem_AddItem_PreOrder;
  /**
   * Item name
   */
  item_name?: string;
  /**
   * Item images
   */
  images?: AddItem_AddItem_Image;
  /**
   * Item status
   */
  item_status?: string;
  /**
   * Item price info
   */
  price_info?: AddItem_PriceInfo;
  /**
   * Logistic setting
   */
  logistic_info?: AddItem_AddItem_LogisticInfo[];
  /**
   * Item ID
   */
  item_id?: number;
  /**
   * Item attributes
   */
  attribute?: AddItem_Attribute[];
  /**
   * Category ID
   */
  category_id?: number;
  /**
   * The dimension of this item.
   */
  dimension?: AddItem_Dimension;
  /**
   * Item condition, could be NEW or USED
   */
  condition?: string;
  /**
   * Item video
   */
  video_info?: AddItem_VideoInfo[];
  /**
   * Wholesale setting
   */
  wholesale?: AddItem_AddItem_Wholesale[];
  brand?: AddItem_AddItem_Brand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * New description field. Only whitelist sellers can use it. If item with extended_description this field will return, otherwise do not return.
   */
  description_info?: AddItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * Complaint Policy for item. Only returned for local PL sellers.
   */
  complaint_policy?: AddItem_ComplaintPolicy;
  /**
   * seller stock
   */
  seller_stock?: AddItem_AddItem_SellerStock[];
  [key: string]: any;
}
/**
 * Response data payload for add_item
 */
export type AddItemResponseData = AddItem_Response;
/**
 * Response payload for add_item
 *
 * Add a new item.
 */
export type AddItemResponse = FetchResponse<AddItemResponseData>;
/**
 * AddKitItem_Image sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_Image {
  /**
   * ID of image.
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * AddKitItem_LongImage sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_LongImage {
  /**
   * ID of image.
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * AddKitItem_ImageInfo sub-interface for AddKitItem_Field
 */
export interface AddKitItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * AddKitItem_Field sub-interface for AddKitItem_ExtendedDescription
 */
export interface AddKitItem_Field {
  /**
   * Type of extended description field. See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image, image will be set by this field.
   */
  image_info?: AddKitItem_ImageInfo;
  [key: string]: any;
}
/**
 * AddKitItem_ExtendedDescription sub-interface for AddKitItem_DescriptionInfo
 */
export interface AddKitItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: AddKitItem_Field[];
  [key: string]: any;
}
/**
 * AddKitItem_DescriptionInfo sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: AddKitItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * AddKitItem_LogisticInfo sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_LogisticInfo {
  /**
   * ID of the channel.
   */
  logistic_id?: number;
  /**
   * Whether channel is enabled for this kit item.
   */
  enabled?: boolean;
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
  [key: string]: any;
}
/**
 * AddKitItem_Dimension sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_Dimension {
  /**
   * The length of package for this kit item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this kit item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this kit item, the unit is CM.
   */
  package_height?: number;
  [key: string]: any;
}
/**
 * AddKitItem_PreOrder sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_PreOrder {
  /**
   * Whether kit item is pre order.
   */
  is_pre_order?: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_kit_item_limit api.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * AddKitItem_Component sub-interface for AddKitItem_Model
 */
export interface AddKitItem_Component {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id?: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  /**
   * The amount of the item/model that composes this kit model.
   */
  quantity?: number;
  /**
   * Whether this item/model is the main component for this kit.One kit item can only have one item/model as main component.
   */
  main_component?: MainComponent | string | number;
  [key: string]: any;
}
/**
 * AddKitItem_Model sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_Model {
  /**
   * Tier index of this kit model.
   */
  tier_index?: number[];
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
  component_list?: AddKitItem_Component[];
  [key: string]: any;
}
/**
 * AddKitItem_AddKitItem_Image sub-interface for AddKitItem_Option
 */
export interface AddKitItem_AddKitItem_Image {
  /**
   * ID of image. If you choose to define, you need to define an image for all options.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * AddKitItem_Option sub-interface for AddKitItem_TierVariation
 */
export interface AddKitItem_Option {
  /**
   * Option name.
   */
  option?: string;
  /**
   * Option image.
   */
  image?: AddKitItem_AddKitItem_Image;
  [key: string]: any;
}
/**
 * AddKitItem_TierVariation sub-interface for AddKitItem_ItemSetting
 */
export interface AddKitItem_TierVariation {
  /**
   * Tier variation name.
   */
  name?: string;
  /**
   * Tier variation option info list.
   */
  option_list?: AddKitItem_Option[];
  [key: string]: any;
}
/**
 * AddKitItem_ItemSetting sub-interface for AddKitItemRequest
 */
export interface AddKitItem_ItemSetting {
  /**
   * The name of this kit item.
   */
  item_name?: string;
  /**
   * Item images with 1:1 ratio.
   */
  images?: AddKitItem_Image;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: AddKitItem_LongImage;
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
  description_info?: AddKitItem_DescriptionInfo;
  /**
   * See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed.
   */
  description_type?: string;
  /**
   * Logistic channel setting.
   */
  logistic_info?: AddKitItem_LogisticInfo[];
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
  dimension?: AddKitItem_Dimension;
  /**
   * Pre order setting.
   */
  pre_order?: AddKitItem_PreOrder;
  /**
   * Model info list, model number at most 9.
   */
  model_list?: AddKitItem_Model[];
  /**
   * Tier variation info list. Only support one tier variation, and each kit item can have from 1 to 9 kit variations.
   */
  tier_variation_list?: AddKitItem_TierVariation[];
  [key: string]: any;
}
/**
 * AddKitItem_SyncSetting sub-interface for AddKitItemRequest
 */
export interface AddKitItem_SyncSetting {
  /**
   * Auto sync the pre_order setting from main component or not.
   */
  auto_sync_dts?: boolean;
  [key: string]: any;
}
/**
 * Request parameters for add_kit_item
 *
 * Create the kit item by selecting multiple items and setting main component and quantity per kit.
 */
export interface AddKitItemRequest {
  item_setting?: AddKitItem_ItemSetting;
  sync_setting?: AddKitItem_SyncSetting;
  [key: string]: any;
}
/**
 * AddKitItem_Response sub-interface for AddKitItemResponse
 */
export interface AddKitItem_Response {
  item_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_kit_item
 */
export type AddKitItemResponseData = AddKitItem_Response;
/**
 * Response payload for add_kit_item
 *
 * Create the kit item by selecting multiple items and setting main component and quantity per kit.
 */
export type AddKitItemResponse = FetchResponse<AddKitItemResponseData>;
/**
 * AddModel_SellerStock sub-interface for AddModel_Model
 */
export interface AddModel_SellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * AddModel_Dimension sub-interface for AddModel_Model
 */
export interface AddModel_Dimension {
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
  [key: string]: any;
}
/**
 * AddModel_PreOrder sub-interface for AddModel_Model
 */
export interface AddModel_PreOrder {
  /**
   * Whether the model is pre order.
   */
  is_pre_order?: boolean;
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * AddModel_Model sub-interface for AddModelRequest
 */
export interface AddModel_Model {
  /**
   * Tier index of model
   */
  tier_index?: number[];
  /**
   * Normal stock for price
   */
  original_price?: number;
  /**
   * Seller sku, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * new stock info for model（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: AddModel_SellerStock[];
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
  dimension?: AddModel_Dimension;
  /**
   * Pre-order information of this model.Notes: If don't set the DTS of this model, will use the DTS of the item by default.
   */
  pre_order?: AddModel_PreOrder;
  [key: string]: any;
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
  item_id?: number;
  /**
   * Model list
   */
  model_list?: AddModel_Model[];
  [key: string]: any;
}
/**
 * AddModel_PriceInfo sub-interface for AddModel_AddModel_Model
 */
export interface AddModel_PriceInfo {
  /**
   * Original Price.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * AddModel_AddModel_SellerStock sub-interface for AddModel_AddModel_Model
 */
export interface AddModel_AddModel_SellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * AddModel_AddModel_Dimension sub-interface for AddModel_AddModel_Model
 */
export interface AddModel_AddModel_Dimension {
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
  [key: string]: any;
}
/**
 * AddModel_AddModel_Model sub-interface for AddModel_Response
 */
export interface AddModel_AddModel_Model {
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
  price_info?: AddModel_PriceInfo[];
  /**
   * new stock info
   */
  seller_stock?: AddModel_AddModel_SellerStock[];
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: AddModel_AddModel_Dimension;
  [key: string]: any;
}
/**
 * AddModel_Response sub-interface for AddModelResponse
 */
export interface AddModel_Response {
  model?: AddModel_AddModel_Model[];
  [key: string]: any;
}
/**
 * Response data payload for add_model
 */
export type AddModelResponseData = AddModel_Response;
/**
 * Response payload for add_model
 *
 * Add model. More detail please check: https://open.shopee.com/developer-guide/219
 */
export type AddModelResponse = FetchResponse<AddModelResponseData>;
/**
 * BatchAddItem_Dimension sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_Dimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_LogisticInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_LogisticInfo {
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
  enabled?: boolean;
  /**
   * ID of the channel
   */
  logistic_id?: number;
  /**
   * Whether cover shipping fee for buyer
   */
  is_free?: boolean;
  [key: string]: any;
}
/**
 * BatchAddItem_AttributeValue sub-interface for BatchAddItem_Attribute
 */
export interface BatchAddItem_AttributeValue {
  /**
   * Value ID. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Value name. original_value_name from product.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * BatchAddItem_Attribute sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_Attribute {
  /**
   * ID of attribute
   */
  attribute_id?: number;
  attribute_value_list?: BatchAddItem_AttributeValue[];
  [key: string]: any;
}
/**
 * BatchAddItem_Image sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_Image {
  /**
   * ID of image
   */
  image_id_list?: string[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"only applicable to whitelisted seller.
   */
  image_ratio?: string;
  [key: string]: any;
}
/**
 * BatchAddItem_PreOrder sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_PreOrder {
  /**
   * Whether item is pre order
   */
  is_pre_order?: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_dts_limit api
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_Wholesale sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_Wholesale {
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
  [key: string]: any;
}
/**
 * BatchAddItem_Brand sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_Brand {
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Original name of brand( No Brand if not brand).
   */
  original_brand_name?: string;
  [key: string]: any;
}
/**
 * BatchAddItem_GroupItemInfo sub-interface for BatchAddItem_TaxInfo
 */
export interface BatchAddItem_GroupItemInfo {
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
  [key: string]: any;
}
/**
 * BatchAddItem_TaxInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_TaxInfo {
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
  group_item_info?: BatchAddItem_GroupItemInfo;
  /**
   * [BR region]7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
  [key: string]: any;
}
/**
 * BatchAddItem_ComplaintPolicy sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_ComplaintPolicy {
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
  [key: string]: any;
}
/**
 * BatchAddItem_ImageInfo sub-interface for BatchAddItem_Field
 */
export interface BatchAddItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * BatchAddItem_Field sub-interface for BatchAddItem_ExtendedDescription
 */
export interface BatchAddItem_Field {
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
  image_info?: BatchAddItem_ImageInfo;
  [key: string]: any;
}
/**
 * BatchAddItem_ExtendedDescription sub-interface for BatchAddItem_DescriptionInfo
 */
export interface BatchAddItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: BatchAddItem_Field[];
  [key: string]: any;
}
/**
 * BatchAddItem_DescriptionInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: BatchAddItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * BatchAddItem_SellerStock sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_SellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_PromotionImage sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_PromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * BatchAddItem_VehicleInfo sub-interface for BatchAddItem_CompatibilityInfo
 */
export interface BatchAddItem_VehicleInfo {
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
  [key: string]: any;
}
/**
 * BatchAddItem_CompatibilityInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_CompatibilityInfo {
  vehicle_info_list?: BatchAddItem_VehicleInfo[];
  [key: string]: any;
}
/**
 * BatchAddItem_SizeChartInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_SizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0. You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_CertificationProof sub-interface for BatchAddItem_Certification
 */
export interface BatchAddItem_CertificationProof {
  /**
   * The name of the uploaded certification proof file.
   */
  file_name?: string;
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id?: number;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_Certification sub-interface for BatchAddItem_CertificationInfo
 */
export interface BatchAddItem_Certification {
  /**
   * Certification No.
   */
  certification_no?: string;
  /**
   * Permit ID, get from v2.product.get_product_certification_rule
   */
  permit_id?: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs?: BatchAddItem_CertificationProof[];
  [key: string]: any;
}
/**
 * BatchAddItem_CertificationInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_CertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: BatchAddItem_Certification[];
  [key: string]: any;
}
/**
 * BatchAddItem_MaxPurchaseLimit sub-interface for BatchAddItem_PurchaseLimitInfo
 */
export interface BatchAddItem_MaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * BatchAddItem_PurchaseLimitInfo sub-interface for BatchAddItem_Item
 */
export interface BatchAddItem_PurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: BatchAddItem_MaxPurchaseLimit;
  [key: string]: any;
}
/**
 * BatchAddItem_Item sub-interface for BatchAddItemRequest
 */
export interface BatchAddItem_Item {
  /**
   * Item price
   */
  original_price?: number;
  /**
   * if description_type is normal , Description information should be set by this field.
   */
  description?: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight?: number;
  /**
   * Item name
   */
  item_name?: string;
  /**
   * Item status, could be UNLIST or NORMAL
   */
  item_status?: string;
  /**
   * The dimension of this item.
   */
  dimension?: BatchAddItem_Dimension;
  /**
   * Logistic channel setting
   */
  logistic_info?: BatchAddItem_LogisticInfo[];
  /**
   * This field is optional(expect Indonesia) depending on the specific attribute under different categories. Should call shopee.item.GetAttributes to get attribute first. Must contain all all mandatory attribute.
   */
  attribute_list?: BatchAddItem_Attribute[];
  /**
   * ID of category
   */
  category_id?: number;
  /**
   * Item images
   */
  image?: BatchAddItem_Image;
  /**
   * Pre order setting
   */
  pre_order?: BatchAddItem_PreOrder;
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
  wholesale?: BatchAddItem_Wholesale[];
  /**
   * Video upload ID returned from video uploading API. Only accept one video_upload_id.
   */
  video_upload_id?: string[];
  brand?: BatchAddItem_Brand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: BatchAddItem_TaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: BatchAddItem_ComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: BatchAddItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed
   */
  description_type?: string;
  /**
   * seller stock（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: BatchAddItem_SellerStock[];
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
  promotion_images?: BatchAddItem_PromotionImage;
  compatibility_info?: BatchAddItem_CompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: BatchAddItem_SizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: BatchAddItem_CertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: BatchAddItem_PurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
  [key: string]: any;
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
  item_list?: BatchAddItem_Item[];
  [key: string]: any;
}
/**
 * BatchAddItem_Response sub-interface for BatchAddItemResponse
 */
export interface BatchAddItem_Response {
  /**
   * The task ID of the batch add item task.
   */
  task_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for batch_add_item
 */
export type BatchAddItemResponseData = BatchAddItem_Response;
/**
 * Response payload for batch_add_item
 *
 * Create asynchronous task to batch add item
 */
export type BatchAddItemResponse = FetchResponse<BatchAddItemResponseData>;
/**
 * BatchPublishItemToOutletShop_SellerStock sub-interface for BatchPublishItemToOutletShop_Model
 */
export interface BatchPublishItemToOutletShop_SellerStock {
  /**
   * The location ID.
   */
  location_id?: string;
  /**
   * The stock quantity of the location.
   */
  stock?: number;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_PreOrder sub-interface for BatchPublishItemToOutletShop_Model
 */
export interface BatchPublishItemToOutletShop_PreOrder {
  /**
   * Indicate whether the model is pre-order.
   */
  is_pre_order?: boolean;
  /**
   * The days to ship for pre-order model.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_Model sub-interface for BatchPublishItemToOutletShop_PublishItem
 */
export interface BatchPublishItemToOutletShop_Model {
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
  seller_stock?: BatchPublishItemToOutletShop_SellerStock[];
  /**
   * The pre-order setting of the model.
   */
  pre_order?: BatchPublishItemToOutletShop_PreOrder;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_LogisticInfo sub-interface for BatchPublishItemToOutletShop_PublishItem
 */
export interface BatchPublishItemToOutletShop_LogisticInfo {
  /**
   * The logistics channel ID used for shipping the item.
   */
  logistic_id?: number;
  /**
   * Indicates whether the logistics channel is enabled for the item.
   */
  enabled?: boolean;
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
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_MaxPurchaseLimit sub-interface for BatchPublishItemToOutletShop_PurchaseLimitInfo
 */
export interface BatchPublishItemToOutletShop_MaxPurchaseLimit {
  /**
   * The maximum quantity that a buyer is allowed to purchase per order.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_PurchaseLimitInfo sub-interface for BatchPublishItemToOutletShop_PublishItem
 */
export interface BatchPublishItemToOutletShop_PurchaseLimitInfo {
  /**
   * The minimum quantity that a buyer is allowed to purchase per order.
   */
  min_purchase_limit?: number;
  /**
   * The maximum purchase quantity configuration for the item.
   */
  max_purchase_limit?: BatchPublishItemToOutletShop_MaxPurchaseLimit;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_PublishItem sub-interface for BatchPublishItemToOutletShop_Item
 */
export interface BatchPublishItemToOutletShop_PublishItem {
  /**
   * The item ID of the item in the Outlet shop.
   */
  outlet_item_id?: number;
  /**
   * The outlet model list.
   */
  model?: BatchPublishItemToOutletShop_Model[];
  /**
   * The logistic information of the outlet item.
   */
  logistic_info?: BatchPublishItemToOutletShop_LogisticInfo[];
  /**
   * The purchase limit information of the outlet item.
   */
  purchase_limit_info?: BatchPublishItemToOutletShop_PurchaseLimitInfo;
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_Item sub-interface for BatchPublishItemToOutletShopRequest
 */
export interface BatchPublishItemToOutletShop_Item {
  /**
   * The item ID of the item in the Mart shop.
   */
  mart_item_id?: number;
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id?: number;
  /**
   * The outlet item data to publish.
   */
  publish_item?: BatchPublishItemToOutletShop_PublishItem;
  [key: string]: any;
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
  item_list?: BatchPublishItemToOutletShop_Item[];
  [key: string]: any;
}
/**
 * BatchPublishItemToOutletShop_Response sub-interface for BatchPublishItemToOutletShopResponse
 */
export interface BatchPublishItemToOutletShop_Response {
  /**
   * The task ID of the batch publish outlet item task.
   */
  task_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for batch_publish_item_to_outlet_shop
 */
export type BatchPublishItemToOutletShopResponseData = BatchPublishItemToOutletShop_Response;
/**
 * Response payload for batch_publish_item_to_outlet_shop
 *
 * Create asynchronous task to batch publish outlet item
 */
export type BatchPublishItemToOutletShopResponse =
  FetchResponse<BatchPublishItemToOutletShopResponseData>;
/**
 * BatchUpdateOutletPrice_Price sub-interface for BatchUpdateOutletPrice_Item
 */
export interface BatchUpdateOutletPrice_Price {
  /**
   * The model ID of the product. Empty for item without model.
   */
  model_id?: number;
  /**
   * The original price to update. The value must be greater than 0.
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * BatchUpdateOutletPrice_Item sub-interface for BatchUpdateOutletPriceRequest
 */
export interface BatchUpdateOutletPrice_Item {
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id?: number;
  /**
   * The item ID of the item in the Outlet shop.
   */
  item_id?: number;
  /**
   * The price list of item models. The list size must be at least 1.
   */
  price_list?: BatchUpdateOutletPrice_Price[];
  [key: string]: any;
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
  item_list?: BatchUpdateOutletPrice_Item[];
  [key: string]: any;
}
/**
 * BatchUpdateOutletPrice_Response sub-interface for BatchUpdateOutletPriceResponse
 */
export interface BatchUpdateOutletPrice_Response {
  /**
   * The task ID of the batch update price task.
   */
  task_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for batch_update_outlet_price
 */
export type BatchUpdateOutletPriceResponseData = BatchUpdateOutletPrice_Response;
/**
 * Response payload for batch_update_outlet_price
 *
 * Create asynchronous task to batch update outlet item's price
 */
export type BatchUpdateOutletPriceResponse = FetchResponse<BatchUpdateOutletPriceResponseData>;
/**
 * BatchUpdateOutletStock_SellerStock sub-interface for BatchUpdateOutletStock_Stock
 */
export interface BatchUpdateOutletStock_SellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * The stock quantity of the location.
   */
  stock?: number;
  [key: string]: any;
}
/**
 * BatchUpdateOutletStock_Stock sub-interface for BatchUpdateOutletStock_Item
 */
export interface BatchUpdateOutletStock_Stock {
  /**
   * The model ID of the product. Empty for item without model.
   */
  model_id?: number;
  /**
   * The seller stock by location.
   */
  seller_stock?: BatchUpdateOutletStock_SellerStock[];
  [key: string]: any;
}
/**
 * BatchUpdateOutletStock_Item sub-interface for BatchUpdateOutletStockRequest
 */
export interface BatchUpdateOutletStock_Item {
  /**
   * The shop ID of the Outlet shop.
   */
  outlet_shop_id?: number;
  /**
   * The item ID of the item in the Outlet shop.
   */
  item_id?: number;
  /**
   * The stock list of item models. The list size must be at least 1.
   */
  stock_list?: BatchUpdateOutletStock_Stock[];
  [key: string]: any;
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
  item_list?: BatchUpdateOutletStock_Item[];
  [key: string]: any;
}
/**
 * BatchUpdateOutletStock_Response sub-interface for BatchUpdateOutletStockResponse
 */
export interface BatchUpdateOutletStock_Response {
  /**
   * The task ID of the batch update stock task.
   */
  task_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for batch_update_outlet_stock
 */
export type BatchUpdateOutletStockResponseData = BatchUpdateOutletStock_Response;
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
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * BoostItem_Failure sub-interface for BoostItem_Response
 */
export interface BoostItem_Failure {
  /**
   * Failed item ID.
   */
  item_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * BoostItem_Success sub-interface for BoostItem_Response
 */
export interface BoostItem_Success {
  /**
   * Success item ID.
   */
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * BoostItem_Response sub-interface for BoostItemResponse
 */
export interface BoostItem_Response {
  failure_list?: BoostItem_Failure[];
  success_list?: BoostItem_Success[];
  [key: string]: any;
}
/**
 * Response data payload for boost_item
 */
export type BoostItemResponseData = BoostItem_Response;
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
  item_name?: string;
  /**
   * Please use the image id returned by v2.media_space.upload_image api, we will ignore if this field is empty string
   */
  product_cover_image?: string;
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
  item_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_item
 */
export interface DeleteItemResponseData {
  /**
   * Indicate waring details if hit waring. Empty if no waring happened.
   */
  warning?: string;
  [key: string]: any;
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
  item_id?: number;
  /**
   * ID of model.
   */
  model_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_model
 */
export interface DeleteModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for delete_model
 *
 * Delete item model.
 */
export type DeleteModelResponse = FetchResponse<DeleteModelResponseData>;
/**
 * GenerateKitImage_Component sub-interface for GenerateKitImageRequest
 */
export interface GenerateKitImage_Component {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id?: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  [key: string]: any;
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
  component_list?: GenerateKitImage_Component[];
  [key: string]: any;
}
/**
 * GenerateKitImage_Response sub-interface for GenerateKitImageResponse
 */
export interface GenerateKitImage_Response {
  /**
   * generated kit image
   */
  kit_image?: string;
  [key: string]: any;
}
/**
 * Response data payload for generate_kit_image
 */
export type GenerateKitImageResponseData = GenerateKitImage_Response;
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
  pitem_id?: number;
  [key: string]: any;
}
/**
 * GetAitemByPitemId_ModelMapping sub-interface for GetAitemByPitemId_Aitem
 */
export interface GetAitemByPitemId_ModelMapping {
  /**
   * ID of model for the P Item.
   */
  pmodel_id?: number;
  /**
   * ID of model for the A Item.
   */
  amodel_id?: number;
  [key: string]: any;
}
/**
 * GetAitemByPitemId_Aitem sub-interface for GetAitemByPitemId_Response
 */
export interface GetAitemByPitemId_Aitem {
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
  model_mapping_list?: GetAitemByPitemId_ModelMapping[];
  [key: string]: any;
}
/**
 * GetAitemByPitemId_Response sub-interface for GetAitemByPitemIdResponse
 */
export interface GetAitemByPitemId_Response {
  aitem_list?: GetAitemByPitemId_Aitem[];
  [key: string]: any;
}
/**
 * Response data payload for get_aitem_by_pitem_id
 */
export type GetAitemByPitemIdResponseData = GetAitemByPitemId_Response;
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
  page_size?: number;
  /**
   * Specifies the starting entry of data to return in the current call. Default is 0, if data is more than one page, the offset can be some entry to start next call.
   */
  offset?: number;
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ; BR: en / pt-br ; MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL. Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data
   */
  language?: Language | string | number;
  [key: string]: any;
}
/**
 * GetAllVehicleList_Vehicle sub-interface for GetAllVehicleList_Response
 */
export interface GetAllVehicleList_Vehicle {
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
  [key: string]: any;
}
/**
 * GetAllVehicleList_Response sub-interface for GetAllVehicleListResponse
 */
export interface GetAllVehicleList_Response {
  vehicle_list?: GetAllVehicleList_Vehicle[];
  /**
   * This is to indicate whether the item list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of items.
   */
  has_next_page?: boolean;
  /**
   * If has_next_page is true, this value need set to next request offset
   */
  next_offset?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_all_vehicle_list
 */
export type GetAllVehicleListResponseData = GetAllVehicleList_Response;
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
  category_id_list?: number[];
  /**
   * LanguageSupport Lanuage:"SG": [        "en",        "zh-Hans",        "ms"      ], "MY": [        "en",        "zh-Hans",        "ms"      ], "PH": [        "en",        "zh-Hans"      ], "VN": [        "vn",        "en"      ], "ID": [        "id",        "en"      ], "TH": [        "th",        "en"      ], "BR": [        "pt-BR",        "en"      ], "MX": [        "es-MX",        "en"      ], "CO": [        "es-CO",        "en"      ], "CL": [        "es-CL",        "en"      ], "TW": [        "zh-Hant",        "zh-Hans",        "en"      ],"IN": [        "en",        "hi"      ]
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
   * Translate results for display
   */
  multi_lang?: GetAttributeTree_MultiLang[];
  [key: string]: any;
}
/**
 * GetAttributeTree_AttributeInfo sub-interface for GetAttributeTree_AttributeTree
 */
export interface GetAttributeTree_AttributeInfo {
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
   * Attribute translate info
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
  task_type?: number;
  /**
   * The task ID to query.
   */
  task_id?: number;
  [key: string]: any;
}
/**
 * GetBatchTaskResult_Success sub-interface for GetBatchTaskResult_Response
 */
export interface GetBatchTaskResult_Success {
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
  [key: string]: any;
}
/**
 * GetBatchTaskResult_Failed sub-interface for GetBatchTaskResult_Response
 */
export interface GetBatchTaskResult_Failed {
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
  [key: string]: any;
}
/**
 * GetBatchTaskResult_Response sub-interface for GetBatchTaskResultResponse
 */
export interface GetBatchTaskResult_Response {
  /**
   * The publish status. 1: ongoing; 2: finished.
   */
  publish_status?: number;
  /**
   * The batch task success records.
   */
  success_list?: GetBatchTaskResult_Success[];
  /**
   * The batch task failed records.
   */
  failed_list?: GetBatchTaskResult_Failed[];
  [key: string]: any;
}
/**
 * Response data payload for get_batch_task_result
 */
export type GetBatchTaskResultResponseData = GetBatchTaskResult_Response;
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
 * GetBoostedList_Item sub-interface for GetBoostedList_Response
 */
export interface GetBoostedList_Item {
  /**
   * Shopee's unique identifier for an item
   */
  item_id?: number;
  /**
   * Remain cool down time
   */
  cool_down_second?: number;
  [key: string]: any;
}
/**
 * GetBoostedList_Response sub-interface for GetBoostedListResponse
 */
export interface GetBoostedList_Response {
  item_list?: GetBoostedList_Item[];
  [key: string]: any;
}
/**
 * Response data payload for get_boosted_list
 */
export type GetBoostedListResponseData = GetBoostedList_Response;
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
  offset?: number;
  /**
   * the size of one page.Max=100
   */
  page_size?: number;
  /**
   * ID of category.
   */
  category_id?: number;
  /**
   * Brand status , 1: normal brand, 2: pending brand
   */
  status?: number;
  /**
   * If language is not uploaded, the default language=en, the following are the languages supported by different markets SG: en ; MY: en / ms-my / zh-hans ; TH: en / th ; VN: en / vi ; PH: en ; TW: en / zh-hant ; ID: en / id ;  BR: en / pt-br ;  MX: en / es-mx ; CO: en/es-CO ; CL: en/es-CL. Note: For markets that have already launched global tree, Crossboard shop only support returning en and zh-hans language data
   */
  language?: Language | string | number;
  [key: string]: any;
}
/**
 * GetBrandList_Brand sub-interface for GetBrandList_Response
 */
export interface GetBrandList_Brand {
  /**
   * Original name of brand
   */
  original_brand_name?: string;
  brand_id?: number;
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
  cursor?: string;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call). This integer value is used to specify the maximum number of entries to return in a single "page" of data. The limit of page_size if between 1 and 100.
   */
  page_size?: number;
  [key: string]: any;
}
/**
 * GetComment_CommentReply sub-interface for GetComment_ItemComment
 */
export interface GetComment_CommentReply {
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
  [key: string]: any;
}
/**
 * GetComment_Media sub-interface for GetComment_ItemComment
 */
export interface GetComment_Media {
  /**
   * List of image url uploaded by the buyer in the comment.
   */
  image_url_list?: string[];
  /**
   * List of video url uploaded by the buyer in the comment.
   */
  video_url_list?: string[];
  [key: string]: any;
}
/**
 * GetComment_ItemComment sub-interface for GetComment_Response
 */
export interface GetComment_ItemComment {
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
  comment_reply?: GetComment_CommentReply;
  /**
   * List of model id of the buyer's purchase corresponding to the comment.
   */
  model_id_list?: number[];
  media?: GetComment_Media;
  [key: string]: any;
}
/**
 * GetComment_Response sub-interface for GetCommentResponse
 */
export interface GetComment_Response {
  /**
   * This is to indicate whether the comment list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of comments. But only respond 500 comments at most through OpenAPI, if there are more than 500, this field "more" also respond "true".
   */
  more?: boolean;
  /**
   * The comment data list of the items.
   */
  item_comment_list?: GetComment_ItemComment[];
  /**
   * If more is true, you should pass the next_cursor in the next request as cursor. The value of next_cursor will be empty string when more is false.
   */
  next_cursor?: string;
  [key: string]: any;
}
/**
 * Response data payload for get_comment
 */
export type GetCommentResponseData = GetComment_Response;
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
  main_item_id?: number[];
  [key: string]: any;
}
/**
 * GetDirectItemList_DirectItem sub-interface for GetDirectItemList_List
 */
export interface GetDirectItemList_DirectItem {
  /**
   * Id of direct shop.
   */
  direct_shop_id?: number;
  /**
   * Item id of direct shop.
   */
  direct_item_id?: number;
  [key: string]: any;
}
/**
 * GetDirectItemList_List sub-interface for GetDirectItemList_Response
 */
export interface GetDirectItemList_List {
  /**
   * Item id of main shop.
   */
  main_item_id?: number;
  direct_item_list?: GetDirectItemList_DirectItem[];
  [key: string]: any;
}
/**
 * GetDirectItemList_Response sub-interface for GetDirectItemListResponse
 */
export interface GetDirectItemList_Response {
  list?: GetDirectItemList_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_direct_item_list
 */
export type GetDirectItemListResponseData = GetDirectItemList_Response;
/**
 * Response payload for get_direct_item_list
 *
 * get direct item by main item.
 */
export type GetDirectItemListResponse = FetchResponse<GetDirectItemListResponseData>;
/**
 * GetDirectShopRecommendedPrice_Model sub-interface for GetDirectShopRecommendedPriceRequest
 */
export interface GetDirectShopRecommendedPrice_Model {
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
  [key: string]: any;
}
/**
 * Request parameters for get_direct_shop_recommended_price
 *
 * get recommend price for direct shop.
 */
export interface GetDirectShopRecommendedPriceRequest {
  main_item_id?: number;
  /**
   * Direct shop regions.
   */
  direct_shop_regions?: string[];
  /**
   * Main_item's category.
   */
  category_id?: number;
  /**
   * Main model model info.
   */
  model_list?: GetDirectShopRecommendedPrice_Model[];
  /**
   * direct shop enabled channel
   */
  enabled_channel_id_list?: number[];
  [key: string]: any;
}
/**
 * GetDirectShopRecommendedPrice_ItemModelPrice sub-interface for GetDirectShopRecommendedPrice_DirectItemPrice
 */
export interface GetDirectShopRecommendedPrice_ItemModelPrice {
  /**
   * Id of main model.
   */
  model_id?: number;
  /**
   * Tier index of main model. Index starts from 0.
   */
  tier_index?: number[];
  price?: number;
  [key: string]: any;
}
/**
 * GetDirectShopRecommendedPrice_DirectItemPrice sub-interface for GetDirectShopRecommendedPrice_Response
 */
export interface GetDirectShopRecommendedPrice_DirectItemPrice {
  /**
   * Id of direct shop.
   */
  shop_id?: number;
  /**
   * Region of direct shop.
   */
  region?: string;
  hidden_price?: number;
  item_model_price_list?: GetDirectShopRecommendedPrice_ItemModelPrice[];
  [key: string]: any;
}
/**
 * GetDirectShopRecommendedPrice_Response sub-interface for GetDirectShopRecommendedPriceResponse
 */
export interface GetDirectShopRecommendedPrice_Response {
  direct_item_price?: GetDirectShopRecommendedPrice_DirectItemPrice[];
  [key: string]: any;
}
/**
 * Response data payload for get_direct_shop_recommended_price
 */
export type GetDirectShopRecommendedPriceResponseData = GetDirectShopRecommendedPrice_Response;
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
  item_id_list?: number[];
  /**
   * if true will response tax_info
   */
  need_tax_info?: boolean;
  /**
   * if true will response complaint_policy
   */
  need_complaint_policy?: boolean;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_AttributeValue sub-interface for GetItemBaseInfo_Attribute
 */
export interface GetItemBaseInfo_AttributeValue {
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
 * GetItemBaseInfo_Attribute sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Attribute {
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
  attribute_value_list?: GetItemBaseInfo_AttributeValue[];
  [key: string]: any;
}
/**
 * GetItemBaseInfo_PriceInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_PriceInfo {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Image sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Image {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Dimension sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Dimension {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_LogisticInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_LogisticInfo {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_PreOrder sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_PreOrder {
  /**
   * Pre-order will be set true.
   */
  is_pre_order?: boolean;
  /**
   * The days to ship. Only work for pre-orde.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Wholesale sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Wholesale {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_VideoInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_VideoInfo {
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
 * GetItemBaseInfo_Brand sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Brand {
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
 * GetItemBaseInfo_PromotionImage sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_PromotionImage {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_VehicleInfo sub-interface for GetItemBaseInfo_CompatibilityInfo
 */
export interface GetItemBaseInfo_VehicleInfo {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_CompatibilityInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_CompatibilityInfo {
  vehicle_info_list?: GetItemBaseInfo_VehicleInfo[];
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Tag sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_Tag {
  /**
   * Indicate if the item is kit item.
   */
  kit?: boolean;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_MaxPurchaseLimit sub-interface for GetItemBaseInfo_PurchaseLimitInfo
 */
export interface GetItemBaseInfo_MaxPurchaseLimit {
  /**
   * maximum purchase limit for each order
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_PurchaseLimitInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_PurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: GetItemBaseInfo_MaxPurchaseLimit;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_CertificationProof sub-interface for GetItemBaseInfo_Certification
 */
export interface GetItemBaseInfo_CertificationProof {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Certification sub-interface for GetItemBaseInfo_CertificationInfo
 */
export interface GetItemBaseInfo_Certification {
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
  certification_proofs?: GetItemBaseInfo_CertificationProof[];
  [key: string]: any;
}
/**
 * GetItemBaseInfo_CertificationInfo sub-interface for GetItemBaseInfo_Item
 */
export interface GetItemBaseInfo_CertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: GetItemBaseInfo_Certification[];
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Item sub-interface for GetItemBaseInfo_Response
 */
export interface GetItemBaseInfo_Item {
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
  attribute_list?: GetItemBaseInfo_Attribute[];
  /**
   * If the item has models, price_info will not be returned. Please get the price of each model through the get_model_list api
   */
  price_info?: GetItemBaseInfo_PriceInfo[];
  image?: GetItemBaseInfo_Image;
  /**
   * The weight of this item, the unit is KG.If set the weight of models under this item, will return the max weight of all models during the switching period to ensure system compatibility, please switch to call v2.product.get_model_list to get the weight of models.
   */
  weight?: string;
  /**
   * The dimension of this item.If set the dimension of models under this item, will return the dimension with largest volume calculated by height*length*width during the switching period to ensure system compatibility, please switch to call v2.product.get_model_list to get the dimension of models.
   */
  dimension?: GetItemBaseInfo_Dimension;
  /**
   * The logistics list.
   */
  logistic_info?: GetItemBaseInfo_LogisticInfo[];
  pre_order?: GetItemBaseInfo_PreOrder;
  /**
   * The wholesales tier list.
   */
  wholesales?: GetItemBaseInfo_Wholesale[];
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
  video_info?: GetItemBaseInfo_VideoInfo[];
  brand?: GetItemBaseInfo_Brand;
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
  promotion_image?: GetItemBaseInfo_PromotionImage;
  compatibility_info?: GetItemBaseInfo_CompatibilityInfo;
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
  tag?: GetItemBaseInfo_Tag;
  /**
   * purchase limit info
   */
  purchase_limit_info?: GetItemBaseInfo_PurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine.
   */
  medicine_id?: number;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: GetItemBaseInfo_CertificationInfo;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_ComplaintPolicy sub-interface for GetItemBaseInfo_Response
 */
export interface GetItemBaseInfo_ComplaintPolicy {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_GroupItemInfo sub-interface for GetItemBaseInfo_TaxInfo
 */
export interface GetItemBaseInfo_GroupItemInfo {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_TaxInfo sub-interface for GetItemBaseInfo_Response
 */
export interface GetItemBaseInfo_TaxInfo {
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
  group_item_info?: GetItemBaseInfo_GroupItemInfo;
  /**
   * 7101 - for sales of self-produced goods7102 - resale of third-party goodsa tax code used in Brazil to classify and identify the nature of goods or services transactions for tax purposes. This is used for goods export to other counties
   */
  export_cfop?: string;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_ImageInfo sub-interface for GetItemBaseInfo_Field
 */
export interface GetItemBaseInfo_ImageInfo {
  /**
   * Image id
   */
  image_id?: string;
  /**
   * Image url.
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Field sub-interface for GetItemBaseInfo_ExtendedDescription
 */
export interface GetItemBaseInfo_Field {
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
  image_info?: GetItemBaseInfo_ImageInfo;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_ExtendedDescription sub-interface for GetItemBaseInfo_DescriptionInfo
 */
export interface GetItemBaseInfo_ExtendedDescription {
  /**
   * Field of extended description
   */
  field_list?: GetItemBaseInfo_Field[];
  [key: string]: any;
}
/**
 * GetItemBaseInfo_DescriptionInfo sub-interface for GetItemBaseInfo_Response
 */
export interface GetItemBaseInfo_DescriptionInfo {
  /**
   * If description_type is extended , Description information will be returned through this field.
   */
  extended_description?: GetItemBaseInfo_ExtendedDescription;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_SummaryInfo sub-interface for GetItemBaseInfo_StockInfoV2
 */
export interface GetItemBaseInfo_SummaryInfo {
  /**
   * Stock reserved for promotion.Note: For SIP P Item, will return the total reserved stock for P Item and all A Items under the P Item;
   */
  total_reserved_stock?: number;
  /**
   * total available stock
   */
  total_available_stock?: number;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_SellerStock sub-interface for GetItemBaseInfo_StockInfoV2
 */
export interface GetItemBaseInfo_SellerStock {
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
  [key: string]: any;
}
/**
 * GetItemBaseInfo_ShopeeStock sub-interface for GetItemBaseInfo_StockInfoV2
 */
export interface GetItemBaseInfo_ShopeeStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock in the current warehouse
   */
  stock?: number;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_AdvanceStock sub-interface for GetItemBaseInfo_StockInfoV2
 */
export interface GetItemBaseInfo_AdvanceStock {
  /**
   * Refers to Advance Fulfillment stock that Seller has shipped out and is available to be used to fulfill an order.
   */
  sellable_advance_stock?: number;
  /**
   * Refers to Advance Fulfillment stock that seller has shipped out and is still in transit and unavailable to be used to fulfill an order.
   */
  in_transit_advance_stock?: number;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_StockInfoV2 sub-interface for GetItemBaseInfo_Response
 */
export interface GetItemBaseInfo_StockInfoV2 {
  /**
   * stock summary info
   */
  summary_info?: GetItemBaseInfo_SummaryInfo;
  /**
   * seller stock
   */
  seller_stock?: GetItemBaseInfo_SellerStock[];
  /**
   * shopee stock
   */
  shopee_stock?: GetItemBaseInfo_ShopeeStock[];
  /**
   * Only for PH/VN/ID/MY local selected shops.
   */
  advance_stock?: GetItemBaseInfo_AdvanceStock;
  [key: string]: any;
}
/**
 * GetItemBaseInfo_Response sub-interface for GetItemBaseInfoResponse
 */
export interface GetItemBaseInfo_Response {
  item_list?: GetItemBaseInfo_Item[];
  /**
   * Complaint policy.Only returned for local PL sellers, and need_complaint_policy in request is true.
   */
  complaint_policy?: GetItemBaseInfo_ComplaintPolicy;
  /**
   * Tax information
   */
  tax_info?: GetItemBaseInfo_TaxInfo;
  /**
   * New description  field. Only whitelist sellers can use it.
   */
  description_info?: GetItemBaseInfo_DescriptionInfo;
  /**
   * Type of description : values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * new stock object
   */
  stock_info_v2?: GetItemBaseInfo_StockInfoV2;
  [key: string]: any;
}
/**
 * Response data payload for get_item_base_info
 */
export type GetItemBaseInfoResponseData = GetItemBaseInfo_Response;
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
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * GetItemContentDiagnosisResult_UnfinishedTask sub-interface for GetItemContentDiagnosisResult_SuccessItem
 */
export interface GetItemContentDiagnosisResult_UnfinishedTask {
  /**
   * Item's content issue. Applicable values:1: TOO_FEW_IMAGES  2: WRONG_CATEGORY  3: TOO_FEW_ATTRIBUTES_FOR_QUALIFIED4: LACK_OF_SIZE_CHART  5: LACK_OF_STANDARD_VARIATION 6: LACK_BRAND  7: TOO_SHORT_DESCRIPTION  8: TOO_SHORT_OR_TOO_LONG_NAME9: WRONG_WEIGHT  10: LACK_OF_VIDEO11: TOO_FEW_ATTRIBUTES_FOR_EXCELLENT
   */
  issue_type?: number;
  /**
   * System suggestion for item's content issue. Applicable values:Add at least 3 imagesAdopt suggested categoryAdd at least 1 attributesAdd size chartAdopt the color or size variationAdd brand infoAdd at least 100 characters or 1 image for descAdd characters for name to 25~100Adopt suggested weightAdd videoAdd at least 3 attributes
   */
  suggestion?: string;
  [key: string]: any;
}
/**
 * GetItemContentDiagnosisResult_SuccessItem sub-interface for GetItemContentDiagnosisResult_Response
 */
export interface GetItemContentDiagnosisResult_SuccessItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's latest content quality level. Applicable values:0: NONE (No quality level for item in SELLER_DELETE / SHOPEE_DELETE / BANNED status)1: TO_BE_IMPROVED2: QUALIFIED3: EXCELLENT
   */
  quality_level?: number;
  unfinished_task?: GetItemContentDiagnosisResult_UnfinishedTask[];
  [key: string]: any;
}
/**
 * GetItemContentDiagnosisResult_FailureItem sub-interface for GetItemContentDiagnosisResult_Response
 */
export interface GetItemContentDiagnosisResult_FailureItem {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's failure reason.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * GetItemContentDiagnosisResult_Response sub-interface for GetItemContentDiagnosisResultResponse
 */
export interface GetItemContentDiagnosisResult_Response {
  success_item_list?: GetItemContentDiagnosisResult_SuccessItem[];
  failure_item_list?: GetItemContentDiagnosisResult_FailureItem[];
  [key: string]: any;
}
/**
 * Response data payload for get_item_content_diagnosis_result
 */
export type GetItemContentDiagnosisResultResponseData = GetItemContentDiagnosisResult_Response;
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
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * GetItemExtraInfo_Item sub-interface for GetItemExtraInfo_Response
 */
export interface GetItemExtraInfo_Item {
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
  [key: string]: any;
}
/**
 * GetItemExtraInfo_Response sub-interface for GetItemExtraInfoResponse
 */
export interface GetItemExtraInfo_Response {
  /**
   * extra info of item list.
   */
  item_list?: GetItemExtraInfo_Item[];
  [key: string]: any;
}
/**
 * Response data payload for get_item_extra_info
 */
export type GetItemExtraInfoResponseData = GetItemExtraInfo_Response;
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
  [key: string]: any;
}
/**
 * GetItemLimit_PriceLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_PriceLimit {
  /**
   * Item price max limit.
   */
  min_limit?: number;
  /**
   * Item price min limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_WholesalePriceThresholdPercentage sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_WholesalePriceThresholdPercentage {
  /**
   * Item wholesale price percentage of original price min limit.
   */
  min_limit?: number;
  /**
   * Item wholesale price percentage of original price min limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_StockLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_StockLimit {
  /**
   * Item stock min limit.
   */
  min_limit?: number;
  /**
   * Item stock max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_ItemNameLengthLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_ItemNameLengthLimit {
  /**
   * Item name length min limit.
   */
  min_limit?: number;
  /**
   * Item name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_ItemImageCountLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_ItemImageCountLimit {
  /**
   * Item image count min limit.
   */
  min_limit?: number;
  /**
   * Item image count max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_ItemDescriptionLengthLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_ItemDescriptionLengthLimit {
  /**
   * Item description length min limit.
   */
  min_limit?: number;
  /**
   * Item description length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_TierVariationNameLengthLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_TierVariationNameLengthLimit {
  /**
   * Item tier variation name length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_TierVariationOptionLengthLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_TierVariationOptionLengthLimit {
  /**
   * Item tier variation option length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation option length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_ItemCountLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_ItemCountLimit {
  /**
   * Item count max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_ExtendedDescriptionLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_ExtendedDescriptionLimit {
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
  [key: string]: any;
}
/**
 * GetItemLimit_DaysToShipLimit sub-interface for GetItemLimit_DtsLimit
 */
export interface GetItemLimit_DaysToShipLimit {
  min_limit?: number;
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_DtsLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_DtsLimit {
  /**
   * Pre order limits for the category
   */
  days_to_ship_limit?: GetItemLimit_DaysToShipLimit;
  non_pre_order_days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetItemLimit_WeightLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_WeightLimit {
  /**
   * weight is mandatory or not
   */
  weight_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetItemLimit_DimensionLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_DimensionLimit {
  /**
   * dimension is mandatory or not for the category
   */
  dimension_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetItemLimit_SizeChartLimit sub-interface for GetItemLimit_Response
 */
export interface GetItemLimit_SizeChartLimit {
  size_chart_mandatory?: boolean;
  support_image_size_chart?: boolean;
  support_template_size_chart?: boolean;
  [key: string]: any;
}
/**
 * GetItemLimit_Response sub-interface for GetItemLimitResponse
 */
export interface GetItemLimit_Response {
  price_limit?: GetItemLimit_PriceLimit;
  wholesale_price_threshold_percentage?: GetItemLimit_WholesalePriceThresholdPercentage;
  stock_limit?: GetItemLimit_StockLimit;
  item_name_length_limit?: GetItemLimit_ItemNameLengthLimit;
  item_image_count_limit?: GetItemLimit_ItemImageCountLimit;
  item_description_length_limit?: GetItemLimit_ItemDescriptionLengthLimit;
  tier_variation_name_length_limit?: GetItemLimit_TierVariationNameLengthLimit;
  tier_variation_option_length_limit?: GetItemLimit_TierVariationOptionLengthLimit;
  item_count_limit?: GetItemLimit_ItemCountLimit;
  extended_description_limit?: GetItemLimit_ExtendedDescriptionLimit;
  dts_limit?: GetItemLimit_DtsLimit;
  weight_limit?: GetItemLimit_WeightLimit;
  dimension_limit?: GetItemLimit_DimensionLimit;
  size_chart_limit?: GetItemLimit_SizeChartLimit;
  [key: string]: any;
}
/**
 * GetItemLimit_GtinLimit sub-interface for GetItemLimitResponse
 */
export interface GetItemLimit_GtinLimit {
  /**
   * Indicate gtin_code validation logic in v2.product.add_itemv2.product.update_itemv2.product.init_tier_variationv2.product.add_modelv2.product.update_model- Mandatory: This field is required and must contain a correctly formatted GTiN number.- Flexible: This field is required and must contain either a correctly formatted GTlN number or "00" todeclare that the item/model has no valid GTlN.- Optional: This field is optional and can contain a correctly formatted GTiN number, "00" or be omittedentirely.
   */
  gtin_validation_rule?: GtinValidationRule | string | number;
  [key: string]: any;
}
/**
 * Response data payload for get_item_limit
 */
export type GetItemLimitResponseData = GetItemLimit_Response;
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
  offset?: number;
  /**
   * the size of one page.Max=100
   */
  page_size?: number;
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
  item_status?: ItemStatus | string | number;
  [key: string]: any;
}
/**
 * GetItemList_Tag sub-interface for GetItemList_Item
 */
export interface GetItemList_Tag {
  /**
   * Indicate if the item is kit item.
   */
  kit?: boolean;
  [key: string]: any;
}
/**
 * GetItemList_Item sub-interface for GetItemList_Response
 */
export interface GetItemList_Item {
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
  tag?: GetItemList_Tag;
  [key: string]: any;
}
/**
 * GetItemList_Response sub-interface for GetItemListResponse
 */
export interface GetItemList_Response {
  /**
   * list of item info with item_id/ item_status/ update_time
   */
  item?: GetItemList_Item[];
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
  [key: string]: any;
}
/**
 * Response data payload for get_item_list
 */
export type GetItemListResponseData = GetItemList_Response;
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
  page_size?: number;
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
  [key: string]: any;
}
/**
 * GetItemListByContentDiagnosis_UnfinishedTask sub-interface for GetItemListByContentDiagnosis_Item
 */
export interface GetItemListByContentDiagnosis_UnfinishedTask {
  /**
   * Item's content issue. Applicable values:1: TOO_FEW_IMAGES2: WRONG_CATEGORY3: TOO_FEW_ATTRIBUTES_FOR_QUALIFIED4: LACK_OF_SIZE_CHART5: LACK_OF_STANDARD_VARIATION6: LACK_BRAND7: TOO_SHORT_DESCRIPTION8: TOO_SHORT_OR_TOO_LONG_NAME9: WRONG_WEIGHT10: LACK_OF_VIDEO11: TOO_FEW_ATTRIBUTES_FOR_EXCELLENT
   */
  issue_type?: number;
  /**
   * System suggestion for item's content issue. Applicable values:Add at least 3 imagesAdopt suggested categoryAdd at least 1 attributesAdd size chartAdopt the color or size variationAdd brand infoAdd at least 100 characters or 1 image for descAdd characters for name to 25~100Adopt suggested weightAdd videoAdd at least 3 attributes
   */
  suggestion?: string;
  [key: string]: any;
}
/**
 * GetItemListByContentDiagnosis_Item sub-interface for GetItemListByContentDiagnosis_Response
 */
export interface GetItemListByContentDiagnosis_Item {
  /**
   * Shopee's unique identifier for an item.
   */
  item_id?: number;
  /**
   * Item's latest content quality level. Applicable values:0: NONE (No quality level for item in SELLER_DELETE / SHOPEE_DELETE / BANNED status)1: TO_BE_IMPROVED2: QUALIFIED3: EXCELLENT
   */
  quality_level?: number;
  unfinished_task?: GetItemListByContentDiagnosis_UnfinishedTask[];
  [key: string]: any;
}
/**
 * GetItemListByContentDiagnosis_Response sub-interface for GetItemListByContentDiagnosisResponse
 */
export interface GetItemListByContentDiagnosis_Response {
  item_list?: GetItemListByContentDiagnosis_Item[];
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
  [key: string]: any;
}
/**
 * Response data payload for get_item_list_by_content_diagnosis
 */
export type GetItemListByContentDiagnosisResponseData = GetItemListByContentDiagnosis_Response;
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
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * GetItemPromotion_PromotionPriceInfo sub-interface for GetItemPromotion_Promotion
 */
export interface GetItemPromotion_PromotionPriceInfo {
  /**
   * Promotion price.
   */
  promotion_price?: number;
  [key: string]: any;
}
/**
 * GetItemPromotion_PromotionStockInfoV2 sub-interface for GetItemPromotion_Promotion
 */
export interface GetItemPromotion_PromotionStockInfoV2 {
  /**
   * stock summary info
   */
  summary_info?: any;
  /**
   * Total Stock reserved for promotion
   */
  total_reserved_stock?: number;
  [key: string]: any;
}
/**
 * GetItemPromotion_Promotion sub-interface for GetItemPromotion_Success
 */
export interface GetItemPromotion_Promotion {
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
  promotion_price_info?: GetItemPromotion_PromotionPriceInfo[];
  /**
   * Could be ongoing/upcoming
   */
  promotion_staging?: PromotionStaging | string | number;
  /**
   * new promotion stock
   */
  promotion_stock_info_v2?: GetItemPromotion_PromotionStockInfoV2;
  [key: string]: any;
}
/**
 * GetItemPromotion_Success sub-interface for GetItemPromotion_Response
 */
export interface GetItemPromotion_Success {
  /**
   * The identity of product item.
   */
  item_id?: number;
  /**
   * Item promotion info list
   */
  promotion?: GetItemPromotion_Promotion[];
  [key: string]: any;
}
/**
 * GetItemPromotion_Failure sub-interface for GetItemPromotion_Response
 */
export interface GetItemPromotion_Failure {
  /**
   * The identity of item.
   */
  item_id?: number;
  /**
   * Fail reason.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * GetItemPromotion_Response sub-interface for GetItemPromotionResponse
 */
export interface GetItemPromotion_Response {
  /**
   * Success item promotion info.
   */
  success_list?: GetItemPromotion_Success[];
  /**
   * Fail item promotion info.
   */
  failure_list?: GetItemPromotion_Failure[];
  [key: string]: any;
}
/**
 * Response data payload for get_item_promotion
 */
export type GetItemPromotionResponseData = GetItemPromotion_Response;
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
  item_id_list?: number[];
  [key: string]: any;
}
/**
 * GetItemViolationInfo_ItemStatusDetail sub-interface for GetItemViolationInfo_Item
 */
export interface GetItemViolationInfo_ItemStatusDetail {
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
  [key: string]: any;
}
/**
 * GetItemViolationInfo_SuggestedCategory sub-interface for GetItemViolationInfo_DeboostDetail
 */
export interface GetItemViolationInfo_SuggestedCategory {
  /**
   * ID for Shopee suggested category.
   */
  category_id?: number;
  /**
   * Default name for Shopee suggested category.
   */
  category_name?: string;
  [key: string]: any;
}
/**
 * GetItemViolationInfo_DeboostDetail sub-interface for GetItemViolationInfo_Item
 */
export interface GetItemViolationInfo_DeboostDetail {
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
  suggested_category?: GetItemViolationInfo_SuggestedCategory[];
  /**
   * Action required deadline. Empty if no deadline.
   */
  fix_deadline_time?: Date | number;
  /**
   * Latest update time.
   */
  update_time?: Date | number;
  [key: string]: any;
}
/**
 * GetItemViolationInfo_Item sub-interface for GetItemViolationInfo_Response
 */
export interface GetItemViolationInfo_Item {
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
  item_status_details?: GetItemViolationInfo_ItemStatusDetail[];
  deboost_details?: GetItemViolationInfo_DeboostDetail[];
  /**
   * Indicate error type if one element hit error.
   */
  fail_error?: string;
  /**
   * Indicate error details if one element hit error.
   */
  fail_message?: string;
  [key: string]: any;
}
/**
 * GetItemViolationInfo_Response sub-interface for GetItemViolationInfoResponse
 */
export interface GetItemViolationInfo_Response {
  item_list?: GetItemViolationInfo_Item[];
  [key: string]: any;
}
/**
 * Response data payload for get_item_violation_info
 */
export type GetItemViolationInfoResponseData = GetItemViolationInfo_Response;
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
  item_id?: number;
  [key: string]: any;
}
/**
 * GetKitItemInfo_Image sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_Image {
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
  [key: string]: any;
}
/**
 * GetKitItemInfo_LongImage sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_LongImage {
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
  [key: string]: any;
}
/**
 * GetKitItemInfo_ImageInfo sub-interface for GetKitItemInfo_Field
 */
export interface GetKitItemInfo_ImageInfo {
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
 * GetKitItemInfo_Field sub-interface for GetKitItemInfo_ExtendedDescription
 */
export interface GetKitItemInfo_Field {
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
  image_info?: GetKitItemInfo_ImageInfo;
  [key: string]: any;
}
/**
 * GetKitItemInfo_ExtendedDescription sub-interface for GetKitItemInfo_DescriptionInfo
 */
export interface GetKitItemInfo_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: GetKitItemInfo_Field[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_DescriptionInfo sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_DescriptionInfo {
  /**
   * If description_type is extended , Description information will be returned through this field.
   */
  extended_description?: GetKitItemInfo_ExtendedDescription;
  [key: string]: any;
}
/**
 * GetKitItemInfo_Video sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_Video {
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
 * GetKitItemInfo_AttributeValue sub-interface for GetKitItemInfo_Attribute
 */
export interface GetKitItemInfo_AttributeValue {
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
 * GetKitItemInfo_Attribute sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_Attribute {
  /**
   * The Identify of each attribute.
   */
  attribute_id?: number;
  /**
   * The name of each attribute.
   */
  original_attribute_name?: string;
  attribute_value_list?: GetKitItemInfo_AttributeValue[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_Dimension sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_Dimension {
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
  [key: string]: any;
}
/**
 * GetKitItemInfo_BrandInfo sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_BrandInfo {
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
 * GetKitItemInfo_Component sub-interface for GetKitItemInfo_Model
 */
export interface GetKitItemInfo_Component {
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
  main_component?: MainComponent | string | number;
  component_item_or_model_image?: string;
  component_item_or_model_sku?: string;
  [key: string]: any;
}
/**
 * GetKitItemInfo_Model sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_Model {
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
  component_list?: GetKitItemInfo_Component[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_PreOrderInfo sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_PreOrderInfo {
  is_pre_order?: boolean;
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetKitItemInfo_GetKitItemInfo_Image sub-interface for GetKitItemInfo_Option
 */
export interface GetKitItemInfo_GetKitItemInfo_Image {
  /**
   * Id of image.
   */
  image_id?: string;
  /**
   * Url of image.
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * GetKitItemInfo_Option sub-interface for GetKitItemInfo_TierVariation
 */
export interface GetKitItemInfo_Option {
  /**
   * Option name.
   */
  option?: string;
  image?: GetKitItemInfo_GetKitItemInfo_Image[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_TierVariation sub-interface for GetKitItemInfo_ProductInfo
 */
export interface GetKitItemInfo_TierVariation {
  /**
   * Variation name.
   */
  name?: string;
  /**
   * Option list.
   */
  option_list?: GetKitItemInfo_Option[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_ProductInfo sub-interface for GetKitItemInfo_Response
 */
export interface GetKitItemInfo_ProductInfo {
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
  images?: GetKitItemInfo_Image;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: GetKitItemInfo_LongImage;
  /**
   * Rich text description field. Only whitelist sellers can use it.
   */
  description_info?: GetKitItemInfo_DescriptionInfo;
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
  video_list?: GetKitItemInfo_Video[];
  /**
   * The attributes of this kit item, sync from the attributes of the main component of this kit item.
   */
  attributes?: GetKitItemInfo_Attribute[];
  /**
   * The weight of this kit item, the unit is KG.
   */
  weight?: string;
  /**
   * The dimension of this kit item.
   */
  dimension?: GetKitItemInfo_Dimension;
  /**
   * The brand of this kit item, sync from the brand of the main component of this kit item.
   */
  brand_info?: GetKitItemInfo_BrandInfo;
  /**
   * Model info list, model number at most 9.
   */
  model_list?: GetKitItemInfo_Model[];
  pre_order_info?: GetKitItemInfo_PreOrderInfo;
  /**
   * Variation config of item.
   */
  tier_variation_list?: GetKitItemInfo_TierVariation[];
  [key: string]: any;
}
/**
 * GetKitItemInfo_Response sub-interface for GetKitItemInfoResponse
 */
export interface GetKitItemInfo_Response {
  product_info?: GetKitItemInfo_ProductInfo;
  [key: string]: any;
}
/**
 * Response data payload for get_kit_item_info
 */
export type GetKitItemInfoResponseData = GetKitItemInfo_Response;
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
  [key: string]: any;
}
/**
 * GetKitItemLimit_PriceLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_PriceLimit {
  /**
   * Item price max limit.
   */
  min_limit?: number;
  /**
   * Item price min limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_ItemNameLengthLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_ItemNameLengthLimit {
  /**
   * Item name length min limit.
   */
  min_limit?: number;
  /**
   * Item name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_ItemImageCountLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_ItemImageCountLimit {
  /**
   * Item image count min limit.
   */
  min_limit?: number;
  /**
   * Item image count max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_DescriptionLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_DescriptionLimit {
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
  [key: string]: any;
}
/**
 * GetKitItemLimit_TierVariationNameLengthLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_TierVariationNameLengthLimit {
  /**
   * Item tier variation name length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation name length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_TierVariationOptionLengthLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_TierVariationOptionLengthLimit {
  /**
   * Item tier variation option length min limit.
   */
  min_limit?: number;
  /**
   * Item tier variation option length max limit.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_WeightLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_WeightLimit {
  /**
   * Whether weight is mandatory or not for the category.
   */
  weight_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetKitItemLimit_DimensionLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_DimensionLimit {
  /**
   * Whether dimension is mandatory or not for the category.
   */
  dimension_mandatory?: boolean;
  [key: string]: any;
}
/**
 * GetKitItemLimit_DaysToShipLimit sub-interface for GetKitItemLimit_DtsLimit
 */
export interface GetKitItemLimit_DaysToShipLimit {
  /**
   * Min limit of days to ship for pre-order products.
   */
  min_limit?: number;
  /**
   * Max limit of days to ship for pre-order products.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_DtsLimit sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_DtsLimit {
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
  days_to_ship_limit?: GetKitItemLimit_DaysToShipLimit;
  [key: string]: any;
}
/**
 * GetKitItemLimit_ComponentCountLimitOfSingleModel sub-interface for GetKitItemLimit_Response
 */
export interface GetKitItemLimit_ComponentCountLimitOfSingleModel {
  /**
   * Item count min limit that each kit variations support.
   */
  min_limit?: number;
  /**
   * Item count max limit that each kit variations support.
   */
  max_limit?: number;
  [key: string]: any;
}
/**
 * GetKitItemLimit_Response sub-interface for GetKitItemLimitResponse
 */
export interface GetKitItemLimit_Response {
  price_limit?: GetKitItemLimit_PriceLimit;
  item_name_length_limit?: GetKitItemLimit_ItemNameLengthLimit;
  item_image_count_limit?: GetKitItemLimit_ItemImageCountLimit;
  description_limit?: GetKitItemLimit_DescriptionLimit;
  tier_variation_name_length_limit?: GetKitItemLimit_TierVariationNameLengthLimit;
  tier_variation_option_length_limit?: GetKitItemLimit_TierVariationOptionLengthLimit;
  weight_limit?: GetKitItemLimit_WeightLimit;
  dimension_limit?: GetKitItemLimit_DimensionLimit;
  dts_limit?: GetKitItemLimit_DtsLimit;
  component_count_limit_of_single_model?: GetKitItemLimit_ComponentCountLimitOfSingleModel;
  [key: string]: any;
}
/**
 * Response data payload for get_kit_item_limit
 */
export type GetKitItemLimitResponseData = GetKitItemLimit_Response;
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
  direct_item_id?: number[];
  [key: string]: any;
}
/**
 * GetMainItemList_List sub-interface for GetMainItemList_Response
 */
export interface GetMainItemList_List {
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
  [key: string]: any;
}
/**
 * GetMainItemList_Response sub-interface for GetMainItemListResponse
 */
export interface GetMainItemList_Response {
  list?: GetMainItemList_List[];
  [key: string]: any;
}
/**
 * Response data payload for get_main_item_list
 */
export type GetMainItemListResponseData = GetMainItemList_Response;
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
  outlet_item_id?: number;
  [key: string]: any;
}
/**
 * GetMartItemByOutletItemId_ModelMapping sub-interface for GetMartItemByOutletItemId_ItemMapping
 */
export interface GetMartItemByOutletItemId_ModelMapping {
  /**
   * The model ID of the product in the Mart shop.
   */
  mart_model_id?: number;
  /**
   * The model ID of the corresponding product in the outlet shop.
   */
  outlet_model_id?: number;
  [key: string]: any;
}
/**
 * GetMartItemByOutletItemId_ItemMapping sub-interface for GetMartItemByOutletItemId_Response
 */
export interface GetMartItemByOutletItemId_ItemMapping {
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
  model_mapping?: GetMartItemByOutletItemId_ModelMapping[];
  [key: string]: any;
}
/**
 * GetMartItemByOutletItemId_Response sub-interface for GetMartItemByOutletItemIdResponse
 */
export interface GetMartItemByOutletItemId_Response {
  /**
   * A list of item mapping records between the Mart item and its corresponding outlet items.
   */
  item_mapping_list?: GetMartItemByOutletItemId_ItemMapping[];
  [key: string]: any;
}
/**
 * Response data payload for get_mart_item_by_outlet_item_id
 */
export type GetMartItemByOutletItemIdResponseData = GetMartItemByOutletItemId_Response;
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
  mart_item_id?: number;
  /**
   * A list of outlet shop IDs used to filter the mapping results.
   */
  outlet_shop_id_list?: number[];
  [key: string]: any;
}
/**
 * GetMartItemMappingById_ModelMapping sub-interface for GetMartItemMappingById_ItemMapping
 */
export interface GetMartItemMappingById_ModelMapping {
  /**
   * The model ID of the product in the Mart shop.
   */
  mart_model_id?: number;
  /**
   * The model ID of the corresponding product in the outlet shop.
   */
  outlet_model_id?: number;
  [key: string]: any;
}
/**
 * GetMartItemMappingById_ItemMapping sub-interface for GetMartItemMappingById_Response
 */
export interface GetMartItemMappingById_ItemMapping {
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
  model_mapping?: GetMartItemMappingById_ModelMapping[];
  [key: string]: any;
}
/**
 * GetMartItemMappingById_Response sub-interface for GetMartItemMappingByIdResponse
 */
export interface GetMartItemMappingById_Response {
  /**
   * A list of item mapping records between the Mart item and its corresponding outlet items.
   */
  item_mapping_list?: GetMartItemMappingById_ItemMapping[];
  [key: string]: any;
}
/**
 * Response data payload for get_mart_item_mapping_by_id
 */
export type GetMartItemMappingByIdResponseData = GetMartItemMappingById_Response;
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
  item_id?: number;
  [key: string]: any;
}
/**
 * GetModelList_Image sub-interface for GetModelList_Option
 */
export interface GetModelList_Image {
  /**
   * Id of image
   */
  image_id?: string;
  /**
   * Url of image.
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * GetModelList_Option sub-interface for GetModelList_TierVariation
 */
export interface GetModelList_Option {
  /**
   * Option name.
   */
  option?: string;
  image?: GetModelList_Image;
  [key: string]: any;
}
/**
 * GetModelList_TierVariation sub-interface for GetModelList_Response
 */
export interface GetModelList_TierVariation {
  /**
   * Option list.
   */
  option_list?: GetModelList_Option[];
  /**
   * Variation name.
   */
  name?: string;
  [key: string]: any;
}
/**
 * GetModelList_PriceInfo sub-interface for GetModelList_Model
 */
export interface GetModelList_PriceInfo {
  /**
   * Currency for the item price.
   */
  currency?: string;
  /**
   * Current price of item.
   */
  current_price?: number;
  /**
   * Original price of item.
   */
  original_price?: number;
  /**
   * Original price of item after tax.
   */
  inflated_price_of_original_price?: number;
  /**
   * Current price of item after tax.
   */
  inflated_price_of_current_price?: number;
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
  [key: string]: any;
}
/**
 * GetModelList_PreOrder sub-interface for GetModelList_Model
 */
export interface GetModelList_PreOrder {
  /**
   * Pre-order.
   */
  is_pre_order?: boolean;
  /**
   * The days to ship.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * GetModelList_SummaryInfo sub-interface for GetModelList_StockInfoV2
 */
export interface GetModelList_SummaryInfo {
  /**
   * Stock reserved for promotion.Note: For SIP P Item, will return the total reserved stock for P Item and all A Items under the P Item.
   */
  total_reserved_stock?: number;
  /**
   * Stock can be sold currently
   */
  total_available_stock?: number;
  [key: string]: any;
}
/**
 * GetModelList_SellerStock sub-interface for GetModelList_StockInfoV2
 */
export interface GetModelList_SellerStock {
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
  [key: string]: any;
}
/**
 * GetModelList_ShopeeStock sub-interface for GetModelList_StockInfoV2
 */
export interface GetModelList_ShopeeStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: string;
  [key: string]: any;
}
/**
 * GetModelList_AdvanceStock sub-interface for GetModelList_StockInfoV2
 */
export interface GetModelList_AdvanceStock {
  /**
   * Refers to Advance Fulfillment stock that Seller has shipped out and is available to be used to fulfill an order.
   */
  sellable_advance_stock?: number;
  /**
   * Refers to Advance Fulfillment stock that seller has shipped out and is still in transit and unavailable to be used to fulfill an order.
   */
  in_transit_advance_stock?: number;
  [key: string]: any;
}
/**
 * GetModelList_StockInfoV2 sub-interface for GetModelList_Model
 */
export interface GetModelList_StockInfoV2 {
  /**
   * stock summary Info
   */
  summary_info?: GetModelList_SummaryInfo;
  /**
   * Seller-managed stock
   */
  seller_stock?: GetModelList_SellerStock[];
  /**
   * Shopee warehouse stock
   */
  shopee_stock?: GetModelList_ShopeeStock[];
  /**
   * Only for PH/VN/ID/MY local selected shops.
   */
  advance_stock?: GetModelList_AdvanceStock;
  [key: string]: any;
}
/**
 * GetModelList_Dimension sub-interface for GetModelList_Model
 */
export interface GetModelList_Dimension {
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
  [key: string]: any;
}
/**
 * GetModelList_Model sub-interface for GetModelList_Response
 */
export interface GetModelList_Model {
  /**
   * Price info.For SG/MY/BR/MX/PL/ES/AR seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer.
   */
  price_info?: GetModelList_PriceInfo[];
  /**
   * Model ID.
   */
  model_id?: number;
  /**
   * Tier index of this model.
   */
  tier_index?: number[];
  /**
   * Current promotion ID of this model.
   */
  promotion_id?: any;
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
  pre_order?: GetModelList_PreOrder;
  /**
   * new stock info.Please check this FAQ for more detail: https://open.shopee.com/faq?top=162&sub=166&page=1&faq=230
   */
  stock_info_v2?: GetModelList_StockInfoV2;
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
  dimension?: GetModelList_Dimension;
  /**
   * whether model is fulfillment by shopee
   */
  is_fulfillment_by_shopee?: boolean;
  [key: string]: any;
}
/**
 * GetModelList_VariationOption sub-interface for GetModelList_StandardiseTierVariation
 */
export interface GetModelList_VariationOption {
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
  [key: string]: any;
}
/**
 * GetModelList_StandardiseTierVariation sub-interface for GetModelList_Response
 */
export interface GetModelList_StandardiseTierVariation {
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
  variation_option_list?: GetModelList_VariationOption[];
  [key: string]: any;
}
/**
 * GetModelList_Response sub-interface for GetModelListResponse
 */
export interface GetModelList_Response {
  /**
   * Variation config of item.
   */
  tier_variation?: GetModelList_TierVariation[];
  /**
   * Model list.
   */
  model?: GetModelList_Model[];
  /**
   * Standardise Variation config of item.
   */
  standardise_tier_variation?: GetModelList_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * Response data payload for get_model_list
 */
export type GetModelListResponseData = GetModelList_Response;
/**
 * Response payload for get_model_list
 *
 * Get model list of an item.
 */
export type GetModelListResponse = FetchResponse<GetModelListResponseData>;
/**
 * GetProductCertificationRule_AttributeValue sub-interface for GetProductCertificationRule_Attribute
 */
export interface GetProductCertificationRule_AttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Value name. original_value_name from produc.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * GetProductCertificationRule_Attribute sub-interface for GetProductCertificationRuleRequest
 */
export interface GetProductCertificationRule_Attribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  attribute_value_list?: GetProductCertificationRule_AttributeValue[];
  [key: string]: any;
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
  attribute_list?: GetProductCertificationRule_Attribute[];
  /**
   * ID of category.
   */
  category_id?: number;
  [key: string]: any;
}
/**
 * GetProductCertificationRule_CertificationRule sub-interface for GetProductCertificationRule_Response
 */
export interface GetProductCertificationRule_CertificationRule {
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
  [key: string]: any;
}
/**
 * GetProductCertificationRule_Response sub-interface for GetProductCertificationRuleResponse
 */
export interface GetProductCertificationRule_Response {
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  certification_rule_list?: GetProductCertificationRule_CertificationRule[];
  [key: string]: any;
}
/**
 * Response data payload for get_product_certification_rule
 */
export type GetProductCertificationRuleResponseData = GetProductCertificationRule_Response;
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
  item_name?: string;
  /**
   * Cover image id of item
   */
  cover_image_id?: number;
  /**
   * ID of category
   */
  category_id?: number;
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
  size_chart_id?: number;
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
   * name of column header (measurement)
   */
  display_name?: string;
  /**
   * the unit of this size measurement.
   */
  unit?: string;
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
  category_id?: string;
  /**
   * the size of one page. Max=50.
   */
  page_size?: string;
  /**
   * Specifies the starting entry of data to return in the current call. Default is "". If data is more than one page, the cursor can be some entry to start next call.
   */
  cursor?: string;
  [key: string]: any;
}
/**
 * GetSizeChartList_SizeChart sub-interface for GetSizeChartList_Response
 */
export interface GetSizeChartList_SizeChart {
  /**
   * ID of new size chart
   */
  size_chart_id?: string;
  [key: string]: any;
}
/**
 * GetSizeChartList_Response sub-interface for GetSizeChartListResponse
 */
export interface GetSizeChartList_Response {
  size_chart_list?: GetSizeChartList_SizeChart[];
  /**
   * total number of new size chart under requested category_id
   */
  total_count?: string;
  /**
   * if next_cursor has value, this value need set to next request.cursor
   */
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
  category_id?: number;
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
 * GetVariations_StandardiseVariation sub-interface for GetVariations_Data
 */
export interface GetVariations_StandardiseVariation {
  variation_id?: number;
  variation_name?: string;
  variation_group_list?: GetVariations_VariationGroup[];
  [key: string]: any;
}
/**
 * GetVariations_Data sub-interface for GetVariationsResponse
 */
export interface GetVariations_Data {
  /**
   * standardized tier variation tree
   */
  standardise_variation_list?: GetVariations_StandardiseVariation[];
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
  /**
   * standardized tier variation data
   */
  data?: GetVariations_Data;
  [key: string]: any;
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
  compatibility_details?: string;
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
  [key: string]: any;
}
/**
 * GetVehicleListByCompatibilityDetail_Vehicle sub-interface for GetVehicleListByCompatibilityDetail_Response
 */
export interface GetVehicleListByCompatibilityDetail_Vehicle {
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
  [key: string]: any;
}
/**
 * GetVehicleListByCompatibilityDetail_Response sub-interface for GetVehicleListByCompatibilityDetailResponse
 */
export interface GetVehicleListByCompatibilityDetail_Response {
  vehicle_list?: GetVehicleListByCompatibilityDetail_Vehicle[];
  [key: string]: any;
}
/**
 * Response data payload for get_vehicle_list_by_compatibility_detail
 */
export type GetVehicleListByCompatibilityDetailResponseData =
  GetVehicleListByCompatibilityDetail_Response;
/**
 * Response payload for get_vehicle_list_by_compatibility_detail
 *
 * Use this Open API to get vehicle list by brand, model, year, and version.
 */
export type GetVehicleListByCompatibilityDetailResponse =
  FetchResponse<GetVehicleListByCompatibilityDetailResponseData>;
/**
 * GetWeightRecommendation_AttributeValue sub-interface for GetWeightRecommendation_Attribute
 */
export interface GetWeightRecommendation_AttributeValue {
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
 * GetWeightRecommendation_Attribute sub-interface for GetWeightRecommendationRequest
 */
export interface GetWeightRecommendation_Attribute {
  /**
   * The Identify of each attribute.
   */
  attribute_id?: number;
  attribute_value_list?: GetWeightRecommendation_AttributeValue[];
  [key: string]: any;
}
/**
 * GetWeightRecommendation_ImageInfo sub-interface for GetWeightRecommendation_Field
 */
export interface GetWeightRecommendation_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * GetWeightRecommendation_Field sub-interface for GetWeightRecommendation_ExtendedDescription
 */
export interface GetWeightRecommendation_Field {
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
  image_info?: GetWeightRecommendation_ImageInfo;
  [key: string]: any;
}
/**
 * GetWeightRecommendation_ExtendedDescription sub-interface for GetWeightRecommendation_DescriptionInfo
 */
export interface GetWeightRecommendation_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: GetWeightRecommendation_Field[];
  [key: string]: any;
}
/**
 * GetWeightRecommendation_DescriptionInfo sub-interface for GetWeightRecommendationRequest
 */
export interface GetWeightRecommendation_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: GetWeightRecommendation_ExtendedDescription;
  [key: string]: any;
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
  item_name?: string;
  /**
   * Image id of first product image.
   */
  cover_image_id?: string;
  /**
   * Shopee's unique identifier for a category.
   */
  category_id?: number;
  attribute_list?: GetWeightRecommendation_Attribute[];
  /**
   * Id of brand.
   */
  brand_id?: number;
  /**
   * Type of description, values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  /**
   * If description_type is normal , Description information should be set by this field.
   */
  description?: string;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended.
   */
  description_info?: GetWeightRecommendation_DescriptionInfo;
  [key: string]: any;
}
/**
 * GetWeightRecommendation_Response sub-interface for GetWeightRecommendationResponse
 */
export interface GetWeightRecommendation_Response {
  /**
   * Recommended weight range, in kg. If there are no recommended results, return empty.
   */
  normal_weight_range?: number[];
  [key: string]: any;
}
/**
 * Response data payload for get_weight_recommendation
 */
export type GetWeightRecommendationResponseData = GetWeightRecommendation_Response;
/**
 * Response payload for get_weight_recommendation
 *
 * Get recommended weight. Now only BR shop support to use this api to get recommended weight.
 */
export type GetWeightRecommendationResponse = FetchResponse<GetWeightRecommendationResponseData>;
/**
 * InitTierVariation_SellerStock sub-interface for InitTierVariation_Model
 */
export interface InitTierVariation_SellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * InitTierVariation_Dimension sub-interface for InitTierVariation_Model
 */
export interface InitTierVariation_Dimension {
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
  [key: string]: any;
}
/**
 * InitTierVariation_PreOrder sub-interface for InitTierVariation_Model
 */
export interface InitTierVariation_PreOrder {
  /**
   * Whether the model is pre order.
   */
  is_pre_order?: boolean;
  /**
   * Days to ship. Please get the days_to_ship range from the get_dts_limit API.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * InitTierVariation_Model sub-interface for InitTierVariationRequest
 */
export interface InitTierVariation_Model {
  /**
   * Tier index of this model.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  tier_index?: TierIndex | string | number;
  /**
   * Original price of this model.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）
   */
  original_price?: number;
  /**
   * Seller SKU of this model, model_sku length information needs to be no more than 100 characters.
   */
  model_sku?: string;
  /**
   * new stock info（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: InitTierVariation_SellerStock[];
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
  dimension?: InitTierVariation_Dimension;
  /**
   * Pre-order information of this model.Notes: If don't set the DTS of this model, will use the DTS of the item by default.
   */
  pre_order?: InitTierVariation_PreOrder;
  [key: string]: any;
}
/**
 * InitTierVariation_VariationOption sub-interface for InitTierVariation_StandardiseTierVariation
 */
export interface InitTierVariation_VariationOption {
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
  [key: string]: any;
}
/**
 * InitTierVariation_StandardiseTierVariation sub-interface for InitTierVariationRequest
 */
export interface InitTierVariation_StandardiseTierVariation {
  /**
   * standardise tier variation ID.
   */
  variation_id?: number;
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
  variation_option_list?: InitTierVariation_VariationOption[];
  [key: string]: any;
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
  item_id?: number;
  /**
   * Model info list, model number at most 50
   */
  model?: InitTierVariation_Model[];
  /**
   * There is at least one standardise_tier_variation and tier_variation.If you want to update one tier/two tier to no tier, can just pass the tier_variation and standardise_tier_variation as [], and pass the model >> tier_index as [], meanwhile pass the original_price, seller_stock, etc., to set the price and stock for the modified product with no tier structure.
   */
  standardise_tier_variation?: InitTierVariation_StandardiseTierVariation[];
  [key: string]: any;
}
/**
 * InitTierVariation_Image sub-interface for InitTierVariation_Option
 */
export interface InitTierVariation_Image {
  /**
   * URL of image
   */
  image_url?: string;
  [key: string]: any;
}
/**
 * InitTierVariation_Option sub-interface for InitTierVariation_TierVariation
 */
export interface InitTierVariation_Option {
  /**
   * Image of this option
   */
  image?: InitTierVariation_Image;
  /**
   * Option name
   */
  option?: string;
  [key: string]: any;
}
/**
 * InitTierVariation_TierVariation sub-interface for InitTierVariation_Response
 */
export interface InitTierVariation_TierVariation {
  /**
   * Variation name
   */
  name?: string;
  /**
   * Options of this variation
   */
  option_list?: InitTierVariation_Option[];
  [key: string]: any;
}
/**
 * InitTierVariation_PriceInfo sub-interface for InitTierVariation_InitTierVariation_Model
 */
export interface InitTierVariation_PriceInfo {
  /**
   * Original price
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * InitTierVariation_InitTierVariation_SellerStock sub-interface for InitTierVariation_InitTierVariation_Model
 */
export interface InitTierVariation_InitTierVariation_SellerStock {
  /**
   * location id
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * InitTierVariation_InitTierVariation_Dimension sub-interface for InitTierVariation_InitTierVariation_Model
 */
export interface InitTierVariation_InitTierVariation_Dimension {
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
  [key: string]: any;
}
/**
 * InitTierVariation_InitTierVariation_Model sub-interface for InitTierVariation_Response
 */
export interface InitTierVariation_InitTierVariation_Model {
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
  price_info?: InitTierVariation_PriceInfo[];
  /**
   * new stock info
   */
  seller_stock?: InitTierVariation_InitTierVariation_SellerStock[];
  /**
   * The weight of this model, the unit is KG.If don't set the weight of this model, will use the weight of item by default.If set the dimension of this model, them must set the weight of this model.
   */
  weight?: number;
  /**
   * The dimension of this model.If don't set the dimension of this model, will use the dimension of item by default.
   */
  dimension?: InitTierVariation_InitTierVariation_Dimension;
  [key: string]: any;
}
/**
 * InitTierVariation_Response sub-interface for InitTierVariationResponse
 */
export interface InitTierVariation_Response {
  /**
   * ID of item
   */
  item_id?: number;
  /**
   * Variations of item
   */
  tier_variation?: InitTierVariation_TierVariation[];
  model?: InitTierVariation_InitTierVariation_Model[];
  [key: string]: any;
}
/**
 * Response data payload for init_tier_variation
 */
export type InitTierVariationResponseData = InitTierVariation_Response;
/**
 * Response payload for init_tier_variation
 *
 * This API allows you to update the tier structure of a product. Defining only color creates one tier, while color + size creates two tiers (maximum supported). Supported changes include: no tier ↔ one/two tiers, one tier ↔ two/no tier, and two tiers ↔ one/no tier. For details, see Developer Guide.  Please wait at least 5 seconds after creating an item before creating variants, as processing may be delayed.
 */
export type InitTierVariationResponse = FetchResponse<InitTierVariationResponseData>;
/**
 * PublishItemToOutletShop_SellerStock sub-interface for PublishItemToOutletShop_Model
 */
export interface PublishItemToOutletShop_SellerStock {
  /**
   * The location ID where the stock is stored.
   */
  location_id?: string;
  /**
   * The available stock quantity for the model.
   */
  stock?: number;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_PreOrder sub-interface for PublishItemToOutletShop_Model
 */
export interface PublishItemToOutletShop_PreOrder {
  /**
   * Indicates whether the model is sold as a pre-order item.
   */
  is_pre_order?: boolean;
  /**
   * The number of days required to ship the item after an order is placed.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_Model sub-interface for PublishItemToOutletShop_PublishItem
 */
export interface PublishItemToOutletShop_Model {
  /**
   * The model ID in the Mart shop that this outlet model is associated with.model_id=0 for items with only the default model(no variations)
   */
  relate_mart_model_id?: number;
  /**
   * The status of model.
   */
  model_status?: string;
  /**
   * The original price of the model.
   */
  original_price?: number;
  /**
   * Stock information for the model, set in outlet sku level.
   */
  seller_stock?: PublishItemToOutletShop_SellerStock[];
  /**
   * set in outlet sku level
   */
  pre_order?: PublishItemToOutletShop_PreOrder;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_LogisticInfo sub-interface for PublishItemToOutletShop_PublishItem
 */
export interface PublishItemToOutletShop_LogisticInfo {
  /**
   * The logistics channel ID used for shipping the item.
   */
  logistic_id?: number;
  /**
   * Indicates whether the logistics channel is enabled for the item.
   */
  enabled?: boolean;
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
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_MaxPurchaseLimit sub-interface for PublishItemToOutletShop_PurchaseLimitInfo
 */
export interface PublishItemToOutletShop_MaxPurchaseLimit {
  /**
   * The maximum quantity that a buyer is allowed to purchase per order.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_PurchaseLimitInfo sub-interface for PublishItemToOutletShop_PublishItem
 */
export interface PublishItemToOutletShop_PurchaseLimitInfo {
  /**
   * The minimum quantity that a buyer is allowed to purchase per order.
   */
  min_purchase_limit?: number;
  /**
   * The maximum purchase quantity configuration for the item.
   */
  max_purchase_limit?: PublishItemToOutletShop_MaxPurchaseLimit;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_PublishItem sub-interface for PublishItemToOutletShopRequest
 */
export interface PublishItemToOutletShop_PublishItem {
  outlet_item_id?: number;
  /**
   * A list of models to be published to the outlet shop, mapped from the corresponding Mart shop models.
   */
  model?: PublishItemToOutletShop_Model;
  /**
   * Logistic channel setting; can set for each outlet shop.
   */
  logistic_info?: PublishItemToOutletShop_LogisticInfo[];
  /**
   * Purchase quantity limits applied to the item in the outlet shop.
   */
  purchase_limit_info?: PublishItemToOutletShop_PurchaseLimitInfo;
  [key: string]: any;
}
/**
 * Request parameters for publish_item_to_outlet_shop
 *
 * This API supports publishing an existing item from the mart shop to an outlet shop.
 */
export interface PublishItemToOutletShopRequest {
  /**
   * The item ID of the product in the Mart shop to be published to the outlet shop.
   */
  mart_item_id?: number;
  /**
   * The shop ID of the outlet shop where the product will be published.
   */
  outlet_shop_id?: number;
  /**
   * Configuration details for publishing the product to the outlet shop, including model mapping, pricing, stock, logistics, and purchase limits.
   */
  publish_item?: PublishItemToOutletShop_PublishItem;
  [key: string]: any;
}
/**
 * PublishItemToOutletShop_Response sub-interface for PublishItemToOutletShopResponse
 */
export interface PublishItemToOutletShop_Response {
  /**
   * The outlet item ID.
   */
  item_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for publish_item_to_outlet_shop
 */
export type PublishItemToOutletShopResponseData = PublishItemToOutletShop_Response;
/**
 * Response payload for publish_item_to_outlet_shop
 *
 * This API supports publishing an existing item from the mart shop to an outlet shop.
 */
export type PublishItemToOutletShopResponse = FetchResponse<PublishItemToOutletShopResponseData>;
/**
 * RegisterBrand_ProductImage sub-interface for RegisterBrandRequest
 */
export interface RegisterBrand_ProductImage {
  /**
   * Image Id of product image for this brand, max input num of file = 10 ,each file's length<=498. ID market is optional.
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * RegisterBrand_License sub-interface for RegisterBrandRequest
 */
export interface RegisterBrand_License {
  /**
   * Brand registration certificate image name, len < 254
   */
  file_name?: string;
  /**
   * Image id of brand registration certificate image , max input num of file = 1 , each file's length<=498
   */
  file_hash?: string;
  [key: string]: any;
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
  original_brand_name?: string;
  /**
   * Category_id list for this brand, please input category in L1 or L2. Max input num of category_id is 50.
   */
  category_list?: number[];
  product_image?: RegisterBrand_ProductImage;
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
  brand_region?: string;
  /**
   * For appeal blacklisted brand data
   */
  licenses?: RegisterBrand_License[];
  /**
   * The link to brand registration website, It is mandatory when brand name hit blacklist.len<254
   */
  brand_registration_website?: string;
  [key: string]: any;
}
/**
 * RegisterBrand_Response sub-interface for RegisterBrandResponse
 */
export interface RegisterBrand_Response {
  /**
   * The identity of brand.
   */
  brand_id?: number;
  /**
   * Brand name
   */
  original_brand_name?: string;
  [key: string]: any;
}
/**
 * Response data payload for register_brand
 */
export type RegisterBrandResponseData = RegisterBrand_Response;
/**
 * Response payload for register_brand
 *
 * Use this call to register a brand.
 */
export type RegisterBrandResponse = FetchResponse<RegisterBrandResponseData>;
/**
 * ReplyComment_Comment sub-interface for ReplyCommentRequest
 */
export interface ReplyComment_Comment {
  /**
   * The identity of comment.
   */
  comment_id?: number;
  /**
   * The content of the comment.
   */
  comment?: string;
  [key: string]: any;
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
  comment_list?: ReplyComment_Comment[];
  [key: string]: any;
}
/**
 * ReplyComment_Result sub-interface for ReplyComment_Response
 */
export interface ReplyComment_Result {
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
  [key: string]: any;
}
/**
 * ReplyComment_Response sub-interface for ReplyCommentResponse
 */
export interface ReplyComment_Response {
  /**
   * The result list of the request comment list.
   */
  result_list?: ReplyComment_Result[];
  [key: string]: any;
}
/**
 * Response data payload for reply_comment
 */
export type ReplyCommentResponseData = ReplyComment_Response;
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
  attribute_id?: number;
  /**
   * search the keywords of the attributes value
   */
  value_name?: string;
  cursor?: number;
  /**
   * The range is 1 to 100
   */
  limit?: number;
  [key: string]: any;
}
/**
 * SearchAttributeValueList_Value sub-interface for SearchAttributeValueList_Response
 */
export interface SearchAttributeValueList_Value {
  /**
   * The ID of the predefined attributes value.
   */
  value_id?: number;
  /**
   * The name of the predefined attributes value.
   */
  value_name?: string;
  [key: string]: any;
}
/**
 * SearchAttributeValueList_PageInfo sub-interface for SearchAttributeValueList_Response
 */
export interface SearchAttributeValueList_PageInfo {
  cursor?: number;
  has_next?: boolean;
  [key: string]: any;
}
/**
 * SearchAttributeValueList_Response sub-interface for SearchAttributeValueListResponse
 */
export interface SearchAttributeValueList_Response {
  value_list?: SearchAttributeValueList_Value[];
  page_info?: SearchAttributeValueList_PageInfo;
  [key: string]: any;
}
/**
 * Response data payload for search_attribute_value_list
 */
export type SearchAttributeValueListResponseData = SearchAttributeValueList_Response;
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
  page_size?: number;
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
  [key: string]: any;
}
/**
 * SearchItem_Response sub-interface for SearchItemResponse
 */
export interface SearchItem_Response {
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
  [key: string]: any;
}
/**
 * Response data payload for search_item
 */
export type SearchItemResponseData = SearchItem_Response;
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
  page_size?: number;
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
  [key: string]: any;
}
/**
 * SearchUnpackagedModelList_Model sub-interface for SearchUnpackagedModelList_Response
 */
export interface SearchUnpackagedModelList_Model {
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
  [key: string]: any;
}
/**
 * SearchUnpackagedModelList_Response sub-interface for SearchUnpackagedModelListResponse
 */
export interface SearchUnpackagedModelList_Response {
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
  model_list?: SearchUnpackagedModelList_Model[];
  [key: string]: any;
}
/**
 * Response data payload for search_unpackaged_model_list
 */
export type SearchUnpackagedModelListResponseData = SearchUnpackagedModelList_Response;
/**
 * Response payload for search_unpackaged_model_list
 *
 * Use this API to retrieve Unpackaged SKU ID information for items that toggle on logistics channel 30029.
 */
export type SearchUnpackagedModelListResponse =
  FetchResponse<SearchUnpackagedModelListResponseData>;
/**
 * UnlistItem_Item sub-interface for UnlistItemRequest
 */
export interface UnlistItem_Item {
  /**
   * Shopee's unique identifier for an item
   */
  item_id?: number;
  /**
   * Unlist or not
   */
  unlist?: boolean;
  [key: string]: any;
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
  item_list?: UnlistItem_Item[];
  [key: string]: any;
}
/**
 * UnlistItem_Failure sub-interface for UnlistItem_Response
 */
export interface UnlistItem_Failure {
  /**
   * Failed item id
   */
  item_id?: number;
  /**
   * Failed reason
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * UnlistItem_Success sub-interface for UnlistItem_Response
 */
export interface UnlistItem_Success {
  /**
   * Success item id
   */
  item_id?: number;
  /**
   * Whether the item is unlisted
   */
  unlist?: boolean;
  [key: string]: any;
}
/**
 * UnlistItem_Response sub-interface for UnlistItemResponse
 */
export interface UnlistItem_Response {
  failure_list?: UnlistItem_Failure[];
  success_list?: UnlistItem_Success[];
  [key: string]: any;
}
/**
 * Response data payload for unlist_item
 */
export type UnlistItemResponseData = UnlistItem_Response;
/**
 * Response payload for unlist_item
 *
 * Unlist item.
 */
export type UnlistItemResponse = FetchResponse<UnlistItemResponseData>;
/**
 * UpdateItem_PreOrder sub-interface for UpdateItemRequest
 */
export interface UpdateItem_PreOrder {
  /**
   * Days to ship.
   */
  days_to_ship?: number;
  /**
   * Whether the item is pre order.
   */
  is_pre_order?: boolean;
  [key: string]: any;
}
/**
 * UpdateItem_AttributeValue sub-interface for UpdateItem_Attribute
 */
export interface UpdateItem_AttributeValue {
  /**
   * ID of attribute value. In the following cases, the value id needs to be uploaded as 0, and original_value_name is mandatory, needs to be filled in customized value. (1) AttributeInputType is TEXT_FILED; (2) AttributeInputType is COMBO_BOX or MULTIPLE_SELECT_COMBO_BOX, and the seller want to fill in a customized value.
   */
  value_id?: number;
  /**
   * Value name. original_value_name from produc.get_attributes api. If value id=0, this field is required. If AttributeType is DATE_TYPE or TIMESTAMP_TYPE, you can upload timestamp(string type) as the original_value_name.
   */
  original_value_name?: string;
  /**
   * Unit of attribute value (quantitative attribute only).
   */
  value_unit?: string;
  [key: string]: any;
}
/**
 * UpdateItem_Attribute sub-interface for UpdateItemRequest
 */
export interface UpdateItem_Attribute {
  /**
   * ID of attribute.
   */
  attribute_id?: number;
  attribute_value_list?: UpdateItem_AttributeValue[];
  [key: string]: any;
}
/**
 * UpdateItem_Image sub-interface for UpdateItemRequest
 */
export interface UpdateItem_Image {
  /**
   * Image ID.
   */
  image_id_list?: any[];
  /**
   * Ratio of image, OptionalAllowed ratios :"1:1" (default) "3:4"
   */
  image_ratio?: string;
  [key: string]: any;
}
/**
 * UpdateItem_Wholesale sub-interface for UpdateItemRequest
 */
export interface UpdateItem_Wholesale {
  /**
   * Minimum count of this tier.
   */
  min_count?: number;
  /**
   * Price of this tier.
   */
  unit_price?: number;
  /**
   * Maximum count of this tier.
   */
  max_count?: number;
  [key: string]: any;
}
/**
 * UpdateItem_Dimension sub-interface for UpdateItemRequest
 */
export interface UpdateItem_Dimension {
  /**
   * The height of package for this item, the unit is CM.
   */
  package_height?: number;
  /**
   * The length of package for this item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this item, the unit is CM.
   */
  package_width?: number;
  [key: string]: any;
}
/**
 * UpdateItem_Brand sub-interface for UpdateItemRequest
 */
export interface UpdateItem_Brand {
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
 * UpdateItem_GroupItemInfo sub-interface for UpdateItem_TaxInfo
 */
export interface UpdateItem_GroupItemInfo {
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
  [key: string]: any;
}
/**
 * UpdateItem_TaxInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_TaxInfo {
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
  group_item_info?: UpdateItem_GroupItemInfo;
  /**
   * 7101 - for sales of self-produced goods7102 - resale of third-party goods
   */
  export_cfop?: string;
  [key: string]: any;
}
/**
 * UpdateItem_ComplaintPolicy sub-interface for UpdateItemRequest
 */
export interface UpdateItem_ComplaintPolicy {
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
  [key: string]: any;
}
/**
 * UpdateItem_ImageInfo sub-interface for UpdateItem_Field
 */
export interface UpdateItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * UpdateItem_Field sub-interface for UpdateItem_ExtendedDescription
 */
export interface UpdateItem_Field {
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
  image_info?: UpdateItem_ImageInfo;
  [key: string]: any;
}
/**
 * UpdateItem_ExtendedDescription sub-interface for UpdateItem_DescriptionInfo
 */
export interface UpdateItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: UpdateItem_Field[];
  [key: string]: any;
}
/**
 * UpdateItem_DescriptionInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_DescriptionInfo {
  /**
   * If description_type is extended , description information should be set by this field.
   */
  extended_description?: UpdateItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * UpdateItem_PromotionImage sub-interface for UpdateItemRequest
 */
export interface UpdateItem_PromotionImage {
  /**
   * Promotion Image
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * UpdateItem_VehicleInfo sub-interface for UpdateItem_CompatibilityInfo
 */
export interface UpdateItem_VehicleInfo {
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
  [key: string]: any;
}
/**
 * UpdateItem_CompatibilityInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_CompatibilityInfo {
  vehicle_info_list?: UpdateItem_VehicleInfo[];
  [key: string]: any;
}
/**
 * UpdateItem_SizeChartInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_SizeChartInfo {
  /**
   * ID of size chart image. If you want to remove the image size chart of the item, please pass the "size_chart" empty.You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Both CB shops and local shops are supported to set "size_chart".
   */
  size_chart?: string;
  /**
   * ID of template size chart. If you want to remove the template size chart of the item, please pass the "size_chart_id" as 0.You only need to fill out either the image or template. If both are filled, only the template will be kept.Notes: Only local shops are supported to set "size_chart_id", for CB shops please use "size_chart".
   */
  size_chart_id?: number;
  [key: string]: any;
}
/**
 * UpdateItem_CertificationProof sub-interface for UpdateItem_Certification
 */
export interface UpdateItem_CertificationProof {
  /**
   * The unique image ID of the certification proof, returned by the image upload API.
   */
  image_id?: string;
  /**
   * The name of the uploaded certification proof file.
   */
  file_name?: string;
  /**
   * image weight/ image heightWill be optional in the future; can input 0.75 by default
   */
  ratio?: number;
  [key: string]: any;
}
/**
 * UpdateItem_Certification sub-interface for UpdateItem_CertificationInfo
 */
export interface UpdateItem_Certification {
  /**
   * Certification number issued by the regulatory or certifying authority; uniquely identifies the certification.refer tohttps://seller.shopee.ph/edu/article/24236
   */
  certification_no?: CertificationNo | string | number;
  /**
   * Platform-defined permit ID used to link to a specific certification template or rule.get from v2.product.get_product_certification_rule
   */
  permit_id?: number;
  /**
   * Expiry timestamp. Required for PH, but not needed for TW.
   */
  expiry_date?: number;
  /**
   * An array of proof documents for the certification; each element represents one proof file.<path></path>
   */
  certification_proofs?: UpdateItem_CertificationProof;
  [key: string]: any;
}
/**
 * UpdateItem_CertificationInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_CertificationInfo {
  /**
   * Array of certification records for the product, each containing type, certificate number, permit ID, and proof documents.
   */
  certification_list?: UpdateItem_Certification[];
  [key: string]: any;
}
/**
 * UpdateItem_MaxPurchaseLimit sub-interface for UpdateItem_PurchaseLimitInfo
 */
export interface UpdateItem_MaxPurchaseLimit {
  /**
   * maximum purchase limit for each order.
   */
  purchase_limit?: number;
  [key: string]: any;
}
/**
 * UpdateItem_PurchaseLimitInfo sub-interface for UpdateItemRequest
 */
export interface UpdateItem_PurchaseLimitInfo {
  /**
   * minimum purchase count for each order
   */
  min_purchase_limit?: number;
  max_purchase_limit?: UpdateItem_MaxPurchaseLimit;
  [key: string]: any;
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
  pre_order?: UpdateItem_PreOrder;
  /**
   * Item name.
   */
  item_name?: string;
  /**
   * Item attributes.
   */
  attribute_list?: UpdateItem_Attribute[];
  /**
   * Images of item.
   */
  image?: UpdateItem_Image;
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
  wholesale?: UpdateItem_Wholesale[];
  /**
   * ID of item.
   */
  item_id?: number;
  /**
   * ID of category.
   */
  category_id?: number;
  /**
   * The dimension of this item.Updating the dimension of this item will overwrite the dimension of all models under this item.
   */
  dimension?: UpdateItem_Dimension;
  /**
   * Condition of item, could be NEW or USED.
   */
  condition?: string;
  /**
   * Video upload ID returned from video uploading API.If you want to delete it, please pass it with blank.
   */
  video_upload_id?: string[];
  brand?: UpdateItem_Brand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Tax information
   */
  tax_info?: UpdateItem_TaxInfo;
  /**
   * Complaint Policy for item. Only required for local PL sellers, ignored otherwise.
   */
  complaint_policy?: UpdateItem_ComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateItem_DescriptionInfo;
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
  promotion_images?: UpdateItem_PromotionImage;
  compatibility_info?: UpdateItem_CompatibilityInfo;
  /**
   * Scheduled publish time of this item: 1) Can only set scheduled_publish_time for item with UNLIST status2) Can only set the time from current time +1hour to current time +90days, and the time is only allowed to be accurate to the minute
   */
  scheduled_publish_time?: Date | number;
  /**
   * ID of authorised reseller brand.
   */
  authorised_brand_id?: number;
  size_chart_info?: UpdateItem_SizeChartInfo;
  /**
   * For PH product certification inputRequired for some category and attribute option
   */
  certification_info?: UpdateItem_CertificationInfo;
  /**
   * purchase limit info
   */
  purchase_limit_info?: UpdateItem_PurchaseLimitInfo;
  /**
   * [Only for ID local sellers] as a unique identifier for each standardized medicine, the medicine id can only be obtained offline
   */
  medicine_id?: number;
  [key: string]: any;
}
/**
 * UpdateItem_UpdateItem_Image sub-interface for UpdateItem_Response
 */
export interface UpdateItem_UpdateItem_Image {
  /**
   * ID list of item image.
   */
  image_id_list?: string[];
  /**
   * URL list of item image
   */
  image_url_list?: string[];
  [key: string]: any;
}
/**
 * UpdateItem_LogisticInfo sub-interface for UpdateItem_Response
 */
export interface UpdateItem_LogisticInfo {
  /**
   * Estimated shipping fee.
   */
  estimated_shipping_fee?: number;
  /**
   * Name of logistics channel.
   */
  logistic_name?: string;
  /**
   * Whether this channel is enabled.
   */
  enabled?: boolean;
  /**
   * ID of this channel.
   */
  logistic_id?: number;
  /**
   * Whether cover shipping fee for buyer.
   */
  is_free?: boolean;
  [key: string]: any;
}
/**
 * UpdateItem_UpdateItem_ComplaintPolicy sub-interface for UpdateItem_Response
 */
export interface UpdateItem_UpdateItem_ComplaintPolicy {
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
  [key: string]: any;
}
/**
 * UpdateItem_Response sub-interface for UpdateItemResponse
 */
export interface UpdateItem_Response {
  /**
   * Item description.
   */
  description?: string;
  /**
   * The weight of this item, the unit is KG.
   */
  weight?: number;
  pre_order?: UpdateItem_PreOrder;
  /**
   * Item name.
   */
  item_name?: string;
  /**
   * Item status.
   */
  item_status?: string;
  /**
   * Item images.
   */
  images?: UpdateItem_UpdateItem_Image;
  logistic_info?: UpdateItem_LogisticInfo[];
  /**
   * ID of item.
   */
  item_id?: number;
  /**
   * ID of item category.
   */
  category_id?: number;
  /**
   * The dimension of this item.
   */
  dimension?: UpdateItem_Dimension;
  /**
   * Item condition, could be USED or NEW.
   */
  condition?: string;
  brand?: UpdateItem_Brand;
  /**
   * This field is only applicable for local sellers in Indonesia and Malaysia. Use this field to identify whether a product is a dangerous product. 0 for non-dangerous product and 1 for dangerous product. For more information, please visit the market's respective Seller Education Hub.
   */
  item_dangerous?: number;
  /**
   * Complaint policy
   */
  complaint_policy?: UpdateItem_UpdateItem_ComplaintPolicy;
  /**
   * New description field. Only whitelist sellers can use it. If you use the field, please upload the description_type=extended otherwise api will return error. If you don't use this field, you don't need to upload the description_type or upload description_type=normal
   */
  description_info?: UpdateItem_DescriptionInfo;
  /**
   * Values: See Data Definition- description_type (normal , extended).
   */
  description_type?: string;
  [key: string]: any;
}
/**
 * Response data payload for update_item
 */
export type UpdateItemResponseData = UpdateItem_Response;
/**
 * Response payload for update_item
 *
 * Update item.
 */
export type UpdateItemResponse = FetchResponse<UpdateItemResponseData>;
/**
 * UpdateKitItem_Image sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_Image {
  /**
   * ID of image.
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * UpdateKitItem_LongImage sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_LongImage {
  /**
   * ID of image.
   */
  image_id_list?: string[];
  [key: string]: any;
}
/**
 * UpdateKitItem_ImageInfo sub-interface for UpdateKitItem_Field
 */
export interface UpdateKitItem_ImageInfo {
  /**
   * Image id.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * UpdateKitItem_Field sub-interface for UpdateKitItem_ExtendedDescription
 */
export interface UpdateKitItem_Field {
  /**
   * Type of extended description field. See Data Definition- description_field_type (text , image).
   */
  field_type?: string;
  /**
   * If field_type is text, text information will be set by this field.
   */
  text?: string;
  /**
   * If field_type is image, image will be set by this field.
   */
  image_info?: UpdateKitItem_ImageInfo;
  [key: string]: any;
}
/**
 * UpdateKitItem_ExtendedDescription sub-interface for UpdateKitItem_DescriptionInfo
 */
export interface UpdateKitItem_ExtendedDescription {
  /**
   * Field of extended description.
   */
  field_list?: UpdateKitItem_Field[];
  [key: string]: any;
}
/**
 * UpdateKitItem_DescriptionInfo sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_DescriptionInfo {
  /**
   * If description_type is extended , Description information should be set by this field.
   */
  extended_description?: UpdateKitItem_ExtendedDescription;
  [key: string]: any;
}
/**
 * UpdateKitItem_LogisticInfo sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_LogisticInfo {
  /**
   * ID of the channel.
   */
  logistic_id?: number;
  /**
   * Whether channel is enabled for this kit item.
   */
  enabled?: boolean;
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
  [key: string]: any;
}
/**
 * UpdateKitItem_Dimension sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_Dimension {
  /**
   * The length of package for this kit item, the unit is CM.
   */
  package_length?: number;
  /**
   * The width of package for this kit item, the unit is CM.
   */
  package_width?: number;
  /**
   * The height of package for this kit item, the unit is CM.
   */
  package_height?: number;
  [key: string]: any;
}
/**
 * UpdateKitItem_PreOrder sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_PreOrder {
  /**
   * Whether kit item is pre order.
   */
  is_pre_order?: boolean;
  /**
   * The guaranteed days to ship orders. Please get the days_to_ship range from get_kit_item_limit api.
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * UpdateKitItem_Component sub-interface for UpdateKitItem_Model
 */
export interface UpdateKitItem_Component {
  /**
   * ID of the item that composes this kit model.
   */
  component_item_id?: number;
  /**
   * ID of the model that composes this kit model.
   */
  component_model_id?: number;
  /**
   * The amount of the item/model that composes this kit model.
   */
  quantity?: number;
  /**
   * Whether this item/model is the main component for this kit.One kit item can only have one item/model as main component.
   */
  main_component?: MainComponent | string | number;
  [key: string]: any;
}
/**
 * UpdateKitItem_Model sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_Model {
  /**
   * ID of this kit model.
   */
  model_id?: number;
  /**
   * Tier index of this kit model.
   */
  tier_index?: number[];
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
  component_list?: UpdateKitItem_Component[];
  [key: string]: any;
}
/**
 * UpdateKitItem_UpdateKitItem_Image sub-interface for UpdateKitItem_Option
 */
export interface UpdateKitItem_UpdateKitItem_Image {
  /**
   * ID of image. If you choose to define, you need to define an image for all options.
   */
  image_id?: string;
  [key: string]: any;
}
/**
 * UpdateKitItem_Option sub-interface for UpdateKitItem_TierVariation
 */
export interface UpdateKitItem_Option {
  /**
   * Option name.
   */
  option?: string;
  /**
   * Option image.
   */
  image?: UpdateKitItem_UpdateKitItem_Image;
  [key: string]: any;
}
/**
 * UpdateKitItem_TierVariation sub-interface for UpdateKitItem_ItemSetting
 */
export interface UpdateKitItem_TierVariation {
  /**
   * Tier variation name.
   */
  name?: string;
  /**
   * Tier variation option info list.
   */
  option_list?: UpdateKitItem_Option[];
  [key: string]: any;
}
/**
 * UpdateKitItem_ItemSetting sub-interface for UpdateKitItemRequest
 */
export interface UpdateKitItem_ItemSetting {
  /**
   * The name of this kit item.
   */
  item_name?: string;
  /**
   * Item images with 1:1 ratio.
   */
  images?: UpdateKitItem_Image;
  /**
   * Item images with 3:4 ratio.
   */
  long_images?: UpdateKitItem_LongImage;
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
  description_info?: UpdateKitItem_DescriptionInfo;
  /**
   * See Data Definition- description_type (normal , extended). If you want to use extended_description, this field must be inputed.
   */
  description_type?: string;
  /**
   * Logistic channel setting.
   */
  logistic_info?: UpdateKitItem_LogisticInfo[];
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
  dimension?: UpdateKitItem_Dimension;
  /**
   * Pre order setting.
   */
  pre_order?: UpdateKitItem_PreOrder;
  /**
   * Model info list, model number at most 9.
   */
  model_list?: UpdateKitItem_Model[];
  /**
   * Tier variation info list. Only support one tier variation, and each kit item can have from 1 to 9 kit variations.
   */
  tier_variation_list?: UpdateKitItem_TierVariation[];
  [key: string]: any;
}
/**
 * UpdateKitItem_SyncSetting sub-interface for UpdateKitItemRequest
 */
export interface UpdateKitItem_SyncSetting {
  /**
   * Auto sync the pre_order setting from main component or not.
   */
  auto_sync_dts?: boolean;
  [key: string]: any;
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
  item_id?: number;
  item_setting?: UpdateKitItem_ItemSetting;
  sync_setting?: UpdateKitItem_SyncSetting;
  [key: string]: any;
}
/**
 * Response data payload for update_kit_item
 */
export interface UpdateKitItemResponseData {
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_kit_item
 *
 * Update the kit basic information and kit components, only support adding kit variations and updating existing kit variation’s image, price, and model_sku, don’t support deleting existing kit variations and updating the items, main component and quantity per kit of existing kit variations.
 */
export type UpdateKitItemResponse = FetchResponse<UpdateKitItemResponseData>;
/**
 * UpdateModel_PreOrder sub-interface for UpdateModel_Model
 */
export interface UpdateModel_PreOrder {
  /**
   * Pre-order
   */
  is_pre_order?: boolean;
  /**
   * The days to ship. Only work for is_pre_order=true
   */
  days_to_ship?: number;
  [key: string]: any;
}
/**
 * UpdateModel_Dimension sub-interface for UpdateModel_Model
 */
export interface UpdateModel_Dimension {
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
  [key: string]: any;
}
/**
 * UpdateModel_Model sub-interface for UpdateModelRequest
 */
export interface UpdateModel_Model {
  /**
   * ID of model
   */
  model_id?: number;
  /**
   * Seller SKU for model, model_sku length information needs to be no more than 100 characters. CNSC and KRSC sellers are not allowed to update the MPSKU model sku.
   */
  model_sku?: string;
  pre_order?: UpdateModel_PreOrder;
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
  dimension?: UpdateModel_Dimension;
  [key: string]: any;
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
  item_id?: number;
  /**
   * Length should be between 1 to 50
   */
  model?: UpdateModel_Model[];
  [key: string]: any;
}
/**
 * Response data payload for update_model
 */
export interface UpdateModelResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_model
 *
 * Update seller sku/ pre order/ model status for model.
 */
export type UpdateModelResponse = FetchResponse<UpdateModelResponseData>;
/**
 * UpdatePrice_Price sub-interface for UpdatePriceRequest
 */
export interface UpdatePrice_Price {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * Original price for this model.For CO local VAT responsible seller：Please remember the price you set in here must be VAT inclusive. If you have any doubts on how to calculate VAT for your product please refer to the Seller Education Hub（https://seller.shopee.com.co/edu/article/13565）For SG/MY/BR/MX/PL/ES/AR seller: Sellers can set the price with two decimal place, other regions can only set the price as an integer.
   */
  original_price?: number;
  [key: string]: any;
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
  item_id?: number;
  /**
   * Length should be between 1 to 50.
   */
  price_list?: UpdatePrice_Price[];
  [key: string]: any;
}
/**
 * UpdatePrice_Failure sub-interface for UpdatePrice_Response
 */
export interface UpdatePrice_Failure {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * UpdatePrice_Success sub-interface for UpdatePrice_Response
 */
export interface UpdatePrice_Success {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Original price for model.
   */
  original_price?: number;
  [key: string]: any;
}
/**
 * UpdatePrice_Response sub-interface for UpdatePriceResponse
 */
export interface UpdatePrice_Response {
  /**
   * Fail model list.
   */
  failure_list?: UpdatePrice_Failure[];
  /**
   * Success model list.
   */
  success_list?: UpdatePrice_Success[];
  [key: string]: any;
}
/**
 * Response data payload for update_price
 */
export type UpdatePriceResponseData = UpdatePrice_Response;
/**
 * Response payload for update_price
 *
 * Update price.
 */
export type UpdatePriceResponse = FetchResponse<UpdatePriceResponseData>;
/**
 * UpdateSipItemPrice_SipItemPrice sub-interface for UpdateSipItemPriceRequest
 */
export interface UpdateSipItemPrice_SipItemPrice {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * SIP item price.
   */
  sip_item_price?: number;
  [key: string]: any;
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
  item_id?: number;
  sip_item_price?: UpdateSipItemPrice_SipItemPrice[];
  [key: string]: any;
}
/**
 * Response data payload for update_sip_item_price
 */
export interface UpdateSipItemPriceResponseData {
  /**
   * Warning message.
   */
  warning?: string;
  [key: string]: any;
}
/**
 * Response payload for update_sip_item_price
 *
 * Update sip item price.
 */
export type UpdateSipItemPriceResponse = FetchResponse<UpdateSipItemPriceResponseData>;
/**
 * UpdateStock_SellerStock sub-interface for UpdateStock_Stock
 */
export interface UpdateStock_SellerStock {
  /**
   * location id, you can get the location id from v2.shop.get_warehouse_detail api, if seller don't have any warehouse, you don't need to upload this field.
   */
  location_id?: string;
  /**
   * stock
   */
  stock?: number;
  [key: string]: any;
}
/**
 * UpdateStock_Stock sub-interface for UpdateStockRequest
 */
export interface UpdateStock_Stock {
  /**
   * 0 for no model item.
   */
  model_id?: number;
  /**
   * new stock info（Please notice that stock(including Seller Stock and Shopee Stock) should be larger than or equal to real-time reserved stock）
   */
  seller_stock?: UpdateStock_SellerStock[];
  [key: string]: any;
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
  item_id?: number;
  /**
   * Length should be between 1 to 50.
   */
  stock_list?: UpdateStock_Stock[];
  [key: string]: any;
}
/**
 * UpdateStock_Failure sub-interface for UpdateStock_Response
 */
export interface UpdateStock_Failure {
  /**
   * ID of model.
   */
  model_id?: number;
  /**
   * Reason for failure.
   */
  failed_reason?: string;
  [key: string]: any;
}
/**
 * UpdateStock_Success sub-interface for UpdateStock_Response
 */
export interface UpdateStock_Success {
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
  [key: string]: any;
}
/**
 * UpdateStock_Response sub-interface for UpdateStockResponse
 */
export interface UpdateStock_Response {
  /**
   * Fail model list.
   */
  failure_list?: UpdateStock_Failure[];
  /**
   * Success model list.
   */
  success_list?: UpdateStock_Success[];
  [key: string]: any;
}
/**
 * Response data payload for update_stock
 */
export type UpdateStockResponseData = UpdateStock_Response;
/**
 * Response payload for update_stock
 *
 * Use this API to update one item_id for each call, but still can support updating multiple model_ids stock of the same item_id (If you need batch modification, please call multiple times)This API will update only "seller_stock".Whenever there is a promotion ongoing or upcoming, the total stock must be larger than or equal to real-time “reserved_stock” promotion stock (Please check v2.get_item_promotion API for more details). Items that are deleted will not be allowed to modify stock.
 */
export type UpdateStockResponse = FetchResponse<UpdateStockResponseData>;
/**
 * UpdateTierVariation_Model sub-interface for UpdateTierVariationRequest
 */
export interface UpdateTierVariation_Model {
  /**
   * ID of model
   */
  model_id?: number;
  /**
   * Model's tier_variation
   */
  tier_index?: number[];
  [key: string]: any;
}
/**
 * UpdateTierVariation_VariationOption sub-interface for UpdateTierVariation_StandardiseTierVariation
 */
export interface UpdateTierVariation_VariationOption {
  /**
   * standardise tier variation option ID
   */
  variation_option_id?: number;
  /**
   * standardise tier variation option value
   */
  variation_option_name?: string;
  /**
   * ID of image
   */
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
  variation_id?: number;
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
  variation_option_list?: UpdateTierVariation_VariationOption[];
  [key: string]: any;
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
  item_id?: number;
  /**
   * Item's model list
   */
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
 * This api can only be used without changing the tier structure, you can add options, delete options, and update the option image by this api. More detail please check: https://open.shopee.com/developer-guide/219
 */
export type UpdateTierVariationResponse = FetchResponse<UpdateTierVariationResponseData>;
