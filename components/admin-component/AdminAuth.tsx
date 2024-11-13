"use client";
import React, { FC, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";

const AdminAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const AdminAuthWrapper: FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const authContext = useContext(AuthContext);

    if (authContext === undefined) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { isLogin, setIsLogin, setAuth, setRole } = authContext;

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLogin");
      const isAuthenticated = isLoggedIn && JSON.parse(isLoggedIn);
      const admin = JSON.parse(localStorage.getItem("admin") as string);
      const isLoggedIn = JSON.parse(localStorage.getItem("isLogin") as string);
      const isAuthenticated = admin && isLoggedIn;

      setIsLogin(isAuthenticated);

      if (!isAuthenticated) {
        router.push("/admin-sign-in");
        return;
      }
    }, [isLogin, setIsLogin, router, pathname, setRole, setAuth]);

    return isLogin && <WrappedComponent {...(props as P)} />;
  };
  return AdminAuthWrapper;
};

export default AdminAuth;
