"use client";
import Layout from "@/app/(landing)/layout";
import AuthContext from "@/context/AuthProvider";
import { loginUser } from "@/services/hooks/user-auth";
import { useMutation } from "@tanstack/react-query";
import { Key, Sms } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function PasswordReset({ password }: { password: string }) {
  const router = useRouter();
  // @ts-ignore
  const { setIsLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const userLogin = useMutation({
    mutationFn: loginUser,
  });

  const autoLogin = () => {
    setLoading(true);
    const email: string = localStorage.getItem("email") || "";
    const userEmail = JSON.parse(email);

    const data = {
      email: userEmail.email,
      password,
    };

    userLogin
      .mutateAsync(data)
      .then((res: any) => {
        console.log(res);
        setIsLogin(true);
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res?.token, user: res?.user }),
        );
        localStorage.setItem("userToken", res?.token);
        router.push("/");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
        <div className="mb-6 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-700 bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-700 bg-opacity-10">
              <Key className="text-green-700" />
            </span>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Password Reset</h3>
          <p className="text-balance text-center text-[12px]">
            Your password has been successfully reset. Click below to login
            magically.
          </p>
        </div>

        <div className={`${userLogin.isPending ? "cursor-not-allowed" : ""}`}>
          <Button
            className="my-5 w-full rounded bg-neutral-900 py-2 text-sm text-brand-200 disabled:hover:cursor-not-allowed"
            disabled={loading}
            onClick={() => autoLogin()}
          >
            {loading ? "Signing in" : "Continue"}
          </Button>
        </div>

        <div className="flex cursor-pointer items-center justify-center gap-3 ">
          <Link
            href={"/sign-in"}
            className="inline-flex items-center gap-2 text-sm text-neutral-500"
          >
            <span>
              <BiArrowBack />
            </span>{" "}
            Back to login
          </Link>
        </div>
      </div>
    </>
  );
}
