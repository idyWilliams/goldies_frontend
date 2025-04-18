"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminLogOut } from "@/services/hooks/admin-auth";
import { jwtDecode } from "jwt-decode";
import { SessionExpiredDialog } from "./SessionExpiredDialog";
import instance from "@/services/api";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

interface AuthState {
  isLogin: boolean;
  isSessionExpired: boolean;
  isLoading: boolean;
}

const AdminAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const AdminAuthWrapper: FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [authState, setAuthState] = useState<AuthState>({
      isLogin: false,
      isSessionExpired: false,
      isLoading: true,
    });

    const refreshAttempted = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const updateAuthState = (newState: Partial<AuthState>) => {
      setAuthState((prev) => ({ ...prev, ...newState }));
    };

    const validateToken = async (token: string): Promise<boolean> => {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return !!decoded.exp && decoded.exp > Date.now() / 1000;
      } catch {
        return false;
      }
    };

    const attemptRefreshToken = async (): Promise<boolean> => {
      try {
        const response = await instance.post("/admin/refresh-token");
        if (response.data?.accessToken) {
          const newToken = response.data.accessToken;
          const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");

          localStorage.setItem("adminToken", newToken);
          localStorage.setItem(
            "admin",
            JSON.stringify({
              ...storedAdmin,
              token: newToken,
            }),
          );

          // Update axios instance Authorization header if needed
          instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          return true;
        }
      } catch (error) {
        console.error("Refresh token failed:", error);
        if (
          (error as any)?.response?.status === 502 &&
          !refreshAttempted.current
        ) {
          refreshAttempted.current = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return attemptRefreshToken();
        }
      }
      return false;
    };

    const checkAuth = async () => {
      const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");
      const adminToken = storedAdmin?.token || null;

      if (!adminToken) {
        updateAuthState({
          isLogin: false,
          isSessionExpired: false,
          isLoading: false,
        });
        adminLogOut(router, pathname);
        return;
      }

      const isValid = await validateToken(adminToken);
      let isAboutToExpire = false;

      try {
        const decoded: DecodedToken = jwtDecode(adminToken);
        isAboutToExpire =
          !!decoded.exp && decoded.exp - Date.now() / 1000 < 300; // 5 mins = 300s

      } catch (error) {
        console.error("Token decode error:", error);
      }

      if (isValid) {
        updateAuthState({
          isLogin: true,
          isSessionExpired: false,
          isLoading: false,
        });

        if (isAboutToExpire && !refreshAttempted.current) {
          refreshAttempted.current = true;
          await attemptRefreshToken();
          refreshAttempted.current = false;
        }
      } else {
        const refreshSuccess = await attemptRefreshToken();
        updateAuthState({
          isLogin: refreshSuccess,
          isSessionExpired: !refreshSuccess,
          isLoading: false,
        });

        if (!refreshSuccess) {
          setTimeout(() => adminLogOut(router, pathname), 2000);
        }
      }
    };

    useEffect(() => {
      refreshAttempted.current = false;

      // Initial check on mount or route change
      checkAuth();

      // Set up interval to check every 60 seconds
      intervalRef.current = setInterval(() => {
        checkAuth();
      }, 60000); // 1 minute

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [pathname, router]);

    const handleSessionExpired = async () => {
      updateAuthState({ isLoading: true });
      await adminLogOut(router, pathname);
    };

    if (authState.isLoading) {
      return (
        <div className="flex h-dvh w-full items-center justify-center md:h-screen">
          <div className="loader"></div>
        </div>
      );
    }

    return (
      <>
        {authState.isLogin && <WrappedComponent {...(props as P)} />}
        <SessionExpiredDialog
          open={authState.isSessionExpired}
          onOpenChange={(open) => updateAuthState({ isSessionExpired: open })}
          handleLogout={handleSessionExpired}
        />
      </>
    );
  };
  return AdminAuthWrapper;
};

export default AdminAuth;
