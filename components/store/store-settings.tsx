/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { StoreModel } from "@/src/api/types/user.types";
import { upload } from "@/utils/uploads";
import { storeServices } from "@/src/api/services/store.services";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Edit } from "lucide-react";

type Props = {
  store: StoreModel;
  /**
   * Você pode usar este callback para chamar seu service.
   * Ex.: onSubmit={(fd) => storeServices.update(store.id, fd)}
   */
  onSubmit?: (formData: FormData) => Promise<void>;
};

export function StoreSettings({ store}: Props) {
  const uid = useId();

  const [name, setName] = useState(store.store_name ?? "");
  const [bio, setBio] = useState(store.store_bio ?? "");

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // evita vazamento de memória por URL.createObjectURL
  const bannerPreview = useMemo(() => {
    if (bannerFile) return URL.createObjectURL(bannerFile);
    return store.store_image ?? "";
  }, [bannerFile, store.store_image]);

  const logoPreview = useMemo(() => {
    if (logoFile) return URL.createObjectURL(logoFile);
    return store.logo ?? "";
  }, [logoFile, store.logo]);

  useEffect(() => {
    if (bannerPreview?.startsWith("blob:")) {
      return () => URL.revokeObjectURL(bannerPreview);
    }
  }, [bannerPreview]);

  useEffect(() => {
    if (logoPreview?.startsWith("blob:")) {
      return () => URL.revokeObjectURL(logoPreview);
    }
  }, [logoPreview]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      setIsSaving(true);
      setError(null);

      // 1) payload base (texto)
      const payload: Record<string, any> = {
        store_name: name.trim(),
        store_bio: bio.trim(),
      };

      // 2) uploads em paralelo (somente se existir arquivo)
      const [bannerPath, logoPath] = await Promise.all([
        bannerFile
          ? upload(bannerFile, store.id_owner, "stores")
          : Promise.resolve(null),
        logoFile
          ? upload(logoFile, store.id_owner, "logos")
          : Promise.resolve(null),
      ]);

      // 3) injeta no payload só se teve upload
      if (bannerPath) payload.store_image = bannerPath.publicUrl;
      if (logoPath) payload.logo = logoPath.publicUrl;

      // 4) update único no backend
      await storeServices.updateStore(payload, store.id_store);

      toast.success("Loja editada com sucesso");
    } catch (err: any) {
      setError(err?.message ?? "Não foi possível salvar as alterações.");
      toast.error(err.response.data.error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* Banner */}
      <div className="py-5">
        {" "}
        {error && (
          <span className="text-xs text-destructive mr-auto">{error}</span>
        )}
        <Button type="submit" disabled={isSaving} className="rounded-xl">
          <Edit/> {isSaving ? <Spinner/>  : "Salvar"} 
        </Button>
      </div>
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl border border-foreground/10 bg-muted shadow-sm">
        {bannerPreview && (
          <Image
            src={bannerPreview}
            alt="Banner da loja"
            fill
            className="object-cover"
            sizes="100vw"
            quality={100}
            unoptimized={bannerPreview.startsWith("blob:")}
          />
        )}

        {/* Linear gradient */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

        {/* Upload banner (UI) */}
        <label
          htmlFor={`banner-${uid}`}
          className="absolute right-4 top-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-medium text-white backdrop-blur hover:bg-black/45 focus-within:ring-2 focus-within:ring-ring"
        >
          Alterar banner
          <input
            id={`banner-${uid}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setBannerFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {/* Card de infos */}
      <div className="absolute left-6 right-6 bottom-8 bg-black/2 p-2 rounded-xl z-50 flex items-end gap-4">
        {/* Logo */}
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg bg-background">
            <AvatarImage
              src={logoPreview}
              alt="Logo da loja"
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-semibold">
              {(name || store.store_name || "L").charAt(0)}
            </AvatarFallback>
          </Avatar>

          <label
            htmlFor={`logo-${uid}`}
            className="absolute -right-2 -bottom-2 cursor-pointer rounded-full border border-foreground/10 bg-background px-2 py-1 text-[10px] font-medium shadow hover:bg-accent/40"
            title="Alterar logo"
          >
            Editar
            <input
              id={`logo-${uid}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        {/* Inputs shadcn/ui */}
        <div className="flex w-fit bg-none  min-w-0 flex-1 flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da loja"
            className="focus:outline-none text-3xl font-medium"
          />

          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio / categoria (ex.: Açaí e lanches)"
            className="focus:outline-none text-sm text-foreground/60 font-medium"
          />
        </div>

   
      </div>

    
      {/* Espaço para não cortar */}
      <div className="h-16" />
    </form>
  );
}
