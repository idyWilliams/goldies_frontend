"use client";
import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/helper/cn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, loginUser } from "@/services/hooks/auth";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { inviteAdmin, verificationOtp } from "@/services/hooks/admin-auth";
import InviteAdminModal from "@/components/admin-component/InviteAdminModal";
import { CgSpinner } from "react-icons/cg";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const { setAuth, setIsLogin } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [noSubmit, setNoSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteAnAdmin = useMutation({
    mutationFn: inviteAdmin,
  }); 


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = async (data: any) => {
    setLoading(false);
    console.log(data);

      inviteAnAdmin
        .mutateAsync(data)
        .then((res: any) => {
          console.log(res);
          setAuth(res);
          toast.success('Invitation sent successfully!');
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.message);
        });

      reset();
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
                        <h1 className="mb-1 text-2xl font-bold capitalize">Invite Admin</h1>
                        <p className="text-balance text-neutral-600">
                          Not yet an Admin? Request access
                        </p>
                    </div>
                    <div className="w-full mx-8">
                        <form
                            id="signup"
                            className="flex flex-col gap-5 md:grid-cols-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                          <label htmlFor="email" className="md:col-span-2">
                            <span className="mb-1 inline-block font-medium capitalize">
                                Email Address
                            </span>
                            <input
                                {...register("email")}
                                type="email"
                                className={cn(
                                "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                                errors?.email
                                    ? "border border-red-600 focus:border-red-600 focus:ring-0"
                                    : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                                )}
                                id="email"
                                name="email"
                                placeholder="admin@example.com"
                          />
                            {errors?.email && (
                                <p className={cn("mt-1 text-sm text-red-600")}>
                                {errors.email?.message}
                                </p>
                            )}
                            </label>
                            <Button
                            disabled={inviteAnAdmin.isPending}
                            className="col-span-2 mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                            >
                            {inviteAnAdmin.isPending? (
                                <div className="flex items-center gap-3 justify-center">
                                  <CgSpinner className="animate-spin" size={20} />
                                  Loading...
                                </div>
                            ) : (
                                "Send Invite"
                            )}
                            </Button>

                            <p className="col-span-2 text-center">
                            <Link href="/" className="text-neutral-600 underline underline-offset-4">
                                Back to Dashboard
                            </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  );
};

export default Page;