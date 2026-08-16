import { FetchResponse } from "./fetch.js";
/**
 * Enum generated for field Status
 */
export enum Status {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  EXPIRED = "expired",
  ALL = "all",
}
/**
 * Request parameters for add_voucher
 *
 * Add voucher
 */
export interface AddVoucherRequest {
  /**
   * The name of the voucher.
   */
  voucher_name?: string;
  /**
   * The code of the voucher.
   */
  voucher_code?: string;
  /**
   * The timing from when the voucher is valid; so buyer is allowed to claim and to use. Field can only be updated if voucher has not started.
   */
  start_time?: Date | number;
  /**
   * The timing until when the voucher is still valid. Any time after this end_time, buyer is not allowed to claim or to use.
   */
  end_time?: Date | number;
  /**
   * The type of the voucher. The available values are: 1: shop voucher, 2: product voucher.
   */
  voucher_type?: number;
  /**
   * The reward type of the voucher. The available values are: 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher.
   */
  reward_type?: number;
  /**
   * The number of times for this particular voucher could be used.
   */
  usage_quantity?: number;
  /**
   * The minimum spend required for using this voucher.
   */
  min_basket_price?: number;
  /**
   * The discount amount set for this particular voucher. Only fill in when you are creating a fix amount voucher.
   */
  discount_amount?: number;
  /**
   * The discount percentage set for this particular voucher. Only fill in when you are creating a discount percentage voucher or coins cashback voucher.
   */
  percentage?: number;
  /**
   * The max amount of discount/value a user can enjoy by using this particular voucher. Only fill in when you are creating a discount percentage voucher or coins cashback voucher.If no cap limit, can set to be 0.
   */
  max_price?: number;
  /**
   * The FE channel where the voucher will be displayed. The available values are: 1: display_all  3: feed, 4: live streaming,   [] (empty - which is hidden).
   */
  display_channel_list?: number[];
  /**
   * The list of items which is applicable for the voucher. Only fill in when you are creating a product type of voucher.
   */
  item_id_list?: number[];
  /**
   * The timing of when voucher is displayed on shop pages; so buyer is allowed to claim.display_start_time must be left empty if the display_channel_list is empty (when voucher is hidden), otherwise it will show error.
   */
  display_start_time?: number;
  [key: string]: any;
}
/**
 * AddVoucher_Response sub-interface for AddVoucherResponse
 */
export interface AddVoucher_Response {
  /**
   * The unique identifier for the created voucher.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for add_voucher
 */
export type AddVoucherResponseData = AddVoucher_Response;
/**
 * Response payload for add_voucher
 *
 * Add voucher
 */
export type AddVoucherResponse = FetchResponse<AddVoucherResponseData>;
/**
 * Request parameters for delete_voucher
 *
 * Delete voucher
 */
export interface DeleteVoucherRequest {
  /**
   * The unique identifier for the voucher you want to delete.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * DeleteVoucher_Response sub-interface for DeleteVoucherResponse
 */
export interface DeleteVoucher_Response {
  /**
   * The unique identifier for the voucher it is being deleted.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for delete_voucher
 */
export type DeleteVoucherResponseData = DeleteVoucher_Response;
/**
 * Response payload for delete_voucher
 *
 * Delete voucher
 */
export type DeleteVoucherResponse = FetchResponse<DeleteVoucherResponseData>;
/**
 * Request parameters for end_voucher
 *
 * End Voucher
 */
export interface EndVoucherRequest {
  /**
   * The unique identifier for the voucher you want to end now.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * EndVoucher_Response sub-interface for EndVoucherResponse
 */
export interface EndVoucher_Response {
  /**
   * The unique identifier for the voucher it is being ended.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for end_voucher
 */
export type EndVoucherResponseData = EndVoucher_Response;
/**
 * Response payload for end_voucher
 *
 * End Voucher
 */
export type EndVoucherResponse = FetchResponse<EndVoucherResponseData>;
/**
 * Request parameters for get_voucher
 *
 * Get Voucher Detail
 */
export interface GetVoucherRequest {
  /**
   * The unique identifier of a voucher used to query the voucher details.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * GetVoucher_Response sub-interface for GetVoucherResponse
 */
export interface GetVoucher_Response {
  /**
   * The unique identifier of the voucher whose details are returned.
   */
  voucher_id?: number;
  /**
   * Voucher Code
   */
  voucher_code?: string;
  /**
   * Voucher Name
   */
  voucher_name?: string;
  /**
   * The type of the voucher. The available values are: 1: shop voucher, 2: product voucher.
   */
  voucher_type?: number;
  /**
   * The reward type of the voucher. The available values are: 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher.
   */
  reward_type?: number;
  /**
   * The number of times for this particular voucher could be used.
   */
  usage_quantity?: number;
  /**
   * Up till now, how many times has this particular voucher already been used.
   */
  current_usage?: number;
  /**
   * The timing from when the voucher is valid; so buyer is allowed to claim and to use.
   */
  start_time?: Date | number;
  /**
   * The timing until when the voucher is still valid. Any time after this end_time, buyer is not allowed to claim or to use.
   */
  end_time?: Date | number;
  /**
   * If the voucher is created by Shopee or not.
   */
  is_admin?: boolean;
  /**
   * The use case for the voucher. The available values are: 0: normal; 1: welcome, 2: referral; 3: shop_follow; 4:shop_game, 5: free_gift, 6: membership，7: Ads
   */
  voucher_purpose?: number;
  /**
   * The FE channel where the voucher will be displayed. The available values are: 1: display_all, 2: order page, 3: feed, 4: live streaming,   [] (empty - which is hidden).
   */
  display_channel_list?: number[];
  /**
   * The minimum spend required for using this voucher.
   */
  min_basket_price?: number;
  /**
   * The discount percentage is set for this particular voucher. Only when it is a discount percentage voucher or coins cashback voucher, api will return a value.
   */
  percentage?: number;
  /**
   * The max amount of discount/value a user can enjoy by using this particular voucher. Only when it is a discount percentage voucher or coins cashback voucher, api will return a value.
   */
  max_price?: number;
  /**
   * The discount amount set for this particular voucher. Only when it is a fix amount voucher, api will return a value.
   */
  discount_amount?: number;
  /**
   * The voucher status in CMT. The available values are: 1:review, 2: approved, 3:reject. Only when this voucher is attending CMT campaign and not being rejected, api will return a value.
   */
  cmt_voucher_status?: number;
  /**
   * The list of items which is applicable for the voucher. Only return a value when it is a product type of voucher.
   */
  item_id_list?: number[];
  /**
   * The timing of when voucher is displayed on shop pages; so buyer is allowed to claim.
   */
  display_start_time?: Date | number;
  /**
   * The field is used to mark new user voucher/ repeat buyer voucher 1: new user voucher 2: repeat buyer voucher: with 1 orders3. repeat buyer voucher: with 2 orders
   */
  target_voucher?: number;
  /**
   * usecase indicates a specific business scenario that the voucher is created and used for, i.e., new buyer voucher, live voucher, follow shop voucher, etc.shop voucher:1product voucher:2new buyer voucher:3repeat buyer voucher:4private voucher:5live voucher:6video voucher:7campaign voucher:8follow prize voucher:9membership voucher:10game prize voucher:11sample voucher:12
   */
  usecase?: number;
  [key: string]: any;
}
/**
 * Response data payload for get_voucher
 */
export type GetVoucherResponseData = GetVoucher_Response;
/**
 * Response payload for get_voucher
 *
 * Get Voucher Detail
 */
export type GetVoucherResponse = FetchResponse<GetVoucherResponseData>;
/**
 * Request parameters for get_voucher_list
 *
 * Get Voucher List
 */
export interface GetVoucherListRequest {
  /**
   * Specifies the page number of data to return in the current call. Default to be 1 and allowed input is from 1 - 5000.
   */
  page_no?: number;
  /**
   * Use the 'page_size' filters to control the maximum number of entries to retrieve per page (i.e., per call). Default to be 20 and allowed input is from 1- 100.
   */
  page_size?: number;
  /**
   * The status filter for retrieving voucher list. Available value: upcoming/ongoing/expired/all.
   */
  status?: Status | string | number;
  [key: string]: any;
}
/**
 * GetVoucherList_Voucher sub-interface for GetVoucherList_Response
 */
export interface GetVoucherList_Voucher {
  /**
   * The unique identifier for a voucher.
   */
  voucher_id?: number;
  /**
   * Voucher Code
   */
  voucher_code?: string;
  /**
   * Voucher Name
   */
  voucher_name?: string;
  /**
   * The type of the voucher. The available values are: 1: shop voucher, 2: product voucher.
   */
  voucher_type?: number;
  /**
   * The reward type of the voucher. The available values are: 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher.
   */
  reward_type?: number;
  /**
   * The number of times for this particular voucher could be used.
   */
  usage_quantity?: number;
  /**
   * Up till now, how many times has this particular voucher already been used.
   */
  current_usage?: number;
  /**
   * The timing from when the voucher is valid; so buyer is allowed to claim and to use.
   */
  start_time?: Date | number;
  /**
   * The timing until when the voucher is still valid. Any time after this end_time, buyer is not allowed to claim or to use.
   */
  end_time?: Date | number;
  /**
   * If the voucher is created by Shopee or not.
   */
  is_admin?: boolean;
  /**
   * The use case for the voucher. The available values are: 0: normal; 1: welcome, 2: referral; 3: shop_follow; 4:shop_game, 5: free_gift, 6: membership
   */
  voucher_purpose?: number;
  /**
   * The discount amount set for this particular voucher. Only when it is a fix amount voucher, api will return a value.
   */
  discount_amount?: number;
  /**
   * The discount percentage set for this particular voucher. Only when it is a discount percentage voucher or coins cashback voucher, api will return a value.
   */
  percentage?: number;
  /**
   * The voucher status in CMT. The available values are: 1:review, 2: approved, 3:reject. Only when this voucher is attending CMT campaign and not being rejected, api will return a value.
   */
  cmt_voucher_status?: number;
  /**
   * The timing of when voucher is displayed on shop pages; so buyer is allowed to claim.
   */
  display_start_time?: Date | number;
  [key: string]: any;
}
/**
 * GetVoucherList_Response sub-interface for GetVoucherListResponse
 */
export interface GetVoucherList_Response {
  /**
   * This is to indicate whether the comment list is more than one page. If this value is true, you may want to continue to check next page to retrieve the rest of comments.
   */
  more?: boolean;
  /**
   * The list of voucher.
   */
  voucher_list?: GetVoucherList_Voucher[];
  [key: string]: any;
}
/**
 * Response data payload for get_voucher_list
 */
export type GetVoucherListResponseData = GetVoucherList_Response;
/**
 * Response payload for get_voucher_list
 *
 * Get Voucher List
 */
export type GetVoucherListResponse = FetchResponse<GetVoucherListResponseData>;
/**
 * Request parameters for update_voucher
 *
 * Update voucher
 */
export interface UpdateVoucherRequest {
  /**
   * The unique identifier of the voucher which is going to be updated.
   */
  voucher_id?: number;
  /**
   * The name of the voucher
   */
  voucher_name?: string;
  /**
   * The timing from when the voucher is valid; so buyer is allowed to claim and to use. Field can only be updated if voucher has not started.
   */
  start_time?: Date | number;
  /**
   * The timing until when the voucher is still valid. Any time after this end_time, buyer is not allowed to claim or to use.
   */
  end_time?: Date | number;
  /**
   * The number of times for this particular voucher could be used.
   */
  usage_quantity?: number;
  /**
   * The minimum spend required for using this voucher.
   */
  min_basket_price?: number;
  /**
   * The discount amount set for this particular voucher. Only fill in when you are updating a fix amount voucher.
   */
  discount_amount?: number;
  /**
   * The discount percentage set for this particular voucher. Only fill in when you are updating a discount percentage voucher or coins cashback voucher.
   */
  percentage?: number;
  /**
   * The max amount of discount/value a user can enjoy by using this particular voucher. Only fill in when you are updating a discount percentage voucher or coins cashback voucher.
   */
  max_price?: number;
  /**
   * The FE channel where the voucher will be displayed. The available values are: 1: display_all, 2: order page, 3: feed, 4: live streaming,   [] (empty - which is hidden).
   */
  display_channel_list?: number[];
  /**
   * The list of items which is applicable for the voucher. Only fill in when you are updating a product type of voucher.
   */
  item_id_list?: number[];
  /**
   * The timing of when voucher is displayed on shop pages; so buyer is allowed to claim.
   */
  display_start_time?: number;
  [key: string]: any;
}
/**
 * UpdateVoucher_Response sub-interface for UpdateVoucherResponse
 */
export interface UpdateVoucher_Response {
  /**
   * The unique identifier of the voucher which is being updated.
   */
  voucher_id?: number;
  [key: string]: any;
}
/**
 * Response data payload for update_voucher
 */
export type UpdateVoucherResponseData = UpdateVoucher_Response;
/**
 * Response payload for update_voucher
 *
 * Update voucher
 */
export type UpdateVoucherResponse = FetchResponse<UpdateVoucherResponseData>;
