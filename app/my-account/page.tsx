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
import { Book, Box, HeartTick, Lock1, UserSquare } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { BiStore } from "react-icons/bi";
import { CgNpm } from "react-icons/cg";

const tabs = [
  {
    label: "Account Details",
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
    label: "My Addresses",
    icon: <Book />,
  },
  {
    label: "Change Password",
    icon: <Lock1 />,
  },
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
    case 4:
      return <ChangePassword />;
    default:
      break;
  }
}

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = (index: number) => {
    setActiveTab(index);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Layout>
        <div className="mt-[65px] lg:mt-20"></div>
        {/* BREADCRUMBS */}
        <div className="bg-black px-4 py-3">
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
        <section className=" px-4 py-8 md:bg-neutral-200">
          <h1 className="flex flex-col items-center justify-center gap-1 text-center text-2xl font-bold after:inline-block after:h-1 after:w-[100px] after:bg-goldie-500">
            My Account
          </h1>

          <div className="mt-5 gap-4 md:grid md:grid-cols-[30%_1fr] md:items-start md:justify-between lg:mx-auto lg:max-w-[1000px] xl:max-w-[1140px]">
            <div className="mb-4 mt-5 flex h-full flex-wrap gap-2 border-b border-neutral-200 pb-4 md:my-0 md:flex-col md:bg-white md:p-4">
              <EachElement
                of={tabs}
                render={(tab: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleTab(index)}
                    className={cn(
                      "flex cursor-pointer items-center justify-start gap-1 rounded-md border border-neutral-500 px-3 py-2 md:w-full md:rounded-none md:border-0",
                      activeTab === index &&
                        "w-min justify-center bg-neutral-900 text-goldie-300 md:justify-start",
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
                        "w-auto whitespace-nowrap text-center text-xs text-neutral-500 opacity-100 duration-300 md:text-sm",
                        activeTab === index && "text-goldie-300",
                      )}
                    >
                      {tab.label}
                    </h3>
                  </div>
                )}
              />
            </div>

            <div className="md:h-full md:bg-white md:p-4">
              {switchTabs(activeTab)}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Page;
