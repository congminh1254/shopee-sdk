import { jest } from "@jest/globals";
import { MediaManager } from "../../managers/media.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  UploadMediaImageResponse,
  UploadImageResponse,
  InitVideoUploadResponse,
  UploadVideoPartResponse,
  CompleteVideoUploadResponse,
  GetVideoUploadResultResponse,
  CancelVideoUploadResponse,
} from "../../schemas/media.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
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
      region: ShopeeRegion.SINGAPORE,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };

    mediaManager = new MediaManager(mockConfig);
  });

  describe("uploadMediaImage", () => {
    it("should upload images for returns business scenario", async () => {
      const mockResponse: UploadMediaImageResponse = {
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

      const result = await mediaManager.uploadMediaImage({
        business: 2,
        scene: 1,
        images: "/path/to/image.jpg",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",
        body: {
          business: 2,
          scene: 1,
          images: "/path/to/image.jpg",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.image_list).toHaveLength(2);
      expect(result.response.image_list[0].image_id).toBe("test_image_id_1");
    });

    it("should upload multiple images for returns", async () => {
      const mockResponse: UploadMediaImageResponse = {
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
            {
              image_id: "test_image_id_3",
              image_url: "https://cf.shopee.sg/file/test_image_3",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadMediaImage({
        business: 2,
        scene: 1,
        images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",
        body: {
          business: 2,
          scene: 1,
          images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"],
        },
      });

      expect(result.response.image_list).toHaveLength(3);
    });
  });

  describe("uploadImage", () => {
    it("should upload a single image with default settings", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              error: "",
              message: "",
              image_info: {
                image_id: "test_image_id",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/test_image",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        image: "/path/to/image.jpg",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        auth: true,
        body: {
          image: "/path/to/image.jpg",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.image_info_list).toHaveLength(1);
      expect(result.response.image_info_list[0].image_info.image_id).toBe("test_image_id");
    });

    it("should upload multiple images with scene and ratio", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              error: "",
              message: "",
              image_info: {
                image_id: "test_image_id_1",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/test_image_1",
                  },
                ],
              },
            },
            {
              id: 1,
              error: "",
              message: "",
              image_info: {
                image_id: "test_image_id_2",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/test_image_2",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        image: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
        scene: "normal",
        ratio: "1:1",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        auth: true,
        body: {
          image: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
          scene: "normal",
          ratio: "1:1",
        },
      });

      expect(result.response.image_info_list).toHaveLength(2);
    });

    it("should upload description image without processing", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              error: "",
              message: "",
              image_info: {
                image_id: "desc_image_id",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/desc_image",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadImage({
        image: "/path/to/desc-image.jpg",
        scene: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        auth: true,
        body: {
          image: "/path/to/desc-image.jpg",
          scene: "desc",
        },
      });

      expect(result.response.image_info_list[0].image_info.image_id).toBe("desc_image_id");
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
        file_md5: "2abf0b6e5ff90ff24437a0808f171a93",
        file_size: 1261876,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/init_video_upload", {
        method: "POST",
        auth: true,
        body: {
          file_md5: "2abf0b6e5ff90ff24437a0808f171a93",
          file_size: 1261876,
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
        file_md5: "abcdef1234567890",
        file_size: 30 * 1024 * 1024, // 30MB
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/init_video_upload", {
        method: "POST",
        auth: true,
        body: {
          file_md5: "abcdef1234567890",
          file_size: 30 * 1024 * 1024,
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
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.uploadVideoPart({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq: 0,
        content_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
        part_content: "/path/to/part0",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_video_part", {
        method: "POST",
        body: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
          part_seq: 0,
          content_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
          part_content: "/path/to/part0",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should upload multiple video parts sequentially", async () => {
      const mockResponse: UploadVideoPartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const videoUploadId = "sg_test_upload_id";

      // Upload part 0
      await mediaManager.uploadVideoPart({
        video_upload_id: videoUploadId,
        part_seq: 0,
        content_md5: "md5_part_0",
        part_content: "/path/to/part0",
      });

      // Upload part 1
      await mediaManager.uploadVideoPart({
        video_upload_id: videoUploadId,
        part_seq: 1,
        content_md5: "md5_part_1",
        part_content: "/path/to/part1",
      });

      expect(mockShopeeFetch).toHaveBeenCalledTimes(2);
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(
        1,
        mockConfig,
        "/media_space/upload_video_part",
        {
          method: "POST",
          body: {
            video_upload_id: videoUploadId,
            part_seq: 0,
            content_md5: "md5_part_0",
            part_content: "/path/to/part0",
          },
        }
      );
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(
        2,
        mockConfig,
        "/media_space/upload_video_part",
        {
          method: "POST",
          body: {
            video_upload_id: videoUploadId,
            part_seq: 1,
            content_md5: "md5_part_1",
            part_content: "/path/to/part1",
          },
        }
      );
    });
  });

  describe("completeVideoUpload", () => {
    it("should complete video upload", async () => {
      const mockResponse: CompleteVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.completeVideoUpload({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq_list: [0, 1, 2, 3],
        report_data: {
          upload_cost: 11832,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media_space/complete_video_upload",
        {
          method: "POST",
          body: {
            video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
            part_seq_list: [0, 1, 2, 3],
            report_data: {
              upload_cost: 11832,
            },
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it("should complete video upload with single part", async () => {
      const mockResponse: CompleteVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.completeVideoUpload({
        video_upload_id: "sg_small_video_id",
        part_seq_list: [0],
        report_data: {
          upload_cost: 2500,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media_space/complete_video_upload",
        {
          method: "POST",
          body: {
            video_upload_id: "sg_small_video_id",
            part_seq_list: [0],
            report_data: {
              upload_cost: 2500,
            },
          },
        }
      );

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
          message: "success",
          video_info: {
            video_url_list: [
              {
                video_url_region: "SG",
                video_url: "https://cvf.shopee.sg/file/ddb50833eee1c9fda5c522a2e6fc0ea6",
              },
              {
                video_url_region: "VN",
                video_url: "https://cvf.shopee.vn/file/ddb50833eee1c9fda5c522a2e6fc0ea6",
              },
            ],
            thumbnail_url_list: [
              {
                image_url_region: "SG",
                image_url: "https://cf.shopee.sg/file/75eba55932c987851abc39895047dd54",
              },
              {
                image_url_region: "VN",
                image_url: "https://cf.shopee.vn/file/75eba55932c987851abc39895047dd54",
              },
            ],
            duration: 15,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media_space/get_video_upload_result",
        {
          method: "GET",
          auth: true,
          params: {
            video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.status).toBe("SUCCEEDED");
      expect(result.response.video_info).toBeDefined();
      expect(result.response.video_info?.duration).toBe(15);
      expect(result.response.video_info?.video_url_list).toHaveLength(2);
    });

    it("should get video upload result with TRANSCODING status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "TRANSCODING",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_transcoding_video_id",
      });

      expect(result.response.status).toBe("TRANSCODING");
      expect(result.response.video_info).toBeUndefined();
    });

    it("should get video upload result with FAILED status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "FAILED",
          message: "Video is too short",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.getVideoUploadResult({
        video_upload_id: "sg_failed_video_id",
      });

      expect(result.response.status).toBe("FAILED");
      expect(result.response.message).toBe("Video is too short");
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
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.cancelVideoUpload({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/cancel_video_upload", {
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
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaManager.cancelVideoUpload({
        video_upload_id: "sg_cancel_during_upload_id",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/cancel_video_upload", {
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
