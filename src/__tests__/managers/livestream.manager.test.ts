import { jest } from "@jest/globals";
import { LiveStreamManager } from "../../managers/livestream.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  CreateSessionResponse,
  StartSessionResponse,
  EndSessionResponse,
  UpdateSessionResponse,
  GetSessionDetailResponse,
  GetSessionMetricResponse,
  GetSessionItemMetricResponse,
  AddItemListResponse,
  UpdateItemListResponse,
  DeleteItemListResponse,
  GetItemListResponse,
  GetItemCountResponse,
  GetRecentItemListResponse,
  GetLikeItemListResponse,
  ApplyItemSetResponse,
  GetItemSetListResponse,
  GetItemSetItemListResponse,
  GetShowItemResponse,
  UpdateShowItemResponse,
  DeleteShowItemResponse,
  PostCommentResponse,
  GetLatestCommentListResponse,
  BanUserCommentResponse,
  UnbanUserCommentResponse,
  UploadImageResponse,
} from "../../schemas/livestream.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("LiveStreamManager", () => {
  let liveStreamManager: LiveStreamManager;
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

    liveStreamManager = new LiveStreamManager(mockConfig);
  });

  describe("createSession", () => {
    it("should create a new livestream session", async () => {
      const mockResponse: CreateSessionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          session_id: 6236215,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.createSession({
        title: "Test Livestream",
        description: "This is a test livestream",
        cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pq7jw2cdhx5e",
        is_test: true,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/create_session", {
        method: "POST",
        body: {
          title: "Test Livestream",
          description: "This is a test livestream",
          cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pq7jw2cdhx5e",
          is_test: true,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.session_id).toBe(6236215);
    });

    it("should create session without optional fields", async () => {
      const mockResponse: CreateSessionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          session_id: 6236216,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.createSession({
        title: "Minimal Session",
        cover_image_url: "https://cf.shopee.sg/file/test.jpg",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/create_session", {
        method: "POST",
        body: {
          title: "Minimal Session",
          cover_image_url: "https://cf.shopee.sg/file/test.jpg",
        },
      });

      expect(result.response.session_id).toBe(6236216);
    });
  });

  describe("startSession", () => {
    it("should start a livestream session", async () => {
      const mockResponse: StartSessionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.startSession({
        session_id: 6236215,
        domain_id: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/start_session", {
        method: "POST",
        body: {
          session_id: 6236215,
          domain_id: 1,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("endSession", () => {
    it("should end a livestream session", async () => {
      const mockResponse: EndSessionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.endSession({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/end_session", {
        method: "POST",
        body: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateSession", () => {
    it("should update a livestream session", async () => {
      const mockResponse: UpdateSessionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.updateSession({
        session_id: 6236215,
        title: "Updated Title",
        description: "Updated description",
        cover_image_url: "https://cf.shopee.sg/file/updated.jpg",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/update_session", {
        method: "POST",
        body: {
          session_id: 6236215,
          title: "Updated Title",
          description: "Updated description",
          cover_image_url: "https://cf.shopee.sg/file/updated.jpg",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSessionDetail", () => {
    it("should get session detail", async () => {
      const mockResponse: GetSessionDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          session_id: 6236215,
          title: "Test Livestream",
          description: "Test description",
          cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9y7ly25ngg927",
          status: 1,
          share_url: "https://live.test.shopee.co.id/share?session=6905656",
          is_test: false,
          create_time: 1747651742003,
          update_time: 1747651742003,
          start_time: 1747651742003,
          end_time: 1747651742003,
          stream_url_list: {
            push_url: "rtmp://push-zl.lvb.test.shopee.co.id/live",
            push_key: "id-test-1987885338002432-6905656?zlSecret=test",
            play_url: "http://play-zl.livestream.test.shopee.co.id/live/test.flv",
            domain_id: 57,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getSessionDetail({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_session_detail", {
        method: "GET",
        params: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.session_id).toBe(6236215);
      expect(result.response.status).toBe(1);
    });
  });

  describe("getSessionMetric", () => {
    it("should get session metrics", async () => {
      const mockResponse: GetSessionMetricResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          gmv: 1000.5,
          atc: 50,
          ctr: 0.15,
          co: 0.08,
          orders: 25,
          ccu: 150,
          engage_ccu_1m: 120,
          peak_ccu: 200,
          likes: 500,
          comments: 300,
          shares: 50,
          views: 1000,
          avg_viewing_duration: 180,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getSessionMetric({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_session_metric", {
        method: "GET",
        params: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.gmv).toBe(1000.5);
      expect(result.response.orders).toBe(25);
    });
  });

  describe("getSessionItemMetric", () => {
    it("should get session item metrics", async () => {
      const mockResponse: GetSessionItemMetricResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_id: 123456,
              shop_id: 67890,
              name: "Test Product",
              clicks: 100,
              orders: 10,
              gmv: 500.0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getSessionItemMetric({
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_session_item_metric",
        {
          method: "GET",
          params: {
            session_id: 6236215,
            offset: 0,
            page_size: 10,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.list).toHaveLength(1);
    });
  });

  describe("addItemList", () => {
    it("should add items to session", async () => {
      const mockResponse: AddItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.addItemList({
        session_id: 6236215,
        item_list: [
          { item_id: 123, shop_id: 456 },
          { item_id: 789, shop_id: 456 },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/add_item_list", {
        method: "POST",
        body: {
          session_id: 6236215,
          item_list: [
            { item_id: 123, shop_id: 456 },
            { item_id: 789, shop_id: 456 },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateItemList", () => {
    it("should update item order in session", async () => {
      const mockResponse: UpdateItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.updateItemList({
        session_id: 6236215,
        item_list: [
          { item_id: 123, shop_id: 456, item_no: 2 },
          { item_id: 789, shop_id: 456, item_no: 1 },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/update_item_list", {
        method: "POST",
        body: {
          session_id: 6236215,
          item_list: [
            { item_id: 123, shop_id: 456, item_no: 2 },
            { item_id: 789, shop_id: 456, item_no: 1 },
          ],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteItemList", () => {
    it("should delete items from session", async () => {
      const mockResponse: DeleteItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.deleteItemList({
        session_id: 6236215,
        item_list: [{ item_id: 123, shop_id: 456 }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/delete_item_list", {
        method: "POST",
        body: {
          session_id: 6236215,
          item_list: [{ item_id: 123, shop_id: 456 }],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemList", () => {
    it("should get item list from session", async () => {
      const mockResponse: GetItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_no: 1,
              item_id: 123,
              shop_id: 456,
              name: "Test Product",
              image_url: "https://cf.shopee.sg/file/test.jpg",
              price_info: {
                currency: "SGD",
                current_price: 10.99,
                original_price: 15.99,
              },
              affiliate_info: {
                commission_rate: 0.1,
                is_campaign: true,
                campaign_mcn_name: "Test MCN",
                campaign_start_time: 1735870969,
                campaign_end_time: 1735870969,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getItemList({
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_item_list", {
        method: "GET",
        params: {
          session_id: 6236215,
          offset: 0,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.list).toHaveLength(1);
    });
  });

  describe("getItemCount", () => {
    it("should get total item count", async () => {
      const mockResponse: GetItemCountResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_count: 25,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getItemCount({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_item_count", {
        method: "GET",
        params: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.total_count).toBe(25);
    });
  });

  describe("getRecentItemList", () => {
    it("should get recent item list", async () => {
      const mockResponse: GetRecentItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_no: 1,
              item_id: 123,
              shop_id: 456,
              name: "Recent Product",
              image_url: "https://cf.shopee.sg/file/recent.jpg",
              price_info: {
                currency: "SGD",
                current_price: 9.99,
                original_price: 12.99,
              },
              affiliate_info: {
                commission_rate: 0.05,
                is_campaign: false,
                campaign_mcn_name: "",
                campaign_start_time: 0,
                campaign_end_time: 0,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getRecentItemList({
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_recent_item_list", {
        method: "GET",
        params: {
          session_id: 6236215,
          offset: 0,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLikeItemList", () => {
    it("should get liked item list", async () => {
      const mockResponse: GetLikeItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_no: 1,
              item_id: 123,
              shop_id: 456,
              name: "Liked Product",
              image_url: "https://cf.shopee.sg/file/liked.jpg",
              price_info: {
                currency: "SGD",
                current_price: 19.99,
                original_price: 29.99,
              },
              affiliate_info: {
                commission_rate: 0.15,
                is_campaign: true,
                campaign_mcn_name: "Popular MCN",
                campaign_start_time: 1735870969,
                campaign_end_time: 1735970969,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getLikeItemList({
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_like_item_list", {
        method: "GET",
        params: {
          session_id: 6236215,
          offset: 0,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("applyItemSet", () => {
    it("should apply an item set to session", async () => {
      const mockResponse: ApplyItemSetResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.applyItemSet({
        session_id: 6236215,
        item_set_id: 12345,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/apply_item_set", {
        method: "POST",
        body: {
          session_id: 6236215,
          item_set_id: 12345,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getItemSetList", () => {
    it("should get item set list", async () => {
      const mockResponse: GetItemSetListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_set_id: 12345,
              name: "Summer Collection",
              item_count: 50,
            },
            {
              item_set_id: 12346,
              name: "Winter Sale",
              item_count: 30,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getItemSetList({
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_item_set_list", {
        method: "GET",
        params: {
          offset: 0,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.list).toHaveLength(2);
    });
  });

  describe("getItemSetItemList", () => {
    it("should get items in an item set", async () => {
      const mockResponse: GetItemSetItemListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              item_no: 1,
              item_id: 111,
              shop_id: 456,
              name: "Set Item 1",
              image_url: "https://cf.shopee.sg/file/item1.jpg",
              price_info: {
                currency: "SGD",
                current_price: 15.99,
                original_price: 20.99,
              },
              affiliate_info: {
                commission_rate: 0.1,
                is_campaign: false,
                campaign_mcn_name: "",
                campaign_start_time: 0,
                campaign_end_time: 0,
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getItemSetItemList({
        item_set_id: 12345,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_item_set_item_list",
        {
          method: "GET",
          params: {
            item_set_id: 12345,
            offset: 0,
            page_size: 10,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getShowItem", () => {
    it("should get currently displayed item", async () => {
      const mockResponse: GetShowItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item: {
            item_id: 123,
            shop_id: 456,
            name: "Displayed Product",
            image_url: "https://cf.shopee.sg/file/show.jpg",
            price_info: {
              currency: "SGD",
              current_price: 25.99,
              original_price: 35.99,
            },
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getShowItem({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/get_show_item", {
        method: "GET",
        params: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.item).not.toBeNull();
    });

    it("should handle no show item", async () => {
      const mockResponse: GetShowItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          item: null,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getShowItem({
        session_id: 6236215,
      });

      expect(result.response.item).toBeNull();
    });
  });

  describe("updateShowItem", () => {
    it("should update the displayed item", async () => {
      const mockResponse: UpdateShowItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.updateShowItem({
        session_id: 6236215,
        item_id: 123,
        shop_id: 456,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/update_show_item", {
        method: "POST",
        body: {
          session_id: 6236215,
          item_id: 123,
          shop_id: 456,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteShowItem", () => {
    it("should remove the displayed item", async () => {
      const mockResponse: DeleteShowItemResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.deleteShowItem({
        session_id: 6236215,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/delete_show_item", {
        method: "POST",
        body: {
          session_id: 6236215,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("postComment", () => {
    it("should post a comment to livestream", async () => {
      const mockResponse: PostCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.postComment({
        session_id: 6236215,
        comment: "Great product!",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/post_comment", {
        method: "POST",
        body: {
          session_id: 6236215,
          comment: "Great product!",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLatestCommentList", () => {
    it("should get latest comments", async () => {
      const mockResponse: GetLatestCommentListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          next_offset: 10,
          list: [
            {
              comment_id: 1001,
              user_id: 5001,
              username: "user123",
              comment: "Love this stream!",
              comment_time: 1735870969,
            },
            {
              comment_id: 1002,
              user_id: 5002,
              username: "user456",
              comment: "When will you restock?",
              comment_time: 1735871000,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.getLatestCommentList({
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_latest_comment_list",
        {
          method: "GET",
          params: {
            session_id: 6236215,
            offset: 0,
            page_size: 10,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.list).toHaveLength(2);
    });
  });

  describe("banUserComment", () => {
    it("should ban a user from commenting", async () => {
      const mockResponse: BanUserCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.banUserComment({
        session_id: 6236215,
        user_id: 5001,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/ban_user_comment", {
        method: "POST",
        body: {
          session_id: 6236215,
          user_id: 5001,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("unbanUserComment", () => {
    it("should unban a user from commenting", async () => {
      const mockResponse: UnbanUserCommentResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await liveStreamManager.unbanUserComment({
        session_id: 6236215,
        user_id: 5001,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/unban_user_comment", {
        method: "POST",
        body: {
          session_id: 6236215,
          user_id: 5001,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("uploadImage", () => {
    it("should upload an image", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9y7ly25ngg927",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const mockImage = Buffer.from("fake-image-data");
      const result = await liveStreamManager.uploadImage({
        image: mockImage,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/livestream/upload_image", {
        method: "POST",
        body: {
          image: mockImage,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.image_url).toBe(
        "https://cf.shopee.sg/file/id-11134104-7r98o-m9y7ly25ngg927"
      );
    });
  });
});
