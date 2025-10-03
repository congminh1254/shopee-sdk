/**
 * Status of shop flash sale
 */
export var ShopFlashSaleStatus;
(function (ShopFlashSaleStatus) {
    /** Deleted */
    ShopFlashSaleStatus[ShopFlashSaleStatus["DELETED"] = 0] = "DELETED";
    /** Enabled */
    ShopFlashSaleStatus[ShopFlashSaleStatus["ENABLED"] = 1] = "ENABLED";
    /** Disabled */
    ShopFlashSaleStatus[ShopFlashSaleStatus["DISABLED"] = 2] = "DISABLED";
    /** System rejected */
    ShopFlashSaleStatus[ShopFlashSaleStatus["SYSTEM_REJECTED"] = 3] = "SYSTEM_REJECTED";
})(ShopFlashSaleStatus || (ShopFlashSaleStatus = {}));
/**
 * State/type of shop flash sale
 */
export var ShopFlashSaleType;
(function (ShopFlashSaleType) {
    /** Upcoming */
    ShopFlashSaleType[ShopFlashSaleType["UPCOMING"] = 1] = "UPCOMING";
    /** Ongoing */
    ShopFlashSaleType[ShopFlashSaleType["ONGOING"] = 2] = "ONGOING";
    /** Expired */
    ShopFlashSaleType[ShopFlashSaleType["EXPIRED"] = 3] = "EXPIRED";
})(ShopFlashSaleType || (ShopFlashSaleType = {}));
/**
 * Status of items/models in shop flash sale
 */
export var ShopFlashSaleItemStatus;
(function (ShopFlashSaleItemStatus) {
    /** Disabled */
    ShopFlashSaleItemStatus[ShopFlashSaleItemStatus["DISABLED"] = 0] = "DISABLED";
    /** Enabled */
    ShopFlashSaleItemStatus[ShopFlashSaleItemStatus["ENABLED"] = 1] = "ENABLED";
    /** Deleted */
    ShopFlashSaleItemStatus[ShopFlashSaleItemStatus["DELETED"] = 2] = "DELETED";
    /** System rejected */
    ShopFlashSaleItemStatus[ShopFlashSaleItemStatus["SYSTEM_REJECTED"] = 4] = "SYSTEM_REJECTED";
    /** Manual rejected */
    ShopFlashSaleItemStatus[ShopFlashSaleItemStatus["MANUAL_REJECTED"] = 5] = "MANUAL_REJECTED";
})(ShopFlashSaleItemStatus || (ShopFlashSaleItemStatus = {}));
//# sourceMappingURL=shop-flash-sale.js.map