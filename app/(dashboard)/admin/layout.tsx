"use client";
import AdminAuth from "@/components/admin-component/AdminAuth";
import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import { useAuth } from "@/context/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuth();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAuth((prev) => ({
        ...prev,
        admin: JSON.parse(storedAdmin),
      }));
    }
  }, [setAuth]);

  return (
    <div className="min-h-[calc(100dvh-64px)]">
      <NextTopLoader color="#e4d064" showSpinner={false} height={4} />
      <AdminNav />
      <div className="flex w-full">
        <AdminSideBar />

        <div className="mt-[64px] min-h-[calc(100dvh-64px)] w-full overflow-auto bg-[#EFEFEF] pb-6 lg:ml-[220px] ">
          {children}
        </div>
      </div>
    </div>
  );
}
export default AdminAuth(AdminLayout);
// export default AdminLayout;
