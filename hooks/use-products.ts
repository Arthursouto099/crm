"use client";

import { useCallback, useEffect, useState } from "react";
import { ProductModel } from "@/src/api/types/product.types";
import { productServices } from "@/src/api/services/product.services";

type UseProductsProps = {
  id_store: string;
};

export default function useProducts({ id_store }: UseProductsProps) {
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 20;

  const setProductDataList = useCallback(async () => {
    if (!id_store) return;

    try {
      setLoading(true);
      const { data } = await productServices.findAll(id_store, { page, limit });
      setProductList(data.products.data ?? []);
      setMeta(data.products.meta)
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
    setProductDataList();
  }, [setProductDataList]);

  return {
    page,
    limit,
    changePageAction,
    refetch: setProductDataList,
    setProductList,
    productList,
    loading,
    error,
    meta
  };
}
