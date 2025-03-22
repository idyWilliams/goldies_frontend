"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import AuthContext, { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { adminLogOut } from "@/services/hooks/admin-auth";
import { jwtDecode } from "jwt-decode";
import { SessionExpiredDialog } from "./SessionExpiredDialog";

const AdminAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const AdminAuthWrapper: FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLogin, setIsLogin] = useState(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
      const storedAdmin = JSON.parse(localStorage.getItem("admin") as string);
      const adminToken = storedAdmin ? storedAdmin?.token : null;

      if (!adminToken) {
        console.error("Admin token is missing.");
        adminLogOut(router); // Admin redirected to sign-in page
        return;
      }

      try {
        const decodedToken: { iat: number; exp: number } =
          jwtDecode(adminToken);
        const storedTimestamp = decodedToken?.exp * 1000;
        const currentTime = new Date().getTime();
        const sessionExpired = currentTime > storedTimestamp;

        console.log("sessioninfo:", {
          storedTimestamp,
          currentTime,
          sessionExpired,
        });

        // When admin session is still valid
        if (!sessionExpired) {
          console.log("Valid session admin");
          setIsLogin(true);
          setIsSessionExpired(false);

          return;
        } else {
          // adminLogOut(router); // Session has expired, Admin redirected to sign-in page
          console.log("InValid session admin");
          setIsSessionExpired(true);
          setIsLogin(false);
        }
      } catch (error) {
        console.log("Error decoding token:", error, storedAdmin, adminToken);
        setIsLogin(false);
      }
    }, [pathname, router]);

    return (
      <>
        {isLogin && <WrappedComponent {...(props as P)} />}
        <SessionExpiredDialog
          open={isSessionExpired}
          onOpenChange={setIsSessionExpired}
        />
      </>
    );
  };
  return AdminAuthWrapper;
};

export default AdminAuth;
