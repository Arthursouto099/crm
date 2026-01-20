"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreModel } from "@/src/api/types/user.types";
import Image from "next/image";


export function BannerStoreinformations({ store }: { store: StoreModel }) {
  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl border border-foreground/10 bg-muted shadow-sm">
        {store?.store_image && (
          <Image
            src={store.store_image}
            alt="Banner da loja"
            fill
            className="object-cover"
            sizes="100vw"
            quality={100}
          />
        )}

        {/* Linear gradient */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
      </div>

      {/* Logo “para fora” */}
      {store?.logo && (
        <div className="absolute flex items-end gap-4 -bottom-5 left-6 z-50">
          {/* Logo */}
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg bg-background">
            <AvatarImage
              src={store.logo}
              alt="Logo da loja"
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-semibold">
              {store.store_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Infos da loja */}
          <div className="flex flex-col gap-1">
            {/* Nome */}
            <h1 className="text-3xl font-semibold text-foreground leading-tight">
              {store.store_name}
            </h1>

            {/* Categoria / Segmento (editável) */}
            {store.store_bio && (
              <span className="inline-flex w-fit items-center rounded-md bg-accent/40 px-2 py-0.5 text-sm font-medium text-foreground/80">
                {store.store_bio}
              </span>
            )}

            {/* Linha de infos rápidas */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"></div>
          </div>
        </div>
      )}
    </div>
  );
}
