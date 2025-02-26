"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div
      // style={{
      //   background:
      //     "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.9)), url(/assets/vectorBG.jpg)",
      // }}
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-6"
    >
      <NextTopLoader color="#262626" showSpinner={false} height={4} />

      <div className="">
        <div className="mb-2 hidden justify-center md:flex">
          <Link href="/" className="relative">
            <Image
              src="/assets/goldis-gold-logo.png"
              className="w-[150px] lg:w-[180px]"
              width={175}
              height={92}
              alt="Goldis Logo"
              priority
            />
          </Link>
        </div>

        <>{children}</>
      </div>
    </div>
  );
};

export default Layout;
