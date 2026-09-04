import { jest } from "@jest/globals";
import { VideoManager } from "../../managers/video.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  DeleteVideoResponse,
  EditVideoInfoResponse,
  GetCoverListResponse,
  GetMetricTrendResponse,
  GetOverviewPerformanceResponse,
  GetProdcutPerformanceListResponse,
  GetUserDemographicsResponse,
  GetVideoDetailResponse,
  GetVideoDetailAudienceDistributionResponse,
  GetVideoDetailMetricTrendResponse,
  GetVideoDetailPerformanceResponse,
  GetVideoDetailProductPerformanceResponse,
  GetVideoListResponse,
  GetVideoPerformanceListResponse,
  PostVideoResponse,
} from "../../schemas/video.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("VideoManager", () => {
  let videoManager: VideoManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    videoManager = new VideoManager(mockConfig);
  });

  describe("deleteVideo", () => {
    it("should delete draft videos successfully", async () => {
      const mockResponse: DeleteVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              success_video_upload_id: "upload123",
            },
            {
              success_video_upload_id: "upload456",
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.deleteVideo({
        video_upload_id_list: ["upload123", "upload456"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/delete_video", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id_list: ["upload123", "upload456"],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.success_list).toHaveLength(2);
      expect(result.response.failure_list).toHaveLength(0);
    });

    it("should delete draft videos using snake_case parameters successfully", async () => {
      const mockResponse: DeleteVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              success_video_upload_id: "upload123",
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.deleteVideo({
        video_upload_id_list: ["upload123"],
        post_id_list: ["post456"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/delete_video", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id_list: ["upload123"],
          post_id_list: ["post456"],
        },
      });

      expect(result.error).toBe("");
    });

    it("should handle partial deletion failure", async () => {
      const mockResponse: DeleteVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              success_video_upload_id: "upload123",
            },
          ],
          failure_list: [
            {
              fail_video_upload_id: "upload456",
              failed_reason: "Video not found",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.deleteVideo({
        video_upload_id_list: ["upload123", "upload456"],
      });

      expect(result.response.success_list).toHaveLength(1);
      expect(result.response.failure_list).toHaveLength(1);
      expect(result.response.failure_list![0].failed_reason).toBe("Video not found");
    });
  });

  describe("editVideoInfo", () => {
    it("should edit video info successfully", async () => {
      const mockResponse: EditVideoInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: ["upload123"],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.editVideoInfo({
        video_upload_list: [
          {
            video_upload_id: "upload123",
            caption: "Updated caption",
            cover_image_url: "https://example.com/cover1.jpg",
            allow_info: {
              allow_duet: true,
              allow_stitch: true,
            },
            scheduled_info: {
              scheduled_post: false,
            },
          },
        ],
        aigc_label: false,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/edit_video_info", {
        method: "POST",
        auth: true,
        body: {
          video_upload_list: [
            {
              video_upload_id: "upload123",
              caption: "Updated caption",
              cover_image_url: "https://example.com/cover1.jpg",
              allow_info: {
                allow_duet: true,
                allow_stitch: true,
              },
              scheduled_info: {
                scheduled_post: false,
              },
            },
          ],
          aigc_label: false,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.success_list).toHaveLength(1);
    });

    it("should edit video info using snake_case parameters successfully", async () => {
      const mockResponse: EditVideoInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: ["upload123"],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.editVideoInfo({
        video_upload_list: [
          {
            video_upload_id: "upload123",
            caption: "Updated caption",
            cover_image_url: "https://example.com/cover1.jpg",
            item_info: [
              {
                item_id: 9999,
                custom_item_name: "custom product name",
              },
            ],
            allow_info: {
              allow_duet: true,
              allow_stitch: true,
            },
            scheduled_info: {
              scheduled_post: false,
              scheduled_post_time: 123456789,
            },
          },
        ],
        aigc_label: false,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/edit_video_info", {
        method: "POST",
        auth: true,
        body: {
          video_upload_list: [
            {
              video_upload_id: "upload123",
              caption: "Updated caption",
              cover_image_url: "https://example.com/cover1.jpg",
              item_info: [
                {
                  item_id: 9999,
                  custom_item_name: "custom product name",
                },
              ],
              allow_info: {
                allow_duet: true,
                allow_stitch: true,
              },
              scheduled_info: {
                scheduled_post: false,
                scheduled_post_time: 123456789,
              },
            },
          ],
          aigc_label: false,
        },
      });

      expect(result.error).toBe("");
    });

    it("should handle edit failure", async () => {
      const mockResponse: EditVideoInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [],
          failure_list: [
            {
              fail_video_upload_id: "upload123",
              failed_reason: "Caption exceeds limit",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.editVideoInfo({
        video_upload_list: [
          {
            video_upload_id: "upload123",
            caption: "a".repeat(1001),
            cover_image_url: "https://example.com/cover1.jpg",
            allow_info: {
              allow_duet: true,
              allow_stitch: true,
            },
            scheduled_info: {
              scheduled_post: false,
            },
          },
        ],
        aigc_label: false,
      });

      expect(result.response.failure_list).toHaveLength(1);
      expect(result.response.failure_list![0].failed_reason).toBe("Caption exceeds limit");
    });
  });

  describe("getCoverList", () => {
    it("should get cover list successfully", async () => {
      const mockResponse: GetCoverListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_url_list: ["https://example.com/cover1.jpg", "https://example.com/cover2.jpg"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getCoverList({
        video_upload_id: "upload123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_cover_list", {
        method: "GET",
        auth: true,
        params: {
          video_upload_id: "upload123",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.image_url_list).toHaveLength(2);
    });

    it("should get cover list using snake_case parameters successfully", async () => {
      const mockResponse: GetCoverListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_url_list: ["https://example.com/cover1.jpg"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getCoverList({
        video_upload_id: "upload123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_cover_list", {
        method: "GET",
        auth: true,
        params: {
          video_upload_id: "upload123",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getMetricTrend", () => {
    it("should get metric trend successfully", async () => {
      const mockResponse: GetMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_total_metric_list: [
            {
              data_period: "2024-01-01",
              total_views: 1000,
              total_likes: 50,
              total_shares: 10,
            },
            {
              data_period: "2024-01-02",
              total_views: 1200,
              total_likes: 60,
              total_shares: 15,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getMetricTrend({
        period_type: "Day",
        end_date: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_metric_trend", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Day",
          end_date: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.video_total_metric_list).toHaveLength(2);
    });

    it("should get metric trend using snake_case parameters successfully", async () => {
      const mockResponse: GetMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_total_metric_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getMetricTrend({
        period_type: "Day",
        end_date: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_metric_trend", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Day",
          end_date: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getOverviewPerformance", () => {
    it("should get overview performance successfully", async () => {
      const mockResponse: GetOverviewPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          key_metric: {
            total_viewers: 10000,
          },
          engagement: {
            total_views: 12000,
            total_likes: 500,
            total_shares: 100,
            total_comments: 200,
          },
          fetched_date_range: "2026-05-19 - 2026-05-19",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getOverviewPerformance({
        period_type: "Day",
        end_date: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_overview_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Day",
          end_date: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.key_metric?.total_viewers).toBe(10000);
      expect(result.response.engagement?.total_likes).toBe(500);
    });

    it("should get overview performance using snake_case parameters successfully", async () => {
      const mockResponse: GetOverviewPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getOverviewPerformance({
        period_type: "Day",
        end_date: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_overview_performance", {
        method: "GET",
        auth: true,
        params: {
          period_type: "Day",
          end_date: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getProdcutPerformanceList", () => {
    it("should get product performance list successfully", async () => {
      const mockResponse: GetProdcutPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              item_id: 123456,
              placed_orders: 10,
              placed_sales: 100,
            },
            {
              item_id: 789012,
              placed_orders: 8,
              placed_sales: 80,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getProdcutPerformanceList({
        page_no: 1,
        page_size: 10,
        period_type: "Day",
        end_date: "2026-05-20",
        order_by: "PlacedOrders",
        sort: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_prodcut_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 10,
            period_type: "Day",
            end_date: "2026-05-20",
            order_by: "PlacedOrders",
            sort: "desc",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(2);
    });

    it("should get product performance list using snake_case parameters successfully", async () => {
      const mockResponse: GetProdcutPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getProdcutPerformanceList({
        page_no: 1,
        page_size: 10,
        period_type: "Day",
        end_date: "2026-05-20",
        order_by: "PlacedOrders",
        sort: "desc",
        item_id: 123456,
        item_name: "test product",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_prodcut_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 10,
            period_type: "Day",
            end_date: "2026-05-20",
            order_by: "PlacedOrders",
            sort: "desc",
            item_id: 123456,
            item_name: "test product",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getUserDemographics", () => {
    it("should get user demographics successfully", async () => {
      const mockResponse: GetUserDemographicsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          age: {
            "18-24": 30,
            "25-34": 70,
          },
          gender: {
            Male: 40,
            Female: 60,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getUserDemographics();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_user_demographics", {
        method: "GET",
        auth: true,
        params: {},
      });

      expect(result.error).toBe("");
      expect(result.response.age).toBeDefined();
      expect(result.response.gender).toBeDefined();
    });
  });

  describe("getVideoDetail", () => {
    it("should get video detail successfully", async () => {
      const mockResponse: GetVideoDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_upload_id: "upload123",
          post_id: "post123",
          caption: "Test video caption",
          status: 200,
          post_time: 1704070800,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetail({
        video_upload_id: "upload123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_detail", {
        method: "GET",
        auth: true,
        params: {
          video_upload_id: "upload123",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.video_upload_id).toBe("upload123");
      expect(result.response.caption).toBe("Test video caption");
    });

    it("should get video detail using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetail({
        video_upload_id: "upload123",
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_detail", {
        method: "GET",
        auth: true,
        params: {
          video_upload_id: "upload123",
          post_id: "post123",
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getVideoDetailAudienceDistribution", () => {
    it("should get video detail audience distribution successfully", async () => {
      const mockResponse: GetVideoDetailAudienceDistributionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          age: {
            "18-24": 35.0,
            "25-34": 50.0,
          },
          gender: {
            male: 45.0,
            female: 55.0,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailAudienceDistribution({
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_audience_distribution",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.age).toBeDefined();
    });

    it("should get video detail audience distribution using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoDetailAudienceDistributionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailAudienceDistribution({
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_audience_distribution",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getVideoDetailMetricTrend", () => {
    it("should get video detail metric trend successfully", async () => {
      const mockResponse: GetVideoDetailMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_trend: {
            "1704067200": 500,
            "1704153600": 600,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailMetricTrend({
        post_id: "post123",
        metric_name: "Views",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_metric_trend",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
            metric_name: "Views",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.metric_trend).toBeDefined();
    });

    it("should get video detail metric trend using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoDetailMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailMetricTrend({
        post_id: "post123",
        metric_name: "Views",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_metric_trend",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
            metric_name: "Views",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getVideoDetailPerformance", () => {
    it("should get video detail performance successfully", async () => {
      const mockResponse: GetVideoDetailPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_info: {
            post_id: "post123",
          },
          video_performance: {
            views: 5000,
            likes: 250,
            shares: 50,
            comments: 100,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailPerformance({
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_performance",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.video_performance?.views).toBe(5000);
      expect(result.response.video_performance?.likes).toBe(250);
    });

    it("should get video detail performance using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoDetailPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailPerformance({
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_performance",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getVideoDetailProductPerformance", () => {
    it("should get video detail product performance successfully", async () => {
      const mockResponse: GetVideoDetailProductPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              item_id: 123456,
              placed_orders: 10,
              placed_sales: 100,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailProductPerformance({
        post_id: "post123",
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_product_performance",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
            page_no: 1,
            page_size: 10,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(1);
    });

    it("should get video detail product performance using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoDetailProductPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailProductPerformance({
        post_id: "post123",
        page_no: 1,
        page_size: 10,
        item_id: 123456,
        item_name: "test product",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_product_performance",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
            page_no: 1,
            page_size: 10,
            item_id: 123456,
            item_name: "test product",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("getVideoList", () => {
    it("should get video list successfully", async () => {
      const mockResponse: GetVideoListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              video_upload_id: "upload123",
              caption: "First video",
              status: 300,
              update_time: 1704067200,
            },
            {
              video_upload_id: "upload456",
              caption: "Second video",
              status: 200,
              update_time: 1704070800,
            },
          ],
          has_more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoList({
        page_no: 1,
        page_size: 10,
        list_type: [2],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_list", {
        method: "GET",
        auth: true,
        params: {
          page_no: 1,
          page_size: 10,
          list_type: [2],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(2);
      expect(result.response.has_more).toBe(false);
    });

    it("should get video list using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [],
          has_more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoList({
        page_no: 1,
        page_size: 10,
        list_type: [2],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_list", {
        method: "GET",
        auth: true,
        params: {
          page_no: 1,
          page_size: 10,
          list_type: 2,
        },
      });

      expect(result.error).toBe("");
    });
  });

  describe("getVideoPerformanceList", () => {
    it("should get video performance list successfully", async () => {
      const mockResponse: GetVideoPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              post_id: "post123",
              views: 5000,
              likes: 250,
              shares: 50,
            },
            {
              post_id: "post456",
              views: 3000,
              likes: 150,
              shares: 30,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoPerformanceList({
        page_no: 1,
        page_size: 10,
        period_type: "Day",
        end_date: "2026-05-20",
        order_by: "Views",
        sort: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 10,
            period_type: "Day",
            end_date: "2026-05-20",
            order_by: "Views",
            sort: "desc",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(2);
    });

    it("should get video performance list using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoPerformanceList({
        page_no: 1,
        page_size: 10,
        period_type: "Day",
        end_date: "2026-05-20",
        order_by: "Views",
        sort: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 10,
            period_type: "Day",
            end_date: "2026-05-20",
            order_by: "Views",
            sort: "desc",
          },
        }
      );

      expect(result.error).toBe("");
    });
  });

  describe("postVideo", () => {
    it("should post video successfully", async () => {
      const mockResponse: PostVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              success_video_upload_id: "upload123",
              post_id: "post123",
            },
          ],
          failure_list: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.postVideo({
        video_upload_id_list: ["upload123"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/post_video", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id_list: ["upload123"],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.success_list).toHaveLength(1);
      expect(result.response.success_list![0].post_id).toBe("post123");
    });

    it("should post video using snake_case parameters successfully", async () => {
      const mockResponse: PostVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.postVideo({
        video_upload_id_list: ["upload123"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/post_video", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id_list: ["upload123"],
        },
      });

      expect(result.error).toBe("");
    });

    it("should handle post video failure", async () => {
      const mockResponse: PostVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [],
          failure_list: [
            {
              fail_video_upload_id: "upload123",
              failed_reason: "Video is still processing",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.postVideo({
        video_upload_id_list: ["upload123"],
      });

      expect(result.response.failure_list).toHaveLength(1);
      expect(result.response.failure_list![0].failed_reason).toBe("Video is still processing");
    });
  });
});
