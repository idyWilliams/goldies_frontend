"use client";
import Accordion from "@/components/Accordion";
import ChangePassword from "@/components/admin-component/ChangePassword";
import ProfileInfo from "@/components/admin-component/ProfileInfo";
import { ArrowLeft, Lock1, Profile } from "iconsax-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const tabs = [
  {
    label: "Profile Information",
    icon: <Profile />,
  },
  {
    label: "Change Password",
    icon: <Lock1 />,
  },
];
const items = [
  {
    title: "Profile Information",
    content: <ProfileInfo />,
  },
  {
    title: "Change Password",
    content: <ChangePassword />,
  },
];
export default function Page() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <section>
      <div className="min-h-screen px-4 py-5 lg:bg-neutral-300 lg:px-8">
        <div className="">
          <div className="relative mb-5 lg:mb-4 ">
            <span className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 lg:hidden">
              {/* <ArrowLeft /> */}
            </span>
            <h1 className="text-center font-bold uppercase lg:mb-2 lg:text-left">
              settings
            </h1>
          </div>
          <hr className="mb-4 border-0 border-b border-neutral-500" />
          {/* mobile */}
          <div className="lg:hidden">
            <h3 className="my-2">General</h3>
            <Accordion arr={items} />
          </div>
          {/* desktop */}
          <div className="hidden w-full bg-white px-8 py-5 lg:block">
            <div className="flex gap-4">
              {tabs.map((tab: any, index: number) => (
                <div
                  key={index}
                  className={twMerge(
                    "mb-3 inline-flex cursor-pointer items-center gap-2 bg-neutral-100 px-3 py-2 text-black duration-300",
                    selectedTab === index && "text-goldie-300 bg-black",
                  )}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.icon}
                  <h1 className="text-[14px] capitalize">{tab.label}</h1>
                </div>
              ))}
            </div>
            <div className="w-[400px] overflow-hidden bg-white ">
              <div
                className={twMerge(
                  "flex w-[820px] translate-x-0 items-end justify-around duration-300",
                  selectedTab === 1 && "-translate-x-1/2",
                )}
              >
                <ProfileInfo />
                <ChangePassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
