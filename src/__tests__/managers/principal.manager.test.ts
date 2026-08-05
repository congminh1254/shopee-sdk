import { jest } from "@jest/globals";
import { PrincipalManager } from "../../managers/principal.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetClipVideoPerformanceParams,
  GetClipVideoPerformanceResponse,
  GetContentAffiliatePerformanceParams,
  GetContentAffiliatePerformanceResponse,
  GetPrincipalAffiliatePerformanceParams,
  GetPrincipalAffiliatePerformanceResponse,
  GetPrincipalLivestreamPerformanceParams,
  GetPrincipalLivestreamPerformanceResponse,
  GetPrincipalSalesPerformanceDetailParams,
  GetPrincipalSalesPerformanceDetailResponse,
  GetPrincipalVideoPerformanceParams,
  GetPrincipalVideoPerformanceResponse,
  GetSessionLivestreamPerformanceParams,
  GetSessionLivestreamPerformanceResponse,
  GetShopAffiliatePerformanceParams,
  GetShopAffiliatePerformanceResponse,
  GetShopLivestreamPerformanceParams,
  GetShopLivestreamPerformanceResponse,
  GetShopSalesPerformanceDetailParams,
  GetShopSalesPerformanceDetailResponse,
  GetShopVideoPerformanceParams,
  GetShopVideoPerformanceResponse,
} from "../../schemas/principal.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("PrincipalManager", () => {
  let principalManager: PrincipalManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    principalManager = new PrincipalManager(mockConfig);
  });

  describe("getClipVideoPerformance", () => {
    it("should fetch metrics for get_clip_video_performance successfully", async () => {
      const mockResponse: GetClipVideoPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetClipVideoPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getClipVideoPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_clip_video_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContentAffiliatePerformance", () => {
    it("should fetch metrics for get_content_affiliate_performance successfully", async () => {
      const mockResponse: GetContentAffiliatePerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetContentAffiliatePerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getContentAffiliatePerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_content_affiliate_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPrincipalAffiliatePerformance", () => {
    it("should fetch metrics for get_principal_affiliate_performance successfully", async () => {
      const mockResponse: GetPrincipalAffiliatePerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetPrincipalAffiliatePerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getPrincipalAffiliatePerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_affiliate_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPrincipalLivestreamPerformance", () => {
    it("should fetch metrics for get_principal_livestream_performance successfully", async () => {
      const mockResponse: GetPrincipalLivestreamPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetPrincipalLivestreamPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getPrincipalLivestreamPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_livestream_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPrincipalSalesPerformanceDetail", () => {
    it("should fetch metrics for get_principal_sales_performance_detail successfully", async () => {
      const mockResponse: GetPrincipalSalesPerformanceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetPrincipalSalesPerformanceDetailParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getPrincipalSalesPerformanceDetail(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_sales_performance_detail",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPrincipalVideoPerformance", () => {
    it("should fetch metrics for get_principal_video_performance successfully", async () => {
      const mockResponse: GetPrincipalVideoPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetPrincipalVideoPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getPrincipalVideoPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_video_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSessionLivestreamPerformance", () => {
    it("should fetch metrics for get_session_livestream_performance successfully", async () => {
      const mockResponse: GetSessionLivestreamPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetSessionLivestreamPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getSessionLivestreamPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_session_livestream_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShopAffiliatePerformance", () => {
    it("should fetch metrics for get_shop_affiliate_performance successfully", async () => {
      const mockResponse: GetShopAffiliatePerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetShopAffiliatePerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getShopAffiliatePerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_affiliate_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShopLivestreamPerformance", () => {
    it("should fetch metrics for get_shop_livestream_performance successfully", async () => {
      const mockResponse: GetShopLivestreamPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetShopLivestreamPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getShopLivestreamPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_livestream_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShopSalesPerformanceDetail", () => {
    it("should fetch metrics for get_shop_sales_performance_detail successfully", async () => {
      const mockResponse: GetShopSalesPerformanceDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetShopSalesPerformanceDetailParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getShopSalesPerformanceDetail(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_sales_performance_detail",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShopVideoPerformance", () => {
    it("should fetch metrics for get_shop_video_performance successfully", async () => {
      const mockResponse: GetShopVideoPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const params: GetShopVideoPerformanceParams = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "2026-01-01",
        granularity: "2026-01-01",
      };

      const result = await principalManager.getShopVideoPerformance(params);

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_video_performance",
        {
          method: "POST",
          auth: true,
          body: params,
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });
});
