import { ProductManager } from './managers/product.manager.js';
import { OrderManager } from './managers/order.manager.js';

export interface ShopeeConfig {
  partnerId: number;
  partnerKey: string;
  baseUrl?: string;
}

export class ShopeeSDK {
  private config: ShopeeConfig;
  public readonly product: ProductManager;
  public readonly order: OrderManager;

  constructor(config: ShopeeConfig) {
    this.config = {
      baseUrl: 'https://partner.shopeemobile.com/api/v2',
      ...config
    };

    // Initialize managers
    this.product = new ProductManager(this.config);
    this.order = new OrderManager(this.config);
  }

  public getConfig(): ShopeeConfig {
    return this.config;
  }
}

export default ShopeeSDK; 