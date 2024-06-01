import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      <div className="grid w-full lg:grid-cols-[200px_1fr]">
        <>
          <AdminSideBar />
        </>
        <div className="overflow-auto pb-8 lg:h-screen lg:pb-0 lg:pt-[64px]">
          {children}
        </div>
      </div>
    </>
  );
}
