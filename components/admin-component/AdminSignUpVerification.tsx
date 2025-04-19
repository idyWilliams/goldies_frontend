"use client";
import Layout from "@/app/(landing)/layout";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUserAdd } from "react-icons/ai";
import { dataTagSymbol, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthContext, { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/services/hooks/admin-auth";
import { CgSpinner } from "react-icons/cg";

const validationSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const AdminSignUpVerification = ({ email }: { email: string }) => {
  const router = useRouter();
  const { setIsLogin, setRole, setAuth } = useAuth();
  const sendOtp = useMutation({
    mutationFn: verifyOTP,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  //   sendOtp
  //     .mutateAsync({
  //       otp: data.otp,
  //       email,
  //     })
  //     .then((res: any) => {
  //       console.log(res);
  //       // UPDATE THE AUTH PROVIDER
  //       setIsLogin(true);
  //       setRole(res?.admin?.role);
  //       setAuth({ token: res?.token, ...res?.admin });

  //       // UPDATE LOCALSTORAGE
  //       localStorage.removeItem("adminToken");
  //       localStorage.removeItem("admin");
  //       localStorage.setItem("isLogin", JSON.stringify(true));
  //       localStorage.setItem(
  //         "admin",
  //         JSON.stringify({ token: res?.token, ...res?.admin }),
  //       );
  //       localStorage.setItem("adminToken", res?.token);
  //       router.push("/admin");
  //     })
  //     .catch((err: any) => {
  //       toast.error(err.message);
  //     });
  // };
 const onSubmit = async (data: any) => {
  try {
    const res = await sendOtp.mutateAsync({
      otp: data.otp,
      email,
    });

    // Show a success toast with action button
    toast.success("Verification successful! Redirecting to dashboard...", {
      duration: 5000,
      action: {
        label: "Go to Dashboard",
        onClick: () => window.location.href = "/admin"
      },
    });

    // First update localStorage
    localStorage.setItem("isLogin", JSON.stringify(true));
    localStorage.setItem("admin", JSON.stringify({ token: res?.token, ...res?.admin }));
    localStorage.setItem("adminToken", res?.token);

    // Then update context state
    setIsLogin(true);
    setRole(res?.admin?.role);
    setAuth({ token: res?.token, ...res?.admin });

    // Try to navigate programmatically
    router.push('/admin');

    // Show a fallback toast after a short delay if still on the page
    setTimeout(() => {
      toast.info("Taking longer than expected? Click the button to go to dashboard", {
        action: {
          label: "Go to Dashboard",
          onClick: () => window.location.href = "/admin"
        },
      });
    }, 3000);

  } catch (err: any) {
    toast.error(err.message);
  }
};
  return (
    <div className="flex  flex-col items-center border bg-white p-6 py-12 shadow-lg  sm:mx-auto sm:w-[440px]">
      <span className="bg-brand-200/50 flex h-20 w-20 items-center justify-center rounded-full">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-brand-100">
          <AiOutlineUserAdd size={30} />
        </span>
      </span>
      <div className="mb-4 mt-6 text-center">
        <h1 className="mb-1 text-2xl font-bold capitalize">Verification</h1>
        <p className="text-balance text-neutral-600">
          Enter the 6-digit One Time Password sent to {email}.
        </p>
      </div>
      <div className="mx-8 w-full">
        <form
          id="signupVerification"
          className="flex flex-col gap-5 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={field.onChange}
                  value={field.value}
                >
                  <InputOTPGroup className="it mb-3 mt-8 flex justify-center gap-5">
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
          </div>
          {errors.otp && (
            <p className="text-center text-red-500">{errors.otp.message}</p>
          )}
          <Button
            disabled={sendOtp.isPending}
            className="col-span-2 mt-3 h-auto w-full rounded-none bg-brand-200 py-3 text-base text-brand-100 hover:border hover:border-brand-200 hover:bg-transparent hover:text-brand-200"
          >
            {sendOtp.isPending ? (
              <div className="flex items-center justify-center gap-3">
                <CgSpinner className="animate-spin" size={20} />
                Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="text-center text-base text-brand-200">Resend code</p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUpVerification;
