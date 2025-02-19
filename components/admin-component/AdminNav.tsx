"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "@radix-ui/react-icons";
import { Bag, Lock1, User, UserCirlceAdd } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsList, BsSearch, BsX } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdNotificationsOutline,
} from "react-icons/io";
import MobileSideBar from "./MobileSideBar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { adminLogOut } from "@/services/hooks/admin-auth";
import CurrentTime from "./CurrentTime";

export default function AdminNav() {
  const router = useRouter();
  const [openSider, setIsOpenSidebar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { auth } = useAuth();

  const formatRole = (status: string) => status.replace(/_/g, " ");

  return (
    <>
      <nav className={` fixed left-0 top-0 z-50 w-full bg-black py-3`}>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-block cursor-pointer text-goldie-300 lg:hidden"
              onClick={() => setIsOpenSidebar(true)}
            >
              <BsList size={24} />
            </span>
            <Link href="/admin" className="relative">
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
                  className={`${openSearch ? "lg:w-[400px] px-4" : "w-0 px-0"} border-none bg-transparent text-[13px] text-goldie-300 duration-300 placeholder:text-goldie-300 placeholder:text-opacity-50 focus:border-0 focus:outline-none focus:ring-0`}
                />
              </label>
              <span
                className={`${openSearch ? "rounded-l-none bg-opacity-20" : "rounded-l-md bg-opacity-0"} inline-flex h-10 w-10 items-center justify-center rounded-r-md bg-goldie-300  duration-300 cursor-pointer`}
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
            <Popover>
              <PopoverTrigger>
                <span className="relative inline-block cursor-pointer text-goldie-300">
                  <IoMdNotificationsOutline size={24} />
                  <span className="absolute right-0.5 top-1 inline-block h-1.5 w-1.5 rounded-full bg-red-600 text-sm outline outline-2 outline-black"></span>
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] border-0 bg-neutral-950 p-0 shadow-[0_0_30px_rgb(228,208,100,0.3)]">
                <NotificationBar />
              </PopoverContent>
            </Popover>

            <div className="hidden gap-3  sm:inline-flex">
              <CurrentTime text="text-goldie-300" />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 border-l border-goldie-300 border-opacity-40 pl-4 text-goldie-300"
                >
                  <FaRegUserCircle size={20} />{" "}
                  <div className="hidden text-sm capitalize md:flex md:items-center md:gap-3">
                    <div className="flex flex-col">
                      <span>
                        {auth?.admin ? auth?.admin?.userName : "No username"}
                      </span>
                      <span className="text-xs">
                        {auth?.admin? formatRole(auth?.admin?.role) : "No Role"}
                      </span>
                    </div>
                    {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[190px] rounded-md border-[#E4D064] bg-[#E4D064] p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                <div className="mb-2 flex items-center justify-start gap-3 border-b border-black border-opacity-20 p-2 pb-3 sm:hidden">
                  {auth?.admin ? auth?.admin?.userName : "No username"}
                </div>
                <div className="">
                  <span
                    className="flex cursor-pointer items-center gap-2  whitespace-nowrap rounded-[3px] p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    onClick={() => router.push(`/admin/settings?tab=profile`)}
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
                <span
                  className="flex w-full cursor-pointer items-center justify-center rounded-sm bg-black  px-7 py-2.5 text-center text-sm  text-[#E4D064] duration-300 hover:bg-neutral-950"
                  role="button"
                  onClick={() => adminLogOut(router)}
                >
                  Logout
                </span>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          className={`fixed top-0 h-screen w-full duration-300 lg:hidden ${openSider ? "left-0" : "-left-full"}`}
        >
          <span
            className="absolute left-3 top-4 z-50 inline-block cursor-pointer text-goldie-300"
            onClick={() => setIsOpenSidebar(false)}
          >
            <BsX size={30} />
          </span>
          <div
            onClick={() => setIsOpenSidebar(false)}
            className={`fixed  top-0 z-30 h-screen w-full bg-black bg-opacity-50 ${openSider ? "left-0" : "-left-full"}`}
          ></div>
          <div className="absolute left-0 top-0 z-[40] h-screen w-[250px]">
            <MobileSideBar onClose={() => setIsOpenSidebar(false)} />
          </div>
        </div>
      </nav>
    </>
  );
}

const notifications = [
  {
    title: "New Order Received!",
    description: "A new order has been placed.",
    isRead: false,
    type: "order",
  },
  {
    title: "New Customer Joined!",
    description: "A new customer has just signed up.",
    isRead: false,
    type: "user",
  },
];

const notifyType = (type: string) => {
  switch (type?.toLowerCase()) {
    case "user":
      return <UserCirlceAdd size="20" />;
    case "order":
      return <Bag size="20" />;

    default:
      break;
  }
};

const NotificationBar = () => {
  return (
    <Card className={cn("w-full border-0 bg-transparent shadow-none")}>
      <CardHeader className="mb-2 px-4 text-white">
        <CardTitle className="text-white">Notifications</CardTitle>
        <CardDescription className="text-neutral-300">
          You have 2 unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid gap-8">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="grid h-full grid-cols-[40px_1fr] items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-goldie-400 bg-opacity-20 text-goldie-300">
                {notifyType(notification?.type)}
              </div>
              <div className="space-y-1">
                <p
                  className={cn("text-sm font-medium leading-none text-white")}
                >
                  {notification.title}
                </p>
                <p className="text-sm text-neutral-400">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4">
        <Button className="w-full bg-goldie-400 text-goldie-950 hover:bg-goldie-300">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};
