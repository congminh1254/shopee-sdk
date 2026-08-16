import {
  AddDiscountRequest,
  AddDiscountResponse,
  AddDiscountItemRequest,
  AddDiscountItemResponse,
  DeleteDiscountRequest,
  DeleteDiscountResponse,
  DeleteDiscountItemRequest,
  DeleteDiscountItemResponse,
  DeleteSipDiscountRequest,
  DeleteSipDiscountResponse,
  EndDiscountRequest,
  EndDiscountResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  GetDiscountListRequest,
  GetDiscountListResponse,
  GetSipDiscountsRequest,
  GetSipDiscountsResponse,
  SetSipDiscountRequest,
  SetSipDiscountResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
  UpdateDiscountItemRequest,
  UpdateDiscountItemResponse,
} from "../schemas/discount.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class DiscountManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Use this api to add shop discount activity
   *
   * @param {AddDiscountRequest} params Request parameters
   * @returns {Promise<AddDiscountResponse>} Promise resolving to the response
   */
  public async addDiscount(params?: AddDiscountRequest): Promise<AddDiscountResponse> {
    return ShopeeFetch.fetch<AddDiscountResponse>(this.config, "/discount/add_discount", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["start_time", "end_time"],
    });
  }
  /**
   * Use this api to add shop discount item.
   *
   * @param {AddDiscountItemRequest} params Request parameters
   * @returns {Promise<AddDiscountItemResponse>} Promise resolving to the response
   */
  public async addDiscountItem(params?: AddDiscountItemRequest): Promise<AddDiscountItemResponse> {
    return ShopeeFetch.fetch<AddDiscountItemResponse>(this.config, "/discount/add_discount_item", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Use this api to delete one discount activity
   *
   * @param {DeleteDiscountRequest} params Request parameters
   * @returns {Promise<DeleteDiscountResponse>} Promise resolving to the response
   */
  public async deleteDiscount(params?: DeleteDiscountRequest): Promise<DeleteDiscountResponse> {
    return ShopeeFetch.fetch<DeleteDiscountResponse>(this.config, "/discount/delete_discount", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["response.modify_time"],
    });
  }
  /**
   * Use this api to delete items of the discount activity
   *
   * @param {DeleteDiscountItemRequest} params Request parameters
   * @returns {Promise<DeleteDiscountItemResponse>} Promise resolving to the response
   */
  public async deleteDiscountItem(
    params?: DeleteDiscountItemRequest
  ): Promise<DeleteDiscountItemResponse> {
    return ShopeeFetch.fetch<DeleteDiscountItemResponse>(
      this.config,
      "/discount/delete_discount_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Delete SIP Overseas Discounts for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region of the Affiliate shop to be deleted, the API will delete the discount from that region's Affiliate shop.
   *
   * @param {DeleteSipDiscountRequest} params Request parameters
   * @returns {Promise<DeleteSipDiscountResponse>} Promise resolving to the response
   */
  public async deleteSipDiscount(
    params?: DeleteSipDiscountRequest
  ): Promise<DeleteSipDiscountResponse> {
    return ShopeeFetch.fetch<DeleteSipDiscountResponse>(
      this.config,
      "/discount/delete_sip_discount",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
  /**
   * Use this api to end shop discount activity
   *
   * @param {EndDiscountRequest} params Request parameters
   * @returns {Promise<EndDiscountResponse>} Promise resolving to the response
   */
  public async endDiscount(params?: EndDiscountRequest): Promise<EndDiscountResponse> {
    return ShopeeFetch.fetch<EndDiscountResponse>(this.config, "/discount/end_discount", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["response.modify_time"],
    });
  }
  /**
   * Use this api to get one shop discount activity detail
   *
   * @param {GetDiscountRequest} params Request parameters
   * @returns {Promise<GetDiscountResponse>} Promise resolving to the response
   */
  public async getDiscount(params?: GetDiscountRequest): Promise<GetDiscountResponse> {
    return ShopeeFetch.fetch<GetDiscountResponse>(this.config, "/discount/get_discount", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.start_time", "response.end_time"],
    });
  }
  /**
   * Use this api to get shop discount activity list
   *
   * @param {GetDiscountListRequest} params Request parameters
   * @returns {Promise<GetDiscountListResponse>} Promise resolving to the response
   */
  public async getDiscountList(params?: GetDiscountListRequest): Promise<GetDiscountListResponse> {
    return ShopeeFetch.fetch<GetDiscountListResponse>(this.config, "/discount/get_discount_list", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "update_time_from",
        "update_time_to",
        "response.discount_list.start_time",
        "response.discount_list.end_time",
      ],
    });
  }
  /**
   * Get SIP Overseas Discounts. Only regions that have upcoming/ongoing discounts will be returned. Please use Primary shop's Shop ID to request, the API will return the list of Affiliate shops under this Primary shop that have set discounts, along with the discount details.
   *
   * @param {GetSipDiscountsRequest} params Request parameters
   * @returns {Promise<GetSipDiscountsResponse>} Promise resolving to the response
   */
  public async getSipDiscounts(params?: GetSipDiscountsRequest): Promise<GetSipDiscountsResponse> {
    return ShopeeFetch.fetch<GetSipDiscountsResponse>(this.config, "/discount/get_sip_discounts", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "response.discount_list.start_time",
        "response.discount_list.end_time",
        "response.discount_list.create_time",
        "response.discount_list.update_time",
      ],
    });
  }
  /**
   * Set SIP Overseas Discount for SIP affiliate region. Please use Primary shop's Shop ID to request, and provide the region and discount rate of the Affiliate shop to be set or update, the API will set or update the discount rate for that region's Affiliate shop.
   *
   * @param {SetSipDiscountRequest} params Request parameters
   * @returns {Promise<SetSipDiscountResponse>} Promise resolving to the response
   */
  public async setSipDiscount(params?: SetSipDiscountRequest): Promise<SetSipDiscountResponse> {
    return ShopeeFetch.fetch<SetSipDiscountResponse>(this.config, "/discount/set_sip_discount", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: [
        "response.start_time",
        "response.end_time",
        "response.create_time",
        "response.update_time",
      ],
    });
  }
  /**
   * Use this api to update one discount information
   *
   * @param {UpdateDiscountRequest} params Request parameters
   * @returns {Promise<UpdateDiscountResponse>} Promise resolving to the response
   */
  public async updateDiscount(params?: UpdateDiscountRequest): Promise<UpdateDiscountResponse> {
    return ShopeeFetch.fetch<UpdateDiscountResponse>(this.config, "/discount/update_discount", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["response.modify_time"],
    });
  }
  /**
   * Use this api to update items of the discount promotion.
   *
   * @param {UpdateDiscountItemRequest} params Request parameters
   * @returns {Promise<UpdateDiscountItemResponse>} Promise resolving to the response
   */
  public async updateDiscountItem(
    params?: UpdateDiscountItemRequest
  ): Promise<UpdateDiscountItemResponse> {
    return ShopeeFetch.fetch<UpdateDiscountItemResponse>(
      this.config,
      "/discount/update_discount_item",
      {
        method: "POST",
        auth: true,
        body: params,
      }
    );
  }
}
