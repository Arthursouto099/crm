export type ProductModel = {
    createdAt: Date | null;
    updatedAt: Date | null;
    id_store: string  | null;
    id_product: string | null;
    product_name: string;
    product_description: string;
     
    product_price: number;
    sizeMl: number | null;
    product_image: string | null;
    stock_quantity: number | null;
    low_stock_at: number | null;
    category: string
}