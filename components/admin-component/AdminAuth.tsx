"use client";
import React, { FC, useEffect } from "react";
import AuthContext, { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { adminLogOut } from "@/services/hooks/admin-auth";
import { jwtDecode } from "jwt-decode";

const AdminAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const AdminAuthWrapper: FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();

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

          return;
        } else {
          adminLogOut(router); // Session has expired, Admin redirected to sign-in page
          console.log("InValid session admin");
        }
      } catch (error) {
        console.log("Error decoding token:", error, storedAdmin, adminToken);
        // setIsLogin(false);
      }
    }, [pathname, router]);

    return <WrappedComponent {...(props as P)} />;
  };
  return AdminAuthWrapper;
};

export default AdminAuth;
