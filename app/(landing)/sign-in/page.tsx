"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/helper/cn";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/hooks/user-auth";
import AuthContext from "@/context/AuthProvider";
// import { toast } from "sonner";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  // @ts-ignore
  const { setIsLogin } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const userLogin = useMutation({
    mutationFn: loginUser,
  });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = (data: any) => {
    console.log(data);

    userLogin
      .mutateAsync(data)
      .then((res: any) => {
        console.log(res);
        setIsLogin(true);
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res?.token, user: res?.user }),
        );
        localStorage.setItem("accessToken", res?.token);
        router.push("/");
        reset();
      })
      .catch((err: any) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="mt-[64px]" />
      <section className="py-10">
        <div className="wrapper">
          <div className="flex flex-col items-center sm:mx-auto sm:w-[500px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                <RiUserSharedLine size={30} />
              </span>
            </span>
            <div className="mb-4 mt-6 text-center">
              <h1 className="mb-1 text-2xl font-bold capitalize">Sign In</h1>
              <p className="text-balance text-neutral-600">
                Welcome Back! Sign in to continue
              </p>
            </div>
            <div className="w-full">
              <form
                id="signin"
                className="grid gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="email" className="">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Email Address
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.email
                        ? "border border-red-600 focus:border-red-600"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="email"
                    name="email"
                    placeholder="Your email"
                  />
                </label>
                <label htmlFor="password" className="relative">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Password
                  </span>
                  <input
                    {...register("password")}
                    type={visible ? "text" : "password"}
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.password
                        ? "border border-red-600 focus:border-red-600"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="password"
                    name="password"
                    placeholder="Your password"
                  />
                  <span
                    onClick={handleToggle}
                    className="absolute bottom-[14px] right-3 cursor-pointer text-neutral-800"
                  >
                    {visible ? (
                      <BsEyeSlash size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </label>
                <div className="flex items-center justify-between">
                  <label htmlFor="agree" className="flex items-center gap-3">
                    <input
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      type="checkbox"
                      name="agree"
                      id="agree"
                      // checked
                      className="checked:focus:ring-neutral-800, form-checkbox h-4 w-4
                       checked:bg-goldie-300 checked:hover:bg-neutral-800 
                       focus:ring-neutral-800 "
                    />
                    <span className="text-sm">Keep me signed in</span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm hover:text-goldie-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  disabled={userLogin?.isPending}
                  className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                >
                  {userLogin?.isPending ? "Loading...." : "Sign In"}
                </Button>

                <p className="text-center">
                  Don’t have an account? &nbsp;
                  <Link href="/sign-up" className="text-goldie-300">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
