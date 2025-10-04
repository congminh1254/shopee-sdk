import { jest } from "@jest/globals";
import { FbsManager } from "../../managers/fbs.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  QueryBrShopEnrollmentStatusResponse,
  QueryBrShopBlockStatusResponse,
  QueryBrShopInvoiceErrorResponse,
  QueryBrSkuBlockStatusResponse,
} from "../../schemas/fbs.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("FbsManager", () => {
  let fbsManager: FbsManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.BRAZIL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    fbsManager = new FbsManager(mockConfig);
  });

  describe("queryBrShopEnrollmentStatus", () => {
    it("should query BR shop enrollment status with enable enrollment", async () => {
      const mockResponse: QueryBrShopEnrollmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 67890,
          enrollment_status: 1, // enable enrollment
          enable_enrollment_time: 1704067200,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopEnrollmentStatus({});

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_enrollment_status",
        {
          method: "POST",
          auth: true,
          body: {},
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_id).toBe(67890);
      expect(result.response.enrollment_status).toBe(1);
      expect(result.response.enable_enrollment_time).toBe(1704067200);
    });

    it("should query BR shop enrollment status with disable enrollment", async () => {
      const mockResponse: QueryBrShopEnrollmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 67890,
          enrollment_status: 2, // disable enrollment
          enable_enrollment_time: 1704067200,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopEnrollmentStatus({});

      expect(result.response.enrollment_status).toBe(2);
    });

    it("should query BR shop enrollment status with already enrollment", async () => {
      const mockResponse: QueryBrShopEnrollmentStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 67890,
          enrollment_status: 3, // already enrollment
          enable_enrollment_time: 1704067200,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopEnrollmentStatus({});

      expect(result.response.enrollment_status).toBe(3);
    });
  });

  describe("queryBrShopBlockStatus", () => {
    it("should query BR shop block status when not blocked", async () => {
      const mockResponse: QueryBrShopBlockStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 67890,
          is_block: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopBlockStatus({});

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_block_status",
        {
          method: "POST",
          auth: true,
          body: {},
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_id).toBe(67890);
      expect(result.response.is_block).toBe(false);
    });

    it("should query BR shop block status when blocked", async () => {
      const mockResponse: QueryBrShopBlockStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_id: 67890,
          is_block: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopBlockStatus({});

      expect(result.response.is_block).toBe(true);
    });
  });

  describe("queryBrShopInvoiceError", () => {
    it("should query BR shop invoice errors with default parameters", async () => {
      const mockResponse: QueryBrShopInvoiceErrorResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total: 2,
          list: [
            {
              shop_id: 67890,
              biz_request_type: 1, // Inbound
              biz_request_id: "IBR12345",
              fail_reason: "Invalid tax information",
              fail_type: 1, // sku tax info error
              invoice_deadline_time: 1704153600,
              shop_sku_list: [
                {
                  shop_item_id: 123456,
                  shop_model_id: 789012,
                  shop_item_name: "Test Product A",
                  shop_model_name: "Red",
                  fail_reason: "Missing NCM code",
                },
              ],
              invoice_id: "INV12345",
              reminder_desc: "Please update tax information within 7 days",
            },
            {
              shop_id: 67890,
              biz_request_type: 3, // Sales order invoice
              biz_request_id: "ORD67890",
              fail_reason: "Seller tax info error",
              fail_type: 2, // seller tax info error
              invoice_deadline_time: 1704240000,
              shop_sku_list: [
                {
                  shop_item_id: 234567,
                  shop_model_id: 890123,
                  shop_item_name: "Test Product B",
                  shop_model_name: "Blue",
                  fail_reason: "Invalid CNPJ",
                },
              ],
              invoice_id: "INV67890",
              reminder_desc: "Update seller information immediately",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopInvoiceError({});

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_invoice_error",
        {
          method: "POST",
          auth: true,
          body: {},
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.total).toBe(2);
      expect(result.response.list).toHaveLength(2);
      expect(result.response.list[0].biz_request_type).toBe(1);
      expect(result.response.list[0].fail_type).toBe(1);
      expect(result.response.list[0].shop_sku_list).toHaveLength(1);
      expect(result.response.list[1].biz_request_type).toBe(3);
      expect(result.response.list[1].fail_type).toBe(2);
    });

    it("should query BR shop invoice errors with pagination", async () => {
      const mockResponse: QueryBrShopInvoiceErrorResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total: 0,
          list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopInvoiceError({
        page_no: 2,
        page_size: 50,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_invoice_error",
        {
          method: "POST",
          auth: true,
          body: {
            page_no: 2,
            page_size: 50,
          },
        }
      );

      expect(result.response.total).toBe(0);
      expect(result.response.list).toHaveLength(0);
    });

    it("should handle invoice errors for different business types", async () => {
      const mockResponse: QueryBrShopInvoiceErrorResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total: 5,
          list: [
            {
              shop_id: 67890,
              biz_request_type: 2, // Return From Warehouse
              biz_request_id: "RTS12345",
              fail_reason: "RTS invoice error",
              fail_type: 1,
              invoice_deadline_time: 1704153600,
              shop_sku_list: [],
              invoice_id: "INV_RTS_001",
              reminder_desc: "Fix RTS invoice issue",
            },
            {
              shop_id: 67890,
              biz_request_type: 4, // Move Transfer
              biz_request_id: "MT12345",
              fail_reason: "Transfer invoice error",
              fail_type: 1,
              invoice_deadline_time: 1704153600,
              shop_sku_list: [],
              invoice_id: "INV_MT_001",
              reminder_desc: "Fix move transfer issue",
            },
            {
              shop_id: 67890,
              biz_request_type: 5, // IA
              biz_request_id: "IA12345",
              fail_reason: "IA invoice error",
              fail_type: 2,
              invoice_deadline_time: 1704153600,
              shop_sku_list: [],
              invoice_id: "INV_IA_001",
              reminder_desc: "Fix IA issue",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrShopInvoiceError({
        page_no: 1,
        page_size: 10,
      });

      expect(result.response.list[0].biz_request_type).toBe(2); // RTS
      expect(result.response.list[1].biz_request_type).toBe(4); // Move Transfer
      expect(result.response.list[2].biz_request_type).toBe(5); // IA
    });
  });

  describe("queryBrSkuBlockStatus", () => {
    it("should query BR SKU block status when not blocked", async () => {
      const mockResponse: QueryBrSkuBlockStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_sku_id: "123456_789012",
          is_block: false,
          shop_item_id: 123456,
          shop_model_id: 789012,
          shop_item_name: "Test Product",
          shop_model_name: "Red",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrSkuBlockStatus({
        shop_sku_id: "123456_789012",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_sku_block_status",
        {
          method: "POST",
          auth: true,
          body: {
            shop_sku_id: "123456_789012",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.shop_sku_id).toBe("123456_789012");
      expect(result.response.is_block).toBe(false);
      expect(result.response.shop_item_id).toBe(123456);
      expect(result.response.shop_model_id).toBe(789012);
      expect(result.response.shop_item_name).toBe("Test Product");
      expect(result.response.shop_model_name).toBe("Red");
    });

    it("should query BR SKU block status when blocked", async () => {
      const mockResponse: QueryBrSkuBlockStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_sku_id: "234567_890123",
          is_block: true,
          shop_item_id: 234567,
          shop_model_id: 890123,
          shop_item_name: "Blocked Product",
          shop_model_name: "Blue",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrSkuBlockStatus({
        shop_sku_id: "234567_890123",
      });

      expect(result.response.is_block).toBe(true);
      expect(result.response.shop_item_name).toBe("Blocked Product");
    });

    it("should handle different SKU ID formats", async () => {
      const mockResponse: QueryBrSkuBlockStatusResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          shop_sku_id: "999888_777666",
          is_block: false,
          shop_item_id: 999888,
          shop_model_id: 777666,
          shop_item_name: "Another Product",
          shop_model_name: "Green",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await fbsManager.queryBrSkuBlockStatus({
        shop_sku_id: "999888_777666",
      });

      expect(result.response.shop_sku_id).toBe("999888_777666");
      expect(result.response.shop_item_id).toBe(999888);
      expect(result.response.shop_model_id).toBe(777666);
    });
  });
});
