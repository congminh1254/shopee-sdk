export enum ShopeeRegion {
  GLOBAL = "GLOBAL",
  CHINA = "CHINA",
  BRAZIL = "BRAZIL",
  TEST_GLOBAL = "TEST_GLOBAL",
  TEST_CHINA = "TEST_CHINA",
}

export const SHOPEE_BASE_URLS = {
  [ShopeeRegion.GLOBAL]: "https://partner.shopeemobile.com/api/v2",
  [ShopeeRegion.CHINA]: "https://openplatform.shopee.cn/api/v2/public",
  [ShopeeRegion.BRAZIL]: "https://openplatform.shopee.com.br/api/v2",
  [ShopeeRegion.TEST_GLOBAL]: "https://partner.test-stable.shopeemobile.com/api/v2",
  [ShopeeRegion.TEST_CHINA]: "https://openplatform.test-stable.shopee.cn/api/v2",
} as const;
