"use client";

import { Box, LucideSearch, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { productServices } from "@/src/api/services/product.services";
import { ProductModel } from "@/src/api/types/product.types";
import { toast } from "sonner";
import { PaginationComponent } from "@/src/app/(private)/(home)/store/[id_store]/products/page";
import { CustomerModel } from "@/src/api/types/customer.types";
import useProducts from "@/hooks/use-products";

type Props = {
  id_store: string;
  onSuccess?: (p: ProductModel) => void;
  customer: CustomerModel;

  /** modo controlado (para usar fora do dropdown) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;

  /** se você quiser usar o trigger como child */
  asChildButton?: boolean;
};

export function SaleProductsInitialModal({
  id_store,
  onSuccess,
  open,
  onOpenChange,
  customer,
}: Omit<Props, "product">) {
  const [targetFill, setTargetFill] = useState<string>("");
  const [productSelected, setProductSelect] = useState<ProductModel[]>([]);
  const isControlled = typeof open === "boolean" && !!onOpenChange;
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [productTemp, setProductTemp] = useState<ProductModel | null>(null);
  const [quantity, setQuantity] = useState<number | string>(1);

  const { productList, page, changePageAction, meta } = useProducts({
    id_store,
  });

  const handleDialogOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);

    if (!isOpen) {
      setTargetFill("");
      setProductSelect([]);
      setProductTemp(null);
      setQuantity(1);
      setOpenQuantityModal(false);
    }
  };

  const filterData =
    targetFill.trim() !== ""
      ? productList.filter((p) =>
          p.product_name.toLowerCase().includes(targetFill.toLowerCase()),
        )
      : productList;

  if (isControlled) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* conteúdo do modal */}
      </Dialog>
    );
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      {/* Trigger só aparece no modo NÃO-controlado */}
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>
            <Box />
            Continuar
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className=" md:min-w-4xl overflow-auto md:overflow-hidden max-h-[80%] md:max-h-full">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Box /> PRODUTOS
          </DialogTitle>
          <DialogDescription>Escolha os produtos da venda.</DialogDescription>
        </DialogHeader>

        {openQuantityModal && productTemp && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenQuantityModal(false)}
            />

            {/* Modal */}
            <div className="relative z-10 w-[320px] rounded-xl bg-background p-5 shadow-lg">
              <h2 className="text-sm font-semibold mb-3">
                {productTemp.product_name}
              </h2>

              <label className="text-xs text-muted-foreground">
                Quantidade
              </label>

              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "") {
                    setQuantity("");
                    return;
                  }

                  setQuantity(Number(value));
                }}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setOpenQuantityModal(false)}
                  className="px-3 py-1 text-sm rounded-md border"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    const q = Number(quantity);

                    if (q > productTemp.stock_quantity!) {
                      toast.warning("Estoque insuficiente");
                      setOpenQuantityModal(false);
                      return;
                    }

                    setProductSelect((prev) => [
                      ...prev,
                      { ...productTemp, quantity: q },
                    ]);

                    setOpenQuantityModal(false);
                  }}
                  className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

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

        <div className=" flex gap-2 flex-wrap w-full">
          {productSelected && productSelected.length > 0 ? (
            productSelected.map((p) => (
              <div
                key={p.id_product}
                className="text-xs text-foreground/70 relative  w-fit p-2 rounded-md border-2"
              >
                <h1 className="font-medium text-sm  text-foreground">
                  {" "}
                  Nome: {p.product_name}
                </h1>
                <p>Estoque Atual: {p.stock_quantity}</p>
                <p>Quantidade: {p.quantity}</p>
                <p className="text-xs font-semibold text-emerald-600">
                  Valor Unitário: R$ {p.product_price}
                </p>
                <p className="text-xs font-semibold text-emerald-400">
                  Valor Total: R$ {(p.product_price * p.quantity!).toFixed(2)}
                </p>
                <div
                  onClick={() =>
                    setProductSelect((prev) =>
                      prev.filter((pd) => pd.id_product !== p.id_product),
                    )
                  }
                  className="absolute cursor-pointer -top-3 -right-3 p-1"
                >
                  {" "}
                  <X size={18} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs w-fit p-2 rounded-md border-2  text-foreground/70 flex items-center gap-2">
              <Box size={18} /> <h1>Nenhum Produto escolhido</h1>
            </div>
          )}
        </div>

        <div className="flex bg-accent/30 w-full rounded-md flex-col  h-[400px] overflow-y-auto">
          {filterData.map((p) => (
            <div
              key={p.id_product}
              onClick={() => {
                if (
                  productSelected.find((pd) => pd.id_product === p.id_product)
                )
                  return;

                setProductTemp(p);
                setQuantity(1);
                setOpenQuantityModal(true);
              }}
              className="relative w-full hover:bg-accent/40 cursor-pointer border-b p-3"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="font-medium text-sm  text-foreground">
                    {p.product_name}
                  </h1>
                  <p className="text-[10px] text-foreground/60">
                    {p.product_description}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className=" flex items-center text-xs font-semibold text-emerald-400 ">
                    Preço: R$ {p.product_price}
                  </h1>
                  <h1 className=" flex items-center text-xs font-semibold  ">
                    Quantidade: {p.stock_quantity}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <ProductMovementModal
          id_store={id_store}
          asChildButton
          onSuccess={onSuccess}
          product={productSelected!}
        >
          <Button disabled={productSelected !== null ? false : true}>
            {productSelected !== null ? "Continuar" : "Escolha um produto"}
          </Button>
        </ProductMovementModal> */}

        <div className="-mt-2">
          <PaginationComponent
            page={page}
            changePageAction={changePageAction}
            totalPages={meta?.totalPages ?? 0}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
