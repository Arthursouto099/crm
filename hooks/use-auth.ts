'use client'
import { UserLoggedContext } from "@/contexts/UserLogged";
import { useContext } from "react";

export default function useAuthContext() {
  const context = useContext(UserLoggedContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de <UserProvider>");
  }

  return context;
}
