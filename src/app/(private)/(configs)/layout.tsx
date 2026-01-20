"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthUserProvider from "@/providers/AuthUserProvider";
import userServices from "@/src/api/services/auth.services";
import { UserModel } from "@/src/api/types/user.types";
import { Boxes, BoxesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function StoresLayout({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<UserModel | null>(null);

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
    <main className="w-full h-full">
      <header className="w-full px-6  h-15 bg-accent/40 border-b border-foreground/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Image
            src="/logo_.png" // ajuste para .png/.jpg conforme o arquivo real
            alt="Logo"
            width={40}
            height={40}
            priority
            className="object-contain"
          />

          {/* Divisor */}
          <div className="h-5 w-px rotate-10 bg-foreground/15" />

          {/* Título */}
          <div className="flex items-center gap-1 text-foreground/60">
            <BoxesIcon size={16} />
            <h1 className="text-sm font-medium whitespace-nowrap">
              Lojas / Negócios
            </h1>
          </div>
        </div>


        <Link href={"/me"}>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={me?.profile_image ?? ""}
              alt={me?.name ?? "Usuário"}
            />
            <AvatarFallback className="text-xs font-medium">
              {me?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">
              {me?.name}
            </span>
            <span className="text-xs text-muted-foreground">{me?.email}</span>
          </div>
        </div>
        </Link>
      </header>
      {children}
    </main>
    </AuthUserProvider>
  );
}
