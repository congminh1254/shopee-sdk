import { BaseManager } from "./base.manager.js";
import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import {
  DeleteVideoParams,
  DeleteVideoResponse,
  EditVideoInfoParams,
  EditVideoInfoResponse,
  GetCoverListParams,
  GetCoverListResponse,
  GetMetricTrendParams,
  GetMetricTrendResponse,
  GetOverviewPerformanceParams,
  GetOverviewPerformanceResponse,
  GetProductPerformanceListParams,
  GetProductPerformanceListResponse,
  GetUserDemographicsParams,
  GetUserDemographicsResponse,
  GetVideoDetailParams,
  GetVideoDetailResponse,
  GetVideoDetailAudienceDistributionParams,
  GetVideoDetailAudienceDistributionResponse,
  GetVideoDetailMetricTrendParams,
  GetVideoDetailMetricTrendResponse,
  GetVideoDetailPerformanceParams,
  GetVideoDetailPerformanceResponse,
  GetVideoDetailProductPerformanceParams,
  GetVideoDetailProductPerformanceResponse,
  GetVideoListParams,
  GetVideoListResponse,
  GetVideoPerformanceListParams,
  GetVideoPerformanceListResponse,
  PostVideoParams,
  PostVideoResponse,
} from "../schemas/video.js";

export class VideoManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Delete video
   *
   * Use this API to delete videos. You can delete videos with draft status or post status.
   *
   * @param params - Parameters for deleting video
   * @param params.videoUploadIdList - List of video_upload_ids to delete (for draft status)
   * @param params.postIdList - List of post_ids to delete (for post status)
   *
   * @returns A promise that resolves to the delete response containing:
   * - successList: List of videos deleted successfully
   * - failureList: List of videos that failed to delete
   */
  async deleteVideo(params: DeleteVideoParams): Promise<DeleteVideoResponse> {
    const response = await ShopeeFetch.fetch<DeleteVideoResponse>(
      this.config,
      `/video/delete_video`,
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Edit video information
   *
   * Use this API to edit video information including caption, cover image, linked products, and schedule settings.
   *
   * @param params - Parameters for editing video info
   * @param params.videoUploadList - List of videos to edit (max 5)
   *
   * @returns A promise that resolves to the edit response containing:
   * - successList: List of video_upload_ids edited successfully
   * - failureList: List of video_upload_ids that failed to edit
   */
  async editVideoInfo(params: EditVideoInfoParams): Promise<EditVideoInfoResponse> {
    const response = await ShopeeFetch.fetch<EditVideoInfoResponse>(
      this.config,
      `/video/edit_video_info`,
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Get cover list
   *
   * Use this API to get available cover images for a video.
   *
   * @param params - Parameters for getting cover list
   * @param params.videoUploadId - ID of uploaded video
   *
   * @returns A promise that resolves to the cover list response
   */
  async getCoverList(params: GetCoverListParams): Promise<GetCoverListResponse> {
    const response = await ShopeeFetch.fetch<GetCoverListResponse>(
      this.config,
      `/video/get_cover_list`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get metric trend
   *
   * Use this API to get metric trends for videos over a time period.
   *
   * @param params - Parameters for getting metric trend
   *
   * @returns A promise that resolves to the metric trend response
   */
  async getMetricTrend(params: GetMetricTrendParams): Promise<GetMetricTrendResponse> {
    const response = await ShopeeFetch.fetch<GetMetricTrendResponse>(
      this.config,
      `/video/get_metric_trend`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get overview performance
   *
   * Use this API to get overview performance metrics for videos.
   *
   * @param params - Parameters for getting overview performance
   *
   * @returns A promise that resolves to the overview performance response
   */
  async getOverviewPerformance(
    params: GetOverviewPerformanceParams
  ): Promise<GetOverviewPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetOverviewPerformanceResponse>(
      this.config,
      `/video/get_overview_performance`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get product performance list
   *
   * Use this API to get performance metrics for products linked to videos.
   *
   * @param params - Parameters for getting product performance list
   *
   * @returns A promise that resolves to the product performance list response
   */
  async getProductPerformanceList(
    params: GetProductPerformanceListParams
  ): Promise<GetProductPerformanceListResponse> {
    const response = await ShopeeFetch.fetch<GetProductPerformanceListResponse>(
      this.config,
      `/video/get_product_performance_list`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get user demographics
   *
   * Use this API to get demographic information of video viewers.
   *
   * @param params - Parameters for getting user demographics
   *
   * @returns A promise that resolves to the user demographics response
   */
  async getUserDemographics(
    params: GetUserDemographicsParams
  ): Promise<GetUserDemographicsResponse> {
    const response = await ShopeeFetch.fetch<GetUserDemographicsResponse>(
      this.config,
      `/video/get_user_demographics`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video detail
   *
   * Use this API to get detailed information about a video.
   *
   * @param params - Parameters for getting video detail
   *
   * @returns A promise that resolves to the video detail response
   */
  async getVideoDetail(params: GetVideoDetailParams): Promise<GetVideoDetailResponse> {
    const response = await ShopeeFetch.fetch<GetVideoDetailResponse>(
      this.config,
      `/video/get_video_detail`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video detail audience distribution
   *
   * Use this API to get audience distribution for a specific video.
   *
   * @param params - Parameters for getting video detail audience distribution
   *
   * @returns A promise that resolves to the video detail audience distribution response
   */
  async getVideoDetailAudienceDistribution(
    params: GetVideoDetailAudienceDistributionParams
  ): Promise<GetVideoDetailAudienceDistributionResponse> {
    const response = await ShopeeFetch.fetch<GetVideoDetailAudienceDistributionResponse>(
      this.config,
      `/video/get_video_detail_audience_distribution`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video detail metric trend
   *
   * Use this API to get metric trends for a specific video.
   *
   * @param params - Parameters for getting video detail metric trend
   *
   * @returns A promise that resolves to the video detail metric trend response
   */
  async getVideoDetailMetricTrend(
    params: GetVideoDetailMetricTrendParams
  ): Promise<GetVideoDetailMetricTrendResponse> {
    const response = await ShopeeFetch.fetch<GetVideoDetailMetricTrendResponse>(
      this.config,
      `/video/get_video_detail_metric_trend`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video detail performance
   *
   * Use this API to get performance metrics for a specific video.
   *
   * @param params - Parameters for getting video detail performance
   *
   * @returns A promise that resolves to the video detail performance response
   */
  async getVideoDetailPerformance(
    params: GetVideoDetailPerformanceParams
  ): Promise<GetVideoDetailPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetVideoDetailPerformanceResponse>(
      this.config,
      `/video/get_video_detail_performance`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video detail product performance
   *
   * Use this API to get performance metrics for products linked to a specific video.
   *
   * @param params - Parameters for getting video detail product performance
   *
   * @returns A promise that resolves to the video detail product performance response
   */
  async getVideoDetailProductPerformance(
    params: GetVideoDetailProductPerformanceParams
  ): Promise<GetVideoDetailProductPerformanceResponse> {
    const response = await ShopeeFetch.fetch<GetVideoDetailProductPerformanceResponse>(
      this.config,
      `/video/get_video_detail_product_performance`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video list
   *
   * Use this API to get a list of videos.
   *
   * @param params - Parameters for getting video list
   *
   * @returns A promise that resolves to the video list response
   */
  async getVideoList(params: GetVideoListParams): Promise<GetVideoListResponse> {
    const response = await ShopeeFetch.fetch<GetVideoListResponse>(
      this.config,
      `/video/get_video_list`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Get video performance list
   *
   * Use this API to get performance metrics for multiple videos.
   *
   * @param params - Parameters for getting video performance list
   *
   * @returns A promise that resolves to the video performance list response
   */
  async getVideoPerformanceList(
    params: GetVideoPerformanceListParams
  ): Promise<GetVideoPerformanceListResponse> {
    const response = await ShopeeFetch.fetch<GetVideoPerformanceListResponse>(
      this.config,
      `/video/get_video_performance_list`,
      {
        method: "GET",
        auth: true,
        params: params as unknown as Record<
          string,
          string | number | boolean | undefined | null | (string | number | boolean)[]
        >,
      }
    );

    return response;
  }

  /**
   * Post video
   *
   * Use this API to post videos to Shopee Video.
   *
   * @param params - Parameters for posting video
   *
   * @returns A promise that resolves to the post video response containing:
   * - successList: List of videos posted successfully
   * - failureList: List of videos that failed to post
   */
  async postVideo(params: PostVideoParams): Promise<PostVideoResponse> {
    const response = await ShopeeFetch.fetch<PostVideoResponse>(this.config, `/video/post_video`, {
      method: "POST",
      auth: true,
      body: params,
    });

    return response;
  }
}
