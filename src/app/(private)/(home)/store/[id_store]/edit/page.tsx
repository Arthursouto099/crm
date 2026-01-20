/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { StoreSettings } from "@/components/store/store-settings";
import { storeServices } from "@/src/api/services/store.services";
import { StoreModel } from "@/src/api/types/user.types";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export default function EditStore() {
  const { id_store } = useParams<{ id_store: string }>();
  const [store, setStore] = useState<StoreModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const idStore = useMemo(() => {
    const raw = id_store;
    if (!raw) return null;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [id_store]);

  useEffect(() => {
    if (!idStore) return;
    getStore(setStore, setLoading, idStore);
  }, [idStore]);

  return (
    <section className="w-full flex   justify-center h-full">
      <div className="w-6xl">
        {store && <StoreSettings store={store} />}
        
        
        </div>
    
    </section>
  );
}

const getStore = async (
  set: Dispatch<SetStateAction<StoreModel | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  id_store: string
) => {
  try {
    setLoading(true);
    const { data } = await storeServices.getStore(id_store);
    set(data.store);
  } catch (e) {
    set(null);
  } finally {
    setLoading(false);
  }
};

