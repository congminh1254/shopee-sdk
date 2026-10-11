import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { BuyboxManager } from "../../managers/buybox.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("BuyboxManager (Generated Tests)", () => {
  let manager: BuyboxManager;
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
    manager = new BuyboxManager(mockConfig);
  });

  describe("getBuyboxModelPerformanceonlyforbrnow", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        model_id_list: [600000, 600001],
      };
      const exampleResponse = {
        performance_list: [
          {
            model_id: 600000,
            past_7_days_sold_count: 100,
          },
        ],
        data_updated_time: "2026-01-19",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBuyboxModelPerformanceonlyforbrnow(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/buybox/get_buybox_model_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBuyboxModelsByModelIdonlyforbrnow", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        model_id_list: [600000, 600001],
      };
      const exampleResponse = {
        model_list: [
          {
            model_id: 600000,
            is_model_mapped: true,
            is_eligible: true,
            model_toggle_on_status: false,
            last_updated_time: "2026-01-19",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBuyboxModelsByModelIdonlyforbrnow(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/buybox/get_buybox_models_by_model_id",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBuyboxModelsByShopIdonlyforbrnow", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 0,
        limit: 100,
      };
      const exampleResponse = {
        model_list: [
          {
            model_id: 600000,
            is_model_mapped: true,
            is_eligible: true,
            model_toggle_on_status: false,
            last_updated_time: "2026-01-19",
          },
        ],
        page_info: {
          offset: 0,
          limit: 100,
          total_count: 1,
        },
        shop_id: 600000,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBuyboxModelsByShopIdonlyforbrnow(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/buybox/get_buybox_models_by_shop_id",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBuyboxShopPerformanceonlyforbrnow", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        past_7_days_sold_count: 100,
        total_sold_count: 1000,
        sales: 1234.56,
        data_updated_time: "2026-01-19",
        shop_id: 600000,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBuyboxShopPerformanceonlyforbrnow(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/buybox/get_buybox_shop_performance",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateBuyboxModelEnrollmentonlyforbrnow", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        model_id: 600000,
        model_toggle_on_status: true,
      };
      const exampleResponse = {
        model_id: 600000,
        model_toggle_on_status: true,
        last_updated_time: "2026-01-19",
        shop_id: 600000,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateBuyboxModelEnrollmentonlyforbrnow(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/buybox/update_buybox_model_enrollment",
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
