import { jest } from "@jest/globals";
import { ShopeeSDK } from "../sdk.js";
import { ShopeeRegion } from "../schemas/region.js";
import { ShopeeFetch } from "../fetch.js";
import { AccessToken } from "../schemas/access-token.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ShopeeSDK Integration with Mock API", () => {
  let sdk: ShopeeSDK;

  beforeEach(() => {
    jest.clearAllMocks();

    sdk = new ShopeeSDK({
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.SINGAPORE,
    });
  });

  it("should perform complete authentication flow with mock API calls", async () => {
    // Mock the authentication response
    const mockAuthResponse: AccessToken = {
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
      expire_in: 3600,
      request_id: "auth-request-id",
      error: "",
      message: "",
    };

    mockFetch.mockResolvedValueOnce(mockAuthResponse);

    // Authenticate with authorization code
    const token = await sdk.authenticateWithCode("mock_auth_code");

    // Verify the API call was made correctly
    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        partner_id: 12345,
        partner_key: "test_partner_key",
      }),
      "/auth/token/get",
      {
        method: "POST",
        body: {
          code: "mock_auth_code",
          partner_id: 12345,
        },
      }
    );

    // Verify token is returned with calculated expiry
    expect(token).toEqual({
      ...mockAuthResponse,
      expired_at: expect.any(Number),
      shop_id: undefined,
    });
  });

  it("should make authenticated API calls using mock responses", async () => {
    // Mock token storage
    const mockToken: AccessToken = {
      access_token: "stored_access_token",
      refresh_token: "stored_refresh_token",
      expire_in: 3600,
      expired_at: Date.now() + 3600000, // Valid token
      shop_id: 67890,
      request_id: "stored-token-id",
      error: "",
      message: "",
    };

    // Mock token retrieval
    const mockTokenStorage = {
      get: jest.fn().mockResolvedValue(mockToken),
      store: jest.fn(),
      clear: jest.fn(),
    };
    sdk["tokenStorage"] = mockTokenStorage;

    // Mock API response for getting shop info
    const mockShopsResponse = {
      request_id: "shops-request-id",
      error: "",
      message: "",
      shop_list: [
        {
          shop_id: 67890,
          shop_name: "Test Shop",
          region: "SG",
          status: "NORMAL",
          sip_affi_shops: [],
          auth_time: 1640995200,
          expire_time: 1672531200,
        },
      ],
    };

    mockFetch.mockResolvedValueOnce(mockShopsResponse);

    // Make authenticated API call
    const shops = await sdk.public.getShopsByPartner();

    // Verify the API call included authentication parameters
    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        partner_id: 12345,
      }),
      "/public/get_shops_by_partner",
      {
        method: "GET",
        params: {
          partner_id: 12345,
        },
      }
    );

    expect(shops).toEqual(mockShopsResponse);
  });

  it("should handle API errors gracefully with mock error responses", async () => {
    // Mock error response
    const errorResponse = {
      error: "invalid_partner",
      message: "Invalid partner credentials",
      request_id: "error-request-id",
    };

    mockFetch.mockImplementationOnce(() => {
      const error = new Error("HTTP 401 Unauthorized") as Error & { status: number; data: unknown };
      error.status = 401;
      error.data = errorResponse;
      throw error;
    });

    // Attempt API call that will fail
    await expect(sdk.public.getShopeeIpRange()).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        partner_id: 12345,
      }),
      "/public/get_shopee_ip_ranges",
      {
        method: "GET",
      }
    );
  });

  it("should demonstrate complete product management workflow with mocks", async () => {
    // Mock different API responses for a complete workflow

    // 1. Get item list
    const mockItemListResponse = {
      request_id: "item-list-request",
      error: "",
      message: "",
      response: {
        item: [
          {
            item_id: 123456,
            item_status: "NORMAL",
            update_time: 1640995200,
          },
        ],
        total_count: 1,
        has_next_page: false,
        next_offset: 0,
      },
    };

    // 2. Get item details
    const mockItemDetailsResponse = {
      request_id: "item-details-request",
      error: "",
      message: "",
      response: {
        item_list: [
          {
            item_id: 123456,
            category_id: 100001,
            item_name: "Test Product",
            item_sku: "TEST-SKU",
            create_time: 1640995200,
            update_time: 1640995200,
            item_status: "NORMAL",
            has_model: false,
            condition: "NEW",
            size_chart: "",
            item_dangerous: 0,
          },
        ],
      },
    };

    // Set up mock responses in sequence
    mockFetch
      .mockResolvedValueOnce(mockItemListResponse)
      .mockResolvedValueOnce(mockItemDetailsResponse);

    // Execute the workflow
    const itemList = await sdk.product.getItemList({
      offset: 0,
      page_size: 10,
    });

    const itemDetails = await sdk.product.getItemBaseInfo({
      item_id_list: [123456],
    });

    // Verify the calls were made correctly
    expect(mockFetch).toHaveBeenCalledTimes(2);

    expect(mockFetch).toHaveBeenNthCalledWith(1, expect.anything(), "/product/get_item_list", {
      method: "GET",
      auth: true,
      params: {
        offset: 0,
        page_size: 10,
      },
    });

    expect(mockFetch).toHaveBeenNthCalledWith(2, expect.anything(), "/product/get_item_base_info", {
      method: "GET",
      auth: true,
      params: {
        item_id_list: "123456",
      },
    });

    // Verify responses
    expect(itemList).toEqual(mockItemListResponse);
    expect(itemDetails).toEqual(mockItemDetailsResponse);
  });
});
