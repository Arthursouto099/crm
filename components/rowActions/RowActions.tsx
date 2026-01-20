import * as React from "react";
import { ProductModel } from "@/src/api/types/product.types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Pencil, Trash2, ViewIcon } from "lucide-react";
import ProductModal from "@/components/product/create-product";
import { productServices } from "@/src/api/services/product.services";
import { MovementStockModel } from "@/src/api/types/movementStock.types";
import { CustomerModel } from "@/src/api/types/customer.types";
import CustomerCreateModal from "../customer/customerCreateModal";

type Props = {
  id_store: string;
  product: ProductModel;
  onDelete?: (p: ProductModel) => void;
  onEdited?: (p: ProductModel) => void;
};

export function RowActions({ id_store, product, onDelete, onEdited }: Props) {
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-foreground/60">
            Produto
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenEdit(true);
            }}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-2 text-destructive focus:text-destructive cursor-pointer"
            onSelect={async (e) => {
              e.preventDefault();
              const { data } = await productServices.delete(
                product.id_product!,
              );
              onDelete?.(product);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal fora do dropdown: não desmonta quando o menu fecha */}
      <ProductModal
        id_store={id_store}
        product={product}
        open={openEdit}
        onOpenChange={setOpenEdit}
        onSuccess={(p) => onEdited?.(p)}
      />
    </>
  );
}

type PropsMovement = {
  id_store: string;
  movement: MovementStockModel;
};

export function RowActionsMovement({ id_store, movement }: PropsMovement) {
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-foreground/60">
            Historico
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenEdit(true);
            }}
          >
            <ViewIcon className="h-4 w-4" />
            Visualizar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal fora do dropdown: não desmonta quando o menu fecha */}
      {/* <ProductModal
        id_store={id_store}
        product={product}
        open={openEdit}
        onOpenChange={setOpenEdit}
        onSuccess={(p) => onEdited?.(p)}
      /> */}
    </>
  );
}

interface PropsCustomers {
  id_store: string;
  customer: CustomerModel;
  onSuccess: (p: CustomerModel) => void
}

export function RowActionsCustomers({ id_store, customer, onSuccess }: PropsCustomers) {
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-foreground/60">
            Historico
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenEdit(true);
            }}
          >
            <ViewIcon className="h-4 w-4" />
            Visualizar
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenEdit(true);
            }}
          >
            <CustomerCreateModal
              asChildButton
              onSuccess={(p) => onSuccess(p)}
              
              id_store={id_store}
              customer={customer}
            >
              <div className="w-full flex gap-2 items-center">
                <Edit /> Editar
              </div>
            </CustomerCreateModal>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal fora do dropdown: não desmonta quando o menu fecha */}
      {/* <ProductModal
        id_store={id_store}
        product={product}
        open={openEdit}
        onOpenChange={setOpenEdit}
        onSuccess={(p) => onEdited?.(p)}
      /> */}
    </>
  );
}
