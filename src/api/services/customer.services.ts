import { api } from "../config/api";
import { createCustomerBase } from "../types/customer.types";
import { Pagination } from "./product.services";

export const CustomersServices = {
  findAll: (id_store: string, pagination?: Pagination) =>
    api.get(`/customer/${id_store}/all`, {
      params: pagination
        ? {
            page: pagination.page,
            limit: pagination.limit,
          }
        : undefined,
      withCredentials: true,
    }),
  create: (data: createCustomerBase, id_store: string) =>
    api.post(`/customer/${id_store}/create`, data, { withCredentials: true }),
  update: (data: createCustomerBase, id_customer: string) =>
    api.patch(`/customer/${id_customer}/edit`, data, { withCredentials: true }),
};
