import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { PrincipalManager } from "../../managers/principal.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("PrincipalManager (Generated Tests)", () => {
  let manager: PrincipalManager;
  let mockConfig: ShopeeConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };
    manager = new PrincipalManager(mockConfig);
  });

  describe("getClipVideoPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        timezone: "GMT+8",
        granularity: "month",
        video_list: [
          {
            shop_id: 181050132,
            video_ids: [1453493, 1453494],
            currency: "LOCAL",
          },
        ],
        page_size: 100,
        cursor: 100,
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            total_views: 575,
            unique_viewers: 441,
            video_duration: 2.5,
            average_views_duration: 44.3968253968254,
            likes: 89,
            comments: 3,
            share: 2,
            total_unique_buyers: 2,
            atc_units: 14,
            units_sold: 2,
            orders: 2,
            sales: 420,
            conversion_rate: 0.0034782608695652175,
          },
        ],
        details: [
          {
            region: "SG",
            currency: "LOCAL",
            shop_id: 181050132,
            shop_name: "Huawei Official Store",
            video_id: 1453493,
            video_name: "HUAWEI Mid-Month Madness",
            total_views: 575,
            unique_viewers: 441,
            video_duration: 2.5,
            average_views_duration: 44.3968253968254,
            likes: 89,
            comments: 3,
            share: 2,
            total_unique_buyers: 2,
            atc_units: 14,
            units_sold: 2,
            orders: 2,
            sales: 420,
            conversion_rate: 0.0034782608695652175,
          },
        ],
        next_cursor: 100,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getClipVideoPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_clip_video_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getContentAffiliatePerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        content_list: [
          {
            shop_id: 181050132,
            content_ids: [1388859, 1388860],
            currency: "LOCAL",
          },
        ],
        page_size: 100,
        cursor: 0,
      };
      const exampleResponse = {
        summary: [
          {
            currency: "LOCAL",
            views: 57843,
            likes: 10278,
            comments: 459,
            sales_placed: 6792.25,
            sales_confirmed: 6792.25,
            units_sold_placed: 24,
            units_sold_confirmed: 24,
            orders_placed: 26,
            orders_confirmed: 24,
          },
        ],
        details: [
          {
            region: "SG",
            currency: "LOCAL",
            shop_id: 181050132,
            shop_name: "Huawei Official Store",
            content_id: 1388859,
            content_name: "Huawei Brand Day sale!",
            views: 57843,
            likes: 10278,
            comments: 459,
            sales_placed: 6792.25,
            sales_confirmed: 6792.25,
            units_sold_placed: 24,
            units_sold_confirmed: 24,
            orders_placed: 26,
            orders_confirmed: 24,
          },
        ],
        next_cursor: 100,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getContentAffiliatePerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_content_affiliate_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPrincipalAffiliatePerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        region_list: [
          {
            region: "MY",
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            sales_placed: 2638975.3032753896,
            sales_confirmed: 2614407.688750359,
            units_sold_placed: 20118,
            units_sold_confirmed: 19926,
            orders_placed: 22174,
            orders_confirmed: 19456,
            estimated_commission_placed: 76814.87132010002,
            estimated_commission_confirmed: 76075.89821397001,
            roi_placed: 34.355005195261626,
            roi_confirmed: 34.36578141209865,
            buyers_placed: 20676,
            buyers_confirmed: 18836,
            new_buyers_placed: 15175,
            new_buyers_confirmed: 13618,
          },
        ],
        details: [
          {
            region: "MY",
            currency: "USD",
            sales_placed: 2196698.681816249,
            sales_confirmed: 2176115.5220428193,
            units_sold_placed: 17366,
            units_sold_confirmed: 17202,
            orders_placed: 19287,
            orders_confirmed: 16802,
            estimated_commission_placed: 57418.763793350015,
            estimated_commission_confirmed: 56850.331386400016,
            roi_placed: 38.257505677450006,
            roi_confirmed: 38.27797426988084,
            buyers_placed: 18003,
            buyers_confirmed: 16301,
            new_buyers_placed: 13300,
            new_buyers_confirmed: 11889,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPrincipalAffiliatePerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_affiliate_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPrincipalLivestreamPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        timezone: "GMT+8",
        granularity: "month",
        region_list: [
          {
            region: "MY",
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            orders: 24544,
            buyers: 20011,
            likes: 822271,
            comments: 122356,
            sales_gross: 4939417.062404577,
            units_sold: 25027,
            total_views: 6041612,
            total_live_duration: 8061951,
            unique_viewers: 3850270,
            atc_units: 220831,
            total_livestreams: 472,
            average_live_duration: 17080.40466101695,
            average_views_duration: 47.91673441083353,
            new_followers: 30726,
            new_buyers: 19188,
            existing_buyers: 823,
            sales_net: 3478017.9173450004,
            conversion_rate: 0.004062491930961472,
          },
        ],
        details: [
          {
            region: "MY",
            currency: "USD",
            orders: 23767,
            buyers: 19345,
            likes: 800789,
            comments: 119351,
            sales_gross: 4747505.5402737735,
            units_sold: 24226,
            total_views: 5702168,
            total_live_duration: 6565127,
            unique_viewers: 3616306,
            atc_units: 214603,
            total_livestreams: 313,
            average_live_duration: 20974.846645367412,
            average_views_duration: 47.33443242911413,
            new_followers: 30022,
            new_buyers: 18535,
            existing_buyers: 810,
            sales_net: 3332254.597736,
            conversion_rate: 0.00416806379608598,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPrincipalLivestreamPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_livestream_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPrincipalSalesPerformanceDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        region_list: [
          {
            region: "MY",
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            sales: 512345.6789,
            orders: 2841,
            units_sold: 3017,
            average_basket_size: 180.33497606476593,
            items_per_order: 1.0619500175994367,
            average_selling_price: 169.78683460391116,
            product_clicks: 245611,
            product_views: 438204,
            unique_visitors: 501922,
            item_conversion_rate: 0.006885012912712344,
            order_conversion_rate: 0.01156784118186897,
          },
        ],
        details: [
          {
            region: "MY",
            currency: "USD",
            sales: 264223.328658,
            orders: 1483,
            units_sold: 1527,
            average_basket_size: 178.16812451652055,
            items_per_order: 1.0296695886716116,
            average_selling_price: 173.0342689312377,
            product_clicks: 144826,
            product_views: 267188,
            unique_visitors: 297432,
            item_conversion_rate: 0.005715077024417264,
            order_conversion_rate: 0.010239874055763468,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPrincipalSalesPerformanceDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_sales_performance_detail",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPrincipalVideoPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        timezone: "GMT+8",
        granularity: "month",
        region_list: [
          {
            region: "MY",
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            orders: 5,
            likes: 2,
            comments: 0,
            share: 3,
            sales: 853.395968,
            units_sold: 5,
            effective_views: 651,
            unique_viewers: 771,
            total_video_duration: 0,
            atc_units: 31,
            average_video_duration: 0,
            average_views_duration: 2.1,
            total_unique_buyers: 4,
            conversion_rate: 0.0020601565718994645,
          },
        ],
        details: [
          {
            region: "SG",
            currency: "LOCAL",
            orders: 5,
            likes: 2,
            comments: 0,
            share: 3,
            sales: 1090,
            units_sold: 5,
            effective_views: 651,
            unique_viewers: 771,
            atc_units: 31,
            average_video_duration: 0,
            average_views_duration: 2.63,
            total_unique_buyers: 4,
            conversion_rate: 0.0020601565718994645,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPrincipalVideoPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_principal_video_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSessionLivestreamPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        timezone: "GMT+8",
        granularity: "month",
        session_list: [
          {
            shop_id: 181050132,
            session_ids: [1453493, 1453494],
            currency: "LOCAL",
          },
        ],
        page_size: 100,
        cursor: 0,
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            likes: 11841,
            comments: 2007,
            buyers: 448,
            orders: 508,
            total_views: 201558,
            unique_viewers: 141232,
            total_live_duration: 1025729,
            average_views_duration: 47.39170301348136,
            new_followers: 468,
            atc_units: 4402,
            units_sold: 523,
            sales_gross: 120130.36750199998,
            sales_net: 90505.17313499999,
            conversion_rate: 0.002520366346163387,
          },
        ],
        details: [
          {
            region: "SG",
            currency: "LOCAL",
            likes: 89,
            comments: 3,
            buyers: 2,
            orders: 2,
            shop_id: 181050132,
            shop_name: "Huawei Official Store",
            session_id: 1453493,
            session_name: "HUAWEI Mid-Month Madness",
            total_views: 575,
            unique_viewers: 441,
            total_live_duration: 7262,
            average_views_duration: 44.3968253968254,
            new_followers: 1,
            atc_units: 14,
            units_sold: 2,
            sales_gross: 420,
            sales_net: 420,
            conversion_rate: 0.0034782608695652175,
          },
        ],
        next_cursor: 100,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSessionLivestreamPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_session_livestream_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopAffiliatePerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        shop_list: [
          {
            shop_id: 181050132,
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            sales_placed: 2638975.3032753896,
            sales_confirmed: 2614407.688750359,
            units_sold_placed: 20118,
            units_sold_confirmed: 19926,
            orders_placed: 22174,
            orders_confirmed: 19456,
            estimated_commission_placed: 76814.87132010002,
            estimated_commission_confirmed: 76075.89821397001,
            roi_placed: 34.355005195261626,
            roi_confirmed: 34.36578141209865,
            buyers_placed: 20676,
            buyers_confirmed: 18836,
            new_buyers_placed: 15175,
            new_buyers_confirmed: 13618,
          },
        ],
        details: [
          {
            region: "MY",
            currency: "USD",
            shop_id: 123793634,
            shop_name: "HUAWEI OFFICIAL STORE",
            sales_placed: 2196698.681816249,
            sales_confirmed: 2176115.5220428193,
            units_sold_placed: 17366,
            units_sold_confirmed: 17202,
            orders_placed: 19287,
            orders_confirmed: 16802,
            estimated_commission_placed: 57418.763793350015,
            estimated_commission_confirmed: 56850.331386400016,
            roi_placed: 38.257505677450006,
            roi_confirmed: 38.27797426988084,
            buyers_placed: 18003,
            buyers_confirmed: 16301,
            new_buyers_placed: 13300,
            new_buyers_confirmed: 11889,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopAffiliatePerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_affiliate_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopLivestreamPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        shop_list: [
          {
            shop_id: 181050132,
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            orders: 24544,
            buyers: 20011,
            likes: 822271,
            comments: 122356,
            sales_gross: 4939417.062404577,
            units_sold: 25027,
            total_views: 6041612,
            total_live_duration: 8061951,
            unique_viewers: 3850270,
            atc_units: 220831,
            total_livestreams: 472,
            average_live_duration: 17080.40466101695,
            average_views_duration: 47.91673441083353,
            new_followers: 30726,
            new_buyers: 19188,
            existing_buyers: 823,
            sales_net: 3478017.9173450004,
            conversion_rate: 0.004062491930961472,
          },
        ],
        details: [
          {
            region: "MY",
            currency: "USD",
            orders: 23767,
            buyers: 19345,
            likes: 800789,
            comments: 119351,
            shop_id: 123793634,
            shop_name: "HUAWEI OFFICIAL STORE",
            sales_gross: 4747505.5402737735,
            units_sold: 24226,
            total_views: 5702168,
            total_live_duration: 6565127,
            unique_viewers: 3616306,
            atc_units: 214603,
            total_livestreams: 313,
            average_live_duration: 20974.846645367412,
            average_views_duration: 47.33443242911413,
            new_followers: 30022,
            new_buyers: 18535,
            existing_buyers: 810,
            sales_net: 3332254.597736,
            conversion_rate: 0.00416806379608598,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopLivestreamPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_livestream_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopSalesPerformanceDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-01",
        timezone: "GMT+8",
        granularity: "day",
        shop_list: [
          {
            shop_id: 181050132,
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            sales: 308731.453553,
            orders: 1672,
            units_sold: 1718,
            average_basket_size: 184.64799853648324,
            items_per_order: 1.027511961722488,
            average_selling_price: 179.70398926251454,
            product_clicks: 168951,
            product_views: 302274,
            unique_visitors: 381436,
            item_conversion_rate: 0.005683585091671795,
            order_conversion_rate: 0.009896360483217027,
            flash_sale_sales: 25065.505308,
            flash_sale_orders: 239,
            flash_sale_units_sold: 242,
            voucher_sales: 270680.340725,
            voucher_buyers: 1411,
            voucher_usage_rate: 0.019406593960154143,
            voucher_cir: 0.057889526978686705,
            voucher_cost: 15669.556886999999,
          },
        ],
        details: [
          {
            shop_id: 123456789,
            shop_name: "OFFICIAL STORE",
            shop_region_code: "MY",
            currency: "USD",
            sales: 264223.328658,
            orders: 1483,
            units_sold: 123793634,
            average_basket_size: 178.16812451652055,
            items_per_order: 1.0296695886716116,
            average_selling_price: 173.0342689312377,
            product_clicks: 144826,
            product_views: 267188,
            unique_visitors: 297432,
            item_conversion_rate: 0.005715077024417264,
            order_conversion_rate: 0.010239874055763468,
            atp_top_skus_l1d: 0.9790209790209791,
            atp_top_skus_l30d: 0.8980855855855856,
            atp_live_skus_l1d: 0.9644097222222222,
            atp_live_skus_l30d: 0.7195289206917114,
            flash_sale_sales: 17250.836517,
            flash_sale_orders: 200,
            flash_sale_units_sold: 202,
            voucher_sales: 236492.24125199998,
            voucher_buyers: 1229,
            voucher_usage_rate: 0.018527764658255178,
            voucher_cir: 0.057245252027419355,
            voucher_cost: 13538.057953,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopSalesPerformanceDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_sales_performance_detail",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopVideoPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        timezone: "GMT+8",
        granularity: "month",
        shop_list: [
          {
            shop_id: 181050132,
            currency: "USD",
          },
        ],
      };
      const exampleResponse = {
        summary: [
          {
            currency: "USD",
            orders: 5,
            likes: 2,
            comments: 0,
            share: 3,
            sales: 853.395968,
            units_sold: 5,
            effective_views: 651,
            unique_viewers: 771,
            total_video_duration: 0,
            atc_units: 31,
            average_video_duration: 0,
            average_views_duration: 2.1,
            total_unique_buyers: 4,
            conversion_rate: 0.0020601565718994645,
          },
        ],
        details: [
          {
            region: "SG",
            currency: "LOCAL",
            orders: 5,
            likes: 2,
            comments: 0,
            share: 3,
            shop_id: 181050132,
            shop_name: "Huawei Official Store",
            sales: 1090,
            units_sold: 5,
            effective_views: 651,
            unique_viewers: 771,
            atc_units: 31,
            average_video_duration: 0,
            average_views_duration: 2.1,
            total_unique_buyers: 4,
            conversion_rate: 0.0020601565718994645,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopVideoPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/principal/get_shop_video_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
