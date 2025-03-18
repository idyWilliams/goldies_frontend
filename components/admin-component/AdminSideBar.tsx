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
    <section className="fixed bottom-0 top-0 z-40 hidden w-[220px] flex-col bg-black py-4 lg:flex lg:pt-24">
      {/* <div className="my-2 mb-7 border-b border-goldie-300 border-opacity-50"></div> */}
      <div className="6 flex flex-col items-start gap-2 px-4">
        <Link
          href={"/admin"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin" ? "text-brand-200" : "text-neutral-500"}`}
        >
          <Home2 size="20" /> Overview
        </Link>
        <Link
          href={"/admin/products"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/products") ? "text-brand-200" : "text-neutral-500"}`}
        >
          <Cake size="20" />
          Products
        </Link>
        <Link
          href={"/admin/customers"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/customers") ? "text-brand-200" : "text-neutral-500"}`}
        >
          <IoPeopleOutline size={20} />
          Customers
        </Link>
        <Link
          href={"/admin/orders"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/orders") ? "text-brand-200" : "text-neutral-500"}`}
        >
          <ShoppingBag size="20" />
          Orders
        </Link>
        <Link
          href={"/admin/create-products"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/create-products") ? "text-brand-200" : "text-neutral-500"}`}
        >
          <FolderAdd size="20" />
          Create Products
        </Link>
        <Link
          href={"/admin/manage-categories"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/manage-categories") ? "text-brand-200" : "text-neutral-500"}`}
        >
          <Category2 size="20" />
          Manage Categories
        </Link>
        {auth?.admin?.role === "super_admin" && (
          <Link
            href={"/admin/invite"}
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/invite") ? "text-brand-200" : "text-neutral-500"}`}
          >
            <UserAdd size="20" />
            Invite Admin
          </Link>
        )}
        <Link
          href={"/admin/settings"}
          className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/settings") ? "text-brand-200" : "text-neutral-500"}`}
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
