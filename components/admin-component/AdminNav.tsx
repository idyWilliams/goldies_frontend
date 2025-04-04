"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Bag,
  Check,
  Clock,
  Lock1,
  MessageSquare,
  User,
  UserCirlceAdd,
} from "iconsax-react";
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
import Logo from "@/public/assets/new-logo/logo-colored.svg";
import useMobile from "@/services/hooks/admin/useMobile";
import { SearchModal } from "./SearchModal";
import Fuse from "fuse.js";
import { PopoverClose } from "@radix-ui/react-popover";
import { useNotifications } from "@/services/hooks/admin/adminNotification/useNotifications";
import { useSocket } from "@/context/SocketProvider";
import { AlertCircle, Bell } from "lucide-react";

export default function AdminNav() {
  const router = useRouter();
  const [openSider, setIsOpenSidebar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { auth } = useAuth();
  const isMobile = useMobile();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isLoading,
    error,
    refresh,
  } = useNotifications(auth?.admin?.id, auth?.admin?.role!);
  const formatRole = (status: string) => status?.replace(/_/g, " ");
  console.log(auth, "auth");
  // Map search terms to routes
  const sectionMap: { [key: string]: string } = {
    Overview: "/admin",
    Products: "/admin/products",
    Customers: "/admin/customers",
    Orders: "/admin/orders",
    "Create Products": "/admin/create-products",
    "Manage Categories": "/admin/manage-categories",
    Settings: "/admin/settings",
  };

  if (auth?.admin?.role === "super_admin") {
    sectionMap["Invite Admin"] = "/admin/invite";
  }

  // Initialize Fuse.js with the sectionMap keys
  const fuse = new Fuse(Object.keys(sectionMap), {
    includeScore: true,
    threshold: 0.3, // Adjust threshold for fuzziness
    includeMatches: true,
  });

  // Custom debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch search suggestions using Fuse.js
  const fetchSuggestions = debounce((query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(query);
    const filtered = results.map((result) => result.item);
    setSuggestions(filtered);
  }, 300);

  // Handle search
  const handleSearch = () => {
    const matchedKey = Object.keys(sectionMap).find(
      (key) => key.toLowerCase() === searchTerm.trim().toLowerCase(),
    );

    if (matchedKey) {
      router.push(sectionMap[matchedKey]);
      setOpenSearch(false);
      setSearchTerm("");
      setSuggestions([]);
    } else {
      console.log("No matching section found");
    }
    setSuggestions([]);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    router.push(sectionMap[suggestion]);
    setOpenSearch(false);
    setSearchTerm("");
    setSuggestions([]);
  };

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <>
      <nav
        className={` fixed left-0 top-0 z-50 w-full border-b border-neutral-300 bg-white py-3`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-block cursor-pointer text-brand-200 lg:hidden"
              onClick={() => setIsOpenSidebar(true)}
            >
              <BsList size={24} />
            </span>
            <Link href="/admin" className="relative">
              <Image
                src={Logo}
                className="w-[100px] lg:w-[130px]"
                width={175}
                height={92}
                alt="Goldis Logo"
                priority
              />
            </Link>
          </div>

          <div className="relative inline-flex items-center justify-end gap-4">
            {isMobile ? (
              <SearchModal
                open={openSearch}
                onOpenChange={setOpenSearch}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
                onSearch={handleSearch}
                fetchSuggestions={fetchSuggestions}
              />
            ) : (
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
                    className={`${openSearch ? "px-4 lg:w-[400px]" : "w-0 px-0"} border-none bg-transparent text-[13px] text-brand-200 duration-300 placeholder:text-brand-200 placeholder:text-opacity-50 focus:border-0 focus:outline-none focus:ring-0`}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      fetchSuggestions(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />
                </label>
                <span
                  className={`${openSearch ? "rounded-l-none bg-opacity-20" : "rounded-l-md bg-opacity-0"} relative inline-flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-md bg-goldie-300 duration-300`}
                  onClick={toggleSearch}
                >
                  {openSearch ? (
                    <BsX size={18} className="inline-block text-brand-200" />
                  ) : (
                    <BsSearch
                      size={18}
                      className="inline-block text-brand-200"
                    />
                  )}
                </span>

                {/* Suggestions Dropdown */}
                {openSearch && searchTerm.trim() && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-[400px] rounded-md bg-white shadow-lg">
                    {suggestions.length > 0 ? (
                      <ul className="max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-2 text-center text-sm text-neutral-500">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* notifications */}
            <Popover>
              <PopoverTrigger>
                <span className="relative inline-block cursor-pointer text-brand-200">
                  <IoMdNotificationsOutline size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute right-0.5 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </span>
              </PopoverTrigger>
              {/* <PopoverTrigger>
                <span className="relative inline-block cursor-pointer text-brand-200">
                  <IoMdNotificationsOutline size={24} />
                  <span className="absolute right-0.5 top-1 inline-block h-1.5 w-1.5 rounded-full bg-red-600 text-sm outline outline-2 outline-black"></span>
                </span>
              </PopoverTrigger> */}
              <PopoverContent className="w-[320px] border border-white/20 bg-brand-200 p-0 shadow-2xl">
                <NotificationBar
                  adminId={auth?.admin?.id!}
                  role={auth?.admin?.role!}
                />
              </PopoverContent>
            </Popover>

            <div className="hidden gap-3  sm:inline-flex">
              <CurrentTime text="text-brand-200" />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 border-l border-goldie-300 border-opacity-40 pl-4 text-brand-200 "
                >
                  <FaRegUserCircle size={20} />{" "}
                  <div className="hidden text-sm capitalize md:flex md:items-center md:gap-3">
                    <div className="flex max-w-[120px] flex-col">
                      <span className="truncate">
                        {auth?.admin ? auth?.admin?.userName : "No username"}
                      </span>
                      <span className="text-xs">
                        {auth?.admin
                          ? formatRole(auth?.admin?.role)
                          : "No Role"}
                      </span>
                    </div>
                    {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[190px] rounded-md border-brand-200 bg-brand-200 p-2.5 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                <div className="mb-2 flex items-center justify-start gap-3 border-b border-black border-opacity-20 p-2 pb-3 sm:hidden">
                  <p className="truncate text-brand-100">
                    {auth?.admin ? auth?.admin?.userName : "No username"}
                  </p>
                </div>
                <div className="">
                  <PopoverClose asChild>
                    <span
                      className="flex cursor-pointer items-center gap-2  whitespace-nowrap rounded-[3px] p-2 text-sm text-brand-100 duration-300 hover:bg-black hover:bg-opacity-20"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/admin/settings?tab=profile`);
                      }}
                    >
                      <User size={20} />
                      My Account
                    </span>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <span
                      className="flex cursor-pointer items-center gap-2  whitespace-nowrap rounded-[3px] p-2 text-sm text-brand-100 duration-300 hover:bg-black hover:bg-opacity-20"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/admin/settings?tab=change-password`);
                      }}
                    >
                      <Lock1 size={20} />
                      Change Password
                    </span>
                  </PopoverClose>
                </div>
                <div className="my-2 border-b border-black border-opacity-50"></div>
                <button
                  className="flex w-full cursor-pointer items-center justify-center rounded-sm bg-brand-100  px-7 py-2.5 text-center text-sm  text-brand-200 duration-300 hover:bg-brand-100"
                  role="button"
                  onClick={() => adminLogOut(router)}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          className={`fixed top-0 h-screen w-full duration-300 lg:hidden ${openSider ? "left-0" : "-left-full"}`}
        >
          <span
            className="absolute left-3 top-4 z-50 inline-block cursor-pointer text-brand-200"
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
interface NotificationBarProps {
  adminId: string | undefined;
  role: string;
}

const NotificationBar = ({ adminId, role }: NotificationBarProps) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isLoading,
    error,
    refresh,
  } = useNotifications(adminId, role);
  const { socket } = useSocket();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    // Emit to backend
    socket?.emit("mark-all-read");
  };

  const notifyType = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "alert":
        return <AlertCircle className="h-5 w-5" />;
      case "reminder":
        return <Clock className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card className={cn("w-full border-0 bg-transparent shadow-none")}>
      <CardHeader className="mb-2 px-4 text-white">
        <CardTitle className="text-white">Notifications</CardTitle>
        <CardDescription className="text-neutral-300">
          You have {unreadCount} unread{" "}
          {unreadCount === 1 ? "message" : "messages"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-600 border-t-brand-100"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="grid gap-6">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="grid h-full cursor-pointer grid-cols-[40px_1fr] items-start gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-800"
                onClick={() => markAsRead(notification._id)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 bg-opacity-20 text-brand-200">
                  {notifyType(notification.type)}
                </div>
                <div className="space-y-2">
                  <p
                    className={cn(
                      "text-sm font-medium leading-none text-white",
                      !notification.isRead && "font-semibold",
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className="text-sm text-neutral-200">
                    {notification.message}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Bell className="h-8 w-8 text-neutral-400" />
            </div>
            <p className="text-lg font-medium text-neutral-300">
              No notifications
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              You&apos;re all caught up!
            </p>
          </div>
        )}
      </CardContent>
      {notifications.length > 0 && (
        <CardFooter className="px-4">
          <Button
            className="w-full bg-transparent text-brand-100 ring-1 ring-brand-100 hover:bg-brand-100 hover:bg-opacity-10"
            onClick={handleMarkAllAsRead}
          >
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
