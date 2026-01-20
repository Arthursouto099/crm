"use client";

import { useCallback, useEffect, useState } from "react";
import { MovementStockModel } from "@/src/api/types/movementStock.types";
import { movementStockServices } from "@/src/api/services/movementStock.services";

type UseProductsProps = {
  id_store: string;
};

export default function useMovements({ id_store }: UseProductsProps) {
  const [movementsList, setMovementList] = useState<MovementStockModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const limit = 50;

  const setMovementDataList = useCallback(async () => {
    if (!id_store) return;

    try {
      setLoading(true);
      const { data } = await movementStockServices.findAll(id_store, { page, limit });
      setMovementList(data.movements.data ?? []);
      setMeta(data.movements.meta)
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
    setMovementDataList();
  }, [setMovementDataList]);

  return {
    page,
    limit,
    changePageAction,
    refetch: setMovementDataList,
    setMovementList,
    movementsList,
    loading,
    error,
    meta
  };
}
