"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  RowActionsMovement,
} from "@/components/rowActions/RowActions";
import { MovementStockModel } from "@/src/api/types/movementStock.types";


type ColumnsArgs = {
  id_store: string;
};

export function getMovementStockColumns({
  id_store,
}: ColumnsArgs): ColumnDef<MovementStockModel>[] {
  return [
    {
      accessorKey: "id_product",
      header: "ID",
      cell: ({ row }) => (
        <div className="max-w-10 truncate font-medium text-xs text-muted-foreground">
          {row.original.id_movementStock}
        </div>
      ),
    },

    {
      accessorKey: "product_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.original.product.product_name;

        return (
          <div className="max-w-60">
            {/* Nome */}
            <div className="font-medium text-xs truncate  uppercase text-foreground/80 leading-5 line-clamp-1">
              {String(name ?? "—")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "User",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsável
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.original.user.name;

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
      accessorKey: "Quantidade",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.original.quantity;

        return (
          <div className="min-w-[260px]">
            {/* Nome */}
            <div
              className={`font-medium ${
                Number(name) < 1
                  ? "text-red-400"
                  : row.original.typeMovement === "ENTRADA" && name > 0
                  ? "text-green-400"
                  : "text-violet-400"
              } ${
                row.original.typeMovement === "AJUSTE" && "text-blue-400"
              } text-xs uppercase text-foreground/50 leading-5 line-clamp-1`}
            >
              {row.original.typeMovement === "ENTRADA" && "+"}
              {String(name ?? "—")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "Comparacao",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comparação
        </Button>
      ),
      cell: ({ row }) => {
        const { typeMovement, quantity, product } = row.original;

        const finalStock = product.stock_quantity;
        const delta = quantity;

    
        const previous = typeMovement !== "AJUSTE" ? finalStock! - delta : null;

        const sign =
          typeMovement === "ENTRADA"
            ? `+${delta}`
            : typeMovement === "SAIDA"
            ? `${delta}`
            : "";

       return <div className="flex items-center gap-2 text-xs font-medium">
          {typeMovement !== "AJUSTE" ? (
            <>
              <span className="text-muted-foreground">{previous}</span>
              <span>→</span>
              <span className="text-foreground">{finalStock}</span>
              <span
                className={
                  typeMovement === "ENTRADA" ? "text-green-400" : "text-red-400"
                }
              >
                ({sign})
              </span>
            </>
          ) : (
            <div>
            
                 <span className="text-yellow-400">Ajuste nas informações</span>
             
           
            </div>
          )}
        </div>;

        
      },
    },

    {
      accessorKey: "Estoque final",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estoque Final
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const { stock_quantity } = row.original.product;

        return (
          <div className="min-w-[260px]">
            {/* Nome */}
            <div className="font-medium text-xs uppercase text-foreground/50 leading-5 line-clamp-1">
              {String(stock_quantity ?? "—")}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "TIPO",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de ação
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.original.typeMovement;

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
      accessorKey: "DATA",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="h-8 px-2 -ml-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data da ação
          {/* <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;

        if (!createdAt) {
          return <span className="text-muted-foreground">—</span>;
        }

        const date = new Date(createdAt);

        const formattedDate = date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div className="min-w-[260px] leading-tight">
            <div className="font-medium text-sm text-foreground">
              {formattedDate}
            </div>
            <div className="text-xs text-muted-foreground">
              às {formattedTime}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "Visualizar",
      id: "actions",
      cell: ({ row }) => (
        <RowActionsMovement id_store={id_store} movement={row.original} />
      ),
    },
  ];
}
