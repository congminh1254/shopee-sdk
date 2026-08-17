import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field RequestId
 */
export enum RequestId {
  AND = "and",
  OR = "or",
}
/**
 * Enum generated for field Status
 */
export enum Status {
  AND = "and",
  OR = "or",
}
/**
 * Enum generated for field Message
 */
export enum Message {
  UPLOADING = "uploading",
  TRANSCODING = "transcoding",
}
/**
 * Enum generated for field VideoUploadId
 */
export enum VideoUploadId {
  AND = "and",
  OR = "or",
}
/**
 * Request parameters for cancel_video_upload
 *
 * Cancel a video upload session
 */
export interface CancelVideoUploadRequest {
  /**
   * The ID of this upload session, returned in init_video_upload.
   */
  video_upload_id: string;
}
/**
 * Response data payload for cancel_video_upload
 */
export interface CancelVideoUploadResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for cancel_video_upload
 *
 * Cancel a video upload session
 */
export type CancelVideoUploadResponse = FetchResponse<CancelVideoUploadResponseData>;
/**
 * CompleteVideoUpload_ReportData sub-interface for CompleteVideoUploadRequest
 */
export interface CompleteVideoUpload_ReportData {
  /**
   * Time used for uploading the video file via upload_video_part api, in milliseconds. For video upload performance tracking purpose.
   */
  upload_cost: number;
}
/**
 * Request parameters for complete_video_upload
 *
 * Complete the video upload and starts the transcoding process when all parts are uploaded successfully.
 */
export interface CompleteVideoUploadRequest {
  /**
   * The ID of this upload session, returned in init_video_upload.
   */
  video_upload_id: string;
  /**
   * All uploaded sequence number.
   */
  part_seq_list: number[];
  report_data: CompleteVideoUpload_ReportData;
}
/**
 * Response data payload for complete_video_upload
 */
export interface CompleteVideoUploadResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for complete_video_upload
 *
 * Complete the video upload and starts the transcoding process when all parts are uploaded successfully.
 */
export type CompleteVideoUploadResponse = FetchResponse<CompleteVideoUploadResponseData>;
/**
 * Request parameters for get_video_upload_result
 *
 * Query the upload status and result of video upload.
 */
export interface GetVideoUploadResultRequest {
  video_upload_id: string;
}
/**
 * GetVideoUploadResult_VideoUrl sub-interface for GetVideoUploadResult_VideoInfo
 */
export interface GetVideoUploadResult_VideoUrl {
  /**
   * The region of this video URL.
   */
  video_url_region?: string;
  /**
   * Video playback URL.
   */
  video_url?: string;
}
/**
 * GetVideoUploadResult_ThumbnailUrl sub-interface for GetVideoUploadResult_VideoInfo
 */
export interface GetVideoUploadResult_ThumbnailUrl {
  /**
   * The region of this image URL.
   */
  image_url_region?: string;
  /**
   * Image display URL.
   */
  image_url?: string;
}
/**
 * GetVideoUploadResult_VideoInfo sub-interface for GetVideoUploadResult_Response
 */
export interface GetVideoUploadResult_VideoInfo {
  /**
   * Video playback URL list.
   */
  video_url_list?: GetVideoUploadResult_VideoUrl[];
  /**
   * Video thumbnail image URL list.
   */
  thumbnail_url_list?: GetVideoUploadResult_ThumbnailUrl[];
  /**
   * Duration of this video, in seconds.
   */
  duration?: number;
}
/**
 * GetVideoUploadResult_Response sub-interface for GetVideoUploadResultResponse
 */
export interface GetVideoUploadResult_Response {
  /**
   * Current status of this video upload session. could be: INITIATED(waiting for part uploading and/or the complete_video_upload API call), TRANSCODING(has received all video parts, and is transcoding the video file), SUCCEEDED(transcoding completed, and this upload_id can now be used for item adding/updating), FAILED(this upload failed, see the message filed for some info), CANCELLED(this upload is cancelled)
   */
  status?: Status | string | number;
  /**
   * Transcoded video info, will be present if status is SUCCEEDED.
   */
  video_info?: GetVideoUploadResult_VideoInfo;
  /**
   * Detail error message if video uploading/transcoding failed.
   */
  message?: Message | string | number;
}
/**
 * Response data payload for get_video_upload_result
 */
export type GetVideoUploadResultResponseData = GetVideoUploadResult_Response;
/**
 * Response payload for get_video_upload_result
 *
 * Query the upload status and result of video upload.
 */
export type GetVideoUploadResultResponse = FetchResponse<GetVideoUploadResultResponseData>;
/**
 * Request parameters for init_video_upload
 *
 * Initiate video upload session.
 *
 * Video duration should be between 10s and 60s (inclusive).
 */
export interface InitVideoUploadRequest {
  /**
   * md5 of video file
   */
  file_md5: string;
  /**
   * size of video file, in bytes, maximum is 30MB
   */
  file_size: number;
}
/**
 * InitVideoUpload_Response sub-interface for InitVideoUploadResponse
 */
export interface InitVideoUpload_Response {
  /**
   * The identifier of this upload session, used in following video upload request and item creating and/or updating
   */
  video_upload_id?: VideoUploadId | string | number;
}
/**
 * Response data payload for init_video_upload
 */
export type InitVideoUploadResponseData = InitVideoUpload_Response;
/**
 * Response payload for init_video_upload
 *
 * Initiate video upload session.
 *
 * Video duration should be between 10s and 60s (inclusive).
 */
export type InitVideoUploadResponse = FetchResponse<InitVideoUploadResponseData>;
/**
 * Request parameters for upload_image
 *
 * Use this API to upload multiple image files (less than 9 images).
 */
export interface UploadImageRequest {
  /**
   * image files. Max 10.0 MB each. Image format accepted: JPG, JPEG, PNG. image number should be less than 9
   */
  image: any;
  /**
   * The scene where the picture is used, The value range is normal or desc; normal: we will process the image as a square image, it is recommended to use when uploading item image; desc: we will not process the image, it is recommended to use when uploading the image of extend_description, if you do not upload this field, it will be normal.
   */
  scene?: string;
  /**
   * only applicable to whitelisted sellers.only support 1:1 and 3:4; 1:1 by default.
   */
  ratio?: string;
}
/**
 * UploadImage_ImageUrl sub-interface for UploadImage_ImageInfo
 */
export interface UploadImage_ImageUrl {
  /**
   * Region of image url
   */
  image_url_region?: string;
  /**
   * image url
   */
  image_url?: string;
}
/**
 * UploadImage_ImageInfo sub-interface for UploadImage_Response
 */
export interface UploadImage_ImageInfo {
  /**
   * Id of image
   */
  image_id?: string;
  /**
   * Image URL of each region
   */
  image_url_list?: UploadImage_ImageUrl[];
}
/**
 * UploadImage_UploadImage_ImageInfo sub-interface for UploadImage_Response
 */
export interface UploadImage_UploadImage_ImageInfo {
  /**
   * the index of images
   */
  id?: number;
  /**
   * Indicate error type if this index's image upload processing hit error. Empty if no error happened for this index's image .
   */
  error?: string;
  /**
   * Indicate error detail if this index's image upload processing hit error. Empty if no error happened for this index's image .
   */
  message?: string;
  image_info?: UploadImage_ImageInfo;
}
/**
 * UploadImage_Response sub-interface for UploadImageResponse
 */
export interface UploadImage_Response {
  image_info?: UploadImage_ImageInfo;
  image_info_list?: UploadImage_UploadImage_ImageInfo[];
}
/**
 * Response data payload for upload_image
 */
export type UploadImageResponseData = UploadImage_Response;
/**
 * Response payload for upload_image
 *
 * Use this API to upload multiple image files (less than 9 images).
 */
export type UploadImageResponse = FetchResponse<UploadImageResponseData>;
/**
 * Request parameters for upload_video_part
 *
 * Upload video file by part using the upload_id in initiate_video_upload.
 *
 * The request Content-Type of this API should be of multipart/form-data
 */
export interface UploadVideoPartRequest {
  /**
   * The video_upload_id in the response of initiate_video_upload
   */
  video_upload_id: string;
  /**
   * Sequence of the current part, starts from 0
   */
  part_seq: number;
  /**
   * md5 of this part
   */
  content_md5: string;
  /**
   * The content of this part of file.  Part size should be exactly 4MB, except last part of file.
   */
  part_content: any;
}
/**
 * Response data payload for upload_video_part
 */
export interface UploadVideoPartResponseData {
  /**
   * Warning message.
   */
  warning?: string;
}
/**
 * Response payload for upload_video_part
 *
 * Upload video file by part using the upload_id in initiate_video_upload.
 *
 * The request Content-Type of this API should be of multipart/form-data
 */
export type UploadVideoPartResponse = FetchResponse<UploadVideoPartResponseData>;
