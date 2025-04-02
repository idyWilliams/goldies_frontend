"use client";
import { Sms } from "iconsax-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "sonner";

export default function Verification({
  email,
  resubmit,
}: {
  email: string;
  resubmit: () => Promise<void>;
}) {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    // Start countdown when component mounts
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResend = async () => {
    if (isResending || countdown > 0) return;

    setIsResending(true);
    try {
      await resubmit();
      setCountdown(30); // Reset countdown after successful resend
      toast.success("Reset link sent successfully");
    } catch (error) {
      toast.error("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
      <div className="mb-4 flex flex-col items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <Sms className="" />
          </span>
        </span>
        <h3 className="mt-5 text-[20px] font-bold">Check your mail</h3>
        <p className="mt-2 text-center text-sm leading-normal">
          We&apos;ve sent a reset link to{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <div className="mb-7 flex items-center justify-center gap-1 text-sm text-neutral-500">
        <span>Didn&apos;t receive the email?</span>
        {countdown > 0 ? (
          <span className="text-neutral-400">
            (Resend in {countdown}s)
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="cursor-pointer text-brand-200 hover:underline hover:underline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend now"}
          </button>
        )}
      </div>

      <div className="flex cursor-pointer items-center justify-center gap-3">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700"
        >
          <BiArrowBack />
          Back to login
        </Link>
      </div>
    </div>
  );
}
