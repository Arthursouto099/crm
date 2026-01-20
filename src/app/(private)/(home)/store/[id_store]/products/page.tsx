"use client";
import CreateProductModal from "@/components/product/create-product";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/use-products";
import {
  Box,
  LucideSearch,
  PackageSearch,
  SquareArrowUpLeftIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { DataTable } from "./data-table";
import { getProductColumns } from "./columns";
import { ProductModel } from "@/src/api/types/product.types";
import { useState } from "react";

const filterProductListByTarget = (data: ProductModel[], target: string) => {
  if (target.trim() === "") return data;
  return data.filter((p) =>
    p.product_name.toUpperCase().includes(target.toUpperCase())
  );
};

export default function ProductsPage() {
  const [fillTarget, setFillTarget] = useState<string>("");
  const { id_store } = useParams<{ id_store: string }>();
  const { productList, changePageAction, refetch, page, meta } = useProducts({
    id_store: id_store,
  });

  const data = filterProductListByTarget(productList, fillTarget);

  return (
    <section className="w-full   h-full">
      <header className="w-full h-full gap-5 flex items-center justify-between">
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

        <div className="flex items-center    ">
          <CreateProductModal onSuccess={() => refetch()} id_store={id_store} />
        </div>
      </header>

      <div className="mt-5  flex  flex-col  p-5  w-full   rounded-md border-2">
        <div className="flex gap-4 text-foreground/70 text-xs ">
          <div className="flex gap-1   items-center">
            <Box size={17} />
            <h1>Total Produtos: {meta?.total}</h1>
          </div>
          <div className="flex gap-1   items-center">
            <PackageSearch size={17} />
            <h1>Quantidade de páginas: {meta?.totalPages}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center text-xs font-medium gap-2">
            <AlertCircle className="w-6 h-6 bg-destructive/50  p-1 rounded-md" />
            Alerta de estoque baixo
          </div>

          <div className="flex items-center text-xs font-medium gap-2">
            <CheckCircle2 className="w-6 h-6 bg-green-500/50  p-1 rounded-md" />
            Estoque Ok
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="w-full overflow-x-auto m-auto rounded-xl max-w-8xl border border-border">
          <div className="max-w-8xl m-auto">
            <DataTable
              columns={getProductColumns({
                id_store,
                onEdited() {
                  refetch();
                },
                onDelete() {
                  refetch();
                },
              })}
              data={data as ProductModel[]}
            />
          </div>
        </div>
      </div>

      <div className="mt-1 flex justify-center">
        <PaginationComponent
          totalPages={meta?.totalPages ?? 0}
          page={page}
          changePageAction={changePageAction}
        />
      </div>
    </section>
  );
}

interface PaginationComponentProps {
  totalPages: number;
  changePageAction: (page: number) => void;
  page: number;
}

export function PaginationComponent({
  changePageAction,
  page,
  totalPages,
}: PaginationComponentProps) {
  const slots = Array.from({ length: totalPages }, (_, i) => i);
  return (
    <div className="mt-3 flex items-center m-auto gap-3">
      {/* <div
        onClick={() => changePageAction(page - 1)}
        // disabled={loading || page <= 1}
        className="px-4 py-2 justify-center flex items-center  cursor-pointer gap-3 text-foreground/60 text-sm"
      >

       <ArrowLeftCircle/> Anterior
      </div>

      <div className="text-sm text-muted-foreground">
        Página <span className="text-foreground font-medium">{page}</span>
      </div>

      <div
        onClick={() => changePageAction(page + 1)}
        // disabled={loading || page <= 1}
        className="px-4 py-2 justify-center flex items-center gap-3 cursor-pointer text-foreground/60 text-sm"
      >

     Anterior
     <ArrowRightCircleIcon/> */}
      {/* </div> */}

      <div className="flex text-foreground/70 mt-1">
        <div
          onClick={() => {
            if (page != -1) {
              changePageAction(-1);
            }
          }}
          className="h-10 hover:bg-accent/80 text-xs font-medium p-2 cursor-pointer flex justify-center first:rounded-l-md border last:rounded-r-md items-center  bg-accent"
        >
          Anterior
        </div>
        {slots.map((i) => (
          <div
            key={i}
            onClick={() => {
              changePageAction(i + 1);
            }}
            className={`h-10  hover:bg-accent/80 cursor-pointer flex justify-center  border last:rounded-r-md items-center w-10 bg-accent 
              relative
            `}
          >
            {page === i + 1 && (
              <div
                className={`absolute h-6 -top-4 left-0  bg-violet-400/40 rounded-md  `}
              >
                <SquareArrowUpLeftIcon className="w-full p-1 h-full" />
              </div>
            )}

            {i + 1}
          </div>
        ))}
        <div
          onClick={() => {
            if (slots.length > page) {
              changePageAction(page + 1);
            }
          }}
          className="h-10 hover:bg-accent/80 text-xs font-medium p-2 cursor-pointer flex justify-center first:rounded-l-md border last:rounded-r-md items-center  bg-accent"
        >
          Próximo
        </div>
      </div>
    </div>
  );
}
