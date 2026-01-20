"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  emptyText?: string;
  className?: string;

  /** deixa a tabela mais compacta */
  dense?: boolean;
  /** aplica “zebra” (linhas alternadas) */
  striped?: boolean;

  /** clique na linha (ex.: abrir edição) */
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyText = "Nenhum registro encontrado.",
  className,
  dense = false,
  striped = true,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl  border border-border/70 bg-accent/20 shadow-sm",
        className
      )}
    >
      <div className="w-full overflow-auto">
        <Table className="w-full md:table-fixed ">
          <TableHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-border/70 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-9 px-2 text-xs font-semibold text-foreground/60",
                      "first:pl-10 last:pr-1"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                  className={cn(
                    "border-b border-border/60 transition-colors",
                    "hover:bg-muted/30 data-[state=selected]:bg-muted/40",
                    striped && idx % 2 === 1 && "bg-muted/40",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "text-sm text-foreground",
                        dense ? "px-2 py-0.5" : "px-3 py-1",
                        
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent ">
                <TableCell colSpan={columns.length} className="p-10 ">
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
                    <div className="grid h-11 w-11 place-items-center rounded-full border bg-muted/30 text-foreground/60">
                      <SearchX className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {emptyText}
                    </div>
                    <div className="text-xs text-foreground/50">
                      Tente ajustar filtros ou adicionar um novo item.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* “borda” inferior discreta quando há scroll horizontal */}
      <div className="h-px bg-border/60" />
    </div>
  );
}
