// "use client";
import Layout from "@/app/(landing)/layout";
import { Sms } from "iconsax-react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "./ui/button";

export default function Verification({
  email,
  resubmit,
}: {
  email: string;
  resubmit: () => void;
}) {
  return (
    <>
      <div className="w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
        <div className="mb-4 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <Sms className="" />
            </span>
          </span>
          <h3 className="mt-5  text-[20px] font-bold">Check your mail</h3>
          <p className="mt-2 text-center text-sm leading-normal">
            We&apos;ve sent a reset link to {email}
          </p>
        </div>

        <Button className="my-3 h-auto w-full rounded bg-neutral-900 py-2.5 text-sm text-brand-200">
          Open email app
        </Button>
        <div className="mb-7 flex cursor-pointer items-center justify-center gap-1 text-sm text-neutral-500">
          <span>Didn&apos;t get an email?</span>
          <span className="text-brand-200" onClick={() => resubmit()}>
            Click to resend
          </span>
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
