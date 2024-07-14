"use client";
import Layout from "@/components/Layout";
import { Sms } from "iconsax-react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Verification({ email }: { email: string }) {
  return (
    <>
      <div className="w-full bg-white p-5 shadow-[0px_0px_30px_rgba(0,0,0,0.2)] md:shadow-none">
        <div className="mb-6 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <Sms className="" />
            </span>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Check your mail</h3>
          <p className="text-[12px]">We&apos;ve sent a reset link to {email}</p>
        </div>

        <button className="my-5 w-full rounded bg-neutral-900 py-2 text-sm text-goldie-300">
          Open email app
        </button>
        <div className="mb-7 flex cursor-pointer items-center justify-center gap-1 text-[12px] text-neutral-500">
          <span>Didn&apos;t get an email?</span>
          <span className="text-goldie-300">Click to resend</span>
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
