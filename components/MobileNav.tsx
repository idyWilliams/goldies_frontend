import useActivePath from "@/app/_hooks/useActivePath";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiHeart, BiStore } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MobileNav = ({
  pathname,
  show,
  setShow,
  isOpen,
  setIsOpen,
  isLogin,
  logOut,
}: any) => {
  const router = useRouter();
  const navigateToLogin = useActivePath();

  return (
    <div
      onClick={() => setShow(false)}
      className={`fixed top-0 z-50 flex h-screen w-full justify-start bg-black bg-opacity-30 backdrop-blur-md duration-300 lg:hidden ${show ? "left-0" : "-left-full"}`}
    >
      <div
        onClick={(e: any) => e.stopPropagation()}
        className="flex h-full w-8/12 flex-col gap-8 bg-goldie-300 p-9 pl-4 pt-24 sm:w-6/12"
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev: any) => !prev)}
            className="flex items-center gap-2"
          >
            <FaRegUserCircle size={20} /> Account
            {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
          {isOpen && (
            <div className="absolute right-0 top-10 z-20 w-[190px] rounded-md bg-[#e9da88] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
              <div className="">
                <span
                  // onClick={() => setShow(false)}
                  onClick={() => {
                    isLogin ? router.push("/my-account") : navigateToLogin();
                    setShow(false);
                  }}
                  // href={isLogin ? "/my-account" : "/sign-in"}
                  className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <FaRegUserCircle size={20} />
                  My Account
                </span>
                <span
                  onClick={() => {
                    isLogin ? router.push("/my-orders") : navigateToLogin();
                    setShow(false);
                  }}
                  // href={isLogin ? "/my-orders" : "/sign-in"}
                  className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <BiStore size={20} />
                  Orders
                </span>
                <span
                  onClick={() => {
                    isLogin ? router.push("/saved-items") : navigateToLogin();
                    setShow(false);
                  }}
                  // href={isLogin ? "/saved-items" : "/sign-in"}
                  className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                >
                  <BiHeart size={20} />
                  Saved Items
                </span>
              </div>
              <div className="my-2 border-b border-black border-opacity-50"></div>

              <span
                onClick={() => {
                  isLogin ? logOut() : router.push("/sign-in");
                  setShow(false);
                }}
                className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
              >
                {isLogin ? "Logout" : "Sign In"}
              </span>
            </div>
          )}
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
    </div>
  );
};

export default MobileNav;
