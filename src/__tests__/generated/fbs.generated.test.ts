import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { FbsManager } from "../../managers/fbs.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("FbsManager (Generated Tests)", () => {
  let manager: FbsManager;
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
    manager = new FbsManager(mockConfig);
  });

  describe("queryBrShopBlockStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        shop_id: 123,
        is_block: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.queryBrShopBlockStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_block_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("queryBrShopEnrollmentStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        shop_id: 123,
        enrollment_status: 1,
        enable_enrollment_time: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.queryBrShopEnrollmentStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_enrollment_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("queryBrShopInvoiceError", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
      };
      const exampleResponse = {
        total: 123,
        list: [
          {
            shop_id: 123,
            biz_request_type: 123,
            biz_request_id: "test_string",
            fail_reason: "test_string",
            fail_type: 123,
            invoice_deadline_time: 123,
            shop_sku_list: [
              {
                shop_item_id: 123,
                shop_model_id: 123,
                shop_item_name: "test_string",
                shop_model_name: "test_string",
                fail_reason: "test_string",
              },
            ],
            invoice_id: "test_string",
            reminder_desc: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.queryBrShopInvoiceError(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_shop_invoice_error",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("queryBrSkuBlockStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_sku_id: "123_234",
      };
      const exampleResponse = {
        shop_sku_id: "test_string",
        is_block: true,
        shop_item_id: 123,
        shop_model_id: 123,
        shop_item_name: "test_string",
        shop_model_name: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.queryBrSkuBlockStatus(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/fbs/query_br_sku_block_status",
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
