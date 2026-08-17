import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { MediaSpaceManager } from "../../managers/media-space.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("MediaSpaceManager (Generated Tests)", () => {
  let manager: MediaSpaceManager;
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
    manager = new MediaSpaceManager(mockConfig);
  });

  describe("cancelVideoUpload", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      };
      const exampleResponse = {
        message: "test_string",
        request_id: "a30d633fd6b94fe4aa7d3cae15cea586",
        error: "test_string",
        warning: "test_string",
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
        "/media_space/cancel_video_upload",
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
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq_list: [0, 1, 2],
        report_data: {
          upload_cost: 11832,
        },
      };
      const exampleResponse = {
        message: "test_string",
        request_id: "3bb08579fffbfc13ed9d23cda8bbb46d",
        error: "test_string",
        warning: "test_string",
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
        "/media_space/complete_video_upload",
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
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
      };
      const exampleResponse = {
        status: "SUCCEEDED",
        video_info: {
          video_url_list: [
            {
              video_url_region: "SG",
              video_url: "https://cvf.shopee.sg/file/ddb50833eee1c9fda5c522a2e6fc0ea6",
            },
          ],
          thumbnail_url_list: [
            {
              image_url_region: "SG",
              image_url: "https://cf.shopee.sg/file/75eba55932c987851abc39895047dd54",
            },
          ],
          duration: 15,
        },
        message: "Video is too short",
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
        "/media_space/get_video_upload_result",
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
        file_md5: "2abf0b6e5ff90ff24437a0808f171a93",
        file_size: 1261876,
      };
      const exampleResponse = {
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
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
        "/media_space/init_video_upload",
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
        image: "test_string",
        scene: "test_string",
        ratio: "3:4",
      };
      const exampleResponse = {
        image_info: {
          image_id: "test_string",
          image_url_list: [
            {
              image_url_region: "test_string",
              image_url: "test_string",
            },
          ],
        },
        image_info_list: [
          {
            id: 123,
            error: "test_string",
            message: "test_string",
            image_info: {
              image_id: "test_string",
              image_url_list: [
                {
                  image_url_region: "test_string",
                  image_url: "test_string",
                },
              ],
            },
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
        "/media_space/upload_image",
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
        video_upload_id: "sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000",
        part_seq: 0,
        content_md5: "3bb08579fffbfc13ed9d23cda8bbb46d",
        part_content: "test_string",
      };
      const exampleResponse = {
        message: "test_string",
        request_id: "0d6aac56a64f46d8b6e8b4cbbf23f2ab",
        error: "test_string",
        warning: "test_string",
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
        "/media_space/upload_video_part",
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
