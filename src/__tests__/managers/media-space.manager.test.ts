import { jest } from "@jest/globals";
import { MediaSpaceManager } from "../../managers/media-space.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  UploadImageResponse,
  InitVideoUploadResponse,
  UploadVideoPartResponse,
  CompleteVideoUploadResponse,
  CancelVideoUploadResponse,
  GetVideoUploadResultResponse,
} from "../../schemas/media-space.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("MediaSpaceManager", () => {
  let mediaSpaceManager: MediaSpaceManager;
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

    mediaSpaceManager = new MediaSpaceManager(mockConfig);
  });

  describe("uploadImage", () => {
    it("should upload images with normal scene", async () => {
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
                image_id: "test_image_id_123",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/test_image_123",
                  },
                  {
                    image_url_region: "VN",
                    image_url: "https://cf.shopee.vn/file/test_image_123",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.uploadImage({
        scene: "normal",
        ratio: "1:1",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        body: {
          scene: "normal",
          ratio: "1:1",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.image_info_list).toHaveLength(1);
      expect(result.response.image_info_list![0].image_info!.image_id).toBe("test_image_id_123");
    });

    it("should upload images with desc scene", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              image_info: {
                image_id: "desc_image_id_456",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/desc_image_456",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.uploadImage({
        scene: "desc",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        body: {
          scene: "desc",
        },
      });

      expect(result.response.image_info_list![0].image_info!.image_id).toBe("desc_image_id_456");
    });

    it("should upload multiple images", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              image_info: {
                image_id: "image_1",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/image_1",
                  },
                ],
              },
            },
            {
              id: 1,
              image_info: {
                image_id: "image_2",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/image_2",
                  },
                ],
              },
            },
            {
              id: 2,
              image_info: {
                image_id: "image_3",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/image_3",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.uploadImage({
        scene: "normal",
      });

      expect(result.response.image_info_list).toHaveLength(3);
      expect(result.response.image_info_list![0].image_info!.image_id).toBe("image_1");
      expect(result.response.image_info_list![1].image_info!.image_id).toBe("image_2");
      expect(result.response.image_info_list![2].image_info!.image_id).toBe("image_3");
    });

    it("should upload image with 3:4 ratio", async () => {
      const mockResponse: UploadImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image_info_list: [
            {
              id: 0,
              image_info: {
                image_id: "ratio_image_id",
                image_url_list: [
                  {
                    image_url_region: "SG",
                    image_url: "https://cf.shopee.sg/file/ratio_image",
                  },
                ],
              },
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.uploadImage({
        scene: "normal",
        ratio: "3:4",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_image", {
        method: "POST",
        body: {
          scene: "normal",
          ratio: "3:4",
        },
      });

      expect(result.response.image_info_list![0].image_info!.image_id).toBe("ratio_image_id");
    });
  });

  describe("initVideoUpload", () => {
    it("should initialize video upload", async () => {
      const mockResponse: InitVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.initVideoUpload({
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

    it("should initialize video upload with different file size", async () => {
      const mockResponse: InitVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          video_upload_id: "sg_test_upload_id_123",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.initVideoUpload({
        file_md5: "abc123def456",
        file_size: 5000000, // 5MB
      });

      expect(result.response.video_upload_id).toBe("sg_test_upload_id_123");
    });
  });

  describe("uploadVideoPart", () => {
    it("should upload video part", async () => {
      const mockResponse: UploadVideoPartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.uploadVideoPart({
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq: 0,
        content_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/media_space/upload_video_part", {
        method: "POST",
        body: {
          video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
          part_seq: 0,
          content_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should upload multiple video parts in sequence", async () => {
      const mockResponse: UploadVideoPartResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      // Upload part 0
      await mediaSpaceManager.uploadVideoPart({
        video_upload_id: "sg_test_upload_id",
        part_seq: 0,
        content_md5: "part0_md5",
      });

      // Upload part 1
      await mediaSpaceManager.uploadVideoPart({
        video_upload_id: "sg_test_upload_id",
        part_seq: 1,
        content_md5: "part1_md5",
      });

      // Upload part 2
      await mediaSpaceManager.uploadVideoPart({
        video_upload_id: "sg_test_upload_id",
        part_seq: 2,
        content_md5: "part2_md5",
      });

      expect(mockShopeeFetch).toHaveBeenCalledTimes(3);
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(
        1,
        mockConfig,
        "/media_space/upload_video_part",
        {
          method: "POST",
          body: {
            video_upload_id: "sg_test_upload_id",
            part_seq: 0,
            content_md5: "part0_md5",
          },
        }
      );
      expect(mockShopeeFetch).toHaveBeenNthCalledWith(
        3,
        mockConfig,
        "/media_space/upload_video_part",
        {
          method: "POST",
          body: {
            video_upload_id: "sg_test_upload_id",
            part_seq: 2,
            content_md5: "part2_md5",
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

      const result = await mediaSpaceManager.completeVideoUpload({
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

      const result = await mediaSpaceManager.completeVideoUpload({
        video_upload_id: "sg_test_upload_id",
        part_seq_list: [0],
        report_data: {
          upload_cost: 5000,
        },
      });

      expect(result.error).toBe("");
    });

    it("should complete video upload with multiple parts", async () => {
      const mockResponse: CompleteVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      await mediaSpaceManager.completeVideoUpload({
        video_upload_id: "sg_test_upload_id",
        part_seq_list: [0, 1, 2, 3, 4, 5, 6, 7], // 8 parts
        report_data: {
          upload_cost: 45000,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media_space/complete_video_upload",
        expect.objectContaining({
          method: "POST",
          body: expect.objectContaining({
            part_seq_list: [0, 1, 2, 3, 4, 5, 6, 7],
          }),
        })
      );
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

      const result = await mediaSpaceManager.getVideoUploadResult({
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
      expect(result.response.video_info!.duration).toBe(15);
      expect(result.response.video_info!.video_url_list).toHaveLength(2);
      expect(result.response.video_info!.thumbnail_url_list).toHaveLength(2);
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

      const result = await mediaSpaceManager.getVideoUploadResult({
        video_upload_id: "sg_test_upload_id",
      });

      expect(result.response.status).toBe("INITIATED");
      expect(result.response.video_info).toBeUndefined();
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

      const result = await mediaSpaceManager.getVideoUploadResult({
        video_upload_id: "sg_test_upload_id",
      });

      expect(result.response.status).toBe("TRANSCODING");
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

      const result = await mediaSpaceManager.getVideoUploadResult({
        video_upload_id: "sg_test_upload_id",
      });

      expect(result.response.status).toBe("FAILED");
      expect(result.response.message).toBe("Video is too short");
    });

    it("should get video upload result with CANCELLED status", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "CANCELLED",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.getVideoUploadResult({
        video_upload_id: "sg_test_upload_id",
      });

      expect(result.response.status).toBe("CANCELLED");
    });

    it("should get video upload result with all regions", async () => {
      const mockResponse: GetVideoUploadResultResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          status: "SUCCEEDED",
          video_info: {
            video_url_list: [
              { video_url_region: "TW", video_url: "https://cvf.shopee.tw/file/video" },
              { video_url_region: "VN", video_url: "https://cvf.shopee.vn/file/video" },
              { video_url_region: "PH", video_url: "https://cvf.shopee.ph/file/video" },
              { video_url_region: "TH", video_url: "https://cvf.shopee.co.th/file/video" },
              { video_url_region: "ID", video_url: "https://cvf.shopee.co.id/file/video" },
              { video_url_region: "MY", video_url: "https://cvf.shopee.com.my/file/video" },
              { video_url_region: "BR", video_url: "https://cvf.shopee.com.br/file/video" },
              { video_url_region: "SG", video_url: "https://cvf.shopee.sg/file/video" },
            ],
            thumbnail_url_list: [
              { image_url_region: "TW", image_url: "https://cf.shopee.tw/file/thumb" },
              { image_url_region: "VN", image_url: "https://cf.shopee.vn/file/thumb" },
              { image_url_region: "PH", image_url: "https://cf.shopee.ph/file/thumb" },
              { image_url_region: "TH", image_url: "https://cf.shopee.co.th/file/thumb" },
              { image_url_region: "ID", image_url: "https://cf.shopee.co.id/file/thumb" },
              { image_url_region: "MY", image_url: "https://cf.shopee.com.my/file/thumb" },
              { image_url_region: "BR", image_url: "https://cf.shopee.com.br/file/thumb" },
              { image_url_region: "SG", image_url: "https://cf.shopee.sg/file/thumb" },
            ],
            duration: 30,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.getVideoUploadResult({
        video_upload_id: "sg_test_upload_id",
      });

      expect(result.response.video_info!.video_url_list).toHaveLength(8);
      expect(result.response.video_info!.thumbnail_url_list).toHaveLength(8);
    });
  });

  describe("cancelVideoUpload", () => {
    it("should cancel video upload", async () => {
      const mockResponse: CancelVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.cancelVideoUpload({
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

    it("should cancel video upload with different upload ID", async () => {
      const mockResponse: CancelVideoUploadResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await mediaSpaceManager.cancelVideoUpload({
        video_upload_id: "sg_test_cancel_upload_id",
      });

      expect(result.error).toBe("");
    });
  });
});
