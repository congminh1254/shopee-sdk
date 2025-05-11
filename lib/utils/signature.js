import crypto from "crypto";
export function generateSignature(partnerKey, parts) {
    const baseString = parts.join("");
    return crypto.createHmac("sha256", partnerKey).update(baseString).digest("hex");
}
//# sourceMappingURL=signature.js.map