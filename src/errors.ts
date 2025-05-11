export class ShopeeSdkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopeeSdkError";
  }
}

export class ShopeeApiError extends Error {
  public readonly status: number;
  public readonly data: unknown;

  constructor(status: number, data: unknown) {
    super(`API Error: ${status} - ${JSON.stringify(data)}`);
    this.name = "ShopeeApiError";
    this.status = status;
    this.data = data;
  }
}
