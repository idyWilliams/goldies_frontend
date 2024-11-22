import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.9)), url(/assets/vectorBG.jpg)",
        }}
        className="flex min-h-dvh flex-col items-center justify-center px-4 py-4"
      >
        <div className="">
          <div className="mb-5 flex justify-center">
            <Link href="#" className="relative">
              <Image
                src="/assets/goldis-gold-logo.png"
                className="w-[200px] lg:w-[230px]"
                width={175}
                height={92}
                alt="Goldis Logo"
                priority
              />
            </Link>
          </div>

          <>{children}</>
        </div>
      </section>
    </>
  );
};

export default Layout;
