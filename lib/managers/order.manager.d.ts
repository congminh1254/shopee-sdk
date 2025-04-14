import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { GetOrderListParams, GetOrderListResponse, GetOrdersDetailParams, GetOrdersDetailResponse } from '../schemas/order.js';
export declare class OrderManager extends BaseManager {
    constructor(config: ShopeeConfig);
    getOrderList(params: GetOrderListParams): Promise<GetOrderListResponse>;
    getOrdersDetail(params: GetOrdersDetailParams): Promise<GetOrdersDetailResponse>;
}
