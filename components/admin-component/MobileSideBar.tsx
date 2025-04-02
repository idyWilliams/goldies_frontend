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
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

export default function MobileSideBar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = useAuth();

  return (
    <div className="relative z-50 flex h-screen w-full flex-col bg-brand-200 py-4 pt-24 lg:hidden">
      {/* <div className="my-2 mb-7 border-b border-goldie-300 border-opacity-50"></div> */}
      <span className="absolute right-4 top-4 text-white" onClick={onClose}>
        <X size={20} />
      </span>
      <div className="flex flex-col items-start gap-2 px-4">
        <Link href={"/admin"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname === "/admin" ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <Home2 size="20" /> Overview
          </button>
        </Link>
        <Link href={"/admin/products"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm  duration-300 hover:text-brand-100 ${pathname === "/admin/products" ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <Cake size="20" />
            Products
          </button>
        </Link>
        <Link href={"/admin/customers"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname === "/admin/customers" ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <IoPeopleOutline size={20} />
            Customers
          </button>
        </Link>
        <Link href={"/admin/orders"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname === "/admin/orders" ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <ShoppingBag size="20" />
            Orders
          </button>
        </Link>
        <Link href={"/admin/create-products"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname === "/admin/create-products" ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <FolderAdd size="20" />
            Create Products
          </button>
        </Link>
        <Link href={"/admin/manage-categories"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname.includes("/admin/manage-categories") ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <Category2 size="20" />
            Manage Categories
          </button>
        </Link>
        {auth?.admin?.role === "super_admin" && (
          <Link href={"/admin/admin-users"}>
            <button
              className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname.includes("/admin/manage-categories") ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
              onClick={onClose}
            >
              <UserOctagon size="20" />
              Admin Users
            </button>
          </Link>
        )}
        <Link href={"/admin/settings"} className="w-full">
          <button
            className={`flex w-full items-center gap-2 whitespace-nowrap py-2 text-sm duration-300 hover:text-brand-100 ${pathname.includes("/admin/settings") ? "font-semibold text-brand-100" : "text-brand-100 opacity-80"}`}
            onClick={onClose}
          >
            <Setting2 size="20" />
            Settings
          </button>
        </Link>

        <button
          className={`flex w-full cursor-pointer items-center gap-2 whitespace-nowrap py-2 text-sm text-brand-100 duration-300 hover:text-brand-100`}
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
