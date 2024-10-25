"use client";

import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import AuthContext from "@/context/AuthProvider";
import { isTokenValid } from "@/helper/isTokenValid";
import { getUser } from "@/services/hooks/users";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  // @ts-ignore
  const { setIsLogin, setAuth } = authContext;
  const pathname = usePathname();

  // useEffect(() => {
  //   const admin = localStorage.getItem("admin");

  //   const adminToken = admin && JSON.parse(admin);
  //   console.log(adminToken);

  //   if (adminToken.token) {
  //     const isSessionExpired = isTokenValid(adminToken.token);
  //     if (isSessionExpired) {
  //       localStorage.setItem("isLogin", JSON.stringify(false));
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("admin");

  //       setIsLogin(false);

  //       router.push("/admin-sign-in");
  //     }
  //   }
  // }, [setAuth, setIsLogin, router, pathname]);

  // DONT REMOVE THE COMMENT
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["users"], // Unique key for the query
  //   queryFn: getUser, // The function that fetches the data
  // });

  // console.log(data);

  // useEffect(() => {
  //   const storeAdmin = JSON.parse(localStorage.getItem("admin") as string);

  //   if (!storeAdmin) {
  //     router.push("/admin-sign-in");
  //   }
  // }, [router]);

  return (
    <>
      <AdminNav />
      <div className="grid w-full lg:grid-cols-[200px_1fr]">
        <>
          <AdminSideBar />
        </>
        <div className="overflow-auto lg:h-screen lg:pb-0 lg:pt-[64px]">
          {children}
        </div>
      </div>
    </>
  );
}
