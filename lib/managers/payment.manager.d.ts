import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetEscrowDetailParams, GetEscrowDetailResponse, GetEscrowListParams, GetEscrowListResponse, GetEscrowDetailBatchParams, GetEscrowDetailBatchResponse, GetWalletTransactionListParams, GetWalletTransactionListResponse, GetPaymentMethodListResponse, GetShopInstallmentStatusResponse, SetShopInstallmentStatusParams, SetShopInstallmentStatusResponse, GetItemInstallmentStatusParams, GetItemInstallmentStatusResponse, SetItemInstallmentStatusParams, SetItemInstallmentStatusResponse, GenerateIncomeReportParams, GenerateIncomeReportResponse, GetIncomeReportParams, GetIncomeReportResponse, GenerateIncomeStatementParams, GenerateIncomeStatementResponse, GetIncomeStatementParams, GetIncomeStatementResponse, GetBillingTransactionInfoParams, GetBillingTransactionInfoResponse, GetPayoutDetailParams, GetPayoutDetailResponse, GetPayoutInfoParams, GetPayoutInfoResponse } from "../schemas/payment.js";
export declare class PaymentManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Use this API to fetch the accounting detail of order.
     *
     * @param params - Parameters for getting escrow detail
     * @param params.order_sn - Shopee's unique identifier for an order
     *
     * @returns A promise that resolves to the escrow detail response containing:
     * - order_sn: Order identifier
     * - buyer_user_name: Username of buyer
     * - return_order_sn_list: List of return order numbers
     * - order_income: Detailed breakdown of order income including:
     *   - escrow_amount: Expected amount seller will receive
     *   - buyer_total_amount: Total amount paid by buyer
     *   - items: List of items with pricing details
     *   - fees and adjustments: Various fees, taxes and adjustments
     * - buyer_payment_info: Payment details from buyer's perspective
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_param: Missing or invalid parameters
     * - error_auth: Authentication or permission errors
     * - error_server: Internal server errors
     * - error_not_found: Order income details not found
     */
    getEscrowDetail(params: GetEscrowDetailParams): Promise<GetEscrowDetailResponse>;
    /**
     * Use this API to fetch the accounting list of order.
     *
     * @param params - Parameters for getting escrow list
     * @param params.release_time_from - Query start time (timestamp)
     * @param params.release_time_to - Query end time (timestamp)
     * @param params.page_size - Number of pages returned, max: 100, default: 40
     * @param params.page_no - The page number, min: 1, default: 1
     *
     * @returns A promise that resolves to the escrow list response containing:
     * - escrow_list: List of escrow orders with order_sn, payout_amount, and escrow_release_time
     * - more: Indicates whether there are more pages
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getEscrowList(params: GetEscrowListParams): Promise<GetEscrowListResponse>;
    /**
     * Use this API to fetch the details of order income by batch.
     *
     * @param params - Parameters for getting escrow detail batch
     * @param params.order_sn_list - List of order SNs, limit [1,50]. Recommended 1-20 orders per request
     *
     * @returns A promise that resolves to the escrow detail batch response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getEscrowDetailBatch(params: GetEscrowDetailBatchParams): Promise<GetEscrowDetailBatchResponse>;
    /**
     * Use this API to get the transaction records of wallet. Only applicable for local shops.
     *
     * @param params - Parameters for getting wallet transaction list
     * @param params.create_time_from - The start time of the query (timestamp)
     * @param params.create_time_to - The end time of the query (timestamp)
     * @param params.page_no - Offset for pagination, start from 0
     * @param params.page_size - The number of records returned per page, min 1, max 100, default 40
     * @param params.transaction_type - Transaction types filter
     *
     * @returns A promise that resolves to the wallet transaction list response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getWalletTransactionList(params: GetWalletTransactionListParams): Promise<GetWalletTransactionListResponse>;
    /**
     * Obtain payment method (no authentication required).
     *
     * @returns A promise that resolves to the payment method list response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getPaymentMethodList(): Promise<GetPaymentMethodListResponse>;
    /**
     * Get the installment state of shop.
     *
     * @returns A promise that resolves to the shop installment status response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getShopInstallmentStatus(): Promise<GetShopInstallmentStatusResponse>;
    /**
     * Sets the staging capability of shop level.
     *
     * @param params - Parameters for setting shop installment status
     * @param params.installment_enabled - Whether to enable installment for shop
     * @param params.tenure_list - List of tenure months to enable
     *
     * @returns A promise that resolves to the set shop installment status response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    setShopInstallmentStatus(params: SetShopInstallmentStatusParams): Promise<SetShopInstallmentStatusResponse>;
    /**
     * Get item installment tenures. Only for TH、TW.
     *
     * @param params - Parameters for getting item installment status
     * @param params.item_id - Item ID
     *
     * @returns A promise that resolves to the item installment status response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getItemInstallmentStatus(params: GetItemInstallmentStatusParams): Promise<GetItemInstallmentStatusResponse>;
    /**
     * Set item installment. Only for TH、TW.
     *
     * @param params - Parameters for setting item installment status
     * @param params.item_id - Item ID
     * @param params.tenure_list - List of tenure months to enable
     *
     * @returns A promise that resolves to the set item installment status response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    setItemInstallmentStatus(params: SetItemInstallmentStatusParams): Promise<SetItemInstallmentStatusResponse>;
    /**
     * Trigger income report generation.
     *
     * @param params - Parameters for generating income report
     * @param params.start_time - Start time for the report (timestamp)
     * @param params.end_time - End time for the report (timestamp)
     * @param params.currency - Currency for the report
     *
     * @returns A promise that resolves to the generate income report response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    generateIncomeReport(params: GenerateIncomeReportParams): Promise<GenerateIncomeReportResponse>;
    /**
     * To query income report status and provide file link if the income report is ready to be downloaded.
     *
     * @param params - Parameters for getting income report
     * @param params.income_report_id - Income report ID
     *
     * @returns A promise that resolves to the get income report response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getIncomeReport(params: GetIncomeReportParams): Promise<GetIncomeReportResponse>;
    /**
     * Trigger income statement generation.
     *
     * @param params - Parameters for generating income statement
     * @param params.start_time - Start time for the statement (timestamp)
     * @param params.end_time - End time for the statement (timestamp)
     *
     * @returns A promise that resolves to the generate income statement response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    generateIncomeStatement(params: GenerateIncomeStatementParams): Promise<GenerateIncomeStatementResponse>;
    /**
     * To query income statement status and provide file link if the income statement is ready to be downloaded.
     *
     * @param params - Parameters for getting income statement
     * @param params.income_statement_id - Income statement ID
     *
     * @returns A promise that resolves to the get income statement response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getIncomeStatement(params: GetIncomeStatementParams): Promise<GetIncomeStatementResponse>;
    /**
     * This API is applicable for Cross Border (CB) sellers only to get the detailed payout transaction data,
     * both released and to-be released transaction can be found in here.
     *
     * @param params - Parameters for getting billing transaction info
     * @param params.transaction_time_from - Transaction time from (timestamp)
     * @param params.transaction_time_to - Transaction time to (timestamp)
     * @param params.page_no - Page number, default 1
     * @param params.page_size - Page size, max 100, default 40
     *
     * @returns A promise that resolves to the billing transaction info response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getBillingTransactionInfo(params: GetBillingTransactionInfoParams): Promise<GetBillingTransactionInfoResponse>;
    /**
     * This API is applicable for Cross Border (CB) sellers only to get the shop's payout data.
     * @deprecated Use getPayoutInfo instead
     *
     * @param params - Parameters for getting payout detail
     * @param params.payout_time_from - Payout time from (timestamp)
     * @param params.payout_time_to - Payout time to (timestamp)
     * @param params.page_no - Page number, default 1
     * @param params.page_size - Page size, max 100, default 40
     *
     * @returns A promise that resolves to the payout detail response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getPayoutDetail(params: GetPayoutDetailParams): Promise<GetPayoutDetailResponse>;
    /**
     * This is a new API which applicable for Cross Border (CB) sellers only to get the shop's payout data,
     * will be used for the original API v2.get_payout_details replacement.
     *
     * @param params - Parameters for getting payout info
     * @param params.payout_time_from - Payout time from (timestamp)
     * @param params.payout_time_to - Payout time to (timestamp)
     * @param params.page_no - Page number, default 1
     * @param params.page_size - Page size, max 100, default 40
     *
     * @returns A promise that resolves to the payout info response
     *
     * @throws {Error} When the API request fails or returns an error
     */
    getPayoutInfo(params: GetPayoutInfoParams): Promise<GetPayoutInfoResponse>;
}
