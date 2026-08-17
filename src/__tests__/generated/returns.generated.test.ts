import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ReturnsManager } from "../../managers/returns.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("ReturnsManager (Generated Tests)", () => {
  let manager: ReturnsManager;
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
    manager = new ReturnsManager(mockConfig);
  });

  describe("acceptOffer", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "211101140608253",
      };
      const exampleResponse = {
        return_sn: "211101140608253",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.acceptOffer(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/accept_offer",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("cancelDispute", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "2412100F5217W3H",
        email: "test@example.com",
      };
      const exampleResponse = {
        return_sn: "2412100F5217W3H",
        message: "SUCCESS",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.cancelDispute(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/cancel_dispute",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("confirm", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "200203171852695",
      };
      const exampleResponse = {
        return_sn: "200203171852695",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.confirm(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/confirm",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("convertImage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "220707155172370",
        upload_image: "test_string",
      };
      const exampleResponse = {
        url: "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
        thumbnail:
          "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.convertImage(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/convert_image",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("dispute", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "24112301K66SQXM",
        email: "test@example.com",
        dispute_reason_id: 50,
        image_list: [
          {
            module_index: 1,
            requirement:
              "Photo(s) or Video of unboxing the returned parcel with the consignment note (Airway Bill).",
            image_url: [
              "https:",
              "",
              "fileproxy.scsusercontent.com",
              "api",
              "v2",
              "files",
              "c2hvcGVlLWRyYzAx",
              "bf10d801_e9c9e5473d3345d08671a8cc3bc1a6de.jpg",
              "https:",
              "",
              "fileproxy.scsusercontent.com",
              "api",
              "v2",
              "files",
              "c2hvcGVlLWRyYzAx",
              "bf10d801_1733e9f051994b56ae748d4ebd40d0ee.jpg",
            ],
          },
        ],
        dispute_text_reason: "Received return item(s), buyer's claim incorrect",
      };
      const exampleResponse = {
        return_sn: "200203171852695",
        msg: "dispute return success",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.dispute(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/dispute",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAvailableSolutions", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "220106202649696",
      };
      const exampleResponse = {
        return_sn: "220106202649696",
        offer_return_refund: {
          eligibility: true,
          refund_amount_adjustable: true,
          max_refund_amount: 15,
          min_refund_amount: 5,
        },
        offer_refund: {
          eligibility: true,
          refund_amount_adjustable: true,
          max_refund_amount: 10,
          min_refund_amount: 5,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAvailableSolutions(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_available_solutions",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getReturnDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "2206150VT13E3MQ",
      };
      const exampleResponse = {
        image: ["https:", "", "cf.shopee.sg", "file", "166f23cbfb31bd882f51cfe7f90d3826"],
        buyer_videos: [
          {
            thumbnail_url:
              "https://down-ws-sg.img.susercontent.com/sg-11110158-23040-t1taxpkdkgpvf7",
            video_url:
              "https://play-ws.vod.shopee.com/api/v4/11110158/mms/sg-11110158-6jrnk-lf6a3juz7hw96f.ori.mp4",
          },
        ],
        reason: "NOT_RECEIPT",
        text_reason: "not received",
        reassessed_request_reason: "ITEM_MISSING",
        return_sn: "2206140TA5PM808",
        refund_amount: 13.97,
        currency: "SGD",
        create_time: 1655205084,
        update_time: 1655219544,
        status: "ACCEPTED",
        due_date: 1655377883,
        tracking_number: "RNSHS00177569",
        dispute_reason: ["dispute_reason_1", "dispute_reason_2"],
        dispute_text_reason: ["dispute_remarks"],
        needs_logistics: "false",
        amount_before_discount: 13.99,
        user: {
          username: "gwlsg01",
          email: "********oo@shopee.com",
          portrait: "https://cf.shopee.sg/file/166f23cbfb31bd882f51cfe7f90d3826",
        },
        item: [
          {
            model_id: 2001586745,
            name: "[Self collection point] Orange macaron",
            images: ["https:", "", "cf.shopee.sg", "file", "4ecbb6fa567e42c1b1e02993ad53df12"],
            amount: 1,
            item_price: 10,
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
        activity: [
          {
            activity_id: "123456789",
            activity_type: "BUNDLE",
            original_price: "12.34",
            discounted_price: "12.34",
            items: [
              {
                item_id: 12345678,
                variation_id: 12345678,
                quantity_purchased: 2,
                original_price: "12.34",
              },
            ],
            refund_amount: '"12.34"',
          },
        ],
        seller_proof: {
          seller_proof_status: "PENDING",
          seller_evidence_deadline: 1655438336,
        },
        seller_compensation: {
          seller_compensation_status: "PENDING_REQUEST",
          seller_compensation_due_date: 1655438336,
          compensation_amount: 100,
          compensation_amount_list: [
            {
              compensation_type: "LOGISTICS_RELATED_COMPENSATION",
              compensation_amount: 100,
            },
          ],
        },
        negotiation: {
          negotiation_status: "PENDING_RESPOND",
          latest_solution: "RETURN_REFUND",
          latest_offer_amount: 12.34,
          latest_offer_creator: "username",
          counter_limit: 0,
          offer_due_date: 1655438336,
        },
        logistics_status: "LOGISTICS_REQUEST_CREATED",
        reverse_logistics_status: "LOGISTICS_REQUEST_CREATED",
        return_pickup_address: {
          address: "BLOCK 106, HENDERSON CRESCENT",
          name: "name",
          phone: "6512345678",
          town: "Batino",
          district: "Calamba City",
          city: "Laguna",
          state: "South Luzon",
          region: "SG",
          zipcode: "150106",
        },
        virtual_contact_number: "0928000886",
        package_query_number: "66668888",
        return_address: {
          whs_id: "SGC",
        },
        return_refund_type: "RRAOC",
        return_solution: 0,
        is_seller_arrange: true,
        is_shipping_proof_mandatory: true,
        has_uploaded_shipping_proof: false,
        is_reverse_logistics_channel_integrated: false,
        reverse_logistics_channel_name: "test_reverse_logistics_channel_name",
        return_refund_request_type: 0,
        validation_type: "seller_validation",
        is_arrived_at_warehouse: 3,
        follow_up_action_list: [
          {
            item_id: 2700126223,
            model_id: 2000458802,
            qty: 2,
            current_status: 2,
            related_order_sn_list: ["test_string"],
            resell_failed_next_step: '""',
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getReturnDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_return_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getReturnDisputeReason", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "24112301K66SQXM",
      };
      const exampleResponse = {
        dispute_reason_list: [
          {
            dispute_reason: "50",
            dispute_requirement:
              "Regarding to your refund request, Shopee would like to request more information as follows :",
            sample_evidence: [
              {
                type: 1,
                url: "https://fileproxy.scsusercontent.com/api/v2/files/c2hvcGVlLWRyYzAx/bf10d801_e9c9e5473d3345d08671a8cc3bc1a6de.jpg",
                thumbnail:
                  "https://fileproxy.scsusercontent.com/api/v2/files/c2hvcGVlLWRyYzAx/bf10d801_e9c9e5473d3345d08671a8cc3bc1a6de_tn.jpg",
              },
            ],
            evidence_module_list: [
              {
                module_index: 1,
                requirement:
                  "Photo(s) or Video of unboxing the returned parcel with the consignment note (Airway Bill).",
                is_required: true,
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getReturnDisputeReason(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_return_dispute_reason",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getReturnList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_no: 1,
        page_size: 10,
        create_time_from: 1655392442,
        create_time_to: 1655392542,
        update_time_from: 1655392442,
        update_time_to: 1655392542,
        status: "REQUESTED",
        negotiation_status: "TERMINATED",
        seller_proof_status: "PENDING",
        seller_compensation_status: "NOT_REQUIRED",
      };
      const exampleResponse = {
        more: true,
        return: [
          {
            image: ["https:", "", "cf.shopee.sg", "file", "166f23cbfb31bd882f51cfe7f90d3826"],
            reason: "PHYSICAL_DMG",
            text_reason: "return reason",
            reassessed_request_reason: "ITEM_MISSING",
            return_sn: "200203171852695",
            refund_amount: 1409,
            currency: "SGD",
            create_time: 1580721513,
            update_time: 1580729377,
            status: "CANCELLED",
            due_date: 1580721513,
            tracking_number: "RNSHS00177569",
            dispute_reason: ["UNKNOWN"],
            dispute_text_reason: ["reason"],
            needs_logistics: "true",
            amount_before_discount: 1409,
            user: {
              username: "abcdefg",
              email: "***********r1@shopee.com",
              portrait: "https://cf.shopee.sg/file/166f23cbfb31bd882f51cfe7f90d3826",
            },
            item: [
              {
                model_id: 0,
                name: "agsabdmnambd",
                images: ["https:", "", "cf.shopee.sg", "file", "166f23cbfb31bd882f51cfe7f90d3826"],
                amount: 1,
                item_price: 1409.9,
                is_add_on_deal: false,
                is_main_item: false,
                add_on_deal_id: 0,
                item_id: 2147533133,
                item_sku: "USB",
                variation_sku: "RED",
              },
            ],
            order_sn: "200203C6W0AR27",
            return_ship_due_date: 1655438336,
            return_seller_due_date: 1655438336,
            negotiation_status: "PENDING_RESPOND",
            seller_proof_status: "PENDING",
            seller_compensation_status: "PENDING_REQUEST",
            return_refund_type: "RRAOC",
            return_solution: 0,
            is_seller_arrange: false,
            is_shipping_proof_mandatory: false,
            return_refund_request_type: 0,
            validation_type: "seller_validation",
            is_arrived_at_warehouse: 3,
            follow_up_action_list: [
              {
                item_id: 2700126223,
                model_id: 2000458802,
                qty: 2,
                current_status: 2,
                related_order_sn_list: ["test_string"],
                resell_failed_next_step: '""',
              },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getReturnList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_return_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getReverseTrackingInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "2206150VT13E3MQ",
      };
      const exampleResponse = {
        return_sn: "2206150VT13E3MQ",
        return_refund_request_type: 0,
        validation_type: "seller_validation",
        reverse_logistics_status: "LOGISTICS_REQUEST_CREATED",
        reverse_logistics_update_time: 1740728119,
        estimated_delivery_date_max: 1740728121,
        estimated_delivery_date_min: 1740626000,
        collection_pin_code: "666188",
        tracking_number: "MY257829361436J",
        tracking_info: [
          {
            update_time: 1740728119,
            tracking_description: "Parcel has been picked up by our logistics partner",
            epop_image_list: [
              "https:",
              "",
              "cf.shopee.sg",
              "file",
              "4ecbb6fa567e42c1b1e02993ad53df12",
            ],
            epod_image_list: [
              "https:",
              "",
              "cf.shopee.sg",
              "file",
              "4ecbb6fa567e42c1b1e02993ad53df12",
            ],
          },
        ],
        post_return_logistics_status: "test_string",
        post_return_logistics_update_time: "test_string",
        rts_tracking_number: "test_string",
        post_return_logistics_tracking_info: [
          {
            update_time: "test_string",
            tracking_description: "test_string",
            epop_image_list: ["test_string"],
            epod_image_list: ["test_string"],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getReverseTrackingInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_reverse_tracking_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShippingCarrier", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "2206150VT13E3MQ",
      };
      const exampleResponse = {
        is_shipping_proof_mandatory: true,
        has_uploaded_seller_arrange_proof: false,
        shipping_proof_template: [
          {
            is_tracking_number_required: true,
            is_shipping_image_file_mandatory: true,
          },
        ],
        reverse_logistics_carrier_list: [
          {
            reverse_logistics_carrier_id: 0,
            reverse_logistics_carrier_name: "test_reverse_logistics_carrier_name",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShippingCarrier(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/get_shipping_carrier",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("offer", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "211101140608253",
        proposed_solution: "RETURN_REFUND",
        proposed_adjusted_refund_amount: 100,
      };
      const exampleResponse = {
        return_sn: "211101140608253",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.offer(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/offer",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("queryProof", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "123456",
      };
      const exampleResponse = {
        image: [
          {
            url: "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
            thumbnail:
              "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
          },
        ],
        video: [
          {
            url: "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
            thumbnail:
              "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
          },
        ],
        description: "some description",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.queryProof(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/query_proof",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadProof", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "211019111701669",
        photo: [
          {
            url: "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
            thumbnail:
              "https://file-proxy.seller.test.shopee.com/api/v2/files/c2hvcGVlLWRyYzAx/6cd5662c25964655827057bb2bfa69e2.png",
          },
        ],
        description: "test",
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadProof(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/upload_proof",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("uploadShippingProof", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        return_sn: "test_string",
        reverse_logistics_carrier_id: 123,
        reverse_logistics_carrier_name: "test_string",
        tracking_number: "test_string",
        image_id_list: [
          {
            image_id: "test_string",
          },
        ],
        remarks: "test_string",
      };
      const exampleResponse = "test_string";

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.uploadShippingProof(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/returns/upload_shipping_proof",
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
