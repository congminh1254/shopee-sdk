/**
 * Status of follow prizes for filtering in follow prize list query
 */
export var FollowPrizeStatus;
(function (FollowPrizeStatus) {
    /** All follow prizes regardless of status */
    FollowPrizeStatus["ALL"] = "all";
    /** Follow prizes that have not started yet */
    FollowPrizeStatus["UPCOMING"] = "upcoming";
    /** Currently active follow prizes */
    FollowPrizeStatus["ONGOING"] = "ongoing";
    /** Follow prizes that have ended */
    FollowPrizeStatus["EXPIRED"] = "expired";
})(FollowPrizeStatus || (FollowPrizeStatus = {}));
/**
 * Reward type for follow prize
 */
export var FollowPrizeRewardType;
(function (FollowPrizeRewardType) {
    /** Discount - fix amount */
    FollowPrizeRewardType[FollowPrizeRewardType["DISCOUNT_FIX_AMOUNT"] = 1] = "DISCOUNT_FIX_AMOUNT";
    /** Discount - by percentage */
    FollowPrizeRewardType[FollowPrizeRewardType["DISCOUNT_BY_PERCENTAGE"] = 2] = "DISCOUNT_BY_PERCENTAGE";
    /** Coin cash back */
    FollowPrizeRewardType[FollowPrizeRewardType["COIN_CASH_BACK"] = 3] = "COIN_CASH_BACK";
})(FollowPrizeRewardType || (FollowPrizeRewardType = {}));
//# sourceMappingURL=follow-prize.js.map