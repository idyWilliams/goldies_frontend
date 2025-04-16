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
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { toast } from "sonner";
import * as yup from "yup";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  otp: yup.string().required("otp required"),
});

interface AdminSignInVerificationProps {
  email: string;
  onResendVerification: () => void;
  isResending: boolean;
}

const AdminSignInVerification: React.FC<AdminSignInVerificationProps> = ({
  email,
  onResendVerification,
  isResending,
}) => {
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
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    if (otpValue && otpValue.length === 6) {
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 100);
    }
  }, [otpValue]);

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
        toast.success(res?.message);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center border bg-white p-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 bg-opacity-50">
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
            <div className="flex flex-col items-center justify-center">
              <Controller
                name="otp"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputOTP
                    maxLength={6}
                    onChange={onChange}
                    value={value}
                    disabled={otpVerify.isPending}
                  >
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

            {/* Submit button is still available as a fallback */}
            <Button
              disabled={
                otpVerify?.isPending ||
                (otpValue?.length === 6 && otpVerify.isIdle)
              }
              className="mt-3 h-auto w-full rounded-none border border-transparent bg-brand-200 py-3 text-base text-brand-100 hover:border hover:border-brand-200 hover:bg-transparent hover:text-brand-200"
              type="submit"
            >
              {otpVerify?.isPending ? "Verifying..." : "Submit"}
            </Button>

            <div className="flex items-center justify-center">
              <p
                onClick={onResendVerification}
                className="cursor-pointer text-center text-sm hover:text-goldie-400"
              >
                {isResending ? "Resending..." : "Resend code"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignInVerification;
