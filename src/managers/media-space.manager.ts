import { ShopeeConfig } from "../sdk.js";
import { ShopeeFetch } from "../fetch.js";
import {
  UploadImageParams,
  UploadImageResponse,
  InitVideoUploadParams,
  InitVideoUploadResponse,
  UploadVideoPartParams,
  UploadVideoPartResponse,
  CompleteVideoUploadParams,
  CompleteVideoUploadResponse,
  CancelVideoUploadParams,
  CancelVideoUploadResponse,
  GetVideoUploadResultParams,
  GetVideoUploadResultResponse,
} from "../schemas/media-space.js";
import { BaseManager } from "./base.manager.js";

/**
 * MediaSpaceManager handles media file uploads (images and videos) to Shopee's media space.
 *
 * This manager provides functionality for:
 * - Uploading images with different scenes and aspect ratios
 * - Multi-part video upload with session management
 * - Video transcoding status tracking
 * - Video upload cancellation
 */
export class MediaSpaceManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Upload multiple image files to MediaSpace (less than 9 images).
   *
   * @param params - Parameters for image upload
   * @param params.scene - The scene where the picture is used ('normal' for item images, 'desc' for descriptions)
   * @param params.ratio - Image aspect ratio ('1:1' or '3:4', only for whitelisted sellers)
   * @param params.image - Image files (Max 10.0 MB each, formats: JPG, JPEG, PNG)
   * @returns Promise with uploaded image information including image IDs and URLs
   *
   * @remarks
   * This API requires multipart/form-data content type.
   * - normal scene: Images will be processed as square images (recommended for item images)
   * - desc scene: Images will not be processed (recommended for extend_description)
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_tier_img_partial: Internal error, please contact openapi team
   * - error_tier_img_old_app: Internal error, please contact openapi team
   *
   * @example
   * ```typescript
   * const result = await sdk.mediaSpace.uploadImage({
   *   scene: 'normal',
   *   ratio: '1:1',
   *   image: imageFile
   * });
   * console.log('Uploaded image ID:', result.response.image_info_list[0].image_info.image_id);
   * ```
   */
  async uploadImage(params: UploadImageParams): Promise<UploadImageResponse> {
    const response = await ShopeeFetch.fetch<UploadImageResponse>(
      this.config,
      "/media_space/upload_image",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Initiate video upload session.
   *
   * @param params - Parameters for initializing video upload
   * @param params.file_md5 - MD5 hash of the video file
   * @param params.file_size - Size of video file in bytes (maximum 30MB)
   * @returns Promise with video_upload_id for subsequent upload operations
   *
   * @remarks
   * Video duration should be between 10s and 60s (inclusive).
   * Use the returned video_upload_id for uploading video parts and completing the upload.
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_file_size: File size is too large. Video size should be less than 30M
   * - error_param: Invalid parameter
   *
   * @example
   * ```typescript
   * const result = await sdk.mediaSpace.initVideoUpload({
   *   file_md5: '2abf0b6e5ff90ff24437a0808f171a93',
   *   file_size: 1261876
   * });
   * const uploadId = result.response.video_upload_id;
   * ```
   */
  async initVideoUpload(params: InitVideoUploadParams): Promise<InitVideoUploadResponse> {
    const response = await ShopeeFetch.fetch<InitVideoUploadResponse>(
      this.config,
      "/media_space/init_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }

  /**
   * Upload video file by part using the upload_id from initVideoUpload.
   *
   * @param params - Parameters for uploading video part
   * @param params.video_upload_id - The video_upload_id from init_video_upload response
   * @param params.part_seq - Sequence of the current part, starts from 0
   * @param params.content_md5 - MD5 hash of this part
   * @param params.part_content - The content of this part of file
   * @returns Promise indicating success or failure of the part upload
   *
   * @remarks
   * The request Content-Type should be multipart/form-data.
   * Part size should be exactly 4MB, except for the last part of file.
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_invalid_upload_id: Invalid upload_id
   * - error_invalid_part_seq: Invalid part_seq
   * - error_invalid_part_size: Invalid part_size
   *
   * @example
   * ```typescript
   * await sdk.mediaSpace.uploadVideoPart({
   *   video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
   *   part_seq: 0,
   *   content_md5: '3bb08579fffbfc13ed9d23cda8bbb46d',
   *   part_content: videoPart
   * });
   * ```
   */
  async uploadVideoPart(params: UploadVideoPartParams): Promise<UploadVideoPartResponse> {
    const response = await ShopeeFetch.fetch<UploadVideoPartResponse>(
      this.config,
      "/media_space/upload_video_part",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Complete the video upload and start the transcoding process when all parts are uploaded successfully.
   *
   * @param params - Parameters for completing video upload
   * @param params.video_upload_id - The ID of this upload session from init_video_upload
   * @param params.part_seq_list - All uploaded sequence numbers
   * @param params.report_data - Upload performance tracking data
   * @returns Promise indicating completion status
   *
   * @remarks
   * Call this API after all video parts have been successfully uploaded.
   * The video will be transcoded and ready for use in item operations once transcoding completes.
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_invalid_upload_id: Invalid upload_id
   * - error_already_completed: Upload already completed
   *
   * @example
   * ```typescript
   * await sdk.mediaSpace.completeVideoUpload({
   *   video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
   *   part_seq_list: [0, 1, 2, 3],
   *   report_data: { upload_cost: 11832 }
   * });
   * ```
   */
  async completeVideoUpload(
    params: CompleteVideoUploadParams
  ): Promise<CompleteVideoUploadResponse> {
    const response = await ShopeeFetch.fetch<CompleteVideoUploadResponse>(
      this.config,
      "/media_space/complete_video_upload",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  /**
   * Query the upload status and result of video upload.
   *
   * @param params - Parameters for getting video upload result
   * @param params.video_upload_id - The video_upload_id from init_video_upload response
   * @returns Promise with upload status and video information (if transcoding is complete)
   *
   * @remarks
   * Possible status values:
   * - INITIATED: Waiting for part uploading and/or complete_video_upload call
   * - TRANSCODING: Transcoding the video file
   * - SUCCEEDED: Transcoding completed, ready for use
   * - FAILED: Upload failed, check message field for details
   * - CANCELLED: Upload was cancelled
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_invalid_upload_id: Invalid upload_id
   *
   * @example
   * ```typescript
   * const result = await sdk.mediaSpace.getVideoUploadResult({
   *   video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000'
   * });
   * if (result.response.status === 'SUCCEEDED') {
   *   console.log('Video URL:', result.response.video_info.video_url_list[0].video_url);
   * }
   * ```
   */
  async getVideoUploadResult(
    params: GetVideoUploadResultParams
  ): Promise<GetVideoUploadResultResponse> {
    const response = await ShopeeFetch.fetch<GetVideoUploadResultResponse>(
      this.config,
      "/media_space/get_video_upload_result",
      {
        method: "GET",
        auth: true,
        params,
      }
    );

    return response;
  }

  /**
   * Cancel a video upload session.
   *
   * @param params - Parameters for canceling video upload
   * @param params.video_upload_id - The ID of this upload session from init_video_upload
   * @returns Promise indicating cancellation status
   *
   * @remarks
   * Use this API to cancel an ongoing video upload session if needed.
   * After cancellation, the video_upload_id cannot be used for further operations.
   *
   * @throws {Error} When the API request fails or returns an error
   * - error_invalid_upload_id: Invalid upload_id
   * - error_already_completed: Upload already completed
   *
   * @example
   * ```typescript
   * await sdk.mediaSpace.cancelVideoUpload({
   *   video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000'
   * });
   * ```
   */
  async cancelVideoUpload(params: CancelVideoUploadParams): Promise<CancelVideoUploadResponse> {
    const response = await ShopeeFetch.fetch<CancelVideoUploadResponse>(
      this.config,
      "/media_space/cancel_video_upload",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );

    return response;
  }
}
