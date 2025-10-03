/**
 * Bundle deal rule types
 */
export var BundleDealRuleType;
(function (BundleDealRuleType) {
    /** Fixed price for the bundle */
    BundleDealRuleType[BundleDealRuleType["FIX_PRICE"] = 1] = "FIX_PRICE";
    /** Discount percentage */
    BundleDealRuleType[BundleDealRuleType["DISCOUNT_PERCENTAGE"] = 2] = "DISCOUNT_PERCENTAGE";
    /** Discount value */
    BundleDealRuleType[BundleDealRuleType["DISCOUNT_VALUE"] = 3] = "DISCOUNT_VALUE";
})(BundleDealRuleType || (BundleDealRuleType = {}));
/**
 * Bundle deal time status for filtering
 */
export var BundleDealTimeStatus;
(function (BundleDealTimeStatus) {
    /** All bundle deals regardless of status */
    BundleDealTimeStatus[BundleDealTimeStatus["ALL"] = 1] = "ALL";
    /** Bundle deals that have not started yet */
    BundleDealTimeStatus[BundleDealTimeStatus["UPCOMING"] = 2] = "UPCOMING";
    /** Currently active bundle deals */
    BundleDealTimeStatus[BundleDealTimeStatus["ONGOING"] = 3] = "ONGOING";
    /** Bundle deals that have ended */
    BundleDealTimeStatus[BundleDealTimeStatus["EXPIRED"] = 4] = "EXPIRED";
})(BundleDealTimeStatus || (BundleDealTimeStatus = {}));
//# sourceMappingURL=bundle-deal.js.map