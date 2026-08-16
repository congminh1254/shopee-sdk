import {
  DeleteVideoRequest,
  DeleteVideoResponse,
  EditVideoInfoRequest,
  EditVideoInfoResponse,
  GetCoverListRequest,
  GetCoverListResponse,
  GetMetricTrendRequest,
  GetMetricTrendResponse,
  GetOverviewPerformanceRequest,
  GetOverviewPerformanceResponse,
  GetProdcutPerformanceListRequest,
  GetProdcutPerformanceListResponse,
  GetUserDemographicsRequest,
  GetUserDemographicsResponse,
  GetVideoDetailRequest,
  GetVideoDetailResponse,
  GetVideoDetailAudienceDistributionRequest,
  GetVideoDetailAudienceDistributionResponse,
  GetVideoDetailMetricTrendRequest,
  GetVideoDetailMetricTrendResponse,
  GetVideoDetailPerformanceRequest,
  GetVideoDetailPerformanceResponse,
  GetVideoDetailProductPerformanceRequest,
  GetVideoDetailProductPerformanceResponse,
  GetVideoListRequest,
  GetVideoListResponse,
  GetVideoPerformanceListRequest,
  GetVideoPerformanceListResponse,
  PostVideoRequest,
  PostVideoResponse,
} from "../schemas/video.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class VideoManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this API to delete video. You can delete the video for both draft and post status.
   *
   * @param {DeleteVideoRequest} params Request parameters
   * @returns {Promise<DeleteVideoResponse>} Promise resolving to the response
   */
  public async deleteVideo(params?: DeleteVideoRequest): Promise<DeleteVideoResponse> {
    return ShopeeFetch.fetch<DeleteVideoResponse>(this.config, "/video/delete_video", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video first, then call this API to set video post information. After submit, the video is still draft status, you need to call v2.video.post_video to post the video to Shopee Video. You can only set and update post information before the video is post.
   *
   * @param {EditVideoInfoRequest} params Request parameters
   * @returns {Promise<EditVideoInfoResponse>} Promise resolving to the response
   */
  public async editVideoInfo(params?: EditVideoInfoRequest): Promise<EditVideoInfoResponse> {
    return ShopeeFetch.fetch<EditVideoInfoResponse>(this.config, "/video/edit_video_info", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["video_upload_list.scheduled_info.scheduled_post_time"],
    });
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video. After the video is uploaded, obtain the frame-by-frame results and select a specific frame as the video cover.
   *
   * @param {GetCoverListRequest} params Request parameters
   * @returns {Promise<GetCoverListResponse>} Promise resolving to the response
   */
  public async getCoverList(params?: GetCoverListRequest): Promise<GetCoverListResponse> {
    return ShopeeFetch.fetch<GetCoverListResponse>(this.config, "/video/get_cover_list", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Query video data indicator trends.
   *
   * @param {GetMetricTrendRequest} params Request parameters
   * @returns {Promise<GetMetricTrendResponse>} Promise resolving to the response
   */
  public async getMetricTrend(params?: GetMetricTrendRequest): Promise<GetMetricTrendResponse> {
    return ShopeeFetch.fetch<GetMetricTrendResponse>(this.config, "/video/get_metric_trend", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Get overall performance data for all post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetOverviewPerformanceRequest} params Request parameters
   * @returns {Promise<GetOverviewPerformanceResponse>} Promise resolving to the response
   */
  public async getOverviewPerformance(
    params?: GetOverviewPerformanceRequest
  ): Promise<GetOverviewPerformanceResponse> {
    return ShopeeFetch.fetch<GetOverviewPerformanceResponse>(
      this.config,
      "/video/get_overview_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get specific performance data for products linked with Shopee Video. There is at least a one-day delay.
   *
   * @param {GetProdcutPerformanceListRequest} params Request parameters
   * @returns {Promise<GetProdcutPerformanceListResponse>} Promise resolving to the response
   */
  public async getProdcutPerformanceList(
    params?: GetProdcutPerformanceListRequest
  ): Promise<GetProdcutPerformanceListResponse> {
    return ShopeeFetch.fetch<GetProdcutPerformanceListResponse>(
      this.config,
      "/video/get_prodcut_performance_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get user demographics data to better understand the types of viewers that watch your Shopee Video.
   *
   * @param {GetUserDemographicsRequest} params Request parameters
   * @returns {Promise<GetUserDemographicsResponse>} Promise resolving to the response
   */
  public async getUserDemographics(
    params?: GetUserDemographicsRequest
  ): Promise<GetUserDemographicsResponse> {
    return ShopeeFetch.fetch<GetUserDemographicsResponse>(
      this.config,
      "/video/get_user_demographics",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the detail information of video.
   *
   * @param {GetVideoDetailRequest} params Request parameters
   * @returns {Promise<GetVideoDetailResponse>} Promise resolving to the response
   */
  public async getVideoDetail(params?: GetVideoDetailRequest): Promise<GetVideoDetailResponse> {
    return ShopeeFetch.fetch<GetVideoDetailResponse>(this.config, "/video/get_video_detail", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "response.post_time",
        "response.scheduled_info.scheduled_post_time",
        "response.update_time",
      ],
    });
  }
  /**
   * Get detailed audience distribution data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailAudienceDistributionRequest} params Request parameters
   * @returns {Promise<GetVideoDetailAudienceDistributionResponse>} Promise resolving to the response
   */
  public async getVideoDetailAudienceDistribution(
    params?: GetVideoDetailAudienceDistributionRequest
  ): Promise<GetVideoDetailAudienceDistributionResponse> {
    return ShopeeFetch.fetch<GetVideoDetailAudienceDistributionResponse>(
      this.config,
      "/video/get_video_detail_audience_distribution",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get detailed metric trend data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailMetricTrendRequest} params Request parameters
   * @returns {Promise<GetVideoDetailMetricTrendResponse>} Promise resolving to the response
   */
  public async getVideoDetailMetricTrend(
    params?: GetVideoDetailMetricTrendRequest
  ): Promise<GetVideoDetailMetricTrendResponse> {
    return ShopeeFetch.fetch<GetVideoDetailMetricTrendResponse>(
      this.config,
      "/video/get_video_detail_metric_trend",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get detailed performance data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailPerformanceRequest} params Request parameters
   * @returns {Promise<GetVideoDetailPerformanceResponse>} Promise resolving to the response
   */
  public async getVideoDetailPerformance(
    params?: GetVideoDetailPerformanceRequest
  ): Promise<GetVideoDetailPerformanceResponse> {
    return ShopeeFetch.fetch<GetVideoDetailPerformanceResponse>(
      this.config,
      "/video/get_video_detail_performance",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.video_info.post_time"],
      }
    );
  }
  /**
   * Get performance data for products linked with individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailProductPerformanceRequest} params Request parameters
   * @returns {Promise<GetVideoDetailProductPerformanceResponse>} Promise resolving to the response
   */
  public async getVideoDetailProductPerformance(
    params?: GetVideoDetailProductPerformanceRequest
  ): Promise<GetVideoDetailProductPerformanceResponse> {
    return ShopeeFetch.fetch<GetVideoDetailProductPerformanceResponse>(
      this.config,
      "/video/get_video_detail_product_performance",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get the list of video in draft status or video already post to Shopee Video.
   *
   * @param {GetVideoListRequest} params Request parameters
   * @returns {Promise<GetVideoListResponse>} Promise resolving to the response
   */
  public async getVideoList(params?: GetVideoListRequest): Promise<GetVideoListResponse> {
    return ShopeeFetch.fetch<GetVideoListResponse>(this.config, "/video/get_video_list", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "response.list.post_time",
        "response.list.scheduled_info.scheduled_post_time",
        "response.list.update_time",
      ],
    });
  }
  /**
   * Get specific performance data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoPerformanceListRequest} params Request parameters
   * @returns {Promise<GetVideoPerformanceListResponse>} Promise resolving to the response
   */
  public async getVideoPerformanceList(
    params?: GetVideoPerformanceListRequest
  ): Promise<GetVideoPerformanceListResponse> {
    return ShopeeFetch.fetch<GetVideoPerformanceListResponse>(
      this.config,
      "/video/get_video_performance_list",
      {
        method: "GET",
        auth: true,
        params: params,
        timestampPaths: ["response.list.post_time"],
      }
    );
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, then call the v2.video.edit_video_info API to set video post information, finally call this API to post the video to Shopee Video.
   *
   * @param {PostVideoRequest} params Request parameters
   * @returns {Promise<PostVideoResponse>} Promise resolving to the response
   */
  public async postVideo(params?: PostVideoRequest): Promise<PostVideoResponse> {
    return ShopeeFetch.fetch<PostVideoResponse>(this.config, "/video/post_video", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
}
