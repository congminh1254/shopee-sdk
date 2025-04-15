export declare class ShopeeSdkError extends Error {
    constructor(message: string);
}
export declare class ShopeeApiError extends Error {
    readonly status: number;
    readonly data: unknown;
    constructor(status: number, data: unknown);
}
