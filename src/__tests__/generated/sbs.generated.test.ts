import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { SbsManager } from "../../managers/sbs.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("SbsManager (Generated Tests)", () => {
  let manager: SbsManager;
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
    manager = new SbsManager(mockConfig);
  });

  describe("getBoundWhsInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        list: [
          {
            shop_id: 123,
            bound_whs: [
              {
                whs_region: "SG",
                whs_ids: ["SGL", "SGC"],
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBoundWhsInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_bound_whs_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCurrentInventory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        search_type: 2,
        keyword: "test_string",
        whs_ids: ["IDL", "IDG"],
        not_moving_tag: 0,
        inbound_pending_approval: 0,
        products_with_inventory: 0,
        category_id: 100002,
        stock_levels: "1,2",
        whs_region: "CN",
      };
      const exampleResponse = {
        item_list: [
          {
            warehouse_item_id: "900625438",
            item_name: "跨境商品测试00002 - 1666171590",
            item_image: "http://img.ws.mms.shopee.sg/08b3fc410c8eaa7e3f52b06b486a8658",
            sku_list: [
              {
                mtsku_id: "900625438_10010402373",
                model_id: "10010402373",
                fulfill_mapping_mode: 1,
                model_name: "Yellow,Middle",
                not_moving_tag: 0,
                whs_list: [
                  {
                    whs_id: "CNN",
                    stock_level: -1,
                    ir_approval_qty: 0,
                    in_transit_pending_putaway_qty: 0,
                    sellable_qty: 47,
                    reserved_qty: 3,
                    unsellable_qty: 0,
                    excess_stock: 0,
                    coverage_days: 0.1,
                    in_whs_coverage_days: 0.1,
                    selling_speed: 0.2,
                    last_7_sold: 0,
                    last_15_sold: 0,
                    last_30_sold: 0,
                    last_60_sold: 0,
                    last_90_sold: 0,
                  },
                ],
                shop_sku_list: [
                  {
                    shop_sku_id: "test_string",
                    shop_item_id: "test_string",
                    shop_model_id: "test_string",
                  },
                ],
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCurrentInventory(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_current_inventory",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getExpiryReport", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        whs_ids: ["IDL", "IDG"],
        expiry_status: "2,4",
        category_id_l1: 100002,
        sku_id: "801866836_10006075010",
        item_id: "801866836",
        variation: "test_string",
        item_name: "test_string",
        whs_region: "CN",
      };
      const exampleResponse = {
        item_list: [
          {
            warehouse_item_id: "900625438",
            item_name: "跨境商品测试00002 - 1666171590",
            item_image: "http://mms.img.susercontent.com/08b3fc410c8eaa7e3f52b06b486a8658",
            sku_list: [
              {
                mtsku_id: "900625438_10010402373",
                model_id: "10010402373",
                fulfill_mapping_mode: 1,
                variation: "Yellow,Middle",
                shop_sku_list: [
                  {
                    shop_sku_id: "test_string",
                    shop_item_id: "test_string",
                    shop_model_id: "test_string",
                  },
                ],
                whs_list: [
                  {
                    whs_id: "CNN",
                    expiring_qty: 0,
                    expired_qty: 0,
                    expiry_blocked_qty: 0,
                    damaged_qty: 0,
                    normal_qty: 10,
                    total_qty: 10,
                  },
                ],
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getExpiryReport(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_expiry_report",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getFulfillmentMappingInventoryList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        mtsku_ids: ["58165469687_282851615193", "58165469687_282851615192"],
        page_size: 2,
        next_cursor: "eyJzb3J0X3ZhbHVlcyI6WyI1ODE2NTQ2OTY4N18yODI4NTE2MTUxOTNfTVlTIl19",
      };
      const exampleResponse = {
        list: [
          {
            bundle_mtsku_id: "58165469687_282851615192",
            mapping_type: 3,
            whs_id: "MYS",
            stock_context: {
              physical_sellable_stock: 0,
              mapping_sellable_stock: 0,
              parent_mtsku_list: [
                {
                  parent_mtsku_id: "26050058034_240828857424",
                  parent_mtsku_stock: 0,
                },
              ],
            },
            mapping_formula: "[1 * 26050058034_240828857424, 1 * 58165469687_282851615192]",
          },
        ],
        total: 2,
        next_cursor: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getFulfillmentMappingInventoryList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_fulfillment_mapping_inventory_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getStockAging", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        search_type: 2,
        keyword: "test_string",
        whs_ids: ["IDL", "IDG"],
        aging_storage_tag: 0,
        excess_storage_tag: 0,
        category_id: 100002,
        whs_region: "CN",
      };
      const exampleResponse = {
        item_list: [
          {
            warehouse_item_id: "900626943",
            item_name: "跨境商品测试00002 - 1666171546",
            item_image: "http://mms.img.susercontent.com/08b3fc410c8eaa7e3f52b06b486a8658",
            sku_list: [
              {
                mtsku_id: "900626943_15359982",
                model_id: "15359982",
                fulfill_mapping_mode: 1,
                model_name: "Orange,Large",
                barcode: "1231",
                whs_list: [
                  {
                    whs_id: "CNN",
                    qty_of_stock_age_one: 0,
                    qty_of_stock_age_two: 0,
                    qty_of_stock_age_three: 0,
                    qty_of_stock_age_four: 0,
                    qty_of_stock_age_five: 0,
                    qty_of_stock_age_six: 0,
                    excess_stock: 0,
                    aging_storage_tag: 0,
                  },
                ],
                shop_sku_list: [
                  {
                    shop_sku_id: "test_string",
                    shop_item_id: "test_string",
                    shop_model_id: "test_string",
                  },
                ],
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getStockAging(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_stock_aging",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getStockMovement", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        start_time: "2025-02-01",
        end_time: "2025-02-24",
        whs_ids: ["IDL", "IDG"],
        category_id_l1: 100002,
        sku_id: "900626944_15359986",
        item_id: "900626944",
        item_name: "test_string",
        variation: "test_string",
        whs_region: "CN",
      };
      const exampleResponse = {
        total: 3,
        start_time: "2025-02-01",
        end_time: "2025-02-24",
        query_end_time: "2025-02-24",
        item_list: [
          {
            warehouse_item_id: "900626944",
            item_name: "跨境商品测试00002 - 1666171567",
            item_image: "http://img.ws.mms.shopee.sg/08b3fc410c8eaa7e3f52b06b486a8658",
            sku_list: [
              {
                mtsku_id: "900626944_15359986",
                model_id: "15359986",
                variation: "Orange,Large",
                fulfill_mapping_mode: 0,
                barcode: "11fsfsf",
                whs_list: [
                  {
                    whs_id: "CNN",
                    start_on_hand_total: 50,
                    inbound_total: 0,
                    outbound_total: 0,
                    adjust_total: 0,
                    end_on_hand_total: 50,
                  },
                ],
                start_qty: {
                  start_on_hand_total: 50,
                  start_sellable: 47,
                  start_reserved: 3,
                  start_unsellable: 0,
                },
                end_qty: {
                  end_on_hand_total: 50,
                  end_sellable: 47,
                  end_reserved: 3,
                  end_unsellable: 0,
                },
                inbound_qty: {
                  inbound_total: 0,
                  inbound_my: 0,
                  inbound_returned: 0,
                },
                outbound_qty: {
                  outbound_total: 0,
                  outbound_sold: 0,
                  outbound_returned: 0,
                  outbound_disposed: 0,
                },
                adjust_qty: {
                  adjust_total: 0,
                  adjust_lost_found: 0,
                  adjust_trans_whs: 0,
                },
                shop_sku_list: [
                  {
                    shop_sku_id: "test_string",
                    shop_item_id: "test_string",
                    shop_model_id: "test_string",
                  },
                ],
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getStockMovement(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/sbs/get_stock_movement",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
