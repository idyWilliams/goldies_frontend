"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthProvider";
import { verifyOTP } from "@/services/hooks/admin-auth";
import { ADMIN_TOKEN_NAME } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { toast } from "sonner";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  otp: yup.string().required("otp required"),
});

const AdminSignInVerification = ({ email }: { email: string }) => {
  const { setIsLogin, setRole, setAuth } = useAuth();
  const queryParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = queryParams.get("redirect_url") || "/admin";

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
        // UPDATE THE AUTH PROVIDER
        setIsLogin(true);
        setRole(res?.admin?.role);
        setAuth({ token: res?.token, ...res?.admin });

        // UPDATE LOCALSTORAGE
        // localStorage.removeItem("adminToken");
        // localStorage.removeItem("admin");
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.setItem(
          "admin",
          JSON.stringify({ token: res?.token, ...res?.admin }),
        );
        localStorage.setItem("adminToken", res?.token);

        Cookies.set(ADMIN_TOKEN_NAME, res?.token);
        router.replace(callbackUrl);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      });
  };

  return (
    <>
      <div className="flex  flex-col items-center border bg-white p-6 py-12 shadow-lg  sm:mx-auto sm:w-[440px]">
        <span className="bg-brand-200 bg-opacity-50 flex h-20 w-20 items-center justify-center rounded-full">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-brand-100">
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
              className="mt-3 h-auto w-full rounded-none bg-brand-200 py-3 text-base text-brand-100 hover:border hover:border-brand-200 hover:bg-transparent hover:text-brand-200"
              type="submit"
            >
              {otpVerify?.isPending ? "Loading...." : "Submit"}
            </Button>
            {/* <Button className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-brand-200">
                                        Submit
                                    </Button> */}

            <div className="flex items-center justify-center">
              <Link
                href="/admin-signin"
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
