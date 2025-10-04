import { BaseResponse } from "./base.js";
/**
 * Bound warehouse information
 */
export interface BoundWhs {
    /** The warehouse region bound with the shop */
    whs_region: string;
    /** The warehouse id bound with the shop (comma-separated) */
    whs_ids: string;
}
/**
 * Shop with bound warehouses
 */
export interface ShopBoundWhs {
    /** Shop ID */
    shop_id: number;
    /** List of bound warehouses */
    bound_whs: BoundWhs[];
}
/**
 * Parameters for getting bound warehouse info
 */
export type GetBoundWhsInfoParams = Record<string, never>;
/**
 * Response for getting bound warehouse info
 */
export interface GetBoundWhsInfoResponse extends BaseResponse {
    response: {
        /** List of shops with bound warehouses */
        list: ShopBoundWhs[];
    };
}
/**
 * Shop SKU information
 */
export interface ShopSku {
    /** Shop level sku_id = "item_id" _ "model_id" */
    shop_sku_id: string;
    /** shop_item_id = "item_id" in Product Module */
    shop_item_id: string;
    /** shop_model_id = item level model_id */
    shop_model_id: string;
}
/**
 * Warehouse information for current inventory
 */
export interface WhsInventory {
    /** Warehouse ID */
    whs_id: string;
    /** Stock level: -1=No need to calculate; 0=None; 1=Low Stock & No Sellable stock; 2=Low Stock & To replenish; 3=Low Stock & Replenished; 4=Excess */
    stock_level: number;
    /** IR approval but no ASN generated will be included */
    ir_approval_qty: number;
    /** ASN in-transit, ASN pending putaway, Move transfer in transit and Move transfer pending putaway will be included */
    in_transit_pending_putaway_qty: number;
    /** Stocks that are available for sale */
    sellable_qty: number;
    /** Stocks reserved by buyer order, RTS */
    reserved_qty: number;
    /** Stocks in the warehouse that are not available for sale */
    unsellable_qty: number;
    /** Number of units that are above 6 days of sales coverage Days */
    excess_stock: number;
    /** Days that the current sellable and pending inbound inventory are expected to last based on current selling speed */
    coverage_days: number;
    /** Days that the current sellable inventory are expected to last based on current selling speed */
    in_whs_coverage_days: number;
    /** Average daily sold quantity */
    selling_speed: number;
    /** Sales qty last 7 days */
    last_7_sold: number;
    /** Sales qty last 15 days */
    last_15_sold: number;
    /** Sales qty last 30 days */
    last_30_sold: number;
    /** Sales qty last 60 days */
    last_60_sold: number;
    /** Sales qty last 90 days */
    last_90_sold: number;
}
/**
 * SKU information for current inventory
 */
export interface InventorySku {
    /** mtsku id */
    mtsku_id: string;
    /** Warehouse model SKU ID */
    model_id: string;
    /** 0=Null; 1=Bundle SKU; 2=Parent SKU */
    fulfill_mapping_mode: number;
    /** Model name */
    model_name: string;
    /** Not moving tag */
    not_moving_tag: number;
    /** Warehouse list */
    whs_list: WhsInventory[];
    /** Shop SKU list */
    shop_sku_list: ShopSku[];
}
/**
 * Item information for current inventory
 */
export interface InventoryItem {
    /** Warehouse item id */
    warehouse_item_id: string;
    /** Item name */
    item_name: string;
    /** Item image */
    item_image: string;
    /** SKU list */
    sku_list: InventorySku[];
}
/**
 * Parameters for getting current inventory
 */
export interface GetCurrentInventoryParams {
    /** Page number (default: 1) */
    page_no?: number;
    /** Page size, 1-100 (default: 10) */
    page_size?: number;
    /** Search type: 0=All data; 1=Product Name; 2=SKU ID; 3=Variations; 4=Item ID */
    search_type?: number;
    /** Bind value and search_type */
    keyword?: string;
    /** Whs ID list, comma-separated */
    whs_ids?: string;
    /** Not moving tag: Blank=All; 0=No; 1=Yes */
    not_moving_tag?: number;
    /** Inbound pending approval: Blank=All; 0=No; 1=Yes */
    inbound_pending_approval?: number;
    /** Products with inventory: Blank=All; 0=No; 1=Yes */
    products_with_inventory?: number;
    /** Category id (first-tier) */
    category_id?: number;
    /** Stock levels: 1=Low Stock & No Sellable stock; 2=Low Stock & To replenish; 3=Low Stock & Replenished; 4=Excess */
    stock_levels?: string;
    /** Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG */
    whs_region: string;
}
/**
 * Response for getting current inventory
 */
export interface GetCurrentInventoryResponse extends BaseResponse {
    response: {
        /** Cursor for pagination */
        cursor?: string;
        /** List of items */
        item_list: InventoryItem[];
    };
}
/**
 * Warehouse information for expiry report
 */
export interface WhsExpiry {
    /** Warehouse ID */
    whs_id: string;
    /** Stocks that are expiring soon */
    expiring_qty: number;
    /** Stock past expiry date */
    expired_qty: number;
    /** Stocks that are too near to expiry and cannot be sold */
    expiry_blocked_qty: number;
    /** Stock in damaged condition */
    damaged_qty: number;
    /** Stocks that are normal */
    normal_qty: number;
    /** Total stocks on hand */
    total_qty: number;
}
/**
 * SKU information for expiry report
 */
export interface ExpirySku {
    /** mtsku id */
    mtsku_id: string;
    /** Warehouse model SKU ID */
    model_id: string;
    /** 0=Null; 1=Bundle SKU; 2=Parent SKU */
    fulfill_mapping_mode: number;
    /** Variation */
    variation: string;
    /** Shop SKU list */
    shop_sku_list: ShopSku[];
    /** Warehouse list */
    whs_list: WhsExpiry[];
}
/**
 * Item information for expiry report
 */
export interface ExpiryItem {
    /** Warehouse item id */
    warehouse_item_id: string;
    /** Item name */
    item_name: string;
    /** Item image */
    item_image: string;
    /** SKU list */
    sku_list: ExpirySku[];
}
/**
 * Parameters for getting expiry report
 */
export interface GetExpiryReportParams {
    /** Page number (default: 1) */
    page_no?: number;
    /** Page size, 1-40 (default: 10) */
    page_size?: number;
    /** Whs IDs, comma-separated */
    whs_ids?: string;
    /** Expiry status: 0=Expired, 2=Expiring, 4=expiry_blocked, 5=damaged, 6=normal (comma-separated) */
    expiry_status?: string;
    /** Only Level 1 Category can be filtered */
    category_id_l1?: number;
    /** SKU ID */
    sku_id?: string;
    /** Item ID */
    item_id?: string;
    /** Variation */
    variation?: string;
    /** Item name */
    item_name?: string;
    /** Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG */
    whs_region: string;
}
/**
 * Response for getting expiry report
 */
export interface GetExpiryReportResponse extends BaseResponse {
    response: {
        /** List of items */
        item_list: ExpiryItem[];
    };
}
/**
 * Warehouse information for stock aging
 */
export interface WhsStockAging {
    /** Warehouse ID */
    whs_id: string;
    /** 0-30 Days */
    qty_of_stock_age_one: number;
    /** 31-60 Days */
    qty_of_stock_age_two: number;
    /** 61-90 Days */
    qty_of_stock_age_three: number;
    /** 91-120 Days */
    qty_of_stock_age_four: number;
    /** 121-180 Days */
    qty_of_stock_age_five: number;
    /** >180 Days */
    qty_of_stock_age_six: number;
    /** Expired stock */
    excess_stock: number;
    /** Aging storage tag */
    aging_storage_tag: number;
}
/**
 * SKU information for stock aging
 */
export interface StockAgingSku {
    /** mtsku id */
    mtsku_id: string;
    /** Warehouse model SKU ID */
    model_id: string;
    /** 0=Null; 1=Bundle SKU; 2=Parent SKU */
    fulfill_mapping_mode: number;
    /** Model name */
    model_name: string;
    /** Barcode */
    barcode: string;
    /** Warehouse list */
    whs_list: WhsStockAging[];
    /** Shop SKU list */
    shop_sku_list: ShopSku[];
}
/**
 * Item information for stock aging
 */
export interface StockAgingItem {
    /** Warehouse item id */
    warehouse_item_id: string;
    /** Item name */
    item_name: string;
    /** Item image */
    item_image: string;
    /** SKU list */
    sku_list: StockAgingSku[];
}
/**
 * Parameters for getting stock aging
 */
export interface GetStockAgingParams {
    /** Page number (default: 1) */
    page_no?: number;
    /** Page size, 1-100 (default: 10) */
    page_size?: number;
    /** Search type: 1=Product Name; 2=SKU ID; 3=Variations; 4=Item ID */
    search_type?: number;
    /** Bound with search_type */
    keyword?: string;
    /** Whs IDs, comma-separated */
    whs_ids?: string;
    /** Aging storage tag: 0=false; 1=true */
    aging_storage_tag?: number;
    /** Excess storage tag: 0=false; 1=true */
    excess_storage_tag?: number;
    /** L1-level product category ID */
    category_id?: number;
    /** Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG */
    whs_region: string;
}
/**
 * Response for getting stock aging
 */
export interface GetStockAgingResponse extends BaseResponse {
    response: {
        /** List of items */
        item_list: StockAgingItem[];
    };
}
/**
 * Start quantity information
 */
export interface StartQty {
    /** SKU number at the start time */
    start_on_hand_total: number;
    /** Number of sellable SKUs at the start time */
    start_sellable: number;
    /** Number of reserved SKUs at the start time */
    start_reserved: number;
    /** Start unsellable quantity */
    start_unsellable: number;
}
/**
 * End quantity information
 */
export interface EndQty {
    /** Total inventory at the end time */
    end_on_hand_total: number;
    /** End sellable quantity */
    end_sellable: number;
    /** End reserved quantity */
    end_reserved: number;
    /** End unsellable quantity */
    end_unsellable: number;
}
/**
 * Inbound quantity information
 */
export interface InboundQty {
    /** Total inbound quantity during the selected time period */
    inbound_total: number;
    /** Total merchant procurement quantity */
    inbound_my: number;
    /** Total number of SKUs returned by buyers */
    inbound_returned: number;
}
/**
 * Outbound quantity information
 */
export interface OutboundQty {
    /** Total outbound quantity */
    outbound_total: number;
    /** Total sold quantity */
    outbound_sold: number;
    /** Total merchant return quantity */
    outbound_returned: number;
    /** Total disposal quantity */
    outbound_disposed: number;
}
/**
 * Adjust quantity information
 */
export interface AdjustQty {
    /** Total number of SKU changes */
    adjust_total: number;
    /** Total quantity of lost or recovered items */
    adjust_lost_found: number;
    /** Total quantity of transfer orders created by the warehouse */
    adjust_trans_whs: number;
}
/**
 * Warehouse information for stock movement
 */
export interface WhsStockMovement {
    /** Warehouse ID */
    whs_id: string;
    /** Total warehouse inventory at the start time */
    start_on_hand_total: number;
    /** Inbound quantity to the warehouse */
    inbound_total: number;
    /** Outbound quantity from the warehouse */
    outbound_total: number;
    /** Inventory adjustment quantity */
    adjust_total: number;
    /** Total warehouse inventory at the end time */
    end_on_hand_total: number;
}
/**
 * SKU information for stock movement
 */
export interface StockMovementSku {
    /** mtsku id */
    mtsku_id: string;
    /** Model sku id */
    model_id: string;
    /** Variation */
    variation: string;
    /** 0=Null; 1=Bundle SKU; 2=Parent SKU */
    fulfill_mapping_mode: number;
    /** Barcode */
    barcode: string;
    /** Warehouse list */
    whs_list: WhsStockMovement[];
    /** Inventory information at the start time */
    start_qty: StartQty;
    /** Inventory information at the end time */
    end_qty: EndQty;
    /** Inbound information */
    inbound_qty: InboundQty;
    /** Outbound information */
    outbound_qty: OutboundQty;
    /** SKU change information */
    adjust_qty: AdjustQty;
    /** Shop SKU list */
    shop_sku_list: ShopSku[];
}
/**
 * Item information for stock movement
 */
export interface StockMovementItem {
    /** Warehouse item id */
    warehouse_item_id: string;
    /** Item name */
    item_name: string;
    /** Item image */
    item_image: string;
    /** SKU list */
    sku_list: StockMovementSku[];
}
/**
 * Parameters for getting stock movement
 */
export interface GetStockMovementParams {
    /** Page number (default: 1) */
    page_no?: number;
    /** Page size, 1-20 (default: 10) */
    page_size?: number;
    /** Start date in YYYY-MM-DD format (required) */
    start_time: string;
    /** End date in YYYY-MM-DD format (required) */
    end_time: string;
    /** Whs IDs, comma-separated */
    whs_ids?: string;
    /** L1-level category_id */
    category_id_l1?: number;
    /** SKU ID */
    sku_id?: string;
    /** Item ID */
    item_id?: string;
    /** Item name */
    item_name?: string;
    /** Variation */
    variation?: string;
    /** Warehouse region (required): BR, CN, ID, MY, MX, TH, TW, PH, VN, SG */
    whs_region: string;
}
/**
 * Response for getting stock movement
 */
export interface GetStockMovementResponse extends BaseResponse {
    response: {
        /** Total number of items */
        total: number;
        /** Start time */
        start_time: string;
        /** End time */
        end_time: string;
        /** Query end time */
        query_end_time: string;
        /** List of items */
        item_list: StockMovementItem[];
    };
}
