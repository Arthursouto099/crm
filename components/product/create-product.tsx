/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertCircle,
  Box,
  BoxesIcon,
  CircleDollarSignIcon,
  ImagesIcon,
  Pencil,
  Plus,
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
import { Textarea } from "../ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { productServices } from "@/src/api/services/product.services";
import { ProductModel } from "@/src/api/types/product.types";
import { toast } from "sonner";
import { upload } from "@/utils/uploads";
import useAuthContext from "@/hooks/use-auth";
import Image from "next/image";
import { Spinner } from "../ui/spinner";

type Props = {
  id_store: string;
  product?: ProductModel | null;
  onSuccess?: (p: ProductModel) => void;

  /** modo controlado (para usar fora do dropdown) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;

  /** se você quiser usar o trigger como child */
  asChildButton?: boolean;
};

export default function ProductModal({
  id_store,
  product,
  onSuccess,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!product?.id_product;

  const isControlled = typeof open === "boolean" && !!onOpenChange;

  return (
    <Dialog open={isControlled ? open : undefined} onOpenChange={onOpenChange}>
      {/* Trigger só aparece no modo NÃO-controlado */}
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant={isEdit ? "secondary" : "default"}>
            {isEdit ? (
              <>
                <Pencil className="h-4 w-4" />
                Editar
              </>
            ) : (
               <h1 className="flex items-center gap-2"> <Plus/> Adicionar Produto </h1>
            )}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="overflow-auto md:overflow-hidden max-h-[80%] md:max-h-full">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Box /> {isEdit ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Atualize as informações do produto"
              : "Adicionando informações do produto"}
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          id_store={id_store}
          product={product ?? null}
          onSuccess={(p) => onSuccess?.(p)}
          closeDialog={() => onOpenChange?.(false)} // fecha só no sucesso
        />
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
  product: ProductModel | null;
  onSuccess?: (p: ProductModel) => void;
  closeDialog?: () => void;
}) {
  const { user } = useAuthContext();
  const isEdit = !!product?.id_product;

  const [product_image_up, setProductImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [lowStockAt, setLowStockAt] = useState<number | "">("");
  const [category, setCategory] = useState<string>("")

  useEffect(() => {
    if (!product) {
      setName("");
      setPrice("");
      setDesc("");
      setStock("");
      setLowStockAt("");
      setPreview(null);
      setCategory("")
      setProductImage(null);
      return;
    }

    setName(product.product_name ?? "");
    setPrice(
      typeof product.product_price === "string" ? product.product_price : ""
    );
    setDesc(product.product_description ?? "");
    setStock(
      typeof product.stock_quantity === "number" ? product.stock_quantity : ""
    );
    setLowStockAt(typeof product.low_stock_at === "number" ? product.low_stock_at : "");
    setPreview(product.product_image ?? null);
    setProductImage(null);
    setCategory(product.category)
  }, [product]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function onSaveHandle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const uploaded =
        product_image_up && user?.id_user
          ? await upload(product_image_up, user.id_user as string, "products")
          : null;

      const finalImage =
        uploaded?.publicUrl ?? (isEdit ? product?.product_image ?? null : null);

      const payload: Partial<ProductModel> = {
        product_name: name.trim(),
        product_description: desc.trim(),
        product_price: Number(price || 0),
        low_stock_at: Number(lowStockAt || 0),
        stock_quantity: Number(stock || 0),
        product_image: finalImage ?? undefined,
        category: category
      };

      if (isEdit && product) {
        const { data } = await productServices.update(payload,  id_store, product.id_product!);
        toast.success("Produto atualizado com sucesso");
        onSuccess?.(data.product);
      } else {
        const { data } = await productServices.create(payload, id_store);
        toast.success("Produto adicionado com sucesso");
        onSuccess?.(data.product);
      }

      // fecha somente no sucesso
      closeDialog?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? "Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  function handleChangeLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setProductImage(file);
  }

  return (
    <form
      onSubmit={onSaveHandle}
      className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground"
    >
      {/* Nome */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90">
          Nome do Produto
        </Label>
        <Input
          name="product_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: Chocolate Garoto"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Preço */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <CircleDollarSignIcon size={16} className="text-foreground/60" />
          Preço do Produto
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground/45 select-none">
            R$
          </span>
          <Input
            type="number"
            inputMode="decimal"
            name="product_price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="h-11 pl-10 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90">
          Descrição do Produto
        </Label>
        <Textarea
          name="product_description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Descreva características, tamanho, unidade, observações..."
          className="min-h-[120px] bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm resize-y"
        />
      </div>

      {/* Estoque */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <BoxesIcon size={16} className="text-foreground/60" />
          Estoque {isEdit ? "atual" : "inicial"}
        </Label>
        <Input
          name="stock_quantity"
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
          placeholder="0"
        />
      </div>

      {/* Alerta baixo estoque */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <AlertCircle size={16} className="text-foreground/60" />
          Alertar baixo estoque
        </Label>
        <Input
          name="low_stock_at"
          type="number"
          value={lowStockAt}
          onChange={(e) =>
            setLowStockAt(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
          placeholder="ex: 5"
        />
      </div>

        <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90">
          Categoria do Produto
        </Label>
        <Input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="ex: Doces"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Foto */}
      <div className="space-y-2 col-span-1 md:col-span-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <ImagesIcon className="h-4 w-4 text-muted-foreground" />
          Foto do Produto
        </Label>

        <Input onChange={handleChangeLogo} type="file" accept="image/*" />

        {preview ? (
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-background shadow-sm">
              <Image
                src={preview}
                alt="Pré-visualização do produto"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {isEdit ? "Imagem atual / nova prévia" : "Prévia do produto"}
            </div>
          </div>
        ) : null}
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
            {isEdit ? "Salvar alterações" : "Salvar Produto"}
          </Button>
        </div>
      </div>
    </form>
  );
}
