"use client";

import type { StoreModel } from "@/src/api/types/user.types";
import { useEffect, useState } from "react";
import { storeServices } from "@/src/api/services/store.services";

export default function useStores() {
  const [storeList, setStoreList] = useState<StoreModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function  setStoreDataList() {

    try {
      setLoading(true);
      const { data } = await storeServices.allStores();
      setStoreList(data.stores);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Usuario não logado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 
    setStoreDataList()
  }, []);

  return {
    setStoreDataList,
    setStoreList,
    storeList,
    loading,
    error
  };
}
