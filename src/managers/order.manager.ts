import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { Order, GetOrderListParams } from '../schemas/order.js';

export class OrderManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  async getOrderList(params: GetOrderListParams): Promise<Order[]> {
    // TODO: Implement actual API call
    return [];
  }

  async getOrderDetail(orderId: string): Promise<Order | null> {
    // TODO: Implement actual API call
    return null;
  }
} 