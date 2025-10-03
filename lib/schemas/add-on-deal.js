/**
 * Add-on deal promotion types
 */
export var AddOnDealPromotionType;
(function (AddOnDealPromotionType) {
    /** Add-on discount promotion */
    AddOnDealPromotionType[AddOnDealPromotionType["ADD_ON_DISCOUNT"] = 0] = "ADD_ON_DISCOUNT";
    /** Gift with minimum spend promotion */
    AddOnDealPromotionType[AddOnDealPromotionType["GIFT_WITH_MIN_SPEND"] = 1] = "GIFT_WITH_MIN_SPEND";
})(AddOnDealPromotionType || (AddOnDealPromotionType = {}));
/**
 * Add-on deal promotion status for filtering
 */
export var AddOnDealPromotionStatus;
(function (AddOnDealPromotionStatus) {
    /** All add-on deals regardless of status */
    AddOnDealPromotionStatus["ALL"] = "all";
    /** Currently active add-on deals */
    AddOnDealPromotionStatus["ONGOING"] = "ongoing";
    /** Add-on deals that have not started yet */
    AddOnDealPromotionStatus["UPCOMING"] = "upcoming";
    /** Add-on deals that have ended */
    AddOnDealPromotionStatus["EXPIRED"] = "expired";
})(AddOnDealPromotionStatus || (AddOnDealPromotionStatus = {}));
/**
 * Main item status
 */
export var AddOnDealMainItemStatus;
(function (AddOnDealMainItemStatus) {
    /** Deleted status */
    AddOnDealMainItemStatus[AddOnDealMainItemStatus["DELETED"] = 0] = "DELETED";
    /** Active status */
    AddOnDealMainItemStatus[AddOnDealMainItemStatus["ACTIVE"] = 1] = "ACTIVE";
})(AddOnDealMainItemStatus || (AddOnDealMainItemStatus = {}));
/**
 * Sub item status
 */
export var AddOnDealSubItemStatus;
(function (AddOnDealSubItemStatus) {
    /** Deleted status */
    AddOnDealSubItemStatus[AddOnDealSubItemStatus["DELETED"] = 0] = "DELETED";
    /** Active status */
    AddOnDealSubItemStatus[AddOnDealSubItemStatus["ACTIVE"] = 1] = "ACTIVE";
})(AddOnDealSubItemStatus || (AddOnDealSubItemStatus = {}));
//# sourceMappingURL=add-on-deal.js.map