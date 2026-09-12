import { createContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../services/api";

type AuthContext = {
  session: null | APIUserResponse;
  isLoadingSession: boolean;
  save: (data: APIUserResponse) => void;
  logout: () => void;
};

const LOCAL_STORAGE_KEY = "@refunds";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | APIUserResponse>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  function save(data: APIUserResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    setSession(data);
  }

  function logout() {
    setSession(null);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    api.defaults.headers.common.Authorization = "";

    window.location.assign("/");
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setSession({
        token,
        user: JSON.parse(user),
      });
    }

    setIsLoadingSession(false);
  }

  useEffect(() => loadUser(), []);

  return (
    <AuthContext.Provider value={{ session, isLoadingSession, save, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
