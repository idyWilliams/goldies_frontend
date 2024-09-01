"use client";
import Layout from "@/components/Layout";
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
import { loginAdmin } from "@/services/hooks/auth";
import AuthContext from "@/context/AuthProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import AdminSignInVerification from "@/components/admin-component/AdminSignInVerification";

const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Page = () => {
    const authContext = useContext(AuthContext);
    // @ts-ignore
    const { setIsLogin } = authContext;

    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false)
    const [email, setEmail] = useState<string>('')

    const adminLogin = 
    useMutation({
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
        const logData = {
            email: data.email,
            password: data.password,
        };        
        setCanSubmit(true)
        setEmail(data.email)
        
        console.log("Submitted Data:", logData);
        
        adminLogin
            .mutateAsync(data)
            .then((res: any) => {
                console.log('res: ', res.data);
                setIsLogin(true);
               
                localStorage.setItem("isLogin", JSON.stringify(true));
                localStorage.removeItem("accessToken");
                localStorage.removeItem("admin");
                localStorage.setItem(
                    "admin",
                    JSON.stringify({ token: res?.token, admin: res?.admin })
                );
                localStorage.setItem("accessToken", res?.token);
                router.push("/admin");
                reset();
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(err.message);
                // adminLogin.isError
             
            });
    };

    return (
        <Layout>
            <div className="mt-[64px]">
                <section className="py-10">
                    <div className='"wrapper"'>

                        {canSubmit? <AdminSignInVerification email={email}/> : 
                            <div className="flex flex-col items-center sm:mx-auto sm:w-[500px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
                                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                                        <RiUserSharedLine size={30} />
                                    </span>
                                </span>
                                <div className="mb-4 mt-6 text-center">
                                    <h1 className="mb-1 text-2xl font-bold capitalize">Sign In</h1>
                                    {/* <p className="text-balance text-neutral-600">
                                        Not an admin yet?
                                        <Link href="/">Request access</Link>.
                                    </p> */}
                                </div>
                                <div className="w-full">
                                    <form
                                        id="admin-sign-in"
                                        className='grid gap-5'
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
                                                        ? " focus:ring-red-600 border border-red-600 focus:border-red-600"
                                                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                                                )}
                                                id="email"
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && <p className=" text-red-600"> {errors?.email?.message} </p> }
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
                                                            ? " focus:ring-red-600 border border-red-600 focus:border-red-600"
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
                                            {errors.password && <p className=" text-red-600"> {errors?.password?.message} </p> }


                                        </label>

                                        {/* Check box */}
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="agree" className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    name="agree"
                                                    id="agree"
                                                    checked
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
                        }

                        
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Page;

