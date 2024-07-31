"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import AccountInfo from "@/components/my-account-comps/AccountInfo";
import ChangePassword from "@/components/my-account-comps/ChangePassword";
import MyAddresses from "@/components/my-account-comps/MyAddresses";
import Orders from "@/components/my-account-comps/Orders";
import SavedItems from "@/components/my-account-comps/SavedItems";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { Book, Box, HeartTick, Lock1, Logout, UserSquare } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { act, useEffect, useState } from "react";

const tabs = [
  {
    label: "Account Details",
    icon: <UserSquare size={40} />,
  },
  {
    label: "Recent Orders",
    icon: <Box size={40} />,
  },
  {
    label: "Saved Items",
    icon: <HeartTick size={40} />,
  },
  {
    label: "My Addresses",
    icon: <Book size={40} />,
  },
  // {
  //   label: "Change Password",
  //   icon: <Lock1 />,
  // },
];

function switchTabs(index: any) {
  switch (index) {
    case 0:
      return <AccountInfo />;
    case 1:
      return <Orders />;
    case 2:
      return <SavedItems />;
    case 3:
      return <MyAddresses />;
    // case 4:
    //   return <ChangePassword />;
    default:
      break;
  }
}

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [subPage, setSubPage] = useState(false);
  const router = useRouter();

  const handleTab = (index: number, label: string) => {
    setActiveTab(index);
    const newUrl = label?.toLowerCase().replace(/ /g, "-");
    router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const newUrl = tabs[activeTab]?.label?.toLowerCase().replace(/ /g, "-");
    router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
  }, [activeTab, router]);

  return (
    <>
      <Layout>
        <div className="mt-[65px] lg:mt-20"></div>
        {/* BREADCRUMBS */}
        <div className="bg-black">
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
        <section className="relative bg-neutral-50 px-4 py-8 lg:bg-neutral-200">
          <div className="gap-4 tabular-nums md:grid md:grid-cols-[30%_1fr] md:items-start md:justify-between lg:mx-auto lg:max-w-[1000px] xl:max-w-[1140px]">
            <h1 className="col-span-2 text-left text-2xl font-bold">
              My Account
            </h1>

            <div className="mb-4 mt-5 grid h-full flex-wrap gap-4 border-b border-neutral-200 pb-4 md:my-0 md:flex-col md:bg-neutral-900 md:p-4 lg:flex lg:gap-4">
              <EachElement
                of={tabs}
                render={(tab: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleTab(index, tab?.label)}
                    className={cn(
                      "flex cursor-pointer items-center justify-start gap-2 border border-neutral-500 bg-white px-3 py-2 md:w-full md:rounded-none md:border-0 lg:gap-3",
                      activeTab === index &&
                        "bg-neutral-900 text-goldie-300 md:justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-5 items-center justify-center gap-2 text-neutral-500",
                        activeTab === index && "text-goldie-300",
                      )}
                    >
                      {tab.icon}
                    </div>
                    <h3
                      className={cn(
                        "w-auto whitespace-nowrap text-neutral-500 opacity-100 duration-300 md:text-xl",
                        activeTab === index && "text-goldie-300",
                      )}
                    >
                      {tab.label}
                    </h3>
                  </div>
                )}
              />
              <div
                key="logout"
                className={cn(
                  "hidden cursor-pointer items-center justify-start gap-2 px-3 py-2 lg:flex",
                )}
              >
                <div
                  className={cn(
                    "flex w-5 items-center justify-center gap-2 text-neutral-500",
                  )}
                >
                  <Logout />
                </div>
                <h3
                  className={cn(
                    "w-auto whitespace-nowrap text-center text-xs text-neutral-500 opacity-100 duration-300 md:text-xl",
                  )}
                >
                  Log out
                </h3>
              </div>
            </div>

            <div className="hidden md:h-full md:bg-white md:p-4 lg:block">
              {switchTabs(activeTab)}
            </div>
          </div>
          {subPage && <div></div>}
        </section>
      </Layout>
    </>
  );
};

export default Page;
