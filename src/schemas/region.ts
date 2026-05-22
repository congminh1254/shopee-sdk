export enum ShopeeRegion {
  GLOBAL = "GLOBAL",
  CHINA = "CHINA",
  BRAZIL = "BRAZIL",
  TEST_GLOBAL = "TEST_GLOBAL",
  TEST_CHINA = "TEST_CHINA",
}

export const SHOPEE_BASE_URLS = {
  [ShopeeRegion.GLOBAL]: "https://partner.shopeemobile.com/api/v2",
  [ShopeeRegion.CHINA]: "https://openplatform.shopee.cn/api/v2",
  [ShopeeRegion.BRAZIL]: "https://openplatform.shopee.com.br/api/v2",
  [ShopeeRegion.TEST_GLOBAL]: "https://openplatform.sandbox.test-stable.shopee.sg/api/v2",
  [ShopeeRegion.TEST_CHINA]: "https://openplatform.test-stable.shopee.cn/api/v2",
} as const;

export const SHOPEE_AUTH_URLS = {
  [ShopeeRegion.GLOBAL]: "https://open.shopee.com/auth",
  [ShopeeRegion.CHINA]: "https://open.shopee.cn/auth",
  [ShopeeRegion.BRAZIL]: "https://open.shopee.com.br/auth",
  [ShopeeRegion.TEST_GLOBAL]: "https://open.sandbox.test-stable.shopee.com/auth",
  [ShopeeRegion.TEST_CHINA]: "https://open.sandbox.test-stable.shopee.cn/auth",
};
