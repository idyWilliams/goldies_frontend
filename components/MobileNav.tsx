import Link from "next/link";
import { BiHeart, BiStore } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MobileNav = ({ pathname, show, setShow, isOpen, setIsOpen }: any) => {
  return (
    <div
      className={`fixed top-0 z-10 flex h-screen w-full justify-start bg-black bg-opacity-30 backdrop-blur-md duration-300 lg:hidden ${show ? "left-0" : "-left-full"}`}
    >
      <div className="flex h-full w-8/12 flex-col gap-8 bg-[#f4ecc1] p-9 pt-20 sm:w-6/12">
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev: any) => !prev)}
            className="flex items-center gap-2"
          >
            <FaRegUserCircle size={20} /> Account
            {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
          {isOpen && (
            <div className="absolute right-0 top-10 z-20 w-[190px] rounded-md bg-[#f4ecc1] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
              <div className="">
                <span className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20">
                  <FaRegUserCircle size={20} />
                  My Account
                </span>
                <span className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20">
                  <BiStore size={20} />
                  Orders
                </span>
                <span className="flex items-center gap-2 whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20">
                  <BiHeart size={20} />
                  Saved Items
                </span>
              </div>
              <div className="my-2 border-b border-black border-opacity-50"></div>
              <Link
                href={`/login`}
                className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/"
          className={`${pathname === "/" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Home
        </Link>
        <Link href="/#about" onClick={() => setShow(false)}>
          About
        </Link>
        <Link
          href="/shop"
          className={`${pathname === "/shop" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Shop Cake
        </Link>
        <Link
          href="/bespoke"
          className={`${pathname === "/bespoke" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Bespoke Cake Order
        </Link>
        <Link href="/#testimonials" onClick={() => setShow(false)}>
          Testimonials
        </Link>
        <Link href="/#contact" onClick={() => setShow(false)}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
