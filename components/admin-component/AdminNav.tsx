"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import AdminSideBar from "./AdminSideBar";
import MobileSideBar from "./MobileSideBar";
import MenuPopup from "../MenuPopup";
import { BiHeart, BiStore } from "react-icons/bi";
import { Lock1, SearchNormal1, Setting2, User } from "iconsax-react";
import moment from "moment";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const [sticky, setSticky] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().format("H:mm"));
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("H:mm")), 60000;
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`${sticky ? "shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:fixed" : "lg:absolute"} sticky left-0 top-0  z-[999] w-full bg-black py-3`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-block text-goldie-300 lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <BsList size={24} />
            </span>
            <Link href="/" className="relative">
              <Image
                src="/assets/goldis-gold-logo.png"
                className="w-[100px] lg:w-[130px]"
                width={175}
                height={92}
                alt="Goldis Logo"
                priority
              />
            </Link>
          </div>

          <div className="relative inline-flex items-center justify-end gap-4">
            <div className="inline-flex items-center justify-end">
              <label
                htmlFor="search"
                className={`inline-block w-min rounded-l-md bg-goldie-300 duration-300 ${openSearch ? "bg-opacity-20 opacity-100" : "opacity-0"}`}
              >
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  id="search"
                  placeholder="Search..."
                  className={`${openSearch ? "w-[400px] px-4" : "w-0 px-0"} border-none bg-transparent text-[13px] text-goldie-300 duration-300 placeholder:text-goldie-300 placeholder:text-opacity-50 focus:border-0 focus:outline-none focus:ring-0`}
                />
              </label>
              <span
                className={`${openSearch ? "rounded-l-none bg-opacity-20" : "rounded-l-md bg-opacity-0"} inline-flex h-10 w-10 items-center justify-center rounded-r-md bg-goldie-300  duration-300`}
                onClick={() => setOpenSearch((prev) => !prev)}
              >
                {openSearch ? (
                  <BsX size={18} className="inline-block text-goldie-300" />
                ) : (
                  <BsSearch
                    size={18}
                    className="inline-block text-goldie-300"
                  />
                )}
              </span>
            </div>
            <span className="relative inline-block cursor-pointer text-goldie-300">
              <IoMdNotificationsOutline size={24} />
              <span className="absolute right-0.5 top-1 inline-block h-1.5 w-1.5 rounded-full bg-red-600 text-sm outline outline-2 outline-black"></span>
            </span>
            <div className="hidden gap-3  sm:inline-flex">
              <span className="text-sm font-normal text-goldie-300">
                {moment().format("ddd D MMM")}
              </span>
              <span className="text-sm font-normal text-goldie-300">
                {currentTime}
              </span>
            </div>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 border-l border-goldie-300 border-opacity-40 pl-4 text-goldie-300"
            >
              <FaRegUserCircle size={20} />{" "}
              <span className="hidden text-sm md:inline-flex md:items-center md:gap-3">
                Account {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
            </button>
            {isOpen && (
              <MenuPopup className="absolute -right-3 top-10 z-40 w-[190px] rounded-md bg-[#E4D064] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                <div className="mb-2 flex items-center justify-center gap-3 border-b border-black border-opacity-20 p-2 pb-3 sm:hidden">
                  <span className="text-sm font-normal text-black">
                    {moment().format("ddd D MMM")}
                  </span>
                  <span>-</span>
                  <span className="text-sm font-normal text-black">
                    {currentTime}
                  </span>
                </div>
                <div className="">
                  <span
                    className="flex cursor-pointer items-center gap-2  whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    onClick={() => router.push(`/admin/settings?tab=account`)}
                  >
                    <User size={20} />
                    My Account
                  </span>
                  <span
                    className="flex cursor-pointer items-center gap-2  whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    onClick={() =>
                      router.push(`/admin/settings?tab=change-password`)
                    }
                  >
                    <Lock1 size={20} />
                    Change Password
                  </span>
                </div>
                <div className="my-2 border-b border-black border-opacity-50"></div>
                <Link
                  href={`/admin/logout`}
                  className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950"
                >
                  Logout
                </Link>
              </MenuPopup>
            )}
          </div>
        </div>
        <div
          className={`fixed top-0 h-screen w-full duration-300 ${open ? "left-0" : "-left-full"}`}
        >
          <span
            className="absolute left-3 top-4 z-50 inline-block cursor-pointer text-goldie-300"
            onClick={() => setIsOpen(false)}
          >
            <BsX size={30} />
          </span>
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed  top-0 z-30 h-screen w-full bg-black bg-opacity-50 ${open ? "left-0" : "-left-full"}`}
          ></div>
          <div className="absolute left-0 top-0 z-[40] h-screen w-[250px]">
            <MobileSideBar />
          </div>
        </div>
        {/* {open && (
          <div
            className={`fixed top-0 z-50 bg-black bg-opacity-50 duration-300 ${open ? "left-0" : "-left-full"}`}
          >
            <div className="absolute left-0 top-0 h-screen w-[250px]">
              <MobileSideBar />
            </div>
          </div>
        )} */}
      </nav>
    </>
  );
}
