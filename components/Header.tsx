"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../public/assets/cart.png";
import { BsList, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const [show, setShow] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.product.cart);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setShow((show: boolean) => !show);
  };

  return (
    <>
      <ToastContainer />
      <header
        className={`${sticky ? "fixed shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "absolute"} left-0 top-0  z-[999] w-full bg-main py-3`}
      >
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={` z-30 inline-block cursor-pointer lg:hidden ${show ? "fixed top-4" : "relative"}`}
              onClick={handleClick}
            >
              {show ? <BsXLg size={28} /> : <BsList size={30} />}
            </span>
            <Link href="/" className="relative">
              <Image
                src="/assets/goldis-logo.png"
                className="w-[130px]"
                width={175}
                height={92}
                alt="Goldis Logo"
              />
            </Link>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className={`${pathname === "/" ? "font-bold" : ""}`}>
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
          <MobileNav pathname={pathname} show={show} setShow={setShow} />

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
              {Object.values(cart) && Object.values(cart).length >= 1 && (
                <span className="absolute -right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#B89C3D] text-sm text-[#f4ecc1]">
                  {Object.values(cart).length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
