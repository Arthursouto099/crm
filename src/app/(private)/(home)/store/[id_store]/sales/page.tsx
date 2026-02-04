"use client";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import useCustomers from "@/hooks/use-customers";
import { SaleInitialModal } from "@/components/sale/saleModal";

export default function SalesPage() {
  const { id_store } = useParams<{ id_store: string }>();
  const { refetch, changePageAction, customersList, meta, page } = useCustomers(
    { id_store },
  );

  const idStore = useMemo(() => {
    const raw = id_store;
    if (!raw) return null;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [id_store]);

  useEffect(() => {
    if (!idStore) return;
  }, [idStore]);

  return (
    <section>
      <div>
        <SaleInitialModal
          changePageAction={changePageAction}
          customers={customersList}
          id_store={idStore}
          page={page}
          totalPages={meta?.totalPages ?? 0}
        />
      </div>
    </section>
  );
}
