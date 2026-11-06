export * from "./access-token.js";
export * from "./authed-merchant.js";
export * from "./authed-shop.js";
export * from "./fetch.js";
export * from "./order.js";
export * from "./product.js";
export * from "./public.js";
export * from "./push.js";
export * from "./region.js";
export * from "./ads.js";
export * from "./merchant.js";
export * from "./shop.js";
export * from "./bundle-deal.js";
export * from "./add-on-deal.js";
export * from "./top-picks.js";
export * from "./fbs.js";
export * from "./principal.js";
// The following schemas export conflicting types (such as Item, Model, Order, Status, ResponseOptionalFields), so they are not exported from the main index.
// Import them directly from their respective files when needed:
// export * from "./first-mile.js";
// export * from "./account-health.js";
// export * from "./discount.js";
// export * from "./follow-prize.js";
// export * from "./shop-category.js";
// export * from "./ams.js";
// export * from "./global-product.js";
// export * from "./shop-flash-sale.js";
// export * from "./returns.js";
// export * from "./media.js";
// export * from "./media-space.js";

// Modules whose type names overlap with the flat exports above are available as namespaces,
// e.g. `import { Discount } from "@congminh1254/shopee-sdk/schemas"; type R = Discount.AddDiscountRequest;`
export * as AccountHealth from "./account-health.js";
export * as Ams from "./ams.js";
export * as BusinessInsights from "./business-insights.js";
export * as Buybox from "./buybox.js";
export * as Discount from "./discount.js";
export * as FirstMile from "./first-mile.js";
export * as FollowPrize from "./follow-prize.js";
export * as GlobalProduct from "./global-product.js";
export * as Installation from "./installation.js";
export * as LiveStream from "./livestream.js";
export * as Logistics from "./logistics.js";
export * as Media from "./media.js";
export * as MediaSpace from "./media-space.js";
export * as Payment from "./payment.js";
export * as Returns from "./returns.js";
export * as Sbs from "./sbs.js";
export * as ShopCategory from "./shop-category.js";
export * as ShopFlashSale from "./shop-flash-sale.js";
export * as Video from "./video.js";
export * as Voucher from "./voucher.js";
