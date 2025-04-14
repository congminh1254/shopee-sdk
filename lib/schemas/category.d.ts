export interface Category {
    category_id: number;
    parent_category_id: number;
    original_category_name: string;
    display_category_name: string;
    has_children: boolean;
    children?: Category[];
}
export interface GetCategoryParams {
    language?: string;
    shopId?: number;
}
