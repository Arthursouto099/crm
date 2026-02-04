"use client";
import useAuthContext from "@/hooks/use-auth";
import useCustomers from "@/hooks/use-customers";
import { useParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { PaginationComponent } from "../products/page";
import { DataTable } from "./data-table";
import { getCustomersColumns } from "./columns";
import CustomerCreateModal from "@/components/customer/customerCreateModal";
import { LucideSearch } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CustomersPage() {
  const [filterTarget, setFillTarget] = useState<string>("");
  const { id_store } = useParams<{ id_store: string }>();
  const { customersList, changePageAction, page, meta, refetch } = useCustomers(
    { id_store },
  );

  const map =
    filterTarget.trim() !== ""
      ? customersList.filter((c) => {
          if (
            c.name_customer
              .toLowerCase()
              .includes(filterTarget.toLowerCase()) ||
            c.document_customer.includes(filterTarget) ||
            c.phone_customer?.includes(filterTarget) ||
            c.email_customer?.includes(filterTarget)
          ) {
            return c;
          }
        })
      : customersList;

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
        <div className="py-5 w-full flex justify-between gap-3 items-center">
          <div className="relative w-full max-w-md">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setFillTarget(e.target.value);
              }}
              placeholder="Digite alguma referência..."
              className="pl-9 w-full"
            />
          </div>
          <CustomerCreateModal onSuccess={refetch} id_store={idStore} />
        </div>
        <div className="w-full overflow-x-auto m-auto rounded-xl max-w-8xl border border-border">
          <div className="max-w-8xl m-auto">
            <DataTable
              data={map}
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
