"use client";
import useActivePath from "@/app/_hooks/useActivePath";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/helper/cn";
import { RootState } from "@/redux/store";
import { USER_DETAILS, USER_TOKEN_NAME } from "@/utils/constants";
import { Ghost } from "iconsax-react";
import Cookies from 'js-cookie';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiHeart, BiStore } from "react-icons/bi";
import { BsList, BsX } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../public/assets/goldis-logo.png";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Header = () => {
  const [show, setShow] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.product.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const { isLogin, auth, setIsLogin, setAuth } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShow((show: boolean) => !show);
    setIsOpen(false);
  };

  // Handle User logout
  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    localStorage.setItem("isLogin", JSON.stringify(false));
    Cookies.remove(USER_TOKEN_NAME);
    Cookies.remove(USER_DETAILS);
    router.replace("/sign-in");

    if (
      pathname.includes("/my-account") ||
      pathname.includes("/my-orders") ||
      pathname.includes("/saved-items")
    ) {
      router.replace("/sign-in");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToLogin = useActivePath();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") as string);
    setUser(storedUser?.user);
    setAuth(storedUser);
    if (typeof window !== "undefined") {
      const isLoggedIn = JSON.parse(localStorage.getItem("isLogin") as string);
      setIsLogin(Boolean(isLoggedIn));
    }
  }, [setAuth, setIsLogin]);

  return (
    <>
      <header
        className={`${sticky ? "sticky shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "relative border-b border-neutral-900"} left-0 top-0 z-50 flex  w-full items-center bg-goldie-300 py-3 lg:h-20`}
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
                src={Logo}
                priority
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
            <Link
              href="/about-us"
              className={`${pathname === "/about-us" ? "font-bold" : ""}`}
            >
              About
            </Link>
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
            <Link
              href="/testimonials"
              className={`${pathname === "/testimonials" ? "font-bold" : ""}`}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className={`${pathname === "/contact" ? "font-bold" : ""}`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href={"/cart"}>
              <button className="relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center">
                <span>
                  <IoCartOutline size={24} className="mb-0" />
                </span>
                {Object.values(cart) && Object.values(cart).length >= 0 && (
                  <span className="absolute -right-1 top-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-[#fcf7e8]">
                    {Object.values(cart).length}
                  </span>
                )}
              </button>
            </Link>
            <div className="hidden lg:block">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen((prev) => !prev);
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
                        isLogin
                          ? router.push("/my-account")
                          : navigateToLogin();
                      }}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <FaRegUserCircle size={20} />
                      My Account
                    </span>
                    <span
                      // href={isLogin ? "/my-orders" : "/sign-in"}
                      onClick={() => {
                        isLogin ? router.push("/my-orders") : navigateToLogin();
                      }}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <BiStore size={20} />
                      Orders
                    </span>

                    <span
                      onClick={() => {
                        isLogin
                          ? router.push("/saved-items")
                          : navigateToLogin();
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
                      onClick={() => logOut()}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                      onClick={() => router.push("/sign-in")}
                    >
                      Sign In
                    </Button>
                  )}
                </PopoverContent>
              </Popover>
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
        isLogin={isLogin}
        logOut={logOut}
        user={user}
      />

      <SessionModal
        open={showModal}
        setOpen={setShowModal}
        title="Session not found"
        content="Your session does not exist or has expired. Please Sign in again"
        action={() => {
          router.push("/sign-in");
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Header;
type ComponentProp = {
  open: boolean;
  setOpen: any;
  title: string;
  content: string;
  action: () => void;
};

const SessionModal: React.FC<ComponentProp> = ({
  open,
  setOpen,
  title,
  content,
  action,
}) => {
  const pathname = usePathname();
  const show = pathname.includes("/sign-in") || pathname.includes("/sign-in");
  return (
    <>
      {!show && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader className={cn("hidden")}>
            <DialogTitle className="mb-2 mt-6 font-semibold text-neutral-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-neutral-500">
              {content}
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 text-goldie-300">
                <Ghost size={24} />
              </span>

              <h3 className="mb-2 mt-6 font-semibold text-neutral-900">
                {title}
              </h3>
              <p className="text-neutral-500">{content}</p>
              <Button
                onClick={action}
                className="mt-6 h-auto w-full rounded-full bg-neutral-900 py-3 text-goldie-300"
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
