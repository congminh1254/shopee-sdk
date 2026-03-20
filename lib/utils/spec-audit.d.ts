export type EndpointMethod = "GET" | "POST";
export interface EndpointMethodMismatch {
    endpoint: string;
    expectedMethod: EndpointMethod;
    actualMethod: EndpointMethod;
}
export interface EndpointFieldGap {
    endpoint: string;
    fields: string[];
}
export interface EndpointTypeGap {
    endpoint: string;
    missing: Array<"request" | "response">;
}
export interface SpecAuditReport {
    totalSpecs: number;
    totalSdkEndpoints: number;
    missingEndpoints: string[];
    uncoveredSdkEndpoints: string[];
    methodMismatches: EndpointMethodMismatch[];
    endpointTypeGaps: EndpointTypeGap[];
    missingRequestFields: EndpointFieldGap[];
    missingResponseFields: EndpointFieldGap[];
}
export declare function auditRepositorySpecs(repoRoot: string): SpecAuditReport;
