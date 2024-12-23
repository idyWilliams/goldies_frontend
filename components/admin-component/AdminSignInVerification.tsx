"use client";
import React, { useContext, useState } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AuthContext, { useAuth } from "@/context/AuthProvider";
import { verifyOTP } from "@/services/hooks/admin-auth";

const validationSchema = yup.object().shape({
  otp: yup.string().required("otp required"),
});

const AdminSignInVerification = ({ email }: { email: string }) => {
  const { setIsLogin, setRole, setAuth } = useAuth();

  const router = useRouter();
  const otpVerify = useMutation({
    mutationFn: verifyOTP,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    otpVerify
      .mutateAsync({ ...data, email })
      .then((res: any) => {
        console.log(res);
        // UPDATE THE AUTH PROVIDER
        setIsLogin(true);
        setRole(res?.admin?.role);
        setAuth({ token: res?.token, ...res?.admin });

        // UPDATE LOCALSTORAGE
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.setItem(
          "admin",
          JSON.stringify({ token: res?.token, ...res?.admin }),
        );
        localStorage.setItem("adminToken", res?.token);
        router.push("/admin");
      })
      .catch((error: any) => {
        console.log(error);
      });

    console.log(data);
  };

  return (
    <>
      <div className="flex  flex-col items-center border bg-white p-6 py-12 shadow-lg  sm:mx-auto sm:w-[440px]">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
            <RiUserSharedLine size={30} />
          </span>
        </span>
        <div className="mb-4 mt-6 text-center">
          <h1 className="mb-1 text-2xl font-bold capitalize">Verification</h1>
          <p className="text-balance text-neutral-600">
            Enter the 6-digit One Time Password sent to {email}.
          </p>
        </div>
        <div className="w-full">
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-center   ">
              <Controller
                name="otp"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputOTP maxLength={6} onChange={onChange} value={value}>
                    <InputOTPGroup className="gap-5">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <p className="text-red-600">{errors?.otp?.message} </p>
              )}
            </div>
            <Button
              disabled={otpVerify?.isPending}
              className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
              type="submit"
            >
              {otpVerify?.isPending ? "Loading...." : "Submit"}
            </Button>
            {/* <Button className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300">
                                        Submit
                                    </Button> */}

            <div className="flex items-center justify-center">
              <Link
                href="/admin-sign-in"
                className="text-center text-sm hover:text-goldie-400"
              >
                Resend code
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignInVerification;
