// NOTE: This file is auto-generated. Do not edit directly.

import {
  AddVoucherRequest,
  AddVoucherResponse,
  DeleteVoucherRequest,
  DeleteVoucherResponse,
  EndVoucherRequest,
  EndVoucherResponse,
  GetVoucherRequest,
  GetVoucherResponse,
  GetVoucherListRequest,
  GetVoucherListResponse,
  UpdateVoucherRequest,
  UpdateVoucherResponse,
} from "../schemas/voucher.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class VoucherManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
  /**
   * Add voucher
   *
   * @param {AddVoucherRequest} params Request parameters
   * @returns {Promise<AddVoucherResponse>} Promise resolving to the response
   */
  public async addVoucher(params?: AddVoucherRequest): Promise<AddVoucherResponse> {
    return ShopeeFetch.fetch<AddVoucherResponse>(this.config, "/voucher/add_voucher", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["start_time", "end_time"],
    });
  }
  /**
   * Delete voucher
   *
   * @param {DeleteVoucherRequest} params Request parameters
   * @returns {Promise<DeleteVoucherResponse>} Promise resolving to the response
   */
  public async deleteVoucher(params?: DeleteVoucherRequest): Promise<DeleteVoucherResponse> {
    return ShopeeFetch.fetch<DeleteVoucherResponse>(this.config, "/voucher/delete_voucher", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * End Voucher
   *
   * @param {EndVoucherRequest} params Request parameters
   * @returns {Promise<EndVoucherResponse>} Promise resolving to the response
   */
  public async endVoucher(params?: EndVoucherRequest): Promise<EndVoucherResponse> {
    return ShopeeFetch.fetch<EndVoucherResponse>(this.config, "/voucher/end_voucher", {
      method: "POST",
      auth: true,
      body: params,
    });
  }
  /**
   * Get Voucher Detail
   *
   * @param {GetVoucherRequest} params Request parameters
   * @returns {Promise<GetVoucherResponse>} Promise resolving to the response
   */
  public async getVoucher(params?: GetVoucherRequest): Promise<GetVoucherResponse> {
    return ShopeeFetch.fetch<GetVoucherResponse>(this.config, "/voucher/get_voucher", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: ["response.start_time", "response.end_time", "response.display_start_time"],
    });
  }
  /**
   * Get Voucher List
   *
   * @param {GetVoucherListRequest} params Request parameters
   * @returns {Promise<GetVoucherListResponse>} Promise resolving to the response
   */
  public async getVoucherList(params?: GetVoucherListRequest): Promise<GetVoucherListResponse> {
    return ShopeeFetch.fetch<GetVoucherListResponse>(this.config, "/voucher/get_voucher_list", {
      method: "GET",
      auth: true,
      params: params,
      timestampPaths: [
        "response.voucher_list.start_time",
        "response.voucher_list.end_time",
        "response.voucher_list.display_start_time",
      ],
    });
  }
  /**
   * Update voucher
   *
   * @param {UpdateVoucherRequest} params Request parameters
   * @returns {Promise<UpdateVoucherResponse>} Promise resolving to the response
   */
  public async updateVoucher(params?: UpdateVoucherRequest): Promise<UpdateVoucherResponse> {
    return ShopeeFetch.fetch<UpdateVoucherResponse>(this.config, "/voucher/update_voucher", {
      method: "POST",
      auth: true,
      body: params,
      timestampPaths: ["start_time", "end_time"],
    });
  }
}
