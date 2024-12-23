"use client";
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
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { RiFolderAddFill, RiHome5Fill } from "react-icons/ri";

export default function MobileSideBar() {
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedAdmin =
      JSON.parse(localStorage.getItem("admin") as string) || null;

    setRole(storedAdmin ? storedAdmin?.role : null);
  }, []);

  return (
    <>
      <section className="z-50 flex h-screen w-full flex-col bg-black py-4 pt-24 lg:hidden">
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
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname === "/admin/products" ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <Cake size="20" />
            Products
          </Link>
          <Link
            href={"/admin/customers"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname === "/admin/customers" ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <IoPeopleOutline size={20} />
            Customers
          </Link>
          <Link
            href={"/admin/orders"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname === "/admin/orders" ? "text-goldie-300" : "text-neutral-500"}`}
          >
            <ShoppingBag size="20" />
            Orders
          </Link>
          <Link
            href={"/admin/create-products"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-goldie-300 ${pathname === "/admin/create-products" ? "text-goldie-300" : "text-neutral-500"}`}
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
          >
            <CiLogout size={20} />
            Logout
          </span>
        </div>
      </section>
    </>
  );
}
