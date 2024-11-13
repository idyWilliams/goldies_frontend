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
    console.log(pathname);

    if (authContext === undefined) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { isLogin, setIsLogin, setAuth, setRole } = authContext;

    useEffect(() => {
      const admin = JSON.parse(localStorage.getItem("admin") as string);
      const isLoggedIn = JSON.parse(localStorage.getItem("isLogin") as string);
      const isAuthenticated = admin && isLoggedIn;

      setIsLogin(isAuthenticated);
      setRole("admin");
      setAuth(admin);

      console.log("Check admin auth", isLoggedIn, admin, isAuthenticated);

      if (!isAuthenticated) {
        router.push("/admin-signin");
        return;
      }
    }, [isLogin, setIsLogin, router, pathname, setRole, setAuth]);

    return isLogin && <WrappedComponent {...(props as P)} />;
  };
  return AdminAuthWrapper;
};

export default AdminAuth;
