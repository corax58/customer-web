"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import {
  checkAuth,
  clearTokenCookie,
  logoutAction,
} from "@/actions/auth.actions";
import { useRouter } from "@/i18n/navigation";
import { UserDetail } from "@/types/auth.types";

interface AuthContextType {
  user: UserDetail | null;
  login: (userData: UserDetail) => void;
  logout: (pathname: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const login = useCallback((userData: UserDetail) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(
    async (pathname: string) => {
      const { success, error } = await logoutAction();
      if (success) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("defaultAddress");

        await clearTokenCookie();
        // If the user is in the restaurant page refresh the same page, otherwise redirect to the restaurants page
        if (pathname.includes("/restaurants")) {
          router.refresh();
        } else {
          router.push("/restaurants");
        }
      }
      if (error) {
        toast.error("Logout failed, Please try again");
      }
    },
    [router],
  );

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isLoading,
      isAuthenticated,
    }),
    [user, login, logout, isLoading, isAuthenticated],
  );

  useEffect(() => {
    setIsLoading(true);
    const initializeAuth = async () => {
      const authStatus = await checkAuth();

      setIsAuthenticated(authStatus);

      if (!authStatus) {
        setIsLoading(false);
        setUser(null);
        localStorage.clear();

        return;
      }
      const storedUserJSON = localStorage.getItem("user");

      if (storedUserJSON) {
        try {
          const userFromStorage: UserDetail = JSON.parse(storedUserJSON);
          setUser(userFromStorage);
        } catch (error) {
          console.error("Failed to parse user data from localStorage.", error);
          setUser(null);
          await clearTokenCookie();
          localStorage.removeItem("user");
          localStorage.removeItem("defaultAddress");
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
