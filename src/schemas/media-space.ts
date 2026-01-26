import { BaseResponse } from "./base.js";

/**
 * Parameters for uploading image to MediaSpace
 */
export interface UploadImageParams {
  /** The scene where the picture is used. Default is 'normal'
   * - normal: Process the image as a square image (recommended for item images)
   * - desc: Do not process the image (recommended for extend_description images)
   */
  scene?: "normal" | "desc";
  /** Image aspect ratio. Only applicable to whitelisted sellers.
   * Supported values: "1:1" (default), "3:4"
   */
  ratio?: "1:1" | "3:4";
  /** Image files. Max 10.0 MB each. Image format accepted: JPG, JPEG, PNG.
   * Image number should be less than 9.
   * Note: This is handled as multipart/form-data in the actual request
   */
  image?: File | Blob | Buffer;
}

/**
 * Image URL information by region
 */
export interface ImageUrlRegion {
  /** Region of image url */
  image_url_region: string;
  /** Image URL */
  image_url: string;
}

/**
 * Image information for MediaSpace
 */
export interface MediaSpaceImageInfo {
  /** Id of image */
  image_id: string;
  /** Image URL of each region */
  image_url_list: ImageUrlRegion[];
}

/**
 * Individual image info in the list
 */
export interface ImageInfoListItem {
  /** The index of images */
  id: number;
  /** Indicate error type if this index's image upload processing hit error */
  error?: string;
  /** Indicate error detail if this index's image upload processing hit error */
  message?: string;
  /** Image information */
  image_info?: MediaSpaceImageInfo;
}

/**
 * Response for uploading image to MediaSpace
 */
export interface UploadImageResponse extends BaseResponse {
  warning?: string;
  response: {
    /** Deprecated field - use image_info_list instead */
    image_info?: MediaSpaceImageInfo;
    /** List of uploaded images with their information */
    image_info_list?: ImageInfoListItem[];
  };
}

/**
 * Parameters for initializing video upload
 */
export interface InitVideoUploadParams {
  /** MD5 of video file */
  file_md5: string;
  /** Size of video file, in bytes. Maximum is 30MB */
  file_size: number;
}

/**
 * Response for initializing video upload
 */
export interface InitVideoUploadResponse extends BaseResponse {
  response: {
    /** The identifier of this upload session, used in following video upload requests and item creating/updating */
    video_upload_id: string;
  };
}

/**
 * Parameters for uploading video part
 */
export interface UploadVideoPartParams {
  /** The video_upload_id from init_video_upload response */
  video_upload_id: string;
  /** Sequence of the current part, starts from 0 */
  part_seq: number;
  /** MD5 of this part */
  content_md5: string;
  /** The content of this part of file. Part size should be exactly 4MB, except last part of file.
   * Note: This is handled as multipart/form-data in the actual request
   */
  part_content?: File | Blob | Buffer;
}

/**
 * Response for uploading video part
 */
export interface UploadVideoPartResponse extends BaseResponse {
  warning?: string;
}

/**
 * Report data for completing video upload
 */
export interface ReportData {
  /** Time used for uploading the video file via upload_video_part api, in milliseconds */
  upload_cost: number;
}

/**
 * Parameters for completing video upload
 */
export interface CompleteVideoUploadParams {
  /** The ID of this upload session, returned in init_video_upload */
  video_upload_id: string;
  /** All uploaded sequence numbers */
  part_seq_list: number[];
  /** Report data for tracking upload performance */
  report_data: ReportData;
}

/**
 * Response for completing video upload
 */
export interface CompleteVideoUploadResponse extends BaseResponse {
  warning?: string;
}

/**
 * Parameters for canceling video upload
 */
export interface CancelVideoUploadParams {
  /** The ID of this upload session, returned in init_video_upload */
  video_upload_id: string;
}

/**
 * Response for canceling video upload
 */
export interface CancelVideoUploadResponse extends BaseResponse {
  warning?: string;
}

/**
 * Video URL information by region
 */
export interface VideoUrlRegion {
  /** The region of this video URL */
  video_url_region: string;
  /** Video playback URL */
  video_url: string;
}

/**
 * Video information after successful transcoding
 */
export interface MediaSpaceVideoInfo {
  /** Video playback URL list */
  video_url_list: VideoUrlRegion[];
  /** Video thumbnail image URL list */
  thumbnail_url_list: ImageUrlRegion[];
  /** Duration of this video, in seconds */
  duration: number;
}

/**
 * Parameters for getting video upload result
 */
export interface GetVideoUploadResultParams extends Record<
  string,
  string | number | boolean | undefined
> {
  /** The video_upload_id from init_video_upload response */
  video_upload_id: string;
}

/**
 * Video upload status
 * - INITIATED: Waiting for part uploading and/or the complete_video_upload API call
 * - TRANSCODING: Has received all video parts, and is transcoding the video file
 * - SUCCEEDED: Transcoding completed, and this upload_id can now be used for item adding/updating
 * - FAILED: This upload failed, see the message field for info
 * - CANCELLED: This upload is cancelled
 */
export type VideoUploadStatus = "INITIATED" | "TRANSCODING" | "SUCCEEDED" | "FAILED" | "CANCELLED";

/**
 * Response for getting video upload result
 */
export interface GetVideoUploadResultResponse extends BaseResponse {
  warning?: string;
  response: {
    /** Current status of this video upload session */
    status: VideoUploadStatus;
    /** Transcoded video info, present if status is SUCCEEDED */
    video_info?: MediaSpaceVideoInfo;
    /** Detail error message if video uploading/transcoding failed */
    message?: string;
  };
}
