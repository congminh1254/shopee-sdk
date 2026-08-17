// NOTE: This file is auto-generated. Do not edit directly.

import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field Status
 */
export enum Status {
  TRANSCODED = "transcoded",
  VALIDATED = "validated",
}
/**
 * Request parameters for cancel_video_upload
 *
 * Use this API to cancel an ongoing video upload task. If the upload has already succeeded, failed, or been cancelled, this operation will fail and return error.
 */
export interface CancelVideoUploadRequest {
  /**
   * The unique ID of the upload task, returned by v2.media.init_video_upload.
   */
  video_upload_id: string;
}
/**
 * Response data payload for cancel_video_upload
 */
export interface CancelVideoUploadResponseData {
  /**
   * Indicate warning message you should take care.
   */
  warning?: string;
}
/**
 * Response payload for cancel_video_upload
 *
 * Use this API to cancel an ongoing video upload task. If the upload has already succeeded, failed, or been cancelled, this operation will fail and return error.
 */
export type CancelVideoUploadResponse = FetchResponse<CancelVideoUploadResponseData>;
/**
 * Request parameters for complete_video_upload
 *
 * Use this API to finalize a video upload task. Once called, the system will transcode all uploaded video parts and prepare the video for use. All parts must be fully uploaded before calling this API.
 */
export interface CompleteVideoUploadRequest {
  /**
   * The unique ID of the upload task, returned by v2.media.init_video_upload.
   */
  video_upload_id: string;
}
/**
 * Response data payload for complete_video_upload
 */
export interface CompleteVideoUploadResponseData {
  /**
   * Indicate warning message you should take care.
   */
  warning?: string;
}
/**
 * Response payload for complete_video_upload
 *
 * Use this API to finalize a video upload task. Once called, the system will transcode all uploaded video parts and prepare the video for use. All parts must be fully uploaded before calling this API.
 */
export type CompleteVideoUploadResponse = FetchResponse<CompleteVideoUploadResponseData>;
/**
 * Request parameters for get_video_upload_result
 *
 * Use this API to retrieve the current status and result of a video upload task. You can also use video_upload_result_push to get notified immediately when a video upload reaches a final status (SUCCEEDED, FAILED, or CANCELLED).
 */
export interface GetVideoUploadResultRequest {
  /**
   * The unique ID of the upload task, returned by v2.media.init_video_upload.
   */
  video_upload_id: string;
}
/**
 * GetVideoUploadResultVideoInfo sub-interface for GetVideoUploadResultResponseData
 */
export interface GetVideoUploadResultVideoInfo {
  /**
   * Video playback url.
   */
  video_url?: string;
  /**
   * Video thumbnail image url.
   */
  video_thumbnail_url?: string;
  /**
   * Video thumbnail image width.
   */
  thumbnail_width?: number;
  /**
   * Video thumbnail image width.
   */
  thumbnail_height?: number;
  /**
   * Video duration in seconds.
   */
  duration?: number;
  /**
   * Video resolution, e.g., "1280x1280".
   */
  resolution?: string;
}
/**
 * GetVideoUploadResultResponseData sub-interface for GetVideoUploadResultResponse
 */
export interface GetVideoUploadResultResponseData {
  /**
   * Current status of the upload task. Possible values:- INITIATED: Upload task has been created (via init_video_upload) but no parts have been uploaded yet.- UPLOADING: Video file parts are being uploaded. The upload has started but is not yet completed.- UPLOADED: All video parts have been uploaded successfully, waiting for complete_video_upload to trigger processing.- PROCESSING: Video is being transcoded/validated by the system (duration, format, resolution checks).- SUCCEEDED: Video upload and transcoding completed successfully. Video URL and cover URL are available for use.- FAILED: Upload or processing failed (e.g., invalid format, duration not within allowed range, transcoding error).- CANCELLED: Upload task was explicitly canceled by the client (cancel_video_upload), and the video is discarded.
   */
  status?: Status | string | number;
  /**
   * Detailed fail or cancel reason, will be returned if status is FAILED or CANCELLED.
   */
  reason?: string;
  /**
   * The time of video status updates.
   */
  update_time?: Date | number;
  /**
   * Transcoded video info, will be returned if status is SUCCEEDED.
   */
  video_info?: GetVideoUploadResultVideoInfo;
}
/**
 * Response payload for get_video_upload_result
 *
 * Use this API to retrieve the current status and result of a video upload task. You can also use video_upload_result_push to get notified immediately when a video upload reaches a final status (SUCCEEDED, FAILED, or CANCELLED).
 */
export type GetVideoUploadResultResponse = FetchResponse<GetVideoUploadResultResponseData>;
/**
 * Request parameters for init_video_upload
 *
 * Use this API to initialize a new video upload task and obtain a unique upload session ID.
 */
export interface InitVideoUploadRequest {
  /**
   * Defines the business type of the uploaded image. Supported values: 3 = Video
   */
  business: number;
  /**
   * Defines the purpose of the uploaded image under the specified business type. Supported values: - If business = 3 (Video): 1 = Shopee Video
   */
  scene: number;
  /**
   * Original video file name.
   */
  file_name: string;
  /**
   * Total video file size in bytes. Rules and restrictions by business and scene: - If business = 3 (Video) and scene = 1 (Shopee Video): Maximum 1GB.
   */
  file_size: number;
  /**
   * Video duration in seconds. Rules and restrictions by business and scene:- If business = 3 (Video) and scene = 1 (Shopee Video): 1s~180s.
   */
  duration: number;
}
/**
 * InitVideoUploadResponseData sub-interface for InitVideoUploadResponse
 */
export interface InitVideoUploadResponseData {
  /**
   * Unique upload session ID.
   */
  video_upload_id?: string;
  /**
   * The size of each part. When uploading video chunks, the video must be split according to this part size for each upload request.
   */
  part_size?: number;
}
/**
 * Response payload for init_video_upload
 *
 * Use this API to initialize a new video upload task and obtain a unique upload session ID.
 */
export type InitVideoUploadResponse = FetchResponse<InitVideoUploadResponseData>;
/**
 * Request parameters for upload_image
 *
 * Use this API to upload images and support different business scenarios through business and scene parameters.
 */
export interface UploadImageRequest {
  /**
   * Defines the business type of the uploaded image. Supported values: 2 = Returns
   */
  business: number;
  /**
   * Defines the purpose of the uploaded image under the specified business type. Supported values:- If business = 2 (Returns): 1 = Return Seller Self Arrange Pickup Proof Image
   */
  scene: number;
  /**
   * The image files to be uploaded. Rules and restrictions by business and scene:- If business = 2 (Returns) and scene = 1 (Return Seller Self Arrange Pickup Proof Image): Up to 3 images can be uploaded. Each image must not exceed 10MB. Supported formats: JPG, JPEG, PNG.
   */
  images: any;
}
/**
 * UploadImageImage sub-interface for UploadImageResponseData
 */
export interface UploadImageImage {
  /**
   * Unique ID of the uploaded image.
   */
  image_id?: string;
  /**
   * URL of the uploaded image.
   */
  image_url?: string;
}
/**
 * UploadImageResponseData sub-interface for UploadImageResponse
 */
export interface UploadImageResponseData {
  /**
   * List of uploaded images.
   */
  image_list?: UploadImageImage[];
}
/**
 * Response payload for upload_image
 *
 * Use this API to upload images and support different business scenarios through business and scene parameters.
 */
export type UploadImageResponse = FetchResponse<UploadImageResponseData>;
/**
 * Request parameters for upload_video_part
 *
 * Use this API to upload a video file in parts.
 */
export interface UploadVideoPartRequest {
  /**
   * The unique ID of the upload task, returned by v2.media.init_video_upload.
   */
  video_upload_id: string;
  /**
   * Sequence number of this part, starting from 0.
   */
  part_seq: number;
  /**
   * The content of this part of file. Part size should be exactly equal to part_size returned in v2.media.init_video_upload, except last part of file.
   */
  part_content: any;
  /**
   * MD5 checksum of this part for data integrity validation.
   */
  part_md5: string;
}
/**
 * Response data payload for upload_video_part
 */
export interface UploadVideoPartResponseData {
  /**
   * Indicate warning message you should take care.
   */
  warning?: string;
}
/**
 * Response payload for upload_video_part
 *
 * Use this API to upload a video file in parts.
 */
export type UploadVideoPartResponse = FetchResponse<UploadVideoPartResponseData>;
