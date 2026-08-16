import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { TopPicksManager } from "../../managers/top-picks.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("TopPicksManager (Generated Tests)", () => {
  let manager: TopPicksManager;
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
    manager = new TopPicksManager(mockConfig);
  });

  describe("addTopPicks", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        name: "test create4",
        item_id_list: [2200040632, 3000043257, 2800026288, 3600031776],
        is_activated: false,
      };
      const exampleResponse = {
        collection_list: [
          {
            is_activated: false,
            item_list: [
              {
                item_name: "the test product one",
                item_id: 123224,
                current_price: 12.1,
                inflated_price_of_current_price: 13.1,
                sales: 21,
              },
            ],
            top_picks_id: 62,
            name: "test create4",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addTopPicks(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/top_picks/add_top_picks",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteTopPicks", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        top_picks_id: 480,
      };
      const exampleResponse = {
        top_picks_id: 480,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteTopPicks(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/top_picks/delete_top_picks",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getTopPicksList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        collection_list: [
          {
            is_activated: false,
            item_list: [
              {
                item_name: "test product one",
                item_id: 1676502,
                current_price: 11,
                inflated_price_of_current_price: 10,
                sales: 11,
              },
            ],
            top_picks_id: 365,
            name: "TEST",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getTopPicksList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/top_picks/get_top_picks_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateTopPicks", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        top_picks_id: 480,
        name: "hotsale3",
        item_id_list: [13232, 1321, 11213],
        is_activated: false,
      };
      const exampleResponse = {
        collection_list: [
          {
            is_activated: false,
            item_list: [
              {
                item_name: "the test product one",
                item_id: 13232,
                current_price: 12.1,
                inflated_price_of_current_price: 11.1,
                sales: 21,
              },
            ],
            top_picks_id: 480,
            name: "hotsale3",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateTopPicks(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/top_picks/update_top_picks",
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
