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
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/helper/cn";

interface MobileNavProps {
  pathname: string;
  show: boolean;
  setShow: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  logOut: () => void;
  user: IUser;
}

const MobileNav: React.FC<MobileNavProps> = ({
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
        className={`fixed top-0 z-40 flex h-screen w-full justify-start bg-black bg-opacity-30 backdrop-blur-md transition duration-300 xl:hidden ${show ? "left-0" : "-left-full"}`}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 z-40 flex h-screen w-full flex-col gap-8 bg-brand-100 p-9 pl-4 pt-24 duration-300 sm:w-6/12 xl:hidden ${show ? "left-0" : "-left-full"}`}
      >
        <div className="relative lg:hidden">
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
                {!user ? <span>Account</span> : <span>{user?.firstName}</span>}
                {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[190px] rounded-md  bg-brand-200 p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
              <div className="">
                <PopoverClose asChild>
                  <span
                    // href={isLogin ? "/my-account" : "/sign-in"}
                    onClick={() => {
                      setIsOpen(false);
                      setShow(false);
                      user ? router.push("/my-account") : navigateToLogin();
                    }}
                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm text-brand-100 duration-300 hover:bg-black hover:bg-opacity-20"
                  >
                    <FaRegUserCircle size={20} />
                    My Account
                  </span>
                </PopoverClose>

                <PopoverClose asChild>
                  <span
                    // href={isLogin ? "/my-orders" : "/sign-in"}
                    onClick={() => {
                      setIsOpen(false);
                      setShow(false);
                      user ? router.push("/my-orders") : navigateToLogin();
                    }}
                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm text-brand-100 duration-300 hover:bg-black hover:bg-opacity-20"
                  >
                    <BiStore size={20} />
                    Orders
                  </span>
                </PopoverClose>

                <PopoverClose asChild>
                  <span
                    onClick={() => {
                      setIsOpen(false);
                      setShow(false);
                      user ? router.push("/saved-items") : navigateToLogin();
                    }}
                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm text-brand-100 duration-300 hover:bg-black hover:bg-opacity-20"
                  >
                    <BiHeart size={20} />
                    Saved Items
                  </span>
                </PopoverClose>
              </div>
              <div className="my-2 border-b border-black border-opacity-50"></div>
              {user ? (
                <Button
                  className="inline-block w-full cursor-pointer rounded-sm bg-brand-100 px-7 py-2.5 text-center text-sm text-brand-200 duration-300 hover:bg-brand-100"
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
                  className="inline-block w-full cursor-pointer rounded-sm bg-brand-100 px-7 py-2.5 text-center text-sm text-brand-200 duration-300 hover:bg-brand-100"
                  onClick={() => {
                    200;
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
        <div className="mt-3 inline-grid gap-6">
          <Link
            href="/"
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/" ? "font-medium" : "",
            )}
            onClick={() => setShow(false)}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setShow(false)}
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/about-us" ? "font-medium" : "",
            )}
          >
            About
          </Link>
          <Link
            href="/shop"
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/shop" ? "font-medium" : "",
            )}
            onClick={() => setShow(false)}
          >
            Shop Cake
          </Link>
          <Link
            href="/bespoke"
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/bespoke" ? "font-medium" : "",
            )}
            onClick={() => setShow(false)}
          >
            Bespoke Cake Order
          </Link>
          <Link
            href="/testimonials"
            onClick={() => setShow(false)}
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/testimonials" ? "font-medium" : "",
            )}
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            onClick={() => setShow(false)}
            className={cn(
              `text-xl uppercase text-brand-200 duration-300 hover:translate-x-2`,
              pathname === "/contact" ? "font-medium" : "",
            )}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
