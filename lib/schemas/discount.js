/**
 * Status of discounts for filtering in discount list query
 */
export var DiscountStatus;
(function (DiscountStatus) {
    /** All discounts regardless of status */
    DiscountStatus["ALL"] = "all";
    /** Discounts that have not started yet */
    DiscountStatus["UPCOMING"] = "upcoming";
    /** Currently active discounts */
    DiscountStatus["ONGOING"] = "ongoing";
    /** Discounts that have ended */
    DiscountStatus["EXPIRED"] = "expired";
})(DiscountStatus || (DiscountStatus = {}));
//# sourceMappingURL=discount.js.map