import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { InstallationManager } from "../../managers/installation.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("InstallationManager (Generated Tests)", () => {
  let manager: InstallationManager;
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
    manager = new InstallationManager(mockConfig);
  });

  describe("receiveInstallationOrder", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        installation_order_id: 59501429094404696,
        reason: "test_string",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        request_id: "80b43aec4bb30ae7444b06c8f8036c00",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.receiveInstallationOrder(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/installation/receive_installation_order",
        {
          method: "POST",
          auth: true,
          body: exampleRequest,
        }
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("validateInstallationOtpCode", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = {
        installation_order_id: 59501429094404696,
        installation_otp: "OTPABC",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        request_id: "80b43aec4bb30ae7444b06c8f8036c00",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.validateInstallationOtpCode(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/installation/validate_installation_otp_code",
        {
          method: "POST",
          auth: true,
          body: exampleRequest,
        }
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
});
