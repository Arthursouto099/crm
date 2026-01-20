import { CustomerModel } from "@/src/api/types/customer.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ReactNode } from "react";
import { Label } from "../ui/label";
import {
  AlertCircle,
  CircleCheck,
  FileBadge,
  IdCard,
  Phone,
  Send,
  Tag,
  User2,
} from "lucide-react";
import { EmptyAddress } from "../empyts/store";

interface CustomerVisualizerProps {
  customer: CustomerModel;
  isChildren?: boolean;
  children?: ReactNode;
}

export default function CustomerVisualizerModal({
  customer,
  isChildren = false,
  children,
}: CustomerVisualizerProps) {
  return (
    <Dialog>
      {isChildren && children ? (
        <DialogTrigger asChild>
          <span className="inline-flex">{children}</span>
        </DialogTrigger>
      ) : (
        <DialogTrigger>
          <h1>teste</h1>
        </DialogTrigger>
      )}

      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Visualização do cliente/endereços</DialogTitle>
          <DialogDescription>
            Visualização de todas as informações do cliente
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2">
            {/* Nome */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <User2 className="h-4 w-4" /> Nome
              </Label>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                {customer.name_customer || "—"}
              </p>
            </div>

            {/* Documento */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <FileBadge className="h-4 w-4" /> Documento
              </Label>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                {customer.document_customer || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Send className="h-4 w-4" /> Email
              </Label>
              <p className="mt-1 break-all text-sm font-semibold leading-snug text-foreground">
                {customer.email_customer || "—"}
              </p>
            </div>

            {/* Telefone */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Phone className="h-4 w-4" /> Telefone
              </Label>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                {customer.phone_customer || "—"}
              </p>
            </div>

            {/* Tipo */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Tag className="h-4 w-4" /> Tipo
              </Label>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium">
                  {customer.type || "—"}
                </span>

                <span className="text-xs text-muted-foreground">
                  {customer.type === "PF"
                    ? "Pessoa física"
                    : customer.type === "PJ"
                      ? "Pessoa jurídica"
                      : ""}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-xl border bg-background/50 p-4 shadow-sm">
              <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                {customer.active ? (
                  <CircleCheck className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                Status
              </Label>

              <div className="mt-2">
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                    customer.active
                      ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-700 border-rose-500/20",
                  ].join(" ")}
                >
                  {customer.active ? "Ativo" : "Desativado"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl w-2xl border border-violet-500/30 bg-background/60 p-5 shadow-sm">
            {customer.addresses.length < 1 || !customer.mainAddress ? (
              <EmptyAddress />
            ) : (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      Endereço
                    </Label>
                    <h3 className="mt-1 text-base font-semibold text-foreground">
                      Endereço principal
                    </h3>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-700">
                    Principal
                  </span>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      CEP
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.cep || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      Rua
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.street || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      Número
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.number || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      Complemento
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.complement || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      Cidade
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.city || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3">
                    <Label className="text-[11px] text-muted-foreground">
                      Estado
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.state || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/40 p-3 sm:col-span-2">
                    <Label className="text-[11px] text-muted-foreground">
                      País
                    </Label>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {customer.mainAddress.country || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
