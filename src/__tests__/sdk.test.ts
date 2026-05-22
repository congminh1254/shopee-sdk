import { ShopeeSDK } from "../sdk.js";
import { ShopeeRegion } from "../schemas/region.js";
import { TokenStorage } from "../storage/token-storage.interface.js";
import { AccessToken } from "../schemas/access-token.js";
import { ShopeeSdkError } from "../errors.js";
import { jest } from "@jest/globals";
import { AuthManager } from "../managers/auth.manager.js";
import { Agent } from "node:http";

// Mock the managers
jest.mock("../managers/auth.manager.js");
jest.mock("../managers/product.manager.js");
jest.mock("../managers/order.manager.js");
jest.mock("../managers/public.manager.js");
jest.mock("../managers/push.manager.js");
jest.mock("../storage/custom-token-storage.js");

describe("ShopeeSDK", () => {
  let sdk: ShopeeSDK;
  const mockConfig = {
    partner_id: 12345,
    partner_key: "test_key",
    shop_id: 67890,
  };

  beforeEach(() => {
    sdk = new ShopeeSDK(mockConfig);
  });

  describe("initialization", () => {
    it("should initialize with default configuration", () => {
      expect(sdk).toBeDefined();
      expect(sdk.auth).toBeDefined();
      expect(sdk.product).toBeDefined();
      expect(sdk.order).toBeDefined();
      expect(sdk.public).toBeDefined();
      expect(sdk.push).toBeDefined();
    });

    it("should initialize with custom region", () => {
      const customSdk = new ShopeeSDK({
        ...mockConfig,
        region: ShopeeRegion.CHINA,
      });
      const config = customSdk.getConfig();
      expect(config.region).toBe(ShopeeRegion.CHINA);
    });

    it("should initialize with custom base URL", () => {
      const customUrl = "https://custom.shopee.com/api/v2";
      const customSdk = new ShopeeSDK({
        ...mockConfig,
        base_url: customUrl,
      });
      const config = customSdk.getConfig();
      expect(config.base_url).toBe(customUrl);
    });

    it("should initialize with custom token storage", () => {
      const mockTokenStorage: TokenStorage = {
        store: jest.fn<(token: AccessToken) => Promise<void>>(),
        get: jest.fn<() => Promise<AccessToken | null>>(),
        clear: jest.fn<() => Promise<void>>(),
      };
      const customSdk = new ShopeeSDK(mockConfig, mockTokenStorage);
      expect(customSdk).toBeDefined();
    });
  });

  describe("configuration", () => {
    it("should get current configuration", () => {
      const config = sdk.getConfig();
      expect(config.partner_id).toBe(mockConfig.partner_id);
      expect(config.partner_key).toBe(mockConfig.partner_key);
      expect(config.shop_id).toBe(mockConfig.shop_id);
    });

    it("should set region and update base URL", () => {
      sdk.setRegion(ShopeeRegion.CHINA);
      const config = sdk.getConfig();
      expect(config.region).toBe(ShopeeRegion.CHINA);
      expect(config.base_url).toBeDefined();
    });

    it("should set custom base URL and clear region", () => {
      const customUrl = "https://custom.shopee.com/api/v2";
      sdk.setBaseUrl(customUrl);
      const config = sdk.getConfig();
      expect(config.base_url).toBe(customUrl);
      expect(config.region).toBeUndefined();
    });

    it("should set custom base auth URL and clear region", () => {
      const customAuthUrl = "https://custom.shopee.com/auth";
      sdk.setBaseAuthUrl(customAuthUrl);
      const config = sdk.getConfig();
      expect(config.base_auth_url).toBe(customAuthUrl);
      expect(config.region).toBeUndefined();
    });

    it("should set fetch agent", () => {
      const mockAgent = new Agent();
      sdk.setFetchAgent(mockAgent);
      const config = sdk.getConfig();
      expect(config.agent).toBe(mockAgent);
    });
  });

  describe("authorization", () => {
    it("should generate authorization URL with correct parameters", () => {
      const redirectUri = "https://example.com/callback";
      const url = sdk.getAuthorizationUrl(redirectUri, { state: "csrf_state" });

      expect(url).toContain("https://open.shopee.com/auth");
      expect(url).toContain("partner_id=12345");
      expect(url).toContain("auth_type=seller");
      expect(url).toContain("redirect_uri=" + encodeURIComponent(redirectUri));
      expect(url).toContain("response_type=code");
      expect(url).toContain("state=csrf_state");
    });

    it("should generate sandbox authorization URL when sandbox region is used", () => {
      const sandboxSdk = new ShopeeSDK({
        ...mockConfig,
        region: ShopeeRegion.TEST_GLOBAL,
      });
      const redirectUri = "http://local.host";
      const url = sandboxSdk.getAuthorizationUrl(redirectUri, { auth_type: "supplier" });

      expect(url).toContain("https://open.sandbox.test-stable.shopee.com/auth");
      expect(url).toContain("partner_id=12345");
      expect(url).toContain("auth_type=supplier");
      expect(url).toContain("redirect_uri=" + encodeURIComponent(redirectUri));
      expect(url).toContain("response_type=code");
    });

    it("should generate correct authorization URLs for all ShopeeRegion values", () => {
      const testCases = [
        { region: ShopeeRegion.GLOBAL, expected: "https://open.shopee.com/auth" },
        { region: ShopeeRegion.CHINA, expected: "https://open.shopee.cn/auth" },
        { region: ShopeeRegion.BRAZIL, expected: "https://open.shopee.com.br/auth" },
        {
          region: ShopeeRegion.TEST_GLOBAL,
          expected: "https://open.sandbox.test-stable.shopee.com/auth",
        },
        {
          region: ShopeeRegion.TEST_CHINA,
          expected: "https://open.sandbox.test-stable.shopee.cn/auth",
        },
      ];

      for (const { region, expected } of testCases) {
        const regionalSdk = new ShopeeSDK({
          ...mockConfig,
          region,
        });
        const url = regionalSdk.getAuthorizationUrl("http://local.host");
        expect(url).toContain(expected);
      }
    });

    it("should generate correct URLs based on custom base_url configuration when region is undefined", () => {
      const testCases = [
        {
          base_url: "https://openplatform.test-stable.shopee.cn/api/v2",
          base_auth_url: "https://open.sandbox.test-stable.shopee.cn/auth",
          expected: "https://open.sandbox.test-stable.shopee.cn/auth",
        },
        {
          base_url: "https://openplatform.test-stable.shopee.com.br/api/v2",
          base_auth_url: "https://open.sandbox.test-stable.shopee.com.br/auth",
          expected: "https://open.sandbox.test-stable.shopee.com.br/auth",
        },
        {
          base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
          base_auth_url: "https://open.sandbox.test-stable.shopee.com/auth",
          expected: "https://open.sandbox.test-stable.shopee.com/auth",
        },
        {
          base_url: "https://openplatform.shopee.cn/api/v2",
          base_auth_url: "https://open.shopee.cn/auth",
          expected: "https://open.shopee.cn/auth",
        },
        {
          base_url: "https://openplatform.shopee.com.br/api/v2",
          base_auth_url: "https://open.shopee.com.br/auth",
          expected: "https://open.shopee.com.br/auth",
        },
        {
          base_url: "https://partner.shopeemobile.com/api/v2",
          base_auth_url: "https://open.shopee.com/auth",
          expected: "https://open.shopee.com/auth",
        },
      ];

      for (const { base_url, base_auth_url, expected } of testCases) {
        const customSdk = new ShopeeSDK({
          partner_id: mockConfig.partner_id,
          partner_key: mockConfig.partner_key,
          base_url,
          base_auth_url,
        });
        const url = customSdk.getAuthorizationUrl("http://local.host");
        expect(url).toContain(expected);
      }
    });

    it("should generate different URLs for different redirect URIs", () => {
      const url1 = sdk.getAuthorizationUrl("https://example1.com/callback");
      const url2 = sdk.getAuthorizationUrl("https://example2.com/callback");

      expect(url1).not.toBe(url2);
    });
  });

  describe("authentication", () => {
    it("should authenticate with code and store token", async () => {
      const mockToken: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test_request_id",
        error: "",
        message: "",
      };

      // Mock auth manager's getAccessToken
      const mockGetAccessToken =
        jest.fn<(code: string, shopId?: number, mainAccountId?: number) => Promise<AccessToken>>();
      mockGetAccessToken.mockResolvedValue(mockToken);
      const mockAuthManager = sdk.auth as jest.Mocked<AuthManager>;
      mockAuthManager.getAccessToken = mockGetAccessToken;

      // Mock token storage
      const mockStore = jest.fn<(token: AccessToken) => Promise<void>>();
      const mockTokenStorage: TokenStorage = {
        store: mockStore,
        get: jest.fn<() => Promise<AccessToken | null>>(),
        clear: jest.fn<() => Promise<void>>(),
      };
      sdk["tokenStorage"] = mockTokenStorage;

      const token = await sdk.authenticateWithCode("test_code");

      expect(mockGetAccessToken).toHaveBeenCalledWith("test_code", undefined, undefined);
      expect(mockStore).toHaveBeenCalledWith(mockToken);
      expect(token).toEqual(mockToken);
    });

    it("should get stored token", async () => {
      const mockToken: AccessToken = {
        access_token: "test_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test_request_id",
        error: "",
        message: "",
      };

      // Mock token storage
      const mockGet = jest.fn<() => Promise<AccessToken | null>>();
      mockGet.mockResolvedValue(mockToken);
      const mockTokenStorage: TokenStorage = {
        store: jest.fn<(token: AccessToken) => Promise<void>>(),
        get: mockGet,
        clear: jest.fn<() => Promise<void>>(),
      };
      sdk["tokenStorage"] = mockTokenStorage;

      const token = await sdk.getAuthToken();
      expect(token).toEqual(mockToken);
    });

    it("should refresh token", async () => {
      const oldToken: AccessToken = {
        access_token: "old_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test_request_id",
        error: "",
        message: "",
      };

      const newToken: AccessToken = {
        access_token: "new_token",
        refresh_token: "new_refresh_token",
        expire_in: 3600,
        request_id: "test_request_id",
        error: "",
        message: "",
      };

      // Mock token storage
      const mockGet = jest.fn<() => Promise<AccessToken | null>>();
      mockGet.mockResolvedValue(oldToken);
      const mockStore = jest.fn<(token: AccessToken) => Promise<void>>();
      const mockTokenStorage: TokenStorage = {
        store: mockStore,
        get: mockGet,
        clear: jest.fn<() => Promise<void>>(),
      };
      sdk["tokenStorage"] = mockTokenStorage;

      // Mock auth manager's getRefreshToken
      const mockGetRefreshToken =
        jest.fn<
          (refreshToken: string, shopId?: number, mainAccountId?: number) => Promise<AccessToken>
        >();
      mockGetRefreshToken.mockResolvedValue(newToken);
      const mockAuthManager = sdk.auth as jest.Mocked<AuthManager>;
      mockAuthManager.getRefreshToken = mockGetRefreshToken;

      const token = await sdk.refreshToken();

      expect(mockGetRefreshToken).toHaveBeenCalledWith("test_refresh_token", undefined, undefined);
      expect(mockStore).toHaveBeenCalledWith(newToken);
      expect(token).toEqual(newToken);
    });

    it("should throw error when refreshing without stored token", async () => {
      // Mock token storage to return null
      const mockGet = jest.fn<() => Promise<AccessToken | null>>();
      mockGet.mockResolvedValue(null);
      const mockTokenStorage: TokenStorage = {
        store: jest.fn<(token: AccessToken) => Promise<void>>(),
        get: mockGet,
        clear: jest.fn<() => Promise<void>>(),
      };
      sdk["tokenStorage"] = mockTokenStorage;

      await expect(sdk.refreshToken()).rejects.toThrow(ShopeeSdkError);
    });

    it("should return null when refresh token returns null", async () => {
      const oldToken: AccessToken = {
        access_token: "old_token",
        refresh_token: "test_refresh_token",
        expire_in: 3600,
        request_id: "test_request_id",
        error: "",
        message: "",
      };

      // Mock token storage
      const mockGet = jest.fn<() => Promise<AccessToken | null>>();
      mockGet.mockResolvedValue(oldToken);
      const mockTokenStorage: TokenStorage = {
        store: jest.fn<(token: AccessToken) => Promise<void>>(),
        get: mockGet,
        clear: jest.fn<() => Promise<void>>(),
      };
      sdk["tokenStorage"] = mockTokenStorage;

      // Mock auth manager's getRefreshToken to return null
      const mockGetRefreshToken =
        jest.fn<
          (
            refreshToken: string,
            shopId?: number,
            mainAccountId?: number
          ) => Promise<AccessToken | null>
        >();
      mockGetRefreshToken.mockResolvedValue(null);
      const mockAuthManager = sdk.auth as jest.Mocked<AuthManager>;
      mockAuthManager.getRefreshToken = mockGetRefreshToken as any;

      const token = await sdk.refreshToken();
      expect(token).toBeNull();
    });
  });
});
