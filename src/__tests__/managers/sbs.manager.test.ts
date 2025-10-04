import { jest } from "@jest/globals";
import { SbsManager } from "../../managers/sbs.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetBoundWhsInfoResponse,
  GetCurrentInventoryResponse,
  GetExpiryReportResponse,
  GetStockAgingResponse,
  GetStockMovementResponse,
} from "../../schemas/sbs.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("SbsManager", () => {
  let sbsManager: SbsManager;
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

    sbsManager = new SbsManager(mockConfig);
  });

  describe("getBoundWhsInfo", () => {
    it("should get bound warehouse info", async () => {
      const mockResponse: GetBoundWhsInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              shop_id: 67890,
              bound_whs: [
                {
                  whs_region: "SG",
                  whs_ids: "SGL,SGC",
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getBoundWhsInfo({});

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_bound_whs_info", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.list).toHaveLength(1);
      expect(result.response.list[0].shop_id).toBe(67890);
      expect(result.response.list[0].bound_whs[0].whs_region).toBe("SG");
    });
  });

  describe("getCurrentInventory", () => {
    it("should get current inventory with required whs_region", async () => {
      const mockResponse: GetCurrentInventoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          cursor: "eyJDdXJyZW50UGFnZU5vIjoxfQ==",
          item_list: [
            {
              warehouse_item_id: "900625438",
              item_name: "Test Product",
              item_image: "http://img.ws.mms.shopee.sg/test-image.jpg",
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
                      shop_sku_id: "123_456",
                      shop_item_id: "123",
                      shop_model_id: "456",
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getCurrentInventory({
        whs_region: "CN",
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_current_inventory", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "CN",
          page_no: 1,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(1);
      expect(result.response.item_list[0].warehouse_item_id).toBe("900625438");
      expect(result.response.item_list[0].sku_list[0].whs_list[0].sellable_qty).toBe(47);
    });

    it("should get current inventory with filters", async () => {
      const mockResponse: GetCurrentInventoryResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getCurrentInventory({
        whs_region: "SG",
        search_type: 2,
        keyword: "SKU123",
        stock_levels: "1,2",
        category_id: 100002,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_current_inventory", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "SG",
          search_type: 2,
          keyword: "SKU123",
          stock_levels: "1,2",
          category_id: 100002,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExpiryReport", () => {
    it("should get expiry report", async () => {
      const mockResponse: GetExpiryReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              warehouse_item_id: "900625438",
              item_name: "Test Product",
              item_image: "http://mms.img.susercontent.com/test-image.jpg",
              sku_list: [
                {
                  mtsku_id: "900625438_10010402373",
                  model_id: "10010402373",
                  fulfill_mapping_mode: 1,
                  variation: "Yellow,Middle",
                  shop_sku_list: [
                    {
                      shop_sku_id: "123_456",
                      shop_item_id: "123",
                      shop_model_id: "456",
                    },
                  ],
                  whs_list: [
                    {
                      whs_id: "CNN",
                      expiring_qty: 5,
                      expired_qty: 2,
                      expiry_blocked_qty: 1,
                      damaged_qty: 0,
                      normal_qty: 10,
                      total_qty: 18,
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getExpiryReport({
        whs_region: "CN",
        page_no: 1,
        page_size: 10,
        expiry_status: "2,4",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_expiry_report", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "CN",
          page_no: 1,
          page_size: 10,
          expiry_status: "2,4",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(1);
      expect(result.response.item_list[0].sku_list[0].whs_list[0].expiring_qty).toBe(5);
    });

    it("should get expiry report with category filter", async () => {
      const mockResponse: GetExpiryReportResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getExpiryReport({
        whs_region: "ID",
        category_id_l1: 100002,
        whs_ids: "IDL,IDG",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_expiry_report", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "ID",
          category_id_l1: 100002,
          whs_ids: "IDL,IDG",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getStockAging", () => {
    it("should get stock aging report", async () => {
      const mockResponse: GetStockAgingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [
            {
              warehouse_item_id: "900626943",
              item_name: "Test Product",
              item_image: "http://mms.img.susercontent.com/test-image.jpg",
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
                      qty_of_stock_age_one: 10,
                      qty_of_stock_age_two: 5,
                      qty_of_stock_age_three: 3,
                      qty_of_stock_age_four: 2,
                      qty_of_stock_age_five: 1,
                      qty_of_stock_age_six: 0,
                      excess_stock: 0,
                      aging_storage_tag: 0,
                    },
                  ],
                  shop_sku_list: [
                    {
                      shop_sku_id: "123_456",
                      shop_item_id: "123",
                      shop_model_id: "456",
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getStockAging({
        whs_region: "CN",
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_stock_aging", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "CN",
          page_no: 1,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.item_list).toHaveLength(1);
      expect(result.response.item_list[0].sku_list[0].whs_list[0].qty_of_stock_age_one).toBe(10);
    });

    it("should get stock aging with search filters", async () => {
      const mockResponse: GetStockAgingResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getStockAging({
        whs_region: "TH",
        search_type: 1,
        keyword: "Test",
        aging_storage_tag: 1,
        excess_storage_tag: 0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_stock_aging", {
        method: "POST",
        auth: true,
        body: {
          whs_region: "TH",
          search_type: 1,
          keyword: "Test",
          aging_storage_tag: 1,
          excess_storage_tag: 0,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getStockMovement", () => {
    it("should get stock movement report", async () => {
      const mockResponse: GetStockMovementResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total: 3,
          start_time: "2025-02-01",
          end_time: "2025-02-24",
          query_end_time: "2025-02-24",
          item_list: [
            {
              warehouse_item_id: "900626944",
              item_name: "Test Product",
              item_image: "http://img.ws.mms.shopee.sg/test-image.jpg",
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
                      inbound_total: 10,
                      outbound_total: 5,
                      adjust_total: 0,
                      end_on_hand_total: 55,
                    },
                  ],
                  start_qty: {
                    start_on_hand_total: 50,
                    start_sellable: 47,
                    start_reserved: 3,
                    start_unsellable: 0,
                  },
                  end_qty: {
                    end_on_hand_total: 55,
                    end_sellable: 52,
                    end_reserved: 3,
                    end_unsellable: 0,
                  },
                  inbound_qty: {
                    inbound_total: 10,
                    inbound_my: 10,
                    inbound_returned: 0,
                  },
                  outbound_qty: {
                    outbound_total: 5,
                    outbound_sold: 5,
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
                      shop_sku_id: "123_456",
                      shop_item_id: "123",
                      shop_model_id: "456",
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getStockMovement({
        start_time: "2025-02-01",
        end_time: "2025-02-24",
        whs_region: "CN",
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_stock_movement", {
        method: "POST",
        auth: true,
        body: {
          start_time: "2025-02-01",
          end_time: "2025-02-24",
          whs_region: "CN",
          page_no: 1,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.total).toBe(3);
      expect(result.response.item_list).toHaveLength(1);
      expect(result.response.item_list[0].sku_list[0].start_qty.start_on_hand_total).toBe(50);
      expect(result.response.item_list[0].sku_list[0].end_qty.end_on_hand_total).toBe(55);
    });

    it("should get stock movement with all filters", async () => {
      const mockResponse: GetStockMovementResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total: 0,
          start_time: "2025-01-01",
          end_time: "2025-01-31",
          query_end_time: "2025-01-31",
          item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await sbsManager.getStockMovement({
        start_time: "2025-01-01",
        end_time: "2025-01-31",
        whs_region: "MY",
        whs_ids: "MYL,MYC",
        category_id_l1: 100002,
        sku_id: "801866836_10006075010",
        item_id: "801866836",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/sbs/get_stock_movement", {
        method: "POST",
        auth: true,
        body: {
          start_time: "2025-01-01",
          end_time: "2025-01-31",
          whs_region: "MY",
          whs_ids: "MYL,MYC",
          category_id_l1: 100002,
          sku_id: "801866836_10006075010",
          item_id: "801866836",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.total).toBe(0);
    });
  });
});
