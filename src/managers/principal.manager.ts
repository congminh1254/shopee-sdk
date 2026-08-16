import {
  GetClipVideoPerformanceRequest,
  GetClipVideoPerformanceResponse,
  GetContentAffiliatePerformanceRequest,
  GetContentAffiliatePerformanceResponse,
  GetPrincipalAffiliatePerformanceRequest,
  GetPrincipalAffiliatePerformanceResponse,
  GetPrincipalLivestreamPerformanceRequest,
  GetPrincipalLivestreamPerformanceResponse,
  GetPrincipalSalesPerformanceDetailRequest,
  GetPrincipalSalesPerformanceDetailResponse,
  GetPrincipalVideoPerformanceRequest,
  GetPrincipalVideoPerformanceResponse,
  GetSessionLivestreamPerformanceRequest,
  GetSessionLivestreamPerformanceResponse,
  GetShopAffiliatePerformanceRequest,
  GetShopAffiliatePerformanceResponse,
  GetShopLivestreamPerformanceRequest,
  GetShopLivestreamPerformanceResponse,
  GetShopSalesPerformanceDetailRequest,
  GetShopSalesPerformanceDetailResponse,
  GetShopVideoPerformanceRequest,
  GetShopVideoPerformanceResponse,
} from "../schemas/principal.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class PrincipalManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Queries video clip performance data for the specified videos within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and video-level detailed metrics.
   *
   * @param {GetClipVideoPerformanceRequest} params Request parameters
   * @returns {Promise<GetClipVideoPerformanceResponse>} Promise resolving to the response
   */
  public async getClipVideoPerformance(
    params?: GetClipVideoPerformanceRequest
  ): Promise<GetClipVideoPerformanceResponse> {
    return ShopeeFetch.fetch<GetClipVideoPerformanceResponse>(
      this.config,
      "/principal/get_clip_video_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries affiliate performance data for the specified content items within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and content-level detailed metrics with placed-order and confirmed-order views.
   *
   * @param {GetContentAffiliatePerformanceRequest} params Request parameters
   * @returns {Promise<GetContentAffiliatePerformanceResponse>} Promise resolving to the response
   */
  public async getContentAffiliatePerformance(
    params?: GetContentAffiliatePerformanceRequest
  ): Promise<GetContentAffiliatePerformanceResponse> {
    return ShopeeFetch.fetch<GetContentAffiliatePerformanceResponse>(
      this.config,
      "/principal/get_content_affiliate_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries affiliate performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics with placed-order and confirmed-order views.
   *
   * @param {GetPrincipalAffiliatePerformanceRequest} params Request parameters
   * @returns {Promise<GetPrincipalAffiliatePerformanceResponse>} Promise resolving to the response
   */
  public async getPrincipalAffiliatePerformance(
    params?: GetPrincipalAffiliatePerformanceRequest
  ): Promise<GetPrincipalAffiliatePerformanceResponse> {
    return ShopeeFetch.fetch<GetPrincipalAffiliatePerformanceResponse>(
      this.config,
      "/principal/get_principal_affiliate_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries livestream performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
   *
   * @param {GetPrincipalLivestreamPerformanceRequest} params Request parameters
   * @returns {Promise<GetPrincipalLivestreamPerformanceResponse>} Promise resolving to the response
   */
  public async getPrincipalLivestreamPerformance(
    params?: GetPrincipalLivestreamPerformanceRequest
  ): Promise<GetPrincipalLivestreamPerformanceResponse> {
    return ShopeeFetch.fetch<GetPrincipalLivestreamPerformanceResponse>(
      this.config,
      "/principal/get_principal_livestream_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries the business performance data aggregated at principal level for the specified regions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
   *
   * @param {GetPrincipalSalesPerformanceDetailRequest} params Request parameters
   * @returns {Promise<GetPrincipalSalesPerformanceDetailResponse>} Promise resolving to the response
   */
  public async getPrincipalSalesPerformanceDetail(
    params?: GetPrincipalSalesPerformanceDetailRequest
  ): Promise<GetPrincipalSalesPerformanceDetailResponse> {
    return ShopeeFetch.fetch<GetPrincipalSalesPerformanceDetailResponse>(
      this.config,
      "/principal/get_principal_sales_performance_detail",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries video performance data for the specified principal within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and region-level detailed metrics.
   *
   * @param {GetPrincipalVideoPerformanceRequest} params Request parameters
   * @returns {Promise<GetPrincipalVideoPerformanceResponse>} Promise resolving to the response
   */
  public async getPrincipalVideoPerformance(
    params?: GetPrincipalVideoPerformanceRequest
  ): Promise<GetPrincipalVideoPerformanceResponse> {
    return ShopeeFetch.fetch<GetPrincipalVideoPerformanceResponse>(
      this.config,
      "/principal/get_principal_video_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries livestream session performance data for the specified sessions within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and session-level detailed metrics.
   *
   * @param {GetSessionLivestreamPerformanceRequest} params Request parameters
   * @returns {Promise<GetSessionLivestreamPerformanceResponse>} Promise resolving to the response
   */
  public async getSessionLivestreamPerformance(
    params?: GetSessionLivestreamPerformanceRequest
  ): Promise<GetSessionLivestreamPerformanceResponse> {
    return ShopeeFetch.fetch<GetSessionLivestreamPerformanceResponse>(
      this.config,
      "/principal/get_session_livestream_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries affiliate performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics with placed-order and confirmed-order views.
   *
   * @param {GetShopAffiliatePerformanceRequest} params Request parameters
   * @returns {Promise<GetShopAffiliatePerformanceResponse>} Promise resolving to the response
   */
  public async getShopAffiliatePerformance(
    params?: GetShopAffiliatePerformanceRequest
  ): Promise<GetShopAffiliatePerformanceResponse> {
    return ShopeeFetch.fetch<GetShopAffiliatePerformanceResponse>(
      this.config,
      "/principal/get_shop_affiliate_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries livestream performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
   *
   * @param {GetShopLivestreamPerformanceRequest} params Request parameters
   * @returns {Promise<GetShopLivestreamPerformanceResponse>} Promise resolving to the response
   */
  public async getShopLivestreamPerformance(
    params?: GetShopLivestreamPerformanceRequest
  ): Promise<GetShopLivestreamPerformanceResponse> {
    return ShopeeFetch.fetch<GetShopLivestreamPerformanceResponse>(
      this.config,
      "/principal/get_shop_livestream_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries the business performance data of stores under the specified entity within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and store-level detailed metrics.
   *
   * @param {GetShopSalesPerformanceDetailRequest} params Request parameters
   * @returns {Promise<GetShopSalesPerformanceDetailResponse>} Promise resolving to the response
   */
  public async getShopSalesPerformanceDetail(
    params?: GetShopSalesPerformanceDetailRequest
  ): Promise<GetShopSalesPerformanceDetailResponse> {
    return ShopeeFetch.fetch<GetShopSalesPerformanceDetailResponse>(
      this.config,
      "/principal/get_shop_sales_performance_detail",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Queries video performance data for the specified shops within the selected time range. Supports request granularity by day, week, month, quarter, year, or customize, and returns both overall summary metrics and shop-level detailed metrics.
   *
   * @param {GetShopVideoPerformanceRequest} params Request parameters
   * @returns {Promise<GetShopVideoPerformanceResponse>} Promise resolving to the response
   */
  public async getShopVideoPerformance(
    params?: GetShopVideoPerformanceRequest
  ): Promise<GetShopVideoPerformanceResponse> {
    return ShopeeFetch.fetch<GetShopVideoPerformanceResponse>(
      this.config,
      "/principal/get_shop_video_performance",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
