import { BaseManager } from "./base.manager.js";
import { ShopeeConfig } from "../sdk.js";
import { DeleteVideoParams, DeleteVideoResponse, EditVideoInfoParams, EditVideoInfoResponse, GetCoverListParams, GetCoverListResponse, GetMetricTrendParams, GetMetricTrendResponse, GetOverviewPerformanceParams, GetOverviewPerformanceResponse, GetProductPerformanceListParams, GetProductPerformanceListResponse, GetUserDemographicsParams, GetUserDemographicsResponse, GetVideoDetailParams, GetVideoDetailResponse, GetVideoDetailAudienceDistributionParams, GetVideoDetailAudienceDistributionResponse, GetVideoDetailMetricTrendParams, GetVideoDetailMetricTrendResponse, GetVideoDetailPerformanceParams, GetVideoDetailPerformanceResponse, GetVideoDetailProductPerformanceParams, GetVideoDetailProductPerformanceResponse, GetVideoListParams, GetVideoListResponse, GetVideoPerformanceListParams, GetVideoPerformanceListResponse, PostVideoParams, PostVideoResponse } from "../schemas/video.js";
export declare class VideoManager extends BaseManager {
    constructor(config: ShopeeConfig);
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
    deleteVideo(params: DeleteVideoParams): Promise<DeleteVideoResponse>;
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
    editVideoInfo(params: EditVideoInfoParams): Promise<EditVideoInfoResponse>;
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
    getCoverList(params: GetCoverListParams): Promise<GetCoverListResponse>;
    /**
     * Get metric trend
     *
     * Use this API to get metric trends for videos over a time period.
     *
     * @param params - Parameters for getting metric trend
     *
     * @returns A promise that resolves to the metric trend response
     */
    getMetricTrend(params: GetMetricTrendParams): Promise<GetMetricTrendResponse>;
    /**
     * Get overview performance
     *
     * Use this API to get overview performance metrics for videos.
     *
     * @param params - Parameters for getting overview performance
     *
     * @returns A promise that resolves to the overview performance response
     */
    getOverviewPerformance(params: GetOverviewPerformanceParams): Promise<GetOverviewPerformanceResponse>;
    /**
     * Get product performance list
     *
     * Use this API to get performance metrics for products linked to videos.
     *
     * @param params - Parameters for getting product performance list
     *
     * @returns A promise that resolves to the product performance list response
     */
    getProductPerformanceList(params: GetProductPerformanceListParams): Promise<GetProductPerformanceListResponse>;
    /**
     * Get user demographics
     *
     * Use this API to get demographic information of video viewers.
     *
     * @param params - Parameters for getting user demographics
     *
     * @returns A promise that resolves to the user demographics response
     */
    getUserDemographics(params: GetUserDemographicsParams): Promise<GetUserDemographicsResponse>;
    /**
     * Get video detail
     *
     * Use this API to get detailed information about a video.
     *
     * @param params - Parameters for getting video detail
     *
     * @returns A promise that resolves to the video detail response
     */
    getVideoDetail(params: GetVideoDetailParams): Promise<GetVideoDetailResponse>;
    /**
     * Get video detail audience distribution
     *
     * Use this API to get audience distribution for a specific video.
     *
     * @param params - Parameters for getting video detail audience distribution
     *
     * @returns A promise that resolves to the video detail audience distribution response
     */
    getVideoDetailAudienceDistribution(params: GetVideoDetailAudienceDistributionParams): Promise<GetVideoDetailAudienceDistributionResponse>;
    /**
     * Get video detail metric trend
     *
     * Use this API to get metric trends for a specific video.
     *
     * @param params - Parameters for getting video detail metric trend
     *
     * @returns A promise that resolves to the video detail metric trend response
     */
    getVideoDetailMetricTrend(params: GetVideoDetailMetricTrendParams): Promise<GetVideoDetailMetricTrendResponse>;
    /**
     * Get video detail performance
     *
     * Use this API to get performance metrics for a specific video.
     *
     * @param params - Parameters for getting video detail performance
     *
     * @returns A promise that resolves to the video detail performance response
     */
    getVideoDetailPerformance(params: GetVideoDetailPerformanceParams): Promise<GetVideoDetailPerformanceResponse>;
    /**
     * Get video detail product performance
     *
     * Use this API to get performance metrics for products linked to a specific video.
     *
     * @param params - Parameters for getting video detail product performance
     *
     * @returns A promise that resolves to the video detail product performance response
     */
    getVideoDetailProductPerformance(params: GetVideoDetailProductPerformanceParams): Promise<GetVideoDetailProductPerformanceResponse>;
    /**
     * Get video list
     *
     * Use this API to get a list of videos.
     *
     * @param params - Parameters for getting video list
     *
     * @returns A promise that resolves to the video list response
     */
    getVideoList(params: GetVideoListParams): Promise<GetVideoListResponse>;
    /**
     * Get video performance list
     *
     * Use this API to get performance metrics for multiple videos.
     *
     * @param params - Parameters for getting video performance list
     *
     * @returns A promise that resolves to the video performance list response
     */
    getVideoPerformanceList(params: GetVideoPerformanceListParams): Promise<GetVideoPerformanceListResponse>;
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
    postVideo(params: PostVideoParams): Promise<PostVideoResponse>;
}
