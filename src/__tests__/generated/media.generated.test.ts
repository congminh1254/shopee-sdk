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
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "e3e3e7f33ee88a7454c64e7a0b546e01",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.cancelVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/cancel_video_upload",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("completeVideoUpload", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "e3e3e7f33ee8a35723ec3e694708a301",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.completeVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/complete_video_upload",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVideoUploadResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
      };
      const exampleResponse = {
        status: "SUCCEEDED",
        reason: "test_string",
        update_time: 1758018336,
        video_info: {
          video_url:
            "http://play-src.vod.shopee.com/api/v4/11110201/mms/sg-11110201-6kh48-mepm7a0ttcw3c3.",
          video_thumbnail_url: "http://img.sp.mms.shopee.sg/sg-11110201-6kh48-mepm7a0ttcw3c3_cover",
          thumbnail_width: 1920,
          thumbnail_height: 1080,
          duration: 105,
          resolution: "960x540",
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVideoUploadResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/get_video_upload_result",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("initVideoUpload", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        business: 3,
        scene: 1,
        file_name: "test_video_name.mp4",
        file_size: 26214400,
        duration: 105,
      };
      const exampleResponse = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
        part_size: 10485760,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.initVideoUpload(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/init_video_upload",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadImage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        business: 2,
        scene: 1,
        images: "test_string",
      };
      const exampleResponse = {
        image_list: [
          {
            image_id: "test_string",
            image_url: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadImage(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/upload_image",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadVideoPart", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg-11110201-6kh48-mepm7a0ttcw3c3",
        part_seq: 0,
        part_content: "test_string",
        part_md5: "995bbc002c3ef797addcb010f64626ea",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "e3e3e7f33ee8a35723ec3e694708a301",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadVideoPart(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/media/upload_video_part",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
