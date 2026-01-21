import { api } from "../config/api";
import {
  createAddressBase,
  createCustomerBase,
  editAddressBase,
} from "../types/customer.types";
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
  update: (data: createCustomerBase, id_customer: string, id_store: string) =>
    api.patch(`/customer/${id_store}/${id_customer}/edit`, data, { withCredentials: true }),

  updateAddress: (data: Partial<editAddressBase>, id_customerAddress: string, id_store: string) =>
    api.patch(`/customer/${id_store}/${id_customerAddress}/address/edit`, data, {
      withCredentials: true,
    }),

  createAddress: (data: createAddressBase, id_store: string) =>
    api.post(`/customer/${id_store}/address/create`, data, { withCredentials: true }),

  deleteCustomer: (id_customer: string , id_store: string) =>
    api.delete(`/customer/${id_store}/${id_customer}/delete`, { withCredentials: true }),
};
