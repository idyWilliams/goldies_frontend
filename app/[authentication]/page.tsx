"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const tabs = [
  {
    label: "Sign In",
    value: "login",
  },
  {
    label: "Sign Up",
    value: "signup",
  },
];

export default function Page({ params }: any) {
  // const [activeTab, setActiveTab] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    params.authentication === "signup" ? 1 : 0,
  );
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  if (params.authentication !== "login" && params.authentication !== "signup") {
    return <div>Invalid Page {params.authentication}</div>;
  }

  const handleClick = (index: number, value: string) => {
    setActiveTab(index);
    window.history.pushState(null, "", `/${value}`);
    // router.push(`/${value}`);
  };

  return (
    <>
      <Header />
      <section className="px-4 pt-40">
        <div className="mx-auto max-w-[400px] border border-neutral-300 bg-white p-6 shadow-[0_0_30px_rgba(0,0,0,0.1)] sm:max-w-[500px]">
          <div className="relative mx-auto mb-5 grid w-[75%] grid-cols-2 items-center justify-center overflow-hidden rounded-md bg-gray-50">
            <EachElement
              of={tabs}
              render={(tab: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleClick(index, tab?.value)}
                  className={`relative z-[1] w-full cursor-pointer rounded-sm px-3 py-2 text-center ${activeTab === index ? "text-goldie-300" : "text-black"}`}
                >
                  {tab?.label}
                </div>
              )}
            />
            <div
              className={cn(
                "absolute left-0 top-0 z-0 h-full w-1/2  bg-black transition duration-500",
                activeTab === 1
                  ? "translate-x-[131px] md:translate-x-[169px]"
                  : "translate-x-0",
              )}
            ></div>
          </div>
          <div className="hide-scroll-bar w-full overflow-hidden">
            <div
              className={cn(
                "flex w-[700px] items-start gap-1 duration-300 md:w-[900px]",
                activeTab === 1 ? "-translate-x-1/2" : "translate-x-0",
              )}
            >
              <Login />
              <SignUp />
            </div>

            {/* {activeTab === 0 && <Login />}ss
            {activeTab === 1 && <SignUp />} */}
          </div>
        </div>
      </section>
    </>
  );
}
