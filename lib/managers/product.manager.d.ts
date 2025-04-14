import { BaseManager } from './base.manager.js';
import { ShopeeConfig } from '../sdk.js';
import { Product, GetItemListParams, AddItemParams } from '../schemas/product.js';
import { Category, GetCategoryParams } from '../schemas/category.js';
export declare class ProductManager extends BaseManager {
    constructor(config: ShopeeConfig);
    getItemList(params: GetItemListParams): Promise<Product[]>;
    getItemDetail(itemId: number): Promise<Product | null>;
    addItem(product: AddItemParams): Promise<number>;
    getCategory(params?: GetCategoryParams): Promise<Category[]>;
}
