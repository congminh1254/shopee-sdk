import {
  GenerateIncomeReportRequest,
  GenerateIncomeReportResponse,
  GenerateIncomeStatementRequest,
  GenerateIncomeStatementResponse,
  GetBillingTransactionInfoRequest,
  GetBillingTransactionInfoResponse,
  GetEscrowDetailRequest,
  GetEscrowDetailResponse,
  GetEscrowDetailBatchRequest,
  GetEscrowDetailBatchResponse,
  GetEscrowListRequest,
  GetEscrowListResponse,
  GetIncomeDetailRequest,
  GetIncomeDetailResponse,
  GetIncomeOverviewRequest,
  GetIncomeOverviewResponse,
  GetIncomeReportRequest,
  GetIncomeReportResponse,
  GetIncomeStatementRequest,
  GetIncomeStatementResponse,
  GetItemInstallmentStatusRequest,
  GetItemInstallmentStatusResponse,
  GetPaymentMethodListRequest,
  GetPaymentMethodListResponse,
  GetPayoutDetailRequest,
  GetPayoutDetailResponse,
  GetPayoutInfoRequest,
  GetPayoutInfoResponse,
  GetShopInstallmentStatusRequest,
  GetShopInstallmentStatusResponse,
  GetWalletTransactionListRequest,
  GetWalletTransactionListResponse,
  SetItemInstallmentStatusRequest,
  SetItemInstallmentStatusResponse,
  SetShopInstallmentStatusRequest,
  SetShopInstallmentStatusResponse,
} from "../schemas/payment.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class PaymentManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Trigger income report generation.
   *
   * @param {GenerateIncomeReportRequest} params Request parameters
   * @returns {Promise<GenerateIncomeReportResponse>} Promise resolving to the response
   */
  public async generateIncomeReport(
    params?: GenerateIncomeReportRequest
  ): Promise<GenerateIncomeReportResponse> {
    return ShopeeFetch.fetch<GenerateIncomeReportResponse>(
      this.config,
      "/payment/generate_income_report",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Trigger income statement generation.
   *
   * @param {GenerateIncomeStatementRequest} params Request parameters
   * @returns {Promise<GenerateIncomeStatementResponse>} Promise resolving to the response
   */
  public async generateIncomeStatement(
    params?: GenerateIncomeStatementRequest
  ): Promise<GenerateIncomeStatementResponse> {
    return ShopeeFetch.fetch<GenerateIncomeStatementResponse>(
      this.config,
      "/payment/generate_income_statement",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API is applicable for Cross Border (CB) sellers only to get the detailed payout transaction data, both released and to-be released transaction can be found in here
   *
   * @param {GetBillingTransactionInfoRequest} params Request parameters
   * @returns {Promise<GetBillingTransactionInfoResponse>} Promise resolving to the response
   */
  public async getBillingTransactionInfo(
    params?: GetBillingTransactionInfoRequest
  ): Promise<GetBillingTransactionInfoResponse> {
    return ShopeeFetch.fetch<GetBillingTransactionInfoResponse>(
      this.config,
      "/payment/get_billing_transaction_info",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to fetch the accounting detail of order.
   *
   * @param {GetEscrowDetailRequest} params Request parameters
   * @returns {Promise<GetEscrowDetailResponse>} Promise resolving to the response
   */
  public async getEscrowDetail(params?: GetEscrowDetailRequest): Promise<GetEscrowDetailResponse> {
    return ShopeeFetch.fetch<GetEscrowDetailResponse>(this.config, "/payment/get_escrow_detail", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.order_income.order_adjustment.date"],
    });
  }
  /**
   * Use this API to fetch the details of order income by batch.
   *
   * @param {GetEscrowDetailBatchRequest} params Request parameters
   * @returns {Promise<GetEscrowDetailBatchResponse>} Promise resolving to the response
   */
  public async getEscrowDetailBatch(
    params?: GetEscrowDetailBatchRequest
  ): Promise<GetEscrowDetailBatchResponse> {
    return ShopeeFetch.fetch<GetEscrowDetailBatchResponse>(
      this.config,
      "/payment/get_escrow_detail_batch",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this API to fetch the accounting list of order.
   *
   * @param {GetEscrowListRequest} params Request parameters
   * @returns {Promise<GetEscrowListResponse>} Promise resolving to the response
   */
  public async getEscrowList(params?: GetEscrowListRequest): Promise<GetEscrowListResponse> {
    return ShopeeFetch.fetch<GetEscrowListResponse>(this.config, "/payment/get_escrow_list", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "release_time_from",
        "release_time_to",
        "response.escrow_list.escrow_release_time",
      ],
    });
  }
  /**
   * Retrieves detailed order-level income information across various income statuses for a specified time period. This API enables partners to display granular transaction-level income data consistent with Seller Center’s “Income Details” view, segmented by income status and payout stage.
   *
   * The API dynamically adapts data fields based on the seller’s shop type (Local or Cross Border) and the selected income status (e.g., Pending, To Release, Released).
   *
   * @param {GetIncomeDetailRequest} params Request parameters
   * @returns {Promise<GetIncomeDetailResponse>} Promise resolving to the response
   */
  public async getIncomeDetail(params?: GetIncomeDetailRequest): Promise<GetIncomeDetailResponse> {
    return ShopeeFetch.fetch<GetIncomeDetailResponse>(this.config, "/payment/get_income_detail", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * Retrieves a consolidated snapshot of the seller’s income amounts categorized by income status for a specified shop. This API provides a holistic overview similar to Seller Center’s “Income Overview” section, allowing external systems to reflect the same current payout view.
   *
   * Data is dynamically determined based on the shop type (Local or Cross Border) and the income status requested. Historical income results are not retrievable, providing consistent information as Seller Centre.
   *
   * @param {GetIncomeOverviewRequest} params Request parameters
   * @returns {Promise<GetIncomeOverviewResponse>} Promise resolving to the response
   */
  public async getIncomeOverview(
    params?: GetIncomeOverviewRequest
  ): Promise<GetIncomeOverviewResponse> {
    return ShopeeFetch.fetch<GetIncomeOverviewResponse>(
      this.config,
      "/payment/get_income_overview",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * To query income report status and provide file link if the income report is ready to be downloaded.
   *
   * @param {GetIncomeReportRequest} params Request parameters
   * @returns {Promise<GetIncomeReportResponse>} Promise resolving to the response
   */
  public async getIncomeReport(params?: GetIncomeReportRequest): Promise<GetIncomeReportResponse> {
    return ShopeeFetch.fetch<GetIncomeReportResponse>(this.config, "/payment/get_income_report", {
      method: "GET",
      auth: true,
      params: params,
    });
  }
  /**
   * To query income statement status and provide file link if the income statement is ready to be downloaded.
   *
   * @param {GetIncomeStatementRequest} params Request parameters
   * @returns {Promise<GetIncomeStatementResponse>} Promise resolving to the response
   */
  public async getIncomeStatement(
    params?: GetIncomeStatementRequest
  ): Promise<GetIncomeStatementResponse> {
    return ShopeeFetch.fetch<GetIncomeStatementResponse>(
      this.config,
      "/payment/get_income_statement",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Get item installment tenures.Only for TH、TW.
   *
   * @param {GetItemInstallmentStatusRequest} params Request parameters
   * @returns {Promise<GetItemInstallmentStatusResponse>} Promise resolving to the response
   */
  public async getItemInstallmentStatus(
    params?: GetItemInstallmentStatusRequest
  ): Promise<GetItemInstallmentStatusResponse> {
    return ShopeeFetch.fetch<GetItemInstallmentStatusResponse>(
      this.config,
      "/payment/get_item_installment_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Obtain payment method (no authentication required)
   *
   * @param {GetPaymentMethodListRequest} params Request parameters
   * @returns {Promise<GetPaymentMethodListResponse>} Promise resolving to the response
   */
  public async getPaymentMethodList(
    params?: GetPaymentMethodListRequest
  ): Promise<GetPaymentMethodListResponse> {
    return ShopeeFetch.fetch<GetPaymentMethodListResponse>(
      this.config,
      "/payment/get_payment_method_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * This API is applicable for Cross Border (CB) sellers only to get the shop's payout data, such as the payout amount, currency, FX rate, the payout's associated order income and adjustment records etc.
   *
   * @param {GetPayoutDetailRequest} params Request parameters
   * @returns {Promise<GetPayoutDetailResponse>} Promise resolving to the response
   */
  public async getPayoutDetail(params?: GetPayoutDetailRequest): Promise<GetPayoutDetailResponse> {
    return ShopeeFetch.fetch<GetPayoutDetailResponse>(this.config, "/payment/get_payout_detail", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "payout_time_from",
        "payout_time_to",
        "response.payout_list.payout_info.payout_time",
      ],
    });
  }
  /**
   * This is a new API which applicable for Cross Border (CB) sellers only to get the shop's payout data, will be used for the original API v2.get_payout_details replacement, we provide data such as the payout amount, currency, FX rate, the payout's associated order income and adjustment records etc.
   *
   * @param {GetPayoutInfoRequest} params Request parameters
   * @returns {Promise<GetPayoutInfoResponse>} Promise resolving to the response
   */
  public async getPayoutInfo(params?: GetPayoutInfoRequest): Promise<GetPayoutInfoResponse> {
    return ShopeeFetch.fetch<GetPayoutInfoResponse>(this.config, "/payment/get_payout_info", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["payout_time_from", "payout_time_to", "response.payout_list.payout_time"],
    });
  }
  /**
   * Get the installment state of shop.
   *
   * @param {GetShopInstallmentStatusRequest} params Request parameters
   * @returns {Promise<GetShopInstallmentStatusResponse>} Promise resolving to the response
   */
  public async getShopInstallmentStatus(
    params?: GetShopInstallmentStatusRequest
  ): Promise<GetShopInstallmentStatusResponse> {
    return ShopeeFetch.fetch<GetShopInstallmentStatusResponse>(
      this.config,
      "/payment/get_shop_installment_status",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Use this API to get the transaction records of wallet. Only applicable for local shops
   *
   * @param {GetWalletTransactionListRequest} params Request parameters
   * @returns {Promise<GetWalletTransactionListResponse>} Promise resolving to the response
   */
  public async getWalletTransactionList(
    params?: GetWalletTransactionListRequest
  ): Promise<GetWalletTransactionListResponse> {
    return ShopeeFetch.fetch<GetWalletTransactionListResponse>(
      this.config,
      "/payment/get_wallet_transaction_list",
      {
        method: "GET",
        auth: true,
        params: params,
      }
    );
  }
  /**
   * Set item installment.Only for TH、TW.
   *
   * @param {SetItemInstallmentStatusRequest} params Request parameters
   * @returns {Promise<SetItemInstallmentStatusResponse>} Promise resolving to the response
   */
  public async setItemInstallmentStatus(
    params?: SetItemInstallmentStatusRequest
  ): Promise<SetItemInstallmentStatusResponse> {
    return ShopeeFetch.fetch<SetItemInstallmentStatusResponse>(
      this.config,
      "/payment/set_item_installment_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Sets the staging capability of shop level.
   *
   * @param {SetShopInstallmentStatusRequest} params Request parameters
   * @returns {Promise<SetShopInstallmentStatusResponse>} Promise resolving to the response
   */
  public async setShopInstallmentStatus(
    params?: SetShopInstallmentStatusRequest
  ): Promise<SetShopInstallmentStatusResponse> {
    return ShopeeFetch.fetch<SetShopInstallmentStatusResponse>(
      this.config,
      "/payment/set_shop_installment_status",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
