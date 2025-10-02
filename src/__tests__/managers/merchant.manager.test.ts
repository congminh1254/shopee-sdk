import { jest } from "@jest/globals";
import { MerchantManager } from "../../managers/merchant.manager.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ShopeeFetch } from "../../fetch.js";
import {
  GetMerchantInfoResponse,
  GetMerchantPrepaidAccountListResponse,
  GetMerchantWarehouseListResponse,
  GetMerchantWarehouseLocationListResponse,
  GetShopListByMerchantResponse,
  GetWarehouseEligibleShopListResponse,
} from "../../schemas/merchant.js";

// Mock ShopeeFetch.fetch static method
const mockFetch = jest.fn();
ShopeeFetch.fetch = mockFetch;

describe("MerchantManager", () => {
  let merchantManager: MerchantManager;
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

    merchantManager = new MerchantManager(mockConfig);
  });

  describe("getMerchantInfo", () => {
    it("should get merchant information", async () => {
      const mockResponse: GetMerchantInfoResponse = {
        request_id: "4022b2fcf376045bba533b504e02476a",
        error: "",
        message: "",
        merchant_name: "CNSC Company 7",
        is_cnsc: true,
        auth_time: 1650624369,
        expire_time: 1682179199,
        merchant_currency: "CNY",
        merchant_region: "CN",
        is_upgraded_cbsc: true,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getMerchantInfo();

      expect(mockShopeeFetch).toHaveBeenCalledWith(mockConfig, "/merchant/get_merchant_info", {
        method: "GET",
        auth: true,
        params: undefined,
      });

      expect(result).toEqual(mockResponse);
      expect(result.merchant_name).toBe("CNSC Company 7");
      expect(result.merchant_region).toBe("CN");
      expect(result.is_upgraded_cbsc).toBe(true);
    });
  });

  describe("getMerchantPrepaidAccountList", () => {
    it("should get merchant prepaid account list", async () => {
      const mockResponse: GetMerchantPrepaidAccountListResponse = {
        request_id: "77d031430cb946209c877fef646be9f5",
        error: "",
        message: "",
        response: {
          list: [
            {
              prepaid_account_id: 19,
              prepaid_account_courier_key: "jd",
              prepaid_account_courier_name: "京东快递",
              prepaid_account_is_default: true,
              prepaid_account_partner_id: "020K3075414",
              prepaid_account_partner_code: "",
              prepaid_account_partner_name: "",
              prepaid_account_partner_net: "",
              prepaid_account_check_man: "",
            },
            {
              prepaid_account_id: 139,
              prepaid_account_courier_key: "shunfeng",
              prepaid_account_courier_name: "顺丰（丰密面单）",
              prepaid_account_is_default: false,
              prepaid_account_partner_id: "qingqiang test",
              prepaid_account_partner_code: "qingqiang test",
              prepaid_account_partner_key: "***********est",
              prepaid_account_partner_name: "",
              prepaid_account_partner_net: "",
              prepaid_account_partner_secret: "***********est",
              prepaid_account_check_man: "",
            },
          ],
          more: false,
          total: 2,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getMerchantPrepaidAccountList({
        page_no: 1,
        page_size: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_prepaid_account_list",
        {
          method: "POST",
          auth: true,
          body: {
            page_no: 1,
            page_size: 100,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.list).toHaveLength(2);
      expect(result.response?.list[0].prepaid_account_is_default).toBe(true);
      expect(result.response?.total).toBe(2);
    });
  });

  describe("getMerchantWarehouseList", () => {
    it("should get merchant warehouse list", async () => {
      const mockResponse: GetMerchantWarehouseListResponse = {
        request_id: "9b73908eb0237c86670147a8883b7210",
        error: "",
        message: "",
        response: {
          warehouse_list: [
            {
              warehouse_id: 10001027,
              warehouse_name: "MX Warehouse 1",
              warehouse_region: "MX",
              warehouse_type: 1,
              location_id: "MX1004MQZ",
              address: {
                address: "Calle Becal, MZ28 LT23, test",
                address_name: "mx tester",
                city: "Tlalpan",
                district: "Ciudad de México",
                region: "MX",
                state: "Ciudad de México",
                town: "Lomas de Padierna",
                zip_code: "14240",
              },
              enterprise_info: null,
            },
            {
              warehouse_id: 10001024,
              warehouse_name: "BR Warehouse 1",
              warehouse_region: "BR",
              warehouse_type: 1,
              location_id: "BR1004MQZ",
              address: {
                address: "Rodovia Raposo Tavares, 001",
                address_name: "xinjian chen",
                city: "Sorocaba",
                district: "Parque Reserva Fazenda Imperial",
                region: "BR",
                state: "São Paulo",
                town: "",
                zip_code: "18052775",
              },
              enterprise_info: {
                cnpj: "52069476000182",
                company_name: "J.filho Comercio Atacado e Var",
                is_freight_payer: true,
                state_registration_number: "798873714116",
              },
            },
          ],
          cursor: {
            next_id: null,
            page_size: 30,
            prev_id: null,
          },
          total_count: 2,
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getMerchantWarehouseList({
        cursor: {
          next_id: 0,
          page_size: 30,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_warehouse_list",
        {
          method: "POST",
          auth: true,
          body: {
            cursor: {
              next_id: 0,
              page_size: 30,
            },
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.warehouse_list).toHaveLength(2);
      expect(result.response?.warehouse_list[0].warehouse_name).toBe("MX Warehouse 1");
      expect(result.response?.warehouse_list[1].enterprise_info?.cnpj).toBe("52069476000182");
      expect(result.response?.total_count).toBe(2);
    });
  });

  describe("getMerchantWarehouseLocationList", () => {
    it("should get merchant warehouse location list", async () => {
      const mockResponse: GetMerchantWarehouseLocationListResponse = {
        request_id: "7131251eb8519f10dd18e03167a42d71",
        error: "",
        message: "",
        response: [
          {
            location_id: "CNZ",
            warehouse_name: "warehouse1",
          },
          {
            location_id: "USZ",
            warehouse_name: "warehouse2",
          },
        ],
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getMerchantWarehouseLocationList();

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_merchant_warehouse_location_list",
        {
          method: "GET",
          auth: true,
          params: undefined,
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response).toHaveLength(2);
      expect(result.response?.[0].location_id).toBe("CNZ");
      expect(result.response?.[1].warehouse_name).toBe("warehouse2");
    });
  });

  describe("getShopListByMerchant", () => {
    it("should get shop list bound to merchant", async () => {
      const mockResponse: GetShopListByMerchantResponse = {
        request_id: "nGwxMqhTRqgbpfmNlbvgcTZEenLPmyyo",
        error: "",
        message: "",
        is_cnsc: true,
        shop_list: [
          {
            shop_id: 601306294,
          },
          {
            shop_id: 601306295,
            sip_affi_shops: [
              {
                affi_shop_id: 123456,
              },
              {
                affi_shop_id: 789012,
              },
            ],
          },
        ],
        more: false,
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getShopListByMerchant({
        page_no: 1,
        page_size: 100,
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_shop_list_by_merchant",
        {
          method: "GET",
          auth: true,
          params: {
            page_no: 1,
            page_size: 100,
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.shop_list).toHaveLength(2);
      expect(result.shop_list[0].shop_id).toBe(601306294);
      expect(result.shop_list[1].sip_affi_shops).toHaveLength(2);
      expect(result.is_cnsc).toBe(true);
      expect(result.more).toBe(false);
    });
  });

  describe("getWarehouseEligibleShopList", () => {
    it("should get eligible shop list by warehouse id", async () => {
      const mockResponse: GetWarehouseEligibleShopListResponse = {
        request_id: "94bec7620823b3e78ed50fa6c8ec8381",
        error: "",
        message: "",
        response: {
          shop_list: [
            {
              shop_id: 222859294,
              shop_name: "test_shop11",
            },
            {
              shop_id: 222859295,
              shop_name: "test_shop12",
            },
            {
              shop_id: 222859296,
              shop_name: "test_shop13",
            },
            {
              shop_id: 222859324,
              shop_name: "test_shop14",
            },
          ],
          cursor: {
            next_id: 222859324,
            page_size: 4,
            prev_id: null,
          },
        },
      };

      mockShopeeFetch.mockResolvedValue(mockResponse);

      const result = await merchantManager.getWarehouseEligibleShopList({
        warehouse_id: 10001027,
        warehouse_type: 1,
        cursor: {
          next_id: 0,
          page_size: 4,
        },
      });

      expect(mockShopeeFetch).toHaveBeenCalledWith(
        mockConfig,
        "/merchant/get_warehouse_eligible_shop_list",
        {
          method: "POST",
          auth: true,
          body: {
            warehouse_id: 10001027,
            warehouse_type: 1,
            cursor: {
              next_id: 0,
              page_size: 4,
            },
          },
        }
      );

      expect(result).toEqual(mockResponse);
      expect(result.response?.shop_list).toHaveLength(4);
      expect(result.response?.shop_list[0].shop_name).toBe("test_shop11");
      expect(result.response?.cursor.next_id).toBe(222859324);
    });
  });
});
