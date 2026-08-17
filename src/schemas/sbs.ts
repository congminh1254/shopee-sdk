// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Request parameters for get_bound_whs_info
 *
 * get bound warehouse by shop id
 */
export type GetBoundWhsInfoRequest = Record<string, never>;
/**
 * GetBoundWhsInfoBoundWh sub-interface for GetBoundWhsInfoList
 */
export interface GetBoundWhsInfoBoundWh {
  /**
   * the warehouse region bound with the shop
   */
  whs_region?: string;
  /**
   * the warehouse id bound with the shop
   */
  whs_ids?: string[];
}
/**
 * GetBoundWhsInfoList sub-interface for GetBoundWhsInfoResponseData
 */
export interface GetBoundWhsInfoList {
  shop_id?: number;
  bound_whs?: GetBoundWhsInfoBoundWh[];
}
/**
 * GetBoundWhsInfoResponseData sub-interface for GetBoundWhsInfoResponse
 */
export interface GetBoundWhsInfoResponseData {
  list?: GetBoundWhsInfoList[];
}
/**
 * Response payload for get_bound_whs_info
 *
 * get bound warehouse by shop id
 */
export type GetBoundWhsInfoResponse = FetchResponse<GetBoundWhsInfoResponseData>;
/**
 * Request parameters for get_current_inventory
 *
 * Get Seller Center Current Inventory Page Data
 */
export interface GetCurrentInventoryRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. If empty, the default value is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.If empty, the default value is 10. The value should be between 1 and 100.
   */
  page_size?: number;
  /**
   * 0-All data；1-Product Name；2-SKU ID；3-Variations；4-Item ID
   */
  search_type?: number;
  /**
   * Bind Value and Search_type
   */
  keyword?: string;
  /**
   * Whs ID list, comma-separated
   */
  whs_ids?: string[];
  /**
   * Blank-All；0-No；1-Yes
   */
  not_moving_tag?: number;
  /**
   * Blank-All；0-No；1-Yes
   */
  inbound_pending_approval?: number;
  /**
   * Blank-All；0-No；1-Yes
   */
  products_with_inventory?: number;
  /**
   * Category id. Here you need to call the get_category API to retrieve the first-tier category_id.
   */
  category_id?: number;
  /**
   * 1-Low Stock & No Sellable stock; 2-Low Stock & To replenish; 3-Low Stock & Replenished; 4-Excess
   */
  stock_levels?: string;
  /**
   * The warehouse region you want to query, can only query one region in a requestOptional value: BR、CN、ID、MY、MX、TH、TW、PH、VN、SGIf do not pass, will get error "block by gateway due to invalid cid"
   */
  whs_region: string;
}
/**
 * GetCurrentInventoryWhs sub-interface for GetCurrentInventorySku
 */
export interface GetCurrentInventoryWhs {
  /**
   * Warehouse ID
   */
  whs_id?: string;
  /**
   * -1-No need to calculate stock level；0-None；1-Low Stock & No Sellable stock; 2-Low Stock & To replenish; 3-Low Stock & Replenished; 4-Excess
   */
  stock_level?: number;
  /**
   * IR approval but no ASN generated will be included
   */
  ir_approval_qty?: number;
  /**
   * ASN in-transit，ASN pending putaway, Move transfer in transit and Move transfer pending putaway will be included
   */
  in_transit_pending_putaway_qty?: number;
  /**
   * Stocks that are available for sale. This includes warehouse sellable stock, move transfer & rack transfer reserved stock that available for sale, pre-order stock.This quantity may be greater than qty displayed to buyers as it includes stock reserved for upcoming promotions.
   */
  sellable_qty?: number;
  /**
   * Stocks reserved by buyer order, RTS. And also includes rack transfer reserved stock that are not available for sale
   */
  reserved_qty?: number;
  /**
   * Stocks in the warehouse that are not available for sale. This includes damaged stocks, isolated stock due to expired/near expiring, in warehouse staging location, missing, etc.
   */
  unsellable_qty?: number;
  /**
   * Number of units that are above 6 days of sales coverage Days.
   */
  excess_stock?: number;
  /**
   * Days that the current sellable and pending inbound inventory are expected to last based on current selling speed.
   */
  coverage_days?: number;
  /**
   * Days that the current sellable inventory are expected to last based on current selling speed.
   */
  in_whs_coverage_days?: number;
  /**
   * Average daily sold quantity
   */
  selling_speed?: number;
  /**
   * Sales qty last 7 days
   */
  last_7_sold?: number;
  /**
   * Sales qty last 15 days
   */
  last_15_sold?: number;
  /**
   * Sales qty last 30 days
   */
  last_30_sold?: number;
  /**
   * Sales qty last 60 days
   */
  last_60_sold?: number;
  /**
   * Sales qty last 90 days
   */
  last_90_sold?: number;
}
/**
 * GetCurrentInventoryShopSku sub-interface for GetCurrentInventorySku
 */
export interface GetCurrentInventoryShopSku {
  /**
   * shop level sku_idshop_sku_id="item_id" _ "model_id"
   */
  shop_sku_id?: string;
  /**
   * shop_item_id="item_id" in Product ModuleFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_item_id?: string;
  /**
   * shop_model_id= item level model_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_model_id?: string;
}
/**
 * GetCurrentInventorySku sub-interface for GetCurrentInventoryItem
 */
export interface GetCurrentInventorySku {
  /**
   * mtsku id
   */
  mtsku_id?: string;
  /**
   * Warehouse model SKU IDFor CB global items, this is equal to the global model_id.
   *
   *
   *
   *
   *
   * For local items, it differs from model_id; use shop_model_id to match the model_id
   */
  model_id?: string;
  /**
   * 0-Null；1-Bundle SKU；2-Parent SKU
   */
  fulfill_mapping_mode?: number;
  /**
   * model name
   */
  model_name?: string;
  not_moving_tag?: number;
  /**
   * Info of whs
   */
  whs_list?: GetCurrentInventoryWhs[];
  shop_sku_list?: GetCurrentInventoryShopSku[];
}
/**
 * GetCurrentInventoryItem sub-interface for GetCurrentInventoryResponseData
 */
export interface GetCurrentInventoryItem {
  /**
   * Warehouse item id; To indicate an unique item in a warehouseone warehouse item id can match with multiple shop_item_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  warehouse_item_id?: string;
  /**
   * item name
   */
  item_name?: string;
  /**
   * item image
   */
  item_image?: string;
  /**
   * Data list of mtsku
   */
  sku_list?: GetCurrentInventorySku[];
}
/**
 * GetCurrentInventoryResponseData sub-interface for GetCurrentInventoryResponse
 */
export interface GetCurrentInventoryResponseData {
  /**
   * Data list of item sku
   */
  item_list?: GetCurrentInventoryItem[];
}
/**
 * Response payload for get_current_inventory
 *
 * Get Seller Center Current Inventory Page Data
 */
export type GetCurrentInventoryResponse = FetchResponse<GetCurrentInventoryResponseData>;
/**
 * Request parameters for get_expiry_report
 *
 * Seller Center Expiry Report page data
 */
export interface GetExpiryReportRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. If empty, the default value is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.If empty, the default value is 10. The value should be between 1 and 40.
   */
  page_size?: number;
  whs_ids?: string[];
  /**
   * 0-Expired，2-Expiring，4-expiry_blocked，5-damaged，6-normal。Multiple selections allowed, separated by commas.
   */
  expiry_status?: string;
  /**
   * Only Level 1 Category can be filtered
   */
  category_id_l1?: number;
  sku_id?: string;
  item_id?: string;
  variation?: string;
  item_name?: string;
  /**
   * Num value: BR、CN、ID、MY、MX、TH、TW、PH、VN、SGIf do not pass, will get error "block by gateway due to invalid cid"
   */
  whs_region: string;
}
/**
 * GetExpiryReportShopSku sub-interface for GetExpiryReportSku
 */
export interface GetExpiryReportShopSku {
  /**
   * shop level sku_idshop_sku_id="item_id" _ "model_id"
   */
  shop_sku_id?: string;
  /**
   * shop_item_id="item_id" in Product ModuleFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_item_id?: string;
  /**
   * shop_model_id= item level model_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_model_id?: string;
}
/**
 * GetExpiryReportWhs sub-interface for GetExpiryReportSku
 */
export interface GetExpiryReportWhs {
  /**
   * warehouse ID
   */
  whs_id?: string;
  /**
   * Stocks that are expiring soon and should be sold as soon as possible.
   */
  expiring_qty?: number;
  /**
   * Stock past expiry date.
   */
  expired_qty?: number;
  /**
   * Stocks that are too near to expiry and cannot be sold any more.
   */
  expiry_blocked_qty?: number;
  /**
   * Stock in damaged condition and cannot be sold.
   */
  damaged_qty?: number;
  /**
   * Stocks that are normal.
   */
  normal_qty?: number;
  /**
   * Total stocks on hand.
   */
  total_qty?: number;
}
/**
 * GetExpiryReportSku sub-interface for GetExpiryReportItem
 */
export interface GetExpiryReportSku {
  /**
   * Unique ID for a warehouse SKU"warehouse_item_id"_"warehouse_model_id"
   */
  mtsku_id?: string;
  /**
   * Warehouse model SKU IDFor CB global items, this is equal to the global model_id.For local items, it differs from model_id; use shop_model_id to match the model_id
   */
  model_id?: string;
  /**
   * 0-Null；1-Bundle SKU；2-Parent SKU
   */
  fulfill_mapping_mode?: number;
  variation?: string;
  shop_sku_list?: GetExpiryReportShopSku[];
  whs_list?: GetExpiryReportWhs[];
}
/**
 * GetExpiryReportItem sub-interface for GetExpiryReportResponseData
 */
export interface GetExpiryReportItem {
  /**
   * Warehouse item id; To indicate an unique item in a warehouseone warehouse item id can match with multiple shop_item_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  warehouse_item_id?: string;
  item_name?: string;
  item_image?: string;
  sku_list?: GetExpiryReportSku[];
}
/**
 * GetExpiryReportResponseData sub-interface for GetExpiryReportResponse
 */
export interface GetExpiryReportResponseData {
  item_list?: GetExpiryReportItem[];
}
/**
 * Response payload for get_expiry_report
 *
 * Seller Center Expiry Report page data
 */
export type GetExpiryReportResponse = FetchResponse<GetExpiryReportResponseData>;
/**
 * Request parameters for get_stock_aging
 *
 * Get Seller Center Stock Aging page data
 */
export interface GetStockAgingRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. If empty, the default value is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.If empty, the default value is 10. The value should be between 1 and 100.
   */
  page_size?: number;
  /**
   * 1-Product Name；2-SKU ID；3-Variations；4-Item ID
   */
  search_type?: number;
  /**
   * bound with search_type
   */
  keyword?: string;
  /**
   * split by comma
   */
  whs_ids?: string[];
  /**
   * 0-false；1-true
   */
  aging_storage_tag?: number;
  /**
   * 0-false；1-true
   */
  excess_storage_tag?: number;
  /**
   * L1-level product category ID. You need to call the get_category API to obtain the first-level category_id
   */
  category_id?: number;
  /**
   * BR、CN、ID、MY、MX、TH、TW、PH、VN、SGIf do not pass, will get error "block by gateway due to invalid cid"
   */
  whs_region: string;
}
/**
 * GetStockAgingWhs sub-interface for GetStockAgingSku
 */
export interface GetStockAgingWhs {
  /**
   * Whs id
   */
  whs_id?: string;
  /**
   * 0-30Days
   */
  qty_of_stock_age_one?: number;
  /**
   * 31-60Days
   */
  qty_of_stock_age_two?: number;
  /**
   * 61-90Days
   */
  qty_of_stock_age_three?: number;
  /**
   * 91-120Days
   */
  qty_of_stock_age_four?: number;
  /**
   * 121-180Days
   */
  qty_of_stock_age_five?: number;
  /**
   * >180Days
   */
  qty_of_stock_age_six?: number;
  /**
   * expired stock
   */
  excess_stock?: number;
  aging_storage_tag?: number;
}
/**
 * GetStockAgingShopSku sub-interface for GetStockAgingSku
 */
export interface GetStockAgingShopSku {
  /**
   * shop level sku_idshop_sku_id="item_id" _ "model_id"
   */
  shop_sku_id?: string;
  /**
   * shop_item_id="item_id" in Product ModuleFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_item_id?: string;
  /**
   * shop_model_id= item level model_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  shop_model_id?: string;
}
/**
 * GetStockAgingSku sub-interface for GetStockAgingItem
 */
export interface GetStockAgingSku {
  /**
   * mtsku id
   */
  mtsku_id?: string;
  /**
   * Warehouse model SKU IDFor CB global items, this is equal to the global model_id.For local items, it differs from model_id; use shop_model_id to match the model_id
   */
  model_id?: string;
  /**
   * 0-Null；1-Bundle SKU；2-Parent SKU
   */
  fulfill_mapping_mode?: number;
  /**
   * model name
   */
  model_name?: string;
  barcode?: string;
  /**
   * Info of whs
   */
  whs_list?: GetStockAgingWhs[];
  shop_sku_list?: GetStockAgingShopSku[];
}
/**
 * GetStockAgingItem sub-interface for GetStockAgingResponseData
 */
export interface GetStockAgingItem {
  /**
   * Warehouse item id; To indicate an unique item in a warehouseone warehouse item id can match with multiple shop_item_idFor Global Item, warehouse_item_id=Global Item idFor Local Item, shop_item_id=item_id
   */
  warehouse_item_id?: string;
  /**
   * item name
   */
  item_name?: string;
  /**
   * item image
   */
  item_image?: string;
  /**
   * Data list of mtsku
   */
  sku_list?: GetStockAgingSku[];
}
/**
 * GetStockAgingResponseData sub-interface for GetStockAgingResponse
 */
export interface GetStockAgingResponseData {
  /**
   * Data list of item sku
   */
  item_list?: GetStockAgingItem[];
}
/**
 * Response payload for get_stock_aging
 *
 * Get Seller Center Stock Aging page data
 */
export type GetStockAgingResponse = FetchResponse<GetStockAgingResponseData>;
/**
 * Request parameters for get_stock_movement
 *
 * Get Seller Center，Stock Movement page data
 */
export interface GetStockMovementRequest {
  /**
   * Specifies the page number of data to return in the current call. Starting from 1. if data is more than one page, the page_no can be some entry to start next call. If empty, the default value is 1.
   */
  page_no?: number;
  /**
   * Each result set is returned as a page of entries. Use the "page_size" filters to control the maximum number of entries to retrieve per page (i.e., per call), and the "page_no" to start next call. This integer value is used to specify the maximum number of entries to return in a single "page" of data.If empty, the default value is 10. The value should be between 1 and 20.
   */
  page_size?: number;
  /**
   * Start date in YYYY-MM-DD format. Only data within the past 1 year can be queried, and the time range must not exceed 90 days.
   */
  start_time: string;
  /**
   * End date in YYYY-MM-DD format. Only data within the past 1 year can be queried, and the time range must not exceed 90 days.
   */
  end_time: string;
  /**
   * Multiple warehouse_id values should be separated by commas.
   */
  whs_ids?: string[];
  /**
   * L1-level category_id. You need to call the get_category API to retrieve the first-level category_id.
   */
  category_id_l1?: number;
  sku_id?: string;
  item_id?: string;
  /**
   * Product Name Filter
   */
  item_name?: string;
  variation?: string;
  /**
   * Warehouse Region. Enum values: BR, CN, ID, MY, MX, TH, TW, PH, VN, SGIf do not pass, will get error "block by gateway due to invalid cid"
   */
  whs_region: string;
}
/**
 * GetStockMovementWhs sub-interface for GetStockMovementSku
 */
export interface GetStockMovementWhs {
  /**
   * Whs id
   */
  whs_id?: string;
  /**
   * Total warehouse inventory at the start time
   */
  start_on_hand_total?: number;
  /**
   * Inbound quantity to the warehouse during the selected time period.
   */
  inbound_total?: number;
  /**
   * Outbound quantity from the warehouse during the selected time period
   */
  outbound_total?: number;
  /**
   * Inventory adjustment quantity in the warehouse during the selected time period
   */
  adjust_total?: number;
  /**
   * Total warehouse inventory at the end time.
   */
  end_on_hand_total?: number;
}
/**
 * GetStockMovementStartQty sub-interface for GetStockMovementSku
 */
export interface GetStockMovementStartQty {
  /**
   * sku number at the start time
   */
  start_on_hand_total?: number;
  /**
   * Number of sellable SKUs at the start time
   */
  start_sellable?: number;
  /**
   * Number of reserved SKUs at the start time.
   */
  start_reserved?: number;
  start_unsellable?: number;
}
/**
 * GetStockMovementEndQty sub-interface for GetStockMovementSku
 */
export interface GetStockMovementEndQty {
  /**
   * Total inventory at the end time.
   */
  end_on_hand_total?: number;
  end_sellable?: number;
  end_reserved?: number;
  end_unsellable?: number;
}
/**
 * GetStockMovementInboundQty sub-interface for GetStockMovementSku
 */
export interface GetStockMovementInboundQty {
  /**
   * Total inbound quantity during the selected time period
   */
  inbound_total?: number;
  /**
   * Total merchant procurement quantity during the selected time period.
   */
  inbound_my?: number;
  /**
   * Total number of SKUs returned by buyers and received into the warehouse during the selected time period.
   */
  inbound_returned?: number;
}
/**
 * GetStockMovementOutboundQty sub-interface for GetStockMovementSku
 */
export interface GetStockMovementOutboundQty {
  /**
   * Total outbound quantity during the selected time period.
   */
  outbound_total?: number;
  /**
   * "Total sold quantity during the selected time period."
   */
  outbound_sold?: number;
  /**
   * Total merchant return quantity during the selected time period.
   */
  outbound_returned?: number;
  /**
   * Total disposal quantity during the selected time period.
   */
  outbound_disposed?: number;
}
/**
 * GetStockMovementAdjustQty sub-interface for GetStockMovementSku
 */
export interface GetStockMovementAdjustQty {
  /**
   * "Total number of SKU changes during the selected time period."
   */
  adjust_total?: number;
  /**
   * "Total quantity of lost or recovered items during the selected time period."
   */
  adjust_lost_found?: number;
  /**
   * Total quantity of transfer orders created by the warehouse during the selected time period
   */
  adjust_trans_whs?: number;
}
/**
 * GetStockMovementShopSku sub-interface for GetStockMovementSku
 */
export interface GetStockMovementShopSku {
  /**
   * shop level sku_id  shop_sku_id="item_id" _ "model_id"
   */
  shop_sku_id?: string;
  /**
   * shop_item_id="item_id" in Product Module
   */
  shop_item_id?: string;
  /**
   * shop_model_id= item level model_id
   */
  shop_model_id?: string;
}
/**
 * GetStockMovementSku sub-interface for GetStockMovementItem
 */
export interface GetStockMovementSku {
  /**
   * mtsku id
   */
  mtsku_id?: string;
  /**
   * model sku id
   */
  model_id?: string;
  variation?: string;
  /**
   * 0-Null；1-Bundle SKU；2-Parent SKU
   */
  fulfill_mapping_mode?: number;
  barcode?: string;
  /**
   * Info of whs
   */
  whs_list?: GetStockMovementWhs[];
  /**
   * Inventory information at the start time.
   */
  start_qty?: GetStockMovementStartQty;
  end_qty?: GetStockMovementEndQty;
  /**
   * Inbound information during the selected time period
   */
  inbound_qty?: GetStockMovementInboundQty;
  outbound_qty?: GetStockMovementOutboundQty;
  /**
   * "SKU change information during the selected time period."
   */
  adjust_qty?: GetStockMovementAdjustQty;
  shop_sku_list?: GetStockMovementShopSku[];
}
/**
 * GetStockMovementItem sub-interface for GetStockMovementResponseData
 */
export interface GetStockMovementItem {
  /**
   * Warehouse item id; To indicate an unique item in a warehouseone warehouse item id can match with multiple shop_item_id
   */
  warehouse_item_id?: string;
  /**
   * item name
   */
  item_name?: string;
  /**
   * item image
   */
  item_image?: string;
  /**
   * Data list of mtsku
   */
  sku_list?: GetStockMovementSku[];
}
/**
 * GetStockMovementResponseData sub-interface for GetStockMovementResponse
 */
export interface GetStockMovementResponseData {
  total?: number;
  start_time?: string;
  end_time?: string;
  query_end_time?: string;
  /**
   * Data list of item sku
   */
  item_list?: GetStockMovementItem[];
}
/**
 * Response payload for get_stock_movement
 *
 * Get Seller Center，Stock Movement page data
 */
export type GetStockMovementResponse = FetchResponse<GetStockMovementResponseData>;
