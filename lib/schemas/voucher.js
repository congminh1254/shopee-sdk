/**
 * Status of vouchers for filtering in voucher list query
 */
export var VoucherStatus;
(function (VoucherStatus) {
    /** All vouchers regardless of status */
    VoucherStatus["ALL"] = "all";
    /** Vouchers that have not started yet */
    VoucherStatus["UPCOMING"] = "upcoming";
    /** Currently active vouchers */
    VoucherStatus["ONGOING"] = "ongoing";
    /** Vouchers that have ended */
    VoucherStatus["EXPIRED"] = "expired";
})(VoucherStatus || (VoucherStatus = {}));
//# sourceMappingURL=voucher.js.map