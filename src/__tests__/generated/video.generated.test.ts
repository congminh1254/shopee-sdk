import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { VideoManager } from "../../managers/video.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("VideoManager (Generated Tests)", () => {
  let manager: VideoManager;
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
    manager = new VideoManager(mockConfig);
  });

  describe("deleteVideo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id_list: ["sg-11110199-6v8gq-mgbni6rb44qz04"],
        post_id_list: ["YwOo_gZqCACXbM0UAAAAAA=="],
      };
      const exampleResponse = {
        success_list: [
          {
            success_video_upload_id: "test_string",
            success_post_id: "test_string",
          },
        ],
        failure_list: [
          {
            fail_video_upload_id: "test_string",
            fail_post_id: "test_string",
            failed_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteVideo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/delete_video",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("editVideoInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_list: [
          {
            video_upload_id: "sg-11110199-6v99e-mgezdwct5eyya0",
            caption: "this is a test video",
            cover_image_url:
              "https://down-sg.img.susercontent.com/sg-11110199-6v99e-mgezdwct5eyya0_pack_v1_1000001_1",
            item_info: [
              {
                item_id: 2,
                custom_item_name: "item display name",
              },
            ],
            allow_info: {
              allow_duet: true,
              allow_stitch: true,
            },
            scheduled_info: {
              scheduled_post: true,
              scheduled_post_time: "1761734929450",
            },
          },
        ],
      };
      const exampleResponse = {
        success_list: ["sg-11110199-6v99e-mgezdwct5eyya0"],
        failure_list: [
          {
            fail_video_upload_id: "sg-11110199-6v99e-mgezdwct5eyya0",
            failed_reason: "can not edit video info,please retry",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.editVideoInfo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/edit_video_info",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCoverList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "test_string",
      };
      const exampleResponse = {
        image_url_list: [
          "https:",
          "",
          "down-sg.img.susercontent.com",
          "sg-11110199-6v99e-mgezdwct5eyya0_pack_v1_1000001_1",
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCoverList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_cover_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMetricTrend", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Week",
        end_date: "2025-09-21",
      };
      const exampleResponse = {
        video_total_metric_list: [
          {
            placed_sales: 2.2,
            confirmed_sales: 2,
            placed_orders: 2,
            confirmed_orders: 2,
            placed_item_sold: 3,
            confirmed_item_sold: 3,
            total_viewers: 3,
            effective_views: 3,
            avg_view_duration: 2,
            placed_buyers: 2,
            confirmed_buyers: 2,
            total_atc: 2,
            ctr: 2.1,
            placed_co_rate: 2.1,
            confirmed_co_rate: 2.1,
            placed_abs: 2.1,
            confirmed_abs: 2.1,
            placed_gpm: 2.1,
            confirmed_gpm: 2.1,
            video_with_products: 1,
            placed_revenue_generating_videos: 1,
            confirmed_revenue_generating_videos: 1,
            total_views: 1,
            total_likes: 1,
            total_shares: 1,
            total_comments: 1,
            video_new_followers: 1,
            data_period: "2025-10-29",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMetricTrend(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_metric_trend",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getOverviewPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        period_type: "Month",
        end_date: "2025-09-30",
      };
      const exampleResponse = {
        key_metric: {
          placed_sales: 1,
          confirmed_sales: 1,
          placed_orders: 2,
          confirmed_orders: 2,
          placed_item_sold: 3,
          confirmed_item_sold: 3,
          total_viewers: 4,
          effective_views: 4,
          avg_view_duration: 5,
        },
        conversion: {
          placed_buyers: 2,
          confirmed_buyers: 2,
          total_atc: 2,
          ctr: 3,
          placed_co_rate: 1,
          confirmed_co_rate: 1,
          placed_abs: 1,
          confirmed_abs: 2,
          placed_gpm: 3,
          confirmed_gpm: 4,
          video_with_products: 2,
          placed_revenue_generating_videos: 1,
          confirmed_revenue_generating_videos: 1,
        },
        engagement: {
          total_views: 1,
          total_likes: 1,
          total_shares: 1,
          total_comments: 1,
          video_new_followers: 1,
        },
        fetched_date_range: "2025-02-28",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getOverviewPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_overview_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProdcutPerformanceList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        period_type: "Last7d",
        end_date: "2025-10-30",
        order_by: "PlacedOrders",
        sort: "desc",
        item_id: 1,
        item_name: "test item name",
      };
      const exampleResponse = {
        total_count: 123,
        has_more: true,
        list: [
          {
            shop_id: 1,
            item_id: 1,
            item_name: "test item name",
            item_cover_image_url: "test_string",
            item_description: "desc",
            placed_orders: 1,
            confirmed_orders: 1,
            placed_sales: 1,
            confirmed_sales: 1,
            placed_unique_buyers: 1,
            confirmed_unique_buyers: 1,
            fetched_date_range: "2025-10-30",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProdcutPerformanceList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_prodcut_performance_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getUserDemographics", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        age: "test_string",
        gender: "test_string",
        location: "test_string",
        identity: "test_string",
        activity: "test_string",
        content: "test_string",
        shopping: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getUserDemographics(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_user_demographics",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110199-6v99e-mgezdwct5eyya0",
        post_id: "YwOo_gZqCACXbM0UAAAAAA==",
      };
      const exampleResponse = {
        video_upload_id: "id-11110201-6ko2m-mczrffx878mba3",
        post_id: "YwOo_gZqCACXbM0UAAAAAA==",
        post_time: "1761188662147",
        video_url:
          "https://down-bs-id.vod.susercontent.com/c3/50007225/201/A3oxONdWALgpg8thEbEBACc.mp4",
        status: 300,
        cover_image_url:
          "https://down-sp-id.vod.susercontent.com/c3/50007225/201/A3oyOUXSAFAbg8thIfYBBgAn.jpg",
        caption: "#tt Tt1",
        duration: 6866,
        views: 1,
        likes: 1,
        comments: 1,
        has_performance: false,
        item_list: [
          {
            shop_id: 123,
            item_id: 34002,
            item_name: "seller discount",
            custom_item_name: "test_string",
            item_cover_image_url: "test_string",
            min_price: 100000,
            max_price: 100000,
            stock: 10,
          },
        ],
        allow_info: {
          allow_stitch: true,
          allow_duet: true,
        },
        scheduled_info: {
          scheduled_post: true,
          scheduled_post_time: "1761734929450",
        },
        update_time: "1761188662147",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoDetailAudienceDistribution", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        post_id: "YwOo_gZqCACXbM0UAAAAAA==",
      };
      const exampleResponse = {
        age: "test_string",
        gender: "test_string",
        location: "test_string",
        identity: "test_string",
        activity: "test_string",
        content: "test_string",
        shopping: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoDetailAudienceDistribution(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_audience_distribution",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoDetailMetricTrend", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        post_id: "YwOo_gZqCACXbM0UAAAAAA==",
        metric_name: "Likes",
      };
      const exampleResponse = {
        metric_trend: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoDetailMetricTrend(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_metric_trend",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoDetailPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        post_id: "YwOo_gZqCACXbM0UAAAAAA==",
      };
      const exampleResponse = {
        video_info: {
          post_id: "YwOo_gZqCACXbM0UAAAAAA==",
          post_time: "1761188662147",
          video_url:
            "https://down-bs-id.vod.susercontent.com/c3/50007225/201/A3oxONdWALgpg8thEbEBACc.mp4",
          cover_image_url:
            "https://down-sp-id.vod.susercontent.com/c3/50007225/201/A3oyOUXSAFAbg8thIfYBBgAn.jpg",
          caption: "#tt Tt1",
          duration: 6866,
          related_item_count: 1,
        },
        video_performance: {
          views: 1,
          likes: 1,
          comments: 1,
          shares: 1,
          followers_growth: 1,
          placed_orders: 1,
          placed_sales: 1,
          unique_buyers: 1,
          conversion_rate: 1,
          sold_items: 1,
          product_clicks: 1,
          product_click_rate: 2,
          sales_per_order: 1,
          sales_per_buyer: 1,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoDetailPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoDetailProductPerformance", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 123,
        page_size: 123,
        post_id: "test_string",
        item_id: 123,
        item_name: "test_string",
      };
      const exampleResponse = {
        list: [
          {
            shop_id: 123,
            item_id: 34002,
            item_name: "seller discount",
            item_cover_image_url: "test_string",
            item_description: "test_string",
            likes: 1,
            comments: 1,
            placed_orders: 1,
            placed_sales: 2,
            unique_buyers: 2,
            sold_items: 1,
            product_clicks: 1,
            product_click_rate: 1,
            conversion_rate: 1,
            sales_per_order: 2,
            sales_per_buyer: 2,
          },
        ],
        total_count: 10,
        has_more: false,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoDetailProductPerformance(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_product_performance",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        list_type: [1],
      };
      const exampleResponse = {
        total_count: 1,
        has_more: false,
        list: [
          {
            video_upload_id: "id-11110201-6ko2m-mczrffx878mba3",
            post_id: "YwOo_gZqCACXbM0UAAAAAA==",
            post_time: "1761188662147",
            video_url:
              "https://down-bs-id.vod.susercontent.com/c3/50007225/201/A3oxONdWALgpg8thEbEBACc.mp4",
            status: 300,
            cover_image_url:
              "https://down-sp-id.vod.susercontent.com/c3/50007225/201/A3oyOUXSAFAbg8thIfYBBgAn.jpg",
            caption: "#tt Tt1",
            duration: 6866,
            views: 1,
            likes: 1,
            comments: 1,
            has_performance: false,
            item_list: [
              {
                shop_id: 123,
                item_id: 34002,
                item_name: "seller discount",
                custom_item_name: "test_string",
                item_cover_image_url: "test_string",
                min_price: 100000,
                max_price: 100000,
                stock: 10,
              },
            ],
            allow_info: {
              allow_stitch: true,
              allow_duet: true,
            },
            scheduled_info: {
              scheduled_post: true,
              scheduled_post_time: "1761734929450",
            },
            update_time: "1761734929450",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoPerformanceList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        period_type: "Last7d",
        end_date: "2025-10-30",
        caption: "test_string",
        order_by: "Likes",
        sort: "desc",
      };
      const exampleResponse = {
        total_count: 1,
        has_more: false,
        list: [
          {
            video_upload_id: "id-11110201-6ko2m-mczrffx878mba3",
            post_id: "YwOo_gZqCACXbM0UAAAAAA==",
            post_time: "1761188662147",
            video_url:
              "https://down-bs-id.vod.susercontent.com/c3/50007225/201/A3oxONdWALgpg8thEbEBACc.mp4",
            status: 300,
            cover_image_url:
              "https://down-sp-id.vod.susercontent.com/c3/50007225/201/A3oyOUXSAFAbg8thIfYBBgAn.jpg",
            caption: "#tt Tt1",
            duration: "6866",
            views: 1,
            likes: 1,
            comments: 1,
            shares: 1,
            avg_views_duration: 1,
            completion_rate: 1,
            placed_orders: 1,
            confirmed_orders: 1,
            placed_sales: 1.2,
            confirmed_sales: 1,
            placed_item_sold: 1,
            confirmed_item_sold: 1,
            fetched_date_range: "2025-10-30",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoPerformanceList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_performance_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("postVideo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id_list: ["sg-11110199-6v8gq-mgbni6rb44qz04"],
      };
      const exampleResponse = {
        success_list: [
          {
            success_video_upload_id: "sg-11110199-6v9an-mgfwrq9n668d44",
            post_id: "YwOo_gZqCACXbM0UAAAAAA==",
          },
        ],
        failure_list: [
          {
            fail_video_upload_id: "sg-11110199-6v9an-mgfwrq9n668d44",
            failed_reason: "can not find video info",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.postVideo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/post_video",
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
