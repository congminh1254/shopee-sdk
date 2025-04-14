export class ShopeeSdkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShopeeSdkError';
    }
}
export class ShopeeApiError extends Error {
    constructor(status, data) {
        super(`API Error: ${status} - ${JSON.stringify(data)}`);
        this.name = 'ShopeeApiError';
        this.status = status;
        this.data = data;
    }
}
//# sourceMappingURL=errors.js.map