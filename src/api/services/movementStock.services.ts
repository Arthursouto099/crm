import { Pagination } from "./product.services";
import { api } from "../config/api";


export const movementStockServices = {
  findAll: (id_store: string, pagination?: Pagination) =>
    api.get(`/movement/movements/all/store/${id_store}`, {
      params: pagination
        ? {
            page: pagination.page,
            limit: pagination.limit,
          }
        : undefined,
      withCredentials: true,
    }),
    getEntries: (id_store: string) => api.get(`/movement/metrics/entries/${id_store}`),
    getDepartures: (id_store: string) => api.get(`/movement/metrics/departures/${id_store}`),
    getMetricsByLast30Days: (id_store: string) => api.get(`movement/metrics/30/days/${id_store}`)


}