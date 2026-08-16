import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { LiveStreamManager } from "../../managers/livestream.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("LiveStreamManager (Generated Tests)", () => {
  let manager: LiveStreamManager;
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
    manager = new LiveStreamManager(mockConfig);
  });

  describe("addItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        item_list: [
          {
            item_id: 2312,
            shop_id: 321,
          },
        ],
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/add_item_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("applyItemSet", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        item_set_ids: [1, 2, 3],
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.applyItemSet(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/apply_item_set",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("banUserComment", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        ban_user_id: 2,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.banUserComment(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/ban_user_comment",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createSession", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        title: "test livestream",
        description: "test",
        cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pq7jw2cdhx5e",
        is_test: false,
      };
      const exampleResponse = {
        session_id: 636732,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createSession(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/create_session",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        item_list: [
          {
            item_id: 2,
            shop_id: 3,
          },
        ],
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/delete_item_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteShowItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteShowItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/delete_show_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("endSession", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.endSession(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/end_session",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemCount", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = {
        item_count: 10,
        max_item_count: 100,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemCount(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_item_count",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      };
      const exampleResponse = {
        more: true,
        next_offset: 123,
        list: [
          {
            item_no: 1,
            item_id: 123,
            shop_id: 123,
            name: "test",
            image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pjrv63z8lxe7",
            price_info: {
              currency: "SGD",
              current_price: 100,
              original_price: 120,
            },
            affiliate_info: {
              commission_rate: 0.1,
              is_campaign: true,
              campaign_mcn_name: "test",
              campaign_start_time: 1735870969,
              campaign_end_time: 1735870969,
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemSetItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_set_id: 1,
        offset: 0,
        page_size: 10,
      };
      const exampleResponse = {
        more: true,
        next_offset: 10,
        list: [
          {
            item_id: 1,
            shop_id: 1,
            name: "test",
            image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pjrv63z8lxe7",
            price_info: {
              currency: "SGD",
              current_price: 100,
              original_price: 120,
            },
            affiliate_info: {
              commission_rate: 0.1,
              is_campaign: true,
              campaign_mcn_name: "test",
              campaign_start_time: 1735870969,
              campaign_end_time: 1735870969,
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemSetItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_item_set_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemSetList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 0,
        page_size: 10,
        keyword: "set",
      };
      const exampleResponse = {
        more: true,
        next_offset: 10,
        list: [
          {
            item_set_id: 1,
            item_set_name: "set",
            item_count: 10,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemSetList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_item_set_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getLatestCommentList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        offset: 0,
      };
      const exampleResponse = {
        next_offset: 321231,
        list: [
          {
            comment_id: 273887178,
            content: "hello",
            timestamp: "1747744785",
            user_id: 123,
            username: "user1",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getLatestCommentList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_latest_comment_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getLikeItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 0,
        page_size: 10,
        keyword: "test_string",
      };
      const exampleResponse = {
        more: true,
        next_offset: 123,
        list: [
          {
            item_id: 123,
            shop_id: 123,
            name: "test_string",
            image_url: "test_string",
            price_info: {
              currency: "SGD",
              current_price: 90,
              original_price: 100,
            },
            affiliate_info: {
              commission_rate: 123,
              is_campaign: true,
              campaign_mcn_name: "test_string",
              campaign_start_time: 123,
              campaign_end_time: 123,
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getLikeItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_like_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecentItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 0,
        page_size: 10,
      };
      const exampleResponse = {
        more: true,
        next_offset: 10,
        list: [
          {
            item_id: 1,
            shop_id: 1,
            name: "test",
            image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pjrv63z8lxe7",
            price_info: {
              currency: "SGD",
              current_price: 100,
              original_price: 110,
            },
            affiliate_info: {
              commission_rate: 0.1,
              is_campaign: true,
              campaign_mcn_name: "mcn",
              campaign_start_time: 1735870969,
              campaign_end_time: 1735870969,
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getRecentItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_recent_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSessionDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = {
        session_id: 6236215,
        title: "test title",
        description: "test description",
        cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9y7ly25ngg927",
        status: 1,
        share_url: "https://live.test.shopee.co.id/share?from=live&session=6905656",
        is_test: false,
        create_time: 1747651742003,
        update_time: 1747651742003,
        start_time: 1747651742003,
        end_time: 1747651742003,
        stream_url_list: [
          {
            push_url: "rtmp://push-zl.lvb.test.shopee.co.id/live",
            push_key:
              "id-test-1987885338002432-6905656?zlSecret=61ef843a6d8e48357ac3d94db52447bf&zlTime=682FF4B1&pushDomain=push-zl.lvb.test.shopee.co.id&cdnID=ZENLAYER&session_id=6905656",
            play_url:
              "http://play-zl.livestream.test.shopee.co.id/live/id-test-1987885338002432-6905656.flv?auditkey=1.0~9EzaSlc1o3iNfkh_yixD-7yKuXaLPvJNR3CXbUw_8mN08xmA2QEcpACaVOBSP61kDO4cbhwVwM5B10kAms4mgKsTQJS-ji50MBDkH-m81cE~e298bae2599bf1447f21131e2d73a6baf97bd9edcbe460a17e09cdce2c80c40d&cdnID=ZENLAYER&expire_ts=1747714157",
            domain_id: 57,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSessionDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_session_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSessionItemMetric", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        offset: 0,
        page_size: 10,
      };
      const exampleResponse = {
        more: true,
        next_offset: 10,
        list: [
          {
            item: {
              item_id: 1,
              shop_id: 1,
              name: "test item",
              image_url: "test_string",
              price_info: {
                currency: "SGD",
                current_price: 100,
                original_price: 120,
              },
            },
            metric: {
              item_clicks: 1,
              atc: 1,
              sold_items: 1,
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSessionItemMetric(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_session_item_metric",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSessionMetric", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = {
        gmv: 1,
        atc: 1,
        ctr: 0.1,
        co: 0.1,
        orders: 1,
        ccu: 1,
        engage_ccu_1m: 1,
        peak_ccu: 1,
        likes: 1,
        comments: 1,
        shares: 1,
        views: 1,
        avg_viewing_duration: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSessionMetric(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_session_metric",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShowItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
      };
      const exampleResponse = {
        has_show_item: true,
        item: {
          item_no: 1,
          item_id: 123,
          shop_id: 123,
          name: "test",
          image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pjrv63z8lxe7",
          price_info: {
            currency: "SGD",
            current_price: 100,
            original_price: 120,
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShowItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/get_show_item",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("postComment", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        content: "hello",
      };
      const exampleResponse = {
        comment_id: 43432342324,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.postComment(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/post_comment",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("startSession", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        domain_id: 1,
        ai_stream: "true",
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.startSession(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/start_session",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("unbanUserComment", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        unban_user_id: 2,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.unbanUserComment(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/unban_user_comment",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        item_list: [
          {
            item_id: 123,
            shop_id: 3,
          },
        ],
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/update_item_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateSession", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        title: "test title",
        description: "test desc",
        cover_image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9pqmldbyce282",
        is_test: false,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateSession(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/update_session",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateShowItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        session_id: 6236215,
        item_id: 123,
        shop_id: 123,
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateShowItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/update_show_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadImage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        image: "test_string",
      };
      const exampleResponse = {
        image_url: "https://cf.shopee.sg/file/id-11134104-7r98o-m9y7ly25ngg927",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadImage(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/livestream/upload_image",
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
