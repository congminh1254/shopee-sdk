// NOTE: This file is auto-generated. Do not edit directly.

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
import { RequestOptions } from "../schemas/fetch.js";
export class VideoManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this API to delete video. You can delete the video for both draft and post status.
   *
   * @param {DeleteVideoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<DeleteVideoResponse>} Promise resolving to the response
   */
  public async deleteVideo(
    params?: DeleteVideoRequest,
    options?: RequestOptions
  ): Promise<DeleteVideoResponse> {
    return ShopeeFetch.fetch<DeleteVideoResponse>(this.config, "/video/delete_video", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video first, then call this API to set video post information. After submit, the video is still draft status, you need to call v2.video.post_video to post the video to Shopee Video. You can only set and update post information before the video is post.
   *
   * @param {EditVideoInfoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<EditVideoInfoResponse>} Promise resolving to the response
   */
  public async editVideoInfo(
    params: EditVideoInfoRequest,
    options?: RequestOptions
  ): Promise<EditVideoInfoResponse> {
    return ShopeeFetch.fetch<EditVideoInfoResponse>(this.config, "/video/edit_video_info", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, and call the v2.media.get_video_upload_result to get the video_upload_id of uploaded video. After the video is uploaded, obtain the frame-by-frame results and select a specific frame as the video cover.
   *
   * @param {GetCoverListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetCoverListResponse>} Promise resolving to the response
   */
  public async getCoverList(
    params: GetCoverListRequest,
    options?: RequestOptions
  ): Promise<GetCoverListResponse> {
    return ShopeeFetch.fetch<GetCoverListResponse>(this.config, "/video/get_cover_list", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Query video data indicator trends.
   *
   * @param {GetMetricTrendRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetMetricTrendResponse>} Promise resolving to the response
   */
  public async getMetricTrend(
    params: GetMetricTrendRequest,
    options?: RequestOptions
  ): Promise<GetMetricTrendResponse> {
    return ShopeeFetch.fetch<GetMetricTrendResponse>(this.config, "/video/get_metric_trend", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
    });
  }
  /**
   * Get overall performance data for all post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetOverviewPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetOverviewPerformanceResponse>} Promise resolving to the response
   */
  public async getOverviewPerformance(
    params: GetOverviewPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetOverviewPerformanceResponse> {
    return ShopeeFetch.fetch<GetOverviewPerformanceResponse>(
      this.config,
      "/video/get_overview_performance",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get specific performance data for products linked with Shopee Video. There is at least a one-day delay.
   *
   * @param {GetProdcutPerformanceListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetProdcutPerformanceListResponse>} Promise resolving to the response
   */
  public async getProdcutPerformanceList(
    params: GetProdcutPerformanceListRequest,
    options?: RequestOptions
  ): Promise<GetProdcutPerformanceListResponse> {
    return ShopeeFetch.fetch<GetProdcutPerformanceListResponse>(
      this.config,
      "/video/get_prodcut_performance_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get user demographics data to better understand the types of viewers that watch your Shopee Video.
   *
   * @param {GetUserDemographicsRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetUserDemographicsResponse>} Promise resolving to the response
   */
  public async getUserDemographics(
    params?: GetUserDemographicsRequest,
    options?: RequestOptions
  ): Promise<GetUserDemographicsResponse> {
    return ShopeeFetch.fetch<GetUserDemographicsResponse>(
      this.config,
      "/video/get_user_demographics",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the detail information of video.
   *
   * @param {GetVideoDetailRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoDetailResponse>} Promise resolving to the response
   */
  public async getVideoDetail(
    params?: GetVideoDetailRequest,
    options?: RequestOptions
  ): Promise<GetVideoDetailResponse> {
    return ShopeeFetch.fetch<GetVideoDetailResponse>(this.config, "/video/get_video_detail", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
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
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoDetailAudienceDistributionResponse>} Promise resolving to the response
   */
  public async getVideoDetailAudienceDistribution(
    params: GetVideoDetailAudienceDistributionRequest,
    options?: RequestOptions
  ): Promise<GetVideoDetailAudienceDistributionResponse> {
    return ShopeeFetch.fetch<GetVideoDetailAudienceDistributionResponse>(
      this.config,
      "/video/get_video_detail_audience_distribution",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get detailed metric trend data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailMetricTrendRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoDetailMetricTrendResponse>} Promise resolving to the response
   */
  public async getVideoDetailMetricTrend(
    params: GetVideoDetailMetricTrendRequest,
    options?: RequestOptions
  ): Promise<GetVideoDetailMetricTrendResponse> {
    return ShopeeFetch.fetch<GetVideoDetailMetricTrendResponse>(
      this.config,
      "/video/get_video_detail_metric_trend",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get detailed performance data for individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoDetailPerformanceResponse>} Promise resolving to the response
   */
  public async getVideoDetailPerformance(
    params: GetVideoDetailPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetVideoDetailPerformanceResponse> {
    return ShopeeFetch.fetch<GetVideoDetailPerformanceResponse>(
      this.config,
      "/video/get_video_detail_performance",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
        timestampPaths: ["response.video_info.post_time"],
      }
    );
  }
  /**
   * Get performance data for products linked with individual post Shopee Video. There is at least a one-day delay.
   *
   * @param {GetVideoDetailProductPerformanceRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoDetailProductPerformanceResponse>} Promise resolving to the response
   */
  public async getVideoDetailProductPerformance(
    params: GetVideoDetailProductPerformanceRequest,
    options?: RequestOptions
  ): Promise<GetVideoDetailProductPerformanceResponse> {
    return ShopeeFetch.fetch<GetVideoDetailProductPerformanceResponse>(
      this.config,
      "/video/get_video_detail_product_performance",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
      }
    );
  }
  /**
   * Get the list of video in draft status or video already post to Shopee Video.
   *
   * @param {GetVideoListRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoListResponse>} Promise resolving to the response
   */
  public async getVideoList(
    params: GetVideoListRequest,
    options?: RequestOptions
  ): Promise<GetVideoListResponse> {
    return ShopeeFetch.fetch<GetVideoListResponse>(this.config, "/video/get_video_list", {
      method: "GET",
      auth: "user",
      params: params,
      request: options,
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
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoPerformanceListResponse>} Promise resolving to the response
   */
  public async getVideoPerformanceList(
    params: GetVideoPerformanceListRequest,
    options?: RequestOptions
  ): Promise<GetVideoPerformanceListResponse> {
    return ShopeeFetch.fetch<GetVideoPerformanceListResponse>(
      this.config,
      "/video/get_video_performance_list",
      {
        method: "GET",
        auth: "user",
        params: params,
        request: options,
        timestampPaths: ["response.list.post_time"],
      }
    );
  }
  /**
   * You need to call v2.media.init_video_upload, v2.media.upload_video_part, and v2.media.complete_video_upload to upload the video, then call the v2.video.edit_video_info API to set video post information, finally call this API to post the video to Shopee Video.
   *
   * @param {PostVideoRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<PostVideoResponse>} Promise resolving to the response
   */
  public async postVideo(
    params: PostVideoRequest,
    options?: RequestOptions
  ): Promise<PostVideoResponse> {
    return ShopeeFetch.fetch<PostVideoResponse>(this.config, "/video/post_video", {
      method: "POST",
      auth: "user",
      body: params,
      request: options,
    });
  }
}
