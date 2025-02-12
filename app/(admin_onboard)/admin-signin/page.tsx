"use client";
import AdminSignInVerification from "@/components/admin-component/AdminSignInVerification";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthProvider";
import { cn } from "@/helper/cn";
import { loginAdmin } from "@/services/hooks/admin-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const authContext = useContext(AuthContext);

  // @ts-ignore
  const { setIsLogin } = authContext;

  const adminLogin = useMutation({
    mutationFn: loginAdmin,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = (data: any) => {
    setEmail(data.email);

    adminLogin
      .mutateAsync(data)
      .then((res: any) => {
        reset();
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message || err?.message);
      });
  };

  // AUTO REDIRECT TO DASHBOARD IF TOKEN IS STILL VALID
  useEffect(() => {}, []);

  return (
    <>
      {adminLogin.isSuccess ? (
        <AdminSignInVerification email={email} />
      ) : (
        <>
          <div className="flex w-full max-w-md flex-col items-center border bg-white px-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
            <div className="mb-8 text-center">
              <h1 className="mb-1 text-xl font-bold capitalize">
                Sign in to your account
              </h1>
            </div>
            <div className="w-full">
              <form
                id="admin-sign-in"
                className="grid gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Email */}
                <label htmlFor="email">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Email address
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.email
                        ? " border border-red-600 focus:border-red-600 focus:ring-red-600"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className=" text-red-600"> {errors?.email?.message} </p>
                  )}
                </label>

                {/* Password */}
                <label htmlFor="password" className="relative">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Password
                  </span>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={visible ? "text" : "password"}
                      className={cn(
                        "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                        errors?.password
                          ? " border border-red-600 focus:border-red-600 focus:ring-red-600"
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
                  </div>
                  {errors.password && (
                    <p className=" text-red-600">
                      {" "}
                      {errors?.password?.message}{" "}
                    </p>
                  )}
                </label>

                {/* Check box */}
                <div className="flex items-center justify-between">
                  <label htmlFor="agree" className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      defaultChecked
                      // checked
                      className="form-checkbox h-4 w-4 checked:bg-goldie-300 checked:hover:bg-neutral-800 focus:ring-neutral-800 checked:focus:ring-neutral-800"
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
                  disabled={adminLogin?.isPending}
                  className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                  type="submit"
                >
                  {adminLogin?.isPending ? "Loading...." : "Sign In"}
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
