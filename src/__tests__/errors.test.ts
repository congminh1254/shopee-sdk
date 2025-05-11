import { ShopeeSdkError, ShopeeApiError } from "../errors.js";

describe("ShopeeSdkError", () => {
  it("should create an error with the correct name and message", () => {
    const errorMessage = "Test error message";
    const error = new ShopeeSdkError(errorMessage);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ShopeeSdkError);
    expect(error.name).toBe("ShopeeSdkError");
    expect(error.message).toBe(errorMessage);
  });

  it("should have a proper error stack", () => {
    const error = new ShopeeSdkError("Test error");
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
});

describe("ShopeeApiError", () => {
  it("should create an error with status and data", () => {
    const status = 400;
    const data = { error: "Invalid request", message: "Bad request" };
    const error = new ShopeeApiError(status, data);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ShopeeApiError);
    expect(error.name).toBe("ShopeeApiError");
    expect(error.status).toBe(status);
    expect(error.data).toBe(data);
    expect(error.message).toContain(status.toString());
    expect(error.message).toContain(JSON.stringify(data));
  });

  it("should handle different types of data", () => {
    const testCases = [
      { status: 404, data: { error: "Not found" } },
      { status: 500, data: "Internal server error" },
      { status: 401, data: null },
      { status: 403, data: undefined },
    ];

    testCases.forEach(({ status, data }) => {
      const error = new ShopeeApiError(status, data);
      expect(error.status).toBe(status);
      expect(error.data).toBe(data);
    });
  });

  it("should have a proper error stack", () => {
    const error = new ShopeeApiError(500, { error: "Test error" });
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");
  });
});
