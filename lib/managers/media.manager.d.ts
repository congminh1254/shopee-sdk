import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { UploadMediaImageParams, UploadMediaImageResponse, UploadImageParams, UploadImageResponse, InitVideoUploadParams, InitVideoUploadResponse, UploadVideoPartParams, UploadVideoPartResponse, CompleteVideoUploadParams, CompleteVideoUploadResponse, GetVideoUploadResultParams, GetVideoUploadResultResponse, CancelVideoUploadParams, CancelVideoUploadResponse } from "../schemas/media.js";
/**
 * MediaManager handles media upload operations for the Shopee API
 *
 * Provides methods for:
 * - Image upload for various business scenarios
 * - Video upload with multi-part upload support
 * - Video upload status tracking
 */
export declare class MediaManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Upload images for specific business scenarios (e.g., returns)
     *
     * @param {UploadMediaImageParams} params - Parameters for uploading images
     * @param {number} params.business - Business type (2 = Returns)
     * @param {number} params.scene - Scene type (1 = Return Seller Self Arrange Pickup Proof)
     * @param {string | Buffer | Array<string | Buffer>} params.images - Image files to upload
     * @returns {Promise<UploadMediaImageResponse>} Response containing uploaded image information
     *
     * @example
     * ```typescript
     * const result = await sdk.media.uploadMediaImage({
     *   business: 2,
     *   scene: 1,
     *   images: '/path/to/image.jpg'
     * });
     * console.log('Uploaded images:', result.response.image_list);
     * ```
     *
     * **Restrictions:**
     * - business = 2, scene = 1: Up to 3 images, max 10MB each, formats: JPG, JPEG, PNG
     *
     * @throws {Error} When the API request fails
     */
    uploadMediaImage(params: UploadMediaImageParams): Promise<UploadMediaImageResponse>;
    /**
     * Upload multiple image files for general use
     *
     * @param {UploadImageParams} params - Parameters for uploading images
     * @param {string | Buffer | Array<string | Buffer>} params.image - Image files (up to 9 images)
     * @param {string} [params.scene] - Scene type ("normal" or "desc")
     * @param {string} [params.ratio] - Image ratio ("1:1" or "3:4", whitelisted sellers only)
     * @returns {Promise<UploadImageResponse>} Response containing uploaded image information
     *
     * @example
     * ```typescript
     * // Upload product images (square processing)
     * const result = await sdk.media.uploadImage({
     *   image: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
     *   scene: 'normal',
     *   ratio: '1:1'
     * });
     *
     * // Upload description images (no processing)
     * const descResult = await sdk.media.uploadImage({
     *   image: '/path/to/desc-image.jpg',
     *   scene: 'desc'
     * });
     * ```
     *
     * **Image Requirements:**
     * - Maximum: 9 images per request
     * - Maximum size: 10MB per image
     * - Formats: JPG, JPEG, PNG
     * - Scene "normal": Image processed as square (recommended for item images)
     * - Scene "desc": No processing (recommended for extended descriptions)
     *
     * @throws {Error} When the API request fails
     */
    uploadImage(params: UploadImageParams): Promise<UploadImageResponse>;
    /**
     * Initiate a video upload session
     *
     * @param {InitVideoUploadParams} params - Parameters for initiating video upload
     * @param {string} params.file_md5 - MD5 hash of the video file
     * @param {number} params.file_size - Size of video file in bytes (max 30MB)
     * @returns {Promise<InitVideoUploadResponse>} Response containing video_upload_id
     *
     * @example
     * ```typescript
     * const result = await sdk.media.initVideoUpload({
     *   file_md5: '2abf0b6e5ff90ff24437a0808f171a93',
     *   file_size: 1261876
     * });
     * const videoUploadId = result.response.video_upload_id;
     * ```
     *
     * **Video Requirements:**
     * - Duration: 10-60 seconds (inclusive)
     * - Maximum size: 30MB
     * - Must upload by parts after initialization
     *
     * @throws {Error} When the API request fails
     * - error_file_size: File size is too large (max 30MB)
     */
    initVideoUpload(params: InitVideoUploadParams): Promise<InitVideoUploadResponse>;
    /**
     * Upload a video file by parts
     *
     * @param {UploadVideoPartParams} params - Parameters for uploading video part
     * @param {string} params.video_upload_id - Upload ID from initVideoUpload
     * @param {number} params.part_seq - Sequence number starting from 0
     * @param {string} params.content_md5 - MD5 hash of this part
     * @param {string | Buffer} params.part_content - Content of this part
     * @returns {Promise<UploadVideoPartResponse>} Response indicating upload success
     *
     * @example
     * ```typescript
     * // Upload video parts sequentially
     * for (let i = 0; i < partCount; i++) {
     *   await sdk.media.uploadVideoPart({
     *     video_upload_id: videoUploadId,
     *     part_seq: i,
     *     content_md5: partMd5,
     *     part_content: partBuffer
     *   });
     * }
     * ```
     *
     * **Part Requirements:**
     * - Part size: Exactly 4MB except for the last part
     * - Must provide MD5 hash for each part
     * - Upload parts sequentially starting from 0
     *
     * @throws {Error} When the API request fails
     * - error_invalid_upload_id: Invalid upload_id
     * - error_invalid_part_seq: Invalid part_seq
     * - error_invalid_part_size: Invalid part_size
     */
    uploadVideoPart(params: UploadVideoPartParams): Promise<UploadVideoPartResponse>;
    /**
     * Complete the video upload and start transcoding
     *
     * @param {CompleteVideoUploadParams} params - Parameters for completing video upload
     * @param {string} params.video_upload_id - Upload ID from initVideoUpload
     * @param {number[]} params.part_seq_list - List of all uploaded part sequences
     * @param {object} params.report_data - Upload performance tracking data
     * @param {number} params.report_data.upload_cost - Upload time in milliseconds
     * @returns {Promise<CompleteVideoUploadResponse>} Response indicating completion
     *
     * @example
     * ```typescript
     * const startTime = Date.now();
     * // ... upload all parts ...
     * const uploadCost = Date.now() - startTime;
     *
     * await sdk.media.completeVideoUpload({
     *   video_upload_id: videoUploadId,
     *   part_seq_list: [0, 1, 2, 3],
     *   report_data: {
     *     upload_cost: uploadCost
     *   }
     * });
     * ```
     *
     * **Notes:**
     * - Call this after all parts are uploaded successfully
     * - Transcoding process begins after this call
     * - Use getVideoUploadResult to check transcoding status
     *
     * @throws {Error} When the API request fails
     * - error_invalid_upload_id: Invalid upload_id
     * - error_already_completed: Upload already completed
     */
    completeVideoUpload(params: CompleteVideoUploadParams): Promise<CompleteVideoUploadResponse>;
    /**
     * Query the upload status and result of a video upload
     *
     * @param {GetVideoUploadResultParams} params - Parameters for querying video status
     * @param {string} params.video_upload_id - Upload ID from initVideoUpload
     * @returns {Promise<GetVideoUploadResultResponse>} Response containing upload status and video info
     *
     * @example
     * ```typescript
     * const result = await sdk.media.getVideoUploadResult({
     *   video_upload_id: videoUploadId
     * });
     *
     * if (result.response.status === 'SUCCEEDED') {
     *   console.log('Video URL:', result.response.video_info.video_url_list);
     *   console.log('Duration:', result.response.video_info.duration);
     * } else if (result.response.status === 'FAILED') {
     *   console.error('Upload failed:', result.response.message);
     * }
     * ```
     *
     * **Upload Status:**
     * - INITIATED: Waiting for parts or complete_video_upload call
     * - TRANSCODING: Transcoding the video file
     * - SUCCEEDED: Transcoding completed, video ready to use
     * - FAILED: Upload failed, check message for details
     * - CANCELLED: Upload was cancelled
     *
     * @throws {Error} When the API request fails
     * - error_invalid_upload_id: Invalid upload_id
     */
    getVideoUploadResult(params: GetVideoUploadResultParams): Promise<GetVideoUploadResultResponse>;
    /**
     * Cancel a video upload session
     *
     * @param {CancelVideoUploadParams} params - Parameters for cancelling video upload
     * @param {string} params.video_upload_id - Upload ID from initVideoUpload
     * @returns {Promise<CancelVideoUploadResponse>} Response indicating cancellation
     *
     * @example
     * ```typescript
     * await sdk.media.cancelVideoUpload({
     *   video_upload_id: videoUploadId
     * });
     * console.log('Video upload cancelled');
     * ```
     *
     * **Use Cases:**
     * - Cancel upload on user request
     * - Cancel failed upload to free resources
     * - Cancel when upload takes too long
     *
     * @throws {Error} When the API request fails
     * - error_invalid_upload_id: Invalid upload_id
     * - error_already_completed: Upload already completed (cannot cancel)
     */
    cancelVideoUpload(params: CancelVideoUploadParams): Promise<CancelVideoUploadResponse>;
}
