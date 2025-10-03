import { jest } from "@jest/globals";
import { TopPicksManager } from "../../managers/top-picks.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddTopPicksResponse,
  DeleteTopPicksResponse,
  GetTopPicksListResponse,
  UpdateTopPicksResponse,
} from "../../schemas/top-picks.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("TopPicksManager", () => {
  let topPicksManager: TopPicksManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    topPicksManager = new TopPicksManager(mockConfig);
  });

  describe("addTopPicks", () => {
    it("should add a new top picks collection", async () => {
      const mockResponse: AddTopPicksResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: false,
              item_list: [
                {
                  item_name: "tools Sep 28 2020 16:57:068",
                  item_id: 3400134771,
                  current_price: 2000.0,
                  inflated_price_of_current_price: 3000.0,
                  sales: 0,
                },
              ],
              top_picks_id: 62,
              name: "test1234",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.addTopPicks({
        name: "test1234",
        item_id_list: [3400134771],
        is_activated: false,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/top_picks/add_top_picks", {
        method: "POST",
        auth: true,
        body: {
          name: "test1234",
          item_id_list: [3400134771],
          is_activated: false,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.collection_list).toHaveLength(1);
      expect(result.response.collection_list[0].top_picks_id).toBe(62);
      expect(result.response.collection_list[0].name).toBe("test1234");
      expect(result.response.collection_list[0].is_activated).toBe(false);
    });

    it("should add an activated top picks collection with multiple items", async () => {
      const mockResponse: AddTopPicksResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: true,
              item_list: [
                {
                  item_name: "Product 1",
                  item_id: 2200040632,
                  current_price: 100.0,
                  inflated_price_of_current_price: 120.0,
                  sales: 50,
                },
                {
                  item_name: "Product 2",
                  item_id: 3000043257,
                  current_price: 200.0,
                  inflated_price_of_current_price: 240.0,
                  sales: 30,
                },
              ],
              top_picks_id: 63,
              name: "test create4",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.addTopPicks({
        name: "test create4",
        item_id_list: [2200040632, 3000043257, 2800026288, 3600031776],
        is_activated: true,
      });

      expect(result.response.collection_list[0].is_activated).toBe(true);
      expect(result.response.collection_list[0].item_list).toHaveLength(2);
    });
  });

  describe("deleteTopPicks", () => {
    it("should delete a top picks collection", async () => {
      const mockResponse: DeleteTopPicksResponse = {
        request_id: "646e5204129e5f9a34a3d008d685f2ed",
        error: "",
        message: "",
        response: {
          top_picks_id: 62,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.deleteTopPicks({
        top_picks_id: 480,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/top_picks/delete_top_picks", {
        method: "POST",
        auth: true,
        body: {
          top_picks_id: 480,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.top_picks_id).toBe(62);
    });
  });

  describe("getTopPicksList", () => {
    it("should get list of all top picks collections", async () => {
      const mockResponse: GetTopPicksListResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: false,
              item_list: [
                {
                  item_name: "tools Sep 28 2020 16:57:068",
                  item_id: 3400134771,
                  current_price: 2000.0,
                  inflated_price_of_current_price: 2100.0,
                  sales: 0,
                },
              ],
              top_picks_id: 62,
              name: "test1234",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.getTopPicksList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/top_picks/get_top_picks_list", {
        method: "GET",
        auth: true,
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.collection_list).toHaveLength(1);
      expect(result.response.collection_list[0].top_picks_id).toBe(62);
    });

    it("should get list with multiple collections", async () => {
      const mockResponse: GetTopPicksListResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: true,
              item_list: [
                {
                  item_name: "Featured Product 1",
                  item_id: 1234567,
                  current_price: 150.0,
                  inflated_price_of_current_price: 180.0,
                  sales: 100,
                },
              ],
              top_picks_id: 1,
              name: "Active Collection",
            },
            {
              is_activated: false,
              item_list: [
                {
                  item_name: "Product 2",
                  item_id: 7654321,
                  current_price: 250.0,
                  inflated_price_of_current_price: 300.0,
                  sales: 50,
                },
              ],
              top_picks_id: 2,
              name: "Inactive Collection",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.getTopPicksList();

      expect(result.response.collection_list).toHaveLength(2);
      expect(result.response.collection_list[0].is_activated).toBe(true);
      expect(result.response.collection_list[1].is_activated).toBe(false);
    });
  });

  describe("updateTopPicks", () => {
    it("should update a top picks collection", async () => {
      const mockResponse: UpdateTopPicksResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: false,
              item_list: [
                {
                  item_name: "tools Sep 28 2020 16:57:068",
                  item_id: 3400134771,
                  current_price: 2000.0,
                  inflated_price_of_current_price: 2000.0,
                  sales: 0,
                },
              ],
              top_picks_id: 62,
              name: "test1234",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.updateTopPicks({
        top_picks_id: 480,
        name: "hotsale3",
        item_id_list: [13232, 1321, 11213],
        is_activated: false,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/top_picks/update_top_picks", {
        method: "POST",
        auth: true,
        body: {
          top_picks_id: 480,
          name: "hotsale3",
          item_id_list: [13232, 1321, 11213],
          is_activated: false,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.collection_list[0].top_picks_id).toBe(62);
    });

    it("should update only specific fields of a collection", async () => {
      const mockResponse: UpdateTopPicksResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: true,
              item_list: [
                {
                  item_name: "Updated Product",
                  item_id: 999,
                  current_price: 500.0,
                  inflated_price_of_current_price: 600.0,
                  sales: 200,
                },
              ],
              top_picks_id: 62,
              name: "Updated Name",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.updateTopPicks({
        top_picks_id: 62,
        name: "Updated Name",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/top_picks/update_top_picks", {
        method: "POST",
        auth: true,
        body: {
          top_picks_id: 62,
          name: "Updated Name",
        },
      });

      expect(result.response.collection_list[0].name).toBe("Updated Name");
    });

    it("should activate a collection", async () => {
      const mockResponse: UpdateTopPicksResponse = {
        request_id: "ce13698485624ddb953e954e17b51229",
        error: "",
        message: "",
        response: {
          collection_list: [
            {
              is_activated: true,
              item_list: [],
              top_picks_id: 62,
              name: "Now Active",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await topPicksManager.updateTopPicks({
        top_picks_id: 62,
        is_activated: true,
      });

      expect(result.response.collection_list[0].is_activated).toBe(true);
    });
  });
});
