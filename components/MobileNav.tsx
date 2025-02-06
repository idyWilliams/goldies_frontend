import useActivePath from "@/app/_hooks/useActivePath";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiHeart, BiStore } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import React from "react";
import { IUser } from "@/interfaces/user.interface";
import { Button } from "./ui/button";

interface MobileNavProps {
  pathname: string;
  show: boolean;
  setShow: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLogin: boolean;
  logOut: () => void;
  user: IUser;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isLogin,
  isOpen,
  logOut,
  pathname,
  setIsOpen,
  setShow,
  show,
  user,
}) => {
  const router = useRouter();
  const navigateToLogin = useActivePath();

  return (
    <>
      <div
        onClick={() => setShow(false)}
        className={`fixed top-0 z-40 flex h-screen w-full justify-start bg-black bg-opacity-30 backdrop-blur-md transition duration-300 lg:hidden ${show ? "left-0" : "-left-full"}`}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 z-40 flex h-screen w-8/12 flex-col gap-8 bg-goldie-300 p-9 pl-4 pt-24 duration-300 sm:w-6/12 lg:hidden ${show ? "left-0" : "-left-full"}`}
      >
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="flex items-center gap-2"
              >
                <FaRegUserCircle size={20} />
                {!isLogin ? (
                  <span>Account</span>
                ) : (
                  <span>{user?.firstName}</span>
                )}
                {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[190px] rounded-md border-[#E4D064] bg-[#E4D064] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
              <div className="">
                <span
                  // href={isLogin ? "/my-account" : "/sign-in"}
                  onClick={() => {
                    setIsOpen(false);
                    setShow(false);
                    isLogin ? router.push("/my-account") : navigateToLogin();
                  }}
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <FaRegUserCircle size={20} />
                  My Account
                </span>
                <span
                  // href={isLogin ? "/my-orders" : "/sign-in"}
                  onClick={() => {
                    setIsOpen(false);
                    setShow(false);
                    isLogin ? router.push("/my-orders") : navigateToLogin();
                  }}
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <BiStore size={20} />
                  Orders
                </span>

                <span
                  onClick={() => {
                    setIsOpen(false);
                    setShow(false);
                    isLogin ? router.push("/saved-items") : navigateToLogin();
                  }}
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <BiHeart size={20} />
                  Saved Items
                </span>
              </div>
              <div className="my-2 border-b border-black border-opacity-50"></div>
              {isLogin ? (
                <Button
                  className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                  onClick={() => {
                    setIsOpen(false);
                    setShow(false);
                    logOut();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                  onClick={() => {
                    setIsOpen(false);
                    setShow(false);
                    router.push("/sign-in");
                  }}
                >
                  Sign In
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <Link
          href="/"
          className={`${pathname === "/" ? "font-bold" : ""} duration-300 hover:translate-x-2`}
          onClick={() => setShow(false)}
        >
          Home
        </Link>
        <Link
          href="/about-us"
          onClick={() => setShow(false)}
          className="duration-300 hover:translate-x-2"
        >
          About
        </Link>
        <Link
          href="/shop"
          className={`${pathname === "/shop" ? "font-bold" : ""} duration-300 hover:translate-x-2`}
          onClick={() => setShow(false)}
        >
          Shop Cake
        </Link>
        <Link
          href="/bespoke"
          className={`${pathname === "/bespoke" ? "font-bold" : ""} duration-300 hover:translate-x-2`}
          onClick={() => setShow(false)}
        >
          Bespoke Cake Order
        </Link>
        <Link
          href="/testimonials"
          onClick={() => setShow(false)}
          className="duration-300 hover:translate-x-2"
        >
          Testimonials
        </Link>
        <Link
          href="/contact"
          onClick={() => setShow(false)}
          className="duration-300 hover:translate-x-2"
        >
          Contact
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
