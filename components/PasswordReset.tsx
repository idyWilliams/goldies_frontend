"use client";
import Layout from "@/components/Layout";
import { Key, Sms } from "iconsax-react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function PasswordReset() {
  return (
    <>
      <div className="w-full bg-white p-5 shadow-[0px_0px_30px_rgba(0,0,0,0.2)] md:shadow-none">
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

        <Link
          href={"/"}
          className="my-5 block w-full rounded bg-neutral-900 py-2 text-center text-sm text-goldie-300"
        >
          Continue
        </Link>

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
