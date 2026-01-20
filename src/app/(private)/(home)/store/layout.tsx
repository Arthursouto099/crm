"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar";
import AuthUserProvider from "@/providers/AuthUserProvider";
import { BoxesIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserModel } from "@/src/api/types/user.types";
import userServices from "@/src/api/services/auth.services";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<UserModel | null>(null);
  const {id_store} = useParams<{id_store: string}>()

  const myInformations = async (
    set: Dispatch<SetStateAction<UserModel | null>>
  ) => {
    try {
      const { data } = await userServices.getMe();
      set(data.user);
    } catch (e) {
      set(null);
    }
  };

  useEffect(() => {
    myInformations(setMe);
  }, []);

  return (
    <AuthUserProvider>
      <SidebarProvider>
        <AppSidebar id_store={id_store} />

        <main className="min-h-screen w-full bg-background">
          <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/50">
            <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                {/* Mobile trigger (only UI change) */}
                <SidebarTrigger className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-background/60 shadow-sm hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />

                {/* Logo */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-background/60 shadow-sm">
                    <Image
                      src="/logo_.png"
                      alt="Logo"
                      width={28}
                      height={28}
                      priority
                      className="object-contain"
                    />
                  </div>

                  {/* Divisor */}
                  <div className="hidden sm:block h-6 w-px bg-foreground/10" />

                  {/* Título */}
                  <div className="flex min-w-0 items-center gap-2 text-foreground/70">
                    <BoxesIcon size={16} className="shrink-0" />
                    <h1 className="min-w-0 truncate text-sm font-medium">
                      Store 
                    </h1>
                  </div>
                </div>
              </div>

              <Link
                href={"/me"}
                className="group flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Avatar className="h-9 w-9 ring-1 ring-foreground/10 group-hover:ring-foreground/20">
                  <AvatarImage
                    src={me?.profile_image ?? ""}
                    alt={me?.name ?? "Usuário"}
                  />
                  <AvatarFallback className="text-xs font-medium">
                    {me?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden sm:flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-sm font-medium text-foreground">
                    {me?.name ?? "—"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {me?.email ?? ""}
                  </span>
                </div>
              </Link>
            </div>
          </header>

          <div className="w-full p-4 sm:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </AuthUserProvider>
  );
}
