"use client";
import { ProductMovementInitialModal } from "@/components/product/entry-product";
import useProducts from "@/hooks/use-products";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { DataTable } from "./data-table";
import useMovements from "@/hooks/use-movements";
import { getMovementStockColumns } from "./columns";
import { PaginationComponent } from "../products/page";

export default function EnrtryPage() {
  const { id_store } = useParams<{ id_store: string }>();
  const { productList, changePageAction, refetch, page, meta } = useProducts({
    id_store: id_store,
  });
  const movements = useMovements({
    id_store: id_store,
  });

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
      <ProductMovementInitialModal
        onSuccess={async () => {
          await refetch();
          await movements.refetch();
        }}
        changePageAction={changePageAction}
        page={page}
        totalPages={meta?.totalPages ?? 10}
        id_store={id_store}
        products={productList}
      />

      <div className="mt-5 w-full">
        <div className="w-full overflow-x-auto m-auto rounded-xl max-w-8xl border border-border">
          <div className="max-w-8xl m-auto">
            <DataTable
              data={movements.movementsList}
              columns={getMovementStockColumns({
                id_store
              })}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <PaginationComponent
          changePageAction={movements.changePageAction}
          page={movements.page}
          totalPages={movements.meta?.totalPages ?? 0}
        />
      </div>
    </section>
  );
}
