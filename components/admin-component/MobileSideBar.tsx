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
  UserOctagon,
} from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

export default function MobileSideBar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = useAuth();

  return (
    <div className="z-50 flex h-screen w-full flex-col bg-black py-4 pt-24 lg:hidden">
      {/* <div className="my-2 mb-7 border-b border-goldie-300 border-opacity-50"></div> */}
      <div className="flex flex-col items-start gap-2 px-4">
        <Link href={"/admin"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin" ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <Home2 size="20" /> Overview
          </button>
        </Link>
        <Link href={"/admin/products"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm  duration-300 hover:text-brand-200 ${pathname === "/admin/products" ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <Cake size="20" />
            Products
          </button>
        </Link>
        <Link href={"/admin/customers"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin/customers" ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <IoPeopleOutline size={20} />
            Customers
          </button>
        </Link>
        <Link href={"/admin/orders"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin/orders" ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <ShoppingBag size="20" />
            Orders
          </button>
        </Link>
        <Link href={"/admin/create-products"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname === "/admin/create-products" ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <FolderAdd size="20" />
            Create Products
          </button>
        </Link>
        <Link href={"/admin/manage-categories"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/manage-categories") ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <Category2 size="20" />
            Manage Categories
          </button>
        </Link>
        {auth?.admin?.role === "super_admin" && (
          <Link href={"/admin/admin-users"}>
            <button
              className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/manage-categories") ? "text-brand-200" : "text-neutral-500"}`}
              onClick={onClose}
            >
              <UserOctagon size="20" />
              Admin Users
            </button>
          </Link>
        )}
        <Link href={"/admin/settings"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-200 ${pathname.includes("/admin/settings") ? "text-brand-200" : "text-neutral-500"}`}
            onClick={onClose}
          >
            <Setting2 size="20" />
            Settings
          </button>
        </Link>

        <button
          className={`flex w-full cursor-pointer items-center gap-2 whitespace-nowrap py-2 text-sm text-neutral-500 duration-300 hover:text-brand-200`}
          onClick={() => {
            onClose;
            adminLogOut(router);
          }}
        >
          <CiLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
