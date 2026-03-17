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
export interface SpecAuditReport {
    totalSpecs: number;
    totalSdkEndpoints: number;
    missingEndpoints: string[];
    methodMismatches: EndpointMethodMismatch[];
    missingRequestFields: EndpointFieldGap[];
    missingResponseFields: EndpointFieldGap[];
}
export declare function auditRepositorySpecs(repoRoot: string): SpecAuditReport;
