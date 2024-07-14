"use client";
import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import Dashboard from "@/components/admin-component/Dashboard";
import React from "react";
import AdminLayout from "./layout";

export default function Page() {
  return (
    <>
      {/* <AdminLayout> */}
      <div className="pb-10">
        <Dashboard />
      </div>
      {/* </AdminLayout> */}
    </>
  );
}
