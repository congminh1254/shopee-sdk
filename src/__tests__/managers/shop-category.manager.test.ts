import { jest } from "@jest/globals";
import { ShopCategoryManager } from "../../managers/shop-category.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetShopCategoryListResponse,
  AddShopCategoryResponse,
  UpdateShopCategoryResponse,
  DeleteShopCategoryResponse,
  AddItemListResponse,
  DeleteItemListResponse,
  GetShopCategoryItemListResponse,
} from "../../schemas/shop-category.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ShopCategoryManager", () => {
  let shopCategoryManager: ShopCategoryManager;
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

    shopCategoryManager = new ShopCategoryManager(mockConfig);
  });

  describe("getShopCategoryList", () => {
    it("should get list of shop categories", async () => {
      const mockResponse: GetShopCategoryListResponse = {
        request_id: "26982ef64176bd5730503d0342514f9e",
        error: "",
        message: "",
        response: {
          shop_categorys: [
            {
              shop_category_id: 114559550,
              status: 2,
              name: "rule-based joandy test",
              sort_weight: 52,
              created_by: "Seller | Rule Selection",
            },
            {
              shop_category_id: 136321997,
              status: 2,
              name: "12345",
              sort_weight: 31,
              created_by: "Seller | Rule Selection",
            },
          ],
          more: true,
          total_count: 45,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.getShopCategoryList({
        page_size: 100,
        page_no: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/get_shop_category_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_size: 100,
            page_no: 1,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_categorys).toHaveLength(2);
      expect(result.response.total_count).toBe(45);
      expect(result.response.more).toBe(true);
    });

    it("should handle pagination for shop categories", async () => {
      const mockResponse: GetShopCategoryListResponse = {
        request_id: "26982ef64176bd5730503d0342514f9e",
        error: "",
        message: "",
        response: {
          shop_categorys: [
            {
              shop_category_id: 147916931,
              status: 2,
              name: "Pants & Leggings",
              sort_weight: -1,
              created_by: "System | Pants & Leggings",
            },
          ],
          more: false,
          total_count: 45,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.getShopCategoryList({
        page_size: 10,
        page_no: 5,
      });

      expect(result.response.more).toBe(false);
      expect(result.response.shop_categorys).toHaveLength(1);
    });
  });

  describe("addShopCategory", () => {
    it("should add a new shop category", async () => {
      const mockResponse: AddShopCategoryResponse = {
        request_id: "7f22f503112102b848045323686d6b6b",
        error: "",
        message: "",
        response: {
          shop_category_id: 29333,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.addShopCategory({
        name: "OA_V2_1",
        sort_weight: 21,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop_category/add_shop_category", {
        method: "POST",
        auth: true,
        body: {
          name: "OA_V2_1",
          sort_weight: 21,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_category_id).toBe(29333);
    });

    it("should add a shop category without sort_weight", async () => {
      const mockResponse: AddShopCategoryResponse = {
        request_id: "7f22f503112102b848045323686d6b6b",
        error: "",
        message: "",
        response: {
          shop_category_id: 29334,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.addShopCategory({
        name: "Summer Collection",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop_category/add_shop_category", {
        method: "POST",
        auth: true,
        body: {
          name: "Summer Collection",
        },
      });

      expect(result.response.shop_category_id).toBe(29334);
    });
  });

  describe("updateShopCategory", () => {
    it("should update a shop category", async () => {
      const mockResponse: UpdateShopCategoryResponse = {
        request_id: "062afea7ca7c225a7966b5bf97570bc1",
        error: "",
        message: "",
        response: {
          status: "NORMAL",
          shop_category_id: 29333,
          sort_weight: 21,
          name: "OA_V2_11",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.updateShopCategory({
        shop_category_id: 29333,
        name: "OA_V2_11",
        status: "NORMAL",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/update_shop_category",
        {
          method: "POST",
          auth: true,
          body: {
            shop_category_id: 29333,
            name: "OA_V2_11",
            status: "NORMAL",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.name).toBe("OA_V2_11");
      expect(result.response.status).toBe("NORMAL");
    });

    it("should update only name of a shop category", async () => {
      const mockResponse: UpdateShopCategoryResponse = {
        request_id: "062afea7ca7c225a7966b5bf97570bc1",
        error: "",
        message: "",
        response: {
          status: "NORMAL",
          shop_category_id: 29333,
          sort_weight: 21,
          name: "Updated Name",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.updateShopCategory({
        shop_category_id: 29333,
        name: "Updated Name",
      });

      expect(result.response.name).toBe("Updated Name");
    });

    it("should update status to INACTIVE", async () => {
      const mockResponse: UpdateShopCategoryResponse = {
        request_id: "062afea7ca7c225a7966b5bf97570bc1",
        error: "",
        message: "",
        response: {
          status: "INACTIVE",
          shop_category_id: 29333,
          sort_weight: 21,
          name: "Test Category",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.updateShopCategory({
        shop_category_id: 29333,
        status: "INACTIVE",
      });

      expect(result.response.status).toBe("INACTIVE");
    });
  });

  describe("deleteShopCategory", () => {
    it("should delete a shop category", async () => {
      const mockResponse: DeleteShopCategoryResponse = {
        request_id: "7d5a89985a362f381d82e6499454ac6f",
        error: "",
        message: "",
        response: {
          shop_category_id: 9209570,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.deleteShopCategory({
        shop_category_id: 9209570,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/shop_category/delete_shop_category",
        {
          method: "POST",
          auth: true,
          body: {
            shop_category_id: 9209570,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_category_id).toBe(9209570);
    });
  });

  describe("addItemList", () => {
    it("should add items to a shop category", async () => {
      const mockResponse: AddItemListResponse = {
        request_id: "443c21064284ea183afc0305de607902",
        error: "",
        message: "",
        response: {
          shop_category_id: 29333,
          current_count: 4,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.addItemList({
        shop_category_id: 29333,
        item_list: [100908152, 100908153, 100908154, 100908155],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop_category/add_item_list", {
        method: "POST",
        auth: true,
        body: {
          shop_category_id: 29333,
          item_list: [100908152, 100908153, 100908154, 100908155],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.current_count).toBe(4);
    });

    it("should handle invalid items when adding", async () => {
      const mockResponse: AddItemListResponse = {
        request_id: "36616164626338323038343831363337",
        error: "",
        message: "",
        response: {
          shop_category_id: 100006468,
          current_count: 1,
          invalid_item_id_list: [
            {
              item_id: 8002383931,
              fail_message: "The item id you provided is not normal. Please check.",
              fail_error: "err_not_normal_item",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.addItemList({
        shop_category_id: 100006468,
        item_list: [100001, 8002383931],
      });

      expect(result.response.invalid_item_id_list).toHaveLength(1);
      expect(result.response.invalid_item_id_list?.[0].item_id).toBe(8002383931);
      expect(result.response.current_count).toBe(1);
    });
  });

  describe("deleteItemList", () => {
    it("should delete items from a shop category", async () => {
      const mockResponse: DeleteItemListResponse = {
        request_id: "2bf799cd6f6bb4a1486519c3def3280c",
        error: "",
        message: "",
        response: {
          shop_category_id: 29333,
          current_count: 0,
          invalid_item_id_list: [
            {
              item_id: 100908152,
              fail_message: "The item id you provided not exist in category. Please check.",
              fail_error: "err_not_exist_item",
            },
            {
              item_id: 100908153,
              fail_message: "The item id you provided not exist in category. Please check.",
              fail_error: "err_not_exist_item",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.deleteItemList({
        shop_category_id: 29333,
        item_list: [100908152, 100908153],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop_category/delete_item_list", {
        method: "POST",
        auth: true,
        body: {
          shop_category_id: 29333,
          item_list: [100908152, 100908153],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.current_count).toBe(0);
      expect(result.response.invalid_item_id_list).toHaveLength(2);
    });

    it("should successfully delete valid items", async () => {
      const mockResponse: DeleteItemListResponse = {
        request_id: "2bf799cd6f6bb4a1486519c3def3280c",
        error: "",
        message: "",
        response: {
          shop_category_id: 29333,
          current_count: 2,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.deleteItemList({
        shop_category_id: 29333,
        item_list: [100908152, 100908153],
      });

      expect(result.response.current_count).toBe(2);
      expect(result.response.invalid_item_id_list).toBeUndefined();
    });
  });

  describe("getItemList", () => {
    it("should get items in a shop category", async () => {
      const mockResponse: GetShopCategoryItemListResponse = {
        request_id: "375ae1023f7396e34904fddfaafed901",
        error: "",
        message: "",
        response: {
          item_list: [100908154, 100908155],
          more: false,
          total_count: 2,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.getItemList({
        shop_category_id: 231232,
        page_size: 20,
        page_no: 4,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/shop_category/get_item_list", {
        method: "GET",
        auth: true,
        params: {
          shop_category_id: 231232,
          page_size: 20,
          page_no: 4,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(2);
      expect(result.response.total_count).toBe(2);
      expect(result.response.more).toBe(false);
    });

    it("should get items with default pagination", async () => {
      const mockResponse: GetShopCategoryItemListResponse = {
        request_id: "375ae1023f7396e34904fddfaafed901",
        error: "",
        message: "",
        response: {
          item_list: [100001, 100002, 100003, 100004, 100005],
          more: true,
          total_count: 150,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.getItemList({
        shop_category_id: 231232,
      });

      expect(result.response.item_list).toHaveLength(5);
      expect(result.response.more).toBe(true);
      expect(result.response.total_count).toBe(150);
    });

    it("should handle empty item list", async () => {
      const mockResponse: GetShopCategoryItemListResponse = {
        request_id: "375ae1023f7396e34904fddfaafed901",
        error: "",
        message: "",
        response: {
          item_list: [],
          more: false,
          total_count: 0,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await shopCategoryManager.getItemList({
        shop_category_id: 231232,
      });

      expect(result.response.item_list).toHaveLength(0);
      expect(result.response.total_count).toBe(0);
    });
  });
});
