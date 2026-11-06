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
} from "../schemas/media.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import { RequestOptions } from "../schemas/fetch.js";
export class MediaManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this API to cancel an ongoing video upload task. If the upload has already succeeded, failed, or been cancelled, this operation will fail and return error.
   *
   * @param {CancelVideoUploadRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<CancelVideoUploadResponse>} Promise resolving to the response
   */
  public async cancelVideoUpload(
    params: CancelVideoUploadRequest,
    options?: RequestOptions
  ): Promise<CancelVideoUploadResponse> {
    return ShopeeFetch.fetch<CancelVideoUploadResponse>(this.config, "/media/cancel_video_upload", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this API to finalize a video upload task. Once called, the system will transcode all uploaded video parts and prepare the video for use. All parts must be fully uploaded before calling this API.
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
      "/media/complete_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
        request: options,
      }
    );
  }
  /**
   * Use this API to retrieve the current status and result of a video upload task. You can also use video_upload_result_push to get notified immediately when a video upload reaches a final status (SUCCEEDED, FAILED, or CANCELLED).
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
      "/media/get_video_upload_result",
      {
        method: "GET",
        auth: true,
        params: params,
        request: options,
        timestampPaths: ["response.update_time"],
      }
    );
  }
  /**
   * Use this API to initialize a new video upload task and obtain a unique upload session ID.
   *
   * @param {InitVideoUploadRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<InitVideoUploadResponse>} Promise resolving to the response
   */
  public async initVideoUpload(
    params: InitVideoUploadRequest,
    options?: RequestOptions
  ): Promise<InitVideoUploadResponse> {
    return ShopeeFetch.fetch<InitVideoUploadResponse>(this.config, "/media/init_video_upload", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this API to upload images and support different business scenarios through business and scene parameters.
   *
   * @param {UploadImageRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadImageResponse>} Promise resolving to the response
   */
  public async uploadImage(
    params: UploadImageRequest,
    options?: RequestOptions
  ): Promise<UploadImageResponse> {
    return ShopeeFetch.fetch<UploadImageResponse>(this.config, "/media/upload_image", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
  /**
   * Use this API to upload a video file in parts.
   *
   * @param {UploadVideoPartRequest} params Request parameters
   * @param {RequestOptions} options Per-call options such as signal, timeout_ms and retry
   * @returns {Promise<UploadVideoPartResponse>} Promise resolving to the response
   */
  public async uploadVideoPart(
    params: UploadVideoPartRequest,
    options?: RequestOptions
  ): Promise<UploadVideoPartResponse> {
    return ShopeeFetch.fetch<UploadVideoPartResponse>(this.config, "/media/upload_video_part", {
      method: "POST",
      auth: true,
      body: params,
      request: options,
    });
  }
}
