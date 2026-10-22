import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { MediaManager } from "../../managers/media.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("MediaManager (Generated Tests)", () => {
  let manager: MediaManager;
  let mockConfig: ShopeeConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };
    manager = new MediaManager(mockConfig);
  });

  describe("cancelVideoUpload", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };

      const exampleResponse = {
        error: "",
        message: "",
        warning: "test_string",
        request_id: "test-request-id",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.cancelVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/cancel_video_upload", {
        method: "POST",

        body: exampleRequest,
      });

      expect(result).toEqual(exampleResponse);
    });
  });

  describe("completeVideoUpload", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };

      const exampleResponse = {
        error: "",
        message: "",
        warning: "test_string",
        request_id: "test-request-id",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.completeVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/complete_video_upload", {
        method: "POST",

        body: exampleRequest,
      });

      expect(result).toEqual(exampleResponse);
    });
  });

  describe("getVideoUploadResult", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };

      const exampleResponse = {
        response: {
          status: "transcoded",
          reason: "test_string",
          update_time: 1758018336,
          video_info: {
            video_url:
              "http://play-src.vod.shopee.com/api/v4/11110201/mms/sg-11110201-6kh48-mepm7a0ttcw3c3.",
            video_thumbnail_url:
              "http://img.sp.mms.shopee.sg/sg-11110201-6kh48-mepm7a0ttcw3c3_cover",
            thumbnail_width: 1920,
            thumbnail_height: 1080,
            duration: 105,
            resolution: "960x540",
          },
        },
        request_id: "test-request-id",
        error: "",
        message: "",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.getVideoUploadResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/get_video_upload_result", {
        method: "GET",

        params: exampleRequest,
        timestampPaths: ["response.update_time"],
      });

      expect(result).toEqual(exampleResponse);
    });
  });

  describe("initVideoUpload", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        business: 3,
        scene: 1,
        file_name: "test_video_name.mp4",
        file_size: 26214400,
        duration: 105,
      };

      const exampleResponse = {
        response: {
          video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
          part_size: 10485760,
        },
        request_id: "test-request-id",
        error: "",
        message: "",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.initVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/init_video_upload", {
        method: "POST",

        body: exampleRequest,
      });

      expect(result).toEqual(exampleResponse);
    });
  });

  describe("uploadImage", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        business: 2,
        scene: 1,
        images: Buffer.from("test_binary"),
      };

      const exampleResponse = {
        response: {
          image_list: [
            {
              image_id: "test_string",
              image_url: "test_string",
            },
          ],
        },
        request_id: "test-request-id",
        error: "",
        message: "",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.uploadImage(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_image", {
        method: "POST",

        body: exampleRequest,
      });

      expect(result).toEqual(exampleResponse);
    });
  });

  describe("uploadVideoPart", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
        part_seq: 0,
        part_content: Buffer.from("test_binary"),
        part_md5: "995bbc002c3ef797addcb010f64626ea",
      };

      const exampleResponse = {
        error: "",
        message: "",
        warning: "test_string",
        request_id: "test-request-id",
      };
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.uploadVideoPart(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockConfig, "/media/upload_video_part", {
        method: "POST",

        body: exampleRequest,
      });

      expect(result).toEqual(exampleResponse);
    });
  });
});
