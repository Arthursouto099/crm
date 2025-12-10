"use client";
import { User, UserLoggedContext } from "@/contexts/UserLogged";
import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "auth_token";

type AuthState = {
  user: User | null;
  token: string | null;
};

export default function AuthUserProvider({ children }: { children: ReactNode }) {
  const [{ user, token }, setAuth] = useState<AuthState>({
    user: null,
    token: null,
  });


  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) return;

    try {
      const decoded = jwtDecode<User>(savedToken);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth({
        token: savedToken,
        user: decoded,
      });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setAuth({ user: null, token: null });
    }
  }, []);

  function login(newToken: string) {
    try {
      const decoded = jwtDecode<User>(newToken);
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, newToken);
      }

      setAuth({
        token: newToken,
        user: decoded,
      });
    } catch (e) {
      console.error(e);
    }
  }

  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
    setAuth({ user: null, token: null });
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, token]
  );

  return (
    <UserLoggedContext.Provider value={value}>
      {children}
    </UserLoggedContext.Provider>
  );
}
