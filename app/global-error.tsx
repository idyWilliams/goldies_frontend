"use client"; // Error boundaries must be Client Components
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../public/assets/goldis-logo.png";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 p-5">
          <div className="absolute left-4 top-4">
            <Image
              src={Logo}
              priority
              className="w-[130px]"
              width={175}
              height={92}
              alt="Goldis Logo"
            />
          </div>
          <h1 className="text-5xl font-bold">Something went wrong!</h1>

          <div className="mt-6 flex gap-4">
            <Button
              className="font-semibold text-brand-200"
              size="lg"
              onClick={() => reset()}
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
