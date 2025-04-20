"use client";

import BreadCrumbs from "@/components/BreadCrumbs";

import AccountInfo from "@/components/my-account-comps/AccountInfo";
import ChangePassword from "@/components/my-account-comps/ChangePassword";
import MyAddresses from "@/components/my-account-comps/MyAddresses";
import Orders from "@/components/my-account-comps/Orders";
import SavedItems from "@/components/my-account-comps/SavedItems";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { Book, Box, HeartTick, Lock1, UserSquare } from "iconsax-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { act, useEffect, useState } from "react";
import arrow from "@/public/assets/back-arrow.png";
import frontarrow from "@/public/assets/frontArrow.png";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/hooks/users";
import { IBillingInfo, IUser } from "@/interfaces/user.interface";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  {
    label: "Account Info",
    icon: <UserSquare />,
  },
  {
    label: "Recent Orders",
    icon: <Box />,
  },
  {
    label: "Saved Items",
    icon: <HeartTick />,
  },
  {
    label: "Shipping Addresses",
    icon: <Book />,
  },
  // {
  //   label: "Change Password",
  //   icon: <Lock1 />,
  // },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<any>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [fetchedUser, setFetcheduser] = useState<IUser>();

  useEffect(() => {
    if (tabQuery) {
      const activeTabIndex = tabs.findIndex(
        (tabObj) =>
          tabObj.label.toLowerCase().replace(/ /g, "-") ===
          tabQuery.toLowerCase(),
      );
      setActiveTab(activeTabIndex >= 0 ? activeTabIndex : 0);
    }
  }, [tabQuery]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (data) {
      setFetcheduser(data.user as IUser);
    }
  }, [data]);

  function switchTabs(index: number) {
    if (isLoading) {
      return (
        <div>
          <div className="mb-4 border-b border-neutral-200 pb-4">
            <Skeleton className="mb-2 h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="mt-4">
            <Skeleton className="ml-auto h-10 w-32" />
          </div>
        </div>
      );
    }
    switch (index) {
      case 0:
        return (
          <AccountInfo
            isLoading={isLoading}
            fetchedUser={fetchedUser as IUser}
          />
        );
      case 1:
        return <Orders />;
      case 2:
        return <SavedItems />;
      case 3:
        return <MyAddresses />;
      // case 4:
      //   return <ChangePassword />;
      default:
        return null;
    }
  }

  const handleTab = (index: number, label: string) => {
    setActiveTab(index);
    const newUrl = label?.toLowerCase().replace(/ /g, "-");
    router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
    window.scrollTo(0, 0);
    if (!isMobileView) window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);

      if (isMobile) {
        setActiveTab(null);
      } else {
        setActiveTab((prevTab: any) => (prevTab === null ? 0 : prevTab));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const newUrl = tabs[activeTab]?.label?.toLowerCase().replace(/ /g, "-");
    if (newUrl) router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
  }, [activeTab, router]);

  return (
    <div>
      <div className="mt-16 bg-brand-200 md:mt-20">
        <div className={cn("wrapper px-4 py-3")}>
          <BreadCrumbs
            items={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "My Account",
                link: "/my-account",
              },
            ]}
          />
        </div>
      </div>
      <section className="px-4 py-8 md:bg-brand-100">
        <h1 className="mb-8 flex flex-col items-center justify-center gap-1 text-center text-2xl font-bold after:inline-block after:h-1 after:w-[100px] after:bg-brand-200">
          My Account
        </h1>

        <div className="  w-full gap-4 tabular-nums md:grid md:grid-cols-[30%_1fr] md:items-start md:justify-between lg:mx-auto lg:max-w-[1000px] xl:max-w-[1140px]">
          <div className="mb-4 h-auto w-full flex-wrap gap-2 border-b border-neutral-200 pb-10 md:my-0 md:flex-col md:bg-white md:p-4 lg:gap-4">
            {isMobileView ? (
              activeTab === null ? (
                <EachElement
                  of={tabs}
                  render={(tab: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleTab(index, tab.label)}
                      className={cn(
                        "mb-8 mt-4 flex cursor-pointer items-center justify-between rounded-md border border-brand-200  py-4 text-brand-200 md:w-full md:rounded-none md:border-0",
                        // icons + labels up
                        activeTab === index &&
                          "w-min justify-center bg-brand-200 text-brand-100 md:justify-start",
                      )}
                    >
                      {/* each icon and label */}
                      <div className="flex items-center justify-start  ">
                        <div
                          className={cn(
                            "flex w-20 items-center justify-center gap-2 text-lg text-brand-200",
                            activeTab === index && "text-brand-200",
                          )}
                        >
                          {tab.icon}
                        </div>
                        <h3
                          className={cn(
                            "w-auto whitespace-nowrap text-center text-lg text-brand-200 opacity-100 duration-300 md:text-sm",
                            activeTab === index && "text-brand-200",
                          )}
                        >
                          {tab.label}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          "mr-4 flex w-5 items-center justify-center gap-2 text-lg text-brand-200 ",
                          activeTab === index && "text-brand-200",
                        )}
                      >
                        <Image src={frontarrow} alt="front arrow" />
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="md:w-full">
                  <button
                    className="mb-4 text-blue-600 underline"
                    onClick={() => setActiveTab(null)}
                  >
                    <Image
                      src={arrow}
                      className="flex w-[20px] items-center"
                      alt="arrow"
                    />
                  </button>
                  {switchTabs(activeTab)}
                </div>
              )
            ) : isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <EachElement
                of={tabs}
                render={(tab: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleTab(index, tab.label)}
                    className={cn(
                      "flex cursor-pointer items-center justify-start gap-1 rounded-md border border-neutral-500 px-3 py-2 md:w-full md:rounded-none md:border-0",
                      activeTab === index &&
                        "w-min justify-center bg-brand-200 text-brand-100 md:justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-5 items-center justify-center gap-2 text-brand-200",
                        activeTab === index && "text-brand-100",
                      )}
                    >
                      {tab.icon}
                    </div>
                    <h3
                      className={cn(
                        "w-auto whitespace-nowrap text-center text-xs text-brand-200 opacity-100 duration-300 md:text-sm",
                        activeTab === index && "text-brand-100",
                      )}
                    >
                      {tab.label}
                    </h3>
                  </div>
                )}
              />
            )}
          </div>

          {!isMobileView && (
            <div className="md:h-full md:bg-white md:p-4">
              {switchTabs(activeTab)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
