export interface Product {
  itemId: number;
  itemName: string;
  description: string;
  price: number;
  stock: number;
  status: 'NORMAL' | 'BANNED' | 'DELETED';
}

export interface GetItemListParams {
  offset: number;
  pageSize: number;
  itemStatus?: string;
}

export interface AddItemParams extends Omit<Product, 'itemId' | 'status'> {} 