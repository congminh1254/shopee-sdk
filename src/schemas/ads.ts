import { BaseResponse } from "./base.js";

/**
 * Response for the get total balance API
 */
export interface GetTotalBalanceResponse extends BaseResponse {
  response: {
    /** Timestamp indicating when the total balance snapshot was taken */
    data_timestamp: number;
    /** Seller's total ads credit balance, including paid credits and free credits */
    total_balance: number;
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Response for the get shop toggle info API
 */
export interface GetShopToggleInfoResponse extends BaseResponse {
  response: {
    /** Timestamp of data in response */
    data_timestamp: number;
    /** Auto top-up toggle on/off */
    auto_top_up: boolean;
    /** Campaign surge toggle on/off */
    campaign_surge: boolean;
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get recommended keyword list API
 */
export type GetRecommendedKeywordListParams = {
  /** Shopee's unique identifier for an item */
  item_id: number;
  /** The keyword seller typed in the manually add keyword window */
  input_keyword?: string;
};

/**
 * Response for the get recommended keyword list API
 */
export interface GetRecommendedKeywordListResponse extends BaseResponse {
  response: {
    /** Shopee's unique identifier for an item */
    item_id: number;
    /** The keyword seller typed in the manually add keyword window */
    input_keyword?: string;
    /** Suggested keywords recommended from product */
    suggested_keywords: Array<{
      /** Keyword value (Only return the highly recommended keywords, will be sightly different from Seller Center) */
      keyword: string;
      /** This is a measure of how attractive your ad is and its relevance to the keyword. The higher the quality score, the higher your ad rank. Ad rank is based on this score and your bid price. */
      quality_score: number;
      /** The number of times the keyword has been searched on Shopee in the last 30 days. The larger the search volume, the more impressions your ad will receive. */
      search_volume: number;
      /** This is bid price suggested by Shopee algorithm for the keyword in local currency. */
      suggested_bid: number;
    }>;
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Response for the get recommended item list API
 */
export interface GetRecommendedItemListResponse extends BaseResponse {
  response: Array<{
    /** Recommended SKU's item id */
    item_id: number;
    /** This is param to indicate the status of items, so sellers can know whether an item is eligible for ads or not */
    item_status_list: string[];
    /** The corresponding tag (or tags) that belong to item_id, sequences follow as best selling>best ROI>top search */
    sku_tag_list: string[];
    /** Current status of the ad on this item. For example- no ongoing promotion, search ads, discovery ads, boost ads */
    ongoing_ad_type_list: string[];
  }>;
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get all CPC ads hourly performance API
 */
export type GetAllCpcAdsHourlyPerformanceParams = {
  /** Single date on which to check the hourly performance (DD-MM-YYYY format) */
  performance_date: string;
};

/**
 * Response for the get all CPC ads hourly performance API
 */
export interface GetAllCpcAdsHourlyPerformanceResponse extends BaseResponse {
  response: Array<{
    /** Hour the performance record belongs to */
    hour: number;
    /** Date the performance record belongs to (DD-MM-YYYY format) */
    date: string;
    /** Number of times buyers see ads */
    impression: number;
    /** Total number of clicks on the Ad */
    clicks: number;
    /** Click-through rate (Clicks / Impressions) */
    ctr: number;
    /** Direct conversions - buyer placed an order within 7 days after clicking on the ads (item gets purchased from the clicked ads) */
    direct_order: number;
    /** Broad conversions - buyer placed an order within 7 days after clicking on the ads (any item from the same shop) */
    broad_order: number;
    /** Direct conversion rate (Ad orders / total clicks) - item gets purchased from the clicked ads */
    direct_conversions: number;
    /** Broad conversion rate (Ad orders / total clicks) - any item from the same shop gets purchased */
    broad_conversions: number;
    /** Items sold within 7 days after clicking on the ads (item gets purchased from the clicked ads) */
    direct_item_sold: number;
    /** Items sold within 7 days after clicking on the ads (any item from the same shop) */
    broad_item_sold: number;
    /** Total direct sales generated from ads over a 7-day window (item gets purchased from the clicked ads) */
    direct_gmv: number;
    /** Total broad sales generated from ads over a 7-day window (any item from the same shop) */
    broad_gmv: number;
    /** Ad expenditure */
    expense: number;
    /** Cost per conversion - ad's average cost per sales conversion */
    cost_per_conversion: number;
    /** Direct ROAS - Ad GMV/Ad Expenditure (item gets purchased from the clicked ads) */
    direct_roas: number;
    /** Broad ROAS - Ad GMV/Ad Expenditure (any item from the same shop gets purchased) */
    broad_roas: number;
  }>;
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get all CPC ads daily performance API
 */
export type GetAllCpcAdsDailyPerformanceParams = {
  /** Start date of the performance data range (DD-MM-YYYY format) */
  start_date: string;
  /** End date of the performance data range (DD-MM-YYYY format) */
  end_date: string;
};

/**
 * Response for the get all CPC ads daily performance API
 */
export interface GetAllCpcAdsDailyPerformanceResponse extends BaseResponse {
  response: Array<{
    /** Date the performance record belongs to (DD-MM-YYYY format) */
    date: string;
    /** Number of times buyers see ads */
    impression: number;
    /** Total number of clicks on the Ad */
    clicks: number;
    /** Click-through rate (Clicks / Impressions) */
    ctr: number;
    /** Direct conversions - buyer placed an order within 7 days after clicking on the ads (item gets purchased from the clicked ads) */
    direct_order: number;
    /** Broad conversions - buyer placed an order within 7 days after clicking on the ads (any item from the same shop) */
    broad_order: number;
    /** Direct conversion rate (Ad orders / total clicks) - item gets purchased from the clicked ads */
    direct_conversions: number;
    /** Broad conversion rate (Ad orders / total clicks) - any item from the same shop gets purchased */
    broad_conversions: number;
    /** Items sold within 7 days after clicking on the ads (item gets purchased from the clicked ads) */
    direct_item_sold: number;
    /** Items sold within 7 days after clicking on the ads (any item from the same shop) */
    broad_item_sold: number;
    /** Total direct sales generated from ads over a 7-day window (item gets purchased from the clicked ads) */
    direct_gmv: number;
    /** Total broad sales generated from ads over a 7-day window (any item from the same shop) */
    broad_gmv: number;
    /** Ad expenditure */
    expense: number;
    /** Cost per conversion - ad's average cost per sales conversion */
    cost_per_conversion: number;
    /** Direct ROAS - Ad GMV/Ad Expenditure (item gets purchased from the clicked ads) */
    direct_roas: number;
    /** Broad ROAS - Ad GMV/Ad Expenditure (any item from the same shop gets purchased) */
    broad_roas: number;
  }>;
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get product campaign daily performance API
 */
export type GetProductCampaignDailyPerformanceParams = {
  /** Start date of the performance data range (DD-MM-YYYY format) */
  start_date: string;
  /** End date of the performance data range (DD-MM-YYYY format) */
  end_date: string;
  /** Comma-separated list of campaign IDs to fetch performance for (max 100) */
  campaign_id_list: string;
};

/**
 * Response for the get product campaign daily performance API
 */
export interface GetProductCampaignDailyPerformanceResponse extends BaseResponse {
  response: Array<{
    /** The unique ID for the shop */
    shop_id: number;
    /** The region where the shop is located */
    region: string;
    /** List of campaigns and their performance data */
    campaign_list: Array<{
      /** The unique ID for the campaign */
      campaign_id: number;
      /** The ad type (auto or manual) */
      ad_type: string;
      /** The campaign placement (search, discovery, or all) */
      campaign_placement: string;
      /** The name of the ad */
      ad_name: string;
      /** List of daily performance metrics for the campaign */
      metrics_list: Array<{
        /** Date of the performance record (DD-MM-YYYY format) */
        date: string;
        /** Number of times shoppers see the ad */
        impression: number;
        /** Number of times shoppers click on the ad */
        clicks: number;
        /** Click-through rate (clicks ÷ impressions × 100%) */
        ctr: number;
        /** Amount spent on the ad */
        expense: number;
        /** Sales revenue generated from any product purchase within 7 days of ad click */
        broad_gmv: number;
        /** Number of orders placed within 7 days of ad click */
        broad_order: number;
        /** Total quantity of products purchased within 7 days of ad click */
        broad_order_amount: number;
        /** Broad return on ad spend (broad_gmv ÷ expense) */
        broad_roi: number;
        /** Broad advertising cost of sales (expense ÷ broad_gmv × 100%) */
        broad_cir: number;
        /** Conversion rate (conversions ÷ clicks × 100%) */
        cr: number;
        /** Cost per conversion (expense ÷ conversions) */
        cpc: number;
        /** Number of orders for the advertised product within 7 days of ad click */
        direct_order: number;
        /** Total quantity of the advertised product purchased within 7 days of ad click */
        direct_order_amount: number;
        /** Sales revenue generated from the advertised product within 7 days of ad click */
        direct_gmv: number;
        /** Direct return on ad spend (direct_gmv ÷ expense) */
        direct_roi: number;
        /** Direct advertising cost of sales (expense ÷ direct_gmv × 100%) */
        direct_cir: number;
        /** Direct conversion rate (direct conversions ÷ clicks × 100%) */
        direct_cr: number;
        /** Cost per direct conversion (expense ÷ direct conversions) */
        cpdc: number;
      }>;
    }>;
  }>;
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get product campaign hourly performance API
 */
export type GetProductCampaignHourlyPerformanceParams = {
  /** Single date for the hourly performance data (DD-MM-YYYY format) */
  performance_date: string;
  /** Comma-separated list of campaign IDs to fetch performance for (max 100) */
  campaign_id_list: string;
};

/**
 * Response for the get product campaign hourly performance API
 */
export interface GetProductCampaignHourlyPerformanceResponse extends BaseResponse {
  response: Array<{
    /** The unique ID for the shop */
    shop_id: number;
    /** The region where the shop is located */
    region: string;
    /** List of campaigns and their performance data */
    campaign_list: Array<{
      /** The unique ID for the campaign */
      campaign_id: number;
      /** The ad type (auto or manual) */
      ad_type: string;
      /** The campaign placement (search, discovery, or all) */
      campaign_placement: string;
      /** The name of the ad */
      ad_name: string;
      /** List of hourly performance metrics for the campaign */
      metrics_list: Array<{
        /** Hour the performance record belongs to */
        hour: number;
        /** Date of the performance record (DD-MM-YYYY format) */
        date: string;
        /** Number of times shoppers see the ad */
        impression: number;
        /** Number of times shoppers click on the ad */
        clicks: number;
        /** Click-through rate (clicks ÷ impressions × 100%) */
        ctr: number;
        /** Amount spent on the ad */
        expense: number;
        /** Sales revenue generated from any product purchase within 7 days of ad click */
        broad_gmv: number;
        /** Number of orders placed within 7 days of ad click */
        broad_order: number;
        /** Total quantity of products purchased within 7 days of ad click */
        broad_order_amount: number;
        /** Broad return on ad spend (broad_gmv ÷ expense) */
        broad_roi: number;
        /** Broad advertising cost of sales (expense ÷ broad_gmv × 100%) */
        broad_cir: number;
        /** Conversion rate (conversions ÷ clicks × 100%) */
        cr: number;
        /** Cost per conversion (expense ÷ conversions) */
        cpc: number;
        /** Number of orders for the advertised product within 7 days of ad click */
        direct_order: number;
        /** Total quantity of the advertised product purchased within 7 days of ad click */
        direct_order_amount: number;
        /** Sales revenue generated from the advertised product within 7 days of ad click */
        direct_gmv: number;
        /** Direct return on ad spend (direct_gmv ÷ expense) */
        direct_roi: number;
        /** Direct advertising cost of sales (expense ÷ direct_gmv × 100%) */
        direct_cir: number;
        /** Direct conversion rate (direct conversions ÷ clicks × 100%) */
        direct_cr: number;
        /** Cost per direct conversion (expense ÷ direct conversions) */
        cpdc: number;
      }>;
    }>;
  }>;
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get product level campaign ID list API
 */
export type GetProductLevelCampaignIdListParams = {
  /**
   * Filter campaigns by ad type
   * Can be any of ["", "all", "auto", "manual"]
   */
  ad_type?: string;
  /** Pagination offset */
  offset?: number;
  /** Page size limit (number of results to return) */
  limit?: number;
};

/**
 * Response for the get product level campaign ID list API
 */
export interface GetProductLevelCampaignIdListResponse extends BaseResponse {
  response: {
    /** The unique ID for the shop */
    shop_id: number;
    /** The region where the shop is located */
    region: string;
    /** Indicates if there are more campaigns on the next page */
    has_next_page: boolean;
    /** List of campaigns */
    campaign_list: Array<{
      /** The ad type (auto or manual) */
      ad_type: string;
      /** The unique ID for the campaign */
      campaign_id: number;
    }>;
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get product level campaign setting info API
 */
export type GetProductLevelCampaignSettingInfoParams = {
  /**
   * Info types to retrieve, comma-separated
   * 1: Common Info
   * 2: Manual Bidding Info
   * 3: Auto Bidding Info
   * 4: Auto Product Ads Info
   */
  info_type_list: string;
  /** Comma-separated list of campaign IDs to fetch settings for (max 100) */
  campaign_id_list: string;
};

/**
 * Response for the get product level campaign setting info API
 */
export interface GetProductLevelCampaignSettingInfoResponse extends BaseResponse {
  response: {
    /** The unique ID for the shop */
    shop_id: number;
    /** The region where the shop is located */
    region: string;
    /** List of campaigns with their settings */
    campaign_list: Array<{
      /** The unique ID for the campaign */
      campaign_id: number;
      /** Common campaign information (returned if info_type_list includes 1) */
      common_info?: {
        /** The ad type (auto or manual) */
        ad_type: string;
        /** The name of the ad */
        ad_name: string;
        /** Campaign status (ongoing, scheduled, ended, paused, deleted, closed) */
        campaign_status: string;
        /** Bidding method (auto or manual) */
        bidding_method: string;
        /** Campaign placement (search, discovery, or all) */
        campaign_placement: string;
        /** The budget per campaign (0 means unlimited budget) */
        campaign_budget: number;
        /** Campaign duration */
        campaign_duration: {
          /** Campaign start time (Unix timestamp) */
          start_time: number;
          /** Campaign end time (Unix timestamp, 0 means no end date) */
          end_time: number;
        };
        /** List of item IDs in the campaign */
        item_id_list: number[];
      };
      /** Manual bidding information (returned if info_type_list includes 2) */
      manual_bidding_info?: {
        /** Whether Enhanced CPC functionality is enabled */
        enhanced_cpc: boolean;
        /** Selected keywords for search campaigns */
        selected_keywords: Array<{
          /** Bid keyword */
          keyword: string;
          /** Keyword status (deleted, normal, reserved, blacklist) */
          status: string;
          /** Match type (exact or broad) */
          match_type: string;
          /** Bid price per click */
          bid_price_per_click: number;
        }>;
        /** Discovery ads placement settings */
        discovery_ads_locations: Array<{
          /** Location (daily_discover, you_may_also_like) */
          location: string;
          /** Status (active or inactive) */
          status: string;
          /** Bid price */
          bid_price: number;
        }>;
      };
      /** Auto bidding information (returned if info_type_list includes 3) */
      auto_bidding_info?: {
        /** ROAS target for campaigns with auto bidding */
        roas_target: number;
      };
      /** Auto product ads information (returned if info_type_list includes 4) */
      auto_product_ads_info?: Array<{
        /** Product name */
        product_name: string;
        /** Product status (learning, ongoing, paused, ended, unavailable) */
        status: string;
        /** Unique identifier for the product */
        item_id: number;
      }>;
    }>;
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}

/**
 * Parameters for the get product recommended ROI target API
 */
export type GetProductRecommendedRoiTargetParams = {
  /**
   * A random string used to prevent duplicate ads.
   * If an ads is created successfully, subsequent requests using the same reference id will fail.
   * Use the same string for calling suggestion/recommendation API before the actual request to create an ads.
   */
  reference_id: string;
  /** Unique identifier for a product */
  item_id: number;
};

/**
 * Response for the get product recommended ROI target API
 */
export interface GetProductRecommendedRoiTargetResponse extends BaseResponse {
  response: {
    /**
     * Lower bound recommendation.
     * e.g., value=3.5 and percentile=80 mean that setting an ROI target of 3.5
     * makes the ads more competitive than 80% of similar ads.
     */
    lower_bound: {
      /** The ROI target value */
      value: number;
      /** Competitiveness over similar ads */
      percentile: number;
    };
    /**
     * Mid-level recommendation.
     * e.g., value=5.9 and percentile=50 mean that setting an ROI target of 5.9
     * makes the ads more competitive than 50% of similar ads.
     */
    exact: {
      /** The ROI target value */
      value: number;
      /** Competitiveness over similar ads */
      percentile: number;
    };
    /**
     * Higher bound recommendation.
     * e.g., value=10.8 and percentile=20 mean that setting an ROI target of 10.8
     * makes the ads more competitive than 20% of similar ads.
     */
    upper_bound: {
      /** The ROI target value */
      value: number;
      /** Competitiveness over similar ads */
      percentile: number;
    };
  };
  /** Optional warning message if some data cannot be responded normally */
  warning?: string;
}
