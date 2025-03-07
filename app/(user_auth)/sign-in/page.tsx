"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/helper/cn";
import { loginUser } from "@/services/hooks/user-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import * as yup from "yup";
// import { toast } from "sonner";
import { USER_DETAILS, USER_TOKEN_NAME } from "@/utils/constants";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/products";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  const { setIsLogin, setAuth } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const queryParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  const callbackUrl = queryParams.get("redirect_url") || "/";

  const userLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      setIsLogin(true);
      setAuth({ user: res?.user });

      localStorage.setItem("isLogin", JSON.stringify(true));
      // // localStorage.removeItem("userToken");
      // // localStorage.removeItem("user");
      localStorage.setItem(
        "user",
        JSON.stringify({ token: res?.token, user: res?.user }),
      );
      localStorage.setItem("userToken", res?.token);

      const userToken = JSON.stringify(res?.user);
      Cookies.set(USER_DETAILS, userToken);
      Cookies.set(USER_TOKEN_NAME, res?.token);

      router.push(callbackUrl);
      toast.success(res?.message);
      reset();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      const resError = error.response?.data;
      console.error(resError);
      toast.error(`${resError?.message ? resError?.message : resError}`);
    },
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
    userLogin.mutate(data);
  };

  return (
    <section className="pb-10 pt-4">
      <div className="wrapper">
        <div className="mx-auto flex w-full flex-col items-center p-4 sm:border sm:bg-white sm:shadow-lg md:p-6 lg:w-[500px]">
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
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 inline-block font-medium capitalize"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                    errors?.email
                      ? "border border-red-600 focus:border-red-600"
                      : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                  )}
                  name="email"
                  placeholder="Your email"
                />
                {errors?.email && (
                  <p className={cn("mt-1 text-sm text-red-600")}>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="relative mb-1 inline-block font-medium capitalize"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={visible ? "text" : "password"}
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.password
                        ? "border border-red-600 focus:border-red-600"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
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
                </div>
                {errors?.password && (
                  <p className={cn("mt-1 text-sm text-red-600")}>
                    {errors.password?.message}
                  </p>
                )}
              </div>
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
  );
};

export default Page;
