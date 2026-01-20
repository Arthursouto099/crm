import { ProductModel } from "./product.types";
import { StoreModel, UserModel } from "./user.types";

export type MovementStockModel = {
  id_movementStock: string;
  id_store: string;
  id_user: string;
  id_product: string;
  createdAt: Date;
  quantity: number;
  typeMovement: "ENTRADA" | "SAIDA" | "AJUSTE";
  product: ProductModel
  user: Pick<UserModel, "email" | "id_user" | "name">
  store: Pick<StoreModel, "id_store" | "store_name">
};
