// NOTE: This file is auto-generated. Do not edit directly.

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
import { RequestOptions } from "../schemas/fetch.js";
export class MediaSpaceManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Cancel a video upload session
   *
   * @param {CancelVideoUploadRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CancelVideoUploadResponse>} Promise resolving to the response
   */
  public async cancelVideoUpload(
    params: CancelVideoUploadRequest,
    options?: RequestOptions
  ): Promise<CancelVideoUploadResponse> {
    return ShopeeFetch.fetch<CancelVideoUploadResponse>(
      this.config,
      "/media_space/cancel_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Complete the video upload and starts the transcoding process when all parts are uploaded successfully.
   *
   * @param {CompleteVideoUploadRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CompleteVideoUploadResponse>} Promise resolving to the response
   */
  public async completeVideoUpload(
    params: CompleteVideoUploadRequest,
    options?: RequestOptions
  ): Promise<CompleteVideoUploadResponse> {
    return ShopeeFetch.fetch<CompleteVideoUploadResponse>(
      this.config,
      "/media_space/complete_video_upload",
      {
        method: "POST",
        body: params,
        request: options,
      }
    );
  }
  /**
   * Query the upload status and result of video upload.
   *
   * @param {GetVideoUploadResultRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<GetVideoUploadResultResponse>} Promise resolving to the response
   */
  public async getVideoUploadResult(
    params: GetVideoUploadResultRequest,
    options?: RequestOptions
  ): Promise<GetVideoUploadResultResponse> {
    return ShopeeFetch.fetch<GetVideoUploadResultResponse>(
      this.config,
      "/media_space/get_video_upload_result",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
      }
    );
  }
  /**
   * Initiate video upload session.Video duration should be between 10s and 60s (inclusive).
   *
   * @param {InitVideoUploadRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<InitVideoUploadResponse>} Promise resolving to the response
   */
  public async initVideoUpload(
    params: InitVideoUploadRequest,
    options?: RequestOptions
  ): Promise<InitVideoUploadResponse> {
    return ShopeeFetch.fetch<InitVideoUploadResponse>(
      this.config,
      "/media_space/init_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to upload multiple image files (less than 9 images).
   *
   * @param {UploadImageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadImageResponse>} Promise resolving to the response
   */
  public async uploadImage(
    params: UploadImageRequest,
    options?: RequestOptions
  ): Promise<UploadImageResponse> {
    return ShopeeFetch.fetch<UploadImageResponse>(this.config, "/media_space/upload_image", {
      method: "POST",
      body: params,
      request: options,
    });
  }
  /**
   * Upload video file by part using the upload_id in initiate_video_upload.The request Content-Type of this API should be of multipart/form-data
   *
   * @param {UploadVideoPartRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadVideoPartResponse>} Promise resolving to the response
   */
  public async uploadVideoPart(
    params: UploadVideoPartRequest,
    options?: RequestOptions
  ): Promise<UploadVideoPartResponse> {
    return ShopeeFetch.fetch<UploadVideoPartResponse>(
      this.config,
      "/media_space/upload_video_part",
      {
        method: "POST",
        body: params,
        request: options,
      }
    );
  }
}
