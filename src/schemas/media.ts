import { BaseResponse } from "./base.js";

/**
 * Business type for image upload
 * 2 = Returns
 */
export type MediaImageBusiness = 2;

/**
 * Scene type for image upload
 * If business = 2 (Returns):
 * - 1 = Return Seller Self Arrange Pickup Proof Image
 */
export type MediaImageScene = 1;

/**
 * Uploaded image information
 */
export interface MediaImageInfo {
  /** Unique ID of the uploaded image */
  image_id: string;
  /** URL of the uploaded image */
  image_url: string;
}

/**
 * Parameters for v2.media.upload_image
 */
export interface UploadMediaImageParams {
  /** Defines the business type of the uploaded image */
  business: MediaImageBusiness;
  /** Defines the purpose of the uploaded image under the specified business type */
  scene: MediaImageScene;
  /** The image files to be uploaded (file path or buffer) */
  images: string | Buffer | Array<string | Buffer>;
}

/**
 * Response for v2.media.upload_image
 */
export interface UploadMediaImageResponse extends BaseResponse {
  response: {
    /** List of uploaded images */
    image_list: MediaImageInfo[];
  };
}

/**
 * Scene type for media_space image upload
 * - "normal": Process image as square, recommended for item images
 * - "desc": No processing, recommended for extended_description images
 */
export type MediaSpaceImageScene = "normal" | "desc";

/**
 * Image ratio for media_space upload
 * - "1:1": Square image (default)
 * - "3:4": Portrait image (whitelisted sellers only)
 */
export type MediaSpaceImageRatio = "1:1" | "3:4";

/**
 * Region-specific image URL information
 */
export interface ImageUrlRegion {
  /** Region of image url */
  image_url_region: string;
  /** Image URL */
  image_url: string;
}

/**
 * Image information with regional URLs
 */
export interface MediaSpaceImageInfo {
  /** Id of image */
  image_id: string;
  /** Image URL of each region */
  image_url_list: ImageUrlRegion[];
}

/**
 * Individual image upload information
 */
export interface ImageInfoItem {
  /** The index of images */
  id: number;
  /** Indicate error type if this index's image upload processing hit error */
  error: string;
  /** Indicate error detail if this index's image upload processing hit error */
  message: string;
  /** Image information for this upload */
  image_info: MediaSpaceImageInfo;
}

/**
 * Parameters for v2.media_space.upload_image
 */
export interface UploadImageParams {
  /** The image files to be uploaded (up to 9 images) */
  image: string | Buffer | Array<string | Buffer>;
  /** Scene where the picture is used */
  scene?: MediaSpaceImageScene;
  /** Image ratio (only for whitelisted sellers) */
  ratio?: MediaSpaceImageRatio;
}

/**
 * Response for v2.media_space.upload_image
 */
export interface UploadImageResponse extends BaseResponse {
  response: {
    /** @deprecated Use image_info_list instead */
    image_info?: MediaSpaceImageInfo;
    /** List of uploaded images with individual results */
    image_info_list: ImageInfoItem[];
  };
}

/**
 * Parameters for v2.media_space.init_video_upload
 */
export interface InitVideoUploadParams {
  /** MD5 of video file */
  file_md5: string;
  /** Size of video file in bytes (maximum 30MB) */
  file_size: number;
}

/**
 * Response for v2.media_space.init_video_upload
 */
export interface InitVideoUploadResponse extends BaseResponse {
  response: {
    /** The identifier of this upload session */
    video_upload_id: string;
  };
}

/**
 * Parameters for v2.media_space.upload_video_part
 */
export interface UploadVideoPartParams {
  /** The video_upload_id returned by init_video_upload */
  video_upload_id: string;
  /** Sequence of the current part, starts from 0 */
  part_seq: number;
  /** MD5 of this part */
  content_md5: string;
  /** The content of this part of file (exactly 4MB except last part) */
  part_content: string | Buffer;
}

/**
 * Response for v2.media_space.upload_video_part
 */
export interface UploadVideoPartResponse extends BaseResponse {}

/**
 * Report data for video upload performance tracking
 */
export interface VideoUploadReportData {
  /** Time used for uploading the video file via upload_video_part api, in milliseconds */
  upload_cost: number;
}

/**
 * Parameters for v2.media_space.complete_video_upload
 */
export interface CompleteVideoUploadParams {
  /** The ID of this upload session, returned in init_video_upload */
  video_upload_id: string;
  /** All uploaded sequence numbers */
  part_seq_list: number[];
  /** Upload performance tracking data */
  report_data: VideoUploadReportData;
}

/**
 * Response for v2.media_space.complete_video_upload
 */
export interface CompleteVideoUploadResponse extends BaseResponse {}

/**
 * Video upload status
 */
export type VideoUploadStatus =
  | "INITIATED" // Waiting for part uploading and/or the complete_video_upload API call
  | "TRANSCODING" // Received all video parts, transcoding the video file
  | "SUCCEEDED" // Transcoding completed, upload_id can be used for item adding/updating
  | "FAILED" // Upload failed
  | "CANCELLED"; // Upload cancelled

/**
 * Region-specific video URL information
 */
export interface VideoUrlRegion {
  /** The region of this video URL */
  video_url_region: string;
  /** Video playback URL */
  video_url: string;
}

/**
 * Region-specific thumbnail URL information
 */
export interface ThumbnailUrlRegion {
  /** The region of this image URL */
  image_url_region: string;
  /** Image display URL */
  image_url: string;
}

/**
 * Transcoded video information
 */
export interface MediaVideoInfo {
  /** Video playback URL list */
  video_url_list: VideoUrlRegion[];
  /** Video thumbnail image URL list */
  thumbnail_url_list: ThumbnailUrlRegion[];
  /** Duration of this video in seconds */
  duration: number;
}

/**
 * Parameters for v2.media_space.get_video_upload_result
 */
export interface GetVideoUploadResultParams extends Record<
  string,
  string | number | boolean | null | undefined
> {
  /** The video_upload_id returned by init_video_upload */
  video_upload_id: string;
}

/**
 * Response for v2.media_space.get_video_upload_result
 */
export interface GetVideoUploadResultResponse extends BaseResponse {
  response: {
    /** Current status of this video upload session */
    status: VideoUploadStatus;
    /** Detail error message if video uploading/transcoding failed */
    message?: string;
    /** Transcoded video info, present if status is SUCCEEDED */
    video_info?: MediaVideoInfo;
  };
}

/**
 * Parameters for v2.media_space.cancel_video_upload
 */
export interface CancelVideoUploadParams {
  /** The ID of this upload session, returned in init_video_upload */
  video_upload_id: string;
}

/**
 * Response for v2.media_space.cancel_video_upload
 */
export interface CancelVideoUploadResponse extends BaseResponse {}

/**
 * Parameters for v2.media.init_video_upload
 */
export interface InitMediaVideoUploadParams {
  /** Defines the business type of the uploaded image. Supported values: 3 = Video */
  business: number;
  /** Defines the purpose of the uploaded image under the specified business type. Supported values: If business = 3 (Video): 1 = Shopee Video */
  scene: number;
  /** Original video file name */
  file_name: string;
  /** Total video file size in bytes. Maximum 1GB. */
  file_size: number;
  /** Video duration in seconds. 1s~180s. */
  duration: number;
}

/**
 * Response for v2.media.init_video_upload
 */
export interface InitMediaVideoUploadResponse extends BaseResponse {
  response: {
    /** Unique upload session ID */
    video_upload_id: string;
    /** The size of each part. When uploading video chunks, the video must be split according to this part size for each upload request. */
    part_size: number;
  };
}

/**
 * Parameters for v2.media.upload_video_part
 */
export interface UploadMediaVideoPartParams {
  /** The unique ID of the upload task, returned by v2.media.init_video_upload */
  video_upload_id: string;
  /** Sequence number of this part, starting from 0 */
  part_seq: number;
  /** The content of this part of file. Part size should be exactly equal to part_size returned in v2.media.init_video_upload, except last part of file. */
  part_content: string | Buffer;
  /** MD5 checksum of this part for data integrity validation */
  part_md5: string;
}

/**
 * Response for v2.media.upload_video_part
 */
export interface UploadMediaVideoPartResponse extends BaseResponse {}

/**
 * Parameters for v2.media.complete_video_upload
 */
export interface CompleteMediaVideoUploadParams {
  /** The unique ID of the upload task, returned by v2.media.init_video_upload */
  video_upload_id: string;
}

/**
 * Response for v2.media.complete_video_upload
 */
export interface CompleteMediaVideoUploadResponse extends BaseResponse {}

/**
 * Parameters for v2.media.get_video_upload_result
 */
export interface GetMediaVideoUploadResultParams extends Record<
  string,
  string | number | boolean | null | undefined
> {
  /** The unique ID of the upload task, returned by v2.media.init_video_upload */
  video_upload_id: string;
}

/**
 * Transcoded video info inside media video upload result
 */
export interface MediaVideoUploadResultVideoInfo {
  /** Video playback url */
  video_url: string;
  /** Video thumbnail image url */
  video_thumbnail_url: string;
  /** Video thumbnail image width */
  thumbnail_width: number;
  /** Video thumbnail image height */
  thumbnail_height: number;
  /** Video duration in seconds */
  duration: number;
  /** Video resolution, e.g., "960x540" */
  resolution: string;
}

/**
 * Response for v2.media.get_video_upload_result
 */
export interface GetMediaVideoUploadResultResponse extends BaseResponse {
  response: {
    /** Current status of the upload task: INITIATED, UPLOADING, UPLOADED, PROCESSING, SUCCEEDED, FAILED, CANCELLED */
    status: string;
    /** Detailed fail or cancel reason, will be returned if status is FAILED or CANCELLED */
    reason?: string;
    /** The time of video status updates */
    update_time?: number;
    /** Transcoded video info, will be returned if status is SUCCEEDED */
    video_info?: MediaVideoUploadResultVideoInfo;
  };
}

/**
 * Parameters for v2.media.cancel_video_upload
 */
export interface CancelMediaVideoUploadParams {
  /** The unique ID of the upload task, returned by v2.media.init_video_upload */
  video_upload_id: string;
}

/**
 * Response for v2.media.cancel_video_upload
 */
export interface CancelMediaVideoUploadResponse extends BaseResponse {}
