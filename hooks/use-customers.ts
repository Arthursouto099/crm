"use client";

import { useCallback, useEffect, useState } from "react";
import { CustomerModel } from "@/src/api/types/customer.types";
import { CustomersServices } from "@/src/api/services/customer.services";

type UseCustomerProps = {
  id_store: string;
};

export default function useCustomers({ id_store }: UseCustomerProps) {
  const [customersList, setCustomersList] = useState<CustomerModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 25;

  const setCustomersDataList = useCallback(async () => {
    if (!id_store) return;

    try {
      setLoading(true);
      const { data } = await CustomersServices.findAll(id_store, {
        page,
        limit,
      });
      setCustomersList(data.customers.list ?? []);
      setMeta(data.meta);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Se você usa axios, dá para diferenciar 401/403/500
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        setError("Usuário não logado");
      } else {
        setError("Falha ao carregar produtos");
      }
    } finally {
      setLoading(false);
    }
  }, [id_store, page]);

  const changePageAction = useCallback((page: number) => {
    // evita página inválida

    setPage(Math.max(1, page));
  }, []);

  // Recarrega quando page ou id_store mudar
  useEffect(() => {
    setCustomersDataList();
  }, [setCustomersDataList]);

  return {
    page,
    limit,
    changePageAction,
    refetch: setCustomersDataList,
    setCustomersList,
    customersList,
    loading,
    error,
    meta,
  };
}
