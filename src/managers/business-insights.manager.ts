// NOTE: This file is auto-generated. Do not edit directly.

import {
  GetMarketingHotListingRequest,
  GetMarketingHotListingResponse,
} from "../schemas/business-insights.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class BusinessInsightsManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Provide all metrics currently available on the Business Insights Buybox dashboard, including metrics not explicitly requested by Local (for example, CTR), covering both:Shop-level performanceProduct-level performance
   *
   * @param {GetMarketingHotListingRequest} params Request parameters
   * @returns {Promise<GetMarketingHotListingResponse>} Promise resolving to the response
   */
  public async getMarketingHotListing(
    params?: GetMarketingHotListingRequest
  ): Promise<GetMarketingHotListingResponse> {
    return ShopeeFetch.fetch<GetMarketingHotListingResponse>(
      this.config,
      "/business_insights/get_marketing_hot_listing",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
