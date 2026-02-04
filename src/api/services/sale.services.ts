import { api } from "../config/api";
import { CreateSale } from "../types/sale.types";

export const SaleServices = {
  create: (data: CreateSale, {id_customer, id_store}: {id_customer: string, id_store: string}) =>
    api.post(
      `sale/${id_customer}/${id_store}/generate`,
      data,
      { withCredentials: true },
    ),
};
