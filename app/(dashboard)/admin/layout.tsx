"use client";
import AdminAuth from "@/components/admin-component/AdminAuth";
import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import React from "react";
import NextTopLoader from "nextjs-toploader";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-64px)]">
      <NextTopLoader color="#e4d064" showSpinner={false} height={4} />
      <AdminNav />
      <div className="w-full flex">
        <AdminSideBar />

        <div className="overflow-auto lg:ml-[220px] w-full min-h-[calc(100dvh-64px)] bg-[#EFEFEF] pb-6 mt-[64px] ">
          {children}
        </div>
      </div>
    </div>
  );
}
export default AdminAuth(AdminLayout);
// export default AdminLayout;
