import {
  CancelVideoUploadRequest,
  CancelVideoUploadResponse,
  CompleteVideoUploadRequest,
  CompleteVideoUploadResponse,
  GetVideoUploadResultRequest,
  GetVideoUploadResultResponse,
  InitVideoUploadRequest,
  InitVideoUploadResponse,
  UploadImageRequest,
  UploadImageResponse,
  UploadVideoPartRequest,
  UploadVideoPartResponse,
} from "../schemas/media-space.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class MediaSpaceManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Cancel a video upload session
   *
   * @param {CancelVideoUploadRequest} params Request parameters
   * @returns {Promise<CancelVideoUploadResponse>} Promise resolving to the response
   */
  public async cancelVideoUpload(
    params?: CancelVideoUploadRequest
  ): Promise<CancelVideoUploadResponse> {
    return ShopeeFetch.fetch<CancelVideoUploadResponse>(
      this.config,
      "/media_space/cancel_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Complete the video upload and starts the transcoding process when all parts are uploaded successfully.
   *
   * @param {CompleteVideoUploadRequest} params Request parameters
   * @returns {Promise<CompleteVideoUploadResponse>} Promise resolving to the response
   */
  public async completeVideoUpload(
    params?: CompleteVideoUploadRequest
  ): Promise<CompleteVideoUploadResponse> {
    return ShopeeFetch.fetch<CompleteVideoUploadResponse>(
      this.config,
      "/media_space/complete_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Query the upload status and result of video upload.
   *
   * @param {GetVideoUploadResultRequest} params Request parameters
   * @returns {Promise<GetVideoUploadResultResponse>} Promise resolving to the response
   */
  public async getVideoUploadResult(
    params?: GetVideoUploadResultRequest
  ): Promise<GetVideoUploadResultResponse> {
    return ShopeeFetch.fetch<GetVideoUploadResultResponse>(
      this.config,
      "/media_space/get_video_upload_result",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Initiate video upload session.
   *
   * Video duration should be between 10s and 60s (inclusive).
   *
   * @param {InitVideoUploadRequest} params Request parameters
   * @returns {Promise<InitVideoUploadResponse>} Promise resolving to the response
   */
  public async initVideoUpload(params?: InitVideoUploadRequest): Promise<InitVideoUploadResponse> {
    return ShopeeFetch.fetch<InitVideoUploadResponse>(
      this.config,
      "/media_space/init_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to upload multiple image files (less than 9 images).
   *
   * @param {UploadImageRequest} params Request parameters
   * @returns {Promise<UploadImageResponse>} Promise resolving to the response
   */
  public async uploadImage(params?: UploadImageRequest): Promise<UploadImageResponse> {
    return ShopeeFetch.fetch<UploadImageResponse>(this.config, "/media_space/upload_image", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Upload video file by part using the upload_id in initiate_video_upload.
   *
   * The request Content-Type of this API should be of multipart/form-data
   *
   * @param {UploadVideoPartRequest} params Request parameters
   * @returns {Promise<UploadVideoPartResponse>} Promise resolving to the response
   */
  public async uploadVideoPart(params?: UploadVideoPartRequest): Promise<UploadVideoPartResponse> {
    return ShopeeFetch.fetch<UploadVideoPartResponse>(
      this.config,
      "/media_space/upload_video_part",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
