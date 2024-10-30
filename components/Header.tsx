"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../public/assets/cart.png";
import { BsList, BsX, BsXLg } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ToastContainer, toast } from "react-toastify";
import { VscAccount } from "react-icons/vsc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiHeart, BiStore } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Ghost, Menu, ShoppingCart } from "iconsax-react";
import MenuPopup from "./MenuPopup";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/features/product/productSlice";
import { IoCartOutline } from "react-icons/io5";
import Logo from "../public/assets/goldis-logo.png";
import AuthContext from "@/context/AuthProvider";
import { Button } from "./ui/button";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/helper/cn";
import { Toaster } from "sonner";

const Header = () => {
  const [show, setShow] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // @ts-ignore
  const cart = useSelector((state: RootState) => state.product.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  // @ts-ignore
  const { isLogin, auth, setIsLogin, setAuth } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShow((show: boolean) => !show);
    setIsOpen(false);
  };

  // Handle User logout
  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.setItem("isLogin", JSON.stringify(false));
    router.push('/sign-in')
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") as string);
    setUser(storedUser?.user);
    setAuth(storedUser);
    setIsLogin(Boolean(JSON.parse(localStorage.getItem("isLogin") as string)));

    console.log(storedUser, "useehehe");
  }, [setAuth, setIsLogin]);
  console.log(isLogin, "isLogged", auth);

  // // SESSION CHECKER
  // useEffect(() => {
  //   const SESSION_DURATION = 1 * 24 * 60 * 60 * 1000; // 24HRs in milliseconds
  //   const storedSession = JSON.parse(localStorage.getItem("user") as string);

  //   try {
  //     const decodedToken: { iat: number; exp: number } = jwtDecode(
  //       storedSession?.token,
  //     );

  //     const storedTimestamp = decodedToken?.exp * 1000;
  //     const currentTime = new Date().getTime();
  //     const sessionExpired = currentTime - storedTimestamp >= SESSION_DURATION;
  //     console.log(sessionExpired, "Expired");

  //     if (!sessionExpired) {
  //       setIsLogin(true);
  //     } else {
  //       // Session has expired, logout the user
  //       logOut();
  //       setShowModal(true);

  //       // Optionally, inform the user about the session expiry
  //       alert("Your session has expired. Please log in again.");
  //       router.push("/sign-in");
  //     }
  //   } catch (error) {
  //     if (
  //       (!storedSession?.token && !pathname.includes("/sign-in")) ||
  //       !pathname.includes("/sign-up")
  //     ) {
  //       console.error("Error checking session:", pathname.includes("/sign-in"));

  //       setShowModal(true);
  //     }
  //     // Handle the error (e.g., log it, show a user-friendly message)
  //   }
  // }, []);

  return (
    <>
      <Toaster richColors position="top-right" expand={true} />
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
              {isOpen && (
                <MenuPopup className="absolute right-0 top-16 z-20 w-[190px] rounded-md bg-[#E4D064] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <div className="">
                    <Link
                      href={isLogin ? "/my-account" : "/sign-in"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <FaRegUserCircle size={20} />
                      My Account
                    </Link>
                    <Link
                      href={isLogin ? "/my-orders" : "/sign-in"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <BiStore size={20} />
                      Orders
                    </Link>
                    <Link
                      href={isLogin ? "/saved-items" : "/sign-in"}
                      className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    >
                      <BiHeart size={20} />
                      Saved Items
                    </Link>
                  </div>
                  <div className="my-2 border-b border-black border-opacity-50"></div>
                  <span
                    className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                    role="button"
                    onClick={() => logOut()}
                  >
                    Logout
                  </span>
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
