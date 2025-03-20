"use client";
import { Link as LinkIcon } from "iconsax-react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "./ui/button";

export default function ResetLinkExpired() {
  return (
    <>
      <div className="w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
        <div className="mb-4 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <LinkIcon className="" />
            </span>
          </span>
          <h3 className="mt-5  text-[20px] font-bold">Reset Link Expired</h3>
          <p className="mt-2 text-center text-sm leading-normal">
            It looks like your reset link has expired. Please request a new link
            to continue with your password reset.
          </p>
        </div>

        <Button className="my-3 h-auto w-full rounded bg-neutral-900 py-2.5 text-sm text-brand-200">
          <Link href={"/forgot-password"}>Request New Link</Link>
        </Button>

        <div className="flex cursor-pointer items-center justify-center gap-3 ">
          <Link
            href={"/sign-in"}
            className="inline-flex items-center gap-2 text-sm text-neutral-500"
          >
            <span>
              <BiArrowBack />
            </span>{" "}
            Back to Sign In
          </Link>
        </div>
      </div>
    </>
  );
}
