"use client";
import AdminAuth from "@/components/admin-component/AdminAuth";
import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors position="top-right" expand={true} />
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
export default AdminAuth(AdminLayout);
