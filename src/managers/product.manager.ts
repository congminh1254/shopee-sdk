import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { Product, GetItemListParams, AddItemParams } from '../schemas/product.js';
import { Category, GetCategoryParams } from '../schemas/category.js';

export class ProductManager extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }

  async getItemList(params: GetItemListParams): Promise<Product[]> {
    // TODO: Implement actual API call
    return [];
  }

  async getItemDetail(itemId: number): Promise<Product | null> {
    // TODO: Implement actual API call
    return null;
  }

  async addItem(product: AddItemParams): Promise<number> {
    // TODO: Implement actual API call
    return 0;
  }

  async getCategory(params?: GetCategoryParams): Promise<Category[]> {
    // TODO: Implement actual API call
    return [];
  }
} 