import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { Order, GetOrderListParams, GetOrderListResponse, GetOrdersDetailParams, GetOrdersDetailResponse } from '../schemas/order.js';
import { ShopeeFetch } from '../fetch.js';

export class OrderManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  async getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse> {
    const response = await ShopeeFetch.fetch<GetOrderListResponse>(this.config, '/order/get_order_list', {
      method: 'GET',
      params,
      auth: true,
    });

    return response;
  }

  async getOrdersDetail(params: GetOrdersDetailParams): Promise<GetOrdersDetailResponse> {
    const response = await ShopeeFetch.fetch<GetOrdersDetailResponse>(this.config, `/order/get_order_detail`, {
      method: 'GET',
      auth: true,
      params: {
        ...params,
        order_sn_list: params.order_sn_list.join(','),
      },
    });

    return response;
  }
} 