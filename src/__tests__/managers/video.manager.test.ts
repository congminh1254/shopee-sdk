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
  GetProductPerformanceListResponse,
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
const mockFetch = jest.fn() as any;
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
          successList: [
            {
              successVideoUploadId: "upload123",
            },
            {
              successVideoUploadId: "upload456",
            },
          ],
          failureList: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.deleteVideo({
        videoUploadIdList: ["upload123", "upload456"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/delete_video", {
        method: "POST",
        auth: true,
        body: {
          videoUploadIdList: ["upload123", "upload456"],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.successList).toHaveLength(2);
      expect(result.response.failureList).toHaveLength(0);
    });

    it("should delete draft videos using snake_case parameters successfully", async () => {
      const mockResponse: DeleteVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          successList: [
            {
              successVideoUploadId: "upload123",
            },
          ],
          failureList: [],
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
          successList: [
            {
              successVideoUploadId: "upload123",
            },
          ],
          failureList: [
            {
              failVideoUploadId: "upload456",
              failedReason: "Video not found",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.deleteVideo({
        videoUploadIdList: ["upload123", "upload456"],
      });

      expect(result.response.successList).toHaveLength(1);
      expect(result.response.failureList).toHaveLength(1);
      expect(result.response.failureList![0].failedReason).toBe("Video not found");
    });
  });

  describe("editVideoInfo", () => {
    it("should edit video info successfully", async () => {
      const mockResponse: EditVideoInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          successList: ["upload123"],
          failureList: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.editVideoInfo({
        videoUploadList: [
          {
            videoUploadId: "upload123",
            caption: "Updated caption",
            coverImageUrl: "https://example.com/cover1.jpg",
            allowInfo: {
              allowDuet: true,
              allowStitch: true,
            },
            scheduledInfo: {
              scheduledPost: false,
            },
          },
        ],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/edit_video_info", {
        method: "POST",
        auth: true,
        body: {
          videoUploadList: [
            {
              videoUploadId: "upload123",
              caption: "Updated caption",
              coverImageUrl: "https://example.com/cover1.jpg",
              allowInfo: {
                allowDuet: true,
                allowStitch: true,
              },
              scheduledInfo: {
                scheduledPost: false,
              },
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.successList).toHaveLength(1);
    });

    it("should edit video info using snake_case parameters successfully", async () => {
      const mockResponse: EditVideoInfoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          successList: ["upload123"],
          failureList: [],
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
          successList: [],
          failureList: [
            {
              failVideoUploadId: "upload123",
              failedReason: "Caption exceeds limit",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.editVideoInfo({
        videoUploadList: [
          {
            videoUploadId: "upload123",
            caption: "a".repeat(1001),
            coverImageUrl: "https://example.com/cover1.jpg",
            allowInfo: {
              allowDuet: true,
              allowStitch: true,
            },
            scheduledInfo: {
              scheduledPost: false,
            },
          },
        ],
      });

      expect(result.response.failureList).toHaveLength(1);
      expect(result.response.failureList![0].failedReason).toBe("Caption exceeds limit");
    });
  });

  describe("getCoverList", () => {
    it("should get cover list successfully", async () => {
      const mockResponse: GetCoverListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          imageUrlList: ["https://example.com/cover1.jpg", "https://example.com/cover2.jpg"],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getCoverList({
        videoUploadId: "upload123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_cover_list", {
        method: "GET",
        auth: true,
        params: {
          videoUploadId: "upload123",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.imageUrlList).toHaveLength(2);
    });

    it("should get cover list using snake_case parameters successfully", async () => {
      const mockResponse: GetCoverListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          imageUrlList: ["https://example.com/cover1.jpg"],
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
          videoTotalMetricList: [
            {
              dataPeriod: "2024-01-01",
              totalViews: 1000,
              totalLikes: 50,
              totalShares: 10,
            },
            {
              dataPeriod: "2024-01-02",
              totalViews: 1200,
              totalLikes: 60,
              totalShares: 15,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getMetricTrend({
        periodType: "Day",
        endDate: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_metric_trend", {
        method: "GET",
        auth: true,
        params: {
          periodType: "Day",
          endDate: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.videoTotalMetricList).toHaveLength(2);
    });

    it("should get metric trend using snake_case parameters successfully", async () => {
      const mockResponse: GetMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          videoTotalMetricList: [],
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
          keyMetric: {
            totalViewers: 10000,
          },
          engagement: {
            totalViews: 12000,
            totalLikes: 500,
            totalShares: 100,
            totalComments: 200,
          },
          fetchedDateRange: "2026-05-19 - 2026-05-19",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getOverviewPerformance({
        periodType: "Day",
        endDate: "2026-05-20",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_overview_performance", {
        method: "GET",
        auth: true,
        params: {
          periodType: "Day",
          endDate: "2026-05-20",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.keyMetric?.totalViewers).toBe(10000);
      expect(result.response.engagement?.totalLikes).toBe(500);
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

  describe("getProductPerformanceList", () => {
    it("should get product performance list successfully", async () => {
      const mockResponse: GetProductPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [
            {
              itemId: 123456,
              placedOrders: 10,
              placedSales: 100,
            },
            {
              itemId: 789012,
              placedOrders: 8,
              placedSales: 80,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getProductPerformanceList({
        pageNo: 1,
        pageSize: 10,
        periodType: "Day",
        endDate: "2026-05-20",
        orderBy: "PlacedOrders",
        sort: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_prodcut_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            pageNo: 1,
            pageSize: 10,
            periodType: "Day",
            endDate: "2026-05-20",
            orderBy: "PlacedOrders",
            sort: "desc",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(2);
    });

    it("should get product performance list using snake_case parameters successfully", async () => {
      const mockResponse: GetProductPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getProductPerformanceList({
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
          videoUploadId: "upload123",
          postId: "post123",
          caption: "Test video caption",
          status: 200,
          postTime: 1704070800,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetail({
        videoUploadId: "upload123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_detail", {
        method: "GET",
        auth: true,
        params: {
          videoUploadId: "upload123",
        },
      });

      expect(result.error).toBe("");
      expect(result.response.videoUploadId).toBe("upload123");
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
        postId: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_audience_distribution",
        {
          method: "GET",
          auth: true,
          params: {
            postId: "post123",
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
          metricTrend: {
            "1704067200": 500,
            "1704153600": 600,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailMetricTrend({
        postId: "post123",
        metricName: "Views",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_metric_trend",
        {
          method: "GET",
          auth: true,
          params: {
            postId: "post123",
            metricName: "Views",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.metricTrend).toBeDefined();
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
          videoInfo: {
            postId: "post123",
          },
          videoPerformance: {
            views: 5000,
            likes: 250,
            shares: 50,
            comments: 100,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailPerformance({
        postId: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_performance",
        {
          method: "GET",
          auth: true,
          params: {
            postId: "post123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.videoPerformance?.views).toBe(5000);
      expect(result.response.videoPerformance?.likes).toBe(250);
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
              itemId: 123456,
              placedOrders: 10,
              placedSales: 100,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailProductPerformance({
        postId: "post123",
        pageNo: 1,
        pageSize: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_product_performance",
        {
          method: "GET",
          auth: true,
          params: {
            postId: "post123",
            pageNo: 1,
            pageSize: 10,
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
              videoUploadId: "upload123",
              caption: "First video",
              status: 300,
              updateTime: 1704067200,
            },
            {
              videoUploadId: "upload456",
              caption: "Second video",
              status: 200,
              updateTime: 1704070800,
            },
          ],
          hasMore: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoList({
        pageNo: 1,
        pageSize: 10,
        listType: 2,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_list", {
        method: "GET",
        auth: true,
        params: {
          pageNo: 1,
          pageSize: 10,
          listType: 2,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.list).toHaveLength(2);
      expect(result.response.hasMore).toBe(false);
    });

    it("should get video list using snake_case parameters successfully", async () => {
      const mockResponse: GetVideoListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          list: [],
          hasMore: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoList({
        page_no: 1,
        page_size: 10,
        list_type: 2,
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
              postId: "post123",
              views: 5000,
              likes: 250,
              shares: 50,
            },
            {
              postId: "post456",
              views: 3000,
              likes: 150,
              shares: 30,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoPerformanceList({
        pageNo: 1,
        pageSize: 10,
        periodType: "Day",
        endDate: "2026-05-20",
        orderBy: "Views",
        sort: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            pageNo: 1,
            pageSize: 10,
            periodType: "Day",
            endDate: "2026-05-20",
            orderBy: "Views",
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
          successList: [
            {
              successVideoUploadId: "upload123",
              postId: "post123",
            },
          ],
          failureList: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.postVideo({
        videoUploadIdList: ["upload123"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/post_video", {
        method: "POST",
        auth: true,
        body: {
          videoUploadIdList: ["upload123"],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.successList).toHaveLength(1);
      expect(result.response.successList![0].postId).toBe("post123");
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
          successList: [],
          failureList: [
            {
              failVideoUploadId: "upload123",
              failedReason: "Video is still processing",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.postVideo({
        videoUploadIdList: ["upload123"],
      });

      expect(result.response.failureList).toHaveLength(1);
      expect(result.response.failureList![0].failedReason).toBe("Video is still processing");
    });
  });
});
