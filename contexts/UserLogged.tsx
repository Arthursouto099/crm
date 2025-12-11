"use client";
import { UserModel } from "@/api/types/user.types";
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
  user: UserModel | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;

 
}

export const UserLoggedContext = createContext<AuthContextType | null>(null);
