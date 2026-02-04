import { CustomerModel } from "@/src/api/types/customer.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PaginationComponent } from "@/src/app/(private)/(home)/store/[id_store]/products/page";
import {
  Box,
  LucideSearch,
  X,
  BoxesIcon,
  User,
  FileCheck2,
  CheckCircle,
  AlertCircle,
  LucideDollarSign,
  Coins,
  Phone,
  Users2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { SaleProductsInitialModal } from "./saleProductsModal";

type Props = {
  id_store: string;
  onSuccess?: (p: CustomerModel) => void;
  customers: CustomerModel[];
  /** modo controlado (para usar fora do dropdown) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;

  /** se você quiser usar o trigger como child */
  asChildButton?: boolean;
};

export function SaleInitialModal({
  id_store,
  onSuccess,
  open,
  customers,
  onOpenChange,
  changePageAction,
  page,
  totalPages,
}: Omit<Props, "product"> & {
  totalPages: number;
  page: number;
  changePageAction(page: number): void;
}) {
  const isControlled = typeof open === "boolean" && !!onOpenChange;
  const [targetFill, setTargetFill] = useState<string>("");

  const [customerSelected, setCustomerSelect] = useState<CustomerModel | null>(
    null,
  );

  const filterData =
    targetFill.trim() !== ""
      ? customers.filter((c) =>
          c.name_customer.toLowerCase().includes(targetFill.toLowerCase()),
        )
      : customers;

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
            <LucideDollarSign />
            VENDA
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className=" md:min-w-4xl overflow-auto md:overflow-hidden max-h-[80%] md:max-h-full">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Coins /> QUEM ESTÁ COMPRANDO ?
          </DialogTitle>
          <DialogDescription>Selecione o cliente da venda.</DialogDescription>
        </DialogHeader>

        <div className="relative   flex  gap-4 items-center w-full max-w-md">
          <div className="w-full">
            <LucideSearch className="absolute bg-transparent left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setTargetFill(e.target.value);
              }}
              placeholder="Digite alguma referência..."
              className="pl-9 w-full focus:outline-none focus:ring-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          {customerSelected ? (
            <div className=" text-foreground/70 relative  w-sm  text-xs p-2 rounded-md border-2">
              <h1 className="font-medium text-sm text-foreground">
                Nome: {customerSelected.name_customer}
              </h1>
              <p>email: {customerSelected.email_customer}</p>
              <p>CPF/CNPJ: {customerSelected.document_customer}</p>
              <p>CEP: {customerSelected.mainAddress?.cep ?? "Sem Endereço"}</p>
              <p>
                Cidade: {customerSelected.mainAddress?.city ?? "Sem Endereço"}
              </p>
              <p>UF: {customerSelected.mainAddress?.state ?? "Sem Endereço"}</p>
              <div
                onClick={() => setCustomerSelect(null)}
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
          {filterData.map((c) => (
            <div
              key={c.id_customer}
              onClick={() => {
                if (!c.active) {
                  toast.warning("O cliente precisa estar ativo");
                  return;
                }
                setCustomerSelect(c);
              }}
              className={`hover:bg-accent/40  cursor-pointer border-b p-3`}
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xs flex pb-2 items-center gap-2">
                    {c.active ? (
                      <CheckCircle className="text-green-400" size={13} />
                    ) : (
                      <AlertCircle className="text-red-400" size={13} />
                    )}
                  </h1>

                  <h1 className="font-medium text-sm text-foreground">
                    {c.name_customer.toUpperCase()}
                  </h1>
                  <p className="text-[10px] flex gap-1 items-center text-foreground/60">
                    <User size={12} /> {c.email_customer}
                  </p>
                </div>

                <div className="flex gap-2 flex-col">
                  <h1 className="text-xs flex items-center gap-2">
                    <FileCheck2 size={15} /> {c.document_customer}
                  </h1>
                  <h1 className="text-xs flex items-center gap-2">
                    <Phone size={15} /> {c.phone_customer}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex  items-baseline-last justify-between">
          <div className="">
            <PaginationComponent
              page={page}
              changePageAction={changePageAction}
              totalPages={totalPages}
            />
          </div>
          <div className="flex ">
            {customerSelected && (
              <SaleProductsInitialModal
                id_store={id_store}
                customer={customerSelected!}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
