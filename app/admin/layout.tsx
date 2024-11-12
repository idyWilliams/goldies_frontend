"use client";

import AdminAuth from "@/components/admin-component/AdminAuth";
import AdminNav from "@/components/admin-component/AdminNav";
import AdminSideBar from "@/components/admin-component/AdminSideBar";

import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();

  // @ts-ignore
  // @ts-ignore
  // const { setIsLogin, setAuth } = authContext;
  // const pathname = usePathname();

  // DONT REMOVE THE COMMENT
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["users"], // Unique key for the query
  //   queryFn: getUser, // The function that fetches the data
  // });

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
export default AdminAuth(AdminLayout);
