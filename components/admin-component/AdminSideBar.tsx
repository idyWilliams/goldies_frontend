"use client";
import { useAuth } from "@/context/AuthProvider";
import { adminLogOut } from "@/services/hooks/admin-auth";
import {
  Cake,
  Category2,
  FolderAdd,
  Home2,
  Setting2,
  ShoppingBag,
  UserAdd,
} from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

export default function AdminSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { auth } = useAuth();

  return (
    <section className="fixed bottom-0 top-0 z-40 hidden w-[220px] flex-col border-r border-neutral-300 bg-white py-4 lg:flex lg:pt-24">
      {/* <div className="my-2 mb-7 border-b border-goldie-300 border-opacity-50"></div> */}
      <div className="6 flex flex-col items-start gap-2 px-4">
        <Link
          href={"/admin"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin" ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <Home2 size="20" /> Overview
        </Link>
        <Link
          href={"/admin/products"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/products") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <Cake size="20" />
          Products
        </Link>
        <Link
          href={"/admin/customers"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/customers") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <IoPeopleOutline size={20} />
          Customers
        </Link>
        <Link
          href={"/admin/orders"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/orders") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <ShoppingBag size="20" />
          Orders
        </Link>
        <Link
          href={"/admin/create-products"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/create-products") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <FolderAdd size="20" />
          Create Products
        </Link>
        <Link
          href={"/admin/manage-categories"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/manage-categories") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <Category2 size="20" />
          Manage Categories
        </Link>
        {auth?.admin?.role === "super_admin" && (
          <Link
            href={"/admin/invite"}
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/invite") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
          >
            <UserAdd size="20" />
            Invite Admin
          </Link>
        )}
        <Link
          href={"/admin/settings"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/settings") ? "rounded-[8px] bg-brand-200 px-2 text-brand-100 hover:text-brand-100" : "text-brand-200"}`}
        >
          <Setting2 size="20" />
          Settings
        </Link>

        <button
          className={`flex w-full cursor-pointer items-center gap-2 whitespace-nowrap py-2 text-sm text-neutral-500 duration-300 hover:text-brand-200`}
          onClick={() => adminLogOut(router)}
        >
          <CiLogout size={20} />
          Logout
        </button>
      </div>
    </section>
  );
}
