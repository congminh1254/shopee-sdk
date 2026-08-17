import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ProductManager } from "../../managers/product.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("ProductManager (Generated Tests)", () => {
  let manager: ProductManager;
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
    manager = new ProductManager(mockConfig);
  });

  describe("addItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        original_price: 123.3,
        description: "item description test",
        weight: 1.1,
        item_name: "Item Name Example",
        item_status: "UNLIST",
        dimension: {
          package_height: 11,
          package_length: 11,
          package_width: 11,
        },
        logistic_info: [
          {
            size_id: 0,
            shipping_fee: 23.12,
            enabled: true,
            logistic_id: 80101,
            is_free: false,
          },
        ],
        attribute_list: [
          {
            attribute_id: 4990,
            attribute_value_list: [
              {
                value_id: 32142,
                original_value_name: "Brand",
                value_unit: "kg",
              },
            ],
          },
        ],
        category_id: 14695,
        image: {
          image_id_list: ["test_string"],
          image_ratio: "test_string",
        },
        pre_order: {
          is_pre_order: false,
          days_to_ship: 3,
        },
        item_sku: "test_string",
        condition: "NEW",
        wholesale: [
          {
            min_count: 1,
            max_count: 100,
            unit_price: 28.3,
          },
        ],
        video_upload_id: ["sg_f4bde9bc-ff3c-485e-a6dd-3161dab4b942_000000"],
        brand: {
          brand_id: 0,
          original_brand_name: "nike",
        },
        item_dangerous: 0,
        tax_info: {
          ncm: "test_string",
          same_state_cfop: "test_string",
          diff_state_cfop: "test_string",
          csosn: "test_string",
          origin: "test_string",
          cest: "test_string",
          measure_unit: "test_string",
          tax_type: 123,
          pis: "test_string",
          cofins: "test_string",
          icms_cst: "test_string",
          pis_cofins_cst: "test_string",
          federal_state_taxes: "test_string",
          operation_type: "test_string",
          ex_tipi: "test_string",
          fci_num: "test_string",
          recopi_num: "test_string",
          additional_info: "test_string",
          group_item_info: {
            group_qtd: "test_string",
            group_unit: "test_string",
            group_unit_value: "test_string",
            original_group_price: "test_string",
            group_gtin_sscc: "test_string",
            group_grai_gtin_sscc: "test_string",
          },
          export_cfop: "7101",
        },
        complaint_policy: {
          warranty_time: "test_string",
          exclude_entrepreneur_warranty: true,
          complaint_address_id: 123,
          additional_information: "test_string",
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
        description_type: "test_string",
        seller_stock: [
          {
            location_id: "test_string",
            stock: 123,
          },
        ],
        gtin_code: "test_string",
        ds_cat_rcmd_id: "test_string",
        promotion_images: {
          image_id_list: ["test_string"],
        },
        compatibility_info: {
          vehicle_info_list: [
            {
              brand_id: 1234,
              model_id: 2345,
              year_id: 3456,
              version_id: 4567,
            },
          ],
        },
        scheduled_publish_time: 1733590920,
        authorised_brand_id: 123,
        size_chart_info: {
          size_chart: "test_string",
          size_chart_id: 123,
        },
        certification_info: {
          certification_list: [
            {
              certification_no: "test_string",
              permit_id: 123,
              expiry_date: 1610000000,
              certification_proofs: [
                {
                  file_name: "test_string",
                  image_id: 123,
                  ratio: 123,
                },
              ],
            },
          ],
        },
        purchase_limit_info: {
          min_purchase_limit: 123,
          max_purchase_limit: {
            purchase_limit: 123,
          },
        },
        medicine_id: 123,
      };
      const exampleResponse = {
        description: "description",
        weight: 1.1,
        pre_order: {
          days_to_ship: 1,
          is_pre_order: false,
        },
        item_name: "Hello Product",
        images: {
          image_id_list: ["test_string"],
          image_url_list: ["test_string"],
        },
        item_status: "NORMAL",
        price_info: {
          current_price: 148.02,
          original_price: 148.02,
        },
        logistic_info: [
          {
            size_id: 0,
            shipping_fee: 0,
            enabled: false,
            logistic_id: 88014,
            is_free: false,
          },
        ],
        item_id: 3000142341,
        attribute: [
          {
            attribute_id: 4990,
            attribute_value_list: [
              {
                original_value_name: "Samsung ID",
                value_id: 32142,
                value_unit: "kg",
              },
            ],
          },
        ],
        category_id: 14695,
        dimension: {
          package_width: 11,
          package_length: 11,
          package_height: 11,
        },
        condition: "NEW",
        video_info: [
          {
            video_url: "https://cvf.shopee.sg/file/c67b847c954fd710e0d35ef1e22378d1",
            thumbnail_url: "https://cf.shopee.sg/file/6fc53c203151635da72151cfbad03cdf",
            duration: 15,
          },
        ],
        wholesale: [
          {
            min_count: 1,
            max_count: 100,
            unit_price: 13.3,
          },
        ],
        brand: {
          brand_id: 0,
          original_brand_name: "nike",
        },
        item_dangerous: 0,
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
        complaint_policy: {
          warranty_time: "ONE_YEAR",
          exclude_entrepreneur_warranty: false,
          complaint_address_id: 123,
          additional_information: "test_string",
        },
        seller_stock: [
          {
            location_id: "test_string",
            stock: 123,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/add_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addKitItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_setting: {
          item_name: "item name sample",
          images: {
            image_id_list: ["test_string"],
          },
          long_images: {
            image_id_list: ["test_string"],
          },
          video_upload_id: ["sg_f4bde9bc-ff3c-485e-a6dd-3161dab4b942_000000"],
          description: "item description sample",
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
          description_type: "extended",
          logistic_info: [
            {
              logistic_id: 123,
              enabled: true,
              shipping_fee: 123,
              size_id: 123,
              is_free: true,
            },
          ],
          unlisted: false,
          item_sku: "item sku sample",
          weight: 1.1,
          dimension: {
            package_length: 11,
            package_width: 11,
            package_height: 11,
          },
          pre_order: {
            is_pre_order: true,
            days_to_ship: 10,
          },
          model_list: [
            {
              tier_index: [0],
              model_sku: "model sku sample",
              original_price: 38.3,
              component_list: [
                {
                  component_item_id: 892568916,
                  component_model_id: 8501462426,
                  quantity: 2,
                  main_component: true,
                },
              ],
            },
          ],
          tier_variation_list: [
            {
              name: "test_string",
              option_list: [
                {
                  option: "test_string",
                  image: {
                    image_id: "test_string",
                  },
                },
              ],
            },
          ],
        },
        sync_setting: {
          auto_sync_dts: true,
        },
      };
      const exampleResponse = {
        item_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.addKitItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/add_kit_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("addModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1000,
        model_list: [
          {
            tier_index: [0],
            original_price: 38.3,
            model_sku: "SKU",
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
            gtin_code: "test_string",
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              is_pre_order: false,
              days_to_ship: 2,
            },
          },
        ],
      };
      const exampleResponse = {
        model: [
          {
            tier_index: [0],
            model_id: 32341,
            model_sku: "sku",
            price_info: [
              {
                original_price: 52.4,
              },
            ],
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
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

      const result = await manager.addModel(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/add_model",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchAddItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_list: [
          {
            original_price: 123.3,
            description: "item description test",
            weight: 1.1,
            item_name: "Item Name Example",
            item_status: "UNLIST",
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            logistic_info: [
              {
                size_id: 0,
                shipping_fee: 23.12,
                enabled: true,
                logistic_id: 80101,
                is_free: false,
              },
            ],
            attribute_list: [
              {
                attribute_id: 4990,
                attribute_value_list: [
                  {
                    value_id: 32142,
                    original_value_name: "Brand",
                    value_unit: "kg",
                  },
                ],
              },
            ],
            category_id: 14695,
            image: {
              image_id_list: ["test_string"],
              image_ratio: "test_string",
            },
            pre_order: {
              is_pre_order: false,
              days_to_ship: 3,
            },
            item_sku: "test_string",
            condition: "NEW",
            wholesale: [
              {
                min_count: 1,
                max_count: 100,
                unit_price: 28.3,
              },
            ],
            video_upload_id: ["sg_f4bde9bc-ff3c-485e-a6dd-3161dab4b942_000000"],
            brand: {
              brand_id: 0,
              original_brand_name: "nike",
            },
            item_dangerous: 0,
            tax_info: {
              ncm: "test_string",
              same_state_cfop: "test_string",
              diff_state_cfop: "test_string",
              csosn: "test_string",
              origin: "test_string",
              cest: "test_string",
              measure_unit: "test_string",
              tax_type: 123,
              pis: "test_string",
              cofins: "test_string",
              icms_cst: "test_string",
              pis_cofins_cst: "test_string",
              federal_state_taxes: "test_string",
              operation_type: "test_string",
              ex_tipi: "test_string",
              fci_num: "test_string",
              recopi_num: "test_string",
              additional_info: "test_string",
              group_item_info: {
                group_qtd: "test_string",
                group_unit: "test_string",
                group_unit_value: "test_string",
                original_group_price: "test_string",
                group_gtin_sscc: "test_string",
                group_grai_gtin_sscc: "test_string",
              },
              export_cfop: "7101",
            },
            complaint_policy: {
              warranty_time: "test_string",
              exclude_entrepreneur_warranty: true,
              complaint_address_id: 123,
              additional_information: "test_string",
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
            description_type: "test_string",
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
            gtin_code: "test_string",
            ds_cat_rcmd_id: "test_string",
            promotion_images: {
              image_id_list: ["test_string"],
            },
            compatibility_info: {
              vehicle_info_list: [
                {
                  brand_id: 1234,
                  model_id: 2345,
                  year_id: 3456,
                  version_id: 4567,
                },
              ],
            },
            scheduled_publish_time: 1733590920,
            authorised_brand_id: 123,
            size_chart_info: {
              size_chart: "test_string",
              size_chart_id: 123,
            },
            certification_info: {
              certification_list: [
                {
                  certification_no: "test_string",
                  permit_id: 123,
                  expiry_date: 1610000000,
                  certification_proofs: [
                    {
                      file_name: "test_string",
                      image_id: 123,
                      ratio: 123,
                    },
                  ],
                },
              ],
            },
            purchase_limit_info: {
              min_purchase_limit: 123,
              max_purchase_limit: {
                purchase_limit: 123,
              },
            },
            medicine_id: 123,
          },
        ],
      };
      const exampleResponse = {
        task_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchAddItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/batch_add_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchPublishItemToOutletShop", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_list: [
          {
            mart_item_id: 123,
            outlet_shop_id: 123,
            publish_item: {
              outlet_item_id: 123,
              model: [
                {
                  relate_mart_model_id: 123,
                  model_status: "test_string",
                  original_price: 123,
                  seller_stock: [
                    {
                      location_id: "test_string",
                      stock: 123,
                    },
                  ],
                  pre_order: {
                    is_pre_order: true,
                    days_to_ship: 123,
                  },
                },
              ],
              logistic_info: [
                {
                  logistic_id: 123,
                  enabled: true,
                  shipping_fee: 123,
                  size_id: 123,
                  is_free: true,
                },
              ],
              purchase_limit_info: {
                min_purchase_limit: 123,
                max_purchase_limit: {
                  purchase_limit: 123,
                },
              },
            },
          },
        ],
      };
      const exampleResponse = {
        task_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchPublishItemToOutletShop(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/batch_publish_item_to_outlet_shop",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchUpdateOutletPrice", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_list: [
          {
            outlet_shop_id: 123,
            item_id: 123,
            price_list: [
              {
                model_id: 123,
                original_price: 123,
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        task_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchUpdateOutletPrice(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/batch_update_outlet_price",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("batchUpdateOutletStock", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_list: [
          {
            outlet_shop_id: 123,
            item_id: 123,
            stock_list: [
              {
                model_id: 123,
                seller_stock: [
                  {
                    location_id: "test_string",
                    stock: 123,
                  },
                ],
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        task_id: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.batchUpdateOutletStock(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/batch_update_outlet_stock",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("boostItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [123],
      };
      const exampleResponse = {
        failure_list: [
          {
            item_id: 2300069665,
            failed_reason: "can not boost item repeatedly",
          },
        ],
        success_list: [
          {
            item_id_list: [3400138725],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.boostItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/boost_item",
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
        item_name: "海飞丝洗发水",
        product_cover_image: "16bdad2c365f1fccea7664e69b696571",
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

      const result = await manager.categoryRecommend(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/category_recommend",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 34001,
      };
      const exampleResponse = {
        error: "test_string",
        message: "test_string",
        warning: "test_string",
        request_id: "7b9da0c6926642199c33ee9dd3a266f5",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.deleteItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/delete_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("deleteModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1000,
        model_id: 3456,
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

      const result = await manager.deleteModel(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/delete_model",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("generateKitImage", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        component_list: [
          {
            component_item_id: 123,
            component_model_id: 123,
          },
        ],
      };
      const exampleResponse = {
        kit_image: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.generateKitImage(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/generate_kit_image",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAitemByPitemId", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        pitem_id: 843997615,
      };
      const exampleResponse = {
        aitem_list: [
          {
            ashop_id: 223009454,
            ashop_region: '"SG"',
            aitem_id: 843997618,
            model_mapping_list: [
              {
                pmodel_id: 11055090,
                amodel_id: 11055093,
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

      const result = await manager.getAitemByPitemId(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_aitem_by_pitem_id",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getAllVehicleList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 10,
        offset: 0,
        language: "pt-br",
      };
      const exampleResponse = {
        vehicle_list: [
          {
            brand_id: 1234,
            brand_name: "Toyota",
            model_id: 2345,
            model_name: "Etios",
            year_id: 3456,
            year_name: "2023",
            version_id: 4567,
            version_name: "1.0",
          },
        ],
        has_next_page: true,
        next_offset: 123,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getAllVehicleList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_all_vehicle_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
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
                    multi_lang: [
                      {
                        language: "test_string",
                        value: "test_string",
                      },
                    ],
                  },
                ],
                attribute_info: {
                  input_type: 123,
                  input_validation_type: 123,
                  format_type: 123,
                  date_format_type: 123,
                  attribute_unit_list: ["test_string"],
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

      const result = await manager.getAttributeTree(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_attribute_tree",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBatchTaskResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        task_type: 123,
        task_id: 123,
      };
      const exampleResponse = {
        publish_status: 123,
        success_list: [
          {
            shop_id: 123,
            item_id: 123,
            model_id: 123,
          },
        ],
        failed_list: [
          {
            shop_id: 123,
            item_id: 123,
            model_id: 123,
            failed_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBatchTaskResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_batch_task_result",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getBoostedList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {};
      const exampleResponse = {
        item_list: [
          {
            item_id: 3200139749,
            cool_down_second: 59,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getBoostedList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_boosted_list",
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
        offset: 0,
        page_size: 10,
        category_id: 12345,
        status: 1,
        language: "zh-hans",
      };
      const exampleResponse = {
        brand_list: [
          {
            original_brand_name: "nike",
            brand_id: 123,
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

      const result = await manager.getBrandList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_brand_list",
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
            category_id: 1234,
            parent_category_id: 1234,
            original_category_name: "内衣",
            display_category_name: "内衣",
            has_children: false,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getCategory(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_category",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getComment", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 16509872,
        comment_id: 120590834,
        cursor: "test_string",
        page_size: 10,
      };
      const exampleResponse = {
        more: false,
        item_comment_list: [
          {
            order_sn: "200922CTK2J6KN",
            comment_id: "120590834",
            comment: "thank you",
            buyer_username: "tom",
            item_id: 16509872,
            model_id: 0,
            rating_star: 5,
            editable: "EDITABLE",
            hidden: false,
            create_time: 1603153057,
            comment_reply: {
              reply: "Thank you for your support. Look forward to your next visit.",
              hidden: false,
              create_time: 1712053073,
            },
            model_id_list: [123],
            media: {
              image_url_list: ["test_string"],
              video_url_list: ["test_string"],
            },
          },
        ],
        next_cursor: '"20"',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getComment(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_comment",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getDirectItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        main_item_id: [801931707],
      };
      const exampleResponse = {
        list: [
          {
            main_item_id: 801931707,
            direct_item_list: [
              {
                direct_shop_id: 224499453,
                direct_item_id: 843997552,
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

      const result = await manager.getDirectItemList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_direct_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getDirectShopRecommendedPrice", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        main_item_id: 843997552,
        direct_shop_regions: ["SG"],
        category_id: 1234,
        model_list: [
          {
            model_id: 1234,
            tier_index: [0, 1],
            input_price: 1000,
            weight: 1.1,
          },
        ],
        enabled_channel_id_list: [28016],
      };
      const exampleResponse = {
        direct_item_price: [
          {
            shop_id: 224499453,
            region: "SG",
            hidden_price: 123,
            item_model_price_list: [
              {
                model_id: 1234,
                tier_index: [0, 1],
                price: 1000.5,
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

      const result = await manager.getDirectShopRecommendedPrice(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_direct_shop_recommended_price",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemBaseInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [34001, 34002],
        need_tax_info: true,
        need_complaint_policy: true,
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 34002,
            category_id: 14646,
            item_name: "seller discount",
            description: "first product 001first product",
            item_sku: "test_string",
            create_time: 1600572637,
            update_time: 1600572640,
            attribute_list: [
              {
                attribute_id: 4811,
                original_attribute_name: "Brand: L2 Default [14644]",
                is_mandatory: true,
                attribute_value_list: [
                  {
                    value_id: 0,
                    original_value_name: "Default",
                    value_unit: "g",
                  },
                ],
              },
            ],
            price_info: [
              {
                currency: "SGD",
                original_price: 122.02,
                current_price: 122.02,
                inflated_price_of_original_price: 222.02,
                inflated_price_of_current_price: 111.02,
                sip_item_price: 100.02,
                sip_item_price_source: "auto",
                local_price: 122.02,
                local_promotion_price: 122.02,
              },
            ],
            image: {
              image_url_list: ["test_string"],
              image_id_list: ["test_string"],
              image_ratio: "test_string",
            },
            weight: '"10.02"',
            dimension: {
              package_length: 11,
              package_width: 12,
              package_height: 13,
            },
            logistic_info: [
              {
                logistic_id: 80012,
                logistic_name: "test_string",
                enabled: true,
                shipping_fee: 5.02,
                size_id: 123,
                is_free: false,
                estimated_shipping_fee: 4.02,
              },
            ],
            pre_order: {
              is_pre_order: false,
              days_to_ship: 3,
            },
            wholesales: [
              {
                min_count: 1,
                max_count: 2,
                unit_price: 4.02,
                inflated_price_of_unit_price: 5.02,
              },
            ],
            condition: "NEW/USED",
            size_chart: "test_string",
            item_status: "NORMAL",
            deboost: false,
            has_model: false,
            has_promotion: true,
            video_info: [
              {
                video_url: "test_string",
                thumbnail_url: "test_string",
                duration: 123,
              },
            ],
            brand: {
              brand_id: 123,
              original_brand_name: "nike",
            },
            item_dangerous: 0,
            gtin_code: "test_string",
            size_chart_id: 123,
            promotion_image: {
              image_id_list: ["test_string"],
              image_url_list: ["test_string"],
              image_ratio: "test_string",
            },
            compatibility_info: {
              vehicle_info_list: [
                {
                  brand_id: 1234,
                  model_id: 2345,
                  year_id: 3456,
                  version_id: 4567,
                },
              ],
            },
            scheduled_publish_time: 1733590920,
            authorised_brand_id: 123,
            ssp_id: 123,
            is_fulfillment_by_shopee: true,
            tag: {
              kit: true,
            },
            purchase_limit_info: {
              min_purchase_limit: 123,
              max_purchase_limit: {
                purchase_limit: 123,
              },
            },
            medicine_id: 123,
            certification_info: {
              certification_list: [
                {
                  permit_id: 123,
                  certification_no: "test_string",
                  expiry_date: 123,
                  certification_proofs: [
                    {
                      image_id: "test_string",
                      ratio: 123,
                      file_name: "test_string",
                      image_url: "test_string",
                    },
                  ],
                },
              ],
            },
          },
        ],
        complaint_policy: {
          warranty_time: "ONE_YEAR",
          exclude_entrepreneur_warranty: true,
          complaint_address_id: 123,
          additional_information: "test_string",
        },
        tax_info: {
          ncm: "test_string",
          diff_state_cfop: "test_string",
          csosn: "test_string",
          origin: "test_string",
          cest: "test_string",
          measure_unit: "test_string",
          invoice_option: "test_string",
          vat_rate: "test_string",
          hs_code: "test_string",
          tax_code: "test_string",
          tax_type: 123,
          pis: "test_string",
          cofins: "test_string",
          icms_cst: "test_string",
          pis_cofins_cst: "test_string",
          federal_state_taxes: "test_string",
          operation_type: "test_string",
          ex_tipi: "test_string",
          fci_num: "test_string",
          recopi_num: "test_string",
          additional_info: "test_string",
          group_item_info: {
            group_qtd: "test_string",
            group_unit: "test_string",
            group_unit_value: "test_string",
            original_group_price: "test_string",
            group_gtin_sscc: "test_string",
            group_grai_gtin_sscc: "test_string",
          },
          export_cfop: "test_string",
        },
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
        stock_info_v2: {
          summary_info: {
            total_reserved_stock: 123,
            total_available_stock: 123,
          },
          seller_stock: [
            {
              location_id: "test_string",
              stock: 123,
              if_saleable: true,
            },
          ],
          shopee_stock: [
            {
              location_id: "test_string",
              stock: 123,
            },
          ],
          advance_stock: {
            sellable_advance_stock: 123,
            in_transit_advance_stock: 123,
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemBaseInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_base_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemContentDiagnosisResult", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [10760653, 10943921],
      };
      const exampleResponse = {
        success_item_list: [
          {
            item_id: 123,
            quality_level: 123,
            unfinished_task: [
              {
                issue_type: 123,
                suggestion: "test_string",
              },
            ],
          },
        ],
        failure_item_list: [
          {
            item_id: 123,
            failed_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemContentDiagnosisResult(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_content_diagnosis_result",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemExtraInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [34001, 34002],
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 2500139861,
            sale: 1,
            views: 2,
            likes: 3,
            rating_star: 4.02,
            comment_count: 5,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemExtraInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_extra_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemLimit", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 400055,
      };
      const exampleResponse = {
        price_limit: {
          min_limit: 5.5,
          max_limit: 10000000,
        },
        wholesale_price_threshold_percentage: {
          min_limit: 30,
          max_limit: 100,
        },
        stock_limit: {
          min_limit: 5,
          max_limit: 10000000,
        },
        item_name_length_limit: {
          min_limit: 5,
          max_limit: 100,
        },
        item_image_count_limit: {
          min_limit: 1,
          max_limit: 9,
        },
        item_description_length_limit: {
          min_limit: 10,
          max_limit: 2000,
        },
        tier_variation_name_length_limit: {
          min_limit: 0,
          max_limit: 14,
        },
        tier_variation_option_length_limit: {
          min_limit: 0,
          max_limit: 20,
        },
        item_count_limit: {
          max_limit: 50001,
        },
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
          days_to_ship_limit: {
            min_limit: 123,
            max_limit: 123,
          },
          non_pre_order_days_to_ship: 123,
        },
        weight_limit: {
          weight_mandatory: true,
        },
        dimension_limit: {
          dimension_mandatory: true,
        },
        size_chart_limit: {
          size_chart_mandatory: true,
          support_image_size_chart: true,
          support_template_size_chart: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemLimit(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_limit",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: 0,
        page_size: 10,
        update_time_from: 1611311600,
        update_time_to: 1611311631,
        item_status: "NORMAL",
      };
      const exampleResponse = {
        item: [
          {
            item_id: 2500139861,
            item_status: "NORMAL",
            update_time: 1608128470,
            tag: {
              kit: true,
            },
          },
        ],
        total_count: 10,
        has_next_page: true,
        next_offset: 10,
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemListByContentDiagnosis", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 5,
        offset: '""',
        quality_level: [1, 2],
        issue_type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 123,
            quality_level: 123,
            unfinished_task: [
              {
                issue_type: 123,
                suggestion: "test_string",
              },
            ],
          },
        ],
        total_count: 30,
        has_next_page: true,
        next_offset: '"800253323,1723540627,800253323"',
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemListByContentDiagnosis(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_list_by_content_diagnosis",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemPromotion", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [13233406680, 17924576533],
      };
      const exampleResponse = {
        success_list: [
          {
            item_id: 123,
            promotion: [
              {
                promotion_type: "Campaign",
                promotion_id: "test_string",
                model_id: 123,
                start_time: "test_string",
                end_time: "test_string",
                promotion_price_info: [
                  {
                    promotion_price: 123,
                  },
                ],
                promotion_staging: "test_string",
                promotion_stock_info_v2: {
                  summary_info: "test_string",
                  total_reserved_stock: 10,
                },
              },
            ],
          },
        ],
        failure_list: [
          {
            item_id: 123,
            failed_reason: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemPromotion(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_promotion",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getItemViolationInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id_list: [34001, 34002],
      };
      const exampleResponse = {
        item_list: [
          {
            item_id: 3400133011,
            item_name: "test",
            item_status: "BANNED",
            deboost: true,
            item_status_details: [
              {
                violation_type: "Prohibited Listing",
                violation_reason: "License Reason",
                suggestion: "Upload license",
                fix_deadline_time: 1705227588,
                update_time: 1705054788,
              },
            ],
            deboost_details: [
              {
                violation_type: "Prohibited Listing",
                violation_reason: "Wrong Category",
                suggestion:
                  "The item is in wrong category, please update to the suggested_category",
                suggested_category: [
                  {
                    category_id: 107478,
                    category_name: "Personal Care",
                  },
                ],
                fix_deadline_time: 1705202227,
                update_time: 1704943027,
              },
            ],
            fail_error: "test_string",
            fail_message: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getItemViolationInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_item_violation_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getKitItemInfo", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 28001430,
      };
      const exampleResponse = {
        product_info: {
          item_id: 28001430,
          item_name: "item name sample",
          category_id: [14646],
          item_status: "NORMAL",
          item_sku: "test_string",
          images: {
            image_id_list: ["test_string"],
            image_url_list: ["test_string"],
            image_ratio: "1:1",
          },
          long_images: {
            image_id_list: ["test_string"],
            image_url_list: ["test_string"],
            image_ratio: "3:4",
          },
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
          description: "test_string",
          description_type: "test_string",
          video_list: [
            {
              video_url: "test_string",
              thumbnail_url: "test_string",
              duration: 123,
            },
          ],
          attributes: [
            {
              attribute_id: 4811,
              original_attribute_name: "Brand: L2 Default [14644]",
              attribute_value_list: [
                {
                  value_id: 0,
                  original_value_name: "Default",
                  value_unit: "g",
                },
              ],
            },
          ],
          weight: '"1.5"',
          dimension: {
            package_length: 11,
            package_width: 11,
            package_height: 11,
          },
          brand_info: {
            brand_id: 123,
            original_brand_name: "test_string",
          },
          model_list: [
            {
              model_id: 123,
              model_sku: 123,
              original_price: 123,
              tier_index: [123],
              component_list: [
                {
                  component_item_id: 123,
                  component_item_name: "test_string",
                  component_model_id: 123,
                  component_model_name: "test_string",
                  quantity: 123,
                  main_component: true,
                  component_item_or_model_image: "test_string",
                  component_item_or_model_sku: "test_string",
                },
              ],
            },
          ],
          pre_order_info: {
            is_pre_order: true,
            days_to_ship: 123,
          },
          tier_variation_list: [
            {
              name: "test_string",
              option_list: [
                {
                  option: "test_string",
                  image: [
                    {
                      image_id: "test_string",
                      image_url: "test_string",
                    },
                  ],
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

      const result = await manager.getKitItemInfo(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_kit_item_info",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getKitItemLimit", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        category_id: 400055,
      };
      const exampleResponse = {
        price_limit: {
          min_limit: 5.5,
          max_limit: 10000000,
        },
        item_name_length_limit: {
          min_limit: 5,
          max_limit: 99,
        },
        item_image_count_limit: {
          min_limit: 1,
          max_limit: 10,
        },
        description_limit: {
          description_length_min: 10,
          description_length_max: 499,
          description_text_length_min: 10,
          description_text_length_max: 499,
          description_image_num_min: 1,
          description_image_num_max: 5,
          description_image_width_min: 1,
          description_image_height_min: 1,
          description_image_aspect_ratio_min: 0.5,
          description_image_aspect_ratio_max: 32,
        },
        tier_variation_name_length_limit: {
          min_limit: 1,
          max_limit: 50,
        },
        tier_variation_option_length_limit: {
          min_limit: 1,
          max_limit: 50,
        },
        weight_limit: {
          weight_mandatory: true,
        },
        dimension_limit: {
          dimension_mandatory: true,
        },
        dts_limit: {
          non_pre_order_days_to_ship: 2,
          support_pre_order: true,
          days_to_ship_limit: {
            min_limit: 3,
            max_limit: 30,
          },
        },
        component_count_limit_of_single_model: {
          min_limit: 2,
          max_limit: 10,
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getKitItemLimit(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_kit_item_limit",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMainItemList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        direct_item_id: [801931707],
      };
      const exampleResponse = {
        list: [
          {
            direct_item_id: 801931707,
            main_shop_id: 223009453,
            main_item_id: 843997552,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getMainItemList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_main_item_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMartItemByOutletItemId", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        outlet_item_id: 123,
      };
      const exampleResponse = {
        item_mapping_list: [
          {
            mart_item_id: 123,
            outlet_item_id: 123,
            model_mapping: [
              {
                mart_model_id: 123,
                outlet_model_id: 123,
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

      const result = await manager.getMartItemByOutletItemId(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_mart_item_by_outlet_item_id",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getMartItemMappingById", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        mart_item_id: 123,
        outlet_shop_id_list: [123],
      };
      const exampleResponse = {
        item_mapping_list: [
          {
            mart_item_id: 123,
            outlet_item_id: 123,
            model_mapping: [
              {
                mart_model_id: 123,
                outlet_model_id: 123,
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

      const result = await manager.getMartItemMappingById(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_mart_item_mapping_by_id",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getModelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 178312,
      };
      const exampleResponse = {
        tier_variation: [
          {
            option_list: [
              {
                option: "testsku1",
                image: {
                  image_id: "test_string",
                  image_url: "test_string",
                },
              },
            ],
            name: "test_string",
          },
        ],
        model: [
          {
            price_info: [
              {
                currency: "TWD",
                current_price: 100,
                original_price: 100,
                inflated_price_of_original_price: 100,
                inflated_price_of_current_price: 100,
                sip_item_price: 100,
                sip_item_price_source: "manual",
                sip_item_price_currency: "CNY",
                local_price: 122.02,
                local_promotion_price: 122.02,
              },
            ],
            model_id: 2000458802,
            tier_index: [0, 1],
            promotion_id: "0",
            has_promotion: true,
            model_sku: "blue bag",
            model_status: "MODEL_NORMAL",
            pre_order: {
              is_pre_order: false,
              days_to_ship: 3,
            },
            stock_info_v2: {
              summary_info: {
                total_reserved_stock: 123,
                total_available_stock: 123,
              },
              seller_stock: [
                {
                  location_id: "test_string",
                  stock: 123,
                  if_saleable: true,
                },
              ],
              shopee_stock: [
                {
                  location_id: "test_string",
                  stock: "test_string",
                },
              ],
              advance_stock: {
                sellable_advance_stock: 123,
                in_transit_advance_stock: 123,
              },
            },
            gtin_code: "test_string",
            weight: '"1.1"',
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
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

      const result = await manager.getModelList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_model_list",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getProductCertificationRule", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        attribute_list: [
          {
            attribute_id: 5357,
            attribute_value_list: [
              {
                value_id: 38173,
                original_value_name: "Red",
                value_unit: "kg",
              },
            ],
          },
        ],
        category_id: 123,
      };
      const exampleResponse = {
        certification_rule_list: [
          {
            certification_type: 3,
            is_mandatory: true,
            permit_id: 123,
            name: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getProductCertificationRule(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_product_certification_rule",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getRecommendAttribute", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_name: "Ipone11",
        cover_image_id: 123,
        category_id: 14695,
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

      const result = await manager.getRecommendAttribute(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_recommend_attribute",
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
      };
      const exampleResponse = {
        size_chart_id: 700024639,
        size_chart_name: "T shirt",
        size_chart_table: {
          column_list: [
            {
              measurement: {
                input_type: "Input Range Number",
                display_name: "weight",
                unit: "kg",
              },
              measurement_value_list: [
                {
                  value: 50.5,
                  min_value: 52.5,
                  max_value: 52.5,
                  option: "M",
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

      const result = await manager.getSizeChartDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_size_chart_detail",
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
        category_id: "100087",
        page_size: "10",
        cursor: "1683255510",
      };
      const exampleResponse = {
        size_chart_list: [
          {
            size_chart_id: "123456",
          },
        ],
        total_count: "10",
        next_cursor: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getSizeChartList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_size_chart_list",
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
        data: {
          standardise_variation_list: [
            {
              variation_id: 123,
              variation_name: "Color",
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
        },
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVariations(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_variation_tree",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getVehicleListByCompatibilityDetail", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        compatibility_details: "Brand",
        brand_id: 1234,
        model_id: 2345,
        year_id: 3456,
        language: "pt-br",
      };
      const exampleResponse = {
        vehicle_list: [
          {
            brand_id: 1234,
            brand_name: "Toyota",
            model_id: 2345,
            model_name: "Etios",
            year_id: 3456,
            year_name: "2023",
            version_id: 4567,
            version_name: "1.0",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getVehicleListByCompatibilityDetail(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_vehicle_list_by_compatibility_detail",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("getWeightRecommendation", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_name: "paper",
        cover_image_id: "e9a76cf159c3e7f12510a7017e120467",
        category_id: 100061,
        attribute_list: [
          {
            attribute_id: 100019,
            attribute_value_list: [
              {
                value_id: 1009,
                original_value_name: "value",
                value_unit: "kg",
              },
            ],
          },
        ],
        brand_id: 100021,
        description_type: "extended",
        description: "test_string",
        description_info: {
          extended_description: {
            field_list: [
              {
                field_type: "text",
                text: "desc text",
                image_info: {
                  image_id: "564d29618a333337fa1798f20476c4f5",
                },
              },
            ],
          },
        },
      };
      const exampleResponse = {
        normal_weight_range: [0.1, 0.5],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.getWeightRecommendation(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/get_weight_recommendation",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("initTierVariation", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1000,
        model: [
          {
            tier_index: "0",
            original_price: 38.3,
            model_sku: "SKU",
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
            gtin_code: "test_string",
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
            pre_order: {
              is_pre_order: false,
              days_to_ship: 2,
            },
          },
        ],
        standardise_tier_variation: [
          {
            variation_id: 1,
            variation_name: "name1",
            variation_group_id: 2,
            variation_option_list: [
              {
                variation_option_id: 123,
                variation_option_name: "option2",
                image_id: "82becb4830bd2ee90ad6acf8a9dc26d7",
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        item_id: 1234,
        tier_variation: [
          {
            name: "Color",
            option_list: [
              {
                image: {
                  image_url: "https://cf.shopee.sg/file/82becb4830bd2ee90ad6acf8a9dc26d7",
                },
                option: "Red",
              },
            ],
          },
        ],
        model: [
          {
            tier_index: ["test_string"],
            model_id: 3813,
            model_sku: "SKU",
            price_info: [
              {
                original_price: 123,
              },
            ],
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
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

      const result = await manager.initTierVariation(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/init_tier_variation",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("registerBrand", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        original_brand_name: "Nike",
        category_list: [16521, 16522],
        product_image: {
          image_id_list: ["test_string"],
        },
        app_logo_image_id: "6373157f9408b42c8aacda1d63d3a209",
        brand_website: "www.nike.com",
        brand_description:
          "Our mission is what drives us to do everything possible to expand human potential. We do that by creating groundbreaking sport innovations, by making our products more sustainably, by building a creative and diverse global team and by making a positive impact in communities where we live and work",
        additional_information: "additional notes or comment can seller can add",
        pc_logo_image_id: "6373157f9408b42c8aacda1d63d3a209",
        brand_region: "US",
        licenses: [
          {
            file_name: "image.jpg",
            file_hash: "6373157f9408b42c8aacda1d63d3a209",
          },
        ],
        brand_registration_website:
          "https://www.jumbomark.com/indonesia/trademark-registration/mischief-DID2019017755",
      };
      const exampleResponse = {
        brand_id: 123,
        original_brand_name: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.registerBrand(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/register_brand",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("replyComment", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        comment_list: [
          {
            comment_id: 1540927,
            comment: "Your smile is the direction of our efforts, welcome to your next visit！",
          },
        ],
      };
      const exampleResponse = {
        result_list: [
          {
            comment_id: 1540927,
            fail_error: "product.error_not_exist",
            fail_message: "The Comment you replied does not exist.",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.replyComment(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/reply_comment",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("searchAttributeValueList", () => {
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

      const result = await manager.searchAttributeValueList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/search_attribute_value_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("searchItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        offset: "0",
        page_size: 10,
        item_name: "apple",
        attribute_status: 2,
        item_sku: "sku",
        item_status: "NORMAL",
        deboost_only: true,
      };
      const exampleResponse = {
        item_id_list: [123],
        total_count: 123,
        next_offset: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.searchItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/search_item",
        expect.objectContaining({
          method: "GET",
          auth: true,
          params: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("searchUnpackagedModelList", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        page_size: 2,
        cursor: "test_string",
        item_id: 123,
        item_name: "JIT",
        model_id: 123,
        unpackaged_sku_id: "test_string",
      };
      const exampleResponse = {
        total_count: 123,
        next_cursor: "test_string",
        model_list: [
          {
            item_id: 123,
            item_name: "test_string",
            model_id: 123,
            unpackaged_sku_id: "test_string",
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.searchUnpackagedModelList(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/search_unpackaged_model_list",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("unlistItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_list: [
          {
            item_id: 2300069665,
            unlist: true,
          },
        ],
      };
      const exampleResponse = {
        failure_list: [
          {
            item_id: 2300069665,
            failed_reason: "Can't unlist item when item is under promotion",
          },
        ],
        success_list: [
          {
            item_id: 2400143710,
            unlist: false,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.unlistItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/unlist_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        description: "Hello product product WlQPdMV4SlVoG7QD1v0fEecNoCVEBNx6",
        weight: 0.9,
        pre_order: {
          days_to_ship: 7,
          is_pre_order: false,
        },
        item_name: "Hello Pgkk50jdNgEnlWvX",
        attribute_list: [
          {
            attribute_id: 5357,
            attribute_value_list: [
              {
                value_id: 38173,
                original_value_name: "Red",
                value_unit: "kg",
              },
            ],
          },
        ],
        image: {
          image_id_list: ["test_string"],
          image_ratio: "3:4",
        },
        item_sku: "abc",
        item_status: "UNLIST",
        wholesale: [
          {
            min_count: 0,
            unit_price: 9.9,
            max_count: 10,
          },
        ],
        item_id: 28001430,
        category_id: 34106,
        dimension: {
          package_height: 13,
          package_length: 12,
          package_width: 14,
        },
        condition: "USED",
        video_upload_id: ["sg_f4bde9bc-ff3c-485e-a6dd-3161dab4b942_000000"],
        brand: {
          brand_id: 0,
          original_brand_name: "nike",
        },
        item_dangerous: 0,
        tax_info: {
          ncm: "test_string",
          same_state_cfop: "test_string",
          diff_state_cfop: "test_string",
          csosn: "test_string",
          origin: "test_string",
          cest: "test_string",
          measure_unit: "test_string",
          invoice_option: "test_string",
          vat_rate: "test_string",
          hs_code: "test_string",
          tax_code: "test_string",
          tax_type: 123,
          pis: "test_string",
          cofins: "test_string",
          icms_cst: "test_string",
          pis_cofins_cst: "test_string",
          federal_state_taxes: "test_string",
          operation_type: "test_string",
          ex_tipi: "test_string",
          fci_num: "test_string",
          recopi_num: "test_string",
          additional_info: "test_string",
          group_item_info: {
            group_qtd: "test_string",
            group_unit: "test_string",
            group_unit_value: "test_string",
            original_group_price: "test_string",
            group_gtin_sscc: "test_string",
            group_grai_gtin_sscc: "test_string",
          },
          export_cfop: "test_string",
        },
        complaint_policy: {
          warranty_time: "test_string",
          exclude_entrepreneur_warranty: true,
          complaint_address_id: 123,
          additional_information: "test_string",
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
        description_type: "test_string",
        gtin_code: "test_string",
        ds_cat_rcmd_id: "test_string",
        promotion_images: {
          image_id_list: ["test_string"],
        },
        compatibility_info: {
          vehicle_info_list: [
            {
              brand_id: 1234,
              model_id: 2345,
              year_id: 3456,
              version_id: 4567,
            },
          ],
        },
        scheduled_publish_time: 1733590920,
        authorised_brand_id: 123,
        size_chart_info: {
          size_chart: "test_string",
          size_chart_id: 123,
        },
        certification_info: {
          certification_list: [
            {
              certification_no: "test_string",
              permit_id: 123,
              expiry_date: 1610000000,
              certification_proofs: {
                image_id: "test_string",
                file_name: "test_string",
                ratio: 123,
              },
            },
          ],
        },
        purchase_limit_info: {
          min_purchase_limit: 123,
          max_purchase_limit: {
            purchase_limit: 123,
          },
        },
        medicine_id: 123,
      };
      const exampleResponse = {
        description: "Hello product product 6xnhI3ug5D2rFpH3QoJSNNOrfUSP8rw5",
        weight: 0.9,
        pre_order: {
          days_to_ship: 2,
          is_pre_order: false,
        },
        item_name: "Hello QdlHimD4nto0OGIQ",
        item_status: "UNLIST",
        images: {
          image_id_list: ["test_string"],
          image_url_list: ["test_string"],
        },
        logistic_info: [
          {
            estimated_shipping_fee: 1.49,
            logistic_name: "Ninja Van",
            enabled: true,
            logistic_id: 10007,
            is_free: false,
          },
        ],
        item_id: 28001430,
        category_id: 34106,
        dimension: {
          package_width: 14,
          package_length: 12,
          package_height: 13,
        },
        condition: "USED",
        brand: {
          brand_id: 0,
          original_brand_name: "nike",
        },
        item_dangerous: 0,
        complaint_policy: {
          warranty_time: "test_string",
          exclude_entrepreneur_warranty: true,
          additional_information: "test_string",
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
        description_type: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateKitItem", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 28001430,
        item_setting: {
          item_name: "item name sample",
          images: {
            image_id_list: ["test_string"],
          },
          long_images: {
            image_id_list: ["test_string"],
          },
          video_upload_id: ["sg_f4bde9bc-ff3c-485e-a6dd-3161dab4b942_000000"],
          description: "item description sample",
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
          description_type: "extended",
          logistic_info: [
            {
              logistic_id: 123,
              enabled: true,
              shipping_fee: 123,
              size_id: 123,
              is_free: true,
            },
          ],
          unlisted: false,
          item_sku: "item sku sample",
          weight: 1.1,
          dimension: {
            package_length: 11,
            package_width: 11,
            package_height: 11,
          },
          pre_order: {
            is_pre_order: false,
            days_to_ship: 10,
          },
          model_list: [
            {
              model_id: 1002066586922,
              tier_index: [2],
              model_sku: "model sku sample",
              original_price: 38.3,
              component_list: [
                {
                  component_item_id: 892568916,
                  component_model_id: 8501462426,
                  quantity: 2,
                  main_component: false,
                },
              ],
            },
          ],
          tier_variation_list: [
            {
              name: "test_string",
              option_list: [
                {
                  option: "test_string",
                  image: {
                    image_id: "test_string",
                  },
                },
              ],
            },
          ],
        },
        sync_setting: {
          auto_sync_dts: true,
        },
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

      const result = await manager.updateKitItem(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_kit_item",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateModel", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1000,
        model: [
          {
            model_id: 1625698439,
            model_sku: "abc",
            pre_order: {
              is_pre_order: false,
              days_to_ship: 3,
            },
            gtin_code: "test_string",
            model_status: "test_string",
            weight: 1.1,
            dimension: {
              package_height: 11,
              package_length: 11,
              package_width: 11,
            },
          },
        ],
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

      const result = await manager.updateModel(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_model",
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
        item_id: 1000,
        price_list: [
          {
            model_id: 123,
            original_price: 123,
          },
        ],
      };
      const exampleResponse = {
        failure_list: [
          {
            model_id: 123,
            failed_reason: "test_string",
          },
        ],
        success_list: [
          {
            model_id: 123,
            original_price: 123,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updatePrice(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_price",
        expect.objectContaining({
          method: "POST",
          auth: true,
          body: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });

  describe("updateSipItemPrice", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = {
        item_id: 1000,
        sip_item_price: [
          {
            model_id: 123,
            sip_item_price: 123,
          },
        ],
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

      const result = await manager.updateSipItemPrice(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_sip_item_price",
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
        item_id: 1000,
        stock_list: [
          {
            model_id: 123,
            seller_stock: [
              {
                location_id: "test_string",
                stock: 123,
              },
            ],
          },
        ],
      };
      const exampleResponse = {
        failure_list: [
          {
            model_id: 123,
            failed_reason: "test_string",
          },
        ],
        success_list: [
          {
            model_id: 123,
            location_id: "test_string",
            stock: 123,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateStock(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_stock",
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
        item_id: 1000,
        model_list: [
          {
            model_id: 1002066586922,
            tier_index: [1, 1],
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
        request_id: "test_string",
      };

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.updateTierVariation(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "/product/update_tier_variation",
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
