import { jest } from "@jest/globals";
import { MediaManager } from "../../managers/media.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  UploadImageResponse,
  InitVideoUploadResponse,
  UploadVideoPartResponse,
  CompleteVideoUploadResponse,
  GetVideoUploadResultResponse,
  CancelVideoUploadResponse,
} from "../../schemas/media.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("MediaManager", () => {
  let mediaManager: MediaManager;
  let mockConfig: ShopeeConfig;
  const mockShopeeFetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    mediaManager = new MediaManager(mockConfig);
  });

  describe("uploadImage", () => {
    it("should upload a single image with default settings", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_list: [
            {
              image_id: "test_image_id",
              image_url: "https://cf.shopee.sg/file/test_image",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        business: 1,
        scene: 1,
        images: [{ image_data: "image-bytes-base64" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",
        auth: true,
        body: {
          business: 1,
          scene: 1,
          images: [{ image_data: "image-bytes-base64" }],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.image_list).toHaveLength(1);
      expect(result.response.image_list![0].image_id).toBe("test_image_id");
    });

    it("should upload multiple images with scene and ratio", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_list: [
            {
              image_id: "test_image_id_1",
              image_url: "https://cf.shopee.sg/file/test_image_1",
            },
            {
              image_id: "test_image_id_2",
              image_url: "https://cf.shopee.sg/file/test_image_2",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        business: 2,
        scene: 1,
        images: [Buffer.from("image1"), Buffer.from("image2")],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",
        auth: true,
        body: {
          business: 2,
          scene: 1,
          images: [Buffer.from("image1"), Buffer.from("image2")],
        },
      });

      expect(result.response.image_list).toHaveLength(2);
    });

    it("should upload description image without processing", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_list: [
            {
              image_id: "desc_image_id",
              image_url: "https://cf.shopee.sg/file/desc_image",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        business: 2,
        scene: 1,
        images: Buffer.from("desc-image-bytes"),
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",
        auth: true,
        body: {
          business: 2,
          scene: 1,
          images: Buffer.from("desc-image-bytes"),
        },
      });

      expect(result.response.image_list![0].image_id).toBe("desc_image_id");
    });
  });

  describe("initVideoUpload", () => {
    it("should initiate video upload session", async () => {
      const mockResponse: InitVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.initVideoUpload({
        file_size: 1261876,
        business: 1,
        scene: 1,
        file_name: "test.mp4",
        duration: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/init_video_upload", {
        method: "POST",
        auth: true,
        body: {
          file_size: 1261876,
          business: 1,
          scene: 1,
          file_name: "test.mp4",
          duration: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.video_upload_id).toBe(
        "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000"
      );
    });

    it("should handle video upload initialization with max file size", async () => {
      const mockResponse: InitVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_upload_id: "sg_test_video_id",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.initVideoUpload({
        file_size: 30 * 1024 * 1024, // 30MB
        business: 1,
        scene: 1,
        file_name: "test.mp4",
        duration: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/init_video_upload", {
        method: "POST",
        auth: true,
        body: {
          file_size: 30 * 1024 * 1024,
          business: 1,
          scene: 1,
          file_name: "test.mp4",
          duration: 10,
        },
      });

      expect(result.response.video_upload_id).toBe("sg_test_video_id");
    });
  });

  describe("uploadVideoPart", () => {
    it("should upload a video part", async () => {
      const mockResponse: UploadVideoPartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadVideoPart({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq: 0,
        part_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
        part_content: Buffer.from("part0"),
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_video_part", {
        method: "POST",
        body: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
          part_seq: 0,
          part_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
          part_content: Buffer.from("part0"),
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should upload multiple video parts sequentially", async () => {
      const mockResponse: UploadVideoPartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const videoUploadId = "sg_test_upload_id";

      // Upload part 0
      await mediaManager.uploadVideoPart({
        video_upload_id: videoUploadId,
        part_seq: 0,
        part_md5: "part_md5_0",
        part_content: Buffer.from("part0"),
      });

      // Upload part 1
      await mediaManager.uploadVideoPart({
        video_upload_id: videoUploadId,
        part_seq: 1,
        part_md5: "part_md5_1",
        part_content: Buffer.from("part1"),
      });

      expect(mockShopeeFetch).toHaveBeenCalledTimes(2);
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(1, mockConfig, "/media/upload_video_part", {
        method: "POST",
        body: {
          video_upload_id: videoUploadId,
          part_seq: 0,
          part_md5: "part_md5_0",
          part_content: Buffer.from("part0"),
        },
      });
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(2, mockConfig, "/media/upload_video_part", {
        method: "POST",
        body: {
          video_upload_id: videoUploadId,
          part_seq: 1,
          part_md5: "part_md5_1",
          part_content: Buffer.from("part1"),
        },
      });
    });
  });

  describe("completeVideoUpload", () => {
    it("should complete video upload", async () => {
      const mockResponse: CompleteVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.completeVideoUpload({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/complete_video_upload", {
        method: "POST",
        body: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should complete video upload with single part", async () => {
      const mockResponse: CompleteVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.completeVideoUpload({
        video_upload_id: "sg_small_video_id",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/complete_video_upload", {
        method: "POST",
        body: {
          video_upload_id: "sg_small_video_id",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVideoUploadResult", () => {
    it("should get video upload result with SUCCEEDED status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "SUCCEEDED",
          video_info: {
            video_url: "https://cvf.shopee.sg/file/ddb50833eee1c9fda5c522a2e6fc0ea6",
            video_thumbnail_url: "https://cf.shopee.sg/file/75eba55932c987851abc39895047dd54",
            duration: 15,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/get_video_upload_result", {
        method: "GET",
        auth: true,
        params: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe("SUCCEEDED");
      expect(result.response.video_info).toBeDefined();
      expect(result.response.video_info?.duration).toBe(15);
      expect(result.response.video_info?.video_url).toBeDefined();
    });

    it("should get video upload result with PROCESSING status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "PROCESSING",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_transcoding_video_id",
      });

      expect(result.response.status).toBe("PROCESSING");
      expect(result.response.video_info).toBeUndefined();
    });

    it("should get video upload result with FAILED status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "FAILED",
          reason: "Video is too short",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_failed_video_id",
      });

      expect(result.response.status).toBe("FAILED");
      expect(result.response.reason).toBe("Video is too short");
      expect(result.response.video_info).toBeUndefined();
    });

    it("should get video upload result with INITIATED status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "INITIATED",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_initiated_video_id",
      });

      expect(result.response.status).toBe("INITIATED");
    });
  });

  describe("cancelVideoUpload", () => {
    it("should cancel video upload session", async () => {
      const mockResponse: CancelVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.cancelVideoUpload({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/cancel_video_upload", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should cancel video upload during upload", async () => {
      const mockResponse: CancelVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {},
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.cancelVideoUpload({
        video_upload_id: "sg_cancel_during_upload_id",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/cancel_video_upload", {
        method: "POST",
        auth: true,
        body: {
          video_upload_id: "sg_cancel_during_upload_id",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
