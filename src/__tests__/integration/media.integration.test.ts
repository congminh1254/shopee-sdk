import { describe, it, expect, beforeAll } from "@jest/globals";
import { ShopeeSDK } from "../../sdk.js";
import { setupIntegrationTest } from "./setup.js";
import crypto from "crypto";

const { runTests, initSdk, hasValidToken } = setupIntegrationTest();

// A highly optimized 10-second blank H.264 MP4 video represented as a base64 string (~1.9 KB)
const TINY_VIDEO_BASE64 =
  "AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAPDbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAALuAAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAu50cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAALuAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAKAAAAB4AAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAC7gAACAAAABAAAAAAJmbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABAAAADAABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACEW1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAdFzdGJsAAAAwXN0c2QAAAAAAAAAAQAAALFhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAKAAeABIAAAASAAAAAAAAAABFUxhdmM2MS4xOS4xMDEgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAAN2F2Y0MBZAAK/+EAGmdkAAqs2UKEflwEQAAAAwBAAAADAIPEiWWAAQAGaOvjyyLA/fj4AAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAAJgAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAMAABAAAAAABRzdHNzAAAAAAAAAAEAAAABAAAAaGN0dHMAAAAAAAAACwAAAAEAAIAAAAAAAQABQAAAAAABAACAAAAAAAEAAAAAAAAAAQAAQAAAAAABAAFAAAAAAAEAAIAAAAAAAQAAAAAAAAABAABAAAAAAAEAAQAAAAAAAgAAQAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAwAAAABAAAARHN0c3oAAAAAAAAAAAAAAAwAAALnAAAAEAAAAA4AAAANAAAADQAAABYAAAAQAAAADQAAAA0AAAAWAAAADwAAAA0AAAAUc3RjbwAAAAAAAAABAAAD8wAAAGF1ZHRhAAAAWW1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALGlsc3QAAAAkqXRvbwAAABxkYXRhAAAAAQAAAABMYXZmNjEuNy4xMDAAAAAIZnJlZQAAA5ltZGF0AAACrQYF//+p3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NCByMzEwOCAzMWUxOWY5IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTQgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAyZYiEABf//vfUt8yy7gcitguo96KeJl9DdSUBn9fd6hOSV14BYbzmGMBmwAGlBpoqmiEAAAAMQZokbEF//tqmWAIGAAAACkGeQniC3wAA44EAAAAJAZ5hdEFfAAFjAAAACQGeY2pBXwABYwAAABJBmmhJqEFomUwIL//+2qZYAgcAAAAMQZ6GRREsFv8AAOOBAAAACQGepXRBXwABYwAAAAkBnqdqQV8AAWMAAAASQZqrSahBbJlMCCv//talUAIGAAAAC0GeyUUVLBX/AAFjAAAACQGe6mpBXwABYw==";

(runTests ? describe : describe.skip)("ShopeeSDK MediaSpace & Media Integration Tests", () => {
  let sdk: ShopeeSDK;

  beforeAll(async () => {
    sdk = await initSdk();
  });

  it("should successfully upload a 1x1 transparent PNG using mediaSpace.uploadImage", async () => {
    if (!hasValidToken()) return;

    // 1x1 transparent PNG pixel represented as a Buffer
    const imageBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );

    const uploadResponse = await sdk.mediaSpace.uploadImage({
      scene: "normal",
      ratio: "1:1",
      image: imageBuffer,
    });

    expect(uploadResponse).toBeDefined();
    expect(uploadResponse.error).toBe("");

    const infoList = uploadResponse.response?.image_info_list;
    expect(infoList).toBeDefined();
    expect(Array.isArray(infoList)).toBe(true);
    expect(infoList!.length).toBeGreaterThan(0);
    expect(infoList![0].image_info?.image_id).toBeDefined();
    expect(infoList![0].image_info?.image_url_list[0].image_url).toContain("http");
  });

  it("should successfully upload a 1x1 transparent PNG using media.uploadImage", async () => {
    if (!hasValidToken()) return;

    const imageBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );

    const uploadResponse = await sdk.media.uploadImage({
      scene: "normal",
      ratio: "1:1",
      image: imageBuffer,
    });

    expect(uploadResponse).toBeDefined();
    expect(uploadResponse.error).toBe("");

    const infoList = uploadResponse.response?.image_info_list;
    expect(infoList).toBeDefined();
    expect(Array.isArray(infoList)).toBe(true);
    expect(infoList!.length).toBeGreaterThan(0);
  });

  it("should initialize and cancel a mediaSpace video upload session safely", async () => {
    if (!hasValidToken()) return;

    // Initialize with a dummy video size and MD5 hash
    const initResponse = await sdk.mediaSpace.initVideoUpload({
      file_size: 512000, // 500 KB dummy size
      file_md5: "3abf0b6e5ff90ff24437a0808f171a93",
    });

    expect(initResponse).toBeDefined();
    expect(initResponse.error).toBe("");
    expect(initResponse.response?.video_upload_id).toBeDefined();

    const uploadId = initResponse.response.video_upload_id;

    // Immediately cancel the upload session to clean up state
    const cancelResponse = await sdk.mediaSpace.cancelVideoUpload({
      video_upload_id: uploadId,
    });

    expect(cancelResponse).toBeDefined();
    expect(cancelResponse.error).toBe("");
  });

  it("should successfully upload a tiny MP4 video using mediaSpace chunked upload", async () => {
    if (!hasValidToken()) return;

    const videoBuffer = Buffer.from(TINY_VIDEO_BASE64, "base64");
    const fileSize = videoBuffer.length;
    const fileMd5 = crypto.createHash("md5").update(videoBuffer).digest("hex");

    // 1. Initialize video upload session
    const initResponse = await sdk.mediaSpace.initVideoUpload({
      file_size: fileSize,
      file_md5: fileMd5,
    });

    expect(initResponse).toBeDefined();
    expect(initResponse.error).toBe("");
    expect(initResponse.response?.video_upload_id).toBeDefined();

    const uploadId = initResponse.response.video_upload_id;

    try {
      // 2. Upload video part (seq 0)
      const partResponse = await sdk.mediaSpace.uploadVideoPart({
        video_upload_id: uploadId,
        part_seq: 0,
        content_md5: fileMd5,
        part_content: videoBuffer,
      });

      expect(partResponse).toBeDefined();
      expect(partResponse.error).toBe("");

      // 3. Complete video upload
      const completeResponse = await sdk.mediaSpace.completeVideoUpload({
        video_upload_id: uploadId,
        part_seq_list: [0],
        report_data: {
          upload_cost: 100,
        },
      });

      expect(completeResponse).toBeDefined();
      expect(completeResponse.error).toBe("");

      // 4. Query video upload result / status
      const resultResponse = await sdk.mediaSpace.getVideoUploadResult({
        video_upload_id: uploadId,
      });

      expect(resultResponse).toBeDefined();
      expect(resultResponse.error).toBe("");
      expect(resultResponse.response?.status).toBeDefined();
      expect(["TRANSCODING", "SUCCEEDED", "INITIATED"]).toContain(resultResponse.response.status);
    } catch (err) {
      // Clean up state by canceling session if an error is encountered
      await sdk.mediaSpace.cancelVideoUpload({
        video_upload_id: uploadId,
      });
      throw err;
    }
  });
});
