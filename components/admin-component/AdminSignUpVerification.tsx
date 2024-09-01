"use client";
import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { SignupOtp } from "@/components/signupOtp"
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "../../services/hooks/auth";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  });


const AdminSignUpVerification = ({email}: {email: string}) => {
    const router = useRouter();
    //@ts-ignore
  const { setAuth } = useContext(AuthContext);
  const [noSubmit, setNoSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const newUser = useMutation({
    mutationFn: createUser,
  });
  const userLogin = useMutation({
    mutationFn: loginUser,
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

  const onSubmit = async (data: any) => {
    console.log(data);
    // setLoading(true);
    // try {
    //   const res = await newUser.mutateAsync(data);
    //   setAuth(res);
    //   router.push("/dashboard");
    // } catch (err: any) {
    //   toast.error(err.message);
    // } finally {
    //   setLoading(false);
    //   reset();
    // }
  };

  return (
    <Layout>
        <div className="mt-[64px]" />
        <section className="py-10">
            <div className="wrapper">
                <div className="flex flex-col items-center sm:mx-auto sm:w-[500px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                        <AiOutlineUserAdd size={30} />
                    </span>
                    </span>
                    <div className="mb-4 mt-6 text-center">
                        <h1 className="mb-1 text-2xl font-bold capitalize">
                            Verification
                        </h1>
                        <p className="text-balance text-neutral-600">
                            Enter the 6-digit One Time Password sent to {email}.
                        </p>
                    </div>
                    <div className="w-full mx-8">
                        <form
                            id="signupVerification"
                            className="flex flex-col gap-5 md:grid-cols-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex justify-center">
                                {/* <SignupOtp register={register} /> */}
                                <Controller name="otp" control={control} render={({field}) => 
                                  <InputOTP 
                                  maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} 
                                  onChange={field.onChange}
                                  value={field.value}
                                  >
                                    <InputOTPGroup className="flex gap-5 it justify-center mt-8 mb-3">
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                }
                                />
                            </div>
                            {errors.otp && (
                            <p className="text-red-500 text-center">
                                {errors.otp.message}
                            </p>
                            )}
                            <Button
                            disabled={loading}
                            className="col-span-2 mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                            >
                            {loading ? (
                            <div className="loader bg-slate-300"></div>
                            ) : (
                                "Submit"
                            )}
                            </Button>
                            <p className="text-center text-base text-goldie-300">
                                Resend code
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  );
};

export default AdminSignUpVerification;
