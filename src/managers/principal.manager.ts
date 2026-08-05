import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
import {
  GetClipVideoPerformanceParams,
  GetClipVideoPerformanceResponse,
  GetContentAffiliatePerformanceParams,
  GetContentAffiliatePerformanceResponse,
  GetPrincipalAffiliatePerformanceParams,
  GetPrincipalAffiliatePerformanceResponse,
  GetPrincipalLivestreamPerformanceParams,
  GetPrincipalLivestreamPerformanceResponse,
  GetPrincipalSalesPerformanceDetailParams,
  GetPrincipalSalesPerformanceDetailResponse,
  GetPrincipalVideoPerformanceParams,
  GetPrincipalVideoPerformanceResponse,
  GetSessionLivestreamPerformanceParams,
  GetSessionLivestreamPerformanceResponse,
  GetShopAffiliatePerformanceParams,
  GetShopAffiliatePerformanceResponse,
  GetShopLivestreamPerformanceParams,
  GetShopLivestreamPerformanceResponse,
  GetShopSalesPerformanceDetailParams,
  GetShopSalesPerformanceDetailResponse,
  GetShopVideoPerformanceParams,
  GetShopVideoPerformanceResponse,
} from "../schemas/principal.js";

export class PrincipalManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  /**
   * Get performance metrics for principal endpoint get_clip_video_performance
   */
  public async getClipVideoPerformance(
    params: GetClipVideoPerformanceParams
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
   * Get performance metrics for principal endpoint get_content_affiliate_performance
   */
  public async getContentAffiliatePerformance(
    params: GetContentAffiliatePerformanceParams
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
   * Get performance metrics for principal endpoint get_principal_affiliate_performance
   */
  public async getPrincipalAffiliatePerformance(
    params: GetPrincipalAffiliatePerformanceParams
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
   * Get performance metrics for principal endpoint get_principal_livestream_performance
   */
  public async getPrincipalLivestreamPerformance(
    params: GetPrincipalLivestreamPerformanceParams
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
   * Get performance metrics for principal endpoint get_principal_sales_performance_detail
   */
  public async getPrincipalSalesPerformanceDetail(
    params: GetPrincipalSalesPerformanceDetailParams
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
   * Get performance metrics for principal endpoint get_principal_video_performance
   */
  public async getPrincipalVideoPerformance(
    params: GetPrincipalVideoPerformanceParams
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
   * Get performance metrics for principal endpoint get_session_livestream_performance
   */
  public async getSessionLivestreamPerformance(
    params: GetSessionLivestreamPerformanceParams
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
   * Get performance metrics for principal endpoint get_shop_affiliate_performance
   */
  public async getShopAffiliatePerformance(
    params: GetShopAffiliatePerformanceParams
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
   * Get performance metrics for principal endpoint get_shop_livestream_performance
   */
  public async getShopLivestreamPerformance(
    params: GetShopLivestreamPerformanceParams
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
   * Get performance metrics for principal endpoint get_shop_sales_performance_detail
   */
  public async getShopSalesPerformanceDetail(
    params: GetShopSalesPerformanceDetailParams
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
   * Get performance metrics for principal endpoint get_shop_video_performance
   */
  public async getShopVideoPerformance(
    params: GetShopVideoPerformanceParams
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
