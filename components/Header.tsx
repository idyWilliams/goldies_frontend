"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../public/assets/cart.png";
import { BsList, BsXLg } from "react-icons/bs";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    setShow((show: boolean) => !show);
  };

  return (
    <>
      <header className={`relative z-[999] bg-main py-3`}>
        <div className="wrapper flex items-center justify-between">
          <Link href="/" className="relative">
            <Image
              src="/assets/goldis-logo.png"
              className="w-[130px]"
              width={175}
              height={92}
              alt="Goldis Logo"
            />
          </Link>
          <div
            className={`fixed top-0 z-10 flex h-screen w-full justify-end bg-black bg-opacity-30 backdrop-blur-md duration-300 lg:static lg:h-auto lg:w-auto lg:bg-transparent ${show ? "right-0" : "-right-full"}`}
          >
            <div className="flex h-full w-8/12 flex-col gap-8 bg-[#f4ecc1] p-9 pt-20 sm:w-6/12 lg:w-auto lg:flex-row lg:gap-8 lg:bg-transparent lg:p-0">
              <Link
                href="/"
                className={`${pathname === "/" ? "font-bold" : ""}`}
              >
                Home
              </Link>
              <Link href="/#about">About</Link>
              <Link
                href="/shop"
                className={`${pathname === "/shop" ? "font-bold" : ""}`}
              >
                Shop Cake
              </Link>
              <Link
                href="/bespoke"
                className={`${pathname === "/bespoke" ? "font-bold" : ""}`}
              >
                Bespoke Cake Order
              </Link>
              <Link href="/#testimonials">Testimonials</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="relative w-[30px] cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <Image
                src={CartIcon}
                className="h-[25px] w-auto"
                alt="Goldis Logo"
              />
              <span className="absolute -right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#B89C3D] text-sm text-[#f4ecc1]">
                0
              </span>
            </div>
            <span
              className={` z-30 inline-block cursor-pointer lg:hidden ${show ? "fixed top-4" : "relative"}`}
              onClick={handleClick}
            >
              {show ? <BsXLg size={28} /> : <BsList size={30} />}
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
