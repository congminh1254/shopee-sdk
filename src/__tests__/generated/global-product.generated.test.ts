import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { GlobalProductManager } from "../../managers/global-product.manager.js";

const mockFetch = jest.fn() as any;
ShopeeFetch.fetch = mockFetch;

describe("GlobalProductManager (Generated Tests)", () => {
  let manager: GlobalProductManager;
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
    manager = new GlobalProductManager(mockConfig);
  });

  describe("addGlobalItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 14695,
        global_item_name: "item name sample",
        description: "item description sample",
        global_item_sku: "item sku sample",
        image: {
          image_id_list: ["c54265d475b85e00ffb2404585e32b6f", "6fb33d484f232510b5f9b169f2758322"],
        },
        original_price: 95.5,
        normal_stock: 100,
        weight: 100.5,
        dimension: {
          package_length: 11,
          package_width: 11,
          package_height: 11,
        },
        pre_order: {
          days_to_ship: 3,
        },
        condition: "NEW",
        video_upload_id: ["00a2258551b5a2f0a7c283f877330f93"],
        brand: {
          brand_id: 1078,
          original_brand_name: "Nike",
        },
        attribute_list: [
          {
            attribute_id: 1007105,
            attribute_value_list: [
              {
                value_id: 38173,
                original_value_name: "Red",
                value_unit: "kg",
              },
            ],
          },
        ],
        description_info: {
          extended_description: {
            field_list: [
              {
                field_type: "test_string",
                text: "test_string",
                image_info: {
                  image_id: "test_string",
                },
              },
            ],
          },
        },
        description_type: "test_string",
        seller_stock: [
          {
            location_id: "CNZ",
            stock: 100,
          },
        ],
        ds_cat_rcmd_id: "test_string",
        size_chart_info: {
          size_chart: "test_string",
          size_chart_id: 123,
        },
      };
      const exampleResponse = {
        global_item_id: 1007962,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addGlobalItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/add_global_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addGlobalModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 37001402,
        global_model: [
          {
            global_model_sku: "sku",
            tier_index: [1],
            seller_stock: [
              {
                location_id: "CNZ",
                stock: 100,
              },
            ],
            original_price: 123.21,
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              days_to_ship: 2,
            },
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addGlobalModel(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/add_global_model",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("categoryRecommend", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_name: "Head",
        global_product_cover_image: "16bdad2c365f1fccea7664e69b696571",
      };
      const exampleResponse = {
        category_id: [123],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.categoryRecommend(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/category_recommend",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("createPublishTask", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 3500140268,
        shop_id: 600620392,
        shop_region: "TW",
        item: {
          item_name: "item name",
          description: "item description",
          item_status: "NORMAL",
          original_price: 100.5,
          image: {
            image_id_list: ["c54265d475b85e00ffb2404585e32b6f"],
          },
          model: [
            {
              tier_index: [0, 0],
              original_price: 100.5,
              model_status: "NORMAL",
            },
          ],
          size_chart: "591ab15ea954b9879374765854595600",
          logistic: [
            {
              logistic_id: 1001,
              enabled: true,
              shipping_fee: 10.5,
              size_id: 10,
              is_free: false,
            },
          ],
          pre_order: {
            is_pre_order: true,
            days_to_ship: 3,
          },
          description_info: {
            extended_description: {
              field_list: [
                {
                  field_type: "test_string",
                  text: "test_string",
                  image_info: {
                    image_id: "test_string",
                  },
                },
              ],
            },
          },
          standardise_tier_variation: [
            {
              variation_id: 123,
              variation_name: "test_string",
              variation_group_id: 123,
              variation_option_list: [
                {
                  variation_option_id: 123,
                  variation_option_name: "test_string",
                  image_id: "test_string",
                },
              ],
            },
          ],
        },
      };
      const exampleResponse = {
        publish_task_id: 202011300000012000,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.createPublishTask(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/create_publish_task",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteGlobalItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 2800146127,
      };
      const exampleResponse = {
        failure_delete_item: [
          {
            shop_id: 14599,
            item_id: 20001863,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteGlobalItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/delete_global_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteGlobalModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 2600141541,
        global_model_id: 10000548194,
      };
      const exampleResponse = {
        global_model_id: 2000278746,
        failures: [
          {
            shop_id: 103122,
            item_id: 2334252323,
            model_id: 3234423353,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteGlobalModel(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/delete_global_model",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAttributeTree", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id_list: [123],
        language: '"en"',
      };
      const exampleResponse = {
        list: [
          {
            attribute_tree: [
              {
                attribute_id: 123,
                mandatory: true,
                name: "test_string",
                attribute_value_list: [
                  {
                    value_id: 123,
                    name: "test_string",
                    value_unit: "test_string",
                    child_attribute_list: ["test_string"],
                    multi_lang: {
                      language: "test_string",
                      value: "test_string",
                    },
                  },
                ],
                attribute_info: {
                  input_type: 123,
                  input_validation_type: 123,
                  format_type: 123,
                  date_format_type: 123,
                  attribute_unit_list: ["test_string"],
                  mandatory_region: ["test_string"],
                  max_value_count: 123,
                  introduction: "test_string",
                  is_oem: true,
                  support_search_value: true,
                },
                multi_lang: [
                  {
                    language: "test_string",
                    value: "test_string",
                  },
                ],
              },
            ],
            category_id: 123,
            warning: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAttributeTree(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_attribute_tree",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBrandList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 1,
        page_size: 10,
        category_id: 12345,
        status: 1,
      };
      const exampleResponse = {
        brand_list: [
          {
            brand_id: 0,
            original_brand_name: "nike",
            display_brand_name: "nike",
          },
        ],
        has_next_page: true,
        next_offset: 123,
        is_mandatory: true,
        input_type: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBrandList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_brand_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getCategory", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        language: "zh-hans",
      };
      const exampleResponse = {
        category_list: [
          {
            category_id: 123,
            parent_category_id: 123,
            original_category_name: "test_string",
            display_category_name: "test_string",
            has_children: true,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCategory(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_category",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGlobalItemId", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_id: 1889756,
        item_id_list: [1003698],
      };
      const exampleResponse = {
        item_id_map: [
          {
            item_id: 1003698,
            global_item_id: 2059890,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGlobalItemId(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_id",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGlobalItemInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id_list: [123],
      };
      const exampleResponse = {
        global_item_list: [
          {
            global_item_id: 27001415,
            global_item_name: "MY OLD NEW two tier model item 5",
            description:
              "MY OLD NEW default no model itemMY OLD NEW default no model itemMY OLD NEW default no model item",
            global_item_sku: "sku1",
            global_item_status: "NORMAL",
            create_time: "1605247451",
            update_time: "1605247451",
            stock_info: [
              {
                stock_type: 2,
                stock_location_id: "KRZ",
                normal_stock: 44,
                reserved_stock: 0,
              },
            ],
            price_info: [
              {
                currency: "CNY",
                original_price: 100.1,
                sip_item_price: 11.11,
                sip_item_price_source: "auto",
              },
            ],
            image: {
              image_id_list: [
                "bf5a022e4624ff6c01ef151001762db7",
                "1a689fb0124a6d8762761f3ae13815ed",
              ],
              image_url_list: [
                "https:",
                "",
                "s-cf-tw.shopeesz.com",
                "file",
                "bf5a022e4624ff6c01ef151001762db7",
                "https:",
                "",
                "s-cf-tw.shopeesz.com",
                "file",
                "1a689fb0124a6d8762761f3ae13815ed",
              ],
            },
            weight: '"1.1"',
            dimension: {
              package_length: 11,
              package_width: 11,
              package_height: 11,
            },
            pre_order: {
              days_to_ship: 3,
            },
            size_chart: "1a689fb0124a6d8762761f3ae13815ed",
            condition: "NEW",
            has_model: true,
            video: {
              video_url: "1a689fb0124a6d8762761f3ae13815ed",
              thumbnail_url: "7432bfa3713715bc1f88f4025241eb6d",
              duration: 100,
            },
            category_id: 2347462,
            brand: {
              brand_id: 6238,
              original_brand_name: "Nike",
            },
            attribute_list: [
              {
                attribute_id: 4811,
                original_attribute_name: "Brand: L2 Default [14644]",
                attribute_value_list: [
                  {
                    value_id: 1047251,
                    original_value_name: "10",
                    value_unit: "kg",
                  },
                ],
              },
            ],
            description_info: {
              extended_description: {
                field_list: [
                  {
                    field_type: "test_string",
                    text: "test_string",
                    image_info: {
                      image_id: "test_string",
                      image_url: "test_string",
                    },
                  },
                ],
              },
            },
            description_type: "test_string",
            is_fulfillment_by_shopee: true,
            size_chart_id: 123,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGlobalItemInfo(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGlobalItemLimit", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 123,
      };
      const exampleResponse = {
        price_limit: {
          min_limit: 0,
          max_limit: 99.99,
        },
        stock_limit: {
          min_limit: 0,
          max_limit: 50,
        },
        global_item_name_length_limit: {
          min_limit: 1,
          max_limit: 41,
        },
        global_item_image_count_limit: {
          min_limit: 1,
          max_limit: 5,
        },
        global_item_description_length_limit: {
          min_limit: 1,
          max_limit: 100,
        },
        tier_variation_name_length_limit: {
          min_limit: 1,
          max_limit: 20,
        },
        tier_variation_option_length_limit: {
          min_limit: 1,
          max_limit: 20,
        },
        text_length_multiplier: 1.43,
        extended_description_limit: {
          description_text_length_min: 123,
          description_text_length_max: 123,
          description_image_num_min: 123,
          description_image_num_max: 123,
          description_image_width_min: 123,
          description_image_height_min: 123,
          description_image_aspect_ratio_min: 123,
          description_image_aspect_ratio_max: 123,
        },
        dts_limit: {
          days_to_ship_range_list: [
            {
              min_limit: 123,
              max_limit: 123,
            },
          ],
        },
        weight_limit: {
          weight_mandatory: true,
        },
        dimension_limit: {
          dimension_mandatory: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGlobalItemLimit(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_limit",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGlobalItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: "AAAAFA==",
        page_size: 10,
        update_time_from: "1611311600",
        update_time_to: "1611311631",
      };
      const exampleResponse = {
        global_item_list: [
          {
            global_item_id: 2300146833,
            update_time: "1608967817",
          },
        ],
        total_count: 826,
        has_next_page: true,
        offset: "AAAAFA==",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getGlobalItemList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getGlobalModelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 28001461,
      };
      const exampleResponse = {
        tier_variation: [
          {
            name: "tier name 1",
            option_list: [
              {
                option: "tier option 1",
                image: {
                  image_url: "https://cf.shopee.sg/file/c54265d475b85e00ffb2404585e32b6f",
                  image_id: "c54265d475b85e00ffb2404585e32b6f",
                },
              },
            ],
          },
        ],
        global_model: [
          {
            global_model_id: 20004490,
            global_model_sku: "model sku",
            price_info: {
              original_price: 100.5,
            },
            stock_info: [
              {
                stock_type: 1,
                stock_location_id: "1020",
                current_stock: 10,
                normal_stock: 10,
                reserved_stock: 10,
              },
            ],
            tier_index: [0, 1],
            weight: '"1.1"',
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              days_to_ship: 2,
            },
            is_fulfillment_by_shopee: true,
          },
        ],
        standardise_tier_variation: [
          {
            variation_id: 123,
            variation_name: "test_string",
            variation_group_id: 123,
            variation_option_list: [
              {
                variation_option_id: 123,
                variation_option_name: "test_string",
                image_id: "test_string",
                image_url: "test_string",
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

      const result = await manager.getGlobalModelList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_global_model_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getLocalAdjustmentRate", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_id: 123,
      };
      const exampleResponse = {
        local_adjustment_rate: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getLocalAdjustmentRate(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_local_adjustment_rate",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPublishTaskResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        publish_task_id: 202011300000012000,
      };
      const exampleResponse = {
        publish_status: "success",
        success: {
          region: "TW",
          shop_id: "13349",
          item_id: "1099283",
        },
        failed: {
          failed_reason: "item name length exceed upper limit",
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPublishTaskResult(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_publish_task_result",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPublishableShop", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 3000141126,
        shop_id_list: [3000141126, 3000141127],
      };
      const exampleResponse = {
        publishable_shop: [
          {
            shop_id: 1000567,
            shop_region: "TW",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPublishableShop(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_publishable_shop",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getPublishedList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 3000141126,
        shop_id_list: [220750716, 220056389],
      };
      const exampleResponse = {
        published_item: [
          {
            shop_id: 1000369,
            shop_region: "TW",
            item_id: 1899023,
            item_status: 1,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getPublishedList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_published_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecommendAttribute", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_name: "iphone6s",
        category_id: 1065001,
        cover_image_id: "30aa47695d1afb99e296956699f67be6",
      };
      const exampleResponse = {
        attribute_list: [
          {
            attribute_id: 123,
            attribute_value_list: [
              {
                value_id: 123,
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

      const result = await manager.getRecommendAttribute(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_recommend_attribute",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getShopPublishableStatus", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 3000141126,
        offset: 0,
        page_size: 10,
      };
      const exampleResponse = {
        shop_publishable_status_list: [
          {
            shop_id: 1000567,
            region: "TW",
            shop_publishable_status: true,
            unpublishable_reason: "The shop is under penalty",
          },
        ],
        has_next_page: true,
        next_offset: 1,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getShopPublishableStatus(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_shop_publishable_status",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSizeChartDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        size_chart_id: 700024639,
        language: '"en"',
      };
      const exampleResponse = {
        size_chart_id: 123,
        size_chart_name: "test_string",
        size_chart_table: {
          column_list: [
            {
              measurement: {
                input_type: "test_string",
                unit: "test_string",
                display_name: "test_string",
              },
              measurement_value_list: [
                {
                  value: 123,
                  min_value: 123,
                  max_value: 123,
                  option: "test_string",
                },
              ],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSizeChartDetail(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_size_chart_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getSizeChartList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 100087,
        page_size: 10,
        cursor: '""',
      };
      const exampleResponse = {
        size_chart_list: [
          {
            size_chart_id: 123,
          },
        ],
        total_count: 123,
        next_cursor: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSizeChartList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_size_chart_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVariations", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 123,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "test_string",
        data: "test_string",
        standardise_variation_list: [
          {
            variation_id: 123,
            variation_name: "color",
            variation_group_list: [
              {
                variation_group_id: 1234,
                variation_group_name: "group1",
                variation_option_list: [
                  {
                    variation_option_id: 12345,
                    variation_option_name: "yellow",
                  },
                ],
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

      const result = await manager.getVariations(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/get_variations",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("initTierVariation", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_model: [
          {
            original_price: 12.34,
            seller_stock: [
              {
                location_id: "CNZ",
                stock: 100,
              },
            ],
            global_model_sku: "sku",
            tier_index: "0,1",
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              days_to_ship: 2,
            },
          },
        ],
        global_item_id: 22001469,
        standardise_tier_variation: [
          {
            variation_id: 123,
            variation_name: "test_string",
            variation_group_id: 123,
            variation_option_list: [
              {
                variation_option_id: 123,
                variation_option_name: "test_string",
                image_id: "test_string",
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.initTierVariation(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/init_tier_variation",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("searchGlobalAttributeValueList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        attribute_id: 123,
        value_name: "test_string",
        cursor: 123,
        limit: 100,
      };
      const exampleResponse = {
        value_list: [
          {
            value_id: 123,
            value_name: "test_string",
          },
        ],
        page_info: {
          cursor: 123,
          has_next: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.searchGlobalAttributeValueList(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/search_global_attribute_value_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("setSyncField", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        shop_sync_list: [
          {
            shop_id: 1003698,
            shop_region: "TW",
            name_and_description: true,
            media_information: true,
            tier_variation_name_and_option: true,
            price: true,
            days_to_ship: true,
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "da6b348a4a5e4162b885ecc73c85297f",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.setSyncField(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/set_sync_field",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("supportSizeChart", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 11364,
      };
      const exampleResponse = {
        support_size_chart: true,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.supportSizeChart(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/support_size_chart",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateGlobalItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 100369,
        category_id: 7535,
        global_item_name: "item name",
        description: "item description",
        global_item_sku: "item sku",
        weight: 100.5,
        dimension: {
          package_length: 11,
          package_width: 11,
          package_height: 11,
        },
        pre_order: {
          days_to_ship: 3,
        },
        condition: "NEW",
        image: {
          image_id_list: ["c54265d475b85e00ffb2404585e32b6f", "6fb33d484f232510b5f9b169f2758322"],
        },
        video_upload_id: ["591ab15ea954b9879374765854595600"],
        brand: {
          brand_id: 1078,
        },
        attribute_list: [
          {
            attribute_id: 1007105,
            attribute_value_list: [
              {
                value_id: 38173,
                original_value_name: "Red",
                value_unit: "Kg",
              },
            ],
          },
        ],
        description_info: {
          extended_description: {
            field_list: [
              {
                field_type: "test_string",
                text: "test_string",
                image_info: {
                  image_id: "test_string",
                },
              },
            ],
          },
        },
        description_type: "test_string",
        size_chart_info: {
          size_chart: "test_string",
          size_chart_id: 123,
        },
      };
      const exampleResponse = {
        global_item_id: 100369,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateGlobalItem(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_global_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateGlobalModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 28001436,
        global_model: [
          {
            global_model_sku: "sku",
            global_model_id: 234431,
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              days_to_ship: 2,
            },
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateGlobalModel(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_global_model",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateLocalAdjustmentRate", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        adjustment_rate: 123,
        shop_id: 123,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateLocalAdjustmentRate(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_local_adjustment_rate",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updatePrice", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 2700143060,
        price_list: [
          {
            global_model_id: 2000457157,
            original_price: 124.12,
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updatePrice(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_price",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateSizeChart", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 3000141126,
        size_chart: "c54265d475b85e00ffb2404585e32b6f",
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateSizeChart(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_size_chart",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateStock", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 2700143060,
        stock_list: [
          {
            global_model_id: 123413,
            seller_stock: [
              {
                location_id: "CNZ",
                stock: 100,
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateStock(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_stock",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateTierVariation", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        global_item_id: 2200146923,
        model_list: [
          {
            model_id: 1002066586922,
            tier_index: 123,
          },
        ],
        standardise_tier_variation: [
          {
            variation_id: 123,
            variation_name: "test_string",
            variation_group_id: 123,
            variation_option_list: [
              {
                variation_option_id: 123,
                variation_option_name: "test_string",
                image_id: "test_string",
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "98eae35efff24dd0974c21a847127184",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateTierVariation(exampleRequest as any);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/global_product/update_tier_variation",
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
