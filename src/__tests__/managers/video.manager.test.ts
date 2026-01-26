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
const mockFetch = jest.fn();
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
      region: ShopeeRegion.SINGAPORE,
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
              video_upload_id: "upload123",
            },
            {
              video_upload_id: "upload456",
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

    it("should handle partial deletion failure", async () => {
      const mockResponse: DeleteVideoResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          success_list: [
            {
              video_upload_id: "upload123",
            },
          ],
          failure_list: [
            {
              video_upload_id: "upload456",
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
      expect(result.response.failure_list[0].failed_reason).toBe("Video not found");
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
            cover_image_id: "cover123",
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
              cover_image_id: "cover123",
            },
          ],
        },
      });

      expect(result.error).toBe("");
      expect(result.response.success_list).toHaveLength(1);
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
              video_upload_id: "upload123",
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
          },
        ],
      });

      expect(result.response.failure_list).toHaveLength(1);
      expect(result.response.failure_list[0].failed_reason).toBe("Caption exceeds limit");
    });
  });

  describe("getCoverList", () => {
    it("should get cover list successfully", async () => {
      const mockResponse: GetCoverListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          cover_list: [
            {
              cover_image_id: "cover123",
              cover_image_url: "https://example.com/cover1.jpg",
            },
            {
              cover_image_id: "cover456",
              cover_image_url: "https://example.com/cover2.jpg",
            },
          ],
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
      expect(result.response.cover_list).toHaveLength(2);
    });
  });

  describe("getMetricTrend", () => {
    it("should get metric trend successfully", async () => {
      const mockResponse: GetMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_trend_list: [
            {
              date: "2024-01-01",
              view_count: 1000,
              like_count: 50,
              share_count: 10,
            },
            {
              date: "2024-01-02",
              view_count: 1200,
              like_count: 60,
              share_count: 15,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getMetricTrend({
        start_time: 1704067200,
        end_time: 1704153600,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_metric_trend", {
        method: "GET",
        auth: true,
        params: {
          start_time: 1704067200,
          end_time: 1704153600,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.metric_trend_list).toHaveLength(2);
    });
  });

  describe("getOverviewPerformance", () => {
    it("should get overview performance successfully", async () => {
      const mockResponse: GetOverviewPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          total_view_count: 10000,
          total_like_count: 500,
          total_share_count: 100,
          total_comment_count: 200,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getOverviewPerformance({
        start_time: 1704067200,
        end_time: 1704153600,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_overview_performance", {
        method: "GET",
        auth: true,
        params: {
          start_time: 1704067200,
          end_time: 1704153600,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.total_view_count).toBe(10000);
      expect(result.response.total_like_count).toBe(500);
    });
  });

  describe("getProductPerformanceList", () => {
    it("should get product performance list successfully", async () => {
      const mockResponse: GetProductPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          product_performance_list: [
            {
              item_id: 123456,
              click_count: 100,
              add_to_cart_count: 20,
              order_count: 10,
            },
            {
              item_id: 789012,
              click_count: 80,
              add_to_cart_count: 15,
              order_count: 8,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getProductPerformanceList({
        start_time: 1704067200,
        end_time: 1704153600,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_product_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            start_time: 1704067200,
            end_time: 1704153600,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.product_performance_list).toHaveLength(2);
    });
  });

  describe("getUserDemographics", () => {
    it("should get user demographics successfully", async () => {
      const mockResponse: GetUserDemographicsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          age_distribution: [
            { age_range: "18-24", percentage: 30.5 },
            { age_range: "25-34", percentage: 45.2 },
          ],
          gender_distribution: [
            { gender: "male", percentage: 40.0 },
            { gender: "female", percentage: 60.0 },
          ],
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
      expect(result.response.age_distribution).toHaveLength(2);
      expect(result.response.gender_distribution).toHaveLength(2);
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
          status: "POSTED",
          create_time: 1704067200,
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
  });

  describe("getVideoDetailAudienceDistribution", () => {
    it("should get video detail audience distribution successfully", async () => {
      const mockResponse: GetVideoDetailAudienceDistributionResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          age_distribution: [
            { age_range: "18-24", percentage: 35.0 },
            { age_range: "25-34", percentage: 50.0 },
          ],
          gender_distribution: [
            { gender: "male", percentage: 45.0 },
            { gender: "female", percentage: 55.0 },
          ],
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
      expect(result.response.age_distribution).toHaveLength(2);
    });
  });

  describe("getVideoDetailMetricTrend", () => {
    it("should get video detail metric trend successfully", async () => {
      const mockResponse: GetVideoDetailMetricTrendResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          metric_trend_list: [
            {
              date: "2024-01-01",
              view_count: 500,
              like_count: 25,
              share_count: 5,
            },
            {
              date: "2024-01-02",
              view_count: 600,
              like_count: 30,
              share_count: 8,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailMetricTrend({
        post_id: "post123",
        start_time: 1704067200,
        end_time: 1704153600,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_metric_trend",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
            start_time: 1704067200,
            end_time: 1704153600,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.metric_trend_list).toHaveLength(2);
    });
  });

  describe("getVideoDetailPerformance", () => {
    it("should get video detail performance successfully", async () => {
      const mockResponse: GetVideoDetailPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          view_count: 5000,
          like_count: 250,
          share_count: 50,
          comment_count: 100,
          avg_watch_time: 45.5,
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
      expect(result.response.view_count).toBe(5000);
      expect(result.response.like_count).toBe(250);
    });
  });

  describe("getVideoDetailProductPerformance", () => {
    it("should get video detail product performance successfully", async () => {
      const mockResponse: GetVideoDetailProductPerformanceResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          product_performance_list: [
            {
              item_id: 123456,
              click_count: 100,
              add_to_cart_count: 20,
              order_count: 10,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoDetailProductPerformance({
        post_id: "post123",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_detail_product_performance",
        {
          method: "GET",
          auth: true,
          params: {
            post_id: "post123",
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.product_performance_list).toHaveLength(1);
    });
  });

  describe("getVideoList", () => {
    it("should get video list successfully", async () => {
      const mockResponse: GetVideoListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_list: [
            {
              video_upload_id: "upload123",
              caption: "First video",
              status: "POSTED",
              create_time: 1704067200,
            },
            {
              video_upload_id: "upload456",
              caption: "Second video",
              status: "DRAFT",
              create_time: 1704070800,
            },
          ],
          has_more: false,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoList({
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/video/get_video_list", {
        method: "GET",
        auth: true,
        params: {
          page_size: 10,
        },
      });

      expect(result.error).toBe("");
      expect(result.response.video_list).toHaveLength(2);
      expect(result.response.has_more).toBe(false);
    });
  });

  describe("getVideoPerformanceList", () => {
    it("should get video performance list successfully", async () => {
      const mockResponse: GetVideoPerformanceListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_performance_list: [
            {
              post_id: "post123",
              view_count: 5000,
              like_count: 250,
              share_count: 50,
            },
            {
              post_id: "post456",
              view_count: 3000,
              like_count: 150,
              share_count: 30,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await videoManager.getVideoPerformanceList({
        start_time: 1704067200,
        end_time: 1704153600,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/video/get_video_performance_list",
        {
          method: "GET",
          auth: true,
          params: {
            start_time: 1704067200,
            end_time: 1704153600,
          },
        }
      );

      expect(result.error).toBe("");
      expect(result.response.video_performance_list).toHaveLength(2);
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
              video_upload_id: "upload123",
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
      expect(result.response.success_list[0].post_id).toBe("post123");
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
              video_upload_id: "upload123",
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
      expect(result.response.failure_list[0].failed_reason).toBe("Video is still processing");
    });
  });
});
