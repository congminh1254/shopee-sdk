/**
 * Return status enum
 */
export var ReturnStatus;
(function (ReturnStatus) {
    /** Return request initiated */
    ReturnStatus["REQUESTED"] = "REQUESTED";
    /** Return is being processed */
    ReturnStatus["PROCESSING"] = "PROCESSING";
    /** Return has been accepted */
    ReturnStatus["ACCEPTED"] = "ACCEPTED";
    /** Return has been completed */
    ReturnStatus["COMPLETED"] = "COMPLETED";
    /** Return has been cancelled */
    ReturnStatus["CANCELLED"] = "CANCELLED";
})(ReturnStatus || (ReturnStatus = {}));
/**
 * Negotiation status enum
 */
export var NegotiationStatus;
(function (NegotiationStatus) {
    /** Pending seller response */
    NegotiationStatus["PENDING_RESPOND"] = "PENDING_RESPOND";
    /** Negotiation ongoing */
    NegotiationStatus["ONGOING"] = "ONGOING";
    /** Negotiation terminated */
    NegotiationStatus["TERMINATED"] = "TERMINATED";
})(NegotiationStatus || (NegotiationStatus = {}));
/**
 * Seller proof status enum
 */
export var SellerProofStatus;
(function (SellerProofStatus) {
    /** Proof pending */
    SellerProofStatus["PENDING"] = "PENDING";
    /** Proof uploaded */
    SellerProofStatus["UPLOADED"] = "UPLOADED";
    /** Proof not needed */
    SellerProofStatus["NOT_NEEDED"] = "NOT_NEEDED";
})(SellerProofStatus || (SellerProofStatus = {}));
/**
 * Seller compensation status enum
 */
export var SellerCompensationStatus;
(function (SellerCompensationStatus) {
    /** Compensation not required */
    SellerCompensationStatus["NOT_REQUIRED"] = "NOT_REQUIRED";
    /** Compensation request pending */
    SellerCompensationStatus["PENDING_REQUEST"] = "PENDING_REQUEST";
    /** Compensation requested */
    SellerCompensationStatus["COMPENSATION_REQUESTED"] = "COMPENSATION_REQUESTED";
})(SellerCompensationStatus || (SellerCompensationStatus = {}));
/**
 * Return solution enum
 */
export var ReturnSolution;
(function (ReturnSolution) {
    /** Return and refund */
    ReturnSolution["RETURN_REFUND"] = "RETURN_REFUND";
    /** Refund only */
    ReturnSolution["REFUND_ONLY"] = "REFUND_ONLY";
})(ReturnSolution || (ReturnSolution = {}));
//# sourceMappingURL=returns.js.map