"use client";
import Link from "next/link";
import Image from "next/image";
import Img from "../public/assets/icon (1).svg";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { Call, Location, Sms } from "iconsax-react";
// import { categories } from "@/utils/cakeCategories";
import { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/hooks/category";
import { fetchSubCategories } from "@/services/hooks/category";
import { toast } from "sonner";

const Footer = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const { data, isPending, isSuccess } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["all categories"],
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setCategories(data?.categories);
    } else {
      setCategories([]);
    }
  }, [isPending, isSuccess, data]);

  return (
    <section className="relative grid min-h-[500px] w-full bg-neutral-900 pt-3">
      <div className="wrapper relative z-30">
        <div className="mx-auto grid gap-6 rounded-2xl bg-[#494848] px-4 py-4 md:grid-cols-2 md:items-center md:py-6 xl:w-10/12">
          <div>
            <h1 className="text-2xl font-bold text-goldie-300 lg:text-[32px]">
              Subscribe to our NewsLetter
            </h1>
            <p className="text-[16px] text-goldie-300">
              Be the first to know about updates on new recipes.
            </p>
          </div>
          <div className="flex h-min items-center rounded-md md:bg-white md:p-2">
            <form
              id="newsLetter"
              className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-center"
            >
              <label htmlFor="email" className="flex-grow">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input w-full rounded-md border-none bg-white p-3 placeholder:text-sm focus:ring-0 md:w-auto md:py-0"
                />
              </label>
              <button className="mt-2 w-full rounded-md bg-black px-5 py-2 text-goldie-300 md:mt-0 md:w-auto">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-20 grid justify-between gap-y-8 lg:grid-cols-5">
          <div className="space-y-4">
            <div>
              <Image
                src={Img}
                alt="logo"
                width={100}
                height={100}
                className="mb-3"
                // className="mb-3 w-[200px]"
              />
              <p className="text-goldie-300 ">Goldies Confectionary</p>
              <p className="mb-2 text-white">
                Your perfect stop to shop yummy and fluffy cakes
              </p>
            </div>
            <div>
              <h3 className="text-white">Social Media</h3>
              <hr className="w-[35px] border border-goldie-300" />
            </div>
            <div className="flex gap-2 text-white">
              <Link href={""} className="">
                <BsFacebook />
              </Link>
              <Link href={""} className="">
                <BsInstagram />
              </Link>
              <Link href={""} className="">
                <BsTwitterX />
              </Link>
              <Link href={""} className="">
                <BsLinkedin />
              </Link>
            </div>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Company</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <Link href={"/shop"}>Products</Link>
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/testimonials"}>Testimonies</Link>
            <Link href={"/contact"}>Contact Us</Link>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="text-white">Products</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <div className="flex flex-col gap-3">
              {isPending ? (
                <div className="flex flex-col gap-2 bg-neutral-900 ">
                  <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-700"></div>
                  <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-700"></div>
                  <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-700"></div>
                  <div className="h-4 w-3/5 animate-pulse rounded bg-neutral-700"></div>
                </div>
              ) : categories.length === 0 ? (
                <p>No categories found.</p>
              ) : (
                categories
                  ?.sort((a: any, b: any) => a?.name?.localeCompare(b.name))
                  ?.map((category: any, index: number) => {
                    if (category?.subCategories?.length < 1) return null;
                    return (
                      <Link
                        key={index}
                        href={`/shop?cat=${encodeURIComponent(category?.name?.toLowerCase())}`}
                      >
                        {category?.name}
                      </Link>
                    );
                  })
              )}
            </div>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Working Hours</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <span>Monday - Friday: 9am-6pm</span>
            <span>Saturdays 9am-4pm</span>
            <span>Sundays closed</span>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Contact Us</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <div className="flex items-center justify-center gap-7 self-end text-white">
              <div className="flex flex-col items-start space-y-3">
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Call />
                  </span>
                  <span className="text-[14px]">+447488855300</span>
                </div>
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Sms />
                  </span>
                  <span className="text-[14px]">johndoe@gmail.com</span>
                </div>
                <div className="inline-flex gap-5">
                  <span>
                    <Location />
                  </span>
                  <span className="text-balance text-[14px]">
                    37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-7"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center bg-neutral-700 py-3">
        <div className="wrapper flex w-full flex-col-reverse justify-between gap-5 md:flex-row md:items-center">
          <p className="text-xs text-white md:text-sm">
            ©Goldies 2024 All Rights Reserved
          </p>
          <div className="inline-flex gap-8">
            <Link href={"/"} className="text-xs text-white md:text-sm">
              Terms of Service
            </Link>
            <Link href={"/"} className="text-xs text-white md:text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
