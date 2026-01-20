"use client";
import useAuthContext from "@/hooks/use-auth";
import useCustomers from "@/hooks/use-customers";
import { useParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import { PaginationComponent } from "../products/page";
import { DataTable } from "./data-table";
import { getCustomersColumns } from "./columns";
import CustomerCreateModal from "@/components/customer/customerCreateModal";

export default function CustomersPage() {
  const { id_store } = useParams<{ id_store: string }>();
  const { user } = useAuthContext();
  const { customersList, changePageAction, page, meta, refetch } = useCustomers(
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
      <div className="mt-5 w-full">
        <div className="py-5 w-full">
          <CustomerCreateModal id_store={idStore} />
        </div>
        <div className="w-full overflow-x-auto m-auto rounded-xl max-w-8xl border border-border">
          <div className="max-w-8xl m-auto">
            <DataTable
              data={customersList}
              columns={getCustomersColumns({
                id_store,
                onEdited() {
                  refetch();
                },
                onDelete() {
                  refetch();
                },
              })}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <PaginationComponent
          changePageAction={changePageAction}
          page={page}
          totalPages={meta?.totalPages ?? 0}
        />
      </div>
    </section>
  );
}
