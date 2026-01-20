"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerModel } from "@/src/api/types/customer.types";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  FileText,
  Tag,
  User,
  Edit,
  Phone,
} from "lucide-react";
import CustomerVisualizerModal from "@/components/customer/customerVisualizerModal";
import { RowActionsCustomers } from "@/components/rowActions/RowActions";

type ColumnsArgs = {
  id_store: string;
  onDelete?: (c: CustomerModel) => void;
  onEdited?: (c: CustomerModel) => void;
};

export function getCustomersColumns({
  id_store,
  onDelete,
  onEdited,
}: ColumnsArgs): ColumnDef<CustomerModel>[] {
  return [
    /* ===================== ID ===================== */
    {
      accessorKey: "id_customer",
      header: "ID",
      cell: ({ row }) => (
        <div className="max-w-[60px] truncate text-xs font-medium text-muted-foreground">
          {row.original.id_customer}
        </div>
      ),
    },

    /* ===================== NOME ===================== */
    {
      accessorKey: "name_customer",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-60">
          <div className="text-xs font-medium uppercase truncate text-foreground/80">
            {row.original.name_customer ?? "—"}
          </div>
        </div>
      ),
    },

    /* ===================== RESPONSÁVEL ===================== */
    {
      accessorKey: "email_customer",
      header: "Responsável",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 max-w-[80%] text-xs text-foreground/60">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="truncate">{row.original.email_customer ?? "—"}</span>
        </div>
      ),
    },

    /* ===================== DOCUMENTO ===================== */
    {
      accessorKey: "document_customer",
      header: "Documento",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 min-w-[220px] text-xs text-foreground/70">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="truncate">
            {row.original.document_customer ?? "—"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "phone_customer",
      header: "Telefone",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 min-w-[220px] text-xs text-foreground/70">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="truncate">{row.original.phone_customer ?? "—"}</span>
        </div>
      ),
    },

    /* ===================== TIPO ===================== */
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs text-foreground/70">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="uppercase">{row.original.type ?? "—"}</span>
        </div>
      ),
    },

    /* ===================== STATUS ===================== */
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const active = row.original.active;

        return (
          <div className="flex items-center gap-2 text-xs font-medium">
            {active ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600">Ativo</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Inativo</span>
              </>
            )}
          </div>
        );
      },
    },

    /* ===================== AÇÕES ===================== */
    {
      id: "visualizer",
      header: "Vizualizar",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          asChild
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <CustomerVisualizerModal customer={row.original} isChildren={true}>
            <div className="w-full h-full cursor-pointer">
              <Eye className="h-4 w-4" />
            </div>
          </CustomerVisualizerModal>
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => {
            console.log("Visualizar cliente:", row.original.id_customer);
          }}
        >
          <RowActionsCustomers
            onSuccess={(p) => onEdited?.(p)}
            customer={row.original}
            id_store={id_store}
            key={row.original.id_customer}
          />
        </Button>
      ),
    },
  ];
}
