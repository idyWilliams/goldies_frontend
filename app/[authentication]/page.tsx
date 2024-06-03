"use client";
import Header from "@/components/Header";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Page({ params }: any) {
  const [visible, setVisible] = useState(false);
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

  const handleRoute = () => {};

  console.log(
    "params",
    params,
    params.authentication !== "login",
    "s",
    params.authentication !== "signup",
    typeof params.authentication,
  );
  console.log("rerender");
  if (params.authentication !== "login" && params.authentication !== "signup") {
    return <div>Invalid Page {params.authentication}</div>;
  }

  return (
    <>
      <Header />
      <section className="px-4 pt-40">
        <div className="mx-auto max-w-[400px] border border-neutral-300 bg-white p-6 shadow-[0_0_30px_rgba(0,0,0,0.1)] sm:max-w-[500px]">
          <div className="relative mx-auto mb-5 grid w-[75%] grid-cols-2 items-center justify-center overflow-hidden rounded-md bg-gray-50">
            <div
              onClick={() => router.replace("/login")}
              className={`relative z-[1] w-full cursor-pointer rounded-sm px-3 py-2 text-center ${params.authentication === "login" ? "text-goldie-300" : "text-black"}`}
            >
              Sign In
            </div>
            <div
              onClick={() => router.replace("/signup")}
              className={`relative z-[1] w-full cursor-pointer rounded-sm px-3 py-2 text-center ${params.authentication === "signup" ? "text-goldie-300" : "text-black"}`}
            >
              Sign Up
            </div>
            <div
              className={`absolute left-0 top-0 z-0 h-full w-1/2 bg-black transition duration-500 ${params.authentication === "login" && "translate-x-0"} ${params.authentication === "signup" && "translate-x-[131px] md:translate-x-[169px]"}`}
            ></div>
          </div>
          <div>
            {params.authentication === "login" && <Login />}
            {params.authentication === "signup" && <SignUp />}
          </div>
        </div>
      </section>
    </>
  );
}
