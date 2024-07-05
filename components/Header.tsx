"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../public/assets/cart.png";
import { BsList, BsX, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscAccount } from "react-icons/vsc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiHeart, BiStore } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Menu, ShoppingCart } from "iconsax-react";
import MenuPopup from "./MenuPopup";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/features/product/productSlice";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  const [show, setShow] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.product.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setShow((show: boolean) => !show);
    setIsOpen(false);
  };

  // STORE CART ITEMS TO LOCALSTORAGE
  useEffect(() => {
    if (Object.values(cart).length >= 1) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // RETRIEVE CART ITEMS FROM LOCALSTORAGE ON INITIAL RENDER
  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(setProducts(JSON.parse(localStorage.getItem("cart") as string)));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <header
        className={`${sticky ? "fixed shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "absolute border-b border-neutral-900"} left-0 top-0 z-[999] flex  w-full items-center bg-goldie-300 py-3 lg:h-20`}
      >
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={` z-30 inline-block cursor-pointer lg:hidden`}
              onClick={handleClick}
            >
              {show ? <BsX size={32} /> : <BsList size={30} />}
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
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="relative w-[30px] cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              {/* <Image
                src={CartIcon}
                className="h-[22px] w-auto"
                alt="Goldis Logo"
              /> */}
              <span>
                <IoCartOutline size={24} />
              </span>
              {Object.values(cart) && Object.values(cart).length >= 0 && (
                <span className="absolute -right-1 top-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-[#fcf7e8]">
                  {Object.values(cart).length}
                </span>
              )}
            </div>
            <div className="hidden lg:block">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <FaRegUserCircle size={20} /> Account
                {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
              {isOpen && (
                <MenuPopup className="absolute right-0 top-16 z-20 w-[190px] rounded-md bg-[#E4D064] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <div className="">
                    <Link
                      href={"/my-account"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <FaRegUserCircle size={20} />
                      My Account
                    </Link>
                    <Link
                      href={"/my-orders"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <BiStore size={20} />
                      Orders
                    </Link>
                    <Link
                      href={"/saved-items"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <BiHeart size={20} />
                      Saved Items
                    </Link>
                  </div>
                  <div className="my-2 border-b border-black border-opacity-50"></div>
                  <Link
                    href={`/login`}
                    className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                  >
                    Sign In
                  </Link>
                </MenuPopup>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        pathname={pathname}
        show={show}
        setShow={setShow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Header;
