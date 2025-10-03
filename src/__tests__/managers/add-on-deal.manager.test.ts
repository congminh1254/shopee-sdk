import { jest } from "@jest/globals";
import { AddOnDealManager } from "../../managers/add-on-deal.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  AddAddOnDealResponse,
  AddAddOnDealMainItemResponse,
  AddAddOnDealSubItemResponse,
  DeleteAddOnDealResponse,
  DeleteAddOnDealMainItemResponse,
  DeleteAddOnDealSubItemResponse,
  EndAddOnDealResponse,
  GetAddOnDealResponse,
  GetAddOnDealListResponse,
  GetAddOnDealMainItemResponse,
  GetAddOnDealSubItemResponse,
  UpdateAddOnDealResponse,
  UpdateAddOnDealMainItemResponse,
  UpdateAddOnDealSubItemResponse,
  AddOnDealPromotionType,
  AddOnDealPromotionStatus,
  AddOnDealMainItemStatus,
  AddOnDealSubItemStatus,
} from "../../schemas/add-on-deal.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("AddOnDealManager", () => {
  let addOnDealManager: AddOnDealManager;
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

    addOnDealManager = new AddOnDealManager(mockConfig);
  });

  describe("addAddOnDeal", () => {
    it("should create a new add-on deal", async () => {
      const mockResponse: AddAddOnDealResponse = {
        request_id: "c4fbe50a634200235c10a2b3e95ae99a",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20142,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.addAddOnDeal({
        add_on_deal_name: "add on deal name test",
        start_time: 1624864213,
        end_time: 1625382613,
        promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
        purchase_min_spend: 11.1,
        per_gift_num: 11,
        promotion_purchase_limit: 12,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_name: "add on deal name test",
            start_time: 1624864213,
            end_time: 1625382613,
            promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
            purchase_min_spend: 11.1,
            per_gift_num: 11,
            promotion_purchase_limit: 12,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.add_on_deal_id).toBe(20142);
    });

    it("should create a gift with minimum spend add-on deal", async () => {
      const mockResponse: AddAddOnDealResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20143,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.addAddOnDeal({
        add_on_deal_name: "Gift with purchase",
        start_time: 1624864213,
        end_time: 1625382613,
        promotion_type: AddOnDealPromotionType.GIFT_WITH_MIN_SPEND,
        purchase_min_spend: 50.0,
        per_gift_num: 1,
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("addAddOnDealMainItem", () => {
    it("should add main items to an add-on deal", async () => {
      const mockResponse: AddAddOnDealMainItemResponse = {
        request_id: "cddfba8d635d609e93a55b0a6c9cf8d1",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          main_item_list: [
            {
              item_id: 38001406131,
              status: AddOnDealMainItemStatus.ACTIVE,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.addAddOnDealMainItem({
        add_on_deal_id: 20141,
        main_item_list: [
          {
            item_id: 38001406131,
            status: AddOnDealMainItemStatus.ACTIVE,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal_main_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            main_item_list: [
              {
                item_id: 38001406131,
                status: AddOnDealMainItemStatus.ACTIVE,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.main_item_list).toHaveLength(1);
    });
  });

  describe("addAddOnDealSubItem", () => {
    it("should add sub items to an add-on deal", async () => {
      const mockResponse: AddAddOnDealSubItemResponse = {
        request_id: "976dbd715c1347bc84ec47fb5e5e5dc8",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          sub_item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.addAddOnDealSubItem({
        add_on_deal_id: 20141,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
            sub_item_input_price: 159293.0,
            sub_item_limit: 10,
            status: AddOnDealSubItemStatus.ACTIVE,
          },
          {
            item_id: 3800024281,
            model_id: 2741743,
            sub_item_input_price: 159295.0,
            status: AddOnDealSubItemStatus.ACTIVE,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/add_add_on_deal_sub_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            sub_item_list: [
              {
                item_id: 3800024281,
                model_id: 2741736,
                sub_item_input_price: 159293.0,
                sub_item_limit: 10,
                status: AddOnDealSubItemStatus.ACTIVE,
              },
              {
                item_id: 3800024281,
                model_id: 2741743,
                sub_item_input_price: 159295.0,
                status: AddOnDealSubItemStatus.ACTIVE,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.sub_item_list).toHaveLength(0);
    });

    it("should return failed sub items", async () => {
      const mockResponse: AddAddOnDealSubItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          sub_item_list: [
            {
              item_id: 3800024281,
              model_id: 2741736,
              fail_error: "error_unknown",
              fail_message: "Unknown error key ADD_ON_DEAL_PURCHASE_LIMIT_OVER",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.addAddOnDealSubItem({
        add_on_deal_id: 20141,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
            sub_item_input_price: 159293.0,
            sub_item_limit: 10,
            status: AddOnDealSubItemStatus.ACTIVE,
          },
        ],
      });

      expect(result.response.sub_item_list).toHaveLength(1);
      expect(result.response.sub_item_list[0].fail_error).toBe("error_unknown");
    });
  });

  describe("deleteAddOnDeal", () => {
    it("should delete an add-on deal", async () => {
      const mockResponse: DeleteAddOnDealResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.deleteAddOnDeal({
        add_on_deal_id: 20141,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteAddOnDealMainItem", () => {
    it("should delete main items from an add-on deal", async () => {
      const mockResponse: DeleteAddOnDealMainItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          failed_item_id_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.deleteAddOnDealMainItem({
        add_on_deal_id: 20141,
        item_id_list: [38001406131, 38001406132],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal_main_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            item_id_list: [38001406131, 38001406132],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.failed_item_id_list).toHaveLength(0);
    });
  });

  describe("deleteAddOnDealSubItem", () => {
    it("should delete sub items from an add-on deal", async () => {
      const mockResponse: DeleteAddOnDealSubItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          sub_item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.deleteAddOnDealSubItem({
        add_on_deal_id: 20141,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
          },
          {
            item_id: 3800024281,
            model_id: 2741743,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/delete_add_on_deal_sub_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            sub_item_list: [
              {
                item_id: 3800024281,
                model_id: 2741736,
              },
              {
                item_id: 3800024281,
                model_id: 2741743,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("endAddOnDeal", () => {
    it("should end an ongoing add-on deal", async () => {
      const mockResponse: EndAddOnDealResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.endAddOnDeal({
        add_on_deal_id: 20141,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/end_add_on_deal",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAddOnDeal", () => {
    it("should get add-on deal details", async () => {
      const mockResponse: GetAddOnDealResponse = {
        request_id: "c1712c064039dfea0eefe73c7f8cc26d",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 12069,
          add_on_deal_name: "add on deal test",
          start_time: 1656601200,
          end_time: 1656604800,
          promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
          purchase_min_spend: 0,
          per_gift_num: 0,
          promotion_purchase_limit: 100,
          sub_item_priority: [],
          source: 1,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.getAddOnDeal({
        add_on_deal_id: 12069,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal",
        {
          method: "GET",
          auth: true,
          params: {
            add_on_deal_id: 12069,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.add_on_deal_name).toBe("add on deal test");
    });
  });

  describe("getAddOnDealList", () => {
    it("should get a list of add-on deals", async () => {
      const mockResponse: GetAddOnDealListResponse = {
        request_id: "dc46d78810be446693995d31d03312c0",
        error: "",
        message: "",
        response: {
          add_on_deal_list: [
            {
              add_on_deal_id: 20183,
              add_on_deal_name: "Bundle deal name test",
              start_time: 1617105600,
              end_time: 1617195600,
              promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
              purchase_min_spend: 3.0,
              per_gift_num: 1,
              promotion_purchase_limit: 12,
              sub_item_priority: [],
              source: 1,
            },
          ],
          more: true,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.getAddOnDealList({
        promotion_status: AddOnDealPromotionStatus.ALL,
        page_no: 1,
        page_size: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_list",
        {
          method: "GET",
          auth: true,
          params: {
            promotion_status: AddOnDealPromotionStatus.ALL,
            page_no: 1,
            page_size: 100,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.add_on_deal_list).toHaveLength(1);
      expect(result.response.more).toBe(true);
    });

    it("should filter by promotion status", async () => {
      const mockResponse: GetAddOnDealListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_list: [],
          more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.getAddOnDealList({
        promotion_status: AddOnDealPromotionStatus.ONGOING,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_list",
        {
          method: "GET",
          auth: true,
          params: {
            promotion_status: AddOnDealPromotionStatus.ONGOING,
          },
        }
      );

      expect(result.response.more).toBe(false);
    });
  });

  describe("getAddOnDealMainItem", () => {
    it("should get main items in an add-on deal", async () => {
      const mockResponse: GetAddOnDealMainItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          main_item_list: [
            {
              item_id: 38001406131,
              status: AddOnDealMainItemStatus.ACTIVE,
            },
            {
              item_id: 38001406132,
              status: AddOnDealMainItemStatus.ACTIVE,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.getAddOnDealMainItem({
        add_on_deal_id: 20141,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_main_item",
        {
          method: "GET",
          auth: true,
          params: {
            add_on_deal_id: 20141,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.main_item_list).toHaveLength(2);
    });
  });

  describe("getAddOnDealSubItem", () => {
    it("should get sub items in an add-on deal", async () => {
      const mockResponse: GetAddOnDealSubItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          sub_item_list: [
            {
              item_id: 3800024281,
              model_id: 2741736,
              sub_item_input_price: 159293.0,
              sub_item_limit: 10,
              status: AddOnDealSubItemStatus.ACTIVE,
            },
            {
              item_id: 3800024281,
              model_id: 2741743,
              sub_item_input_price: 159295.0,
              status: AddOnDealSubItemStatus.ACTIVE,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.getAddOnDealSubItem({
        add_on_deal_id: 20141,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/get_add_on_deal_sub_item",
        {
          method: "GET",
          auth: true,
          params: {
            add_on_deal_id: 20141,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.sub_item_list).toHaveLength(2);
    });
  });

  describe("updateAddOnDeal", () => {
    it("should update an add-on deal", async () => {
      const mockResponse: UpdateAddOnDealResponse = {
        request_id: "a8a6c05ae225bef9e562c7b78a0b2677",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 12069,
          add_on_deal_name: "bundle deal test qweass",
          start_time: 1656601200,
          end_time: 1656604800,
          promotion_type: AddOnDealPromotionType.ADD_ON_DISCOUNT,
          purchase_min_spend: 0,
          per_gift_num: 0,
          promotion_purchase_limit: 100,
          sub_item_priority: [100760424],
          source: 1,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.updateAddOnDeal({
        add_on_deal_id: 12069,
        add_on_deal_name: "bundle deal test qweass",
        sub_item_priority: [100760424],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 12069,
            add_on_deal_name: "bundle deal test qweass",
            sub_item_priority: [100760424],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.sub_item_priority).toHaveLength(1);
    });
  });

  describe("updateAddOnDealMainItem", () => {
    it("should update main items in an add-on deal", async () => {
      const mockResponse: UpdateAddOnDealMainItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          main_item_list: [
            {
              item_id: 38001406131,
              status: AddOnDealMainItemStatus.DELETED,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.updateAddOnDealMainItem({
        add_on_deal_id: 20141,
        main_item_list: [
          {
            item_id: 38001406131,
            status: AddOnDealMainItemStatus.DELETED,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal_main_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            main_item_list: [
              {
                item_id: 38001406131,
                status: AddOnDealMainItemStatus.DELETED,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.main_item_list[0].status).toBe(
        AddOnDealMainItemStatus.DELETED
      );
    });
  });

  describe("updateAddOnDealSubItem", () => {
    it("should update sub items in an add-on deal", async () => {
      const mockResponse: UpdateAddOnDealSubItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          add_on_deal_id: 20141,
          sub_item_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await addOnDealManager.updateAddOnDealSubItem({
        add_on_deal_id: 20141,
        sub_item_list: [
          {
            item_id: 3800024281,
            model_id: 2741736,
            sub_item_input_price: 159293.0,
            sub_item_limit: 15,
            status: AddOnDealSubItemStatus.ACTIVE,
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/add_on_deal/update_add_on_deal_sub_item",
        {
          method: "POST",
          auth: true,
          body: {
            add_on_deal_id: 20141,
            sub_item_list: [
              {
                item_id: 3800024281,
                model_id: 2741736,
                sub_item_input_price: 159293.0,
                sub_item_limit: 15,
                status: AddOnDealSubItemStatus.ACTIVE,
              },
            ],
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.sub_item_list).toHaveLength(0);
    });
  });
});
