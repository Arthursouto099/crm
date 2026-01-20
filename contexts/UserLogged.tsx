"use client";
import { UserModel } from "@/src/api/types/user.types"
import { createContext } from "react";

enum Roles {
  ADMIN,
  GUEST,
}

export type User = {
  name: string;
  id_user: string;
  role: Roles;
  email: string;
  currentLog: Date;
};

interface AuthContextType {
  user: UserModel | null
}

export const UserLoggedContext = createContext<AuthContextType | null>(null);
