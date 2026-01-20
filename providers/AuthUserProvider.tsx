"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserLoggedContext } from "@/contexts/UserLogged";
import { UserModel } from "@/src/api/types/user.types";
import userServices from "@/src/api/services/auth.services";

type AuthContextValue = {
  user: UserModel | null;
  loading: boolean;
};

export default function AuthUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await userServices.getMe();
        setUser(data.user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.warn("Usuário não autenticado");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
  };

  return (
    <UserLoggedContext.Provider value={value}>
      {children}
    </UserLoggedContext.Provider>
  );
}
