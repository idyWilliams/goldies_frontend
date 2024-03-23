"use client";
import { Cake, FolderAdd, Home2, ShoppingBag } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsHandbagFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { RiFolderAddFill, RiHome5Fill } from "react-icons/ri";

export default function AdminSideBar() {
  const pathname = usePathname();
  return (
    <>
      <section className="hidden h-screen w-full flex-col bg-black py-4 lg:flex lg:pt-24">
        {/* <div className="my-2 mb-7 border-b border-main border-opacity-50"></div> */}
        <div className="flex flex-col items-start gap-6 px-4">
          <Link
            href={"/admin"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-main ${pathname === "/admin" ? "text-main" : "text-neutral-500"}`}
          >
            <Home2 size="20" /> Overview
          </Link>
          <Link
            href={"/admin/products"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-main ${pathname === "/admin/products" ? "text-main" : "text-neutral-500"}`}
          >
            <Cake size="20" />
            Products
          </Link>
          <Link
            href={"/admin/customers"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-main ${pathname === "/admin/customers" ? "text-main" : "text-neutral-500"}`}
          >
            <IoPeopleOutline size={20} />
            Customers
          </Link>
          <Link
            href={"/admin/orders"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-main ${pathname === "/admin/orders" ? "text-main" : "text-neutral-500"}`}
          >
            <ShoppingBag size="20" />
            Orders
          </Link>
          <Link
            href={"/admin/create-products"}
            className={`flex items-center gap-2 whitespace-nowrap text-sm duration-300 hover:text-main ${pathname === "/admin/create-products" ? "text-main" : "text-neutral-500"}`}
          >
            <FolderAdd size="20" />
            Create Products
          </Link>
          <span
            className={`flex items-center gap-2 whitespace-nowrap text-sm text-neutral-500 duration-300 hover:text-main`}
          >
            <CiLogout size={20} />
            Logout
          </span>
        </div>
      </section>
    </>
  );
}
