"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserLoggedContext } from "@/contexts/UserLogged";
import { UserModel } from "@/api/types/user.types";
import { jwtDecode } from "jwt-decode";
import userServices from "@/api/services/auth.services";

const TOKEN_KEY = "auth_token";

type AuthState = {
  user: UserModel | null;
  token: string | null;
};

export default function AuthUserProvider({ children }: { children: ReactNode }) {
  const [{ user, token }, setAuth] = useState<AuthState>({
    user: null,
    token: null,
  });

  // Função central: dado um token, busca o usuário na API e atualiza o estado
  async function fetchUserFromApi(currentToken: string) {
    if(!currentToken) return
    
    try {
      // supondo que seu token tenha { id_user: string }
      const decoded = jwtDecode<{ id_user: string }>(currentToken);

      const { data } = await userServices.getUser(currentToken, decoded.id_user);

      setAuth({
        token: currentToken,
        user: data.user as UserModel,
      });
    } catch (e) {
      console.error("Erro ao carregar usuário a partir da API:", e);
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
      }
      setAuth({ user: null, token: null });
    }
  }

  // Carrega token do localStorage e chama a API ao montar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUserFromApi(savedToken);
  }, []);

  async function login(newToken: string) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, newToken);
      }

      await fetchUserFromApi(newToken);
    } catch (e) {
      console.error("Erro no login:", e);
    }
  }

  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
    setAuth({ user: null, token: null });
  }

  // Atualizar alguma propriedade do usuário no contexto (após editar perfil, por exemplo)
  function alterUserProp<K extends keyof UserModel>(key: K, value: UserModel[K]) {
    setAuth((prev) => {
      if (!prev.user) return prev;

      return {
        token: prev.token,
        user: {
          ...prev.user,
          [key]: value,
        },
      };
    });
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
    alterUserProp,
  };

  return (
    <UserLoggedContext.Provider value={value}>
      {children}
    </UserLoggedContext.Provider>
  );
}
