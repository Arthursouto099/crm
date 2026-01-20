/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlertCircle, Box, Pencil, Plus } from "lucide-react";
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
import { toast } from "sonner";
import {
  createCustomerBase,
  CustomerModel,
} from "@/src/api/types/customer.types";

type Props = {
  id_store: string;
  customer?: CustomerModel | null;
  onSuccess?: (p: CustomerModel) => void;

  /** modo controlado (para usar fora do dropdown) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children?: ReactNode;
  /** se você quiser usar o trigger como child */
  asChildButton?: boolean;
};

const cepServices = {
  find: (cep: string) => axios.get(`https://viacep.com.br/ws/${cep}/json`),
};

export default function CustomerCreateModal({
  id_store,
  customer,
  onSuccess,
  open,
  onOpenChange,
  asChildButton,
  children,
}: Props) {
  const isEdit = !!customer?.id_customer;

  const isControlled = typeof open === "boolean" && !!onOpenChange;

  return (
    <Dialog open={isControlled ? open : undefined} onOpenChange={onOpenChange}>
      {/* Trigger só aparece no modo NÃO-controlado */}
      {!isControlled && (
        <DialogTrigger asChild>
          {asChildButton && children ? (
            // usa o elemento passado (ex: botão/ícone dentro de dropdown)
            children
          ) : (
            // seu botão padrão
            <Button variant={isEdit ? "secondary" : "default"}>
              {isEdit ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Editar
                </>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Adicionar Cliente
                </span>
              )}
            </Button>
          )}
        </DialogTrigger>
      )}

     <DialogContent
  onKeyDownCapture={(e) => {
    // bloqueia atalhos do DataTable/Row (space, arrows, etc.)
    e.stopPropagation();
  }}
  className={[
    "overflow-auto max-h-[90vh] w-[95vw]",
    isEdit ? "max-w-[1200px]" : "max-w-[900px]",
  ].join(" ")}
>
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3">
            <Box /> {isEdit ? "Editar Cliente" : "Adicionar Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Atualize as informações do cliente"
              : "Adicionando informações do cliente"}
          </DialogDescription>
        </DialogHeader>

        <CustomerFormModal
          id_store={id_store}
          customer={customer ?? null}
          isEdit={customer ? true : false}
          onSuccess={(c: CustomerModel) => onSuccess?.(c)}
          closeDialog={() => onOpenChange?.(false)} // fecha só no sucesso
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  CircleCheck,
  FileBadge,
  Phone,
  Send,
  Tag,
  User2,
  MapPin,
} from "lucide-react";
import { CustomersServices } from "@/src/api/services/customer.services";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";

type CustomerModalProps = {
  customer?: CustomerModel | null;
  isEdit?: boolean;
  id_store: string;
  user?: { id_user?: string | null } | null;
  closeDialog?: () => void;
  onSuccess?: (customer: CustomerModel) => void;
};

export function CustomerFormModal({
  customer,
  isEdit = false,
  id_store,
  closeDialog,
  onSuccess,
}: CustomerModalProps) {
  const [loading, setLoading] = useState(false);

  // Customer base
  const [name, setName] = useState("");
  const [type, setType] = useState<"PF" | "PJ" | "">("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState<boolean>(true);

  // Endereço principal (opcional)
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [stateUf, setStateUf] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (!customer) {
      setName("");
      setType("");
      setDocument("");
      setEmail("");
      setPhone("");
      setActive(true);

      setCep("");
      setStreet("");
      setNumber("");
      setComplement("");
      setCity("");
      setStateUf("");
      setCountry("");
      return;
    }

    setName(customer.name_customer ?? "");
    setType((customer.type as "PF" | "PJ") ?? "");
    setDocument(customer.document_customer ?? "");
    setEmail(customer.email_customer ?? "");
    setPhone(customer.phone_customer ?? "");
    setActive(typeof customer.active === "boolean" ? customer.active : true);

    const main = customer.mainAddress;
    setCep(main?.cep ?? "");
    setStreet(main?.street ?? "");
    setNumber(main?.number ?? "");
    setComplement(main?.complement ?? "");
    setCity(main?.city ?? "");
    setStateUf(main?.state ?? "");
    setCountry(main?.country ?? "");
  }, [customer]);

  async function onSaveHandle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      setLoading(true);
      // Monte o payload conforme seu backend espera
      // Mantive a estrutura no padrão que você já tinha: Partial<Model>
      const payload: createCustomerBase = {
        name_customer: name.trim(),
        type: type === "" ? undefined : (type as any),
        document_customer: document.trim(),
        email_customer: email.trim(),
        phone_customer: phone.trim(),
        active,

        // se seu backend recebe "address" no create/update, use:
        address:
          cep || street || number || city || stateUf || country
            ? {
                cep: cep.trim(),
                street: street.trim(),
                number: number.trim(),
                complement: complement.trim() || undefined,
                city: city.trim(),
                state: stateUf.trim(),
                country: country.trim(),
              }
            : undefined,
      };

      if (isEdit && customer) {
        // ajuste para seu serviço real

        const { address, ...rest } = payload;

        const { data } = await CustomersServices.update(
          rest,
          customer.id_customer!,
        );

        toast.success("Cliente atualizado com sucesso");
        onSuccess?.(data.customer);
      } else {
        const { data } = await CustomersServices.create(payload, id_store);
        toast.success("Cliente adicionado com sucesso");
        onSuccess?.(data.customer);
        onSuccess?.(payload as CustomerModel); // substitua pelo retorno real
      }

      closeDialog?.();
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data?.error ?? "Erro ao salvar cliente");
    } finally {
      setLoading(false);
    }
  }

  const handleCep = async (cep: string) => {
    try {
      const { data } = await cepServices.find(cep);
      setCity(data.localidade);
      setStateUf(data.estado);
      setStreet(data.logradouro);
    } catch {}
    return {
      loading,
    };
  };

  return (
    <form
      onSubmit={onSaveHandle}
      className="w-full h-full grid grid-cols-1  md:grid-cols-2 gap-4 text-foreground"
    >
      {/* Nome */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <User2 size={16} className="text-foreground/60" />
          Nome do Cliente
        </Label>
        <Input
          name="name_customer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: João da Silva / Empresa LTDA"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Tipo */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <Tag size={16} className="text-foreground/60" />
          Tipo
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={type === "PF" ? "default" : "outline"}
            onClick={() => setType("PF")}
            className="rounded-xl"
          >
            PF
          </Button>
          <Button
            type="button"
            variant={type === "PJ" ? "default" : "outline"}
            onClick={() => setType("PJ")}
            className="rounded-xl"
          >
            PJ
          </Button>
        </div>
      </div>

      {/* Documento */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <FileBadge size={16} className="text-foreground/60" />
          Documento (CPF/CNPJ)
        </Label>
        <Input
          name="document_customer"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="ex: 000.000.000-00 / 00.000.000/0001-00"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <Phone size={16} className="text-foreground/60" />
          Telefone
        </Label>
        <Input
          name="phone_customer"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="ex: (47) 99999-9999"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Email */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          <Send size={16} className="text-foreground/60" />
          Email
        </Label>
        <Input
          name="email_customer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ex: cliente@email.com"
          className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground/90 flex items-center gap-2">
          {active ? (
            <CircleCheck size={16} className="text-foreground/60" />
          ) : (
            <AlertCircle size={16} className="text-foreground/60" />
          )}
          Status
        </Label>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={active ? "default" : "outline"}
            onClick={() => setActive(true)}
            className="rounded-xl"
          >
            Ativo
          </Button>
          <Button
            type="button"
            variant={!active ? "default" : "outline"}
            onClick={() => setActive(false)}
            className="rounded-xl"
          >
            Desativado
          </Button>
        </div>
      </div>

      {/* Endereço principal (UI igual ao padrão do form) */}
      <div className="col-span-1 md:col-span-2 space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Endereço principal (opcional)
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              CEP
            </Label>
            <Input
              name="cep"
              value={cep}
              onChange={(e) => {
                setCep(e.target.value);
                handleCep(e.target.value);
              }}
              placeholder="ex: 88300-000"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              Rua
            </Label>
            <Input
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="ex: Rua Exemplo"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              Número
            </Label>
            <Input
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="ex: 123"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              Complemento
            </Label>
            <Input
              name="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="ex: Apto 302"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              Cidade
            </Label>
            <Input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="ex: Itajaí"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground/90">
              Estado
            </Label>
            <Input
              name="state"
              value={stateUf}
              onChange={(e) => setStateUf(e.target.value)}
              placeholder="ex: SC"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <Label className="text-sm font-medium text-foreground/90">
              País
            </Label>
            <Input
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="ex: BR"
              className="h-11 bg-background border-border/70 text-foreground placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-xl shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="col-span-1 md:col-span-2 pt-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end border-t border-border/60 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="rounded-xl">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={loading} className="rounded-xl">
            {/* {loading && <Spinner />} */}
            {isEdit ? "Salvar alterações" : "Salvar Cliente"}
          </Button>
        </div>
      </div>
    </form>
  );
}
