import { BaseResponse } from "./base.js";

/**
 * Status of vouchers for filtering in voucher list query
 */
export enum VoucherStatus {
  /** All vouchers regardless of status */
  ALL = "all",
  /** Vouchers that have not started yet */
  UPCOMING = "upcoming",
  /** Currently active vouchers */
  ONGOING = "ongoing",
  /** Vouchers that have ended */
  EXPIRED = "expired",
}

/**
 * Parameters for adding a new voucher
 */
export type AddVoucherParams = {
  /** The name of the voucher */
  voucher_name: string;
  /** The code of the voucher. Only support 0-9 or A-Z or a-z. Up to 5 characters */
  voucher_code: string;
  /** The timing from when the voucher is valid; so buyer is allowed to claim and to use */
  start_time: number;
  /** The timing until when the voucher is still valid */
  end_time: number;
  /** The type of the voucher. 1: shop voucher, 2: product voucher */
  voucher_type: number;
  /** The reward type of the voucher. 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher */
  reward_type: number;
  /** The number of times for this particular voucher could be used */
  usage_quantity: number;
  /** The minimum spend required for using this voucher */
  min_basket_price: number;
  /** The discount amount set for this particular voucher. Only for fix amount voucher */
  discount_amount?: number;
  /** The discount percentage set for this particular voucher. Only for discount percentage or coins cashback voucher */
  percentage?: number;
  /** The max amount of discount/value a user can enjoy by using this particular voucher. Only for discount percentage or coins cashback voucher */
  max_price?: number;
  /** The FE channel where the voucher will be displayed. 1: display_all, 3: feed, 4: live streaming, [] (empty - which is hidden) */
  display_channel_list?: number[];
  /** The list of items which is applicable for the voucher. Only for product type voucher */
  item_id_list?: number[];
  /** The timing of when voucher is displayed on shop pages; so buyer is allowed to claim */
  display_start_time?: number;
};

/**
 * Parameters for deleting a voucher
 */
export type DeleteVoucherParams = {
  /** The unique identifier for the voucher you want to delete */
  voucher_id: number;
};

/**
 * Parameters for ending a voucher immediately
 */
export type EndVoucherParams = {
  /** The unique identifier for the voucher you want to end now */
  voucher_id: number;
};

/**
 * Parameters for updating a voucher
 */
export interface UpdateVoucherParams {
  /** The unique identifier of the voucher which is going to be updated */
  voucher_id: number;
  /** The name of the voucher */
  voucher_name?: string;
  /** The timing from when the voucher is valid; so buyer is allowed to claim and to use. Can only be updated if voucher has not started */
  start_time?: number;
  /** The timing until when the voucher is still valid. For ongoing vouchers, can only be shortened, not extended */
  end_time?: number;
  /** The number of times for this particular voucher could be used. For ongoing vouchers, can only be increased */
  usage_quantity?: number;
  /** The minimum spend required for using this voucher */
  min_basket_price?: number;
  /** The discount amount set for this particular voucher. Only for fix amount voucher */
  discount_amount?: number;
  /** The discount percentage set for this particular voucher. Only for discount percentage or coins cashback voucher */
  percentage?: number;
  /** The max amount of discount/value a user can enjoy by using this particular voucher. Only for discount percentage or coins cashback voucher */
  max_price?: number;
  /** The FE channel where the voucher will be displayed. 1: display_all, 3: feed, 4: live streaming, [] (empty - which is hidden) */
  display_channel_list?: number[];
  /** The list of items which is applicable for the voucher. Only for product type voucher */
  item_id_list?: number[];
  /** The timing of when voucher is displayed on shop pages; so buyer is allowed to claim */
  display_start_time?: number;
}

/**
 * Parameters for getting voucher details
 */
export type GetVoucherParams = {
  /** The unique identifier of a voucher used to query the voucher details */
  voucher_id: number;
};

/**
 * Parameters for getting a list of vouchers
 */
export type GetVoucherListParams = {
  /** The status filter for retrieving voucher list */
  status: VoucherStatus;
  /** Specifies the page number of data to return. Default 1, range 1-5000 */
  page_no?: number;
  /** Maximum number of entries to retrieve per page. Default 20, range 1-100 */
  page_size?: number;
};

/**
 * Voucher information in the list response
 */
export type VoucherInfo = {
  /** The unique identifier for a voucher */
  voucher_id: number;
  /** Voucher Code */
  voucher_code: string;
  /** Voucher Name */
  voucher_name: string;
  /** The type of the voucher. 1: shop voucher, 2: product voucher */
  voucher_type: number;
  /** The reward type of the voucher. 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher */
  reward_type: number;
  /** The number of times for this particular voucher could be used */
  usage_quantity: number;
  /** Up till now, how many times has this particular voucher already been used */
  current_usage: number;
  /** The timing from when the voucher is valid; so buyer is allowed to claim and to use */
  start_time: number;
  /** The timing until when the voucher is still valid */
  end_time: number;
  /** If the voucher is created by Shopee or not */
  is_admin: boolean;
  /** The use case for the voucher. 0: normal, 1: welcome, 2: referral, 3: shop_follow, 4: shop_game, 5: free_gift, 6: membership */
  voucher_purpose: number;
  /** The discount amount set for this particular voucher. Only returned for fix amount voucher */
  discount_amount?: number;
  /** The discount percentage set for this particular voucher. Only returned for discount percentage or coins cashback voucher */
  percentage?: number;
  /** The voucher status in CMT. 1: review, 2: approved, 3: reject. Only returned when attending CMT campaign and not rejected */
  cmt_voucher_status?: number;
  /** The timing of when voucher is displayed on shop pages; so buyer is allowed to claim */
  display_start_time?: number;
  /** New user or repeat buyer voucher indication. 0: regular, 1: new user, 2: repeat buyer with 1 order, 3: repeat buyer with 2 orders */
  target_voucher?: number;
};

/**
 * Response for the add voucher API
 */
export interface AddVoucherResponse extends BaseResponse {
  response: {
    /** The unique identifier for the created voucher */
    voucher_id: number;
  };
}

/**
 * Response for the delete voucher API
 */
export interface DeleteVoucherResponse extends BaseResponse {
  response: {
    /** The unique identifier for the voucher that was deleted */
    voucher_id: number;
  };
}

/**
 * Response for the end voucher API
 */
export interface EndVoucherResponse extends BaseResponse {
  response: {
    /** The unique identifier for the voucher that was ended */
    voucher_id: number;
  };
}

/**
 * Response for the update voucher API
 */
export interface UpdateVoucherResponse extends BaseResponse {
  response: {
    /** The unique identifier of the voucher which was updated */
    voucher_id: number;
  };
}

/**
 * Response for the get voucher API
 */
export interface GetVoucherResponse extends BaseResponse {
  response: {
    /** The unique identifier of the voucher whose details are returned */
    voucher_id: number;
    /** Voucher Code */
    voucher_code: string;
    /** Voucher Name */
    voucher_name: string;
    /** The type of the voucher. 1: shop voucher, 2: product voucher */
    voucher_type: number;
    /** The reward type of the voucher. 1: fix_amount voucher, 2: discount_percentage voucher, 3: coin_cashback voucher */
    reward_type: number;
    /** The number of times for this particular voucher could be used */
    usage_quantity: number;
    /** Up till now, how many times has this particular voucher already been used */
    current_usage: number;
    /** The timing from when the voucher is valid; so buyer is allowed to claim and to use */
    start_time: number;
    /** The timing until when the voucher is still valid */
    end_time: number;
    /** If the voucher is created by Shopee or not */
    is_admin: boolean;
    /** The use case for the voucher. 0: normal, 1: welcome, 2: referral, 3: shop_follow, 4: shop_game, 5: free_gift, 6: membership, 7: Ads */
    voucher_purpose: number;
    /** The FE channel where the voucher will be displayed. 1: display_all, 2: order page, 3: feed, 4: live streaming, [] (empty - which is hidden) */
    display_channel_list: number[];
    /** The minimum spend required for using this voucher */
    min_basket_price: number;
    /** The discount percentage set for this particular voucher. Only returned for discount percentage or coins cashback voucher */
    percentage?: number;
    /** The max amount of discount/value a user can enjoy by using this particular voucher. Only returned for discount percentage or coins cashback voucher */
    max_price?: number;
    /** The discount amount set for this particular voucher. Only returned for fix amount voucher */
    discount_amount?: number;
    /** The voucher status in CMT. 1: review, 2: approved, 3: reject. Only returned when attending CMT campaign and not rejected */
    cmt_voucher_status?: number;
    /** The list of items which is applicable for the voucher. Only returned for product type voucher */
    item_id_list?: number[];
    /** The timing of when voucher is displayed on shop pages; so buyer is allowed to claim */
    display_start_time?: number;
    /** The field to mark voucher type. 1: new user voucher, 2: repeat buyer voucher with 1 order, 3: repeat buyer voucher with 2 orders */
    target_voucher?: number;
    /** Indicates specific business scenario. 1: shop voucher, 2: product voucher, 3: new buyer voucher, 4: repeat buyer voucher, 5: private voucher, 6: live voucher, 7: video voucher, 8: campaign voucher, 9: follow prize voucher, 10: membership voucher, 11: game prize voucher, 12: sample voucher */
    usecase?: number;
  };
}

/**
 * Response for the get voucher list API
 */
export interface GetVoucherListResponse extends BaseResponse {
  response: {
    /** Indicates whether there are more pages of vouchers to retrieve */
    more: boolean;
    /** The list of vouchers matching the query parameters */
    voucher_list: VoucherInfo[];
  };
}
