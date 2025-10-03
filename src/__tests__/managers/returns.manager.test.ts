import { jest } from "@jest/globals";
import { ReturnsManager } from "../../managers/returns.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetReturnListResponse,
  GetReturnDetailResponse,
  ConfirmResponse,
  DisputeResponse,
  OfferResponse,
  AcceptOfferResponse,
  GetAvailableSolutionsResponse,
  CancelDisputeResponse,
  GetReturnDisputeReasonResponse,
  ConvertImageResponse,
  UploadProofResponse,
  QueryProofResponse,
  GetShippingCarrierResponse,
  UploadShippingProofResponse,
} from "../../schemas/returns.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("ReturnsManager", () => {
  let returnsManager: ReturnsManager;
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

    returnsManager = new ReturnsManager(mockConfig);
  });

  describe("getReturnList", () => {
    it("should get list of returns with pagination", async () => {
      const mockResponse: GetReturnListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: true,
          return: [
            {
              image: ["https://cf.shopee.sg/file/test-image.jpg"],
              reason: "PHYSICAL_DMG",
              text_reason: "Product damaged",
              return_sn: "200203171852695",
              refund_amount: 100.0,
              currency: "SGD",
              create_time: 1580721513,
              update_time: 1580729377,
              status: "REQUESTED",
              due_date: 1580721513,
              tracking_number: "RNSHS00177569",
              needs_logistics: true,
              amount_before_discount: 100.0,
              user: {
                username: "testuser",
                email: "test@example.com",
                portrait: "https://cf.shopee.sg/file/portrait.jpg",
              },
              item: [
                {
                  model_id: 123456,
                  name: "Test Product",
                  images: ["https://cf.shopee.sg/file/product.jpg"],
                  amount: 1,
                  item_price: 100.0,
                  is_add_on_deal: false,
                  is_main_item: true,
                  add_on_deal_id: 0,
                  item_id: 789012,
                  item_sku: "SKU-001",
                  variation_sku: "VAR-001",
                },
              ],
              order_sn: "200203C6W0AR27",
              return_ship_due_date: 1655438336,
              return_seller_due_date: 1655438336,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getReturnList({
        page_no: 1,
        page_size: 10,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/get_return_list", {
        method: "GET",
        auth: true,
        params: {
          page_no: 1,
          page_size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.more).toBe(true);
      expect(result.response.return).toHaveLength(1);
      expect(result.response.return[0].return_sn).toBe("200203171852695");
    });

    it("should get returns with filters", async () => {
      const mockResponse: GetReturnListResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          more: false,
          return: [],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getReturnList({
        page_no: 1,
        page_size: 20,
        create_time_from: 1655392442,
        create_time_to: 1655392542,
        status: "REQUESTED",
        negotiation_status: "PENDING_RESPOND",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/get_return_list", {
        method: "GET",
        auth: true,
        params: {
          page_no: 1,
          page_size: 20,
          create_time_from: 1655392442,
          create_time_to: 1655392542,
          status: "REQUESTED",
          negotiation_status: "PENDING_RESPOND",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getReturnDetail", () => {
    it("should get detailed information for a specific return", async () => {
      const mockResponse: GetReturnDetailResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          image: ["https://cf.shopee.sg/file/test-image.jpg"],
          reason: "NOT_RECEIPT",
          text_reason: "Not received",
          return_sn: "2206140TA5PM808",
          refund_amount: 13.97,
          currency: "SGD",
          create_time: 1655205084,
          update_time: 1655219544,
          status: "ACCEPTED",
          due_date: 1655377883,
          tracking_number: "RNSHS00177569",
          needs_logistics: false,
          amount_before_discount: 13.99,
          user: {
            username: "gwlsg01",
            email: "test@shopee.com",
            portrait: "https://cf.shopee.sg/file/portrait.jpg",
          },
          item: [
            {
              model_id: 2001586745,
              name: "Orange macaron",
              images: ["https://cf.shopee.sg/file/product.jpg"],
              amount: 1,
              item_price: 10.0,
              is_add_on_deal: false,
              is_main_item: false,
              add_on_deal_id: 0,
              item_id: 2700126223,
              item_sku: "USB",
              variation_sku: "RED",
              refund_amount: 12.34,
            },
          ],
          order_sn: "220614T9XV8JTN",
          return_ship_due_date: 1655438205,
          return_seller_due_date: 1655438205,
          seller_proof: {
            seller_proof_status: "PENDING",
            seller_evidence_deadline: 1655438336,
          },
          seller_compensation: {
            seller_compensation_status: "PENDING_REQUEST",
            seller_compensation_due_date: 1655438336,
            compensation_amount: 100.0,
          },
          negotiation: {
            negotiation_status: "PENDING_RESPOND",
            latest_solution: "RETURN_REFUND",
            latest_offer_amount: 12.34,
            latest_offer_creator: "buyer",
            counter_limit: 0,
            offer_due_date: 1655438336,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getReturnDetail({
        return_sn: "2206140TA5PM808",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/get_return_detail", {
        method: "GET",
        auth: true,
        params: {
          return_sn: "2206140TA5PM808",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("2206140TA5PM808");
      expect(result.response.status).toBe("ACCEPTED");
    });
  });

  describe("confirm", () => {
    it("should confirm a return refund", async () => {
      const mockResponse: ConfirmResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.confirm({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/confirm", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("200203171852695");
    });
  });

  describe("dispute", () => {
    it("should dispute a return with reason and images", async () => {
      const mockResponse: DisputeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.dispute({
        return_sn: "200203171852695",
        email: "seller@example.com",
        dispute_reason: 2,
        dispute_text_reason: "Product condition not as described by buyer",
        images: ["https://cf.shopee.sg/file/evidence1.jpg"],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/dispute", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          email: "seller@example.com",
          dispute_reason: 2,
          dispute_text_reason: "Product condition not as described by buyer",
          images: ["https://cf.shopee.sg/file/evidence1.jpg"],
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should dispute a return with minimum required fields", async () => {
      const mockResponse: DisputeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.dispute({
        return_sn: "200203171852695",
        email: "seller@example.com",
        dispute_reason: 1,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/dispute", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          email: "seller@example.com",
          dispute_reason: 1,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("offer", () => {
    it("should offer a solution to the buyer", async () => {
      const mockResponse: OfferResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.offer({
        return_sn: "200203171852695",
        solution: 0,
        refund_amount: 50.0,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/offer", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          solution: 0,
          refund_amount: 50.0,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("acceptOffer", () => {
    it("should accept an offer from the buyer", async () => {
      const mockResponse: AcceptOfferResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.acceptOffer({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/accept_offer", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("200203171852695");
    });
  });

  describe("getAvailableSolutions", () => {
    it("should get available solutions for a return", async () => {
      const mockResponse: GetAvailableSolutionsResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          solution: [
            {
              solution: 0,
              max_refund_amount: 100.0,
            },
            {
              solution: 1,
              max_refund_amount: 100.0,
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getAvailableSolutions({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/get_available_solutions", {
        method: "GET",
        auth: true,
        params: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.solution).toHaveLength(2);
      expect(result.response.solution[0].solution).toBe(0);
    });
  });

  describe("cancelDispute", () => {
    it("should cancel a compensation dispute", async () => {
      const mockResponse: CancelDisputeResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.cancelDispute({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/cancel_dispute", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("200203171852695");
    });
  });

  describe("getReturnDisputeReason", () => {
    it("should get available dispute reasons", async () => {
      const mockResponse: GetReturnDisputeReasonResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          dispute_reason: [
            {
              reason_id: 1,
              reason_text: "Product not as described",
            },
            {
              reason_id: 2,
              reason_text: "Product damaged in transit",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getReturnDisputeReason({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_return_dispute_reason",
        {
          method: "GET",
          auth: true,
          params: {
            return_sn: "200203171852695",
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response.dispute_reason).toHaveLength(2);
      expect(result.response.dispute_reason[0].reason_id).toBe(1);
    });
  });

  describe("convertImage", () => {
    it("should convert images to URLs", async () => {
      const mockResponse: ConvertImageResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          images: [
            {
              url: "https://cf.shopee.sg/file/converted1.jpg",
              thumbnail_url: "https://cf.shopee.sg/file/thumb1.jpg",
            },
            {
              url: "https://cf.shopee.sg/file/converted2.jpg",
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.convertImage({
        images: [{ image: "base64_encoded_image_1" }, { image: "base64_encoded_image_2" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/convert_image", {
        method: "POST",
        auth: true,
        body: {
          images: [{ image: "base64_encoded_image_1" }, { image: "base64_encoded_image_2" }],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.images).toHaveLength(2);
    });
  });

  describe("uploadProof", () => {
    it("should upload proof with text, images, and videos", async () => {
      const mockResponse: UploadProofResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.uploadProof({
        return_sn: "200203171852695",
        proof_text: [{ text: "Product was not damaged when shipped" }],
        proof_image: [{ url: "https://cf.shopee.sg/file/proof1.jpg" }],
        proof_video: [{ url: "https://cf.shopee.sg/file/proof1.mp4" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/upload_proof", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          proof_text: [{ text: "Product was not damaged when shipped" }],
          proof_image: [{ url: "https://cf.shopee.sg/file/proof1.jpg" }],
          proof_video: [{ url: "https://cf.shopee.sg/file/proof1.mp4" }],
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("200203171852695");
    });

    it("should upload proof with only text", async () => {
      const mockResponse: UploadProofResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.uploadProof({
        return_sn: "200203171852695",
        proof_text: [{ text: "Evidence description" }],
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/upload_proof", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          proof_text: [{ text: "Evidence description" }],
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("queryProof", () => {
    it("should query uploaded proof", async () => {
      const mockResponse: QueryProofResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          proof_text: [{ text: "Product was not damaged when shipped" }],
          proof_image: [{ url: "https://cf.shopee.sg/file/proof1.jpg" }],
          proof_video: [{ url: "https://cf.shopee.sg/file/proof1.mp4" }],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.queryProof({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/query_proof", {
        method: "GET",
        auth: true,
        params: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.proof_text).toHaveLength(1);
      expect(result.response.proof_image).toHaveLength(1);
      expect(result.response.proof_video).toHaveLength(1);
    });
  });

  describe("getShippingCarrier", () => {
    it("should get list of shipping carriers", async () => {
      const mockResponse: GetShippingCarrierResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          carrier_list: [
            {
              carrier_id: 1,
              carrier_name: "DHL Express",
              required_fields: ["tracking_number", "pickup_date"],
            },
            {
              carrier_id: 2,
              carrier_name: "FedEx",
              required_fields: ["tracking_number"],
            },
          ],
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.getShippingCarrier({
        return_sn: "200203171852695",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/get_shipping_carrier", {
        method: "GET",
        auth: true,
        params: {
          return_sn: "200203171852695",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.carrier_list).toHaveLength(2);
      expect(result.response.carrier_list[0].carrier_name).toBe("DHL Express");
    });
  });

  describe("uploadShippingProof", () => {
    it("should upload shipping proof", async () => {
      const mockResponse: UploadShippingProofResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.uploadShippingProof({
        return_sn: "200203171852695",
        carrier_id: 1,
        tracking_number: "DHL123456789",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/upload_shipping_proof", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          carrier_id: 1,
          tracking_number: "DHL123456789",
        },
      });

      expect(result).toEqual(mockResponse);
      expect(result.response.return_sn).toBe("200203171852695");
    });

    it("should upload shipping proof with additional fields", async () => {
      const mockResponse: UploadShippingProofResponse = {
        request_id: "test-request-id",
        error: "",
        message: "",
        response: {
          return_sn: "200203171852695",
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await returnsManager.uploadShippingProof({
        return_sn: "200203171852695",
        carrier_id: 1,
        tracking_number: "DHL123456789",
        pickup_date: "2024-01-15",
        pickup_time: "14:00",
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/returns/upload_shipping_proof", {
        method: "POST",
        auth: true,
        body: {
          return_sn: "200203171852695",
          carrier_id: 1,
          tracking_number: "DHL123456789",
          pickup_date: "2024-01-15",
          pickup_time: "14:00",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
