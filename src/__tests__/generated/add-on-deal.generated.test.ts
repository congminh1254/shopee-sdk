import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { AddOnDealManager } from "../../managers/add-on-deal.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("AddOnDealManager (Generated Tests)", () => {
  let manager: AddOnDealManager;
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
    manager = new AddOnDealManager(mockConfig);
  });

  describe("addAddOnDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_name: "add on deal name test",
        start_time: 1624864213,
        end_time: 1625382613,
        promotion_type: 0,
        purchase_min_spend: 11.1,
        per_gift_num: 11,
        promotion_purchase_limit: 12,
      };
      const exampleResponse = {
        add_on_deal_id: 20142,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addAddOnDeal(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addAddOnDealMainItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 20141,
        main_item_list: [
          {
            item_id: 38001406131,
            status: 1,
          },
        ],
      };
      const exampleResponse = {
        main_item_list: [
          {
            item_id: 38001406131,
            status: 1,
          },
        ],
        add_on_deal_id: 20141,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addAddOnDealMainItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal_main_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addAddOnDealSubItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 1,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
            status: 1,
            sub_item_input_price: 159293,
            sub_item_limit: 10,
          },
        ],
      };
      const exampleResponse = {
        sub_item_list: [
          {
            item_id: 3800024281,
            status: 1,
            model_id: 2741743,
            fail_error: "error_unknown",
            fail_message: "Unkown error key ADD_ON_DEAL_PURCHASE_LIMIT_OVER",
          },
        ],
        add_on_deal_id: 20141,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addAddOnDealSubItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal_sub_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteAddOnDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 11223123,
      };
      const exampleResponse = {
        add_on_deal_id: 11223123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteAddOnDeal(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteAddOnDealMainItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12068,
        main_item_list: [100197906],
      };
      const exampleResponse = {
        main_item_list: [123],
        add_on_deal_id: 12068,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteAddOnDealMainItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal_main_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteAddOnDealSubItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 20141,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
          },
        ],
      };
      const exampleResponse = {
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
            fail_error: "error_unknown",
            fail_message: "Unkown error key ADD_ON_DEAL_PURCHASE_LIMIT_OVER",
          },
        ],
        add_on_deal_id: 20141,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteAddOnDealSubItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal_sub_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endAddOnDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12068,
      };
      const exampleResponse = {
        add_on_deal_id: 12068,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endAddOnDeal(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/end_add_on_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAddOnDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
      };
      const exampleResponse = {
        start_time: 1656601200,
        end_time: 1656604800,
        promotion_type: 0,
        purchase_min_spend: 0,
        add_on_deal_id: 12069,
        per_gift_num: 0,
        sub_item_priority: [123],
        promotion_purchase_limit: 100,
        add_on_deal_name: "add on deal test",
        source: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAddOnDeal(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAddOnDealList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        promotion_status: "all",
        page_no: 1,
        page_size: 100,
      };
      const exampleResponse = {
        add_on_deal_list: [
          {
            start_time: 1617105600,
            end_time: 1617195600,
            promotion_type: 0,
            purchase_min_spend: 3,
            add_on_deal_id: 20183,
            per_gift_num: 1,
            promotion_purchase_limit: 12,
            add_on_deal_name: "Bundle deal name test",
            source: 1,
            sub_item_prioriry: [100862950, 100863523],
          },
        ],
        more: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAddOnDealList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAddOnDealMainItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
      };
      const exampleResponse = {
        main_item_list: [
          {
            item_id: 100862623,
            status: 1,
          },
        ],
        add_on_deal_id: 12069,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAddOnDealMainItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_main_item",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAddOnDealSubItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
      };
      const exampleResponse = {
        sub_item_list: [
          {
            item_id: 100760424,
            status: 1,
            sub_item_limit: 1000000,
            model_id: 200760424,
            price: {
              promo_input_price: 400,
              promo_price: 400,
            },
          },
        ],
        add_on_deal_id: 12069,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAddOnDealSubItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_sub_item",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateAddOnDeal", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
        start_time: 1656511212,
        end_time: 1661868012,
        purchase_min_spend: 0,
        per_gift_num: 0,
        promotion_purchase_limit: 100,
        sub_item_priority: [100760424],
        add_on_deal_name: "bundle deal test qweass",
      };
      const exampleResponse = {
        start_time: 1656601200,
        end_time: 1656604800,
        promotion_type: 0,
        purchase_min_spend: 0,
        add_on_deal_id: 12069,
        per_gift_num: 0,
        promotion_purchase_limit: 100,
        add_on_deal_name: "bundle deal test qweass",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateAddOnDeal(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateAddOnDealMainItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
        main_item_list: [
          {
            item_id: 100862623,
            status: 2,
          },
        ],
      };
      const exampleResponse = {
        main_item_list: [
          {
            item_id: 100862623,
            status: 2,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateAddOnDealMainItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal_main_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateAddOnDealSubItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        add_on_deal_id: 12069,
        sub_item_list: [
          {
            item_id: 100760424,
            model_id: 20760424,
            status: 1,
            sub_item_input_price: 390,
            sub_item_limit: 12,
          },
        ],
      };
      const exampleResponse = {
        sub_item_list: [
          {
            item_id: 100760424,
            status: 1,
            model_id: 20760424,
            fail_error: "add_on.add_on_deal_error_unknown",
            fail_message: "The add on deal created by admin can't be edited",
            sub_item_input_price: 390,
            sub_item_limit: 12,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateAddOnDealSubItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal_sub_item",
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
