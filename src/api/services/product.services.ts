import { api } from "../config/api";
import { ProductModel } from "../types/product.types";

export type Pagination = {
  page: number;
  limit: number;
};

type MovementRequest = {
  id_product: string;
  id_store: string;
  delta: number;
};

export const productServices = {
  findAll: (id_store: string, pagination?: Pagination) =>
    api.get(`/products/all/${id_store}`, {
      params: pagination
        ? {
            page: pagination.page,
            limit: pagination.limit,
          }
        : undefined,
      withCredentials: true,
    }),
  create: (data: Partial<ProductModel>, id_store: string) =>
    api.post(`/products/create/${id_store}`, data, { withCredentials: true }),
  update: (data: Partial<ProductModel>, id_store: string, id_product: string) =>
    api.put(`/products/edit/product/${id_product}/store/${id_store}`, data, {
      withCredentials: true,
    }),
  delete: (id_product: string) =>
    api.delete(`/products/product/${id_product}`, { withCredentials: true }),
  movementProduct: (movementReq: MovementRequest) =>
    api.patch(
      `/products/movement/product/${movementReq.id_product}/store/${movementReq.id_store}`,
      { delta: movementReq.delta },
      { withCredentials: true }
    ),
};
