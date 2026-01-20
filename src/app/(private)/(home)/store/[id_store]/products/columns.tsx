"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ProductModel } from "@/src/api/types/product.types";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";
import { RowActions } from "@/components/rowActions/RowActions";
import { formatBRL } from "@/utils/formatBRL";



export const toInt = (value: unknown) => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
};

type ColumnsArgs = {
  id_store: string;
  onDelete?: (p: ProductModel) => void;
  onEdited?: (p: ProductModel) => void; // opcional para refetch
};

export function getProductColumns({
  id_store,
  onDelete,
  onEdited,
}: ColumnsArgs): ColumnDef<ProductModel>[] {
  return [
    {
      accessorKey: "id_product",
      header: "ID",
      cell: ({ row }) => (
        <div className="max-w-[40px] truncate font-medium text-xs text-muted-foreground">
          {row.original.id_product}
        </div>
      ),
    },
    {
      accessorKey: "product_image",
      header: () => (
        <span className="text-xs font-semibold text-foreground/60">Imagem</span>
      ),
      cell: ({ row }) => {
        const src = row.getValue("product_image") as string | null;

        return (
          <div className="flex items-center">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-muted/20 shadow-sm">
              {src ? (
                <Image
                  src={src}
                  alt={`Imagem de ${row.getValue("product_name") ?? "produto"}`}
                  fill
                  className="object-cover"
                  sizes="40px"
                  quality={100}
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-foreground/40">
                  <ImageIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        );
      },
      enableSorting: false,
      size: 90,
    },

    {
      accessorKey: "product_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.getValue("product_name");
        const description = row.original.product_description;

        return (
          <div className="max-w-[240px]">
            {/* Nome */}
            <div className="font-medium text-xs truncate  uppercase text-foreground/80 leading-5 line-clamp-1">
              {String(name ?? "—")}
            </div>

            {/* Descrição secundária */}
            {description && (
              <div className="text-xs  truncate text-foreground/50 leading-4 line-clamp-2">
                {description}
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.getValue("category");

        return (
          <div className="min-w-[260px]">
            {/* Nome */}
            <div className="font-medium text-xs uppercase text-foreground/50 leading-5 line-clamp-1">
              {String(name ?? "—")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "product_price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("product_price");

        return (
          <div className="min-w-[260px]">
            {/* Nome */}
            <div className="font-medium text-xs uppercase text-foreground/80 leading-5 line-clamp-1">
              {formatBRL(String(price ?? "—"))}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "stock_quantity",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estoque
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const stock = toInt(row.getValue("stock_quantity"));
        const lowAt = toInt(row.getValue("low_stock_at"));
        const isLow = lowAt > 0 && stock <= lowAt;

        return (
          <div className="flex items-center gap-2">
            <span className="tabular-nums text-xs font-medium">{stock}</span>

            {isLow ? (
              <AlertCircle className="w-4 h-4 bg-destructive/50  p-1 rounded-md" />
            ) : (
              <CheckCircle2 className="w-4 h-4 bg-green-500/50  p-1 rounded-md" />
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "low_stock_at",
      header: () => (
        <span className="text-xs font-semibold text-foreground/60">Alerta</span>
      ),
      cell: ({ row }) => (
        <span className="tabular-nums text-foreground/70">
          {toInt(row.getValue("low_stock_at"))}
        </span>
      ),
      size: 90,
    },

    {
      accessorKey: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <RowActions
          id_store={id_store}
          product={row.original}
          onDelete={(p) => onDelete?.(p)}
          onEdited={(p) => onEdited?.(p)}
        />
      ),
    },
  ];
}
