/**
 * Metric type enum values
 * 1 = Fulfillment Performance
 * 2 = Listing Performance
 * 3 = Customer Service Performance
 */
export var MetricType;
(function (MetricType) {
    MetricType[MetricType["FulfillmentPerformance"] = 1] = "FulfillmentPerformance";
    MetricType[MetricType["ListingPerformance"] = 2] = "ListingPerformance";
    MetricType[MetricType["CustomerServicePerformance"] = 3] = "CustomerServicePerformance";
})(MetricType || (MetricType = {}));
/**
 * Metric unit enum values
 * 1 = Number
 * 2 = Percentage
 * 3 = Second
 * 4 = Day
 * 5 = Hour
 */
export var MetricUnit;
(function (MetricUnit) {
    MetricUnit[MetricUnit["Number"] = 1] = "Number";
    MetricUnit[MetricUnit["Percentage"] = 2] = "Percentage";
    MetricUnit[MetricUnit["Second"] = 3] = "Second";
    MetricUnit[MetricUnit["Day"] = 4] = "Day";
    MetricUnit[MetricUnit["Hour"] = 5] = "Hour";
})(MetricUnit || (MetricUnit = {}));
/**
 * Overall performance rating enum values
 * 1 = Poor
 * 2 = ImprovementNeeded
 * 3 = Good
 * 4 = Excellent
 */
export var PerformanceRating;
(function (PerformanceRating) {
    PerformanceRating[PerformanceRating["Poor"] = 1] = "Poor";
    PerformanceRating[PerformanceRating["ImprovementNeeded"] = 2] = "ImprovementNeeded";
    PerformanceRating[PerformanceRating["Good"] = 3] = "Good";
    PerformanceRating[PerformanceRating["Excellent"] = 4] = "Excellent";
})(PerformanceRating || (PerformanceRating = {}));
/**
 * Violation types that can be used to filter penalty point history
 * These values correspond to different violation categories that might result in penalty points.
 * For a complete list, refer to the Shopee API documentation.
 */
export var ViolationType;
(function (ViolationType) {
    ViolationType[ViolationType["HighLateShipmentRate"] = 5] = "HighLateShipmentRate";
    ViolationType[ViolationType["HighNonFulfillmentRate"] = 6] = "HighNonFulfillmentRate";
    ViolationType[ViolationType["HighNumberOfNonFulfilledOrders"] = 7] = "HighNumberOfNonFulfilledOrders";
    ViolationType[ViolationType["HighNumberOfLateShippedOrders"] = 8] = "HighNumberOfLateShippedOrders";
    ViolationType[ViolationType["ProhibitedListings"] = 9] = "ProhibitedListings";
    ViolationType[ViolationType["CounterfeitIPInfringement"] = 10] = "CounterfeitIPInfringement";
    ViolationType[ViolationType["Spam"] = 11] = "Spam";
    ViolationType[ViolationType["CopyStealImages"] = 12] = "CopyStealImages";
    ViolationType[ViolationType["ReUploadingDeletedListings"] = 13] = "ReUploadingDeletedListings";
    ViolationType[ViolationType["BoughtCounterfeitFromMall"] = 14] = "BoughtCounterfeitFromMall";
    ViolationType[ViolationType["CounterfeitCaughtByShopee"] = 15] = "CounterfeitCaughtByShopee";
    ViolationType[ViolationType["HighPercentageOfPreOrderListings"] = 16] = "HighPercentageOfPreOrderListings";
    ViolationType[ViolationType["ConfirmedFraudAttempts"] = 17] = "ConfirmedFraudAttempts";
    ViolationType[ViolationType["ConfirmedFraudAttemptsWithVouchers"] = 18] = "ConfirmedFraudAttemptsWithVouchers";
    ViolationType[ViolationType["FakeReturnAddress"] = 19] = "FakeReturnAddress";
    ViolationType[ViolationType["ShippingFraudAbuse"] = 20] = "ShippingFraudAbuse";
    ViolationType[ViolationType["HighNonRespondedChat"] = 21] = "HighNonRespondedChat";
    ViolationType[ViolationType["RudeChatReplies"] = 22] = "RudeChatReplies";
    ViolationType[ViolationType["RequestBuyerToCancel"] = 23] = "RequestBuyerToCancel";
    ViolationType[ViolationType["RudeReplyToBuyerReview"] = 24] = "RudeReplyToBuyerReview";
    ViolationType[ViolationType["ViolateReturnRefundPolicy"] = 25] = "ViolateReturnRefundPolicy";
    ViolationType[ViolationType["TierReason"] = 101] = "TierReason";
    ViolationType[ViolationType["MisuseOfShopeesIP"] = 3026] = "MisuseOfShopeesIP";
    ViolationType[ViolationType["ViolateShopNameRegulations"] = 3028] = "ViolateShopNameRegulations";
    ViolationType[ViolationType["DirectTransactionsOutsidePlatform"] = 3030] = "DirectTransactionsOutsidePlatform";
    ViolationType[ViolationType["ShippingEmptyIncompleteParcels"] = 3032] = "ShippingEmptyIncompleteParcels";
    ViolationType[ViolationType["SevereViolationsOnShopeeFeed"] = 3034] = "SevereViolationsOnShopeeFeed";
    ViolationType[ViolationType["SevereViolationsOnShopeeLIVE"] = 3036] = "SevereViolationsOnShopeeLIVE";
    ViolationType[ViolationType["MisuseOfLocalVendorTag"] = 3038] = "MisuseOfLocalVendorTag";
    ViolationType[ViolationType["MisleadingShopTagInListingImage"] = 3040] = "MisleadingShopTagInListingImage";
    ViolationType[ViolationType["CounterfeitIPInfringementTest"] = 3042] = "CounterfeitIPInfringementTest";
    ViolationType[ViolationType["RepeatOffenderIPInfringement"] = 3044] = "RepeatOffenderIPInfringement";
    ViolationType[ViolationType["ViolationOfLiveAnimalsSelling"] = 3046] = "ViolationOfLiveAnimalsSelling";
    ViolationType[ViolationType["ChatSpam"] = 3048] = "ChatSpam";
    ViolationType[ViolationType["HighOverseasReturnRefundsRate"] = 3050] = "HighOverseasReturnRefundsRate";
    ViolationType[ViolationType["PrivacyBreachInBuyerReply"] = 3052] = "PrivacyBreachInBuyerReply";
    ViolationType[ViolationType["OrderBrushing"] = 3054] = "OrderBrushing";
    ViolationType[ViolationType["PornImage"] = 3056] = "PornImage";
    ViolationType[ViolationType["IncorrectProductCategories"] = 3058] = "IncorrectProductCategories";
    ViolationType[ViolationType["ExtremelyHighNonFulfillmentRate"] = 3060] = "ExtremelyHighNonFulfillmentRate";
    ViolationType[ViolationType["AMSOverdueInvoicePayment"] = 3062] = "AMSOverdueInvoicePayment";
    ViolationType[ViolationType["GovernmentRelatedListing"] = 3064] = "GovernmentRelatedListing";
    ViolationType[ViolationType["ListingInvalidGiftedItems"] = 3066] = "ListingInvalidGiftedItems";
    ViolationType[ViolationType["HighNonFulfillmentRateNDD"] = 3068] = "HighNonFulfillmentRateNDD";
    ViolationType[ViolationType["HighLateShipmentRateNDD"] = 3070] = "HighLateShipmentRateNDD";
    ViolationType[ViolationType["OPFRViolationValue"] = 3072] = "OPFRViolationValue";
    ViolationType[ViolationType["DirectTransactionsOutsidePlatformViaChat"] = 3074] = "DirectTransactionsOutsidePlatformViaChat";
    ViolationType[ViolationType["ProhibitedListingsExtreme"] = 3090] = "ProhibitedListingsExtreme";
    ViolationType[ViolationType["ProhibitedListingsHigh"] = 3091] = "ProhibitedListingsHigh";
    ViolationType[ViolationType["ProhibitedListingsMid"] = 3092] = "ProhibitedListingsMid";
    ViolationType[ViolationType["ProhibitedListingsLow"] = 3093] = "ProhibitedListingsLow";
    ViolationType[ViolationType["CounterfeitListingsExtreme"] = 3094] = "CounterfeitListingsExtreme";
    ViolationType[ViolationType["CounterfeitListingsHigh"] = 3095] = "CounterfeitListingsHigh";
    ViolationType[ViolationType["CounterfeitListingsMid"] = 3096] = "CounterfeitListingsMid";
    ViolationType[ViolationType["CounterfeitListingsLow"] = 3097] = "CounterfeitListingsLow";
    ViolationType[ViolationType["SpamListingsExtreme"] = 3098] = "SpamListingsExtreme";
    ViolationType[ViolationType["SpamListingsHigh"] = 3099] = "SpamListingsHigh";
    ViolationType[ViolationType["SpamListingsMid"] = 3100] = "SpamListingsMid";
    ViolationType[ViolationType["SpamListingsLow"] = 3101] = "SpamListingsLow";
    ViolationType[ViolationType["ReturnRefundRateNonIntegrated"] = 3145] = "ReturnRefundRateNonIntegrated";
    ViolationType[ViolationType["PoorProductQuality"] = 4130] = "PoorProductQuality";
})(ViolationType || (ViolationType = {}));
/**
 * Status of punishment records
 */
export var PunishmentStatus;
(function (PunishmentStatus) {
    /** Ongoing punishments */
    PunishmentStatus[PunishmentStatus["Ongoing"] = 1] = "Ongoing";
    /** Ended punishments */
    PunishmentStatus[PunishmentStatus["Ended"] = 2] = "Ended";
})(PunishmentStatus || (PunishmentStatus = {}));
/**
 * Types of shop punishments
 */
export var PunishmentType;
(function (PunishmentType) {
    /** Listings not displayed in category browsing */
    PunishmentType[PunishmentType["ListingsNotDisplayedInCategoryBrowsing"] = 103] = "ListingsNotDisplayedInCategoryBrowsing";
    /** Listings not displayed in search */
    PunishmentType[PunishmentType["ListingsNotDisplayedInSearch"] = 104] = "ListingsNotDisplayedInSearch";
    /** Unable to create new listings */
    PunishmentType[PunishmentType["UnableToCreateNewListings"] = 105] = "UnableToCreateNewListings";
    /** Unable to edit listings */
    PunishmentType[PunishmentType["UnableToEditListings"] = 106] = "UnableToEditListings";
    /** Unable to join marketing campaigns */
    PunishmentType[PunishmentType["UnableToJoinMarketingCampaigns"] = 107] = "UnableToJoinMarketingCampaigns";
    /** No shipping subsidies */
    PunishmentType[PunishmentType["NoShippingSubsidies"] = 108] = "NoShippingSubsidies";
    /** Account is suspended */
    PunishmentType[PunishmentType["AccountSuspended"] = 109] = "AccountSuspended";
    /** Listings not displayed in search (alternative code) */
    PunishmentType[PunishmentType["ListingsNotDisplayedInSearchAlt"] = 600] = "ListingsNotDisplayedInSearchAlt";
    /** Shop listings hide from recommendation */
    PunishmentType[PunishmentType["ShopListingsHideFromRecommendation"] = 601] = "ShopListingsHideFromRecommendation";
    /** Listings not displayed in category browsing (alternative code) */
    PunishmentType[PunishmentType["ListingsNotDisplayedInCategoryBrowsingAlt"] = 602] = "ListingsNotDisplayedInCategoryBrowsingAlt";
    /** Listing Limit is reduced (Tier 1) */
    PunishmentType[PunishmentType["ListingLimitReducedTier1"] = 1109] = "ListingLimitReducedTier1";
    /** Listing Limit is reduced (Tier 2) */
    PunishmentType[PunishmentType["ListingLimitReducedTier2"] = 1110] = "ListingLimitReducedTier2";
    /** Listing Limit is reduced (POL) */
    PunishmentType[PunishmentType["ListingLimitReducedPOL"] = 1111] = "ListingLimitReducedPOL";
    /** Listing Limit is reduced (additional code) */
    PunishmentType[PunishmentType["ListingLimitReducedExtra"] = 1112] = "ListingLimitReducedExtra";
    /** Order Limit */
    PunishmentType[PunishmentType["OrderLimit"] = 2008] = "OrderLimit";
})(PunishmentType || (PunishmentType = {}));
/**
 * Reasons for shop punishments
 */
export var PunishmentReason;
(function (PunishmentReason) {
    /** Tier 1 punishment */
    PunishmentReason[PunishmentReason["Tier1"] = 1] = "Tier1";
    /** Tier 2 punishment */
    PunishmentReason[PunishmentReason["Tier2"] = 2] = "Tier2";
    /** Tier 3 punishment */
    PunishmentReason[PunishmentReason["Tier3"] = 3] = "Tier3";
    /** Tier 4 punishment */
    PunishmentReason[PunishmentReason["Tier4"] = 4] = "Tier4";
    /** Tier 5 punishment */
    PunishmentReason[PunishmentReason["Tier5"] = 5] = "Tier5";
    /** Listing Limit Tier 1 */
    PunishmentReason[PunishmentReason["ListingLimitTier1"] = 1109] = "ListingLimitTier1";
    /** Listing Limit Tier 2 */
    PunishmentReason[PunishmentReason["ListingLimitTier2"] = 1110] = "ListingLimitTier2";
    /** Listing Limit POL */
    PunishmentReason[PunishmentReason["ListingLimitPOL"] = 1111] = "ListingLimitPOL";
})(PunishmentReason || (PunishmentReason = {}));
/**
 * Reason types for listing issues
 */
export var ListingIssueReason;
(function (ListingIssueReason) {
    /** Prohibited listing */
    ListingIssueReason[ListingIssueReason["Prohibited"] = 1] = "Prohibited";
    /** Counterfeit listing */
    ListingIssueReason[ListingIssueReason["Counterfeit"] = 2] = "Counterfeit";
    /** Spam listing */
    ListingIssueReason[ListingIssueReason["Spam"] = 3] = "Spam";
    /** Inappropriate image */
    ListingIssueReason[ListingIssueReason["InappropriateImage"] = 4] = "InappropriateImage";
    /** Insufficient information */
    ListingIssueReason[ListingIssueReason["InsufficientInfo"] = 5] = "InsufficientInfo";
    /** Mall listing improvement needed */
    ListingIssueReason[ListingIssueReason["MallListingImprovement"] = 6] = "MallListingImprovement";
    /** Other listing improvement needed */
    ListingIssueReason[ListingIssueReason["OtherListingImprovement"] = 7] = "OtherListingImprovement";
})(ListingIssueReason || (ListingIssueReason = {}));
//# sourceMappingURL=account-health.js.map