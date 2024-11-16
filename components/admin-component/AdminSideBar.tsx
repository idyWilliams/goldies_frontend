"use client";
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
import React from "react";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

export default function AdminSideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const role = JSON.parse(localStorage.getItem("admin") as string).role;
  console.log(role, "myrole");

  return (
    <>
      <section className="z-50 hidden h-screen w-full flex-col bg-black py-4 lg:flex lg:pt-24">
        {/* <div className="my-2 mb-7 border-b border-goldie-300 border-opacity-50"></div> */}
        <div className="flex flex-col items-start gap-6 px-4">
          <Link
            href={"/admin"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname === "/admin" ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <Home2 size="20" /> Overview
          </Link>
          <Link
            href={"/admin/products"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/products") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <Cake size="20" />
            Products
          </Link>
          <Link
            href={"/admin/customers"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/customers") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <IoPeopleOutline size={20} />
            Customers
          </Link>
          <Link
            href={"/admin/orders"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/orders") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <ShoppingBag size="20" />
            Orders
          </Link>
          <Link
            href={"/admin/create-products"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/create-products") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <FolderAdd size="20" />
            Create Products
          </Link>
          <Link
            href={"/admin/manage-categories"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/manage-categories") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <Category2 size="20" />
            Manage Categories
          </Link>
          {role === "super_admin" && (
            <Link
              href={"/admin/invite"}
              className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/manage-categories") ? "text-goldie-300" : "text-neutral-500"}`}
            >
              <UserAdd size="20" />
              Invite Admin
            </Link>
          )}
          <Link
            href={"/admin/settings"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname.includes("/admin/settings") ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <Setting2 size="20" />
            Settings
          </Link>

          <span
            className={`flex items-center gap-2 whitespace-nowrap text-sm text-neutral-500 duration-300 hover:text-goldie-300`}
            onClick={() => adminLogOut(router)}
          >
            <CiLogout size={20} />
            Logout
          </span>
        </div>
      </section>
    </>
  );
}
