/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  BoxesIcon,
  LucideSearch,
  PackageMinus,
  PackagePlus,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {  FormEvent, ReactNode, useEffect, useState } from "react";
import { productServices } from "@/src/api/services/product.services";
import { ProductModel } from "@/src/api/types/product.types";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { PaginationComponent } from "@/src/app/(private)/(home)/store/[id_store]/products/page";

type Props = {
  id_store: string;
  product: ProductModel;
  onSuccess?: (p: ProductModel) => void;

  /** modo controlado (para usar fora do dropdown) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;

  /** se você quiser usar o trigger como child */
  asChildButton?: boolean;
};

export default function ProductMovementModal({
  id_store,
  product,
  onSuccess,
  open,
  onOpenChange,
  children,
}: Props & { children: ReactNode }) {
  const isControlled = typeof open === "boolean" && !!onOpenChange;

  return (
    <Dialog open={isControlled ? open : undefined} onOpenChange={onOpenChange}>
      {/* Trigger só aparece no modo NÃO-controlado */}
      {!isControlled && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="overflow-auto md:overflow-hidden max-h-[80%] md:max-h-full">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Box /> Comparação/Ação
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ProductForm
          id_store={id_store}
          product={product}
          onSuccess={(p) => onSuccess?.(p)}
          closeDialog={() => onOpenChange?.(false)} // fecha só no sucesso
        />
      </DialogContent>
    </Dialog>
  );
}

export function ProductMovementInitialModal({
  id_store,
  onSuccess,
  open,
  products,
  onOpenChange,
  changePageAction,
  page,
  totalPages,
}: Omit<Props, "product"> & {
  products: ProductModel[];
  totalPages: number;
  page: number;
  changePageAction(page: number): void;
}) {
  const isControlled = typeof open === "boolean" && !!onOpenChange;
  const [targetFill, setTargetFill] = useState<string>("");

  const [productSelected, setProductSelect] = useState<ProductModel | null>(
    null,
  );

  const filterData =
    targetFill.trim() !== ""
      ? products.filter((p) =>
          p.product_name.toLowerCase().includes(targetFill.toLowerCase()),
        )
      : products;

  if (isControlled) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* conteúdo do modal */}
      </Dialog>
    );
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      {/* Trigger só aparece no modo NÃO-controlado */}
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>
            <Box />
            ENTRADA/SAIDA
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className=" md:min-w-4xl overflow-auto md:overflow-hidden max-h-[80%] md:max-h-full">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Box /> ENTRADA/SAIDA ESTOQUE
          </DialogTitle>
          <DialogDescription>
            Controle a saida e entrada do seu estoque.
          </DialogDescription>
        </DialogHeader>

        <div className="relative  w-full max-w-md">
          <LucideSearch className="absolute bg-transparent left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(e) => {
              setTargetFill(e.target.value);
            }}
            placeholder="Digite alguma referência..."
            className="pl-9 w-full focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
        </div>

        <div>
          {productSelected ? (
            <div className="text-xs text-foreground/70 relative  w-fit p-2 rounded-md border-2">
              <h1> Nome: {productSelected.product_name}</h1>
              <p>Estoque Atual: {productSelected.stock_quantity}</p>
              <div
                onClick={() => setProductSelect(null)}
                className="absolute cursor-pointer -top-3 -right-3 p-1"
              >
                {" "}
                <X size={18} />
              </div>
            </div>
          ) : (
            <div className="text-xs w-fit p-2 rounded-md border-2  text-foreground/70 flex items-center gap-2">
              <Box size={18} /> <h1>Nenhum Produto escolhido</h1>
            </div>
          )}
        </div>

        <div className="flex bg-accent/30  rounded-md flex-col gap-2 h-[400px] overflow-y-auto">
          {filterData.map((p) => (
            <div
              key={p.id_product}
              onClick={() => {
                setProductSelect(p);
              }}
              className=" hover:bg-accent/40 cursor-pointer border-b p-3"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="font-medium text-sm text-foreground">
                    {p.product_name}
                  </h1>
                  <p className="text-[10px] text-foreground/60">
                    {p.product_description}
                  </p>
                </div>

                <div>
                  <h1 className="text-xs flex items-center gap-2">
                    <BoxesIcon size={15} /> {p.stock_quantity}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProductMovementModal
          id_store={id_store}
          asChildButton
          onSuccess={onSuccess}
          product={productSelected!}
        >
          <Button disabled={productSelected !== null ? false : true}>
            {productSelected !== null ? "Continuar" : "Escolha um produto"}
          </Button>
        </ProductMovementModal>

        <div className="-mt-2">
          <PaginationComponent
            page={page}
            changePageAction={changePageAction}
            totalPages={totalPages}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductForm({
  id_store,
  product,
  onSuccess,
  closeDialog,
}: {
  id_store: string;
  product: ProductModel;
  onSuccess?: (p: ProductModel) => void;
  closeDialog?: () => void;
}) {
  const [delta, setDelta] = useState<number | "">("");
  const [entryOrOut, setEntryOrOut] = useState<"entry" | "out">("entry");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) {
      return;
    }
  }, [product]);

  async function onSaveHandle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (!product?.id_product || delta === "") return;
      const { data } = await productServices.movementProduct({
        delta,
        id_product: product?.id_product,
        id_store,
      });
      toast.success("Produto atualizado com sucesso");
      onSuccess?.(data.product);
      closeDialog?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? "Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSaveHandle}
      className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground"
    >
      {/* Descrição */}

      <div className="text-sm border-2 rounded-md p-2 text-foreground/70">
        <Label>Comparação X Estoque</Label>
        <div className="mt-2 flex flex-col">
          <h1>Estoque Atual: {product.stock_quantity}</h1>
          <h1>
            {" "}
            {Number(delta) > 0
              ? "Valor a ser adicionado"
              : "valor a ser retirado"}
            : {typeof delta === "number" ? delta : 0}
          </h1>
          Comparação final:{" "}
          {Number(delta) > 0
            ? product.stock_quantity! + Number(delta)
            : product.stock_quantity! + Number(delta)}
        </div>
      </div>

      <div className="flex gap-1 text-xs font-medium">
        <div
          className={`p-2 border ${entryOrOut === "entry" && "bg-violet-500/40"} h-fit rounded-md cursor-pointer`}
          onClick={() => {
            setEntryOrOut("entry");
            setDelta("");
          }}
        >
          <h1 className={`flex items-center gap-2`}>
            <PackagePlus size={13} /> ENTRADA
          </h1>
        </div>
        <div
          className={`p-2 border h-fit ${entryOrOut === "out" && "bg-violet-500/40"} rounded-md cursor-pointer`}
          onClick={() => {
            setEntryOrOut("out");
            setDelta("");
          }}
        >
          <h1 className={`flex items-center gap-2`}>
            <PackageMinus size={13} /> SAIDA
          </h1>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90">
          Entrada
        </Label>
        <Input
          name="delta"
          step="any"
          disabled={entryOrOut === "out" ? true : false}
          value={delta}
          type="number"
          min={0}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setDelta("");
              return;
            }

            const number = Number(value);
            if (number >= 0) {
              setDelta(number);
            }
          }}
          placeholder="Quantos itens você deseja fazer a entrada? (ex: 6)"
          className="
                rounded-xl
                bg-background
                border border-border/60
                text-foreground
                placeholder:text-muted-foreground
                shadow-sm
                transition-all

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary/30
                focus-visible:border-primary

                hover:border-border
            "
        />
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90">Saída</Label>

        <Input
          name="delta"
          step="any"
          type="number"
          disabled={entryOrOut === "out" ? false : true}
          max={-1}
          value={delta}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setDelta("");
              return;
            }

            const number = Number(value);

            if (number < 0) {
              setDelta(number);
            }
          }}
          placeholder="Digite um valor negativo (ex: -6)"
          className="
      rounded-xl
      bg-background
      border border-border/60
      text-foreground
      placeholder:text-muted-foreground
      shadow-sm
      transition-all

      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-primary/30
      focus-visible:border-primary

      hover:border-border
    "
        />
      </div>

      {/* Rodapé */}
      <div className="col-span-1 md:col-span-2 pt-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end border-t border-border/60 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="rounded-xl">
              Cancelar
            </Button>
          </DialogClose>

          {/* NÃO envolver em DialogClose */}
          <Button type="submit" disabled={loading} className="rounded-xl">
            {loading && <Spinner />}
            Realizar Ação
          </Button>
        </div>
      </div>
    </form>
  );
}
