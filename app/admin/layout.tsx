"use client";

import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";
import { getUser } from "@/services/hooks/users";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // DONT REMOVE THE COMMENT
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["users"], // Unique key for the query
  //   queryFn: getUser, // The function that fetches the data
  // });

  // console.log(data);

  useEffect(() => {
    const storeAdmin = JSON.parse(localStorage.getItem("admin") as string);

    if (!storeAdmin) {
      router.push("/admin-sign-in");
    }
  }, [router]);

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
